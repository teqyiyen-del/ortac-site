import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Bitcoin,
  Briefcase,
  ChartColumn,
  Coins,
  Gavel,
  CreditCard,
  FileText,
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Globe,
  Landmark,
  PenLine,
  Receipt,
  Search,
  RefreshCw,
  Store,
  Truck,
  Users,
  Workflow,
} from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { BrandChip } from "@/components/shared/BrandMark";
import { BRANDS, type BrandKey, type WordmarkPart } from "@/lib/brands";
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
     banka      kurumsal banka hesabı: sahne + üç banka satırı + "bankanın
                başvuruda baktığı şeyler"
     ödeme      ödeme ve tahsilat kanalları: ayna düzen, dört kanal satırı,
                her birinde "ne zaman" etiketi
     süreç      ilk yazımın beş kartı (aşama bileşeni yalnız kuruluş sayfalarında)
     belgeler   sitenin standart belge bileşeni (CountryDocs)
     SSS        sitenin SSS bloğu (CountryFaq)

   22.09.2026 · İKİNCİ GEÇİŞ (gerekçe bankaDubai.ts başında): ilk hâl bir
   beyaz bir gece küçük bölümlerle dama tahtasına dönmüştü, bankalar ve ödeme
   kanalları yalnız logoydu, süreç sitenin aşama dilinde değildi ve mavi bir
   "ayrı ücreti yok" paneli vardı. Şimdi gövde baştan sona beyaz; ücret
   hiçbir yerde yazmıyor.

   22.09.2026 · ÜÇÜNCÜ GEÇİŞ: banka ve ödeme iki ayrı bölüm, iki ayrı başlık
   (Burak: "banka konusu farklı, ödeme ve tahsilat konusu ayrı"). İkinci
   geçişin iki kartı ve "Hangi kanal ne için" rehberi kalktı; rehberin
   içeriği ödeme satırlarının etiketine eridi. İlk hâl /lab/banka-ilk'te.

   AÇIK SAYFA · 22.09.2026 (lib/routes.ts · STATIC_LIVE). Açılınca menü,
   /dubai'nin hizmet kartları ve zincir bağlantıları kendiliğinden canlandı.
   Teyit bekleyen cümleler docs/teyit-listesi.md'de.

   STATİK KLASÖR, DİNAMİK ŞABLONU EZİYOR (app/dubai/[hizmet]; muhasebe de
   böyle). */

export const metadata: Metadata = {
  title: "Dubai'de Banka Hesabı ve Ödeme Altyapısı | Ortac Global",
  description: B.hero.lead,
};

/* PageHero istemci bileşeni, bu sayfa sunucu bileşeni: lucide bileşeninin
   kendisi sınırı geçemez, çizilmiş düğüm geçer. */
const IKON: Record<BankaIkon, LucideIcon> = {
  dosya: FileText,
  tekrar: RefreshCw,
  kart: CreditCard,
  pazar: Store,
  kripto: Bitcoin,
  dunya: Globe,
  faaliyet: Briefcase,
  ortak: Users,
  kaynak: Coins,
  hacim: ChartColumn,
  secim: Search,
  imza: PenLine,
  karar: Gavel,
  kanal: Workflow,
};

/* ------------------------------------------------------------ MARKA RENGİ
   22.09.2026 · Burak önce "logolar hep siyah, biraz renk katalım" dedi, ilk
   deneme (marka rengi + rengin açığında kuyu, altın para) "bir tık abartı …
   sitenin kalan diline aykırı" bulundu; o hâl /lab/banka-renk'te.
   Şimdiki kural: YALNIZ LOGONUN KENDİSİ renkli, zemin her yerde beyaz.
   · Payoneer ve Binance çok renkli: resmî açık zemin varyantları
     lib/brands.ts · Wordmark.renkli (BrandChip `renkli`). Payoneer'in ilk
     denemedeki düz turuncusu yanlıştı; resmî logoda yazı koyu, halka bir
     renk çarkı.
   · Tek renkliler mürekkebi currentColor'dan alıyor: rengi kuyunun color'ı.
   Stripe · PayPal markaların yayımladığı renkler. SWAP:MARKA_RENK — Wio,
   Mashreq ve Emirates NBD YAKLAŞIK; müşterinin marka dosyasıyla teyit.
   Yalnız bu sayfada; sitenin öteki logo şeritleri tek tonlu. */
const MARKA_RENK: Partial<Record<BrandKey, string>> = {
  wio: "#5a34e0",
  mashreq: "#e8580c",
  emiratesnbd: "#0a3161",
  stripe: "#635bff",
  paypal: "#003087",
};
function renk(brand: BrandKey): CSSProperties | undefined {
  const r = MARKA_RENK[brand];
  return r ? ({ "--mk": r } as CSSProperties) : undefined;
}

/* ---------------------------------------------------------------- SAHNELER
   İkisi de aria-hidden: bölümün iddiası başlıkta, cümlede ve satırlarda.
   Tutar, IBAN ya da banka adı iddiası yok; hepsi gösterim. */

/** Banka: şirket hesabının ekranı. Önceki sahne üç bankanın seçim listesiydi
 *  ve yanındaki satırları birebir tekrar ediyordu (Burak: "solda … logo koyup
 *  yanına isim yazmışsın, sağda da aynı şey var"). Şimdi hesabın NE İŞE
 *  YARADIĞINI gösteriyor: bölüm cümlesindeki dört gider sırayla hesaptan
 *  çıkıyor. */
const HESAP_GIDER = [
  { ad: "Tedarikçi ödemesi", I: Truck },
  { ad: "Maaşlar", I: Users },
  { ad: "Vergi", I: Receipt },
  { ad: "Faturalar", I: FileText },
];
function SahneBanka() {
  return (
    <div className="svb-hsp">
      <div className="svb-hsp-bas">
        <span className="svb-hsp-ic">
          <Landmark size={18} strokeWidth={1.9} />
        </span>
        <span className="svb-hsp-ad">
          <b>Şirket hesabı</b>
          <small>AE•• •••• •••• ••••</small>
        </span>
        <span className="svb-hsp-rozet">Kurumsal</span>
      </div>
      <ul className="svb-hsp-l">
        {HESAP_GIDER.map(({ ad, I }) => (
          <li key={ad} className="svb-hsp-s">
            <span className="svb-hsp-si">
              <I size={15} strokeWidth={2} />
            </span>
            <b>{ad}</b>
            <i />
            <ArrowUpRight className="svb-hsp-ok" size={16} strokeWidth={2.2} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Kanalın KARE işareti (uygulama simgesi gibi). Sahnede tam logo değil:
 *  yanındaki satırlar zaten tam logoyu basıyor, sahnede de basılınca aynı
 *  şey iki kez görünüyordu (Burak: "solda bir daha var sağda bir daha var
 *  … sadece ikonlarını kullansak … kare kare"). Geometri lib/brands.ts'ten:
 *  Stripe ve PayPal'ın simge yolu, Payoneer'in renkli halkası ve Binance'in
 *  elması (ikisi Wordmark.renkli'nin parçaları, yeni çizim yok). */
const ISARET: Partial<Record<BrandKey, { viewBox: string; parts: readonly WordmarkPart[] }>> = {
  stripe: { viewBox: "0 0 24 24", parts: [{ d: BRANDS.stripe.path, fill: "#635BFF" }] },
  paypal: { viewBox: "0 0 24 24", parts: [{ d: BRANDS.paypal.path, fill: "#003087" }] },
  payoneer: { viewBox: "0 0 22.22 21.95", parts: (BRANDS.payoneer.wordmark.renkli ?? []).slice(1) },
  binance: { viewBox: "-0.2 -0.2 26.7 27.2", parts: (BRANDS.binance.wordmark.renkli ?? []).slice(0, 1) },
};
function KanalIsaret({ brand }: { brand: BrandKey }) {
  const ik = ISARET[brand];
  if (!ik) return null;
  return (
    <svg viewBox={ik.viewBox} width="22" height="22" focusable="false">
      {ik.parts.map((p, i) => (
        <path key={i} d={p.d} fill={p.fill} />
      ))}
    </svg>
  );
}

/** Para: düz vektör disk. Mavi yüz, koyu mavi kenar, içinde açık mavi
 *  halka, ortasında simge. Geçmiş: altın disk (/lab/banka-renk) → düz mavi
 *  disk ("coin hissi gitti") → kalınlık, tırtık, parıltı ve gölgeli hâl
 *  ("çok 3d … sitede her şey 2d vector"). Burak'ın tarifi: "önceki coin
 *  tasarımının ortasına sadece dolar ekleseydin yeterdi". Bu o. */
function Para() {
  return (
    <svg viewBox="0 0 24 24" className="svb-para-y" focusable="false">
      <circle cx="12" cy="12" r="10.75" className="svb-para-yuz" />
      <circle cx="12" cy="12" r="7.6" className="svb-para-halka" />
      <text x="12" y="15.7" textAnchor="middle" className="svb-para-sim">
        $
      </text>
    </svg>
  );
}

/** Ödeme: dört kanal soldan, tek banka hesabına akıyor ve her kanaldan bir
 *  para yola çıkıp hesaba giriyor (Burak: "hepsinden ödeme geliyor
 *  gibi bir hissiyat … biraz ekşın").
 *  Bağların dikey merkezleri dört karenin merkezleri: kare 40, ara 10, liste
 *  190 → 20 · 70 · 120 · 170; SVG de 190 boyda, bağlar 95'te buluşuyor.
 *  Paraların yolu aynı eğrinin örnekleri (svc-banka.css · svbPara0..3). */
const AKIS_Y = [20, 70, 120, 170];
function SahneOdeme({ brands }: { brands: { brand: BrandKey; name: string }[] }) {
  return (
    <div className="svb-akis">
      <ul className="svb-akis-l">
        {brands.map((b, k) => (
          <li key={b.name} className="svb-akis-s" data-k={k}>
            <KanalIsaret brand={b.brand} />
          </li>
        ))}
      </ul>
      <div className="svb-akis-yolu">
        <svg viewBox="0 0 100 190" preserveAspectRatio="none" focusable="false" className="svb-akis-bag">
          {AKIS_Y.map((y, k) => (
            <path key={y} className="svb-akis-yol" data-k={k} d={`M0 ${y} C 50 ${y}, 50 95, 100 95`} />
          ))}
        </svg>
        {AKIS_Y.map((y, k) => (
          <span key={y} className="svb-para" data-k={k}>
            <Para />
          </span>
        ))}
      </div>
      <div className="svb-akis-hes">
        <span className="svb-ic">
          <Landmark size={18} strokeWidth={1.9} />
        </span>
        <b>Banka hesabınız</b>
        <span className="svb-akis-gelen">
          <ArrowDownLeft size={14} strokeWidth={2.4} />
          Gelen ödeme
        </span>
        <i />
      </div>
    </div>
  );
}

export default function DubaiBankaPage() {
  const H = B.hero;
  const K = B.bank;
  const O = B.pay;
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

        {/* --------------------------------------------------- BANKA HESABI
            Sahne (seçim listesi) solda, üç banka satırı sağda; altında
            bankanın başvuruda baktığı dört şey. Satırlardaki logolar bilgi
            taşıyor: aria-hidden DEĞİL, BrandChip kendi adını basıyor. */}
        <section id={K.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={K.heading} accent={K.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{K.lead}</p>
              </FadeUp>
            </div>

            <div className="svb-bol">
              <FadeUp className="svb-sahne" delay={0.1}>
                <div aria-hidden="true">
                  <SahneBanka />
                </div>
              </FadeUp>
              <ul className="svb-sat">
                {K.items.map((k, i) => (
                  <li key={k.name}>
                    <FadeUp className="svb-s" delay={0.12 + i * 0.05}>
                      <span className="svb-s-logo" style={renk(k.brand)}>
                        <BrandChip brand={k.brand} withName={false} optical={18} renkli />
                      </span>
                      <div>
                        <b className="svb-s-t">{k.name}</b>
                        <p className="svb-s-p">{k.line}</p>
                      </div>
                    </FadeUp>
                  </li>
                ))}
              </ul>
            </div>

            <div className="svb-bak">
              <h3 className="svb-bak-h">{K.checks.heading}</h3>
              <ul className="svb-bak-l">
                {K.checks.items.map((c, i) => {
                  const I = IKON[c.icon];
                  return (
                    <li key={c.title}>
                      <FadeUp className="svb-bak-k" delay={0.08 + i * 0.05}>
                        <span className="svb-ic" aria-hidden="true">
                          <I size={18} strokeWidth={1.9} />
                        </span>
                        <div>
                          <b>{c.title}</b>
                          <p>{c.line}</p>
                        </div>
                      </FadeUp>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------- ÖDEME VE TAHSİLAT KANALLARI
            Ayna düzen: satırlar solda, akış sahnesi sağda. Her satırın
            etiketi "ne zaman bu kanal" (ikinci geçişin rehberi). */}
        <section id={O.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={O.heading} accent={O.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{O.lead}</p>
              </FadeUp>
            </div>

            <div className="svb-bol" data-yon="ayna">
              <FadeUp className="svb-sahne" delay={0.1}>
                <div aria-hidden="true">
                  <SahneOdeme brands={O.items} />
                </div>
              </FadeUp>
              <ul className="svb-sat">
                {O.items.map((k, i) => {
                  const I = IKON[k.icon];
                  return (
                    <li key={k.name}>
                      <FadeUp className="svb-s" delay={0.12 + i * 0.05}>
                        <span className="svb-s-logo" style={renk(k.brand)}>
                          <BrandChip brand={k.brand} withName={false} optical={18} renkli />
                        </span>
                        <div>
                          <b className="svb-s-t">{k.name}</b>
                          <p className="svb-s-p">{k.line}</p>
                        </div>
                        <span className="svb-s-etiket">
                          <I size={14} strokeWidth={2} aria-hidden="true" />
                          {k.tag}
                        </span>
                      </FadeUp>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* SÜREÇ · ilk yazımın beş kartı (gerekçe bankaDubai.ts · steps):
            üstte ikon ve sıra, altında ad ve cümle. Altta kuruluş sayfasına
            bağ (banka o sürecin bir adımı). */}
        <section id={B.steps.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={B.steps.heading} accent={B.steps.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{B.steps.lead}</p>
              </FadeUp>
            </div>
            <ol className="svb-adim">
              {B.steps.items.map((st, i) => {
                const I = IKON[st.icon];
                return (
                  <li key={st.title}>
                    <FadeUp className="svb-adim-k" delay={0.1 + i * 0.06}>
                      <span className="svb-adim-bas" aria-hidden="true">
                        <span className="svb-ic">
                          <I size={18} strokeWidth={1.9} />
                        </span>
                        <span className="svb-adim-n">{String(i + 1).padStart(2, "0")}</span>
                      </span>
                      <h3 className="svb-adim-t">{st.title}</h3>
                      <p className="svb-adim-s">{st.line}</p>
                    </FadeUp>
                  </li>
                );
              })}
            </ol>
            <Link href={B.steps.exit.href} className="svb-adim-cik">
              {B.steps.exit.label}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </section>

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
