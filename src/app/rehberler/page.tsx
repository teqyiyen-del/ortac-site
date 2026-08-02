import type { Metadata } from "next";
import { ArrowDown, ArrowRight, ArrowUpRight, Info } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import FinalCta from "@/components/FinalCta";
import KynSwitch from "@/components/kaynaklar/KynSwitch";
import { GUIDES } from "@/lib/resources";
import { blogHref, formatDate } from "@/lib/blog";

/* ============================================================================
   /rehberler — ülke rehberleri
   ============================================================================

   REHBER NEDİR, NE DEĞİLDİR
   Müşterinin tarifi: "ülkede yapılabilecek şeyler fln o tarz şeyleri anlatan."
   Bu içerik sitede zaten var — yapı seçimi, fiyat, süreç, evrak, vergi, para
   tarafı ve kuruluş sonrası, hepsi ülke sayfasında yazılı. Eksik olan metin
   değil YOL: hangi sorunun nerede cevaplandığı.

   O yüzden rehber bir yazı değil, numaralı bir yol. Her durak gerçek bir
   adrese iniyor (ülke sayfası ya da o sayfadaki çapa); hiçbiri uydurulmuyor.
   Duraklar da elle yazılmıyor, ülkenin kendi verisinden türüyor — bkz.
   lib/resources.ts · buildGuide.

   RİTİM — YOL
   Blog bir liste, gelişmeler bir tarih ekseni, e-kitaplar bir raf. Burası
   numaralı bir dikey yol: solda numara ve bağlantı çizgisi, sağda soru.
   Dördü aynı kart ızgarası olsaydı müşterinin şikâyeti ("hepsi aynı yere
   çıkıyor") sunumda aynen sürerdi.

   İKİ ÜLKENİN YOLU NEDEN SÖNÜK
   /ingiltere ve /kktc dolaşıma kapalı (lib/routes.ts). SmartLink o durakları
   sönük ve tıklanamaz basıyor. Rehberi hiç göstermemek yerine sönük
   göstermek bilinçli: yolun kendisi doğru, yalnızca varış noktaları henüz
   açılmadı — ve sitedeki yerleşik anlatım biçimi bu.

   BOŞ DURUM
   Bu sayfanın boş hâli yok: rehberin içeriği ülkenin kendi verisinden
   geliyor, yani üç ülke de ilk günden dolu. Boş olabilecek tek parça
   "bu ülke hakkında yazdıklarımız" listesi — o da boşsa hiç basılmıyor,
   çünkü yolun sonunda boş bir başlık, olmayan bir arşivi ilan ederdi.
   ========================================================================= */

const SITE = "https://ortacglobal.com";

export const metadata: Metadata = {
  title: "Ülke rehberleri — Dubai, İngiltere ve KKTC | Ortac Global",
  description:
    "Üç ülkenin her biri için adım adım yol: yapı seçimi, kuruluş bedeli, süreç, evrak, vergi, tahsilat ve kuruluş sonrası yükümlülükler.",
  alternates: { canonical: `${SITE}/rehberler` },
};

export default function RehberlerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Ülke rehberleri", item: `${SITE}/rehberler` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Ülke rehberleri",
        url: `${SITE}/rehberler`,
        inLanguage: "tr-TR",
        /* Üç kayıt da gerçek: her biri bu sayfadaki bir bölüme iniyor.
           Uydurma başlık yok, sayfa sayısı ya da puan gibi doğrulanamaz
           alan hiç yazılmıyor. */
        mainEntity: {
          "@type": "ItemList",
          itemListElement: GUIDES.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${g.name} rehberi`,
            url: `${SITE}/rehberler#${g.anchor}`,
          })),
        },
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
          crumb="Ülke rehberleri"
          title="Üç ülke, üç yol haritası."
          accent="üç yol haritası."
          lead="Her rehber bir soru dizisi: yapıyı nasıl seçersiniz, ne kadar tutar, hangi evrak istenir, vergi tarafında ne var, kurduktan sonra ne çıkar. Her durak sitedeki gerçek bir bölüme iniyor."
        />

        {/* Sayfanın dizini — /araclar'daki kalıbın aynısı. Üç ülkenin de adı
            tek ekranda görünsün diye: aşağısı üç uzun panel. */}
        <section className="kyn-intro">
          <div className="container-o">
            <FadeUp>
              <ol className="kyn-index">
                {GUIDES.map((g, i) => (
                  <li key={g.country}>
                    <a href={`#${g.anchor}`} className="kyn-index-a">
                      <span className="kyn-index-n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="kyn-index-b">
                        <b>{g.name}</b>
                        <em>{g.tagline}</em>
                      </span>
                      <ArrowDown size={16} strokeWidth={2.1} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ol>
            </FadeUp>
          </div>
        </section>

        {/* .sec-pad kullanılmıyor: üç panel arka arkaya geldiğinde bölüm
            dolgusu iki katına çıkıp aralarında 224px boşluk bırakıyor. Dolgu
            .kyn-guide'ın kendi kuralında. */}
        {GUIDES.map((g) => (
          <section key={g.country} id={g.anchor} className="kyn-guide">
            <div className="container-o">
              <div className="kyn-guide-head">
                <FadeUp>
                  <span className="kyn-cat">{g.tagline}</span>
                  <h2 className="kyn-guide-t">{g.name}</h2>
                  <p className="kyn-guide-l">{g.lead}</p>
                </FadeUp>

                <FadeUp delay={0.1}>
                  <dl className="kyn-facts">
                    {g.facts.map((f) => (
                      <div key={f.k}>
                        <dt>{f.k}</dt>
                        <dd>{f.v}</dd>
                      </div>
                    ))}
                  </dl>

                  {/* Ülkenin dürüst kısıtı. Rehberin işi ülkeyi satmak değil;
                      kısıt burada da saklanmıyor (brand.ts · FACTS.limit). */}
                  <p className="kyn-limit">
                    <Info size={15} strokeWidth={2.1} aria-hidden="true" />
                    {g.limit}
                  </p>
                </FadeUp>
              </div>

              {/* YOL — numaralı duraklar. <ol> çünkü sıra bilgi taşıyor:
                  yapı seçimi fiyattan önce geliyor. */}
              <ol className="kyn-path">
                {g.chapters.map((ch, i) => (
                  <li key={ch.href}>
                    <FadeUp delay={0.06 + i * 0.04}>
                      <SmartLink href={ch.href} className="kyn-step">
                        <span className="kyn-step-n" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="kyn-step-b">
                          <b>{ch.q}</b>
                          <em>{ch.line}</em>
                        </span>
                        <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                      </SmartLink>
                    </FadeUp>
                  </li>
                ))}
              </ol>

              {/* Yolun sonu iki çıkış: ülkenin kendi sayfası ve — varsa — o
                  ülke hakkında yazdıklarımız. İkincisi boşsa hiç basılmıyor. */}
              <FadeUp delay={0.2}>
                <div className="kyn-guide-foot">
                  <SmartLink href={g.href} className="kyn-exit">
                    <span>
                      <b>{g.name} sayfasının tamamı</b>
                      <em>Yukarıdaki duraklar tek sayfada, sırasıyla.</em>
                    </span>
                    <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                  </SmartLink>

                  {g.posts.map((p) => (
                    <SmartLink key={p.slug} href={blogHref(p.slug)} className="kyn-exit">
                      <span>
                        <b>{p.title}</b>
                        <em>
                          {p.summary} · <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                        </em>
                      </span>
                      <ArrowUpRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  ))}
                </div>
              </FadeUp>
            </div>
          </section>
        ))}

        <KynSwitch current="rehber" />
        <FinalCta />
      </main>
    </>
  );
}
