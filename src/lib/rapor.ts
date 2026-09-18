import { SITE } from "@/lib/routes";

/* ============================================================================
   ORTAC MARKALI ARAÇ ÇIKTISI — RAPOR MODELİ
   Bileşen: components/rapor/RaporBelge.tsx · CSS: css/rapor.css

   18.09.2026 · Burak: "insanlara ortac brandingli bir şeyler vermek lazım o
   yüzden araçlarımızın mümkün olanlarına export alabilecekleri bir şey koymak
   lazım, rapordur vb."

   TEK ŞABLON, ÇOK ARAÇ. Her araç için ayrı bir PDF tasarlanmıyor: burada bir
   rapor MODELİ var (başlık · künye · bloklar · dipnot), bileşen onu A4
   sayfasına diziyor, her araç kendi verisini bu modele çeviriyor. İlk araç
   pahalı, sonrakiler neredeyse bedava; marka tutarlılığı da kendiliğinden
   geliyor çünkü tek yerde tanımlı.

   SUNUCU YOK. Belge tarayıcıda basılıyor (window.print → "PDF olarak kaydet").
   Aynı yol satış akışı demosunda çalıştı ve ölçüldü: tek sayfa A4, MediaBox
   595×842. Sunucu tarafı PDF üretimi (e-postayla göndermek, kayıt tutmak)
   ayrı bir iş ve satış akışının açık maddelerinden biri.

   HER ÇIKTIDA ÜÇ ŞEY ZORUNLU ve modelde alan olarak duruyor:
     1) TARİH — "Bu belge {tarih} itibarıyla hazırlanmıştır." Ortac logolu bir
        belge iki yıl sonra eski oranlarla dolaşabilir; tarihsiz çıktı yok.
     2) CANLI ADRES — belgenin üretildiği aracın adresi, tam hâliyle. QR kod
        HENÜZ YOK: kütüphane girmesi gereken bir iş, adres şimdilik metin.
     3) ŞERH — "ön değerlendirmedir, danışmanlık değildir." Bir kez, en altta.
   Üçü de bileşenin altbilgisinde, veriye bırakılmadı: araç unutamasın.
   ========================================================================= */

export type RaporBlok =
  /** etiket → değer satırları (girdiler, künye) */
  | { tip: "kunye"; baslik?: string; satirlar: { k: string; v: string }[] }
  /** tek büyük sayı ya da hüküm */
  | { tip: "sonuc"; baslik: string; deger: string; alt?: string }
  /** sıralı ya da sırasız kalem listesi; `d` varsa ikinci satır */
  | { tip: "liste"; baslik: string; maddeler: { t: string; d?: string }[] }
  /** başlıklı tablo; sütun sayısı satırlarla aynı olmalı */
  | { tip: "tablo"; baslik: string; basliklar: string[]; satirlar: string[][] }
  /** serbest paragraf (şerh, gerekçe) */
  | { tip: "not"; metin: string };

export type Rapor = {
  /** üst şeritteki küçük etiket: aracın adı */
  arac: string;
  /** belgenin başlığı */
  baslik: string;
  /** başlığın altındaki tek cümle (isteğe bağlı) */
  ozet?: string;
  bloklar: RaporBlok[];
  /** aracın adresi; altbilgide tam hâliyle yazılıyor */
  yol: string;
  /** verinin kaynağı (oran tablosu, resmî sicil…) — altbilgide bir satır */
  kaynak?: string;
};

/** Belgenin tarihi. Yerel tarih: belgeyi basan kişi kendi gününü görüyor. */
export function raporTarihi(d = new Date()): string {
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });
}

/** Altbilgideki tam adres. Yol "/uygunluk-testi" gibi verilir. */
export function raporAdresi(yol: string): string {
  return `${SITE}${yol}`.replace(/^https?:\/\//, "");
}

/** Her belgenin en altındaki tek şerh. Metin tek yerde, araç değiştiremiyor. */
export const RAPOR_SERH =
  "Bu belge bir ön değerlendirmedir, mali veya hukuki danışmanlık değildir. Kesin sonuç faaliyetinize, mukimliğinize ve gelir türünüze göre değişir.";
