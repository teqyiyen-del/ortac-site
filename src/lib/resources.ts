import { COUNTRY_NAME, COUNTRY_ORDER, FACTS, type CountrySlug } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { AFTER_SETUP } from "@/lib/afterSetup";
import { BLOG_POSTS, postsForCountry } from "@/lib/blog";

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
   · Teyit edilmemiş yer tutucular ayrı dizilerde (`PENDING_*`) duruyor ve
     TİPLERİ FARKLI. Hiçbir sayfa onları basmıyor; yayına almak için eksik
     alanı (kaynak bağlantısı, dosya) doldurmaktan başka yol yok.

   ---------------------------------------------------------------------------
   ÜLKE REHBERLERİ NEDEN YAZI DEĞİL

   Müşterinin tarifi: "ülkede yapılabilecek şeyler fln o tarz şeyleri anlatan."
   Bu içerik sitede ZATEN VAR — ülke sayfası, yapı seçimi, süreç, evrak, vergi,
   para tarafı ve kuruluş sonrası. Eksik olan şey yazı değil, YOL: hangi soruyu
   nerede cevaplayacağı.

   O yüzden rehber, yeni bir metin yığını değil, gerçek adreslerden kurulu
   numaralı bir yol. Her bölümün `href`i sitede karşılığı olan bir sayfaya ya
   da o sayfadaki bir çapaya iniyor; hiçbiri uydurulmuyor. Ülke sayfası
   dolaşıma kapalıysa SmartLink satırı sönük gösteriyor — "burası olacak,
   henüz değil" demenin sitedeki yerleşik yolu.

   Yolun kendisi de elle yazılmıyor: bölümler ülkenin VERİSİNDEN türüyor.
   Dubai'de yapı seçimi bölümü var çünkü countryContent.ts'te `structures`
   dolu; İngiltere'de yok çünkü orada o veri yok. Bir ülkeye olmayan bölümü
   listelemek, o ülkede olmayan bir adımı varmış gibi göstermek olurdu.
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
    href: "/rehberler",
    job: "Bir ülkede ne yapılabileceğinin ve nasıl yapıldığının adım adım yolu.",
    isNot: "Ülke reklamı değil. Her rehber o ülkenin dürüst kısıtını da yazıyor.",
    emptyTitle: "Rehber hazırlanıyor.",
    emptyLine: "Bu ülkenin yolu, sayfaları yayına alındıkça burada açılacak.",
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
      "Buraya bir kayıt ancak resmî kaynağına bağlanabildiğinde giriyor: tarih, hangi ülke, kimi ilgilendiriyor ve duyurunun kendisi. Teyit edilmemiş bir mevzuat değişikliği yayınlamıyoruz — yanlış bilgi vermektense boş durması iyidir.",
  },
  ekitap: {
    id: "ekitap",
    label: "E-kitaplar",
    href: "/e-kitaplar",
    job: "İndirip yanınızda götürdüğünüz uzun içerik.",
    isNot: "Form karşılığı değil: indirmek için bilgi istemiyoruz.",
    emptyTitle: "Henüz indirilebilir bir dosya yok.",
    emptyLine:
      "Bir e-kitap ancak dosyası hazır olduğunda listeleniyor. Tıklandığında inmeyen bir kart göstermiyoruz.",
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
 * Bu üç başlık components/home/ToolsResources.tsx içinde tarihli birer satır
 * olarak duruyordu ve "güncel mevzuat" diye gösteriliyordu. Teyitleri yok:
 * ne kaynakları belli ne de tarihlerinin neye ait olduğu. Silinmediler çünkü
 * konu başlığı olarak muhtemelen doğrular ve içeriği hazırlayacak kişinin işine
 * yarıyorlar.
 *
 * TİPİ `Update` DEĞİL ve bu kasıtlı: kaynak alanı olmadığı için UPDATES
 * dizisine kopyalanamıyorlar. Yayına almanın tek yolu resmî duyuruyu bulup
 * kaydı baştan yazmak.
 */
export const PENDING_UPDATES: { title: string; seen: string; why: string }[] = [
  {
    title: "Kurumlar vergisi beyan takvimi",
    seen: "2026-07-12",
    why: "kaynak duyurusu ve hangi mükellef grubunu kapsadığı teyit edilmedi",
  },
  {
    title: "goAML kayıt yükümlülüğü",
    seen: "2026-07-03",
    why: "yükümlülüğün kapsamı ve tarihi teyit edilmedi",
  },
  {
    title: "KDV eşiği ve kayıt zorunluluğu",
    seen: "2026-06-24",
    why: "eşik tutarı ve yürürlük tarihi teyit edilmedi",
  },
];

/** En yeni üstte. Akışın tek sıralama kuralı. */
export function sortedUpdates(): Update[] {
  return [...UPDATES].sort((a, b) => b.date.localeCompare(a.date));
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
 * components/home/ToolsResources.tsx'te "Rehberler" sütununda duran üç kayıt.
 * Sayfa sayıları da dahil hiçbiri doğrulanmadı. Tipleri `Ebook` DEĞİL: `file`
 * alanları olmadığı için EBOOKS'a kopyalanamıyorlar.
 *
 * NOT (başka ajanın dosyası, buradan değiştirilmedi): ToolsResources.tsx'teki
 * üç satır hâlâ /kaynaklar'a bağlanıyor ve "Ücretsiz indir" demiyor ama
 * "Rehberler" başlığı altında dosya gibi duruyor. Dosyalar gelene kadar o
 * sütunun /e-kitaplar'a bağlanması yeterli — kart başına indirme vaadi
 * verilmemeli.
 */
export const PENDING_EBOOKS: { title: string; claimed: string }[] = [
  { title: "Dubai kuruluş rehberi", claimed: "32 sayfa · PDF" },
  { title: "İngiltere Ltd el kitabı", claimed: "24 sayfa · PDF" },
  { title: "KKTC başlangıç rehberi", claimed: "18 sayfa · PDF" },
];

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

export const GUIDES: Guide[] = COUNTRY_ORDER.map(buildGuide);

/* ============================================================================
   4 · SAYAÇLAR — hub'daki kapılar bunları okuyor
   ========================================================================= */

/**
 * Bir türde kaç yayın var.
 *
 * Hub'daki kapı bu sayıya bakıyor: sıfırsa önizleme satırı hiç basılmıyor,
 * kapının kendisi "hazırlanıyor" durumuna geçiyor. Sayı elle yazılmıyor ki
 * bir kayıt eklendiğinde hub kendiliğinden canlansın.
 *
 * Rehberlerde sayı, "kaç ülkenin yolu var" demek: rehberin içeriği ülkenin
 * kendi sayfalarından geliyor, o yüzden üçü de baştan dolu.
 */
export function countOf(kind: ResourceKind): number {
  switch (kind) {
    case "blog":
      return BLOG_POSTS.length;
    case "rehber":
      return GUIDES.length;
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
