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
   BU TUR: "ANLATMICAZ, GÖSTERİCEZ"

   Müşterinin cümlesi: "hukuk makalesi okur gibi bir sürü yazı okumasını
   istemiyorum." Önceki tur bölüm sayısını dokuzdan altıya indirmişti ama
   metnin kendisi paragraf olarak kalmıştı: sayfa kapalıyken bile 8.444
   karakter görünüyordu.

   Bu turda değişen şey içerik değil, İÇERİĞİN BİÇİMİ. Aynı bilgi duruyor;
   yalnızca cümle olarak değil YAPI olarak duruyor:

     · dört cevap cümlesi        → dört künye satırı (etiket + kısa karşılık)
     · beş aşamalık süreç metni  → beş açılır satır (başlık görünür, gerisi tık)
     · altı çıktı kartı + süreç  → tek takas paneli (siz verirsiniz → biz veririz)
     · beş sınır paragrafı       → beş "yok" satırı (sınır görünür, gerekçe tık)
     · 520px'lik SVG takvim      → 12 sütunlu CSS ızgarası (telefonda da tam)
     · altı fiyat kartı          → altı satırlık fiyat listesi
     · kapanış paragrafı         → üç adımlı "nasıl başlanıyor" şeridi

   KURAL: bir iddia, bir oran, bir tutar, bir süre SİLİNMEDİ. Kısaltılan
   cümleler var (aynı iddianın daha az kelimeyle söylenmiş hâli); kaldırılan
   iddia yok. Uzun açıklamalar <details> içine indi — silinmediler, ekranın
   önünden çekildiler.

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
   SWAP:ACC_PRICING — DEVRALINAN FİYAT ÇELİŞKİSİ (bu turda da ÇÖZÜLMEDİ)

   afterSetup.ts'in başındaki SWAP:AFTER_PRICING notu burada da geçerli:

     · afterSetup.ts (müşterinin kendi hizmet belgesi) → aylık muhasebe 350 USD
       (yılda 4.200)
     · pricing.ts (PRICING.dubai.annual = 2100) → fiyat yapılandırıcısı
       "Yıllık muhasebe" satırını 2.100 olarak basıyor

   Bu sayfa BELGENİN rakamını (350) gösteriyor, çünkü müşterinin imzalı hizmet
   listesi o. pricing.ts'e DOKUNULMADI — hangi rakamın geçerli olduğu bizim
   değil müşterinin kararı ve yanlış olanı sabitlemek ikisini birden
   doğrulanamaz hâle getirirdi.

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
   7. TAKAS PANELİ (yeni) — uydurma değil, var olan iki listenin yan yana
      konmuş hâli. "Sizden gelen" üç kalem beşinci maddedeki süreç metninin
      kendi cümlelerinden çıkıyor (altyapı aşaması "faturaların, fişlerin,
      banka ekstrelerinin bize hangi yoldan geleceği" diyor; takip aşaması
      "satış ve alış faturaları", "gider belgeleri", "banka hareketleri"
      diyor). "Size dönen" sütunu zaten var olan çıktı listesi.
   8. NASIL BAŞLANIYOR (yeni) — üç adımın üçü de sayfada zaten yazılı olanın
      sıraya dizilmiş hâli: kapanıştaki "faaliyetinizi, aylık fatura sayınızı
      ve KDV durumunuzu anlatın", fiyat bölümünün "hangi kalemin sizde
      doğacağı" ayrımı ve SSS'in "teklifte net rakamla gösteriyoruz" cümlesi.

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

   NE GİZLENMEZ: bir rakamı, bir oranı veya bir iddiayı NİTELEYEN şerh asla
   <details> arkasına konmuyor. Fiyat satırındaki "başlangıç" sıfatı, kalem
   notları, vergi satırlarının altındaki "otomatik muafiyet yok" ve sınır
   başlıklarının kendisi hep açıkta. Tıklamanın arkasına giden şey yalnızca
   AÇIKLAMA: nitelik değil, ayrıntı.
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
 * Açılıştaki künye satırı. Sayfa dört soruya cevap veriyor (kim · ne · ne
 * zaman · kaça) ve bu satırlar dördünü tek ekranda kapatıyor; `to` cevabın
 * ayrıntısının durduğu bölümün id'si.
 *
 * ESKİDEN `line` VARDI, TEK CÜMLEYDİ VE UZUNDU (ortalama 105 karakter). Dört
 * kartın dördü birden cümle taşıyınca sayfanın başında ikinci bir metin
 * duvarı doğuyordu. Artık `v` var: cevabın kendisi, üç-dört kelime. Cümlenin
 * söylediği her şey zaten bağlantının indiği bölümde yazılı.
 */
export type AccAnswer = { k: string; v: string; icon: AccIcon; to: string };

/** Beş aşamalı süreç. Kapalıyken yalnızca `title` görünür; ikisi de açılır. */
export type AccPhase = { title: string; line: string; detail: string };

/** Takas panelinin bir satırı — hem "sizden gelen" hem "size dönen" tarafında. */
export type AccChip = { icon: AccIcon; label: string };

/** Aylık döngüde elinize geçen çıktı. `title` panelde görünür, `line` tıkla. */
export type AccDeliverable = { icon: AccIcon; title: string; line: string };

/** Sınır. Başlık ne yapılmadığını söyler ve HEP GÖRÜNÜR; satır gerekçesi. */
export type AccLimit = { title: string; line: string };

export type AccFaq = { q: string; a: string };

/** Kapanıştaki iç bağlantı. Çoğu adres şu an dolaşıma kapalı → SmartLink sönük basar. */
export type AccLink = { label: string; line: string; href: string };

/** "Nasıl başlanıyor" şeridinin bir adımı. */
export type AccStep = { title: string; line: string };

/* ------------------------------------------------------- kaynak seçicileri

   Aşağıdaki yardımcılar bu dosyanın omurgası: sayfa fiyatı, vergi satırını ve
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

/** Fiyat listesinin altındaki yasal çerçeve — kaynağıyla aynı cümle. */
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
   var" der, beyan süresinin mevzuattan geldiğini diyemez. Şeridin yüzeyinde
   bu yüzden yalnızca etiket + sıklık duruyor, caption'lar açılır blokta. */
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

/**
 * Kaç ayda bir olduğunu kutuların kendisinden okur — elle yazılmıyor.
 * Şeridin etiketi ile kutuları böylece birbirinden ayrı düşemiyor.
 *
 * Eskiden AccountingScenes.tsx'in içindeydi; şerit SVG'den CSS ızgarasına
 * taşınınca buraya alındı (o dosya da hâlâ kendi kopyasını kullanıyor —
 * bkz. page.tsx'teki not).
 */
export function frequencyLabel(count: number): string {
  if (count >= 12) return "her ay";
  if (count === 4) return "3 ayda bir";
  if (count === 1) return "yılda bir";
  return `yılda ${count} kez`;
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

     SEO BU TURDA BİR TASARIM KISITI DEĞİL: müşteri "seoyu bi kenara
     bırakalım" dedi. Yine de teknik iskelet bozulmadı, çünkü bozmanın hiçbir
     karşılığı yoktu — tek h1, id'li bölümler, h2/h3 hiyerarşisi ve JSON-LD
     metin miktarıyla ilgisiz. Metin de silinmedi: açılır bölümlere indi ve
     kapalı <details> içeriği Google tarafından normal biçimde indeksleniyor.
     Yani sayfa hem sade göründü hem içerik sayfada kaldı. */
  seo: {
    title: "Dubai'de Muhasebe Hizmeti — Şirket Muhasebesi, KDV ve Beyan | Ortac Global",
    description:
      "Dubai'de şirket muhasebesi: aylık defter, KDV kaydı ve beyannamesi, kurumlar vergisi beyanı, yıl sonu mali tabloları. Kapsam, takvim ve fiyat kalemleri açık yazılı.",
  },

  hero: {
    crumb: "Dubai · Muhasebe",
    title: "Dubai'de muhasebe hizmeti.",
    accent: "muhasebe hizmeti.",
    /* Dört soru sayılıyor, cevaplanmıyor: cevaplar hemen altındaki künyede.
       Eski giriş aynı şeyi 139 karakterde söylüyordu. */
    lead: "Kim yapıyor, ne yapıyor, hangi ay ne oluyor, ne kadar tutuyor.",
  },

  /* -------------------------------------------------------------- 0 · özet

     SAYFANIN SÖZLEŞMESİ, ARTIK CÜMLE DEĞİL KÜNYE. Dört soru, dört karşılık,
     dört bağlantı. Karşılıklar üç-dört kelime çünkü burası cevabın yeri
     değil, cevabın NEREDE olduğunun yeri.

     KURAL: karşılıklarda rakam yok. Rakam girerse iki yerde (burada ve fiyat
     listesinde) ayrı ayrı bakım gerektiren bir kopya doğar. */
  summary: {
    id: "ozet",
    heading: "Kısa cevap: kim, ne, ne zaman, ne kadar",
    accent: "kim, ne, ne zaman, ne kadar",
    answers: [
      {
        k: "Kim yapıyor",
        v: "Ortac, kendi muhasebe lisansıyla",
        icon: "stamp",
        to: "ortac-perspektifi",
      },
      {
        k: "Ne yapıyor",
        v: "Defter · KDV · Beyan · Mali tablo",
        icon: "book",
        to: "kapsam",
      },
      {
        k: "Ne zaman",
        v: "Aylık · 3 aylık · Yıllık",
        icon: "calendar",
        to: "takvim",
      },
      {
        k: "Ne kadar",
        v: "Altı kalem, ayrı ayrı",
        icon: "wallet",
        to: "fiyat",
      },
    ] as AccAnswer[],
  },

  /* ---------------------------------------------------------- 1 · kuruluşta

     Takvim bölümünün ilk bloğu: "ne zaman" sorusunun iki parçası var —
     kuruluşta ne açılıyor ve yıl içinde ne tekrar ediyor — ve bunlar iki ayrı
     bölümde dururken ziyaretçi ikisini birbirine bağlayamıyordu.

     ÜÇÜ DE KAPALI GELİYOR. Yüzeyde yalnızca başlık var; başlıklar zaten
     kuruluşta ne açıldığını söylüyor ("kurumlar vergisi kaydı ve TRN"). `line`
     ve `more` birlikte açılıyor — eskiden `line` açıkta, `more` kapalıydı ve
     üç madde yan yana altı cümle tutuyordu. */
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

     Takvim bölümünün altındaki blok. Satırlar countryContent.ts'ten geliyor;
     burada yalnızca başlık var.

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
     tekrar eden ritim (şerit) ve bunların dayandığı vergi çerçevesi
     (taxFrame).

     ŞERİT ARTIK SVG DEĞİL: 12 sütunlu bir CSS ızgarası. Sebebi mobil —
     SVG 520 pikselin altında okunmuyordu ve kendi kabında yatay kayıyordu,
     yani telefonda ziyaretçinin keşfetmesi gereken gizli bir kaydırma vardı.
     Izgara 375 pikselde de tam görünüyor. Kutuların dolduğu aylar yine
     afterSetup.ts'ten (bkz. yearLanes).

     Burada BİLEREK olmayan şey: "kaçıncı gün" iddiası. Sayfadaki tek süre
     mevzuatın kendi takvimi. */
  calendar: {
    id: "takvim",
    heading: "Muhasebe ne zaman başlıyor, hangi ay ne oluyor?",
    accent: "hangi ay ne oluyor?",
    lead: "Kayıtlar lisansın hemen ardından açılıyor. Sonrası üç ritim.",
    stripTitle: "İlk 12 ayda iş hangi aylarda çıkıyor?",
    /* Şeridin okunma anahtarı. Kutunun ne demek olduğunu yazıyla söylemek
       yerine kutunun kendisini gösteriyor — lejant da bir "göster". */
    legendOn: "iş var",
    legendOff: "o kalem doğmuyor",
    /* Şeridin altındaki TEK satır. Kutuların söyleyemediği iki şeyi söylüyor:
       teslim tarihi değil, ve mali yıl varsayımı. */
    caption:
      "Kutular işin hangi ay çıktığını gösteriyor, teslim tarihini değil. Mali yıl şirketinize göre belirleniyor; şeritte kuruluşla başladığı varsayılıyor.",
    rhythmTitle: "Üç ritim tam olarak ne demek?",
  },

  /* --------------------------------------------------------------- 4 · kapsam

     SAYFANIN ANA BÖLÜMÜ. Üç katman, üç ayrı görsel biçim — üçü de aynı
     biçimde çizilseydi ziyaretçi aralarındaki farkı okumak zorunda kalırdı:

     · phases   → SÜREÇ, numaralı ray. "Bu iş nasıl yürüyor."
     · exchange → TAKAS, iki sütun ve bir ok. "Ben ne veriyorum, ne alıyorum."
     · limits   → SINIR, çarpı işaretli satırlar. "Neyi yapmıyorsunuz."

     phases KAPALI GELİYOR ve bu bir bilgi kaybı değil: beş başlık üst üste
     okunduğunda süreç zaten okunuyor (altyapı → takip → beyan → raporlama →
     uyum). Açıklama isteyen tıklıyor. */
  scope: {
    id: "kapsam",
    heading: "Muhasebe hizmetimiz tam olarak neyi kapsıyor?",
    accent: "tam olarak neyi kapsıyor?",
    lead: "Beş aşama. Başlığa dokunun, o aşamada ne olduğu açılsın.",
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
  },

  /* --------------------------------------------------------- 5 · takas paneli

     YENİ VE BİLEREK EN GÖRSEL PARÇA. Ziyaretçinin sorduğu ama sayfanın hiçbir
     yerinde tek bakışta cevaplanmayan iki soru: "benden ne isteniyor" ve
     "karşılığında ne alıyorum". İkisi de metnin içine gömülüydü.

     Sol sütun süreç metninden çıkarıldı (uydurma değil; bkz. dosya başındaki
     kaynak listesi · 7). Sağ sütun zaten var olan aylık çıktı listesi — eski
     hâlinde altı karttı ve tek başına 540 karakter görünür metin tutuyordu.
     Şimdi altı etiket; açıklamalar tek bir açılır blokta.

     Aradaki ok tek yönlü: bu bir "iş birliği" değil bir devir. Belge sizde,
     defter bizde, çıktı yine sizde. */
  exchange: {
    title: "Siz ne veriyorsunuz, biz ne veriyoruz?",
    youTitle: "Sizden gelen",
    usTitle: "Size dönen",
    you: [
      { icon: "receipt", label: "Satış ve alış faturaları" },
      { icon: "files", label: "Gider belgeleri ve fişler" },
      { icon: "bank", label: "Banka ekstreleri" },
    ] as AccChip[],
    outputsTitle: "Bu çıktılar ne işe yarıyor?",
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

  /* --------------------------------------------------------------- 6 · sınırlar

     Kapsam bölümünün üçüncü katmanı. SINIRIN KENDİSİ AÇIK: her satırın
     başlığı tıklanmadan görünüyor ve başlık zaten sınırı koyuyor ("Bordro
     aylık muhasebede yok"). Tıklamanın arkasına giden şey gerekçe.

     Bu ayrım önemli: "özet önde, detay talep üzerine" ilkesi sırayı
     düzenlemek için var, sınırı görünmez yapmak için değil. Eski hâlde beş
     maddenin beş gerekçesi de açıktaydı ve tek başına 900 karakter tutuyordu;
     ziyaretçi beş sınırı görmek için beş paragraf okumak zorundaydı. */
  limits: {
    id: "sinirlar",
    title: "Neyi kapsamıyor?",
    lead: "Kapsamadığı, kapsadığı kadar önemli.",
    items: [
      {
        title: "Yıl sonu beyanı aylık hizmete dahil değil",
        line: "Mali tabloların hazırlanması ve kurumlar vergisi beyanı ayrı yürüyen bir yıllık vergi uyum çalışması. Aylık hizmet alıyor olmanız bu kalemi kapsamıyor; fiyat listesinde ayrı satır olarak duruyor.",
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

  /* ----------------------------------------------------------------- 7 · fiyat

     Altı kart yerine altı SATIR. Kart düzeni her kalemi eşit ağırlıkta bir
     nesne yapıyordu ve tutarlar kartın içinde kayboluyordu; liste düzeninde
     göz tek sütunda aşağı iniyor ve tutarlar alt alta hizalı duruyor — fiyat
     listesi zaten böyle okunur.

     Kalemler ve tutarlar afterSetup.ts'ten okunuyor; burada tek bir rakam
     yazılı değil.

     NE AÇIK KALIR: rozet (herkeste doğuyor mu), ritim, tutar, tutarın sıfatı
     ("başlangıç") ve kalemin kendi notu. Beşi de tutarı NİTELİYOR.
     NE TIKLAMANIN ARKASINDA: kalemin ne olduğu ve kapsam maddeleri. */
  price: {
    id: "fiyat",
    heading: "Muhasebe tarafında ne kadar ödüyorsunuz?",
    accent: "ne kadar ödüyorsunuz?",
    lead: "Rozet, kalemin herkeste doğup doğmadığını söylüyor.",
    /* Eski hâli 160 karakterdi ve aynı şeyi söylüyordu. */
    noTotal: "Toplam yok: koşullu kalemler herkeste doğmuyor.",
    /* Kapalı hâlde bile tutarın iki niteliğini basıyor (USD, KDV hariç);
       tamamı — resmî harç değişikliği, süre taahhüdü, kalemin doğup doğmaması
       — tek tıkla açılıyor. Gizlenmiş değil, öne çıkmıyor. */
    termsTitle: "Tutarlar USD ve KDV hariç — tam şartlar",
  },

  /* ----------------------------------------------------------------- 8 · ortac

     Müşterinin özellikle istediği bölüm: "Ortac'ın perspektifi". Bu, iddia
     üretmek değil, işin nasıl yürüdüğünü söylemek demek. Dört maddenin dördü
     de sitede başka bir yerde doğrulanmış (CountryOrtac, PARTNERS).

     Dört başlık yüzeyde, dört açıklama tek açılır blokta. Başlıklar tek
     başına okunabilir olsun diye kısaltıldı ("Kendi muhasebe lisansımız var"
     → "Kendi muhasebe lisansımız"); iddia aynı, sıfat düştü.

     Alıntı Murat Ortaç'ın basına verdiği cümle. Muhasebe hakkında değil,
     Dubai hakkında — ve bölüm onu tam da bu yüzden kullanıyor: sayfanın
     kalanı zaten "kurmak başlangıç, sürdürmek ayrı iş" diyor. */
  ortac: {
    id: "ortac-perspektifi",
    heading: "Bu işi kim yürütüyor?",
    accent: "kim yürütüyor?",
    factsTitle: "Dördü ne demek?",
    facts: [
      {
        /* Mühür, tik değil: lisans bir onay değil bir yetki — Authority.tsx'te
           aynı ayrım aynı ikonla yapılıyor, sitede tutarlı kalsın. */
        icon: "stamp",
        title: "Kendi muhasebe lisansımız",
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
        title: "Dubai'de kendi ofisimiz",
        line: "Otorite ve banka trafiği yerinden yürüyor, muhatabınız Türkçe konuşuyor.",
      },
    ] as AccDeliverable[],
    quote: {
      text: "Dubai'de şirket kurmak sadece bölgesel değil, küresel ölçekte de rekabet gücünü beraberinde getiriyor.",
      who: "Murat Ortaç",
      role: "Managing Partner",
    },
  },

  /* -------------------------------------------------------------------- 9 · sss

     Sorular sayfada zaten cevaplanmış şeyleri toparlıyor; hiçbirinde yeni bir
     iddia yok. JSON-LD'deki FAQPage bu listeden üretiliyor, yani işaretleme
     ile ekranda görünen metin birebir aynı — uydurma zengin sonuç yok.

     ALTI SORU DA KALDI. Hepsi kapalı <details> içinde: kapalı hâlde ekranda
     yalnızca soru satırı var, yani tekrarın tarama maliyeti yok. */
  faq: {
    id: "sss",
    heading: "Sık sorulanlar",
    accent: "sorulanlar",
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
        a: "Hayır. Fiyat listesindeki tutar başlangıç seviyesi; işlem hacmi yüksek şirketlerde aylık işlem sayısına göre değişebiliyor. Fatura ve hareket sayınızı söylerseniz teklifte net rakamla gösteriyoruz.",
      },
    ] as AccFaq[],
  },

  /* ------------------------------------------------------------------ 10 · sonra

     Bağlantıların çoğu şu an dolaşıma kapalı ve SmartLink onları sönük
     basıyor — bu kasıtlı, sayfa açıldığında kendiliğinden canlanacaklar
     (bkz. lib/routes.ts). Alt satırlar kısaldı: kart açıklaması değil,
     bağlantının nereye gittiğini söyleyen etiket. */
  close: {
    id: "sonra",
    title: "Muhasebe tek başına durmuyor",
    links: [
      {
        label: "Dubai'de şirket kuruluşu",
        line: "Lisans, tescil ve tüm yükümlülükler",
        href: "/dubai",
      },
      {
        label: "Banka ve ödeme",
        line: "Kurumsal hesap ve tahsilat kanalları",
        href: "/dubai/banka-hesabi",
      },
      {
        label: "Uyum (AML / goAML)",
        line: "Kayıt, politika dosyası, bildirim",
        href: "/dubai/uyum",
      },
      {
        label: "Oturum ve vize",
        line: "Vize, Emirates ID, oturum süreci",
        href: "/dubai/oturum-vize",
      },
    ] as AccLink[],
  },

  /* --------------------------------------------------------- 11 · nasıl başlanıyor

     Sayfanın kapanışı artık bir paragraf değil, üç adım. Ziyaretçinin son
     sorusu "peki ne yapmam gerekiyor" ve bunun cevabı eskiden kapanış
     kutusunun içinde tek cümleydi.

     Üç adımın üçü de sayfada zaten yazılı olanın sıraya dizilmiş hâli (bkz.
     dosya başındaki kaynak listesi · 8). Yeni bir söz, yeni bir süre, yeni
     bir sayı yok — özellikle "kaç günde döneriz" yok, çünkü firma kesin süre
     taahhüdü vermiyor. */
  start: {
    title: "Nasıl başlanıyor?",
    steps: [
      {
        title: "Siz anlatın",
        line: "Faaliyetiniz, aylık fatura sayınız ve KDV durumunuz.",
      },
      {
        title: "Kalemleri çıkaralım",
        line: "Hangi kalemin sizde doğduğunu, hangisinin doğmadığını netleştirelim.",
      },
      {
        title: "Yazılı teklif",
        line: "Doğan kalemler net rakamla, ayrı satırlar hâlinde.",
      },
    ] as AccStep[],
    askLabel: "Durumumu sorayım",
  },
};
