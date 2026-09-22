/* ============================================================================
   YARIÇAP DENETİMİ — köşeler ölçeğin içinde mi?

   19.09.2026 · Bu betik bir gün önce yazılmıştı ve KURALI DEĞİŞTİ. Eski kural
   yarıçapı kutunun kısa kenarının bandından hesaplıyordu; depo sayılınca dört
   yerden birden çöktü (gerekçenin tamamı globals.css · :root · radius bloğunda
   yazılı, en kısası: kural müşterinin beğendiği kutuyu hatalı sayıyordu ve
   kabı dolduran bir panelde "kısa kenar" içindeki yazı kadar demekti).

   YENİ KURAL · DÖRT BASAMAK, ROLE GÖRE:
        8  (--r-sm)     çip, rozet, ikon kutusu, küçük işaret
       12  (--r-md)     satır, girdi, liste ögesi, menü bağlantısı, küçük kart
       18  (--r-lg)     kart, karo, kutu
       28  (--r-panel)  kabın genişliğinde duran, bölümü tutan ya da kapatan panel

   BETİK ROLÜ TAYİN ETMİYOR — edemez. Bir kutunun "satır mı kart mı panel mi"
   olduğu tasarım kararı ve insanda kalıyor. Betiğin sorduğu tek soru şu:

       BU YARIÇAP ÖLÇEĞİN İÇİNDE Mİ?

   Yani 8/12/18/28 dışında bir sayı görürse yazıyor. Bu KARAR VERİLEBİLİR bir
   liste: her satır için "hangi basamağa ait" diye sorulur ve cevaplanır. Eski
   betiğin ürettiği liste karar verilemezdi, çünkü betik hem sayıyı hem rolü
   kendi tayin ediyordu ve sitenin dörtte üçünü yuvarlatmak istiyordu.

   KURALIN DIŞINDA KALANLAR (ve nedenleri):
     · İÇ YARIÇAP: bir kutunun içine oturan bandın köşesi, dış yarıçap eksi
       çerçeve kalınlığı olur (28 − 1 = 27 gibi). Ölçeğin türevi, sapması
       değil; betik izinli değerlerin bir eksiğini de kabul ediyor;
     · BİR ÇİZİMİ ÇERÇEVELEYEN KÜÇÜK KUTU: içinde tek çocuk olarak <svg>
       taşıyan ve 32 px'i geçmeyen kutular — bayrak kabı, ikon çerçevesi.
       Oradaki yarıçap kutunun değil, çizimin kenarını yumuşatma kararı;
     · hap ve daire — orada yarıçap ölçüyü değil BİÇİMİ bildiriyor. Daire
       `border-radius: 50%` ile yazılıyor ve hesaplanmış stilde de YÜZDE olarak
       dönüyor; betik bunu piksele çevirip karşılaştırıyor (eski sürümde "%50"
       parseFloat ile 50 px sanılıyordu ve 2362 px'lik dekoratif bir yay
       "uyumsuz" sayılıyordu — ayrıştırma hatasıydı, düzeltildi);
     · yarıçapı 0 olan kutular — köşe kararı yok;
     · çok küçük kutular (kısa kenar < 16 px) — ikon ve süs;
     · `data-yaricap="serbest"` taşıyan kutular ve onların İÇİNDEKİLER.

   SON MADDE ÇİZİMLER İÇİN VAR. Sitedeki mokaplar, sohbet balonları, bayrak
   kutuları ve haritalar site kromu değil İLLÜSTRASYON; oradaki 7, 9, 10, 11 px
   gibi sayılar bir çizimin iç ölçüleri ve ölçeğe sokulmaları anlamsız. Çizimin
   KÖKÜNE `data-yaricap="serbest"` yazılır ve yanına gerekçe düşülür; içindeki
   her şey kendiliğinden muaf olur.

   22.09.2026 · İKİNCİ SORU: BU YARIÇAP KUTUNUN BOYUNA UYUYOR MU?
   Ölçek tek başına yetmedi. Burak muhasebe sayfasında 28'lik bir panelin
   yanında 12'lik kartları gösterdi ("sağdakiler buna uymuyor, çok az radiusu
   var"): kartların yarıçapı ölçeğin İÇİNDEYDİ ama boylarına uymuyordu — kural
   onları isimden "liste ögesi" sayıp satır yarıçapı vermişti. Rol artık
   kutunun ekrandaki boyundan okunuyor (tablo globals.css · :root · radius
   bloğunun sonunda):
        boy < 48 → 8/12 · 48-59 → 12 · 60-71 → 12/18 · ≥ 72 → 18 ·
        ≥ 200 → 18/28 · kabın ≥ %90'ı VE ≥ 72 px → 18/28
   Yalnız GÖRÜNÜR kutular (kenar, zemin, gölge ya da görsel zemin) ve yalnız
   1024 ve üstünde ölçülüyor: dar ekranda aynı kart iki kat uzuyor, köşe ise
   genişlikten bağımsız tek karar. Muaf: form alanları (bir formun alanları tek
   köşe taşır), aria-hidden çizimler ve svg, `data-yaricap="serbest"`.
   AYNI SINIFIN HERHANGİ BİR KOPYASI UYUYORSA SINIF GEÇER: bir listede 64 ve 80
   px'lik ögeler tek köşe taşır, betik bir kopyayı bahane edip sınıfı böldürmez.

   KULLANIM
     node scripts/yaricap-check.mjs                    # varsayılan rotalar
     node scripts/yaricap-check.mjs --rota /,/muhasebe
     node scripts/yaricap-check.mjs --en 390           # dar ekran

   ÇIKTI sınıf adına göre toplanmış: aynı sınıfın yirmi kopyası tek satır.
   Bugünkü taban en altta yazılı ve tur tur düşürülüyor; sayı artıyorsa yeni
   yazılan kutu ölçeğin dışında demektir.
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

/* Sayfadaki her kutunun yarıçapını oku, ölçeğin dışındakileri sınıfıyla topla.
   MENÜ PANELLERİ DE AÇILIYOR: kapalıyken DOM'da hiç bulunmadıkları için eski
   betik onları hiç ölçmemişti, oysa ziyaretçinin her sayfada dokunduğu ilk
   şey orası. */
const OLC = `(async () => {
  const b = (ms) => new Promise((r) => setTimeout(r, ms));
  const IZIN = [8, 12, 18, 28];
  // İç yarıçap: dış eksi çerçeve. 27 = 28 − 1 gibi değerler sapma değil türev.
  const IZINLI = (v) => IZIN.includes(v) || IZIN.includes(v + 1);
  const bulunan = new Map();
  const BOY_OLC = ${EN >= 1024};
  const boyMap = new Map();
  const alfa = (c) => { const m = c.match(/rgba?\\(([^)]+)\\)/); if (!m) return 0; const p = m[1].split(",").map((x) => x.trim()); return p.length === 4 ? parseFloat(p[3]) : 1; };
  const gorunur = (st) =>
    (parseFloat(st.borderTopWidth) > 0 && alfa(st.borderTopColor) > 0.05) ||
    alfa(st.backgroundColor) > 0.05 || st.boxShadow !== "none" || st.backgroundImage !== "none";
  // Tam genişlik yalnız KART BOYUNDAKİ kutuyu panele çeviriyor: kabı boydan
  // boya geçen 54-58 px'lik bir not satırı hâlâ bir satır (ilk koşuda
  // .ys-rule ve .tl-more bu yüzden yanlışlıkla işaretlendi).
  const beklenen = (h, tam) => {
    if (tam && h >= 72) return [18, 28];
    if (h < 48) return [8, 12];
    if (h < 60) return [12];
    if (h < 72) return [12, 18];
    if (h < 200) return [18];
    return [18, 28];
  };
  const kapGen = (() => { const k = document.querySelector(".container-o"); return k ? k.getBoundingClientRect().width : window.innerWidth; })();

  const tara = (nereden) => {
    document.querySelectorAll("*").forEach((el) => {
      const st = getComputedStyle(el);
      const ham = st.borderTopLeftRadius;
      if (!ham || ham === "0px") return;
      if (el.closest("[data-yaricap='serbest']")) return;   // bildirilmiş istisna
      const kutu = el.getBoundingClientRect();
      const kisa = Math.round(Math.min(kutu.width, kutu.height));
      if (kisa < 16) return;                                 // ikon, süs

      // YÜZDE PİKSELE ÇEVRİLİYOR: daire "50%" olarak dönüyor ve parseFloat
      // onu 50 px sanıyordu.
      const yuzde = ham.trim().endsWith("%");
      const sayi = parseFloat(ham);
      const r = yuzde ? (sayi / 100) * kutu.width : sayi;
      if (!isFinite(r) || r <= 0) return;
      if (r >= kisa / 2 - 0.5) return;                        // hap ya da daire

      const yuv = Math.round(r);
      if (IZINLI(yuv)) {
        // BOY UYUMU (yalnız masaüstü). Çizimler, form alanları ve görünmez
        // kutular muaf; sınıf herhangi bir kopyası uyuyorsa geçer.
        if (!BOY_OLC || !gorunur(st)) return;
        if (el.closest("svg, [aria-hidden='true']")) return;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) return;
        // KENARA YASLI BANT: köşelerinden biri 0 (yalnız üst ya da yalnız alt
        // köşeler yuvarlak). Bir kart değil, bir panelin kenarına oturan şerit
        // ve köşesi panelinkini izlemek zorunda (.onv-axis · .onv-foot: 28'lik
        // menü panelinin içinde 27). Boyu köşesini belirlemiyor.
        if (parseFloat(st.borderBottomLeftRadius) === 0 || parseFloat(st.borderTopRightRadius) === 0) return;
        const adB =
          el.className && typeof el.className === "string"
            ? el.className.trim().split(/\\s+/)[0]
            : el.parentElement && typeof el.parentElement.className === "string"
              ? el.parentElement.className.trim().split(/\\s+/)[0] + " > " + el.tagName.toLowerCase()
              : "";
        if (!adB) return;
        const h = Math.round(kutu.height);
        const tam = kutu.width >= kapGen * 0.9;
        const uyar = beklenen(h, tam).some((b) => b === yuv || b === yuv + 1);
        const k = adB + "|" + yuv;
        if (!boyMap.has(k)) boyMap.set(k, { ad: adB, r: yuv, hmin: h, hmax: h, n: 0, uyan: false, nereden });
        const t = boyMap.get(k);
        t.n++; t.hmin = Math.min(t.hmin, h); t.hmax = Math.max(t.hmax, h);
        if (uyar) t.uyan = true;
        return;
      }

      // Bir çizimi çerçeveleyen küçük kutu (bayrak kabı, ikon çerçevesi):
      // yarıçap kutunun değil, çizimin kenarını yumuşatma kararı.
      if (kisa <= 32 && el.children.length === 1 && el.firstElementChild.tagName.toLowerCase() === "svg") return;

      const ad =
        el.className && typeof el.className === "string"
          ? el.className.trim().split(/\\s+/)[0]
          : "";
      if (!ad) return;
      const anahtar = ad + "|" + yuv;
      if (!bulunan.has(anahtar)) bulunan.set(anahtar, { ad, r: yuv, kisa, nereden, n: 0 });
      bulunan.get(anahtar).n++;
    });
  };

  tara("sayfa");

  // Menüyü aç: dört panelin de içi ölçülsün.
  const tetik = [...document.querySelectorAll("header button, nav button")];
  for (const t of tetik.slice(0, 6)) {
    try {
      t.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true }));
      t.click();
      await b(420);
      tara("menü");
      t.click();
      await b(120);
    } catch {
      /* açılmayan düğme sorun değil */
    }
  }

  return JSON.stringify({ olcek: [...bulunan.values()], boy: [...boyMap.values()] });
})()`;

console.log(`Yarıçap denetimi · ${EN}×${BOY} · ${KOK}`);
console.log("Ölçek: 8 / 12 / 18 / 28 · hap ve daire hariç\n");

/** sınıf|yarıçap → { ad, r, kisa, n, rotalar:Set } */
const toplam = new Map();
/** BOY katmanı: sınıf|yarıçap → { ad, r, hmin, hmax, n, rotalar:Set } */
const boyToplam = new Map();
/** Bir rotada uyan kopyası olan sınıf, başka rotadaki uymayan kopyası için de
    geçer: sınıf tek köşe taşıyor. */
const boyUyan = new Set();

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
  const cozum = ham ? JSON.parse(ham) : { olcek: [], boy: [] };
  const satirlar = cozum.olcek;
  for (const b of cozum.boy) {
    const k = `${b.ad}|${b.r}`;
    if (b.uyan) { boyUyan.add(k); continue; }
    if (!boyToplam.has(k)) boyToplam.set(k, { ...b, n: 0, rotalar: new Set() });
    const t = boyToplam.get(k);
    t.n += b.n; t.hmin = Math.min(t.hmin, b.hmin); t.hmax = Math.max(t.hmax, b.hmax);
    t.rotalar.add(yol);
  }
  for (const s of satirlar) {
    const anahtar = `${s.ad}|${s.r}`;
    if (!toplam.has(anahtar)) toplam.set(anahtar, { ...s, rotalar: new Set() });
    const t = toplam.get(anahtar);
    t.n += s.n;
    t.rotalar.add(yol);
  }
  console.log(`  ${yol} · ${satirlar.length === 0 ? "temiz" : `${satirlar.length} ölçek dışı sınıf`}`);
}

const liste = [...toplam.values()].sort((a, b) => b.n - a.n);
if (liste.length > 0) {
  console.log("\nÖlçek dışı köşeler (sınıf · yarıçap · kutunun kısa kenarı · kopya · nerede):");
  for (const t of liste) {
    console.log(
      `  ${t.ad}  ${t.r}px  ·  kutu ${t.kisa}px  ·  ${t.n} kopya  ·  ${[...t.rotalar].slice(0, 3).join(" ")}`,
    );
  }
}
const boyListe = [...boyToplam.values()].filter((t) => !boyUyan.has(`${t.ad}|${t.r}`)).sort((a, b) => b.n - a.n);
if (EN >= 1024 && boyListe.length > 0) {
  console.log("\nBoyuna uymayan köşeler (sınıf · yarıçap · kutu boyu · kopya · nerede):");
  for (const t of boyListe) {
    console.log(`  ${t.ad}  ${t.r}px  ·  boy ${t.hmin}${t.hmax !== t.hmin ? "-" + t.hmax : ""}px  ·  ${t.n} kopya  ·  ${[...t.rotalar].slice(0, 3).join(" ")}`);
  }
}
console.log(`\nyaricap-check: ${liste.length} sınıfın yarıçapı ölçeğin dışında`);
if (EN >= 1024) console.log(`yaricap-check: ${boyListe.length} sınıfın yarıçapı boyuna uymuyor`);

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
