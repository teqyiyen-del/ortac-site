import type { Metadata } from "next";

import { AccountingQuote } from "@/components/services/AccountingSections";
import { AlintiA1, AlintiA2, AlintiA3, AlintiSira } from "@/components/lab/AlintiAdaylari";

/* /lab/muhasebe-alinti — /dubai/muhasebe'deki alıntı + künye bandının zemini.

   18.09.2026 · Burak: "şu alıntı kısmı siyah ya şuan, aslında iyi de çok
   küçük bir alan olduğu için siyah biraz fazla sırıtıyor. ya sıralamada biraz
   aşağı alalım ya da kırık beyaz fln kullanıyoz ya bazı yerlerde öyle
   yapabiliriz. hepsini deneyelim."

   Bandın içeriği değişmiyor; denenen zemin, çerçeve ve yükseklik. Sıra
   önerisi sayfanın sonunda diyagramla. Gerekçeler
   components/lab/AlintiAdaylari.tsx'in başında. */

export const metadata: Metadata = {
  title: "Muhasebe alıntı bandı · zemin denemeleri | Ortac Global",
  robots: { index: false, follow: false },
};

export default function MuhasebeAlintiLab() {
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · muhasebe</span>
        <h1>Alıntı bandının zemini</h1>
        <p>
          İçerik aynı, zemin farklı: kırık beyaz, beyaz + çizgi, gece (daha geniş). En altta bandı
          sayfada aşağı almanın diyagramı.
        </p>
      </div>

      <div className="lgc-aday">
        <b>Taban</b>
        <span>bugün canlıda: gece bant, dar</span>
      </div>
      <AccountingQuote />

      <div className="lgc-aday">
        <b>A1 · Kırık beyaz</b>
        <span>--paper zemin, kutu beyaz ve çerçeveli</span>
      </div>
      <AlintiA1 />

      <div className="lgc-aday">
        <b>A2 · Beyaz + çizgi</b>
        <span>sayfanın beyazı; bandı üst ve alt çizgi ayırıyor</span>
      </div>
      <AlintiA2 />

      <div className="lgc-aday">
        <b>A3 · Gece, geniş</b>
        <span>aynı gece zemin ama dikey boşluk 1,6 katı, alıntı bir punto büyük</span>
      </div>
      <AlintiA3 />

      <div className="lgc-aday">
        <b>Sıra</b>
        <span>zeminden bağımsız: bandı sayfada aşağı almak</span>
      </div>
      <AlintiSira />
    </main>
  );
}
