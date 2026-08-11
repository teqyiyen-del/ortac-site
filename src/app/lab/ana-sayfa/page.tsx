import ThreeCountries from "@/components/home/ThreeCountries";
import PriceSummary from "@/components/home/PriceSummary";
import UlkeHalka from "@/components/lab/UlkeHalka";
import UlkeUcHalka from "@/components/lab/UlkeUcHalka";
import UlkeHat from "@/components/lab/UlkeHat";
import MaviKartLab from "@/components/lab/MaviKartLab";
import FiyatAlanLab from "@/components/lab/FiyatAlanLab";

/* ============================================================================
   LAB · /  (ana sayfa) — AÇIK TUR: FİYAT BÖLÜMÜNÜN ZEMİNİ

   Bu sayfa canlı hiçbir şeye dokunmuyor.

   AÇIK TUR (sayfanın üst yarısı)
   Ana sayfanın §11 "Rakamlar, ihtiyacınıza göre" bölümü. Müşterinin bu turdaki
   sözü, birebir:
     "fiyatlar kısmında kart yapmanı istememiştim aslında ya sadece sectionun
      arkasını mavi fln yapıp bu kısımı daha dikkat çekici yapmaya çalışabiliriz
      en önemli verilecek detaylar neyse artık biraz düşünüp kurgula."
   Cümlede iki ayrı iş var ve ikisi de bu turda çözülüyor:
     1) değişken KART YÜZEYİ DEĞİL BÖLÜM ZEMİNİ,
     2) bölümde hangi bilginin kalacağı da bu turun kararı.
   Üç aday: Levha · Ölçek · Cetvel. Üçü aynı içeriğin üç kabuğu DEĞİL; üçü
   "en önemli detay hangisi" sorusuna üç ayrı cevap veriyor.

   KAPANMIŞ İKİ TUR (sayfanın alt yarısı, "ex" olarak duruyor, silinmedi)
     · Ülkeler halkası (.sa1 .sa2 .sa3) — müşteri kapattı: "satürn işi çok bok
       gibi oldu … siktiret". Yani ülkeler bölümü bugünkü canlı hâliyle kalıyor.
     · Fiyat kartları (.mk1 .mk2 .mk3) — müşteri kapattı: "kart yapmanı
       istememiştim". Kart fikri düştü, yerine bu turun bölüm zemini geldi.
   İkisi de ekranda duruyor çünkü yeni turun neyin üstüne kurulduğu ancak
   yan yana görülürse anlaşılıyor.

   --------------------------------------------------------------------------
   ÖLÇÜM YÖNTEMİ — sayılar elle yazılı çünkü tarayıcıda tek seferlik alındı

   · SÜREKLİ ANİMASYON — getAnimations(), playState "running" olanlar ve
     yalnızca ilgili bölümün içinde kalanlar. Giriş animasyonları (FadeUp,
     SplitWords, CountUp) sayılmıyor çünkü bitiyorlar; sayılan şey ekranda
     durduğu sürece dönen döngü. Canlı bölümün sıfır olması bir eksiklik
     teşhisi: bugün bölüm yalnızca açılışta kımıldıyor.

   · YÜKSEKLİK — 1440 pikselde, bölümün kendi offsetHeight'i (bu tur bölüm
     ölçeğinde konuşuyor, o yüzden ızgara değil bölüm ölçüldü). İki değer
     verilen yerde ilki hiçbir kalem seçili değilken, ikincisi üç kalem de
     açıkken.

   · YATAY TAŞMA — sabit genişlikli aynı köken iframe içinde (tarayıcı paneli
     dar viewport'u güvenilir ölçmüyor) ve scrollWidth ile DEĞİL, gerçekten
     scrollTo(9999,0) denenip scrollX okunarak: body'de overflow-x:clip var,
     scrollWidth bu yüzden yanıltıyor.

   · KONTRAST — tarayıcıda gerçekten basılan renkler üzerinden; saydam metin
     renkleri altındaki opak zeminle birleştirilerek çözüldü. Dereceli zeminde
     (Aday 2) öğenin bölüm içindeki y'si okunup gradyanın o noktadaki rengi
     hesaplandı. Eşikler: normal metin 4,5:1, büyük metin (>=24px ya da
     >=18.66px kalın) 3:1, grafik ve arayüz sınırı 3:1.

   · EN KÖTÜ KARE — yalnızca duruş karesi değil. Üç adayın hareketli
     katmanının üçü de KOYULAŞTIRIYOR, o yüzden en kötü kare duruş karesinin
     ta kendisi; tepe karesi ölçülüp tabloya ayrı satır olarak yazıldı.

   · reduce — BU TURDA GERÇEKTEN ÖLÇÜLDÜ, tahmin edilmedi. Ayrı bir headless
     tarayıcıda prefers-reduced-motion: reduce taklit edilip sayfa yeniden
     yüklendi: matchMedia doğruladı, SAYFANIN TAMAMINDA çalışan animasyon
     sayısı 0 (yalnız üç aday değil, sayfadaki bütün lab turları), üç ışık
     öğesinin hesaplanan opacity'si 0 ve üç bölümün yüksekliği birebir aynı
     (694 · 897 · 1078). useReducedMotion kullanılmadı.

   Blok değişirse bu satırlar yeniden ölçülmeli.
   ========================================================================= */

/* --------------------------------------------------------------- stiller -- */
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
  color: "var(--blue-700)",
};

const KICKER_BASE: React.CSSProperties = {
  ...KICKER,
  background: "var(--paper)",
  color: "#8a8a8a",
};

const KICKER_EX: React.CSSProperties = {
  ...KICKER,
  background: "#fcf1de",
  color: "#b26a00",
};

const BOX: React.CSSProperties = {
  marginTop: 16,
  padding: "20px 22px",
  borderRadius: "var(--r-lg)",
  background: "var(--paper)",
  border: "1px solid var(--border)",
  maxWidth: "76ch",
};

const P: React.CSSProperties = {
  marginTop: 12,
  fontSize: 14.5,
  lineHeight: 1.65,
  color: "var(--text-600)",
  /* ÖLÇÜLDÜ: bu düzyazıdaki uzun <code> yolları (örn.
     src/components/home/PriceSummary.tsx) 320 pikselde satır başı bulamıyor ve
     sayfayı 46 piksel genişletiyordu — taşma adaylardan değil lab metninden
     geliyordu. overflow-wrap:anywhere ile 320'de de sıfır. */
  overflowWrap: "anywhere",
};

const STRONG: React.CSSProperties = { fontWeight: 600, color: "var(--text-900)" };

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

const CELL_L: React.CSSProperties = { ...CELL, textAlign: "left" };

const TW: React.CSSProperties = {
  marginTop: 16,
  maxWidth: "96ch",
  overflowX: "auto",
  /* AGENTS.md · C — overflow-x:auto olan kap MUTLAKA position:relative,
     yoksa mutlak konumlu torunlar (Tailwind'in .sr-only'si) dışarı kaçıyor. */
  position: "relative",
};

const TBL: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: "var(--font-sans)",
  fontSize: 13,
};

const CAP: React.CSSProperties = {
  textAlign: "left",
  paddingBottom: 10,
  fontSize: 12.5,
  lineHeight: 1.6,
  color: "var(--text-600)",
};

/* ---------------------------------------------------------------- tablolar */
function Tablo({
  cap,
  cols,
  rows,
  solSutunlar = 1,
}: {
  cap: string;
  cols: string[];
  rows: { k: string; v: (string | number)[] }[];
  /** kaçıncı sütuna kadar sola dayalı yazılacak (metin sütunları) */
  solSutunlar?: number;
}) {
  return (
    <div style={TW}>
      <table style={TBL}>
        <caption style={CAP}>{cap}</caption>
        <thead>
          <tr>
            {cols.map((c, i) => (
              <th
                key={c || `k${i}`}
                scope="col"
                style={{
                  padding: "0 10px 8px",
                  borderBottom: "1px solid var(--border)",
                  textAlign: i === 0 || i >= cols.length - solSutunlar + 1 ? "left" : "right",
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: "var(--blue-900)",
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.k}>
              <th scope="row" style={CELL_K}>
                {r.k}
              </th>
              {r.v.map((v, i) => (
                <td
                  key={i}
                  style={i >= r.v.length - solSutunlar + 1 ? CELL_L : CELL}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Künye. Her adayın üstünde üç şey duruyor: fikir, hangi içeriği seçtiği ve
   neyi feda ettiği. Üçüncü satır olmadan kıyas bir beğeni oylamasına dönüyor. */
function Kunye({
  id,
  name,
  idea,
  icerik,
  kontrast,
  cost,
  base = false,
  ex = false,
}: {
  id: string;
  name: string;
  idea: string;
  icerik?: string;
  kontrast?: string;
  cost: string;
  base?: boolean;
  ex?: boolean;
}) {
  return (
    <div className="container-o">
      <div style={BOX}>
        <b style={ex ? KICKER_EX : base ? KICKER_BASE : KICKER}>
          {id} · {name}
        </b>
        <p style={P}>
          <b style={STRONG}>Fikir:</b> {idea}
        </p>
        {icerik ? (
          <p style={P}>
            <b style={STRONG}>İçerik kararı:</b> {icerik}
          </p>
        ) : null}
        {kontrast ? (
          <p style={P}>
            <b style={STRONG}>Kontrast kısıtına cevabı:</b> {kontrast}
          </p>
        ) : null}
        <p style={P}>
          <b style={STRONG}>Neyi feda ediyor:</b> {cost}
        </p>
      </div>
    </div>
  );
}

/* =========================================================== AÇIK TUR verisi */

const AF_OLCUM_COLS = [
  "",
  "sürekli animasyon",
  "periyot",
  "yükseklik (kapalı / açık)",
  "taşma 320",
  "375",
  "768",
  "1440",
];

const AF_OLCUM: { k: string; v: (string | number)[] }[] = [
  { k: "Taban · bugün canlıda", v: [0, "yok", "1027 / 1213", 0, 0, 0, 0] },
  { k: "Aday 1 · Levha", v: [1, "22.9 s", "694 / 694", 0, 0, 0, 0] },
  { k: "Aday 2 · Ölçek", v: [1, "26.9 s", "897 / 897", 0, 0, 0, 0] },
  { k: "Aday 3 · Cetvel", v: [1, "28.1 s", "1078 / 1097", 0, 0, 0, 0] },
  { k: "Üç aday, reduce altında", v: [0, "yok", "aynı", 0, 0, 0, 0] },
];

const AF_KIYAS_COLS = [
  "",
  "okuma modu",
  "görünür nesne",
  "bilgi kalemi",
  "yükseklik",
  "en kötü kontrast",
  "en kötü kare",
];

const AF_KIYAS: { k: string; v: (string | number)[] }[] = [
  {
    k: "Taban · bugün canlıda",
    v: [4, 48, 35, 1027, "4.03:1 · kapsam cümlesi, DÜŞÜYOR", "duruş = tek kare"],
  },
  { k: "Aday 1 · Levha", v: [3, 33, 22, 694, "3.99:1 · büyük metin, eşik 3, geçer", "duruş karesi"] },
  { k: "Aday 2 · Ölçek", v: [4, 36, 26, 897, "3.32:1 · eksen çizgisi, eşik 3, geçer", "duruş karesi"] },
  { k: "Aday 3 · Cetvel", v: [5, 62, 47, 1078, "3.99:1 · büyük metin, eşik 3, geçer", "duruş karesi"] },
];

const AF_KONTRAST: {
  k: string;
  zemin: string;
  metin: string;
  o: string;
  e: string;
}[] = [
  { k: "Referans · marka mavisi + beyaz", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "büyük metin ve grafik geçer, NORMAL PUNTO GEÇMEZ" },
  { k: "Referans · aynı mavi %8 AÇILIRSA", zemin: "#4189e4", metin: "#ffffff", o: "3.54:1", e: "açan ışık yasak: büyük metin bile eşiğe yaklaşıyor" },

  { k: "Taban · ülke adı 16.5px", zemin: "#080808", metin: "#ffffff", o: "20.03:1", e: "geçer" },
  { k: "Taban · kalem etiketi 14px", zemin: "#080808", metin: "#bfbfbf", o: "10.87:1", e: "geçer" },
  { k: "Taban · süre 13px", zemin: "#080808", metin: "#777777", o: "4.48:1", e: "DÜŞÜYOR. Bugün canlıda ve maviyle ilgisi yok" },
  { k: "Taban · dipnot 12.5px", zemin: "#080808", metin: "#757575", o: "4.33:1", e: "DÜŞÜYOR. Bugün canlıda" },
  { k: "Taban · kapsam cümlesi 12.5px", zemin: "#080808", metin: "#707070", o: "4.03:1", e: "DÜŞÜYOR. Bölümün bugünkü en kötü oranı" },

  { k: "Aday 1 · başlık 46px/700", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "büyük metin, eşik 3 → geçer" },
  { k: "Aday 1 · \u201cKuruluşa ek olarak\u201d 24px", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "büyük metin (24px), geçer; 16px olsaydı düşerdi" },
  { k: "Aday 1 · ülke adı 22px/700", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "büyük metin (kalında eşik 18.66px), geçer" },
  { k: "Aday 1 · rakam 64px", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "büyük metin, geçer" },
  { k: "Aday 1 · hap 13px", zemin: "#ffffff", metin: "#1b56a8", o: "7.14:1", e: "geçer; küçük punto maviden çıkarıldı" },
  { k: "Aday 1 · çip 14.5px", zemin: "#ffffff", metin: "#1b56a8", o: "7.14:1", e: "geçer" },
  { k: "Aday 1 · düğme 15px", zemin: "#ffffff", metin: "#1b56a8", o: "7.14:1", e: "geçer" },
  { k: "Aday 1 · kaide uyarısı 13.5px", zemin: "#ffffff", metin: "#5c5c5c", o: "6.69:1", e: "geçer" },
  { k: "Aday 1 · kaide bağlantısı 15px", zemin: "#ffffff", metin: "#1b56a8", o: "7.14:1", e: "geçer (--blue-700 olsaydı 3.99, düşerdi)" },
  { k: "Aday 1 · beyaz çip kenarlığı", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "arayüz sınırı, eşik 3 → geçer" },
  { k: "Aday 1 · saç teli (beyaz %26)", zemin: "#307fe2", metin: "#66a0ea", o: "1.48:1", e: "süs; bilgi taşımıyor, eşiğe tabi değil" },
  { k: "Aday 1 · EN KÖTÜ KARE · ışık tepesi", zemin: "#2669be", metin: "#ffffff", o: "5.47:1", e: "duruştan İYİ; ışık koyulaştırıyor → en kötü kare duruş" },

  { k: "Aday 2 · başlık 46px/700, y=72", zemin: "#2c77d6", metin: "#ffffff", o: "4.46:1", e: "büyük metin, geçer" },
  { k: "Aday 2 · alt metin 16.5px, y=186", zemin: "#256ac4", metin: "#f2f6fb", o: "4.92:1", e: "geçer (%88'de 4.53 idi, ölçülüp %94'e çıkarıldı)" },
  { k: "Aday 2 · \u201cKuruluşa ek olarak\u201d, y=276", zemin: "#2060b6", metin: "#ffffff", o: "6.19:1", e: "geçer" },
  { k: "Aday 2 · ülke adı 19px, y=391", zemin: "#1b56a8", metin: "#ffffff", o: "7.14:1", e: "geçer; durağın altı düz koyu" },
  { k: "Aday 2 · süre 13.5px", zemin: "#1b56a8", metin: "#dbe4f1", o: "5.56:1", e: "geçer" },
  { k: "Aday 2 · rakam 30px", zemin: "#1b56a8", metin: "#ffffff", o: "7.14:1", e: "geçer" },
  { k: "Aday 2 · fark 13.5px", zemin: "#1b56a8", metin: "#dfe7f3", o: "5.74:1", e: "geçer" },
  { k: "Aday 2 · eksen altı 12.5px", zemin: "#1b56a8", metin: "#dbe4f1", o: "5.56:1", e: "geçer (%72'de 4.54 idi, %84'e çıkarıldı)" },
  { k: "Aday 2 · uyarı 13.5px", zemin: "#1b56a8", metin: "#d6e1ef", o: "5.38:1", e: "geçer" },
  { k: "Aday 2 · çıkış bağlantısı 15px", zemin: "#1b56a8", metin: "#ffffff", o: "7.14:1", e: "geçer" },
  { k: "Aday 2 · veri çubuğu", zemin: "#1b56a8", metin: "#ffffff", o: "7.14:1", e: "grafik, geçer" },
  { k: "Aday 2 · eksen çizgisi (beyaz %55)", zemin: "#1b56a8", metin: "#98b3d8", o: "3.32:1", e: "grafik eşiği 3 → geçer; %35'te 2.21 idi, ölçülüp yükseltildi" },
  { k: "Aday 2 · çubuk yolu (beyaz %16)", zemin: "#1b56a8", metin: "#3f71b6", o: "1.45:1", e: "süs; ölçüyü çubuk taşıyor, yol değil" },
  { k: "Aday 2 · EN İYİ KARE · eksen ışığı", zemin: "#1b56a8", metin: "#f4f7fb", o: "6.62:1", e: "ışık yalnız çizgiyi açıyor → en kötü kare duruş (3.32)" },

  { k: "Aday 3 · başlık 46px/700", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "büyük metin, geçer" },
  { k: "Aday 3 · \u201cKuruluşa ek olarak\u201d 24px", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "büyük metin, geçer" },
  { k: "Aday 3 · ülke adı 22px/700", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "büyük metin, geçer" },
  { k: "Aday 3 · rakam 52px", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "büyük metin, geçer" },
  { k: "Aday 3 · süre hapı 13px", zemin: "#ffffff", metin: "#1b56a8", o: "7.14:1", e: "geçer" },
  { k: "Aday 3 · tablo başlığı 13.5px", zemin: "#ffffff", metin: "#080808", o: "20.03:1", e: "geçer" },
  { k: "Aday 3 · matris değeri 15.5px", zemin: "#ffffff", metin: "#080808", o: "20.03:1", e: "geçer" },
  { k: "Aday 3 · hücre dipnotu 12.5px", zemin: "#ffffff", metin: "#5c5c5c", o: "6.69:1", e: "geçer" },
  { k: "Aday 3 · seçili satır adı", zemin: "#e8f1fd", metin: "#080808", o: "17.58:1", e: "geçer" },
  { k: "Aday 3 · seçili satır dipnotu", zemin: "#e8f1fd", metin: "#5c5c5c", o: "5.87:1", e: "geçer" },
  { k: "Aday 3 · \u201ckapsam dışı\u201d 13.5px", zemin: "#e8f1fd", metin: "#5c5c5c", o: "5.87:1", e: "geçer" },
  { k: "Aday 3 · şerit bağlantısı 15px", zemin: "#ffffff", metin: "#1b56a8", o: "7.14:1", e: "geçer" },
  { k: "Aday 3 · taban düğmesi 15px", zemin: "#ffffff", metin: "#1b56a8", o: "7.14:1", e: "geçer" },
  { k: "Aday 3 · EN KÖTÜ KARE · ışık tepesi", zemin: "#2669be", metin: "#ffffff", o: "5.47:1", e: "duruştan İYİ; ışık koyulaştırıyor → en kötü kare duruş" },

  { k: "DAR EKRAN · Aday 2 alt metin, 375px", zemin: "#2468c1", metin: "#f2f6fb", o: "5.06:1", e: "geçer; 360px'lik derece 4.52 veriyordu, durak 240'a çekildi" },
  { k: "DAR EKRAN · Aday 2 başlık 30px, 375px", zemin: "#2b75d4", metin: "#ffffff", o: "4.54:1", e: "büyük metin, geçer" },
  { k: "DAR EKRAN · Aday 1 ve 3, 320-768px", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "zemin düz olduğu için genişlikten bağımsız, geçer" },
];

/* ======================================================= KAPANMIŞ TUR verisi */
const EX_COLS = ["", "sürekli animasyon", "periyot", "yükseklik", "taşma 320", "375", "768", "1440"];

const MEASURED_UK: { k: string; v: (string | number)[] }[] = [
  { k: "Taban · bugün canlıda", v: [0, "yok", 203, 0, 0, 0, 0] },
  { k: "ex · Halka", v: [2, "13.9 s", 253, 0, 0, 0, 0] },
  { k: "ex · Üç halka", v: [4, "10.9 s", 217, 0, 0, 0, 0] },
  { k: "ex · Hat", v: [1, "19.7 s", 189, 0, 0, 0, 0] },
];

const MEASURED_FY: { k: string; v: (string | number)[] }[] = [
  { k: "Taban · bugün canlıda", v: [0, "yok", "439 / 625", 0, 0, 0, 0] },
  { k: "ex · Tam mavi kart", v: [3, "17.9 s", "369 / 549", 0, 0, 0, 0] },
  { k: "ex · Mavi plaka", v: [3, "19.1 s", "371 / 551", 0, 0, 0, 0] },
  { k: "ex · Mavi kabuk", v: [3, "21.1 s", "388 / 570", 0, 0, 0, 0] },
];

/* ============================================================================ */
export default function LabAnaSayfaPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Ana sayfa · fiyat bölümünün zemini
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
          Açık tur en üstte: §11 <b style={STRONG}>&quot;Rakamlar, ihtiyacınıza
          göre&quot;</b> bölümü önce <b style={STRONG}>bugünkü hâliyle</b> basılıyor
          (kopya değil, canlı bileşenin kendisi), sonra üç aday geliyor. Sayfanın
          alt yarısında kapanmış iki tur <b style={STRONG}>ex</b> olarak duruyor:
          ülkeler halkası ve fiyat kartları. Canlı hiçbir dosya değişmedi.
        </p>
      </div>

      {/* ==================================================================
          AÇIK TUR · TABAN
          ================================================================== */}
      <div className="container-o" style={{ paddingTop: 36 }}>
        <div style={BOX}>
          <b style={KICKER_BASE}>Taban · bugün canlıda olan hâl</b>
          <p style={P}>
            Canlı bileşenin kendisi (<code>src/components/home/PriceSummary.tsx</code>).
            Zemin siyah (<code>sec-night</code>), üç sütun saç teliyle bölünmüş, kart
            yok. Kıyasın tamamı bunun üzerinden yapılıyor: aşağıdaki her sayı bu
            bölümle karşılaştırılabilir olsun diye aynı yöntemle alındı.
          </p>
          <p style={P}>
            <b style={STRONG}>Bölümün bugün taşıdığı bilgi</b>, ülke başına: bayrak,
            ülke adı, süre, toplam rakam, &quot;başlangıç / seçtiklerinizle
            toplam&quot; notu, kuruluş satırı, kuruluş kapsamı, kuruluş tutarı, seçili
            her kalem için etiket + tutar + varsa dipnot, iki düğme. Bölüm
            ölçeğinde: başlık, alt metin, üç çip, uyarı cümlesi, kıyas bağlantısı.
            Hiçbir kalem seçili değilken <b style={STRONG}>35 bilgi kalemi</b>, üçü de
            açıkken <b style={STRONG}>59</b>; ekranda 1440 pikselde{" "}
            <b style={STRONG}>1027 piksel</b> yer kaplıyor, üç kalem açıkken 1213.
          </p>
        </div>
      </div>

      <PriceSummary />

      {/* ==================================================================
          AÇIK TUR · ANALİZ
          ================================================================== */}
      <div className="container-o" style={{ paddingTop: 44 }}>
        <div style={BOX}>
          <b style={KICKER}>Müşterinin cümlesinde iki ayrı iş var</b>
          <p style={P}>
            <b style={STRONG}>
              &quot;fiyatlar kısmında kart yapmanı istememiştim aslında ya sadece
              sectionun arkasını mavi fln yapıp bu kısımı daha dikkat çekici yapmaya
              çalışabiliriz en önemli verilecek detaylar neyse artık biraz düşünüp
              kurgula.&quot;
            </b>
          </p>
          <p style={P}>
            <b style={STRONG}>1) Değişken kart yüzeyi değil, bölüm zemini.</b> Geçen
            tur üç mavi <i>kart</i> denedi ve kapandı. Bu turda mavi olan şey
            bölümün arkası; dikkat çekicilik kutu ölçeğinde değil bölüm ölçeğinde
            kuruluyor. Üç adayın üçünde de kart yok.
          </p>
          <p style={P}>
            <b style={STRONG}>2) İçerik kararı da bu turun işi.</b> &quot;En önemli
            verilecek detaylar neyse&quot; bir tasarım isteği değil bir yayın kararı,
            o yüzden üç aday üç farklı içerik seçiyor. Yan yana konduklarında
            cevaplanan soru &quot;hangisi daha güzel&quot; değil:{" "}
            <b style={STRONG}>
              bu bölüm bir rakam mı, bir kıyas mı, yoksa bir fiyat tablosu mu.
            </b>
          </p>
        </div>

        <div style={BOX}>
          <b style={KICKER}>İçerik analizi · ziyaretçi burada neyi bilmek istiyor</b>
          <p style={P}>
            Bölüm ana sayfanın sonlarında, <code>TrustLayer</code> ile{" "}
            <code>HomeBlog</code> arasında. Ziyaretçi buraya kadar üç ülkeyi,
            hizmetleri, süreci ve profilleri gördü; burada sorduğu şey{" "}
            <b style={STRONG}>&quot;bu iş bana kaça patlar ve hangisi benim
            kulvarım&quot;</b>. Satın alma kararı burada verilmiyor: bölümün kendi
            notu da bunu söylüyor (&quot;paket adları ve hesaplayıcı /fiyatlar&apos;da
            kalır&quot;).
          </p>
          <p style={P}>
            <b style={STRONG}>Kalması tartışmasız olanlar.</b> Ülke adı ve bayrak;
            başlangıç tutarı (bölümün varlık sebebi); süre, çünkü &quot;kaç
            para&quot;dan hemen sonraki soru &quot;ne kadar sürede&quot; ve iki sayı
            aynı satırda okunuyor; tahminîlik uyarısı, çünkü bir yayın
            zorunluluğu; en az bir çıkış.
          </p>
          <p style={P}>
            <b style={STRONG}>Tartışmalı olan: kalem kırılımı.</b> Üç kalem üç
            ülkede açıldığında ekranda dokuz tutar daha beliriyor ve bunlar üç ana
            rakamla yarışıyor. Bölümü &quot;dikkat çekici&quot; olmaktan çıkaran
            asıl şey bu kalabalık. Buna karşılık kırılım{" "}
            <b style={STRONG}>tek gerçek bilgi katmanı</b>: &quot;başlar&quot;
            sözcüğünün ne demek olduğunu yalnızca o söylüyor. Üç aday bu tek soruya
            üç ayrı cevap veriyor.
          </p>
          <p style={P}>
            <b style={STRONG}>Ölçülmüş bir kusur: düğmelerin üçte ikisi ölü.</b>{" "}
            Bölüm bugün ülke başına iki düğme basıyor. &quot;Detaylı fiyat&quot;{" "}
            <code>/dubai</code>, <code>/ingiltere</code> ve <code>/kktc</code>&apos;ye
            gidiyor; son ikisi dolaşıma kapalı, <code>SmartLink</code> onları sönük
            ve tıklanamaz <code>&lt;span&gt;</code> olarak basıyor. Yani altı
            düğmeden dördü çalışıyor, ikisi durup duruyor. Üç adayın üçü de ikinci
            düğmeyi kaldırdı; bu bir tasarım sadeleştirmesi değil, ölü bir öğenin
            temizliği.
          </p>
          <p style={P}>
            <b style={STRONG}>Ülke sayfasına ait olan.</b> Kalem başına dürüst
            dipnotlar (&quot;KKTC&apos;de banka fiziki ziyaret isteyebiliyor&quot;
            gibi) ve kapsam cümleleri. Bunların bir kısmı zaten ülke sayfası
            hero&apos;sunda (<code>PageHero</code> · <code>FACTS.limit</code>) ve{" "}
            <code>/ulkeler</code> kıyasında yaşıyor.
          </p>
        </div>

        <div style={BOX}>
          <b style={KICKER}>Bu turun omurgası tek bir sayı</b>
          <p style={P}>
            Marka mavisi <code>--blue-700</code> (#307fe2) üzerine{" "}
            <b style={STRONG}>beyaz metin 3,99:1</b>. Normal punto eşiği 4,5:1, yani{" "}
            <b style={STRONG}>düşüyor</b>. Aynı renk büyük yazı (24px ve üstü ya da
            18,66px kalın) ve grafik için 3:1 eşiğini geçiyor. Beyazdan daha açık bir
            renk olmadığı için marka mavisinin üstünde 14 punto bir etiketi okunur
            yapmanın hiçbir yolu yok.
          </p>
          <p style={P}>
            <b style={STRONG}>Kart turunda bu tek bir kutuyu ilgilendiriyordu; bölüm
            zemini maviye dönünce kısıt bütün bölüme yayılıyor.</b> Başlık, çipler,
            künyeler, uyarı cümlesi, çıkış bağlantısı: hepsi aynı mavinin üstünde.
            Üç adayın üçü de bu tek sayıya farklı cevap veriyor: Aday 1 mavinin
            üstünde küçük punto bırakmıyor, Aday 2 zemini derecelendirip metni
            eşiğin geçtiği yere indiriyor, Aday 3 yoğun küçük puntoyu maviden
            tamamen çıkarıyor.
          </p>
          <p style={P}>
            <b style={STRONG}>Işık kuralı ölçümden çıktı.</b> #307fe2 üstüne yalnızca
            %8 beyaz sürülünce oran 3,99&apos;dan{" "}
            <b style={STRONG}>3,55&apos;e</b> iniyor. Bu yüzden üç adayın hareketli
            katmanı da AÇMIYOR, KOYULAŞTIRIYOR; en kötü kare her üçünde de duruş
            karesinin kendisi ve tepe karesi kontrast tablosunda ayrı satır olarak
            duruyor.
          </p>
        </div>

        <div style={BOX}>
          <b style={KICKER_EX}>Uyarı · mavi zemin bir kez reddedildi</b>
          <p style={P}>
            Kayıt için: <b style={STRONG}>ülke sayfasının</b> fiyat bölümü bir tur
            önce <code>sec-night</code>&apos;ı bırakıp mavi bir zemine geçmişti ve
            müşteri geri aldırdı: <b style={STRONG}>&quot;dubai fiyat kısmını eski
            haline çevir&quot;</b> (gerekçesi <code>globals.css</code> · 3156.
            satırdaki notta duruyor). O karar <b style={STRONG}>ülke sayfası</b> için
            verildi, bu tur ise <b style={STRONG}>ana sayfa</b> bölümü için ve
            isteğin kendisi müşteriden geliyor. Yine de aynı enstrüman iki yerde
            iki farklı sonuç aldı; ana sayfada tutarsa ülke sayfasının bugünkü
            siyah fiyat bölümüyle arada bir dil farkı doğacak. Karar alınırken
            bilinmesi gereken şey bu.
          </p>
        </div>

        <div style={BOX}>
          <b style={KICKER}>Rakamlar: ne değişti, ne değişmedi</b>
          <p style={P}>
            <b style={STRONG}>Hiçbir tutar yazılmadı.</b> Başlangıç tutarı{" "}
            <code>brand.ts · FACTS[c].from</code>, ek kalemler{" "}
            <code>pricing.ts · PRICING[c]</code> üzerinden okunuyor.{" "}
            <code>src/lib/pricing.ts</code> dosyasına <b style={STRONG}>dokunulmadı</b>.
            Metin sabitleri (kapsam cümleleri, kalem adları, dipnotlar) geçen turdan
            kalan <code>src/components/lab/fiyatKart.ts</code>&apos;ten okunuyor,
            yeniden kopyalanmadı.
          </p>
          <p style={P}>
            <b style={STRONG}>Çözülmemiş çelişki bilerek çözülmedi.</b>{" "}
            <code>src/lib/afterSetup.ts</code> Dubai&apos;de aylık muhasebeyi{" "}
            <b style={STRONG}>350 USD/ay</b> diyor (12 ay = 4.200 USD/yıl);{" "}
            <code>src/lib/pricing.ts</code> ise <code>PRICING.dubai.annual = 2100</code>{" "}
            basıyor. İki sayı aynı hizmeti anlatıyor ve birbirini tutmuyor: aynı
            ziyaretçi sitede aynı hizmeti iki farklı fiyatla görebiliyor.{" "}
            <b style={STRONG}>Aynı sorunun ikinci hâli:</b> belgede iki yıllık
            yatırımcı oturumu + Emirates ID kişi başı 2.400 USD, oysa{" "}
            <code>PRICING.dubai.perVisa = 750</code>.
          </p>
          <p style={P}>
            Hangisinin doğru olduğu <b style={STRONG}>müşterinin kararı</b>, bizim
            değil; yanlış olanı sabitlemek iki rakamı da doğrulanamaz hâle
            getirirdi. O karar gelene kadar üç aday da canlı bölümün{" "}
            <b style={STRONG}>bugün bastığı sayıyı</b> basıyor, fazlasını değil;
            aylık bir tutar hiçbir adayda ekrana gelmiyor. Karar geldiğinde
            değişecek tek yer <code>pricing.ts</code> ve üç aday da kendiliğinden
            düzelir.
          </p>
        </div>

        <div style={BOX}>
          <b style={KICKER}>Kayda geçen ikinci ölçüm borcu · çıkış bağlantısının rengi</b>
          <p style={P}>
            Canlı bölümün alt satırındaki bağlantı <code>.link-arrow</code> ve rengi{" "}
            <code>--blue-700</code>; beyaz üstünde <b style={STRONG}>3,99:1</b>, yani
            15px bağlantı metni için 4,5:1 eşiğinin altında. Bu site genelinde bir
            kalıp ve bu turun işi değil, ama <b style={STRONG}>bilerek
            tekrarlanmadı</b>: adaylarda beyaz zemine düşen bağlantı{" "}
            <code>--blue-900</code> (7,14:1). Bir aday canlıya alınırken bu fark
            görünür olacak; ya site geneli de <code>--blue-900</code>&apos;a taşınmalı
            ya da aday <code>--blue-700</code>&apos;e geri çevrilmeli. Sessizce iki
            farklı mavi kalmamalı.
          </p>
        </div>

        <Tablo
          cap="Kıyas. Sütunlar bilerek yalnızca yükseklik değil: geçmişte yalnız küçülmeyi ölçen bir tablo yanlış adayı 'en iyi' göstermişti. Okuma modu = gözün ayrı ayrı çözmesi gereken düzen sayısı (çip satırı, sütun dizisi, sütun içi etiket-değer listesi, tablo, alt bilgi satırı, düğme satırı, her biri bir mod). Görünür nesne = bölümün içinde doğrudan metin taşıyan öğe + svg + veri çubuğu, sr-only hariç, hiçbir kalem seçili değilken tarayıcıda sayıldı. Bilgi kalemi = ekranda duran ayrı olgu sayısı (üç ülkenin her biri ayrı sayılıyor). Yükseklik 1440'ta, bölümün kendi offsetHeight'i, kalem seçili değilken. En kötü kontrast = bölümdeki en düşük oran, parantez içinde hangi öğe. En kötü kare = animasyon turunun en düşük kontrastlı anı."
          cols={AF_KIYAS_COLS}
          rows={AF_KIYAS}
          solSutunlar={2}
        />

        {/* TAVSİYE · turun kapanış sayfası olmadan bırakılmasın diye eklendi.
            Müşterinin cümlesi "en önemli verilecek detaylar neyse artık biraz
            düşünüp kurgula" idi; üç adayı yan yana dizip susmak o cümlenin
            yarısını cevapsız bırakıyordu. Aşağıdaki tercih yukarıdaki kıyas
            tablosunun kendi sayılarından çıkıyor, yeni bir ölçüm değil. */}
        <div style={{ ...BOX, background: "var(--night)", borderColor: "var(--night-line)" }}>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: "-0.01em",
              color: "#ffffff",
            }}
          >
            Tavsiye · Aday 1 (Levha)
          </h3>
          <p style={{ ...P, color: "#c9c9c9" }}>
            Gerekçe tek bir yerden geliyor: bu bölüm ana sayfada duruyor ve ana
            sayfanın kendi karar kaydı onu{" "}
            <b style={{ fontWeight: 600, color: "#ffffff" }}>
              &quot;bir vitrin, satışın kendisi değil&quot;
            </b>{" "}
            diye tanımlıyor. Üç adayın taşıdığı bilgi kalemi sırasıyla 22, 26 ve
            47; bugün canlıda olan 35. Yani Cetvel bölümü bugünkünden{" "}
            <b style={{ fontWeight: 600, color: "#ffffff" }}>daha kalabalık</b>{" "}
            yapıyor ve bir kıyas matrisini ana sayfaya taşıyor, oysa o matrisin
            yeri ülke sayfası. Levha ise okuma modunu 4&apos;ten 3&apos;e, yüksekliği
            1027&apos;den 694 piksele indiriyor. &quot;Dikkat çekici&quot; olan
            kalabalık değil, tek şeyi büyük söyleyen.
          </p>
          <p style={{ ...P, color: "#c9c9c9" }}>
            Bedeli açıkça yazalım: Levha ekrandan{" "}
            <b style={{ fontWeight: 600, color: "#ffffff" }}>13 bilgi kalemi</b>{" "}
            çıkarıyor. Bunlar kaybolmuyor, ülke sayfasındaki fiyat bölümüne
            düşüyorlar. Bu ancak oraya giden yol görünürse doğru bir alışveriş;
            Levha&apos;nın kaide bağlantısı tam bu iş için duruyor ve canlıya
            alınırken kesilmemeli.
          </p>
          <p style={{ ...P, color: "#c9c9c9" }}>
            İkinci tercih{" "}
            <b style={{ fontWeight: 600, color: "#ffffff" }}>Aday 2 (Ölçek)</b>,
            Aday 3 değil. Üç ülkenin tek bakışta kıyaslanması gerçekten isteniyorsa
            onu veren Ölçek; üstelik dereceli zemini sayesinde en kötü kontrastı
            metinde değil bir grafik çizgisinde (3,32:1, eşik 3) ve küçük punto
            hiçbir yerde marka mavisinin üstüne düşmüyor. Aday 3 reddedilmesin,{" "}
            <b style={{ fontWeight: 600, color: "#ffffff" }}>ertelensin</b>: içeriği
            ana sayfa için fazla, ülke kıyas sayfası için tam.
          </p>
        </div>

        <Tablo
          cap="Ölçüm. Sürekli animasyon = ekranda durduğu sürece dönen döngü; giriş animasyonları (FadeUp, SplitWords, CountUp) sayılmıyor, o yüzden canlı bölüm sıfır. Yükseklik 1440'ta bölümün offsetHeight'i; ilk değer hiçbir kalem seçili değilken, ikincisi üç kalem de açıkken. Aday 1 ve 2'nin yüksekliği seçimle HİÇ değişmiyor çünkü açılan satır yok; canlı bölüm 186 piksel, Aday 3 ise 19 piksel uzuyor (yalnız onay rozetleri kadar). Yatay taşma dört genişlikte de sıfır: sabit genişlikli aynı köken iframe içinde, scrollWidth ile değil gerçekten scrollTo(9999,0) denenip scrollX okunarak. TEK İSTİSNA Aday 3'ün matrisi: 320'de 320, 375'te 265 piksel kendi kabının dışına çıkıyor ama kap overflow-x:auto olduğu için kendi içinde kayıyor, sayfaya taşma yine sıfır. Reduce satırı TAHMİN DEĞİL ÖLÇÜM: ayrı bir tarayıcıda prefers-reduced-motion taklit edildi, sayfanın tamamında çalışan animasyon 0, ışıkların opacity'si 0, yükseklikler birebir aynı."
          cols={AF_OLCUM_COLS}
          rows={AF_OLCUM}
        />

        <div style={TW}>
          <table style={TBL}>
            <caption style={CAP}>
              Kontrast. Tarayıcıda gerçekten basılan renkler üzerinden ölçüldü, elle
              hesaplanmadı: saydam metin renkleri altındaki opak zeminle
              birleştirilerek çözüldü. Aday 2 dereceli bir zemin kullanıyor, orada
              öğenin bölüm içindeki y&apos;si okunup gradyanın o noktadaki rengi
              hesaplandı. Eşikler: normal metin 4,5:1, büyük metin (24px ve üstü ya
              da 18,66px kalın) 3:1, grafik ve arayüz sınırı 3:1. &quot;EN KÖTÜ
              KARE&quot; satırları duruş karesini değil animasyonun tepe karesini
              gösteriyor: üç adayın ışığı da koyulaştırdığı için tepe karesi
              duruştan İYİ, yani turun en kötü karesi duruş karesinin kendisi.
            </caption>
            <thead>
              <tr>
                {["", "zemin", "metin", "oran", "sonuç"].map((c, i) => (
                  <th
                    key={c || "k"}
                    scope="col"
                    style={{
                      padding: "0 10px 8px",
                      borderBottom: "1px solid var(--border)",
                      textAlign: i === 0 || i === 4 ? "left" : "right",
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "var(--blue-900)",
                    }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AF_KONTRAST.map((r) => (
                <tr key={r.k}>
                  <th scope="row" style={CELL_K}>
                    {r.k}
                  </th>
                  <td style={CELL}>{r.zemin}</td>
                  <td style={CELL}>{r.metin}</td>
                  <td style={CELL}>{r.o}</td>
                  <td style={CELL_L}>{r.e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={BOX}>
          <b style={KICKER}>Hareket · üç periyot, üçü de asal</b>
          <p style={P}>
            <b style={STRONG}>Aday 1</b> 22,9 s · <b style={STRONG}>Aday 2</b> 26,9 s ·{" "}
            <b style={STRONG}>Aday 3</b> 28,1 s. Üçünün de onda birlik değeri asal
            sayı (229 · 269 · 281) ve depodaki hiçbir periyot bu üç asalın katı
            değil, yani üçü hem birbiriyle hem sitedeki listeyle{" "}
            <b style={STRONG}>aralarında asal</b>. Seçimden sonra tarayıcıda{" "}
            <code>getAnimations()</code> ile yeniden doğrulandı, çünkü bu turda başka
            ajanlar da listeye periyot ekliyor. Bu sayfada aynı anda çalışan bütün
            periyotlar, ölçülen hâliyle:{" "}
            <code>10.9 · 12.83 · 13.9 · 17.9 · 19.1 · 19.7 · 21.1 · 22.9 · 26.9 · 28.1</code>{" "}
            saniye. Son üçü bu turun; ilk yedisi kapanmış turların ve tarama sırasında
            başka bir ajanın eklediği 12.83&apos;ün. Hiçbiri 229, 269 ya da 281&apos;in
            katı değil.
          </p>
          <p style={P}>
            Her adayda <b style={STRONG}>tek döngü</b> var, kart başına değil bölüm
            başına. Üçü de yalnızca <code>background-position</code> değiştiriyor,
            hiçbiri kutu ölçüsüne dokunmuyor: tur boyunca düzen hesabı
            tetiklenmiyor. <code>useReducedMotion</code> kullanılmadı; hareketin
            tamamı CSS&apos;te ve <code>@media (prefers-reduced-motion:
            no-preference)</code> kapısının içinde (AGENTS.md · A).
          </p>
        </div>
      </div>

      {/* ==================================================================
          AÇIK TUR · ÜÇ ADAY
          ================================================================== */}
      <FiyatAlanLab
        n1={
          <Kunye
            id="Aday 1"
            name="Levha"
            idea="Bölümün arkası tek parça marka mavisi, kenardan kenara. Üç ülke yalnızca beyaz saç teliyle ayrılmış; kutu, gölge, köşe yok. Dikkat çekiciliği renk yapıyor, çerçeve değil."
            icerik="EN AZ BİLGİ. Bölüm 'hangi ülke, kaç para, ne kadar sürede' üçlüsüne iniyor. Kalem listesi, kalem tutarları, kapsam cümlesi, satır dipnotları ve bölüm alt metni çıkıyor; seçimin ekrandaki tek izi ikinci beyaz hap ('Kuruluş + 2 kalem'). Bahis şu: ana sayfa bir vitrin, kırılım ülke sayfasının işi."
            kontrast="MAVİNİN ÜSTÜNDE KÜÇÜK PUNTO YOK. Mavide duran her metin ya 24px+ ya da 18,66px+ kalın (hepsi 3,99:1 ile 3:1 eşiğini geçiyor); küçük olması gereken her şey beyaz hapa (7,14:1) ya da tam genişlikteki beyaz kaideye (6,69:1+) giriyor. Kısıt tasarımı bükmüyor, içeriği seçiyor, 14 puntoluk kalem listesi bu zeminde zaten okunur yapılamıyordu."
            cost="'Başlar' sözcüğünün karşılığı ekrandan kalkıyor: neyin dahil olduğunu ve nelerin ayrı fiyatlandığını bu bölüm artık söylemiyor. Dürüstlük yükünün tamamı kaidedeki tek cümleye biniyor. Ayrıca çipler bir liste açmadığı için etkileşimin geri bildirimi zayıf: basınca yalnız rakam ve bir hap değişiyor."
          />
        }
        n2={
          <Kunye
            id="Aday 2"
            name="Ölçek"
            idea="Zemin marka mavisinden koyu maviye inen bir derece. Üç ülke yan yana sütun değil alt alta satır ve üçü de aynı eksende: tutarlar ortak bir ölçeğin üstünde çubuk olarak duruyor, altında tek bir eksen çizgisi."
            icerik="ASIL BİLGİ FARKIN KENDİSİ. Bugün ekranda üç mutlak rakam var, aralarındaki ilişkiyi ziyaretçi kafadan çıkarıyor; bu aday çıkarmayı ekrana alıyor (ortak ölçek + en düşük tutara olan fark). Fark yeni bir sayı değil, ekrandaki iki sayının çıkarması. Kalem kırılımı çıkıyor. Çipe basınca yalnız rakamlar değil çubukların boyu ve sıralama da değişiyor, bölümün etkileşimi ilk kez gerçekten bir şey gösteriyor."
            kontrast="DERECELİ ZEMİN. 180 derece #307fe2 → #1b56a8, durak 360px (piksel, yüzde değil: bölüm uzayınca ölçüm bozulmasın diye). Beyazın 4,5:1'e ulaştığı nokta ölçüldü, t=0,218 yani y=78,5px; o bantta yalnızca başlık var ve o büyük metin. Normal punto taşıyan ilk öğe y=170'in altına inmiyor, durağın altı düz 7,14:1. Yani zemin uzadıkça oran yalnızca iyileşiyor."
            cost="Marka mavisi artık bölümün rengi değil, üst kenarı; aşağı inen her satır markadan biraz daha uzaklaşıyor. Ayrıca çubuklar bir sıralama iddiası kuruyor ve 'en ucuz olan en doğru olan' diye okunabilir; bunu tutan tek şey alttaki cümle. Satır düzeni sütun düzenine göre daha az 'vitrin', daha çok 'rapor' duruyor."
          />
        }
        n3={
          <Kunye
            id="Aday 3"
            name="Cetvel"
            idea="Üç katman: mavi sahne (başlık, çipler, üç büyük rakam), tam genişlikte beyaz şerit (dört kalemin üç ülkedeki matrisi) ve mavi taban (üç çıkış). Beyaz şerit kart değil bant: köşesiz, kenarlıksız, iki kenardan da taşıyor."
            icerik="EN ÖNEMLİ DETAY RAKAM DEĞİL, RAKAMIN SINIRI. 'Başlar' sözcüğünün karşılığı ekrana geliyor: banka, muhasebe ve vize tutarları çipe basılmasa da görünüyor, kuruluş kaleminin ülkeye göre değişen kapsam cümlesi hücrede duruyor, dürüst dipnot yalnız ilgili üç hücrede. Çipin işi değişti: kalem AÇMIYOR, kalemi TOPLAMA KATIYOR. Bilgi etkileşimin arkasında değil, etkileşim bilginin üstünde."
            kontrast="KÜÇÜK PUNTO MAVİDEN TAMAMEN ÇIKIYOR. Mavide kalan her şey 22px+ kalın ya da 24px+ (3,99:1, eşik 3:1); yoğun küçük puntonun tamamı beyaz şeritte (20,03:1 ve 6,69:1). Kısıt gizlenmiyor, yerleşime çevriliyor."
            cost="Mavi alan üçünün en küçüğü: 'sectionun arkasını mavi yap' isteğine en eksik cevabı bu veriyor, çünkü ekranın ortasında geniş bir beyaz şerit var. Bölüm üçünün en uzunu: 1078 piksel, yani canlı hâlden 51 piksel UZUN ve Aday 1'den 384 piksel uzun. Matris 620 pikselin altında kendi içinde yatay kayıyor: ölçüldü, 375'te 265 piksel kendi kabında kayıyor ve sayfaya taşma sıfır, ama 320 ve 375'te ziyaretçi tabloyu sürükleyerek okuyor."
          />
        }
      />

      {/* ==================================================================
          KAPANMIŞ TURLAR
          ================================================================== */}
      <div className="container-o" style={{ paddingTop: 64 }}>
        <h2 className="h2" style={{ color: "var(--text-900)", fontSize: 30 }}>
          Kapanmış turlar
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
          Aşağıdakiler karara bağlandı ve <b style={STRONG}>silinmedi</b>: yeni turun
          neyin üstüne kurulduğu ancak yan yana görülünce anlaşılıyor. İkisinde de
          canlıya taşınan bir şey yok, yani ana sayfanın ülkeler bölümü ve fiyat
          bölümü bugün hâlâ ilk hâlleriyle duruyor.
        </p>

        <div style={BOX}>
          <b style={KICKER_EX}>ex · Ülkeler halkası (.sa1 · .sa2 · .sa3)</b>
          <p style={P}>
            <b style={STRONG}>Neden kapandı:</b> müşteri Satürn fikrini reddetti
            (&quot;satürn işi çok bok gibi oldu … siktiret&quot;), yani üç adayın
            ikisinin varlık sebebi olan halka düştü ve tur kapandı.
          </p>
          <p style={P}>
            Turun içinden çıkan ve <b style={STRONG}>hâlâ geçerli olan iki tespit</b>{" "}
            kayıtta kalsın: müşterinin diğer iki isteği (&quot;nokta nokta yerine tek
            düz mavi çizgi&quot; ve &quot;o çizgide sürekli git gel&quot;) canlı
            bölümde hâlâ karşılıksız: bugünkü yay üç katlı, noktalı (
            <code>stroke-dasharray: 0.1 10</code>) ve hiç kımıldamıyor. Aday 3
            (&quot;Hat&quot;) tam olarak o iki isteği halkasız veriyordu ve bandı 124
            pikselden 60&apos;a indiriyordu. Halka olmadan yeniden açılmak istenirse
            başlanacak yer orası.
          </p>
        </div>
      </div>

      <Tablo cap="ex · ülkeler halkası turunun ölçümleri. Yükseklik 1440'ta ve karşılaştırılan kutu yayın/satırların kendisi (.uk3-grid ile .sax-grid), bölüm dolgusu hariç." cols={EX_COLS} rows={MEASURED_UK} />

      <div className="container-o">
        <div style={BOX}>
          <b style={KICKER_BASE}>Taban · ülkeler bölümü, bugün canlıda</b>
          <p style={P}>
            Canlı bileşenin kendisi (<code>ThreeCountries.tsx</code>). Adaylar bu
            bölümün yalnızca yay kısmını yeniden yazıyordu; panel ve kıyas tablosu
            hiçbir adayda yok.
          </p>
        </div>
      </div>

      <ThreeCountries />

      <Kunye
        ex
        id="ex · Aday 1"
        name="Halka"
        idea="Üç ülke tek bir halkanın üstünde; halkanın alt yayı onların altından geçip kapanıyor. Işık halkanın üst yayında git gel yapıyor."
        cost="Halka 124 piksel yer kaplıyor ve hiçbir bilgi taşımıyor. Kapalı bir elips üç ülkeyi bir sıraya değil bir çembere koyuyor, oysa bunlar bir döngünün parçası değil üç ayrı seçenek."
      />
      <UlkeHalka />

      <Kunye
        ex
        id="ex · Aday 2"
        name="Üç halka"
        idea="Satürn bölümün tamamına değil her ülkeye veriliyor: tek düz mavi çizgi üç diski diziyor, her diskin kendi eğik halkası var."
        cost="Üç halka üç ayrı süs demek: bölümde zaten üç bayrak, üç ad, üç künye ve bir çizgi var. Disk yuvası halkasız hâle göre 28 piksel fazla istiyor."
      />
      <UlkeUcHalka />

      <Kunye
        ex
        id="ex · Aday 3"
        name="Hat (halkasız)"
        idea="Halka yok, yay yok. Müşterinin diğer iki isteği aynen yerinde: tek düz mavi çizgi ve o çizgide sürekli git gel."
        cost="Sahne. Canlıdaki üç katlı yay bir açılış jesti veriyordu; burada geriye tek bir yatay hat kalıyor. Buna karşılık band 124 pikselden 60'a iniyor."
      />
      <UlkeHat />

      <div className="container-o" style={{ paddingTop: 56 }}>
        <div style={BOX}>
          <b style={KICKER_EX}>ex · Fiyat kartları (.mk1 · .mk2 · .mk3)</b>
          <p style={P}>
            <b style={STRONG}>Neden kapandı:</b> tur &quot;fiyatlar mavi cardların
            üzerinden olabilir&quot; cümlesi üzerine kurulmuştu; müşteri sonradan
            kartı istemediğini söyledi (&quot;fiyatlar kısmında kart yapmanı
            istememiştim aslında&quot;) ve mavi olması gereken şeyin bölümün arkası
            olduğunu netleştirdi. Üç kart adayı da bu yüzden düştü.
          </p>
          <p style={P}>
            <b style={STRONG}>Turdan bu tura taşınan şey:</b> kontrast ölçümü. Marka
            mavisi üstüne beyazın 3,99:1 verdiği ve normal puntonun düştüğü bu turda
            bulunmuştu; açık turun üç adayı da o sayının etrafında kuruldu. Ayrıca{" "}
            <code>src/components/lab/fiyatKart.ts</code> (kalem adları, kapsam
            cümleleri, dipnotlar) bu turdan kalma ve yeni adaylar da onu okuyor;
            silinirse üç yeni aday da kırılır.
          </p>
        </div>
      </div>

      <Tablo cap="ex · mavi kart turunun ölçümleri. Yükseklik 1440'ta, karşılaştırılan kutu sütun ızgarası (.fy2-cols ile .mkx-cols); ilk değer hiçbir kalem seçili değilken, ikincisi üç kalem de açıkken. Bu tablodaki 'taban' satırı ızgarayı ölçüyor, açık turdaki taban satırı ise bölümün tamamını, iki sayı doğrudan karşılaştırılamaz." cols={EX_COLS} rows={MEASURED_FY} />

      <MaviKartLab
        n1={
          <Kunye
            ex
            id="ex · Aday 1"
            name="Tam mavi kart"
            idea="Kartın tamamı mavi; renk --blue-900 (#1b56a8) çünkü marka mavisinde kalem etiketleri eşiğin altında kalıyordu."
            cost="Bu artık markanın mavisi değil, koyu tonu. Ayrıca ağırlık merkezi rakamdan kutuya kayıyor."
          />
        }
        n2={
          <Kunye
            ex
            id="ex · Aday 2"
            name="Mavi plaka"
            idea="Kart koyu kalıyor, mavi olan yalnızca rakamın oturduğu plaka."
            cost="En az 'mavi' olan aday. Buna karşılık bölümün gece kimliği bozulmuyor."
          />
        }
        n3={
          <Kunye
            ex
            id="ex · Aday 3"
            name="Mavi kabuk"
            idea="Kart marka mavisinde; kalem listesi beyaz bir panele iniyor."
            cost="İki yüzey iki dolgu demek: kart üçünün en uzunu. Beyaz panel bölümün gece zeminini de kırıyor."
          />
        }
      />

      {/* ================================================================== */}
      <div className="container-o" style={{ paddingBlock: 56 }}>
        <div style={BOX}>
          <b style={KICKER}>Karar verilirse ne olacak</b>
          <p style={P}>
            Kazanan aday <code>src/components/home/PriceSummary.tsx</code> ile{" "}
            <code>globals.css</code>&apos;in <code>.fy2-</code> bölümüne taşınır;
            kaybedenler, <code>src/components/lab</code> altındaki kopyaları ve{" "}
            <code>globals.css</code>&apos;teki <code>lab-af*</code> ile{" "}
            <code>lab-mk</code> / <code>lab-uk4</code> <code>@import</code> satırları
            silinir, bu rota gider.
          </p>
          <p style={P}>
            <b style={STRONG}>Taşımadan önce kapatılması gereken üç şey:</b> (1)
            aylık/yıllık muhasebe çelişkisi, yani <code>pricing.ts</code> mi{" "}
            <code>afterSetup.ts</code> mi doğru; (2) çıkış bağlantısının mavisi:
            site geneli <code>--blue-700</code>, adaylar <code>--blue-900</code>; (3)
            ülke sayfasının fiyat bölümü siyah kalacak mı, yoksa ana sayfayla aynı
            dile mi geçecek.
          </p>
          <p style={P}>
            <code>src/components/lab/fiyatKart.ts</code> içindeki metin sabitleri{" "}
            <code>PriceSummary.tsx</code>&apos;ten aynalandı çünkü o dosya bu turda
            salt okunur.{" "}
            <b style={STRONG}>
              Tur kapanmadan o satırlar canlıda değişirse buraya da elle taşınmalı.
            </b>
          </p>
        </div>
      </div>
    </main>
  );
}
