import type { Metadata } from "next";

import CountryOdeme from "@/components/country/CountryOdeme";
import VergiGrafik, { type VergiGrafikTip } from "@/components/country/VergiGrafik";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* /lab/ingiltere — 23.09.2026. İngiltere sayfasının iki bölümüne üçer hâl.
   Burak: ödeme kanalları için "üç tane varyasyon dene … tam ikna olamadım";
   vergi grafiği için "biraz daha tasarım deneyebilir misin, yine grafik
   muhabbeti olsun." Bileşenler canlıyla ORTAK (CountryOdeme · gorunum,
   VergiGrafik · tip); seçilen hâl yalnız data'da bir alan değiştirerek
   canlıya geçiyor, taşıma yok. Canlıda şimdilik ödeme "akis", vergi "sade". */

export const metadata: Metadata = {
  title: "İngiltere · ödeme ve vergi hâlleri | Ortac Global",
  robots: { index: false, follow: false },
};

const ODEME = [
  ["A", "serit", "Kayan logo şeridi"],
  ["B", "yorunge", "Şirket ortada, kanallar çevresinde"],
  ["C", "akis", "Kümelerden şirkete akış (canlıda)"],
] as const;

const VERGI: [string, VergiGrafikTip, string][] = [
  ["A", "sade", "Sade eğri (canlıda)"],
  ["B", "kaydir", "Kaydırıcılı eğri"],
  ["C", "sutun", "Örnek kârlarda sütun"],
];

export default function IngiltereLab() {
  const c = COUNTRY_CONTENT.ingiltere;
  const odeme = c.odeme!;
  const bant = c.tax.bant!;
  return (
    <main>
      <div className="luk-kunye">
        <span>Ödeme kanalları</span>
        <h2>Üç hâl, aynı dokuz kanal</h2>
      </div>
      {ODEME.map(([harf, g, ad]) => (
        <div key={g}>
          <div className="luk-ulke">
            <b>{harf}</b>
            <span>{ad}</span>
          </div>
          <CountryOdeme data={{ ...odeme, gorunum: g }} country="ingiltere" />
        </div>
      ))}

      <div className="luk-kunye">
        <span>Vergi grafiği</span>
        <h2>Üç hâl, aynı oranlar</h2>
      </div>
      {VERGI.map(([harf, t, ad]) => (
        <div key={t}>
          <div className="luk-ulke">
            <b>{harf}</b>
            <span>{ad}</span>
          </div>
          <div className="container-o" style={{ paddingBottom: 24 }}>
            <VergiGrafik tip={t} baslik={bant.baslik} />
          </div>
        </div>
      ))}
    </main>
  );
}
