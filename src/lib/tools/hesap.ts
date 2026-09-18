import { UAE_CT, UK_CT } from "@/lib/tools/rates";

/* ============================================================================
   KURUMLAR VERGİSİ HESABI — SAF FONKSİYONLAR

   18.09.2026 · İki fonksiyon components/tools/KurumlarVergisi.tsx'in içindeydi.
   Araç çıktısının PDF raporu da aynı sayıları basmak zorunda; rapor
   kurucusunun (lib/tools/raporlar.ts) bileşenden içe aktarım yapması ters bir
   bağımlılık olurdu ve hesabı ikinci kez yazmak iki kaynak demekti. Fonksiyonlar
   olduğu gibi taşındı — tek satır mantık değişmedi.

   Oranların tek kaynağı yine lib/tools/rates.ts (UAE_CT · UK_CT).
   ========================================================================= */

/** BAE: iki dilim. Eşiğe kadarki kısım her zaman düşük oranla, yalnızca
 *  AŞAN kısım yüksek oranla — dilimli vergide sık yapılan hata tutarın
 *  tamamına yüksek oranı uygulamak. */
export function baeHesap(profit: number) {
  const lowerBase = Math.min(profit, UAE_CT.threshold.value);
  const upperBase = Math.max(0, profit - UAE_CT.threshold.value);
  const tax = lowerBase * UAE_CT.lower.value + upperBase * UAE_CT.upper.value;
  const effective = profit > 0 ? tax / profit : 0;
  return { lowerBase, upperBase, tax, effective };
}

export type IngBant = "kucuk" | "arada" | "ana";

/** İngiltere: GOV.UK + HMRC CTM03925. `n` vergiye tabi kâr (N), `a`
 *  artırılmış kâr (A); ekrandan her zaman a = n geliyor.
 *
 *  Sınır karşılaştırması A üzerinden (kaynak: "augmented profits" sınırlarla
 *  kıyaslanıyor). Alt sınır DAHİL küçük oranda ("£50,000 or less"), üst sınır
 *  dahil ana oranda: tam 250.000'de formülün indirimi zaten sıfır, yani iki
 *  okuma aynı sayıyı veriyor. Tam 50.000'de de iki yol aynı sayıyı veriyor:
 *  50.000 × %19 = 9.500 ve 50.000 × %25 − 3/200 × 200.000 = 9.500. */
export function ingHesap(n: number, a: number = n) {
  const { small, main, lower, upper, fraction } = UK_CT;
  let bant: IngBant;
  let anaVergi = 0;
  let indirim = 0;
  let vergi: number;

  if (a <= lower.value) {
    bant = "kucuk";
    vergi = Math.round(n * small.value);
  } else if (a >= upper.value) {
    bant = "ana";
    anaVergi = Math.round(n * main.value);
    vergi = anaVergi;
  } else {
    bant = "arada";
    anaVergi = Math.round(n * main.value);
    indirim = Math.round(fraction.value * (upper.value - a) * (n / a));
    vergi = anaVergi - indirim;
  }

  return { bant, anaVergi, indirim, vergi, efektif: n > 0 ? vergi / n : 0 };
}

