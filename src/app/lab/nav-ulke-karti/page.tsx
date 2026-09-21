import type { Metadata } from "next";

import {
  NavUlkeD1,
  NavUlkeD2,
  NavUlkeD3,
  NavUlkeE1,
  NavUlkeE2,
  NavUlkeE3,
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
  {
    kod: "e1",
    ad: "E1 · D1 + bayrak, daha dikey",
    not: "D1'in aynısı; kart 240 → 300 px (oran 1,17 → 0,93, yani kare olmaktan çıkıyor) ve ülke adının yanında bayrak var. Kart uzayınca panel de 60 px uzuyor.",
    Bilesen: NavUlkeE1,
  },
  {
    kod: "e2",
    ad: "E2 · D1 + D3 karması",
    not: "Silüet kartın tamamını kaplıyor, bayrak + ad + künye onun üstünde. D3'ün beğenilen tarafı bu; beğenilmeyen tarafı — kocaman süre — yok.",
    Bilesen: NavUlkeE2,
  },
  {
    kod: "e3",
    ad: "E3 · Gerçek görsel",
    not: "E2'nin aynısı, zemindeki çizim yerine fotoğraf. Bedeli çizimden fazla: menü her sayfada açılıyor, fotoğrafın tonu kontrol dışında ve “çizimde marka yok” garantisi stok fotoğrafta yok.",
    Bilesen: NavUlkeE3,
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
