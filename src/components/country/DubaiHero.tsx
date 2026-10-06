"use client";

/* DUBAİ SAYFASI GİRİŞİ · CANLI (06.10.2026) · lab'daki S6'nın canlı hâli.
   Ad alanı .dhr- (css/dubai-hero.css; yalnız bu bileşenin olduğu rotada).

   KARAR YOLU (/lab/hizmet-hero, 05.10.2026). Burak: "siyah üstüne açılışı
   iptal ettiğimize göre burayı da farklılaştırmamız lazım … arka plan beyaz
   kalır, solda yazılarımız, sağ taraf görsel üzerine aşamaları anlatır."
   S1-S7 denendi; S4/S5 "çok alan kaplıyor, görsel gözükmüyor" diye elendi,
   S6 seçildi ("s6 iyidir"), kart sonra yarı saydam oldu ("arkasından
   görseli de hafif göstersin"). 06.10: "labda yaptığın Dubai herosunu live
   al."

   SAHNE. Beyaz zemin; solda canlı girişle aynı metin ve düğmeler, sağda
   Dubai fotoğrafı, üstünde tek cam kart: aşamanın küçük çizimi (canlı
   karttaki çizimin kendisi · HeroDubaiCards · STAGES), adı, iş kimde
   rozeti ve beş numaralı çubuk. Aşama 3,6 sn'de bir ilerliyor; çubuğa
   dokunulunca oraya gidip 9 sn duruyor. Ekranda değilken ve hareket
   azaltmada dönmüyor.

   YALNIZ DUBAİ. İngiltere ve KKTC eski girişte (PageHero); onay gelince
   aynı kalıba geçerler. Menü bu girişin üstünde açık zeminde koyu yazıyla
   (kural bu CSS dosyasında, :has ile). Ölçüm olayları PageHero'dakilerle
   aynı ad ve yerde. */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight, Info, MapPin } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { STAGES } from "@/components/shared/HeroDubaiCards";
import { FACTS } from "@/lib/brand";
import { COUNTRY_PHOTO } from "@/lib/media";
import { DUBAI_BASLANGIC, money } from "@/lib/dubaiFiyat";
import { gtm } from "@/lib/gtm";
import "@/app/css/dubai-hero.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const ADIM_MS = 3600;
/* iş kimde: sizde amber, Ortac'ta mavi, otoritede ve bankada yeşil */
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
  cizim: s.art,
  anahtar: s.key,
}));

/* KART ADAYLARI · /lab/dubai-hero-kart (06.10.2026). Burak: "görselin
   üstündeki aşamalarda daha farklı neler yapabiliriz? Aşamaları ve
   başlıkları bu kadar büyük göstermek yerine … soldaki küçük kutunun içinde
   oynayan şeyler var ya, belki onlara odaklanan bir şey. Birkaç bir şey
   deneyebilirsin."
     s6  canlıdaki: çizim + büyük ad + rozet + numaralı çubuk
     k1  Sahne: çizim büyüdü, kartın tamamı o; ad küçük bir satır, noktalar
     k2  Şerit: beş çizim yan yana küçük karelerde; sıradaki parlak, adı altında
     k3  Köşe: sol altta küçük bir hap; çizim, ad ve ince ilerleme çizgisi
   Seçilen aday varsayılan olur, ötekiler silinir. */
export type DubaiKart = "s6" | "k1" | "k2" | "k3";

function Cizim({ a, acik = true }: { a: (typeof ASAMA)[number]; acik?: boolean }) {
  /* çizimin animasyonu hero.css'te `.dhs .hkc-scene[data-on]` kapısına
     bağlı; sarmalayıcı o iki sınıfı taşıyor. Şeritte sıradaki dışındakiler
     de görünsün diye sahne hep "açık", hareket yalnız sıradakinde. */
  return (
    <div className="dhr-cizim dhs" data-dur={!acik || undefined} aria-hidden="true">
      <div className="hkc-scene" data-scene={a.anahtar} data-on="true">
        {a.cizim}
      </div>
    </div>
  );
}

function Kart({ tip, i, git, reduce }: { tip: DubaiKart; i: number; git: (k: number) => void; reduce: boolean }) {
  const a = ASAMA[i];
  const gecis = {
    initial: reduce ? false : ({ opacity: 0, y: 8 } as const),
    animate: { opacity: 1, y: 0 },
    exit: reduce ? undefined : { opacity: 0, y: -6 },
    transition: { duration: 0.28, ease: EASE },
  };

  if (tip === "k2")
    return (
      <div className="dhr-serit" role="group" aria-label="Aşamalar">
        {ASAMA.map((x, k) => (
          <button
            key={x.no}
            type="button"
            className="dhr-serit-b"
            data-on={k === i || undefined}
            aria-current={k === i ? "step" : undefined}
            aria-label={`${x.ad}: ${x.satir}`}
            onClick={() => git(k)}
          >
            <Cizim a={x} acik={k === i} />
            <span className="dhr-serit-ad" aria-hidden="true">
              {x.ad}
            </span>
          </button>
        ))}
      </div>
    );

  if (tip === "k3")
    return (
      <div className="dhr-kose">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={a.no} className="dhr-kose-ust" {...gecis}>
            <Cizim a={a} />
            <p className="dhr-kose-m">
              <span>
                {a.no} / {String(ASAMA.length).padStart(2, "0")}
              </span>
              <b>{a.ad}</b>
            </p>
          </motion.div>
        </AnimatePresence>
        <span className="dhr-kose-ray" aria-hidden="true">
          <i style={{ width: `${((i + 1) / ASAMA.length) * 100}%` }} />
        </span>
      </div>
    );

  if (tip === "k1")
    return (
      <div className="dhr-sahne">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={a.no} {...gecis}>
            <Cizim a={a} />
            <p className="dhr-sahne-m">
              <b>{a.ad}</b>
              <span className="dhr-kim" data-ton={a.kim.ton}>
                {a.kim.ad}
              </span>
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="dhr-nokta" role="group" aria-label="Aşamalar">
          {ASAMA.map((x, k) => (
            <button
              key={x.no}
              type="button"
              data-on={k === i || undefined}
              aria-current={k === i ? "step" : undefined}
              aria-label={`${x.ad}: ${x.satir}`}
              onClick={() => git(k)}
            />
          ))}
        </div>
      </div>
    );

  return (
    <div className="dhr-kart">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={a.no} className="dhr-kart-ust" {...gecis}>
          <Cizim a={a} />
          <p className="dhr-kart-m">
            <b>{a.ad}</b>
            <span className="dhr-kim" data-ton={a.kim.ton}>
              {a.kim.ad}
            </span>
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="dhr-cubuk" role="group" aria-label="Aşamalar">
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
  );
}

export default function DubaiHero({ lead, kart = "s6" }: { lead: string; kart?: DubaiKart }) {
  const reduce = useReducedMotion();
  const kok = useRef<HTMLElement>(null);
  const gorunur = useInView(kok, { amount: 0.25 });
  const [i, setI] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    if (reduce || !gorunur || dur) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % ASAMA.length), ADIM_MS);
    return () => window.clearInterval(t);
  }, [reduce, gorunur, dur]);
  useEffect(() => {
    if (!dur) return;
    const t = window.setTimeout(() => setDur(0), 9000);
    return () => window.clearTimeout(t);
  }, [dur]);

  const git = (k: number) => {
    setI(k);
    setDur((d) => d + 1);
  };
  return (
    <section ref={kok} className="dhr">
      <div className="container-o dhr-grid">
        <div className="dhr-sol">
          <nav className="dhr-iz" aria-label="Sayfa yolu">
            <SmartLink href="/">Ana sayfa</SmartLink>
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
            <span>Ülkeler · Dubai</span>
          </nav>
          <h1 className="dhr-h1">
            Dubai&apos;de <span>şirket kurmak.</span>
          </h1>
          <p className="dhr-lead">{lead}</p>
          <p className="dhr-fiyat">
            <b>{money(DUBAI_BASLANGIC)}</b>&apos;den başlayan fiyatlarla
          </p>
          <div className="dhr-cta">
            <SmartLink
              href="/basla"
              className="dhr-btn dhr-btn-mavi"
              onClick={() => gtm("cta_start_click", { placement: "page_hero", country: "dubai" })}
            >
              Hemen Başla
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
            <a
              href="#fiyat"
              className="dhr-btn dhr-btn-cizgi"
              onClick={() => gtm("cta_pricing_click", { placement: "page_hero", country: "dubai" })}
            >
              Fiyatları Gör
            </a>
          </div>
          <ul className="dhr-guven">
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

        <div className="dhr-foto">
          <Image
            src={COUNTRY_PHOTO.dubai}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="dhr-img"
          />
          <Kart tip={kart} i={i} git={git} reduce={!!reduce} />
        </div>
      </div>
    </section>
  );
}
