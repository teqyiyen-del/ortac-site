import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import {
  blogHref,
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

   YER TUTUCULAR AYRI BÖLÜMDE DEĞİL — bu turun değişikliği
   Önceki hâlde yer tutucular listenin altında "Hazırlananlar" başlığı altında,
   tarihsiz ve okuma süresiz duruyordu. Müşteri bunu reddetti: şu an tasarım
   yapılıyor ve o ayrım sayfanın dolu hâlini görünmez kılıyordu.

   Artık aynı listede, aynı satır biçiminde, tarihli ve okuma süreli
   duruyorlar. Ayrımı taşıyan tek şey satırın üst şeridindeki küçük "Örnek"
   işareti (.bh-seed) — sitedeki yerleşik yer tutucu diliyle aynı: amber, tek
   kelime, rozet boyunda (bkz. .kyn-seed-tag, ana sayfa dizini).

   İşaretin kesikli çerçeve, sönüklük ya da uyarı paneli OLMAMASI bilinçli:
   üçü de satırı "bozuk" gösteriyor ve tam olarak müşterinin görmek istediği
   şeyi — dolu bir liste — engelliyor.

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

/** Görünüşün kayıtları — tek yerde süzülüyor, tek liste. */
function postsFor(view: HubView): BlogPost[] {
  return view === "rehber" ? postsOfKind("rehber") : sortedPosts();
}

/**
 * Yer tutucu işareti. Tek yerde duruyor çünkü iki yüzeyde birden basılıyor
 * (öne çıkan kart ve arşiv satırı) ve ikisinin aynı şeyi söylemesi gerekiyor.
 */
function SeedTag() {
  return <span className="bh-seed">Örnek</span>;
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
 * YER TUTUCU SATIRI GERÇEK SATIRDAN FARKSIZ: tarihi de okuma süresi de
 * basılıyor. Tarih kaydın kendi alanından ve geçmiş bir tarih; okuma süresi
 * gövdeden hesaplanıyor, yani sayfada gerçekten okunacak metnin süresi.
 * Değişen tek şey üst şeritteki "Örnek" işareti.
 */
function Row({ post, delay }: { post: BlogPost; delay: number }) {
  return (
    <FadeUp delay={delay}>
      <article className="bh-row">
        <p className="bh-row-d">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>

        <div className="bh-row-b">
          <p className="bh-row-k">
            <span className="bh-kind" data-kind={post.kind}>
              {KIND_LABEL[post.kind]}
            </span>
            {post.placeholder && <SeedTag />}
            <span className="bh-cat">{post.category}</span>
          </p>

          <h2 className="bh-row-t">
            <SmartLink href={blogHref(post.slug)} className="bh-row-a">
              {post.title}
            </SmartLink>
          </h2>

          <p className="bh-row-s">{post.summary}</p>
        </div>

        <span className="bh-row-m">{readingMinutes(post)} dk</span>
      </article>
    </FadeUp>
  );
}

/* -------------------------------------------------------------------- bölüm */

export default function BlogHub({ view }: { view: HubView }) {
  const posts = postsFor(view);
  const [lead, ...rest] = posts;
  const seeds = posts.filter((p) => p.placeholder).length;

  /* Sayım cümlesi veriden: anahtarın altında "kaç şey var" yazması gerekiyor
     ama sekmelerin üstüne "0" basmak ilk bakışta hata gibi okunuyor (aynı
     karar kaynaklar şeridinde de verilmişti).

     İkinci parça sayfanın en üstünde, tek cümlede, kaç kaydın örnek olduğunu
     söylüyor. Satır satır uyarı basmanın yerini bu tutuyor: bilgi bir kez
     veriliyor ve liste tasarımı bozulmuyor. */
  const counts = [
    posts.length > 0 ? `${posts.length} yazı` : "Bu listede yazı yok",
    seeds > 0 ? `${seeds} tanesi örnek kayıt` : "",
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
                  {/* Öne çıkan kart yer tutucu olabiliyor (/blog/rehberler'de
                      bugün öyle) ve işaret orada da duruyor: sayfanın en
                      büyük kartında bunu söylememek, ayrımı taşıyan tek yeri
                      kaybetmek olurdu. */}
                  {lead.placeholder && <SeedTag />}
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
          /* BOŞ DURUM — bugün hiçbir görünüşte basılmıyor (iki listede de
             kayıt var). Duruyor çünkü tür süzgeci veriden geliyor: bir gün
             kayıtsız bir tür eklenirse sayfa sahte kart basmak yerine
             durumunu söylesin. */
          <FadeUp delay={0.06}>
            <div className="bh-empty">
              <h2 className="bh-empty-t">
                {view === "rehber"
                  ? "Bu listede henüz ülke rehberi yok."
                  : "Bu listede henüz yazı yok."}
              </h2>
              <p className="bh-empty-l">
                Bir yazı ancak içindeki her satırın kaynağı gösterilebildiğinde yayına
                giriyor. Doldurulmuş bir liste koymuyoruz.
              </p>
            </div>
          </FadeUp>
        )}

        {/* ---------- ARŞİV ----------
            Tek liste, tarih sırası. Yer tutucu satırlar buraya karışıyor ve
            karışması isteniyor: ayrı bölüm listeyi ikiye bölüyordu. */}
        {rest.length > 0 && (
          <ol className="bh-list">
            {rest.map((p, i) => (
              <li key={p.slug}>
                <Row post={p} delay={0.08 + i * 0.05} />
              </li>
            ))}
          </ol>
        )}

        {/* Tek yazı varken listenin bittiğini söylemek gerekiyor: boşluk kendi
            başına bir açıklama değil. Bugün basılmıyor. */}
        {posts.length === 1 && (
          <FadeUp delay={0.12}>
            <p className="bh-note">
              Arşivde şimdilik tek yazı var. Yenileri yayınlandıkça bu listede tarih
              sırasıyla birikecek.
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
