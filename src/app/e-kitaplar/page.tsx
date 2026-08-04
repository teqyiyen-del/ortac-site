import type { Metadata } from "next";
import { Download } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import FinalCta from "@/components/FinalCta";
import KynSwitch from "@/components/kaynaklar/KynSwitch";
import { formatDate } from "@/lib/blog";
import {
  DRAFT_EBOOKS,
  DRAFT_EBOOK_COPY,
  RESOURCE_KINDS,
  countryLabel,
  sortedEbooks,
} from "@/lib/resources";

/* ============================================================================
   /e-kitaplar — indirilebilir uzun içerik
   ============================================================================

   RAF DOLU, DOSYA YOK — VE İKİSİ AYNI ANDA DOĞRU

   Müşteri: "oraya bir sürü placeholder log, e kitap vb doldurabilirsin yani
   sorun yok bunda." Raf on kayıtla dolu; dört ülke kapsamı, farklı uzunluklar.
   Tasarım dolu hâliyle değerlendirilebiliyor.

   Ama `public/` altında hâlâ tek bir PDF yok ve bu ekranda saklanmıyor. Bunu
   söylemenin yolu bir uyarı paneli DEĞİL (önceki turda öyleydi, müşteri
   kaldırttı): indirme düğmesi `disabled`, üstünde "Hazırlanıyor" yazıyor ve
   yanında tek satır duruyor. Sakin, kayıt başına, kartı bozmadan.

   İKİ TÜR SATIR VAR VE FARK TİPTE, İYİ NİYETTE DEĞİL
   · Yayındaki e-kitap (`Ebook`): `file` zorunlu → mavi "İndir" düğmesi ve
     `download` niteliğiyle düz bir <a>. Bugün böyle kayıt yok.
   · Yer tutucu (`DraftEbook`): `file` alanı TİPTE YOK. Yani indirme bağlantısı
     kurulamıyor — sahte indirme bir tercih değil, imkânsız. Kırık bağlantı da
     bırakmıyor: düğme bir <button disabled>, hiçbir yere gitmiyor.

   İNDİRME BAĞLANTISI NEDEN SmartLink DEĞİL
   SmartLink sitenin dolaşım kararını uyguluyor (lib/routes.ts) ve bir SAYFA
   adresi bekliyor. Yayındaki e-kitabın hedefi bir sayfa değil, public/ altındaki
   gerçek dosya; o yüzden `download` niteliğiyle düz <a>.

   JSON-LD — yalnızca dosyası olan kayıt `DigitalDocument` olarak işaretleniyor.
   Yer tutucular GİRMİYOR: ekranda işaretlenmiş bir kart bir tasarım kararı,
   yapılandırılmış veriye girmiş var olmayan bir dosya ise arama motoruna
   verilmiş yanlış beyandır.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const META = RESOURCE_KINDS.ekitap;

export const metadata: Metadata = {
  title: "E-kitaplar — indirilebilir rehberler | Ortac Global",
  description:
    "Kuruluş ve kuruluş sonrası için indirilebilir uzun içerik. İndirmek için bilgi istemiyoruz; dosyası hazır olmayan kayıt indirme vaadi taşımıyor.",
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
        description: META.job,
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
          lead="Uzun içerik tek dosyada. İndirmek için form doldurmuyorsunuz, e-posta bırakmıyorsunuz; dosyası hazır olmayan bir kayda da indirme düğmesi koymuyoruz."
        />

        <section className="kyn-tl-sec">
          <div className="container-o">
            <ul className="kyn-shelf">
              {/* Yayındakiler önce: dosyası olan kayıt her zaman yer
                  tutucunun üstünde durur. */}
              {books.map((b, i) => (
                <li key={b.id}>
                  <FadeUp delay={Math.min(i, 4) * 0.05}>
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
                          Güncellendi: <time dateTime={b.updatedAt}>{formatDate(b.updatedAt)}</time>
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

              {DRAFT_EBOOKS.map((b, i) => (
                <li key={b.id}>
                  <FadeUp delay={Math.min(books.length + i, 4) * 0.05}>
                    <article className="kyn-book" data-draft="true">
                      <span className="kyn-book-cover" aria-hidden="true">
                        <span className="kyn-book-spine" />
                        <span className="kyn-book-fmt">{b.format}</span>
                      </span>

                      <div className="kyn-book-b">
                        <span className="kyn-book-top">
                          <span className="kyn-cat">{countryLabel(b.country)}</span>
                          {/* Tek işaret, tek kelime, künye satırının içinde.
                              Önceki turdaki şerit + panel ikilisi kalktı. */}
                          <span className="kyn-seed-tag">{DRAFT_EBOOK_COPY.badge}</span>
                        </span>

                        <h2 className="kyn-book-t">{b.title}</h2>
                        <p className="kyn-book-s">{b.scope}</p>
                        <p className="kyn-book-m">
                          ~{b.plannedPages} sayfa
                          <span className="kyn-dot" aria-hidden="true" />
                          {b.format}
                        </p>
                      </div>

                      {/* Düğme <button disabled>: bir <a>'yı soluklaştırmak
                          tıklanabilir bırakırdı, `href` vermemek de klavyeyle
                          odaklanılabilen ama hiçbir şey yapmayan bir bağlantı
                          üretirdi. Devre dışı düğme durumu tarayıcının kendi
                          diliyle söylüyor; yanındaki satır da sebebini. */}
                      <span className="kyn-dlx">
                        <button type="button" className="kyn-dl-off" disabled>
                          <Download size={16} strokeWidth={2} aria-hidden="true" />
                          {DRAFT_EBOOK_COPY.disabledLabel}
                        </button>
                        <span className="kyn-dl-note">{DRAFT_EBOOK_COPY.disabledNote}</span>
                      </span>
                    </article>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <KynSwitch current="ekitap" />
        <FinalCta />
      </main>
    </>
  );
}
