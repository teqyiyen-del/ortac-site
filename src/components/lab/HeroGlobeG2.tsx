"use client";

import { useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import CountryPicker, { COUNTRY_ORDER } from "@/components/shared/CountryPicker";
import { FACTS } from "@/lib/brand";
import { COUNTRY_LABELS, useOrtacStore, type Country } from "@/lib/store";
import { gtm } from "@/lib/gtm";

/* =============================================================================
   G2 — "YER, HARİTA DEĞİL"

   Müşterinin itirazı haritaya değildi, kürenin herkeste olmasınaydı. O yüzden
   burada dünya hiç çizilmiyor: ne küre, ne ortografik projeksiyon, ne nokta
   bulutu. Seçilen ülkeyi o ülkenin KENDİSİ anlatıyor — Dubai'nin dikey hattı,
   Londra'nın karışık tarihi hattı, Girne'nin yatay Beşparmak sırtı ve kalesi.

   Ayrımın özü şu: harita coğrafyayı anlatır ("burası dünyanın şurası"), siluet
   YERİ anlatır ("burası şuraya benziyor"). İkincisi kopyalanamaz, çünkü çizim
   ülkenin kendisine ait; küre ise herkeste aynı küre.

   Mekanik aynı kalıyor, brief'in şartı buydu: ülke seçici üstte, seçim sahneyi
   değiştiriyor. Değişen tek şey geçişin ne olduğu — küre dönmüyor, sahne
   kayıyor. Üç şehir yan yana tek bir şeritte duruyor ve seçim şeridi kaydırıyor,
   yani Dubai'den Girne'ye giderken Londra'nın önünden geçiyorsunuz. Bu bir
   "yolculuk" hissi veriyor, "gezegen" hissi değil.

   Üç katman ayrı ayrı kayıyor ve farklı sürelerde varıyor. Bu paralaks: yakın
   olan hızlı süzülür, uzak olan ağır kalır. Mesafeler eşit olduğu için üçü de
   aynı yerde duruyor — hiza bozulmuyor, derinlik yalnızca yol boyunca var.

   Deniz kaymıyor. Üç şehir de suya bakıyor; su hepsinin altında aynı su.
   ========================================================================== */

/* ---------------------------------------------------------------- geometri */
/* Panel 2600 x 420, orijini -200'de. Oran (6.19) kasıtlı olarak çok geniş:
   sahne kutusu YÜKSEKLİĞE göre ölçekleniyor, yani panel ne kadar genişse aynı
   bant yüksekliğinde ekranın o kadar çoğunu kaplıyor. 2200'de 1920px'lik bir
   ekranda iki yanda 226px boşluk kalıyordu; 2600'de 93px. Kırpma da bu oran
   sayesinde her zaman yanlardan oluyor, asla tepeden — hiçbir kulenin ucu
   hiçbir çözünürlükte kesilmiyor.

   Orijinin -200 olmasının tek sebebi şu: bütün çizim 1100 merkezine göre
   kurulmuştu ve panel genişlerken merkez 1300'e kayacaktı. viewBox'ı sola
   kaydırmak, üç şehrin tamamını 200 birim sağa taşımaktan hem daha ucuz hem de
   daha az hata açık. Paneller i * 2600'de duruyor ve içerik -200..2400'ü
   kapladığı için tam bitişikler, örtüşme yok. */
const VBX = -200;
const PW = 2600;
const PH = 420;
/** su hattı: binaların oturduğu taban. Altındaki 48 birim deniz. */
const GY = 372;

const EASE = [0.22, 1, 0.36, 1] as const;

/* Katman süreleri. Aynı yolu farklı sürede alıyorlar: yakın katman önce varır,
   uzak katman arkadan yetişir. Fizik bu — yolda giderken yakındaki direk hızlı,
   uzaktaki dağ yavaş geçer. Sayılar duruşta aynı olduğu için hiza bozulmuyor. */
const T_FAR = { duration: 1.05, ease: EASE };
const T_MID = { duration: 0.84, ease: EASE };
const T_NEAR = { duration: 0.66, ease: EASE };
const T_STILL = { duration: 0 };

/* Şehir adı ülke adının yerine geçmiyor, yanına geliyor. Seçicide zaten ülke
   yazıyor; buradaki katkı YERİN kendisi. Dubai'de şehir ve ülke etiketi aynı
   kelime olduğu için orada ülkenin tam adı yazılıyor, diğer ikisi mağazadaki
   tek kaynaktan (COUNTRY_LABELS) okunuyor. */
const PLACE: Record<Country, { city: string; region: string }> = {
  dubai: { city: "Dubai", region: "Birleşik Arap Emirlikleri" },
  ingiltere: { city: "Londra", region: COUNTRY_LABELS.ingiltere },
  kktc: { city: "Girne", region: COUNTRY_LABELS.kktc },
};

/* ------------------------------------------------------------- çizim yardımı */
/** su hattına (ya da verilen tabana) oturan basit blok: [x, genişlik, yükseklik] */
type Block = readonly [number, number, number];

function Blocks({ list, base = GY }: { list: readonly Block[]; base?: number }) {
  return (
    <>
      {list.map(([x, w, h], i) => (
        <rect key={`${x}-${i}`} x={x} y={base - h} width={w} height={h} rx="1.5" />
      ))}
    </>
  );
}

/** beşik çatılı alçak ev — Girne'nin liman sırası ve yamaç köyleri bundan */
function Houses({ list, base = GY }: { list: readonly Block[]; base?: number }) {
  return (
    <>
      {list.map(([x, w, h], i) => (
        <g key={`${x}-${i}`}>
          <rect x={x} y={base - h} width={w} height={h} rx="1" />
          <path
            d={`M${x - 4} ${base - h} L${x + w / 2} ${base - h - 12} L${x + w + 4} ${base - h} Z`}
          />
        </g>
      ))}
    </>
  );
}

/* Servi. Akdeniz'in tek kelimelik imzası ve Körfez siluetinin tam zıddı — bu
   yüzden Girne sahnesinde gökdelen yerine bu duruyor. */
function Cypress({ x, h, base = GY }: { x: number; h: number; base?: number }) {
  const w = h * 0.3;
  const foot = base - h * 0.16;
  return (
    <path
      d={`M${x - 2.6} ${base} V${foot} C${x - w / 2} ${foot - h * 0.04} ${x - w / 2} ${
        base - h * 0.78
      } ${x} ${base - h} C${x + w / 2} ${base - h * 0.78} ${x + w / 2} ${foot - h * 0.04} ${
        x + 2.6
      } ${foot} V${base} Z`}
    />
  );
}

/** yanan pencere — gecikmeyi satır içi veriyoruz, hepsi aynı anda yanmasın */
function Lite({ x, y, w = 3, h = 7, d = 0 }: { x: number; y: number; w?: number; h?: number; d?: number }) {
  return (
    <rect x={x} y={y} width={w} height={h} rx="1" className="g2-lite" style={{ animationDelay: `${d}s` }} />
  );
}

/* ============================================================================
   DUBAI — dikey. Burj Khalifa kümesi, yelken, Çerçeve, Geleceğin Müzesi ve
   arkada bir vinç: şehir hâlâ inşa hâlinde, siluetin bir parçası bu.
   ========================================================================== */

const DUBAI_FAR: readonly Block[] = [
  [-190, 54, 34], [-126, 42, 48], [-72, 60, 28], [-6, 44, 40],
  [28, 56, 40], [96, 40, 58], [148, 62, 32], [222, 44, 68], [278, 56, 44],
  [346, 40, 76], [398, 66, 38], [476, 46, 60], [534, 58, 34], [604, 42, 72],
  [658, 62, 46], [732, 44, 56], [788, 54, 36], [854, 40, 68], [906, 58, 44],
  [1246, 46, 72], [1304, 60, 38], [1376, 42, 64], [1430, 56, 44], [1498, 44, 78],
  [1554, 62, 40], [1628, 46, 58], [1686, 54, 34], [1752, 40, 66], [1804, 60, 42],
  [1876, 46, 56], [1934, 54, 32], [2000, 40, 62], [2054, 58, 42], [2124, 50, 36],
  [2186, 52, 46], [2248, 44, 60], [2306, 60, 32], [2378, 40, 48],
];

/* 964 ile 1246 arası kasıtlı boş: Burj'un arkasında hiçbir şey olmasın,
   siluet gökyüzüne karşı okunsun. */
const DUBAI_MID: readonly Block[] = [
  [520, 54, 106], [586, 46, 148], [820, 58, 100], [886, 42, 164], [938, 56, 118],
  [1300, 50, 136], [1362, 60, 104], [1466, 46, 158], [1524, 56, 116], [1598, 48, 92],
];

const DUBAI_NEAR_LOW: readonly Block[] = [
  [760, 62, 50], [828, 44, 36], [1560, 66, 46], [1636, 52, 34], [1704, 60, 44],
];

const DUBAI = {
  far: (
    <g className="g2-far">
      <Blocks list={DUBAI_FAR} />
    </g>
  ),
  mid: (
    <g className="g2-mid">
      <Blocks list={DUBAI_MID} />
      {/* Geleceğin Müzesi — halka. Tek yol, evenodd ile ortası boş. */}
      <path
        fillRule="evenodd"
        d="M672 262 A48 58 0 1 0 768 262 A48 58 0 1 0 672 262 Z M688 262 A32 42 0 1 0 752 262 A32 42 0 1 0 688 262 Z"
      />
      <rect x="696" y="316" width="10" height="56" />
      <rect x="734" y="316" width="10" height="56" />
      {/* sivrilen kule */}
      <path d="M1178 372 V214 L1196 198 L1214 214 V372 Z" />
      {/* kule vinci: Dubai siluetinin en dürüst detayı */}
      <rect x="1712" y="162" width="7" height="210" />
      <rect x="1650" y="158" width="180" height="6" />
      <rect x="1634" y="152" width="22" height="16" />
      <path d="M1715.5 126 L1701 158 L1730 158 Z" />
      <rect x="1790" y="164" width="2.4" height="56" />
      <rect x="1785" y="220" width="12" height="6" rx="1" />
    </g>
  ),
  near: (
    <g className="g2-near">
      <Blocks list={DUBAI_NEAR_LOW} />
      {/* Emirates Towers — eğik tepeli ikiz */}
      <path d="M944 372 V244 L988 218 V372 Z" />
      <path d="M892 372 V284 L930 262 V372 Z" />
      {/* Burj Khalifa: kademeli geri çekilmeler ve uzun anten */}
      <rect x="1042" y="300" width="116" height="72" rx="1.5" />
      <rect x="1055" y="246" width="90" height="54" rx="1.5" />
      <rect x="1068" y="200" width="64" height="46" rx="1.5" />
      <rect x="1080" y="164" width="40" height="36" rx="1.5" />
      <rect x="1088" y="134" width="24" height="30" rx="1.5" />
      <path d="M1088 134 L1100 104 L1112 134 Z" />
      <rect x="1098.4" y="58" width="3.2" height="46" rx="1.6" />
      <circle className="g2-beacon" cx="1100" cy="54" r="3.6" />
      {/* Burj Al Arab: solda direk, sağa şişen yelken */}
      <path d="M1230 372 V206 L1239 192 L1248 206 V372 Z" />
      <path d="M1248 372 V214 C1276 256 1304 308 1314 372 Z" />
      {/* Dubai Frame: iki ayak, bir lento */}
      <rect x="1372" y="204" width="16" height="168" />
      <rect x="1454" y="204" width="16" height="168" />
      <rect x="1372" y="186" width="98" height="18" rx="2" />
      <Lite x={1050} y={314} d={0} />
      <Lite x={1063} y={260} d={0.6} />
      <Lite x={1076} y={214} d={1.2} />
      <Lite x={1087} y={176} d={1.8} />
      <Lite x={957} y={300} d={0.9} />
      <Lite x={1288} y={330} d={1.5} />
      <Lite x={1400} y={300} d={2.1} />
      <Lite x={800} y={340} d={0.4} />
    </g>
  ),
};

/* ============================================================================
   LONDRA — karışık. Elizabeth Kulesi, Shard, London Eye, St Paul's kubbesi:
   dört yüzyıl aynı hatta. Dubai'nin tek tip dikeyliğinin tam karşıtı.
   ========================================================================== */

const UK_FAR: readonly Block[] = [
  [-192, 60, 26], [-120, 44, 40], [-62, 62, 24], [-2, 46, 36],
  [24, 62, 34], [98, 48, 46], [158, 66, 28], [236, 44, 52], [292, 58, 32],
  [362, 46, 58], [420, 68, 30], [500, 42, 48], [554, 60, 26], [626, 46, 54],
  [684, 64, 32], [1290, 48, 50], [1350, 62, 30], [1424, 44, 56], [1480, 58, 34],
  [1550, 46, 48], [1608, 66, 28], [1686, 42, 52], [1740, 60, 32], [1812, 46, 56],
  [1870, 64, 30], [1946, 44, 48], [2002, 58, 26], [2072, 48, 44], [2132, 56, 32],
  [2198, 46, 50], [2258, 64, 28], [2336, 44, 42], [2390, 58, 26],
];

const UK_MID: readonly Block[] = [
  [560, 56, 72], [630, 46, 96], [700, 60, 64], [1276, 52, 88], [1568, 54, 74],
  [1712, 62, 68], [1774, 48, 92],
];

const UK_NEAR_LOW: readonly Block[] = [
  [700, 58, 44], [762, 50, 34], [1254, 54, 40], [1450, 58, 34], [1518, 50, 28],
];

/* London Eye. Kabin ve tel konumları burada bir kez hesaplanıp donduruluyor:
   modül düzeyinde sabit oldukları için sunucu ve istemci birebir aynı sayıyı
   basıyor, tek ondalığa yuvarlama da kalan her kayan nokta farkını siliyor. */
const EYE_CX = 828;
const EYE_CY = 256;
const EYE_R = 68;
const EYE_POINTS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Number((EYE_CX + Math.cos(a) * EYE_R).toFixed(1)),
    y: Number((EYE_CY + Math.sin(a) * EYE_R).toFixed(1)),
  };
});

const UK = {
  far: (
    <g className="g2-far">
      <Blocks list={UK_FAR} />
      {/* Wren'in kule külahları: Londra'nın arka planı bunlarla dolu */}
      <rect x="336" y="314" width="26" height="58" />
      <path d="M332 314 L349 268 L366 314 Z" />
      <rect x="1696" y="316" width="24" height="56" />
      <path d="M1692 316 L1708 274 L1724 316 Z" />
    </g>
  ),
  mid: (
    <g className="g2-mid">
      <Blocks list={UK_MID} />
      {/* Gherkin */}
      <path d="M972 372 V284 C972 248 986 218 994 210 C1002 218 1016 248 1016 284 V372 Z" />
      {/* Walkie-Talkie: yukarı doğru genişleyen tek bina */}
      <path d="M1424 372 V264 C1424 254 1436 246 1456 243 L1488 240 V372 Z" />
      {/* Cheesegrater: kama */}
      <path d="M1504 372 V266 L1558 220 V372 Z" />
      {/* Canary Wharf — piramit külahlı kule */}
      <rect x="1616" y="210" width="54" height="162" rx="1.5" />
      <path d="M1616 210 L1643 186 L1670 210 Z" />
    </g>
  ),
  near: (
    <g className="g2-near">
      <Blocks list={UK_NEAR_LOW} />

      {/* London Eye: jant, göbek, teller, kabinler ve A ayakları */}
      <g className="g2-spoke">
        {EYE_POINTS.map((p) => (
          <line key={`s${p.x}-${p.y}`} x1={EYE_CX} y1={EYE_CY} x2={p.x} y2={p.y} />
        ))}
      </g>
      <circle className="g2-ring" cx={EYE_CX} cy={EYE_CY} r={EYE_R} />
      {EYE_POINTS.map((p) => (
        <circle key={`p${p.x}-${p.y}`} className="g2-pod" cx={p.x} cy={p.y} r="4.2" />
      ))}
      <circle cx={EYE_CX} cy={EYE_CY} r="6" />
      <path className="g2-strut" d={`M808 372 L${EYE_CX - 2} ${EYE_CY + 8} M852 372 L${EYE_CX + 4} ${EYE_CY + 8}`} />

      {/* Victoria Tower + Parlamento bloğu */}
      <rect x="898" y="214" width="48" height="158" rx="1.5" />
      <path d="M894 214 L922 186 L950 214 Z" />
      <rect x="920.6" y="170" width="2.8" height="18" rx="1.4" />
      <rect x="950" y="308" width="96" height="64" rx="1.5" />
      {[958, 986, 1014, 1040].map((x) => (
        <path key={x} d={`M${x - 5} 308 L${x} 288 L${x + 5} 308 Z`} />
      ))}

      {/* Elizabeth Kulesi — saat kadranı sahnenin tek "sıcak" noktası */}
      <rect x="1058" y="190" width="38" height="182" rx="1.5" />
      <rect x="1050" y="150" width="54" height="40" rx="1.5" />
      <circle className="g2-clock" cx="1077" cy="170" r="13.5" />
      <rect x="1056" y="128" width="42" height="22" rx="1.5" />
      <path d="M1052 128 L1077 80 L1102 128 Z" />
      <rect x="1075.6" y="62" width="2.8" height="18" rx="1.4" />

      {/* The Shard */}
      <path d="M1176 372 L1207 122 L1212 106 L1217 122 L1248 372 Z" />

      {/* St Paul's: kasnak, kubbe, fener, haç */}
      <rect x="1338" y="292" width="64" height="80" rx="1.5" />
      <path d="M1338 292 A32 38 0 0 1 1402 292 Z" />
      <rect x="1364" y="232" width="12" height="22" />
      <circle cx="1370" cy="228" r="5.5" />
      <rect x="1369" y="210" width="2" height="14" />
      <rect x="1364" y="215" width="12" height="2" />

      <Lite x={1066} y={228} d={0.3} />
      <Lite x={1085} y={272} d={1.1} />
      <Lite x={1196} y={300} d={1.7} />
      <Lite x={1224} y={250} d={2.3} />
      <Lite x={962} y={330} d={0.8} />
      <Lite x={1352} y={324} d={1.4} />
      <Lite x={716} y={342} d={2} />
    </g>
  ),
};

/* ============================================================================
   GİRNE — yatay. Arkada Beşparmak sırtı, önde kale ve liman, aralarda servi.
   Üç sahnenin en önemlisi bu: gökdelen yok. Ülke seçimi bir "boy" seçimi değil,
   bir yer seçimi — ve fark en net burada görülüyor.
   ========================================================================== */

/* Beşparmak: adı beş parmaktan geliyor, o yüzden beş tepe gerçekten sayılabilir
   olmalı. 902 / 952 / 1000 / 1052 / 1104 — aralarındaki boyunlar kasıtlı olarak
   derin, yoksa sırt tek bir tümseğe dönüşüyor. */
const KKTC_RIDGE =
  "M-200 372 V342 L-90 328 L20 338 L130 320 L240 332 L360 314 L470 326 L580 306 L690 318 L760 296 " +
  "L830 272 L878 250 L902 234 L926 256 L952 224 L974 250 L1000 210 L1026 246 L1052 218 L1078 250 " +
  "L1104 230 L1142 262 L1200 278 L1290 266 L1370 282 L1460 268 L1550 288 L1650 274 L1750 292 " +
  "L1860 278 L1970 296 L2080 284 L2200 300 L2310 288 L2400 302 V372 Z";

const KKTC_SLOPE =
  "M-200 372 V344 L-40 336 L140 348 L300 336 L460 350 L620 334 L780 346 L940 330 L1100 342 " +
  "L1260 328 L1420 340 L1560 326 L1720 338 L1900 328 L2060 340 L2240 330 L2400 342 V372 Z";

const KKTC_HILL_HOUSES: readonly Block[] = [
  [-140, 40, 24], [-76, 32, 20], [210, 40, 24], [280, 32, 20], [340, 44, 26],
  [1760, 40, 24], [1830, 34, 20], [1892, 44, 26], [2210, 40, 24], [2280, 34, 20],
];

const KKTC_QUAY_HOUSES: readonly Block[] = [
  [762, 54, 42], [822, 44, 52], [872, 58, 38], [936, 48, 48], [988, 42, 56], [1034, 44, 40],
];

/* Kale mazgalları: 26 birimde bir diş. Elle yazmak yerine üretiliyor, çünkü
   aralığı değiştirmek tek sayıyı değiştirmek olsun. */
const MERLONS = Array.from({ length: 11 }, (_, i) => 1206 + i * 26);

const KKTC = {
  far: (
    <g className="g2-ridge">
      <path d={KKTC_RIDGE} />
    </g>
  ),
  mid: (
    <g className="g2-mid">
      <path d={KKTC_SLOPE} />
      <Houses list={KKTC_HILL_HOUSES} base={340} />
      <Cypress x={648} h={64} base={342} />
      <Cypress x={684} h={52} base={342} />
      <Cypress x={1668} h={58} base={332} />
      {/* Bellapais Manastırı: yıkık saçak hattı ve çan kulesi */}
      <rect x="1486" y="270" width="92" height="62" rx="1" />
      <path d="M1486 270 L1512 258 L1540 268 L1566 254 L1578 270 Z" />
      <rect x="1578" y="244" width="28" height="88" rx="1" />
      {[1500, 1528, 1556].map((x) => (
        <path key={x} className="g2-void" d={`M${x} 332 V300 A9 9 0 0 1 ${x + 18} 300 V332 Z`} />
      ))}
    </g>
  ),
  near: (
    <g className="g2-near">
      <Cypress x={706} h={98} />
      <Cypress x={740} h={74} />
      <Houses list={KKTC_QUAY_HOUSES} />

      {/* Cami ve minare: kale ile liman evleri arasındaki dikey */}
      <rect x="1092" y="238" width="9" height="134" />
      <rect x="1085" y="262" width="23" height="6" rx="2" />
      <path d="M1088 238 L1096.5 212 L1105 238 Z" />
      <circle cx="1096.5" cy="208" r="3" />
      <rect x="1114" y="336" width="54" height="36" rx="1" />
      <path d="M1114 336 A27 23 0 0 1 1168 336 Z" />

      {/* Girne Kalesi: yatay kütle, iki yuvarlak burç, mazgallar, deniz kapısı */}
      <rect x="1200" y="306" width="286" height="66" rx="1" />
      {MERLONS.map((x) => (
        <rect key={x} x={x} y="296" width="14" height="10" />
      ))}
      <path d="M1176 372 V330 A26 26 0 0 1 1228 330 V372 Z" />
      <path d="M1454 372 V324 A28 28 0 0 1 1510 324 V372 Z" />
      <path className="g2-void" d="M1328 372 V346 A15 15 0 0 1 1358 346 V372 Z" />

      {/* Limandaki iki tekne — gövdeler su bandında, direkler ufkun üstünde */}
      <path d="M986 374 L998 392 L1058 392 L1070 374 Z" />
      <rect x="1024" y="318" width="2.6" height="56" />
      <path d="M1027 320 L1027 372 L1054 372 Z" />
      <path d="M1122 376 L1132 390 L1178 390 L1188 376 Z" />
      <rect x="1152" y="332" width="2.4" height="44" />
      <path d="M1154.4 334 L1154.4 374 L1176 374 Z" />

      <Lite x={836} y={330} d={0.5} />
      <Lite x={946} y={336} d={1.2} />
      <Lite x={996} y={328} d={1.9} />
      <Lite x={1240} y={330} d={0.9} />
      <Lite x={1400} y={330} d={1.6} />
      <Lite x={1126} y={350} d={2.2} />
    </g>
  ),
};

const ART: Record<Country, { far: React.ReactNode; mid: React.ReactNode; near: React.ReactNode }> = {
  dubai: DUBAI,
  ingiltere: UK,
  kktc: KKTC,
};

/* Deniz. Şerit 160 birimde bir tekrar ediyor: kayma animasyonu tam bir periyot
   yol alıp başa döndüğü için desen dikişsiz akıyor ve ekstra çizim gerekmiyor.
   Sayaç panelin iki ucundan da taşıyor (-480'den 2720'ye): şerit iki yönde
   kayıyor, yani her iki kenarda da önden yer açılmış olması gerekiyor. */
function ripples(y: number, phase: number) {
  const out: [number, number, number][] = [];
  for (let i = -3; i < 17; i++) {
    const b = i * 160 + phase;
    out.push([b, 58, y]);
    out.push([b + 74, 34, y + 7]);
  }
  return out;
}
const RIPPLE_A = ripples(379, 0);
const RIPPLE_B = ripples(393, 46);

/* ========================================================================== */

export default function HeroGlobeG2() {
  /* Küre ile aynı mağaza dilimini kullanıyor: bu bileşen HeroGlobe'un yerine
     takılabilir olsun ve hesaplayıcı ile ülke seçimi ayrışmasın diye. */
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);
  const reduced = useReducedMotion() ?? false;

  const index = COUNTRY_ORDER.indexOf(country);
  const x = -index * PW;

  /* Bayrağın üstünde gezinmek sahneyi değiştiriyor, tıklamak ayrıca ölçülüyor.
     Ayrım kasıtlı: fareyi üç bayrağın üstünden geçirmek üç "seçim" olayı
     üretmemeli, ama sahne yine de anında cevap vermeli. */
  const show = useCallback((c: Country) => setCountry(c), [setCountry]);
  const pick = useCallback(
    (c: Country) => {
      setCountry(c);
      gtm("hero_skyline_country", { country: c });
    },
    [setCountry],
  );

  const tFar = reduced ? T_STILL : T_FAR;
  const tMid = reduced ? T_STILL : T_MID;
  const tNear = reduced ? T_STILL : T_NEAR;

  const facts = FACTS[country];
  const place = PLACE[country];

  return (
    <div className="g2">
      <CountryPicker value={country} onSelect={pick} onHover={(c) => c && show(c)} withLegend />

      <div className="g2-stage">
        {/* Sahne kutusundan geniş ekranlarda dar kalıyor; deniz şeridi tam
            genişlikte arkada durunca yanlar boşluk değil, devam eden ufuk
            oluyor. Bu yüzden tuvalin ARKASINDA. */}
        <span className="g2-ground" aria-hidden="true" />

        <div className="g2-canvas">
          <div className="g2-scene">
            <svg
              className="g2-svg"
              viewBox={`${VBX} 0 ${PW} ${PH}`}
              preserveAspectRatio="xMidYMax meet"
              aria-hidden="true"
              focusable="false"
            >
              {/* Üç katman, üç şerit. Her şeritte üç şehir yan yana; seçim
                  şeridi tam bir panel boyu kaydırıyor.

                  Kaydırmayı motion CSS dönüşümü olarak yazıyor (SVG'de <g>
                  için x, attrX değil, style.transform'a gidiyor) ve SVG içinde
                  CSS px = kullanıcı birimi. Yani translateX(-2600px) tam
                  olarak bir panel: gelen şehir, gidenin durduğu yere birim
                  birim oturuyor. Ölçüldü, varsayılmadı. */}
              <motion.g initial={false} animate={{ x }} transition={tFar}>
                {COUNTRY_ORDER.map((c, i) => (
                  <g key={c} transform={`translate(${i * PW} 0)`}>
                    {ART[c].far}
                  </g>
                ))}
              </motion.g>

              <motion.g initial={false} animate={{ x }} transition={tMid}>
                {COUNTRY_ORDER.map((c, i) => (
                  <g key={c} transform={`translate(${i * PW} 0)`}>
                    {ART[c].mid}
                  </g>
                ))}
              </motion.g>

              <motion.g initial={false} animate={{ x }} transition={tNear}>
                {COUNTRY_ORDER.map((c, i) => (
                  <g key={c} transform={`translate(${i * PW} 0)`}>
                    {ART[c].near}
                  </g>
                ))}
              </motion.g>

              {/* Su kaymıyor. Üç şehir de suya bakıyor — Körfez, Thames, Akdeniz —
                  ve altlarındaki aynı su olunca sahne değişimi "başka gezegen"
                  değil "aynı kıyının başka yeri" gibi okunuyor. */}
              <g>
                <rect className="g2-sea" x={VBX} y={GY} width={PW} height={PH - GY} />
                <g className="g2-ripple g2-ripple-a">
                  {RIPPLE_A.map(([rx, rw, ry], i) => (
                    <rect key={`a${i}`} x={rx} y={ry} width={rw} height="3" rx="1.5" />
                  ))}
                </g>
                <g className="g2-ripple g2-ripple-b">
                  {RIPPLE_B.map(([rx, rw, ry], i) => (
                    <rect key={`b${i}`} x={rx} y={ry} width={rw} height="3" rx="1.5" />
                  ))}
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Ufuk çizgisi tuvalin dışında ve tam genişlikte: sahne biter, ufuk
            bitmez. Küre trope'unun tersi de tam olarak bu — gezegenin bir
            kenarı vardır, ufkun yoktur. */}
        <span className="g2-hz" aria-hidden="true" />

        {/* Diorama etiketi. İki satır, o kadar.

            Bir tur "Kimler için · …" satırı da vardı ve ölçünce düştü: FACTS
            listeleri iki satıra sarıyor, kart 140px'e çıkıyor ve 196px'lik bir
            bandın önünde etiket olmaktan çıkıp perde oluyordu — 768'de London
            Eye'ın tamamını örtüyordu. FACTS.structure de denendi, Dubai'de
            etiketin kendisini tekrar ediyor ("Serbest bölge" / "Serbest bölge
            veya mainland"). Kalan iki bilgi gerçekten yeni olan ikisi: yerin
            adı (Girne, KKTC değil) ve ülkenin iki kelimelik etiketi — ki
            brand.ts o alanı zaten tam olarak bu iş için tutuyor.

            Fiyat, gün sayısı ve banka vaadi burada YOK: üçü de duruşun açıkça
            dışarıda bıraktığı şeyler. */}
        <div className="g2-plate" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={country}
              className="g2-plate-in"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0 : 0.24, ease: EASE }}
            >
              <span className="g2-city">
                {place.city}
                <i>{place.region}</i>
              </span>
              <span className="g2-tag">{facts.tag}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
