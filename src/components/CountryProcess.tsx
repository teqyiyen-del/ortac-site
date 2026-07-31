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

   ---- Kart neden artık rayın boyunda ----

   Önceki turda kart rayın boyuna GERİLMİYORDU ve gerekçesi şuydu: sahne sabit
   560x330'luk bir çizim, kartı uzatmak çizimi büyütmüyor, yalnızca siyah boşluk
   üretiyor. Gerekçe ölçüme dayanıyordu ama müşterinin gördüğü şeyi açıklamıyor:
   ortalanmış kart, rayın ne başıyla ne sonuyla hizalıydı; iki sütun birbirine
   ait iki parça gibi değil, yan yana düşmüş iki kutu gibi duruyordu. İstenen
   net: kartın üstü 1. maddenin üstünde, altı son maddenin sonunda.

   Hizalama artık bir yükseklik değeri değil, ızgaranın kendisi (bkz. process.css
   .cpr-grid): başlık bloğu birinci satırda tek başına, ray ile kart ikinci
   satırda yan yana. Aynı ızgara satırındaki iki hücre aynı boyda olmak zorunda,
   yani hizalama üç ülkede de kendiliğinden çıkıyor ve hiçbir yerde piksel
   yazmıyor. Hangi tarafın gerildiği ülkeye göre değişiyor: Dubai'nin yedi
   satırlık rayı (651px) kartı uzatıyor, beş adımlı ülkelerde kart (553px) uzun
   olan taraf ve bu kez ray, farkı satır ARALARINA dağıtarak boyuna geliyor.

   Siyah boşluk gerçek bir sorundu ve çözümü de orada: kart uzayınca sahne kartın
   tam genişliğine açılıyor, artan yükseklik çizimin altına ve üstüne eşit
   paylaştırılıyor, gövdenin dibinde de adımların ilerlemesini gösteren bir şerit
   duruyor. Ölçüler process.css'in ikinci başlığında; özeti şu: sahnenin kart
   içindeki payı 1440px'te %53, eski (gerilmeyen, altında paragraf olan) kartta
   %52'ydi.

   ---- Sahnenin altındaki açıklama paragrafı neden kalktı ----

   Adımın üç dört cümlelik açıklaması (countryContent'teki Step.line) bir tur
   rayda, bir tur da kartın içinde sahnenin altında basılıyordu. İkisi de
   kalktı: çizim zaten o adımı anlatıyor, altına aynı şeyi yazmak okunmayan bir
   metin bloğu üretiyor.

   Metin silinmedi, yalnızca bu bölüm basmıyor: Step.line countryContent'te
   duruyor ve BURADA da kullanılıyor — raydaki butonun aria-label'ı adımın tam
   anlatımını taşıyor. Yani ekranda görünmüyor, ekran okuyucuda duruyor; sahne
   aria-hidden olduğu için o etiket metnin tek erişilebilir kopyası.

   Ad alanı: rayın ve kartın görünümü globals.css'teki ops- ve cps- kurallarından
   geliyor ve `ops-` setini Workflow.tsx de kullanıyor, bu yüzden buradaki hiçbir
   şey onun anlamına dokunmuyor — bölümün kendi ızgarası dahil her yeni kural
   cpr-* ad alanında, process.css'te. Tek istisna .ops-grid: bu bölüm artık onu
   kullanmıyor (iki sütunu ortalıyordu, oysa burada hizalanacak iki kenar var),
   kural Workflow için yerinde duruyor. */

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
        {/* Üç parça, tek ızgara: başlık bloğu, ray, kart. Ray ile kart kardeş
            olmak ZORUNDA — hizalama ikisinin aynı ızgara satırını paylaşmasından
            geliyor. Eskiden başlık ve ray tek bir sütun kutusunun içindeydi ve o
            kutu kartla eşitleniyordu; kartın üstü o yüzden başlığın hizasına
            değil, sütunun ortasına düşüyordu. */}
        <div className="container-o cpr-grid">
          <div className="cpr-intro">
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
          </div>

          {/* loose buttons need to arrive as one thing, otherwise the only
              context a screen reader has for them is the heading a few
              elements back */}
          <div
            className="ops-rail cps-rail cpr-rail"
            role="group"
            aria-label="Süreç adımları"
          >
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
                  /* Etiket adımın tamamını taşıyor, başlığını değil: ekranda
                     yalnızca başlık ve etiketler görünüyor, adımın anlatımı
                     (Step.line) hiçbir yerde basılmıyor ve kart ekran
                     okuyucudan gizli — metnin tek erişilebilir kopyası burası. */
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

          <div className="ops-stage ops-stage-night cps-card cpr-card">
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

              {/* Çizimin altındaki adım şeridi. İki işi var ve ikisi de kartın
                  rayla aynı boya çıkmasından doğdu.

                  Birincisi ölçülebilir: kart artık rayın boyunda, sahne ise
                  sabit oranlı bir çizim (560x330) ve kartın genişliğinden
                  fazlasına büyüyemiyor. Aradaki farkın bir kısmını bu şerit
                  alıyor — kalanı çizimin etrafındaki paspartu oluyor.

                  İkincisi anlam: soldaki ray yürürken aktif satırın altındaki
                  çubuk doluyor, kartın kendisinde ise zamanın nereye geldiğini
                  söyleyen hiçbir şey yoktu. Şerit o çubuğun kart tarafındaki
                  karşılığı; renk mantığı da rayla aynı (biten yeşil, yürüyen
                  mavi). Yeni bir bilgi eklemiyor, tıklanmıyor — tıklanan şey
                  ray. Bu yüzden kartın geri kalanıyla birlikte aria-hidden. */}
              <div className="cpr-meter">
                {steps.map((s, i) => (
                  <span
                    key={s.title}
                    className="cpr-seg"
                    data-state={
                      i < current ? "done" : i === current ? "on" : undefined
                    }
                  >
                    {i === current && running && (
                      /* Doluş süresi zamanlayıcının adım süresiyle aynı: şerit
                         bir tahmin değil, sayacın kendisi. Yalnızca sayaç
                         yürürken basılıyor; duraklatılmış (ziyaretçi bir adım
                         seçmiş) ya da hareket azaltılmış durumda segment boş
                         kalıyor, sahte bir dolum göstermiyor. */
                      <motion.i
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* ---- KALDIRILDI · sahnenin altındaki açıklama paragrafı ----
                Burada step.line'ı basan bir paragraf duruyordu (kartın altına
                yaslı, sahneyle birlikte değişen). Kalktı: çizim adımı zaten
                anlatıyor, altındaki üç dört cümle onun tekrarıydı ve kimse
                okumuyordu. Bir alternatif konuşuldu — açıklamayı sola, o an
                yürüyen ray satırının altına açmak — o da denenmedi: satır
                yüksekliği oynardı, zamanlayıcı yürürken tıklama hedefleri
                kayardı ve sol sütun bu bölümün en sade parçası.
                Metin countryContent'te duruyor; ekran okuyucuya raydaki
                butonun aria-label'ıyla ulaşıyor. */}

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
