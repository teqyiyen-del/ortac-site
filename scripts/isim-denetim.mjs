#!/usr/bin/env node
/* İsim üretecinin değişmez denetimi. Çerçeve yok; hata bulursa 1 ile çıkar.
   node scripts/isim-denetim.mjs [--ornek]
   names.ts uzantısız içe aktarıyor, node bunu çözmediği için iki dosya geçici klasöre
   kopyalanıp içe aktarma satırı düzeltiliyor. */
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const g = mkdtempSync(join(tmpdir(), "isim-"));
for (const d of ["names.ts", "isimHavuzu.ts"])
  writeFileSync(join(g, d), readFileSync(new URL(`../src/lib/tools/${d}`, import.meta.url), "utf8").replace('"./isimHavuzu"', '"./isimHavuzu.ts"'));
const { generateNames, isimAciklamalari, turSayisi, SECTORS, TONES, PER_ROUND, toDomainLabel, normalizeKeyword } = await import(join(g, "names.ts"));
const { SEKTOR_KOK, TEMA_KOK, SEKTOR_IS, EKLER } = await import(join(g, "isimHavuzu.ts"));

const hata = new Map();
const yaz = (kural, ornek) => { const h = hata.get(kural) ?? { n: 0, ornek: [] }; h.n++; if (h.ornek.length < 6) h.ornek.push(ornek); hata.set(kural, h); };

/* ---- 1) HAVUZ */
/* Kısıtlı sınıf: listelerde hiç olmamalı (names.ts başındaki ölçüt). */
const YASAK = /^(bank|banking|insurance|assurance|finance|financial|capital|invest|investment|fund|trust|royal|king|queen|crown|emirates|national|british|england|dubai|turkey|turkiye|cyprus|government|federal|chartered|university|police|sheikh|islamic)$/i;
let anlamsiz = 0;
for (const [s, kokler] of [...Object.entries(SEKTOR_KOK), ["tema", TEMA_KOK]]) {
  const ic = new Set();
  for (const [ad, anlam, dil] of kokler) {
    if (!/^[A-Z][a-z]{3,7}$/.test(ad)) yaz("kök biçimi (Baş harf büyük, a-z, 4-8)", `${s}:${ad}`);
    if (!anlam || !dil) anlamsiz++; /* eski 96 kök anlamsız duruyor; araç o adayda açıklama basmıyor */
    if (YASAK.test(ad)) yaz("kısıtlı kelime havuzda", `${s}:${ad}`);
    if (ic.has(ad)) yaz("kök aynı listede iki kez", `${s}:${ad}`);
    ic.add(ad);
  }
}
for (const [s, is] of Object.entries(SEKTOR_IS)) {
  if (new Set(is).size !== is.length) yaz("iş sözcüğü tekrar", s);
  for (const b of is) { if (YASAK.test(b)) yaz("kısıtlı iş sözcüğü", `${s}:${b}`); if (!/^[A-Z][A-Za-z]+( [A-Z][A-Za-z]+)?$/.test(b)) yaz("iş sözcüğü biçimi", `${s}:${b}`); }
}
if (new Set(EKLER).size !== EKLER.length) yaz("ek tekrar", "EKLER");

/* ---- 2) ÜRETİM: kelime x sektör x üslup x bütün turlar */
const KELIMELER = ["Atlas", "Ortac", "Halil", "Deniz", "Nil", "Su", "Ay", "Bosphorus", "Çiçek", "Şükrü", "İstanbul", "Işık", "ideal", "INFO", "Öz", "Ğ", "a", "", "   ", "Atlas Global 2026", "at-las!", "x".repeat(40), "Mediterranean", "aaa", "Zz", "😀Kaan", "Иван", "张伟", "Müller", "O'Brien", "café", "ISTANBUL", "Iris"];
let liste = 0, aday = 0, dusen = 0;
for (const ham of KELIMELER) {
  const key = normalizeKeyword(ham);
  for (const s of SECTORS) for (const t of TONES) {
    liste++;
    const n = turSayisi(s.key, t.key, ham), tum = [], yer = `${JSON.stringify(ham)}/${s.key}/${t.key}`;
    for (let r = 0; r < n; r++) {
      const tur = generateNames(ham, s.key, t.key, r), ac = isimAciklamalari(ham, s.key, t.key, r);
      if (key.length >= 2 && !tur.length) yaz("sayılan tur boş", `${yer} tur ${r}`);
      if (r < n - 1 && tur.length !== PER_ROUND) yaz("ara tur eksik", `${yer} tur ${r}`);
      for (const k of Object.keys(ac)) if (!tur.includes(k)) yaz("açıklama o turda olmayan ada ait", `${yer} ${k}`);
      tum.push(...tur);
    }
    if (generateNames(ham, s.key, t.key, n).length) yaz("son turdan sonra aday var", yer);
    if (key.length < 2) { if (tum.length) yaz("2 harften kısa kelimede aday", yer); continue; }
    if (!tum.length) yaz("boş liste", yer);
    aday += tum.length;
    /* araya başka çağrı girince önbellek bozulmamalı */
    generateNames("Baska", "genel", "kisa", 0);
    if (JSON.stringify(generateNames(ham, s.key, t.key, 0)) !== JSON.stringify(tum.slice(0, PER_ROUND))) yaz("kararsız çıktı", yer);
    if (new Set(tum).size !== tum.length) yaz("aynı ad iki kez", yer);
    const alan = tum.map(toDomainLabel);
    if (new Set(alan).size !== alan.length) yaz("iki adayın alan adı aynı", `${yer} ${alan.find((x, i) => alan.indexOf(x) !== i)}`);
    const tr = /[çğıöşüÇĞİÖŞÜ]/.test(key), kucult = (x) => (tr ? x.toLocaleLowerCase("tr-TR") : x.toLowerCase()), k = kucult(key);
    const latin = /^[a-zçğıöşüâîû]+$/i.test(key);
    for (const ad of tum) {
      const yerAd = `${yer} → ${ad}`;
      if (!/^\p{Lu}\p{Ll}*( \p{Lu}\p{L}*){0,2}$/u.test(ad)) yaz("ad biçimi", yerAd);
      if (/[^\p{Script=Latin} ]/u.test(ad)) yaz("Latin dışı harf", yerAd);
      if (kucult(ad) === k) yaz("aday kelimenin kendisi", yerAd);
      if (/(.)\1\1/i.test(ad) && !/(.)\1\1/i.test(key)) yaz("aynı harf üç kez", yerAd);
      if (!tr && latin && /[ıİ]/.test(ad)) yaz("Türkçe olmayan kelimede ı/İ çıktı", yerAd);
      if (!toDomainLabel(ad)) yaz("alan adı boş", yerAd);
      if (t.key !== "kisa" && !kucult(ad).includes(k)) yaz("kelime adın içinde yok", yerAd);
    }
    if (t.key === "kaynasik" && JSON.stringify(tum.slice(0, 6)) === JSON.stringify(generateNames(ham, s.key, "bilesik", 0))) dusen++;
  }
}

if (process.argv.includes("--ornek"))
  for (const k of ["Atlas", "Halil", "ideal", "Işık", "Su"]) for (const t of TONES) console.log(`${k} · saglik · ${t.key}: ${generateNames(k, "saglik", t.key, 0).join(" | ")}`);

console.log(`${liste} liste · ${aday} aday · kaynaşıktan bileşiğe düşen liste ${dusen} · anlamı boş kök ${anlamsiz}`);
if (!hata.size) console.log("temiz");
for (const [k, h] of hata) console.log(`HATA ${h.n} · ${k}\n   ${h.ornek.join("\n   ")}`);
process.exit(hata.size ? 1 : 0);
