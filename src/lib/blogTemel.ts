/* ============================================================================
   BLOG ÇEKİRDEĞİ · tarayıcıya giden hafif parça (25.09.2026)

   NEDEN AYRI DOSYA: menü (Nav), footer ve sitenin her bağlantısının
   kullandığı SmartLink → routes.ts, blog.ts'ten yalnız kategori adlarını,
   adres üreticilerini, tarih biçimini ve örnek yazı eşlemesini alıyordu. Ama
   blog.ts on beş yazının GÖVDELERİYLE birlikte tek modül olduğu için hepsi
   tarayıcı paketine giriyordu: her sayfada ~115 KB (sıkıştırılmış 33 KB)
   yalnız bu yüzden iniyordu (optimizasyon turu, üretim derlemesi ölçümü).

   Burada YALNIZ veri içermeyen, küçük parçalar duruyor. blog.ts bunların
   hepsini yeniden dışa aktarıyor; sunucu tarafındaki import'lar değişmedi.
   Tarayıcıda çalışan bir bileşen blogdan bir şey isterse BURADAN alır, blog.ts'ten
   değil. Yazıların listesi ya da gövdesi gerekiyorsa sunucuda hesaplanıp prop
   olarak geçer (bkz. components/Nav.tsx → NavIstemci). */

/**
 * Yazının kategorisi. Değer aynı zamanda ADRES: /blog/kategori/<değer>. İkisini
 * ayrı tutmanın (label + ayrı slug alanı) bu boyutta bir karşılığı yok;
 * birleşince kategori sayfasının rotası kaydın kendisinden türüyor ve elle
 * tutulan bir eşleme kalmıyor.
 */
export type BlogCategory =
  | "ulke-rehberi"
  | "yapi-ve-ulke-secimi"
  | "kurulus-sonrasi"
  | "maliyet-ve-vergi"
  | "sektor-notlari";

/**
 * Ülke rehberi kategorisi. Sabit olarak duruyor çünkü bu depoda üç yer onu
 * ADIYLA tanımak zorunda: /kaynaklar hub'ındaki rehber kapısı, eski
 * /blog/rehberler adresinin yönlendirmesi ve rehber demo sayfası. Dizeyi üç
 * yere elle yazmak, kategori slug'ı bir gün değiştiğinde üçünü birden sessizce
 * kırardı.
 */
export const GUIDE_CATEGORY = "ulke-rehberi" as const satisfies BlogCategory;

/**
 * Sekmelerdeki ve kırıntılardaki sıra. Tarihe ya da sayıya göre değil, elle:
 * ziyaretçinin muhtemel sırası önce "hangi ülke, hangi yapı", sonra "ne
 * kadar tutuyor", sonra "kurulduktan sonra ne oluyor". Ülke rehberi başta
 * çünkü tek başına en kalabalık kategori ve bölümün dışarıdan en çok aranan
 * parçası.
 */
export const CATEGORY_ORDER: BlogCategory[] = [
  "ulke-rehberi",
  "yapi-ve-ulke-secimi",
  "maliyet-ve-vergi",
  "kurulus-sonrasi",
  "sektor-notlari",
];

/** Kategori adresi. Kalıp tek yerde dursun diye fonksiyon. */
export const categoryHref = (category: BlogCategory) => `/blog/kategori/${category}`;

/** Kategorinin BLOG İÇİNDEKİ adresi: /blog#<kategori>.
 *
 *  19.09.2026 · Burak: "ülke rehberini blogun içindeki bir kategori haline
 *  getirdik, apayrı bir şey muhabbetine döndürmek istemiyoruz. ama yine de
 *  yukarıda linkte kalsın istiyoruz. o yüzden kaynaklar kısmından ülke
 *  rehberine bastığında blog hashtag ülke rehberine gitsin."
 *
 *  İKİ ADRES BİRDEN YAŞIYOR VE İKİSİ DE DOĞRU:
 *    · `categoryHref` → /blog/kategori/<x>. Kendi başlığı, kendi canonical'ı
 *      ve JSON-LD'si olan, site haritasındaki gerçek sayfa. Aramadan gelen
 *      oraya düşüyor, blogun süzgeç çipleri de oraya bağlanıyor.
 *    · `categoryHashHref` → /blog#<x>. Sitenin KENDİ dolaşımı için: menüden
 *      ya da footer'dan girildiğinde ziyaretçi blogun içinde kalıyor, ayrı bir
 *      bölüme gitmiş gibi olmuyor.
 *  Çapa (#) Google için ayrı bir adres değil, yani bu ikinci biçim kategori
 *  sayfalarının yerini tutmaz — onun için ikisi birden var. */
export const categoryHashHref = (category: BlogCategory) => `/blog#${category}`;

/* ---------------------------------------------------- slug ve rota çakışması

   /blog/kategori ve /blog/rehberler ile /blog/<slug> AYNI SEGMENTTE. Yani
   "kategori" sluglu bir yazı yazılırsa iki rota aynı adrese talip olur: Next
   statik segmenti kazandırır, yazı sessizce erişilemez hâle gelir ve bu aylar
   sonra fark edilir. Tesadüfe bırakılmıyor — iki katmanlı denetim var ve
   ikisi de DERLEME ZAMANINDA çalışıyor:

     1. Bütün sluglar aşağıdaki SLUG kaydında toplanıyor ve `BlogSlug`
        ayrılmış olanları Exclude ile dışarıda bırakıyor. Ayrılmış bir slug
        kullanan kayıt "Type '\"rehberler\"' is not assignable to type
        BlogSlug" diye patlıyor.
     2. RESERVED_SLUG_GUARD kaydın kendisini denetliyor: ayrılmış bir slug
        SLUG'a yazıldığı anda — henüz hiçbir yazı kullanmasa bile — bu satır
        derlenmiyor.

   Yeni bir statik sayfa /blog altına eklenirse (örn. /blog/etiket) adı
   RESERVED_BLOG_SLUGS'a yazılır; gerisi kendiliğinden çalışır. */

/**
 * /blog altındaki YAZI OLMAYAN gerçek sayfalar.
 *
 * "rehberler" hâlâ burada çünkü hâlâ bir SAYFA: içeriği kalmadı ama
 * /blog/kategori/ulke-rehberi'ye 308 döndüren bir yönlendirme dosyası olarak
 * duruyor (app/blog/rehberler). Listeden çıkarılırsa o adla bir yazı yazılıp
 * yönlendirmeyi gölgede bırakması mümkün olurdu.
 */
export const RESERVED_BLOG_SLUGS = ["rehberler", "kategori"] as const;
export type ReservedBlogSlug = (typeof RESERVED_BLOG_SLUGS)[number];

/** Yazı adresleri. Yeni yazının ilk adımı: buraya bir satır. */
export const SLUG = {
  /* yayınlanmış tek gerçek yazı */
  dubaiMaliyet: "dubaide-sirket-kurmanin-maliyet-kalemleri",

  /* yer tutucu · ülke rehberi DIŞINDAKİ dört kategori */
  bolgeSecimi: "serbest-bolge-mi-mainland-mi",
  kurulusSonrasi: "kurulustan-sonra-takvimde-ne-var",
  bankaSorular: "banka-hesabi-acarken-neler-soruluyor",
  ukOnce: "ingilterede-limited-kurmadan-once",
  ulkeSecimi: "hangi-ulke-hangi-ise-uyuyor",
  vergiIkameti: "vergi-ikameti-ile-sirketin-ulkesi",
  eticaret: "e-ticaret-isini-yurt-disina-tasirken",
  yilSonu: "yil-sonu-kapanisinda-istenen-belgeler",

  /* yer tutucu · ülke rehberi kategorisi — ülke başına iki tane */
  dubaiRehber: "dubaide-hangi-isleri-kurabilirsiniz",
  dubaiIlkYil: "dubaide-ilk-yil-nasil-gecer",
  ingiltereRehber: "ingiltere-sirketi-kimin-isine-yariyor",
  ingiltereUzaktan: "ingilterede-uzaktan-yurutmenin-siniri",
  kktcRehber: "kktcde-neler-yapilabilir",
  kktcKimeUygun: "kktcde-sirket-kimin-icin-anlamli",
} as const;

/** Kullanılabilir slug'lar: kayıttakiler EKSİ ayrılmış olanlar. */
export type BlogSlug = Exclude<(typeof SLUG)[keyof typeof SLUG], ReservedBlogSlug>;

/**
 * Kayıt düzeyindeki denetim. Çakışma varsa bu sabitin tipi `true` olmaktan
 * çıkıyor ve atama derlenmiyor; hata metni de çakışan slug'ı yazıyor.
 * Dışa veriliyor ki "kullanılmayan değişken" uyarısı üretmesin.
 */
export const RESERVED_SLUG_GUARD: [Extract<
  (typeof SLUG)[keyof typeof SLUG],
  ReservedBlogSlug
>] extends [never]
  ? true
  : { ROTA_CAKISMASI: "Bu slug /blog altındaki bir sayfayla çakışıyor" } = true;

/** Yazının adresi. Adres kalıbı tek yerde dursun diye fonksiyon. */
export const blogHref = (slug: string) => `/blog/${slug}`;

/* ---------------------------------------------------------------- demo akışı

   MÜŞTERİNİN KARARI, birebir: "blog iç sayfasına erişimi açabiliriz demo
   olarak durur ve tüm bloglar tek bir sayfaya atar şimdilik demo test sayfası
   gibi olur o da örnektir fln derizde en azından live alalım akış otursun,
   ülke rehberide aynı şekilde."

   Yani iç sayfa akışı açıldı ama ON ALTI adres değil, İKİ adres yayına girdi
   (bkz. lib/routes.ts). Liste satırının bağlandığı yer bu yüzden yazının kendi
   adresi değil, kategorisinin demo sayfası.

   KATEGORİ EKLENDİ, DEMO SAYISI DEĞİŞMEDİ. Eşleme artık kategori başına
   yazılıyor ama hâlâ İKİ hedefe iniyor, çünkü depoda gerçekten yazılmış iki
   sayfa var ve üçüncü bir demo hedefi uydurmak olurdu:
   · ulke-rehberi → rehber listesinin en yenisi. Rehber kategorisinde yazılmış
                    yazı yok; sayfası zaten "Bu bir örnek kayıt" notuyla
                    açılıyor.
   · kalan dördü → yazılmış tek gerçek yazı. Demo sayfasının işi tasarımın DOLU
                    hâlini göstermek; yer tutucu bir gövde bunu yapamazdı.

   Kayıt `Record<BlogCategory, …>` olduğu için altıncı bir kategori eklendiğinde
   hedefinin ne olduğu ATLANAMIYOR; derlenmiyor.

   ADRESLER DEĞİŞMİYOR: her yazının kendi /blog/<slug> adresi, kendi kanoniği
   ve kendi robots kararı olduğu gibi duruyor — `blogHref` de duruyor ve
   kanonikleri o basıyor. Değişen tek şey listenin NEREYE bağladığı.

   GERİ ALMA: yazılar yayına girdiğinde bu blok siliniyor, liste yüzeyleri
   `blogHref`e dönüyor ve routes.ts'teki döngünün yerini bütün slug'lar
   alıyor. Başka hiçbir yere dokunmak gerekmiyor. */
export const DEMO_POST: Record<BlogCategory, BlogSlug> = {
  "ulke-rehberi": SLUG.dubaiRehber,
  "yapi-ve-ulke-secimi": SLUG.dubaiMaliyet,
  "maliyet-ve-vergi": SLUG.dubaiMaliyet,
  "kurulus-sonrasi": SLUG.dubaiMaliyet,
  "sektor-notlari": SLUG.dubaiMaliyet,
};

/**
 * Tarih biçimi: "22 Temmuz 2026".
 *
 * Intl + new Date(iso) kullanılmıyor. "2026-07-22" UTC gece yarısı olarak
 * çözülüyor ve sunucunun saat dilimi UTC'nin gerisindeyse gün BİR GERİ
 * kayıyor — künyede 21 Temmuz yazan bir yazı. Dize zaten parçalı geldiği
 * için elle biçimlendirmek hem deterministik hem de bağımsız.
 */
const AYLAR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const ay = AYLAR[Number(m) - 1];
  if (!y || !ay || !d) return iso;
  return `${Number(d)} ${ay} ${y}`;
}
