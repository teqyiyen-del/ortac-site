import type { Metadata } from "next";

import TeyitSorular2 from "@/components/teyit/TeyitSorular2";

/* /teyit/sorular-2 — Murat Bey'e ikinci tur sorular (10.10.2026). İlk tur /teyit/sorular'da duruyor.
   /teyit gibi menüye ve site haritasına bağlı değil, dizine girmiyor.
   Sorular docs/durum.md · 07.10.2026 (17)'deki liste. Cevaplar uygulanınca
   rota silinecek. */

export const metadata: Metadata = {
  title: "Sorular | Ortac Global",
  robots: { index: false, follow: false },
};

export default function TeyitSorularPage() {
  return <TeyitSorular2 />;
}
