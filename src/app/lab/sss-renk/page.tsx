import type { Metadata } from "next";

import {
  SssRenkSecildi,
  SssRenkOnceki,
  SssRenkM1,
  SssRenkM2,
  SssRenkM3,
  SssRenkM4,
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

   İKİNCİ GEÇİŞ · Burak iskeleti seçti: "taban beyaz, hover kırık beyaz, seçili
   siyah düşünüyorum. işin içinde mavi de olması lazım ama nerde bilmiyorum …
   bide cevap kısmına da mı renk atsak napsak? … cevap kısmıyla bi uyumsuz
   hissettiriyor." İlk geçişin üç adayı (R1 · R2 · R3) bu iskelette birleştiği
   için sayfadan kalktı; kaydı git'te ve docs/durum.md'de. Yerlerine maviyi ve
   cevap panelini soran dört aday geldi.

   Adaylar canlı bloğun kendi sınıflarını kullanıyor; lab-sss-renk.css sadece
   renk bildiren satırları eziyor. Yani dört adayda da dolgu, ölçü ve ızgara
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
          <b>Karar verildi ve canlıda:</b> M1&apos;in mavi hover&apos;ı ile M2&apos;nin siyah
          cevabı birleşti. İlk bölüm canlı kuralların kendisini gösteriyor — orada hiçbir renk
          ezilmiyor, canlıda bir şey değişirse burası da değişir. Altındaki dört aday ve en alttaki
          tur öncesi hâl kayıt olarak duruyor.
        </p>
        <p>
          <b>İskelet:</b> taban beyaz, üstüne gelince kırık beyaz, seçili satır
          siyah. Bu turda kalan iki soru şu: <b>mavi nerede duracak</b> ve{" "}
          <b>cevap paneli ne olacak</b>. Her adayın başında &quot;Mavi nerede&quot; künyesi var.
        </p>
        <p>
          Düzen beş bölümde de <b>birebir aynı</b>: adaylar canlı bloğun sınıflarını basıyor,
          CSS yalnızca renk bildiren satırları eziyor.
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

      <SssRenkSecildi items={items} />
      <SssRenkM1 items={items} />
      <SssRenkM2 items={items} />
      <SssRenkM3 items={items} />
      <SssRenkM4 items={items} />
      <SssRenkOnceki items={items} />
    </main>
  );
}
