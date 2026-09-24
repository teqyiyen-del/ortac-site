import type { ReactNode } from "react";

/* Lab adayının künyesi: ad + tek satır. Ekrana başka metin basılmaz
   (docs/tuzaklar.md · Lab sayfaları ekrana METİN DÖKMEZ). */
export function Aday({
  ad,
  kunye,
  zemin = "white",
  children,
}: {
  ad: string;
  kunye: string;
  zemin?: "white" | "paper";
  children: ReactNode;
}) {
  return (
    <section className="sec-pad" style={{ background: `var(--${zemin})` }}>
      <div className="container-o">
        <p
          style={{
            display: "inline-block",
            marginBottom: 40,
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
        {children}
      </div>
    </section>
  );
}
