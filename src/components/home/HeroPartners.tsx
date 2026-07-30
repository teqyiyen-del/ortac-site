import {
  BadgeCheck,
  CreditCard,
  Landmark,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { PARTNERS } from "@/lib/brand";

/* §1 — the strip under the globe. One continuous ticker, no group headings:
   splitting it into "resmî ortaklıklar" and "kullandığımız altyapı" put two
   labels and a divider into a band that is only there to be glanced at.
   Nothing here claims a partnership either, because the strip carries no
   label at all now; the roles still live on the country and service pages. */

const ROLE_ICON: Record<string, LucideIcon> = {
  IFZA: BadgeCheck,
  "Wio Business": Landmark,
  "Mashreq NeoBiz": Landmark,
  PayPal: CreditCard,
  Wam: CreditCard,
  Stripe: CreditCard,
  TaxDome: LayoutDashboard,
};

/* one set has to be wider than the widest viewport or a gap rides through the
   loop; seven names at roughly 150px need three passes to clear 3000px */
const SET = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function HeroPartners() {
  return (
    <div className="hp">
      <div className="hp-vp">
        {/* the track is the set rendered twice, so translating it by -50%
            lands on an identical frame and the wrap is invisible */}
        <div className="hp-track" aria-hidden="true">
          {[0, 1].map((half) => (
            <ul key={half} className="hp-set">
              {SET.map((p, i) => {
                const Icon = ROLE_ICON[p.name] ?? BadgeCheck;
                return (
                  <li key={`${half}-${i}-${p.name}`} className="hp-item">
                    <Icon size={16} strokeWidth={1.9} />
                    {p.name}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
      <p className="sr-only">
        Çalıştığımız kurumlar ve kullandığımız altyapı:{" "}
        {PARTNERS.map((p) => p.name).join(", ")}.
      </p>
    </div>
  );
}
