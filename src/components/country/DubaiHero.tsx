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
import { ArrowRight, BadgeCheck, ChevronRight, IdCard, Info, Landmark, MapPin, Percent, Timer } from "lucide-react";
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

/* FOTOĞRAFIN ÜSTÜ · ADAYLAR · /lab/dubai-hero-kart
   1. tur (K1 Sahne, K2 Şerit, K3 Köşe): elendi, "şu anki hâlâ daha iyi".
   2. tur (F1 Rozetler, F2 Lisans, F3 Sade): Burak: "ticaret lisansı
      mantıklı, bu tarz kartlar koyabiliriz, arada bir değişebilir; ama eğik
      olmasına gerek yok. Sade hiç okey değil. Rozetler mantıklı ama çok
      dağınık, random."
   3. tur (07.10.2026), ikisi de F'lerden türedi:
     s6  canlıdaki: aşama kartı
     g1  Belgeler: düz duran belge kartı, sırayla üç belge (ticaret lisansı,
         Emirates ID, kurumsal hesap dosyası); süs, satırlar yer tutucu
     g2  Rozetler · derli: aynı üç olgu, sol altta hizalı tek sütun
   Rozetlerdeki olgular teyitli: %100 yabancı sahiplik (teklif PDF'i),
   5-6 günde kuruluş (teyit · Dubai kuruluş 1), 375.000 AED'ye kadar %0
   (teyit · Dubai kuruluş 3). Banka kartı sonuç ima etmiyor: "başvuru
   dosyası" diyor, "hesap açıldı" demiyor. */
/* 4. tur (07.10.2026) · g3 Karma. Burak: "G2 bir tık daha iyi hissettirdi …
   G2 ile G1'i kombine edip bir şey yapsak? G1'den ticaret lisansını çekeriz,
   yani işin sonunda buna sahip oluyorsun gibi; G2'den de rozetler." Solda
   sabit ticaret lisansı kartı, sağında üç rozet; ikisi aynı boyda. */
export type DubaiKart = "s6" | "g1" | "g2" | "g3";

const BELGE = [
  { k: "lisans", ad: "Ticaret lisansı", Icon: BadgeCheck, cipler: ["Serbest bölge", "Dubai"] },
  { k: "kimlik", ad: "Emirates ID", Icon: IdCard, cipler: ["Oturum izni"] },
  { k: "banka", ad: "Kurumsal hesap", Icon: Landmark, cipler: ["Başvuru dosyası"] },
] as const;

function Cizim({ a }: { a: (typeof ASAMA)[number] }) {
  /* çizimin animasyonu hero.css'te `.dhs .hkc-scene[data-on]` kapısına
     bağlı; sarmalayıcı o iki sınıfı taşıyor */
  return (
    <div className="dhr-cizim dhs" aria-hidden="true">
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

  if (tip === "g3")
    return (
      <div className="dhr-karma">
        <div className="dhr-belge" aria-hidden="true">
          <div className="dhr-belge-ic">
            <div className="dhr-belge-ust">
              <span className="dhr-belge-t">Ticaret lisansı</span>
              <span className="dhr-belge-muhur">
                <BadgeCheck size={20} strokeWidth={2} />
              </span>
            </div>
            <span className="dhr-belge-ad" />
            <span className="dhr-belge-s" />
            <span className="dhr-belge-s" data-kisa="" />
            <div className="dhr-belge-alt">
              <span>Serbest bölge</span>
            </div>
          </div>
        </div>
      <ul className="dhr-rozetler" aria-label="Dubai'de şirket: üç olgu">
          <li>
            <span className="dhr-rozet-ic" aria-hidden="true">
              <BadgeCheck size={18} strokeWidth={2} />
            </span>
            <span>
              <b>%100</b> yabancı sahiplik
            </span>
          </li>
          <li>
            <span className="dhr-rozet-ic" aria-hidden="true">
              <Timer size={18} strokeWidth={2} />
            </span>
            <span>
              <b>5-6 günde</b> kuruluş
            </span>
          </li>
          <li>
            <span className="dhr-rozet-ic" data-ton="amber" aria-hidden="true">
              <Percent size={18} strokeWidth={2} />
            </span>
            <span>
              375.000 AED&apos;ye kadar <b>%0</b>
            </span>
          </li>
        </ul>
      </div>
    );

  if (tip === "g2")
    return (
      <ul className="dhr-rozetler" aria-label="Dubai'de şirket: üç olgu">
        <li>
          <span className="dhr-rozet-ic" aria-hidden="true">
            <BadgeCheck size={18} strokeWidth={2} />
          </span>
          <span>
            <b>%100</b> yabancı sahiplik
          </span>
        </li>
        <li>
          <span className="dhr-rozet-ic" aria-hidden="true">
            <Timer size={18} strokeWidth={2} />
          </span>
          <span>
            <b>5-6 günde</b> kuruluş
          </span>
        </li>
        <li>
          <span className="dhr-rozet-ic" data-ton="amber" aria-hidden="true">
            <Percent size={18} strokeWidth={2} />
          </span>
          <span>
            375.000 AED&apos;ye kadar <b>%0</b>
          </span>
        </li>
      </ul>
    );

  if (tip === "g1") {
    const b = BELGE[i % BELGE.length];
    return (
      <div className="dhr-belge" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={b.k} className="dhr-belge-ic" {...gecis}>
            <div className="dhr-belge-ust">
              <span className="dhr-belge-t">{b.ad}</span>
              <span className="dhr-belge-muhur">
                <b.Icon size={20} strokeWidth={2} />
              </span>
            </div>
            {b.k === "kimlik" ? (
              <div className="dhr-belge-kimlik">
                <span className="dhr-belge-yuz" />
                <span>
                  <span className="dhr-belge-ad" />
                  <span className="dhr-belge-s" />
                </span>
              </div>
            ) : b.k === "banka" ? (
              <>
                <span className="dhr-belge-no">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="dhr-belge-s" data-kisa="" />
              </>
            ) : (
              <>
                <span className="dhr-belge-ad" />
                <span className="dhr-belge-s" />
                <span className="dhr-belge-s" data-kisa="" />
              </>
            )}
            <div className="dhr-belge-alt">
              {b.cipler.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <span className="dhr-belge-nokta">
          {BELGE.map((x, k) => (
            <i key={x.k} data-on={k === i % BELGE.length || undefined} />
          ))}
        </span>
      </div>
    );
  }

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
