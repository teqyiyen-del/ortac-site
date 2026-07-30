"use client";

import { useState } from "react";
import { ArrowRight, Check, TriangleAlert } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import DubaiZoneMap from "@/components/DubaiZoneMap";
import type { CountryContent } from "@/lib/countryContent";

/* Brief §8 — Dubai forces a structural choice before anything can be priced,
   and getting it wrong means a second incorporation. Two flat cards made that
   a reading exercise; here the choice drives a map, so the visitor sees what
   they are picking instead of comparing two paragraphs. */
export default function CountryStructures({
  data,
}: {
  data: NonNullable<CountryContent["structures"]>;
}) {
  const [i, setI] = useState(0);
  const active = i === 0 ? "serbest" : "mainland";

  return (
    <section id="yapi" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text={data.title}
            accent="serbest bölge mi, mainland mi?"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{data.lead}</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.22}>
          <div className="str">
            <DubaiZoneMap active={active} />

            <div className="str-opts" role="tablist" aria-label="Şirket yapısı">
              {data.options.map((o, idx) => {
                const on = i === idx;
                return (
                  <button
                    key={o.name}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    className="str-opt"
                    data-on={on || undefined}
                    onClick={() => setI(idx)}
                  >
                    <span className="str-n">{o.name}</span>
                    <span className="str-l">{o.line}</span>

                    {on && (
                      <>
                        <span className="str-h">Bunu yapıyorsanız</span>
                        <span className="str-fit">
                          {o.fit.map((f) => (
                            <span key={f}>
                              <i aria-hidden="true">
                                <Check size={12} strokeWidth={3.4} />
                              </i>
                              {f}
                            </span>
                          ))}
                        </span>
                        <span className="str-w">
                          <TriangleAlert size={14} strokeWidth={2.3} aria-hidden="true" />
                          {o.watch}
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.36}>
          <p className="str-rule">
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            {data.rule}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
