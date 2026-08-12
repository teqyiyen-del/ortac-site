import type { Metadata } from "next";
import Link from "next/link";
import { LAB_DURUM_RENK, LAB_TURLARI, labAd } from "./turlar";

/* /lab — aday tasarımların karşılaştırma alanı.
 *
 * Buradaki hiçbir sayfa canlı akışa bağlı değil ve hiçbiri dizine girmiyor.
 * Bir aday seçildiğinde: kazanan kendi bölümünün dosyasına taşınır,
 * src/components/lab altındaki kaybedenler silinir, globals.css'teki
 * ilgili `@import "./css/lab-*.css"` satırları kaldırılır ve bu dizin gider.
 * Yani /lab kalıcı bir yapı değil, bir karar turu boyunca yaşayan bir iskele.
 *
 * TUR LİSTESİ BU DOSYADA DEĞİL: ./turlar.ts. Sıra kuralı (yeni olan en başta),
 * durum noktalarının anlamı ve neden tek kaynağa indirildiği orada yazılı.
 */

export const metadata: Metadata = {
  title: "Aday tasarımlar | Ortac Global",
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          padding: "14px 24px",
          background: "var(--night)",
          borderBottom: "1px solid var(--night-line)",
        }}
      >
        <Link
          href="/lab"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#ffffff",
            textDecoration: "none",
            marginRight: 8,
          }}
        >
          Lab
        </Link>
        {LAB_TURLARI.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            aria-label={labAd(p)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: 13,
              color: "#9c9c9c",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid #262626",
            }}
          >
            {/* Nokta aria-hidden: aynı bilgi bağlantının aria-label'ında
                kelimeyle duruyor (labAd). Renk tek başına bilgi taşımaz. */}
            {p.durum !== "yok" && (
              <span
                aria-hidden="true"
                style={{
                  width: 7,
                  height: 7,
                  flex: "none",
                  borderRadius: "50%",
                  background: LAB_DURUM_RENK[p.durum],
                }}
              />
            )}
            {p.t} · {p.n}
          </Link>
        ))}
      </nav>
      {children}
    </>
  );
}
