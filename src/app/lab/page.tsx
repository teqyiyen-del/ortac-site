import Link from "next/link";

const PAGES = [
  { href: "/lab/zincir", t: "Zincir bölümü", n: "canlıda: Z8", l: "Z7 ex olarak altta duruyor" },
  {
    href: "/lab/muhasebe-takas",
    t: "Muhasebe · takas bölümü",
    n: "3 aday",
    l: "Mutabakat (sakin) · Çatal (3→1→6) · Tarama (ışık geçiyor) — taban en üstte",
  },
  {
    href: "/lab/hakkimizda-bento",
    t: "Hakkımızda · bento",
    n: "3 yeni",
    l: "Künye · Sütun · Levha — üçüncü tur, metin 163-191 karakter; altı eski aday ex",
  },
  {
    href: "/lab/muhasebe-takvim",
    t: "Muhasebe takvimi",
    n: "3 yeni",
    l: "MT7 · MT8 · MT9 — üçüncü tur, MT1-6 ex",
  },
  { href: "/lab/hero-dunya", t: "Hero dünyası — küreye alternatif", n: "3 yeni", l: "Düz harita · Siluet · Sokak cephesi" },
  {
    href: "/lab/ana-sayfa",
    t: "Ana sayfa · ülkeler + fiyat kartları",
    n: "3 + 3 aday",
    l: "Halka · Üç halka · Hat — ve Tam mavi · Plaka · Kabuk; iki tabanla birlikte",
  },
  { href: "/lab/kapali", t: "Dolaşıma kapalı sayfalar", n: "arka kapı", l: "Kapatılan sayfalara buradan gidilir" },
  { href: "/lab/hero", t: "Dubai hero kartı", n: "canlıda: H12", l: "H10 dikey akış hâlâ seçenek · H2/H6/H8/H9 ex" },
  {
    href: "/lab/hero-portal",
    t: "Hero · portal fikri",
    n: "3 aday",
    l: "P1 eşik (içinden bakılan) · P2 geçit (koridor) · P3 aşan (sınırı geçen) — taban üstte",
  },
  {
    href: "/lab/yapi",
    t: "Serbest bölge / mainland",
    n: "3 yeni",
    l: "Y4 baştan seçili · Y5 nöbet · Y6 kapalı hâl yok — S3 taban olarak üstte",
  },
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
          Hiçbiri canlı sayfalara bağlı değil; seçilen kendi bölümüne taşınıyor,
          kalanlar siliniyor. Karara bağlanan turlar buradan kaldırıldı: iletişim
          sayfası, ana sayfa ülkeler bölümü, süreç bölümü, navbar, gelişmeler
          kartı, muhasebe hero sahnesi, &quot;kim yürütüyor&quot; bölümü ve hero
          sonrası geçiş aralığı artık yalnızca canlı dosyalarında yaşıyor.
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
