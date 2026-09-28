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

   ÜÇÜNCÜ AYAR (aynı gün, Burak tek tek): E1 "çok klasik, jenerik; Murat
   abi isterse" · E2 "kinetik yazı mantıklı, sağdaki akış değil, arkası
   full görsel" · E3 "mantıklı, başlık uzun, zoom'a gerek yok" · "biraz
   daha dene". Yakınlaşma her yerden kalktı; E2 tam ekran fotoğraf ve
   kelimeyle değişiyor; E3 başlığı kısaldı; E4 eklendi (kinetik başlık +
   dipte akan iş şeridi).

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
            <Image src={s.foto} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="lhe-img" priority={i === 0} />
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

/* ================================================================ E2
   ÜÇÜNCÜ AYAR (Burak): "kinetik yazı mantıklı olabilir ama sağdaki görsel
   akışını beğenmiyorum; arkası full görsel olacak muhtemelen." Sağdaki iki
   akan sütun kalktı. Arka plan tam ekran fotoğraf ve dönen kelimeyle
   BİRLİKTE değişiyor: "Muhasebeniz"de masa, "Vergileriniz"de beyan
   formları, "Bankanız"da banka, "Şirketiniz"de ofis. Yakınlaşma yok. */
const KELIME: { k: string; foto: string }[] = [
  { k: "Muhasebeniz", foto: FOTO.masa },
  { k: "Vergileriniz", foto: FOTO.vergi },
  { k: "Bankanız", foto: FOTO.banka },
  { k: "Şirketiniz", foto: FOTO.ofis },
];

/** kelimeyle değişen tam ekran fotoğraf; ilk kare öncelikli yükleniyor */
function DegisenArka({ i, list }: { i: number; list: { foto: string }[] }) {
  return (
    <div className="lhe-arka" aria-hidden="true">
      {list.map((x, k) => (
        <div key={x.foto} className="lhe-arka-k" data-on={k === i || undefined}>
          <Image src={x.foto} alt="" fill sizes="100vw" priority={k === 0} className="lhe-img" />
        </div>
      ))}
    </div>
  );
}

function DonenKelime({ i, list }: { i: number; list: string[] }) {
  const reduce = useReducedMotion();
  return (
    <span className="lhe-e2-don" aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={list[i]}
          className="lhe-mavi"
          initial={reduce ? false : { y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {list[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function HeroE2() {
  const i = useSira(KELIME.length, 2600);
  return (
    <section className="lhe lhe-e2">
      <DegisenArka i={i} list={KELIME} />
      <div className="lhe-perde lhe-perde-sol" aria-hidden="true" />
      <div className="container-o lhe-icerik lhe-orta">
        <p className="lhe-kicker">
          <b>{KURULUS}</b>&apos;dan beri · Dubai · Londra · KKTC
        </p>
        <h1 className="lhe-h1 lhe-h1-e2">
          <DonenKelime i={i} list={KELIME.map((x) => x.k)} />
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
        <Image src={FOTO.ekip} alt="" fill priority sizes="100vw" className="lhe-img" />
      </div>
      <div className="lhe-perde lhe-perde-sol" aria-hidden="true" />
      <div className="container-o lhe-icerik lhe-e3-grid">
        <div>
          <p className="lhe-kicker">
            <b>{KURULUS}</b>&apos;dan beri
          </p>
          {/* Burak: "başlık yine biraz uzun". Eskisi "Şirketiniz kurulduktan
              sonra da işi biz yürütüyoruz." (masaüstünde dört satır). */}
          <h1 className="lhe-h1">
            Kuruluş başlangıç. <span className="lhe-mavi">Gerisi bizde.</span>
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

/* ================================================================ E4
   E2'nin kinetik yazısı + E3'ün canlılığı, tek sahnede (Burak: "biraz daha
   dene, daha iyisini çıkarabiliriz … şu anlık E3"). Tam ekran fotoğraf,
   ortada kısa ve büyük başlık; ekranın dibinde E3'ün iş kartları bir haber
   şeridi gibi sürekli akıyor. Başlığın ikinci yarısı dönüyor: kuruluşun bir
   gün, hizmetin her gün olduğunu söylüyor. */
const HER_GUN = ["her gün.", "her ay.", "her beyanda.", "her yıl."];

export function HeroE4() {
  const i = useSira(HER_GUN.length, 2400);
  return (
    <section className="lhe lhe-e4">
      <div className="lhe-arka" aria-hidden="true">
        <Image src={FOTO.ofis} alt="" fill priority sizes="100vw" className="lhe-img" />
      </div>
      <div className="lhe-perde lhe-perde-orta" aria-hidden="true" />
      <div className="container-o lhe-icerik lhe-e4-m">
        <p className="lhe-kicker">
          <b>{KURULUS}</b>&apos;dan beri · Muhasebe · Vergi · Kurumsal danışmanlık
        </p>
        <h1 className="lhe-h1 lhe-h1-e4">
          Kuruluş bir gün.
          <span className="lhe-e4-alt">
            Hizmet <DonenKelime i={i} list={HER_GUN} />
          </span>
          <span className="lhe-sr">Hizmet her gün, her ay, her beyanda, her yıl.</span>
        </h1>
        <p className="lhe-lead lhe-e4-lead">Dubai, Londra ve KKTC&apos;deki kendi ofislerimizden.</p>
        <div className="lhe-e4-cta">
          <Dugmeler />
        </div>
      </div>
      <div className="lhe-serit" aria-hidden="true">
        <div className="lhe-serit-akis">
          {[...OLAY, ...OLAY].map((o, k) => (
            <span key={k} className="lhe-serit-o">
              <span className="lhe-ic lhe-ic-k" data-ton={o.ton}>
                <o.Icon size={15} strokeWidth={2} />
              </span>
              <b>{o.t}</b>
              <em>{o.s}</em>
              <span className="lhe-tik lhe-tik-k">
                <Check size={12} strokeWidth={2.6} />
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
