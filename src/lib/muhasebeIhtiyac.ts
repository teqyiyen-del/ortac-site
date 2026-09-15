import { accountingItems } from "@/lib/accountingDubai";
import type { AfterItem } from "@/lib/afterSetup";

/* ============================================================================
   "BANA HANGİ HİZMETLER GEREKİYOR?" — muhasebe sayfasındaki küçük seçici
   Bileşen: components/services/AccountingNeeds.tsx

   15.09.2026 · marketing listesi, madde 9: "Kullanıcı şirket tipi, ciro, VAT
   durumu gibi birkaç seçim yapsın, hangi hizmetlere ihtiyaç duyduğunu görsün.
   Lead toplamak için de iyi olur."

   İKİNCİ HÂL, AYNI GÜN, SADELEŞTİ. Burak: "bana hangi hizmetler gerekiyor
   kısmını daha sadeleştirmen lazım. sayfanın geri kalanına uygun şekilde bir
   sadelik kullanmamız lazım." İlk hâlden çıkanlar:
     · her kalemin gerekçe cümlesi (6 × ~90 karakter) → yalnız "duruma bağlı"
       kalemde en fazla dört kelimelik KOŞUL. "Gerekli" ve "gerekmiyor"un
       gerekçesi kalemin alt sayfasında, kutu oraya bağlı.
     · ciro beş banttan üçe: 187.500 AED (isteğe bağlı KDV) ve 3 milyon AED
       sınırları düştü. 375 binin altındaki şirkete KDV kaydı "gerekmiyor"
       demek doğru; isteğe bağlı kayıt bir ihtiyaç değil, bir seçenek ve KDV
       kaydı sayfasında yazılı. 3 milyon sınırı aşağıdaki nota bakın.
     · durum üç seçenekten ikiye (yeni · faaliyette): "kayıtlar aksadı" ile
       "muhasebeci değiştiriyorum" aynı kalemleri işaretliyordu; ikisinin
       farkını bir üstteki #gecis bölümü anlatıyor.
     · KDV'de "emin değilim" düştü: hükmü "duruma bağlı"ya düşürmekten başka
       bir şey yapmıyordu.
     · e-fatura notu ve fiyatlar ekrandan kalktı. Fiyat bir alttaki bölümde
       zaten kalem kalem yazılı.

   HÜKÜM DEĞİL, ÖN LİSTE. Kişiye özel vergi görüşü siteden verilmiyor
   (brand.ts · STANCE_LIMITS); bölümün giriş cümlesi bunu söylüyor.

   EŞİKLER VE DAYANAKLARI (docs/bae-mevzuat.md, 15.09.2026 resmî kaynak taraması):
     KDV zorunlu kayıt   375.000 AED · FDL 8/2017 md. 13 · CD 52/2017 md. 7
     KV kaydı            tüm tüzel kişiler · FDL 47/2022 md. 51
     KV beyanı           oran %0 çıksa da veriliyor · FDL 47/2022 md. 53
     denetim (vergi)     gelir 50 milyon AED üstü ya da nitelikli serbest
                         bölge kişisi · Ministerial Decision No. 84 of 2025
     denetim (şirket)    mainland LLC ve anonim şirket yıllık denetçi atar ·
                         FDL 32/2021 md. 27 (sonraki değişikliklerin bu
                         maddeye dokunup dokunmadığı doğrulanamadı → "duruma
                         bağlı", "gerekli" değil)
   ========================================================================= */

export type Bolge = "serbest" | "mainland";
export type Durum = "yeni" | "faaliyette";
export type Ciro = "alt" | "orta" | "cokbuyuk";
export type Kdv = "var" | "yok";

export type Cevap = { bolge: Bolge; durum: Durum; ciro: Ciro; kdv: Kdv };
export type Hukum = "gerekli" | "bagli" | "gerekmiyor";

export type Satir = { kalem: AfterItem; hukum: Hukum; kosul?: string };

type Secenek<T extends string> = { id: T; etiket: string };

export const SORULAR: {
  bolge: { soru: string; secenekler: Secenek<Bolge>[] };
  durum: { soru: string; secenekler: Secenek<Durum>[] };
  ciro: { soru: string; secenekler: Secenek<Ciro>[] };
  kdv: { soru: string; secenekler: Secenek<Kdv>[] };
} = {
  bolge: {
    soru: "Şirket nerede?",
    secenekler: [
      { id: "serbest", etiket: "Serbest bölge" },
      { id: "mainland", etiket: "Mainland" },
    ],
  },
  durum: {
    soru: "Şirketin durumu",
    secenekler: [
      { id: "yeni", etiket: "Yeni kuruluyor" },
      { id: "faaliyette", etiket: "Faaliyette" },
    ],
  },
  /* Bant sınırları mevzuatın eşikleri: 375 bin (KDV), 50 milyon (denetim).
     3 milyon (küçük işletme indirimi) kalemlerin hiçbirinin hükmünü
     değiştirmediği için bant sınırı değil. */
  ciro: {
    soru: "Yıllık ciro",
    secenekler: [
      { id: "alt", etiket: "375 bin AED altı" },
      { id: "orta", etiket: "375 bin – 50 milyon AED" },
      { id: "cokbuyuk", etiket: "50 milyon AED üstü" },
    ],
  },
  kdv: {
    soru: "KDV kaydı",
    secenekler: [
      { id: "yok", etiket: "Yok" },
      { id: "var", etiket: "Var" },
    ],
  },
};

export const BASLANGIC: Cevap = { bolge: "serbest", durum: "yeni", ciro: "orta", kdv: "yok" };

/**
 * Kalem kalem hüküm. Saf fonksiyon: aynı cevap her zaman aynı listeyi verir.
 * Sıra fiyat listesinin sırası.
 */
export function ihtiyac(c: Cevap): Satir[] {
  const kdvZorunlu = c.ciro !== "alt";
  const kdvDoguyor = c.kdv === "var" || kdvZorunlu;

  const hukum = (id: string): Omit<Satir, "kalem"> | null => {
    switch (id) {
      case "kurumlar-vergisi-kaydi":
        return c.durum === "yeni" ? { hukum: "gerekli" } : { hukum: "bagli", kosul: "Kayıtlı değilseniz" };
      case "kdv-kaydi":
        if (c.kdv === "var") return { hukum: "gerekmiyor" };
        return kdvZorunlu ? { hukum: "gerekli" } : { hukum: "gerekmiyor" };
      case "aylik-muhasebe":
        return { hukum: "gerekli" };
      case "kdv-beyannamesi":
        return kdvDoguyor ? { hukum: "gerekli" } : { hukum: "gerekmiyor" };
      case "yil-sonu":
        return { hukum: "gerekli" };
      case "bagimsiz-denetim":
        if (c.ciro === "cokbuyuk") return { hukum: "gerekli" };
        return c.bolge === "serbest"
          ? { hukum: "bagli", kosul: "%0 oranı için" }
          : { hukum: "bagli", kosul: "LLC ise" };
      default:
        return null;
    }
  };

  return accountingItems().flatMap((kalem) => {
    const h = hukum(kalem.id);
    return h ? [{ kalem, ...h }] : [];
  });
}
