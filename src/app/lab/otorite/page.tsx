import AuthorityA1 from "@/components/lab/AuthorityA1";
import AuthorityA3 from "@/components/lab/AuthorityA3";

/* "Neden Ortac Global?" bölümünün geniş karosu.
   A1 seçildi ve canlıya alındı; canlı hâli birebir bu değil (üç madde ülkeye
   kilitli olmaktan çıktı, özdeş tikler yerine her maddeye kendi ikonu geldi).
   A2 daha önce silindi, A3 kayıt olarak duruyor.
   Dış kabuk (.bn-tile-wide) burada, çünkü karo TrustLayer'ın ızgarasına ait. */

const CANDIDATES = [
  { id: "A1", kind: "Dünya · canlıda", Tile: AuthorityA1 },
  { id: "A3", kind: "Sessiz · üç yerel saat kadranı", Tile: AuthorityA3 },
];

export default function LabAuthorityPage() {
  return (
    <main style={{ background: "var(--paper)", paddingBottom: 96 }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Neden Ortac Global · geniş karo
        </h1>

        {CANDIDATES.map(({ id, kind, Tile }) => (
          <section key={id} style={{ marginTop: 40 }}>
            <span
              style={{
                display: "inline-flex",
                marginBottom: 16,
                padding: "5px 12px",
                borderRadius: 999,
                background: "var(--blue-100)",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--blue-700)",
              }}
            >
              {id} · {kind}
            </span>

            <div className="bn">
              <div className="bn-tile bn-tile-wide">
                <Tile />
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
