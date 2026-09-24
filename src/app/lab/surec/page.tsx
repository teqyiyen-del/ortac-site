import type { Metadata } from "next";
import { SurecP2, SurecP3 } from "@/components/lab/SurecAdaylari";
import { Aday } from "../aday";

/* LAB · süreç bölümünün sol tarafı (25.09.2026). Veri: Dubai'nin yedi adımı;
   seçilen aday ana sayfaya (ProcessScroll) ve ülke sayfalarına
   (CountryProcess) birlikte taşınır. P1 (büyük satırlar) Burak'ın yorumuyla
   elendi ve bir daha sunulmayacak: "alt alta bir sürü sıralanıyor … çok
   kalabalık." */
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
      <Aday ad="P2 · Yatay ray" kunye="üstte yalnız çubuk ve sayı; seçili adım altta, yanında kart" zemin="paper">
        <Baslik />
        <SurecP2 />
      </Aday>
      <Aday ad="P3 · Tek adım" kunye="solda o anki adım, altında çubuk ve sayı; sağda kart">
        <Baslik />
        <SurecP3 />
      </Aday>
    </main>
  );
}
