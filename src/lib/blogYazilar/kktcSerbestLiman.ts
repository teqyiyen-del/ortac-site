/* KKTC SERBEST LİMAN ŞİRKETİ · yeni yazı (eski sitede karşılığı yok)

   HEDEF SORGULAR: "kktc serbest liman şirketi", "kıbrıs serbest bölge şirket
   kurma", "kktc serbest bölge şirket", "gazimağusa serbest liman",
   "kıbrıs'ta şirket kurmak". Başlıkta "Serbest Liman", arama başlığında
   "Kıbrıs'ta şirket kurmak", gövde başlıklarında "serbest bölge" ve
   "Gazimağusa" geçiyor. KKTC vergi yazısı (kktcVergi.ts) "kıbrıs'ta şirket
   kurmanın avantajları" sorgusuna oynuyor; bu yazı ORANLARI anlatmıyor,
   yapıyı ve kuruluşu anlatıyor ki iki yazı aynı kelimeye talip olmasın.

   ASIL AYRIM (Murat Bey, 09.10.2026: "Serbest Liman diye bildirmeliyiz; KKTC
   yerel piyasası içinde önemli bir ayrımımız olmalı"): yazı Serbest Liman ve
   Bölge şirketini KKTC'nin yerel (iç piyasa) limited şirketinden ayırıyor,
   Güney Kıbrıs'la (Kıbrıs Cumhuriyeti, AB üyesi) karışmasına ayrı bölüm
   açıyor.

   KAYNAK (09.10.2026'da yeniden açılıp okundu):
     · sliman.gov.ct.tr · Vergi Yükümlülükleri ve Muafiyetler: muafiyet,
       gümrük hattının dışında sayılma, iç piyasaya satışta gümrük ve KDV,
       kâr ve sermaye transferi serbest
     · sliman.gov.ct.tr · Şirket Müracaatı ve Tescili: Gazimağusa, 2-50
       hissedar, uyruk kısıtı yok, Yönetim Kurulu ve Bakanlar Kurulu onayı,
       bloke yazısı
     · mevzuat.mahkemeler.net/Yasalar/26-1983.doc: yasanın adı ve sayısı
       (Serbest Liman ve Bölge Yasası, 26/1983; görev notundaki 31/1983
       DEĞİL), vergi bağışıklığı maddesi
     · yerel şirket: docs/kktc-mevzuat.md · 1-3 (kurumlar %10, stopaj %15,
       KDV %16, RKMMD prosedürü 25.000 €, Ekonomi Bakanlığı onayı). Bu turda
       yeniden açılmadı; oranlar o kayıttan ve kktcVergi.ts ile aynı.
     · ödeme kuruluşları: docs/kktc-mevzuat.md · 10 (ülke listeleri)
     · Türkiye tarafı: docs/kktc-mevzuat.md · 9; yazıda yalnız çerçeve
   MURAT BEY TEYİTLİ (resmî sayfayla çelişince bunlar yazıldı):
     · en az sermaye 25.000 € (resmî sayfa hâlâ 50.000 € yazıyor)
     · başvuru harcı 2.000 USD, tescil harcı 2.500 USD ve ikisi de 9.920 €'nun
       içinde (resmî sayfa başvuru harcını 200 USD yazıyor)
     · süre yaklaşık 30-40 iş günü, imza için bir kez KKTC'ye geliş
     · denetçi raporu gerekmiyor, yıllık hesap ve beyan nisanda
     · banka hesabı genellikle 2-4 hafta, karar bankada
     · Stripe ve PayPal yok, kartla tahsilat yerel sanal POS'la
   Fiyatlar lib/kktcFiyat.ts'ten (teklif belgesi, 06.10.2026); adımlar ve
   belgeler countryContent.ts · kktc'den.

   BİLİNÇLİ OLARAK YAZILMAYANLAR: banka adı ve sanal POS sağlayıcısının adı
   (teyit KKTC 20), yasadaki izinli faaliyet listesi (yasa metni bozuk
   okundu), yerel limitedin kuruluş maliyeti ve süresi (Ortac fiyatı yok,
   resmî süre yayımlanmamış), UİŞ rejimi (Ortac kurmuyor), gelir vergisi
   dilimleri ve KDV cetvelleri (kktcVergi.ts'te), Türkiye'deki kâr payı
   istisnasının oranı ve sınırları (kişiye özel görüş olmasın; vergi yazısına
   bağlandı), "aynı saat dilimi" (teyit KKTC 49 açık), noter ve apostil
   şartı (teyit KKTC 38 açık), arsa tahsisi ve liman tarifeleri.

   BAĞLAMA: slug henüz lib/blogTemel.ts · SLUG kaydında yok ve o dosyaya bu
   turda dokunulmadı. Aşağıdaki ADRES sabiti tipi geçici olarak sağlıyor;
   bağlanırken SLUG'a `kktcSerbestLiman` satırı eklenip `slug` alanı
   SLUG.kktcSerbestLiman yapılır, sabit ve BlogSlug import'u silinir. */
import type { BlogPost } from "@/lib/blog";
import { SLUG } from "@/lib/blogTemel";
import { POST_PHOTO } from "@/lib/media";

/** GEÇİCİ: SLUG kaydına eklenince silinecek (bkz. dosya başı · BAĞLAMA). */

export const POST_KKTC_SERBEST_LIMAN: BlogPost = {
  slug: SLUG.kktcSerbestLiman,
  category: "ulke-rehberi",
  title: "KKTC Serbest Liman şirketi 2026: kuruluş, vergi ve maliyet",
  heroAccent: "kuruluş, vergi ve maliyet",
  summary:
    "KKTC Serbest Liman ve Bölge şirketi nedir, yerel şirketten farkı ne? Vergi şartı, sermaye, kuruluş adımları, süre ve maliyet gerçek rakamlarla.",
  /* 10.10.2026 · Burak: yazılar toplu girildi; tarihleri 2026'ya yay.
     Yayın tarihi yayıldı, güncelleme tarihi rakamların doğrulandığı gün
     (yazı içindeki "Ekim 2026 itibarıyla" ifadeleriyle tutarlı). */
  publishedAt: "2026-10-06",
  topic: "Şirket kuruluşu",
  country: "kktc",
  tags: ["KKTC", "Serbest Liman", "Şirket kuruluşu"],
  author: "Murat Ortaç",
  cover: POST_PHOTO.girneDag,

  seo: {
    title: "KKTC Serbest Liman Şirketi: Kıbrıs'ta Şirket Kurmak 2026",
    description:
      "KKTC Serbest Liman şirketi nedir, yerel şirketten farkı ne? Vergi şartı, 25.000 € sermaye, 30-40 iş günü süre ve 9.920 € kuruluş maliyeti.",
  },

  sourceNote:
    "Vergi muafiyeti ve kuruluş kuralları KKTC Serbest Liman ve Bölge Müdürlüğü'nün yayımladığı metinlerden ve 26/1983 sayılı Serbest Liman ve Bölge Yasası'ndan alınmıştır. Süre, sermaye uygulaması ve maliyet Ortac Global'in Lefkoşa ofisinin yürüttüğü kuruluşlardan. Bilgiler 10 Ekim 2026 itibarıyla günceldir.",

  body: [
    {
      kind: "ozet",
      items: [
        "KKTC Serbest Liman ve Bölge şirketi, Gazimağusa'daki Serbest Liman'da tescil edilen bir limited şirket; KKTC'nin yerel şirketinden ayrı bir vergi düzenine giriyor.",
        "KKTC dışındaki ve Serbest Liman içindeki şirketlere yapılan işte kurumlar ve gelir vergisi yok; KKTC içindeki yerel şirkete satışta normal vergi uygulanıyor.",
        "Şirket en az iki ortakla kuruluyor. Ortaklardan biri KKTC vatandaşı değilse en az sermaye 25.000 €; süre yaklaşık 30-40 iş günü.",
        "Ortac Global'de kuruluş ve ilk yıl toplamı 9.920 €. Stripe ve PayPal KKTC şirketini desteklemiyor.",
      ],
    },
    {
      kind: "p",
      text: "\"Kıbrıs'ta şirket kurmak\" diye arayan biri üç ayrı şeyle karşılaşıyor: KKTC'nin yerel limited şirketi, KKTC Serbest Liman ve Bölge şirketi ve Güney Kıbrıs şirketi. Üçünün vergisi, sermayesi ve kullanım alanı birbirinden farklı. Bu yazı Serbest Liman şirketini 10 Ekim 2026 itibarıyla geçerli kurallar ve rakamlarla anlatıyor. Oranların ayrıntısı için [KKTC vergi avantajları yazımıza](/blog/kktc-vergi-avantajlari) bakabilirsiniz.",
    },

    { kind: "h2", id: "nedir", text: "KKTC Serbest Liman şirketi nedir?" },
    {
      kind: "p",
      text: "KKTC Serbest Liman şirketi, Gazimağusa'daki Serbest Liman ve Bölge'de tescil edilen bir limited şirkettir. Dayanağı 26/1983 sayılı Serbest Liman ve Bölge Yasası ile KKTC'nin şirketler yasası. Halk arasında \"Kıbrıs serbest bölge şirketi\" ya da \"KKTC serbest bölge şirketi\" de deniyor; hepsi aynı yapıyı anlatıyor.",
    },
    {
      kind: "p",
      text: "Serbest Liman ve Bölge, devletin gümrük hattının dışında sayılıyor. [Serbest Liman ve Bölge Müdürlüğü'nün yayımladığı kurallara](https://sliman.gov.ct.tr/SLBM-%C5%9E%C4%B0RKET-HAK/VERG%C4%B0-Y%C3%9CK%C3%9CML%C3%9CL%C3%9CKLER%C4%B0-VE-MUAF%C4%B0YETLER) göre burada tescilli şirketin KKTC dışına dönük ticaret, üretim ve hizmet kazancı gelir ve kurumlar vergisinden muaf. Şirket hukuken yine bir limited şirket; farkı tescil edildiği yer ve girdiği vergi düzeni.",
    },
    { kind: "h3", text: "Gazimağusa Serbest Liman'da ofis açmak şart mı?" },
    {
      kind: "p",
      text: "Hayır. Şirketin KKTC'de bir kayıtlı adresi ve yasal temsilcisi olması gerekiyor. Bunu kendi adresinizi kiralayıp personel çalıştırarak ya da adres ve yasal temsilcilik sözleşmesiyle karşılıyorsunuz. Ortac Global'in kuruluşlarında adres ve temsilcilik hizmeti fiyatın içinde ve işler Lefkoşa'daki ofisten yürüyor.",
    },
    {
      kind: "gorsel",
      src: POST_PHOTO.lefkosa,
      alt: "Lefkoşa'da Selimiye Camii ve minareleri",
      caption: "Ortac Global'in KKTC ofisi Lefkoşa'da; Serbest Liman ve Bölge Gazimağusa'da.",
    },

    { kind: "h2", id: "yerel-sirket-farki", text: "Serbest Liman şirketi ile KKTC yerel şirketi arasındaki fark ne?" },
    {
      kind: "p",
      text: "İki şirket de limited, ikisi de KKTC'de kuruluyor; ayrıldıkları yer kime satış yaptıkları. Yerel şirket KKTC iç piyasasında çalışmak için kuruluyor ve KKTC'nin genel vergi düzenine giriyor. Serbest Liman şirketi KKTC dışına iş yapmak için kuruluyor ve o işte vergi ödemiyor. Hangisini kuracağınıza müşterinizin nerede olduğu karar veriyor.",
    },
    {
      kind: "tablo",
      caption: "KKTC'de Serbest Liman şirketi ile yerel limited şirket",
      head: ["Başlık", "Serbest Liman şirketi", "Yerel limited şirket"],
      rows: [
        ["Kime satış için", "KKTC dışı ve Serbest Liman içi", "KKTC iç piyasası"],
        ["Kurumlar vergisi", "Bu işte yok", "%10"],
        ["Kâr dağıtımında KKTC vergisi", "Yok", "%15 stopaj"],
        ["KDV", "Şirket KDV mükellefi değil", "Genel oran %16"],
        ["KKTC içine satış", "Normal vergi: gümrük, KDV, kurumlar vergisi", "Olağan faaliyeti"],
        ["Onay", "Serbest Liman yönetimi ve Bakanlar Kurulu", "Ekonomiden sorumlu bakanlık"],
        ["Ortak sayısı", "En az 2", "En az 2"],
        ["Yabancı ortakta en az sermaye", "25.000 €", "25.000 € karşılığı TL"],
      ],
      foot: "Yerel şirketin oranları 41/1976 sayılı Kurumlar Vergisi Yasası ile 24/1982 sayılı Gelir Vergisi Yasası'ndan. Yerel şirkette onay ve sermaye satırları yabancı ortaklı şirket için.",
    },
    {
      kind: "p",
      text: "Yerel şirkette kurumlar vergisi ve stopaj birlikte yüzde 23,5'lik bir yük oluşturuyor; hesabı [KKTC vergi yazımızda](/blog/kktc-vergi-avantajlari) adım adım duruyor. Ortac Global KKTC'de Serbest Liman ve Bölge şirketi kuruyor; bu yazıdaki süre ve maliyet o yapıya ait.",
    },

    { kind: "h2", id: "guney-kibris", text: "KKTC şirketi ile Güney Kıbrıs şirketi aynı şey mi?" },
    {
      kind: "p",
      text: "Hayır. Adanın güneyindeki Kıbrıs Cumhuriyeti ayrı bir ülke ve Avrupa Birliği üyesi; hukuku, vergisi ve şirket sicili ayrı. KKTC AB üyesi değil. İnternette \"Kıbrıs şirketi\" ya da \"Cyprus company\" diye anlatılanların çoğu güneyi anlatıyor: AB içinde tescilli şirket, AB KDV numarası ve ödeme kuruluşlarının ülke listelerindeki \"Cyprus\" satırı oraya ait.",
    },
    {
      kind: "p",
      text: "Bu ayrım pratikte iki yerde karşınıza çıkıyor. AB'de tescilli şirket isteyen pazar yeri, platform ya da müşteri sözleşmesinde KKTC şirketi kullanılamıyor. AB gümrüğünün aradığı [EORI numarası](/blog/eori-numarasi-nedir-nasil-alinir) gibi kayıtlarda da KKTC şirketi AB'de yerleşik sayılmıyor.",
    },

    { kind: "h2", id: "vergi", text: "KKTC Serbest Liman şirketinde vergi nasıl işliyor?" },
    {
      kind: "p",
      text: "KKTC Serbest Liman şirketi, KKTC dışındaki ve Serbest Liman içindeki şirketlere yaptığı işte kurumlar ve gelir vergisi ödemiyor; şirket KDV mükellefi de değil. Kâr ve sermaye transferi serbest ve KKTC tarafında vergilenmiyor. Muafiyetin tek şartı işin yönü: aynı şirketin iki müşterisi iki ayrı sonuç doğuruyor.",
    },
    {
      kind: "tablo",
      caption: "KKTC Serbest Liman şirketi: müşteriye göre vergi",
      head: ["Müşteri nerede?", "Kurumlar ve gelir vergisi", "KDV ve gümrük"],
      rows: [
        ["KKTC dışında", "Yok", "Yok"],
        ["Serbest Liman içindeki başka bir şirket", "Yok", "Yok"],
        ["KKTC içindeki yerel şirket", "Normal kurallar", "Tam uygulanıyor"],
      ],
      foot: "Serbest Liman içindeki şirkete satış gümrük öncesi satış sayıldığı için muafiyetin içinde kalıyor.",
    },
    {
      kind: "note",
      tone: "warn",
      title: "\"Sıfır vergi\" şarta bağlı",
      text: "Muafiyet yalnız KKTC dışına ve Serbest Liman içine yapılan işi kapsıyor, yalnız şirketin KKTC'deki vergisini ilgilendiriyor. KKTC içine satışınız varsa o satış vergileniyor. Ortağın kendi yaşadığı ülkedeki vergisi ayrıca işliyor.",
    },
    {
      kind: "p",
      text: "Vergi çıkmaması kayıt tutulmadığı anlamına gelmiyor: şirket her yıl hesaplarını hazırlayıp beyanını veriyor. Hangi işin muafiyete girdiği [KKTC vergi sayfasında](/kktc/vergi) örneklerle anlatılıyor.",
    },

    { kind: "h2", id: "kime-uygun", text: "KKTC Serbest Liman şirketi kime uygun?" },
    {
      kind: "p",
      text: "KKTC Serbest Liman şirketi, müşterisi KKTC dışında olan ve tahsilatını banka havalesiyle ya da yerel sanal POS'la yapabilen işlere uyuyor. En sık karşılaştığımız üç durum şöyle:",
    },
    {
      kind: "list",
      items: [
        "Transit ticaret ve ihracat: malınız Serbest Liman'dan yurt dışına gidiyorsa kazanç vergiden, mal gümrükten muaf.",
        "Yurt dışına hizmet: yazılım, danışmanlık ya da tasarım gibi hizmetleri KKTC dışındaki müşterilere satıyorsanız şirket Serbest Liman şirketi olarak kuruluyor.",
        "TL hesap ihtiyacı: şirketinizin hem TL hem döviz hesabına ihtiyacı varsa KKTC bankasında ikisi de açılıyor ve Türkiye'den TL ödeme alınabiliyor.",
      ],
    },
    {
      kind: "p",
      text: "Kıbrıs'ta yaşamayı da düşünüyorsanız gündelik hayat, kira ve çalışma izni tarafını [KKTC'de yaşam yazımızda](/blog/kktc-yasam-rehberi-kibris-is-firsatlari-maliyetler) anlattık.",
    },

    { kind: "h2", id: "adimlar", text: "Kıbrıs'ta serbest bölge şirketi nasıl kuruluyor, ne kadar sürüyor?" },
    {
      kind: "p",
      text: "KKTC Serbest Liman şirketinin kuruluşu iki onaydan geçiyor: önce Serbest Liman yönetimi, sonra Bakanlar Kurulu. Belgeler tamamlandıktan sonra süre yaklaşık 30-40 iş günü. Ortac Global'in yürüttüğü kuruluşlarda adımlar şöyle:",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "Şirket ismi: iki üç alternatif belirleniyor, isim uygunluğu kontrol ediliyor. Tipik süre 3 iş günü.",
        "Belgeler ve imza: kuruluş belgeleri hazırlanıyor, imza için bir kez KKTC'ye geliyorsunuz. Tipik süre 3 iş günü.",
        "Sermaye hesabı: aynı ziyarette bankada şirketin sermaye hesabını açıyorsunuz.",
        "Serbest Liman onayı: başvuru değerlendirilip Bakanlar Kurulu'na iletiliyor. Tipik süre 10 iş günü.",
        "Bakanlar Kurulu onayı ve tescil: tipik süre 14 iş günü. Yabancı ortağın payı kadar sermaye bu aşamada bloke ediliyor.",
        "Adres ve yasal temsilcilik sözleşmesi imzalanıyor.",
        "Tescil belgeleri çıkıyor, bloke kalkıyor ve banka hesabı kullanıma açılıyor.",
      ],
    },
    {
      kind: "p",
      text: "Adımların toplamı en az 30 iş günü ediyor; onay makamlarının takvimine göre 40 iş gününe uzayabiliyor. Belgeler kargoyla gidip gelmiyor: imzayı KKTC'de atıyorsunuz. Sizden pasaport ya da kimlik kopyası, ikamet belgesi ve adli sicil belgesi isteniyor; tam liste [KKTC'de şirket kurma sayfasında](/kktc).",
    },

    { kind: "h2", id: "sermaye", text: "KKTC Serbest Liman şirketinde sermaye ne kadar, bloke kalıyor mu?" },
    {
      kind: "p",
      text: "Ortaklardan biri bile KKTC vatandaşı değilse en az sermaye 25.000 €. Türkiye vatandaşları KKTC'de yabancı ortak sayılıyor, yani Türkiye'den kurulan şirketlerin hepsi bu kurala giriyor. Sermayenin yabancı ortağa düşen payı kadarı tescil sırasında KKTC'deki bankada bloke ediliyor.",
    },
    {
      kind: "p",
      text: "Örnek: iki ortak da Türkiye vatandaşıysa 25.000 €'nun tamamı bloke ediliyor. Ortaklardan biri KKTC vatandaşıysa ve pay yarı yarıyaysa bloke edilen tutar 12.500 €. Bu para kimseye ödenmiyor ve bir harç değil: şirket tescil belgeleriyle bankaya başvurulunca bloke kalkıyor, tutar şirketin hesabında kullanılabiliyor.",
    },
    {
      kind: "note",
      tone: "info",
      title: "Başka yerde 50.000 € okuyabilirsiniz",
      text: "Sermaye rakamı kaynaktan kaynağa değişiyor; bazı metinlerde 50.000 € geçiyor. Lefkoşa ofisimizin bugün yürüttüğü kuruluşlarda uygulanan en az sermaye 25.000 €. Ortaklık yapınıza göre tutarı teklifte yazılı veriyoruz.",
    },

    { kind: "h2", id: "maliyet", text: "KKTC Serbest Liman şirketi kurmak ne kadar tutuyor?" },
    {
      kind: "p",
      text: "Ortac Global'de KKTC Serbest Liman şirketinin kuruluş ve ilk yıl toplamı 9.920 €. Bu rakam Ortac Global'in kendi fiyatı; piyasa ortalaması değil. Kalemlerin hepsi zorunlu ve Serbest Liman'a ödenen başvuru harcı (2.000 USD) ile tescil harcı (2.500 USD) bu tutarın içinde.",
    },
    {
      kind: "tablo",
      caption: "KKTC Serbest Liman şirketi · kuruluş ve ilk yıl (Ortac Global fiyatı)",
      head: ["Kalem", "Tutar", "Ne zaman"],
      rows: [
        ["Şirket kuruluşu (başvuru ve tescil harçları dahil)", "4.900 €", "Bir kez"],
        ["Serbest Bölge faaliyet harcı", "2.700 €", "Her yıl"],
        ["Kayıtlı adres ve yasal temsilcilik", "2.000 €", "Her yıl"],
        ["Adres ve temsilcilik üzerinden KDV (%16)", "320 €", "Her yıl"],
        ["Toplam", "9.920 €", "Kuruluş ve ilk yıl"],
      ],
      foot: "Muhasebe ve sermaye bu toplamın içinde değil. Sermaye bir gider değil; şirketin kendi parası.",
    },
    {
      kind: "p",
      text: "Bu, Ortac Global'in çalıştığı üç ülke içinde en yüksek kuruluş maliyeti. Bütçeniz belirleyiciyse [İngiltere](/ingiltere) ve [Dubai](/dubai) sayfalarındaki rakamlara da bakın; üçü [ülke karşılaştırmasında](/ulkeler) yan yana duruyor.",
    },

    { kind: "h2", id: "yillik", text: "Kuruluştan sonra her yıl hangi yükümlülükler var?" },
    {
      kind: "p",
      text: "KKTC Serbest Liman şirketi vergi ödemese de üç şeyi her yıl yapıyor: faaliyet harcını ödüyor, kayıtlı adresini ve yasal temsilcisini sürdürüyor, yıllık hesaplarını hazırlayıp beyanını veriyor. Yıllık hesap ve beyan nisan ayında veriliyor. Denetçi raporu gerekmiyor; isterseniz ek ücretle hazırlanıyor.",
    },
    {
      kind: "tablo",
      caption: "KKTC Serbest Liman şirketi · her yıl tekrarlayan kalemler",
      head: ["Kalem", "Tutar", "Not"],
      rows: [
        ["Serbest Bölge faaliyet harcı", "2.700 €", "Yıllık faaliyet izni"],
        ["Adres ve yasal temsilcilik", "2.320 €", "2.000 € ve %16 KDV"],
        ["Muhasebe · aktif şirket", "270 € / ay", "Banka hesabının açıldığı aydan itibaren"],
        ["Muhasebe · pasif şirket", "900 € / yıl", "Yıllık hesaplar ve beyan"],
      ],
      foot: "Tutarlar Ortac Global'in 10 Ekim 2026'daki fiyatları.",
    },
    {
      kind: "p",
      text: "Banka hesabı açılana kadar şirket pasif sayılıyor; hesabın açıldığı ay aylık muhasebenin ilk ayı. Kayıt düzeni ve yıllık takvim [KKTC muhasebe sayfasında](/kktc/muhasebe), ortak ya da direktör değişikliği gibi işler [KKTC kurumsal danışmanlık sayfasında](/kktc/kurumsal-danismanlik) anlatılıyor.",
    },

    { kind: "h2", id: "banka", text: "KKTC şirketiyle banka hesabı ve tahsilat nasıl işliyor?" },
    {
      kind: "p",
      text: "Şirketin hesabı KKTC'deki yerel bir bankada, TL ve dövizle açılıyor. Tescilden sonra hesap genellikle 2-4 haftada açılıyor; kararı banka kendi incelemesiyle veriyor ve hesap açılışını kimse garanti edemiyor. Banka şirketin faaliyetine, müşteri ve tedarikçilerine, sözleşme ve faturalara, paranın kaynağına bakıyor. Bu incelemenin neden yapıldığını [KKTC AML ve uyum sayfasında](/kktc/aml-uyum) anlattık.",
    },
    { kind: "h3", text: "KKTC şirketiyle Stripe ya da PayPal kullanılabiliyor mu?" },
    {
      kind: "p",
      text: "Hayır. Stripe ve PayPal KKTC şirketini desteklemiyor; ülke listelerindeki \"Cyprus\" güneyi anlatıyor. Kartla tahsilat yerel sanal POS'la yapılıyor ve ödemeler KKTC'deki şirket hesabına geliyor. Kalan tahsilat banka havalesiyle yürüyor. Hesap açılışı ve çalışan kanallar [KKTC banka hesabı sayfasında](/kktc/banka-hesabi) duruyor.",
    },

    { kind: "h2", id: "turkiye", text: "Türkiye'de yaşayan ortak nelere dikkat etmeli?" },
    {
      kind: "p",
      text: "KKTC'deki muafiyet şirketin KKTC'deki vergisini ilgilendiriyor; ortağın yaşadığı ülkedeki kişisel vergisine dokunmuyor. Türkiye'de yaşıyorsanız şirketten size geçen kâr payı Türkiye'de beyan konusu olabilir. Şirketin fiilen nereden yönetildiği de ayrı bir başlık. Bunlar kişiye göre değişiyor; kuruluştan önce durumunuzu kendi mali müşavirinizle değerlendirin.",
    },
    {
      kind: "p",
      text: "Genel çerçeveyi [KKTC vergi yazımızın Türkiye bölümünde](/blog/kktc-vergi-avantajlari) anlattık. Yaşadığınız ülkeyi değiştirmeyi düşünüyorsanız [gelir vergisi olmayan ülkeler yazımız](/blog/gelir-vergisi-olmayan-ulkeler-2025) vergi mukimliğinin nasıl işlediğini açıklıyor.",
    },

    { kind: "h2", id: "uygun-degil", text: "KKTC Serbest Liman şirketi kime uygun değil?" },
    {
      kind: "p",
      text: "KKTC Serbest Liman şirketi her işe uymuyor. Aşağıdaki durumlardan biri sizi anlatıyorsa başka bir ülkeye bakmanız gerekiyor:",
    },
    {
      kind: "list",
      items: [
        "Kart tahsilatını Stripe ya da PayPal ile yapacaksanız: ikisi de KKTC şirketini desteklemiyor.",
        "Amazon ya da Etsy'de satacaksanız: satıcı ülke listelerinde KKTC yok. [E-ticaret işleri](/sektorler/e-ticaret) için İngiltere ya da Dubai daha uygun çıkıyor.",
        "Müşteriniz KKTC içindeki yerel şirketlerse: o satışta normal vergi uygulanıyor, muafiyetin anlamı kalmıyor.",
        "AB'de tescilli şirkete ihtiyacınız varsa: KKTC AB üyesi değil.",
        "Tek başınıza kuracaksanız: şirket en az iki ortak istiyor.",
        "Hiç seyahat edemeyecekseniz: imza için bir kez KKTC'ye gelmek şart.",
        "Şirketle oturum ya da vize bekliyorsanız: şirket kurmak oturum hakkı vermiyor ve KKTC'de vize hizmeti vermiyoruz.",
      ],
    },
    {
      kind: "p",
      text: "Uluslararası ödeme kuruluşlarına ve yaygın banka erişimine ihtiyacınız varsa [İngiltere'de şirket](/ingiltere), oturum da istiyorsanız [Dubai'de şirket](/dubai) genellikle daha doğru adres. Hangisinin işinize uyduğunu [uygunluk testinde](/uygunluk-testi) birkaç soruyla görebilirsiniz.",
    },

    {
      kind: "note",
      tone: "info",
      title: "Ortac Global bu konuda ne yapıyor?",
      text: "Ortac Global KKTC'de Serbest Liman ve Bölge şirketi kuruyor: isim kontrolü, kuruluş belgeleri, Serbest Liman başvurusu ve tescil takibi Lefkoşa'daki kendi ofisinden yürüyor. Kuruluştan sonra şirketin muhasebesini aynı ofisteki muhasebe ekibi tutuyor. Banka dosyasını Ortac Global hazırlıyor; hesap kararını banka veriyor.",
    },

    { kind: "h2", id: "sss", text: "Sık sorulan sorular" },
    {
      kind: "sss",
      items: [
        {
          q: "KKTC Serbest Liman şirketi nedir?",
          a: "Gazimağusa'daki Serbest Liman ve Bölge'de tescil edilen bir limited şirket. KKTC dışındaki ve Serbest Liman içindeki şirketlere yaptığı işte kurumlar ve gelir vergisi ödemiyor, KDV mükellefi değil. KKTC içine satışında normal vergi uygulanıyor.",
        },
        {
          q: "Serbest Liman şirketi ile KKTC'deki yerel şirketin farkı ne?",
          a: "Yerel şirket KKTC iç piyasası için kuruluyor; yüzde 10 kurumlar vergisi ödüyor, dağıttığı kârdan yüzde 15 kesiliyor. Serbest Liman şirketi KKTC dışına iş yapmak için kuruluyor ve o işte bu vergileri ödemiyor; karşılığında her yıl faaliyet harcı ödüyor.",
        },
        {
          q: "Kıbrıs'ta şirket kurmak ne kadar sürer?",
          a: "KKTC Serbest Liman şirketinde, belgeler tamamlandıktan sonra yaklaşık 30-40 iş günü. Süreyi Serbest Liman yönetiminin ve Bakanlar Kurulu'nun onay takvimi belirliyor.",
        },
        {
          q: "KKTC Serbest Liman şirketini tek kişi kurabilir mi?",
          a: "Hayır. Şirket en az iki ortakla kuruluyor. Ortakların uyruğuna dair bir kısıt yok; Türkiye vatandaşları yabancı ortak sayılıyor.",
        },
        {
          q: "Şirketi kurmak için Kıbrıs'a gitmek gerekiyor mu?",
          a: "Evet, bir kez. Kuruluş belgelerini KKTC'de imzalıyorsunuz ve aynı ziyarette bankada şirketin sermaye hesabını açıyorsunuz. Başvuruyu ve takibi Ortac Global yürütüyor.",
        },
        {
          q: "25.000 € sermaye geri alınıyor mu?",
          a: "Sermaye bir ücret değil, şirketin kendi parası. Yabancı ortağın payı kadarı tescil sırasında bankada bloke ediliyor; tescil belgeleriyle bloke kalkıyor ve tutar şirket hesabında kullanılabiliyor.",
        },
        {
          q: "KKTC Serbest Liman şirketi her yıl ne ödüyor?",
          a: "Ortac Global'in bugünkü fiyatlarıyla yıllık faaliyet harcı 2.700 €, adres ve yasal temsilcilik KDV dahil 2.320 €. Muhasebe aktif şirkette ayda 270 €, pasif şirkette yılda 900 €.",
        },
        {
          q: "Vergi çıkmıyorsa muhasebe tutmak zorunlu mu?",
          a: "Evet. Şirket pasif olsa da yıllık hesapları hazırlanıyor ve beyanı nisan ayında veriliyor. Denetçi raporu gerekmiyor. Ayrıntı [KKTC muhasebe sayfasında](/kktc/muhasebe).",
        },
        {
          q: "KKTC Serbest Liman şirketi KKTC içine satış yapabilir mi?",
          a: "Yapabilir, ama o satış muafiyetin dışında kalıyor: gümrük, KDV ve kurumlar vergisi kuralları uygulanıyor. İşinizin çoğu KKTC içindeyse Serbest Liman şirketi doğru yapı değil.",
        },
        {
          q: "KKTC şirketi oturma izni ya da vize sağlıyor mu?",
          a: "Hayır. Şirket ortağı olmak kendiliğinden oturum hakkı vermiyor; KKTC'de oturup şirketi yönetecek yabancı ortak Çalışma Bakanlığı'ndan ayrıca iş kurma izni alıyor. Ortac Global KKTC'de vize hizmeti vermiyor.",
        },
      ],
    },
  ],

  links: [
    {
      label: "KKTC'de şirket kurmak",
      href: "/kktc",
      line: "Serbest Liman şirketinin adımları, belgeleri ve fiyatın kalemleri.",
    },
    {
      label: "KKTC vergi avantajları",
      href: "/blog/kktc-vergi-avantajlari",
      line: "Yerel şirketin oranları, muafiyetin şartı ve Türkiye tarafı.",
    },
    {
      label: "KKTC'de banka hesabı",
      href: "/kktc/banka-hesabi",
      line: "Hesap açılışı ve KKTC şirketiyle çalışan tahsilat kanalları.",
    },
  ],

  closing: {
    title: "Serbest Liman şirketi işinize uyuyor mu, birlikte bakalım.",
    line: "Müşterinizin nerede olduğunu ve tahsilatı nasıl yapacağınızı ilk görüşmede konuşuyoruz.",
    cta: "İletişime geçin",
  },

  footnote:
    "Bu yazı genel bilgilendirme amaçlıdır; kişiye özel vergi ya da hukuk danışmanlığı değildir. Harçlar, sermaye uygulaması ve fiyatlar değişebilir; Türkiye'deki vergi durumunuz için mali müşavirinize danışın.",
};
