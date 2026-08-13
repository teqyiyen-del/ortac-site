"use client";

import { motion } from "motion/react";
import { MapPin, Minus, Plus } from "lucide-react";

/* SWAP:GOOGLE_MAPS_EMBED — a drawn map of the office district, sized and styled
   exactly like the live embed that will replace it. Keeping it as SVG means no
   API key, no tile requests and no consent banner on first paint; when the
   Google embed is wired up, drop an <iframe> in place of the <svg> and the
   surrounding chrome (label, zoom buttons, ring) stays as-is. */

const EASE = [0.22, 1, 0.36, 1] as const;

export default function OfficeMap() {
  return (
    <div className="omap">
      {/* `slice`: kutu artık kendi oranından uzun olabiliyor (globals.css ·
          .omap'in min-height'ı, iki sütunu eşitlemek için). Varsayılan `meet`
          o durumda çizimi ortalayıp altına ve üstüne boş zemin bırakırdı, yani
          yolların ekranın kenarına varmadığı yarım bir harita. `slice` çizimi
          doldurup taşan yeri kırpıyor; bir haritanın kırpılması zaten doğal
          okuma. Pin, halka, etiket ve zoom SVG'nin DIŞINDA (aşağıya bakın),
          pin yüzdeyle, etiket ve zoom köşeye sabit; hiçbiri kırpmadan
          etkilenmiyor. */}
      <svg
        viewBox="0 0 520 330"
        preserveAspectRatio="xMidYMid slice"
        className="omap-svg"
        role="img"
        aria-label="Dubai · IFZA ofis konumu"
      >
        <rect width="520" height="330" className="om-land" />

        {/* the creek in the upper right */}
        <path d="M520 0 L520 132 C452 128 404 96 372 52 C356 30 344 12 336 0 Z" className="om-water" />

        {/* green strip along the water */}
        <path d="M336 0 C346 16 360 38 378 58 C404 88 448 116 520 122 L520 138 C444 132 396 100 364 56 C350 36 338 16 330 0 Z" className="om-park" />

        {/* main artery */}
        <path d="M-10 232 C120 214 220 178 300 128 C368 86 420 44 452 -6" className="om-road om-road-main" />
        {/* the road the office sits on, in the brand colour */}
        <path d="M-10 292 C130 282 250 260 356 220 C412 198 452 172 486 138" className="om-road om-road-live" />

        {/* secondary grid */}
        <path d="M-10 118 C80 128 168 132 250 122" className="om-road" />
        <path d="M92 340 C104 262 96 190 62 118" className="om-road" />
        <path d="M236 340 C248 274 244 214 222 160" className="om-road" />
        <path d="M-10 292 C130 282 250 260 356 220" className="om-road" />
        <path d="M368 330 C382 280 392 236 396 196" className="om-road" />

        {/* blocks */}
        <g className="om-block">
          <rect x="120" y="150" width="52" height="34" rx="4" />
          <rect x="182" y="164" width="34" height="28" rx="4" />
          <rect x="126" y="196" width="40" height="26" rx="4" />
          <rect x="268" y="196" width="46" height="30" rx="4" />
          <rect x="300" y="248" width="38" height="26" rx="4" />
          <rect x="24" y="176" width="44" height="30" rx="4" />
          <rect x="404" y="152" width="42" height="28" rx="4" />
          <rect x="440" y="212" width="50" height="34" rx="4" />
        </g>
      </svg>

      {/* pin + label live outside the drawing so the Google embed can slot in */}
      <motion.span
        className="omap-ring"
        aria-hidden="true"
        initial={{ scale: 0.35, opacity: 0.55 }}
        animate={{ scale: 1.7, opacity: 0 }}
        transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.span
        className="omap-pin"
        initial={{ y: -22, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.4, 0.64, 1] }}
      >
        <MapPin size={24} strokeWidth={2.1} />
      </motion.span>

      <motion.span
        className="omap-label"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.4, delay: 0.55, ease: EASE }}
      >
        <b>Ortac Global</b>
        IFZA · Dubai Silicon Oasis
      </motion.span>

      <span className="omap-zoom" aria-hidden="true">
        <span>
          <Plus size={14} strokeWidth={2.2} />
        </span>
        <span>
          <Minus size={14} strokeWidth={2.2} />
        </span>
      </span>
    </div>
  );
}
