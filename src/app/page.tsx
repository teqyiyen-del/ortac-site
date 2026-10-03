import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ThreeCountries from "@/components/home/ThreeCountries";
import Chain from "@/components/home/Chain";
import HomeServices from "@/components/home/HomeServices";
import Profiles from "@/components/home/Profiles";
import TrustLayer from "@/components/TrustLayer";
import HomeBlog from "@/components/home/HomeBlog";
import HomeFaq from "@/components/home/HomeFaq";
import Footer from "@/components/Footer";

/* Brief §7 — the home page is a shop window, not the sale. Every block does one
   job and has one exit; a block that finishes a topic belongs on a country page.

   Kaldırılanlar ve nedenleri:
   - PaymentInfra: ülke kararı bölümüyle aynı konuyu ikinci kez anlatıyordu.
     Değerli olan tek şey, hangi tahsilat kanalının hangi ülkede çalıştığıydı;
     o gerçek ThreeCountries içine taşındı.
   - Stance: caydırıcı bir hava veriyordu. Duruş cümlesi ülke sayfalarındaki
     vergi çerçevesi bloğunda yaşamaya devam ediyor.
   - ToolsResources: ana sayfada "alın araçları kullanın" demenin yeri yok.
     Araçlar ve kaynaklar footer dizininde ve kendi sayfalarında duruyor;
     buraya yalnızca blog kaldı.
   - PartnerBand: iş ortaklığı çağrısı footer dizinine indi. */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/* ---------- KALDIRILDI · ProofBand ----------
             Hero'nun hemen altında dört maddelik bir güven şeridi vardı:
             "IFZA resmî iş ortağı · Üç ülkede kendi ofisimiz · Muhasebe
             lisansı · Süreç Türkçe yürütülür". Üstündeki ortak şeridi zaten
             aynı kurumları sayıyor, altındaki bölümler de aynı iddiaları
             kendi bağlamlarında tekrar ediyor; sayfanın ilk ekranında üst
             üste iki güven şeridi ziyaretçiye tek bir şey söylemiyordu.
             Bileşen duruyor (home/ProofBand.tsx), akıştan çıktı. */}
        {/* 03.10.2026 · ANA SAYFA OTORİTE KURUYOR, SATIŞ YAPMIYOR.
            Burak (Murat Bey'in yönüyle): "ana sayfa tamamen Ortac'ın
            vizyonunu göstermeye çalışacak … otoriteyi, 30 yıllık firma
            oluşunu, verdiği hizmetleri, çalıştığı sektörleri dolu dolu
            gösteren, satış yapmaya çalışmayan bir ana sayfa … diğer
            sayfalar yine kendi işini yapacak."

            SIRA DEĞİŞTİ: önce kim olduğumuz (TrustLayer · 30 yıl, lisans,
            kadro), sonra ne yaptığımız (uzmanlık alanları), kime (sektörler),
            nerede (ülkeler), yıl boyu ne yürüttüğümüz (Chain), ne
            yazdığımız (blog), sorular. Eski sıra ülke seçimiyle açılıyordu.

            İKİ BÖLÜM AKIŞTAN ÇIKTI (dosyaları duruyor, geri almak birer
            satır):
              · ProcessScroll · "Kuruluşta nasıl çalışıyoruz": kuruluş
                işleminin adımları; her ülke sayfasında kendi süreci var.
              · PriceSummary · "Rakamlar, ihtiyacınıza göre": fiyat
                hesaplayıcı, doğrudan satış aracı; fiyat ülke sayfalarında.
            Kapanış da değişti: "Şirketinizi bugün kuralım / Kurulumu
            Başlat" yerine görüşme daveti. */}
        <TrustLayer />
        <HomeServices />
        <Profiles />
        <ThreeCountries />
        <Chain />
        <HomeBlog />
        <HomeFaq />
      </main>
      <Footer
        kapanis={{
          title: "Uluslararası işinizi birlikte konuşalım.",
          accent: "birlikte konuşalım.",
          cta: { label: "Uzmanlık alanlarımız", href: "/#hizmetler" },
        }}
      />
    </>
  );
}
