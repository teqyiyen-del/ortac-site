"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { Check } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import {
  SCENE_BY_KIND,
  stepSceneKind,
  type SceneKind,
} from "@/components/scenes/SetupScenes";
import { WHO_LABEL, type Step } from "@/lib/countryContent";

/* ============================================================================
   TEŞHİS · ana sayfadaki süreç neden "clean", ülke sayfasındaki neden değil
   ============================================================================
   Müşteri iki bölümü yan yana koyup birine temiz, ötekine kalabalık dedi. İkisi
   de aynı ray + gece kartı dilini konuşuyor, yani fark dilde değil; ne kadar
   yük taşındığında. Üç yerde ölçüldü.

   1 · SATIR BAŞINA DÜŞEN NESNE. Ana sayfanın rayında bir satır ÜÇ şey taşıyor:
       28px'lik ince bir daire, 15px/500 bir başlık, altında tek gri satır.
       Ülke sayfasının rayında bir satır BEŞ şey taşıyor: 38px'lik DOLU bir
       ikon karesi, mavi bir sıra numarası, 18.5px/600 bir başlık, koyu puntolu
       bir süre, ve renk kodlu bir "top kimde" hapı. Seçili satır bunların
       üstüne bir de dolu gri zemin ve altına bir sayaç çubuğu alıyor.
       Beş adım × üç nesne = 15. Yedi adım × beş nesne = 35. Aradaki fark
       "iki adım daha" değil, iki kattan fazla nesne.

   2 · AYNI ANDA KAÇ RENK SİSTEMİ ÇALIŞIYOR. Ana sayfada tek aksan var (mavi)
       ve biten adımda bir yeşil tik. Ülke sayfasında ikon karesi üç renk
       (gri / mavi / yeşil), hapın kendisi üç renk daha (gri / mavi / yeşil),
       kartın içindeki şerit yine mavi-yeşil, kart başlığındaki rozet ayrı bir
       mavi. Göz bir listeye değil, bir gösterge paneline bakıyor — kalabalık
       hissinin asıl kaynağı bu.

   3 · SESİN YÜKSEKLİĞİ. 18.5px/600 bir başlık, h2'nin hemen altında yedi kez
       tekrarlanınca ray başlığın rakibi oluyor; bölümün en yüksek sesi artık
       başlık değil. Ana sayfanın 15px/500'ü başlığın altında kalıyor.

   Bir de dördüncüsü var, kartın tarafında: kart raya gerildiği için (1440px'te
   651px) ve çizim sabit oranlı olduğu için (560x330), sağda küçük bir resmin
   yüzdüğü uzun bir siyah levha çıkıyor. Yani bölüm aynı anda hem SOLDA
   kalabalık hem SAĞDA boş — "bir şeyler yanlış, tam oturmadı" tarifi tam olarak
   bu. Adım sayısı suçlu değil: aynı yedi adım üç nesneli satırlarla yazıldığında
   ray, kartın doğal boyunun içine kendiliğinden oturuyor (aşağıdaki ölçüme
   bakın).

   ============================================================================
   FİKİR · aynı dil, daha az yük
   ============================================================================
   Tasarımı değiştirmiyoruz; ülke sayfasının FAZLADAN taşıdığını bırakıyoruz.
   Ana sayfanın rayı neredeyse birebir alındı — nokta + iplik, 15px başlık, tek
   gri alt satır — ve Dubai'nin yedi adımı ona sığdı. Atılanlar: ikon kareleri,
   ayrı sıra numarası, renkli "kimde" hapları, seçili satırın dolu zemini,
   satır altı sayaç çubuğu, kartın içindeki yedi bölmeli şerit, ve iki cümlelik
   spot metnin ikinci cümlesi.

   Hiçbir bilgi silinmedi, yerleri değişti:
   · TOP KİMDE — ana sayfanın rayında zaten boş duran gri alt satıra taşındı.
     Satır "Sizde · ilk görüşme" diyor. Yalnızca "kimde" kısmı bir tık mürekkep
     alıyor (500 ağırlık, text-900); süre gri kalıyor. Yeni bir kutu, yeni bir
     renk, yeni bir hap yok — bir tipografik basamak var.
   · SIRA NUMARASI — noktanın içinde. Ana sayfada da orada.
   · ADIMIN TAM ANLATIMI (Step.line) — ekranda hiç basılmıyor, butonun
     aria-label'ında duruyor. Kart ekran okuyucudan gizli olduğu için metnin tek
     erişilebilir kopyası orası. Bu, canlı bölümden devralınan doğru karardı.
   · SAYAÇ — rayın kendi ipliği doluyor. Kartın içindeki ikinci şerit gereksizdi:
     aynı şeyi iki yerde söylüyordu.

   ============================================================================
   İKİ SÜTUNUN HİZASI · neden hâlâ ızgara, ama neden artık siyah levha yok
   ============================================================================
   Geçen turda onaylanan kural duruyor: kartın üstü birinci maddenin üstünde,
   altı son maddenin altında. Bunu yükseklik yazarak değil ızgarayla yapıyoruz —
   başlık birinci satırda tek başına, ray ile kart ikinci satırda yan yana; aynı
   ızgara satırındaki iki hücre zaten aynı boyda olmak zorunda.

   Değişen şu: ray hafiflediği için iki tarafın DOĞAL boyu neredeyse eşitlendi.
   1200px'lik kapta sağ sütun 590px geniş, çizim 560x330 oranında, yani kartın
   doğal boyu ~437px; yedi satırlık yeni ray ~464px. Fark 27px ve o da çizimin
   altına/üstüne 13'er piksel olarak dağılıyor. Eski kurguda bu fark 651−437 =
   214px'ti ve noktalı bir dokuyla doldurulması gerekiyordu; artık doldurulacak
   bir şey yok, doku da kalktı.

   Beş adımlı ülkelerde (İngiltere, KKTC) uzun taraf kart oluyor ve ray geriliyor.
   Ray bir ızgara ve satırları `grid-auto-rows: 1fr` ile eşit paylaşıyor, yani
   fazlalık satırların İÇİNE dağılıyor; ipliği her satır kendi kutusunun 11px
   altına kadar çizdiği için bağlantı kopmuyor, sadece uzuyor.

   Dipnot (kesin süre / karar taahhüdü yok) kartın dışına, RAYIN altına alındı.
   Ana sayfada dipnot kartın altında, ülke seçici de rayın altında — iki sütunun
   birer kuyruğu var ve alt kenarlar o yüzden çakışıyor. Burada seçici yok; tek
   kuyruğu rayın altına koymak kartı iki parçalı (baş + gövde) bırakıyor, yani
   ana sayfadaki kartla birebir aynı iskelet.

   Ad alanı: her yeni kural `.p1-` altında, src/app/css/lab-p1.css'te. Bu bölüm
   `ops-`, `cps-`, `cpr-`, `proc-` veya `pr5-` setlerinden hiçbirini KULLANMIYOR
   — canlı bölümleri paylaşılan bir kuralı değiştirerek bozmamak için kopya
   değil, kendi kuralları yazıldı. Paylaşılan tek şey çizimlerin `.dv-*` renk
   kümesi; onun da alfalı değerleri kartın içinde opak karşılıklarıyla eziliyor
   (koyu yüzeyde alfa yok kuralı).

   id="surec" bilerek yok: adaylar /lab'de aynı sayfada duruyor, üç bölüm aynı
   id'yi taşıyamaz. Kazanan canlıya taşınırken id geri konur. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* bir adımın kendi başına durduğu süre */
const STEP_MS = 3600;
/* seçilen bir adımın tutulma süresi. Okumaya yetecek kadar uzun, bölümü sonsuza
   dek dondurmayacak kadar kısa. */
const HOLD_MS = 11000;

export default function ProcessP1({
  steps,
  title,
}: {
  steps: Step[];
  title: string;
}) {
  const hostRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  /* Ziyaretçi devraldı. Sayaç, bayrak değil: zaten görünen adıma basmak bir
     bayrağı değiştirmiyor, dolayısıyla aşağıdaki etki yeniden çalışmıyor ve
     tutma yenilenmiyordu — panel, ziyaretçinin "burada kal" dediği adımdan
     yürüyüp gidiyordu. Her seçim jetonu bir artırıyor, her seçim zaman aşımını
     baştan başlatıyor. Sıfır, kimsenin tutmadığı anlamına geliyor. */
  const [hold, setHold] = useState(0);
  const [inView, setInView] = useState(false);

  const total = steps.length;
  /* ekran dışında hiçbir şey yürümüyor; hareket azaltmada da yürümüyor — orada
     ray düz bir seçici, panel yalnızca tıklamayla değişiyor */
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

  useEffect(() => {
    if (hold === 0) return;
    const id = window.setTimeout(() => setHold(0), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [hold]);

  const goTo = useCallback((i: number) => {
    setHold((h) => h + 1);
    setActive(i);
  }, []);

  /* Kartın boyu adımdan bağımsız olmak zorunda: dokuz çizim aynı 560x330
     viewBox'ı paylaşıyor ama hepsi o kutuyu aynı ölçüde doldurmuyor ve sayaç
     3.6 saniyede bir değiştiriyor. Ana sayfadaki çözüm buraya da geldi — bu
     ülkenin çözdüğü BÜTÜN çizimler aynı ızgara hücresine görünmez olarak
     yığılıyor, görünen olan üstlerinde duruyor; sahne her zaman en uzun adımın
     boyunda kalıyor ve hiçbir kırılma noktasına elle yükseklik yazılmıyor.
     Tekrarlar eleniyor: Dubai'nin yedi adımı yedi ayrı türe düşüyor, beş adımlı
     ülkelerde ise aynı tür iki kez geçebiliyor (ör. KKTC'de "Tescil" ile
     "Vergi kaydı ve teslim" ayrı türler ama İngiltere'de iki adım aynı forma
     düşebiliyor) ve aynı çizimi iki kez basmanın hiçbir faydası yok. */
  const sizerKinds = useMemo(() => {
    const seen = new Set<SceneKind>();
    const out: SceneKind[] = [];
    for (const s of steps) {
      const k = stepSceneKind(s.title);
      if (k && !seen.has(k)) {
        seen.add(k);
        out.push(k);
      }
    }
    return out;
  }, [steps]);

  if (total === 0) return null;

  /* Adım sayısı ülkeye göre değişiyor (Dubai 7, ötekiler 5). İndeks kırpılıyor:
     liste kısalırsa imleç listenin dışını göstermesin. */
  const current = Math.min(active, total - 1);
  const step = steps[current];
  const kind = stepSceneKind(step.title);
  const Scene = kind ? SCENE_BY_KIND[kind] : null;

  return (
    /* Hareket azaltma isteği tek yerden karşılanıyor. Zamanlayıcıyı `running`
       zaten durduruyor, geçiş süreleri `reduced` ile sıfırlanıyor — ama
       sahnelerin KENDİ giriş animasyonları (formun yazılması, mührün oturması)
       SetupScenes'in içinde ve orada böyle bir kontrol yok. O dosya ana sayfayla
       paylaşıldığı için dokuz çizime tek tek bayrak geçirmek yerine kural
       ağacın tepesine konuyor: reducedMotion="user" alttaki bütün motion
       bileşenlerinde dönüşüm ve düzen animasyonlarını kapatıyor, opaklığı
       bırakıyor — çizimler yerlerinden oynamadan beliriyor. SplitWords ve
       FadeUp de aynı kuralın altında. */
    <MotionConfig reducedMotion="user">
      <section
        ref={hostRef}
        className="sec-pad"
        style={{ background: "var(--white)" }}
      >
        <div className="container-o p1-grid">
          <div className="p1-intro">
            <SplitWords
              as="h2"
              text={title}
              accent="adım adım."
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              {/* Tek cümle. Canlıda iki vardı ve ikincisi ("adıma bastığınızda
                  durur, ayrıntısı panelde açılır") panelin yaptığı şeyi tarif
                  ediyordu — panel zaten gözün önünde. */}
              <p className="p1-lead">
                Her adımda topun kimde olduğu yazıyor; tıklayın, durur.
              </p>
            </FadeUp>
          </div>

          {/* Serbest duran butonlar ekran okuyucuya tek bir şey olarak
              varmalı, yoksa tek bağlamları birkaç eleman öncesindeki başlık. */}
          <div className="p1-rail" role="group" aria-label="Süreç adımları">
            {steps.map((s, i) => {
              const isActive = i === current;
              const done = i < current;
              return (
                <button
                  key={s.title}
                  type="button"
                  className="p1-row"
                  data-state={done ? "done" : isActive ? "on" : undefined}
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => goTo(i)}
                  /* Etiket adımın TAMAMINI taşıyor, başlığını değil: ekranda
                     yalnızca başlık, kimde ve süre görünüyor; adımın anlatımı
                     hiçbir yerde basılmıyor ve kart aria-hidden. Metnin tek
                     erişilebilir kopyası burası. */
                  aria-label={`${i + 1}. adım: ${s.title}. ${s.line} ${s.timing}, ${WHO_LABEL[s.who]}.`}
                >
                  {i < total - 1 && (
                    <span className="p1-line" aria-hidden="true">
                      {isActive && running ? (
                        /* İplik aynı zamanda sayaç: tam bir adım boyunca
                           doluyor, yani rayın kendisi zamanın nerede olduğunu
                           söylüyor. Yalnızca sayaç yürürken basılıyor, bu
                           yüzden her seferinde boştan başlıyor ve durdurulmuş
                           bir adım sahte bir dolum göstermiyor. */
                        <motion.span
                          className="p1-line-run"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                        />
                      ) : (
                        <span
                          className="p1-line-fill"
                          style={{ transform: `scaleY(${done ? 1 : 0})` }}
                        />
                      )}
                    </span>
                  )}

                  <span className="p1-dot" aria-hidden="true">
                    {done ? (
                      /* tik dolu bir diskin içinde, o yüzden beyaz olmak
                         zorunda */
                      <Check size={12} strokeWidth={3.2} color="#ffffff" />
                    ) : isActive ? (
                      <span className="p1-dot-in" />
                    ) : (
                      <span className="p1-dot-n">{i + 1}</span>
                    )}
                  </span>

                  <span className="p1-txt">
                    <span className="p1-t">{s.title}</span>
                    {/* Ana sayfada bu satır adımın dört kelimelik özetiydi.
                        Burada ülkeye özel iki gerçek var ve ikisi de tek gri
                        satıra sığıyor: top kimde, ve tipik süre. Kimde olduğu
                        bir hap değil, bir tık mürekkep. */}
                    <span className="p1-m">
                      <b>{WHO_LABEL[s.who]}</b>
                      <i aria-hidden="true">·</i>
                      {s.timing}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Kalması şart olan tek cümle: panel son adıma kendi kendine
              yürüyor, dolayısıyla taahhüt vermediğimiz kelimeyle söylenmeli,
              tikin yokluğuyla ima edilmemeli. */}
          <p className="p1-note">
            Süreler tipik aralıktır. Kurum ve banka kararları ilgili kuruluşlara
            aittir; sonuç ve süre garanti edilmez.
          </p>

          <div className="p1-card">
            <div className="p1-head">
              <div className="p1-head-txt">
                {/* büyük satır sabit duruyor, küçük olan canlı imleç — ana
                    sayfadaki panelle aynı yönde */}
                <p className="p1-head-t">Kuruluş dosyası</p>
                <p className="p1-head-s">{step.title}</p>
              </div>
              <span className="p1-head-tag">
                {current + 1}/{total}
              </span>
            </div>

            {/* Sahne ekran okuyucudan gizli, bilerek: çizim raydaki satırın
                söylediğini tekrar ediyor ve 3.6 saniyede bir kendi kendine
                değişiyor. Kelimeleri ray taşıyor, bu onların resmi. */}
            <div className="p1-body" aria-hidden="true">
              <div className="p1-stage" data-empty={Scene ? undefined : "true"}>
                <div className="p1-sizer">
                  {sizerKinds.map((k) => {
                    const S = SCENE_BY_KIND[k];
                    return <S key={k} />;
                  })}
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  {Scene && (
                    <motion.div
                      key={current}
                      className="p1-slide"
                      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
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
      </section>
    </MotionConfig>
  );
}
