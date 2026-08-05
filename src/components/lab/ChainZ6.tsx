"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Building2,
  CalendarCheck,
  IdCard,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { CHAIN } from "@/lib/brand";

/* ============================================================================
   ZİNCİR · aday Z6 — "NABIZ"
   ============================================================================
   NEREDEN ÇIKTI

   Müşteri üç adaydan sonra teşhisi kendi koydu: "ne zamanda bir olduğunu
   görselleştirerek gösteriyorduk ya, şu anki sitede olan mantık iyiydi… şimdi
   yaptığında sadece ne zamanda bir olduğu sadece yazı olarak yazıyor."

   Yani sıralama şu:
   · Canlı bölüm (home/Chain.tsx) SIKLIĞI GÖRSELLEŞTİRİYOR — fikir doğru.
   · Ama sıklık çubukların DOKUSUNA kodlanmış (düz / sık tırtıklı / seyrek
     tırtıklı). Dokuyu okumak için lejant çözmek gerekiyor; kimse çözmüyor.
   · Z1–Z3 sıklığı yazıya çevirdi ("Dönemsel", "Yenilemeli"). Lejant sorunu
     bitti ama görselleştirme de bitti. (Z1–Z3 ve Z4–Z5 müşteri isteğiyle
     silindi; adları burada yalnızca tarihçe olarak geçiyor.)

   Bu adayın iddiası: sıklık yine GÖRSEL olsun, ama okumak için hiçbir anahtar
   gerekmesin. Bunun tek yolu sıklığı DOKU değil MİKTAR yapmak — bakan kişi
   sayıyor, yorumlamıyor.

   EV İÇİ EMSAL. Bu dili site zaten konuşuyor: country/CountryAfter.tsx'te her
   yükümlülüğün yanında 12 aylık bir şerit var; aylık iş 12 dolu kare, üç aylık
   iş 4 kare, yıllık iş 1 kare. Lejant yok, çünkü sayı lejant istemiyor.
   Buradaki şerit o ailenin devamı: aynı okuma mantığı, farklı çizim.

   ŞERİDİN OKUNUŞU — üç işaretten ibaret, üçü de kendini anlatıyor:
   · İŞARET (tırtık) = bir kez iş çıkması. İki işaretin ARASI = ne kadar
     sürede bir tekrarlandığı. Yani periyot doğrudan mesafe olarak görünüyor.
   · ÇİZGİ (kesintisiz bant) = tekrarlamıyor, hiç durmuyor. Biçim farkı
     ("tekrar eden şey tırtık, durmayan şey çizgi") tek başına ayrımı taşıyor.
   · BOŞLUK = iş yok. Kuruluş satırının işaretinden sonrası bomboş; "bir kez"i
     söyleyen şey o boşluk.

   NABIZ — hareket burada süs değil, bilginin ikinci taşıyıcısı. Şeridin
   üzerinden tek bir zaman imleci geçiyor ve her işaret imleç üzerinden
   geçerken atıyor. Muhasebe satırı turda yirmi dört kez atıyor, oturum satırı
   bir kez, kuruluş satırı yalnızca ilk turda bir kez ve bir daha hiç.

   İKİ TUZAK, İKİ ÇÖZÜM:

   (1) Hareket TEK taşıyıcı olamaz. Bu yüzden nabız hiçbir bilgi ÜRETMİYOR,
       yalnızca duran bilgiyi seslendiriyor: hareket tamamen dursa da işaret
       sayısı ve aralar olduğu gibi yerinde kalıyor. prefers-reduced-motion
       açıkken bölüm hiç oynamıyor ve hiçbir şey kaybolmuyor.

   (2) Beş şeyin farklı hızlarda atması huzursuzluk üretir. Bu yüzden BEŞ
       TEMPO YOK, TEK SAAT VAR: imleç tek, hızı tek, satırlar yalnızca o saate
       kaç kez cevap verdiğiyle ayrışıyor. Genlik de kısık — atış, tırtığın
       boyunu yarım kadar büyütüp geri bırakıyor, renk sıçraması yok.
       Ayrıca saat sonsuza kadar çalışmıyor: bölüm ekrana girince iki tur
       dönüyor ve duruyor. (Canlı bölümün en somut şikâyeti buydu: sayfadaki
       tek bitmeyen hareket oydu, göz oraya takılıyordu.)

   SIKLIK VERİSİ NEREDEN GELİYOR — hiçbiri uydurulmadı:
   · Ritim SINIFI canlı bölümün META tablosundan, birebir: kurulus=once,
     banka=taper (açılış + düşük tempolu takip), muhasebe=period (sık tekrar),
     uyum=solid (kesintisiz), oturum=renew (seyrek tekrar). Ritim kelimeleri
     de ("Bir kez", "Açılış ve takip", "Dönemsel", "Sürekli", "Yenilemeli")
     canlı bölümün kendi kelimeleri.
   · O sınıfların SAYISAL karşılığı lib/afterSetup.ts'ten, yani Ortac
     Accounting'in "kuruluş sonrası" belgesinden: "Aylık Muhasebe Hizmeti"
     rhythm:"aylik", months 1–12 → muhasebe satırı her ay atıyor. Vize +
     Emirates ID rhythm:"iki-yillik" → oturum satırı iki yılda bir atıyor.
     Kayıtlar rhythm:"tek-seferlik", months:[1] → kuruluş bir kez.
   · Uyum'un afterSetup'ta kalemi yok; "Sürekli" bilgisi yalnızca canlı
     bölümden geliyor ve burada da kesintisiz çizgi olarak duruyor — ona bir
     sayı atanmadı, çünkü sayı verecek kaynak yok.
   · Pencerenin iki yıl olmasının sebebi tek: oturum yenilemesi iki yılda bir.
     On iki aylık pencerede o satır hiç atmazdı, yani en seyrek ritim ekrandan
     düşerdi. Takvim Dubai'ye ait ve bu dürüst — beş satırın beş bağlantısı da
     zaten /dubai/… sayfalarına gidiyor (adresler canlı bölümden birebir).

   Ad alanı `.z6-`, kuralları src/app/css/lab-z6.css. Canlı bölümün `.lc-` /
   `.ch5-` kümesiyle tek bir seçici paylaşmıyor; iki bölüm aynı sayfada yan
   yana dursa bile birbirinin üstüne yazmaz.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/** Şeridin penceresi: 0 = kuruluş anı, 24 = ikinci yılın sonu. */
const SPAN = 24;

/* Saatin tek kaynağı burası. CSS'e --z6-cycle olarak iniyor, JS de turu
   buradan sayıyor; iki yerde iki sayı olsaydı imleç ile atışlar kayardı. */
const CYCLE_MS = 12000;
/** Bölüm ekrana girdiğinde kaç tur dönüp duracağı. */
const PASSES = 2;
/** Satırların açılışı bitmeden saat başlamasın. */
const ARM_MS = 700;

/** Bir nabız anı. `once`: yalnızca ilk turda atar. `solo`: yalnız kalan atış. */
type Beat = { m: number; once?: true; solo?: true };

type Meta = {
  Icon: LucideIcon;
  href: string;
  /** canlı bölümdeki ritim kelimesi, birebir */
  cadence: string;
  beats: Beat[];
  /** kesintisiz bant: "full" durmayan iş, "thin" düşük tempolu takip */
  run?: "full" | "thin";
  /** tek seferlik olan satır siyah — canlı bölümde de öyle */
  ink?: true;
};

/* Her ay bir iş: afterSetup.ts "Aylık Muhasebe Hizmeti" (months 1–12) iki yıla
   uzatılmış hâli. Elle yazılmıyor ki pencere değişirse şerit de değişsin. */
const MONTHLY: Beat[] = Array.from({ length: SPAN }, (_, i) => ({ m: i + 1 }));

const META: Record<string, Meta> = {
  kurulus: {
    Icon: Building2,
    href: "/dubai",
    cadence: "Bir kez",
    ink: true,
    /* tek atış, sonrası boş — "bir kez"i söyleyen şey o boşluk */
    beats: [{ m: 0, once: true, solo: true }],
  },
  banka: {
    Icon: Landmark,
    href: "/dubai/banka-hesabi",
    cadence: "Açılış ve takip",
    /* açılış bir kez olur; takip tekrar eden bir iş değil, ince bir süreklilik */
    beats: [{ m: 0, once: true, solo: true }],
    run: "thin",
  },
  muhasebe: {
    Icon: CalendarCheck,
    href: "/dubai/muhasebe",
    cadence: "Dönemsel",
    beats: MONTHLY,
  },
  uyum: {
    Icon: ShieldCheck,
    href: "/dubai/uyum",
    cadence: "Sürekli",
    /* tırtık yok: tekrarlayan bir olay değil, hiç kapanmayan bir yükümlülük */
    beats: [],
    run: "full",
  },
  oturum: {
    Icon: IdCard,
    href: "/dubai/oturum-vize",
    cadence: "Yenilemeli",
    /* iki atış, arası tam pencere kadar: aradaki mesafe periyodun kendisi */
    beats: [
      { m: 0, once: true, solo: true },
      { m: SPAN, solo: true },
    ],
  },
};

export default function ChainZ6() {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);

  /* Bayrak iki koşulun çarpımı, tek bir state değil: gözlemci `armed`i
     açtıktan SONRA kullanıcı hareketi kısarsa saat aynı karede duruyor —
     efektin içinden state düşürmeye gerek kalmıyor. */
  const run = armed && !reduce;

  /* Saat yalnızca bölüm ekrandayken ve yalnızca iki tur çalışıyor.
     `armed` sunucuda da istemcinin ilk çiziminde de false: animasyonların
     tamamı CSS'te [data-run="on"] arkasında olduğu için hidrasyonda sunucu
     HTML'i ile istemci aynı şeyi çiziyor, sonradan açılıyor. */
  useEffect(() => {
    if (reduce) return;
    const el = panelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let arm: number | undefined;
    let stop: number | undefined;
    const clear = () => {
      window.clearTimeout(arm);
      window.clearTimeout(stop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        clear();
        if (!entry.isIntersecting) {
          /* ekrandan çıkınca duruyor ve sıfırlanıyor: geri gelindiğinde
             turu ortasından değil baştan alsın */
          setArmed(false);
          return;
        }
        arm = window.setTimeout(() => {
          setArmed(true);
          stop = window.setTimeout(() => setArmed(false), PASSES * CYCLE_MS + 150);
        }, ARM_MS);
      },
      { threshold: 0.3 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, [reduce]);

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Kuruluş bir halka, zincir devam ediyor."
            accent="zincir devam ediyor."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Şirket kurulduktan sonra başlayan iş burada.</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.24} y={20}>
          <div
            ref={panelRef}
            className="z6-panel"
            data-run={run ? "on" : "off"}
            style={{ "--z6-cycle": `${CYCLE_MS}ms` } as React.CSSProperties}
          >
            {/* Eksen. Üç kelime, üç konum — bu bir lejant değil, cetvelin
                kendisi: "24 tırtık" ancak yanında "2. yıl" yazınca "ayda bir"
                oluyor. */}
            <div className="z6-axis" aria-hidden="true">
              <span className="z6-axis-pad" />
              <span className="z6-ruler">
                <i data-at="start">Kuruluş</i>
                <i data-at="mid">1. yıl</i>
                <i data-at="end">2. yıl</i>
              </span>
              <span className="z6-axis-pad" />
            </div>

            <div className="z6-plot">
              {/* Zaman imleci. Tek tane, çünkü saat tek: satırlar hızla değil,
                  o saate kaç kez cevap verdikleriyle ayrışıyor. Dar ekranda
                  sütun geometrisi kalmadığı için gizleniyor; atışlar kalıyor. */}
              <span className="z6-headwrap" aria-hidden="true">
                <span className="z6-head" />
              </span>

              <ol className="z6-rows">
                {CHAIN.map((c, i) => {
                  /* CHAIN brand.ts'te yazılıyor ve bu tablo ona tip olarak
                     bağlı değil; tanımadığı bir anahtar sayfayı düşürmesin */
                  const meta = META[c.key];
                  if (!meta) return null;
                  const { Icon, href, cadence, beats, run: band, ink } = meta;
                  return (
                    <motion.li
                      key={c.key}
                      /* reduce `initial`i düşürmüyor, süreyi sıfırlıyor:
                         sunucuda medya sorgusu yok, istemciye özel bir
                         `initial` hidrasyonda farklı bir kare çizerdi */
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEW}
                      transition={{
                        duration: reduce ? 0 : 0.5,
                        delay: reduce ? 0 : 0.06 + i * 0.07,
                        ease: EASE,
                      }}
                    >
                      <SmartLink href={href} className="z6-row">
                        <span className="z6-lab">
                          <span className="z6-t">
                            <Icon
                              className="z6-ic"
                              size={17}
                              strokeWidth={1.9}
                              aria-hidden="true"
                            />
                            {c.label}
                            <ArrowUpRight
                              className="z6-arrow"
                              size={15}
                              strokeWidth={2.1}
                              aria-hidden="true"
                            />
                          </span>
                          <span className="z6-l">{c.line}</span>
                        </span>

                        {/* Şerit yalnızca görsel: ritmi sağdaki kelime zaten
                            söylüyor, ekran okuyucu iki kez duymasın. */}
                        <span className="z6-track" data-ink={ink} aria-hidden="true">
                          {band && (
                            <span className="z6-run" data-w={band}>
                              <i className="z6-glow" />
                            </span>
                          )}
                          {beats.map((b) => (
                            <span
                              key={b.m}
                              className="z6-beat"
                              data-once={b.once}
                              data-solo={b.solo}
                              /* konum da gecikme de bu tek sayıdan türüyor:
                                 tırtık nerede duruyorsa imleç oraya vardığında
                                 atıyor, ikisi elle eşitlenmiyor */
                              style={{ "--m": b.m } as React.CSSProperties}
                            />
                          ))}
                        </span>

                        <span className="z6-cad" data-ink={ink}>
                          {cadence}
                        </span>
                      </SmartLink>
                    </motion.li>
                  );
                })}
              </ol>
            </div>

            <p className="z6-cap">
              Şerit kuruluştan sonraki 24 ayı gösteriyor: her işaret o ay iş çıkması,
              işaretlerin arası ne kadar sürede bir tekrarlandığı demek. Takvim
              Dubai&apos;deki yükümlülük ritmine göre.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="z6-note">
            Kategorideki firmaların çoğu ilk halkada bitiyor. Ceza da, sorun da sonrasında
            çıkıyor.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
