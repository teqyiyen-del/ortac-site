import type { Metadata } from "next";
import { SssS1, SssS2, SssS3 } from "@/components/lab/SssAdaylari";
import { Aday } from "../aday";

/* LAB · SSS, üç aday (25.09.2026). Veri: ana sayfanın altı sorusu.
   Seçilen aday ana sayfaya (HomeFaq) ve ülke/sektör sayfalarına (CountryFaq)
   birlikte taşınır. */
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
      <Aday ad="S1 · Açılır kutular" kunye="sitenin açılır dili; açılan kutu açık maviye dönüyor">
        <Baslik />
        <SssS1 />
      </Aday>
      <Aday ad="S2 · Açık kartlar" kunye="tıklama yok; her soru bir kart, cevap içinde" zemin="paper">
        <Baslik />
        <SssS2 />
      </Aday>
      <Aday ad="S3 · Konu sekmeleri" kunye="dört konu; seçilen konunun soruları cevaplarıyla açık">
        <Baslik />
        <SssS3 />
      </Aday>
    </main>
  );
}
