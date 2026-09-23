import type { Metadata } from "next";

import TipOnerisi from "./TipOnerisi";

/* /lab/tasarim-sistemi — design system (23.09.2026). Şimdilik yalnız
   tipografi önerisi (rehber soru 1-7); kararlar geldikçe renk, boşluk,
   şekil, bileşen blokları aynı sayfada büyüyecek ve sonunda sitenin canlı
   stil rehberine dönüşecek. Denetim: docs/design-system/denetim.md. */

export const metadata: Metadata = {
  title: "Tasarım sistemi · tipografi önerisi | Ortac Global",
  robots: { index: false, follow: false },
};

export default function TasarimSistemiLab() {
  return <TipOnerisi />;
}
