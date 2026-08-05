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
  /* İletişim — müşteri bilerek ve bilgilendirilmiş şekilde açtı:
     "iletişim sayfasını bu haliyle live aç. zaten sadece murat abi görcek
     eksik bilgiler sorun değil."

     AÇIK EKSİK, kayıt için: sayfanın ÇALIŞAN HİÇBİR KANALI YOK. Form bir uç
     noktaya bağlı değil (buton disabled, sahte onay ekranı da yok) ve üç
     ofisin telefon/WhatsApp/e-posta/adresi boş olduğu için üç kanal kartının
     üçü de tıklanamıyor. Ziyaretçinin kullanabildiği tek çıkış /basla.
     Gerçek lansmandan önce kapanması gereken iki şey: offices.ts'in dolması
     ve forma bir gönderim adresi. */
  "/iletisim",
  /* Ülke karşılaştırması — bu turda sayfanın işi değişti, o yüzden açıldı.
     Eskiden ana sayfanın kıyas tablosunun soluk bir kopyasıydı ve "iki ülke
     kapalıyken anlamı kalmıyor" diye kapatılmıştı. Artık tam tersi: detaylı
     kıyas (üç grup, on üç ölçüt) buraya taşındı, ana sayfada dört ölçütlük
     özet kaldı. Yani sayfa artık ana sayfanın gönderdiği yer — kapalı kalması
     ana sayfadaki "detaylı kıyas" çıkışını ölü bırakırdı.
     İngiltere ve KKTC hâlâ kapalı ama kıyas tablosu onların SAYFASINA değil,
     kendi içindeki sütunlara bakıyor; tablo üç ülkeyi de gösteriyor. */
  "/ulkeler",
  /* Uygunluk testi — müşteri açılmasını istedi: "onu detaylı optimize edip
     gerekli tasarım ve sorularında düzenlemeler yapıp tekrar açalım."
     İki adres de açılıyor çünkü /uygunluk-testi, /araclar/uygunluk-testi'nin
     yeniden dışa aktarımı; biri açık biri kapalı olursa aynı sayfa menünün
     bir yerinde gidilir, başka yerinde gidilmez olurdu.

     AÇIK KONU, kayıt için: puan ağırlıkları hâlâ SWAP:FIT_WEIGHTS, yani
     teyit edilmedi — ve hangi ülkenin önerileceğini onlar belirliyor.
     192 cevap kombinasyonunun tamamı çalıştırıldı: KKTC yalnızca %8'inde
     birinci çıkıyor ve teorik tavanı Dubai'nin %33 altında, yani şu hâliyle
     yapısal olarak kazanamıyor. Ağırlıklar onaylanana kadar test bir kısa
     liste aracı; sonuç ekranı da bunu açıkça söylüyor (hüküm kurmuyor,
     puan farkını ve farkın tek cevapla dönüp dönmediğini yazıyor). */
  /* Araçlardan CANLI OLAN TEK ŞEY uygunluk testi. Müşterinin kararı:
     "şuan tüm araçların içini yapmana gerek yoktu ama kalsın sorun değil
     sadece live alma. live olarak sadece uygunluk testi kalsın şimdilik."

     Yazılan araçlar (BAE kurumlar vergisi, KDV, isim üreteci, belge listesi,
     yükümlülük takvimi, oturum sayacı) silinmedi — rotaları duruyor, adresi
     yazan görüyor, /lab/kapali'dan gezilebiliyor. Kapalı olan yalnızca site
     içi dolaşım. Her biri kendi sayfasına ayrıldıkça ve içeriği onaylandıkça
     buraya tek satırla girecekler. */
  "/uygunluk-testi",
  "/araclar/uygunluk-testi",
  /* Kurumsal panelinin iki yeni girdisi. Müşteri paneli "çok boş" bulduğu için
     eklendiler; kapalı bırakılsalardı panel dört sönük kartla daha da boş
     görünürdü — yani eklenmelerinin sebebi ortadan kalkardı.

     İkisi de BİLEREK BOŞ ve boşluğu dürüstçe gösteriyor: basın kaydımız yok,
     açık pozisyonumuz yok. Şemalar uydurmayı engelliyor — basın kaydı `url` ve
     `publishedAt` olmadan, ilan `applyHref` olmadan tip denetiminden geçmiyor.
     Yani sayfalar dolduğunda gerçek olacak. */
  "/basinda-biz",
  "/kariyer",
  /* Kaynaklar — bu turda tek bir "kaynaklar" yığını dört ayrı türe bölündü:
     blog (yazılar), ülke rehberleri (ülkenin kendi verisinden türeyen numaralı
     yol), gelişmeler (tarih eksenli mevzuat akışı) ve e-kitaplar. Müşterinin
     teşhisi buydu: "kaynaklar kısmında aslında hepsi aynı yere çıkıyor."

     Dördü de ÜST DÜZEY rota, /kaynaklar/... değil — çünkü blog zaten
     /blog/[slug]'da yaşıyor ve dizinini /kaynaklar/blog'a koymak aynı türü iki
     ayrı derinliğe bölerdi. /kaynaklar artık bir yığın değil, dört kapılı giriş.

     Gelişmeler ve e-kitaplar bugün BOŞ ve bilerek boş: şema kaynağı zorunlu
     tutuyor (Update.source ve Ebook.file olmadan kayıt tip denetiminden
     geçmiyor), yani uydurma bir mevzuat değişikliği ya da indirilemeyen bir
     e-kitap yazılamıyor. Sayfalar boş durumu dürüstçe gösteriyor. */
  "/kaynaklar",
  "/blog",
  /* Rehberler artık ayrı bir bölüm DEĞİL, blog'un bir türü. Adres /blog altına
     taşındı; /rehberler 308 ile oraya yönleniyor ve listede kalmasının tek
     sebebi o yönlendirmenin sönük çıkmaması. */
  "/blog/rehberler",
  "/gelismeler",
  "/e-kitaplar",
  /* Hakkımızda — bu turda açıldı. Müşterinin talimatı net: "bu sayfayı live
     al." Sayfa iç kontrolden geçti: ekranda SWAP: sızıntısı yok, çıkan
     bağlantıların hepsi ya yayında ya bilerek sönük, JSON-LD'de yer tutucu
     alan yok (foundingDate / address / telephone hiç basılmıyor) ve sayfada
     tek bir <h1> var.

     AÇILMASININ İKİNCİ BİR SONUCU DAHA VAR: Nav'daki Kurumsal panelinde dört
     kart duruyor ve ikisi sönüktü. Bu satırla biri canlanıyor; sönük kalan
     tek kart /is-ortakligi ve o BİLEREK kapalı — başka bir turda açılacak. */
  "/hakkimizda",
  /* Dubai muhasebe — bu turda açıldı. Müşterinin talimatı: "dubai muhasebe
     sayfasını sitede görünür yapsana."

     NEDEN AŞAĞIDAKİ DUBAI_SERVICES_OPEN BAYRAĞI DEĞİL: o bayrak Dubai'nin
     DÖRT hizmet sayfasını birden açıyor (muhasebe, banka-hesabi, oturum-vize,
     uyum). Muhasebe'nin kendi elden geçirilmiş sayfası var
     (app/dubai/muhasebe/); diğer üçü hâlâ app/dubai/[hizmet] genel şablonunu
     kullanıyor ve o şablon ilk günden beri değişmedi. Bayrağı çevirmek
     istenmeyen üç sayfayı da yayına sokardı, o yüzden tek adres elle
     ekleniyor. Diğer üçü hazır olduğunda bayrak çevrilir ve bu satır kalkar. */
  "/dubai/muhasebe",
];

/* ------------------------------------------------------------- ŞU AN KAPALI
   Sayfalar duruyor, yalnızca site içi bağlantıları kesildi.

   · /ingiltere, /kktc — ve bu ülkelerin bütün hizmet sayfaları.
   · /dubai/… hizmet sayfalarından ÜÇÜ: banka-hesabi, oturum-vize, uyum.
     Üçü de app/dubai/[hizmet] genel şablonunu kullanıyor ve o şablon ilk
     günden beri değişmedi. MUHASEBE ARTIK AÇIK — kendi sayfası var ve elden
     geçirildi (bkz. STATIC_LIVE).
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
  {
    href: "/araclar",
    t: "Araçlar",
    why: "araçlar yazıldı ama live alınmayacak; şimdilik yalnızca uygunluk testi açık",
  },
  ...COUNTRY_SLUGS.flatMap((c) =>
    pagedServicesFor(c)
      .filter(() => !(c === "dubai" && DUBAI_SERVICES_OPEN))
      .map((s) => ({
        href: `/${c}/${s.slug}`,
        t: `${c} · ${s.title}`,
        why: "hizmet detay şablonu ilk günden beri değişmedi",
      })),
  ),
  { href: "/hero-beyaz", t: "Hero · beyaz deneme", why: "iç deneme sayfası, menüde hiç olmadı" },

  /* Bu turda YAZILAN sayfalar. Hazır olmadıkları için değil, iç kontrolden
     geçmedikleri için kapalılar — müşteri görmeden önce bakılacak. Onay
     gelince tek yapılacak şey adreslerini STATIC_LIVE'a taşımak. */
  /* /dubai/muhasebe ve /hakkimizda buradan ÇIKTI, ikisi de STATIC_LIVE'a
     girdi — gerekçeleri orada. Kapalı listede kalsalardı /lab/kapali onları
     hem kapalı gösterir hem de canlı bir bağlantı olarak basardı. */
  { href: "/is-ortakligi", t: "İş ortaklığı", why: "yeni yazıldı, iç kontrol bekliyor" },
  {
    href: "/blog/dubaide-sirket-kurmanin-maliyet-kalemleri",
    t: "Blog · örnek yazı",
    why: "yeni yazıldı, iç kontrol bekliyor",
  },
];
