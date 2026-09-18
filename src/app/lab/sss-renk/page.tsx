import type { Metadata } from "next";

import {
  SssRenkBugun,
  SssRenkR1,
  SssRenkR2,
  SssRenkR3,
} from "@/components/lab/SssRenkAdaylari";
import { accountingFaq } from "@/lib/accountingDubai";

/* /lab/sss-renk — SSS bloğunun renk adayları.

   18.09.2026 · Burak: "sss kısmına layoutu sabit tutarak hoverdaki ve normal
   görünümdeki renklerini denesene daha güzel yapabiliriz diye düşünüyorum.
   bide standardize edelim şuan home ve hizmet sayfalarında farklı. hepsinin bg
   normal beyaz olsun yani hizmet sayfalarındaki gibi."

   İkinci cümle bu turda CANLIDA yapıldı: ana sayfanın SSS bölümü kırık beyazdan
   beyaza döndü, varyant sınıfları (.sss-onpaper · .sss-flat) silindi, iki sayfa
   artık birebir aynı bloğu basıyor. Bu sayfa yalnız RENK kararını bekliyor.

   Adaylar canlı bloğun kendi sınıflarını kullanıyor; lab-sss-renk.css sadece
   renk bildiren satırları eziyor. Yani üç adayda da dolgu, ölçü ve ızgara
   canlıdakiyle birebir — tek değişken renk.

   Veri muhasebe sayfasının ekrandaki sekiz sorusu; uydurma soru yok. */

export const metadata: Metadata = {
  title: "Sık sorulanlar · renk adayları | Ortac Global",
  robots: { index: false, follow: false },
};

export default function SssRenkLab() {
  const items = accountingFaq();
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · sık sorulanlar renk</span>
        <h1>SSS bloğunun renkleri</h1>
        <p>
          Düzen dört bölümde de <b>birebir aynı</b>: adaylar canlı bloğun sınıflarını basıyor,
          CSS yalnızca renk bildiren satırları eziyor. Değişen tek şey kapalı satırın, üstüne
          gelinen satırın ve seçili satırın rengi.
        </p>
        <p>
          Her bölümde üç durum aynı karede duruyor: <b>ilk satır seçili</b>, <b>ikinci satır
          üstüne gelinmiş</b> hâlini kalıcı gösteriyor, kalanlar normal. Fareyle gezince davranış
          canlıdakiyle aynı.
        </p>
        <p>
          <b>Bölüm zemini artık üçünde de beyaz.</b> Ana sayfanın kırık beyaz zemini bu turda
          canlıda kalktı; home ve hizmet sayfaları aynı bloğu basıyor.
        </p>
      </div>

      <SssRenkBugun items={items} />
      <SssRenkR1 items={items} />
      <SssRenkR2 items={items} />
      <SssRenkR3 items={items} />
    </main>
  );
}
