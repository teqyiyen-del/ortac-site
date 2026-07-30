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
/* Brief: logo şeridi değil, rolü yazılı kartlar. Resmî ortaklık ile
   kullandığımız altyapı ayrı gruplarda — aynı çizgide akarsa iddia zayıflıyor. */
export type PartnerGroup = "resmi" | "altyapi";
export type Partner = { name: string; role: string; group: PartnerGroup };

export const PARTNERS: Partner[] = [
  { name: "IFZA", role: "Serbest bölge · resmî iş ortağı", group: "resmi" },
  { name: "Wio Business", role: "Banka", group: "resmi" },
  { name: "Mashreq NeoBiz", role: "Banka", group: "resmi" },
  { name: "PayPal", role: "Tahsilat", group: "resmi" },
  { name: "Wam", role: "Tahsilat", group: "resmi" },
  { name: "Stripe", role: "Tahsilat altyapısı", group: "altyapi" },
  { name: "TaxDome", role: "Müşteri paneli", group: "altyapi" },
];

/* ------------------------------------------------- banking / payments grid */
/* ✓ var · – yok/ilgisiz · ✗ desteklenmiyor. KKTC'nin ✗'leri kasıtlı: Stripe'ın
   resmî ülke listesinde KKTC yok, PayPal da desteklemiyor. Gizlenmiyor. */
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
      { name: "Wam", cells: { dubai: "yes", ingiltere: "none", kktc: "none" } },
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
