import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarClock, Check, FileCheck2, Scale } from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import { RHYTHM_LABEL } from "@/lib/afterSetup";
import { ACC_PRICE_FOOTNOTE } from "@/lib/accountingDubai";
import { SITE } from "@/lib/routes";
import {
  ALT_HIZMETLER,
  altHizmet,
  altHizmetHref,
  altHizmetKalemi,
  MUHASEBE_KOK,
} from "@/lib/muhasebeAltHizmet";

/* ============================================================================
   DUBAİ MUHASEBE · ALT HİZMET SAYFALARI — /dubai/muhasebe/[alt]

   15.09.2026 · marketing listesi, madde 14: "Muhasebe alt hizmetlerini
   zamanla ayrı sayfalara bölelim: Dubai Bookkeeping, VAT Registration,
   Corporate Tax Registration, VAT Return, Audit gibi. SEO tarafında daha iyi
   sonuç alırız." Burak bu maddeyi "kesinlikle ele alınsın" diye seçti.

   NEDEN ALTI SAYFA, BEŞ DEĞİL: sayfalar muhasebe sayfasının FİYAT LİSTESİNİN
   altı kalemiyle birebir (accountingDubai.ts · ACCOUNTING_ITEM_IDS). Listede
   beş ad vardı; altıncı "Mali yıl sonu ve kurumlar vergisi beyanı", çünkü o da
   ayrı fiyatlanan, ayrı aranan bir iş ("dubai kurumlar vergisi beyannamesi")
   ve dışarıda bırakılsaydı fiyat listesinin bir satırı sayfasız kalırdı.
   Birebirliğin pratik sonucu: her sayfanın bedeli kalemin KENDİ satırından
   okunuyor (afterSetup.ts), yani fiyat üç yerde değil tek yerde yazılı.

   NEDEN /dubai/muhasebe ALTINDA: adres ağacı sayfanın konusunu söylüyor
   (Dubai → muhasebe → KDV kaydı) ve kırıntı ile BreadcrumbList bunu aynen
   taşıyor. /dubai/kdv-kaydi olsaydı /dubai/[hizmet] dinamik rotasıyla aynı
   düzeyde, "şirket kuruluşu"nun kardeşi gibi dururdu.

   ŞABLON TEK, METİN VERİDE. Ekranda görünen her cümle lib/muhasebeAltHizmet.ts'te;
   mevzuat cümlelerinin her birinin dayanağı ve kaynağı orada yazılı.

   SIRA: hero (tanım + bedel + tek eylem) → ne zaman gerekiyor (dayanaklı
   olgular) → nasıl yürüyor (adımlar) → sizden / bizden → bedeli → SSS →
   diğer muhasebe hizmetleri → kapanış. Ana muhasebe sayfasının dili
   (sec-head · SplitWords · FadeUp · gece fiyat bandı); yeni ad alanı .mah-.
   ========================================================================= */

type Params = Promise<{ alt: string }>;

export function generateStaticParams() {
  return ALT_HIZMETLER.map((h) => ({ alt: h.slug }));
}

/* Listede olmayan bir adres 404: dinamik parametre kapalı, uydurma bir alt
   hizmet sayfası üretilemesin. */
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { alt } = await params;
  const h = altHizmet(alt);
  if (!h) return {};
  const url = `${SITE}${altHizmetHref(h.slug)}`;
  return {
    title: h.seo.title,
    description: h.seo.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      siteName: "Ortac Global",
      url,
      title: h.seo.title,
      description: h.seo.description,
    },
  };
}

const nf = new Intl.NumberFormat("tr-TR");

export default async function AltHizmetSayfasi({ params }: { params: Params }) {
  const { alt } = await params;
  const h = altHizmet(alt);
  if (!h) notFound();

  const kalem = altHizmetKalemi(h);
  const url = `${SITE}${altHizmetHref(h.slug)}`;
  const kardesler = ALT_HIZMETLER.filter((k) => k.slug !== h.slug);

  const tutar = kalem
    ? `${kalem.price.qualifier ? `${kalem.price.qualifier} ` : ""}${nf.format(kalem.price.usd)} USD`
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Dubai", item: `${SITE}/dubai` },
          { "@type": "ListItem", position: 3, name: "Muhasebe", item: `${SITE}${MUHASEBE_KOK}` },
          { "@type": "ListItem", position: 4, name: h.kisaAd, item: url },
        ],
      },
      {
        /* offers YOK: ana muhasebe sayfasındaki gerekçeyle aynı — tutarların
           yarısı "başlangıç" nitelikli ve yapılandırılmış veride tek bir fiyat
           o niteliği düşürürdü. */
        "@type": "Service",
        name: h.seo.serviceName,
        serviceType: "Muhasebe ve vergi uyumu",
        url,
        provider: { "@type": "Organization", name: "Ortac Global", url: SITE },
        areaServed: { "@type": "Place", name: "Dubai" },
        description: h.seo.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: h.sss.map((f) => ({
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

        {/* HERO · muhasebe sayfasının split hero'su. Sağdaki kart bir SAHNE
            değil, sayfanın KÜNYESİ: dört satırda "kim için · ne zaman · ne
            sıklıkla · bedeli". Ziyaretçi arama sonucundan geldiğinde ilk
            sorduğu dört şey bu ve cevapları sayfanın aşağısında ayrıntılı. */}
        <PageHero
          crumb={`Dubai · Muhasebe · ${h.kisaAd}`}
          title={h.hero.title}
          accent={h.hero.accent}
          lead={h.hero.lead}
          cta={{ label: "Teklif isteyin", href: "/basla" }}
          art={
            <aside className="mah-kunye" aria-labelledby="mah-kunye-t">
              <p id="mah-kunye-t" className="mah-kunye-ust">
                Bir bakışta
              </p>
              <dl>
                {h.kunye.map((r) => (
                  <div key={r.k}>
                    <dt>{r.k}</dt>
                    <dd>{r.v}</dd>
                  </div>
                ))}
                {kalem && (
                  <div className="mah-kunye-bedel">
                    <dt>Bedeli</dt>
                    <dd>
                      <b>{tutar}</b>
                      <span>
                        {kalem.price.unit}
                        {kalem.price.plusVat ? " · KDV hariç" : ""}
                      </span>
                    </dd>
                  </div>
                )}
              </dl>
            </aside>
          }
        />

        {/* NE ZAMAN GEREKİYOR · her kart bir olgu + dayanağı. Dayanak kartın
            dibinde ve AÇIK: mevzuat cümlesini niteleyen şey (hangi karar, hangi
            madde) tıklamanın arkasına konmuyor (ana sayfanın NE GİZLENMEZ
            kuralı). */}
        <section className="sec-pad mah-sec" aria-labelledby="mah-ne-zaman">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                id="mah-ne-zaman"
                text={h.neZaman.heading}
                accent={h.neZaman.accent}
                className="h2"
              />
              {h.neZaman.lead && (
                <FadeUp delay={0.2}>
                  <p className="sec-lead">{h.neZaman.lead}</p>
                </FadeUp>
              )}
            </div>
            <ul className="mah-olgu">
              {h.neZaman.items.map((o, i) => (
                <li key={o.title}>
                  <FadeUp className="mah-olgu-in" delay={0.06 + i * 0.05}>
                    <Scale size={20} strokeWidth={1.9} aria-hidden="true" />
                    <b>{o.title}</b>
                    <span>{o.line}</span>
                    {o.dayanak && <small>{o.dayanak}</small>}
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* NASIL YÜRÜYOR · numaralı adımlar. Süre YOK: firma kesin süre
            taahhüdü vermiyor (brand.ts · STANCE_LIMITS); yazılı tek süreler
            mevzuatın kendi takvimi ve onlar yukarıdaki olgu kartlarında. */}
        <section className="sec-pad mah-sec mah-sec-gri" aria-labelledby="mah-surec">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" id="mah-surec" text={h.surec.heading} accent={h.surec.accent} className="h2" />
            </div>
            <ol className="mah-adim">
              {h.surec.adimlar.map((a, i) => (
                <li key={a.title}>
                  <FadeUp className="mah-adim-in" delay={0.06 + i * 0.05}>
                    <span className="mah-adim-n data" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <b>{a.title}</b>
                    <span>{a.line}</span>
                  </FadeUp>
                </li>
              ))}
            </ol>

            <div className="mah-takas">
              <FadeUp className="mah-takas-kol" delay={0.1}>
                <h3>
                  <FileCheck2 size={18} strokeWidth={1.9} aria-hidden="true" />
                  Sizden istenenler
                </h3>
                <ul>
                  {h.sizden.map((x) => (
                    <li key={x}>
                      <Check size={15} strokeWidth={2.2} aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </FadeUp>
              <FadeUp className="mah-takas-kol" delay={0.16}>
                <h3>
                  <CalendarClock size={18} strokeWidth={1.9} aria-hidden="true" />
                  Hizmete dahil olanlar
                </h3>
                <ul>
                  {(kalem?.scope && kalem.scope.length > 0 ? kalem.scope : h.bizden).map((x) => (
                    <li key={x}>
                      <Check size={15} strokeWidth={2.2} aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* BEDELİ · kalemin kendi satırı (afterSetup.ts). Not ve yasal çerçeve
            açıkta; tam fiyat listesine bağlantı ana sayfanın #fiyat çapası. */}
        {kalem && (
          <section className="sec-pad sec-night" aria-labelledby="mah-bedel-t">
            <div className="container-o">
              <div className="sec-head sec-head-dark">
                <SplitWords
                  as="h2"
                  id="mah-bedel-t"
                  text={`${h.kisaAd} bedeli.`}
                  accent="bedeli."
                  className="h2"
                  style={{ color: "#ffffff" }}
                />
              </div>
              <FadeUp delay={0.1}>
                <div className="mah-bedel-kart">
                  <div className="mah-bedel-ust">
                    <span className="mah-bedel-ad">
                      <b>{kalem.title}</b>
                      {kalem.en && <em>{kalem.en}</em>}
                    </span>
                    <span className="mah-bedel-tutar data">
                      {tutar}
                      <i>
                        {RHYTHM_LABEL[kalem.rhythm]}
                        {kalem.price.plusVat ? " · + KDV" : ""}
                      </i>
                    </span>
                  </div>
                  {kalem.line && <p>{kalem.line}</p>}
                  {kalem.note && (
                    <p className="mah-bedel-not">
                      <b>Not:</b> {kalem.note}
                    </p>
                  )}
                  <p className="mah-bedel-yasal">{ACC_PRICE_FOOTNOTE}</p>
                </div>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p className="mah-bedel-alt">
                  <SmartLink href={`${MUHASEBE_KOK}#fiyat`}>Muhasebe hizmetinin bütün kalemleri</SmartLink>
                </p>
              </FadeUp>
            </div>
          </section>
        )}

        <section className="sec-pad mah-sec" aria-labelledby="mah-sss">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" id="mah-sss" text="Sık sorulanlar." accent="sorulanlar." className="h2" />
            </div>
            <CountryFaq items={h.sss} />
          </div>
        </section>

        {/* DİĞER MUHASEBE HİZMETLERİ · beş kardeş + ana sayfa. İç bağlantı
            ağı SEO işinin yarısı: altı sayfa birbirine ve muhasebe sayfasına
            bağlı, hiçbiri yetim değil. */}
        <section className="sec-pad mah-sec mah-sec-gri" aria-labelledby="mah-diger">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                id="mah-diger"
                text="Diğer muhasebe hizmetleri."
                accent="muhasebe hizmetleri."
                className="h2"
              />
            </div>
            <ul className="mah-diger">
              {kardesler.map((k) => (
                <li key={k.slug}>
                  <SmartLink href={altHizmetHref(k.slug)} className="mah-diger-a">
                    <b>{k.kisaAd}</b>
                    <span>{k.ozet}</span>
                  </SmartLink>
                </li>
              ))}
              <li>
                <SmartLink href={MUHASEBE_KOK} className="mah-diger-a mah-diger-kok">
                  <b>Dubai muhasebe hizmeti</b>
                  <span>Kapsam, takvim ve altı kalemin tamamı tek sayfada.</span>
                </SmartLink>
              </li>
            </ul>
          </div>
        </section>

        <FinalCta kapanis={{ ...h.kapanis, cta: { label: "Teklif isteyin", href: "/basla" } }} />
      </main>
    </>
  );
}
