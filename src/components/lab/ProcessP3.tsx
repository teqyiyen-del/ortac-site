"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { SCENE_BY_KIND, stepSceneKind } from "@/components/scenes/SetupScenes";
import { WHO_LABEL, type Step } from "@/lib/countryContent";

/* ============================================================================
   P3 · Süreç — YATAY GÜZERGÂH
   ============================================================================

   ---- ÖNCE TEŞHİS: ana sayfa neden "clean", ülke sayfası neden değil ----

   İki bölüm de aynı dili konuşuyor (solda ray, sağda gece kartı, yürüyen bir
   zamanlayıcı) ama ziyaretçinin gözüne düşen NESNE SAYISI bambaşka. Saydım:

     ProcessScroll (ana sayfa)   satır başına 2 nesne:
       · her satırda aynı yuvarlak nokta (hepsi aynı, üstelik dikey bir çizgiyle
         birbirine bağlı — göz beş satırı tek bir ray olarak okuyor)
       · başlık + üç dört kelimelik alt satır ("pasaport ve adres beyanı")
       5 satır x 2 = 10 nesne, sütun 470 px.

     CountryProcess (ülke sayfası)   satır başına 5 nesne:
       · 38x38 SİMGE KUTUSU, ve simge her satırda başka (dokuz ayrı lucide
         çizimi) — sol kenar sabit bir ray değil, dokuz farklı piktogramdan
         oluşan bir araç çubuğu; göz onları tek bir nesne olarak toplayamıyor
       · 01 numarası
       · 18.5 px başlık (Dubai başlıkları uzun: "Faaliyet ve lisans türünün
         belirlenmesi" satırın neredeyse tamamını yiyor)
       · süre rozeti ("tipik 3-5 gün")
       · kim rozeti ("Ortac'ta"), üstelik renkli zeminli
       7 satır x 5 = 35 nesne, sütun 651 px. Satırları birbirine bağlayan bir
       çizgi de yok; yedi ayrı blok, aralarında 2 px.

   Yani fark adım sayısında değil (5'e karşı 7 tek başına %40 fark), SATIR
   İÇERİĞİNDE: 10 nesneye karşı 35. Buna üç şey daha ekleniyor:

   (1) İKİ TANE İLERLEME GÖSTERGESİ aynı şeyi söylüyor. Aktif satırın altındaki
       sayaç çubuğu (.ops-bar) ve kartın dibindeki yedi bölmeli şerit
       (.cpr-meter) ikisi de "zaman nerede" diyor. Biri fazla.
   (2) HUKUKİ METİN KARTIN İÇİNE GİRMİŞ. Ana sayfada tek cümlelik not kartın
       DIŞINDA, sessiz gri bir dipnot. Ülke sayfasında iki cümle, kartın
       içinde, kendi ayırıcı çizgisiyle — kartı bir arayüzden bir belgeye
       çeviriyor.
   (3) KART RAYIN BOYUNA GERİLİYOR ve bu, olmayan bir yükseklik üretiyor.
       Çizim sabit oranlı (560x330); kart 651 px olunca çizimin altına ve
       üstüne 95 px siyah kalıyor, o boşluk nokta dokusuyla dolduruluyor.
       Ölçtüm: bölüm 1440 px'te 1120 px, kartın %29'u boş. Ziyaretçi bunu
       "kalabalık" diye tarif etmez ama "oturmadı" der — çünkü bir yerde eksik
       bir şey var gibi durur.

   Ritim de aynı yönde bozuluyor: yedi satırda her an beşi opacity 0.5'te,
   zamanlayıcı yürürken bu solma/parlama dalgası yedi satır boyunca dolaşıyor.
   Beş satırda göz dalgayı takip edebiliyor, yedide titreşim gibi okunuyor.

   ---- BUNA GÖRE TASARIM: yol dikeyden yataya alınıyor ----

   Teşhis "satır başına nesne" diyorsa çözüm de orada: adımları yatay bir yola
   dizince satır başına beş nesne KOYAMAZSINIZ, yer yok. Genişlik kısıtı
   sadeliği zorluyor. Her durakta iki şey kalıyor — durak işareti + başlık — ve
   altında tek kelimelik "top kimde". Ana sayfadaki rayın yoğunluğu, yatayda.

   Ne nereye gitti:
     · süre  → duraktan çıktı, seçili adımın panelinde bir kez yazıyor.
               Yedi kez "tipik 2-4 gün" okumak bilgi değil gürültü.
     · sayaç çubuğu + şerit → İKİSİ DE KALKTI. Yolun dolan çizgisi zaten
               nerede olduğunuzu söylüyor; üstüne bir de geri sayım koymak
               teşhisin (1) maddesini tekrarlamak olurdu. Çizgi sürekli akan
               bir sayaç değil, adım değiştiğinde 420 ms'de dolan bir durum.
     · simge kutuları → kalktı. Dokuz farklı piktogram sol kenarı dağıtıyordu;
               duraklar artık aynı 28 px'lik daire (tamamlanan yeşil tik,
               yürüyen mavi numara, sıradaki boş) — tekrar eden aynı işaret
               "ray" hissini veren şeydi ve geri geldi.
     · opacity 0.5 dalgası → kalktı. Durum artık işaretin kendisinde; başlık
               yalnızca renk tonu değiştiriyor (aktif ink, ötekiler gri).
     · kartın gerilmesi → yok. Hizalanacak bir ray kalmadığı için kart kendi
               doğal boyunda: sahne kartın içini tam dolduruyor, tek bir piksel
               üretilmiş siyah boşluk yok, nokta dokusuna da gerek kalmadı.
     · Step.line (adımın anlatımı) → GERİ GELDİ, ama kartın içine değil.
               Önceki turda haklı olarak silinmişti: çizimin ALTINA konmuş üç
               dört cümle çizimle yarışıyordu. Burada çizimin YANINDA, beyaz
               üstünde, 52ch ölçüde ve o yarım sütunun tek metni. Müşteri de
               "iç sayfa olduğu için daha detaylı" diyor; detayın yeri burası.

   Ölçüldü (Dubai, 7 adım, aynı stil sayfası): bölüm 1440 px'te 943 px, canlı
   hâli 1120 px. 1024'te 883'e karşı 1123, 768'de 1144'e karşı 1639, 390'da
   1115'e karşı 1535. Beş adımlı ülkelerde 1440'ta 925 px. Kırılım tablosu
   lab-p3.css'in başında. Yükseklik amaç değildi; duraktaki nesne sayısını
   düşürmenin yan ürünü.

   ---- Yedi durak dar ekranda ne oluyor ----

   Yol kaydırılıyor. Şerit taşınca (mobilde ~2.3 durak sığıyor) yatay olarak
   kayıyor, yürüyen durak kendini ortalıyor, şerit ekranın iki kenarına taşarak
   "yol devam ediyor" diyor. Sayfanın dikey kaydırmasına dokunulmuyor: konum
   scrollTo ile elle hesaplanıyor, scrollIntoView KULLANILMIYOR — o, dikeyde de
   kaydırıp Lenis'in altından sayfayı çekerdi.

   ---- Zamanlayıcı ----

   Ötekilerle aynı iki sürücü: blok ekrandayken yürüyor, bir durağa basmak
   kontrolü ziyaretçiye veriyor. Bir üçüncüsü var, çünkü panelde artık okunacak
   bir paragraf duruyor: imleç bölümün üstündeyken ya da odak içerideyken
   yürüyüş DURUYOR. Okuyanın altından metin kaymasın diye. Dokunmatikte
   pointerenter tıklamayla birlikte gelip takılı kalacağı için bu yalnızca
   (hover: hover) ve (pointer: fine) olan cihazlarda açık.

   Adım süresi 6 sn: beş kısa satırlık ana sayfanın 3.6 sn'si burada bir
   paragrafın altında çok hızlı kalıyordu.

   Ad alanı: her şey .p3- altında, lab-p3.css'te. Canlı CountryProcess'e ve
   process.css'e dokunulmadı; sahneler (SetupScenes) kendi .dv-* kurallarıyla
   geliyor, onlar globals'ta ve paylaşılan kod.

   NOT · section'a bilerek id verilmedi: /lab sayfasında adaylar alt alta
   duruyor ve üçü birden id="surec" taşıyamaz. Canlıya girerken geri konmalı.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* bir durağın kendi başına durduğu süre. Ana sayfadaki 3.6 sn burada yetmiyor:
   panelde bir paragraf var ve altı saniye onun ilk iki cümlesini okumaya denk
   geliyor. Okumaya devam eden zaten imleci bölümün üstüne getirmiş oluyor,
   orada yürüyüş tamamen duruyor. */
const STEP_MS = 6000;
/* seçilen durak kendi başına ne kadar tutuluyor. Ötekilerde 11 sn; burada
   panelde okunacak metin olduğu için uzun. Süre dolunca yürüyüş kaldığı yerden
   devam ediyor — bölüm hiçbir zaman donmuş kalmıyor. */
const HOLD_MS = 20000;

export default function ProcessP3({
  steps,
  title,
}: {
  steps: Step[];
  title: string;
}) {
  const hostRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stopRefs = useRef<Array<HTMLButtonElement | null>>([]);
  /* imleçle durdurma yalnızca gerçek bir imleç varsa. Dokunmatikte
     pointerenter tıklamayla birlikte geliyor ve pointerleave hiç gelmiyor:
     bayrak açık kalır, bölüm bir daha yürümezdi. */
  const finePointer = useRef(false);

  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  /* Sayaç, bayrak değil. Bayrakla, zaten açık olan durağa basmak hiçbir state
     değiştirmiyor, dolayısıyla aşağıdaki timeout yeniden kurulmuyor ve panel
     ziyaretçinin "burada kal" dediği adımdan yürüyüp gidiyordu. Her seçim
     jetonu artırıyor, her seçim süreyi baştan başlatıyor. Sıfır = tutan yok. */
  const [hold, setHold] = useState(0);
  const [inView, setInView] = useState(false);
  /* imleç bölümün üstünde ya da odak bölümün içinde */
  const [reading, setReading] = useState(false);

  const total = steps.length;
  const running = inView && !reading && hold === 0 && !reduced && total > 1;

  useEffect(() => {
    finePointer.current =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

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

  /* İndeks kırpılıyor: adım sayısı ülkeye göre değişiyor (Dubai 7, ötekiler 5)
     ve liste kısalırsa imleç listenin dışını göstermesin. */
  const current = total > 0 ? Math.min(active, total - 1) : 0;

  /* Yürüyen durağı görünür tutmak. Yalnızca şerit gerçekten taşıyorsa çalışıyor
     (geniş ekranda yedi durak sığıyor, hiçbir şey kaymıyor).
     scrollIntoView bilerek kullanılmıyor: o, en yakın kaydırılabilir ataları da
     hizalar, yani zamanlayıcı sayfayı dikeyde de çekerdi. */
  useEffect(() => {
    const track = trackRef.current;
    const el = stopRefs.current[current];
    if (!track || !el) return;
    const overflow = track.scrollWidth - track.clientWidth;
    if (overflow <= 1) return;
    const wanted = el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2;
    const left = Math.max(0, Math.min(wanted, overflow));
    if (Math.abs(track.scrollLeft - left) < 2) return;
    track.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  }, [current, reduced]);

  if (total === 0) return null;

  const step = steps[current];
  const kind = stepSceneKind(step.title);
  const Scene = kind ? SCENE_BY_KIND[kind] : null;

  return (
    /* Hareket azaltma tek yerden karşılanıyor. Zamanlayıcıyı `running` zaten
       durduruyor ama SAHNELERİN kendi giriş animasyonları SetupScenes'in içinde
       ve orada böyle bir kontrol yok; o dosya ana sayfayla paylaşıldığı için
       dokuz çizime tek tek bayrak geçirmek yerine kural ağacın tepesinde:
       reducedMotion="user" alttaki bütün dönüşüm ve düzen animasyonlarını
       kapatıyor, opaklık geçişlerini bırakıyor. */
    <MotionConfig reducedMotion="user">
      <section
        ref={hostRef}
        className="sec-pad"
        style={{ background: "var(--white)" }}
      >
        <div className="container-o">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text={title}
              accent="adım adım."
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">
                Her durakta topun kimde olduğu yazıyor. Yol kendi kendine
                ilerliyor; bir durağa basın, durur ve o adımın ayrıntısı altta
                açılır.
              </p>
            </FadeUp>
          </div>

          {/* Okuma korumasının kapsamı: yol da panel de içinde. Ziyaretçi
              paragrafı okurken imleci genelde metnin üstünde tutuyor ama
              duraklara doğru da geziniyor; ikisini ayırmak yürüyüşü yarı yolda
              tekrar başlatırdı. */}
          <div
            className="p3-body"
            onPointerEnter={() => {
              if (finePointer.current) setReading(true);
            }}
            onPointerLeave={() => setReading(false)}
            /* Odak yürüyüşü yalnızca KLAVYEDEN geldiyse durduruyor. Ham odağa
               bakmak tam olarak ProcessScroll'da bir kez yaşanmış hata olurdu:
               dokunmatikte butona vurmak odağı orada bırakıyor, pointerleave
               hiç gelmiyor ve bölüm ziyaretin geri kalanında donuyor.
               :focus-visible ikisini ayıran tek sinyal — klavye ve
               erişilebilirlik odağında doğru, parmakla dokunmada yanlış.
               Seçici desteklenmiyorsa matches hata atıyor; orada duraklatma
               yapmıyoruz, kaybedilen tek şey bir kolaylık. */
            onFocusCapture={(e) => {
              const t = e.target as HTMLElement;
              try {
                if (t.matches(":focus-visible")) setReading(true);
              } catch {
                /* :focus-visible desteklenmiyor */
              }
            }}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setReading(false);
              }
            }}
          >
            {/* ---------- YOL ---------- */}
            <div className="p3-route">
              <div
                ref={trackRef}
                className="p3-track"
                role="group"
                aria-label="Süreç adımları"
              >
                {steps.map((s, i) => {
                  const done = i < current;
                  const on = i === current;
                  /* Bir parça "geçilmiş" sayılıyorsa yeşile dönüyor. Sol yarım
                     (i-1 → i arası) i'ye VARILDIYSA geçilmiştir, sağ yarım
                     (i → i+1 arası) i'den ÇIKILDIYSA. */
                  return (
                    <button
                      key={s.title}
                      ref={(el) => {
                        stopRefs.current[i] = el;
                      }}
                      type="button"
                      className="p3-stop"
                      data-state={done ? "done" : on ? "on" : "next"}
                      aria-current={on ? "step" : undefined}
                      onClick={() => goTo(i)}
                      aria-label={`${i + 1}. adım: ${s.title}. ${s.timing}, ${WHO_LABEL[s.who]}.`}
                    >
                      <span className="p3-seg" aria-hidden="true">
                        <i className="p3-half p3-half-l" data-past={i <= current || undefined} />
                        <i className="p3-half p3-half-r" data-past={i < current || undefined} />
                      </span>

                      <span className="p3-mark" aria-hidden="true">
                        {done ? (
                          <Check size={15} strokeWidth={3.2} />
                        ) : (
                          String(i + 1).padStart(2, "0")
                        )}
                      </span>

                      <span className="p3-ttl" aria-hidden="true">
                        {s.title}
                      </span>
                      {/* Top kimde: her durakta, ama rozet olarak değil.
                          Renkli zeminli yedi rozet teşhisteki kalabalığın
                          yarısıydı; burada 5 px'lik bir nokta rengi taşıyor,
                          kelime gri kalıyor. Nokta üç renk kullanıyor (siz =
                          mürekkep, Ortac = mavi, otorite = kehribar) ve yeşile
                          hiç girmiyor — yeşil bu bölümde yalnızca "geçildi"
                          demek, iki anlamı aynı renge yüklemiyoruz. */}
                      <span className="p3-who" data-who={s.who} aria-hidden="true">
                        <i />
                        {WHO_LABEL[s.who]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---------- SEÇİLİ ADIM ---------- */}
            <div
              className="p3-detail"
              role="region"
              aria-label="Seçili adımın ayrıntısı"
            >
              <div className="p3-words">
                {/* Yedi adımın metni de basılıyor, görünen bir tanesi.
                    Sebep ölçü: metinler farklı uzunlukta ve panel her altı
                    saniyede bir değişiyor; AnimatePresence ile takas edilseydi
                    sütun boyu adımdan adıma oynar, altındaki her şeyi iterdi.
                    Hepsi aynı ızgara hücresinde durunca sütun EN UZUN adımın
                    boyunda sabitleniyor ve hiçbir yerde piksel yazmıyor.
                    Görünmeyenler visibility:hidden + aria-hidden: ne odağa ne
                    ekran okuyucuya giriyorlar. */}
                <div className="p3-stack">
                  {steps.map((s, i) => (
                    <div
                      key={s.title}
                      className="p3-wrap"
                      data-on={i === current || undefined}
                      aria-hidden={i !== current}
                    >
                      <h3 className="p3-title">
                        <i>{String(i + 1).padStart(2, "0")}</i>
                        {s.title}
                      </h3>
                      <p className="p3-meta">
                        <span className="p3-time">{s.timing}</span>
                        <span className="p3-pill" data-who={s.who}>
                          {WHO_LABEL[s.who]}
                        </span>
                      </p>
                      <p className="p3-line">{s.line}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gece kartı. Rayla hizalanacak bir şey kalmadığı için doğal
                  boyunda: yüksekliğini yalnızca sahnenin oranı belirliyor
                  (dokuz çizimin hepsi 560x330), dolayısıyla panel yürürken kart
                  bir piksel bile boyut değiştirmiyor ve çizimin etrafında
                  doldurulacak siyah boşluk oluşmuyor.
                  Ekran okuyucudan gizli: çizim, yanındaki metnin resmi. */}
              <div className="p3-card" aria-hidden="true">
                <div className="p3-scene">
                  <AnimatePresence mode="wait" initial={false}>
                    {Scene && (
                      <motion.div
                        key={current}
                        className="p3-slide"
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

              {/* Kalması şart olan cümle. Panel kendi kendine son adıma kadar
                  yürüyor, dolayısıyla garanti verilmediği bir tikin yokluğuyla
                  ima edilemez; yazıyla söyleniyor. Kartın İÇİNE alınmıyor:
                  canlı bölümde iki cümle kartın içinde, kendi ayırıcı
                  çizgisiyle duruyor ve kartı bir arayüzden bir belgeye
                  çeviriyor.

                  DOM'da karttan SONRA duruyor, çünkü dar ekranda sıra budur:
                  başlık, süre, anlatım, çizim, sonra dipnot. Metin sütununun
                  içine konsaydı dar ekranda çizimden ÖNCE okunurdu, yani
                  bölümün dipnotu bölümün ortasına düşerdi. Masaüstünde ise
                  ızgara onu sol sütunun dibine alıyor (bkz. lab-p3.css,
                  grid-area) — orada boş kalan beyaz alanı dolduruyor ve alt
                  kenarı kartınkiyle aynı piksele oturuyor. */}
              <p className="p3-note">
                Süreler tipik aralıktır. Kurum ve banka kararları ilgili
                kuruluşlara aittir; sonuç ve süre garanti edilmez.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
