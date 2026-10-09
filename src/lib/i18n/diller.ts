/* DİL ALTYAPISI · İLK ADIM (09.10.2026).
   Burak: "dil seçeneğini de yavaştan kurmaya başla, ortalığı dağıtmadan …
   Türkçe ile İngilizce sayfayı sağlam bağlaman gerekecek. Türkçe tarafta bir
   değişiklik yapınca onu öteki tarafta da güncelleyeceğiz, bunu unutma.
   Locale'e göre tasarımda, yazılarda değişiklikler illaki olacaktır."

   BU TURDA YALNIZ İSKELET VAR, YAYINDA HİÇBİR ŞEY DEĞİŞMEDİ:
     · diller.ts       dil listesi ve varsayılan
     · adresler.ts     Türkçe adres ↔ İngilizce adres eşlemesi (yeni İngilizce
                       adresler; Türkçe adresin çevirisi değil, kendi adı)
     · src/lib/en/     İngilizce metin dosyaları buraya gelecek; her dosya
                       Türkçe kaynağının ÖZETİNİ (sha1) başında taşıyor
     · scripts/ceviri-durum.mjs   Türkçe kaynak değişince hangi İngilizce
                       dosyanın eskidiğini söylüyor
   /en/... adresleri hâlâ Türkçe karşılığına geçici yönleniyor
   (next.config.ts); ilk İngilizce sayfa yayına girerken o kural daralacak.
   Yol haritası: docs/dil-altyapisi.md */

export const DILLER = ["tr", "en"] as const;
export type Dil = (typeof DILLER)[number];
export const VARSAYILAN_DIL: Dil = "tr";

/** hreflang ve <html lang> değeri */
export const DIL_ETIKET: Record<Dil, string> = { tr: "tr", en: "en" };
/** dil seçicide görünen ad (kendi dilinde) */
export const DIL_AD: Record<Dil, string> = { tr: "Türkçe", en: "English" };

/** adres İngilizce ağaca mı ait */
export const dilOku = (yol: string): Dil => (yol === "/en" || yol.startsWith("/en/") ? "en" : "tr");
