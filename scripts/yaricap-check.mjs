/* ============================================================================
   YARIÇAP DENETİMİ — köşe yuvarlaklığı kutunun ölçüsüne uyuyor mu?

   18.09.2026 · Burak: "soru tarafı çok daha yuvarlak hissettirirken cevap
   kısmı iyi gözüküyor. yani burada bir orantı kurman lazım. büyük şeylerde
   daha fazlayken küçük şeylerde daha az olması gibi … tutarlı bir algoritma
   kurman lazım."

   Kural globals.css'te (:root · radius bloğu) yazılı, burada ölçülüyor:
   yarıçap kutunun KISA KENARININ bandından geliyor.

       kısa kenar ≤  24 px  →   8 px   (--r-sm)
       kısa kenar ≤  56 px  →  12 px   (--r-md)
       kısa kenar ≤ 120 px  →  18 px   (--r-lg)
       kısa kenar ≤ 320 px  →  22 px   (--r-xl)
       kısa kenar >  320 px →  28 px   (--r-panel)

   NEDEN KISA KENAR: 1100x90'lık bir bant ile 90x90'lık bir kart aynı köşeyi
   taşımalı — göz köşeyi kutunun dar tarafına göre okuyor. Bantlar kabaca
   ikiye katlanırken yarıçap yavaş büyüyor; büyük panel "çok yuvarlak"
   olmuyor, küçük kutu "kutu gibi" kalmıyor.

   KURALIN DIŞINDA KALANLAR (ve nedenleri):
     · hap ve daire (yarıçap ≥ kısa kenarın yarısı) — orada yarıçap ölçüyü
       değil BİÇİMİ bildiriyor;
     · yarıçapı 0 olan kutular — köşe kararı yok, denetlenecek bir şey de yok;
     · 3 px'ten küçük yarıçaplar — bayrak, çizgi ucu gibi grafik ayrıntılar;
     · çok küçük kutular (kısa kenar < 16 px) — ikon ve süs;
     · `data-yaricap="serbest"` taşıyan kutular ve onların içindekiler.

   SON MADDE ÖNEMLİ: bu kural bir ÜSLUP kuralı, fizik kuralı değil. Sitede
   bilerek kuralın dışında duran kutular var — sohbet balonu (.sc-msg,
   köşelerden biri bilerek kırık), bayrak kutusu (.fy2-flag, 3 px), dev
   dekoratif yay (.kcta-yay). Bunlar körlemesine "düzeltilirse" tasarım bozulur.
   İstisna kendini BİLDİRİR: kutuya `data-yaricap="serbest"` yazılır ve
   yanındaki kod yorumunda gerekçesi durur. Denetim o kutuyu bir daha saymaz.
   Yani bu betiğin sayısı "kaç hata var" değil, "kaç kutu hakkında karar
   verilmemiş" demek.

   KULLANIM
     node scripts/yaricap-check.mjs                    # varsayılan rotalar
     node scripts/yaricap-check.mjs --rota /,/muhasebe
     node scripts/yaricap-check.mjs --en 390           # dar ekran

   ÇIKTI sınıf adına göre toplanmış: aynı sınıfın yirmi kopyası tek satır.
   Sayfa denetiminden farkı, bu betiğin bir TABANI var: bugünkü uyumsuz sınıf
   sayısı aşağıda yazılı ve tur tur düşürülüyor. Sayı artıyorsa yeni yazılan
   kutu kuralın dışında demektir.
   ========================================================================= */

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const VARSAYILAN = [
  "/",
  "/dubai",
  "/ingiltere",
  "/kktc",
  "/ulkeler",
  "/dubai/muhasebe",
  "/hakkimizda",
  "/iletisim",
  "/araclar",
  "/araclar/kurumlar-vergisi/dubai",
  "/uygunluk-testi",
  "/basla",
  "/kaynaklar",
  "/blog",
  "/is-ortakligi",
  "/sektorler/yazilim-ve-teknoloji",
  "/lp/dubai-sirket-kurulusu",
];

const arg = (ad, varsayilan) => {
  const i = process.argv.indexOf(`--${ad}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : varsayilan;
};

const KOK = arg("kok", "http://localhost:3100");
const EN = Number(arg("en", 1440));
const BOY = Number(arg("boy", EN < 768 ? 844 : 900));
const PORT = Number(arg("port", 9611 + (EN % 100)));
const ROTALAR = arg("rota", "")
  ? arg("rota", "").split(",").map((s) => s.trim()).filter(Boolean)
  : VARSAYILAN;

const profil = mkdtempSync(join(tmpdir(), "ortac-yaricap-"));
const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profil}`,
    `--window-size=${EN},${BOY}`,
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--no-first-run",
    "--no-default-browser-check",
    "about:blank",
  ],
  { stdio: "ignore" },
);

const bekle = (ms) => new Promise((r) => setTimeout(r, ms));

let hedef;
for (let i = 0; i < 80 && !hedef; i++) {
  try {
    const liste = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    hedef = liste.find((t) => t.type === "page");
  } catch {
    /* tarayıcı henüz ayakta değil */
  }
  if (!hedef) await bekle(250);
}
if (!hedef) {
  console.error("Chrome açılmadı. Yol doğru mu?", CHROME);
  process.exit(1);
}

const ws = new WebSocket(hedef.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

let sira = 0;
const bekleyen = new Map();
let olaylar = [];
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && bekleyen.has(m.id)) {
    bekleyen.get(m.id)(m);
    bekleyen.delete(m.id);
    return;
  }
  if (m.method) olaylar.push(m.method);
});
const cdp = (yontem, p = {}) =>
  new Promise((r) => {
    const i = ++sira;
    bekleyen.set(i, r);
    ws.send(JSON.stringify({ id: i, method: yontem, params: p }));
  });
const ev = async (ifade) =>
  (await cdp("Runtime.evaluate", { expression: ifade, awaitPromise: true, returnByValue: true }))
    .result?.result?.value;

await cdp("Page.enable");
await cdp("Runtime.enable");
/* Chrome pencereyi ~500px altına indirmiyor; gerçek dar ekran ancak bununla
   ölçülüyor (docs/tuzaklar.md · tuzak Y). */
await cdp("Emulation.setDeviceMetricsOverride", {
  width: EN,
  height: BOY,
  deviceScaleFactor: 1,
  mobile: EN < 768,
});

/* Sayfadaki her kutuyu gez, bandına bak, uymayanı sınıf adıyla topla. */
const OLC = `(() => {
  const bant = (k) => (k <= 24 ? 8 : k <= 56 ? 12 : k <= 120 ? 18 : k <= 320 ? 22 : 28);
  const bulunan = new Map();
  document.querySelectorAll("*").forEach((el) => {
    const st = getComputedStyle(el);
    const r = parseFloat(st.borderTopLeftRadius) || 0;
    if (r < 3) return;                                   // köşe kararı yok
    if (el.closest("[data-yaricap='serbest']")) return;  // bildirilmiş istisna
    const b = el.getBoundingClientRect();
    const kisa = Math.round(Math.min(b.width, b.height));
    if (kisa < 16) return;                               // ikon, süs
    if (r >= kisa / 2 - 0.5) return;                     // hap ya da daire
    const ad =
      el.className && typeof el.className === "string"
        ? el.className.trim().split(/\\s+/)[0]
        : "";
    if (!ad) return;
    const olmasi = bant(kisa);
    if (Math.round(r) === olmasi) return;
    const anahtar = ad + "|" + Math.round(r) + "|" + olmasi;
    if (!bulunan.has(anahtar)) bulunan.set(anahtar, { ad, r: Math.round(r), olmasi, kisa, n: 0 });
    bulunan.get(anahtar).n++;
  });
  return JSON.stringify([...bulunan.values()]);
})()`;

console.log(`Yarıçap denetimi · ${EN}×${BOY} · ${KOK}\n`);

/** sınıf → { r, olmasi, kisa, n, rotalar:Set } */
const toplam = new Map();

for (const yol of ROTALAR) {
  olaylar = [];
  await cdp("Page.navigate", { url: KOK + yol });
  for (let i = 0; i < 200 && !olaylar.includes("Page.loadEventFired"); i++) await bekle(100);
  await ev("document.fonts.ready.then(()=>1)");
  /* Sayfayı sonuna kadar kaydır: girişte görünmeyen bölümler ölçülmeden
     kalmasın (whileInView ile beliren kartlar dahil). */
  await ev(
    `(async()=>{const b=ms=>new Promise(r=>setTimeout(r,ms));for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await b(60);}window.scrollTo(0,0);return 1})()`,
  );
  await bekle(500);

  const ham = await ev(OLC);
  const satirlar = ham ? JSON.parse(ham) : [];
  for (const s of satirlar) {
    const anahtar = `${s.ad}|${s.r}|${s.olmasi}`;
    if (!toplam.has(anahtar)) toplam.set(anahtar, { ...s, rotalar: new Set() });
    const t = toplam.get(anahtar);
    t.n += s.n;
    t.rotalar.add(yol);
  }
  console.log(`  ${yol} · ${satirlar.length === 0 ? "temiz" : `${satirlar.length} uyumsuz sınıf`}`);
}

const liste = [...toplam.values()].sort((a, b) => b.n - a.n);
if (liste.length > 0) {
  console.log("\nUyumsuz kutular (sınıf · bugünkü → olması gereken · kısa kenar · kaç kopya):");
  for (const t of liste) {
    console.log(`  ${t.ad}  ${t.r} → ${t.olmasi}  ·  ${t.kisa}px  ·  ${t.n} kopya  ·  ${[...t.rotalar].slice(0, 3).join(" ")}`);
  }
}
console.log(`\nyaricap-check: ${liste.length} sınıfın yarıçapı bandına uymuyor`);

ws.close();
chrome.kill();
/* Chrome profili kapatırken hâlâ yazıyor olabiliyor; silme yarışı betiği
   düşürmesin (çıktı zaten basıldı, geçici dizin işletim sistemine kalır). */
await bekle(400);
try {
  rmSync(profil, { recursive: true, force: true });
} catch {
  /* geçici dizin kalsın */
}
