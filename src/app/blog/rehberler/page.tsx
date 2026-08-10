import { permanentRedirect } from "next/navigation";
import { GUIDES_HREF } from "@/lib/blog";

/* ============================================================================
   /blog/rehberler — KALICI YÖNLENDİRME  →  /blog/kategori/ulke-rehberi
   ============================================================================

   NEDEN SAYFA DEĞİL YÖNLENDİRME
   Ülke rehberi bu turda blogun bir KATEGORİSİ oldu (gerekçe: lib/blog.ts dosya
   başı). Karar üç turda gidip geldi ve son adım şuydu: rehber zaten bir yazı
   türüydü ama HÂLÂ kendi rotası vardı, yani ekranda kategori gibi anlatılırken
   adres şemasında bölüm gibi duruyordu. Müşterinin kafasını karıştıran fark
   buydu. Beş kategori tek kalıba girince (/blog/kategori/<kategori>) bu adresin
   listeleyeceği ayrı bir şey kalmadı.

   AMA ADRES SİLİNEMEZ — üç sebep, üçü de bu depoda somut:

     · Sitede hâlâ buraya bağlanan yerler var (navbar Kaynaklar paneli, footer
       dizini). Onlar başka ajanların dosyaları; buradaki yönlendirme sayesinde
       hiçbiri ölü bağlantıya dönüşmüyor ve adres lib/routes.ts'te AÇIK kaldığı
       için sönük de çıkmıyorlar.
     · Adres yayındaydı, dışarıda paylaşılmış ve indekslenmiş olabilir; kalıcı
       yönlendirme eski adrese biriken değeri yeni adrese taşıyan tek doğru
       cevap.
     · EN ÖNEMLİSİ: bu depoda sayfası olmayan her adres app/[...yapim]
       yakalayıcısına düşüyor ve "yapım aşamasında" kartını HTTP 200 ile
       basıyor. Yani dosyayı silmek bağlantıları ölü ama durum kodunu temiz
       bırakırdı — bu deponun ölü bağlantıları tam bu yüzden aylarca fark
       edilmemişti.

   AYNI KALIP BİR TUR ÖNCE /rehberler İÇİN KURULMUŞTU ve o dosya duruyor. İki
   yönlendirme ZİNCİR OLUŞTURMUYOR: ikisi de GUIDES_HREF'i okuyor, yani
   /rehberler doğrudan kanonik adrese gidiyor, buraya uğramıyor.

   redirect() DEĞİL permanentRedirect(): birincisi 307 (geçici) döner ve arama
   motoruna "eski adres geri gelebilir" der. Taşınma kalıcı, dolayısıyla 308.

   Adres elle yazılmıyor (GUIDES_HREF): kategori slug'ı bir gün değişirse
   buradaki yönlendirme kendiliğinden doğru kalıyor.
   ========================================================================= */

export default function BlogGuidesRedirectPage() {
  permanentRedirect(GUIDES_HREF);
}
