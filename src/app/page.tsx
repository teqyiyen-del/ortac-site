import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ThreeCountries from "@/components/home/ThreeCountries";
import Chain from "@/components/home/Chain";
import HomeServices from "@/components/home/HomeServices";
import ProcessScroll from "@/components/ProcessScroll";
import Profiles from "@/components/home/Profiles";
import TrustLayer from "@/components/TrustLayer";
import PriceSummary from "@/components/home/PriceSummary";
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
             "IFZA resmî iş ortağı · Dubai'de kendi ofisimiz · Muhasebe
             lisansı · Süreç Türkçe yürütülür". Üstündeki ortak şeridi zaten
             aynı kurumları sayıyor, altındaki bölümler de aynı iddiaları
             kendi bağlamlarında tekrar ediyor; sayfanın ilk ekranında üst
             üste iki güven şeridi ziyaretçiye tek bir şey söylemiyordu.
             Bileşen duruyor (home/ProofBand.tsx), akıştan çıktı. */}
        <ThreeCountries />
        <HomeServices />
        <ProcessScroll />
        <Profiles />
        <Chain />
        <TrustLayer />
        <PriceSummary />
        <HomeBlog />
        <HomeFaq />
      </main>
      <Footer />
    </>
  );
}
