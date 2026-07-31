import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  CreditCard,
  Landmark,
  Minus,
  Repeat,
  ShieldCheck,
  Tag,
  TriangleAlert,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import { BrandGlyph } from "@/components/shared/BrandMark";
import { Flag } from "@/components/shared/CountryPicker";
import FinalCta from "@/components/FinalCta";
import {
  payGroupsFor,
  sectorFor,
  sectorHref,
  SECTOR_SLUGS,
  type SectorCountry,
  type SectorIcon,
} from "@/lib/sectors";
import { COUNTRY_LABELS } from "@/lib/store";

/* ============================================================================
   SEKTÖR İÇ SAYFASI — /sektorler/[sektor]

   Bu dosyada tek bir cümle yok: sayfada görünen her kelime lib/sectors.ts'te
   duruyor. Şablon yalnızca o veriyi sitenin diliyle diziyor. İkinci sektör
   eklendiğinde buraya dokunulmuyor.

   Sayfanın var olma sebebi arama: insanlar "dubaide yazılım şirketi kurmak"
   diye ülke ve sektörü birlikte arıyor, ana sayfadaki bir kart bu sorguyu
   karşılayamıyor. Bu yüzden yapının üç kuralı var ve üçü de estetik değil,
   işlevsel:

   1. Sayfada tek h1 (PageHero) — sektörün kendisi.
   2. Her ülke kendi <section id="…"> bloğunda ve başlığı h2. h2 metni
      aranan cümlenin birebir kendisi ("Dubai'de yazılım şirketi kurmak"),
      çünkü arama sonucunda sayfa içi bağlantı olarak da o satır çıkıyor.
   3. Her ülke bloğu ilgili ülke ve hizmet sayfalarına iç bağlantı veriyor.
      SmartLink kullanılıyor: yayında olmayan bir adres ortaya çıkarsa ölü
      bağlantı değil, sönük "yakında" rozeti oluyor.

   Akış "özet önde, ayrıntı talep üzerine" ilkesine uyuyor: dört başlık
   bölümünde ayrıntı <details> içinde kapalı duruyor, ülke blokları ise kısa
   listeler hâlinde — metin duvarı yok.
   ========================================================================= */

type Params = Promise<{ sektor: string }>;

/* Şimdilik tek slug üretiyor. sectors.ts'e ikinci sektör girdiği anda burası
   kendiliğinden iki sayfa üretmeye başlıyor. */
export function generateStaticParams() {
  return SECTOR_SLUGS.map((sektor) => ({ sektor }));
}

/* Kanonik adres mutlak yazılıyor: layout.tsx'te metadataBase tanımlı değil,
   göreli bir kanonik geliştirme sunucusunun adresine çözülürdü. Alan adı
   layout.tsx'teki JSON-LD ile aynı kaynaktan. */
const SITE = "https://ortacglobal.com";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { sektor } = await params;
  const s = sectorFor(sektor);
  if (!s) return {};

  const url = `${SITE}${sectorHref(s.slug)}`;
  return {
    title: s.seo.title,
    description: s.seo.description,
    alternates: { canonical: url },
    /* keywords meta'sı bilerek yok: arama motorları yıllardır yok sayıyor ve
       sayfada zaten karşılığı olan kelimeleri ikinci kez listelemek hiçbir şey
       kazandırmıyor. Sorguların karşılığı başlıklarda ve metnin kendisinde. */
    openGraph: {
      type: "article",
      locale: "tr_TR",
      siteName: "Ortac Global",
      url,
      title: s.seo.title,
      description: s.seo.description,
    },
  };
}

/* sectors.ts ikon adını string taşıyor (bkz. oradaki gerekçe); eşleme burada */
const TOPIC_ICON: Record<SectorIcon, LucideIcon> = {
  users: Users,
  repeat: Repeat,
  shield: ShieldCheck,
  tag: Tag,
};

/* PAY_MATRIX'in üç grubu. Başlık metni matristen geliyor, ikon buradan. */
const PAY_ICON: Record<string, LucideIcon> = {
  "Banka hesabı": Landmark,
  "Ödeme kuruluşu": Wallet,
  Tahsilat: CreditCard,
};

/* ---------------------------------------------------------------- ülke bloğu

   Ayrı bir bileşen çünkü üç kez basılıyor ve sayfanın gövdesi tek okumada
   anlaşılsın istiyoruz. Kendi <section id>'si var: /sektorler/…#dubai
   doğrudan buraya iniyor. */
function CountryBlock({ data, sector }: { data: SectorCountry; sector: string }) {
  const name = COUNTRY_LABELS[data.country];
  const pay = payGroupsFor(data.country);

  return (
    <section id={data.country} className="sx-c" aria-labelledby={`${data.country}-h`}>
      <div className="container-o">
        <div className="sx-c-head">
          <span className="sx-c-flag" aria-hidden="true">
            <Flag country={data.country} />
          </span>
          <div className="sx-c-title" id={`${data.country}-h`}>
            <SplitWords
              as="h2"
              text={data.heading}
              accent={data.accent}
              className="h2 sx-h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.15}>
              <p className="sec-lead">{data.lead}</p>
            </FadeUp>
          </div>
        </div>

        <div className="sx-c-grid">
          {/* sol: neden burası + künye */}
          <FadeUp delay={0.1} className="sx-cell">
            <div className="sx-panel">
              <h3 className="sx-ph">{sector} için burada ne anlamlı?</h3>
              <ul className="sx-fit">
                {data.fit.map((f) => (
                  <li key={f}>
                    <i aria-hidden="true">
                      <Check size={12} strokeWidth={3.4} />
                    </i>
                    {f}
                  </li>
                ))}
              </ul>

              <dl className="sx-facts">
                {data.facts.map((f) => (
                  <div className="sx-fact" key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>
                      <b>{f.value}</b>
                      {f.note && <span>{f.note}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeUp>

          {/* sağ: tahsilat kanalları — tablodan okunuyor, elle yazılmıyor */}
          <FadeUp delay={0.18} className="sx-cell">
            <div className="sx-panel sx-pay">
              <h3 className="sx-ph">Tahsilat kanalları</h3>
              {pay.map((g) => {
                const Icon = PAY_ICON[g.title];
                return (
                  <div className="sx-pg" key={g.title}>
                    <p className="sx-pg-h">
                      {Icon && <Icon size={14} strokeWidth={2} aria-hidden="true" />}
                      <b>{g.title}</b>
                      <i>{g.hint}</i>
                    </p>
                    <ul className="sx-chips">
                      {g.open.map((r) => (
                        <li key={r.name} data-on="yes">
                          {r.brand && <BrandGlyph brand={r.brand} size={14} />}
                          {r.name}
                        </li>
                      ))}
                      {/* kapalı kanal gizlenmiyor: KKTC'nin asıl bilgisi bu */}
                      {g.shut.map((r) => (
                        <li key={r.name} data-on="no">
                          <Minus size={12} strokeWidth={3} aria-hidden="true" />
                          {r.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              <p className="sx-pnote">
                Kaynak: ödeme altyapısı tablosu. Hesabı açan kurum bankadır; onay garantisi
                vermiyoruz.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Dürüst kısıt her ülkede zorunlu ve açıkta duruyor — <details> içine
            koymuyoruz. "Özet önde, detay talep üzerine" ilkesi bilgiyi
            saklamak için değil, sırayı düzenlemek için; kısıtı tıklanmadan
            görünmez yapmak firmanın duruşuna aykırı olurdu. */}
        <FadeUp delay={0.24}>
          <div className="sx-limit">
            <span className="sx-limit-ic" aria-hidden="true">
              <TriangleAlert size={15} strokeWidth={2.1} />
            </span>
            <div>
              <h3 className="sx-ph">{name} tarafında dürüst kısıt</h3>
              <ul>
                {data.limits.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <nav className="sx-links" aria-label={`${name} sayfaları`}>
            {data.links.map((l) => (
              <SmartLink key={l.href} href={l.href} className="sx-link">
                {l.label}
                <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
              </SmartLink>
            ))}
          </nav>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- sayfa */

export default async function SectorPage({ params }: { params: Params }) {
  const { sektor } = await params;
  const s = sectorFor(sektor);
  if (!s) notFound();

  const url = `${SITE}${sectorHref(s.slug)}`;

  /* JSON-LD — yalnızca sayfada zaten yazan şeyler. Uydurma alan yok:
     puan, yorum sayısı, fiyat ve süre iddiası taşımıyor. BreadcrumbList iki
     basamaklı çünkü bir /sektorler dizin sayfası henüz yok; olmayan bir
     adrese basamak vermek kırık işaretleme olurdu. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: s.name, item: url },
        ],
      },
      {
        "@type": "Service",
        name: `${s.name} şirketleri için yurt dışında şirket kuruluşu`,
        serviceType: s.name,
        url,
        provider: { "@type": "Organization", name: "Ortac Global", url: SITE },
        areaServed: s.countries.map((c) => ({
          "@type": "Place",
          name: COUNTRY_LABELS[c.country],
        })),
      },
    ],
  };

  return (
    <>
      <Nav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* country VERİLMİYOR: PageHero o zaman kompakt başlık bloğunu
            basıyor. İki sütunlu hero ülke sayfalarına ait ve buradaki sahne
            tek bir ülkeyi öne çıkarırdı — oysa sayfanın iddiası tam tersi. */}
        <PageHero
          crumb={s.hero.crumb}
          title={s.hero.title}
          accent={s.hero.accent}
          lead={s.hero.lead}
        />

        {/* ---------- 1 · sektörün genel çerçevesi ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={s.frame.heading}
                accent={s.frame.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{s.frame.lead}</p>
              </FadeUp>
            </div>

            <div className="sx-points">
              {s.frame.points.map((p, i) => (
                <FadeUp key={p.title} delay={0.12 + i * 0.06}>
                  <article className="sx-point">
                    <span className="sx-point-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.line}</p>
                  </article>
                </FadeUp>
              ))}
            </div>

            {/* Sayfa içi atlama şeridi. İki işi var: ziyaretçi aradığı ülkeye
                tek tıkla iniyor, ve üç ülke bölümünün adresleri sayfanın
                kendi metninde geçiyor — arama tarafında bölüm bağlantısı
                olarak görünmelerinin yolu bu. */}
            <FadeUp delay={0.32}>
              <nav className="sx-jump" aria-label="Ülke bölümleri">
                {s.countries.map((c) => (
                  <a key={c.country} href={`#${c.country}`} className="sx-jump-a">
                    <span className="sx-jump-flag" aria-hidden="true">
                      <Flag country={c.country} />
                    </span>
                    {/* bağlantı metni ülke adı değil bölümün tam başlığı:
                        ziyaretçi nereye gittiğini görüyor, ve aranan cümle
                        sayfanın kendi içinde bir bağlantı olarak geçiyor */}
                    <span className="sx-jump-t">{c.heading}</span>
                    <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </FadeUp>
          </div>
        </section>

        {/* ---------- 2 · sektöre özgü başlıklar, ayrıntı kapalı ---------- */}
        <section className="sec-pad sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text={s.topics.heading}
                accent={s.topics.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">{s.topics.lead}</p>
              </FadeUp>
            </div>

            <div className="sx-topics">
              {s.topics.items.map((t, i) => {
                const Icon = TOPIC_ICON[t.icon];
                return (
                  <FadeUp key={t.title} delay={0.12 + i * 0.05}>
                    {/* native <details>: JavaScript yok, klavye ve ekran
                        okuyucu desteği tarayıcıdan geliyor, ve sunucu
                        bileşeni olarak kalabiliyor. Açılma animasyonu CSS ve
                        prefers-reduced-motion altında kapalı. */}
                    <details className="sx-topic">
                      <summary>
                        <span className="sx-topic-ic" aria-hidden="true">
                          <Icon size={16} strokeWidth={1.9} />
                        </span>
                        <span className="sx-topic-t">
                          <b>{t.title}</b>
                          <i>{t.line}</i>
                        </span>
                        <span className="sx-topic-x" aria-hidden="true" />
                      </summary>
                      <p>{t.detail}</p>
                    </details>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- 3 · üç ülke, her biri kendi h2'si ve kendi id'siyle ---------- */}
        {s.countries.map((c) => (
          <CountryBlock key={c.country} data={c} sector={s.name} />
        ))}

        {/* ---------- 4 · kapanış ----------
            Kişiye özel vergi görüşü siteden verilmiyor; sorusu olan için tek
            çıkış AskCta. "Mali müşavire danışın" kalıbı emekli. */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <FadeUp>
              <div className="sx-close">
                <div>
                  <h2 className="sx-close-h">
                    Kendi kurgunuz bu üç çerçeveden hangisine oturuyor?
                  </h2>
                  <p>
                    Buradaki başlıklar genel çerçeve. Ürününüzü, ekibinizi ve tahsilat
                    kanalınızı anlatın; hangi ülkenin işinize yaradığını birlikte
                    netleştirelim.
                  </p>
                </div>
                <AskCta label="Durumumu sorayım" />
              </div>
            </FadeUp>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
