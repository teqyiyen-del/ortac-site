import type { Metadata } from "next";
import DubaiHero, { type DubaiKart } from "@/components/country/DubaiHero";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* LAB · /lab/dubai-hero-kart (06.10.2026). Dubai girişindeki fotoğrafın
   üstü için ikinci tur: aşama anlatmayan üç aday ve canlıdaki. Gerekçe ve adayların
   tarifi components/country/DubaiHero.tsx'te. Yalnız ad ve tek satır. */
export const metadata: Metadata = { title: "Dubai girişi · aşama kartı adayları | Ortac Global" };

const ADAY: { k: DubaiKart; ad: string; kunye: string }[] = [
  { k: "f1", ad: "F1 · Rozetler", kunye: "aşama yok; fotoğrafın üstünde üç küçük cam rozet, üç olgu" },
  { k: "f2", ad: "F2 · Lisans", kunye: "sol altta hafif eğik bir ticaret lisansı kartı; süs" },
  { k: "f3", ad: "F3 · Sade", kunye: "yalnız fotoğraf ve küçük bir yer etiketi" },
  { k: "s6", ad: "Canlıdaki", kunye: "aşama kartı: çizim, ad, rozet ve numaralı çubuk" },
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
