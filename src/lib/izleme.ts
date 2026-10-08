/* ============================================================================
   İZLEME · tarayıcı tarafı (08.10.2026)
   Yönetim panelinin istatistikleri için sitenin kendi izleyicisi. Dışarıya
   (Umami, GA) veri gitmiyor; her şey aynı alan adındaki /api/olay'a yazılıyor.

   NE TOPLUYOR        sayfa görüntüleme · sayfada kalınan süre ve inilen derinlik ·
                      tıklamanın yeri (ısı haritası) · gtm() ile işaretlenen olaylar
   NE TOPLAMIYOR      yazılan hiçbir şey (form alanı, araçlara girilen isim ve tutar),
                      adres çubuğundaki sorgu (araçlar ismi ?isim=… ile taşıyabiliyor;
                      yalnız utm_* alınıyor), çerez, kalıcı kimlik.
   KİMLİK             oturum = bu sekmenin rastgele kimliği (sessionStorage; sekme
                      kapanınca biter). Günlük tekil ziyaretçi sunucuda, IP saklanmadan
                      hesaplanıyor (api/olay/route.ts).
   AĞIRLIK            bağımlılık yok. Olaylar kuyrukta bekliyor; 10 saniyede bir ya da
                      sekme gizlenince tek istekle gidiyor (sendBeacon). Dinleyiciler
                      pasif; kaydırmada yalnız bir sayı güncelleniyor.
   AÇIK MI            layout.tsx yalnız IZLEME_ACIK=1 iken <Izleyici/> basıyor. Vercel'de
                      kapalı (kalıcı disk yok); kendi sunucumuza geçince açılacak.
   ========================================================================== */

type Deger = string | number | boolean;
export type IzOlay = { t: "g" | "c" | "t" | "o"; z: number; y: string } & Record<string, Deger>;

const UC = "/api/olay";
const kuyruk: IzOlay[] = [];
let acik = false;
let oturum = "";
let zamanlayici: ReturnType<typeof setTimeout> | undefined;

/** Adresin yolu; sorgu ve çapa bilerek atılıyor (yukarıda · NE TOPLAMIYOR). */
export const izYol = () => window.location.pathname;

export function izBaslat() {
  if (acik) return;
  acik = true;
  try {
    oturum = sessionStorage.getItem("iz") || "";
    if (!oturum) {
      oturum = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
      sessionStorage.setItem("iz", oturum);
    }
  } catch {
    /* depolama kapalı (gizli sekme): kimlik bu sayfa yüklemesi kadar yaşar */
    oturum = Math.random().toString(36).slice(2, 18);
  }
}

export function izGonder() {
  clearTimeout(zamanlayici);
  zamanlayici = undefined;
  if (!kuyruk.length) return;
  const govde = JSON.stringify({ o: oturum, e: kuyruk.splice(0, 40) });
  /* sendBeacon sekme kapanırken de gidiyor; yoksa keepalive'lı fetch */
  if (!navigator.sendBeacon?.(UC, new Blob([govde], { type: "application/json" })))
    fetch(UC, { method: "POST", body: govde, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
}

export function izle(t: IzOlay["t"], veri: Record<string, Deger> = {}) {
  if (!acik) return;
  kuyruk.push({ ...veri, t, z: Date.now(), y: izYol() });
  if (kuyruk.length >= 20) izGonder();
  else zamanlayici ??= setTimeout(izGonder, 10_000);
}
