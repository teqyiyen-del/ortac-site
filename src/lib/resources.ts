import { COUNTRY_NAME, COUNTRY_ORDER, FACTS, type CountrySlug } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { AFTER_SETUP } from "@/lib/afterSetup";
import { BLOG_POSTS, formatDate, postsForCountry, postsOfKind } from "@/lib/blog";

/* ============================================================================
   KAYNAKLAR — dört türün kayıt defteri
   ============================================================================

   NEDEN BU DOSYA VAR

   Müşterinin teşhisi tek cümleydi: "kaynaklar kısmında aslında hepsi aynı yere
   çıkıyor biraz." Doğruydu. Eskiden /kaynaklar tek bir kart ızgarasıydı, altı
   kartın altısı da `/kaynaklar` adresine bağlanıyordu; ana sayfadaki yayın
   bölümü de, navbar paneli de aynı yere iniyordu. Yani sitede dört ayrı iş
   yapan dört ayrı içerik türü vardı ama tek bir yüzeyleri vardı.

   Dört tür ve HER BİRİNİN İŞİ — ayrımın tamamı bu dört satırda:

     blog     · Bir konuyu açan yazı. Ziyaretçi okumaya gelir.
     rehber   · Bir ÜLKEDE ne yapılabileceğinin ve nasıl yapıldığının yolu.
                Ziyaretçi bir sonraki adımını bulmaya gelir.
     gelisme  · Tarihli kayıt: neyin ne zaman değiştiği. Ziyaretçi (ve arama
                motoru) sitenin yaşadığını buradan görür.
     ekitap   · İndirilen dosya. Ziyaretçi bir şey almaya gelir.

   Dördü ayrı sayfada ve ayrı görsel ritimde yaşıyor. Dördünü aynı kart
   ızgarasında göstermek, müşterinin şikâyetini sunumda sürdürmek olurdu.

   ---------------------------------------------------------------------------
   İÇERİK KURALI — BU DOSYANIN ASIL İŞİ

   Bugün bu bölümün büyük kısmı BOŞ. Bu normal ve gizlenmiyor. Boş bir bölümü
   dolu göstermenin bedeli, bu firma için bir tasarım kusurundan çok daha
   ağır: uydurma bir mevzuat değişikliği yayınlamak yanlış bilgi olur.

   O yüzden şemalar boş kaydı MÜMKÜN KILMAYACAK şekilde yazıldı:

   · Bir `Update` (gelişme) kaydının `source` alanı ZORUNLU ve resmî kaynağın
     adı + adresi. Kaynağı olmayan bir kayıt tip denetiminden geçmiyor, yani
     "duyduk ki" türünden bir satır yayına giremiyor.
   · Bir `Ebook` kaydının `file` alanı ZORUNLU ve public/ altındaki gerçek
     dosyayı gösteriyor. Dosya yoksa kayıt da yok — indirilemeyen bir e-kitap
     listelenemiyor.
   · Teyit edilmemiş yer tutucular ayrı dizilerde (`DRAFT_*`) duruyor ve
     TİPLERİ FARKLI. Yayına almak için eksik alanı (kaynak bağlantısı, dosya)
     doldurup kaydı `Update`/`Ebook` olarak baştan yazmaktan başka yol yok.

   ---------------------------------------------------------------------------
   YER TUTUCULAR NEDEN ARTIK EKRANDA

   Müşteri tasarımı görmek istedi ve yer tutucuya açıkça izin verdi: "şimdilik
   bok bırakmamak adına placeholder bir şeylerde yazmanı istiyorum ama." Yani
   `DRAFT_*` dizileri artık basılıyor — ama koruma kalkmadı, YER DEĞİŞTİRDİ:

   1. Tip ayrımı duruyor. `DraftUpdate`ın `source` alanı YOK; `UPDATES`
      dizisine kopyalanamaz, JSON-LD'ye giremez.
   2. Ekranda işaretli. Her yer tutucu kartın üstünde "örnek kayıt · içerik
      onay bekliyor" şeridi var (bkz. components/kaynaklar/KynTimeline.tsx ve
      app/e-kitaplar/page.tsx). Sayfanın başında da bir uyarı paneli duruyor.
   3. İÇERİKTE İDDİA YOK. Yer tutucularda uydurma oran, tutar, eşik, madde
      numarası ya da resmî kurum kararı bulunmuyor — yalnızca hangi KONUDA
      kayıt beklendiği ve neyin teyit edilmediği yazıyor. Kart gövdesindeki
      cümleler bileşende sabit; kayıt başına yazılmıyor ki bir gün biri
      "burası zaten yazılmış" diye yayına almasın.

   Sebep hukuki: bu site müşteriye gösteriliyor ve uydurma bir mevzuat
   değişikliği gerçek sanılırsa bedelini firma öder. Amaç tasarımı göstermek,
   ziyaretçiyi yanıltmak değil.

   ---------------------------------------------------------------------------
   REHBERLER BU TURDA BLOGUN İÇİNE TAŞINDI

   Rehber artık ayrı bir içerik deposu değil, bir BLOG TÜRÜ: lib/blog.ts'teki
   `BlogPost.kind === "rehber"`. Adresi de /rehberler değil /blog/rehberler
   (eski adres 308 ile yönleniyor). Bu dosyada iki sonucu var:

   1. `RESOURCE_KINDS.rehber.href` yeni adresi gösteriyor — bağlantılar
      yönlendirme zincirine girmiyor.
   2. `countOf("rehber")` artık yayınlanmış rehberleri sayıyor
      (`postsOfKind("rehber")`), ülke sayısını değil. Gerekçe countOf'un
      başında.

   HUB'DA KAPI KALDI — KARAR VE GEREKÇESİ
   Rehberin blogun içine taşınması ADRESİ değiştirdi, ZİYARETÇİNİN İŞİNİ
   değiştirmedi. Bu hub'ın var olma sebebi müşterinin tek cümlesiydi:
   "kaynaklar kısmında aslında hepsi aynı yere çıkıyor." Hub'ın işi türleri
   birbirinden ayırmak; "bir konu okumak" ile "bir ülkede yolumu bulmak" hâlâ
   iki ayrı iş ve ikincisi için gelen kişiyi önce /blog'a gönderip orada bir
   filtre aratmak, tam da kaldırdığımız fazladan adımı geri koymak olurdu.
   Kapı gerçek bir sayfaya iniyor (/blog/rehberler, kendi <title>'ı var), yani
   ayrım sözde kalmıyor.

   Bedeli ödendi: kapı artık "3 ülke" demiyor. Yayınlanmış rehber olmadığı
   için "Hazırlanıyor" diyor — bu dosyanın gelişme ve e-kitap tarafındaki
   kuralının aynısı.

   ---------------------------------------------------------------------------
   AŞAĞIDAKİ `GUIDES` MODELİ ARTIK SAYFA BASMIYOR

   Ülke rehberini "yol" olarak kuran model (bölümler ülkenin verisinden türer,
   her `href` gerçek bir sayfaya ya da çapaya iner) aşağıda duruyor ama artık
   yayında bir sayfası yok: /blog/rehberler kendi listesini blog kayıtlarından
   kuruyor. Silinmedi çünkü components/ContentHub.tsx hâlâ import ediyor.
   Ayrıntı: GUIDES'ın kendi başlığında.
   ========================================================================= */

/* ------------------------------------------------------------------ türler */

export type ResourceKind = "blog" | "rehber" | "gelisme" | "ekitap";

export type KindMeta = {
  id: ResourceKind;
  /** menüde ve başlıklarda görünen ad */
  label: string;
  /** türün kendi sayfası — dördü de ayrı adres, ayrı ritim */
  href: string;
  /** türün İŞİ: hub kapısındaki tek satır */
  job: string;
  /**
   * Türün ne OLMADIĞI. Dört tür birbirine karışmasın diye her birinin bunu
   * söylemesi gerekiyor: sitede "araçlar" bölümü de aynı kuralla yazıldı
   * (bkz. lib/tools/catalog.ts · isNot).
   */
  isNot: string;
  /** boşken basılan dürüst başlık */
  emptyTitle: string;
  /** boşken basılan açıklama: neden boş ve buraya ne girecek */
  emptyLine: string;
};

export const RESOURCE_KINDS: Record<ResourceKind, KindMeta> = {
  blog: {
    id: "blog",
    label: "Blog",
    href: "/blog",
    job: "Bir konuyu baştan sona açan yazılar; her yazıda rakamın nereden geldiği yazılı.",
    isNot: "Haber akışı değil. Bir yazı ancak kaynağı gösterilebiliyorsa yayınlanıyor.",
    emptyTitle: "Henüz yayınlanmış yazı yok.",
    emptyLine:
      "İlk yazılar iç kontrolden geçtikçe burada tarih sırasıyla listelenecek. O zamana kadar buraya doldurulmuş bir liste koymuyoruz.",
  },
  rehber: {
    id: "rehber",
    label: "Ülke rehberleri",
    /* Rehberler bu turda blogun altına taşındı: /rehberler → /blog/rehberler.
       Adres tek yerde yazılı, o yüzden taşıma bu satırla bitiyor. */
    href: "/blog/rehberler",
    job: "Bir ülkede ne yapılabileceğinin ve nasıl yapıldığının adım adım yolu.",
    isNot: "Ülke reklamı değil. Her rehber o ülkenin dürüst kısıtını da yazıyor.",
    emptyTitle: "Rehber hazırlanıyor.",
    emptyLine:
      "Rehberler artık blogun bir türü ve kendi filtresinde listeleniyor. Yayınlanmış rehber henüz yok; hazırlananlar /blog/rehberler'de ayrı başlık altında duruyor.",
  },
  gelisme: {
    id: "gelisme",
    label: "Gelişmeler",
    href: "/gelismeler",
    job: "Neyin ne zaman değiştiği; tarih, ülke ve resmî kaynak bağlantısıyla.",
    isNot:
      "Hukuki görüş değil ve tam liste iddiası taşımıyor. Kaydın kaynağı resmî otoritenin kendi duyurusudur.",
    emptyTitle: "Henüz yayınlanmış bir gelişme yok.",
    emptyLine:
      "Buraya bir kayıt ancak resmî kaynağına bağlanabildiğinde giriyor: tarih, hangi ülke, kimi ilgilendiriyor ve duyurunun kendisi. Teyit edilmemiş bir mevzuat değişikliği yayınlamıyoruz; zaman çizelgesinde görünen örnek kayıtlar da tek tek işaretli.",
  },
  ekitap: {
    id: "ekitap",
    label: "E-kitaplar",
    href: "/e-kitaplar",
    job: "İndirip yanınızda götürdüğünüz uzun içerik.",
    isNot: "Form karşılığı değil: indirmek için bilgi istemiyoruz.",
    emptyTitle: "Henüz indirilebilir bir dosya yok.",
    emptyLine:
      "Bir e-kitap ancak dosyası hazır olduğunda indirilebilir oluyor. Rafta görünen örnek kayıtlar işaretli ve indirme vaadi taşımıyor.",
  },
};

/** Hub'daki kapı sırası. Ziyaretçinin muhtemel sırası: oku → yolunu bul →
    güncelini gör → indir. */
export const KIND_ORDER: ResourceKind[] = ["blog", "rehber", "gelisme", "ekitap"];

/* ============================================================================
   1 · GELİŞMELER — tarihli akış
   ========================================================================= */

/** Kaydın ne tür bir değişiklik olduğu; akışta rozet olarak görünüyor. */
export type UpdateChannel = "mevzuat" | "uygulama" | "tarih";

export const UPDATE_CHANNEL_LABEL: Record<UpdateChannel, string> = {
  mevzuat: "Mevzuat",
  uygulama: "Uygulama",
  tarih: "Takvim",
};

/**
 * Bir gelişme kaydı.
 *
 * `source` bilerek opsiyonel DEĞİL. Bu alan bu bölümün tek güvencesi: bir
 * satır ancak resmî otoritenin kendi duyurusuna bağlanabiliyorsa yayınlanıyor.
 * Opsiyonel olsaydı, kaynağı olmayan bir satır eklemek bir alanı boş
 * bırakmak kadar kolay olurdu.
 */
export type Update = {
  id: string;
  /** ISO (YYYY-AA-GG) — duyurunun/değişikliğin tarihi, yazının değil */
  date: string;
  /** yürürlük tarihi duyuru tarihinden farklıysa; değilse boş bırakılır */
  effectiveFrom?: string;
  country: CountrySlug | "genel";
  channel: UpdateChannel;
  title: string;
  /** iki cümleyi geçmeyen özet — akışta tam metin okunmuyor */
  summary: string;
  /** kimi ilgilendiriyor: "BAE'de serbest bölge şirketi olanlar" gibi */
  who: string;
  /** varsa yapılması gereken tek şey */
  action?: string;
  /** ZORUNLU · resmî kaynak. Kaynağı olmayan kayıt yayınlanmaz. */
  source: { name: string; url: string };
  /** sitede konuyla ilgili sayfa — varsa akıştan oraya çıkış */
  related?: { label: string; href: string };
};

/**
 * Yayındaki gelişmeler.
 *
 * BİLEREK BOŞ. Depoda teyit edilmiş, kaynağına bağlanabilen tek bir mevzuat
 * kaydı yok ve uydurmak bu firma için gerçek bir risk. Sayfa boş listeyi
 * gizlemiyor; ne zaman kayıt gireceğini açıkça yazıyor (bkz. RESOURCE_KINDS).
 */
export const UPDATES: Update[] = [];

/**
 * SWAP:LEGISLATION — teyit edilmemiş yer tutucular.
 *
 * TİPİ `Update` DEĞİL ve bu kasıtlı: `source` alanı olmadığı için UPDATES
 * dizisine kopyalanamıyorlar, JSON-LD'ye giremiyorlar. Yayına almanın tek
 * yolu resmî duyuruyu bulup kaydı `Update` olarak baştan yazmak.
 *
 * NE TAŞIYORLAR: yalnızca hangi KONUDA kayıt beklendiği (`topic`) ve neyin
 * teyit edilmediği (`missing`). Kartın başlığı, özeti ve "kimi ilgilendiriyor"
 * satırı burada YAZILMIYOR — bileşende sabit ve her kartta aynı. Sebep:
 * kayıt başına yazılmış bir özet bir gün "burası zaten hazır" diye okunur ve
 * teyitsiz bir cümle yayına girer. Sabit metin bunu imkânsız kılıyor.
 *
 * Tarihler geçmişte ve gerçekçi; eksenin nasıl aktığını göstermek için var,
 * bir duyuru tarihi iddiası taşımıyorlar (kartta da böyle yazıyor).
 *
 * İlk üç kayıt eskiden components/home/ToolsResources.tsx'te "güncel mevzuat"
 * diye basılan üç satırdı; konu başlığı olarak muhtemelen doğrular ve içeriği
 * hazırlayacak kişinin işine yaradıkları için silinmediler.
 */
export type DraftUpdate = {
  id: string;
  /** ISO (YYYY-AA-GG) — eksendeki YERİ belirliyor, bir duyuru tarihi değil */
  date: string;
  country: CountrySlug | "genel";
  channel: UpdateChannel;
  /** beklenen konu başlığı — iddia değil, "buraya şu konuda kayıt girecek" */
  topic: string;
  /** kaydın neden yayında olmadığı; kartta olduğu gibi görünüyor */
  missing: string;
};

export const DRAFT_UPDATES: DraftUpdate[] = [
  {
    id: "d-genel-takvim",
    date: "2026-07-21",
    country: "genel",
    channel: "tarih",
    topic: "Üç ülkede beyan ve bildirim takvimi",
    missing: "hangi takvimin hangi ülkede geçerli olduğu teyit edilmedi",
  },
  {
    id: "d-dubai-kv",
    date: "2026-07-12",
    country: "dubai",
    channel: "mevzuat",
    topic: "Kurumlar vergisi beyan takvimi",
    missing: "kaynak duyurusu ve hangi mükellef grubunu kapsadığı teyit edilmedi",
  },
  {
    id: "d-dubai-goaml",
    date: "2026-07-03",
    country: "dubai",
    channel: "uygulama",
    topic: "goAML kayıt yükümlülüğü",
    missing: "yükümlülüğün kapsamı ve tarihi teyit edilmedi",
  },
  {
    id: "d-dubai-kdv",
    date: "2026-06-24",
    country: "dubai",
    channel: "mevzuat",
    topic: "KDV eşiği ve kayıt zorunluluğu",
    missing: "eşik tutarı ve yürürlük tarihi teyit edilmedi",
  },
  {
    id: "d-uk-kimlik",
    date: "2026-06-11",
    country: "ingiltere",
    channel: "uygulama",
    topic: "Companies House kimlik doğrulama tarafı",
    missing: "kimlerin kapsama girdiği ve takvimi teyit edilmedi",
  },
  {
    id: "d-genel-sonrasi",
    date: "2026-05-27",
    country: "genel",
    channel: "uygulama",
    topic: "Kuruluş sonrası yükümlülük akışı",
    missing: "hangi kalemin hangi ülkede ne zaman doğduğu teyit edilmedi",
  },
  {
    id: "d-dubai-lisans",
    date: "2026-05-08",
    country: "dubai",
    channel: "tarih",
    topic: "Serbest bölge lisans yenileme dönemi",
    missing: "yenileme takvimi ve serbest bölgeye göre farkları teyit edilmedi",
  },
  {
    id: "d-uk-adres",
    date: "2026-04-16",
    country: "ingiltere",
    channel: "uygulama",
    topic: "Kayıtlı adres ve bildirim tarafı",
    missing: "yükümlülüğün kapsamı teyit edilmedi",
  },
  {
    id: "d-kktc-tescil",
    date: "2026-04-02",
    country: "kktc",
    channel: "mevzuat",
    topic: "Yerel tescil ve şirket kayıt tarafı",
    missing: "kaynak duyurusu ve kapsamı teyit edilmedi",
  },
  {
    id: "d-kktc-banka",
    date: "2026-03-19",
    country: "kktc",
    channel: "uygulama",
    topic: "Banka hesabı açılış süreci",
    missing: "bankaya göre değişen adımlar teyit edilmedi",
  },
  {
    id: "d-uk-donem",
    date: "2026-02-25",
    country: "ingiltere",
    channel: "tarih",
    topic: "Hesap dönemi bildirim takvimi",
    missing: "takvimin hangi şirket tipinde nasıl işlediği teyit edilmedi",
  },
  {
    id: "d-kktc-beyan",
    date: "2026-02-06",
    country: "kktc",
    channel: "tarih",
    topic: "Yıllık beyan dönemi",
    missing: "dönem tarihleri teyit edilmedi",
  },
];

/** En yeni üstte. Akışın tek sıralama kuralı. */
export function sortedUpdates(): Update[] {
  return [...UPDATES].sort((a, b) => b.date.localeCompare(a.date));
}

/** Yer tutucularda da aynı kural: en yeni üstte. */
export function sortedDraftUpdates(): DraftUpdate[] {
  return [...DRAFT_UPDATES].sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Akış ay başlıklarıyla bölünüyor: tarih ekseni ancak gruplandığında akış
 * gibi okunuyor, yoksa tarihli bir liste oluyor. Boş listede boş dizi döner
 * ve sayfa hiç başlık basmaz.
 */
export function updatesByMonth(): { key: string; label: string; items: Update[] }[] {
  const out: { key: string; label: string; items: Update[] }[] = [];
  for (const u of sortedUpdates()) {
    const key = u.date.slice(0, 7);
    const last = out[out.length - 1];
    if (last?.key === key) last.items.push(u);
    else out.push({ key, label: monthLabel(key), items: [u] });
  }
  return out;
}

/* ---------------------------------------------------- zaman çizelgesi satırı

   Çizelgeyi basan bileşen İSTEMCİ tarafında (ülke seçimi durum tutuyor). Ona
   `@/lib/resources`ı import ettirmek bu dosyanın tamamını — GUIDES üzerinden
   countryContent, afterSetup ve blog dahil — istemci paketine sokardı. O
   yüzden satırın ekranda görünen HER PARÇASI sunucuda hazırlanıp prop olarak
   geçiyor; bileşen yalnızca süzüyor ve grupluyor.

   `draft` alanı satırın tek ayrımı: doğruysa kart yer tutucu şeridiyle
   basılıyor ve `source` alanı hiç olmuyor. */
export type TimelineRow = {
  id: string;
  /** <time dateTime> için ISO */
  date: string;
  /** eksendeki kısa etiket: "12 Tem" */
  dayLabel: string;
  /** kart içindeki tam tarih: "12 Temmuz 2026" */
  dateLabel: string;
  monthKey: string;
  monthLabel: string;
  country: CountrySlug | "genel";
  countryLabel: string;
  /**
   * Satırın hangi seçimlerde görüneceği — SUNUCUDA hesaplanıyor.
   *
   * Süzme kuralı ("genel" kayıt her ülkede görünür) tek yerde kalsın diye:
   * istemci bileşeni kuralı tekrar yazmıyor, yalnızca `shownIn.includes(seçim)`
   * diyor. Kural değişirse matchesFilter'ı düzeltmek yetiyor.
   */
  shownIn: UpdateFilter[];
  /** rozetin okunan adı */
  channelLabel: string;
  /** rozetin rengi için ham değer (data-tone) */
  channel: UpdateChannel;
  draft: boolean;
  title: string;
  summary: string;
  who: string;
  effectiveLabel?: string;
  effectiveFrom?: string;
  action?: string;
  /** yalnızca yayındaki kayıtta dolu — yer tutucuda alan hiç yok */
  source?: { name: string; url: string };
  related?: { label: string; href: string };
  /** yalnızca yer tutucuda: neyin teyit edilmediği */
  missing?: string;
};

/**
 * Yer tutucu kartların DEĞİŞMEYEN metni.
 *
 * Kayıt başına yazılmıyor (bkz. DRAFT_UPDATES başlığı): on iki kartın on
 * ikisinde aynı cümleler duruyor ve bu bilinçli — tekrar, listenin şablon
 * olduğunu metni okumadan önce gösteriyor.
 */
export const DRAFT_UPDATE_COPY = {
  badge: "Örnek kayıt · içerik onay bekliyor",
  summary:
    "Bu kartın metni yer tutucudur: kaydın özeti, kimi ilgilendirdiği ve varsa yapılması gereken buraya yazılacak. Şu an gösterilen hiçbir şey teyit edilmiş bir mevzuat değişikliği değil.",
  who: "Yer tutucu — kaydın kimi ilgilendirdiği buraya yazılacak.",
  /** tarihin ne olduğunu/olmadığını söyleyen satır */
  dateNote: "Tarih yerleşim içindir, bir duyuru tarihi değildir.",
  /** ana sayfa dizininde kullanılan kısa hâl — orada iki satır yer var */
  feedLine: "Örnek kayıt: bu konuda bir gelişme girildiğinde burada görünecek.",
} as const;

/** Yayındaki kayıt → çizelge satırı. */
function rowFromUpdate(u: Update): TimelineRow {
  return {
    id: u.id,
    date: u.date,
    dayLabel: shortDate(u.date),
    dateLabel: formatDate(u.date),
    monthKey: u.date.slice(0, 7),
    monthLabel: monthLabel(u.date.slice(0, 7)),
    country: u.country,
    countryLabel: countryLabel(u.country),
    shownIn: filtersFor(u.country),
    channelLabel: UPDATE_CHANNEL_LABEL[u.channel],
    channel: u.channel,
    draft: false,
    title: u.title,
    summary: u.summary,
    who: u.who,
    effectiveFrom: u.effectiveFrom,
    effectiveLabel: u.effectiveFrom ? formatDate(u.effectiveFrom) : undefined,
    action: u.action,
    source: u.source,
    related: u.related,
  };
}

/** Yer tutucu → çizelge satırı. `source` alanı BİLEREK yazılmıyor. */
function rowFromDraft(d: DraftUpdate): TimelineRow {
  return {
    id: d.id,
    date: d.date,
    dayLabel: shortDate(d.date),
    dateLabel: formatDate(d.date),
    monthKey: d.date.slice(0, 7),
    monthLabel: monthLabel(d.date.slice(0, 7)),
    country: d.country,
    countryLabel: countryLabel(d.country),
    shownIn: filtersFor(d.country),
    channelLabel: UPDATE_CHANNEL_LABEL[d.channel],
    channel: d.channel,
    draft: true,
    /* Başlık yapısal: "Örnek:" öneki kartın ne olduğunu, konu başlığı da
       buraya ne gireceğini söylüyor. */
    title: `Örnek: ${d.topic}`,
    summary: DRAFT_UPDATE_COPY.summary,
    who: DRAFT_UPDATE_COPY.who,
    missing: d.missing,
  };
}

/**
 * Çizelgenin tamamı: yayındakiler + yer tutucular, en yeni üstte.
 *
 * İkisi aynı listede duruyor çünkü ziyaretçinin göreceği şey tek bir eksen;
 * ayrım kartın kendisinde yapılıyor, listeyi ikiye bölerek değil. Yayına ilk
 * gerçek kayıt girdiğinde o kart yer tutucuların arasına tarihine göre
 * oturuyor ve tek farkı işaretinin olmaması oluyor.
 */
export function timelineRows(): TimelineRow[] {
  return [...UPDATES.map(rowFromUpdate), ...DRAFT_UPDATES.map(rowFromDraft)].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

/* ============================================================================
   2 · E-KİTAPLAR
   ========================================================================= */

/**
 * İndirilebilir dosya.
 *
 * `file` zorunlu ve public/ altındaki gerçek yolu gösteriyor. `pages` ve
 * `sizeMb` de zorunlu: ikisi de dosyanın kendisinden okunan bilgiler, yani
 * dosya varsa bilinirler. Dosya yoksa kayıt yazılamıyor.
 */
export type Ebook = {
  id: string;
  title: string;
  summary: string;
  country: CountrySlug | "genel";
  /** public/ altındaki yol, örn. "/kaynaklar/dubai-kurulus-rehberi.pdf" */
  file: string;
  format: "PDF";
  pages: number;
  sizeMb: number;
  /** dosyanın kendi güncellenme tarihi (ISO) */
  updatedAt: string;
};

/**
 * Yayındaki e-kitaplar.
 *
 * BİLEREK BOŞ. `public/` altında tek bir PDF yok — depo kontrol edildi. Üç
 * "rehber" kaydı sitede üç yerde birden listeleniyordu (ana sayfa, navbar,
 * /kaynaklar) ve üçü de indirilemiyordu: tıklayan ziyaretçi dosya yerine
 * başka bir sayfaya gidiyordu.
 */
export const EBOOKS: Ebook[] = [];

/**
 * SWAP:EBOOK_FILES — dosyası olmayan yer tutucular.
 *
 * Müşterinin isteği: "e kitaplar tarafınıda biraz placeholder bir şeyler yapıp
 * içeriğini tasarla en azından. indirilebilir kaynakları bi listele sadece
 * tıklayınca bir şey inmicek o kadar." Raf artık bu diziden basılıyor.
 *
 * TİPİ `Ebook` DEĞİL: `file`, `sizeMb` ve `updatedAt` alanları YOK. Yani
 * EBOOKS'a kopyalanamıyor, JSON-LD'ye `DigitalDocument` olarak giremiyor ve
 * `download` niteliğiyle bir bağlantıya bağlanamıyor — tıklanınca dosya
 * indiren tek işaretleme o ve bu kayıtlarda kurulamıyor.
 *
 * `plannedPages` PLANLANAN uzunluk, ölçülmüş değil; ekranda da "planlanan
 * ~N sayfa" diye yazıyor. Dosya olmadan sayfa sayısı ölçülemez, o yüzden
 * kesin bir sayı yazmak uydurma olurdu.
 *
 * `insteadFor` bugün gerçekten işe yarayan yer: dosya hazır olmadığı için
 * ziyaretçiyi eli boş bırakmamak lazım ve aynı bilgi sitede zaten duruyor.
 * SmartLink'ten geçiyor, yani dolaşıma kapalı adres sönük çıkıyor.
 */
export type DraftEbook = {
  id: string;
  title: string;
  /** dosyanın KAPSAMI — planlanan içerik, yayınlanmış bir iddia değil */
  scope: string;
  country: CountrySlug | "genel";
  format: "PDF";
  /** planlanan uzunluk; ekranda "~" ile ve "planlanan" diyerek basılıyor */
  plannedPages: number;
  /** aynı bilginin sitede bugün duran hâli */
  insteadFor: { label: string; href: string };
  /**
   * ISO — kaydın TARİHLİ AKIŞTAKİ yeri (ana sayfa dizini). Bir yayın tarihi
   * değil; `Ebook.updatedAt` gibi dosyadan okunmuş bir bilgi de değil, çünkü
   * dosya yok. Ayrı isimde duruyor ki `Ebook`e kopyalanınca yanlış alana
   * düşmesin.
   */
  addedAt: string;
};

export const DRAFT_EBOOKS: DraftEbook[] = [
  {
    id: "de-dubai",
    title: "Dubai kuruluş rehberi",
    scope:
      "Yapı seçimi, kuruluş adımları, evrak listesi ve kuruluş sonrası yükümlülükler — sitede bugün ayrı bölümlerde duran içeriğin tek dosyada toplanmış hâli.",
    country: "dubai",
    format: "PDF",
    plannedPages: 32,
    insteadFor: { label: "Dubai sayfası", href: "/dubai" },
    addedAt: "2026-07-18",
  },
  {
    id: "de-ingiltere",
    title: "İngiltere Ltd el kitabı",
    scope:
      "Limited şirketin kuruluş akışı, kayıtlı adres tarafı ve kuruluştan sonra tekrar eden kalemler.",
    country: "ingiltere",
    format: "PDF",
    plannedPages: 24,
    insteadFor: { label: "Ülke karşılaştırması", href: "/ulkeler" },
    addedAt: "2026-06-30",
  },
  {
    id: "de-kktc",
    title: "KKTC başlangıç rehberi",
    scope: "Yerel tescil akışı, banka tarafı ve kuruluş sonrası işleyiş.",
    country: "kktc",
    format: "PDF",
    plannedPages: 18,
    insteadFor: { label: "Ülke karşılaştırması", href: "/ulkeler" },
    addedAt: "2026-05-14",
  },
  {
    id: "de-genel",
    title: "Üç ülke karşılaştırma defteri",
    scope:
      "Dubai, İngiltere ve KKTC'nin aynı ölçütlerle yan yana konduğu tablo; her ülkenin dürüst kısıtı da aynı sayfada.",
    country: "genel",
    format: "PDF",
    plannedPages: 12,
    insteadFor: { label: "Ülke karşılaştırması", href: "/ulkeler" },
    addedAt: "2026-04-24",
  },
];

/** Yer tutucu e-kitap kartlarının DEĞİŞMEYEN metni — sebep DRAFT_UPDATES'teki
    ile aynı: kayıt başına yazılmış bir cümle bir gün "hazır" sanılır. */
export const DRAFT_EBOOK_COPY = {
  badge: "Örnek kayıt · dosya hazır değil",
  /** indirme düğmesinin yerine geçen açılır satırın başlığı */
  summary: "Dosya hazır değil",
  /** açıldığında görünen açıklama */
  detail:
    "Bu kayıt rafta tasarımı göstermek için duruyor; karşılığında bir dosya yok, o yüzden tıklamak bir indirme başlatmıyor. Dosya hazırlandığında aynı yerde PDF bağlantısı olacak ve indirmek için bilgi istenmeyecek.",
  /** ana sayfa dizininde kullanılan kısa hâl */
  feedLine: "Örnek kayıt: dosya hazırlandığında e-kitaplar sayfasından inecek.",
} as const;

/** En yeni üstte. */
export function sortedEbooks(): Ebook[] {
  return [...EBOOKS].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

/* ============================================================================
   3 · ÜLKE REHBERLERİ — gerçek adreslerden kurulu yol
   ========================================================================= */

export type GuideChapter = {
  /** bölümün adı — ziyaretçinin sorusu, bizim başlığımız değil */
  q: string;
  /** tek satır özet; mümkün olan her yerde ülke verisinden türüyor */
  line: string;
  /** GERÇEK adres: sayfa ya da o sayfadaki çapa. Uydurma adres yok. */
  href: string;
};

export type Guide = {
  country: CountrySlug;
  /** /rehberler sayfasındaki çapa */
  anchor: string;
  name: string;
  /** ülke sayfasının kendi tanıtım satırı */
  tagline: string;
  lead: string;
  /** künye şeridi: üç ölçü, hepsi brand.ts FACTS'ten */
  facts: { k: string; v: string }[];
  /** ülkenin dürüst kısıtı — rehberde de saklanmıyor */
  limit: string;
  chapters: GuideChapter[];
  /** ülke sayfası */
  href: string;
  /** bu ülkeyle ilgili yayınlanmış yazılar (blog.ts'ten) */
  posts: { slug: string; title: string; summary: string; publishedAt: string }[];
};

/**
 * Bir ülkenin yolu.
 *
 * Bölümler ülkenin kendi verisinden türüyor, elle yazılmıyor. İki bölüm
 * koşullu:
 *   · "yapı seçimi" yalnızca countryContent'te `structures` doluysa (bugün
 *     sadece Dubai) — ülke sayfasında o bölüm de koşullu basılıyor, yani
 *     olmayan bir çapaya bağlanmıyoruz.
 *   · "kuruluş sonrası" yalnızca afterSetup.ts o ülkeyi taşıyorsa (bugün
 *     sadece Dubai).
 * Kalan bölümlerin hepsinin karşılığı üç ülkede de var (ulke/[slug]/page.tsx).
 */
function buildGuide(country: CountrySlug): Guide {
  const c = COUNTRY_CONTENT[country];
  const f = FACTS[country];
  const base = `/${country}`;
  const after = AFTER_SETUP[country];

  const chapters: GuideChapter[] = [
    {
      q: "Bu ülke kimin işine yarıyor?",
      line: f.forWhom,
      href: base,
    },
  ];

  /* Yapı seçimi — ülke sayfasında `c.structures &&` ile basılıyor (bkz.
     app/ulke/[slug]/page.tsx). Veri yoksa çapa da yok. */
  if (c.structures) {
    chapters.push({
      q: "Hangi yapıyı seçmeliyim?",
      line: c.structures.rule,
      href: `${base}#yapi`,
    });
  }

  chapters.push(
    {
      q: "Kuruluş ne kadar tutuyor?",
      line: `${f.fromLabel}'dan başlıyor; yapı, faaliyet ve ofis tipi tutarı değiştiriyor.`,
      href: `${base}#fiyat`,
    },
    {
      q: "Süreç nasıl işliyor?",
      /* Adım sayısı veriden: bir adım eklendiğinde bu satır kendiliğinden
         doğru kalıyor. */
      line: `${c.steps.length} adım, tipik süre ${f.days}.`,
      href: `${base}#surec`,
    },
    {
      q: "Hangi evrak isteniyor?",
      line: `${c.docs.groups.length} başlıkta toplanıyor; listeyi işaretleyip kopyalayabiliyorsunuz.`,
      href: `${base}#evrak`,
    },
    {
      q: "Vergi tarafı ne durumda?",
      line: `Yayınlanan çerçeve ${c.tax.rows.length} kalem; oranı konuşmadan önce kayıt yükümlülüğü var.`,
      href: `${base}#vergi`,
    },
    {
      q: "Parayı nasıl tahsil eder, nasıl çıkarırım?",
      line: "Banka, tahsilat kanalları ve transfer tarafı tek bölümde.",
      href: `${base}#para-transferi`,
    },
  );

  if (after) {
    chapters.push({
      q: "Şirket kurulduktan sonra ne çıkıyor?",
      line: `${after.items.length} kalem yükümlülük; hangisi ne zaman doğuyor.`,
      href: `${base}#kurulus-sonrasi`,
    });
  }

  return {
    country,
    anchor: country,
    name: COUNTRY_NAME[country],
    tagline: c.tagline,
    lead: c.intro,
    facts: [
      { k: "Kuruluş", v: `${f.fromLabel}'dan` },
      { k: "Tipik süre", v: f.days },
      { k: "Yapı", v: f.structure },
    ],
    limit: f.limit,
    chapters,
    href: base,
    posts: postsForCountry(country).map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      publishedAt: p.publishedAt,
    })),
  };
}

/**
 * DİKKAT — ARTIK REHBER SAYFASININ KAYNAĞI DEĞİL.
 *
 * Bu turda rehberler blogun bir TÜRÜ oldu (`BlogPost.kind === "rehber"`) ve
 * /blog/rehberler kendi listesini `postsOfKind("rehber")`ten kuruyor. Yani
 * yukarıdaki "yol" modeli yayında bir sayfa BASMIYOR.
 *
 * Silinmedi çünkü components/ContentHub.tsx (başka ajanın dosyası) hâlâ import
 * ediyor; buradan kaldırmak onun derlemesini kırardı. Ama artık hiçbir SAYIM
 * bunu okumuyor — bkz. countOf.
 */
export const GUIDES: Guide[] = COUNTRY_ORDER.map(buildGuide);

/* ============================================================================
   4 · SAYAÇLAR — hub'daki kapılar bunları okuyor
   ========================================================================= */

/**
 * Bir türde kaç YAYIN var.
 *
 * Hub'daki kapı bu sayıya bakıyor: sıfırsa önizleme satırı hiç basılmıyor,
 * kapının kendisi "hazırlanıyor" durumuna geçiyor. Sayı elle yazılmıyor ki
 * bir kayıt eklendiğinde hub kendiliğinden canlansın.
 *
 * REHBER SAYIMI DEĞİŞTİ. Eskiden GUIDES.length'ti, yani "kaç ülkenin yolu
 * var" demekti ve üç dönüyordu. Rehber blogun bir türü olunca o sayının
 * karşılığı kalmadı: kapı "3 yayın" derken /blog/rehberler'de yayınlanmış tek
 * rehber olmayacaktı — sayının vaat ettiği şey sayfada yoktu. Şimdi sayım
 * gerçekten yayınlanmış rehberleri sayıyor (bugün 0, üç tanesi taslak) ve
 * kapı dürüstçe "Hazırlanıyor" diyor.
 *
 * Taslaklar HİÇBİR sayıma girmiyor: `postsOfKind` yalnızca yayınlanmışları
 * döndürüyor (bkz. lib/blog.ts · sortedPosts). Bu, bu dosyanın gelişme ve
 * e-kitap tarafındaki kuralının aynısı — yer tutucu sayılmaz, işaretlenir.
 */
export function countOf(kind: ResourceKind): number {
  switch (kind) {
    case "blog":
      return BLOG_POSTS.length;
    case "rehber":
      return postsOfKind("rehber").length;
    case "gelisme":
      return UPDATES.length;
    case "ekitap":
      return EBOOKS.length;
  }
}

/* ------------------------------------------------------------------ biçim */

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

/**
 * "2026-07" → "Temmuz 2026".
 *
 * Intl + new Date kullanılmıyor: blog.ts'teki formatDate ile aynı sebep —
 * "2026-07-01" UTC gece yarısına çözülüyor ve sunucu saat dilimi geride
 * kalırsa ay bir geri kayıyor.
 */
export function monthLabel(key: string): string {
  const [y, m] = key.split("-");
  const ay = AYLAR[Number(m) - 1];
  if (!y || !ay) return key;
  return `${ay} ${y}`;
}

/** Ülke rozeti: kayıt üç ülkeden birine ait olabilir ya da hepsini ilgilendirir. */
export function countryLabel(c: CountrySlug | "genel"): string {
  return c === "genel" ? "Üç ülke" : COUNTRY_NAME[c];
}

/**
 * "2026-07-12" → "12 Tem".
 *
 * Eksenin sol sütunu için. Tam tarih (formatDate) 132px'lik sütunda iki
 * satıra sarıyor ve tarihler alt alta hizalanmıyor; kısaltma hizayı koruyor.
 * Kartın içinde tam tarih zaten yazıyor, yani bilgi kaybolmuyor.
 */
export function shortDate(iso: string): string {
  const [, m, d] = iso.split("-");
  const ay = AYLAR[Number(m) - 1];
  if (!ay || !d) return iso;
  return `${Number(d)} ${ay.slice(0, 3)}`;
}

/* ------------------------------------------------------- ülke seçici (akış)

   Müşteri: "ülke seçme olmalı ülkeye geldiğinde o ülkedeki gelişmeleri
   görücez gibi düşün."

   Seçenekler burada duruyor ki hem çizelge hem de ileride başka bir yüzey
   (ör. ana sayfa akışı) aynı listeyi okusun. "hepsi" ilk sırada: sayfaya
   gelen kişi önce her şeyi görüyor, sonra daraltıyor. */
export const UPDATE_FILTERS = ["hepsi", ...COUNTRY_ORDER] as const;
export type UpdateFilter = (typeof UPDATE_FILTERS)[number];

export const UPDATE_FILTER_LABEL: Record<UpdateFilter, string> = {
  hepsi: "Hepsi",
  dubai: COUNTRY_NAME.dubai,
  ingiltere: COUNTRY_NAME.ingiltere,
  kktc: COUNTRY_NAME.kktc,
};

/**
 * Bir kayıt seçilen ülkede görünür mü?
 *
 * "genel" kayıtlar HER ülkede görünüyor: üç ülkeyi birden ilgilendiren bir
 * değişikliği Dubai'yi seçen kişiden saklamak, onu ilgilendirmediğini
 * söylemek olurdu. Seçici bunu bir satırla ekranda da yazıyor.
 */
export function matchesFilter(country: CountrySlug | "genel", f: UpdateFilter): boolean {
  return f === "hepsi" || country === f || country === "genel";
}

/** Bir kaydın göründüğü seçimlerin listesi — TimelineRow.shownIn bunu taşıyor. */
export function filtersFor(country: CountrySlug | "genel"): UpdateFilter[] {
  return UPDATE_FILTERS.filter((f) => matchesFilter(country, f));
}
