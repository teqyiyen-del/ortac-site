import { FACTS, type CountrySlug } from "@/lib/brand";

/* ============================================================================
   HAKKIMIZDA — sayfanın bütün metni.
   Sayfa: src/app/hakkimizda/page.tsx · Biçim: src/app/css/hakkimizda.css

   ---------------------------------------------------------------- NEDEN AYRI
   Bu dosya teknik bir tercih değil, bir onay mekanizması. Hakkımızda sayfası
   sitedeki tek yer ki içindeki her cümle firma hakkında bir İDDİA: kim
   olduğumuz, neye yetkimiz olduğu, kiminle resmî ilişkimiz olduğu. Böyle bir
   metni JSX'in içine dağıtırsak, onaylaması gereken iki kişi (müşteri ve
   muhasebeci) sayfayı doğrulamak için React okumak zorunda kalır. Metin tek
   dosyada toplanınca onay tek dosyada bitiyor; sayfa yalnızca dizer.

   ------------------------------------------------------------ İDDİA SINIRI
   Sitenin kendi vaadi "yalnızca doğrulanabilir olanı yazıyoruz". Bu sayfada
   o vaat en sıkı biçimde uygulanıyor. Buraya yazılan her satırın ya firmanın
   kendi resmî beyanında ya da basında karşılığı var.

   BİLEREK YAZILMAYANLAR (elimizde doğrulanmış karşılığı yok, uydurulmadı):
   kuruluş yılı, çalışan sayısı, müşteri sayısı, lisans numarası, sertifika
   listesi, ofis adresleri, telefon, e-posta. Bunların yeri aşağıda `SWAP:`
   işaretiyle duruyor ve BOŞ; boş kalan satır sayfada hiç basılmıyor. Değer
   girildiği anda ilgili satır kendiliğinden görünür oluyor — sayfaya
   dokunmak gerekmiyor.

   Ölçülemeyen sıfat da yok: "sektörün lideri", "en hızlı", "binlerce müşteri"
   gibi ifadeler bilerek kullanılmadı. Doğrulanamayan övgü, doğrulanabilir
   iddiaların da güvenilirliğini düşürüyor.

   ------------------------------------------------- BURADA OLMAYAN İÇERİKLER
   Ortaklar (PARTNERS), taahhüt sınırları (STANCE_LIMITS) ve hizmet zinciri
   (CHAIN) buraya KOPYALANMADI; sayfa onları doğrudan lib/brand.ts'ten
   okuyor. Sebebi tek: bunlar sitenin başka yerlerinde de basılıyor ve iki
   kopya tutmak, birini güncelleyip diğerini unutmanın garantisi. Aynı şekilde
   sektör adresleri lib/sectors.ts'teki sectorHref()'ten üretiliyor.

   ------------------------------------------------------ "ANLATMA, GÖSTER"
   Bu turda dosya kısaldı, uzamadı. Müşterinin kuralı net: ziyaretçi hukuk
   makalesi okumasın. Hakkımızda sayfası laf kalabalığına en açık sayfa türü,
   o yüzden buradaki her alanın bir görsel karşılığı olmak zorunda — künye
   satırı bir tabloya, ülke bir bayrak diskine, zincir numaralı bir raya, sektör
   bir karta dönüyor. Karşılığı olmayan cümle (sayfanın kendini anlatan
   satırları, kaldırılan küre şemasının altındaki not) bu turda silindi.
   ========================================================================= */

/* İkonlar burada bileşen değil, STRING. about.ts'i React'ten bağımsız tutmak
   istiyoruz: bu dosyayı onaylayacak kişi bir JSX importu görmek zorunda
   kalmasın. Eşleme sayfada (bkz. page.tsx · ICONS). lib/sectors.ts de aynı
   kalıbı kullanıyor. */
export type AboutIcon =
  | "stamp"
  | "handshake"
  | "office"
  | "history"
  | "team"
  | "language"
  | "panel";

/* --------------------------------------------------------------------- HERO
   h1 sayfada tek. PageHero `accent`i başlığın SONUNDAN kesiyor
   (title.endsWith(accent)), o yüzden vurgu son kelimelerde.

   ------------------------------------------- BU TURDA HERO GÖRSELLE AÇILIYOR
   Müşteri: "hakkımızda sayfasında biraz daha diğerlerinden ayrıştırmak için
   direkt heroda bir görselle girebiliriz konuya ya, ve heroda çok fazla şey
   anlatmayalım çünkü zaten aşağıda anlatıyor olacağız."

   İki iş birden. Görsel için yeni bir kare aranmadı: sayfanın 1. bölümünde
   zaten duran ekip fotoğrafı (media.ts · TEAM_PHOTO) yukarı, hero'ya TAŞINDI.
   Kopyalanmadı — aynı kare iki ekran arayla iki kez görünseydi sayfanın en
   büyük iki lekesi aynı fotoğraf olurdu. Künyesi de (aşağıdaki `photoNote`)
   onunla birlikte geldi; ikisi ayrılamaz, gerekçesi media.ts · TEAM_PHOTO'da.

   METİN KISALDI: hero'nun lead'i iki cümleydi, bir cümleye indi. Düşen cümle
   "Bu sayfada firmayla ilgili yalnızca doğrulanabilir olanı yazıyoruz: kim
   olduğumuzu, nerede çalıştığımızı ve neye dayanarak çalıştığımızı" idi ve
   tam olarak müşterinin şikâyet ettiği şeydi: sayfanın kendi içindekiler
   tablosu. İÇERİK KAYBI YOK, üç ayrı yerde aynı şey zaten yazıyor —
   OPENING.lead ("her iddianın dayanağı sayfanın devamında tek tek duruyor"),
   BASIS.lead ("dördü de dışarıdan sorulabilir, doğrulanabilir şeyler") ve
   IDENTITY.lead ("doğrulanmış karşılığı olmayan alan hiç basılmıyor").
   Kalan cümle firmanın ne yaptığını söyleyen tanım; o düşseydi h1'den inen
   bilgi ikinci kez kaybolurdu. */
export const HERO = {
  crumb: "Hakkımızda",
  /* BAŞLIK BU TURDA KISALDI. Eskisi firmanın hizmet tanımının tamamıydı
     ("Vergi, muhasebe ve şirket kuruluşunda uluslararası danışmanlık") ve
     müşteri onu reddetti: "herodaki başlık neden upuzun amk o ney. ortac
     kimdir biz kimiz vb tarzı bir şey türetip yazabilirsin abartma."

     Yenisi bir slogan değil, sayfanın ne olduğunu söyleyen bir soru — ve
     hemen altındaki ilk bölüm ("Kim olduğumuz") o sorunun cevabı.

     HİÇBİR BİLGİ KAYBOLMADI: eski başlığın taşıdığı hizmet tanımı kelimesi
     kelimesine `lead`in ilk cümlesine indi (ve SEO açıklamasında da duruyor).
     Kısalan şey h1, anlatılan şey değil. */
  title: "Ortac Global kimdir?",
  accent: "kimdir?",
  /* TEK CÜMLE (gerekçe blok başında). Kalan cümlenin kendisi değişmedi:
     eski h1'den inen hizmet tanımı hâlâ kelimesi kelimesine burada, yalnızca
     ardındaki ikinci cümle silindi. */
  lead: "Vergi, muhasebe ve şirket kuruluşunda uluslararası danışmanlık: KKTC, İngiltere ve Dubai.",

  /* `photoNote` SİLİNDİ (19.08.2026, müşteri isteği): "bide şu fotoların
     altına 'Fotoğraf temsilî; firmanın kendi ekip çekimi değil.' yazma."
     Alan geri eklenmeyecek. Kare hâlâ bir Unsplash yer tutucusu
     (media.ts · TEAM_PHOTO) ve alt="" ile DEKORATİF basılıyor; şerhin işini
     artık yalnız `alt` boşluğu yapıyor. Gerçek ekip çekimi gelmezse bu
     karenin sayfada kalıp kalmayacağı müşteriye soruldu. */
};

/* -------------------------------------------------------------- ÖZET SAYILAR
   Açılış bölümünün son parçası: üç sayı, üç kelime. Sayfanın geri kalanını bir
   paragrafla özetlemek yerine ÜÇ RAKAMLA özetliyor.

   ------------------------------------------------ BU TURDA `href` KALKTI
   Üç kutucuk bir tur boyunca sayfanın içindekiler tablosuydu: her biri bir
   çapaydı ve tıklanınca kendi bölümüne iniyordu. Müşteri o işi iptal etti:
   "bir yere yönlendiren bir tarzı fln olmasın aşağı fln göndermesin ya sadece
   sayı verelim." Alan silindi, tipten de çıktı — bir daha yanlışlıkla
   bağlanmasınlar diye. Bölümlerin id'leri (#nerede · #nasil · #sektorler)
   yerinde duruyor: dışarıdan verilmiş derin bağlantılar çalışmaya devam etsin.

   Sayılar burada YAZILI DEĞİL ve bu kasıtlı: sayfa onları WHERE.countries,
   brand.ts · CHAIN ve FOR_WHOM.sectors dizilerinin uzunluğundan okuyor. Bir
   ülke ya da sektör eklendiğinde kutucuktaki sayının eskimesi böylece imkânsız.
   Yeni bir iddia da yok — üçü de sayfanın aşağısında zaten tek tek yazan
   şeyin sayısı.

   ------------------------------------------- BU TURDA SIRA DEĞİŞTİ: 3 · 6 · 5
   Müşteri kutucukları reddetti: "şu ülke sektör vb kısmını daha güzel bir şey
   yapabiliriz ya çok saçma geldi gözüme, logo vb girebilir işin içine."
   Kutucukların sağındaki üç soyut çizim kalktı; yerine kutucuğun SAYDIĞI
   ŞEYİN KENDİSİ geldi: gerçek bayraklar, gerçek sektör ikonları, zincirin
   gerçek beş adımı (gerekçenin tamamı page.tsx · 1. bölüm).

   Sıra bunun sonucu. Zincir kutucuğu artık beş adımın ADINI taşıyor ve o beş
   ad ancak tam genişlikte yan yana okunuyor; yani zincir, ızgaranın altındaki
   geniş hücre olmak zorunda. Dizideki sıra da ekrandaki sırayla aynı tutuldu:
   ızgara hücrelerini DOM sırası dolduruyor ve ikisi ayrılırsa ekran
   okuyucunun duyduğu sıra ile gözün gördüğü sıra birbirini tutmaz.

   Sayılar bu yüzden 3 · 6 · 5 diye okunuyor. Bir sıralama değil, üç ayrı
   ölçü; sayfadaki bölüm sırası (ülkeler → zincir → sektörler) yerinde. */
export type SummaryKey = "where" | "chain" | "sectors";
export const SUMMARY: { k: SummaryKey; label: string }[] = [
  { k: "where", label: "ülke" },
  { k: "sectors", label: "sektör" },
  { k: "chain", label: "halkalı zincir" },
];

/* ------------------------------------------------------------------ AÇILIŞ
   Sayfanın ilk bölümü. BURASI BİR TUR ÖNCE KÜNYEYDİ ve müşteri onu reddetti:
   "firma künyesi kısmına gerek yok hakkımızda bölümünde, bence orayı kaldırıp
   başka bir şeyle giriş açalım, böyle biraz vizyoner falan bir şeylerle."
   Aynı mesajın ikinci yarısı da buranın işi: "vizyon misyon ve hakkımızda bir
   şeyler hiç yazmıyor, onları yazmak lazım."

   İkincisi bir yazma işi DEĞİLDİ, bir görünürlük işiydi: vizyon ve misyon
   metinleri zaten vardı (aşağıda, birebir aynı cümleler) ama kapalı bir
   <details> arkasında duruyordu. Müşteri sayfayı okurken onları hiç görmedi,
   o yüzden "hiç yazmıyor" dedi. Bu turda tek bir kelimesi değişmeden AÇIĞA
   çıktılar — firmanın kendi resmî ifadesi, yeniden yazılamaz.

   ------------------------------------------------------ "VİZYONER" SINIRI
   Vizyoner olmak ile uydurmak arasındaki fark bu blokta çok dar: aşağıdaki
   iki paragrafta TEK BİR YENİ OLGU YOK. Hepsi sayfanın kendi devamında ya da
   lib/brand.ts'te zaten doğrulanmış hâlde duruyor — üç ülke (WHERE),
   beş halkalı zincir (brand.ts · CHAIN), taşerona verilmemesi ve Türkçe tek
   muhatap (HOW.principles), kendi lisans / IFZA / üç ülkede de kendi ofis
   (BASIS.cards).
   Değişen yalnızca çerçeve: aynı olgular ilk kez bir hikâye sırasında
   diziliyor. Kuruluş yılı, çalışan sayısı, müşteri sayısı, ödül, ciro ve
   "sektör lideri" türü sıfatlar burada da YOK.

   -------------------------------------------- BU TURDA FOTOĞRAF BURADAN GİTTİ
   Bölüm bir tur boyunca "fotoğraf | metin" diye iki sütundu. Fotoğraf hero'ya
   çıktı (gerekçe HERO başında), yani bu bölüm artık sayfanın ilk görseli
   değil, hero'nun kurduğu sorunun düzyazı cevabı.

   MÜŞTERİNİN "GÖRSELLE AÇILSIN" TALEBİ BOZULMADI, ÖNE ALINDI: sayfa hâlâ bir
   görselle açılıyor, yalnızca artık bölümün değil sayfanın en tepesinde.
   İki sütun da korundu, içerikleri değişti — solda başlık ve tanıtım cümlesi,
   sağda iki paragraf; ayrıntı hakkimizda.css · 1. */
export const OPENING = {
  heading: "Kim olduğumuz",
  accent: "olduğumuz",
  lead: "Üç ülkede çalışan tek bir ekip. Aşağıda ne yaptığımızı ve neyi hedeflediğimizi firmanın kendi ifadesiyle yazdık; her iddianın dayanağı sayfanın devamında tek tek duruyor.",

  /* İki paragraf, ikisi de kısa. Uzun bir "hakkımızda" metni bu sayfanın
     baştan sona reddettiği şey ("anlatma, göster") — ama müşteri haklıydı,
     firmanın ne yaptığını düz cümleyle söyleyen tek bir satır bile yoktu.
     Birincisi işin NE olduğunu, ikincisi neye dayandığını söylüyor. */
  body: [
    "Şirket kurmak tek bir işlem değil: tescil, banka hesabı, defter, beyan, uyum ve lisans yenilemesi diye uzayan bir sıra. Ortac Global bu sıranın tamamını üstleniyor: KKTC, İngiltere ve Dubai'de, aynı ekiple ve Türkçe.",
    /* OFİS İDDİASI BU TURDA DÜZELDİ. Burada bir tur boyunca "Dubai'de kendi
       ofisimiz" yazıyordu ve müşteri bunu yanlış olarak işaretledi: "bizim tüm
       ülkelerde kendi ofisimiz var hepsini biz yönetiyoruz... taktın sadece
       dubaiye yazma şu olayı." Üç ülkenin üçünde de firmanın kendi ofisi var
       ve üçünü de kendisi yürütüyor. */
    "Bunun arkasında üç somut şey var: kendi muhasebe lisansımız, Dubai serbest bölgesiyle resmî iş ortaklığımız ve üç ülkenin üçünde de kendi ofisimiz. Üçü de aşağıda tek tek yazıyor; hiçbiri ölçülemeyen bir sıfat değil.",
  ],

  /* `photoNote` BU TURDA BURADAN ÇIKTI, HERO'YA TAŞINDI. Ekip fotoğrafı da
     bu bölümden hero'ya taşındı (gerekçe HERO başında) ve künye fotoğrafın
     PARÇASI: aynı <figure> içinde, ekran okuyucuda birlikte okunuyor. Metin
     bu blokta kalsaydı, bir gün buradan silinen bir satır hero'daki kareyi
     künyesiz bırakırdı. Cümlenin kendisi tek harfi değişmeden HERO.photoNote
     olarak duruyor. */

  /* Vizyon ve misyon ARTIK AÇIKTA. Bir tur önce <details> içinde kapalı
     duruyorlardı ve gerekçesi "her bölüm özet versin, detay tıklamayla
     açılsın" ilkesiydi. Müşterinin geri bildirimi o gerekçeyi çürüttü:
     kapalı duran şey görülmüyor, görülmeyen şey yazılmamış sayılıyor.
     Aynı düzeltme sayfada bir kez daha yapılmıştı — taahhüt sınırları
     (HOW.limits) da aynı sebeple <details> dışında duruyor.

     METİNLER FİRMANIN KENDİ RESMÎ İFADESİ. Tek harfi değişmedi ve
     değişmemeli: bunlar bizim yazdığımız pazarlama cümleleri değil. */
  /* `statementNote` SİLİNDİ (19.08.2026, müşteri isteği): "bide 'Vizyon ve
     misyon firmanın kendi resmî ifadesi; bu sayfa için yeniden yazılmadı.'
     yazma." Şerh ekrandan kalktı ama KURAL DURUYOR: aşağıdaki iki metin
     firmanın kendi resmî ifadesi, yeniden yazılmaz. Kural artık yalnız bu
     yorumda; silen bir sonraki el bunu bilerek silsin. */
  vision: {
    t: "Vizyon",
    s: "Müşterilerin bütün finansal ihtiyaç ve beklentilerini analiz ederek etkili hizmet sunmak.",
  },
  mission: {
    t: "Misyon",
    s: "Kapsamlı ve yenilikçi çözümlerle müşterilerin iş hedeflerine ulaşmasını desteklemek; müşteri memnuniyeti, güvenilirlik ve profesyonellik ilkeleriyle uluslararası standartlarda hizmet vermek.",
  },
};

/* ------------------------------------------------------------------- KÜNYE
   ---------------------------------------------------------- ARTIK AÇILIŞ DEĞİL
   Bu blok sayfanın İLK bölümüydü; şimdi son bölümünden hemen önce, iletişim
   bloğuyla aynı gri zeminde duran sessiz bir kolofon. Müşterinin itirazı
   künyenin VARLIĞINA değil, sayfayı onunla AÇMAMIZAydı ("başka bir şeyle
   giriş açalım... ama künye değil"). Açılış itirazı böylece tamamen karşılandı.

   NEDEN SİLİNMEDİ: burada duran her satır dışarıdan doğrulanabilir ve bir
   kısmı başka hiçbir yerde tam hâliyle yazmıyor. Sitenin kendi vaadi "yalnızca
   doğrulanabilir olanı yazıyoruz" ve tüzel kişiliğini hakkımızda sayfasında
   hiç yazmayan bir firma o vaadi kendi sayfasında bozmuş olurdu. Sayfanın
   sonunda, küçük puntoda, sessizce duruyor.

   ------------------------------------------- BU TURDA BİR SATIR ÇIKTI: PANEL
   "Müşteri paneli · TaxDome" satırı silindi. Müşterinin kararı: "taxdome iş
   ortağımız vb değil, sadece panel olarak kullanıyoruz, ekstra adını
   geçirmemize gereken bir durum yok." Künye firmanın KİM OLDUĞUNU söylüyor;
   hangi yazılımı açtığı oraya ait değil. /basinda-biz zaten yalnızca dört
   satırı seçiyordu (oradaki PRESS_FACT_LABELS) ve bu satır o listede hiç
   yoktu, yani o sayfada hiçbir şey değişmiyor.

   `value: ""` olan satırlar sayfada BASILMIYOR (page.tsx satırları filtreliyor).
   Boş bırakılmalarının sebebi teknik değil: bu bilgilerin webde doğrulanabilir
   bir karşılığı bulunamadı ve uydurulmadı. Değer geldiğinde satır açılıyor.

   -------------------------------------------------- TASARIM İKİNCİ KEZ DEĞİŞTİ
   METİN YİNE DEĞİŞMEDİ, SUNUM DEĞİŞTİ. Bir tur önce beyaz kutu, mavi antet
   şeridi ve filigran mühür kalkmış, yerine bir "gazete künyesi" düzeni
   gelmişti. Müşteri onu da beğenmedi ("firma künyesi kısmı da kötü bu arada
   beğenmedim daha güzel bişi çoz") ve itiraz yine YER için değil GÖRÜNTÜ için.

   Bu turda blok bir SİCİL KAYDINA çevrildi: ticari isim artık bir tablo
   satırı değil, bloğun kendi başlığı boyunda duran tek satır; kalan alanlar
   onun sağında çizgilerle ayrılmış bir kayıt listesi. Ayrıntı ve gerekçe
   hakkimizda.css · 7'de. */
export const IDENTITY = {
  heading: "Firmanın künyesi",
  /* `accent` YOK ve olmamalı: kolofon SplitWords ile değil düz bir başlıkla
     basılıyor. Bu blok artık bir bölüm açılışı değil, sayfanın dipnotu. */
  /* Eski hâli iki cümleydi ve ilki HERO.lead'in neredeyse aynısıydı — aynı
     tanım iki ekran arayla iki kez okunuyordu. Kalan tek cümle tabloyu
     tanıtıyor ve boş satırların neden görünmediğini de söylüyor. */
  lead: "Aşağıdaki satırlar firmanın resmî beyanı. Doğrulanmış karşılığı olmayan alan hiç basılmıyor.",

  /* SIRA ÖNEMLİ: ilk satır bloğun başında BÜYÜK basılıyor (page.tsx · 7),
     kalanlar onun sağındaki kayıt listesine giriyor. Sayfa satırı `label`
     ile arıyor ve bulamazsa listenin ilkine düşüyor, yani etiket bir gün
     değişse bile blok boş kalmıyor. */
  rows: [
    { label: "Ticari isim", value: "Ortac International Accounting · Ortac Global" },
    /* Dubai'deki tüzel kişilik ayrı bir satır çünkü sözleşmede, faturada ve
       banka yazışmasında karşınıza bu isim çıkıyor. Ticari isimle tüzel
       kişiliği aynı satıra sıkıştırmak, ikisinin aynı şey olduğu izlenimini
       verirdi. */
    { label: "Dubai tüzel kişiliği", value: "Ortac Accounting Services LLC" },
    /* Ayraç em dash'ten orta noktaya geçti: bu turda gelen yazım kuralı
       paragraf ve başlıklarda `—` kullanılmasını kaldırdı ve künyenin geri
       kalanı (Ticari isim, Ülkeler) zaten orta nokta kullanıyordu. */
    { label: "Yönetici ortak", value: "Murat Ortaç · Managing Partner" },
    { label: "Ülkeler", value: "KKTC · İngiltere · Dubai" },

    /* SWAP:FOUNDED — kuruluş yılı. HÂLÂ BOŞ ve bu turda da doldurulmadı.

       SÜRE GÜNCELLENDİ, YIL DEĞİL. Sitedeki ifade 17.08.2026'da müşterinin
       kendi düzeltmesiyle "30 yıllık kurumsal geçmiş" oldu ("firma hakkında
       bilgi verirken 30 yıllık şeklinde belirtelim, 22 yazan yerler var
       çünkü"). Yani sayı artık müşteri beyanı ve tarihi de belli.

       BUNDAN YİNE BİR YIL TÜRETİLMEDİ. 2026 - 30 = 1996 aritmetik olarak
       doğru ama olgu olarak uydurma: "30 yıllık" yuvarlanmış bir süre ve
       kuruluş ayı elimizde yok. Yanlış bir kuruluş yılı, yuvarlanmış bir
       süreden çok daha büyük bir hata — künyeye tarih olarak yazılıyor,
       yani doğrulanabilir bir iddiaya dönüşüyor. Boş kalan satır basılmıyor. */
    { label: "Kuruluş yılı", value: "" },
    /* SWAP:LICENCE_NO — muhasebe lisansının numarası ve veren otorite.
       Lisansın VARLIĞI doğrulanmış ve sayfada yazıyor; numarası yazılmıyor. */
    { label: "Lisans numarası", value: "" },
    /* SWAP:OFFICE_ADDRESSES — üç ofisin açık adresi. Ofislerin VARLIĞI
       doğrulanmış ve sayfada yazıyor (üç ülkede de kendi ofisimiz var);
       adresleri elimizde yok, o yüzden yazılmıyor. Etiket bu turda tekilden
       çoğula geçti: tek bir adres yazmak "yalnızca bir ofis var" derdi. */
    { label: "Ofis adresleri", value: "" },
  ],
};

/* ------------------------------------------------------------------ ÜÇ ÜLKE
   Bölümün işi coğrafya dersi vermek değil, şunu söylemek: üç ülkede de aynı
   zinciri yürütüyoruz, değişen tek şey o ülkenin kuralları.

   `line` yalnızca ORTAC'ın o ülkedeki durumunu anlatıyor. Ülkenin kendi
   künyesi (yapı, süre, fiyat) buraya kopyalanmadı; onun tek kaynağı
   lib/brand.ts · FACTS ve sayfa `structure` alanını oradan okuyor. Bir fiyat
   değiştiğinde bu dosyaya dokunmak gerekmiyor. */
export const WHERE = {
  heading: "Üç ülkede çalışıyoruz",
  accent: "Üç ülkede",
  /* Lead'e bu turda BİR CÜMLE eklendi ve sebebi olgusal: müşteri "üç ülkede de
     kendi ofisimiz var, hepsini biz yönetiyoruz" düzeltmesini yaptı. Bu, üç
     kartın eşitliğini bozan değil TAMAMLAYAN bir bilgi — o yüzden tek tek
     kartlara değil, üçünü birden kapsayan lead'e yazıldı. */
  lead: "KKTC, İngiltere ve Dubai. Üçünde de kendi ofisimiz var ve üçünü de kendimiz yürütüyoruz; zincir de aynı: kuruluş, banka dosyası, muhasebe ve uyum. Değişen, o ülkenin kuralları.",

  /* Sıra batıdan doğuya — sahnedeki üç işaretin dizilişiyle aynı, böylece
     listeyi okurken göz görselde de aynı yönde ilerliyor. */
  countries: [
    {
      slug: "ingiltere" as CountrySlug,
      line: "Companies House tescili ve sonrasında gelen beyan düzeni. Kuruluş uzaktan tamamlanabiliyor.",
      href: "/ingiltere",
    },
    {
      slug: "kktc" as CountrySlug,
      line: "Yerel tescil ve Türkiye'ye yakın operasyon. Firmanın en eski çalıştığı ülke.",
      href: "/kktc",
    },
    {
      slug: "dubai" as CountrySlug,
      /* BU SATIR BU TURDA DEĞİŞTİ. Eskiden "Kendi ofisimizin olduğu yer" diye
         başlıyordu ve Dubai'yi tek ofis gibi gösteriyordu — müşteri düzeltti,
         üç ülkede de kendi ofisimiz var. Ofis artık lead'de, üçü için birden.
         Geriye Dubai'nin GERÇEKTEN tek olduğu şey kaldı: serbest bölgeyle
         resmî iş ortaklığı (bkz. BASIS · IFZA). */
      line: "Serbest bölge başvurusu IFZA ile doğrudan yürüyor; otorite ve banka trafiği de buradan geçiyor.",
      href: "/dubai",
    },
  ],

  /* "hub" alanı ve `hubLabel: "Kendi ofisimiz"` rozeti BU TURDA SİLİNDİ.
     Rozet yalnızca Dubai kartında duruyordu ve dayanağı "kendi ofisimizin
     olduğu tek yer" iddiasıydı. O iddia yanlış çıktı: üç ülkede de kendi
     ofisimiz var. Rozeti üç karta birden koymak bir ayrım değil gürültü
     olurdu; doğru yeri bölümün lead'i ve BASIS kartı. Üç kart artık gerçekten
     eşit — bölümün tezi de zaten buydu. */

  /* Üç kartın üstüne birer fotoğraf şeridi geldi (lib/media.ts · COUNTRY_PHOTO).
     Bu satır o şeridin künyesi ve BİR İDDİA DEĞİL, iddianın reddi.

     Sebebi tek: elimizde firmanın kendi çekimi yok. Bölüm "üç ülkede de kendi
     ofisimiz var" diyor ve kartların üstünde birer şehir fotoğrafı duruyor;
     not olmasa o kareler "işte ofislerimiz" diye okunabilirdi. Stok bir kareyi
     kendi ofisi gibi göstermek, bu sayfanın baştan sona reddettiği şeyin ta
     kendisi olurdu.

     Müşterinin kendi çekimi geldiğinde media.ts'teki adresler değişecek; bu
     satır o gün silinir. */
  photoNote: "Görseller ülkeleri temsil ediyor; firmanın kendi çekimleri değil.",
};

/* ------------------------------------------------------------------- ALINTI
   Murat Ortaç'ın basına verdiği cümle, alıntı olarak. Üç alıntının üçü de
   Dubai üzerine; sayfada YALNIZCA BİRİ kullanılıyor. Üçünü birden basmak
   üç ülkeyi eşit anlatan bir sayfayı Dubai broşürüne çevirirdi.

   Seçilen cümle bilerek en betimleyici olanı. Diğer ikisi ("küresel ölçekte
   rekabet gücü", "serbest bölgeler girişimciliği teşvik ediyor") bir SONUÇ
   imâ ediyor; bu sayfa sonuç vaat etmiyor.

   SWAP:QUOTE_SOURCE — alıntının yayın adı ve tarihi. Cümlenin kendisi
   doğrulanmış, hangi yayında ve ne zaman söylendiği elimizde yok. Boş
   kaldığı sürece sayfa yalnızca "Murat Ortaç · Managing Partner" basıyor;
   değer girildiğinde künye satırı kendiliğinden uzuyor. */
export const QUOTE = {
  text: "Dünya ticaret yollarının kesişim noktasında yer alan Dubai, özellikle Asya, Avrupa ve Afrika arasındaki ticaret akışını yönetiyor.",
  who: "Murat Ortaç",
  role: "Managing Partner",
  source: "",
};

/* ------------------------------------------------------------ NEYE DAYANARAK
   Sayfanın omurgası. Dört kartın dördü de dışarıdan doğrulanabilir bir olguya
   dayanıyor; hiçbiri sıfat değil.

   Kartlarda BİLEREK olmayanlar: "uzman kadro" (uzmanlık ölçülemez), "yılların
   tecrübesi" (aynı şeyi 30 zaten söylüyor), müşteri sayısı ve başarı oranı
   (elimizde doğrulanmış rakam yok). */
export const BASIS = {
  heading: "Neye dayanarak çalışıyoruz",
  accent: "dayanarak",
  lead: "Aşağıdaki dördü de dışarıdan sorulabilir, doğrulanabilir şeyler.",

  cards: [
    {
      icon: "stamp" as AboutIcon,
      t: "Kendi muhasebe lisansımız",
      /* Somut kanıt: imzanın hangi sıfatla atıldığı. "Lisanslıyız" demek
         yerine lisansın nerede görünür olduğunu söylüyoruz. */
      s: "Yönetici ortağımız Murat Ortaç, hizmet belgelerini Certified Accountant sıfatıyla imzalıyor. Defter ve beyan taşerona gitmiyor.",
    },
    {
      icon: "handshake" as AboutIcon,
      t: "IFZA resmî iş ortağıyız",
      s: "Dubai serbest bölge başvurusu bir aracı üzerinden değil, doğrudan yürüyor.",
    },
    {
      icon: "office" as AboutIcon,
      /* BU KART BU TURDA DÜZELDİ. Eskiden "Dubai'de kendi ofisimiz" yazıyordu
         ve müşteri bunu yanlış olarak işaretledi: üç ülkenin üçünde de kendi
         ofisi var ve üçünü de kendisi yürütüyor. */
      t: "Üç ülkede de kendi ofisimiz",
      s: "KKTC, İngiltere ve Dubai: üçünü de kendimiz yürütüyoruz. Evrak, otorite ve banka trafiği uzaktan bir aracıya devredilmiyor.",
    },
    {
      icon: "history" as AboutIcon,
      /* Sitenin başka yerinde (TrustLayer · shared/Authority.tsx) geçen
         ifadenin birebir aynısı. Aynı iddianın iki sayfada iki farklı sayıyla
         çıkmaması için cümle yeniden yazılmadı, olduğu gibi alındı.

         22 → 30, 17.08.2026, müşteri düzeltmesi: "firma hakkında bilgi
         verirken 30 yıllık şeklinde belirtelim. 22 yıllık yazan yerler var
         çünkü." Aynı turda sitedeki dört kopya birden değişti (burası,
         shared/Authority.tsx ve iki lab adayı) — tek biri kalsaydı sayfalar
         arasında iki farklı süre okunurdu. */
      t: "30 yıllık kurumsal geçmiş",
      s: "Kuruluş, lisans yenileme, muhasebe, beyan ve banka dosyası; hepsi aynı çatı altında yürüyor.",
    },
  ],

  /* ------------------------------------------- ORTAKLAR: İKİ BAŞLIK BİRLEŞTİ
     Burada bir tur boyunca İKİ tanım vardı ("Resmî iş ortaklıkları" ve
     "Kullandığımız altyapı") ve sayfa listeyi o ikiye bölerek basıyordu.
     Müşteri o ayrımı kaldırdı: "bunları 2 başlıkta ayırmamıza gerek yok...
     bazılarıyla özel anlaşmalarımız var ama onu belirtmek gibi bir amacımız
     yok yani aslında hepsiyle bir iş yapıyoruz, mantık o."

     Tek tanım kaldı. Ayrımın verideki karşılığı (brand.ts · PARTNERS.group)
     DEĞİŞMEDİ ve değişmemeli: nav şeridi hâlâ yalnızca "resmi" grubunu
     basıyor ve o iddia doğrulanmış. Değişen tek şey bu sayfadaki sunum.

     Yerine gelen ayrım TÜR: banka, ödeme kuruluşu, tahsilat, serbest bölge,
     muhasebe yazılımı, borsa. Gerekçesi aşağıda, `partnerTypes` başında. */
  partners: {
    t: "Birlikte çalıştığımız kurumlar",
    s: "Kuruluş dosyasından aylık deftere kadar işin içine giren kurumlar. Başlıklar kurumun türünü söylüyor; hangi ülkede hangi kanalın açık olduğunu ülke sayfaları yazıyor.",
  },
};

/* --------------------------------------------------------- NASIL ÇALIŞIYORUZ
   Zincir (CHAIN) brand.ts'ten geliyor. Buradaki üç ilke onu tamamlıyor:
   zincir NE yapıldığını, ilkeler KİMİN yaptığını söylüyor. */
export const HOW = {
  heading: "Kuruluş bitiş değil, zincirin ilk halkası",
  accent: "zincirin ilk halkası",
  lead: "Şirketin kurulduğu gün ile ikinci yılı arasındaki her adım aynı ekipte kalıyor. Zincirin bir halkasını devretmiyoruz.",

  principles: [
    {
      icon: "team" as AboutIcon,
      t: "Taşeron değil, kendi kadromuz",
      s: "Defter, beyan ve banka dosyası başka bir firmaya devredilmiyor.",
    },
    {
      icon: "language" as AboutIcon,
      t: "Türkçe tek muhatap",
      s: "İsimli bir danışman. Kuruluş bittiğinde muhatap değişmiyor.",
    },
    {
      icon: "panel" as AboutIcon,
      /* BAŞLIKTAN MARKA ADI ÇIKTI. Eskiden "TaxDome paneli" yazıyordu;
         müşteri o adın bu sayfada geçmesini istemedi ("iş ortağımız vb değil,
         sadece panel olarak kullanıyoruz"). İlkenin kendisi aynı: takibin tek
         yerden yürümesi bir çalışma düzeni, hangi yazılımla yürüdüğü değil. */
      t: "Tek panelden takip",
      s: "Evrak, talep ve beyan takibi tek panelden yürüyor; e-posta zincirinde kaybolmuyor.",
    },
  ],

  /* Bu blok firmanın resmî duruşu ve sayfada AÇIKTA duruyor — <details>
     içine konmadı. "Özet önde, detay tıklamayla" ilkesi sırayı düzenlemek
     için var, şerhi gizlemek için değil. Taahhüt etmediğimiz şeyi bir
     tıklamanın arkasına saklamak, tam olarak bu üç maddenin engellemeye
     çalıştığı davranış olurdu. */
  limits: {
    t: "Neyi taahhüt etmiyoruz",
    s: "Aşağıdakiler pazarlama tercihi değil, firma politikası. Üçü de sitenin her yerinde aynı.",
  },
};

/* ---------------------------------------------------------------- SEKTÖRLER
   Altı sektör firmanın kendi saydığı listeyle örtüşüyor. Adresler
   lib/sectors.ts · sectorHref() ile üretiliyor; şu an yalnızca biri yayında,
   kalan beşi SmartLink tarafından sönük basılıyor. Bu KASITLI: yol haritası
   görünüyor, ölü tıklama olmuyor.

   Cümleler ana sayfadaki sektör kartlarının kısaltılmışı değil, farklı bir
   iş yapıyor: orada "bu sektörde ne satılır" yazıyor, burada "bu sektörde
   kurgunun düğümü nerede". Aynı sayfayı iki kez okumuş hissi vermesin diye. */
export const FOR_WHOM = {
  heading: "Hangi sektörlerde çalışıyoruz",
  accent: "Hangi sektörlerde",
  lead: "Altı başlık. Kurgunun düğümü her birinde başka yerde, o yüzden liste değil, ayrı ayrı sayfalar.",

  sectors: [
    { slug: "e-ticaret", label: "E-ticaret", line: "Düğüm tahsilatta: kartla ödeme ve pazar yeri hesapları." },
    { slug: "yazilim-ve-teknoloji", label: "Yazılım ve teknoloji", line: "Düğüm abonelikte: yinelenen tahsilat ve uygulama içi satış." },
    { slug: "danismanlik", label: "Danışmanlık", line: "Düğüm sözleşmede: yurt dışı müşteriye şirket adına fatura." },
    { slug: "gayrimenkul", label: "Gayrimenkul", line: "Düğüm mülkiyette: mülk şirket altında, kira şirket hesabında." },
    { slug: "finans-ve-yatirim", label: "Finans ve yatırım", line: "Düğüm izinde: faaliyet lisansa tabi, kapsam önden netleşiyor." },
    { slug: "saglik-ve-medikal", label: "Sağlık ve medikal", line: "Düğüm ruhsatta: şartlar şirket kurgusunu belirliyor." },
  ],
};

/* ------------------------------------------------------------------- TEMAS
   Sayfanın çıkışı. Kanalların tamamı şu an boş ve bu bir eksiklik değil,
   bilinçli bir karar: doğrulanmış bir telefon, e-posta veya adres elimizde
   yok, uydurulmuş bir iletişim bilgisi ise en zararlı uydurma türü — arayan
   kişi karşılık bulamıyor.

   Boş kanal sayfada basılmıyor; hepsi boşken bölümde yalnızca AskCta kalıyor
   ve o zaten sitenin tek gerçek soru kanalı (/basla formu). Değer girildiği
   anda kanallar kendiliğinden görünür oluyor.

   SWAP:CONTACT_PHONE · SWAP:CONTACT_EMAIL · SWAP:CONTACT_ADDRESS */
export type ContactKind = "phone" | "mail" | "address";
export const CONTACT = {
  heading: "Kendi durumunuzu anlatın",
  accent: "durumunuzu anlatın",
  lead: "Buradaki başlıklar genel çerçeve. Faaliyetinizi, tahsilat kanalınızı ve hedef pazarınızı anlatın; hangi ülkenin ve hangi kurgunun işinize yaradığını birlikte netleştirelim.",
  ctaLabel: "Durumumu sorayım",

  channels: [
    { kind: "phone" as ContactKind, label: "Telefon", value: "", href: "" },
    { kind: "mail" as ContactKind, label: "E-posta", value: "", href: "" },
    { kind: "address" as ContactKind, label: "Ofis", value: "", href: "" },
  ],
};

/* --------------------------------------------------------------------- SEO */
export const SEO = {
  title: "Hakkımızda — Ortac Global | Dubai, İngiltere ve KKTC",
  description:
    "Ortac Global; vergi, muhasebe, denetim ve şirket kuruluşu alanlarında çalışan uluslararası bir danışmanlık firması. KKTC, İngiltere ve Dubai'de faaliyet gösteriyor.",
};

/* Ülkenin yapısal künyesi tek kaynaktan: FACTS. Sayfa bu yardımcıyı çağırıyor
   ki brand.ts'teki bir düzeltme buraya da yansısın. */
export const structureOf = (c: CountrySlug) => FACTS[c].structure;

/* ============================================================================
   ORTAK KURUMLAR · TÜRE GÖRE GRUPLAMA
   Kullanan: page.tsx · 4. bölüm · Biçim: hakkimizda.css · 4

   -------------------------------------------------------------- KARAR VE NEDEN
   Müşteri iki şey söyledi. Birincisi kesin: resmî ortaklık ile kullandığımız
   altyapı ekranda AYRI İKİ BAŞLIK olmayacak ("2 başlıkta ayırmamıza gerek yok...
   aslında hepsiyle bir iş yapıyoruz"). İkincisi açık uçlu: "bunlardan bazıları
   ödeme altyapıları, bazıları banka, bazıları ise serbest bölge ve muhasebe
   yazılımı fln. bunları nasıl katagorize edip koyarız bilmiyorum."

   Cevap: TÜRE GÖRE. Üç seçenek arasından seçildi.

     · Tek şerit (hiç gruplama yok) elendi. On iki kurum tek sırada akınca bir
       banka ile bir muhasebe yazılımı aynı şey gibi okunuyor; ziyaretçi
       "bunlar da kim" diye soruyor ve listenin bir bilgi değeri kalmıyor.
     · Hizmet zincirine göre (kuruluş → banka → muhasebe) elendi. Zincir
       sayfada zaten iki kez var (bento ve 5. bölüm) ve üçüncü kez tekrarı
       bilgi katmıyordu; üstelik on iki kurumun sekizi tek halkaya yığılıyor.
     · TÜRE GÖRE seçildi. Kurumun türü kamuya açık ve doğrulanabilir bir
       olgu — bizim onunla ilişkimiz hakkında hiçbir şey söylemiyor. Yani
       müşterinin kaldırmak istediği ayrımı (ilişkinin derecesi) ekrandan
       tamamen çıkarırken, listeyi okunur kılan ayrımı (kurum ne iş yapıyor)
       koruyor. Banka ile ödeme kuruluşunun ayrı durması ayrıca sitenin başka
       yerinde de böyle: brand.ts · PAY_MATRIX aynı üç başlığı kullanıyor.

   -------------------------------------------------- ROL EKRANDA YAZMIYOR, TÜR YAZIYOR
   Grup başlığı türü zaten söylediği için satırlarda rol metni basılmıyor,
   yalnızca markanın kendi logosu duruyor. Bunun ikinci bir faydası var ve asıl
   sebep o: IFZA'nın rolü veride "Serbest bölge · resmî iş ortağı" ve o son
   yarısı ekrana çıksaydı, müşterinin tam olarak istemediği şey geri gelirdi —
   listede bir satır "ötekilerden farklı" olurdu. Ayraçtan sonrası bu yüzden
   burada kesiliyor. Veri değişmiyor: nav şeridi aynı rolü tam hâliyle okumaya
   devam ediyor ve "IFZA resmî iş ortağıyız" olgusu sayfada zaten kendi
   dayanak kartında yazıyor (BASIS.cards). */

/* Grup sırası. Sitenin kendi zinciri: önce şirket nerede kurulur, sonra para
   nereye gelir, en sonda defter nerede tutulur. Listede olmayan bir tür
   sıranın SONUNA düşüyor — brand.ts'e yeni bir rol girdiğinde satır kayboluyor
   değil, görünür bir yerde bekliyor. */
export const PARTNER_TYPE_ORDER = [
  "Serbest bölge",
  "Banka",
  "Ödeme kuruluşu",
  "Tahsilat",
  "Kripto varlık borsası",
  "Muhasebe yazılımı",
];

/* Aynı işi anlatan iki rol tek satırda toplanıyor. "Tahsilat altyapısı"
   (Stripe) ile "Tahsilat" (PayPal, wamo) ziyaretçi için aynı kutu: kartla
   para tahsil ettiğin yer. Veride ayrı kalıyorlar çünkü orada doğru. */
const PARTNER_TYPE_ALIAS: Record<string, string> = {
  "Tahsilat altyapısı": "Tahsilat",
};

/* Bu sayfada HİÇ basılmayan roller.
   "Müşteri paneli" = TaxDome. Müşterinin kararı: "taxdome iş ortağımız vb
   değil, sadece panel olarak kullanıyoruz, ekstra adını geçirmemize gereken
   bir durum yok." Ad yerine ROL eleniyor: brand.ts'teki satıra dokunulmuyor
   (accountingDubai.ts o rolü okuyor ve dize değiştirilemez) ama bu sayfada
   karşılığı olan grup hiç kurulmuyor. */
const PARTNER_TYPE_HIDDEN = ["Müşteri paneli"];

export type PartnerTypeGroup = { type: string; names: string[] };

/** PARTNERS'ı türüne göre gruplayıp ekran sırasına diziyor. */
export function partnerTypes(partners: { name: string; role: string }[]): PartnerTypeGroup[] {
  const byType = new Map<string, string[]>();

  for (const p of partners) {
    /* Ayraçtan öncesi TÜR, sonrası İLİŞKİ. Bu sayfa yalnızca türü basıyor. */
    const base = p.role.split("·")[0].trim();
    const type = PARTNER_TYPE_ALIAS[base] ?? base;
    if (PARTNER_TYPE_HIDDEN.includes(type)) continue;

    const row = byType.get(type);
    if (row) row.push(p.name);
    else byType.set(type, [p.name]);
  }

  /* Bilinmeyen tür sıranın sonuna. Array.prototype.sort kararlı olduğu için
     aynı sıraya düşen iki tür veri sırasını koruyor. */
  const rank = (t: string) => {
    const i = PARTNER_TYPE_ORDER.indexOf(t);
    return i === -1 ? PARTNER_TYPE_ORDER.length : i;
  };

  return [...byType.entries()]
    .map(([type, names]) => ({ type, names }))
    .sort((a, b) => rank(a.type) - rank(b.type));
}
