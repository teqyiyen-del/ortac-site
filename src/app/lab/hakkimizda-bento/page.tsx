/* AboutBentoBase (taban bloğu) BİLEREK import EDİLMİYOR: canlı .ab-b* / .ab-bo*
   ad alanı Aday 7 canlıya taşınırken silindi, bileşen o sınıfları basıyor ve
   biçimsiz çıkıyor. Dosya yerinde duruyor, gerekçe aşağıda "Taban · ex"
   kutusunda yazılı. */
import AboutBentoKunye from "@/components/lab/AboutBentoKunye";
import AboutBentoSutun from "@/components/lab/AboutBentoSutun";
import AboutBentoLevha from "@/components/lab/AboutBentoLevha";
import AboutBentoKaro from "@/components/lab/AboutBentoKaro";
import AboutBentoBeyan from "@/components/lab/AboutBentoBeyan";
import AboutBentoYerinde from "@/components/lab/AboutBentoYerinde";
import AboutBentoAkis from "@/components/lab/AboutBentoAkis";
import AboutBentoOyma from "@/components/lab/AboutBentoOyma";
import AboutBentoMuhur from "@/components/lab/AboutBentoMuhur";

/* ============================================================================
   LAB · /hakkimizda · "Kim olduğumuz" bölümünün bentosu

   ---------------------------------------------------------------- 3. TUR
   MÜŞTERİNİN KARARI:

     "hakkımızda bentosu içinde yazıyı azalt görsel takıl dedimde bokunu
      çıkartıp bomboş bişi yapmışsın. aran yok mu senin?"

   Bu bir AŞIRI DÜZELTME eleştirisi ve haklı. Üç turun kaydı:

     bugünkü canlı blok            272 karakter   "aşırı öylesine yapılmış"
     1. tur · Karo/Beyan/Yerinde   1187 - 1625    "iyi olmuş ama fazla bilgi"
     2. tur · Akış/Oyma/Mühür      0 - 4          "bomboş"

   Müşterinin iki cümlesi BİRLİKTE okunmak zorunda: "tasarım odaklı düşün, bir
   şeyler anlatmaya çalışmana gerek yok" 1.600 karakteri eliyor; "bomboş bişi
   yapmışsın" sıfırı eliyor. Yani bento ANLATMAYACAK ama BOŞ da olmayacak. Bir
   şeyin ne olduğu anlaşılacak, o şeyin ne işe yaradığı açıklanmayacak:
   ETİKET VAR, PARAGRAF YOK.

   Bu turun üç adayı da o bandın içinde ve aralarındaki fark METİN HACMİ DEĞİL
   TASARIM. Ölçüldüğünde çıkan sonuç zaten şu: nesnelerin adını yazdığın anda
   hangi kompozisyonu kurarsan kur 160 ile 200 karakter arasına düşüyorsun.
   Bandı belirleyen şey düzen değil, "etiket" tanımı.

   Bu sayfa canlı hiçbir şeye dokunmuyor. /hakkimizda, hakkimizda.css,
   aktarim.css ve TrustLayer.tsx bu turda yalnızca OKUNDU.
   ========================================================================= */

/* ------------------------------------------------------------ metin sayımı
   BU TURUN ASIL ÖLÇÜSÜ. Sayım tarayıcıda tek seferlik alındı ve YÖNTEM BU
   TURDA DEĞİŞTİ: eskiden sabit genişlikli aynı köken iframe kullanılıyordu,
   şimdi başsız tarayıcının kendi viewport'u 1280 piksele sabitleniyor (CDP ·
   Emulation.setDeviceMetricsOverride). Sebep: iframe'in içindeki belge
   `prefers-reduced-motion` gibi ortam sorgularını dıştaki belgeden farklı
   çözebiliyordu ve aynı sayfayı iki kez ölçmek gerekiyordu. Sayımın kendi
   kuralı değişmedi.

   Sayım DOM'u geziyor, gizli ögeleri (display:none, visibility:hidden) ve
   <style>/<script> içeriğini atlıyor, kalan metin düğümlerinin boşlukları
   sadeleştirilmiş uzunluğunu topluyor.

   aria-hidden alt ağaçları SAYIMA DAHİL ve bu bilerek: bir ekran okuyucudan
   gizlenmiş rakam ekranda hâlâ duruyor. CSS ile üretilen içerik (::before)
   sayılmıyor, o yüzden bu turun adaylarında ayraç olarak nokta değil boşluk
   kullanıldı — görünür olup sayılmayan bir karakter ölçüyü kirletirdi.

   İKİ SÜTUN VAR ÇÜNKÜ ADAYLAR AYNI ŞEYİ KAPSAMIYOR: bazı adaylar bölüm başlığı
   ve giriş paragrafı da getiriyor (Karo, Beyan), taban ise bentonun üstündeki
   "Vizyon ve misyon firmanın kendi resmî ifadesi" satırını taşıyor; o satır
   bugün sayfada gerçekten orada duruyor ama bentonun parçası değil. "Bento"
   sütunu yalnızca ızgarayı sayıyor, "bölüm" sütunu bileşenin ekrana bastığı
   her şeyi. Karar ikisine birden bakılarak verilir. */
const METIN_COLS = ["", "tur", "bölüm", "bento", "tabana göre"];

type MetinRow = { k: string; tur: string; bolum: number; bento: number; not?: string };

const METIN: MetinRow[] = [
  { k: "Taban · bugünkü blok", tur: "canlı", bolum: 272, bento: 193, not: "ölçüt" },
  { k: "ex · Aday 1 · Karo", tur: "1", bolum: 1625, bento: 1375 },
  { k: "ex · Aday 2 · Beyan", tur: "1", bolum: 1254, bento: 1254 },
  { k: "ex · Aday 3 · Yerinde", tur: "1", bolum: 1187, bento: 1108 },
  { k: "ex · Aday 4 · Akış", tur: "2", bolum: 4, bento: 4 },
  { k: "ex · Aday 5 · Oyma", tur: "2", bolum: 3, bento: 3 },
  { k: "ex · Aday 6 · Mühür", tur: "2", bolum: 0, bento: 0 },
  { k: "Aday 7 · Künye", tur: "3", bolum: 191, bento: 191 },
  { k: "Aday 8 · Sütun", tur: "3", bolum: 163, bento: 163 },
  { k: "Aday 9 · Levha", tur: "3", bolum: 183, bento: 183 },
];

/* Son sütun: tabanla oran. Büyükler kat, küçükler kesir olarak yazılıyor —
   "× 0,01" hiçbir şey anlatmıyor, "1 / 68" anlatıyor. */
function oran(bolum: number, taban: number) {
  if (bolum === 0) return "0";
  if (bolum >= taban) return `× ${(bolum / taban).toFixed(1).replace(".", ",")}`;
  return `1 / ${Math.round(taban / bolum)}`;
}

/* ----------------------------------------------------------------- ölçüm
   Sayılar elle yazılı çünkü ölçüm çalışma anında değil tarayıcıda tek
   seferlik alındı: başsız tarayıcı, her genişlik için ayrı yükleme, yatay
   taşma da scrollWidth ile değil gerçekten scrollTo(9999, 0) denenip
   scrollX'e bakılarak. Animasyon sayısı getAnimations() ile, sonsuz olanlar
   sayılarak. Blok değişirse bu satırlar da yeniden ölçülmeli. */
const COLS = ["", "animasyon", "en uzun periyot", "element", "320px", "375px", "768px", "1440px"];

const MEASURED: { k: string; v: (string | number)[] }[] = [
  /* Ölçüt satırı: ana sayfanın kendi bentosu (#neden-ortac). Periyot alanı boş
     çünkü oradaki dört sonsuz hareketi CSS değil motion sürüyor; süreleri
     getAnimations üzerinden tek bir sayıya inmiyor. */
  { k: "Ölçüt · ana sayfa bentosu", v: [4, "·", 185, 2592, 2357, 1370, 1259] },
  { k: "Taban · bugünkü blok", v: [10, "23 s", 123, 897, 879, 701, 680] },
  { k: "ex · Aday 1 · Karo", v: [10, "35,9 s", 238, 2911, 2610, 1417, 1233] },
  { k: "ex · Aday 2 · Beyan", v: [6, "44,3 s", 247, 2487, 2217, 1613, 1148] },
  { k: "ex · Aday 3 · Yerinde", v: [13, "33,7 s", 184, 2237, 2047, 1628, 1066] },
  { k: "ex · Aday 4 · Akış", v: [25, "11,3 s", 118, 800, 800, 472, 552] },
  { k: "ex · Aday 5 · Oyma", v: [17, "19,9 s", 101, 717, 710, 710, 462] },
  { k: "ex · Aday 6 · Mühür", v: [18, "41,9 s", 107, 476, 476, 522, 748] },
  { k: "Aday 7 · Künye", v: [25, "13,1 s", 154, 1061, 1014, 571, 632] },
  { k: "Aday 8 · Sütun", v: [9, "22,3 s", 149, 964, 899, 742, 612] },
  { k: "Aday 9 · Levha", v: [22, "16,7 s", 65, 957, 922, 871, 672] },
];

/* ------------------------------------------------------------ bu turun üçü */
const CANDIDATES = [
  {
    id: "Aday 7",
    name: "Künye",
    kind: "Ana sayfanın ızgarası · etiket geri geldi",
    Section: AboutBentoKunye,
    idea:
      "Bento bir künye levhası dizisi. Karo yalnızca ne olduğunu söylüyor: bir sayı, bir isim ve o ismin saydığı şeylerin kendi adları. Geometri ana sayfanınki (altı sütun, 2 · 4 / 4 · 2, iki koyu iki açık, koyular köşegende), anatomi yine alınmadı: başlık bir künye satırına indi, açıklama satırı hiç yok.",
    text:
      "191 karakter. Aday 4 ile aynı iskelet, aynı hareket; tek fark nesnelerin adı. Kıyas bu yüzden tek değişkene iniyor ve aday 4 sayfada ex olarak durduğu için ikisi yan yana okunabiliyor. Adsız kalan tek karo dayanaklar: dördünün başlığı sayfanın 4. bölümünde açıklamasıyla duruyor.",
    motion:
      "Aday 4'ün iki katmanı BİLEREK aynen korundu. SÜREKLİ: ray boyunca hiç durmayan bir parıltı (13,1 s). OLAY: 10,9 saniyede bir bütün bentoyu kat eden aktarım dalgası, on dokuz durak. Periyotlar değişti çünkü iki blok aynı lab sayfasında aynı anda dönüyor; onda birlikleri (131 ve 109) asal.",
    akt: "Evet, ve adayın omurgası bu. Dalganın tamamı aktarim.css; lab-hb7.css'te mekanizmanın tek satırı yok, yalnızca durak sırası, adaptör ve renkler var.",
    tekrar:
      "Sayfanın 2, 4, 5 ve 6. bölümlerinin dördü de temsil ediliyor ama hiçbirinin CÜMLESİ geçmiyor. Ekranda yalnızca adlar var: ülke adı, halka adı, sektör adı. Ziyaretçi burada bir şey öğrenmiyor, neyin nerede olduğunu görüyor.",
    cost:
      "Ana sayfayla benzeşme. Izgara birebir aynı ve bu adayda karolar artık başlık da taşıdığı için benzerlik bir tur öncesine göre daha görünür; iki bölümü arka arkaya okuyan biri geometriyi tanıyabilir. İkinci bedel: on bir etiket ekranda duruyor ve müşteri isterse bunu hâlâ 'yazı' sayabilir.",
  },
  {
    id: "Aday 8",
    name: "Sütun",
    kind: "Dikey ızgara · dört ayrı mekanik",
    Section: AboutBentoSutun,
    idea:
      "Izgara yatay değil dikey. Solda iki satır boyu uzanan tek bir koyu karo ve içinde üç ülke, sayfadaki hiçbir yerde olmadığı kadar büyük yazılmış; sağda alt alta üç kısa karo. Tezi şu: 'az yazı' kelimeyi küçültmek değil SAYISINI azaltmak demek. Ekranda yirmi kelime var ama üçü manşet boyunda, boşluk hissi buradan kalkıyor.",
    text:
      "163 karakter, üçünün en hafifi. Rakam HİÇ basılmıyor: nesneler zaten sayılabiliyor (üç bayrak, beş halka, altı çip, dört mühür). Bugünkü canlı bloğun kusuru rakamı manşet yapmasıydı; bu aday rakamı tamamen bırakıp yerine adı koyuyor.",
    motion:
      "Dört mekanik, dokuz sonsuz animasyon; üçünün en azı ve bilerek. Ülke karosunda inen ışık bandı (15,7 s), zincir rayında geçen parıltı (10,7 s), altı çip sırayla bir tık yukarı (19,3 s), mühür karosunu ters yönde kat eden ince çizgi (22,3 s). Dördünün de onda birliği asal, yani hiçbiri diğeriyle senkron olmuyor.",
    akt: "Hayır, bilerek. Kalıp tek bir cümle söylüyor ('A'daki şey B'ye geçti') ve o cümle karoları birbirine bağlıyor; bu adayda karolar bağlanmıyor. Ana sayfa bentosunun 'her karonun kendi mekaniği var' ölçütü burada harfiyen uygulanıyor.",
    tekrar:
      "Aynı dört bölüm temsil ediliyor, tek bir cümle taşınmıyor. Üç ülke adı bu blokta manşet, sayfanın 2. bölümünde ise başlık; aynı kelime iki farklı rütbede, o yüzden tekrar gibi değil giriş gibi okunuyor.",
    cost:
      "Simetri. Sol karonun yüksekliğini sağdaki üç karonun toplamı belirliyor ve üç karo eşit değil, yani sol karodaki üç satır sağdaki hiçbir hizaya oturmuyor. İkinci bedel: 920 pikselin altında ızgara tek sütuna iniyor ve 'sütun' fikri tamamen kayboluyor, geriye dört sıradan karo kalıyor.",
  },
  {
    id: "Aday 9",
    name: "Levha",
    kind: "Afiş · yüzey kelimenin kendisi",
    Section: AboutBentoLevha,
    idea:
      "Karonun içeriği değil yüzeyi tipografi. Her karoda tek bir kelime var, karonun neredeyse tamamını kaplıyor ve gövdesinden ışık geçiyor; altında saydığı şeylerin adları ince bir şerit hâlinde duruyor. Aday 5 'Oyma'nın orta yolu: aynı afiş mantığı, ama yüzeyde dev bir rakam değil dev bir KELİME var.",
    text:
      "183 karakter. Rakam silinmedi, manşetlikten indi: kelimenin omzunda küçük bir üst simge. Karo başlıkları about.ts'ten tek kelimeye indirgeniyor ('halkalı zincir' → 'zincir'), elle yazılmıyor. Şeritler ad taşıyor; tek istisna dayanak karosu, çünkü dört dayanağın adı birer cümle uzunluğunda.",
    motion:
      "İki katman, yirmi iki sonsuz animasyon. SÜREKLİ: kelimenin gövdesinden geçen ışık (16,7 s, karo başına biri, dördü ayrı evrede, yani ortalama her 4,2 saniyede bir kelime yanıyor). OLAY: şeritleri kat eden aktarım dalgası (13,9 s, on sekiz durak). Onda birlikleri (167 ve 139) asal.",
    akt: "Evet, ama omurga olarak değil: dalga yalnızca şeritlerde. Asıl hareket kelimenin kendi ışığı ve o kalıbın dışında. Üçlü böyle dizildi ki karar veren kişi kalıbın omurga olduğu (aday 7), hiç olmadığı (aday 8) ve ikinci katman olduğu (aday 9) hâlleri yan yana görsün.",
    tekrar:
      "Şeritteki adlar sayfanın alt bölümlerindeki başlıkların aynısı ama rütbeleri farklı: burada 11,5 piksellik bir rozet, orada bir bölüm başlığı. Dört dev kelime ise sayfada başka hiçbir yerde bu boyda geçmiyor.",
    cost:
      "Dört kelimenin tekrar riski. 'ülke', 'sektör', 'zincir', 'dayanak' soyut adlar ve manşet boyunda basıldıklarında bir bölüm başlığı gibi okunabiliyorlar; oysa bölümün gerçek başlıkları aşağıda. İkinci bedel: 860 pikselin altında karolar alt alta iniyor, kelime dar karonun genişliğine göre değil ekranın genişliğine göre büyüyor ve afiş dengesi bozuluyor.",
  },
];

/* --------------------------------------------------- önceki iki turun altısı */
const EX = [
  {
    id: "ex · Aday 1",
    name: "Karo",
    kind: "1. tur · ana sayfanın ızgarası",
    Section: AboutBentoKaro,
    idea:
      "Ana sayfa bentosunun ızgarasını olduğu gibi alıyor: altı sütun, bir geniş (4), bir uzun (2×2), iki normal (2). Karoların içi değişiyor, geometri değişmiyor. Bölüm vizyon/misyondan ayrılıyor ve kendi başlığıyla açılıyor.",
    motion:
      "Üç mekanik, on sonsuz animasyon: ray ışığı (18,7 s), üç bayrak sırayla (22,1 s), altı sektör ikonu sırayla (35,9 s). Dördüncü karo bilerek hareketsiz.",
    cost:
      "2. TURUN İTİRAZI: dört karonun dördü de bir başlık ve bir açıklama satırı taşıyor, yani sayfanın 2, 4, 5 ve 6. bölümlerinin girişleri bir kez daha okunuyor. 1.625 karakter.",
  },
  {
    id: "ex · Aday 2",
    name: "Beyan",
    kind: "1. tur · gece · ton tersine",
    Section: AboutBentoBeyan,
    idea:
      "Bölümün başlığı yok, çünkü başlık ilk karonun içinde. Beyan karosu bölümün sorusunu soruyor, firmanın iki paragrafıyla cevaplıyor ve ayağında on iki kurumun gerçek logosunu taşıyor.",
    motion:
      "Üç mekanik, altı sonsuz animasyon; altı adayın en sakini. Logo şeridinin arkasından yavaş bir ışık (44,3 s), üç ülke diski (27,1 s), dikey zincir rayı (12,7 s).",
    cost:
      "2. TURUN İTİRAZI: firmanın iki paragrafını bentoya taşıyor, yani en çok anlatan aday. Üstelik on iki logo sayfanın 4. bölümünde ikinci kez basılıyor. 1.254 karakter.",
  },
  {
    id: "ex · Aday 3",
    name: "Yerinde",
    kind: "1. tur · yerinde kalıyor · sayaçlı",
    Section: AboutBentoYerinde,
    idea:
      "Bento yerinden oynamıyor: vizyon/misyon kartlarının altında, bugünkü yerinde, kendi başlığı olmadan. Üç eşit hücre yerine bir uzun koyu ve iki normal açık karo.",
    motion:
      "Dört mekanik, on üç sonsuz animasyon. Ülke satırları (33,7 s), üç okuma ışığı (16,3 s), zincir şeridi (21,7 s), altı sektör kuyusu (24,7 s).",
    cost:
      "2. TURUN İTİRAZI: birinci turun en hafifi ama hâlâ tabanın dört katı metin taşıyor; ülke satırlarında yapı künyesi ve cümle, sektör kuyularında etiket var. 1.187 karakter.",
  },
  {
    id: "ex · Aday 4",
    name: "Akış",
    kind: "2. tur · tek makine · aktarım dalgası",
    Section: AboutBentoAkis,
    idea:
      "Bento dört ayrı kart değil tek bir makine. Dört karo aynı enerji geçişinin dört durağı: ışık ülkelerden çıkıyor, zincirin beş halkasından geçiyor, altı sektöre yayılıyor, dayanaklara varıyor. Ekranda yalnızca dört rakam var, etiketsiz.",
    motion:
      "İki katman, yirmi beş sonsuz animasyon. Sürekli ray parıltısı (10,3 s) ve 11,3 saniyede bir bütün bentoyu kat eden aktarım dalgası (on dokuz durak).",
    cost:
      "3. TURUN İTİRAZI: dört etiketsiz rakam bir bento değil bir plaka. Üç bayrağın yanındaki 3 kendini açıklıyor, dört soyut mührün yanındaki 4 açıklamıyor: o karo yalnızca 'dört tane bir şey' diyor. 4 karakter. Aday 7 tam olarak bu adayın üstüne kuruldu.",
  },
  {
    id: "ex · Aday 5",
    name: "Oyma",
    kind: "2. tur · afiş · ızgara verinin kendisi",
    Section: AboutBentoOyma,
    idea:
      "Bento bir kart dizisi değil afiş. Üç karonun her birinde tek bir dev rakam var ve rakam karonun içeriği değil yüzeyi: gövdesinden ışık geçiyor, işaretler üstüne biniyor. Karo genişlikleri saydıkları sayıyla orantılı, 3 : 5 : 6.",
    motion:
      "İki mekanik, on yedi sonsuz animasyon, ikisi de kesintisiz. Rakamın gövdesinden geçen ışık (14,9 s) ve on dört işaretin tek dalga hâlinde bir tık yükselmesi (19,9 s).",
    cost:
      "3. TURUN İTİRAZI: üç rakam bir afişi taşımaya yetmiyor, geriye biçim egzersizi kalıyor. 3 karakter. Aday 9 bu adayın yüzey mantığını koruyup rakamın yerine kelimeyi koyuyor.",
  },
  {
    id: "ex · Aday 6",
    name: "Mühür",
    kind: "2. tur · ızgara yok · tek amblem",
    Section: AboutBentoMuhur,
    idea:
      "Izgarayı tamamen bırakıyor. Bento dört karo değil tek bir nesne: dış halkada altı sektör işareti, iç halkada zincirin beş halkası, çekirdekte üç bayrak. Ambleme soldan enerji geliyor, mühür yanıyor, sağdan çıkıyor.",
    motion:
      "Dört mekanik, on sekiz sonsuz animasyon; altısının en yükseği. Dış halka 41,9 s, iç halka 29,3 s tersine, doku halkası 23,9 s, çekirdek nabzı 7,9 s, aktarım ekseni 13,7 s.",
    cost:
      "3. TURUN İTİRAZI: ekranda tek bir karakter yok, yani 'bomboş' eleştirisinin merkezindeki aday bu. Ayrıca bento olmayı da feda ediyor: eşit olmayan hücre, ton karşıtlığı ve 'her karonun kendi mekaniği' ölçütünün üçü de karşılanamıyor çünkü karo yok. 0 karakter.",
  },
];

/* ----------------------------------------------------------------- biçim
   Bu sayfanın kendi CSS'i yok: karşılaştırma metni satır içi biçimle
   basılıyor. Bir karar sayfası için ayrı bir stil dosyası açmak, karar
   verildiğinde silinecek bir dosya daha demek. */
const KICKER: React.CSSProperties = {
  display: "inline-flex",
  padding: "5px 12px",
  borderRadius: 999,
  background: "var(--blue-100)",
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--blue-900)",
};

const KICKER_BASE: React.CSSProperties = {
  ...KICKER,
  background: "var(--paper)",
  color: "#5c5c5c",
};

const BOX: React.CSSProperties = {
  marginTop: 16,
  padding: "20px 22px",
  borderRadius: "var(--r-lg)",
  background: "var(--paper)",
  border: "1px solid var(--border)",
  maxWidth: "78ch",
};

const P: React.CSSProperties = {
  marginTop: 12,
  fontSize: 14.5,
  lineHeight: 1.65,
  color: "var(--text-600)",
  /* overflowWrap 320px İÇİN ZORUNLU, süs değil. Bu sayfanın paragrafları 39 yerde
     <code> ile dosya yolu basıyor ve bir yol bölünemeyen tek kelimedir. En uzunu
     src/components/lab/AboutBentoBase.tsx: 301px genişliğinde, sol kenarı 43'te,
     yani 344'te bitiyor ve kap 320. Ölçülen sonuç 24,5px yatay sayfa kayması
     (scrollTo(9999,0) sonrası scrollX; scrollWidth burada yalan söylüyor çünkü
     body'de overflow-x:clip var). Yalnız o ögeye sarma verilince scrollWidth
     344'ten tam 320'ye düşüyor. Kuralı tek tek <code>'lara değil paragrafa
     koyduk: aynı sorun sonradan eklenecek her uzun yolda tekrarlardı. */
  overflowWrap: "anywhere",
};

const STRONG: React.CSSProperties = { fontWeight: 600, color: "var(--text-900)" };

const LABEL: React.CSSProperties = {
  display: "block",
  marginTop: 14,
  fontSize: 11.5,
  fontWeight: 600,
  letterSpacing: "0.02em",
  color: "var(--blue-900)",
};

const CELL: React.CSSProperties = {
  padding: "9px 10px",
  borderBottom: "1px solid var(--border)",
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
  color: "var(--text-600)",
};

const CELL_K: React.CSSProperties = {
  ...CELL,
  textAlign: "left",
  fontWeight: 600,
  color: "var(--text-900)",
};

const TABLE: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: "var(--font-sans)",
  fontSize: 13,
};

const CAPTION: React.CSSProperties = {
  textAlign: "left",
  paddingBottom: 10,
  fontSize: 12.5,
  lineHeight: 1.6,
  color: "var(--text-600)",
};

const TH: React.CSSProperties = {
  padding: "0 10px 8px",
  borderBottom: "1px solid var(--border)",
  fontSize: 11.5,
  fontWeight: 600,
  color: "var(--blue-900)",
};

const RULE: React.CSSProperties = {
  marginTop: 64,
  paddingTop: 8,
  borderTop: "1px solid var(--border)",
};

/* KAZANAN ROZETİ. Müşteri bu turda "aday 7 olur" dedi ve Künye canlıya taşındı
   (/hakkimizda · 1. bölüm · .ab-kn- ad alanı). Rozet bir süs değil, bu sayfanın
   tek işi: karar verildikten sonra hangi adayın seçildiği sayfanın kendisinden
   okunabilsin. Diğer iki aday siliniyor değil, rozetsiz duruyor. */
const CANLI_ID = "Aday 7";

const BADGE: React.CSSProperties = {
  display: "inline-block",
  marginLeft: 10,
  padding: "3px 9px",
  borderRadius: 999,
  background: "var(--blue-100)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  /* #307fe2, #e8f1fd kâğıdın üstünde 3,5:1 — grafik eşiğinin üstünde ve
     etiketin kendisi 11 punto KALIN, yani büyük metin eşiğini de geçiyor. */
  color: "var(--blue-700)",
  verticalAlign: "middle",
};

/* Bu turun blok künyesi. Alanlar 2. turunkiyle aynı çünkü karar hâlâ aynı
   soruya veriliyor: "ne kadar metin taşıyor" ve "hareket ne yapıyor". */
function Kunye({ c }: { c: (typeof CANDIDATES)[number] }) {
  const canli = c.id === CANLI_ID;
  return (
    <div style={BOX}>
      <b style={KICKER}>
        {c.id} · {c.name} · {c.kind}
        {canli && <span style={BADGE}>seçildi · canlıda</span>}
      </b>
      {canli && (
        <p style={{ ...P, marginTop: 10 }}>
          <b style={STRONG}>Bu aday canlıya taşındı.</b> Aşağıdaki blok adayın
          KARAR TURUNDAKİ hâli; canlı sürüm ondan sonra iki tur daha aldı ve artık
          üç yerde ayrışıyor. Son turdaki müşteri cümlesi:{" "}
          &quot;bento için tasarım deniyoruz ona dön şuan koyduğunda olmamış tam şu
          ss attığım iyiydi sadece dayanak kısmında icon var sadece diye ne oldukları
          anlaşılmıyor, gerekirse üstlerine gelince gözüksün ya da başka bir şey bul,
          sektör boxunun alanını küçült fln bişi yap. bide 3 ülke tasarımını da ana
          sayfadaki bu tasarım gibi yapabilirsin.&quot;
        </p>
      )}
      {canli && (
        <p style={{ ...P, marginTop: 8 }}>
          <b style={STRONG}>Canlıda değişen üç şey (1440&apos;ta ölçüldü).</b>{" "}
          <b style={STRONG}>1 · Ülke:</b> üç bayrak satırı yerine ana sayfanın otorite
          karosundaki tel kafes küre var (beyaz haplarda bayrak + ülke adı) ve karo iki
          satır boyu bir kuleye döndü, 368 × 194&apos;ten 368 × 445,5&apos;e. Küre
          yükseklik istiyor: tek satırlık hücrede sahne 318 × 52,9 kalıyor, disk 58,6
          piksele iniyor ve üç hap birbirinin üstüne biniyor.{" "}
          <b style={STRONG}>2 · Sektör:</b> 752 × 198&apos;den 368 × 280,6&apos;ya,
          alan 148.896&apos;dan 103.261 piksel kareye indi. Altı çip 3 × 2&apos;den
          2 × 3&apos;e geçti, altısı da ekranda.{" "}
          <b style={STRONG}>3 · Dayanak:</b> 2 × 2 ızgara aşağıdaki gibi duruyor ama
          mühür 154 × 46&apos;lık adsız bir kuyu değil, 154 × 87,3&apos;lük bir levha.
          İkon 17&apos;den 21 piksele çıkıp merkeze geçti, altına dayanağın kendi
          başlığı girdi (10,5 punto, iki satır). Aşağıdaki blokta ızgara
          <code> aria-hidden</code>, yani dört dayanak erişilebilirlik ağacında hiç
          yok; canlıda dördü de <code>StaticText</code> olarak ağaçta duruyor.
          Denenip elenen ikinci çözüm &quot;döner künye&quot; idi: adsız mühürler ve
          dört başlığı sırayla gösteren tek satırlık bir şerit. O hâlde karo 266,5
          piksele iniyor ama ekranda o an duran metin 103 karakterden 25&apos;e
          düşüyor ve karonun %34,4&apos;ü ölü alan oluyor. Canlı hâli
          <code> /hakkimizda</code>, biçimi <code>src/app/css/hakkimizda.css</code> ·
          ad alanı <code>.ab-kn-</code>.
        </p>
      )}
      <span style={LABEL}>Fikir</span>
      <p style={{ ...P, marginTop: 6 }}>{c.idea}</p>
      <span style={LABEL}>Ne kadar metin taşıyor</span>
      <p style={{ ...P, marginTop: 6 }}>{c.text}</p>
      <span style={LABEL}>Hareket ne yapıyor</span>
      <p style={{ ...P, marginTop: 6 }}>{c.motion}</p>
      <span style={LABEL}>aktarim.css kalıbını kullanıyor mu</span>
      <p style={{ ...P, marginTop: 6 }}>{c.akt}</p>
      <span style={LABEL}>Alt bölümlerle tekrarı nasıl kırıyor</span>
      <p style={{ ...P, marginTop: 6 }}>{c.tekrar}</p>
      <span style={LABEL}>Neyi feda ediyor</span>
      <p style={{ ...P, marginTop: 6 }}>{c.cost}</p>
    </div>
  );
}

function KunyeEx({ c }: { c: (typeof EX)[number] }) {
  return (
    <div style={BOX}>
      <b style={KICKER_BASE}>
        {c.id} · {c.name} · {c.kind}
      </b>
      <span style={LABEL}>Fikir</span>
      <p style={{ ...P, marginTop: 6 }}>{c.idea}</p>
      <span style={LABEL}>Hareket</span>
      <p style={{ ...P, marginTop: 6 }}>{c.motion}</p>
      <span style={LABEL}>Bu turda neden yeterli değil</span>
      <p style={{ ...P, marginTop: 6 }}>{c.cost}</p>
    </div>
  );
}

export default function LabHakkimizdaBentoPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Hakkımızda bentosu · 3. tur
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "72ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          <code>/hakkimizda</code> · 1. bölümün sonundaki bentoya üç YENİ alternatif.
          İki turun altı adayı da silinmedi, sayfanın altında <b style={STRONG}>ex</b>{" "}
          olarak duruyor: kıyasın iki ucunu onlar tutuyor. Canlı sayfaya,{" "}
          <code>hakkimizda.css</code>&apos;e, <code>aktarim.css</code>&apos;e ve{" "}
          <code>TrustLayer.tsx</code>&apos;e dokunulmadı; dördü de yalnızca okundu.
        </p>

        {/* ------------------------------------------------------- teşhis */}
        <div style={BOX}>
          <b style={KICKER}>Bu turun teşhisi: 2. tur aşırı düzeltme yaptı</b>
          <p style={P}>
            Müşterinin cümlesi:{" "}
            <b style={STRONG}>
              &quot;yazıyı azalt görsel takıl dedimde bokunu çıkartıp bomboş bişi
              yapmışsın&quot;
            </b>
            . Bu, 2. turun yönünü değil <b style={STRONG}>miktarını</b> reddediyor.
          </p>
          <p style={P}>
            Üç turun kaydı yan yana konunca hedef kendiliğinden çıkıyor: bugünkü canlı
            blok <b style={STRONG}>272</b> karakter ve müşteri onu &quot;öylesine&quot;
            buldu ama &quot;boş&quot; demedi; 1. turun üç adayı{" "}
            <b style={STRONG}>1.187 - 1.625</b> ve &quot;fazla bilgi&quot; dedi; 2. turun
            üçü <b style={STRONG}>0 - 4</b> ve &quot;bomboş&quot; dedi. İki cümle birlikte
            okunmak zorunda.
          </p>
          <p style={P}>
            <b style={STRONG}>Bu turun kuralı:</b> bento anlatmayacak ama boş da
            olmayacak. Bir şeyin <b style={STRONG}>ne olduğu</b> anlaşılacak, o şeyin{" "}
            <b style={STRONG}>ne işe yaradığı</b> açıklanmayacak. Kısacası: etiket var,
            paragraf yok.
          </p>
          <p style={P}>
            <b style={STRONG}>Ölçüldüğünde çıkan sonuç şaşırtıcı:</b> nesnelerin adını
            yazdığın anda hangi kompozisyonu kurarsan kur{" "}
            <b style={STRONG}>163 ile 191</b> arasına düşüyorsun. Üç aday üç ayrı düzen
            deniyor (aynı ızgara · dikey ızgara · afiş) ve üçünün metni de aynı bantta.
            Yani bandı belirleyen şey düzen değil, &quot;etiket&quot; tanımının kendisi;
            karar metin hacmiyle değil <b style={STRONG}>tasarımla</b> verilecek.
          </p>
        </div>

        {/* -------------------------------------------------- metin sayımı */}
        <div style={{ marginTop: 16, maxWidth: "78ch", overflowX: "auto" }}>
          <table style={TABLE}>
            <caption style={CAPTION}>
              <b style={STRONG}>Görünür metin.</b> Sayım tarayıcıda, 1280 piksel
              genişlikte yapıldı: DOM geziliyor, gizli ögeler (
              <code>display:none</code>, <code>visibility:hidden</code>) ile{" "}
              <code>&lt;style&gt;</code> ve <code>&lt;script&gt;</code> içeriği
              atlanıyor, kalan metin düğümlerinin boşlukları sadeleştirilmiş uzunluğu
              toplanıyor. <code>aria-hidden</code> alt ağaçları{" "}
              <b style={STRONG}>sayıma dahil</b>: ekran okuyucudan gizlenmiş bir rakam
              ekranda hâlâ duruyor. CSS ile üretilen içerik (<code>::before</code>)
              sayılmıyor, o yüzden bu turun adaylarında ayraç olarak nokta değil boşluk
              kullanıldı; görünür olup sayılmayan bir karakter ölçüyü kirletirdi.{" "}
              <b style={STRONG}>Bölüm</b> = bileşenin ekrana bastığı her şey,{" "}
              <b style={STRONG}>bento</b> = yalnızca ızgara. İkisi ayrı çünkü bazı
              adaylar bölüm başlığı da getiriyor, taban ise bentonun üstündeki
              vizyon/misyon künye satırını taşıyor.
            </caption>
            <thead>
              <tr>
                {METIN_COLS.map((c, i) => (
                  <th
                    key={c || "k"}
                    scope="col"
                    style={{ ...TH, textAlign: i === 0 ? "left" : "right" }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {METIN.map((r) => (
                <tr key={r.k}>
                  <th scope="row" style={CELL_K}>
                    {r.k}
                  </th>
                  <td style={CELL}>{r.tur}</td>
                  <td style={CELL}>{r.bolum}</td>
                  <td style={CELL}>{r.bento}</td>
                  <td style={CELL}>{r.not ?? oran(r.bolum, METIN[0].bolum)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --------------------------------------------------------- ölçüm */}
        <div style={{ marginTop: 28, maxWidth: "78ch", overflowX: "auto" }}>
          <table style={TABLE}>
            <caption style={CAPTION}>
              <b style={STRONG}>Hareket ve taşma.</b> Animasyon sayısı gerçekten çalışan
              sonsuz animasyonlardan (<code>getAnimations</code>), kural taraması da ham{" "}
              <code>cssText</code> üzerinden yapıldı: bu depoda{" "}
              <code>document.styleSheets</code> geliştirme modunda kırpılmış sonuç
              veriyor. Yükseklikler her genişlik için ayrı yüklemeyle, bölüm dolgusu
              dahil. Dört genişlikte de yatay taşma sıfır ve ölçüm{" "}
              <code>scrollWidth</code> ile değil, gerçekten <code>scrollTo(9999, 0)</code>{" "}
              denenip <code>scrollX</code>&apos;e bakılarak yapıldı (
              <code>body &#123; overflow-x: clip &#125;</code> yüzünden scrollWidth temiz
              görünüyor). Element sayısı bölüm kabı dahil.{" "}
              <code>prefers-reduced-motion: reduce</code> altında bu sayfadaki{" "}
              <b style={STRONG}>on bloğun da</b> animasyon sayısı{" "}
              <b style={STRONG}>0</b> (yalnızca <code>CSSAnimation</code> değil,{" "}
              <code>getAnimations</code>&apos;ın döndürdüğü her şey). Tablonun on bir
              satırı da BU TURDA baştan ölçüldü: önceki turun bazı yükseklikleri birkaç
              piksel farklıydı ve tek bir turda alınmış sayılar kendi aralarında
              kıyaslanabilir olsun istendi. Ölçüt satırı (ana sayfa bentosu) iki turda da
              aynı çıktı, yani fark yöntemde değil.
            </caption>
            <thead>
              <tr>
                {COLS.map((c, i) => (
                  <th
                    key={c || "k"}
                    scope="col"
                    style={{ ...TH, textAlign: i === 0 ? "left" : "right" }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEASURED.map((r) => (
                <tr key={r.k}>
                  <th scope="row" style={CELL_K}>
                    {r.k}
                  </th>
                  {r.v.map((v, i) => (
                    <td key={i} style={CELL}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ------------------------------------------------ üçünün ortak sözü */}
        <div style={BOX}>
          <b style={KICKER}>Yeni üçünün de tuttuğu sözler</b>
          <p style={P}>
            <b style={STRONG}>İçerik:</b> üçünde de tek bir CÜMLE yazılmadı. Ekrandaki
            her kelime veriden geliyor: ülke adları <code>COUNTRY_NAME</code>, halka
            adları <code>brand.ts · CHAIN</code>, sektör adları{" "}
            <code>about.ts · FOR_WHOM</code>, künye isimleri <code>SUMMARY</code>.
            Sayılar dizi uzunluğu. Elle yazılan tek kelime{" "}
            <b style={STRONG}>&quot;dayanak&quot;</b> ve o da bir iddia değil,{" "}
            <code>BASIS.heading</code>&apos;in tek kelimelik karşılığı. Yeni iddia,
            kuruluş yılı, kişi ya da müşteri sayısı yok.
          </p>
          <p style={P}>
            <b style={STRONG}>Tekrar:</b> dört dayanağın BAŞLIKLARI üç adayın hiçbirinde
            yok. Sebep tek: onlar sayfanın 4. bölümünde açıklamalarıyla birlikte
            duruyor ve tam olarak müşterinin kaldırttığı tekrar bu olurdu. O karoda
            ekranda yalnızca dört işaret var.
          </p>
          <p style={P}>
            <b style={STRONG}>Erişim:</b> görünür metin geri geldiği için üçünde de
            karonun adı aria-label ile değil kendi yazısıyla veriliyor; ekran okuyucu ile
            ekranda görünen şey artık aynı. İçerideki işaretler{" "}
            <code>aria-hidden</code>: taşıdıkları bilgi yanlarındaki etikette zaten var.
          </p>
          <p style={P}>
            <b style={STRONG}>Bayrak:</b> <code>Flag</code> width/height taşımayan çıplak
            bir <code>&lt;svg viewBox=&quot;0 0 60 40&quot;&gt;</code> döndürüyor ve kabı
            ölçülmezse 300 × 150&apos;ye açılıyor; hakkımızda sayfası bir kez tam bu
            yüzden çöktü. Üçünde de bayrağın kabı sabit pikselle sınırlı.
          </p>
          <p style={P}>
            <b style={STRONG}>Hareket:</b> üçü de sunucu bileşeni ve hareketin tamamı saf
            CSS; tarayıcıya bu bloklardan tek satır JavaScript inmiyor.{" "}
            <code>useReducedMotion</code> hiçbirinde yok. Animasyon tanımlarının tamamı{" "}
            <code>prefers-reduced-motion: no-preference</code> içinde, yani{" "}
            <b style={STRONG}>reduce açıkken üçünden de sıfır animasyon</b> sayılıyor;
            duraklatılmış bir animasyon bile kalmıyor ve duruş kareleri okunur.
          </p>
          <p style={P}>
            <b style={STRONG}>Metnin rengi hiç oynamıyor.</b> Bu turda etiket geri
            geldiği için yeni bir risk doğdu: sönüp yanan bir yazı, kontrastı en kötü
            karede eşiğin altına düşürür. Üç adayda da hareketin dokunduğu özellikler
            yalnızca kenarlık, zemin, gölge ve konum; hiçbir animasyon okunan bir metnin{" "}
            <code>color</code>&apos;ına yazmıyor. Hover da öyle.
          </p>
          <p style={P}>
            <b style={STRONG}>Periyot:</b> sekiz yeni periyot (10,7 · 10,9 · 13,1 · 13,9
            · 15,7 · 16,7 · 19,3 · 22,3) ve hepsinin onda birliği ASAL. Ne birbirleriyle
            ne de sitedeki başka bir periyotla makul bir sürede senkron oluyorlar; liste ve onu
            yeniden üretme komutu <code>aktarim.css</code>&apos;in başında. Liste bu
            turda yeniden üretildi.
          </p>
          <p style={P}>
            <b style={STRONG}>Hover:</b> üçünde de imleç gelince hareket DURUYOR ve
            nesnelerin hepsi birden yanıyor. Hover kuralları bilerek animasyonun
            dokunmadığı özelliklerde: duraklatılmış bir animasyon değerini yazmaya devam
            ettiği için aynı özelliğe yazılan bir geçiş hiç görünmezdi.
          </p>
          <p style={P}>
            <b style={STRONG}>Ad alanı:</b> canlı bento <code>.bn-</code>, canlı
            hakkımızda <code>.ab-</code>, önceki iki tur <code>.hb1-</code> …{" "}
            <code>.hb6-</code>. Bu turunkiler <code>.hb7-</code>, <code>.hb8-</code> ve{" "}
            <code>.hb9-</code>; hiçbiri canlı bir sınıfı ezmiyor. Renkli kenar şeridi
            hiçbirinde yok.
          </p>
        </div>

        {/* --------------------------------------------------------- taban */}
        <div style={BOX}>
          <b style={KICKER_BASE}>Taban · ex · karar turundan önceki canlı blok</b>
          <p style={P}>
            <b style={STRONG}>Bu blok artık BASILMIYOR ve sebebi kararın kendisi.</b>{" "}
            Taban, &quot;bugün canlıda olan hâl&quot;i göstermek için buradaydı ve o
            hâli canlı sınıflarla (<code>.ab-bento</code> · <code>.ab-b</code> ·{" "}
            <code>.ab-bo-*</code>) canlı CSS&apos;ten okuyordu. Aday 7 canlıya
            taşınınca o ad alanının tamamı <code>hakkimizda.css</code>&apos;ten
            silindi; blok basılmaya devam etseydi biçimsiz çıkardı ve üç bayrak,
            kabını kaybettiği için 300 × 150&apos;ye açılırdı (bu depoda iki kez
            yaşanmış tuzak). Ölçüldü: silmeden önce ekranda bayrak kutusu 176 × 117
            oluyordu.
          </p>
          <p style={P}>
            Ölçüm tablolarındaki <b style={STRONG}>&quot;Taban · bugünkü blok&quot;</b>{" "}
            satırları KAYIT olarak duruyor; kıyasın iki ucundan biri o sayılardı.
            Bloğun bileşeni de silinmedi:{" "}
            <code>src/components/lab/AboutBentoBase.tsx</code> yerinde, yalnızca
            çağrılmıyor. Bugünün canlı hâline bakmak için{" "}
            <code>/hakkimizda</code> · 1. bölüm.
          </p>
        </div>
      </div>

      {CANDIDATES.map((c) => (
        <div key={c.id} data-blok={`${c.id} · ${c.name}`}>
          <div className="container-o">
            <Kunye c={c} />
          </div>
          <c.Section />
        </div>
      ))}

      {/* ============================================================= ex */}
      <div className="container-o">
        <div style={RULE}>
          <h2 className="h2" style={{ color: "var(--text-900)" }}>
            ex · önceki iki turun altı adayı
          </h2>
          <p
            style={{
              marginTop: 12,
              maxWidth: "72ch",
              fontSize: 15,
              lineHeight: 1.65,
              color: "var(--text-600)",
            }}
          >
            Hiçbiri silinmedi ve silinmemeli: bu turun bandı onların iki ucundan
            türetildi. 1. turun üçü (Karo · Beyan · Yerinde) &quot;iyi olmuş hoş olmuş
            ama fazla bilgi&quot;, 2. turun üçü (Akış · Oyma · Mühür) &quot;bomboş&quot;.
            Yukarıdaki üç aday tam olarak bu iki cümlenin arasında duruyor ve ikisi
            doğrudan bir eskinin üstüne kuruldu: <b style={STRONG}>Künye</b> aday 4
            &quot;Akış&quot;ın iskeletini alıp etiketi geri veriyor,{" "}
            <b style={STRONG}>Levha</b> aday 5 &quot;Oyma&quot;nın yüzey mantığını alıp
            rakamın yerine kelimeyi koyuyor.
          </p>
        </div>

        <div style={BOX}>
          <b style={KICKER_BASE}>Ana sayfa bentosu neden güçlü (1. turun teşhisi)</b>
          <p style={P}>
            Ana sayfadaki bento (<code>TrustLayer.tsx</code> · <code>.bn-</code>) dört
            karo ve gücü <b style={STRONG}>dört ayrı kararı birden vermesinden</b>{" "}
            geliyor: hücreler eşit değil, iki karo siyah, her karonun kendi mekaniği var
            ve karo bir sayı saymıyor, bir cümle söyleyip onu gösteriyor. Teşhis üç turdur
            geçerli. Bu turun üçü de ilk üç maddeyi tutuyor; dördüncüsü hâlâ tutulmuyor
            ama artık yarısı tutuluyor: karo bir cümle söylemiyor, bir AD söylüyor.
          </p>
        </div>
      </div>

      {EX.map((c) => (
        <div key={c.id} data-blok={c.id}>
          <div className="container-o">
            <KunyeEx c={c} />
          </div>
          <c.Section />
        </div>
      ))}

      <div className="container-o" style={{ paddingBottom: 72 }}>
        <div style={BOX}>
          <b style={KICKER}>Karar verirken bakılacak üç şey</b>
          <p style={P}>
            <b style={STRONG}>1 · Izgara ne olsun?</b> Aday 7 ana sayfanın ızgarasını
            birebir koruyor, aday 8 onu dikey kuruyor, aday 9 ölçüyü tipografiye
            bırakıyor. Korumanın bedeli ana sayfayla benzeşmek; dikeye çevirmenin bedeli
            920 pikselin altında fikrin tamamen kaybolması.
          </p>
          <p style={P}>
            <b style={STRONG}>2 · Rakam kalsın mı?</b> Aday 7&apos;de rakam künye
            satırının başında ve ismin eşiti, aday 9&apos;da kelimenin omzunda bir üst
            simge, aday 8&apos;de hiç yok. Üçünde de rakam artık manşet değil; bugünkü
            canlı bloğun asıl kusuru rakamı manşet yapmasıydı.
          </p>
          <p style={P}>
            <b style={STRONG}>3 · Nesne işaretle mi gösterilsin, adıyla mı?</b> Aday 7
            ikonu ve adı birlikte veriyor, aday 9 yalnızca adı (dayanaklar hariç), aday 8
            ikisini karoya göre değiştiriyor. Bu, üçünün en görünür farkı ve müşterinin
            &quot;görsel takıl&quot; cümlesine verilecek cevabı belirliyor.
          </p>
        </div>
      </div>
    </main>
  );
}
