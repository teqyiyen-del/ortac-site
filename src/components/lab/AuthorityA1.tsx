"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
import type { Country } from "@/lib/store";

/* ADAY A1 — "Neden Ortac Global?" bölümünün geniş karosu, dünya okumasıyla.
 *
 * ÇÖZÜLEN İKİ PROBLEM
 *
 * 1) SÜRE iki kere söyleniyordu. Başlıkta "N yıllık kurumsal geçmiş" yazıp
 *    hemen yanındaki panoda 76 pikselik bir sayaç ve N segmentlik bir
 *    yıl şeridi göstermek, aynı cümleyi iki farklı yazı tipiyle tekrar
 *    etmekti. Sayı bir kere söylenir; ikinci kez söylendiğinde bilgi değil
 *    gürültü olur. Bu yüzden sayısal ağırlığın tamamı BAŞLIKTA kaldı, görsel
 *    sütun bambaşka bir iddiaya devredildi: erişim. Karoda artık hiçbir yerde
 *    rakam yok — küre süreyi değil coğrafyayı anlatıyor. (Sayı 17.08.2026'da
 *    müşteri düzeltmesiyle 22'den 30'a çıktı; bu karar sayıdan bağımsız.)
 *
 * 2) Karo kalabalıktı. Eski hâlde sol sütunda başlık + 33 kelimelik paragraf +
 *    iki tikli satır, sağ sütunda ayrıca üç tane iki satırlık kimlik satırı
 *    vardı; üstelik sağdaki üç satırın ikisi soldaki iki tikin birebir
 *    tekrarıydı. Şimdi her iddia TEK yerde duruyor:
 *      - süre        → başlık
 *      - üç ülke     → küre (bayraklar söylüyor, cümle kurmuyoruz)
 *      - ortaklık / lisans / ofis → soldaki üç tek satırlık madde
 *    Toplam metin ~90 kelimeden ~25 kelimeye indi.
 *
 * NEDEN KÜRE, HERO'DAKİ KÜREYE RAĞMEN
 * Ana sayfanın hero'sunda zaten büyük, koyu, noktalı ve dönen bir küre var
 * (SvgGlobe). Buradaki onun kopyası değil, bilerek karşıt: açık zeminli, düz
 * renkli, tel-kafes bir disk ve hiç dönmüyor. Aynı fikrin iki farklı ölçekte
 * tekrarı sayfada bir ritim kuruyor — hero "dünyaya bakıyorsunuz" der, bu karo
 * "biz şurada, şurada ve şuradayız" der. Kıta çizmedik: küre bir harita değil,
 * erişim işareti; olmayan bir coğrafi hassasiyet iddia etmiyor.
 *
 * İDDİA SINIRI
 * Buradaki her şey brand.ts'teki doğrulanabilir listeden geliyor (IFZA resmî
 * iş ortaklığı, kendi muhasebe lisansı, Dubai'de kendi ofis, üç ülkede
 * operasyon). Yeni iddia, yeni rakam ve süre taahhüdü yok.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/* Sol sütun. Üçü de tek satır, hiçbirinin alt açıklaması yok — açıklama
   isteyen bölümün altındaki "Süreci gör" çıkışına gidiyor. "Üç ülkede
   operasyon" bilerek burada YOK: onu sağdaki küre söylüyor. */
const CREDS = ["IFZA resmî iş ortağı", "Kendi muhasebe lisansımız", "Dubai'de kendi ofisimiz"];

/* Sağ sütun. Yüzdeler sahnenin kendisine göre; üçü de diskin görünen kısmında
   ve birbirinin üstüne binmeyecek şekilde ayrık.
   Koordinatlar enlem-boylam DEĞİL — disk bir harita olmadığı için gerçek
   koordinat vermek olmayan bir hassasiyet iddia etmek olurdu. Ama sıralama
   keyfî de değil: soldan sağa batıdan doğuya gidiyor (İngiltere → KKTC →
   Dubai), böylece dizilim en azından gerçeğe ters düşmüyor.
   `hub` yalnızca Dubai'de: kendi ofisimizin olduğu tek yer orası. */
const MARKS: { c: Country; label: string; x: number; y: number; hub?: boolean }[] = [
  { c: "ingiltere", label: "İngiltere", x: 36, y: 42 },
  { c: "dubai", label: "Dubai", x: 67, y: 63, hub: true },
  { c: "kktc", label: "KKTC", x: 40, y: 86 },
];

/* Tel kafes, 240'lık kare bir viewBox içinde: merkez (120,120), yarıçap 92.
   Enlemler düz çizgi değil basık elips, çünkü küre hafifçe eğik duruyor —
   düz çizgi çizersek disk yassı bir madeni paraya benziyor. Her enlemin rx'i
   kürenin o yükseklikteki gerçek kirişi (Pisagor), ry'si o kirişin sabit bir
   oranı; böylece elipsler diskin dışına taşmıyor.
   Üç enlem + iki boylam: altısı da hairline. Daha fazlası küreyi çizim değil
   tel yumağı yapıyordu. */
const R = 92;
const CX = 120;
const LATS = [-56, 0, 56].map((dy) => {
  const rx = Math.sqrt(R * R - dy * dy);
  return { cy: CX + dy, rx, ry: rx * 0.22 };
});
const MERIDIANS = [32, 66];

export default function AuthorityA1() {
  const reduce = useReducedMotion();

  /* Çizgiler pathLength="1" ile normalize ediliyor, böylece kesikli çizgi
     hesabı elemanın gerçek uzunluğundan bağımsız: dasharray 1, dashoffset
     1'den 0'a giderken çizgi kendini çiziyor. getTotalLength() ölçümüne
     ihtiyaç yok, elipslerde de aynen çalışıyor.
     Hareket kapalıysa offset baştan 0 — çizgi hiç gizlenmiyor. */
  const draw = (i: number) => ({
    pathLength: 1,
    strokeDasharray: 1,
    initial: { strokeDashoffset: reduce ? 0 : 1 },
    whileInView: { strokeDashoffset: 0 },
    viewport: VIEW,
    transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.15 + i * 0.09, ease: EASE },
  });

  return (
    <>
      {/* ---------------- sol sütun: iddia, üç satır ---------------- */}
      <div className="adun-copy">
        <motion.h3
          className="adun-title"
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
        >
          30 yıllık kurumsal geçmiş
        </motion.h3>

        <motion.p
          className="adun-line"
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.08, ease: EASE }}
        >
          Kuruluştan beyana kadar dosyayı kendi ekibimiz yürütüyor.
        </motion.p>

        <ul className="adun-creds">
          {CREDS.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: reduce ? 0 : -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{
                duration: reduce ? 0 : 0.42,
                delay: reduce ? 0 : 0.18 + i * 0.09,
                ease: EASE,
              }}
            >
              <Check size={14} strokeWidth={3} aria-hidden="true" />
              {t}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* ---------------- sağ sütun: erişim ---------------- */}
      <div className="adun-stage">
        {/* Kürenin ne anlattığını tek başına bayraklar da söylüyor ama bu üç
            kelime hem ekran okuyucuya hem de aceleyle kaydıran göze bağlamı
            bedavaya veriyor. */}
        <span className="adun-tag">Üç ülkede operasyon</span>

        {/* Disk sahnenin alt kenarından taşıyor ve kırpılıyor: tam daire
            çizersek karo boyu 60-70 piksel uzuyordu, üstelik ortada duran bir
            daire "ikon" gibi okunuyor. Kırpılmış hâli ufuktan yükselen bir
            gezegen — hem daha kısa hem daha az ikonik. */}
        <svg className="adun-orb" viewBox="0 0 240 240" aria-hidden="true" focusable="false">
          {/* Yalnızca opaklık: SVG'de ölçek animasyonu transform-origin'i
              bbox'tan hesaplatıyor ve disk kırpılı olduğu için origin
              tarayıcıdan tarayıcıya kayabiliyor. Zemin sessizce açılıyor,
              hareketi tel kafes taşıyor. */}
          <motion.circle
            className="adun-disc"
            cx={CX}
            cy={CX}
            r={R}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEW}
            transition={{ duration: reduce ? 0 : 0.65, ease: EASE }}
          />

          <g className="adun-grid">
            {LATS.map((l, i) => (
              <motion.ellipse key={`lat-${i}`} cx={CX} cy={l.cy} rx={l.rx} ry={l.ry} {...draw(i)} />
            ))}
            {MERIDIANS.map((rx, i) => (
              <motion.ellipse
                key={`mer-${rx}`}
                cx={CX}
                cy={CX}
                rx={rx}
                ry={R}
                {...draw(LATS.length + i)}
              />
            ))}
          </g>

          <motion.circle
            className="adun-rim"
            cx={CX}
            cy={CX}
            r={R}
            {...draw(0)}
          />
        </svg>

        {/* Konum işaretleri. Ülke adı için ayrı bir cümle kurmuyoruz — bayrak
            + ad zaten "Dubai · İngiltere · KKTC" satırının yaptığı işi yapıyor,
            üstelik yer kaplamadan. */}
        {MARKS.map(({ c, label, x, y, hub }, i) => (
          /* Ortalama (translate -50%) dış katmanda, hareket iç katmanda:
             motion transform'u komple yazdığı için ikisi aynı elemanda
             olamaz — biri diğerini siler. */
          <span className="adun-at" key={c} style={{ left: `${x}%`, top: `${y}%` }}>
            <motion.span
              className="adun-mark"
              data-hub={hub || undefined}
              initial={{ opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VIEW}
              transition={{
                duration: reduce ? 0 : 0.5,
                delay: reduce ? 0 : 0.62 + i * 0.13,
                ease: EASE,
              }}
            >
              <span className="adun-pin">
                <span className="adun-flag">
                  <Flag country={c} />
                </span>
                {/* Nabız yalnızca Dubai'de ve yalnızca hareket açıkken: üç
                    işaretin üçü de atarsa vurgu diye bir şey kalmıyor. */}
                {hub && !reduce ? (
                  <motion.i
                    className="adun-ping"
                    aria-hidden="true"
                    initial={{ scale: 0.65, opacity: 0.55 }}
                    animate={{ scale: 1.9, opacity: 0 }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                  />
                ) : null}
              </span>
              {label}
            </motion.span>
          </span>
        ))}
      </div>
    </>
  );
}
