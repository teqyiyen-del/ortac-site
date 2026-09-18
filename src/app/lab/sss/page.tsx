import type { Metadata } from "next";

import { SssS1, SssS2, SssS3 } from "@/components/lab/SssAdaylari";
import { accountingFaq } from "@/lib/accountingDubai";

/* /lab/sss — sık sorulanlar bloğunun tasarım adayları.

   18.09.2026 · Burak: "bizim sitedeki ss kısımlarının tipini daha iyi nasıl
   yaparız ya o konuda biraz alternatifler sunsana bana. solda başlıklar sağda
   cevap olması işini beğeniyorum btw onu koru onda sorun yok ama tasarım daha
   iyi olabilir bi şekilde şuan tam ikna etmedi."

   Düzen korunuyor (solda soru, sağda cevap); değişen görsel dil. Veri
   muhasebe sayfasının ekrandaki sekiz sorusu — uydurma soru yok. Canlı blok
   (components/CountryFaq.tsx) bu turda değişmedi. */

export const metadata: Metadata = {
  title: "Sık sorulanlar · tasarım adayları | Ortac Global",
  robots: { index: false, follow: false },
};

export default function SssLab() {
  const items = accountingFaq();
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · sık sorulanlar</span>
        <h1>SSS bloğunun tasarımı</h1>
        <p>
          Üç adayda da düzen aynı: solda soru listesi, sağda seçili cevabın paneli. Değişen çerçeve,
          zemin ve vurgu. Sorular muhasebe sayfasının kendi listesinden.
        </p>
        <p>
          <b>Karar:</b> üçü de alınmadı. &quot;Ana sayfadaki SSS mantık olarak daha iyi&quot;
          denildi; canlıda düzeltilen iki şey oldu: soru ile cevap arasındaki boşluk (0 px idi) ve
          künye satırına eklenen soru sayacı. Bu sayfa kayıt olarak duruyor.
        </p>
      </div>

      <SssS1 items={items} />
      <SssS2 items={items} />
      <SssS3 items={items} />
    </main>
  );
}
