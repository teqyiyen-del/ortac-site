"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import { useOrtacStore, type Country } from "@/lib/store";
import { gtm } from "@/lib/gtm";

/* SWAP:FIT_WEIGHTS — the scoring is an opinionated shortlist tool, not advice.
   Every option adds points to the countries it actually favours; the result
   names the runner-up too so the visitor sees it is a comparison, not a verdict. */
type Score = Partial<Record<Country, number>>;
type Q = { id: string; q: string; options: { label: string; hint?: string; score: Score }[] };

const QUESTIONS: Q[] = [
  {
    id: "musteri",
    q: "Müşterileriniz ağırlıklı olarak nerede?",
    options: [
      { label: "Avrupa / İngiltere", score: { ingiltere: 3, dubai: 1 } },
      { label: "Körfez ve Orta Doğu", score: { dubai: 3 } },
      { label: "Türkiye", score: { kktc: 3, ingiltere: 1 } },
      { label: "Karışık / global", score: { dubai: 2, ingiltere: 2 } },
    ],
  },
  {
    id: "is",
    q: "Ne satıyorsunuz?",
    options: [
      { label: "Yazılım ve dijital hizmet", score: { dubai: 2, ingiltere: 2 } },
      { label: "E-ticaret / fiziksel ürün", score: { dubai: 3, kktc: 1 } },
      { label: "Danışmanlık", score: { ingiltere: 2, kktc: 2 } },
    ],
  },
  {
    id: "ziyaret",
    q: "Kuruluş için yurt dışına gidebilir misiniz?",
    options: [
      { label: "Evet, gidebilirim", hint: "banka ve vize tarafını açar", score: { dubai: 3, kktc: 2 } },
      { label: "Hayır, uzaktan olmalı", score: { ingiltere: 4 } },
    ],
  },
  {
    id: "butce",
    q: "Kuruluş bütçeniz?",
    options: [
      { label: "Mümkün olan en düşük", score: { ingiltere: 3, kktc: 2 } },
      { label: "Orta", score: { kktc: 2, dubai: 1 } },
      { label: "Doğru kurgu için esnek", score: { dubai: 3 } },
    ],
  },
  {
    id: "vize",
    q: "Oturum vizesi gerekiyor mu?",
    options: [
      { label: "Evet, kendim için", score: { dubai: 3, kktc: 1 } },
      { label: "Hayır, sadece şirket", score: { ingiltere: 2, kktc: 1 } },
    ],
  },
];

const ORDER: Country[] = ["dubai", "ingiltere", "kktc"];

const WHY: Record<Country, string> = {
  dubai:
    "Vergi avantajı, güçlü banka tarafı ve vize imkânı bir arada. Kuruluş için bir kez gitmeniz gerekiyor.",
  ingiltere:
    "En düşük kuruluş maliyeti ve ziyaret şartı olmadan uzaktan kuruluş. Banka tarafı diğerlerinden zor.",
  kktc:
    "Türkiye'ye yakınlık ve düşük maliyet. Tahsilat kanalları Dubai ve İngiltere kadar geniş değil.",
};

export default function FitTest() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(QUESTIONS.map(() => null));
  const setCountry = useOrtacStore((s) => s.setCountry);

  const done = step >= QUESTIONS.length;
  const progress = Math.round((Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100);

  const totals = ORDER.map((c) => {
    const pts = answers.reduce<number>((sum, a, qi) => {
      if (a === null) return sum;
      return sum + (QUESTIONS[qi].options[a].score[c] ?? 0);
    }, 0);
    return { country: c, pts };
  }).sort((a, b) => b.pts - a.pts);

  const max = Math.max(1, totals[0].pts);

  const pick = (oi: number) => {
    const next = [...answers];
    next[step] = oi;
    setAnswers(next);
    const at = step + 1;
    setStep(at);
    if (at >= QUESTIONS.length) {
      gtm("fit_test_complete", { answers: next.join(",") });
    }
  };

  const restart = () => {
    setAnswers(QUESTIONS.map(() => null));
    setStep(0);
  };

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="ft">
          <div className="ft-bar" aria-hidden="true">
            <motion.span
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="ft-count">
                  Soru {step + 1} / {QUESTIONS.length}
                </span>
                <h2 className="ft-q">{QUESTIONS[step].q}</h2>

                <div className="ft-opts">
                  {QUESTIONS[step].options.map((o, oi) => (
                    <button
                      key={o.label}
                      type="button"
                      className="ft-opt"
                      data-on={answers[step] === oi}
                      onClick={() => pick(oi)}
                    >
                      <span>
                        <span className="ft-opt-t">{o.label}</span>
                        {o.hint && <span className="ft-opt-h">{o.hint}</span>}
                      </span>
                      <ArrowRight size={16} strokeWidth={2.1} aria-hidden="true" />
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button type="button" className="ft-back" onClick={() => setStep(step - 1)}>
                    <ArrowLeft size={15} strokeWidth={2.1} />
                    Önceki soru
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="ft-count">Sonuç</span>
                <h2 className="ft-q">
                  Cevaplarınıza göre <span>{COUNTRY_NAMES[totals[0].country]}</span> öne çıkıyor.
                </h2>
                <p className="ft-why">{WHY[totals[0].country]}</p>

                <div className="ft-rank">
                  {totals.map((t, i) => (
                    <div key={t.country} className="ft-row" data-top={i === 0 || undefined}>
                      <span className="ft-flag" aria-hidden="true">
                        <Flag country={t.country} />
                      </span>
                      <span className="ft-name">{COUNTRY_NAMES[t.country]}</span>
                      <span className="ft-meter">
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: t.pts / max }}
                          transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </span>
                      <span className="ft-pts">{t.pts} puan</span>
                    </div>
                  ))}
                </div>

                <div className="ft-actions">
                  <Link
                    href={`/basla?ulke=${totals[0].country}`}
                    className="btn btn-solid"
                    onClick={() => {
                      setCountry(totals[0].country);
                      gtm("fit_test_start", { country: totals[0].country });
                    }}
                  >
                    {COUNTRY_NAMES[totals[0].country]} ile devam et
                    <ArrowRight size={15} strokeWidth={2.1} />
                  </Link>
                  <Link href="/ulkeler" className="btn btn-line">
                    Üçünü karşılaştır
                  </Link>
                  <button type="button" className="ft-restart" onClick={restart}>
                    <RotateCcw size={14} strokeWidth={2.1} />
                    Baştan
                  </button>
                </div>

                <p className="ft-note">
                  Bu test bir ön eleme aracıdır, mali veya hukuki tavsiye değildir. Kesin
                  kurgu ücretsiz danışmanlıkta netleşir.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
