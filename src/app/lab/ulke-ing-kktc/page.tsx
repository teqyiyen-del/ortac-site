import type { Metadata } from "next";

import UlkeYon from "@/components/lab/UlkeYon";

/* /lab/ulke-ing-kktc — İngiltere ve KKTC ülke sayfalarına aday dört bölüm.
   İki ülke de /dubai ile aynı bileşeni kullanıyor ama üç bölüm onlarda hiç
   basılmıyor. Aday, yazılmış ama basılmayan veriden kuruldu; gerekçeler ve
   uydurulmayanların listesi components/lab/UlkeYon.tsx'in başında.
   Canlı sayfalara bağlı değil. */

export const metadata: Metadata = {
  title: "İngiltere ve KKTC ülke sayfası · aday bölümler | Ortac Global",
  robots: { index: false, follow: false },
};

export default function UlkeIngKktcLab() {
  return (
    <main>
      <div className="luk-kunye">
        <span>Aday YÖN</span>
        <h2>Dubai&apos;de olup burada olmayan bölümler</h2>
        <p>
          Ofis, işin bölüşümü, vergi ve kapsam. Dördü de yazılmış ama hiçbir sayfada basılmayan
          veriden kuruldu; yapı seçimi ve kuruluş sonrası tutarları müşteriden gelmeden açılmıyor.
        </p>
      </div>

      <div className="luk-ulke">
        <b>İngiltere</b>
        <span>bugün 11 bölüm, adayla 14</span>
      </div>
      <UlkeYon country="ingiltere" />

      <div className="luk-ulke">
        <b>KKTC</b>
        <span>bugün 11 bölüm, adayla 14</span>
      </div>
      <UlkeYon country="kktc" />
    </main>
  );
}
