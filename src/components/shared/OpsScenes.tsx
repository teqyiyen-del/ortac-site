"use client";

import { motion } from "motion/react";
import {
  BadgeCheck,
  Building2,
  CalendarCheck,
  Check,
  FileText,
  Landmark,
  Receipt,
  ShieldCheck,
} from "lucide-react";

/* The four scenes for "how the work runs". Same visual language as FlowScene —
   soft node, one blue accent, one thing moving — so the section reads as a
   continuation of the page rather than a new gadget. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* 01 — documents get collected and ticked off */
const DOCS = ["Pasaport ve kimlik", "Adres beyanı", "Faaliyet seçimi"];

export function DocsScene() {
  return (
    <div className="sc">
      <div className="sc-card">
        <div className="sc-card-head">
          <FileText size={17} strokeWidth={1.9} />
          Evrak listesi
        </div>
        {DOCS.map((d, i) => (
          <motion.div
            key={d}
            className="sc-check"
            initial={{ opacity: 0.35 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.35 + i * 0.55 }}
          >
            <motion.span
              className="sc-tick"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 + i * 0.55, ease: EASE }}
            >
              <Check size={12} strokeWidth={3} />
            </motion.span>
            {d}
          </motion.div>
        ))}
        <div className="sc-bar">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.9, delay: 0.35, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}

/* 02 — the file travels to the authority and comes back stamped */
export function ApplyScene() {
  return (
    <div className="sc">
      <div className="sc-flow">
        <div className="sc-node">
          <FileText size={20} strokeWidth={1.8} />
          <span>Dosyanız</span>
        </div>

        <div className="sc-wire" aria-hidden="true">
          <svg viewBox="0 0 160 24" preserveAspectRatio="none">
            <motion.path
              d="M2 12 H158"
              className="sc-wire-p"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            />
          </svg>
          <motion.span
            className="sc-packet"
            initial={{ left: "2%", opacity: 0 }}
            animate={{ left: ["2%", "92%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, delay: 0.7, repeat: Infinity, repeatDelay: 0.7, ease: "easeInOut" }}
          />
        </div>

        <div className="sc-node sc-node-accent">
          <Landmark size={20} strokeWidth={1.8} />
          <span>Otorite</span>
          <motion.span
            className="sc-stamp"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.9, ease: EASE }}
          >
            <BadgeCheck size={15} strokeWidth={2.2} />
            Onaylandı
          </motion.span>
        </div>
      </div>
      <p className="sc-cap">Başvuruyu biz veriyoruz, takibini biz yapıyoruz.</p>
    </div>
  );
}

/* 03 — the books close month by month */
const BARS = [0.42, 0.66, 0.5, 0.8, 0.6, 0.94];
const BAR_LABELS = ["Şub", "Mar", "Nis", "May", "Haz", "Tem"];

export function BooksScene() {
  return (
    <div className="sc">
      <div className="sc-card">
        <div className="sc-card-head">
          <Receipt size={17} strokeWidth={1.9} />
          Aylık defter
        </div>
        <div className="sc-bars">
          {BARS.map((h, i) => (
            <span key={BAR_LABELS[i]} className="sc-bar-col">
              <motion.span
                className="sc-bar-fill"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: h }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.11, ease: EASE }}
                data-last={i === BARS.length - 1 || undefined}
              />
              <span className="sc-bar-lb">{BAR_LABELS[i]}</span>
            </span>
          ))}
        </div>
        <motion.div
          className="sc-pill"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.1, ease: EASE }}
        >
          <Check size={13} strokeWidth={3} />
          KDV beyanı hazırlandı
        </motion.div>
      </div>
    </div>
  );
}

/* 04 — the deadline is met before it arrives */
export function FilingScene() {
  const cells = Array.from({ length: 21 });
  return (
    <div className="sc">
      <div className="sc-card">
        <div className="sc-card-head">
          <CalendarCheck size={17} strokeWidth={1.9} />
          Beyan takvimi
        </div>
        <div className="sc-cal">
          {cells.map((_, i) => (
            <motion.span
              key={i}
              className="sc-cal-d"
              data-on={i === 13 || undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.24, delay: 0.1 + i * 0.018 }}
            >
              {i === 13 && (
                <motion.span
                  className="sc-cal-tick"
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.9, ease: EASE }}
                >
                  <Check size={11} strokeWidth={3.4} />
                </motion.span>
              )}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="sc-pill"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2, ease: EASE }}
        >
          <ShieldCheck size={13} strokeWidth={2.2} />
          28 Temmuz&apos;dan önce verildi
        </motion.div>
      </div>
    </div>
  );
}

/* 05 — one named team on the other side of every step */
export function DeskScene() {
  return (
    <div className="sc">
      <div className="sc-flow">
        <div className="sc-node">
          <Building2 size={20} strokeWidth={1.8} />
          <span>Dubai ofisi</span>
        </div>
        <div className="sc-wire" aria-hidden="true">
          <svg viewBox="0 0 160 24" preserveAspectRatio="none">
            <motion.path
              d="M2 12 H158"
              className="sc-wire-p"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            />
          </svg>
        </div>
        <div className="sc-node sc-node-accent">
          <FileText size={20} strokeWidth={1.8} />
          <span>Belgeleriniz</span>
        </div>
      </div>
    </div>
  );
}
