"use client";

import { useOrtacStore, type Country } from "@/lib/store";
import { PortalPicker, PortalPlate, useArtId } from "./HeroPortalShell";

/* ============================================================================
   ADAY P3 · "AŞAN" — PORTAL = ÜLKENİN GEÇTİĞİ SINIR
   CSS: src/app/css/lab-ptl3.css · ad alanı .ptl3-

   ------------------------------------------------------------ PORTAL OKUMASI
   Portal ne bakılan bir pencere ne de girilen bir koridor: bir SINIR. Zemine
   oturmuş bir halka var, içi seçilen ülkenin göğüyle dolu, ve o ülkenin kendi
   kütlesi halkayı KIRIP bu tarafa geçiyor.

   Sınırın iki tarafı aynı nesneyi iki ayrı biçimde gösteriyor ve fikrin
   tamamı burada: halkanın İÇİNDE kalan parça ışığa karşı düz bir siluet,
   DIŞINA taşan parça ise bizim karanlığımızda duran, yalnızca kenarı ışık
   almış bir kütle. Tek bir çizim, iki dünya. "Portal" kelimesinin en dolaysız
   görsel karşılığı bu: bir şeyin sınırı geçtiği an.

   ÜÇ ÜLKE ÜÇ AYRI YÖNDEN GEÇİYOR — ve bu bir süs değil, ülkelerin kendi
   biçimi:
     Dubai      DİKEY. Burj Khalifa halkanın tepesini delip yukarı çıkıyor.
     İngiltere  YATAY. Tower Bridge'in tabliyesi iki yandan birden dışarı
                uzanıyor; kuleler içeride kalıyor.
     KKTC       ALÇAK VE GENİŞ. Beşparmak sırtı halkanın iki yanından taşıp
                ufka devam ediyor; içeride kalan yarısı halkanın alt yarısını
                dolduruyor.
   Yani seçim yalnızca resmi değil, sahnenin SİLUETİNİ değiştiriyor.

   ------------------------------------------------------------- NEYİ FEDA EDİYOR
   1) ÇERÇEVENİN BÜTÜNLÜĞÜ GİDİYOR. P1'in "kasa hiç kıpırdamıyor" disiplini
      burada yok: halkanın sınırı her ülkede başka bir yerden kırılıyor.
      Kazanç dramatik, bedeli sakinlik.
   2) MİMARİ EŞİK YOK. Bu portal bir kapı değil bir halka, yani sahnede
      "şirketinizin kapısı" okuması kayboluyor — bugünkü hero'nun en somut
      cümlesi buydu. Yerine gelen şey daha soyut ve daha grafik.
   3) DİKEY YER İSTİYOR. Kule halkanın üstüne çıktığı için sahne kısaldığında
      (kısa dizüstü ekranı) en çok bu aday sıkışıyor.

   ------------------------------------------------------------- SEÇİNCE NE OLUYOR
   Halkanın içindeki gökyüzü o ülkenin ışığına dönüyor, kenarını dolaşan
   parlak yay ve zemindeki ışık havuzu aynı renge geçiyor, ve sınırı aşan
   kütle komple değişiyor: yukarı çıkan bir kule, iki yana uzanan bir köprü,
   ya da yayılan bir dağ sırtı.

   ------------------------------------------------------------- GEOMETRİ
   Tuval 400 × 330. Halka merkezi (200, 190), yarıçap 106; alt noktası tam
   zemin çizgisinde (y=296), yani halka havada durmuyor, yere basıyor.
   Kütlelerin tabanı da 296: üç ülkede de aynı zemin.
   ========================================================================= */

const CX = 200;
const CY = 190;
const R = 106;

/* Kütleler DOLGU VE KONTUR TAŞIMIYOR — bilerek. Her biri iki kez basılıyor
   (bir kez halkanın içine kırpılmış, bir kez dışına maskelenmiş) ve iki
   basımın rengi farklı. fill/stroke miras alınabilir özellikler olduğu için
   renk çağıran GRUPTA duruyor; şeklin kendisi rengini hiç bilmiyor. */

/* DUBAI — kademeli daralan gövde ve uzun iğne. Yarı genişlikler tabanda 36,
   sonra 29 / 23.5 / 18 / 13 / 8.5 / 5 / 1.8: her kademe bir öncekinin
   yaklaşık %78'i. Halkanın tepesi y=84 ve kule oradan 8.5 birim yarı
   genişlikle geçiyor, yani sınırı ince yerinden deliyor. */
const MASS_DUBAI = (
  <path d="M164 296 V246 H171 V205 H176.5 V169 H182 V133 H187 V99 H191.5 V69 H195 V50 H198.2 V30 H201.8 V50 H205 V69 H208.5 V99 H213 V133 H218 V169 H223.5 V205 H229 V246 H236 V296 Z" />
);

/* İNGİLTERE — iki kule içeride (tepeleri y=112, halkanın o hizadaki
   açıklığının içinde), tabliye y=236..258 bandında iki yandan dışarı
   çıkıyor. Halka o yükseklikte x 106..294 arasında, yani tabliye her iki
   yanda yaklaşık 85 birim taşıyor. Bant ilk yazımda 14 birimdi ve ekranda
   kalınlığı konturuyla aynı kalıyordu, yani dolu bir kütle değil bir çizgi
   gibi okunuyordu; 22 birimde içi görünüyor. Sınırı yatay kesen tek aday parçası bu. */
const MASS_UK = (
  <>
    <path d="M20 236 H380 V258 H20 Z" />
    <path d="M48 258 H68 L72 296 H44 Z" />
    <path d="M332 258 H352 L356 296 H328 Z" />
    <path d="M130 258 H182 V296 H130 Z" />
    <path d="M218 258 H270 V296 H218 Z" />
    <path d="M138 168 H174 V262 H138 Z" />
    <path d="M226 168 H262 V262 H226 Z" />
    <path d="M131 168 L154 118 L155 112 L156 118 L179 168 Z" />
    <path d="M219 168 L242 118 L243 112 L244 118 L267 168 Z" />
    <path d="M174 172 H226 V190 H174 Z" />
    <path d="M174 196 H226 V204 H174 Z" />
  </>
);

/* KKTC — beş tepe (x = 58 · 128 · 206 · 284 · 356), ortadaki en yüksek.
   Sırt halkanın iki yanından taşıp kadrajın dışına çıkıyor: ada ufku
   çerçevede bitmiyor.

   GİRNE KALESİ BURADA YOK VE OLMAYACAK. İlk yazımda vardı, halkanın içine
   çizildi ve EKRANDA HİÇ GÖRÜNMEDİ: bu adayda sınırın içi düz siluet, yani
   sırt ile kale aynı tek renk. Sırtın dolgusu zemine kadar indiği için kale
   onun içinde kayboluyordu. Renk vermek çözüm değil — "içeride düz siluet"
   bu adayın tek kuralı ve onu bozarsa fikir gider.

   Doğru cevap kuralı kabul etmek: BU ADAYDA ÜLKE BAŞINA TEK KÜTLE VAR.
   Sınırı aşan şeyin okunması için tek bir okunur siluet gerekiyor; Dubai'de
   kule, İngiltere'de köprü, KKTC'de sırt. Kale kayıp değil, P1 ve P2'de
   duruyor — orada derinlik katmanları var ve mürekkep merdiveni onu sırttan
   ayırıyor. */
const MASS_KKTC = (
  <path d="M-12 296 V232 L26 216 L58 176 L92 206 L128 158 L166 200 L206 150 L246 194 L284 164 L322 206 L356 190 L412 214 V296 Z" />
);

const MASS: Record<Country, React.ReactNode> = {
  dubai: MASS_DUBAI,
  ingiltere: MASS_UK,
  kktc: MASS_KKTC,
};

export default function HeroPortalP3() {
  const country = useOrtacStore((s) => s.country);
  const id = useArtId("p3");

  return (
    <div className="ptl">
      <PortalPicker />

      <div className="ptl-stage ptl3-stage ptl-tone" data-c={country} aria-hidden="true">
        <div className="ptl3-art ptl-center">
          <svg viewBox="0 0 400 330" preserveAspectRatio="xMidYMid meet" focusable="false">
            <defs>
              {/* Halkanın içi: aynı ülkenin göğü, aynı duraklarla. Kapı
                  ışığının ve manzara göğünün ortak paleti — yeni renk
                  üretilmiyor, var olan ışık okunuyor. */}
              <linearGradient
                id={`${id}l`}
                gradientUnits="userSpaceOnUse"
                x1="200"
                y1="84"
                x2="200"
                y2="296"
              >
                <stop offset="0" stopColor="var(--pv-s0)" />
                <stop offset="0.5" stopColor="var(--pv-s1)" />
                <stop offset="0.82" stopColor="var(--pv-s2)" />
                <stop offset="1" stopColor="var(--pv-s3)" />
              </linearGradient>

              <radialGradient id={`${id}p`} cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="var(--pv-s2)" stopOpacity="0.62" />
                <stop offset="1" stopColor="var(--pv-s2)" stopOpacity="0" />
              </radialGradient>

              <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#1c1c1c" stopOpacity="0" />
                <stop offset="0.5" stopColor="#2f2f2f" />
                <stop offset="1" stopColor="#1c1c1c" stopOpacity="0" />
              </linearGradient>

              <clipPath id={`${id}in`}>
                <circle cx={CX} cy={CY} r={R} />
              </clipPath>

              {/* Halkanın DIŞI. Maske, ikinci bir clipPath ile yapılamaz:
                  kırpma yolları birleşiyor, çıkarılmıyor. Beyaz dikdörtgen
                  eksi siyah daire tam olarak "her yer, daire hariç". */}
              <mask id={`${id}out`}>
                <rect x="-30" y="-30" width="460" height="390" fill="#ffffff" />
                <circle cx={CX} cy={CY} r={R} fill="#000000" />
              </mask>

              {/* Kütle bir kez tanımlanıyor, iki kez basılıyor. Aynı yolu iki
                  yere elle yazmak, birini değiştirip ötekini unutmak demekti;
                  o zaman sınırın iki tarafı birbirini tutmazdı. */}
              <g id={`${id}m`}>{MASS[country]}</g>
            </defs>

            {/* ---- halkanın içi: ülkenin göğü ---- */}
            <circle className="ptl3-light" cx={CX} cy={CY} r={R} fill={`url(#${id}l)`} />

            {/* içeride kalan parça: ışığa karşı düz siluet */}
            <g className="ptl3-in" clipPath={`url(#${id}in)`}>
              <use href={`#${id}m`} />
            </g>

            {/* ---- halkanın kendisi ---- */}
            <circle className="ptl3-band" cx={CX} cy={CY} r={R} />
            <circle className="ptl3-hair" cx={CX} cy={CY} r={R + 8} />

            {/* Kenarı dolaşan parlak yay: halkanın "yüklü" olduğunu söyleyen
                tek şey. 56 derecelik bir parça, uçları r=106 çemberinde. */}
            <path className="ptl3-sweep" d="M150.2 96.4 A106 106 0 0 1 249.8 96.4" />

            {/* dışarı taşan parça: bizim karanlığımızda, yalnız kenarı ışıklı.
                Sınırın hemen dışında halkanın önünde durduğu için halkadan
                SONRA basılıyor. */}
            <g className="ptl3-out" mask={`url(#${id}out)`}>
              <use href={`#${id}m`} />
            </g>

            {/* İğnenin ucundaki uyarı ışığı: yalnız Dubai'de, çünkü yalnız
                orada gerçek. Kütlenin tanımının dışında, zira o grup rengini
                iki ayrı yerden miras alıyor ve bu nokta ikisine de uymuyor. */}
            {country === "dubai" ? (
              <circle className="ptl-v-beacon" cx="200" cy="30" r="3.2" />
            ) : null}

            {/* ---- zemin ---- */}
            <ellipse className="ptl3-pool" cx="200" cy="300" rx="176" ry="24" fill={`url(#${id}p)`} />
            <rect x="0" y="295.3" width="400" height="1.4" fill={`url(#${id}f)`} />
          </svg>
        </div>

        <PortalPlate c={country} />
      </div>
    </div>
  );
}
