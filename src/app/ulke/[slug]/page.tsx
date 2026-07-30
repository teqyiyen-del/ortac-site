import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import CountryPricing from "@/components/CountryPricing";
import CountryProcess from "@/components/CountryProcess";
import CountryClarify from "@/components/CountryClarify";
import CountryStructures from "@/components/CountryStructures";
import CountryDocs from "@/components/CountryDocs";
import CountryTax from "@/components/CountryTax";
import StepSwitcher, { type Step as SwitchStep } from "@/components/shared/StepSwitcher";
import FlowScene from "@/components/shared/FlowScene";
import CountryFaq from "@/components/CountryFaq";
import CountryFit from "@/components/CountryFit";
import CountryPros from "@/components/country/CountryPros";
import CountryScope from "@/components/country/CountryScope";
import FinalCta from "@/components/FinalCta";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_SLUGS, servicesFor } from "@/lib/services";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { PRICING } from "@/lib/pricing";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

type Params = Promise<{ slug: string }>;

const isCountry = (s: string): s is Country => (COUNTRY_SLUGS as string[]).includes(s);

export function generateStaticParams() {
  return COUNTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  if (!isCountry(slug)) return {};
  const name = COUNTRY_LABELS[slug];
  return {
    title: `${name}'de şirket kuruluşu — maliyet, süreç ve hizmetler | Ortac Global`,
    description: `${name}'de kuruluş süresi, maliyeti, avantajları ve dikkat edilmesi gerekenler. Kurulumunuzu seçin, fiyat anında çıksın.`,
  };
}

const money = (n: number) => `$${n.toLocaleString("tr-TR")}`;

export default async function CountryPage({ params }: { params: Params }) {
  const { slug } = await params;
  if (!isCountry(slug)) notFound();

  const name = COUNTRY_LABELS[slug];
  const p = PRICING[slug];
  const c = COUNTRY_CONTENT[slug];
  const services = servicesFor(slug);
  const others = COUNTRY_SLUGS.filter((x) => x !== slug);

  /* the three money routes reuse the home page's diagram, with this country's
     own company sitting on the far node */
  const abroad = { title: `${name} şirketi`, sub: c.tagline, icon: "world" as const };
  const routeSteps: SwitchStep[] = [
    {
      id: "fatura",
      title: c.routes[0].title,
      line: c.routes[0].note,
      scene: (
        <FlowScene
          from={{ title: "Türkiye şirketiniz", sub: "şahıs veya limited", icon: "tr" }}
          to={abroad}
          forward="hizmet faturası"
          back="ödeme"
        />
      ),
    },
    {
      id: "kar-payi",
      title: c.routes[1].title,
      line: c.routes[1].note,
      scene: (
        <FlowScene
          from={{ ...abroad, sub: "dönem kârı" }}
          to={{ title: "Kişisel hesabınız", sub: "ortak sıfatıyla", icon: "person" }}
          forward="kâr payı (temettü)"
        />
      ),
    },
    {
      id: "maas",
      title: c.routes[2].title,
      line: c.routes[2].note,
      scene: (
        <FlowScene
          from={{ ...abroad, sub: "işveren" }}
          to={{ title: "Kişisel hesabınız", sub: "çalışan sıfatıyla", icon: "person" }}
          forward="aylık ücret"
        />
      ),
    },
  ];

  return (
    <>
      <Nav />
      <main>
        {/* country geçince PageHero iki sütunlu hero'ya dönüyor: solda başlık,
            butonlar ve güven satırları, sağda ülkeye özgü vektör sahne.
            Verilmezse eski kompakt başlık bloğu aynen çıkıyor, o yüzden
            /ulkeler, /kaynaklar ve hizmet sayfaları etkilenmiyor. */}
        <PageHero
          country={slug}
          crumb={`Ülkeler · ${name}`}
          title={`${name}'de şirket kurmak.`}
          accent="şirket kurmak."
          lead={c.intro}
        />

        {/* ---------- facts ---------- */}
        {/* brief: no stock photography. The four numbers are the visual. */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <dl className="cp-facts">
              <div>
                <dt>Kuruluş süresi</dt>
                <dd>{p.duration}</dd>
              </div>
              <div>
                <dt>Yapı</dt>
                <dd>{p.license}</dd>
              </div>
              <div>
                <dt>Kuruluş başlangıcı</dt>
                <dd>{money(p.base)}</dd>
              </div>
              <div>
                <dt>Vize</dt>
                <dd>{p.perVisa > 0 ? `${money(p.perVisa)} / kişi` : "Yok"}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ---------- what this country is not (brief §2, mandatory) ---------- */}
        <CountryClarify data={c.clarify} />

        {/* ---------- the structural choice, where there is one ---------- */}
        {c.structures && <CountryStructures data={c.structures} />}

        {/* ---------- pros / watchouts ---------- */}
        <CountryPros name={name} pros={c.pros} watchouts={c.watchouts} />

        {/* ---------- tax frame ----------
             Akışta yukarı alındı: avantajlardan hemen sonra, fiyattan önce.
             It used to sit near the end, after the process and the document
             list, which is long past the point where the question gets asked.
             What a visitor wants to know right after "why here" is what they
             actually keep, and only then what our own work costs. */}
        <CountryTax data={c.tax} name={name} />

        {/* ---------- interactive price ---------- */}
        <section id="fiyat" className="sec-pad sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text="Kurulumunuzu seçin, fiyat anında çıksın."
                accent="fiyat anında çıksın."
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">
                  {name} için paket ve ek hizmetleri seçin; tutar sağda satır satır oluşur.
                </p>
              </FadeUp>
            </div>
            <CountryPricing country={slug} />
          </div>
        </section>

        {/* ---------- services ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={`${name} hizmetleri.`}
                accent="hizmetleri."
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">Her hizmetin kapsamı ve fiyatı kendi sayfasında.</p>
              </FadeUp>
            </div>

            <div className="cp-svc">
              {services.map((s, i) => (
                <FadeUp key={s.slug} delay={0.2 + i * 0.06}>
                  <Link href={`/${slug}/${s.slug}`} className="cp-card">
                    <span className="cp-card-t">{s.title}</span>
                    <span className="cp-card-l">{s.line}</span>
                    <span className="cp-card-f">
                      <b>{s.from !== null ? money(s.from) : "Teklife bağlı"}</b>
                      <span>{s.unit}</span>
                      <ArrowRight size={16} strokeWidth={2.1} />
                    </span>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- scope matrix ---------- */}
        <CountryScope included={c.included} excluded={c.excluded} />

        {/* ---------- process ---------- */}
        <CountryProcess steps={c.steps} title={`${name}'de süreç, adım adım.`} />

        {/* ---------- documents: the inputs that process needs ---------- */}
        <CountryDocs data={c.docs} name={name} />

        {/* ---------- fit ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={`${name} kimin işine yarar?`}
                accent="kimin işine yarar?"
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">Profilinizi seçin, cevabı burada verelim.</p>
              </FadeUp>
            </div>

            <CountryFit rows={c.fitTable} country={slug} />
          </div>
        </section>

        {/* ---------- money home ---------- */}
        <section id="para-transferi" className="sec-pad sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text="Kazancınızı Türkiye'ye nasıl getirirsiniz?"
                accent="nasıl getirirsiniz?"
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">
                  Üç yol var. Hangisinin size uyduğu mukimliğinize ve gelir tipinize bağlı.
                </p>
              </FadeUp>
            </div>

            <StepSwitcher steps={routeSteps} dark />

            <p className="rt-foot">
              Bu başlık genel geçer cevap kaldırmıyor. Mali müşavirimizle
              durumunuza göre netleştiriyoruz.
            </p>
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text="Sık sorulanlar."
                accent="sorulanlar."
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
            </div>
            <CountryFaq items={c.faq} />
          </div>
        </section>

        {/* ---------- other countries ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <h2 className="sp-h">Diğer ülkelere bakın</h2>
            <div className="sp-cross-row">
              {others.map((o) => (
                <Link key={o} href={`/${o}`} className="sp-cross-card">
                  <span className="sp-cross-flag" aria-hidden="true">
                    <Flag country={o} />
                  </span>
                  <span>
                    <b>{COUNTRY_LABELS[o]}</b>
                    {PRICING[o].duration}
                  </span>
                  <span className="sp-cross-p">{money(PRICING[o].base)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
