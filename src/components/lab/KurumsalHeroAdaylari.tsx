"use client";

/* LAB · /lab/hero-kurumsal — ana sayfa girişi, İKİNCİ TUR (28.09.2026).

   İlk tur (K1 kurumsal cümle · K2 fotoğraf · K3 öne çıkan yazı) reddedildi.
   Burak: "fena kötü bunlar … %100 yükseklikte yapmamız lazım … daha
   enerjik bir şeyler denemeye çalış. Görsel kullanabilirsin, ona lafım yok."
   Üçü de sakin, kurumsal broşür gibiydi ve ekranın yarısında bitiyordu.

   İKİNCİ TURUN KURALLARI
     · Tam ekran: 100svh (telefonda adres çubuğu açıkken de taşmıyor).
     · Hareket var ama anlam taşıyor: fotoğraf, kelime ya da kart DEĞİŞİYOR,
       süs için dönen şekil yok. Hareket azaltmada hepsi ilk karede duruyor.
     · Murat Bey'in yönü aynen: firma = muhasebe, vergi, kurumsal
       danışmanlık; 1996; ülkeler "ofislerimiz"; ana düğme "Kurulumu
       Başlat" değil.
     · Sitenin dili: gece zemin, mavi vurgu, büyük kalın başlık.

     E1 · Üç şehir     ekran üç fotoğraf sütununa bölünüyor (Dubai, Londra,
                       KKTC); sırayla biri genişliyor, fotoğraf yavaşça
                       yaklaşıyor. Başlık hepsinin üstünde.
     E2 · Kinetik      dev başlığın son kelimesi dönüyor (muhasebe, vergi,
                       banka, danışmanlık, yapılanma); sağda iki sütun
                       fotoğraf kartı sonsuz akıyor.
     E3 · Canlı ofis   tam ekran ekip fotoğrafı; sağda işin kendisi akıyor:
                       dosya kartları sırayla düşüyor (beyan gönderildi,
                       hesap açıldı …). Kartlar temsilî süreç örneği, müşteri
                       ya da rakam iddiası değil.

   Sınıflar .lhe- (css/lab-hero-kurumsal.css). Seçilen aday Hero.tsx'in
   yerine geçer; bu dosya ve CSS silinir. */

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  FileCheck,
  Landmark,
  ReceiptText,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import type { CountrySlug } from "@/lib/brand";

const KURULUS = 1996;
const EASE = [0.22, 1, 0.36, 1] as const;
/* Sitedeki Unsplash kareleri (lib/media.ts'te kullanılanlar); genişliği
   lib/gorselYukleyici.ts yazıyor. */
const F = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=70`;
const FOTO = {
  dubai: F("1512453979798-5ea266f8880c"),
  londra: F("1533929736458-ca588d08c8be"),
  kktc: F("1507525428034-b723cf961d3e"),
  ekip: F("1517048676732-d65bc937f952"),
  masa: F("1450101499163-c8848c66ca85"),
  vergi: F("1554224155-6726b3ff858f"),
  ofis: F("1497366216548-37526070297c"),
  banka: F("1601597111158-2fceff292cdc"),
};

/** belli aralıkla artan sayaç; hareket azaltmada durur */
function useSira(n: number, ms: number) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => window.clearInterval(t);
  }, [n, ms, reduce]);
  return i;
}

function Dugmeler() {
  return (
    <div className="lhe-cta">
      <SmartLink href="/#hizmetler" className="lhe-btn lhe-btn-mavi">
        Hizmetlerimiz
        <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
      </SmartLink>
      <SmartLink href="/iletisim" className="lhe-btn lhe-btn-cizgi">
        Bizimle görüşün
      </SmartLink>
    </div>
  );
}

/* ================================================================ E1 */
const SEHIR: { c: CountrySlug; ad: string; foto: string }[] = [
  { c: "dubai", ad: "Dubai", foto: FOTO.dubai },
  { c: "ingiltere", ad: "Londra", foto: FOTO.londra },
  { c: "kktc", ad: "KKTC", foto: FOTO.kktc },
];

export function HeroE1() {
  const on = useSira(SEHIR.length, 4200);
  return (
    <section className="lhe lhe-e1">
      <div className="lhe-e1-sut" aria-hidden="true">
        {SEHIR.map((s, i) => (
          <div key={s.c} className="lhe-e1-p" data-on={i === on || undefined}>
            <Image src={s.foto} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="lhe-img lhe-kb" priority={i === 0} />
            <span className="lhe-e1-ad">
              <span className="lhe-flag">
                <Flag country={s.c} />
              </span>
              {s.ad} ofisi
            </span>
          </div>
        ))}
      </div>
      <div className="lhe-perde lhe-perde-alt" aria-hidden="true" />
      <div className="container-o lhe-icerik lhe-alt">
        <p className="lhe-kicker">
          <b>{KURULUS}</b>&apos;dan beri · Muhasebe · Vergi · Kurumsal danışmanlık
        </p>
        <h1 className="lhe-h1">
          30 yıl. Üç ülke.
          <br />
          <span className="lhe-mavi">Tek ekip.</span>
        </h1>
        <p className="lhe-lead">Dubai, Londra ve KKTC&apos;deki kendi ofislerimizden; kuruluştan beyana kadar.</p>
        <Dugmeler />
      </div>
    </section>
  );
}

/* ================================================================ E2 */
/* "İşinizin muhasebe." dil bilgisi olarak kırıktı (ilk ekran görüntüsünde
   yakalandı); dönen öge artık iyelik ekiyle kendi başına bir özne. */
/* tek satır şart (dönen alan 1 satır yüksekliğinde kırpılıyor): en uzun
   öge telefonda 44 px'te sığmalı; "Vergi takviminiz" taşıyordu */
const KELIME = ["Muhasebeniz", "Vergileriniz", "Bankanız", "Şirketiniz"];
const SUTUN_A = [
  { foto: FOTO.masa, ad: "Muhasebe" },
  { foto: FOTO.dubai, ad: "Dubai" },
  { foto: FOTO.vergi, ad: "Vergi" },
  { foto: FOTO.londra, ad: "Londra" },
];
const SUTUN_B = [
  { foto: FOTO.ekip, ad: "Danışmanlık" },
  { foto: FOTO.kktc, ad: "KKTC" },
  { foto: FOTO.banka, ad: "Banka" },
  { foto: FOTO.ofis, ad: "Ofis" },
];

function Akis({ list, ters }: { list: typeof SUTUN_A; ters?: boolean }) {
  /* liste iki kez basılıyor: -50% kaydırınca ilk kopyanın yerine ikinci
     oturuyor, dikiş görünmüyor */
  return (
    <div className="lhe-e2-sut" data-ters={ters || undefined}>
      <div className="lhe-e2-akis">
        {[...list, ...list].map((k, i) => (
          <figure key={i} className="lhe-e2-kart">
            <Image src={k.foto} alt="" fill sizes="(min-width: 1024px) 22vw, 40vw" className="lhe-img" />
            <figcaption>{k.ad}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function HeroE2() {
  const i = useSira(KELIME.length, 2000);
  const reduce = useReducedMotion();
  return (
    <section className="lhe lhe-e2">
      <div className="lhe-e2-sag" aria-hidden="true">
        <Akis list={SUTUN_A} />
        <Akis list={SUTUN_B} ters />
      </div>
      <div className="container-o lhe-icerik lhe-orta">
        <p className="lhe-kicker">
          <b>{KURULUS}</b>&apos;dan beri · Dubai · Londra · KKTC
        </p>
        <h1 className="lhe-h1 lhe-h1-e2">
          <span className="lhe-e2-don" aria-hidden="true">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={KELIME[i]}
                className="lhe-mavi"
                initial={reduce ? false : { y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                {KELIME[i]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="lhe-sr">Muhasebeniz, vergileriniz, bankanız ve şirketiniz</span>
          tek masada.
        </h1>
        <p className="lhe-lead">Muhasebe, vergi ve kurumsal danışmanlık; üç ülkede kendi ofislerimizden.</p>
        <Dugmeler />
      </div>
    </section>
  );
}

/* ================================================================ E3 */
type Olay = { Icon: LucideIcon; ton: "amber" | "yesil" | "mavi"; t: string; s: string };
/* Temsilî süreç örnekleri: sitede zaten anlatılan işler (muhasebe takvimi,
   banka, tescil, Serbest Liman). Müşteri adı, tutar, tarih yok. */
const OLAY: Olay[] = [
  { Icon: ReceiptText, ton: "amber", t: "KDV beyanı gönderildi", s: "Dubai · dönem kapanışı" },
  { Icon: Landmark, ton: "yesil", t: "Kurumsal hesap açıldı", s: "Dubai · banka dosyası" },
  { Icon: ScrollText, ton: "mavi", t: "Tescil tamamlandı", s: "Londra · Companies House" },
  { Icon: CalendarCheck, ton: "amber", t: "Yıllık hesaplar teslim", s: "Londra · mali yıl sonu" },
  { Icon: FileCheck, ton: "mavi", t: "Serbest Liman onayı geldi", s: "KKTC · kuruluş" },
];

export function HeroE3() {
  const i = useSira(OLAY.length, 2400);
  const reduce = useReducedMotion();
  /* son üç olay görünüyor, en yenisi üstte */
  const gorunen = [0, 1, 2].map((k) => OLAY[(i - k + OLAY.length * 2) % OLAY.length]);
  return (
    <section className="lhe lhe-e3">
      <div className="lhe-arka" aria-hidden="true">
        <Image src={FOTO.ekip} alt="" fill priority sizes="100vw" className="lhe-img lhe-kb" />
      </div>
      <div className="lhe-perde lhe-perde-sol" aria-hidden="true" />
      <div className="container-o lhe-icerik lhe-e3-grid">
        <div>
          <p className="lhe-kicker">
            <b>{KURULUS}</b>&apos;dan beri
          </p>
          <h1 className="lhe-h1">
            Şirketiniz kurulduktan sonra da <span className="lhe-mavi">işi biz yürütüyoruz.</span>
          </h1>
          <p className="lhe-lead">Muhasebe, vergi ve kurumsal danışmanlık; Dubai, Londra ve KKTC&apos;de.</p>
          <Dugmeler />
        </div>
        <ul className="lhe-e3-akis" aria-hidden="true">
          <AnimatePresence initial={false} mode="popLayout">
            {gorunen.map((o, k) => (
              <motion.li
                key={o.t}
                layout={!reduce}
                className="lhe-e3-kart"
                data-k={k}
                initial={reduce ? false : { opacity: 0, y: -24, scale: 0.96 }}
                animate={{ opacity: k === 2 ? 0.45 : 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="lhe-ic" data-ton={o.ton}>
                  <o.Icon size={18} strokeWidth={2} />
                </span>
                <span>
                  <b>{o.t}</b>
                  <em>{o.s}</em>
                </span>
                <span className="lhe-tik">
                  <Check size={14} strokeWidth={2.4} />
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
