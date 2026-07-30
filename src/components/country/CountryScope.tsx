import { Check, Minus, Package, PackageX } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";

/* Two tick lists side by side read as a form. Here the included lines are drawn
   as what they actually are — separate items collected into one price — while
   the excluded ones sit outside that package on their own surface, so the
   boundary is a picture instead of a column heading. */
export default function CountryScope({
  included,
  excluded,
}: {
  included: string[];
  excluded: string[];
}) {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Neyi dahil ediyoruz, neyi etmiyoruz."
            accent="neyi etmiyoruz."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Hariç kalemler de baştan yazılı olsun.</p>
          </FadeUp>
        </div>

        <div className="gv2-scope">
          <FadeUp delay={0.18} className="gv2-scope-cell">
            <div className="gv2-pkg">
              <div className="gv2-pkg-h">
                <span className="gv2-pkg-ic" aria-hidden="true">
                  <Package size={19} strokeWidth={1.9} />
                </span>
                <span className="gv2-pkg-t">Kuruluş fiyatına dahil</span>
                <span className="gv2-pkg-n">{included.length} kalem</span>
              </div>

              <div className="gv2-pkg-body">
                <ul className="gv2-pkg-rows">
                  {included.map((x) => (
                    <li key={x} className="gv2-pkg-row">
                      <i aria-hidden="true">
                        <Check size={12} strokeWidth={3.4} />
                      </i>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <div className="gv2-pkg-join" aria-hidden="true">
                  <span className="gv2-pkg-node">
                    <b>kuruluş</b>
                    <span>fiyatı</span>
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.26} className="gv2-scope-cell">
            <div className="gv2-exc">
              <div className="gv2-exc-h">
                <span className="gv2-exc-ic" aria-hidden="true">
                  <PackageX size={19} strokeWidth={1.9} />
                </span>
                <span className="gv2-exc-t">Dahil değil</span>
                <span className="gv2-exc-n">{excluded.length} kalem</span>
              </div>

              <ul className="gv2-exc-rows">
                {excluded.map((x) => (
                  <li key={x}>
                    <i aria-hidden="true">
                      <Minus size={12} strokeWidth={3.4} />
                    </i>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <p className="gv2-exc-f">Bu kalemler kuruluş fiyatının dışında kalır.</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
