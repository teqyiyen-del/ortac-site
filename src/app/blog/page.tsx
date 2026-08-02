import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import FinalCta from "@/components/FinalCta";
import KynEmpty from "@/components/kaynaklar/KynEmpty";
import KynSwitch from "@/components/kaynaklar/KynSwitch";
import { blogHref, formatDate, readingMinutes, sortedPosts } from "@/lib/blog";
import { RESOURCE_KINDS } from "@/lib/resources";

/* ============================================================================
   /blog — yazı dizini
   ============================================================================

   BU SAYFA NEDEN ŞİMDİ VAR
   Site aylardır üç yerden "/blog"a bağlanıyordu (navbar Kaynaklar paneli,
   footer, ana sayfadaki mevzuat sütunu) ama /blog diye bir sayfa hiç
   yazılmamıştı. Kimsenin fark etmemesinin sebebi app/[...yapim] yakalayıcısı:
   inşa edilmemiş her adres oraya düşüyor ve "yapım aşamasında" kartını HTTP
   200 ile basıyor. Bağlantı ölüydü, durum kodu temizdi. Artık sayfa burada.

   RİTİM — LİSTE
   Dört kaynak türünün dördü de ayrı görünmek zorunda; bu sayfanınki en
   sade olan: bir öne çıkan yazı, altında tarih sırasıyla düz satırlar. Kart
   ızgarası değil, çünkü kart ızgarası bu sitede "seçenekler" demek (hizmetler,
   ülkeler, araçlar). Yazı listesi bir seçenek listesi değil, bir arşiv.

   BUGÜN LİSTEDE NE VAR
   Tek yazı: lib/blog.ts'teki Dubai maliyet yazısı. Bir tane olduğu için
   yalnızca öne çıkan blok basılıyor, altındaki satır listesi hiç açılmıyor —
   tek satırlık bir "arşiv", arşivi olmayan bir siteyi arşivi varmış gibi
   gösterirdi (blog/[slug]'daki "diğer yazılar" bloğuyla aynı kural).
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const META = RESOURCE_KINDS.blog;

export const metadata: Metadata = {
  title: "Blog — kaynağı yazılı yazılar | Ortac Global",
  description:
    "Dubai, İngiltere ve KKTC'de şirket kurma, vergi, banka ve kuruluş sonrası yükümlülükler üzerine yazılar. Her yazıda rakamın hangi belgeden geldiği yazılı.",
  alternates: { canonical: `${SITE}/blog` },
};

export default function BlogIndexPage() {
  const posts = sortedPosts();
  const [lead, ...rest] = posts;

  /* JSON-LD yalnızca gerçekten yazı varsa. Boş bir `Blog` düğümü, içinde tek
     yayın olmayan bir blog ilan etmek olurdu. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        ],
      },
      ...(posts.length > 0
        ? [
            {
              "@type": "Blog",
              name: "Ortac Global Blog",
              url: `${SITE}/blog`,
              inLanguage: "tr-TR",
              publisher: { "@type": "Organization", name: "Ortac Global", url: SITE },
              blogPost: posts.map((p) => ({
                "@type": "BlogPosting",
                headline: p.title,
                description: p.summary,
                url: `${SITE}${blogHref(p.slug)}`,
                datePublished: p.publishedAt,
                ...(p.updatedAt ? { dateModified: p.updatedAt } : {}),
                author: { "@type": "Organization", name: p.author, url: SITE },
              })),
            },
          ]
        : []),
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
          crumb="Blog"
          title="Yazılar, rakamın nereden geldiğiyle birlikte."
          accent="nereden geldiğiyle birlikte."
          lead="Her yazı tek bir konuyu açıyor ve içindeki her tutar depodaki doğrulanmış veriden okunuyor. Kaynağı gösterilemeyen bir rakam yazıya girmiyor."
        />

        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            {posts.length === 0 ? (
              <KynEmpty
                meta={META}
                exits={[
                  {
                    label: "Ülke rehberleri",
                    href: "/rehberler",
                    line: "Üç ülkede ne yapılabileceğinin adım adım yolu.",
                  },
                  {
                    label: "Araçlar",
                    href: "/araclar",
                    line: "Oturum sayacı, yükümlülük takvimi ve belge listesi.",
                  },
                ]}
              />
            ) : (
              <>
                {/* ÖNE ÇIKAN — listenin en yenisi. Yatay blok: görsel solda,
                    metin sağda. Altındaki satırlarla aynı ızgarayı
                    kullanmıyor, çünkü "en yeni" olduğunu boyutuyla söylemesi
                    gerekiyor; rozetle söylemek bir satır daha metin demek.

                    İŞARETLEME NOTU — kartın tamamı bir <a> DEĞİL. İki sebep:
                    (1) başlığın gerçek bir <h2> olması gerekiyor, oysa
                    SmartLink kapalı adreste <span> basıyor ve <span> içinde
                    <h2> geçersiz iç içelik; (2) tek bağlantı başlıkta
                    olduğunda ekran okuyucu bağlantı listesinde yazının adını
                    okuyor, "kart" diye anlamsız bir girdi değil. Kartın her
                    yerinden tıklanabilmesi CSS'teki görünmez örtüyle
                    sağlanıyor (.kyn-lead-a::after). */}
                <FadeUp>
                  <article className="kyn-lead">
                    <div className="kyn-lead-media">
                      {/* alt boş: SWAP:STOCK_PHOTOS ile gelen temsilî stok
                          fotoğraf, yazının bilgisini taşımıyor. `unoptimized`
                          — URL zaten Unsplash CDN'inde boyutlanmış ve
                          next.config'te remotePatterns tanımlı değil. */}
                      <Image
                        src={lead.cover}
                        alt=""
                        fill
                        sizes="(min-width: 900px) 46vw, 100vw"
                        className="kyn-lead-img"
                        unoptimized
                      />
                    </div>

                    <div className="kyn-lead-body">
                      <p className="kyn-lead-top">
                        <span className="kyn-flag">En yeni</span>
                        <span className="kyn-cat">{lead.category}</span>
                      </p>

                      <h2 className="kyn-lead-t">
                        <SmartLink href={blogHref(lead.slug)} className="kyn-lead-a">
                          {lead.title}
                        </SmartLink>
                      </h2>
                      <p className="kyn-lead-s">{lead.summary}</p>

                      <p className="kyn-lead-foot">
                        <time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time>
                        <span className="kyn-dot" aria-hidden="true" />
                        <span>{readingMinutes(lead)} dk okuma</span>
                        <span className="kyn-go" aria-hidden="true">
                          Yazıyı okuyun
                          <ArrowUpRight size={15} strokeWidth={2.1} />
                        </span>
                      </p>
                    </div>
                  </article>
                </FadeUp>

                {/* ARŞİV — ikinci yazı geldiği anda kendiliğinden açılıyor.
                    Satırlar da aynı kalıpta: başlık h2, bağlantı başlıkta. */}
                {rest.length > 0 && (
                  <ol className="kyn-list">
                    {rest.map((p, i) => (
                      <li key={p.slug}>
                        <FadeUp delay={0.08 + i * 0.05}>
                          <article className="kyn-row">
                            <time className="kyn-row-d" dateTime={p.publishedAt}>
                              {formatDate(p.publishedAt)}
                            </time>
                            <div className="kyn-row-b">
                              <span className="kyn-cat">{p.category}</span>
                              <h2>
                                <SmartLink href={blogHref(p.slug)} className="kyn-row-a">
                                  {p.title}
                                </SmartLink>
                              </h2>
                              <p>{p.summary}</p>
                            </div>
                            <span className="kyn-row-m">{readingMinutes(p)} dk</span>
                          </article>
                        </FadeUp>
                      </li>
                    ))}
                  </ol>
                )}

                {/* Tek yazı varken listenin bittiğini söylemek gerekiyor:
                    aksi hâlde sayfa "devamı yüklenmedi" gibi duruyor. */}
                {rest.length === 0 && (
                  <FadeUp delay={0.12}>
                    <p className="kyn-note">
                      Arşivde şimdilik tek yazı var. Yenileri yayınlandıkça bu listede tarih
                      sırasıyla birikecek.
                    </p>
                  </FadeUp>
                )}
              </>
            )}
          </div>
        </section>

        <KynSwitch current="blog" />
        <FinalCta />
      </main>
    </>
  );
}
