import { FACTS, STANCE_LIMITS } from "@/lib/brand";
import {
  AFTER_SETUP,
  INCLUSION_LABEL,
  RHYTHM_LABEL,
  type AfterItem,
} from "@/lib/afterSetup";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { POST_PHOTO } from "@/lib/media";

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
   Tek iş: aşağıya bir `BlogPost` nesnesi yazıp BLOG_POSTS dizisine eklemek.
   Rota (generateStaticParams), okuma süresi, içindekiler, JSON-LD ve "diğer
   yazılar" listesi kendiliğinden doğru oluyor — şablonda hiçbir şey
   değişmiyor. Yazının adresi de buradan: blogHref(post.slug).

   NOT — /blog/… adresleri şu an dolaşıma KAPALI (lib/routes.ts'te LIVE
   listesinde yok). Yani ana sayfadaki kart sönük çıkıyor ve tıklanmıyor;
   adresi elle yazan sayfayı görüyor. Bu kasıtlı: iç kontrol bitmeden
   müşteriye gösterilmeyecek. Açma işi routes.ts'e bir satır.
   ========================================================================= */

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
  slug: string;
  title: string;
  /** SplitWords/PageHero kuralı: başlığın SONUNDA geçen parça vurgulanır */
  heroAccent: string;
  /** kart özeti ve meta açıklaması; ana sayfadaki kartla aynı cümle */
  summary: string;
  /** ISO tarih (YYYY-AA-GG) — künye, sıralama ve JSON-LD aynı alandan okur */
  publishedAt: string;
  /** yazı gerçekten güncellendiyse doldurulur; boşken JSON-LD'ye alan yazılmaz */
  updatedAt?: string;
  category: string;
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
  slug: "dubaide-sirket-kurmanin-maliyet-kalemleri",
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
  category: "Ülke rehberi",
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

/**
 * Yayındaki yazılar. Sıra önemsiz: listeleyen her yer tarihe göre kendi
 * sıralıyor (bkz. sortedPosts).
 */
export const BLOG_POSTS: BlogPost[] = [POST_DUBAI_MALIYET];

/* ---------------------------------------------------------------- yardımcı */

/** Yazının adresi. Adres kalıbı tek yerde dursun diye fonksiyon. */
export const blogHref = (slug: string) => `/blog/${slug}`;

/** generateStaticParams bunu okuyor: yazı eklemek yeni bir rota demek. */
export const BLOG_SLUGS = BLOG_POSTS.map((p) => p.slug);

/** Tanımsız slug'da undefined — şablon notFound() çağırıyor. */
export function postFor(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** En yeni üstte. Ana sayfadaki yayın bölümüyle aynı tek kural. */
export function sortedPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Bir yazı dışındaki yazılar — "diğer yazılar" bloğu için. */
export function otherPosts(slug: string): BlogPost[] {
  return sortedPosts().filter((p) => p.slug !== slug);
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
