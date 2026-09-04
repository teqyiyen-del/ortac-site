import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmartLink from "@/components/shared/SmartLink";

/* ============================================================================
   404 · ARADIĞINIZ SAYFA BULUNAMADI
   CSS: app/css/hata.css · .hta-

   NEDEN BU DOSYA BUGÜNE KADAR YOKTU VE NEDEN ARTIK VAR
   Depoda `app/[...yapim]` diye bir yakalayıcı rota vardı: sayfası olmayan her
   üst düzey adres oraya düşüyor, ekrana "Yapım aşamasında · bu sayfa sıradaki
   fazda inşa edilecek" yazıp ham adresi basıyordu. İki sorun:

     1. HTTP 200 dönüyordu. Ölçüldü: /boyle-bir-sayfa-yok → 200, /xyz/abc → 200.
        Arama motoru için bu "yumuşak 404": ölü adresler geçerli sayfa sayılıp
        indekslenebiliyordu ve `noindex` de yoktu (ölçüldü: 0 eşleşme).
     2. Ekrandaki metin bir geliştirici notuydu. Site metin turunda tam da bu
        tür çıktılardan temizlenmişti; ziyaretçinin en olası hata anında
        gördüğü ekran bunun dışında kalmıştı.

   Yakalayıcı SİLİNDİ. Silmeden önce doğrulandı: routes.ts'in yayında saydığı
   on yedi adresin HEPSİNİN gerçek bir sayfası var, yani hiçbir bağlantı
   yakalayıcıya dayanmıyordu. İç içe dinamik rotalar (/dubai/[hizmet],
   /blog/[slug], /araclar/[arac]) zaten doğru biçimde 404 dönüyordu; onlar da
   artık bu ekranı görüyor.

   ZEMİN SIFIRDAN YAZILMADI. Sitenin kendi hero zemini kullanılıyor: `.ph`
   (gece yüzey), `.phg` (maske ve glow değişkenleri), `.phg-bg` +
   `data-zemin="yildiz"` (gökyüzü) ve `.phy-*` (yıldızlar). Gerekçe:
   404'ün işi ziyaretçiye "hâlâ aynı sitedesin" demek; yeni bir zemin dili
   tam tersini söylerdi.

   FOOTER BİLİNÇLİ OLARAK BURADA. Site dizini footer'ın kendisi (Ft2Directory,
   otuza yakın girdi) — yani 404'ün "nereye gidebilirim" sorusunun cevabı
   zaten yazılı ve güncel. Ayrı bir "popüler sayfalar" listesi yazmak aynı
   dizinin ikinci ve eskiyecek bir kopyası olurdu.

   ADRESİ EKRANA BASMIYORUZ. Eski yakalayıcı basıyordu. Kullanıcıya bilgi
   vermiyor ("zaten adres çubuğunda yazıyor") ve yansıtılan metin sayfaya
   girdi taşımanın en bilinen yoludur; bu ekran her adreste render edildiği
   için o kapıyı hiç açmıyoruz. `.hta-adres` sınıfı error.tsx'in kullandığı
   teknik künye için duruyor, burada çağrılmıyor.
   ========================================================================= */

/* `robots: noindex` ŞART DEĞİL AMA DOĞRU. Next bu sayfayı zaten 404 durum
   koduyla sunuyor ve doğru davranan tarayıcı onu indekslemez; yine de bazı
   tarayıcılar 404 gövdesini örneklediği için niyet açıkça yazılıyor.
   `follow` açık: sayfadaki dizin bağlantılarının izlenmesini istiyoruz. */
export const metadata: Metadata = {
  title: "Sayfa bulunamadı — Ortac Global",
  description:
    "Aradığınız sayfa bulunamadı. Dubai, İngiltere ve KKTC'de şirket kuruluşu, muhasebe ve banka süreçleri için site dizinini kullanabilirsiniz.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section className="ph phg hta">
          <div className="phg-bg" data-zemin="yildiz" aria-hidden="true">
            <span className="phy-yildiz phy-yildiz-b" />
            <span className="phy-yildiz phy-yildiz-a" />
            <span className="phy-kayan phy-kayan-1" />
            <span className="phy-kayan phy-kayan-2" />
            <div className="phg-glow" />
          </div>

          <div className="container-o hta-in">
            <p className="hta-kod">Hata 404</p>
            <h1 className="ph-title">Aradığınız sayfa bulunamadı.</h1>
            <p className="ph-lead">
              Adres değişmiş, yazımında bir eksik olmuş ya da sayfa hiç var olmamış
              olabilir. Aşağıdaki dizinde sitenin tamamı duruyor; aradığınız konu
              üç ülkeden birine bağlıysa ülke sayfasından da girebilirsiniz.
            </p>

            <div className="hta-eylem">
              <SmartLink href="/" className="btn btn-primary">
                Ana sayfaya dön
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </SmartLink>
              <SmartLink href="/iletisim" className="btn btn-ghost">
                İletişime Geç
              </SmartLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
