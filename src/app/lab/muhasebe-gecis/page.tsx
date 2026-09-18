import type { Metadata } from "next";

import { AccountingSwitch } from "@/components/services/AccountingSections";
import { GecisG1, GecisG3 } from "@/components/lab/GecisAdaylari";

/* /lab/muhasebe-gecis — /dubai/muhasebe · #gecis bölümüne üç aday.

   17.09.2026 · Burak: "muhasebeni mi değişmek istiyorsun kısmı çok fazla
   texte boğulmuş çok hoşuma gitmedi buraya labda alternatif sun."
   18.09.2026 · ikinci tur: "g1 in aşama aşama gösterme mantığını sevdim. g3
   ün de tasarımı çok iyi olmuş onu g1 e uyarlayabilir miyiz? bide gerekiyorsa
   siyah üstünede alabiliriz … g2 yi silebilirsin." G1 artık G3'ün diliyle,
   G2 onun tam gece hâli, eski "dört ikon" adayı silindi.
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
          verisinden, değişen yalnız görsel. &quot;Devir için gerekenler&quot; üç adayda üç ayrı biçimde:
          dosya yaprağı, onay kutulu liste, çip.
        </p>
      </div>

      <div className="lgc-aday">
        <b>Taban · G2</b>
        <span>18.09&apos;da canlıya alındı: tam gece bant, numaralı duraklar, üstünde akan belge</span>
      </div>
      <AccountingSwitch />

      <div className="lgc-aday">
        <b>G1 · Hat, gece kart</b>
        <span>aynı hat beyaz bölümün içinde gece kart olarak; belgenin yüksekliği düzeltildi</span>
      </div>
      <GecisG1 />

      <div className="lgc-aday">
        <b>G3 · Devir dosyası</b>
        <span>17.09&apos;un adayı, dokunulmadı; kıyas için duruyor</span>
      </div>
      <GecisG3 />
    </main>
  );
}
