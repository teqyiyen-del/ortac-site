import type { Metadata } from "next";
import { Stamp, Wallet } from "lucide-react";

import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import AskCta from "@/components/shared/AskCta";
import CountryFaq from "@/components/CountryFaq";
import AccountingHeroCard from "@/components/services/AccountingHeroCard";
import AccountingCalendar from "@/components/services/AccountingCalendar";
import MuhasebeTeklif from "@/components/lab/MuhasebeTeklif";
import { CANLI, EKIP, HERO, SSS_KALAN, TAKVIM } from "./veri";

/* /lab/muhasebe — Dubai muhasebe sayfasının yeniden kurgusu.
   Canlı sayfaya hiçbir aday bağlı değil. */

export const metadata: Metadata = {
  title: "Muhasebe sayfası · aday kurgular | Ortac Global",
  robots: { index: false, follow: false },
};

const ICON = { stamp: Stamp, wallet: Wallet } as const;

/* Kalan üç SSS. Canlı listedeki altı sorunun üçü sayfanın kendi metnini
   tekrar ediyordu; burada süzülüyorlar. */
const SSS = CANLI.faq.items.filter((q) => SSS_KALAN.includes(q.q));

function Hero() {
  return (
    <PageHero
      crumb={HERO.crumb}
      title={HERO.title}
      accent={HERO.accent}
      lead={HERO.lead}
      art={<AccountingHeroCard />}
      cta={HERO.cta}
      trust={HERO.trust.map((t) => {
        const Icon = ICON[t.icon];
        return { icon: <Icon size={15} strokeWidth={2} aria-hidden="true" />, line: t.line };
      })}
    />
  );
}

function Takvim() {
  return (
    <section id={TAKVIM.id} className="sec-pad svm-tight">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={TAKVIM.heading} accent={TAKVIM.accent} className="h2" />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{TAKVIM.lead}</p>
          </FadeUp>
        </div>
        <AccountingCalendar />
      </div>
    </section>
  );
}

function Ekip() {
  return (
    <section id={EKIP.id} className="sec-pad svm-tight" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={EKIP.heading} accent={EKIP.accent} className="h2" />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{EKIP.lead}</p>
          </FadeUp>
        </div>
        <FadeUp delay={0.1}>
          <ul className="lmh-var" style={{ maxWidth: "62ch" }}>
            {CANLI.ortac.facts.map((f) => (
              <li key={f.title}>
                <b>{f.title}</b>
                <span>{f.line}</span>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}

function Sss() {
  return (
    <section className="sec-pad svm-tight" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text="Sık sorulanlar." accent="sorulanlar." className="h2" />
        </div>
        <CountryFaq items={SSS} />
        <FadeUp delay={0.2}>
          <p className="tl-intro-n" style={{ marginTop: 28 }}>
            <AskCta label="Kendi durumumu sorayım" />
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- ADAY MA */
function AdayMA() {
  return (
    <>
      <Hero />
      <MuhasebeTeklif sira="kapsam-once" />
      <Takvim />
      <Ekip />
      <Sss />
    </>
  );
}

/* ---------------------------------------------------------------- ADAY MB */
function AdayMB() {
  return (
    <>
      <Hero />
      <MuhasebeTeklif sira="fiyat-once" />
      <Takvim />
      <Ekip />
      <Sss />
    </>
  );
}

const ADAYLAR = [
  {
    id: "Aday MA",
    ad: "Teklif",
    kunye: "Kapsam → sınır → fiyat, tek omurgada. Fiyat teklifin son cümlesi.",
    Bolum: AdayMA,
  },
  {
    id: "Aday MB",
    ad: "Rakam önde",
    kunye: "Aynı omurga, ters sıra: fiyat listesi kapsamdan önce geliyor.",
    Bolum: AdayMB,
  },
];

export default function MuhasebeLab() {
  return (
    <main>
      {ADAYLAR.map(({ id, ad, kunye, Bolum }) => (
        <div key={id}>
          <div className="lmh-kunye">
            <span>{id}</span>
            <h2>{ad}</h2>
            <p>{kunye}</p>
          </div>
          <Bolum />
          <hr style={{ margin: 0, border: 0, borderTop: "1px solid var(--border)" }} />
        </div>
      ))}
    </main>
  );
}
