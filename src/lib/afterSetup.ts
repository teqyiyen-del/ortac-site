import type { Country } from "@/lib/store";

/* ============================================================================
   KURULUŞ SONRASI YÜKÜMLÜLÜKLER — içerik kaynağı
   ==========================================================================

   Bu dosya CountryAfter bölümünün tek veri kaynağı. Ayrı durmasının sebebi
   countryContent.ts ile aynı: buradaki her satır muhasebe tarafının onayına
   tabi ve mali müşavirin tek dosyayı baştan sona okuyup onaylayabilmesi
   gerekiyor. Bileşen içinde dağılmış metin, gözden geçirilemeyen metindir.

   Kaynak: Ortac Accounting Services LLC (Murat Ortaç, Certified Accountant)
   tarafından iletilen "Dubai'de Şirket Kurduktan Sonra Sizi Neler Bekliyor?"
   dokümanı. Kalem sırası bilerek dokümandaki sırayla aynı — karşılaştırarak
   okuyabilmek için. Ekrandaki sıralama bileşende ritme göre yeniden
   düzenleniyor, veri sırası korunuyor.

   ---------------------------------------------------------------------------
   SWAP:AFTER_PRICING — DİKKAT, ÇÖZÜLMEMİŞ FİYAT ÇELİŞKİSİ
   ---------------------------------------------------------------------------
   Buradaki aylık muhasebe 350 USD/ay, yani 12 ayda 4.200 USD. Oysa
   lib/pricing.ts içindeki PRICING.dubai.annual = 2100 ve fiyat
   yapılandırıcısı (CountryPricing) "Yıllık muhasebe" satırını o rakamla
   basıyor. İki sayı aynı hizmeti anlatıyor ve birbirini tutmuyor: aynı
   ziyaretçi sitede aynı hizmeti iki farklı fiyatla görebiliyor.

   Bu dosya bilerek belgenin rakamlarını kullanıyor; belge müşterinin kendi
   hizmet listesi. pricing.ts'e DOKUNULMADI — hangi rakamın geçerli olduğu
   bizim vereceğimiz bir karar değil, müşterinin vereceği bir karar. Yanlış
   olanı sabitlemek iki rakamı da doğrulanamaz hâle getirirdi.

   Karar geldiğinde yapılacak: ya buradaki `usd: 350` ve firstYear'daki 4.200
   satırı güncellenir, ya da PRICING.dubai.annual = 4200 yapılır. İkisi birden
   değil; tek doğru rakam iki yerde de aynı görünmeli.

   Aynı sorunun ikinci hâli: belgedeki 2 yıllık yatırımcı oturumu + Emirates
   ID kişi başı 2.400 USD iken PRICING.dubai.perVisa = 750. Bu kalem de
   müşteri teyidi bekliyor; burada uzlaştırılmadı.
   ========================================================================= */

/** Yükümlülüğün ne sıklıkla tekrar ettiği. Bölümün okuma ekseni bu. */
export type Rhythm = "tek-seferlik" | "aylik" | "uc-aylik" | "yillik" | "iki-yillik";

/**
 * Kalemin ilk yıl örnek toplamına göre konumu. Üç durum var ve üçü de
 * ekranda ayrı renkle çıkıyor; PDF'in en çok vurguladığı nokta "gerekli ise"
 * olanların toplamın DIŞINDA kaldığı, o yüzden bu ayrım veri seviyesinde
 * duruyor, bileşende yeniden yorumlanmıyor.
 */
export type Inclusion =
  /** ilk yıl örnek hesabına giriyor */
  | "ornekte"
  /** koşullu: yalnızca şartlar oluşursa uygulanıyor, toplama girmiyor */
  | "gerekli-ise"
  /** kişi veya talep bazlı: herkes için otomatik doğmuyor, toplama girmiyor */
  | "istege-bagli";

export type AfterPrice = {
  /** USD */
  usd: number;
  /** ekranda tutarın altına yazılan periyot: "tek seferlik", "aylık" … */
  unit: string;
  /** KDV hariç mi. Lisans yenileme resmî harç ağırlıklı olduğu için false */
  plusVat: boolean;
  /** tutar sabit değilse önüne düşen sıfat */
  qualifier?: "başlangıç" | "ortalama";
};

export type AfterItem = {
  id: string;
  title: string;
  /** resmî İngilizce adı — yazışmalarda ve FTA panelinde bu adla karşılaşıyorlar */
  en?: string;
  rhythm: Rhythm;
  inclusion: Inclusion;
  price: AfterPrice;
  /** kalemin ne olduğu, tek paragraf */
  line: string;
  /** hizmetin kapsamı; PDF'te madde madde verilenler aynen */
  scope?: string[];
  /** kapsamın dışında kalan uyarı veya değişkenlik notu */
  note?: string;
  /**
   * İlk 12 ayın hangi aylarında iş çıkıyor (1-12). Bölümdeki şerit bu diziden
   * çiziliyor; yani "ritim" ekranda elle boyanmıyor, veriden geliyor.
   * Aylar temsilî: mali yılın kuruluşla birlikte başladığı varsayılıyor.
   */
  months: number[];
};

/** İlk yıl örnek hesabının satırları. Toplam burada YAZILMIYOR, toplanıyor. */
export type FirstYearLine = {
  /** hangi kaleme karşılık geldiği — liste ile hesap arasındaki bağ */
  id: string;
  label: string;
  /** hesabın nasıl çıktığı: "12 ay × 350 USD" */
  qty: string;
  usd: number;
};

export type EntryRow = {
  who: string;
  /** azami giriş aralığı, gün */
  days: number;
  /** aynı şeyin insan dilindeki hâli */
  short: string;
  line: string;
};

export type AfterSetup = {
  title: string;
  /** SplitWords'ün vurgulayacağı parça; title'ın içinde geçmeli */
  accent: string;
  lead: string;
  items: AfterItem[];
  /**
   * Çizelge kapalıyken açma düğmesinin altında duran tek satır. Kalem
   * başlıklarının kendisi uzun ("Mali Yıl Sonu ve Kurumlar Vergisi Beyanı"),
   * kapalı hâlde sekizini yan yana dizmek düğmeyi yeniden kalabalık yapardı.
   * Onun yerine kısaltılmış bir tadımlık: ne olduğunu anlatıyor, listeyi
   * ele vermiyor.
   */
  itemsHint: string;
  firstYear: {
    kicker: string;
    title: string;
    lead: string;
    lines: FirstYearLine[];
    /**
     * Özet hâlde, toplamın hemen altında duran dürüstlük cümlesi. Döküm
     * kapalıyken bile görünmesi şart: "9.820" rakamını her şeyi kapsayan bir
     * fiyat sanan biri, açmadığı için yanılmış olmamalı.
     */
    anchorNote: string;
    /** toplamın dışındakiler için tek cümlelik gerekçe */
    outNote: string;
  };
  entry: {
    kicker: string;
    title: string;
    lead: string;
    rows: EntryRow[];
    note: string;
  };
  /** bölümün altındaki yasal çerçeve; STANCE_LIMITS'e uyar */
  footnote: string;
};

/* SWAP:AFTER_SETUP — yalnızca Dubai verisi var. İngiltere ve KKTC için
   karşılığı gelmeden buraya satır YAZILMAZ: bölüm veri olmayan ülkede hiç
   çıkmıyor (bkz. CountryAfter). Boş bir iskelet göstermek, o ülkede
   yükümlülük yokmuş izlenimi verirdi. */
export const AFTER_SETUP: Partial<Record<Country, AfterSetup>> = {
  dubai: {
    title: "Şirket kurulduktan sonra sizi neler bekliyor?",
    accent: "sizi neler bekliyor?",
    lead: "Kuruluş yalnızca ilk adım: sonrasında muhasebe, vergi ve lisans tarafında tekrar eden yükümlülükler başlıyor. Hepsini rakamıyla birlikte baştan yazıyoruz ki sonradan sürpriz maliyet çıkmasın.",

    itemsHint:
      "Kurumlar vergisi kaydı, aylık muhasebe, KDV, yıl sonu beyanı, bağımsız denetim, lisans yenileme ve vize.",

    items: [
      {
        id: "kurumlar-vergisi-kaydi",
        title: "Kurumlar Vergisi Kaydı",
        en: "Corporate Tax Registration",
        rhythm: "tek-seferlik",
        inclusion: "ornekte",
        price: { usd: 400, unit: "tek seferlik", plusVat: true },
        line: "Kuruluşun ardından Federal Tax Authority (FTA) nezdinde kurumlar vergisi kaydının yasal süresi içinde tamamlanması gerekiyor.",
        scope: [
          "Kurumlar vergisi kaydının açılması",
          "Başvuru dosyasının hazırlanması",
          "TRN (vergi kimlik) numarasının alınması",
          "Başvuru sürecinin takibi",
        ],
        months: [1],
      },
      {
        id: "kdv-kaydi",
        title: "KDV Kaydı",
        en: "VAT Registration",
        rhythm: "tek-seferlik",
        inclusion: "gerekli-ise",
        price: { usd: 400, unit: "tek seferlik", plusVat: true },
        line: "Faaliyet yapınıza bağlı olarak KDV kaydı ya da VAT Exception (muafiyet) başvurusu yapılıyor. Herkes için doğmuyor; yalnızca gerekli şartlar oluştuğunda uygulanıyor.",
        months: [1],
      },
      {
        id: "aylik-muhasebe",
        title: "Aylık Muhasebe Hizmeti",
        rhythm: "aylik",
        inclusion: "ornekte",
        /* SWAP:AFTER_PRICING — PRICING.dubai.annual bu satırın 12 katı olmalı
           (350 × 12 = 4.200). Dosya başındaki nota bakın. */
        price: { usd: 350, unit: "aylık", plusVat: true, qualifier: "başlangıç" },
        line: "Şirket aktif olduğu sürece muhasebe kayıtlarının düzenli tutulması yasal zorunluluk. Yıl sonunda toplu tutulan defter, hem cezaya hem de yanlış vergi hesabına açık.",
        scope: [
          "Gelir ve gider kayıtları",
          "Satış ve alış faturalarının işlenmesi",
          "Banka mutabakatları",
          "Finansal raporlama",
          "Vergisel kontroller",
          "Düzenli mali danışmanlık",
        ],
        note: "İşlem hacmi yüksek şirketlerde ücret aylık işlem sayısına göre değişebiliyor.",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
      {
        id: "kdv-beyannamesi",
        title: "KDV Beyannamesi",
        en: "VAT Return",
        rhythm: "uc-aylik",
        inclusion: "gerekli-ise",
        price: { usd: 350, unit: "her dönem", plusVat: true },
        line: "KDV mükellefi olan şirketler için üç aylık dönemlerde beyanname hazırlanıp FTA sistemine gönderiliyor. KDV kaydınız yoksa bu kalem hiç doğmuyor.",
        months: [3, 6, 9, 12],
      },
      {
        id: "yil-sonu",
        title: "Mali Yıl Sonu ve Kurumlar Vergisi Beyanı",
        rhythm: "yillik",
        inclusion: "ornekte",
        price: { usd: 420, unit: "yıllık", plusVat: true },
        line: "Her mali yıl sonunda mali tablolar hazırlanıyor, vergi hesaplamaları yapılıyor ve Kurumlar Vergisi Beyannamesi FTA sistemine gönderiliyor.",
        note: "Aylık muhasebeden bağımsız yürütülen, yıllık bir vergi uyum çalışması. Aylık hizmet alıyor olmanız bu kalemi kapsamıyor.",
        months: [12],
      },
      {
        id: "bagimsiz-denetim",
        title: "Bağımsız Denetim",
        en: "Audit",
        rhythm: "yillik",
        inclusion: "gerekli-ise",
        price: { usd: 1400, unit: "yıllık", plusVat: true, qualifier: "başlangıç" },
        line: "Bazı Free Zone otoriteleri ve belirli büyüklüğe ulaşan şirketler için zorunlu olabiliyor. Sizin bölgenizde zorunlu olup olmadığı lisansınıza bağlı.",
        note: "Ücret işlem hacmine göre değişiyor.",
        months: [12],
      },
      {
        id: "vize-emirates-id",
        title: "Yatırımcı / İşçi Vizesi ve Emirates ID",
        en: "VIP hizmet · 2 yıllık oturum izni",
        rhythm: "iki-yillik",
        inclusion: "istege-bagli",
        price: { usd: 2400, unit: "kişi başı", plusVat: true },
        line: "Yatırımcı, partner veya çalışan vizesi ile Emirates ID sürecinin tamamı. Belirtilen ücret bir kişi için 2 yıllık yatırımcı oturum iznini kapsıyor.",
        scope: [
          "Yatırımcı / partner / çalışan vizesi başvurusunun hazırlanması",
          "Giriş izni (Entry Permit) alınması",
          "Statü değişikliği işlemleri",
          "VIP sağlık muayenesi organizasyonu",
          "Kan testi ve akciğer filmi koordinasyonu",
          "VIP biyometrik veri (parmak izi) randevusu",
          "Emirates ID başvurusu, kartın takibi ve teslimi",
          "Oturum izni onay sürecinin yönetimi",
          "Resmî kurum randevularının organizasyonu",
          "Süreç boyunca birebir danışmanlık",
        ],
        note: "Oturum izni yasal işlemleri süresince 5 iş günü Dubai'de bulunmanız gerekiyor. Resmî kurum harçlarındaki yasal değişikliklerde ücret güncellenir.",
        months: [1],
      },
      {
        id: "lisans-yenileme",
        title: "Yıllık Şirket Lisansı Yenileme",
        en: "Trade License Renewal",
        rhythm: "yillik",
        inclusion: "ornekte",
        price: { usd: 4800, unit: "yıllık", plusVat: false, qualifier: "ortalama" },
        line: "Faaliyet gösteren tüm şirketlerin ticaret lisansını her yıl yenilemesi yasal zorunluluk. Yenilenmezse şirket faaliyetlerine devam edemiyor.",
        scope: [
          "Ticaret lisansının yenilenmesi",
          "Kayıtlı iş adresinin (Registered Office / Flexi Desk) 1 yıllık kullanım hakkı · yalnızca Free Zone",
          "Resmî kurum yenileme işlemleri",
          "Lisansın yeniden düzenlenip aktif hâle getirilmesi",
        ],
        note: "Tutar kurulu olduğunuz serbest bölgeye, faaliyet konusuna, ofis tipine ve resmî harçlara göre değişiyor. Kalemin en oynak olanı bu.",
        months: [12],
      },
    ],

    firstYear: {
      kicker: "Örnek hesap",
      title: "İlk yılın sonunda toplam ne çıkıyor?",
      lead: "Yeni kurulmuş, standart faaliyet gösteren bir şirketin ilk 12 ayı.",
      lines: [
        {
          id: "kurumlar-vergisi-kaydi",
          label: "Kurumlar Vergisi Kaydı",
          qty: "tek seferlik",
          usd: 400,
        },
        {
          id: "aylik-muhasebe",
          label: "Aylık Muhasebe Hizmeti",
          qty: "12 ay × 350 USD",
          usd: 4200,
        },
        {
          id: "yil-sonu",
          label: "Mali Yıl Sonu ve Kurumlar Vergisi Beyanı",
          qty: "yılda bir",
          usd: 420,
        },
        {
          id: "lisans-yenileme",
          label: "Free Zone lisans yenileme",
          qty: "yılda bir, ortalama",
          usd: 4800,
        },
      ],
      anchorNote:
        "Koşullu ve talebe bağlı kalemler bu toplamın dışında: yalnızca şartlar oluşursa doğuyorlar, o yüzden herkese olacakmış gibi toplanmıyorlar.",
      outNote:
        "Bu kalemler yalnızca şartlar oluştuğunda ya da talep ettiğinizde doğuyor. Sizin için gerekip gerekmediğini görüşmede netleştiriyor, gerekiyorsa yazılı teklifte ayrı satır olarak gösteriyoruz.",
    },

    entry: {
      kicker: "Oturum kuralı",
      title: "Oturum izni kendiliğinden devam etmiyor.",
      lead: "Vize alındıktan sonra izin, belirli aralıklarla BAE'ye giriş yapıldığı sürece geçerli kalıyor. Sayaç her girişte sıfırlanıyor. Bu kural bilinmediğinde izin farkında olunmadan geçerliliğini yitirebiliyor, o yüzden burada ayrıca yazıyoruz.",
      rows: [
        {
          who: "Yatırımcı oturumu",
          days: 365,
          short: "yılda en az bir kez",
          line: "Yatırımcı ve partner oturumunda BAE'ye en az 365 günde bir giriş yapılması gerekiyor.",
        },
        {
          who: "İşçi (çalışan) oturumu",
          days: 182,
          short: "altı ayda en az bir kez",
          line: "Çalışan oturumunda aralık yarı yarıya kısa: en az 182 günde bir giriş yapılması gerekiyor.",
        },
      ],
      note: "Süre giriş yapılmadan dolarsa oturum izni geçerliliğini yitiriyor ve süreç baştan başlıyor. Giriş takvimini takip etmek oturum sahibinin sorumluluğunda.",
    },

    /* Bağlayıcılık uyarısı duruyor, olmayan randevuya yönlendirme kalktı:
       altındaki AskCta zaten "sorusu olan sorsun" diyor. */
    footnote:
      "Tutarlar USD ve aksi belirtilmedikçe KDV hariç; resmî harçlardaki değişikliklerde güncellenir. Süreler mevzuatın öngördüğü takvimlerdir; otoritenin işlem hızı bizim kontrolümüzde olmadığı için kesin süre taahhüdü vermiyoruz. Hangi kalemin sizin şirketinizde doğacağı faaliyetinize, lisansınıza ve işlem hacminize bağlı.",
  },
};

/** Ekrandaki ritim etiketleri. Veri anahtarları slug, bunlar görünen ad. */
export const RHYTHM_LABEL: Record<Rhythm, string> = {
  "tek-seferlik": "Tek seferlik",
  aylik: "Aylık",
  "uc-aylik": "3 ayda bir",
  yillik: "Yıllık",
  "iki-yillik": "2 yılda bir",
};

/**
 * Ekran sırası. Veri dosyası PDF sırasını koruyor (muhasebeci karşılaştırarak
 * okuyabilsin diye), okuma sırası ise ritme göre: önce bir kez olan, sonra
 * sıklaşan, en sonda yıla yayılan. Aylık şeridi de bu sırada monoton
 * seyrettiği için tablo bir Gantt gibi okunuyor.
 */
export const RHYTHM_ORDER: Rhythm[] = [
  "tek-seferlik",
  "aylik",
  "uc-aylik",
  "yillik",
  "iki-yillik",
];

/** Üç konumun ekrandaki adı ve kısa gerekçesi. */
export const INCLUSION_LABEL: Record<Inclusion, { short: string; long: string }> = {
  ornekte: {
    short: "İlk yıl toplamında",
    long: "Aşağıdaki örnek hesaba giren kalemler",
  },
  "gerekli-ise": {
    short: "Gerekli ise",
    long: "Yalnızca şartlar oluşursa doğar, toplama girmez",
  },
  "istege-bagli": {
    short: "Talebe bağlı",
    long: "Kişi veya talep bazlı, toplama girmez",
  },
};
