import CalMT1 from "@/components/lab/CalMT1";
import CalMT2 from "@/components/lab/CalMT2";
import CalMT3 from "@/components/lab/CalMT3";
import CalMT4 from "@/components/lab/CalMT4";
import CalMT5 from "@/components/lab/CalMT5";
import CalMT6 from "@/components/lab/CalMT6";
import CalMT7 from "@/components/lab/CalMT7";
import CalMT8 from "@/components/lab/CalMT8";
import CalMT9 from "@/components/lab/CalMT9";

/* /dubai/muhasebe · "Muhasebe ne zaman başlıyor, hangi ay ne oluyor?" · 3. tur.
   Kural: gürültü düşecek, içerik ayakta kalacak (1. tur "çok teknik ve karmaşık",
   2. tur "sadeleştir derken yok etmişsin" diye elendi). Üçü de bir görsel çiziyor.
   MT1-MT6 ex; hiçbiri seçilmedi, silinmediler.
   Aylar, dönemler, oranlar ve süreler dokuzunda da accountingDubai.ts'ten
   okunuyor; yeni tarih, oran, ceza veya süre yok. Canlı sayfaya dokunulmadı. */

const CANDIDATES = [
  {
    id: "MT7",
    kind: "Yalnız işaretler",
    Section: CalMT7,
    not: "On iki aylık tek ray; yalnızca iş OLAN yer işaretli, her ay tekrar eden kalem tek çubuk.",
  },
  {
    id: "MT8",
    kind: "Ayın üç ağırlığı",
    Section: CalMT8,
    not: "On iki ay ağırlığa göre üç karta bölünüyor; kart uzadıkça o ayda iş artıyor.",
  },
  {
    id: "MT9",
    kind: "Duvar takvimi",
    Section: CalMT9,
    not: "Her ay tekrar eden iş ızgaranın üstünde tek cümle; ızgarada yalnız o aya özel olan yazılı.",
  },
];

/* Emekliler. Silinmiyorlar: bir fikir geri istenirse yeniden yazılmasın. */
const RETIRED = [
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
        <span style={KICKER_EX}>ex · birinci ve ikinci tur</span>
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
