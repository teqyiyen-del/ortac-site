import Image from "next/image";
import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight, ArrowUpRight, FileDown } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { POST_PHOTO } from "@/lib/media";
import { blogHref, POST_DUBAI_MALIYET } from "@/lib/blog";

/* Ana sayfadaki yayın bölümü: solda öne çıkan içerik, sağında tarih ekseninde
   kısa bir dizin. Bölüm bir mevzuat akışı değil, karma bir yayın listesi:
   blog yazısı, ülke rehberi, e-kitap ve pratik cevap aynı listede durur;
   mevzuat notu türlerden yalnızca biridir. Bölümün çıkışı /kaynaklar. */

/* SWAP:BLOG_POSTS — buradaki başlıklar, özetler ve tarihler YER TUTUCUDUR.
   Gerçek yayınlar geldiğinde ITEMS listesi CMS'ten beslenmeli; bileşen
   sıralamayı kendi yapar, listeyi elle sıraya dizmek gerekmez. Yazar adı,
   okunma sayısı ve sayfa adedi gibi doğrulanamaz alanlar bilerek yok. */

type Kind = "blog" | "rehber" | "ekitap" | "pratik" | "mevzuat";

const KIND_LABEL: Record<Kind, string> = {
  blog: "Blog yazısı",
  rehber: "Ülke rehberi",
  ekitap: "E-kitap",
  pratik: "Pratik cevap",
  mevzuat: "Mevzuat notu",
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
     başa geçerse geçsin görseli hazır olmalı. Dizin satırları görsel
     kullanmaz, alan orada yalnızca bekler. */
  img: string;
};

/* SWAP:STOCK_PHOTOS — görseller src/lib/media.ts içindeki POST_PHOTO
   haritasından okunur; müşterinin kendi çekimi geldiğinde yalnız o dosya
   değişir, burası aynı kalır. Her kayıt bir görsel taşır: kart sıralamayla
   seçildiği için başa geçen kaydın görseli hazır olmalı. */
/* Yazısı gerçekten yazılmış olan kayıt kendi adresine gidiyor; kalanların
   slug'ı henüz yok ve /kaynaklar dizinine düşmeye devam ediyorlar.

   Adres string olarak yazılmıyor, kaydın kendisinden türüyor (lib/blog.ts ·
   POST_DUBAI_MALIYET). Sebebi: slug iki yerde yazılırsa biri değiştiğinde
   öteki sessizce kırık kalır. Buradaki hâliyle slug değişirse derleme hata
   veriyor, kart değil.

   Başlık, özet ve tarih de blog.ts'teki kayıtla birebir aynı tutuluyor —
   listeden tıklayan biri farklı başlıklı bir sayfaya düşerse yanlış yere
   geldiğini sanıyor. İkisini tek kaynağa bağlamak bu turun işi değildi;
   kart düzenine dokunulmadı, yalnızca adres bağlandı. */
const ITEMS: Item[] = [
  {
    t: "Dubai'de şirket kurmanın maliyet kalemleri",
    kind: "rehber",
    sum: "Lisans, vize, ofis ve yenileme kalemleri; hangisi ne zaman ödenir.",
    on: "22 Tem 2026",
    iso: "2026-07-22",
    img: POST_PHOTO.dubaiCost,
    href: blogHref(POST_DUBAI_MALIYET.slug),
  },
  {
    t: "İngiltere Ltd el kitabı",
    kind: "ekitap",
    sum: "Kuruluştan ilk beyan dönemine kadar adım listesi.",
    on: "15 Tem 2026",
    iso: "2026-07-15",
    meta: "PDF",
    img: POST_PHOTO.ukTax,
    href: "/kaynaklar",
  },
  {
    t: "Banka hesabı reddedilirse ne olur?",
    kind: "pratik",
    sum: "Red gerekçeleri, ikinci başvuru dosyası ve alternatif kurumlar.",
    on: "7 Tem 2026",
    iso: "2026-07-07",
    img: POST_PHOTO.bank,
    href: "/kaynaklar",
  },
  {
    t: "KKTC'de şirket kimler için mantıklı?",
    kind: "blog",
    sum: "Düşük kuruluş maliyeti ve Türkiye'ye yakınlık kime yarar, kime yaramaz.",
    on: "26 Haz 2026",
    iso: "2026-06-26",
    img: POST_PHOTO.kktc,
    href: "/kaynaklar",
  },
  {
    t: "İngiltere'de beyan takvimi",
    kind: "mevzuat",
    sum: "Companies House ve HMRC tarafındaki dönemler ve son tarihler.",
    on: "17 Haz 2026",
    iso: "2026-06-17",
    img: POST_PHOTO.corpTax,
    href: "/kaynaklar",
  },
];

/* Sıralama tek kural: en yeni üstte. İlk kayıt öne çıkan karta, kalanlar
   tarih eksenindeki dizine düşer. Liste karışık girilse de düzen bozulmaz. */
const SORTED = [...ITEMS].sort((a, b) => b.iso.localeCompare(a.iso));
const [LEAD, ...ROWS] = SORTED;

export default function HomeBlog() {
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
