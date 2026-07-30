"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  FileWarning,
  Info,
  ListChecks,
  MessageSquare,
  UserRound,
  Wrench,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import LiveChat from "@/components/shared/LiveChat";
import LiveTracker from "@/components/shared/LiveTracker";
import SplitWords from "@/components/shared/SplitWords";
import OfficeMap from "@/components/shared/OfficeMap";

/* A bento grid, not a third stepper. One wide tile carries the map, three
   square tiles carry the other claims — each with its own small animation. */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/* Üçü de bizim kapatabileceğimiz dosya eksikleri. "Banka reddi" burada
   duramaz: reddi kaldıran taraf banka, biz değiliz; "kapatıldı" damgasıyla
   yan yana gelince zımnen banka sonucu taahhüdü oluyordu. */
const FIXES = ["Eksik yenileme", "Geciken beyan", "Eksik banka dosyası"];

export default function TrustLayer() {
  return (
    <section id="neden-ortac" className="sec-pad" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Neden Ortac Global?"
            accent="Ortac Global?"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Yalnızca doğrulanabilir olanı yazıyoruz.</p>
          </FadeUp>
        </div>

        <div className="bn">
          {/* --- wide: we are physically there --- */}
          <motion.div
            className="bn-tile bn-tile-wide"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="bn-copy">
              <h3 className="bn-title">Dubai&apos;de yerinde</h3>
              <p className="bn-line">
                Kendi ofisimiz ve muhasebe lisansımız var. Evrakı, otoriteyi ve bankayı
                yerinde takip ediyoruz; uzaktan aracılık değil.
              </p>
              <ul className="bn-facts">
                <li>
                  <Check size={14} strokeWidth={3} />
                  IFZA resmî iş ortağı
                </li>
                <li>
                  <Check size={14} strokeWidth={3} />
                  Muhasebe lisansı
                </li>
              </ul>
            </div>
            <OfficeMap />
          </motion.div>

          {/* --- one named contact --- */}
          <motion.div
            className="bn-tile bn-tile-tall bn-tile-dark"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <span className="bn-ic">
              <UserRound size={18} strokeWidth={1.9} />
            </span>
            <h3 className="bn-title">Tek muhatap, Türkçe süreç</h3>
            <p className="bn-line">İsimli bir danışman; kuruluş sonrası da aynı ekip.</p>
            <LiveChat />

            <span className="bn-foot">
              <MessageSquare size={13} strokeWidth={2.2} />
              Mesai içinde doğrudan erişim
            </span>
          </motion.div>

          {/* --- files taken over --- */}
          <motion.div
            className="bn-tile"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
          >
            <span className="bn-ic">
              <Wrench size={18} strokeWidth={1.9} />
            </span>
            <h3 className="bn-title">Devralınan dosyalar</h3>
            <p className="bn-line">
              Eksik kurulmuş şirketleri devralıp yenileme, beyan ve banka aşamasındaki
              açıkları kapatıyoruz.
            </p>
            <div className="bn-fixlist">
              {FIXES.map((f, i) => (
                <motion.div
                  key={f}
                  className="bn-fix"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEW}
                  transition={{ duration: 0.35, delay: 0.4 + i * 0.22, ease: EASE }}
                >
                  <i>
                    <Check size={11} strokeWidth={3.4} />
                  </i>
                  {f}
                  <b>kapatıldı</b>
                </motion.div>
              ))}
            </div>

            <div className="bn-repair">
              <span className="bn-node bn-node-warn">
                <FileWarning size={17} strokeWidth={1.9} />
                Eksik dosya
              </span>
              <span className="bn-arrow" aria-hidden="true">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={VIEW}
                  transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                />
                <ArrowRight size={14} strokeWidth={2.2} />
              </span>
              <span className="bn-node bn-node-ok">
                <Check size={17} strokeWidth={2.6} />
                Devralındı
              </span>
            </div>
          </motion.div>

          {/* --- everything written down --- */}
          <motion.div
            className="bn-tile bn-tile-dark"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.5, delay: 0.26, ease: EASE }}
          >
            <span className="bn-ic">
              <ListChecks size={18} strokeWidth={1.9} />
            </span>
            <h3 className="bn-title">Şeffaf süreç</h3>
            <p className="bn-line">Sürpriz kalem çıkmıyor; her aşama panelde görünür.</p>
            <LiveTracker />

            {/* Paneldeki gün sayıları örnek akıştır. Kayıtsız bırakıldığında
                "Lisans onayı gün 5", "Banka randevusu gün 8" kesin süre okuması
                veriyordu; brand.ts STANCE_LIMITS bunu açıkça yasaklıyor. */}
            <span className="bn-foot">
              <Info size={13} strokeWidth={2.2} />
              Buradaki akış örnektir; süreler tipik aralıktır
            </span>
          </motion.div>
        </div>

        <FadeUp delay={0.3}>
          <Link href="/#surec" className="link-arrow">
            Süreci gör
            <ArrowRight size={15} strokeWidth={2.1} />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
