"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  ArrowRight,
  Calculator,
  IdCard,
  Info,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import CountUp from "@/components/shared/CountUp";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_NAME, COUNTRY_ORDER, FACTS, type CountrySlug } from "@/lib/brand";
import { PRICING } from "@/lib/pricing";

/* §11 — the numbers block is a comparison, not a price list. The starting
   figure always comes from FACTS (single source of truth); the add-on amounts
   come from PRICING. Package names and the full calculator stay on /fiyatlar. */

const EASE = [0.22, 1, 0.36, 1] as const;

const nf = new Intl.NumberFormat("de-DE");
const money = (n: number) => `$${nf.format(n)}`;

const SCOPE: Record<CountrySlug, string> = {
  dubai: "Lisans, tescil ve kuruluş evrakı",
  ingiltere: "Tescil, kayıtlı adres ve vergi kaydı",
  kktc: "Tescil, ana sözleşme ve vergi kaydı",
};

type NeedKey = "banka" | "muhasebe" | "vize";

const NEEDS: { key: NeedKey; chip: string; line: string; icon: LucideIcon }[] = [
  { key: "banka", chip: "Banka hesabı", line: "Banka hesabı desteği", icon: Landmark },
  { key: "muhasebe", chip: "Yıllık muhasebe", line: "Yıllık muhasebe", icon: Calculator },
  { key: "vize", chip: "Oturum & vize", line: "Oturum & vize · 1 kişi", icon: IdCard },
];

/* the honest footnote that belongs to a specific line, not to the section */
const LINE_NOTE: Record<NeedKey, Partial<Record<CountrySlug, string>>> = {
  banka: { kktc: "Hesap açılışında banka fiziki ziyaret isteyebiliyor" },
  muhasebe: {},
  vize: {
    dubai: "Vize ve biyometri için BAE'ye gelmek gerekiyor",
    ingiltere: "Şirket kuruluşu oturum hakkı vermiyor, ayrı bir yol gerekir",
  },
};

function needAmount(key: NeedKey, c: CountrySlug): number {
  const p = PRICING[c];
  if (key === "banka") return p.bank;
  if (key === "muhasebe") return p.annual;
  return p.perVisa;
}

export default function PriceSummary() {
  const [on, setOn] = useState<Record<NeedKey, boolean>>({
    banka: false,
    muhasebe: false,
    vize: false,
  });

  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "0px 0px -15% 0px" });

  const toggle = (k: NeedKey) => setOn((s) => ({ ...s, [k]: !s[k] }));
  const picked = NEEDS.filter((n) => on[n.key]);

  return (
    <section className="sec-pad sec-night fy2">
      <div className="container-o">
        <div className="sec-head sec-head-dark">
          <SplitWords
            as="h2"
            text="Rakamlar, ihtiyacınıza göre."
            accent="ihtiyacınıza göre."
            className="h2"
            style={{ color: "#ffffff" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead sec-lead-dark">
              Şirket kuruluşu her üçünde de var. Ek olarak neye ihtiyacınız olduğunu
              seçin, üç ülkenin tutarı aynı anda güncellensin.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.26}>
          <div className="fy2-needs">
            <span className="fy2-needs-q">Kuruluşa ek olarak:</span>
            <div className="fy2-chips">
              {NEEDS.map((n) => {
                const Icon = n.icon;
                return (
                  <button
                    key={n.key}
                    type="button"
                    className="fy2-chip"
                    data-on={on[n.key]}
                    aria-pressed={on[n.key]}
                    onClick={() => toggle(n.key)}
                  >
                    <Icon size={16} strokeWidth={2.1} />
                    {n.chip}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* the figures change without a page move — announce them once, not 3x */}
        <p className="sr-only" aria-live="polite">
          {COUNTRY_ORDER.map(
            (c) =>
              `${COUNTRY_NAME[c]} ${money(
                FACTS[c].from + picked.reduce((s, n) => s + needAmount(n.key, c), 0),
              )}`,
          ).join(", ")}
        </p>

        <div className="fy2-cols" ref={gridRef}>
          {COUNTRY_ORDER.map((c, i) => {
            const base = FACTS[c].from;
            const extra = picked.reduce((s, n) => s + needAmount(n.key, c), 0);
            const total = base + extra;

            return (
              <FadeUp key={c} delay={0.1 + i * 0.07} className="fy2-col">
                <div className="fy2-col-h">
                  <span className="fy2-flag" aria-hidden="true">
                    <Flag country={c} />
                  </span>
                  <h3 className="fy2-name">{COUNTRY_NAME[c]}</h3>
                  <span className="fy2-days">{FACTS[c].days}</span>
                </div>
                <div className="fy2-rule" aria-hidden="true" />

                <div className="fy2-tot">
                  <CountUp value={total} play={inView} fontSize={46} color="#ffffff" />
                  <AnimatePresence initial={false}>
                    {extra > 0 ? (
                      <motion.span
                        className="fy2-delta"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.28, ease: EASE }}
                      >
                        +{money(extra)} ek kalem
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </div>
                <p className="fy2-tot-note">
                  {extra > 0 ? "Seçtiklerinizle tahmini toplam" : "Kuruluş başlangıç tutarı"}
                </p>

                <ul className="fy2-lines">
                  <li className="fy2-line">
                    <div className="fy2-line-in">
                      <span className="fy2-line-l">
                        Şirket kuruluşu
                        <i>{SCOPE[c]}</i>
                      </span>
                      <span className="fy2-line-v">{FACTS[c].fromLabel}</span>
                    </div>
                  </li>

                  <AnimatePresence initial={false}>
                    {picked.map((n) => {
                      const amount = needAmount(n.key, c);
                      const note = LINE_NOTE[n.key][c];
                      return (
                        <motion.li
                          key={n.key}
                          className="fy2-line"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.34, ease: EASE }}
                        >
                          <div className="fy2-line-in">
                            <span className="fy2-line-l">
                              {n.line}
                              {note ? <i>{note}</i> : null}
                            </span>
                            <span className="fy2-line-v" data-na={amount === 0}>
                              {amount > 0 ? money(amount) : "kapsam dışı"}
                            </span>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>

                <div className="fy2-acts">
                  <Link
                    href={`/basla?ulke=${c}`}
                    className="btn btn-solid btn-sm btn-full"
                  >
                    Kurulumu başlat
                    <ArrowRight size={15} strokeWidth={2.1} />
                  </Link>
                  <Link href={`/${c}`} className="btn btn-line btn-sm btn-full">
                    Detaylı fiyat
                  </Link>
                </div>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp delay={0.32}>
          <div className="fy2-foot">
            <p className="fy2-note">
              <Info size={15} strokeWidth={2.1} />
              Tutarlar tahminîdir. Nihai teklif faaliyet, yapı ve belgelere göre
              netleşir; resmî harçlar ile üçüncü taraf ücretleri değişebilir.
            </p>
            <Link href="/fiyatlar" className="link-arrow fy2-more">
              Tüm kalemleri ve hesaplayıcıyı aç
              <ArrowRight size={15} strokeWidth={2.1} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
