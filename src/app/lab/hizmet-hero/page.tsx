import type { Metadata } from "next";
import Link from "next/link";
import { HizmetS1, HizmetS2, HizmetS3 } from "@/components/lab/HizmetHeroAdaylari";

/* LAB · /lab/hizmet-hero (05.10.2026). Hizmet ve ülke sayfalarının girişi için
   üç aday, Dubai şirket kuruluşu üstünde. Künye aynı zamanda tam ekran
   bağlantısı (gerçek menüyle). Gerekçe components/lab/HizmetHeroAdaylari.tsx. */
export const metadata: Metadata = { title: "Hizmet sayfası girişi · adaylar | Ortac Global" };

const ADAY = [
  { k: "s1", ad: "S1 · Akan kartlar", kunye: "ana sayfanın dili: aşamalar alttan girip yukarı akıyor", C: HizmetS1 },
  { k: "s2", ad: "S2 · Tek kart", kunye: "tek aşama kartı ve numaralı çubuklar; çubuğa basılabiliyor", C: HizmetS2 },
  { k: "s3", ad: "S3 · Kenara taşan", kunye: "fotoğraf sağ kenara kadar; beş aşama alt alta, biri açık", C: HizmetS3 },
];

export default function LabHizmetHero() {
  return (
    <main>
      {ADAY.map(({ k, ad, kunye, C }) => (
        <div key={k}>
          <div className="lhz-lab-ad">
            <div className="container-o">
              <Link href={`/lab/hizmet-hero/${k}`}>
                {ad}
                <span>{kunye}</span>
              </Link>
            </div>
          </div>
          <C />
        </div>
      ))}
    </main>
  );
}
