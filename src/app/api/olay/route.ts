import { createHash, randomBytes } from "node:crypto";
import { izlemeYaz, type Satir } from "@/lib/izlemeDepo";

/* ============================================================================
   İZLEME · TOPLAMA UCU      POST /api/olay   gövde: { o: oturum, e: [olay, …] }
   ============================================================================
   Tarayıcıdaki izleyicinin (lib/izleme.ts) yazdığı tek yer. Cevap her zaman
   gövdesiz 204: izleyici cevaba bakmıyor, kötü niyetli istek de neyin kabul
   edildiğini öğrenmiyor.

   GİZLİLİK
     · IP SAKLANMIYOR. Günlük tekil ziyaretçiyi sayabilmek için IP + tarayıcı
       kimliği + o günün tarihi + gizli tuz karılıp ilk 16 hanesi yazılıyor
       (Plausible'ın yöntemi). Ertesi gün aynı kişi başka bir karma alır; karmadan
       IP'ye dönülemez.
     · Ülke, önümüzdeki vekilin başlığından (Cloudflare cf-ipcountry, Vercel
       x-vercel-ip-country). Şehir alınmıyor.
     · Alanlar burada yeniden süzülüyor: yalnız bilinen türler, sınırlı uzunluk.

   KORUMA
     · Yalnız kendi alan adımızdan gelen istek (Origin başlığı Host ile aynı).
     · Gövde 16 KB, istek başına 40 olay.
     · Bilinen botlar yazılmıyor.
   Hız sınırı burada YOK ve bilerek (isim-sorgu rotasındaki gerekçe): süreç
   belleğindeki sayaç örnekler arasında paylaşılmıyor. Doğru yer öndeki vekil.
   ========================================================================== */

export const runtime = "nodejs";

const BOS = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
const BOT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|monitor|curl|wget|python|scrapy/i;
const TUR = new Set(["g", "c", "t", "o"]);
/* IZLEME_TUZ yoksa süreç başına rastgele: tekil sayım yeniden başlatmada sıfırlanır, veri sızmaz */
const TUZ = process.env.IZLEME_TUZ || randomBytes(16).toString("hex");

export async function POST(request: Request): Promise<Response> {
  const h = request.headers;
  const ua = h.get("user-agent") || "";
  if (!ua || BOT.test(ua)) return BOS();
  const koken = h.get("origin");
  if (koken) {
    try {
      if (new URL(koken).host !== h.get("host")) return BOS();
    } catch {
      return BOS();
    }
  }

  const ham = await request.text();
  if (ham.length > 16_384) return BOS();
  let govde: unknown;
  try {
    govde = JSON.parse(ham);
  } catch {
    return BOS();
  }
  const { o, e } = (govde ?? {}) as { o?: unknown; e?: unknown };
  if (typeof o !== "string" || !/^[a-z0-9]{8,32}$/.test(o) || !Array.isArray(e)) return BOS();

  const ip = (h.get("cf-connecting-ip") || h.get("x-forwarded-for") || "").split(",")[0].trim();
  const gun = new Date().toISOString().slice(0, 10);
  const ziyaretci = createHash("sha256").update(`${TUZ}|${gun}|${ip}|${ua}`).digest("hex").slice(0, 16);
  const ulke = (h.get("cf-ipcountry") || h.get("x-vercel-ip-country") || "").slice(0, 2).toUpperCase();
  const simdi = Date.now();

  const satirlar: Satir[] = [];
  for (const olay of e.slice(0, 40)) {
    if (!olay || typeof olay !== "object") continue;
    const { t, z, y, ...kalan } = olay as Record<string, unknown>;
    if (typeof t !== "string" || !TUR.has(t) || typeof y !== "string" || !y.startsWith("/")) continue;
    const veri: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(kalan).slice(0, 12)) {
      if (!/^[a-z_]{1,24}$/i.test(k)) continue;
      if (typeof v === "string") veri[k] = v.slice(0, 160);
      else if (typeof v === "boolean" || (typeof v === "number" && Number.isFinite(v))) veri[k] = v;
    }
    /* tarayıcının saati kayık olabilir: bir günden eski ya da ileri tarihli damga sunucu saatine çekiliyor */
    const zaman = typeof z === "number" && z > simdi - 86_400_000 && z <= simdi + 60_000 ? Math.round(z) : simdi;
    satirlar.push({ zaman, oturum: o, ziyaretci, tur: t, yol: y.split(/[?#]/)[0].slice(0, 200), ulke, veri: JSON.stringify(veri) });
  }
  if (satirlar.length) {
    try {
      await izlemeYaz(satirlar);
    } catch (hata) {
      console.error("izleme yazılamadı:", hata);
    }
  }
  return BOS();
}
