import { FaydaBento, FaydaDefter, FaydaSahne } from "@/components/lab/FaydaAdaylar";

/* /dubai/muhasebe · #fayda bölümüne üç aday.
   Bölüm bugün dört satır (başlık + açıklama) ve hiçbir görseli yok; müşteri
   bento ve ikonlu/SVG'li iki yön istedi, üçüncüsü serbest bırakıldı.
   Metin accountingDubai.ts · gains'ten; canlı sayfaya dokunulmadı. */

const CANDIDATES = [
  {
    id: "F1",
    kind: "Bento",
    Section: FaydaBento,
    not: "Asimetrik ızgara: büyük karo takvim çizimi, iki küçük karo yalnız yazı, altta geniş bant kendi çizimiyle.",
  },
  {
    id: "F2",
    kind: "Sahne",
    Section: FaydaSahne,
    not: "Dört kart, her kalemin kendi küçük sahnesi. Kart ve çizim dili ana sayfadaki hizmet kartının aynısı.",
  },
  {
    id: "F3",
    kind: "Tek defter",
    Section: FaydaDefter,
    not: "Tek büyük sahne ve dört kısa satır: dört kalem birbirinin eşi değil, aynı kaydın dört sonucu.",
  },
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

export default function LabMuhasebeFaydaPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Düzenli muhasebenin karşılığı
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
    </main>
  );
}
