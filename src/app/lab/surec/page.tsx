import type { Metadata } from "next";
import { SurecP1, SurecP2, SurecP3 } from "@/components/lab/SurecAdaylari";
import { Aday } from "../aday";

/* LAB · süreç bölümünün sol tarafı, üç aday (25.09.2026). Veri: Dubai'nin
   yedi adımı; seçilen aday ana sayfaya (ProcessScroll) ve ülke sayfalarına
   (CountryProcess) birlikte taşınır. */
export const metadata: Metadata = { title: "Süreç · adaylar | Ortac Global" };

function Baslik() {
  return (
    <div className="sec-head" style={{ marginBottom: 48 }}>
      <h2 className="h2" style={{ color: "var(--text-900)" }}>
        Dubai&apos;de süreç, <span className="text-accent">adım adım.</span>
      </h2>
      <p className="sec-lead">Her adımda sorumluluğun kimde olduğu yazıyor; tıklandığında akış durur.</p>
    </div>
  );
}

export default function LabSurec() {
  return (
    <main>
      <Aday ad="P1 · Büyük satır" kunye="her adım kendi kutusu; seçili olan açılıp cümlesini gösteriyor">
        <Baslik />
        <SurecP1 />
      </Aday>
      <Aday ad="P2 · Yatay ray" kunye="adımlar tam genişlikte, seçili adım altta büyük" zemin="paper">
        <Baslik />
        <SurecP2 />
      </Aday>
      <Aday ad="P3 · Tek büyük adım" kunye="o anki adım büyük, altında yedi parçalı ilerleme">
        <Baslik />
        <SurecP3 />
      </Aday>
    </main>
  );
}
