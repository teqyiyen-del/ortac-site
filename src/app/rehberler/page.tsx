import { permanentRedirect } from "next/navigation";
import { GUIDES_HREF } from "@/lib/blog";

/* ============================================================================
   /rehberler — KALICI YÖNLENDİRME  →  /blog/rehberler
   ============================================================================

   NEDEN SAYFA DEĞİL YÖNLENDİRME
   Ülke rehberleri bu turda blog'un bir TÜRÜ oldu (gerekçe: lib/blog.ts ve
   app/blog/page.tsx dosya başları). Bölüm birleşince bu adresin listeleyeceği
   bir şey kalmadı — ama adres SİLİNEMEZ:

     · Sitede hâlâ buraya bağlanan yerler var (navbar Kaynaklar paneli,
       footer dizini, /e-kitaplar ve /kaynaklar sayfaları). Onlar kendi
       ajanlarının dosyaları; buradaki yönlendirme sayesinde hiçbiri ölü
       bağlantıya dönüşmüyor.
     · Adres dışarıda paylaşılmış olabilir ve arama motoru indekslemiş
       olabilir; kalıcı yönlendirme eski adrese biriken değeri yeni adrese
       taşıyan tek doğru cevap.
     · EN ÖNEMLİSİ: bu depoda sayfası olmayan her adres app/[...yapim]
       yakalayıcısına düşüyor ve "yapım aşamasında" kartını HTTP 200 ile
       basıyor. Yani dosyayı silmek bağlantıları ölü ama durum kodunu temiz
       bırakırdı — bu deponun ölü bağlantıları tam bu yüzden aylarca fark
       edilmemişti.

   redirect() DEĞİL permanentRedirect(): birincisi 307 (geçici) döner ve arama
   motoruna "eski adres geri gelebilir" der. Taşınma kalıcı, dolayısıyla 308.

   Adres elle yazılmıyor (GUIDES_HREF): rehber filtresinin adresi bir gün
   değişirse buradaki yönlendirme kendiliğinden doğru kalıyor.
   ========================================================================= */

export default function RehberlerRedirectPage() {
  permanentRedirect(GUIDES_HREF);
}
