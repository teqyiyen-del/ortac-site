"use client";

/* DUBAİ · ÜÇ SERBEST BÖLGE · TELEFON SÜRÜMÜ: SEKME (08.10.2026)
   Burak: "isterim ki üçünü yan yana göstereyim ama mobil için öyle bir
   format yoktur herhalde … başlığı kaldırarak küçültmek mantıklı değil …
   rakipler mobilde nasıl bir deneyim sunuyor, bak."

   Bakılan dört rakip (Virtuzone, Shuraa, Creative Zone, Meydan FZ; telefon
   genişliğinde ekran görüntüsü, 08.10.2026) üçlü seçeneği iki yoldan
   çözüyor: sekme şeridi (Virtuzone "Why choose") ya da noktalı yana
   kaydırma (Shuraa paketleri, Meydan avantajları). Sekme seçildi çünkü üç
   logo AYNI ANDA ekranda duruyor (Burak'ın istediği "yan yana") ve yana
   kaydırma yok; altında yalnız seçilen bölgenin kartı var, başlığı ve üç
   maddesiyle.

   Masaüstünde üç kart yan yana basılmaya devam ediyor (DubaiEkler); bu
   bileşen yalnız telefon denemesinde görünüyor (.m-mini). İkonlar ve
   logolar sunucudan çizilmiş düğüm olarak geliyor (lucide bileşeni sınırı
   geçemiyor). */

import { useId, useState, type ReactNode } from "react";

export type BolgeSekmeVeri = {
  k: string;
  ad: string;
  kime: string;
  rozet?: string;
  logo: ReactNode;
  maddeler: { ikon: ReactNode; t: string }[];
};

export default function BolgeSekme({ veri }: { veri: BolgeSekmeVeri[] }) {
  const [sec, setSec] = useState(0);
  const uid = useId();
  const b = veri[sec];
  return (
    <div className="bsk">
      <div className="bsk-serit" role="tablist" aria-label="Serbest bölge">
        {veri.map((x, i) => (
          <button
            key={x.k}
            type="button"
            role="tab"
            id={`${uid}-t${i}`}
            aria-selected={i === sec}
            aria-controls={`${uid}-p`}
            data-on={i === sec ? "" : undefined}
            onClick={() => setSec(i)}
          >
            <span className="bsk-logo">{x.logo}</span>
          </button>
        ))}
      </div>
      <div className="bsk-kart" role="tabpanel" id={`${uid}-p`} aria-labelledby={`${uid}-t${sec}`}>
        <div className="bsk-bas">
          <h3>{b.ad}</h3>
          {b.rozet && <span className="dbe-rozet">{b.rozet}</span>}
        </div>
        <p className="bsk-kime">{b.kime}</p>
        <ul className="dbe-liste">
          {b.maddeler.map((m) => (
            <li key={m.t}>
              <span className="dbe-liste-ic">{m.ikon}</span>
              {m.t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
