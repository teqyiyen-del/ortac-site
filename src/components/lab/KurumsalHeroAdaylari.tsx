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
  Check,
} from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import type { CountrySlug } from "@/lib/brand";
import HeroAkis, { OLAY } from "@/components/home/HeroAkis";

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
        Uzmanlık alanlarımız
        <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
      </SmartLink>
      <SmartLink href="/iletisim" className="lhe-btn lhe-btn-cizgi">
        Bizimle iletişime geçin
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
        {/* DİL (01.10.2026 · Burak: "daha vizyon ve kurumsal odaklı bir dil
            … ChatGPT konuşmasında böyle mi yazıyordu"). Eskisi "30 yıl. Üç
            ülke. Tek ekip." (jenerik). Cümle Murat Bey'in sohbetindeki
            önerilerden: "İşiniz nerede olursa olsun, yanınızdayız." */}
        <h1 className="lhe-h1">
          İşiniz nerede olursa olsun,
          <br />
          <span className="lhe-mavi">yanınızdayız.</span>
        </h1>
        <p className="lhe-lead">
          Muhasebe, vergi ve kurumsal danışmanlıkta 30 yıllık deneyim; Dubai, Londra ve KKTC&apos;de yerel uzmanlıkla.
        </p>
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
   formları, "Bankanız"da banka, "Şirketiniz"de ofis. Yakınlaşma yok.

   DÖRDÜNCÜ AYAR (01.10.2026). Burak: "tek masada tabiri çok hoş değil …
   daha vizyon ve kurumsal odaklı bir dil." Cümle sohbetteki öneri: "Yerel
   uzmanlık. Uluslararası bakış." Dönen kelime artık şehir ve arkadaki
   fotoğraf o şehir: hizmet saymıyor, firmanın nerede olduğunu söylüyor. */
const KELIME: { k: string; foto: string }[] = [
  { k: "Dubai'de", foto: FOTO.dubai },
  { k: "Londra'da", foto: FOTO.londra },
  { k: "KKTC'de", foto: FOTO.kktc },
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
          <b>{KURULUS}</b>&apos;dan beri · Muhasebe · Vergi · Kurumsal danışmanlık
        </p>
        <h1 className="lhe-h1 lhe-h1-e2">
          <DonenKelime i={i} list={KELIME.map((x) => x.k)} />
          <span className="lhe-sr">Dubai&apos;de, Londra&apos;da ve KKTC&apos;de </span>
          yerel uzmanlık.
          <span className="lhe-e2-iki">Uluslararası bakış.</span>
        </h1>
        <p className="lhe-lead">30 yıllık deneyimimizi, üç ülkedeki kendi ofislerimizle işletmelerin hizmetine sunuyoruz.</p>
        <Dugmeler />
      </div>
    </section>
  );
}

/* ================================================================ E3
   CANLIYA ALINDI (03.10.2026): components/home/HeroAkis.tsx. Müşteri ve
   Burak E3'ü seçti ("E3 güzel oldu, ana sayfaya alabilirsin"). Lab'daki
   E3 artık canlı bileşenin kendisi; ikinci bir kopya yok. Bildirim listesi
   (OLAY) de oradan geliyor, E4'ün şeridi onu kullanıyor. */
export const HeroE3 = () => <HeroAkis partners={false} />;

/* ================================================================ E4
   E2'nin kinetik yazısı + E3'ün canlılığı, tek sahnede (Burak: "biraz daha
   dene, daha iyisini çıkarabiliriz … şu anlık E3"). Tam ekran fotoğraf,
   ortada kısa ve büyük başlık; ekranın dibinde E3'ün iş kartları bir haber
   şeridi gibi sürekli akıyor.

   DÖRDÜNCÜ AYAR (01.10.2026): "Kuruluş bir gün. Hizmet her gün." kalktı
   (Burak: "kuruluş falan diyoruz direkt … çok kurumsal değil"). Cümle
   sohbetteki "daha premium" öneri: "Bugünün kararları. Yarının güçlü
   işletmeleri." Hareket ikinci satırda dönen sıfatta ve dipteki şeritte. */
const YARIN = ["güçlü", "büyüyen", "sağlam"];

export function HeroE4() {
  const i = useSira(YARIN.length, 2600);
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
          Bugünün kararları.
          <span className="lhe-e4-alt">
            Yarının <DonenKelime i={i} list={YARIN} /> işletmeleri.
          </span>
          <span className="lhe-sr">Yarının güçlü, büyüyen ve sağlam işletmeleri.</span>
        </h1>
        <p className="lhe-lead lhe-e4-lead">
          Muhasebe, vergi ve kurumsal danışmanlıkta 30 yıl; Dubai, Londra ve KKTC&apos;de.
        </p>
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
