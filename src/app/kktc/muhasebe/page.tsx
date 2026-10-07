import type { Metadata } from "next";
import { ArrowRight, BookOpen, CalendarCheck, CircleOff, Receipt, SlidersHorizontal, type LucideIcon } from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import CountryFaq from "@/components/CountryFaq";
import CountryTakvim from "@/components/country/CountryTakvim";
import FinalCta from "@/components/FinalCta";
import {
  AccountingGains,
  AccountingScope,
  AccountingStrengths,
  type KapsamKalem,
} from "@/components/services/AccountingSections";
import { ACCOUNTING_KKTC as C } from "@/lib/accountingKktc";

/* ============================================================================
   KKTC MUHASEBE HİZMETİ — /kktc/muhasebe (07.10.2026)

   Önceki hâl genel hizmet şablonunun kısa düzeniydi. Burak: "içinde hiçbir
   şey anlatmadın neredeyse … Dubai'deki section'ları bir bak, aynıları
   Kıbrıs'ta da olabiliyorsa olsun, paralel git."

   SIRA, Dubai'nin muhasebe sayfasıyla (app/dubai/muhasebe) aynı omurga:
     giriş     PageHero (foto giriş, ücret kutusu)
     #arti     dört karo                         AccountingStrengths
     #kapsam   beş aşama, her biri açılır        AccountingScope
     takvim    yıl içinde ne zaman ne çıkıyor    CountryTakvim
     #fayda    defter sahnesi + dört satır       AccountingGains
     #fiyat    aktif / pasif, iki kutu           (.hzf)
     #sss      sekiz soru
   Bölüm bileşenleri Dubai'ninkiler; veri verilince o veriyi basıyorlar.
   Dubai'de olup burada olmayan üç bölüm (alıntı, muhasebeci değiştirenler,
   ihtiyaç bulucu) ve gerekçesi lib/accountingKktc.ts'in başında.

   STATİK KLASÖR: app/kktc/[hizmet] bu adresi artık üretmiyor. */

const SITE = "https://ortacglobal.com";
const PAGE_URL = `${SITE}/kktc/muhasebe`;

export const generateMetadata = (): Metadata => ({
  title: C.seo.title,
  description: C.seo.description,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    locale: "tr_TR",
    siteName: "Ortac Global",
    url: PAGE_URL,
    title: C.seo.title,
    description: C.seo.description,
  },
});

/* Aşama ikonları burada: veri dosyası ikon taşımıyor (Dubai'de de bileşenin
   içinde). Sıra veriyle aynı. */
const ASAMA_IKON: Record<string, LucideIcon> = {
  altyapi: SlidersHorizontal,
  takip: Receipt,
  beyan: CalendarCheck,
  yilsonu: BookOpen,
  pasif: CircleOff,
};

const KALEMLER: KapsamKalem[] = C.scope.kalemler.map((k) => ({
  ...k,
  Ikon: ASAMA_IKON[k.id] ?? BookOpen,
  cipBaslik: C.scope.youTitle,
  sinirBaslik: C.scope.feeLabel,
}));

export default function KktcAccountingPage() {
  const F = C.fiyat;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "KKTC", item: `${SITE}/kktc` },
          { "@type": "ListItem", position: 3, name: "Muhasebe", item: PAGE_URL },
        ],
      },
      {
        "@type": "Service",
        name: "KKTC Serbest Bölge şirketi muhasebe hizmeti",
        serviceType: "Muhasebe",
        url: PAGE_URL,
        provider: { "@type": "Organization", name: "Ortac Global", url: SITE },
        areaServed: { "@type": "Place", name: "Kuzey Kıbrıs" },
        description: C.seo.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: C.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Nav />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <PageHero
          crumb={C.hero.crumb}
          title={C.hero.title}
          accent={C.hero.accent}
          lead={C.hero.lead}
          rozetler={C.hero.rozetler}
          cta={C.hero.cta}
          price={C.hero.price}
        />

        <AccountingStrengths veri={C.strengths} />
        <AccountingScope baslik={C.scope} kalemler={KALEMLER} haric={[]} />
        <CountryTakvim data={C.takvim} />
        <AccountingGains veri={C.gains} />

        {/* ÜCRET · iki kutu (genel hizmet şablonundaki .hzf). Dubai'de altı
            kalemli liste var; burada belge yalnız iki hâl söylüyor. */}
        <section id={F.id} className="sec-pad" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={F.heading} accent={F.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{F.lead}</p>
              </FadeUp>
            </div>
            <ul className="hzf">
              {F.items.map((f, i) => (
                <li key={f.ad}>
                  <FadeUp className="hzf-k" delay={0.1 + i * 0.06}>
                    <span className="hzf-ad">{f.ad}</span>
                    <b className="hzf-tutar">{f.tutar}</b>
                    <p className="hzf-s">{f.line}</p>
                  </FadeUp>
                </li>
              ))}
            </ul>
            <SmartLink href="/kktc#fiyat" className="svz-cik">
              KKTC&apos;de kuruluş tutarına bakın
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </SmartLink>
          </div>
        </section>

        <section id={C.faq.id} className="sec-pad svm-sec">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={C.faq.heading} accent={C.faq.accent} className="h2" />
            </div>
            <CountryFaq items={C.faq.items} />
          </div>
        </section>

        <FinalCta kapanis={C.closing} />
      </main>
    </>
  );
}
