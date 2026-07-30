"use client";

import { useEffect, useRef, useState } from "react";

/* The software card's window: four lines of code, typed.
 *
 * This is the one piece of the row that has to be a client component, and the
 * reason is timing rather than interaction. A CSS animation starts when the
 * page loads, and this card is most of a screen below the fold, so by the time
 * anyone scrolls to it the typing has long finished and the card looks like
 * four lines of static text. It waits for the section to actually be on screen.
 *
 * The typing itself is still CSS: each line wipes open with a steps() clip, one
 * step per character, so it advances in discrete jumps the way a cursor does
 * rather than sliding. Duration is per character, so a short line is typed
 * quickly and a long one takes longer - a fixed duration per line is the thing
 * that reads as four bars filling instead of as someone writing.
 */

type CTok = { t: string; c?: "k" | "s" };
type CLine = { in: 0 | 1; tk: CTok[] };

/* Deliberately generic and deliberately short. It says what the card's sentence
   says - a payment arrives, the invoice and the subscription follow - in the
   only language that card's reader speaks. No product name, no endpoint, and no
   value that could be mistaken for a live credential. */
const CODE_LINES: CLine[] = [
  { in: 0, tk: [{ t: "on", c: "k" }, { t: "(" }, { t: '"payment"', c: "s" }, { t: ", () => {" }] },
  { in: 1, tk: [{ t: "createInvoice", c: "k" }, { t: "();" }] },
  { in: 1, tk: [{ t: "openSubscription", c: "k" }, { t: "();" }] },
  { in: 0, tk: [{ t: "});" }] },
];

/* Each line waits for the one above it to finish, so the four read as one pass
   rather than four things happening at once. */
const TIMED = (() => {
  let at = 0.25;
  return CODE_LINES.map((line) => {
    const chars = line.tk.reduce((n, t) => n + t.t.length, 0);
    const dur = chars * 0.05;
    const row = { line, delay: at, dur, steps: chars };
    at += dur + 0.14;
    return row;
  });
})();

export default function CodeSim() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* Reduced motion is handled in CSS rather than here: the reduce block shows
       every line fully typed regardless of this flag, which keeps the only
       setState in this component inside the observer callback. */
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="pf2-sim pf2-code" aria-hidden="true">
      <div className="pf2-simhead">
        <span className="pf2-dots">
          <i />
          <i />
          <i />
        </span>
        <b>odeme.ts</b>
      </div>
      <div className="pf2-codebox" data-on={on || undefined}>
        {TIMED.map(({ line, delay, dur, steps }, i) => (
          <span className="pf2-crow" key={i}>
            <i className="pf2-cnum">{i + 1}</i>
            <code
              className="pf2-ccode"
              style={
                {
                  "--d": `${delay}s`,
                  "--t": `${dur}s`,
                  "--n": `${steps}`,
                  "--in": `${line.in}`,
                } as React.CSSProperties
              }
            >
              {line.tk.map((tk, j) => (
                <i className="pf2-ctk" data-c={tk.c} key={j}>
                  {tk.t}
                </i>
              ))}
            </code>
          </span>
        ))}
      </div>
    </div>
  );
}
