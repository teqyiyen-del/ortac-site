"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Check, ChevronDown, Info } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import type { CountryContent } from "@/lib/countryContent";

/* Brief §8 — the block used to be a standalone "hangi evrak lazım" wall of
   sentences. It is now the answer to a larger question: what does starting a
   company actually need from you. The two columns are the division of labour
   (sizde / bizde), the evrak list is one part of that frame rather than its own
   section, and every row on the visitor's side is a short label: the long half
   of each line moved behind a disclosure, so the default view stays scannable.

   Only the visitor's column is split. Our column prints its items verbatim,
   because one of them is the Dubai presence warning ("... biyometri (BAE'de)")
   and a warning must not be cut into a decorative badge.

   Data is read-only, so the label / detail split is derived from the string
   itself (parenthesis, colon or comma). See dataNeeds: a structured
   { label, detail } item would remove the parsing. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* the card fades up, then hands the beat to its own rows */
const cardV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
      when: "beforeChildren",
      delayChildren: 0.1,
      staggerChildren: 0.06,
    },
  },
};

const listV: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* one sheet at a time, slid in and settled — not a bulk fade */
const rowV: Variants = {
  hidden: { opacity: 0, x: -14, rotate: -1.4 },
  show: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.46, ease: EASE } },
};

const barV: Variants = {
  hidden: { opacity: 0, scaleX: 0.35 },
  show: { opacity: 1, scaleX: 1, transition: { duration: 0.5, ease: EASE } },
};

type Doc = { key: string; label: string; detail: string | null };

const capTr = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);

/** "Adres beyanı: son 3 aya ait fatura" → label + detail. Anything without a
 *  natural break stays a single short label with no disclosure. The index is
 *  folded into the key so two identical strings cannot collide. */
function splitDoc(raw: string, i: number): Doc {
  const text = raw.trim();
  const key = `${i}|${text}`;

  const paren = text.match(/^(.+?)\s*\(([^()]+)\)$/);
  if (paren) return { key, label: paren[1].trim(), detail: capTr(paren[2].trim()) };

  const colon = text.indexOf(": ");
  if (colon > 3) {
    return { key, label: text.slice(0, colon).trim(), detail: capTr(text.slice(colon + 2).trim()) };
  }

  const comma = text.indexOf(", ");
  if (comma > 7) {
    return { key, label: text.slice(0, comma).trim(), detail: capTr(text.slice(comma + 2).trim()) };
  }

  return { key, label: text, detail: null };
}

/* the schematic: one page whose lines fill as the list is ticked off */
function Sheet({ total, done }: { total: number; done: number }) {
  const step = total > 0 ? Math.min(13, 60 / total) : 13;
  const h = Math.max(3, Math.min(6, step - 5));
  const widths = [54, 44, 58, 38, 50];

  return (
    <motion.svg
      className="ndx-sheet"
      viewBox="0 0 96 124"
      aria-hidden="true"
      focusable="false"
      variants={listV}
    >
      <path
        className="ndx-sheet-body"
        d="M6 12a8 8 0 0 1 8-8h44l32 30v78a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8Z"
      />
      <path className="ndx-sheet-fold" d="M58 4l32 30H66a8 8 0 0 1-8-8Z" />
      {Array.from({ length: total }).map((_, i) => (
        <motion.rect
          key={i}
          x="18"
          y={50 + i * step}
          width={widths[i % widths.length]}
          height={h}
          rx={h / 2}
          data-on={i < done || undefined}
          variants={barV}
        />
      ))}
    </motion.svg>
  );
}

export default function CountryDocs({
  data,
  name,
}: {
  data: CountryContent["docs"];
  name: string;
}) {
  const reduced = useReducedMotion();
  const uid = useId();
  const yours = data.groups[0];
  const ours = data.groups[1];

  const mine = useMemo(() => (yours ? yours.items.map(splitDoc) : []), [yours]);

  const [done, setDone] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<string | null>(null);

  const total = mine.length;
  const count = mine.filter((d) => done[d.key]).length;
  const pct = total > 0 ? count / total : 0;

  const reveal = {
    variants: cardV,
    initial: reduced ? "show" : "hidden",
    whileInView: "show",
    viewport: { once: true, margin: "0px 0px -15% 0px" },
  } as const;

  if (!yours) return null;

  return (
    <section id="evrak" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Şirket kurmak için nelere ihtiyacınız var?"
            accent="nelere ihtiyacınız var?"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              {name} için sizde olanı işaretleyin, süreç tarafını biz yürütüyoruz.
            </p>
          </FadeUp>
        </div>

        <div className="ndx">
          {/* your side: a working checklist, one line each */}
          <motion.div className="ndx-card ndx-card-yours" {...reveal}>
            <div className="ndx-top">
              <div>
                <span className="ndx-side">Sizde</span>
                <h3 className="ndx-t">{yours.title}</h3>
                <p className="ndx-hint">{yours.hint}</p>
              </div>
              <Sheet total={total} done={count} />
            </div>

            <div className="ndx-meter">
              <div className="ndx-bar" aria-hidden="true">
                <span style={{ transform: `scaleX(${pct})` }} />
              </div>
              <span className="ndx-count" aria-live="polite">
                {total > 0 && count === total ? "Listeniz hazır" : `${count}/${total} hazır`}
              </span>
            </div>

            <motion.ul className="ndx-list" variants={listV}>
              {mine.map((doc, i) => {
                const isOpen = open === doc.key;
                const panelId = `${uid}-doc-${i}`;

                return (
                  <motion.li
                    key={doc.key}
                    className="ndx-row"
                    data-done={done[doc.key] || undefined}
                    variants={rowV}
                  >
                    <div className="ndx-row-top">
                      <button
                        type="button"
                        className="ndx-tick"
                        aria-pressed={!!done[doc.key]}
                        aria-label={`${doc.label}: hazır`}
                        onClick={() => setDone((d) => ({ ...d, [doc.key]: !d[doc.key] }))}
                      >
                        <Check size={12} strokeWidth={3.6} aria-hidden="true" />
                      </button>

                      {doc.detail ? (
                        <button
                          type="button"
                          className="ndx-open"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen((o) => (o === doc.key ? null : doc.key))}
                        >
                          <span className="ndx-label">{doc.label}</span>
                          <ChevronDown
                            className="ndx-chev"
                            size={16}
                            strokeWidth={2.1}
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        <span className="ndx-open ndx-open-flat">
                          <span className="ndx-label">{doc.label}</span>
                        </span>
                      )}
                    </div>

                    {/* the panel node stays mounted so aria-controls always
                        resolves to a real element, open or closed */}
                    {doc.detail && (
                      <div id={panelId} className="ndx-panel">
                        {isOpen && (
                          <motion.p
                            className="ndx-detail"
                            initial={reduced ? false : { opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, ease: EASE }}
                          >
                            {doc.detail}
                          </motion.p>
                        )}
                      </div>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>

          {/* our side: the same block, but nothing here is the visitor's job.
              Items print verbatim — see the note at the top of the file. */}
          {ours && (
            <motion.aside className="ndx-card ndx-card-ours" {...reveal}>
              <div className="ndx-top">
                <div>
                  <span className="ndx-side ndx-side-ours">Bizde</span>
                  <h3 className="ndx-t">{ours.title}</h3>
                  <p className="ndx-hint">{ours.hint}</p>
                </div>
              </div>

              <motion.ol className="ndx-ours" variants={listV}>
                {ours.items.map((item, i) => (
                  <motion.li key={`${i}|${item}`} className="ndx-orow" variants={rowV}>
                    <span className="ndx-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="ndx-olabel">{item}</span>
                  </motion.li>
                ))}
              </motion.ol>
            </motion.aside>
          )}
        </div>

        <FadeUp delay={0.24}>
          <p className="ndx-note">
            <Info size={16} strokeWidth={2.1} aria-hidden="true" />
            <span>{data.note}</span>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
