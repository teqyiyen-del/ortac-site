#!/usr/bin/env node
/* ============================================================================
   STİL ANLIK GÖRÜNTÜSÜ · büyük CSS değişikliklerinden önce ve sonra
   23.09.2026 · design system site geneline uygulanırken yazıldı (ölü CSS
   temizliği, breakpoint birleştirmesi). Burak: "eski hâlini de aklında tut."

   Ne yapar: her rotayı istenen genişliklerde başsız Chrome'da açar, hareketi
   azaltır (prefers-reduced-motion: reduce: sahneler durur, gürültü azalır),
   sayfayı sonuna kadar kaydırır, sonra body'deki HER öğenin hesaplanmış
   stilinden bir alt kümeyi belge sırasıyla kaydeder.

     node scripts/stil-anlik.mjs --cikti once.json [--en 1440,390] [--rota /,/dubai]
     node scripts/stil-anlik.mjs --karsilastir once.json sonra.json

   Karşılaştırma: aynı rota ve genişlikte öğe sayısı ya da öğe başına
   özellik farkı. Ölü CSS silmek HİÇBİR farka yol açmamalı; fark çıkarsa
   silinen kural aslında kullanılıyormuş demektir.
   ========================================================================== */
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const arg = (ad, v) => {
  const i = process.argv.indexOf(`--${ad}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : v;
};

/* ---------------------------------------------------------- karşılaştırma */
if (process.argv.includes("--karsilastir")) {
  const i = process.argv.indexOf("--karsilastir");
  const a = JSON.parse(readFileSync(process.argv[i + 1], "utf8"));
  const b = JSON.parse(readFileSync(process.argv[i + 2], "utf8"));
  let toplam = 0;
  for (const k of Object.keys(a)) {
    const x = a[k];
    const y = b[k];
    if (!y) {
      console.log(`${k}: sonrada yok`);
      continue;
    }
    if (x.length !== y.length) {
      console.log(`${k}: öğe sayısı ${x.length} → ${y.length}`);
      toplam++;
      continue;
    }
    const farklar = [];
    for (let j = 0; j < x.length; j++) {
      const p = x[j];
      const q = y[j];
      for (const ozellik of Object.keys(p.s)) {
        if (p.s[ozellik] !== q.s[ozellik]) farklar.push(`${p.y} · ${ozellik}: ${p.s[ozellik]} → ${q.s[ozellik]}`);
      }
    }
    if (farklar.length) {
      toplam += farklar.length;
      console.log(`${k}: ${farklar.length} fark`);
      for (const f of farklar.slice(0, 12)) console.log("   " + f);
    } else console.log(`${k}: aynı`);
  }
  console.log(toplam ? `\nToplam ${toplam} fark.` : "\nFark yok.");
  process.exit(toplam ? 1 : 0);
}

/* ---------------------------------------------------------------- çekim */
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const KOK = arg("kok", "http://localhost:3100");
const CIKTI = arg("cikti", "stil.json");
const ENLER = arg("en", "1440,390").split(",").map(Number);
const VARSAYILAN = [
  "/",
  "/dubai",
  "/ingiltere",
  "/kktc",
  "/dubai/muhasebe",
  "/dubai/banka-hesabi",
  "/dubai/oturum-vize",
  "/hakkimizda",
  "/iletisim",
  "/ulkeler",
  "/sektorler/yazilim-ve-teknoloji",
  "/uygunluk-testi",
  "/araclar",
  "/araclar/isim-ureteci",
  "/araclar/kurumlar-vergisi/dubai",
  "/is-ortakligi",
  "/basinda-biz",
  "/kariyer",
  "/kaynaklar",
  "/blog",
  "/gelismeler",
  "/e-kitaplar",
  "/basla",
  "/teyit",
  "/lp/dubai-sirket-kurulusu",
];
const ROTALAR = arg("rota", "") ? arg("rota", "").split(",") : VARSAYILAN;
const PORT = Number(arg("port", 9660));

const profil = mkdtempSync(join(tmpdir(), "ortac-stil-"));
const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profil}`,
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
    hedef = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page");
  } catch {
    /* henüz açılmadı */
  }
  if (!hedef) await bekle(250);
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
  } else if (m.method) olaylar.push(m.method);
});
const cdp = (method, params = {}) =>
  new Promise((r) => {
    const i = ++sira;
    bekleyen.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const ev = async (e) =>
  (await cdp("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true })).result?.result?.value;

await cdp("Page.enable");
await cdp("Runtime.enable");
await cdp("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });

const OZ = [
  "display", "position", "float", "width", "height",
  "margin-top", "margin-right", "margin-bottom", "margin-left",
  "padding-top", "padding-right", "padding-bottom", "padding-left",
  "font-size", "font-weight", "line-height", "letter-spacing", "text-transform", "text-align",
  "color", "background-color", "background-image",
  "border-top-width", "border-top-color", "border-bottom-width", "border-left-width", "border-right-width",
  "border-top-left-radius", "box-shadow", "row-gap", "column-gap",
  "grid-template-columns", "flex-direction", "justify-content", "align-items", "flex-wrap",
  "overflow-x", "visibility", "max-width", "white-space",
];
const TOPLA = `(async()=>{
  const b=ms=>new Promise(r=>setTimeout(r,ms));
  for(let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await b(40);}
  window.scrollTo(0,0); await b(600);
  const OZ=${JSON.stringify(OZ)};
  const out=[];
  const yol=e=>{const p=[];let x=e;while(x&&x!==document.body&&p.length<4){const c=(typeof x.className==='string'&&x.className.trim().split(/\\s+/)[0])||x.tagName.toLowerCase();p.unshift(c);x=x.parentElement}return p.join('>')};
  for(const el of document.body.querySelectorAll('*')){
    if(el.tagName==='SCRIPT'||el.tagName==='STYLE'||el.tagName==='NOSCRIPT')continue;
    const cs=getComputedStyle(el);const s={};
    for(const o of OZ){let v=cs.getPropertyValue(o);if(o==='width'||o==='height'){v=Math.round(parseFloat(v)||0)+''}s[o]=v}
    out.push({y:yol(el),s});
  }
  return JSON.stringify(out);
})()`;

const sonuc = {};
for (const en of ENLER) {
  await cdp("Emulation.setDeviceMetricsOverride", { width: en, height: 900, deviceScaleFactor: 1, mobile: en < 768 });
  for (const rota of ROTALAR) {
    olaylar = [];
    await cdp("Page.navigate", { url: KOK + rota });
    for (let i = 0; i < 200 && !olaylar.includes("Page.loadEventFired"); i++) await bekle(100);
    await ev("document.fonts.ready.then(()=>1)");
    await bekle(1200);
    const ham = await ev(TOPLA);
    sonuc[`${rota}@${en}`] = ham ? JSON.parse(ham) : [];
    process.stdout.write(`${rota}@${en} ${sonuc[`${rota}@${en}`].length}  `);
  }
}
writeFileSync(CIKTI, JSON.stringify(sonuc));
console.log(`\n${CIKTI} yazıldı.`);
ws.close();
chrome.kill();
