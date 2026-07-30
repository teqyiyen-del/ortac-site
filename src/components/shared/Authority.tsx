"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { BadgeCheck, Building2, ScrollText } from "lucide-react";

/* Ana sayfadaki otorite panosu.
 *
 * Burası bilerek ÜLKESİZ. Ana sayfa tek bir ülkenin avantajını üstlenemez:
 * ziyaretçi henüz ülke seçmemişken "Dubai'de yerinde" demek, sayfanın üç
 * ülkeyi eşit sunma iddiasını daha ilk otorite bloğunda bozuyordu. Otoriteyi
 * artık firmanın kendisi taşıyor — süre, resmî iş ortaklıkları ve lisans.
 *
 * Görsel DOM, SVG değil: sitedeki diğer maketlerle aynı aileden olsun diye.
 * Yıl şeridi bir grafik değil, sayının kendisi — 22 segment, 22 yıl.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* SWAP:AUTHORITY — süre ve aşağıdaki üç satır müşteri onayına tabi. Rakam
   değişirse şerit segment sayısı da kendiliğinden değişir. */
const YEARS = 22;

const CREDS = [
  {
    Icon: BadgeCheck,
    t: "Resmî iş ortaklıkları",
    s: "IFZA · Wio Business · Mashreq NeoBiz · PayPal",
  },
  {
    Icon: ScrollText,
    t: "Kendi muhasebe lisansımız",
    s: "Beyanı ve defteri taşerona devretmiyoruz",
  },
  {
    Icon: Building2,
    t: "Üç ülkede operasyon",
    s: "Dubai · İngiltere · KKTC",
  },
];

/** Sayaç sıfırdan değil, göründüğü an başlar; tekrar tetiklenmez. */
function YearCount({ play }: { play: boolean }) {
  const [n, setN] = useState(0);
  const raf = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    /* hareket kapalıysa sayaç hiç kurulmuyor; değer render sırasında
       doğrudan türetiliyor, effect içinden setState yok */
    if (!play || reduce) return;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - t0) / 950, 1);
      setN(Math.round(YEARS * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [play, reduce]);

  return (
    <span className="au-n" style={{ fontVariantNumeric: "tabular-nums" }}>
      {reduce ? (play ? YEARS : 0) : n}
    </span>
  );
}

export default function Authority() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  return (
    <div className="au" ref={ref}>
      <div className="au-top">
        <YearCount play={seen} />
        <span className="au-nk">
          <b>yıl</b>
          kesintisiz faaliyet
        </span>
      </div>

      {/* her segment bir yıl; soldan sağa dolar */}
      <div className="au-track" aria-hidden="true">
        {Array.from({ length: YEARS }, (_, i) => (
          <motion.i
            key={i}
            initial={{ scaleY: 0.2, opacity: 0.25 }}
            animate={seen ? { scaleY: 1, opacity: 1 } : undefined}
            transition={{
              duration: reduce ? 0 : 0.34,
              delay: reduce ? 0 : i * 0.028,
              ease: EASE,
            }}
          />
        ))}
      </div>

      <ul className="au-rows">
        {CREDS.map(({ Icon, t, s }, i) => (
          <motion.li
            key={t}
            initial={{ opacity: 0, x: reduce ? 0 : -10 }}
            animate={seen ? { opacity: 1, x: 0 } : undefined}
            transition={{
              duration: reduce ? 0 : 0.42,
              delay: reduce ? 0 : 0.62 + i * 0.12,
              ease: EASE,
            }}
          >
            <span className="au-ic" aria-hidden="true">
              <Icon size={15} strokeWidth={2.1} />
            </span>
            <span className="au-txt">
              <b>{t}</b>
              {s}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
