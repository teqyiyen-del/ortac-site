/* ============================================================================
   FORM · GÖNDERİM UCU      POST /api/form
   gövde: { tur, konu, alanlar: [etiket, değer][], tuzak }
   ============================================================================
   09.10.2026 · teslim öncesi tur. Sitedeki dört formun (iletişim, kariyer, iş
   ortaklığı, reklam sayfası) hiçbiri bir yere gitmiyordu: düğmeler kapalıydı
   ve altlarında "Form henüz bir yere bağlı değil" yazıyordu. Eski sitede
   çalışan dört başvuru yolu vardı; taşınmadan önce en az biri çalışmalı.

   İKİ YOL, İKİSİ DE ORTAM DEĞİŞKENİYLE (anahtar kodda durmaz):
     · FORM_WEBHOOK_URL       : gövde olduğu gibi bu adrese POST edilir (Make,
                                Zapier, Google Apps Script, kendi CRM'iniz …).
     · RESEND_API_KEY + FORM_ALICI (+ isteğe bağlı FORM_GONDEREN):
                                ileti Resend üzerinden FORM_ALICI adresine
                                e-posta olarak gider. Ek paket yok, düz fetch.
   İkisi de yoksa cevap 503 { durum: "anahtar-yok" }. İstemci (lib/formGonder)
   bunu hata saymıyor: ziyaretçinin e-posta uygulamasında alanları dolu bir
   ileti açıyor, yani form anahtar gelmeden de İŞE YARIYOR. Companies House
   aracındaki desenin aynısı (api/araclar/isim-sorgu): anahtar eklendikten
   sonraki ilk dağıtımda kod değişmeden sunucu gönderimine geçer.

   KORUMA
     · Yalnız kendi alan adımızdan gelen istek (Origin başlığı Host ile aynı).
     · Gövde 24 KB, en çok 30 alan, alan başına 4.000 karakter.
     · `tuzak` alanı doluysa (insanın görmediği kutu; botlar doldurur) 200
       dönülür ama hiçbir şey gönderilmez.
   Hız sınırı burada YOK ve bilerek (api/olay'daki gerekçe): süreç belleğindeki
   sayaç örnekler arasında paylaşılmıyor. Doğru yer öndeki vekil.
   Ziyaretçinin yazdığı hiçbir şey sunucuda saklanmıyor ve günlüğe yazılmıyor.
   ========================================================================== */

export const runtime = "nodejs";

const cevap = (durum: string, status: number) =>
  Response.json({ durum }, { status, headers: { "Cache-Control": "no-store" } });

const TUR = new Set(["iletisim", "kariyer", "ortaklik", "reklam", "kurulum"]);
const kacis = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(request: Request): Promise<Response> {
  const h = request.headers;
  const koken = h.get("origin");
  const host = h.get("x-forwarded-host") || h.get("host");
  if (koken && host && new URL(koken).host !== host) return cevap("yabanci-koken", 403);

  const ham = await request.text();
  if (ham.length > 24_000) return cevap("cok-buyuk", 413);
  let g: { tur?: unknown; konu?: unknown; alanlar?: unknown; tuzak?: unknown };
  try {
    g = JSON.parse(ham);
  } catch {
    return cevap("bozuk-govde", 400);
  }
  if (typeof g.tuzak === "string" && g.tuzak.trim() !== "") return cevap("gonderildi", 200);
  const tur = typeof g.tur === "string" && TUR.has(g.tur) ? g.tur : null;
  const konu = typeof g.konu === "string" ? g.konu.slice(0, 200) : "";
  const alanlar = Array.isArray(g.alanlar)
    ? g.alanlar
        .filter((a): a is [string, string] => Array.isArray(a) && typeof a[0] === "string" && typeof a[1] === "string")
        .slice(0, 30)
        .map(([k, v]) => [k.slice(0, 120), v.slice(0, 4000)] as [string, string])
    : [];
  if (!tur || !konu || alanlar.length === 0) return cevap("eksik-alan", 400);

  const webhook = process.env.FORM_WEBHOOK_URL;
  const anahtar = process.env.RESEND_API_KEY;
  const alici = process.env.FORM_ALICI;

  try {
    if (webhook) {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tur, konu, alanlar: Object.fromEntries(alanlar) }),
      });
      return r.ok ? cevap("gonderildi", 200) : cevap("iletilemedi", 502);
    }
    if (anahtar && alici) {
      const yanit = alanlar.find(([k]) => /e-?posta/i.test(k))?.[1];
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${anahtar}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.FORM_GONDEREN || "Ortac Global <onboarding@resend.dev>",
          to: alici.split(",").map((s) => s.trim()).filter(Boolean),
          subject: konu,
          ...(yanit && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(yanit) ? { reply_to: yanit } : {}),
          text: alanlar.map(([k, v]) => `${k}: ${v}`).join("\n"),
          html: `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${alanlar
            .map(([k, v]) => `<tr><td style="color:#666;vertical-align:top">${kacis(k)}</td><td>${kacis(v).replace(/\n/g, "<br>")}</td></tr>`)
            .join("")}</table>`,
        }),
      });
      return r.ok ? cevap("gonderildi", 200) : cevap("iletilemedi", 502);
    }
  } catch {
    return cevap("iletilemedi", 502);
  }
  return cevap("anahtar-yok", 503);
}
