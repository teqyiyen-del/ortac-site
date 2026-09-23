#!/usr/bin/env node
/* ============================================================================
   KONTRAST TARAMASI (24.09.2026) · design system katmanları site geneline
   açılırken: İngiltere'de koyu zeminde test edilen bir renk kuralı başka
   sayfada açık zemine düşebilir. Her görünür metnin gerçek zeminini
   (şeffaf katmanları karıştırarak) bulur, WCAG oranını hesaplar; 4,5 (büyük
   yazıda 3) altını raporlar. Marka logoları (.bm-, .cos-k-logo), sabit menü (saydam, altındaki
   hero'ya göre okunuyor; betik zemini bulamıyor) ve mavi düğme (Burak'ın
   kararı: #307fe2 kalıyor) hariç.
     node scripts/kontrast.mjs [--en 1440] [--rota /,/dubai]
   ========================================================================== */
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const arg = (a, v) => { const i = process.argv.indexOf(`--${a}`); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : v; };
const EN = Number(arg("en", 1440));
const PORT = Number(arg("port", 9700 + (EN % 13)));
const ROTALAR = arg("rota", "/,/dubai,/ingiltere,/kktc,/dubai/muhasebe,/dubai/banka-hesabi,/dubai/oturum-vize,/hakkimizda,/iletisim,/ulkeler,/sektorler/yazilim-ve-teknoloji,/uygunluk-testi,/araclar,/araclar/isim-ureteci,/araclar/kurumlar-vergisi/dubai,/is-ortakligi,/basinda-biz,/kariyer,/kaynaklar,/blog,/gelismeler,/e-kitaplar,/basla,/lp/dubai-sirket-kurulusu").split(",");
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "ortac-k-"))}`, "--no-first-run", "about:blank"], { stdio: "ignore" });
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
let h; for (let i = 0; i < 80 && !h; i++) { try { h = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page"); } catch {} if (!h) await bekle(250); }
const ws = new WebSocket(h.webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let s = 0; const b = new Map(); let ol = [];
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && b.has(m.id)) { b.get(m.id)(m); b.delete(m.id); } else if (m.method) ol.push(m.method); });
const cdp = (method, params = {}) => new Promise((r) => { const i = ++s; b.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await cdp("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true })).result?.result?.value;
await cdp("Page.enable"); await cdp("Runtime.enable");
await cdp("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await cdp("Emulation.setDeviceMetricsOverride", { width: EN, height: 900, deviceScaleFactor: 1, mobile: EN < 768 });
const TARA = `(async()=>{const bk=ms=>new Promise(r=>setTimeout(r,ms));for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await bk(50)}scrollTo(0,0);await bk(500);
const P=c=>{const m=c.match(/[\\d.]+/g);return m?{r:+m[0],g:+m[1],b:+m[2],a:m[3]!==undefined?+m[3]:1}:null};
const X=(f,g)=>({r:f.r*f.a+g.r*(1-f.a),g:f.g*f.a+g.g*(1-f.a),b:f.b*f.a+g.b*(1-f.a),a:1});
const L=c=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b)};
const CR=(a,c)=>{const x=L(a),y=L(c);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const BG=el=>{let e=el;const st=[];while(e&&e.nodeType===1){const cs=getComputedStyle(e);if(cs.backgroundImage!=='none'&&cs.backgroundImage.includes('gradient'))return null;const c=P(cs.backgroundColor);if(c&&c.a>0){st.push(c);if(c.a>=1)break}e=e.parentElement}let g={r:255,g:255,b:255,a:1};for(let i=st.length-1;i>=0;i--)g=X(st[i],g);return g};
const o={};for(const el of document.querySelectorAll('body *')){if(el.closest('svg,.bm-chip,.cos-k-logo,.sr-only,[aria-hidden="true"],header,nav,.onv'))continue;if(el.matches('.btn-solid,.btn-solid *,.onv-cta'))continue;const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)continue;if(![...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))continue;if(el.getClientRects().length===0)continue;{const r=el.getBoundingClientRect();if(r.width<=1||r.height<=1)continue;}if(el.closest('.sc-msg'))continue;
const g=BG(el);if(!g)continue;const f=P(cs.color);const c=CR(X(f,g),g);const fs=parseFloat(cs.fontSize),fw=+cs.fontWeight;const esik=(fs>=24||(fs>=18.66&&fw>=700))?3:4.5;if(c<esik){const ad=x=>(typeof x.className==='string'&&x.className.trim().split(/\\s+/)[0])||'';const k=(ad(el)||((el.parentElement&&ad(el.parentElement)?ad(el.parentElement)+' > ':'')+el.tagName.toLowerCase()))+' '+cs.color+' zemin rgb('+[g.r,g.g,g.b].map(Math.round)+') '+fs+'px '+c.toFixed(2);o[k]=(o[k]||0)+1}}return JSON.stringify(o)})()`;
let top = 0;
for (const r of ROTALAR) { ol = []; await cdp("Page.navigate", { url: "http://localhost:3100" + r }); for (let i = 0; i < 200 && !ol.includes("Page.loadEventFired"); i++) await bekle(100); await bekle(900);
  const o = JSON.parse((await ev(TARA)) || "{}"); const k = Object.keys(o); top += k.length; console.log(`${r}@${EN}: ${k.length ? k.length + " düşük" : "temiz"}`); for (const x of k) console.log("   " + x + (o[x] > 1 ? " ×" + o[x] : "")); }
console.log(`\nToplam ${top} düşük kontrastlı metin türü.`);
ws.close(); chrome.kill();
