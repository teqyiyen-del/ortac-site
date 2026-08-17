import CtaGovde from "./CtaGovde";

/* A · KUTU — "CTA sayfanın son kartı".
   Ayrışma ekseninin en uç ucu: nesne olarak ayrışır. Kenar + köşe + dört
   yandan beyaz. Bu turdan önce canlıda olan tasarımın çerçevesi, sadeleşmiş
   gövdeyle.

   `container-o` panelin DIŞINDA — kutuyu kuran tek yapısal fark bu. Tam
   genişlik tasarımında aynı kap panelin içine alınmıştı. */
export default function CtaKutu() {
  return (
    <div className="ctal-a">
      <div className="container-o">
        <div className="ctal-a-kart">
          <div className="ctal-bg" aria-hidden="true">
            <span className="ctal-glow" />
            <span className="ctal-grid" />
            <span className="ctal-seam" />
          </div>
          <CtaGovde />
        </div>
      </div>
    </div>
  );
}
