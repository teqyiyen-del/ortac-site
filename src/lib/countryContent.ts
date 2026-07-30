import type { Country } from "@/lib/store";
import type { BrandKey } from "@/lib/brands";

/* SWAP:COUNTRY_CONTENT — every claim on a country page lives here so the client
   and the accountant can review one file. Rules kept from the brief:
   no tax rates beyond the ones already published in the comparison table, and
   every downside is stated plainly rather than softened. */

/* `brands`: kartın çiziminde basılacak marka işaretleri. Metin "Stripe ve
   PayPal" diyorsa çizimde de o iki plaka çıksın diye — iddia ile görsel aynı
   yerden besleniyor. Yalnızca `bank` ve `card` çizimleri okuyor; ötekiler
   marka basmıyor. Anahtarlar lib/brands.ts'teki kayıt defterinden. */
export type Pro = { title: string; line: string; icon?: string; brands?: BrandKey[] };
export type Faq = { q: string; a: string };
/* `timing` eskiden `day` idi ve "Gün 1", "Gün 3-5" gibi değerler taşıyordu.
   Sorun isimde değil iddiadaydı: "Gün 3-5" sürecin kaçıncı gününde olacağınızı
   söylüyor, yani takvim vaadi veriyordu. Firma kesin süre taahhüdü vermiyor —
   otoritenin ve bankanın işlem hızı bizde değil. Alan artık o adımın TİPİK
   süresini taşıyor ve her değer "tipik" diye işaretli; bekleme olmayan karar
   adımlarında ise gün yerine ne zaman olduğu ("ilk görüşme") yazıyor.
   `line` uzun olabilir: süreç bölümünde kapalı duruyor, adıma basılınca açılıyor. */
export type Step = { title: string; timing: string; who: "siz" | "ortac" | "otorite"; line: string };
export type Route = { title: string; line: string; note: string };
/* `profile` is the chip label; `you` is the same thing said to the visitor's
   face, because a verdict assembled from a noun phrase reads like a template.
   When the answer is "hayır" the row says where to look instead — the site
   sending you away is the whole stance, so it has to be in the data. */
export type FitRow = {
  profile: string;
  you: string;
  ok: boolean;
  why: string;
  alt?: Country;
};

/** the structural choice a country forces before anything else is priced */
export type Structure = {
  name: string;
  line: string;
  /** "bunu yapıyorsanız burası" — the selection logic, not a feature list */
  fit: string[];
  watch: string;
};
export type DocGroup = { title: string; hint: string; items: string[] };
/** value stays a string: some countries publish a figure, KKTC deliberately does not */
export type TaxRow = { label: string; value: string; note?: string };
export type Clarify = { title: string; line: string };

export type CountryContent = {
  tagline: string;
  intro: string;
  pros: Pro[];
  watchouts: Pro[];
  /** brief §2 — every country carries a warning that must appear on its page */
  clarify: { title: string; lead: string; items: Clarify[] };
  /** only where the country actually forces a structural choice */
  structures?: { title: string; lead: string; options: Structure[]; rule: string };
  docs: { groups: DocGroup[]; note: string };
  tax: { rows: TaxRow[]; note: string };
  fitTable: FitRow[];
  steps: Step[];
  included: string[];
  excluded: string[];
  routes: Route[];
  faq: Faq[];
};

export const COUNTRY_CONTENT: Record<Country, CountryContent> = {
  dubai: {
    tagline: "Serbest bölge · IFZA",
    intro:
      "Dubai, vergi avantajı ile banka ve vize erişimini aynı anda veren tek seçenek. Karşılığında kuruluş maliyeti üçünün en yükseği ve süreç için bir kez yerinde bulunmanız gerekiyor.",
    pros: [
      {
        title: "Kurumlar vergisi %0*",
        icon: "percent",
        line: "Serbest bölge şartlarını sağlayan gelirde %0. Yıldız önemli: şart ihlalinde standart oran uygulanır.",
      },
      {
        title: "Banka tarafı gerçekten açılıyor",
        icon: "bank",
        brands: ["wio", "mashreq"],
        line: "Wio ve Mashreq NeoBiz ile kurumsal hesap; başvuru dosyasını biz hazırlıyoruz.",
      },
      {
        title: "Global tahsilat kanalları açık",
        icon: "card",
        brands: ["stripe", "paypal", "wise"],
        line: "Stripe, PayPal ve Wam ile kartla tahsilat kurulabiliyor; Wise ve Payoneer hesapları BAE şirketiyle çalışıyor.",
      },
      {
        title: "Oturum vizesi alabiliyorsunuz",
        icon: "id",
        line: "Ortak ve çalışan vizesi, Emirates ID ve sağlık kontrolü dahil süreç.",
      },
      /* "Ofisimiz burada" buradan çıktı: bu Dubai'nin avantajı değil, Ortac'ın
         Dubai'deki avantajı. Ülkenin kendi avantajlarıyla aynı ızgarada durunca
         iki farklı iddia tek liste gibi okunuyordu. Kendi bölümüne taşındı —
         CountryOrtac. */
    ],
    /* Şu an hiçbir bölüm bunu basmıyor: "Karşılığında" hücresi avantaj
       bento'sundan çıkarıldı (bkz. CountryPros). Metin duruyor, çünkü aynı
       kalemler kendi başlarına bir bölüm olarak geri gelecek. */
    watchouts: [
      {
        title: "En yüksek kuruluş maliyeti",
        line: "Lisans ve yenileme kalemleri İngiltere'nin birkaç katı. İkinci yıl yenilemesini baştan planlayın.",
      },
      {
        title: "Yıllık yenileme zorunlu",
        line: "Lisans süresi dolmadan yenilenmezse ceza işler ve banka hesabı riske girer.",
      },
    ],
    clarify: {
      title: "Dubai'de karıştırılan üç şey.",
      lead: "Bunları baştan yazıyoruz ki süreç ortasında sürpriz olmasın.",
      items: [
        {
          title: "Vize için BAE'ye gelmeniz gerekiyor",
          line: "Tescil uzaktan tamamlanabiliyor. Vize, biyometri ve sağlık kontrolü için fiziken BAE'de bulunmanız gerekiyor; bu adım vekâletle yürümüyor.",
        },
        {
          title: "Serbest bölge tek başına %0 demek değil",
          line: "Serbest bölge şirketi olmak otomatik muafiyet vermiyor. %0 oranı, şartları sağlayan nitelikli serbest bölge mükellefinin nitelikli gelirinde geçerli. Şart ihlalinde standart oran uygulanıyor.",
        },
        {
          title: "Şirket kurmak vergi avantajı üretmiyor",
          line: "Avantaj gerçek faaliyete, yönetimin nerede yürüdüğüne, mukimliğinize, gelir türünüze ve ilgili ülke kurallarına bağlı. Bunu değerlendirmeden kurulum yapmıyoruz.",
        },
      ],
    },
    structures: {
      title: "Önce yapıyı seçiyoruz: serbest bölge mi, mainland mi?",
      lead: "Fiyat, vize kotası ve kime satabileceğiniz bu seçime bağlı. Sonradan değiştirmek yeni kuruluş demek.",
      rule: "Kararı satış yaptığınız taraf veriyor: müşteriniz BAE dışındaysa serbest bölge, BAE içindeyse mainland.",
      options: [
        {
          name: "Serbest bölge",
          line: "Bölge otoritesine bağlı lisans. Kuruluşların büyük çoğunluğu burada.",
          fit: [
            "Müşteriniz Türkiye, AB veya BAE dışında",
            "E-ticaret, yazılım, danışmanlık, ajans",
            "Uzaktan çalışan küçük ekip",
            "Kuruluş maliyetini düşük tutmak istiyorsunuz",
          ],
          watch:
            "BAE iç pazarına doğrudan satış için ek düzenleme gerekiyor. Vize kotası aldığınız lisans paketine bağlı.",
        },
        {
          name: "Mainland",
          line: "Ekonomi departmanına bağlı lisans. BAE iç pazarında serbest çalışır.",
          fit: [
            "BAE içindeki şirketlere veya tüketiciye satıyorsunuz",
            "Fiziki mağaza, depo veya şube açacaksınız",
            "Kamu ve kurumsal ihalelere gireceksiniz",
            "Geniş vize kotasına ihtiyacınız var",
          ],
          watch:
            "Ofis şartı ve toplam maliyet serbest bölgenin üzerinde. Faaliyet koduna göre ek onay istenebiliyor.",
        },
      ],
    },
    docs: {
      groups: [
        {
          title: "Sizden istediklerimiz",
          hint: "Hepsi dijital; ıslak imza aşamasına kadar evrak göndermenize gerek yok.",
          items: [
            "Pasaportun renkli taraması (en az 6 ay geçerli)",
            "Beyaz fonlu vesikalık fotoğraf",
            "Adres beyanı: son 3 aya ait fatura veya ikametgâh",
            "Faaliyet konusu ve hedef müşteri tarifi",
            "Üç şirket adı alternatifi, tercih sırasıyla",
          ],
        },
        {
          title: "Süreç içinde ortaya çıkanlar",
          hint: "Bunları biz hazırlıyoruz; sizden yalnızca onay ve imza isteniyor.",
          items: [
            "İsim onayı ve ön başvuru dosyası",
            "Kuruluş sözleşmesi ve pay yapısı",
            "Ticaret lisansı başvurusu",
            "Vize için sağlık kontrolü ve biyometri (BAE'de)",
            "Emirates ID başvurusu",
          ],
        },
      ],
      note: "Faaliyet koduna ve seçtiğiniz otoriteye göre ek belge istenebiliyor. Tercüme veya tasdik gerekiyorsa listeyi teklifte ayrıca yazıyoruz.",
    },
    tax: {
      rows: [
        {
          label: "Kurumlar vergisi",
          value: "375.000 AED'ye kadar %0, üzeri %9",
          note: "Vergiye tabi kazanç üzerinden.",
        },
        {
          label: "Serbest bölge şirketi",
          value: "Otomatik muafiyet yok",
          note: "Şartları sağlayan nitelikli serbest bölge mükellefinin nitelikli gelirinde %0.",
        },
        {
          label: "Kurumlar vergisi beyanı",
          value: "Vergi döneminin bitiminden itibaren 9 ay içinde",
        },
        {
          label: "KDV",
          value: "%5",
          note: "Yıllık vergiye tabi tedarik 375.000 AED eşiğini aşarsa kayıt zorunlu.",
        },
        {
          label: "Kişisel gelir vergisi",
          value: "Yok",
          note: "BAE'de maaş ve kâr payı üzerinden kişisel gelir vergisi alınmıyor.",
        },
      ],
      /* Cümlenin sonu "kurgunuzu mali müşavirimizle birlikte netleştiriyoruz"du.
         Firmanın öyle bir hizmet kurgusu yok, yani ziyaretçiyi olmayan bir
         randevuya yolluyordu. Bağlayıcılık uyarısı ("kişiye özel vergi görüşü
         vermiyoruz") duruyor — kalkan şey uyarı değil, yönlendirme. Sorusu olan
         için çıkış, bölümün altındaki AskCta. */
      note: "Bu tablo genel çerçeve. Sizin durumunuz faaliyetinize, yönetimin nerede yürüdüğüne, mukimliğinize ve gelir türünüze göre değişir. Kişiye özel vergi görüşü vermiyoruz.",
    },
    fitTable: [
      { profile: "E-ticaret ve dijital ürün", you: "Online satış yapıyorsanız", ok: true, why: "Kartla tahsilat ve lojistik tarafı sorunsuz kurulur." },
      { profile: "Körfez ve Orta Doğu'ya satış", you: "Körfez'e satıyorsanız", ok: true, why: "Yerel şirket, yerel müşteride güven ve ödeme kolaylığı." },
      { profile: "Oturum vizesi isteyen", you: "Oturum vizesi istiyorsanız", ok: true, why: "Ortak vizesi ve Emirates ID süreç içinde alınır." },
      { profile: "SaaS ve ajanslar", you: "SaaS veya ajans işletiyorsanız", ok: true, why: "Stripe, PayPal ve Wise bağlantısı kurulabiliyor." },
      { profile: "Kuruluş bütçesi dar olan", you: "Bütçeniz darsa", ok: false, why: "Üç ülkenin en yüksek kuruluş ve yenileme maliyeti burada.", alt: "ingiltere" },
      { profile: "Hiç seyahat edemeyecek olan", you: "Hiç seyahat edemeyecekseniz", ok: false, why: "Banka imzası ve vize için bir kez gelmek şart.", alt: "ingiltere" },
      { profile: "Yalnızca AB'ye fatura kesen", you: "Yalnızca AB'ye fatura kesiyorsanız", ok: false, why: "İngiltere Ltd bu profilde daha az sürtünme yaratır.", alt: "ingiltere" },
    ],
    /* SWAP:DUBAI_STEPS — yedi adım, müşterinin eski sitesindeki akışın aynısı.
       Buradaki liste önce üç ülkede de birebir aynı beş satırdı (evrak → isim →
       tescil → banka → teslim). Genel bir kuruluş şablonuydu, yani Dubai'ye dair
       hiçbir şey söylemiyordu: yalnızca burada olan adımlar — mainland/serbest
       bölge seçimi, medical fitness, Emirates ID — hiç görünmüyordu, oysa
       ziyaretçinin Dubai'yi ötekilerden ayıran sorusu tam olarak onlar.
       Başlıklar ve sıra eski siteden; dil, `who` dağılımı ve süre kalıbı bu
       sitenin kuralına uyduruldu.

       Süreler tipik aralık, müşteri teyidiyle güncellenecek. İlk üç adımda gün
       yazmıyoruz çünkü orada bekleme yok: üçü de karar, üçü de aynı görüşmede
       kapanıyor. Bekleme dördüncü adımda, dosya otoriteye gidince başlıyor. */
    steps: [
      {
        title: "Şirket isminin belirlenmesi",
        timing: "ilk görüşme",
        who: "siz",
        line: "Üç ad adayını tercih sırasıyla veriyorsunuz. Ad, BAE'nin isimlendirme kurallarına uymak ve daha önce alınmamış olmak zorunda; uygunluk kontrolünü ve rezervasyonu biz yapıyoruz.",
      },
      {
        title: "Faaliyet ve lisans türünün belirlenmesi",
        timing: "ilk görüşme",
        who: "ortac",
        line: "Ne sattığınızı anlatıyorsunuz; faaliyet kodunu ve ona karşılık gelen ticari lisans sınıfını biz eşleştiriyoruz. Doğru faaliyet seçimi hem ruhsat sürecini hem sonraki vergi ve regülasyon işlerini belirliyor, sonradan değiştirmek ek işlem demek.",
      },
      {
        title: "Kuruluş tipinin seçilmesi",
        timing: "ilk görüşme",
        who: "siz",
        line: "Serbest bölge, mainland veya offshore. Kararı satış yaptığınız taraf veriyor: müşteriniz BAE dışındaysa serbest bölge, BAE içindeyse mainland. Vize kotası ve toplam maliyet de bu seçime bağlı; sonradan değiştirmek yeni kuruluş demek.",
      },
      {
        title: "Kuruluş işlemleri ve tescil",
        timing: "tipik 3-5 gün",
        who: "ortac",
        line: "Ana sözleşme, kuruluş başvurusu ve ekleri hazırlanıp ilgili otoriteye teslim ediliyor. Sizden bu aşamada yalnızca onay ve imza isteniyor; tescil tamamlandığında şirket resmî olarak kurulmuş oluyor.",
      },
      {
        title: "Ticari lisansın alınması",
        timing: "tipik 2-4 gün",
        who: "otorite",
        line: "Lisans, seçilen faaliyet sınıfına göre otorite tarafından düzenleniyor ve şirketin yasal olarak faaliyete başlamasını sağlıyor. Düzenleme takvimi otoritede; faaliyet koduna göre ek onay istendiğinde bu adım uzayabiliyor.",
      },
      {
        title: "Medical fitness ve Emirates ID",
        timing: "tipik 2-4 gün",
        who: "siz",
        line: "Oturum ve çalışma izni için sağlık kontrolü ve biyometri yapılıyor, ardından Emirates ID başvurusu açılıyor. Bu kimlik BAE'deki resmî işlemlerin çoğunda isteniyor. Adım vekâletle yürümüyor: bir kez BAE'de bulunmanız gerekiyor.",
      },
      {
        title: "GSM hattı ve banka hesabı",
        timing: "tipik 1-2 hafta",
        who: "ortac",
        line: "Kurumsal telefon hattı açılıyor, banka dosyası bankanın istediği formatta hazırlanıp başvuru yapılıyor. Hesap kararı tamamen bankaya ait; reddedilirse ikinci bankaya yeniden başvuruyoruz.",
      },
    ],
    included: [
      "Serbest bölge ticaret lisansı",
      "Şirket tescili ve kuruluş sözleşmesi",
      "İsim onayı ve ön başvuru",
      "Evrak takibi ve panel erişimi",
      "Türkçe tek muhatap",
    ],
    excluded: [
      "Yıllık lisans yenilemesi (ikinci yıl)",
      "Fiziki ofis kirası",
      "Uçuş ve konaklama",
      "Aile vizesi",
    ],
    routes: [
      {
        title: "Fatura ile",
        line: "{hedefteki} şirketiniz Dubai şirketine hizmet faturası keser.",
        note: "Transfer fiyatlandırması kurgusu ve hizmet sözleşmesi gerekir.",
      },
      {
        title: "Kâr payı ile",
        line: "Dubai şirketi dönem kârını ortağına dağıtır.",
        note: "{hedef}–BAE çifte vergilendirme anlaşması kapsamında değerlendirilir.",
      },
      {
        title: "Maaş ile",
        line: "Şirketten kendinize bordrolu ödeme yaparsınız.",
        note: "Mukimlik durumunuz sonucu doğrudan değiştirir.",
      },
    ],
    faq: [
      {
        q: "Dubai'ye gitmeden şirket kurulur mu?",
        a: "Tescil kısmı uzaktan tamamlanabiliyor; ancak banka imzası ve vize işlemleri için bir kez gelmeniz gerekiyor. Sadece şirket isteyip banka istemiyorsanız durumu görüşmede netleştiriyoruz.",
      },
      {
        q: "Banka hesabı garanti mi?",
        a: "Hayır. Hiçbir aracı bankanın kararını garanti edemez. Biz dosyayı bankanın istediği formatta hazırlıyor ve süreci takip ediyoruz; reddedilirse ikinci bankaya yeniden başvuruyoruz.",
      },
      {
        q: "İkinci yıl ne ödeyeceğim?",
        a: "Lisans yenilemesi ve varsa vize yenilemesi. Rakamı kuruluş teklifinde ayrı satır olarak yazıyoruz ki sürpriz olmasın.",
      },
      {
        q: "Muhasebe zorunlu mu?",
        a: "Defter tutma ve beyan yükümlülüğü var. Muhasebeyi bizden almasanız da bir yerden almanız gerekiyor.",
      },
      {
        q: "Türkiye'de mukimsem ne olur?",
        a: "Türkiye'de mukimseniz dünya genelindeki geliriniz Türkiye'de beyana tabi olabilir. Kurgunun en kritik başlığı bu: BAE tarafını Türkiye tarafından ayrı düşünürseniz sonuç yanlış çıkar. İkisini birlikte değerlendirmeden kurulum yapmıyoruz; kişiye özel vergi görüşü de vermiyoruz.",
      },
    ],
  },

  ingiltere: {
    tagline: "Limited · Companies House",
    intro:
      "İngiltere en düşük maliyetli ve tek gerçekten uzaktan kurulabilen seçenek. Karşılığında kurumlar vergisi var ve banka hesabı üç ülkenin en zoru.",
    pros: [
      {
        title: "Ziyaret şartı yok",
        icon: "remote",
        line: "Kuruluşun tamamı uzaktan tamamlanır; hiçbir aşamada gitmeniz gerekmez.",
      },
      {
        title: "En düşük kuruluş maliyeti",
        icon: "wallet",
        line: "Tescil ve kayıtlı adres kalemleri Dubai'nin çok altında.",
      },
      {
        title: "Tanınırlık ve AB pazarı",
        icon: "badge",
        line: "Ltd yapısı Avrupa'daki müşteri ve platformlarda sorunsuz kabul görür.",
      },
      {
        title: "Ödeme altyapısı kolay",
        icon: "card",
        brands: ["stripe", "paypal", "wise"],
        line: "Stripe, PayPal ve Wise bağlantısı hızlı kurulur.",
      },
    ],
    watchouts: [
      {
        title: "Beyan takvimi sıkı",
        line: "Companies House ve HMRC beyanları gecikirse otomatik ceza işler.",
      },
    ],
    clarify: {
      title: "İngiltere'de karıştırılan üç şey.",
      lead: "En sık gelen üç yanlış beklenti, sırasıyla.",
      items: [
        {
          title: "Şirket kurmak oturum hakkı vermiyor",
          line: "Ltd sahibi veya direktörü olmak size vize ya da oturum hakkı doğurmuyor. Göçmenlik tamamen ayrı bir süreç ve ayrı kriterlere bağlı; bu sayfada anlatılan hiçbir adım o sürecin parçası değil.",
        },
        {
          title: "Vergi avantajı için gelen yanlış adreste",
          line: "Ltd'nin kârı İngiltere'de kurumlar vergisine tabi. Burası maliyet ve tanınırlık için seçilir, vergi için değil.",
        },
        {
          title: "Tescil kolay, banka değil",
          line: "Kuruluşun tamamı uzaktan biter. Geleneksel bankada yerleşik olmayan ortak için onay oranı düşük; pratikte ödeme kuruluşu hesabıyla başlanıyor.",
        },
      ],
    },
    docs: {
      groups: [
        {
          title: "Sizden istediklerimiz",
          hint: "Tamamı dijital; hiçbir aşamada evrak göndermeniz veya gitmeniz gerekmiyor.",
          items: [
            "Pasaport veya kimliğin renkli taraması",
            "Adres beyanı: son 3 aya ait fatura veya ikametgâh",
            "Şirket adı ve iki alternatifi",
            "Faaliyet konusu (SIC kodu için tarif yeterli)",
            "Pay dağılımı ve direktör bilgileri",
          ],
        },
        {
          title: "Süreç içinde ortaya çıkanlar",
          hint: "Companies House ve HMRC tarafını biz yürütüyoruz.",
          items: [
            "Companies House tescil dosyası",
            "Kuruluş belgesi ve ana sözleşme",
            "Kayıtlı adres tanımı",
            "HMRC kurumlar vergisi kaydı",
            "Gerekiyorsa KDV kaydı",
          ],
        },
      ],
      note: "Kimlik doğrulama adımında ek belge istenebiliyor. Direktör veya ortak sayısı arttıkça liste her kişi için tekrarlanıyor.",
    },
    tax: {
      rows: [
        {
          label: "Kurumlar vergisi",
          value: "Kâr dilimine göre %19-25",
          note: "SWAP: güncel oran ve marjinal indirim eşiği kuruluş öncesi teyit edilir.",
        },
        {
          label: "Beyan takvimi",
          value: "Companies House yıllık hesap + HMRC beyanı",
          note: "Tarihler şirketin kendi hesap dönemine bağlı; gecikmede otomatik ceza işliyor.",
        },
        {
          label: "KDV",
          value: "Eşik aşılırsa zorunlu",
          note: "Eşiğin altında gönüllü kayıt mümkün; müşteri profiliniz gerektiriyorsa öneriyoruz.",
        },
        {
          label: "Kâr payı ve maaş",
          value: "Ayrı rejime tabi",
          note: "Direktör maaşı için PAYE bordro kaydı gerekiyor.",
        },
        {
          label: "Oturum",
          value: "Şirketle ilgisi yok",
          note: "Şirket kurmak oturum hakkı vermiyor.",
        },
      ],
      note: "Türkiye'de mukimseniz Ltd geliri için Türkiye tarafındaki yükümlülüğünüz ayrıca doğabilir. İki tarafı birlikte kurgulamadan karar vermeyin; kişiye özel vergi görüşü vermiyoruz.",
    },
    fitTable: [
      { profile: "Avrupa'ya hizmet satan", you: "Avrupa'ya hizmet satıyorsanız", ok: true, why: "Ltd yapısı AB müşterisinde ve platformlarda kabul görür." },
      { profile: "Seyahat edemeyecek olan", you: "Hiç seyahat edemeyecekseniz", ok: true, why: "Kuruluşun tamamı uzaktan tamamlanır." },
      { profile: "Düşük bütçeyle başlayan", you: "Düşük bütçeyle başlıyorsanız", ok: true, why: "Tescil ve adres kalemleri Dubai'nin çok altında." },
      { profile: "Yazılım ve danışmanlık", you: "Yazılım veya danışmanlık yapıyorsanız", ok: true, why: "Fatura ve sözleşme tarafı en oturmuş pazar." },
      { profile: "Vergi avantajı arayan", you: "Vergi avantajı arıyorsanız", ok: false, why: "Kâr üzerinden %19-25 bandında kurumlar vergisi var.", alt: "dubai" },
      { profile: "Oturum vizesi isteyen", you: "Oturum vizesi istiyorsanız", ok: false, why: "Şirket kuruluşu oturum hakkı vermiyor.", alt: "dubai" },
      { profile: "Nakit ağırlıklı ticaret", you: "Nakit ağırlıklı ticaret yapıyorsanız", ok: false, why: "Banka onay oranı yerleşik olmayan ortakta düşük." },
    ],
    /* SWAP:UK_STEPS — başlıklar aynı, iki şey değişti. Süreler "Gün 4-6" gibi
       kümülatif takvim noktalarıydı; artık adımın kendi tipik süresi (bkz. Step
       tipindeki gerekçe). `line`'lar da tek bir isim listesiydi ("Adres tanımı
       ve vergi kaydı."); süreç bölümünde satır artık kapalı duruyor ve adıma
       basınca açılıyor, yani orada iki kelimelik bir cevap görmenin anlamı yok.
       Yeni bilgi eklenmedi, aynı olgular cümle hâline getirildi. */
    steps: [
      {
        title: "Evrak ve isim seçimi",
        timing: "ilk görüşme",
        who: "siz",
        line: "Kimliğin renkli taraması, adres beyanı ve şirket adı sizden geliyor. Adın Companies House kurallarına uyması ve daha önce alınmamış olması gerekiyor.",
      },
      {
        title: "Companies House başvurusu",
        timing: "tipik 1 gün",
        who: "ortac",
        line: "Tescil dosyası hazırlanıp Companies House'a veriliyor. SIC kodu, pay dağılımı ve direktör bilgileri bu dosyada tanımlanıyor.",
      },
      {
        title: "Tescil onayı",
        timing: "tipik 1-3 gün",
        who: "otorite",
        line: "Onay çıktığında şirket numarası ve kuruluş belgesi düzenleniyor. Takvim Companies House'ta; kimlik doğrulamada ek belge istenirse bu adım uzayabiliyor.",
      },
      {
        title: "Kayıtlı adres ve HMRC",
        timing: "tipik 2-3 gün",
        who: "ortac",
        line: "Kayıtlı adres tanımlanıyor ve HMRC kurumlar vergisi kaydı açılıyor. Müşteri profiliniz gerektiriyorsa KDV kaydı da bu aşamada yapılabiliyor.",
      },
      {
        title: "Hesap ve teslim",
        timing: "tipik 2-4 gün",
        who: "ortac",
        line: "Ödeme kanalı bağlantısı kuruluyor ve belgeler panelinize aktarılıyor. Geleneksel bankada yerleşik olmayan ortak için onay oranı düşük; kararı banka veriyor.",
      },
    ],
    included: [
      "Companies House tescili",
      "Kayıtlı adres (1 yıl)",
      "Kuruluş belgeleri ve pay yapısı",
      "HMRC vergi kaydı",
      "Evrak takibi ve panel erişimi",
    ],
    excluded: [
      "Geleneksel banka hesabı garantisi",
      "Yıllık adres yenilemesi",
      "KDV kaydı (eşik aşılırsa ayrıca)",
      "Bağımsız denetim",
    ],
    routes: [
      {
        title: "Fatura ile",
        line: "{hedefteki} şirketiniz Ltd'ye hizmet faturası keser.",
        note: "Hizmetin gerçekliği ve fiyatlandırma dayanağı aranır.",
      },
      {
        title: "Kâr payı ile",
        line: "Ltd, vergisini ödedikten sonra kalan kârı ortağına dağıtır.",
        note: "{hedef}–İngiltere çifte vergilendirme anlaşması kapsamında değerlendirilir.",
      },
      {
        title: "Maaş ile",
        line: "Direktör olarak kendinize ödeme yaparsınız.",
        note: "PAYE bordro kaydı gerekir.",
      },
    ],
    faq: [
      {
        q: "Gerçekten hiç gitmem gerekmiyor mu?",
        a: "Evet. Tescil, adres ve vergi kaydının tamamı uzaktan tamamlanır. Yalnızca bazı bankalar yüz yüze görüşme isteyebilir; o durumda alternatif kanallara yöneliyoruz.",
      },
      {
        q: "Banka hesabı açabilecek miyim?",
        a: "Geleneksel bankada yerleşik olmayan ortak için onay oranı düşük. Pratikte Wise veya Revolut Business ile başlıyor, faaliyet geçmişi oluştukça geleneksel bankaya başvuruyoruz.",
      },
      {
        q: "Vergiyi nerede öderim?",
        a: "Ltd'nin kârı İngiltere'de kurumlar vergisine tabi. Türkiye'de mukimseniz ayrıca Türkiye tarafındaki yükümlülüğünüz doğabilir; ikisini birlikte kurgulamak gerekiyor.",
      },
      {
        q: "KDV kaydı yaptırmalı mıyım?",
        a: "Ciro eşiği aşılana kadar zorunlu değil. Müşteri profiliniz gerektiriyorsa gönüllü kayıt da yapılabiliyor.",
      },
      {
        q: "Şirketi kapatmak kolay mı?",
        a: "Evet, tasfiye süreci üç ülke içinde en öngörülebilir olanı. Kapanışta da beyanların tamamlanması gerekiyor.",
      },
    ],
  },

  kktc: {
    tagline: "Limited · yerel tescil",
    intro:
      "KKTC, Türkiye'ye yakınlık ve düşük maliyeti birlikte veriyor. Karşılığında uluslararası tahsilat kanalları Dubai ve İngiltere kadar geniş değil.",
    pros: [
      {
        title: "Türkiye'ye yakın",
        icon: "pin",
        line: "Aynı dil, aynı saat dilimi; gerektiğinde bir günlük yol.",
      },
      {
        title: "Düşük kuruluş maliyeti",
        icon: "wallet",
        line: "Dubai'nin belirgin altında; orta bütçeyle kurulabiliyor.",
      },
      {
        title: "Hızlı tescil",
        icon: "zap",
        line: "Evrak tamamsa tescil kısa sürede sonuçlanıyor.",
      },
      {
        title: "Tanıdık ticari düzen",
        icon: "badge",
        line: "Sözleşme, fatura ve muhasebe pratiği Türkiye'ye benzediği için öğrenme eğrisi kısa.",
      },
    ],
    watchouts: [
      {
        title: "Tahsilat kanalları sınırlı",
        line: "Stripe ve bazı global ödeme sağlayıcıları KKTC şirketiyle çalışmıyor. Ana kısıt bu.",
      },
      {
        title: "Yerinde imza gerekiyor",
        line: "Banka açılışı için fiziki bulunmanız isteniyor.",
      },
      {
        title: "Uluslararası tanınırlık dar",
        line: "Bazı yurt dışı platformlar KKTC şirketini kabul etmiyor.",
      },
    ],
    clarify: {
      title: "KKTC'de karıştırılan dört şey.",
      lead: "Bu dördü baştan netleşmezse yanlış ülkeye kurulum yapılıyor.",
      items: [
        {
          title: "AB üyesi değil",
          line: "KKTC Avrupa Birliği üyesi değil. AB içinde tescilli şirket gerektiren pazar yeri, platform veya müşteri sözleşmeleri için kullanılamıyor.",
        },
        {
          title: "Güney Kıbrıs ile aynı şey değil",
          line: "Kıbrıs Cumhuriyeti ayrı bir ülke, ayrı bir hukuk ve vergi düzeni. İnternette okuduğunuz \"Kıbrıs şirketi\" içeriklerinin çoğu güneyi anlatıyor; ikisi birbirinin yerine geçmiyor.",
        },
        {
          title: "Para birimi Türk Lirası",
          line: "Yerel para birimi TL. Gideriniz TL, geliriniz dövizse kur hareketi işletme maliyetinize doğrudan yansıyor.",
        },
        {
          title: "Şirket kurmak oturum vermiyor",
          line: "Şirket sahipliği tek başına oturum hakkı doğurmuyor. Oturum ayrı bir başvuru süreci ve ayrı kriterlere bağlı.",
        },
      ],
    },
    docs: {
      groups: [
        {
          title: "Sizden istediklerimiz",
          hint: "Tescil kısmı vekâletle yürüyor; banka adımında yerinde bulunmanız gerekiyor.",
          items: [
            "Pasaport veya kimliğin renkli taraması",
            "Adres beyanı: son 3 aya ait fatura veya ikametgâh",
            "Şirket adı ve iki alternatifi",
            "Faaliyet konusu tarifi",
            "Pay dağılımı ve yetkili bilgileri",
          ],
        },
        {
          title: "Süreç içinde ortaya çıkanlar",
          hint: "Tescil ve vergi kaydı tarafını biz yürütüyoruz.",
          items: [
            "İsim onayı ve rezervasyonu",
            "Ana sözleşme ve tescil dosyası",
            "Vergi kaydı",
            "Banka açılışı için yerinde imza",
            "Belgelerin panele devri",
          ],
        },
      ],
      note: "Faaliyet konusuna göre ek izin veya ruhsat gerekebiliyor. Gerekiyorsa listeyi teklifte ayrıca yazıyoruz.",
    },
    tax: {
      rows: [
        {
          label: "Kurumlar vergisi",
          value: "Var",
          note: "Oran ve istisnalar faaliyet konusuna göre değişiyor.",
        },
        {
          label: "Beyan yükümlülüğü",
          value: "Dönemsel beyan + yıllık kapanış",
        },
        {
          label: "KDV",
          value: "Var",
          note: "Kayıt zorunluluğu ve uygulanan oran faaliyetinize bağlı.",
        },
        {
          label: "Para birimi",
          value: "Türk Lirası",
          note: "Kur hareketi işletme maliyetinize doğrudan yansıyor.",
        },
        {
          label: "Oturum",
          value: "Şirketten bağımsız",
          note: "Şirket kurmak oturum hakkı vermiyor.",
        },
      ],
      /* Aynı düzeltme: "mali müşavir görüşmesinde veriyoruz" çıktı, çünkü öyle
         bir görüşme yok. Yerine gerçekten verdiğimiz şey kaldı — yazılı teklif. */
      note: "KKTC için bu sayfada oran yayımlamıyoruz. Oranlar ve istisnalar faaliyet konusuna göre değiştiği için, size uygulanacak çerçeveyi yazılı teklifte satır satır yazıyoruz.",
    },
    fitTable: [
      { profile: "Türkiye merkezli operasyon", you: "Operasyonunuz Türkiye merkezliyse", ok: true, why: "Aynı dil, aynı saat dilimi, bir günlük yol." },
      { profile: "Bölgesel ticaret ve hizmet", you: "Bölgesel ticaret veya hizmet yapıyorsanız", ok: true, why: "Yerel tescil ve düşük işletme maliyeti." },
      { profile: "Orta bütçeyle başlayan", you: "Orta bütçeyle başlıyorsanız", ok: true, why: "Dubai'nin belirgin altında kuruluş bedeli." },
      { profile: "Gayrimenkul ve turizm", you: "Gayrimenkul veya turizm işindeyseniz", ok: true, why: "Sektörün yerel şirketle çalışması olağan." },
      { profile: "Stripe ile kart tahsilatı", you: "Kart tahsilatını Stripe ile yapacaksanız", ok: false, why: "Stripe KKTC şirketleriyle çalışmıyor. Ana kısıt bu.", alt: "dubai" },
      { profile: "AB pazarına fatura kesen", you: "AB pazarına fatura kesiyorsanız", ok: false, why: "Tanınırlık dar; bazı platformlar kabul etmiyor.", alt: "ingiltere" },
      { profile: "Global platformda satış", you: "Global platformlarda satıyorsanız", ok: false, why: "Hesap açılışında sık sık reddedilirsiniz.", alt: "dubai" },
    ],
    /* SWAP:KKTC_STEPS — İngiltere ile aynı iki değişiklik: kümülatif gün yerine
       adımın kendi tipik süresi, ve isim listesi yerine cümle. Yeni bilgi yok. */
    steps: [
      {
        title: "Evrak toplama",
        timing: "ilk görüşme",
        who: "siz",
        line: "Kimliğin renkli taraması, adres beyanı ve faaliyet konusu tarifi sizden geliyor. Tescil kısmı vekâletle yürüdüğü için bu aşamada gelmeniz gerekmiyor.",
      },
      {
        title: "İsim onayı",
        timing: "tipik 1-2 gün",
        who: "ortac",
        line: "Şirket adı kontrol edilip rezerve ediliyor. Ana sözleşme taslağı onaylanan adla hazırlanıyor.",
      },
      {
        title: "Tescil",
        timing: "tipik 3-4 gün",
        who: "otorite",
        line: "Ana sözleşme ve tescil dosyası yerel otoriteye veriliyor, şirket tescil ediliyor. Faaliyet konusuna göre ek izin veya ruhsat gerekebiliyor.",
      },
      {
        title: "Banka hesabı",
        timing: "tipik 1-3 gün",
        who: "siz",
        line: "Hesap açılışında yerinde imza isteniyor; bu adım için KKTC'de bulunmanız gerekiyor. Hesap kararı bankaya ait.",
      },
      {
        title: "Vergi kaydı ve teslim",
        timing: "tipik 1-2 gün",
        who: "ortac",
        line: "Vergi kaydı açılıyor ve kuruluş belgelerinin tamamı panelinize aktarılıyor.",
      },
    ],
    included: [
      "Yerel ticaret tescili",
      "Şirket tescili ve ana sözleşme",
      "İsim onayı",
      "Vergi kaydı",
      "Evrak takibi ve panel erişimi",
    ],
    excluded: [
      "Stripe ve benzeri global tahsilat",
      "Uçuş ve konaklama",
      "Yıllık yenileme bedelleri",
      "Aile oturumu",
    ],
    routes: [
      {
        title: "Fatura ile",
        line: "{hedefteki} şirketiniz KKTC şirketine hizmet faturası keser.",
        note: "Hizmet sözleşmesi ve dayanak belgeleri gerekir.",
      },
      {
        title: "Kâr payı ile",
        line: "Şirket dönem kârını ortağına dağıtır.",
        note: "Dağıtım kararı ve belgelerin usulüne uygun olması gerekir.",
      },
      {
        title: "Maaş ile",
        line: "Şirketten kendinize düzenli ödeme yaparsınız.",
        note: "Bordro kurulumu ve mukimlik değerlendirmesi yapılır.",
      },
    ],
    faq: [
      {
        q: "Stripe kullanabilir miyim?",
        a: "Hayır. Stripe şu an KKTC şirketleriyle çalışmıyor. Kartla tahsilat ana ihtiyacınızsa Dubai veya İngiltere'ye bakmak gerekiyor — bunu baştan söylüyoruz.",
      },
      {
        q: "Banka için gitmem şart mı?",
        a: "Evet, hesap açılışında yerinde imza isteniyor. Tescil kısmı vekâletle yürütülebiliyor.",
      },
      {
        q: "Oturum alabilir miyim?",
        a: "Şirket kurmak tek başına oturum hakkı vermiyor. Oturum ayrı bir başvuru süreci ve ayrı kriterlere bağlı; şirketiniz o başvuruda dayanak oluşturabilir ama sonucu garanti etmiyor. Şartları görüşmede netleştiriyoruz.",
      },
      {
        q: "Türkiye'den yönetirsem sorun olur mu?",
        a: "Şirketin nereden yönetildiği vergi açısından belirleyici olabiliyor. Yönetimin fiilen nerede yürüdüğünü kuruluştan önce netleştirmek gerekiyor; kişiye özel vergi görüşü vermiyoruz.",
      },
      {
        q: "Kimler için mantıklı değil?",
        a: "Global platformlarda satış yapacaksanız ve kart tahsilatı ana kanalınızsa mantıklı değil. Bölgesel ticaret ve hizmet işlerinde ise maliyet avantajı gerçek.",
      },
    ],
  },
};

export const WHO_LABEL: Record<Step["who"], string> = {
  siz: "Sizde",
  ortac: "Ortac'ta",
  otorite: "Otoritede",
};
