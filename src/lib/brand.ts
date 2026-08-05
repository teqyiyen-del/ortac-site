/* ============================================================================
   ORTAC GLOBAL — single source of truth for everything the brief marks SABİT.
   Prices, durations, partner roles and the payment matrix all read from here,
   so updating a number updates the hero globe, the country cards and the
   pricing summary at once.
   ========================================================================= */

export type CountrySlug = "dubai" | "ingiltere" | "kktc";

export const COUNTRY_ORDER: CountrySlug[] = ["dubai", "ingiltere", "kktc"];

export const COUNTRY_NAME: Record<CountrySlug, string> = {
  dubai: "Dubai",
  ingiltere: "İngiltere",
  kktc: "KKTC",
};

/* SWAP:PRICES — temsilî. Gerçek liste geldiğinde yalnızca bu blok değişir. */
export type CountryFacts = {
  from: number; // USD, "…'dan başlar"
  fromLabel: string;
  days: string;
  forWhom: string;
  /** the honest limit — brief requires one per country, never omitted */
  limit: string;
  structure: string;
  /** two words for the map label, where a price would be too much detail */
  tag: string;
};

export const FACTS: Record<CountrySlug, CountryFacts> = {
  dubai: {
    from: 3900,
    fromLabel: "$3.900",
    days: "7-14 gün",
    tag: "Serbest bölge",
    forWhom: "E-ticaret, teknoloji, danışmanlık, oturum isteyen",
    limit: "Vize ve biyometri için BAE'ye gelmek gerekiyor",
    structure: "Serbest bölge veya mainland",
  },
  ingiltere: {
    from: 1200,
    fromLabel: "$1.200",
    days: "3-7 gün",
    tag: "Uzaktan kuruluş",
    forWhom: "AB pazarı, freelance, gayrimenkul SPV",
    limit: "Şirket kurmak oturum hakkı vermiyor",
    structure: "Limited · Companies House",
  },
  kktc: {
    from: 2400,
    fromLabel: "$2.400",
    days: "5-10 gün",
    tag: "Türkiye'ye yakın",
    forWhom: "Türkiye'ye yakın operasyon, düşük maliyet",
    limit: "AB üyesi değil, Güney Kıbrıs ile aynı şey değil",
    structure: "Limited · yerel tescil",
  },
};

/* ---------------------------------------------------------------- services */
/* URL mimarisi SABİT: /dubai, /dubai/muhasebe, /dubai/banka-hesabi … */
export type ServiceKey =
  | "kurulus"
  | "muhasebe"
  | "banka-hesabi"
  | "oturum-vize"
  | "uyum"
  | "sponsor-licence"
  | "serbest-bolge"
  | "adres"
  | "danismanlik";

export type NavService = { key: ServiceKey; label: string; href: string; meta?: string };

export const COUNTRY_SERVICES: Record<CountrySlug, NavService[]> = {
  dubai: [
    { key: "kurulus", label: "Şirket Kuruluşu", href: "/dubai", meta: "$3.900 · 7-14 gün" },
    { key: "muhasebe", label: "Muhasebe & Vergi", href: "/dubai/muhasebe", meta: "aylık" },
    { key: "banka-hesabi", label: "Banka & Ödeme", href: "/dubai/banka-hesabi", meta: "Wio · Mashreq" },
    { key: "oturum-vize", label: "Oturum & Vize", href: "/dubai/oturum-vize", meta: "kişi başı" },
    { key: "uyum", label: "Uyum & AML", href: "/dubai/uyum", meta: "goAML" },
    { key: "danismanlik", label: "Kurumsal Danışmanlık", href: "/dubai/danismanlik" },
  ],
  ingiltere: [
    { key: "kurulus", label: "Şirket Kuruluşu", href: "/ingiltere", meta: "$1.200 · 3-7 gün" },
    { key: "muhasebe", label: "Muhasebe & Vergi", href: "/ingiltere/muhasebe", meta: "aylık" },
    { key: "banka-hesabi", label: "Banka & Ödeme", href: "/ingiltere/banka-hesabi", meta: "Wise · Payoneer" },
    { key: "sponsor-licence", label: "Sponsor Licence", href: "/ingiltere/sponsor-licence" },
    { key: "adres", label: "Şirket Adresi", href: "/ingiltere/adres", meta: "yıllık" },
  ],
  kktc: [
    { key: "kurulus", label: "Şirket Kuruluşu", href: "/kktc", meta: "$2.400 · 5-10 gün" },
    { key: "muhasebe", label: "Muhasebe & Vergi", href: "/kktc/muhasebe", meta: "aylık" },
    { key: "banka-hesabi", label: "Banka & Ödeme", href: "/kktc/banka-hesabi", meta: "yerel banka" },
    { key: "serbest-bolge", label: "Serbest Bölge", href: "/kktc/serbest-bolge" },
  ],
};

/* -------------------------------------------------------------- partners */
/* Resmî ortaklık ile kullandığımız altyapı ayrı gruplarda — aynı çizgide
   akarsa iddia zayıflıyor. Bu ayrımı `group` taşıyor ve iki vitrin de onu
   okuyor: nav'daki resmî ortak şeridi yalnızca "resmi"yi basıyor, hero
   şeridi ikisini birden.

   BU LİSTE MARKA VARLIĞI TAŞIMIYOR, yalnızca ad. Ada karşılık gelen logo
   lib/brands.ts'te ve eşleme `brandKeyForName` ile ad üzerinden kuruluyor —
   yani buraya yeni bir ortak girip brands.ts'e girmezse şeritte düz adıyla
   çıkar, uydurma bir işaretle değil. Yeni ad eklerken brands.ts'teki
   `title` ile BİREBİR aynı yazılmalı, yoksa eşleşme sessizce düşer.

   BU TURDA DEĞİŞEN — gönderilen bütün markalar listeye girdi
   Müşterinin kararı: "sana attığım tüm logolar listeye dahil olabilir".
   brands.ts'te tam logosu duran on iki markadan altısı bu listede yoktu
   (Meydan FZ, Emirates NBD, Payoneer, Binance, Xero, QuickBooks); altısı da
   girdi. Ama "listeye dahil" bir ROL vermiyor, o yüzden:

   ROL VE GRUP NASIL SEÇİLDİ — iki ayrı soru, ikisi de dar cevaplandı
   `role` kurumun NE OLDUĞUNU söylüyor (banka, serbest bölge, borsa) — bu
   kamuya açık ve doğrulanabilir. `group` ise FİRMANIN O KURUMLA İLİŞKİSİNİ
   söylüyor ve doğrulanabilir DEĞİL. İkisi karıştırılırsa liste sessizce bir
   ortaklık beyanına dönüşüyor.

   Bu yüzden yeni altı satırın hiçbiri "resmi" grubuna girmedi. "resmi"nin
   ekrandaki karşılığı nav şeridinde "Resmî iş ortaklarımız" başlığı ve
   /hakkimizda'da "adımızın karşı tarafta kayıtlı olduğu kurumlar" cümlesi —
   doğrulanmamış bir ilişki için bu iki cümlenin ikisi de yalan olurdu.
   IFZA'nın "resmî iş ortağı" etiketi doğrulanmış bir iddia ve KOPYALANMADI:
   Meydan FZ de bir serbest bölge ama rolü yalnızca "Serbest bölge".

   MÜŞTERİYE SORULACAK: bu altısından hangileriyle gerçekten resmî/kayıtlı bir
   ortaklık var? Cevap gelen satır "resmi"ye taşınır ve rolüne ilişki bilgisi
   eklenir; o güne kadar dar hâliyle duruyor.

   SIRA — rastgele değil, sitenin kendi zinciri (CHAIN)
   Her iki grup da aynı sırayı izliyor: serbest bölge → banka → ödeme/tahsilat
   → muhasebe → panel. Ziyaretçi listeyi yukarıdan aşağı okurken kuruluştan
   işletmeye giden aynı sırayı görüyor. Şerit ve ticker bu diziyi olduğu gibi
   basıyor, o yüzden sıra ekranda da bu ritmi veriyor. */
export type PartnerGroup = "resmi" | "altyapi";
export type Partner = { name: string; role: string; group: PartnerGroup };

export const PARTNERS: Partner[] = [
  /* --- resmi: doğrulanmış ilişki. Nav şeridi YALNIZCA bu grubu basıyor. --- */
  { name: "IFZA", role: "Serbest bölge · resmî iş ortağı", group: "resmi" },
  { name: "Wio Business", role: "Banka", group: "resmi" },
  { name: "Mashreq NeoBiz", role: "Banka", group: "resmi" },
  { name: "PayPal", role: "Tahsilat", group: "resmi" },
  /* "Wam" bir YAZIM HATASIYDI, marka "wamo" (küçük harf, kendi logosunda da
     öyle). Düzeltme yeni bir iddia değil — aynı ortak, doğru adıyla. Ad aynı
     zamanda brands.ts'e köprü: `brandKeyForName` başlık üzerinden eşliyor, o
     yüzden iki dosyada BİREBİR aynı yazılmalı. */
  { name: "wamo", role: "Tahsilat", group: "resmi" },

  /* --- altyapi: ortaklık iddiası taşımayan grup. Yeni altı ad buraya. --- */
  /* Meydan FZ — Dubai'de bir serbest bölge, IFZA gibi. IFZA'nın rolündeki
     "· resmî iş ortağı" yarısı BİLEREK alınmadı. */
  { name: "Meydan FZ", role: "Serbest bölge", group: "altyapi" },
  /* Emirates NBD — BAE'nin büyük bankalarından. Rol Wio/Mashreq ile aynı
     kelime ("Banka") çünkü rol kurumu tarif ediyor; ilişkiyi grup söylüyor
     ve o ikisinden farklı. */
  { name: "Emirates NBD", role: "Banka", group: "altyapi" },
  /* Payoneer — banka değil ödeme kuruluşu; rol PAY_MATRIX'teki grup başlığının
     birebir aynısı ki iki vitrin aynı şeyi aynı kelimeyle söylesin. Sitede
     zaten geçiyordu (matris + İngiltere banka satırı), yeni olan tek şey
     listeye girmesi. */
  { name: "Payoneer", role: "Ödeme kuruluşu", group: "altyapi" },
  { name: "Stripe", role: "Tahsilat altyapısı", group: "altyapi" },
  /* Binance — kripto varlık borsası. Rol bunu ve yalnızca bunu söylüyor:
     "desteklenen kanal" ya da "çalıştığımız borsa" demek, doğrulanmamış bir
     hizmet iddiası olurdu. */
  { name: "Binance", role: "Kripto varlık borsası", group: "altyapi" },
  /* Xero ve QuickBooks — bulut muhasebe yazılımları. İkisi de siteye BU TURDA
     ilk kez giriyor: bugüne kadar hiçbir sayfada adları geçmiyordu. */
  { name: "Xero", role: "Muhasebe yazılımı", group: "altyapi" },
  { name: "QuickBooks", role: "Muhasebe yazılımı", group: "altyapi" },
  /* Rolü accountingDubai.ts okuyor (ACC_PANEL, role === "Müşteri paneli").
     Bu dize DEĞİŞTİRİLEMEZ, ikinci bir satıra da verilemez. */
  { name: "TaxDome", role: "Müşteri paneli", group: "altyapi" },
];

/* ------------------------------------------------- banking / payments grid */
/* ✓ var · – yok/ilgisiz · ✗ desteklenmiyor. KKTC'nin ✗'leri kasıtlı: Stripe'ın
   resmî ülke listesinde KKTC yok, PayPal da desteklemiyor. Gizlenmiyor.

   PARTNERS'A GİREN ALTI YENİ AD BURAYA GİRMEDİ — bilerek. Bu tablo "hangi
   kanal hangi ülkede" diyor, yani her hücre ayrı bir olgu iddiası. Emirates
   NBD'yi Dubai sütununda ✓ yapmak "bu bankada hesap açıyoruz" demek olurdu ve
   elimizde o bilgi yok; boş bırakmak da tabloyu eksik gösterirdi. Satır ancak
   üç ülkenin üçü için de cevap geldiğinde eklenir. Payoneer zaten "Ödeme
   kuruluşu" grubunda duruyordu, adı PARTNERS'takiyle birebir aynı. */
export type Cell = "yes" | "no" | "none";
export type MatrixRow = { name: string; note?: string; cells: Record<CountrySlug, Cell> };
export type MatrixGroup = { title: string; hint: string; rows: MatrixRow[] };

export const PAY_MATRIX: MatrixGroup[] = [
  {
    title: "Banka hesabı",
    hint: "Bankacılık lisansı olan kurum",
    rows: [
      { name: "Wio Business", cells: { dubai: "yes", ingiltere: "none", kktc: "none" } },
      { name: "Mashreq NeoBiz", cells: { dubai: "yes", ingiltere: "none", kktc: "none" } },
      { name: "Yerel banka", cells: { dubai: "yes", ingiltere: "yes", kktc: "yes" } },
    ],
  },
  {
    title: "Ödeme kuruluşu",
    hint: "Banka değil; farklı lisans ve koruma rejimi",
    rows: [
      { name: "Wise", cells: { dubai: "yes", ingiltere: "yes", kktc: "no" } },
      { name: "Payoneer", cells: { dubai: "yes", ingiltere: "yes", kktc: "no" } },
    ],
  },
  {
    title: "Tahsilat",
    hint: "Kartla ve platform üzerinden tahsilat",
    rows: [
      { name: "Stripe", cells: { dubai: "yes", ingiltere: "yes", kktc: "no" } },
      { name: "PayPal", cells: { dubai: "yes", ingiltere: "yes", kktc: "no" } },
      { name: "wamo", cells: { dubai: "yes", ingiltere: "none", kktc: "none" } },
    ],
  },
];

/* ------------------------------------------------------- the stance, SABİT */
/* Brief §2. Bu metin pazarlama tercihi değil, firmanın resmî politikası. */
export const STANCE_Q = "Şirket kurarak otomatik vergi avantajı elde eder miyim?";
export const STANCE_A =
  "Hayır. Avantaj gerçek faaliyete, yönetime, mukimliğe, gelir türüne ve ilgili ülke kurallarına bağlıdır.";

export const STANCE_LIMITS = [
  {
    title: "Banka onayı garantisi vermiyoruz",
    line: "Hesabı banka açar. Biz dosyayı bankanın istediği formatta hazırlar ve süreci yürütürüz.",
  },
  {
    title: "Kesin süre taahhüdü vermiyoruz",
    line: "Süreler tipik aralıklardır. Otoritenin ve bankanın takvimi bizim kontrolümüzde değil.",
  },
  {
    /* Başlık politika ve aynen kalıyor: siteden kişiye özel vergi görüşü
       verilmiyor. Değişen ikinci satırdı — "mali müşavir görüşmesinde, yazılı
       olarak yapılır" cümlesi olmayan bir hizmeti tarif ediyor, üstelik bir de
       çıktı biçimi ("yazılı") taahhüt ediyordu. Yerine sınırın ne olduğunu
       söyleyen ve ziyaretçiyi sitenin gerçekten sunduğu tek kanala bırakan bir
       satır geldi. Bu dizi üç kartta da aynı kalıbı izliyor: birinci cümle
       sınırı koyar, ikinci cümle bunun yerine ne yaptığımızı söyler. */
    title: "Kişiye özel vergi görüşü siteden verilmiyor",
    line: "Buradaki başlıklar genel çerçevedir. Kendi durumunuzu bize sorabilirsiniz.",
  },
];

/* --------------------------------------------------- the post-setup chain */
export const CHAIN = [
  { key: "kurulus", label: "Kuruluş", line: "Lisans, tescil ve kuruluş evrakı" },
  { key: "banka", label: "Banka & Ödeme", line: "Hesap başvurusu ve tahsilat kanalları" },
  { key: "muhasebe", label: "Muhasebe & Vergi", line: "Defter, beyan ve raporlama" },
  { key: "uyum", label: "Uyum", line: "AML / goAML yükümlülükleri" },
  { key: "oturum", label: "Oturum & Vize", line: "Vize, biyometri ve kimlik" },
];
