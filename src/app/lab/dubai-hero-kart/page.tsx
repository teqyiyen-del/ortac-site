import type { Metadata } from "next";
import DubaiHero, { type DubaiKart } from "@/components/country/DubaiHero";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* LAB · /lab/dubai-hero-kart (06.10.2026). Dubai girişindeki fotoğrafın
   üstü için üçüncü tur: F'lerden türeyen iki aday ve canlıdaki. Gerekçe ve adayların
   tarifi components/country/DubaiHero.tsx'te. Yalnız ad ve tek satır. */
export const metadata: Metadata = { title: "Dubai girişi · aşama kartı adayları | Ortac Global" };

const ADAY: { k: DubaiKart; ad: string; kunye: string }[] = [
  { k: "g3", ad: "G3 · Karma", kunye: "solda ticaret lisansı kartı, sağında üç rozet" },
  { k: "g1", ad: "G1 · Belgeler", kunye: "düz duran belge kartı; sırayla ticaret lisansı, Emirates ID, kurumsal hesap" },
  { k: "g2", ad: "G2 · Rozetler, derli", kunye: "üç olgu sol altta hizalı tek sütunda" },
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
