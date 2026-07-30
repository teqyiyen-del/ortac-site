"use client";

import { motion } from "motion/react";
import { Building2, Globe2, UserRound, type LucideIcon } from "lucide-react";

/* Two nodes and what travels between them. Lucide icons nest inside the scene
   SVG (an <svg> child is legal SVG), so the drawing stays one crisp vector and
   the packet can ride the wire with animateMotion. */

export type NodeSpec = { title: string; sub: string; icon: "tr" | "world" | "person" };

const ICON: Record<NodeSpec["icon"], LucideIcon> = {
  tr: Building2,
  world: Globe2,
  person: UserRound,
};

const W = 560;
const H = 300;
const BOX_W = 178;
const BOX_H = 108;
const LEFT_X = 24;
const RIGHT_X = W - BOX_W - 24;
const BOX_Y = (H - BOX_H) / 2 - 8;
const CY = BOX_Y + BOX_H / 2;

const forwardPath = `M ${LEFT_X + BOX_W + 6} ${CY - 14} C ${W / 2 - 44} ${CY - 78}, ${W / 2 + 44} ${CY - 78}, ${RIGHT_X - 6} ${CY - 14}`;
const backPath = `M ${RIGHT_X - 6} ${CY + 14} C ${W / 2 + 44} ${CY + 78}, ${W / 2 - 44} ${CY + 78}, ${LEFT_X + BOX_W + 6} ${CY + 14}`;

function Node({ x, spec, accent }: { x: number; spec: NodeSpec; accent?: boolean }) {
  const Icon = ICON[spec.icon];
  return (
    <g>
      <rect
        x={x}
        y={BOX_Y}
        width={BOX_W}
        height={BOX_H}
        rx="20"
        className={accent ? "fs-box fs-box-accent" : "fs-box"}
      />
      <rect x={x + 20} y={BOX_Y + 18} width="34" height="34" rx="10" className="fs-chip" />
      <Icon
        x={x + 28}
        y={BOX_Y + 26}
        width={18}
        height={18}
        strokeWidth={1.9}
        className="fs-chip-ic"
        aria-hidden="true"
      />
      <text x={x + 20} y={BOX_Y + 76} className="fs-t">
        {spec.title}
      </text>
      <text x={x + 20} y={BOX_Y + 95} className="fs-s">
        {spec.sub}
      </text>
    </g>
  );
}

function Wire({
  d,
  label,
  delay,
  muted,
  labelY,
}: {
  d: string;
  label: string;
  delay: number;
  muted?: boolean;
  labelY: number;
}) {
  return (
    <g>
      <motion.path
        d={d}
        className={muted ? "fs-wire fs-wire-muted" : "fs-wire"}
        markerEnd={muted ? "url(#fs-head-muted)" : "url(#fs-head)"}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      {!muted && (
        <g className="fs-packet">
          <rect x="-5" y="-5" width="10" height="10" rx="3" />
          <animateMotion dur="2.8s" begin={`${delay + 0.8}s`} repeatCount="indefinite" path={d} />
        </g>
      )}
      <motion.text
        x={W / 2}
        y={labelY}
        className="fs-tag"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.5 }}
      >
        {label}
      </motion.text>
    </g>
  );
}

export default function FlowScene({
  from,
  to,
  forward,
  back,
}: {
  from: NodeSpec;
  to: NodeSpec;
  forward: string;
  back?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="fs"
      role="img"
      aria-label={`${from.title} → ${to.title}: ${forward}`}
    >
      <defs>
        <marker id="fs-head" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" className="fs-head" />
        </marker>
        <marker id="fs-head-muted" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" className="fs-head fs-head-muted" />
        </marker>
        <pattern id="fs-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" className="fs-dot" />
        </pattern>
      </defs>

      <rect width={W} height={H} fill="url(#fs-dots)" />

      <Wire d={forwardPath} label={forward} delay={0.15} labelY={CY - 72} />
      {back && <Wire d={backPath} label={back} delay={0.45} labelY={CY + 96} muted />}

      <Node x={LEFT_X} spec={from} />
      <Node x={RIGHT_X} spec={to} accent />
    </svg>
  );
}
