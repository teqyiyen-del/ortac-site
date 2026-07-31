"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import CountryPicker, { COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import { useOrtacStore, type Country } from "@/lib/store";
import { DOT_DELTAS, OUTLINES } from "@/lib/globeGeo";
import { FACTS } from "@/lib/brand";
import { gtm } from "@/lib/gtm";

/* ============================================================================
   HERO SAHNESİ — ADAY G1 · "DÜZ DÜNYA HARİTASI"

   Yerine geçmeye aday olduğu şey: src/components/HeroGlobe.tsx + SvgGlobe.tsx,
   yani hero'nun altındaki noktalı 3B küre. Canlı dosyalara dokunulmadı; bu
   dosya onların yanına konuyor.

   ------------------------------------------------------------------- TALEP
   Küre reddedildi: "o başka firmada da var". Mekanik aynen kalacak — üstte
   bayraklı ülke seçici, seçilince sahne o ülkeye gidiyor. Müşterinin kendi
   önerisi de netti: "dünyayı 3d şeklinde değil de, hani açık dünya haritası
   oluyor ya, direkt geniş, globe olmayan — onda aynı mantığı yapabiliriz.
   ülkelere göre oraya biraz zoom girer."

   ------------------------------------------- KÜRE TROPE'UNDAN NEDEN AYRILIYOR
   Küreyi küre yapan şey nokta bulutu değil, SİLUET: dairesel limb, ışığın
   kenara doğru sönmesi, dönerken kenardan kaybolan kara parçaları. Bunların
   üçü de burada yok. Sahne dikdörtgen bir PLAKA: kenarları düz, üstünde
   enlem/boylam ızgarası var, kamera dönmüyor — kaydırıyor ve yaklaşıyor.
   Yani hareket "gezegen döndü" değil, "haritada bir yere gidildi" okuması
   veriyor. Aynı veriyle çizilmiş olması bunu değiştirmiyor; değişen projeksiyon
   değil, sahnenin ne olduğu.

   -------------------------------------------------------------- VERİ VE ÖLÇEK
   Kaynak globeGeo.ts: 45.623 kara noktası, ardışık fark olarak, onda bir derece
   biriminde. Düz projeksiyon küreselden çok daha ucuz — x doğrudan boylam,
   y ters enlem, trigonometri yok.

   Ama 45.623 noktayı olduğu gibi basmak iki nedenle yanlış olurdu. Birincisi
   ağırlık. İkincisi ve asıl önemlisi görüntü: kaynak noktalar KÜRE üzerinde
   eş aralıklı (Fibonacci örneklemesi), yani düz haritada kutuplara doğru
   yatayda seyrelirler ve dizilim düzensizdir. Ekranda bu "bozuk tarama" gibi
   görünür.

   Bunun yerine noktalar bir IZGARAYA oturtuluyor: her kaynak noktası en yakın
   ızgara düğümünü işaretliyor, sonra o düğümler basılıyor. Çıktı düzenli bir
   nokta matrisi — düz noktalı haritanın istediği görüntü tam olarak bu — ve
   sayı büyük ölçüde düşüyor:

     2,0° ızgara (uzak katman) → 4.668 nokta
     1,0° ızgara (yakın katman) → 16.485 nokta

   İki katman var çünkü tek bir sıklık iki mesafeye birden yetmiyor. Dünya
   görünümünde 1° ızgara ekranda 3 px aralığa düşer ve kıtalar lapaya döner;
   ülke görünümünde 2° ızgara 20 px aralığa çıkar ve harita dağılır. Katmanlar
   arasında çapraz geçiş var ve geçiş ölçüsü nokta ARALIĞI: hangi katman
   ekranda ~5-6 px'in üstünde aralık veriyorsa o görünür. Böylece hangi
   ekranda, hangi yakınlıkta olursak olalım nokta dokusu hep aynı sıklıkta
   kalır. Tasarımın sabiti derece değil, piksel.

   İki ızgara hizalı seçildi (2° = 1°'nin katı), yani uzak katmanın her noktası
   yakın katmanda da bir düğüm. Geçiş sırasında noktalar yer değiştirmiyor,
   sadece aralara yenileri geliyor: "detay çözülüyor" okuması.

   Kaynak çözünürlüğü (~0,51° ortalama nokta aralığı) 1°'nin altına inmeye izin
   vermiyor; 0,5° denendi, kara içinde 13.382 delik açıyor. 1°'de kalan 453
   deliği tek geçişlik bir doldurma kapatıyor (dört komşusundan üçü kara olan
   boş hücre karaya çevriliyor).

   Toplam sahne: iki <path>, 21.153 nokta, 207 KB path dizesi (gzip 44 KB) —
   ama bu ağ üzerinden gelen bir yük değil, tarayıcıda üretilen bir dize.
   Bileşenin kendisi + CSS 36 KB kaynak; yeni veri, yeni bağımlılık yok,
   globeGeo.ts zaten pakette.

   Üretim mount sonrası BİR KEZ çalışıyor ve ölçüldüğünde 1,2-4,4 ms sürüyor
   (soğuk çalıştırma 4,4). Sonrası bedava: kamera her karede yalnızca viewBox'ı
   ve birkaç CSS değişkenini yazıyor, 21 bin noktanın hiçbirine dokunmuyor.
   Küre bunu yapamıyordu — orada projeksiyon JS'te olduğu için her kare 37 bin
   nokta yeniden hesaplanıyor.
   ========================================================================= */

/* ------------------------------------------------------------- harita plakası */
/* Derece başına kullanıcı birimi. 4 seçildi çünkü hem ızgara adımları (2° ve 1°)
   hem de plaka kenarları tam sayıya düşüyor — path dizesinde ondalık yok, ki
   21 bin nokta için bu dosyanın onda birini kurtarıyor. */
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

const STEP_FAR = 2;
const STEP_NEAR = 1;

/* ---------------------------------------------------------------- ızgaralar */
type Lattice = { d: string; count: number };
/* Modül düzeyinde önbellek: bileşen iki kez mount olsa da (React 18 strict mode
   geliştirmede tam olarak bunu yapar) 45 bin noktalık çözme ikinci kez
   çalışmasın. */
let LATTICES: { far: Lattice; near: Lattice } | null = null;

function buildLattices() {
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
       olduğu için bazı kara hücrelerine hiç örnek düşmüyor; bunlar ekranda
       kıtaların içinde tek tük eksik nokta olarak görünür ve dokuyu kirletir.
       Dört ortogonal komşusundan en az üçü kara olan boş hücre kara sayılıyor —
       kıyıyı şişirmeyecek kadar dar, delikleri kapatacak kadar geniş bir kural.
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
       "M x y h0" + yuvarlak uç. 21 bin nokta tek <path> paylaşıyor; her nokta
       için bir <circle> açmak DOM'u aynı işi yapmak için 21 bin düğüm
       taşımaya zorlardı. */
    let d = "";
    let count = 0;
    const unit = step * K; /* tam sayı: 8 veya 4 */
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (!grid[y * cols + x]) continue;
        count++;
        d += `M${x * unit} ${y * unit}h0`;
      }
    }
    return { d, count };
  };

  LATTICES = { far: make(STEP_FAR), near: make(STEP_NEAR) };
  return LATTICES;
}

/* ------------------------------------------------------------------ yerler */
/* Rotanın Türkiye ucu. Küredeki HOME ile aynı nokta; iki sahne yan yana
   karşılaştırılacağı için hikâye de aynı kalmalı. */
const HOME: readonly [number, number] = [28.9784, 41.0082];

const MARKS: Record<Country, readonly [number, number]> = {
  dubai: [55.2708, 25.2048],
  ingiltere: [-0.1278, 51.5074],
  kktc: [33.3823, 35.1856],
};

/* Kadraj: kamera merkezi hedef ile İstanbul arasında, hedefe yakın bir yerde.
   Tam hedefin üstüne oturtmak İngiltere'de kadrajın yarısını boş Atlantik
   yapıyordu; İstanbul'a doğru %30 kaydırmak hem rotanın iki ucunu da içeri
   alıyor hem de üç ülkede birden kendiliğinden dengeli bir kadraj veriyor.
   Elle seçilmiş üç ayrı merkez denendi, bu tek kural üçünü de yeniden üretti. */
const HOME_MIX = 0.3;

/* Ülke başına yakınlaşma farkı. globeGeo'daki ZOOM kullanılmadı: o katsayı
   kürede ülkenin YÜZEY ALANINA göre ayarlanmış, burada belirleyici olan
   kadrajda ne kadar deniz kaldığı. KKTC en dar kadrajı alıyor çünkü Kıbrıs
   küçük ve çevresi denizle dolu; İngiltere ortada; Dubai en geniş kadraj
   çünkü etrafındaki kara zaten dokuyu dolduruyor. */
const SPAN_F: Record<Country, number> = { dubai: 1.06, ingiltere: 0.94, kktc: 0.84 };

/* Nokta aralığı hedefi (CSS px). Sahnenin gerçek sabiti bu: kaç derece
   göründüğü ekrana göre değişiyor, nokta dokusunun sıklığı değişmiyor.
   Dar ekranda biraz sıklaştırılıyor, yoksa 390 px'lik bir sahnede kadraj o
   kadar dar bir coğrafyaya iner ki rotanın İstanbul ucu dışarıda kalır. */
const pitchWant = (w: number) => (w < 700 ? 6.9 : 9.0);

/* ------------------------------------------------------ statik geometri */
const ring = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${px(x).toFixed(1)} ${py(y).toFixed(1)}`).join("") + "Z";

const AREA: Record<Country, string> = {
  dubai: OUTLINES.dubai.map(ring).join(""),
  ingiltere: OUTLINES.ingiltere.map(ring).join(""),
  kktc: OUTLINES.kktc.map(ring).join(""),
};

/* Rota. Düz haritada iki nokta arası düz çizgi cansız durur; referansta da
   çekici olan şey noktalar arasındaki YAY'dı. Kontrol noktası orta noktadan
   dikey olarak kuzeye itiliyor — hangi yöne itileceği hesaplanıyor, sabit
   değil, çünkü İngiltere batıda ve elle verilen bir işaret orada yayı ters
   çevirirdi. */
function arcPath(to: readonly [number, number]) {
  const ax = px(HOME[0]);
  const ay = py(HOME[1]);
  const bx = px(to[0]);
  const by = py(to[1]);
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  let nx = dy / len;
  let ny = -dx / len;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const lift = len * 0.24;
  return `M${ax.toFixed(1)} ${ay.toFixed(1)}Q${((ax + bx) / 2 + nx * lift).toFixed(1)} ${((ay + by) / 2 + ny * lift).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`;
}

const ARC: Record<Country, string> = {
  dubai: arcPath(MARKS.dubai),
  ingiltere: arcPath(MARKS.ingiltere),
  kktc: arcPath(MARKS.kktc),
};

const dot = (p: readonly [number, number]) => `M${px(p[0]).toFixed(1)} ${py(p[1]).toFixed(1)}h0`;
const HOME_DOT = dot(HOME);
const OFF_DOTS: Record<Country, string> = {
  dubai: dot(MARKS.ingiltere) + dot(MARKS.kktc),
  ingiltere: dot(MARKS.dubai) + dot(MARKS.kktc),
  kktc: dot(MARKS.dubai) + dot(MARKS.ingiltere),
};

/* Izgara çizgileri. Küre siluetinin yerine geçen şey bunlar: dikdörtgen bir
   plakanın üstünde enlem/boylam ağı, yani "harita" işareti. İnce olan (5°)
   yalnızca yakınlaşınca açılıyor, dünya görünümünde 15 px aralığa düşüp
   kareli deftere dönerdi. */
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

type Cam = { lng: number; lat: number; span: number };

/* Kaç derece görüneceği: sahne genişliği bölü hedef nokta aralığı, ülke
   katsayısıyla çarpılıp makul bir aralığa kırpılıyor. Üst sınır 150 çünkü çok
   geniş bir monitörde kural tek başına bırakılırsa ülke yeniden küçülür. */
function viewFor(c: Country, w: number): Cam {
  const span = clamp(34, (w / pitchWant(w)) * SPAN_F[c], 150);
  const m = MARKS[c];
  return {
    lng: m[0] * (1 - HOME_MIX) + HOME[0] * HOME_MIX,
    lat: m[1] * (1 - HOME_MIX) + HOME[1] * HOME_MIX,
    span,
  };
}

const FLIGHT_MS = 980;

export default function HeroGlobeG1() {
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);
  const reduced = useReducedMotion() ?? false;

  const [settled, setSettled] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const farRef = useRef<SVGPathElement>(null);
  const nearRef = useRef<SVGPathElement>(null);
  const minorRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGRadialGradientElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const coordRef = useRef<HTMLSpanElement>(null);

  /* Sahne ölçüsü. Kadraj genişliği piksel cinsinden ölçüye bağlı (nokta aralığı
     hedefi öyle diyor), o yüzden ölçmeden tek kare çizilemez. */
  const size = useRef({ w: 0, h: 0 });
  const cam = useRef<Cam | null>(null);
  const from = useRef<Cam | null>(null);
  const to = useRef<Cam | null>(null);
  const t0 = useRef(0);
  const dur = useRef(0);
  const hump = useRef(0);
  const raf = useRef(0);
  const side = useRef("");

  const countryRef = useRef(country);
  const reducedRef = useRef(reduced);
  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  const pick = useCallback(
    (c: Country) => {
      setCountry(c);
      gtm("hero_map_country", { country: c });
    },
    [setCountry],
  );

  /* ---- ızgaraların üretimi: ilk boyamadan SONRA ---- */
  /* 45 bin noktanın çözülmesi + iki ızgaranın kurulması ölçüldüğünde 1,2-4,4
     ms. Küçük ama hero'nun ilk boyamasının önünde durması için bir sebep yok,
     üstelik çıktı 207 KB'lık iki dize. Efektte üretilip d niteliği doğrudan
     yazılıyor; React'in bu iki dizeyi her render'da yeniden karşılaştırması
     için de bir sebep yok. */
  useEffect(() => {
    const { far, near } = buildLattices();
    farRef.current?.setAttribute("d", far.d);
    nearRef.current?.setAttribute("d", near.d);
  }, []);

  /* ---- kamera ---- */
  useEffect(() => {
    const stage = stageRef.current;
    const svg = svgRef.current;
    if (!stage || !svg) return;

    /* Odak parlamasının yarıçapı kadrajla birlikte büyüyor, yani vinyet her
       yakınlıkta aynı oranda sertlikte kalıyor. Yalnızca %1'den fazla
       değişince yazılıyor: her karede gradyan niteliğine dokunmak boyayı
       gereksiz yere yeniden hesaplatır. */
    let glowR = 0;

    const draw = () => {
      const c = cam.current;
      const { w: sw, h: sh } = size.current;
      if (!c || sw < 1 || sh < 1) return;

      const w = c.span * K;
      const h = w / (sw / sh);

      /* Kadrajın plaka dışına taşmaması: taşarsa kenarda hiçbir şey söylemeyen
         siyah bir şerit kalır ve bu hata gibi görünür. Sığmıyorsa ortalanıyor,
         sığıyorsa sınırlara yapıştırılıyor — her harita görüntüleyicisinin
         yaptığı şey. */
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
      const pitchNear = (STEP_NEAR * K) / u;
      const pitchFar = (STEP_FAR * K) / u;

      /* Katman geçişi nokta ARALIĞINA bakıyor, yakınlaşma oranına değil: ölçüt
         "kaç kat yaklaştık" değil, "dokunun ekrandaki sıklığı hâlâ doğru mu". */
      const nearOn = smoothstep(4.6, 6.4, pitchNear);

      const st = svg.style;
      st.setProperty("--g1-u", `${u.toFixed(4)}`);
      st.setProperty("--g1-dot-far", `${(clamp(2, pitchFar * 0.33, 3.6) * u).toFixed(3)}`);
      st.setProperty("--g1-dot-near", `${(clamp(2, pitchNear * 0.33, 3.6) * u).toFixed(3)}`);
      if (farRef.current) farRef.current.style.opacity = `${1 - nearOn}`;
      if (nearRef.current) nearRef.current.style.opacity = `${nearOn}`;
      if (minorRef.current) minorRef.current.style.opacity = `${nearOn}`;

      const r = w * 0.62;
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
        /* Kart, işaretin kadrajda BOŞ kalan yanına açılıyor — eşik tam orta,
           yani her zaman geniş olan taraf. Dar sahnede fark belirleyici:
           KKTC'de kart yanlış tarafa açılırsa kenardan taşıyor. Uçuş
           sırasında kart zaten görünmediği için yön değişimi göze çarpmıyor.
           Nitelik yalnızca değişince yazılıyor; her karede yazmak bütün alt
           ağacı yeniden stillendirirdi. */
        const s = fx > 0.5 ? "l" : "r";
        if (s !== side.current) {
          side.current = s;
          el.dataset.side = s;
        }
      }

      const co = coordRef.current;
      if (co) {
        const clat = LAT_TOP - (y + h / 2) / K;
        const clng = (x + w / 2) / K - 180;
        co.textContent = `${Math.abs(clat).toFixed(1).replace(".", ",")}° ${clat < 0 ? "G" : "K"} · ${Math.abs(clng).toFixed(1).replace(".", ",")}° ${clng < 0 ? "B" : "D"}`;
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
         sıçratıyor, çünkü göz oranı görür, farkı değil: 40°'den 60°'ye gitmek
         200°'den 220°'ye gitmekten çok daha büyük bir hareket.

         Üstüne bir tümsek: uçuş ortasında kadraj bir miktar AÇILIYOR. İki
         işi birden yapıyor. Kamera hareketi olarak doğru olan bu — harita
         uygulamaları da uzak iki noktayı bağlarken geri çekilip iner. Ve
         geri çekilme sırasında nokta aralığı düşüp uzak katmana geçiliyor,
         yani araya dünya görünümü giriyor: seçim yapıldığında sahne bir an
         için bütün haritayı gösterip sonra yeni ülkeye iniyor. */
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
    const flyTo = (next: Cam, opts: { intro?: boolean }) => {
      const start =
        cam.current ??
        /* Açılış. Sahne dünya görünümünden başlayıp ülkeye iniyor: hem
           haritanın "geniş dünya haritası" olduğunu bir kez söylüyor, hem de
           yakınlaşmanın ne yaptığını hiç kimse tıklamadan gösteriyor. */
        { lng: next.lng, lat: next.lat, span: Math.min(360, next.span * 2.7) };

      from.current = start;
      to.current = next;
      t0.current = performance.now();
      dur.current = reducedRef.current ? 0 : FLIGHT_MS;
      hump.current = reducedRef.current || opts.intro ? 0 : 0.3;
      if (!cam.current) cam.current = start;
      setSettled(false);
      kick();
    };

    const measure = () => {
      const r = stage.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (w < 1 || h < 1) return false;
      const changed = w !== size.current.w || h !== size.current.h;
      size.current = { w, h };
      return changed;
    };

    /* Sahne esnek yükseklikte, yani ölçüsü ancak ölçülerek bilinir ve ölçü
       bilinmeden tek kare çizilemez — kadrajın kaç derece olacağı doğrudan
       piksel genişliğinden geliyor. Açılış bu yüzden ilk geçerli ölçüye
       bağlanmış durumda. */
    let booted = false;
    if (measure()) {
      booted = true;
      flyTo(viewFor(countryRef.current, size.current.w), { intro: true });
    }

    /* Ölçü değişince kadraj genişliği de değişir. Yeniden uçmak yanlış olurdu
       — kullanıcı pencereyi sürüklerken sahne uçmamalı — o yüzden hedef
       anında güncellenip tek kare çiziliyor. */
    const ro = new ResizeObserver(() => {
      if (!measure()) return;
      const next = viewFor(countryRef.current, size.current.w);
      if (!booted) {
        booted = true;
        flyTo(next, { intro: true });
        return;
      }
      to.current = next;
      if (!raf.current) {
        /* uçuş bitmişse: yeni hedefe otur ve bir kare çiz */
        cam.current = next;
        from.current = next;
        dur.current = 0;
        draw();
      }
    });
    ro.observe(stage);

    /* Ülke değişimi bu efektin dışından geliyor; ref üzerinden okunuyor ki
       efekt her seçimde yeniden kurulmasın (kurulsaydı ResizeObserver da her
       seçimde yeniden bağlanırdı). */
    const unsub = useOrtacStore.subscribe((s) => {
      if (s.country === countryRef.current) return;
      countryRef.current = s.country;
      /* Sahne henüz ölçülmediyse uçacak bir kadraj da yok; açılış zaten ilk
         geçerli ölçüde ve o anki ülkeyle başlayacak. */
      if (size.current.w < 1) return;
      flyTo(viewFor(s.country, size.current.w), {});
    });

    return () => {
      unsub();
      ro.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, []);

  /* Odak parlamasının MERKEZİ. Nokta katmanı düz bir gri yerine bu geçişle
     boyanıyor: hedefin çevresi açık, kadrajın kenarları koyu. Küredeki
     vinyetin yaptığı işi yapıyor — bakışı bir yere çekmek — ama küreselliği
     ima etmeden, çünkü merkezi kadrajın ortası değil ÜLKE'nin kendisi.
     Yarıçap kameradan geliyor (yukarıdaki draw), merkez buradan: biri
     yakınlıkla değişiyor, diğeri yalnızca ülkeyle. */
  const glow = useMemo(() => {
    const m = MARKS[country];
    return { cx: px(m[0]).toFixed(1), cy: py(m[1]).toFixed(1) };
  }, [country]);

  return (
    <div className="g1">
      {/* Küredeki kalıbın aynısı: bayrağın üstüne gelmek sahneyi çeviriyor,
          tıklama dokunmatik için duruyor. Mekanik değişmiyor, değişen sahne. */}
      <CountryPicker value={country} onSelect={pick} onHover={(c) => c && pick(c)} withLegend />

      <div ref={stageRef} className="g1-stage" data-settled={settled || undefined}>
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
              r="600"
            >
              <stop offset="0%" stopColor="#9ba5b3" />
              <stop offset="42%" stopColor="#7c8693" />
              <stop offset="100%" stopColor="#363c44" />
            </radialGradient>
          </defs>

          <path className="g1-grat g1-grat-major" d={GRAT_MAJOR} />
          <path ref={minorRef} className="g1-grat g1-grat-minor" d={GRAT_MINOR} />

          {/* d nitelikleri efektte yazılıyor, JSX'te değil */}
          <path ref={farRef} className="g1-dots g1-dots-far" />
          <path ref={nearRef} className="g1-dots g1-dots-near" />

          <path className="g1-area" d={AREA[country]} />

          <g className="g1-route">
            <path className="g1-route-base" d={ARC[country]} />
            <path className="g1-route-run" d={ARC[country]} />
          </g>

          <path className="g1-mark g1-mark-off" d={OFF_DOTS[country]} />
          <path className="g1-mark g1-mark-home" d={HOME_DOT} />
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
                  <span>{FACTS[country].tag}</span>
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </div>

        {/* Alt şerit. Koordinat okuması sahneyi bir harita aracı gibi
            okutuyor — küre trope'undan uzaklaşmanın en ucuz ve en açık
            işareti. Rota satırı da yayın ne anlattığını yazıyla söylüyor. */}
        <div className="g1-hud" aria-hidden="true">
          <span ref={coordRef} className="g1-hud-coord" />
          <span className="g1-hud-route">İstanbul → {COUNTRY_NAMES[country]}</span>
        </div>

        <span className="g1-fade" aria-hidden="true" />
      </div>
    </div>
  );
}
