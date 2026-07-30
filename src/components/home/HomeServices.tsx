"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { CHAIN } from "@/lib/brand";

/* Verdiğimiz hizmetler.
 *
 * Bu bölüm Chain'in yerini aldı. Chain iyi bir bölüm ama başka bir iş yapıyor:
 * "kuruluş bir halka, zincir devam ediyor" bir argüman, hizmet listesi değil.
 * O argüman akışta aşağı indi; burada ne yaptığımız yazıyor.
 *
 * Every card is the same shape: a small working mock on the left, the service
 * and one sentence on the right. The mock is the point - a list of five service
 * names is something any firm can write, and a visitor scrolling past reads none
 * of it. What they do read is a screen that looks like the thing they will
 * actually be handed.
 *
 * The mocks are DOM rather than SVG on purpose. They are made of the same rows,
 * pills and bars the rest of the site already has, so they inherit the type
 * scale and the palette instead of carrying their own, and each piece can be
 * animated on its own without a transform on a whole drawing.
 *
 * Rule the mocks cannot break: nothing here may imply a bank decision, an
 * authority decision or a fixed duration. Every state is either work we did or
 * work that is still open.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/* one row of a mock: a label, a state, and which of the three tones it carries.
   ok = done on our side, run = in motion, wait = not ours to finish */
type Tone = "ok" | "run" | "wait";
type Row = { t: string; s: string; tone: Tone };

function Rows({ rows }: { rows: Row[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="hs-mock" aria-hidden="true">
      {rows.map((r, i) => (
        <motion.span
          className="hs-row"
          key={r.t}
          data-tone={r.tone}
          initial={{ opacity: 0, x: reduce ? 0 : -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: reduce ? 0 : 0.4, delay: 0.1 + i * 0.12, ease: EASE }}
        >
          <span className="hs-row-t">{r.t}</span>
          <span className="hs-row-s">{r.s}</span>
        </motion.span>
      ))}
    </div>
  );
}

/* the payment card: two channels and a transfer between them */
function Channels() {
  const reduce = useReducedMotion();
  return (
    <div className="hs-mock hs-mock-ch" aria-hidden="true">
      {["Hesap başvurusu", "Tahsilat kanalı"].map((t, i) => (
        <motion.span
          className="hs-ch"
          key={t}
          data-on={i === 0 || undefined}
          initial={{ opacity: 0, y: reduce ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: reduce ? 0 : 0.4, delay: 0.12 + i * 0.16, ease: EASE }}
        >
          {t}
        </motion.span>
      ))}
      <motion.span
        className="hs-ch-wire"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={VIEW}
        transition={{ duration: reduce ? 0 : 0.45, delay: 0.3, ease: EASE }}
      />
    </div>
  );
}

/* the accounting card: a period bar filling month by month */
function Periods() {
  const reduce = useReducedMotion();
  return (
    <div className="hs-mock hs-mock-per" aria-hidden="true">
      <span className="hs-per-k">Dönem</span>
      <span className="hs-per-track">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.i
            key={i}
            initial={{ scaleY: 0.25, opacity: 0.35 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={VIEW}
            transition={{ duration: reduce ? 0 : 0.34, delay: 0.12 + i * 0.09, ease: EASE }}
          />
        ))}
      </span>
      <span className="hs-per-n">Defter, beyan, rapor</span>
    </div>
  );
}

type Card = {
  key: string;
  t: string;
  l: string;
  href: string;
  Mock: () => React.ReactElement;
};

/* Names and one-liners come from CHAIN in brand.ts, which is the same list the
   rest of the site uses, so a service can never be renamed here alone. */
const byKey = Object.fromEntries(CHAIN.map((c) => [c.key, c]));

const CARDS: Card[] = [
  {
    key: "kurulus",
    t: byKey.kurulus.label,
    l: byKey.kurulus.line,
    href: "/basla",
    Mock: () => (
      <Rows
        rows={[
          { t: "Evrak dosyası", s: "tamam", tone: "ok" },
          { t: "İsim kontrolü", s: "sorgulandı", tone: "ok" },
          { t: "Tescil başvurusu", s: "incelemede", tone: "run" },
        ]}
      />
    ),
  },
  {
    key: "banka",
    t: byKey.banka.label,
    l: byKey.banka.line,
    href: "/dubai/banka-hesabi",
    Mock: Channels,
  },
  {
    key: "muhasebe",
    t: byKey.muhasebe.label,
    l: byKey.muhasebe.line,
    href: "/dubai/muhasebe",
    Mock: Periods,
  },
  {
    key: "uyum",
    t: byKey.uyum.label,
    l: byKey.uyum.line,
    href: "/dubai/uyum",
    Mock: () => (
      <Rows
        rows={[
          { t: "Kayıt", s: "yapıldı", tone: "ok" },
          { t: "Bildirim takvimi", s: "kurulu", tone: "ok" },
          { t: "Dönem raporu", s: "sırada", tone: "wait" },
        ]}
      />
    ),
  },
  {
    key: "oturum",
    t: byKey.oturum.label,
    l: byKey.oturum.line,
    href: "/dubai/oturum-vize",
    Mock: () => (
      <Rows
        rows={[
          { t: "Başvuru dosyası", s: "gönderildi", tone: "ok" },
          { t: "Biyometri randevusu", s: "BAE'de", tone: "wait" },
          { t: "Kimlik", s: "sırada", tone: "wait" },
        ]}
      />
    ),
  },
];

export default function HomeServices() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Verdiğimiz hizmetler."
            accent="hizmetler."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Kuruluş bir halka; zincirin tamamı bizde.</p>
          </FadeUp>
        </div>

        <div className="hs-grid">
          {CARDS.map((c, i) => (
            <FadeUp key={c.key} delay={0.12 + i * 0.06}>
              <Link href={c.href} className="hs-card">
                <c.Mock />
                <span className="hs-txt">
                  <span className="hs-t">{c.t}</span>
                  <span className="hs-l">{c.l}</span>
                  <span className="hs-go">
                    Ayrıntı
                    <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
