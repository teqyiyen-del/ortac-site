"use client";

import { motion } from "motion/react";
import {
  Clock,
  Landmark,
  Percent,
  Plane,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { COUNTRY_PHOTO } from "@/lib/media";
import { useOrtacStore, type Country } from "@/lib/store";

/* One panel, not two: the country cards and the comparison table are the same
   object — each column is headed by its own photograph and the rows run across
   them. The column the visitor picked in the hero stays lit here. */

const COLS: { slug: Country; name: string; line: string; badge?: string }[] = [
  { slug: "dubai", name: "Dubai", line: "Serbest bölge" },
  { slug: "ingiltere", name: "İngiltere", line: "Ltd" },
  { slug: "kktc", name: "KKTC", line: "Ltd", badge: "Sadece Ortac'ta" },
];

type Cell = { text: string; good?: boolean };
const ROWS: { label: string; Icon: LucideIcon; cells: [Cell, Cell, Cell] }[] = [
  { label: "Kuruluş süresi", Icon: Clock, cells: [{ text: "7-14 gün" }, { text: "3-7 gün", good: true }, { text: "5-10 gün" }] },
  { label: "Kuruluş maliyeti", Icon: Wallet, cells: [{ text: "$$$" }, { text: "$", good: true }, { text: "$$" }] },
  { label: "Gelir vergisi", Icon: Percent, cells: [{ text: "%0*", good: true }, { text: "%19-25" }, { text: "Düşük" }] },
  { label: "Banka hesabı", Icon: Landmark, cells: [{ text: "Kolay", good: true }, { text: "Zor" }, { text: "Orta" }] },
  { label: "Fiziki ziyaret", Icon: Plane, cells: [{ text: "Gerekli" }, { text: "Gerekmez", good: true }, { text: "Gerekli" }] },
  { label: "Kimler için", Icon: Users, cells: [
      { text: "E-ticaret, teknoloji" },
      { text: "AB pazarı, freelance" },
      { text: "TR'ye yakın operasyon" },
  ] },
];

export default function Countries() {
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);

  return (
    <section id="ulkeler" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Üç ülke, tek tabloda."
            accent="tek tabloda."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Süre, maliyet, vergi ve banka yan yana. Sütun seçin, sayfa ona göre
              çalışsın.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.26} y={32} duration={0.8}>
          <div className="cmp-scroll">
            <div className="cmp" role="table" aria-label="Ülke karşılaştırması">
              {/* header: the photograph is the column head */}
              <div className="cmp-line cmp-line-head" role="row">
                <span className="cmp-k cmp-k-head" role="columnheader" />
                {COLS.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    role="columnheader"
                    aria-selected={country === c.slug}
                    className="cmp-head"
                    data-on={country === c.slug}
                    onClick={() => setCountry(c.slug)}
                  >
                    <span
                      className="cmp-photo"
                      aria-hidden="true"
                      style={{ backgroundImage: `url(${COUNTRY_PHOTO[c.slug]})` }}
                    />
                    <span className="cmp-scrim" aria-hidden="true" />
                    {c.badge && <span className="cmp-badge">{c.badge}</span>}
                    <span className="cmp-head-body">
                      <span className="cmp-name">{c.name}</span>
                      <span className="cmp-sub">{c.line}</span>
                    </span>
                  </button>
                ))}
              </div>

              {ROWS.map((row, ri) => (
                <motion.div
                  key={row.label}
                  className="cmp-line"
                  role="row"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 0.45, delay: 0.06 + ri * 0.05 }}
                >
                  <span className="cmp-k" role="rowheader">
                    <row.Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                    {row.label}
                  </span>
                  {row.cells.map((cell, ci) => (
                    <span
                      key={COLS[ci].slug}
                      className="cmp-v"
                      role="cell"
                      data-on={country === COLS[ci].slug}
                      data-good={cell.good || undefined}
                    >
                      {cell.text}
                    </span>
                  ))}
                </motion.div>
              ))}

            </div>
          </div>
        </FadeUp>

        <p className="cmp-note">* şartlara bağlı</p>
      </div>
    </section>
  );
}
