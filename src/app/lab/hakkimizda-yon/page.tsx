import type { Metadata } from "next";
import { YonLevha, YonManset, YonSahne, YonSira } from "@/components/lab/AboutYon";

/* /lab/hakkimizda-yon — hakkımızda sayfasının GİRİŞİNE dört yeni yön.
   Kapsam: hero'dan vizyon/misyonun sonuna kadar. Canlı sayfaya bağlı değil. */

export const metadata: Metadata = {
  title: "Hakkımızda girişi · dört yön | Ortac Global",
  robots: { index: false, follow: false },
};

const ADAYLAR = [
  {
    id: "Yön HY1",
    ad: "Levha",
    kunye: "Giriş ölçülebilir olanla açılıyor: üç ülke, beş halka, 30 yıl, IFZA, Murat Ortaç.",
    Bolum: YonLevha,
  },
  {
    id: "Yön HY2",
    ad: "Sıra",
    kunye: "Giriş bir eksen: beş halka soldan sağa, dayanaklar ait oldukları durağın altında.",
    Bolum: YonSira,
  },
  {
    id: "Yön HY3",
    ad: "Sahne",
    kunye: "Girişin tamamı tek büyük kart: gece sahnede bir lisans, üç ofis, üç kablo.",
    Bolum: YonSahne,
  },
  {
    id: "Yön HY4",
    ad: "Manşet",
    kunye: "Tek sütun, büyük tipografi, ızgara ve kart yok; dört dayanak numaralı satırlar.",
    Bolum: YonManset,
  },
];

export default function HakkimizdaYonLab() {
  return (
    <main>
      {ADAYLAR.map(({ id, ad, kunye, Bolum }) => (
        <div key={id}>
          <div className="hyn-kunye-lab">
            <span>{id}</span>
            <h2>{ad}</h2>
            <p>{kunye}</p>
          </div>
          <Bolum />
          <hr style={{ margin: 0, border: 0, borderTop: "1px solid var(--border)" }} />
        </div>
      ))}
    </main>
  );
}
