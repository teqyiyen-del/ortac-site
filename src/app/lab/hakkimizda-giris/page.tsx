import type { Metadata } from "next";
import AboutGirisL1 from "@/components/lab/AboutGirisL1";
import AboutGirisK2 from "@/components/lab/AboutGirisK2";
import AboutGirisO3 from "@/components/lab/AboutGirisO3";

/* /lab/hakkimizda-giris — /hakkimizda sayfasının hero'sundan vizyon/misyon
   bloğunun sonuna kadarki şeride üç aday.
   Ayrışma ekseni yapısal: fotoğraf nerede · vizyon-misyon ne biçimde ·
   şerit kaç bloğa bölünmüş. Canlı sayfaya hiçbiri bağlı değil. */

export const metadata: Metadata = {
  title: "Hakkımızda girişi · aday tasarımlar | Ortac Global",
  robots: { index: false, follow: false },
};

const CANDIDATES = [
  {
    id: "Aday A",
    name: "Levha",
    kind: "Hero + tek blok · foto yalnız hero'da · vizyon ve misyon tek beyan",
    Section: AboutGirisL1,
  },
  {
    id: "Aday B",
    name: "Kanat",
    kind: "Hero + iki blok · iki ayrı kare · vizyon ve misyon iki kart",
    Section: AboutGirisK2,
  },
  {
    id: "Aday C",
    name: "Ocak",
    kind: "Foto hero'dan iniyor, hero kompakt · vizyon ve misyon karenin yanında",
    Section: AboutGirisO3,
  },
];

/* Bu sayfanın kendi CSS'i yok: karar sayfası için ayrı bir stil dosyası
   açmak, karar verildiğinde silinecek bir dosya daha demek. */
const KICKER: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "5px 12px",
  borderRadius: 999,
  background: "var(--blue-100)",
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--blue-900)",
};

export default function HakkimizdaGirisLab() {
  return (
    <main>
      {CANDIDATES.map(({ id, name, kind, Section }) => (
        <div key={id}>
          <div
            style={{
              padding: "40px 24px 0",
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            <span style={KICKER}>{id}</span>
            <h2
              style={{
                margin: "14px 0 4px",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 26,
                letterSpacing: "-0.02em",
                color: "var(--text-900)",
              }}
            >
              {name}
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: "var(--text-600)" }}>{kind}</p>
          </div>
          <Section />
          <hr
            style={{
              margin: 0,
              border: 0,
              borderTop: "1px solid var(--border)",
            }}
          />
        </div>
      ))}
    </main>
  );
}
