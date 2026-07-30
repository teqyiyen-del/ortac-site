"use client";

import { useState } from "react";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";

const SPRING_CARD = { type: "spring", stiffness: 170, damping: 24, mass: 1 } as const;

type Radio = {
  checked: boolean;
  onSelect: () => void;
  tabIndex: number;
  onKeyDown: React.KeyboardEventHandler;
};

type Props = {
  className?: string; // fc-item + position class
  depth: number; // parallax px at nx = ±1
  floatDur: number; // idle float period (s)
  amp: number; // idle float amplitude (±px)
  entryDelay: number;
  active: boolean; // panel ≥20% in view → ambient runs
  nx?: MotionValue<number>; // panel-level parallax springs
  ny?: MotionValue<number>;
  radio?: Radio; // selectable variant (country cards)
  ariaLive?: "polite";
  cardStyle?: React.CSSProperties;
  children: React.ReactNode;
};

/** Hero cluster card (spec §1 + design.md §8):
 *  outer = entrance · mid = pointer parallax (+hover scale) · inner = idle float ·
 *  chrome = white, 1px border, r14, shadow-float, 16/18 padding. */
export default function FloatCard({
  className,
  depth,
  floatDur,
  amp,
  entryDelay,
  active,
  nx,
  ny,
  radio,
  ariaLive,
  cardStyle,
  children,
}: Props) {
  const rm = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [hover, setHover] = useState(false);

  const fallback = useTransform(() => 0);
  const px = useTransform(nx ?? fallback, (v) => v * depth);
  const py = useTransform(ny ?? fallback, (v) => v * depth);

  const floating = !rm && entered && active;

  const chrome: React.CSSProperties = {
    display: "block",
    width: "100%",
    textAlign: "left",
    background: radio?.checked ? "var(--blue-100)" : "#ffffff",
    border: radio?.checked
      ? "1.5px solid var(--blue-600)"
      : `1px solid ${hover && radio ? "var(--blue-600)" : "var(--border)"}`,
    borderRadius: 14,
    boxShadow: "var(--shadow-float)",
    padding: "16px 18px",
    cursor: radio ? "pointer" : undefined,
    transition: "border-color 150ms linear, background-color 150ms linear",
    fontFamily: "var(--font-sans)",
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...SPRING_CARD, delay: entryDelay }}
      onAnimationComplete={() => setEntered(true)}
    >
      {/* parallax wrapper — also carries the hover scale (spec §1) */}
      <motion.div
        style={{ x: px, y: py }}
        animate={{ scale: hover && radio ? 1.02 : 1 }}
        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
      >
        {/* idle float — desynced, mirrors, pauses off-screen */}
        <motion.div
          initial={false}
          animate={floating ? { y: [-amp, amp] } : { y: 0 }}
          transition={
            floating
              ? {
                  duration: floatDur,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
        >
          {radio ? (
            <div
              role="radio"
              aria-checked={radio.checked}
              tabIndex={radio.tabIndex}
              onClick={radio.onSelect}
              onKeyDown={radio.onKeyDown}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{ ...chrome, ...cardStyle }}
            >
              {children}
            </div>
          ) : (
            <div aria-live={ariaLive} style={{ ...chrome, ...cardStyle }}>
              {children}
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
