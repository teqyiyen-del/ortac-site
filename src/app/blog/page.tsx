import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FinalCta from "@/components/FinalCta";
import KynSwitch from "@/components/kaynaklar/KynSwitch";
import BlogHub from "@/app/blog/BlogHub";
import { blogHref, sortedPosts } from "@/lib/blog";

/* ============================================================================
   /blog — bütün yazılar
   ============================================================================

   BU SAYFA NEDEN ŞİMDİ BÖYLE
   Site aylardır iki ayrı bölüm taşıyordu: /blog (yazılar) ve /rehberler (ülke
   rehberleri). Müşterinin sorusu şuydu: "iki farklı sayfa olması biraz google
   ın kafasını karıştırır mı emin değilim?"

   Cevap ve verilen karar: iki ayrı üst düzey bölüm Google'ı KARIŞTIRMAZ —
   arama motorları site bölümlerini gayet iyi ayırt eder. Asıl risk
   SEYRELMEYDİ: içeriği az bir sitede iki bölüm aynı konu alanı için yarışır,
   iç bağlantılar ve otorite ikiye bölünür. Sitede bugün bir yayınlanmış yazı
   var; onu iki bölüme dağıtmak ikisini de zayıf bırakırdı. Bölüm birleşti,
   tür bir SÜZGEÇ oldu:

     /blog            · hepsi                          ← bu sayfa
     /blog/rehberler  · yalnızca ülke rehberleri
     /blog/<slug>     · yazının kendisi, türünden bağımsız

   İkisi de gerçek sayfa: kendi başlığı, kendi h1'i, kendi açıklaması ve kendi
   kanoniği var. Aynı içeriği listelemiyorlar — biri hepsi, öteki alt küme.

   /rehberler adresi boş bırakılmadı: app/rehberler kalıcı olarak buraya
   yönlendiriyor (bkz. o dosyanın başı).
   ========================================================================= */

const SITE = "https://ortacglobal.com";

export const metadata: Metadata = {
  title: "Blog ve ülke rehberleri | Ortac Global",
  description:
    "Dubai, İngiltere ve KKTC'de şirket kurma, vergi, banka ve kuruluş sonrası yükümlülükler üzerine yazılar; ülke rehberleriyle birlikte tek listede. Her yazıda rakamın hangi belgeden geldiği yazılı.",
  alternates: { canonical: `${SITE}/blog` },
};

export default function BlogIndexPage() {
  /* Yalnızca YAYINLANMIŞ yazılar. Hazırlanan kayıtlar listede görünüyor ama
     JSON-LD'ye girmiyor: yazılmamış bir yazıyı arama motoruna yayın diye
     bildirmek, sayfada dürüstçe "hazırlanıyor" yazarken tam tersini söylemek
     olurdu. */
  const posts = sortedPosts();

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
      /* Boş bir `Blog` düğümü, içinde tek yayın olmayan bir blog ilan etmek
         olurdu. */
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

        {/* Sayfadaki tek h1. */}
        <PageHero
          crumb="Blog"
          title="Yazılar ve ülke rehberleri, tek listede."
          accent="tek listede."
          lead="İkisi de aynı şey: tıklayınca açılan bir yazı. Ayrım konusal — blog bir konuyu açıyor, ülke rehberi o ülkede ne yapılabileceğini anlatıyor. Üstteki anahtar yalnızca rehberleri süzüyor."
        />

        <BlogHub view="all" />

        <KynSwitch current="blog" />
        <FinalCta />
      </main>
    </>
  );
}
