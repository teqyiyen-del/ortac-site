"use client";

import { useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import CountryPicker, { COUNTRY_NAMES, COUNTRY_ORDER } from "@/components/shared/CountryPicker";
import { FACTS } from "@/lib/brand";
import { useOrtacStore, type Country } from "@/lib/store";
import { gtm } from "@/lib/gtm";

/* ============================================================================
   HERO SAHNESİ — ADAY G6 · "ÜSTTEN"
   CSS: src/app/css/lab-g6.css (ad alanı .g6-)

   -------------------------------------------------------------- TEK CÜMLEYLE

   Diğer bütün adaylar yatay bakıyor. Bu aday tam tepeden bakıyor ve baktığı şey
   gezegen değil, bir VAZİYET PLANI: bir mahalle, birkaç ada, birkaç parsel.

   ------------------------------------------------------------------ NEDEN

   Beğenilen çekirdek şuydu: "ülkeye göre değişen ve bunu hissettiren" sahne.
   G2 bunu siluetle, G3 kapıyla yapıyor. İkisi de göz hizasında duruyor. Tepeden
   bakınca ise bambaşka bir bilgi açığa çıkıyor: bir şirketin oturduğu DOKU.

   Üç ülkede bu doku birbirine hiç benzemiyor ve fark tepeden bir saniyede
   okunuyor:

     Dubai      · planlı serbest bölge ızgarası. Her parsel aynı ölçüde, her
                  sokak aynı genişlikte, cetvelle çizilmiş. Aralarda henüz
                  yapılmamış, altyapısı hazır boş parseller (kesikli) —
                  serbest bölgenin en dürüst detayı budur.
     İngiltere  · yüzyıllar içinde birikmiş sokak dokusu. Ada dediğin şey
                  avlusunu ortada bırakan kapalı bir yapı halkası; sokaklar
                  ızgara değil, adaların arasında kalan boşluk. Sıra evlerin
                  ayırma duvarları cepheyi tarak gibi bölüyor.
     KKTC       · araziye yayılan seyrek yerleşim. Izgara yok, hizalanma yok:
                  yapılar eğik oturuyor, arsa sınırları dolanıyor, eş yükselti
                  eğrileri sayfayı boydan boya geçiyor. Sayfanın çoğu boş.

   Bunun sitenin anlattığı işle doğrudan bağı var: "serbest bölge mi mainland
   mi" ayrımı zaten planlı doku ile yerleşik doku arasındaki ayrım. Yani çizim
   süsleme değil, sitenin cümlesinin resmi.

   ----------------------------------------------- SABİT NOKTA, DEĞİŞEN ÇEVRE

   Adayın asıl mekaniği bu. Vurgulanan parsel HER ÜLKEDE aynı yerde: tuvalin
   tam ortasında (x=1400). Ülke değişince işaret kıpırdamıyor, ETRAFI değişiyor.
   "Şirketiniz aynı şirket; değişen, içine oturduğu doku" cümlesi tek bir görsel
   hamleyle kuruluyor. Ortadaki nokta viewBox'ın da tam ortası olduğu için
   ekranın %50'sine birebir denk geliyor: HTML balon `left:50%` ile hiçbir ölçüm
   yapmadan çizimin üstüne oturuyor, hangi genişlikte olursa olsun.

   ------------------------------------------------------- HARİTAYA KAYMAMA

   Bu aday tepeden baktığı için haritaya kayma riski en yüksek olan. Konan
   kırmızı çizgi tek ve kesin: HİÇBİR YERDE bir ülke ya da bölge, tanınabilir
   coğrafi şekliyle çizilmiyor. Somut karşılıkları:

     · Kıyı çizgisi, su kütlesi, ada, körfez YOK. Hiç su çizilmedi — bir kıyı
       parçası vaziyet planı ölçeğinde bile "harita" okunma riski taşıyor.
     · Sınır, enlem/boylam, projeksiyon, nokta bulutu, rota oku YOK.
     · Tanınabilir dönüm noktası binası YOK; hiçbir yapı gerçek bir yapının
       ayak izi değil.
     · Gerçek bir adres işaret edilmiyor. Doku TEMSİLÎ ve antette bunu yazıyor.
     · Ölçek çubuğu tam olarak bu yüzden var: "0 — 100 m" yazan bir çizim
       harita olamaz. Ölçeğin metre cinsinden ilan edilmesi, sahnenin haritaya
       en uzak durduğu tek hamle. Üç ülkede ölçek de farklı, çünkü dokunun
       tanesi gerçekten farklı: Dubai'nin parseli 60 m, Londra'nın sıra evi 6 m.

   ----------------------------------------------------------------- MEKANİK

   Müşterinin şartı korunuyor: seçici yukarıda, sahne ona cevap veriyor. Seçici
   paylaşılan CountryPicker — yani gerçek tablist, klavyeyle sürülebilir, hover
   da seçiyor (G2'deki davranışın aynısı).

   Geçiş, kayma ya da dönme değil — bir planın ÇİZİLMESİ. Katmanlar sırayla
   geliyor: önce zemin, sonra parsel çizgileri kendini çiziyor (stroke-dashoffset),
   sonra yapılar oturuyor, en son işaret kilitleniyor. Pafta değiştirilmiyor,
   yeniden çiziliyor. Bu ne G2'nin kaydırması ne G3'ün duvarı.

   Boştayken sahne ölmüyor: ana yollarda trafik akıyor. Tepeden bakınca trafik
   bir kısa çizgi dizisidir ve ritmi ülkeye göre gerçekten değişiyor —
   Dubai'de uzun ve hızlı, Londra'da kısa ve sık ama yavaş, KKTC'de on beş
   saniyede bir tek araç. Bu, dokudan sonra "yeri hissettiren" ikinci şey.

   ------------------------------------------------------------------ TEKNİK

   HİDRASYON. Doku üretiliyor ama Math.random() kullanılmıyor: sunucu ile
   istemci farklı sayı üretirse farklı `d` niteliği basılır ve React hidrasyonda
   çakışır. Bütün rastgelelik modül düzeyinde, sabit tohumlu bir LCG'den
   geliyor ve çarpma Math.imul ile yapılıyor — tam 32-bit tamsayı çarpımı, her
   motorda birebir aynı dizi. Dönme açıları da Math.sin/cos ile değil, elle
   yazılmış (cos, sin) tablosundan okunuyor: trigonometrik fonksiyonların son
   bitleri ECMAScript'te motor bağımlı ve tek bir bit farkı yuvarlamadan
   sonra farklı bir string üretebilir. Bütün koordinatlar tek ondalığa
   yuvarlanıyor.

   HAREKET AZALTMA. `useReducedMotion` yalnızca balonun geçiş süresini
   kısıyor; CSS animasyonlarının tamamı @media (prefers-reduced-motion) ile
   kapatılıyor. Böylece render edilen ağaçta tek bir nitelik bile değişmiyor —
   sunucu HTML'i ile istemci HTML'i birebir aynı.

   DÜĞÜM SAYISI. Her görsel katman TEK bir <path>: kırk yapı kırk <rect> değil,
   kırk alt yoldan oluşan bir yol. Üç plan aynı anda ağaçta duruyor (biri
   görünür, ikisi opaklık 0) ve toplamı 47 SVG düğümü — G3'ün kapı duvarı 180
   düğümdü. Aynı sebeple katman başına animasyon da tek elemana uygulanıyor:
   üç yüz yapıyı ayrı ayrı değil, tek bir yolu soldurmak yetiyor.

   KIRPMA. Tuval 2800×400 sabit oranda ve yüksekliğe kilitli; sahne kutusunun
   oranı ne olursa olsun dikey kırpma matematiksel olarak imkânsız. Dar ekranda
   yanlardan kırpılıyor ve merkez hep görünüyor — vurgulanan parsel de zaten
   tam merkezde.
   ========================================================================= */

/* ------------------------------------------------------------------ tuval */
const SHEET_W = 2800;
const SHEET_H = 400;
/** işaretin merkezi = tuvalin merkezi. HTML balonun `left:50%`i buraya denk. */
const MID_X = SHEET_W / 2;

/* --------------------------------------------------------- çizim yardımı */

/** Tek ondalık. Kayan nokta artıklarını siliyor, string kısalıyor. */
const n = (v: number) => Math.round(v * 10) / 10;

/** dikdörtgen alt yolu — saat yönünde (dolgu kuralı nonzero ile birleşsin) */
const R = (x: number, y: number, w: number, h: number) =>
  `M${n(x)} ${n(y)}h${n(w)}v${n(h)}h${n(-w)}z`;

/** daire alt yolu. sweep=1: saat yönü — dikdörtgenlerle aynı sarım, yoksa
 *  nonzero kuralında üst üste binen yerler delik oluyor. */
const DOT = (cx: number, cy: number, r: number) =>
  `M${n(cx - r)} ${n(cy)}a${r} ${r} 0 1 1 ${n(2 * r)} 0a${r} ${r} 0 1 1 ${n(-2 * r)} 0z`;

const HL = (x1: number, y: number, x2: number) => `M${n(x1)} ${n(y)}H${n(x2)}`;
const VL = (x: number, y1: number, y2: number) => `M${n(x)} ${n(y1)}V${n(y2)}`;

/** yatay gidişli yumuşak eğri (yol ekseni, eş yükselti) */
function smooth(pts: readonly (readonly [number, number])[]) {
  let d = `M${n(pts[0][0])} ${n(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const m = (x0 + x1) / 2;
    d += `C${n(m)} ${n(y0)} ${n(m)} ${n(y1)} ${n(x1)} ${n(y1)}`;
  }
  return d;
}

/** dikey gidişli yumuşak eğri (yan sokak, patika, arsa sınırı) */
function smoothV(pts: readonly (readonly [number, number])[]) {
  let d = `M${n(pts[0][0])} ${n(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const m = (y0 + y1) / 2;
    d += `C${n(x0)} ${n(m)} ${n(x1)} ${n(m)} ${n(x1)} ${n(y1)}`;
  }
  return d;
}

/* Sabit tohumlu üreteç. Math.random() YASAK: sunucu ve istemci farklı doku
   üretir, `d` nitelikleri tutmaz, hidrasyon çakışır. Math.imul tam 32-bit
   tamsayı çarpımı olduğu için bu dizi her motorda birebir aynı. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* Dönme açıları tablo. Math.cos/sin ECMAScript'te motor bağımlı (son bitleri
   şart koşulmamış) ve tek bit farkı yuvarlamadan sonra farklı bir koordinat
   yazabilir. Elle yazılmış (cos, sin) çiftleriyle çarpma tamamen belirlenimli. */
const ROT: readonly (readonly [number, number])[] = [
  [1, 0],
  [0.996, 0.087],
  [0.985, 0.174],
  [0.966, 0.259],
  [0.94, 0.342],
  [0.999, -0.052],
  [0.995, -0.105],
  [0.978, -0.208],
  [0.951, -0.309],
  [0.988, -0.156],
];

/** eğik oturan dikdörtgen — tek alt yol, saat yönünde */
function quad(cx: number, cy: number, w: number, h: number, k: number) {
  const [c, s] = ROT[k % ROT.length];
  const hw = w / 2;
  const hh = h / 2;
  const p = (dx: number, dy: number) => `${n(cx + dx * c - dy * s)} ${n(cy + dx * s + dy * c)}`;
  return `M${p(-hw, -hh)}L${p(hw, -hh)}L${p(hw, hh)}L${p(-hw, hh)}z`;
}

/** düzenli ağaç dizisi (hurma sırası, zeytinlik) — dikimde ızgara vardır */
function grove(cx: number, cy: number, cols: number, rows: number, pitch: number, k: number) {
  const [c, s] = ROT[k % ROT.length];
  const out: string[] = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const dx = (i - (cols - 1) / 2) * pitch;
      const dy = (j - (rows - 1) / 2) * pitch;
      out.push(DOT(cx + dx * c - dy * s, cy + dx * s + dy * c, 2.6));
    }
  }
  return out;
}

/** nişangâh: işaretin dört köşesi. Çerçevenin tamamını çizmek "kutu" oluyor,
 *  köşeler "hedef" oluyor — plan üzerinde bir parseli göstermenin dili bu. */
function reticle(x: number, y: number, w: number, h: number, o = 10, t = 15) {
  const X0 = x - o;
  const Y0 = y - o;
  const X1 = x + w + o;
  const Y1 = y + h + o;
  return (
    `M${n(X0)} ${n(Y0 + t)}V${n(Y0)}H${n(X0 + t)}` +
    `M${n(X1 - t)} ${n(Y0)}H${n(X1)}V${n(Y0 + t)}` +
    `M${n(X1)} ${n(Y1 - t)}V${n(Y1)}H${n(X1 - t)}` +
    `M${n(X0 + t)} ${n(Y1)}H${n(X0)}V${n(Y1 - t)}`
  );
}

/* ---------------------------------------------------------------- şema */

type Plan = {
  /** tam sayfa taban dolgusu — yalnız Londra'da var: orada zemin YOLDUR */
  base?: string;
  /** ada zeminleri (yolun içinden oyulan kara parçaları) */
  land?: string;
  /** dolgu olarak çizilen yol yüzeyi */
  road?: string;
  /** kalın konturla çizilen tek şeritli yol */
  lane?: string;
  /** kesikli: stabilize yol, patika */
  track?: string;
  /** parsel çizgileri — geçişte kendini çizen katman bu */
  lot?: string;
  /** kesikli: boş parsel, arsa sınırı */
  dash?: string;
  green?: string;
  tree?: string;
  /** yapı ayak izleri */
  build?: string;
  /** yapıda delik gerekiyor mu (Londra'nın avlulu halkaları) */
  buildEO?: boolean;
  /** ada içine giren dar aralık — yapının üstünden yol rengiyle geçiyor */
  cut?: string;
  /** ince detay: park çizgisi, ayırma duvarı, istinat duvarı */
  detail?: string;
  /** eş yükselti eğrileri */
  contour?: string;
  /** trafik eksenleri */
  flow: readonly string[];
  /** vurgulanan ayak izi: [x, y, genişlik, yükseklik] */
  markBox: readonly [number, number, number, number];
  /** ölçek çubuğunun karşılığı (çubuk her zaman 200 birim) */
  scale: string;
  /** antette yazan doku tanımı */
  texture: string;
};

/* ============================================================================
   DUBAI — PLANLI IZGARA

   Ölçek: 200 birim = 100 m, yani 1 birim = 0,5 m. Parsel 120 birim = 60 m,
   ana bulvar 48 birim = 24 m, yapı 96×48 birim = 48×24 m. Serbest bölgede bir
   birim depo/ofis parselinin gerçek mertebesi bu.

   Izgara elle değil formülle çiziliyor, çünkü fikrin kendisi bu: burada hiçbir
   şey tesadüf değil, her şey modüle oturuyor. Sokak ekseni 170 + i·260,
   ada 240 birim, ada başına iki eşit parsel. i=4'ün B parselinin merkezi tam
   1400 — yani tuvalin merkezi — ve vurgulanan parsel orası.
   ========================================================================== */

const D_SX = Array.from({ length: 11 }, (_, i) => 170 + i * 260);
const D_ROWS = [
  { y0: 26, y1: 150, by: 44, bh: 48 },
  { y0: 172, y1: 290, by: 206, bh: 48 },
  /* üçüncü sıra sayfanın alt kenarında kesiliyor: plan paftada bitmez */
  { y0: 340, y1: 400, by: 356, bh: 44 },
];
/* Döner kavşak — Körfez'in planlı dokusunda ızgaradan sonraki ikinci imza.
   Ekseni 1730 (yani X_6): merkeze yakın, çünkü dar ekranda kadraj merkeze
   kilitleniyor ve kavşak görünmese Dubai dokusu yalnız ızgaradan ibaret
   kalıyor. Sol uçta denendi ve antetin arkasında kaldı. */
const D_RB = { x: 1730, y: 316, r: 48 };

const dRoad: string[] = [
  R(0, 6, SHEET_W, 20),
  R(0, 150, SHEET_W, 22),
  R(0, 292, SHEET_W, 48),
  DOT(D_RB.x, D_RB.y, D_RB.r),
];
for (const x of D_SX) dRoad.push(R(x - 10, 0, 20, SHEET_H));

/* Refüj kavşakta kesiliyor. Tek parça çizilseydi yeşil katman yol katmanının
   üstünde olduğu için kavşağın ortasından geçen bir şerit bırakıyordu. */
const dGreen: string[] = [
  R(0, 308, D_RB.x - D_RB.r - 8, 16),
  R(D_RB.x + D_RB.r + 8, 308, SHEET_W - (D_RB.x + D_RB.r + 8), 16),
  DOT(D_RB.x, D_RB.y, 24),
];

/* Hurma sırası. Sekizgen için (cos, sin) elle yazıldı; 0,707 = √2/2. */
const OCT: readonly (readonly [number, number])[] = [
  [1, 0],
  [0.707, 0.707],
  [0, 1],
  [-0.707, 0.707],
  [-1, 0],
  [-0.707, -0.707],
  [0, -1],
  [0.707, -0.707],
];
const dTree: string[] = [];
for (let x = 30; x < SHEET_W; x += 62) {
  if (x > D_RB.x - 82 && x < D_RB.x + 82) continue;
  dTree.push(DOT(x, 316, 3.2));
}
for (const [c, s] of OCT) dTree.push(DOT(D_RB.x + c * 35, D_RB.y + s * 35, 3.2));

const dLot: string[] = [];
const dBuild: string[] = [];
const dDash: string[] = [];
const dPark: string[] = [];
for (let i = 0; i < 10; i++) {
  const bx = 180 + i * 260;
  for (let ri = 0; ri < D_ROWS.length; ri++) {
    const r = D_ROWS[ri];
    dLot.push(VL(bx + 120, r.y0, r.y1));
    dLot.push(HL(bx, r.y0, bx + 240));
    dLot.push(HL(bx, r.y1, bx + 240));

    /* Birkaç adada iki parsel birleşip tek büyük depoya dönüşüyor. Izgara
       katı, kullanımı değil — serbest bölgede parsel birleştirmek olağan. */
    if (ri === 0 && i % 4 === 2) {
      dBuild.push(R(bx + 14, r.by, 212, r.bh));
      continue;
    }

    for (const p of [0, 1]) {
      const cx = bx + 60 + p * 120;
      /* vurgulanan parsel ayrı katmanda çiziliyor */
      if (ri === 1 && i === 4 && p === 1) continue;
      /* İşaretin tam üstündeki parsel bilerek boş: HTML balon oraya oturuyor
         ve dolu bir çatının üstünde durmasın. Kalanı modüler bir desen. */
      const vacant = (ri === 0 && i === 4 && p === 1) || (i * 3 + p * 2 + ri) % 8 === 5;
      if (vacant) {
        dDash.push(R(cx - 50, r.y0 + 10, 100, r.y1 - r.y0 - 20));
        continue;
      }
      dBuild.push(R(cx - 48, r.by, 96, r.bh));
      /* otopark çizgileri: tepeden bakınca bir yapının ne işe yaradığını
         söyleyen en ucuz detay */
      if (ri < 2) {
        for (let k = 0; k < 5; k++) {
          dPark.push(VL(cx - 40 + k * 20, r.by + r.bh + 8, r.by + r.bh + 22));
        }
      }
    }
  }
}

/* Ters yönlü akış için yolun kendisi ters yazılıyor: dashoffset yol yönünde
   ilerlediği için tek bir keyframe iki yöne de hizmet ediyor. */
const D_FLOW = [`M0 300H${SHEET_W}`, `M${SHEET_W} 332H0`, "M1210 0V400", `M1730 ${SHEET_H}V0`];

const DUBAI: Plan = {
  road: dRoad.join(""),
  lot: dLot.join(""),
  dash: dDash.join(""),
  green: dGreen.join(""),
  tree: dTree.join(""),
  build: dBuild.join(""),
  detail: dPark.join(""),
  flow: D_FLOW,
  markBox: [1352, 206, 96, 48],
  scale: "100 m",
  texture: "Planlı serbest bölge ızgarası",
};

/* ============================================================================
   İNGİLTERE — BİRİKMİŞ DOKU

   Ölçek: 200 birim = 60 m, yani 1 birim = 0,3 m. Ada 236 birim = 71 m, sokak
   ~30 birim = 9 m, sıra ev cephesi 34 birim ≈ 10 m. Londra'nın gerçek tanesi.

   Çizim yöntemi Dubai'nin TAM TERSİ ve bu kasıtlı: burada zemin YOLDUR, adalar
   yolun içinden oyulur. Sokak bir şey değil, adaların arasında kalan şeydir —
   yüzyıllar içinde birikmiş dokunun tarifi zaten budur. Bu yüzden sokak
   genişlikleri de kendiliğinden eşit olmuyor.

   Ada = kapalı bir yapı halkası + ortada avlu (evenodd ile delik). Cephelerde
   ayırma duvarı dişleri: sıra ev dokusunun tepeden tek işareti bu.

   Orta sütun (x=1284, genişlik 236) sarsıntısız sabit: vurgulanan yapı orada
   duruyor ve her ülkede aynı yerde kalması gereken tek şey o.
   ========================================================================== */

const ukR = seeded(9137);
const UK_MID = { x: 1284, w: 236 };

const ukCols: { x: number; w: number }[] = [{ ...UK_MID }];
let ukRx = UK_MID.x + UK_MID.w;
while (ukRx < SHEET_W + 40) {
  const g = 32 + Math.round(ukR() * 26);
  const w = 200 + Math.round(ukR() * 100);
  ukCols.push({ x: ukRx + g, w });
  ukRx += g + w;
}
const ukLeft: { x: number; w: number }[] = [];
let ukLx = UK_MID.x;
while (ukLx > -60) {
  const g = 32 + Math.round(ukR() * 26);
  const w = 200 + Math.round(ukR() * 100);
  ukLeft.unshift({ x: ukLx - g - w, w });
  ukLx -= g + w;
}
const UK_COLS = [...ukLeft, ...ukCols];
const UK_MID_I = ukLeft.length;

type UkBlk = { x: number; y: number; w: number; h: number; band: number };

const ukTop: UkBlk[] = [];
const ukBot: UkBlk[] = [];
/* Kuşak kalınlığı = yapı derinliği. 32-46 birim, yani 10-14 m: Londra'nın
   çeper adasında yapı gerçekten bu kadar derindir. Üç adadan birinde kuşak
   iki katına çıkıyor ve ada neredeyse dolu oluyor — çünkü her ada avlulu
   değil; bazıları sonradan içine doğru dolmuş. Çeşitliliği veren şey bu. */
const ukBand = (ci: number, ri: number) =>
  (ci * 2 + ri) % 3 === 2 ? 58 + Math.round(ukR() * 12) : 32 + Math.round(ukR() * 14);

/* Kuşak adanın yarısını geçemez, yoksa iç dörtgen ters dönüyor ve avlu yerine
   ekranda ince bir siyah şerit kalıyor — ilk turda tam olarak bu oldu. En dar
   avlu 52 birim ≈ 16 m; altına inince avlu değil yarık gibi okunuyor. */
const ukFit = (band: number, w: number, h: number) => Math.min(band, Math.min(w, h) / 2 - 26);

UK_COLS.forEach((c, ci) => {
  const fixed = ci === UK_MID_I;
  const j = (a: number) => (fixed ? 0 : Math.round((ukR() * 2 - 1) * a));
  const h0 = 140 + j(12);
  ukTop.push({ x: c.x + j(5), y: 4 + j(7), w: c.w, h: h0, band: ukFit(ukBand(ci, 0), c.w, h0) });
  /* Alt sıra sütun eksenine göre kayıyor: dikey sokak ana caddede dirsek
     yapıyor. Izgarada olmayan, birikmiş dokuda her yerde olan şey bu. */
  const h1 = fixed ? 200 : 198 + j(12);
  ukBot.push({
    x: c.x + j(13),
    y: fixed ? 196 : 194 + j(7),
    w: c.w,
    h: h1,
    band: fixed ? 34 : ukFit(ukBand(ci, 1), c.w, h1),
  });
});

/** köşeleri kaçık dörtgen — hiçbir Londra adası tam dikdörtgen değil */
function jquad(x: number, y: number, w: number, h: number, amp: number) {
  const j = () => Math.round((ukR() * 2 - 1) * amp);
  const p: [number, number][] = [
    [x + j(), y + j()],
    [x + w + j(), y + j()],
    [x + w + j(), y + h + j()],
    [x + j(), y + h + j()],
  ];
  const d = `M${n(p[0][0])} ${n(p[0][1])}L${n(p[1][0])} ${n(p[1][1])}L${n(p[2][0])} ${n(
    p[2][1],
  )}L${n(p[3][0])} ${n(p[3][1])}z`;
  return { d, p };
}

const ukLand: string[] = [];
const ukBuild: string[] = [];
const ukCourt: string[] = [];
const ukWall: string[] = [];
const ukTreeArr: string[] = [];
const ukCut: string[] = [];

/* Bir ada yapı yerine meydan oluyor: Londra'nın bahçeli meydanı (garden
   square) dokunun içindeki tek düzenli boşluk. Tam işaretin üstündeki ada
   seçildi, çünkü HTML balon oraya oturuyor — balonun altında dolu bir çatı
   değil, açık bir meydan olsun. */
const UK_SQUARE_I = UK_MID_I;

[ukTop, ukBot].forEach((row, ri) => {
  row.forEach((b, ci) => {
    const outer = jquad(b.x, b.y, b.w, b.h, 10);
    ukLand.push(outer.d);

    if (ri === 0 && ci === UK_SQUARE_I) {
      ukCourt.push(outer.d);
      ukTreeArr.push(...grove(b.x + b.w / 2, b.y + b.h / 2, 5, 3, 30, 3));
      return;
    }

    const inner = jquad(b.x + b.band, b.y + b.band, b.w - 2 * b.band, b.h - 2 * b.band, 5);
    /* halka = dış dörtgen + iç dörtgen, evenodd ile ortası delik */
    ukBuild.push(outer.d + inner.d);
    /* Avlunun çoğu bahçe DEĞİL, taş döşeli arka avlu: halkanın deliğinden
       zaten ada zemini görünüyor, ayrıca boyamaya gerek yok. Her avluyu
       yeşile boyamak denendi ve doku "park ızgarası" gibi okundu — yapı
       kütlesi kaybolup sahne Londra olmaktan çıktı. Üç adadan biri yeşil. */
    if ((ci * 2 + ri) % 3 === 0) ukCourt.push(inner.d);

    /* Ayırma duvarları: cephe boyunca eşit aralıklı dişler. Yalnız uzun
       (yatay) kenarlarda — dikey kenarlarda diş, tepeden bakınca cepheyi
       değil yan duvarı böler ve okunmaz. */
    for (const [a, z, dir] of [
      [outer.p[0], outer.p[1], 1],
      [outer.p[3], outer.p[2], -1],
    ] as const) {
      const steps = Math.max(2, Math.round((z[0] - a[0]) / 34));
      for (let k = 1; k < steps; k++) {
        const t = k / steps;
        ukWall.push(
          `M${n(a[0] + (z[0] - a[0]) * t)} ${n(a[1] + (z[1] - a[1]) * t)}v${n(b.band * dir)}`,
        );
      }
    }

    /* Mews: adanın içine giren dar aralık. Yapı katmanının ÜSTÜNDEN yol
       rengiyle geçiyor — gerçekte de sonradan açılmış bir yoldur. */
    if ((ci + ri) % 4 === 1) {
      ukCut.push(R(b.x + b.w * 0.42, b.y + b.h - b.band - 6, 13, b.band + 10));
    }
  });
});

/* Ana cadde: adaların arasında kalan boşluğun ekseni. Elle çizilmiyor,
   sütun sütun iki sıranın ortasından hesaplanıyor — yani cadde dokudan
   türüyor, doku caddeden değil. Kıvrımı da oradan geliyor. */
const ukHighPts: [number, number][] = UK_COLS.map((c, i) => [
  c.x + c.w / 2,
  (ukTop[i].y + ukTop[i].h + ukBot[i].y) / 2,
]);
const UK_HIGH = smooth([
  [-40, ukHighPts[0][1]],
  ...ukHighPts,
  [SHEET_W + 40, ukHighPts[ukHighPts.length - 1][1]],
]);

function ukGapX(i: number) {
  return (UK_COLS[i].x + UK_COLS[i].w + UK_COLS[i + 1].x) / 2;
}
const ukGa = ukGapX(Math.max(0, UK_MID_I - 2));
const ukGb = ukGapX(Math.min(UK_COLS.length - 2, UK_MID_I + 1));

const INGILTERE: Plan = {
  base: R(0, 0, SHEET_W, SHEET_H),
  land: ukLand.join(""),
  green: ukCourt.join(""),
  tree: ukTreeArr.join(""),
  build: ukBuild.join(""),
  buildEO: true,
  cut: ukCut.join(""),
  detail: ukWall.join(""),
  flow: [
    UK_HIGH,
    smoothV([
      [ukGa, -20],
      [ukGa + 9, 150],
      [ukGa - 7, 268],
      [ukGa + 3, 420],
    ]),
    smoothV([
      [ukGb + 4, 420],
      [ukGb - 8, 250],
      [ukGb + 6, 130],
      [ukGb, -20],
    ]),
  ],
  markBox: [1372, 200, 56, 44],
  scale: "60 m",
  texture: "Yüzyıllar içinde birikmiş sokak dokusu",
};

/* ============================================================================
   KKTC — SEYREK YERLEŞİM

   Ölçek: 200 birim = 120 m, yani 1 birim = 0,6 m. Yol 14 birim ≈ 8 m, arsalar
   200-300 birim (120-180 m), yapılar 25-45 birim (15-27 m).

   Burada ne ızgara var ne de birikmiş doku: arazi var. Üç şey bunu söylüyor —
   (1) yapılar eğik oturuyor, hiçbiri komşusuyla hizalı değil; (2) arsa
   sınırları düz değil, dolanıyor; (3) eş yükselti eğrileri sayfayı boydan boya
   geçiyor, yani zemin düz değil. Sayfanın çoğu boş kalıyor ve bu bir eksiklik
   değil, dokunun kendisi.

   Zeytinlik/narenciye dizisi bilerek DÜZENLİ: tarım ızgaralıdır, yerleşim
   değil. Aynı sayfada iki farklı düzen mantığının yan yana durması KKTC
   sahnesinin en doğru detayı.
   ========================================================================== */

const kR = seeded(4477);

const K_LANE = smooth([
  [-40, 352],
  [380, 332],
  [820, 346],
  [1250, 326],
  [1760, 338],
  [2180, 318],
  [2560, 330],
  [SHEET_W + 40, 322],
]);
const K_BRANCH = [
  smoothV([
    [1122, 340],
    [1078, 250],
    [1024, 172],
    [988, 92],
  ]),
  smoothV([
    [1982, 328],
    [2038, 248],
    [2022, 170],
  ]),
  /* kendi parseline giden kısa bağlantı: parselin yola cephesi olduğunu
     söyleyen tek çizgi */
  smoothV([
    [MID_X + 6, 330],
    [MID_X + 2, 292],
    [MID_X, 262],
  ]),
];
const K_TRACK = [
  smoothV([
    [560, 340],
    [604, 262],
    [566, 188],
  ]),
  smoothV([
    [2338, 324],
    [2384, 250],
    [2352, 186],
  ]),
];

const K_CONTOUR = [
  smooth([
    [-40, 92],
    [520, 70],
    [1080, 102],
    [1640, 68],
    [2200, 100],
    [SHEET_W + 40, 76],
  ]),
  smooth([
    [-40, 166],
    [520, 148],
    [1080, 178],
    [1640, 144],
    [2200, 174],
    [SHEET_W + 40, 150],
  ]),
  smooth([
    [-40, 238],
    [520, 224],
    [1080, 252],
    [1640, 220],
    [2200, 248],
    [SHEET_W + 40, 226],
  ]),
  smooth([
    [-40, 300],
    [520, 290],
    [1080, 314],
    [1640, 286],
    [2200, 310],
    [SHEET_W + 40, 292],
  ]),
].join("");

/* Arsa sınırları: dolanan çizgiler. Izgaranın tam zıddı ve KKTC sahnesinin
   temel argümanı — burada parselin şeklini plan değil arazi belirlemiş. */
const kField: string[] = [];
for (let k = 0; k < 9; k++) {
  const base = 90 + k * 300;
  const pts: [number, number][] = [];
  for (let y = -20; y <= 420; y += 110) pts.push([base + Math.round((kR() * 2 - 1) * 34), y]);
  kField.push(smoothV(pts));
}
for (let k = 0; k < 3; k++) {
  const base = 118 + k * 112;
  const pts: [number, number][] = [];
  for (let x = -20; x <= SHEET_W + 20; x += 350) pts.push([x, base + Math.round((kR() * 2 - 1) * 26)]);
  kField.push(smooth(pts));
}
/* Vurgulanan parselin sınırı elle: işaretin etrafındaki arsa okunmalı. */
kField.push("M1258 142L1544 134L1552 300L1266 308z");

const kBuild: string[] = [];
/** yapıların etrafındaki bahçe duvarı — tek başına duran evin avlusu vardır */
const kYard: string[] = [];
/* [merkez x, merkez y, yayılma, adet] — gevşek kümeler, araları boş */
const K_CL: readonly (readonly [number, number, number, number])[] = [
  [430, 262, 170, 7],
  [1122, 200, 150, 7],
  [1762, 300, 150, 6],
  [2184, 210, 160, 7],
  [2558, 268, 130, 5],
  [880, 118, 130, 4],
  [2020, 92, 120, 4],
];
for (const [cx, cy, rad, cnt] of K_CL) {
  for (let k = 0; k < cnt; k++) {
    const bx = cx + Math.round((kR() * 2 - 1) * rad);
    const by = cy + Math.round((kR() * 2 - 1) * rad * 0.42);
    const w = 26 + Math.round(kR() * 20);
    const h = 18 + Math.round(kR() * 12);
    const rot = Math.floor(kR() * 10);
    /* işaretin etrafı boş kalsın: vurgulanan yapı komşusuna girmesin */
    if (Math.abs(bx - MID_X) < 140 && Math.abs(by - 224) < 90) continue;
    kBuild.push(quad(bx, by, w, h, rot));
    if (k % 3 === 0) kYard.push(quad(bx, by, w + 46, h + 40, rot));
  }
}
const K_LONE: readonly (readonly [number, number])[] = [
  [762, 148],
  [1520, 148],
  [2320, 362],
  [880, 372],
  [1682, 110],
  [242, 132],
];
K_LONE.forEach(([bx, by], i) => kBuild.push(quad(bx, by, 30 + i * 2, 22, i + 3)));

/* Dikim ızgaralı, yerleşim değil. Aynı sayfada iki ayrı düzen mantığının yan
   yana durması KKTC sahnesinin en doğru detayı. */
const kTree = [
  ...grove(700, 248, 6, 4, 24, 2),
  ...grove(1902, 128, 7, 3, 22, 6),
  ...grove(2402, 342, 5, 3, 26, 4),
  ...grove(1180, 348, 6, 2, 24, 8),
  ...grove(240, 88, 5, 3, 26, 5),
  ...grove(1548, 60, 6, 2, 22, 7),
];

/* İstinat duvarları: eğimli arazide teras. Eş yükseltiyi takip ediyorlar,
   çünkü gerçekte de öyle yapılır — ve hepsi bir yapı kümesinin hemen altında
   duruyor. Boşlukta çizildiklerinde ekranda bağlamsız bir çizgi gibi
   okunuyorlardı; teras dediğin şey bir yapının oturduğu düzlüktür. */
const K_WALL = [
  smooth([
    [330, 302],
    [470, 296],
    [592, 304],
  ]),
  smooth([
    [1012, 248],
    [1140, 242],
    [1252, 250],
  ]),
  smooth([
    [2082, 258],
    [2210, 252],
    [2330, 260],
  ]),
  smooth([
    [2478, 308],
    [2606, 302],
    [2712, 310],
  ]),
].join("");

const KKTC: Plan = {
  lane: K_LANE + K_BRANCH.join(""),
  track: K_TRACK.join(""),
  contour: K_CONTOUR,
  dash: kField.join("") + kYard.join(""),
  tree: kTree.join(""),
  build: kBuild.join(""),
  detail: K_WALL,
  flow: [K_LANE],
  markBox: [1370, 204, 60, 40],
  scale: "120 m",
  texture: "Araziye yayılan seyrek yerleşim",
};

const PLAN: Record<Country, Plan> = {
  dubai: DUBAI,
  ingiltere: INGILTERE,
  kktc: KKTC,
};

/* Balonun oturduğu yükseklik. SVG'deki kılavuz çizgisi de tam buraya kadar
   geliyor; CSS aynı sayıyı --g6-u ile piksele çeviriyor, yani ikisi her
   genişlikte birbirine değiyor. Ölçüm yok. */
const LEAD_TOP = 90;

const EASE = [0.22, 1, 0.36, 1] as const;

/* ========================================================================== */

function Sheet({ c, on }: { c: Country; on: boolean }) {
  const a = PLAN[c];
  const [mx, my, mw, mh] = a.markBox;

  return (
    <g className="g6-plan" data-c={c} data-on={on}>
      {a.base && <path className="g6-l-base" d={a.base} />}
      {a.land && <path className="g6-l-land" d={a.land} />}
      {a.contour && <path className="g6-l-contour" d={a.contour} />}
      {a.road && <path className="g6-l-road" d={a.road} />}
      {a.lane && <path className="g6-l-lane" d={a.lane} />}
      {/* pathLength=1: parsel çizgileri kendini çizerken uzunluk normalize
          olsun, kısa ve uzun çizgiler aynı anda varsın */}
      {a.lot && <path className="g6-l-lot" d={a.lot} pathLength="1" />}
      {a.dash && <path className="g6-l-dash" d={a.dash} />}
      {a.green && <path className="g6-l-green" d={a.green} />}
      {a.tree && <path className="g6-l-tree" d={a.tree} />}
      {a.build && (
        <path className="g6-l-build" d={a.build} fillRule={a.buildEO ? "evenodd" : "nonzero"} />
      )}
      {a.cut && <path className="g6-l-cut" d={a.cut} />}
      {a.detail && <path className="g6-l-detail" d={a.detail} />}
      {a.track && <path className="g6-l-track" d={a.track} />}
      <g className="g6-l-flow">
        {a.flow.map((d, i) => (
          <path key={i} className="g6-flow" d={d} />
        ))}
      </g>

      {/* İŞARET. Üç ülkede de tuvalin merkezinde; değişen yalnızca ayak izinin
          ölçüsü — çünkü üç planın ölçeği farklı ve bu bilerek böyle. */}
      <g className="g6-l-mark">
        <path className="g6-mark-fill" d={R(mx, my, mw, mh)} />
        <path className="g6-mark-tick" d={reticle(mx, my, mw, mh)} />
        <path className="g6-lead" d={`M${MID_X} ${LEAD_TOP}V${n(my - 10)}`} />
        <path className="g6-lead-cap" d={`M${MID_X - 15} ${LEAD_TOP}H${MID_X + 15}`} />
      </g>
    </g>
  );
}

export default function HeroGlobeG6() {
  /* Küre ve diğer adaylarla aynı mağaza dilimi: seçim yukarıdan yapılıyor,
     sahne ona cevap veriyor. */
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);
  /* Yalnız balonun geçiş süresi için. CSS animasyonlarının tamamı medya
     sorgusuyla kapanıyor — böylece ağaçta tek bir nitelik bile değişmiyor ve
     sunucu HTML'i ile istemci HTML'i birebir aynı kalıyor. */
  const reduced = useReducedMotion() ?? false;

  const show = useCallback((c: Country) => setCountry(c), [setCountry]);
  const pick = useCallback(
    (c: Country) => {
      if (c === country) return;
      setCountry(c);
      gtm("hero_plan_country", { country: c });
    },
    [country, setCountry],
  );

  const facts = FACTS[country];
  const plan = PLAN[country];

  return (
    <div className="g6">
      <CountryPicker value={country} onSelect={pick} onHover={(c) => c && show(c)} withLegend />

      <div className="g6-stage">
        {/* Milimetrik kâğıt. Tuvalden geniş, çünkü pafta çizimde bitmez;
            ızgarası da çizimin 40 birimine kilitli. */}
        <span className="g6-paper" aria-hidden="true" />

        <div className="g6-canvas">
          <div className="g6-scene">
            <svg
              className="g6-svg"
              viewBox={`0 0 ${SHEET_W} ${SHEET_H}`}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              focusable="false"
            >
              {COUNTRY_ORDER.map((c) => (
                <Sheet key={c} c={c} on={c === country} />
              ))}
            </svg>
          </div>
        </div>

        {/* Balon. left:50% ile çizimin merkezine denk geliyor: viewBox'ın
            merkezi de orası. Alt kenarı LEAD_TOP'a oturuyor, yani SVG'deki
            kılavuz çizgisi tam buraya kadar geliyor. */}
        <div className="g6-callout" aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={country}
              className="g6-callout-in"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: reduced ? 0 : 0.22, ease: EASE }}
            >
              <span className="g6-you">Şirketiniz</span>
              <span className="g6-struct">{facts.structure}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Antet. Bir vaziyet planının köşesinde ne varsa: paftanın ne olduğu,
            neyi gösterdiği ve ölçeği. Ölçek çubuğu süs değil — metre cinsinden
            ilan edilmiş bir ölçek, bu çizimin harita OLMADIĞININ ispatı. */}
        <div className="g6-block" aria-hidden="true">
          <span className="g6-kicker">Temsilî vaziyet planı</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={country}
              className="g6-texture"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: reduced ? 0 : 0.22, ease: EASE }}
            >
              {plan.texture}
            </motion.span>
          </AnimatePresence>
          <span className="g6-scale">
            <span className="g6-bar" />
            <span className="g6-scale-n">{plan.scale}</span>
          </span>
        </div>

        {/* Sahnenin tamamı dekoratif; durumu okuyan tek yer burası. */}
        <p className="g6-sr" aria-live="polite">
          {COUNTRY_NAMES[country]} seçildi — {facts.structure}. {plan.texture}.
        </p>
      </div>
    </div>
  );
}
