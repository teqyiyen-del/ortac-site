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
   AĞIRLIK            bağımlılık yok. Görüntüleme 1 sn içinde, diğer olaylar 10 saniyede bir ya da
                      sekme gizlenince tek istekle gidiyor (sendBeacon). Dinleyiciler
                      pasif; kaydırmada yalnız bir sayı güncelleniyor.
   AÇIK MI            layout.tsx yalnız IZLEME_ACIK=1 iken <Izleyici/> basıyor. Vercel'de
                      kapalı (kalıcı disk yok); kendi sunucumuza geçince açılacak.
   ========================================================================== */

type Deger = string | number | boolean;
export type IzOlay = { t: "g" | "c" | "t" | "o"; z: number; y: string } & Record<string, Deger>;

/* Olayların yazıldığı adres. Varsayılan sitenin kendi ucu. Site Vercel'de dururken
   kalıcı dosya tutamadığı için NEXT_PUBLIC_IZLEME_UC ile panelin ucu gösterilir
   (ör. https://panel.ortacglobal.com/api/olay); o zaman istek başka alan adına gider. */
const UC = process.env.NEXT_PUBLIC_IZLEME_UC || "/api/olay";
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
  /* Gövde düz metin türünde: tarayıcı başka alan adına JSON türünde sendBeacon
     göndermiyor (ön istek gerekir, sendBeacon yapamaz). Uçlar gövdeyi zaten metin
     olarak okuyup kendileri ayrıştırıyor. no-cors: cevabı okumuyoruz. */
  if (!navigator.sendBeacon?.(UC, new Blob([govde], { type: "text/plain" })))
    fetch(UC, { method: "POST", body: govde, keepalive: true, mode: "no-cors", headers: { "Content-Type": "text/plain" } }).catch(() => {});
}

export function izle(t: IzOlay["t"], veri: Record<string, Deger> = {}) {
  if (!acik) return;
  kuyruk.push({ ...veri, t, z: Date.now(), y: izYol() });
  if (kuyruk.length >= 20) return izGonder();
  /* GÖRÜNTÜLEME BEKLEMEZ (09.10.2026). İlk hâlinde her olay 10 sn kuyrukta
     duruyor, erken çıkan ziyaretçinin görüntülemesi yalnız sekme kapanırken
     giden isteğe kalıyordu. 62 sayfalık deneme gezisinde (sayfa başına 3 sn,
     başsız tarayıcı) o son istek hiç gitmedi ve 62 görüntülemenin 0'ı yazıldı.
     Görüntüleme 1 sn içinde gidiyor; tıklama ve olaylar 10 sn'de toplu. */
  if (t === "g") {
    clearTimeout(zamanlayici);
    zamanlayici = setTimeout(izGonder, 1000);
  } else zamanlayici ??= setTimeout(izGonder, 10_000);
}
