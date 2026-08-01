"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import CountryPicker, { COUNTRY_NAMES, COUNTRY_ORDER } from "@/components/shared/CountryPicker";
import { useOrtacStore, type Country } from "@/lib/store";
import { DOT_DELTAS, OUTLINES } from "@/lib/globeGeo";
import { FACTS } from "@/lib/brand";
import { gtm } from "@/lib/gtm";

/* ============================================================================
   HERO SAHNESİ — ADAY G1 · "DÜNYA HARİTASI PENCERESİ"
   CSS: src/app/css/lab-g1.css (ad alanı .g1-)

   Bu dosya ikinci turda baştan düşünüldü. Müşterinin üç itirazı vardı ve
   üçü de aynı kökten çıkıyordu, o yüzden önce teşhis:

   ---------------------------------------------------------------- TEŞHİS

   "g1 fikri tam oturmamış" diyor. Oturmamasının sebebi fikir değildi —
   fikrin ekranda hiç görünmemesiydi. Dört ölçülebilir sorun buldum:

   1) SAHNEDE HİÇBİR ZAMAN DÜNYA YOKTU. Sahne kutusu ölçüldüğünde 1425×306,
      yani 4,66:1 bir mektup kutusu. Harita plakası ise 360°×141°, yani
      2,55:1. Bu iki oran birbirini tutmadığı için plaka `slice` ile
      kırpılıyordu: en iyi ihtimalle enlemin yarısı kadraj dışında kalıyordu.
      Üstüne varsayılan kadraj 117-132° idi ve sahne AÇILIŞTA doğrudan oraya
      iniyordu. Sonuç: ziyaretçi hiçbir anda dünya haritası görmüyordu, Avrupa
      ile Basra Körfezi arasından bir şerit görüyordu. "Düz dünya haritası"
      diye anlatılan fikir ekranda hiç belirmiyorsa, elbette oturmaz.

   2) KARA, ZEMİNDEN AYIRT EDİLMİYORDU. Nokta boyası ülkeye ortalanmış bir
      radyal geçişti ve kadraj kenarında #363c44'e düşüyordu; #080808 zemin
      üstünde bu neredeyse siyah. Ortadaki açık leke de kıtaları değil, bir
      ışık lekesini okutuyordu. Yani harita gibi değil, üstüne ışık düşmüş
      bir doku gibi görünüyordu.

   3) NOKTA YOĞUNLUĞU KITALARI YOK EDİYORDU. Dar ekranda ölçüm net: 390 px
      genişlikte kadraj 47°'ye iniyordu ve ekranda kalan şey düzenli bir
      tram deseniydi — Kıbrıs'ın çevresindeki Doğu Akdeniz'i tanıyabilen
      kimse yok. Nokta aralığı doğruydu (8,2 px) ama nokta aralığı doğru
      olunca harita okunur olmuyor; kadraj o kadar dar ki noktaların çizdiği
      şeklin bir karşılığı kalmıyor.

   4) YAKINLAŞMANIN SEBEBİ GÖRÜNMÜYORDU. Kamera açılışta kendi kendine
      yaklaşıyordu — kullanıcı hiçbir şey yapmadan hareket eden bir kamera
      "amaçsız" görünür. Üstelik sahnede ölçek diye bir şey yoktu, yani
      "ne kadar yaklaştık" sorusunun ekranda cevabı yoktu.

   Ve ayrıca müşterinin doğrudan söylediği şey: İSTANBUL ÇIPASI. Sahne
   İstanbul'dan seçilen ülkeye yay çiziyordu. İki ayrı kusuru vardı. Birincisi
   iddia yanlış: müşteri kitlesi yalnızca Türkiye'de değil, harita tek bir
   kalkış noktası varsaymamalı. İkincisi çizim zaten çalışmıyordu — İngiltere
   kadrajında yay, ekranın ortasında görünmeyen bir noktada bitiyordu.

   ------------------------------------------------------------------ ÇÖZÜM

   Sahnenin ne olduğu yeniden tanımlandı: bu bir gezegen değil, bir HARİTA
   PENCERESİ. Kenarlıklı, köşesi yuvarlatılmış bir panel; içinde tam bir
   dünya haritası; altında koordinat okuması ve ÖLÇEK ÇUBUĞU. Panelin kendisi
   sitenin dilinden geliyor (sitenin her yerinde kenarlıklı koyu paneller
   var), yani sahne artık hero'nun geri kalanıyla aynı dili konuşuyor.

   a) VARSAYILAN KADRAJ = BÜTÜN DÜNYA (360°). Sahne artık açılışta hiçbir yere
      uçmuyor; dünya haritası olarak duruyor ve öyle kalıyor. Bunun için sahne
      kutusunun oranı da düzeltildi (aşağıda, CSS notunda).

   b) YAKINLAŞMA ARTIK KULLANICININ İŞİ. Bayrağa gelindiğinde/tıklandığında
      kamera 140°'ye iniyor (dar ekranda 118°). Hareketin sebebi görünür
      olduğu için amaçsız görünmüyor. 140° kasıtlı olarak ölçülü: üç pazarın
      üçü de bu kadrajın içinde kalıyor (aşağıdaki kutu kuralı bunu garanti
      ediyor), yani ziyaretçi yaklaşınca da dünyanın neresine baktığını
      görmeye devam ediyor.

   c) İSTANBUL YAYI TAMAMEN KALKTI. Yerine tek merkezli olmayan iki işaret
      geldi: (1) üç pazar da her zaman haritada işaretli duruyor — seçili olan
      beyaz, diğer ikisi sönük ama görünür; (2) seçili pazarın üstünde bir
      ARTI KIL (enlem + boylam çizgisi) plakanın kenarlarına kadar uzanıyor.
      Neden yay yerine artı kıl: yay, tanımı gereği iki uçlu bir iddiadır ve
      bir ucunu bir yere çakmak zorundasınız — hangi şehri koyarsanız koyun
      aynı hatayı yeniden yapmış olursunuz. Artı kıl yönsüz: bir yerden
      gelmiyor, bir yeri gösteriyor. Üstelik işlevi de var — Kıbrıs dünya
      kadrajında 5 px'lik bir leke, artı kıl olmasa bulunamaz.

   d) KARA GÖRÜNÜR HALE GELDİ. Geçişin koyu ucu #59626f'e çıkarıldı ve yarıçap
      genişletildi; artık spot ışığı değil, hafif bir kabartma. Harita her
      yerinde okunuyor.

   e) ÜÇÜNCÜ (KABA) IZGARA EKLENDİ. İki ızgara üç mesafeye yetmiyordu: 390 px
      genişlikte bütün dünya gösterilince 2° ızgara 2,2 px aralığa düşüyor ve
      lapaya dönüyor. 4°'lik kaba katman bunu 4,3 px'e çıkarıyor. Katman
      seçimi yine derece değil PİKSEL ölçüsüyle yapılıyor.

   f) ÖLÇEK ÇUBUĞU. Sağ altta bir çubuk ve yanında kaç km ettiği. Geniş
      ekranda dünya kadrajı 2.500 km, ülke kadrajı 500-1.000 km yazıyor
      (rakam merkez enlemine göre değişiyor, çünkü boylam derecesi kutuplara
      doğru daralıyor). Yakınlaşmayı ölçülebilir yapan şey bu; hareketin bir
      büyüklüğü olunca amaçsız görünmüyor.

   ------------------------------------------- KÜRE TROPE'UNDAN AYRILMA AYNEN
   Dairesel limb yok, kenara sönen ışık yok, dönerken kaybolan kara yok.
   Sahne dikdörtgen bir plaka, kenarları düz ve artık GÖRÜNÜR (plaka çerçevesi
   çiziliyor), üstünde enlem/boylam ızgarası var, kamera dönmüyor — kaydırıyor
   ve yaklaşıyor. Hareket "gezegen döndü" değil, "haritada bir yere gidildi".

   -------------------------------------------------------------- VERİ VE ÖLÇEK
   Kaynak globeGeo.ts: 45.623 kara noktası, ardışık fark olarak, onda bir
   derece biriminde. Düz projeksiyon küreselden çok daha ucuz — x doğrudan
   boylam, y ters enlem, trigonometri yok.

   45.623 noktayı olduğu gibi basmak yanlış olurdu: kaynak noktalar KÜRE
   üzerinde eş aralıklı (Fibonacci örneklemesi), yani düz haritada kutuplara
   doğru yatayda seyrelirler ve dizilim düzensizdir — ekranda "bozuk tarama"
   gibi görünür. Bunun yerine noktalar bir IZGARAYA oturtuluyor: her kaynak
   noktası en yakın ızgara düğümünü işaretliyor. Çıktı düzenli bir nokta
   matrisi ve sayı da düşüyor:

     4,0° (kaba)  → dünya kadrajı, dar ekran
     2,0° (orta)  → dünya kadrajı, geniş ekran
     1,0° (ince)  → ülke kadrajı

   Üç adım da hizalı (4 = 2×2 = 4×1), yani katman değişirken noktalar yer
   değiştirmiyor, sadece aralara yenileri geliyor: "detay çözülüyor" okuması.
   Kaynak çözünürlüğü (~0,51° ortalama aralık) 1°'nin altına inmeye izin
   vermiyor; kalan tek tük delikleri tek geçişlik bir doldurma kapatıyor.

   Üretim mount sonrası BİR KEZ çalışıyor. Sonrası bedava: kamera her karede
   yalnızca viewBox'ı ve birkaç CSS değişkenini yazıyor, 22 bin noktanın
   hiçbirine dokunmuyor. Küre bunu yapamıyordu — orada projeksiyon JS'te
   olduğu için her kare 37 bin nokta yeniden hesaplanıyordu.
   ========================================================================= */

/* ------------------------------------------------------------- harita plakası */
/* Derece başına kullanıcı birimi. 4 seçildi çünkü hem ızgara adımları (4°, 2°,
   1°) hem de plaka kenarları tam sayıya düşüyor — path dizesinde ondalık yok,
   ki 22 bin nokta için bu dosyanın onda birini kurtarıyor. */
const K = 4;
/* Antarktika kırpılıyor: düz projeksiyonda kutba yakın kara devasa görünür ve
   kompozisyonun altına hiçbir şey söylemeyen 25° yükseklikte beyaz bir şerit
   koyar. Üst sınır 83° kuzey, Grönland'ın tepesi. */
const LAT_TOP = 83;
const LAT_BOT = -58;
const MAP_W = 360 * K;
const MAP_H = (LAT_TOP - LAT_BOT) * K;

const px = (lng: number) => (lng + 180) * K;
const py = (lat: number) => (LAT_TOP - lat) * K;

/* Kabadan inceye. Sıra önemli: çizim sırası da, karıştırma da buna dayanıyor. */
const STEPS = [4, 2, 1] as const;

/* ---------------------------------------------------------------- ızgaralar */
type Lattice = { d: string; count: number };
/* Modül düzeyinde önbellek: bileşen iki kez mount olsa da (React 18 strict mode
   geliştirmede tam olarak bunu yapar) 45 bin noktalık çözme ikinci kez
   çalışmasın. */
let LATTICES: Lattice[] | null = null;

function buildLattices(): Lattice[] {
  if (LATTICES) return LATTICES;

  /* Farkların toplanması: liste dLng, dLat, dLng, dLat… sırasında ve onda bir
     derece biriminde (GeoJSON gibi önce boylam). */
  const n = DOT_DELTAS.length / 2;
  const lngs = new Float32Array(n);
  const lats = new Float32Array(n);
  let a = 0;
  let b = 0;
  for (let i = 0; i < n; i++) {
    a += DOT_DELTAS[i * 2];
    b += DOT_DELTAS[i * 2 + 1];
    lngs[i] = a / 10;
    lats[i] = b / 10;
  }

  const make = (step: number): Lattice => {
    const cols = Math.round(360 / step);
    const rows = Math.round((LAT_TOP - LAT_BOT) / step) + 1;
    const grid = new Uint8Array(cols * rows);

    for (let i = 0; i < n; i++) {
      /* en yakın düğüm; 180°'de sarma tek satır çünkü ızgara boylamda döngüsel */
      let cx = Math.round((lngs[i] + 180) / step);
      if (cx >= cols) cx -= cols;
      const cy = Math.round((LAT_TOP - lats[i]) / step);
      if (cy < 0 || cy >= rows) continue;
      grid[cy * cols + cx] = 1;
    }

    /* Delik doldurma. Kaynak örnekleme aralığı ile ızgara adımı birbirine yakın
       olduğunda bazı kara hücrelerine hiç örnek düşmüyor; bunlar ekranda
       kıtaların içinde tek tük eksik nokta olarak görünür ve dokuyu kirletir.
       Dört ortogonal komşusundan en az üçü kara olan boş hücre kara sayılıyor —
       kıyıyı şişirmeyecek kadar dar, delikleri kapatacak kadar geniş bir kural.
       Kaba ızgaralarda (4°, 2°) zaten delik kalmıyor, kural orada da zararsız.
       Tek geçiş: doldurulan hücreler yeni doldurmaları tetiklemesin diye önce
       toplanıp sonra yazılıyor. */
    const add: number[] = [];
    for (let y = 1; y < rows - 1; y++) {
      for (let x = 0; x < cols; x++) {
        const k = y * cols + x;
        if (grid[k]) continue;
        const nb =
          grid[k - cols] +
          grid[k + cols] +
          grid[y * cols + ((x + 1) % cols)] +
          grid[y * cols + ((x - 1 + cols) % cols)];
        if (nb >= 3) add.push(k);
      }
    }
    for (const k of add) grid[k] = 1;

    /* Nokta, SVG'nin en ucuz işareti olan sıfır uzunluklu alt yolla çiziliyor:
       "M x y h0" + yuvarlak uç. Bir katmanın bütün noktaları tek <path>
       paylaşıyor; her nokta için bir <circle> açmak DOM'u aynı işi yapmak için
       binlerce düğüm taşımaya zorlardı. */
    let d = "";
    let count = 0;
    const unit = step * K; /* tam sayı: 16, 8 veya 4 */
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (!grid[y * cols + x]) continue;
        count++;
        d += `M${x * unit} ${y * unit}h0`;
      }
    }
    return { d, count };
  };

  LATTICES = STEPS.map(make);
  return LATTICES;
}

/* ------------------------------------------------------------------ pazarlar */
/* Üç pazar. Artık "hedef" değil, haritada sürekli duran üç işaret: seçim
   hangisinin öne çıktığını değiştiriyor, haritada kaç işaret olduğunu değil. */
const MARKS: Record<Country, readonly [number, number]> = {
  dubai: [55.2708, 25.2048],
  ingiltere: [-0.1278, 51.5074],
  kktc: [33.3823, 35.1856],
};

/* Üç pazarın sınır kutusu + pay. Yakın kadrajın tek kuralı bu (aşağıda
   nearCam): kamera seçilen ülkeye ortalanır, AMA bu kutu kadrajın dışına
   taşacaksa merkez geri itilir. Böylece hangi ülke seçilirse seçilsin üçü de
   ekranda kalıyor. Kutu bir "merkez" değil — çizilmiyor, etiketlenmiyor,
   hiçbir yer iddiası taşımıyor; yalnızca kadrajın neyi içermek zorunda
   olduğunu söyleyen bir kısıt. */
/* Pay, işaretin kadrajın kenarına yapışmasını engelleyecek kadar; daha fazlası
   kamerayı gereksiz yere kısıtlıyor. Enlem payı bilerek küçük tutuldu: büyük
   payla üç ülkenin merkez enlemi neredeyse aynı yere düşüyor ve kamera dikeyde
   hiç hareket etmiyordu — hareket etmeyen bir kamera da yakınlaşmayı amaçsız
   gösteriyor, ki düzeltilmeye çalışılan şey tam olarak buydu. */
const BOX_PAD_LNG = 5;
const BOX_PAD_LAT = 3.5;
const BOX = (() => {
  const ms = COUNTRY_ORDER.map((c) => MARKS[c]);
  return {
    lng0: Math.min(...ms.map((m) => m[0])),
    lng1: Math.max(...ms.map((m) => m[0])),
    lat0: Math.min(...ms.map((m) => m[1])),
    lat1: Math.max(...ms.map((m) => m[1])),
  };
})();

/* ---------------------------------------------------------------- kadrajlar */
/* Varsayılan: bütün dünya. 360° tam plaka genişliği demek, yani boylamda
   kırpma yok. Dikeyde ne kadarının sığdığı sahnenin oranına bağlı; oran CSS'te
   2,62:1'e sabitlendi (lab-g1.css'teki nota bak), o oranda plakanın 141°'lik
   yüksekliğinin ~137°'si giriyor — pratikte Grönland'ın tepesinden Ateş
   Toprakları'na kadar her şey. */
const WORLD_SPAN = 360;
/* Dünya kadrajının merkez enlemi. Kırpma nereden yenirse yensin bir şey
   gidecek; en az konuşan bant Kuzey Buz Denizi olduğu için kırpma yukarıdan
   alınıyor. Bu sayı onu yapıyor. */
const WORLD_LAT = 11;

/* Yakın kadraj. Tek sayı, ülke başına ayrı katsayı YOK — bilerek: ülkeyi artık
   poligonunun büyüklüğü değil, ekran ölçüsünde sabit olan nişangâh + etiket
   tanımlıyor, o yüzden kameranın ülke büyüklüğünü telafi etmesi gerekmiyor.
   Tek sayı olunca yakınlaşma her seferinde AYNI ŞEYİ ifade ediyor: "bir kademe
   yaklaştık", "Kıbrıs küçük olduğu için üç kat daha yaklaştık" değil.
   140°, 360°'in ~2,6 katı — ölçülü bir adım, ve üç pazarı da içeride tutmaya
   yetecek kadar geniş. Dar ekranda 118°, çünkü orada aynı derece daha az
   piksele düşüyor ve doku fazla sıkışıyor. */
const nearSpan = (w: number) => (w < 700 ? 118 : 140);

/* Uçuş süresi. Dünya→ülke ve ülke→ülke için aynı; hareketin uzunluğu değişse
   de süresi değişmiyor, yoksa kısa geçişler tembel görünüyor. */
const FLIGHT_MS = 900;

/* ------------------------------------------------------ statik geometri */
const ring = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${px(x).toFixed(1)} ${py(y).toFixed(1)}`).join("") + "Z";

const AREA: Record<Country, string> = {
  dubai: OUTLINES.dubai.map(ring).join(""),
  ingiltere: OUTLINES.ingiltere.map(ring).join(""),
  kktc: OUTLINES.kktc.map(ring).join(""),
};

const dot = (p: readonly [number, number]) => `M${px(p[0]).toFixed(1)} ${py(p[1]).toFixed(1)}h0`;

/* Seçili olmayan iki pazar tek path'te; seçili olan ayrı, çünkü kalınlığı ve
   rengi farklı ve üstte durması gerekiyor. */
const OFF_DOTS: Record<Country, string> = {
  dubai: dot(MARKS.ingiltere) + dot(MARKS.kktc),
  ingiltere: dot(MARKS.dubai) + dot(MARKS.kktc),
  kktc: dot(MARKS.dubai) + dot(MARKS.ingiltere),
};

/* Artı kıl. Dört ayrı kol olarak çiziliyor (sol, sağ, üst, alt) çünkü hepsi
   kesişim noktasından DIŞARI doğru çiziliyor: tek path olsaydı stroke-dasharray
   alt yollar boyunca sırayla ilerler ve kollar sırayla açılırdı. pathLength=1
   veriliyor, böylece dört kolun uzunlukları çok farklı olsa da aynı sürede
   varıyorlar — nişangâhın kilitlenmesi tek bir hareket olarak okunuyor. */
function crossArms(p: readonly [number, number]) {
  const cx = px(p[0]).toFixed(1);
  const cy = py(p[1]).toFixed(1);
  return [`M${cx} ${cy}H0`, `M${cx} ${cy}H${MAP_W}`, `M${cx} ${cy}V0`, `M${cx} ${cy}V${MAP_H}`];
}
const CROSS: Record<Country, string[]> = {
  dubai: crossArms(MARKS.dubai),
  ingiltere: crossArms(MARKS.ingiltere),
  kktc: crossArms(MARKS.kktc),
};

/* Izgara çizgileri. Küre siluetinin yerine geçen işaret bunlar: dikdörtgen bir
   plakanın üstünde enlem/boylam ağı, yani "harita" işareti. İnce olan (5°)
   yalnızca yakınlaşınca açılıyor, dünya görünümünde kareli deftere dönerdi. */
function graticule(stepLng: number, stepLat: number) {
  let d = "";
  for (let lng = -180; lng <= 180; lng += stepLng) d += `M${px(lng)} 0V${MAP_H}`;
  for (let lat = LAT_BOT; lat <= LAT_TOP; lat += stepLat) d += `M0 ${py(lat)}H${MAP_W}`;
  return d;
}
const GRAT_MAJOR = graticule(20, 20);
const GRAT_MINOR = graticule(5, 5);

/* --------------------------------------------------------------- yardımcılar */
const clamp = (lo: number, v: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp(0, (x - a) / (b - a), 1);
  return t * t * (3 - 2 * t);
};
/* Kamera için ease-in-out: gerçek bir harita uygulamasında da kadraj hızlanıp
   yavaşlar, sabit hızla kaymaz. */
const smootherstep = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/* Ölçek çubuğunda gösterilecek "yuvarlak" değerler. Harita ölçeği hiçbir zaman
   "1.783 km" demez; en yakın konuşulabilir sayıya oturur ve çubuğun boyu ona
   göre ayarlanır. */
const NICE_KM = [100, 200, 250, 500, 1000, 2000, 2500, 5000];
const TR_NUM = new Intl.NumberFormat("tr-TR");

type Cam = { lng: number; lat: number; span: number };

/* Dünya kadrajı. Boylamda merkez zaten önemsiz (360° tam plaka, aşağıdaki
   kenar kırpması onu 0'a oturtuyor); anlamlı olan enlem. */
const worldCam = (): Cam => ({ lng: 0, lat: WORLD_LAT, span: WORLD_SPAN });

/* Yakın kadraj: ülkeye ortala, sonra üç pazarın kutusu dışarı taşıyorsa merkezi
   geri it. Kutu kadraja hiç sığmıyorsa (çok dar/çok kısa bir sahne) kutunun
   ortasına oturtuluyor — kısıt karşılanamıyorsa en azından simetrik bozulsun. */
function nearCam(c: Country, sw: number, sh: number): Cam {
  const span = nearSpan(sw);
  const hDeg = span * (sh / sw);
  const m = MARKS[c];

  const loLng = BOX.lng1 + BOX_PAD_LNG - span / 2;
  const hiLng = BOX.lng0 - BOX_PAD_LNG + span / 2;
  const loLat = BOX.lat1 + BOX_PAD_LAT - hDeg / 2;
  const hiLat = BOX.lat0 - BOX_PAD_LAT + hDeg / 2;

  return {
    lng: loLng > hiLng ? (BOX.lng0 + BOX.lng1) / 2 : clamp(loLng, m[0], hiLng),
    lat: loLat > hiLat ? (BOX.lat0 + BOX.lat1) / 2 : clamp(loLat, m[1], hiLat),
    span,
  };
}

export default function HeroGlobeG1() {
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);
  const reduced = useReducedMotion() ?? false;

  const [settled, setSettled] = useState(false);
  /* Kameranın yakın kadrajda olup olmadığı. Yalnızca görünüm için: dünya
     kadrajında etiket tek satırlık bir künyeye iniyor. Sebebi hem ölçek —
     iki satırlık kart bütün dünyanın gösterildiği bir panelde kadrajın
     dörtte birini kaplıyor — hem de örtme: o büyüklükteki bir kart diğer iki
     pazarın işaretinin tam üstüne oturuyordu. Yakınlaşınca ikinci satır
     açılıyor; nokta ızgarasıyla aynı hikâye, yaklaşınca detay çözülüyor. */
  const [zoomed, setZoomed] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRefs = useRef<(SVGPathElement | null)[]>([]);
  const minorRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGRadialGradientElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const coordRef = useRef<HTMLSpanElement>(null);
  const scaleBarRef = useRef<HTMLSpanElement>(null);
  const scaleTxtRef = useRef<HTMLSpanElement>(null);

  /* Sahne ölçüsü. Yakın kadrajın yüksekliği piksel oranından geliyor, o yüzden
     ölçmeden tek kare çizilemez. */
  const size = useRef({ w: 0, h: 0 });
  const cam = useRef<Cam | null>(null);
  const from = useRef<Cam | null>(null);
  const to = useRef<Cam | null>(null);
  const t0 = useRef(0);
  const dur = useRef(0);
  const hump = useRef(0);
  const raf = useRef(0);
  const side = useRef("");
  const niceKm = useRef(0);

  /* Kameranın hangi kadrajda olduğu. Açılışta "world": sahne kendi kendine
     yaklaşmıyor, dünya haritası olarak duruyor ve ziyaretçi seçiciye
     dokunana kadar öyle kalıyor. */
  const mode = useRef<"world" | "near">("world");
  const countryRef = useRef(country);
  const reducedRef = useRef(reduced);
  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  /* Efektin içindeki uçuş fonksiyonuna dışarıdan tutamak. Mağaza aboneliği tek
     başına yetmiyor: zaten seçili ülkenin bayrağına gelindiğinde mağaza
     değişmez, ama kameranın yine de yaklaşması gerekir — "hiçbir şey olmadı"
     hissi tam da müşterinin şikâyet ettiği şey. */
  const flyRef = useRef<((c: Country) => void) | null>(null);

  const pick = useCallback(
    (c: Country) => {
      setCountry(c);
      flyRef.current?.(c);
      gtm("hero_map_country", { country: c });
    },
    [setCountry],
  );

  /* ---- ızgaraların üretimi: ilk boyamadan SONRA ---- */
  /* 45 bin noktanın çözülmesi + üç ızgaranın kurulması birkaç ms. Küçük ama
     hero'nun ilk boyamasının önünde durması için bir sebep yok, üstelik çıktı
     yüzlerce KB'lık dizeler. Efektte üretilip d niteliği doğrudan yazılıyor;
     React'in bu dizeleri her render'da yeniden karşılaştırması için de bir
     sebep yok. */
  useEffect(() => {
    buildLattices().forEach((l, i) => dotRefs.current[i]?.setAttribute("d", l.d));
  }, []);

  /* ---- kamera ---- */
  useEffect(() => {
    const stage = stageRef.current;
    const svg = svgRef.current;
    if (!stage || !svg) return;

    /* Odak kabartmasının yarıçapı kadrajla birlikte büyüyor, yani her
       yakınlıkta aynı oranda yumuşak kalıyor. Yalnızca %1'den fazla değişince
       yazılıyor: her karede gradyan niteliğine dokunmak boyayı gereksiz yere
       yeniden hesaplatır. */
    let glowR = 0;

    const draw = () => {
      const c = cam.current;
      const { w: sw, h: sh } = size.current;
      if (!c || sw < 1 || sh < 1) return;

      const w = c.span * K;
      const h = w / (sw / sh);

      /* Kadrajın plaka dışına taşmaması: taşarsa kenarda hiçbir şey söylemeyen
         boş bir şerit kalır. Sığmıyorsa ortalanıyor (plaka kadrajdan küçük —
         dar ekranda dünya görünümü tam olarak bu, harita panelin ortasında
         durur), sığıyorsa sınırlara yapıştırılıyor. */
      let x = px(c.lng) - w / 2;
      let y = py(c.lat) - h / 2;
      x = w >= MAP_W ? (MAP_W - w) / 2 : clamp(0, x, MAP_W - w);
      y = h >= MAP_H ? (MAP_H - h) / 2 : clamp(0, y, MAP_H - h);

      svg.setAttribute("viewBox", `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`);

      /* Ekran pikseli başına kullanıcı birimi. Ekranda sabit kalması gereken
         her kalınlık bununla çarpılıyor. vector-effect="non-scaling-stroke"
         kullanılmadı; canlı küre de aynı yolu deneyip geri dönmüş (globals.css
         içinde .sgl-* için "vector-effect: none"), çünkü her motor aynı
         sonucu vermiyor ve kalınlığı kendimiz yazınca ölçü kesin oluyor. */
      const u = w / sw;
      const st = svg.style;
      st.setProperty("--g1-u", `${u.toFixed(4)}`);

      /* Katman seçimi nokta ARALIĞINA bakıyor, yakınlaşma oranına değil: ölçüt
         "kaç kat yaklaştık" değil, "dokunun ekrandaki sıklığı hâlâ doğru mu".

         Geçiş bandı (3,2 → 4,4 px) ölçerek bulundu, tahminle değil. Bir
         katmanın alt sınırı şu: ekrandaki nokta aralığı bu bandın altına
         inince kıtaların şekli kayboluyor ve geriye düzenli bir tram deseni
         kalıyor — birinci turun "harita tanınmıyor" sorununun tam sebebi.
         Bandın her iki ucu da sahnenin karşılaştığı gerçek genişliklerde
         (≈390 / 753 / 1136 px) tek bir katmanın kesin kazanmasını sağlıyor;
         karışım yalnızca uçuş sırasında, geçerken görünüyor.

         KATMANLAR BİRBİRİNİ SÖNDÜRMÜYOR, ÜST ÜSTE BİNİYOR. İlk denemede
         karşılıklı çapraz geçiş vardı (biri açılırken diğeri kapanıyordu) ve
         geçiş anında harita gözle görülür biçimde soluyordu: iki yarı saydam
         katman üst üste gelince ortak noktalar bile tam örtücülüğe
         ulaşmıyordu. Oysa ızgaralar hizalı, yani kaba katmanın her noktası
         ince katmanda da var — kaba katmanı açık bırakıp ince katmanı ÜSTÜNE
         açmak hem sönmeyi tamamen kaldırıyor hem de doğru okumayı veriyor:
         nokta kaybolmuyor, aralara yenileri geliyor. */
      const pitch = STEPS.map((s) => (s * K) / u);
      const aFine = smoothstep(3.2, 4.4, pitch[2]);
      const aMid = smoothstep(3.2, 4.4, pitch[1]);
      const op = [1, aMid, aFine];
      for (let i = 0; i < 3; i++) {
        const el = dotRefs.current[i];
        if (el) el.style.opacity = `${op[i]}`;
      }
      /* Üç katman TEK bir nokta çapını paylaşıyor — paylaşmak zorundalar,
         çünkü hepsi aynı anda çizili. Çap, o an fiilen geçerli olan aralıktan
         geliyor: her katman açıldığında aralık yarıya iniyor, o yüzden üs
         olarak yazmak (0,5^açık katman sayısı) geçiş boyunca da sürekli bir
         değer veriyor. Oran sabit (%40), yani doku hangi yakınlıkta olursa
         olsun aynı sıklık/doluluk dengesinde görünüyor. Oran %34'ten %40'a
         çıkarıldı: aynı mürekkep miktarı seyrek ızgarada gözle daha SOLUK
         görünüyor, çünkü noktalar arasındaki siyah ayırt edilecek kadar
         genişliyor — ülke kadrajı yan yana konduğunda dünya kadrajından
         belirgin biçimde sönük duruyordu. */
      const pitchEff = pitch[0] * Math.pow(0.5, aMid + aFine);
      st.setProperty("--g1-dot", `${(clamp(1.6, pitchEff * 0.4, 3.6) * u).toFixed(3)}`);
      if (minorRef.current) minorRef.current.style.opacity = `${aFine}`;

      const r = w * 0.95;
      if (glowRef.current && Math.abs(r - glowR) > glowR * 0.01) {
        glowR = r;
        glowRef.current.setAttribute("r", r.toFixed(0));
      }

      /* Etiket SVG değil HTML: yakınlaşmayla birlikte büyümemesi gerekiyor ve
         metnin keskin kalması gerekiyor. Konumu her karede yazılıyor, çünkü
         uçuş sırasında işaret kadrajda kayıyor — bu React'in işi değil. */
      const m = MARKS[countryRef.current];
      const el = pinRef.current;
      if (el) {
        const fx = (px(m[0]) - x) / w;
        const fy = (py(m[1]) - y) / h;
        el.style.left = `${(fx * 100).toFixed(2)}%`;
        el.style.top = `${(fy * 100).toFixed(2)}%`;
        /* Kart, işaretin kadrajda BOŞ kalan köşesine açılıyor: yatayda geniş
           olan yana, dikeyde yine geniş olan yöne. Yatay eşik tam orta (Dubai
           sağda durduğu için kart sola açılmalı, yoksa panelden taşar); dikey
           eşik 0,55 çünkü altta şerit var ve kart oraya sarkarsa okunmuyor.
           Köşegen açılmanın ikinci bir işi daha var: kart artık işaretle aynı
           enlem bandında durmuyor, dolayısıyla yan taraftaki diğer pazarın
           işaretini örtmüyor. Nitelikler yalnızca değişince yazılıyor; her
           karede yazmak bütün alt ağacı yeniden stillendirirdi. */
        const s = `${fx > 0.5 ? "l" : "r"}${fy > 0.55 ? "u" : "d"}`;
        if (s !== side.current) {
          side.current = s;
          el.dataset.side = s[0];
          el.dataset.vert = s[1];
        }
      }

      const clat = LAT_TOP - (y + h / 2) / K;
      const clng = (x + w / 2) / K - 180;

      const co = coordRef.current;
      if (co) {
        co.textContent = `${Math.abs(clat).toFixed(1).replace(".", ",")}° ${clat < 0 ? "G" : "K"} · ${Math.abs(clng).toFixed(1).replace(".", ",")}° ${clng < 0 ? "B" : "D"}`;
      }

      /* Ölçek çubuğu. Kadrajın merkez enleminde bir ekran pikselinin kaç km
         ettiğini bulup, ~72 px'e en yakın yuvarlak km değerini seçiyor ve
         çubuğu tam o değere göre kısaltıp uzatıyor. Boylam derecesi kutuplara
         doğru daraldığı için cos(enlem) şart: onsuz İngiltere kadrajında ölçek
         %40 yanlış olurdu. Metin yalnızca yuvarlak değer değişince yazılıyor. */
      const bar = scaleBarRef.current;
      if (bar) {
        const kmPerPx = (u / K) * 111.32 * Math.cos((clat * Math.PI) / 180);
        const want = 72 * kmPerPx;
        let best = NICE_KM[0];
        for (const v of NICE_KM) {
          if (Math.abs(Math.log(v / want)) < Math.abs(Math.log(best / want))) best = v;
        }
        bar.style.width = `${clamp(34, best / kmPerPx, 128).toFixed(1)}px`;
        if (best !== niceKm.current) {
          niceKm.current = best;
          if (scaleTxtRef.current) scaleTxtRef.current.textContent = `${TR_NUM.format(best)} km`;
        }
      }
    };

    const tick = () => {
      raf.current = 0;
      const f = from.current;
      const t = to.current;
      if (!f || !t) return;

      const p = dur.current > 0 ? clamp(0, (performance.now() - t0.current) / dur.current, 1) : 1;
      const e = smootherstep(p);

      /* Ölçek logaritmik ilerliyor. Doğrusal karıştırma yakınlaşmayı sonda
         sıçratıyor, çünkü göz oranı görür, farkı değil: 140°'den 200°'ye
         gitmek 300°'den 360°'ye gitmekten çok daha büyük bir hareket. */
      const lg =
        Math.log(f.span) * (1 - e) + Math.log(t.span) * e + hump.current * Math.sin(Math.PI * p);

      cam.current = {
        lng: f.lng * (1 - e) + t.lng * e,
        lat: f.lat * (1 - e) + t.lat * e,
        span: Math.exp(lg),
      };
      draw();

      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setSettled(true);
    };

    const kick = () => {
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    /* Yeni bir hedefe uçuş. Nereden başladığı her zaman o ANDAKİ kamera: uçuş
       ortasında ülke değiştirilirse sahne sıçramaz, bulunduğu yerden devam
       eder. */
    const flyTo = (next: Cam, opts: { instant?: boolean; hump?: number } = {}) => {
      const start = cam.current ?? next;
      from.current = start;
      to.current = next;
      t0.current = performance.now();
      dur.current = reducedRef.current || opts.instant ? 0 : FLIGHT_MS;
      /* Uçuş ortasında kadrajı bir miktar AÇAN tümsek. Yalnızca ülkeden ülkeye
         geçişte var: orada kadraj genişliği değişmediği için hareket düz bir
         kaydırma olurdu ve harita "sürüklenmiş" gibi görünürdü. Hafifçe geri
         çekilip inmek gerçek harita uygulamalarının yaptığı şey. Dünyadan
         ülkeye inerken tümsek yok — orada zaten bir ölçek değişimi var. */
      hump.current = reducedRef.current ? 0 : (opts.hump ?? 0);

      /* Süresi sıfır olan "uçuş" (açılış ve hareket azaltma) bir kare
         beklemiyor, hemen çiziliyor. Sebebi görünürlük: sekme arka plandayken
         requestAnimationFrame hiç çalışmaz, o yüzden rAF'a bırakılan ilk kare
         sekme öne gelene kadar gelmez ve panel boş durur. Kamera zaten hedefte
         olduğu için beklemenin bir karşılığı da yok. */
      if (dur.current === 0) {
        cam.current = next;
        from.current = next;
        draw();
        setSettled(true);
        return;
      }

      if (!cam.current) cam.current = start;
      setSettled(false);
      kick();
    };

    const goNear = (c: Country) => {
      const { w, h } = size.current;
      if (w < 1 || h < 1) return;
      const next = nearCam(c, w, h);
      /* Aynı hedefe iki kez uçmamak için. Gerçek bir seçim iki yoldan birden
         geliyor: pick() doğrudan çağırıyor ve mağaza aboneliği de tetikleniyor
         (ikisi de gerekli — biri zaten seçili bayrağa gelmeyi, diğeri sayfanın
         başka yerindeki seçiciyi karşılıyor). Korumasız bırakılırsa ikinci
         çağrı uçuşu sıfırdan başlatıyor ve dünyadan inişe ait olmayan bir
         tümsek ekliyor. */
      const t = to.current;
      if (mode.current === "near" && t && t.lng === next.lng && t.lat === next.lat) return;
      const wasNear = mode.current === "near";
      mode.current = "near";
      setZoomed(true);
      flyTo(next, { hump: wasNear ? 0.16 : 0 });
    };
    flyRef.current = goNear;

    const measure = () => {
      const r = stage.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (w < 1 || h < 1) return false;
      const changed = w !== size.current.w || h !== size.current.h;
      size.current = { w, h };
      return changed;
    };

    /* Sahne esnek ölçüde, yani ancak ölçülerek bilinir. Açılış ilk geçerli
       ölçüye bağlı ve her zaman DÜNYA kadrajı: kamera kendi kendine hiçbir
       yere gitmiyor. */
    let booted = false;
    const boot = () => {
      booted = true;
      mode.current = "world";
      setZoomed(false);
      flyTo(worldCam(), { instant: true });
    };
    if (measure()) boot();

    /* Ölçü değişince kadraj da değişir (yakın kadrajın yüksekliği orandan
       geliyor). Yeniden uçmak yanlış olurdu — kullanıcı pencereyi sürüklerken
       sahne uçmamalı — o yüzden hedef anında güncellenip tek kare çiziliyor. */
    const ro = new ResizeObserver(() => {
      if (!measure()) return;
      if (!booted) {
        boot();
        return;
      }
      const next =
        mode.current === "near"
          ? nearCam(countryRef.current, size.current.w, size.current.h)
          : worldCam();
      to.current = next;
      if (!raf.current) {
        cam.current = next;
        from.current = next;
        dur.current = 0;
        draw();
      }
    });
    ro.observe(stage);

    /* Ülke değişimi bu efektin dışından da gelebilir (aynı sayfadaki fiyat
       bölümünün seçicisi aynı mağazayı kullanıyor). Ref üzerinden okunuyor ki
       efekt her seçimde yeniden kurulmasın — kurulsaydı ResizeObserver da her
       seçimde yeniden bağlanırdı. */
    const unsub = useOrtacStore.subscribe((s) => {
      if (s.country === countryRef.current) return;
      countryRef.current = s.country;
      goNear(s.country);
    });

    return () => {
      flyRef.current = null;
      unsub();
      ro.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, []);

  /* Odak kabartmasının MERKEZİ. Nokta katmanı düz bir gri yerine bu geçişle
     boyanıyor: seçili pazarın çevresi bir tık açık, uzağı bir tık koyu. Eski
     sürümde bu bir spot ışığıydı ve haritanın geri kalanını yutuyordu; artık
     iki uç birbirine yakın (#8e99a9 ↔ #59626f), yani kara her yerde okunuyor,
     kabartma yalnızca derinlik veriyor. Yarıçap kameradan geliyor (yukarıdaki
     draw), merkez buradan: biri yakınlıkla değişiyor, diğeri yalnızca ülkeyle. */
  const glow = useMemo(() => {
    const m = MARKS[country];
    return { cx: px(m[0]).toFixed(1), cy: py(m[1]).toFixed(1) };
  }, [country]);

  return (
    <div className="g1">
      {/* Küredeki kalıbın aynısı: bayrağın üstüne gelmek sahneyi çeviriyor,
          tıklama dokunmatik için duruyor. Mekanik değişmiyor, değişen sahne. */}
      <CountryPicker value={country} onSelect={pick} onHover={(c) => c && pick(c)} withLegend />

      <div
        ref={stageRef}
        className="g1-stage"
        data-settled={settled || undefined}
        data-zoomed={zoomed || undefined}
      >
        <svg
          ref={svgRef}
          className="g1-map"
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <radialGradient
              ref={glowRef}
              id="g1-glow"
              gradientUnits="userSpaceOnUse"
              cx={glow.cx}
              cy={glow.cy}
              r="1400"
            >
              <stop offset="0%" stopColor="#8e99a9" />
              <stop offset="45%" stopColor="#798392" />
              <stop offset="100%" stopColor="#59626f" />
            </radialGradient>
          </defs>

          {/* Plakanın kendi kenarı. Dünya kadrajında haritanın nerede bittiğini
              göstermek sahnenin en ucuz "bu bir harita" işareti; dar ekranda
              plaka panelden küçük kaldığı için de kenarın çizili olması şart,
              yoksa harita boşlukta yüzer. */}
          <rect className="g1-plate" x="0" y="0" width={MAP_W} height={MAP_H} />

          <path className="g1-grat g1-grat-major" d={GRAT_MAJOR} />
          <path ref={minorRef} className="g1-grat g1-grat-minor" d={GRAT_MINOR} />

          {/* d nitelikleri efektte yazılıyor, JSX'te değil. Sıra kabadan
              inceye; hepsi aynı boyayı paylaşıyor, aralarında yalnızca
              örtücülük değişiyor — ve o da JSX'te DEĞİL, kamera tarafından
              yazılıyor. Buraya bir style={"{ opacity }"} koymak cazip ama
              yanlış: React her render'da o nesneyi yeniden kurar ve kameranın
              elle yazdığı değeri geri alma riski doğar. Başlangıç değeri
              CSS'te (.g1-dots { opacity: 0 }), gerçek değer ilk karede. */}
          {STEPS.map((s, i) => (
            <path
              key={s}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="g1-dots"
            />
          ))}

          <path className="g1-area" d={AREA[country]} />

          {/* key={country}: ülke değişince grup yeniden kuruluyor, böylece
              kolların açılma animasyonu baştan oynuyor. */}
          <g className="g1-cross" key={country}>
            {CROSS[country].map((d) => (
              <path key={d} d={d} pathLength={1} />
            ))}
          </g>

          <path className="g1-mark g1-mark-off" d={OFF_DOTS[country]} />
          <path className="g1-mark g1-mark-on" d={dot(MARKS[country])} />
        </svg>

        {/* Nişangâh ve etiket. İkisi de HTML, çünkü yakınlaşmayla büyümemeleri
            gerekiyor: SVG içinde olsalardı halkanın çapı da metnin puntosu da
            kadrajla birlikte ölçeklenirdi. */}
        <div ref={pinRef} className="g1-pin" aria-live="polite">
          <span className="g1-pin-ring" aria-hidden="true" />
          {/* Yuva ayrı bir katman: kartın dikey ortalaması burada duruyor, ki
              motion kartın kendi transform'unu (y, scale) serbestçe
              kullanabilsin — ikisi aynı elemana yazılsaydı biri diğerini
              siler ve kart animasyon boyunca yerinden oynardı. */}
          <span className="g1-pin-slot">
            <AnimatePresence mode="wait">
              {settled && (
                <motion.span
                  key={country}
                  className="g1-pin-card"
                  initial={reduced ? false : { opacity: 0, y: 6, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {COUNTRY_NAMES[country]}
                  {/* FACTS.tag yerine structure: tag'lerden biri "Türkiye'ye
                      yakın" ve bu da haritanın az önce elediği kalkış noktası
                      varsayımını yazıyla geri getiriyordu. structure pazarın
                      kendisini anlatıyor, okuyanın nerede olduğunu değil. */}
                  <span>{FACTS[country].structure}</span>
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </div>

        {/* Alt şerit. Solda kadrajın merkez koordinatı, sağda ölçek çubuğu —
            ikisi de sahneyi bir harita aracı gibi okutuyor. Ölçek çubuğu
            ayrıca yakınlaşmaya bir büyüklük veriyor: dünya kadrajında
            2.500 km, ülke kadrajında 500-1.000 km. */}
        <div className="g1-hud" aria-hidden="true">
          <span ref={coordRef} className="g1-hud-coord" />
          <span className="g1-hud-scale">
            <span ref={scaleBarRef} className="g1-scale-bar" />
            <span ref={scaleTxtRef} className="g1-scale-txt" />
          </span>
        </div>
      </div>
    </div>
  );
}
