"use client";

import { motion, useReducedMotion } from "motion/react";
import { yearLanes } from "@/lib/accountingDubai";

/* ============================================================================
   DUBAİ MUHASEBE SAHNESİ — /dubai/muhasebe

   SAYFANIN TEK SAHNESİ: "Yıl içinde takvim nasıl işliyor?" → YearRhythmScene.
   Üç ayrı ritim (aylık / 3 aylık / yıllık) aynı 12 ay üzerinde. Yan yana
   görülmeden "üç ritim" ifadesi soyut kalıyor ve bunu yazıyla söylemenin
   karşılığı üç paragraf.

   ---------------------------------------------------------------------------
   KALDIRILDI — LedgerFlowScene (girdi → defter → çıktı şeması)

   Sadeleştirme turunda silindi ve gerekçesi tek cümle: anlattığı şey sayfanın
   ana bölümünde zaten yazıyordu. #kapsam'ın beş aşaması "ne giriyor, nereye
   işleniyor" diyor, altı çıktısı "ne çıkıyor" diyor. Şema üçüncü bir kopyaydı.

   Bedeli de vardı: 640 birimlik bir çizimdi, 520px'in altında okunmuyordu ve
   CSS onu telefonda bölümün en başına alıyordu. Ziyaretçinin gördüğü ilk şey,
   tek cümle okumadan önce, yatay kaydırılan bir şema ve 279 karakterlik bir
   altyazı oluyordu. Metnin akışını kesen görsel, görsel değil engel.

   ---------------------------------------------------------------------------
   SÜS DEĞİL, VERİ: dolu kutular elle boyanmıyor. Hangi ayda iş çıktığı
   lib/accountingDubai.ts · yearLanes() üzerinden lib/afterSetup.ts'e bağlı —
   yani kalemin sıklığı değişirse şerit de değişiyor.

   DİL NEREDEN GELİYOR: sectors/SectorScenes.tsx (.sxv) ve home/ServiceScenes
   (.svx) ailesi. Değerler aynı (aynı kutu dolguları, tek mavi, koyu yüzeyde
   ALFA YOK, hepsi opak hex) ama sınıflar kopyalandı: bu sayfanın CSS'i kendi
   dosyasında (app/css/svc-muhasebe.css) ve globals.css'e dokunulmuyor.

   NE ÇİZİLMEZ: sitenin kuralı burada da geçerli. Hiçbir kare banka onayı,
   otorite kararı veya "kaçıncı gün" iddiası taşımıyor. Sahne yalnızca İŞİN
   hangi ayda çıktığını söylüyor; beyanın teslim süresi mevzuatın konusu ve o,
   sahnenin altındaki tek satırda duruyor.

   HAREKET: tek katman — giriş (whileInView, bir kez). useReducedMotion
   açıkken süreler sıfırlanıyor; markup iki durumda da aynı kalıyor, çünkü
   sunucu ile ilk istemci render'ının aynı niteliklere basması gerekiyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -10% 0px" } as const;

/**
 * Beyaz bölümün içindeki tek koyu yüzey. Çizim dar ekranda küçültülürse
 * yazıları okunmuyor; ölçeklemek yerine kendi kabında yatay kayıyor (CSS ·
 * .svmv-hold). Sayfanın gövdesi asla yana kaymıyor, taşan tek şey panelin içi.
 */
function Panel({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <div className="svmv-panel">
      <div className="svmv-hold">{children}</div>
      {caption && <p className="svmv-cap">{caption}</p>}
    </div>
  );
}

/* ============================================================================
   MALİ YIL RİTMİ — sayfanın tek sahnesi

   12 ay yatay, üç ritim dikey. Dolu kutu "bu ayda iş var" demek; boş kutu
   "bu ayda o kalem doğmuyor" demek. Şerit lib/afterSetup.ts'teki `months`
   dizilerinden çiziliyor (bkz. yearLanes) — sıklık verinin kendisi.

   Sıklık etiketi de sayılıyor, yazılmıyor: 12 ay "her ay", 4 ay "3 ayda bir",
   1 ay "yılda bir". Böylece etiket ile kutular birbirinden ayrı düşemiyor.
   ========================================================================= */

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const COL_X = 158; // ay ızgarasının başladığı yer; solu etiket sütunu
const COL_W = 40;
const LANE_TOP = 34;
const LANE_H = 48;

/** Kaç ayda bir olduğunu kutuların kendisinden okur — elle yazılmıyor. */
function frequencyLabel(count: number): string {
  if (count >= 12) return "her ay";
  if (count === 4) return "3 ayda bir";
  if (count === 1) return "yılda bir";
  return `yılda ${count} kez`;
}

export function YearRhythmScene({ caption }: { caption?: string }) {
  const reduce = useReducedMotion();
  const t = (v: number) => (reduce ? 0 : v);
  const lanes = yearLanes();
  const height = LANE_TOP + lanes.length * LANE_H + 6;

  return (
    <Panel caption={caption}>
      <svg
        viewBox={`0 0 640 ${height}`}
        className="svmv"
        role="img"
        aria-label={`Mali yıl ritmi: ${lanes
          .map((l) => `${l.label} ${frequencyLabel(l.months.length)}`)
          .join(", ")}.`}
      >
        {/* ay başlıkları */}
        {MONTHS.map((m) => (
          <text
            key={m}
            x={COL_X + (m - 1) * COL_W + COL_W / 2}
            y="18"
            textAnchor="middle"
            className="svmv-lbl"
          >
            {m}
          </text>
        ))}
        <text x="0" y="18" className="svmv-lbl">
          ay
        </text>

        {lanes.map((lane, li) => {
          const top = LANE_TOP + li * LANE_H;
          const active = new Set(lane.months);
          return (
            <g key={lane.id}>
              <path d={`M0 ${top} H640`} className="svmv-rule" />
              <text x="0" y={top + 21} className="svmv-t">
                {lane.label}
              </text>
              <text x="0" y={top + 38} className="svmv-s">
                {frequencyLabel(lane.months.length)}
              </text>

              {MONTHS.map((m) => {
                const on = active.has(m);
                return (
                  <motion.rect
                    key={m}
                    x={COL_X + (m - 1) * COL_W + 3}
                    y={top + 13}
                    width="34"
                    height="22"
                    rx="6"
                    className={on ? "svmv-cell-on" : "svmv-cell"}
                    /* yalnızca opaklık: SVG'de ölçek animasyonu transform-box
                       varsayılanına bağlı ve tarayıcılar arasında oynuyor.
                       Soldan sağa gelen sıralı beliriş zaten ritmi anlatıyor. */
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEW}
                    transition={{
                      duration: t(0.34),
                      delay: t(0.1 + li * 0.12 + (m - 1) * 0.025),
                      ease: EASE,
                    }}
                  />
                );
              })}
            </g>
          );
        })}
        <path d={`M0 ${LANE_TOP + lanes.length * LANE_H} H640`} className="svmv-rule" />
      </svg>
    </Panel>
  );
}
