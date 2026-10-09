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
     · ÇOK YILLI LİSANS (Murat Bey, teyit cevabı, 09.10.2026): yer tutucu
       `yilEk` rakamı kalktı. İndirim YALNIZ lisans bedelinde ve peşin
       alınan bütün yıllara uygulanıyor:
         IFZA    2 yıl %15 · 3 yıl %20 · 5 yıl %30
         Meydan  2 ve 3 yıl %15
         DWTC    çok yıllı yok, yalnız yıllık yenilenir
       Hesap: N yıl = N × baz × (1 − indirim). Baz fiyatın tamamı lisans
       bedeli sayıldı (teklif kalemi "Company Formation 1 year" tek satır);
       baz içinde indirime girmeyen bir kuruluş payı varsa Murat Bey
       söyleyince `lisansPayi` gibi ayrı bir alan açılır.
     · IFZA 7.800 $ VERGİ DAHİL (aynı cevap + teklif aracı ekran görüntüsü):
       5.120 + 1.953 + 800 = 7.873; %5 vergi 393,65; her teklifte 466,65 $
       "size özel" indirim satırı var → 7.800. Sitedeki rakamlar bu yüzden
       kalem kalem KDV hariç duruyor, toplam teklifte yuvarlanıyor.
   Tutarlar KDV hariç (belgede "+ KDV", BAE'de %5). */

export const money = (n: number) => `$${n.toLocaleString("tr-TR")}`;

export type Bolge = "ifza" | "meydan" | "dwtc";
/* `kisa`: fiyat formundaki "i" düğmesinin açtığı tek cümle (teklif PDF'inin
   "Packages" ve "Hangi Dubai Free Zone?" bölümlerinden). */
export const BOLGE: Record<Bolge, { ad: string; baz: number; indirim: Record<number, number>; kisa: string }> = {
  ifza: { ad: "IFZA", baz: 5120, indirim: { 2: 0.15, 3: 0.2, 5: 0.3 }, kisa: "En çok tercih edilen. Esnek faaliyet ve lisans yapısı, Dubai Silicon Oasis'te." },
  meydan: { ad: "Meydan", baz: 5300, indirim: { 2: 0.15, 3: 0.15 }, kisa: "Dijital ve hızlı kuruluş. Fiziksel ofis ihtiyacı sınırlı şirketler için." },
  dwtc: { ad: "DWTC", baz: 5820, indirim: {}, kisa: "Dubai'nin merkezinde. Kurumsal yapı ve premium çalışma alanı." },
};
export const BOLGELER: Bolge[] = ["ifza", "meydan", "dwtc"];
/** o bölgede seçilebilen lisans süreleri (1 her zaman var) */
export const bolgeYillar = (b: Bolge): number[] => [1, ...Object.keys(BOLGE[b].indirim).map(Number)].sort((x, y) => x - y);
/** bölge değişince seçili süre o bölgede yoksa 1 yıla döner */
export const yilUydur = (b: Bolge, yil: number): number => (bolgeYillar(b).includes(yil) ? yil : 1);
/** 1 yılın üstündeki lisans yıllarının indirimli toplamı (baz satırının üstüne eklenen tutar) */
export const ekYilTutar = (b: Bolge, yil: number): number => {
  const d = BOLGE[b].indirim[yil];
  return d === undefined ? 0 : Math.round(yil * BOLGE[b].baz * (1 - d)) - BOLGE[b].baz;
};
export const VIZE = 1953;
export const VIP = 800;
export const MUH_AYLIK = 350;
export const MUH_YILLIK = MUH_AYLIK * 10;
/** sitede yazılacak "…'den başlayan" rakam: en düşük baz */
export const DUBAI_BASLANGIC = Math.min(...BOLGELER.map((b) => BOLGE[b].baz));

/* ------------------------------------------------------------- SEÇİM
   Fiyat paneli (ülke sayfası) ile kurulum akışı (/basla) AYNI seçimi
   kullanıyor: panelde yapılan seçim adresle akışa taşınıyor, akış ikinci
   adımdan seçili açılıyor (Burak, 06.10.2026: "fiyatlar kısmından seçip
   başlatıyorsa direkt seçili gelmesini istiyorum"). */
export type DubaiSecim = { bolge: Bolge; yil: number; vize: number; vip: boolean; yillik: boolean };
export const DUBAI_VARSAYILAN: DubaiSecim = { bolge: "ifza", yil: 1, vize: 0, vip: false, yillik: false };

export type DubaiSatir = { ad: string; tutar: number; baz?: boolean };
export function dubaiSatirlar(x0: DubaiSecim): DubaiSatir[] {
  const x = { ...x0, yil: yilUydur(x0.bolge, x0.yil) };
  const b = BOLGE[x.bolge];
  return [
    { ad: `${b.ad} kuruluş · 1 yıllık lisans`, tutar: b.baz, baz: true },
    /* 07.10.2026 · Murat Bey: "Lisans 1 ek yıl kelimesini sevmedim." Satır
       artık hangi yılın lisansı olduğunu söylüyor. */
    ...(x.yil > 1
      ? [
          {
            ad: `${x.yil === 2 ? "2. yıl lisansı" : `2-${x.yil}. yıl lisansı`} · %${Math.round(b.indirim[x.yil] * 100)} indirimli`,
            tutar: ekYilTutar(x.bolge, x.yil),
          },
        ]
      : []),
    ...(x.vize > 0 ? [{ ad: `Vize · ${x.vize} kişi`, tutar: x.vize * VIZE }] : []),
    ...(x.vip ? [{ ad: "VIP vize hizmeti", tutar: VIP }] : []),
    ...(x.yillik ? [{ ad: "Muhasebe · yıllık (10 ay fiyatına)", tutar: MUH_YILLIK }] : []),
  ];
}
export const dubaiToplam = (x: DubaiSecim) => dubaiSatirlar(x).reduce((a, s) => a + s.tutar, 0);

/** panelden akışa: /basla?ulke=dubai&bolge=ifza&yil=1&vize=2&vip=1&yillik=1 */
export function dubaiBaslaHref(x: DubaiSecim): string {
  const q = new URLSearchParams({ ulke: "dubai", bolge: x.bolge, yil: String(x.yil), vize: String(x.vize) });
  if (x.vip) q.set("vip", "1");
  if (x.yillik) q.set("yillik", "1");
  return `/basla?${q.toString()}`;
}
/** adresten seçim; ülke Dubai değilse ya da değerler bozuksa null/varsayılan */
export function dubaiSecimOku(q: Record<string, string | string[] | undefined>): DubaiSecim | null {
  if (q.ulke !== "dubai") return null;
  const sayi = (v: unknown, en: number, cok: number, yoksa: number) => {
    const n = typeof v === "string" ? Number.parseInt(v, 10) : Number.NaN;
    return Number.isFinite(n) ? Math.min(cok, Math.max(en, n)) : yoksa;
  };
  const bolge = BOLGELER.find((b) => b === q.bolge) ?? DUBAI_VARSAYILAN.bolge;
  return { bolge, yil: yilUydur(bolge, sayi(q.yil, 1, 5, 1)), vize: sayi(q.vize, 0, 10, 0), vip: q.vip === "1", yillik: q.yillik === "1" };
}
