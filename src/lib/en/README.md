# İngilizce metin dosyaları

Her dosya bir Türkçe kaynak dosyanın İngilizce karşılığıdır ve aynı tipi dışa aktarır
(örnek: `src/lib/vergiDubai.ts` → `src/lib/en/vergiDubai.ts`, ikisi de `VergiVeri`).
Bileşen değişmez; sayfa hangi dilin verisini vereceğini seçer.

Dosyanın İLK satırı kaynağını ve o günkü özetini taşır:

    /* kaynak: src/lib/vergiDubai.ts · ozet: 3f2a9c1b */

Türkçe dosya değişince özet tutmaz ve `node scripts/ceviri-durum.mjs` o İngilizce
dosyayı "eskidi" diye listeler. İngilizce metni güncelledikten sonra:

    node scripts/ceviri-durum.mjs --isaretle src/lib/en/vergiDubai.ts

İngilizce metin birebir çeviri olmak zorunda değil (İngilizce okuyana "Türkçe süreç"
anlatılmaz, para birimi ve örnekler değişebilir); ama Türkçe taraftaki her OLGU
değişikliği (fiyat, süre, kural) burada da yapılır.
