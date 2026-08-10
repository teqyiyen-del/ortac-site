"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import CountUp from "@/components/shared/CountUp";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_NAME, FACTS, type CountrySlug } from "@/lib/brand";
import { LINE_NOTE, SCOPE, money, needAmount, type Need } from "@/components/lab/fiyatKart";

/* ============================================================================
   LAB · mavi kart turu — ÜÇ ADAYIN ORTAK PARÇALARI

   Üç aday da aynı dört bloğu basıyor: başlık, rakam, kalem listesi, iki düğme.
   Ayrıldıkları yer YÜZEY: hangi kutu mavi, hangi metin nerede duruyor.
   Parçalar burada bir kez yazıldı; renkleri CSS'teki dört değişkenden
   (--mkx-ink, --mkx-ink-2, --mkx-ink-3, --mkx-rule) okuyorlar, yani aynı
   işaretleme koyu kartta beyaz, beyaz panelde siyah basıyor.

   Ortak olmasaydı kıyas kart tasarımını değil üç ayrı listeyi karşılaştırırdı.

   EASE canlı bileşenle aynı; kalem açılışının süresi de. Bu turda değişen tek
   şey kabın rengi, listenin davranışı değil.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

export function KartHead({ c }: { c: CountrySlug }) {
  return (
    <div className="mkx-head">
      {/* Flag TUZAĞI: çıplak <svg viewBox="0 0 60 40">, width/height yok.
          Kap 26x18'de sabit (canlı .fy2-flag ile aynı ölçü), svg yüzde yüze
          kilitli — sınırlanmazsa 300x150'ye açılıyor. */}
      <span className="mkx-flag" aria-hidden="true">
        <Flag country={c} />
      </span>
      <h3 className="mkx-name">{COUNTRY_NAME[c]}</h3>
      <span className="mkx-days">{FACTS[c].days}</span>
    </div>
  );
}

/* Rakam ve seçimden gelen fark. Delta'nın sınıfı dışarıdan geliyor çünkü üç
   adayda üç ayrı yüzeyde duruyor: iki adayda düz beyaz metin, .mk3'te beyaz
   bir hapın içinde (marka mavisinde 13.5px beyaz kontrast eşiğini geçmiyor). */
export function KartTot({
  total,
  extra,
  deltaClass,
}: {
  total: number;
  extra: number;
  deltaClass?: string;
}) {
  return (
    <div className="mkx-tot">
      <CountUp value={total} fontSize={46} color="#ffffff" />
      <AnimatePresence initial={false}>
        {extra > 0 ? (
          <motion.span
            className={deltaClass ? "mkx-delta " + deltaClass : "mkx-delta"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            +{money(extra)} ek kalem
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function KartLines({ c, picked }: { c: CountrySlug; picked: Need[] }) {
  return (
    <ul className="mkx-lines">
      <li className="mkx-line">
        <div className="mkx-line-in">
          <span className="mkx-line-l">
            Şirket kuruluşu
            <i>{SCOPE[c]}</i>
          </span>
          <span className="mkx-line-v">{FACTS[c].fromLabel}</span>
        </div>
      </li>

      <AnimatePresence initial={false}>
        {picked.map((n) => {
          const amount = needAmount(n.key, c);
          const note = LINE_NOTE[n.key][c];
          return (
            <motion.li
              key={n.key}
              className="mkx-line"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.34, ease: EASE }}
            >
              <div className="mkx-line-in">
                <span className="mkx-line-l">
                  {n.line}
                  {note ? <i>{note}</i> : null}
                </span>
                {/* İngiltere'de vize kalemi 0: rakam basmak yerine "kapsam
                    dışı" yazıyor. Sıfır bir fiyat değil, bir kapsam bilgisi. */}
                <span className="mkx-line-v" data-na={amount === 0}>
                  {amount > 0 ? money(amount) : "kapsam dışı"}
                </span>
              </div>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}

export function KartActs({ c }: { c: CountrySlug }) {
  return (
    <div className="mkx-acts">
      <SmartLink href={`/basla?ulke=${c}`} className="btn btn-solid btn-sm btn-full">
        Kurulumu başlat
        <ArrowRight size={15} strokeWidth={2.1} />
      </SmartLink>
      {/* /ingiltere ve /kktc dolaşıma kapalı; SmartLink onları sönük bir span
          olarak basıyor. Canlı bölümde de aynı davranış var — dolaşım kararı
          lib/routes.ts'te, burada değil. */}
      <SmartLink href={`/${c}`} className="btn btn-line btn-sm btn-full">
        Detaylı fiyat
      </SmartLink>
    </div>
  );
}
