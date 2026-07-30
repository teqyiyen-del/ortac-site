"use client";

import { useEffect, useState } from "react";

/** Text swap without layout shift: old fades out 150ms, then new fades in 150ms.
 *  min-height reserved (spec, calculator meta rows). */
export default function CrossFade({
  text,
  style,
}: {
  text: string;
  style?: React.CSSProperties;
}) {
  const [shown, setShown] = useState(text);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (text === shown) return;
    // timed two-phase swap: fade current out, swap, fade new in (no layout shift)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(false);
    const t = setTimeout(() => {
      setShown(text);
      setVisible(true);
    }, 150);
    return () => clearTimeout(t);
  }, [text, shown]);

  return (
    <span
      style={{
        display: "inline-block",
        minHeight: 20,
        opacity: visible ? 1 : 0,
        transition: "opacity 150ms var(--ease-inout)",
        ...style,
      }}
    >
      {shown}
    </span>
  );
}
