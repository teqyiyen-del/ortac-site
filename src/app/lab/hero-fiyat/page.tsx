import type { Metadata } from "next";

import { HeroFiyatF1, HeroFiyatF2, HeroFiyatF3 } from "@/components/lab/HeroFiyatAdaylari";

/* /lab/hero-fiyat — /dubai/muhasebe hero'sundaki fiyat ögesine üç aday.

   18.09.2026 · Burak: "şu heroda aylık 350 dolar kısmı var ya onu daha sade
   yapmamız lazım ya çok kaba duruyor, bide solundaki butona göre tipide
   farklı ya biraz sırıtıyor."

   Adaylar gerçek bağlamında: gece zemin, aynı başlık ve güven satırları.
   Gerekçeler components/lab/HeroFiyatAdaylari.tsx'in başında. */

export const metadata: Metadata = {
  title: "Hero fiyat ögesi · adaylar | Ortac Global",
  robots: { index: false, follow: false },
};

export default function HeroFiyatLab() {
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · muhasebe hero</span>
        <h1>Hero&apos;da fiyat nasıl duruyor?</h1>
        <p>
          Bugün canlıda çerçeveli üç satırlık bir kutu var ve düğmeden uzun. Üç aday da aynı tutarı
          basıyor; değişen, fiyatın ayrı bir nesne mi yoksa satırın parçası mı olduğu.
        </p>
      </div>

      <HeroFiyatF1 />
      <HeroFiyatF2 />
      <HeroFiyatF3 />
    </main>
  );
}
