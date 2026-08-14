import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FinalCta from "@/components/FinalCta";
import KynSwitch from "@/components/kaynaklar/KynSwitch";
import BlogHub from "@/app/blog/BlogHub";
import { blogHref, publishedPosts } from "@/lib/blog";

/* ============================================================================
   /blog — bölümün kökü, bütün kayıtlar
   ============================================================================

   BU SAYFA NEDEN ŞİMDİ BÖYLE
   Site aylardır iki ayrı bölüm taşıyordu: /blog (yazılar) ve /rehberler (ülke
   rehberleri). Müşterinin sorusu şuydu: "iki farklı sayfa olması biraz google
   ın kafasını karıştırır mı emin değilim?" Sonraki turda da kafa karışıklığı
   sürdü ve kararı kendisi verdi: "hiç kafa karıştırmayıp blogun bir
   katagorisi olarak mı konumlandırsak."

   Cevap ve verilen karar: iki ayrı üst düzey bölüm Google'ı KARIŞTIRMAZ —
   arama motorları site bölümlerini gayet iyi ayırt eder. Asıl risk
   SEYRELMEYDİ: içeriği az bir sitede iki bölüm aynı konu alanı için yarışır,
   iç bağlantılar ve otorite ikiye bölünür. Sitede bugün bir yayınlanmış yazı
   var; onu iki bölüme dağıtmak ikisini de zayıf bırakırdı. Bölüm birleşti ve
   ülke rehberi bir KATEGORİ oldu:

     /blog                        · hepsi                    ← bu sayfa
     /blog/kategori/<kategori>    · tek kategori, beşi de aynı kalıpta
     /blog/<slug>                 · yazının kendisi, kategorisinden bağımsız

   BU SAYFA YİNE "HEPSİ" ve bu bilinçli bir geri dönüş. Bir tur önce /blog
   yalnızca "blog" türünü listeliyordu, çünkü anahtarın iki durağı vardı ve
   müşteri kapsayan bir "Tümü" durağı istemiyordu ("tümü gibi bir şey lazım
   değil"). O cümle iki duraklı bir anahtar içindi: "Tümü" ile "Ülke rehberi"
   eş düzey duruyor ama biri ötekini kapsıyordu. Beş kategoride durum başka —
   kategoriler birbirini kapsamıyor ve bölümün bir KÖKÜ olması gerekiyor:
   gezinme çubuğu, footer ve iç bağlantılar buraya işaret ediyor, bir
   kategoriye girenin listenin tamamına dönecek yeri burası.

   Altı adresin altısı da gerçek sayfa: kendi başlığı, kendi h1'i, kendi
   açıklaması ve kendi kanoniği var.

   ESKİ ADRESLER BOŞ BIRAKILMADI: /rehberler ve /blog/rehberler, ülke rehberi
   kategorisine 308 ile yönleniyor (app/rehberler, app/blog/rehberler).

   BU TURDA DEĞİŞEN TEK ŞEY: bu sayfadaki kategori şeridi artık GEZİNMİYOR,
   SÜZÜYOR (BlogHub · interactive). Müşteri: "blogda katagori seçtiğimizde link
   değişip yeniden yüklenmesin sayfa ya … sayfaya f5 atmışız gibi olmasın."
   Kurgunun tamamı app/blog/BlogFilter.tsx dosya başında.

   KANONİK DEĞİŞMEDİ ve değişmemeli: süzülmüş liste adres çubuğunda
   /blog#<slug> olarak görünüyor, ama çapa (#) bir adres parçası değil — arama
   motoru onu /blog'un kendisi sayıyor. Yani süzgeç YENİ BİR ADRES ÜRETMİYOR ve
   çift içerik doğurmuyor. Bu, hash'in pushState ile kategori adresini yazmaya
   tercih edilme sebeplerinden biri: adres çubuğuna /blog/kategori/<slug>
   yazsaydık, sunulan belgenin kanoniği ve h1'i başka bir sayfaya ait olurdu.

   Beş kategori adresi bu sayfadan HÂLÂ BAĞLANIYOR: çipler işaretlemede gerçek
   <a href="/blog/kategori/…">, JS yalnızca tıklamayı yakalıyor. Tarayıcı
   robotu ve JS kapalı ziyaretçi beş sayfayı buradan buluyor.
   ========================================================================= */

const SITE = "https://ortacglobal.com";

export const metadata: Metadata = {
  title: "Blog: şirket kurma, vergi ve ülke rehberleri | Ortac Global",
  description:
    "Dubai, İngiltere ve KKTC'de şirket kurma, vergi, banka ve kuruluş sonrası yükümlülükler üzerine yazılar ve ülke rehberleri. Her yazıda rakamın hangi belgeden geldiği yazılı. Beş kategori, tek liste.",
  alternates: { canonical: `${SITE}/blog` },
};

export default function BlogIndexPage() {
  /* JSON-LD YALNIZCA GERÇEK YAZILARI TANIYOR. Listede yer tutucular da var ve
     olması isteniyor — ama görsel yer tutucu bir tasarım kararı;
     yapılandırılmış veriye sahte BlogPosting yazmak arama motoruna yanlış
     beyandır. Bugün bu dizi tek kayıt döndürüyor.

     SÜZGEÇ YİNE `publishedPosts`: sayfa bütün kategorileri listeliyor, yani
     yapılandırılmış verinin de hepsini kapsaması gerekiyor. Kategori
     sayfalarındaki CollectionPage'ler bu Blog düğümüne `isPartOf` ile
     bağlanıyor (bkz. blog/kategori/[kategori]/page.tsx), yani aynı yazı iki
     yerde ilan edilmiş olmuyor: burada BlogPosting, orada listede bir
     ListItem. */
  const posts = publishedPosts();

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
          title="Blog yazıları ve ülke rehberleri."
          accent="ülke rehberleri."
          lead="Bir yazı bir konuyu açıyor: maliyet kalemi, vergi kaydı, banka görüşmesi, yıl sonu kapanışı. Ülke rehberi ise bir ülkede nelerin yapılabildiğini anlatıyor ve ayrı bir bölüm değil, buradaki beş kategoriden biri. Üstteki şerit listeyi süzüyor."
        />

        {/* Bölümün kökü: şerit burada süzgeç. Kategori sayfaları aynı bileşeni
            `interactive` olmadan çağırıyor — gerekçe BlogHub dosya başında. */}
        <BlogHub view="tumu" interactive />

        <KynSwitch current="blog" />
        <FinalCta />
      </main>
    </>
  );
}
