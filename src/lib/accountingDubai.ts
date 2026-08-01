import { PARTNERS } from "@/lib/brand";
import { AFTER_SETUP, type AfterItem } from "@/lib/afterSetup";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { serviceFor } from "@/lib/services";

/* ============================================================================
   DUBAİ MUHASEBE HİZMETİ — /dubai/muhasebe sayfasının tek içerik kaynağı

   NEDEN AYRI BİR DOSYA: countryContent.ts ve sectors.ts ile aynı gerekçe.
   Sayfa şablonunda tek bir cümle yok; ekranda görünen her kelime burada
   duruyor ki müşteri (ve gerekirse muhasebe tarafı) tek dosyayı baştan sona
   okuyup onaylayabilsin. Bileşenin içine dağılmış metin, gözden geçirilemeyen
   metindir.

   ---------------------------------------------------------------------------
   RAKAMLAR BURADA YAZILMIYOR — BU DOSYA ONLARI OKUYOR

   Bu sayfanın en büyük riski şuydu: aynı hizmetin fiyatı ve vergi çerçevesi
   sitede zaten iki yerde yazılı (afterSetup.ts ve countryContent.ts). Üçüncü
   bir kopya çıkarmak, üç kopyanın er ya da geç birbirinden ayrılması demekti.
   O yüzden bu dosya bir rakam, bir oran veya bir süre İCAT ETMİYOR; hepsini
   kaynağından okuyor ve yalnızca hangi kalemin bu sayfaya ait olduğunu
   söylüyor (bkz. ACCOUNTING_ITEM_IDS, accountingItems, ACC_TAX_ROWS).

   Pratik sonucu: afterSetup.ts'teki bir fiyat güncellendiğinde bu sayfa
   kendiliğinden doğru oluyor. Burada elle düzeltilecek hiçbir tutar yok.

   ---------------------------------------------------------------------------
   SWAP:ACC_PRICING — DEVRALINAN FİYAT ÇELİŞKİSİ (bu turda ÇÖZÜLMEDİ)

   afterSetup.ts'in başındaki SWAP:AFTER_PRICING notu burada da geçerli ve
   artık gözle görülür hâle geldi:

     · afterSetup.ts (müşterinin kendi hizmet belgesi) → aylık muhasebe 350 USD
     · pricing.ts (PRICING.dubai.annual = 2100) → services.ts bunu 12'ye bölüp
       "aylık 175 USD" olarak basıyor

   Bu sayfa BELGENİN rakamını (350) gösteriyor, çünkü müşterinin imzalı hizmet
   listesi o. pricing.ts'e dokunulmadı — hangi rakamın geçerli olduğu bizim
   değil müşterinin kararı ve yanlış olanı sabitlemek ikisini birden
   doğrulanamaz hâle getirirdi.

   DİKKAT: bu sayfa açılana kadar çelişki gizliydi (iki hizmet sayfası da
   kapalıydı). Şimdi /dubai/muhasebe 350 derken, fiyat yapılandırıcısındaki
   "Yıllık muhasebe" satırı hâlâ 2.100 diyor. Karar geldiğinde tek bir yer
   değişecek: ya afterSetup.ts'teki 350, ya pricing.ts'teki 2100.

   ---------------------------------------------------------------------------
   İÇERİĞİN KAYNAKLARI — hangi cümle nereden geldi

   1. Yükümlülük, kapsam ve fiyat kalemleri → lib/afterSetup.ts
      (Ortac Accounting Services LLC'nin "Şirket Kurduktan Sonra Sizi Neler
      Bekliyor?" belgesi.)
   2. Vergi çerçevesi (375.000 AED eşiği, %0/%9, 9 ay, KDV %5, kişisel gelir
      vergisi yok) → lib/countryContent.ts · COUNTRY_CONTENT.dubai.tax
   3. Hariç kalemler → lib/services.ts · accounting("dubai").excludes
   4. Beş aşamalı süreç ve aylık çıktı listesi → firmanın kendi muhasebe
      sayfasının metni (dijital defter, gelir-gider tabloları, bilanço, nakit
      akış, fatura/gider arşivi, aylık KDV raporları, yıllık beyan hazırlığı,
      banka ve denetim dosyası).
   5. Ortac'a dair iddialar → components/country/CountryOrtac.tsx (kendi
      muhasebe lisansı, taşerona verilmiyor, Dubai'de kendi ofis, Türkçe tek
      muhatap) ve brand.ts · PARTNERS (TaxDome = müşteri paneli).
   6. Murat Ortaç alıntısı → basına verdiği, doğrulanmış cümle.

   BU DOSYADA UYDURULMUŞ HİÇBİR ŞEY YOK. Müşteri sayısı, çalışan sayısı,
   sertifika listesi, lisans numarası, iletişim bilgisi geçmiyor — elimizde
   olmayan hiçbir alan doldurulmadı.

   ---------------------------------------------------------------------------
   DURUŞ (brand.ts · STANCE_LIMITS) — bu sayfada nasıl uygulandı

   · Banka onayı garantisi yok  → "banka dosyası hazırlıyoruz", hesabı bankanın
     açtığı açıkça yazılı.
   · Kesin süre taahhüdü yok    → sayfadaki tek süre mevzuatın kendi takvimi
     (beyan için 9 ay); bizim işlem hızımıza dair gün sayısı verilmiyor.
   · Kişiye özel vergi görüşü siteden verilmiyor → çerçeve anlatılıyor, çıkış
     AskCta. "Mali müşavire danışın" kalıbı hiç geçmiyor.
   ========================================================================= */

/* ---------------------------------------------------------------- tipler */

/* İkon adı string, bileşen değil: bu dosya müşteriye okutulan bir metin
   dosyası olarak kalsın istiyoruz. Eşleme sayfada yapılıyor — sectors.ts'teki
   SectorIcon ile aynı gerekçe. */
export type AccIcon =
  | "book"
  | "receipt"
  | "chart"
  | "wallet"
  | "stamp"
  | "bank"
  | "files"
  | "calendar"
  | "pin";

/** Özet önde, ayrıntı talep üzerine: `line` hep görünür, `more` tıklanınca açılır. */
export type AccPoint = { title: string; line: string; more?: string };

/**
 * Açılıştaki kısa cevap kartı. Sayfa dört soruya cevap veriyor (kim · ne ·
 * ne zaman · kaça) ve bu kartlar o dört cevabı tek ekranda veriyor; `to`
 * cevabın ayrıntısının durduğu bölümün id'si.
 *
 * `line` tek cümle olmak zorunda: kart uzarsa özet olmaktan çıkıyor ve
 * sayfanın başına ikinci bir metin duvarı kuruyor.
 */
export type AccAnswer = { k: string; line: string; to: string; cta: string };

/** Beş aşamalı süreç. `line` kapalıyken görünen, `detail` açılan. */
export type AccPhase = { title: string; line: string; detail: string };

/** Aylık döngüde elinize geçen çıktı. Altısı birden tek bir açılır bloğun içinde. */
export type AccDeliverable = { icon: AccIcon; title: string; line: string };

/** Sınır. Başlık ne yapılmadığını, satır bunun yerine ne olduğunu söyler. */
export type AccLimit = { title: string; line: string };

export type AccFaq = { q: string; a: string };

/** Kapanıştaki iç bağlantı. Çoğu adres şu an dolaşıma kapalı → SmartLink sönük basar. */
export type AccLink = { label: string; line: string; href: string };

/* KALDIRILDI — AccSection. Dokuz bölümün her birinin kendi id/heading/accent/
   lead dörtlüsü olduğu düzenin tipiydi. Bölümler altıya inince dördü artık
   bölüm değil blok (vergi çerçevesi, sınırlar, kuruluş kayıtları, kapanış
   bağlantıları) ve blokların accent'i yok — h2 değil h3 basılıyorlar. */

/* ------------------------------------------------------- kaynak seçicileri

   Aşağıdaki üç yardımcı bu dosyanın omurgası: sayfa fiyatı, vergi satırını ve
   ritmi bunlardan alıyor. Hiçbiri veri üretmiyor, hepsi var olan veriyi
   süzüyor. */

/**
 * Bu sayfaya ait yükümlülük kalemleri — afterSetup.ts'teki sekiz kalemden
 * muhasebe/vergi olanlar. Vize ve lisans yenileme BİLEREK dışarıda: ikisi de
 * gerçek maliyet ama muhasebe hizmeti değil, ve buraya alınırlarsa sayfa
 * "Dubai'de muhasebe" sorusuna değil "Dubai'de şirket tutmanın maliyeti"
 * sorusuna cevap vermeye başlar. O soruya ülke sayfası cevap veriyor; kapanış
 * bölümünden oraya bağlantı var.
 *
 * Sıra ekrandaki sıra: önce bir kez olan kayıtlar, sonra tekrar edenler,
 * en sonda yılda bir olan.
 */
export const ACCOUNTING_ITEM_IDS = [
  "kurumlar-vergisi-kaydi",
  "kdv-kaydi",
  "aylik-muhasebe",
  "kdv-beyannamesi",
  "yil-sonu",
  "bagimsiz-denetim",
] as const;

/** Kalemleri yukarıdaki sırayla döndürür. Kaynakta olmayan id sessizce düşer. */
export function accountingItems(): AfterItem[] {
  const items = AFTER_SETUP.dubai?.items ?? [];
  return ACCOUNTING_ITEM_IDS.map((id) => items.find((i) => i.id === id)).filter(
    (i): i is AfterItem => Boolean(i),
  );
}

/** Fiyat bölümünün altındaki yasal çerçeve — kaynağıyla aynı cümle. */
export const ACC_PRICE_FOOTNOTE = AFTER_SETUP.dubai?.footnote ?? "";

/** Vergi çerçevesi tablosu ve şerhi — countryContent.ts'ten aynen. */
export const ACC_TAX_ROWS = COUNTRY_CONTENT.dubai.tax.rows;
export const ACC_TAX_NOTE = COUNTRY_CONTENT.dubai.tax.note;

/** Hariç kalemler — services.ts'teki muhasebe tanımından. */
export const ACC_EXCLUDES = serviceFor("dubai", "muhasebe")?.excludes ?? [];

/** Müşteri panelinin adı brand.ts'ten okunuyor; ikinci kez yazılmıyor. */
export const ACC_PANEL = PARTNERS.find((p) => p.role === "Müşteri paneli")?.name ?? "";

/* ------------------------------------------------------------- yıl ritmi

   Takvim şeridi elle boyanmıyor: hangi ayda iş çıktığı afterSetup.ts'teki
   `months` dizilerinden geliyor. Yani "3 ayda bir KDV" iddiası ekranda bir
   tasarım tercihi değil, verinin kendisi. Kalem sıklığı değişirse şerit de
   değişiyor.

   `caption` yalnızca şeridin söyleyemediğini söylüyor: ay kutusu "burada iş
   var" der, beyan süresinin mevzuattan geldiğini diyemez. */
export type YearLane = {
  id: string;
  label: string;
  /** 1-12; hangi aylarda iş çıkıyor */
  months: number[];
  caption: string;
};

export function yearLanes(): YearLane[] {
  const items = AFTER_SETUP.dubai?.items ?? [];
  const pick = (id: string) => items.find((i) => i.id === id);

  const spec: { id: string; label: string; caption: string }[] = [
    {
      id: "aylik-muhasebe",
      label: "Aylık muhasebe",
      caption: "Her ay: kayıt, fatura işleme ve banka mutabakatı.",
    },
    {
      id: "kdv-beyannamesi",
      label: "KDV beyannamesi",
      caption: "KDV mükellefiyseniz üç aylık dönemlerde. Kaydınız yoksa bu satır hiç doğmuyor.",
    },
    {
      id: "yil-sonu",
      label: "Mali yıl kapanışı",
      caption: "Mali tablolar ve kurumlar vergisi beyanı; beyan süresi dönem bitiminden sonra işliyor.",
    },
  ];

  return spec
    .map((s) => {
      const item = pick(s.id);
      return item ? { id: s.id, label: s.label, months: item.months, caption: s.caption } : null;
    })
    .filter((l): l is YearLane => Boolean(l));
}

/* =========================================================================
   İÇERİK
   ========================================================================= */

export const ACCOUNTING_DUBAI = {
  /* ---------------------------------------------------------------- SEO

     Hedef sorgular: "dubai muhasebe hizmeti", "dubaide muhasebe", "dubai
     şirket muhasebesi", "dubai kurumlar vergisi beyannamesi", "dubai kdv
     kaydı". Başlık bunların ikisini birden karşılıyor ve firma adıyla
     bitiyor — sitedeki diğer sayfaların kalıbı bu.

     Açıklama 155 karakteri aşmıyor ve içinde tek bir vaat yok: arama
     sonucunda "garanti" veya "en ucuz" gören biri tıklayıp sayfada bunun
     karşılığını bulamazsa, sayfanın duruşuyla çelişmiş oluyoruz. */
  seo: {
    title: "Dubai'de Muhasebe Hizmeti — Şirket Muhasebesi, KDV ve Beyan | Ortac Global",
    description:
      "Dubai'de şirket muhasebesi: aylık defter, KDV kaydı ve beyannamesi, kurumlar vergisi beyanı, yıl sonu mali tabloları. Kapsam, takvim ve fiyat kalemleri açık yazılı.",
  },

  hero: {
    crumb: "Dubai · Muhasebe",
    title: "Dubai'de muhasebe hizmeti.",
    accent: "muhasebe hizmeti.",
    /* Eski giriş "baştan sona anlatıyor" diyordu; bu bir vaat değil uyarıydı.
       Yerine sayfanın kapatacağı dört soru yazılı — ziyaretçi daha ilk
       cümlede nereye geldiğini biliyor. */
    lead: "Şirket kurulduğu gün muhasebe de başlıyor. Bu sayfa dört soruyu kapatıyor: kim yapıyor, ne yapıyor, ne zaman yapıyor, ne kadar.",
  },

  /* -------------------------------------------------------------- 0 · özet

     SAYFANIN SÖZLEŞMESİ. Ziyaretçi kim, ne, ne zaman, kaça sorularıyla
     geliyor; dördünün cevabı burada tek ekranda duruyor ve her kart kendi
     ayrıntısının bulunduğu bölüme iniyor.

     Aynı zamanda eski atlama şeridinin yerini alıyor. Şerit yalnızca bölüm
     adlarını sayıyordu — okuyana hiçbir şey söylemeden yer kaplayan bir
     içindekiler listesiydi. Kart hem cevabı veriyor hem bağlantı.

     KURAL: her satır TEK cümle ve içinde rakam yok. Rakam girerse iki yerde
     (burada ve fiyat bölümünde) ayrı ayrı bakım gerektiren bir kopya doğar. */
  summary: {
    id: "ozet",
    heading: "Kısa cevap: kim, ne, ne zaman, ne kadar",
    accent: "Kısa cevap:",
    lead: "Dört soru, dört satır. Her birinin ayrıntısı hemen aşağıda, aynı sırayla.",
    answers: [
      {
        k: "Kim yapıyor",
        line: "Kendi muhasebe lisansımızla, Dubai'deki kendi ofisimizden; defter ve beyan taşerona gitmiyor.",
        to: "ortac-perspektifi",
        cta: "Nasıl yürüdüğü",
      },
      {
        k: "Ne yapıyor",
        line: "Aylık defter, KDV ve kurumlar vergisi beyanı, yıl sonu mali tabloları — bordro ve bağımsız denetim hariç.",
        to: "kapsam",
        cta: "Kapsamın tamamı",
      },
      {
        k: "Ne zaman",
        line: "Kayıtlar lisansın hemen ardından açılıyor; sonrası aylık, üç aylık ve yıllık üç ritimden oluşan bir döngü.",
        to: "takvim",
        cta: "Yıllık takvim",
      },
      {
        k: "Ne kadar",
        line: "Kalemler ayrı ayrı fiyatlanıyor: bazıları herkeste doğuyor, bazıları yalnızca şartlar oluşursa.",
        to: "fiyat",
        cta: "Fiyat kalemleri",
      },
    ] as AccAnswer[],
  },

  /* ---------------------------------------------------------- 1 · kuruluşta

     Eskiden kendi bölümüydü ("Muhasebe ne zaman başlıyor?"). Artık takvim
     bölümünün ilk bloğu: "ne zaman" sorusunun iki parçası var — kuruluşta ne
     açılıyor ve yıl içinde ne tekrar ediyor — ve bunlar iki ayrı bölümde
     dururken ziyaretçi ikisini birbirine bağlayamıyordu.

     Maddelerin ikinci cümlesi `more` içinde kapalı: üç madde yan yana altı
     cümle olunca blok metin duvarına dönüyor. */
  why: {
    id: "neden",
    title: "Kuruluşun hemen ardından açılan kayıtlar",
    points: [
      {
        title: "Kayıt tutmak yasal zorunluluk",
        line: "Şirket aktif olduğu sürece muhasebe kayıtlarının düzenli tutulması zorunlu.",
        more: "Yıl sonunda toplu tutulan defter hem cezaya hem de yanlış vergi hesabına açık: eksik belge o noktada geriye dönük toplanamıyor ve tablolar tahminle kapanıyor.",
      },
      {
        title: "Kurumlar vergisi kaydı ve TRN",
        line: "Kuruluşun ardından Federal Tax Authority (FTA) nezdinde kurumlar vergisi kaydının yasal süresi içinde tamamlanması gerekiyor.",
        more: "Başvuru dosyası hazırlanıyor, kayıt açılıyor ve TRN (vergi kimlik numarası) alınıyor. TRN olmadan beyan verilemiyor; bu yüzden kuruluşun hemen ardındaki ilk iş bu.",
      },
      {
        title: "KDV: kayıt mı, muafiyet mi",
        line: "Faaliyet yapınıza bağlı olarak ya KDV kaydı ya da muafiyet (VAT Exception) başvurusu yapılıyor.",
        more: "Herkes için doğmuyor. Yıllık vergiye tabi tedarikiniz eşiği aşıyorsa kayıt zorunlu hâle geliyor; aşmıyorsa hangi yolun uygun olduğu faaliyetinize göre değerlendiriliyor.",
      },
    ] as AccPoint[],
  },

  /* ------------------------------------------------------- 2 · vergi çerçevesi

     Artık kendi bölümü değil, takvim bölümünün altındaki bir blok. Sebebi:
     bölümün kendine ait tek bir cümlesi bile yoktu — satırlar
     countryContent.ts'ten geliyordu ve geriye 46 piksellik bir başlıkla 150
     karakterlik bir giriş kalıyordu. Aynı ağırlıkta dokuz bölümün biri
     olmasının tek sebebi buydu.

     ŞERHLER GİZLENMİYOR: her satırın altındaki not (ör. "otomatik muafiyet
     yok") üstündeki değeri niteliyor. Bir tıklamanın arkasına konsa sayfa
     "%0" ifadesini çıplak basmış olurdu — tam olarak STANCE_LIMITS'in
     yasakladığı şey. Kademelendirme metni azaltmak için var, şerhi gizlemek
     için değil. */
  taxFrame: {
    id: "vergi-cercevesi",
    title: "Neye göre tutuluyor: vergi çerçevesi",
  },

  /* --------------------------------------------------------------- 3 · takvim

     "Ne zaman" sorusunun tamamı: kuruluşta açılan kayıtlar (why), yıl içinde
     tekrar eden ritim (sahne) ve bunların dayandığı vergi çerçevesi
     (taxFrame). Üçü eskiden üç ayrı bölümdü ve ziyaretçi aralarındaki bağı
     kurmak zorunda kalıyordu.

     Burada BİLEREK olmayan şey: "kaçıncı gün" iddiası. Sayfadaki tek süre
     mevzuatın kendi takvimi. Bizim işlem hızımıza dair gün sayısı verilmiyor
     — firma kesin süre taahhüdü vermiyor. */
  calendar: {
    id: "takvim",
    heading: "Muhasebe ne zaman başlıyor, yıl içinde ne oluyor?",
    accent: "ne zaman başlıyor",
    lead: "Kayıtlar lisansın hemen ardından açılıyor. Sonrası üç ritimli bir döngü: aylık olan hiç durmuyor, üç aylık olan KDV mükellefiyseniz doğuyor, yıllık olan mali yılı kapatıyor.",
    /* Şeridin altındaki TEK satır. Eskiden burada iki ayrı şerh vardı
       (sahne altyazısı + bölüm notu) ve ikisi de aynı şeyi söylüyordu:
       kutular takvim değil, sıklık. Tek cümlede birleştirildi. */
    caption:
      "Kutular yalnızca işin hangi ayda çıktığını gösteriyor, teslim tarihini değil. Mali yıl şirketinize göre belirleniyor; şeritte kuruluşla başladığı varsayılıyor.",
    rhythmTitle: "Üç ritim tam olarak ne demek?",
  },

  /* --------------------------------------------------------------- 4 · kapsam

     SAYFANIN ANA BÖLÜMÜ — tek büyük başlık bu, kalanı destek. Ziyaretçinin
     asıl sorusu "ne yapıyorsunuz, neyi yapmıyorsunuz" ve üç katman aynı
     bölümde duruyor:

     · phases  → SÜREÇ. "Bu iş nasıl yürüyor" — beş aşama, sıralı, açık.
     · outputs → ÇIKTI. "Her ay elime ne geçiyor" — tek tıkla açılıyor.
     · limits  → SINIR. "Neyi yapmıyorsunuz" — açık, tıklamanın arkasında değil.

     Sınırlar eskiden ayrı bir bölümdü. Kapsamdan koparıldığında iki liste
     birbirini doğrulamak yerine iki ayrı iddia gibi okunuyordu; şimdi aynı
     başlığın altındalar ve "kapsıyor / kapsamıyor" tek bir cevap. */
  scope: {
    id: "kapsam",
    heading: "Muhasebe hizmetimiz tam olarak neyi kapsıyor?",
    accent: "tam olarak neyi kapsıyor?",
    lead: "Süreç beş aşamada yürüyor. Başlıklar özet; ayrıntı tıklayınca açılıyor.",
    phases: [
      {
        title: "Altyapı kurulumu",
        line: "Hesap planı, açılış bakiyeleri ve belge akışının kurulması.",
        detail:
          "Şirketin faaliyetine göre hesap planı çıkarılıyor, kuruluş dönemine ait bakiyeler işleniyor ve faturaların, fişlerin, banka ekstrelerinin bize hangi yoldan geleceği tanımlanıyor. Bu adım bir kez yapılıyor; sonraki her ay bunun üzerine biniyor.",
      },
      {
        title: "Gelir, gider ve fatura takibi",
        line: "Satış ve alış faturalarının işlenmesi, gider kayıtları, banka mutabakatı.",
        detail:
          "Satış ve alış faturaları kayda giriyor, gider belgeleri sınıflanıyor ve ay sonunda banka hareketleri defterle karşılaştırılıyor. Mutabakat bu döngünün kontrol noktası: defterle hesap tutmuyorsa sorun o ay içinde bulunuyor, yıl sonunda değil.",
      },
      {
        title: "KDV ve yıllık beyan",
        line: "Dönemsel KDV beyannamesi ve kurumlar vergisi beyanının hazırlanıp gönderilmesi.",
        detail:
          "KDV mükellefiyseniz üç aylık dönemlerde beyanname hazırlanıp FTA sistemine gönderiliyor. Mali yıl sonunda mali tablolar hazırlanıyor, vergi hesaplamaları yapılıyor ve kurumlar vergisi beyannamesi veriliyor. Yıl sonu çalışması aylık hizmetten bağımsız yürüyor ve ayrı fiyatlanıyor.",
      },
      {
        title: "Finansal raporlama ve analiz",
        line: "Gelir-gider tabloları, bilanço ve nakit akış raporları.",
        detail:
          "Kayıt tutmanın çıktısı yalnızca beyan değil: aynı defterden gelir-gider tablosu, bilanço ve nakit akış raporu çıkıyor. Bunlar şirketin nerede para kazanıp nerede kaybettiğini gösteren tablolar — vergi için değil, sizin kararlarınız için tutuluyorlar.",
      },
      {
        title: "Banka ve denetim uyumu",
        line: "Banka talepleri ve resmî denetimler için dosyanın hazır tutulması.",
        detail:
          "Banka hesap incelemesinde ya da bir denetim talebinde istenen şey hep aynı: güncel mali tablolar ve onları destekleyen belgeler. Kayıtlar ay ay tutulduğunda bu dosya zaten hazır oluyor; ayrıca hazırlanması gereken bir şey kalmıyor.",
      },
    ] as AccPhase[],

    outputsTitle: "Aylık döngüde elinize ne geçiyor?",
    outputs: [
      {
        icon: "book",
        title: "Dijital defter",
        line: "Kayıtlar panelden görünür durumda; ay kapandığında geriye dönük aranabiliyor.",
      },
      {
        icon: "chart",
        title: "Gelir-gider tablosu ve bilanço",
        line: "Dönemin özeti: ne girdi, ne çıktı, şirket nerede duruyor.",
      },
      {
        icon: "wallet",
        title: "Nakit akış raporu",
        line: "Kârlılıktan ayrı bir soru — paranın hangi ay girip hangi ay çıktığı.",
      },
      {
        icon: "files",
        title: "Fatura ve gider arşivi",
        line: "PDF ve e-fatura belgeleri dijital olarak saklanıyor, kayıtla eşleşiyor.",
      },
      {
        icon: "receipt",
        title: "Aylık KDV raporu",
        line: "Dönem beyannamesinin dayanağı; beyan verilmeden önce görebiliyorsunuz.",
      },
      {
        icon: "bank",
        title: "Banka ve denetim dosyası",
        line: "Talep geldiğinde gönderilecek hâlde duran güncel mali tablo seti.",
      },
    ] as AccDeliverable[],
  },

  /* --------------------------------------------------------------- 5 · sınırlar

     Kapsam bölümünün ikinci yarısı. Bu blok <details> içine KONMUYOR ve
     konmayacak. "Özet önde, detay talep üzerine" ilkesi bilgiyi saklamak
     için değil, sırayı düzenlemek için; sınırı tıklanmadan görünmez yapmak
     firmanın duruşuna aykırı olurdu.

     Beş maddenin dördü zaten sitede yazılı bir politikanın bu sayfadaki
     karşılığı (afterSetup notları, services.ts hariç listesi, STANCE_LIMITS).
     Kalıp her maddede aynı: birinci cümle sınırı koyar, ikinci cümle bunun
     yerine ne olduğunu söyler. */
  limits: {
    id: "sinirlar",
    title: "Neyi kapsamıyor?",
    lead: "Kapsamadığı, kapsadığı kadar önemli. Sonradan sürpriz çıkmasın diye açıkta duruyor.",
    items: [
      {
        title: "Yıl sonu beyanı aylık hizmete dahil değil",
        line: "Mali tabloların hazırlanması ve kurumlar vergisi beyanı ayrı yürüyen bir yıllık vergi uyum çalışması. Aylık hizmet alıyor olmanız bu kalemi kapsamıyor; fiyat bölümünde ayrı satır olarak duruyor.",
      },
      {
        title: "Bağımsız denetim ayrı bir hizmet",
        line: "Bazı serbest bölge otoriteleri ve belirli büyüklüğe ulaşan şirketler için zorunlu olabiliyor. Sizin bölgenizde zorunlu olup olmadığı lisansınıza bağlı; gerekiyorsa ayrı kalem olarak fiyatlanıyor.",
      },
      {
        title: "Bordro aylık muhasebede yok",
        line: "Çalışan bordrosu ayrı fiyatlanıyor. Kaç kişi olduğunu söylerseniz teklifte ayrı satır olarak gösteriyoruz.",
      },
      {
        title: "Kişiye özel vergi görüşü siteden verilmiyor",
        line: "Buradaki başlıklar genel çerçeve. Kendi kurgunuzun nasıl vergilendiğini sorabilirsiniz; cevabı bir sayfaya değil, sizin durumunuza yazıyoruz.",
      },
      {
        title: "Banka onayı ve otorite hızı bizde değil",
        line: "Banka dosyanızı bankanın istediği formatta hazırlıyoruz ama hesabı banka açıyor. Beyanların otorite tarafındaki işlem hızı için de kesin süre taahhüdü vermiyoruz.",
      },
    ] as AccLimit[],
  },

  /* ----------------------------------------------------------------- 6 · fiyat

     Akışın beşinci sorusu: "ne kadar". Kalemler ve tutarlar afterSetup.ts'ten
     okunuyor (bkz. accountingItems) — burada tek bir rakam yazılı değil.

     Toplam BİLEREK basılmıyor. Altı kalemin dördü koşullu: KDV kaydı, KDV
     beyannamesi ve denetim herkes için doğmuyor. Alt alta toplanan bir sayı,
     doğmayacak kalemleri de faturaymış gibi gösterirdi. İlk yıl toplamı
     ülke sayfasında, doğru şerhleriyle birlikte duruyor. */
  price: {
    id: "fiyat",
    heading: "Muhasebe tarafında ne kadar ödüyorsunuz?",
    accent: "ne kadar ödüyorsunuz?",
    lead: "Kalemler hizmet listemizden birebir. Hangisinin herkeste doğduğu, hangisinin şarta bağlı olduğu her kartın üstünde yazıyor.",
    noTotal:
      "Toplam bilerek yazmıyor: koşullu kalemler herkeste doğmuyor, alt alta toplanan bir sayı sizde çıkmayacak maliyeti faturaymış gibi gösterirdi.",
  },

  /* ----------------------------------------------------------------- 7 · ortac

     Müşterinin özellikle istediği bölüm: "Ortac'ın perspektifi". Bu, iddia
     üretmek değil, işin nasıl yürüdüğünü söylemek demek. Dört maddenin dördü
     de sitede başka bir yerde doğrulanmış (CountryOrtac, PARTNERS).

     Alıntı Murat Ortaç'ın basına verdiği cümle. Muhasebe hakkında değil,
     Dubai hakkında — ve bölüm onu tam da bu yüzden kullanıyor: sayfanın
     kalanı zaten "kurmak başlangıç, sürdürmek ayrı iş" diyor. */
  ortac: {
    id: "ortac-perspektifi",
    heading: "Bu işi kim yürütüyor?",
    accent: "kim yürütüyor?",
    lead: "Defteri kim tutuyor, beyanı kim gönderiyor, sorunuz olduğunda kime yazıyorsunuz.",
    facts: [
      {
        /* Mühür, tik değil: lisans bir onay değil bir yetki — Authority.tsx'te
           aynı ayrım aynı ikonla yapılıyor, sitede tutarlı kalsın. */
        icon: "stamp",
        title: "Kendi muhasebe lisansımız var",
        line: "Defter ve beyan taşerona gitmiyor. İşi yapan taraf, size fatura kesen tarafla aynı.",
      },
      {
        icon: "calendar",
        title: "Kuruluş sonrası aynı ekip",
        line: "Şirketi kuran ekip muhasebeyi de yürütüyor; kuruluş dosyasını ikinci kez anlatmıyorsunuz.",
      },
      {
        icon: "files",
        title: "Panel üzerinden takip",
        line: "Belge paylaşımı ve dosyalar müşteri panelinde duruyor; e-posta zincirinde kaybolmuyor.",
      },
      {
        icon: "pin",
        title: "Dubai'de kendi ofisimizden",
        line: "Otorite ve banka trafiği yerinden yürüyor, muhatabınız Türkçe konuşuyor.",
      },
    ] as AccDeliverable[],
    quote: {
      text: "Dubai'de şirket kurmak sadece bölgesel değil, küresel ölçekte de rekabet gücünü beraberinde getiriyor.",
      who: "Murat Ortaç",
      role: "Managing Partner",
    },
    /* KALDIRILDI — quoteTail. Alıntıyı sayfanın konusuna bağlayan 190
       karakterlik bir yorum satırıydı; bölümün kendi girişi ve dört madde
       aynı şeyi zaten söylüyordu. Alıntının bağlanmaya ihtiyacı yoksa
       durabilir, varsa zaten yanlış alıntıdır. */
  },

  /* -------------------------------------------------------------------- 8 · sss

     Sorular sayfada zaten cevaplanmış şeyleri toparlıyor; hiçbirinde yeni bir
     iddia yok. JSON-LD'deki FAQPage bu listeden üretiliyor, yani işaretleme
     ile ekranda görünen metin birebir aynı — uydurma zengin sonuç yok.

     ALTI SORU DA KALDI, kısaltma turunda dokunulmadı. İkisi sayfanın başka
     bir yerindeki cümleyi tekrar ediyor (zorunluluk → kuruluş kayıtları,
     bağımsız denetim → sınırlar) ama hepsi kapalı <details> içinde: kapalı
     hâlde ekranda yalnızca soru satırı var, yani tekrarın tarama maliyeti
     yok. Buna karşılık her soru ayrı bir arama sorgusunun karşılığı ve
     FAQPage işaretlemesini besliyor. Silmek metin değil görünürlük
     kaybettirirdi. */
  faq: {
    id: "sss",
    heading: "Sık sorulanlar",
    accent: "sorulanlar",
    lead: "Görüşmelerde en çok tekrar eden altı soru.",
    items: [
      {
        q: "Dubai'de muhasebe tutmak zorunlu mu?",
        a: "Evet. Şirket aktif olduğu sürece muhasebe kayıtlarının düzenli tutulması yasal zorunluluk. Yıl sonunda toplu tutulan defter hem cezaya hem de yanlış vergi hesabına açık.",
      },
      {
        q: "Kurumlar vergisi %0 ise neden muhasebe gerekiyor?",
        a: "%0 otomatik gelmiyor: şartları sağlayan nitelikli serbest bölge mükellefinin nitelikli gelirinde uygulanıyor. Şartın sağlandığını gösteren şey de kayıtların kendisi. Ayrıca kurumlar vergisi kaydı ve beyanı, oran %0 çıksa bile yerine getiriliyor.",
      },
      {
        q: "KDV kaydı herkes için gerekli mi?",
        a: "Hayır. Yıllık vergiye tabi tedarikiniz eşiği aşarsa kayıt zorunlu hâle geliyor; aşmıyorsa faaliyet yapınıza göre muafiyet (VAT Exception) başvurusu yapılabiliyor. Kaydınız yoksa üç aylık KDV beyannamesi kalemi de hiç doğmuyor.",
      },
      {
        q: "Kurumlar vergisi beyannamesi ne zaman veriliyor?",
        a: "Vergi döneminin bitiminden itibaren mevzuatın verdiği süre içinde. Bu süre bizim iş takvimimiz değil, otoritenin takvimi; hazırlığı erken bitirip beklemeyi tercih ediyoruz.",
      },
      {
        q: "Bağımsız denetim zorunlu mu?",
        a: "Bazı serbest bölge otoriteleri ve belirli büyüklüğe ulaşan şirketler için zorunlu olabiliyor. Sizin bölgenizde zorunlu olup olmadığı lisansınıza bağlı; zorunluysa ayrı bir hizmet olarak yürütülüyor.",
      },
      {
        q: "Aylık ücret her şirkette aynı mı?",
        a: "Hayır. Fiyat bölümündeki tutar başlangıç seviyesi; işlem hacmi yüksek şirketlerde aylık işlem sayısına göre değişebiliyor. Fatura ve hareket sayınızı söylerseniz teklifte net rakamla gösteriyoruz.",
      },
    ] as AccFaq[],
  },

  /* ------------------------------------------------------------------ 9 · sonra

     Akışın son sorusu: "sonra ne oluyor". Bağlantıların çoğu şu an dolaşıma
     kapalı ve SmartLink onları sönük basıyor — bu kasıtlı, sayfa açıldığında
     kendiliğinden canlanacaklar (bkz. lib/routes.ts). */
  close: {
    id: "sonra",
    title: "Muhasebe tek başına durmuyor",
    lead: "Banka ilişkisi, uyum yükümlülükleri ve lisans yenilemesi hep aynı kayıtlara bakıyor.",
    links: [
      {
        label: "Dubai'de şirket kuruluşu",
        line: "Lisans, tescil ve kuruluş sonrası bütün yükümlülüklerin tam listesi.",
        href: "/dubai",
      },
      {
        label: "Banka ve ödeme",
        line: "Kurumsal hesap başvurusu ve tahsilat kanalları; dosyayı muhasebe besliyor.",
        href: "/dubai/banka-hesabi",
      },
      {
        label: "Uyum (AML / goAML)",
        line: "Kayıt, politika dosyası ve dönemsel bildirim yükümlülükleri.",
        href: "/dubai/uyum",
      },
      {
        label: "Oturum ve vize",
        line: "Yatırımcı veya çalışan vizesi, Emirates ID ve oturum süreci.",
        href: "/dubai/oturum-vize",
      },
    ] as AccLink[],
    askTitle: "Kendi şirketinizde hangi kalemler doğuyor?",
    askLine:
      "Faaliyetinizi, aylık fatura sayınızı ve KDV durumunuzu anlatın; birlikte netleştirelim.",
    askLabel: "Durumumu sorayım",
  },
};
