import type { Metadata } from "next";

import CountryStructures from "@/components/CountryStructures";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* /lab/yapi-olcu — "Önce yapıyı seçiyoruz" bölümünün ÖLÇÜ turu.

   19.09.2026 · Burak, bir önceki turda canlıya alınan sade hâli gördükten
   sonra: "iyi oldu aslında da harita çok küçük kaldı, o zaman da anlamı
   kalmadı … içerik azalınca aslında haritanın küçük olmasına çok da gerek
   kalmadı. haritayı bir tık daha büyütüp şeyleri biraz kısabilirsin.
   butonların ölçüsünü atıyorum. altındaki açıklama var ya o iki satıra
   düşebilir falan fistan. bir bak ya bir boyutsal bir şeyler dene buraya."

   TURUN SORUSU TEK: HARİTA NE KADAR BÜYÜK OLABİLİR?

   İki sütun aynı yerde bitiyor (kararın kendisi bu), yani harita ancak kart
   sütunu kadar uzayabiliyor. Harita genişledikçe kart sütunu daralıyor, tarif
   iki satıra düşüyor ve kart kendiliğinden uzuyor — ama yetmiyor. Farkı
   KARTIN KENDİ ÖLÇÜSÜ kapatıyor: ikon kutusu, ad puntosu ve dolgu birlikte
   büyüyor. Yani "butonların ölçüsünü büyütmek" ile "haritayı büyütmek" aynı
   kaldıracın iki ucu.

   Üç aday aynı içeriği basıyor; değişen yalnız ölçüler. Sayılar
   css/lab-yapi-olcu.css'te tek tek ölçülerek oturtuldu. */

export const metadata: Metadata = {
  title: "Yapı seçimi · ölçü adayları | Ortac Global",
  robots: { index: false, follow: false },
};

const ADAYLAR = [
  {
    kod: "canli",
    ad: "Bugün · canlıdaki hâli",
    not: "Harita 412 px, kart 140 px, ızgara 316 px. Tarif tek satır. Burak'ın itirazı: harita bu boyda anlamını yitiriyor.",
  },
  {
    kod: "b1",
    ad: "B1 · Harita 441 px",
    not: "En küçük adım. İkon kutusu 44 → 50, ad 20 → 21 px, dolgu 28/24/30 → 32/26/34, kartlar arası 24 → 28. Izgara 316 → 337 px.",
  },
  {
    kod: "b2",
    ad: "B2 · Harita 483 px",
    not: "Orta yol. İkon 56, ad 22 px, dolgu 36/28/38, kartlar arası 30. Izgara 367 px; tarif hâlâ tek satır.",
  },
  {
    kod: "b3",
    ad: "B3 · Harita 580 px",
    not: "En büyük harita — eski tasarımın harita boyuna (589) neredeyse eşit. Kart bir düğme gibi büyüyor: ikon 62, ad 24 px, dolgu 40/30/42, tarif 15 px ve iki satır. Izgara 447 px.",
  },
];

export default function YapiOlcuLab() {
  const yapi = COUNTRY_CONTENT.dubai.structures;
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · ölçü</span>
        <h1>Yapı seçimi: harita ne kadar büyük olabilir?</h1>
        <p>
          İki sütun aynı yerde bitiyor, yani harita ancak <b>kart sütunu kadar</b> uzayabiliyor.
          Haritayı büyütmenin tek yolu kartı büyütmek: ikon kutusu, ad puntosu ve dolgu birlikte
          artıyor, tarif de daralan sütunda iki satıra düşüyor.
        </p>
        <p>
          Üç adayda da içerik birebir aynı — değişen yalnız ölçüler. Alt kenarlar her adayda hizalı
          ve kartın altında boşluk yok; ölçüler tek tek ölçülerek oturtuldu.
        </p>
      </div>

      {ADAYLAR.map((a) => (
        <section key={a.kod} className="lyo-blok">
          <div className="container-o lyo-kunye">
            <p className="lyo-etiket">{a.ad}</p>
            <p className="lyo-not">{a.not}</p>
          </div>
          <div data-olcu={a.kod}>
            {yapi && <CountryStructures data={yapi} id={`yapi-${a.kod}`} />}
          </div>
        </section>
      ))}
    </main>
  );
}
