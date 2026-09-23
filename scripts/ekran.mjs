#!/usr/bin/env node
/* ============================================================================
   EKRAN · sayfaları dilim dilim fotoğraflar (24.09.2026)
   Burak: "tüm sitede dolaş … gerektiği yerlerin hepsini ekran fotosu al,
   ordan bakarak hataları tespit ederek devam et. Mobilde çok fazla hiza
   sorunu var."

     node scripts/ekran.mjs --klasor /tmp/ekran --en 390 [--rota /,/dubai] [--dilim 1400]

   Hareket azaltılmış (sahneler durur), sayfa bir kez sonuna kadar kaydırılır
   (görünürken beliren içerik açılsın), sonra yukarıdan aşağı `dilim`
   yüksekliğinde JPEG'ler: <klasor>/<rota>@<en>-<n>.jpg. Ayrıca taşma raporu:
   belgenin yatay kaydırma genişliği ve sağ kenarı pencereyi aşan öğeler.
   ========================================================================== */
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const arg = (ad, v) => {
  const i = process.argv.indexOf(`--${ad}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : v;
};
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const KOK = arg("kok", "http://localhost:3100");
const KLASOR = arg("klasor", join(tmpdir(), "ortac-ekran"));
const EN = Number(arg("en", 390));
const DILIM = Number(arg("dilim", EN < 768 ? 1300 : 1100));
const PORT = Number(arg("port", 9680 + (EN % 17)));
const ROTALAR = arg(
  "rota",
  "/,/dubai,/ingiltere,/kktc,/dubai/muhasebe,/dubai/banka-hesabi,/dubai/oturum-vize,/hakkimizda,/iletisim,/ulkeler,/sektorler/yazilim-ve-teknoloji,/uygunluk-testi,/araclar,/araclar/isim-ureteci,/is-ortakligi,/basinda-biz,/kariyer,/kaynaklar,/blog,/gelismeler,/e-kitaplar,/basla",
).split(",");
mkdirSync(KLASOR, { recursive: true });

const profil = mkdtempSync(join(tmpdir(), "ortac-ekran-"));
const chrome = spawn(
  CHROME,
  ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profil}`, "--hide-scrollbars", "--no-first-run", "about:blank"],
  { stdio: "ignore" },
);
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
let hedef;
for (let i = 0; i < 80 && !hedef; i++) {
  try {
    hedef = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page");
  } catch {
    /* açılıyor */
  }
  if (!hedef) await bekle(250);
}
const ws = new WebSocket(hedef.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let sira = 0;
const bek = new Map();
let olaylar = [];
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && bek.has(m.id)) {
    bek.get(m.id)(m);
    bek.delete(m.id);
  } else if (m.method) olaylar.push(m.method);
});
const cdp = (method, params = {}) =>
  new Promise((r) => {
    const i = ++sira;
    bek.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const ev = async (e) =>
  (await cdp("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true })).result?.result?.value;

await cdp("Page.enable");
await cdp("Runtime.enable");
await cdp("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await cdp("Emulation.setDeviceMetricsOverride", { width: EN, height: 900, deviceScaleFactor: 1, mobile: EN < 768 });

const rapor = [];
for (const rota of ROTALAR) {
  olaylar = [];
  await cdp("Page.navigate", { url: KOK + rota });
  for (let i = 0; i < 200 && !olaylar.includes("Page.loadEventFired"); i++) await bekle(100);
  await ev("document.fonts.ready.then(()=>1)");
  await ev(
    `(async()=>{const b=ms=>new Promise(r=>setTimeout(r,ms));for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await b(70);}window.scrollTo(0,0);await b(700);return 1})()`,
  );
  // sabit/yapışkan öğeler her dilimde tekrarlanmasın
  await ev(
    `[...document.querySelectorAll('body *')].forEach(e=>{const p=getComputedStyle(e).position;if(p==='fixed'||p==='sticky'){e.dataset.ekranSabit=p;e.style.position=p==='sticky'?'relative':'absolute'}})`,
  );
  const tasma = await ev(`(()=>{const W=document.documentElement.clientWidth;const sw=document.documentElement.scrollWidth;const o=[];for(const e of document.querySelectorAll('body *')){const r=e.getBoundingClientRect();if(r.width>0&&r.right>W+1){let a=e,gizli=false;while(a&&a!==document.body){const s=getComputedStyle(a);if(s.overflowX==='hidden'||s.overflowX==='clip'||s.overflowX==='auto'||s.overflowX==='scroll'){if(a!==e){gizli=true;break}}a=a.parentElement}if(!gizli){const c=(typeof e.className==='string'&&e.className.trim().split(/\\s+/)[0])||e.tagName.toLowerCase();o.push(c+'('+Math.round(r.right-W)+')')}}}return JSON.stringify({sw,W,o:[...new Set(o)].slice(0,15)})})()`);
  rapor.push(`${rota}@${EN} ${tasma}`);
  const H = await ev("document.documentElement.scrollHeight");
  const ad = rota === "/" ? "ana" : rota.slice(1).replace(/\//g, "_");
  let n = 0;
  for (let y = 0; y < H; y += DILIM) {
    const r = await cdp("Page.captureScreenshot", {
      format: "jpeg",
      quality: 72,
      captureBeyondViewport: true,
      clip: { x: 0, y, width: EN, height: Math.min(DILIM, H - y), scale: 1 },
    });
    writeFileSync(join(KLASOR, `${ad}@${EN}-${String(++n).padStart(2, "0")}.jpg`), Buffer.from(r.result.data, "base64"));
  }
  process.stdout.write(`${rota} ${n} dilim  `);
}
writeFileSync(join(KLASOR, `tasma@${EN}.txt`), rapor.join("\n"));
console.log(`\n${KLASOR}`);
ws.close();
chrome.kill();
