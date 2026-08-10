"use client";

import { useOrtacStore, type Country } from "@/lib/store";
import { ORDER, PortalPicker, PortalPlate, Vista, useArtId } from "./HeroPortalShell";

/* ============================================================================
   ADAY P2 · "GEÇİT" — PORTAL = İÇİNDEN GEÇİLEN KORİDOR
   CSS: src/app/css/lab-ptl2.css · ad alanı .ptl2-

   ------------------------------------------------------------ PORTAL OKUMASI
   Portal bir yüzey değil bir DERİNLİK. Ekranda tek bir açıklık yok, üst üste
   beş eşik var ve hepsi aynı kaçış noktasına gidiyor; ülke o koridorun
   sonunda duruyor. Yani "bir kapıya bakmak" değil, "bir geçitten geçmek".

   İkinci ve asıl fark: ışık koridorun sonundan ÇIKIP size doğru geliyor.
   Halkalar sırayla, uzaktan yakına yanıyor. Müşterinin "portal kafası"
   dediği şeyin fizik karşılığı bu — bir yerin öbür tarafından bu tarafa
   enerji gelmesi. Hareket sitedeki ortak "aktarım" kalıbıyla kuruluyor
   (css/aktarim.css), yani yeni bir mekanizma yazılmıyor: kalıp zaten
   "bir şeyi oradan oraya taşıma" cümlesi için var.

   ------------------------------------------------------------- NEYİ FEDA EDİYOR
   1) ÜLKE KÜÇÜK KALIYOR. Koridorun sonundaki açıklık sahnenin yaklaşık
      dörtte biri, yani Burj Khalifa burada P1'dekinin üçte biri boyunda.
      Tanınıyor ama "karşınıza çıkmıyor". Üç aday içinde ülkeyi en az
      gösteren bu.
   2) EN SOYUT ADAY. Beş iç içe kemer, bir sokak cephesinden ya da bir
      manzaradan daha az "yer" anlatıyor; sahne bir mekân değil bir diyagram
      gibi de okunabilir.
   3) TABELA KÖŞEYE ÇEKİLİYOR. Koridor sahnenin tamamını kapladığı için levha
      kapının yanında değil, eşiğin bu tarafında duruyor.

   ------------------------------------------------------------- SEÇİNCE NE OLUYOR
   Koridorun sonundaki açıklıkta yeni ülke derinlikten büyüyerek geliyor
   (eskisi geriye çekilip siliniyor), en uzaktaki halkanın kenarı o ülkenin
   ışığına dönüyor ve dalganın taşıdığı renk değişiyor: seçim koridorun
   tamamını yeniden renklendiriyor.

   ------------------------------------------------------------- GEOMETRİ
   Tuval 720 × 360, kaçış noktası (360, 176). Beş halkanın hepsi aynı orandan
   türüyor: k = 1 · 0.74 · 0.545 · 0.40 · 0.295, yarı genişlik 330k, yarı
   yükseklik 168k. Bu yüzden halkaların köşeleri kaçış noktasından çıkan tek
   bir ışın üzerinde duruyor ve zemin çizgileri gerçekten doğru — göz kararı
   perspektif yok, hepsi tek bir orandan çıkıyor.
   ========================================================================= */

/* Halkalar: [yol, konturun kalınlığı]. Sıra YAKINDAN UZAĞA; dalganın sırası
   bunun tersi ve aşağıda ayrıca hesaplanıyor. */
const RINGS: string[] = [
  "M30 344 V176 A330 168 0 0 1 690 176 V344 Z",
  "M115.8 300.3 V176 A244.2 124.3 0 0 1 604.2 176 V300.3 Z",
  "M180.1 267.6 V176 A179.9 91.6 0 0 1 539.9 176 V267.6 Z",
  "M228 243.2 V176 A132 67.2 0 0 1 492 176 V243.2 Z",
  "M262.6 225.6 V176 A97.4 49.6 0 0 1 457.4 176 V225.6 Z",
];

/** En uzaktaki halkanın açıklığı: ülkenin göründüğü pencere. */
const FAR = RINGS[4];

export default function HeroPortalP2() {
  const country = useOrtacStore((s) => s.country);
  const id = useArtId("p2");

  return (
    <div className="ptl">
      <PortalPicker />

      <div className="ptl-stage ptl2-stage ptl-tone" data-c={country} aria-hidden="true">
        {/* akt: fare sahnenin üstündeyken dalga duruyor. Kapı kalıbın
            içinde (aktarim.css), burada yalnızca kabı işaretliyoruz. */}
        <div className="ptl2-art akt">
          <svg viewBox="0 0 720 360" preserveAspectRatio="xMidYMid slice" focusable="false">
            <defs>
              <clipPath id={`${id}c`}>
                <path d={FAR} />
              </clipPath>
              {/* Koridorun sonundaki bloom. Dış durak saydam: hero'nun
                  arkasındaki ızgarayı silen opak bir dikdörtgen bırakmıyor. */}
              <radialGradient id={`${id}g`} cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="var(--pv-s2)" stopOpacity="0.5" />
                <stop offset="0.5" stopColor="var(--pv-s2)" stopOpacity="0.16" />
                <stop offset="1" stopColor="var(--pv-s2)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Bloom halkaların ALTINDA: ışık en altta, nesne en üstte. */}
            <ellipse className="ptl2-bloom" cx="360" cy="176" rx="300" ry="200" fill={`url(#${id}g)`} />

            {/* zemin ışınları ve kilit taşı hattı: halkaların köşelerini ve
                tepelerini kaçış noktasına bağlayan üç saç teli */}
            <path
              className="ptl2-ray"
              d="M30 344 L262.6 225.6 M690 344 L457.4 225.6 M360 8 V126.4"
            />
            {/* kemerin bindiği hiza: kaçış noktası tam o yükseklikte olduğu
                için bu hat perspektifte yatay, eğik değil */}
            <path className="ptl2-ray" d="M30 176 H262.6 M457.4 176 H690" />

            <g clipPath={`url(#${id}c)`}>
              <rect x="255" y="120" width="210" height="112" fill="#090909" />
              {ORDER.map((c) => (
                <g key={c} className="ptl2-world" data-on={c === country}>
                  <g transform="translate(268 128) scale(0.46)">
                    <Vista c={c as Country} id={`${id}${c}`} />
                  </g>
                </g>
              ))}
            </g>

            {/* HALKALAR. Sıra DOM'da yakından uzağa, dalganın sırası tersi:
                --akt-i uzaktakine 0 veriliyor, yani ışık koridorun sonundan
                çıkıp size doğru geliyor. Kalınlık merdiveni derinliği
                taşıyor (yakın kalın, uzak ince). */}
            {RINGS.map((d, i) => (
              <path
                key={d}
                className="ptl2-ring akt-durak"
                data-r={i}
                d={d}
                style={{ "--akt-i": RINGS.length - 1 - i } as React.CSSProperties}
              />
            ))}
          </svg>
        </div>

        <div className="ptl2-plate">
          <PortalPlate c={country} />
        </div>
      </div>
    </div>
  );
}
