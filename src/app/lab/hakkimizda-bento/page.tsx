import type { Metadata } from "next";
import FinalCta from "@/components/FinalCta";
import AboutBentoSayfa from "@/components/lab/AboutBentoSayfa";

/* /lab/hakkimizda-bento — hakkımızda sayfasının TAMAMI tek bir bento tahtası.
 *
 * Müşteri: "bide burayı komple bentogrid mi yapsak anasayfadaki en aşağıdaki
 * bento gibi."
 *
 * Rota noindex/nofollow. Canlı /hakkimizda'ya HİÇ dokunulmadı; bu sayfa onun
 * yerine geçmiyor, yanında duruyor. Kararın gerekçesi, ölçüm tablosu ve hangi
 * bölümün neden hangi boyda karo aldığı bileşenin başındaki blokta —
 * ekrana dökülmüyor (docs/tuzaklar.md · "Lab sayfaları ekrana METİN DÖKMEZ").
 */

export const metadata: Metadata = {
  title: "Hakkımızda · komple bento | Ortac Global",
  robots: { index: false, follow: false },
};

export default function HakkimizdaBentoLab() {
  return (
    <>
      {/* Künye tek satır. İkinci cümle bir uyarı, tavsiye değil: turun cevabı
          buna bağlı ve ekranda görülmeden anlaşılmıyor. */}
      <div className="hbn-lab">
        <span>Aday · komple bento</span>
        <h2>Hakkımızda tek tahta</h2>
        <p>
          Dokuz bölüm on karoya indi. Vizyon, misyon ve iletişim tahtaya girmiyor, tahtanın altında
          duruyor; giriş metninin ikinci paragrafı ile üç ilkeden biri hiç basılmıyor çünkü
          söyledikleri şey yan karoda zaten var.
        </p>
      </div>

      {/* Sarmalayıcı DÜZ bir <div>: transform, filter, contain ya da
          will-change yazılmıyor — biri yazılsaydı içerideki position:fixed
          ögeler (site şeridi, kapanış çağrısı) o kaba hapsolurdu. */}
      <main>
        <AboutBentoSayfa />
        {/* FinalCta BURADA, aday bileşenin içinde DEĞİL. Sebep: kapanış çağrısı
            sayfaya değil siteye ait ve canlı /hakkimizda da onu <main>'in son
            ögesi olarak basıyor. Aday burada duruyorsa müşteri sayfayı gerçek
            uzunluğunda görüyor; aday bileşenin içinde dursaydı, kazanan canlıya
            taşınırken ikinci bir kapanış çağrısı sızardı.

            SİTE ŞERİDİ (Nav) BİLEREK BASILMIYOR: /lab düzeni kendi yapışkan
            şeridini zaten en üstte tutuyor, ikisi üst üste gelirdi. */}
        <FinalCta />
      </main>
    </>
  );
}
