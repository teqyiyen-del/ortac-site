import type { ReactNode } from "react";

/* Lab adayının künyesi: ad + tek satır. Ekrana başka metin basılmaz
   (docs/tuzaklar.md · Lab sayfaları ekrana METİN DÖKMEZ).
   `bolum`: aday kendi sec-pad'li bölümü olan canlı bir bileşense (ör.
   CountryPros) künye onun üstünde ince bir şeritte durur, bileşen sarılmaz;
   sarılsaydı iki container-o iç içe girip içerik daralırdı. */
export function Aday({
  ad,
  kunye,
  zemin = "white",
  bolum,
  children,
}: {
  ad: string;
  kunye: string;
  zemin?: "white" | "paper";
  bolum?: boolean;
  children: ReactNode;
}) {
  const kunyeP = (
    <p
      style={{
        display: "inline-block",
        marginBottom: bolum ? 0 : 40,
        padding: "6px 14px",
        borderRadius: 16,
        lineHeight: 1.5,
        background: "var(--night)",
        color: "#fff",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {ad}
      <span style={{ marginLeft: 10, fontWeight: 400, color: "var(--on-dark-2)" }}>{kunye}</span>
    </p>
  );
  if (bolum) {
    return (
      <>
        <div style={{ background: `var(--${zemin})`, paddingTop: 64 }}>
          <div className="container-o">{kunyeP}</div>
        </div>
        {children}
      </>
    );
  }
  return (
    <section className="sec-pad" style={{ background: `var(--${zemin})` }}>
      <div className="container-o">
        {kunyeP}
        {children}
      </div>
    </section>
  );
}
