import { COUNTRY_SERVICES, FACTS, PAY_MATRIX } from "@/lib/brand";
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
   ========================================================================= */

/* ---------------------------------------------------------------- tipler */

/* İkon adı string, bileşen değil: bu dosya .ts ve içeriği müşteriye okutulan
   bir metin dosyası olarak kalsın istiyoruz. Eşleme sayfada yapılıyor —
   countryContent.ts'teki `icon?: string` alanının aynı gerekçesi. */
export type SectorIcon = "users" | "repeat" | "shield" | "tag";

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
  /** "bu sektör için burada ne anlamlı" */
  fit: string[];
  /** kıyas tablosunun sektöre bağlı üç satırı; kalanı FACTS ve PAY_MATRIX'ten */
  cells: { structure: SectorCell; activity: SectorCell; tax: SectorCell };
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
  /** 1. bölüm — kararı veren eksenler */
  decide: { heading: string; accent: string; lead: string; axes: SectorAxis[] };
  /** 2. bölüm — hangi durumda hangi ülke, sonra ölçüt ölçüt kıyas */
  choose: {
    heading: string;
    accent: string;
    lead: string;
    routes: SectorRoute[];
    /** tablonun altındaki tek dipnot; tutar ve süre etiketleri burada */
    note: string;
    /** dört yönlendirmenin hiçbiri oturmayan ziyaretçi için çıkış cümlesi */
    ask: string;
  };
  /** ülke bölümleri; sıra sayfadaki sıra */
  countries: SectorCountry[];
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

/* --------------------------------------------------------- kıyas satırları

   Satır etiketleri sektöre bağlı değil (her sektör aynı altı ölçütle
   kıyaslanıyor), o yüzden sektör girdisinin içinde değil burada duruyorlar.
   İkinci sektör eklendiğinde bu liste olduğu gibi çalışıyor.

   `hint` yalnızca iki satırda var ve ikisi de politika: tutar ve süre. Kıyas
   tablosu bu iki sayıyı yan yana koyan tek yer ve etiketsiz bırakılırsa üç
   rakam taahhüt gibi okunur — STANCE_LIMITS'in açıkça yasakladığı şey. Ana
   sayfadaki kıyas tablosu (home/ThreeCountries.tsx) aynı iki şerhi aynı
   kelimelerle basıyor; iki tablo aynı sayfada olmasa da aynı sözleşmede. */
export type CompareKey = "cost" | "days" | "structure" | "activity" | "tax" | "visa";

export const COMPARE_ROWS: { key: CompareKey; label: string; hint?: string }[] = [
  { key: "cost", label: "Kuruluş maliyeti", hint: "Tutarlar temsilî" },
  { key: "days", label: "Tipik süre", hint: "Kesin süre taahhüdü yok" },
  { key: "structure", label: "Yapı" },
  { key: "activity", label: "Faaliyet tanımı" },
  { key: "tax", label: "Vergi çerçevesi" },
  { key: "visa", label: "Ekip için oturum / vize" },
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
    /* Giriş cümlesi artık sayfanın SORUSUNU söylüyor ve nasıl cevaplayacağını
       da söylüyor. Eski hâli konuyu tarif ediyordu ("bu sayfa neyi
       değiştirdiğini anlatıyor") ama okuyan kişi ne arayacağını bilmeden
       kaydırmaya başlıyordu. Üç adımın adı burada geçtiği için sayfa bir
       ansiklopedi değil, bir akış olarak açılıyor. */
    lead: "Soru şu: yazılım işiniz için Dubai, İngiltere ve KKTC'den hangisi mantıklı? Sayfa bunu üç adımda kapatıyor — önce kararı veren dört şey, sonra üç ülke yan yana, sonra her ülkenin kendi ayrıntısı.",
  },

  decide: {
    heading: "Yazılımda kuruluş kararını dört şey veriyor.",
    accent: "dört şey veriyor.",
    lead: "Ürün dijital olduğu için depo, mağaza ve yerel stok denklemden çıkıyor. Geriye bu dört başlık kalıyor ve dördü de kuruluş anında karar istiyor. Özet burada; ayrıntısını merak eden satırı açsın.",
    axes: [
      {
        icon: "repeat",
        title: "Tahsilat nereden geçiyor",
        line: "Yazılımı her ülkeye satabilirsiniz; kartı çeken altyapı şirketin hangi ülkede kurulduğuna bakıyor.",
        detail:
          "Kartla yinelenen tahsilat pratikte Stripe ve PayPal üzerinden kuruluyor; ikisi de Dubai ve İngiltere şirketiyle çalışıyor, KKTC şirketiyle çalışmıyor. Uygulama mağazası üzerinden satıyorsanız tahsilatı mağaza yapıyor ve size dönemsel ödeme olarak geçiyor — o durumda kritik soru kartın değil, mağaza ödemesinin hangi ülkedeki hangi hesaba düşeceği. Şirketin adresini çoğu zaman bu tek satır belirliyor: satış her yerden gelir, tahsilat tek bir kanaldan geçer.",
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
          "Ürün bir kişide, gelir başka bir şirkette duruyorsa sözleşme ve fatura zinciri kopuyor: satan taraf, sattığı şeyin sahibi olduğunu gösteremiyor. Kuruluşta hangi şirketin lisans veren, hangisinin satan taraf olduğunu baştan yazıyoruz. Sonradan devir ayrı bir işlem, ayrı bir maliyet ve bazen ayrı bir vergi konusu.",
      },
    ],
  },

  choose: {
    heading: "Aynı dört başlık, üç ülkede üç ayrı cevap.",
    accent: "üç ayrı cevap.",
    lead: "Önce kısa yol: aşağıdaki dört durumdan hangisi sizinse cevap onun yanında yazıyor. Tam liste hemen altında — ölçüt ölçüt, üç ülke yan yana.",
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
        why: "Aynı dil, aynı saat dilimi, bir günlük yol; kartla tahsilat gerekmiyorsa maliyet avantajı gerçek.",
      },
    ],
    note: "Tutarlar temsilîdir, süreler tipik aralıktır — kesin tutar ve takvim dosyaya göre netleşir. Tahsilat satırları ödeme altyapısı tablosundan okunuyor; hesabı açan kurum bankadır ve onay garantisi vermiyoruz.",
    ask: "Dördü de tam oturmuyorsa: ürününüzü, ekibinizi ve tahsilat kanalınızı anlatın, hangisinin işinize yaradığını birlikte netleştirelim.",
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
        "Kararı satış yaptığınız taraf veriyor: müşteriniz BAE dışındaysa serbest bölge, BAE içindeki şirketlere satıyorsanız mainland.",
        "SaaS ve ajans profilinde Stripe, PayPal ve Wise bağlantısı kurulabiliyor.",
        "Ortak ve çalışan vizesi süreç içinde alınıyor; kota aldığınız lisans paketine bağlı.",
      ],
      cells: {
        structure: {
          value: FACTS.dubai.structure,
          note: "Sonradan değiştirmek yeni kuruluş demek.",
        },
        activity: {
          value: "Serbest bölge ticaret lisansı",
          note: "Ticari veya teknoloji faaliyet sınıfıyla; eşleştirmeyi biz yapıyoruz.",
        },
        tax: {
          value: "375.000 AED'ye kadar %0, üzeri %9",
          note: "Serbest bölge olmak otomatik muafiyet vermiyor; %0 şartları sağlayan nitelikli gelirde geçerli.",
        },
      },
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
      badge: "Baştan sona uzaktan kuruluş",
      lead: "Uzaktan kurulabilen tek seçenek ve yazılım–danışmanlık tarafında sözleşme ile fatura pratiği en oturmuş pazar. Karşılığında kâr kurumlar vergisine tabi ve banka tarafı üçünün en zoru.",
      fit: [
        "Ltd yapısı Avrupa'daki müşteri ve platformlarda sorunsuz kabul görüyor.",
        "Yazılım ve danışmanlıkta fatura ve sözleşme tarafı en oturmuş pazar burası.",
        "Hiç seyahat edemeyecekseniz kuruluşun tamamı uzaktan tamamlanıyor.",
      ],
      cells: {
        structure: {
          value: FACTS.ingiltere.structure,
          note: "Kuruluşun hiçbir adımında gitmeniz gerekmiyor.",
        },
        activity: {
          value: "SIC kodu",
          note: "Faaliyeti tarif etmeniz yeterli; koda çevirip tescil dosyasında tanımlıyoruz.",
        },
        /* SWAP:UK_CT_RATE — oran countryContent.ts'ten geliyor, burada yeni bir
           sayı üretilmedi. Orada işaret ziyaretçiye görünen notun İÇİNDE
           duruyor ("SWAP: güncel oran…") ve ülke sayfasında öyle basılıyor;
           yeni bir açılış sayfasına geliştirici işareti taşımak istemedik.
           İşaret kod tarafında, burada; ziyaretçi aynı uyarıyı düz Türkçe
           okuyor. Oran güncellenecekse tek kaynak countryContent.ts. */
        tax: {
          value: "Kâr dilimine göre %19-25",
          note: "Güncel oran ve marjinal indirim eşiği kuruluş öncesi teyit ediliyor.",
        },
      },
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
      badge: "Kartla tahsilat kapalı",
      lead: "Türkiye'ye yakın bir geliştirme ekibi kuruyorsanız maliyet avantajı gerçek. Kartla tahsilat ana kanalınızsa burası doğru adres değil — bunu baştan söylüyoruz.",
      fit: [
        "Operasyonunuz Türkiye merkezliyse aynı dil, aynı saat dilimi, bir günlük yol.",
        "Bölgesel ticaret ve hizmet işlerinde maliyet avantajı gerçek.",
        "Sözleşme, fatura ve muhasebe pratiği Türkiye'ye benzediği için öğrenme eğrisi kısa.",
      ],
      cells: {
        structure: { value: FACTS.kktc.structure, note: "Tescil kısmı vekâletle yürüyor." },
        activity: {
          value: "Faaliyet konusu tarifi",
          note: "Faaliyet konusuna göre ek izin veya ruhsat gerekebiliyor.",
        },
        tax: {
          value: "Kurumlar vergisi ve KDV var",
          note: "Oran ve istisnalar faaliyete göre değiştiği için bu sayfada oran yayımlamıyoruz; çerçeve yazılı teklifte satır satır yazılıyor.",
        },
      },
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
