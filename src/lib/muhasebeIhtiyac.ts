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
     · her kalemin gerekçe cümlesi ekrandan kalktı; "duruma bağlı" kalemde
       en fazla dört kelimelik KOŞUL kaldı.
       ÜÇÜNCÜ HÂLDE GERİ GELDİ, TIKLAMANIN ARKASINDA. Burak: "altlı üstlü
       değil önceki gibi yan yana formatta yap sadece biraz sadeleştir
       istemiştim. mesela her başlığın altında uzun uzun açıklama yazacağına
       sadece basınca içeriği gözüksün yeterdi." Yani sadeleştirilmesi
       istenen şey düzen değil, AÇIK DURAN METİNDİ. `neden` her satırda var ve
       satırın açılırında; koşul rozette kaldı.
     · ciro beş banttan üçe: 187.500 AED (isteğe bağlı KDV) ve 3 milyon AED
       sınırları düştü. 375 binin altındaki şirkete KDV kaydı "gerekmiyor"
       demek doğru; isteğe bağlı kayıt bir ihtiyaç değil, bir seçenek ve KDV
       kaydı sayfasında yazılı. 3 milyon sınırı aşağıdaki nota bakın.
     · durum üç seçenekten ikiye (yeni · faaliyette): "kayıtlar aksadı" ile
       "muhasebeci değiştiriyorum" aynı kalemleri işaretliyordu; ikisinin
       farkını bir üstteki #gecis bölümü anlatıyor.
     · KDV'de "emin değilim" düştü: hükmü "duruma bağlı"ya düşürmekten başka
       bir şey yapmıyordu.
     · e-fatura notu ekrandan kalktı. Fiyat üçüncü hâlde satırın sağına
       döndü (ilk hâldeki yeri; tek kısa rakam, açık metin sayılmıyor).

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

export type Satir = { kalem: AfterItem; hukum: Hukum; kosul?: string; neden: string };

/* İKON ADLARI STRING, BİLEŞEN DEĞİL (17.09.2026 · dördüncü hâl). Bu dosya
   okunabilir bir kural dosyası olarak kalsın; ad → lucide eşlemesi
   bileşende (AccountingNeeds.tsx · IKON). accountingDubai.ts · AccIcon ile
   aynı gerekçe. */
export type IhtiyacIkon =
  | "konum"
  | "serbest"
  | "mainland"
  | "durum"
  | "yeni"
  | "faaliyette"
  | "ciro"
  | "ciroAlt"
  | "ciroOrta"
  | "ciroUst"
  | "kdv"
  | "kdvYok"
  | "kdvVar";

type Secenek<T extends string> = { id: T; etiket: string; ikon: IhtiyacIkon };
type Soru<T extends string> = { soru: string; ikon: IhtiyacIkon; secenekler: Secenek<T>[] };

export const SORULAR: {
  bolge: Soru<Bolge>;
  durum: Soru<Durum>;
  ciro: Soru<Ciro>;
  kdv: Soru<Kdv>;
} = {
  bolge: {
    soru: "Şirket nerede?",
    ikon: "konum",
    secenekler: [
      { id: "serbest", etiket: "Serbest bölge", ikon: "serbest" },
      { id: "mainland", etiket: "Mainland", ikon: "mainland" },
    ],
  },
  durum: {
    soru: "Şirketin durumu",
    ikon: "durum",
    secenekler: [
      { id: "yeni", etiket: "Yeni kuruluyor", ikon: "yeni" },
      { id: "faaliyette", etiket: "Faaliyette", ikon: "faaliyette" },
    ],
  },
  /* Bant sınırları mevzuatın eşikleri: 375 bin (KDV), 50 milyon (denetim).
     3 milyon (küçük işletme indirimi) kalemlerin hiçbirinin hükmünü
     değiştirmediği için bant sınırı değil. */
  ciro: {
    soru: "Yıllık ciro",
    ikon: "ciro",
    secenekler: [
      { id: "alt", etiket: "375 bin AED altı", ikon: "ciroAlt" },
      { id: "orta", etiket: "375 bin – 50 milyon AED", ikon: "ciroOrta" },
      { id: "cokbuyuk", etiket: "50 milyon AED üstü", ikon: "ciroUst" },
    ],
  },
  kdv: {
    soru: "KDV kaydı",
    ikon: "kdv",
    secenekler: [
      { id: "yok", etiket: "Yok", ikon: "kdvYok" },
      { id: "var", etiket: "Var", ikon: "kdvVar" },
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
        return c.durum === "yeni"
          ? {
              hukum: "gerekli",
              neden: "Serbest bölgedekiler dahil her şirket kayıt yaptırıyor; yeni şirkette süre kuruluştan itibaren üç ay.",
            }
          : {
              hukum: "bagli",
              kosul: "Kayıtlı değilseniz",
              neden: "Kaydınız yoksa gerekli ve geç kaydın cezası 10.000 AED; kayıtlıysanız bu kalem doğmuyor.",
            };
      case "kdv-kaydi":
        if (c.kdv === "var") return { hukum: "gerekmiyor", neden: "Kaydınız zaten var." };
        return kdvZorunlu
          ? { hukum: "gerekli", neden: "Vergiye tabi tedarik ve ithalat 375.000 AED'yi geçince kayıt 30 gün içinde zorunlu." }
          : {
              hukum: "gerekmiyor",
              neden: "375.000 AED'nin altında kayıt zorunlu değil; 187.500 AED'nin üstündeyseniz isteğe bağlı kayıt mümkün.",
            };
      case "aylik-muhasebe":
        return {
          hukum: "gerekli",
          neden: "Kayıt tutmak her şirket için zorunlu; kurumlar vergisi kayıtları yedi yıl saklanıyor.",
        };
      case "kdv-beyannamesi":
        return kdvDoguyor
          ? { hukum: "gerekli", neden: "KDV kaydı olan şirket her dönem beyanname veriyor, satış olmasa da." }
          : { hukum: "gerekmiyor", neden: "KDV kaydı olmadan beyanname doğmuyor." };
      case "yil-sonu":
        return {
          hukum: "gerekli",
          neden: "Beyan, vergi %0 çıksa da dönem sonundan itibaren dokuz ay içinde veriliyor.",
        };
      case "bagimsiz-denetim":
        if (c.ciro === "cokbuyuk")
          return { hukum: "gerekli", neden: "Geliri 50 milyon AED'yi aşan şirketin tabloları denetlenmiş olmalı." };
        return c.bolge === "serbest"
          ? {
              hukum: "bagli",
              kosul: "%0 oranı için",
              neden: "Serbest bölgede %0 oranından yararlanıyorsanız denetlenmiş tablo gelirden bağımsız şart; bazı bölge otoriteleri de istiyor.",
            }
          : {
              hukum: "bagli",
              kosul: "LLC ise",
              neden: "Vergi açısından bu ciroda zorunlu değil; şirketler kanunu mainland LLC'lere yıllık denetçi atamayı öngörüyor.",
            };
      default:
        return null;
    }
  };

  return accountingItems().flatMap((kalem) => {
    const h = hukum(kalem.id);
    return h ? [{ kalem, ...h }] : [];
  });
}
