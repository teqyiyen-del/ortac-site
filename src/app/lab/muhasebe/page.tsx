import type { Metadata } from "next";
import { Stamp, Wallet } from "lucide-react";

import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import AskCta from "@/components/shared/AskCta";
import CountryFaq from "@/components/CountryFaq";
import AccountingHeroCard from "@/components/services/AccountingHeroCard";
import AccountingHandover from "@/components/services/AccountingHandover";
import AccountingCalendar from "@/components/services/AccountingCalendar";
import {
  MuhasebeAlinti,
  MuhasebeArti,
  MuhasebeFiyat,
  MuhasebeKapsam,
  MuhasebeKarsilik,
} from "@/components/lab/MuhasebeBloklar";
import { CANLI, HERO, SSS_KALAN, TAKVIM } from "./veri";

/* /lab/muhasebe — Dubai muhasebe sayfası, müşterinin bölüm bölüm brifiyle.
   Canlı sayfaya bağlı değil. Brifin tamamı ./veri.ts'in başında. */

export const metadata: Metadata = {
  title: "Muhasebe sayfası · aday kurgu | Ortac Global",
  robots: { index: false, follow: false },
};

const ICON = { stamp: Stamp, wallet: Wallet } as const;
const SSS = CANLI.faq.items.filter((q) => SSS_KALAN.includes(q.q));

export default function MuhasebeLab() {
  return (
    <main>
      <div className="lmh-kunye">
        <span>Aday MD · K1 · F3</span>
        <h2>Brif</h2>
        <p>
          Müşterinin bölüm bölüm tarifi. Fiyat ve takas paneli aynen korundu; kısa cevap, süreci
          yürüten ekip, kapanış kartları ve takvimin 01-02-03 girişi kalktı.
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

      <MuhasebeArti />
      <MuhasebeAlinti />

      {/* Kapsam · K1 (11.09.2026, /lab/muhasebe-kapsam'dan). Bileşen adı aynı
          kaldı, içi değişti: dört karo + "dahil değil" açılırı gitti, yerine
          beş aşamanın her biri kendi açılırı. Gerekçe MuhasebeBloklar.tsx. */}
      <MuhasebeKapsam />

      {/* Takas paneli aynen canlı bileşenden. Müşteri: "şu sizden gelen size
          dönen kısmı var ya, orası muhakkak olsun, güzel çünkü baya."

          GECE HÂLİ GERİ ALINDI. Bir tur önce "bg yi siyah yapabiliriz" denmiş
          ve panel geceye çevrilmişti; müşteri beğenmedi: "bizim beyaz üstünde
          iyiydi sadece onu biraz büyütmeni istiyorum." Giden yalnızca renk,
          kalan ölçü — gerekçe ve üç ölçüm css/lab-muhasebe.css · .lmh-takas.

          BİLEŞENE DOKUNULMADI: AccountingHandover canlı sayfada da
          kullanılıyor ve bu bir aday. */}
      <section className="lmh-takas">
        <div className="container-o">
          <AccountingHandover />
        </div>
      </section>

      {/* Takvim. 01-02-03 bloğu ve istatistik cümlesi CSS ile basılmıyor;
          gerekçe css/lab-muhasebe.css · .lmh-takvim.

          BU TUR İKİ EK, ikisi de o kapsamda ve ikisi de CSS: şeritlerin
          üstünden geçen ışık (müşteri: "ona bide animasyon ver") ve vergi
          çerçevesinin ray kartına yaklaştırılması ("aradaki spacingi azalt
          çok uzakta duruyor" — ölçülen 48 px, yeni değer 18 px).
          AccountingCalendar canlı bileşen, dokunulmadı. */}
      <section id={TAKVIM.id} className="sec-pad lmh-sec lmh-takvim">
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

      {/* Karşılık · F3 düzeltilerek (11.09.2026, /lab/muhasebe-fayda'dan):
          tek defter sahnesi + dört satır, seçimsiz, metin sütunu sahneden
          geniş (5+7), yazı büyüdü. Lead yok. Gerekçe MuhasebeBloklar.tsx. */}
      <MuhasebeKarsilik />
      <MuhasebeFiyat />

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
