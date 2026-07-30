"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CountUp from "@/components/shared/CountUp";
import { computeEstimate } from "@/lib/pricing";
import {
  ACTIVITY_LABELS,
  COUNTRY_LABELS,
  useOrtacStore,
  type Activity,
  type Country,
} from "@/lib/store";
import { useLenis } from "@/components/Providers";
import { gtm } from "@/lib/gtm";

/* Rehberli başlangıç — the hero's blue card: three questions that write to the
   shared store, so the calculator (§3) arrives already answered. */

const COUNTRY_LINES: Record<Country, string> = {
  dubai: "%0 gelir vergisi · 7-14 gün",
  ingiltere: "AB'ye yakın · 3-7 gün",
  kktc: "Düşük maliyet · TR'ye yakın",
};

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;
const SPRING_UI = { type: "spring", stiffness: 260, damping: 26, mass: 0.9 } as const;

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" style={{ flex: "none" }}>
      <path
        d="M3 8.5 L6.5 12 L13 5"
        stroke="var(--text-900)"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Arrow({ shift }: { shift: boolean }) {
  return (
    <svg
      viewBox="0 0 14 14"
      width="14"
      height="14"
      aria-hidden="true"
      style={{
        transform: shift ? "translateX(3px)" : "translateX(0)",
        transition: "transform 200ms var(--ease-out-soft)",
      }}
    >
      <path
        d="M2 7 H11 M7.5 3.5 L11 7 L7.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Option = { value: string; label: string; hint?: string };

export default function HeroWizard() {
  const lenis = useLenis();
  const {
    country,
    activity,
    visas,
    bank,
    setCountry,
    setActivity,
    setBank,
  } = useOrtacStore();

  const [step, setStep] = useState(0); // 0,1,2 = questions · 3 = result
  const [hoverCalc, setHoverCalc] = useState(false);
  const est = computeEstimate({ country, activity, visas, bank });

  const QUESTIONS: {
    key: "country" | "activity" | "bank";
    q: string;
    cols: 1 | 2;
    options: Option[];
    selected: string;
    pick: (v: string) => void;
  }[] = [
    {
      key: "country",
      q: "Nereden başlayalım?",
      cols: 1,
      options: (Object.keys(COUNTRY_LABELS) as Country[]).map((c) => ({
        value: c,
        label: COUNTRY_LABELS[c],
        hint: COUNTRY_LINES[c],
      })),
      selected: country,
      pick: (v) => {
        setCountry(v as Country);
        gtm("hero_country_select", { country: v });
      },
    },
    {
      key: "activity",
      q: "Ne iş yapıyorsunuz?",
      cols: 2,
      options: (Object.keys(ACTIVITY_LABELS) as Activity[]).map((a) => ({
        value: a,
        label: ACTIVITY_LABELS[a],
      })),
      selected: activity,
      pick: (v) => setActivity(v as Activity),
    },
    {
      key: "bank",
      q: "Banka hesabı gerekli mi?",
      cols: 2,
      options: [
        { value: "evet", label: "Evet", hint: "Wio / Mashreq başvurusu" },
        { value: "hayir", label: "Hayır", hint: "Sadece kuruluş" },
      ],
      selected: bank ? "evet" : "hayir",
      pick: (v) => setBank(v === "evet"),
    },
  ];

  const total = QUESTIONS.length;
  const current = QUESTIONS[Math.min(step, total - 1)];
  const done = step >= total;

  const query = `ulke=${country}&faaliyet=${activity}&vize=${visas}&banka=${bank ? "evet" : "hayir"}`;

  const goCalculator = () => {
    gtm("hero_preview_calc_click", { country });
    if (lenis) lenis.scrollTo("#hesaplayici", { duration: 1.1 });
    else document.querySelector("#hesaplayici")?.scrollIntoView();
  };

  return (
    <div
      className="hero-wizard"
      style={{
        background: "#ffffff",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
        padding: 24,
      }}
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              fontSize: 17,
              lineHeight: 1.25,
              color: "var(--text-900)",
            }}
          >
            {done ? "Sana uygun kurulum" : current.q}
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.5,
              color: "var(--text-600)",
              marginTop: 4,
            }}
          >
            {done ? "Kuruluma buradan devam edebilirsiniz." : "Üç soru, bir dakika."}
          </p>
        </div>
        <span
          className="tag data"
          style={{
            fontSize: 10,
            color: "var(--text-600)",
            whiteSpace: "nowrap",
            paddingTop: 3,
          }}
        >
          {Math.min(step + 1, total)}/{total}
        </span>
      </div>

      {/* body — clipped: the step slide must not widen the page */}
      <div style={{ marginTop: 16, minHeight: 208, overflow: "hidden" }}>
        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE_OUT_QUINT }}
            >
              <div
                style={{
                  background: "var(--paper)",
                  borderRadius: "var(--r-md)",
                  padding: "16px 18px",
                }}
              >
                <span className="tag" style={{ fontSize: 10, color: "var(--text-600)" }}>
                  TAHMİNİ KURULUŞ · {COUNTRY_LABELS[country]}
                </span>
                <div style={{ display: "flex", alignItems: "baseline", marginTop: 6 }}>
                  <CountUp value={est.setup} fontSize={34} />
                  <span
                    className="data"
                    style={{ fontSize: 13, color: "var(--text-600)", marginLeft: 10 }}
                  >
                    {est.duration}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between gap-3"
                  style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: "1px solid var(--border)",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "var(--text-600)" }}>Yıllık yenileme</span>
                  <span className="data" style={{ color: "var(--text-900)" }}>
                    <CountUp value={est.annual} fontSize={13} />
                  </span>
                </div>
                <div
                  className="flex items-center justify-between gap-3"
                  style={{ marginTop: 8, fontSize: 13, lineHeight: 1.5 }}
                >
                  <span style={{ color: "var(--text-600)" }}>Lisans</span>
                  <span
                    className="data"
                    style={{ color: "var(--text-900)", textAlign: "right" }}
                  >
                    {est.license}
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gap: 8, marginTop: 14 }}>
                <a
                  href={`/basla?${query}`}
                  onClick={() => gtm("hero_cta_click")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 46,
                    borderRadius: "var(--r-md)",
                    background: "var(--blue-700)",
                    color: "#ffffff",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: "none",
                  }}
                >
                  Kurulumu Başlat
                </a>
                <button
                  type="button"
                  onClick={goCalculator}
                  onMouseEnter={() => setHoverCalc(true)}
                  onMouseLeave={() => setHoverCalc(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    height: 42,
                    borderRadius: "var(--r-md)",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-900)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Detaylı hesapla
                  <Arrow shift={hoverCalc} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={current.key}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.3, ease: EASE_OUT_QUINT }}
              role="radiogroup"
              aria-label={current.q}
              style={{
                display: "grid",
                gridTemplateColumns: current.cols === 2 ? "1fr 1fr" : "1fr",
                gap: 8,
              }}
            >
              {current.options.map((opt) => {
                const selected = current.selected === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => current.pick(opt.value)}
                    style={{
                      position: "relative",
                      textAlign: "left",
                      padding: opt.hint ? "11px 13px" : "12px 13px",
                      borderRadius: "var(--r-md)",
                      /* all-white rows, ink type — selected is marked by the
                         dark ring + check, never a blue tint */
                      border: `2px solid ${selected ? "var(--text-900)" : "var(--border)"}`,
                      background: selected ? "var(--white)" : "var(--paper)",
                      cursor: "pointer",
                      transition:
                        "background-color 150ms linear, border-color 150ms linear",
                    }}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: selected ? 600 : 500,
                          fontSize: 14,
                          lineHeight: 1.3,
                          color: "var(--text-900)",
                        }}
                      >
                        {opt.label}
                      </span>
                      {selected && <Check />}
                    </span>
                    {opt.hint && (
                      <span
                        style={{
                          display: "block",
                          fontSize: 11,
                          lineHeight: 1.4,
                          color: "var(--text-600)",
                          marginTop: 3,
                        }}
                      >
                        {opt.hint}
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* progress + nav */}
      <div style={{ marginTop: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
          {QUESTIONS.map((qq, i) => (
            <span
              key={qq.key}
              aria-hidden="true"
              style={{
                height: 4,
                borderRadius: 2,
                background: "var(--border)",
                overflow: "hidden",
              }}
            >
              <motion.span
                initial={false}
                animate={{ scaleX: step > i ? 1 : 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT_QUINT }}
                style={{
                  display: "block",
                  height: "100%",
                  background: "var(--blue-600)",
                  transformOrigin: "left",
                }}
              />
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3" style={{ marginTop: 14 }}>
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: 13,
              color: "var(--text-600)",
              opacity: step === 0 ? 0.35 : 1,
              cursor: step === 0 ? "default" : "pointer",
            }}
          >
            Geri
          </button>

          {done ? (
            <button
              type="button"
              onClick={() => setStep(0)}
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: 13,
                color: "var(--text-600)",
                cursor: "pointer",
              }}
            >
              Baştan seç
            </button>
          ) : (
            <motion.button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              whileTap={{ scale: 0.98 }}
              transition={SPRING_UI}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                height: 44,
                paddingInline: 22,
                borderRadius: "var(--r-md)",
                border: "none",
                background: "var(--blue-700)",
                color: "#ffffff",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              {step === total - 1 ? "Sonucu gör" : "Devam et"}
              <Arrow shift={false} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
