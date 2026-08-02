import type { CountrySlug } from "@/lib/brand";

/* ============================================================================
   ARAÇLAR — kayıt defteri
   ============================================================================

   NEDEN AYRI BİR DOSYA

   "Araçlar" beş yerde birden listeleniyor: ana sayfadaki bölüm
   (components/home/ToolsResources.tsx), navbar'ın Araçlar paneli
   (components/Nav.tsx), footer dizini (Footer/FinalCta), araçların DİZİNİ
   (app/araclar/page.tsx) ve araçların KENDİ SAYFALARI (app/araclar/[arac]).
   Bu dosyadan önce hepsi listeyi kendi içinde elle taşıyordu; sonuç şu oldu:
   ana sayfa /araclar/odeme-altyapisi'na, navbar /araclar/maliyet-hesaplayici'ye,
   footer /fiyatlar'a bağlanıyordu — üçünün de karşılığı olan bir sayfa yoktu.
   Hiçbiri 404 vermediği için (app/[...yapim] her adrese 200 dönüyor) kimse
   fark etmedi.

   Bir araç burada yoksa hiçbir listede yok. Yeni araç eklemek tek satır.

   ---------------------------------------------------------------------------
   BU TURUN DÖRT KARARI — hepsi bu dosyanın alanlarına yazılı

   1) ÜLKE AYRIMI MENÜDE YOK, ARACIN İÇİNDE VAR.        (alan: `country`)

      Sitenin geri kalanı ülke-önce çalışıyor ve Hizmetler paneli bir ülke
      sekmesiyle açılıyor. Araçlarda aynısını yapmadık; sebep tutarsızlık değil,
      iki bölümün farklı şeyler olması:

        · Hizmette ülke ZORUNLU ön koşul — hizmetin var olup olmadığı bile
          ülkeye bağlı (İngiltere'de vize yok). Ülke seçilmeden liste
          kurulamıyor.
        · Araçta değil. Belge listesi üç ülkeyi TEK ekranda karşılaştırmak için
          var; ülke sekmesine sokmak aracın işini bozar. İsim üretecinin ülkeyle
          hiçbir ilgisi yok. Geriye ülkeye bağlı olan hesaplayıcılar kalıyor ve
          onların ülkesi zaten adlarında yazıyor ("BAE kurumlar vergisi").

      Ölçtük: üç sekme × sekiz araç = 24 hücrenin yarısı boş ya da tekrar olurdu,
      ve ülkesiz araçlar için dördüncü bir "genel" sekmesi gerekirdi — o sekme
      rayın anlamını ("önce ülke") tamamen bozar.

      Üçüncü ve asıl gerekçe arama trafiği: bu araçların ekseni ülke değil SORU.
      "dubai kurumlar vergisi hesaplama" arayan kişi menüden ülke sekmesi
      gezmiyor, doğrudan araca iniyor. Menü onun için değil, siteyi keşfeden
      için var — ve o kişi "hangi ülkede" diye değil "ne yapabiliyorum" diye
      bakıyor. O yüzden menü HUNİYE göre gruplanıyor (aşağıdaki `family`),
      ülkeye göre değil. Ülke bilgisi kaybolmuyor: her kartın alt satırında
      (`meta`) yazıyor, çok ülkeli araçlarda seçim aracın içinde.

   2) HER ARACIN KENDİ SAYFASI VAR.              (alanlar: `id` → `href`)

      BU TURDA DEĞİŞTİ. Önceki tur yayındaki araçların hepsini /araclar'a
      yığmış ve adreslerini çapa olarak vermişti (/araclar#bae-kdv). Gerekçesi
      geçerliydi — her alt rota, karşılığı yazılana kadar app/[...yapim]
      yakalayıcısına düşen yeni bir ölü bağlantı demek. Müşterinin kararı
      başka: "her aracın ayrı sayfası olacak, hepsini tek bir sayfaya toplayıp
      içinde section yapma."

      Risk çapayla değil, ROTAYI GERÇEKTEN YAZARAK yönetildi:
        · Yayındaki her aracın sayfası var → /araclar/<id>
        · Planlanan araç için sayfa AÇILMADI. Adresi kayıt defterinde duruyor
          ama hiçbir yerden bağlanmıyor: SmartLink yayında olmayan adresi sönük
          ve tıklanamaz basıyor (lib/routes.ts + [data-soon]). Yani yakalayıcıya
          tıklamayla düşülemiyor.

      SLUG ELLE YAZILMIYOR. Adres `id`'den türüyor ve sayfa dosyası TEK:
      app/araclar/[arac]/page.tsx, generateStaticParams() bu defterden
      besleniyor. İki yerde yazılan slug bir gün ayrışır; burada yazılacak
      ikinci bir yer yok.

      TEK İSTİSNA `ownHref`: uygunluk testi bu bölümden önce vardı ve URL
      mimarisi sabit (/uygunluk-testi). Kayıt defteri adres uydurmuyor, var
      olanı yazıyor; `paged` alanı da o kalemin dinamik rotadan ÜRETİLMEDİĞİNİ
      söylüyor, yoksa aynı adres iki kez üretilirdi.

   3) BİLEŞEN TABLOSU BURADA DEĞİL — AMA TİPİ BURADAN.

      "Hangi aracı hangi bileşen çiziyor" tablosu components/tools/registry.tsx
      dosyasında. Sebebi tek: bu defteri istemci bileşeni olan Nav.tsx de içeri
      alıyor; bileşen tablosunu buraya koymak altı aracın kodunu menü paketine
      sokardı.

      Bağ tip sisteminde: registry `Record<PagedToolId, …>` olarak yazılı.
      Yani `status`'ü "live" yapıp bileşenini yazmayan da, "planned" bırakıp
      bileşen yazan da DERLEME HATASI alıyor. Defter tek kaynak olmaya devam
      ediyor, tablo ona uymak zorunda.

   4) PLANLANAN ARAÇLAR MENÜDE GÖRÜNÜYOR — AMA SAYILI.       (alan: `nav`)

      Müşteri sönük girdileri bu tur açıkça istedi ("navbardaki gidilmeyen
      yerler yine soluk olsun"). Abartılırsa panel bir "yakında" duvarına döner,
      o yüzden menüye giren planlanan araç sayısı İKİ ile sınırlı ve ikisi de
      belgenin en yüksek öncelikli, en çok aranan iki hesaplayıcısı. Kalan
      planlananlar menüde değil, /araclar dizininde — menü bir dolaşım yüzeyi,
      yol haritası değil.

   ---------------------------------------------------------------------------
   BURAYA HANGİ ARAÇ GİRER

   Ölçüt: ziyaretçinin işine yarayan, kullanıldıktan sonra elde somut bir çıktı
   kalan şey. Bir hesap, bir liste, bir takvim, bir tarih.

   UYGUNLUK TESTİ BU TURDA DEFTERE GİRDİ. Önceki tur onu bilerek dışarıda
   bırakmıştı ("karar araçları bizim satış yardımcılarımız, siteye zaten
   dağılmışlar") ve Nav'da elle yazılmış tek kart oydu. İki şey değişti:
     · Müşterinin kararıyla YAYINDA OLAN TEK ARAÇ o. Kendisini "araçların tek
       kaynağı" diye tanıtan bir defterin, gerçekten gidilebilen tek aracı
       dışarıda bırakması defteri yanlış yapardı.
     · Elle yazılmış tek kart olduğu için de tam olarak bu dosyanın önlemek
       için var olduğu şeydi.
   Adresi sabit olduğu için `ownHref` ile giriyor; sayfası zaten yazılmış
   (app/araclar/uygunluk-testi + app/uygunluk-testi yeniden dışa aktarımı).

   İkinci ve daha sert kural: bir aracın çıktısı sayı, süre veya tarih
   üretiyorsa o değerin kaynağı depoda DOĞRULANMIŞ bir veri ya da
   lib/tools/rates.ts (SWAP:TOOL_RATES) olmak zorunda. Her girdinin `source`
   alanı bunu yazıyor; hiçbir bileşen kendi içinde oran taşımıyor.
   ========================================================================= */

export type ToolId =
  /* huni tepesi — arama trafiği */
  | "bae-kurumlar-vergisi"
  | "bae-kdv"
  | "ingiltere-kurumlar-vergisi"
  | "kktc-serbest-liman"
  /* huni ortası — karar */
  | "uygunluk-testi"
  | "isim-ureteci"
  | "free-zone-mainland"
  | "golden-visa-uygunluk"
  | "non-resident-uygunluk"
  /* huni sonrası — mevcut müşteri */
  | "belge-listesi"
  | "yukumluluk-takvimi"
  | "oturum-sayaci";

/** Belgenin huni haritası (s.4). Menüdeki ve dizindeki gruplama bundan. */
export type ToolFamily = "hesaplayici" | "karar" | "sonrasi";

export type ToolStatus = "live" | "planned";

export const FAMILY_LABEL: Record<ToolFamily, { head: string; line: string }> = {
  hesaplayici: {
    head: "Hesaplayıcılar",
    line: "Bir sayı sorup bir sayı alıyorsunuz. Huninin en tepesi: arama sonuçlarından gelen kişi buraya iniyor.",
  },
  karar: {
    head: "Karar araçları",
    line: "Seçenekleri daraltıyor. Cevabı sizde kalıyor, bir sonraki adımı siz seçiyorsunuz.",
  },
  sonrasi: {
    head: "Kuruluş sonrası",
    line: "Şirket kurulduktan sonra işe yarayanlar: tarih, takvim, liste.",
  },
};

export const FAMILY_ORDER: ToolFamily[] = ["hesaplayici", "karar", "sonrasi"];

export type ToolEntry = {
  id: ToolId;
  status: ToolStatus;
  family: ToolFamily;
  /** Aracın ülkesi. `null` = ülkeden bağımsız (isim üreteci),
   *  `"hepsi"` = üç ülkeyi birlikte gösteriyor (belge listesi). */
  country: CountrySlug | "hepsi" | null;
  /** menüdeki Araçlar panelinde kart olarak çıksın mı — bkz. karar (4) */
  nav: boolean;
  /** `id`'den türüyor; elle yazılmıyor (bkz. karar (2)) */
  href: string;
  /** Sayfası app/araclar/[arac] dinamik rotasından mı üretiliyor?
   *  false olan iki hâl var: planlanan araç (sayfası YOK) ve kendi dosyası
   *  olan araç (uygunluk testi). generateStaticParams() bunu süzüyor. */
  paged: boolean;
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
  /** hangi doğrulanmış veriden besleniyor — gözden geçirme bu satırdan yürür.
      Planlanan araçlarda bunun yerine NEDEN yazılmadığı yazıyor. */
  source: string;
};

/* `href` ve `paged` türetiliyor; `ownHref` yalnızca sabit adresli araçta. */
type ToolSeed = Omit<ToolEntry, "href" | "paged"> & { ownHref?: string };

const SEEDS = [
  /* ------------------------------------------------------- HESAPLAYICILAR */
  {
    id: "bae-kurumlar-vergisi",
    status: "live",
    family: "hesaplayici",
    country: "dubai",
    nav: true,
    title: "BAE kurumlar vergisi hesaplayıcı",
    accent: "hesaplayıcı",
    meta: "Dubai · dilimli hesap ve efektif oran",
    is: "Vergiye tabi kazancınızı yazıyorsunuz; eşiğin altı ve üstü ayrı ayrı hesaplanıyor, çıkan vergi ve efektif oran görünüyor.",
    isNot: "Vergi beyanı ya da vergi görüşü değil. Kazancınızın vergiye tabi kısmının nasıl hesaplandığı ayrı bir konu; bu araç size ait olduğunu söylediğiniz rakamı dilimlere bölüyor, o kadar. Serbest bölge muafiyeti bu hesaba dahil değil.",
    source: "lib/tools/rates.ts · UAE_CT (SWAP:TOOL_RATES) + lib/countryContent.ts · dubai.tax",
  },
  {
    id: "bae-kdv",
    status: "live",
    family: "hesaplayici",
    country: "dubai",
    nav: true,
    title: "BAE KDV hesaplayıcı",
    accent: "KDV hesaplayıcı",
    meta: "Dubai · dâhil / hariç çevirimi",
    is: "Tutarı yazıp KDV'nin dâhil mi hariç mi olduğunu seçiyorsunuz; matrah, KDV ve toplam üç satır hâlinde çıkıyor.",
    isNot: "Kayıt zorunluluğunuz olup olmadığını söylemiyor. Eşik kuralı ekranda yazıyor ama eşiğe hangi tutarların girdiği faaliyetinize bağlı; onu bu araç bilemez.",
    source: "lib/tools/rates.ts · UAE_VAT (SWAP:TOOL_RATES) + lib/countryContent.ts · dubai.tax",
  },
  {
    id: "ingiltere-kurumlar-vergisi",
    status: "planned",
    family: "hesaplayici",
    country: "ingiltere",
    nav: true,
    title: "İngiltere kurumlar vergisi hesaplayıcı",
    accent: "kurumlar vergisi hesaplayıcı",
    meta: "İngiltere · oran teyidi bekliyor",
    is: "Kâr dilimine göre kurumlar vergisi ve vergi sonrası kâr.",
    isNot: "Henüz yazılmadı.",
    source:
      "YAZILMADI — countryContent.ts'te oran SWAP:UK_CT_RATE ile teyitsiz ve marjinal indirim eşiği hiçbir yerde yok. Eşiksiz dilimli hesap yanlış sonuç üretir.",
  },
  {
    id: "kktc-serbest-liman",
    status: "planned",
    family: "hesaplayici",
    country: "kktc",
    nav: true,
    title: "KKTC Serbest Liman vs LTD karşılaştırma",
    accent: "vs LTD karşılaştırma",
    meta: "KKTC · oran yayın kararı bekliyor",
    is: "İki yapının vergi yükünü aynı kazanç üzerinden yan yana koyar.",
    isNot: "Henüz yazılmadı.",
    source:
      "YAZILMADI — countryContent.ts KKTC için 'bu sayfada oran yayımlamıyoruz' diyor. Belgedeki oranlar (s.8) sitenin kendi yayın kararıyla çelişiyor; çelişki araçla değil müşteriyle çözülür.",
  },

  /* ------------------------------------------------------ KARAR ARAÇLARI */
  {
    id: "uygunluk-testi",
    status: "live",
    family: "karar",
    country: "hepsi",
    nav: true,
    /* Sabit adres: test bu bölümden önce vardı ve /uygunluk-testi'de yaşıyor.
       app/araclar/uygunluk-testi de aynı sayfanın yeniden dışa aktarımı. */
    ownHref: "/uygunluk-testi",
    title: "Ülke uygunluk testi",
    accent: "uygunluk testi",
    meta: "Üç ülke · beş soru, puanlı kısa liste",
    is: "Beş soruya cevap veriyorsunuz; Dubai, İngiltere ve KKTC cevaplarınıza göre puanlanıp sıralanıyor ve ikinciyle aradaki fark da yazıyor.",
    isNot: "Tek bir öneri vermiyor ve yerinize karar vermiyor: çıkan şey bir kısa liste. Puan ağırlıkları da henüz teyit edilmedi, o yüzden sonuç ekranı hüküm kurmuyor — farkın tek cevapla dönüp dönmediğini söylüyor.",
    source: "lib/fitTest.ts · sorular ve ağırlıklar (SWAP:FIT_WEIGHTS — teyit bekliyor)",
  },
  {
    id: "isim-ureteci",
    status: "live",
    family: "karar",
    country: null,
    nav: true,
    title: "Şirket ismi üreteci",
    accent: "ismi üreteci",
    meta: "Üç ülke için · üç alternatif üretir",
    is: "Bir anahtar kelime ve bir üslup seçiyorsunuz; araç kelime birleştirerek aday isimler çıkarıyor ve ilk üçünü tercih sırasıyla kopyalanacak biçimde veriyor.",
    isNot: "Müsaitlik sorgusu DEĞİL. Bir ismin tescil edilebilir olup olmadığını yalnızca ilgili otorite söyler; benzerlik kontrolü ve kısıtlı kelime listesi ayrı bir aşamadır. Araç yapay zekâ da kullanmıyor, sabit kelime listelerini birleştiriyor.",
    source: "lib/tools/names.ts · kelime listeleri (sayı üretmiyor)",
  },
  {
    id: "free-zone-mainland",
    status: "planned",
    family: "karar",
    country: "dubai",
    nav: false,
    title: "Free Zone vs Mainland karşılaştırma",
    accent: "vs Mainland karşılaştırma",
    meta: "Dubai · maliyet, sahiplik, ofis şartı",
    is: "İki yapıyı maliyet, sahiplik ve ofis şartı ekseninde yan yana koyar.",
    isNot: "Henüz yazılmadı.",
    source:
      "YAZILMADI — nitel karşılaştırma countryContent.dubai.structures'ta zaten var ve ülke sayfasında basılıyor. Araca dönüşmesi için maliyet tarafının doğrulanması gerekiyor (pricing.ts ile afterSetup.ts arasında çözülmemiş fiyat çelişkisi var: SWAP:AFTER_PRICING).",
  },
  {
    id: "golden-visa-uygunluk",
    status: "planned",
    family: "karar",
    country: "dubai",
    nav: false,
    title: "Golden Visa uygunluk testi",
    accent: "uygunluk testi",
    meta: "Dubai · 10 yıllık vize ön değerlendirmesi",
    is: "Birkaç soruyla 10 yıllık vizeye uygunluk ön değerlendirmesi.",
    isNot: "Henüz yazılmadı.",
    source:
      "YAZILMADI — uygunluk eşikleri (yatırım tutarı, maaş, meslek listeleri) depoda hiç yok. Belgede de yalnızca aracın adı geçiyor (s.6), eşik verilmiyor.",
  },
  {
    id: "non-resident-uygunluk",
    status: "planned",
    family: "karar",
    country: "ingiltere",
    nav: false,
    title: "Non-resident kuruluş uygunluk testi",
    accent: "uygunluk testi",
    meta: "İngiltere · rakiplerde karşılığı yok",
    is: "Yurt dışından İngiltere şirketi kurabilir misiniz, neye ihtiyacınız var.",
    isNot: "Henüz yazılmadı.",
    source:
      "YAZILMADI — belge bu aracı en yüksek öncelikli fark yaratıcı olarak işaretliyor (s.7) ama gereklilik listesi depoda yok. Sıradaki tur için en güçlü aday.",
  },

  /* ---------------------------------------------------- KURULUŞ SONRASI */
  {
    id: "belge-listesi",
    status: "live",
    family: "sonrasi",
    country: "hepsi",
    nav: true,
    title: "Belge kontrol listesi",
    accent: "kontrol listesi",
    meta: "Üç ülke · işaretlenip kopyalanabilir",
    is: "Ülkeyi seçiyorsunuz, kuruluş için sizden istenen evrakı işaretliyorsunuz ve listeyi düz metin olarak kopyalayıp yanınızda götürüyorsunuz.",
    isNot: "Tam liste garantisi değil: faaliyet konunuza ve otoriteye göre ek belge istenebiliyor.",
    source: "lib/countryContent.ts · COUNTRY_CONTENT[ülke].docs",
  },
  {
    id: "yukumluluk-takvimi",
    status: "live",
    family: "sonrasi",
    country: "dubai",
    nav: true,
    title: "İlk 12 ay yükümlülük takvimi",
    accent: "yükümlülük takvimi",
    meta: "Dubai · kuruluş tarihinden takvime",
    is: "Kuruluş tarihinizi yazıyorsunuz, muhasebe ve vergi tarafında hangi ay ne çıktığını gerçek ay adlarıyla alıyorsunuz.",
    isNot: "Kesin son tarih listesi değil, bir ön değerlendirmedir: aylık dağılım mali yılın kuruluşla başladığı varsayımına dayanıyor. Tutar da göstermiyor.",
    source: "lib/afterSetup.ts · AFTER_SETUP.dubai.items + lib/countryContent.ts · dubai.tax",
  },
  {
    id: "oturum-sayaci",
    status: "live",
    family: "sonrasi",
    country: "dubai",
    nav: false,
    title: "Oturum izni giriş sayacı",
    accent: "giriş sayacı",
    meta: "Dubai · bir sonraki giriş tarihiniz",
    is: "Son giriş tarihinizi yazıyorsunuz, BAE'ye en geç ne zaman tekrar girmeniz gerektiğini gün gün gösteriyor.",
    isNot: "Resmî bir kayıt değil. Oturum izninizin gerçek durumu göç idaresinin kendi kaydıdır; bu araç yalnızca aralığı hesaplıyor.",
    source: "lib/afterSetup.ts · AFTER_SETUP.dubai.entry",
  },
] as const satisfies readonly ToolSeed[];

type Seed = (typeof SEEDS)[number];

/**
 * Sayfası app/araclar/[arac] rotasından üretilen araçların kimlikleri.
 *
 * Bu tip yalnızca bir kolaylık değil, defter ile bileşen tablosu arasındaki
 * TEK BAĞ: components/tools/registry.tsx `Record<PagedToolId, …>` olarak
 * yazılı olduğu için, buradaki `status` alanına dokunan herkes karşılığında
 * bir bileşen yazmak (ya da silmek) zorunda kalıyor. Unutulursa `npx tsc`
 * hata veriyor — yani "yayında ama ekranı boş" bir araç doğamıyor.
 */
export type PagedToolId = Exclude<Extract<Seed, { status: "live" }>, { ownHref: string }>["id"];

/** Adres kuralı tek yerde — bkz. dosya başındaki karar (2). */
function hrefOf(t: ToolSeed): string {
  return t.ownHref ?? `/araclar/${t.id}`;
}

export const TOOL_CATALOG: ToolEntry[] = SEEDS.map((t) => ({
  ...t,
  href: hrefOf(t),
  paged: t.status === "live" && !("ownHref" in t),
}));

export const TOOL_BY_ID = TOOL_CATALOG.reduce(
  (acc, t) => {
    acc[t.id] = t;
    return acc;
  },
  {} as Record<ToolId, ToolEntry>,
);

/** Yazılmış araçlar. */
export const LIVE_TOOLS = TOOL_CATALOG.filter((t) => t.status === "live");

/** Yazılmamış araçlar — dizinde sönük çıkıyorlar, sayfaları yok. */
export const PLANNED_TOOLS = TOOL_CATALOG.filter((t) => t.status === "planned");

/** app/araclar/[arac] rotasının ürettiği sayfalar. */
export const PAGED_TOOLS = TOOL_CATALOG.filter((t) => t.paged);

/** Menüdeki Araçlar panelinin kartları, aile sırasıyla. */
export const NAV_TOOLS = FAMILY_ORDER.flatMap((f) =>
  TOOL_CATALOG.filter((t) => t.nav && t.family === f),
);

/** Bir ailenin BÜTÜN araçları — dizin bunu gruplayarak basıyor, yazılmışı ve
 *  yazılmamışı bir arada. Yol haritasını ayrı bir bloğa almıyoruz: "bu ailede
 *  ne var" sorusunun cevabı, sırada bekleyeni de içeriyor. */
export function toolsOf(family: ToolFamily): ToolEntry[] {
  return TOOL_CATALOG.filter((t) => t.family === family);
}

/** Bir ailenin yalnızca yazılmış araçları. */
export function liveToolsOf(family: ToolFamily): ToolEntry[] {
  return LIVE_TOOLS.filter((t) => t.family === family);
}

/** Bir aracın kendi sayfasında gösterilen "diğer araçlar" şeridi: aynı ailenin
 *  yazılmış öteki araçları, aile boşsa yazılmış bütün araçlar. Sayfa dosyası
 *  bu seçimi kendi içinde yapmasın diye burada. */
export function siblingsOf(id: ToolId): ToolEntry[] {
  const self = TOOL_BY_ID[id];
  const family = LIVE_TOOLS.filter((t) => t.family === self.family && t.id !== id);
  return family.length > 0 ? family : LIVE_TOOLS.filter((t) => t.id !== id);
}

/** Planlanan aracın `source` alanı "YAZILMADI — " ile başlıyor; ekranda o önek
 *  görünmesin diye tek yerden kırpılıyor. */
export function whyPlanned(t: ToolEntry): string {
  return t.source.replace(/^YAZILMADI — /, "");
}
