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
  { href: "/lab/iletisim", t: "İletişim sayfası", n: "I4 · I5" },
  { href: "/lab/zincir", t: "Zincir bölümü", n: "Z4 · Z5 · Z6" },
  { href: "/lab/hero-dunya", t: "Hero dünyası", n: "G1 · G2 · G3" },
  { href: "/lab/kapali", t: "Dolaşıma kapalı sayfalar", n: "arka kapı" },
  { href: "/lab/hero", t: "Dubai hero kartı", n: "canlıda: H12" },
  { href: "/lab/ulkeler", t: "Ana sayfa · ülkeler", n: "canlıda: C11" },
  { href: "/lab/surec", t: "Süreç bölümü", n: "canlıda: P1" },
  { href: "/lab/navbar", t: "Navbar · megabar", n: "canlıda: N1" },
  { href: "/lab/yapi", t: "Serbest bölge / mainland", n: "canlıda: S1" },
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
