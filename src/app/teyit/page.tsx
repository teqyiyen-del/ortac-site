import type { Metadata } from "next";

import TeyitListesi from "@/components/teyit/TeyitListesi";

/* /teyit — Murat Bey'e sayfa sayfa teyit listesi (23.09.2026).
   Menüye ve site haritasına bağlı DEĞİL, dizine girmiyor: yalnız adresi
   gönderilen kişi açıyor. Gerekçe ve kurgu components/teyit/TeyitListesi.tsx
   başında. İş bitince (cevaplar uygulandığında) rota silinecek. */

export const metadata: Metadata = {
  title: "Teyit listesi | Ortac Global",
  robots: { index: false, follow: false },
};

export default function TeyitPage() {
  return <TeyitListesi />;
}
