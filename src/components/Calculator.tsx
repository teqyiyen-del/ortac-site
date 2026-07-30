"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import CountUp from "@/components/shared/CountUp";
import CrossFade from "@/components/shared/CrossFade";
import SweepButton from "@/components/shared/SweepButton";
import { COUNTRY_PHOTO } from "@/lib/media";
import { ACTIVITY_FACTOR, PRICING, computeEstimate } from "@/lib/pricing";
import {
  ACTIVITY_LABELS,
  COUNTRY_LABELS,
  useOrtacStore,
  type Activity,
  type Country,
} from "@/lib/store";
import { gtm } from "@/lib/gtm";

/* SWAP:CALENDLY_URL — "#" (disabled) until the live scheduling URL arrives */
const CALENDLY_URL = "#";

function Caret() {
  return (
    <svg
      viewBox="0 0 10 6"
      width="10"
      height="6"
      aria-hidden="true"
      style={{
        position: "absolute",
        right: 12,
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
      }}
    >
      <path d="M1 1 L5 5 L9 1" stroke="var(--text-600)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

const rowLabel: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.6,
  color: "var(--text-600)",
};

const fmt = new Intl.NumberFormat("de-DE");

export default function Calculator() {
  const { country, activity, visas, bank, setCountry, setActivity, setVisas, setBank } =
    useOrtacStore();

  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "0px 0px -15% 0px" });

  /* result price plays once the card has landed */
  const [playPrice, setPlayPrice] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setPlayPrice(true), 240);
    return () => clearTimeout(t);
  }, [inView]);

  const est = computeEstimate({ country, activity, visas, bank });
  const query = `ulke=${country}&faaliyet=${activity}&vize=${visas}&banka=${bank ? "evet" : "hayir"}`;

  /* the same formula, itemised — radical price transparency is the differentiator */
  const p = PRICING[country];
  const breakdown = [
    {
      k: "Lisans + tescil",
      v: Math.round(p.base * ACTIVITY_FACTOR[activity]),
      tone: "var(--blue-600)",
    },
    ...(visas > 0 && p.perVisa > 0
      ? [
          {
            k: `Vize · ${visas} kişi`,
            v: visas * p.perVisa,
            tone: "var(--blue-500)",
          },
        ]
      : []),
    ...(bank
      ? [{ k: "Banka desteği", v: p.bank, tone: "var(--chart-blue)" }]
      : []),
  ];
  const breakdownTotal = Math.max(
    breakdown.reduce((s, b) => s + b.v, 0),
    1,
  );

  /* GTM: calculator_change — debounced 800ms with full state */
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => {
      gtm("calculator_change", {
        country,
        activity,
        visas,
        bank: bank ? "evet" : "hayir",
        setup: est.setup,
        annual: est.annual,
      });
    }, 800);
    return () => clearTimeout(t);
  }, [country, activity, visas, bank, est.setup, est.annual]);

  /* visual 36px control, 44×44 hit-area */
  const stepBtn: React.CSSProperties = {
    width: 44,
    height: 44,
    padding: 0,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const stepBtnInner: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: "var(--r-sm)",
    border: "1px solid var(--border)",
    background: "var(--white)",
    color: "var(--text-900)",
    fontSize: 16,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const metaRows = [
    {
      k: "Yıllık yenileme",
      v: (
        <CountUp value={est.annual} play={playPrice} fontSize={14} color="#ffffff" />
      ),
    },
    {
      k: "Tahmini süre",
      v: (
        <CrossFade
          text={est.duration}
          style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#ffffff" }}
        />
      ),
    },
    {
      k: "Lisans tipi",
      v: (
        <CrossFade
          text={est.license}
          style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#ffffff" }}
        />
      ),
    },
  ];

  return (
    <section id="hesaplayici" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">

        {/* HEADER — no eyebrow; the section opens with its headline */}
        <div style={{ maxWidth: 720, marginTop: 48 }}>
          <SplitWords
            as="h2"
            text="Kuruluş maliyetinizi hesaplayın."
            accent="hesaplayın."
            base={0.1}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              fontSize: "clamp(30px, 3.4vw, 44px)",
              color: "var(--text-900)",
            }}
          />
          <FadeUp delay={0.28}>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--text-600)",
                marginTop: 16,
                maxWidth: "52ch",
              }}
            >
              Ülke ve faaliyetinizi seçin; kuruluş, vize ve banka kalemleri ile yıllık
              yenileme tutarı kalem kalem çıkar.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.4} y={32} duration={0.8}>
          <div ref={cardRef} className="calc-card" style={{ marginTop: 48 }}>
            {/* CONTROLS */}
            <div className="calc-controls">
              <div className="calc-seg" role="radiogroup" aria-label="Ülke">
                {(Object.keys(COUNTRY_LABELS) as Country[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={country === c}
                    className="calc-opt"
                    onClick={() => setCountry(c)}
                  >
                    {COUNTRY_LABELS[c]}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3">
                <label htmlFor="calc-activity" style={rowLabel}>
                  Ne iş yapıyorsunuz?
                </label>
                <span style={{ position: "relative", display: "inline-flex" }}>
                  <select
                    id="calc-activity"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value as Activity)}
                    style={{
                      height: 36,
                      paddingInline: "12px 32px",
                      borderRadius: "var(--r-sm)",
                      border: "1px solid var(--border)",
                      background: "var(--paper)",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: 14,
                      lineHeight: 1.4,
                      color: "var(--text-900)",
                      appearance: "none",
                      WebkitAppearance: "none",
                      cursor: "pointer",
                    }}
                  >
                    {(Object.keys(ACTIVITY_LABELS) as Activity[]).map((key) => (
                      <option key={key} value={key}>
                        {ACTIVITY_LABELS[key]}
                      </option>
                    ))}
                  </select>
                  <Caret />
                </span>
              </div>

              {/* SWAP:UK_VISA_CONFIRM — row hidden for UK, 250ms collapse */}
              <AnimatePresence initial={false}>
                {country !== "ingiltere" && (
                  <motion.div
                    key="visa-row"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
                    style={{ overflow: "hidden", marginBlock: -11 }}
                  >
                    <div className="flex items-center justify-between gap-3 py-3">
                      <span style={rowLabel}>Kaç kişi vize alacak?</span>
                      <span className="flex items-center">
                        <button
                          type="button"
                          aria-label="Azalt"
                          style={{ ...stepBtn, opacity: visas <= 0 ? 0.35 : 1 }}
                          onClick={() => setVisas(visas - 1)}
                        >
                          <span style={stepBtnInner}>−</span>
                        </button>
                        <motion.span
                          key={visas}
                          initial={{ scale: 1.15 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 26,
                            mass: 0.9,
                          }}
                          className="data"
                          style={{
                            width: 40,
                            display: "inline-flex",
                            justifyContent: "center",
                            fontSize: 16,
                            color: "var(--text-900)",
                          }}
                        >
                          {visas}
                        </motion.span>
                        <button
                          type="button"
                          aria-label="Artır"
                          style={{ ...stepBtn, opacity: visas >= 5 ? 0.35 : 1 }}
                          onClick={() => setVisas(visas + 1)}
                        >
                          <span style={stepBtnInner}>+</span>
                        </button>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between gap-3">
                <span style={rowLabel}>Banka hesabı gerekli mi?</span>
                <span
                  className="grid grid-cols-2 gap-2"
                  role="radiogroup"
                  aria-label="Banka tercihi"
                >
                  {[
                    { v: true, label: "Evet" },
                    { v: false, label: "Hayır" },
                  ].map((o) => (
                    <button
                      key={o.label}
                      type="button"
                      role="radio"
                      aria-checked={bank === o.v}
                      className="calc-chip"
                      onClick={() => setBank(o.v)}
                    >
                      {o.label}
                    </button>
                  ))}
                </span>
              </div>

              {/* live breakdown — where the money actually goes */}
              <div style={{ marginTop: 4 }}>
                <span className="tag" style={{ fontSize: 10, color: "var(--text-600)" }}>
                  MALİYET KIRILIMI
                </span>
                <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                  {breakdown.map((b) => (
                    <div key={b.k}>
                      <div
                        className="flex items-baseline justify-between gap-3"
                        style={{ fontSize: 13, lineHeight: 1.5 }}
                      >
                        <span style={{ color: "var(--text-600)" }}>{b.k}</span>
                        <span className="data" style={{ color: "var(--text-900)" }}>
                          ${fmt.format(b.v)}
                        </span>
                      </div>
                      <span
                        aria-hidden="true"
                        style={{
                          display: "block",
                          height: 5,
                          borderRadius: 3,
                          background: "var(--paper)",
                          overflow: "hidden",
                          marginTop: 5,
                        }}
                      >
                        <motion.span
                          initial={false}
                          animate={{ scaleX: b.v / breakdownTotal }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            display: "block",
                            height: "100%",
                            background: b.tone,
                            transformOrigin: "left",
                          }}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* what's included */}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 18,
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px 18px",
                }}
              >
                {["Lisans + tescil", "Evrak takibi", "Panel erişimi"].map((f) => (
                  <span
                    key={f}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "var(--text-600)",
                    }}
                  >
                    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                      <path
                        d="M3 8.5 L6.5 12 L13 5"
                        stroke="var(--green-600)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* RESULT — night panel, Dubai skyline behind the number */}
            <div className="calc-result">
              {/* country photo behind the number — swaps with the selection */}
              <span
                className="calc-photo"
                aria-hidden="true"
                style={{ backgroundImage: `url(${COUNTRY_PHOTO[country]})` }}
              />
              <span className="calc-photo-scrim" aria-hidden="true" />

              <p className="tag" style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                TAHMİNİ KURULUŞ ·{" "}
                <CrossFade
                  text={COUNTRY_LABELS[country]}
                  style={{ minHeight: 15, color: "rgba(255,255,255,0.85)" }}
                />
              </p>
              <div style={{ marginTop: 8 }}>
                <CountUp value={est.setup} play={playPrice} fontSize={44} color="#ffffff" />
              </div>

              <div style={{ marginTop: 20 }}>
                {metaRows.map((row, i) => (
                  <div
                    key={row.k}
                    className="flex items-baseline justify-between gap-3"
                    style={{
                      paddingBlock: 10,
                      borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
                      fontSize: 14,
                    }}
                  >
                    <span
                      style={{ color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}
                    >
                      {row.k}
                    </span>
                    {row.v}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24 }}>
                <SweepButton
                  size="lg"
                  variant="inverse"
                  full
                  href={`/basla?${query}`}
                  onClick={() =>
                    gtm("calculator_submit", {
                      country,
                      activity,
                      visas,
                      bank: bank ? "evet" : "hayir",
                      setup: est.setup,
                    })
                  }
                >
                  Kurulumu başlat
                </SweepButton>
              </div>
              <a
                href={`/rapor?${query}`}
                onClick={() => gtm("calculator_pdf_click", { country, setup: est.setup })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 46,
                  marginTop: 10,
                  borderRadius: "var(--r-md)",
                  border: "1px solid rgba(255,255,255,0.32)",
                  color: "#ffffff",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                PDF olarak e-postama gönder
              </a>

              <p style={{ marginTop: 14 }}>
                <a
                  href={CALENDLY_URL}
                  onClick={() => gtm("calculator_meeting_click")}
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.66)",
                    textDecoration: "none",
                  }}
                >
                  veya ücretsiz danışmanlık planlayın
                </a>
              </p>

            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
