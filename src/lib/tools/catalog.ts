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
  | "kurumlar-vergisi"
  | "bae-kdv"
  /* huni ortası — karar */
  | "uygunluk-testi"
  | "isim-ureteci"
  | "ingiltere-isim-sorgulama"
  | "ingiltere-sic-kodu";

/** Belgenin huni haritası (s.4). Menüdeki ve dizindeki gruplama bundan. */
export type ToolFamily = "hesaplayici" | "karar" | "sonrasi";

export type ToolStatus = "live" | "planned";

export const FAMILY_LABEL: Record<ToolFamily, { head: string; line: string }> = {
  hesaplayici: {
    head: "Hesaplayıcılar",
    line: "Bir değer giriyor, karşılığında bir sonuç alıyorsunuz.",
  },
  karar: {
    head: "Karar araçları",
    line: "Seçenekleri daraltır; kararı ve sonraki adımı siz verirsiniz.",
  },
  sonrasi: {
    head: "Kuruluş sonrası",
    line: "Kuruluş sonrasında kullanılanlar: tarih, takvim, liste.",
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
  /** Girdi SUNUCUMUZDAN geçiyorsa nereye gittiği. Yazılmamışsa araç tamamen
      tarayıcıda çalışıyor ve ToolShell "girdiğiniz hiçbir bilgi bize
      gelmiyor" diyebiliyor; yazılmışsa o cümle bu aracı ANMADAN kurulamıyor.
      11.09.2026'da eklendi: sitenin ilk sunucu rotasıyla (İngiltere isim
      sorgusu) o cümle ilk kez yanlış olacaktı.
        cumle · aracın kendi sayfasında, "Ne değil"in altında basılan tam cümle
        kisa  · kardeş şeridinde "o araç …" diye devam eden yüklem; öznesiz,
                küçük harfle başlıyor, noktasız */
  sunucu?: { cumle: string; kisa: string };
};

/* `href` ve `paged` türetiliyor; `ownHref` yalnızca sabit adresli araçta. */
type ToolSeed = Omit<ToolEntry, "href" | "paged"> & { ownHref?: string };

const SEEDS = [
  /* ============================================ 11.09.2026 · DEFTER DARALDI
     Müşteri menüdeki sekiz kartı gördü, üçünü işaret etti ("sitedeki de ss
     attığım 3'lüyü yapalım") ve kalanını kaldırttı: "diğerlerinden pek iş
     çıkmaz, şimdilik onları pek düşünmüyorum, hatta kaldır ordan kafamız
     karışmasın." Aynı mesajda araç listesinin ilk üç önerisini de onayladı
     ("yazdığın 1-2-3 fikirlerini yapalım").

     DEFTERDEN ÇIKAN YEDİ KALEM:
       planned · kktc-serbest-liman · free-zone-mainland · golden-visa-uygunluk
       live    · belge-listesi · yukumluluk-takvimi · oturum-sayaci ·
                 non-resident-uygunluk
     Yazılmış dördünün bileşenleri de silindi (DocChecklist · ObligationCalendar ·
     EntryCounter · UkNonResident). Müşteri "şimdilik" dedi: geri istenirse
     git'ten döner, commit numarası docs/durum.md'de.

     Menüden kaldırmak yetmezdi, defterden çıkarmak gerekti: yazılmış bir araç
     defterde kaldığı sürece her araç sayfasının "diğer araçlar" şeridinde
     (siblingsOf) ve /araclar dizininde görünmeye devam ederdi — yani müşteri
     kaldırttığı kartı yeni araçların altında tekrar görecekti.

     İKİ HESAPLAYICI TEK ARACA İNDİ. "BAE kurumlar vergisi" (yazılmış) ile
     "İngiltere kurumlar vergisi" (planned) müşterinin listesindeki 1 numaralı
     istekle birleşti: "tek araç sayfası ülke seçimiyle, kktc seçecek oraya
     göre, dubai seçecek oraya göre, ingiltere oraya göre." Ekrandaki karşılığı
     tek kart ve tek adres: /araclar/kurumlar-vergisi. İki eski adres hiç
     yayında olmadı (STATIC_LIVE'da yoktular), yani yönlendirme gerekmiyor.

     İKİ YENİ ARAÇ: İngiltere şirket ismi sorgulama ve İngiltere SIC kodu
     bulucu. İkisi de müşterinin "insanların işine yarayacak, siteye ziyaret
     çekecek" ölçütüne göre seçildi: ziyaretçiye siteyi okuyarak öğrenemeyeceği
     bir şey söylüyorlar (Companies House kaydı · 731 resmî faaliyet kodu). */

  /* ------------------------------------------------------- HESAPLAYICILAR */
  {
    id: "kurumlar-vergisi",
    status: "live",
    family: "hesaplayici",
    country: "hepsi",
    nav: true,
    title: "Kurumlar vergisi hesaplayıcı",
    accent: "hesaplayıcı",
    meta: "Dubai · İngiltere · KKTC",
    /* "Dilimleri ayrı ayrı hesaplanıyor" İngiltere için yanlıştı: orada oran
       kârın tamamına uygulanıyor, iki eşik arasında marjinal indirim devreye
       giriyor. KKTC'de de hesap yapılmıyor (araç ajanının raporu, 11.09.2026). */
    is: "Ülkeyi seçip vergiye tabi kârınızı yazıyorsunuz; araç o ülkenin kuralıyla vergiyi ve efektif oranı hesaplıyor. KKTC için hesap yapmıyor, nedenini yazıyor.",
    isNot: "Vergi beyanı ya da vergi görüşü değil. Araç, size ait olduğunu söylediğiniz kârı o ülkenin dilimlerine bölüyor; kârın vergiye tabi kısmının nasıl bulunduğu ayrı bir konu. Serbest bölge muafiyeti ve grup şirketi kuralları bu hesaba dahil değil.",
    source: "lib/tools/rates.ts · UAE_CT + UK_CT (SWAP:TOOL_RATES) + lib/countryContent.ts · dubai.tax / ingiltere.tax. KKTC için oran yayımlanmıyor (countryContent.ts).",
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
    /* SORU SAYISI BU İKİ SATIRDAN ÇIKARILDI. Eskiden "beş soru" yazıyorlardı;
       anket o sırada dokuz, bugün on bir soru. Aynı sayı sayfa metninde ve
       metadata'da da elle yazılıydı ve üçü üç farklı rakam söylüyordu.

       DOĞRUSU SAYIYI TÜRETMEK, ama BURADA DEĞİL: lib/fitTest.ts'i import
       etmek onu (91 KB) ve zincirini (countryContent 40 KB, afterSetup 17 KB,
       pricing) bu kayıt defterinin içinden çekerdi — defteri Nav.tsx ve
       Footer.tsx okuyor, ikisi de "use client" ve her sayfada basılıyor,
       yani bedeli tek bir sıfat için sitenin tamamına yayılırdı.

       Sayı, testin KENDİ sayfasında FIT_TOTAL / FIT_PARTS.length'ten
       türetiliyor (app/araclar/uygunluk-testi/page.tsx); orada fitTest zaten
       yükleniyor, ek maliyet sıfır. Burada ise sayı hiç söylenmiyor: bir daha
       eskiyemez. Bu iki satırın işi zaten aracın NE OLDUĞUNU söylemek, kaç
       soru sorduğunu değil. */
    meta: "Üç ülke · puanlı kısa liste",
    is: "Kısa bir ankete cevap veriyorsunuz; Dubai, İngiltere ve KKTC cevaplarınıza göre puanlanıp sıralanıyor ve ikinciyle aradaki fark da yazıyor.",
    isNot: "Tek bir öneri vermiyor ve yerinize karar vermiyor: çıktı bir kısa liste. Puan ağırlıkları da henüz teyit edilmedi, o yüzden sonuç ekranı hüküm kurmuyor: farkın tek cevapla dönüp dönmediğini söylüyor.",
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
    id: "ingiltere-isim-sorgulama",
    status: "live",
    family: "karar",
    country: "ingiltere",
    nav: true,
    title: "İngiltere şirket ismi sorgulama",
    accent: "ismi sorgulama",
    meta: "Companies House kaydında benzer isimler",
    is: "Düşündüğünüz ismi yazıyorsunuz; araç Companies House'un resmî kaydında aynı ya da çok benzer isimle kayıtlı şirket olup olmadığına bakıyor.",
    isNot: "İsmin tescil edilebileceğini garanti etmiyor. Kısıtlı ve hassas kelimeler, marka hakları ve Companies House'un kendi değerlendirmesi ayrı bir aşama; son sözü başvuru sırasında Companies House söyler.",
    source: "Companies House Public Data API · search/companies (sunucu rotası üzerinden; anahtar ortam değişkeninde, istemciye inmiyor)",
    sunucu: {
      cumle:
        "Yazdığınız isim, siz düğmeye bastığınızda sunucumuz üzerinden Companies House'a gönderiliyor. Sunucumuz ismi kaydetmiyor ve saklamıyor; Companies House sizin değil sunucumuzun adresini görüyor.",
      kisa: "yazdığınız ismi sunucumuz üzerinden Companies House'a soruyor ve saklamıyor",
    },
  },
  {
    id: "ingiltere-sic-kodu",
    status: "live",
    family: "karar",
    country: "ingiltere",
    nav: true,
    title: "İngiltere SIC kodu bulucu",
    accent: "SIC kodu bulucu",
    meta: "İngiltere · resmî faaliyet kodları",
    is: "Şirketinizin ne iş yapacağını yazıyorsunuz; Companies House'un kullandığı SIC 2007 listesinden eşleşen faaliyet kodları çıkıyor.",
    isNot: "Kodu sizin yerinize seçmiyor: hangi kodun faaliyetinizi en iyi tarif ettiğine siz karar veriyorsunuz. Resmî tanımlar İngilizce; Türkçe arama bir çeviri yardımı, resmî çeviri değil.",
    source: "Companies House · SIC 2007 kısaltılmış liste (CSV, 731 kod) + ONS açıklama notları + TÜİK NACE Rev.2 bölüm adları — lib/tools/sic.ts",
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
