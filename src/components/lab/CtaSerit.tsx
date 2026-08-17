import CtaGovde from "./CtaGovde";

/* B · ŞERİT + KART — "şerit sayfayı kapatır, kart konuşur".
   Ara cevap. Gece yüzey kenardan kenara (sayfayı kapatma işi), mesaj ise
   sınırı belli bir kartın içinde (ayrışma işi). Yani ayrışan şey blok değil,
   blokun içindeki nesne.

   Izgara ŞERİTTE, glow KARTTA. Bilerek: yüzey hareket eder, mesaj aydınlanır.
   İkisi de aynı katmanda olsaydı kartın kenarı kaybolurdu. */
export default function CtaSerit() {
  return (
    <div className="ctal-b">
      <div className="ctal-bg" aria-hidden="true">
        <span className="ctal-grid" />
        <span className="ctal-seam" />
      </div>

      <div className="container-o">
        <div className="ctal-b-kart">
          <span className="ctal-glow" aria-hidden="true" />
          <CtaGovde />
        </div>
      </div>
    </div>
  );
}
