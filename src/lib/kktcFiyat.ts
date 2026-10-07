/* KKTC FİYAT VERİSİ (07.10.2026)
   KAYNAK müşterinin kendi teklif belgesi: "KKTC Serbest Bölge Şirket
   Kuruluşu ve Muhasebe Hizmetleri" (Ortac International Accounting,
   06.10.2026). Burak: "bilgisi doğrulanmış bir veri var elimde."
     · Şirket kuruluşu 4.900 € (başvuru dosyası, koordinasyon, Bakanlar
       Kurulu onayının takibi, tescil)
     · Serbest Bölge yıllık faaliyet harcı 2.700 €
     · Kayıtlı adres ve yasal temsilcilik 2.000 € + %16 KDV (yıllık);
       müşteri kendi adresini beyan ederse alınmıyor (madde 5)
     · Muhasebe kuruluş bedeline DAHİL DEĞİL (madde 6): aktif şirket
       270 € / ay (banka hesabının açıldığı aydan itibaren), pasif şirket
       900 € / yıl
     · Süre: belgeler tamamlandıktan sonra yaklaşık 30-40 iş günü
   lib/pricing.ts'e dokunulmadı (kural); KKTC ülke sayfası artık oradaki
   temsilî üç paketi değil bu rakamları basıyor. Para birimi EURO. */

export const euro = (n: number) => `€${n.toLocaleString("tr-TR")}`;

export const KKTC_KURULUS = 4900;
export const KKTC_HARC = 2700;
export const KKTC_ADRES = 2000;
export const KKTC_ADRES_KDV = 0.16;
export const KKTC_MUH_AKTIF = 270;
export const KKTC_MUH_PASIF = 900;

/* 07.10.2026 (2) · HEPSİ ZORUNLU. İlk hâlde adres hizmeti aç/kapa bir
   seçenekti (belgenin 5. maddesindeki "kendi adresini beyan etme" cümlesine
   dayanarak). Burak (Murat Bey'den): "Kıbrıs'ta zorunluymuş hepsi …
   fiyat direkt 9.920; 'den başlayan' diye bir şey koymamız mümkün değil."
   Seçilebilen tek şey kuruluştan sonraki muhasebe türü. */
export type KktcSecim = { muhasebe: "aktif" | "pasif" };
export const KKTC_VARSAYILAN: KktcSecim = { muhasebe: "aktif" };

export const KKTC_KALEMLER: { ad: string; alt: string; tutar: number; baz?: boolean }[] = [
  { ad: "Şirket kuruluşu", alt: "Başvuru dosyası, onay takibi ve tescil", tutar: KKTC_KURULUS, baz: true },
  { ad: "Serbest Bölge faaliyet harcı", alt: "Yıllık faaliyet izni", tutar: KKTC_HARC },
  { ad: "Kayıtlı adres ve yasal temsilcilik", alt: "Yıllık hizmet", tutar: KKTC_ADRES },
  { ad: "KDV · %16", alt: "Adres ve temsilcilik hizmeti üzerinden", tutar: Math.round(KKTC_ADRES * KKTC_ADRES_KDV) },
];
export function kktcSatirlar(): { ad: string; tutar: number; baz?: boolean }[] {
  return KKTC_KALEMLER.map(({ ad, tutar, baz }) => ({ ad, tutar, baz }));
}
/** kuruluş ve ilk yıl, her şey dahil: 9.920 € (belgedeki toplam) */
export const KKTC_TOPLAM = KKTC_KALEMLER.reduce((a, k) => a + k.tutar, 0);
export const kktcToplam = () => KKTC_TOPLAM;
