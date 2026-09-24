"use client";

/* LAB · /lab/surec — süreç bölümünün sol tarafı için üç aday (25.09.2026).
   Burak: "önemli bir yer olmasına rağmen kapladığı alan çok az, çok minik …
   kuruluş bir halka zincir devam ediyor kısmındaki başlıklar ve tasarım her
   birini çok güçlü gösteriyor." Sağdaki kart (SetupScenes) aynen duruyor.
   Önceki kalabalık hâle (satır başına beş nesne) dönmemek için her adayda
   satırın taşıdığı şey az, ama büyük. Renk "iş kimde"den: sizde amber,
   Ortac'ta mavi, otoritede/bankada yeşil. Sınıflar .lsr- (css/lab-surec-sss.css). */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Building2, Check, Landmark, UserRound } from "lucide-react";
import { SCENE_BY_KIND, stepSceneKind, type SceneKind } from "@/components/scenes/SetupScenes";
import { COUNTRY_CONTENT, WHO_LABEL, type Step } from "@/lib/countryContent";

const STEPS: Step[] = COUNTRY_CONTENT.dubai.steps;
const STEP_MS = 3600;
const HOLD_MS = 11000;
const EASE = [0.22, 1, 0.36, 1] as const;

const WHO_TON: Record<Step["who"], "amber" | "mavi" | "yesil"> = {
  siz: "amber",
  ortac: "mavi",
  otorite: "yesil",
  banka: "yesil",
};
const WHO_IKON = { siz: UserRound, ortac: Building2, otorite: Landmark, banka: Landmark } as const;

function useStepper(total: number) {
  const hostRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(0);
  const [inView, setInView] = useState(false);
  const running = inView && hold === 0 && !reduced;

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setInView(e[0]?.isIntersecting ?? false), {
      rootMargin: "0px 0px -15% 0px",
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % total), STEP_MS);
    return () => window.clearInterval(id);
  }, [running, total]);
  useEffect(() => {
    if (hold === 0) return;
    const id = window.setTimeout(() => setHold(0), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [hold]);
  const goTo = useCallback((i: number) => {
    setHold((h) => h + 1);
    setActive(((i % total) + total) % total);
  }, [total]);
  return { hostRef, active, running, goTo, reduced };
}

/* Sağdaki kart: CountryProcess'in kartıyla aynı işaretleme ve sınıflar. */
function SceneCard({ current, reduced }: { current: number; reduced: boolean | null }) {
  const step = STEPS[current];
  const kind = stepSceneKind(step.title);
  const Scene = kind ? SCENE_BY_KIND[kind] : null;
  const sizerKinds = useMemo(() => {
    const seen = new Set<SceneKind>();
    for (const s of STEPS) {
      const k = stepSceneKind(s.title);
      if (k) seen.add(k);
    }
    return [...seen];
  }, []);
  return (
    <div className="cpr-card lsr-card">
      <div className="cpr-head">
        <div className="cpr-head-txt">
          <p className="cpr-head-t">Kuruluş dosyası</p>
          <p className="cpr-head-s">{step.title}</p>
        </div>
        <span className="cpr-head-tag">
          {current + 1}/{STEPS.length}
        </span>
      </div>
      <div className="cpr-body" aria-hidden="true">
        <div className="cpr-stage">
          <div className="cpr-sizer">
            {sizerKinds.map((k) => {
              const S = SCENE_BY_KIND[k];
              return <S key={k} />;
            })}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {Scene && (
              <motion.div
                key={current}
                className="cpr-slide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
              >
                <Scene />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Who({ s }: { s: Step }) {
  const Icon = WHO_IKON[s.who];
  return (
    <span className="lsr-who" data-ton={WHO_TON[s.who]}>
      <Icon size={14} strokeWidth={2.2} aria-hidden="true" />
      {WHO_LABEL[s.who]}
    </span>
  );
}

/* ------------------------------------------------------------ P1 · büyük satır
   Her adım kendi kutusu. Seçili kutu açılıyor: adımın cümlesi (verideki
   `line`) yalnız orada görünüyor. Numara halkası zamanlayıcıyı taşıyor. */
export function SurecP1() {
  const { hostRef, active, running, goTo, reduced } = useStepper(STEPS.length);
  return (
    <section ref={hostRef} className="lsr">
      <div className="lsr-p1-grid">
        <ol className="lsr-p1-list">
          {STEPS.map((s, i) => {
            const on = i === active;
            const done = i < active;
            return (
              <li key={s.title}>
                <button
                  type="button"
                  className="lsr-p1-row"
                  data-state={on ? "on" : done ? "done" : undefined}
                  aria-current={on ? "step" : undefined}
                  onClick={() => goTo(i)}
                >
                  <span className="lsr-p1-n" aria-hidden="true">
                    {on && running && (
                      <svg className="lsr-ring" viewBox="0 0 44 44">
                        <motion.circle
                          cx="22"
                          cy="22"
                          r="20"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                          key={active}
                        />
                      </svg>
                    )}
                    {done ? <Check size={16} strokeWidth={3} /> : String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="lsr-p1-txt">
                    <span className="lsr-p1-t">{s.title}</span>
                    <span className="lsr-p1-m">
                      <Who s={s} />
                      <span className="lsr-time">{s.timing}</span>
                    </span>
                    {on && <span className="lsr-p1-l">{s.line}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="lsr-p1-side">
          <SceneCard current={active} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ P2 · yatay ray
   Adımlar tam genişlikte bir rayda, zincir bölümü gibi. Altında seçili adım
   büyük: numara, başlık, cümle; yanında kart. */
export function SurecP2() {
  const { hostRef, active, running, goTo, reduced } = useStepper(STEPS.length);
  const s = STEPS[active];
  return (
    <section ref={hostRef} className="lsr">
      <ol className="lsr-p2-rail" style={{ "--lsr-n": STEPS.length } as React.CSSProperties}>
        {STEPS.map((x, i) => {
          const on = i === active;
          const done = i < active;
          return (
            <li key={x.title}>
              <button
                type="button"
                className="lsr-p2-node"
                data-state={on ? "on" : done ? "done" : undefined}
                aria-current={on ? "step" : undefined}
                onClick={() => goTo(i)}
              >
                <span className="lsr-p2-bar" aria-hidden="true">
                  {on && running ? (
                    <motion.i
                      key={active}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                    />
                  ) : (
                    <i style={{ transform: `scaleX(${done || on ? 1 : 0})` }} />
                  )}
                </span>
                <span className="lsr-p2-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="lsr-p2-t">{x.title}</span>
                <Who s={x} />
              </button>
            </li>
          );
        })}
      </ol>
      <div className="lsr-p2-detail">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
           
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
          >
            <span className="lsr-p2-big">{String(active + 1).padStart(2, "0")}</span>
            <h3 className="lsr-p2-h">{s.title}</h3>
            <p className="lsr-p2-l">{s.line}</p>
            <p className="lsr-p2-m">
              <Who s={s} />
              <span className="lsr-time">{s.timing}</span>
            </p>
          </motion.div>
        </AnimatePresence>
        <SceneCard current={active} reduced={reduced} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ P3 · tek büyük adım
   Solda yalnız o anki adım, büyük ve okunur; altında yedi parçalı ilerleme
   çubuğu ve ileri/geri. Diğer adımların adı parçaların üstünde, fareyle ya
   da dokunuşla. */
export function SurecP3() {
  const { hostRef, active, running, goTo, reduced } = useStepper(STEPS.length);
  const s = STEPS[active];
  const next = STEPS[(active + 1) % STEPS.length];
  return (
    <section ref={hostRef} className="lsr">
      <div className="lsr-p3-grid">
        <div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
            >
              <p className="lsr-p3-k">
                <b>{String(active + 1).padStart(2, "0")}</b> / {String(STEPS.length).padStart(2, "0")}
              </p>
              <h3 className="lsr-p3-h">{s.title}</h3>
              <p className="lsr-p3-l">{s.line}</p>
              <p className="lsr-p3-m">
                <Who s={s} />
                <span className="lsr-time">{s.timing}</span>
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="lsr-p3-seg" role="group" aria-label="Süreç adımları">
            {STEPS.map((x, i) => (
              <button
                key={x.title}
                type="button"
                className="lsr-p3-s"
                data-state={i === active ? "on" : i < active ? "done" : undefined}
                aria-label={`${i + 1}. adım: ${x.title}`}
                aria-current={i === active ? "step" : undefined}
                title={x.title}
                onClick={() => goTo(i)}
              >
                {i === active && running ? (
                  <motion.i
                    key={active}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                  />
                ) : (
                  <i style={{ transform: `scaleX(${i <= active ? 1 : 0})` }} />
                )}
              </button>
            ))}
          </div>

          <div className="lsr-p3-nav">
            <button type="button" className="lsr-p3-btn" onClick={() => goTo(active - 1)} aria-label="Önceki adım">
              <ArrowLeft size={18} strokeWidth={2.1} />
            </button>
            <button type="button" className="lsr-p3-btn" onClick={() => goTo(active + 1)} aria-label="Sonraki adım">
              <ArrowRight size={18} strokeWidth={2.1} />
            </button>
            <span className="lsr-p3-next">
              Sıradaki: <b>{next.title}</b>
            </span>
          </div>
        </div>
        <SceneCard current={active} reduced={reduced} />
      </div>
    </section>
  );
}
