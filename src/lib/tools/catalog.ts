/* ============================================================================
   ARAÇLAR — kayıt defteri
   ============================================================================

   NEDEN AYRI BİR DOSYA

   "Araçlar" üç yerde birden listeleniyor: ana sayfadaki bölüm
   (components/home/ToolsResources.tsx), navbar'ın Araçlar paneli
   (components/Nav.tsx) ve araçların kendi sayfası (app/araclar/page.tsx).
   Bu tur öncesinde üçü de listeyi kendi içinde elle taşıyordu ve sonuç şu
   oldu: ana sayfa `/araclar/odeme-altyapisi` diye bir adrese, navbar
   `/araclar/maliyet-hesaplayici` diye bir başkasına, footer `/fiyatlar`'a
   bağlanıyordu — üçünün de karşılığı olan bir sayfa yoktu. Hiçbiri 404
   vermediği için (app/[...yapim] yakalayıcısı her adrese 200 dönüyor)
   kimse fark etmedi.

   Bu dosya o hatanın tekrarlanmasını zorlaştırıyor: bir araç burada yoksa
   listelerde de yok, buradaki her `href` de tek bir gerçek sayfaya —
   /araclar — çapayla iniyor. Yeni araç eklemek isteyen tek satır yazıyor,
   üç liste birden güncelleniyor.

   ---------------------------------------------------------------------------
   BURAYA HANGİ ARAÇ GİRER

   Ayrım müşterinin kendi cümlesi: karar araçları (uygunluk testi, ülke
   kıyası, maliyet hesaplayıcı) BİZİM satış yardımcılarımız ve sitenin içine
   zaten dağıtılmış durumdalar — ana sayfada, ülke sayfalarında, hero'da.
   Araçlar bölümü ZİYARETÇİNİN işine yarayan şeylerden oluşuyor: kullanıldıktan
   sonra elde somut bir çıktı kalan, bizden bağımsız değeri olan araçlar.

   İkinci ve daha sert kural: bir aracın çıktısı sayı, süre veya tarih
   üretiyorsa o değerin kaynağı depoda DOĞRULANMIŞ bir veri olmak zorunda.
   Üç aracın üçü de `source` alanında hangi dosyadan beslendiğini yazıyor;
   hiçbiri bileşen içinde sabit sayı taşımıyor.
   ========================================================================= */

export type ToolId = "oturum-sayaci" | "yukumluluk-takvimi" | "belge-listesi";

export type ToolEntry = {
  id: ToolId;
  /** Hepsi tek sayfaya iner. Ayrı rota açmıyoruz: her yeni rota, karşılığı
      yazılmazsa yakalayıcıya düşen yeni bir ölü bağlantı demek. */
  href: string;
  title: string;
  /** başlığın vurgulanan kuyruğu — `title` içinde birebir geçmek zorunda */
  accent: string;
  /** listelerde başlığın altındaki tek satır */
  meta: string;
  /** aracın ne olduğu — sayfada başlığın altında */
  is: string;
  /** ne OLMADIĞI. Her araç bunu söylemek zorunda; çıktı bir ön değerlendirme
      ise bunu aracın kendisi yazacak, ziyaretçi tahmin etmeyecek. */
  isNot: string;
  /** hangi doğrulanmış veri dosyasından besleniyor — gözden geçirme bu
      satırdan yürür */
  source: string;
};

export const TOOL_CATALOG: ToolEntry[] = [
  {
    id: "oturum-sayaci",
    href: "/araclar#oturum-sayaci",
    title: "Oturum izni giriş sayacı",
    accent: "giriş sayacı",
    meta: "Dubai · bir sonraki giriş tarihiniz",
    is: "Son giriş tarihinizi yazıyorsunuz, BAE'ye en geç ne zaman tekrar girmeniz gerektiğini gün gün gösteriyor.",
    isNot: "Resmî bir kayıt değil. Oturum izninizin gerçek durumu göç idaresinin kendi kaydıdır; bu araç yalnızca aralığı hesaplıyor.",
    source: "lib/afterSetup.ts · AFTER_SETUP.dubai.entry",
  },
  {
    id: "yukumluluk-takvimi",
    href: "/araclar#yukumluluk-takvimi",
    title: "İlk 12 ay yükümlülük takvimi",
    accent: "yükümlülük takvimi",
    meta: "Dubai · kuruluş tarihinden takvime",
    is: "Kuruluş tarihinizi yazıyorsunuz, muhasebe ve vergi tarafında hangi ay ne çıktığını gerçek ay adlarıyla alıyorsunuz.",
    isNot: "Kesin son tarih listesi değil, bir ön değerlendirmedir: aylık dağılım mali yılın kuruluşla başladığı varsayımına dayanıyor. Tutar da göstermiyor.",
    source: "lib/afterSetup.ts · AFTER_SETUP.dubai.items + lib/countryContent.ts · dubai.tax",
  },
  {
    id: "belge-listesi",
    href: "/araclar#belge-listesi",
    title: "Belge kontrol listesi",
    accent: "kontrol listesi",
    meta: "Üç ülke · işaretlenip kopyalanabilir",
    is: "Ülkeyi seçiyorsunuz, kuruluş için sizden istenen evrakı işaretliyorsunuz ve listeyi düz metin olarak kopyalayıp yanınızda götürüyorsunuz.",
    isNot: "Tam liste garantisi değil: faaliyet konunuza ve otoriteye göre ek belge istenebiliyor.",
    source: "lib/countryContent.ts · COUNTRY_CONTENT[ülke].docs",
  },
];

export const TOOL_BY_ID: Record<ToolId, ToolEntry> = TOOL_CATALOG.reduce(
  (acc, t) => {
    acc[t.id] = t;
    return acc;
  },
  {} as Record<ToolId, ToolEntry>,
);
