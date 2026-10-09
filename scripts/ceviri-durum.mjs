#!/usr/bin/env node
/* ÇEVİRİ DURUMU · Türkçe kaynak ile İngilizce karşılığı aynı sürümde mi?
   Burak (09.10.2026): "Türkçe tarafta bir değişiklik yapınca onu öteki
   tarafta da güncelleyeceğiz, bunu unutma." Unutmamak kişiye bırakılmadı:
   her İngilizce dosya (src/lib/en/*.ts) ilk satırında kaynağının yolunu ve
   çevrildiği günkü sha1 özetini taşıyor; bu betik özeti yeniden hesaplayıp
   karşılaştırıyor.

     node scripts/ceviri-durum.mjs              durum raporu (eskiyen varsa çıkış kodu 1)
     node scripts/ceviri-durum.mjs --isaretle <en dosyası>   özeti bugünküne çek
     node scripts/ceviri-durum.mjs --eksik      çevirisi hiç olmayan içerik dosyaları

   İçerik dosyası sayılanlar: src/lib altındaki sayfa metni modülleri
   (aşağıdaki ICERIK deseni) ve src/lib/blogYazilar. Fiyat, rota, araç
   motoru gibi dilden bağımsız modüller listede değil. */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const KOK = new URL("..", import.meta.url).pathname.replace(/%20/g, " ");
const EN = "src/lib/en";
const BAS = /^\/\* kaynak: (\S+) · ozet: ([0-9a-f]{8}|yok) \*\//;
const ICERIK =
  /^(about|accounting\w+|afterSetup|aml\w+|banka\w+|blog|brand|careers|countryContent|hizmetIcerik|kurumsal\w+|muhasebeAlt\w+|muhasebeIhtiyac|offices|partners|press|resources|sectors|services|vergi\w+|vizeDubai|mobilKisa|dubaiFiyat|kktcFiyat)\.ts$/;

const coz = (s) => decodeURIComponent(s);
const kokYol = coz(KOK);
const oku = (yol) => readFileSync(join(kokYol, yol), "utf8");
const ozetle = (yol) => createHash("sha1").update(readFileSync(join(kokYol, yol))).digest("hex").slice(0, 8);

const enDosyalar = existsSync(join(kokYol, EN))
  ? readdirSync(join(kokYol, EN), { recursive: true }).filter((f) => String(f).endsWith(".ts")).map((f) => `${EN}/${f}`)
  : [];

const arg = process.argv.slice(2);
if (arg[0] === "--isaretle") {
  const d = arg[1];
  if (!d || !existsSync(join(kokYol, d))) {
    console.error("Dosya yok:", d);
    process.exit(2);
  }
  const s = oku(d);
  const m = s.match(BAS);
  if (!m) {
    console.error("İlk satırda `/* kaynak: <yol> · ozet: <özet> */` yok:", d);
    process.exit(2);
  }
  const yeni = ozetle(m[1]);
  writeFileSync(join(kokYol, d), s.replace(BAS, `/* kaynak: ${m[1]} · ozet: ${yeni} */`));
  console.log(`${d}: özet ${m[2]} → ${yeni}`);
  process.exit(0);
}

const cevrilen = new Map();
let eski = 0;
for (const d of enDosyalar) {
  const m = oku(d).match(BAS);
  if (!m) {
    console.log(`BAŞLIK YOK  ${d}`);
    eski++;
    continue;
  }
  cevrilen.set(m[1], d);
  if (!existsSync(join(kokYol, m[1]))) {
    console.log(`KAYNAK YOK  ${d}  (${m[1]})`);
    eski++;
  } else if (ozetle(m[1]) !== m[2]) {
    console.log(`ESKİDİ      ${d}  ← ${m[1]} değişti`);
    eski++;
  } else console.log(`güncel      ${d}`);
}

const kaynaklar = [
  ...readdirSync(join(kokYol, "src/lib")).filter((f) => ICERIK.test(f)).map((f) => `src/lib/${f}`),
  ...readdirSync(join(kokYol, "src/lib/blogYazilar")).filter((f) => f.endsWith(".ts") && f !== "index.ts").map((f) => `src/lib/blogYazilar/${f}`),
];
/* 10.10.2026 · ana sayfanın İngilizce denemesi: İngilizce dosyaların kaynağı
   artık yalnız src/lib değil. Metni kendi içinde taşıyan bileşenlerin
   (home/HeroAkis, NavIstemci, Footer …) sözlükleri de src/lib/en altında ve
   kaynak olarak bileşen dosyasını gösteriyor. Yukarıdaki döngü yolu ne olursa
   olsun özeti karşılaştırıyor; burada yalnız sayım düzeliyor: çevrilmiş bir
   bileşen kaynağı "içerik dosyası" sayısına giriyor ki toplam tutsun.
   Çevrilmemiş bileşenler listelenmiyor (hangi bileşenin metin taşıdığını
   betik bilemez); onlar sayfa İngilizceye geçerken elle eklenir. */
for (const k of cevrilen.keys()) if (!kaynaklar.includes(k) && existsSync(join(kokYol, k))) kaynaklar.push(k);
const eksik = kaynaklar.filter((k) => !cevrilen.has(k));
console.log(`\nİngilizce dosya: ${enDosyalar.length} · eskiyen: ${eski} · çevirisi olmayan içerik dosyası: ${eksik.length} / ${kaynaklar.length}`);
if (arg[0] === "--eksik") for (const k of eksik) console.log(`  yok  ${k}`);
process.exit(eski > 0 ? 1 : 0);
