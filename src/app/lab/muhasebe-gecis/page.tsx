import type { Metadata } from "next";

import { AccountingSwitch } from "@/components/services/AccountingSections";
import { GecisG1, GecisG2, GecisG3 } from "@/components/lab/GecisAdaylari";

/* /lab/muhasebe-gecis — /dubai/muhasebe · #gecis bölümüne üç aday.

   17.09.2026 · Burak: "muhasebeni mi değişmek istiyorsun kısmı çok fazla
   texte boğulmuş çok hoşuma gitmedi buraya labda alternatif sun."
   Adayların gerekçesi components/lab/GecisAdaylari.tsx'in başında. En üstte
   bugün canlıda olan hâl (taban) kıyas için aynı bileşenden basılıyor. */

export const metadata: Metadata = {
  title: "Muhasebecinizi değiştirmek · adaylar | Ortac Global",
  robots: { index: false, follow: false },
};

export default function MuhasebeGecisLab() {
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · muhasebe</span>
        <h1>Muhasebecinizi değiştirmek mi istiyorsunuz?</h1>
        <p>
          Üç aday, üçünde de adım başına yalnız başlık; açıklama cümlesi yok. Metin canlı sayfanın
          verisinden, değişen yalnız görsel.
        </p>
      </div>

      <div className="lgc-aday">
        <b>Taban</b>
        <span>bugün canlıda: zaman çizgisi + gri kart</span>
      </div>
      <AccountingSwitch />

      <div className="lgc-aday">
        <b>G1 · Devir hattı</b>
        <span>önceki muhasebeci → dört durak → Ortac, belge hat boyunca akıyor</span>
      </div>
      <GecisG1 />

      <div className="lgc-aday">
        <b>G2 · Dört ikon</b>
        <span>solda başlık ve çıkış, sağda dört ikon karosu</span>
      </div>
      <GecisG2 />

      <div className="lgc-aday">
        <b>G3 · Gece devir dosyası</b>
        <span>gece bant, dört adımın onayı sırayla doluyor</span>
      </div>
      <GecisG3 />
    </main>
  );
}
