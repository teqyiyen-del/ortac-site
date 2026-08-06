import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Info, Quote, TriangleAlert } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import FinalCta from "@/components/FinalCta";
import {
  blogHref,
  BLOG_SLUGS,
  demoHref,
  formatDate,
  GUIDES_HREF,
  isDemoTarget,
  KIND_LABEL,
  KIND_PLURAL,
  otherPosts,
  postFor,
  readingMinutes,
  tocOf,
  type BlogBlock,
} from "@/lib/blog";

/* ============================================================================
   BLOG İÇ SAYFASI — /blog/[slug]

   Bu dosyada yazıya ait tek bir cümle yok: ekranda görünen her kelime
   lib/blog.ts'te duruyor. Şablonun işi o veriyi sitenin diliyle dizmek.
   İkinci yazı eklendiğinde buraya dokunulmuyor — sektör iç sayfasıyla aynı
   kural, aynı sebep: içeriği onaylayacak kişi bileşen okumak zorunda kalmasın.

   ---------------------------------------------------------------------------
   SAYFANIN ÜÇ KURALI
   ---------------------------------------------------------------------------
   1. TEK h1 — yazının başlığı, PageHero basıyor. Gövde başlıkları h2, onların
      altı h3. Hiyerarşi veri tarafında zorlanıyor (BlogBlock'ta h1 yok), yani
      bir yazının yanlışlıkla ikinci h1 üretmesi mümkün değil.
   2. ÖLÇÜLÜ SATIR — gövde ~68ch. Bu estetik değil okunabilirlik: 1200px'lik
      kapta tam genişlik akan metinde göz satır başını kaybediyor. Kalan yer
      boş durmuyor, içindekiler sütununa gidiyor.
   3. HER RAKAM TABLODA — gövde bloklarında tutar taşıyan tek tür `facts`.
      Paragrafın içine serpiştirilen rakam hem okunmuyor hem de güncellenirken
      gözden kaçıyor.

   ---------------------------------------------------------------------------
   HAREKET
   ---------------------------------------------------------------------------
   Sayfa sunucu bileşeni; kendi motion kodu YOK. Hareketin tamamı FadeUp ve
   SplitWords üzerinden geliyor (motion/react + Providers'taki MotionConfig
   reducedMotion="user"), yani prefers-reduced-motion açıkken hareket
   kullanıcının tercihine uyuyor. CSS tarafındaki tek animasyon <details>
   açılışı ve blog.css'te ayrıca kapatılıyor.

   ---------------------------------------------------------------------------
   TÜR ADRESİ DEĞİŞTİRMİYOR
   ---------------------------------------------------------------------------
   Bu turda ülke rehberleri blog'un bir TÜRÜ oldu (bkz. lib/blog.ts · kind) ve
   yazılar TÜRÜNDEN BAĞIMSIZ burada, /blog/<slug>'da yaşıyor. Tür yalnızca iki
   şeyi değiştiriyor: kırıntının ikinci basamağını (Blog / Ülke rehberleri) ve
   künyedeki etiketi. Rehberlerin ayrı bir adres altına taşınmaması bilinçli —
   taşınsaydı bugünkü adresler kırılır ve aynı içerik iki farklı derinlikte
   yaşamaya başlardı.

   ---------------------------------------------------------------------------
   YER TUTUCU KAYITLAR
   ---------------------------------------------------------------------------
   `placeholder: true` olan kayıtların sayfası normal açılıyor: tarihi de
   okuma süresi de basılıyor, çünkü tarih kaydın kendi alanından geliyor ve
   süre sayfada GERÇEKTEN duran metinden hesaplanıyor — ikisi de bir iddia
   değil. Künyede bunun yerine küçük bir "Örnek" işareti duruyor ve gövdenin
   ilk bloğu ne olduğunu tek cümleyle söylüyor.

   İKİ ŞEY YAPMIYOR ve bu ayrım korunuyor: JSON-LD'ye Article düğümü
   basmıyor, robots noindex dönüyor. Ekranda "Örnek" yazan bir kartı
   göstermek bir tasarım kararı; aynı kaydı arama motoruna yayınlanmış bir
   yazı diye bildirmek yanlış beyan.

   ---------------------------------------------------------------------------
   DOLAŞIM
   ---------------------------------------------------------------------------
   Tek tek yazı adresleri (/blog/<slug>) lib/routes.ts'teki LIVE listesinde
   YOK — liste sayfaları (/blog, /blog/rehberler) var. Yani listedeki başlık
   sönük ve tıklanamaz; sayfa yalnızca adres elle yazılınca açılıyor.
   Kasıtlı: iç kontrol bitmeden yazılar müşteriye gösterilmeyecek. Sayfanın
   kendi içindeki çıkışlar da SmartLink ile veriliyor, dolayısıyla kapalı bir
   hizmet sayfasına giden bağlantı ölü tıklama değil sönük satır oluyor.
   ========================================================================= */

type Params = Promise<{ slug: string }>;

/* Şu an tek slug üretiyor. blog.ts'e ikinci kayıt girdiği anda burası
   kendiliğinden iki sayfa üretmeye başlıyor. */
export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

/* Kanonik adres mutlak: layout.tsx'te metadataBase tanımlı değil, göreli bir
   kanonik geliştirme sunucusunun adresine çözülürdü. Alan adı layout.tsx'teki
   JSON-LD ile aynı kaynaktan. */
const SITE = "https://ortacglobal.com";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = postFor(slug);
  if (!post) return {};

  const url = `${SITE}${blogHref(post.slug)}`;

  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: { canonical: url },
    /* Yer tutucu sayfası indekslenmiyor: gövdesi plan, cevap değil. `follow`
       açık kalıyor — sayfadaki çıkışlar (ülke sayfası, kıyas) gerçek ve
       izlenmesinde sakınca yok. Kayıt yayına alınırken `placeholder` satırı
       silindiği anda burası da kendiliğinden normale dönüyor. */
    ...(post.placeholder ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      locale: "tr_TR",
      siteName: "Ortac Global",
      url,
      title: post.seo.title,
      description: post.seo.description,
      publishedTime: post.publishedAt,
      /* modifiedTime yalnızca gerçekten güncellendiyse: boş bir alanı yayın
         tarihiyle doldurmak "güncellendi" iddiası üretirdi. */
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      authors: [post.author],
      images: [{ url: post.cover }],
      tags: post.tags,
    },
  };
}

/* ------------------------------------------------------------- gövde blokları

   Tek bir switch. Her blok türü kendi işaretlemesini biliyor ve blog.ts'te
   tanımlı türlerin hepsi burada karşılanıyor — yeni bir tür eklenirse
   TypeScript bu switch'te eksik dal olduğunu söylüyor (dönüş tipi JSX,
   default dalı yok, `never` kontrolü aşağıda). */
function Block({ block }: { block: BlogBlock }) {
  switch (block.kind) {
    case "p":
      return <p className="bp-p">{block.text}</p>;

    /* scroll-margin CSS'te: içindekilerden inen bağlantı başlığı sabit
       navigasyonun altına sokmasın diye. */
    case "h2":
      return (
        <h2 id={block.id} className="bp-h2">
          {block.text}
        </h2>
      );

    case "h3":
      return <h3 className="bp-h3">{block.text}</h3>;

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className="bp-list" data-ordered={block.ordered ? "true" : undefined}>
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </Tag>
      );
    }

    case "quote":
      return (
        <figure className="bp-quote">
          <Quote size={18} strokeWidth={2} aria-hidden="true" />
          <blockquote>{block.text}</blockquote>
          {block.source && <figcaption>{block.source}</figcaption>}
        </figure>
      );

    /* Uyarı ve açıklama aynı bileşen, ayrım data-tone'da: iki ayrı sınıf
       yazmak CSS'te aynı kuralı iki kez tanımlamak olurdu. */
    case "note":
      return (
        <aside className="bp-note" data-tone={block.tone}>
          <span className="bp-note-ic" aria-hidden="true">
            {block.tone === "warn" ? (
              <TriangleAlert size={15} strokeWidth={2.1} />
            ) : (
              <Info size={15} strokeWidth={2.1} />
            )}
          </span>
          <div>
            <b>{block.title}</b>
            <p>{block.text}</p>
          </div>
        </aside>
      );

    /* Boş tablo basılmıyor. blog.ts'teki rakamlar veri dosyalarından türüyor
       ve kaynak kayıt bir gün kaldırılırsa satır dizisi boş gelir; başlığı
       olup içi olmayan bir tablo, o kalemlerin yokluğu gibi okunurdu. */
    case "facts": {
      if (block.rows.length === 0) return null;
      return (
        <figure className="bp-facts">
          <figcaption>{block.caption}</figcaption>
          <dl>
            {block.rows.map((r) => (
              <div className="bp-fact" key={r.label}>
                <dt>{r.label}</dt>
                <dd>
                  <b>{r.value}</b>
                  {r.note && <span>{r.note}</span>}
                </dd>
              </div>
            ))}
            {block.total && (
              <div className="bp-fact bp-fact-total">
                <dt>{block.total.label}</dt>
                <dd>
                  <b>{block.total.value}</b>
                </dd>
              </div>
            )}
          </dl>
          {block.foot && <p className="bp-facts-foot">{block.foot}</p>}
        </figure>
      );
    }

    /* native <details>: JavaScript yok, klavye ve ekran okuyucu davranışı
       tarayıcıdan geliyor ve sayfa sunucu bileşeni kalabiliyor. Sitedeki
       öteki kademeli bloklarla (sektör sayfası) aynı kalıp. */
    case "details": {
      if (block.items.length === 0) return null;
      return (
        <details className="bp-details">
          <summary>
            {block.summary}
            <span className="bp-details-x" aria-hidden="true" />
          </summary>
          <ul>
            {block.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </details>
      );
    }
  }
}

/* -------------------------------------------------------------------- sayfa */

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = postFor(slug);
  if (!post) notFound();

  const url = `${SITE}${blogHref(post.slug)}`;
  const toc = tocOf(post);
  const minutes = readingMinutes(post);
  /* Üçle sınırlı: arşiv on beş kayda çıkınca "Diğer yazılar" bölümü yazının
     altına ikinci bir arşiv sayfası asıyordu. Buranın işi bir sonraki
     tıklamayı önermek, arşivi tekrarlamak değil — arşivin kendisi /blog'da. */
  /* Kendi sayfasına düşecek kartlar eleniyor. Bu turda bağlantılar yazının
     kendi adresine değil TÜRÜNÜN demo sayfasına iniyor (demoHref); süzgeç
     olmasaydı "Diğer yazılar" altında bulunulan sayfaya giden üç kart
     çıkardı. Kalanlar öteki türün demo sayfasına gidiyor, yani bölüm iki demo
     sayfası arasındaki geçişi kuruyor. */
  const others = otherPosts(post.slug)
    .filter((o) => demoHref(o) !== blogHref(post.slug))
    .slice(0, 3);

  /* KIRINTI — türe göre üç ya da dört basamak. Rehber yazısında araya
     /blog/rehberler giriyor, çünkü o adres gerçekten var ve yazının geldiği
     liste orası. Blog yazısında o basamak hiç yazılmıyor: olmayan bir ara
     sayfa uydurmak kırık işaretleme olurdu. */
  const guide = post.kind === "rehber";
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
    ...(guide
      ? [
          {
            "@type": "ListItem",
            position: 3,
            name: KIND_PLURAL.rehber,
            item: `${SITE}${GUIDES_HREF}`,
          },
        ]
      : []),
    { "@type": "ListItem", position: guide ? 4 : 3, name: post.title, item: url },
  ];

  /* JSON-LD — yalnızca sayfada zaten yazan şeyler. Uydurma alan yok: puan,
     yorum sayısı, kişi künyesi taşımıyor. Yazar kurum olarak veriliyor çünkü
     blog.ts'te doğrulanmış olan o. `timeRequired` hesaplanan okuma süresi,
     yani künyede görünen rakamın aynısı — iki farklı süre iddiası çıkmıyor.

     YER TUTUCUDA Article DÜĞÜMÜ HİÇ BASILMIYOR: datePublished'ı olan bir
     Article, yazılmamış bir yazıyı yayınlanmış ilan etmek olurdu. Kırıntı
     kalıyor, çünkü sayfanın sitedeki yeri yer tutucuyken de doğru. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: crumbs },
      ...(post.placeholder
        ? []
        : [
            {
              "@type": "Article",
              headline: post.title,
              description: post.summary,
              url,
              mainEntityOfPage: url,
              inLanguage: "tr-TR",
              datePublished: post.publishedAt,
              ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
              author: { "@type": "Organization", name: post.author, url: SITE },
              publisher: { "@type": "Organization", name: "Ortac Global", url: SITE },
              image: post.cover,
              articleSection: post.category,
              keywords: post.tags.join(", "),
              timeRequired: `PT${minutes}M`,
            },
          ]),
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

        {/* <article> başlığı da kapsıyor, yalnızca gövdeyi değil. Sebep
            erişilebilirlik: adı olmayan bir <article>, ekran okuyucunun
            işaretler listesinde "makale" diye adsız duruyor. h1 içeride
            olunca öğe adını başlıktan alıyor. Altındaki çıkış ve "diğer
            yazılar" bölümleri bilerek DIŞARIDA: onlar yazının parçası değil,
            yazıdan sonrası. */}
        <article>
          {/* Sayfadaki tek h1. country verilmiyor: iki sütunlu ülke hero'su
              tek bir ülkeyi öne çıkarırdı, oysa burada öne çıkması gereken
              yazının kendisi. */}
          {/* Kırıntıda kategori değil TÜR duruyor. Kategori ("Maliyet ve
              bütçe") bir konu etiketi, gidilecek bir yer değil — kırıntının
              işi ise ziyaretçiye bir üst basamağı göstermek ve türün iki
              değerinin de gerçek bir sayfası var (/blog, /blog/rehberler).
              Kategori künyede görünmeye devam ediyor. */}
          <PageHero
            crumb={guide ? KIND_PLURAL.rehber : KIND_LABEL.blog}
            title={post.title}
            accent={post.heroAccent}
            lead={post.summary}
          />

          <div className="sec-pad" style={{ background: "var(--white)" }}>
            <div className="container-o">
              {/* KÜNYE — tarih, okuma süresi, kategori, yazar. Okuma süresi
                  blog.ts'te gövdeden hesaplanıyor; elle girilse gövde
                  kısaldığında yanlış kalırdı. */}
              <FadeUp>
                <div className="bp-meta">
                  {/* Yer tutucuda da tarih ve okuma süresi basılıyor: tarih
                      kaydın kendi alanından, süre sayfada gerçekten duran
                      metinden hesaplanıyor. Ayrımı künyenin başındaki küçük
                      işaret taşıyor — .bh-seed listede de aynı işaret, yani
                      ziyaretçi iki yüzeyde aynı şeyi görüyor. Sınıf .bh- ad
                      alanından çünkü blog-hub.css globals'ın içinden import
                      ediliyor; blog.css başka bir elden yürüyor ve oraya yeni
                      kural yazmak iki dosyayı birbirine bağlardı. */}
                  {post.placeholder && <span className="bh-seed">Örnek</span>}
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span className="bp-dot" aria-hidden="true" />
                  <span>{minutes} dk okuma</span>
                  <span className="bp-dot" aria-hidden="true" />
                  <span>{KIND_LABEL[post.kind]}</span>
                  <span className="bp-dot" aria-hidden="true" />
                  <span>{post.category}</span>
                  <span className="bp-dot" aria-hidden="true" />
                  <span>{post.author}</span>
                  {post.updatedAt && (
                    <>
                      <span className="bp-dot" aria-hidden="true" />
                      <span>
                        Güncellendi:{" "}
                        <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                      </span>
                    </>
                  )}
                </div>

                {/* DEMO İŞARETİ — bu turun eklentisi.

                    Bu sayfa türünün demo hedefi: listedeki bütün satırlar
                    buraya iniyor (lib/blog.ts · DEMO_POST). Yani ziyaretçi
                    başka bir başlığa tıklayıp buraya düşebiliyor ve sayfa
                    bunu söylemezse bu bir arıza gibi okunur.

                    Sitenin yerleşik dili: amber, tek kelimelik rozet ve tek
                    satır. Uyarı paneli, kesikli çerçeve ve ayrı bölüm YOK —
                    müşterinin açıkça reddettiği üç şey.

                    Rozetin sözcüğü "Örnek" değil "Demo", çünkü künyede zaten
                    "Örnek" durabiliyor ve o başka bir şey söylüyor: kaydın
                    KENDİSİ örnek. Burada söylenen ise bağlantının nereye
                    indiği. Aynı kelime iki kez çıksaydı biri ötekinin
                    tekrarı sanılırdı. */}
                {isDemoTarget(post.slug) && (
                  <p className="bh-demo">
                    <span className="bh-seed">Demo</span>
                    Akışın oturması için bu tur boyunca sitedeki bütün{" "}
                    {KIND_LABEL[post.kind].toLocaleLowerCase("tr")} bağlantıları bu
                    sayfaya iniyor. Yazıların kendi sayfaları yayına girdiğinde
                    bağlantılar ayrışacak.
                  </p>
                )}
              </FadeUp>

              {/* Kapak görseli. alt boş: SWAP:STOCK_PHOTOS ile gelen temsilî
                  bir stok fotoğraf, yazının bilgisini taşımıyor — dekoratif
                  olduğunu söylemek, uydurma bir alt metni yazmaktan doğru.
                  `unoptimized`: URL zaten Unsplash CDN'inde boyutlanmış ve
                  next.config'te remotePatterns tanımlı değil (bkz. HomeBlog). */}
              <FadeUp delay={0.08}>
                <div className="bp-cover">
                  <Image
                    src={post.cover}
                    alt=""
                    fill
                    sizes="(min-width: 1040px) 1136px, 100vw"
                    className="bp-cover-img"
                    priority
                    unoptimized
                  />
                </div>
              </FadeUp>

              <div className="bp-wrap">
                <div className="bp-body">
                  {post.body.map((block, i) => (
                    /* Anahtar: başlıklarda id, ötekilerde sıra. Gövde blokları
                       yeniden sıralanmıyor, dolayısıyla indeks kararlı. */
                    <Block
                      key={block.kind === "h2" ? block.id : `${block.kind}-${i}`}
                      block={block}
                    />
                  ))}

                  <p className="bp-source">{post.sourceNote}</p>
                  <p className="bp-footnote">{post.footnote}</p>
                </div>

                {/* İçindekiler. DOM'da gövdeden SONRA duruyor ama masaüstünde
                    sağ sütun, mobilde CSS ile gövdenin üstüne alınıyor —
                    telefonda haritanın yazının başında olması, sonunda
                    olmasından iyi. Sayfa içi çapa olduğu için düz <a>:
                    SmartLink dolaşım kararı veriyor, buradaki hedef aynı
                    sayfa. */}
                {toc.length > 1 && (
                  <nav className="bp-toc" aria-label="İçindekiler">
                    <p className="bp-toc-h">İçindekiler</p>
                    <ol>
                      {toc.map((t) => (
                        <li key={t.id}>
                          <a href={`#${t.id}`}>{t.text}</a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* ---------- çıkışlar + soru ----------
            Yazının sonu bir duvar değil, üç kapı. Kişiye özel vergi görüşü
            siteden verilmediği için sorusu olan için tek çıkış AskCta;
            "mali müşavire danışın" kalıbı emekli. Koyu zeminde alfa yok. */}
        <section className="sec-pad sec-night">
          <div className="container-o">
            <div className="bp-exit">
              <FadeUp className="bp-exit-l">
                <h2 className="bp-exit-h">{post.closing.title}</h2>
                <p className="bp-exit-p">{post.closing.line}</p>
                <AskCta label={post.closing.cta} tone="solid" />
              </FadeUp>

              <FadeUp delay={0.14} className="bp-exit-r">
                <p className="bp-exit-k">Devamı için</p>
                <div className="bp-links">
                  {post.links.map((l) => (
                    <SmartLink key={l.href} href={l.href} className="bp-link">
                      <span>
                        <b>{l.label}</b>
                        <i>{l.line}</i>
                      </span>
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Tek yazı varken bu bölüm hiç basılmıyor: "Diğer yazılar" başlığı
            altında tek satır göstermek, arşivi olmayan bir siteyi arşivi
            varmış gibi gösterirdi. blog.ts'e ikinci kayıt girdiği anda bölüm
            kendiliğinden çıkıyor. */}
        {others.length > 0 && (
          <section className="sec-pad" style={{ background: "var(--white)" }}>
            <div className="container-o">
              <h2 className="bp-more-h">Diğer yazılar</h2>
              <div className="bp-more">
                {others.map((o, i) => (
                  <FadeUp key={o.slug} delay={0.1 + i * 0.06}>
                    <SmartLink href={demoHref(o)} className="bp-more-c">
                      {/* İşaret kategori satırının İÇİNDE, ayrı bir satır
                          değil: .bp-more-c bir sütun flex kabı ve doğrudan
                          çocuk olarak konsaydı rozet kart genişliğine
                          gerilirdi. Araya düz boşluk konuyor — .bp-more-k'nin
                          kendi kuralına dokunmadan (blog.css başka bir elden
                          yürüyor). */}
                      <span className="bp-more-k">
                        {o.placeholder && (
                          <>
                            <span className="bh-seed">Örnek</span>{" "}
                          </>
                        )}
                        {o.category}
                      </span>
                      <b className="bp-more-t">{o.title}</b>
                      <i className="bp-more-s">{o.summary}</i>
                      <span className="bp-more-f">
                        <time dateTime={o.publishedAt}>{formatDate(o.publishedAt)}</time>
                        <ArrowUpRight size={15} strokeWidth={2.1} aria-hidden="true" />
                      </span>
                    </SmartLink>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCta />
      </main>
    </>
  );
}
