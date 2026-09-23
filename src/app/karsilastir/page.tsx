import type { Metadata } from "next";

import Karsilastir from "./Karsilastir";

/* /karsilastir — design system önce/sonra (23.09.2026). Burak: "before after
   olarak at … ayrı bir yer aç, oranın içinde sun … anlatma, göster." Gerçek
   sayfa iframe'de canlı; düğmeler main'deki data-ds özniteliğini değiştiriyor
   (css/ds-deneme.css). Menüye bağlı değil, dizine girmiyor; karar verilince
   silinecek. */

export const metadata: Metadata = {
  title: "Önce / sonra | Ortac Global",
  robots: { index: false, follow: false },
};

export default function KarsilastirPage() {
  return <Karsilastir />;
}
