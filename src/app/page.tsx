import Nav from "@/components/Nav";
import HeroAkis from "@/components/home/HeroAkis";
import ThreeCountries from "@/components/home/ThreeCountries";
import Chain from "@/components/home/Chain";
import HomeServices from "@/components/home/HomeServices";
import ProcessScroll from "@/components/ProcessScroll";
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
        {/* 03.10.2026 · GİRİŞ DEĞİŞTİ: eski <Hero /> ("Şirketinizi kuruyor,
            süreçlerinizi yönetiyoruz" + Kurulumu Başlat + ülke bayrakları)
            yerine lab'da seçilen E3 (home/HeroAkis.tsx; gerekçe orada).
            Ortak şeridi eski Hero'daki gibi girişin içinden basılıyor
            (yeri aynı, girişin hemen altı). Eski bileşen (components/Hero.tsx ·
            HeroPortal) duruyor: geri dönmek tek satır; karar kesinleşince
            temizlenecek. */}
        <HeroAkis />
        {/* ---------- KALDIRILDI · ProofBand ----------
             Hero'nun hemen altında dört maddelik bir güven şeridi vardı:
             "IFZA resmî iş ortağı · Üç ülkede kendi ofisimiz · Muhasebe
             lisansı · Süreç Türkçe yürütülür". Üstündeki ortak şeridi zaten
             aynı kurumları sayıyor, altındaki bölümler de aynı iddiaları
             kendi bağlamlarında tekrar ediyor; sayfanın ilk ekranında üst
             üste iki güven şeridi ziyaretçiye tek bir şey söylemiyordu.
             Bileşen duruyor (home/ProofBand.tsx), akıştan çıktı. */}
        {/* SIRA · 03.10.2026 · BURAK'IN TARİFİ. Önce (aynı gün) sıra sormadan
            değiştirilmiş ve geri alınmıştı ("o akışı bilinçli kurduk …
            önerin varsa söylesen yeterdi"; kural hafızada: akışa sormadan
            dokunma). Sonra öneri konuşuldu ve Burak sırayı kendisi verdi:
            "Hizmet verdiğimiz ülkeler kalır, uzmanlık alanlarımız kalır.
            Kuruluşta nasıl çalışıyoruz'u biraz daha aşağı alabiliriz, oraya
            Neden Ortac gelir, hizmet verdiğimiz sektörler gelir, bir
            şirketin bütün döngüsü gelir, sonra kuruluşta nasıl çalışıyoruz.
            Sonra fiyatlar, blog, kapanış."
            Neden Ortac girişin hemen altına ALINMADI: "orası oraya göre
            tasarlanmamış."

            FİYAT BÖLÜMÜ KALKTI · 06.10.2026. Burak: "ana sayfadan fiyatları
            kaldıracağız." Ana sayfa fiyat konuşmuyor; fiyat ülke
            sayfalarında. Bileşen (home/PriceSummary.tsx) duruyor, akıştan
            çıktı. */}
        <ThreeCountries />
        <HomeServices />
        <TrustLayer />
        <Profiles />
        <Chain />
        <ProcessScroll />
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
