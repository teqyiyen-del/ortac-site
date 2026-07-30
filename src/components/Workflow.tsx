"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { CalendarCheck, Check, FileText, Landmark, Receipt, type LucideIcon } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";

/* Scroll-driven, same rhythm as the setup timeline near the top of the page:
   the stage on the right is pinned and each step draws its own scene as you
   reach it. Every scene is real SVG animation, not a static mock. */

const EASE = [0.22, 1, 0.36, 1] as const;
const W = 560;
const H = 340;

/* ---------- 1 · documents land in the tray ---------- */
/* left-aligned title + right-edge tick: the label used to run under the tick */
const SHEETS = [
  { label: "Pasaport", sub: "kimlik sayfası · PDF", y: 34 },
  { label: "Adres beyanı", sub: "son 3 ay · PDF", y: 128 },
  { label: "Faaliyet seçimi", sub: "lisans sınıfı", y: 222 },
];

const RING = 2 * Math.PI * 30;

function SceneDocs() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sv" role="img" aria-label="Evrak toplanıyor">
      <motion.rect
        x="346"
        y="24"
        width="188"
        height="292"
        rx="20"
        className="sv-tray"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformOrigin: "440px 170px" }}
      />

      {/* the tray keeps score with a ring that closes as each sheet lands */}
      <circle cx="440" cy="132" r="30" className="sv-ring" />
      <motion.circle
        cx="440"
        cy="132"
        r="30"
        className="sv-ring-fill"
        strokeDasharray={RING}
        transform="rotate(-90 440 132)"
        initial={{ strokeDashoffset: RING }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.5, delay: 0.4, ease: EASE }}
      />
      <text x="440" y="139" className="sv-ring-t" textAnchor="middle">
        3/3
      </text>
      <text x="440" y="196" className="sv-cap" textAnchor="middle">
        Evrak tamam
      </text>
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.7, ease: EASE }}
      >
        <rect x="368" y="228" width="144" height="34" rx="17" className="sv-pill sv-pill-ok" />
        <circle cx="390" cy="245" r="4.5" className="sv-pill-dot-ok" />
        <text x="404" y="250" className="sv-pill-t">
          Panele yüklendi
        </text>
      </motion.g>

      {SHEETS.map((s, i) => (
        <motion.g
          key={s.label}
          initial={{ x: -170, y: 24, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.72, delay: 0.25 + i * 0.34, ease: EASE }}
        >
          <rect x="26" y={s.y} width="292" height="80" rx="14" className="sv-sheet" />
          {/* file glyph */}
          <rect x="46" y={s.y + 20} width="30" height="40" rx="6" className="sv-file" />
          <rect x="54" y={s.y + 30} width="14" height="3" rx="1.5" className="sv-file-ln" />
          <rect x="54" y={s.y + 38} width="14" height="3" rx="1.5" className="sv-file-ln" />
          <rect x="54" y={s.y + 46} width="9" height="3" rx="1.5" className="sv-file-ln" />

          <text x="92" y={s.y + 36} className="sv-tag">
            {s.label}
          </text>
          <text x="92" y={s.y + 56} className="sv-sub">
            {s.sub}
          </text>

          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.85 + i * 0.34, ease: [0.34, 1.5, 0.64, 1] }}
            style={{ transformOrigin: `288px ${s.y + 40}px` }}
          >
            <circle cx="288" cy={s.y + 40} r="14" className="sv-ok" />
            <Check x={280} y={s.y + 32} width={16} height={16} strokeWidth={3.2} className="sv-ok-ic" />
          </motion.g>
        </motion.g>
      ))}
    </svg>
  );
}

/* ---------- 2 · the filing goes out under our name ---------- */
const WIRE_A = "M 152 118 C 250 118, 262 96, 372 96";
const WIRE_B = "M 152 148 C 250 148, 262 244, 372 244";

function SceneFiling() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sv" role="img" aria-label="Başvuru gönderiliyor">
      <defs>
        <marker id="sv-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" className="sv-arrow" />
        </marker>
      </defs>

      {[WIRE_A, WIRE_B].map((d, i) => (
        <g key={d}>
          <motion.path
            d={d}
            className="sv-wire"
            markerEnd="url(#sv-arrow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.35 + i * 0.2, ease: EASE }}
          />
          <g className="sv-pk">
            <rect x="-9" y="-6" width="18" height="12" rx="3" />
            <path d="M-9 -6 L0 1 L9 -6" className="sv-pk-flap" />
            <animateMotion dur="2.4s" begin={`${1 + i * 0.4}s`} repeatCount="indefinite" path={d} />
          </g>
        </g>
      ))}

      <motion.g
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <rect x="20" y="98" width="132" height="70" rx="16" className="sv-node sv-node-me" />
        <text x="86" y="132" className="sv-t" textAnchor="middle">
          Ortac
        </text>
        <text x="86" y="152" className="sv-s" textAnchor="middle">
          sizin adınıza
        </text>
      </motion.g>

      {[
        { y: 60, t: "Serbest bölge", s: "lisans başvurusu", d: 0.55 },
        { y: 208, t: "Banka", s: "hesap başvurusu", d: 0.75 },
      ].map((n) => (
        <motion.g
          key={n.t}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: n.d, ease: EASE }}
        >
          <rect x="376" y={n.y} width="164" height="74" rx="16" className="sv-node" />
          <text x="458" y={n.y + 34} className="sv-t" textAnchor="middle">
            {n.t}
          </text>
          <text x="458" y={n.y + 54} className="sv-s" textAnchor="middle">
            {n.s}
          </text>
        </motion.g>
      ))}

      {/* the approval stamp lands once the file is in */}
      <motion.g
        initial={{ scale: 2.4, opacity: 0, rotate: -18 }}
        animate={{ scale: 1, opacity: 1, rotate: -9 }}
        transition={{ duration: 0.5, delay: 1.9, ease: [0.34, 1.4, 0.64, 1] }}
        style={{ transformOrigin: "512px 60px" }}
      >
        <circle cx="512" cy="60" r="20" className="sv-stamp" />
        <Check x={503} y={51} width={18} height={18} strokeWidth={3} className="sv-stamp-ic" />
      </motion.g>
    </svg>
  );
}

/* ---------- 3 · the books, kept monthly ---------- */
const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz"];
const VALUES = [0.42, 0.66, 0.5, 0.8, 0.62, 0.95];
const BASE = 268;
const MAXH = 180;

function SceneLedger() {
  const pts = VALUES.map((v, i) => `${72 + i * 76},${BASE - v * MAXH - 14}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sv" role="img" aria-label="Aylık kayıt ve raporlama">
      {[0, 1, 2, 3].map((g) => (
        <line key={g} x1="30" x2="530" y1={BASE - g * 60} y2={BASE - g * 60} className="sv-grid" />
      ))}

      {VALUES.map((v, i) => (
        <motion.rect
          key={MONTHS[i]}
          x={72 + i * 76 - 22}
          width="44"
          rx="8"
          y={BASE - v * MAXH}
          height={v * MAXH}
          className={i === VALUES.length - 1 ? "sv-bar sv-bar-on" : "sv-bar"}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.09, ease: EASE }}
          style={{ transformOrigin: `${72 + i * 76}px ${BASE}px` }}
        />
      ))}

      <motion.polyline
        points={pts}
        className="sv-trend"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
      />

      {MONTHS.map((m, i) => (
        <text key={m} x={72 + i * 76} y={BASE + 26} className="sv-axis" textAnchor="middle">
          {m}
        </text>
      ))}

      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 1.35, ease: EASE }}
      >
        <rect x="344" y="24" width="186" height="40" rx="20" className="sv-pill" />
        <circle cx="368" cy="44" r="5" className="sv-pill-dot" />
        <text x="384" y="49" className="sv-pill-t">
          KDV beyanı hazır
        </text>
      </motion.g>
    </svg>
  );
}

/* ---------- 4 · filed before the deadline ---------- */
const WEEK = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pa"];
const DAYS = 31;
const FILED = 24; // the day we submitted
const DUE = 27; // the statutory deadline
const CELL_W = 62;
const CELL_H = 40;
const GRID_X = 34;
const GRID_Y = 96;
const CELL_X = (i: number) => GRID_X + (i % 7) * (CELL_W + 8);
const CELL_Y = (i: number) => GRID_Y + Math.floor(i / 7) * (CELL_H + 7);

function SceneCalendar() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sv" role="img" aria-label="Beyan takvimi">
      {/* header */}
      <text x="34" y="34" className="sv-tag">
        Temmuz 2026
      </text>
      <motion.g
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
      >
        <rect x="368" y="14" width="158" height="30" rx="15" className="sv-pill" />
        <circle cx="390" cy="29" r="4.5" className="sv-pill-dot" />
        <text x="404" y="34" className="sv-pill-t">
          KDV · 2. dönem
        </text>
      </motion.g>

      {WEEK.map((d, i) => (
        <text
          key={d}
          x={CELL_X(i) + CELL_W / 2}
          y="82"
          className="sv-axis"
          textAnchor="middle"
        >
          {d}
        </text>
      ))}

      {Array.from({ length: DAYS }).map((_, i) => {
        const day = i + 1;
        const filed = day === FILED;
        const due = day === DUE;
        const past = day < FILED;
        return (
          <motion.g
            key={day}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22, delay: 0.1 + i * 0.014, ease: EASE }}
            style={{ transformOrigin: `${CELL_X(i) + CELL_W / 2}px ${CELL_Y(i) + CELL_H / 2}px` }}
          >
            <rect
              x={CELL_X(i)}
              y={CELL_Y(i)}
              width={CELL_W}
              height={CELL_H}
              rx="9"
              className={filed ? "sv-cell sv-cell-due" : due ? "sv-cell sv-cell-edge" : "sv-cell"}
            />
            <text
              x={CELL_X(i) + CELL_W / 2}
              y={CELL_Y(i) + CELL_H / 2 + 5}
              textAnchor="middle"
              className={filed ? "sv-day sv-day-on" : past ? "sv-day sv-day-past" : "sv-day"}
            >
              {day}
            </text>
          </motion.g>
        );
      })}

      {/* the callout that names the deadline */}
      <motion.g
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.95, ease: EASE }}
      >
        <path
          d={`M ${CELL_X(DUE - 1) + CELL_W / 2} ${CELL_Y(DUE - 1) - 4} l -5 -8 h 10 z`}
          className="sv-tip-tail"
        />
        <rect
          x={CELL_X(DUE - 1) + CELL_W / 2 - 52}
          y={CELL_Y(DUE - 1) - 40}
          width="104"
          height="28"
          rx="14"
          className="sv-tip"
        />
        <text
          x={CELL_X(DUE - 1) + CELL_W / 2}
          y={CELL_Y(DUE - 1) - 21}
          textAnchor="middle"
          className="sv-tip-t"
        >
          Son gün 27
        </text>
      </motion.g>

      {/* filed early */}
      <motion.g
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 1.25, ease: EASE }}
      >
        <rect x="34" y="292" width="252" height="36" rx="18" className="sv-pill sv-pill-ok" />
        <circle cx="56" cy="310" r="5" className="sv-pill-dot-ok" />
        <text x="70" y="315" className="sv-pill-t">
          24 Tem&apos;de verildi · 3 gün erken
        </text>
      </motion.g>
    </svg>
  );
}

const STEPS: {
  id: string;
  Icon: LucideIcon;
  title: string;
  line: string;
  scene: React.ReactNode;
}[] = [
  {
    id: "evrak",
    Icon: FileText,
    title: "Evrakı biz topluyoruz",
    line: "Listeyi biz çıkarıyoruz; siz yalnızca yükleyin.",
    scene: <SceneDocs />,
  },
  {
    id: "basvuru",
    Icon: Landmark,
    title: "Başvuruyu biz veriyoruz",
    line: "Otorite ve banka yazışması bizim üzerimizden yürür.",
    scene: <SceneFiling />,
  },
  {
    id: "muhasebe",
    Icon: Receipt,
    title: "Defteri biz tutuyoruz",
    line: "Aylık kayıt ve raporlama lisanslı ekibimizde.",
    scene: <SceneLedger />,
  },
  {
    id: "beyan",
    Icon: CalendarCheck,
    title: "Beyanı zamanında veriyoruz",
    line: "Tarihleri takip etmek sizin işiniz değil.",
    scene: <SceneCalendar />,
  },
];

export default function Workflow() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const [pos, setPos] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPos(Math.min(Math.max(v, 0), 0.9999) * STEPS.length);
  });

  const active = Math.min(Math.floor(pos), STEPS.length - 1);
  const frac = Math.min(Math.max(pos - active, 0), 1);

  return (
    <section id="isleyis" style={{ background: "var(--white)" }}>
      <div ref={trackRef} className="ops-track">
        <div className="ops-sticky">
          <div className="container-o ops-grid">
            <div>
              <SplitWords
                as="h2"
                text="Kuruluştan sonra işleyiş."
                accent="işleyiş."
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="ops-lead">
                  Dört adımda kimin ne yaptığı belli.
                </p>
              </FadeUp>

              <div className="ops-rail">
                {STEPS.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    className="ops-row"
                    data-on={i === active}
                    data-done={i < active || undefined}
                    onClick={() => setPos(i + 0.01)}
                  >
                    <span className="ops-ic">
                      {i < active ? (
                        <Check size={17} strokeWidth={3} />
                      ) : (
                        <s.Icon size={17} strokeWidth={1.9} />
                      )}
                    </span>
                    <span className="ops-text">
                      <span className="ops-t">
                        <i>{String(i + 1).padStart(2, "0")}</i>
                        {s.title}
                      </span>
                      <span className="ops-l">{s.line}</span>
                    </span>
                    {i === active && (
                      <span className="ops-bar" aria-hidden="true">
                        <span style={{ transform: `scaleX(${frac})` }} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="ops-stage">
              <AnimatePresence mode="wait">
                <motion.div
                  key={STEPS[active].id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {STEPS[active].scene}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
