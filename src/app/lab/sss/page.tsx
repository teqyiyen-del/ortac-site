import type { Metadata } from "next";
import { SssS2 } from "@/components/lab/SssAdaylari";
import HomeFaq from "@/components/home/HomeFaq";
import { Aday } from "../aday";

/* LAB · SSS (25.09.2026). İkinci tur: S1 tam genişlikte canlıda (ana sayfa +
   bütün CountryFaq sayfaları); S3'ün konu sekmeleri blog filtresine taşındı.
   S2 yedek. */
export const metadata: Metadata = { title: "SSS · adaylar | Ortac Global" };

function Baslik() {
  return (
    <div className="sec-head" style={{ marginBottom: 48 }}>
      <h2 className="h2" style={{ color: "var(--text-900)" }}>
        Sık <span className="text-accent">sorulanlar.</span>
      </h2>
    </div>
  );
}

export default function LabSss() {
  return (
    <main>
      <Aday bolum ad="S1 · Canlıda" kunye="tam genişlik açılır kutular; ana sayfa, ülke, hizmet ve sektör sayfaları">
        <HomeFaq />
      </Aday>
      <Aday ad="S2 · Açık kartlar" kunye="yedek; tıklama yok, her soru bir kart" zemin="paper">
        <Baslik />
        <SssS2 />
      </Aday>
    </main>
  );
}
