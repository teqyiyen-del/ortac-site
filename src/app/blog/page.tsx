import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FinalCta from "@/components/FinalCta";
import KynSwitch from "@/components/kaynaklar/KynSwitch";
import BlogHub from "@/app/blog/BlogHub";
import { blogHref, publishedOfKind } from "@/lib/blog";

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

     /blog            · yalnızca blog yazıları         ← bu sayfa
     /blog/rehberler  · yalnızca ülke rehberleri
     /blog/<slug>     · yazının kendisi, türünden bağımsız

   BU SAYFA ARTIK "HEPSİ" DEĞİL — bu turun değişikliği. Anahtar "Tümü / Ülke
   rehberleri" diye ayrılıyordu ve /blog iki türü birden listeliyordu. Müşteri
   üçüncü seçeneği kaldırttı: "onu tümü ve ülke rehberi şeklinde değilde blog
   ve ülke rehberi şeklinde ayır ya tümü gibi bir şey lazım değil." Yani iki
   tür, iki liste, iki sayfa; hepsini bir arada gösteren bir görünüş yok.

   Bölüm yine TEK: adres kalıbı değişmedi, iki liste de aynı /blog altında ve
   yazıların hepsi /blog/<slug>'da yaşıyor. Değişen tek şey /blog'un neyi
   listelediği. Varsayılan buranın kalması bilinçli: bölümün kökü, gezinme
   çubuğunun ve iç bağlantıların işaret ettiği adres burası, ve sitedeki tek
   YAYINLANMIŞ yazı bir blog yazısı — ziyaretçiyi baştan yalnızca örnek
   kayıtlardan oluşan rehber listesine düşürmenin karşılığı yok.

   İkisi de gerçek sayfa: kendi başlığı, kendi h1'i, kendi açıklaması ve kendi
   kanoniği var. Artık kesişmiyorlar bile — biri bir türü, öteki ötekini
   listeliyor.

   /rehberler adresi boş bırakılmadı: app/rehberler kalıcı olarak buraya
   yönlendiriyor (bkz. o dosyanın başı).
   ========================================================================= */

const SITE = "https://ortacglobal.com";

export const metadata: Metadata = {
  title: "Blog: şirket kurma, vergi ve banka yazıları | Ortac Global",
  description:
    "Dubai, İngiltere ve KKTC'de şirket kurma, vergi, banka ve kuruluş sonrası yükümlülükler üzerine yazılar. Her yazıda rakamın hangi belgeden geldiği yazılı. Ülke rehberleri kendi listesinde.",
  alternates: { canonical: `${SITE}/blog` },
};

export default function BlogIndexPage() {
  /* JSON-LD YALNIZCA GERÇEK YAZILARI TANIYOR. Listede yer tutucular da var ve
     olması isteniyor — ama görsel yer tutucu bir tasarım kararı;
     yapılandırılmış veriye sahte BlogPosting yazmak arama motoruna yanlış
     beyandır. Bugün bu dizi tek kayıt döndürüyor.

     SÜZGEÇ `publishedPosts` DEĞİL `publishedOfKind("blog")`: bu sayfa artık
     yalnızca blog türünü listeliyor ve yapılandırılmış verinin ekranda duran
     şeyi anlatması gerekiyor. Rehberler kayıp olmuyor — kendi sayfasındaki
     CollectionPage onları sayıyor ve `isPartOf` ile bu Blog düğümüne
     bağlanıyor (bkz. blog/rehberler/page.tsx). */
  const posts = publishedOfKind("blog");

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
          title="Bir konuyu açan yazılar."
          accent="açan yazılar."
          lead="Blog bir konuyu açıyor: maliyet kalemi, vergi kaydı, banka görüşmesi, yıl sonu kapanışı. Ülke rehberi ise bir ülkede nelerin yapılabildiğini anlatıyor ve kendi listesinde duruyor. Üstteki anahtar ikisi arasında geçiş yapıyor."
        />

        <BlogHub view="blog" />

        <KynSwitch current="blog" />
        <FinalCta />
      </main>
    </>
  );
}
