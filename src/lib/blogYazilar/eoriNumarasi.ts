/* EORI NUMARASI · eski siteden taşınan yazı
   (Search Console, 16 ay: 281 tıklama, 31.699 gösterim, ortalama sıra 8,2).

   SORGULAR: "eori sorgulama", "eori numarası nedir", "eori no sorgulama",
   "eori numarası sorgulama". Arayanların bir kısmı yazı değil ARAÇ arıyor;
   bu yüzden iki resmî sorgulama sayfası özette ve ilk paragrafta doğrudan
   bağlantılı, hemen altında "hangi numara nerede sorgulanır" tablosu var.
   Başlığa "sorgulama" bu yüzden girdi.

   ADRES eski sitedekiyle aynı; içerik baştan yazıldı.

   ESKİ YAZIDAN ALINMAYANLAR: "AB ile ticaret yapan her işletme EORI almak
   zorunda" (yanlış genelleme: yalnız gümrükte işlem yapan alır), "HMRC 2-3 iş
   günü, AB 5-7 iş günü" (kaynağı yok), "12-15 hane" (resmî tanım farklı),
   uydurma belge listesi, "vergisel avantajlar" ve "hukuki koruma" bölümü,
   Türkiye için "Ticaret Bakanlığı'ndan alınabilir" satırı (Türkiye EORI
   vermez).

   KAYNAK (09.10.2026'da tek tek okundu):
     · tanım, kim kaydolur, AB dışı firma nereye başvurur, biçim, süresizlik
                          taxation-customs.ec.europa.eu (EORI sayfası)
     · AB sorgulama       ec.europa.eu/taxation_customs/dds2/eos/eori_validation.jsp
     · GB sorgulama       gov.uk/check-eori-number (yalnız GB; ad ve adres
                          firma izin verdiyse görünür)
     · GB biçimi          tax.service.gov.uk/check-eori-number ("GB" + 12 ya da 15 rakam)
     · kim alır, yerleşiklik   gov.uk/eori
     · hangi numara       gov.uk/eori/Check-which-EORI-number-you-need
     · Kuzey İrlanda      gov.uk/eori/eori-northern-ireland
     · başvuru            gov.uk/eori/apply-for-eori (UTR, SIC, KDV numarası;
                          numara hemen, inceleme varsa 5 iş günü; XI 5 gün)
     · KDV eşiği          sitenin İngiltere sayfası (90.000 £, gov.uk/vat-registration)
   TARİH VE YAZAR (Burak, 09.10.2026): yazı yeni yazı gibi çıkıyor
   (publishedAt bugün, updatedAt yok), yazar Murat Ortaç.
   Türkiye tarafı için ticaret.gov.tr'de doğrulanabilir bir sayfa bulunamadı;
   Türkiye'deki taşıyıcıların vergi numarası - EORI eşleştirmesi gibi ikincil
   kaynaklı bilgiler YAZILMADI. Başvuru ücreti: gov.uk sayfasında ücretten söz
   edilmiyor; "ücretsiz" diye kesin yazılmadı.
   Ortac'a dair cümleler sitenin İngiltere ve İngiltere muhasebe sayfalarından
   (accountingIngiltere: EORI kapsam sınırı olarak geçiyor). EORI başvurusunu
   Ortac'ın yaptığı İDDİA EDİLMEDİ: rolümüz Murat Bey'e sorulan sorular arasında. */
import type { BlogPost } from "@/lib/blog";
import { SLUG } from "@/lib/blogTemel";
import { COUNTRY_PHOTO, POST_PHOTO } from "@/lib/media";

export const POST_EORI: BlogPost = {
  slug: SLUG.eori,
  category: "sektor-notlari",
  title: "EORI numarası nedir, nasıl alınır? EORI sorgulama 2026",
  heroAccent: "EORI sorgulama 2026",
  summary:
    "EORI numarası gümrükte işlem yapan firmayı tanımlayan kayıt numarasıdır. Resmî sorgulama sayfaları, kimin alması gerektiği ve başvuru adımları.",
  publishedAt: "2026-10-09",
  topic: "Gümrük ve dış ticaret",
  tags: ["EORI", "Gümrük", "E-ticaret"],
  author: "Murat Ortaç",
  cover: POST_PHOTO.corpTax,

  seo: {
    title: "EORI Numarası Nedir, Nasıl Alınır? EORI Sorgulama 2026",
    description:
      "EORI numarası sorgulama için resmî AB ve İngiltere sayfaları, EORI'nin ne olduğu, kimin alması gerektiği ve Türkiye'deki firmanın nereye başvuracağı.",
  },

  sourceNote:
    "Bilgiler Avrupa Komisyonu'nun gümrük sayfasından (taxation-customs.ec.europa.eu) ve Birleşik Krallık hükümetinin EORI sayfalarından (gov.uk) alınmıştır. 9 Ekim 2026 itibarıyla günceldir.",

  body: [
    {
      kind: "ozet",
      items: [
        "AB ülkelerinin verdiği EORI numarası [Avrupa Komisyonu'nun sorgulama sayfasından](https://ec.europa.eu/taxation_customs/dds2/eos/eori_validation.jsp?Lang=en) sorgulanır.",
        "GB ile başlayan İngiltere EORI numarası [gov.uk'taki sorgulama sayfasından](https://www.gov.uk/check-eori-number) sorgulanır.",
        "EORI, gümrükte işlem yapan firmayı tanımlayan kayıt numarasıdır; AB'de alınan numara bütün AB ülkelerinde geçer.",
        "İngiltere AB'den ayrıldığı için Büyük Britanya ile mal taşıyanlar ayrıca GB ile başlayan numara alır.",
      ],
    },
    {
      kind: "p",
      text: "EORI numarası sorgulamak için iki resmî sayfa var. AB ülkelerinin verdiği numaralar [Avrupa Komisyonu'nun EORI doğrulama sayfasında](https://ec.europa.eu/taxation_customs/dds2/eos/eori_validation.jsp?Lang=en), GB ile başlayan numaralar [Birleşik Krallık hükümetinin sorgulama sayfasında](https://www.gov.uk/check-eori-number) sorgulanıyor. Yazının devamı EORI'nin ne olduğunu, kimin alması gerektiğini ve başvurunun nereye yapıldığını 9 Ekim 2026 itibarıyla geçerli resmî bilgilerle anlatıyor.",
    },

    { kind: "h2", id: "sorgulama", text: "EORI numarası sorgulama nereden yapılır?" },
    {
      kind: "p",
      text: "EORI numarası sorgulama, numaranın başındaki iki harfe göre iki ayrı sayfadan yapılır. Numara bir AB ülke koduyla başlıyorsa (DE, FR, NL, IT gibi) Avrupa Komisyonu'nun sayfasına numarayı yazıp \"Validate\" düğmesine basmanız yeterli. Numara GB ile başlıyorsa gov.uk'taki sayfa kullanılır; bu sayfa yalnız GB numaralarını kabul eder ve öteki numaralar için Avrupa Komisyonu'nun sayfasına yönlendirir.",
    },
    {
      kind: "tablo",
      caption: "Hangi EORI numarası nerede sorgulanır?",
      head: ["Numaranın başı", "Veren", "Sorgulama sayfası"],
      rows: [
        ["DE, FR, NL, IT ve öteki AB ülke kodları", "O AB ülkesinin gümrük idaresi", "Avrupa Komisyonu: ec.europa.eu, EORI validation"],
        ["GB", "Birleşik Krallık vergi ve gümrük idaresi (HMRC)", "gov.uk: Check an EORI number"],
        ["XI (Kuzey İrlanda)", "HMRC", "Avrupa Komisyonu: ec.europa.eu, EORI validation"],
      ],
      foot: "Sorgu numaranın geçerli olup olmadığını gösterir. gov.uk sayfasında firmanın adı ve adresi yalnız firma paylaşılmasına izin verdiyse görünür.",
    },
    {
      kind: "p",
      text: "Geçerli bir numara \"geçersiz\" çıkıyorsa önce numaranın doğru sayfada sorgulandığını ve başındaki ülke kodunun eksiksiz yazıldığını kontrol edin. Sorun sürerse numarayı veren gümrük idaresine başvurmak gerekir.",
    },

    { kind: "h2", id: "nedir", text: "EORI numarası nedir?" },
    {
      kind: "p",
      text: "EORI numarası, AB gümrüklerinde ithalat, ihracat ve transit işlemi yapan firmaları ve kişileri tanımlayan kayıt numarasıdır. Açılımı Economic Operators Registration and Identification. Numara bir AB ülkesinin gümrük idaresinden alınır ve bütün AB ülkelerinde geçer; bir kişinin aynı anda yalnız bir geçerli EORI numarası olabilir. EORI numarasının son kullanma tarihi yoktur. Resmî tanım [Avrupa Komisyonu'nun EORI sayfasında](https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-procedures/economic-operators-registration-and-identification-number-eori_en) duruyor.",
    },
    {
      kind: "p",
      text: "EORI numarası iki harfli ülke koduyla başlar; ardından o ülke içinde tekil olan ve en çok 15 karakterden oluşan bir tanımlayıcı gelir. İngiltere'nin verdiği numara GB ile başlar ve ardından 12 ya da 15 rakam gelir; gov.uk'un kendi örneği GB123456789000 biçimindedir.",
    },
    { kind: "h3", text: "EORI numarası nerede kullanılır?" },
    {
      kind: "p",
      text: "EORI numarası gümrükle kurulan her resmî işlemde firmanın kimliği olarak kullanılır. Birleşik Krallık hükümetinin saydığı başlıca kullanım yerleri şunlar: gümrük beyannamesi vermek, gümrük sistemlerine (Customs Declaration Service gibi) giriş yapmak, gümrük kararı için başvurmak ve gümrük işlemlerini yürütmesi için bir temsilci atamak. Numara beyannamede yer aldığı için gümrük müşaviri ve taşıyıcı firma sevkiyattan önce sizden ister.",
    },
    { kind: "h3", text: "EORI numarası ile KDV numarası aynı şey mi?" },
    {
      kind: "p",
      text: "EORI numarası ile KDV numarası iki ayrı kayıttır. KDV numarası vergi idaresine, EORI numarası gümrüğe karşı kimliktir ve birini almak ötekini kendiliğinden doğurmaz. İngiltere'de EORI başvurusu, şirket KDV'ye kayıtlıysa KDV numarasını da ister. İngiltere'de KDV kaydı yıllık ciro 90.000 sterlini aştığında zorunlu; eşiğin altında isteğe bağlı kayıt mümkün.",
    },

    { kind: "h2", id: "kim-alir", text: "EORI numarasını kimler almak zorunda?" },
    {
      kind: "p",
      text: "EORI numarasını gümrükte kendi adına işlem yapan firma alır. AB'de yerleşik firmalar bulundukları ülkenin gümrük idaresine kaydolur. AB'de yerleşik olmayan bir firmanın, örneğin Türkiye'deki bir ihracatçının, EORI alması gereken durum AB gümrüğüne kendisinin beyanname vermesi, giriş ya da çıkış özet beyanı sunması ya da taşıyıcı olarak hareket etmesidir.",
    },
    {
      kind: "list",
      items: [
        "Malı AB'deki alıcı ithal ediyor ve gümrük beyanını o veriyorsa beyanda alıcının EORI numarası kullanılır.",
        "Malı AB'de kendi adınıza ithal ediyorsanız (örneğin gümrük vergisi ödenmiş teslim ya da AB'deki bir depoya stok gönderimi) EORI numarası sizden istenir.",
        "Yalnız hizmet ya da dijital ürün satan, mal taşımayan şirketin EORI numarasına ihtiyacı olmaz.",
        "Kişisel kullanım için getirilen, denetime tabi olmayan eşyada EORI aranmaz.",
      ],
    },
    { kind: "h3", text: "Yerleşik olmayan firma hangi işlemlerde EORI alır?" },
    {
      kind: "p",
      text: "Bir ülkede işyeri olmayan firma da bazı gümrük işlemleri için EORI numarası alır. Birleşik Krallık'ın listesinde transit beyanı, geçici ithalat beyanı, giriş ve çıkış özet beyanı, geçici depolama beyanı, gümrük kararı başvurusu ve deniz, iç su yolu ya da hava yoluyla taşıyıcılık yer alıyor. Bu işlemleri kendisi yapamayan firma, gümrük işlemlerini yürütecek birini atar ve EORI numarasını o kişi alır. Liste [gov.uk'taki EORI sayfasında](https://www.gov.uk/eori).",
    },
    { kind: "h3", text: "EORI numarası olmadan ne olur?" },
    {
      kind: "p",
      text: "EORI numarası olmayan ya da yanlış ülkenin numarasını kullanan firmanın malı gümrükte gecikir ve maliyeti artar. Birleşik Krallık hükümetine göre mal, firma doğru numarayı alana kadar depoda bekletilebilir. Bu yüzden numaranın ilk sevkiyattan önce alınması ve [doğru numaranın hangisi olduğunun](https://www.gov.uk/eori/Check-which-EORI-number-you-need) baştan netleşmesi gerekir.",
    },

    { kind: "h2", id: "turkiye", text: "Türkiye'deki firma EORI numarasını nereden alır?" },
    {
      kind: "p",
      text: "Türkiye EORI numarası vermez; EORI AB'nin ve ayrıca Birleşik Krallık'ın kendi gümrük kayıt sistemidir. AB'de işyeri olmayan bir firma EORI başvurusunu, ilk gümrük işlemini yapacağı AB ülkesinin gümrük idaresine yapar. İlk sevkiyatınız Almanya'da gümrüklenecekse Alman gümrüğüne, Hollanda'da gümrüklenecekse Hollanda gümrüğüne başvurursunuz. Alınan numara sonraki işlemlerde öteki AB ülkelerinde de kullanılır.",
    },
    {
      kind: "p",
      text: "Başvuru biçimi, istenen belgeler ve sonuçlanma süresi ülkeden ülkeye değişir. Her ülkenin başvuruyu alan kurumu Avrupa Komisyonu'nun [kayıt makamları listesinde](https://ec.europa.eu/taxation_customs/dds2/eos/ra_consultation.jsp) yer alıyor. Başvuruyu o ülkede çalıştığınız gümrük müşaviri sizin adınıza yürütebilir; bunu müşavirinize sorun.",
    },
    { kind: "h3", text: "AB'de birden fazla ülkeye satış yapan firma kaç EORI alır?" },
    {
      kind: "p",
      text: "AB'de birden fazla ülkeye satış yapan firma tek EORI numarası alır. Numara bir AB ülkesinden alındıktan sonra bütün AB gümrüklerinde geçtiği için ikinci bir ülkede yeniden başvurmak gerekmez; Avrupa Komisyonu'na göre bir kişinin aynı anda yalnız bir geçerli EORI numarası olabilir. AB'de birden fazla ülkede kalıcı işyeri olan AB dışı firma, bu ülkelerden herhangi birinde kaydolabilir.",
    },

    { kind: "h2", id: "ingiltere", text: "İngiltere EORI numarası nasıl alınır?" },
    {
      kind: "p",
      text: "İngiltere EORI numarası HMRC'nin çevrimiçi formundan alınır. Büyük Britanya (İngiltere, İskoçya, Galler) ile başka bir ülke arasında mal taşıyan firmanın GB ile başlayan numaraya ihtiyacı var; AB'de alınmış bir numara Büyük Britanya'da geçmiyor. Başvuru için firmanın çoğunlukla Birleşik Krallık'ta yerleşik olması aranıyor; şirketin kayıtlı adresi (registered office) yerleşiklik sayılıyor. Başvuru [gov.uk'taki EORI sayfasından](https://www.gov.uk/eori/apply-for-eori) yapılıyor.",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "Şirketin vergi numarası (Unique Taxpayer Reference, UTR).",
        "Şirketin kuruluş tarihi ve SIC kodu; ikisi de Companies House kaydında yazılı.",
        "Şirket KDV'ye kayıtlıysa KDV numarası ve kaydın yürürlük tarihi.",
        "HMRC çevrimiçi hesabının giriş bilgileri.",
      ],
    },
    {
      kind: "p",
      text: "GB EORI numarası başvurunun sonunda hemen veriliyor; HMRC başvuruyu incelemeye alırsa süre 5 iş gününe kadar uzayabiliyor. Birleşik Krallık'ta yerleşik olmayan firmadan UTR ve SIC kodu istenmiyor. SIC kodunuzu bilmiyorsanız [İngiltere SIC kodu aracından](/araclar/ingiltere-sic-kodu) bulabilirsiniz.",
    },
    {
      kind: "gorsel",
      src: COUNTRY_PHOTO.ingiltere,
      alt: "Londra'da Tower Bridge, arkada City of London",
      caption: "Büyük Britanya ile mal taşıyan firma GB ile başlayan EORI numarası alıyor.",
    },
    { kind: "h3", text: "Kuzey İrlanda için XI EORI numarası ne zaman gerekir?" },
    {
      kind: "p",
      text: "XI ile başlayan EORI numarası Kuzey İrlanda ile ilgili gümrük işlemleri içindir. Büyük Britanya'dan Kuzey İrlanda'ya mal taşıyan, Kuzey İrlanda'dan AB dışındaki bir ülkeye mal gönderen ya da Kuzey İrlanda'da beyan veren firma XI numarası alır. XI numarası için önce GB numarası gerekir ve başvuru ayrı bir formla yapılır; numara 5 gün içinde verilir. Bir AB ülkesinden EORI numarası olan firmanın XI numarası almasına gerek yoktur. Koşullar [Kuzey İrlanda EORI sayfasında](https://www.gov.uk/eori/eori-northern-ireland).",
    },

    { kind: "h2", id: "ab-ingiltere-fark", text: "AB EORI ile İngiltere EORI arasındaki fark ne?" },
    {
      kind: "p",
      text: "AB EORI numarası ile İngiltere EORI numarası iki ayrı sistemin kaydıdır ve biri ötekinin yerine geçmez. Hem AB'de hem Büyük Britanya'da gümrük beyanı veren firmanın iki numaraya da ihtiyacı olur. Kuzey İrlanda için XI ile başlayan üçüncü bir numara türü daha var.",
    },
    {
      kind: "note",
      tone: "warn",
      title: "İngiltere şirketiyle AB'ye mal satıyorsanız",
      text: "İngiltere'de kurulu şirketiniz GB EORI numarasıyla Büyük Britanya'dan ihracat yapar. Malı AB'de kendi adınıza ithal edecekseniz AB'de beyan için ayrıca bir AB ülkesinden EORI numarası ya da sizin adınıza gümrük işlemini yürütecek bir temsilci gerekir.",
    },

    { kind: "h2", id: "eticaret", text: "İngiltere'de şirket kuran e-ticaret satıcısına EORI gerekir mi?" },
    {
      kind: "p",
      text: "İngiltere'de şirket kuran e-ticaret satıcısına EORI numarası, şirket Büyük Britanya'ya mal sokuyor ya da Büyük Britanya'dan mal çıkarıyorsa gerekir. Türkiye'den İngiltere'deki bir depoya stok gönderip oradan satış yapan şirket ithalatçı konumundadır ve GB EORI numarasına ihtiyaç duyar. Yalnız dijital ürün, yazılım ya da hizmet satan şirket için EORI gündeme gelmez.",
    },
    {
      kind: "p",
      text: "Mal ithal eden şirket için EORI çoğunlukla KDV kaydıyla birlikte düşünülür; İngiltere'de KDV eşiği ve kurumlar vergisi [İngiltere vergi sayfasında](/ingiltere/vergi) anlatılıyor. Kuruluşun kendisi için [İngiltere'de şirket kurma sayfasına](/ingiltere), yıllık yükümlülükler için [İngiltere muhasebe sayfasına](/ingiltere/muhasebe), satış kanalları ve tahsilat için [e-ticaret sayfasına](/sektorler/e-ticaret) bakabilirsiniz. Şirket adını seçmeden önce [isim sorgulama aracı](/araclar/ingiltere-isim-sorgulama) adın alınmış olup olmadığını gösteriyor. Hangi ülkenin işinize uyduğundan emin değilseniz [ülke karşılaştırması](/ulkeler) İngiltere, Dubai ve KKTC'yi yan yana veriyor.",
    },
    {
      kind: "note",
      tone: "info",
      title: "Ortac Global bu konuda ne yapıyor?",
      text: "Ortac Global İngiltere'de şirket kuruluşunu ve kuruluş sonrası muhasebeyi Londra ofisinden yürütüyor; KDV kaydı ve beyanı muhasebe kapsamında. EORI başvurusu bu kapsamın dışında, mal taşıyan şirketin ayrıca attığı bir adım. Başvuruda istenen vergi numarası, SIC kodu ve KDV numarası kuruluş ve muhasebe sürecinde oluşan bilgiler.",
    },

    { kind: "h2", id: "ulke-secimi", text: "Mal ticareti için şirketi hangi ülkede kurmalı?" },
    {
      kind: "p",
      text: "EORI ihtiyacını malın geçtiği gümrük belirler. İngiltere şirketi Büyük Britanya'ya mal sokarken GB numarası, AB'ye kendi adına ithalat yaparken bir AB numarası kullanır. Ülke seçerken gümrüğün yanında işçilik ve vize de hesaba girer: İngiltere'de çalışan almayı düşünüyorsanız işçilik maliyetinin tabanı [İngiltere asgari ücret yazısında](/blog/ingiltere-asgari-ucret), İngiltere'ye yerleşmenin vize tarafı [İngiltere yaşam rehberinde](/blog/ingiltere-yasam-rehberi-is-imkanlari-vize-maliyetler) duruyor.",
    },
    {
      kind: "p",
      text: "Ticareti Dubai ya da KKTC üzerinden kurmayı düşünenler için [Dubai iş fikirleri yazısı](/blog/dubai-is-fikirleri-en-karlı-is-imkanlari) ve [KKTC vergi avantajları yazısı](/blog/kktc-vergi-avantajlari) iki ülkenin sunduğu çerçeveyi anlatıyor. Üç ülkeden hangisinin işinize uyduğunu [uygunluk testiyle](/uygunluk-testi) birkaç dakikada görebilirsiniz.",
    },

    { kind: "h2", id: "sss", text: "Sık sorulan sorular" },
    {
      kind: "sss",
      items: [
        {
          q: "EORI numarası sorgulama nasıl yapılır?",
          a: "AB ülkelerinin verdiği EORI numarası [Avrupa Komisyonu'nun doğrulama sayfasından](https://ec.europa.eu/taxation_customs/dds2/eos/eori_validation.jsp?Lang=en), GB ile başlayan İngiltere EORI numarası [gov.uk'taki sorgulama sayfasından](https://www.gov.uk/check-eori-number) sorgulanır. Numarayı ülke koduyla birlikte yazmak gerekir.",
        },
        {
          q: "EORI numarası nedir?",
          a: "EORI numarası, gümrükte ithalat, ihracat ya da transit işlemi yapan firmayı tanımlayan kayıt numarasıdır. Açılımı Economic Operators Registration and Identification. AB'de alınan numara bütün AB ülkelerinde geçer.",
        },
        {
          q: "Türkiye'de EORI numarası alınır mı?",
          a: "Hayır. Türkiye EORI numarası vermez. AB gümrüğünde kendi adına işlem yapacak Türkiye'deki firma, ilk gümrük işlemini yapacağı AB ülkesinin gümrük idaresine başvurur.",
        },
        {
          q: "EORI numarası kaç haneli?",
          a: "AB'de EORI numarası iki harfli ülke kodu ve ardından en çok 15 karakterden oluşur; uzunluk ülkeye göre değişir. İngiltere EORI numarası GB ile başlar, ardından 12 ya da 15 rakam gelir.",
        },
        {
          q: "EORI numarası almak ne kadar sürer?",
          a: "İngiltere'de GB EORI numarası çevrimiçi başvurunun sonunda hemen verilir; HMRC inceleme yaparsa 5 iş gününe kadar sürebilir. AB ülkelerinde süre başvurulan ülkenin gümrük idaresine göre değişir.",
        },
        {
          q: "AB'de alınan EORI numarası İngiltere'de geçerli mi?",
          a: "Hayır. İngiltere AB'den ayrıldığı için Büyük Britanya ile mal taşıyan firma GB ile başlayan ayrı bir EORI numarası alır. AB EORI numarası yalnız AB gümrüklerinde geçer.",
        },
        {
          q: "EORI numarasının süresi doluyor mu?",
          a: "Hayır. Avrupa Komisyonu'na göre EORI numarasının son kullanma tarihi yoktur. Numara firmanın talebiyle ya da faaliyet sona erdiğinde geçersiz kılınabilir.",
        },
      ],
    },
  ],

  links: [
    {
      label: "İngiltere'de şirket kurmak",
      href: "/ingiltere",
      line: "Uzaktan kuruluş adımları ve İngiltere şirketiyle çalışan ödeme kanalları.",
    },
    {
      label: "E-ticaret için şirket",
      href: "/sektorler/e-ticaret",
      line: "Online satış yapanlar için ülke seçimi, tahsilat ve pazaryeri notları.",
    },
    {
      label: "İngiltere'de muhasebe",
      href: "/ingiltere/muhasebe",
      line: "Yıllık hesaplar, KDV kaydı ve beyanı.",
    },
  ],

  closing: {
    title: "İngiltere şirketiyle satış yapmayı mı planlıyorsunuz?",
    line: "Kuruluştan muhasebeye bütün süreci Londra ofisimizden, Türkçe yürütüyoruz.",
    cta: "İletişime geçin",
  },

  footnote:
    "Bu yazı genel bilgilendirme amaçlıdır; kişiye özel gümrük, vergi ya da hukuk danışmanlığı değildir. Gümrük işlemleriniz için çalıştığınız gümrük müşavirine danışın.",
};
