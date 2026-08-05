"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import {
  SCENE_BY_KIND,
  stepSceneKind,
  type SceneKind,
} from "@/components/scenes/SetupScenes";
import { COUNTRY_SLUGS } from "@/lib/services";
import { WHO_LABEL, type Step } from "@/lib/countryContent";

/* ============================================================================
   SÜREÇ · solda adım rayı, sağda o adımın çizildiği gece kartı
   ============================================================================
   Bu bölüm lab'de üç adayla yarıştı ve müşteri P1'i seçti. Kararın gerekçesi
   kendi cümlesiyle: "eski hâlindeki karmaşıklığı bir kenara bırakmış gibi
   duruyor ve daha anlaşılır bir havası var. daha çok bilgi vermek istersek
   zaten burdan bir yere yönlendiririz."

   Karar bağlandıktan sonra lab tarafı müşteri isteğiyle tamamen silindi:
   /lab/surec sayfası, ProcessP1 / ProcessP0 bileşenleri ve lab-p1.css artık
   yok. Önceki hâlin (P0) çalışan bir kopyası kalmadı; aşağıdaki karşılaştırma
   notları o tasarımın kaydı olarak duruyor.

   ---- Neden bu kurgu kazandı: ölçülen şey "kalabalık" değil, nesne sayısıydı
   ============================================================================
   Ana sayfadaki süreç bölümüyle bu bölüm aynı dili konuşuyordu ama biri temiz,
   öteki kalabalık okunuyordu. Fark dilde değil, satır başına düşen yükte:

   · Ana sayfanın ray satırı ÜÇ şey taşıyor — 28px'lik ince bir daire,
     15px/500 bir başlık, altında tek gri satır.
   · Eski ülke satırı BEŞ şey taşıyordu — 38px'lik DOLU bir ikon karesi, mavi
     bir sıra numarası, 18.5px/600 bir başlık, koyu puntolu bir süre, renk kodlu
     bir "top kimde" hapı. Seçili satır bunların üstüne bir dolu gri zemin ve
     altına bir sayaç çubuğu daha alıyordu.

   Beş adım × üç nesne = 15. Yedi adım × beş nesne = 35. Aradaki fark "iki adım
   daha" değil, iki kattan fazla nesne. Üstüne aynı anda dört renk sistemi
   çalışıyordu (ikon karesi üç renk, hap üç renk, karttaki şerit mavi-yeşil,
   baştaki rozet ayrı bir mavi): göz bir listeye değil, bir gösterge paneline
   bakıyordu.

   Dördüncü bir sorun kartın tarafındaydı. Kart raya gerildiği için (1440px'te
   651px) ve çizim sabit oranlı olduğu için (560x330), sağda küçük bir resmin
   yüzdüğü uzun bir siyah levha çıkıyordu. Bölüm aynı anda hem SOLDA kalabalık
   hem SAĞDA boştu.

   Çözüm tasarımı değiştirmek değil, FAZLADAN taşınanı bırakmak oldu. Atılanlar:
   ikon kareleri, ayrı sıra numarası, renkli haplar, seçili satırın dolu zemini,
   satır altı sayaç çubuğu, kartın içindeki yedi bölmeli şerit, ve spot metnin
   ikinci cümlesi. Hiçbir BİLGİ silinmedi, yerleri değişti:

   · TOP KİMDE — tek gri alt satıra taşındı: "Sizde · 1-2 gün". Yalnızca "kimde"
     kısmı bir tık mürekkep alıyor (500 ağırlık, text-900); süre gri kalıyor.
     Yeni bir kutu, yeni bir renk, yeni bir hap yok — bir tipografik basamak var.
   · SIRA NUMARASI — noktanın içinde.
   · ADIMIN TAM ANLATIMI (Step.line) — ekranda hiç basılmıyor, butonun
     aria-label'ında duruyor. Kart ekran okuyucudan gizli olduğu için metnin tek
     erişilebilir kopyası orası.
   · SAYAÇ — rayın kendi ipliği doluyor. Kartın içindeki ikinci şerit aynı şeyi
     iki yerde söylüyordu.

   Ray hafifleyince iki sütunun DOĞAL boyu da neredeyse eşitlendi, yani siyah
   levha kendiliğinden kayboldu: 1200px'lik kapta kartın doğal boyu ~437px, yedi
   satırlık ray ~464px, fark 27px ve o da çizimin altına/üstüne 13'er piksel
   olarak dağılıyor. Eski kurguda bu fark 214px'ti.

   ---- Bölüm bir ÖZET; detay bir tık ötede
   ============================================================================
   Müşterinin bu tur koyduğu genel ilke: "site genel olarak özet bilgi vermeli
   her section'da; gerektiği kısımda tıklanarak açılan yerlerle ya da başka bir
   sayfaya yönlendirmelerle daha fazla detaya girmesi lazım."

   Burada bunun karşılığı şu: adım açıklamalarının tamamı (Step.line) geri
   DOLDURULMADI. Yedi adımın her birine üç dört cümle koymak bölümü yeniden
   eski hâline getirirdi ve zaten kimse okumuyordu. Bölümün altında tek bir
   çıkış var (aşağıda `detail`), ve o çıkış gerçekten daha fazlasını veriyor:
   kuruluş hizmetinin kapsamı, hariç kalan kalemler ve kalem kalem tutar.

   Çıkışın adresi neden pathname'den okunuyor: bölümün imzası
   `({ steps, title })` ve ülke sayfası onu böyle çağırıyor — imzayı
   değiştirmek çağrı yerine dokunmak demekti. Ülke bilgisi zaten adreste
   duruyor (/dubai, /ulke/dubai), o yüzden oradan çıkarılıyor. Tanınmayan bir
   adreste (ör. bir lab sayfası) hizmet adresi UYDURULMUYOR, çıkış /basla'ya
   düşüyor — SmartLink yayında olmayan bir adrese bağlantı kurmuyor ve boş bir
   "yakında" rozeti göstermektense doğru olan, her zaman açık olan kapıyı
   göstermek.

   ---- Ad alanı
   ============================================================================
   Bölümün bütün kuralları `.cpr-` altında, src/app/css/process.css'te. Bu
   bölüm `ops-`, `cps-`, `proc-`, `pr5-` veya `p0-` setlerinden hiçbirini
   KULLANMIYOR: `ops-`/`cps-` setlerini Workflow.tsx ve ana sayfa paylaşıyor,
   `p0-` ise bu bölümün lab'deki yedeği. Paylaşılan tek şey çizimlerin `.dv-*`
   renk kümesi; onun da alfalı değerleri kartın içinde opak karşılıklarıyla
   eziliyor (koyu yüzeyde alfa yok). */

const EASE = [0.22, 1, 0.36, 1] as const;

/* bir adımın kendi başına durduğu süre */
const STEP_MS = 3600;
/* Seçilen bir adımın tutulma süresi. Adımı okumaya yetecek kadar uzun, bölümü
   sonsuza dek dondurmayacak kadar kısa. */
const HOLD_MS = 11000;

/* Bölümün tek detay çıkışı. Ülke biliniyorsa kuruluş hizmetinin kendi
   sayfasına, bilinmiyorsa her zaman açık olan /basla'ya. */
const FALLBACK_DETAIL = {
  href: "/basla",
  label: "Süreci kendi dosyanız için konuşalım",
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
  const pathname = usePathname();

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

  /* Adres parçalanıp içindeki ülke aranıyor, ilk parçaya bakılmıyor: aynı sayfa
     hem /dubai hem /ulke/dubai adresinde yaşıyor ve ikisinde de ülke farklı
     sırada. Bulunamazsa hizmet adresi kurulmuyor — /lab/... gibi bir yerde
     "/lab/sirket-kurulusu" diye var olmayan bir adres üretmenin anlamı yok. */
  const detail = useMemo(() => {
    const slug = pathname
      .split("/")
      .find((seg) => (COUNTRY_SLUGS as string[]).includes(seg));
    if (!slug) return FALLBACK_DETAIL;
    return {
      href: `/${slug}`,
      label: "Kuruluş hizmeti: kapsam, hariç kalemler ve tutar",
    };
  }, [pathname]);

  /* Kartın boyu adıma göre oynamamalı: dokuz çizim aynı 560x330 viewBox'ı
     paylaşıyor ama hepsi o kutuyu aynı ölçüde doldurmuyor ve sayaç 3.6 saniyede
     bir değiştiriyor — kart her geçişte birkaç piksel zıplardı. Bu ülkenin
     çözdüğü BÜTÜN çizimler aynı ızgara hücresine görünmez olarak yığılıyor,
     görünen olan üstlerinde duruyor; sahne her zaman en uzun adımın boyunda
     kalıyor ve hiçbir kırılma noktasına elle yükseklik yazılmıyor.

     Tekrarlar eleniyor: Dubai'nin yedi adımı yedi ayrı türe düşüyor, beş adımlı
     ülkelerde ise aynı tür iki kez geçebiliyor ve aynı çizimi iki kez basmanın
     hiçbir faydası yok. */
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
        id="surec"
        ref={hostRef}
        className="sec-pad"
        style={{ background: "var(--white)" }}
      >
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
              {/* Tek cümle. Eskiden iki vardı ve ikincisi ("adıma bastığınızda
                  durur, ayrıntısı panelde açılır") panelin yaptığı şeyi tarif
                  ediyordu — panel zaten gözün önünde. */}
              <p className="cpr-lead">
                Her adımda topun kimde olduğu yazıyor; tıklayın, durur.
              </p>
            </FadeUp>
          </div>

          {/* Serbest duran butonlar ekran okuyucuya tek bir şey olarak
              varmalı, yoksa tek bağlamları birkaç eleman öncesindeki başlık. */}
          <div className="cpr-rail" role="group" aria-label="Süreç adımları">
            {steps.map((s, i) => {
              const isActive = i === current;
              const done = i < current;
              return (
                <button
                  key={s.title}
                  type="button"
                  className="cpr-row"
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
                    <span className="cpr-line" aria-hidden="true">
                      {isActive && running ? (
                        /* İplik aynı zamanda sayaç: tam bir adım boyunca
                           doluyor, yani rayın kendisi zamanın nerede olduğunu
                           söylüyor. Yalnızca sayaç yürürken basılıyor, bu
                           yüzden her seferinde boştan başlıyor ve durdurulmuş
                           bir adım sahte bir dolum göstermiyor. */
                        <motion.span
                          className="cpr-line-run"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                        />
                      ) : (
                        <span
                          className="cpr-line-fill"
                          style={{ transform: `scaleY(${done ? 1 : 0})` }}
                        />
                      )}
                    </span>
                  )}

                  <span className="cpr-dot" aria-hidden="true">
                    {done ? (
                      /* tik dolu bir diskin içinde, o yüzden beyaz olmak
                         zorunda */
                      <Check size={12} strokeWidth={3.2} color="#ffffff" />
                    ) : isActive ? (
                      <span className="cpr-dot-in" />
                    ) : (
                      <span className="cpr-dot-n">{i + 1}</span>
                    )}
                  </span>

                  <span className="cpr-txt">
                    <span className="cpr-t">{s.title}</span>
                    {/* Ülkeye özel iki gerçek, tek gri satırda: top kimde, ve
                        tipik süre. Kimde olduğu bir hap değil, bir tık
                        mürekkep. */}
                    <span className="cpr-m">
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
          <p className="cpr-note">
            Süreler tipik aralıktır. Kurum ve banka kararları ilgili kuruluşlara
            aittir; sonuç ve süre garanti edilmez.
          </p>

          <div className="cpr-card">
            <div className="cpr-head">
              <div className="cpr-head-txt">
                {/* büyük satır sabit duruyor, küçük olan canlı imleç — ana
                    sayfadaki panelle aynı yönde */}
                <p className="cpr-head-t">Kuruluş dosyası</p>
                <p className="cpr-head-s">{step.title}</p>
              </div>
              <span className="cpr-head-tag">
                {current + 1}/{total}
              </span>
            </div>

            {/* Sahne ekran okuyucudan gizli, bilerek: çizim raydaki satırın
                söylediğini tekrar ediyor ve 3.6 saniyede bir kendi kendine
                değişiyor. Kelimeleri ray taşıyor, bu onların resmi. */}
            <div className="cpr-body" aria-hidden="true">
              <div className="cpr-stage" data-empty={Scene ? undefined : "true"}>
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

          {/* Bölümün TEK detay çıkışı. Burası özet kalıyor: adımların uzun
              anlatımı ekrana geri dönmüyor, isteyen bir tık ötede buluyor.
              Tek olması kasıtlı — iki çıkış "hangisi?" sorusu üretir ve ikisi
              de tıklanmaz. */}
          <p className="cpr-more">
            <SmartLink href={detail.href} className="cpr-more-a">
              {detail.label}
              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </p>
        </div>
      </section>
    </MotionConfig>
  );
}
