"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/* ============================================================================
   /dubai/muhasebe SAHNELERİ — ad alanı .svs-

   ---------------------------------------------------------------------------
   NEDEN BU DOSYA VAR

   Müşterinin cümlesi: "ne bir görsellik var adam akıllı ne bir animasyon ne bir
   hareket… şuan katalog gibi duruyor." Ama aynı cümlede "bilgiler çok güzel"
   de diyor. Yani sorun içerik değil, içeriğin ekranda tek bir dokuya
   (kenarlıklı satır) indirgenmiş olması.

   Bir önceki tur metni %36 azalttı ve doğruydu; bu tur AZALAN METNİN YERİNE
   GÖRSEL koyuyor. Tek bir kelime geri gelmiyor.

   ---------------------------------------------------------------------------
   "İŞLEVSEL DÜŞÜN" — buradaki her sahnenin geçmek zorunda olduğu sınav

   Soru: "bu görsel kaldırılsa hangi BİLGİ kaybolur?" Cevabı "hiçbiri, güzel
   duruyordu" olan sahne bu dosyaya girmedi. İki sahne var:

   1 · ExchangeLink — takas panelinin ortasındaki bağ.
       KAYBOLAN BİLGİ: aradaki DEFTER. Panel iki listeyi ("Sizden gelen" /
       "Size dönen") yan yana koyuyor ve aralarında düz bir ok vardı; ok
       yalnızca yön söylüyordu. Oysa sayfanın anlattığı şey bir aktarım değil
       bir DÖNÜŞÜM: belgeler bir deftere giriyor, çıktılar o defterden
       doğuyor. Sahne tam olarak bunu çiziyor — üç besleme çizgisi deftere
       giriyor, defterin satırları doluyor, tek çıkış oku sağa gidiyor.
       Sayı iddiası YOK: kaç çıktı olduğunu listenin kendisi söylüyor,
       çizgiler saymıyor.

   2 · YearStrip — 12 aylık takvim şeridi.
       KAYBOLAN BİLGİ: yılın YÖNÜ. Kutular sunucuda basılı hâlde bir dama
       tahtası gibi okunuyordu; hangi ayın önce geldiği bir yorum işiydi.
       Kutular ocaktan aralığa doğru sırayla dolduğunda şerit bir desen
       olmaktan çıkıp bir takvim oluyor: "iş yıla böyle yayılıyor."
       Dolu/boş ayrımı yine afterSetup.ts'ten (yearLanes) geliyor; bu dosya
       hangi ayın dolu olduğuna karar VERMİYOR, yalnızca sırayla gösteriyor.

   Bu dosyada olmayanlar, bilerek: sebepsiz yüzen şekil, dekoratif parçacık,
   imleç takip eden ışık, sonsuz dönen ikon. Süreç rayı ve başlangıç şeridi
   gibi "sıra" anlatan işaretler ise JS'e hiç gelmedi — saf CSS olarak
   svc-muhasebe.css'te duruyorlar (bkz. .svs-step, .svs-startstep).

   ---------------------------------------------------------------------------
   HAREKET KURALLARI — depodaki kalıp

   · whileInView + { once: true }: sahne bir kez oynuyor, ekrandan çıkıp
     girdikçe tekrar etmiyor.
   · `reduce` YALNIZCA SÜREYİ sıfırlıyor (aşağıdaki `t`), RENDER EDİLEN AĞACI
     değiştirmiyor. Sunucuda medya sorgusu yok; hareket azaltmada farklı bir
     ağaç basmak hidrasyonu ayırırdı. Aynı not PageHero.tsx ve ChainZ7.tsx'te
     de yazılı, kalıp oradan geliyor.
   · Sonsuz döngü yok, requestAnimationFrame yok, Math.random() yok.
   · Aynı anda tek sahne oynuyor: ikisi sayfanın iki ayrı bölümünde ve
     birbirinden bir ekran uzakta.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* -12%: sahne ekranın altına değdiği anda değil, gerçekten görüldüğünde
   başlasın. Sayfadaki FadeUp ile aynı eşik. */
const VIEW = { once: true, margin: "0px 0px -12% 0px" } as const;

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

/** variant'lara geçen zamanlama; `t` ile hareket azaltmada ikisi de sıfır. */
type Beat = { dur: number; delay: number };

/** Çizgi çizilir gibi beliriyor (stroke-dashoffset). */
const DRAW: Variants = {
  rest: { pathLength: 0, opacity: 0 },
  run: (b: Beat) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: b.dur, delay: b.delay, ease: EASE },
  }),
};

/** Çizilemeyen parçalar (ok başı, defterin gövdesi) yalnızca beliriyor. */
const POP: Variants = {
  rest: { opacity: 0 },
  run: (b: Beat) => ({
    opacity: 1,
    transition: { duration: b.dur, delay: b.delay, ease: EASE },
  }),
};

/* ============================================================================
   1 · TAKAS BAĞI — "belge → defter → çıktı"
   ============================================================================

   GEOMETRİ TEK YERDE, İKİ YÖNDE ÇİZİLİYOR

   Panel geniş ekranda üç sütun (sizden gelen · bağ · size dönen), dar ekranda
   alt alta. Yani bağın yönü de değişmek zorunda: masaüstünde sağa, telefonda
   aşağı.

   Eski çözüm CSS'ti — kap 90 derece döndürülüyordu. Tek bir ok için işe
   yarıyordu ama bir defter çizimini döndürmek defteri yan yatırırdı; üstelik
   döndürülen kabın layout kutusu dönmediği için 140 piksellik bir çizim dar
   ekranda 140 piksellik boş bir satır bırakırdı.

   Şimdi aynı gövde iki kez basılıyor ve hangisinin görüneceğine CSS karar
   veriyor (.svs-conn-h / .svs-conn-v). Dikey olan gövdeyi bir <g> içinde
   döndürüyor, yani ikinci bir çizim BAKIMI yok — tek geometri, iki yön.
   Döndürme matematiği: 96x140'lık gövde (48,70) etrafında 90° dönünce
   [-22..118] x [22..118] kutusuna düşüyor, translate(22,-22) onu 140x96'ya
   oturtuyor.

   Ekran okuyucuya kapalı: çizimin söylediği her şeyi iki sütun başlığı ve
   listeler zaten kelimeyle söylüyor. */

/* Üç besleme: fatura, gider belgesi, banka ekstresi — soldaki listenin üç
   kalemi. Sayı burada uydurulmuyor, listeyle aynı.

   Açıklık (34..106) rastgele değil: soldaki üç satırın gerçek yayılımına
   yakın dursun diye seçildi, yoksa çizgiler listeye değil boşluğa bakardı. */
const FEEDS = [
  "M0 34 C 16 34 14 70 30 70",
  "M0 70 H30",
  "M0 106 C 16 106 14 70 30 70",
];

/* Defterin satırları. Üç satır ve boyları eşit değil: eşit olsalardı bir
   tablo gibi okunurdu, oysa bu bir defter sayfası. */
const RULES = ["M37 61 H59", "M37 70 H55", "M37 79 H59"];

/* Dikey hâlde dış <g> gövdeyi (48,70) etrafında 90 derece çeviriyor. Akış
   çizgileri için doğru — aşağı akmaları gerekiyor — ama defter için değil:
   döndürülmüş bir defterin satırları dikey çubuklara dönüyor ve kutu bir
   defter sayfası olmaktan çıkıp bir cihaza benziyor. Bu yüzden defter AYNI
   MERKEZ etrafında geri çevriliyor; iki dönüş birbirini tam olarak götürüyor,
   yani ikinci bir geometri yazmadan defter iki yönde de dik duruyor. */
const UPRIGHT = "rotate(-90 48 70)";

function ConnBody({ t, vertical }: { t: (v: number) => number; vertical?: boolean }) {
  return (
    <>
      {FEEDS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          className="svs-conn-feed"
          variants={DRAW}
          custom={{ dur: t(0.5), delay: t(0.05 + i * 0.09) } satisfies Beat}
        />
      ))}

      <g transform={vertical ? UPRIGHT : undefined}>
        {/* Defter gövdesi pathLength ile çizilmiyor: <rect> üzerinde pathLength
            tarayıcıdan tarayıcıya oturmuyor. Belirmesi yeterli — satırların
            dolması zaten "defter işliyor" diyor. */}
        <motion.rect
          x="30"
          y="52"
          width="36"
          height="36"
          rx="9"
          className="svs-conn-box"
          variants={POP}
          custom={{ dur: t(0.36), delay: t(0.5) } satisfies Beat}
        />

        {RULES.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            className="svs-conn-rule"
            variants={DRAW}
            custom={{ dur: t(0.3), delay: t(0.74 + i * 0.12) } satisfies Beat}
          />
        ))}
      </g>

      {/* Tek çıkış, tek yön: bu bir iş birliği değil bir devir. */}
      <motion.path
        d="M66 70 H86"
        className="svs-conn-out"
        variants={DRAW}
        custom={{ dur: t(0.4), delay: t(1.16) } satisfies Beat}
      />
      <motion.path
        d="M84 64.5 L92 70 L84 75.5 Z"
        className="svs-conn-head"
        variants={POP}
        custom={{ dur: t(0.3), delay: t(1.48) } satisfies Beat}
      />
    </>
  );
}

export function ExchangeLink() {
  const reduce = useReducedMotion();
  const t = (v: number) => (reduce ? 0 : v);

  return (
    <>
      <motion.svg
        className="svs-conn svs-conn-h"
        viewBox="0 0 96 140"
        fill="none"
        aria-hidden="true"
        focusable="false"
        initial="rest"
        whileInView="run"
        viewport={VIEW}
      >
        <ConnBody t={t} />
      </motion.svg>

      <motion.svg
        className="svs-conn svs-conn-v"
        viewBox="0 0 140 96"
        fill="none"
        aria-hidden="true"
        focusable="false"
        initial="rest"
        whileInView="run"
        viewport={VIEW}
      >
        <g transform="translate(22,-22) rotate(90 48 70)">
          <ConnBody t={t} vertical />
        </g>
      </motion.svg>
    </>
  );
}

/* ============================================================================
   2 · YIL ŞERİDİ — kutular ocaktan aralığa doğru doluyor
   ============================================================================

   IZGARA AYNI IZGARA. Bir önceki tur SVG takvimi 12 sütunlu bir CSS
   ızgarasına çevirmişti çünkü SVG 520 pikselin altında okunmuyor ve kendi
   kabında yatay kayıyordu. O karar DURUYOR: burada değişen tek şey kutuların
   ne zaman göründüğü. Sınıflar (.svm-cal*) ve ölçüler aynı dosyada, aynı
   yerde; sahne kendine yeni bir genişlik dayatmıyor.

   GECİKME AYIN KENDİSİNDEN: delay = (ay - 1) * ADIM. Yani dalga soldan sağa,
   ocaktan aralığa akıyor ve üç şerit aynı takvimi paylaştığı için hepsinde
   aynı ay aynı anda doluyor. Şerit farkı yalnızca lane * 0.03 — üç satır tek
   bir dalga gibi okunsun, üç ayrı animasyon gibi değil.

   BOŞ KUTULAR HAREKET ETMİYOR ve bu kasıtlı: yılın çerçevesi baştan orada,
   dolan şey İŞ. Boş kutu bir eksiklik değil, "o ay o kalem doğmuyor".

   Tek IntersectionObserver var: gözlemci kabın üstünde, kutular variant
   alıyor. On yedi ayrı whileInView yerine bir tane. */

/** Sayfadan geliyor; hepsi yearLanes()'in çıktısı, burada veri üretilmiyor. */
export type StripLane = {
  id: string;
  label: string;
  /** frequencyLabel(months.length) — kutulardan sayılmış hâli */
  freq: string;
  /** 1-12 */
  months: number[];
};

/* Şeridin panel olarak belirmesi (FadeUp) ile dalganın başlaması çakışmasın:
   önce kap oturuyor, sonra kutular doluyor. */
const BASE = 0.12;
const STEP = 0.05;

const CELL: Variants = {
  rest: { opacity: 0, scale: 0.5 },
  run: (b: Beat) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: b.dur, delay: b.delay, ease: EASE },
  }),
};

export function YearStrip({ lanes }: { lanes: StripLane[] }) {
  const reduce = useReducedMotion();
  const t = (v: number) => (reduce ? 0 : v);

  return (
    <motion.div
      className="svm-cal"
      initial="rest"
      whileInView="run"
      viewport={VIEW}
    >
      {/* Ay başlıkları aria-hidden: altındaki her şerit kendi aylarını zaten
          sözle söylüyor, sayı dizisini ekran okuyucuya iki kez okutmanın
          anlamı yok. */}
      <div className="svm-cal-row svm-cal-months" aria-hidden="true">
        <span className="svm-cal-lbl">
          <b>ay</b>
        </span>
        <div className="svm-cal-cells">
          {MONTHS.map((m) => (
            <span className="svm-cal-m" key={m}>
              {m}
            </span>
          ))}
        </div>
      </div>

      {lanes.map((lane, li) => {
        const on = new Set(lane.months);
        return (
          <div className="svm-cal-row" key={lane.id}>
            <span className="svm-cal-lbl">
              <b>{lane.label}</b>
              <i>{lane.freq}</i>
            </span>

            {/* Kutu dizisi tek bir resim gibi okunuyor: on iki ayrı düğüm
                yerine tek bir etiket. */}
            <div
              className="svm-cal-cells"
              role="img"
              aria-label={`${lane.label}: ${lane.freq} — ${lane.months.join(", ")}. aylar.`}
            >
              {MONTHS.map((m) =>
                on.has(m) ? (
                  <motion.span
                    key={m}
                    className="svm-cal-c"
                    data-on="1"
                    variants={CELL}
                    custom={
                      {
                        dur: t(0.34),
                        delay: t(BASE + (m - 1) * STEP + li * 0.03),
                      } satisfies Beat
                    }
                  />
                ) : (
                  <span className="svm-cal-c" data-on="0" key={m} />
                ),
              )}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
