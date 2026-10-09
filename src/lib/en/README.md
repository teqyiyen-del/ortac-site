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

## İki tür dosya (10.10.2026 · ana sayfanın İngilizce denemesi)

1. **Veri dosyası** (yukarıdaki kalıp): Türkçe veri modülüyle aynı tipi dışa aktarır.
   Henüz örneği yok; ülke ve hizmet sayfaları İngilizceye geçerken gelecek.
2. **Sözlük**: metni kendi içinde taşıyan bir bileşenin (ya da kısa yazılar veren bir
   veri modülünün) İngilizcesi. Anahtar Türkçe cümlenin kendisi, değer İngilizcesi
   (`lib/i18n/cevir.ts`). Bileşen basarken `c("Türkçe cümle")` der; Türkçe sayfada
   cümle aynen çıkar, İngilizce sayfada sözlükten okunur. Türkçe cümle değişirse anahtar
   tutmaz, İngilizce sayfada o cümle Türkçe görünür ve `ceviri-durum` dosyayı "eskidi"
   diye listeler. Kaynak satırı bileşen dosyasını da gösterebilir
   (`/* kaynak: src/components/home/HeroAkis.tsx · ozet: … */`).

Sözlüğe yazarken: çizimlerin içindeki yazılar ve kart cümleleri dar kutularda duruyor,
İngilizcesi Türkçesinden belirgin uzun olmamalı (taşar ya da iki satıra iner).
Sayfa düzeyindeki farklar (çıkan bölüm, sadeleşen bölüm) `anaSayfa.ts` başında yazılı.
