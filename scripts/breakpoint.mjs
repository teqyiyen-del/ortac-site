#!/usr/bin/env node
/* ============================================================================
   BREAKPOINT BİRLEŞTİRME (24.09.2026)
   Burak: "breakpointleri ayarla." DESIGN.md · ekran kademeleri: telefon
   < 720 · tablet 720-1023 · laptop 1024-1439 · masaüstü ≥ 1440. Denetimde
   58 değer vardı, ölü CSS temizliğinden sonra ~50.

   EŞLEME (sınır b: min-width için değerin kendisi, max-width için yukarı
   yuvarlanmış hâli, ör. 639.5 → 640):
     b < 820         → 720
     820 ≤ b ≤ 1300  → 1024
     b > 1300        → 1440
   Yazım: (min-width: 720px) · (max-width: 719.5px) vb.
   Neden bu kesimler: 390 (telefon), 1280 (laptop) ve 1440 (masaüstü)
   genişliklerinde hiçbir sorgunun sonucu değişmiyor, fark yalnız ara
   aralıklarda (391-819 ve 1024-1279). 820+ değerler (iPad dikey 768-834
   hâlâ tek sütunda kalsın diye) 1024'e.
   Bir sorgu aralık tanımlıyorsa (min ve max birlikte) ve eşleme sonrası
   boş kalıyorsa (ör. 900-1023 → 1024-1023), alt ucu bir kademe aşağı
   iner (720-1023: tablet).
   Lab dosyaları dokunulmaz.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UYGULA = process.argv.includes("--uygula");
const KADEME = [720, 1024, 1440];
const esle = (b) => (b < 820 ? 720 : b <= 1300 ? 1024 : 1440);

const dosyalar = [
  path.join(KOK, "src/app/globals.css"),
  ...fs
    .readdirSync(path.join(KOK, "src/app/css"))
    .filter((f) => f.endsWith(".css") && !f.startsWith("lab-"))
    .map((f) => path.join(KOK, "src/app/css", f)),
];

const ozet = new Map();
let bos = 0;
for (const f of dosyalar) {
  const kok = postcss.parse(fs.readFileSync(f, "utf8"), { from: f });
  let degisti = false;
  kok.walkAtRules("media", (m) => {
    const eski = m.params;
    const minM = eski.match(/min-width:\s*([\d.]+)px/);
    const maxM = eski.match(/max-width:\s*([\d.]+)px/);
    if (!minM && !maxM) return;
    let yeniMin = minM ? esle(parseFloat(minM[1])) : null;
    const yeniMax = maxM ? esle(Math.ceil(parseFloat(maxM[1]))) : null;
    if (yeniMin !== null && yeniMax !== null && yeniMin >= yeniMax) {
      const k = KADEME.indexOf(yeniMax);
      yeniMin = k > 0 ? KADEME[k - 1] : null;
      bos++;
    }
    let p = eski;
    if (minM) p = yeniMin === null ? p.replace(/\(\s*min-width:\s*[\d.]+px\s*\)\s*and\s*/, "") : p.replace(minM[0], `min-width: ${yeniMin}px`);
    if (maxM) p = p.replace(maxM[0], `max-width: ${yeniMax - 0.5}px`);
    if (p !== eski) {
      const k = `${eski.replace(/\s+/g, " ")}  →  ${p.replace(/\s+/g, " ")}`;
      ozet.set(k, (ozet.get(k) || 0) + 1);
      m.params = p;
      degisti = true;
    }
  });
  if (UYGULA && degisti) fs.writeFileSync(f, kok.toString());
}
for (const [k, n] of [...ozet].sort()) console.log(`${String(n).padStart(3)} × ${k}`);
console.log(`\n${[...ozet.values()].reduce((a, b) => a + b, 0)} sorgu değişti; ${bos} aralık boş kalacaktı, alt ucu indirildi.`);
console.log(UYGULA ? "Uygulandı." : "Kuru çalıştırma; --uygula ile yazar.");
