import { TriangleAlert } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import type { CountryContent } from "@/lib/countryContent";

/* Brief §2 — every country carries a warning that has to appear on its page.
   It sits high, on black, before anything is priced: if one of these lines is a
   dealbreaker the visitor should find out here, not after the offer. */
export default function CountryClarify({
  data,
}: {
  data: CountryContent["clarify"];
}) {
  return (
    <section className="sec-pad sec-night">
      <div className="container-o">
        <div className="sec-head sec-head-dark">
          <SplitWords
            as="h2"
            text={data.title}
            accent={data.title.split(" ").slice(-2).join(" ")}
            className="h2"
            style={{ color: "#ffffff" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead sec-lead-dark">{data.lead}</p>
          </FadeUp>
        </div>

        <ul className="clr">
          {data.items.map((x, i) => (
            <FadeUp key={x.title} delay={0.2 + i * 0.08}>
              <li className="clr-item">
                <span className="clr-ic" aria-hidden="true">
                  <TriangleAlert size={16} strokeWidth={2.2} />
                </span>
                <h3>{x.title}</h3>
                <p>{x.line}</p>
              </li>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  );
}
