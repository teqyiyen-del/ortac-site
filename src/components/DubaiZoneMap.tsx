"use client";

import { motion } from "motion/react";

/* A schematic of the emirate, not a survey map: the point is that free zones
   are enclosed districts scattered around the city while mainland is the city
   itself. Selecting an option lights its territory, so "serbest bölge mi,
   mainland mi" stops being two words and becomes two places. */

const EASE = [0.22, 1, 0.36, 1] as const;

/** enclosed free-zone districts, drawn as discrete parcels */
const ZONES = [
  { x: 78, y: 196, w: 62, h: 44 },
  { x: 156, y: 232, w: 52, h: 38 },
  { x: 246, y: 150, w: 58, h: 40 },
  { x: 330, y: 206, w: 66, h: 46 },
  { x: 412, y: 128, w: 50, h: 36 },
];

export default function DubaiZoneMap({ active }: { active: "serbest" | "mainland" }) {
  const zonesOn = active === "serbest";
  return (
    <figure className="zmap">
      <svg
        viewBox="0 0 520 340"
        className="zmap-svg"
        role="img"
        aria-label={
          zonesOn
            ? "Şematik harita: serbest bölgeler, şehrin içinde ayrı parseller olarak işaretli"
            : "Şematik harita: mainland, şehrin tamamı olarak işaretli"
        }
      >
        {/* the gulf */}
        <path d="M0 0 H520 V64 C430 84 330 74 236 52 C150 32 68 26 0 34 Z" className="zm-sea" />
        <path
          d="M0 34 C68 26 150 32 236 52 C330 74 430 84 520 64"
          className="zm-coast"
        />

        {/* the city body — this is mainland */}
        <motion.path
          d="M0 34 C68 26 150 32 236 52 C330 74 430 84 520 64 V340 H0 Z"
          className="zm-land"
          animate={{ opacity: zonesOn ? 1 : 1 }}
          data-on={!zonesOn || undefined}
        />

        {/* arteries, so the body reads as a city and not a shape */}
        <g className="zm-roads" aria-hidden="true">
          <path d="M-10 118 C120 104 260 118 530 96" />
          <path d="M-10 268 C140 258 300 272 530 244" />
          <path d="M108 350 C96 260 104 176 84 92" />
          <path d="M300 350 C292 258 306 178 288 84" />
          <path d="M430 350 C424 262 436 180 420 78" />
        </g>

        {/* enclosed free-zone parcels */}
        <g className="zm-zones" data-on={zonesOn || undefined}>
          {ZONES.map((z, i) => (
            <motion.rect
              key={i}
              x={z.x}
              y={z.y}
              width={z.w}
              height={z.h}
              rx="7"
              initial={false}
              animate={{ opacity: zonesOn ? 1 : 0.22, scale: zonesOn ? 1 : 0.94 }}
              style={{ originX: `${z.x + z.w / 2}px`, originY: `${z.y + z.h / 2}px` }}
              transition={{ duration: 0.42, delay: zonesOn ? i * 0.05 : 0, ease: EASE }}
            />
          ))}
        </g>
      </svg>

      <figcaption className="zmap-cap">
        <span className="zmap-key" data-on={zonesOn || undefined}>
          <i className="zmap-sw zmap-sw-zone" aria-hidden="true" />
          Serbest bölgeler: şehir içinde ayrı parseller
        </span>
        <span className="zmap-key" data-on={!zonesOn || undefined}>
          <i className="zmap-sw zmap-sw-land" aria-hidden="true" />
          Mainland: şehrin tamamı
        </span>
        <span className="zmap-note">Şematik gösterim, ölçekli harita değildir.</span>
      </figcaption>
    </figure>
  );
}
