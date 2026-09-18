import type { Metadata } from "next";

import AccountingNeeds from "@/components/services/AccountingNeeds";
import { IhtiyacI1, IhtiyacI2, IhtiyacI3 } from "@/components/lab/IhtiyacAdaylari";

/* /lab/muhasebe-ihtiyac — "Bana hangi hizmetler gerekiyor?" bölümünün SOL
   panelinde üç ayrı yaklaşım.

   18.09.2026 · Burak: "sağdan iconları kaldırmışsın aslında bana kalabalık
   gelen biraz daha sol taraftı kral, oraya daha farklı yaklaşım gerekiyor
   sanırım. uygunluk testindeki tasarım buraya uymadı galiba. bunun için labda
   3 farklı şey denesene bi bakalım."

   En üstte canlıdaki hâl (taban). Adayların gerekçesi
   components/lab/IhtiyacAdaylari.tsx'in başında; kurallar ve sonuçlar üçünde
   de lib/muhasebeIhtiyac.ts'ten. */

export const metadata: Metadata = {
  title: "Hangi hizmetler gerekiyor · sol panel adayları | Ortac Global",
  robots: { index: false, follow: false },
};

export default function MuhasebeIhtiyacLab() {
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · muhasebe</span>
        <h1>Hangi hizmetler gerekiyor · soru tarafı</h1>
        <p>
          Sağ panel üçünde de aynı. Denenen tek şey sol taraf: tek soru sırayla, cümle içinde seçim,
          ikonsuz ayar satırları.
        </p>
      </div>

      <div className="lgc-aday">
        <b>Taban</b>
        <span>bugün canlıda: dört soru, ikon diskli seçenek kutuları</span>
      </div>
      <AccountingNeeds />

      <div className="lgc-aday">
        <b>I1 · Tek soru</b>
        <span>ekranda tek soru, dört büyük seçenek; seçince sıradakine geçiyor</span>
      </div>
      <IhtiyacI1 />

      <div className="lgc-aday">
        <b>I2 · Cümle</b>
        <span>form değil cümle; boşluklar açılır menü</span>
      </div>
      <IhtiyacI2 />

      <div className="lgc-aday">
        <b>I3 · Ayar satırları</b>
        <span>dört satır, sağda segment düğme; ikon yok</span>
      </div>
      <IhtiyacI3 />
    </main>
  );
}
