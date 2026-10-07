import type { Metadata } from "next";

import TeyitSorular from "@/components/teyit/TeyitSorular";

/* /teyit/kktc — Murat Bey'e açık uçlu sorular (07.10.2026).
   /teyit gibi menüye ve site haritasına bağlı değil, dizine girmiyor.
   Sorular docs/durum.md · 07.10.2026 (17)'deki liste. Cevaplar uygulanınca
   rota silinecek. */

export const metadata: Metadata = {
  title: "KKTC soruları | Ortac Global",
  robots: { index: false, follow: false },
};

export default function TeyitKktcPage() {
  return <TeyitSorular />;
}
