import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  FileCheck2,
  FileText,
  Gavel,
  IdCard,
  Landmark,
  PenLine,
  PieChart,
  RefreshCw,
  Search,
  Tag,
  Workflow,
} from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { BrandChip } from "@/components/shared/BrandMark";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import BankaHeroCard from "@/components/services/BankaHeroCard";
import { BANKA_DUBAI as B, type BankaIkon } from "./veri";

/* ============================================================================
   /lab/banka-ilk · YEDEK — /dubai/banka-hesabi'nin İLK HÂLİ (git · 8df2197)
   Burak: "eski halini de bir yerde backup versene … belki o daha sade gelebilir
   gözü, onu kullanırız." Kod ilk hâlin birebir kopyası; yalnız veri yolu
   (./veri) ve sınıf ad alanı (.svb- → .lbi-) değişti. Hero kartı canlıdaki
   ortak bileşen ve sahneleri canlının verisinden okuyor.

   ESKİ BAŞLIK · DUBAİ · BANKA & ÖDEME — /dubai/banka-hesabi
   Metin: lib/bankaDubai.ts (kaynak düzeni ve teyit bekleyenler orada) ·
   Biçim: css/svc-banka.css (.svb-) · Hero kartı: services/BankaHeroCard.tsx

   22.09.2026 · İLK YAZIM. Bu sayfa /dubai'nin (şirket kuruluşu) BANKA
   ADIMININ AYRINTISI, kendi başına bir ürün değil (Burak: "şirket
   kuruluşunun içinde anlattığımız o kısımla alakalı daha detaylı bilginin
   yer alacağı bir kısım … oradan oraya link vereceğiz"). O yüzden muhasebe
   sayfasının on bir bölümü yok; aynı dilde yedi durak:

     hero        HeroSceneCard iskeleti (kuruluş ve muhasebeyle kardeş),
                 fiyat kutusunda rakam yok: "Pakete dahil"
     bankalar    üç banka, N2 karo dili (hakkımızda bentosu: çerçevede
                 büyük logo, altında ad ve tek satır)
     ödeme       dört kanal, gece zeminde aynı karolar (sitenin gece kutu
                 kademeleri)
     süreç       beş adım, süresiz
     belgeler    dört kalem, kırık beyaz zeminde
     ücret       "ayrı bir ücreti yok" paneli + kuruluş ve muhasebe çıkışı
     SSS         sitenin SSS bloğu (CountryFaq)

   ZEMİN RİTMİ: gece hero · beyaz · GECE · beyaz · kırık beyaz · beyaz ·
   gece kapanış. Hiçbir iki gece yüzey arka arkaya değil.

   KAPALI SAYFA. Adres lib/routes.ts · STATIC_LIVE'da DEĞİL: menü ve zincir
   bağlantıları sönük kalıyor, sayfa yalnız doğrudan adresle açılıyor ve
   noindex. İçinde müşterinin okuyup onaylaması gereken cümleler var
   (bankaDubai.ts · [TEYİT]). Onay gelince: STATIC_LIVE'a ekle, robots'u
   kaldır, /dubai'nin banka kartından ve adımından buraya bağlantı ver (site
   içi ağ — Burak: "her yerden her yere gidilebilen, ona en son bakacağız").

   STATİK KLASÖR, DİNAMİK ŞABLONU EZİYOR: app/dubai/[hizmet] bu adresi de
   üretiyor ama aynı seviyedeki statik klasör önce geliyor (muhasebe de
   böyle). */

export const metadata: Metadata = {
  title: "Banka sayfası · ilk hâl (yedek) | Ortac Global",
  description: B.hero.lead,
  /* Kapalı taslak: onaydan sonra kalkacak (yukarıdaki not). */
  robots: { index: false, follow: false },
};

/* PageHero istemci bileşeni, bu sayfa sunucu bileşeni: lucide bileşeninin
   kendisi sınırı geçemez, çizilmiş düğüm geçer (muhasebe sayfasıyla aynı). */
const IKON: Record<BankaIkon, LucideIcon> = {
  secim: Search,
  dosya: FileText,
  imza: PenLine,
  karar: Gavel,
  kanal: Workflow,
  lisans: Building2,
  pasaport: IdCard,
  pay: PieChart,
  form: FileCheck2,
  etiket: Tag,
  tekrar: RefreshCw,
};

/* Bankalar ve ödeme kanalları aynı karo: kırık beyaz (gecede --night-3)
   çerçevenin içinde büyük logo, altında ad ve tek satır. Hakkımızda
   bentosunun N2 dili; logo plakası çerçevenin kendisi. */
function MarkaKaro({
  brand,
  name,
  line,
  delay,
}: {
  brand: Parameters<typeof BrandChip>[0]["brand"];
  name: string;
  line: string;
  delay: number;
}) {
  return (
    <li>
      <FadeUp className="lbi-k" delay={delay}>
        <span className="lbi-k-logo" aria-hidden="true">
          <BrandChip brand={brand} withName={false} optical={26} />
        </span>
        <h3 className="lbi-k-t">{name}</h3>
        <p className="lbi-k-s">{line}</p>
      </FadeUp>
    </li>
  );
}

export default function BankaIlkLab() {
  const H = B.hero;
  return (
    <>
      <Nav />
      <main>
        <PageHero
          crumb={H.crumb}
          title={H.title}
          accent={H.accent}
          lead={H.lead}
          art={<BankaHeroCard />}
          cta={H.cta}
          price={H.price}
          trust={H.trust.map((t) => {
            const I = IKON[t.icon];
            return { icon: <I size={15} strokeWidth={2} aria-hidden="true" />, line: t.line };
          })}
        />

        {/* ---------------------------------------------------- BANKALAR */}
        <section id={B.banks.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={B.banks.heading} accent={B.banks.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{B.banks.lead}</p>
              </FadeUp>
            </div>
            <ul className="lbi-grid lbi-grid-3">
              {B.banks.items.map((k, i) => (
                <MarkaKaro key={k.name} brand={k.brand} name={k.name} line={k.line} delay={0.1 + i * 0.06} />
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------- ÖDEME KANALLARI */}
        <section id={B.pay.id} className="sec-pad sec-night lbi-gece">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text={B.pay.heading}
                accent={B.pay.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">{B.pay.lead}</p>
              </FadeUp>
            </div>
            <ul className="lbi-grid lbi-grid-4">
              {B.pay.items.map((k, i) => (
                <MarkaKaro key={k.name} brand={k.brand} name={k.name} line={k.line} delay={0.1 + i * 0.06} />
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------- SÜREÇ
            <ol>: beş adım bir SIRA. Numara görsel (aria-hidden); sırayı
            ekran okuyucu <ol>'dan zaten duyuyor. Süre yok (bankaDubai.ts). */}
        <section id={B.steps.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={B.steps.heading} accent={B.steps.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{B.steps.lead}</p>
              </FadeUp>
            </div>
            <ol className="lbi-adim">
              {B.steps.items.map((s, i) => {
                const I = IKON[s.icon];
                return (
                  <li key={s.title}>
                    <FadeUp className="lbi-adim-k" delay={0.1 + i * 0.06}>
                      <span className="lbi-adim-bas" aria-hidden="true">
                        <span className="lbi-ic">
                          <I size={18} strokeWidth={1.9} />
                        </span>
                        <span className="lbi-adim-n">{String(i + 1).padStart(2, "0")}</span>
                      </span>
                      <h3 className="lbi-adim-t">{s.title}</h3>
                      <p className="lbi-adim-s">{s.line}</p>
                    </FadeUp>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------- BELGELER */}
        <section id={B.docs.id} className="sec-pad lbi-kagit">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={B.docs.heading} accent={B.docs.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{B.docs.lead}</p>
              </FadeUp>
            </div>
            <ul className="lbi-belge">
              {B.docs.items.map((d, i) => {
                const I = IKON[d.icon];
                return (
                  <li key={d.title}>
                    <FadeUp className="lbi-belge-s" delay={0.1 + i * 0.05}>
                      <span className="lbi-ic" aria-hidden="true">
                        <I size={18} strokeWidth={1.9} />
                      </span>
                      {d.title}
                    </FadeUp>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------- ÜCRET
            Hero'nun fiyat kutusu buraya iniyor (#ucret). Rakam yok: ayrı
            ücreti yok (Burak). İki çıkış: kuruluş paketleri ve muhasebe. */}
        <section id={B.fee.id} className="sec-pad">
          <div className="container-o">
            <FadeUp className="lbi-ucret">
              <SplitWords as="h2" text={B.fee.title} accent={B.fee.accent} className="h2" style={{ color: "#ffffff" }} accentColor="#b9d6fb" />
              <p className="lbi-ucret-p">{B.fee.line}</p>
              <div className="lbi-ucret-cta">
                <SmartLink href={B.fee.links[0].href} className="btn btn-primary">
                  {B.fee.links[0].label}
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>
                <SmartLink href={B.fee.links[1].href} className="btn btn-ghost">
                  {B.fee.links[1].label}
                </SmartLink>
              </div>
              <p className="lbi-ucret-not">
                <Landmark size={14} strokeWidth={2} aria-hidden="true" />
                {B.fee.note}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ---------------------------------------------------------- SSS */}
        <section id={B.faq.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={B.faq.heading} accent={B.faq.accent} className="h2" />
            </div>
            <CountryFaq items={B.faq.items} />
          </div>
        </section>

        <FinalCta kapanis={B.closing} />
      </main>
    </>
  );
}
