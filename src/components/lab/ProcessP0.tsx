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

/* ============================================================================
   P0 · ÜLKE SÜREÇ BÖLÜMÜNÜN YEDEĞİ — bu, bir aday DEĞİL, bir arşiv
   ============================================================================
   Bu dosya yeni bir tasarım denemesi değil: CountryProcess.tsx'in P1 canlıya
   alınmadan ÖNCEKİ hâli. Müşterinin isteği aynen şuydu — "p1'i siteye
   aktarabilirsin ama şu an sitede olan süreç kısmını da silmeyelim, onu al laba
   koy, orda backup olarak dursun, belki yine fikir değişiriz ya da murat abi
   onu daha çok beğenir."

   Yani buranın işi güzelleşmek değil, HATIRLAMAK. Kod olduğu gibi taşındı;
   tek dokunulan şey ad alanı (aşağıda) ve section'ın id'si (lab sayfasında üç
   bölüm aynı anda duruyor, "surec" id'si tek olmak zorunda — kazanan canlıda
   onu taşıyor).

   ---- Ad alanı neden değişti ----

   Canlı bölüm görünümünü üç yerden alıyordu: globals.css'teki `ops-` seti
   (Workflow.tsx ile PAYLAŞILAN), yine globals'taki `cps-` seti ve
   process.css'teki `cpr-` seti. P1 canlıya geçerken process.css baştan yazıldı
   ve `cpr-` adları artık P1'in kurallarını taşıyor. Bu yedek o adlarda kalsaydı
   canlı bölümün her düzeltmesi yedeği de değiştirirdi — yani yedek, yedeklediği
   şeyi kaybederdi.

   Bu yüzden bölümün ihtiyaç duyduğu bütün kurallar tek bir ad altında,
   `.p0-*` olarak lab-p1.css'in sonuna kopyalandı. Kopya bedava değil (aynı
   görünüm iki yerde) ama burada bu tam olarak istenen şey: yedeğin canlıdan
   BAĞIMSIZ yaşaması. Bileşen artık `ops-`, `cps-` veya `cpr-` adlarından
   hiçbirine dokunmuyor, dolayısıyla ne Workflow'u ne de yeni canlı bölümü
   etkileyebiliyor.

   Aşağıdaki yorumlar o günkü gerekçeleri olduğu gibi taşıyor: bir gün bu
   tasarıma geri dönülürse kararların NEDEN öyle verildiği burada duruyor.

   ---- (arşiv) Süreç bölümü: solda adım rayı, sağda gece kartı ----

   Bölüm bir tur akordiyona çevrilmişti ve müşteri geri istedi — haklı olarak:
   akordiyon adımları saklıyor, oysa bu bölümün vaadi yolu bir bakışta
   göstermek. Kurgu geri geldi, Dubai'nin yedi adımı da yerinde duruyor.

   İki sürücü var. Blok ekrandayken bir zamanlayıcı adımları sırayla yürütüyor;
   raydaki her satır aynı zamanda bir buton, birine basmak (ya da klavyeyle
   seçmek) kontrolü ziyaretçiye veriyor ve zamanlayıcıyı bir süre durduruyor.
   Sonra kaldığı yerden devam ediyor, yani bölüm hiçbir zaman donmuş kalmıyor.
   prefers-reduced-motion açıkken zamanlayıcı hiç çalışmıyor: ray düz bir
   seçiciye dönüyor, panel yalnızca tıklamayla değişiyor.

   ---- (arşiv) Kart neden rayın boyunda ----

   Bir turda kart rayın boyuna GERİLMİYORDU ve gerekçesi şuydu: sahne sabit
   560x330'luk bir çizim, kartı uzatmak çizimi büyütmüyor, yalnızca siyah boşluk
   üretiyor. Gerekçe ölçüme dayanıyordu ama müşterinin gördüğü şeyi açıklamıyor:
   ortalanmış kart, rayın ne başıyla ne sonuyla hizalıydı; iki sütun birbirine
   ait iki parça gibi değil, yan yana düşmüş iki kutu gibi duruyordu. İstenen
   net: kartın üstü 1. maddenin üstünde, altı son maddenin sonunda.

   Hizalama bir yükseklik değeri değil, ızgaranın kendisi: başlık bloğu birinci
   satırda tek başına, ray ile kart ikinci satırda yan yana. Aynı ızgara
   satırındaki iki hücre aynı boyda olmak zorunda, yani hizalama üç ülkede de
   kendiliğinden çıkıyor ve hiçbir yerde piksel yazmıyor. Hangi tarafın
   gerildiği ülkeye göre değişiyor: Dubai'nin yedi satırlık rayı (1440px'te
   651px) kartı uzatıyor, beş adımlı ülkelerde kart (553px) uzun olan taraf ve
   bu kez ray, farkı satır ARALARINA dağıtarak boyuna geliyor.

   Siyah boşluk gerçek bir sorundu ve çözümü de orada: kart uzayınca sahne kartın
   tam genişliğine açılıyor, artan yükseklik çizimin altına ve üstüne eşit
   paylaştırılıyor, gövdenin dibinde de adımların ilerlemesini gösteren bir şerit
   duruyor.

   ---- (arşiv) Sahnenin altındaki açıklama paragrafı neden yok ----

   Adımın üç dört cümlelik açıklaması (countryContent'teki Step.line) bir tur
   rayda, bir tur da kartın içinde sahnenin altında basılıyordu. İkisi de
   kalktı: çizim zaten o adımı anlatıyor, altına aynı şeyi yazmak okunmayan bir
   metin bloğu üretiyor.

   Metin silinmedi, yalnızca ekrana basılmıyor: Step.line BURADA da kullanılıyor
   — raydaki butonun aria-label'ı adımın tam anlatımını taşıyor. Ekranda
   görünmüyor, ekran okuyucuda duruyor; sahne aria-hidden olduğu için o etiket
   metnin tek erişilebilir kopyası. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* bir adımın kendi başına durduğu süre */
const STEP_MS = 3600;
/* Seçilen bir adımın, panel kendi kendine yürümeye devam etmeden önce tutulma
   süresi. Adımı okumaya yetecek kadar uzun, bölümü sonsuza dek dondurmayacak
   kadar kısa. */
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

export default function ProcessP0({
  steps,
  title,
}: {
  steps: Step[];
  title: string;
}) {
  const hostRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  /* Ziyaretçi devraldı — ve bunu yalnızca bir adım SEÇEREK yapabiliyor: tıklama
     ya da klavyeyle etkinleştirme (o da bir tıklama üretiyor). Odak bunu bilerek
     tetiklemiyor; odak bir ray butonuna karar dışında bir sürü sebeple düşüyor
     ve tek bir kaçak odak bölümü dondurmamalı.

     Bayrak değil sayaç. Bayrakla, zaten görünen adıma basmak hiçbir state
     değiştirmiyordu, dolayısıyla aşağıdaki etki yeniden çalışmıyor ve tutma
     yenilenmiyordu: panel, ziyaretçinin "burada kal" dediği adımdan yürüyüp
     gidiyordu. Her seçim jetonu bir artırıyor, her seçim zaman aşımını baştan
     başlatıyor. Sıfır, kimsenin tutmadığı anlamına geliyor. */
  const [hold, setHold] = useState(0);
  const [inView, setInView] = useState(false);

  const total = steps.length;
  /* ekran dışında hiçbir şey yürümüyor, hareket azaltma açıkken de hiçbir şey
     yürümüyor: orada ray düz bir seçici, panel yalnızca tıklamayla değişiyor */
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

  /* Tutma süresi doluyor: bir adım seçmek paneli okuyucunun elinin altından
     kaydırmayı durduruyor — bütün amacı bu — ama animasyonu temelli
     bitirmemeli. */
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

  /* Adım sayısı ülkeye göre değişiyor (Dubai 7, ötekiler 5). İndekse
     güvenilmiyor, kırpılıyor: liste kısalırsa imleç listenin dışını
     göstermesin. */
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
        ref={hostRef}
        className="sec-pad"
        style={{ background: "var(--white)" }}
      >
        {/* Üç parça, tek ızgara: başlık bloğu, ray, kart. Ray ile kart kardeş
            olmak ZORUNDA — hizalama ikisinin aynı ızgara satırını paylaşmasından
            geliyor. Eskiden başlık ve ray tek bir sütun kutusunun içindeydi ve o
            kutu kartla eşitleniyordu; kartın üstü o yüzden başlığın hizasına
            değil, sütunun ortasına düşüyordu. */}
        <div className="container-o p0-grid">
          <div className="p0-intro">
            <SplitWords
              as="h2"
              text={title}
              accent="adım adım."
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="p0-lead">
                Her adımda topun kimde olduğu yazıyor. Adımlar sırayla ilerler; bir
                adıma bastığınızda durur, ayrıntısı panelde açılır.
              </p>
            </FadeUp>
          </div>

          {/* Serbest duran butonlar ekran okuyucuya tek bir şey olarak varmalı,
              yoksa tek bağlamları birkaç eleman öncesindeki başlık. */}
          <div className="p0-rail" role="group" aria-label="Süreç adımları">
            {steps.map((s, i) => {
              const rowKind = stepSceneKind(s.title);
              const Icon = rowKind ? ICON_BY_KIND[rowKind] : FileText;
              const isActive = i === current;
              const done = i < current;
              return (
                <button
                  key={s.title}
                  type="button"
                  className="p0-row"
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
                  <span className="p0-ic">
                    {done ? (
                      <Check size={17} strokeWidth={3} />
                    ) : (
                      <Icon size={17} strokeWidth={1.9} />
                    )}
                  </span>
                  <span className="p0-text">
                    <span className="p0-t">
                      <i>{String(i + 1).padStart(2, "0")}</i>
                      {s.title}
                    </span>
                    <span className="p0-tags">
                      <b>{s.timing}</b>
                      <em data-who={s.who}>{WHO_LABEL[s.who]}</em>
                    </span>
                  </span>
                  {isActive && (
                    /* Altı çizgi aynı zamanda bekleme sayacı: tam bir adım
                       boyunca doluyor, yani ray zamanın nerede olduğunu
                       gösteriyor. Yalnızca sayaç yürürken basılıyor, bu yüzden
                       her seferinde boştan başlıyor ve tutulan bir adım sahte
                       bir dolum değil, boş bir yatak gösteriyor. */
                    <span className="p0-bar" aria-hidden="true">
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

          <div className="p0-card">
            <div className="p0-head">
              <div className="p0-head-txt">
                {/* büyük satır sabit duruyor, küçük olan canlı imleç — ana
                    sayfadaki panelle aynı yönde */}
                <p className="p0-head-t">Kuruluş dosyası</p>
                <p className="p0-head-s">{step.title}</p>
              </div>
              <span className="p0-head-tag">
                {current + 1}/{total}
              </span>
            </div>

            {/* Sahne ekran okuyucudan gizli, bilerek: çizim raydaki satırın
                söylediğini tekrar ediyor ve 3.6 saniyede bir kendi kendine
                değişiyor. Kelimeleri ray taşıyor, bu onların resmi. */}
            <div className="p0-body" aria-hidden="true">
              <div className="p0-stage" data-empty={Scene ? undefined : "true"}>
                <AnimatePresence mode="wait" initial={false}>
                  {Scene && (
                    <motion.div
                      key={current}
                      className="p0-slide"
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

                  Birincisi ölçülebilir: kart rayın boyunda, sahne ise sabit
                  oranlı bir çizim (560x330) ve kartın genişliğinden fazlasına
                  büyüyemiyor. Aradaki farkın bir kısmını bu şerit alıyor —
                  kalanı çizimin etrafındaki paspartu oluyor.

                  İkincisi anlam: soldaki ray yürürken aktif satırın altındaki
                  çubuk doluyor, kartın kendisinde ise zamanın nereye geldiğini
                  söyleyen hiçbir şey yoktu. Şerit o çubuğun kart tarafındaki
                  karşılığı; renk mantığı da rayla aynı (biten yeşil, yürüyen
                  mavi). Yeni bir bilgi eklemiyor, tıklanmıyor — tıklanan şey
                  ray. Bu yüzden kartın geri kalanıyla birlikte aria-hidden. */}
              <div className="p0-meter">
                {steps.map((s, i) => (
                  <span
                    key={s.title}
                    className="p0-seg"
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

            {/* Kalması şart olan tek cümle: panel son adıma kendi kendine
                yürüyor, dolayısıyla taahhüt vermediğimiz kelimeyle söylenmeli,
                tikin yokluğuyla ima edilmemeli. */}
            <p className="p0-foot">
              Süreler tipik aralıktır. Kurum ve banka kararları ilgili kuruluşlara
              aittir; sonuç ve süre garanti edilmez.
            </p>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
