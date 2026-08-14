/* ============================================================================
   İŞ ORTAKLIĞI — /is-ortakligi sayfasının bütün metni burada.

   Sayfa şablonu (app/is-ortakligi/page.tsx) tek cümle taşımıyor; ekranda
   görünen her kelime bu dosyada duruyor. Sebebi pratik: bu sayfanın metni
   müşteri onayına en açık metin. Bir cümle değişeceği zaman JSX'in içinde
   aranmasın, tek dosyada dursun.

   ---------------------------------------------------------------- İDDİA SINIRI

   Bu sayfa iki tür bilgiyi ayırıyor ve karıştırmıyor:

   1) YAPISAL BİLGİ — ortaklığın nasıl kurgulandığı. "Referans" ve "white-label"
      iki farklı çalışma biçimi; hangisinin seçileceği ticari bir pazarlık değil,
      operasyonun nasıl kurulacağı sorusu. Bunlar yazılabiliyor.

   2) TİCARİ ŞART — komisyon oranı, ödeme koşulu, asgari yönlendirme adedi,
      white-label kullanım bedeli. Bunların hiçbiri kararlaştırılmadı. Referans
      aldığımız sitede "$50–$1.500 arası komisyon" gibi rakamlar var; bizim
      böyle bir kararımız YOK ve olmayan bir rakamı siteye yazmak, ortaklık
      görüşmesine yalanla başlamak olurdu. Hepsi PARTNER_TERMS içinde null
      duruyor (SWAP:PARTNER_TERMS) ve sayfa null gördüğü sürece rakam basmıyor.

   Firmaya dair her iddia doğrulanmış listeden geliyor: üç ülke
   (Dubai · İngiltere · KKTC), kendi muhasebe lisansı, IFZA resmî iş ortaklığı,
   Wio Business / Mashreq NeoBiz / PayPal / wamo, üç ülkede de kendi ofis, tek
   panelden takip, Türkçe tek muhatap. Bunların dışında firma hakkında yeni
   iddia üretilmedi: kuruluş yılı, ortak sayısı, müşteri sayısı, "en hızlı",
   "lider" gibi hiçbir şey bu dosyada geçmiyor.

   brand.ts'teki STANCE_LIMITS ve CHAIN bu dosyaya KOPYALANMADI; sayfa onları
   doğrudan brand.ts'ten okuyor. Aynı politika cümlesinin iki dosyada iki
   kopyası olsaydı biri güncellenip diğeri kalırdı.
   ========================================================================= */

/* İkon adı string taşınıyor, bileşen değil: bu dosya bir veri modülü ve
   lucide-react'i import etmesi onu istemci tarafına çekerdi. Eşleme sayfada
   (sectors.ts'te de aynı kalıp var). */
export type PartnerIcon =
  | "globe"
  | "stamp"
  | "badge"
  | "office"
  | "panel"
  | "people"
  | "scale"
  | "calculator"
  | "briefcase"
  | "school";

/* -------------------------------------------------------------------- SEO */

export const PARTNER_SEO = {
  title: "İş Ortaklığı — Danışman ve Acente Kanalı | Ortac Global",
  description:
    "Müvekkilinizi, danışanınızı ya da öğrencinizi Dubai, İngiltere veya KKTC'ye yönlendirin; kuruluş, banka başvurusu ve muhasebe tarafını kendi ekibimiz yürütsün. Referans ve white-label modeli.",
  /** kanonik adres mutlak yazılıyor — layout.tsx'te metadataBase tanımlı değil */
  path: "/is-ortakligi",
};

/* ------------------------------------------------------------------- hero */

export const PARTNER_HERO = {
  crumb: "İş ortaklığı",
  /* accent, başlığın SONU olmak zorunda: PageHero'nun kompakt varyantı
     title.endsWith(accent) ile ayırıyor. */
  /* Başlık "Siz yönlendirin, süreci biz yürütelim." idi ve modeli doğru
     anlatıyordu; eksik olan tek şey sayfanın konusunun adıydı. Müşterinin
     ölçüsü: konu başlıkta CÜMLE İÇİNDE geçsin. Cümlenin iyi olan yarısı
     ("süreci biz yürütelim") aksan olarak zaten korunuyordu, o yüzden yalnız
     ilk yarı değişti. */
  title: "İş ortağımız olun, süreci biz yürütelim.",
  accent: "süreci biz yürütelim.",
  lead:
    "Müvekkiliniz, danışanınız ya da öğrenciniz yurt dışında şirket kurmak istediğinde işi tanımadığınız birine devretmek zorunda değilsiniz. Dubai, İngiltere ve KKTC tarafında kuruluş, banka başvurusu, muhasebe ve uyum aynı ekipte yürüyor.",
};

/* --------------------------------------------------------- ortaklık modeli */

export type PartnerModel = {
  key: "referans" | "white-label";
  name: string;
  /** kartın tek cümlelik özeti — kalabalık istemiyoruz, ayrıntı maddelerde */
  line: string;
  points: string[];
  /** "kime uyar" satırı: model seçimini meslek değil, iş hacmi belirliyor */
  forWhom: string;
};

/* İki model de AYNI operasyona bağlanıyor; aradaki fark müşterinin kiminle
   muhatap olduğu. Bu cümle bilerek üç yerde birden geçiyor (bölüm lead'i,
   kartlar, SSS) çünkü sayfanın anlaşılması gereken tek yapısal ayrımı bu. */
export const PARTNER_MODELS: PartnerModel[] = [
  {
    key: "referans",
    name: "Referans ortaklığı",
    line: "Müşteriyi bize tanıtırsınız, süreci Ortac adına biz yürütürüz.",
    points: [
      "Müşteri baştan Ortac ile konuşur.",
      "Evrak, otorite ve banka trafiği tamamen bizde.",
      "Sizin tarafınızda operasyon yükü kalmaz.",
    ],
    forWhom: "Yurt dışı kuruluş, müşterinizin ara sıra sorduğu bir başlıksa.",
  },
  {
    key: "white-label",
    name: "White-label",
    line: "Hizmet sizin markanızla sunulur, arkasında biz dururuz.",
    points: [
      "Müşteri ilişkisi sizde kalır.",
      "Kapsam, evrak listesi ve süreç akışı bizden gelir.",
      "Sizin adınıza çalışan bir back-office gibi kurgulanır.",
    ],
    forWhom: "Yurt dışı kuruluş, sizin hizmet menünüzün kalıcı bir parçasıysa.",
  },
];

/* --------------------------------------------------------- ticari şartlar
   SWAP:PARTNER_TERMS — DÖRT ALAN DA KARARLAŞTIRILMADI.

   Alanlar null olduğu sürece sayfa hiçbir rakam basmıyor: satırın değeri "—"
   çıkıyor ve altında notPublished cümlesi duruyor. Müşteri karar verdiğinde
   YALNIZCA bu blok değişiyor — sayfada başka hiçbir yere dokunmak gerekmiyor,
   şablon dolu değeri gördüğü an satırı normal bir künye satırı gibi basıyor.

   Not: tipi açıkça `string | null` yazıldı. Boş string yazılsaydı TypeScript
   alanı `string` olarak daraltır, doldurulmuş hâlle karışırdı. */
export const PARTNER_TERMS: {
  rows: { label: string; value: string | null }[];
  notPublished: string;
} = {
  rows: [
    { label: "Komisyon oranı", value: null },
    { label: "Ödeme koşulu", value: null },
    { label: "Asgari yönlendirme şartı", value: null },
    { label: "White-label kullanım bedeli", value: null },
  ],
  notPublished:
    "Bu dört başlık şu an sayfada yayımlanmıyor. Kararlaşmamış bir rakamı buraya yazmak yerine boş bırakıyoruz; şartları ortaklık görüşmesinde konuşuyoruz.",
};

/* ------------------------------------------ ortağın müşterisine götürdükleri
   Altı madde de doğrulanmış listeden. Her maddenin ikinci cümlesi <details>
   içinde kapalı: bölüm altı kısa satır olarak okunuyor, ayrıntı isteyen
   açıyor ("özet önde, detay talep üzerine"). */

export type PartnerValue = {
  icon: PartnerIcon;
  title: string;
  line: string;
  detail: string;
};

export const PARTNER_VALUE: PartnerValue[] = [
  {
    icon: "globe",
    title: "Üç ülke, tek muhatap",
    line: "Dubai, İngiltere ve KKTC aynı ekipte yürüyor.",
    detail:
      "Müşterinizin işine hangisi oturuyorsa oraya gidebiliyorsunuz; üç ülke için üç ayrı tedarikçiyle anlaşmanız gerekmiyor. Hangisinin uygun olduğu faaliyete, tahsilat kanalına ve oturum ihtiyacına göre değişiyor.",
  },
  {
    icon: "stamp",
    title: "Kendi muhasebe lisansımız",
    line: "Defter ve beyan taşerona gitmiyor.",
    detail:
      "Kuruluşu yapan ekiple muhasebeyi yapan ekip aynı. Müşteriniz kuruluştan sonra üçüncü bir ofise devredilmiyor, yani yönlendirdiğiniz kişi birkaç ay sonra tanımadığı biriyle muhatap olmuyor.",
  },
  {
    icon: "badge",
    title: "Resmî iş ortaklıkları",
    line: "IFZA resmî iş ortağıyız.",
    detail:
      "Serbest bölge başvurusu bir aracı üzerinden değil, doğrudan yürüyor. Banka ve tahsilat tarafında Wio Business, Mashreq NeoBiz, PayPal ve wamo ile çalışıyoruz.",
  },
  {
    icon: "office",
    /* "Dubai'de kendi ofisimiz" İDİ. Olgu yanlıştı: firmanın üç ülkede de
       kendi ofisi var ve süreçlerin hepsini kendisi yürütüyor. Tek ülkeyi
       saymak hem yanlış hem de kapsamı olduğundan dar gösteriyordu. */
    title: "Üç ülkede kendi ofisimiz",
    line: "Evrak ve otorite trafiği yerinden yürüyor.",
    detail:
      "Hiçbir ülkede işin yereli uzaktan bir aracıya devredilmiyor; başvuru, imza ve banka görüşmeleri kendi ofislerimizden yürütülüyor. Müşteriniz için bu, sürecin kimin elinde olduğunu bilmek demek.",
  },
  {
    icon: "panel",
    /* BAŞLIKTA ÜRÜN ADI YOKTU DEĞİL, ÇIKARILDI. Eskiden panelin marka adı
       başlıktaydı. Müşteri kaldırttı: "iş ortağımız vb değil, sadece panel
       olarak kullanıyoruz, ekstra adını geçirmemize gereken bir durum yok."
       Ortağa söylenen şey değişmedi (tek yerden yürüyen bir dosya akışı var),
       yalnızca hangi yazılım olduğu söylenmiyor. Kalıp about.ts · BASIS.how
       ile aynı; geri eklemeyin. */
    title: "Tek panelden takip",
    line: "Dosya, talep ve imza akışı tek yerde.",
    detail:
      "Müşterinizin evrak alışverişi bir e-posta zincirinde kaybolmuyor; süreç panel üzerinde yürüyor ve hangi belgenin beklendiği ortada duruyor.",
  },
  {
    icon: "people",
    title: "Türkçe tek muhatap",
    line: "İsimli bir danışman, mesai içinde doğrudan erişim.",
    detail:
      "Müşteriniz her aşamada aynı kişiyle konuşuyor; anlattığı şeyi ikinci kez anlatmak zorunda kalmıyor. Yönlendirdiğiniz kişinin size geri dönüp şikâyet etmesinin en sık sebebi budur.",
  },
];

/* Koyu bölümün kapanışı. Başlık bilerek ikinci tekil: ortak da bu sınırların
   içinde konuşacak. Maddeler brand.ts'teki STANCE_LIMITS'ten okunuyor. */
export const PARTNER_LIMITS_HEAD = {
  title: "Ortağımız olarak da veremeyeceğiniz sözler",
  lead:
    "Bunlar pazarlama tercihi değil, firmanın politikası. Müşteriye bu üç konuda söz veren bir kanal, ilk olumsuz sonuçta hem bizi hem sizi yakar.",
};

/* --------------------------------------------------------- hizmet zinciri */

export const PARTNER_CHAIN = {
  title: "Müşteriniz kuruluşta bırakılmıyor.",
  accent: "kuruluşta bırakılmıyor.",
  lead:
    "Kategorideki firmaların çoğu ilk halkada bitiyor; ceza da, sorun da sonrasında çıkıyor. Yönlendirdiğiniz müşteri kuruluştan sonra da aynı ekipte kalıyor.",
  /* Halka adları ve açıklamaları brand.ts · CHAIN'den geliyor, burada yalnızca
     bölümün kendi cümleleri var. */
  note: "Her halka ayrı bir hizmet; müşteri hangisine ihtiyaç duyarsa o devreye giriyor. Hepsini birden almak zorunda değil.",
};

/* --------------------------------------------------- kimler ortak olabilir */

export type PartnerWho = {
  icon: PartnerIcon;
  title: string;
  line: string;
};

/* Ortak payda meslek unvanı değil, müşterinin sorduğu soru. Dördü de "bu soru
   zaten size geliyor" mantığıyla yazıldı. Hiçbiri "şu anda çalıştığımız
   ortaklar" değil — öyle bir liste doğrulanmadı, o yüzden sayfa "kimler ortak
   OLABİLİR" diyor. */
export const PARTNER_WHO: PartnerWho[] = [
  {
    icon: "scale",
    title: "Avukat ve hukuk büroları",
    line: "Müvekkilin yapı sorusu zaten size geliyor; kuruluşu ve sonrasını biz yürütürüz.",
  },
  {
    icon: "calculator",
    title: "Mali müşavir ve muhasebe ofisleri",
    line: "Yurt dışı ayağı için ikinci bir ofis aramak yerine tek kanal.",
  },
  {
    icon: "briefcase",
    title: "İş geliştirme danışmanları ve ajanslar",
    line: "E-ticaret, yazılım ve ihracat müşterilerine ülke seçimi ve kuruluş.",
  },
  {
    icon: "school",
    title: "Eğitmen ve topluluk sahipleri",
    line: "Kitlesi yurt dışı yapı soruyorsa, soruyu cevaplayan bir muhatap.",
  },
];

export const PARTNER_WHO_NOTE =
  "Listede kendinizi göremediyseniz kanal kapalı değil: ölçü meslek adı değil, müşterinizin size bu soruyu sorup sormadığı.";

/* --------------------------------------------------------- başvuru adımları
   Süre taahhüdü YOK: hiçbir adımda "24 saat içinde dönüş" gibi bir söz
   verilmiyor, çünkü öyle bir hizmet seviyesi kararlaştırılmadı. */

export const PARTNER_STEPS = [
  { t: "Başvuru", s: "Formu doldurun ya da doğrudan bize yazın." },
  { t: "Tanışma", s: "Hangi müşteri, hangi ülke, hangi hizmet." },
  { t: "Model ve kapsam", s: "Referans mı, white-label mı; hangi hizmetler kapsamda." },
  { t: "İlk yönlendirme", s: "Müşteriyi tanıtırsınız, süreci biz devralırız." },
];

/* ------------------------------------------------------------------- form
   SWAP:PARTNER_FORM — GÖNDERİM UCU YOK.

   Formun görselini kuruyoruz ama çalışan bir uç noktamız yok: ne bir API
   rotası, ne bir form servisi, ne bir e-posta adresi doğrulandı. Bu yüzden
   şablon alanları <fieldset disabled> içinde basıyor, <form> hiçbir yere
   action vermiyor ve gönder butonu devre dışı. Sahte bir "başvurunuz alındı"
   ekranı GÖSTERİLMİYOR — gönderilmemiş bir başvuruyu alınmış gibi göstermek,
   sayfanın anlattığı dürüstlüğün tam tersi olurdu. Çalışan tek çıkış AskCta.

   Uç nokta geldiğinde: alanlar zaten burada tanımlı, yapılacak iş fieldset'in
   disabled'ını kaldırmak ve forma bir action/onSubmit vermek. */

export type PartnerField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "select";
  placeholder?: string;
  optional?: boolean;
  options?: string[];
  /** iki sütunlu ızgarada tam satırı kaplasın mı */
  wide?: boolean;
};

export const PARTNER_FORM = {
  title: "Ortaklık başvurusu.",
  accent: "başvurusu.",
  lead:
    "Önce kim olduğunuzu ve hangi müşteriye hangi ülkeyi götürdüğünüzü anlamak istiyoruz. Dört adım, uzun bir form değil.",
  /* Kısa tutuldu. Referans sitede dört alan var; bizde beş, çünkü faaliyet
     alanı ve model tercihi ilk görüşmenin konusunu baştan belirliyor. */
  fields: [
    { name: "ad", label: "Ad soyad", type: "text", placeholder: "Adınız ve soyadınız" },
    { name: "eposta", label: "E-posta", type: "email", placeholder: "ornek@firma.com" },
    { name: "telefon", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
    {
      name: "site",
      label: "Web sitesi veya LinkedIn",
      type: "url",
      placeholder: "https://",
      optional: true,
    },
    {
      name: "alan",
      label: "Faaliyet alanınız",
      type: "select",
      options: [
        "Hukuk",
        "Mali müşavirlik ve muhasebe",
        "Danışmanlık veya ajans",
        "Eğitim ve topluluk",
        "Diğer",
      ],
    },
    {
      name: "model",
      label: "Hangi model ilginizi çekiyor?",
      type: "select",
      options: ["Referans ortaklığı", "White-label", "Henüz emin değilim"],
      wide: true,
    },
  ] as PartnerField[],
  submitLabel: "Başvuruyu gönder",
  /** formun kapalı olduğunu söyleyen rozet ve açıklama — gizlenmiyor */
  badge: "Form henüz açılmadı",
  note: "Bu formun gönderim ucu henüz bağlanmadı, o yüzden alanlar kapalı duruyor. Ortaklık başvurusu için şimdilik doğrudan bize yazın.",
  askLabel: "Ortaklık için bize yazın",
};

/* -------------------------------------------------------------------- SSS
   Sekiz soru. Hiçbirinin cevabı uydurulmadı: ilki ticari şartların
   yayımlanmadığını söylüyor, üçü brand.ts'teki politikanın (banka onayı, süre,
   kişiye özel vergi görüşü) ortak diline çevrilmiş hâli, kalan dördü de
   doğrulanmış operasyon bilgisi.

   Referanstaki "ortaklık ücretsiz mi" ve "ödeme ne zaman yapılır" soruları
   BİLEREK yazılmadı: ikisinin de cevabı kararlaştırılmamış bir ticari şart.
   Cevabı olmayan soruyu sormak, sayfada boş bir vaat bırakmak olurdu; bunun
   yerine tek ve dürüst bir soru var. */

export const PARTNER_FAQ: { q: string; a: string }[] = [
  {
    q: "Komisyon oranı ve ödeme koşulu nedir?",
    a: "Bu sayfada oran, ödeme koşulu ve asgari yönlendirme şartı yayımlanmıyor. Henüz kararlaşmamış bir rakamı siteye yazmak istemiyoruz; şartları ortaklık görüşmesinde birlikte netleştiriyoruz.",
  },
  {
    q: "Referans ile white-label arasındaki fark ne?",
    a: "Referansta müşteri baştan Ortac ile konuşur, operasyonun tamamı bizdedir. White-label'da hizmet sizin markanızla sunulur, müşteri ilişkisi sizde kalır, arkadaki işi biz yürütürüz. İkisi de aynı operasyona bağlanıyor; fark, müşterinin kiminle muhatap olduğunda.",
  },
  {
    q: "Müşterimi hangi ülkelere yönlendirebilirim?",
    a: "Dubai, İngiltere ve KKTC. Üçü de aynı ekipte yürüyor. Hangisinin işe oturduğu müşterinin faaliyetine, tahsilat kanalına ve oturum ihtiyacına göre değişiyor; kartla tahsilat ana kanalsa ülke seçimi buradan değişebiliyor.",
  },
  {
    q: "Kuruluştan sonra müşteriye kim bakıyor?",
    a: "Aynı ekip. Muhasebe ve beyan tarafında kendi lisansımız var, iş üçüncü bir ofise devredilmiyor. Kuruluş, banka ve ödeme, muhasebe ve vergi, uyum, oturum ve vize aynı zincirin halkaları.",
  },
  {
    q: "Müşterime banka hesabının açılacağını söyleyebilir miyim?",
    a: "Hayır. Hesabı banka açar ve karar bankanındır. Biz dosyayı bankanın istediği formatta hazırlar, görüşmeleri yürütür ve reddedilirse ikinci kuruma yeniden başvururuz. Ortağımız olarak siz de bu sözü vermeyin.",
  },
  {
    q: "Süre taahhüdü verebilir miyim?",
    a: "Hayır. Sitedeki bütün süreler tipik aralıktır; otoritenin ve bankanın takvimi bizim kontrolümüzde değil. Müşterinize aralık söyleyin, tarih vermeyin.",
  },
  {
    q: "Müşteriye kişiye özel vergi görüşü verebiliyor muyuz?",
    a: "Siteden verilmiyor. Buradaki başlıklar genel çerçeve: şirket kurmak tek başına otomatik vergi avantajı getirmiyor, avantaj gerçek faaliyete, yönetime, mukimliğe, gelir türüne ve ilgili ülke kurallarına bağlı. Müşterinin kendi durumu ayrıca konuşuluyor.",
  },
  {
    q: "Süreci nereden takip ediyoruz?",
    /* Cevap panelin ADINI söylemiyor, bilerek: müşteri kararı (bkz. yukarıda
       PARTNER_WHY'daki panel maddesi). Sorulan zaten "hangi yazılım" değil,
       "nereden takip ediyoruz". */
    a: "Müşteri dosyası tek bir panel üzerinde yürüyor: evrak alışverişi, talepler ve imza akışı aynı yerde duruyor, hangi belgenin beklendiği ortada.",
  },
];
