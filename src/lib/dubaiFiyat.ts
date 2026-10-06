/* DUBAİ FİYAT VERİSİ · baz fiyat + ekler (06.10.2026).
   Panel (components/country/DubaiFiyat.tsx) ile anlatım bölümleri
   (country/DubaiEkler.tsx) aynı rakamı buradan okuyor. lib/pricing.ts'e
   DOKUNULMADI; o dosya öteki iki ülkenin panelini besliyor.

   RAKAMLARIN KAYNAĞI
     · IFZA baz 5.120, vize 1.953, VIP 800: müşterinin teklif aracı (ekran
       görüntüsü) ve aynı günkü teklif PDF'i.
     · Meydan 5.300, DWTC 5.820: TÜRETİLDİ, belgede açık yazmıyor. PDF'teki
       paket toplamlarının vergi satırından geri hesaplandı (vergi %5:
       402,65 → 8.053 · 428,65 → 8.573; IFZA'da aynı hesap 7.873 = 5.120 +
       1.953 + 800 tutuyor, yani paket = baz + 1 vize + VIP). Müşteri
       doğrulayınca kesinleşir.
     · Muhasebe: PDF madde 9.3 standart 350 USD / ay (ayda 500 işleme kadar).
       Yıllık alınırsa 10 ay fiyatına (Burak'ın tarifi) = 3.500. Burak
       toplantıda "aylık 200 gibi" demişti; belge 350 diyor, belge esas alındı.
     · SWAP · ek lisans yılı (yilEk) ELİMİZDE YOK, yer tutucu.
   Tutarlar KDV hariç (belgede "+ KDV", BAE'de %5). */

export const money = (n: number) => `$${n.toLocaleString("tr-TR")}`;

export type Bolge = "ifza" | "meydan" | "dwtc";
export const BOLGE: Record<Bolge, { ad: string; baz: number; yilEk: number }> = {
  ifza: { ad: "IFZA", baz: 5120, yilEk: 4200 },
  meydan: { ad: "Meydan", baz: 5300, yilEk: 4400 },
  dwtc: { ad: "DWTC", baz: 5820, yilEk: 4800 },
};
export const BOLGELER: Bolge[] = ["ifza", "meydan", "dwtc"];
export const VIZE = 1953;
export const VIP = 800;
export const MUH_AYLIK = 350;
export const MUH_YILLIK = MUH_AYLIK * 10;
/** sitede yazılacak "…'den başlayan" rakam: en düşük baz */
export const DUBAI_BASLANGIC = Math.min(...BOLGELER.map((b) => BOLGE[b].baz));
