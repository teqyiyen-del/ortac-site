import Hero from "@/components/Hero";
import HeroPortalP1 from "@/components/lab/HeroPortalP1";
import HeroPortalP2 from "@/components/lab/HeroPortalP2";
import HeroPortalP3 from "@/components/lab/HeroPortalP3";
import HeroPortalP4 from "@/components/lab/HeroPortalP4";
import HeroPortalP5 from "@/components/lab/HeroPortalP5";

/* /lab/hero-portal — hero sahnesinin "portal" okumaları.
 *
 * ------------------------------------------------------------------ İSTEK
 * Müşterinin ortağının cümlesi birebir şu: "Hero da bir şeyler eksik, Dubai
 * vesaire iyi hoş ta bunu biraz daha portal kafasında ilerletip işte seçince
 * portal kafasında olmasını sağlayabiliriz bence işte dubai seçince
 * burjkhalifa gözüksün gibi gibi."
 *
 * İçindeki iki ayrı istek ayrıştırıldı, çünkü ikisi ayrı şeyler:
 *   (a) SEÇİM BİR EŞİĞE BAKMA HİSSİ VERSİN — "portal kafası".
 *   (b) SEÇİLEN ÜLKENİN KENDİSİ KARŞIYA ÇIKSIN — "Burj Khalifa gözüksün".
 * Bugünkü hero (a)'yı zaten yapıyor: üç kapılı bir sokak, seçilen kapının
 * ışığı yanıyor. Eksik olan (b): ülke yalnızca ışığın RENGİYLE anlatılıyor,
 * kendi biçimiyle değil. Üç aday da (b)'yi getiriyor; ayrıştıkları yer
 * PORTALIN NE OLDUĞU.
 *
 * ÜÇÜ AYNI FİKRİN ÜÇ TONU DEĞİL, ÜÇ AYRI OKUMA:
 *   P1  portal = İÇİNDEN BAKILAN AÇIKLIK   (kapı sabit, arkasındaki ülke değişir)
 *   P2  portal = İÇİNDEN GEÇİLEN KORİDOR   (derinlik; ışık öbür taraftan gelir)
 *   P3  portal = ÜLKENİN GEÇTİĞİ SINIR     (kütle halkayı kırıp bu tarafa çıkar)
 *
 * -------------------------------------------------------------- ÇERÇEVE
 * Dört bölümün dördü de src/components/Hero.tsx'i, yani canlıdaki hero'nun
 * kendisini basıyor; değişen tek şey `scene` propu. Hero'nun bir kopyasını
 * çıkarmak en kötü seçenekti: kopya ilk gün birebir, üçüncü gün yalan olur ve
 * müşteri hero'yu değil hero taklidini değerlendirmeye başlar. Başlık, alt
 * satır, buton ölçüleri, boşluk ritmi (--hero-s/m/l) ve 100dvh'lik ilk ekran
 * şartı burada ana sayfadaki ne ise odur.
 *
 * EN ÜSTTEKİ BÖLÜM TABAN: propsuz <Hero /> çağrısı, yani BUGÜN CANLIDA NE
 * VARSA O (HeroScene · .hsc-). Tek satırı değiştirilmedi, yalnızca okundu.
 * Adaylar ancak tabanla yan yana anlam taşıyor: soru "bu güzel mi" değil,
 * "bugünkünden daha mı iyi".
 *
 * ÜST BARIN YOKLUĞU KASITLI. Hero'nun tepesindeki boşluk sabit navigasyon
 * çubuğu için ayrılan yer ve o boşluk duruyor, yani başlığın ekranda oturduğu
 * yükseklik doğru. Çubuğun kendisi basılmıyor: Nav position:fixed ve dört
 * hero alt alta dururken tek bir sabit çubuk aşağıdakilerin üstüne yapışırdı.
 *
 * ÜLKE SEÇİMİ HEPSİNDE ORTAK. Seçiciler zustand'daki tek mağazayı sürüyor,
 * yani bir adayda İngiltere'ye geçmek ötekileri de İngiltere'ye alıyor.
 * Bilerek bozulmadı: karşılaştırma ancak bütün sahneler aynı ülkeyi
 * gösterirken adil.
 *
 * ------------------------------------------------------------- 2. TUR · P4
 * Müşterinin cümlesi birebir: "portal olayı için p1 iyi ama p2 deki gibi
 * dışına doğru çizgiler yanarak ilerliyor ya daha bi portl hissi veriyor p1 e
 * onu ekleyebiliriz sanki ama bi alana sıkıştırıp pat diye kesmek de
 * istemiyorum pek p3 de o hoşuma gitmedi."
 *
 * ------------------------------------------------------------- 3. TUR · P5
 * Müşterinin cümlesi birebir: "portalı beğenmedim p2 daha iyi geliyor hala
 * sadece sınırlandırmayıp çizgileri rahat bırak ama üste doğru baya
 * taşacakları için soluklaşıp giderler yazıların arkasına doğru fln. gerekirse
 * arkadaki gridi kaldırırız fln. kapının tipi ülkeye göre değişiyordu ya
 * şuanki live da olan halinde, onu yine yapsak çok mu karmaşık olur? bide
 * kapının alt kısmında ışık süzmesi olsun ya p1 deki gibi fln o hoş duruyor
 * ışık saçıyor diye."
 *
 * TABAN DEĞİŞTİ: "portalı beğenmedim" P4'ü eliyor, "p2 daha iyi geliyor" yeni
 * tabanı söylüyor. SIRALAMA BUNA GÖRE: taban en üstte, hemen ardından P2 (yeni
 * taban, belirgin işaretli), sonra yeni aday P5, sonra ışık süzmesinin geldiği
 * referans P1, en altta elenen ikisi (P3 ve P4).
 *
 * ELENEN ADAY SİLİNMİYOR. Bir sahne "beğenmedim" diye dosyadan atılmıyor:
 * karar kaydı sayfanın kendisi ve iki hafta sonra "şu yankılı olan neydi" diye
 * sorulduğunda ekranda duruyor olmalı. Elenmişlik rozette ve bölümün başındaki
 * notta yazılı, bölüm de sayfanın sonuna alınıyor.
 */

type Card = {
  id: string;
  anchor: string;
  kind: string;
  Scene?: () => React.ReactElement;
  /* Bölümün durumu. "ex" elenmiş adayı soluklaştırıp rozetine not düşüyor,
     "base" o turun tabanını işaretliyor. */
  state?: "ex" | "base";
  /* Elenme gerekçesi, müşterinin kendi cümlesiyle. Kart başına ayrı, çünkü
     iki aday iki ayrı cümleyle elendi. */
  exNote?: string;
  read: string;
  cost: string;
  pick: string;
  /* Adayın nereden ne aldığı ve hangi kısıtı nasıl çözdüğü. Kart metinlerinden
     ayrı duruyor: bunlar yorum değil, sorulan sorulara verilen cevap. */
  kunye?: [string, string][];
  /* Sarmalayıcıya eklenen sınıf. Yalnız P5 kullanıyor: o adayın çizgileri
     hero'nun metnine kadar çıktığı için yığın sırası ve ızgara yalnız o
     bölümde değişiyor (kurallar css/lab-ptl5.css · BÖLÜM 2). */
  host?: string;
};

const CARDS: Card[] = [
  {
    id: "TABAN",
    anchor: "taban",
    kind: "Bugün canlıda · eşik ve tabela",
    read:
      "Üç kapılı bir sokak cephesi. Ülke seçilince duvar yatayda kayıp o kapıyı ortaya alıyor ve yalnız onun ışığı yanıyor. Portal fikri zaten burada, ama ülke yalnızca ışığın rengiyle ve tabeladaki adla anlatılıyor.",
    cost:
      "Eksik olan tek şey ortağın işaret ettiği şey: kapının arkasında ülkenin kendisi yok. Üç kapı da aynı boş açıklığa bakıyor.",
    pick: "Duvar kayıyor, seçilen kapının ışığı yanıyor, tabeladaki ülke adı ve satır değişiyor.",
  },
  {
    id: "P2",
    anchor: "aday-p2",
    kind: "Portal = içinden geçilen koridor · BU TURUN TABANI",
    Scene: HeroPortalP2,
    state: "base",
    read:
      "Portal bir yüzey değil bir derinlik: üst üste beş eşik, hepsi aynı kaçış noktasına gidiyor ve ülke koridorun sonunda duruyor. Işık da o uçtan çıkıp size doğru geliyor, halkalar sırayla uzaktan yakına yanıyor. Hareket sitedeki ortak \"aktarım\" kalıbı, yani yeni bir mekanizma yazılmadı.",
    cost:
      "Ülke en küçük burada: koridorun sonundaki açıklık sahnenin dörtte biri, yani Burj Khalifa P1'dekinin üçte biri boyunda. En soyut duran aday bu. Ve asıl kısıt bu turun konusu: koridor sahne kutusundan büyük olduğu için kutu onu kırpıyor: 1440x900'de çizimin yalnızca 127 birimlik bir bandı görünüyor, en yakın halkanın tepesi çoktan kesilmiş durumda.",
    pick:
      "Koridorun sonundaki ülke derinlikten büyüyerek geliyor, en uçtaki halkanın kenarı o ülkenin ışığına dönüyor ve dalganın taşıdığı renk değişiyor: seçim koridorun tamamını yeniden renklendiriyor.",
  },
  {
    id: "P5",
    anchor: "aday-p5",
    kind: "P2'nin koridoru, kutusundan çıkmış hâli",
    Scene: HeroPortalP5,
    host: "ptl5-host",
    kunye: [
      [
        "Çizgiler nasıl serbest bırakıldı",
        "Yeni çizgi eklenmedi, KIRPMA kaldırıldı. P2'nin koridoru zaten sahne kutusundan büyüktü; onu kutuya sığdıran şey sahnenin kırpması ve SVG'nin görüntü kapısıydı. Çizim şimdi sahne kutusunun beş katı yükseklikte bir katmanda duruyor ve halkalar yukarı doğru serbestçe çıkıyor. Üstüne, koridorun ağzından dışarı devam eden üç yankı daha eklendi, dalga da onlara devam ediyor, yani ışık koridorun sonundan çıkıp yanınızdan geçip gidiyor. Katmanın ölçeği sahnenin ölçeğiyle birebir aynı (kutu da tuval de tam beş katı, aynı merkezde); dört ekran ölçüsünde ölçüldü, koridor bir piksel kaymıyor.",
      ],
      [
        "Yazının arkasında kontrast ne oldu",
        "Sönme kırpma değil gradyan: katmanın tamamı dikey bir maskeden geçiyor ve ölçülen opaklık sahnenin içinde 1.00, sahnenin 80px üstünde 0.78, butonların bittiği hizada 0.28, alt satırın üstünde 0.10, başlığın gövdesinde 0.045, sonra sıfır. Ardışık iki piksel arasındaki en büyük fark 0.009, yani 255'te iki tık; bantlaşma eşiği 0.0039 ve hiçbir yerde kırpma kenarı yok. Seçicinin arkasında maskenin ikinci katmanı bir gölge havuzu açıyor, çünkü orada gri küçük yazılar var. En kötü kare, yani hareket durdurulup sekiz halkanın hepsi aynı anda en parlak ülkenin (KKTC) en parlak rengine sabitlenmiş hâli, dört ekran ölçüsünde ölçüldü: h1 aksanı 6.17-6.52:1, h1 beyazı 17.18-18.64:1, alt satır 6.27-7.51:1, seçicinin gri adı 5.77-5.80:1. AA sınırı 4.5:1 ve karşılaştırma için P1/P2/P3'te h1 aksanı 5.71-6.29:1. Yani çizgiler yazının arkasına girdiği hâlde başlık bugünkü adaylardan daha kötü durumda değil. Yankı düzeltmesi bu tabloyu bozmadı: aynı tarayıcıda düzeltme öncesi ve sonrası ölçüldü, sapma ±1.1 basamak ve iki yöne birden (yedi düz kiriş kalkınca başlığın arkasından ekranı boydan boya kesen mürekkep gitti, yerine merkeze yakın eğri taçlar geldi).",
      ],
      [
        "Izgara kararı",
        "Kaldırılmadı, kısıldı. Ölçüm, aynı kutuda dört ayarda, boyanmış pikselin en parlağı: yalnız ızgara tam güçte rgb(20,20,20); yalnız yankı, dinlenirken rgb(17,17,17); yani ızgara tam güçteyken dıştaki kemerlerden DAHA PARLAK ve onları yutuyordu. Yankıyı parlatmak başlığın ve seçicinin arkasındaki kontrastı bozuyordu, ızgarayı komple kaldırmak da istenenden büyük bir değişiklikti. Izgara bu bölümde 0.55 opaklıkta, yani rgb(15,15,15): dinlenen kemerin altına düşüyor, dalga geçerken kemer rgb(33,33,33)'e çıkıyor ve arada iki kat fark oluyor. Zemin dokusu duruyor, çizgilerin önüne geçmiyor. Kaldırma izni duruyor: tek bir kural silinince ızgara aynen canlıdaki gibi geri gelir.",
      ],
      [
        "Ülkeye göre kapı: cevap",
        "Karmaşık değil, yapıldı. Canlıda ülkeye göre değişen dört parça var: kemer profili, ışığın gradyanı, ışığın üstündeki desen (Dubai'nin kafesi, İngiltere'nin yelpaze çıtaları) ve duvara oyulmuş kasa. Buraya KEMER PROFİLİ taşındı: Dubai sivri, İngiltere yuvarlak başlı ve taşkın kornişli, KKTC basık kemerli, düz kirişli ve payandalı bir taş portal. DESEN VE KASA TAŞINMADI, çünkü ağzın içi zaten ülkenin kendisi: oraya bir kafes ya da yelpaze koymak tam olarak görülmesi istenen şeyin, yani Burj Khalifa'nın, Tower Bridge'in ve Beşparmak'ın üstünü örtüyor. Ağız temiz bırakıldı.",
      ],
      [
        "Bug düzeltmesi: kapı ülkenin, yankı herkesin",
        "Şikâyet birebir şuydu: Dubai'de çizgiler düzgün, İngiltere ile KKTC'de oval çizgilerin yerinde kare şeyler var. Teşhis: profil sekiz halkanın hepsine birden uygulanıyordu, yani yankının biçimi kapının biçiminden türüyordu ve kapı düzleştikçe yankı da düzleşiyordu. 1440x900'de görünen kutuda sayıldı: Dubai'de 0 düz yatay, İngiltere'de 7, KKTC'de 7 düz yatay ve hizanın üstünde 10 dikme, yani beş tam dikdörtgen çerçeve. Kirişlerin boyu da tuvali aşıyordu (en büyüğü 1889 birim, tuval 720), yani o çizgiler ekranı boydan boya kesiyordu. Düzeltme: yankı artık kapıdan ayrı tek bir şekil ve o şekil Dubai'nin bugünkü eğrisinin ta kendisi, çünkü beğenilen hâl o. Sonuç, aynı kutuda: düz yatay 7'den 1'e, KKTC'de dikey 20'den 12'ye indi ve kalanlar kapının kendi lentosu ile payandaları. Yankının yol uzunlukları artık üç ülkede birebir aynı (447.4 · 609.8 · 827.7 · 1118.5 · 1511.6 · 2042.6 · 2760.4), ağzınki ise hâlâ ülkeye göre ayrı (330.1 · 553.5 · 608.3). Dubai hiç değişmedi: sekiz yolunun sekizi de harf harf eskisi. Bağ da kopmadı, çünkü bütün halkalar hâlâ tek kaçış noktasına göre homotetik, ülkenin kemeri yankının ilk halkasının içinde kalıyor ve dalga hâlâ kapıdan başlayıp dışa gidiyor.",
      ],
    ],
    read:
      "P2'nin koridoru aynen duruyor, yalnız artık bir kutunun içinde değil: halkalar yukarı doğru serbestçe çıkıyor, butonların arasından geçiyor ve başlığa varmadan sönüyor. Dalga da koridorun ağzından çıkıp dışarı devam ediyor. Kemerin biçimi ülkeye göre değişiyor, koridorun tabanına ağzın altından ışık süzülüyor.",
    cost:
      "Sahne artık hero'nun tamamına yayılıyor, yani \"sahne şurada biter\" diye bir çizgi kalmıyor: kompozisyon P2'den daha az sakin. İkinci bedel maskenin kendisi: yukarı taşan mürekkep saydamlaşıyor, oysa bu depoda kural koyu yüzeyde alfa kullanmamak. Kural burada bilerek esnetildi, çünkü sönen şey bir yüzey değil koridordan çıkan ışık; sahnenin içinde maske hâlâ tam 1. Üçüncüsü: bu bölümde hero'nun ızgarası kısılıyor.",
    pick:
      "Koridorun sonundaki ülke derinlikten büyüyerek geliyor ve KAPININ BİÇİMİ değişiyor: Dubai'de sivri kemer, İngiltere'de yuvarlak baş ve korniş, KKTC'de basık kemerli taş portal. Dışarı yayılan yankı üç ülkede de aynı oval kalıyor, yani değişen şey mimari, sahnenin dili değil. Dalganın taşıdığı renk, ağzın kenarı, tabana süzülen ışık ve tabela da o ülkeye geçiyor.",
  },
  {
    id: "P1",
    anchor: "aday-p1",
    kind: "Portal = içinden bakılan açıklık · ışık süzmesi buradan geldi",
    Scene: HeroPortalP1,
    read:
      "Kapı tek ve hiç değişmiyor; arkasındaki ülke değişiyor. Siz kıpırdamıyorsunuz, kasa kıpırdamıyor, açıklıkta seçtiğiniz ülkenin göğü ve kendi silueti duruyor: Dubai'de Burj Khalifa, İngiltere'de Tower Bridge, KKTC'de Beşparmak sırtı ve Girne kalesi. Bu turda referans olarak duruyor: eşiğin altından taşan ışık P5'e buradan alındı.",
    cost:
      "Üç kapılı sokak gidiyor, yani \"diğer ülkeler de orada, sönük duruyor\" bilgisi kayboluyor. Ve bugünkü sahnenin yazılı kararlarından biri tersine çevriliyor: şehir silueti bilerek elenmişti, burada geri geliyor. Karşılığında tanınma anında oluyor.",
    pick:
      "Açıklık bir an kararıyor, giden ülke seçim yönünün tersine kayarak siliniyor, gelen ülke yerine oturuyor. Eşikten taşan ışık ve tabela o ülkenin rengine geçiyor.",
  },
  {
    id: "P3",
    anchor: "aday-p3",
    kind: "Portal = ülkenin geçtiği sınır",
    Scene: HeroPortalP3,
    state: "ex",
    exNote: "p3 de o hoşuma gitmedi",
    read:
      "Zemine oturmuş bir halka, içi seçilen ülkenin göğüyle dolu, ve o ülkenin kütlesi halkayı kırıp bu tarafa geçiyor. Sınırın içinde kalan parça ışığa karşı düz bir siluet, dışına taşan parça bizim karanlığımızda duran ve yalnız kenarı ışık almış bir kütle. Üç ülke üç ayrı yönden geçiyor: Dubai dikey, İngiltere yatay, KKTC alçak ve geniş.",
    cost:
      "Çerçevenin bütünlüğü gidiyor: halkanın sınırı her ülkede başka yerden kırılıyor, yani P1'in sakinliği yok. Sahnede \"şirketinizin kapısı\" okuması da kalmıyor, çünkü bu portal bir kapı değil bir halka. Dikey yer isteyen aday da bu.",
    pick:
      "Halkanın içindeki gökyüzü, kenarını dolaşan parlak yay ve zemindeki ışık havuzu o ülkenin rengine geçiyor; sınırı aşan kütle komple değişiyor, yani sahnenin silueti bile başka oluyor.",
  },
  {
    id: "P4",
    anchor: "aday-p4",
    kind: "P1'in kapısı + P2'nin çizgileri",
    Scene: HeroPortalP4,
    state: "ex",
    exNote: "portalı beğenmedim p2 daha iyi geliyor hala",
    kunye: [
      [
        "P1'den ne alındı",
        "Her şey: kasa, açıklık, ülke çizimi, tabela, seçim mantığı ve geçişin kendisi birebir P1. Tek değişen ölçü, kapının sahne yüksekliğine oranı; gerekçesi aşağıda.",
      ],
      [
        "P2'den ne alındı",
        "Yalnız davranış: sıradaki halkanın yanıp bir sonrakine devretmesi. P2'nin koridoru, kaçış noktası ve derinlik kurgusu gelmedi. Yön de ters çevrildi, çünkü burada ışığın kaynağı koridorun sonu değil kapının kendisi: dalga kapının ışık kenarında başlıyor ve dışa doğru gidiyor.",
      ],
      [
        "Kesim sorunu nasıl çözüldü",
        "Üç ayrı güvenceyle. Bir: bütün mürekkep tuvalin içinde, yani çizim hiçbir ekran ölçüsünde kırpılmıyor. İki: yankı katmanının tamamı kutusuna içten teğet bir elips gradyanıyla maskeleniyor ve ışık kenara varmadan sönüyor; dıştaki halkaların ayakları zemine değmeden dağılıyor. Üç: yankı kutusu sahnenin içinde kalıyor, yani sahnenin kırpması hiçbir yere değmiyor. Bedeli kapının küçülmesi: dikey yer kapı ile yankı arasında paylaşılmak zorunda.",
      ],
    ],
    read:
      "P1'in kapısı duruyor, ama artık tek başına değil: kapının silueti dışa doğru beş kez yankılanıyor ve ışık kapının kendi kenarında başlayıp o yankıların içinden geçerek dağılıyor. Halkalar dışa gittikçe basıklaşıyor ve soluyor, yani dalga yayılırken enerjisini kaybediyor. Hiçbir çizgi bir kenarda kesilmiyor; hepsi sönerek bitiyor.",
    cost:
      "Kapı küçüldü. Sahne yüksekliği sabit ve P1'in kapısı o yüksekliğin neredeyse tamamını yiyordu; kemerin üstünde tek bir halkaya bile yer yoktu. Kapı P1'dekinin %72'si, karşılığında ekranda duran portal nesnesi P1'inkinden büyük. İkinci bedel: 700px altında kapının solunda kasa dışına 14 birim yer kalıyor, yani orada halka koymak kesmek demekti. Dar ekranda sahne aynen P1.",
    pick:
      "P1'in geçişi aynen: açıklık bir an kararıyor, giden ülke seçim yönünün tersine kayıp siliniyor, gelen yerine oturuyor. Üstüne, dalganın taşıdığı ışık o ülkenin göğünün en parlak rengine dönüyor; yani seçim yalnız kapının içini değil kapının etrafındaki yankıyı da yeniden renklendiriyor.",
  },
];

/* Açıklama bandının zemini. Hero'nun gecesi #080808; bant bir ton açık ve iki
   yanında saç teli bir çizgi var. Amaç dekor değil SINIR: müşteri nerede bizim
   notumuzun bittiğini, nerede hero'nun başladığını tek bakışta görmeli. */
const BAND: React.CSSProperties = {
  background: "#111111",
  borderTop: "1px solid #262626",
  borderBottom: "1px solid #262626",
  padding: "26px 0 24px",
};

const BADGE: React.CSSProperties = {
  display: "inline-flex",
  padding: "5px 12px",
  borderRadius: 999,
  background: "#152333",
  border: "1px solid #284469",
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#9cc6f5",
};

/* Elenmiş adayın rozeti. Renk değil TON farkı: mavi rozet "bu bir aday"
   diyor, gri rozet "bu artık aday değil". Kırmızı bilerek kullanılmadı,
   çünkü elenmek bir hata değil bir karar.
   Ölçülen kontrast (#0f0f0f zemin üstünde): metin #9a9a9a 6.72:1. */
const BADGE_EX: React.CSSProperties = {
  ...BADGE,
  background: "#1a1a1a",
  border: "1px solid #333333",
  color: "#9a9a9a",
};

/* Tabanın rozeti. Yine ton farkı: yeşilimsi değil AMBER, çünkü "onaylanmış"
   değil "üstüne çalışılan" demek. Ölçülen kontrast (#2a2109 zemin üstünde):
   metin #f0c674 9.02:1. */
const BADGE_BASE: React.CSSProperties = {
  ...BADGE,
  background: "#2a2109",
  border: "1px solid #4d3d10",
  color: "#f0c674",
};

/* Adayın künyesi: nereden ne alındığı, hangi kısıtın nasıl çözüldüğü, sorulan
   soruya cevap. Kart metinlerinden AYRI duruyor, çünkü aynı paragraf akışına
   karışsaydı "bu da bir yorum" diye okunurdu. */
const KUNYE: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: 10,
  margin: "16px 0 2px",
  maxWidth: "78ch",
  padding: "14px 16px",
  borderRadius: 10,
  background: "#0d0d0d",
  border: "1px solid #242424",
};

const KUNYE_K: React.CSSProperties = {
  display: "block",
  marginBottom: 3,
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#9cc6f5",
};

/* Bağlantıyla gelen bölümün tepesi lab'in sticky şeridinin altında kalmasın
   diye bırakılan pay. Şerit sabit yükseklikte değil (haplar dar ekranda alt
   satıra kayıyor), o yüzden bilerek cömert: fazla pay verilirse üstte bir
   parça koyu hero görünür, eksik verilirse adayın rozeti çubuğun altında
   kaybolur; ikisi arasında görünür olan yanılgı tercih edilir. */
const ANCHOR_GAP = 132;

const JUMP: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "9px 16px",
  borderRadius: 999,
  border: "1px solid #262626",
  background: "#111111",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 13,
  color: "#e6e6e6",
  textDecoration: "none",
};

const NOTE: React.CSSProperties = {
  margin: "14px 0 6px",
  maxWidth: "70ch",
  fontSize: 14.5,
  lineHeight: 1.6,
  color: "#a4a4a4",
};

const SUB: React.CSSProperties = {
  margin: "0 0 6px",
  maxWidth: "72ch",
  fontSize: 13.5,
  lineHeight: 1.6,
  color: "#8f8f8f",
};

export default function LabHeroPortalPage() {
  return (
    <main style={{ background: "var(--night)" }}>
      <div className="container-o" style={{ padding: "48px 0 40px" }}>
        <h1 className="h2" style={{ color: "#ffffff" }}>
          Hero portalı: adaylar, tam hero içinde
        </h1>
        <p style={{ marginTop: 12, maxWidth: "68ch", fontSize: 15, lineHeight: 1.65, color: "#a4a4a4" }}>
          İstek iki parçalıydı: seçim bir eşiğe bakma hissi versin, ve seçilen ülkenin
          kendisi karşıya çıksın. Bugünkü hero birincisini zaten yapıyor; eksik olan
          ikincisi, çünkü ülke yalnızca ışığın rengiyle anlatılıyor. Adayların hepsi
          ülkeyi kendi biçimiyle getiriyor. Ayrıştıkları yer <b>portalın ne olduğu</b>:
          içinden bakılan bir açıklık mı, içinden geçilen bir koridor mu, yoksa ülkenin
          geçtiği bir sınır mı.
        </p>
        <p style={{ marginTop: 10, maxWidth: "68ch", fontSize: 15, lineHeight: 1.65, color: "#a4a4a4" }}>
          <b style={{ color: "#e6e6e6" }}>Bu turda taban P2, yeni aday P5.</b> P4 elendi
          (&quot;portalı beğenmedim p2 daha iyi geliyor hala&quot;), yani sıralama da değişti:
          önce bugün canlıda olan hero, hemen ardından yeni taban P2, sonra onun üstüne
          kurulan P5. P5&apos;te dört şey var: koridorun çizgileri kutusundan çıkıp yukarı
          taşıyor ve yazıya varmadan sönüyor, kemerin biçimi ülkeye göre değişiyor,
          koridorun ağzının altından ışık süzülüyor, ızgara bir kademe kısılıyor. P1
          referans olarak arkada duruyor: ışık süzmesi ondan alındı. Elenen ikisi (P3 ve
          P4) silinmedi, kayıt olarak en altta.
        </p>
        <p style={{ marginTop: 10, maxWidth: "68ch", fontSize: 13.5, lineHeight: 1.6, color: "#8f8f8f" }}>
          En üstteki bölüm bugün canlıda olan hero, tek satırı değiştirilmeden. Hepsi
          gerçek hero bileşenini basıyor, taklidini değil; değişen tek şey sahne.
          Bayraklardan ülke değiştirmek bütün sahneleri birden değiştirir. Üstteki sabit
          menü çubuğu bilerek basılmadı, ama kapladığı yer boş bırakıldı: başlığın
          ekrandaki yüksekliği canlıdakiyle aynı.
        </p>

        <div
          id="adaylar"
          style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28, scrollMarginTop: ANCHOR_GAP }}
        >
          {/* Elenen adayın hapı da listede: bağlantı kesilirse müşteri onu
              ararken sayfayı elle kaydırmak zorunda kalır. Solukluk yeterli
              işaret, ayrıca "elendi" yazıyor. */}
          {CARDS.map((c) => (
            <a
              key={c.id}
              href={`#${c.anchor}`}
              style={c.state === "ex" ? { ...JUMP, color: "#8f8f8f" } : JUMP}
            >
              <b
                style={{
                  fontWeight: 700,
                  color:
                    c.state === "ex" ? "#8f8f8f" : c.state === "base" ? "#f0c674" : "#9cc6f5",
                }}
              >
                {c.id}
              </b>
              {c.kind}
              {c.state === "ex" ? " · elendi" : null}
            </a>
          ))}
        </div>
      </div>

      {CARDS.map(({ id, anchor, kind, Scene, state, exNote, read, cost, pick, kunye, host }) => (
        <section key={id} id={anchor} style={{ scrollMarginTop: ANCHOR_GAP }}>
          <div style={BAND}>
            <div className="container-o">
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={state === "ex" ? BADGE_EX : state === "base" ? BADGE_BASE : BADGE}>
                  {id} · {kind}
                  {state === "ex" ? " · elendi" : null}
                </span>
                <a
                  href="#adaylar"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: "#8f8f8f",
                    textDecoration: "none",
                  }}
                >
                  ↑ adaylar
                </a>
              </div>
              {state === "ex" ? (
                <p style={{ ...NOTE, color: "#8a8a8a", marginBottom: 0 }}>
                  <b style={{ fontWeight: 700, color: "#c4c4c4" }}>Elendi.</b> Müşterinin kararı
                  birebir: <i>&quot;{exNote}&quot;</i>. Bölüm kayıt olarak duruyor, sahne
                  silinmedi.
                </p>
              ) : null}
              {state === "base" ? (
                <p style={{ ...NOTE, color: "#c9a961", marginBottom: 0 }}>
                  <b style={{ fontWeight: 700, color: "#f0c674" }}>Bu turun tabanı.</b> Müşterinin
                  kararı birebir: <i>&quot;p2 daha iyi geliyor hala&quot;</i>. Aşağıdaki P5 bu
                  sahnenin üstüne kuruldu; koridor kurgusunun tek satırı değişmedi.
                </p>
              ) : null}
              <p style={NOTE}>{read}</p>
              {kunye ? (
                <div style={KUNYE}>
                  {kunye.map(([k, v]) => (
                    <p key={k} style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "#a4a4a4" }}>
                      <b style={KUNYE_K}>{k}</b>
                      {v}
                    </p>
                  ))}
                </div>
              ) : null}
              <p style={SUB}>
                <b style={{ fontWeight: 600 }}>Neyi feda ediyor:</b> {cost}
              </p>
              <p style={{ ...SUB, marginBottom: 0 }}>
                <b style={{ fontWeight: 600 }}>Ülke seçilince:</b> {pick}
              </p>
            </div>
          </div>

          {/* partners={false}: hero'nun altındaki ortak marka şeridi burada altı
              kez basılırdı ve iki aday arasına ikisiyle de ilgisi olmayan bir
              bant sokardı. Şerit ana sayfada kendi yerinde duruyor.

              host: yalnız P5 dolduruyor. O adayın çizgileri hero'nun metnine
              kadar çıktığı için iki şey yalnız o bölümde değişiyor — metnin
              yığın sırası ve ızgaranın opaklığı. Sarmalayıcı burada, çünkü
              ikisi de hero'nun kendi kuralları; sınıfsız yazılsaydı canlı ana
              sayfa da etkilenirdi. */}
          <div className={host}>
            <Hero scene={Scene ? <Scene /> : undefined} partners={false} />
          </div>
        </section>
      ))}
    </main>
  );
}
