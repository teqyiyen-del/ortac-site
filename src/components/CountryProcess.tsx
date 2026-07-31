"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  BadgeCheck,
  Check,
  FileCheck,
  FileText,
  IdCard,
  Landmark,
  MapPin,
  PackageCheck,
  ScrollText,
  Tags,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import {
  SCENE_BY_KIND,
  stepSceneKind,
  type SceneKind,
} from "@/components/scenes/SetupScenes";
import { WHO_LABEL, type Step } from "@/lib/countryContent";

/* Süreç bölümü: solda adım rayı, sağda o adımın çizildiği gece kartı.

   Bölüm bir tur akordiyona çevrilmişti ve müşteri geri istedi — haklı olarak:
   akordiyon adımları saklıyor, oysa bu bölümün vaadi yolu bir bakışta
   göstermek. Kurgu geri geldi, Dubai'nin yedi adımı da yerinde duruyor.

   İki sürücü var. Blok ekrandayken bir zamanlayıcı adımları sırayla yürütüyor;
   raydaki her satır aynı zamanda bir buton, birine basmak (ya da klavyeyle
   seçmek) kontrolü ziyaretçiye veriyor ve zamanlayıcıyı bir süre durduruyor.
   Sonra kaldığı yerden devam ediyor, yani bölüm hiçbir zaman donmuş kalmıyor.
   prefers-reduced-motion açıkken zamanlayıcı hiç çalışmıyor: ray düz bir
   seçiciye dönüyor, panel yalnızca tıklamayla değişiyor.

   Kart soldaki rayın boyuna GERİLMİYOR, bu ölçülüp verilmiş bir karar ve eski
   koddan olduğu gibi korunuyor: sahne sabit 560x330'luk bir çizim, kartı
   uzatmak çizimi büyütmüyor, yalnızca siyah boşluk üretiyor. .ops-grid iki
   sütunu zaten ortalıyor.

   ---- Adım açıklaması neden rayda değil kartta ----

   Eski rayda her satır üç parçaydı: başlık, bir cümlelik açıklama, etiketler.
   O açıklamalar artık bir cümle değil, üç dört cümle (bkz. countryContent'teki
   Step tipi) ve Dubai'de yedi tane var. Ölçüldüğünde ray 1176px'e çıkıyor,
   yanındaki kart 630px'de kalıyor: bölüm tek bir metin duvarına dönüşüyor ve
   müşterinin istediği "yol" görüntüsü kayboluyor.

   Açıklama silinmedi, taşındı: sahnenin altına, onu anlatan çizimin yanına.
   Böylece ray yedi duraklı temiz bir yol olarak kalıyor (satır yüksekliği sabit,
   zamanlayıcı yürürken hiçbir satır yer değiştirmiyor — imlecin altındaki tıklama
   hedefi kaymıyor) ve açıklama, ait olduğu görselle aynı karede duruyor.

   Ad alanı: rayın ve kartın görünümü globals.css'teki ops- ve cps- kurallarından
   geliyor; Workflow.tsx ile ProcessScroll.tsx de aynı seti kullanıyor, bu yüzden
   buradaki hiçbir şey onların anlamına dokunmuyor.
   Bu bölüme özel tek yeni kural cpr-* ad alanında, process.css'te. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* how long one step holds before the next one takes over */
const STEP_MS = 3600;
/* how long a chosen step is held before the panel resumes on its own. Long
   enough to read the step without it moving, short enough that the section is
   never left frozen. */
const HOLD_MS = 11000;

/* Raydaki simge de çizimle aynı yerden besleniyor: ikisi de adımın TÜRÜNDEN
   geliyor, sıra numarasından değil. Eski kod simgeleri bir diziden indeksle
   alıyordu ve Dubai yediye çıkınca altıncı adım simgesiz kalıyordu; aynı
   kayma bir yerde daha olmasın diye tek bir sınıflandırma iki tüketiciyi
   birden besliyor. */
const ICON_BY_KIND: Record<SceneKind, LucideIcon> = {
  form: FileText,
  name: BadgeCheck,
  activity: Tags,
  jurisdiction: MapPin,
  licence: ScrollText,
  identity: IdCard,
  registry: FileCheck,
  bank: Landmark,
  handover: PackageCheck,
};

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
     activation, which fires a click too. Focus deliberately does not set this —
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

  if (total === 0) return null;

  /* Adım sayısı ülkeye göre değişiyor (Dubai 7, ötekiler 5). İndeks güvenilmiyor,
     kırpılıyor: liste kısalırsa imleç listenin dışını göstermesin. */
  const current = Math.min(active, total - 1);
  const step = steps[current];
  const kind = stepSceneKind(step.title);
  const Scene = kind ? SCENE_BY_KIND[kind] : null;

  return (
    /* Hareket azaltma isteği burada tek yerden karşılanıyor.
       Zamanlayıcıyı `running` zaten durduruyor, geçiş süreleri de `reduced` ile
       sıfırlanıyor — ama sahnelerin KENDİ giriş animasyonları (form alanlarının
       yazılması, mührün oturması, satırların kayarak gelmesi) SetupScenes'in
       içinde ve orada böyle bir kontrol yok. O dosya ana sayfayla paylaşıldığı
       için dokuz çizimin her birine ayrı ayrı bayrak geçirmek yerine, kural
       ağacın tepesinde bir kez konuyor: reducedMotion="user" alttaki bütün
       motion bileşenlerinde dönüşüm ve düzen animasyonlarını kapatıyor,
       opaklık geçişlerini bırakıyor — yani çizimler yerlerinden oynamadan
       beliriyor. SplitWords ile FadeUp de aynı kuralın altında. */
    <MotionConfig reducedMotion="user">
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
                Her adımda topun kimde olduğu yazıyor. Adımlar sırayla ilerler; bir
                adıma bastığınızda durur, ayrıntısı panelde açılır.
              </p>
            </FadeUp>

            {/* loose buttons need to arrive as one thing, otherwise the only
                context a screen reader has for them is the heading a few
                elements back */}
            <div className="ops-rail cps-rail" role="group" aria-label="Süreç adımları">
              {steps.map((s, i) => {
                const rowKind = stepSceneKind(s.title);
                const Icon = rowKind ? ICON_BY_KIND[rowKind] : FileText;
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
                    /* Etiket satırın tamamını taşıyor, başlığı değil: açıklama
                       ekranda kartta duruyor ve kart ekran okuyucudan gizli, o
                       yüzden metnin tek erişilebilir kopyası burası. */
                    aria-label={`${i + 1}. adım: ${s.title}. ${s.line} ${s.timing}, ${WHO_LABEL[s.who]}.`}
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
                      <span className="ops-tags">
                        <b>{s.timing}</b>
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
                <p className="cps-head-s">{step.title}</p>
              </div>
              <span className="cps-head-tag">
                {current + 1}/{total}
              </span>
            </div>

            {/* Sahne ekran okuyucudan gizli, bilerek.
                The drawing repeats what the rail row already says and it is
                replaced every 3.6 seconds on its own. The rail carries the words;
                this is the picture of them. */}
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

            {/* Adımın açıklaması. Sahneyle aynı anda ve aynı süreyle değişiyor ki
                çizim ile cümle tek bir hareket gibi okunsun. Ekran okuyucudan
                gizli: metnin kendisi raydaki butonun etiketinde duruyor ve 3,6
                saniyede bir kendi kendine değişen bir paragraf orada tekrar
                okunacak bir şey değil. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={current}
                className="cpr-say"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
              >
                {step.line}
              </motion.p>
            </AnimatePresence>

            {/* the one line that has to stay: the panel walks to the last step on
                its own, so the non-guarantee is said in words rather than implied
                by the absence of a tick */}
            <p className="cps-foot">
              Süreler tipik aralıktır. Kurum ve banka kararları ilgili kuruluşlara
              aittir; sonuç ve süre garanti edilmez.
            </p>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
