"use client";

import { motion } from "motion/react";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  /** İLK EKRAN (hero). Aynı animasyon saf CSS'le: JavaScript'i beklemiyor. */
  ilk?: boolean;
};

/** Default reveal for any block — spec contract:
 *  initial {opacity:0, y:24} → {opacity:1, y:0}, 0.7s ease-out-quint. */
export default function FadeUp({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  className,
  ilk = false,
}: Props) {
  /* 25.09.2026 · İLK EKRAN KİPİ (optimizasyon turu). motion'ın başlangıç
     hâli (opacity 0) sunucu HTML'inde de basılıyor ve animasyon ancak sayfanın
     JavaScript'i yüklenip çalışınca başlıyordu: telefonda (yavaş işlemci, 4G)
     hero'nun açıklama paragrafı metin hazır olduğu hâlde ~1,5 s görünmez
     bekliyordu ve sayfanın "ana içerik" süresi (LCP) oydu. Aynı animasyon
     (süre, eğri, kayma, gecikme) CSS'le ilk boyamada başlıyor; hareket azaltma
     tercihinde hiç oynamıyor (globals.css · .fu-ilk). */
  if (ilk) {
    return (
      <div
        className={className ? `${className} fu-ilk` : "fu-ilk"}
        style={
          {
            "--fu-y": `${y}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration, ease: EASE_OUT_QUINT, delay }}
    >
      {children}
    </motion.div>
  );
}
