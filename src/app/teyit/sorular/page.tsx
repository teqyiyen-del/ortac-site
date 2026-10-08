import type { Metadata } from "next";

import TeyitSorular from "@/components/teyit/TeyitSorular";

/* /teyit/sorular — Murat Bey'e şıklı ve açık sorular (08.10.2026).
   /teyit gibi menüye ve site haritasına bağlı değil, dizine girmiyor.
   Sorular docs/durum.md · 07.10.2026 (17)'deki liste. Cevaplar uygulanınca
   rota silinecek. */

export const metadata: Metadata = {
  title: "Sorular | Ortac Global",
  robots: { index: false, follow: false },
};

export default function TeyitSorularPage() {
  return <TeyitSorular />;
}
