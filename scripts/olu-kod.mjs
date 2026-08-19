#!/usr/bin/env node
/* Ulaşılamayan dosya taraması: import grafiğinde rota girişlerinden
 * yürünemeyen her .ts/.tsx dosyasını listeler.
 *
 * NEDEN VAR: css-check 48 "CSS karşılığı yok" sınıfı sayıyordu ve bunun 38'i
 * (yüzde 79) DÖRT ÖLÜ DOSYADAN geliyordu — PricingConfigurator, Calculator,
 * HeroWizard, DubaiZoneMap. Yani aracın tabanı büyük ölçüde gürültüydü ve
 * canlı dosyalardaki gerçek eksikler o gürültünün arkasında saklanıyordu.
 * Ölü dosyalar ayıklandığında taban 48'den 10'a düşüyor.
 *
 * Ölü kod tek başına da birikiyor: silinen bir bölümün bileşeni geride
 * kalıyor, adı hâlâ import edilebilir olduğu için tsc ve lint sessiz kalıyor,
 * sonraki tur onu canlı sanıp üstünde çalışabiliyor.
 *
 * YÖNTEM: Next rota girişleri (page/layout/route/…) kök alınıyor, import
 * belirteçleri (@/… ve göreli) dosyaya çözülüp grafik yürünüyor.
 *
 * DÜZ GREP NEDEN YETMİYOR: `grep -rn "\bArt\b"` bu depoda YANLIŞ ALARM veriyor.
 * Türkçe metindeki "Artık" kelimesinde "ı" ASCII olmadığı için grep'in kelime
 * sınırı orada eşleşiyor ve ölü bir bileşen "kullanılıyor" görünüyor. Bir
 * turda tam bu yüzden yanlış sonuca varıldı; karar import grafiğine bakarak
 * verilir, ada bakarak değil.
 *
 * YANLIŞ POZİTİF OLABİLİR: değişkenle kurulan dinamik import
 * (import(`./x/${ad}`)) statik olarak çözülemez. Bugün depoda böyle bir çağrı
 * yok; eklenirse bu betik o dosyayı ölü sanar. Silmeden önce göz at.
 *
 * Kullanım:  node scripts/olu-kod.mjs
 * Çıkış kodu: her zaman 0 — bu bir envanter aracı, kapı değil. Ölü dosya
 * bırakmak meşru bir karar olabilir (bkz. /hero-lab'ın kasten tuttuğu adaylar).
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx|ts|mts)$/.test(p)) out.push(p);
  }
  return out;
}
const files = walk(SRC);

/* Next rota girişleri: kimse import etmese de çalışırlar, kök sayılırlar. */
const ENTRY =
  /\/(page|layout|template|loading|error|not-found|global-error|route|default|sitemap|robots|manifest|opengraph-image|twitter-image|icon|apple-icon|middleware|instrumentation)\.(tsx|ts)$/;
const entries = files.filter((f) => ENTRY.test(f));

/* "@/x" ve "./x" biçimlerini gerçek dosyaya çözer; paket adları atlanır. */
function coz(fromFile, spec) {
  let base;
  if (spec.startsWith("@/")) base = join(SRC, spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null;
  for (const ek of ["", ".tsx", ".ts", ".mts", "/index.tsx", "/index.ts"]) {
    const p = base + ek;
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  return null;
}

/* import/export … from "x"  ve  import("x") */
const IMPORT =
  /(?:^|\n)\s*(?:import|export)[\s\S]*?from\s*["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g;

const grafik = new Map();
for (const f of files) {
  const hedefler = new Set();
  for (const m of readFileSync(f, "utf8").matchAll(IMPORT)) {
    const p = coz(f, m[1] ?? m[2]);
    if (p) hedefler.add(p);
  }
  grafik.set(f, hedefler);
}

const gorulen = new Set();
const kuyruk = [...entries];
while (kuyruk.length) {
  const f = kuyruk.pop();
  if (gorulen.has(f)) continue;
  gorulen.add(f);
  for (const h of grafik.get(f) ?? []) if (!gorulen.has(h)) kuyruk.push(h);
}

const olu = files.filter((f) => !gorulen.has(f)).map((f) => relative(ROOT, f)).sort();

console.log(`rota girişi ${entries.length} · dosya ${files.length} · ulaşılan ${gorulen.size}`);
if (!olu.length) {
  console.log("\nulaşılamayan dosya yok.");
} else {
  console.log(`\nULAŞILAMAYAN (${olu.length}):`);
  for (const f of olu) console.log("  " + f);
}
