"use client";

import { useOrtacStore, type Country } from "@/lib/store";
import { ORDER, PortalPicker, PortalPlate, Vista, useArtId } from "./HeroPortalShell";

/* ============================================================================
   ADAY P1 · "EŞİK" — PORTAL = İÇİNDEN BAKILAN AÇIKLIK
   CSS: src/app/css/lab-ptl1.css · ad alanı .ptl1-

   ------------------------------------------------------------ PORTAL OKUMASI
   Kapı tek ve hiç değişmiyor. Siz kıpırdamıyorsunuz, kapı kıpırdamıyor;
   ARKASINDAKİ ÜLKE değişiyor. Portal burada bir pencere: eşiğin bu tarafı
   sizin bulunduğunuz karanlık oda, öbür tarafı seçtiğiniz ülkenin göğü.

   Bugünkü hero'dan farkı tam da bu. Bugün duvar yatayda kayıp seçili kapıyı
   ortaya alıyor ve ülke, kapının IŞIK RENGİYLE anlatılıyor. Burada kapı sabit,
   ülke kendi biçimiyle geliyor: Dubai seçilince açıklıkta Burj Khalifa
   duruyor, İngiltere'de Tower Bridge, KKTC'de Beşparmak sırtı ve Girne kalesi.
   Müşterinin cümlesinin en birebir karşılığı bu aday.

   ------------------------------------------------------------- NEYİ FEDA EDİYOR
   1) ÜÇ KAPILI SOKAK GİDİYOR. Bugünkü sahnenin "seçilmeyen ülkeler de orada,
      sönük duruyor" bilgisi kayboluyor: ekranda tek bir açıklık var, diğer iki
      ülke yalnızca seçicide görünüyor.
   2) SİLUET KLİŞESİNE BİLEREK GİRİYOR. Bugünkü sahnenin yazılı kararlarından
      biri "şehir silueti elendi, bu sektörde Burj Khalifa küreden bile çok
      kullanılıyor" idi. Bu aday o kararı tersine çeviriyor, çünkü müşterinin
      isteği tam olarak o. Karşılığında kazanılan şey tanınma hızı: açıklıkta
      ne olduğu tek bakışta, okumadan anlaşılıyor.
   3) KAYMA HAREKETİ GİDİYOR. Bugün seçim bir kayma ile okunuyor; burada geçiş
      bir erime. Daha sakin, ama daha az "mekanik".

   ------------------------------------------------------------- SEÇİNCE NE OLUYOR
   Açıklık bir an kararıyor (eşiğin kendi nefesi), giden ülke seçim yönüne
   doğru bir tık kayarak siliniyor, gelen ülke karşı yönden yerine oturuyor.
   Kapı çerçevesi, eşik taşı ve zemin çizgisi hiç kıpırdamıyor; değişen tek
   şey açıklığın içi, eşikten dışarı taşan ışığın rengi ve tabela.

   ------------------------------------------------------------- GEOMETRİ
   Tuval 360 × 330. Zemin çizgisi y=300. Açıklık x 40..320, kemerin bindiği
   hiza y=170, tepesi y=30 (yarıçap 140, yani tam yarım daire). Kasa dışı
   yarıçap 166, iç sıva pahı 126; kemer taşlarının derzleri bu iki yay
   arasında ve hepsi (180,170) merkezli gerçek yarıçaplarda — göz kararı tek
   koordinat yok.
   ========================================================================= */

/* Açıklığın konturu. Tek bir dize hem kırpma maskesi, hem ışık kenarı, hem de
   zemine taşan huzmenin ağzı: üçü ayrı yazılsaydı biri değiştiğinde ötekiler
   sessizce kayardı. */
const OPEN = "M40 300 V170 A140 140 0 0 1 320 170 V300 Z";

export default function HeroPortalP1() {
  const country = useOrtacStore((s) => s.country);
  const id = useArtId("p1");
  const index = ORDER.indexOf(country);

  return (
    <div className="ptl">
      <PortalPicker />

      {/* data-c sahnenin kökünde: ülke paleti (--pv-*) buradan aşağı miras
          kalıyor, yani eşiğin ışığı ve tabelanın rengi seçili ülkeyi okuyor.
          Açıklığın içindeki üç dünyanın her biri kendi data-c'siyle bu mirası
          yerel olarak eziyor — geçiş sırasında iki ülke aynı anda ekrandayken
          ikisi de kendi göğünü taşısın diye. */}
      <div className="ptl-stage ptl1-stage ptl-tone" data-c={country} aria-hidden="true">
        <div className="ptl1-art ptl-center">
          <svg viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet" focusable="false">
            <defs>
              <clipPath id={`${id}c`}>
                <path d={OPEN} />
              </clipPath>
              {/* Eşikten dışarı taşan huzme. Dış durak SAYDAM, opak siyah
                  değil: hero'nun arkasında bir ızgara var ve opak bir durak
                  onu silen bir dikdörtgen bırakır (canlı sahnede yaşandı). */}
              <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--pv-s2)" stopOpacity="0.62" />
                <stop offset="1" stopColor="var(--pv-s2)" stopOpacity="0" />
              </linearGradient>
              {/* Zemin çizgisi iki ucunda sönüyor: sahnenin kenarında
                  kesilmiyor, bitiyor. */}
              <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#1c1c1c" stopOpacity="0" />
                <stop offset="0.5" stopColor="#2f2f2f" />
                <stop offset="1" stopColor="#1c1c1c" stopOpacity="0" />
              </linearGradient>
            </defs>

            <g clipPath={`url(#${id}c)`}>
              {/* Dünyalar arası boşlukta görünen kare. Geçişin ortasında
                  açıklık bir an bu koyuluğa iniyor ve o kararma sahnenin
                  ritminin parçası: kapı bir an kapanıp başka bir yere açılıyor
                  gibi okunuyor. */}
              <rect x="40" y="20" width="280" height="290" fill="#090909" />

              {ORDER.map((c, i) => (
                <g
                  key={c}
                  className="ptl1-world"
                  data-on={c === country}
                  /* Kayma yönü seçim yönünden: giden ülke, gelenin geldiği
                     yönün TERSİNE çıkıyor. Tek bir sayı (sıra farkı) bunu
                     hem yön hem mesafe olarak veriyor. */
                  style={{ "--ptl1-d": i - index } as React.CSSProperties}
                >
                  {/* Ölçek 1.09: kulenin tepesi kemerin altında yaklaşık 50
                      birim boşluk bırakacak kadar büyük, tuvalin yanları ise
                      açıklıktan geniş kalacak kadar — yani hiçbir kadrajda
                      gökyüzü bitmiyor. */}
                  <g transform="translate(-38 74) scale(1.09)">
                    <Vista c={c as Country} id={`${id}${c}`} />
                  </g>
                </g>
              ))}
            </g>

            {/* Işığın kasaya vurduğu kenar: açıklığa derinlik veren tek çizgi
                ve ülkenin ışığını alan tek çerçeve parçası. */}
            <path className="ptl1-rim" d={OPEN} />

            {/* ---- DEĞİŞMEYEN KASA ---- */}
            <g className="ptl1-frame">
              <path className="ptl1-ln" d="M14 300 V170 A166 166 0 0 1 346 170 V300" />
              <path className="ptl1-hr" d="M54 300 V170 A126 126 0 0 1 306 170 V300" />
              {/* kemerin bindiği hizayı işaretleyen iki kısa çıkma */}
              <path className="ptl1-hr" d="M22 170 H38 M322 170 H338" />
              {/* Kemer taşlarının derzleri. Uçlar (180,170) merkezli r=140 ve
                  r=166 çemberlerinde, 20°/45°/70° ve aynalarında. */}
              <path
                className="ptl1-hr"
                d="M311.6 122.1 L335 113.2 M279 71 L297.4 52.6 M227.9 38.4 L236.8 14 M132.1 38.4 L123.2 14 M81 71 L62.6 52.6 M48.4 122.1 L25 113.2"
              />
            </g>
            {/* kilit taşı: kemeri kapatan tek dolu parça */}
            <path className="ptl1-key" d="M166 8 H194 L188 34 H172 Z" />

            {/* ---- EŞİK ---- */}
            <path className="ptl1-spill" d="M40 300 H320 L392 330 H-32 Z" fill={`url(#${id}s)`} />
            <rect x="-20" y="299.4" width="400" height="1.4" fill={`url(#${id}f)`} />
          </svg>
        </div>

        <PortalPlate c={country} />
      </div>
    </div>
  );
}
