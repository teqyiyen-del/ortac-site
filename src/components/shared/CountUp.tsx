"use client";

import { useEffect, useRef, useState } from "react";

const fmt = new Intl.NumberFormat("de-DE");
/* --ease-inout ≈ cubic-in-out for JS interpolation */
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

type Props = {
  value: number;
  /** false until the section is in view; the first play runs 0 → value (650ms quint) */
  play?: boolean;
  fontSize?: number;
  color?: string;
};

/** Numeric swap — NOT a from-zero scroll counter. Interpolates previous → next
 *  over 450ms ease-inout on every change; "$" + de-DE format (spec contract). */
export default function CountUp({
  value,
  play = true,
  fontSize = 40,
  color = "var(--text-900)",
}: Props) {
  const [display, setDisplay] = useState(0);
  const current = useRef(0);
  const booted = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    if (!play) return;
    const from = current.current;
    const to = value;
    if (from === to && booted.current) return;
    const firstRun = !booted.current;
    booted.current = true;
    const dur = firstRun ? 650 : 450;
    const ease = firstRun ? easeOutQuint : easeInOut;
    const t0 = performance.now();
    cancelAnimationFrame(raf.current);
    const step = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const v = from + (to - from) * ease(p);
      current.current = v;
      setDisplay(v);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [value, play]);

  return (
    <span
      className="data"
      style={{ fontSize, lineHeight: 1, color, fontVariantNumeric: "tabular-nums" }}
    >
      ${fmt.format(Math.round(display))}
    </span>
  );
}
