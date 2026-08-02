/* ============================================================================
   ARAÇLAR — sayı okuma ve yazma
   ============================================================================

   date.ts'in üç kararının sayı tarafındaki karşılığı. Aynı sebep: hesaplayıcı
   bir sayıyı yanlış OKURSA sonuç sessizce yanlış çıkıyor, ziyaretçi de bunu
   fark edemiyor.

   1) Intl.NumberFormat KULLANILMIYOR. Çıktısı çalışma ortamının ICU verisine
      bağlı: bir ortamda "375.000", ötekinde "375,000". Sunucu ile tarayıcı
      farklı basarsa React hidrasyon uyarısı veriyor — date.ts'te aynı gerekçe
      ay adları için yazılmıştı. Gruplama elde yapılıyor.

   2) NOKTA BİNLİK, VİRGÜL ONDALIK. Türkçe yazım bu ve alan Türkçe. "1.500"
      bin beş yüz demek, bir buçuk değil. Belirsizlik bırakmamak için araçlar
      okudukları sayıyı ekrana geri yazıyor ("Girilen: 1.500 AED"): kural
      yanlış anlaşılsa bile sonuç sessiz kalmıyor.

   3) OKUNAMAYAN DEĞER null. Boş, harfli ya da negatif girdi için araç sonuç
      göstermiyor. Sıfır geçerli bir cevap (vergi çıkmaz), o yüzden null ile
      0 ayrı tutuluyor.
   ========================================================================= */

/**
 * Serbest metin → sayı. "1.250.000", "1250000", "1 250 000,50" hepsi çalışıyor.
 * Negatif ve sayı olmayan her şey null.
 */
export function parseAmount(input: string): number | null {
  const raw = input.trim();
  if (raw === "") return null;

  /* Boşluk ve binlik noktası atılıyor, ondalık virgül noktaya çevriliyor.
     Sıra önemli: önce nokta atılmazsa "1.500,25" bozuluyor. */
  const cleaned = raw.replace(/[\s. ]/g, "").replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return null;

  const n = Number(cleaned);
  /* Üst sınır bir kısıt değil, akıl sağlığı kontrolü: 10^15 üstünde
     kayan nokta aritmetiği kuruş hassasiyetini kaybediyor. */
  if (!Number.isFinite(n) || n < 0 || n > 1e15) return null;
  return n;
}

/** Sayı → "1.250.000" / "1.250.000,50". `decimals` kadar basamak, yuvarlanmış. */
export function formatAmount(n: number, decimals = 0): string {
  const neg = n < 0;
  const fixed = Math.abs(n).toFixed(decimals);
  const [whole, frac] = fixed.split(".");

  let out = "";
  for (let i = 0; i < whole.length; i++) {
    /* Baştan sayarak grupluyoruz: kalan basamak sayısı üçün katıysa nokta. */
    if (i > 0 && (whole.length - i) % 3 === 0) out += ".";
    out += whole[i];
  }

  return `${neg ? "-" : ""}${out}${frac ? `,${frac}` : ""}`;
}

/**
 * Oran → "%9" / "%8,4". Oranlar rates.ts'te ondalık duruyor (0.09); ekranda
 * yüzde görünüyor. Dönüşüm tek yerde, çünkü 0.09'u üç ayrı bileşende 100 ile
 * çarpmak üç ayrı yuvarlama hatası demek.
 */
export function formatPercent(ratio: number, decimals = 1): string {
  const pct = ratio * 100;
  /* Tam sayıysa ",0" kuyruğu basmıyoruz: "%9,0" yazan bir oran, yuvarlanmış
     bir değer gibi okunuyor — oysa 9 tam olarak 9. */
  const rounded = Number(pct.toFixed(decimals));
  return `%${formatAmount(rounded, Number.isInteger(rounded) ? 0 : decimals)}`;
}
