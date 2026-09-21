import type { Metadata } from "next";

import {
  NavUlkeD1,
  NavUlkeD2,
  NavUlkeD3,
} from "@/components/lab/NavUlkeKartiAdaylari";
import { COUNTRY_ORDER } from "@/lib/brand";

/* /lab/nav-ulke-karti — navbardaki koyu ülke kartının üç yönü.

   19.09.2026 · Burak: "o kartın tasarımına biraz oynama yapabilir miyiz ya?
   birkaç alternatif görmek istiyorum senden … YAPI, TİPİK SÜRE, KİMLER İÇİN
   kısmı var ya, oralar caps lock olması zaten başlı başına bir sıkıntı. ve
   çok yazılı duruyor gibi."

   Adayların gerekçeleri bileşende (components/lab/NavUlkeKartiAdaylari.tsx).
   Her aday ÜÇ ÜLKENİN ÜÇÜNDE de basılıyor: kart ülkeye göre değişen tek
   parça ve bir tasarım ancak üçünde birden çalışıyorsa çalışıyor. */

export const metadata: Metadata = {
  title: "Navbar ülke kartı · adaylar | Ortac Global",
  robots: { index: false, follow: false },
};

const ADAYLAR = [
  {
    kod: "d1",
    ad: "D1 · Ülkenin kendisi",
    not: "Kartın üstü ülkenin silüeti, altı yalnız ad, tek satır ve buton. Üç künye satırı da düşüyor; dokuz metin parçası dörde iniyor ve büyük harf sorunu yapısal olarak bitiyor.",
    Bilesen: NavUlkeD1,
  },
  {
    kod: "d2",
    ad: "D2 · Tek cümle",
    not: "Künye tahtası kalkıyor, bayrak 32 → 96 px büyüyor ve iki alan tek satırda birleşiyor. “Kimler için” düşüyor — kartın en uzun ve en az okunan satırıydı.",
    Bilesen: NavUlkeD2,
  },
  {
    kod: "d3",
    ad: "D3 · Afiş",
    not: "Zeminde silüet kısık, önünde tek büyük odak. Odak süre; fiyat bilerek yok, menüde fiyat göstermek tasarım değil satış kararı.",
    Bilesen: NavUlkeD3,
  },
];

export default function NavUlkeKartiLab() {
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · navbar ülke kartı</span>
        <h1>Hizmetler panelindeki koyu kart</h1>
        <p>
          Kart bugün 280×240 piksel ve içinde <b>dokuz ayrı metin parçası</b> var; üçü büyük harf.
          Üç aday da etiket/değer tahtasını biçimlendirerek değil <b>kaldırarak</b> çözüyor.
        </p>
        <p>
          Her aday üç ülkede birden basılıyor: kart panelin ülkeye göre değişen tek parçası, ve bir
          tasarım ancak üçünde de çalışıyorsa çalışıyor.
        </p>
      </div>

      {ADAYLAR.map((a) => (
        <section key={a.kod} className="nuk-blok">
          <div className="container-o">
            <p className="nuk-etiket">{a.ad}</p>
            <p className="nuk-not">{a.not}</p>
            <div className="nuk-panel">
              <div className="nuk-sira">
                {COUNTRY_ORDER.map((c) => (
                  <a.Bilesen key={c} c={c} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
