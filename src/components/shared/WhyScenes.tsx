"use client";

import { motion } from "motion/react";
import {
  Building2,
  Check,
  FileWarning,
  ListChecks,
  MapPin,
  MessageSquare,
  UserRound,
  Wrench,
} from "lucide-react";

/* The four "why us" scenes. Same parts as the ops scenes — node, wire, tick,
   pill — so the whole page keeps one drawing style. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* 01 — one named person, in Turkish, for the whole file */
export function ContactScene() {
  return (
    <div className="sc">
      <div className="sc-card">
        <div className="sc-card-head">
          <UserRound size={17} strokeWidth={1.9} />
          Tek muhatap
        </div>
        <div className="sc-chat">
          {[
            { me: false, t: "Lisans bugün onaylandı." },
            { me: true, t: "Banka için ne gerekiyor?" },
            { me: false, t: "Formu hazırladım, imzanız yeterli." },
          ].map((m, i) => (
            <motion.span
              key={m.t}
              className="sc-msg"
              data-me={m.me || undefined}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 + i * 0.5, ease: EASE }}
            >
              {m.t}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="sc-pill"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.7 }}
        >
          <MessageSquare size={13} strokeWidth={2.2} />
          Mesai içinde doğrudan erişim
        </motion.div>
      </div>
    </div>
  );
}

/* 02 — we are physically there */
export function OfficeScene() {
  return (
    <div className="sc">
      <div className="sc-map">
        <span className="sc-map-grid" aria-hidden="true" />
        <motion.span
          className="sc-map-pin"
          initial={{ y: -26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.34, 1.4, 0.64, 1] }}
        >
          <MapPin size={22} strokeWidth={2} />
        </motion.span>
        <motion.span
          className="sc-map-ring"
          aria-hidden="true"
          initial={{ scale: 0.3, opacity: 0.6 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.8, delay: 0.9, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.span
          className="sc-map-label"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.95, ease: EASE }}
        >
          <Building2 size={13} strokeWidth={2.1} />
          Dubai · kendi ofisimiz
        </motion.span>
      </div>
    </div>
  );
}

/* 03 — a broken file taken over and repaired */
export function RepairScene() {
  return (
    <div className="sc">
      <div className="sc-flow">
        <div className="sc-node sc-node-warn">
          <FileWarning size={20} strokeWidth={1.8} />
          <span>Eksik dosya</span>
        </div>
        <div className="sc-wire" aria-hidden="true">
          <svg viewBox="0 0 160 24" preserveAspectRatio="none">
            <motion.path
              d="M2 12 H158"
              className="sc-wire-p"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.75, delay: 0.25, ease: EASE }}
            />
          </svg>
          <motion.span
            className="sc-wire-icon"
            initial={{ opacity: 0, rotate: -25 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
          >
            <Wrench size={15} strokeWidth={2.1} />
          </motion.span>
        </div>
        <div className="sc-node sc-node-accent">
          <span className="sc-node-ok">
            <Check size={13} strokeWidth={3} />
          </span>
          <span>Devralındı</span>
        </div>
      </div>
      <p className="sc-cap">Yenileme, beyan ve banka aşamasındaki açıkları kapatıyoruz.</p>
    </div>
  );
}

/* 04 — every step written down before it starts */
const WRITTEN = ["Adımlar ve süreler", "Kapsam ve hariç kalemler", "Panelde canlı takip"];

export function WrittenScene() {
  return (
    <div className="sc">
      <div className="sc-card">
        <div className="sc-card-head">
          <ListChecks size={17} strokeWidth={1.9} />
          Baştan yazılı
        </div>
        {WRITTEN.map((w, i) => (
          <motion.div
            key={w}
            className="sc-check"
            initial={{ opacity: 0.35 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.5 }}
          >
            <motion.span
              className="sc-tick"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.5, ease: EASE }}
            >
              <Check size={12} strokeWidth={3} />
            </motion.span>
            {w}
          </motion.div>
        ))}
        <motion.div
          className="sc-pill"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.7 }}
        >
          <Check size={13} strokeWidth={3} />
          Sürpriz kalem yok
        </motion.div>
      </div>
    </div>
  );
}
