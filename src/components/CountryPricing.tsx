"use client";

import SmartLink from "@/components/shared/SmartLink";
import { useEffect, useState } from "react";
import { animate, AnimatePresence, motion, useMotionValue } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { configure, TIER_META, TIER_PRICE, type ConfigLine } from "@/lib/pricing";
import { ACTIVITY_LABELS, type Activity, type Country, type Tier } from "@/lib/store";
import { gtm } from "@/lib/gtm";

/* The country page prices itself: the country is fixed by the route, everything
   else is a control, and the number on the right recalculates as you touch
   them. Nothing here asks which country you are in — you are already on it. */

const TIERS: Tier[] = ["basic", "gold", "platinium"];
const ACTIVITIES: Activity[] = [
  "e-ticaret",
  "yazilim",
  "danismanlik",
  "gayrimenkul",
  "saglik",
  "finans",
];

const money = (n: number) => `$${n.toLocaleString("tr-TR")}`;

function Amount({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const [text, setText] = useState(money(value));
  useEffect(() => {
    const c = animate(mv, value, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setText(money(Math.round(v / 50) * 50)),
    });
    return () => c.stop();
  }, [value, mv]);
  return <span className="ip-total">{text}</span>;
}

export default function CountryPricing({ country }: { country: Country }) {
  const [tier, setTier] = useState<Tier>("gold");
  const [activity, setActivity] = useState<Activity>("e-ticaret");
  const [visas, setVisas] = useState(0);
  const [bank, setBank] = useState(true);
  const [accounting, setAccounting] = useState(false);

  const r = configure({ country, tier, activity, visas, bank, accounting });
  const hasVisa = r.perVisa > 0;

  return (
    <div className="ip">
      {/* ---------------- controls ---------------- */}
      <div className="ip-form">
        <div className="ip-field">
          <span className="ip-label">Paket</span>
          <div className="ip-tiers">
            {TIERS.map((t) => (
              <button
                key={t}
                type="button"
                className="ip-tier"
                data-on={tier === t}
                aria-pressed={tier === t}
                onClick={() => {
                  setTier(t);
                  gtm("country_tier", { country, tier: t });
                }}
              >
                <span className="ip-tier-n">{TIER_META[t].name}</span>
                <span className="ip-tier-i">{TIER_META[t].info}</span>
                <span className="ip-tier-p">{money(TIER_PRICE[country][t])}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="ip-field">
          <span className="ip-label">Faaliyet alanı</span>
          <div className="ip-chips">
            {ACTIVITIES.map((a) => (
              <button
                key={a}
                type="button"
                className="ip-chip"
                data-on={activity === a}
                aria-pressed={activity === a}
                onClick={() => setActivity(a)}
              >
                {ACTIVITY_LABELS[a]}
              </button>
            ))}
          </div>
          <p className="ip-hint">
            Lisans sınıfı faaliyete göre değişir; bazı alanlarda ek onay gerekir.
          </p>
        </div>

        <div className="ip-field ip-field-row">
          {hasVisa && (
            <div className="ip-mini">
              <span className="ip-label">Vize (kişi)</span>
              <div className="ip-step">
                <button type="button" aria-label="Azalt" disabled={visas <= 0} onClick={() => setVisas(visas - 1)}>
                  −
                </button>
                <span>{visas}</span>
                <button type="button" aria-label="Artır" disabled={visas >= 4} onClick={() => setVisas(visas + 1)}>
                  +
                </button>
              </div>
              {r.includes.visas > 0 && <span className="ip-inc">{r.includes.visas} kişi pakete dahil</span>}
            </div>
          )}

          <div className="ip-switches">
            {[
              {
                on: bank || r.includes.bank,
                locked: r.includes.bank,
                set: setBank,
                label: "Banka hesabı desteği",
              },
              {
                on: accounting || r.includes.accounting,
                locked: r.includes.accounting,
                set: setAccounting,
                label: "Yıllık muhasebe",
              },
            ].map((sw) => (
              <button
                key={sw.label}
                type="button"
                role="switch"
                aria-checked={sw.on}
                className="ip-toggle"
                data-on={sw.on}
                disabled={sw.locked}
                onClick={() => sw.set(!sw.on)}
              >
                <span className="ip-track" aria-hidden="true">
                  <span />
                </span>
                <span className="ip-toggle-t">
                  {sw.label}
                  {sw.locked && <b>pakete dahil</b>}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- live total ---------------- */}
      <aside className="ip-out">
        <span className="ip-out-k">Tahmini kurulum tutarı</span>
        <Amount value={r.total} />
        <span className="ip-out-u">tek seferlik · {r.duration}</span>

        <div className="ip-lines">
          <AnimatePresence initial={false}>
            {r.lines.map((l: ConfigLine) => (
              <motion.div
                key={l.label}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="ip-line"
                data-base={l.base || undefined}
              >
                <span>{l.label}</span>
                <span className="ip-line-a">{l.base ? money(l.amount) : `+${money(l.amount)}`}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="ip-meta">
          <span>
            Yapı<b>{r.license}</b>
          </span>
          <span>
            Yıllık gider<b>{money(r.annual)}</b>
          </span>
        </div>

        <SmartLink
          href={`/basla?ulke=${country}&paket=${tier}`}
          className="btn btn-primary btn-full"
          onClick={() => gtm("country_config_start", { country, tier, total: r.total })}
        >
          Bu kurulumla başlayın
          <ArrowRight size={15} strokeWidth={2.1} />
        </SmartLink>

        <ul className="ip-assure">
          <li>
            <Check size={13} strokeWidth={3} />
            Kapsam ve hariç kalemler yazılı
          </li>
          <li>
            <Check size={13} strokeWidth={3} />
            Sürpriz kalem çıkmaz
          </li>
        </ul>
        <p className="ip-note">Tutarlar temsilidir; nihai teklif faaliyet ve belgelere göre netleşir.</p>
      </aside>
    </div>
  );
}
