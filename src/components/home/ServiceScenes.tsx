"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Check,
  Fingerprint,
  Landmark,
  ScrollText,
  ShieldCheck,
  UserRound,
} from "lucide-react";

/* Ana sayfa hizmet kartlarının sahneleri.
 *
 * Eski kartlarda görsel taraf 190px'lik küçük bir maketti ve metnin solunda
 * duruyordu; beş kart alt alta gelince satır satır aynı gri kutu okunuyordu.
 * Artık her kartın üstünde kendi sahnesi var: koyu panel, tek mavi, ve o
 * hizmetin mekanizmasını çizen bir hareket.
 *
 * Kural değişmedi: hiçbir sahne banka kararı, otorite kararı veya kesin süre
 * ima edemez. Çizilen şey ya bizim yaptığımız iş, ya da hâlâ açık olan adım.
 *
 * Hareket iki katmanlı: giriş (whileInView, bir kez) ve ortam döngüsü
 * (repeat: Infinity, düşük genlik). prefers-reduced-motion açıksa ikisi de
 * kapanıyor, sahne son karesinde duruyor.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -12% 0px" } as const;
const VB = "0 0 320 180";

function Scene({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={VB} className="svx" focusable="false" aria-hidden="true">
      {children}
    </svg>
  );
}

/** düz ray üzerinde ilerleyen tek darbe */
function Pulse({
  x1,
  x2,
  y,
  delay = 0,
}: {
  x1: number;
  x2: number;
  y: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.circle
      r="3.4"
      cy={y}
      className="svx-dot"
      initial={{ cx: x1, opacity: 0 }}
      whileInView={{ cx: [x1, x2], opacity: [0, 1, 1, 0] }}
      viewport={VIEW}
      transition={{ duration: 1.6, delay, repeat: Infinity, repeatDelay: 1.1, ease: "easeInOut" }}
    />
  );
}

/* ---------------------------------------------------------------- kuruluş --
   Üç evrak sicile giriyor, karşılığında mühürlü tescil çıkıyor.            */
export function SceneFormation() {
  const reduce = useReducedMotion();
  const docs = [30, 74, 118];
  return (
    <Scene>
      {docs.map((y, i) => (
        <motion.g
          key={y}
          initial={{ opacity: 0, x: reduce ? 0 : -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: reduce ? 0 : 0.45, delay: 0.1 + i * 0.13, ease: EASE }}
        >
          <rect x="8" y={y} width="64" height="34" rx="9" className="svx-box" />
          <rect x="20" y={y + 11} width="30" height="4.5" rx="2.25" className="svx-bar" />
          <rect x="20" y={y + 20} width="20" height="4.5" rx="2.25" className="svx-bar" />
        </motion.g>
      ))}

      <path d="M78 90 H104" className="svx-line-b svx-flow" />
      <path d="M104 85.6 L110.4 90 L104 94.4 Z" className="svx-ah-b" />
      <Pulse x1={80} x2={102} y={90} />

      <rect x="120" y="26" width="192" height="128" rx="16" className="svx-box" />
      <ScrollText x={136} y={42} width={15} height={15} strokeWidth={2.1} className="svx-ic-b" />
      <text x="159" y="54" className="svx-t svx-tb">
        tescil dosyası
      </text>
      <path d="M132 68 H300" className="svx-line" />

      {[84, 102, 120].map((y, i) => (
        <motion.g
          key={y}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEW}
          transition={{ duration: reduce ? 0 : 0.4, delay: 0.6 + i * 0.14, ease: EASE }}
        >
          <rect x="134" y={y - 5} width="12" height="12" rx="4" className="svx-chip-b" />
          <Check x={135.5} y={y - 3.5} width={9} height={9} strokeWidth={3.2} className="svx-ic-b" />
          <rect x="154" y={y - 3} width={i === 2 ? 78 : 104} height="6" rx="3" className="svx-bar" />
        </motion.g>
      ))}

      {/* mühür: çizilerek kapanan halka */}
      <motion.circle
        cx="276"
        cy="112"
        r="21"
        className="svx-seal"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: reduce ? 0 : 0.9, delay: 0.9, ease: EASE }}
      />
      <motion.g
        initial={{ opacity: 0, scale: reduce ? 1 : 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEW}
        transition={{ duration: reduce ? 0 : 0.4, delay: 1.5, ease: EASE }}
        style={{ transformOrigin: "276px 112px" }}
      >
        <Check x={267} y={103} width={18} height={18} strokeWidth={2.8} className="svx-ic-b" />
      </motion.g>
    </Scene>
  );
}

/* ------------------------------------------------------------------ banka --
   Bir kurumsal hesap, üç tahsilat rayı. Ray sayısı iddia değil, kanal.      */
export function SceneBanking() {
  const reduce = useReducedMotion();
  const rails = [
    { y: 36, label: "kart tahsilatı" },
    { y: 86, label: "havale / EFT" },
    { y: 136, label: "platform ödemesi" },
  ];
  return (
    <Scene>
      <motion.g
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      >
        <rect x="8" y="52" width="108" height="76" rx="14" className="svx-box-b" />
        <Landmark x={24} y={66} width={16} height={16} strokeWidth={2.1} className="svx-ic-b" />
        <rect x="24" y="94" width="52" height="7" rx="3.5" className="svx-bar-b" />
        <rect x="24" y="107" width="32" height="6" rx="3" className="svx-bar-dim" />
      </motion.g>

      {rails.map((r, i) => (
        <g key={r.y}>
          <path d={`M116 90 H150 V${r.y} H176`} className="svx-line-b svx-flow" fill="none" />
          <path d={`M176 ${r.y - 4.4} L182.4 ${r.y} L176 ${r.y + 4.4} Z`} className="svx-ah-b" />
          <motion.g
            initial={{ opacity: 0, x: reduce ? 0 : 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: reduce ? 0 : 0.45, delay: 0.25 + i * 0.13, ease: EASE }}
          >
            <rect x="190" y={r.y - 17} width="122" height="34" rx="11" className="svx-box" />
            <circle cx="208" cy={r.y} r="5" className="svx-dot" />
            <text x="222" y={r.y + 4} className="svx-t">
              {r.label}
            </text>
          </motion.g>
          <Pulse x1={178} x2={206} y={r.y} delay={i * 0.3} />
        </g>
      ))}
    </Scene>
  );
}

/* -------------------------------------------------------------- muhasebe --
   Dönem dönem dolan defter ve zamanında verilen beyan.                     */
export function SceneAccounting() {
  const reduce = useReducedMotion();
  const bars = [46, 62, 40, 74, 56, 88, 68, 96];
  return (
    <Scene>
      <rect x="8" y="14" width="304" height="152" rx="16" className="svx-box" />

      <text x="26" y="42" className="svx-t">
        dönem
      </text>
      <motion.g
        initial={{ opacity: 0, x: reduce ? 0 : 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEW}
        transition={{ duration: reduce ? 0 : 0.45, delay: 0.75, ease: EASE }}
      >
        <rect x="204" y="26" width="90" height="24" rx="12" className="svx-chip-ok" />
        <Check x={214} y={32} width={11} height={11} strokeWidth={3.2} className="svx-ic-ok" />
        <text x="231" y="42" className="svx-t svx-tok">
          beyan verildi
        </text>
      </motion.g>

      <path d="M26 132 H294" className="svx-line" />

      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={30 + i * 33}
          y={132 - h}
          width="19"
          height={h}
          rx="5"
          className={i === bars.length - 1 ? "svx-bar-b" : "svx-bar-mid"}
          initial={{ scaleY: 0, opacity: 0.4 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={VIEW}
          transition={{ duration: reduce ? 0 : 0.5, delay: 0.12 + i * 0.075, ease: EASE }}
          style={{ transformOrigin: `${39.5 + i * 33}px 132px` }}
        />
      ))}

      <text x="26" y="152" className="svx-t">
        defter
      </text>
      <text x="294" y="152" textAnchor="end" className="svx-t">
        rapor
      </text>
    </Scene>
  );
}

/* ------------------------------------------------------------------- uyum --
   Yükümlülük listesinin üzerinden geçen tarama. Sonuç değil, takip.        */
export function SceneCompliance() {
  const reduce = useReducedMotion();
  const rows = ["kayıt", "politika dosyası", "dönemsel bildirim"];
  return (
    <Scene>
      <rect x="8" y="14" width="304" height="152" rx="16" className="svx-box" />

      <circle cx="76" cy="90" r="42" className="svx-halo" />
      <ShieldCheck x={54} y={68} width={44} height={44} strokeWidth={1.6} className="svx-ic-b" />

      {rows.map((r, i) => (
        <motion.g
          key={r}
          initial={{ opacity: 0, x: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: reduce ? 0 : 0.45, delay: 0.2 + i * 0.15, ease: EASE }}
        >
          <rect x="142" y={40 + i * 44} width="158" height="34" rx="11" className="svx-box-2" />
          <rect x="156" y={51 + i * 44} width="12" height="12" rx="4" className="svx-chip-b" />
          <Check
            x={157.5}
            y={52.5 + i * 44}
            width={9}
            height={9}
            strokeWidth={3.2}
            className="svx-ic-b"
          />
          <text x="178" y={61 + i * 44} className="svx-t">
            {r}
          </text>
        </motion.g>
      ))}

      {/* tarama çizgisi: yükümlülük sürekli, o yüzden döngü sonsuz */}
      {!reduce && (
        <motion.rect
          x="142"
          y="34"
          width="158"
          height="2"
          rx="1"
          className="svx-scan"
          initial={{ y: 34, opacity: 0 }}
          whileInView={{ y: [34, 146, 34], opacity: [0, 0.9, 0] }}
          viewport={VIEW}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </Scene>
  );
}

/* ------------------------------------------------------------------- vize --
   Elinizde kalan şey: kimlik kartı. Biyometri adımı bize ait değil.        */
export function SceneVisa() {
  const reduce = useReducedMotion();
  return (
    <Scene>
      <motion.g
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
      >
        <rect x="26" y="26" width="268" height="128" rx="18" className="svx-box" />
      </motion.g>

      <motion.g
        initial={{ opacity: 0, scale: reduce ? 1 : 0.86 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEW}
        transition={{ duration: reduce ? 0 : 0.45, delay: 0.22, ease: EASE }}
        style={{ transformOrigin: "76px 84px" }}
      >
        <rect x="48" y="48" width="56" height="72" rx="12" className="svx-box-2" />
        <UserRound x={62} y={68} width={28} height={28} strokeWidth={1.9} className="svx-ic-dim" />
      </motion.g>

      {[
        { y: 54, w: 92, b: true },
        { y: 74, w: 132, b: false },
        { y: 90, w: 108, b: false },
      ].map((r, i) => (
        <motion.rect
          key={r.y}
          x="122"
          y={r.y}
          width={r.w}
          height={r.b ? 9 : 6}
          rx={r.b ? 4.5 : 3}
          className={r.b ? "svx-bar-b" : "svx-bar"}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={VIEW}
          transition={{ duration: reduce ? 0 : 0.5, delay: 0.36 + i * 0.12, ease: EASE }}
          style={{ transformOrigin: "122px center" }}
        />
      ))}

      {/* biyometri: bizim tamamlayamadığımız adım, o yüzden nabız atıyor */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: reduce ? 0 : 0.4, delay: 0.8, ease: EASE }}
      >
        <circle cx="248" cy="106" r="24" className="svx-halo" />
        <Fingerprint x={234} y={92} width={28} height={28} strokeWidth={1.8} className="svx-ic-b" />
        {!reduce && (
          <motion.circle
            cx="248"
            cy="106"
            r="24"
            className="svx-ring"
            animate={{ r: [24, 33], opacity: [0.55, 0] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.g>

      <text x="122" y="128" className="svx-t">
        kimlik kartı
      </text>
    </Scene>
  );
}
