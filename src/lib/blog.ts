import { COUNTRY_NAME, FACTS, STANCE_LIMITS, type CountrySlug } from "@/lib/brand";
import {
  AFTER_SETUP,
  INCLUSION_LABEL,
  RHYTHM_LABEL,
  type AfterItem,
} from "@/lib/afterSetup";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { COUNTRY_PHOTO, GUIDE_PHOTO, POST_PHOTO } from "@/lib/media";

/* ============================================================================
   BLOG — yazı kayıt defteri  ·  /blog/[slug]

   Bu dosya sitedeki yazıların tek kaynağı. Sayfa şablonu (app/blog/[slug])
   tek bir cümle taşımıyor: ne yazıyorsa buradan okuyor. Sebebi sektör
   sayfasındakiyle aynı — içeriği gözden geçirecek olan kişi (mali müşavir,
   müşteri) bir React bileşenini okumak zorunda kalmasın, tek dosyayı baştan
   sona okuyup onaylayabilsin.

   ---------------------------------------------------------------------------
   GÖVDE NEDEN HTML STRING DEĞİL?
   ---------------------------------------------------------------------------
   Gövde `BlogBlock[]`, yani yapılandırılmış veri. Ham HTML tutmanın üç bedeli
   olurdu ve üçü de bu projede gerçek:

   1. Tipografi yazıya kaçardı. Bir yazıda <p style> yazan, ötekinde yazmayan
      bir editör iki farklı görünüm üretirdi. Blok listesi tipografiyi CSS'e
      bırakıyor: aynı `p` bloğu her yazıda aynı görünüyor.
   2. Gözden geçirilemezdi. "Bu rakam nereden geliyor?" sorusunun cevabı
      etiketlerin arasında kaybolurdu. Blok listesinde her iddia ayrı bir
      satır ve çoğu doğrudan veri dosyalarından türüyor (aşağıya bakın).
   3. dangerouslySetInnerHTML gerekirdi. İçeriği elle giren biri için bu
      gereksiz bir risk; blok listesinde böyle bir kapı hiç açılmıyor.

   ---------------------------------------------------------------------------
   RAKAMLAR ELLE YAZILMIYOR — TÜREYEN İÇERİK
   ---------------------------------------------------------------------------
   Yazının içindeki her tutar, oran ve süre depodaki doğrulanmış veriden
   okunuyor: lib/afterSetup.ts (muhasebe tarafının onayladığı kuruluş sonrası
   kalemler), lib/countryContent.ts (ülke sayfasında zaten yayınlanan vergi
   çerçevesi) ve lib/brand.ts (sabitler ve firmanın duruşu). Yazıya elle
   girilmiş TEK BİR rakam yok.

   Bu bir üslup tercihi değil, içerik kuralı: aynı rakam iki yerde yazılırsa
   biri güncellenip öteki unutulur ve site kendi kendisiyle çelişir. Kaynak
   dosyada 350 USD 400 USD olduğu gün bu yazı da 400 USD diyor.

   DİKKAT — SWAP:AFTER_PRICING: afterSetup.ts'teki aylık muhasebe 350 USD/ay
   (12 ayda 4.200), oysa lib/pricing.ts'teki PRICING.dubai.annual = 2100.
   Çelişki bizim çözeceğimiz bir şey değil (bkz. afterSetup.ts dosya başı) ve
   burada da çözülmedi: yazı, /dubai sayfasındaki "kuruluş sonrası" bölümüyle
   AYNI kaynağı okuyor, yani ikisi hiçbir zaman birbirini tutmaz hâle gelmiyor.
   Müşteri hangi rakamda karar kılarsa fiyat yapılandırıcısıyla birlikte bu
   yazı da o rakama geçer.

   ---------------------------------------------------------------------------
   YENİ YAZI EKLEMEK
   ---------------------------------------------------------------------------
   İki iş: (1) aşağıdaki SLUG kaydına bir satır, (2) bir `BlogPost` nesnesi
   yazıp BLOG_POSTS dizisine eklemek. Rota (generateStaticParams), okuma
   süresi, içindekiler, JSON-LD, tür filtresi ve "diğer yazılar" listesi
   kendiliğinden doğru oluyor — şablonda hiçbir şey değişmiyor. Yazının adresi
   de buradan: blogHref(post.slug).

   NOT — /blog ve /blog/rehberler DOLAŞIMA AÇIK, tek tek YAZI adresleri
   (/blog/<slug>) değil (lib/routes.ts). Yani listeler geziliyor ama satırdaki
   başlık sönük ve tıklanamaz çıkıyor; adresi elle yazan sayfayı görüyor. Bu
   kasıtlı: iç kontrol bitmeden yazılar müşteriye gösterilmeyecek. Açma işi
   routes.ts'e bir satır.

   ---------------------------------------------------------------------------
   YER TUTUCU KAYITLAR — bu turdaki politika değişikliği
   ---------------------------------------------------------------------------
   Önceki tur yer tutucuları ayrı bir dizide (DRAFT_POSTS) tutuyor, listede
   ayrı bir "Hazırlananlar" başlığı altında, tarihsiz ve okuma süresiz
   basıyordu. Müşteri bunu reddetti — şu an TASARIM yapılıyor ve o ayrım
   sayfanın dolu hâlini görünmez kılıyordu:

     "hazırlananlar diye bir kısım yapıp fln kafa sikme yani şu blogunda
      ülke rehberininde tasarımını adam akıllı yap sanki içinde bir şeyler
      varmış gibi"

   Bugünkü hâl: yer tutucular yayınlanmış yazılarla AYNI dizide, AYNI satır
   biçiminde, tarihli ve okuma süreli. Ayrımı taşıyan tek şey `placeholder`
   alanı ve onun ekrandaki karşılığı olan küçük "Örnek" işareti.

   KORUNAN SINIR — yer tutucunun GÖVDESİ OLGU İDDİASI TAŞIMIYOR. Ne oran, ne
   eşik, ne süre, ne otorite kararı, ne kanun maddesi. Gövde yalnızca
   içindekiler düzeyinde: hangi sorular ele alınacak, hangi kalemler yan yana
   konacak. Başlık ve özet konuyu söylüyor, sonucu iddia etmiyor — doğru
   biçim "serbest bölge mi mainland mi: seçim neye göre yapılıyor", yanlış
   biçim "serbest bölgede oran şu, mainland'de bu".

   YAPILANDIRILMIŞ VERİYE GİRMİYORLAR. Görsel yer tutucu bir tasarım kararı;
   JSON-LD'ye sahte kayıt yazmak arama motoruna yanlış beyandır. Liste
   sayfaları JSON-LD'yi `publishedPosts()` üzerinden kuruyor, yazı sayfası da
   yer tutucuda Article düğümü hiç basmıyor ve noindex dönüyor.

   ---------------------------------------------------------------------------
   ÜLKE REHBERİ AYRI BİR BÖLÜM DEĞİL, KATEGORİLERDEN BİRİ
   ---------------------------------------------------------------------------
   Bu karar üç turda gidip geldi; sonu burada bağlandı, o yüzden bütün yol
   yazılı duruyor.

   1. TUR — rehber ayrı bir üst düzey sayfaydı (/rehberler): ülkenin kendi
      verisinden türeyen numaralı bir yol, blogla hiç ilgisi olmayan bir
      biçim.
   2. TUR — müşteri iki bölümü sorguladı: "format aynı yani, tıklayacak ve
      yazı açılacak. ama iki farklı sayfa olması biraz google ın kafasını
      karıştırır mı emin değilim? tek bir blog sayfası olup ordan bi bloglara
      bir de ülke rehberlerine üst filtre gibi switch atabiliriz belki."
      Rehber bir YAZI oldu (kind: "blog" | "rehber") ama adresi hâlâ ayrıydı:
      /blog/rehberler kendi rotası, kendi sayfasıydı.
   3. TUR — kafa karışıklığı bitmedi ve müşteri sebebini söyledi: "ülke
      rehberi olayınıda napcaz diyodukya hiç kafa karıştırmayıp blogun bir
      katagorisi olarak mı konumlandırsak napsak? o olay biraz kafamı
      karıştırıyor."

   KARIŞTIRAN ŞEY TÜRÜN KENDİSİ DEĞİLDİ, İKİNCİ EKSENDİ. Kayıtta iki ayrı
   sınıflandırma vardı: `kind` (blog / rehber) ve serbest metin bir `category`
   ("Maliyet ve bütçe", "Ülkede ne yapılabilir"...). İkisi de ekranda yan yana
   basılıyordu ve hangisinin gerçek eksen olduğu belli değildi. Rehber ayrı bir
   rotaya da sahip olunca üçüncü bir şey daha oldu: ayrı bir BÖLÜM gibi
   göründü.

   BUGÜNKÜ ŞEMA — TEK EKSEN. `kind` KALDIRILDI. Yazının sınıflandırması tek bir
   alan: `category`, kapalı bir liste (BlogCategory) ve "Ülke rehberi" o
   listenin bir üyesi. Serbest metin eski etiket `topic` adıyla duruyor ve
   yalnızca künyede/satırda görünen ikinci derece bir konu ibaresi; hiçbir
   listeyi, sayacı, adresi belirlemiyor.

   İki ayrı üst düzey bölüm Google'ı KARIŞTIRMAZ; asıl risk SEYRELMEYDİ.
   İçeriği az bir sitede iki bölüm aynı konu alanı için yarışır, iç bağlantı ve
   otorite ikiye bölünür. Bugün toplam bir yayınlanmış yazı var. Tek bölümde
   bütün iç bağlantılar aynı yere işaret ediyor ve zaten sıralamaya giren şey
   bölüm sayfası değil yazının kendisi (/blog/<slug>).

   ADRES ŞEMASI — bu dosyanın bildiği tek şema:
     /blog                        · hepsi
     /blog/kategori/<kategori>    · tek kategori, beş adresin hepsi aynı kalıp
     /blog/<slug>                 · yazının kendisi, KATEGORİSİNDEN BAĞIMSIZ

   /blog/rehberler SİLİNMEDİ, 308 ile /blog/kategori/ulke-rehberi'ye yönleniyor
   (app/blog/rehberler). Aynı kalıp bir tur önce /rehberler için kurulmuştu ve
   sebebi aynı: adres yayında, dışarıdan bağlantı almış olabilir ve bu depoda
   sayfası olmayan her yol app/[...yapim] yakalayıcısına düşüp HTTP 200
   döndüğü için silinen bir adres ölü değil, SESSİZCE ölü olurdu.

   `country` alanı kategoriden ayrı duruyor ve duruyor kalıyor: bir maliyet
   yazısı da tek bir ülkeyi ilgilendirebilir (bugünkü Dubai yazısı gibi), bir
   rehber de üç ülkeyi birden ele alabilir.
   ========================================================================= */

/* ------------------------------------------------------------------ kategori

   KATEGORİLER UYDURULMADI, VAR OLAN KAYITLARDAN ÇIKTI. Depodaki on beş kaydın
   serbest metin etiketi dokuz farklı değer taşıyordu; dokuzu da aşağıdaki beş
   başlıktan birinin altına giriyor ve hiçbiri kayboluyor değil, `topic`
   alanında satırda görünmeye devam ediyor:

     Ülke rehberi        ← Ülkede ne yapılabilir · Kimin için uygun · İlk yıl
     Yapı ve ülke seçimi ← Yapı seçimi · Ülke seçimi
     Kuruluş sonrası     ← Kuruluş sonrası · Banka ve ödeme · Muhasebe
     Maliyet ve vergi    ← Maliyet ve bütçe · Vergi çerçevesi
     Sektör notları      ← Sektör notları

   BİR KAYIT TEK KATEGORİYE GİRİYOR. Çoklu kategori üç şeyi birden bozuyordu ve
   üçü de bu depoda somut:

     1. SAYAÇLAR. Kategori sayılarının toplamı kayıt sayısını aşardı; sayfanın
        üstünde "15 yazı" yazarken sekmelerin toplamı 19 ederdi. Bir tur önce
        /kaynaklar şeridi tam bu yüzden yanlış sayı basıyordu (blog için 15
        derken sayfa 9 kart gösteriyordu) ve düzeltilmişti.
     2. LİSTENİN İLK KAYDI. Her liste en yeniyi büyük kartla basıyor; aynı
        kayıt iki listenin birden başında dururdu.
     3. ZATEN VAR OLAN İKİNCİ EKSEN. Çok değerli sınıflandırmanın yeri `tags`
        ve o alan duruyor; `country` da ülke eksenini ayrıca taşıyor. Üçüncü
        bir çok değerli eksen eklemek, süzmeyi karmaşıklaştırıp hiçbir yeni
        şey söylemezdi.

   Tek kategori ayrıca `Record<BlogCategory, …>` yazmayı mümkün kılıyor: yeni
   bir kategori eklendiği anda etiketi, sayfa metni ve demo hedefi eksik
   kalamıyor, TypeScript söylüyor. */

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

export type CategoryMeta = {
  /** ekrandaki tek ad: sekme, rozet, kırıntı ve künye aynı kelimeyi kullanıyor */
  label: string;
  /**
   * Sayım cümlesinin birimi; küçük harf, çünkü cümlenin içinde geçiyor.
   * Rehber dışındaki dördünde "yazı" — hepsi blog yazısı ve kategori adını
   * cümleye ikinci kez sokmak ("3 yapı ve ülke seçimi yazısı") okunmuyordu.
   */
  unit: string;
  /** kategori sayfasının tek h1'i */
  title: string;
  /** PageHero/SplitWords kuralı: başlığın SONUNDA geçen parça vurgulanıyor */
  accent: string;
  /** h1'in altındaki tek paragraf */
  lead: string;
  seo: { title: string; description: string };
};

/**
 * Kategorilerin ekran metni. Beş kategori beş GERÇEK sayfa demek; her birinin
 * kendi <title>'ı, kendi h1'i ve kendi açıklaması olmak zorunda. Metinler
 * burada duruyor ki sayfa şablonu tek bir cümle taşımasın — dosyanın
 * başındaki kuralın aynısı.
 *
 * Hiçbir açıklama bir OLGU İDDİASI taşımıyor: hepsi o kategoride hangi
 * soruların ele alındığını söylüyor, cevabı değil.
 */
export const CATEGORY: Record<BlogCategory, CategoryMeta> = {
  "ulke-rehberi": {
    label: "Ülke rehberi",
    unit: "ülke rehberi",
    title: "Hangi ülkede neler yapılabilir?",
    accent: "neler yapılabilir?",
    lead: "Ülke rehberi blogun bir kategorisi: her biri bir ülkede hangi işlerin kurulabildiğini, kimin için anlamlı olduğunu ve sınırının nerede olduğunu anlatıyor. Öteki kategoriler bir konuyu açıyor; üstteki şerit aralarında geçiş yapıyor.",
    seo: {
      title: "Ülke rehberleri: Dubai, İngiltere ve KKTC | Ortac Global",
      description:
        "Dubai, İngiltere ve KKTC'de neler yapılabildiğini anlatan rehberler. Blog bölümünün ülke rehberi kategorisi; öteki kategoriler kendi adreslerinde.",
    },
  },
  "yapi-ve-ulke-secimi": {
    label: "Yapı ve ülke seçimi",
    unit: "yazı",
    title: "Karar hangi sorulara bakıyor?",
    accent: "hangi sorulara bakıyor?",
    lead: "Kuruluş kararından önce cevaplanan sorular: serbest bölge mi mainland mi, hangi ülke hangi işe uyuyor, yapı sonradan değiştirilebiliyor mu.",
    seo: {
      title: "Yapı ve ülke seçimi yazıları | Ortac Global",
      description:
        "Serbest bölge ile mainland arasındaki tercih, ülke seçimi ve kuruluş kararından önce cevaplanması gereken sorular üzerine yazılar.",
    },
  },
  "maliyet-ve-vergi": {
    label: "Maliyet ve vergi",
    unit: "yazı",
    title: "Ne ödeniyor, vergi nasıl işliyor?",
    accent: "vergi nasıl işliyor?",
    lead: "Kuruluş anında ödenen ve sonradan tekrar eden kalemler, vergi kaydı ve ikamet soruları. Her tutarın hangi belgeden geldiği yazının içinde yazılı.",
    seo: {
      title: "Maliyet ve vergi yazıları | Ortac Global",
      description:
        "Şirket kurmanın maliyet kalemleri, kuruluş sonrası tekrar eden ödemeler ve vergi ikameti soruları üzerine yazılar. Her rakamın kaynağı yazılı.",
    },
  },
  "kurulus-sonrasi": {
    label: "Kuruluş sonrası",
    unit: "yazı",
    title: "Kuruluştan sonra takvimde ne var?",
    accent: "takvimde ne var?",
    lead: "Şirket kurulduktan sonra açılan başlıklar: banka hesabı, kayıt yükümlülükleri, yıl sonu kapanışı ve yenileme takvimi.",
    seo: {
      title: "Kuruluş sonrası yazıları | Ortac Global",
      description:
        "Şirket kurulduktan sonra takvime giren başlıklar: banka hesabı açılışı, kayıt yükümlülükleri, yıl sonu kapanışı ve lisans yenileme.",
    },
  },
  "sektor-notlari": {
    label: "Sektör notları",
    unit: "yazı",
    title: "İşin türüne göre ne değişiyor?",
    accent: "ne değişiyor?",
    lead: "Bir işi yurt dışına taşırken adımların hangi sırayla kurulduğu ve sektörün bu sırayı nasıl değiştirdiği.",
    seo: {
      title: "Sektör notları | Ortac Global",
      description:
        "Bir işi yurt dışına taşırken adımların hangi sırayla kurulduğunu ve sektöre göre neyin değiştiğini ele alan yazılar.",
    },
  },
};

/** Kategori adresi. Kalıp tek yerde dursun diye fonksiyon. */
export const categoryHref = (category: BlogCategory) => `/blog/kategori/${category}`;

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
const SLUG = {
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

/* ------------------------------------------------------------------ tipler */

/** Künye satırında ve tabloda kullanılan etiket/değer çifti. */
export type BlogFact = {
  label: string;
  value: string;
  /** değeri nitelendiren şerh; tabloda değerin altına küçük punto düşer */
  note?: string;
};

/**
 * Gövdenin yapı taşları. Liste bilerek kısa: her yeni blok türü şablonda bir
 * dal, CSS'te bir kural demek. Bir yazı bu sekiziyle anlatılamıyorsa sorun
 * büyük ihtimalle yazıda, blok listesinde değil.
 */
export type BlogBlock =
  /** düz paragraf */
  | { kind: "p"; text: string }
  /**
   * Gövde başlığı. `id` zorunlu, çünkü içindekiler listesi bu bloklardan
   * türüyor ve sayfa içi bağlantı o id'ye iniyor. Sayfadaki tek h1 yazının
   * başlığı olduğu için gövde başlıkları h2'den başlıyor.
   */
  | { kind: "h2"; id: string; text: string }
  /** h2'nin altındaki ara başlık; hiyerarşi atlanmasın diye ayrı tür */
  | { kind: "h3"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  /** alıntı: firmanın kendi duruş metinleri için — kaynağı `source` söyler */
  | { kind: "quote"; text: string; source?: string }
  /**
   * Kenar notu. `warn` bir sınırı/uyarıyı, `info` bir açıklamayı taşır.
   * Uyarılar bilerek <details> içine girmiyor: kısıt tıklanmadan görünür
   * kalmalı, yoksa "özet önde" ilkesi kısıtı gizlemenin bahanesi olur.
   */
  | { kind: "note"; tone: "info" | "warn"; title: string; text: string }
  /**
   * Rakam tablosu. Yazının içindeki tutarların tamamı bu blokta duruyor:
   * paragrafın içine serpiştirilmiş rakam hem okunmuyor hem de güncellenirken
   * gözden kaçıyor.
   */
  | {
      kind: "facts";
      caption: string;
      rows: BlogFact[];
      /** varsa tablonun altına çizgiyle ayrılmış toplam satırı */
      total?: { label: string; value: string };
      foot?: string;
    }
  /**
   * Kapalı ayrıntı. Müşterinin ana ilkesinin yazı içindeki karşılığı: kapsam
   * listeleri gibi ikincil ayrıntı açıkken metin duvarı yapıyor, tıklamayla
   * açıldığında yazının akışını bozmuyor.
   */
  | { kind: "details"; summary: string; items: string[] };

export type BlogPost = {
  /** SLUG kaydından; ayrılmış adreslerle çakışması tip düzeyinde engelli */
  slug: BlogSlug;
  /**
   * Yazının kategorisi — ZORUNLU ve TEK. Bu alan yazının hangi listede
   * çıkacağını ve hangi kategori adresinde görüneceğini belirliyor: /blog
   * hepsini, /blog/kategori/<kategori> yalnızca o kategoriyi basıyor. Yazının
   * KENDİ adresini değiştirmiyor; her yazı kategorisinden bağımsız olarak
   * /blog/<slug>'da yaşıyor.
   *
   * Kapalı liste olması bilinçli: serbest metin bir kategori alanı, aynı
   * konunun iki farklı yazımıyla ("Muhasebe" / "muhasebe") iki ayrı sekme
   * üretir ve sayaçlar sessizce yanlışa döner.
   */
  category: BlogCategory;
  /**
   * Yer tutucu kayıt — tasarımın dolu hâlini görebilmek için konuldu.
   *
   * ADI NEDEN `draft` DEĞİL: "taslak" yayın akışında bir AŞAMA (yazıldı,
   * bekliyor). Bunlar yazılmadı; gövdeleri bilerek içindekiler düzeyinde
   * duruyor ve hiçbir zaman "yayına alınmayacak" — yerlerini gerçek yazı
   * alacak. Alan adı ne olduklarını söylüyor.
   *
   * NEREDE FARK EDİYOR — üç yerde, üçü de bilinçli:
   *   1. Listede ve künyede küçük bir "Örnek" işareti çıkıyor. Ayrı bölüm,
   *      kesik çizgi, sönüklük YOK: kayıt her şeyiyle normal bir satır.
   *   2. JSON-LD'ye girmiyor (`publishedPosts`) ve kendi sayfası noindex.
   *      Görsel yer tutucu tasarım kararı, yapılandırılmış veriye sahte
   *      kayıt yazmak arama motoruna yanlış beyan.
   *   3. Ana sayfanın büyük kartına giremiyor (bkz. sortedPosts).
   *
   * Alanın silinmesi = yayına alınması; gövdenin gerçekten yazılmış olması
   * şartıyla.
   */
  placeholder?: true;
  title: string;
  /** SplitWords/PageHero kuralı: başlığın SONUNDA geçen parça vurgulanır */
  heroAccent: string;
  /** kart özeti ve meta açıklaması; ana sayfadaki kartla aynı cümle */
  summary: string;
  /** ISO tarih (YYYY-AA-GG) — künye, sıralama ve JSON-LD aynı alandan okur */
  publishedAt: string;
  /** yazı gerçekten güncellendiyse doldurulur; boşken JSON-LD'ye alan yazılmaz */
  updatedAt?: string;
  /**
   * İKİNCİ DERECE konu ibaresi — kategorinin altındaki tek kelimelik ayrıntı
   * ("Muhasebe", "Banka ve ödeme", "İlk yıl"). Eskiden `category` adındaydı ve
   * ekranda türle yan yana basıldığı için hangisinin gerçek eksen olduğu belli
   * değildi; kafa karışıklığının kaynağı buydu (bkz. dosya başı).
   *
   * ADI DEĞİŞTİ ÇÜNKÜ İŞİ DEĞİŞTİ: artık hiçbir listeyi, sayacı, adresi ya da
   * yapılandırılmış veriyi belirlemiyor. Yalnızca satırda ve künyede
   * görünüyor, kategoriden sonra. Serbest metin kalması da bu yüzden sorun
   * değil: iki farklı yazım iki ayrı sekme üretmiyor, yalnızca iki farklı
   * cümle oluyor.
   */
  topic: string;
  /**
   * Yazı bir ülkeyle ilgiliyse o ülke. KATEGORİDEN BAĞIMSIZ: bir maliyet
   * yazısı da tek bir ülkeyi ilgilendirebilir (bugünkü Dubai yazısı gibi), bir
   * rehber de üç ülkeyi birden ele alabilir.
   *
   * Ülke sayfalarındaki "bu ülke hakkında yazdıklarımız" listesi bu alandan
   * besleniyor (postsForCountry): liste elle tutulmuyor, yazının kendisi hangi
   * ülkeyi işaretlediyse orada çıkıyor.
   */
  country?: CountrySlug;
  tags: string[];
  /**
   * SWAP:BLOG_AUTHOR — kurum adı yazılı, kişi adı yazılı DEĞİL. Depoda
   * doğrulanmış tek kişi adı afterSetup.ts'in kaynak notunda geçiyor ve o
   * kişi bu yazının değil, yazının beslendiği dokümanın yazarı. İkisini
   * karıştırmamak için künyede kurum duruyor; müşteri kişi künyesi isterse
   * adı buraya yazması yeterli, şablon değişmiyor.
   */
  author: string;
  cover: string;
  seo: { title: string; description: string };
  /** yazının hangi belgeden/veriden kurulduğu — künyenin altındaki tek satır */
  sourceNote: string;
  body: BlogBlock[];
  /** yazının altındaki çıkışlar; kapalı adres SmartLink ile sönük çıkar */
  links: { label: string; href: string; line: string }[];
  /** kapanış bloğu: soru çıkışı (AskCta) bunun yanında durur */
  closing: { title: string; line: string; cta: string };
  /** en altta küçük punto duran yasal çerçeve */
  footnote: string;
};

/* -------------------------------------------------- doğrulanmış veri köprüsü

   Aşağıdaki yardımcılar yazının rakam kaynağı. Hepsi savunmacı yazıldı:
   AFTER_SETUP `Partial<Record<Country, …>>`, yani Dubai kaydı bir gün
   kaldırılırsa burası çökmek yerine boş dönüyor ve şablon o tabloyu hiç
   basmıyor. Boş tablo basmak, "bu kalemler yok" demek olurdu. */

const nf = new Intl.NumberFormat("tr-TR");
/** afterSetup rakamlarının site genelindeki yazımı: "4.200 USD" */
const usd = (n: number) => `${nf.format(n)} USD`;

const DUBAI_AFTER = AFTER_SETUP.dubai;
const AFTER_ITEMS: AfterItem[] = DUBAI_AFTER?.items ?? [];

/** ilk yıl örnek hesabına giren kalemler */
const IN_EXAMPLE = AFTER_ITEMS.filter((i) => i.inclusion === "ornekte");
/** koşullu ve talebe bağlı olanlar — toplamın dışında kalıyorlar */
const OUT_OF_EXAMPLE = AFTER_ITEMS.filter((i) => i.inclusion !== "ornekte");

const FIRST_YEAR_LINES = DUBAI_AFTER?.firstYear.lines ?? [];
/* Toplam elle yazılmıyor, toplanıyor: afterSetup.ts'in kendi kuralı bu ve
   satırlardan biri değiştiğinde yazıdaki toplamın da değişmesi gerekiyor. */
const FIRST_YEAR_TOTAL = FIRST_YEAR_LINES.reduce((sum, l) => sum + l.usd, 0);

/** bir kalemin kapsam listesi; kalem yoksa boş dizi (şablon bloğu atlar) */
const scopeOf = (id: string) => AFTER_ITEMS.find((i) => i.id === id)?.scope ?? [];

/** tabloda kalemin altına düşen şerh: "Aylık · başlangıç" */
const rhythmNote = (i: AfterItem) =>
  [RHYTHM_LABEL[i.rhythm], i.price.qualifier].filter(Boolean).join(" · ");

const DUBAI = COUNTRY_CONTENT.dubai;
/* structures ülke tipinde opsiyonel — Dubai'de dolu, yine de zorlanmıyor */
const STRUCTURE_RULE = DUBAI.structures?.rule;
const CLARIFY_TRAVEL = DUBAI.clarify.items[0];
const CLARIFY_FREEZONE = DUBAI.clarify.items[1];
/* STANCE_LIMITS[1] = "Kesin süre taahhüdü vermiyoruz" (bkz. brand.ts) */
const STANCE_TIME = STANCE_LIMITS[1];

/* ------------------------------------------------------------------ yazılar */

/**
 * Ana sayfadaki yayın bölümünün öne çıkan kartı bu yazıya bağlanıyor
 * (components/home/HomeBlog.tsx). Karta slug'ı string olarak yazmak yerine
 * kaydın kendisi dışa veriliyor: adres tek yerde tanımlı kalıyor ve slug
 * değişirse kart derlenmeden hata veriyor, sessizce kırılmıyor.
 */
export const POST_DUBAI_MALIYET: BlogPost = {
  slug: SLUG.dubaiMaliyet,
  /* KATEGORİ = MALİYET VE VERGİ, ülke rehberi değil. Gerekçe: müşterinin
     ayrımında rehber "o ülkede neler yapılabilir, hangi imkânlar var"
     sorusunun cevabı; bu yazı o soruyu değil "ne kadar tutar, hangi kalem ne
     zaman doğar" sorusunu cevaplıyor ve baştan sona doğrulanmış rakamdan
     kuruluyor. Ülkeye ait olması onu rehber yapmıyor; ülke bilgisi ayrı
     alanda (country) zaten duruyor. */
  category: "maliyet-ve-vergi",
  /* Başlık ana sayfadaki kartın başlığıyla birebir aynı: aynı yazının iki
     farklı adla görünmesi, listeden gelen ziyaretçiye yanlış sayfaya
     düştüğünü düşündürüyor. */
  title: "Dubai'de şirket kurmanın maliyet kalemleri",
  heroAccent: "maliyet kalemleri",
  summary: "Lisans, vize, ofis ve yenileme kalemleri; hangisi ne zaman ödenir.",
  /* SWAP:BLOG_DATES — tarih ana sayfadaki kartın tarihiyle aynı tutuldu
     (HomeBlog · iso 2026-07-22). Orası da yer tutucu; gerçek yayın tarihi
     geldiğinde iki yerde birden güncellenmeli, yoksa kart ile künye
     çelişir. */
  publishedAt: "2026-07-22",
  /* Eski `category` değeri, aynen: kategori şeması kurulurken bu etiket
     silinmedi, ikinci derece konu ibaresine dönüştü. Künyede "Maliyet ve
     vergi · Maliyet ve bütçe" okunuyor; birincisi eksen, ikincisi ayrıntı. */
  topic: "Maliyet ve bütçe",
  country: "dubai",
  tags: ["Dubai", "Maliyet", "Muhasebe"],
  author: "Ortac Global",
  cover: POST_PHOTO.dubaiCost,

  seo: {
    title: "Dubai'de şirket kurmanın maliyet kalemleri | Ortac Global",
    description:
      "Kuruluş anında ödenen, her yıl tekrar eden ve yalnızca şartlar oluşursa doğan kalemler ayrı ayrı; ilk yıl örnek hesabı ve toplamın dışında kalanlar.",
  },

  sourceNote:
    "Tutarlar Ortac Accounting Services LLC'nin kuruluş sonrası yükümlülük listesinden, vergi çerçevesi Dubai ülke sayfasında yayınlanan tablodan alınmıştır.",

  body: [
    {
      kind: "p",
      text: "Dubai'de şirket kurmanın maliyeti tek bir rakam değil. Kuruluş anında ödenen bedel bütçenin yalnızca ilk parçası; asıl fark ikinci yıldan itibaren tekrar eden kalemlerde çıkıyor. Aşağıda kalemler üç kümede toplanıyor ve her birinin ne zaman ödendiği yazıyor.",
    },

    /* ---------------------------------------------------------- 1 · çerçeve */
    { kind: "h2", id: "kumeler", text: "Maliyet üç kümede toplanıyor" },
    {
      kind: "p",
      text: "Kalemleri birbirinden ayıran şey tutarları değil, ne zaman doğdukları. Aynı listeye bakan iki şirketin ödediği toplam, bu üç kümeden hangilerinin kendilerinde doğduğuna göre değişiyor.",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "Kuruluş anında ödenenler: lisans, tescil ve kuruluş evrakı.",
        "Şirket aktif olduğu sürece tekrar edenler: muhasebe, yıl sonu beyanı ve lisans yenileme.",
        "Yalnızca şartlar oluşursa doğanlar: KDV kaydı ve beyanı, bağımsız denetim, vize.",
      ],
    },
    {
      kind: "p",
      text: "Üçüncü küme en sık yanlış hesaplanan yer. Bu kalemler herkeste doğmadığı için ilk yıl toplamına da girmiyor; sizde doğup doğmayacağı faaliyetinize, lisansınıza ve işlem hacminize bağlı.",
    },

    /* ---------------------------------------------------------- 2 · kuruluş */
    { kind: "h2", id: "kurulus", text: "Kuruluş anında ödenen kalemler" },
    {
      kind: "p",
      text: "Kuruluş tarafı yapı seçimiyle birlikte fiyatlanıyor. Fiyat, vize kotası ve kime satabileceğiniz bu seçime bağlı; sonradan değiştirmek yeni kuruluş demek.",
    },
    {
      kind: "facts",
      caption: "Kuruluş çerçevesi",
      rows: [
        {
          label: "Kuruluş bedeli",
          value: `${FACTS.dubai.fromLabel}'dan başlıyor`,
          note: "Seçilen serbest bölge, faaliyet konusu ve ofis tipi tutarı değiştiriyor.",
        },
        {
          label: "Tipik süre",
          value: FACTS.dubai.days,
          note: "Tipik aralık. Otoritenin işlem hızı bizim kontrolümüzde olmadığı için kesin süre taahhüdü vermiyoruz.",
        },
        {
          label: "Yapı seçimi",
          value: FACTS.dubai.structure,
          note: STRUCTURE_RULE,
        },
      ],
    },
    {
      kind: "note",
      tone: "warn",
      title: CLARIFY_TRAVEL.title,
      text: CLARIFY_TRAVEL.line,
    },

    /* ----------------------------------------------- 3 · tekrar eden kalemler */
    { kind: "h2", id: "tekrar-edenler", text: "Kuruluştan sonra tekrar eden kalemler" },
    {
      kind: "p",
      text: "Şirket aktif olduğu sürece muhasebe kayıtlarının düzenli tutulması yasal zorunluluk. Yıl sonunda toplu tutulan defter hem cezaya hem de yanlış vergi hesabına açık.",
    },
    {
      kind: "facts",
      caption: "İlk yıl örnek hesabına giren kalemler",
      rows: IN_EXAMPLE.map((i) => ({
        label: i.title,
        value: usd(i.price.usd),
        note: rhythmNote(i),
      })),
      foot: "Tutarlar kalem başına; aylık olanlar tek ay içindir.",
    },
    {
      kind: "details",
      summary: "Aylık muhasebe hizmeti neyi kapsıyor?",
      items: scopeOf("aylik-muhasebe"),
    },
    {
      kind: "p",
      text: "Lisans yenileme bu listenin en oynak kalemi: tutar kurulu olduğunuz serbest bölgeye, faaliyet konusuna, ofis tipine ve resmî harçlara göre değişiyor. Yenilenmezse şirket faaliyetine devam edemiyor, o yüzden ikinci yıl bütçesine ilk günden yazılması gereken kalem bu.",
    },

    /* --------------------------------------------------------- 4 · ilk yıl */
    { kind: "h2", id: "ilk-yil", text: "İlk yılın sonunda toplam ne çıkıyor?" },
    {
      kind: "p",
      text: "Yeni kurulmuş, standart faaliyet gösteren bir şirketin ilk 12 ayı. Aşağıdaki satırlar kuruluş bedelinin üzerine gelen kuruluş sonrası kalemler.",
    },
    {
      kind: "facts",
      caption: "Örnek hesap · ilk 12 ay",
      rows: FIRST_YEAR_LINES.map((l) => ({
        label: l.label,
        value: usd(l.usd),
        note: l.qty,
      })),
      total: { label: "İlk yıl toplamı", value: usd(FIRST_YEAR_TOTAL) },
    },
    {
      kind: "note",
      tone: "info",
      title: "Bu toplam her şeyi kapsamıyor",
      text:
        DUBAI_AFTER?.firstYear.anchorNote ??
        "Koşullu ve talebe bağlı kalemler bu toplamın dışında.",
    },

    /* ------------------------------------------------- 5 · toplamın dışında */
    { kind: "h2", id: "toplamin-disinda", text: "Toplamın dışında kalan kalemler" },
    {
      kind: "p",
      text: "Aşağıdakiler herkeste doğmuyor. Bir bütçe tablosunda görünmeleri gerekiyor ama toplama katılmamaları da gerekiyor: katılırlarsa herkese olacakmış gibi okunuyorlar.",
    },
    {
      kind: "facts",
      caption: "Koşullu ve talebe bağlı kalemler",
      rows: OUT_OF_EXAMPLE.map((i) => ({
        label: i.title,
        value: usd(i.price.usd),
        note: `${INCLUSION_LABEL[i.inclusion].short} · ${i.price.unit}`,
      })),
      foot:
        DUBAI_AFTER?.firstYear.outNote ??
        "Bu kalemler yalnızca şartlar oluştuğunda ya da talep ettiğinizde doğuyor.",
    },

    /* ------------------------------------------------------------ 6 · vergi */
    { kind: "h2", id: "vergi", text: "Vergi tarafında önce kayıt, sonra oran" },
    {
      kind: "p",
      text: "Kurumlar vergisi kaydı orandan bağımsız bir yükümlülük: kuruluşun ardından Federal Tax Authority nezdinde yasal süresi içinde tamamlanması gerekiyor. Oranı konuşmak, kayıt açıldıktan sonra anlamlı.",
    },
    {
      kind: "facts",
      caption: "Yayınlanan vergi çerçevesi",
      rows: DUBAI.tax.rows.map((r) => ({
        label: r.label,
        value: r.value,
        note: r.note,
      })),
    },
    {
      kind: "note",
      tone: "warn",
      title: CLARIFY_FREEZONE.title,
      text: CLARIFY_FREEZONE.line,
    },
    { kind: "p", text: DUBAI.tax.note },

    /* ----------------------------------------------------------- 7 · oturum */
    { kind: "h2", id: "oturum", text: "Vize aldıysanız takvim de bir yükümlülük" },
    {
      kind: "p",
      text:
        DUBAI_AFTER?.entry.lead ??
        "Vize alındıktan sonra oturum izni, belirli aralıklarla BAE'ye giriş yapıldığı sürece geçerli kalıyor.",
    },
    {
      kind: "facts",
      caption: "Giriş aralıkları",
      rows: (DUBAI_AFTER?.entry.rows ?? []).map((r) => ({
        label: r.who,
        value: r.short,
        note: r.line,
      })),
      foot: DUBAI_AFTER?.entry.note,
    },

    /* ---------------------------------------------------------- 8 · kapanış */
    { kind: "h2", id: "planlama", text: "Bütçeyi kurarken üç şey" },
    {
      kind: "list",
      items: [
        "İkinci yıl yenilemesini ilk günden yazın. Lisans ve yenileme kalemleri bu listenin en yükseği ve en oynağı.",
        "Koşullu kalemleri toplamın dışında ama görünür tutun. Toplama katılan bir ihtimal, bütçeyi olduğundan büyük gösteriyor; listeden çıkarılan bir ihtimal ise sonradan sürpriz oluyor.",
        "Süre için tipik aralık planlayın, kesin tarih planlamayın. Resmî kurum takvimi bütçenin değil, sürecin değişkeni.",
      ],
    },
    {
      kind: "quote",
      text: STANCE_TIME.line,
      source: `Ortac Global · ${STANCE_TIME.title}`,
    },
  ],

  links: [
    {
      label: "Dubai ülke sayfası",
      href: "/dubai",
      line: "Yapı seçimi, süreç adımları ve kuruluş sonrası kalemlerin tamamı.",
    },
    {
      label: "Dubai · Muhasebe ve Vergi",
      href: "/dubai/muhasebe",
      line: "Aylık muhasebe, KDV ve yıl sonu beyanı tarafının ayrıntısı.",
    },
    {
      /* Ana sayfa çapası değil kıyas sayfasının kendisi: detaylı kıyas bu
         turda /ulkeler'e taşındı, ana sayfada dört ölçütlük özet kaldı. */
      label: "Üç ülkenin karşılaştırması",
      href: "/ulkeler",
      line: "Dubai, İngiltere ve KKTC on üç ölçütte yan yana.",
    },
  ],

  closing: {
    title: "Bu kalemlerin hangisi sizde doğar?",
    line: "Yazıdaki tutarlar genel çerçeve. Faaliyetinizi, lisans tercihinizi ve işlem hacminizi anlatın; hangi kalemlerin sizin şirketinizde doğacağını birlikte netleştirelim.",
    cta: "Durumumu sorayım",
  },

  footnote:
    DUBAI_AFTER?.footnote ??
    "Tutarlar USD ve aksi belirtilmedikçe KDV hariç; resmî harçlardaki değişikliklerde güncellenir.",
};

/* ============================================================================
   SWAP:SEED_POSTS — yer tutucu yazılar
   ============================================================================

   NEDEN BURADALAR
   Depoda yazılmış tek yazı var (yukarıdaki). Tek satırlık bir arşiv, liste
   tasarımının hiçbir kararını göstermiyor: öne çıkan kart ile satırların
   ilişkisi, tarih sütununun ritmi, tür rozetlerinin yan yana nasıl durduğu,
   rehber süzgecinin dolu hâli — hiçbiri görülemiyordu. Müşteri tasarımı
   göremediği için yer tutucuya açıkça izin verdi (bkz. dosya başı).

   NE TAŞIMIYORLAR — tek ve tartışmasız sınır: OLGU İDDİASI YOK.
   Aşağıdaki hiçbir gövdede bir oran, bir eşik tutarı, bir sürenin kaç gün
   olduğu, bir otorite kararı ya da bir kanun maddesi geçmiyor. Gövdeler
   yalnızca üç şey söylüyor: yazı hangi SORULARI ele alacak, hangi KALEMLER
   yan yana konacak, bugün doğrulanmış bilgi NEREDE duruyor. Üçü de
   içindekiler düzeyi; hiçbiri bir cevap değil.

   Başlıklar da aynı kurala tabi: konuyu söylüyorlar, sonucu değil. "Serbest
   bölge mi mainland mi: seçim neye göre yapılıyor?" yazılabilir çünkü bir
   soru; "serbest bölgede oran şu" yazılamaz çünkü bir iddia.

   TARİHLER GERÇEK VE GEÇMİŞ. Tarihsiz kart liste tasarımını bozuyordu, o
   yüzden hepsinin tarihi var; hiçbiri gelecekte değil ve hiçbiri gerçek
   yazıdan yeni değil (gerekçe: sortedPosts).

   GÖRSELLER lib/media.ts'ten okunuyor ve tekrar ediyorlar — yeni Unsplash
   kimliği uydurulmadı. Listede kapak yalnızca öne çıkan kartta görünüyor,
   dolayısıyla tekrar ekranda görünmüyor.

   Rehberler POST_PHOTO değil COUNTRY_PHOTO okuyor ve bunun somut bir sebebi
   var: /blog/rehberler'in öne çıkan kartı bir rehber ve POST_PHOTO.visa
   (künyesinde "passport and boarding pass" yazan kare) bugün gece çekilmiş
   bir otobüs fotoğrafı — Unsplash kimliğinin arkasındaki kare değişmiş
   olmalı. Rehber bir ÜLKEYİ anlatıyor, dolayısıyla ülkenin kendi karesi hem
   daha doğru hem de değişmeyecek bir eşleşme.

   TEK İSTİSNA: dubaiRehber. Bu tur /blog ile /blog/rehberler ayrı iki liste
   oldu ve ikisinin de EN YENİ kaydı Dubai'ye ait — biri POST_PHOTO.dubaiCost,
   öteki COUNTRY_PHOTO.dubai ve ikisi AYNI dosya. İki sayfa aynı kapakla
   açılıyordu. Bir tur önce ayrım biçimle (daire madalyon) kurulmuştu, müşteri
   onu reddetti; ayrım artık fotoğrafın kendisinde (bkz. media.ts ·
   GUIDE_PHOTO). Öteki beş rehber ülke karesinde kaldı: onlar listenin başında
   durmuyor ve ülke ipucunu kaybetmelerinin bir karşılığı yok.

   YAYINA ALMAK — gövdeyi gerçekten yazıp `placeholder: true` satırını silmek.
   Başka hiçbir yerde değişiklik gerekmiyor: JSON-LD, noindex, "Örnek"
   işareti ve ana sayfa kartı hepsi bu tek alandan türüyor.
   ========================================================================= */

/**
 * Yer tutucuların ortak kabuğu. Kayıt başına değişen yalnızca konuya ait
 * alanlar; "bu bir örnek" cümlesi, kaynak notu ve dipnot ONBEŞ kayıtta da
 * aynı olmalı — kayıt başına elle yazılsalardı biri güncellenip ötekiler
 * unutulduğunda site kendi içinde çelişirdi.
 */
function seedPost(input: {
  slug: BlogSlug;
  category: BlogCategory;
  title: string;
  heroAccent: string;
  summary: string;
  seoDescription: string;
  topic: string;
  country?: CountrySlug;
  tags: string[];
  cover: string;
  publishedAt: string;
  /** yazının planı: hepsi SORU, çünkü soru bir olgu iddiası taşımıyor */
  plan: string[];
  /** yan yana konacak kalemler: hepsi KONU BAŞLIĞI, hiçbiri değer taşımıyor */
  compare: string[];
  closingTitle: string;
}): BlogPost {
  /* Çıkışlar: ülke işaretli kayıt kendi ülkesine, işaretsiz kayıt kıyas
     sayfasına iniyor. İkisi de gerçek adres — uydurma bağlantı yok. */
  const links = input.country
    ? [
        {
          label: `${COUNTRY_NAME[input.country]} ülke sayfası`,
          href: `/${input.country}`,
          line: "Bugün doğrulanmış olan her şey tek sayfada, sırasıyla.",
        },
        {
          label: "Üç ülkenin karşılaştırması",
          href: "/ulkeler",
          line: "Dubai, İngiltere ve KKTC on üç ölçütte yan yana.",
        },
      ]
    : [
        {
          label: "Üç ülkenin karşılaştırması",
          href: "/ulkeler",
          line: "Dubai, İngiltere ve KKTC on üç ölçütte yan yana.",
        },
        {
          label: "Kaynaklar",
          href: "/kaynaklar",
          line: "Yazılar, ülke rehberleri, gelişmeler ve e-kitaplar tek girişte.",
        },
      ];

  /* "Bugün yayında olan bilgi nerede" paragrafı: ülke işaretliyse ülkenin
     kendi sayfasına, değilse kıyas sayfasına gönderiyor. Tek bir sabit cümle
     yazmak, ülkesi olmayan kayıtta var olmayan bir sayfayı işaret ederdi. */
  const whereLine = input.country
    ? `${COUNTRY_NAME[input.country]} hakkında bugün yayında olan bilgi ülkenin kendi sayfasında duruyor: yapı seçimi, kuruluş bedeli, süreç adımları, evrak, vergi çerçevesi ve para tarafı. Aşağıdaki bağlantı oraya iniyor.`
    : "Bugün doğrulanmış olan karşılaştırma ülkeler sayfasında duruyor: üç ülke aynı ölçütlerde yan yana, her satırın karşılığı ülke sayfalarında yazılı. Aşağıdaki bağlantı oraya iniyor.";

  return {
    slug: input.slug,
    category: input.category,
    placeholder: true,
    title: input.title,
    heroAccent: input.heroAccent,
    summary: input.summary,
    publishedAt: input.publishedAt,
    topic: input.topic,
    ...(input.country ? { country: input.country } : {}),
    tags: input.tags,
    author: "Ortac Global",
    cover: input.cover,

    seo: {
      title: `${input.title} | Ortac Global`,
      description: input.seoDescription,
    },

    sourceNote:
      "Bu örnek kayıt bir kaynağa dayanmıyor çünkü gövdesinde bir iddia yok: aşağıdakiler yazının planı. Metin yazıldığında her satırın hangi belgeden geldiği bu satırda yazacak.",

    body: [
      {
        kind: "note",
        tone: "info",
        title: "Bu bir örnek kayıt",
        text: "Sayfanın düzenini görebilmek için konuldu. Aşağıdakiler yazının planı: hangi soruların ele alınacağı ve hangi kalemlerin yan yana konacağı. Cevaplar burada yok ve doğrulanmamış hiçbir bilgi konulmuyor.",
      },
      {
        kind: "p",
        text: "Bir konuyu açan yazının işi cevabı vermek değil, önce doğru soruyu kurmak: aynı başlığa bakan iki şirketin cevabı, işin nerede yürüdüğüne ve kime satıldığına göre değişiyor. Bu yüzden plan sorularla başlıyor.",
      },
      { kind: "h2", id: "plan", text: "Yazı hangi soruları ele alacak?" },
      {
        kind: "p",
        text: "Sıra kasıtlı: her soru bir öncekinin cevabını varsayıyor ve listenin sonuna gelindiğinde kararın hangi bilgiye dayandığı görünür oluyor.",
      },
      { kind: "list", ordered: true, items: input.plan },
      { kind: "h2", id: "kalemler", text: "Hangi kalemler yan yana konacak?" },
      {
        kind: "p",
        text: "Yazının karşılaştırma tablosuna girecek başlıklar aşağıda. Değerleri bilerek yazılmadı: her satırın karşılığı ancak kaynağı gösterilebildiğinde konulacak, o yüzden şimdilik yalnızca neyin karşılaştırılacağı duruyor.",
      },
      { kind: "list", items: input.compare },
      { kind: "h2", id: "kaynak", text: "Yazı neye dayanacak?" },
      {
        kind: "p",
        text: "Bu sitedeki yazıların kuralı tek: içindeki her tutar, oran ve süre depodaki doğrulanmış veriden okunuyor, elle yazılmıyor. Kaynağı gösterilemeyen bir satır yazıya hiç girmiyor. Yayınlanmış yazıda da böyle işliyor: künyenin altındaki tek satır, o yazının hangi belgeden kurulduğunu söylüyor.",
      },
      {
        kind: "p",
        text: "Bu sayfada o satırın karşılığı henüz yok, çünkü ortada bir iddia da yok. Yazı yazıldığında kaynak notu buraya geliyor ve sayfanın başındaki örnek işareti kalkıyor.",
      },
      { kind: "h2", id: "bugun", text: "Bugün yayında olan bilgi nerede?" },
      { kind: "p", text: whereLine },
      {
        kind: "p",
        text: "Kişiye özel bir görüş ise siteden verilmiyor; onun yeri aşağıdaki soru çıkışı. Durumunuzu anlatan iki cümle, genel bir çerçeveyi okumaktan hızlı sonuç veriyor.",
      },
    ],

    links,

    closing: {
      title: input.closingTitle,
      line: "Yazı hazır değil ama sorunuz bekleyebilir bir şey değil. Ne yapmak istediğinizi anlatın; hangi ülkenin ve hangi yapının işinizi gördüğünü birlikte bakalım.",
      cta: "Durumumu sorayım",
    },

    footnote:
      "Örnek kayıt: tasarımın dolu hâlini göstermek için konuldu. Buradaki hiçbir satır bilgi olarak kullanılmamalıdır.",
  };
}

/**
 * Yer tutucular. Sıra önemsiz — listeleyen her yer tarihe göre sıralıyor.
 * Tarihler bilerek aylara yayıldı: tarih sütunu ancak aralıklı bir arşivde
 * ritim gösteriyor, hepsi aynı haftadan olsaydı sütun tek bir blok olurdu.
 */
const SEED_POSTS: BlogPost[] = [
  /* ---------------------------------------------------------------- blog */
  seedPost({
    slug: SLUG.bolgeSecimi,
    category: "yapi-ve-ulke-secimi",
    title: "Serbest bölge mi mainland mi: seçim neye göre yapılıyor?",
    heroAccent: "seçim neye göre yapılıyor?",
    summary:
      "İki yapı arasındaki tercihte hangi sorular sorulur, hangi başlıklar yan yana konur.",
    seoDescription:
      "Dubai'de serbest bölge ile mainland arasındaki seçimde hangi soruların sorulduğunu ele alan yazı. Örnek kayıt: metin hazırlanıyor.",
    topic: "Yapı seçimi",
    country: "dubai",
    tags: ["Dubai", "Yapı seçimi"],
    cover: POST_PHOTO.dubaiCost,
    publishedAt: "2026-07-03",
    plan: [
      "Kime satış yapacağınız yapı seçimini nasıl etkiliyor?",
      "Ofis tipi ve vize kotası hangi tarafta neye bağlı?",
      "Faaliyet konusu seçimi hangi kapıları açıyor, hangilerini kapatıyor?",
      "Sonradan yapı değiştirmek ne anlama geliyor?",
      "Hangi durumda karar tek bir soruya iniyor?",
    ],
    compare: [
      "Faaliyet konusu ve lisans başlığı",
      "Müşterinin nerede olduğu",
      "Ofis tipi ve fiziksel bulunma",
      "Vize kotası",
      "Yenileme takvimi",
    ],
    closingTitle: "Sizin işiniz hangi yapıya oturuyor?",
  }),

  seedPost({
    slug: SLUG.kurulusSonrasi,
    category: "kurulus-sonrasi",
    title: "Kuruluştan sonra takvimde ne var?",
    heroAccent: "takvimde ne var?",
    summary:
      "Şirket kurulduktan sonra hangi başlıkların takvime girdiği ve neyin neye bağlı olduğu.",
    seoDescription:
      "Şirket kurulduktan sonra takvime giren başlıkları ve hangisinin neye bağlı olduğunu ele alan yazı. Örnek kayıt: metin hazırlanıyor.",
    topic: "Kuruluş sonrası",
    country: "dubai",
    tags: ["Dubai", "Kuruluş sonrası"],
    cover: POST_PHOTO.corpTax,
    publishedAt: "2026-06-11",
    plan: [
      "Hangi başlıklar herkeste doğuyor, hangileri yalnızca şartlar oluşursa?",
      "Takvimi başlatan şey kuruluş tarihi mi, başka bir şey mi?",
      "Kayıt yükümlülükleri ile beyan yükümlülükleri nasıl ayrılıyor?",
      "Bir başlık kaçırıldığında ne oluyor?",
      "İkinci yıl bütçesine ilk günden ne yazılıyor?",
    ],
    compare: [
      "Kayıt yükümlülükleri",
      "Düzenli tutulan defter",
      "Yıl sonu kapanışı",
      "Lisans yenileme",
      "Koşullu başlıklar",
    ],
    closingTitle: "Sizin şirketinizde takvim nasıl işliyor?",
  }),

  seedPost({
    slug: SLUG.bankaSorular,
    category: "kurulus-sonrasi",
    title: "Banka hesabı açarken neler soruluyor?",
    heroAccent: "neler soruluyor?",
    summary:
      "Hesap açılışında bankanın baktığı başlıklar ve hazırlığın hangi noktada başladığı.",
    seoDescription:
      "Şirket hesabı açılışında bankanın baktığı başlıkları ve hazırlığın nasıl kurulduğunu ele alan yazı. Örnek kayıt: metin hazırlanıyor.",
    topic: "Banka ve ödeme",
    country: "dubai",
    tags: ["Dubai", "Banka"],
    cover: POST_PHOTO.bank,
    publishedAt: "2026-05-14",
    plan: [
      "Banka hangi belgeleri istiyor ve neden istiyor?",
      "Faaliyet açıklaması hesap açılışını nasıl etkiliyor?",
      "Ortaklık yapısı hangi soruları getiriyor?",
      "Fiziksel bulunma gerekiyor mu, gerekiyorsa hangi adımda?",
      "Hesap açılmazsa hangi seçenekler kalıyor?",
    ],
    compare: [
      "İstenen evrak",
      "Faaliyet açıklaması",
      "Ortaklık ve nihai fayda sahibi",
      "Fiziksel bulunma",
      "Alternatif tahsilat kanalları",
    ],
    closingTitle: "Hesap tarafında sizi ne bekliyor?",
  }),

  seedPost({
    slug: SLUG.ukOnce,
    category: "yapi-ve-ulke-secimi",
    title: "İngiltere'de limited kurmadan önce hangi başlıklara bakılıyor?",
    heroAccent: "hangi başlıklara bakılıyor?",
    summary:
      "Kuruluş kararından önce cevaplanması gereken sorular ve karara giren başlıklar.",
    seoDescription:
      "İngiltere'de limited şirket kurmadan önce cevaplanması gereken soruları ele alan yazı. Örnek kayıt: metin hazırlanıyor.",
    topic: "Yapı seçimi",
    country: "ingiltere",
    tags: ["İngiltere", "Yapı seçimi"],
    cover: POST_PHOTO.ukTax,
    publishedAt: "2026-04-16",
    plan: [
      "İşin hangi tarafı İngiltere'de, hangi tarafı başka yerde duruyor?",
      "Müşterinin nerede olduğu kararı nasıl değiştiriyor?",
      "Adres ve yönetim tarafında ne bekleniyor?",
      "Kuruluştan sonra hangi başlıklar takvime giriyor?",
      "Hangi durumda başka bir ülke daha uygun oluyor?",
    ],
    compare: [
      "İşin yürütüldüğü yer",
      "Müşteri coğrafyası",
      "Adres ve yönetim",
      "Tahsilat kanalları",
      "Kuruluş sonrası takvim",
    ],
    closingTitle: "İngiltere sizin durumunuza uyuyor mu?",
  }),

  seedPost({
    slug: SLUG.ulkeSecimi,
    category: "yapi-ve-ulke-secimi",
    title: "Hangi ülke hangi işe uyuyor: karar hangi sorulara bakıyor?",
    heroAccent: "karar hangi sorulara bakıyor?",
    summary:
      "Ülke seçimini belirleyen sorular ve üç ülkenin aynı ölçütlerde nasıl yan yana konduğu.",
    seoDescription:
      "Ülke seçimini belirleyen soruları ve üç ülkenin hangi ölçütlerde karşılaştırıldığını ele alan yazı. Örnek kayıt: metin hazırlanıyor.",
    topic: "Ülke seçimi",
    tags: ["Ülke seçimi", "Karşılaştırma"],
    cover: POST_PHOTO.kktc,
    publishedAt: "2026-03-12",
    plan: [
      "Kararı belirleyen ilk soru hangisi?",
      "Oturum ihtiyacı seçimi ne kadar daraltıyor?",
      "Müşterinin ve tedarikçinin nerede olduğu neyi değiştiriyor?",
      "Uzaktan yürütme isteği hangi seçenekleri eliyor?",
      "Karar tek bir cevapla dönüyor mu?",
    ],
    compare: [
      "Oturum ihtiyacı",
      "Müşteri coğrafyası",
      "Uzaktan yürütme",
      "Kuruluş sonrası yük",
      "Tahsilat tarafı",
    ],
    closingTitle: "Hangi ülke sizin işinize uyuyor?",
  }),

  seedPost({
    slug: SLUG.vergiIkameti,
    category: "maliyet-ve-vergi",
    title: "Vergi ikameti ile şirketin kurulduğu ülke aynı şey mi?",
    heroAccent: "aynı şey mi?",
    summary:
      "İki kavramın hangi sorularla ayrıldığı ve kimin hangi tarafta konumlandığı.",
    seoDescription:
      "Vergi ikameti ile şirketin kurulduğu ülkenin hangi sorularla ayrıldığını ele alan yazı. Örnek kayıt: metin hazırlanıyor.",
    topic: "Vergi çerçevesi",
    tags: ["Vergi", "Karşılaştırma"],
    cover: POST_PHOTO.corpTax,
    publishedAt: "2026-02-10",
    plan: [
      "Şirketin ikameti ile kişinin ikameti neden ayrı sorular?",
      "Hangi soru hangi otoriteye bakıyor?",
      "İşin fiilen nereden yürütüldüğü neden sorulur?",
      "Ortağın nerede yaşadığı tabloya nasıl giriyor?",
      "Bu konuda kişiye özel görüş neden burada verilmiyor?",
    ],
    compare: [
      "Şirketin kurulduğu ülke",
      "İşin fiilen yürütüldüğü yer",
      "Ortağın yaşadığı ülke",
      "Kayıt yükümlülükleri",
      "Beyan yükümlülükleri",
    ],
    closingTitle: "Sizin durumunuz hangi soruları getiriyor?",
  }),

  seedPost({
    slug: SLUG.eticaret,
    category: "sektor-notlari",
    title: "E-ticaret işini yurt dışına taşırken sıra nasıl kuruluyor?",
    heroAccent: "sıra nasıl kuruluyor?",
    summary:
      "Taşıma kararının hangi adımlara bölündüğü ve hangi adımın neye bağlı olduğu.",
    seoDescription:
      "E-ticaret operasyonunu yurt dışına taşırken adımların hangi sırayla kurulduğunu ele alan yazı. Örnek kayıt: metin hazırlanıyor.",
    topic: "Sektör notları",
    tags: ["E-ticaret", "Süreç"],
    cover: POST_PHOTO.dubaiCost,
    publishedAt: "2026-01-27",
    plan: [
      "Hangi adım önce geliyor: şirket mi, tahsilat mı?",
      "Pazar yeri hesapları şirketin nerede olduğuna nasıl bakıyor?",
      "Lojistik ve depo tarafı kararı nasıl etkiliyor?",
      "Mevcut şirket kapanmadan yürütmek mümkün mü?",
      "Geçiş sırasında hangi başlıklar aynı anda açık kalıyor?",
    ],
    compare: [
      "Şirket kuruluşu",
      "Tahsilat ve ödeme altyapısı",
      "Pazar yeri hesapları",
      "Lojistik ve depo",
      "Geçiş dönemi",
    ],
    closingTitle: "Sizin operasyonunuzda sıra nereden başlıyor?",
  }),

  seedPost({
    slug: SLUG.yilSonu,
    category: "kurulus-sonrasi",
    title: "Yıl sonu kapanışında hangi belgeler isteniyor?",
    heroAccent: "hangi belgeler isteniyor?",
    summary:
      "Kapanış dosyasına giren başlıklar ve hazırlığın yıl içinde neden başladığı.",
    seoDescription:
      "Yıl sonu kapanışında hangi belgelerin istendiğini ve hazırlığın nasıl kurulduğunu ele alan yazı. Örnek kayıt: metin hazırlanıyor.",
    topic: "Muhasebe",
    country: "dubai",
    tags: ["Dubai", "Muhasebe"],
    cover: POST_PHOTO.corpTax,
    publishedAt: "2026-01-13",
    plan: [
      "Kapanış dosyasına hangi başlıklar giriyor?",
      "Yıl içinde tutulan kayıt kapanışı nasıl kolaylaştırıyor?",
      "Banka hareketleri ile defter nasıl karşılaştırılıyor?",
      "Eksik belge çıktığında ne oluyor?",
      "Hangi başlıklar yalnızca bazı şirketlerde doğuyor?",
    ],
    compare: [
      "Defter ve kayıtlar",
      "Banka hareketleri",
      "Fatura ve sözleşmeler",
      "Yıl sonu beyanı",
      "Koşullu başlıklar",
    ],
    closingTitle: "Kapanış dosyanız ne durumda?",
  }),

  /* -------------------------------------------------------------- rehber */
  seedPost({
    slug: SLUG.dubaiRehber,
    category: "ulke-rehberi",
    title: "Dubai'de hangi işleri kurabilirsiniz?",
    heroAccent: "hangi işleri kurabilirsiniz?",
    summary:
      "Lisansın hangi faaliyet başlıklarına açık olduğu, hangi işin hangi yapıya oturduğu.",
    seoDescription:
      "Dubai'de hangi faaliyet başlıklarıyla şirket kurulabildiğini ve hangi işin hangi yapıya oturduğunu ele alan rehber. Örnek kayıt: metin hazırlanıyor.",
    topic: "Ülkede ne yapılabilir",
    country: "dubai",
    tags: ["Dubai", "Rehber"],
    /* Ülke karesi DEĞİL: bu kayıt rehber listesinin en yenisi, yani öne çıkan
       kartı; ülke karesi blog listesinin öne çıkan kartıyla aynı dosya olduğu
       için iki sayfa aynı fotoğrafla açılıyordu (gerekçe: media.ts ·
       GUIDE_PHOTO). Kare rehberin sorusuna oturuyor: hangi işler kurulabilir. */
    cover: GUIDE_PHOTO.dubaiIsler,
    publishedAt: "2026-07-15",
    plan: [
      "Hangi faaliyet başlıkları için lisans alınabiliyor?",
      "Serbest bölge ile mainland arasındaki seçim neye göre yapılıyor?",
      "Hangi işler uzaktan yürütülebiliyor, hangileri yerinde bulunmayı gerektiriyor?",
      "Ofis, vize ve çalışan tarafı işin büyüklüğüne göre nasıl değişiyor?",
      "Hangi faaliyetler için ek izin gerekiyor ve neler mümkün değil?",
    ],
    compare: [
      "Faaliyet başlığı",
      "Yapı seçimi",
      "Ofis tipi",
      "Vize kotası",
      "Ek izin gerektiren alanlar",
    ],
    closingTitle: "Sizin işiniz Dubai'de nereye oturuyor?",
  }),

  seedPost({
    slug: SLUG.dubaiIlkYil,
    category: "ulke-rehberi",
    title: "Dubai'de ilk yıl nasıl geçiyor?",
    heroAccent: "ilk yıl nasıl geçiyor?",
    summary:
      "Kuruluştan sonra hangi başlıkların sırayla geldiği ve neyin neye bağlı olduğu.",
    seoDescription:
      "Dubai'de kuruluştan sonraki ilk yılda hangi başlıkların sırayla geldiğini ele alan rehber. Örnek kayıt: metin hazırlanıyor.",
    topic: "İlk yıl",
    country: "dubai",
    tags: ["Dubai", "Rehber"],
    cover: COUNTRY_PHOTO.dubai,
    publishedAt: "2026-04-29",
    plan: [
      "Kuruluş bittikten sonra ilk hangi başlık açılıyor?",
      "Banka ve tahsilat tarafı hangi adımda devreye giriyor?",
      "Kayıt yükümlülükleri hangi sırayla doğuyor?",
      "Vize alındıysa takvim nasıl değişiyor?",
      "İlk yılın sonunda hangi başlıklar tekrar ediyor?",
    ],
    compare: [
      "Kuruluş sonrası ilk adımlar",
      "Banka ve tahsilat",
      "Kayıt yükümlülükleri",
      "Oturum tarafı",
      "Yenileme takvimi",
    ],
    closingTitle: "İlk yılınız nasıl kurgulanmalı?",
  }),

  seedPost({
    slug: SLUG.ingiltereRehber,
    category: "ulke-rehberi",
    title: "İngiltere şirketi kimin işine yarıyor?",
    heroAccent: "kimin işine yarıyor?",
    summary:
      "Hangi iş modelleri İngiltere'de kurulan bir şirketle yürüyor, hangileri için başka bir ülke konuşuluyor.",
    seoDescription:
      "İngiltere'de kurulan bir şirketin hangi iş modellerine uyduğunu ele alan rehber. Örnek kayıt: metin hazırlanıyor.",
    topic: "Kimin için uygun",
    country: "ingiltere",
    tags: ["İngiltere", "Rehber"],
    cover: COUNTRY_PHOTO.ingiltere,
    publishedAt: "2026-06-24",
    plan: [
      "Hangi iş modelleri İngiltere şirketiyle yürütülüyor?",
      "Müşterinin nerede olduğu şirketin nerede kurulacağını nasıl etkiliyor?",
      "Uzaktan yürütmenin sınırı nerede başlıyor?",
      "Ödeme ve tahsilat tarafında ne değişiyor?",
      "Hangi durumlarda başka bir ülke daha uygun oluyor?",
    ],
    compare: [
      "İş modeli",
      "Müşteri coğrafyası",
      "Uzaktan yürütme",
      "Tahsilat tarafı",
      "Kuruluş sonrası yük",
    ],
    closingTitle: "İngiltere sizin durumunuza uyuyor mu?",
  }),

  seedPost({
    slug: SLUG.ingiltereUzaktan,
    category: "ulke-rehberi",
    title: "İngiltere'de uzaktan yürütmenin sınırı nerede?",
    heroAccent: "sınırı nerede?",
    summary:
      "Hangi işler uzaktan yürüyor, hangi başlıklar için yerinde bir karşılık aranıyor.",
    seoDescription:
      "İngiltere'de bir şirketin hangi başlıklarının uzaktan yürütülebildiğini ele alan rehber. Örnek kayıt: metin hazırlanıyor.",
    topic: "Ülkede ne yapılabilir",
    country: "ingiltere",
    tags: ["İngiltere", "Rehber"],
    cover: COUNTRY_PHOTO.ingiltere,
    publishedAt: "2026-03-31",
    plan: [
      "Kuruluşun hangi adımları uzaktan tamamlanıyor?",
      "Adres tarafında ne bekleniyor?",
      "Banka ve tahsilat uzaktan kurulabiliyor mu?",
      "Yönetim tarafı hangi soruları getiriyor?",
      "Hangi başlıklar için yerinde bir karşılık aranıyor?",
    ],
    compare: [
      "Kuruluş adımları",
      "Adres",
      "Banka ve tahsilat",
      "Yönetim tarafı",
      "Yerinde karşılık aranan başlıklar",
    ],
    closingTitle: "Sizin işiniz uzaktan yürür mü?",
  }),

  seedPost({
    slug: SLUG.kktcRehber,
    category: "ulke-rehberi",
    title: "KKTC'de neler yapılabilir?",
    heroAccent: "neler yapılabilir?",
    summary:
      "Hangi faaliyetler yürütülüyor, kimler için anlamlı bir seçenek ve sınırları nerede.",
    seoDescription:
      "KKTC'de hangi faaliyetlerin yürütülebildiğini ve sınırlarının nerede olduğunu ele alan rehber. Örnek kayıt: metin hazırlanıyor.",
    topic: "Ülkede ne yapılabilir",
    country: "kktc",
    tags: ["KKTC", "Rehber"],
    cover: COUNTRY_PHOTO.kktc,
    publishedAt: "2026-05-28",
    plan: [
      "Hangi faaliyetler için şirket kuruluyor?",
      "Kimler için anlamlı bir seçenek oluyor?",
      "Yerinde bulunmak gerekiyor mu, gerekiyorsa ne kadar?",
      "Tahsilat ve bankacılık tarafında ne bekleniyor?",
      "Hangi konularda sınırları var?",
    ],
    compare: [
      "Faaliyet alanları",
      "Yerinde bulunma",
      "Tahsilat tarafı",
      "Kuruluş sonrası yük",
      "Bilinmesi gereken sınırlar",
    ],
    closingTitle: "KKTC sizin işinize uyuyor mu?",
  }),

  seedPost({
    slug: SLUG.kktcKimeUygun,
    category: "ulke-rehberi",
    title: "KKTC'de şirket kimin için anlamlı bir seçenek?",
    heroAccent: "kimin için anlamlı bir seçenek?",
    summary:
      "Hangi iş modelleri için konuşuluyor, hangi beklentilerle gelenler için konuşulmuyor.",
    seoDescription:
      "KKTC'de kurulan bir şirketin hangi iş modelleri için anlamlı olduğunu ele alan rehber. Örnek kayıt: metin hazırlanıyor.",
    topic: "Kimin için uygun",
    country: "kktc",
    tags: ["KKTC", "Rehber"],
    cover: COUNTRY_PHOTO.kktc,
    publishedAt: "2026-02-26",
    plan: [
      "Hangi iş modelleri için gündeme geliyor?",
      "Türkiye'ye yakınlık operasyonda neyi değiştiriyor?",
      "Hangi beklentilerle gelenler için uygun değil?",
      "Tahsilat tarafında neye hazırlıklı olmak gerekiyor?",
      "Karar hangi soruyla netleşiyor?",
    ],
    compare: [
      "İş modeli",
      "Operasyonun yeri",
      "Tahsilat tarafı",
      "Kuruluş sonrası yük",
      "Bilinmesi gereken sınırlar",
    ],
    closingTitle: "KKTC sizin durumunuza uyuyor mu?",
  }),
];

/**
 * Bütün kayıtlar tek dizide — yayınlanmış yazı da yer tutucu da. Sıra
 * önemsiz: listeleyen her yer tarihe göre kendi sıralıyor (bkz. sortedPosts).
 *
 * Ayrı dizi TUTULMUYOR ve bu bu turun kararı: iki dizi, listede iki bölüm
 * demekti ve müşteri o bölünmeyi reddetti. Ayrım artık kaydın kendi
 * alanında (`placeholder`), dizinin adında değil.
 */
export const BLOG_POSTS: BlogPost[] = [POST_DUBAI_MALIYET, ...SEED_POSTS];

/* ---------------------------------------------------------------- yardımcı */

/** Yazının adresi. Adres kalıbı tek yerde dursun diye fonksiyon. */
export const blogHref = (slug: string) => `/blog/${slug}`;

/**
 * Ülke rehberi kategorisinin KANONİK adresi. Rehbere bağlanan her yer bunu
 * okuyor (kaynaklar hub'ı, eski adreslerin yönlendirmesi, kırıntı) ki tek bir
 * kanonik kalsın ve kategori slug'ı değişirse hepsi birden doğru kalsın.
 */
export const GUIDES_HREF = categoryHref(GUIDE_CATEGORY);

/**
 * Rehberin ESKİ adresi. Bugün bir sayfa değil, 308 yönlendirme
 * (app/blog/rehberler) ve yalnızca iki yer onu adıyla tanımak zorunda: o
 * yönlendirme dosyası ve dolaşım kaydı (lib/routes.ts) — adres orada AÇIK
 * kalmalı, yoksa hâlâ buraya bağlanan menü ve footer satırları sönük çıkardı.
 */
export const LEGACY_GUIDES_HREF = "/blog/rehberler";

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
 * Liste yüzeylerinin bağladığı adres — `blogHref`in geçici yerine geçeni.
 * Yazının kendi adresini DEĞİL, kategorisinin demo sayfasını döndürüyor.
 */
export const demoHref = (post: BlogPost): string => blogHref(DEMO_POST[post.category]);

/**
 * Bir demo sayfasına HANGİ kategorilerin bağlandığı. Sayfa bunu okuyup
 * ziyaretçiye tek cümleyle söylüyor; elle yazılsaydı DEMO_POST'taki bir
 * değişiklikten sonra ekrandaki cümle sessizce yalan olurdu.
 */
export const demoSourceCategories = (slug: string): BlogCategory[] =>
  CATEGORY_ORDER.filter((c) => DEMO_POST[c] === slug);

/**
 * Bu slug bir demo hedefi mi? İç sayfa şablonu, sayfanın demo olduğunu
 * söyleyen küçük işareti buna bakarak basıyor: bir ziyaretçi başka bir
 * başlığa tıklayıp buraya düştüğünde sebebini okumadan anlamıyor.
 */
export const isDemoTarget = (slug: string): boolean =>
  (Object.values(DEMO_POST) as string[]).includes(slug);

/**
 * generateStaticParams bunu okuyor: yazı eklemek yeni bir rota demek.
 * Yer tutucular da burada — sayfaları gerçekten açılıyor, yalnızca noindex
 * dönüyorlar ve JSON-LD basmıyorlar.
 */
export const BLOG_SLUGS = BLOG_POSTS.map((p) => p.slug);

/** Tanımsız slug'da undefined — şablon notFound() çağırıyor. */
export function postFor(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/**
 * Bütün yazılar, en yeni üstte. Yer tutucular DAHİL — bu turun kararı: liste
 * dolu görünmeli ve ayrım kaydın kendi işaretinde durmalı (bkz. placeholder).
 *
 * Bu işlevi /blog listelerinin dışında ana sayfa (components/home/HomeBlog),
 * navbar paneli (components/Nav) ve içerik şeridi (components/ContentHub) de
 * çağırıyor; dolayısıyla yer tutucular oralarda da görünüyor ve bu isteniyor.
 *
 * TEK İSTİSNA — LİSTENİN İLK KAYDI. Ana sayfanın büyük kartı ve navbardaki
 * "son yazı" bu listenin [0]'ını basıyor ve o iki yüzey yer tutucuyu gerçek
 * yazıdan ayırt edemiyor (ikisi de başka ajanın dosyası). Sayfanın en büyük
 * kartında örnek bir kayıt durması ilk izlenimi yer tutucu üzerine kurardı.
 *
 * Bugün tarihler zaten gerçek yazıyı en üste koyuyor, yani aşağıdaki iki satır
 * hiçbir şey yapmıyor. Durmalarının sebebi gelecekteki bir gün: gerçek
 * yazıdan yeni tarihli bir yer tutucu eklendiğinde ana sayfa sessizce örnek
 * bir kayda düşerdi. Taşıma yalnızca ilk kaydı ilgilendiriyor; listenin geri
 * kalanı tarih sırasında kalıyor.
 */
export function sortedPosts(): BlogPost[] {
  const byDate = [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const firstReal = byDate.findIndex((p) => !p.placeholder);
  if (firstReal > 0) byDate.unshift(...byDate.splice(firstReal, 1));
  return byDate;
}

/**
 * GERÇEKTEN YAYINLANMIŞ yazılar — yer tutucular hariç.
 *
 * Bunu okuyan tek yer JSON-LD. Ayrım korunuyor çünkü ikisi aynı şey değil:
 * ekranda "Örnek" yazan bir kartı göstermek bir tasarım kararı, aynı kaydı
 * arama motoruna BlogPosting diye bildirmek yanlış beyan.
 */
export function publishedPosts(): BlogPost[] {
  return sortedPosts().filter((p) => !p.placeholder);
}

/**
 * Bir kategorinin yazıları — /blog/kategori/<kategori> listesi bunu okuyor.
 * Yer tutucular dahil; filtre `category` alanına bakıyor, etiketler ya da
 * konu ibaresi hiçbir şey belirlemiyor.
 */
export function postsOfCategory(category: BlogCategory): BlogPost[] {
  return sortedPosts().filter((p) => p.category === category);
}

/** Bir kategorinin GERÇEKTEN yayınlanmış yazıları — JSON-LD için. */
export function publishedOfCategory(category: BlogCategory): BlogPost[] {
  return publishedPosts().filter((p) => p.category === category);
}

/**
 * Sekmelerin yanındaki sayı. Ayrı bir fonksiyon olmasının sebebi kayıt
 * altında: bu sayı ile listenin uzunluğu AYNI çağrıdan gelmeli. Bir tur önce
 * /kaynaklar şeridi blog için 15 derken sayfa 9 kart gösteriyordu, çünkü sayım
 * başka bir yerden okunuyordu.
 */
export function categoryCount(category: BlogCategory): number {
  return postsOfCategory(category).length;
}

/** Bir yazı dışındaki yazılar — "diğer yazılar" bloğu için. */
export function otherPosts(slug: string): BlogPost[] {
  return sortedPosts().filter((p) => p.slug !== slug);
}

/**
 * Bir ülkeye ait yazılar — ülke sayfalarındaki "bu ülke hakkında
 * yazdıklarımız" listesi bunu okuyor.
 *
 * Filtre `country` alanına bakıyor, etiketlere değil: "Dubai" etiketi bir
 * karşılaştırma yazısında da geçebilir ve o yazı Dubai'nin yazısı olmaz. Ülke
 * işareti yazının kendi beyanı olmalı.
 */
export function postsForCountry(country: CountrySlug): BlogPost[] {
  return sortedPosts().filter((p) => p.country === country);
}

/** İçindekiler: gövdedeki h2 blokları. Ayrıca elle liste tutulmuyor. */
export function tocOf(post: BlogPost): { id: string; text: string }[] {
  return post.body.flatMap((b) => (b.kind === "h2" ? [{ id: b.id, text: b.text }] : []));
}

/**
 * Okuma süresi hesaplanıyor, yazılmıyor.
 *
 * Elle girilen bir "8 dk" alanı, gövde iki paragraf kısaldığında yanlış
 * olurdu ve kimse fark etmezdi — künyede duran doğrulanamaz bir rakam.
 * Sayım 200 kelime/dakika üzerinden; tablo satırları da sayıma giriyor,
 * çünkü okunan metnin bir parçası. En az 1 dakika.
 */
export function readingMinutes(post: BlogPost): number {
  const chunks: string[] = [post.summary];

  for (const b of post.body) {
    switch (b.kind) {
      case "p":
      case "h2":
      case "h3":
        chunks.push(b.text);
        break;
      case "list":
        chunks.push(...b.items);
        break;
      case "quote":
        chunks.push(b.text);
        break;
      case "note":
        chunks.push(b.title, b.text);
        break;
      case "facts":
        chunks.push(b.caption);
        for (const r of b.rows) chunks.push(r.label, r.value, r.note ?? "");
        if (b.total) chunks.push(b.total.label, b.total.value);
        if (b.foot) chunks.push(b.foot);
        break;
      case "details":
        chunks.push(b.summary, ...b.items);
        break;
    }
  }

  const words = chunks.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

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
