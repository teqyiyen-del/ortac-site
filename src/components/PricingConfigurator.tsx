"use client";

import SmartLink from "@/components/shared/SmartLink";
import { useEffect, useState } from "react";
import { animate, AnimatePresence, motion, useMotionValue } from "motion/react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { configure, TIER_META, TIER_PRICE, type ConfigLine } from "@/lib/pricing";
import {
  ACTIVITY_LABELS,
  COUNTRY_LABELS,
  useOrtacStore,
  type Activity,
  type Country,
  type Tier,
} from "@/lib/store";
import { gtm } from "@/lib/gtm";

/* SWAP:CALENDLY_URL */
const CALENDLY_URL = "#";

/* PARKED — the live configurator build of the pricing section. Not mounted on
   the landing page right now (Packages.tsx renders the card layout instead);
   kept intact so it can be swapped back in without rebuilding it.

   The price is configured, not listed. Everything the visitor picks — starting
   with the country they already chose on the hero globe — moves the number on
   the right, so the page never asks the same question twice. */
const COUNTRIES: Country[] = ["dubai", "ingiltere", "kktc"];
const TIERS: Tier[] = ["basic", "gold", "platinium"];
const ACTIVITIES: Activity[] = [
  "e-ticaret",
  "yazilim",
  "danismanlik",
  "gayrimenkul",
  "saglik",
  "finans",
];

const ENTERPRISE_POINTS = [
  "Birden fazla ülke / birden fazla şirket",
  "Grup yapısı ve holding kurgusu",
  "Kadro vizesi ve toplu başvuru",
  "Özel muhasebe ve raporlama düzeni",
];

const money = (n: number) => `$${n.toLocaleString("tr-TR")}`;

/* the headline number counts to its new value instead of snapping */
function Amount({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const [text, setText] = useState(money(value));
  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setText(money(Math.round(v / 50) * 50)),
    });
    return () => controls.stop();
  }, [value, mv]);
  return <span className="cfg-total-n">{text}</span>;
}

function Chip({
  on,
  onClick,
  children,
  sub,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <button type="button" className="cfg-chip" data-on={on} onClick={onClick} aria-pressed={on}>
      <span className="cfg-chip-t">{children}</span>
      {sub && <span className="cfg-chip-s">{sub}</span>}
    </button>
  );
}

function Stepper({
  value,
  onChange,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  max: number;
}) {
  return (
    <div className="cfg-step">
      <button type="button" aria-label="Azalt" onClick={() => onChange(value - 1)} disabled={value <= 0}>
        −
      </button>
      <span className="cfg-step-v">{value}</span>
      <button type="button" aria-label="Artır" onClick={() => onChange(value + 1)} disabled={value >= max}>
        +
      </button>
    </div>
  );
}

function Toggle({
  on,
  onChange,
  label,
  note,
  locked,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
  note?: string;
  locked?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className="cfg-toggle"
      data-on={on}
      disabled={locked}
      onClick={() => onChange(!on)}
    >
      <span className="cfg-toggle-track" aria-hidden="true">
        <span className="cfg-toggle-knob" />
      </span>
      <span className="cfg-toggle-text">
        {label}
        {note && <span>{note}</span>}
      </span>
    </button>
  );
}

export default function PricingConfigurator() {
  const country = useOrtacStore((s) => s.country);
  const tier = useOrtacStore((s) => s.tier);
  const activity = useOrtacStore((s) => s.activity);
  const visas = useOrtacStore((s) => s.visas);
  const bank = useOrtacStore((s) => s.bank);
  const accounting = useOrtacStore((s) => s.accounting);
  const setCountry = useOrtacStore((s) => s.setCountry);
  const setTier = useOrtacStore((s) => s.setTier);
  const setActivity = useOrtacStore((s) => s.setActivity);
  const setVisas = useOrtacStore((s) => s.setVisas);
  const setBank = useOrtacStore((s) => s.setBank);
  const setAccounting = useOrtacStore((s) => s.setAccounting);

  const r = configure({ country, tier, activity, visas, bank, accounting });
  const visaAvailable = r.perVisa > 0;

  return (
    <section id="hesaplayici" className="pr-section">
      <div className="container-o">
        <div className="sec-head sec-head-dark">
          <SplitWords
            as="h2"
            text="Kurulumunuzu seçin, fiyat anında çıksın."
            accent="fiyat anında çıksın."
            base={0.1}
            className="h2"
            style={{ color: "#ffffff" }}
          />
          <FadeUp delay={0.24}>
            <p className="sec-lead sec-lead-dark">
              Ülke, paket ve ek hizmetleri seçin; tutar sağda satır satır oluşur.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.3}>
          <div className="cfg">
            {/* ---------------- choices ---------------- */}
            <div className="cfg-form">
              <div className="cfg-field">
                <span className="cfg-label">Ülke</span>
                <div className="cfg-row">
                  {COUNTRIES.map((c) => (
                    <Chip key={c} on={country === c} onClick={() => setCountry(c)}>
                      {COUNTRY_LABELS[c]}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="cfg-field">
                <span className="cfg-label">Paket</span>
                <div className="cfg-row">
                  {TIERS.map((t) => (
                    <Chip
                      key={t}
                      on={tier === t}
                      onClick={() => {
                        setTier(t);
                        gtm("package_select", { package: t, country });
                      }}
                      sub={money(TIER_PRICE[country][t])}
                    >
                      {TIER_META[t].name}
                    </Chip>
                  ))}
                </div>
                <p className="cfg-hint">{TIER_META[tier].info}</p>
              </div>

              <div className="cfg-field">
                <span className="cfg-label">Faaliyet alanı</span>
                <div className="cfg-row cfg-row-wrap">
                  {ACTIVITIES.map((a) => (
                    <Chip key={a} on={activity === a} onClick={() => setActivity(a)}>
                      {ACTIVITY_LABELS[a]}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="cfg-field cfg-field-split">
                {visaAvailable && (
                  <div className="cfg-mini">
                    <span className="cfg-label">Vize</span>
                    <Stepper value={visas} onChange={setVisas} max={4} />
                    {r.includes.visas > 0 && (
                      <span className="cfg-inc">{r.includes.visas} kişi dahil</span>
                    )}
                  </div>
                )}
                <div className="cfg-switches">
                  <Toggle
                    on={bank || r.includes.bank}
                    locked={r.includes.bank}
                    onChange={setBank}
                    label="Banka hesabı"
                    note={r.includes.bank ? "pakete dahil" : undefined}
                  />
                  <Toggle
                    on={accounting || r.includes.accounting}
                    locked={r.includes.accounting}
                    onChange={setAccounting}
                    label="Yıllık muhasebe"
                    note={r.includes.accounting ? "pakete dahil" : undefined}
                  />
                </div>
              </div>
            </div>

            {/* ---------------- live total ---------------- */}
            <div className="cfg-out">
              <span className="cfg-out-k">Tahmini kurulum tutarı</span>
              <Amount value={r.total} />

              <div className="cfg-lines">
                <AnimatePresence initial={false}>
                  {r.lines.map((l: ConfigLine) => (
                    <motion.div
                      key={l.label}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="cfg-line"
                      data-base={l.base || undefined}
                    >
                      <span>{l.label}</span>
                      <span className="cfg-line-a">
                        {l.base ? money(l.amount) : `+${money(l.amount)}`}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="cfg-meta">
                <span>
                  Süre<b>{r.duration}</b>
                </span>
                <span>
                  Lisans<b>{r.license}</b>
                </span>
              </div>

              <SmartLink
                href={`/basla?ulke=${country}&paket=${tier}`}
                onClick={() => gtm("config_start", { country, tier, total: r.total })}
                className="btn btn-primary btn-full"
              >
                Bu kurulumla başlayın
                <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                  <path
                    d="M3 8 H12.5 M9 4.5 L12.5 8 L9 11.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SmartLink>
              <p className="cfg-note">
                Tutarlar temsilidir; nihai teklif faaliyet ve belgelere göre netleşir.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* ---------------- enterprise ---------------- */}
        <FadeUp delay={0.42}>
          <div className="pr-ent">
            <div>
              <span className="pr-ent-tag">Enterprise</span>
              <h3 className="pr-ent-title">Birden fazla şirket, birden fazla ülke</h3>
              <p className="pr-ent-line">
                Grup yapısı, kadro vizesi ve çoklu ülke operasyonu için paket değil kurgu
                yapıyoruz. Fiyat, yapıya göre çıkarılır.
              </p>
            </div>
            <ul className="pr-ent-points">
              {ENTERPRISE_POINTS.map((e) => (
                <li key={e}>
                  <span className="rm-dot" aria-hidden="true" />
                  {e}
                </li>
              ))}
            </ul>
            <div className="pr-ent-cta">
              <SmartLink
                href={CALENDLY_URL}
                onClick={() => gtm("package_select", { package: "enterprise" })}
                className="btn btn-primary"
              >
                Yapını konuşalım
              </SmartLink>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
