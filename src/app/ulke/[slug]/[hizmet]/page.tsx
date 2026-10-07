import type { Metadata } from "next";
import SmartLink from "@/components/shared/SmartLink";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, Check, Minus, Percent, ShieldCheck, UserRound, MapPin, Layers, Users, CalendarClock, Armchair, ArrowLeftRight, CircleOff, FileText, Fingerprint, Flag, Landmark, Hourglass, CheckCheck, Search, Scale, type LucideIcon} from "lucide-react";
import SplitWords from "@/components/shared/SplitWords";
import CountryFaq from "@/components/CountryFaq";
import { hizmetIcerik, type HizmetIkon } from "@/lib/hizmetIcerik";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import FinalCta from "@/components/FinalCta";
import CountryCross from "@/components/country/CountryCross";
import {
  COUNTRY_SLUGS,
  FORMATION_SLUG,
  pagedServicesFor,
  serviceFor,
  serviceHref,
} from "@/lib/services";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

type Params = Promise<{ slug: string; hizmet: string }>;

const isCountry = (s: string): s is Country => (COUNTRY_SLUGS as string[]).includes(s);

/* Kuruluş burada üretilmiyor: onun sayfası ülke sayfasının kendisi
   (bkz. services.ts → serviceHref). Eski adrese gelen olursa aşağıda
   kalıcı olarak ülke sayfasına yönlendiriliyor. */
export function generateStaticParams() {
  return COUNTRY_SLUGS.flatMap((slug) =>
    pagedServicesFor(slug).map((s) => ({ slug, hizmet: s.slug })),
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

const HIZMET_IKON: Record<HizmetIkon, LucideIcon> = {
  yuzde: Percent,
  kalkan: ShieldCheck,
  kisi: UserRound,
  harita: MapPin,
  katman: Layers,
  ortak: Users,
  takvim: CalendarClock,
  masa: Armchair,
  devir: ArrowLeftRight,
  kapat: CircleOff,
  dosya: FileText,
  parmak: Fingerprint,
  bayrak: Flag,
  banka: Landmark,
  saat: Hourglass,
  tik: CheckCheck,
  ara: Search,
  terazi: Scale,
};

const money = (n: number) => `$${n.toLocaleString("tr-TR")}`;
/* Başlık cümle içine giriyor ("Dubai'de …"): kelimeler küçülüyor, ama
   kısaltmalar (AML) büyük kalıyor. */
const kucult = (t: string) =>
  t
    .split(" ")
    .map((k) => (k.length <= 4 && k === k.toLocaleUpperCase("tr-TR") && /[A-ZÇĞİÖŞÜ]{2}/.test(k) ? k : k.toLocaleLowerCase("tr-TR")))
    .join(" ");

export default async function ServicePage({ params }: { params: Params }) {
  const { slug, hizmet } = await params;
  if (!isCountry(slug)) notFound();
  /* /dubai/sirket-kurulusu → /dubai. Adres dışarıda kalmış olabilir (eski
     bağlantı, arama sonucu); 404 vermek yerine doğru sayfaya taşıyoruz. */
  if (hizmet === FORMATION_SLUG) redirect(`/${slug}`);
  const svc = serviceFor(slug, hizmet);
  if (!svc) notFound();

  const name = COUNTRY_LABELS[slug];
  const siblings = pagedServicesFor(slug).filter((s) => s.slug !== svc.slug);
  const others = COUNTRY_SLUGS.filter((c) => c !== slug).filter((c) => serviceFor(c, svc.slug));
  const total = svc.lines.reduce((a, l) => a + (l.amount ?? 0), 0);

  /* 07.10.2026 · ZENGİN DÜZEN. İçeriği yazılmış hizmette (lib/hizmetIcerik.ts;
     şimdilik Dubai · vergi, kurumsal danışmanlık, AML) eski "kapsam + teklif
     kutusu" şablonu yerine vize sayfasının kısa kalıbı basılıyor: üç kart,
     dört kural karosu, dört adım, SSS. Sınıflar vize sayfasınınkiler
     (.svz-, css/svc-vize.css). */
  const icerik = hizmetIcerik(slug, svc.slug);
  if (icerik) {
    const bolum = (b: { baslik: string; vurgu: string; lead: string }) => (
      <div className="sec-head">
        <SplitWords as="h2" text={b.baslik} accent={b.vurgu} className="h2" />
        <FadeUp delay={0.2}>
          <p className="sec-lead">{b.lead}</p>
        </FadeUp>
      </div>
    );
    return (
      <>
        <Nav />
        <main>
          <PageHero
            crumb={`${name} · ${svc.title}`}
            title={`${name}'de ${kucult(svc.title)}.`}
            accent={`${kucult(svc.title)}.`}
            lead={svc.line}
            rozetler={svc.includes.slice(0, 3)}
            cta={{ label: "Teklif isteyin", href: "/iletisim" }}
          />

          <section className="sec-pad" style={{ background: "var(--white)" }}>
            <div className="container-o">
              {bolum(icerik.kartlar)}
              <ul className="svz-tur">
                {icerik.kartlar.items.map((t, i) => {
                  const I = HIZMET_IKON[t.icon];
                  return (
                    <li key={t.title}>
                      <FadeUp className="svz-tur-k" delay={0.1 + i * 0.06}>
                        <span className="svz-tur-bas">
                          <span className="svz-ic" aria-hidden="true">
                            <I size={20} strokeWidth={1.9} />
                          </span>
                          <span className="svz-tur-sp">{t.kim}</span>
                        </span>
                        <h3 className="svz-tur-t">{t.title}</h3>
                        <p className="svz-tur-s">{t.line}</p>
                      </FadeUp>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <section className="sec-pad" style={{ background: "var(--paper)" }}>
            <div className="container-o">
              {bolum(icerik.kurallar)}
              <ul className="svz-kor">
                {icerik.kurallar.items.map((c, i) => {
                  const I = HIZMET_IKON[c.icon];
                  return (
                    <li key={c.title}>
                      <FadeUp className="svz-kor-k" delay={0.08 + i * 0.05}>
                        <span className="svz-ic" aria-hidden="true">
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
          </section>

          <section className="sec-pad" style={{ background: "var(--white)" }}>
            <div className="container-o">
              {bolum(icerik.adimlar)}
              <ol className="svz-adim">
                {icerik.adimlar.items.map((st, i) => {
                  const I = HIZMET_IKON[st.icon];
                  return (
                    <li key={st.title}>
                      <FadeUp className="svz-adim-k" delay={0.1 + i * 0.06}>
                        <span className="svz-ic svz-adim-ic" aria-hidden="true">
                          <I size={18} strokeWidth={1.9} />
                        </span>
                        <span className="svz-adim-n" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="svz-adim-t">{st.title}</h3>
                        <p className="svz-adim-s">{st.line}</p>
                      </FadeUp>
                    </li>
                  );
                })}
              </ol>
              {icerik.adimlar.cikis && (
                <SmartLink href={icerik.adimlar.cikis.href} className="svz-cik">
                  {icerik.adimlar.cikis.label}
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </SmartLink>
              )}
            </div>
          </section>

          <section className="sec-pad" style={{ background: "var(--paper)" }}>
            <div className="container-o">
              <div className="sec-head">
                <SplitWords as="h2" text="Sık sorulanlar." accent="sorulanlar." className="h2" />
              </div>
              <CountryFaq items={icerik.sss} />
            </div>
          </section>

          <section className="sec-pad" style={{ background: "var(--white)" }}>
            <div className="container-o">
              <CountryCross
                title="Dubai'deki diğer hizmetler"
                items={[{ country: slug, href: `/${slug}` }]}
              />
              <div className="sp-sib" style={{ marginTop: 20 }}>
                {siblings.map((x) => (
                  <SmartLink key={x.slug} href={serviceHref(slug, x.slug)}>
                    {x.title}
                    <ArrowRight size={14} strokeWidth={2.1} />
                  </SmartLink>
                ))}
              </div>
            </div>
          </section>

          <FinalCta />
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main>
        <PageHero
          crumb={`${name} · ${svc.title}`}
          title={`${name}'de ${kucult(svc.title)}.`}
          lead={svc.line}
          /* foto giriş: rozetler kapsamın ilk üç maddesi */
          rozetler={svc.includes.slice(0, 3)}
          cta={{ label: svc.from !== null ? "Bu hizmetle başlayın" : "Bizimle iletişime geçin", href: svc.from !== null ? `/basla?ulke=${slug}&hizmet=${svc.slug}` : "/iletisim" }}
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
                {/* kanonik adres /dubai/muhasebe — /ulke/… yalnızca iç
                    şablonun yaşadığı yer, dışarıya verilmiyor */}
                <div className="sp-sib">
                  {siblings.map((s) => (
                    <SmartLink key={s.slug} href={serviceHref(slug, s.slug)}>
                      {s.title}
                      <ArrowRight size={14} strokeWidth={2.1} />
                    </SmartLink>
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
                  <span className="sp-quote-u" style={svc.from === null ? { marginBottom: 20 } : undefined}>
                    {svc.from !== null ? `${svc.unit} · ${svc.duration}` : "Kapsam ve tutar işinize göre netleşir."}
                  </span>

                  {/* 07.10.2026 · fiyatı yazılmamış hizmette (vergi, kurumsal
                      danışmanlık, AML) kalem tablosu ve "Toplam $0" basılmıyor */}
                  {svc.lines.length > 0 && (
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
  
                  )}
                  {svc.from !== null ? (
                    <SmartLink href={`/basla?ulke=${slug}&hizmet=${svc.slug}`} className="btn btn-primary btn-full">
                      Bu hizmetle başlayın
                      <ArrowRight size={15} strokeWidth={2.1} />
                    </SmartLink>
                  ) : (
                    <SmartLink href="/iletisim" className="btn btn-primary btn-full">
                      Bizimle iletişime geçin
                      <ArrowRight size={15} strokeWidth={2.1} />
                    </SmartLink>
                  )}
                  {svc.from !== null && <p className="sp-note">Tutarlar temsilidir; nihai teklif evraklara göre netleşir.</p>}
                </aside>
              </FadeUp>
            </div>

            {/* --- same service, other countries ---
                 Ülke sayfasının dibindeki kutuyla AYNI bileşen. Fiyat ve süre
                 burada da basılmıyor: bu kutu bir kıyas değil bir geçiş,
                 gerekçe CountryCross'un başında. */}
            <CountryCross
              rule
              title="Aynı hizmet, diğer ülkelerde"
              items={others.map((c) => ({ country: c, href: serviceHref(c, svc.slug) }))}
            />
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
