import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import FinalCta from "@/components/FinalCta";
import KynSwitch from "@/components/kaynaklar/KynSwitch";
import BlogHub from "@/app/blog/BlogHub";
import { blogHref, GUIDES_HREF, publishedOfKind } from "@/lib/blog";
import { COUNTRY_NAME, COUNTRY_ORDER, FACTS } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* ============================================================================
   /blog/rehberler — yalnızca ülke rehberleri
   ============================================================================

   BU SAYFA NEDİR
   /blog'un alt kümesi: aynı bölümün "ülke rehberi" türüne süzülmüş hâli.
   Yazılar burada DEĞİL /blog/<slug>'da yaşıyor; bu sayfa bir dizin, bir
   içerik deposu değil. Adresin /blog altında olması bilinçli — bölüm tek ve
   bütün iç bağlantılar oraya işaret ediyor (gerekçe: app/blog/page.tsx başı).

   ESKİ /rehberler SAYFASINA NE OLDU
   O sayfa rehberi bir YOL olarak kuruyordu: ülkenin kendi verisinden türeyen
   numaralı bir soru listesi, her durak ülke sayfasındaki bir çapaya iniyordu.
   Fikir işe yarıyordu ama müşterinin tarifiyle uyuşmuyor: rehber artık bir
   YAZI TÜRÜ ("tıklayacak ve yazı açılacak"). Yolun tamamını buraya taşımak,
   bu sayfayı asıl işi olan rehber listesinden uzaklaştırır ve üç ülkenin
   yirmi küsur durağı listenin önüne geçerdi.

   Yolun KORUNAN parçası aşağıdaki "Ülkelerin kendi sayfaları" şeridi: rehber
   metinleri yazılana kadar bir ziyaretçinin gerçekten okuyabileceği içerik
   ülke sayfalarında duruyor ve o üç çıkış burada. Şerit ülke verisinden
   türüyor (brand.ts + countryContent.ts), elle yazılmıyor.

   /rehberler adresi boş bırakılmadı: app/rehberler artık buraya kalıcı
   yönlendirme yapıyor.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const URL = `${SITE}${GUIDES_HREF}`;

export const metadata: Metadata = {
  title: "Ülke rehberleri — Dubai, İngiltere ve KKTC | Ortac Global",
  description:
    "Dubai, İngiltere ve KKTC'de neler yapılabildiğini anlatan rehberler. Blog bölümünün ülke rehberi türü; yazılar tek listede toplanıyor.",
  alternates: { canonical: URL },
};

export default function BlogGuidesPage() {
  /* JSON-LD YALNIZCA GERÇEK REHBERLERİ TANIYOR. Sayfadaki liste yer
     tutucularla dolu ve dolu olması isteniyor (müşterinin kararı, bkz.
     lib/blog.ts · SWAP:SEED_POSTS) — ama ekrandaki yer tutucu bir tasarım
     kararı, ItemList'e yazılmış yer tutucu arama motoruna yanlış beyandır.
     Bugün bu dizi BOŞ, dolayısıyla mainEntity hiç basılmıyor. */
  const guides = publishedOfKind("rehber");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
          { "@type": "ListItem", position: 3, name: "Ülke rehberleri", item: URL },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Ülke rehberleri",
        url: URL,
        inLanguage: "tr-TR",
        isPartOf: { "@type": "Blog", name: "Ortac Global Blog", url: `${SITE}/blog` },
        /* mainEntity yalnızca gerçekten yayın varsa — boş alan yazılmıyor. */
        ...(guides.length > 0
          ? {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: guides.map((p, i) => ({
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

        {/* Sayfadaki tek h1 — /blog'unkinden farklı, çünkü sayfa da farklı:
            biri hepsini listeliyor, burası bir türü. */}
        <PageHero
          crumb="Ülke rehberleri"
          title="Hangi ülkede neler yapılabilir?"
          accent="neler yapılabilir?"
          lead="Ülke rehberleri blog bölümünün bir türü: her biri bir ülkede hangi işlerin kurulabildiğini, kimin için anlamlı olduğunu ve sınırının nerede olduğunu anlatıyor. Aynı yazılar /blog listesinde de duruyor."
        />

        <BlogHub view="rehber" />

        {/* ---------- ÜLKELERİN KENDİ SAYFALARI ----------
            Rehber metinleri hazır olana kadar bu ülkeler hakkında doğrulanmış
            içerik ülke sayfalarında duruyor. Şerit eski /rehberler sayfasının
            korunan parçası; yirmi küsur duraklı yolun yerine üç çıkış, çünkü
            bu sayfanın asıl işi rehber listesi.

            İngiltere ve KKTC dolaşıma kapalı (lib/routes.ts): SmartLink o iki
            satırı sönük ve tıklanamaz basıyor. Hiç göstermemek yerine sönük
            göstermek sitenin yerleşik anlatımı — "burası olacak, henüz
            değil". */}
        <section className="sec-pad" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <FadeUp>
              <h2 className="bh-cty-h">Ülkelerin kendi sayfaları</h2>
              <p className="bh-cty-l">
                Bir ülke hakkında bugün yayında olan her şey — yapı seçimi, kuruluş
                bedeli, süreç, evrak, vergi çerçevesi ve para tarafı — kendi
                sayfasında duruyor.
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

        {/* Bu sayfa da blog türünün bir yüzeyi: şerit "Blog"u bulunulan tür
            olarak işaretliyor. */}
        <KynSwitch current="blog" />
        <FinalCta />
      </main>
    </>
  );
}
