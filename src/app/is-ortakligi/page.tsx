import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarCheck,
  Calculator,
  GraduationCap,
  Globe,
  IdCard,
  Landmark,
  LayoutDashboard,
  Lock,
  Scale,
  ShieldCheck,
  Stamp,
  TriangleAlert,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import AskCta from "@/components/shared/AskCta";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import { CHAIN, STANCE_LIMITS } from "@/lib/brand";
import {
  PARTNER_CHAIN,
  PARTNER_FAQ,
  PARTNER_FORM,
  PARTNER_HERO,
  PARTNER_LIMITS_HEAD,
  PARTNER_MODELS,
  PARTNER_SEO,
  PARTNER_STEPS,
  PARTNER_TERMS,
  PARTNER_VALUE,
  PARTNER_WHO,
  PARTNER_WHO_NOTE,
  type PartnerIcon,
} from "@/lib/partners";

/* ============================================================================
   İŞ ORTAKLIĞI — /is-ortakligi

   Sayfanın okuru müşteri değil, müşteriyi getirecek olan kişi: avukat, mali
   müşavir, danışman, eğitmen. Bu yüzden sıralama satış sayfası sıralaması
   değil. Bir ortak şu sırayla karar veriyor ve bölümler tam o sırada:

     1. Nasıl çalışacağız?      → iki model (referans / white-label)
     2. Ne kazanacağım?         → TİCARİ ŞARTLAR — ve burada duruyoruz, bkz. aşağısı
     3. Müşteriye ne götürüyorum? → doğrulanmış altı koz
     4. Neyi söz veremem?       → brand.ts · STANCE_LIMITS
     5. Müşteri sonra ne olacak? → brand.ts · CHAIN
     6. Ben bu tarife uyuyor muyum? → dört profil
     7. Nasıl başlıyorum?       → dört adım + form
     8. Aklımda kalanlar        → sekiz soru

   ------------------------------------------------------- İKİ KASITLI BOŞLUK

   (a) TİCARİ ŞART YOK. Referans aldığımız sayfada komisyon aralığı rakamla
       yazılı; bizde böyle bir karar yok. Sayfa oran uydurmak yerine dört
       satırı "—" bırakıyor ve neden boş olduğunu açıkça yazıyor
       (lib/partners.ts · PARTNER_TERMS, SWAP:PARTNER_TERMS). Boş satır bir
       eksiklik gibi duruyor — öyle de olmalı, çünkü gerçekten eksik.

   (b) FORM GÖNDERMİYOR. Çalışan bir uç noktamız yok. Alanlar <fieldset
       disabled> içinde, <form> hiçbir yere action vermiyor, buton devre dışı
       ve durum rozetle açıkça söyleniyor (SWAP:PARTNER_FORM). Gönderilmemiş
       bir başvuruyu "alındı" diye göstermek, sayfanın bütün argümanını
       çürütürdü. Çalışan tek çıkış AskCta.

   ------------------------------------------------------------ NEDEN SUNUCU

   Dosya istemci bileşeni DEĞİL: generateMetadata yalnızca sunucu
   bileşenlerinden çalışıyor ve bu sayfanın SEO'su iş kanalı için önemli.
   Sayfadaki tek durum ihtiyacı SSS akordiyonu; onu yeniden yazmak yerine
   sitenin hazır SSS bileşeni (CountryFaq) kullanılıyor — HomeFaq ile birebir
   aynı .sss kalıbı, aynı klavye davranışı, {q,a} dizisi alıyor. Kalan her şey
   (model kartları, altı koz, form) statik işaretleme; <details> yerli olduğu
   için açılıp kapanması da JavaScript istemiyor.

   HAREKET — sayfada JS ile hareket eden hiçbir şey yok. FadeUp ve SplitWords
   motion/react kullanıyor ve Providers'taki MotionConfig reducedMotion="user"
   ile kullanıcının tercihine uyuyor. Tek CSS animasyonu <details> açılırken
   paragrafın belirmesi; partnerlik.css onu prefers-reduced-motion altında
   kapatıyor.
   ========================================================================= */

const SITE = "https://ortacglobal.com";

export function generateMetadata(): Metadata {
  const url = `${SITE}${PARTNER_SEO.path}`;
  return {
    title: PARTNER_SEO.title,
    description: PARTNER_SEO.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: "Ortac Global",
      url,
      title: PARTNER_SEO.title,
      description: PARTNER_SEO.description,
    },
  };
}

/* partners.ts ikon adını string taşıyor (bkz. oradaki gerekçe); eşleme burada */
const ICON: Record<PartnerIcon, LucideIcon> = {
  globe: Globe,
  stamp: Stamp,
  badge: BadgeCheck,
  office: Building2,
  panel: LayoutDashboard,
  people: UsersRound,
  scale: Scale,
  calculator: Calculator,
  briefcase: Briefcase,
  school: GraduationCap,
};

/* CHAIN brand.ts'te ikon taşımıyor — o dosya saf veri. Ana sayfadaki Chain
   bölümüyle aynı eşleme, aynı anahtarlar: ziyaretçi iki yerde aynı halkayı
   aynı simgeyle görüyor. */
const CHAIN_ICON: Record<string, LucideIcon> = {
  kurulus: Building2,
  banka: Landmark,
  muhasebe: CalendarCheck,
  uyum: ShieldCheck,
  oturum: IdCard,
};

export default function PartnershipPage() {
  /* Breadcrumb dışında yapılandırılmış veri YOK. Organization ve Service
     zaten layout.tsx'te global olarak basılıyor; burada tekrarlamak aynı
     iddiayı iki kez işaretlemek olurdu. FAQPage şeması da bilerek yok: sekiz
     cevaptan birincisi "bu bilgi henüz yok" diyor ve onu arama sonucunda zengin
     sonuç olarak göstermek yanlış yerde durur. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: PARTNER_HERO.crumb,
        item: `${SITE}${PARTNER_SEO.path}`,
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

        {/* country VERİLMİYOR: PageHero kompakt başlık bloğunu basıyor. İki
            sütunlu hero tek bir ülkeyi öne çıkarır, oysa bu sayfanın iddiası
            üç ülkenin aynı ekipte olması. */}
        <PageHero
          crumb={PARTNER_HERO.crumb}
          title={PARTNER_HERO.title}
          accent={PARTNER_HERO.accent}
          lead={PARTNER_HERO.lead}
        />

        {/* ---------- 1 · iki model + ticari şartların boş kaldığı yer ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text="İki ortaklık modeli."
                accent="ortaklık modeli."
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">
                  İkisi de aynı operasyona bağlanıyor. Fark, müşterinin kiminle muhatap
                  olduğunda.
                </p>
              </FadeUp>
            </div>

            <div className="pt-models">
              {PARTNER_MODELS.map((m, i) => (
                <FadeUp key={m.key} delay={0.12 + i * 0.08} className="pt-cell">
                  <article className="pt-model">
                    <h3 className="pt-model-h">{m.name}</h3>
                    <p className="pt-model-l">{m.line}</p>
                    <ul className="pt-model-list">
                      {m.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <p className="pt-model-for">{m.forWhom}</p>
                  </article>
                </FadeUp>
              ))}
            </div>

            {/* Ticari şartlar. Dört satır da boş ve bu bilerek görünür: sayfanın
                en çok merak edilen bilgisi burada olmadığını saklamak yerine
                söylüyor. PARTNER_TERMS'e değer girildiği an satır kendiliğinden
                normal bir künye satırına dönüyor, bu blokta kod değişmiyor. */}
            <FadeUp delay={0.28}>
              <div className="pt-terms">
                <div className="pt-terms-head">
                  <span className="pt-terms-ic" aria-hidden="true">
                    <Lock size={15} strokeWidth={2.1} />
                  </span>
                  <h3 className="pt-h3">Ticari şartlar</h3>
                </div>

                <dl className="pt-terms-dl">
                  {PARTNER_TERMS.rows.map((r) => (
                    <div className="pt-terms-row" key={r.label}>
                      <dt>{r.label}</dt>
                      <dd data-empty={r.value ? undefined : ""}>{r.value ?? "—"}</dd>
                    </div>
                  ))}
                </dl>

                <p className="pt-terms-note">{PARTNER_TERMS.notPublished}</p>
                <AskCta label="Ortaklık şartlarını sorun" />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ---------- 2 · ortağın müşterisine götürdüğü altı şey ---------- */}
        <section className="sec-pad sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text="Müşterinize ne götürüyorsunuz."
                accent="ne götürüyorsunuz."
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">
                  Altı maddenin altısı da doğrulanabilir. Ortaklık sayfası, yeni iddia
                  üretmek için uygun bir yer değil.
                </p>
              </FadeUp>
            </div>

            <div className="pt-val">
              {PARTNER_VALUE.map((v, i) => {
                const Icon = ICON[v.icon];
                return (
                  <FadeUp key={v.title} delay={0.1 + i * 0.05} className="pt-cell">
                    {/* Yerli <details>: JavaScript yok, klavye ve ekran okuyucu
                        davranışı tarayıcıdan geliyor, bileşen sunucuda
                        kalabiliyor. Sektör sayfasındaki kalıbın aynısı, yani
                        ziyaretçi sitede tek bir açma hareketi öğreniyor. */}
                    <details className="pt-val-c">
                      <summary>
                        <span className="pt-val-ic" aria-hidden="true">
                          <Icon size={16} strokeWidth={1.9} />
                        </span>
                        <span className="pt-val-t">
                          <b>{v.title}</b>
                          <i>{v.line}</i>
                        </span>
                        <span className="pt-val-x" aria-hidden="true" />
                      </summary>
                      <p>{v.detail}</p>
                    </details>
                  </FadeUp>
                );
              })}
            </div>

            {/* Politika sınırları. brand.ts'ten okunuyor, burada kopyası yok.
                <details> içine KONMUYOR: kademelendirme metni azaltmak için
                var, şerhi gizlemek için değil. */}
            <FadeUp delay={0.34}>
              <div className="pt-limits">
                <div className="pt-limits-head">
                  <span className="pt-limits-ic" aria-hidden="true">
                    <TriangleAlert size={15} strokeWidth={2.1} />
                  </span>
                  <div>
                    <h3 className="pt-h3 pt-h3-dark">{PARTNER_LIMITS_HEAD.title}</h3>
                    <p className="pt-limits-lead">{PARTNER_LIMITS_HEAD.lead}</p>
                  </div>
                </div>
                <ul className="pt-limits-list">
                  {STANCE_LIMITS.map((l) => (
                    <li key={l.title}>
                      <b>{l.title}</b>
                      <span>{l.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ---------- 3 · kuruluştan sonrası ---------- */}
        <section className="sec-pad" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={PARTNER_CHAIN.title}
                accent={PARTNER_CHAIN.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{PARTNER_CHAIN.lead}</p>
              </FadeUp>
            </div>

            {/* Beş halka yatay bir ray. Ana sayfadaki Chain bölümünün süre/oran
                grafiği burada YOK: o grafik müşteriye "ne kadar sürer" sorusunu
                anlatıyor, ortağa gereken bilgi ise yalnızca zincirin kaç halka
                olduğu ve hepsinin aynı ekipte durduğu. */}
            <FadeUp delay={0.24}>
              <ol className="pt-chain">
                {CHAIN.map((c, i) => {
                  const Icon = CHAIN_ICON[c.key];
                  return (
                    <li className="pt-link" key={c.key}>
                      <span className="pt-link-n" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-link-ic" aria-hidden="true">
                        {Icon && <Icon size={16} strokeWidth={1.9} />}
                      </span>
                      <b>{c.label}</b>
                      <i>{c.line}</i>
                    </li>
                  );
                })}
              </ol>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="pt-chain-note">{PARTNER_CHAIN.note}</p>
            </FadeUp>
          </div>
        </section>

        {/* ---------- 4 · kimler ortak olabilir ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text="Kimler ortak olabilir."
                accent="ortak olabilir."
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">
                  Ortak payda meslek unvanı değil: müşterisi ona zaten &ldquo;yurt dışında
                  şirket kursam mı&rdquo; diye soran meslekler.
                </p>
              </FadeUp>
            </div>

            <div className="pt-who">
              {PARTNER_WHO.map((w, i) => {
                const Icon = ICON[w.icon];
                return (
                  <FadeUp key={w.title} delay={0.1 + i * 0.05} className="pt-cell">
                    <article className="pt-who-c">
                      <span className="pt-who-ic" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <h3 className="pt-who-h">{w.title}</h3>
                      <p>{w.line}</p>
                    </article>
                  </FadeUp>
                );
              })}
            </div>

            <FadeUp delay={0.3}>
              <div className="pt-who-foot">
                <p>{PARTNER_WHO_NOTE}</p>
                <AskCta label="Durumumu anlatayım" />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ---------- 5 · dört adım + başvuru formu (kapalı) ---------- */}
        <section className="sec-pad" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={PARTNER_FORM.title}
                accent={PARTNER_FORM.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{PARTNER_FORM.lead}</p>
              </FadeUp>
            </div>

            <div className="pt-apply">
              <FadeUp delay={0.12} className="pt-cell">
                <ol className="pt-steps">
                  {PARTNER_STEPS.map((s, i) => (
                    <li className="pt-step" key={s.t}>
                      <span className="pt-step-n" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <b>{s.t}</b>
                        <span>{s.s}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </FadeUp>

              <FadeUp delay={0.2} className="pt-cell">
                {/* SWAP:PARTNER_FORM — gönderim ucu yok.
                    action ve onSubmit YOK, alanlar <fieldset disabled> içinde,
                    buton devre dışı. Form bu hâliyle hiçbir şey göndermiyor ve
                    gönderdiğini de iddia etmiyor: rozet ve alttaki not durumu
                    açıkça söylüyor, çalışan çıkış AskCta.
                    aria-describedby ile not forma bağlı — ekran okuyucu formu
                    duyurduğunda kapalı olduğunu da duyuruyor. */}
                <form className="pt-form" aria-describedby="pt-form-note">
                  <div className="pt-form-top">
                    <h3 className="pt-h3">Başvuru formu</h3>
                    <span className="pt-form-badge">
                      <Lock size={12} strokeWidth={2.4} aria-hidden="true" />
                      {PARTNER_FORM.badge}
                    </span>
                  </div>

                  <fieldset className="pt-fields" disabled>
                    {PARTNER_FORM.fields.map((f) => (
                      <div
                        className="pt-field"
                        key={f.name}
                        data-wide={f.wide || undefined}
                      >
                        <label className="pt-label" htmlFor={`pt-${f.name}`}>
                          {f.label}
                          {f.optional && <i>opsiyonel</i>}
                        </label>
                        {f.type === "select" ? (
                          <select
                            className="pt-input"
                            id={`pt-${f.name}`}
                            name={f.name}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Seçin
                            </option>
                            {f.options?.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            className="pt-input"
                            id={`pt-${f.name}`}
                            name={f.name}
                            type={f.type}
                            placeholder={f.placeholder}
                          />
                        )}
                      </div>
                    ))}

                    {/* btn-primary DEĞİL: o varyant beyaz zeminli ve koyu
                        yüzeyler için; açık zeminde görünmez olurdu. Açık
                        zeminin dolu butonu btn-solid. */}
                    <button type="submit" className="btn btn-solid btn-full">
                      {PARTNER_FORM.submitLabel}
                      <ArrowRight size={15} strokeWidth={2.1} />
                    </button>
                  </fieldset>

                  <div className="pt-form-foot">
                    <p className="pt-form-note" id="pt-form-note">
                      {PARTNER_FORM.note}
                    </p>
                    <AskCta label={PARTNER_FORM.askLabel} />
                  </div>
                </form>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ---------- 6 · sekiz soru ----------
            Sitenin SSS kalıbı: sol sütunda sorular açıkta, seçilen cevap sağda
            tek panel olarak açılıyor. HomeFaq ile aynı düzen; burada onun
            {q,a} alan yeniden kullanılabilir hâli (CountryFaq) çağrılıyor,
            çünkü bu dosya sunucu bileşeni olmak zorunda (generateMetadata) ve
            akordiyonun durumu istemci tarafında yaşıyor. */}
        <section id="sss" className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text="Ortaklıkta sık sorulanlar."
                accent="sık sorulanlar."
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">
                  Sekiz başlık. Cevabı henüz kararlaşmamış olan tek konu ilk sırada
                  duruyor.
                </p>
              </FadeUp>
            </div>

            <CountryFaq items={PARTNER_FAQ} />
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
