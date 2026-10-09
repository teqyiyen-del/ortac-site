import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import HeroAkis from "@/components/home/HeroAkis";
import Chain from "@/components/home/Chain";
import HomeServices from "@/components/home/HomeServices";
import ProcessScroll from "@/components/ProcessScroll";
import Profiles from "@/components/home/Profiles";
import TrustLayer from "@/components/TrustLayer";
import HomeFaq from "@/components/home/HomeFaq";
import Footer from "@/components/Footer";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import UlkeFotoKartlar from "@/components/shared/UlkeFotoKartlar";
import { OG_GORSEL, sayfaKunye } from "@/lib/seo";
import { EN_ANA_SAYFA as T } from "@/lib/en/anaSayfa";

/* ANA SAYFANIN İNGİLİZCE DENEMESİ · /en (10.10.2026).
   Burak: "ana sayfada denemeye başlamak için şu İngilizce şeyini koysana,
   bakalım nasıl duracak." Okur: "yurt dışındaki yabancılar, globaldekiler."

   NASIL KURULDU. Türkçe ana sayfanın (app/page.tsx) bölümleri aynı sırayla ve
   AYNI bileşenlerle. Bileşenler dili adresten okuyor (lib/i18n/useDil) ve
   metni lib/en/ altındaki sözlüklerden alıyor; Türkçe sayfada aynı bileşenler
   Türkçe metni aynen basıyor. Menü ve alt bilgi de aynı yolla İngilizce.

   TÜRKÇE SAYFADAN FARKLAR (gerekçeler lib/en/anaSayfa.ts başında)
     · Ülkeler bölümü sade: üç fotoğraflı ülke kartı (ThreeCountries değil).
     · Blog bölümü yok (yazılar Türkçe).
     · "Türkçe süreç" gibi dile bağlı vaatler yok.

   BAĞLANTILAR ŞİMDİLİK TÜRKÇE SAYFALARA GİDİYOR. İngilizce iç sayfa yok:
   ülke kartları /dubai, /ingiltere, /kktc'ye; hizmet, sektör, iletişim
   bağlantıları Türkçe karşılıklarına. Yalnız sayfa içi çapalar ve logo /en'de
   kalıyor (lib/i18n/cevir · yerelAdres). İngilizce sayfalar açıldıkça
   lib/i18n/adresler · enAdres devreye girecek.

   ARAMA MOTORU. Deneme: dizin dışı (robots index:false), site haritasında
   yok (lib/routes · isLive notu), hreflang basılmıyor. Kanonik kendisi.
   <html lang>: app/en/layout.tsx. */
export const metadata: Metadata = (() => {
  const k = sayfaKunye({ title: T.kunye.title, description: T.kunye.description, yol: "/en", dizinDisi: true });
  return {
    ...k,
    openGraph: {
      ...k.openGraph,
      locale: "en_US",
      images: [{ ...OG_GORSEL, alt: T.kunye.gorselAlt }],
    },
  };
})();

export default function HomeEn() {
  return (
    <>
      <Nav />
      <main id="icerik">
        <HeroAkis />

        {/* ÜLKELER · sade karşılık. Kimlik (#ulkeler) ve zemin Türkçe
            sayfadaki bölümle aynı; içerik üç kart. */}
        <section id="ulkeler" className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={T.ulkeler.title}
                accent={T.ulkeler.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{T.ulkeler.lead}</p>
              </FadeUp>
            </div>
            {/* sec-head ile kartlar arasındaki boşluk: öteki bölümlerde ızgaranın
                kendi üst boşluğu var, .ufk'de yok (telefon kalıbı) */}
            <div style={{ marginTop: "var(--space-head)" }}>
              <FadeUp delay={0.24}>
                <UlkeFotoKartlar items={T.ulkeler.kartlar.map((k) => ({ ...k, href: `/${k.slug}` }))} />
              </FadeUp>
            </div>
            <FadeUp delay={0.3}>
              <SmartLink href="/ulkeler" className="link-arrow" style={{ marginTop: 28 }}>
                {T.ulkeler.kiyas}
                <ArrowRight size={15} strokeWidth={2.1} />
              </SmartLink>
            </FadeUp>
          </div>
        </section>

        <HomeServices />
        <TrustLayer />
        <Profiles dil="en" />
        <Chain />
        <ProcessScroll />
        <HomeFaq />
      </main>
      <Footer
        kapanis={{
          title: T.kapanis.title,
          accent: T.kapanis.accent,
          cta: { label: T.kapanis.cta, href: "/#hizmetler" },
        }}
      />
    </>
  );
}
