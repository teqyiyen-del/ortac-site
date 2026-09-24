#!/usr/bin/env node
/* ============================================================================
   BAĞLAM · her CSS kuralının sayfada GERÇEKTE nerede durduğunu ölçer
   (24.09.2026)

   Ham değer normalleştirmesinin (scripts/basamak.mjs --gri / --bosluk)
   ihtiyaç duyduğu iki bilgi CSS'ten okunamıyor:
     · bir gri yazı AÇIK zeminde mi KOYU zeminde mi? (#9a9a9a beyazda
       --text-3'e, gecede beyaz .62'ye gider)
     · bir boşluk bir ÇİZİMİN içinde mi? (DESIGN.md · Boşluk: "sahne içi
       boşluklar kapsam dışı")
   Betik her kuralın seçicisini (hover, odak, ::before gibi duruma bağlı
   parçalar atılarak) rotalarda başsız Chrome'da arıyor ve eşleşen ögeler
   için sayıyor: kaç tane, kaçı sahnede (aria-hidden, svg, serbest çizim),
   kaçının gerçek zemini açık, kaçının koyu (saydam katmanlar karıştırılarak,
   kontrast.mjs ile aynı yöntem).

     node scripts/baglam.mjs [--cikti scripts/.baglam.json]

   Çıktı: { "<dosya>|<kural sırası>": { n, sahne, acik, koyu } }. Hiçbir
   rotada eşleşmeyen kural çıktıda n: 0 — dönüştürücü onlara dokunmuyor.
   ========================================================================== */
import { spawn } from "node:child_process";
import fs from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (a, v) => {
  const i = process.argv.indexOf(`--${a}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : v;
};
const CIKTI = arg("cikti", path.join(KOK, "scripts/.baglam.json"));
const ROTALAR = arg(
  "rota",
  "/,/dubai,/ingiltere,/kktc,/ulkeler,/dubai/muhasebe,/dubai/muhasebe/defter-tutma,/dubai/muhasebe/kdv-kaydi,/dubai/banka-hesabi,/dubai/oturum-vize,/hakkimizda,/iletisim,/sektorler/yazilim-ve-teknoloji,/uygunluk-testi,/araclar,/araclar/isim-ureteci,/araclar/bae-kdv,/araclar/ingiltere-isim-sorgulama,/araclar/ingiltere-sic-kodu,/araclar/kurumlar-vergisi/dubai,/is-ortakligi,/basinda-biz,/kariyer,/kaynaklar,/blog,/blog/dubaide-sirket-kurmanin-maliyet-kalemleri,/blog/kategori/ulke-rehberi,/gelismeler,/e-kitaplar,/basla,/lp/dubai-sirket-kurulusu,/bulunmayan-sayfa",
).split(",");
const ENLER = arg("en", "1440,390").split(",").map(Number);

/* ---- kurallar */
export const dosyalar = () => [
  path.join(KOK, "src/app/globals.css"),
  ...fs
    .readdirSync(path.join(KOK, "src/app/css"))
    .filter((f) => f.endsWith(".css") && !/^(lab-|ds-|karsilastir|teyit)/.test(f))
    .map((f) => path.join(KOK, "src/app/css", f)),
];
/* duruma bağlı parçalar atılır: öge yine sayfada, yalnız o an o hâlde değil */
export const sade = (sel) =>
  sel
    .replace(/::?(before|after|placeholder|marker|selection|backdrop|-webkit-[a-z-]+|-moz-[a-z-]+)/g, "")
    .replace(/:(hover|focus-visible|focus-within|focus|active|visited|link|target|checked|placeholder-shown|disabled|enabled)(?![\w-])/g, "")
    .trim() || "*";

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const kurallar = [];
  for (const f of dosyalar()) {
    const kok = postcss.parse(fs.readFileSync(f, "utf8"), { from: f });
    let i = 0;
    kok.walkRules((r) => {
      if (r.parent?.type === "atrule" && /keyframes$/i.test(r.parent.name)) return;
      const id = `${path.basename(f)}|${i++}`;
      kurallar.push({ id, secici: r.selectors.map(sade) });
    });
  }

  const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const PORT = 9790;
  const chrome = spawn(
    CHROME,
    ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${fs.mkdtempSync(path.join(tmpdir(), "ortac-b-"))}`, "--hide-scrollbars", "--no-first-run", "about:blank"],
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

  const OLC = `(async()=>{
const b=ms=>new Promise(r=>setTimeout(r,ms));
for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await b(30);}window.scrollTo(0,0);await b(300);
const K=${JSON.stringify(kurallar)};
const P=s=>{const m=s&&s.match(/rgba?\\(([^)]+)\\)/);if(!m)return null;const p=m[1].split(/[ ,/]+/).filter(Boolean).map(Number);return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}};
const X=(u,a)=>({r:u.r*u.a+a.r*(1-u.a),g:u.g*u.a+a.g*(1-u.a),b:u.b*u.a+a.b*(1-u.a),a:1});
const zemin=el=>{let e=el;const st=[];while(e&&e.nodeType===1){const cs=getComputedStyle(e);if(cs.backgroundImage!=='none'&&/gradient|url/.test(cs.backgroundImage)&&!st.length)return null;const c=P(cs.backgroundColor);if(c&&c.a>0){st.push(c);if(c.a>=1)break}e=e.parentElement}let g={r:255,g:255,b:255,a:1};for(let i=st.length-1;i>=0;i--)g=X(st[i],g);return (0.2126*g.r+0.7152*g.g+0.0722*g.b)/255};
const out={};
for(const k of K){let n=0,sahne=0,acik=0,koyu=0;for(const s of k.secici){let els;try{els=document.querySelectorAll(s)}catch{continue}let say=0;for(const e of els){if(say++>=12)break;n++;if(e.closest('[aria-hidden="true"],svg,[data-yaricap="serbest"]'))sahne++;const z=zemin(e);if(z===null)continue;if(z>0.5)acik++;else koyu++}}if(n)out[k.id]=[n,sahne,acik,koyu]}
return JSON.stringify(out)})()`;

  const toplam = {};
  for (const en of ENLER) {
    await cdp("Emulation.setDeviceMetricsOverride", { width: en, height: 900, deviceScaleFactor: 1, mobile: en < 768 });
    for (const rota of ROTALAR) {
      olaylar = [];
      await cdp("Page.navigate", { url: "http://localhost:3100" + rota });
      for (let i = 0; i < 200 && !olaylar.includes("Page.loadEventFired"); i++) await bekle(100);
      await ev("document.fonts.ready.then(()=>1)");
      await bekle(600);
      const o = JSON.parse((await ev(OLC)) || "{}");
      for (const [id, [n, s, a, k]] of Object.entries(o)) {
        const t = (toplam[id] ??= { n: 0, sahne: 0, acik: 0, koyu: 0 });
        t.n += n;
        t.sahne += s;
        t.acik += a;
        t.koyu += k;
      }
      process.stdout.write(`${rota}@${en} `);
    }
  }
  fs.writeFileSync(CIKTI, JSON.stringify(toplam));
  console.log(`\n${Object.keys(toplam).length} / ${kurallar.length} kural sayfada eşleşti → ${path.relative(KOK, CIKTI)}`);
  ws.close();
  chrome.kill();
}
