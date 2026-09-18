#!/usr/bin/env node
/* SAYFA DENETİMİ · tarayıcıda gerçekten ne olduğuna bakan tek kapı
 *
 * ---------------------------------------------------------------- NEDEN VAR
 * `tsc`, `lint`, `css-check` ve `serit-check` kaynağa bakıyor. Bu turda
 * (18.09.2026) yakalanan hataların HİÇBİRİ kaynakta görünmüyordu:
 *
 *   · ana sayfadaki uyum sahnesinin tarama çizgisi kartın altından çıkıyordu
 *     (Motion'da SVG `y` öznitelik değil transform; öznitelikle toplanıyordu),
 *   · /dubai'deki isim sahnesinin ok ucu HİÇ ÇİZİLMİYORDU (marker id'si sabitti,
 *     sahne sayfada iki kez basılınca `url(#dv-head)` ilk, gizli kopyaya
 *     bağlanıyordu),
 *   · üç sayfada `prefers-reduced-motion` açık kullanıcıda React hidratasyon
 *     uyuşmazlığı vardı (tuzak A'nın üç yeni örneği).
 *
 * Üçü de ancak sayfayı açıp ölçünce görülüyor. Betik bunu otomatikleştiriyor:
 * başsız Chrome açıyor, her rotayı geziyor, ölçüyor, rapor basıyor.
 *
 * ------------------------------------------------------------- NE YAKALIYOR
 *   1) konsol hatası / uyarısı ve yakalanmamış istisna,
 *   2) başarısız ya da 4xx dönen istek,
 *   3) yatay taşma (documentElement.scrollWidth > innerWidth),
 *   4) kesilen metin (overflow gizli kapta içerik taşıyor),
 *   5) viewBox dışına taşan SVG ögesi (yalnız overflow görünür olan svg'lerde),
 *   6) yüklenemeyen görsel,
 *   7) yinelenen id (SVG marker/clipPath/gradient çakışmasının kaynağı),
 *   8) hedefi olmayan sayfa içi çapa (#id) ve aria-controls/labelledby/describedby,
 *   9) `--reduced` ile: `prefers-reduced-motion` açıkken hidratasyon uyuşmazlığı.
 *
 * ---------------------------------------------------------- NE YAKALAMIYOR
 * Tasarımı. "Çirkin" bir şey buradan geçer. Ölçüyü de yalnızca listelenen
 * biçimlerde yakalıyor: iki nesnenin üst üste binmesi (ana sayfadaki çubukların
 * rozetin altına girmesi gibi) hâlâ EKRAN GÖRÜNTÜSÜYLE bulunuyor.
 *
 * -------------------------------------------------------------- BİLİNEN GÜRÜLTÜ
 * "Kesilen metin" listesinde üç kalıp SÜREKLİ çıkar ve üçü de doğrudur:
 *   · `.sr-only` — zaten 1 px'e kırpılmış ekran okuyucu metni,
 *   · fotoğraf kapları (`.ab-cn-ph`, `.blg-lead-media`) — `object-fit: cover`,
 *   · `.ctry-head` — içindeki fotoğraf `transform: scale(1.02)`.
 * Betik bunları kendisi eliyor; listeye yeni bir kalıp eklemeden önce gerçekten
 * gürültü olduğundan emin ol.
 *
 * ------------------------------------------------------------------ KULLANIM
 *   node scripts/sayfa-denetim.mjs                      # varsayılan rotalar, 1440px
 *   node scripts/sayfa-denetim.mjs --en 390             # dar ekran
 *   node scripts/sayfa-denetim.mjs --reduced            # hidratasyon taraması
 *   node scripts/sayfa-denetim.mjs --rota /dubai,/kktc  # seçili rotalar
 *   node scripts/sayfa-denetim.mjs --kok http://localhost:3100
 *
 * Dev sunucusu AÇIK olmalı (`npm run dev`, 3100). `npm run build` çalıştırma:
 * dev sunucusunu öldürüyor (bkz. docs/tuzaklar.md).
 *
 * Dar ekran notu: Chrome pencereyi ~500 px'in altına indirmiyor, o yüzden
 * gerçek dar ekran `Emulation.setDeviceMetricsOverride` ile kuruluyor.
 * `--window-size=390,844` tek başına 500 px'lik bir sayfa ölçer ve mobil
 * denetimini sessizce yalan yapar; bu tur tam olarak öyle olmuştu.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/* Varsayılan liste: her şablondan en az bir örnek. Blog yazısı, araç sayfası ve
   muhasebe alt sayfası tek tek değil, birer temsilciyle giriyor — hepsini
   gezmek beş dakika sürüyor ve aynı bileşenleri ikinci kez ölçüyor. */
const VARSAYILAN = [
  "/",
  "/dubai",
  "/ingiltere",
  "/kktc",
  "/ulkeler",
  "/dubai/muhasebe",
  "/dubai/muhasebe/kdv-kaydi",
  "/hakkimizda",
  "/iletisim",
  "/araclar",
  "/araclar/kurumlar-vergisi/dubai",
  "/araclar/isim-ureteci",
  "/uygunluk-testi",
  "/basla",
  "/kaynaklar",
  "/blog",
  "/blog/dubaide-sirket-kurmanin-maliyet-kalemleri",
  "/is-ortakligi",
  "/sektorler/yazilim-ve-teknoloji",
  "/lp/dubai-sirket-kurulusu",
];

/* ------------------------------------------------------------- argümanlar */
const arg = (ad, varsayilan) => {
  const i = process.argv.indexOf(`--${ad}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : varsayilan;
};
const bayrak = (ad) => process.argv.includes(`--${ad}`);

const KOK = arg("kok", "http://localhost:3100");
const EN = Number(arg("en", 1440));
const BOY = Number(arg("boy", EN < 768 ? 844 : 900));
const PORT = Number(arg("port", 9222 + (EN % 100)));
const AZALT = bayrak("reduced");
const ROTALAR = arg("rota", "")
  ? arg("rota", "").split(",").map((s) => s.trim()).filter(Boolean)
  : VARSAYILAN;

/* --------------------------------------------------------------- tarayıcı */
const profil = mkdtempSync(join(tmpdir(), "ortac-denetim-"));
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
    ...(AZALT ? ["--force-prefers-reduced-motion"] : []),
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

let sayac = 0;
const bekleyen = new Map();
let konsol = [];
let istek = [];
const olay = [];

ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && bekleyen.has(m.id)) {
    bekleyen.get(m.id)(m);
    bekleyen.delete(m.id);
    return;
  }
  if (m.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(m.params.type)) {
    const metin = m.params.args.map((a) => a.value ?? a.description ?? a.type).join(" ");
    /* Motion'ın kendi "Reduced Motion enabled" uyarısı bizim kurduğumuz kipin
       sonucu, hata değil. */
    if (!metin.includes("Reduced Motion enabled")) konsol.push(metin.slice(0, 400));
  }
  if (m.method === "Runtime.exceptionThrown") {
    konsol.push("İSTİSNA: " + (m.params.exceptionDetails.exception?.description || "").slice(0, 300));
  }
  if (m.method === "Network.loadingFailed") {
    istek.push(`${m.params.errorText} ${m.params.type || ""}`);
  }
  if (m.method === "Network.responseReceived" && m.params.response.status >= 400) {
    istek.push(`${m.params.response.status} ${m.params.response.url.replace(KOK, "")}`);
  }
  if (m.method) olay.push(m.method);
});

const cdp = (method, params = {}) =>
  new Promise((r) => {
    const i = ++sayac;
    bekleyen.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

const calistir = async (ifade) => {
  const r = await cdp("Runtime.evaluate", {
    expression: ifade,
    awaitPromise: true,
    returnByValue: true,
  });
  return r.result?.result?.value;
};

await cdp("Page.enable");
await cdp("Runtime.enable");
await cdp("Network.enable");
/* Pencere boyutu YETMİYOR: Chrome ~500 px'in altına inmiyor. */
await cdp("Emulation.setDeviceMetricsOverride", {
  width: EN,
  height: BOY,
  deviceScaleFactor: 1,
  mobile: EN < 768,
});

/* --------------------------------------------------- sayfanın içindeki ölçüm
   Tek bir ifade olarak gönderiliyor; sayfayı baştan sona geziyor (whileInView
   bileşenleri çizilsin), sonra ölçüyor. */
const OLC = `(async () => {
  const b = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await b(120); }
  window.scrollTo(0, 0); await b(700);

  const out = { yatay: null, kesik: [], svg: [], gorsel: [], id: [], capa: [] };

  if (document.documentElement.scrollWidth > window.innerWidth + 1) {
    out.yatay = document.documentElement.scrollWidth + " > " + window.innerWidth;
  }

  /* viewBox dışına taşan ögeler. svg'nin KENDİSİ ya da ÜSTÜNDEKİ herhangi bir
     kap kırpıyorsa taşma kutudan dışarı çıkmıyor demektir ve çoğu zaman
     bilerek yapılmıştır: /dubai'nin haritasında deniz ve kara dolgusu viewBox'ın
     epey dışına çiziliyor (CountryStructures.tsx · SEA_OVER / LAND_OVER), çünkü
     kutu gerildikçe "daha çok harita" görünsün isteniyor; kırpmayı .ys-map
     yapıyor. Üst kapları taramayan bir denetim bu sahneyi her turda yedi kez
     hata diye bağırır ve rapor okunmaz olur. */
  const kirpiliyor = (el) => {
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const o = getComputedStyle(n);
      if ([o.overflow, o.overflowX, o.overflowY].some((v) => v && v !== "visible")) return true;
    }
    return false;
  };
  document.querySelectorAll("svg[viewBox]").forEach((svg) => {
    if (kirpiliyor(svg)) return;
    const [vx, vy, vw, vh] = svg.getAttribute("viewBox").split(/\\s+/).map(Number);
    if (!vw || !vh) return;
    svg.querySelectorAll("rect,circle,path,text,line,polygon,ellipse").forEach((el) => {
      let k; try { k = el.getBBox(); } catch { return; }
      if (!k || (!k.width && !k.height)) return;
      const t = [];
      if (k.x < vx - 1) t.push("sol " + Math.round(vx - k.x));
      if (k.y < vy - 1) t.push("üst " + Math.round(vy - k.y));
      if (k.x + k.width > vx + vw + 1) t.push("sağ " + Math.round(k.x + k.width - vx - vw));
      if (k.y + k.height > vy + vh + 1) t.push("alt " + Math.round(k.y + k.height - vy - vh));
      if (t.length) out.svg.push({
        kap: svg.getAttribute("class") || svg.parentElement?.getAttribute("class") || "?",
        el: el.tagName + "." + (el.getAttribute("class") || ""),
        tas: t.join(", "),
      });
    });
  });

  /* Kesilen metin. Bilinen üç gürültü kalıbı elenmiş hâlde. */
  const GURULTU = ["sr-only", "onv-sr", "ab-cn-ph", "blg-lead-media", "ctry-head", "pf6-sweep"];
  document.querySelectorAll("p,h1,h2,h3,h4,span,b,a,li,button,td,th,dt,dd").forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.overflow === "visible" && cs.overflowX === "visible") return;
    if (cs.display === "none" || !el.offsetParent) return;
    if (cs.textOverflow === "ellipsis" || cs.overflowX === "auto" || cs.overflowX === "scroll") return;
    if (el.scrollWidth <= el.clientWidth + 2 || el.clientWidth <= 0) return;
    const ad = el.className?.toString?.() || "";
    if (GURULTU.some((g) => ad.includes(g))) return;
    out.kesik.push({
      el: el.tagName + "." + ad.slice(0, 40),
      metin: (el.textContent || "").trim().slice(0, 50),
      fark: el.scrollWidth - el.clientWidth,
    });
  });

  document.querySelectorAll("img").forEach((im) => {
    if (im.complete && im.naturalWidth === 0) out.gorsel.push(im.currentSrc || im.src);
  });

  /* Yinelenen id: SVG marker/clipPath/gradient url(#…) her zaman İLK eşleşmeye
     bağlanır; ikinci kopya sessizce çizilmez. */
  const say = {};
  document.querySelectorAll("[id]").forEach((e) => { say[e.id] = (say[e.id] || 0) + 1; });
  for (const k in say) if (say[k] > 1) out.id.push(k + " ×" + say[k]);

  /* Hedefi olmayan çapa ve aria bağı. */
  const yol = location.pathname.replace(/\\/$/, "");
  document.querySelectorAll('a[href*="#"]').forEach((a) => {
    const h = a.getAttribute("href");
    const i = h.indexOf("#");
    const parca = h.slice(i + 1);
    if (!parca) return;
    if ((h.slice(0, i) || location.pathname).replace(/\\/$/, "") !== yol) return;
    if (!document.getElementById(parca)) {
      out.capa.push(h + " «" + (a.textContent || "").trim().slice(0, 30) + "»");
    }
  });
  ["aria-controls", "aria-labelledby", "aria-describedby"].forEach((at) => {
    document.querySelectorAll("[" + at + "]").forEach((e) => {
      e.getAttribute(at).split(/\\s+/).forEach((v) => {
        if (v && !document.getElementById(v)) out.capa.push(at + "=" + v);
      });
    });
  });
  out.capa = [...new Set(out.capa)];

  return out;
})()`;

/* ----------------------------------------------------------------- tarama */
console.log(`Sayfa denetimi · ${EN}×${BOY}${AZALT ? " · reduced-motion AÇIK" : ""} · ${KOK}\n`);

let toplam = 0;
for (const yol of ROTALAR) {
  konsol = [];
  istek = [];
  olay.length = 0;
  await cdp("Page.navigate", { url: KOK + yol });
  for (let i = 0; i < 400 && !olay.includes("Page.loadEventFired"); i++) await bekle(250);
  await calistir("document.fonts.ready.then(()=>1)");
  await bekle(1500);
  const d = (await calistir(OLC)) || {};

  const bulgu = [];
  const bilgi = [];
  [...new Set(konsol)].forEach((k) => {
    /* next/image'ın LCP ipucu YALNIZCA geliştirme kipinde basılıyor, üretimde
       yok. Hata değil, öneri: /hakkimizda'daki kare için `priority`
       BİLEREK verilmedi (page.tsx'teki nota bak) ve karar müşteriye ait.
       Sayıya katmıyoruz ki rapor hep "1 bulgu" demesin; ama gizlemiyoruz da,
       gerçek fotoğraf geldiğinde yeniden tartılacak. */
    if (k.includes("Largest Contentful Paint (LCP)")) bilgi.push(["bilgi · next/image", k.split("\n")[0]]);
    else bulgu.push(["konsol", k]);
  });
  [...new Set(istek)].forEach((k) => bulgu.push(["istek", k]));
  if (d.yatay) bulgu.push(["yatay taşma", d.yatay]);
  (d.svg || []).forEach((s) => bulgu.push(["svg taşması", `${s.kap} · ${s.el} · ${s.tas}`]));
  (d.kesik || []).forEach((s) => bulgu.push(["kesik metin", `${s.el} (${s.fark}px) «${s.metin}»`]));
  (d.gorsel || []).forEach((s) => bulgu.push(["görsel yok", s]));
  (d.id || []).forEach((s) => bulgu.push(["yinelenen id", s]));
  (d.capa || []).forEach((s) => bulgu.push(["hedefi yok", s]));

  toplam += bulgu.length;
  if (!bulgu.length) {
    console.log(`  ${yol} · temiz${bilgi.length ? ` (${bilgi.length} bilgi)` : ""}`);
  } else {
    console.log(`\n  ${yol} · ${bulgu.length} bulgu`);
    bulgu.slice(0, 20).forEach(([tur, m]) => console.log(`      ${tur}: ${m}`));
    if (bulgu.length > 20) console.log(`      … ve ${bulgu.length - 20} tane daha`);
  }
  bilgi.forEach(([tur, m]) => console.log(`      ${tur}: ${m}`));
}

console.log(`\nToplam bulgu: ${toplam}`);
ws.close();
chrome.kill();
try { rmSync(profil, { recursive: true, force: true }); } catch { /* geçici profil */ }
process.exit(toplam ? 1 : 0);
