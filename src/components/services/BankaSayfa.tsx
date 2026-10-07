import type { CSSProperties } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  Bitcoin,
  Ban,
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
import { BRANDS, type Brand, type BrandKey } from "@/lib/brands";
import KanalIsaret from "@/components/shared/KanalIsaret";
import CountryDocs from "@/components/CountryDocs";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import type { BankaIkon, BankaVeri, BankaSahneKaro } from "@/lib/bankaDubai";

/* ============================================================================
   BANKA & ÖDEME SAYFASI · ortak gövde (07.10.2026)
   /dubai/banka-hesabi ve /kktc/banka-hesabi aynı bölümleri basıyor: giriş,
   kurumsal hesap (sahne + satırlar + bankanın baktıkları), ödeme ve
   tahsilat, süreç, belgeler, SSS. Burak: "Kıbrıs'ta çok boş … Dubai'deki
   section'ları bir bak, aynıları Kıbrıs'ta da olsun … paralel git."
   Gövde Dubai sayfasının dosyasından (app/dubai/banka-hesabi/page.tsx)
   buraya TAŞINDI; işaretleme ve sınıflar aynı (.svb-, css/svc-banka.css).
   Metin: lib/bankaDubai.ts · lib/bankaKktc.ts (kaynak düzeni oralarda).

   KKTC FARKLARI, veriden: banka satırlarında marka yok (ikon), ödeme
   sahnesinin karoları marka yerine kart ve para birimi, "çalışmıyor"
   satırları amber etiketli (yok). */

/* PageHero istemci bileşeni, bu sayfa sunucu bileşeni: lucide bileşeninin
   kendisi sınırı geçemez, çizilmiş düğüm geçer. */
/* 25.09.2026 · RENK KURALI (Burak: "banka ve muhasebe sayfalarına renk
   uygula"; kural: ağırlık mavide, para yeşil, şart ve önemli not amber).
   İkon kuyusunun tonu ikonun anlamından: bankanın baktığı "paranın kaynağı"
   ve "beklenen hacim", adımlardaki "ödeme kanalları" para, yeşil; "bankanın
   kararı" önemli not (karar bankanın), amber. Kalanlar mavi. Kural
   css/advx-renk.css'te. */
const TON: Partial<Record<BankaIkon, "yesil" | "amber">> = {
  kaynak: "yesil",
  hacim: "yesil",
  kanal: "yesil",
  karar: "amber",
  yok: "amber",
};

const IKON: Record<BankaIkon, LucideIcon> = {
  banka: Landmark,
  nakit: Banknote,
  yok: Ban,
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
const GIDER_IKON = [Truck, Users, Receipt, FileText];
function SahneBanka({ hesap }: { hesap: BankaVeri["bank"]["hesap"] }) {
  return (
    <div className="svb-hsp">
      <div className="svb-hsp-bas">
        <span className="svb-hsp-ic">
          <Landmark size={18} strokeWidth={1.9} />
        </span>
        <span className="svb-hsp-ad">
          <b>Şirket hesabı</b>
          <small>{hesap.alt}</small>
        </span>
        <span className="svb-hsp-rozet">Kurumsal</span>
      </div>
      <ul className="svb-hsp-l">
        {hesap.giderler.map((ad, gi) => {
          const I = GIDER_IKON[gi % GIDER_IKON.length];
          return (
          <li key={ad} className="svb-hsp-s">
            <span className="svb-hsp-si">
              <I size={15} strokeWidth={2} />
            </span>
            <b>{ad}</b>
            <i />
            <ArrowUpRight className="svb-hsp-ok" size={16} strokeWidth={2.2} />
          </li>
          );
        })}
      </ul>
    </div>
  );
}

/* Kanalın kare işareti: shared/KanalIsaret (23.09.2026'da İngiltere'nin
   ödeme sahnesiyle ortak olsun diye buradan taşındı). */

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
/* Karo: marka işareti (Dubai), ikon ya da kısa yazı (KKTC'de ₺ € $). Sahne
   dört yol çiziyor (AKIS_Y, CSS data-k 0..3); karo sayısı da dört. */
function Karo({ k }: { k: BankaSahneKaro }) {
  if ("brand" in k) return <KanalIsaret brand={k.brand} />;
  if ("icon" in k) {
    const I = IKON[k.icon];
    return <I size={20} strokeWidth={1.9} aria-hidden="true" />;
  }
  return <b className="svb-akis-yazi">{k.yazi}</b>;
}
function SahneOdeme({ karolar }: { karolar: BankaSahneKaro[] }) {
  return (
    <div className="svb-akis">
      <ul className="svb-akis-l">
        {karolar.slice(0, 4).map((b, k) => (
          <li key={k} className="svb-akis-s" data-k={k}>
            <Karo k={b} />
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

/* Satırın sol kutusu: marka varsa logosu, yoksa ikon (KKTC'de banka adı
   yazmıyoruz; belge "yerel bankalar" diyor). */
function SatirLogo({ brand, logo }: { brand?: BrandKey; logo?: BankaIkon }) {
  /* dosyadan gelen logolar (FAB, Amazon Payment Services, Network
     International · public/brands): BrandChip bunları çizemiyor, baş harfe
     düşüyordu; dosyanın kendisi basılıyor. */
  const dosya = brand ? (BRANDS[brand] as Brand).dosya : undefined;
  if (brand && dosya)
    return (
      <span className="svb-s-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="svb-s-dosya" src={dosya.src} alt={BRANDS[brand].title} />
      </span>
    );
  if (brand)
    return (
      <span className="svb-s-logo" style={renk(brand)}>
        <BrandChip brand={brand} withName={false} optical={18} renkli />
      </span>
    );
  const I = IKON[logo ?? "secim"];
  return (
    <span className="svb-s-logo svb-s-logo-ik" aria-hidden="true">
      <I size={20} strokeWidth={1.9} />
    </span>
  );
}

export default function BankaSayfa({ veri: B }: { veri: BankaVeri }) {
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
          /* `art` yalnız "foto giriş dalı" demek; sahne kartı artık basılmıyor.
             Boş fragment sunucudan istemciye boş geçiyor ve sayfa dar
             başlığa düşüyor (derlemede görüldü); o yüzden gerçek bir düğüm. */
          art={<i hidden />}
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
                  <SahneBanka hesap={K.hesap} />
                </div>
              </FadeUp>
              <ul className="svb-sat">
                {K.items.map((k, i) => (
                  <li key={k.name}>
                    <FadeUp className="svb-s" delay={0.12 + i * 0.05}>
                      <SatirLogo brand={k.brand} logo={k.logo} />
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
                        <span className="svb-ic" data-ton={TON[c.icon]} aria-hidden="true">
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
                  <SahneOdeme karolar={O.sahne} />
                </div>
              </FadeUp>
              <ul className="svb-sat">
                {O.items.map((k, i) => {
                  const I = IKON[k.icon];
                  return (
                    <li key={k.name}>
                      <FadeUp className="svb-s" delay={0.12 + i * 0.05}>
                        <SatirLogo brand={k.brand} logo={k.logo} />
                        <div>
                          <b className="svb-s-t">{k.name}</b>
                          <p className="svb-s-p">{k.line}</p>
                        </div>
                        <span className="svb-s-etiket" data-yok={k.yok ? "" : undefined}>
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

        {/* SÜREÇ · beş adım alt alta satır (vize sayfasında denendi, Burak
            "sen karar ver" dedi, iki sayfaya da geçti). Altta kuruluş
            sayfasına bağ (banka o sürecin bir adımı). */}
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
                      <span className="svb-ic svb-adim-ic" data-ton={TON[st.icon]} aria-hidden="true">
                        <I size={18} strokeWidth={1.9} />
                      </span>
                      <span className="svb-adim-n" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
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
          name={B.ulke}
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
