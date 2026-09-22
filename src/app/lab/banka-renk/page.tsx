/* LAB · YEDEK · /lab/banka-renk — 22.09.2026
   Banka sayfasının "renk katılmış" hâli (89c2c72): logolar marka renginde ve
   kuyuları rengin açığında, ödeme sahnesinde altın paralar. Burak: "güzel de
   sitenin kalan diline aykırı … bunu yine bir yerde backup tut … belki
   sitenin diline bu tarz renk katmalar yapabiliriz, SVG taraflarını en
   azından bir tık daha canlandırabiliriz." Canlı sayfa site diline döndü;
   bu hâl ileride SVG'lere renk katarken referans.
   Sınıflar .lbr- (css/lab-banka-renk.css), keyframe'ler lbr*. Veri o anki
   bankaDubai.ts'in kopyası (./veri). Hero kartı canlıyla ortak. */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Bitcoin,
  Briefcase,
  ChartColumn,
  Coins,
  CreditCard,
  FileText,
  ArrowDownLeft,
  ArrowUpRight,
  Globe,
  Landmark,
  Receipt,
  RefreshCw,
  Store,
  Truck,
  Users,
} from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { BrandChip } from "@/components/shared/BrandMark";
import type { BrandKey } from "@/lib/brands";
import CountryProcess from "@/components/CountryProcess";
import CountryDocs from "@/components/CountryDocs";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import BankaHeroCard from "@/components/services/BankaHeroCard";
import { BANKA_DUBAI as B, type BankaIkon } from "./veri";

/* ============================================================================
   DUBAİ · BANKA & ÖDEME — /dubai/banka-hesabi
   Metin: lib/bankaDubai.ts (kaynak düzeni ve teyit bekleyenler orada) ·
   Biçim: css/svc-banka.css (.lbr-) · Hero kartı: services/BankaHeroCard.tsx

   Bu sayfa /dubai'nin (şirket kuruluşu) BANKA ADIMININ AYRINTISI, kendi
   başına bir ürün değil. Beş durak:

     hero       HeroSceneCard iskeleti (kuruluş ve muhasebeyle kardeş)
     banka      kurumsal banka hesabı: sahne + üç banka satırı + "bankanın
                başvuruda baktığı şeyler"
     ödeme      ödeme ve tahsilat kanalları: ayna düzen, dört kanal satırı,
                her birinde "ne zaman" etiketi
     süreç      sitenin standart aşama bileşeni (CountryProcess)
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

   KAPALI SAYFA. Adres lib/routes.ts · STATIC_LIVE'da DEĞİL: menü ve zincir
   bağlantıları sönük, sayfa yalnız doğrudan adresle açılıyor ve noindex.
   Onay gelince: STATIC_LIVE'a ekle, robots'u kaldır, /dubai'nin banka
   kartından ve adımından buraya bağlantı ver.

   STATİK KLASÖR, DİNAMİK ŞABLONU EZİYOR (app/dubai/[hizmet]; muhasebe de
   böyle). */

export const metadata: Metadata = {
  title: "Banka sayfası · renkli hâl (yedek) | Ortac Global",
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
  dunya: Globe,
  faaliyet: Briefcase,
  ortak: Users,
  kaynak: Coins,
  hacim: ChartColumn,
};

/* ------------------------------------------------------------ MARKA RENGİ
   22.09.2026 · Burak: "tüm logolar siyah koyduğumuz için biraz garip duruyor
   … kendi renklerini koyarak çözebiliriz". Lockup'lar tek tonlu ve mürekkebi
   currentColor (lib/brands.ts), yani rengi kuyunun `color`'ı veriyor; kuyu
   zemini aynı rengin açığı. color-mix yerine açık hex: depoda canlı yüzeyde
   color-mix yok (kaynaklar.css notu).
   Stripe · PayPal · Payoneer · Binance markaların yayımladığı renkler.
   SWAP:MARKA_RENK — Wio, Mashreq ve Emirates NBD YAKLAŞIK; müşterinin marka
   dosyasıyla teyit edilecek. Binance kendi dilinde: koyu zeminde sarı.
   Yalnız bu sayfada; sitenin öteki logo şeritleri tek tonlu kalıyor. */
const MARKA_RENK: Partial<Record<BrandKey, { ink: string; zemin: string }>> = {
  wio: { ink: "#5a34e0", zemin: "#efebfc" },
  mashreq: { ink: "#e8580c", zemin: "#fdeee5" },
  emiratesnbd: { ink: "#0a3161", zemin: "#e8edf4" },
  stripe: { ink: "#635bff", zemin: "#efeeff" },
  payoneer: { ink: "#ff4800", zemin: "#ffede5" },
  paypal: { ink: "#003087", zemin: "#e8edf6" },
  binance: { ink: "#f0b90b", zemin: "#181a20" },
};
function renk(brand: BrandKey): CSSProperties | undefined {
  const r = MARKA_RENK[brand];
  return r ? ({ "--mk": r.ink, "--mk-z": r.zemin } as CSSProperties) : undefined;
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
    <div className="lbr-hsp">
      <div className="lbr-hsp-bas">
        <span className="lbr-hsp-ic">
          <Landmark size={18} strokeWidth={1.9} />
        </span>
        <span className="lbr-hsp-ad">
          <b>Şirket hesabı</b>
          <small>AE•• •••• •••• ••••</small>
        </span>
        <span className="lbr-hsp-rozet">Kurumsal</span>
      </div>
      <ul className="lbr-hsp-l">
        {HESAP_GIDER.map(({ ad, I }) => (
          <li key={ad} className="lbr-hsp-s">
            <span className="lbr-hsp-si">
              <I size={15} strokeWidth={2} />
            </span>
            <b>{ad}</b>
            <i />
            <ArrowUpRight className="lbr-hsp-ok" size={16} strokeWidth={2.2} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Ödeme: dört kanal soldan, tek banka hesabına akıyor ve her kanaldan bir
 *  PARA yola çıkıp hesaba giriyor (Burak: "hepsinden ödeme geliyor gibi bir
 *  hissiyat … coin … banka hesabına doğru giriş yapar … biraz ekşın").
 *  Bağların dikey merkezleri dört satırın merkezleri: satır 36, ara 10,
 *  liste 174 → 18 · 64 · 110 · 156; SVG de 174 boyda. Paraların yolu aynı
 *  eğrinin örnekleri (svc-banka.css · svbPara0..3). */
const AKIS_Y = [18, 64, 110, 156];
function SahneOdeme({ brands }: { brands: { brand: BrandKey; name: string }[] }) {
  return (
    <div className="lbr-akis">
      <ul className="lbr-akis-l">
        {brands.map((b, k) => (
          <li key={b.name} className="lbr-akis-s" data-k={k} style={renk(b.brand)}>
            <BrandChip brand={b.brand} withName={false} optical={14} />
          </li>
        ))}
      </ul>
      <div className="lbr-akis-yolu">
        <svg viewBox="0 0 100 174" preserveAspectRatio="none" focusable="false" className="lbr-akis-bag">
          {AKIS_Y.map((y, k) => (
            <path key={y} className="lbr-akis-yol" data-k={k} d={`M0 ${y} C 50 ${y}, 50 87, 100 87`} />
          ))}
        </svg>
        {AKIS_Y.map((y, k) => (
          <span key={y} className="lbr-para" data-k={k} />
        ))}
      </div>
      <div className="lbr-akis-hes">
        <span className="lbr-ic">
          <Landmark size={18} strokeWidth={1.9} />
        </span>
        <b>Banka hesabınız</b>
        <span className="lbr-akis-gelen">
          <ArrowDownLeft size={14} strokeWidth={2.4} />
          Gelen ödeme
        </span>
        <i />
      </div>
    </div>
  );
}

export default function BankaRenkLab() {
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

            <div className="lbr-bol">
              <FadeUp className="lbr-sahne" delay={0.1}>
                <div aria-hidden="true">
                  <SahneBanka />
                </div>
              </FadeUp>
              <ul className="lbr-sat">
                {K.items.map((k, i) => (
                  <li key={k.name}>
                    <FadeUp className="lbr-s" delay={0.12 + i * 0.05}>
                      <span className="lbr-s-logo" style={renk(k.brand)}>
                        <BrandChip brand={k.brand} withName={false} optical={18} />
                      </span>
                      <div>
                        <b className="lbr-s-t">{k.name}</b>
                        <p className="lbr-s-p">{k.line}</p>
                      </div>
                    </FadeUp>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lbr-bak">
              <h3 className="lbr-bak-h">{K.checks.heading}</h3>
              <ul className="lbr-bak-l">
                {K.checks.items.map((c, i) => {
                  const I = IKON[c.icon];
                  return (
                    <li key={c.title}>
                      <FadeUp className="lbr-bak-k" delay={0.08 + i * 0.05}>
                        <span className="lbr-ic" aria-hidden="true">
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

            <div className="lbr-bol" data-yon="ayna">
              <FadeUp className="lbr-sahne" delay={0.1}>
                <div aria-hidden="true">
                  <SahneOdeme brands={O.items} />
                </div>
              </FadeUp>
              <ul className="lbr-sat">
                {O.items.map((k, i) => {
                  const I = IKON[k.icon];
                  return (
                    <li key={k.name}>
                      <FadeUp className="lbr-s" delay={0.12 + i * 0.05}>
                        <span className="lbr-s-logo" style={renk(k.brand)}>
                          <BrandChip brand={k.brand} withName={false} optical={18} />
                        </span>
                        <div>
                          <b className="lbr-s-t">{k.name}</b>
                          <p className="lbr-s-p">{k.line}</p>
                        </div>
                        <span className="lbr-s-etiket">
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
