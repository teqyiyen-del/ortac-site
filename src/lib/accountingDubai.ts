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

/** Beş aşamalı süreç. `line` kapalıyken görünen, `detail` açılan. */
export type AccPhase = { title: string; line: string; detail: string };

/** Aylık döngüde elinize geçen çıktı. Tek satır, açılmıyor — liste zaten kısa. */
export type AccDeliverable = { icon: AccIcon; title: string; line: string };

/** Sınır. Başlık ne yapılmadığını, satır bunun yerine ne olduğunu söyler. */
export type AccLimit = { title: string; line: string };

export type AccFaq = { q: string; a: string };

/** Kapanıştaki iç bağlantı. Çoğu adres şu an dolaşıma kapalı → SmartLink sönük basar. */
export type AccLink = { label: string; line: string; href: string };

export type AccSection = {
  /** <section id> — sayfa içi çapa ve dış bağlantı hedefi */
  id: string;
  heading: string;
  /** SplitWords'ün vurgulayacağı parça; heading'in içinde geçmeli */
  accent: string;
  lead: string;
};

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
    lead: "Şirket kurulduğu gün muhasebe de başlıyor. Bu sayfa Dubai'de defterin nasıl tutulduğunu, yıl içinde hangi beyanın ne zaman verildiğini ve bu işin bizde nasıl yürüdüğünü baştan sona anlatıyor.",
  },

  /* ---------------------------------------------------------------- 1 · neden

     Akışın ilk sorusu: "neden zorunlu ve ne zaman başlıyor". Üç madde tam
     olarak bunu kapatıyor ve üçü de tarihsel sırayla: şirket kuruluyor →
     vergi kaydı açılıyor → defter işlemeye başlıyor.

     Maddelerin ikinci cümlesi `more` içinde kapalı. Sebebi kalabalık: üç
     madde yan yana altı cümle olunca bölüm daha ilk ekranda metin duvarına
     dönüyordu. Birinci cümle tek başına anlamlı, ikinci cümle onun sonucu. */
  why: {
    id: "neden",
    heading: "Dubai'de muhasebe ne zaman başlıyor?",
    accent: "ne zaman başlıyor?",
    lead: "Lisans elinize geçtiğinde şirket yalnızca kurulmuş oluyor. Vergi tarafındaki kayıtlar ve defter, ilk faturayı kesmeden önce açılması gereken şeyler.",
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
    /* Sahnenin altındaki tek satır. Sahne "ne girer, ne çıkar" diyor; bu
       cümle onun neden önemli olduğunu söylüyor. */
    sceneCaption:
      "Muhasebe bir arşivleme işi değil: girdiler (fatura, fiş, ekstre) tek bir deftere işleniyor ve o defterden hem sizin gördüğünüz rapor hem de otoriteye giden beyan çıkıyor. İkisi aynı kaynaktan çıkmazsa uyuşmuyorlar.",
  },

  /* ------------------------------------------------------- 2 · vergi çerçevesi

     Satırlar countryContent.ts'ten okunuyor, burada yeniden yazılmıyor.
     Bölümün kendi metni yalnızca başlık ve giriş.

     ŞERHLER GİZLENMİYOR: her satırın altındaki not (ör. "otomatik muafiyet
     yok") üstündeki değeri niteliyor. Bir tıklamanın arkasına konsa sayfa
     "%0" ifadesini çıplak basmış olurdu — tam olarak STANCE_LIMITS'in
     yasakladığı şey. Kademelendirme metni azaltmak için var, şerhi gizlemek
     için değil. */
  taxFrame: {
    id: "vergi-cercevesi",
    heading: "Şirketinizi ilgilendiren vergi çerçevesi",
    accent: "vergi çerçevesi",
    lead: "Muhasebenin neye göre tutulduğunu belirleyen çerçeve. Oranlar ve eşikler genel; hangisinin sizde nasıl işlediği faaliyetinize ve lisansınıza bağlı.",
  } as AccSection,

  /* --------------------------------------------------------------- 3 · takvim

     Akışın ikinci sorusu: "yıl içinde takvim nasıl işliyor". Şerit veriden
     çiziliyor (yearLanes), üç ritim bloğu da onu kelimeye çeviriyor.

     Burada BİLEREK olmayan şey: "kaçıncı gün" iddiası. Sayfadaki tek süre
     mevzuatın kendi takvimi (beyan için 9 ay). Bizim işlem hızımıza dair gün
     sayısı verilmiyor — firma kesin süre taahhüdü vermiyor. */
  calendar: {
    id: "takvim",
    heading: "Bir mali yıl nasıl işliyor?",
    accent: "nasıl işliyor?",
    lead: "Muhasebe tek seferlik bir iş değil, üç ayrı ritmi olan bir döngü. Aylık olan hiç durmuyor, üç aylık olan KDV mükellefiyseniz doğuyor, yıllık olan mali yılı kapatıyor.",
    /* Şeridin altındaki tek satır: kutular "burada iş var" der, beyan
       süresinin nereden geldiğini diyemez. */
    sceneCaption:
      "Şerit yalnızca işin hangi ayda çıktığını gösteriyor. Kurumlar vergisi beyanının teslim süresi ayrı bir konu: vergi döneminin bitiminden itibaren işliyor ve mevzuatın verdiği süre kadar.",
    note: "Mali yıl şirketinize göre belirleniyor; şeritteki aylar temsilî ve mali yılın kuruluşla başladığı varsayılıyor.",
  },

  /* --------------------------------------------------------------- 4 · kapsam

     Akışın üçüncü sorusu: "biz tam olarak ne yapıyoruz". İki katman var ve
     ikisi farklı soruya cevap veriyor:

     · phases  → SÜREÇ. "Bu iş nasıl yürüyor" — beş aşama, sıralı.
     · outputs → ÇIKTI. "Her ay elime ne geçiyor" — süreç değil, teslim.

     Müşteriler bu iki soruyu ayrı ayrı soruyor ve tek listede birleştirilince
     ikisi de bulanıklaşıyor: "banka mutabakatı" bir iş adımı, "nakit akış
     raporu" bir teslim. Ayrı duruyorlar. */
  scope: {
    id: "kapsam",
    heading: "Muhasebe hizmetimiz tam olarak neyi kapsıyor?",
    accent: "tam olarak neyi kapsıyor?",
    lead: "Süreç beş aşamada yürüyor. Aşama başlıkları özet; her birinin altında o ayki işin ne olduğu duruyor.",
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

     Akışın dördüncü sorusu: "neyi yapmıyoruz". Bu bölüm <details> içine
     KONMUYOR ve konmayacak. "Özet önde, detay talep üzerine" ilkesi bilgiyi
     saklamak için değil, sırayı düzenlemek için; sınırı tıklanmadan görünmez
     yapmak firmanın duruşuna aykırı olurdu.

     Beş maddenin dördü zaten sitede yazılı bir politikanın bu sayfadaki
     karşılığı (afterSetup notları, services.ts hariç listesi, STANCE_LIMITS).
     Kalıp her maddede aynı: birinci cümle sınırı koyar, ikinci cümle bunun
     yerine ne olduğunu söyler. */
  limits: {
    id: "sinirlar",
    heading: "Neyi yapmıyoruz?",
    accent: "yapmıyoruz?",
    lead: "Aylık muhasebe ücretinin neyi kapsamadığı, kapsadığı kadar önemli. Sonradan sürpriz çıkmasın diye buraya yazıyoruz.",
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
    lead: "Kalemler hizmet listemizden birebir. Bazıları herkes için doğuyor, bazıları yalnızca şartlar oluşursa — hangisinin hangisi olduğu her satırın üstünde yazıyor.",
    noTotal:
      "Bilerek toplam yazmıyoruz: koşullu kalemler herkeste doğmuyor ve alt alta toplanmış bir sayı, sizde çıkmayacak bir maliyeti faturaymış gibi gösterirdi.",
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
    heading: "Bu işi biz nasıl yürütüyoruz?",
    accent: "nasıl yürütüyoruz?",
    lead: "Dubai'de muhasebe hizmeti alırken asıl soru kimin ne yaptığı: defteri kim tutuyor, beyanı kim gönderiyor, sorunuz olduğunda kime yazıyorsunuz.",
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
    /* Alıntının hemen altındaki cümle. Alıntı Dubai'yi anlatıyor, bu satır
       onu sayfanın konusuna bağlıyor — yoksa alıntı süs olarak kalırdı. */
    quoteTail:
      "O rekabet gücünü koruyan şey kuruluş değil, kuruluştan sonra düzgün tutulan defter. Banka incelemesi, lisans yenilemesi ve vergi beyanı hep aynı kayıtlara bakıyor.",
  },

  /* -------------------------------------------------------------------- 8 · sss

     Sorular sayfada zaten cevaplanmış şeyleri toparlıyor; hiçbirinde yeni bir
     iddia yok. JSON-LD'deki FAQPage bu listeden üretiliyor, yani işaretleme
     ile ekranda görünen metin birebir aynı — uydurma zengin sonuç yok. */
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
    heading: "Muhasebe tek başına durmuyor",
    accent: "tek başına durmuyor",
    lead: "Defter düzgün tutulduğunda ondan beslenen üç şey var: banka ilişkisi, uyum yükümlülükleri ve yıllık lisans yenilemesi. Hepsi aynı kayıtlara bakıyor.",
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
      "Faaliyetinizi, aylık fatura sayınızı ve KDV durumunuzu anlatın; hangi kalemin sizde çıkacağını birlikte netleştirelim.",
    askLabel: "Durumumu sorayım",
  },
};
