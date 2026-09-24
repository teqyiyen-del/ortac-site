"use client";

/* LAB · /lab/surec — süreç bölümünün sol tarafı için adaylar (25.09.2026).
   Burak: "önemli bir yer olmasına rağmen kapladığı alan çok az, çok minik …
   kuruluş bir halka zincir devam ediyor kısmındaki başlıklar ve tasarım her
   birini çok güçlü gösteriyor." Sağdaki kart (SetupScenes) aynen duruyor.
   Önceki kalabalık hâle (satır başına beş nesne) dönmemek için her adayda
   satırın taşıdığı şey az, ama büyük. Renk "iş kimde"den: sizde amber,
   Ortac'ta mavi, otoritede/bankada yeşil. Sınıflar .lsr- (css/lab-surec-sss.css).

   İKİNCİ TUR (Burak'ın yorumu, aynı gün):
   · P1 elendi: "alt alta bir sürü sıralanıyor ve sağdaki şeyde ona göre
     inmesi gerekiyor. Çok kalabalık … bu fikri bir daha da sunma."
   · "İş kimde" etiketleri beğenildi, duruyor.
   · Büyük dekoratif numara kalktı: "07 yazmışsın üstüne kocaman". Sayı artık
     yalnız mavi çubukların altında; kartın sağ üstünde de zaten yazıyor.
   · P2'nin rayında başlık ve etiket yok: "sadece mavi bar, altında sayı."
   · P3 metin değişirken zıplıyordu: adımlar artık aynı ızgara hücresinde
     üst üste duruyor, kutu en uzun adımın boyunda sabit.
   · Açıklama iki satır (SHORT): verideki `line` 200-270 karakterdi.
     Başlık bir kademe küçük ve ince (36/700 → 28/600). */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Building2, Landmark, UserRound } from "lucide-react";
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

/* İki satırlık açıklama. Her biri verideki `line`ın kısaltması; yeni olgu
   yok. Aday seçilince countryContent'e `short` alanı olarak taşınır (üç
   ülke için). */
const SHORT: Record<string, string> = {
  "Şirket isminin belirlenmesi":
    "Üç ad adayını sırayla veriyorsunuz; uygunluk kontrolünü ve rezervasyonu biz yapıyoruz.",
  "Faaliyet ve lisans türünün belirlenmesi":
    "Ne sattığınızı anlatıyorsunuz; faaliyet kodunu ve lisans sınıfını biz eşleştiriyoruz.",
  "Kuruluş tipinin seçilmesi":
    "Serbest bölge, mainland veya offshore. Kararı satış yaptığınız taraf veriyor.",
  "Kuruluş işlemleri ve tescil":
    "Başvuru otoriteye teslim ediliyor; sizden yalnızca onay ve imza isteniyor.",
  "Ticari lisansın alınması":
    "Lisansı otorite düzenliyor; ek onay istenirse bu adım uzayabiliyor.",
  "Medical fitness ve Emirates ID":
    "Sağlık kontrolü ve biyometri için bir kez BAE'de bulunmanız gerekiyor.",
  "GSM hattı ve banka hesabı":
    "Hat açılıyor, banka dosyası hazırlanıp başvuruluyor; hesap kararı bankanın.",
};
const short = (s: Step) => SHORT[s.title] ?? s.line;

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

/* Seçili adımın metni. Yedi adım aynı ızgara hücresinde üst üste; yalnız
   seçili olan görünür. Kutu böylece en uzun adımın boyunda sabit kalıyor ve
   metin değişirken altındaki çubuklar yerinden oynamıyor (P3'teki zıplama). */
function Detail({ active }: { active: number }) {
  return (
    <div className="lsr-stack">
      {STEPS.map((s, i) => (
        <div key={s.title} className="lsr-panel" data-on={i === active || undefined} aria-hidden={i !== active}>
          <h3 className="lsr-h">{s.title}</h3>
          <p className="lsr-l">{short(s)}</p>
          <p className="lsr-m">
            <Who s={s} />
            <span className="lsr-time">{s.timing}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

/* Mavi çubuklar ve altlarında sayı. Seçili çubuk süre boyunca doluyor,
   geçilenler dolu, sıradakiler boş. Başlık ve etiket YOK (Burak: "sadece
   mavi bar altında da sayı yazabilirsin … orada sadece sayılar yazar"). */
function Bars({
  active,
  running,
  goTo,
}: {
  active: number;
  running: boolean;
  goTo: (i: number) => void;
}) {
  return (
    <div className="lsr-bars" role="group" aria-label="Süreç adımları">
      {STEPS.map((x, i) => {
        const on = i === active;
        return (
          <button
            key={x.title}
            type="button"
            className="lsr-bar"
            data-state={on ? "on" : i < active ? "done" : undefined}
            aria-label={`${i + 1}. adım: ${x.title}`}
            aria-current={on ? "step" : undefined}
            title={x.title}
            onClick={() => goTo(i)}
          >
            <span className="lsr-bar-t" aria-hidden="true">
              {on && running ? (
                <motion.i
                  key={active}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                />
              ) : (
                <i style={{ transform: `scaleX(${i <= active ? 1 : 0})` }} />
              )}
            </span>
            <span className="lsr-bar-n" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------ P2 · yatay ray
   Tam genişlikte yedi çubuk, altlarında sayı. Altında seçili adım: başlık,
   iki satır, iş kimde; yanında kart. */
export function SurecP2() {
  const { hostRef, active, running, goTo, reduced } = useStepper(STEPS.length);
  return (
    <section ref={hostRef} className="lsr">
      <Bars active={active} running={running} goTo={goTo} />
      <div className="lsr-p2-detail">
        <Detail active={active} />
        <SceneCard current={active} reduced={reduced} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ P3 · tek büyük adım
   Solda yalnız o anki adım; altında çubuklar ve sayılar, ileri/geri. */
export function SurecP3() {
  const { hostRef, active, running, goTo, reduced } = useStepper(STEPS.length);
  const next = STEPS[(active + 1) % STEPS.length];
  return (
    <section ref={hostRef} className="lsr">
      <div className="lsr-p3-grid">
        <div>
          <Detail active={active} />
          <Bars active={active} running={running} goTo={goTo} />
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
