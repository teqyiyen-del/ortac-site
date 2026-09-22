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
   akış: hero · hesaplar (+ rehber) · süreç · belgeler · SSS.

   FİYAT HİÇBİR YERDE YAZMIYOR. Bankanın ayrı bir fiyatlandırması yok (kuruluş
   paketinin içinde) ama Burak ikinci geçişte bunun sayfada belirtilmesini de
   istemedi: "ayrı bir ücreti yok diye bir şey belirtmemize gerek yok, ben
   onu aslında sadece sana söylemiş oldum." 

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

import type { Faq, Step, CountryContent } from "@/lib/countryContent";
import type { BrandKey } from "@/lib/brands";

/* ------------------------------------------------------ 22.09.2026 · İKİNCİ GEÇİŞ
   Burak ilk hâle bakınca: "sayfanın sadeliği iyi … sadece bunu bir beyaz bir
   siyah koyduğun için sayfa dama tahtasına dönmüş, çünkü çok küçük kısımlar.
   … belki bunları sadece logo koyup geçmek yerine biraz daha bizim SVG
   görseller kafasında yapabiliriz. … başvuru nasıl yürüyor kısmını … bizim
   hep yaptığımız bir tarz var ya, diğer sayfalarda da hep yaptık. … ayrı bir
   ücreti yok kısmının boksunu neden mavi yaptın, bizim hiç böyle bir şey yok.
   Hatta böyle bir boksa gerek de yok, ayrı bir ücreti yok diye bir şey
   belirtmemize gerek yok. … içeriği de az geldi gözüme, hangi bankada
   açıyoruz, hangi tarafta ödeme var, bitti."

   Düzelenler:
     · ÜCRET HİÇBİR YERDE YAZMIYOR: mavi panel, hero'nun fiyat kutusu, güven
       satırı ve SSS'teki ücret sorusu kalktı.
     · BANKALAR VE ÖDEME TEK BÖLÜMDE, iki büyük kart: üstte bir sahne (bento
       dili), altında NE OLDUĞU, logolar kartın içinde. Altında "Hangi kanal ne
       için" rehberi — sayfanın asıl yeni içeriği: ziyaretçi kendi satış
       kanalından hangi hesaba ihtiyacı olduğunu okuyor.
     · SÜREÇ sitenin standart aşama bileşeni (CountryProcess, ülke
       sayfalarındaki). BELGELER de standart bileşen (CountryDocs, "sizde
       olanı işaretleyin").
     · Gövde baştan sona beyaz; tek koyu şey hero ve kapanış. */

export type BankaIkon = "dosya" | "tekrar" | "kart" | "pazar" | "kripto" | "banka";

export const BANKA_DUBAI = {
  /* ------------------------------------------------------------------ hero */
  hero: {
    crumb: "Dubai · Banka & Ödeme",
    title: "Dubai'de banka hesabı ve ödeme altyapısı.",
    accent: "banka hesabı",
    /* [ONAYLI] ikinci cümle countryContent.ts · dubai · intro kartının satırı. */
    lead: "Kurumsal hesap ve tahsilat kanalları şirket kuruluşunun içinde kuruluyor. Başvuru dosyasını bankanın istediği formatta biz hazırlıyoruz; hesap kararını banka veriyor.",
    cta: { label: "Kuruluşu başlatın", href: "/basla" },
    trust: [
      /* [ONAYLI] countryContent.ts · dubai · steps */
      { icon: "dosya" as BankaIkon, line: "Dosya bankanın istediği formatta hazırlanıyor." },
      { icon: "tekrar" as BankaIkon, line: "Reddedilirse ikinci bankaya başvuruyoruz." },
    ],
  },

  /* ------------------------------------------------------ hero kartı · sahneler */
  scenes: [
    { key: "secim", word: "Seçim", meta: "Faaliyetinize uyan banka başvurudan önce belirleniyor." },
    { key: "dosya", word: "Dosya", meta: "Başvuru dosyası bankanın istediği formatta hazırlanıyor." },
    { key: "hesap", word: "Hesap", meta: "Karar bankanın; reddedilirse ikinci bankaya başvuruyoruz." },
    { key: "tahsilat", word: "Tahsilat", meta: "Kartla ve platformdan tahsilat için kanallar bağlanıyor." },
  ],
  sceneFoot: "Dört adım, kuruluşun içinde. Ayrıntısı aşağıda.",

  /* ------------------------------------------------------------- hesaplar
     İki kart. Tür tanımları [ONAYLI]: brand.ts · PAY_MATRIX'in grup ipuçları
     ("Bankacılık lisansı olan kurum" · "Banka değil; farklı lisans ve koruma
     rejimi" · "Kartla ve platform üzerinden tahsilat"). Kalan yarılar
     [TEYİT]: bir şirket hesabının ve ödeme kanalının genel işlevi, firmaya
     dair iddia değil — SWAP:BANKA_TEYIT.
     Kurumlar [ONAYLI] brand.ts · PARTNERS (bankalar) ve [MÜŞTERİ] ("ödeme
     kuruluşu deyince Payoneer, Paypal, Stripe ve Binance"). wamo yok (ne
     için kullanıldığı belirsiz). */
  accounts: {
    id: "hesaplar",
    heading: "Şirketinizin iki ayrı hesabı.",
    accent: "iki ayrı hesabı.",
    /* [TEYİT] */
    lead: "Banka hesabı şirketin ana hesabı; ödeme kanalları müşteriden gelen parayı toplayıp oraya aktarıyor. Hangisinin gerektiği satış kanalınıza bağlı.",
    items: [
      {
        key: "banka",
        title: "Banka hesabı",
        line: "Bankacılık lisansı olan kurumda açılan kurumsal hesap. Faturalar, maaşlar, vergi ve tedarikçi ödemeleri buradan yürüyor.",
        brands: [
          { brand: "wio" as BrandKey, name: "Wio Business" },
          { brand: "mashreq" as BrandKey, name: "Mashreq NeoBiz" },
          { brand: "emiratesnbd" as BrandKey, name: "Emirates NBD" },
        ],
      },
      {
        key: "odeme",
        title: "Ödeme ve tahsilat kanalları",
        line: "Banka değil; farklı lisans ve koruma rejimi. Kartla, pazaryerinden ve yurt dışından gelen tahsilatı toplayıp banka hesabınıza aktarıyor.",
        brands: [
          { brand: "payoneer" as BrandKey, name: "Payoneer" },
          { brand: "paypal" as BrandKey, name: "PayPal" },
          { brand: "stripe" as BrandKey, name: "Stripe" },
          { brand: "binance" as BrandKey, name: "Binance" },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- rehber
     "Hangi kanal ne için" — ziyaretçinin kendi durumundan hesaba giden dört
     satır. [TEYİT]: her kanalın genel işlevi. Binance'in satırı yalnız
     "kripto varlıkla çalışıyorsanız" diyor: hangi işlemin yapıldığı
     doğrulanmamış bir hizmet iddiası olurdu. */
  guide: {
    heading: "Hangi kanal ne için",
    rows: [
      { icon: "kart" as BankaIkon, when: "Sitenizden ya da uygulamanızdan kartla satıyorsanız", brands: ["stripe"] as BrandKey[] },
      { icon: "pazar" as BankaIkon, when: "Pazaryerinde ya da yurt dışındaki müşteriye satıyorsanız", brands: ["payoneer", "paypal"] as BrandKey[] },
      { icon: "kripto" as BankaIkon, when: "Kripto varlıkla çalışıyorsanız", brands: ["binance"] as BrandKey[] },
      { icon: "banka" as BankaIkon, when: "Faturalar, maaşlar, vergi ve tedarikçi ödemeleri", brands: ["wio", "mashreq", "emiratesnbd"] as BrandKey[] },
    ],
  },

  /* ----------------------------------------------------------------- süreç
     Sitenin standart aşama bileşeni (CountryProcess). `timing` SÜRE DEĞİL,
     adımın NEREDE ya da NE ZAMAN olduğu (STANCE_LIMITS · kesin süre yok;
     eski sayfanın "72 saat" ve "3-5 iş günü" rakamları alınmadı). */
  stepsTitle: "Banka hesabı, adım adım.",
  /* Aşama panelinin başlığı ve altındaki çıkış. Çıkış şirket kuruluşuna:
     banka o sürecin bir adımı (site içi ağın ilk bağı; Burak: "şirket
     kuruluş sayfasında bankacılıkla ilgili bir şeyi bahsederken oradan oraya
     link vereceğiz"). Ücret yazmıyor. */
  stepsPanel: "Banka dosyası",
  stepsExit: { href: "/dubai", label: "Şirket kuruluşu: banka hesabı bu sürecin bir adımı" },
  steps: [
    /* [TEYİT] */
    {
      title: "Banka ve kanal seçimi",
      timing: "ilk görüşme",
      who: "ortac",
      line: "Faaliyetinize, ortaklık yapınıza ve satış kanalınıza uyan banka ve tahsilat kanalları birlikte belirleniyor.",
    },
    /* [ONAYLI] ikinci cümle countryContent.ts · dubai · steps */
    {
      title: "Başvuru dosyası",
      timing: "lisanstan sonra",
      who: "ortac",
      line: "Ticari lisans ve kuruluş belgeleri çıktıktan sonra banka dosyası bankanın istediği formatta hazırlanıyor.",
    },
    /* [ONAYLI] countryContent.ts · dubai · faq */
    {
      title: "Başvuru ve imza",
      timing: "Dubai'de, bir kez",
      who: "siz",
      line: "Başvuru yapılıyor; banka imzası için bir kez Dubai'de bulunmanız gerekiyor.",
    },
    /* [ONAYLI] countryContent.ts · dubai · steps, birebir */
    {
      title: "Bankanın kararı",
      timing: "bankanın takviminde",
      who: "banka",
      line: "Hesap kararı tamamen bankaya ait; reddedilirse ikinci bankaya yeniden başvuruyoruz.",
    },
    /* [TEYİT] eski sayfanın 4. adımı, API ve limit iddiaları çıkarılmış */
    {
      title: "Tahsilat kanalları",
      timing: "hesap açıldıktan sonra",
      who: "ortac",
      line: "İhtiyacınız olan ödeme ve tahsilat kanalları açılıp banka hesabınıza bağlanıyor.",
    },
  ] as Step[],

  /* --------------------------------------------------------------- belgeler
     Sitenin standart belge bileşeni (CountryDocs). "Sizden" grubunun ilk üç
     kalemi [ONAYLI]: countryContent.ts · dubai · docs'un aynı kalemleri
     (kuruluşta zaten istenenler). Dördüncüsü ve "bizim" grubu [TEYİT]: eski
     sayfanın listesi (lisans · pay sahipliği · KYC formları) —
     SWAP:BANKA_BELGE; bankadan bankaya değişiyor. */
  docs: {
    heading: "Hesap açmak için nelere ihtiyacınız var?",
    accent: "nelere ihtiyacınız var?",
    lead: "Sizde olanı işaretleyin; dosyanın geri kalanını biz hazırlıyoruz.",
    data: {
      groups: [
        {
          title: "Sizden istediklerimiz",
          hint: "Çoğunu kuruluşta zaten verdiniz; bankaya giden dosyada yeniden kullanılıyor.",
          items: [
            "Pasaportun renkli taraması (en az 6 ay geçerli)",
            "Adres beyanı: son 3 aya ait fatura veya ikametgâh",
            "Faaliyet konusu ve hedef müşteri tarifi",
            "Beklenen işlem hacmi ve paranın kaynağına dair kısa açıklama",
          ],
        },
        {
          title: "Süreç içinde ortaya çıkanlar",
          hint: "Bunları biz hazırlıyoruz; sizden yalnızca onay ve imza isteniyor.",
          items: [
            "Ticari lisans ve kuruluş belgeleri",
            "Pay sahipliği tablosu",
            "Bankanın müşteri tanıma (KYC) formları",
            "Banka başvuru dosyası",
          ],
        },
      ],
      note: "Liste bankadan bankaya değişiyor; sizin bankanızın tam listesini başvurudan önce paylaşıyoruz.",
    } as CountryContent["docs"],
  },

  /* -------------------------------------------------------------------- SSS
     İlk ikisi [ONAYLI] (countryContent.ts · dubai · faq, birebir). Kalanlar
     [TEYİT], genel ve rakamsız — SWAP:BANKA_SSS. Ücret sorusu KALKTI
     (ikinci geçiş: "ayrı bir ücreti yok diye bir şey belirtmemize gerek
     yok"). Kripto kazancı ve FATF soruları alınmadı (hukuki iddia). */
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
        q: "Hangi banka bana uygun?",
        a: "Faaliyetinize, ortaklık yapınıza ve satış kanalınıza göre değişiyor; seçimi başvurudan önce birlikte yapıyoruz.",
      },
      {
        q: "Şirket kurmadan kurumsal hesap açabilir miyim?",
        a: "Hayır. Kurumsal hesap BAE'de kurulmuş ve lisansını almış bir şirket adına açılıyor; bu yüzden hesap başvurusu kuruluşun bir adımı olarak yürüyor.",
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
