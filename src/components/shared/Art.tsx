/* Line-art motifs — decorative, no stock imagery. Stroke inherits currentColor
   so each caller sets the tone (country cards: blue-600; service cards: faded). */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Frame({ children, size = 72 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false">
      <g {...base}>{children}</g>
    </svg>
  );
}

/* ---------- country landmarks ---------- */

export function ArtDubai({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* Burj Khalifa: stepped tower + spire, small neighbours */}
      <path d="M32 6 V13" />
      <path d="M27 20 L32 13 L37 20" />
      <path d="M27 20 V56 M37 20 V56" />
      <path d="M23 30 V56 M41 30 V56" />
      <path d="M23 30 L27 26 M41 30 L37 26" />
      <path d="M18 40 V56 M46 40 V56" />
      <path d="M18 40 L23 36 M46 40 L41 36" />
      <path d="M10 56 V46 H14 V56" />
      <path d="M50 56 V44 H54 V56" />
      <path d="M6 56 H58" />
    </Frame>
  );
}

export function ArtUK({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* Big Ben: clock tower + roof + arches */}
      <path d="M32 6 V11" />
      <path d="M25 20 L32 11 L39 20" />
      <path d="M26 20 V56 M38 20 V56" />
      <circle cx="32" cy="28" r="5" />
      <path d="M32 26 V28 L34 29" />
      <path d="M26 36 H38 M26 44 H38" />
      <path d="M14 56 V42 H22 V56" />
      <path d="M14 48 H22" />
      <path d="M42 56 V46 H52 V56" />
      <path d="M6 56 H58" />
    </Frame>
  );
}

export function ArtKKTC({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* Girne: harbour castle + water */}
      <path d="M16 46 V26 H48 V46" />
      <path d="M16 26 V22 H20 V26 M24 26 V22 H28 V26 M36 26 V22 H40 V26 M44 26 V22 H48 V26" />
      <path d="M28 46 V34 H36 V46" />
      <path d="M22 34 H24 M40 34 H42" />
      <path d="M8 52 Q14 48 20 52 T32 52 T44 52 T56 52" />
      <path d="M8 58 Q14 54 20 58 T32 58 T44 58 T56 58" />
    </Frame>
  );
}

/* ---------- service motifs (large, faded) ---------- */

export function ArtFormation({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      <path d="M14 8 H40 L50 18 V56 H14 Z" />
      <path d="M40 8 V18 H50" />
      <path d="M21 30 H43 M21 38 H43" />
      <path d="M21 46 L25 50 L33 42" />
    </Frame>
  );
}

export function ArtBank({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      <rect x="8" y="16" width="34" height="22" rx="4" />
      <path d="M8 24 H42" />
      <rect x="22" y="30" width="34" height="22" rx="4" />
      <path d="M22 38 H56" />
      <path d="M48 44 H52" />
    </Frame>
  );
}

export function ArtAccounting({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      <rect x="10" y="14" width="44" height="40" rx="5" />
      <path d="M10 24 H54 M22 14 V9 M42 14 V9" />
      <path d="M20 34 H26 M30 34 H36 M40 34 H46" />
      <path d="M20 44 L24 48 L32 40" />
    </Frame>
  );
}

export function ArtVisa({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      <rect x="14" y="8" width="36" height="48" rx="5" />
      <circle cx="32" cy="26" r="7" />
      <path d="M22 44 Q32 36 42 44" />
      <path d="M22 50 H42" />
    </Frame>
  );
}
