import type { Metadata } from "next";
import { Stamp, Wallet } from "lucide-react";

import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import AskCta from "@/components/shared/AskCta";
import CountryFaq from "@/components/CountryFaq";
import AccountingHeroCard from "@/components/services/AccountingHeroCard";
import AccountingCalendar from "@/components/services/AccountingCalendar";
import { MuhasebeAyrim, MuhasebeFiyat, MuhasebeNe } from "@/components/lab/MuhasebeBloklar";
import { CANLI, EKIP, HERO, SSS_KALAN, TAKVIM } from "./veri";

/* /lab/muhasebe — Dubai muhasebe sayfasının "tarayarak anlaşılır" hâli.
   Canlı sayfaya bağlı değil. Brif ve ölçüm ./veri.ts'in başında. */

export const metadata: Metadata = {
  title: "Muhasebe sayfası · tarama adayı | Ortac Global",
  robots: { index: false, follow: false },
};

const ICON = { stamp: Stamp, wallet: Wallet } as const;
const SSS = CANLI.faq.items.filter((q) => SSS_KALAN.includes(q.q));

export default function MuhasebeLab() {
  return (
    <main>
      <div className="lmh-kunye">
        <span>Aday MC</span>
        <h2>Tarama</h2>
        <p>
          Aynı içerik, tarayan göze göre kurulmuş: kapsam dört karo, dahil/hariç iki işaretli
          sütun, fiyat tablo. Uzun paragraf ve akordiyon yok.
        </p>
      </div>

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

      <MuhasebeNe />
      <MuhasebeAyrim />
      <MuhasebeFiyat />

      {/* Takvim canlı bileşenden; etrafındaki düz yazı kalktı, görsel şerit
          kaldı. Zaten sayfanın en iyi tarama yüzeyi o. */}
      <section id={TAKVIM.id} className="sec-pad lmh-sec">
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

      {/* Kim yürütüyor. Yerleşim müşterinin beğendiği hakkımızda listesiyle
          aynı (.lhb-dayanak): ikon · kısa başlık · tek cümle, ayraçlı satırlar.
          Yeni bir kalıp icat edilmedi, beğenilen kalıp ikinci kez kullanıldı. */}
      <section id={EKIP.id} className="sec-pad lmh-sec" data-alt="">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords as="h2" text={EKIP.heading} accent={EKIP.accent} className="h2" />
          </div>
          <ul className="lhb-dayanak">
            {CANLI.ortac.facts.map((f, i) => (
              <FadeUp key={f.title} delay={0.06 + i * 0.05}>
                <li>
                  <span aria-hidden="true" />
                  <b>{f.title}</b>
                  <span>{f.line}</span>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-pad lmh-sec">
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
    </main>
  );
}
