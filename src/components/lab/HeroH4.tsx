"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";

/* ============================================================================
   DUBAI HERO KARTI — ADAY H4 · "YER"
   ---------------------------------------------------------------------------
   ÖNCE MUHAKEME, SONRA KOD. Bu blok kartın neden böyle olduğunu anlatıyor;
   silinirse kartın gerekçesi de silinir.

   1) BU SAYFAYA KİM GELİYOR?
   Çoğunlukla Türkiye'den, "Dubai'de şirket" fikrini bir yerden duymuş ama
   henüz karar vermemiş biri. Kafasındaki iki şey birbiriyle çelişiyor: bir
   yandan "vergi yok" diye duyduğu bir vaat, öbür yandan "orası paravan şirket
   ülkesi, ben oraya niye gideyim, oradan nasıl iş yaparım" diye içten içe
   sorduğu bir şüphe. Fiyat, süreç, banka, vergi — bunların hiçbirini daha
   sormuyor. Önce şunu soruyor: BURASI BENİM İÇİN GERÇEK BİR YER Mİ?

   2) ÜÇ SANİYEDE NE VERMEK İSTİYORUZ?
   Bilgi değil, konum duygusu. Ziyaretçi karta baktığında tek bir şey almalı:
   "Dubai benim dünyamın ortasında bir yer, uzak bir kaçış adresi değil."
   Bunu cümleyle söylersek iddia olur ve kimse inanmaz; ÇİZİMLE gösterirsek
   ölçü olur, kendi gözüyle doğrular. O yüzden kartın yükünü metin değil
   geometri taşıyor: dört şehir, gerçek boylamlarına ve gerçek uçuş
   sürelerine göre yerleştirilmiş.

   3) BU KART HANGİ SORUYU KAPATIYOR — VE AŞAĞIDA ZATEN VAR MI?
   Sayfanın aşağısını taradım: CountryStructures (serbest bölge/mainland),
   CountryPros (%0 vergi, banka, tahsilat, oturum), CountryOrtac, CountryTax,
   MoneyHome, CountryPricing, CountryProcess, CountryDocs, CountryFit,
   CountryFaq. Yani vergi, banka, tahsilat, vize, yapı, fiyat, süre, evrak —
   HEPSİ aşağıda var. Aşağıda OLMAYAN tek şey Dubai'nin NEREDE durduğu ve
   bunun operasyonel karşılığı. Sayfanın tamamı Dubai'yi bir MEVZUAT olarak
   anlatıyor; hiçbir yeri Dubai'yi bir YER olarak anlatmıyor. Hero'nun işi bu.

   Üstelik bu, sayfanın kendi dürüst kısıtını da karşılıyor: sol sütun ve
   FACTS.dubai.limit "vize ve biyometri için BAE'ye gelmek gerekiyor" diyor,
   yani sayfanın tek fiziksel sürtünmesi "oraya gitmek". Kart o sürtünmenin
   ölçüsünü veriyor: İstanbul dört buçuk saat, saat farkı bir. Gitmek büyük
   bir iş değil — ve gittikten sonra da mesai gününüz değişmiyor.

   NEDEN YELPAZE, NEDEN KÜRE DEĞİL
   Küre (cobe / SvgGlobe) zaten ana sayfanın hero'sunda var; burada
   tekrarlamak hem kendini kopyalamak hem de "süs" olmak olurdu. Ayrıca küre
   MESAFEYİ okutmuyor — döndükçe ölçek kaybolur. Yelpaze bunun tersi: ufuk
   çizgisinin üstünde duran yarım daire, yarıçapı doğrudan UÇUŞ SÜRESİ.
   Ziyaretçi "Londra ile Singapur neredeyse aynı halkada" ilişkisini tek
   bakışta görüyor — Dubai'nin hub olma iddiasının kanıtı tam olarak bu.

   GEOMETRİ GERÇEK (uydurma yok)
   - Yarıçap = tipik nonstop blok süresi, doğrusal ölçek: r = saat * 30px,
     8 saatlik halka 240px. Yani halkalar ölçekli, süsleme değil.
   - Açı = Dubai'ye göre BOYLAM FARKI, okunurluk için 1,3 ile çarpılmış.
     Yarıçap ölçekli, açı sıralı (batı solda, doğu sağda). Bu bilinçli bir
     kartografik takas: kritik bilgi mesafe, yön ise sadece "hangi tarafta".
   - Boylam farkları (Dubai 55,36°D): Londra -55,5 · İstanbul -26,4 ·
     Mumbai +17,5 · Singapur +48,5.

   RENK SÖZLEŞMESİ — üç renk, üçünün de anlamı var
   - BEYAZ = "burası": yalnızca Dubai işaretçisi ve İstanbul etiketi. Brief'in
     "beyaz sadece aksan" kuralı ile birebir; kartta beyaz iki yerde geçiyor.
   - MAVİ (--blue-700) = "siz": İstanbul teli ve noktası. Ziyaretçinin kendi
     konumu tek renkli ilişki çizgisiyle merkeze bağlı.
   - GRİ = geri kalan dünya. Referans, konu değil.
   Koyu zeminde alfa yok; bütün tonlar opak hex (globals.css sonundaki
   .stp[data-dark] bloklarının gerekçesiyle aynı sebep).

   METİN BÜTÇESİ — tam 8 satır, hiçbiri cümle değil (biri hariç)
     1  başlık şeridi: "Dubai" + "GMT+4 · Türkiye +1 sa"
     2  Londra
     3  İstanbul · 4,5 sa
     4  Mumbai
     5  Singapur
     6  4 saat   (ölçek)
     7  8 saat   (ölçek)
     8  alt satır: tek cümlelik çıkarım
   Şehirlerden yalnızca İstanbul kendi sayısını taşıyor, çünkü okuyucunun
   referans noktası o. Diğer üçünün mesafesini halkalar zaten söylüyor —
   dördüne birden sayı yazmak kartı tabloya çevirirdi.

   STANCE_LIMITS
   Kartta gün sayısı, fiyat, banka onayı, vergi vaadi YOK. Yalnızca uçuş
   süresi ve saat dilimi var; ikisi de kamuya açık, bize bağlı olmayan
   veriler — taahhüt değil.

   MOBİL: <768px gizli (brief). Masaüstünde tipik genişlik 520-620px.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Yelpaze düzlemi. Merkez ufuk çizgisinin ortasında; yarım daire yukarı
   bakıyor. viewBox 600x294: üstteki 262px yelpaze, alttaki 32px ölçek şeridi.
   Çizim düzlemi 600x294 kuruluyor ama viewBox onun üst 44px'ini KESİYOR
   (bkz. VIEW). Sebep: dört şehir yarım dairenin alt yarısında toplanıyor —
   Dubai'nin kendi boylamında bir şehir olmadığı için kubbenin tepesi
   kaçınılmaz olarak boş. Kesilmemiş hâlinde kartın üst %35'i sadece gökyüzü
   oluyordu ve bilgi alta yığılmış görünüyordu. Kesince hem denge düzeliyor
   hem de halkalar üst kenardan taşıyor: kart bir diyagram kutusu değil,
   dünyaya açılmış bir pencere gibi okunuyor. */
const CX = 300;
const CY = 262;
const R_HOUR = 30; // 1 saat = 30px
const R4 = 4 * R_HOUR; // 120
const R8 = 8 * R_HOUR; // 240
/* min-x, min-y, genişlik, yükseklik — min-y=44 yukarıdaki kırpma. */
const VIEW = "0 44 600 250";

/* SWAP:FLIGHTS — tipik nonstop blok süreleri (saat). Gerçek tarife verisiyle
   güncellenecekse yalnızca bu tablo değişir; koordinatlar kendiliğinden
   yeniden hesaplanıyor. Yön açısı boylam farkından türüyor, elle girilmiyor. */
const DXB_LON = 55.3644;
type Place = {
  name: string;
  lon: number;
  hours: number;
  /** okuyucunun kendi konumu — tek vurgulu şehir */
  home?: boolean;
  /** etiket noktanın solunda mı sağında mı */
  side: "l" | "r";
  /** yalnızca vurgulu şehirde gösterilen süre etiketi */
  sub?: string;
};

const PLACES: Place[] = [
  { name: "Londra", lon: -0.1278, hours: 7.2, side: "l" },
  { name: "İstanbul", lon: 28.9784, hours: 4.5, side: "l", home: true, sub: "4,5 sa" },
  { name: "Mumbai", lon: 72.8777, hours: 3.1, side: "r" },
  { name: "Singapur", lon: 103.8198, hours: 7.3, side: "r" },
];

/* Boylam farkını ekran açısına çeviren tek yer. 1,3 katsayısı yelpazeyi
   yarım dairenin geneline yayıyor; Dubai'den bakınca Avrupa'nın tamamı dar
   bir dilimde toplandığı için düz boylam eşlemesi etiketleri üst üste
   bindiriyordu. */
const angleOf = (lon: number) => (lon - DXB_LON) * 1.3;

function project(p: Place) {
  const a = (angleOf(p.lon) * Math.PI) / 180;
  const r = p.hours * R_HOUR;
  return { x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) };
}

/* Yarım daire: soldaki uçtan sağdakine, tepeden geçerek. pathLength="1"
   iki halkanın da aynı hızda çizilmesini sağlıyor (yarıçapları farklı). */
const arc = (r: number) => `M ${CX - r} ${CY} A ${r} ${r} 0 0 1 ${CX + r} ${CY}`;

export default function HeroH4() {
  const reduced = useReducedMotion() ?? false;
  const t = (v: number) => (reduced ? 0 : v);

  return (
    <motion.div
      className="yer"
      data-reduced={reduced ? "true" : "false"}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: t(0.7), delay: t(0.15), ease: EASE }}
    >
      {/* --- başlık şeridi: merkezi adlandırıyor ve saat dilimini veriyor.
              Çizimde "Dubai" yazısı yok; beyaz işaretçinin ne olduğunu bu
              satır söylüyor, böylece bir metin satırı tasarruf ediliyor. --- */}
      <div className="yer-head">
        <span className="yer-badge">
          <MapPin size={13} strokeWidth={2.2} aria-hidden="true" />
          Dubai
        </span>
        <span className="yer-tz">GMT+4 · Türkiye +1 sa</span>
      </div>

      <div className="yer-stage">
        <svg
          className="yer-svg"
          viewBox={VIEW}
          role="img"
          aria-label="Dubai merkezli uçuş menzili: İstanbul yaklaşık dört buçuk saat, Mumbai üç saat, Londra ve Singapur yaklaşık yedi buçuk saat uzaklıkta."
        >
          <defs>
            {/* Ufuk parıltısı: en parlak nokta merkezde, ufuk çizgisinin
                üstünde. Şehir ışığının gece ufkunda yaptığı şey — kartın
                koyu zeminini düz siyah olmaktan çıkarıyor. */}
            <radialGradient id="yerGlow" cx="50%" cy="88%" r="78%">
              <stop offset="0%" stopColor="#16273a" />
              <stop offset="62%" stopColor="#0e1620" />
              <stop offset="100%" stopColor="#0b0b0b" />
            </radialGradient>
            {/* Doku noktaları — sitedeki mevcut hero zemininin (phxDots) aynı
                dili. Kartı hero'nun geri kalanına bağlıyor. */}
            <pattern id="yerDots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1.2" cy="1.2" r="1.2" fill="#171717" />
            </pattern>
          </defs>

          <rect width="600" height="294" fill="url(#yerGlow)" />
          <rect width="600" height="294" fill="url(#yerDots)" />

          {/* Çerçeveden taşan soluk yay: dünyanın 8 saatte bitmediğini
              söylüyor. Etiketi yok, çünkü ölçüsü değil yönü önemli. */}
          <path d={arc(300)} className="yer-arc-out" pathLength="1" />

          {/* Ölçekli halkalar. Sırayla çiziliyor: önce yakın, sonra uzak. */}
          <path d={arc(R4)} className="yer-arc" pathLength="1" style={{ "--d": "0.55s" } as React.CSSProperties} />
          <path d={arc(R8)} className="yer-arc" pathLength="1" style={{ "--d": "0.75s" } as React.CSSProperties} />

          {/* Ufuk. Kenardan kenara gidiyor: bu bir çizgi parçası değil, ufuk.
              Kırpılmış uçlar kartın kendisini bir pencere gibi okutuyor. */}
          <line x1="0" y1={CY} x2="600" y2={CY} className="yer-hz" pathLength="1" />

          {/* Teller ve noktalar. Grafikte tek bir dekoratif çizgi yok:
              her tel gerçek bir şehre gidiyor, uzunluğu da o şehrin
              uçuş süresi. */}
          {PLACES.map((p, i) => {
            const { x, y } = project(p);
            const home = !!p.home;
            const lx = p.side === "l" ? x - 12 : x + 12;
            return (
              <g
                key={p.name}
                className={home ? "yer-node yer-node-home" : "yer-node"}
                style={{ "--i": i } as React.CSSProperties}
              >
                <line
                  x1={CX}
                  y1={CY}
                  x2={x}
                  y2={y}
                  className={home ? "yer-spoke yer-spoke-home" : "yer-spoke"}
                  pathLength="1"
                />
                <circle cx={x} cy={y} r={home ? 4.5 : 3} className="yer-dot" />
                <text
                  x={lx}
                  y={y + 4}
                  textAnchor={p.side === "l" ? "end" : "start"}
                  className="yer-lbl"
                >
                  {p.name}
                  {p.sub && (
                    <tspan className="yer-lbl-sub" dx="7">
                      {p.sub}
                    </tspan>
                  )}
                </text>
              </g>
            );
          })}

          {/* Merkez. Beyazın kartta ilk kullanımı: "burası". Önce zemin
              renginde bir hale, çünkü ufuk çizgisi ile teller tam buradan
              geçiyor — hale onlara delik açıyor, işaretçi çizgilerin üstüne
              yapışmıyor. Halka yavaşça nefes alıyor (reduced'da duruyor). */}
          <g className="yer-origin">
            <circle cx={CX} cy={CY} r="13" className="yer-pulse" />
            <circle cx={CX} cy={CY} r="8" className="yer-halo" />
            <circle cx={CX} cy={CY} r="4.5" className="yer-here" />
          </g>

          {/* Ölçek şeridi: halkaların ufka değdiği yerden aşağı inen iki
              çentik. Sadece sağ tarafta — yarım daire simetrik olduğu için
              iki taraf da işaretlenirse gürültü oluyor. */}
          <g className="yer-axis">
            <line x1={CX + R4} y1={CY} x2={CX + R4} y2={CY + 8} />
            <line x1={CX + R8} y1={CY} x2={CX + R8} y2={CY + 8} />
            <text x={CX + R4} y={CY + 22} textAnchor="middle">
              4 saat
            </text>
            <text x={CX + R8} y={CY + 22} textAnchor="middle">
              8 saat
            </text>
          </g>
        </svg>
      </div>

      {/* --- Tek cümle. Çizim "nerede" sorusunu kapatıyor, bu satır "ee ne
              olmuş" sorusunu kapatıyor: menzilin operasyonel karşılığı. --- */}
      <p className="yer-foot">
        Aynı mesai gününde Avrupa&apos;ya da Asya&apos;ya da yetişiyorsunuz.
      </p>
    </motion.div>
  );
}
