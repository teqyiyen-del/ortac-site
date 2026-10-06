"use client";

/* LAB · /lab/hizmet-hero — hizmet ve ülke sayfalarının girişi (05.10.2026).

   Burak: "hizmet sayfalarının açılışlarını da böyle görselli mi açsak …
   o zaman çok mu hero ile benzerler? Belki sadece sağ tarafı görsel yapıp
   sol tarafı düz yazı bırakabiliriz … siyah üstüne açılışı iptal ettiğimize
   göre burayı da farklılaştırmamız lazım. Komple görsel olmaz; sağ taraf
   görsel, arka plan beyaz kalır. Solda yine yazılarımız, sağ taraf görsel
   üzerine aşamaları anlatır … daha küçük, sadece kartlar çıkarak, dış
   çerçevesi olmadan, görselin üstünde takılırlar. Birkaç seçenek dene."

   Deneme sayfası Dubai şirket kuruluşu (/dubai). Sol sütun canlıdakiyle
   aynı metin ve düğmeler (PageHero · ülke dalı). Aşamalar canlı karttaki
   beş aşama (HeroDubaiCards · STAGES); elle yazılmış ikinci liste yok.

     S1 · Akan kartlar   ana sayfanın dili: kartlar alttan girip yukarı akar
     S2 · Tek kart       tek aşama kartı + numaralı çubuklar (süreç bölümü)
     S3 · Kenara taşan   fotoğraf sağ kenara kadar; beş aşama alt alta,
                         sırayla biri açılır

   Sınıflar .lhz- (css/lab-hizmet-hero.css). Seçilen aday PageHero'nun ülke
   dalına taşınır; menünün açık zeminde koyu yazıya geçmesi o zaman nav.css'e
   yazılır (lab'da :has ile zorlanıyor). */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight, Info, MapPin } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { STAGES } from "@/components/shared/HeroDubaiCards";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { FACTS } from "@/lib/brand";
import { COUNTRY_PHOTO } from "@/lib/media";

const EASE = [0.22, 1, 0.36, 1] as const;
const KIM: Record<string, { ad: string; ton: "amber" | "mavi" | "yesil" }> = {
  siz: { ad: "Sizde", ton: "amber" },
  ortac: { ad: "Ortac'ta", ton: "mavi" },
  otorite: { ad: "Otoritede", ton: "yesil" },
  banka: { ad: "Bankada", ton: "yesil" },
};
const ASAMA = STAGES.map((s, i) => ({
  no: String(i + 1).padStart(2, "0"),
  ad: s.word,
  satir: s.meta,
  kim: KIM[s.who] ?? KIM.ortac,
  /** aşamanın canlı karttaki çizimi (hkc-art); S4 ve S5 bunu basıyor */
  cizim: s.art,
  anahtar: s.key,
}));

function useSira(n: number, ms: number) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const gorunur = useInView(ref, { amount: 0.25 });
  const [i, setI] = useState(0);
  const [dur, setDur] = useState(0);
  useEffect(() => {
    if (reduce || !gorunur || dur) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => window.clearInterval(t);
  }, [n, ms, reduce, gorunur, dur]);
  useEffect(() => {
    if (!dur) return;
    const t = window.setTimeout(() => setDur(0), 9000);
    return () => window.clearTimeout(t);
  }, [dur]);
  /** ziyaretçi bir aşamaya dokundu: oraya git, akış 9 sn dursun */
  const git = (k: number) => {
    setI(k);
    setDur((d) => d + 1);
  };
  return { i, ref, git };
}

/* sol sütun: canlı /dubai girişiyle aynı içerik */
function Sol({ fiyat = "/dubai#fiyat" }: { fiyat?: string } = {}) {
  return (
    <div className="lhz-sol">
      <p className="lhz-iz">
        Ana sayfa <ChevronRight size={14} strokeWidth={2} aria-hidden="true" /> <span>Ülkeler · Dubai</span>
      </p>
      <h1 className="lhz-h1">
        Dubai&apos;de <span>şirket kurmak.</span>
      </h1>
      <p className="lhz-lead">{COUNTRY_CONTENT.dubai.intro}</p>
      <div className="lhz-cta">
        <SmartLink href="/basla" className="lhz-btn lhz-btn-mavi">
          Hemen Başla
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
        </SmartLink>
        {/* sunum sayfasında fiyat bölümü aynı sayfada: düz çapa */}
        {fiyat.startsWith("#") ? (
          <a href={fiyat} className="lhz-btn lhz-btn-cizgi">
            Fiyatları Gör
          </a>
        ) : (
          <SmartLink href={fiyat} className="lhz-btn lhz-btn-cizgi">
            Fiyatları Gör
          </SmartLink>
        )}
      </div>
      <ul className="lhz-guven">
        <li>
          <MapPin size={15} strokeWidth={2} aria-hidden="true" />
          Kendi ofisimizden, Türkçe yürütülür.
        </li>
        <li>
          <Info size={15} strokeWidth={2} aria-hidden="true" />
          {FACTS.dubai.limit}
        </li>
      </ul>
    </div>
  );
}

function Foto() {
  return <Image src={COUNTRY_PHOTO.dubai} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="lhz-img" />;
}

/* ================================================================ S1 */
export function HizmetS1() {
  const { i, ref } = useSira(ASAMA.length, 2800);
  const reduce = useReducedMotion();
  const gorunen = [2, 1, 0].map((k) => ASAMA[(i - k + ASAMA.length * 2) % ASAMA.length]);
  return (
    <section ref={ref} className="lhz">
      <div className="container-o lhz-grid">
        <Sol />
        <div className="lhz-foto">
          <Foto />
          <ul className="lhz-s1" aria-hidden="true">
            <AnimatePresence initial={false} mode="popLayout">
              {gorunen.map((a, k) => (
                <motion.li
                  key={a.no}
                  layout={!reduce}
                  className="lhz-kart"
                  data-yeni={k === 2 || undefined}
                  initial={reduce ? false : { opacity: 0, y: 32, scale: 0.96 }}
                  /* solma yok: açık fotoğrafın üstünde yarı saydam kart okunmuyordu;
                     yenilik mavi çerçeveyle (data-yeni) */
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, y: -32 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <span className="lhz-no">{a.no}</span>
                  <span className="lhz-kart-m">
                    <b>{a.ad}</b>
                    <em>{a.satir}</em>
                  </span>
                  <span className="lhz-kim" data-ton={a.kim.ton}>
                    {a.kim.ad}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ S2 */
export function HizmetS2() {
  const { i, ref, git } = useSira(ASAMA.length, 3400);
  const reduce = useReducedMotion();
  const a = ASAMA[i];
  return (
    <section ref={ref} className="lhz">
      <div className="container-o lhz-grid">
        <Sol />
        <div className="lhz-foto">
          <Foto />
          <div className="lhz-s2">
            <div className="lhz-s2-ust">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={a.no}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="lhz-s2-b">
                    <b>{a.ad}</b>
                    <span className="lhz-kim" data-ton={a.kim.ton}>
                      {a.kim.ad}
                    </span>
                  </p>
                  <p className="lhz-s2-l">{a.satir}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="lhz-cubuk" role="group" aria-label="Aşamalar">
              {ASAMA.map((x, k) => (
                <button
                  key={x.no}
                  type="button"
                  aria-current={k === i ? "step" : undefined}
                  aria-label={`${x.ad}: ${x.satir}`}
                  data-durum={k === i ? "on" : k < i ? "gecti" : undefined}
                  onClick={() => git(k)}
                >
                  <i aria-hidden="true" />
                  <span aria-hidden="true">{x.no}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ S3 */
export function HizmetS3() {
  const { i, ref, git } = useSira(ASAMA.length, 3000);
  return (
    <section ref={ref} className="lhz lhz-tasan">
      <div className="container-o lhz-grid">
        <Sol />
      </div>
      <div className="lhz-foto lhz-foto-kenar">
        <Foto />
        <ol className="lhz-s3">
          {ASAMA.map((a, k) => (
            <li key={a.no}>
              <button type="button" className="lhz-s3-s" data-on={k === i || undefined} aria-expanded={k === i} onClick={() => git(k)}>
                <span className="lhz-no">{a.no}</span>
                <span className="lhz-kart-m">
                  <b>{a.ad}</b>
                  {k === i && <em>{a.satir}</em>}
                </span>
                {k === i && (
                  <span className="lhz-kim" data-ton={a.kim.ton}>
                    {a.kim.ad}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================ S4 · S5
   İKİNCİ TUR (05.10.2026). Burak: "yapılacaksa S1 ya da S2 şeklinde … ama
   o görseller vardı ya, biraz onlarla bir şeyler. Yazı yazmaktan ziyade
   GÖSTERMEYİ daha çok istiyorum." Görseller: canlı siyah karttaki aşama
   çizimleri (HeroDubaiCards · StageArt*; karar seçimi, tescil dosyası,
   lisans, kimlik, banka). Aynı çizimler kendi döngüleriyle fotoğrafın
   üstündeki kartın içinde; açıklama satırı yok, kartta yalnız aşamanın adı
   ve işin kimde olduğu.

   Çizimin animasyonu hero.css'te `.dhs .hkc-scene[data-on="true"]` kapısına
   bağlı; sarmalayıcı o iki sınıfı taşıyor, çizime dokunulmuyor. */
function Cizim({ a }: { a: (typeof ASAMA)[number] }) {
  return (
    <div className="lhz-cizim dhs" aria-hidden="true">
      <div className="hkc-scene" data-scene={a.anahtar} data-on="true">
        {a.cizim}
      </div>
    </div>
  );
}

/* S4 ve S5 (büyük çizim kartı) SİLİNDİ. Burak: "yok, böyle çok alan
   kaplıyor … görsel gözükmüyor. S2 şeklinde yap ama bir şekilde ona upgrade
   et, daha küçük alan kaplayacak şekilde." Çizim artık kartın içinde küçük
   bir pencere; kart S2 kadar alçak, fotoğrafın çoğu açık.

   S6 · S2 + küçük çizim   tam genişlik kart, solda çizim penceresi
   S7 · Dar kart            aynı kart sol altta, dar; fotoğrafın sağı da açık */
function KucukKart({ dar, fiyat }: { dar?: boolean; fiyat?: string }) {
  const { i, ref, git } = useSira(ASAMA.length, 3600);
  const reduce = useReducedMotion();
  const a = ASAMA[i];
  return (
    <section ref={ref} className="lhz">
      <div className="container-o lhz-grid">
        <Sol fiyat={fiyat} />
        <div className="lhz-foto" data-acik="">
          <Foto />
          <div className="lhz-s2 lhz-s6" data-dar={dar || undefined}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={a.no}
                className="lhz-s6-ust"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <Cizim a={a} />
                <p className="lhz-s6-m">
                  <b>{a.ad}</b>
                  <span className="lhz-kim" data-ton={a.kim.ton}>
                    {a.kim.ad}
                  </span>
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="lhz-cubuk" role="group" aria-label="Aşamalar">
              {ASAMA.map((x, k) => (
                <button
                  key={x.no}
                  type="button"
                  aria-current={k === i ? "step" : undefined}
                  aria-label={`${x.ad}: ${x.satir}`}
                  data-durum={k === i ? "on" : k < i ? "gecti" : undefined}
                  onClick={() => git(k)}
                >
                  <i aria-hidden="true" />
                  <span aria-hidden="true">{x.no}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export const HizmetS6 = () => <KucukKart />;
export const HizmetS7 = () => <KucukKart dar />;
