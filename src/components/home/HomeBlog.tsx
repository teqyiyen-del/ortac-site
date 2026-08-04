import Image from "next/image";
import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight, ArrowUpRight, FileDown } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { blogHref, formatDate, sortedPosts } from "@/lib/blog";
import {
  DRAFT_EBOOKS,
  DRAFT_EBOOK_COPY,
  DRAFT_UPDATES,
  DRAFT_UPDATE_COPY,
  KIND_ORDER,
  RESOURCE_KINDS,
  sortedEbooks,
  sortedUpdates,
} from "@/lib/resources";

/* ============================================================================
   ANA SAYFA · YAYIN BÖLÜMÜ — solda öne çıkan yazı, sağda tarihli akış
   ============================================================================

   MÜŞTERİNİN İSTEĞİ
   "ana sayfada sana ss attığım kısımda sağdaki yerde normalde tarihler
   yazıyordu ve paylaşımlar vardı orda aslında onun ana sayfaya geri gelmesi
   lazım … sadece gelişmeler değil yeni bir blog gelmiştir yeni bir e book
   gelmiştir aslında ana sayfa sürekli yeni şeyleri oraya atan bir kısım
   görevi görsel. sol kısımda zaten büyükcene öne çıkan blog yazısı var o yine
   öyle kalır."

   Yani bölüm ikiye ayrılıyor ve ikisinin işi ayrı:
     SOL  · öne çıkan BLOG YAZISI, büyük kart. Aynen duruyor.
     SAĞ  · "yeni gelenler" akışı: yazı, gelişme ve e-kitap aynı tarih
            ekseninde, en yenisi üstte.

   ---------------------------------------------------------------------------
   ÖNEMLİ GEÇMİŞ — AYNI HATA TEKRARLANMIYOR

   Bu bölümde bir tur önce `SWAP:BLOG_POSTS` işaretli BEŞ kayıt vardı ve
   dördü uydurmaydı: başlık, özet ve TARİH elle yazılmıştı, dördü de
   /kaynaklar'a çıkıyordu — yani tıklayan kişi vaat edilen yazıyı hiçbir zaman
   bulamıyordu. İşaret "yer tutucu" diyordu ama sayfa CANLIYDI ve ziyaretçi
   kaynak dosyadaki işareti görmez.

   Akış geri geldi ama kaynağı yine gerçek veri: sortedPosts() + sortedUpdates()
   + sortedEbooks(). Bunlara ek olarak, müşterinin açık izniyle konulmuş yer
   tutucular da listeye giriyor (DRAFT_UPDATES, DRAFT_EBOOKS) ve aradaki fark
   ekranda görünüyor:
     · satırın üst şeridinde "Örnek" rozeti duruyor,
     · gidecekleri yer GERÇEKTEN VAR OLAN bir sayfa: /gelismeler, /e-kitaplar
       (ikisi de lib/routes.ts'te yayında),
     · o sayfalarda kaydın yer tutucu olduğu bir kez daha yazıyor,
     · e-kitap yer tutucusunda "Ücretsiz indirin" YAZMIYOR — verilmemiş bir
       söz; indirme notu yalnızca dosyası olan kayda basılıyor.

   ---------------------------------------------------------------------------
   KORUNAN İKİ DAVRANIŞ

   1. Öne çıkan yoksa bölüm HİÇ BASILMIYOR. Sol sütun bu bölümün gerekçesi;
      onsuz geriye "yayınlarımız" başlıklı yarım bir ızgara kalıyor. Çapa da
      onunla gidiyor, ana sayfada karşılığı olmayan #blog çapası kalmıyor.
   2. Sağda kayıt yoksa dört türün kapısı basılıyor. Boş bir <ol>, uydurma
      kayıt basmanın sessiz hâli: ziyaretçi orada bir şey olması gerektiğini
      görüyor ve olmadığını sanıyor. Dört kapı uydurma değil — dördünün de
      sayfası ve adresi var.

   NOT · CSS: bu bölümün `.blg-` kuralları globals.css'te ve o dosya bu turda
   başka bir ajanda. Yeni ihtiyaç duyulan tek şey yer tutucu rozetiydi; o da
   css/kaynaklar.css'e `.kyn-seed-tag` olarak yazıldı. Var olan .blg- kuralları
   olduğu gibi kullanılmaya devam ediyor.
   ========================================================================= */

type Kind = "blog" | "ekitap" | "mevzuat";

const KIND_LABEL: Record<Kind, string> = {
  blog: "Blog yazısı",
  ekitap: "E-kitap",
  mevzuat: "Gelişme",
};

type Row = {
  t: string;
  kind: Kind;
  sum: string;
  /* on: ekranda görünen tarih · iso: sıralama ve <time dateTime> için */
  on: string;
  iso: string;
  href: string;
  /* meta yalnızca indirilebilir içerikte dolu: dosya biçimi rozeti */
  meta?: string;
  /* yer tutucu mu — satırda "Örnek" rozeti var, indirme notu yok */
  seed?: boolean;
};

/* SOL SÜTUN — öne çıkan yazı.

   Öne çıkan bilerek yalnızca BLOG YAZILARI arasından seçiliyor (müşterinin
   cümlesi: "sol kısımda zaten büyükcene öne çıkan blog yazısı var o yine öyle
   kalır"). Bir gelişme ya da e-kitap kaydı büyük kartta durursa sol sütun
   sağdaki akışın büyütülmüş hâline dönüyor ve bölümün iki işi tek işe
   iniyor. Yer tutucu ise buraya HİÇ giremiyor: sayfanın en büyük kartında
   örnek bir kayıt durması, işaretli bile olsa, ilk izlenimi yer tutucu
   üzerine kurmak olurdu. */
const LEAD = sortedPosts()[0];

/* SAĞ SÜTUN — yeni gelenler.

   Üç gerçek kaynak + iki yer tutucu dizisi tek listede toplanıp tarihe göre
   sıralanıyor. Öne çıkan yazı listeden düşüyor: aynı kayıt hem solda hem
   sağda durursa akış bir tekrarla başlıyor. */
const ROWS: Row[] = [
  ...sortedPosts()
    .filter((post) => post.slug !== LEAD?.slug)
    .map(
      (post): Row => ({
        t: post.title,
        kind: "blog",
        sum: post.summary,
        on: formatDate(post.publishedAt),
        iso: post.publishedAt,
        href: blogHref(post.slug),
      }),
    ),
  ...sortedUpdates().map((u): Row => ({
    t: u.title,
    kind: "mevzuat",
    sum: u.summary,
    on: formatDate(u.date),
    iso: u.date,
    href: "/gelismeler",
  })),
  ...sortedEbooks().map((b): Row => ({
    t: b.title,
    kind: "ekitap",
    sum: b.summary,
    on: formatDate(b.updatedAt),
    iso: b.updatedAt,
    href: "/e-kitaplar",
    meta: `${b.format} · ${b.pages} sayfa`,
  })),
  /* Yer tutucular. Başlık ve özet burada YAZILMIYOR: başlık veri dosyasındaki
     konu başlığından "Örnek:" önekiyle türüyor, özet ise tür başına tek bir
     sabit cümle (resources.ts · DRAFT_*_COPY.feedLine). Kayıt başına yazılmış
     bir özet bir gün "burası hazır" diye okunur. */
  ...DRAFT_UPDATES.map((d): Row => ({
    t: `Örnek: ${d.topic}`,
    kind: "mevzuat",
    sum: DRAFT_UPDATE_COPY.feedLine,
    on: formatDate(d.date),
    iso: d.date,
    href: "/gelismeler",
    seed: true,
  })),
  ...DRAFT_EBOOKS.map((b): Row => ({
    t: `Örnek: ${b.title}`,
    kind: "ekitap",
    sum: DRAFT_EBOOK_COPY.feedLine,
    on: formatDate(b.addedAt),
    iso: b.addedAt,
    href: "/e-kitaplar",
    seed: true,
  })),
]
  .sort((a, b) => b.iso.localeCompare(a.iso))
  /* Beş satır: ana sayfada bu bölüm bir arşiv değil, "yeni ne var" penceresi.
     Tamamı /kaynaklar'dan ve tür sayfalarından okunuyor. */
  .slice(0, 5);

export default function HomeBlog() {
  /* Öne çıkan yazı yoksa bölüm hiç basılmıyor — bkz. dosya başı, korunan
     davranış (1). Bugün elde bir yazı var; son yazı da kalkarsa bölüm
     kendiliğinden kayboluyor. */
  if (!LEAD) return null;

  return (
    <section id="blog" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Yazılar, gelişmeler ve e-kitaplar."
            accent="e-kitaplar."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Solda öne çıkan yazı, sağda siteye en son gireni gösteren tarihli dizin.
            </p>
          </FadeUp>
        </div>

        <div className="blg-grid">
          <FadeUp delay={0.16} className="blg-lead-wrap">
            <SmartLink href={blogHref(LEAD.slug)} className="blg-lead">
              {/* Görsel şerit: en-boy oranı CSS'te sabit, next/image `fill` ile
                  kutuyu doldurur; yükseklik baştan ayrıldığı için CLS olmaz.
                  `unoptimized`: URL zaten Unsplash CDN'inde w=900&q=70 ile
                  boyutlanmış ve next.config'te remotePatterns tanımlı değil,
                  bu yüzden Next optimizer'ına ikinci bir tur attırılmıyor. */}
              <span className="blg-lead-media">
                <Image
                  src={LEAD.cover}
                  alt=""
                  fill
                  sizes="(min-width: 980px) 52vw, 100vw"
                  className="blg-lead-img"
                  unoptimized
                />
              </span>

              <span className="blg-lead-top">
                <span className="blg-cat">{KIND_LABEL.blog}</span>
                <span className="blg-sep" aria-hidden="true" />
                <span>{LEAD.category}</span>
                <span className="blg-flag">Öne çıkan</span>
              </span>

              <span className="blg-rule" aria-hidden="true" />

              <h3 className="blg-lead-t">{LEAD.title}</h3>
              <p className="blg-lead-s">{LEAD.summary}</p>

              <span className="blg-lead-foot">
                <time className="blg-date" dateTime={LEAD.publishedAt}>
                  {formatDate(LEAD.publishedAt)}
                </time>
                <span className="blg-go">
                  Yazıyı okuyun
                  <ArrowUpRight size={16} strokeWidth={2.1} aria-hidden="true" />
                </span>
              </span>
            </SmartLink>
          </FadeUp>

          <div className="blg-side">
            {/* Öne çıkanın dışında kayıt yoksa dizin hiç basılmıyor — bkz.
                dosya başı, korunan davranış (2). */}
            {ROWS.length === 0 ? (
              <FadeUp delay={0.22}>
                <ul className="blg-doors">
                  {KIND_ORDER.map((k) => {
                    const m = RESOURCE_KINDS[k];
                    return (
                      <li key={k}>
                        <SmartLink href={m.href} className="blg-door">
                          <b className="blg-door-t">{m.label}</b>
                          <em className="blg-door-s">{m.job}</em>
                          <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                        </SmartLink>
                      </li>
                    );
                  })}
                </ul>
              </FadeUp>
            ) : (
              <ol className="blg-rail">
                {ROWS.map((p, i) => {
                  /* İndirilebilir görünüm (mavi zemin, indirme oku, "Ücretsiz
                     indirin") YALNIZCA dosyası olan e-kitaba. Yer tutucuda
                     aynı görünüm verilmemiş bir söz olurdu. */
                  const isFile = p.kind === "ekitap" && !p.seed;
                  return (
                    <li key={p.href + p.t}>
                      <FadeUp delay={0.22 + i * 0.05}>
                        <SmartLink
                          href={p.href}
                          className={isFile ? "blg-row blg-row--file" : "blg-row"}
                        >
                          {/* kyn-feed-d: tarih sütunu 84px ve tam tarih
                              sığmıyor; sarmaya izin veren kural
                              css/kaynaklar.css'te (globals'a dokunulmuyor). */}
                          <time className="blg-row-date kyn-feed-d" dateTime={p.iso}>
                            {p.on}
                          </time>
                          <span className="blg-row-body">
                            <span className="blg-row-head">
                              <span className="blg-row-cat">{KIND_LABEL[p.kind]}</span>
                              {p.seed ? <span className="kyn-seed-tag">Örnek</span> : null}
                              {p.meta ? <span className="blg-row-tag">{p.meta}</span> : null}
                              {isFile ? (
                                <span className="blg-row-dl">Ücretsiz indirin</span>
                              ) : null}
                            </span>
                            <b className="blg-row-t">{p.t}</b>
                            <em className="blg-row-s">{p.sum}</em>
                          </span>
                          {isFile ? (
                            <FileDown
                              className="blg-row-go"
                              size={15}
                              strokeWidth={2.1}
                              aria-hidden="true"
                            />
                          ) : (
                            <ArrowRight
                              className="blg-row-go"
                              size={15}
                              strokeWidth={2.1}
                              aria-hidden="true"
                            />
                          )}
                        </SmartLink>
                      </FadeUp>
                    </li>
                  );
                })}
              </ol>
            )}

            <FadeUp delay={0.44} className="blg-more">
              <SmartLink href="/kaynaklar" className="link-arrow">
                Tüm yayınlar
                <ArrowRight size={15} strokeWidth={2.1} />
              </SmartLink>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
