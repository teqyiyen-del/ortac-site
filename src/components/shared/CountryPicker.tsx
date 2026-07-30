"use client";

import Link from "next/link";

import type { Country } from "@/lib/store";

/* One country switch, used by the hero globe and the pricing section so the two
   look and behave identically. Flags are inline SVG — nothing loads over the
   network and they stay crisp at any size. */

export const COUNTRY_NAMES: Record<Country, string> = {
  dubai: "Dubai",
  ingiltere: "İngiltere",
  kktc: "KKTC",
};

export const COUNTRY_ORDER: Country[] = ["dubai", "ingiltere", "kktc"];

export function Flag({ country }: { country: Country }) {
  if (country === "dubai")
    return (
      <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="60" height="40" fill="#ffffff" />
        <rect width="60" height="13.34" fill="#00732f" />
        <rect y="26.66" width="60" height="13.34" fill="#000000" />
        <rect width="16" height="40" fill="#ff0000" />
      </svg>
    );
  if (country === "ingiltere")
    return (
      <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0 0 L60 40 M60 0 L0 40" stroke="#ffffff" strokeWidth="9" />
        <path d="M0 0 L60 40 M60 0 L0 40" stroke="#c8102e" strokeWidth="4.5" />
        <path d="M30 0 V40 M0 20 H60" stroke="#ffffff" strokeWidth="14" />
        <path d="M30 0 V40 M0 20 H60" stroke="#c8102e" strokeWidth="8" />
      </svg>
    );
  return (
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="60" height="40" fill="#ffffff" />
      <rect y="6" width="60" height="4" fill="#e30a17" />
      <rect y="30" width="60" height="4" fill="#e30a17" />
      <circle cx="25" cy="20" r="8.4" fill="#e30a17" />
      <circle cx="28.6" cy="20" r="6.7" fill="#ffffff" />
      <path
        d="M38.6 15.4 L39.9 19.1 L43.8 19.1 L40.7 21.4 L41.8 25.1 L38.6 22.8 L35.4 25.1 L36.5 21.4 L33.4 19.1 L37.3 19.1 Z"
        fill="#e30a17"
      />
    </svg>
  );
}

export default function CountryPicker({
  value,
  shown,
  onSelect,
  onHover,
  withLabel = false,
  withLegend = false,
  label = "Ülke seçin",
}: {
  /** the committed choice — drives aria-selected */
  value: Country;
  /** what is currently lit; defaults to `value` (the hero lights hovers too) */
  shown?: Country;
  onSelect: (c: Country) => void;
  onHover?: (c: Country | null) => void;
  withLabel?: boolean;
  /** hero only: clickable country legend + the "not sure" escape hatch */
  withLegend?: boolean;
  label?: string;
}) {
  const lit = shown ?? value;
  return (
    <div className="glb-pick">
      <div className="glb-flags" role="tablist" aria-label={label} data-labelled={withLabel || undefined}>
      {COUNTRY_ORDER.map((c) => (
        <button
          key={c}
          type="button"
          role="tab"
          aria-selected={value === c}
          aria-label={COUNTRY_NAMES[c]}
          title={COUNTRY_NAMES[c]}
          className="glb-flag"
          data-on={lit === c}
          onMouseEnter={() => onHover?.(c)}
          onMouseLeave={() => onHover?.(null)}
          onFocus={() => onHover?.(c)}
          onBlur={() => onHover?.(null)}
          onClick={() => onSelect(c)}
        >
          <span className="glb-flag-disc">
            <Flag country={c} />
          </span>
          {withLabel && <span className="glb-flag-name">{COUNTRY_NAMES[c]}</span>}
        </button>
      ))}
      </div>

      {/* The legend used to repeat the three country names under the flags,
          which is a whole stacked row saying what the labelled flags already
          say. Only the escape hatch is left. */}
      {withLegend && (
        <Link href="/uygunluk-testi" className="glb-unsure">
          Emin değilim, bana uygun olanı bul
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
