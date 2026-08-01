"use client";

import { motion, useReducedMotion } from "motion/react";
import { BookOpen } from "lucide-react";
import { yearLanes } from "@/lib/accountingDubai";

/* ============================================================================
   DUBAİ MUHASEBE SAHNELERİ — /dubai/muhasebe

   NEDEN VAR: sayfa altı soruyu sırayla kapatıyor ve ikisinin cevabı yazıyla
   anlatılınca uzuyor, çizilince tek bakışta anlaşılıyor:

     1. "Muhasebe ne işe yarıyor?"  → LedgerFlowScene
        Girdi (fatura, fiş, ekstre) → tek defter → çıktı (rapor + beyan).
        Sahnenin bütün iddiası şu: rapor ile beyan AYNI kaynaktan çıkıyor.
        Bunu bir cümleyle söylemek mümkün ama "aynı kaynak" fikri okundukça
        değil, görüldükçe yerleşiyor.

     2. "Yıl içinde takvim nasıl işliyor?" → YearRhythmScene
        Üç ayrı ritim (aylık / 3 aylık / yıllık) aynı 12 ay üzerinde.
        Yan yana görülmeden "üç ritim" ifadesi soyut kalıyor.

   SÜS DEĞİL, VERİ: ikinci sahnedeki dolu kutular elle boyanmıyor. Hangi ayda
   iş çıktığı lib/accountingDubai.ts · yearLanes() üzerinden lib/afterSetup.ts'e
   bağlı — yani kalemin sıklığı değişirse şerit de değişiyor. Bir tasarım
   tercihi değil, verinin görüntüsü.

   DİL NEREDEN GELİYOR: sectors/SectorScenes.tsx (.sxv) ve home/ServiceScenes
   (.svx) ailesi. Değerler aynı (aynı kutu dolguları, tek mavi, koyu yüzeyde
   ALFA YOK, hepsi opak hex) ama sınıflar kopyalandı: bu sayfanın CSS'i kendi
   dosyasında (app/css/svc-muhasebe.css) ve globals.css'e dokunulmuyor.
   Bedeli birkaç yinelenen satır, karşılığı bölümün tek dosyadan okunabilmesi.

   NE ÇİZİLMEZ: sitenin kuralı burada da geçerli. Hiçbir kare banka onayı,
   otorite kararı veya "kaçıncı gün" iddiası taşımıyor. İkinci sahne yalnızca
   İŞİN hangi ayda çıktığını söylüyor; beyanın teslim süresi mevzuatın konusu
   ve o, sahnenin altındaki yazıda duruyor.

   HAREKET: iki katman — giriş (whileInView, bir kez) ve rayda dolaşan darbe
   (repeat: Infinity). useReducedMotion açıkken süreler sıfırlanıyor ve darbe
   hiç basılmıyor; markup iki durumda da aynı kalıyor, çünkü sunucu ile ilk
   istemci render'ının aynı niteliklere basması gerekiyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -10% 0px" } as const;

/* ---------------------------------------------------------------- yardımcı */

/** Rayda ilerleyen tek darbe. reduce açıkken hiç basılmıyor. */
function Pulse({ x1, x2, y, delay = 0 }: { x1: number; x2: number; y: number; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.circle
      r="3.2"
      cy={y}
      className="svmv-dot"
      initial={{ cx: x1, opacity: 0 }}
      whileInView={{ cx: [x1, x2], opacity: [0, 1, 1, 0] }}
      viewport={VIEW}
      transition={{ duration: 1.4, delay, repeat: Infinity, repeatDelay: 1.1, ease: "easeInOut" }}
    />
  );
}

/** Sağı gösteren ok ucu — <marker> yerine düz üçgen, id çakışması olmasın. */
function Tip({ x, y }: { x: number; y: number }) {
  return <path d={`M${x - 7} ${y - 4.4} L${x} ${y} L${x - 7} ${y + 4.4} Z`} className="svmv-ah" />;
}

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
   1 · DEFTERDEN BEYANA GİDEN YOL

   Üç sütun: ne giriyor, nereye işleniyor, ne çıkıyor. Sol sütundaki üç satır
   tek bir omurgaya toplanıp deftere giriyor, defterden çıkan tek ray sağda
   yeniden üçe ayrılıyor. Bu simetri kasıtlı: girdiler farklı, çıktılar farklı,
   ama aradaki kayıt tek. Sayfanın "rapor ile beyan aynı kaynaktan çıkar"
   cümlesinin şeması bu.

   Çıktı kutularının ikisinde FTA yazıyor, birinde yazmıyor — aylık rapor
   otoriteye gitmiyor, size geliyor. Aynı sütuna koyulup ayrımın silinmesi
   yanlış olurdu, o yüzden alt satırlar hedefi söylüyor.
   ========================================================================= */

const IN_ROWS = [
  { t: "Satış faturası", s: "kesilen her fatura" },
  { t: "Gider belgesi", s: "fiş, sözleşme, masraf" },
  { t: "Banka ekstresi", s: "hesap hareketleri" },
];

const OUT_ROWS = [
  { t: "Aylık rapor", s: "gelir-gider · bilanço · nakit akış" },
  { t: "KDV beyannamesi", s: "üç aylık dönem · FTA" },
  { t: "Kurumlar vergisi beyanı", s: "yılda bir · FTA" },
];

/* satır merkezleri: üst 60, orta 124, alt 188 — üç sütunda da aynı */
const ROW_Y = [60, 124, 188];

export function LedgerFlowScene({ caption }: { caption?: string }) {
  const reduce = useReducedMotion();
  const t = (v: number) => (reduce ? 0 : v);

  return (
    <Panel caption={caption}>
      <svg
        viewBox="0 0 640 226"
        className="svmv"
        role="img"
        aria-label="Muhasebe akışı: satış faturası, gider belgesi ve banka ekstresi dijital deftere işleniyor; defterden aylık rapor, KDV beyannamesi ve kurumlar vergisi beyanı çıkıyor."
      >
        <text x="0" y="14" className="svmv-lbl">
          ne giriyor
        </text>
        <text x="248" y="14" className="svmv-lbl">
          nereye işleniyor
        </text>
        <text x="468" y="14" className="svmv-lbl">
          ne çıkıyor
        </text>

        {/* --- sol: girdiler --- */}
        {IN_ROWS.map((r, i) => {
          const y = ROW_Y[i] - 24;
          return (
            <motion.g
              key={r.t}
              initial={{ opacity: 0, x: reduce ? 0 : -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{ duration: t(0.45), delay: t(0.06 + i * 0.09), ease: EASE }}
            >
              <rect x="0" y={y} width="168" height="48" rx="12" className="svmv-box" />
              <text x="16" y={y + 21} className="svmv-t">
                {r.t}
              </text>
              <text x="16" y={y + 38} className="svmv-s">
                {r.s}
              </text>
            </motion.g>
          );
        })}

        {/* üç girdi tek omurgaya, omurgadan tek ray deftere */}
        <path d="M168 60 H200 M168 124 H200 M168 188 H200" className="svmv-line" />
        <path d="M200 60 V188" className="svmv-line" />
        <path d="M200 124 H240" className="svmv-line-b svmv-flow" />
        <Tip x={246} y={124} />
        <Pulse x1={202} x2={238} y={124} />

        {/* --- orta: defterin kendisi --- */}
        <motion.g
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: t(0.5), delay: t(0.3), ease: EASE }}
        >
          <rect x="248" y="76" width="148" height="96" rx="16" className="svmv-box-b" />
          <rect x="266" y="92" width="30" height="30" rx="10" className="svmv-badge" />
          <BookOpen
            x={273}
            y={99}
            width={16}
            height={16}
            strokeWidth={1.9}
            className="svmv-ic"
            aria-hidden="true"
          />
          <text x="266" y="142" className="svmv-t">
            Dijital defter
          </text>
          <text x="266" y="159" className="svmv-s">
            kayıt · sınıflama · mutabakat
          </text>
        </motion.g>

        {/* defterden çıkan tek ray, sağda yeniden üçe ayrılıyor */}
        <path d="M396 124 H424" className="svmv-line-b svmv-flow" />
        <path d="M424 60 V188" className="svmv-line" />
        <path d="M424 60 H454 M424 124 H454 M424 188 H454" className="svmv-line" />
        {ROW_Y.map((y) => (
          <Tip key={y} x={462} y={y} />
        ))}
        <Pulse x1={398} x2={422} y={124} delay={0.5} />

        {/* --- sağ: çıktılar --- */}
        {OUT_ROWS.map((r, i) => {
          const y = ROW_Y[i] - 24;
          return (
            <motion.g
              key={r.t}
              initial={{ opacity: 0, x: reduce ? 0 : 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{ duration: t(0.45), delay: t(0.44 + i * 0.09), ease: EASE }}
            >
              <rect x="468" y={y} width="172" height="48" rx="12" className="svmv-box-2" />
              <text x="484" y={y + 21} className="svmv-t">
                {r.t}
              </text>
              <text x="484" y={y + 38} className="svmv-s">
                {r.s}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </Panel>
  );
}

/* ============================================================================
   2 · MALİ YIL RİTMİ

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
