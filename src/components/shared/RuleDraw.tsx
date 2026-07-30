"use client";

import { motion } from "motion/react";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

/** 1px hairline — scaleX 0→1, origin left, 0.9s ease-out-quint (spec contract). */
export default function RuleDraw({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT_QUINT, delay }}
      style={{
        height: 1,
        background: "var(--border)",
        transformOrigin: "left",
      }}
    />
  );
}
