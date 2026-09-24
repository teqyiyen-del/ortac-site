import { COUNTRY_SERVICES, FACTS, PAY_MATRIX } from "@/lib/brand";
import { brandKeyForName, type BrandKey } from "@/lib/brands";
import { isLive, LIVE_ROUTES } from "@/lib/routes";
import {
  COUNTRY_SLUGS,
  FORMATION_SLUG,
  serviceHref,
  servicesFor,
  type ServiceSlug,
} from "@/lib/services";
import type { Country } from "@/lib/store";
import type { Faq } from "@/lib/countryContent";

/* ============================================================================
   SEKTÖR İÇ SAYFALARI — tek dosya, baştan sona okunabilir içerik.

   Neden burası: /sektorler/[sektor] sayfası tek bir şablon ve o şablon hiçbir
   cümle taşımıyor. Sayfada görünen her kelime bu dosyada duruyor ki müşteri
   (ve gerekirse mali müşavir) bir sayfayı açıp baştan sona okuyup onaylasın —
   countryContent.ts'te tutulan çizginin aynısı.

   Neden var: sektör kartları ana sayfada bir cümleyle geçiyor, ama arama
   tarafında insanlar "dubaide yazılım şirketi kurmak" diye ülke + sektör
   birlikte arıyor. Ana sayfadaki bir kart bu sorguyu karşılayamaz; kendi
   adresi, kendi h1'i ve ülke başına kendi h2'si olan bir sayfa karşılar.
   Sayfanın var olma sebebi bu, dolayısıyla başlık hiyerarşisi ve ülke
   bölümlerinin ayrı ayrı derin bağlanabilir olması süs değil, işin kendisi.

   İKİNCİ SEKTÖR NASIL EKLENİR: bu dosyanın sonundaki SECTORS kaydına bir
   girdi. Rota, generateStaticParams, metadata, JSON-LD ve ana sayfadaki
   kartın bağlantısı hepsi buradan türüyor; başka hiçbir dosyaya dokunmak
   gerekmiyor. Girdisi olmayan sektörün kartı SmartLink sayesinde kendiliğinden
   "yakında" görünür — bu kasıtlı: yol haritası görünür kalıyor, ölü tıklama
   olmuyor.

   VERİNİN KAYNAĞI: ülkeye dair hiçbir olgu burada icat edilmedi. Lisans
   sınıfı, süre, vergi çerçevesi ve kısıtlar brand.ts (FACTS), countryContent.ts
   ve services.ts'ten geliyor; tahsilat kanalları ise PAY_MATRIX'ten programatik
   okunuyor, yani matris değişince bu sayfa da değişiyor. Yalnızca sektörün
   kendi çerçevesi (aşağıda SWAP:SECTOR_FRAMING ile işaretli) yeni metin.

   ---------------------------------------------------------------------------
   BU TURDA NE DEĞİŞTİ — VERİ ŞEKLİ SAYFANIN AKIŞINA GÖRE YENİDEN KURULDU

   Sayfa "karmaşık ve algılanamıyor" geri bildirimiyle baştan kurgulandı
   (teşhis: app/sektorler/[sektor]/page.tsx'in başındaki not). Bu dosyada
   karşılığı olan üç değişiklik:

   1. `frame` (üç madde) ve `topics` (dört başlık) BİRLEŞTİ → `decide` (dört
      eksen). İki alan pratikte aynı listeyi iki kez yazıyordu: tahsilat, ekip,
      faaliyet kodu. Sayfada da iki ayrı bölüm olarak, iki ayrı düzende
      basılıyorlardı — okuyan kişi ikinci bölümde "bunu az önce okumuştum" diyip
      taramayı bırakıyordu. Tek liste, dört eksen, hiçbir cümle silinmedi:
      birleşen maddelerin metinleri `detail` içinde yan yana duruyor.

   2. `choose` EKLENDİ. Sayfanın cevaplaması gereken soru "hangisi benim işim
      için mantıklı" ve eski kurguda bu soru hiçbir yerde SORULMUYORDU; üç ülke
      arka arkaya, aynı şablonla anlatılıyor ve kıyas ziyaretçinin kafasına
      bırakılıyordu. `routes` bunun kısa yolu ("şu durumdaysanız şurası"),
      COMPARE_ROWS + PAY_MATRIX ise uzun yolu (ölçüt ölçüt, üç sütun yan yana).

   3. `SectorCountry.facts` (etiketli dizi) → `cells` (anahtarlı nesne). Sebep
      teknik ve zorunlu: kıyas tablosunda satırların üç sütunda hizalanması
      gerekiyor, dizide ise Dubai'nin ikinci kalemi "Lisans", diğerlerinin
      "Faaliyet tanımı" idi — aynı satıra düşmeleri şansa kalıyordu. Anahtar
      hizayı garantiliyor; satır etiketleri de sektörden bağımsız olduğu için
      artık girdinin içinde değil, aşağıdaki COMPARE_ROWS'ta tek kez yazılı.

   ---------------------------------------------------------------------------
   BU TURDA NE DEĞİŞTİ — KIYAS KISALDI, FİRMANIN KENDİ TEKLİFİ EKLENDİ

   4. `offer` EKLENDİ. Sayfa sektörü ve üç ülkeyi anlatıyordu ama tek bir yerde
      bile "peki Ortac bu işte ne yapıyor" demiyordu — müşterinin ilk itirazı
      buydu. Bölüm YENİ HİZMET İCAT ETMİYOR: hizmet listesi services.ts'teki
      gerçek katalogdan (servicesFor) programatik türüyor, bu dosyanın kattığı
      tek şey her hizmetin BU SEKTÖRDE ne işe yaradığını söyleyen bir cümle.
      Katalogdan bir hizmet kalkarsa bölümden de kendiliğinden düşüyor.

   5. KIYAS TABLOSU ALTI + ÜÇ SATIRDAN DÖRT SATIRA İNDİ. Gerekçe: detaylı
      kıyasın kendi sayfası var (/ulkeler) ve bu sayfanın işi genel kıyas
      değil, YAZILIMCININ kararı. Kalan dört ölçüt de o yüzden seçildi:

      · Kartla tahsilat  — yazılımda tek gerçek eleyici. Abonelik geliri olan
                           bir şirket için ülkeyi çoğu zaman bu satır seçiyor.
      · Yapı ve kuruluş  — şerhi "gitmek gerekiyor mu" sorusunu cevaplıyor;
                           uzaktan çalışan bir ekip için belirleyici.
      · Oturum / vize    — geliştiriciyi yanına taşımak isteyen için tek soru.
      · Vergi çerçevesi  — kârın nerede kaldığı.

      ÇIKANLAR ve neden: kuruluş maliyeti + tipik süre (sektörden bağımsız,
      sitenin dört ayrı yerinde zaten yazıyor ve iki "temsilî / taahhüt yok"
      şerhini de beraberinde getiriyorlardı); faaliyet tanımı (1. bölümün
      dördüncü ekseni üç ülke için de aynı şeyi zaten anlatıyor); banka hesabı
      ve ödeme kuruluşu grupları (şirket kuruluşunun genel konusu, yazılıma
      özgü değil). Hiçbiri silinmedi — hepsi /ulkeler'de duruyor ve tablonun
      altındaki çıkış oraya gönderiyor.
   ========================================================================= */

/* ---------------------------------------------------------------- tipler */

/* İkon adı string, bileşen değil: bu dosya .ts ve içeriği müşteriye okutulan
   bir metin dosyası olarak kalsın istiyoruz. Eşleme sayfada yapılıyor
   (page.tsx · ICON) — countryContent.ts'teki `icon?: string` alanının aynı
   gerekçesi.

   Liste bu turda büyüdü: ülke bloklarındaki avantaj maddeleri de artık kendi
   ikonlarını taşıyor (bkz. SectorCountry.fit). Yeni bir ad eklendiğinde
   page.tsx'teki eşleme derleme anında eksik kalırsa TypeScript söylüyor —
   sessizce ikonsuz basılmıyor. */
export type SectorIcon =
  | "users"
  | "repeat"
  | "shield"
  | "tag"
  /* avantaj maddeleri */
  | "split"
  | "card"
  | "id"
  | "check"
  | "file"
  | "laptop"
  | "clock"
  | "wallet"
  | "receipt"
  /* 25.09.2026 · beş yeni sektörün eksen ve avantaj simgeleri */
  | "store"
  | "package"
  | "home"
  | "building"
  | "key"
  | "landmark"
  | "scale"
  | "stethoscope"
  | "globe";

/** Kuruluş kararını veren bir eksen. `line` her zaman görünür (özet),
    `detail` tıklamayla açılıyor — "kalabalık yok, merak eden açsın". */
export type SectorAxis = {
  icon: SectorIcon;
  title: string;
  line: string;
  detail: string;
};

/** "Şu durumdaysanız şurası" — kıyas tablosunun kısa yolu.
    `to` bir dizi çünkü cevap her zaman tek ülke değil: kartla tahsilat iki
    ülkede birden açık ve bunu tek ülkeye indirgemek yanlış olurdu. */
export type SectorRoute = {
  when: string;
  to: Country[];
  why: string;
};

/** Kıyas tablosunun tek hücresi: değer + onu nitelendiren şerh.
    `note` çoğu yerde zorunlu gibi davranıyor (bkz. vergi satırları): "%0" ya da
    "%19-25" gibi bir rakamı şerhsiz basmak STANCE_LIMITS'e aykırı olurdu. */
export type SectorCell = { value: string; note?: string };

/** Ülke başına bir bölüm — sayfada kendi id'siyle, kendi h2'siyle. */
export type SectorCountry = {
  country: Country;
  /** h2 metni. Aranan cümlenin birebir kendisi olacak şekilde yazılıyor. */
  heading: string;
  /** h2 içinde vurgulanan parça (SplitWords) — `heading`'in alt dizisi olmalı */
  accent: string;
  /* Başlığın ÜSTÜNDEKİ üç kelimelik hüküm. Tek işi var ve o iş görsel: üç ülke
     bölümü aynı iskeleti taşıyor ve arka arkaya okununca üçü tek bir tekrar
     gibi görünüyordu. Bu satır her bölümün ilk yarım saniyesinde farkı
     söylüyor — "tahsilat açık" / "uzaktan kuruluş" / "kartla tahsilat kapalı".
     Hiçbiri yeni bilgi değil; üçü de aşağıdaki listelerin özeti. */
  badge: string;
  lead: string;
  /* "bu sektör için burada ne anlamlı" — AVANTAJLAR.
     Bu turda düz metin dizisi olmaktan çıkıp ikon taşımaya başladı. Sebebi
     müşterinin şikâyeti: "madde işaretlerini tik olarak koymuşsun, bu
     avantajlar çok geriplanda kalmış, iconlu fln koy da dikkat çeksin."
     Tek tip bir tik üç maddenin üçünü de aynı şey gibi gösteriyordu; artık
     her madde ne söylüyorsa onun simgesini taşıyor. CÜMLELER DEĞİŞMEDİ. */
  fit: { icon: SectorIcon; text: string }[];
  /** kıyas tablosunun sektöre bağlı iki satırı; kalanı FACTS ve PAY_MATRIX'ten */
  cells: { structure: SectorCell; tax: SectorCell };
  /** dürüst kısıt. Firma politikası: her ülkede en az bir tane, asla boş değil. */
  limits: string[];
  /* HİZMET BAĞLANTISI LİSTESİ KALKTI. Müşteri: "her ülkenin altında tüm
     hizmetlerini sıralamışsın ya ona gerek yok, direkt sadece şirket kuruluşu
     butonunu eklesek yeterli." Yerine tek bir düğme var ve adresi veriden
     değil, formationHref()'ten geliyor — bkz. dosyanın altı. */
};

export type Sector = {
  slug: string;
  /** kartta ve içerikte geçen tam ad */
  name: string;
  /** cümle içinde geçen kısa ad: "…'de yazılım şirketi kurmak" */
  short: string;
  seo: { title: string; description: string };
  hero: { crumb: string; title: string; accent: string; lead: string };
  /** 1. bölüm — kararı veren eksenler */
  decide: { heading: string; accent: string; lead: string; axes: SectorAxis[] };
  /** 2. bölüm — hangi durumda hangi ülke, sonra dört ölçütte kısa kıyas */
  choose: {
    heading: string;
    accent: string;
    lead: string;
    routes: SectorRoute[];
    /** tablonun altındaki tek dipnot */
    note: string;
    /** tam kıyasın adresi: bu sayfa öz kalıyor, detay orada */
    more: { line: string; label: string; href: string };
    /** dört yönlendirmenin hiçbiri oturmayan ziyaretçi için çıkış cümlesi */
    ask: string;
  };
  /** ülke bölümleri; sıra sayfadaki sıra */
  countries: SectorCountry[];
  /** 4. bölüm — "Ortac bu alanda ne yapıyor". Hizmetlerin KENDİSİ burada
      yazmıyor (services.ts'ten geliyor); burada yalnızca her hizmetin bu
      sektördeki karşılığını söyleyen cümle var. */
  offer: {
    heading: string;
    accent: string;
    lead: string;
    /** ServiceSlug → o hizmetin bu sektördeki tek cümlelik karşılığı.
        Karşılığı yazılmayan hizmet bölümde hiç basılmıyor — cümlesiz bir
        başlık, ziyaretçiye hizmetin ne işine yarayacağını söylemiyor. */
    lines: Partial<Record<ServiceSlug, string>>;
    /** listenin altındaki tek şerh: kapsam ülkeye göre değişiyor */
    note: string;
  };
  /* 25.09.2026 · KIYAS TABLOSUNUN KARTLA TAHSİLAT SATIRI İSTEĞE BAĞLI.
     Yazılım, e-ticaret ve danışmanlıkta ülkeyi çoğu zaman bu satır seçiyor;
     gayrimenkul, finans ve sağlıkta ise kararı veren şey kart değil (kira
     havaleyle, klinik ödemesi yerel POS'la geliyor) ve satır ziyaretçiye
     yanlış bir eleyici gösterirdi. Verilmezse satır basılıyor. */
  payRow?: boolean;
  /* 25.09.2026 · SSS (Burak: "hepsinin sonuna da sss eklemeni rica
     ediyorum"). Ülke sayfalarının SSS bileşeniyle (CountryFaq) aynı şekil.
     Cevaplar sayfanın başka bir yerinde zaten yazan ya da kaynak belgesi
     olan olgular; yeni bir iddia yok (docs/sektor-mevzuat.md). */
  faq: Faq[];
};

/* ------------------------------------------------------- tahsilat kanalları

   Ödeme tablosu bu dosyada tekrar yazılmıyor. PAY_MATRIX zaten üç ülke için
   doğrulanmış ve "✗" hücreleri kasıtlı olarak gizlenmiyor (bkz. brand.ts).
   Yazılım sayfasının ihtiyacı tam olarak bu: abonelik ve uygulama içi tahsilat
   konuşulurken hangi kanalın açık, hangisinin kapalı olduğu tek soru.

   ÜÇ GRUP HER ZAMAN, AYNI SIRAYLA dönüyor — boş grup bile eleniyor değil.
   Sebebi kıyas tablosu: satırlar üç sütunda hizalanmak zorunda ve bir ülkede
   grubu atlayan bir liste, o ülkenin sütununu bir satır yukarı kaydırırdı.

   "none" (o ülkede konusu bile olmayan) satır listeye hiç girmiyor; "no"
   (sağlayıcının o ülkeyi desteklemediği) satır KALIYOR ve `on: false` ile
   işaretleniyor. İkisi farklı şeyler ve ikincisi bu sayfanın en keskin bilgisi:
   KKTC'de Stripe ve PayPal'ın yokluğu, orada bir yazılım şirketi kurmanın tek
   belirleyici kısıtı.

   Sıralama açıklar önce: hücrede önce ne YAPABİLECEĞİNİZİ, sonra neyin kapalı
   olduğunu okuyorsunuz. Kapalıyı öne almak, üç ülkeden ikisinde hiç kapalı
   satır olmadığı için hizayı da bozardı. */
export type PayCell = { name: string; brand: BrandKey | null; on: boolean };

export function payRowsFor(c: Country): { title: string; hint: string; items: PayCell[] }[] {
  return PAY_MATRIX.map((g) => ({
    title: g.title,
    hint: g.hint,
    items: g.rows
      .filter((r) => r.cells[c] !== "none")
      .map((r) => ({ name: r.name, brand: brandKeyForName(r.name), on: r.cells[c] === "yes" }))
      .sort((a, b) => Number(b.on) - Number(a.on)),
  }));
}

/* ------------------------------------------------- kıyasta kalan tahsilat satırı

   Tablo üç ödeme grubunu birden basıyordu (banka hesabı, ödeme kuruluşu,
   tahsilat) ve dokuz satırın üçü tek başına buydu. Yazılım perspektifinden
   belirleyici olan tek grup KART: abonelik geliri olan bir şirket için ülkeyi
   çoğu zaman bu satır seçiyor. Banka hesabı ve ödeme kuruluşu kalemleri
   şirket kuruluşunun genel konusu ve /ulkeler'de ölçüt ölçüt duruyorlar.

   Grup adı burada yazılı ama grubun BAŞLIĞI ve ŞERHİ PAY_MATRIX'ten okunuyor,
   yeniden yazılmıyor — matris değişince satır da değişiyor. */
const PAY_CARD_GROUP = "Tahsilat";

export function cardPayFor(c: Country): { title: string; hint: string; items: PayCell[] }[] {
  return payRowsFor(c).filter((g) => g.title === PAY_CARD_GROUP);
}

/* --------------------------------------------------------- kıyas satırları

   Satır etiketleri sektöre bağlı değil (her sektör aynı ölçütlerle
   kıyaslanıyor), o yüzden sektör girdisinin içinde değil burada duruyorlar.
   İkinci sektör eklendiğinde bu liste olduğu gibi çalışıyor.

   Tutar ve süre satırları bu turda ÇIKTI (bkz. dosyanın başındaki 5. madde) ve
   onlarla birlikte iki `hint` de gitti. Kalan üç ölçütün hiçbiri rakam
   basmıyor, dolayısıyla satır başında bir şerhe de ihtiyaçları yok; vergi
   hücrelerinin kendi şerhleri hücrenin İÇİNDE duruyor. */
export type CompareKey = "structure" | "tax" | "visa";

export const COMPARE_ROWS: { key: CompareKey; label: string; hint?: string }[] = [
  { key: "structure", label: "Yapı ve kuruluş" },
  { key: "visa", label: "Ekip için oturum / vize" },
  { key: "tax", label: "Vergi çerçevesi" },
];

/* Oturum/vize satırı COUNTRY_SERVICES'ten türüyor: bir ülkenin hizmet
   listesinde "oturum-vize" varsa o ülkede bu iş yapılıyor demektir. Bugün
   yalnızca Dubai'de var. Hücre metinleri de uydurma değil — ana sayfadaki
   kıyas tablosu ve SSS aynı iki cümleyi kullanıyor; aynı olgu için sitede iki
   farklı cümle kurmamak adına ifade oradan alındı. */
export const hasVisaRoute = (c: Country) =>
  COUNTRY_SERVICES[c].some((s) => s.key === "oturum-vize");

export const VISA_LINE = {
  yes: "Şirket üzerinden oturum vizesi",
  no: "Şirket kurmak oturum vermiyor",
};

/* ------------------------------------------------------------------ içerik */

/* SWAP:SECTOR_FRAMING — Aşağıdaki sektör çerçevesi (giriş, dört eksen ve dört
   yönlendirme) bu turda yazıldı; ülke olgularının aksine mevcut bir veri
   dosyasından türemiyor. Hiçbiri rakam, oran veya süre iddia etmiyor; hepsi
   "bu sektörde kuruluşta ne konuşuluyor" düzeyinde. Yine de müşteri onayına
   açık: yanlış bulduğu cümleyi tek tek değiştirebilsin diye ayrı ayrı
   duruyorlar.

   İki cümle özellikle işaretli, çünkü sitenin başka hiçbir yerinde karşılığı
   yok: uygulama mağazası tahsilatının nasıl aktığı ve fikri mülkiyetin hangi
   tüzel kişide duracağı. İkisi de genel çerçeve olarak yazıldı, kişiye özel
   görüş olarak değil.

   Yönlendirmeler (choose.routes) hiçbir yeni olgu taşımıyor: dördü de
   PAY_MATRIX, COUNTRY_SERVICES ve aşağıdaki ülke bloklarının içinde zaten
   yazan şeyin tek cümlelik hâli. Yönlendirme bir tavsiye değil, bir eleme:
   "kartla tahsilat KKTC'de kurulmuyor" bir tercih değil, tablodan çıkan bir
   olgu. */

/* ------------------------------------------------ ortak vergi hücreleri

   25.09.2026 · Üç ülkenin vergi hücresi sektörden bağımsız ve altı sektörde
   birden aynı cümle. Tek yerde duruyor ki bir oran değişince altı sayfada
   birden değişsin.

   İKİSİ ESKİMİŞTİ ve yazılım sayfasında öyle yayındaydı:
     · İngiltere: "güncel oran kuruluş öncesi teyit ediliyor" diyordu; oran
       ve bantlar 23.09'da gov.uk'tan doğrulandı (docs/ingiltere-mevzuat · 4).
     · KKTC: "kurumlar vergisi ve KDV var" diyordu; KKTC sayfası 22.09'dan
       beri Serbest Liman şirketini anlatıyor ve KKTC dışındaki işte vergi
       yok (docs/kktc-mevzuat · 1, countryContent · kktc.tax). */
const TAX_CELL: Record<Country, SectorCell> = {
  dubai: {
    value: "375.000 AED'ye kadar %0, üzeri %9",
    note: "Serbest bölge olmak otomatik muafiyet vermiyor; %0 şartları sağlayan nitelikli gelirde geçerli.",
  },
  ingiltere: {
    value: "Kâra göre %19-25",
    note: "£50.000'e kadar %19, £250.000 üstü %25; arası kademeli geçiş.",
  },
  kktc: {
    value: "KKTC dışındaki işte %0",
    note: "Serbest Liman şirketinde. KKTC içindeki müşteriye yapılan işte gümrük ve KDV ödeniyor.",
  },
};

const YAZILIM: Sector = {
  slug: "yazilim-ve-teknoloji",
  name: "Yazılım ve teknoloji",
  short: "yazılım",

  seo: {
    /* Başlık ülke adlarını taşıyor: "dubaide yazılım şirketi kurmak" arayan
       kişinin sonuç sayfasında gördüğü satır bu. Rakam yok — kuruluş bedelini
       başlığa yazmak, teklife göre değişen bir sayıyı arama sonucunda sabitler. */
    title: "Yazılım şirketi kurmak: Dubai, İngiltere ve KKTC | Ortac Global",
    description:
      "Yazılım ve teknoloji şirketi için yurt dışında kuruluş: Dubai, İngiltere ve KKTC'de hangi lisans ve faaliyet sınıfı geçerli, hangi tahsilat kanalları açık, hangi kısıtlar var. Üç ülke yan yana.",
  },

  hero: {
    crumb: "Sektörler · Yazılım ve teknoloji",
    title: "Yazılım ve teknoloji şirketi kurmak.",
    accent: "şirketi kurmak.",
    /* Giriş cümlesi artık sayfanın SORUSUNU söylüyor ve nasıl cevaplayacağını
       da söylüyor. Eski hâli konuyu tarif ediyordu ("bu sayfa neyi
       değiştirdiğini anlatıyor") ama okuyan kişi ne arayacağını bilmeden
       kaydırmaya başlıyordu. Üç adımın adı burada geçtiği için sayfa bir
       ansiklopedi değil, bir akış olarak açılıyor. */
    lead: "Yazılım işi için Dubai, İngiltere ve KKTC'den hangisinin uygun olduğu dört adımda ele alınıyor: kararı belirleyen dört ölçüt, üç ülkenin karşılaştırması, her ülkenin ayrıntısı ve Ortac'ın bu süreçteki rolü.",
  },

  decide: {
    heading: "Yazılımda kuruluş kararını dört ölçüt belirliyor.",
    accent: "dört ölçüt belirliyor.",
    lead: "Ürün dijital olduğu için depo ve stok denklemden çıkıyor; geriye kuruluş anında karar isteyen dört başlık kalıyor.",
    axes: [
      {
        icon: "repeat",
        title: "Tahsilat nereden geçiyor",
        line: "Yazılımı her ülkeye satabilirsiniz; kartı çeken altyapı şirketin hangi ülkede kurulduğuna bakıyor.",
        detail:
          "Kartla yinelenen tahsilat pratikte Stripe ve PayPal üzerinden kuruluyor; ikisi de Dubai ve İngiltere şirketiyle çalışıyor, KKTC şirketiyle çalışmıyor. Uygulama mağazası üzerinden satıyorsanız tahsilatı mağaza yapıyor ve size dönemsel ödeme olarak geçiyor; o durumda kritik soru kartın değil, mağaza ödemesinin hangi ülkedeki hangi hesaba düşeceği. Şirketin adresini çoğu zaman bu tek satır belirliyor: satış her yerden gelir, tahsilat tek bir kanaldan geçer.",
      },
      {
        icon: "users",
        title: "Ekip nerede oturuyor",
        line: "Geliştiriciler farklı ülkelerdeyse şirketin bulunduğu yer vize kotasını, bordroyu ve sözleşme tarafını değiştiriyor.",
        detail:
          "Dubai'de çalışan vizesi kotası, aldığınız lisans paketine bağlı; ekibi oraya taşıyacaksanız kota kuruluş anında seçiliyor. İngiltere'de direktöre maaş ödeyecekseniz PAYE bordro kaydı gerekiyor. Her üç ülkede de şirketin nereden yönetildiği vergi açısından belirleyici olabiliyor, dolayısıyla ekip haritasını kuruluş dosyasını açmadan önce çıkarıyoruz.",
      },
      {
        icon: "tag",
        title: "Faaliyet hangi sınıfa yazılıyor",
        line: "Ne sattığınız kuruluş dosyasında bir sınıfa yazılıyor ve sonraki bütün vergi, lisans ve regülasyon işlerinin girdisi o sınıf oluyor.",
        detail:
          "Dubai'de faaliyet kodu doğrudan ticari lisans sınıfını belirliyor; ne sattığınızı anlatıyorsunuz, eşleştirmeyi biz yapıyoruz. İngiltere'de faaliyet tarifiniz SIC koduna çevriliyor ve tescil dosyasında tanımlanıyor. KKTC'de faaliyet konusuna göre ek izin veya ruhsat gerekebiliyor. Yanlış seçim ek işlem, bazen yeni kuruluş demek; üçünde de bu satır sonradan değil, kuruluşta doğru yazılıyor.",
      },
      {
        icon: "shield",
        title: "Kod ve marka kimin üstünde",
        line: "Yazılımın ve markanın hangi tüzel kişide duracağı kuruluş anında belli olsun.",
        detail:
          "Ürün bir kişide, gelir başka bir şirkette duruyorsa sözleşme ve fatura zinciri kopuyor: satan taraf, sattığı ürünün sahibi olduğunu gösteremiyor. Kuruluşta hangi şirketin lisans veren, hangisinin satan taraf olduğunu baştan yazıyoruz. Sonradan devir ayrı bir işlem, ayrı bir maliyet ve bazen ayrı bir vergi konusu.",
      },
    ],
  },

  choose: {
    heading: "Aynı dört başlık, üç ülkede üç ayrı cevap.",
    accent: "üç ayrı cevap.",
    lead: "Önce kısa yol: durumunuz hangisiyse cevap yanında yazıyor. Altında üç ülke yan yana.",
    routes: [
      {
        when: "Kartla ve abonelikle tahsilat ana geliriniz",
        to: ["dubai", "ingiltere"],
        why: "Stripe ve PayPal bu iki ülkedeki şirketle çalışıyor; KKTC şirketiyle çalışmıyor.",
      },
      {
        when: "Ekibi yanınıza taşımak istiyorsunuz",
        to: ["dubai"],
        why: "Şirket üzerinden oturum vizesi başvurusu yapılabilen tek ülke; kota lisans paketine bağlı.",
      },
      {
        when: "Hiç seyahat edemeyecek durumdasınız",
        to: ["ingiltere"],
        why: "Kuruluşun hiçbir adımı yerinde imza istemiyor. Dubai'de vize ve biyometri, KKTC'de banka imzası yerinde atılıyor.",
      },
      {
        when: "Ekip Türkiye'de, tahsilat sözleşme ve havaleyle yürüyor",
        to: ["kktc"],
        why: "Aynı dil, aynı saat dilimi, bir günlük yol; kartla tahsilat gerekmiyorsa işletme maliyeti düşük kalıyor.",
      },
    ],
    note: "Tahsilat satırı ödeme altyapısı tablosundan okunuyor; kanalı açan kurum sağlayıcının kendisidir ve onay garantisi vermiyoruz. Vergi hücreleri genel çerçevedir, kişiye özel görüş değildir.",
    more: {
      line: "Kuruluş maliyeti, tipik süre, faaliyet tanımı ve banka kanalları bu tabloda yok: sektörden bağımsız oldukları için üç ülkenin tam kıyasında duruyorlar.",
      label: "Üç ülkeyi ölçüt ölçüt karşılaştırın",
      href: "/ulkeler",
    },
    ask: "Dördü de tam uymuyorsa ürününüzü, ekibinizi ve tahsilat kanalınızı iletin; hangisinin uygun olduğunu birlikte belirleyelim.",
  },

  countries: [
    /* ---------------------------------------------------------------- Dubai */
    {
      country: "dubai",
      heading: "Dubai'de yazılım şirketi kurmak",
      accent: "yazılım şirketi kurmak",
      badge: "Tahsilat açık, vize alınabiliyor",
      lead: "Yazılım, serbest bölgenin klasik faaliyetlerinden biri: müşteriniz BAE dışındaysa serbest bölge lisansı yetiyor, tahsilat kanallarının hepsi açık ve ekip için oturum vizesi alınabiliyor.",
      fit: [
        {
          icon: "split",
          text: "Kararı satış yaptığınız taraf veriyor: müşteriniz BAE dışındaysa serbest bölge, BAE içindeki şirketlere satıyorsanız mainland.",
        },
        {
          icon: "card",
          text: "SaaS ve ajans profilinde Stripe, PayPal ve Wise bağlantısı kurulabiliyor.",
        },
        {
          icon: "id",
          text: "Ortak ve çalışan vizesi süreç içinde alınıyor; kota aldığınız lisans paketine bağlı.",
        },
      ],
      cells: {
        /* Faaliyet tanımı satırı tablodan çıktı; buradaki şerh o yüzden artık
           lisans sınıfını da söylüyor — Dubai'de yapı ile lisans aynı kararın
           iki yüzü ve bilgi kaybolmasın. */
        structure: {
          value: FACTS.dubai.structure,
          note: "Serbest bölge ticaret lisansı, ticari veya teknoloji faaliyet sınıfıyla; sonradan değiştirmek yeni kuruluş demek.",
        },
        tax: TAX_CELL.dubai,
      },
      limits: [
        FACTS.dubai.limit + "; bu adım vekâletle yürümüyor.", // noktalama zaten cümleyi kapatıyor
        "Kuruluş ve yıllık yenileme maliyeti üç ülkenin en yükseği. İkinci yıl yenilemesini baştan planlamak gerekiyor.",
      ],
    },

    /* ----------------------------------------------------------- İngiltere */
    {
      country: "ingiltere",
      heading: "İngiltere'de yazılım şirketi kurmak",
      accent: "yazılım şirketi kurmak",
      badge: "Baştan sona uzaktan kuruluş",
      lead: "Uzaktan kurulabilen tek seçenek ve yazılım-danışmanlık tarafında sözleşme ile fatura pratiği en oturmuş pazar. Karşılığında kâr kurumlar vergisine tabi ve banka tarafı üçünün en zoru.",
      fit: [
        {
          icon: "check",
          text: "Ltd yapısı Avrupa'daki müşteri ve platformlarda sorunsuz kabul görüyor.",
        },
        {
          icon: "file",
          text: "Yazılım ve danışmanlıkta fatura ve sözleşme tarafı en oturmuş pazar burası.",
        },
        {
          icon: "laptop",
          text: "Hiç seyahat edemeyecekseniz kuruluşun tamamı uzaktan tamamlanıyor.",
        },
      ],
      cells: {
        structure: {
          value: FACTS.ingiltere.structure,
          note: "Kuruluşun hiçbir adımında gitmeniz gerekmiyor; faaliyet SIC koduna çevrilip tescil dosyasında tanımlanıyor.",
        },
        tax: TAX_CELL.ingiltere,
      },
      limits: [
        sentence(FACTS.ingiltere.limit) +
          " Göçmenlik ayrı bir süreç ve bu sayfadaki hiçbir adım onun parçası değil.",
        "Geleneksel bankada yerleşik olmayan ortak için onay oranı düşük; pratikte ödeme kuruluşu hesabıyla başlanıyor.",
      ],
    },

    /* ----------------------------------------------------------------- KKTC */
    {
      country: "kktc",
      heading: "KKTC'de yazılım şirketi kurmak",
      accent: "yazılım şirketi kurmak",
      badge: "Kartla tahsilat kapalı",
      lead: "Türkiye'ye yakın bir geliştirme ekibi kuruyorsanız kuruluş maliyeti Dubai'nin belirgin altında kalıyor. Kartla tahsilat ana kanalınızsa burası doğru adres değil, bunu baştan söylüyoruz.",
      fit: [
        {
          icon: "clock",
          text: "Operasyonunuz Türkiye merkezliyse aynı dil, aynı saat dilimi, bir günlük yol.",
        },
        {
          icon: "wallet",
          text: "Bölgesel ticaret ve hizmet işlerinde işletme maliyeti düşük kalıyor.",
        },
        {
          icon: "receipt",
          text: "Sözleşme, fatura ve muhasebe pratiği Türkiye'ye benzediği için öğrenme eğrisi kısa.",
        },
      ],
      cells: {
        structure: {
          value: FACTS.kktc.structure,
          note: "Tescil kısmı vekâletle yürüyor; faaliyet konusuna göre ek izin veya ruhsat gerekebiliyor.",
        },
        tax: TAX_CELL.kktc,
      },
      limits: [
        "Stripe ve PayPal KKTC şirketiyle çalışmıyor. Kartla tahsilat ana kanalınızsa Dubai veya İngiltere'ye bakmak gerekiyor.",
        "Banka hesabı açılışında yerinde imza isteniyor.",
        sentence(FACTS.kktc.limit) + " Bazı yurt dışı platformlar KKTC şirketini kabul etmiyor.",
      ],
    },
  ],

  /* ------------------------------------------------- Ortac bu alanda ne yapıyor

     UYDURMA HİZMET YOK. Aşağıdaki anahtarların hepsi services.ts'teki gerçek
     ServiceSlug'lar; başlıkları da oradan geliyor, bu dosyadan değil. Buradaki
     tek katkı, var olan hizmetin YAZILIM tarafındaki karşılığını söyleyen bir
     cümle — yeni bir iş tarif etmiyor, yapılan işi bu sektörün diliyle
     anlatıyor. Her cümle sitenin başka bir yerinde zaten yazan bir şeye
     dayanıyor:

       sirket-kurulusu → 1. bölümün "faaliyet hangi sınıfa yazılıyor" ekseni
       banka-hesabi    → services.ts · banking.includes + PAY_MATRIX
       muhasebe        → services.ts · accounting.includes
       oturum-vize     → services.ts · visa.includes + choose.routes[1]
       uyum            → services.ts · compliance.includes

     Rakam, süre, oran ve referans müşteri YOK; onay/garanti ima eden hiçbir
     fiil yok ("başvuruyu yürütüyoruz", "açtırıyoruz" değil). */
  offer: {
    heading: "Yazılım şirketleri için Ortac ne yapıyor?",
    accent: "Ortac ne yapıyor?",
    lead: "Yukarıdaki dört başlık kararı veriyor; aşağıdakiler o kararın arkasındaki işler. Hepsi zaten yürüttüğümüz hizmetler.",
    lines: {
      "sirket-kurulusu":
        "Ne sattığınızı anlatıyorsunuz, kuruluş dosyasındaki karşılığını biz yazıyoruz: lisans sınıfı, faaliyet tanımı ve ürünün hangi tüzel kişide duracağı kuruluş anında belirleniyor.",
      "banka-hesabi":
        "Yazılımda belirleyici satır tahsilat. Kurumsal hesap başvurusunun dosyasını hazırlayıp süreci yürütüyoruz; kart ve abonelik altyapısının şirketinizle çalışıp çalışmadığını ülke seçilmeden önce konuşuyoruz.",
      muhasebe:
        "Abonelik geliri her ay tekrar ediyor, dolayısıyla defter de her ay tekrar ediyor: aylık kayıt, dönemsel beyanlar ve yıllık mali tablolar aynı döngüde yürüyor.",
      "oturum-vize":
        "Geliştiricileri yanınıza taşıyacaksanız (şirket üzerinden oturum vizesi bugün yalnızca Dubai'de mümkün) kota, sağlık kontrolü ve kimlik adımları kuruluş planının içinde duruyor.",
    },
    note: "Hizmetin kapsamı, süresi ve bedeli ülkeye göre değişiyor; her birinin ayrıntısı ilgili ülke sayfasında satır satır yazılı.",
  },

  /* SSS · cevapların hepsi bu sayfada ya da ülke belgelerinde zaten yazan
     olgular: tahsilat (PAY_MATRIX), Stripe'ın İngiltere'de banka hesabı
     istemesi (ingiltere-mevzuat · 7), vize (COUNTRY_SERVICES), KDV eşikleri
     (bae-mevzuat · C, ingiltere-mevzuat · 4). */
  faq: [
    {
      q: "Yazılım şirketi için hangi ülke daha uygun?",
      a: "Kartla ve abonelikle tahsilat ana gelirinizse Dubai ya da İngiltere; ekibi yanınıza taşıyacaksanız Dubai; hiç seyahat edemiyorsanız İngiltere; ekip Türkiye'de ve tahsilat havaleyle yürüyorsa KKTC. Karşılaştırma bu sayfanın ikinci bölümünde.",
    },
    {
      q: "Stripe ve PayPal hesabını şirket adına açabilir miyim?",
      a: "Dubai ve İngiltere şirketiyle evet, KKTC şirketiyle hayır. İngiltere'de Stripe aynı ülkede fiziksel bir banka hesabı istiyor. Hesabı sağlayıcı açıyor ve onay garantisi vermiyoruz; başvuru dosyasını biz hazırlıyoruz.",
    },
    {
      q: "Uygulama mağazası geliri hangi hesaba geliyor?",
      a: "Tahsilatı mağaza yapıyor ve size dönemsel ödeme olarak geçiyor. Gelirin şirkette doğması için geliştirici hesabının şirket adına olması ve ödemenin şirketin hesabına gelmesi gerekiyor.",
    },
    {
      q: "Kodun ve markanın sahibi kim olmalı?",
      a: "Satışı yapan şirket ya da ona lisans veren şirket. Ürün bir kişide, gelir şirkette duruyorsa sözleşme ve fatura zinciri kopuyor. Kimin lisans veren, kimin satan taraf olduğunu kuruluşta yazıyoruz; sonradan devir ayrı bir işlem.",
    },
    {
      q: "Geliştirici ekibimi Dubai'ye taşıyabilir miyim?",
      a: "Evet. Dubai, şirket üzerinden oturum vizesi alınabilen tek ülke. Çalışan vizesi kotası aldığınız lisans paketine bağlı ve kuruluş anında seçiliyor.",
    },
    {
      q: "KDV kaydı ne zaman gerekiyor?",
      a: "Dubai'de vergiye tabi tedarik son 12 ayda 375.000 AED'yi aşarsa zorunlu, oran %5. İngiltere'de eşik yıllık £90.000 ciro; şirket fiilen Türkiye'den yönetiliyorsa eşiğin uygulanıp uygulanmadığı ayrıca değerlendiriliyor. KKTC Serbest Liman şirketi KDV mükellefi değil.",
    },
  ],
};

/* ============================================================================
   25.09.2026 · BEŞ YENİ SEKTÖR
   Burak: "diğer tüm sektör sayfalarını da yapsana kral."

   Ana sayfadaki altı sektör kartının beşi "yakında" duruyordu. İskelet
   yazılımla birebir aynı (karar eksenleri → kısa yol + kıyas → üç ülke →
   Ortac → SSS); değişen yalnız sektörün kendi çerçevesi.

   KAYNAK DİSİPLİNİ:
     · ülke olguları (vergi, tahsilat, kuruluş, vize) bu dosyanın üstündeki
       ortak sabitlerden, PAY_MATRIX'ten ve countryContent'ten; yeni bir
       ülke olgusu üretilmedi.
     · sektöre özgü kurum ve kurallar (FCA, CQC, DHA, RERA, ATED, BAE'nin
       dört finans düzenleyicisi, KKTC Merkez Bankası) docs/sektor-mevzuat.md'de
       kaynaklı. Resmî metinde okunamayanlar (KKTC sağlık ruhsatı, yabancı
       ortaklı şirketin KKTC'de taşınmaz edinmesi) sayfaya iddia olarak
       girmedi, teyit listesine soru olarak girdi.
     · rakam, süre ve oran yalnız kaynağı olanlar (KDV eşikleri, ATED'in
       500.000 sterlin eşiği, KKTC yabancı ortak sermayesi).
     · "Ortac ne yapıyor" yalnız kapsamı yazılı dört hizmet için cümle
       taşıyor; hukuki danışmanlık ve pazar araştırmasının kapsamı henüz
       yazılmadı (services.ts · SWAP:DANISMANLIK_KAPSAM), onlara cümle yok.
   SWAP:SECTOR_FRAMING geçerli: sektör çerçevesi müşteri onayına açık.
   ========================================================================= */

/* Altı sektörde aynı kalan cümleler. */
const CHOOSE_NOTE =
  "Tahsilat satırı ödeme altyapısı tablosundan okunuyor; kanalı açan kurum sağlayıcının kendisidir ve onay garantisi vermiyoruz. Vergi hücreleri genel çerçevedir, kişiye özel görüş değildir.";
const CHOOSE_NOTE_NO_PAY = "Vergi hücreleri genel çerçevedir, kişiye özel görüş değildir.";
const CHOOSE_MORE = {
  line: "Kuruluş maliyeti, tipik süre ve banka kanalları bu tabloda yok: sektörden bağımsız oldukları için üç ülkenin tam kıyasında duruyorlar.",
  label: "Üç ülkeyi ölçüt ölçüt karşılaştırın",
  href: "/ulkeler",
};
const OFFER_NOTE =
  "Hizmetin kapsamı, süresi ve bedeli ülkeye göre değişiyor; her birinin ayrıntısı ilgili ülke sayfasında satır satır yazılı.";
const DUBAI_COST = "Kuruluş ve yıllık yenileme maliyeti üç ülkenin en yükseği. İkinci yıl yenilemesini baştan planlamak gerekiyor.";
const UK_BANK = "Geleneksel bankada yerleşik olmayan ortak için onay oranı düşük; pratikte ödeme kuruluşu hesabıyla başlanıyor.";
const TR_HOME = "Şirket fiilen Türkiye'den yönetiliyorsa Türkiye'de vergilenme riski doğabiliyor; kâr payını da Türkiye'de beyan ediyorsunuz.";
const KKTC_PAY = "Stripe, PayPal ve Wise KKTC şirketiyle çalışmıyor.";
const KKTC_STRUCTURE_NOTE = "En az iki ortak; tescil vekâletle yürüyor, yabancı ortağın sermaye payı tescile kadar bankada bloke kalıyor.";

/* ------------------------------------------------------------- E-ticaret */
const ETICARET: Sector = {
  slug: "e-ticaret",
  name: "E-ticaret",
  short: "e-ticaret",
  seo: {
    title: "E-ticaret şirketi kurmak: Dubai, İngiltere ve KKTC | Ortac Global",
    description:
      "E-ticaret için yurt dışında şirket: Dubai, İngiltere ve KKTC'de kartla tahsilat, Amazon, Etsy ve Shopify tarafında hangi kanalın açık olduğu, mal akışı ve KDV. Üç ülke yan yana.",
  },
  hero: {
    crumb: "Sektörler · E-ticaret",
    title: "E-ticaret şirketi kurmak.",
    accent: "şirketi kurmak.",
    lead: "Online satışta hangi ülkenin uygun olduğunu tahsilat kanalı, pazar yeri hesabı, malın yolu ve KDV belirliyor. Üç ülke aşağıda yan yana.",
  },
  decide: {
    heading: "E-ticarette kararı dört ölçüt veriyor.",
    accent: "dört ölçüt veriyor.",
    lead: "Müşteri her ülkeden gelebilir; şirketin adresini tahsilatın, pazar yerinin ve malın hangi ülkeden geçtiği belirliyor.",
    axes: [
      {
        icon: "card",
        title: "Kartla tahsilat hangi şirkete açılıyor",
        line: "Stripe, PayPal ve Shopify Payments şirketin kurulduğu ülkeye bakıyor; müşterinin ülkesine değil.",
        detail:
          "Kartla ödeme alan her mağazanın arkasında bir tahsilat hesabı var ve o hesap şirketin ülkesinde açılıyor. Stripe ve PayPal Dubai ve İngiltere şirketiyle çalışıyor, KKTC şirketiyle çalışmıyor. Shopify Payments İngiltere'de İngiliz banka hesabı istiyor. Ülke seçilmeden önce satacağınız kanalın o ülkedeki şirketi kabul edip etmediğini konuşuyoruz.",
      },
      {
        icon: "store",
        title: "Pazar yeri hesabı hangi ülkeden açılıyor",
        line: "Amazon ve Etsy'de satıcı hesabı, şirketin ülkesi satıcı listesinde varsa açılıyor.",
        detail:
          "Amazon UK ve Etsy İngiltere şirketini satıcı olarak kabul ediyor; ikisinin de satıcı ülke listesinde KKTC yok. Pazar yerinden gelen ödeme dönemsel olarak şirketin hesabına geçiyor, dolayısıyla banka hesabı da aynı kuruluş planının parçası.",
      },
      {
        icon: "package",
        title: "Mal nereden çıkıp nereye gidiyor",
        line: "Malın yolu gümrüğü ve KDV'yi, dolayısıyla doğru yapıyı belirliyor.",
        detail:
          "Dijital ürün satıyorsanız bu satır hafif; fiziksel üründe malın hangi ülkeden çıkıp hangisine girdiği gümrüğü ve KDV'yi belirliyor. KKTC Serbest Liman'da bölgeden yurt dışına giden malın kazancı vergiden ve gümrükten muaf, KKTC iç piyasasına giden mal ise gümrük ve KDV'ye tabi. Büyük Britanya'ya mal sokan ya da oradan mal çıkaran şirket için EORI numarası gerekiyor.",
      },
      {
        icon: "receipt",
        title: "KDV kaydı ne zaman gerekiyor",
        line: "Satış eşiği geçince KDV kaydı zorunlu hâle geliyor; eşik ülkeye göre değişiyor.",
        detail:
          "Dubai'de vergiye tabi tedarik son 12 ayda 375.000 AED'yi aşarsa KDV kaydı zorunlu, oran %5. İngiltere'de eşik yıllık £90.000 ciro; şirket fiilen Türkiye'den yönetiliyorsa eşiğin uygulanıp uygulanmadığı ayrıca değerlendiriliyor. KKTC Serbest Liman şirketi KDV mükellefi değil, iç piyasaya giden malda KDV ödeniyor. Eşiğe yaklaşan satışı aylık muhasebe döngüsünde izliyoruz.",
      },
    ],
  },
  choose: {
    heading: "Aynı ölçütler, üç ülkede üç ayrı cevap.",
    accent: "üç ayrı cevap.",
    lead: "Önce kısa yol: durumunuz hangisiyse cevap yanında yazıyor. Altında üç ülke yan yana.",
    routes: [
      {
        when: "Kartla tahsilat ana geliriniz",
        to: ["dubai", "ingiltere"],
        why: "Stripe ve PayPal bu iki ülkedeki şirketle çalışıyor; KKTC şirketiyle çalışmıyor.",
      },
      {
        when: "Amazon UK ya da Etsy'de satacaksınız",
        to: ["ingiltere"],
        why: "İkisi de İngiltere şirketini satıcı olarak kabul ediyor; KKTC ikisinin de satıcı listesinde yok.",
      },
      {
        when: "Körfez ve Orta Doğu'ya satıyorsunuz",
        to: ["dubai"],
        why: "Yerel şirket, yerel müşteride güven ve ödeme kolaylığı sağlıyor.",
      },
      {
        when: "Malınız Serbest Liman'dan yurt dışına gidiyor",
        to: ["kktc"],
        why: "Bölgeden yurt dışına giden malın kazancı vergiden ve gümrükten muaf; kartla tahsilat gerekmiyorsa işletme maliyeti düşük.",
      },
    ],
    note: CHOOSE_NOTE,
    more: CHOOSE_MORE,
    ask: "Durumunuz bunlardan hiçbirine tam uymuyorsa ürününüzü, satış kanalınızı ve malın yolunu iletin; uygun ülkeyi birlikte belirleyelim.",
  },
  countries: [
    {
      country: "dubai",
      heading: "Dubai'de e-ticaret şirketi kurmak",
      accent: "e-ticaret şirketi kurmak",
      badge: "Tahsilat açık, Körfez'e yakın",
      lead: "Müşteriniz BAE dışındaysa serbest bölge lisansı yetiyor ve tahsilat kanallarının hepsi açık. Körfez'e satıyorsanız yerel şirket müşteride güven ve ödeme kolaylığı sağlıyor.",
      fit: [
        { icon: "split", text: "Kararı satış yaptığınız taraf veriyor: müşteriniz BAE dışındaysa serbest bölge, BAE içindeki müşteriye satıyorsanız mainland." },
        { icon: "card", text: "Stripe, PayPal ve wamo Dubai şirketiyle kurulabiliyor." },
        { icon: "id", text: "Depo ya da ekip Dubai'deyse ortak ve çalışan vizesi süreç içinde alınıyor; kota lisans paketine bağlı." },
      ],
      cells: {
        structure: {
          value: FACTS.dubai.structure,
          note: "Faaliyet kodu ticari lisans sınıfını belirliyor; e-ticaret faaliyeti lisansa kuruluşta doğru sınıfla yazılıyor.",
        },
        tax: TAX_CELL.dubai,
      },
      limits: [
        FACTS.dubai.limit + "; bu adım vekâletle yürümüyor.",
        DUBAI_COST,
        "Vergiye tabi tedarik 375.000 AED eşiğini aşınca KDV kaydı zorunlu; kayıt 30 gün içinde yapılıyor.",
      ],
    },
    {
      country: "ingiltere",
      heading: "İngiltere'de e-ticaret şirketi kurmak",
      accent: "e-ticaret şirketi kurmak",
      badge: "Pazar yerleri ve kart tahsilatı açık",
      lead: "Amazon UK, Etsy, Stripe, PayPal ve Shopify Payments İngiltere şirketiyle çalışıyor ve kuruluşun tamamı uzaktan yürüyor. Karşılığında kâr kurumlar vergisine tabi.",
      fit: [
        { icon: "store", text: "Amazon UK ve Etsy İngiltere şirketini satıcı olarak kabul ediyor." },
        { icon: "card", text: "Shopify Payments İngiltere'de tescilli şirket ve İngiliz banka hesabıyla açılıyor." },
        { icon: "laptop", text: "Kuruluşun hiçbir adımında İngiltere'ye gitmeniz gerekmiyor." },
      ],
      cells: {
        structure: {
          value: FACTS.ingiltere.structure,
          note: "Faaliyet SIC koduna çevrilip tescil dosyasında tanımlanıyor; Büyük Britanya'ya mal sokan ya da oradan çıkaran şirket için EORI numarası gerekiyor.",
        },
        tax: TAX_CELL.ingiltere,
      },
      limits: [
        sentence(FACTS.ingiltere.limit) + " Göçmenlik ayrı bir süreç.",
        "Stripe ve Shopify Payments İngiltere'de fiziksel bir banka hesabı istiyor; hesap planı kuruluşla birlikte yapılıyor. " + UK_BANK,
        TR_HOME,
      ],
    },
    {
      country: "kktc",
      heading: "KKTC'de e-ticaret şirketi kurmak",
      accent: "e-ticaret şirketi kurmak",
      badge: "Kart tahsilatı ve pazar yerleri kapalı",
      lead: "Malınız Serbest Liman'dan yurt dışına gidiyorsa kazanç vergiden ve gümrükten muaf. Kartla tahsilat ya da Amazon ve Etsy ana kanalınızsa burası doğru adres değil; bunu baştan söylüyoruz.",
      fit: [
        { icon: "package", text: "Transit ticaret ve ihracatta Serbest Liman'daki kazanç vergiden ve gümrükten muaf." },
        { icon: "clock", text: "Operasyonunuz Türkiye merkezliyse aynı dil, aynı saat dilimi, bir günlük yol." },
        { icon: "wallet", text: "Ofis kiralamadan, muhasebe ofisiyle adres sözleşmesiyle çalışılabiliyor." },
      ],
      cells: {
        structure: { value: FACTS.kktc.structure, note: KKTC_STRUCTURE_NOTE },
        tax: TAX_CELL.kktc,
      },
      limits: [
        "Stripe, PayPal, Amazon, Etsy ve Shopify Payments'ın ülke listesinde KKTC yok; kartla tahsilat ya da pazar yeri satışı ana kanalınızsa Dubai veya İngiltere'ye bakmak gerekiyor.",
        "Bölgeden KKTC iç piyasasına giden mal muafiyet dışında: gümrük ve KDV ödeniyor.",
        sentence(FACTS.kktc.limit),
      ],
    },
  ],
  offer: {
    heading: "E-ticaret şirketleri için Ortac ne yapıyor?",
    accent: "Ortac ne yapıyor?",
    lead: "Yukarıdaki ölçütler kararı veriyor; aşağıdakiler o kararın arkasındaki işler. Hepsi zaten yürüttüğümüz hizmetler.",
    lines: {
      "sirket-kurulusu":
        "Ne sattığınızı ve nereye sattığınızı anlatıyorsunuz; lisans sınıfını ve faaliyet tanımını kuruluş dosyasına biz yazıyoruz.",
      "banka-hesabi":
        "Kurumsal hesap başvurusunun dosyasını hazırlayıp süreci yürütüyoruz; kart tahsilatı ve pazar yeri ödemelerinin şirketinizle çalışıp çalışmadığını ülke seçilmeden önce konuşuyoruz.",
      muhasebe:
        "Pazar yeri ödemeleri, kart tahsilatları ve iadeler her ay deftere işleniyor; KDV eşiği aynı döngüde izleniyor.",
      "oturum-vize":
        "Depo ya da ekip Dubai'deyse ortak ve çalışan vizesi, sağlık kontrolü ve kimlik adımları kuruluş planının içinde duruyor.",
    },
    note: OFFER_NOTE,
  },
  faq: [
    {
      q: "E-ticaret için hangi ülke daha uygun?",
      a: "Cevabı tahsilat kanalınız veriyor. Kartla ve pazar yerleri üzerinden satıyorsanız Dubai ya da İngiltere; malınız Serbest Liman'dan yurt dışına gidiyor ve tahsilat havaleyle yürüyorsa KKTC. Karşılaştırma bu sayfanın ikinci bölümünde.",
    },
    {
      q: "Stripe ve PayPal hangi ülkelerde açılıyor?",
      a: "İkisi de Dubai ve İngiltere şirketiyle çalışıyor, KKTC şirketiyle çalışmıyor. Hesabı sağlayıcı açıyor ve onay garantisi vermiyoruz; başvuru dosyasını biz hazırlıyoruz.",
    },
    {
      q: "Amazon ve Etsy'de şirket adına satış yapabilir miyim?",
      a: "İngiltere şirketiyle evet: Amazon UK ve Etsy İngiltere şirketini satıcı olarak kabul ediyor. KKTC ikisinin de satıcı ülke listesinde yok.",
    },
    {
      q: "KDV kaydı ne zaman gerekiyor?",
      a: "Dubai'de vergiye tabi tedarik son 12 ayda 375.000 AED'yi aşınca zorunlu, oran %5. İngiltere'de eşik yıllık £90.000 ciro. KKTC Serbest Liman şirketi KDV mükellefi değil; iç piyasaya giden malda KDV ödeniyor.",
    },
    {
      q: "Şirket kurmak için ülkeye gitmem gerekiyor mu?",
      a: "İngiltere'de hiçbir adımda gitmeniz gerekmiyor. Dubai'de vize ve biyometri için bir kez BAE'de bulunmanız gerekiyor. KKTC'de tescil vekâletle yürüyor, banka hesabı açılışında yerinde imza isteniyor.",
    },
    {
      q: "Muhasebe hizmeti de veriyor musunuz?",
      a: "Evet. Pazar yeri ödemeleri, kart tahsilatları ve iadeler aylık defterde işleniyor, beyanlar aynı döngüde veriliyor. Kapsam ve bedel ülkeye göre değişiyor.",
    },
  ],
};

/* ----------------------------------------------------------- Danışmanlık */
const DANISMANLIK: Sector = {
  slug: "danismanlik",
  name: "Danışmanlık",
  short: "danışmanlık",
  seo: {
    title: "Danışmanlık şirketi kurmak: Dubai, İngiltere ve KKTC | Ortac Global",
    description:
      "Yurt dışı müşteriye şirket adına sözleşme ve fatura: Dubai, İngiltere ve KKTC'de danışmanlık şirketi için tahsilat, mukimlik, lisanslı alanlar ve vergi çerçevesi. Üç ülke yan yana.",
  },
  hero: {
    crumb: "Sektörler · Danışmanlık",
    title: "Danışmanlık şirketi kurmak.",
    accent: "şirketi kurmak.",
    lead: "Yurt dışı müşteriye şirket adına sözleşme ve fatura kesmek için hangi ülkenin uygun olduğunu tahsilat, mukimlik ve vergi belirliyor. Üç ülke aşağıda yan yana.",
  },
  decide: {
    heading: "Danışmanlıkta kararı dört ölçüt veriyor.",
    accent: "dört ölçüt veriyor.",
    lead: "Şirketin adresini müşterinin yeri, ödemenin geldiği kanal ve sizin nerede yaşadığınız belirliyor.",
    axes: [
      {
        icon: "file",
        title: "Sözleşmeyi ve faturayı kim kesiyor",
        line: "Müşteri şirketle sözleşme imzalıyor; faturayı da ödemeyi de şirket alıyor.",
        detail:
          "Gelirin şirkette doğması için sözleşme tarafının, faturayı kesenin ve ödemeyi alan hesabın aynı şirket olması gerekiyor. Sözleşme kişi adına, ödeme şirket hesabına geliyorsa zincir kopuyor ve gelirin kime ait olduğu tartışmalı hâle geliyor. Sözleşme tarafını kuruluşta bu zincire göre kuruyoruz.",
      },
      {
        icon: "wallet",
        title: "Ödeme hangi kanaldan geliyor",
        line: "Havale, ödeme kuruluşu ya da kart; kanal ülke seçeneklerini daraltıyor.",
        detail:
          "Kurumsal müşteri çoğunlukla havaleyle ödüyor ve üç ülkede de şirket hesabına gelebiliyor. Wise ve Payoneer Dubai ve İngiltere şirketiyle çalışıyor; Wise'ın ülke listesinde KKTC yok, Payoneer liste yayımlamıyor ve durum başvuruda netleşiyor. Kartla ödeme alacaksanız Stripe ve PayPal da yalnız Dubai ve İngiltere'de açılıyor.",
      },
      {
        icon: "users",
        title: "Siz nerede yaşıyorsunuz",
        line: "Şirketi Türkiye'den yönetiyorsanız vergide şirketin nereden yönetildiği belirleyici olabiliyor.",
        detail:
          "Danışmanlıkta işi yapan çoğu zaman şirketin sahibi. Türkiye'de yaşayıp şirketi fiilen buradan yönetiyorsanız Türkiye'de vergilenme riski doğabiliyor; kâr payını da Türkiye'de beyan ediyorsunuz. Bu değerlendirme kişiye özel ve sitede verilmiyor; yapıyı kurmadan önce görüşmede konuşuyoruz.",
      },
      {
        icon: "scale",
        title: "Alan ayrıca izne bağlı mı",
        line: "Hukuk, vergi temsilciliği ve yatırım danışmanlığı gibi alanlar ek izin ya da kayıt istiyor.",
        detail:
          "Yönetim, strateji, yazılım ve pazarlama danışmanlığı genel bir ticari faaliyet olarak yazılıyor. Bazı alanlar ise ülkenin kurumundan ayrıca izin istiyor: BAE'de vergi idaresi önünde temsil için FTA'nın vergi temsilcisi siciline kayıt, İngiltere'de yatırım danışmanlığı gibi düzenlenmiş finansal faaliyet için FCA izni gerekiyor. Faaliyet tanımını kuruluşta bu ayrıma göre yazıyoruz.",
      },
    ],
  },
  choose: {
    heading: "Aynı ölçütler, üç ülkede üç ayrı cevap.",
    accent: "üç ayrı cevap.",
    lead: "Önce kısa yol: durumunuz hangisiyse cevap yanında yazıyor. Altında üç ülke yan yana.",
    routes: [
      {
        when: "Müşterileriniz Avrupa'da, sözleşmeyle çalışıyorsunuz",
        to: ["ingiltere"],
        why: "Sözleşme, fatura ve tahsilat tarafı en oturmuş pazar; kuruluş baştan sona uzaktan yürüyor.",
      },
      {
        when: "Oturum vizesi de istiyorsunuz",
        to: ["dubai"],
        why: "Şirket üzerinden oturum vizesi başvurusu yapılabilen tek ülke; kota lisans paketine bağlı.",
      },
      {
        when: "Körfez'deki şirketlere danışmanlık veriyorsunuz",
        to: ["dubai"],
        why: "BAE içindeki müşteriye hizmette mainland lisansı gerekiyor; yerel şirket müşteride güven sağlıyor.",
      },
      {
        when: "Müşteri havaleyle ödüyor, maliyeti düşük tutmak istiyorsunuz",
        to: ["kktc"],
        why: "KKTC dışındaki müşteriye yapılan işte Serbest Liman şirketi kurumlar ve gelir vergisi ödemiyor; ödeme havaleyle geliyorsa tahsilat kısıtı yok.",
      },
    ],
    note: CHOOSE_NOTE,
    more: CHOOSE_MORE,
    ask: "Durumunuz bunlardan hiçbirine tam uymuyorsa hizmetinizi, müşterilerinizin yerini ve nerede yaşadığınızı iletin; uygun ülkeyi birlikte belirleyelim.",
  },
  countries: [
    {
      country: "dubai",
      heading: "Dubai'de danışmanlık şirketi kurmak",
      accent: "danışmanlık şirketi kurmak",
      badge: "Vize alınabiliyor, Körfez'e yakın",
      lead: "Müşteriniz BAE dışındaysa serbest bölge, BAE içindeki şirketlere danışmanlık veriyorsanız mainland lisansı. Şirket üzerinden oturum vizesi alınabilen tek ülke.",
      fit: [
        { icon: "split", text: "Kararı müşterinizin yeri veriyor: BAE dışı için serbest bölge, BAE içi için mainland." },
        { icon: "id", text: "Ortak vizesi ve Emirates ID süreç içinde alınıyor." },
        { icon: "card", text: "Wise, Payoneer, Stripe ve PayPal Dubai şirketiyle kurulabiliyor." },
      ],
      cells: {
        structure: {
          value: FACTS.dubai.structure,
          note: "Faaliyet kodu lisans sınıfını belirliyor; vergi temsilciliği gibi alanlar ayrıca FTA kaydı istiyor.",
        },
        tax: TAX_CELL.dubai,
      },
      limits: [FACTS.dubai.limit + "; bu adım vekâletle yürümüyor.", DUBAI_COST],
    },
    {
      country: "ingiltere",
      heading: "İngiltere'de danışmanlık şirketi kurmak",
      accent: "danışmanlık şirketi kurmak",
      badge: "Sözleşme ve fatura pratiği oturmuş",
      lead: "Avrupa'daki müşteriye danışmanlık veriyorsanız Ltd yapısı sözleşme ve fatura tarafında sorunsuz kabul görüyor; kuruluş baştan sona uzaktan.",
      fit: [
        { icon: "check", text: "Ltd yapısı Avrupa'daki müşteri ve platformlarda sorunsuz kabul görüyor." },
        { icon: "file", text: "Danışmanlıkta sözleşme ve fatura tarafı en oturmuş pazar." },
        { icon: "laptop", text: "Hiç seyahat etmeden kuruluş tamamlanıyor." },
      ],
      cells: {
        structure: {
          value: FACTS.ingiltere.structure,
          note: "Faaliyet SIC koduna çevriliyor; yatırım danışmanlığı gibi düzenlenmiş finansal faaliyet FCA izni istiyor.",
        },
        tax: TAX_CELL.ingiltere,
      },
      limits: [sentence(FACTS.ingiltere.limit) + " Göçmenlik ayrı bir süreç.", TR_HOME, UK_BANK],
    },
    {
      country: "kktc",
      heading: "KKTC'de danışmanlık şirketi kurmak",
      accent: "danışmanlık şirketi kurmak",
      badge: "Havaleyle çalışan hizmette vergi yok",
      lead: "Yurt dışındaki müşteriye hizmet veriyor ve ödemeyi havaleyle alıyorsanız Serbest Liman şirketi KKTC dışındaki işte kurumlar ve gelir vergisi ödemiyor. Kartla tahsilat gerekiyorsa burası uygun değil.",
      fit: [
        { icon: "receipt", text: "KKTC dışındaki işte kurumlar ve gelir vergisi yok, KDV yok." },
        { icon: "clock", text: "Türkiye'ye yakın: aynı dil, aynı saat dilimi, bir günlük yol." },
        { icon: "wallet", text: "Ofis kiralamadan adres sözleşmesiyle çalışılabiliyor." },
      ],
      cells: {
        structure: { value: FACTS.kktc.structure, note: KKTC_STRUCTURE_NOTE },
        tax: TAX_CELL.kktc,
      },
      limits: [
        KKTC_PAY + " Ödeme havaleyle gelmiyorsa Dubai veya İngiltere'ye bakmak gerekiyor.",
        TR_HOME,
        sentence(FACTS.kktc.limit),
      ],
    },
  ],
  offer: {
    heading: "Danışmanlık şirketleri için Ortac ne yapıyor?",
    accent: "Ortac ne yapıyor?",
    lead: "Yukarıdaki ölçütler kararı veriyor; aşağıdakiler o kararın arkasındaki işler. Hepsi zaten yürüttüğümüz hizmetler.",
    lines: {
      "sirket-kurulusu":
        "Faaliyet tanımını ve sözleşme tarafını kuruluş dosyasına doğru yazıyoruz; izne bağlı bir alandaysanız gereken iznin kapsamını önden konuşuyoruz.",
      "banka-hesabi":
        "Kurumsal hesap ve ödeme kuruluşu başvurularını dosyasıyla birlikte yürütüyoruz; müşteriden gelecek ödeme kanalını ülke seçilmeden önce konuşuyoruz.",
      muhasebe: "Kestiğiniz faturalar ve gelen ödemeler aylık defterde eşleştiriliyor; beyanlar aynı döngüde veriliyor.",
      "oturum-vize": "Dubai'de şirket üzerinden oturum vizesi, sağlık kontrolü ve Emirates ID adımları kuruluş planının içinde.",
    },
    note: OFFER_NOTE,
  },
  faq: [
    {
      q: "Danışmanlık için hangi ülke daha uygun?",
      a: "Müşterinizin yeri ve ödeme kanalı belirliyor. Avrupa'daki müşteriye sözleşmeyle çalışıyorsanız İngiltere; oturum vizesi de istiyorsanız Dubai; ödeme havaleyle geliyor ve maliyeti düşük tutmak istiyorsanız KKTC.",
    },
    {
      q: "Müşteri sözleşmesini kişi olarak mı, şirket olarak mı imzalamalıyım?",
      a: "Şirket olarak. Gelirin şirkette doğması için sözleşme tarafı, faturayı kesen ve ödemeyi alan hesabın aynı şirket olması gerekiyor.",
    },
    {
      q: "Türkiye'de yaşıyorum, vergiyi nerede öderim?",
      a: "Şirket kurulduğu ülkenin kuralına göre vergileniyor; kâr size kâr payı olarak geçerse Türkiye'de beyan ediliyor. Şirket fiilen Türkiye'den yönetiliyorsa Türkiye'de vergilenme riski doğabiliyor. Kişiye özel vergi görüşünü sitede vermiyoruz; görüşmede konuşuyoruz.",
    },
    {
      q: "Hukuk ya da vergi alanında danışmanlık verebilir miyim?",
      a: "Bu alanlar düzenlenmiş meslekler ve ülkenin kurumundan ayrıca izin ya da kayıt istiyor; örneğin BAE'de vergi temsilciliği FTA siciline kayıt istiyor. Faaliyet tanımını kuruluşta bu ayrıma göre yazıyor, gereken iznin kapsamını önden konuşuyoruz.",
    },
    {
      q: "Ödemeleri Wise veya Payoneer ile alabilir miyim?",
      a: "Dubai ve İngiltere şirketiyle evet. Wise'ın ülke listesinde KKTC yok; Payoneer liste yayımlamıyor ve durum başvuruda netleşiyor.",
    },
    {
      q: "Şirket kurmak oturum hakkı veriyor mu?",
      a: "Yalnız Dubai'de: şirket üzerinden ortak vizesi ve Emirates ID alınabiliyor. İngiltere'de şirket kurmak oturum hakkı vermiyor. KKTC'de şirket sahipliği kendiliğinden izin vermiyor; çalışma izni ayrıca alınıyor.",
    },
  ],
};

/* ------------------------------------------------------------ Gayrimenkul
   İki ayrı yol tek sayfada: mülkü şirket altında tutmak (yatırım yapısı) ve
   başkasının mülkünde komisyonculuk (lisanslı faaliyet). Kaynaklar:
   docs/sektor-mevzuat.md · Gayrimenkul.
   KKTC BURADA ÖNERİLMİYOR ve bunu açıkça söylüyor: sitenin KKTC ürünü
   Serbest Liman şirketi ve KKTC'deki mülk iç piyasa işi; muafiyet
   uygulanmıyor. Kısa yol listesi de bu yüzden KKTC'ye yönlendirmiyor. */
const GAYRIMENKUL: Sector = {
  slug: "gayrimenkul",
  name: "Gayrimenkul",
  short: "gayrimenkul",
  payRow: false,
  seo: {
    title: "Gayrimenkul için şirket kurmak: Dubai, İngiltere ve KKTC | Ortac Global",
    description:
      "Mülkü şirket altında tutmak ya da gayrimenkul komisyonculuğu: Dubai, İngiltere ve KKTC'de şirketin mülk sahipliği, kira geliri, lisans ve vergi çerçevesi. Üç ülke yan yana.",
  },
  hero: {
    crumb: "Sektörler · Gayrimenkul",
    title: "Gayrimenkul için şirket kurmak.",
    accent: "şirket kurmak.",
    lead: "Mülkü şirket altında tutmak ile başkasının mülkünde komisyonculuk yapmak iki ayrı yol. İkisinde de ülkeyi mülkün yeri, şirketin mülk sahipliği ve vergi belirliyor.",
  },
  decide: {
    heading: "Gayrimenkulde kararı dört ölçüt veriyor.",
    accent: "dört ölçüt veriyor.",
    lead: "Kararı mülkün yeri, şirketin mülke sahip olup olamayacağı, kiranın aktığı hesap ve işin türü veriyor.",
    axes: [
      {
        icon: "home",
        title: "Mülk hangi ülkede",
        line: "Tapu ve mülkle ilgili vergiler mülkün bulunduğu ülkenin kuralına bağlı.",
        detail:
          "Mülkün tescili, alımda ödenen harçlar ve yıllık vergiler mülkün bulunduğu ülkenin kuralına bağlı; şirketin kurulduğu yer bu kuralları değiştirmiyor. Bu yüzden karar çoğu zaman mülkten geriye doğru veriliyor: önce mülk, sonra şirket.",
      },
      {
        icon: "building",
        title: "Şirket mülke sahip olabiliyor mu",
        line: "Her şirket türü her ülkede mülk sahibi olarak kaydolamıyor.",
        detail:
          "Dubai'de serbest bölge şirketinin Dubai'deki mülkü kendi adına tescil ettirebilmesi, Dubai Tapu Dairesi'nin o serbest bölgeyle yaptığı düzenlemeye bağlı. İngiltere'de mülkün bir Ltd şirket altında tutulması yaygın bir yapı. KKTC'de yabancıların taşınmaz edinmesi Bakanlar Kurulu iznine bağlı; şirket yapısı izin sürecinden önce değerlendiriliyor.",
      },
      {
        icon: "wallet",
        title: "Kira nereye akıyor",
        line: "Kira şirket hesabına geliyorsa gelir de gider de şirketin defterinde.",
        detail:
          "Mülk şirket altındaysa kira sözleşmesinin tarafı ve kiranın aktığı hesap şirket oluyor; bakım, sigorta ve yönetim giderleri de aynı defterde. Kiranın kişisel hesaba gelmesi mülkün şirket altında durmasının anlamını ortadan kaldırıyor.",
      },
      {
        icon: "key",
        title: "İş komisyonculuk mu",
        line: "Başkasının mülkünü satmak ya da kiraya vermek ayrı bir lisans istiyor.",
        detail:
          "Kendi mülkünüzü şirket altında tutmak bir yatırım yapısı; başkasının mülkünü satmak ya da kiraya vermek ise komisyonculuk. Dubai'de satış ve kiralama komisyonculuğu Dubai Tapu Dairesi'ne bağlı RERA'nın lisansını, çalışanlar için de uygulama kartı istiyor. Faaliyet tanımını kuruluşta bu ayrıma göre yazıyoruz.",
      },
    ],
  },
  choose: {
    heading: "Mülkün yeri çoğu zaman ülkeyi kendisi seçiyor.",
    accent: "ülkeyi kendisi seçiyor.",
    lead: "Önce kısa yol: durumunuz hangisiyse cevap yanında yazıyor. Altında üç ülke yan yana.",
    routes: [
      {
        when: "Mülk İngiltere'de",
        to: ["ingiltere"],
        why: "Mülkün Ltd şirket altında tutulması yaygın; kira kârı kurumlar vergisine tabi, 500.000 sterlin üstü konutta her yıl ATED beyanı var.",
      },
      {
        when: "Mülk Dubai'de",
        to: ["dubai"],
        why: "Şirket adına tescil, serbest bölgenin Dubai Tapu Dairesi ile düzenlemesine bağlı; bölge seçimi bu yüzden kuruluşta yapılıyor.",
      },
      {
        when: "Dubai'de komisyonculuk yapacaksınız",
        to: ["dubai"],
        why: "Satış ve kiralama komisyonculuğu RERA lisansı ve çalışan uygulama kartıyla yürüyor.",
      },
      {
        when: "Mülkle birlikte oturum da istiyorsunuz",
        to: ["dubai"],
        why: "Şirket üzerinden oturum vizesi başvurusu yapılabilen tek ülke.",
      },
    ],
    note: CHOOSE_NOTE_NO_PAY,
    more: CHOOSE_MORE,
    ask: "Mülkünüzün yerini, sahiplik planınızı ve kiranın nasıl akacağını iletin; yapıyı birlikte belirleyelim.",
  },
  countries: [
    {
      country: "dubai",
      heading: "Dubai'de gayrimenkul şirketi kurmak",
      accent: "gayrimenkul şirketi kurmak",
      badge: "Komisyonculuk RERA lisansıyla",
      lead: "Dubai'de iki ayrı yol var: mülkü şirket adına tutmak ve başkasının mülkünde komisyonculuk yapmak. İkisi farklı lisans ve farklı kayıt istiyor.",
      fit: [
        { icon: "building", text: "Serbest bölge şirketinin Dubai'de mülk sahibi olarak kaydı, bölgenin Tapu Dairesi ile düzenlemesine bağlı; bölge seçimi kuruluşta yapılıyor." },
        { icon: "key", text: "Satış ve kiralama komisyonculuğu Dubai Tapu Dairesi'ne bağlı RERA lisansıyla yürüyor." },
        { icon: "id", text: "Şirket üzerinden oturum vizesi alınabilen tek ülke." },
      ],
      cells: {
        structure: {
          value: FACTS.dubai.structure,
          note: "Mainland ya da serbest bölge seçimi, mülkün tescilini ve komisyonculuk lisansını birlikte belirliyor.",
        },
        tax: TAX_CELL.dubai,
      },
      limits: [
        FACTS.dubai.limit + "; bu adım vekâletle yürümüyor.",
        DUBAI_COST,
        "Mülkün şirket adına tescili her serbest bölgede mümkün değil; bölge seçimi tescilden önce yapılıyor.",
      ],
    },
    {
      country: "ingiltere",
      heading: "İngiltere'de gayrimenkul şirketi kurmak",
      accent: "gayrimenkul şirketi kurmak",
      badge: "Mülk için yaygın şirket yapısı",
      lead: "İngiltere'de mülkü bir Ltd şirket altında tutmak yaygın ve kuruluş uzaktan yürüyor. Kira kârı kurumlar vergisine tabi; değeri yüksek konutta her yıl ayrı bir beyan var.",
      fit: [
        { icon: "building", text: "Mülkün Ltd şirket altında tutulması yaygın; her mülk için ayrı şirket kurulabiliyor." },
        { icon: "file", text: "Kira sözleşmesi ve gelir şirket adına; giderler aynı defterde." },
        { icon: "laptop", text: "Kuruluşun hiçbir adımında İngiltere'ye gitmeniz gerekmiyor." },
      ],
      cells: {
        structure: {
          value: FACTS.ingiltere.structure,
          note: "Kira kârı kurumlar vergisine tabi; 500.000 sterlin üstü konut için şirket her yıl ATED beyanı veriyor.",
        },
        tax: TAX_CELL.ingiltere,
      },
      limits: [
        sentence(FACTS.ingiltere.limit) + " Göçmenlik ayrı bir süreç.",
        "500.000 sterlin üstü konutu şirket altında tutan her yıl ATED beyanı veriyor ve değer bandına göre vergi ödüyor; muafiyetler beyanla talep ediliyor.",
        UK_BANK,
      ],
    },
    {
      country: "kktc",
      heading: "KKTC'de gayrimenkul şirketi kurmak",
      accent: "gayrimenkul şirketi kurmak",
      badge: "Mülk iç piyasada, muafiyet yok",
      lead: "KKTC'deki mülk iç piyasa işi: Serbest Liman şirketinin vergi muafiyeti burada uygulanmıyor. Yabancıların taşınmaz edinmesi de Bakanlar Kurulu iznine bağlı; yapıyı mülke göre birlikte değerlendiriyoruz.",
      fit: [
        { icon: "clock", text: "Türkiye'ye yakın: aynı dil, aynı saat dilimi, bir günlük yol." },
        { icon: "receipt", text: "Sözleşme ve muhasebe pratiği Türkiye'ye benzediği için öğrenme eğrisi kısa." },
        { icon: "globe", text: "Mülk KKTC dışındaysa Serbest Liman şirketinin KKTC dışındaki işte vergi muafiyeti geçerli." },
      ],
      cells: {
        structure: {
          value: FACTS.kktc.structure,
          note: "Serbest Liman şirketi iç piyasada gümrük ve KDV ödüyor; KKTC'deki mülk için muafiyetin anlamı kalmıyor.",
        },
        tax: TAX_CELL.kktc,
      },
      limits: [
        "KKTC'deki mülkün kira ve satış geliri iç piyasa işi; Serbest Liman'ın vergi muafiyeti uygulanmıyor.",
        "Yabancıların taşınmaz edinmesi İçişleri Bakanlığı başvurusu ve Bakanlar Kurulu iznine bağlı.",
        sentence(FACTS.kktc.limit),
      ],
    },
  ],
  offer: {
    heading: "Gayrimenkul yatırımcıları için Ortac ne yapıyor?",
    accent: "Ortac ne yapıyor?",
    lead: "Yukarıdaki ölçütler kararı veriyor; aşağıdakiler o kararın arkasındaki işler. Hepsi zaten yürüttüğümüz hizmetler.",
    lines: {
      "sirket-kurulusu":
        "Mülkü tutacak ya da komisyonculuk yapacak şirketi, mülkün tescil şartlarına ve lisansa göre kuruyoruz; faaliyet tanımı bu ayrıma göre yazılıyor.",
      "banka-hesabi": "Kiranın akacağı kurumsal hesabın başvuru dosyasını hazırlayıp süreci yürütüyoruz.",
      muhasebe: "Kira gelirleri ve mülk giderleri aylık defterde; beyanlar ve yıllık mali tablolar aynı döngüde.",
      "oturum-vize": "Dubai'de şirket üzerinden oturum vizesi, sağlık kontrolü ve Emirates ID adımları kuruluş planının içinde.",
    },
    note: OFFER_NOTE,
  },
  faq: [
    {
      q: "Mülkü şahsen mi, şirket üzerinden mi almalıyım?",
      a: "Cevabı mülkün bulunduğu ülkenin kuralları ve sizin vergi durumunuz veriyor; kişiye özel görüşü sitede vermiyoruz. Şirket yapısının anlamı, kira sözleşmesinin, gelirin ve giderlerin tek bir defterde toplanması.",
    },
    {
      q: "Dubai'de şirket adına mülk alınabiliyor mu?",
      a: "Serbest bölge şirketinin Dubai'deki mülkü kendi adına tescil ettirebilmesi, Dubai Tapu Dairesi'nin o serbest bölgeyle yaptığı düzenlemeye bağlı. Bölge seçimini bu yüzden kuruluşta, mülkle birlikte yapıyoruz.",
    },
    {
      q: "Dubai'de gayrimenkul komisyonculuğu için ne gerekiyor?",
      a: "Satış ve kiralama komisyonculuğu Dubai Tapu Dairesi'ne bağlı RERA'nın lisansını istiyor; lisanstaki faaliyet, çalışan uygulama kartını almadan yürütülemiyor.",
    },
    {
      q: "İngiltere'de şirket üzerinden mülk alırsam hangi vergiler çıkıyor?",
      a: "Şirketin kira kârı kurumlar vergisine tabi. 500.000 sterlin üstü konutu olan şirket her yıl ATED beyanı veriyor ve değer bandına göre vergi ödüyor; bazı durumlarda muafiyet beyanla talep ediliyor.",
    },
    {
      q: "KKTC'de gayrimenkul için Serbest Liman şirketi uygun mu?",
      a: "Hayır. KKTC'deki mülk iç piyasa işi ve Serbest Liman'ın vergi muafiyeti orada uygulanmıyor. Yabancıların taşınmaz edinmesi de Bakanlar Kurulu iznine bağlı.",
    },
  ],
};

/* ------------------------------------------------------ Finans ve yatırım
   Kurumlar: docs/sektor-mevzuat.md · Finans. Sayfanın tek tezi: izin önce,
   şirket sonra. Rakam, süre ve "şu faaliyet izin istemez" gibi kesin hüküm
   yok; sınırın nerede olduğunu kuruluştan önce netleştirdiğimizi söylüyor. */
const FINANS: Sector = {
  slug: "finans-ve-yatirim",
  name: "Finans ve yatırım",
  short: "finans",
  payRow: false,
  seo: {
    title: "Finans ve yatırım şirketi kurmak: Dubai, İngiltere ve KKTC | Ortac Global",
    description:
      "Finansal faaliyet için yurt dışında şirket: Dubai, İngiltere ve KKTC'de hangi faaliyetin lisansa tabi olduğu, hangi kurumun baktığı ve kuruluşla lisansın nasıl birlikte planlandığı. Üç ülke yan yana.",
  },
  hero: {
    crumb: "Sektörler · Finans ve yatırım",
    title: "Finans ve yatırım şirketi kurmak.",
    accent: "şirketi kurmak.",
    lead: "Finansal faaliyet üç ülkede de çoğunlukla lisansa tabi. Hangi faaliyetin izin istediğini ve hangi kurumun baktığını kuruluştan önce netleştiriyoruz.",
  },
  decide: {
    heading: "Finansta kararı önce izin veriyor.",
    accent: "önce izin veriyor.",
    lead: "Şirketi kurmak işin küçük kısmı; asıl soru faaliyetin lisansa tabi olup olmadığı ve lisansı hangi kurumun verdiği.",
    axes: [
      {
        icon: "shield",
        title: "Faaliyet lisansa tabi mi",
        line: "Müşteri parası yönetmek, yatırım danışmanlığı, ödeme ve finansman hizmetleri çoğu ülkede izin istiyor.",
        detail:
          "Kendi yatırımlarınızı şirket altında toplamak ile müşterinin parasını yönetmek ya da ona yatırım tavsiyesi vermek hukuken farklı şeyler. İkinci grup düzenlenmiş faaliyet: İngiltere'de finansal hizmet veren firmaların çoğu FCA izni ya da kaydı istiyor, BAE'de faaliyetin türüne ve yerine göre dört kurumdan biri bakıyor. Faaliyetinizin hangi tarafta olduğunu kuruluş dosyasını açmadan önce netleştiriyoruz.",
      },
      {
        icon: "landmark",
        title: "Hangi kurum bakıyor",
        line: "İzni veren kurum faaliyetin türüne ve şirketin kurulduğu yere göre değişiyor.",
        detail:
          "BAE'de aynı faaliyet mainland'de Merkez Bankası ya da Menkul Kıymetler ve Emtia Kurumu'nun (SCA), DIFC'de DFSA'nın, ADGM'de FSRA'nın kapsamına girebiliyor; şirketin yeri bu yüzden izinle birlikte seçiliyor. İngiltere'de FCA. KKTC'de finansal kiralama, faktoring, finansman ve elektronik ödeme KKTC Merkez Bankası düzenlemelerine tabi.",
      },
      {
        icon: "users",
        title: "Ortaklar ve yöneticiler",
        line: "Lisanslı faaliyette kurum yalnız şirketi değil, arkasındaki kişileri de inceliyor.",
        detail:
          "Düzenleyici kurum başvuruda şirketin ortaklarını, yöneticilerini ve paranın kaynağını da inceliyor. Bu dosya kuruluş dosyasından ağır ve takvimi kurumda; hazırlığı kuruluşla paralel yürütüyoruz.",
      },
      {
        icon: "wallet",
        title: "Banka hesabı",
        line: "Banka, finansal faaliyet yürüten şirketin izin durumunu belgeli görmek istiyor.",
        detail:
          "Banka hesap başvurusunda faaliyetin izin durumunu, ortaklık yapısını ve paranın kaynağını belgeli görmek istiyor. İzin dosyası ile banka dosyasını aynı planın parçası olarak hazırlıyoruz; hesap kararı bankaya ait.",
      },
    ],
  },
  choose: {
    heading: "İzin nerede, şirket orada kuruluyor.",
    accent: "şirket orada kuruluyor.",
    lead: "Önce kısa yol: durumunuz hangisiyse cevap yanında yazıyor. Altında üç ülke yan yana.",
    routes: [
      {
        when: "Kendi yatırımlarınızı şirket altında topluyorsunuz",
        to: ["dubai", "ingiltere"],
        why: "Müşteri parası yönetilmiyorsa faaliyet ayrı bir finansal lisans istemeyebiliyor; kapsamı kuruluştan önce netleştiriyoruz.",
      },
      {
        when: "Müşteri parası yönetecek ya da yatırım danışmanlığı vereceksiniz",
        to: ["dubai", "ingiltere"],
        why: "Faaliyet lisansa tabi: İngiltere'de FCA, BAE'de faaliyete ve yere göre Merkez Bankası, SCA, DFSA ya da FSRA.",
      },
      {
        when: "Körfez'deki yatırımcılara hizmet vereceksiniz",
        to: ["dubai"],
        why: "DIFC ve ADGM gibi finans merkezleri kendi düzenleyicisiyle çalışıyor; şirketin yeri izinle birlikte seçiliyor.",
      },
    ],
    note: CHOOSE_NOTE_NO_PAY,
    more: CHOOSE_MORE,
    ask: "Faaliyetinizi, kime hizmet vereceğinizi ve paranın kimde duracağını iletin; iznin kapsamını ve ülkeyi birlikte belirleyelim.",
  },
  countries: [
    {
      country: "dubai",
      heading: "Dubai'de finans ve yatırım şirketi kurmak",
      accent: "finans ve yatırım şirketi kurmak",
      badge: "Faaliyete göre dört ayrı düzenleyici",
      lead: "BAE'de finansal faaliyete, faaliyetin türüne ve yerine göre Merkez Bankası, SCA, DIFC'de DFSA ya da ADGM'de FSRA bakıyor. Şirketin kurulacağı yer bu yüzden izinle birlikte seçiliyor.",
      fit: [
        { icon: "landmark", text: "DIFC ve ADGM, kendi düzenleyicisi olan iki ayrı finans merkezi." },
        { icon: "split", text: "Holding ve kendi yatırımları için yapı, müşteriye hizmetten ayrı kuruluyor." },
        { icon: "id", text: "Şirket üzerinden oturum vizesi alınabilen tek ülke." },
      ],
      cells: {
        structure: {
          value: FACTS.dubai.structure,
          note: "Lisanslı finansal faaliyette yer, izni veren kurumla birlikte seçiliyor; DIFC ve ADGM ayrı çerçeve.",
        },
        tax: TAX_CELL.dubai,
      },
      limits: [
        FACTS.dubai.limit + "; bu adım vekâletle yürümüyor.",
        "Lisanslı finansal faaliyet sıradan bir ticari lisansla yürütülemiyor; izin süreci ayrı ve takvimi kurumda.",
        DUBAI_COST,
      ],
    },
    {
      country: "ingiltere",
      heading: "İngiltere'de finans ve yatırım şirketi kurmak",
      accent: "finans ve yatırım şirketi kurmak",
      badge: "Düzenlenmiş faaliyet FCA izniyle",
      lead: "Holding ve kendi yatırımlarınız için Ltd yapısı uzaktan kuruluyor. Müşteriye finansal hizmet verecekseniz faaliyetin çoğu FCA izni ya da kaydı istiyor ve izin kuruluştan ayrı yürüyor.",
      fit: [
        { icon: "check", text: "Ltd yapısı holding ve yatırım şirketi olarak yaygın kullanılıyor." },
        { icon: "laptop", text: "Şirketin kuruluşu uzaktan tamamlanıyor." },
        { icon: "shield", text: "İzin gerektiren faaliyetin kapsamı ve başvuru dosyası kuruluşla birlikte planlanıyor." },
      ],
      cells: {
        structure: {
          value: FACTS.ingiltere.structure,
          note: "Companies House kuruluşu izin vermiyor; düzenlenmiş faaliyet ayrıca FCA izni ya da kaydı istiyor.",
        },
        tax: TAX_CELL.ingiltere,
      },
      limits: [
        sentence(FACTS.ingiltere.limit) + " Göçmenlik ayrı bir süreç.",
        "FCA izni gerektiren faaliyet izin alınmadan yürütülemiyor; izin süreci kuruluştan ayrı ve takvimi FCA'da.",
        UK_BANK,
      ],
    },
    {
      country: "kktc",
      heading: "KKTC'de finans ve yatırım şirketi kurmak",
      accent: "finans ve yatırım şirketi kurmak",
      badge: "Merkez Bankası düzenlemesine tabi",
      lead: "KKTC'de finansal kiralama, faktoring, finansman ve elektronik ödeme KKTC Merkez Bankası düzenlemelerine tabi. Serbest Liman şirketi bu faaliyetler için ayrı bir iznin yerine geçmiyor.",
      fit: [
        { icon: "clock", text: "Türkiye'ye yakın: aynı dil, aynı saat dilimi, bir günlük yol." },
        { icon: "receipt", text: "Sözleşme ve muhasebe pratiği Türkiye'ye benzediği için öğrenme eğrisi kısa." },
        { icon: "globe", text: "Döviz bulundurma ve yurt dışına transfer serbest." },
      ],
      cells: {
        structure: { value: FACTS.kktc.structure, note: KKTC_STRUCTURE_NOTE },
        tax: TAX_CELL.kktc,
      },
      limits: [
        "Finansal faaliyet KKTC Merkez Bankası düzenlemelerine tabi; Serbest Liman şirketi bu iznin yerine geçmiyor.",
        KKTC_PAY,
        sentence(FACTS.kktc.limit),
      ],
    },
  ],
  offer: {
    heading: "Finans ve yatırım şirketleri için Ortac ne yapıyor?",
    accent: "Ortac ne yapıyor?",
    lead: "Yukarıdaki ölçütler kararı veriyor; aşağıdakiler o kararın arkasındaki işler. Hepsi zaten yürüttüğümüz hizmetler.",
    lines: {
      "sirket-kurulusu":
        "Faaliyetin lisansa tabi olup olmadığını ve hangi kurumun baktığını kuruluş dosyasından önce netleştiriyoruz; şirketin yeri izinle birlikte seçiliyor.",
      "banka-hesabi":
        "Hesap başvurusunda bankanın göreceği faaliyet, ortaklık ve paranın kaynağı belgelerini izin dosyasıyla uyumlu hazırlıyoruz.",
      muhasebe: "Defter, beyanlar ve yıllık mali tablolar aylık döngüde; denetim gerektiren durumda dosya hazır tutuluyor.",
      "oturum-vize": "Dubai'de şirket üzerinden oturum vizesi, sağlık kontrolü ve Emirates ID adımları kuruluş planının içinde.",
    },
    note: OFFER_NOTE,
  },
  faq: [
    {
      q: "Yatırım şirketi kurmak için lisans gerekiyor mu?",
      a: "Faaliyete bağlı. Kendi yatırımlarınızı şirket altında toplamak ile müşterinin parasını yönetmek ya da ona yatırım tavsiyesi vermek farklı şeyler; ikincisi üç ülkede de düzenlenmiş faaliyet. Sınırın nerede olduğunu kuruluştan önce netleştiriyoruz.",
    },
    {
      q: "BAE'de finansal faaliyete hangi kurum bakıyor?",
      a: "Faaliyetin türüne ve yerine göre: mainland'de Merkez Bankası ya da SCA, DIFC'de DFSA, ADGM'de FSRA. Şirketin kurulacağı yer bu yüzden izinle birlikte seçiliyor.",
    },
    {
      q: "İngiltere'de Ltd kurmak finansal hizmet vermeye yetiyor mu?",
      a: "Hayır. Companies House kuruluşu izin vermiyor; finansal hizmet veren firmaların çoğu FCA izni ya da kaydı istiyor ve izin süreci kuruluştan ayrı yürüyor.",
    },
    {
      q: "Lisans ne kadar sürüyor?",
      a: "Takvimi izni veren kurum belirliyor ve süre taahhüdü vermiyoruz. Kurum şirketin yanında ortakları, yöneticileri ve paranın kaynağını da incelediği için hazırlığı kuruluşla paralel yürütüyoruz.",
    },
    {
      q: "KKTC'de finans şirketi kurulabiliyor mu?",
      a: "Finansal kiralama, faktoring, finansman ve elektronik ödeme KKTC Merkez Bankası düzenlemelerine tabi. Serbest Liman şirketi bu faaliyetler için ayrı bir iznin yerine geçmiyor.",
    },
  ],
};

/* ----------------------------------------------------- Sağlık ve medikal
   Kurumlar: docs/sektor-mevzuat.md · Sağlık. KKTC'de sağlık ruhsatının
   dayanağı resmî kaynakta okunamadığı için KKTC bloğu sitenin genel
   cümlesinde kalıyor ("faaliyet konusuna göre ek izin veya ruhsat
   gerekebiliyor"); ayrıntı teyit listesinde. */
const SAGLIK: Sector = {
  slug: "saglik-ve-medikal",
  name: "Sağlık ve medikal",
  short: "sağlık",
  payRow: false,
  seo: {
    title: "Sağlık ve medikal şirketi kurmak: Dubai, İngiltere ve KKTC | Ortac Global",
    description:
      "Klinik, sağlık hizmeti ve medikal ürün için yurt dışında şirket: Dubai'de DHA, İngiltere'de CQC ve KKTC'de ruhsat tarafı, şirketin ruhsata göre kurgusu ve vergi çerçevesi. Üç ülke yan yana.",
  },
  hero: {
    crumb: "Sektörler · Sağlık ve medikal",
    title: "Sağlık ve medikal şirketi kurmak.",
    accent: "şirketi kurmak.",
    lead: "Sağlıkta şirketin kurgusunu ruhsat şartları belirliyor. Hangi hizmetin hangi kurumdan izin istediğini kuruluştan önce netleştiriyoruz.",
  },
  decide: {
    heading: "Sağlıkta kararı önce ruhsat veriyor.",
    accent: "önce ruhsat veriyor.",
    lead: "Tesis, hizmet ve çalışan ayrı ayrı izne tabi olabiliyor; şirket bu izinlerin taşıyıcısı olarak kuruluyor.",
    axes: [
      {
        icon: "stethoscope",
        title: "Hizmet nerede veriliyor",
        line: "Hastaya verilen hizmet, hizmetin verildiği ülkenin sağlık kurumundan izin istiyor.",
        detail:
          "Klinik, laboratuvar, eczane ya da evde bakım gibi hastaya verilen hizmet, hizmetin verildiği ülkenin sağlık düzenleyicisine bağlı. Dubai'de sağlık tesisleri, Dubai Healthcare City serbest bölgesi dışında, DHA lisansı istiyor. İngiltere'de (England) düzenlenmiş sağlık ve bakım hizmeti veren kuruluş CQC'ye kayıt yaptırıyor. KKTC'de faaliyet konusuna göre ek izin veya ruhsat gerekebiliyor.",
      },
      {
        icon: "building",
        title: "Ruhsat kimin adına",
        line: "İzin şirkete, tesise ve sorumlu kişiye birlikte bağlanabiliyor; şirket yapısı buna göre kuruluyor.",
        detail:
          "Sağlıkta izin yalnız şirkete değil, tesise ve sorumlu hekime ya da yöneticiye de bağlanabiliyor. İngiltere'de CQC kaydını faaliyeti yürüten tüzel kişi yaptırıyor. Ortaklık yapısı, sorumlu kişi ve ruhsatın kimin adına çıkacağı kuruluş dosyasından önce belirleniyor; sonradan değiştirmek ek başvuru gerektirebiliyor.",
      },
      {
        icon: "users",
        title: "Hekim ve çalışan izinleri",
        line: "Tesisin izni çalışanın mesleki iznini kapsamıyor.",
        detail:
          "Hizmeti veren her sağlık çalışanı ayrıca mesleki lisans ya da kayıt istiyor: Dubai'de sağlık çalışanlarının lisansı DHA'nın çerçevesinde, İngiltere'de hekim ve hemşireler kendi meslek kurumlarına kayıtlı. Ekibi Dubai'ye taşıyacaksanız çalışan vizesi kotası da aynı planın parçası.",
      },
      {
        icon: "package",
        title: "Ürün mü, hizmet mi",
        line: "Medikal ürün satışı ve ithalatı, hizmetten ayrı bir izin rejimine bağlı.",
        detail:
          "Tıbbi cihaz, ilaç ya da takviye satan şirket hastaya hizmet vermese de ürünün kaydı ve ithalatı ayrıca düzenleniyor. Faaliyet tanımı bu ayrıma göre yazılıyor: yalnız ticaret mi, ürün kaydı mı, yoksa hastaya verilen hizmet mi.",
      },
    ],
  },
  choose: {
    heading: "Ruhsat nerede, şirket orada kuruluyor.",
    accent: "şirket orada kuruluyor.",
    lead: "Önce kısa yol: durumunuz hangisiyse cevap yanında yazıyor. Altında üç ülke yan yana.",
    routes: [
      {
        when: "Dubai'de klinik ya da sağlık tesisi açacaksınız",
        to: ["dubai"],
        why: "Tesis DHA lisansı istiyor; Dubai Healthcare City serbest bölgesi bunun dışında. Şirketin yeri lisansla birlikte seçiliyor.",
      },
      {
        when: "Ekibi yanınıza taşımak istiyorsunuz",
        to: ["dubai"],
        why: "Şirket üzerinden oturum vizesi alınabilen tek ülke; kota lisans paketine bağlı.",
      },
      {
        when: "Sağlık yazılımı ya da içerik üretiyorsunuz, tedavi etmiyorsunuz",
        to: ["dubai", "ingiltere"],
        why: "Teşhis ve tedavi hizmeti yoksa kurgu bir yazılım şirketine yaklaşıyor; uzaktan da olsa tedavi düzenlenmiş faaliyet sayılabiliyor.",
      },
    ],
    note: CHOOSE_NOTE_NO_PAY,
    more: CHOOSE_MORE,
    ask: "Hizmetinizi, hastaya nerede ulaştığınızı ve ekibin nerede çalışacağını iletin; ruhsatın kapsamını ve ülkeyi birlikte belirleyelim.",
  },
  countries: [
    {
      country: "dubai",
      heading: "Dubai'de sağlık şirketi kurmak",
      accent: "sağlık şirketi kurmak",
      badge: "Tesis DHA lisansıyla",
      lead: "Dubai'de sağlık tesisleri, Dubai Healthcare City serbest bölgesi dışında, DHA lisansıyla çalışıyor. Şirketin yeri ve ruhsatın kapsamı kuruluş dosyasından önce birlikte belirleniyor.",
      fit: [
        { icon: "stethoscope", text: "Tesis lisansı başvurusu DHA'nın çevrim içi sistemi üzerinden yürüyor." },
        { icon: "id", text: "Ekip için çalışan vizesi alınabiliyor; kota lisans paketine bağlı." },
        { icon: "split", text: "Serbest bölge ya da mainland seçimi, hizmetin hastaya nerede verileceğiyle birlikte yapılıyor." },
      ],
      cells: {
        structure: {
          value: FACTS.dubai.structure,
          note: "Ticari lisans ve sağlık tesisi lisansı ayrı; biri ötekinin yerine geçmiyor.",
        },
        tax: TAX_CELL.dubai,
      },
      limits: [
        FACTS.dubai.limit + "; bu adım vekâletle yürümüyor.",
        "Tesis ve sağlık çalışanı lisansları DHA'nın takviminde; süre taahhüdü vermiyoruz.",
        DUBAI_COST,
      ],
    },
    {
      country: "ingiltere",
      heading: "İngiltere'de sağlık şirketi kurmak",
      accent: "sağlık şirketi kurmak",
      badge: "Düzenlenmiş hizmet CQC kaydıyla",
      lead: "İngiltere'de (England) düzenlenmiş sağlık ve bakım hizmeti veren kuruluş CQC'ye kayıt yaptırıyor ve kayıt şirketin kendi adına. Hasta görmeyen sağlık yazılımı ya da içerik işinde kuruluş uzaktan yürüyor.",
      fit: [
        { icon: "check", text: "CQC kaydı faaliyeti yürüten tüzel kişi adına yapılıyor; şirket yapısı buna göre kuruluyor." },
        { icon: "laptop", text: "Hasta görmeyen işte kuruluşun tamamı uzaktan." },
        { icon: "file", text: "Sözleşme ve fatura tarafı oturmuş; Avrupa'daki kurumsal müşteride Ltd sorunsuz kabul görüyor." },
      ],
      cells: {
        structure: {
          value: FACTS.ingiltere.structure,
          note: "CQC kaydı England için; İskoçya, Galler ve Kuzey İrlanda'nın kendi kurumu var.",
        },
        tax: TAX_CELL.ingiltere,
      },
      limits: [
        sentence(FACTS.ingiltere.limit) + " Göçmenlik ayrı bir süreç.",
        "CQC kaydı gerektiren hizmet kayıt olmadan verilemiyor; kayıt süreci kuruluştan ayrı ve takvimi CQC'de.",
        UK_BANK,
      ],
    },
    {
      country: "kktc",
      heading: "KKTC'de sağlık şirketi kurmak",
      accent: "sağlık şirketi kurmak",
      badge: "Faaliyete göre ek ruhsat",
      lead: "KKTC'de hastaya verilen hizmet iç piyasa işi; Serbest Liman'ın vergi muafiyeti uygulanmıyor. Faaliyet konusuna göre ek izin veya ruhsat gerekebiliyor, kapsamı başvurudan önce netleştiriyoruz.",
      fit: [
        { icon: "clock", text: "Türkiye'ye yakın: aynı dil, aynı saat dilimi, bir günlük yol." },
        { icon: "receipt", text: "Sözleşme ve muhasebe pratiği Türkiye'ye benzediği için öğrenme eğrisi kısa." },
        { icon: "globe", text: "KKTC dışındaki müşteriye yapılan işte Serbest Liman şirketinin vergi muafiyeti geçerli." },
      ],
      cells: {
        structure: {
          value: FACTS.kktc.structure,
          note: "Faaliyet konusuna göre ek izin veya ruhsat gerekebiliyor; iç piyasadaki hizmette muafiyet uygulanmıyor.",
        },
        tax: TAX_CELL.kktc,
      },
      limits: [
        "KKTC içindeki hastaya verilen hizmet iç piyasa işi; Serbest Liman'ın vergi muafiyeti uygulanmıyor.",
        KKTC_PAY,
        sentence(FACTS.kktc.limit),
      ],
    },
  ],
  offer: {
    heading: "Sağlık şirketleri için Ortac ne yapıyor?",
    accent: "Ortac ne yapıyor?",
    lead: "Yukarıdaki ölçütler kararı veriyor; aşağıdakiler o kararın arkasındaki işler. Hepsi zaten yürüttüğümüz hizmetler.",
    lines: {
      "sirket-kurulusu":
        "Ruhsatın kimin adına çıkacağını ve sorumlu kişiyi kuruluş dosyasından önce belirliyor, faaliyet tanımını buna göre yazıyoruz.",
      "banka-hesabi": "Kurumsal hesap başvurusunda faaliyetin izin durumunu gösteren belgeleri dosyaya ekliyoruz.",
      muhasebe: "Aylık defter, beyanlar ve yıllık mali tablolar aynı döngüde yürüyor.",
      "oturum-vize":
        "Ekibi Dubai'ye taşıyacaksanız çalışan vizesi, sağlık kontrolü ve Emirates ID adımları kuruluş planının içinde.",
    },
    note: OFFER_NOTE,
  },
  faq: [
    {
      q: "Dubai'de klinik açmak için ne gerekiyor?",
      a: "Dubai'deki sağlık tesisleri, Dubai Healthcare City serbest bölgesi dışında, DHA lisansı istiyor ve başvuru DHA'nın çevrim içi sistemi üzerinden yürüyor. Ticari lisans ile tesis lisansı ayrı; sağlık çalışanları da ayrıca lisans alıyor.",
    },
    {
      q: "İngiltere'de sağlık hizmeti vermek için ne gerekiyor?",
      a: "England'da düzenlenmiş sağlık ve bakım hizmeti veren kuruluş CQC'ye kayıt yaptırıyor; kayıt, faaliyeti yürüten tüzel kişi adına. Kayıt gerektiren hizmet kayıt olmadan verilemiyor.",
    },
    {
      q: "Çevrim içi sağlık hizmeti de izne tabi mi?",
      a: "Teşhis ya da tedavi varsa uzaktan verilse de düzenlenmiş faaliyet sayılabiliyor. Yalnız yazılım ya da içerik üretiyorsanız kurgu bir yazılım şirketine yaklaşıyor; sınırı kuruluştan önce netleştiriyoruz.",
    },
    {
      q: "Medikal ürün satışı için ayrı izin gerekiyor mu?",
      a: "Tıbbi cihaz, ilaç ya da takviye satan şirket hastaya hizmet vermese de ürünün kaydı ve ithalatı ayrıca düzenleniyor. Faaliyet tanımını kuruluşta bu ayrıma göre yazıyoruz.",
    },
    {
      q: "Sağlık ekibimi Dubai'ye taşıyabilir miyim?",
      a: "Evet, şirket üzerinden çalışan vizesi alınabiliyor ve kota lisans paketine bağlı. Sağlık çalışanlarının Dubai'de hizmet verebilmesi için ayrıca mesleki lisans gerekiyor.",
    },
  ],
};

/* FACTS[…].limit satırları nokta ile bitmiyor (kart etiketi olarak
   yazılmışlardı). Buradaki kısıt listesinde ise cümle olarak duruyorlar ve
   arkalarına ikinci bir cümle ekleniyor; noktasız birleşince iki cümle tek
   satıra yapışıyordu. Noktalamayı FACTS'te değiştirmek onu kullanan hero
   kartlarını da etkilerdi, o yüzden düzeltme burada.

   Bildirim (function) olarak yazılı ve YAZILIM'ın ALTINDA duruyor: yukarıdaki
   nesne onu kuruluş anında çağırıyor ve `const` bir ok fonksiyonu olsaydı
   tanımlanmadan kullanılmış olurdu. Fonksiyon bildirimi yukarı taşındığı için
   sorun yok; yeri burası çünkü bu bir dipnot, içeriğin girişi değil. */
function sentence(s: string) {
  return /[.!?]$/.test(s.trim()) ? s.trim() : `${s.trim()}.`;
}

/* ------------------------------------------ ülke bloğunun tek çıkış düğmesi

   Müşteri hizmet listesini kaldırttı ve yerine tek bir "şirket kuruluşu"
   düğmesi istedi. Düğmenin adresi burada seçiliyor, veride yazılı değil —
   çünkü doğru adres dolaşım durumuna bağlı ve o durum lib/routes.ts'te
   değişiyor.

   SÖNÜK DÜĞME OLMAMALI. SmartLink yayında olmayan bir adresi <span data-soon>
   olarak basıyor; bir hap listesinde bu iyi bir davranış (yol haritası
   görünür kalıyor) ama TEK BİR ÇAĞRI DÜĞMESİ için kötü: bölümün tek eylemi
   tıklanamaz oluyor. O yüzden adres iki adımda seçiliyor:

     1) ülkenin kendi kuruluş sayfası — serviceHref(c, "sirket-kurulusu"),
        yani /dubai · /ingiltere · /kktc. Şirket kuruluşunun ayrı bir sayfası
        yok ve olmayacak (services.ts'te gerekçesi yazılı): ülke sayfasının
        kendisi zaten o hizmetin sayfası.
     2) o sayfa dolaşıma kapalıysa kuruluş akışı — /basla?ulke=…
        /basla sitenin ana eylem çağrısı ve kapanmayan tek adres
        (routes.ts · STATIC_LIVE), yani bu dal her zaman canlı.

   BUGÜNKÜ SONUÇ: Dubai → /dubai (açık), İngiltere → /basla?ulke=ingiltere,
   KKTC → /basla?ulke=kktc. İngiltere ve KKTC'nin ülke sayfaları yayına
   girdiği gün bu fonksiyon kendiliğinden onlara dönüyor; burada tek satır
   değişmiyor.

   isLive() sorgu dizesini zaten ayırıyor, yani /basla?ulke=… testi /basla
   üzerinden yürüyor. */
export function formationHref(c: Country): string {
  const own = serviceHref(c, FORMATION_SLUG);
  return isLive(own) ? own : `/basla?ulke=${c}`;
}

/* ------------------------------------------- "Ortac ne yapıyor" listesi

   Liste sektör dosyasında YAZILI DEĞİL, katalogdan türüyor: üç ülkenin
   servicesFor() çıktısı birleştiriliyor ve sırası ilk görüldüğü sıra. Böylece
   kataloğa bir hizmet eklendiğinde ya da kaldırıldığında bu bölüm de değişiyor
   — sektör dosyasına dokunmadan. Sektörün payına düşen tek şey cümle; cümlesi
   olmayan hizmet basılmıyor (başlık tek başına ziyaretçiye bir şey söylemez).

   BAŞLIK NEDEN "EN ÇOK GEÇEN": bir hizmetin başlığı ülkeye göre değişebiliyor
   ve bugün tek örneği uyum — Dubai'de "Uyum (AML / goAML)", diğer ikisinde
   "Uyum ve AML". goAML BAE'ye özgü bir sistem; üç ülkeyi birden kapsayan bir
   bölümde o başlığı kullanmak yanlış olurdu. Ülkeler arasında en çok geçen
   başlık seçiliyor, eşitlikte ilki. */
export type SectorOffer = { slug: ServiceSlug; title: string; line: string };

function commonest(titles: string[]): string {
  const n = new Map<string, number>();
  for (const t of titles) n.set(t, (n.get(t) ?? 0) + 1);
  return titles.reduce((best, t) => ((n.get(t) ?? 0) > (n.get(best) ?? 0) ? t : best), titles[0]);
}

export function offerFor(sector: Sector): SectorOffer[] {
  const titles = new Map<ServiceSlug, string[]>();
  for (const c of COUNTRY_SLUGS) {
    for (const s of servicesFor(c)) titles.set(s.slug, [...(titles.get(s.slug) ?? []), s.title]);
  }

  return [...titles].flatMap(([slug, list]) => {
    const line = sector.offer.lines[slug];
    return line ? [{ slug, title: commonest(list), line }] : [];
  });
}

/* --------------------------------------------------------------- kayıt defteri

   Yeni sektör = buraya bir satır. Anahtar aynı zamanda adres:
   /sektorler/<anahtar>. */
export const SECTORS: Record<string, Sector> = {
  [ETICARET.slug]: ETICARET,
  [YAZILIM.slug]: YAZILIM,
  [DANISMANLIK.slug]: DANISMANLIK,
  [GAYRIMENKUL.slug]: GAYRIMENKUL,
  [FINANS.slug]: FINANS,
  [SAGLIK.slug]: SAGLIK,
};

export const SECTOR_SLUGS: string[] = Object.keys(SECTORS);

export const sectorHref = (slug: string) => `/sektorler/${slug}`;

export function sectorFor(slug: string): Sector | undefined {
  return SECTORS[slug];
}

/* ------------------------------------------------------- rota kaydı

   SmartLink bir adresin yayında olup olmadığını lib/routes.ts'e soruyor ve o
   dosya adresleri elle değil, veriden türetiyor (ülke ve hizmet adresleri
   services.ts'ten geliyor). Sektör adresleri de aynı mantıkla veriden
   türemeli; tek fark, kaynağın bu dosya olması.

   Kaydı burada yapmamızın sebebi pratik: bu tur yalnızca sektör dosyaları
   üzerinde çalışılıyor ve routes.ts'e paralel bir el değebilir. Kayıt
   idempotent (Set) ve tek yön: sectors.ts routes.ts'i besliyor, tersi değil,
   dolayısıyla döngü yok.

   TAŞINACAK: routes.ts bir dahaki açılışında bu döngü oraya alınmalı —
   `for (const s of SECTOR_SLUGS) LIVE.add(sectorHref(s))`. Taşındığında bu
   blok silinir; iki yerde birden durması bir şeyi bozmaz, yalnızca gereksizdir.

   Sonuç: girdisi olan sektörün kartı gerçek bağlantı, olmayanınki sönük
   "yakında" rozeti. Ana sayfadaki altı kartın beşi şu an ikinci durumda ve bu
   kasıtlı. */
for (const slug of SECTOR_SLUGS) LIVE_ROUTES.add(sectorHref(slug));
