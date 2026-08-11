import HakAkisTaban from "@/components/lab/HakAkisTaban";
import HakAkis1Sicil from "@/components/lab/HakAkis1Sicil";
import HakAkis2Bakista from "@/components/lab/HakAkis2Bakista";
import HakAkis3Sahne from "@/components/lab/HakAkis3Sahne";

/* ============================================================================
   LAB · /hakkimizda · 1. bölümü ikiye ayırma turu

   MÜŞTERİNİN CÜMLESİ, BİREBİR:
     "şu hakkımızda sayfasındaki bentoyu kendi olduğu kısımdan ayırıp o kısmı
      kimiz diye paragraf ve vizyon misyon kısmıyla tutup bento kısmını ayrı
      başlıkla bi section daha ekleyip ana sayfadaki gibi bir şeylerle mi
      yapsak? dene ya labda emin olamadım çok fikir var."

   Bu bir uygulama turu DEĞİL, bir karar turu: müşteri kararsız olduğunu
   söylüyor. O yüzden bu sayfada üç güzel kabuk değil ÜÇ FARKLI CEVAP var ve
   ayrışma ekseni renk değil İÇERİK: kaç bölüm, bento ne oluyor, vizyon/misyon
   kendi bloğunu hak ediyor mu, hangi ana sayfa kalıbı işe yarıyor.

   Bu sayfa canlı hiçbir şeye dokunmuyor. /hakkimizda, hakkimizda.css ve
   about.ts bu turda yalnızca OKUNDU.
   ========================================================================= */

/* --------------------------------------------------------------- TEŞHİS ÖLÇÜMÜ
   Bugünkü 1. bölüm. Sayılar tarayıcıda, sabit genişlikli aynı köken iframe
   içinde alındı (resize_window gerçek yerleşimi değiştirmiyor). Yükseklikler
   bölüm dolgusu dahil, metin sayımı DOM gezilerek: gizli ögeler
   (display:none · visibility:hidden) ve <style>/<script> atlanıyor,
   aria-hidden alt ağaçları dahil (ekran okuyucudan gizlenmiş bir rakam
   ekranda hâlâ duruyor). */
const TESHIS_COLS = ["genişlik", "1. bölüm", "sayfa", "payı", "h2 ile bento arası"];

const TESHIS: { w: string; sec: number; doc: number; pay: string; ara: number }[] = [
  { w: "320 px", sec: 2641, doc: 12790, pay: "%20,6", ara: 1253 },
  { w: "375 px", sec: 2501, doc: 11901, pay: "%21,0", ara: 1126 },
  { w: "768 px", sec: 2084, doc: 9937, pay: "%21,0", ara: 779 },
  { w: "1440 px", sec: 1550, doc: 7906, pay: "%19,6", ara: 751 },
];

/* Bölümün içindeki dört parça, 1440 pikselde. "Okuma modu" = ziyaretçinin
   gözünü değiştirmek zorunda kaldığı yer: fotoğraf bakılır, paragraf okunur,
   beyan kartı ayrı bir sesle okunur, bento taranır. */
const PARCA_COLS = ["parça", "yükseklik", "görünür metin", "ne yapıyor"];

const PARCA: { k: string; h: number; t: number; is: string }[] = [
  { k: "fotoğraf + başlık + üç paragraf", h: 440, t: 678, is: "anlatıyor" },
  { k: "vizyon + misyon (iki kart)", h: 227, t: 291, is: "beyan ediyor" },
  { k: "kartların künye satırı", h: 19, t: 79, is: "şerh düşüyor" },
  { k: "bento (dört karo)", h: 530, t: 291, is: "dizin veriyor" },
];

/* --------------------------------------------------------------- ADAY ÖLÇÜMÜ
   Her satır ayrı bir yüklemede ölçüldü. Yatay taşma scrollWidth ile DEĞİL,
   gerçekten scrollTo(9999, 0) denenip scrollX okunarak (body'de
   overflow-x: clip var ve scrollWidth temiz görünüyor). Animasyon sayısı
   getAnimations() ile, yalnızca iterations === Infinity olanlar. */
const OLCUM_COLS = [
  "",
  "bölüm",
  "element",
  "görünür metin",
  "animasyon",
  "periyot (s)",
  "320 px",
  "375 px",
  "768 px",
  "1440 px",
  "yatay taşma",
];

const OLCUM: { k: string; v: (string | number)[] }[] = [
  {
    k: "Taban · bugünkü blok",
    v: [1, 203, 1339, 25, "10,9 · 13,1", 2641, 2501, 2084, 1550, 0],
  },
  { k: "Aday 1 · Sicil", v: [1, 53, 1083, 5, "14,09", 1737, 1632, 1490, 1057, 0] },
  {
    k: "Aday 2 · Bir bakışta",
    v: [2, 220, 1526, 19, "11,03 · 13,03 · 17,09 · 22,9", 3065, 2856, 2569, 1808, 0],
  },
  {
    k: "Aday 3 · Sahne",
    v: [3, 113, 1263, 11, "9,11 · 19,13 · 23,3 · 26,3", 2216, 2053, 1987, 1766, 0],
  },
];

/* --------------------------------------------------------------- KIYAS TABLOSU
   Bu turun asıl tablosu: sayılar değil KARARLAR yan yana. Her satır
   müşterinin sorusunun bir parçası. */
const KIYAS_COLS = ["", "Taban", "Aday 1 · Sicil", "Aday 2 · Bir bakışta", "Aday 3 · Sahne"];

const KIYAS: { k: string; v: string[] }[] = [
  { k: "Kaç bölüm", v: ["1", "1", "2", "3"] },
  {
    k: "Bento ne oluyor",
    v: ["dört karo, dizin", "ölüyor, tek satır ray kalıyor", "kendi başlığına çıkıyor", "sahneye dönüşüyor"],
  },
  {
    k: "Vizyon / misyon nerede",
    v: ["girişin içinde, iki kart", "girişin içinde, kayıt satırı", "girişin içinde, iki kart", "KENDİ BÖLÜMÜ"],
  },
  {
    k: "Hangi ana sayfa kalıbı",
    v: ["TrustLayer (yalnız ızgara)", "yok, bilerek", "TrustLayer (yasa)", "ThreeCountries"],
  },
  { k: "Ekrandaki nesne adı", v: ["18", "0", "18", "8"] },
  { k: "Sayaç var mı", v: ["4", "4", "4", "yok"] },
  { k: "Yeni yazılan cümle", v: ["0", "0", "2", "3"] },
  {
    k: "Alt bölümlerle tekrarı",
    v: [
      "18 ad, dördü de aşağıda",
      "hiç yok",
      "18 ad + 4 bölüm başlığı",
      "8 ad (ülke + halka)",
    ],
  },
  {
    k: "Sürekli hareket",
    v: ["2 periyot · 25 animasyon", "1 periyot · 5", "4 periyot · 19", "4 periyot · 11"],
  },
  { k: "Element sayısı", v: ["203", "53", "220", "113"] },
  {
    k: "1440 px yükseklik",
    v: ["1550", "1057  (−493)", "1808  (+258)", "1766  (+216)"],
  },
  {
    k: "375 px yükseklik",
    v: ["2501", "1632  (−869)", "2856  (+355)", "2053  (−448)"],
  },
];

/* ---------------------------------------------------------- KONTRAST TABLOSU
   Ölçülen değerler, WCAG 2.1 kontrast oranı. "Büyük" = 18,66 px kalın ya da
   24 px normal ve üstü (eşik 3,0); kalanı küçük metin (eşik 4,5). Grafik
   ögesi eşiği 3,0.

   Hiçbir animasyon okunan bir metnin color'ına yazmıyor, o yüzden her satır
   TEK bir değer: en kötü kare diye bir şey yok. */
const KONTRAST_COLS = ["nerede", "renk", "zemin", "oran", "eşik", "geçti mi"];

const KONTRAST: { k: string; c: string; z: string; o: string; e: string; g: string }[] = [
  { k: "A1 · beyan cümlesi (17 px)", c: "#080808", z: "#ffffff", o: "20,03", e: "4,5", g: "evet" },
  {
    k: "A1 · beyan etiketi (12,5 px · 700)",
    c: "#307fe2",
    z: "#ffffff",
    o: "3,99",
    e: "3,0",
    g: "evet · büyük",
  },
  { k: "A1 · rakam (30 px · 700)", c: "#080808", z: "#ffffff", o: "20,03", e: "3,0", g: "evet" },
  { k: "A1 · ölçü adı (12,5 px)", c: "#5c5c5c", z: "#ffffff", o: "6,69", e: "4,5", g: "evet" },
  { k: "A1 · fotoğraf künyesi (12,5 px)", c: "#5c5c5c", z: "#ffffff", o: "6,69", e: "4,5", g: "evet" },
  { k: "A1 · ray işareti (grafik)", c: "#5c9eeb", z: "#ffffff", o: "2,52", e: "3,0", g: "HAYIR · not" },
  { k: "A2 · karo cümlesi, açık karo", c: "#080808", z: "#ffffff", o: "20,03", e: "4,5", g: "evet" },
  { k: "A2 · karo cümlesi, koyu karo", c: "#ffffff", z: "#080808", o: "20,03", e: "4,5", g: "evet" },
  { k: "A2 · rozet rakamı, açık karo", c: "#1b56a8", z: "#e8f1fd", o: "6,26", e: "4,5", g: "evet" },
  { k: "A2 · rozet rakamı, koyu karo", c: "#5c9eeb", z: "#191919", o: "6,32", e: "4,5", g: "evet" },
  {
    k: "A2 · sektör çipi metni",
    c: "rgba(255,255,255,.92)",
    z: "#111111",
    o: "18,88",
    e: "4,5",
    g: "evet",
  },
  { k: "A2 · ülke adı, koyu karo", c: "#ffffff", z: "#080808", o: "20,03", e: "4,5", g: "evet" },
  { k: "A2 · halka adı", c: "#080808", z: "#ffffff", o: "20,03", e: "4,5", g: "evet" },
  { k: "A2 · dayanak başlığı", c: "#080808", z: "#ffffff", o: "20,03", e: "4,5", g: "evet" },
  { k: "A3 · beyan cümlesi (18 px)", c: "#080808", z: "#f5f5f5", o: "18,37", e: "4,5", g: "evet" },
  {
    k: "A3 · beyan etiketi (12,5 px · 700)",
    c: "#307fe2",
    z: "#f5f5f5",
    o: "3,66",
    e: "3,0",
    g: "evet · büyük",
  },
  { k: "A3 · halka adı", c: "#080808", z: "#ffffff", o: "20,03", e: "4,5", g: "evet" },
  { k: "A3 · ülke adı", c: "#080808", z: "#ffffff", o: "20,03", e: "4,5", g: "evet" },
  { k: "A3 · yay çizgisi (grafik)", c: "#5c9eeb", z: "#ffffff", o: "2,52", e: "3,0", g: "HAYIR · not" },
];

/* ------------------------------------------------------------------ üç aday */
const CANDIDATES = [
  {
    id: "Aday 1",
    name: "Sicil",
    kind: "TEK bölüm · bento ölüyor",
    Section: HakAkis1Sicil,
    bolum: 1,
    cevap:
      "HAYIR, ayırmaya gerek yok. Ayrılması istenen blok kendi başlığını hak etmiyor: bugünkü bento sayfanın 2, 4, 5 ve 6. bölümlerinin bir dizini ve o dizinin bağlantıları bir tur önce müşterinin isteğiyle kaldırıldı (\"bir yere yönlendiren bir tarzı fln olmasın... sadece sayı verelim\"). Ekranda tıklanamayan bir içindekiler tablosu duruyor. Ona bir bölüm başlığı vermek, sayfada iki kez okunan on sekiz ada ikinci okunuşunda bir rütbe kazandırmak olurdu.",
    idea:
      "Bölüm tek kalıyor ama dört okuma modu üçe iniyor. Bento siliniyor; on sekiz nesne adı (üç ülke, beş halka, altı sektör, dört dayanak başlığı) ekrandan tamamen kalkıyor çünkü dördü de sayfanın devamında kendi bölümünde açıklamasıyla duruyor. Geriye dört RAKAM ve saydıkları şeyin adı kalıyor: soldan sağa 3 · 4 · 5 · 6, yani sayfanın kendi bölüm sırası (ülkeler · dayanaklar · zincir · sektörler). Vizyon ve misyon kutudan çıkıp kayıt satırına dönüyor: bugünkü iki beyaz kart, ekranda bentonun karolarıyla aynı rütbede duruyor ve biri firmanın resmî beyanı, diğeri bir sayaç.",
    kalip:
      "HİÇBİRİ, ve bu adayın asıl tezi bu. Müşterinin \"ana sayfadaki gibi bir şeylerle mi yapsak\" sorusuna verdiği cevap şu: ana sayfanın beş kalıbı da (ThreeCountries · HomeServices · Chain · TrustLayer · Profiles) KENDİ İÇERİĞİNİ taşıyan bölümler için tasarlandı. Bir dizine o kalıplardan birini giydirmek dizini içerik yapmaz, yalnızca uzatır.",
    motion:
      "Tek mekanik, tek periyot: 14,09 s. Ray boyunca soldan sağa bir ışık geçiyor, dört işaret sırayla onun altında bir tık büyüyor. Yüzde birliği (1409) asal ve listedeki hiçbir periyodun katı ya da böleni değil (liste seçim anında 86, tur sonunda 101). Animasyon yalnızca transform ve opacity yazıyor; hover başka özelliklere (background, box-shadow) yazıyor ve o yüzden reduce altında da çalışıyor.",
    cost:
      "Dört rakam bir bölüm sonunu kapatacak kadar ağır değil: bölüm bir künye satırıyla bitiyor ve sayfanın en görsel bloğu kayboluyor. Ölçüldü: element 203'ten 53'e, blok 1440 pikselde 1.550'den 1.057'ye, 375 pikselde 2.501'den 1.632'ye iniyor. Kazanç gerçek ama ekranda kalan da o kadar az: dört adayın en sessizi, tek periyot ve beş animasyon. İkinci bedel: müşteri \"ana sayfadaki gibi bir şeylerle\" cümlesinin karşılığını ekranda GÖRMÜYOR, bir gerekçe metninde okuyor. Bu aday ancak teşhis kabul edilirse kabul edilir.",
  },
  {
    id: "Aday 2",
    name: "Bir bakışta",
    kind: "İKİ bölüm · müşterinin cümlesinin birebir uygulanmışı",
    Section: HakAkis2Bakista,
    bolum: 2,
    cevap:
      "EVET, ikiye ayrılıyor ve müşterinin tarif ettiği gibi: A bölümü \"kimiz\" (paragraf + vizyon/misyon), B bölümü kendi başlığıyla bento.",
    idea:
      "A bölümü bugünküyle aynı, tek fark bentonun oradan çıkmış olması. B bölümü kendi başlığını (\"Ortac bir bakışta\") ve kendi zeminini (gri) alıyor. Asıl iş B'nin İÇİNDE: bugünkü bento bir sayı sayıyor, bu bento bir CÜMLE söyleyip onu gösteriyor. Her karonun manşeti ilgili bölümün kendi başlığı, rakam ise köşede küçük bir rozet. Bugünkü blokta tam tersi: rakam karonun en büyük nesnesi ve cümle hiç yok.",
    kalip:
      "TrustLayer (ana sayfa · \"Neden Ortac Global?\" · .bn-). Beş kalıp arasından bu seçildi çünkü işi birebir aynı: eşit olmayan dört karoda dört ayrı iddiayı yan yana koymak. AMA GEOMETRİ DEĞİL YASA ALINDI. Canlı bento zaten o ızgarayı kopyalıyor (bkz. hakkimizda.css · BENTO · KÜNYE); lab kaydında tutulmayan madde de yazılı: \"karo bir sayı saymıyor, bir cümle söyleyip onu gösteriyor\" ve \"her karonun kendi mekaniği var\". Bu adayın tek yeni işi o iki maddeyi tutmak. Izgara TrustLayer'ın kendi bölüşümü: on iki sütun, 7 + 5 üstte, 5 + 7 altta, koyular köşegende.",
    motion:
      "Dört karo, dört mekanik, dört periyot: 11,03 · 13,03 · 17,09 · 22,90 s. Karo başına tek mekanik olması yasanın dördüncü maddesi. Yüzde birlikleri (1103 · 1303 · 1709 · 2290) birbirinin ve listedeki hiçbir periyodun katı ya da böleni değil (liste seçim anında 86, tur sonunda 101). Hareketler minimal: sırayla bir tık parlama ve rayda geçen ışık. İmleç bir karoya gelince o karonun hareketi duruyor ve nesneleri birden yanıyor.",
    cost:
      "TEKRAR. Ekrandaki on sekiz nesne adının üstüne dört bölüm BAŞLIĞI daha biniyor: ziyaretçi \"Üç ülkede çalışıyoruz\" cümlesini önce burada, sonra iki ekran aşağıda bölüm başlığı olarak okuyor. Bu adayın bedeli tam olarak bu ve karar bu satırda veriliyor: dizin kabul edilirse tekrar da kabul edilmiş oluyor. İkinci bedel ölçüldü: bölüm bir tane daha eklendiği için blok 1440 pikselde 258 piksel uzuyor (1.550 → 1.808), 375 pikselde 355 (2.501 → 2.856). Üçüncüsü: üç adayın en kalabalığı, 220 element (taban 203).",
  },
  {
    id: "Aday 3",
    name: "Sahne",
    kind: "ÜÇ bölüm · bento dizin olmaktan çıkıyor",
    Section: HakAkis3Sahne,
    bolum: 3,
    cevap:
      "EVET ama başka türlü. Bölünme sonuna kadar gidiyor (kimiz · vizyon-misyon · sahne) ve bento bir dizin olmayı BIRAKIYOR: bir bölüm başlığı ancak kendi işini yapan bir içeriğe verilir.",
    idea:
      "Vizyon ve misyon kendi bölümünü alıyor, kutusuz ve bir kademe büyük puntoyla; bugün bu iki cümle iki beyaz kartın içinde ve o kartlar ekranda bentonun karolarıyla aynı rütbede duruyor. Üçüncü bölüm ise açılışın kendi cümlesinin RESMİ. OPENING.lead \"Üç ülkede çalışan tek bir ekip\" diyor, WHERE.lead \"zincir de aynı\" diyor ve bu iki cümlenin sayfada hiçbir görsel karşılığı yok. Sahne onu çiziyor: tek bir yay, üstünde zincirin beş halkası, altında üç ülke diski ve her diski yaya bağlayan birer askı.",
    kalip:
      "ThreeCountries (ana sayfa · §3 · .uk3-). Beş kalıp arasından bu seçildi çünkü tek yaptığı iş bu: birden çok şeyi TEK BİR EKSENE oturtup \"bunlar farklı yerlerdeki aynı şey\" demek. Alınanlar: karesel Bézier kubbe (M0 → Q orta → 1000), altındaki iki sönük kopya (biraz aşağıda ve biraz daha düz, yoksa iç içe kemer okunuyor), 1/6 · 1/2 · 5/6 sütun merkezleri, daireye kırpılmış bayrak diski. Alınmayan: yerinde açılan kıyas paneli. Sahne bir menü değil, bir cümle.",
    motion:
      "Sayfada tek sahne olduğu için hareket zengin olabiliyor (kural: çok karolu düzende minimal, tek sahnede zengin). Dört mekanik: yay boyunca giden ışık (9,11 s), üç disk sırayla (19,13 s), beş düğüm sırayla (23,30 s), beyan bloğundaki saç teli (26,30 s). Yüzde birlikleri (911 · 1913 · 2330 · 2630) birbirinin ve listedeki hiçbir periyodun katı ya da böleni değil (liste seçim anında 86, tur sonunda 101). Animasyonlar konumlandırma taşımayan ögelere yazılıyor: <li>'lerin transform'u yerleşimin kendisi ve aynı özelliğe yazmak dar ekranda işaretleri yerinden oynatırdı.",
    cost:
      "SAHNE 2. BÖLÜMÜ ÖNCELİYOR. Üç bayrak diski, sayfanın hemen ardından gelen \"Üç ülkede çalışıyoruz\" bölümünde bir kez daha çıkıyor; sahne o bölümün girişini çalıyor. İkinci bedel: 680 pikselin altında yay tamamen gizleniyor ve sahne iki sıradan listeye iniyor, yani fikrin kendisi dar ekranda yok (ölçüldü: 375 pikselde sonsuz animasyon sayısı 11'den 10'a düşüyor, düşen tam olarak yay ışığı). Üçüncüsü: sayaç yok, dolayısıyla müşterinin bir tur önce istediği \"sayısal veri, sayaçlı\" bu adayda hiç görünmüyor. Dördüncüsü: üç bölüm başlığı ve üç giriş cümlesi, yani sayfaya iki h2 daha ekleniyor.",
  },
];

/* ------------------------------------------------------------------ biçimler
   Bu sayfa bir iskele; kendi CSS dosyası yok, kutular satır içi. Aday
   bloklarının biçimi lab-hak1 / lab-hak2 / lab-hak3'te. */
const BOX: React.CSSProperties = {
  marginTop: 28,
  padding: "22px 22px 24px",
  border: "1px solid var(--border)",
  borderRadius: "var(--r-lg)",
  background: "var(--white)",
};

const KICKER: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.04em",
  color: "var(--blue-900)",
};

const KICKER_BASE: React.CSSProperties = { ...KICKER, color: "var(--text-600)" };

const LABEL: React.CSSProperties = {
  display: "block",
  marginTop: 16,
  fontFamily: "var(--font-sans)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  color: "var(--text-600)",
};

const P: React.CSSProperties = {
  margin: "10px 0 0",
  maxWidth: "78ch",
  fontFamily: "var(--font-sans)",
  fontSize: 14.5,
  lineHeight: 1.65,
  color: "var(--text-600)",
};

const STRONG: React.CSSProperties = { color: "var(--text-900)", fontWeight: 700 };

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

const CELL_T: React.CSSProperties = {
  ...CELL,
  textAlign: "left",
  fontVariantNumeric: "normal",
};

/* Yatay kaydırılan kaplarda position: relative ZORUNLU. Yoksa mutlak konumlu
   torunlar (özellikle .sr-only) dışarı kaçıp belgeyi uzatıyor; bu depoda iki
   kez oldu. */
const SCROLLER: React.CSSProperties = {
  position: "relative",
  marginTop: 22,
  overflowX: "auto",
};

const RULE: React.CSSProperties = {
  marginTop: 64,
  paddingTop: 8,
  borderTop: "1px solid var(--border)",
};

const TAV: React.CSSProperties = {
  ...BOX,
  borderColor: "var(--blue-500)",
  background: "var(--blue-100)",
};

function Kunye({ c }: { c: (typeof CANDIDATES)[number] }) {
  return (
    <div style={BOX}>
      <b style={KICKER}>
        {c.id} · {c.name} · {c.kind}
      </b>
      <span style={LABEL}>&quot;Ayıralım mı&quot; sorusuna cevabı</span>
      <p style={{ ...P, marginTop: 6 }}>{c.cevap}</p>
      <span style={LABEL}>Fikir</span>
      <p style={{ ...P, marginTop: 6 }}>{c.idea}</p>
      <span style={LABEL}>Hangi ana sayfa kalıbı ve neden</span>
      <p style={{ ...P, marginTop: 6 }}>{c.kalip}</p>
      <span style={LABEL}>Hareket ne yapıyor</span>
      <p style={{ ...P, marginTop: 6 }}>{c.motion}</p>
      <span style={LABEL}>Neyi feda ediyor</span>
      <p style={{ ...P, marginTop: 6 }}>{c.cost}</p>
    </div>
  );
}

export default function LabHakkimizdaAkisPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Hakkımızda · 1. bölümü ikiye ayırma turu
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "76ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          Müşterinin cümlesi:{" "}
          <b style={STRONG}>
            &quot;şu hakkımızda sayfasındaki bentoyu kendi olduğu kısımdan ayırıp o kısmı
            kimiz diye paragraf ve vizyon misyon kısmıyla tutup bento kısmını ayrı başlıkla
            bi section daha ekleyip ana sayfadaki gibi bir şeylerle mi yapsak? dene ya labda
            emin olamadım çok fikir var.&quot;
          </b>{" "}
          Bu bir uygulama turu değil, bir <b style={STRONG}>karar turu</b>: müşteri kararsız
          olduğunu kendisi söylüyor. O yüzden aşağıda üç güzel kabuk değil{" "}
          <b style={STRONG}>üç farklı cevap</b> var ve ayrışma ekseni renk değil içerik:
          kaç bölüm, bento ne oluyor, vizyon/misyon kendi bloğunu hak ediyor mu, hangi ana
          sayfa kalıbı gerçekten işe yarıyor. Canlı sayfaya, <code>hakkimizda.css</code>&apos;e
          ve <code>about.ts</code>&apos;e dokunulmadı; üçü de yalnızca okundu.
        </p>

        {/* ======================================================= TEŞHİS */}
        <div style={BOX}>
          <b style={KICKER}>Teşhis · bugünkü 1. bölüm kaç iş birden yapıyor</b>
          <p style={P}>
            Ölçüldü: bölüm <b style={STRONG}>dört</b> okuma modu taşıyor ve tek bir h2
            altında duruyor. Fotoğrafa bakılıyor, üç paragraf okunuyor, iki beyan kartı
            başka bir sesle okunuyor, dört karo taranıyor. Dördü de tek başına doğru; sorun
            <b style={STRONG}> aynı başlığın altında</b> olmaları.
          </p>
          <p style={P}>
            <b style={STRONG}>Asıl bulgu başlıkla içeriğin uyuşmaması.</b> Başlık &quot;Kim
            olduğumuz&quot; diyor; bentodaki dört karo ise sayfanın 2, 4, 5 ve 6.
            bölümlerini sayıyor. Yani karolar &quot;kim olduğumuz&quot; sorusuna değil,{" "}
            <b style={STRONG}>&quot;bu sayfanın devamında ne var&quot;</b> sorusuna cevap
            veriyor. Bento bir dizin.
          </p>
          <p style={P}>
            <b style={STRONG}>Ve bu dizin kullanılamıyor.</b> Bir tur önce üç kutucuk birer
            çapaydı ve tıklanınca kendi bölümüne iniyordu; müşteri o işi iptal etti
            (&quot;bir yere yönlendiren bir tarzı fln olmasın aşağı fln göndermesin ya
            sadece sayı verelim&quot;). Bugün ekranda{" "}
            <b style={STRONG}>tıklanamayan bir içindekiler tablosu</b> duruyor. Müşterinin
            &quot;ayıralım mı&quot; sezgisi bu yüzden doğru: iki farklı iş tek başlığın
            altında.
          </p>
          <p style={P}>
            <b style={STRONG}>İki parça hiçbir genişlikte aynı ekranı paylaşmıyor.</b> 1440
            pikselde başlık ile bentonun arası <b style={STRONG}>751</b> piksel, 375
            pikselde <b style={STRONG}>1.126</b>: yani telefonda başlığı okuyan kişi bentoyu
            görene kadar üç ekran kaydırıyor. Ayrı durdukları zaten doğru, yalnızca
            ekranda öyle yazmıyor.
          </p>
          <p style={P}>
            <b style={STRONG}>Bölüm sayfanın en uzun bölümü.</b> 1440 pikselde 1.550 piksel
            ve ikincisi (5. bölüm) 993. Sayfanın beşte biri bu tek bölümde.
          </p>
        </div>

        <div style={SCROLLER}>
          <table style={TABLE}>
            <caption style={CAPTION}>
              <b style={STRONG}>1. bölümün ölçüsü.</b> Sabit genişlikli aynı köken iframe
              içinde, her genişlik için ayrı yükleme.{" "}
              <b style={STRONG}>h2 ile bento arası</b> = başlığın üst kenarı ile bentonun üst
              kenarı arasındaki belge mesafesi; 900 pikselden büyük her değer &quot;aynı
              ekranda görünmüyor&quot; demek.
            </caption>
            <thead>
              <tr>
                {TESHIS_COLS.map((c, i) => (
                  <th key={c} scope="col" style={{ ...TH, textAlign: i === 0 ? "left" : "right" }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TESHIS.map((r) => (
                <tr key={r.w}>
                  <th scope="row" style={CELL_K}>
                    {r.w}
                  </th>
                  <td style={CELL}>{r.sec}</td>
                  <td style={CELL}>{r.doc}</td>
                  <td style={CELL}>{r.pay}</td>
                  <td style={CELL}>{r.ara}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={SCROLLER}>
          <table style={TABLE}>
            <caption style={CAPTION}>
              <b style={STRONG}>Bölümün içindeki dört parça</b>, 1440 pikselde. Görünür metin
              DOM gezilerek sayıldı: gizli ögeler (<code>display:none</code> ·{" "}
              <code>visibility:hidden</code>) ve <code>&lt;style&gt;</code> /{" "}
              <code>&lt;script&gt;</code> atlanıyor, <code>aria-hidden</code> alt ağaçları
              dahil (ekran okuyucudan gizlenmiş bir rakam ekranda hâlâ duruyor).
            </caption>
            <thead>
              <tr>
                {PARCA_COLS.map((c, i) => (
                  <th key={c} scope="col" style={{ ...TH, textAlign: i === 0 ? "left" : "right" }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PARCA.map((r) => (
                <tr key={r.k}>
                  <th scope="row" style={CELL_K}>
                    {r.k}
                  </th>
                  <td style={CELL}>{r.h}</td>
                  <td style={CELL}>{r.t}</td>
                  <td style={{ ...CELL_T, textAlign: "right" }}>{r.is}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ============================================ ÜÇÜNÜN ORTAK SÖZÜ */}
        <div style={BOX}>
          <b style={KICKER}>Üçünün de tuttuğu sözler</b>
          <p style={P}>
            <b style={STRONG}>Uydurma firma bilgisi yok.</b> Kuruluş yılı, çalışan sayısı,
            müşteri sayısı, lisans numarası, adres, telefon, ödül ve &quot;en çok tercih
            edilen&quot; türü etiket üçünde de geçmiyor. Vizyon ve misyon metinleri{" "}
            <code>about.ts</code>&apos;te ne yazıyorsa o; tek harfi değişmedi.
          </p>
          <p style={P}>
            <b style={STRONG}>Yeni yazılan metin sayılabilir kadar az ve firma hakkında
            değil.</b> Aday 1&apos;de sıfır. Aday 2&apos;de iki: B bölümünün başlığı
            (&quot;Ortac bir bakışta&quot;) ve giriş cümlesi; ikisi de SAYFA hakkında
            konuşuyor. Aday 3&apos;te üç: B bölümünün etiket başlığı (&quot;Vizyon ve
            misyon&quot;), C bölümünün başlığı (&quot;Üç ülke, tek zincir&quot;) ve çizimin
            künye satırı. C&apos;nin başlığı yeni bir olgu getirmiyor:{" "}
            <code>WHERE.lead</code> ve <code>OPENING.body[0]</code> zaten aynı şeyi yazıyor.
          </p>
          <p style={P}>
            <b style={STRONG}>Ofis iddiası tekil değil.</b> Üç ülkenin üçünde de firmanın
            kendi ofisi var ve üçünü de kendisi yürütüyor; hiçbir adayda &quot;Dubai&apos;deki
            ofisimizden&quot; türü bir ifade yok. Ülkeler için &quot;bölge&quot; kelimesi
            geçmiyor.
          </p>
          <p style={P}>
            <b style={STRONG}>Uzun tire yok</b>, renkli sol/üst şerit yok,{" "}
            <code>&lt;select&gt;</code> yok, sahte başarı veren form yok.
          </p>
          <p style={P}>
            <b style={STRONG}>Hidrasyon:</b> üçü de sunucu bileşeni. Hareketin tamamı saf CSS
            ve <code>useReducedMotion</code> hiçbirinde yok. İstemciye inen tek şey
            paylaşılan <code>FadeUp</code> / <code>SplitWords</code> ve sayaç; sayaç
            markup&apos;a son rakamı basıyor, yani JS kapalıyken de doğru sayı duruyor.
          </p>
          <p style={P}>
            <b style={STRONG}>Bayrak tuzağı:</b> <code>Flag</code> width/height taşımayan
            çıplak bir <code>&lt;svg viewBox=&quot;0 0 60 40&quot;&gt;</code> döndürüyor ve
            kabı ölçülmezse 300 × 150&apos;ye açılıyor; bu depoda iki sayfa tam bu yüzden
            bozuldu. Bayrak basan iki adayda da (2 ve 3) kap sabit piksel +{" "}
            <code>overflow:hidden</code>.
          </p>
          <p style={P}>
            <b style={STRONG}>Hareket kapısı:</b> üç adayın da bütün animasyon tanımları{" "}
            <code>prefers-reduced-motion: no-preference</code> içinde. Reduce açıkken
            duraklatılmış bir animasyon bile kalmıyor ve duruş kareleri okunur (ışık kadrajın
            dışında, işaretler yerinde, tel düz gri). Hover kuralları bilerek animasyonun
            DOKUNMADIĞI özelliklerde (background, box-shadow, border-color): duraklatılmış bir
            animasyon kendi özelliğini yazmaya devam eder ve aynı özelliğe konan bir hover
            kuralı hiç görünmezdi. Aynı sebeple hover kuralları media sorgusunun dışında,
            yani reduce altında da çalışıyorlar.
          </p>
          <p style={P}>
            <b style={STRONG}>Kapı nasıl doğrulandı.</b> Tarayıcıda hareket tercihini
            değiştiremediğim için ölçüm <b style={STRONG}>kaynak taramasıyla</b> yapıldı: dört
            CSS dosyası süslü parantez derinliği takip edilerek gezildi ve her{" "}
            <code>animation</code> bildiriminin atalarında bir{" "}
            <code>no-preference</code> media bloğu olup olmadığına bakıldı. Sonuç:{" "}
            <code>lab-hak.css</code> 0, <code>lab-hak1.css</code> 0, <code>lab-hak2.css</code>{" "}
            0, <code>lab-hak3.css</code> 0 korumasız bildirim. Bu, çalışma anındaki bir
            sayımdan daha kesin: bir kural kapının dışındaysa kaynakta görünüyor.
          </p>
          <p style={P}>
            <b style={STRONG}>Metnin rengi hiç oynamıyor.</b> Hiçbir animasyon okunan bir
            metnin <code>color</code>&apos;ına yazmıyor, o yüzden kontrast tablosunda &quot;en
            kötü kare&quot; diye bir satır yok.
          </p>
        </div>

        {/* ------------------------------------------------------- periyotlar */}
        <div style={BOX}>
          <b style={KICKER}>Periyot katsızlığı · dokuz yeni periyot</b>
          <p style={P}>
            Sitenin kuralı: bütün sürekli animasyon periyotları birbiriyle{" "}
            <b style={STRONG}>aralarında asal</b> olacak, yoksa senkronlanıp nabız gibi
            atıyorlar. Liste bu turda <code>aktarim.css</code>&apos;in başındaki komutla{" "}
            <b style={STRONG}>yeniden üretildi</b> (liste her turda eskiyor ve bu turda başka
            ajanlar da yeni periyot ekliyor): seçim yapılırken sitede{" "}
            <b style={STRONG}>86</b> sürekli periyot dönüyordu, bir tur önceki not 67
            diyordu. <b style={STRONG}>Tur sonunda liste yeniden üretildi ve 101 çıktı</b>{" "}
            (benim dokuzum + bu tur başka ajanların eklediği altı yeni periyot); dokuzunun
            hiçbiri yeni listedeki hiçbir sayının katı ya da böleni değil.
          </p>
          <p style={P}>
            <b style={STRONG}>Seçilen dokuz:</b> 9,11 · 11,03 · 13,03 · 14,09 · 17,09 · 19,13
            · 22,90 · 23,30 · 26,30 saniye. Yüzde birlikleri (911 · 1103 · 1303 · 1409 · 1709
            · 1913 · 2290 · 2330 · 2630) hiçbiri listedeki 86 sayının katı ya da böleni değil
            ve birbirlerinin de değil. Onda birlik ızgara 15 saniyenin altında dolmuş
            durumda (tek boşluk 15,1 ve o da mevcut 1,51&apos;in katı), o yüzden kısa turlar
            yüzde birliğe indi; kural katsızlık, basamak sayısı değil.
          </p>
          <p style={P}>
            <b style={STRONG}>Seçimden SONRA tarayıcıda doğrulandı.</b> Bu sayfa 1440 pikselde
            yüklenip <code>getAnimations()</code> okundu ve{" "}
            <code>iterations === Infinity</code> olanlar sayıldı:{" "}
            <b style={STRONG}>toplam 60 sonsuz animasyon</b>, on beş ayrı keyframe adı.
            Dağılım: taban 25 (<code>aktKenar</code> 18 · <code>aktTon</code> 5 ·{" "}
            <code>aktZemin</code> 1 · <code>abKnAkim</code> 1), Aday 1 → 5, Aday 2 → 19,
            Aday 3 → 11. Okunan süreler CSS&apos;te yazan sürelerle birebir aynı çıktı.
          </p>
          <p style={P}>
            <b style={STRONG}>375 pikselde sayı 57&apos;ye iniyor</b> ve düşen üçü beklenen
            üçü: Aday 3&apos;ün yay ışığı (yay 680 pikselin altında{" "}
            <code>display:none</code>) ve tabandaki iki aktarım adaptörü. Yani dar ekranda
            gizlenen bir çizim arkada dönmeye devam etmiyor.
          </p>
        </div>

        {/* ============================================================ ölçüm */}
        <div style={SCROLLER}>
          <table style={TABLE}>
            <caption style={CAPTION}>
              <b style={STRONG}>Aday ölçümü.</b> Her satır ayrı bir yüklemede, sabit
              genişlikli aynı köken iframe içinde. Yatay taşma <code>scrollWidth</code> ile
              DEĞİL, gerçekten <code>scrollTo(9999, 0)</code> denenip <code>scrollX</code>{" "}
              okunarak (<code>body &#123; overflow-x: clip &#125;</code> yüzünden scrollWidth
              temiz görünüyor). Animasyon sayısı <code>getAnimations()</code> ile ve yalnızca{" "}
              <code>iterations === Infinity</code> olanlar. Son dört sütun dört genişlikteki
              yatay taşma, piksel.
            </caption>
            <thead>
              <tr>
                {OLCUM_COLS.map((c, i) => (
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
              {OLCUM.map((r) => (
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
      </div>

      {/* ============================================================== TABAN */}
      <div className="hkl-blok" data-blok="Taban">
        <div className="container-o">
          <div style={BOX}>
            <b style={KICKER_BASE}>Taban · bugün /hakkimizda sayfasında olan hâl</b>
            <p style={P}>
              Aşağıdaki blok canlı sayfanın 1. bölümünün birebir aynısı ve{" "}
              <b style={STRONG}>canlı sınıflara bağlı</b> (<code>.ab-open</code> ·{" "}
              <code>.ab-vm</code> · <code>.ab-kn-</code>). Kendi kopya CSS&apos;ini yazsaydım
              yarın canlıda yapılan bir düzeltme buraya yansımaz ve ölçüt sessizce yalan
              söylemeye başlardı.
            </p>
            <p style={P}>
              <b style={STRONG}>Bunun bedeli bir kez ödendi ve kayda geçti:</b> önceki lab
              turunda (<code>/lab/hakkimizda-bento</code>) taban aynı şekilde bağlıydı,
              kazanan aday canlıya taşınırken o ad alanı silindi ve taban biçimsiz kaldı;
              bayraklar kabını kaybedip 300 × 150&apos;ye açıldı. Bu turda{" "}
              <code>lab-hak.css</code>&apos;te tek bir sigorta var:{" "}
              <code>.hkl-taban svg</code> kabına sığdırılıyor. Sigorta biçim vermiyor,
              yalnızca kaza büyüklüğünü sınırlıyor.
            </p>
          </div>
        </div>
        <span className="hkl-say">1 bölüm</span>
        <HakAkisTaban />
      </div>

      {/* =========================================================== ÜÇ ADAY */}
      {CANDIDATES.map((c) => (
        <div className="hkl-blok" key={c.id} data-blok={`${c.id} · ${c.name}`}>
          <div className="container-o">
            <Kunye c={c} />
          </div>
          <span className="hkl-say">{c.bolum} bölüm</span>
          <c.Section />
        </div>
      ))}

      {/* ============================================================== KIYAS */}
      <div className="container-o" style={{ paddingBottom: 80 }}>
        <div style={RULE}>
          <h2 className="h2" style={{ color: "var(--text-900)" }}>
            Kıyas
          </h2>
        </div>

        <div style={SCROLLER}>
          <table style={TABLE}>
            <caption style={CAPTION}>
              <b style={STRONG}>Kararlar yan yana.</b> Her satır müşterinin sorusunun bir
              parçası. <b style={STRONG}>Ekrandaki nesne adı</b> = ülke, halka, sektör ve
              dayanak adlarının toplamı; sayfanın alt bölümlerinde bir kez daha yazan
              kelimeler. <b style={STRONG}>Yeni yazılan cümle</b> = about.ts&apos;te
              karşılığı olmayan, bu tur için yazılmış metin sayısı.
            </caption>
            <thead>
              <tr>
                {KIYAS_COLS.map((c, i) => (
                  <th
                    key={c || "k"}
                    scope="col"
                    style={{ ...TH, textAlign: i === 0 ? "left" : "left" }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {KIYAS.map((r) => (
                <tr key={r.k}>
                  <th scope="row" style={CELL_K}>
                    {r.k}
                  </th>
                  {r.v.map((v, i) => (
                    <td key={i} style={CELL_T}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={SCROLLER}>
          <table style={TABLE}>
            <caption style={CAPTION}>
              <b style={STRONG}>Kontrast.</b> WCAG 2.1 oranı. &quot;Büyük&quot; = 18,66 piksel
              kalın ya da 24 piksel normal ve üstü, eşik 3,0; kalanı küçük metin, eşik 4,5.
              Grafik ögesi eşiği 3,0. Hiçbir animasyon metnin rengine yazmadığı için her
              satır tek bir değer.
            </caption>
            <thead>
              <tr>
                {KONTRAST_COLS.map((c, i) => (
                  <th key={c} scope="col" style={{ ...TH, textAlign: i === 0 ? "left" : "right" }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {KONTRAST.map((r) => (
                <tr key={r.k}>
                  <th scope="row" style={CELL_K}>
                    {r.k}
                  </th>
                  <td style={{ ...CELL_T, textAlign: "right" }}>{r.c}</td>
                  <td style={{ ...CELL_T, textAlign: "right" }}>{r.z}</td>
                  <td style={CELL}>{r.o}</td>
                  <td style={CELL}>{r.e}</td>
                  <td style={{ ...CELL_T, textAlign: "right" }}>{r.g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={BOX}>
          <b style={KICKER_BASE}>Kontrast tablosundaki iki &quot;HAYIR&quot; hakkında</b>
          <p style={P}>
            İkisi de aynı şey: <b style={STRONG}>#5c9eeb</b> beyaz üstünde{" "}
            <b style={STRONG}>2,5:1</b> ve grafik eşiği 3,0. Ne ray işareti ne yay çizgisi
            tek başına bilgi taşımıyor: rayda rakam ile adı yanında yazıyor, yayda beş
            halkanın ve üç ülkenin adı ekranda duruyor. Yani WCAG 1.4.11 anlamında
            &quot;anlam taşıyan grafik öge&quot; değiller ve teknik olarak eşiğe tabi
            değiller. Yine de bu bir tercih:{" "}
            <b style={STRONG}>
              kazanan aday canlıya taşınırken bu iki renk <code>--blue-700</code> (#307fe2,
              3,7:1) yapılmalı
            </b>
            . Sitede aynı sorun başka yerlerde de var ve bu turda düzeltilmedi çünkü bir lab
            adayında yapılan renk değişikliği kıyası bozardı: üç adayın da işareti aynı
            renkte olmalı.
          </p>
        </div>

        {/* ========================================================= TAVSİYE */}
        <div style={TAV}>
          <b style={KICKER}>Tavsiye · Aday 2 · Bir bakışta</b>
          <p style={{ ...P, color: "var(--text-900)" }}>
            <b style={STRONG}>Gerekçe sırayla.</b>
          </p>
          <p style={{ ...P, color: "var(--text-900)" }}>
            <b style={STRONG}>1 · Teşhis ayırmayı destekliyor.</b> Bugünkü bölüm dört okuma
            modu taşıyor, sayfanın beşte biri ve başlığı ile bentosu hiçbir genişlikte aynı
            ekranda görünmüyor (751 - 1.126 piksel arası). Müşterinin sezgisi ölçümle
            uyuşuyor.
          </p>
          <p style={{ ...P, color: "var(--text-900)" }}>
            <b style={STRONG}>2 · Ama Aday 1 fazla ileri gidiyor.</b> Bento&apos;yu tamamen
            silmek sayfanın tek görsel özet bloğunu da siliyor ve müşterinin bir tur önce
            açıkça istediği iki şeyi (&quot;sayısal veri, sayaçlı&quot; ve &quot;logo vb
            girebilir işin içine, elini korkak alıştırma&quot;) geri alıyor. Aday 1 doğru bir
            teşhisin fazla sert uygulaması; asıl değeri kıyasın alt ucunu tutması.
          </p>
          <p style={{ ...P, color: "var(--text-900)" }}>
            <b style={STRONG}>3 · Aday 3 güzel ama yanlış yerde.</b> Sahne gerçekten iyi bir
            fikir ve sayfada eksik olan tek şeyi (açılış cümlesinin görseli) veriyor; ama üç
            bayrak diski hemen ardından gelen &quot;Üç ülkede çalışıyoruz&quot; bölümünün
            girişini çalıyor ve 680 pikselin altında fikrin kendisi kayboluyor.{" "}
            <b style={STRONG}>Önerim: Aday 3 reddedilmesin, ERTELENSİN.</b> Sahne 1. bölümün
            değil, 2. bölümün açılışı olmalı; orada tekrar değil giriş olur. Ayrı bir tur.
          </p>
          <p style={{ ...P, color: "var(--text-900)" }}>
            <b style={STRONG}>4 · Aday 2 müşterinin cümlesini birebir karşılıyor</b> ve
            &quot;ana sayfadaki gibi&quot; sorusuna ekranda görünen bir cevap veriyor. Üstelik
            eklediği tek yeni iş, lab kaydında üç turdur &quot;tutulmadı&quot; diye yazan
            maddeyi tutmak: karo bir sayı saymıyor, bir cümle söyleyip onu gösteriyor.
          </p>
          <p style={{ ...P, color: "var(--text-900)" }}>
            <b style={STRONG}>Bedeli açıkça söylüyorum:</b> tekrar. Aday 2&apos;de dört bölüm
            başlığı bentoda bir kez, kendi bölümünde bir kez okunuyor. Bunu kabul
            edilebilir kılan şey rütbe farkı: bentoda 16,5 piksellik bir karo cümlesi,
            aşağıda bir bölüm başlığı. Aynı çözüm sitede zaten bir kez işe yaradı (ülke
            adları hem bentoda hem 2. bölümde). Müşteri tekrarı kabul etmezse{" "}
            <b style={STRONG}>Aday 1</b> ikinci tercih olmalı, Aday 3 değil.
          </p>
          <p style={{ ...P, color: "var(--text-900)" }}>
            <b style={STRONG}>Taşınırken yapılacak iki düzeltme:</b> (a) ray/yay işaretinin
            rengi <code>--blue-500</code>&apos;ten <code>--blue-700</code>&apos;e çıkarılsın
            (kontrast notu yukarıda); (b) B bölümünün başlığı ve giriş cümlesi{" "}
            <code>about.ts</code>&apos;e taşınsın, çünkü bu sayfanın kuralı &quot;JSX&apos;te tek
            cümle yok&quot; ve iki cümlenin onaydan geçmesi gerekiyor.
          </p>
        </div>
      </div>
    </main>
  );
}
