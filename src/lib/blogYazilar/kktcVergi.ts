/* KKTC VERGİ AVANTAJLARI · eski siteden taşınan yazı
   (Search Console, 16 ay: 551 tıklama; "kıbrıs'ta şirket kurmanın
   avantajları" sorgusunda ortalama sıra 1,7).

   ADRES eski sitedekiyle AYNI (/blog/kktc-vergi-avantajlari).

   BAŞLIK sayfanın çıktığı sorgulardan: "kıbrıs'ta şirket kurmanın
   avantajları" ifadesi başlıkta AYNEN duruyor, yanında "kktc vergi" aramaları.

   ESKİ YAZIYLA FARK: eski yazı yerel limited şirketin oranlarını (%10 + %15)
   "avantaj" diye anlatıyor, Serbest Liman'ı hiç anmıyordu. Sitenin duruşu
   tersi: Ortac KKTC'de Serbest Liman ve Bölge şirketi kuruyor, muafiyetin
   şartı var, kuruluş üç ülkenin en pahalısı (teyit KKTC 46) ve şirket kurmak
   kendiliğinden vergi avantajı vermiyor. Eski yazıdaki gelir vergisi
   dilimleri (30.000 TL'lik dilimler, en üst oran %30) eskimişti; 2026
   tablosu en üst oranı %37 veriyor.

   KAYNAK (09.10.2026'da tek tek okundu):
     · Serbest Liman      sliman.gov.ct.tr · Vergi Yükümlülükleri ve Muafiyetler
     · gelir vergisi      vergi.gov.ct.tr · "2026 Yılına Ait Matrah ve Muafiyet
                          Tablosu" (PDF): dilimler ve 655.000 TL kişisel indirim
     · KDV                vergi.gov.ct.tr · 2025 Yılı KDV Oranları Tüzüğü,
                          birleştirilmiş metin 16.09.2026 (Cetvel I-V)
     · kurumlar %10,      docs/kktc-mevzuat.md · 3 (41/1976 md. 23; 24/1982
       stopaj %15         md. 32). Yasa metinleri 22.09.2026'da okunmuştu; bu
                          turda yeniden açılmadı, oran o kayıttan.
     · Türkiye tarafı     docs/kktc-mevzuat.md · 9 (GVK md. 22, 75; KVK md. 3)
   YAZILMAYANLAR: sermaye ve harç tutarları (sitedeki 25.000 € ile Serbest
   Liman sayfasındaki 50.000 € ortaklık yapısına göre ayrışıyor; yazı rakam
   vermeyip /kktc'ye bağlıyor), UİŞ rejimi (Ortac kurmuyor), 88/2026 sayılı
   kararname (geçmiş yıl kârlarına tek seferlik %7,5; kalıcı oran değil),
   arsa tahsisi ve harç muafiyeti gibi teşvikler (bu turda doğrulanmadı).
   09.10.2026 (2) · Burak'ın güncellemesi: yazı uzadı (h3'lü alt bölümler,
   kimler için uygun tablosu, kuruluş adımları, kuruluş sonrası), metin içi
   bağlantı arttı (öteki taşınan yazılar dahil), yazar Murat Ortaç, tarih yeni
   yazı gibi (publishedAt 2026-10-09, updatedAt yok; eski sitedeki tarih
   21.05.2025 idi), yazı içine bir fotoğraf (POST_PHOTO.corpTax).
   Kimler için uygun tablosu countryContent.ts · kktc · fitTable'dan, kuruluş
   adımları ve süreleri aynı dosyanın steps listesinden.
   Ortac'a dair cümleler sitenin KKTC sayfalarından (countryContent.ts · kktc,
   kktcFiyat.ts, accountingKktc.ts). KKTC'de banka adı yazılmıyor. */
import type { BlogPost } from "@/lib/blog";
import { SLUG } from "@/lib/blogTemel";
import { POST_PHOTO } from "@/lib/media";

export const POST_KKTC_VERGI: BlogPost = {
  slug: SLUG.kktcVergi,
  category: "maliyet-ve-vergi",
  title: "KKTC vergi avantajları 2026: Kıbrıs'ta şirket kurmanın avantajları",
  heroAccent: "Kıbrıs'ta şirket kurmanın avantajları",
  summary:
    "KKTC'de vergi oranları, Serbest Liman şirketinin muafiyeti ve şartı, Kıbrıs'ta şirket kurmanın avantajları ile sınırları. 2026 rakamlarıyla.",
  publishedAt: "2026-10-09",
  topic: "Vergi",
  country: "kktc",
  tags: ["KKTC", "Vergi", "Serbest Liman"],
  author: "Murat Ortaç",
  cover: POST_PHOTO.lefkosa,

  seo: {
    title: "Kıbrıs'ta Şirket Kurmanın Avantajları: KKTC Vergileri 2026",
    description:
      "KKTC'de kurumlar vergisi %10, kâr payı stopajı %15. Serbest Liman şirketinde KKTC dışına yapılan iş muaf. Şartlar, sınırlar ve 9.920 € kuruluş maliyeti.",
  },

  sourceNote:
    "Serbest Liman muafiyeti KKTC Serbest Liman ve Bölge Müdürlüğü'nün, gelir vergisi dilimleri ve KDV oranları KKTC Gelir ve Vergi Dairesi'nin yayımladığı metinlerden alınmıştır. Kuruluş maliyeti Ortac Global'in kendi fiyatıdır. Bilgiler 9 Ekim 2026 itibarıyla günceldir.",

  body: [
    {
      kind: "ozet",
      items: [
        "KKTC'de yerel şirket yüzde 10 kurumlar vergisi ödüyor; dağıtılan kârdan ayrıca yüzde 15 kesiliyor.",
        "KKTC Serbest Liman ve Bölge şirketi, KKTC dışına yaptığı işte kurumlar ve gelir vergisi ödemiyor; KKTC içine satışta normal vergi uygulanıyor.",
        "KKTC şirketiyle Stripe, PayPal ve benzeri uluslararası ödeme kuruluşlarında hesap açılmıyor.",
        "Ortac Global'de KKTC Serbest Liman şirketinin kuruluş ve ilk yıl toplamı 9.920 €; üç ülke içinde en yüksek kuruluş maliyeti bu.",
      ],
    },
    {
      kind: "p",
      text: "KKTC'de vergi iki ayrı düzende işliyor: KKTC iç piyasasında çalışan yerel şirketler ve Serbest Liman ve Bölge'de kurulan şirketler. \"Kıbrıs'ta şirket kurmanın avantajları\" diye anlatılanların çoğu ikincisine ait ve bir şarta bağlı. Bu yazı iki düzeni 9 Ekim 2026 itibarıyla geçerli oranlarla anlatıyor. Kıbrıs'ta gündelik hayat ve maliyetler için [KKTC'de yaşam yazımıza](/blog/kktc-yasam-rehberi-kibris-is-firsatlari-maliyetler) bakabilirsiniz.",
    },

    { kind: "h2", id: "oranlar", text: "KKTC'de vergi oranları 2026'da ne kadar?" },
    {
      kind: "p",
      text: "KKTC'de yerel bir limited şirket kazancı üzerinden yüzde 10 kurumlar vergisi ödüyor. Kalan kâr ortaklara dağıtıldığında yüzde 15 gelir vergisi kesiliyor. KKTC'de genel KDV oranı yüzde 16, gelir vergisi yüzde 10 ile yüzde 37 arasında artan oranlı. Aşağıdaki tablo oranları bir arada veriyor; alt bölümler her birini açıyor.",
    },
    {
      kind: "tablo",
      caption: "KKTC'de başlıca vergi oranları · 2026",
      head: ["Vergi", "Oran", "Not"],
      rows: [
        ["Kurumlar vergisi", "%10", "Yerel şirketin kazancı üzerinden"],
        ["Kâr payı stopajı", "%15", "Kurumlar vergisinden sonra kalan kârdan"],
        ["Gelir vergisi", "%10 - %37", "Artan oranlı; yıllık kişisel indirim 655.000 TL"],
        ["KDV", "%16", "Genel oran; ayrıca %0, %5, %10 ve %20"],
        ["Serbest Liman şirketi", "Muaf", "KKTC dışına ve Serbest Liman içine yapılan işte"],
      ],
      foot: "Kurumlar vergisi 41/1976 sayılı Kurumlar Vergisi Yasası'ndan, stopaj 24/1982 sayılı Gelir Vergisi Yasası'ndan. Gelir vergisi dilimleri ve KDV oranları KKTC Gelir ve Vergi Dairesi'nin 2026 metinlerinden.",
    },

    { kind: "h3", text: "KKTC'de yerel şirketin toplam vergi yükü nasıl hesaplanıyor?" },
    {
      kind: "p",
      text: "KKTC'de yerel şirketin 100 birim kâr ettiğini düşünün. Önce yüzde 10 kurumlar vergisi çıkıyor ve 90 birim kalıyor. Bu 90 birimin yüzde 15'i, yani 13,5 birim, kâr payı stopajı olarak kesiliyor. Toplam 23,5 birim vergi ödenmiş oluyor; ortağın eline 76,5 birim geçiyor. \"KKTC'de vergi yüzde 10\" cümlesi bu yüzden eksik: kâr dağıtıldığında toplam yük yüzde 23,5.",
    },
    {
      kind: "gorsel",
      src: POST_PHOTO.corpTax,
      alt: "Masada vergi formları, hesap makinesi ve kalem",
      caption: "KKTC'de yerel şirketin kârı önce kurumlar vergisine, dağıtıldığında kâr payı stopajına giriyor.",
    },

    { kind: "h2", id: "gelir-vergisi", text: "KKTC'de gelir vergisi dilimleri 2026'da nasıl?" },
    {
      kind: "p",
      text: "KKTC'de gelir vergisi artan oranlı ve beş dilimli. [KKTC Gelir ve Vergi Dairesi'nin 2026 tablosuna](https://vergi.gov.ct.tr/sites/default/files/2026%20YILINA%20A%C4%B0T%20MATRAH%20VE%20MUAF%C4%B0YET%20TABLOSU.pdf) göre yıllık kişisel indirim 655.000 TL. Vergi, indirimlerden sonra kalan matraha aşağıdaki oranlarla uygulanıyor.",
    },
    {
      kind: "tablo",
      caption: "KKTC gelir vergisi dilimleri · 2026, yıllık matrah",
      head: ["Matrah dilimi", "Oran"],
      rows: [
        ["İlk 45.000 TL", "%10"],
        ["Sonraki 45.000 TL", "%20"],
        ["Sonraki 120.000 TL", "%25"],
        ["Sonraki 190.000 TL", "%30"],
        ["400.000 TL'den sonrası", "%37"],
      ],
      foot: "Maaş hesabında bu tutarlar yıllık maaş sayısına bölünerek uygulanıyor. Eş ve çocuk indirimleri ayrıca var.",
    },

    { kind: "h3", text: "KKTC'de gelir vergisinde hangi indirimler var?" },
    {
      kind: "p",
      text: "KKTC'de gelir vergisi hesaplanırken matrahtan önce indirimler düşülüyor. 2026 tablosunda kişisel indirim 655.000 TL, birlikte yaşanan eş için indirim 52.400 TL. Çocuk indirimi çocuğun yaşına ve öğrenim durumuna göre 39.300 TL ile 72.050 TL arasında değişiyor. Ücretliler ayrıca safi kazançlarının yüzde 10'u kadar özel indirimden yararlanıyor.",
    },
    {
      kind: "p",
      text: "Bu oranlar KKTC'de yaşayıp orada gelir elde edenleri ilgilendiriyor. Gelir vergisi hiç alınmayan ülkeleri merak ediyorsanız [gelir vergisi olmayan ülkeler yazımıza](/blog/gelir-vergisi-olmayan-ulkeler-2025) bakabilirsiniz; KKTC o listede yer almıyor.",
    },

    { kind: "h2", id: "kdv", text: "KKTC'de KDV oranları kaç?" },
    {
      kind: "p",
      text: "KKTC'de KDV beş oranla uygulanıyor: yüzde 0, 5, 10, 16 ve 20. Genel oran yüzde 16; özel bir cetvelde sayılmayan her mal ve hizmet bu orana giriyor. Yüzde 0 cetvelinde süt, buğday unu ve ekmek, et, bakliyat gibi temel gıdalar ile teşvik belgesine bağlanmış yatırımların makine ve teçhizatı var. Yüzde 20 cetvelinde tütün, alkollü içki, kozmetik ve binek otomobil gibi kalemler bulunuyor.",
    },
    {
      kind: "p",
      text: "KKTC'de KDV oranlarını Bakanlar Kurulu tüzükle belirliyor ve cetveller sık değişiyor: yürürlükteki tüzük yalnız 2026'da yirmiden fazla kez değiştirildi. Bir ürünün oranını kesinleştirmeden önce tüzüğün güncel metnine bakmak gerekiyor.",
    },

    { kind: "h2", id: "serbest-liman", text: "KKTC Serbest Liman şirketinde vergi nasıl işliyor?" },
    {
      kind: "p",
      text: "KKTC Serbest Liman ve Bölge, gümrük hattının dışında sayılan ayrı bir alan. [Serbest Liman ve Bölge Müdürlüğü'nün yayımladığı kurallara](https://sliman.gov.ct.tr/SLBM-%C5%9E%C4%B0RKET-HAK/VERG%C4%B0-Y%C3%9CK%C3%9CML%C3%9CL%C3%9CKLER%C4%B0-VE-MUAF%C4%B0YETLER) göre burada kurulan şirketin bölgedeki faaliyetinden doğan kazancı gelir ve kurumlar vergisinden muaf. Kâr transferi serbest ve KKTC tarafında vergilenmiyor.",
    },
    { kind: "h3", text: "KKTC Serbest Liman muafiyetinin şartı ne?" },
    {
      kind: "p",
      text: "Muafiyetin şartı işin yönü. KKTC iç piyasasına satılan mal ve hizmet muafiyetin dışında kalıyor; o satışta gümrük, KDV ve kazanç vergisi tam uygulanıyor. Aynı şirketin iki müşterisi iki ayrı sonuç doğuruyor:",
    },
    {
      kind: "tablo",
      caption: "KKTC Serbest Liman şirketi: müşteriye göre vergi",
      head: ["Müşteri nerede?", "Kurumlar ve gelir vergisi", "KDV"],
      rows: [
        ["KKTC dışında", "Yok", "Yok"],
        ["Serbest Liman içindeki başka bir şirket", "Yok", "Yok"],
        ["KKTC içindeki yerel şirket", "Normal kurallar", "Uygulanıyor"],
      ],
      foot: "Yıllık faaliyet harcı vergi sayılmıyor; her yıl ödenen sabit bir bedel.",
    },
    { kind: "h3", text: "KKTC Serbest Liman'da gümrük ve KDV nasıl işliyor?" },
    {
      kind: "p",
      text: "KKTC Serbest Liman'dan yurt dışına giden transit mal ve hizmetler gümrük vergisinden ve öteki dolaylı vergilerden muaf. Mal Serbest Liman'dan KKTC iç piyasasına girdiğinde gümrük vergisi ve KDV tam ödeniyor. Mal ticareti yapıp Avrupa Birliği'ne satış planlayanların karşısına ayrıca [EORI numarası](/blog/eori-numarasi-nedir-nasil-alinir) çıkıyor; bu numara AB gümrüğünün aradığı bir kayıt ve KKTC şirketi AB'de tescilli sayılmıyor.",
    },
    {
      kind: "note",
      tone: "warn",
      title: "Şirket kurmak tek başına vergi avantajı vermez",
      text: "KKTC'deki muafiyet şirketin vergisiyle sınırlı; ortağın kişisel vergisine dokunmuyor. Türkiye'de yaşıyorsanız size geçen kâr payı Türkiye'de beyana giriyor. Vergi yükünüzü şirketin ülkesi kadar sizin nerede yaşadığınız ve şirketi nereden yönettiğiniz belirliyor.",
    },

    { kind: "h2", id: "avantajlar", text: "Kıbrıs'ta şirket kurmanın avantajları neler?" },
    {
      kind: "p",
      text: "Kıbrıs'ta şirket kurmanın avantajları, müşterisi KKTC dışında olan ve Serbest Liman şirketi kuranlar için şöyle sıralanıyor:",
    },
    {
      kind: "list",
      items: [
        "Vergi: KKTC dışına ve Serbest Liman içine yapılan işte kurumlar ve gelir vergisi yok, şirket KDV mükellefi değil.",
        "TL ve döviz hesabı: KKTC bankasında kurumsal hesap TL ve dövizle açılıyor; Türkiye'deki müşteriden TL ödeme alınabiliyor.",
        "Serbest transfer: KKTC'de döviz bulundurmak ve yurt dışına para göndermek serbest.",
        "Yakınlık: dil ve saat dilimi Türkiye'yle aynı, hukuk ve ticari pratik tanıdık.",
      ],
    },
    {
      kind: "p",
      text: "KKTC en çok yurt dışına hizmet satan, transit ticaret yapan ya da şirketinde TL hesaba ihtiyaç duyan işlere uyuyor. Hangi işin hangi şartla uyduğu [KKTC vergi sayfasında](/kktc/vergi) ayrıntılı duruyor.",
    },

    { kind: "h2", id: "kime-uygun", text: "KKTC Serbest Liman şirketi kimler için uygun?" },
    {
      kind: "p",
      text: "KKTC Serbest Liman şirketinin uygun olup olmadığını müşterinizin yeri ve tahsilat kanalınız belirliyor. Aşağıdaki tablo en sık karşılaşılan durumları özetliyor.",
    },
    {
      kind: "tablo",
      caption: "KKTC Serbest Liman şirketi hangi işe uyuyor?",
      head: ["Durumunuz", "Uygun mu?", "Neden"],
      rows: [
        ["Malınız Serbest Liman'dan yurt dışına gidiyor", "Evet", "Bölgedeki kazanç vergiden ve gümrükten muaf"],
        ["Yurt dışındaki müşterilere hizmet veriyorsunuz", "Evet", "KKTC dışındaki işte kurumlar ve gelir vergisi yok, KDV yok"],
        ["Şirketinizin TL hesaba ihtiyacı var", "Evet", "KKTC bankasında hesap TL ve dövizle açılıyor"],
        ["Türkiye'de yaşayıp şirketi oradan yöneteceksiniz", "Şartla", "Kâr payı Türkiye'de beyan ediliyor; yönetim yeri riski var"],
        ["Amazon ya da Etsy'de satacaksınız", "Hayır", "Satıcı ülke listelerinde KKTC yok"],
        ["Kart tahsilatını Stripe ile yapacaksınız", "Hayır", "Stripe'ın ülke listesinde KKTC yok"],
        ["KKTC içindeki yerel şirkete satacaksınız", "Hayır", "Bu satışta normal vergi uygulanıyor"],
      ],
    },

    { kind: "h2", id: "sinirlar", text: "KKTC'de şirket kurmanın sınırları neler?" },
    {
      kind: "p",
      text: "KKTC'de şirket kurmanın dezavantajları çoğunlukla tahsilat ve tanınırlık tarafında çıkıyor. Karar vermeden önce şunları bilmek gerekiyor:",
    },
    {
      kind: "list",
      items: [
        "Stripe, PayPal, Payoneer, Shopify Payments, Amazon ve Etsy KKTC şirketiyle hesap açmıyor. Kartla tahsilat yerel sanal POS'la, kalan tahsilat banka havalesiyle yapılıyor.",
        "KKTC Avrupa Birliği üyesi değil ve Güney Kıbrıs ile aynı ülke değil. AB'de tescilli şirket isteyen platform ve sözleşmelerde KKTC şirketi kullanılamıyor.",
        "Serbest Liman şirketi en az iki ortakla kuruluyor; tek kişiyle kurulamıyor.",
        "İmza ve banka hesabı için bir kez KKTC'ye gitmek gerekiyor.",
        "Vergi çıkmasa da muhasebe zorunlu: şirket her yıl bilançosunu ve yıllık raporlarını veriyor.",
      ],
    },
    {
      kind: "p",
      text: "Satışını Amazon, Etsy ya da Stripe üzerinden yapan [e-ticaret işleri](/sektorler/e-ticaret) için bu yüzden [İngiltere](/ingiltere) ya da [Dubai](/dubai) daha uygun çıkıyor. Üç ülkenin farkı [ülke karşılaştırmasında](/ulkeler) yan yana duruyor. Dubai tarafında hangi işlerin kurulduğunu [Dubai'de iş fikirleri yazımızda](/blog/dubai-is-fikirleri-en-karlı-is-imkanlari) anlattık.",
    },
    { kind: "h3", text: "KKTC'de sermaye bloke mi kalıyor?" },
    {
      kind: "p",
      text: "Türkiye vatandaşları KKTC'de yabancı ortak sayılıyor. Serbest Liman şirketinde yabancı ortağın payı kadar sermaye, tescil sırasında KKTC'deki bankada bloke ediliyor. Bu para kimseye ödenmiyor: şirket tescil belgeleriyle bankaya başvurulunca bloke kalkıyor ve tutar şirket hesabında kullanılabiliyor. Sermaye tutarı ortaklık yapısına göre değişiyor; güncel rakam [KKTC sayfasında](/kktc) yazıyor.",
    },

    { kind: "h2", id: "turkiye", text: "Türkiye'de yaşıyorsanız KKTC şirketinin vergisi nerede doğuyor?" },
    {
      kind: "p",
      text: "KKTC Serbest Liman şirketinin kârı şirkette kalıp şirketin işine harcandıkça KKTC'de vergi doğmuyor. Türkiye'de yaşayan ortak için vergi, kâr kendisine kâr payı olarak geçtiğinde gündeme geliyor: yurt dışındaki şirketten alınan kâr payı Türkiye'de gelir vergisi beyanına giriyor. Şirketin sermayesinin en az yarısına sahipseniz ve kâr payını beyanname tarihine kadar Türkiye'ye getirirseniz yarısı vergiden istisna.",
    },
    {
      kind: "p",
      text: "İkinci konu yönetim yeri. İşleri fiilen Türkiye'de toplanıp yönetilen bir şirket Türkiye'de kurumlar vergisi mükellefi sayılabiliyor. Türkiye ile KKTC arasında 1989'dan beri uygulanan bir çifte vergilendirmeyi önleme anlaşması var. Bu başlıklar kişiye göre değişiyor; kuruluştan önce kendi mali müşavirinizle konuşmanız gerekiyor.",
    },

    { kind: "h2", id: "maliyet", text: "KKTC'de şirket kurmak ne kadar tutuyor?" },
    {
      kind: "p",
      text: "Ortac Global'de KKTC Serbest Liman şirketinin kuruluş ve ilk yıl toplamı 9.920 €. Bu rakam Ortac Global'in kendi fiyatı; piyasa ortalaması değil. Kalemlerin hepsi zorunlu ve Ortac Global'in çalıştığı üç ülke içinde en yüksek kuruluş maliyeti KKTC'de.",
    },
    {
      kind: "tablo",
      caption: "KKTC Serbest Liman şirketi · kuruluş ve ilk yıl (Ortac Global fiyatı)",
      head: ["Kalem", "Tutar"],
      rows: [
        ["Şirket kuruluşu", "4.900 €"],
        ["Serbest Bölge yıllık faaliyet harcı", "2.700 €"],
        ["Kayıtlı adres ve yasal temsilcilik (yıllık)", "2.000 €"],
        ["Adres ve temsilcilik üzerinden KDV (%16)", "320 €"],
        ["Toplam", "9.920 €"],
      ],
      foot: "Muhasebe bu toplamın içinde değil: aktif şirkette ayda 270 €, pasif şirkette yılda 900 €. Süre, belgeler tamamlandıktan sonra yaklaşık 30-40 iş günü.",
    },
    { kind: "h2", id: "adimlar", text: "KKTC'de Serbest Liman şirketi nasıl kuruluyor?" },
    {
      kind: "p",
      text: "KKTC'de Serbest Liman şirketinin kuruluşu iki onaydan geçiyor: önce Serbest Liman yönetimi, sonra Bakanlar Kurulu. Ortac Global'in yürüttüğü kuruluşlarda adımlar ve tipik süreler şöyle:",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "Şirket ismi: iki üç alternatif belirleniyor, isim uygunluğu kontrol ediliyor. Tipik süre 3 iş günü.",
        "Belgeler ve imza: kuruluş belgeleri hazırlanıyor, imza için KKTC'ye geliyorsunuz. Tipik süre 3 iş günü.",
        "Sermaye hesabı: imza gününde bankada şirketin sermaye hesabını açıyorsunuz.",
        "Serbest Liman onayı: başvuru değerlendirilip Bakanlar Kurulu'na iletiliyor. Tipik süre 10 iş günü.",
        "Bakanlar Kurulu onayı ve tescil: tipik süre 14 iş günü.",
        "Tescil belgeleri çıkıyor ve banka hesabı kullanıma açılıyor.",
      ],
    },
    {
      kind: "p",
      text: "Sürelerin toplamı en az 30 iş günü ediyor; onay makamlarının takvimine göre 40 iş gününe uzayabiliyor. Banka hesabının açılıp açılmayacağına banka kendi incelemesiyle karar veriyor.",
    },

    { kind: "h2", id: "kurulus-sonrasi", text: "KKTC şirketinde kuruluştan sonra hangi yükümlülükler var?" },
    {
      kind: "p",
      text: "KKTC Serbest Liman şirketi vergi ödemese de kayıt tutmak ve beyan vermek zorunda. Şirket her yıl bilançosunu ve yıllık raporlarını ilgili mercilere veriyor; yıllık faaliyet harcını da her yıl ödüyor. Şirketi kapatmak isterseniz gönüllü tasfiye için önce bütün bilanço ve raporların verilmiş olması gerekiyor.",
    },
    {
      kind: "p",
      text: "Muhasebe tarafında şirketin iki hâli var. Banka hesabı açılmış ve ticari faaliyeti olan şirket aktif sayılıyor ve kaydı her ay tutuluyor. Banka hesabı ve o dönemde ticari işlemi olmayan şirket pasif sayılıyor; pasif şirketin de yıllık hesapları hazırlanıyor ve beyanları veriliyor. Ayrıntı [KKTC muhasebe sayfasında](/kktc/muhasebe) duruyor.",
    },

    {
      kind: "note",
      tone: "info",
      title: "Ortac Global bu konuda ne yapıyor?",
      text: "Ortac Global KKTC'de Serbest Liman ve Bölge şirketi kuruyor: isim kontrolü, kuruluş belgeleri, Serbest Liman başvurusu ve tescil takibi Lefkoşa'daki ofisinden yürüyor. Kuruluştan sonra şirketin muhasebesini aynı ekip tutuyor. Banka hesabı için dosyayı Ortac Global hazırlıyor; hesap kararını banka veriyor.",
    },
    {
      kind: "p",
      text: "Kuruluş adımları ve belgeler [KKTC'de şirket kurma sayfasında](/kktc), hesap açılışı ve çalışan tahsilat kanalları [KKTC banka hesabı sayfasında](/kktc/banka-hesabi), yıllık yükümlülükler [KKTC muhasebe sayfasında](/kktc/muhasebe) yazıyor. İşinize hangi ülkenin uyduğunu [uygunluk testinde](/uygunluk-testi) deneyebilir ya da [bize yazabilirsiniz](/iletisim).",
    },

    { kind: "h2", id: "sss", text: "Sık sorulan sorular" },
    {
      kind: "sss",
      items: [
        {
          q: "Kıbrıs'ta şirket kurmanın avantajları nelerdir?",
          a: "KKTC Serbest Liman şirketi, KKTC dışına ve Serbest Liman içine yaptığı işte kurumlar ve gelir vergisi ödemiyor, KDV mükellefi değil. Banka hesabı TL ve dövizle açılıyor, para transferi serbest. Sınırı: uluslararası ödeme kuruluşları KKTC şirketiyle çalışmıyor.",
        },
        {
          q: "KKTC'de kurumlar vergisi yüzde kaç?",
          a: "KKTC'de yerel şirketler için kurumlar vergisi yüzde 10. Dağıtılan kârdan ayrıca yüzde 15 kesildiği için toplam yük yüzde 23,5. Serbest Liman şirketinde KKTC dışına yapılan iş bu vergiden muaf.",
        },
        {
          q: "KKTC'de şirket kurarsam hiç vergi ödemez miyim?",
          a: "Hayır, böyle bir garanti yok. Muafiyet yalnız KKTC dışına ve Serbest Liman içine yapılan iş için. KKTC içine satışta normal vergi uygulanıyor; Türkiye'de yaşıyorsanız size geçen kâr payı da Türkiye'de beyan ediliyor.",
        },
        {
          q: "KKTC'de KDV oranı kaç?",
          a: "KKTC'de genel KDV oranı yüzde 16. Bunun yanında yüzde 0, 5, 10 ve 20 oranları var; hangi mal ve hizmetin hangi orana girdiğini Bakanlar Kurulu tüzükle belirliyor.",
        },
        {
          q: "KKTC şirketiyle Stripe ya da PayPal kullanabilir miyim?",
          a: "Hayır. Stripe, PayPal, Payoneer, Shopify Payments, Amazon ve Etsy KKTC şirketiyle hesap açmıyor. Kartla tahsilat yerel sanal POS'la yapılıyor ve ödemeler KKTC'deki şirket hesabına geliyor. Ayrıntı [KKTC banka hesabı sayfasında](/kktc/banka-hesabi).",
        },
        {
          q: "KKTC'de şirket kurmak ne kadar sürer ve ne kadar tutar?",
          a: "Ortac Global'de KKTC Serbest Liman şirketinin kuruluş ve ilk yıl toplamı 9.920 €. Süre, belgeler tamamlandıktan sonra yaklaşık 30-40 iş günü. Muhasebe ayrıca ücretlendiriliyor.",
        },
        {
          q: "KKTC şirketi Güney Kıbrıs şirketiyle aynı şey mi?",
          a: "Hayır. Güneydeki Kıbrıs Cumhuriyeti ayrı bir ülke ve Avrupa Birliği üyesi; KKTC AB üyesi değil. Ödeme kuruluşlarının ülke listelerinde geçen \"Cyprus\" güneyi anlatıyor.",
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
      label: "KKTC vergi çerçevesi",
      href: "/kktc/vergi",
      line: "Muafiyetin şartı ve hangi işin KKTC'ye uyduğu.",
    },
    {
      label: "KKTC'de muhasebe",
      href: "/kktc/muhasebe",
      line: "Vergi çıkmasa da her yıl verilen bilanço ve raporlar.",
    },
  ],

  closing: {
    title: "KKTC işinize uyuyor mu, birlikte bakalım.",
    line: "Müşterinizin nerede olduğunu ve tahsilatı nasıl yapacağınızı ilk görüşmede konuşuyoruz.",
    cta: "İletişime geçin",
  },

  footnote:
    "Bu yazı genel bilgilendirme amaçlıdır; kişiye özel vergi ya da hukuk danışmanlığı değildir. Oranlar ve cetveller yıl içinde değişebilir; Türkiye'deki vergi durumunuz için mali müşavirinize danışın.",
};
