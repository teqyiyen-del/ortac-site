"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

/* A conversation that keeps running: messages arrive one after another, the
   window keeps the last few, and after the script ends it starts over. */
const SCRIPT: { me: boolean; t: string }[] = [
  { me: false, t: "Lisans bugün onaylandı." },
  { me: true, t: "Banka için ne gerekiyor?" },
  { me: false, t: "Formu hazırladım, imzanız yeterli." },
  { me: true, t: "İmzaladım, yükledim." },
  { me: false, t: "Wio randevusu perşembeye alındı." },
  { me: true, t: "Vize de aynı hafta olur mu?" },
  { me: false, t: "Evet, sağlık kontrolünü cuma alıyoruz." },
];

const WINDOW = 3;
const TICK = 2200;

export default function LiveChat() {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const inView = useInView(hostRef, { margin: "0px 0px -15% 0px" });
  const [head, setHead] = useState(WINDOW);

  useEffect(() => {
    if (!inView || reduced) return;
    const t = setInterval(() => setHead((h) => h + 1), TICK);
    return () => clearInterval(t);
  }, [inView, reduced]);

  /* the visible window slides along the script and wraps around */
  const shown = Array.from({ length: WINDOW }, (_, i) => {
    const idx = (head - WINDOW + i + SCRIPT.length * 4) % SCRIPT.length;
    return { ...SCRIPT[idx], key: head - WINDOW + i };
  });
  const nextIsMine = SCRIPT[head % SCRIPT.length].me;

  return (
    <div className="bn-chat" ref={hostRef}>
      <span className="bn-who">
        <span className="bn-avatar" aria-hidden="true">
          ME
        </span>
        <b>Merve · danışmanınız</b>
        <i>çevrimiçi</i>
      </span>

      <div className="bn-stream" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((m) => (
            <motion.span
              key={m.key}
              layout
              className="sc-msg"
              data-me={m.me || undefined}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {m.t}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* whoever speaks next is the one shown typing */}
        <motion.span
          layout
          className="bn-typing"
          data-me={nextIsMine || undefined}
          aria-hidden="true"
        >
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: d * 0.16 }}
            />
          ))}
        </motion.span>
      </div>
    </div>
  );
}
