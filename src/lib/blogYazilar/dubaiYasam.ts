/* DUBAİ'DE YAŞAM · eski siteden taşınan yazı
   (Search Console, 16 ay: 952 tıklama).

   ADRES: eski sitedekiyle AYNI
   (/blog/dubai-yasam-rehberi-maliyetler-is-imkanlari).

   BAŞLIK sayfanın gerçekten çıktığı sorgulardan kuruldu: "dubai'de yaşam",
   "dubaide yaşam", "dubai de yaşam", "dubai yaşam şartları". Ortak kelime
   "yaşam"; "yaşam şartları" başlıkta ve bir h2'de geçiyor.

   TARİH VE YAZAR (Burak, 09.10.2026): yazı baştan yazıldığı için yeni yazı
   gibi çıkıyor: publishedAt bugünün tarihi, updatedAt yok, yazar Murat Ortaç.
   Uzunluk hedefi 1.400-2.000 kelime, metin içinde en az 8-10 site içi bağlantı.

   ESKİ YAZIDAN ALINMAYANLAR (yeni duruşla çelişiyor ya da kaynağı yok):
     · "vergisiz gelir", "vergi avantajları" girişi: sitenin duruşu "şirket
       kurmak otomatik vergi avantajı vermez".
     · "şirket kuran 5-10 yıllık oturum vizesi alır": yanlış. Şirket üzerinden
       oturum 1-3 yıl; 5/10 yıl altın vizenin ayrı şartları.
     · "vize 2-4 haftada çıkar": süre taahhüdü vermiyoruz (STANCE_LIMITS).
     · "1 AED ≈ 8,50 TL": kur çevirisi yazılmıyor.
     · sektör başına maaş aralıkları, "rahat yaşamak için 10.000-15.000 AED",
       sigorta primi, taksi ve feribot ücretleri, metro saatleri, "sıcaklık
       50°C": kaynağı yoktu ya da bu turda birincil kaynaktan doğrulanamadı.
     · "dünyanın en güvenli şehirlerinden", "en gelişmiş sağlık sistemi" türü
       üstünlük iddiaları.
     · mahalle mahalle kira tablosu: kaynağı yoktu. Yerine Numbeo'nun merkez /
       merkez dışı aralıkları geldi, kaynak adıyla.

   KAYNAK (09.10.2026'da tek tek okundu):
     · nüfus              Dubai Veri ve İstatistik Kurumu, 28.09.2026: 4.807.185
     · gelir vergisi, KDV u.ae · Taxation
     · oturum kuralları   u.ae · General provisions for the residence visa
                          (1-3 yıl; 180 gün; 18 yaş üstü sağlık kontrolü)
     · altın vize         u.ae · Golden visa (5 ya da 10 yıl; yatırımcıda en az
                          2 milyon AED; sponsor gerekmiyor)
     · çalışma vizesi     u.ae · Work visa (işveren başvurur, 2 yıl)
     · sağlık sigortası   u.ae · Getting a health insurance; isahd.ae (DHA)
     · okul               KHDA: 227 özel okul, 387.441 öğrenci; 2026-27'de
                          ücret artışı yok (Dubai Medya Ofisi, 22.05.2026)
     · toplu taşıma       rta.ae · nol Fares (3 / 5 / 7,5 AED; kart 25 AED)
     · kira sözleşmesi    dubailand.gov.ae · Ejari ve Rental Index
     · yaşam maliyeti     RESMÎ KAYNAK YOK. Numbeo (kullanıcı beyanı; 8 Ekim
                          2026 güncellemesi, son 12 ayda 269 katılımcı). Aralık
                          olarak ve kaynak adıyla yazıldı.
   YUMUŞATILANLAR: emekli oturumunun mali şartı (u.ae ile basındaki rakamlar
   çelişiyor; yalnız yaş ve süre yazıldı), altın vizenin süresi (kategoriye
   göre 5 ya da 10), 180 gün kuralının istisnaları (sitede iki ayrı kural
   duruyor, Murat Bey'e soruldu; "bazı oturum türleri" denildi), iklim (rakam
   yok).
   Ortac'a dair cümleler sitenin Dubai, vize ve banka sayfalarından. */
import type { BlogPost } from "@/lib/blog";
import { SLUG } from "@/lib/blogTemel";
import { POST_PHOTO } from "@/lib/media";

export const POST_DUBAI_YASAM: BlogPost = {
  slug: SLUG.dubaiYasam,
  category: "ulke-rehberi",
  title: "Dubai'de yaşam 2026: maliyetler, yaşam şartları ve oturum",
  heroAccent: "maliyetler, yaşam şartları ve oturum",
  summary:
    "Dubai'de yaşam maliyeti, kira, okul, sağlık sigortası, ulaşım ve oturum izinleri; kaynağı belli güncel aralıklarla.",
  /* 10.10.2026 · Burak: yazılar toplu girildi; tarihleri 2026'ya yay.
     Yayın tarihi yayıldı, güncelleme tarihi rakamların doğrulandığı gün
     (yazı içindeki "Ekim 2026 itibarıyla" ifadeleriyle tutarlı). */
  publishedAt: "2026-09-03",
  updatedAt: "2026-10-09",
  topic: "Yaşam",
  country: "dubai",
  tags: ["Dubai", "Yaşam maliyeti", "Oturum"],
  author: "Murat Ortaç",
  cover: POST_PHOTO.dubaiMarina,

  seo: {
    title: "Dubai'de Yaşam 2026: Maliyet, Yaşam Şartları, Oturum",
    description:
      "Dubai'de yaşam 2026: kira ve fatura aralıkları, okul, sağlık sigortası, ulaşım, oturum izni türleri. Dubai yaşam şartları, kaynağı belli rakamlarla.",
  },

  sourceNote:
    "Oturum, vergi ve sigorta bilgileri BAE resmî portalından (u.ae), ulaşım ücretleri Dubai Yol ve Ulaşım Kurumu'ndan (RTA), okul verisi KHDA'dan alınmıştır. Kira ve gider aralıkları resmî veri değildir; Numbeo'nun kullanıcı beyanına dayalı 8 Ekim 2026 verisidir. Bilgiler 9 Ekim 2026 itibarıyla günceldir.",

  body: [
    {
      kind: "ozet",
      items: [
        "Dubai'nin nüfusu Eylül 2026'da 4,8 milyonu geçti; BAE bireylerden gelir vergisi almıyor, KDV %5.",
        "Numbeo verisine göre Dubai'de 1+1 daire kirası merkezde ayda 6.500-14.000 AED, merkez dışında 4.500-7.000 AED aralığında.",
        "Dubai'de sağlık sigortası zorunlu: çalışanın sigortasını işveren, aile üyelerininkini sponsor yaptırıyor.",
        "Dubai'de yaşamak için oturum izni gerekiyor; işveren, kendi şirketiniz ya da altın vize üzerinden alınabiliyor.",
      ],
    },
    {
      kind: "p",
      text: "Dubai'de yaşam, oturum izninin türüne ve aylık giderlerin gelirinizle dengesine bağlı. Bu yazı Dubai'de yaşam şartlarını, kira ve gider aralıklarını, okul, sağlık ve ulaşım düzenini, oturum izni yollarını bir arada veriyor. Resmî kaynağı olan bilgiler resmî kaynaktan, yaşam maliyeti rakamları kaynağı adıyla belirtilerek alındı. Bilgiler 9 Ekim 2026 itibarıyla güncel.",
    },

    { kind: "h2", id: "yasam-sartlari", text: "Dubai'de yaşam şartları nasıl?" },
    {
      kind: "p",
      text: "Dubai, Birleşik Arap Emirlikleri'ni oluşturan yedi emirlikten biri ve nüfusu hızla artıyor. Dubai Veri ve İstatistik Kurumu'nun açıkladığı rakama göre şehirde 28 Eylül 2026'da 4.807.185 kişi yaşıyordu; 2025 sonunda bu sayı 4.580.300'dü. Dubai'de özel okullarda 185 ülkeden öğrenci okuyor; bu, şehirde ne kadar farklı ülkeden insanın yaşadığını gösteriyor.",
    },
    { kind: "h3", text: "Dubai'de gelirden vergi alınıyor mu?" },
    {
      kind: "p",
      text: "BAE bireylerden gelir vergisi almıyor; Dubai'de maaşınızdan gelir vergisi kesilmiyor. Alışverişte mal ve hizmetlerin çoğuna %5 KDV uygulanıyor. [Vergilerin listesi BAE resmî portalında](https://u.ae/en/information-and-services/finance-and-investment/taxation). Türkiye'de yerleşik sayılmaya devam ediyorsanız geliriniz Türkiye'de beyana tabi olabilir; Dubai'de yaşamak bu soruyu kendiliğinden kapatmıyor. Aynı konudaki öteki ülkeler için [gelir vergisi olmayan ülkeler](/blog/gelir-vergisi-olmayan-ulkeler-2025) yazısına bakabilirsiniz.",
    },
    { kind: "h3", text: "Dubai'de günlük hayat nasıl geçiyor?" },
    {
      kind: "p",
      text: "Dubai'de yaz ayları çok sıcak geçiyor ve günlük hayat bu aylarda klimalı kapalı alanlara taşınıyor. Resmî dil Arapça, iş hayatında ve günlük işlerde İngilizce yaygın. Oturum izniyle birlikte Emirates ID adlı kimlik kartı düzenleniyor; banka dahil BAE'deki resmî işlemlerin çoğunda bu kimlik isteniyor.",
    },

    { kind: "h2", id: "maliyet", text: "Dubai'de yaşam maliyeti 2026'da ne kadar?" },
    {
      kind: "p",
      text: "Dubai'de yaşam maliyeti için resmî bir sepet yayımlanmıyor. Aşağıdaki aralıklar, kullanıcıların kendi ödediği tutarları girdiği Numbeo veri tabanından; son güncelleme 8 Ekim 2026, son 12 ayda 269 kişi veri girmiş. Rakamlar bir fikir verir, teklif ya da sözleşme yerine geçmez. [Güncel hâli Numbeo'nun Dubai sayfasında](https://www.numbeo.com/cost-of-living/in/Dubai).",
    },
    {
      kind: "tablo",
      caption: "Dubai'de aylık giderler · Numbeo, 8 Ekim 2026",
      head: ["Kalem", "Aralık (AED)", "Ortalama (AED)"],
      rows: [
        ["1+1 daire kirası, merkez", "6.500 - 14.000", "8.842"],
        ["1+1 daire kirası, merkez dışı", "4.500 - 7.000", "5.560"],
        ["3+1 daire kirası, merkez", "12.000 - 20.000", "16.577"],
        ["3+1 daire kirası, merkez dışı", "9.200 - 13.500", "10.850"],
        ["Elektrik, su, soğutma (85 m² daire)", "541 - 1.500", "902"],
        ["Ev interneti", "230 - 420", "341"],
        ["Cep telefonu tarifesi", "100 - 300", "201"],
      ],
      foot: "Tutarlar aylık ve dirhem (AED) cinsinden. Numbeo resmî bir kurum değil; veriler kullanıcı beyanına dayanıyor ve semte göre büyük fark gösteriyor.",
    },
    { kind: "h3", text: "Dubai'de kira dışındaki giderler" },
    {
      kind: "p",
      text: "Numbeo'nun aynı verisine göre Dubai'de kira hariç aylık gider tek kişi için yaklaşık 4.200 AED, dört kişilik aile için yaklaşık 14.800 AED. Uygun fiyatlı bir restoranda bir öğün 30-100 AED, orta sınıf bir restoranda iki kişilik yemek 150-400 AED aralığında. Okul ücreti bu toplamın içinde değil; çocuklu ailelerde en büyük ikinci kalem çoğunlukla okul oluyor.",
    },
    {
      kind: "gorsel",
      src: POST_PHOTO.corpTax,
      alt: "Masada formlar, hesap makinesi ve kalem",
      caption: "Dubai'de bütçe yaparken kira, okul ve sağlık sigortası ayrı ayrı hesaplanıyor.",
    },

    { kind: "h2", id: "kira", text: "Dubai'de ev kiralarken nelere dikkat edilir?" },
    {
      kind: "p",
      text: "Dubai'de kira sözleşmeleri Dubai Tapu Dairesi'nin Ejari sistemine kaydediliyor ve bu kayıt zorunlu. Kaydı mal sahibi yaptırabiliyor; kiracı da mal sahibinin onayıyla başvurabiliyor. Sözleşmeyi imzalamadan önce kaydı kimin yaptıracağını netleştirmek gerekiyor.",
    },
    {
      kind: "p",
      text: "Dubai'de kira artışı bir endekse bağlı. Dubai Tapu Dairesi'ne bağlı RERA, semtlere göre bir kira endeksi yayımlıyor; yenilemede istenebilecek artış, mevcut kiranızla benzer evlerin ortalama kirası arasındaki farka göre hesaplanıyor. Dairenin sitesindeki hesaplayıcıya sözleşme bilgilerinizi girerek sonucu görebilirsiniz. [Kira endeksi Dubai Tapu Dairesi'nin sayfasında](https://dubailand.gov.ae/en/eservices/rental-index/).",
    },
    {
      kind: "note",
      tone: "warn",
      title: "Ödeme planını sözleşmeden önce yazılı isteyin",
      text: "Dubai'de kiranın kaç ödemede alınacağı ve depozito tutarı sözleşmeyle belirleniyor. İlandaki tutarın aylık mı yıllık mı olduğunu, ödeme sayısını ve depozitoyu imzadan önce yazılı olarak teyit edin.",
    },

    { kind: "h2", id: "ulasim", text: "Dubai'de ulaşım ne kadar tutuyor?" },
    {
      kind: "p",
      text: "Dubai'de metro, tramvay ve otobüs tek kartla, nol kartıyla kullanılıyor. Şehir yedi bölgeye ayrılmış ve ücret yolculukta geçtiğiniz bölge sayısına göre kesiliyor. Standart Silver kartla tek bölge içinde yolculuk 3 AED, iki komşu bölge 5 AED, ikiden fazla bölge 7,5 AED. Kartın kendisi 25 AED ve içinde 19 AED bakiye yüklü geliyor. [Ücret tablosu RTA'nın sayfasında](https://www.rta.ae/wps/portal/rta/ae/public-transport/Nol-Fares).",
    },
    {
      kind: "tablo",
      caption: "Dubai toplu taşıma ücretleri · nol Silver kart",
      head: ["Yolculuk", "Ücret"],
      rows: [
        ["Tek bölge içinde", "3 AED"],
        ["İki komşu bölge", "5 AED"],
        ["İkiden fazla bölge", "7,5 AED"],
      ],
      foot: "Kaynak: Dubai Yol ve Ulaşım Kurumu (RTA). Gold sınıfı ve tek kullanımlık biletlerde ücret daha yüksek.",
    },
    {
      kind: "p",
      text: "Dubai'de metro hattının uzağında oturanlar için araba günlük hayatın parçası. Araç kullanacaksanız yakıt ve otopark giderini de bütçeye eklemek gerekiyor.",
    },

    { kind: "h2", id: "saglik", text: "Dubai'de sağlık sigortası zorunlu mu?" },
    {
      kind: "p",
      text: "Evet. Dubai'de sağlık sigortası yasal zorunluluk. İşveren, serbest bölge şirketleri dahil, çalışanının sigortasını yaptırmak ve primini ödemek zorunda; primi maaştan kesemiyor. Eşinizin ve çocuklarınızın sigortası ise onların sponsoru olarak sizin sorumluluğunuzda. Dubai Sağlık Otoritesi (DHA) her poliçenin karşılaması gereken asgari kapsamı belirliyor.",
    },
    {
      kind: "p",
      text: "Dubai'de kendi şirketinizin ortağı olarak oturum alıyorsanız hem işveren hem sponsor sizsiniz; kendi sigortanız ve ailenizinki bütçenize giriyor. Prim yaşa, kapsama ve sigorta şirketine göre değiştiği için bu yazıda rakam vermiyoruz. Teklif alırken hangi hastanelerin anlaşmalı olduğuna ve doğum, diş gibi kalemlerin kapsamda olup olmadığına bakmak gerekiyor.",
    },

    { kind: "h2", id: "okul", text: "Dubai'de okul ve aile hayatı nasıl?" },
    {
      kind: "p",
      text: "Dubai'de yabancı ailelerin çocukları çoğunlukla özel okullara gidiyor. Özel okulları denetleyen kurum KHDA'nın verisine göre Dubai'de 227 özel okulda 387.441 öğrenci okuyor. Okullar farklı ülkelerin müfredatlarını uyguluyor ve KHDA her okul için denetim notunu ve ücret tablosunu yayımlıyor.",
    },
    {
      kind: "p",
      text: "Dubai'de özel okul ücretlerini okul kendi başına artıramıyor; artış oranını KHDA belirliyor. KHDA, 2026-27 öğretim yılında okul ücretlerinde artış olmayacağını açıkladı. Numbeo verisinde uluslararası ilkokulun yıllık ücreti çocuk başına 40.000-110.000 AED aralığında görünüyor. Kesin tutar için seçtiğiniz okulun KHDA'daki ücret sayfasına bakmak gerekiyor; servis, üniforma ve kitap ayrıca ödeniyor.",
    },

    { kind: "h2", id: "oturum", text: "Dubai'de yaşamak için hangi oturum izinleri var?" },
    {
      kind: "p",
      text: "Dubai'de turist vizesinden uzun kalmak için oturum izni gerekiyor. Oturum bir sponsora bağlı olarak 1, 2 ya da 3 yıllık veriliyor; sponsor işvereniniz, kendi şirketiniz ya da bir aile üyeniz olabiliyor. Sponsor gerektirmeyen uzun süreli izinler de var. [Genel kurallar BAE resmî portalında](https://u.ae/en/information-and-services/visa-and-emirates-id/Visa-information/general-provisions-for-the-residence-visa).",
    },
    {
      kind: "tablo",
      caption: "Dubai'de oturum izni yolları",
      head: ["Yol", "Kimin için", "Süre"],
      rows: [
        ["Çalışma vizesi", "Bir işverenin yanında çalışanlar; başvuruyu işveren yapıyor", "2 yıl, yenilenebilir"],
        ["Şirket üzerinden oturum", "Dubai'de şirketi olan ortaklar ve şirketin çalışanları", "Türüne göre 1-3 yıl"],
        ["Aile vizesi", "Oturum sahibinin eşi ve çocukları", "Sponsorun oturumunu aşamıyor"],
        ["Altın vize", "Yatırımcılar, girişimciler ve belirli meslek grupları", "5 ya da 10 yıl"],
        ["Emekli oturumu", "55 yaş ve üstü, mali şartları sağlayanlar", "5 yıl"],
      ],
      foot: "Kaynak: BAE resmî portalı u.ae. Altın vizede yatırımcı kategorisi için en az 2 milyon AED yatırım aranıyor. Emekli oturumunun mali şartları için başvurudan önce resmî portaldaki güncel sayfaya bakın.",
    },
    { kind: "h3", text: "Dubai oturumu hangi durumda düşüyor?" },
    {
      kind: "p",
      text: "Dubai'de oturum izni, BAE dışında kesintisiz 180 günden uzun kalındığında kendiliğinden geçersiz oluyor. Altın vize sahipleri ve bazı oturum türleri bu kuralın dışında. Başvuruda 18 yaş ve üstü herkes sağlık kontrolünden geçiyor. Aile üyelerinin oturumu sponsorunkinden uzun olamıyor; siz yenilediğinizde onlarınki de yenileniyor.",
    },
    { kind: "h3", text: "Dubai'de çalışmak için ne gerekiyor?" },
    {
      kind: "p",
      text: "Dubai'de bir işte çalışmak için çalışma vizesi şart; turist ya da ziyaret vizesiyle çalışmak yasak ve ceza hem çalışana hem işverene kesiliyor. Hangi sektörlerde iş kurulduğunu ve çalışan olarak iş aramanın nasıl yürüdüğünü [Dubai'de ne iş yapılır](/blog/dubai-is-fikirleri-en-karlı-is-imkanlari) yazısında anlattık.",
    },

    { kind: "h2", id: "sirket-oturum", text: "Dubai'de şirket kurarak oturum alınır mı?" },
    {
      kind: "p",
      text: "Evet. Dubai'de şirketinizin ortağı olarak oturum izni alabiliyorsunuz; şirket ayrıca çalışanları için vize çıkarabiliyor. Bir şirketin kaç kişiye vize alabileceğini lisans paketi ve ofis tipi belirliyor, bu yüzden vize planı kuruluşla birlikte yapılıyor. Sağlık kontrolü ve biyometri vekâletle yürümüyor: vize için bir kez BAE'ye gelmeniz gerekiyor. Adımlar [Dubai vize ve oturum sayfasında](/dubai/oturum-vize).",
    },
    {
      kind: "p",
      text: "Dubai'de şirket kurmak otomatik bir vergi avantajı vermiyor. Şirket net kârı üzerinden kurumlar vergisi ödüyor: 375.000 AED'ye kadar %0, üstü %9. Ortac Global'de Dubai kuruluşu $5.120'den başlıyor; vize kişi başı ayrıca ekleniyor. Kuruluşun adımları [Dubai'de şirket kurma sayfasında](/dubai), kalemlerin dökümü [maliyet kalemleri yazısında](/blog/dubaide-sirket-kurmanin-maliyet-kalemleri), verginin ayrıntısı [Dubai vergi sayfasında](/dubai/vergi).",
    },
    { kind: "h3", text: "Dubai'de banka hesabı nasıl açılıyor?" },
    {
      kind: "p",
      text: "Dubai'de banka işlemlerinin çoğunda Emirates ID isteniyor; bu yüzden hesap açılışı oturum süreciyle birlikte ilerliyor. Şirket hesabı için Wio, Mashreq, Emirates NBD ve FAB gibi bankalara başvuruluyor ve kararı banka veriyor. Başvuru dosyasında nelerin istendiği [Dubai banka hesabı sayfasında](/dubai/banka-hesabi) yazıyor.",
    },

    { kind: "h2", id: "kiyas", text: "Dubai'de yaşam öteki ülkelerle nasıl kıyaslanır?" },
    {
      kind: "p",
      text: "Dubai'de yaşamı değerlendirirken aynı soruları başka ülkeler için de sormak kararı kolaylaştırıyor: oturum neye bağlı, kira ve okul ne kadar, gelir nasıl vergileniyor. İngiltere'de şirket kurmak oturum hakkı vermiyor ve maaştan gelir vergisi kesiliyor; ayrıntı [İngiltere'de yaşam rehberinde](/blog/ingiltere-yasam-rehberi-is-imkanlari-vize-maliyetler) ve [İngiltere asgari ücret](/blog/ingiltere-asgari-ucret) yazısında. Türkiye'ye yakın bir seçenek arayanlar için [KKTC'de yaşam rehberi](/blog/kktc-yasam-rehberi-kibris-is-firsatlari-maliyetler) var. Üç ülkeyi şirket tarafıyla yan yana görmek için [ülke karşılaştırması](/ulkeler) sayfasına bakabilirsiniz.",
    },

    {
      kind: "note",
      tone: "info",
      title: "Ortac Global bu konuda ne yapıyor?",
      text: "Ortac Global 1996'dan beri muhasebe, vergi ve şirket kuruluşu alanında çalışıyor ve Dubai'de kendi ofisi var. Dubai'de şirket kuruluşunu, ortak, çalışan ve aile vizesi başvurularını, kuruluş sonrası muhasebeyi yürütüyoruz. Banka başvuru dosyasını biz hazırlıyoruz; hesap kararını banka veriyor. Vize ve biyometri için bir kez BAE'ye gelmeniz gerekiyor.",
    },
    {
      kind: "p",
      text: "Kuruluştan sonraki defter ve beyan yükümlülükleri için [Dubai muhasebe sayfasına](/dubai/muhasebe) bakabilirsiniz. Dubai'nin durumunuza uyup uymadığını görmek isterseniz [uygunluk testi](/uygunluk-testi) birkaç soruyla yön gösteriyor.",
    },

    { kind: "h2", id: "sss", text: "Sık sorulan sorular" },
    {
      kind: "sss",
      items: [
        {
          q: "Dubai'de yaşam pahalı mı?",
          a: "Dubai'de en büyük gider kira. Numbeo'nun 8 Ekim 2026 verisine göre 1+1 daire merkezde ayda 6.500-14.000 AED, merkez dışında 4.500-7.000 AED; kira hariç gider tek kişi için yaklaşık 4.200 AED.",
        },
        {
          q: "Dubai'de yaşamak için ne gerekiyor?",
          a: "Dubai'de yaşamak için oturum izni gerekiyor. Oturum bir işveren, kendi şirketiniz ya da bir aile üyeniz üzerinden 1-3 yıllık alınıyor; altın vize gibi sponsor gerektirmeyen uzun süreli izinler de var.",
        },
        {
          q: "Dubai'de maaştan vergi kesiliyor mu?",
          a: "Hayır. BAE bireylerden gelir vergisi almıyor. Alışverişte %5 KDV var. Türkiye'de yerleşik sayılıyorsanız geliriniz Türkiye'de beyana tabi olabilir.",
        },
        {
          q: "Dubai'de şirket kurunca oturum alabilir miyim?",
          a: "Evet. Dubai'de şirket ortağı olarak oturum izni alınabiliyor. Sağlık kontrolü ve biyometri için bir kez BAE'ye gelmeniz gerekiyor. Ayrıntı [Dubai vize ve oturum sayfasında](/dubai/oturum-vize).",
        },
        {
          q: "Dubai oturumu için Dubai'de yaşamak zorunda mıyım?",
          a: "Hayır. Ancak Dubai oturumu, BAE dışında kesintisiz 180 günden uzun kalındığında kendiliğinden düşüyor; bazı oturum türleri bu kuralın dışında.",
        },
        {
          q: "Dubai'de sağlık sigortası zorunlu mu?",
          a: "Evet. Dubai'de çalışanın sağlık sigortasını işveren yaptırıyor ve primini ödüyor; eş ve çocukların sigortası sponsorun sorumluluğunda.",
        },
        {
          q: "Dubai'de okul ücretleri ne kadar?",
          a: "Dubai'de özel okul ücretleri okula ve sınıfa göre değişiyor. Numbeo verisinde uluslararası ilkokul yılda 40.000-110.000 AED aralığında. Kesin tutar KHDA'nın her okul için yayımladığı ücret sayfasında.",
        },
      ],
    },
  ],

  links: [
    {
      label: "Dubai vize ve oturum",
      href: "/dubai/oturum-vize",
      line: "Ortak, çalışan ve aile vizesi; başvuru adımları ve oturumu koruma kuralları.",
    },
    {
      label: "Dubai'de şirket kurmak",
      href: "/dubai",
      line: "Kuruluş adımları, serbest bölgeler ve $5.120'den başlayan fiyat.",
    },
    {
      label: "Dubai'de ne iş yapılır?",
      href: "/blog/dubai-is-fikirleri-en-karlı-is-imkanlari",
      line: "Sık kurulan iş alanları, gereken izinler ve çalışan tarafı.",
    },
  ],

  closing: {
    title: "Dubai'ye şirketinizle birlikte mi taşınıyorsunuz?",
    line: "Kuruluşu, vize başvurularını ve muhasebeyi Dubai ofisimizden, Türkçe yürütüyoruz.",
    cta: "İletişime geçin",
  },

  footnote:
    "Bu yazı genel bilgilendirme amaçlıdır; kişiye özel vergi, hukuk ya da göçmenlik danışmanlığı değildir. Kira ve gider aralıkları resmî veri değildir ve zamanla değişir.",
};
