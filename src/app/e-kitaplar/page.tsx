import type { Metadata } from "next";
import { Download } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import FinalCta from "@/components/FinalCta";
import KynEmpty from "@/components/kaynaklar/KynEmpty";
import KynSwitch from "@/components/kaynaklar/KynSwitch";
import { formatDate } from "@/lib/blog";
import { RESOURCE_KINDS, countryLabel, sortedEbooks } from "@/lib/resources";

/* ============================================================================
   /e-kitaplar — indirilebilir uzun içerik
   ============================================================================

   BUGÜN NEDEN BOŞ
   `public/` altında tek bir PDF yok; depo kontrol edildi. Buna rağmen sitede
   üç "rehber" kaydı üç ayrı yerde listeleniyordu (ana sayfa, navbar,
   /kaynaklar) ve üçü de indirilemiyordu — tıklayan ziyaretçi dosya yerine
   başka bir sayfaya gidiyordu. Bu sayfa o üç kaydı devralmıyor: dosyası
   olmayan e-kitap listelenmiyor (yer tutucular lib/resources.ts ·
   PENDING_EBOOKS'ta duruyor ve tipleri `Ebook` değil, yani yanlışlıkla
   yayına alınamıyorlar).

   RİTİM — RAF
   Bir e-kitap bir yazı değil, bir DOSYA. O yüzden satır da dosya gibi
   duruyor: solda sırtı olan bir kapak bloğu, ortada ne olduğu, sağda biçim,
   sayfa sayısı, boyut ve indirme. Blogdaki gibi okuma süresi ya da özet
   alıntısı yok — indirmeye gelen kişinin sorduğu şey "ne kadar, ne biçimde,
   ne zaman güncellendi".

   İNDİRME BAĞLANTISI SmartLink DEĞİL
   SmartLink sitenin dolaşım kararını uyguluyor (lib/routes.ts) ve bir sayfa
   adresi bekliyor. Buradaki hedef bir sayfa değil, public/ altındaki gerçek
   dosya; `download` niteliğiyle düz <a>. Şemanın kuralı sayesinde bu bağlantı
   hiçbir zaman boşa düşmüyor: dosyası olmayan kayıt zaten yazılamıyor.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const META = RESOURCE_KINDS.ekitap;

export const metadata: Metadata = {
  title: "E-kitaplar — indirilebilir rehberler | Ortac Global",
  description:
    "Kuruluş ve kuruluş sonrası için indirilebilir uzun içerik. İndirmek için bilgi istemiyoruz; dosya hazır olmadan kayıt listelenmiyor.",
  alternates: { canonical: `${SITE}/e-kitaplar` },
};

const nf = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 });

export default function EbooksPage() {
  const books = sortedEbooks();
  const empty = books.length === 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "E-kitaplar", item: `${SITE}/e-kitaplar` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "E-kitaplar",
        url: `${SITE}/e-kitaplar`,
        inLanguage: "tr-TR",
        /* Dosya yokken hiçbir `DigitalDocument` düğümü yazılmıyor: indirme
           adresi olmayan bir belgeyi işaretlemek, arama motoruna var olmayan
           bir dosyayı bildirmek olurdu. */
        ...(empty
          ? {}
          : {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: books.map((b, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  item: {
                    "@type": "DigitalDocument",
                    name: b.title,
                    description: b.summary,
                    url: `${SITE}${b.file}`,
                    encodingFormat: "application/pdf",
                    dateModified: b.updatedAt,
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

        <PageHero
          crumb="E-kitaplar"
          title="İndirin, yanınızda götürün."
          accent="yanınızda götürün."
          lead="Uzun içerik tek dosyada. İndirmek için form doldurmuyorsunuz, e-posta bırakmıyorsunuz; dosyası hazır olmayan bir e-kitabı da listelemiyoruz."
        />

        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            {empty ? (
              <KynEmpty
                meta={META}
                exits={[
                  {
                    label: "Ülke rehberleri",
                    href: "/rehberler",
                    line: "Aynı bilgi sitede duruyor: üç ülkenin adım adım yolu.",
                  },
                  {
                    label: "Belge kontrol listesi",
                    href: "/araclar#belge-listesi",
                    line: "İşaretleyip düz metin olarak kopyalayabileceğiniz liste.",
                  },
                ]}
              />
            ) : (
              <ul className="kyn-shelf">
                {books.map((b, i) => (
                  <li key={b.id}>
                    <FadeUp delay={i * 0.05}>
                      <article className="kyn-book">
                        {/* Kapak çizim: dosyanın kendisinden bir küçük resim
                            üretmiyoruz. Sırt + biçim rozeti, bir kapak
                            fotoğrafı uydurmadan "bu bir dosya" diyor. */}
                        <span className="kyn-book-cover" aria-hidden="true">
                          <span className="kyn-book-spine" />
                          <span className="kyn-book-fmt">{b.format}</span>
                        </span>

                        <div className="kyn-book-b">
                          <span className="kyn-cat">{countryLabel(b.country)}</span>
                          <h2 className="kyn-book-t">{b.title}</h2>
                          <p className="kyn-book-s">{b.summary}</p>
                          <p className="kyn-book-m">
                            {b.pages} sayfa
                            <span className="kyn-dot" aria-hidden="true" />
                            {nf.format(b.sizeMb)} MB
                            <span className="kyn-dot" aria-hidden="true" />
                            Güncellendi:{" "}
                            <time dateTime={b.updatedAt}>{formatDate(b.updatedAt)}</time>
                          </p>
                        </div>

                        <a href={b.file} className="kyn-dl" download>
                          <Download size={16} strokeWidth={2} aria-hidden="true" />
                          İndir
                        </a>
                      </article>
                    </FadeUp>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <KynSwitch current="ekitap" />
        <FinalCta />
      </main>
    </>
  );
}
