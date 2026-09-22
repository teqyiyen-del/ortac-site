import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Bitcoin, CreditCard, FileText, Landmark, RefreshCw, Store } from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { BrandChip } from "@/components/shared/BrandMark";
import CountryProcess from "@/components/CountryProcess";
import CountryDocs from "@/components/CountryDocs";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import BankaHeroCard from "@/components/services/BankaHeroCard";
import { BANKA_DUBAI as B, type BankaIkon } from "@/lib/bankaDubai";

/* ============================================================================
   DUBAİ · BANKA & ÖDEME — /dubai/banka-hesabi
   Metin: lib/bankaDubai.ts (kaynak düzeni ve teyit bekleyenler orada) ·
   Biçim: css/svc-banka.css (.svb-) · Hero kartı: services/BankaHeroCard.tsx

   Bu sayfa /dubai'nin (şirket kuruluşu) BANKA ADIMININ AYRINTISI, kendi
   başına bir ürün değil. Beş durak:

     hero       HeroSceneCard iskeleti (kuruluş ve muhasebeyle kardeş)
     hesaplar   iki büyük kart (banka · ödeme ve tahsilat), üstlerinde birer
                sahne, logolar sahnenin içinde; altında "Hangi kanal ne için"
     süreç      sitenin standart aşama bileşeni (CountryProcess)
     belgeler   sitenin standart belge bileşeni (CountryDocs)
     SSS        sitenin SSS bloğu (CountryFaq)

   22.09.2026 · İKİNCİ GEÇİŞ (gerekçe bankaDubai.ts başında): ilk hâl bir
   beyaz bir gece küçük bölümlerle dama tahtasına dönmüştü, bankalar ve ödeme
   kanalları yalnız logoydu, süreç sitenin aşama dilinde değildi ve mavi bir
   "ayrı ücreti yok" paneli vardı. Şimdi gövde baştan sona beyaz; ücret
   hiçbir yerde yazmıyor.

   KAPALI SAYFA. Adres lib/routes.ts · STATIC_LIVE'da DEĞİL: menü ve zincir
   bağlantıları sönük, sayfa yalnız doğrudan adresle açılıyor ve noindex.
   Onay gelince: STATIC_LIVE'a ekle, robots'u kaldır, /dubai'nin banka
   kartından ve adımından buraya bağlantı ver.

   STATİK KLASÖR, DİNAMİK ŞABLONU EZİYOR (app/dubai/[hizmet]; muhasebe de
   böyle). */

export const metadata: Metadata = {
  title: "Dubai'de Banka Hesabı ve Ödeme Altyapısı | Ortac Global",
  description: B.hero.lead,
  /* Kapalı taslak: onaydan sonra kalkacak (yukarıdaki not). */
  robots: { index: false, follow: false },
};

/* PageHero istemci bileşeni, bu sayfa sunucu bileşeni: lucide bileşeninin
   kendisi sınırı geçemez, çizilmiş düğüm geçer. */
const IKON: Record<BankaIkon, LucideIcon> = {
  dosya: FileText,
  tekrar: RefreshCw,
  kart: CreditCard,
  pazar: Store,
  kripto: Bitcoin,
  banka: Landmark,
};

/* ---------------------------------------------------------------- SAHNELER
   İkisi de aria-hidden: kartın iddiası başlıkta ve cümlede. Logolar gerçek
   işaretler (BrandChip), seçili satır ve akış gösterim — bir banka adı ya da
   tutar iddiası yok. */

/** Banka: üç bankanın seçim listesi, ortadaki seçili. "Hangi banka"nın
 *  cevabı bir liste değil bir SEÇİM (başvurudan önce birlikte yapılıyor). */
function SahneBanka({ brands }: { brands: { brand: Parameters<typeof BrandChip>[0]["brand"]; name: string }[] }) {
  return (
    <ul className="svb-secim">
      {brands.map((b, i) => (
        <li key={b.name} data-secili={i === 1 ? "" : undefined}>
          <span className="svb-secim-logo">
            <BrandChip brand={b.brand} withName={false} optical={16} />
          </span>
          <b>{b.name}</b>
          <i className="svb-secim-r" />
        </li>
      ))}
    </ul>
  );
}

/** Ödeme: dört kanal soldan, tek banka hesabına akıyor. Hakkımızda
 *  bentosunun "tek ekip" sahnesiyle aynı dil (kavisli bağlar, aktarım
 *  ışığı). Bağların dikey merkezleri dört satırın merkezleri: satır 36, ara
 *  10, liste 174 → 18 · 64 · 110 · 156; SVG de 174 boyda. */
const AKIS_Y = [18, 64, 110, 156];
function SahneOdeme({ brands }: { brands: { brand: Parameters<typeof BrandChip>[0]["brand"]; name: string }[] }) {
  return (
    <div className="svb-akis akt">
      <ul className="svb-akis-l">
        {brands.map((b) => (
          <li key={b.name} className="svb-akis-s akt-durak">
            <BrandChip brand={b.brand} withName={false} optical={14} />
          </li>
        ))}
      </ul>
      <svg viewBox="0 0 100 174" preserveAspectRatio="none" focusable="false" className="svb-akis-bag">
        {AKIS_Y.map((y, k) => (
          <path key={y} className="svb-akis-yol akt-durak" data-k={k} d={`M0 ${y} C 50 ${y}, 50 87, 100 87`} />
        ))}
      </svg>
      <div className="svb-akis-hes akt-durak">
        <span className="svb-ic">
          <Landmark size={18} strokeWidth={1.9} />
        </span>
        <b>Banka hesabınız</b>
        <i />
        <i />
      </div>
    </div>
  );
}

export default function DubaiBankaPage() {
  const H = B.hero;
  const A = B.accounts;
  const [BANKA, ODEME] = A.items;
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
          trust={H.trust.map((t) => {
            const I = IKON[t.icon];
            return { icon: <I size={15} strokeWidth={2} aria-hidden="true" />, line: t.line };
          })}
        />

        {/* ------------------------------------------------------ HESAPLAR
            İki büyük kart (hakkımızda bentosunun N2 kabuğu: üstte çerçeve,
            altında başlık ve cümle) ve altında rehber. İlk hâldeki yedi
            küçük logo karosunun yerine. */}
        <section id={A.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={A.heading} accent={A.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{A.lead}</p>
              </FadeUp>
            </div>

            <ul className="svb-hes">
              <li>
                <FadeUp className="svb-h" delay={0.1}>
                  <div className="svb-h-sahne" aria-hidden="true">
                    <SahneBanka brands={BANKA.brands} />
                  </div>
                  <h3 className="svb-h-t">{BANKA.title}</h3>
                  <p className="svb-h-s">{BANKA.line}</p>
                </FadeUp>
              </li>
              <li>
                <FadeUp className="svb-h" delay={0.16}>
                  <div className="svb-h-sahne" aria-hidden="true">
                    <SahneOdeme brands={ODEME.brands} />
                  </div>
                  <h3 className="svb-h-t">{ODEME.title}</h3>
                  <p className="svb-h-s">{ODEME.line}</p>
                </FadeUp>
              </li>
            </ul>

            {/* Rehber: ziyaretçinin kendi durumundan hesaba giden dört satır.
                Logolar bilgi taşıyor (hangi kanal), o yüzden aria-hidden
                DEĞİL; BrandChip kendi erişilebilir adını basıyor. */}
            <div className="svb-rehber">
              <h3 className="svb-rehber-h">{B.guide.heading}</h3>
              <ul className="svb-rehber-l">
                {B.guide.rows.map((r, i) => {
                  const I = IKON[r.icon];
                  return (
                    <li key={r.when}>
                      <FadeUp className="svb-rehber-s" delay={0.08 + i * 0.05}>
                        <span className="svb-ic" aria-hidden="true">
                          <I size={18} strokeWidth={1.9} />
                        </span>
                        <span className="svb-rehber-t">{r.when}</span>
                        <span className="svb-rehber-m">
                          {r.brands.map((b) => (
                            <span key={b} className="svb-rehber-b">
                              <BrandChip brand={b} withName={false} optical={14} />
                            </span>
                          ))}
                        </span>
                      </FadeUp>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* SÜREÇ · sitenin standart aşama bileşeni, ülke sayfalarındaki. */}
        <CountryProcess
          steps={B.steps}
          title={B.stepsTitle}
          panelTitle={B.stepsPanel}
          detailOverride={B.stepsExit}
        />

        {/* BELGELER · sitenin standart belge bileşeni ("sizde olanı
            işaretleyin"). Başlık ve giriş bu sayfanın. */}
        <CountryDocs
          data={B.docs.data}
          name="Dubai"
          heading={B.docs.heading}
          accent={B.docs.accent}
          lead={B.docs.lead}
        />

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
