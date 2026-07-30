"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SETUP_SCENES } from "@/components/scenes/SetupScenes";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import { COUNTRY_NAME, COUNTRY_ORDER } from "@/lib/brand";

/* The five steps are the same in all three countries — only the wording inside
   the panel and the registering authority change, and the country picker under
   the rail is what switches them.

   The section does not pin. It is one normal-height block with two drivers: a
   timer that walks the steps while the block is on screen, and the rail itself,
   where every step is a button. A click (or keyboard activation) hands control
   to the visitor and stops the timer for a while.

   The right-hand card is an interface again, not a drawing. The illustrated
   round (stacked sheets, a seal, a bank building) read as decoration: it said
   nothing the rail did not already say. What the panel shows now is the tool
   doing the step — a form being filled, a name being queried, a file being
   sent — because that is the thing a visitor cannot picture on their own.

   Two rules the mock cannot break:
   1. nothing in it may imply a bank decision, an authority decision or a fixed
      duration. Every status is either work we did ("dosyada", "gönderildi",
      "teslim edildi") or work that is still open ("incelemede", "sorgulanıyor",
      "sürüyor"). The word "onaylandı" appears nowhere.
   2. it is drawn in opaque colour. White at 5% inside a white line at 20% over
      near-black gives a handful of greys that all look the same, so nothing can
      be foreground. The panel stays black, and the interface on it is a real
      light surface with ink on it. */

/* how long one step holds before the next one takes over */
const STEP_MS = 3600;
/* how long a chosen step is held before the panel resumes on its own. Long
   enough to read the step without it moving, short enough that the section is
   never left frozen. */
const HOLD_MS = 11000;

/* the tick sits inside a filled disc, so it has to be white */
function CheckIcon() {
  return <Check size={12} strokeWidth={3.2} color="#ffffff" aria-hidden="true" />;
}

/* the rail is the same five rows in every country, so it never reflows */
const RAIL = [
  { title: "Evrak toplama", meta: "pasaport ve adres beyanı" },
  { title: "İsim onayı", meta: "isim kontrolü, ön başvuru" },
  { title: "Tescil ve lisans", meta: "kayıt ve faaliyet izni" },
  { title: "Banka başvurusu", meta: "dosya hazırlığı ve takip" },
  { title: "Vergi kaydı ve teslim", meta: "belgeler ve panel devri" },
];

/* The five screens are SETUP_SCENES, the same set the Dubai page already uses.
   Building a second mock here was the mistake of the last round: it ended up
   denser than the original and said the step twice, once in the rail and again
   in a panel full of rows. These scenes are the design this section is supposed
   to have - one object per step, and the name check actually scans. */

export default function ProcessScroll() {
  const hostRef = useRef<HTMLElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  /* the picker's open state as it was *before* the press that is happening now.
     Focus opens the picker, and on a touch screen focus lands on the button one
     event before the click does — so a plain toggle read "open" and closed the
     thing the tap had just opened. Pointerdown runs ahead of focus, so this is
     the only reading of the state the click can trust. Null means the click did
     not come from a pointer at all (Enter or Space), where the live state is
     already the right answer. */
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  /* The visitor took over, and only by choosing a step or a country: a click, or
     a keyboard activation, which fires a click too.
     Focus used to set this as well and that was the bug. Focus lands on a rail
     button for all sorts of reasons that are not a decision - restoring focus
     after a scroll, tabbing through the page on the way to something else - and
     because the hold had no way back, one stray focus froze the section for the
     rest of the visit. */
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);

  /* nothing runs off screen, and nothing runs at all with reduced motion on —
     there the rail is a plain five-button switcher */
  const running = inView && !held && !reduced;

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
      setActive((a) => (a + 1) % RAIL.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const goTo = useCallback((i: number) => {
    setHeld(true);
    setActive(i);
  }, []);


  /* The hold expires. Choosing a step should stop the panel moving under the
     reader's hands, which is the whole point of it, but it should not end the
     animation for good: someone who clicks step three, reads it and then looks
     away comes back to a section that has been frozen ever since. It picks up
     again after a quiet spell, from wherever they left it. */
  useEffect(() => {
    if (!held) return;
    const id = window.setTimeout(() => setHeld(false), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [held, active]);

  /* the picker opens on hover and on focus, so it also has to close on a tap
     somewhere else — otherwise a touch visitor is left holding it open */
  useEffect(() => {
    if (!pickerOpen) return;
    const onDown = (e: PointerEvent) => {
      const el = pickerRef.current;
      if (el && !el.contains(e.target as Node)) setPickerOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [pickerOpen]);

  const completed = active; // steps fully behind the cursor
  /* held stable across step changes so the five sizer copies below reconcile to
     nothing while the timer walks */
  const Scene = SETUP_SCENES[active];

  return (
    <section
      id="surec"
      ref={hostRef}
      className="sec-pad"
      style={{ background: "var(--paper)" }}
    >
      <div className="container-o proc-grid pr5-grid">
        {/* LEFT — copy + clickable step rail */}
        <div className="pr5-left">
          <SplitWords
            as="h2"
            text="Kuruluş süreci, adım adım."
            accent="adım adım."
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              fontSize: "clamp(30px, 3.4vw, 44px)",
              color: "var(--text-900)",
            }}
          />
          <FadeUp delay={0.2}>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--text-600)",
                marginTop: 18,
                maxWidth: "42ch",
              }}
            >
              {/* one sentence, and it still has to name the control: the panel
                  advances on its own and a click holds it */}
              Üç ülkede de aynı beş adım; tıklayın, durur.
            </p>
          </FadeUp>

          <div className="proc-rail">
            {RAIL.map((s, i) => {
              const isDone = i < completed;
              const isActive = i === active;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={isActive ? "step" : undefined}
                  className="proc-rail-row pr2-rail-btn"
                  style={
                    { "--pr2-o": isDone || isActive ? 1 : 0.45 } as React.CSSProperties
                  }
                >
                  {i < RAIL.length - 1 && (
                    <span className="proc-rail-line" aria-hidden="true">
                      {isActive && running ? (
                        /* the connector doubles as the dwell meter: it fills over
                           exactly one step, so the rail shows where the timer is.
                           Mounted only while it runs, so it always starts empty. */
                        <motion.span
                          className="proc-rail-line-fill pr2-line-run"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                        />
                      ) : (
                        <span
                          className="proc-rail-line-fill"
                          style={{ transform: `scaleY(${isDone ? 1 : 0})` }}
                        />
                      )}
                    </span>
                  )}
                  <span
                    className="proc-rail-dot"
                    aria-hidden="true"
                    style={{
                      background: isDone ? "var(--green-600)" : "var(--white)",
                      /* full shorthand — never mix with border*Color here */
                      border: `2px solid ${
                        isDone
                          ? "var(--green-600)"
                          : isActive
                            ? "var(--blue-600)"
                            : "var(--border)"
                      }`,
                    }}
                  >
                    {isDone ? (
                      <CheckIcon />
                    ) : isActive ? (
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--blue-600)",
                        }}
                      />
                    ) : (
                      <span
                        className="data"
                        style={{ fontSize: 12, color: "var(--text-600)" }}
                      >
                        {i + 1}
                      </span>
                    )}
                  </span>
                  <span>
                    <span className="pr2-rail-title">{s.title}</span>
                    {/* the step number lives in the dot, so the second line is
                        the four-word version of what the step produces and
                        nothing else */}
                    <span className="pr2-rail-meta">{s.meta}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Ülke seçici artık paneli yeniden yazmıyor.
              It used to rewrite the panel in place, which loaded this section
              with five screens per country for a difference the visitor had not
              asked to see yet. What it is for is simpler: the three country
              pages each carry their own process section, so this points at them.
              Hover opens it, click and keyboard do the same, and each option is
              a real link - not a control that pretends to be one. */}
          <div
            ref={pickerRef}
            className="pr5-ctry"
            data-on={pickerOpen ? "true" : "false"}
            onMouseEnter={() => setPickerOpen(true)}
            onMouseLeave={() => setPickerOpen(false)}
          >
            <button
              type="button"
              className="pr5-ctry-btn"
              aria-expanded={pickerOpen}
              aria-haspopup="true"
              onClick={() => setPickerOpen((v) => !v)}
              onFocus={() => setPickerOpen(true)}
            >
              <span className="pr5-ctry-lbl">Ülkeye özel süreci gör</span>
              <ChevronDown
                size={15}
                strokeWidth={2.2}
                className="pr5-ctry-caret"
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {pickerOpen && (
                <motion.div
                  className="pr5-ctry-menu"
                  initial={{ opacity: 0, y: reduced ? 0 : -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -4 }}
                  transition={{ duration: reduced ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
                >
                  {COUNTRY_ORDER.map((c) => (
                    <Link
                      key={c}
                      href={`/${c}#surec`}
                      className="pr5-ctry-opt"
                      onClick={() => setPickerOpen(false)}
                    >
                      {COUNTRY_NAME[c]}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT — the shared setup scenes, one per step */}
        {/* pr4-col dropped: it only carried min-width:0, which pr5-col already
            has, and it was the last reference keeping the retired pr4 block
            alive in globals.css */}
        <div className="pr5-col">
          <div className="proc-screen pr5-screen">
            <div className="proc-screen-head">
              <div>
                <p className="proc-screen-t">Kuruluş dosyası</p>
                {/* Ülke adı kalktı: bu bölüm üç ülkeyi birden anlatıyor.
                    The card used to name Dubai and its registrar, which quietly
                    made the whole section about one country while the sentence
                    above it says all three share these five steps. The subtitle
                    now says the thing the section is actually claiming; which
                    authority the file goes to is a country page's job, and the
                    picker under the rail is the door to it. */}
                <p className="proc-screen-s">Üç ülkede aynı beş adım</p>
              </div>
              <span className="proc-screen-tag">
                {active + 1}/{RAIL.length}
              </span>
            </div>

            <div className="pr5-body">
              <div className="pr5-stage">
                {/* The five mocks are not the same height, and the timer swaps
                    them every 3.6 seconds. Below 1024px, where the card is not
                    stretched to the rail, that made the panel grow and shrink by
                    76px on its own and shoved the rest of the page with it —
                    measured, not guessed. A min-height per breakpoint only fixes
                    the widths it was measured at, so instead all five are laid
                    out in the same grid cell with the visible one on top: the
                    stage is the height of the tallest step at any width, and the
                    card never resizes as the panel walks.
                    Hidden from assistive tech and from hit testing; the rail is
                    what carries this text. */}
                <div className="pr5-sizer" aria-hidden="true">
                  {SETUP_SCENES.map((S, i) => (
                    <S key={i} />
                  ))}
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    className="pr5-slide"
                    initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                    transition={{
                      duration: reduced ? 0 : 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Scene />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* the one line that has to stay. The mock shows a file being sent,
              never an answer being given, and the panel walks to "teslim edildi"
              on its own — so the non-guarantee has to be said in words, not
              implied by the absence of a tick. */}
          <p className="pr5-note">
            Kurum ve banka kararları ilgili kuruluşlara aittir; sonuç ve süre garanti
            edilmez.
          </p>
        </div>
      </div>
    </section>
  );
}
