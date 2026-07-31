"use client";

import SmartLink from "@/components/shared/SmartLink";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Building2,
  Calculator,
  IdCard,
  Landmark,
  LayoutDashboard,
  MapPin,
  PackageCheck,
  ScrollText,
  Sparkles,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import CountryPicker, { COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import { PRICING, TIER_META, TIER_PRICE } from "@/lib/pricing";
import { useOrtacStore, type Country, type Tier } from "@/lib/store";
import { gtm } from "@/lib/gtm";

/* SWAP:CALENDLY_URL */
const CALENDLY_URL = "#";

/* Card layout, but no longer Dubai-only: the flag row on top is the same switch
   the hero uses, so the country chosen up there is already selected here and
   every price on the cards belongs to that country. */

type Feature = { text: string; Icon: LucideIcon; tip?: string; muted?: boolean };

const TIERS: Tier[] = ["basic", "gold", "platinium"];

/* SWAP:PACKAGE_FEATURES — the licence line is what actually differs per country */
const LICENSE: Record<Country, string> = {
  dubai: "Free zone lisansı",
  ingiltere: "Companies House tescili",
  kktc: "Yerel ticaret tescili",
};
const SECOND: Record<Country, string> = {
  dubai: "Şirket tescili",
  ingiltere: "Kayıtlı adres (1 yıl)",
  kktc: "Şirket tescili",
};

const TIP = {
  bankOn: "Wio ve Mashreq başvuruları; evrak hazırlığı dahil.",
  bankOff: "Banka başvuruları bu pakete dahil değil.",
  acctOn: "12 ay raporlama, KDV ve kurumlar vergisi beyanı dahil.",
  acctOff: "Aylık raporlama ve KDV beyanı ayrı planlanır.",
  visa: "1 kişilik oturum vizesi; ek kişi ayrıca fiyatlanır.",
  vip: "Havalimanı karşılama ve yerinde imza günü organizasyonu.",
  advisor: "Tek muhatap; mesai içinde doğrudan erişim.",
};

/* every line carries the icon of the thing it is, not a generic tick — the
   muted lines are the ones the tier does not include */
const SECOND_ICON: Record<Country, LucideIcon> = {
  dubai: Building2,
  ingiltere: MapPin,
  kktc: Building2,
};

function featuresFor(country: Country, tier: Tier): Feature[] {
  const hasVisa = PRICING[country].perVisa > 0;
  if (tier === "basic")
    return [
      { text: LICENSE[country], Icon: ScrollText },
      { text: SECOND[country], Icon: SECOND_ICON[country] },
      { text: "Evrak takibi ve panel erişimi", Icon: LayoutDashboard },
      { text: "Banka desteği", Icon: Landmark, tip: TIP.bankOff, muted: true },
      { text: "Muhasebe", Icon: Calculator, tip: TIP.acctOff, muted: true },
    ];
  if (tier === "gold")
    return [
      { text: LICENSE[country], Icon: ScrollText },
      { text: SECOND[country], Icon: SECOND_ICON[country] },
      { text: "Banka desteği", Icon: Landmark, tip: TIP.bankOn },
      hasVisa
        ? { text: "1 kişi vize", Icon: IdCard, tip: TIP.visa }
        : { text: "Öncelikli süreç", Icon: Zap },
      { text: "Muhasebe", Icon: Calculator, tip: TIP.acctOff, muted: true },
    ];
  return [
    {
      text: hasVisa ? "Kuruluş, banka ve vize dahil" : "Kuruluş ve banka dahil",
      Icon: PackageCheck,
    },
    { text: "Yıllık muhasebe", Icon: Calculator, tip: TIP.acctOn },
    { text: "VIP karşılama", Icon: Sparkles, tip: TIP.vip },
    { text: "Öncelikli süreç", Icon: Zap },
    { text: "Özel danışman", Icon: UserRound, tip: TIP.advisor },
  ];
}

const ENTERPRISE_POINTS = [
  "Birden fazla ülke / birden fazla şirket",
  "Grup yapısı ve holding kurgusu",
  "Kadro vizesi ve toplu başvuru",
  "Özel muhasebe ve raporlama düzeni",
];

const money = (n: number) => `$${n.toLocaleString("tr-TR")}`;

function Feat({ f }: { f: Feature }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pr-feat" data-off={f.muted || undefined}>
      <span className="pr-ic" aria-hidden="true">
        <f.Icon size={15} strokeWidth={1.9} />
      </span>
      <span style={{ position: "relative" }}>
        <span
          className={f.tip ? "pr-feat-tip" : undefined}
          tabIndex={f.tip ? 0 : undefined}
          onMouseEnter={() => f.tip && setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => f.tip && setOpen(true)}
          onBlur={() => setOpen(false)}
          style={{ color: f.muted ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.92)" }}
        >
          {f.text}
        </span>
        {f.tip && open && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="pr-tip"
          >
            {f.tip}
          </motion.span>
        )}
      </span>
    </div>
  );
}

export default function Packages() {
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);

  return (
    <section id="hesaplayici" className="pr-section">
      <div className="container-o">
        <div className="sec-head sec-head-dark">
          <SplitWords
            as="h2"
            text="Paketler ve fiyatlar."
            accent="fiyatlar."
            base={0.1}
            className="h2"
            style={{ color: "#ffffff" }}
          />
          <FadeUp delay={0.24}>
            <p className="sec-lead sec-lead-dark">
              Ülkeyi seçin, paketler ona göre listelensin.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.28}>
          <div className="pr-pick">
            <CountryPicker
              value={country}
              onSelect={(c) => {
                setCountry(c);
                gtm("pricing_country", { country: c });
              }}
              withLabel
              label="Paket ülkesi"
            />
          </div>
        </FadeUp>

        {/* the whole grid re-keys on country so the prices count in, not swap */}
        <AnimatePresence mode="wait">
          <motion.div
            key={country}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pr-grid"
          >
            {TIERS.map((t) => {
              const meta = TIER_META[t];
              const highlighted = t === "gold";
              return (
                <div key={t} className={`pr-card${highlighted ? " pr-card-hl" : ""}`}>
                  <div className="pr-head">
                    {highlighted && <span className="pr-pop">En çok tercih</span>}
                    <span className="pr-name">{meta.name}</span>
                    <span className="pr-info">{meta.info}</span>
                    <span className="pr-price">
                      <span className="data">{money(TIER_PRICE[country][t])}</span>
                      <span className="pr-note">tek seferlik</span>
                    </span>
                  </div>

                  <div className="pr-features">
                    {featuresFor(country, t).map((f) => (
                      <Feat key={f.text} f={f} />
                    ))}
                  </div>

                  <div className="pr-foot">
                    <SmartLink
                      href={`/basla?ulke=${country}&paket=${t}`}
                      onClick={() => gtm("package_select", { package: t, country })}
                      className={`btn btn-full ${highlighted ? "btn-primary" : "btn-ghost"}`}
                    >
                      {meta.name} ile başla
                    </SmartLink>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ENTERPRISE — full-width row */}
        <FadeUp delay={0.4}>
          <div className="pr-ent">
            <div>
              <span className="pr-ent-tag">Enterprise</span>
              <h3 className="pr-ent-title">Birden fazla şirket, birden fazla ülke</h3>
              <p className="pr-ent-line">
                Grup yapısı, kadro vizesi ve çoklu ülke operasyonu için paket değil kurgu
                yapıyoruz. Fiyat, yapıya göre çıkarılır.
              </p>
            </div>
            <ul className="pr-ent-points">
              {ENTERPRISE_POINTS.map((e) => (
                <li key={e}>
                  <span className="rm-dot" aria-hidden="true" />
                  {e}
                </li>
              ))}
            </ul>
            <div className="pr-ent-cta">
              <SmartLink
                href={CALENDLY_URL}
                onClick={() => gtm("package_select", { package: "enterprise" })}
                className="btn btn-primary"
              >
                Yapını konuşalım
              </SmartLink>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.48}>
          <p className="pr-foot-note">
            {COUNTRY_NAMES[country]} fiyatları tek seferlik kuruluş bedelidir; yenileme ve
            muhasebe ayrı planlanır. Detay için ücretsiz{" "}
            <SmartLink
              href={CALENDLY_URL}
              onClick={() => gtm("cta_meeting_click", { placement: "packages" })}
            >
              görüşme planlayın.
            </SmartLink>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
