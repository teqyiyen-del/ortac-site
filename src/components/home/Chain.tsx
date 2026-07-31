"use client";

import SmartLink from "@/components/shared/SmartLink";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Building2,
  CalendarCheck,
  IdCard,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { CHAIN } from "@/lib/brand";

/* §5 — the argument of this section is not a sequence, it is a proportion:
   kuruluş is the short black bar that ends at the line, and everything to the
   right of that line never ends. So the section is drawn as a duty chart, not
   as five boxes. Bar texture carries the cadence: solid = continuous,
   segmented = repeats (tight ticks for beyan periods, wide ticks for renewals).
   The reveal below is still the one-time fill, but the open-ended bars also
   carry a permanent flow. That flow is pure CSS (background-position on a
   one-period tile) so nothing runs per frame in JS and the browser can park it
   while the section is offscreen — see .lc-bar flow rules in globals.css, where
   the reduce guard also lives, since the flow never passes through this file.
   The "once" bar is deliberately left still: it happens once, so it does not
   move. Reduce here only collapses the fill timing; it must not change what is
   rendered, or the server HTML and the hydrated client would disagree. */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/** where the one-off ends and the open-ended work begins, in % of the track */
const SPLIT = 24;

type Kind = "once" | "taper" | "solid" | "period" | "renew";

const META: Record<
  string,
  { Icon: LucideIcon; href: string; cadence: string; kind: Kind }
> = {
  kurulus: {
    Icon: Building2,
    href: "/dubai",
    cadence: "Bir kez",
    kind: "once",
  },
  banka: {
    Icon: Landmark,
    href: "/dubai/banka-hesabi",
    cadence: "Açılış ve takip",
    kind: "taper",
  },
  muhasebe: {
    Icon: CalendarCheck,
    href: "/dubai/muhasebe",
    cadence: "Dönemsel",
    kind: "period",
  },
  uyum: {
    Icon: ShieldCheck,
    href: "/dubai/uyum",
    cadence: "Sürekli",
    kind: "solid",
  },
  oturum: {
    Icon: IdCard,
    href: "/dubai/oturum-vize",
    cadence: "Yenilemeli",
    kind: "renew",
  },
};

export default function Chain() {
  const reduce = useReducedMotion();

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Kuruluş bir halka, zincir devam ediyor."
            accent="zincir devam ediyor."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Şirket kurulduktan sonra başlayan iş burada.</p>
          </FadeUp>
        </div>

        <div className="lc">
          <div className="lc-head" aria-hidden="true">
            <span />
            <span className="lc-axis">
              <i className="lc-axis-a">Tek seferlik</i>
              <i className="lc-axis-b">Süresiz devam eden</i>
            </span>
            <span />
          </div>

          <ol className="lc-rows">
            {CHAIN.map((c, i) => {
              /* CHAIN is authored in brand.ts and this map is not type linked to
                 it, so an unknown key must not take the page down with it */
              const meta = META[c.key];
              if (!meta) return null;
              const { Icon, href, cadence, kind } = meta;
              const once = kind === "once";
              /* reduce collapses the timing instead of dropping `initial`: the
                 server has no media query, so a client-only `initial` would
                 render a different transform than the HTML it hydrates */
              const dur = reduce ? 0 : once ? 0.5 : 1.05;
              const delay = reduce ? 0 : 0.1 + i * 0.12;
              return (
                <li key={c.key}>
                  <SmartLink href={href} className="lc-row">
                    <span className="lc-lab">
                      <span className="lc-t">
                        <Icon
                          className="lc-ic"
                          size={17}
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                        {c.label}
                        <ArrowUpRight
                          className="lc-arrow"
                          size={15}
                          strokeWidth={2.1}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="lc-l">{c.line}</span>
                    </span>

                    <span className="lc-track" aria-hidden="true">
                      <motion.span
                        className="lc-bar"
                        data-kind={kind}
                        /* geometry as variables so the mobile stack can drop the
                           split offset without fighting an inline style */
                        style={
                          {
                            "--bl": `${once ? 0 : SPLIT}%`,
                            "--bw": `${once ? SPLIT : 100 - SPLIT}%`,
                          } as React.CSSProperties
                        }
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={VIEW}
                        transition={{ duration: dur, delay, ease: EASE }}
                      />
                    </span>

                    <span className="lc-cad" data-once={once || undefined}>
                      {cadence}
                    </span>
                  </SmartLink>
                </li>
              );
            })}
          </ol>
        </div>

        <FadeUp delay={0.4}>
          <p className="ch5-note">
            Kategorideki firmaların çoğu ilk halkada bitiyor. Ceza da, sorun da sonrasında
            çıkıyor.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
