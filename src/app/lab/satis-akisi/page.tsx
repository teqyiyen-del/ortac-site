import type { Metadata } from "next";

import SatisAkisiDemo from "@/components/lab/SatisAkisi";

/* /lab/satis-akisi — satış akışının DEMOSU (Dubai).

   İki AKIŞ, tek pencere (05.10.2026): A ülke → paket → bilgiler → teklif →
   ödeme; B aynı dört adım, ödeme yok, teklif kabul edilir. Ödeme hiçbir
   yere bağlı değil; gerekçe, veri kaynağı ve uydurulmayanların listesi
   components/lab/SatisAkisi.tsx'in başında. Müşterinin brifi docs/durum.md'de.
   Canlı sayfalara bağlı değil. */

export const metadata: Metadata = {
  title: "Satış akışı · demo | Ortac Global",
  robots: { index: false, follow: false },
};

export default function SatisAkisiLab() {
  return (
    <main className="sat-lab">
      <div className="sat-kunye">
        <span>Demo · Dubai</span>
        <h1>Kurulumu başlat · iki akış</h1>
        <p>
          A: teklif onaylanınca ödeme aynı pencerede. B: ödeme yok, teklif kabul edilir, gerisi e-posta ve
          panelden. Tutarlar temsilî.
        </p>
      </div>
      <SatisAkisiDemo />
    </main>
  );
}
