#!/usr/bin/env node
/* KUTU KENARINDAKİ ŞERİT DENETİMİ
 *
 * ---------------------------------------------------------------- NEDEN VAR
 * Müşteri bu yasağı İKİ KEZ koydu. Birincisinde (Dubai muhasebe sayfası,
 * fiyat satırları) şerit kaldırıldı ama karar yalnızca o dosyanın CSS
 * yorumuna yazıldı: svc-muhasebe.css · ".svm-plist" üstündeki blok. Yazılı
 * kural tek bir dosyanın içinde kalınca site genelinde tutmadı ve şerit dört
 * yerde daha yaşamaya devam etti (.tl-out, .tl-warn, .bp-quote, .sss-panel) —
 * üstelik ikisi o karardan SONRA yazılmıştı.
 *
 * İkincisinde cümle daha net geldi: "boxların kenarına şerit koymayı komple
 * yasaklıyorum, hiçbir şekilde bu sitede görmeyeceğim." Bu betik o yasağın
 * makine tarafındaki karşılığı. Kural artık bir yorumda değil, bir kapıda.
 *
 * ------------------------------------------------------------- NE YAKALIYOR
 *   1) Kalın (>= 2px) SOL/SAĞ kenarlık. Yani dikey şerit. İstisnasız yasak:
 *      bu sitede kutunun yanına dikey çubuk koymanın meşru bir kullanımı yok.
 *   2) Kalın (>= 2px) ÜST/ALT kenarlık, YALNIZCA kural aynı zamanda bir kutu
 *      kuruyorsa (`background` ya da `border-radius` da yazıyorsa). Sebep:
 *      kutusuz bir üst/alt çizgi ŞERİT değil AYRAÇ — liste öğelerini ayıran
 *      (.clr-item) ya da sütun başlığının altını çizen (.dcs-head) meşru
 *      kullanımlar var ve onlar yasağın konusu değil.
 *   3) `box-shadow: inset <kalın> 0 0` ve dikey eşleniği. Şeridin kenarlık
 *      kullanmadan yapılan hâli; bir tur önce tam olarak bu kullanılmıştı.
 *
 * ---------------------------------------------------------- NE YAKALAMIYOR
 * 1 piksellik kenarlıklar. Bu sitede onlar şerit değil AYRAÇ: tablo
 * hücrelerini (.uk3-tbl td + td), ızgara sütunlarını (.uk2-fit2 > * + *) ve
 * yan yana panelleri (.uk2-panel + .uk2-panel) birbirinden ayırıyorlar.
 * Şeritten farkı şu: ayraç iki şeyin ARASINDA duruyor, şerit bir şeyin
 * KENARINA yapışıyor.
 *
 * Kullanım:  node scripts/serit-check.mjs
 * Çıkış kodu: şerit varsa 1.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const CSS_DIR = join(SRC, "app/css");

const files = [join(SRC, "app/globals.css"), ...readdirSync(CSS_DIR).map((f) => join(CSS_DIR, f))];

/* Yorumlar SİLİNMİYOR, BOŞLUKLA DOLDURULUYOR. Kaldırılan şeritlerin gerekçesi
   yorumların içinde yazıyor ve o yorumlar `border-left: 3px` gibi dizgeleri
   birebir alıntılıyor. Silmek satır numaralarını kaydırırdı; boşlukla doldurmak
   hem alıntıyı görünmez yapıyor hem numaraları koruyor. */
function yorumsuz(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
}

const YATAY = /(?:^|[\s;])border-(?:left|right|inline-start|inline-end)\s*:\s*([0-9.]+)px/;
const DIKEY = /(?:^|[\s;])border-(?:top|bottom|block-start|block-end)\s*:\s*([0-9.]+)px/;
/* `px` İSTEĞE BAĞLI: sıfır çoğu zaman birimsiz yazılıyor ("inset 3px 0 0").
   İlk denemede birim zorunluydu ve betik tam da bir tur önce kullanılmış
   olan biçimi kaçırdı. */
const GOLGE = /box-shadow\s*:\s*inset\s+(-?[0-9.]+)(?:px)?\s+(-?[0-9.]+)(?:px)?\s+0/;
const KUTU = /(?:^|[\s;])(background|border-radius)\s*:/;

const bulgular = [];

for (const file of files) {
  const ham = readFileSync(file, "utf8");
  const text = yorumsuz(ham);

  /* En içteki blokları eşleştiriyoruz: gövdesinde `{` olmayan `… { … }`.
     İç içe at-kuralları (@media) böylece kendiliğinden atlanıyor. */
  for (const m of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const secici = m[1].trim().split("\n").pop().trim();
    const govde = m[2];
    if (secici.startsWith("@")) continue;

    const satir = text.slice(0, m.index).split("\n").length;
    const yer = `${relative(ROOT, file)}:${satir}`;

    const y = YATAY.exec(govde);
    if (y && Number(y[1]) >= 2) {
      bulgular.push({ yer, secici, ne: `dikey şerit · ${y[0].trim()}` });
    }

    const d = DIKEY.exec(govde);
    if (d && Number(d[1]) >= 2 && KUTU.test(govde)) {
      bulgular.push({ yer, secici, ne: `kutunun üst/alt şeridi · ${d[0].trim()}` });
    }

    const g = GOLGE.exec(govde);
    if (g && (Math.abs(Number(g[1])) >= 2 || Math.abs(Number(g[2])) >= 2)) {
      bulgular.push({ yer, secici, ne: `gölgeyle çizilmiş şerit · ${g[0].trim()}` });
    }
  }
}

if (bulgular.length === 0) {
  console.log("Şerit yok. Denetlenen dosya: " + files.length);
  process.exit(0);
}

console.log(`KUTU KENARINDA ŞERİT · ${bulgular.length} yer\n`);
for (const b of bulgular) {
  console.log(`  ${b.yer}\n    ${b.secici}\n    ${b.ne}\n`);
}
console.log("Kural: docs/tuzaklar.md · kural 4 — kutu kenarına şerit yasak.");
process.exit(1);
