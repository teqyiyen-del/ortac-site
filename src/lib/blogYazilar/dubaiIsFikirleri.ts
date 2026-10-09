/* DUBAİ'DE NE İŞ YAPILIR · eski sitenin Dubai tarafında en çok trafik alan yazısı
   (Search Console, 16 ay: 3.225 tıklama).

   ADRES: eski sitedekiyle AYNI, içindeki Türkçe "ı" dahil
   (/blog/dubai-is-fikirleri-en-karlı-is-imkanlari). Google'daki sıra korunsun
   diye dokunulmadı.

   BAŞLIK sayfanın gerçekten çıktığı sorgulardan kuruldu: "dubai'de ne iş
   yapılır", "dubai'de ne iş yapabilirim", "dubai iş imkanları", "dubai iş
   fırsatları", "dubai'de türkler ne iş yapıyor", "dubai'de en çok kazandıran
   meslekler", "dubai iş ilanları". Son iki sorgu çalışan tarafı; onlara ayrı
   bir bölüm ve iki SSS sorusu ayrıldı.

   TARİH VE YAZAR (Burak, 09.10.2026): yazı baştan yazıldığı için yeni yazı
   gibi çıkıyor: publishedAt bugünün tarihi, updatedAt yok, yazar Murat Ortaç.
   Uzunluk hedefi 1.400-2.000 kelime, metin içinde en az 8-10 site içi bağlantı.

   ESKİ YAZIDAN ALINMAYANLAR (yeni duruşla çelişiyor ya da kaynağı yok):
     · "en kârlı", "yüksek kazanç", "ciddi gelir" türü vaatler ve "vergi
       avantajı" girişi: sitenin duruşu "şirket kurmak otomatik vergi avantajı
       vermez".
     · otuza yakın iş fikri (glamping, concierge, yat kiralama, güneş paneli …):
       hiçbirinin talep ya da kârlılık verisi yoktu. Yerine sektör tablosu ve
       her sektörün hangi izne bağlı olduğu geldi.
     · "şirket kuran 5-10 yıllık oturum alır" (yanlış: şirket üzerinden oturum
       1-3 yıl; 5/10 yıl altın vizenin ayrı şartları).

   KAYNAK (09.10.2026'da tek tek okundu):
     · kurumlar vergisi    u.ae · Corporate tax (375.000 AED'ye kadar %0, üstü %9)
     · KDV, gelir vergisi  u.ae · Taxation (%5; bireyden gelir vergisi alınmıyor)
     · KDV kaydı           tax.gov.ae · Registration for VAT (375.000 / 187.500 AED)
     · yabancı ortaklık    u.ae · Full foreign ownership of commercial companies
     · yeni şirketler      Dubai Ticaret Odası 2025 açıklaması (mediaoffice.ae,
                           17.02.2026): 71.830 yeni üye, Türkiye 9. sıra, 1.308
     · ziyaretçi           Dubai Ekonomi ve Turizm Dairesi (DET), 2025: 19,59 mn
     · nüfus               Dubai Veri ve İstatistik Kurumu, 28.09.2026: 4.807.185
     · tatil evi izni      dubaidet.gov.ae · Holiday homes
     · çalışma vizesi      u.ae · Work visa; izinsiz çalışma: u.ae · Tips to
                           avoid labour and visa fraud
   BİLEREK YAZILMAYANLAR: meslek başına maaş (resmî tablo bulunamadı), Ticaret
   Odası'nın sektör yüzdeleri (kaynakta toplamı 100'ü aşıyor; yalnız sıra
   yazıldı), serbest bölge şirketinin mainland'e satış kuralları (doğrulanmadı),
   kuruluş süresi (sitede iki ayrı rakam var), kur çevirisi.
   Ortac'a dair cümleler sitenin Dubai, vize, banka ve sektör sayfalarından. */
import type { BlogPost } from "@/lib/blog";
import { SLUG } from "@/lib/blogTemel";
import { GUIDE_PHOTO, POST_PHOTO } from "@/lib/media";

export const POST_DUBAI_IS_FIKIRLERI: BlogPost = {
  slug: SLUG.dubaiIsFikirleri,
  category: "ulke-rehberi",
  title: "Dubai'de ne iş yapılır? 2026 iş fikirleri ve iş imkanları",
  heroAccent: "2026 iş fikirleri ve iş imkanları",
  summary:
    "Dubai'de hangi işler kuruluyor, hangileri ek izin istiyor, Türkler ne iş yapıyor ve iş kurmanın vergisi ile maliyeti ne kadar.",
  publishedAt: "2026-10-09",
  topic: "İş fikirleri",
  country: "dubai",
  tags: ["Dubai", "İş fikirleri", "Şirket kuruluşu"],
  author: "Murat Ortaç",
  cover: POST_PHOTO.dubaiMerkez,

  seo: {
    title: "Dubai'de Ne İş Yapılır? 2026 İş Fikirleri ve İmkanları",
    description:
      "Dubai'de ne iş yapılır: e-ticaret, yazılım, danışmanlık, turizm, gayrimenkul. Hangi iş hangi izni istiyor, Türkler ne iş yapıyor, vergi ve maliyet.",
  },

  sourceNote:
    "Vergi ve vize bilgileri BAE resmî portalı (u.ae) ile Federal Vergi Kurumu'ndan (tax.gov.ae), şirket, ziyaretçi ve nüfus sayıları Dubai Ticaret Odası, Dubai Ekonomi ve Turizm Dairesi ile Dubai Veri ve İstatistik Kurumu'nun açıklamalarından alınmıştır. Bilgiler 9 Ekim 2026 itibarıyla günceldir.",

  body: [
    {
      kind: "ozet",
      items: [
        "Dubai'de yeni kurulan şirketlerin çoğu iş hizmetleri, gayrimenkul ve ticaret alanında; 2025'te Dubai Ticaret Odası'na 71.830 yeni şirket üye oldu.",
        "Aynı yıl 1.308 yeni Türk şirketi odaya kaydoldu; Türkiye yabancı ülkeler arasında dokuzuncu sırada.",
        "Turizm, gayrimenkul komisyonculuğu, sağlık ve finans işleri ticari lisansın yanında ayrı bir kurum izni istiyor.",
        "Dubai'de kurumlar vergisi 375.000 AED'ye kadar %0, üstü %9; şirket kurmak tek başına vergi avantajı anlamına gelmiyor.",
      ],
    },
    {
      kind: "p",
      text: "Dubai'de ne iş yapılır sorusunun cevabı, işi kimin için ve nereden yürüteceğinize göre değişiyor. Bu yazı Dubai'de en çok kurulan iş alanlarını, hangilerinin ek izin gerektirdiğini, Türk girişimcilerin tablosunu, vergi ve kuruluş maliyetini bir arada veriyor. Çalışan olarak iş arayanlar için de ayrı bir bölüm var. Bilgiler 9 Ekim 2026 itibarıyla güncel.",
    },

    { kind: "h2", id: "ne-is-yapilir", text: "Dubai'de ne iş yapılır?" },
    {
      kind: "p",
      text: "Dubai'de en çok şirket kurulan alanları Dubai Ticaret Odası'nın üye kayıtları gösteriyor. Odaya 2025'te 71.830 yeni şirket üye oldu. Sektör sıralamasında ilk sırayı gayrimenkul, kiralama ve iş hizmetleri aldı; danışmanlık, ajans ve yazılım şirketleri bu başlığın içinde. İkinci sırada toptan ve perakende ticaret, üçüncü sırada inşaat var. [Rakamlar Dubai Medya Ofisi'nin açıklamasında](https://cd1.mediaoffice.ae/en/news/2026/february/17-02/dubai-chamber-of-commerce-2025) yer alıyor.",
    },
    {
      kind: "p",
      text: "Dubai'de iş imkanlarını büyüten iki rakam daha var. Dubai Veri ve İstatistik Kurumu'nun açıkladığı nüfus 28 Eylül 2026'da 4,8 milyonu geçti. Dubai Ekonomi ve Turizm Dairesi'nin verisine göre şehir 2025'te 19,59 milyon uluslararası konaklamalı ziyaretçi ağırladı; bir önceki yıl bu sayı 18,72 milyondu. Perakende, yeme içme, konaklama ve kişisel hizmet işleri bu iki kitleye satış yapıyor.",
    },
    {
      kind: "tablo",
      caption: "Dubai'de sık kurulan iş alanları ve bağlı oldukları izinler",
      head: ["İş alanı", "Örnek işler", "Ticari lisansın yanında gereken"],
      rows: [
        ["E-ticaret ve ticaret", "Çevrim içi mağaza, ithalat ve ihracat, toptan satış", "Çoğu üründe ek izin yok; ürüne göre değişir"],
        ["Yazılım ve dijital hizmet", "Yazılım geliştirme, dijital ajans, tasarım", "Ek izin yok"],
        ["Danışmanlık", "Yönetim, pazarlama, insan kaynakları danışmanlığı", "Çoğu dalda ek izin yok"],
        ["Turizm ve konaklama", "Tatil evi işletmesi, tur düzenleme", "Dubai Ekonomi ve Turizm Dairesi izni"],
        ["Gayrimenkul", "Satış ve kiralama komisyonculuğu", "RERA lisansı ve çalışan kartı"],
        ["Sağlık", "Klinik, laboratuvar, evde bakım", "Dubai Sağlık Otoritesi (DHA) lisansı"],
        ["Finans ve yatırım", "Ödeme hizmeti, yatırım danışmanlığı, fon yönetimi", "Merkez Bankası, SCA ya da DFSA izni"],
      ],
      foot: "Tablo genel çerçeveyi gösterir. Hangi faaliyetin hangi izne girdiği lisansa yazılan faaliyet tanımına ve şirketin kurulduğu yere göre belirlenir.",
    },

    { kind: "h2", id: "is-fikirleri", text: "Dubai'de hangi iş fikirleri öne çıkıyor?" },
    {
      kind: "p",
      text: "Dubai'de iş fikirleri iki gruba ayrılıyor: yalnız ticari lisansla başlanabilenler ve bir düzenleyici kurumun iznine bağlı olanlar. Aşağıdaki altı başlık, Türkiye'den Dubai'ye bakan girişimcilerin en sık sorduğu alanları bu ayrımla ele alıyor.",
    },
    { kind: "h3", text: "Dubai'de e-ticaret ve ticaret" },
    {
      kind: "p",
      text: "Dubai'de e-ticaret şirketi, yurt dışındaki müşteriden kartla tahsilat yapmak ve ödemeyi dolar ya da dirhem hesabında toplamak isteyenlerin başvurduğu bir yapı. Dubai şirketiyle Stripe, PayPal, Amazon Payment Services ve Network International üzerinden tahsilat kurulabiliyor. Fiziksel ürün satıyorsanız depo, gümrük ve KDV kaydı planın parçası oluyor. Avrupa Birliği'ne mal gönderecekler için [EORI numarası rehberi](/blog/eori-numarasi-nedir-nasil-alinir) gümrük tarafını anlatıyor. Şirketin kurgusu [e-ticaret sektör sayfasında](/sektorler/e-ticaret).",
    },
    { kind: "h3", text: "Dubai'de yazılım ve dijital hizmetler" },
    {
      kind: "p",
      text: "Dubai'de yazılım geliştirme, dijital ajans ve tasarım işleri ek izin gerektirmeyen faaliyetler arasında. Müşterisi yurt dışında olan ve işini uzaktan yürüten ekipler bu işleri çoğunlukla serbest bölge şirketiyle yapıyor. Ekibinizi Dubai'ye taşıyacaksanız çalışan vizesi kotası kuruluşta planlanıyor, çünkü kotayı lisans paketi ve ofis tipi belirliyor. Ayrıntı [yazılım ve teknoloji sayfasında](/sektorler/yazilim-ve-teknoloji).",
    },
    { kind: "h3", text: "Dubai'de danışmanlık" },
    {
      kind: "p",
      text: "Dubai'de yönetim, pazarlama ve insan kaynakları danışmanlığı ticari lisansla yürütülebiliyor. Yatırım danışmanlığı gibi finans düzenlemesine giren dallar ayrı değerlendiriliyor. Danışmanlık şirketinde kararı çoğunlukla kârın nasıl vergilendiği ve müşterinin hangi ülkede olduğu belirliyor. Kurgu [danışmanlık sektör sayfasında](/sektorler/danismanlik) anlatılıyor.",
    },
    { kind: "h3", text: "Dubai'de turizm ve tatil evi işletmesi" },
    {
      kind: "p",
      text: "Dubai'de kısa süreli kiralama izne bağlı bir iş. Kiraya verilecek her daire ve villa, ilana çıkmadan önce Dubai Ekonomi ve Turizm Dairesi'ne kaydedilip onaylanıyor ve her birim için ayrı izin alınıyor. İşletmeci şirketin lisansında tatil evi kiralama faaliyeti bulunması gerekiyor. Kiracı olduğunuz bir evi bu şekilde kiraya vermek için mal sahibinin yazılı muvafakati isteniyor. [Kurallar dairenin sayfasında](https://www.dubaidet.gov.ae/en/our-services/for-consumers-and-students/apply-for-a-holiday-home-permit).",
    },
    { kind: "h3", text: "Dubai'de gayrimenkul" },
    {
      kind: "p",
      text: "Dubai'de gayrimenkul işi iki ayrı faaliyet demek. Kendi mülkünüzü şirket altında tutmak bir yatırım yapısı. Başkasının mülkünü satmak ya da kiraya vermek ise komisyonculuk ve Dubai Tapu Dairesi'ne bağlı RERA'nın lisansını, çalışanlar için de komisyoncu kartını gerektiriyor. Faaliyet tanımı kuruluşta bu ayrıma göre yazılıyor. İki yapının farkı [gayrimenkul sektör sayfasında](/sektorler/gayrimenkul).",
    },
    { kind: "h3", text: "Dubai'de sağlık ve finans" },
    {
      kind: "p",
      text: "Dubai'de klinik, laboratuvar ve evde bakım gibi sağlık tesisleri, Dubai Healthcare City serbest bölgesi dışında, Dubai Sağlık Otoritesi (DHA) lisansıyla çalışıyor; sağlık çalışanları ayrıca mesleki lisans alıyor. Finans işlerinde izin faaliyetin türüne ve yerine göre Merkez Bankası'ndan, Menkul Kıymetler ve Emtia Kurumu'ndan (SCA) ya da DIFC'de DFSA'dan çıkıyor. İki alanda da şirketin yeri izinle birlikte seçiliyor. Ayrıntılar [sağlık ve medikal](/sektorler/saglik-ve-medikal) ile [finans ve yatırım](/sektorler/finans-ve-yatirim) sayfalarında.",
    },

    { kind: "h2", id: "turkler", text: "Dubai'de Türkler ne iş yapıyor?" },
    {
      kind: "p",
      text: "Dubai'de Türk girişimcilerin sayısı resmî kayıtlarda görülüyor. Dubai Ticaret Odası'na 2025'te 1.308 yeni Türk şirketi üye oldu ve Türkiye, yabancı ülkeler arasında dokuzuncu sırada yer aldı. 2024'te bu sayı 1.314'tü. Oda, Türk şirketlerinin sektörlere dağılımını ayrıca yayımlamıyor; bu yüzden hangi işin daha çok kurulduğuna dair kesin bir oran vermek mümkün değil.",
    },
    {
      kind: "tablo",
      caption: "Dubai Ticaret Odası'na 2025'te üye olan yeni şirketler, ülkeye göre",
      head: ["Sıra", "Ülke", "Yeni şirket"],
      rows: [
        ["1", "Hindistan", "18.486"],
        ["2", "Pakistan", "9.138"],
        ["3", "Mısır", "5.043"],
        ["4", "Birleşik Krallık", "2.733"],
        ["9", "Türkiye", "1.308"],
      ],
      foot: "Kaynak: Dubai Ticaret Odası'nın 2025 yılı açıklaması (Dubai Medya Ofisi, 17 Şubat 2026). Toplam yeni üye 71.830.",
    },
    {
      kind: "p",
      text: "Ortac Global'in Dubai'de şirket kuruluşunda ayrı sayfa açtığı altı sektör yukarıdaki başlıklarla aynı: e-ticaret, yazılım, danışmanlık, gayrimenkul, finans ve sağlık. Dubai'yi başka bir ülkeyle kıyaslamak isteyenler [ülke karşılaştırması](/ulkeler) sayfasında Dubai, İngiltere ve KKTC'yi yan yana görebilir.",
    },

    { kind: "h2", id: "serbest-bolge", text: "Dubai'de iş kurarken serbest bölge mi, mainland mi?" },
    {
      kind: "p",
      text: "Dubai'de şirket iki yerde kurulabiliyor: bir serbest bölgede ya da serbest bölgelerin dışında kalan ve mainland denen alanda. Mainland'de 2021'den beri çoğu faaliyette şirketin tamamı yabancı ortağa ait olabiliyor; savunma, bankacılık, sigorta ve telekomünikasyon gibi alanlar bunun dışında. [Liste BAE resmî portalında](https://u.ae/en/information-and-services/business/Doing-business/doing-business-on-the-mainland/full-foreign-ownership-of-commercial-companies) duruyor.",
    },
    {
      kind: "p",
      text: "Hangisinin uygun olduğunu müşterinizin nerede olduğu ve işin izin durumu belirliyor. Müşterisi yurt dışında olan e-ticaret, yazılım ve danışmanlık işleri çoğunlukla serbest bölgede kuruluyor. Ortac Global Dubai'de IFZA, Meydan ve DWTC serbest bölgeleriyle çalışıyor.",
    },
    {
      kind: "gorsel",
      src: GUIDE_PHOTO.dubaiIsler,
      alt: "Açık plan, boş bir modern ofis katı; solda ahşap raf, sağda camlı bölmeler",
      caption: "Serbest bölgelerde ofis tipi, şirketin alabileceği vize sayısını da etkiliyor.",
    },
    {
      kind: "note",
      tone: "warn",
      title: "Faaliyet tanımı kuruluşta yazılıyor",
      text: "Dubai'de şirket yalnız lisansında yazan işi yapabiliyor. Planladığınız işin hangi faaliyet koduna girdiğini kuruluştan önce netleştirmek gerekiyor.",
    },
    {
      kind: "p",
      text: "Planladığınız işin kodunu [IFZA faaliyet kodu aracında](/araclar/ifza-faaliyet-kodu) arayabilir, serbest bölgelerin farkını [Dubai'de şirket kurma sayfasında](/dubai) görebilirsiniz.",
    },

    { kind: "h2", id: "adimlar", text: "Dubai'de iş kurmak hangi adımlardan geçiyor?" },
    {
      kind: "p",
      text: "Dubai'de iş kurmak, şirketin tescilinden banka hesabına uzanan birkaç adımdan oluşuyor. Tescil uzaktan tamamlanabiliyor; vize ve biyometri için bir kez BAE'ye gelmeniz gerekiyor.",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "Faaliyet ve serbest bölge seçimi: işin lisansta hangi faaliyetle yazılacağı ve kaç vize gerektiği belirleniyor.",
        "Tescil ve lisans: şirket kuruluyor, ticari lisans düzenleniyor.",
        "Vize ve Emirates ID: sağlık kontrolü ve biyometri BAE'de yapılıyor. Adımlar [Dubai vize ve oturum sayfasında](/dubai/oturum-vize).",
        "Banka hesabı: Wio, Mashreq, Emirates NBD ve FAB gibi bankalara kurumsal hesap başvurusu yapılıyor; kararı banka veriyor. Süreç [Dubai banka hesabı sayfasında](/dubai/banka-hesabi).",
        "Muhasebe ve beyan: defter tutma ve beyan yükümlülüğü ilk günden başlıyor. Takvim [Dubai muhasebe sayfasında](/dubai/muhasebe).",
      ],
    },

    { kind: "h2", id: "vergi-maliyet", text: "Dubai'de iş kurmanın vergisi ve maliyeti ne kadar?" },
    {
      kind: "p",
      text: "Dubai'de şirketler net kâr üzerinden kurumlar vergisi ödüyor: vergiye tabi gelirin 375.000 AED'ye kadar olan kısmında oran %0, üstünde %9. KDV oranı %5; vergiye tabi satışları son 12 ayda 375.000 AED'yi aşan şirketin KDV kaydı yaptırması zorunlu. BAE bireylerden gelir vergisi almıyor, yani maaş üzerinden gelir vergisi kesilmiyor. Oranlar [BAE resmî portalının vergi sayfasında](https://u.ae/en/information-and-services/finance-and-investment/taxation) yazılı.",
    },
    {
      kind: "tablo",
      caption: "Dubai'de şirketin karşılaştığı vergiler · 2026",
      head: ["Vergi", "Oran", "Ne zaman doğuyor"],
      rows: [
        ["Kurumlar vergisi", "%0", "Vergiye tabi gelirin 375.000 AED'ye kadar olan kısmı"],
        ["Kurumlar vergisi", "%9", "375.000 AED'nin üstündeki kısım"],
        ["KDV", "%5", "Kayıt, 12 aylık satış 375.000 AED'yi aşınca zorunlu"],
        ["Bireyden gelir vergisi", "Yok", "Maaş üzerinden gelir vergisi alınmıyor"],
      ],
      foot: "KDV'de gönüllü kayıt eşiği 187.500 AED. Kaynak: u.ae ve Federal Vergi Kurumu (tax.gov.ae).",
    },
    { kind: "h3", text: "Dubai şirketi Türkiye'deki vergiyi kaldırır mı?" },
    {
      kind: "p",
      text: "Dubai'de şirket kurmak otomatik bir vergi avantajı vermiyor. Türkiye'de yerleşik sayılıyorsanız dünya genelindeki geliriniz Türkiye'de beyana tabi olabilir; bu yüzden iki ülke birlikte değerlendiriliyor. Verginin ayrıntısı [Dubai vergi sayfasında](/dubai/vergi). Kendi kârınızla hesap yapmak için [Dubai kurumlar vergisi hesaplayıcısı](/araclar/kurumlar-vergisi/dubai) açık. Gelir vergisi almayan öteki ülkelerle kıyas [gelir vergisi olmayan ülkeler](/blog/gelir-vergisi-olmayan-ulkeler-2025) yazısında.",
    },
    { kind: "h3", text: "Dubai'de şirket kuruluşu ne kadar tutuyor?" },
    {
      kind: "p",
      text: "Ortac Global'de Dubai kuruluşu $5.120'den başlıyor. Bu tutar şirketin kuruluşunu ve bir yıllık lisansı kapsıyor; vize, muhasebe ve ek lisans yılı gibi kalemler ihtiyaca göre ekleniyor. Hazır paket yok, toplamı seçtiğiniz kalemler belirliyor. Kalemlerin dökümü [Dubai'de şirket kurmanın maliyet kalemleri](/blog/dubaide-sirket-kurmanin-maliyet-kalemleri) yazısında.",
    },

    { kind: "h2", id: "calisan", text: "Dubai'de çalışan olarak iş bulmak nasıl oluyor?" },
    {
      kind: "p",
      text: "Dubai'de bir işverenin yanında çalışmak için çalışma vizesi gerekiyor ve başvuruyu işveren yapıyor. Standart çalışma vizesi iki yıl geçerli ve yenilenebiliyor. Turist ya da ziyaret vizesiyle çalışmak, ücretsiz olsa bile yasak; ceza hem çalışana hem işverene kesiliyor. Bu yüzden Dubai iş ilanlarına başvururken teklifin çalışma izniyle birlikte geldiğini kontrol etmek gerekiyor. [Kurallar BAE resmî portalında](https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-working-in-the-uae).",
    },
    { kind: "h3", text: "Dubai'de en çok kazandıran meslekler hangileri?" },
    {
      kind: "p",
      text: "Dubai'de en çok kazandıran meslekler için güvenilir bir resmî maaş tablosuna ulaşamadık; bu nedenle meslek başına rakam vermiyoruz. Maaş teklifini değerlendirirken kira, okul ve sağlık sigortası gibi giderleri hesaba katmak gerekiyor. Bu kalemlerin güncel aralıkları [Dubai'de yaşam rehberinde](/blog/dubai-yasam-rehberi-maliyetler-is-imkanlari) yer alıyor. Aynı kıyası başka ülkeler için yapmak isterseniz [İngiltere'de yaşam rehberi](/blog/ingiltere-yasam-rehberi-is-imkanlari-vize-maliyetler) ile [KKTC'de yaşam rehberi](/blog/kktc-yasam-rehberi-kibris-is-firsatlari-maliyetler) de yayında.",
    },

    {
      kind: "note",
      tone: "info",
      title: "Ortac Global bu konuda ne yapıyor?",
      text: "Ortac Global 1996'dan beri muhasebe, vergi ve şirket kuruluşu alanında çalışıyor ve Dubai'de kendi ofisi var. Dubai'de şirketin faaliyet tanımını işinize göre yazıyor, kuruluşu, vize başvurularını ve kuruluş sonrası muhasebeyi yürütüyoruz. Banka başvuru dosyasını da biz hazırlıyoruz; hesap kararını banka veriyor. Vize ve biyometri için bir kez BAE'ye gelmeniz gerekiyor.",
    },
    {
      kind: "p",
      text: "Dubai'nin işinize uyup uymadığını görmek isterseniz [uygunluk testi](/uygunluk-testi) birkaç soruyla yön gösteriyor. Kuruluş dışındaki yapılandırma soruları için [Dubai kurumsal danışmanlık sayfasına](/dubai/kurumsal-danismanlik) bakabilirsiniz.",
    },

    { kind: "h2", id: "sss", text: "Sık sorulan sorular" },
    {
      kind: "sss",
      items: [
        {
          q: "Dubai'de ne iş yapabilirim?",
          a: "Dubai'de e-ticaret, yazılım, danışmanlık ve ticaret işleri ticari lisansla kurulabiliyor. Turizm, gayrimenkul komisyonculuğu, sağlık ve finans işleri lisansın yanında ilgili kurumun iznini de istiyor.",
        },
        {
          q: "Dubai'de Türkler ne iş yapıyor?",
          a: "Dubai Ticaret Odası'na 2025'te 1.308 yeni Türk şirketi üye oldu. Oda sektör dağılımını ülke bazında yayımlamıyor; genel sıralamada ilk iki alan iş hizmetleri ile gayrimenkul ve toptan ve perakende ticaret.",
        },
        {
          q: "Dubai'de en çok kazandıran meslekler hangileri?",
          a: "Dubai'de meslek başına güvenilir bir resmî maaş tablosu bulamadığımız için sıralama vermiyoruz. BAE maaş üzerinden gelir vergisi almıyor; teklifi kira, okul ve sağlık giderleriyle birlikte değerlendirmek gerekiyor.",
        },
        {
          q: "Dubai iş ilanlarına Türkiye'den başvurulur mu?",
          a: "Başvurulabilir. Dubai'de çalışmaya başlamak için işverenin sizin adınıza çalışma vizesi başvurusu yapması gerekiyor; turist vizesiyle çalışmak yasak.",
        },
        {
          q: "Dubai'de şirket kurmak ne kadar tutuyor?",
          a: "Ortac Global'de Dubai kuruluşu $5.120'den başlıyor; vize ve muhasebe gibi kalemler ihtiyaca göre ekleniyor. Ayrıntı için [Dubai'de şirket kurma sayfasına](/dubai) bakabilirsiniz.",
        },
        {
          q: "Dubai'de şirket kurunca vergi ödenmiyor mu?",
          a: "Ödeniyor. Dubai'de kurumlar vergisi vergiye tabi gelirin 375.000 AED'ye kadar olan kısmında %0, üstünde %9. Türkiye'de yerleşikseniz geliriniz Türkiye'de de beyana tabi olabilir.",
        },
        {
          q: "Dubai'de iş kurmak için orada yaşamak gerekiyor mu?",
          a: "Dubai'de şirket tescili uzaktan tamamlanabiliyor. Vize ve biyometri işlemleri için bir kez BAE'ye gelmeniz gerekiyor.",
        },
      ],
    },
  ],

  links: [
    {
      label: "Dubai'de şirket kurmak",
      href: "/dubai",
      line: "Kuruluş adımları, serbest bölgeler ve $5.120'den başlayan fiyat.",
    },
    {
      label: "Dubai vergi çerçevesi",
      href: "/dubai/vergi",
      line: "Kurumlar vergisi, KDV ve Türkiye tarafıyla birlikte değerlendirme.",
    },
    {
      label: "Dubai'de yaşam rehberi",
      href: "/blog/dubai-yasam-rehberi-maliyetler-is-imkanlari",
      line: "Kira, okul, ulaşım ve oturum izinleri güncel aralıklarla.",
    },
  ],

  closing: {
    title: "Dubai'de iş kurmayı mı düşünüyorsunuz?",
    line: "Faaliyet tanımından muhasebeye bütün süreci Dubai ofisimizden, Türkçe yürütüyoruz.",
    cta: "İletişime geçin",
  },

  footnote:
    "Bu yazı genel bilgilendirme amaçlıdır; kişiye özel vergi, hukuk ya da göçmenlik danışmanlığı değildir. İzin ve lisans şartları ilgili kurumların güncel kurallarına göre değişebilir.",
};
