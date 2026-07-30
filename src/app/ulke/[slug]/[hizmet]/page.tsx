import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Minus } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import FinalCta from "@/components/FinalCta";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_SLUGS, serviceFor, servicesFor } from "@/lib/services";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

type Params = Promise<{ slug: string; hizmet: string }>;

const isCountry = (s: string): s is Country => (COUNTRY_SLUGS as string[]).includes(s);

export function generateStaticParams() {
  return COUNTRY_SLUGS.flatMap((slug) =>
    servicesFor(slug).map((s) => ({ slug, hizmet: s.slug })),
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, hizmet } = await params;
  if (!isCountry(slug)) return {};
  const svc = serviceFor(slug, hizmet);
  if (!svc) return {};
  return {
    title: `${COUNTRY_LABELS[slug]} — ${svc.title} | Ortac Global`,
    description: `${svc.line} ${COUNTRY_LABELS[slug]} için kapsam, hariç kalemler ve fiyat kalemleri.`,
  };
}

const money = (n: number) => `$${n.toLocaleString("tr-TR")}`;

export default async function ServicePage({ params }: { params: Params }) {
  const { slug, hizmet } = await params;
  if (!isCountry(slug)) notFound();
  const svc = serviceFor(slug, hizmet);
  if (!svc) notFound();

  const name = COUNTRY_LABELS[slug];
  const siblings = servicesFor(slug).filter((s) => s.slug !== svc.slug);
  const others = COUNTRY_SLUGS.filter((c) => c !== slug).filter((c) => serviceFor(c, svc.slug));
  const total = svc.lines.reduce((a, l) => a + (l.amount ?? 0), 0);

  return (
    <>
      <Nav />
      <main>
        <PageHero
          crumb={`${name} · ${svc.title}`}
          title={`${name}'de ${svc.title.toLocaleLowerCase("tr-TR")}.`}
          lead={svc.line}
        />

        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sp-grid">
              {/* --- scope --- */}
              <div>
                <h2 className="sp-h">Kapsam</h2>
                <ul className="sp-list">
                  {svc.includes.map((x) => (
                    <li key={x}>
                      <i data-yes>
                        <Check size={12} strokeWidth={3.4} />
                      </i>
                      {x}
                    </li>
                  ))}
                  {svc.excludes.map((x) => (
                    <li key={x} data-off>
                      <i>
                        <Minus size={12} strokeWidth={3.4} />
                      </i>
                      {x}
                    </li>
                  ))}
                </ul>

                <h2 className="sp-h sp-h-gap">
                  Aynı ülkedeki diğer hizmetler
                </h2>
                <div className="sp-sib">
                  {siblings.map((s) => (
                    <Link key={s.slug} href={`/ulke/${slug}/${s.slug}`}>
                      {s.title}
                      <ArrowRight size={14} strokeWidth={2.1} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* --- the quote --- */}
              <FadeUp delay={0.15}>
                <aside className="sp-quote">
                  <span className="sp-quote-k">{name} için</span>
                  <span className="sp-quote-n">
                    {svc.from !== null ? money(svc.from) : "Teklife bağlı"}
                  </span>
                  <span className="sp-quote-u">
                    {svc.unit} · {svc.duration}
                  </span>

                  <div className="sp-lines">
                    {svc.lines.map((l) => (
                      <div key={l.label} className="sp-line">
                        <span>
                          {l.label}
                          {l.note && <b>{l.note}</b>}
                        </span>
                        <span className="sp-line-a">
                          {l.amount !== null ? money(l.amount) : "teklif"}
                        </span>
                      </div>
                    ))}
                    <div className="sp-line sp-line-total">
                      <span>Toplam</span>
                      <span className="sp-line-a">{money(total)}</span>
                    </div>
                  </div>

                  <Link href={`/basla?ulke=${slug}&hizmet=${svc.slug}`} className="btn btn-primary btn-full">
                    Bu hizmetle başlayın
                    <ArrowRight size={15} strokeWidth={2.1} />
                  </Link>
                  <p className="sp-note">Tutarlar temsilidir; nihai teklif evraklara göre netleşir.</p>
                </aside>
              </FadeUp>
            </div>

            {/* --- same service, other countries --- */}
            {others.length > 0 && (
              <div className="sp-cross">
                <h2 className="sp-h">Aynı hizmet, diğer ülkelerde</h2>
                <div className="sp-cross-row">
                  {others.map((c) => {
                    const o = serviceFor(c, svc.slug)!;
                    return (
                      <Link key={c} href={`/ulke/${c}/${svc.slug}`} className="sp-cross-card">
                        <span className="sp-cross-flag" aria-hidden="true">
                          <Flag country={c} />
                        </span>
                        <span>
                          <b>{COUNTRY_LABELS[c]}</b>
                          {o.duration}
                        </span>
                        <span className="sp-cross-p">
                          {o.from !== null ? money(o.from) : "teklif"}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
