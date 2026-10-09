import type { Metadata } from "next";
import Link from "next/link";
import { HizmetS1, HizmetS2, HizmetS3, HizmetS6, HizmetS7 } from "@/components/lab/HizmetHeroAdaylari";

/* LAB · /lab/hizmet-hero (05.10.2026). Hizmet ve ülke sayfalarının girişi için
   üç aday, Dubai şirket kuruluşu üstünde. Künye aynı zamanda tam ekran
   bağlantısı (gerçek menüyle). Gerekçe components/lab/HizmetHeroAdaylari.tsx. */
export const metadata: Metadata = { title: "Hizmet sayfası girişi · adaylar | Ortac Global" };

const ADAY = [
  { k: "s6", ad: "S6 · S2 + küçük çizim", kunye: "S2 boyunda kart; solda aşamanın çizimi küçük pencerede", C: HizmetS6 },
  { k: "s7", ad: "S7 · Dar kart", kunye: "aynı kart sol altta, dar; fotoğrafın sağı da açık", C: HizmetS7 },
  { k: "s1", ad: "S1 · Akan kartlar", kunye: "ana sayfanın dili: aşamalar alttan girip yukarı akıyor", C: HizmetS1 },
  { k: "s2", ad: "S2 · Tek kart", kunye: "tek aşama kartı ve numaralı çubuklar; çubuğa basılabiliyor", C: HizmetS2 },
  { k: "s3", ad: "S3 · Kenara taşan", kunye: "fotoğraf sağ kenara kadar; beş aşama alt alta, biri açık", C: HizmetS3 },
];

export default function LabHizmetHero() {
  return (
    <main id="icerik">
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
