import type { Metadata } from "next";
import DubaiHero, { type DubaiKart } from "@/components/country/DubaiHero";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* LAB · /lab/dubai-hero-kart (06.10.2026). Dubai girişindeki fotoğrafın
   üstünde duran aşama kartı için üç aday ve canlıdaki. Gerekçe ve adayların
   tarifi components/country/DubaiHero.tsx'te. Yalnız ad ve tek satır. */
export const metadata: Metadata = { title: "Dubai girişi · aşama kartı adayları | Ortac Global" };

const ADAY: { k: DubaiKart; ad: string; kunye: string }[] = [
  { k: "k1", ad: "K1 · Sahne", kunye: "kartın tamamı çizim; ad küçük bir satır, altında noktalar" },
  { k: "k2", ad: "K2 · Şerit", kunye: "beş çizim yan yana; sıradaki öne çıkıyor, hareket yalnız onda" },
  { k: "k3", ad: "K3 · Köşe", kunye: "sol altta küçük hap; fotoğrafın neredeyse tamamı açık" },
  { k: "s6", ad: "Canlıdaki", kunye: "çizim, büyük ad, rozet ve numaralı çubuk" },
];

export default function LabDubaiHeroKart() {
  return (
    <main>
      {ADAY.map(({ k, ad, kunye }) => (
        <div key={k}>
          <div className="lhz-lab-ad">
            <div className="container-o">
              <a href="#">
                {ad}
                <span>{kunye}</span>
              </a>
            </div>
          </div>
          <DubaiHero lead={COUNTRY_CONTENT.dubai.intro} kart={k} />
        </div>
      ))}
    </main>
  );
}
