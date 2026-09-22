/* ============================================================================
   DUBAİ · BANKA & ÖDEME — sayfanın bütün metni
   Sayfa: app/dubai/banka-hesabi/page.tsx · Biçim: css/svc-banka.css (.svb-)
   Hero kartı: components/services/BankaHeroCard.tsx (.svbk-)

   22.09.2026 · İLK YAZIM. Burak'ın çerçevesi:
     "şirket kuruluşu ve muhasebe sayfası kadar önemli sayfalar değil bunlar.
      Aslında bu hizmet sayfaları … tamamen şirket kuruluşunun içinde
      anlattığımız o kısımla alakalı daha detaylı bilginin yer alacağı bir
      kısım olacak … şirket kuruluş sayfasında bankacılıkla ilgili bir şeyi
      bahsederken oradan oraya link vereceğiz."
   Yani bu sayfa /dubai'nin BANKA ADIMININ AYRINTISI, kendi başına bir ürün
   değil. Muhasebe sayfasının on bir bölümü burada yok; aynı dilde, kısa bir
   akış: hero · bankalar · ödeme kanalları · süreç · belgeler · ücret · SSS.

   FİYAT: "bunun ayrı bir fiyatlandırması yok … banka kuruluşu, şey, kartı
   falan zaten bunlar şirket kuruluşunun içinde." Sayfada fiyat yeri VAR ama
   rakam yok: "kuruluş paketine dahil" ve /dubai#fiyat'a bağlantı.

   ------------------------------------------------------------ KAYNAK DÜZENİ
   Her cümle üç kaynaktan birinden:
     [ONAYLI]  sitede zaten yayında ve müşterinin onayından geçmiş cümle
               (countryContent.ts · dubai · steps/faq/intro, brand.ts ·
               STANCE_LIMITS, PARTNERS). Kaynağı yanında yazılı.
     [MÜŞTERİ] Burak'ın bu turdaki mesajından (fiyat, ödeme kanalları).
     [TEYİT]   eski sitedeki sayfadan (ortacglobal.com/dubai/hizmetler/
               bankacilik-ve-odeme-sistemleri) AKIŞ olarak alınan ya da
               genel bilgi olan cümle. Burak: "sen yine de çok güvenme,
               zamanında ai ile yazdım." Rakam İÇERMİYOR ve müşterinin
               okuyup onaylaması gerekiyor. SWAP:BANKA_TEYIT ile işaretli.

   ESKİ SAYFADAN BİLEREK ALINMAYANLAR (hepsi doğrulanmamış rakam ve sitenin
   "kesin süre taahhüdü vermiyoruz" kuralıyla çelişiyor — STANCE_LIMITS):
     "IBAN'ı 72 saatte aktif ederiz" · "3-5 iş günü" · "20'den fazla para
     birimi" · "200'den fazla ülke" · "ilk 90 günde limit artışı" · Revolut
     ve Wise (Burak'ın saydığı dört kanalda yoklar) · kripto kazancı ve FATF
     soruları (cevapları sayfada yoktu; hukuki iddia gerektiriyor).
   ========================================================================= */

import type { Faq } from "@/lib/countryContent";
import type { BrandKey } from "@/lib/brands";

export type BankaIkon =
  | "secim"
  | "dosya"
  | "imza"
  | "karar"
  | "kanal"
  | "lisans"
  | "pasaport"
  | "pay"
  | "form"
  | "etiket"
  | "tekrar";

export const BANKA_DUBAI = {
  /* ------------------------------------------------------------------ hero */
  hero: {
    crumb: "Dubai · Banka & Ödeme",
    title: "Dubai'de banka hesabı ve ödeme altyapısı.",
    accent: "banka hesabı",
    /* [ONAYLI] ikinci cümle countryContent.ts · dubai · intro kartının
       ("Wio ve Mashreq NeoBiz'de kurumsal hesap") satırı, birebir. */
    lead: "Kurumsal hesap ve tahsilat kanalları şirket kuruluşunun içinde kuruluyor. Başvuru dosyasını bankanın istediği formatta biz hazırlıyoruz; hesap kararını banka veriyor.",
    cta: { label: "Kuruluşu başlatın", href: "/basla" },
    /* [MÜŞTERİ] Rakam yok: ayrı ücreti yok. Kutu sayfadaki ücret bandına
       iniyor (#ucret), oradan /dubai#fiyat'a. */
    price: { amount: "Pakete dahil", label: "· ayrı ücret yok", href: "#ucret" },
    trust: [
      { icon: "etiket" as BankaIkon, line: "Kuruluş paketinin içinde, ayrı ücreti yok." },
      /* [ONAYLI] countryContent.ts · dubai · steps · "GSM hattı ve banka
         hesabı": "reddedilirse ikinci bankaya yeniden başvuruyoruz." */
      { icon: "tekrar" as BankaIkon, line: "Reddedilirse ikinci bankaya başvuruyoruz." },
    ],
  },

  /* ------------------------------------------------------ hero kartı · sahneler
     Dört sahne, sıralı (bir süreç). Her satır İKİ SATIRA sığmalı (1024'te
     kart 461 px; HeroSceneCard · meta notu). */
  scenes: [
    { key: "secim", word: "Seçim", meta: "Faaliyetinize uyan banka başvurudan önce belirleniyor." },
    { key: "dosya", word: "Dosya", meta: "Başvuru dosyası bankanın istediği formatta hazırlanıyor." },
    { key: "hesap", word: "Hesap", meta: "Karar bankanın; reddedilirse ikinci bankaya başvuruyoruz." },
    { key: "tahsilat", word: "Tahsilat", meta: "Kartla ve platformdan tahsilat için kanallar bağlanıyor." },
  ],
  sceneFoot: "Dört adım, kuruluşun içinde. Ayrıntısı aşağıda.",

  /* -------------------------------------------------------------- bankalar
     [ONAYLI] Üç banka brand.ts · PARTNERS'ta "Banka" rolüyle (Wio Business ·
     Mashreq NeoBiz · Emirates NBD); ilk ikisi /dubai'de de adıyla geçiyor.
     Tanım satırları [TEYİT]: bankaların KENDİ KAMUYA AÇIK tarifleri (dijital
     banka / dijital KOBİ hesabı / büyük yerel banka), firmaya dair iddia
     taşımıyor ama müşteri görmeli — SWAP:BANKA_TEYIT. */
  banks: {
    id: "bankalar",
    heading: "Hesap hangi bankada açılıyor.",
    accent: "hangi bankada",
    /* [TEYİT] eski sayfanın 1. adımı ("ihtiyaç analizi ve banka seçimi"),
       rakamsız. */
    lead: "Hangi bankanın uygun olduğu faaliyetinize ve ortaklık yapınıza göre değişiyor; seçimi başvurudan önce birlikte yapıyoruz.",
    items: [
      { brand: "wio" as BrandKey, name: "Wio Business", line: "Dijital banka; hesap baştan sona çevrim içi yönetiliyor." },
      { brand: "mashreq" as BrandKey, name: "Mashreq NeoBiz", line: "Mashreq'in küçük ve orta ölçekli şirketlere dijital hesabı." },
      { brand: "emiratesnbd" as BrandKey, name: "Emirates NBD", line: "BAE'nin büyük bankalarından; geleneksel kurumsal hesap." },
    ],
  },

  /* -------------------------------------------------------- ödeme kanalları
     [MÜŞTERİ] "ödeme kuruluşu deyince Payoneer, Paypal, Stripe ve Binance
     kullanıyoruz aslında." Dört kanal bu dört; sıra müşterinin sırası.
     Tanım satırları [TEYİT]: her kanalın kendi genel işlevi (firmaya dair
     iddia değil). Binance'in satırı brand.ts'teki rolünün aynısı ve bilerek
     yalnız bunu söylüyor ("kripto varlık borsası"): hangi işlemin yapıldığı
     doğrulanmamış bir hizmet iddiası olurdu.
     wamo YOK: müşteri ne için kullanıldığından emin değil (hakkımızda ·
     22.09.2026). Karar gelince buraya girer ya da hiç girmez. */
  pay: {
    id: "odeme",
    heading: "Tahsilat ve ödeme kanalları.",
    accent: "ödeme kanalları.",
    lead: "Banka hesabının yanında, kartla ve platform üzerinden tahsilat için ödeme kanalları kuruluyor. Hangisinin gerektiği satış kanalınıza bağlı.",
    items: [
      { brand: "payoneer" as BrandKey, name: "Payoneer", line: "Yurt dışındaki müşteriden ve pazaryerlerinden ödeme alma." },
      { brand: "paypal" as BrandKey, name: "PayPal", line: "Platform ve pazaryeri üzerinden tahsilat." },
      { brand: "stripe" as BrandKey, name: "Stripe", line: "Sitenizde ve uygulamanızda kartla tahsilat." },
      { brand: "binance" as BrandKey, name: "Binance", line: "Kripto varlık borsası." },
    ],
  },

  /* ----------------------------------------------------------------- süreç
     Beş adım, eski sayfanın akışından. SÜRE YOK (STANCE_LIMITS · "Kesin süre
     taahhüdü vermiyoruz"): eski sayfanın "72 saat" ve "3-5 iş günü"
     rakamları bilerek alınmadı. */
  steps: {
    id: "surec",
    heading: "Başvuru nasıl yürüyor.",
    accent: "nasıl yürüyor.",
    /* [ONAYLI] STANCE_LIMITS · ikinci madde, kısaltılmış. */
    lead: "Adımlara süre yazmıyoruz: bankanın takvimi bizim kontrolümüzde değil.",
    items: [
      /* [TEYİT] */
      { icon: "secim" as BankaIkon, title: "Banka seçimi", line: "Faaliyetinize ve ortaklık yapınıza uyan banka birlikte belirleniyor." },
      /* [ONAYLI] countryContent.ts · dubai · steps */
      { icon: "dosya" as BankaIkon, title: "Dosya hazırlığı", line: "Başvuru dosyası bankanın istediği formatta hazırlanıyor." },
      /* [ONAYLI] countryContent.ts · dubai · faq · "banka imzası ve vize
         işlemleri için bir kez gelmeniz gerekiyor" */
      { icon: "imza" as BankaIkon, title: "Başvuru ve imza", line: "Başvuru yapılıyor; banka imzası için bir kez Dubai'de bulunmanız gerekiyor." },
      /* [ONAYLI] countryContent.ts · dubai · steps, birebir */
      { icon: "karar" as BankaIkon, title: "Bankanın kararı", line: "Hesap kararı tamamen bankaya ait; reddedilirse ikinci bankaya yeniden başvuruyoruz." },
      /* [TEYİT] eski sayfanın 4. adımı ("ödeme ağları entegrasyonu"),
         API ve limit iddiaları çıkarılmış hâli. */
      { icon: "kanal" as BankaIkon, title: "Ödeme kanalları", line: "Hesap açıldıktan sonra ihtiyacınız olan tahsilat kanalları bağlanıyor." },
    ],
  },

  /* --------------------------------------------------------------- belgeler
     [TEYİT] Dört kalem eski sayfanın listesi (şirket lisansı · pasaport · pay
     sahibi tablosu · KYC formları). Bankadan bankaya değişiyor ve tam liste
     müşteriden gelmeli — SWAP:BANKA_BELGE. */
  docs: {
    id: "belgeler",
    heading: "Başvuruda istenenler.",
    accent: "istenenler.",
    lead: "Liste bankadan bankaya değişiyor; sizin bankanızın tam listesini başvurudan önce paylaşıyoruz.",
    items: [
      { icon: "lisans" as BankaIkon, title: "Şirket lisansı ve kuruluş belgeleri" },
      { icon: "pasaport" as BankaIkon, title: "Ortakların ve yöneticinin pasaportu" },
      { icon: "pay" as BankaIkon, title: "Pay sahipliği tablosu" },
      { icon: "form" as BankaIkon, title: "Bankanın müşteri tanıma (KYC) formları" },
    ],
  },

  /* ------------------------------------------------------------------ ücret
     [MÜŞTERİ] "ayrı bir fiyatlandırması yok … sadece şirket kuruluşa bir fiyat
     veriyoruz paketlerle. Bir de muhasebenin bir ücreti var bunun dışında."
     Hero'nun fiyat kutusu buraya iniyor. İki çıkış: kuruluş paketleri ve
     muhasebe ücreti. */
  fee: {
    id: "ucret",
    title: "Ayrı bir ücreti yok.",
    accent: "ücreti yok.",
    line: "Banka hesabı başvurusu ve ödeme kanallarının kurulumu Dubai şirket kuruluşu paketinin içinde. Muhasebe, kuruluştan sonra ayrıca ücretlendiriliyor.",
    /* [TEYİT] Bankanın KENDİ hesap ücretleri: hiçbir banka ücretsiz değil ve
       bu cümle ziyaretçinin "hiç para ödemeyecek miyim" sorusunu kapatıyor.
       Tutar ve banka adı yok. */
    note: "Bankanın kendi hesap işletim ücretleri bankayla aranızda ve bankanın tarifesine bağlı.",
    links: [
      { label: "Kuruluş paketleri", href: "/dubai#fiyat" },
      { label: "Muhasebe ücretleri", href: "/dubai/muhasebe#fiyat" },
    ],
  },

  /* -------------------------------------------------------------------- SSS
     İlk ikisi [ONAYLI] (countryContent.ts · dubai · faq, birebir). Kalan üçü
     eski sayfanın soru BAŞLIKLARI; cevaplar orada yoktu, burada genel ve
     rakamsız yazıldı — [TEYİT], SWAP:BANKA_SSS. Eski sayfanın öteki iki
     sorusu (kripto kazancı · FATF denetimi) ALINMADI: cevapları hukuki
     iddia gerektiriyor ve kaynağımız yok. */
  faq: {
    id: "sss",
    heading: "Sık sorulanlar.",
    accent: "sorulanlar.",
    items: [
      {
        q: "Banka hesabı garanti mi?",
        a: "Hayır. Hiçbir aracı bankanın kararını garanti edemez. Biz dosyayı bankanın istediği formatta hazırlıyor ve süreci takip ediyoruz; reddedilirse ikinci bankaya yeniden başvuruyoruz.",
      },
      {
        q: "Hesap açılışı için Dubai'ye gelmem gerekiyor mu?",
        a: "Tescil kısmı uzaktan tamamlanabiliyor; ancak banka imzası ve vize işlemleri için bir kez gelmeniz gerekiyor.",
      },
      {
        q: "Şirket kurmadan kurumsal hesap açabilir miyim?",
        a: "Hayır. Kurumsal hesap BAE'de kurulmuş ve lisansını almış bir şirket adına açılıyor; bu yüzden hesap başvurusu kuruluşun bir adımı olarak yürüyor.",
      },
      {
        q: "Banka hesabı için ayrıca ücret ödüyor muyum?",
        a: "Başvuru ve ödeme kanallarının kurulumu için bize ayrı bir ücret ödemiyorsunuz; ikisi de kuruluş paketinin içinde. Bankanın kendi hesap ücretleri bankanın tarifesine bağlı.",
      },
      {
        q: "Hesaptan Türkiye'ye para gönderebilir miyim?",
        a: "Evet, kurumsal hesaptan yurt dışına transfer yapılabiliyor. Masrafı ve kuru bankanın tarifesi belirliyor; bir oran taahhüt etmiyoruz.",
      },
    ] as Faq[],
  },

  /* --------------------------------------------------------------- kapanış */
  closing: {
    title: "Dubai şirketinizin banka tarafını birlikte kuralım.",
    accent: "birlikte kuralım.",
    cta: { label: "Kuruluşu başlatın", href: "/basla" },
  },
};
