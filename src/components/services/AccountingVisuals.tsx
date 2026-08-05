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
   duruyordu" olan sahne bu dosyaya girmedi. Bugün geriye tek sahne kaldı.

   · ExchangeLink — SİLİNDİ. Takas panelinin ortasındaki 96 piksellik bağdı
       ("üç besleme çizgisi → defter → tek çıkış oku") ve taşıdığı bilgi
       aradaki DÖNÜŞÜMDÜ: belgeler bir deftere giriyor, çıktılar o defterden
       doğuyor. O bilgi kaybolmadı, BÜYÜDÜ — aynı bloğun başına takas sahnesi
       girdi (components/services/AccountingHandover.tsx · .svsg-) ve aynı
       cümleyi 560 birimlik bir tuvalde, belgeleri gerçekten yolu kat ettirerek
       anlatıyor. İki çizim aynı bloğun içinde 24 piksel arayla aynı şeyi
       söylüyordu; küçük olanı gitti. CSS'i (.svs-conn) de silindi.

   · YearStrip — 12 aylık takvim şeridi. TEK KALAN SAHNE.
       KAYBOLAN BİLGİ: yılın YÖNÜ. Kutular sunucuda basılı hâlde bir dama
       tahtası gibi okunuyordu; hangi ayın önce geldiği bir yorum işiydi.
       Kutular ocaktan aralığa doğru sırayla dolduğunda şerit bir desen
       olmaktan çıkıp bir takvim oluyor: "iş yıla böyle yayılıyor."
       Dolu/boş ayrımı yine afterSetup.ts'ten (yearLanes) geliyor; bu dosya
       hangi ayın dolu olduğuna karar VERMİYOR, yalnızca sırayla gösteriyor.

   Bu dosyada olmayanlar, bilerek: sebepsiz yüzen şekil, dekoratif parçacık,
   imleç takip eden ışık, sonsuz dönen ikon. Süreç rayı ve başlangıç şeridi
   gibi "sıra" anlatan işaretler ise JS'e hiç gelmedi — saf CSS olarak
   svc-muhasebe.css'te duruyorlar (bkz. .svs-step, .svs-startstep). Takas
   sahnesi de aynı yolu seçti: saf CSS, kendi bileşeninde, sunucu tarafında.

   ---------------------------------------------------------------------------
   HAREKET KURALLARI — depodaki kalıp

   · whileInView + { once: true }: sahne bir kez oynuyor, ekrandan çıkıp
     girdikçe tekrar etmiyor.
   · `reduce` YALNIZCA SÜREYİ sıfırlıyor (aşağıdaki `t`), RENDER EDİLEN AĞACI
     değiştirmiyor. Sunucuda medya sorgusu yok; hareket azaltmada farklı bir
     ağaç basmak hidrasyonu ayırırdı. Aynı not PageHero.tsx ve ChainZ7.tsx'te
     de yazılı, kalıp oradan geliyor.
   · Sonsuz döngü yok, requestAnimationFrame yok, Math.random() yok.
   · Aynı anda tek sahne oynuyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* -12%: sahne ekranın altına değdiği anda değil, gerçekten görüldüğünde
   başlasın. Sayfadaki FadeUp ile aynı eşik. */
const VIEW = { once: true, margin: "0px 0px -12% 0px" } as const;

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

/** variant'lara geçen zamanlama; `t` ile hareket azaltmada ikisi de sıfır. */
type Beat = { dur: number; delay: number };

/* ============================================================================
   YIL ŞERİDİ — kutular ocaktan aralığa doğru doluyor
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
