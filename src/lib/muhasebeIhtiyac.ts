import { accountingItems } from "@/lib/accountingDubai";
import type { AfterItem } from "@/lib/afterSetup";

/* ============================================================================
   "BANA HANGİ HİZMETLER GEREKİYOR?" — muhasebe sayfasındaki küçük seçici
   Bileşen: components/services/AccountingNeeds.tsx

   15.09.2026 · marketing listesi, madde 9: "Kullanıcı şirket tipi, ciro, VAT
   durumu gibi birkaç seçim yapsın, hangi hizmetlere ihtiyaç duyduğunu görsün.
   Lead toplamak için de iyi olur."

   DÖRT SORU, ALTI KALEM. Kalemler fiyat listesinin altı kalemi
   (accountingDubai.ts · ACCOUNTING_ITEM_IDS); seçici yeni bir hizmet icat
   etmiyor, var olan listeyi ziyaretçinin durumuna göre işaretliyor. Her
   kalemin yanında tutarı ve alt sayfasının bağlantısı aynı veriden.

   HÜKÜM DEĞİL, ÖN LİSTE. Üç durum var: "gerekli" · "duruma bağlı" ·
   "gerekmiyor". "Duruma bağlı" bilerek geniş tutuldu: serbest bölge otoritesi,
   faaliyetin KDV niteliği ya da mevcut kayıtlar gibi dört sorunun
   göremediği her şey oraya düşüyor. Sonuç ekranı bunu kendi cümlesiyle
   söylüyor; kişiye özel vergi görüşü siteden verilmiyor (brand.ts ·
   STANCE_LIMITS).

   EŞİKLER VE DAYANAKLARI (docs/bae-mevzuat.md, 15.09.2026 resmî kaynak taraması):
     KDV zorunlu kayıt   375.000 AED · FDL 8/2017 md. 13 · CD 52/2017 md. 7
     KDV isteğe bağlı    187.500 AED · FDL 8/2017 md. 17
     KV kaydı            tüm tüzel kişiler · FDL 47/2022 md. 51; yeni şirkette
                         kuruluştan 3 ay · FTA Decision No. 3 of 2024
     KV beyanı           oran %0 çıksa da veriliyor · FDL 47/2022 md. 53
     küçük işletme       gelir ≤ 3 milyon AED, 31.12.2029'a kadar biten
                         dönemler, nitelikli serbest bölge kişisi hariç ·
                         MD 73/2023 (MoF uzatma duyurusu 07.08.2026)
     denetim (vergi)     gelir 50 milyon AED üstü ya da nitelikli serbest
                         bölge kişisi · Ministerial Decision No. 84 of 2025
     denetim (şirket)    mainland LLC ve anonim şirket yıllık denetçi atar ·
                         FDL 32/2021 md. 27 (2021 metni; sonraki değişiklikler
                         bu maddeye dokunmuş mu doğrulanamadı → "duruma bağlı")
     e-fatura            gelir ≥ 50 milyon AED 01.01.2027, altı 01.07.2027 ·
                         MD 244/2025 (10.05.2026 değişikliğiyle)
   Eşik rakamları AED'de yazılı, çünkü mevzuat AED'de; USD karşılığı sabit
   kurdan (1 USD = 3,6725 AED, BAE Merkez Bankası'nın sabit paritesi)
   hesaplanıyor, elle yazılmıyor.
   ========================================================================= */

export const AED_USD = 3.6725;

export type Bolge = "serbest" | "mainland";
export type Durum = "yeni" | "degistir" | "aksadi";
export type Ciro = "c1" | "c2" | "c3" | "c4" | "c5";
export type Kdv = "var" | "yok" | "bilmiyorum";

export type Cevap = { bolge: Bolge; durum: Durum; ciro: Ciro; kdv: Kdv };

export type Hukum = "gerekli" | "bagli" | "gerekmiyor";

export type Satir = {
  kalem: AfterItem;
  hukum: Hukum;
  neden: string;
};

/** Kalem olmayan ama cevaba göre bilinmesi gereken takvim notu (e-fatura). */
export function takvimNotu(c: Cevap): string {
  return c.ciro === "c5"
    ? "E-fatura: geliri 50 milyon AED ve üstü şirketlerde şirketler arası faturada 1 Ocak 2027'de zorunlu başlıyor."
    : "E-fatura: geliri 50 milyon AED'nin altındaki şirketlerde şirketler arası faturada 1 Temmuz 2027'de zorunlu başlıyor.";
}

/** Ciro bantları. Sınırlar mevzuatın eşikleri; etiket AED + yuvarlak USD. */
export const CIRO_BANTLARI: { id: Ciro; ustAed: number | null; etiket: string }[] = [
  { id: "c1", ustAed: 187_500, etiket: "187.500 AED altı" },
  { id: "c2", ustAed: 375_000, etiket: "187.500 – 375.000 AED" },
  { id: "c3", ustAed: 3_000_000, etiket: "375.000 AED – 3 milyon AED" },
  { id: "c4", ustAed: 50_000_000, etiket: "3 – 50 milyon AED" },
  { id: "c5", ustAed: null, etiket: "50 milyon AED üstü" },
];

/** "≈ 102.000 USD" — bandın üst sınırının USD karşılığı, bine yuvarlanmış. */
export function usdKarsilik(aed: number): string {
  const usd = Math.round(aed / AED_USD / 1000) * 1000;
  return `≈ ${usd.toLocaleString("tr-TR")} USD`;
}

export const SORULAR = {
  bolge: {
    soru: "Şirketiniz nerede kurulu?",
    secenekler: [
      { id: "serbest", etiket: "Serbest bölge (Free Zone)" },
      { id: "mainland", etiket: "Mainland" },
    ],
  },
  durum: {
    soru: "Muhasebenizin bugünkü hâli?",
    secenekler: [
      { id: "yeni", etiket: "Şirket yeni ya da kuruluyor" },
      { id: "degistir", etiket: "Muhasebecimi değiştirmek istiyorum" },
      { id: "aksadi", etiket: "Kayıtlar bir süredir aksadı" },
    ],
  },
  ciro: { soru: "Yıllık ciro (tahmini)?" },
  kdv: {
    soru: "KDV kaydınız var mı?",
    secenekler: [
      { id: "var", etiket: "Var" },
      { id: "yok", etiket: "Yok" },
      { id: "bilmiyorum", etiket: "Emin değilim" },
    ],
  },
} as const;

export const BASLANGIC: Cevap = { bolge: "serbest", durum: "yeni", ciro: "c3", kdv: "yok" };

const sira = (c: Ciro) => CIRO_BANTLARI.findIndex((b) => b.id === c);

/**
 * Kalem kalem hüküm. Saf fonksiyon: aynı cevap her zaman aynı listeyi verir,
 * bileşen yalnız basıyor. Sıra fiyat listesinin sırası.
 */
export function ihtiyac(c: Cevap): Satir[] {
  const ciro = sira(c.ciro);
  const zorunluKdv = ciro >= 2; // 375.000 AED ve üstü
  const istegeBagliKdv = ciro === 1; // 187.500 – 375.000 AED
  const kdvVar = c.kdv === "var";

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
              neden: "Kaydınız yoksa gerekli ve geç kaydın cezası 10.000 AED; kayıtlıysanız bu kalem doğmuyor.",
            };
      case "kdv-kaydi":
        if (kdvVar) return { hukum: "gerekmiyor", neden: "Kaydınız zaten var." };
        if (zorunluKdv)
          return {
            hukum: c.kdv === "bilmiyorum" ? "bagli" : "gerekli",
            neden:
              c.kdv === "bilmiyorum"
                ? "Bu cironun üstünde kayıt zorunlu; önce kaydın var olup olmadığına bakıyoruz."
                : "Vergiye tabi tedarik ve ithalat 375.000 AED'yi geçince kayıt 30 gün içinde zorunlu.",
          };
        if (istegeBagliKdv)
          return { hukum: "bagli", neden: "187.500 AED'nin üstünde kayıt isteğe bağlı; zorunlu değil." };
        return { hukum: "gerekmiyor", neden: "Bu ciroda kayıt zorunluluğu doğmuyor." };
      case "kdv-beyannamesi":
        if (kdvVar || (zorunluKdv && c.kdv === "yok"))
          return { hukum: "gerekli", neden: "KDV mükellefi her dönem beyanname veriyor, satış olmasa da." };
        if (istegeBagliKdv || (zorunluKdv && c.kdv === "bilmiyorum"))
          return { hukum: "bagli", neden: "Yalnız KDV kaydı olursa doğuyor." };
        return { hukum: "gerekmiyor", neden: "KDV kaydı olmadan beyanname doğmuyor." };
      case "aylik-muhasebe":
        return {
          hukum: "gerekli",
          neden:
            c.durum === "aksadi"
              ? "Kayıt tutmak zorunlu; aksayan dönemler önce toparlanıyor, sonra aylık düzen başlıyor."
              : "Kayıt tutmak her şirket için zorunlu ve kayıtlar yıllarca saklanıyor.",
        };
      case "yil-sonu":
        return {
          hukum: "gerekli",
          neden:
            ciro <= 2 && c.bolge === "mainland"
              ? "Beyan her yıl veriliyor. Geliriniz 3 milyon AED'yi aşmıyorsa küçük işletme indirimiyle vergisiz sayılmayı seçebiliyorsunuz; beyan yine veriliyor."
              : "Beyan, vergi %0 çıksa da dönem sonundan itibaren dokuz ay içinde veriliyor; mali tablolar da onun dayanağı.",
        };
      case "bagimsiz-denetim":
        if (ciro === 4)
          return { hukum: "gerekli", neden: "Geliri 50 milyon AED'yi aşan şirketin tabloları denetlenmiş olmalı." };
        if (c.bolge === "serbest")
          return {
            hukum: "bagli",
            neden: "Serbest bölgede %0 oranından yararlanıyorsanız denetlenmiş tablo gelirden bağımsız şart; bazı bölge otoriteleri de istiyor.",
          };
        return {
          hukum: "bagli",
          neden: "Vergi açısından bu ciroda zorunlu değil; ama şirketler kanunu mainland LLC'lere yıllık denetçi atamayı öngörüyor.",
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
