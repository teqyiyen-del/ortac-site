#!/usr/bin/env node
/* ============================================================================
   HİZA TARAMASI · mobilde "vibe coding" hatalarını ölçerek bulur (24.09.2026)
   Burak: "yıllık kâr yazısı dikeyde box'una ortalı değil, çok ufak bir şey
   ama bunlar hep vibe coding hatası olduğunu anlatan şeyler … mobilde çok
   fazla hiza sorunu var." Taşma raporu (scripts/ekran.mjs) bunları yakalamıyor;
   gözle bakmak da yüzlerce dilimde kaçırıyor. Bu betik dört şeyi ölçüyor:

     ORTA   · görünür bir kutunun (zemin, kenar ya da gölge) içinde TEK SATIR
              yazı (ve ikon) var ve üstteki boşlukla alttaki 3 px'ten fazla
              farklı ya da bir parçanın merkezi kutunun merkezinden 2,5 px
              kaçık. Ya da kutu, boyları 4 px'ten fazla farklı yazıları TABAN
              hizasıyla yan yana diziyor (etiket-değer satırı: küçük etiket
              aşağı kaymış görünür). Haplar, düğmeler, rozetler, satırlar.
     ÇAKIŞ  · iki ayrı metnin satır kutuları üst üste biniyor (2 px'ten fazla).
     KESİK  · yazı taşıyan bir öğe overflow: hidden ve içeriği kutusundan geniş
              (yazının sonu kesiliyor; bilinçli üç nokta … hariç).
     KENAR  · yazının kendisi pencere kenarına 12 px'ten yakın (kenar boşluğu
              16; kaydırmalı şeritler ve tam genişlik bantlar hariç).

     node scripts/hiza.mjs [--en 390] [--rota /,/dubai]

   Sahneler (aria-hidden) ORTA ve KENAR'dan muaf: çizimin iç ölçüsü. ÇAKIŞ
   onlarda da sayılır, çünkü üst üste binen yazı çizimde de hata.
   ========================================================================== */
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const arg = (a, v) => {
  const i = process.argv.indexOf(`--${a}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : v;
};
const EN = Number(arg("en", 390));
const PORT = Number(arg("port", 9740 + (EN % 11)));
const ROTALAR = arg(
  "rota",
  "/,/dubai,/ingiltere,/kktc,/ulkeler,/dubai/muhasebe,/dubai/muhasebe/defter-tutma,/dubai/banka-hesabi,/dubai/oturum-vize,/hakkimizda,/iletisim,/sektorler/yazilim-ve-teknoloji,/uygunluk-testi,/araclar,/araclar/isim-ureteci,/araclar/bae-kdv,/araclar/ingiltere-isim-sorgulama,/araclar/ingiltere-sic-kodu,/araclar/kurumlar-vergisi/dubai,/is-ortakligi,/basinda-biz,/kariyer,/kaynaklar,/blog,/blog/dubaide-sirket-kurmanin-maliyet-kalemleri,/blog/kategori/ulke-rehberi,/gelismeler,/e-kitaplar,/basla,/lp/dubai-sirket-kurulusu",
).split(",");

const chrome = spawn(
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "ortac-h-"))}`, "--hide-scrollbars", "--no-first-run", "about:blank"],
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

const OLC = `(async()=>{
const b=ms=>new Promise(r=>setTimeout(r,ms));
for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await b(60);}
window.scrollTo(0,0);await b(600);
const W=document.documentElement.clientWidth, SY=()=>window.scrollY;
const ad=e=>{const p=[];let x=e;while(x&&x!==document.body&&p.length<3){const c=(typeof x.className==='string'&&x.className.trim().split(/\\s+/)[0])||x.tagName.toLowerCase();p.unshift(c);x=x.parentElement}return p.join('>')};
const gorunur=e=>{for(let a=e;a&&a!==document.documentElement;a=a.parentElement){const s=getComputedStyle(a);if(s.display==='none'||s.visibility==='hidden'||parseFloat(s.opacity)<0.05)return false;if(a.classList&&a.classList.contains('sr-only'))return false}return true};
const sahne=e=>!!e.closest('[aria-hidden="true"],svg,[data-yaricap="serbest"]');
const kaydirmali=e=>{for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){const s=getComputedStyle(a);if(s.overflowX==='auto'||s.overflowX==='scroll')return true}return false};
/* metin satır kutuları: yalnız GERÇEKTEN görünen kısmı (kapalı <details>,
   overflow ile kırpılmış akordeon ve şerit içindekiler sayılmaz) */
const kirp=(el,q)=>{let L=q.left,T=q.top,R=q.right,B=q.bottom;for(let a=el;a&&a!==document.body;a=a.parentElement){const s=getComputedStyle(a);if(s.overflowX!=='visible'||s.overflowY!=='visible'){const k=a.getBoundingClientRect();L=Math.max(L,k.left);T=Math.max(T,k.top);R=Math.min(R,k.right);B=Math.min(B,k.bottom)}}return {L,T,R,B}};
const kapali=el=>{const d=el.closest('details');return d&&!d.open&&!el.closest('summary')};
const satirlar=[];
const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
let n;while((n=tw.nextNode())){if(!n.textContent.trim())continue;const el=n.parentElement;if(!el||['SCRIPT','STYLE','NOSCRIPT','TITLE'].includes(el.tagName))continue;if(!gorunur(el)||kapali(el))continue;const r=document.createRange();r.selectNodeContents(n);for(const q of r.getClientRects()){if(q.width<2||q.height<4)continue;const k=kirp(el,q);if((k.R-k.L)*(k.B-k.T)<0.6*q.width*q.height||k.R<k.L||k.B<k.T)continue;satirlar.push({el,x:q.left,y:q.top+SY(),r:q.right,b:q.bottom+SY(),t:n.textContent.trim().slice(0,28)})}}
/* görsel parçalar (ikon, bayrak, resim): kutunun içeriği yalnız yazı değil */
const gorseller=[];for(const g of document.body.querySelectorAll('svg,img,canvas')){if(g.parentElement&&g.parentElement.closest('svg'))continue;if(!gorunur(g))continue;const q=g.getBoundingClientRect();if(q.width<4||q.height<4)continue;gorseller.push({el:g,x:q.left,y:q.top+SY(),r:q.right,b:q.bottom+SY(),t:'<'+g.tagName.toLowerCase()+'>'})}
const out={orta:[],cakis:[],kesik:[],kenar:[]};
/* ORTA */
const kutuMu=s=>{const bg=s.backgroundColor;const zemin=bg&&bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent';const kenar=parseFloat(s.borderTopWidth)>0&&parseFloat(s.borderBottomWidth)>0&&s.borderTopStyle!=='none';return zemin||kenar||s.boxShadow!=='none'||s.backgroundImage!=='none'};
const bindi=(a,c)=>Math.min(a.b,c.b)-Math.max(a.y,c.y)>0.5*Math.min(a.b-a.y,c.b-c.y);
for(const e of document.body.querySelectorAll('*')){
  if(['svg','path','IMG','INPUT','TEXTAREA','SELECT','HTML','BODY','MAIN','SECTION','HEADER','FOOTER','NAV','TD','TH','TR','TABLE','TBODY','THEAD'].includes(e.tagName))continue;
  const s=getComputedStyle(e);if(!kutuMu(s))continue;
  const R=e.getBoundingClientRect();if(R.height<18||R.height>110||R.width<30)continue;
  if(sahne(e)||!gorunur(e)||kapali(e))continue;
  const ic=[...satirlar,...gorseller].filter(l=>e.contains(l.el));if(!ic.some(l=>!l.t.startsWith('<')))continue;
  /* tek satır: bütün parçalar dikeyde tek bantta */
  if(!ic.every(a=>ic.every(c=>bindi(a,c))))continue;
  const top=Math.min(...ic.map(l=>l.y))-SY(), bot=Math.max(...ic.map(l=>l.b))-SY();
  const bt=parseFloat(s.borderTopWidth)||0,bb=parseFloat(s.borderBottomWidth)||0;
  const ust=top-R.top-bt, alt=R.bottom-bb-bot;
  const mk=(R.top+bt+R.bottom-bb)/2;const sap=Math.max(...ic.map(l=>Math.abs((l.y+l.b)/2-SY()-mk)));
  /* taban hizası + farklı boylar: küçük etiket büyük rakamın tabanına oturur,
     gözle aşağı kaymış görünür (vgr-sonuc «Yıllık kâr»: geometrik sapma 2 px,
     gözle ~4 px). Kutunun içinde yan yana duran farklı boylar ortalanır. */
  const ai=s.alignItems;const boylar=new Set(ic.filter(l=>!l.t.startsWith('<')).map(l=>Math.round(parseFloat(getComputedStyle(l.el).fontSize))));
  if((s.display.includes('flex')||s.display.includes('grid'))&&/baseline/.test(ai)&&Math.max(...boylar)-Math.min(...boylar)>=4&&s.flexDirection!=='column')out.orta.push(ad(e)+' «'+(ic.find(l=>!l.t.startsWith('<'))||ic[0]).t+'» taban hizası, boylar '+[...boylar].join('/'));
  else if(Math.abs(ust-alt)>3||sap>=2.5)out.orta.push(ad(e)+' «'+(ic.find(l=>!l.t.startsWith('<'))||ic[0]).t+'» üst '+ust.toFixed(1)+' alt '+alt.toFixed(1)+' sapma '+sap.toFixed(1));
}
/* ÇAKIŞ */
const S=[...satirlar].sort((a,b)=>a.y-b.y);
for(let i=0;i<S.length;i++){for(let j=i+1;j<S.length&&S[j].y<S[i].b;j++){const a=S[i],c=S[j];if(a.el===c.el)continue;if(a.el.contains(c.el)||c.el.contains(a.el)){}
  const ox=Math.min(a.r,c.r)-Math.max(a.x,c.x), oy=Math.min(a.b,c.b)-Math.max(a.y,c.y);
  if(ox>2&&oy>2&&oy>0.35*Math.min(a.b-a.y,c.b-c.y)){out.cakis.push(ad(a.el)+' «'+a.t+'» × '+ad(c.el)+' «'+c.t+'» '+ox.toFixed(0)+'×'+oy.toFixed(0))}}}
/* KESİK */
for(const e of document.body.querySelectorAll('*')){const s=getComputedStyle(e);if(!(s.overflowX==='hidden'||s.overflowX==='clip'))continue;if(s.textOverflow==='ellipsis')continue;if(!gorunur(e))continue;
  if(e.scrollWidth>e.clientWidth+1&&e.clientWidth>0){if(sahne(e))continue;const R=e.getBoundingClientRect();if(R.width<=2||R.height<=2)continue;const ic=[];const tw2=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let m;while((m=tw2.nextNode())){if(!m.textContent.trim()||!m.parentElement||kapali(m.parentElement)||!gorunur(m.parentElement))continue;if(getComputedStyle(m.parentElement).position==='absolute')continue;const r=document.createRange();r.selectNodeContents(m);for(const q of r.getClientRects())if(q.width>1)ic.push({el:m.parentElement,x:q.left,r:q.right,t:m.textContent.trim().slice(0,28)})}const tasan=ic.filter(l=>l.r>R.right+1||l.x<R.left-1);if(tasan.length)out.kesik.push(ad(e)+' «'+tasan[0].t+'» +'+(Math.max(...tasan.map(l=>l.r))-R.right).toFixed(0))}}
/* KENAR */
for(const l of satirlar){if(sahne(l.el)||kaydirmali(l.el))continue;if(l.x<12||l.r>W-12)out.kenar.push(ad(l.el)+' «'+l.t+'» '+(l.x<12?'sol '+l.x.toFixed(0):'sağ '+(W-l.r).toFixed(0)))}
for(const k in out)out[k]=[...new Set(out[k])].slice(0,25);
return JSON.stringify(out)})()`;

let toplam = 0;
for (const rota of ROTALAR) {
  olaylar = [];
  await cdp("Page.navigate", { url: "http://localhost:3100" + rota });
  for (let i = 0; i < 200 && !olaylar.includes("Page.loadEventFired"); i++) await bekle(100);
  await ev("document.fonts.ready.then(()=>1)");
  await bekle(800);
  const o = JSON.parse((await ev(OLC)) || "{}");
  const say = Object.values(o).reduce((a, b) => a + b.length, 0);
  toplam += say;
  console.log(`${rota}@${EN}: ${say ? say + " bulgu" : "temiz"}`);
  for (const [k, v] of Object.entries(o)) for (const x of v) console.log(`   ${k.toUpperCase().padEnd(5)} ${x}`);
}
console.log(`\nToplam ${toplam} bulgu.`);
ws.close();
chrome.kill();
