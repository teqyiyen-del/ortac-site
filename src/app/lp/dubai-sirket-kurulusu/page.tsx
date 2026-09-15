import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Logo from "@/components/shared/Logo";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import CountryFaq from "@/components/CountryFaq";
import CountryPricing from "@/components/CountryPricing";
import CountryProcess from "@/components/CountryProcess";
import CountryOrtac from "@/components/country/CountryOrtac";
import LandingLeadForm from "@/components/LandingLeadForm";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* ============================================================================
   REKLAM İNİŞ SAYFASI · DUBAİ ŞİRKET KURULUŞU — /lp/dubai-sirket-kurulusu

   15.09.2026 · marketing listesi, madde 19: "Reklam için mevcut uzun sayfadan
   ayrı, daha kısa bir landing page de test edebiliriz. Hero > güven >
   hizmetler > fiyat > yorum > FAQ > form şeklinde daha hızlı ilerleyen bir
   yapı olabilir."

   İKİNCİ HÂL, AYNI GÜN. İlk hâli muhasebe sayfasından kurulmuştu
   (/lp/dubai-muhasebe, silindi). Burak: "reklam sayfası işini aslında direkt
   şirket kuruluş sayfası için denemeyi düşünüyorlar diye düşünüyordum."
   Listedeki "mevcut uzun sayfa" /dubai; iniş sayfası onun kısası.

   SIRA MARKETİNG'İN SIRASI, BİR ADIM EKSİK. Her bölüm /dubai'nin KENDİ
   bileşeni, aynı veriden; ikinci bir kopya yok, ülke sayfası değişince
   burası da değişiyor:
     hero      PageHero country="dubai" (ülke hero'sunun aynısı, iki düğme)
     güven     CountryOrtac · "Dubai'de işinizi kendi ofisimizden yürütüyoruz."
     hizmetler CountryProcess · kuruluşta ne yapıldığı, adım adım
     fiyat     CountryPricing · paket ve ek hizmet seçimi, tutar anında
     yorum     YOK · madde 10 (müşteri yorumları) Murat Ortaç'ın onayında
               açık ve uydurma yorum yazılamaz.
     SSS       CountryFaq · ülke sayfasının soruları
     form      LandingLeadForm · gönderim bağlı değil (SWAP:LEAD_FORM)
   /dubai'den ÇIKANLAR (kısa olsun diye): yapı seçimi, avantajlar, vergi
   çerçevesi, para yolları, evraklar, kuruluş sonrası, "kimin işine yarar",
   diğer ülkeler.

   SİTENİN KABUĞU YOK, BİLEREK. Menü ve site dizini basılmıyor: reklamdan
   gelen ziyaretçinin tek işi teklif istemek. Üstte yalnız logo ve forma inen
   düğme, altta tek satır künye.

   ARAMA MOTORUNA KAPALI (noindex, follow:false) ve site haritasında yok
   (lib/routes.ts dolaşım defterine girmedi). Aynı içerik /dubai'de
   indeksleniyor; iki sayfa arama sonucunda birbirine rakip olmasın.
   ========================================================================= */

export const metadata: Metadata = {
  title: "Dubai'de Şirket Kuruluşu · Teklif Alın | Ortac Global",
  description: COUNTRY_CONTENT.dubai.intro,
  robots: { index: false, follow: false },
};

const FORM_SECENEK = [
  { id: "hemen", etiket: "Hemen kurmak istiyorum" },
  { id: "uc-ay", etiket: "Önümüzdeki 3 ay içinde" },
  { id: "arastiriyorum", etiket: "Seçenekleri araştırıyorum" },
];

export default function DubaiKurulusLanding() {
  const c = COUNTRY_CONTENT.dubai;

  return (
    <>
      <header className="lp-bas">
        <div className="container-o lp-bas-in">
          <Link href="/" className="lp-logo" aria-label="Ortac Global ana sayfa">
            <Logo height={22} />
          </Link>
          <a href="#teklif" className="btn btn-primary lp-bas-cta">
            Teklif isteyin
            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main>
        <PageHero country="dubai" crumb="Dubai · Şirket kuruluşu" title="Dubai'de şirket kurmak." accent="şirket kurmak." lead={c.intro} />

        <CountryOrtac country="dubai" />

        <CountryProcess steps={c.steps} title="Dubai'de süreç, adım adım." />

        {/* Fiyat bandı /dubai'deki #fiyat bölümünün birebir aynısı (başlık,
            giriş, yapılandırıcı). Hero'daki "Fiyatları Gör" bu çapaya iniyor. */}
        <section id="fiyat" className="sec-pad sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text="Kurulumunuzu seçin, fiyat anında çıksın."
                accent="fiyat anında çıksın."
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">
                  Dubai için paket ve ek hizmetleri seçin; tutar sağda satır satır oluşur.
                </p>
              </FadeUp>
            </div>
            <CountryPricing country="dubai" />
          </div>
        </section>

        <section className="sec-pad" style={{ background: "var(--white)" }} aria-labelledby="lp-sss-t">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" id="lp-sss-t" text="Sık sorulanlar." accent="sorulanlar." className="h2" />
            </div>
            <CountryFaq items={c.faq} />
          </div>
        </section>

        <section id="teklif" className="sec-pad sec-night" aria-labelledby="lp-teklif-t">
          <div className="container-o lp-teklif-in">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                id="lp-teklif-t"
                text="Şirketinizi birlikte kuralım."
                accent="birlikte kuralım."
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">
                  Üç bilgi yeterli. Faaliyetinize uygun yapıyı ve paketi çıkarıp yazılı teklifle dönüyoruz.
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.1}>
              <LandingLeadForm
                soru="Ne zaman kurmayı düşünüyorsunuz?"
                secenekler={FORM_SECENEK}
                notIpucu="Faaliyet alanınız, ortak sayısı, vize ihtiyacı…"
              />
            </FadeUp>
          </div>
        </section>
      </main>

      <footer className="lp-alt">
        <div className="container-o lp-alt-in">
          <span>© {new Date().getFullYear()} Ortac Global</span>
          <Link href="/dubai">Dubai&apos;de şirket kuruluşu hakkında ayrıntılı bilgi</Link>
        </div>
      </footer>
    </>
  );
}
