import type { Country } from "@/lib/store";

/* ============================================================================
   ÜLKE BLOĞUNUN SAĞ SÜTUNU — SAF GÖRSEL

   NEDEN AYRI BİR DOSYA: kardeşi SectorScenes.tsx'te duran şeyler ŞEMA — her
   biri tek bir cümle söylemek zorunda ve söyledikleri şey veriden geliyor
   (tahsilat akışı, ödeme matrisi). Buradakiler ise anlatmıyor: sektör
   sayfasının üç ülke bloğunda sağ sütun tamamen görsel alanı ve müşterinin
   isteği net — "çok basic, tamamen estetik odaklı SVG görseller". Şema ile
   dekoru aynı dosyada tutmak ikisinin de kuralını bulanıklaştırırdı.

   İKİNCİ FARK TEKNİK: bu dosyada "use client" YOK. Çizimlerin hiçbirinde
   motion/react kullanılmıyor, dolayısıyla sunucu bileşeni olarak kalabiliyor
   ve tarayıcıya tek satır JavaScript inmiyor. Hareket CSS'te (sektor.css ·
   .sxa-pulse) ve prefers-reduced-motion altında kapalı — bu depoda
   useReducedMotion ile render edilen ağacı değiştirme hatası dört kalıpta
   çıktığı için en güvenlisi hareketi hiç JS'e sokmamak.

   NE ÇİZİLMEZ: etiket, ok, açıklama, şema, rakam. Bu çizimler bir iddia
   taşımıyor; aria-hidden ile basılıyorlar ve ekran okuyucuya hiç görünmüyorlar.
   Bir bilgi söylemeleri gerekseydi zaten metnin içinde olmaları gerekirdi.

   ÜÇÜ NEDEN AYNI DEĞİL: üç ülke bloğu arka arkaya okunuyor ve aynı çizimin üç
   kopyası "kopyala-yapıştır" gibi göze çarpıyor. Üçü de yazılım tarafından bir
   şeye yaslanıyor ama farklı bir şeye — katmanlı paneller, düğüm ağı, ölçüm
   alanı. Palet, çizgi kalınlığı ve panel dili ortak; kompozisyon farklı.

   RENK: sektor.css'teki .sxv- ailesinin değerleri (opak koyu yüzeyler, tek
   mavi). Koyu zeminde alfa kullanılmıyor — neredeyse siyah zeminde alfa hep
   aynı griyi veriyor.
   ========================================================================= */

/* Gradyan id'leri sayfada ÜÇ kez birden basılıyor; her çizimin kendi öneki
   var çünkü SVG id'leri belge genelinde tekil olmak zorunda ve çakışma
   sessizce yanlış gradyanı gösteriyor. */

/* -------------------------------------------------- Dubai · katmanlı paneller
   Üst üste kayan üç pano: aynı işin farklı katmanları. Yazılımda en tanıdık
   soyutlama bu ve tek bir kelime bile gerektirmiyor. */
function ArtPanes() {
  /* Ön panonun satırları. Genişlikler elle yazılı ve sabit: rastgele üretilen
     bir düzen sunucu ile istemcide farklı çıkar. */
  const rows: { w: number; on?: boolean }[] = [
    { w: 148 },
    { w: 96, on: true },
    { w: 186 },
    { w: 118 },
    { w: 62, on: true },
  ];

  return (
    <svg viewBox="0 0 520 380" className="sxa" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="sxa-glow-panes" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#2f6fc4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2f6fc4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="292" cy="158" r="205" fill="url(#sxa-glow-panes)" />

      {/* arkadaki iki pano yalnızca kontur: derinlik versinler, okunmasınlar */}
      <rect x="150" y="40" width="320" height="200" rx="20" className="sxa-pane-3" />
      <rect x="110" y="76" width="320" height="200" rx="20" className="sxa-pane-2" />

      {/* ön pano */}
      <rect x="70" y="112" width="320" height="200" rx="20" className="sxa-pane-1" />
      <path d="M70 148 H390" className="sxa-hair" />
      <circle cx="94" cy="130" r="3.6" className="sxa-dot-dim" />
      <circle cx="108" cy="130" r="3.6" className="sxa-dot-dim" />
      <circle cx="122" cy="130" r="3.6" className="sxa-dot-b" />

      {rows.map((r, i) => (
        <rect
          key={i}
          x="94"
          y={172 + i * 24}
          width={r.w}
          height="8"
          rx="4"
          className={r.on ? "sxa-bar-b" : "sxa-bar"}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------- İngiltere · düğüm ağı
   Bağlı düğümler. Hangi düğümün ne olduğu yazmıyor ve yazmayacak — burada
   söylenen şey "her şey birbirine bağlı", o kadar. */
const NODES: { x: number; y: number; r: number; on?: boolean }[] = [
  { x: 96, y: 108, r: 7 },
  { x: 188, y: 60, r: 5.5 },
  { x: 252, y: 148, r: 10, on: true },
  { x: 150, y: 212, r: 6 },
  { x: 330, y: 88, r: 6 },
  { x: 400, y: 168, r: 8, on: true },
  { x: 300, y: 260, r: 6.5 },
  { x: 196, y: 304, r: 5 },
  { x: 432, y: 272, r: 5.5 },
  { x: 74, y: 242, r: 4.5 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 3],
  [1, 2],
  [2, 3],
  [2, 4],
  [4, 5],
  [2, 5],
  [3, 7],
  [2, 6],
  [6, 5],
  [6, 7],
  [5, 8],
  [6, 8],
  [3, 9],
  [9, 7],
];

function ArtNodes() {
  return (
    <svg viewBox="0 0 520 380" className="sxa" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="sxa-glow-nodes" cx="48%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#2f6fc4" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#2f6fc4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="250" cy="170" r="210" fill="url(#sxa-glow-nodes)" />

      {EDGES.map(([a, b]) => (
        <path
          key={`${a}-${b}`}
          d={`M${NODES[a].x} ${NODES[a].y} L${NODES[b].x} ${NODES[b].y}`}
          className={NODES[a].on || NODES[b].on ? "sxa-edge-b" : "sxa-edge"}
        />
      ))}

      {/* vurgulu düğümlerin halkası: nefes alan tek hareket */}
      {NODES.filter((n) => n.on).map((n, i) => (
        <circle
          key={`ring-${i}`}
          cx={n.x}
          cy={n.y}
          r={n.r + 11}
          className="sxa-ring sxa-pulse"
          style={{ animationDelay: `${i * 1.6}s` }}
        />
      ))}

      {NODES.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          className={n.on ? "sxa-node-b" : "sxa-node"}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------ KKTC · ölçüm alanı
   Yükseklikleri değişen sütunlar ve üstlerinden geçen sakin bir eğri. Yine
   hiçbir eksen, hiçbir rakam: gösterdiği şey ritim, veri değil. */
const BARS = [70, 120, 96, 160, 132, 202, 168, 108, 146, 88, 124, 64];
const BAR_ON = new Set([3, 5, 8]);
const BASE_Y = 300;

function ArtField() {
  return (
    <svg viewBox="0 0 520 380" className="sxa" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="sxa-glow-field" cx="50%" cy="62%" r="62%">
          <stop offset="0%" stopColor="#2f6fc4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2f6fc4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="262" cy="228" r="200" fill="url(#sxa-glow-field)" />

      {BARS.map((h, i) => (
        <rect
          key={i}
          x={60 + i * 34}
          y={BASE_Y - h}
          width="18"
          height={h}
          rx="9"
          className={BAR_ON.has(i) ? "sxa-col-b" : "sxa-col"}
        />
      ))}

      <path d="M40 300 H480" className="sxa-hair" />

      {/* Eğri sütunların üstünden geçiyor, onlara değmiyor: iki ayrı katman
          gibi okunsun, "şu sütun şu değere denk geliyor" demesin. */}
      <path
        d="M52 214 C 112 150, 148 196, 200 148 S 292 74, 348 122 S 430 92, 476 58"
        className="sxa-curve"
      />

      {[
        { x: 200, y: 148 },
        { x: 348, y: 122 },
      ].map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="10"
          className="sxa-ring sxa-pulse"
          style={{ animationDelay: `${i * 1.9}s` }}
        />
      ))}
      <circle cx="200" cy="148" r="4.6" className="sxa-node-b" />
      <circle cx="348" cy="122" r="4.6" className="sxa-node-b" />
    </svg>
  );
}

/* ---------------------------------------------------------------- kayıt defteri

   Anahtar ÜLKE, sektör değil: üç çizimin hiçbiri sektöre özgü bir şey
   söylemiyor, dolayısıyla ikinci sektör eklendiğinde bu dosyaya dokunmak
   gerekmiyor ve bilinmeyen sektör de boş kutu görmüyor (Kural 1).

   Bir sektöre özel çizim istenirse doğru yer burası değil, SectorScenes'teki
   SECTOR_SCENES kaydıdır — orası sektöre bağlı, burası ülkeye. */
const ART: Record<Country, () => React.ReactElement> = {
  dubai: ArtPanes,
  ingiltere: ArtNodes,
  kktc: ArtField,
};

/** Ülke bloğunun sağ sütunu. Dekor: figcaption yok, alt metin yok,
    aria-hidden. Bir şey iddia etmiyor. */
export default function SectorCountryArt({ country }: { country: Country }) {
  const Art = ART[country];
  return (
    <div className="sxc-art" aria-hidden="true">
      <Art />
    </div>
  );
}
