import type { Metadata } from "next";
import AboutGirisO3 from "@/components/lab/AboutGirisO3";
import AboutGirisF4 from "@/components/lab/AboutGirisF4";
import AboutGirisY5 from "@/components/lab/AboutGirisY5";
import AboutGirisL1 from "@/components/lab/AboutGirisL1";
import AboutGirisK2 from "@/components/lab/AboutGirisK2";

/* /lab/hakkimizda-giris — /hakkimizda sayfasının hero'sundan vizyon/misyon
   bloğunun sonuna kadarki şerit.

   2. TUR. İlk turun üç adayından İKİSİ EX: Levha ve Kanat, fotoğrafın hero'da
   kaldığı varsayımıyla kurulmuştu ve müşteri o varsayımı iptal etti ("heroda
   görsel kullanmayı beğenemedim, kim olduğumuz kısmına geri çekelim").
   Ocak o kararı zaten öngörüyordu, yerinde duruyor. Yeni iki aday soruyu
   müşterinin bugünkü tarifiyle alıyor: şerit daha etkileyici olsun, vizyon
   ve misyon sönük kalmasın. Canlı sayfaya hiçbiri bağlı değil. */

export const metadata: Metadata = {
  title: "Hakkımızda girişi · aday tasarımlar | Ortac Global",
  robots: { index: false, follow: false },
};

const CANDIDATES = [
  {
    id: "Aday C",
    name: "Ocak",
    kind: "Hero kompakt · kare vizyon-misyonun yanında, tek gece panelde",
    Section: AboutGirisO3,
  },
  {
    id: "Aday D",
    name: "Fitil",
    kind: "Şerit tek levha · beyan gece katta · vizyondan misyona ışık",
    Section: AboutGirisF4,
  },
  {
    id: "Aday E",
    name: "Yaprak",
    kind: "Geniş fotoğraf şeridi · beyan sayfanın mavi kâğıdında",
    Section: AboutGirisY5,
  },
];

/* Varsayımı çöken iki aday. SİLİNMİYOR: müşteri neyi iptal ettiğini ancak
   ekranda görünce eşleştirebiliyor ve ikisi de hero'da fotoğrafla açılıyor. */
const EX = [
  {
    id: "ex · Aday A",
    name: "Levha",
    kind: "1. tur · foto hero'da kalıyor · şerit tek levha",
    Section: AboutGirisL1,
  },
  {
    id: "ex · Aday B",
    name: "Kanat",
    kind: "1. tur · foto hero'da kalıyor · aşağıya ikinci kare",
    Section: AboutGirisK2,
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

const KICKER_EX: React.CSSProperties = {
  ...KICKER,
  background: "var(--paper)",
  color: "#5c5c5c",
};

function Baslik({
  id,
  name,
  kind,
  ex,
}: {
  id: string;
  name: string;
  kind: string;
  ex?: boolean;
}) {
  return (
    <div style={{ padding: "40px 24px 0", maxWidth: 1200, margin: "0 auto" }}>
      <span style={ex ? KICKER_EX : KICKER}>{id}</span>
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
  );
}

const AYRAC: React.CSSProperties = {
  margin: 0,
  border: 0,
  borderTop: "1px solid var(--border)",
};

export default function HakkimizdaGirisLab() {
  return (
    <main>
      {CANDIDATES.map(({ id, name, kind, Section }) => (
        <div key={id}>
          <Baslik id={id} name={name} kind={kind} />
          <Section />
          <hr style={AYRAC} />
        </div>
      ))}

      <div style={{ padding: "56px 24px 0", maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: "-0.02em",
            color: "var(--text-900)",
          }}
        >
          ex · heroda fotoğrafla kurulan iki aday
        </h2>
      </div>

      {EX.map(({ id, name, kind, Section }) => (
        <div key={id}>
          <Baslik id={id} name={name} kind={kind} ex />
          <Section />
          <hr style={AYRAC} />
        </div>
      ))}
    </main>
  );
}
