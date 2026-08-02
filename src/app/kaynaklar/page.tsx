import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import ContentHub from "@/components/ContentHub";
import FinalCta from "@/components/FinalCta";
import { KIND_ORDER, RESOURCE_KINDS } from "@/lib/resources";

/* ============================================================================
   /kaynaklar — dört türün girişi
   ============================================================================

   Bu sayfa artık içerik listelemiyor. Müşterinin şikâyeti buradaydı:
   "kaynaklar kısmında aslında hepsi aynı yere çıkıyor." Sayfanın tek işi dört
   türü ayırmak ve her birini kendi adresine göndermek — /blog, /rehberler,
   /gelismeler, /e-kitaplar. Listeleme işi o dört sayfanın kendisinde ve dördü
   birbirine benzemiyor (bkz. components/ContentHub.tsx).
   ========================================================================= */

const SITE = "https://ortacglobal.com";

export const metadata: Metadata = {
  title: "Kaynaklar — blog, ülke rehberleri, gelişmeler ve e-kitaplar | Ortac Global",
  description:
    "Dört ayrı kaynak: konuyu açan yazılar, üç ülkenin adım adım yolu, tarih sırasıyla gelişmeler ve indirilebilir e-kitaplar.",
  alternates: { canonical: `${SITE}/kaynaklar` },
};

export default function KaynaklarPage() {
  /* Dört kaydın dördü de gerçek sayfa. Sayfada olmayan hiçbir şey (yazı
     sayısı, indirme adedi, puan) işaretlemeye girmiyor. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Kaynaklar", item: `${SITE}/kaynaklar` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Kaynaklar",
        url: `${SITE}/kaynaklar`,
        inLanguage: "tr-TR",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: KIND_ORDER.map((k, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: RESOURCE_KINDS[k].label,
            url: `${SITE}${RESOURCE_KINDS[k].href}`,
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
          crumb="Kaynaklar"
          title="Ne aradığınıza göre dört ayrı yer."
          accent="dört ayrı yer."
          lead="Bir konuyu okumak, bir ülkede yolunuzu bulmak, neyin ne zaman değiştiğini görmek ve bir dosya indirmek ayrı işler. Her biri kendi sayfasında; hangisinin hazır olduğunu da saklamıyoruz."
        />
        <ContentHub />
        <FinalCta />
      </main>
    </>
  );
}
