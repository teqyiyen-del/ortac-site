import { COUNTRY_SLUGS, pagedServicesFor } from "@/lib/services";

/* Dolaşım kayıt defteri — sitenin tek karar noktası.
 *
 * Buradaki liste "hangi sayfa VAR" değil, **"hangi sayfayı gezdirmeye hazırız"**
 * sorusunun cevabı. İkisi ayrı şey: kapatılan sayfalar silinmedi, rotaları
 * duruyor ve adresi yazan herkes açabiliyor. Kapanan tek şey SİTE İÇİ
 * BAĞLANTI — menüden, karttan, footer'dan oraya gidilemiyor.
 *
 * Neden: içeriği henüz elden geçirilmemiş sayfalar var. Müşteriye gösterirken
 * ziyaretçinin menüden yarım bir sayfaya düşmesi, sitenin tamamını yarım
 * gösteriyor. Kapalı girdi menüde duruyor ama sönük ve tıklanamaz — "burası
 * olacak, henüz değil" demenin en kısa yolu (bkz. SmartLink + [data-soon]).
 *
 * ARKA KAPI: /lab/kapali — kapatılmış her adresin çalışan bağlantısı orada.
 * Ayrıca adresi doğrudan yazmak da çalışıyor; hiçbir rota kaldırılmadı.
 *
 * BİR SAYFAYI AÇMAK: aşağıdaki listeye bir satır. Başka hiçbir yere dokunmak
 * gerekmiyor — menü, kartlar ve footer kendiliğinden canlanıyor.
 */

/* ---------------------------------------------------------------- ŞU AN AÇIK
   Bilerek kısa. Her satırın yanında neden açık olduğu yazıyor. */
const STATIC_LIVE = [
  "/", // ana sayfa
  "/dubai", // tek elden geçirilmiş ülke sayfası
  "/basla", // sitenin ana eylem çağrısı; kapanırsa gösterilecek bir akış kalmıyor
  "/sektorler/yazilim-ve-teknoloji", // yeni yazıldı, gösterilmek üzere
];

/* ------------------------------------------------------------- ŞU AN KAPALI
   Sayfalar duruyor, yalnızca site içi bağlantıları kesildi.

   · /ingiltere, /kktc — ve bu ülkelerin bütün hizmet sayfaları.
   · /dubai/… hizmet sayfalarının TAMAMI. Ülke sayfası elden geçirildi ama
     hizmet detay şablonu ilk günden beri değişmedi.
   · Kuruluşun ayrı sayfası artık YOK — /dubai/sirket-kurulusu ülke sayfasına
     yönleniyor, o yüzden bu listede de aranmıyor (bkz. services.ts).
   · /ulkeler — üç ülkeyi karşılaştırıyor; ikisi kapalıyken anlamı kalmıyor.
   · /uygunluk-testi, /araclar/uygunluk-testi — tek canlı aracımızdı, içeriği
     henüz ayarlanmadı.
   · /kaynaklar — içeriği elden geçirilmedi.

   DİKKAT — bunun görünür bir bedeli var ve bilerek kabul edildi:
   ana sayfadaki "Verdiğimiz hizmetler" kartlarının ülke seçicisi hizmet
   sayfalarına gidiyor; hepsi kapalı olduğu için o rozetlerin tamamı sönük
   çıkıyor. Bölüm duruyor ama tıklanacak yeri kalmıyor. İki çözüm var ve
   ikisi de tek satır: (a) Dubai'nin hizmet sayfalarını aç — aşağıdaki
   DUBAI_SERVICES_OPEN'ı true yap; (b) bölümü ana sayfadan geçici olarak
   çıkar. Karar müşterinin. */
const DUBAI_SERVICES_OPEN = false;

/** ana sayfada karşılığı gerçekten olan çapalar */
const HOME_ANCHORS = new Set([
  "surec",
  "ulkeler",
  "odeme-altyapisi",
  "neden-ortac",
  "hizmetler",
  "kaynaklar",
  "blog",
  "sss",
  "durus",
]);

const LIVE = new Set<string>(STATIC_LIVE);

/* Hizmet adresleri elle yazılmıyor: servicesFor() ne döndürüyorsa o. Böylece
   bayrak açıldığında liste kendiliğinden doğru oluyor — vize İngiltere'de yok
   ve burada da yok. */
if (DUBAI_SERVICES_OPEN) {
  for (const s of pagedServicesFor("dubai")) LIVE.add(`/dubai/${s.slug}`);
}

/** Adres yayında mı? Site dışı bağlantılar (http, mailto, tel) her zaman açık. */
export function isLive(href: string): boolean {
  if (!href || !href.startsWith("/")) return true;

  /* "/basla?ulke=dubai#form" — sorgu ve çapa ayrılıyor, karar yola göre */
  const [beforeHash, hash] = href.split("#");
  const rawPath = beforeHash.split("?")[0];
  const path = rawPath.length > 1 && rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;

  /* "/#surec" — ana sayfanın kendisi açık, çapanın karşılığı var mı ona bakılır */
  if (path === "" || path === "/") return !hash || HOME_ANCHORS.has(hash);

  /* /lab ve altındaki her şey iç alan: dolaşım kararının dışında, hep açık.
     Kapalı sayfalara giden arka kapı da orada yaşıyor. */
  if (path === "/lab" || path.startsWith("/lab/")) return true;

  return LIVE.has(path);
}

/** yalnızca teşhis için: menüdeki ölü adresleri saymak isteyene */
export const LIVE_ROUTES = LIVE;

/* ------------------------------------------------------------- ARKA KAPI
   /lab/kapali bu listeyi basıyor. Rotası var ama dolaşıma kapalı olan her
   adres burada; hepsi gerçek bağlantı olarak çıkıyor, yani iç alandan
   gezilebiliyor. Yeni bir sayfa kapatıldığında buraya da bir satır. */
export const CLOSED_ROUTES: { href: string; t: string; why: string }[] = [
  { href: "/ingiltere", t: "İngiltere", why: "içerik elden geçirilmedi" },
  { href: "/kktc", t: "KKTC", why: "içerik elden geçirilmedi" },
  ...COUNTRY_SLUGS.flatMap((c) =>
    pagedServicesFor(c)
      .filter(() => !(c === "dubai" && DUBAI_SERVICES_OPEN))
      .map((s) => ({
        href: `/${c}/${s.slug}`,
        t: `${c} · ${s.title}`,
        why: "hizmet detay şablonu ilk günden beri değişmedi",
      })),
  ),
  { href: "/ulkeler", t: "Ülke karşılaştırması", why: "iki ülke kapalıyken anlamı kalmıyor" },
  { href: "/uygunluk-testi", t: "Uygunluk testi", why: "içeriği ayarlanmadı" },
  { href: "/araclar/uygunluk-testi", t: "Uygunluk testi (araçlar altında)", why: "içeriği ayarlanmadı" },
  { href: "/kaynaklar", t: "Kaynaklar", why: "içerik elden geçirilmedi" },
  { href: "/hero-beyaz", t: "Hero · beyaz deneme", why: "iç deneme sayfası, menüde hiç olmadı" },
];
