import type { Metadata } from "next";
import Link from "next/link";

/* /lab — aday tasarımların karşılaştırma alanı.
 *
 * Buradaki hiçbir sayfa canlı akışa bağlı değil ve hiçbiri dizine girmiyor.
 * Bir aday seçildiğinde: kazanan kendi bölümünün dosyasına taşınır,
 * src/components/lab altındaki kaybedenler silinir, globals.css'teki
 * ilgili `@import "./css/lab-*.css"` satırları kaldırılır ve bu dizin gider.
 * Yani /lab kalıcı bir yapı değil, bir karar turu boyunca yaşayan bir iskele.
 */

export const metadata: Metadata = {
  title: "Aday tasarımlar | Ortac Global",
  robots: { index: false, follow: false },
};

const PAGES = [
  { href: "/lab/zincir", t: "Zincir bölümü", n: "canlıda: Z8" },
  { href: "/lab/muhasebe-takas", t: "Muhasebe · takas bölümü", n: "canlıda: Sevkiyat" },
  { href: "/lab/hakkimizda-bento", t: "Hakkımızda · bento", n: "canlıda: Künye" },
  { href: "/lab/muhasebe-takvim", t: "Muhasebe takvimi", n: "MT7 · MT8 · MT9" },
  { href: "/lab/hero-dunya", t: "Hero dünyası", n: "G1 · G2 · G3" },
  { href: "/lab/dubai-fiyat", t: "Ülke sayfası · fiyat", n: "DF1 · DF2 · DF3" },
  { href: "/lab/kapali", t: "Dolaşıma kapalı sayfalar", n: "arka kapı" },
  { href: "/lab/hero", t: "Dubai hero kartı", n: "canlıda: H12" },
  { href: "/lab/anket", t: "Uygunluk anketi · tasarım", n: "Sahne · Föy · Pano" },
  { href: "/lab/hero-portal", t: "Hero · portal fikri", n: "yeni: P5" },
  { href: "/lab/yapi", t: "Serbest bölge / mainland", n: "canlıda: Y5" },
  { href: "/lab/otorite", t: "Neden Ortac · geniş karo", n: "canlıda: A1" },
];

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
        {PAGES.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            style={{
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
            {p.t} · {p.n}
          </Link>
        ))}
      </nav>
      {children}
    </>
  );
}
