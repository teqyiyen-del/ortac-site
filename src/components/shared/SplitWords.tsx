"use client";

import { Fragment } from "react";
import { motion } from "motion/react";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

type Props = {
  text: string;
  accent?: string; // substring of text rendered in .text-accent, split per word
  accentColor?: string; // overrides .text-accent color (e.g. blue-600 on navy)
  base?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2";
};

/** H1/H2 only — splits on spaces, per-word clip wrapper, y 110% → 0,
 *  0.6s ease-out-quint, delay base + index * 0.045 (spec contract). */
export default function SplitWords({
  text,
  accent,
  accentColor,
  base = 0,
  className,
  style,
  as: Tag = "h2",
}: Props) {
  const words = text.split(" ");
  const accentStart = accent ? text.indexOf(accent) : -1;
  const accentEnd = accentStart >= 0 && accent ? accentStart + accent.length : -1;

  /* character offset of each word within the source string (no mutable closure) */
  const items = words.map((word, index) => {
    const start = words
      .slice(0, index)
      .reduce((sum, w) => sum + w.length + 1, 0);
    const isAccent = accentStart >= 0 && start >= accentStart && start < accentEnd;
    return { word, index, isAccent };
  });

  return (
    <Tag className={className} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {items.map(({ word, index, isAccent }) => (
          <Fragment key={index}>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "top",
                paddingBottom: "0.12em",
                marginBottom: "-0.12em",
              }}
            >
              <motion.span
                className={isAccent && !accentColor ? "text-accent" : undefined}
                style={{
                  display: "inline-block",
                  willChange: "transform",
                  color: isAccent && accentColor ? accentColor : undefined,
                }}
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{
                  duration: 0.6,
                  ease: EASE_OUT_QUINT,
                  delay: base + index * 0.045,
                }}
              >
                {word}
              </motion.span>
            </span>{" "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
