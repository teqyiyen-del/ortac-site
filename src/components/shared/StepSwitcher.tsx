"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

/* A numbered list on the left, one animated scene on the right. Used wherever a
   section used to be three paragraphs of prose: the drawing does the
   explaining, the copy is a title and one line. */
export type Step = {
  id: string;
  title: string;
  line: string;
  scene: React.ReactNode;
};

export default function StepSwitcher({
  steps,
  dark = false,
  mirror = false,
  interval = 5200,
}: {
  steps: Step[];
  dark?: boolean;
  /** put the scene on the left so consecutive stepper sections differ */
  mirror?: boolean;
  interval?: number;
}) {
  const reduced = useReducedMotion();
  const uid = useId();
  const hostRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(hostRef, { margin: "0px 0px -15% 0px" });
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  /* only run while the section is on screen and the visitor is not reading it.
     held covers the pointer and the keyboard alike: focus anywhere inside stops
     the rotation, so the scene cannot change under someone who is tabbing. */
  const running = inView && !held && !reduced;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), interval);
    return () => clearTimeout(t);
  }, [running, active, interval, steps.length]);

  const panelId = `${uid}-panel`;
  const tabId = (i: number) => `${uid}-tab-${i}`;

  /* roving tabindex: the list is one tab stop and the arrows move inside it,
     which is what a tablist is expected to do */
  function move(next: number) {
    const i = (next + steps.length) % steps.length;
    setActive(i);
    tabRefs.current[i]?.focus();
  }

  function onListKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const k = e.key;
    if (k === "ArrowDown" || k === "ArrowRight") move(active + 1);
    else if (k === "ArrowUp" || k === "ArrowLeft") move(active - 1);
    else if (k === "Home") move(0);
    else if (k === "End") move(steps.length - 1);
    else return;
    e.preventDefault();
  }

  return (
    <div
      ref={hostRef}
      className="stp"
      data-dark={dark || undefined}
      data-mirror={mirror || undefined}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div
        className="stp-list"
        role="tablist"
        aria-label="Adımlar"
        aria-orientation="vertical"
        onKeyDown={onListKeyDown}
      >
        {steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={tabId(i)}
            aria-selected={i === active}
            aria-controls={panelId}
            tabIndex={i === active ? 0 : -1}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            className="stp-item"
            data-on={i === active}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <span className="stp-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="stp-text">
              <span className="stp-title">{s.title}</span>
              <span className="stp-line">{s.line}</span>
            </span>
            {i === active && (
              <motion.span
                className="stp-bar"
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: running ? 1 : 0.06 }}
                transition={{ duration: running ? interval / 1000 : 0.3, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* one panel for all three tabs, so every tab points at it and the panel
         names itself after whichever tab is open */}
      <div
        className="stp-stage"
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(active)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[active].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="stp-scene"
          >
            {steps[active].scene}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
