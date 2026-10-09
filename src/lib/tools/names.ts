/* ============================================================================
   ŞİRKET İSMİ ÜRETECİ — kelime listeleri ve birleştirme kuralı
   ============================================================================

   NE OLDUĞU VE NE OLMADIĞI — bu ayrım aracın varlık şartı

   Müşteri isim üreteci istedi; rakiplerden Osome'da da var (belge s.2). Ama
   Osome'un aracı ürettiği ismi kendi sorgu aracına sokup MÜSAİTLİK söylüyor.
   Biz onu yapamayız: tescil müsaitliği otoritenin kendi kaydında ve elimizde
   öyle bir bağlantı yok. Yarım yapılırsa araç doğrudan yalan söyler — "bu isim
   müsait" cümlesi, karşılığı olmayan bir vaat.

   O yüzden bu araç yalnızca ADAY ÜRETİYOR ve bunu ekranda da söylüyor.
   Değeri şurada: kuruluş sırasında Dubai için ziyaretçiden istenen şey zaten
   "üç şirket adı alternatifi, tercih sırasıyla" (countryContent.dubai.docs).
   Araç tam olarak o üçlüyü kopyalanacak biçimde veriyor.

   YAPAY ZEKÂ YOK
   Dış istek yok, anahtar yok, sunucu yok. Aşağıdaki listeler ve tek bir
   birleştirme kuralı — hepsi tarayıcıda. Aynı girdi her zaman aynı çıktıyı
   veriyor; "başka öneriler" düğmesi rastgelelik değil, listelerde kaydırma.
   Rastgelelik olsaydı sunucu ile tarayıcı farklı isimler basar ve React
   hidrasyon uyarısı verirdi (aynı gerekçe: lib/tools/date.ts).

   ---------------------------------------------------------------------------
   BU TURDA EKLENEN: SEKTÖR

   Müşteri: "yine biraz aşama aşama ilerleyelim ya. anahtar kelime, sektör,
   üslup, vb." Sektör yalnızca bir adım değil, ÜRETİMİ DEĞİŞTİREN bir girdi:
   "Atlas Group" her işe uyan ama hiçbir şey söylemeyen bir ad; "Atlas Labs"
   yazılım, "Atlas Logistics" nakliye işini adın kendisinde söylüyor.

   Sektör iki listeyi birden değiştiriyor: iş sözcükleri (kurumsal üslup) ve
   kökler (bileşik üslup). Kısa üslup sektörden etkilenmiyor, çünkü orada ada
   giren tek şey ziyaretçinin kendi kelimesi.

   LİSTELERDE OLMAYANLAR VE NEDENİ
   Ülke adları, "Royal / Emirates / National" gibi otorite çağrıştıran
   sözcükler, ve LİSANSLI FAALİYET adları (bank, insurance, finance, capital,
   investment) bilerek yok. Tescil otoritelerinin kısıtlı kelime listeleri
   genelde tam olarak bu sınıfı kapsıyor ve üretilen adayın baştan elenmesi
   aracı işe yaramaz yapar.

   Sektör listeleri de aynı süzgeçten geçti: "finans" ve "sigorta" sektör
   olarak HİÇ SUNULMUYOR — o sektörde üretilecek her makul sözcük kısıtlı
   listeye giriyor, yani araç o kişiye yalnızca elenecek adaylar verirdi.
   Bu bir eksiklik değil, bilinçli bir sınır.

   Bunlar listelerin YAZILIŞ ÖLÇÜTÜ; bir uyum kontrolü değil. Aracın kendisi
   de "kısıtlı kelime kontrolü yapmıyorum" diyor.
   ========================================================================= */

/* ---------------------------------------------------------------------------
   09.10.2026 · HAVUZ VE FORMÜL YENİLENDİ

   Halil: "sağlam bir havuz + bir formül yapalım." Üç şey değişti; yukarıdaki
   ilkeler (yapay zekâ yok, dış istek yok, aynı girdi aynı çıktı, kısıtlı sınıf
   listelerde yok, müsaitlik sözü yok) aynen duruyor.

   1) HAVUZ lib/tools/isimHavuzu.ts'e taşındı ve büyüdü: 96 kökten 679'a, on
      sektör (gayrimenkul ve sağlık eklendi) ve altı temadan. Nasıl üretilip
      elendiği o dosyanın başında.
   2) DÖRDÜNCÜ ÜSLUP: kaynaşık. Kelime ile kök ORTAK HARFTEN birleşiyor
      ("Atlas" + "Aster" → "Atlaster"); ortak harfi olmayan çift aday olmuyor.
   3) SIRALAMA. Eskiden adaylar listedeki sırayla geliyordu. Şimdi bir üslubun
      bütün adayları üretiliyor, PUANLANIYOR ve en iyiden başlayarak altışar
      veriliyor. Puanın ölçtüğü: uzunluk, hece sayısı, birleşme yerindeki ses
      (iki ünlü ya da üç ünsüz yan yana gelmesin, aynı harf çiftlenmesin), iki
      kelimeli adda baş harf uyumu. Eşit puanda havuzdaki sıra: rastgelelik yine yok.
      Ölçütlerin kaynağı pazarlama yazılarının ortak noktası (2-3 hece, kısa ad,
      yazıldığı gibi okunma); deneysel bir eşik değil, pratik bir sıralama.
   Bileşik ve kaynaşık adayda kökün anlamı da dönüyor (isimAciklamalari).
   ------------------------------------------------------------------------- */

import { EKLER, SEKTOR_IS, SEKTOR_KOK, TEMA_KOK, type Kok } from "./isimHavuzu";

export type NameTone = "kurumsal" | "kisa" | "bilesik" | "kaynasik";

export const TONES: { key: NameTone; label: string; hint: string }[] = [
  { key: "kurumsal", label: "Kurumsal", hint: "Kelimeniz + iş sözcüğü" },
  { key: "kisa", label: "Kısa ve modern", hint: "Kelimenizin kökü + kısa ek" },
  { key: "bilesik", label: "Bileşik", hint: "Kelimeniz + ikinci bir kök" },
  { key: "kaynasik", label: "Kaynaşık", hint: "Kelimeniz ve bir kök ortak harften birleşir" },
];

export type SectorKey = keyof typeof SEKTOR_KOK;

/* Sektör etiketleri. Sıra ekrandaki sıra; "genel" ilk ve varsayılan (sektörünü
   henüz seçmemiş biri aracı kullanamamış olmasın). "finans" ve "sigorta" yine
   yok: o sektörde üretilecek her makul sözcük kısıtlı listeye giriyor. */
const SEKTOR_ETIKET: Record<SectorKey, string> = {
  genel: "Henüz belli değil",
  yazilim: "Yazılım ve teknoloji",
  eticaret: "E-ticaret ve perakende",
  danismanlik: "Danışmanlık ve hizmet",
  lojistik: "Lojistik ve dış ticaret",
  insaat: "İnşaat ve mühendislik",
  medya: "Medya, reklam ve tasarım",
  turizm: "Turizm ve konaklama",
  gayrimenkul: "Gayrimenkul",
  saglik: "Sağlık ve medikal",
};

export const SECTORS: { key: SectorKey; label: string; biz: readonly string[]; roots: readonly string[] }[] = (
  Object.keys(SEKTOR_ETIKET) as SectorKey[]
).map((key) => ({ key, label: SEKTOR_ETIKET[key], biz: SEKTOR_IS[key], roots: SEKTOR_KOK[key].map((k) => k[0]) }));

export const SECTOR_BY_KEY = Object.fromEntries(SECTORS.map((s) => [s.key, s])) as Record<SectorKey, (typeof SECTORS)[number]>;

/** Bir turda kaç aday: üçü öne çıkıyor, kalanı yedek. Izgara geniş ekranda üç sütun, 6 tam iki satır. */
export const PER_ROUND = 6;
/** Bir üslubun en çok kaç adayı gösterilir (on tur). Puan sıralı olduğu için kuyruk zaten zayıf adaylar. */
const EN_COK = 60;

const VOWELS = "aeıioöuüAEIİOÖUÜ";

/** Türkçe büyük harf kuralıyla: "istanbul" → "İstanbul", "ırmak" → "Irmak". */
function cap(s: string): string {
  if (!s) return s;
  return s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1).toLocaleLowerCase("tr-TR");
}

/**
 * Girdiyi tek bir kelimeye indiriyor: boşluk, rakam ve noktalama düşüyor.
 * Boş dönerse araç hiç sonuç göstermiyor — anahtar kelimesiz bir isim üreteci,
 * ziyaretçinin işine yaramayan rastgele bir sözcük listesi olurdu.
 */
export function normalizeKeyword(input: string): string {
  const letters = input.replace(/[^\p{L}]/gu, "");
  return letters.slice(0, 24);
}

/** Kısa ek için kök: ilk beş harf, sondaki sesli ek de sesliyle başlıyorsa
 *  düşüyor ("Ortaca" + "ora" yerine "Ortac" + "ora"). */
function stem(word: string, ending: string): string {
  const base = word.slice(0, Math.min(5, word.length));
  const last = base.at(-1) ?? "";
  const first = ending.charAt(0);
  if (base.length > 2 && VOWELS.includes(last) && VOWELS.includes(first)) {
    return base.slice(0, -1);
  }
  return base;
}

/* ------------------------------------------------------------------ PUAN */
const UNLU = "aeiouyıöü";
const unluMu = (c: string) => UNLU.includes(c);
const heceSay = (s: string) => (s.toLocaleLowerCase("tr-TR").match(/[aeiouyıöü]+/g) ?? []).length;

/** Birleşme yerinin cezası: `a` ile biten parça `b` ile başlayan parçaya yapışıyor. */
function ekYeri(a: string, b: string): number {
  const x = a.toLocaleLowerCase("tr-TR"), y = b.toLocaleLowerCase("tr-TR");
  const son = x.at(-1) ?? "", ilk = y.charAt(0);
  let ceza = 0;
  if (son === ilk) ceza += 9; /* aynı harf çiftleniyor: "Atlassignal" */
  else if (unluMu(son) && unluMu(ilk)) ceza += 8; /* iki ünlü yan yana, okurken takılıyor */
  /* birleşme yerinde ünsüz yığını */
  const sonUnsuz = x.match(/[^aeiouyıöü]+$/)?.[0].length ?? 0, ilkUnsuz = y.match(/^[^aeiouyıöü]+/)?.[0].length ?? 0;
  if (sonUnsuz + ilkUnsuz >= 3) ceza += 6 * (sonUnsuz + ilkUnsuz - 2);
  return ceza;
}

/** 0-100. Yüksek olan önce gelir. `marka` adın uydurulan kısmı (iki kelimeli adda ilk kelime ziyaretçinin). */
function puanla(ad: string, parcalar: [string, string] | null, ortak = 0): number {
  const kelimeler = ad.split(" "), harf = ad.replace(/\s/g, "").length;
  let p = 100;
  if (kelimeler.length > 1) {
    /* iki kelime: toplam uzunluk ve ikinci kelimenin hecesi */
    if (harf > 16) p -= (harf - 16) * 4;
    const h = heceSay(kelimeler[1]);
    if (h > 3) p -= (h - 3) * 7;
    if (kelimeler[0].charAt(0).toLocaleLowerCase("tr-TR") === kelimeler[1].charAt(0).toLocaleLowerCase("tr-TR")) p += 6; /* baş harf uyumu */
  } else {
    if (harf > 11) p -= (harf - 11) * 6;
    if (harf < 5) p -= (5 - harf) * 6;
    const h = heceSay(ad);
    if (h >= 5) p -= 22;
    else if (h === 4) p -= 8;
    else if (h <= 1) p -= 6;
  }
  if (parcalar) p -= ekYeri(parcalar[0], parcalar[1]);
  if (/(.)\1\1/i.test(ad)) p -= 12;
  return p + ortak * 5;
}

/* ---------------------------------------------------------------- ÜRETİM */
type Aday = { ad: string; puan: number; kok?: Kok };

/** Kelimenin sonu ile kökün başı (ya da tersi) kaç harf örtüşüyor: en uzun örtüşme, en çok 3. */
function ortusme(a: string, b: string): number {
  const x = a.toLocaleLowerCase("tr-TR"), y = b.toLocaleLowerCase("tr-TR");
  for (let k = Math.min(3, x.length - 1, y.length - 1); k >= 1; k--) if (x.endsWith(y.slice(0, k))) return k;
  return 0;
}

function uret(key: string, sector: SectorKey, tone: NameTone): Aday[] {
  const word = cap(key), kucuk = key.toLocaleLowerCase("tr-TR");
  const out = new Map<string, Aday>();
  const ekle = (ad: string, puan: number, kok?: Kok) => {
    if (!ad || ad === word) return;
    const onceki = out.get(ad);
    if (!onceki || onceki.puan < puan) out.set(ad, { ad, puan, kok });
  };
  /* bileşik ve kaynaşık: önce sektörün kökleri, sonra tema kökleri (sektörde zaten olan atlanıyor) */
  const sektorKok = SEKTOR_KOK[sector] as readonly Kok[];
  const kokler = [...sektorKok, ...TEMA_KOK.filter((t) => !sektorKok.some((k) => k[0] === t[0]))];

  if (tone === "kurumsal") {
    for (const b of SEKTOR_IS[sector]) ekle(`${word} ${b}`, puanla(`${word} ${b}`, null));
  } else if (tone === "kisa") {
    for (const e of EKLER) {
      const govde = stem(key, e), ad = cap(`${govde}${e}`);
      ekle(ad, puanla(ad, [govde, e]));
    }
  } else if (tone === "bilesik") {
    for (const k of kokler) {
      const r = k[0].toLocaleLowerCase("tr-TR");
      /* sektörün kendi kökü tema köküne göre biraz önde: aynı puanda sektörü söyleyen kazansın */
      const sektorden = sektorKok.includes(k) ? 7 : 0;
      ekle(cap(`${kucuk}${r}`), puanla(cap(`${kucuk}${r}`), [kucuk, r]) + sektorden, k);
      ekle(cap(`${r}${kucuk}`), puanla(cap(`${r}${kucuk}`), [r, kucuk]) + sektorden, k);
    }
  } else {
    for (const k of kokler) {
      const r = k[0].toLocaleLowerCase("tr-TR");
      for (const [a, b] of [[kucuk, r], [r, kucuk]] as const) {
        const o = ortusme(a, b);
        if (!o) continue;
        const ad = cap(a + b.slice(o));
        /* kaynaşma iki kelimeyi de taşımalı: sonuç ikisinden de belirgin uzun, ama okunur boyda */
        if (ad.length < Math.max(a.length, b.length) + 2 || ad.length > 12) continue;
        ekle(ad, puanla(ad, null, o), k);
      }
    }
  }
  /* ortak harfi olan kök yoksa (iki harfli kelimede sık) kaynaşık boş kalmasın: bileşiğe düşüyor */
  if (tone === "kaynasik" && out.size === 0) return uret(key, sector, "bilesik");
  /* Eşit puanda HAVUZDAKİ sıra korunuyor (sort kararlı, Map ekleme sırasını tutuyor): alfabetik
     sıralamak "Apps, Cloud, Computing…" diye sözlük gibi bir liste veriyordu. */
  return [...out.values()].sort((x, y) => y.puan - x.puan).slice(0, EN_COK);
}

/* Aynı (kelime, sektör, üslup) için liste bir kez kuruluyor; tur değişince yeniden üretmek gerekmiyor. */
let sonAnahtar = "", sonListe: Aday[] = [];
function liste(rawKeyword: string, sector: SectorKey, tone: NameTone): Aday[] {
  const key = normalizeKeyword(rawKeyword);
  if (key.length < 2) return [];
  const a = `${key}|${sector}|${tone}`;
  if (a !== sonAnahtar) {
    sonAnahtar = a;
    sonListe = uret(key, SEKTOR_KOK[sector] ? sector : "genel", tone);
  }
  return sonListe;
}

/**
 * Aday listesi. Aynı (kelime, sektör, üslup, tur) her zaman aynı sonucu veriyor.
 * `round` sıfırdan başlıyor ve puan sıralı listede altışar ilerliyor; rastgelelik yok.
 */
export function generateNames(rawKeyword: string, sector: SectorKey, tone: NameTone, round: number): string[] {
  return liste(rawKeyword, sector, tone).slice(round * PER_ROUND, (round + 1) * PER_ROUND).map((a) => a.ad);
}

/** Bileşik ve kaynaşık adaylarda kullanılan kökün anlamı: { "Atlaslumen": "Lumen · Latince · ışık" }. */
export function isimAciklamalari(rawKeyword: string, sector: SectorKey, tone: NameTone, round: number): Record<string, string> {
  const out: Record<string, string> = {};
  for (const a of liste(rawKeyword, sector, tone).slice(round * PER_ROUND, (round + 1) * PER_ROUND))
    if (a.kok?.[1]) out[a.ad] = [a.kok[0], a.kok[2], a.kok[1]].filter(Boolean).join(" · ");
  return out;
}

/**
 * Bir (kelime, sektör, üslup) kaç TUR üretebiliyor. Havuz sonlu; arayüz bu sayıyı
 * okuyup son turda "başka öneriler" düğmesini basmıyor. Kaynaşık üslupta sayı
 * kelimeye bağlı (ortak harfi olan kök sayısı), o yüzden kelime de soruluyor.
 */
export function turSayisi(sector: SectorKey, tone: NameTone, rawKeyword = "ornek"): number {
  return Math.max(1, Math.ceil(liste(rawKeyword, sector, tone).length / PER_ROUND));
}

/**
 * Adayın alan adı biçimi: boşluk ve Türkçe harfler düşüyor.
 *
 * NEDEN BURADA: alan adı sorgusu ağ tarafında (lib/tools/alanadi.ts) ama
 * SORGULANACAK DİZGE bir isimlendirme kararı, ağ kararı değil. "Atlas Group"
 * için sorgulanacak şey "atlasgroup" — arada tire mi olsun sorusunun cevabı
 * "hayır", çünkü tireli alan adı ikinci tercihtir ve araç birinci tercihi
 * soruyor.
 *
 * Türkçe harfler ASCII karşılığına iniyor: alan adlarında ç/ğ/ı/ö/ş/ü ancak
 * punycode ile yaşıyor ve pratikte kimse öyle kullanmıyor.
 */
const TR_ASCII: Record<string, string> = {
  ç: "c",
  ğ: "g",
  ı: "i",
  İ: "i",
  ö: "o",
  ş: "s",
  ü: "u",
  â: "a",
  î: "i",
  û: "u",
};

export function toDomainLabel(name: string): string {
  return name
    .toLocaleLowerCase("tr-TR")
    .split("")
    .map((ch) => TR_ASCII[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]/g, "");
}
