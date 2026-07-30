"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check, ScrollText } from "lucide-react";
import { BrandChip } from "@/components/shared/BrandMark";
import type { BrandKey } from "@/lib/brands";

/* Aday A2 — "BELGE".
 *
 * İki şikâyet vardı: "22" hem başlıkta hem karonun içinde tekrar ediyordu, ve
 * karo kalabalıktı. İkisinin de kaynağı aynı: otoriteyi SAYI taşıyordu.
 * Sayı tek başına bir iddia olduğu için yanına sürekli açıklama cümlesi
 * gerekiyor — "22" yazınca "yıl", "kesintisiz faaliyet", sonra da neyin 22 yıl
 * olduğunu anlatan bir paragraf. Metin oradan büyüyordu.
 *
 * Bu adayda otoriteyi BELGE taşıyor. Karonun içi bir kurumsal kimlik kartı:
 * üstünde firmanın adı ve faaliyet coğrafyası, ortasında sahip olduğumuz iki
 * belge, altında iş ortaklarının kendi işaretleri. Marka işaretleri cümlenin
 * yaptığı işi yapıyor — "PayPal ile çalışıyoruz" yazmak yerine PayPal'ın
 * işareti duruyor. Bu yüzden metin kendiliğinden azalıyor, tekrar da bitiyor:
 * kartın içinde tek bir rakam yok, "22" yalnızca başlıkta bir kez geçiyor.
 *
 * Kartın arkasından iki kâğıt ucu görünüyor. Süsleme değil: "elimizde bundan
 * fazlası var" cümlesini yazmadan söylüyor — özet önde, detay talep üzerine.
 *
 * İddia sınırı: buradaki her satırın karşılığı brand.ts PARTNERS'ta var.
 * Kartta ne resmî bir makamın mührü taklit ediliyor ne de uydurma bir kayıt
 * numarası basılıyor; mühür soyut bir onay işareti, kartın düzenleyeni de
 * firmanın kendisi.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* SWAP:AUTHORITY — bu iki belge ve aşağıdaki iş ortağı listesi müşteri
   onayına tabi. Liste uzarsa şerit kendiliğinden alt satıra sarıyor, düzen
   bozulmuyor; bu yüzden burada sayı sabiti yok.
   Stripe bilerek yok: brand.ts PARTNERS onu "altyapi" grubuna koyuyor ve o
   dosyanın kendi notu resmî ortaklıkla kullandığımız altyapının aynı çizgide
   akmamasını istiyor. Şeridin başlığı "iş ortaklıkları" dediğine göre içine
   yalnızca "resmi" grubundakiler girebilir. */
const PARTNER_MARKS: BrandKey[] = ["wio", "mashreq", "paypal", "wam"];

export default function AuthorityA2() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  /* Hareket kapalıyken her şey yerinde belirsin diye süre ve gecikme tek
     yerden sıfırlanıyor; her motion çağrısında ayrı ayrı kontrol etmek
     gecikmelerden birini unutmaya çok müsaitti. */
  const at = (delay: number, duration = 0.5) => ({
    duration: reduce ? 0 : duration,
    delay: reduce ? 0 : delay,
    ease: EASE,
  });

  return (
    <>
      <div className="abel-copy">
        <h3 className="bn-title">22 yıllık kurumsal geçmiş</h3>
        <p className="abel-lead">
          Aracı değiliz: muhasebe lisansı da resmî iş ortaklıkları da doğrudan bizim
          üstümüzde.
        </p>
      </div>

      {/* Yığın: kart + arkasındaki iki kâğıt ucu. Uçlar pseudo-element olduğu
          için motion ile değil, [data-on] üzerinden CSS geçişiyle açılıyor. */}
      <div className="abel-stack" ref={ref} data-on={seen ? "" : undefined}>
        <motion.div
          className="abel-doc"
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={seen ? { opacity: 1, y: 0 } : undefined}
          transition={at(0.05)}
        >
          <div className="abel-head">
            <span className="abel-head-t">
              <b>Ortac Global</b>
              <span>Dubai · İngiltere · KKTC</span>
            </span>

            {/* Mühür: damga gibi hafif dönerek oturuyor, halka bir kez açılıp
                söner. Tek seferlik — döngüye girerse kartın odağını çalıyor. */}
            <motion.span
              className="abel-seal"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.5, rotate: reduce ? 0 : -18 }}
              animate={seen ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
              transition={at(0.34, 0.55)}
            >
              <Check size={16} strokeWidth={3} />
              <motion.i
                aria-hidden="true"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={seen ? { scale: [0.7, 1.45], opacity: [0.9, 0] } : undefined}
                transition={at(0.5, 0.9)}
              />
            </motion.span>
          </div>

          <ul className="abel-rows">
            <motion.li
              initial={{ opacity: 0, x: reduce ? 0 : -8 }}
              animate={seen ? { opacity: 1, x: 0 } : undefined}
              transition={at(0.42, 0.42)}
            >
              <BrandChip brand="ifza" withName={false} size={18} />
              <span className="abel-t">IFZA resmî iş ortağı</span>
            </motion.li>

            <motion.li
              initial={{ opacity: 0, x: reduce ? 0 : -8 }}
              animate={seen ? { opacity: 1, x: 0 } : undefined}
              transition={at(0.52, 0.42)}
            >
              {/* Muhasebe lisansının markası yok; plaka marka işaretleriyle
                  aynı ölçüde kalsın diye ikon da aynı kutuya giriyor. */}
              <span className="abel-plate" aria-hidden="true">
                <ScrollText size={16} strokeWidth={1.9} />
              </span>
              <span className="abel-t">Kendi muhasebe lisansımız</span>
            </motion.li>
          </ul>

          <div className="abel-strip">
            <span className="abel-cap">Banka ve tahsilat iş ortaklıkları</span>
            <div className="abel-marks">
              {PARTNER_MARKS.map((b, i) => (
                <motion.span
                  key={b}
                  initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                  animate={seen ? { opacity: 1, y: 0 } : undefined}
                  transition={at(0.64 + i * 0.07, 0.36)}
                >
                  <BrandChip brand={b} withName={false} size={18} />
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
