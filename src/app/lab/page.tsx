import Link from "next/link";

const PAGES = [
  { href: "/lab/kapali", t: "Dolaşıma kapalı sayfalar", n: "arka kapı", l: "Kapatılan sayfalara buradan gidilir" },
  { href: "/lab/hero", t: "Dubai hero kartı", n: "karar bekliyor", l: "H10 dikey akış · H12 beyaz çizim · gerisi ex" },
  { href: "/lab/ulkeler", t: "Ana sayfa · ülkeler bölümü", n: "karar bekliyor", l: "C11 yay · C12 sade açılır — ikisi de sunulacak" },
  { href: "/lab/surec", t: "Süreç bölümü", n: "canlıda: P1", l: "P0 yedek olarak altta duruyor" },
  { href: "/lab/navbar", t: "Navbar · megabar", n: "karar bekliyor", l: "N4 açık panel · N5 koyu ama ince · N6 kart ızgarası" },
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
