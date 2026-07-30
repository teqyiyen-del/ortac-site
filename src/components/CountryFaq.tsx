"use client";

import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight, CircleHelp } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import { gtm } from "@/lib/gtm";
import type { Faq } from "@/lib/countryContent";

/* Same block as §14 on the home page: the accordion stack is gone. Every
   question stays visible on the left and the selected answer opens as one panel
   on the right, so nothing is hidden behind a click.

   Country data carries only q and a, with no topic grouping, so the list here is
   flat: the panel says which question of how many is open instead of inventing a
   topic that the data does not have. Props stay { items } on purpose — the
   country page renders this unchanged.

   The section's single exit lives here too, so the block is a route rather than
   a dead end for whoever is still stuck. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* the panel is remounted when the selection changes, so the incoming answer
   plays its own reveal — no height is ever animated */
function Answer({
  item,
  index,
  total,
  panelId,
  labelId,
}: {
  item: Faq;
  index: number;
  total: number;
  panelId: string;
  labelId: string;
}) {
  return (
    <motion.div
      id={panelId}
      role="region"
      aria-labelledby={labelId}
      className="sss-panel"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: EASE }}
    >
      <div className="sss-panel-head">
        <span className="sss-panel-topic">
          <CircleHelp size={15} strokeWidth={2.1} aria-hidden="true" />
          Soru {index + 1} / {total}
        </span>
        <h3 className="sss-panel-q">{item.q}</h3>
      </div>
      <div className="sss-rule" aria-hidden="true" />
      <p className="sss-a">{item.a}</p>
    </motion.div>
  );
}

export default function CountryFaq({ items }: { items: Faq[] }) {
  const [active, setActive] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const total = items.length;

  /* Tab already walks the list; the arrows move focus without changing the open
     answer, which is how a disclosure list is expected to behave */
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const from = btns.current.findIndex((el) => el === document.activeElement);
    if (from < 0) return;

    let next: number;
    if (e.key === "ArrowDown") next = (from + 1) % total;
    else if (e.key === "ArrowUp") next = (from - 1 + total) % total;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = total - 1;
    else return;

    e.preventDefault();
    btns.current[next]?.focus();
  }

  if (total === 0) return null;

  return (
    <>
      <FadeUp delay={0.2}>
        {/* the trailing 1fr row swallows the sticky panel's surplus height, so a
            short country list is never stretched apart to match the panel */}
        <div
          className="sss sss-flat"
          style={{ gridTemplateRows: `repeat(${total}, auto) 1fr` }}
          onKeyDown={onKeyDown}
        >
          {items.map((f, i) => (
            <Fragment key={f.q}>
              <button
                type="button"
                id={`cfq-q-${i}`}
                ref={(el) => {
                  btns.current[i] = el;
                }}
                className="sss-q"
                data-on={active === i || undefined}
                aria-expanded={active === i}
                aria-controls={active === i ? `cfq-a-${i}` : undefined}
                onClick={() => setActive(i)}
              >
                <span>{f.q}</span>
                <ChevronRight
                  className="sss-chev"
                  size={17}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </button>
              {active === i && (
                <Answer
                  item={f}
                  index={i}
                  total={total}
                  panelId={`cfq-a-${i}`}
                  labelId={`cfq-q-${i}`}
                />
              )}
            </Fragment>
          ))}
        </div>
      </FadeUp>

      {/* one exit for the whole block */}
      <FadeUp delay={0.24}>
        <div className="sss-cta">
          <div>
            <p className="sss-cta-t">Sorunuz listede yok mu?</p>
            <p className="sss-cta-l">
              Kendi durumunuzu ücretsiz danışmanlıkta sorun. Mali müşavir ve
              kuruluş danışmanı aynı görüşmede cevap versin.
            </p>
          </div>
          <Link
            href="/basla"
            className="btn btn-line"
            onClick={() => gtm("cta_meeting_click", { placement: "sss_ulke" })}
          >
            Ücretsiz danışmanlık
            <ArrowRight size={15} strokeWidth={2.1} />
          </Link>
        </div>
      </FadeUp>
    </>
  );
}
