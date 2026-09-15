import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Logo from "@/components/shared/Logo";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import CountryFaq from "@/components/CountryFaq";
import AccountingHeroCard from "@/components/services/AccountingHeroCard";
import AccountingLeadForm from "@/components/services/AccountingLeadForm";
import {
  ACC_ICON,
  AccountingPrice,
  AccountingStrengths,
} from "@/components/services/AccountingSections";
import {
  ACCOUNTING_DUBAI as C,
  accountingFaq,
  accountingItems,
  accountingMonthlyPrice,
} from "@/lib/accountingDubai";

/* ============================================================================
   REKLAM İNİŞ SAYFASI · DUBAİ MUHASEBE — /lp/dubai-muhasebe

   15.09.2026 · marketing listesi, madde 19: "Reklam için mevcut uzun sayfadan
   ayrı, daha kısa bir landing page de test edebiliriz. Hero > güven >
   hizmetler > fiyat > yorum > FAQ > form şeklinde daha hızlı ilerleyen bir
   yapı olabilir."

   SIRA MARKETİNG'İN SIRASI, BİR ADIM EKSİK:
     hero      PageHero + fiyat kutusu (muhasebe sayfasının aynısı)
     güven     AccountingStrengths (dört karo)
     hizmetler altı kalem, tek satır tanım (fiyat listesinin kalemleri)
     fiyat     AccountingPrice (muhasebe sayfasının gece fiyat bandı)
     yorum     YOK · madde 10 (müşteri yorumları, vaka örnekleri) Murat
               Ortaç'ın onayında açık ve uydurma yorum yazılamaz. Gerçek
               yorumlar gelince bu yorumun yerine tek bir bölüm girecek.
     SSS       CountryFaq, muhasebe sayfasının genişletilmiş listesi
     form      AccountingLeadForm · gönderim bağlı değil (SWAP:LEAD_FORM)

   SİTENİN KABUĞU YOK, BİLEREK. Menü ve sayfa sonundaki site dizini basılmıyor:
   reklamdan gelen ziyaretçinin tek işi teklif istemek ve her çıkış bağlantısı
   ölçülen dönüşümden bir kayıp. Üstte yalnız logo (ana sayfaya) ve forma inen
   tek düğme, altta tek satır künye. Muhasebe sayfasının bölüm bileşenleri
   AYNEN kullanılıyor; ikinci bir kopya yok, muhasebe sayfası değişince burası
   da değişiyor.

   ARAMA MOTORUNA KAPALI (noindex, follow:false) ve site haritasında yok
   (lib/routes.ts dolaşım defterine girmedi). Aynı içerik /dubai/muhasebe'de
   indeksleniyor; reklam sayfasının ikinci bir sonuç olarak çıkması iki
   sayfayı birbirine rakip yapardı.
   ========================================================================= */

export const metadata: Metadata = {
  title: "Dubai Muhasebe Hizmeti · Teklif Alın | Ortac Global",
  description: C.seo.description,
  robots: { index: false, follow: false },
};

export default function DubaiMuhasebeLanding() {
  const monthly = accountingMonthlyPrice();
  const heroPrice = monthly
    ? { ...C.hero.price, amount: C.hero.price.amount.replace("{usd}", monthly.usd.toLocaleString("tr-TR")) }
    : undefined;
  const kalemler = accountingItems();
  const faq = accountingFaq();

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
        <PageHero
          crumb={C.hero.crumb}
          title={C.hero.title}
          accent={C.hero.accent}
          lead={C.hero.lead}
          art={<AccountingHeroCard />}
          cta={{ label: "Teklif isteyin", href: "#teklif" }}
          price={heroPrice}
          trust={C.hero.trust.map((t) => {
            const Icon = ACC_ICON[t.icon];
            return { icon: <Icon size={15} strokeWidth={2} aria-hidden="true" />, line: t.line };
          })}
        />

        <AccountingStrengths />

        {/* HİZMETLER · altı kalem, tek satır. Uzun sayfanın K1 kapsamı
            (beş aşama, beş açılır) burada yok: reklam okuru "ne alıyorum"u
            bir bakışta görmek istiyor, nasıl yürüdüğünü değil. Kalemlerin
            tanımı fiyat listesiyle aynı veriden. Alt sayfalara bağlantı YOK
            (yukarıdaki "kabuk yok" gerekçesi). */}
        <section className="sec-pad svm-sec" aria-labelledby="lp-hizmet-t">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                id="lp-hizmet-t"
                text="Muhasebe hizmetinin kapsamı."
                accent="kapsamı."
                className="h2"
              />
            </div>
            <ul className="lp-hizmet-l">
              {kalemler.map((k, i) => (
                <li key={k.id}>
                  <FadeUp className="lp-hizmet-in" delay={0.05 + i * 0.04}>
                    <b>{k.title}</b>
                    {k.en && <em>{k.en}</em>}
                    <span>{k.line}</span>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <AccountingPrice />

        <section className="sec-pad svm-sec" aria-labelledby="lp-sss-t">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" id="lp-sss-t" text={C.faq.heading} accent={C.faq.accent} className="h2" />
            </div>
            <CountryFaq items={faq} />
          </div>
        </section>

        <section id="teklif" className="sec-pad sec-night" aria-labelledby="lp-teklif-t">
          <div className="container-o lp-teklif-in">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                id="lp-teklif-t"
                text={C.closing.title}
                accent={C.closing.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">
                  Üç bilgi yeterli. Faaliyetinize göre hangi kalemlerin doğduğunu çıkarıp yazılı teklifle
                  dönüyoruz.
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.1}>
              <AccountingLeadForm />
            </FadeUp>
          </div>
        </section>
      </main>

      <footer className="lp-alt">
        <div className="container-o lp-alt-in">
          <span>© {new Date().getFullYear()} Ortac Global</span>
          <Link href="/dubai/muhasebe">Dubai muhasebe hizmeti hakkında ayrıntılı bilgi</Link>
        </div>
      </footer>
    </>
  );
}
