import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import FinalCta from "@/components/FinalCta";
import KynSwitch from "@/components/kaynaklar/KynSwitch";
import BlogHub from "@/app/blog/BlogHub";
import {
  blogHref,
  CATEGORY,
  CATEGORY_ORDER,
  categoryHref,
  GUIDE_CATEGORY,
  publishedOfCategory,
  type BlogCategory,
} from "@/lib/blog";
import { COUNTRY_NAME, COUNTRY_ORDER, FACTS } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* ============================================================================
   /blog/kategori/<kategori> — tek kategorinin listesi
   ============================================================================

   NEDEN TEK DOSYA, BEŞ SAYFA
   Beş kategori beş ayrı sayfa dosyası olsaydı beşi de aynı şeyi yapardı ve
   altıncı kategori eklendiğinde biri unutulurdu. Buradaki tek şablon
   CATEGORY kaydından besleniyor: yeni bir kategori, lib/blog.ts'e bir satır.

   NEDEN /blog/kategori/… VE /blog/<kategori> DEĞİL
   /blog altında zaten bir dinamik segment var: /blog/<slug>, yazının kendisi.
   Aynı derinlikte ikinci bir dinamik segment kurulamıyor; kurulsaydı
   "kurulus-sonrasi" adlı bir yazı ile aynı adlı kategori aynı adrese talip
   olurdu. Ara segment bu çakışmayı imkânsız kılıyor ve "kategori" adı
   RESERVED_BLOG_SLUGS'ta duruyor, yani o slug'la bir yazı yazılırsa derleme
   patlıyor (bkz. lib/blog.ts · RESERVED_SLUG_GUARD).

   ÜLKE REHBERİ BURADA — AYRI SAYFA DEĞİL
   Rehberin kendi rotası (/blog/rehberler) vardı ve müşterinin kafasını
   karıştıran şey buydu: bir kategori gibi anlatılıyor ama bir bölüm gibi
   duruyordu. Adres silinmedi, 308 ile buraya yönleniyor (app/blog/rehberler).
   Kanonik tek: /blog/kategori/ulke-rehberi.

   Rehber sayfasının TEK farkı aşağıdaki "Ülkelerin kendi sayfaları" şeridi.
   O şerit eski /rehberler sayfasının korunan parçası ve kategori taşınırken
   düşürülmedi: rehber metinleri yazılana kadar bir ziyaretçinin gerçekten
   okuyabileceği içerik ülke sayfalarında duruyor. Şerit ülke verisinden
   türüyor (brand.ts + countryContent.ts), elle yazılmıyor.
   ========================================================================= */

const SITE = "https://ortacglobal.com";

type Params = Promise<{ kategori: string }>;

/* Beş adres de derleme zamanında biliniyor: kategori listesi veriden. */
export function generateStaticParams() {
  return CATEGORY_ORDER.map((kategori) => ({ kategori }));
}

/** Adresteki segment gerçekten bir kategori mi? Değilse şablon notFound(). */
function categoryFor(value: string): BlogCategory | undefined {
  return CATEGORY_ORDER.find((c) => c === value);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { kategori } = await params;
  const category = categoryFor(kategori);
  if (!category) return {};

  const meta = CATEGORY[category];
  return {
    title: meta.seo.title,
    description: meta.seo.description,
    /* Kanonik kategorinin KENDİ adresi. Eski /blog/rehberler buraya 308
       döndüğü için tek bir kanonik kalıyor; iki adres aynı listeyi
       göstermiyor. */
    alternates: { canonical: `${SITE}${categoryHref(category)}` },
  };
}

export default async function BlogCategoryPage({ params }: { params: Params }) {
  const { kategori } = await params;
  const category = categoryFor(kategori);
  if (!category) notFound();

  const meta = CATEGORY[category];
  const url = `${SITE}${categoryHref(category)}`;
  const isGuides = category === GUIDE_CATEGORY;

  /* JSON-LD YALNIZCA GERÇEK YAZILARI TANIYOR. Ekrandaki liste yer
     tutucularla dolu ve dolu olması isteniyor (müşterinin kararı, bkz.
     lib/blog.ts · SWAP:SEED_POSTS) — ama ekrandaki yer tutucu bir tasarım
     kararı; ItemList'e yazılmış yer tutucu arama motoruna yanlış beyandır.

     SÜZGEÇ EKRANDAKİYLE AYNI EKSENDEN: sayfa `postsOfCategory`yi basıyor,
     burası `publishedOfCategory`yi sayıyor. İkisi aynı alana (`category`)
     bakıyor, yani yapılandırılmış veri ekranda duran listenin yayınlanmış alt
     kümesi — başka bir şeyin değil. Bugün yalnızca "maliyet-ve-vergi" bir
     kayıt döndürüyor; kalan dördünde dizi boş ve mainEntity hiç basılmıyor. */
  const posts = publishedOfCategory(category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
          { "@type": "ListItem", position: 3, name: meta.label, item: url },
        ],
      },
      {
        "@type": "CollectionPage",
        name: meta.label,
        url,
        inLanguage: "tr-TR",
        /* Kategori bölümün bir parçası, ayrı bir yayın değil: `isPartOf` tam
           olarak bunu söylüyor ve şemada da rehberin ayrı bölüm olmadığını
           belgeliyor. */
        isPartOf: { "@type": "Blog", name: "Ortac Global Blog", url: `${SITE}/blog` },
        ...(posts.length > 0
          ? {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: posts.map((p, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: p.title,
                  url: `${SITE}${blogHref(p.slug)}`,
                })),
              },
            }
          : {}),
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

        {/* Sayfadaki tek h1 — her kategoride farklı, çünkü sayfa da farklı.
            Metinler CATEGORY kaydından: şablon tek bir cümle taşımıyor. */}
        <PageHero
          crumb={meta.label}
          title={meta.title}
          accent={meta.accent}
          lead={meta.lead}
        />

        <BlogHub view={category} />

        {/* ---------- ÜLKELERİN KENDİ SAYFALARI ----------
            Yalnızca ülke rehberi kategorisinde. Rehber metinleri hazır olana
            kadar bu ülkeler hakkında doğrulanmış içerik ülke sayfalarında
            duruyor; şerit eski /rehberler sayfasının korunan parçası. Öteki
            dört kategoride basılmıyor çünkü onların konusu bir ülke değil.

            İngiltere ve KKTC dolaşıma kapalı (lib/routes.ts): SmartLink o iki
            satırı sönük ve tıklanamaz basıyor. Hiç göstermemek yerine sönük
            göstermek sitenin yerleşik anlatımı — "burası olacak, henüz
            değil". */}
        {isGuides && (
          <section className="sec-pad" style={{ background: "var(--paper)" }}>
            <div className="container-o">
              <FadeUp>
                <h2 className="bh-cty-h">Ülkelerin kendi sayfaları</h2>
                <p className="bh-cty-l">
                  Bir ülke hakkında bugün yayında olan her şey kendi sayfasında
                  duruyor: yapı seçimi, kuruluş bedeli, süreç, evrak, vergi çerçevesi
                  ve para tarafı.
                </p>
              </FadeUp>

              <ul className="bh-cty">
                {COUNTRY_ORDER.map((c, i) => (
                  <li key={c}>
                    <FadeUp delay={0.06 + i * 0.05}>
                      <SmartLink href={`/${c}`} className="bh-cty-a">
                        <span className="bh-cty-b">
                          <b>{COUNTRY_NAME[c]}</b>
                          <em>{COUNTRY_CONTENT[c].tagline}</em>
                          <i>{FACTS[c].forWhom}</i>
                        </span>
                        <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                      </SmartLink>
                    </FadeUp>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Kategori sayfası da blog bölümünün bir yüzeyi: şerit "Blog"u
            bulunulan tür olarak işaretliyor. */}
        <KynSwitch current="blog" />
        <FinalCta />
      </main>
    </>
  );
}
