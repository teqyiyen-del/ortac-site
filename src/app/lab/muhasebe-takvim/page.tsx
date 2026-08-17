import CalMT1 from "@/components/lab/CalMT1";
import CalMT2 from "@/components/lab/CalMT2";
import CalMT3 from "@/components/lab/CalMT3";
import CalMT4 from "@/components/lab/CalMT4";
import CalMT5 from "@/components/lab/CalMT5";
import CalMT6 from "@/components/lab/CalMT6";
import CalMT7 from "@/components/lab/CalMT7";
import CalMT8 from "@/components/lab/CalMT8";
import CalMT9 from "@/components/lab/CalMT9";
import CalMT10 from "@/components/lab/CalMT10";
import CalMT11 from "@/components/lab/CalMT11";
import CalMT12 from "@/components/lab/CalMT12";

/* /dubai/muhasebe · takvim bölümü · 4. tur.
   Sözleşme: bilgi kalemi sayısı sabit, aynı anda görünen nesne azalıyor,
   fazlası tek tık uzakta. Üçü de aynı kapıları taşıyor; ayrıştıkları tek yer
   yüzeyde duran nesnenin cinsi (çizim / sayı / kapı).
   Aylar, oranlar ve süreler on ikisinde de accountingDubai.ts'ten okunuyor.
   Canlı sayfaya dokunulmadı. MT1-MT9 ex; silinmediler. */

const CANDIDATES = [
  {
    id: "MT10",
    kind: "Tek ray",
    Section: CalMT10,
    not: "Üç kalem tek eksende; süren iş on iki çentikli tek çubuk, biten iş nokta, boş ay hiç çizilmiyor.",
  },
  {
    id: "MT11",
    kind: "Üç sayaç",
    Section: CalMT11,
    not: "Çapa bir rakam: ilk 12 ayda 17 kez iş. Aylar kutu değil yazı, üç satırda.",
  },
  {
    id: "MT12",
    kind: "Her ritim kendi kapısı",
    Section: CalMT12,
    not: "Satırın kendisi kapı; aynı anda en fazla tek kalemin on iki ayı açık.",
  },
];

/* Emekliler. Silinmiyorlar: bir fikir geri istenirse yeniden yazılmasın. */
const RETIRED = [
  { id: "MT7", round: "üçüncü tur", kind: "Yalnız işaretler", Section: CalMT7 },
  { id: "MT8", round: "üçüncü tur", kind: "Ayın üç ağırlığı", Section: CalMT8 },
  { id: "MT9", round: "üçüncü tur", kind: "Duvar takvimi", Section: CalMT9 },
  { id: "MT4", round: "ikinci tur", kind: "Tek cümle", Section: CalMT4 },
  { id: "MT5", round: "ikinci tur", kind: "Tetikleyici sırası", Section: CalMT5 },
  { id: "MT6", round: "ikinci tur", kind: "Bende doğar mı", Section: CalMT6 },
  { id: "MT1", round: "birinci tur", kind: "Yılın şekli", Section: CalMT1 },
  { id: "MT2", round: "birinci tur", kind: "Şu an neredeyim", Section: CalMT2 },
  { id: "MT3", round: "birinci tur", kind: "Üç satırlık liste", Section: CalMT3 },
];

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

const KICKER_EX: React.CSSProperties = {
  ...KICKER,
  background: "var(--paper)",
  color: "#8a8a8a",
};

export default function LabMuhasebeTakvimPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Muhasebe takvimi
        </h1>
      </div>

      {CANDIDATES.map(({ id, kind, Section, not }) => (
        <div key={id}>
          <div
            className="container-o"
            style={{ paddingTop: 48, marginTop: 40, borderTop: "1px solid var(--border)" }}
          >
            <span style={KICKER}>
              {id} · {kind}
            </span>
            <p
              style={{
                margin: "12px 0 0",
                maxWidth: "70ch",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              {not}
            </p>
          </div>
          <Section />
        </div>
      ))}

      <div
        className="container-o"
        style={{ paddingTop: 64, marginTop: 48, borderTop: "2px solid var(--text-900)" }}
      >
        <span style={KICKER_EX}>ex · birinci, ikinci ve üçüncü tur</span>
      </div>

      {RETIRED.map(({ id, round, kind, Section }) => (
        <div key={id}>
          <div className="container-o" style={{ paddingTop: 40, marginTop: 32 }}>
            <span style={KICKER_EX}>
              ex {id} · {round} · {kind}
            </span>
          </div>
          <Section />
        </div>
      ))}
    </main>
  );
}
