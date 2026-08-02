import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ============================================================================
   SWAP:TOOL_RATES — hesaplayıcıların kullandığı BÜTÜN oran ve eşikler
   ============================================================================

   NEDEN TEK DOSYA

   Araçlar bölümünün ağırlığı bu turda huninin tepesine kaydı: vergi
   hesaplayıcıları. Hesaplayıcı demek, ekranda bir SAYI üretmek demek — ve bir
   şirket kuruluş sitesinde yanlış basılmış bir vergi oranı, yanlış yazılmış bir
   cümleden başka bir sınıfta hata. O yüzden buradaki kural sert:

     Hiçbir bileşen kendi içinde oran ya da eşik taşımıyor. Hepsi burada,
     kaynağıyla birlikte. Müşteri tek bir dosyaya bakıp "evet, bu oranlar
     doğru" diyebiliyor; onaylandığında da dokunulacak tek yer burası.

   HER DEĞERİN İKİ KAYNAĞI VAR VE İKİSİ DE YAZILI
     · `repoRule` — depodaki DOĞRULANMIŞ metin (lib/countryContent.ts). Araç bu
       cümleyi ekranda AYNEN basıyor, yani ziyaretçi hesabın dayandığı kuralı
       sayının hemen yanında okuyor.
     · `docPage`  — müşterinin ajansının hazırladığı araç analizi belgesindeki
       sayfa. Belge bir rakip analizi, hukuki teyit değil; o yüzden tek başına
       yeterli sayılmıyor ve `confirmed` alanı hâlâ false.

   `confirmed: false` NE DEMEK
   Sayı kullanılabilir ama TEYİT EDİLMEDİ. Araçlar bunu saklamıyor: sonucun
   altında oranın teyit beklediği yazıyor. Alan true olduğunda o satır kendi
   kendine kayboluyor — yani onay, arayüzde de karşılığı olan bir işlem.

   BURADA OLMAYANLAR VE NEDENİ
     · İngiltere kurumlar vergisi — countryContent.ts'te SWAP:UK_CT_RATE ile
       teyitsiz işaretli ve "kâr dilimine göre %19-25" diyor. Marjinal indirim
       eşiği hiçbir yerde yazmıyor; eşiksiz bir dilimli hesap yanlış sonuç
       üretir. Aracı yazmak yerine kayıt defterinde `planned` bıraktık.
     · İngiltere KDV — belge %20 diyor (s.7) ama kayıt eşiği için sayı vermiyor
       ve depoda da yok ("Eşik aşılırsa zorunlu"). Yalnızca oranla bir KDV
       aracı yazılabilirdi; eşik kontrolü aracın yarısı olduğu için beklettik.
     · KKTC — countryContent.ts açıkça "bu sayfada oran yayımlamıyoruz" diyor.
       Belgedeki %0 / ~%1 / %10+%15 üçlüsü (s.8) sitenin kendi yayın kararıyla
       çelişiyor. Bu çelişki bir araçla değil, müşteriyle çözülür.
   ========================================================================= */

export type ToolRate = {
  /** ekranda ve hesapta kullanılan değer */
  value: number;
  /** insan okunur birim/biçim — arayüz bunu yazıyor, kendi metni yok */
  label: string;
  /** depodaki doğrulanmış satırın etiketi; ruleOf() bununla buluyor */
  repoRow: { country: Country; label: string };
  /** müşterinin araç analizi belgesindeki sayfa */
  docPage: number;
  /** mali müşavir teyidi geldi mi */
  confirmed: boolean;
};

/* ------------------------------------------------------- BAE kurumlar vergisi
   Depo satırı: "375.000 AED'ye kadar %0, üzeri %9" (countryContent.dubai.tax).
   Belge s.6: "BAE Kurumlar Vergisi Hesaplayıcı — %9 oran, 375.000 AED muafiyet
   eşiği." İki kaynak birbirini tutuyor; yine de teyit bekliyor. */
export const UAE_CT = {
  /** eşiğe kadar olan kısma uygulanan oran */
  lower: {
    value: 0,
    label: "%0",
    repoRow: { country: "dubai", label: "Kurumlar vergisi" },
    docPage: 6,
    confirmed: false,
  } satisfies ToolRate,
  /** eşiği AŞAN kısma uygulanan oran */
  upper: {
    value: 0.09,
    label: "%9",
    repoRow: { country: "dubai", label: "Kurumlar vergisi" },
    docPage: 6,
    confirmed: false,
  } satisfies ToolRate,
  /** dilim eşiği, AED */
  threshold: {
    value: 375_000,
    label: "375.000 AED",
    repoRow: { country: "dubai", label: "Kurumlar vergisi" },
    docPage: 6,
    confirmed: false,
  } satisfies ToolRate,
  currency: "AED",
} as const;

/* ------------------------------------------------------------------- BAE KDV
   Depo satırı: "%5" + notu "Yıllık vergiye tabi tedarik 375.000 AED eşiğini
   aşarsa kayıt zorunlu." Belge s.6: "%5 KDV, dâhil/hariç hesap."
   Eşik sayısı kurumlar vergisininkiyle aynı ama AYNI ŞEY DEĞİL: biri vergiye
   tabi kazanç, öteki yıllık vergiye tabi tedarik. Bilerek ayrı tanımlandı —
   birini değiştiren öteki hakkında karar vermiş olmasın. */
export const UAE_VAT = {
  rate: {
    value: 0.05,
    label: "%5",
    repoRow: { country: "dubai", label: "KDV" },
    docPage: 6,
    confirmed: false,
  } satisfies ToolRate,
  /** kayıt zorunluluğu eşiği — yıllık vergiye tabi tedarik, AED */
  registration: {
    value: 375_000,
    label: "375.000 AED",
    repoRow: { country: "dubai", label: "KDV" },
    docPage: 6,
    confirmed: false,
  } satisfies ToolRate,
  currency: "AED",
} as const;

/**
 * Bir oranın dayandığı DEPODAKİ cümle. Araçlar hesabın kuralını kendi
 * kelimeleriyle değil bu cümleyle yazıyor: kural ile sayı yan yana durunca
 * gözden geçiren kişi ikisini tek bakışta karşılaştırabiliyor.
 *
 * Satır bulunamazsa null dönüyor ve arayüz kural bloğunu hiç basmıyor —
 * countryContent.ts'te etiket değişirse araç uydurmuyor, susuyor.
 */
export function ruleOf(rate: ToolRate): { label: string; value: string; note?: string } | null {
  const rows = COUNTRY_CONTENT[rate.repoRow.country].tax.rows;
  return rows.find((r) => r.label === rate.repoRow.label) ?? null;
}

/** Aracın altında basılan teyit uyarısı. Onaylanan oranda satır kaybolsun diye
 *  karar burada veriliyor, her araçta ayrı ayrı değil. */
export function needsConfirm(...rates: ToolRate[]): boolean {
  return rates.some((r) => !r.confirmed);
}

/** Bütün araçların altında geçen ortak ibare — belgenin de istediği cümle
 *  ("Rakiplerin hepsi araç sonucuna 'tahmindir, teklif değildir' ibaresi
 *  koyuyor. Biz de koyacağız", belge s.3). Tek yerden, çünkü tek cümle. */
export const ESTIMATE_NOTE =
  "Bu sonuç bir tahmindir, teklif değildir. Size uygulanacak çerçeveyi yazılı teklifte satır satır yazıyoruz.";
