import { FACTS, PAY_MATRIX } from "@/lib/brand";
import { brandKeyForName, type BrandKey } from "@/lib/brands";
import { LIVE_ROUTES } from "@/lib/routes";
import type { Country } from "@/lib/store";

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
   ========================================================================= */

/* ---------------------------------------------------------------- tipler */

/* İkon adı string, bileşen değil: bu dosya .ts ve içeriği müşteriye okutulan
   bir metin dosyası olarak kalsın istiyoruz. Eşleme sayfada yapılıyor —
   countryContent.ts'teki `icon?: string` alanının aynı gerekçesi. */
export type SectorIcon = "users" | "repeat" | "shield" | "tag";

/** Özet önde, ayrıntı talep üzerine: `line` kapalıyken görünen, `detail` açılan. */
export type SectorTopic = {
  icon: SectorIcon;
  title: string;
  line: string;
  detail: string;
};

export type SectorPoint = { title: string; line: string };

/** Ülke başına bir bölüm — sayfada kendi id'siyle, kendi h2'siyle. */
export type SectorCountry = {
  country: Country;
  /** h2 metni. Aranan cümlenin birebir kendisi olacak şekilde yazılıyor. */
  heading: string;
  /** h2 içinde vurgulanan parça (SplitWords) — `heading`'in alt dizisi olmalı */
  accent: string;
  lead: string;
  /** "bu sektör için burada ne anlamlı" */
  fit: string[];
  /** lisans / faaliyet sınıfı / vergi çerçevesi / süre — etiket + değer */
  facts: { label: string; value: string; note?: string }[];
  /** dürüst kısıt. Firma politikası: her ülkede en az bir tane, asla boş değil. */
  limits: string[];
  /** ilgili ülke ve hizmet sayfaları — iç bağlantı SEO'nun yarısı */
  links: { label: string; href: string }[];
};

export type Sector = {
  slug: string;
  /** kartta ve içerikte geçen tam ad */
  name: string;
  /** cümle içinde geçen kısa ad: "…'de yazılım şirketi kurmak" */
  short: string;
  seo: { title: string; description: string };
  hero: { crumb: string; title: string; accent: string; lead: string };
  frame: { heading: string; accent: string; lead: string; points: SectorPoint[] };
  topics: { heading: string; accent: string; lead: string; items: SectorTopic[] };
  /** ülke bölümleri; sıra sayfadaki sıra */
  countries: SectorCountry[];
};

/* ------------------------------------------------------- tahsilat kanalları

   Ödeme tablosu bu dosyada tekrar yazılmıyor. PAY_MATRIX zaten üç ülke için
   doğrulanmış ve "✗" hücreleri kasıtlı olarak gizlenmiyor (bkz. brand.ts).
   Yazılım sayfasının ihtiyacı tam olarak bu: abonelik ve uygulama içi tahsilat
   konuşulurken hangi kanalın açık, hangisinin kapalı olduğu tek soru.

   Kapalı olanı ("no") ayrı bir listede döndürüyoruz çünkü KKTC bölümünün asıl
   bilgisi orada: Stripe ve PayPal'ın yokluğu, o ülkede bir yazılım şirketi
   kurmanın tek belirleyici kısıtı. "none" (ilgisiz) hücreler hiçbir listeye
   girmiyor — ilgisiz bir satırı "kapalı" diye göstermek yanlış olurdu. */
export type PayGroup = {
  title: string;
  hint: string;
  open: { name: string; brand: BrandKey | null }[];
  shut: { name: string; brand: BrandKey | null }[];
};

const withBrand = (name: string) => ({ name, brand: brandKeyForName(name) });

/* FACTS[…].limit satırları nokta ile bitmiyor (kart etiketi olarak
   yazılmışlardı). Buradaki kısıt listesinde ise cümle olarak duruyorlar ve
   arkalarına ikinci bir cümle ekleniyor; noktasız birleşince iki cümle tek
   satıra yapışıyordu. Noktalamayı FACTS'te değiştirmek onu kullanan hero
   kartlarını da etkilerdi, o yüzden düzeltme burada. */
const sentence = (s: string) => (/[.!?]$/.test(s.trim()) ? s.trim() : `${s.trim()}.`);

export function payGroupsFor(c: Country): PayGroup[] {
  return PAY_MATRIX.map((g) => ({
    title: g.title,
    hint: g.hint,
    open: g.rows.filter((r) => r.cells[c] === "yes").map((r) => withBrand(r.name)),
    shut: g.rows.filter((r) => r.cells[c] === "no").map((r) => withBrand(r.name)),
  })).filter((g) => g.open.length > 0 || g.shut.length > 0);
}

/* ------------------------------------------------------------------ içerik */

/* SWAP:SECTOR_FRAMING — Aşağıdaki sektör çerçevesi (giriş, üç madde ve dört
   başlık) bu turda yazıldı; ülke olgularının aksine mevcut bir veri
   dosyasından türemiyor. Hiçbiri rakam, oran veya süre iddia etmiyor; hepsi
   "bu sektörde kuruluşta ne konuşuluyor" düzeyinde. Yine de müşteri onayına
   açık: yanlış bulduğu cümleyi tek tek değiştirebilsin diye ayrı ayrı
   duruyorlar.

   İki cümle özellikle işaretli, çünkü sitenin başka hiçbir yerinde karşılığı
   yok: uygulama mağazası tahsilatının nasıl aktığı ve fikri mülkiyetin hangi
   tüzel kişide duracağı. İkisi de genel çerçeve olarak yazıldı, kişiye özel
   görüş olarak değil. */

const YAZILIM: Sector = {
  slug: "yazilim-ve-teknoloji",
  name: "Yazılım ve teknoloji",
  short: "yazılım",

  seo: {
    /* Başlık ülke adlarını taşıyor: "dubaide yazılım şirketi kurmak" arayan
       kişinin sonuç sayfasında gördüğü satır bu. Rakam yok — kuruluş bedelini
       başlığa yazmak, teklife göre değişen bir sayıyı arama sonucunda sabitler. */
    title: "Yazılım şirketi kurmak — Dubai, İngiltere ve KKTC | Ortac Global",
    description:
      "Yazılım ve teknoloji şirketi için yurt dışında kuruluş: Dubai, İngiltere ve KKTC'de hangi lisans ve faaliyet sınıfı geçerli, hangi tahsilat kanalları açık, hangi kısıtlar var. Üç ülke yan yana.",
  },

  hero: {
    crumb: "Sektörler · Yazılım ve teknoloji",
    title: "Yazılım ve teknoloji şirketi kurmak.",
    accent: "şirketi kurmak.",
    lead: "Kodun nerede yazıldığı ile şirketin nerede kurulduğu aynı şey değil. Bu sayfa, bir yazılım veya teknoloji şirketini Dubai, İngiltere ve KKTC'de kurmanın neyi değiştirdiğini anlatıyor: hangi faaliyet sınıfı, hangi tahsilat kanalı, hangi kısıt.",
  },

  frame: {
    heading: "Yazılımda kuruluşu belirleyen şey, paranın nereden geçtiği.",
    accent: "paranın nereden geçtiği.",
    lead: "Ürün dijital olduğu için depo, mağaza ve yerel stok denklemden çıkıyor. Geriye üç soru kalıyor ve üçü de kuruluş dosyasında cevaplanıyor.",
    points: [
      {
        title: "Ürün sınır tanımıyor, tahsilat tanıyor",
        line: "Yazılımı her ülkeye satabilirsiniz; kartı çeken altyapı ise şirketin hangi ülkede kurulduğuna bakıyor. Şirketin adresini çoğu zaman bu tek satır belirliyor.",
      },
      {
        title: "Ekip uzakta, yükümlülük merkezde",
        line: "Geliştiriciler farklı ülkelerdeyse şirketin bulunduğu yer vize kotasını, bordroyu ve sözleşme tarafını değiştiriyor. Ekibin haritası kuruluştan önce çıkıyor.",
      },
      {
        title: "Faaliyet kodu sonradan kolay dönmüyor",
        line: "Ne sattığınız kuruluş dosyasında bir sınıfa yazılıyor ve sonraki bütün vergi, lisans ve regülasyon işlerinin girdisi o sınıf oluyor. Yanlış seçim ek işlem, bazen yeni kuruluş demek.",
      },
    ],
  },

  topics: {
    heading: "Yazılım dosyalarında tekrar eden dört başlık.",
    accent: "dört başlık.",
    lead: "Dördü de kuruluş anında karar istiyor. Özeti burada; ayrıntısını merak eden satırı açsın.",
    items: [
      {
        icon: "users",
        title: "Uzaktan ekip",
        line: "Şirketin kurulduğu ülke, ekibin oturduğu ülke ve yönetimin fiilen yürüdüğü yer üç ayrı şey.",
        detail:
          "Dubai'de çalışan vizesi kotası, aldığınız lisans paketine bağlı; ekibi oraya taşıyacaksanız kota kuruluş anında seçiliyor. İngiltere'de direktöre maaş ödeyecekseniz PAYE bordro kaydı gerekiyor. Her üç ülkede de şirketin nereden yönetildiği vergi açısından belirleyici olabiliyor, dolayısıyla ekip haritasını kuruluş dosyasını açmadan önce çıkarıyoruz.",
      },
      {
        icon: "repeat",
        title: "Abonelik ve uygulama içi tahsilat",
        line: "Yinelenen tahsilat, tek seferlik satıştan farklı bir altyapı ve farklı bir ülke kararı istiyor.",
        detail:
          "Kartla yinelenen tahsilat pratikte Stripe ve PayPal üzerinden kuruluyor; ikisi de Dubai ve İngiltere şirketiyle çalışıyor, KKTC şirketiyle çalışmıyor. Uygulama mağazası üzerinden satıyorsanız tahsilatı mağaza yapıyor ve size dönemsel ödeme olarak geçiyor — o durumda kritik soru kartın değil, mağaza ödemesinin hangi ülkedeki hangi hesaba düşeceği. Hangi kanalın hangi ülkede açık olduğu aşağıda ülke ülke yazıyor.",
      },
      {
        icon: "shield",
        title: "Yazılımın ve markanın sahibi",
        line: "Kodun ve markanın hangi tüzel kişide duracağı kuruluş anında belli olsun.",
        detail:
          "Ürün bir kişide, gelir başka bir şirkette duruyorsa sözleşme ve fatura zinciri kopuyor: satan taraf, sattığı şeyin sahibi olduğunu gösteremiyor. Kuruluşta hangi şirketin lisans veren, hangisinin satan taraf olduğunu baştan yazıyoruz. Sonradan devir ayrı bir işlem, ayrı bir maliyet ve bazen ayrı bir vergi konusu.",
      },
      {
        icon: "tag",
        title: "Faaliyet kodu ve lisans sınıfı",
        line: "Aynı iş üç ülkede üç farklı biçimde tanımlanıyor.",
        detail:
          "Dubai'de faaliyet kodu doğrudan ticari lisans sınıfını belirliyor; ne sattığınızı anlatıyorsunuz, eşleştirmeyi biz yapıyoruz. İngiltere'de faaliyet tarifiniz SIC koduna çevriliyor ve tescil dosyasında tanımlanıyor. KKTC'de faaliyet konusuna göre ek izin veya ruhsat gerekebiliyor. Üçünde de bu satır sonradan değil, kuruluşta doğru yazılıyor.",
      },
    ],
  },

  countries: [
    /* ---------------------------------------------------------------- Dubai */
    {
      country: "dubai",
      heading: "Dubai'de yazılım şirketi kurmak",
      accent: "yazılım şirketi kurmak",
      lead: "Yazılım, serbest bölgenin klasik faaliyetlerinden biri: müşteriniz BAE dışındaysa serbest bölge lisansı yetiyor, tahsilat kanallarının hepsi açık ve ekip için oturum vizesi alınabiliyor.",
      fit: [
        "Kararı satış yaptığınız taraf veriyor: müşteriniz BAE dışındaysa serbest bölge, BAE içindeki şirketlere satıyorsanız mainland.",
        "SaaS ve ajans profilinde Stripe, PayPal ve Wise bağlantısı kurulabiliyor.",
        "Ortak ve çalışan vizesi süreç içinde alınıyor; kota aldığınız lisans paketine bağlı.",
      ],
      facts: [
        { label: "Yapı", value: FACTS.dubai.structure, note: "Sonradan değiştirmek yeni kuruluş demek." },
        {
          label: "Lisans",
          value: "Serbest bölge ticaret lisansı",
          note: "Ticari veya teknoloji faaliyet sınıfıyla; eşleştirmeyi biz yapıyoruz.",
        },
        {
          label: "Vergi çerçevesi",
          value: "375.000 AED'ye kadar %0, üzeri %9",
          note: "Serbest bölge olmak otomatik muafiyet vermiyor; %0 şartları sağlayan nitelikli gelirde geçerli.",
        },
        { label: "Tipik süre", value: FACTS.dubai.days, note: "Otoritenin takvimi bizim kontrolümüzde değil." },
      ],
      limits: [
        FACTS.dubai.limit + "; bu adım vekâletle yürümüyor.", // noktalama zaten cümleyi kapatıyor
        "Kuruluş ve yıllık yenileme maliyeti üç ülkenin en yükseği. İkinci yıl yenilemesini baştan planlamak gerekiyor.",
      ],
      links: [
        { label: "Dubai'de şirket kuruluşu", href: "/dubai" },
        { label: "Banka ve ödeme", href: "/dubai/banka-hesabi" },
        { label: "Vize ve oturum", href: "/dubai/oturum-vize" },
        { label: "Uyum (AML / goAML)", href: "/dubai/uyum" },
      ],
    },

    /* ----------------------------------------------------------- İngiltere */
    {
      country: "ingiltere",
      heading: "İngiltere'de yazılım şirketi kurmak",
      accent: "yazılım şirketi kurmak",
      lead: "Uzaktan kurulabilen tek seçenek ve yazılım–danışmanlık tarafında sözleşme ile fatura pratiği en oturmuş pazar. Karşılığında kâr kurumlar vergisine tabi ve banka tarafı üçünün en zoru.",
      fit: [
        "Ltd yapısı Avrupa'daki müşteri ve platformlarda sorunsuz kabul görüyor.",
        "Yazılım ve danışmanlıkta fatura ve sözleşme tarafı en oturmuş pazar burası.",
        "Hiç seyahat edemeyecekseniz kuruluşun tamamı uzaktan tamamlanıyor.",
      ],
      facts: [
        { label: "Yapı", value: FACTS.ingiltere.structure, note: "Kuruluşun hiçbir adımında gitmeniz gerekmiyor." },
        {
          label: "Faaliyet tanımı",
          value: "SIC kodu",
          note: "Faaliyeti tarif etmeniz yeterli; koda çevirip tescil dosyasında tanımlıyoruz.",
        },
        /* SWAP:UK_CT_RATE — oran countryContent.ts'ten geliyor, burada yeni bir
           sayı üretilmedi. Orada işaret ziyaretçiye görünen notun İÇİNDE
           duruyor ("SWAP: güncel oran…") ve ülke sayfasında öyle basılıyor;
           yeni bir açılış sayfasına geliştirici işareti taşımak istemedik.
           İşaret kod tarafında, burada; ziyaretçi aynı uyarıyı düz Türkçe
           okuyor. Oran güncellenecekse tek kaynak countryContent.ts. */
        {
          label: "Vergi çerçevesi",
          value: "Kâr dilimine göre %19-25",
          note: "Güncel oran ve marjinal indirim eşiği kuruluş öncesi teyit ediliyor.",
        },
        { label: "Tipik süre", value: FACTS.ingiltere.days, note: "Kimlik doğrulamada ek belge istenirse uzayabiliyor." },
      ],
      limits: [
        sentence(FACTS.ingiltere.limit) +
          " Göçmenlik ayrı bir süreç ve bu sayfadaki hiçbir adım onun parçası değil.",
        "Geleneksel bankada yerleşik olmayan ortak için onay oranı düşük; pratikte ödeme kuruluşu hesabıyla başlanıyor.",
      ],
      links: [
        { label: "İngiltere'de şirket kuruluşu", href: "/ingiltere" },
        { label: "Banka ve ödeme", href: "/ingiltere/banka-hesabi" },
        { label: "Muhasebe ve vergi", href: "/ingiltere/muhasebe" },
        { label: "Uyum ve AML", href: "/ingiltere/uyum" },
      ],
    },

    /* ----------------------------------------------------------------- KKTC */
    {
      country: "kktc",
      heading: "KKTC'de yazılım şirketi kurmak",
      accent: "yazılım şirketi kurmak",
      lead: "Türkiye'ye yakın bir geliştirme ekibi kuruyorsanız maliyet avantajı gerçek. Kartla tahsilat ana kanalınızsa burası doğru adres değil — bunu baştan söylüyoruz.",
      fit: [
        "Operasyonunuz Türkiye merkezliyse aynı dil, aynı saat dilimi, bir günlük yol.",
        "Bölgesel ticaret ve hizmet işlerinde maliyet avantajı gerçek.",
        "Sözleşme, fatura ve muhasebe pratiği Türkiye'ye benzediği için öğrenme eğrisi kısa.",
      ],
      facts: [
        { label: "Yapı", value: FACTS.kktc.structure, note: "Tescil kısmı vekâletle yürüyor." },
        {
          label: "Faaliyet tanımı",
          value: "Faaliyet konusu tarifi",
          note: "Faaliyet konusuna göre ek izin veya ruhsat gerekebiliyor.",
        },
        {
          label: "Vergi çerçevesi",
          value: "Kurumlar vergisi ve KDV var",
          note: "Oran ve istisnalar faaliyete göre değiştiği için bu sayfada oran yayımlamıyoruz; çerçeve yazılı teklifte satır satır yazılıyor.",
        },
        { label: "Tipik süre", value: FACTS.kktc.days, note: "Evrak tamsa tescil kısa sürüyor." },
      ],
      limits: [
        "Stripe ve PayPal KKTC şirketiyle çalışmıyor. Kartla tahsilat ana kanalınızsa Dubai veya İngiltere'ye bakmak gerekiyor.",
        "Banka hesabı açılışında yerinde imza isteniyor.",
        sentence(FACTS.kktc.limit) + " Bazı yurt dışı platformlar KKTC şirketini kabul etmiyor.",
      ],
      links: [
        { label: "KKTC'de şirket kuruluşu", href: "/kktc" },
        { label: "Banka ve ödeme", href: "/kktc/banka-hesabi" },
        { label: "Muhasebe ve vergi", href: "/kktc/muhasebe" },
      ],
    },
  ],
};

/* --------------------------------------------------------------- kayıt defteri

   Yeni sektör = buraya bir satır. Anahtar aynı zamanda adres:
   /sektorler/<anahtar>. */
export const SECTORS: Record<string, Sector> = {
  [YAZILIM.slug]: YAZILIM,
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
