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

     node scripts/basamak.mjs                 # kuru: özet
     node scripts/basamak.mjs --uygula        # boy + kalınlık yazar
     node scripts/basamak.mjs --koyu --uygula # yalnız koyu zemin metni
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UYGULA = process.argv.includes("--uygula");
const KOYU = process.argv.includes("--koyu");
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
