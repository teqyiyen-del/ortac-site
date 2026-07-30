"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type Variant = "light" | "deep" | "night";

type Blob = {
  color: string;
  opacity?: number;
  width: string; // % of panel width
  aspect: string;
  pos: React.CSSProperties; // left/right/top/bottom anchors
  duration: number; // drift seconds
  drift: { x: string; y: string }; // per-blob offset
};

/* The site's only two gradient surfaces (design.md §3.1).
   NOT a CSS gradient: three blurred solid-fill blobs inside overflow:hidden. */
const BLOBS: Record<Variant, Blob[]> = {
  light: [
    {
      color: "#1E63C4",
      width: "68%",
      aspect: "1 / 0.7",
      pos: { left: "46%", bottom: "-34%" },
      duration: 22,
      drift: { x: "4%", y: "-3%" },
    },
    {
      color: "#4A90EE",
      width: "52%",
      aspect: "1 / 0.8",
      pos: { left: "-12%", bottom: "-30%" },
      duration: 26,
      drift: { x: "-3%", y: "4%" },
    },
    {
      color: "#8FBCF7",
      width: "44%",
      aspect: "1 / 0.9",
      pos: { left: "22%", bottom: "-14%" },
      duration: 19,
      drift: { x: "3%", y: "3%" },
    },
  ],
  deep: [
    {
      color: "#2D7FE6",
      width: "60%",
      aspect: "1 / 0.8",
      pos: { right: "-14%", bottom: "-30%" },
      duration: 24,
      drift: { x: "4%", y: "-3%" },
    },
    {
      color: "#4A90EE",
      width: "46%",
      aspect: "1 / 0.9",
      pos: { right: "12%", top: "-22%" },
      duration: 20,
      drift: { x: "-3%", y: "4%" },
    },
    {
      color: "#FFFFFF",
      opacity: 0.22,
      width: "38%",
      aspect: "1 / 1",
      pos: { right: "-6%", top: "30%" },
      duration: 26,
      drift: { x: "3%", y: "3%" },
    },
  ],
  /* NIGHT (hero): flat ink surface — no glow, no blobs. */
  night: [],
};

type Props = {
  variant: Variant;
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  panelRef?: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
};

export default function AuroraPanel({
  variant,
  className,
  contentClassName,
  style,
  contentStyle,
  onMouseMove,
  panelRef,
  children,
}: Props) {
  const localRef = useRef<HTMLDivElement>(null);
  const ref = panelRef ?? localRef;
  /* drift pauses when the panel is <20% in view */
  const inView = useInView(ref, { amount: 0.2 });
  const rm = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className ? `aurora-panel ${className}` : "aurora-panel"}
      onMouseMove={onMouseMove}
      /* fade in on mount, not whileInView: the panel is a surface, and an
         in-view trigger can miss when the element is already on screen */
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        /* light = white paper · deep = blue-700 · night = near-black */
        background:
          variant === "light"
            ? "var(--white)"
            : variant === "night"
              ? "var(--night)"
              : "var(--blue-700)",
        ...style,
      }}
    >
      {BLOBS[variant].map((blob, i) => {
        /* reduced motion: blobs render at their drift midpoint, no animation */
        const midpoint = {
          x: `calc(${blob.drift.x} / 2)`,
          y: `calc(${blob.drift.y} / 2)`,
        };
        return (
          <motion.div
            key={i}
            className="aurora-blob"
            aria-hidden="true"
            animate={
              rm
                ? undefined
                : inView
                  ? { x: ["0%", blob.drift.x], y: ["0%", blob.drift.y] }
                  : undefined
            }
            transition={{
              duration: blob.duration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              width: blob.width,
              aspectRatio: blob.aspect,
              background: blob.color,
              opacity: blob.opacity ?? 1,
              transform: rm
                ? `translate(${midpoint.x}, ${midpoint.y})`
                : undefined,
              ...blob.pos,
            }}
          />
        );
      })}
      <div
        className={
          contentClassName ? `aurora-content ${contentClassName}` : "aurora-content"
        }
        style={contentStyle}
      >
        {children}
      </div>
    </motion.div>
  );
}
