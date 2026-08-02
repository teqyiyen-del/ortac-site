import type { Metadata } from "next";
import { ArrowUpRight, CalendarDays, FileCheck2, Landmark, Users } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import FinalCta from "@/components/FinalCta";
import KynEmpty from "@/components/kaynaklar/KynEmpty";
import KynSwitch from "@/components/kaynaklar/KynSwitch";
import { formatDate } from "@/lib/blog";
import {
  RESOURCE_KINDS,
  UPDATES,
  UPDATE_CHANNEL_LABEL,
  countryLabel,
  updatesByMonth,
} from "@/lib/resources";

/* ============================================================================
   /gelismeler — mevzuat ve gelişmeler akışı
   ============================================================================

   BÖLÜMÜN İŞİ VE RİSKİ AYNI YERDE
   Müşterinin isteği açık: "tarih bazlı yaşayan bir site algısı vermek."
   Bölümün işi güncellik. Ama bu firmada güncellik uydurulamaz: teyit edilmemiş
   bir mevzuat değişikliği yayınlamak yanlış bilgi vermek olur ve bedeli bir
   tasarım kusurunun kat kat üstünde.

   İkisi tek bir kararla çözüldü: ŞEMA KURULDU, KAYIT GİRİLMEDİ.

   Şemanın kendisi güvence: `Update.source` zorunlu (resmî otoritenin kendi
   duyurusunun adı + adresi). Kaynağı olmayan bir satır tip denetiminden
   geçmiyor, yani "duyduk ki" türünden bir kayıt yayına giremiyor. Teyitsiz üç
   yer tutucu başlık ayrı bir dizide (PENDING_UPDATES) ve tipi farklı; hiçbir
   sayfa onları basmıyor (bkz. lib/resources.ts).

   BOŞ DURUM — GİZLEMEK DEĞİL, ANLATMAK
   Sayfa boşken kendini gizlemiyor. Ziyaretçi buraya "gelişmeler" yazan bir
   bağlantıya tıklayarak geliyor; boş ekran "site bozuk" demek. Onun yerine
   üç şey söyleniyor: şu an kayıt yok, buraya bir kaydın hangi kuralla
   gireceği, ve bu arada nereye gidileceği.

   Kuralın yazılı olması bölümün işini boşken de kısmen görüyor: "her kayıt
   resmî kaynağına bağlanır" cümlesi, doldurulmuş sahte bir akıştan daha
   güçlü bir güncellik iddiası — çünkü doğrulanabilir.

   RİTİM — TARİH EKSENİ
   Kayıt girdiği anda sayfa aya göre gruplanmış dikey bir eksene dönüşüyor:
   solda tarih, ortada kayıt, altında resmî kaynak bağlantısı. Kart ızgarası
   değil; bir akışta önemli olan sıra ve tarih, kartın kapladığı alan değil.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const META = RESOURCE_KINDS.gelisme;

export const metadata: Metadata = {
  title: "Gelişmeler ve mevzuat — tarih sırasıyla | Ortac Global",
  description:
    "Dubai, İngiltere ve KKTC tarafında neyin ne zaman değiştiği; her kayıt tarih, ülke ve resmî kaynak bağlantısıyla yayınlanır.",
  alternates: { canonical: `${SITE}/gelismeler` },
};

/* Bir kaydın taşımak ZORUNDA olduğu dört şey. Boşken de basılıyor: bölümün
   standardını göstermek, boş bir listeyi açıklamanın en kısa yolu — ve
   "anlatmıcaz göstericez" ilkesinin buradaki karşılığı. */
const RULES = [
  {
    Icon: CalendarDays,
    t: "Tarih",
    l: "Duyurunun tarihi; yürürlük tarihi farklıysa o da ayrıca yazılır.",
  },
  { Icon: Landmark, t: "Ülke", l: "Kayıt hangi ülkeyi ilgilendiriyor — ya da üçünü birden." },
  {
    Icon: FileCheck2,
    t: "Resmî kaynak",
    l: "Otoritenin kendi duyurusuna bağlantı. Kaynağı olmayan kayıt yayınlanmıyor.",
  },
  { Icon: Users, t: "Kimi ilgilendiriyor", l: "Ve varsa yapılması gereken tek şey." },
];

export default function GelismelerPage() {
  const months = updatesByMonth();
  const empty = UPDATES.length === 0;

  /* JSON-LD boşken yalnızca konum bilgisi taşıyor. Kayıt yokken bir
     `DataFeed`/`ItemList` düğümü yayınlamak, içi olmayan bir akış ilan
     etmek olurdu. Kayıt girdiğinde ItemList kendiliğinden doluyor. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Gelişmeler", item: `${SITE}/gelismeler` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Gelişmeler ve mevzuat",
        url: `${SITE}/gelismeler`,
        inLanguage: "tr-TR",
        ...(empty
          ? {}
          : {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: UPDATES.map((u, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: u.title,
                  url: u.source.url,
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

        <PageHero
          crumb="Gelişmeler"
          title="Neyin ne zaman değiştiği."
          accent="ne zaman değiştiği."
          lead="Kuruluş, vergi ve beyan tarafındaki değişiklikler tarih sırasıyla burada. Her kayıt resmî kaynağına bağlanır; bağlanamıyorsa yayınlanmaz."
        />

        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            {/* Kayıt kuralı — dolu da olsa boş da olsa duruyor. Doluyken
                okuyanın kayda nasıl güveneceğini, boşken listenin neden boş
                olduğunu anlatıyor. */}
            <FadeUp>
              <div className="kyn-rules">
                <p className="kyn-rules-h">Bir kayıt dört şeyi taşımadan yayınlanmıyor</p>
                <ul>
                  {RULES.map((r) => (
                    <li key={r.t}>
                      <span className="kyn-rules-ic" aria-hidden="true">
                        <r.Icon size={16} strokeWidth={1.9} />
                      </span>
                      <b>{r.t}</b>
                      <em>{r.l}</em>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {empty ? (
              <KynEmpty
                meta={META}
                exits={[
                  {
                    label: "İlk 12 ay yükümlülük takvimi",
                    href: "/araclar#yukumluluk-takvimi",
                    line: "Kuruluş tarihinizi yazın, hangi ay ne çıktığını görün.",
                  },
                  {
                    label: "Dubai · vergi çerçevesi",
                    href: "/dubai#vergi",
                    line: "Yayınlanan oranlar ve kayıt yükümlülüğü.",
                  },
                  {
                    label: "Blog",
                    href: "/blog",
                    line: "Konuyu açan yazılar, kaynağıyla birlikte.",
                  },
                ]}
              />
            ) : (
              /* AKIŞ — aya göre gruplanmış dikey eksen. */
              <div className="kyn-feed">
                {months.map((m) => (
                  <div key={m.key} className="kyn-month">
                    <h2 className="kyn-month-h">{m.label}</h2>

                    <ol className="kyn-feed-l">
                      {m.items.map((u) => (
                        <li key={u.id}>
                          <FadeUp>
                            <article className="kyn-up">
                              <div className="kyn-up-meta">
                                <time dateTime={u.date}>{formatDate(u.date)}</time>
                                <span className="kyn-chip">{countryLabel(u.country)}</span>
                                <span className="kyn-chip" data-tone={u.channel}>
                                  {UPDATE_CHANNEL_LABEL[u.channel]}
                                </span>
                              </div>

                              <h3 className="kyn-up-t">{u.title}</h3>
                              <p className="kyn-up-s">{u.summary}</p>

                              <dl className="kyn-up-kv">
                                <div>
                                  <dt>Kimi ilgilendiriyor</dt>
                                  <dd>{u.who}</dd>
                                </div>
                                {u.effectiveFrom && (
                                  <div>
                                    <dt>Yürürlük</dt>
                                    <dd>
                                      <time dateTime={u.effectiveFrom}>
                                        {formatDate(u.effectiveFrom)}
                                      </time>
                                    </dd>
                                  </div>
                                )}
                                {u.action && (
                                  <div>
                                    <dt>Yapılması gereken</dt>
                                    <dd>{u.action}</dd>
                                  </div>
                                )}
                              </dl>

                              <div className="kyn-up-foot">
                                {/* Resmî kaynak site dışı: SmartLink dolaşım
                                    kararı veren bir bileşen ve dış adreste
                                    işi yok. Yeni sekme, çünkü ziyaretçi
                                    otoritenin sayfasına gidip akışa dönüyor. */}
                                <a
                                  href={u.source.url}
                                  className="kyn-src"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Kaynak: {u.source.name}
                                  <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                                </a>

                                {u.related && (
                                  <SmartLink href={u.related.href} className="kyn-rel">
                                    {u.related.label}
                                  </SmartLink>
                                )}
                              </div>
                            </article>
                          </FadeUp>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <KynSwitch current="gelisme" />
        <FinalCta />
      </main>
    </>
  );
}
