#!/usr/bin/env node
/* ============================================================================
   TASARIM DENETİMİ · design system Adım 0 (23.09.2026)
   Burak: "her yerde padding farklı, spacing farklı, font büyüklükleri farklı
   … bir section kendi içinde tutarlı ama diğer section'larla tutarsız."
   Rehber: ~/Downloads/design-system-kural-rehberi.md · Adım 0.

   Ne yapar: src/app/globals.css + src/app/css/*.css içindeki HER bildirimi
   (seçici, @media, dosya, satır) okuyor; TSX'teki satır içi style={{…}}
   değerlerini ve Tailwind sınıflarını da sayıyor. Çıktı JSON:
   node scripts/tasarim-denetim.mjs > /tmp/denetim.json
   Yalnız okur, hiçbir şey değiştirmez. Lab dosyaları (lab-*.css, app/lab)
   ayrı işaretleniyor: canlı sistemin parçası değiller.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";
const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CSS_DOSYALAR = [
  path.join(KOK, "src/app/globals.css"),
  ...fs
    .readdirSync(path.join(KOK, "src/app/css"))
    .filter((f) => f.endsWith(".css"))
    .map((f) => path.join(KOK, "src/app/css", f)),
];

/* ---- CSS ayrıştırma: yorumları sil, süslü parantezleri izleyerek kurallar */
function ayristir(dosya) {
  const ham = fs.readFileSync(dosya, "utf8");
  // yorumları satır sayısını koruyarak boşalt
  const src = ham.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
  const out = [];
  const yigin = []; // {tip:'media'|'rule'|'keyframes'|'other', ad}
  let i = 0,
    bas = 0,
    satir = 1;
  const satirAt = (k) => {
    for (; i < k; i++) if (src[i] === "\n") satir++;
  };
  let tampon = "";
  let tamponSatir = 1;
  for (let k = 0; k < src.length; k++) {
    const ch = src[k];
    if (ch === "{") {
      satirAt(k);
      const on = tampon.trim();
      let tip = "rule";
      if (on.startsWith("@media") || on.startsWith("@supports") || on.startsWith("@container")) tip = "media";
      else if (on.startsWith("@keyframes") || on.startsWith("@-webkit-keyframes")) tip = "keyframes";
      else if (on.startsWith("@")) tip = "other";
      else if (yigin.some((y) => y.tip === "keyframes")) tip = "frame";
      yigin.push({ tip, ad: on });
      tampon = "";
      bas = k + 1;
      tamponSatir = satir;
    } else if (ch === "}") {
      satirAt(k);
      // son bildirim ; olmadan bitebilir
      if (tampon.trim()) bildirimEkle(tampon, tamponSatir);
      tampon = "";
      yigin.pop();
      tamponSatir = satir;
    } else if (ch === ";") {
      satirAt(k);
      bildirimEkle(tampon, tamponSatir);
      tampon = "";
      tamponSatir = satir;
    } else {
      if (!tampon.trim() && !/\s/.test(ch)) {
        satirAt(k);
        tamponSatir = satir;
      }
      tampon += ch;
    }
  }
  function bildirimEkle(t, s) {
    const m = t.match(/^\s*(--[\w-]+|[a-z-]+)\s*:\s*([\s\S]+)$/i);
    if (!m) return;
    const kural = [...yigin].reverse().find((y) => y.tip === "rule" || y.tip === "frame");
    if (!kural) return;
    const media = yigin.filter((y) => y.tip === "media").map((y) => y.ad);
    out.push({
      dosya: path.relative(KOK, dosya),
      satir: s,
      secici: kural.ad.replace(/\s+/g, " "),
      prop: m[1].toLowerCase(),
      deger: m[2].replace(/\s+/g, " ").replace(/\s*!important/, "").trim(),
      media,
      keyframe: kural.tip === "frame",
    });
  }
  return out;
}

const bildirimler = CSS_DOSYALAR.flatMap(ayristir);

/* ---- TSX satır içi style ve Tailwind */
function tsxDosyalar(d) {
  const r = [];
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) r.push(...tsxDosyalar(p));
    else if (/\.tsx$/.test(f.name)) r.push(p);
  }
  return r;
}
const satirIci = [];
const tailwind = {};
const TW = /\b(?:text|bg|p[xytrbl]?|m[xytrbl]?|gap|rounded|font|leading|tracking|shadow|border|w|h|max-w)-(?:\[[^\]]+\]|[a-z0-9./-]+)/g;
for (const f of tsxDosyalar(path.join(KOK, "src"))) {
  const s = fs.readFileSync(f, "utf8");
  const rel = path.relative(KOK, f);
  // style={{ ... }} blokları
  for (const m of s.matchAll(/style=\{\{([\s\S]*?)\}\}/g)) {
    const satir = s.slice(0, m.index).split("\n").length;
    for (const d of m[1].matchAll(/(\w+)\s*:\s*("[^"]*"|'[^']*'|`[^`]*`|[\d.]+)/g)) {
      satirIci.push({ dosya: rel, satir, prop: d[1], deger: d[2].replace(/^["'`]|["'`]$/g, "") });
    }
  }
  for (const m of s.matchAll(/className=["{`]([^"}`]*)/g)) {
    for (const t of m[1].matchAll(TW)) {
      tailwind[t[0]] = tailwind[t[0]] || { n: 0, dosyalar: new Set() };
      tailwind[t[0]].n++;
      tailwind[t[0]].dosyalar.add(rel);
    }
  }
}

process.stdout.write(
  JSON.stringify(
    {
      bildirimler,
      satirIci,
      tailwind: Object.fromEntries(Object.entries(tailwind).map(([k, v]) => [k, { n: v.n, dosyalar: [...v.dosyalar] }])),
    },
    null,
    0,
  ),
);
