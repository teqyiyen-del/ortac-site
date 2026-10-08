"use client";

import { MotionConfig } from "motion/react";
import type Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    /* 08.10.2026 · TELEFONDA LENIS YOK. Lenis yalnız tekerleği yumuşatıyor;
       dokunmatik kaydırmayı zaten tarayıcıya bırakıyordu (syncTouch kapalı).
       Yani telefonda işi yoktu ama bedeli vardı: her karede çalışan bir rAF
       döngüsü, belgeye bağlı dokunma dinleyicileri ve indirilen kod. Parmakla
       kullanılan cihazda hiç kurulmuyor ve paketi hiç inmiyor (dinamik import).
       Tüketicilerin hepsi `lenis === null` hâlini zaten taşıyor (ilk boyamada
       da null): FinalCta ve PageHero scrollIntoView'a, NavIstemci pencerenin
       kendi scroll olayına düşüyor; çarşaf açıkken kaydırma kilidi için
       NavIstemci'ye yedek eklendi. */
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let instance: Lenis | null = null;
    let iptal = false;
    import("lenis").then(({ default: LenisSinifi }) => {
      if (iptal) return;
      instance = new LenisSinifi({
        lerp: 0.1,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });
      const loop = (time: number) => {
        instance?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      // store the external Lenis instance so children can call scrollTo/stop
      setLenis(instance);
    });
    return () => {
      iptal = true;
      cancelAnimationFrame(raf);
      instance?.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}
