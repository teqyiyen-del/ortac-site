import type { Metadata } from "next";
import OnceSonra from "./OnceSonra";

/* LAB · /lab/mobil (08.10.2026). Telefonda uzun kalan bölümler için önce /
   sonra: ekran ikiye bölünüyor, iki taraf birlikte kayıyor (OnceSonra.tsx).
   "Sonra" hâli css/mobil-deneme.css'te, yalnız ?mobil=yeni ile açılıyor. */
export const metadata: Metadata = { title: "Telefon · önce ve sonra | Ortac Global", robots: { index: false } };

export default function LabMobil() {
  return <OnceSonra />;
}
