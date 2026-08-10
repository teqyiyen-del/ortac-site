import { Calculator, IdCard, Landmark, type LucideIcon } from "lucide-react";
import type { CountrySlug } from "@/lib/brand";
import { PRICING } from "@/lib/pricing";

/* ============================================================================
   LAB · ana sayfa §11 mavi kart turu — ÜÇ ADAYIN ORTAK VERİSİ

   Üç aday (MaviKart1 · MaviKart2 · MaviKart3) yalnızca KART TASARIMINDA
   ayrılıyor. Rakamlar, kalem adları ve dipnotlar burada bir kez duruyor;
   üçü de buradan okuyor. Kopyalasaydık bir adayda düzeltilen bir rakam
   ötekinde eskir ve müşteri farkı tasarım sanardı.

   --------------------------------------------------------------------------
   RAKAMLAR KAYNAĞINDAN OKUNUYOR, KOPYALANMIYOR
     · başlangıç tutarı  → src/lib/brand.ts · FACTS[c].from / fromLabel
     · ek kalemler       → src/lib/pricing.ts · PRICING[c].bank / annual / perVisa
   Bu dosyada tek bir tutar yazılı değil ve yazılmayacak. pricing.ts'e
   dokunulmadı; yalnızca okundu.

   ÇÖZÜLMEMİŞ ÇELİŞKİ — BİLEREK ÇÖZÜLMEDİ
   src/lib/afterSetup.ts Dubai'de aylık muhasebeyi 350 USD diyor (12 ay =
   4.200 USD/yıl), src/lib/pricing.ts ise PRICING.dubai.annual = 2100 basıyor.
   İki dosya birbirini tutmuyor ve afterSetup.ts'in kendi başındaki not bunu
   zaten yazıyor: hangisinin doğru olduğu müşterinin kararı.

   Bu tur o kararı VERMİYOR. Ne yanlış olan sabitlendi, ne yeni bir rakam
   uyduruldu, ne de aylık bir tutar ekrana getirildi. "Yıllık muhasebe" satırı
   canlı bölümün bugün bastığı sayıyı, yani PRICING[c].annual'ı basıyor —
   adaylar canlı bölümle aynı şeyi söylüyor, fazlasını değil. Karar geldiğinde
   değişecek tek yer pricing.ts ve üç aday da kendiliğinden düzelecek.

   --------------------------------------------------------------------------
   METİNLER CANLI BİLEŞENDEN AYNALANDI, YAZILMADI
   SCOPE, NEEDS ve LINE_NOTE'un içeriği src/components/home/PriceSummary.tsx'te
   onaylanmış hâliyle duruyor ve buraya birebir taşındı. Bu dosya salt okunur
   olduğu için export edilemiyordu, o yüzden kopya kaçınılmaz.

   DİKKAT — İKİ KOPYA BİR GÜN AYRIŞIR. Bir aday seçilip canlıya alındığında bu
   dosya SİLİNECEK ve kazanan yeniden PriceSummary'nin kendi sabitlerini
   kullanacak. Tur kapanmadan bu satırlar canlıda değişirse buraya da elle
   taşınmalı.
   ========================================================================= */

export type NeedKey = "banka" | "muhasebe" | "vize";

export type Need = { key: NeedKey; chip: string; line: string; icon: LucideIcon };

export const NEEDS: Need[] = [
  { key: "banka", chip: "Banka hesabı", line: "Banka hesabı desteği", icon: Landmark },
  { key: "muhasebe", chip: "Yıllık muhasebe", line: "Yıllık muhasebe", icon: Calculator },
  { key: "vize", chip: "Oturum & vize", line: "Oturum & vize · 1 kişi", icon: IdCard },
];

/** Kuruluş satırının altındaki kapsam cümlesi — ülkeye göre. */
export const SCOPE: Record<CountrySlug, string> = {
  dubai: "Lisans, tescil ve kuruluş evrakı",
  ingiltere: "Tescil, kayıtlı adres ve vergi kaydı",
  kktc: "Tescil, ana sözleşme ve vergi kaydı",
};

/** Bölümün değil SATIRIN dürüst dipnotu: yalnızca ilgili ülkede basılıyor. */
export const LINE_NOTE: Record<NeedKey, Partial<Record<CountrySlug, string>>> = {
  banka: { kktc: "Hesap açılışında banka fiziki ziyaret isteyebiliyor" },
  muhasebe: {},
  vize: {
    dubai: "Vize ve biyometri için BAE'ye gelmek gerekiyor",
    ingiltere: "Şirket kuruluşu oturum hakkı vermiyor, ayrı bir yol gerekir",
  },
};

const nf = new Intl.NumberFormat("de-DE");
export const money = (n: number) => `$${nf.format(n)}`;

export function needAmount(key: NeedKey, c: CountrySlug): number {
  const p = PRICING[c];
  if (key === "banka") return p.bank;
  if (key === "muhasebe") return p.annual;
  return p.perVisa;
}

export const extraFor = (picked: Need[], c: CountrySlug) =>
  picked.reduce((s, n) => s + needAmount(n.key, c), 0);
