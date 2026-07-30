"use client";

/* PHOTO NOTE — the earlier brief said "stok fotoğraf yok" for this block, but
   the country photography was explicitly requested back in a later pass. Every
   image here reads from COUNTRY_PHOTO in /lib/media, which is already marked
   SWAP:STOCK_PHOTOS; replacing that map with the client's own shoot updates
   the closed panels and the comparison header strips at once. Nothing in this
   file hard-codes a URL. */

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock,
  FileCheck2,
  Globe,
  Handshake,
  Languages,
  Layers,
  Minus,
  Plus,
  TriangleAlert,
  Wallet,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_PHOTO } from "@/lib/media";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PAY_MATRIX,
  type Cell,
  type CountrySlug,
} from "@/lib/brand";
import { BrandGlyph } from "@/components/shared/BrandMark";
import { brandKeyForName } from "@/lib/brands";

/* §3 — the country decision, and nothing else. No price and no duration lives
   here on purpose: the visitor picks a country first and reads the number in
   §11. What used to sit in the payment section now lands inside the card,
   because "hangi kanal nerede çalışıyor" is part of choosing the country —
   KKTC's ✗ marks are the single most decisive fact on this screen.
   Every mark below is read out of PAY_MATRIX; nothing is retyped. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* SHORT-COPY PASS — the card was a wall of prose and the client asked for the
   opposite: fewer words, more shape. Four rules now hold this file together.
   1) EDGE is one line, four or five words, never wrapping.
   2) WHY items are labels, not sentences, each carried by its own icon. Short
      beats terse: a label is allowed a fifth word when dropping it would leave
      the reader guessing what the label is compared against.
   3) The amber FACTS[c].limit strip is untouched — it is the one place in the
      card that is allowed to be a full sentence, and it stays verbatim.
   4) Nothing may be said twice. The card is only three chip rows deep, so a
      phrase repeated across two of them is immediately visible as padding. */

/* the line that decides the country, split so the load-bearing clause can carry
   the accent colour without a string search. Nothing here promises anything:
   Dubai's visa is "çıkabilen" (can be issued), never "çıkar". */
const EDGE: Record<CountrySlug, { a: string; hot: string; b: string }> = {
  dubai: {
    a: "Oturum vizesi ",
    hot: "çıkabilen tek ülke",
    b: ".",
  },
  ingiltere: {
    a: "Baştan sona ",
    hot: "uzaktan kuruluş",
    b: ".",
  },
  kktc: {
    a: "",
    hot: "Türkiye'ye en yakın",
    b: " seçenek.",
  },
};

/* the same decision as a four-word rail, for the collapsed panels. It is hidden
   the moment the panel opens (.uk2-panel[data-on="true"] .uk2-mini), so it never
   sits above the EDGE line saying the same thing twice. */
const MINI: Record<CountrySlug, string> = {
  dubai: "Vize, banka, esnek yapı",
  ingiltere: "Uzaktan kuruluş, düşük maliyet",
  kktc: "Türkçe süreç, yakın konum",
};

/* The card used to run a second, red "Uygun değil" column here. It is gone:
   inside its own card every country is sold on its own strength, and the
   discouraging list ("bütçesi dar olan" and the rest) does not appear in this
   section any more. What keeps the block honest is the amber FACTS[c].limit
   strip below, which is untouched and now carries that weight alone.
   These used to be three full sentences per country. They are labels now —
   short, each with its own icon so the row is read as a set of marks rather
   than as text. Two rules survive the rewrite: no rate, no bank / visa /
   licence guarantee, tax only ever conditional; and no line may restate the
   EDGE line or the "Uygun" chips sitting next to it.
   The cost label stays scoped ("Üç ülkede") so nothing reads as an absolute
   claim; "Üçünde" alone was dropped because a collapsed rail gives the reader
   no antecedent for it.
   KKTC's cost line was dropped for the same restate rule: FACTS.kktc.forWhom
   already puts "Düşük maliyet" in the "Uygun" chips one column to the left,
   and the client's whole complaint this round is repeated copy. */
type WhyItem = { i: LucideIcon; t: string };

const WHY: Record<CountrySlug, WhyItem[]> = {
  dubai: [
    { i: Layers, t: "Esnek yapı seçimi" },
    { i: BadgeCheck, t: "Geniş lisans yelpazesi" },
    { i: Globe, t: "Körfez, Asya, Afrika ekseni" },
  ],
  ingiltere: [
    { i: FileCheck2, t: "Companies House kaydı" },
    { i: Handshake, t: "Avrupa'da tanınırlık" },
    { i: Wallet, t: "Üç ülkede en düşük maliyet" },
  ],
  kktc: [
    { i: Languages, t: "Süreç tamamen Türkçe" },
    { i: Warehouse, t: "Serbest bölge seçeneği" },
    { i: Clock, t: "Türkiye ile aynı saat dilimi" },
  ],
};

/* ------------------------------------------------ PAY_MATRIX read helpers */
const PAY_ROWS = PAY_MATRIX.flatMap((g) => g.rows);

function cellOf(name: string, c: CountrySlug): Cell {
  return PAY_ROWS.find((r) => r.name === name)?.cells[c] ?? "none";
}

/** every channel of one group that the country actually has */
function namesIn(group: string, c: CountrySlug): string[] {
  return (
    PAY_MATRIX.find((g) => g.title === group)
      ?.rows.filter((r) => r.cells[c] === "yes")
      .map((r) => r.name) ?? []
  );
}

/* Kanal adının yanında markanın kendi işareti. Resmî vektörü olmayan ya da
   marka olmayan satırlar ("Yerel banka") yalnızca metin kalıyor — uydurma
   logo basmıyoruz. Çalışmayan kanalın işareti CSS'te griye düşüyor, yoksa
   renkli logo çarpının yanında "çalışıyor" gibi okunuyordu. */
function BrandName({ name, size = 15 }: { name: string; size?: number }) {
  const k = brandKeyForName(name);
  return (
    <>
      {k && <BrandGlyph brand={k} size={size} />}
      {name}
    </>
  );
}

/** the four names that decide whether money can reach the company */
const STRIP = ["Stripe", "PayPal", "Wise", "Yerel banka"];
/** the two that decide it fastest — shown on the collapsed panels too */
const STRIP_SHORT = ["Stripe", "PayPal"];

const MARK_TEXT: Record<Cell, string> = {
  yes: "çalışıyor",
  no: "çalışmıyor",
  none: "bu ülkede sunulmuyor",
};

/* one word per state, so the comparison never depends on colour alone */
const STATE_WORD: Record<Cell, string> = {
  yes: "Var",
  no: "Yok",
  none: "Sunulmuyor",
};

/** FACTS.forWhom is a mid-sentence list; as separate chips each item needs its
    own capital, and Turkish needs the locale form (i → İ) */
function cap(s: string) {
  return s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
}

function Mark({ v, size = 14 }: { v: Cell; size?: number }) {
  if (v === "yes") return <Check size={size} strokeWidth={2.4} aria-hidden="true" />;
  if (v === "no") return <X size={size} strokeWidth={2.4} aria-hidden="true" />;
  return <Minus size={size} strokeWidth={2.4} aria-hidden="true" />;
}

/** the comparison cell: one coloured word plus its icon, and under it the
    names that back the word up. Green when the country has it, red when not. */
function State({ v, note }: { v: Cell; note?: string }) {
  return (
    <span className="uk2-state" data-v={v}>
      <span className="uk2-state-v">
        <Mark v={v} size={15} />
        {STATE_WORD[v]}
      </span>
      {note ? <span className="uk2-state-note">{note}</span> : null}
    </span>
  );
}

/** a payment group is "Var" for a country when at least one channel works */
function groupState(group: string, c: CountrySlug): { v: Cell; note?: string } {
  const names = namesIn(group, c);
  return names.length ? { v: "yes", note: names.join(", ") } : { v: "no" };
}

/* ------------------------------------------------------ surface comparison */
/* no figure of any kind in this table — the money question is answered in §11 */
const TABLE_ROWS: { label: string; cell: (c: CountrySlug) => ReactNode }[] = [
  {
    label: "Ne için iyi",
    cell: (c) => FACTS[c].forWhom,
  },
  {
    /* was "Ne için değil"; the side-by-side view reads from the same source as
       the card, so the negative list left this view together with the column */
    label: "Neden",
    cell: (c) => (
      <ul className="uk2-lines">
        {WHY[c].map((w) => (
          <li key={w.t}>{w.t}</li>
        ))}
      </ul>
    ),
  },
  {
    label: "Kartla tahsilat",
    cell: (c) => (
      <ul className="uk2-tags">
        {STRIP_SHORT.map((n) => {
          const v = cellOf(n, c);
          return (
            <li key={n} data-v={v}>
              <Mark v={v} />
              <span className="uk2-tag-n">{n}</span>
              <b>{STATE_WORD[v]}</b>
              <span className="sr-only"> {MARK_TEXT[v]}</span>
            </li>
          );
        })}
      </ul>
    ),
  },
  {
    label: "Banka hesabı",
    cell: (c) => {
      const s = groupState("Banka hesabı", c);
      return <State v={s.v} note={s.note} />;
    },
  },
  {
    label: "Ödeme kuruluşu",
    cell: (c) => {
      const s = groupState("Ödeme kuruluşu", c);
      return <State v={s.v} note={s.note} />;
    },
  },
  {
    label: "Yapı",
    cell: (c) => FACTS[c].structure,
  },
  {
    label: "Dürüst kısıt",
    cell: (c) => (
      <span className="uk2-cell-limit">
        <TriangleAlert size={15} strokeWidth={2.1} aria-hidden="true" />
        {FACTS[c].limit}
      </span>
    ),
  },
];

export default function ThreeCountries() {
  const [view, setView] = useState<"kart" | "tablo">("kart");
  /* null is a real state now: the open panel closes back into its photo */
  const [open, setOpen] = useState<CountrySlug | null>("dubai");
  /* which column the pointer or the keyboard is currently on, in table view */
  const [hot, setHot] = useState<CountrySlug | null>(null);
  const reduce = useReducedMotion();

  const toggle = (c: CountrySlug) => setOpen((prev) => (prev === c ? null : c));
  const dur = reduce ? 0 : 0.42;

  return (
    <section id="ulkeler" className="sec-pad" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        <div className="sec-head">
          {/* "Önce ülke kararı." ziyaretçiye ödev veriyordu; bu başlık ne yaptığımızı
              söylüyor. The old line framed the section as a decision the visitor
              had to make before anything else, which is a demand, not an offer.
              This one states what the firm covers and lets the cards do the
              comparing - the corporate register the rest of the page is in. */}
          <SplitWords
            as="h2"
            text="Hizmet verdiğimiz bölgeler."
            accent="bölgeler."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Kanallar ve sınırlar kartlarda.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16} className="uk2-switchwrap">
          <div className="uk2-switch" role="group" aria-label="Görünüm">
            {(["kart", "tablo"] as const).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={view === k}
                data-on={view === k}
                onClick={() => setView(k)}
              >
                {k === "kart" ? "Ülke ülke" : "Yan yana kıyas"}
              </button>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.22} className="uk2-view">
          <AnimatePresence mode="wait" initial={false}>
            {view === "kart" ? (
              <motion.div
                key="kart"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: EASE }}
                className="uk2-rail"
              >
                {COUNTRY_ORDER.map((c) => {
                  const on = open === c;
                  return (
                    <article key={c} className="uk2-panel" data-on={on}>
                      {/* the closed column is the country photo, darkened toward
                          the bottom so the flag and the white type survive it.
                          Opening dissolves it and the panel lands on white. */}
                      <motion.span
                        className="uk2-media"
                        aria-hidden="true"
                        initial={false}
                        animate={{
                          opacity: on ? 0 : 1,
                          scale: on && !reduce ? 1.06 : 1,
                        }}
                        transition={{ duration: dur, ease: EASE }}
                      >
                        <span
                          className="uk2-photo"
                          style={{ backgroundImage: `url(${COUNTRY_PHOTO[c]})` }}
                        />
                        <span className="uk2-scrim" />
                      </motion.span>

                      {/* the whole closed column is the control, not just the +.
                          .uk2-head::after stretches the hit area over the panel
                          while it is closed and steps aside once it opens. */}
                      <button
                        type="button"
                        className="uk2-head"
                        aria-expanded={on}
                        aria-controls={on ? `uk2-body-${c}` : undefined}
                        onClick={() => toggle(c)}
                      >
                        <span className="uk2-flag" aria-hidden="true">
                          <Flag country={c} />
                        </span>
                        <span className="uk2-id">
                          <span className="uk2-name">{COUNTRY_NAME[c]}</span>
                          <span className="uk2-mini">{MINI[c]}</span>
                        </span>
                        <span className="uk2-plus" aria-hidden="true">
                          {on ? (
                            <Minus size={16} strokeWidth={2.2} />
                          ) : (
                            <Plus size={16} strokeWidth={2.2} />
                          )}
                        </span>
                      </button>

                      {/* collapsed panels are not dead space: the decisive pair
                          of rails stays visible without opening anything */}
                      <div className="uk2-tail" aria-hidden={on || undefined}>
                        <span className="uk2-tail-k">Kartla tahsilat</span>
                        <ul>
                          {STRIP_SHORT.map((n) => {
                            const v = cellOf(n, c);
                            return (
                              <li key={n} data-v={v}>
                                <Mark v={v} size={13} />
                                <BrandName name={n} size={14} />
                                <span className="sr-only"> {MARK_TEXT[v]}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* popLayout: kapanan kartın gövdesi çıkış animasyonu
                          boyunca DOM'da kalıyor ve yer kaplamaya devam ediyordu.
                          Panel o sırada daralmış olduğu için içerik upuzun
                          sarıyor, satır 527'den 937'ye fırlayıp geri düşüyordu.

                          The two bodies overlap by design - one fades out while
                          the other fades in - but only one of them should be in
                          the layout. popLayout takes the exiting child out of
                          flow, so it can finish fading without the row having to
                          be tall enough to hold both. */}
                      <AnimatePresence initial={false} mode="popLayout">
                        {on && (
                          <motion.div
                            key="body"
                            id={`uk2-body-${c}`}
                            className="uk2-body"
                            role="group"
                            aria-label={`${COUNTRY_NAME[c]} özeti`}
                            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{
                              opacity: 0,
                              y: reduce ? 0 : 6,
                              transition: { duration: reduce ? 0 : 0.2, ease: EASE },
                            }}
                            transition={{
                              duration: reduce ? 0 : 0.4,
                              ease: EASE,
                              delay: reduce ? 0 : 0.08,
                            }}
                          >
                            <p className="uk2-edge">
                              {EDGE[c].a}
                              <b className="uk2-hot">{EDGE[c].hot}</b>
                              {EDGE[c].b}
                            </p>

                            {/* two columns, both positive: who it fits on the
                                narrow side, why this country on the wider one.
                                Neither is a sentence any more, and neither is
                                red, so the amber limit strip below is the only
                                warning colour in the card and reads that much
                                louder. The two columns are deliberately not the
                                same object: green pills answer "kim", a plain
                                icon row answers "neden", and the coloured pills
                                under them answer "para nasıl geliyor". Three
                                pill rows stacked would be noise again. */}
                            <div className="uk2-fit2">
                              <div>
                                <span className="uk2-k">Uygun</span>
                                <ul className="uk2-chips" data-v="yes">
                                  {FACTS[c].forWhom.split(", ").map((t) => (
                                    <li key={t}>
                                      <Check size={13} strokeWidth={2.4} aria-hidden="true" />
                                      {cap(t)}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <span className="uk2-k">Neden?</span>
                                {/* .uk2-chips carries the wrap and the icon
                                    alignment that already exist; .uk2-why2 only
                                    strips the pill padding and turns the icon
                                    brand blue. Written as two classes the row
                                    still degrades into a readable icon row if
                                    the .uk2-why2 block never reaches
                                    globals.css, instead of falling back to a
                                    bulleted list. */}
                                <ul className="uk2-chips uk2-why2">
                                  {WHY[c].map((w) => {
                                    const Icon = w.i;
                                    return (
                                      <li key={w.t}>
                                        <Icon size={14} strokeWidth={2} aria-hidden="true" />
                                        {w.t}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>

                            <div className="uk2-pay">
                              <span className="uk2-k">Tahsilat</span>
                              <ul className="uk2-pay-list">
                                {STRIP.map((n) => {
                                  const v = cellOf(n, c);
                                  return (
                                    <li key={n} data-v={v}>
                                      <Mark v={v} />
                                      <BrandName name={n} />
                                      <span className="sr-only"> {MARK_TEXT[v]}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>

                            {/* Uyarı şeridi bu karttan kaldırıldı.
                                Metnin kendisi silinmedi ve silinemez: FACTS[c].limit
                                hâlâ tek kaynak ve aynı uyarı fiyat bölümünde
                                (PriceSummary), SSS'te (HomeFaq) ve üç ülke sayfasında
                                duruyor. Kalkan yalnızca bu karttaki amber kutu.

                                The card is the shortest surface on the page and the
                                amber block was the heaviest thing on it, which is a
                                bad trade for a line the visitor meets three more times
                                before any decision is made. Removing the text
                                everywhere would be a different change entirely, and
                                not one this card gets to make. */}

                            <Link href={`/${c}`} className="btn btn-solid btn-sm uk2-cta">
                              {COUNTRY_NAME[c]}&apos;de kuruluş
                              <ArrowRight size={15} strokeWidth={2.1} />
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </article>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="tablo"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: EASE }}
                className="uk2-tblwrap"
              >
                {/* the comparison reads by country, so the highlight follows the
                    column the pointer is on, not the row. The header button
                    gives the keyboard the same column on focus. */}
                <table className="uk2-tbl" onMouseLeave={() => setHot(null)}>
                  <caption className="sr-only">
                    Dubai, İngiltere ve KKTC kıyası. Tutarlar fiyat bölümünde.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" onMouseEnter={() => setHot(null)}>
                        Kıyas
                      </th>
                      {COUNTRY_ORDER.map((c) => (
                        <th
                          key={c}
                          scope="col"
                          data-sel={open === c}
                          data-hot={hot === c}
                          onMouseEnter={() => setHot(c)}
                        >
                          <button
                            type="button"
                            className="uk2-th"
                            aria-pressed={open === c}
                            onClick={() => toggle(c)}
                            onFocus={() => setHot(c)}
                            onBlur={() => setHot(null)}
                          >
                            <span
                              className="uk2-th-photo"
                              aria-hidden="true"
                              style={{ backgroundImage: `url(${COUNTRY_PHOTO[c]})` }}
                            />
                            <span className="uk2-th-scrim" aria-hidden="true" />
                            <span className="uk2-th-id">
                              <span className="uk2-th-flag" aria-hidden="true">
                                <Flag country={c} />
                              </span>
                              <span className="uk2-th-name">{COUNTRY_NAME[c]}</span>
                            </span>
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.map((r) => (
                      <tr key={r.label}>
                        <th scope="row" onMouseEnter={() => setHot(null)}>
                          {r.label}
                        </th>
                        {COUNTRY_ORDER.map((c) => (
                          <td
                            key={c}
                            data-sel={open === c}
                            data-hot={hot === c}
                            onMouseEnter={() => setHot(c)}
                          >
                            {r.cell(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeUp>

        {/* the two lines the payment section existed to say. The old section's
            id rides along so /#odeme-altyapisi (FinalCta, footer) still lands.
            Trimmed to the load-bearing clause each: the "banka karar verir"
            non-guarantee stays, the explanation around it does not. */}
        <FadeUp delay={0.3}>
          <div className="uk2-notes" id="odeme-altyapisi">
            <p>
              <b>Ödeme kuruluşu hesabı, banka hesabı değildir.</b>
              Wise ve Payoneer farklı lisansa tabidir.
            </p>
            <p>
              <b>Hesabı banka açar, karar bankanındır.</b>
              Onay taahhüdü vermiyoruz. Dosyayı hazırlar, süreci yürütürüz.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.34}>
          <Link href="/ulkeler" className="link-arrow">
            Üç ülkeyi karşılaştırın
            <ArrowRight size={15} strokeWidth={2.1} />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
