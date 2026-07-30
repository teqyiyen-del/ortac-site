"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BadgeCheck,
  Check,
  FileText,
  Landmark,
  PackageCheck,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { SETUP_SCENES } from "@/components/scenes/SetupScenes";
import { WHO_LABEL, type Step } from "@/lib/countryContent";

/* Süreç bölümü artık scroll'u ele geçirmiyor.

   The pinned version held the page for five screen-heights to say five things,
   and a visitor who only wanted the price below it had to scroll through the
   whole timeline to get there. The section is one normal-height block now, with
   the same two drivers the home page uses: a timer that walks the steps while
   the block is on screen, and the rail itself, where every step is a button. A
   click (or a keyboard activation) hands control to the visitor and stops the
   timer for a while, then it picks up again from wherever they left it so the
   section is never left frozen.

   Kart soldaki rayın boyuna GERİLMİYOR, bu bilinçli.
   The home page stretches its panel to the rail's full height and that works
   there because the panel is a mock window whose body grows. Here the panel is
   a fixed 560x330 drawing, so stretching does not make the drawing any bigger:
   at 1440px it turned a 363px card body into 695px around a 323px scene, which
   is a black slab that is more than half empty - measured, not guessed, and the
   opposite of what this page was reworked for. The card keeps its own height
   and .ops-grid centres it, the same way the işleyiş section does.

   The rail's look is unchanged - the customer asked for the interaction, not a
   redesign - so the ops-* classes it was already drawn with stay exactly as they
   are, and every new rule sits behind a cps- class. Workflow.tsx draws its rail
   with the same ops-* set, so nothing here may change their meaning. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* how long one step holds before the next one takes over */
const STEP_MS = 3600;
/* how long a chosen step is held before the panel resumes on its own. Long
   enough to read the step without it moving, short enough that the section is
   never left frozen. */
const HOLD_MS = 11000;

const ICONS: LucideIcon[] = [FileText, BadgeCheck, ScrollText, Landmark, PackageCheck];

export default function CountryProcess({
  steps,
  title,
}: {
  steps: Step[];
  title: string;
}) {
  const hostRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  /* The visitor took over, and only by choosing a step: a click, or a keyboard
     activation, which fires a click too. Focus deliberately does not set this -
     focus lands on a rail button for all sorts of reasons that are not a
     decision, and one stray focus should not freeze the section.

     A counter rather than a flag. With a flag, choosing the step that is already
     showing changed no state at all, so the effect below never re-ran and the
     hold was not renewed: the panel walked off a step the visitor had just
     asked it to stay on. Every choice bumps the token, so every choice restarts
     the timeout. Zero means nobody is holding it. */
  const [hold, setHold] = useState(0);
  const [inView, setInView] = useState(false);

  const total = steps.length;
  /* nothing runs off screen, and nothing runs at all with reduced motion on:
     there the rail is a plain switcher and the panel only moves on a click */
  const running = inView && hold === 0 && !reduced && total > 1;

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { rootMargin: "0px 0px -15% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [running, total]);

  /* the hold expires: choosing a step stops the panel moving under the reader's
     hands, which is the whole point of it, but it should not end the animation
     for good */
  useEffect(() => {
    if (hold === 0) return;
    const id = window.setTimeout(() => setHold(0), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [hold]);

  const goTo = useCallback((i: number) => {
    setHold((h) => h + 1);
    setActive(i);
  }, []);

  /* steps comes from countryContent and is five rows everywhere, but the index
     is clamped rather than trusted so a shorter list can never point past it */
  const current = total > 0 ? Math.min(active, total - 1) : 0;
  const step = steps[current];
  /* One scene per step, in order. There is no wrap-around and no repeat: a step
     the scene set does not cover leaves the stage empty rather than showing the
     previous drawing again, which would say the wrong thing. */
  const Scene = current < SETUP_SCENES.length ? SETUP_SCENES[current] : null;

  return (
    <section
      id="surec"
      ref={hostRef}
      className="sec-pad"
      style={{ background: "var(--white)" }}
    >
      <div className="container-o ops-grid">
        <div className="cps-left">
          <SplitWords
            as="h2"
            text={title}
            accent="adım adım."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="ops-lead">
              Her adımda topun kimde olduğu yazıyor. Adımlar sırayla ilerler, bir
              adıma tıkladığınızda durur.
            </p>
          </FadeUp>

          {/* five loose buttons need to arrive as one thing, otherwise the only
              context a screen reader has for them is the heading four elements
              back */}
          <div className="ops-rail cps-rail" role="group" aria-label="Süreç adımları">
            {steps.map((s, i) => {
              const Icon = ICONS[i] ?? FileText;
              const isActive = i === current;
              const done = i < current;
              return (
                <button
                  key={s.title}
                  type="button"
                  className="ops-row"
                  data-on={isActive}
                  data-done={done || undefined}
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => goTo(i)}
                  /* the label carries the whole row, not just the heading: the
                     day and the owner are the two things the row is read for */
                  aria-label={`${i + 1}. adım: ${s.title}. ${s.line} ${s.day}, ${WHO_LABEL[s.who]}.`}
                >
                  <span className="ops-ic">
                    {done ? (
                      <Check size={17} strokeWidth={3} />
                    ) : (
                      <Icon size={17} strokeWidth={1.9} />
                    )}
                  </span>
                  <span className="ops-text">
                    <span className="ops-t">
                      <i>{String(i + 1).padStart(2, "0")}</i>
                      {s.title}
                    </span>
                    <span className="ops-l">{s.line}</span>
                    <span className="ops-tags">
                      <b>{s.day}</b>
                      <em data-who={s.who}>{WHO_LABEL[s.who]}</em>
                    </span>
                  </span>
                  {isActive && (
                    /* the underline doubles as the dwell meter: it fills over
                       exactly one step, so the rail shows where the timer is.
                       Mounted only while it runs, so it always starts empty and
                       a held step shows an empty track rather than a fake one. */
                    <span className="ops-bar" aria-hidden="true">
                      {running ? (
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                        />
                      ) : (
                        <span style={{ transform: "scaleX(0)" }} />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="ops-stage ops-stage-night cps-card">
          <div className="cps-head">
            <div className="cps-head-txt">
              {/* the big line holds still and the small one is the live
                  pointer, the same way round as the home page panel */}
              <p className="cps-head-t">Kuruluş dosyası</p>
              <p className="cps-head-s">{step ? step.title : "Süreç"}</p>
            </div>
            <span className="cps-head-tag">
              {current + 1}/{Math.max(total, 1)}
            </span>
          </div>

          {/* Sahne ekran okuyucudan gizli, bilerek.
              The drawing repeats what the rail row already says, it is replaced
              every 3.6 seconds on its own, and the set is indexed by step
              number across three countries whose fourth steps are not the same
              thing - so its own label can end up naming something the step is
              not. The rail carries the words; this is the picture of them. */}
          <div className="cps-body" aria-hidden="true">
            <div className="cps-stage" data-empty={Scene ? undefined : "true"}>
              <AnimatePresence mode="wait" initial={false}>
                {Scene && (
                  <motion.div
                    key={current}
                    className="cps-slide"
                    initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -10 }}
                    transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
                  >
                    <Scene />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* the one line that has to stay: the panel walks to "teslim" on its
              own, so the non-guarantee is said in words rather than implied by
              the absence of a tick */}
          <p className="cps-foot">
            Kurum ve banka kararları ilgili kuruluşlara aittir; sonuç ve süre
            garanti edilmez.
          </p>
        </div>
      </div>
    </section>
  );
}
