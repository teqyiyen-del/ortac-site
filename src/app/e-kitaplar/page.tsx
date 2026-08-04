import type { Metadata } from "next";
import { ArrowRight, ChevronDown, Download, FlaskConical } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import FinalCta from "@/components/FinalCta";
import KynDraftNote from "@/components/kaynaklar/KynDraftNote";
import KynEmpty from "@/components/kaynaklar/KynEmpty";
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

   BUGÜN NEDEN İNDİRİLEBİLİR DOSYA YOK
   `public/` altında tek bir PDF yok; depo kontrol edildi. Buna rağmen sitede
   üç "rehber" kaydı üç ayrı yerde listeleniyordu (ana sayfa, navbar,
   /kaynaklar) ve üçü de indirilemiyordu — tıklayan ziyaretçi dosya yerine
   başka bir sayfaya gidiyordu.

   MÜŞTERİNİN İSTEĞİ
   "e kitaplar tarafınıda biraz placeholder bir şeyler yapıp içeriğini tasarla
   en azından. indirilebilir kaynakları bi listele sadece tıklayınca bir şey
   inmicek o kadar."

   O YÜZDEN RAFTA İKİ TÜR SATIR VAR VE İKİSİ AYNI GÖRÜNMÜYOR
   · Yayındaki e-kitap (`Ebook`): `file` zorunlu, satırın sağında mavi "İndir"
     düğmesi ve `download` niteliğiyle düz bir <a>. Bugün böyle kayıt yok.
   · Yer tutucu (`DraftEbook`): `file` alanı TİPTE YOK. Yani indirme
     bağlantısı kurulamıyor — sahte indirme yazmak bir tercih değil, imkânsız.
     Düğmenin yerinde açılır bir satır duruyor: tıklandığında dosyanın neden
     inmediğini yazıyor ve aynı bilginin sitede bugün duran hâline gönderiyor.
     Kırık bağlantı da bırakmıyor.

   İNDİRME BAĞLANTISI NEDEN SmartLink DEĞİL
   SmartLink sitenin dolaşım kararını uyguluyor (lib/routes.ts) ve bir sayfa
   adresi bekliyor. Yayındaki e-kitabın hedefi bir sayfa değil, public/
   altındaki gerçek dosya; `download` niteliğiyle düz <a>. Yer tutucudaki
   "bunun yerine" bağlantısı ise sayfa adresi, o yüzden SmartLink'ten geçiyor.

   AÇILIR SATIR NEDEN <details>
   JavaScript gerekmiyor: klavyeyle açılıp kapanıyor, açık/kapalı durumu ekran
   okuyucuya tarayıcı tarafından bildiriliyor ve sayfanın kalanı sunucu
   bileşeni kalıyor. Elle yazılmış bir aria-expanded düğmesinin buradaki tek
   katkısı fazladan bir istemci paketi olurdu.
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
  const hasDrafts = DRAFT_EBOOKS.length > 0;

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
           bir dosyayı bildirmek olurdu. Yer tutucular da bu yüzden buraya
           GİRMİYOR — yapılandırılmış veride sahte kayıt en pahalısı. */
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

        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            {hasDrafts && (
              <FadeUp>
                <KynDraftNote
                  title="Aşağıdaki kayıtlar örnektir"
                  lines={[
                    "Bugün indirilebilir dosya yok. Raftaki kayıtlar e-kitap tarafının nasıl görüneceğini göstermek için duruyor; sayfa sayıları planlanan uzunluk, ölçülmüş değil.",
                    "Hiçbirinde indirme bağlantısı yok — tıklamak bir dosya indirmiyor, dosyanın neden hazır olmadığını yazıyor ve aynı bilginin sitede bugün duran hâline gönderiyor.",
                  ]}
                />
              </FadeUp>
            )}

            {empty && !hasDrafts ? (
              <KynEmpty
                meta={META}
                exits={[
                  {
                    label: "Ülke rehberleri",
                    href: "/blog/rehberler",
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
                {/* Yayındakiler önce: dosyası olan kayıt her zaman yer
                    tutucunun üstünde durur. */}
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

                {DRAFT_EBOOKS.map((b, i) => (
                  <li key={b.id}>
                    <FadeUp delay={(books.length + i) * 0.05}>
                      <article className="kyn-book" data-draft="true">
                        <span className="kyn-book-cover" aria-hidden="true">
                          <span className="kyn-book-spine" />
                          <span className="kyn-book-fmt">{b.format}</span>
                        </span>

                        <div className="kyn-book-b">
                          {/* İşaret başlığın ÜSTÜNDE: altında olsaydı başlığı
                              okuyup geçen kişi hiç görmezdi. */}
                          <p className="kyn-seed">
                            <FlaskConical size={13} strokeWidth={2.1} aria-hidden="true" />
                            {DRAFT_EBOOK_COPY.badge}
                          </p>

                          <span className="kyn-cat">{countryLabel(b.country)}</span>
                          <h2 className="kyn-book-t">Örnek: {b.title}</h2>
                          <p className="kyn-book-s">{b.scope}</p>
                          {/* "Dosya hazır değil" burada TEKRARLANMIYOR: üstteki
                              şerit ve alttaki açılır satır zaten söylüyor,
                              üçüncü kez yazmak künyeyi uyarıya çeviriyordu.
                              Künyenin işi ölçü vermek — o da "planlanan". */}
                          <p className="kyn-book-m">
                            Planlanan ~{b.plannedPages} sayfa
                            <span className="kyn-dot" aria-hidden="true" />
                            {b.format}
                          </p>

                          <details className="kyn-nodl">
                            <summary>
                              {DRAFT_EBOOK_COPY.summary}
                              <ChevronDown size={15} strokeWidth={2.2} aria-hidden="true" />
                            </summary>
                            <p className="kyn-nodl-p">{DRAFT_EBOOK_COPY.detail}</p>
                            <SmartLink href={b.insteadFor.href} className="kyn-nodl-a">
                              Bunun yerine: {b.insteadFor.label}
                              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                            </SmartLink>
                          </details>
                        </div>
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
