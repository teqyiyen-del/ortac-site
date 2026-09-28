import type { Metadata } from "next";
import { HeroE1, HeroE2, HeroE3 } from "@/components/lab/KurumsalHeroAdaylari";
import { Aday } from "../aday";

/* LAB · /lab/hero-kurumsal · ikinci tur (28.09.2026). İlk tur (K1 · K2 · K3)
   reddedildi: "fena kötü … %100 yükseklik … daha enerjik". Gerekçe
   components/lab/KurumsalHeroAdaylari.tsx'in başında. */
export const metadata: Metadata = { title: "Ana sayfa girişi · adaylar | Ortac Global" };

export default function LabHeroKurumsal() {
  return (
    <main>
      <Aday bolum ad="E1 · Üç şehir" kunye="üç ofisin fotoğrafı sırayla açılıyor · tam ekran: /lab/hero-kurumsal/e1">
        <HeroE1 />
      </Aday>
      <Aday bolum ad="E2 · Kinetik" kunye="son kelime dönüyor, sağda fotoğraflar akıyor · tam ekran: /e2">
        <HeroE2 />
      </Aday>
      <Aday bolum ad="E3 · Canlı ofis" kunye="ekip fotoğrafı, sağda işin kendisi akıyor · tam ekran: /e3">
        <HeroE3 />
      </Aday>
    </main>
  );
}
