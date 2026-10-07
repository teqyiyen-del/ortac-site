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

export type KktcSecim = { adres: boolean; muhasebe: "aktif" | "pasif" };
export const KKTC_VARSAYILAN: KktcSecim = { adres: true, muhasebe: "aktif" };

export function kktcSatirlar(x: KktcSecim): { ad: string; tutar: number; baz?: boolean }[] {
  return [
    { ad: "Şirket kuruluşu", tutar: KKTC_KURULUS, baz: true },
    { ad: "Serbest Bölge faaliyet harcı · 1 yıl", tutar: KKTC_HARC },
    ...(x.adres
      ? [
          { ad: "Kayıtlı adres ve yasal temsilcilik · 1 yıl", tutar: KKTC_ADRES },
          { ad: "KDV · %16 (adres hizmeti)", tutar: Math.round(KKTC_ADRES * KKTC_ADRES_KDV) },
        ]
      : []),
  ];
}
export const kktcToplam = (x: KktcSecim) => kktcSatirlar(x).reduce((a, s) => a + s.tutar, 0);
