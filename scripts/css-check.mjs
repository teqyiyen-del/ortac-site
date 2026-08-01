#!/usr/bin/env node
/* Kullanılan sınıf ↔ tanımlı sınıf karşılaştırması.
 *
 * Neden var: iki sayfa (hakkimizda, sektörler) TSX'i yazılıp CSS'i hiç
 * yazılmadan teslim edildi. Sayfa 200 dönüyordu, derleme geçiyordu, tip
 * denetimi temizdi — çünkü eksik CSS hiçbir aracın hatası değil. Ekranda
 * stilsiz SVG bayrak kabına yayılıyordu. Bu betik tam o boşluğu kapatıyor.
 *
 * Kullanım:  node scripts/css-check.mjs
 * Çıkış kodu: eşleşmeyen sınıf varsa 1.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const CSS_DIR = join(SRC, "app/css");

/* Bu önekler paylaşılan altyapı; her dosyada aranmaz. */
const SHARED = /^(container|sec|sr|h1|h2|h3|lead|btn|chip|card|grid|row|col|is|has|no|bn|lc|ch5)-?/;

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(p)) out.push(p);
  }
  return out;
}

/* Tanımlı sınıfların tamamı: globals.css + css/*.css */
const defined = new Set();
const cssFiles = [join(SRC, "app/globals.css"), ...readdirSync(CSS_DIR).map((f) => join(CSS_DIR, f))];
for (const f of cssFiles) {
  const text = readFileSync(f, "utf8");
  for (const m of text.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) defined.add(m[1]);
}

/* Kullanılan sınıflar. className="a b c" ve className={"a b"} biçimleri;
   şablon değişkeni içerenler ({`x-${y}`}) atlanıyor — statik olarak
   çözülemezler, yanlış alarm üretirler. */
const used = new Map(); // class -> Set(dosya)
for (const f of walk(SRC)) {
  const text = readFileSync(f, "utf8");
  for (const m of text.matchAll(/className=(?:"([^"]*)"|\{"([^"]*)"\})/g)) {
    const raw = m[1] ?? m[2];
    if (raw.includes("${")) continue;
    for (const c of raw.split(/\s+/).filter(Boolean)) {
      if (!used.has(c)) used.set(c, new Set());
      used.get(c).add(relative(ROOT, f));
    }
  }
}

const missing = [...used.entries()]
  .filter(([c]) => !defined.has(c) && !SHARED.test(c))
  .sort((a, b) => b[1].size - a[1].size);

if (!missing.length) {
  console.log(`css-check: temiz — ${used.size} sınıf kullanımı, hepsinin karşılığı var.`);
  process.exit(0);
}

/* Dosya bazında topla: "şu sayfanın CSS'i yazılmamış" tek bakışta görünsün. */
const byFile = new Map();
for (const [c, files] of missing) {
  for (const f of files) {
    if (!byFile.has(f)) byFile.set(f, []);
    byFile.get(f).push(c);
  }
}

console.log(`css-check: ${missing.length} sınıfın CSS karşılığı YOK\n`);
for (const [f, cs] of [...byFile.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${f}  (${cs.length})`);
  console.log(`    ${cs.slice(0, 10).join(" ")}${cs.length > 10 ? " …" : ""}`);
}
process.exit(1);
