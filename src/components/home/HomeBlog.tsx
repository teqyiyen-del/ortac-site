import Image from "next/image";
import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight, ArrowUpRight, FileDown } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { POST_PHOTO } from "@/lib/media";
import { blogHref, formatDate, sortedPosts } from "@/lib/blog";
import { KIND_ORDER, RESOURCE_KINDS, sortedEbooks, sortedUpdates } from "@/lib/resources";

/* Ana sayfadaki yayın bölümü: solda öne çıkan içerik, sağında tarih ekseninde
   kısa bir dizin. Bölüm bir mevzuat akışı değil, karma bir yayın listesi:
   blog yazısı, ülke rehberi, e-kitap ve pratik cevap aynı listede durur;
   mevzuat notu türlerden yalnızca biridir. Bölümün çıkışı /kaynaklar. */

type Kind = "blog" | "ekitap" | "mevzuat";

const KIND_LABEL: Record<Kind, string> = {
  blog: "Blog yazısı",
  ekitap: "E-kitap",
  mevzuat: "Gelişme",
};

type Item = {
  t: string;
  kind: Kind;
  sum: string;
  /* on: ekranda görünen tarih · iso: sıralama ve <time dateTime> için */
  on: string;
  iso: string;
  href: string;
  /* meta yalnızca indirilebilir içerikte dolu: dosya biçimi rozeti */
  meta?: string;
  /* img zorunlu: öne çıkan kart sıralamayla belirlendiği için hangi kayıt
     başa geçerse geçsin görseli hazır olmalı. */
  img: string;
};

/* LİSTE ARTIK ELLE YAZILMIYOR — bu turun düzelttiği şey.

   Eskiden burada `SWAP:BLOG_POSTS` işaretli beş kayıt vardı: başlık, özet ve
   TARİH elle yazılmıştı ve beşinin dördü uydurmaydı ("İngiltere Ltd el
   kitabı", "Banka hesabı reddedilirse ne olur?" …). Dördü de /kaynaklar'a
   çıkıyordu, yani tıklayan kişi vaat edilen yazıyı hiçbir zaman bulamıyordu.
   İşaret "yer tutucu" diyordu ama sayfa CANLIYDI ve ziyaretçi işareti görmez.

   Artık üç gerçek kaynaktan türüyor: yazılar blog.ts'ten, gelişmeler ve
   e-kitaplar resources.ts'ten. O iki dizi bugün BOŞ ve boş olmaları kasıtlı —
   şema kaynağı zorunlu tutuyor (kaynaksız gelişme, dosyasız e-kitap tip
   denetiminden geçmiyor). Yani bu bölüm bugün tek gerçek yazıyı gösteriyor;
   ikinci yazı yazıldığı gün ikisini, elde hiç yazı kalmazsa hiçbirini. */
const ITEMS: Item[] = [
  ...sortedPosts().map((post): Item => ({
    t: post.title,
    kind: "blog",
    sum: post.summary,
    on: formatDate(post.publishedAt),
    iso: post.publishedAt,
    href: blogHref(post.slug),
    img: post.cover,
  })),
  ...sortedUpdates().map((u): Item => ({
    t: u.title,
    kind: "mevzuat",
    sum: u.summary,
    on: formatDate(u.date),
    iso: u.date,
    href: "/gelismeler",
    img: POST_PHOTO.corpTax,
  })),
  ...sortedEbooks().map((b): Item => ({
    t: b.title,
    kind: "ekitap",
    sum: b.summary,
    on: formatDate(b.updatedAt),
    iso: b.updatedAt,
    href: "/e-kitaplar",
    meta: `${b.format} · ${b.pages} sayfa`,
    img: POST_PHOTO.ukTax,
  })),
];

/* Sıralama tek kural: en yeni üstte. İlk kayıt öne çıkan karta, kalanlar
   tarih eksenindeki dizine düşer. */
const SORTED = [...ITEMS].sort((a, b) => b.iso.localeCompare(a.iso));
const [LEAD, ...ROWS] = SORTED;

export default function HomeBlog() {
  /* Liste gerçek veriden türediği için BOŞ OLABİLİR — bugün olmasa da yarın.
     Boşken bölüm hiç basılmıyor: "yayınlarımız" başlığı altında boş bir
     ızgara göstermek, uydurma kayıt göstermenin sessiz hâli olurdu. Çapa da
     onunla gidiyor; ana sayfada karşılığı olmayan #blog çapası kalmıyor. */
  if (!LEAD) return null;

  const leadIsFile = LEAD.kind === "ekitap";

  return (
    <section id="blog" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Yazılar, rehberler ve e-kitaplar."
            accent="e-kitaplar."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Yayın tarihine göre sıralanır, en yenisi üstte durur.
            </p>
          </FadeUp>
        </div>

        <div className="blg-grid">
          <FadeUp delay={0.16} className="blg-lead-wrap">
            <SmartLink
              href={LEAD.href}
              className={leadIsFile ? "blg-lead blg-lead--file" : "blg-lead"}
            >
              {/* Görsel şerit: en-boy oranı CSS'te sabit, next/image `fill` ile
                  kutuyu doldurur; yükseklik baştan ayrıldığı için CLS olmaz.
                  `unoptimized`: URL zaten Unsplash CDN'inde w=900&q=70 ile
                  boyutlanmış ve next.config'te remotePatterns tanımlı değil,
                  bu yüzden Next optimizer'ına ikinci bir tur attırılmıyor. */}
              <span className="blg-lead-media">
                <Image
                  src={LEAD.img}
                  alt=""
                  fill
                  sizes="(min-width: 980px) 52vw, 100vw"
                  className="blg-lead-img"
                  unoptimized
                />
              </span>

              <span className="blg-lead-top">
                <span className="blg-cat">{KIND_LABEL[LEAD.kind]}</span>
                {LEAD.meta ? (
                  <>
                    <span className="blg-sep" aria-hidden="true" />
                    <span>{LEAD.meta}</span>
                  </>
                ) : null}
                <span className="blg-flag">Öne çıkan</span>
              </span>

              <span className="blg-rule" aria-hidden="true" />

              <h3 className="blg-lead-t">{LEAD.t}</h3>
              <p className="blg-lead-s">{LEAD.sum}</p>

              <span className="blg-lead-foot">
                <time className="blg-date" dateTime={LEAD.iso}>
                  {LEAD.on}
                </time>
                <span className="blg-go">
                  {leadIsFile ? "E-kitabı indirin" : "Yazıyı okuyun"}
                  {leadIsFile ? (
                    <FileDown size={16} strokeWidth={2.1} aria-hidden="true" />
                  ) : (
                    <ArrowUpRight size={16} strokeWidth={2.1} aria-hidden="true" />
                  )}
                </span>
              </span>
            </SmartLink>
          </FadeUp>

          <div className="blg-side">
            {/* Öne çıkanın dışında kayıt yoksa dizin hiç basılmıyor: boş bir
                <ol> ekranda "buraya bir şey gelecekti" boşluğu bırakıyor.
                Yerine dört türün kapısı geliyor — bugün elde tek yazı var ama
                dört tür de gerçekten VAR, ve ziyaretçinin gideceği yer o. */}
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
                const isFile = p.kind === "ekitap";
                return (
                  <li key={p.t}>
                    <FadeUp delay={0.22 + i * 0.05}>
                      <SmartLink
                        href={p.href}
                        className={isFile ? "blg-row blg-row--file" : "blg-row"}
                      >
                        <time className="blg-row-date" dateTime={p.iso}>
                          {p.on}
                        </time>
                        <span className="blg-row-body">
                          <span className="blg-row-head">
                            <span className="blg-row-cat">
                              {KIND_LABEL[p.kind]}
                            </span>
                            {p.meta ? (
                              <span className="blg-row-tag">{p.meta}</span>
                            ) : null}
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
