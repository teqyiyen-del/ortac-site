import type { Activity, Country } from "@/lib/store";

/* SWAP:PRICING — every number is a placeholder; must ship with the
   "temsili" disclaimer until client-confirmed. Structure is final. */
export const PRICING = {
  dubai: {
    base: 3900,
    perVisa: 750,
    bank: 600,
    annual: 2100,
    duration: "7–14 iş günü",
    license: "Serbest bölge · Ticari / Teknoloji",
  },
  ingiltere: {
    base: 900,
    perVisa: 0,
    bank: 400,
    annual: 700,
    duration: "3–7 iş günü",
    license: "Ltd · Companies House",
  },
  kktc: {
    base: 1800,
    perVisa: 350,
    bank: 300,
    annual: 900,
    duration: "5–10 iş günü",
    license: "Ltd · yerel tescil",
  },
} as const;

/* SWAP:ACTIVITY_FACTOR — confirm or flatten to 1. */
export const ACTIVITY_FACTOR: Record<Activity, number> = {
  "e-ticaret": 1,
  yazilim: 1,
  danismanlik: 1,
  gayrimenkul: 1.15,
  saglik: 1.15,
  finans: 1.3,
};

export function computeEstimate(s: {
  country: Country;
  activity: Activity;
  visas: number;
  bank: boolean;
}) {
  const p = PRICING[s.country];
  const setup =
    Math.round(
      (p.base * ACTIVITY_FACTOR[s.activity] +
        s.visas * p.perVisa +
        (s.bank ? p.bank : 0)) /
        50,
    ) * 50; // snap to $50
  return {
    setup,
    annual: p.annual,
    duration: p.duration,
    license: p.license,
  };
}

/* SWAP:TIER_PRICE — Dubai comes from the client deck; the other two are derived
   from the numbers above and are NOT client-confirmed yet. */
import type { Tier } from "@/lib/store";

export const TIER_PRICE: Record<Country, Record<Tier, number>> = {
  dubai: { basic: 3900, gold: 5400, platinium: 8200 },
  ingiltere: { basic: 900, gold: 1500, platinium: 2600 },
  kktc: { basic: 1800, gold: 2600, platinium: 4100 },
};

/* what each tier already contains, so an add-on is never charged twice */
export const TIER_INCLUDES: Record<Tier, { bank: boolean; visas: number; accounting: boolean }> = {
  basic: { bank: false, visas: 0, accounting: false },
  gold: { bank: true, visas: 1, accounting: false },
  platinium: { bank: true, visas: 1, accounting: true },
};

export const TIER_META: Record<Tier, { name: string; info: string }> = {
  basic: { name: "Basic", info: "Kuruluş + lisans" },
  gold: { name: "Gold", info: "Kuruluş + banka + vize" },
  platinium: { name: "Platinium", info: "Uçtan uca + VIP" },
};

export type ConfigLine = { label: string; amount: number; base?: boolean };

export function configure(s: {
  country: Country;
  tier: Tier;
  activity: Activity;
  visas: number;
  bank: boolean;
  accounting: boolean;
}) {
  const p = PRICING[s.country];
  const inc = TIER_INCLUDES[s.tier];
  const factor = ACTIVITY_FACTOR[s.activity];

  const snap = (n: number) => Math.round(n / 50) * 50;
  const lines: ConfigLine[] = [
    { label: `${TIER_META[s.tier].name} paketi`, amount: snap(TIER_PRICE[s.country][s.tier] * factor), base: true },
  ];

  /* only bill what the tier does not already cover */
  const extraVisas = Math.max(0, s.visas - inc.visas);
  if (extraVisas > 0 && p.perVisa > 0)
    lines.push({ label: `Ek vize (${extraVisas})`, amount: extraVisas * p.perVisa });
  if (s.bank && !inc.bank) lines.push({ label: "Banka hesabı desteği", amount: p.bank });
  if (s.accounting && !inc.accounting) lines.push({ label: "Yıllık muhasebe", amount: p.annual });

  return {
    lines,
    total: lines.reduce((a, l) => a + l.amount, 0),
    annual: p.annual,
    duration: p.duration,
    license: p.license,
    perVisa: p.perVisa,
    includes: inc,
  };
}
