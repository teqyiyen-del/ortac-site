import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";

/* §13 — thin band, opens the channel without competing with the page. */
export default function PartnerBand() {
  return (
    <section className="sec-pad pbnd-sec">
      <div className="container-o">
        <FadeUp>
          <div className="pbnd">
            <span className="pbnd-ic" aria-hidden="true">
              <Handshake size={20} strokeWidth={1.9} />
            </span>
            <div>
              <h2 className="pbnd-t">Mali müşavir veya danışman mısınız?</h2>
              <p className="pbnd-l">
                Müşterilerinizin yurt dışı kuruluş, muhasebe ve banka tarafını birlikte
                yürütüyoruz. Süreç sizde görünür kalır.
              </p>
            </div>
            <Link href="/is-ortakligi" className="btn btn-line">
              İş ortaklığı
              <ArrowRight size={15} strokeWidth={2.1} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
