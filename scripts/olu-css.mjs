#!/usr/bin/env node
/* ============================================================================
   ÖLÜ CSS TEMİZLİĞİ (23.09.2026)
   Burak: "ölü css'leri temizle." Denetim (docs/design-system/denetim.md):
   bildirimlerin ~%22'si hiçbir bileşenin basmadığı sınıflara ait.

   KURAL: bir seçicide, işlevsel sözde sınıfların (:not, :is, :where, :has)
   DIŞINDA geçen her sınıf kaynakta (src altındaki .ts/.tsx, dize ve kod
   dahil) bir kelime olarak geçmeli. Geçmeyen tek bir sınıf varsa o seçici
   hiçbir şeyi eşleyemez: seçici listeden düşer, liste boşalırsa kural
   silinir. `x-${…}` gibi dinamik önekler canlı sayılır. Kullanılmayan
   @keyframes ve boşalan @media de gider. Başındaki açıklama bloğu, altındaki
   kuralların HEPSİ silindiyse onunla birlikte gider (yorum kalıp olmayan
   kodu anlatmasın). Lab dosyaları (lab-*.css) dokunulmaz.

   GÜVENCE: scripts/stil-anlik.mjs ile 25 rota × 2 genişlikte önce/sonra
   hesaplanmış stil karşılaştırması: fark çıkmamalı.

     node scripts/olu-css.mjs          # kuru: yalnız rapor
     node scripts/olu-css.mjs --uygula # dosyaları yazar
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UYGULA = process.argv.includes("--uygula");

/* ---- kaynaktaki kelimeler */
let kaynak = "";
const gez = (d) => {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) gez(p);
    else if (/\.(tsx?|mdx?|json)$/.test(f.name)) kaynak += fs.readFileSync(p, "utf8") + "\n";
  }
};
gez(path.join(KOK, "src"));
const kelimeler = new Set(kaynak.match(/[A-Za-z_][\w-]*/g));
const onekler = [...new Set([...kaynak.matchAll(/([A-Za-z][\w-]*[\w-])\$\{/g)].map((m) => m[1]))].filter((o) => o.length >= 3);
const canliSinif = (c) => kelimeler.has(c) || onekler.some((o) => c.startsWith(o));

/* ---- seçici ölü mü */
function islevselleriSil(s) {
  let out = "";
  let derinlik = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (derinlik === 0) {
      const m = s.slice(i).match(/^:(not|is|where|has|nth-[a-z-]+)\(/);
      if (m) {
        derinlik = 1;
        i += m[0].length - 1;
        continue;
      }
      out += ch;
    } else {
      if (ch === "(") derinlik++;
      else if (ch === ")") derinlik--;
    }
  }
  return out;
}
const oluSecici = (sel) => {
  const siniflar = islevselleriSil(sel).match(/\.(-?[_a-zA-Z][\w-]*)/g) || [];
  return siniflar.some((c) => !canliSinif(c.slice(1)));
};

const dosyalar = [
  path.join(KOK, "src/app/globals.css"),
  ...fs
    .readdirSync(path.join(KOK, "src/app/css"))
    .filter((f) => f.endsWith(".css") && !f.startsWith("lab-"))
    .map((f) => path.join(KOK, "src/app/css", f)),
];

/* ---- ilk geçiş: kural ve seçici temizliği */
const rapor = [];
const agaclar = [];
let silinenBildirim = 0;
for (const f of dosyalar) {
  const kok = postcss.parse(fs.readFileSync(f, "utf8"), { from: f });
  let dosyaSilinen = 0;
  kok.walkRules((r) => {
    if (r.parent?.type === "atrule" && /keyframes$/i.test(r.parent.name)) return;
    const kalan = r.selectors.filter((s) => !oluSecici(s));
    if (kalan.length === r.selectors.length) return;
    const bildirim = r.nodes.filter((n) => n.type === "decl").length;
    if (kalan.length === 0) {
      dosyaSilinen += bildirim;
      silinenBildirim += bildirim;
      r.raws.olu = true;
      rapor.push(`${path.basename(f)} · ${r.selector.slice(0, 90).replace(/\s+/g, " ")}`);
    } else {
      r.selectors = kalan;
    }
  });
  agaclar.push({ f, kok, dosyaSilinen });
}

/* ---- yorum ve boş kap temizliği */
function temizle(kap) {
  if (!kap.nodes) return;
  // önce iç kaplar: boşalan @media ölü sayılsın ki başındaki yorum da gitsin
  for (const d of [...kap.nodes]) {
    if (d.type === "atrule" && d.nodes && !d.raws.olu) {
      temizle(d);
      if (/^(media|supports|container)$/i.test(d.name) && d.nodes.filter((n) => n.type !== "comment").length === 0)
        d.raws.olu = true;
    }
  }
  const dugumler = [...kap.nodes];
  // yorum grubu: bir yorum ve ardından bir sonraki yoruma kadar gelen düğümler
  for (let i = 0; i < dugumler.length; i++) {
    const d = dugumler[i];
    if (d.type !== "comment") continue;
    const grup = [];
    for (let j = i + 1; j < dugumler.length && dugumler[j].type !== "comment"; j++) grup.push(dugumler[j]);
    if (grup.length && grup.every((g) => g.raws.olu)) d.raws.olu = true;
  }
  for (const d of dugumler) if (d.raws.olu) d.remove();
}
for (const a of agaclar) temizle(a.kok);

/* ---- kullanılmayan @keyframes */
const tumMetin = agaclar.map((a) => a.kok.toString()).join("\n");
let silinenKare = 0;
for (const a of agaclar) {
  a.kok.walkAtRules(/keyframes$/i, (k) => {
    const ad = k.params.trim();
    const re = new RegExp(`(^|[^\\w-])${ad.replace(/[-]/g, "\\-")}([^\\w-]|$)`);
    const cssteKullanim = tumMetin.split(k.toString()).join("").match(re);
    if (!cssteKullanim && !kelimeler.has(ad)) {
      k.remove();
      silinenKare++;
      rapor.push(`${path.basename(a.f)} · @keyframes ${ad}`);
    }
  });
}

for (const a of agaclar) {
  if (UYGULA && (a.dosyaSilinen || true)) {
    const yeni = a.kok.toString().replace(/\n{3,}/g, "\n\n");
    const eski = fs.readFileSync(a.f, "utf8");
    if (yeni !== eski) fs.writeFileSync(a.f, yeni);
  }
}
console.log(
  agaclar
    .filter((a) => a.dosyaSilinen)
    .map((a) => `${path.relative(KOK, a.f)}: ${a.dosyaSilinen} bildirim`)
    .join("\n"),
);
console.log(`\nToplam ${silinenBildirim} bildirim, ${rapor.length - silinenKare} kural, ${silinenKare} @keyframes.`);
fs.writeFileSync(path.join(KOK, "scripts/.olu-css-rapor.txt"), rapor.join("\n"));
console.log(UYGULA ? "Uygulandı." : "Kuru çalıştırma; --uygula ile yazar. Liste: scripts/.olu-css-rapor.txt");
