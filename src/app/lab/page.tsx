import Link from "next/link";

const PAGES = [
  { href: "/lab/iletisim", t: "İletişim sayfası", n: "3 aday", l: "Tek soru · Masa · Santral" },
  { href: "/lab/zincir", t: "Zincir bölümü", n: "3 aday", l: "Bölüm gibi · Zamanda · Metaforsuz" },
  { href: "/lab/hero-dunya", t: "Hero dünyası — küreye alternatif", n: "3 yeni", l: "Düz harita · Siluet · Sokak cephesi" },
  { href: "/lab/kapali", t: "Dolaşıma kapalı sayfalar", n: "arka kapı", l: "Kapatılan sayfalara buradan gidilir" },
  { href: "/lab/hero", t: "Dubai hero kartı", n: "canlıda: H12", l: "H10 dikey akış hâlâ seçenek · H2/H6/H8/H9 ex" },
  { href: "/lab/ulkeler", t: "Ana sayfa · ülkeler bölümü", n: "canlıda: C11", l: "C12 geliştirilebilir olarak duruyor" },
  { href: "/lab/surec", t: "Süreç bölümü", n: "canlıda: P1", l: "P0 yedek olarak altta duruyor · P2-P3 silindi" },
  { href: "/lab/navbar", t: "Navbar · megabar", n: "canlıda: N1", l: "N8 düzeltilmiş birleşim · N7 · N4 · N5 · N6" },
  { href: "/lab/yapi", t: "Serbest bölge / mainland", n: "karar Murat abide", l: "Çerçeve (canlıda) · Tek soru · Şema" },
  { href: "/lab/otorite", t: "Neden Ortac · geniş karo", n: "seçildi", l: "A1 canlıda · Belge ve Sessiz kayıtta" },
];

export default function LabIndex() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100dvh", padding: "64px 0" }}>
      <div className="container-o">
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Aday tasarımlar
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "60ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          Üç ayrı karar bekliyor. Hiçbiri canlı sayfalara bağlı değil; seçilen kendi
          bölümüne taşınacak, kalanlar silinecek.
        </p>

        <div style={{ display: "grid", gap: 14, marginTop: 40, maxWidth: 720 }}>
          {PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 14,
                flexWrap: "wrap",
                padding: "20px 22px",
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--border)",
                background: "var(--white)",
                textDecoration: "none",
              }}
            >
              <b
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 17,
                  color: "var(--text-900)",
                }}
              >
                {p.t}
              </b>
              <span style={{ fontSize: 13, color: "var(--blue-700)" }}>{p.n}</span>
              <span style={{ fontSize: 13.5, color: "var(--text-600)", width: "100%" }}>
                {p.l}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
