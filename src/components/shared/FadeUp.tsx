"use client";

import { motion } from "motion/react";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
};

/** Default reveal for any block — spec contract:
 *  initial {opacity:0, y:24} → {opacity:1, y:0}, 0.7s ease-out-quint. */
export default function FadeUp({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  className,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration, ease: EASE_OUT_QUINT, delay }}
    >
      {children}
    </motion.div>
  );
}
