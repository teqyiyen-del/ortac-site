import Link from "next/link";

const PAGES = [
  { href: "/lab/zincir", t: "Zincir bölümü", n: "canlıda: Z8", l: "Z7 ve Z6 ex olarak altta duruyor" },
  {
    href: "/lab/ulke-giris",
    t: "Ülke sayfası girişi",
    n: "6 yeni tür",
    l: "T0 sıfır bölüm · T1 yönlendirme · T2 basın · T3 duyusal · T4 süre · T5 araç — canlıda YOK",
  },
  {
    href: "/lab/muhasebe-ekip",
    t: "Muhasebe · kim yürütüyor",
    n: "4 aday",
    l: "K4 beyan + zemin · K1 ana beyan · K2 zemin (ex) · K3 künye",
  },
  {
    href: "/lab/muhasebe-hero",
    t: "Muhasebe · hero sahnesi",
    n: "3 aday",
    l: "Geçit (belge akışı) · Klasör (tıklanır, 4 bölme) · Eşleşme (ekstre↔defter)",
  },
  {
    href: "/lab/gelismeler",
    t: "Gelişmeler kartı",
    n: "3 aday",
    l: "GL1 sicil · GL2 ızgara · GL3 manşet",
  },
  {
    href: "/lab/muhasebe-takvim",
    t: "Muhasebe takvimi",
    n: "3 yeni",
    l: "MT7 · MT8 · MT9 — üçüncü tur, MT1-6 ex",
  },
  { href: "/lab/hero-dunya", t: "Hero dünyası — küreye alternatif", n: "3 yeni", l: "Düz harita · Siluet · Sokak cephesi" },
  { href: "/lab/kapali", t: "Dolaşıma kapalı sayfalar", n: "arka kapı", l: "Kapatılan sayfalara buradan gidilir" },
  { href: "/lab/hero", t: "Dubai hero kartı", n: "canlıda: H12", l: "H10 dikey akış hâlâ seçenek · H2/H6/H8/H9 ex" },
  { href: "/lab/navbar", t: "Navbar · megabar", n: "canlıda: N1", l: "N8 düzeltilmiş birleşim · N4-N7 silindi" },
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
          Hiçbiri canlı sayfalara bağlı değil; seçilen kendi bölümüne taşınıyor,
          kalanlar siliniyor. Karara bağlanan turlar buradan kaldırıldı: iletişim
          sayfası, ana sayfa ülkeler bölümü ve süreç bölümü artık yalnızca canlı
          dosyalarında yaşıyor.
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
