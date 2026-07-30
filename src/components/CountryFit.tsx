"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import { Flag } from "@/components/shared/CountryPicker";
import { FACTS } from "@/lib/brand";
import type { FitRow } from "@/lib/countryContent";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* A seven-row table of prose is something you read past. The same seven rows as
   a question the visitor answers about themselves is something they act on.
   The verdict is written in the firm's voice — "doğru yer" / "önermiyoruz" —
   not as a compatibility badge, and it always ends holding a destination with
   its real price and duration, so the answer is a next step and not a label. */

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CountryFit({
  rows,
  country,
}: {
  rows: FitRow[];
  country: Country;
}) {
  const [i, setI] = useState(0);
  const row = rows[i];
  const name = COUNTRY_LABELS[country];
  /* where this answer points: here when it fits, the better country when it
     does not, and nowhere when there is no honest alternative */
  const dest: Country | null = row.ok ? country : (row.alt ?? null);

  return (
    <div className="cfit">
      <FadeUp delay={0.16}>
        <div className="cfit-chips" role="tablist" aria-label="Profil seçin">
          {rows.map((r, idx) => (
            <button
              key={r.profile}
              type="button"
              role="tab"
              aria-selected={i === idx}
              className="cfit-chip"
              data-on={i === idx || undefined}
              onClick={() => setI(idx)}
            >
              {r.profile}
            </button>
          ))}
        </div>
      </FadeUp>

      <FadeUp delay={0.22}>
        <div className="cfit-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={row.profile}
              className="cfit-body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <div className="cfit-main">
                <p className="cfit-verdict">
                  {row.you}{" "}
                  <b data-ok={row.ok || undefined}>
                    {row.ok ? `${name} doğru yer.` : `${name}'yi önermiyoruz.`}
                  </b>
                </p>
                <p className="cfit-why">{row.why}</p>
              </div>

              <aside className="cfit-dest" data-ok={row.ok || undefined}>
                <span className="cfit-dest-h">
                  {row.ok ? "Buradan devam edin" : dest ? "Bunun yerine" : "Emin değilseniz"}
                </span>

                {dest ? (
                  <>
                    <span className="cfit-dest-c">
                      <span className="cfit-flag" aria-hidden="true">
                        <Flag country={dest} />
                      </span>
                      {COUNTRY_LABELS[dest]}
                    </span>
                    <span className="cfit-dest-m">
                      {FACTS[dest].fromLabel}&apos;dan · {FACTS[dest].days}
                    </span>
                    <Link href={row.ok ? "/basla" : `/${dest}`} className="btn btn-solid">
                      {row.ok ? "Kurulumu başlat" : `${COUNTRY_LABELS[dest]} sayfasına git`}
                      <ArrowRight size={15} strokeWidth={2.1} />
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="cfit-dest-m cfit-dest-m-alone">
                      Bu profilde üç ülkeden birini önermek doğru olmaz. Testi çözün,
                      sonucu birlikte konuşalım.
                    </span>
                    <Link href="/uygunluk-testi" className="btn btn-solid">
                      Uygunluk testini çözün
                      <ArrowRight size={15} strokeWidth={2.1} />
                    </Link>
                  </>
                )}
              </aside>
            </motion.div>
          </AnimatePresence>
        </div>
      </FadeUp>
    </div>
  );
}
