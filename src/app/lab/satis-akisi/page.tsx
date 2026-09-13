import type { Metadata } from "next";

import SatisAkisiDemo from "@/components/lab/SatisAkisi";

/* /lab/satis-akisi — satış akışının DEMOSU (Dubai).

   İki giriş (her yerdeki "Kurulumu Başlat" · fiyatlardaki "Hemen başla") tek
   pencereyi açıyor: ülke → paket → bilgiler → teklif → ödeme. Ödeme hiçbir
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
        <h1>Kurulumu başlat · teklif · ödeme</h1>
        <p>
          İki giriş aynı pencereyi açıyor. Fiyatlar pakette tanımlı temsilî tutarlar; ödeme hiçbir yere
          bağlı değil.
        </p>
      </div>
      <SatisAkisiDemo />
    </main>
  );
}
