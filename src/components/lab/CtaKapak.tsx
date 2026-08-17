import { Ft2Directory } from "@/components/Footer";
import CtaGovde from "./CtaGovde";

/* C · KAPAK — "CTA ayrı bir bölüm değil, footer'ın başı".
   Ayrışma ekseninin öbür ucu: yalnız ÜST kenar var, alt kenar yok. Gece yüzey
   CTA'da başlıyor, site dizinini de içine alıyor ve sayfayla birlikte bitiyor.

   Bu yüzden aday footer'ı KENDİ İÇİNDE basıyor (öteki iki aday sayfada
   footer'ın üstüne konuyor): kapanış yüzeyi ile dizin aynı nesne olmadan bu
   fikrin gösterilecek bir hâli yok.

   Dizinin gece rengi tamamen CSS'te (.ctal-c ...), Footer.tsx'e tek satır
   dokunulmadı — bu bir aday, canlı dosya değil. Logo zaten currentColor
   taşıyor, .ft2-brand beyaza dönünce kelime işareti de beyaza dönüyor. */
export default function CtaKapak() {
  return (
    <footer className="ft2 ctal-c">
      <div className="ctal-c-cta">
        <div className="ctal-bg" aria-hidden="true">
          <span className="ctal-glow" />
          <span className="ctal-grid" />
          <span className="ctal-seam" />
        </div>

        <div className="container-o">
          <CtaGovde />
        </div>
      </div>

      <Ft2Directory />
    </footer>
  );
}
