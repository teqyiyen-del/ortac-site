#!/usr/bin/env node
/* ============================================================================
   BASAMAK · ham yazı boylarını ve kalınlıkları design system basamağına
   bağlar (24.09.2026)

   DESIGN.md · Onaylı iş kalemleri: "gri tonların ve metin boylarının
   token'a bağlanması". Denetimde canlı CSS'te 96 ayrı yazı boyu vardı;
   tipografi katmanı (ds-deneme.css) rolü belli sınıfları zaten basamağa
   çekiyor, bu betik GERİDE KALAN ham değerleri çekiyor.

   BOY · basamak 12 · 14 · 16 · 18 · 20 · 24 · 28 · 32 · 40 · 48 · 64.
     En yakın basamak. Tam ortadaysa (13, 15, 17, 19):
       20'nin altında YUKARI — okunurluk kuralı: okunması istenen metin en
       az 14 (Burak: "okunmasını istediğimiz yazıları çok küçük yazmayalım");
       20 ve üstünde AŞAĞI — iri başlık büyüyünce satır ve kutu taşar.
     DOKUNULMAYAN: 11.5'in altı (sahnelerin, çizimlerin iç ölçüsü; 12'ye
     çıkınca çizim bozulur), clamp()/var()/em/rem (akışkan ya da türetilmiş
     boy), svg metni (text, tspan), lab dosyaları ve ds-* katmanları.
   KALINLIK · dört basamak 400 · 500 · 600 · 700:
     550 → 500 (düğme/çip rolü), 650 → 600 (kart ve satır başlığı),
     800 → 700.

   KOYU ZEMİNDE METİN (--koyu) · beyaz saydamlığıyla yazılmış `color`
     değerleri üç kademeye: beyaz · .62 (--on-dark-2) · .5 (--on-dark-3).
     Denetimde aynı işe 28 ayrı saydamlık vardı (.26 … .94). En yakın
     kademe; sınırlar orta noktalar: < .56 → .5, < .81 → .62, üstü beyaz.
     .4'ün altı dokunulmadı (pasif düğme, süs). Yalnız `color` özelliği:
     zemin, kenar ve gölgedeki beyaz saydamlıklar çizgi ve yüzey, metin değil.

   HARF ARALIĞI (--harf) · DESIGN.md tablosu, boya göre: 48+ −.03 · 40
     −.025 · 24-32 −.02 · 18-20 −.015 · 16 −.01 · 14 −.005 · 12 0 (em).
     YALNIZ SIKILAŞTIRIR (Burak: "aç demedim, daralt dedim"): mevcut değer
     hedeften zaten sıkıysa kalır. Kuralın kendi font-size'ı yoksa (boy
     mirastan geliyorsa) dokunulmaz. .04em ve üstü BİLİNÇLİ aralık (IBAN,
     maskeli hesap no, kod, kitap sırtı) · dokunulmaz.

   BAĞLAMLI ÜÇ MOD (25.09.2026 · Burak: "2. seçenekteki konuyu yapabilirsin")
   Önce `node scripts/baglam.mjs` çalışır: her kuralın sayfada eşleşip
   eşleşmediği, çizimde mi olduğu, zemininin açık mı koyu mu olduğu ölçülür
   (scripts/.baglam.json). Hiçbir rotada eşleşmeyen kurala dokunulmaz.
     --gri    `color`'daki düz griler (kanallar arası fark ≤ 20). Açık zeminde
              --text (≤ 50) · --text-2 (≤ 105) · --text-3; koyu zeminde beyaz
              saydamlık karşılığı ((v − 8) / 247) en yakın kademeye (.5 · .62 ·
              beyaz; .35'in altı sönük süs, dokunulmaz). Zeminlerin %80'i aynı
              değilse, çoğu sahnedeyse ya da seçici pasif hâlse dokunulmaz.
     --bosluk margin · padding · gap, 4 px ölçeğine (4 · 8 · 12 · 16 · 20 ·
              24 · 32 · 40 · 48 · 64 · 80 · 96 · 112). En yakını; eşitlikte
              aşağı, 6 → 8 (satır içi rolü). 3 px ve altı (ince ayar), 112
              üstü, eksi, calc/var/%/em değerler ve çoğu sahnede eşleşen
              kurallar ("sahne içi boşluklar kapsam dışı") dokunulmaz.
     --sure   transition süreleri: renk/zemin/kenar/opaklık/gölge 160 ms
              (280-400 arası 240, üstü 480: onlar açılış solması); hareket ve
              boyut 160/240/480'in en yakını (eşitlikte uzun). 50 ms altı
              (hareket azaltma hilesi), 600 ms üstü (büyük sahne kayması) ve
              çizim içindeki kurallar (JS zamanlayıcısıyla eşli olabilir)
              dokunulmaz. Gecikmeye dokunulmaz.

     node scripts/basamak.mjs                 # kuru: özet
     node scripts/basamak.mjs --uygula        # boy + kalınlık yazar
     node scripts/basamak.mjs --koyu --uygula # yalnız koyu zemin metni
     node scripts/basamak.mjs --harf --uygula # yalnız harf aralığı
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UYGULA = process.argv.includes("--uygula");
const KOYU = process.argv.includes("--koyu");
const HARF = process.argv.includes("--harf");
const GRI = process.argv.includes("--gri");
const BOSLUK = process.argv.includes("--bosluk");
const SURE = process.argv.includes("--sure");
const BAGLAMLI = GRI || BOSLUK || SURE;
const BAGLAM = BAGLAMLI ? JSON.parse(fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), ".baglam.json"), "utf8")) : {};
const OLCEK = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 112];
function bosluk(px) {
  if (px === 6) return 8;
  let en = OLCEK[0];
  let fark = Infinity;
  for (const b of OLCEK) {
    const f = Math.abs(b - px);
    if (f < fark - 1e-9) {
      en = b;
      fark = f;
    }
  }
  return en;
}
const hex = (v) => {
  const m = v.trim().toLowerCase().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (!m) return null;
  const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const RENK_OZ = /^(color|background|background-color|border|border-color|border-[a-z]+-color|opacity|box-shadow|fill|stroke|outline|outline-color|text-decoration-color|filter|-webkit-text-stroke-color)$/;
const ms = (t) => (t.endsWith("ms") ? parseFloat(t) : parseFloat(t) * 1000);
function sureEsle(dur, renkMi) {
  if (dur < 50 || dur > 600) return null;
  if (renkMi) return dur < 280 ? 160 : dur <= 400 ? 240 : 480;
  const aday = [160, 240, 480];
  let en = aday[0];
  let fark = Infinity;
  for (const a of aday) {
    const f = Math.abs(a - dur);
    if (f <= fark) {
      en = a;
      fark = f;
    }
  }
  return en;
}
const harfHedef = (px) =>
  px >= 48 ? -0.03 : px >= 40 ? -0.025 : px >= 24 ? -0.02 : px >= 18 ? -0.015 : px >= 16 ? -0.01 : px >= 14 ? -0.005 : 0;
const koyuKademe = (a) => (a < 0.56 ? "var(--on-dark-3)" : a < 0.81 ? "var(--on-dark-2)" : "var(--on-dark)");
const BASAMAK = [12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 64];
const KALINLIK = { 550: 500, 650: 600, 800: 700 };

function basamak(px) {
  let en = BASAMAK[0];
  let fark = Infinity;
  for (const b of BASAMAK) {
    const f = Math.abs(b - px);
    if (f < fark - 1e-9) {
      en = b;
      fark = f;
    } else if (Math.abs(f - fark) < 1e-9) {
      // eşitlik: 20'nin altında yukarı, üstünde aşağı (en zaten küçük olan)
      if (px < 20) en = b;
    }
  }
  return en;
}

const dosyalar = [
  path.join(KOK, "src/app/globals.css"),
  ...fs
    .readdirSync(path.join(KOK, "src/app/css"))
    .filter((f) => f.endsWith(".css") && !/^(lab-|ds-|karsilastir|teyit)/.test(f))
    .map((f) => path.join(KOK, "src/app/css", f)),
];

const ozet = new Map();
let toplam = 0;
for (const f of dosyalar) {
  const kok = postcss.parse(fs.readFileSync(f, "utf8"), { from: f });
  let degisti = false;
  if (BAGLAMLI) {
    let sira = 0;
    kok.walkRules((r) => {
      if (r.parent?.type === "atrule" && /keyframes$/i.test(r.parent.name)) return;
      const id = `${path.basename(f)}|${sira++}`;
      const c = BAGLAM[id];
      const sahneMi = c && c.sahne / c.n > 0.5;
      for (const d of r.nodes ?? []) {
        if (d.type !== "decl") continue;
        if (GRI && d.prop === "color") {
          if (!c || sahneMi || /disabled/.test(r.selector)) continue;
          const rgb = hex(d.value);
          if (!rgb || Math.max(...rgb) - Math.min(...rgb) > 20) continue;
          const v = (rgb[0] + rgb[1] + rgb[2]) / 3;
          if (v > 245) continue;
          const sinif = c.acik + c.koyu;
          if (!sinif) continue;
          let yeni = null;
          if (c.acik / sinif >= 0.8) yeni = v <= 50 ? "var(--text)" : v <= 105 ? "var(--text-2)" : "var(--text-3)";
          else if (c.koyu / sinif >= 0.8) {
            const a = (v - 8) / 247;
            if (a >= 0.35) yeni = koyuKademe(a);
          }
          if (!yeni) continue;
          const k = `gri ${d.value.toLowerCase()} (${c.acik / sinif >= 0.8 ? "açık" : "koyu"}) → ${yeni}`;
          ozet.set(k, (ozet.get(k) || 0) + 1);
          d.value = yeni;
          degisti = true;
          toplam++;
        }
        if (BOSLUK && /^(margin|padding)(-(top|right|bottom|left|block|inline|block-start|block-end|inline-start|inline-end))?$|^(gap|row-gap|column-gap)$/.test(d.prop)) {
          if (!c || sahneMi) continue;
          if (/calc|var|clamp|min\(|max\(|%|em|vw|vh/.test(d.value)) continue;
          const parca = d.value.trim().split(/\s+/);
          let oldu = false;
          const yeniParca = parca.map((t) => {
            const m = t.match(/^(\d+(?:\.\d+)?)px$/);
            if (!m) return t;
            const px = parseFloat(m[1]);
            if (px <= 3 || px > 112) return t;
            const y = bosluk(px);
            if (y === px) return t;
            const k = `boşluk ${px} → ${y}`;
            ozet.set(k, (ozet.get(k) || 0) + 1);
            oldu = true;
            return `${y}px`;
          });
          if (oldu) {
            d.value = yeniParca.join(" ");
            degisti = true;
            toplam++;
          }
        }
        if (SURE && (d.prop === "transition" || d.prop === "transition-duration")) {
          if (!c || sahneMi) continue;
          const ogeler = d.value.split(/,(?![^(]*\))/);
          let oldu = false;
          const yeniOgeler = ogeler.map((o) => {
            const t = o.trim().split(/\s+(?![^(]*\))/);
            const zamanlar = t.map((x, i) => (/^\d*\.?\d+m?s$/.test(x) ? i : -1)).filter((i) => i > -1);
            if (!zamanlar.length) return o;
            const i = zamanlar[0];
            const oz = d.prop === "transition" ? t[0] : "";
            const renkMi = RENK_OZ.test(oz);
            const dur = ms(t[i]);
            const y = sureEsle(dur, renkMi);
            if (y === null || Math.abs(y - dur) < 1e-9) return o;
            const k = `süre ${oz || "(süre)"} ${dur} → ${y}`;
            ozet.set(k.replace(/ (\S+) (\d)/, (m0, a, b2) => ` ${renkMi ? "renk" : "hareket"} ${b2}`), (ozet.get(k.replace(/ (\S+) (\d)/, (m0, a, b2) => ` ${renkMi ? "renk" : "hareket"} ${b2}`)) || 0) + 1);
            t[i] = `${y}ms`;
            oldu = true;
            return (o.match(/^\s*/)[0] || "") + t.join(" ");
          });
          if (oldu) {
            d.value = yeniOgeler.join(",").trim();
            degisti = true;
            toplam++;
          }
        }
      }
    });
    if (UYGULA && degisti) fs.writeFileSync(f, kok.toString());
    continue;
  }
  if (HARF) {
    kok.walkRules((r) => {
      let ls;
      let boy;
      for (const d of r.nodes ?? []) {
        if (d.type !== "decl") continue;
        if (d.prop === "letter-spacing") ls = d;
        if (d.prop === "font-size") boy = d.value.trim().match(/^([\d.]+)px$/);
      }
      if (!ls || !boy) return;
      const v = ls.value.trim();
      const m = v === "0" ? ["0", "0"] : v.match(/^(-?[\d.]+)em$/);
      if (!m) return;
      const simdi = parseFloat(m[1]);
      if (simdi >= 0.04) return;
      const px = parseFloat(boy[1]);
      if (px < 11.5) return;
      const hedef = harfHedef(px);
      if (simdi <= hedef + 1e-9) return;
      const k = `harf ${px}px ${v} → ${hedef}em`;
      ozet.set(k, (ozet.get(k) || 0) + 1);
      ls.value = hedef === 0 ? "0" : `${hedef}em`;
      degisti = true;
      toplam++;
    });
    if (UYGULA && degisti) fs.writeFileSync(f, kok.toString());
    continue;
  }
  kok.walkDecls((d) => {
    const sec = d.parent?.selector ?? "";
    if (/(^|[\s>+~(,])(text|tspan)\b/.test(sec)) return;
    if (KOYU) {
      if (d.prop !== "color") return;
      const m = d.value.trim().match(/^rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*([\d.]+)\s*\)(\s*!important)?$/);
      if (!m) return;
      const a = parseFloat(m[1]);
      if (a < 0.4) return;
      const yeni = koyuKademe(a);
      const k = `beyaz ${a} → ${yeni}`;
      ozet.set(k, (ozet.get(k) || 0) + 1);
      d.value = `${yeni}${m[2] ?? ""}`;
      degisti = true;
      toplam++;
      return;
    }
    if (d.prop === "font-size") {
      const m = d.value.trim().match(/^([\d.]+)px(\s*!important)?$/);
      if (!m) return;
      const px = parseFloat(m[1]);
      if (px < 11.5) return;
      const yeni = basamak(px);
      if (yeni === px) return;
      const k = `boy ${px} → ${yeni}`;
      ozet.set(k, (ozet.get(k) || 0) + 1);
      d.value = `${yeni}px${m[2] ?? ""}`;
      degisti = true;
      toplam++;
    } else if (d.prop === "font-weight") {
      const v = parseInt(d.value, 10);
      if (!KALINLIK[v] || String(v) !== d.value.trim()) return;
      const k = `kalınlık ${v} → ${KALINLIK[v]}`;
      ozet.set(k, (ozet.get(k) || 0) + 1);
      d.value = String(KALINLIK[v]);
      degisti = true;
      toplam++;
    }
  });
  if (UYGULA && degisti) fs.writeFileSync(f, kok.toString());
}
for (const [k, n] of [...ozet].sort((a, b) => a[0].localeCompare(b[0], "tr", { numeric: true })))
  console.log(`${String(n).padStart(4)} × ${k}`);
console.log(`\n${toplam} bildirim. ${UYGULA ? "Uygulandı." : "Kuru çalıştırma; --uygula ile yazar."}`);
