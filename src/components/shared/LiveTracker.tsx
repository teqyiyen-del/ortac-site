"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

/* The transparency tile walks its own process: one row completes at a time,
   the bar fills, and when it reaches the end it restarts. Nothing here is a
   static checklist — that was the point of the claim.

   İKİ ŞEY BU TURDA DÜZELTİLDİ, İKİSİ DE ProcessScroll.tsx'te YAZILI OLAN
   KURALIN İHLALİYDİ (sahnede banka kararı, otorite kararı ya da sabit süre
   ima edilemez):

   1) "Lisans onayı" satırı bir OTORİTE KARARINI tamamlanmış bir adım gibi
      gösteriyordu. Yerine "Lisans dosyası kurumda" geldi: dosyanın nerede
      olduğunu söylüyor, kurumun ne dediğini değil. Satır "tamam" durumuna
      geçtiğinde de tutarlı kalıyor, çünkü tamamlanan şey bizim işimiz.

   2) GÜN NUMARALARI KALKTI ("Gün 1 · Gün 2 · Gün 5 · Gün 8"). TrustLayer.tsx
      bunu zaten bir risk olarak yazmıştı ve altına "süreler tipik aralıktır"
      diye bir dipnot koymuştu; dipnot yasağı kaldırmıyordu, sayıyı ekranda
      bırakıp yanına küçük yazılı bir şerh koyuyordu. Sayı gitti, dipnot da
      süreden söz etmiyor artık.

   `meta` ALANI DA GİTTİ, yerine sabit "sırada". Alan yalnızca HENÜZ
   BAŞLAMAMIŞ satırda basılıyordu (tamamlananda "tamam", yürüyende "işlemde"
   yazıyor); gün numarası çıkınca dördünde de aynı kelime kalıyordu, yani
   satır başına bir değer taşımak için sebep kalmadı. Adımlar tekrar
   ayrışırsa alan geri gelir. */
const STAGES = ["Evrak alındı", "Başvuru verildi", "Lisans dosyası kurumda", "Banka randevusu"];

const TICK = 1700;

export default function LiveTracker() {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const inView = useInView(hostRef, { margin: "0px 0px -15% 0px" });
  const [at, setAt] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const t = setInterval(() => setAt((a) => (a + 1) % (STAGES.length + 1)), TICK);
    return () => clearInterval(t);
  }, [inView, reduced]);

  const pct = Math.round((at / STAGES.length) * 100);

  return (
    <div className="lt" ref={hostRef}>
      <div className="lt-head">
        <span>Canlı durum</span>
        <b>{pct}%</b>
      </div>
      <span className="lt-bar" aria-hidden="true">
        <motion.span
          animate={{ scaleX: at / STAGES.length }}
          transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>

      <div className="lt-rows">
        {STAGES.map((label, i) => {
          const done = i < at;
          const active = i === at;
          return (
            <div key={label} className="lt-row" data-done={done || undefined} data-on={active || undefined}>
              <span className="lt-dot" aria-hidden="true">
                {done ? (
                  <Check size={11} strokeWidth={3.4} />
                ) : active ? (
                  /* only the repeat is gated: the markup and the SSR style stay
                     identical either way, so hydration cannot drift */
                  <motion.span
                    className="lt-pulse"
                    animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: reduced ? 0 : Infinity,
                      ease: "easeOut",
                    }}
                  />
                ) : null}
              </span>
              <span className="lt-label">{label}</span>
              <span className="lt-meta">{done ? "tamam" : active ? "işlemde" : "sırada"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
