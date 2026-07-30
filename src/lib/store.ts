import { create } from "zustand";

export type Country = "dubai" | "ingiltere" | "kktc";
export type Tier = "basic" | "gold" | "platinium";
export type Activity =
  | "e-ticaret"
  | "yazilim"
  | "danismanlik"
  | "gayrimenkul"
  | "saglik"
  | "finans";

export const ACTIVITY_LABELS: Record<Activity, string> = {
  "e-ticaret": "E-ticaret",
  yazilim: "Yazılım / Teknoloji",
  danismanlik: "Danışmanlık",
  gayrimenkul: "Gayrimenkul",
  saglik: "Sağlık",
  finans: "Finans",
};

export const COUNTRY_LABELS: Record<Country, string> = {
  dubai: "Dubai",
  ingiltere: "İngiltere",
  kktc: "KKTC",
};

interface OrtacStore {
  /* hero float cluster + calculator share this slice — single source of truth.
     In-memory only; state travels via URL params (spec NEVER #11). */
  country: Country;
  tier: Tier;
  activity: Activity;
  visas: number;
  bank: boolean;
  accounting: boolean;
  setCountry: (c: Country) => void;
  setTier: (t: Tier) => void;
  setActivity: (a: Activity) => void;
  setVisas: (v: number) => void;
  setBank: (b: boolean) => void;
  setAccounting: (a: boolean) => void;

  /* ui slice — one ⓘ popover open at a time (spec §7) */
  openPopover: string | null;
  setOpenPopover: (id: string | null) => void;
}

export const useOrtacStore = create<OrtacStore>((set) => ({
  country: "dubai", // DEFAULT SELECTION on load (spec §1)
  tier: "gold",
  activity: "e-ticaret",
  visas: 0,
  bank: true,
  accounting: false,
  setCountry: (country) => set({ country }),
  setTier: (tier) => set({ tier }),
  setActivity: (activity) => set({ activity }),
  setVisas: (visas) => set({ visas: Math.min(4, Math.max(0, visas)) }),
  setBank: (bank) => set({ bank }),
  setAccounting: (accounting) => set({ accounting }),

  openPopover: null,
  setOpenPopover: (openPopover) => set({ openPopover }),
}));
