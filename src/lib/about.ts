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
   (title.endsWith(accent)), o yüzden vurgu son kelimelerde. */
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
  lead: "Vergi, muhasebe ve şirket kuruluşunda uluslararası danışmanlık: KKTC, İngiltere ve Dubai. Bu sayfada firmayla ilgili yalnızca doğrulanabilir olanı yazıyoruz — kim olduğumuzu, nerede çalıştığımızı ve neye dayanarak çalıştığımızı.",
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

   Kutucuğun sağındaki SVG sahnesi de `k` ile seçiliyor; sahnelerin kendisi
   page.tsx'in yanındaki SummaryArt.tsx'te duruyor. Buraya bir bileşen
   girmiyor, çünkü bu dosya React'ten bağımsız kalmalı (bkz. AboutIcon). */
export type SummaryKey = "where" | "chain" | "sectors";
export const SUMMARY: { k: SummaryKey; label: string }[] = [
  { k: "where", label: "ülke" },
  { k: "chain", label: "halkalı zincir" },
  { k: "sectors", label: "sektör" },
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
   "sektör lideri" türü sıfatlar burada da YOK. */
export const OPENING = {
  heading: "Kim olduğumuz",
  accent: "olduğumuz",
  lead: "Üç ülkede çalışan tek bir ekip. Aşağıda ne yaptığımızı ve neyi hedeflediğimizi firmanın kendi ifadesiyle yazdık; her iddianın dayanağı sayfanın devamında tek tek duruyor.",

  /* İki paragraf, ikisi de kısa. Uzun bir "hakkımızda" metni bu sayfanın
     baştan sona reddettiği şey ("anlatma, göster") — ama müşteri haklıydı,
     firmanın ne yaptığını düz cümleyle söyleyen tek bir satır bile yoktu.
     Birincisi işin NE olduğunu, ikincisi neye dayandığını söylüyor. */
  body: [
    "Şirket kurmak tek bir işlem değil: tescil, banka hesabı, defter, beyan, uyum ve lisans yenilemesi diye uzayan bir sıra. Ortac Global bu sıranın tamamını üstleniyor — KKTC, İngiltere ve Dubai'de, aynı ekiple ve Türkçe.",
    /* OFİS İDDİASI BU TURDA DÜZELDİ. Burada bir tur boyunca "Dubai'de kendi
       ofisimiz" yazıyordu ve müşteri bunu yanlış olarak işaretledi: "bizim tüm
       ülkelerde kendi ofisimiz var hepsini biz yönetiyoruz... taktın sadece
       dubaiye yazma şu olayı." Üç ülkenin üçünde de firmanın kendi ofisi var
       ve üçünü de kendisi yürütüyor. */
    "Bunun arkasında üç somut şey var: kendi muhasebe lisansımız, Dubai serbest bölgesiyle resmî iş ortaklığımız ve üç ülkenin üçünde de kendi ofisimiz. Üçü de aşağıda tek tek yazıyor; hiçbiri ölçülemeyen bir sıfat değil.",
  ],

  /* Fotoğrafın künyesi. Ülke kartlarındaki `WHERE.photoNote` ile aynı işi
     yapıyor ve aynı sebeple var: elimizde firmanın kendi ekip çekimi yok.
     Bir stok kareyi "işte ekibimiz" diye göstermek yanlış beyan olurdu.
     Müşterinin kendi çekimi geldiğinde media.ts'teki adres değişecek ve bu
     satır o gün silinir. */
  photoNote: "Fotoğraf temsilî; firmanın kendi ekip çekimi değil.",

  /* Vizyon ve misyon ARTIK AÇIKTA. Bir tur önce <details> içinde kapalı
     duruyorlardı ve gerekçesi "her bölüm özet versin, detay tıklamayla
     açılsın" ilkesiydi. Müşterinin geri bildirimi o gerekçeyi çürüttü:
     kapalı duran şey görülmüyor, görülmeyen şey yazılmamış sayılıyor.
     Aynı düzeltme sayfada bir kez daha yapılmıştı — taahhüt sınırları
     (HOW.limits) da aynı sebeple <details> dışında duruyor.

     METİNLER FİRMANIN KENDİ RESMÎ İFADESİ. Tek harfi değişmedi ve
     değişmemeli: bunlar bizim yazdığımız pazarlama cümleleri değil. */
  statementNote: "Vizyon ve misyon firmanın kendi resmî ifadesi; bu sayfa için yeniden yazılmadı.",
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
   kısmı başka hiçbir yerde tam hâliyle yazmıyor. /basinda-biz künyeyi zaten
   basıyor ama gazetecinin işine yarayan DÖRT satırı seçiyor (bkz. oradaki
   PRESS_FACT_LABELS) — "Müşteri paneli · TaxDome" o listede yok. Daha
   önemlisi: sitenin kendi vaadi "yalnızca doğrulanabilir olanı yazıyoruz" ve
   tüzel kişiliğini hakkımızda sayfasında hiç yazmayan bir firma o vaadi kendi
   sayfasında bozmuş olurdu. Sayfanın sonunda, küçük puntoda, sessizce duruyor.

   `value: ""` olan satırlar sayfada BASILMIYOR (page.tsx satırları filtreliyor).
   Boş bırakılmalarının sebebi teknik değil: bu bilgilerin webde doğrulanabilir
   bir karşılığı bulunamadı ve uydurulmadı. Değer geldiğinde satır açılıyor.

   -------------------------------------------------- BU TURDA TASARIMI DEĞİŞTİ
   METİN DEĞİŞMEDİ, SUNUM DEĞİŞTİ. Müşteri bloğun YERİNİ değil görüntüsünü
   reddetti: "en alta firma künyesi kısmı yapmışsın onun tasarımını daha iyi
   yapabilirsin çok dandik duruyor." Kalkan üç şey: mavi antet şeridi (renkli
   kenar şeridi bu turda sitede yasak), filigran mühür ve satırları taşıyan
   beyaz kutu. Yerine bir gazete künyesi düzeni geldi (hakkimizda.css · 7).
   Ayrıntı ve gerekçe orada. */
export const IDENTITY = {
  heading: "Firmanın künyesi",
  /* `accent` YOK ve olmamalı: kolofon SplitWords ile değil düz bir başlıkla
     basılıyor. Bu blok artık bir bölüm açılışı değil, sayfanın dipnotu. */
  /* Eski hâli iki cümleydi ve ilki HERO.lead'in neredeyse aynısıydı — aynı
     tanım iki ekran arayla iki kez okunuyordu. Kalan tek cümle tabloyu
     tanıtıyor ve boş satırların neden görünmediğini de söylüyor. */
  lead: "Aşağıdaki satırlar firmanın resmî beyanı. Doğrulanmış karşılığı olmayan alan hiç basılmıyor.",

  rows: [
    { label: "Ticari isim", value: "Ortac International Accounting · Ortac Global" },
    /* Dubai'deki tüzel kişilik ayrı bir satır çünkü sözleşmede, faturada ve
       banka yazışmasında karşınıza bu isim çıkıyor. Ticari isimle tüzel
       kişiliği aynı satıra sıkıştırmak, ikisinin aynı şey olduğu izlenimini
       verirdi. */
    { label: "Dubai tüzel kişiliği", value: "Ortac Accounting Services LLC" },
    { label: "Yönetici ortak", value: "Murat Ortaç — Managing Partner" },
    { label: "Ülkeler", value: "KKTC · İngiltere · Dubai" },
    { label: "Müşteri paneli", value: "TaxDome" },

    /* SWAP:FOUNDED — kuruluş yılı. Sitede "22 yıllık kurumsal geçmiş" ifadesi
       var (müşteri beyanı) ama bundan bir yıl TÜRETİLMEDİ: 22 sayısının hangi
       tarihte söylendiği belli değil ve yanlış bir yıl, doğru bir süreden çok
       daha büyük bir hata. */
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
   tecrübesi" (aynı şeyi 22 zaten söylüyor), müşteri sayısı ve başarı oranı
   (elimizde doğrulanmış rakam yok). */
export const BASIS = {
  heading: "Neye dayanarak çalışıyoruz",
  accent: "dayanarak",
  lead: "Bu bölümde tek bir ölçülemeyen sıfat yok. Dördü de dışarıdan sorulabilir, doğrulanabilir şeyler.",

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
      s: "KKTC, İngiltere ve Dubai — üçünü de kendimiz yürütüyoruz. Evrak, otorite ve banka trafiği uzaktan bir aracıya devredilmiyor.",
    },
    {
      icon: "history" as AboutIcon,
      /* Sitenin başka yerinde (TrustLayer) geçen ifadenin birebir aynısı.
         Aynı iddianın iki sayfada iki farklı sayıyla çıkmaması için cümle
         yeniden yazılmadı, olduğu gibi alındı. */
      t: "22 yıllık kurumsal geçmiş",
      s: "Kuruluş, lisans yenileme, muhasebe, beyan ve banka dosyası — hepsi aynı çatı altında yürüyor.",
    },
  ],

  /* Ortak listesi buraya kopyalanmıyor; sayfa brand.ts · PARTNERS'ı okuyor.
     Buradaki iki satır yalnızca o iki grubun NE ANLAMA geldiğini söylüyor —
     "resmî iş ortağı" ile "kullandığımız yazılım" arasındaki fark, aynı
     şeritte akarlarsa kaybolur. */
  partners: {
    t: "Resmî iş ortaklıkları",
    s: "Başvuru ve hesap sürecinde adımızın karşı tarafta kayıtlı olduğu kurumlar.",
  },
  infra: {
    t: "Kullandığımız altyapı",
    s: "İşi yürütürken kullandığımız araçlar. Resmî ortaklık değil, çalışma düzeni.",
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
      t: "TaxDome paneli",
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
  lead: "Altı başlık. Kurgunun düğümü her birinde başka yerde — o yüzden liste değil, ayrı ayrı sayfalar.",

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
