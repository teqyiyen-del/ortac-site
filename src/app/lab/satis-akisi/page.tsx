import type { Metadata } from "next";

import SatisAkisiDemo from "@/components/lab/SatisAkisi";

/* /lab/satis-akisi — satış akışının DEMOSU (Dubai).

   İki AKIŞ, tek pencere (05.10.2026): A ülke → paket → bilgiler → teklif →
   ödeme; B aynı dört adım, ödeme yok, teklif kabul edilir. Ödeme hiçbir
   yere bağlı değil; gerekçe, veri kaynağı ve uydurulmayanların listesi
   components/lab/SatisAkisi.tsx'in başında. Müşterinin brifi docs/durum.md'de.
   06.10.2026: tek akış kaldı (ödemesiz, son adım "Özet", sonra panel).
   Canlı sayfalara bağlı değil. */

export const metadata: Metadata = {
  title: "Satış akışı · demo | Ortac Global",
  robots: { index: false, follow: false },
};

export default function SatisAkisiLab() {
  return (
    <main id="icerik" className="sat-lab">
      <div className="sat-kunye">
        <span>Demo · Dubai</span>
        <h1>Kurulumu başlat</h1>
        <p>
          Ödeme yok: ülke, paket, bilgiler, özet; sonra müşteri paneline geçiş. Tutarlar temsilî.
        </p>
      </div>
      <SatisAkisiDemo />
    </main>
  );
}
