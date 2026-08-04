import type { Metadata } from "next";
import { ArrowRight, Inbox, MapPin, Send } from "lucide-react";

import Nav from "@/components/Nav";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_NAME } from "@/lib/brand";
import { OFFICE_ORDER } from "@/lib/offices";
import {
  CAREERS_EMPTY,
  OPENING_TYPE_LABEL,
  OPEN_APPLICATION,
  hasCareerInbox,
  placeLabel,
  sortedOpenings,
} from "@/lib/careers";

/* ============================================================================
   KARİYER — /kariyer

   NEDEN VAR
   Müşterinin cümlesi: "kariyer diye bir şey gelcek insanlar iş başvurusu
   yapmak ister diye ordan açık pozisyonları göstereceğimiz fln bir kısım."
   Navbar'ın Kurumsal paneline giren ikinci yeni kapı burası.

   SAYFANIN İSKELETİ
     Nav
     PageHero            kırıntı yolu + sayfanın TEK <h1>'i + lead
     1 · pozisyonlar     bugün BOŞ; boş durum dürüstçe basılıyor        (h2)
     2 · açık başvuru    nereye yazılır + üç ofis                       (h2)
     FinalCta

   BUGÜN NEDEN BOŞ
   Firmadan gelmiş, doğrulanmış tek bir ilan yok (gerekçenin uzunu
   src/lib/careers.ts'in başında). Uydurma pozisyon, maaş, lokasyon ya da ekip
   büyüklüğü yazılmadı — ve şema zaten yazılmasına izin vermiyor: ilanın
   `applyHref` alanı zorunlu, yani başvurunun gideceği gerçek bir yer olmadan
   ilan yazılamıyor.

   SAYFA BOŞKEN NE İŞE YARIYOR
   İş arayan kişi "açık pozisyon var mı" sorusunun cevabını arıyor ve "hayır"
   da bir cevap — aranan şey belirsizlik değil. Sayfa bunu söylüyor, sonra
   gerçekten çalışan tek yolu gösteriyor: açık başvuru. Bu yol da bir vaat
   üretmiyor; yanıt süresi, işe alım adımları ve muhatap adı BİLEREK yazılmadı,
   çünkü üçünün de firmada bugün karşılığı yok.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const PATH = "/kariyer";

/* Modül düzeyinde: OPENINGS bir sunucu sabiti, `metadata` da öyle. İlk ilan
   girildiği gün başlık, açıklama ve hero metni birlikte doğruya dönüyor. */
const OPEN = sortedOpenings();
const EMPTY = OPEN.length === 0;

const TITLE = "Kariyer — açık pozisyonlar ve açık başvuru | Ortac Global";

/* Açıklama boşken pozisyon vaat etmiyor: aramada "açık pozisyonlar" görüp boş
   sayfaya düşen kişi, bir daha bakmaz. */
const DESCRIPTION = EMPTY
  ? "Ortac Global'de şu an açık pozisyon yok. İlan yayımlamadığımız dönemde olmayan bir pozisyon yazmıyoruz; açık başvurunuzu yine de bırakabilirsiniz."
  : "Ortac Global'de açık pozisyonlar: ekip, lokasyon, istihdam tipi ve başvuru adresi her ilanın yanında.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  /* Kanonik mutlak: layout.tsx'te metadataBase yok (aynı gerekçe /iletisim'de). */
  alternates: { canonical: `${SITE}${PATH}` },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Ortac Global",
    url: `${SITE}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function KariyerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Kariyer", item: `${SITE}${PATH}` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Kariyer",
        url: `${SITE}${PATH}`,
        description: DESCRIPTION,
        inLanguage: "tr-TR",
        about: { "@id": `${SITE}/#organization` },
        /* İlan yokken hiçbir `JobPosting` düğümü yazılmıyor. Bu, tüm yapısal
           veri kurallarının en sıkı uygulanması gereken yer: Google iş
           ilanlarını ayrı bir yüzeyde gösteriyor ve olmayan bir ilanı oraya
           bildirmek, başvuru için tıklayan gerçek insanlar üretir. */
        ...(EMPTY
          ? {}
          : {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: OPEN.map((o, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  item: {
                    "@type": "JobPosting",
                    title: o.title,
                    description: o.summary,
                    datePosted: o.postedAt,
                    employmentType: o.type,
                    hiringOrganization: { "@id": `${SITE}/#organization` },
                    jobLocationType: o.place === "uzaktan" ? "TELECOMMUTE" : undefined,
                    inLanguage: "tr-TR",
                  },
                })),
              },
            }),
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

        {/* country VERİLMİYOR: kompakt başlık. Bu sayfa üç ülkede birden
            geçiyor, tek ülkenin sahnesini çizmek yanlış olurdu. */}
        <PageHero
          crumb="Kariyer"
          title="Açık pozisyonlar ve açık başvuru."
          accent="açık başvuru."
          lead={
            EMPTY
              ? "Şu an yayımlanmış bir ilanımız yok. Sayfayı doldurmak için olmayan bir pozisyon yazmıyoruz; buna karşılık başvurunuzu her zaman bırakabilirsiniz — bir pozisyon açıldığında elimizdeki başvurulara ilk biz bakıyoruz."
              : "Aşağıdaki ilanların hepsi açık. Her birinin yanında hangi ekip, hangi lokasyon, hangi istihdam tipi ve başvurunun nereye gideceği yazıyor."
          }
        />

        <section className="sec-pad" id="pozisyonlar" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <h2 className="h2">Açık pozisyonlar</h2>
              <p className="sec-lead">
                Başvurunun gideceği gerçek bir adres olmadan ilan yayımlamıyoruz — bu bir üslup
                tercihi değil, şemanın kuralı.
              </p>
            </div>

            {EMPTY ? (
              /* BOŞ DURUM — sitenin kalıbı: ne yok, hangi kuralla dolar, bu
                 arada nereye gidilir. Metin lib/careers.ts'te. */
              <FadeUp>
                <div className="krm-empty">
                  <span className="krm-empty-ic" aria-hidden="true">
                    <Inbox size={20} strokeWidth={1.8} />
                  </span>
                  <p className="krm-empty-t">{CAREERS_EMPTY.title}</p>
                  <p className="krm-empty-l">{CAREERS_EMPTY.line}</p>

                  <p className="krm-empty-k">Bu arada</p>
                  <div className="krm-empty-x">
                    <a href="#acik-basvuru" className="krm-exit">
                      <span>
                        <b>Açık başvuru bırakın</b>
                        <em>Pozisyon yokken de alıyoruz; sayfanın alt bölümünde.</em>
                      </span>
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </a>
                    <SmartLink href="/hakkimizda" className="krm-exit">
                      <span>
                        <b>Hakkımızda</b>
                        <em>Ne yaptığımız, nerede çalıştığımız ve neye dayanarak.</em>
                      </span>
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  </div>
                </div>
              </FadeUp>
            ) : (
              <ul className="krm-feed">
                {OPEN.map((o, i) => (
                  <li key={o.id}>
                    <FadeUp delay={i * 0.05}>
                      <article className="krm-job">
                        <span className="krm-item-h">
                          <span className="krm-item-out">{o.team}</span>
                          <span className="krm-item-kind">{OPENING_TYPE_LABEL[o.type]}</span>
                          <span className="krm-item-d">{placeLabel(o.place)}</span>
                        </span>
                        <h3 className="krm-item-t">{o.title}</h3>
                        <p className="krm-item-s">{o.summary}</p>

                        <div className="krm-job-cols">
                          <div>
                            <p className="krm-job-k">Ne yapacaksınız</p>
                            <ul className="krm-job-l">
                              {o.duties.map((d) => (
                                <li key={d}>{d}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="krm-job-k">Aradıklarımız</p>
                            <ul className="krm-job-l">
                              {o.requirements.map((r) => (
                                <li key={r}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Şema `applyHref`i zorunlu tuttuğu için bu bağlantı
                            hiçbir zaman boşa düşmüyor. */}
                        <a className="krm-apply" href={o.applyHref}>
                          <Send size={15} strokeWidth={2} aria-hidden="true" />
                          Bu pozisyona başvurun
                        </a>
                      </article>
                    </FadeUp>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="sec-pad" id="acik-basvuru" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <div className="krm-media">
              <div>
                <h2 className="h2">{OPEN_APPLICATION.title}</h2>
                <p className="sec-lead">{OPEN_APPLICATION.line}</p>

                <div className="krm-media-a">
                  {hasCareerInbox() ? (
                    <a className="btn btn-primary" href={`mailto:${OPEN_APPLICATION.inbox}`}>
                      {OPEN_APPLICATION.inbox}
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </a>
                  ) : (
                    <SmartLink href={OPEN_APPLICATION.cta.href} className="btn btn-primary">
                      {OPEN_APPLICATION.cta.label}
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  )}
                </div>
              </div>

              {/* Nerede çalışıyoruz. Üç ofisin VARLIĞI doğrulanmış ve site
                  bunu her yerde söylüyor; şehir ve açık adres doğrulanmadığı
                  için burada da yazmıyor (src/lib/offices.ts · SWAP:OFFICE_*).
                  Aynı şerit navbar'ın iletişim kartında da duruyor — orada da
                  ülke adından fazlasını iddia etmiyor. */}
              <div className="krm-facts">
                <p className="krm-facts-k">
                  <MapPin size={14} strokeWidth={2} aria-hidden="true" />
                  Nerede çalışıyoruz
                </p>
                <div className="krm-of">
                  {OFFICE_ORDER.map((c) => (
                    <span key={c} className="krm-of-i">
                      <span className="krm-of-f" aria-hidden="true">
                        <Flag country={c} />
                      </span>
                      {COUNTRY_NAME[c]}
                    </span>
                  ))}
                </div>
                <p className="krm-facts-n">
                  Ekip büyüklüğü, çalışma düzeni ve yan haklar burada yazmıyor: doğrulanmış
                  karşılıkları yok ve doldurmak için uydurulmadı.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
