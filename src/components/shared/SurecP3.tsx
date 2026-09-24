"use client";

/* SÜREÇ · P3 (25.09.2026, /lab/surec'te seçildi). Ad alanı .srp- (css/surec.css).

   Burak: "P3 daha iyi … aşağıda buton koymuşsun, sağa sola gitmek için ona
   gerek yok, zaten üstüne tıklarlar … sağdaki SVG kartın üstünde de bir daha
   'kuruluş dosyası, kuruluş tipinin seçilmesi' gibi şeyler yazmamıza gerek
   yok, burayı sadece görsel bırakalım; sağ üstündeki 3/7'yi de kaldırıp
   tamamen SVG animasyonuna bırakabiliriz … bunu her sayfaya entegre
   edeceğiz."

   Solda yalnız o anki adım: başlık, iki satır, iş kimde (renkli etiket) ve
   süre; altında adım sayısı kadar mavi çubuk, altlarında sayı. Sağda yalnız
   çizim. Yedi (ya da beş) adım aynı ızgara hücresinde üst üste duruyor, kutu
   en uzun adımın boyunda sabit: metin değişirken çubuklar zıplamıyor.

   Elenen ve bir daha sunulmayacak: solda alt alta uzun adım listesi + sağda
   ona göre değişen kart ("çok kalabalık"). Büyük dekoratif numara ("07
   kocaman") ve ileri/geri düğmeleri de yok.

   Kullananlar: ülke sayfaları ve LP (CountryProcess), ana sayfa
   (ProcessScroll). Kart kabuğu process.css'in .cpr-card / .cpr-body /
   .cpr-stage sınıfları: çizimlerin gece zeminindeki opak renkleri orada. */

import { useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { Building2, Landmark, UserRound, UsersRound } from "lucide-react";

export type SurecKim = "siz" | "ortac" | "otorite" | "banka" | "birlikte";
export type SurecAdim = {
  title: string;
  /** ekranda basılan iki satır */
  short: string;
  who: SurecKim;
  timing?: string;
  /** adımın tamamı: çubuk düğmesinin erişilebilir adı */
  aria: string;
};

/* İş kimde · renk sitenin kuralından ve lab'da beğenilen etiketlerden:
   sizde amber, Ortac'ta mavi, otoritede ve bankada yeşil. */
const KIM: Record<SurecKim, { label: string; ton: "amber" | "mavi" | "yesil"; icon: typeof UserRound }> = {
  siz: { label: "Sizde", ton: "amber", icon: UserRound },
  ortac: { label: "Ortac'ta", ton: "mavi", icon: Building2 },
  otorite: { label: "Otoritede", ton: "yesil", icon: Landmark },
  banka: { label: "Bankada", ton: "yesil", icon: Landmark },
  birlikte: { label: "Birlikte", ton: "mavi", icon: UsersRound },
};

const STEP_MS = 3600;
const HOLD_MS = 11000;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function SurecP3({
  id = "surec",
  background = "var(--white)",
  head,
  steps,
  scenes,
  sizer,
  after,
}: {
  id?: string;
  background?: string;
  /** bölüm başlığı (sec-head); tam genişlikte, iki sütunun üstünde */
  head: ReactNode;
  steps: SurecAdim[];
  /** adım başına çizim (sıra adımlarla aynı); null ise kartın tabanı var */
  scenes: (ComponentType | null)[];
  /** bütün çizimler bir kez: kartın boyu en uzun çizimde sabit */
  sizer: ComponentType[];
  /** sol sütunun dibi: dipnot, çıkış bağlantısı, ülke seçici */
  after?: ReactNode;
}) {
  const hostRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  /* ziyaretçi devraldı: sayaç, bayrak değil (aynı adıma ikinci tık da tutmayı
     yeniliyor) */
  const [hold, setHold] = useState(0);
  const [inView, setInView] = useState(false);
  const total = steps.length;
  const running = inView && hold === 0 && !reduced && total > 1;

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
    const t = window.setInterval(() => setActive((a) => (a + 1) % total), STEP_MS);
    return () => window.clearInterval(t);
  }, [running, total]);
  useEffect(() => {
    if (hold === 0) return;
    const t = window.setTimeout(() => setHold(0), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [hold]);
  const goTo = useCallback((i: number) => {
    setHold((h) => h + 1);
    setActive(i);
  }, []);

  if (total === 0) return null;
  const current = Math.min(active, total - 1);
  const Scene = scenes[current] ?? null;

  return (
    <MotionConfig reducedMotion="user">
      <section id={id} ref={hostRef} className="sec-pad" style={{ background }}>
        <div className="container-o">
          {head}
          <div className="srp-grid">
            <div className="srp-left">
              {/* yedi adım üst üste; görünen yalnız seçili */}
              <div className="srp-stack">
                {steps.map((s, i) => {
                  const k = KIM[s.who];
                  const Icon = k.icon;
                  return (
                    <div key={s.title} className="srp-panel" data-on={i === current || undefined} aria-hidden={i !== current}>
                      <h3 className="srp-h">{s.title}</h3>
                      <p className="srp-l">{s.short}</p>
                      <p className="srp-m">
                        <span className="srp-who" data-ton={k.ton}>
                          <Icon size={14} strokeWidth={2.2} aria-hidden="true" />
                          {k.label}
                        </span>
                        {s.timing && <span className="srp-time">{s.timing}</span>}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div
                className="srp-bars"
                role="group"
                aria-label="Süreç adımları"
                style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
              >
                {steps.map((s, i) => {
                  const on = i === current;
                  return (
                    <button
                      key={s.title}
                      type="button"
                      className="srp-bar"
                      data-state={on ? "on" : i < current ? "done" : undefined}
                      aria-current={on ? "step" : undefined}
                      aria-label={s.aria}
                      title={s.title}
                      onClick={() => goTo(i)}
                    >
                      <span className="srp-bar-t" aria-hidden="true">
                        {on && running ? (
                          /* çubuk aynı zamanda sayaç: bir adım boyunca doluyor */
                          <motion.i
                            key={current}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                          />
                        ) : (
                          <i style={{ transform: `scaleX(${i <= current ? 1 : 0})` }} />
                        )}
                      </span>
                      <span className="srp-bar-n" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {after}
            </div>

            {/* Yalnız çizim: başlık, adım adı ve sayaç kalktı. Ekran okuyucudan
                gizli; kelimeleri sol sütun taşıyor. */}
            <div className="cpr-card">
              <div className="cpr-body" aria-hidden="true">
                <div className="cpr-stage" data-empty={Scene ? undefined : "true"}>
                  <div className="cpr-sizer">
                    {sizer.map((S, i) => (
                      <S key={i} />
                    ))}
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
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
