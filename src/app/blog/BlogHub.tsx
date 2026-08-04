import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import {
  blogHref,
  draftPosts,
  draftsOfKind,
  formatDate,
  GUIDES_HREF,
  KIND_LABEL,
  postsOfKind,
  readingMinutes,
  sortedPosts,
  type BlogPost,
} from "@/lib/blog";

/* ============================================================================
   BLOG BÖLÜMÜ — liste + tür anahtarı   ·   /blog ve /blog/rehberler
   ============================================================================

   NEDEN TEK BİLEŞEN
   İki sayfa da aynı şeyi listeliyor, yalnızca süzgeç farklı. İki ayrı liste
   yazmak, ikinci yazı geldiğinde birinde görünüp ötekinde görünmeyen bir
   kart demek olurdu. Sayfalara kalan iş kendi başlığı, kendi metadata'sı ve
   kendi JSON-LD'si — SEO tarafında ikisinin AYRI sayfa olmasının sebebi de o.

   TÜR ANAHTARI NEDEN İKİ BAĞLANTI
   Müşteri "üst filtre gibi switch" istedi. Anahtar bir açılır menü değil,
   görünen iki kontrol; ikisi de gerçek adres, yani:
     · klavyeyle çalışıyor (bağlantı, ek JS yok),
     · seçili durum `aria-current="page"` ile duyuruluyor,
     · paylaşılabiliyor ve arama motoru ikisini de ayrı sayfa olarak görüyor.
   İstemci tarafı bir filtre bunların üçünü de kaybettirirdi.

   TASLAKLAR AYRI BAŞLIK ALTINDA
   Bugün yayınlanmış tek yazı var; ülke rehberlerinin üçü de hazırlanıyor
   (bkz. lib/blog.ts · SWAP:GUIDE_DRAFTS). Hazırlananları yayınlanmışların
   arasına karıştırmak, listeyi olduğundan dolu göstermek olurdu — ayrı
   başlık altında, tarihsiz ve okuma süresiz duruyorlar.

   HAREKET
   Bu dosyada motion kodu yok: hareketin tamamı FadeUp üzerinden geliyor
   (Providers'taki MotionConfig reducedMotion="user"). Dolayısıyla hareket
   tercihi render edilen ağacı değiştirmiyor.
   ========================================================================= */

/** Hangi süzgeç: bütün yazılar mı, yalnızca ülke rehberleri mi. */
export type HubView = "all" | "rehber";

/* Anahtarın iki durağı. Sıra sabit: önce hepsi, sonra alt küme. */
const TABS: { view: HubView; label: string; href: string }[] = [
  { view: "all", label: "Tümü", href: "/blog" },
  { view: "rehber", label: "Ülke rehberleri", href: GUIDES_HREF },
];

/** Görünüşün yayınlanmış ve hazırlanan kayıtları — tek yerde süzülüyor. */
function postsFor(view: HubView): { published: BlogPost[]; drafts: BlogPost[] } {
  if (view === "rehber") {
    return { published: postsOfKind("rehber"), drafts: draftsOfKind("rehber") };
  }
  return { published: sortedPosts(), drafts: draftPosts() };
}

/* ---------------------------------------------------------------- parçalar */

/**
 * Arşiv satırı. Kart değil satır: tarih sabit sütunda, başlıklar aynı
 * dikeyden başlıyor.
 *
 * Bağlantı BAŞLIĞIN İÇİNDE, satırın tamamı değil. Sebebi işaretleme: SmartLink
 * kapalı adreste <span> basıyor ve <span> içine başlık koymak geçersiz iç
 * içelik olurdu; ayrıca ekran okuyucunun bağlantı listesinde yazının adı
 * görünüyor, adsız bir "satır" değil. Satırın kalanını görünmez örtü
 * tıklanabilir yapıyor (.bh-row-a::after).
 *
 * `level` başlık rütbesi: yayınlanmış satırlar h2, "Hazırlananlar" başlığının
 * altındakiler h3 — hiyerarşi atlanmıyor.
 */
function Row({ post, level, delay }: { post: BlogPost; level: 2 | 3; delay: number }) {
  const draft = post.draft === true;
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <FadeUp delay={delay}>
      <article className="bh-row" data-draft={draft ? "true" : undefined}>
        {/* Taslakta tarih basılmıyor: publishedAt taslak kayıtta yayın tarihi
            değil, planın yazıldığı gün (bkz. blog.ts). Yayın tarihi gibi
            göstermek uydurma bir tarih iddiası olurdu. */}
        <p className="bh-row-d">
          {draft ? (
            <span className="bh-soon">Hazırlanıyor</span>
          ) : (
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          )}
        </p>

        <div className="bh-row-b">
          <p className="bh-row-k">
            <span className="bh-kind" data-kind={post.kind}>
              {KIND_LABEL[post.kind]}
            </span>
            <span className="bh-cat">{post.category}</span>
          </p>

          <Heading className="bh-row-t">
            <SmartLink href={blogHref(post.slug)} className="bh-row-a">
              {post.title}
            </SmartLink>
          </Heading>

          <p className="bh-row-s">{post.summary}</p>
        </div>

        {/* Okuma süresi gövdeden hesaplanıyor; taslağın gövdesi plan olduğu
            için süre bir şey söylemiyor ve hiç basılmıyor. */}
        {!draft && <span className="bh-row-m">{readingMinutes(post)} dk</span>}
      </article>
    </FadeUp>
  );
}

/* -------------------------------------------------------------------- bölüm */

export default function BlogHub({ view }: { view: HubView }) {
  const { published, drafts } = postsFor(view);
  const [lead, ...rest] = published;

  /* Sayım cümlesi veriden: anahtarın altında "kaç şey var" yazması gerekiyor
     ama sekmelerin üstüne "0" basmak ilk bakışta hata gibi okunuyor (aynı
     karar kaynaklar şeridinde de verilmişti). */
  const counts = [
    published.length > 0
      ? `${published.length} yayınlanmış yazı`
      : "Yayınlanmış yazı yok",
    drafts.length > 0 ? `${drafts.length} hazırlanan kayıt` : "",
  ].filter(Boolean);

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        {/* ---------- TÜR ANAHTARI ---------- */}
        <FadeUp>
          <nav className="bh-switch" aria-label="Yazı türü">
            <ul className="bh-tabs">
              {TABS.map((t) => (
                <li key={t.view}>
                  {t.view === view ? (
                    /* Bulunulan liste bağlantı değil: aynı sayfaya giden bir
                       bağlantı klavye kullanıcısına gerçek bir seçenek gibi
                       görünüyor. Sönük DE değil — sönüklük bu sitede "kapalı
                       adres" demek (bkz. [data-soon]); burası kapalı değil,
                       buradasınız. */
                    <span className="bh-tab" data-here="true" aria-current="page">
                      {t.label}
                    </span>
                  ) : (
                    <SmartLink href={t.href} className="bh-tab">
                      {t.label}
                    </SmartLink>
                  )}
                </li>
              ))}
            </ul>
            <p className="bh-switch-l">{counts.join(" · ")}</p>
          </nav>
        </FadeUp>

        {/* ---------- ÖNE ÇIKAN ---------- */}
        {lead ? (
          /* Listenin en yenisi. Yatay blok: görsel solda, metin sağda —
             altındaki satırlarla aynı ızgarayı kullanmıyor, çünkü "en yeni"
             olduğunu boyutuyla söylemesi gerekiyor. */
          <FadeUp delay={0.06}>
            <article className="bh-lead">
              <div className="bh-lead-media">
                {/* alt boş: SWAP:STOCK_PHOTOS ile gelen temsilî stok fotoğraf,
                    yazının bilgisini taşımıyor. `unoptimized` — URL zaten
                    Unsplash CDN'inde boyutlanmış ve next.config'te
                    remotePatterns tanımlı değil. */}
                <Image
                  src={lead.cover}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 46vw, 100vw"
                  className="bh-lead-img"
                  unoptimized
                />
              </div>

              <div className="bh-lead-body">
                <p className="bh-lead-top">
                  <span className="bh-flag">En yeni</span>
                  <span className="bh-kind" data-kind={lead.kind}>
                    {KIND_LABEL[lead.kind]}
                  </span>
                  <span className="bh-cat">{lead.category}</span>
                </p>

                <h2 className="bh-lead-t">
                  <SmartLink href={blogHref(lead.slug)} className="bh-lead-a">
                    {lead.title}
                  </SmartLink>
                </h2>
                <p className="bh-lead-s">{lead.summary}</p>

                <p className="bh-lead-foot">
                  <time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time>
                  <span className="bh-dot" aria-hidden="true" />
                  <span>{readingMinutes(lead)} dk okuma</span>
                  <span className="bh-go" aria-hidden="true">
                    Yazıyı okuyun
                    <ArrowUpRight size={15} strokeWidth={2.1} />
                  </span>
                </p>
              </div>
            </article>
          </FadeUp>
        ) : (
          /* BOŞ DURUM — sahte kart yok. Bu görünüşte yayınlanmış yazı yoksa
             sayfa bunu açıkça söylüyor; altında hazırlananlar zaten kendi
             başlığıyla duruyor. */
          <FadeUp delay={0.06}>
            <div className="bh-empty">
              <h2 className="bh-empty-t">
                {view === "rehber"
                  ? "Yayınlanmış bir ülke rehberi henüz yok."
                  : "Henüz yayınlanmış yazı yok."}
              </h2>
              <p className="bh-empty-l">
                Bir yazı ancak içindeki her satırın kaynağı gösterilebildiğinde yayına
                giriyor. Hazırlananlar aşağıda başlıklarıyla duruyor; doldurulmuş bir
                liste koymuyoruz.
              </p>
            </div>
          </FadeUp>
        )}

        {/* ---------- ARŞİV ---------- */}
        {rest.length > 0 && (
          <ol className="bh-list">
            {rest.map((p, i) => (
              <li key={p.slug}>
                <Row post={p} level={2} delay={0.08 + i * 0.05} />
              </li>
            ))}
          </ol>
        )}

        {/* Tek yazı varken listenin bittiğini söylemek gerekiyor: boşluk kendi
            başına bir açıklama değil. */}
        {published.length === 1 && (
          <FadeUp delay={0.12}>
            <p className="bh-note">
              Arşivde şimdilik tek yayınlanmış yazı var. Yenileri yayınlandıkça bu
              listede tarih sırasıyla birikecek.
            </p>
          </FadeUp>
        )}

        {/* ---------- HAZIRLANANLAR ---------- */}
        {drafts.length > 0 && (
          <div className="bh-drafts">
            <FadeUp>
              <h2 className="bh-drafts-h">Hazırlananlar</h2>
              <p className="bh-drafts-l">
                Aşağıdakilerin planı yazıldı, metni yazılmadı. Başlıklarını şimdiden
                gösteriyoruz ama tarih ve okuma süresi basmıyoruz: yazılmamış bir
                yazıyı yayınlanmış gibi göstermek istemiyoruz.
              </p>
            </FadeUp>

            <ol className="bh-list">
              {drafts.map((p, i) => (
                <li key={p.slug}>
                  <Row post={p} level={3} delay={0.08 + i * 0.05} />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
