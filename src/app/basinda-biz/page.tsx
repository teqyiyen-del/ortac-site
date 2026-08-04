import type { Metadata } from "next";
import { ArrowRight, Inbox, Link2, Newspaper } from "lucide-react";

import Nav from "@/components/Nav";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import { IDENTITY } from "@/lib/about";
import {
  PRESS_CONTACT,
  PRESS_EMPTY,
  PRESS_KIND_LABEL,
  hasPressContact,
  sortedPress,
} from "@/lib/press";

/* ============================================================================
   BASINDA BİZ — /basinda-biz

   NEDEN VAR
   Navbar'ın Kurumsal paneli iki karttan ibaretti ve müşterinin teşhisi
   buydu: "içi çok boş hissettirdi 2 tane şey var diye". Panele giren iki yeni
   kapıdan biri burası.

   SAYFANIN İSKELETİ  (sitenin standardı: Nav + main + PageHero + … + FinalCta)
     Nav
     PageHero          kırıntı yolu + sayfanın TEK <h1>'i + lead
     1 · kayıtlar      bugün BOŞ; boş durum dürüstçe basılıyor          (h2)
     2 · basın için    nereye yazılır + haberde kullanılacak künye      (h2)
     FinalCta

   BUGÜN NEDEN BOŞ — ve neden sayfa yine de var
   Depoda doğrulanmış tek bir basın kaydı yok (gerekçenin uzunu
   src/lib/press.ts'in başında). Uydurma yayın adı, tarihsiz alıntı ya da
   "bir haber sitesinde çıktı" cümlesi yazılmadı; şema zaten yazılmasına izin
   vermiyor (`url` ve `publishedAt` zorunlu).

   Sayfanın boşken de var olmasının sebebi menüden gelen ziyaretçi: "Basında
   biz" yazan bir bağlantıya tıklayıp hiçbir şeye ulaşamamak, sitenin bozuk
   olduğunu düşündürür. Boş durum üç şeyi birden söylüyor — şu an yok, buraya
   hangi kuralla kayıt girer, bu arada nereye gidilir.

   İKİNCİ BÖLÜM DOLGU DEĞİL
   Basın sayfasına gelen ikinci ziyaretçi tipi gazeteci ve onun sorusu farklı:
   "kimle konuşurum, firmanın adını haberde nasıl yazarım". Künye satırları
   lib/about.ts'ten TÜRETİLİYOR, buraya kopyalanmadı — iki kopya, birini
   güncelleyip diğerini unutmanın garantisi olurdu.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const PATH = "/basinda-biz";

/* Modül düzeyinde: `metadata` bir sunucu sabiti ve PRESS de öyle. Kayıt
   eklendiği gün başlık, açıklama ve hero metni birlikte doğruya dönüyor. */
const ITEMS = sortedPress();
const EMPTY = ITEMS.length === 0;

/* Tarih biçimi burada kuruluyor, lib/blog.ts'ten ödünç ALINMIYOR: blog künyesi
   ile basın künyesi aynı biçimi kullansa da aynı şeyi anlatmıyorlar ve bu sayfa
   blogun yayın kararlarına bağlanmamalı. İki satırlık bir bağımlılık, bir
   dosyayı iki bölümün ortak sorumluluğuna sokmaya değmez. */
const DATE_FMT = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const pressDate = (iso: string) => DATE_FMT.format(new Date(`${iso}T00:00:00`));

const TITLE = "Basında biz — Ortac Global hakkında yayımlananlar | Ortac Global";

/* Açıklama boşken bir arşiv vaat etmiyor: aramada "haberler" görüp boş sayfaya
   düşmek, sayfanın kendi dürüstlüğünü de götürürdü. */
const DESCRIPTION = EMPTY
  ? "Ortac Global hakkında yayımlanan basın kayıtları. Bu sayfaya yalnızca yayının kendi adresine bağlanabilen, tarihi belli kayıtlar giriyor — bugün liste boş."
  : "Ortac Global hakkında yayımlanan haber, röportaj ve köşe yazıları; her biri yayının kendi adresiyle birlikte.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  /* Kanonik mutlak: layout.tsx'te metadataBase yok, göreli kanonik geliştirme
     sunucusunun adresine çözülürdü (aynı gerekçe /iletisim'de de yazılı). */
  alternates: { canonical: `${SITE}${PATH}` },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Ortac Global",
    url: `${SITE}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

/* Haberde kullanılabilecek alanlar. Değerler lib/about.ts'ten geliyor; burada
   yalnızca HANGİ satırların basın künyesine girdiği yazılı.

   Neden ad listesi: /hakkimizda'daki künyede "Müşteri paneli · TaxDome" gibi
   satırlar da var — doğru ama gazetecinin işine yaramıyor. Liste pozitif
   seçiyor, yani about.ts'te bir etiket değişirse satır SESSİZCE DÜŞÜYOR;
   yanlış değerle ayakta kalmıyor. Bu bilinçli bir tercih: eksik künye,
   eskimiş künyeden ucuz. */
const PRESS_FACT_LABELS = [
  "Ticari isim",
  "Dubai tüzel kişiliği",
  "Yönetici ortak",
  "Yargı bölgeleri",
];

export default function BasindaBizPage() {
  /* Değeri boş olan satır zaten basılmıyor (SWAP:* alanları about.ts'te boş) */
  const facts = PRESS_FACT_LABELS.map((label) =>
    IDENTITY.rows.find((r) => r.label === label && r.value.trim() !== ""),
  ).filter((r): r is { label: string; value: string } => Boolean(r));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Basında biz", item: `${SITE}${PATH}` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Basında biz",
        url: `${SITE}${PATH}`,
        description: DESCRIPTION,
        inLanguage: "tr-TR",
        about: { "@id": `${SITE}/#organization` },
        /* Kayıt yokken hiçbir `NewsArticle` düğümü yazılmıyor: var olmayan bir
           haberi arama motoruna makine tarafından okunabilir biçimde bildirmek,
           sayfadaki yanlış bir cümleden çok daha uzun yaşar. */
        ...(EMPTY
          ? {}
          : {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: ITEMS.map((p, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  item: {
                    "@type": "NewsArticle",
                    headline: p.title,
                    url: p.url,
                    datePublished: p.publishedAt,
                    inLanguage: p.lang === "tr" ? "tr-TR" : "en",
                    publisher: { "@type": "Organization", name: p.outlet },
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

        {/* country VERİLMİYOR: PageHero kompakt başlığı basıyor. İki sütunlu
            hero tek bir ülkenin sahnesini çiziyor; bu sayfanın konusu ülke
            değil. */}
        <PageHero
          crumb="Basında biz"
          title="Hakkımızda çıkanlar, kaynağıyla birlikte."
          accent="kaynağıyla birlikte."
          lead={
            EMPTY
              ? "Bu sayfa bir basın arşivi ve bugün boş. Buraya yalnızca yayının kendi adresine bağlanabilen, tarihi belli kayıtlar giriyor — ekran görüntüsü, kaynağı yazılmayan alıntı ya da adı verilmeyen bir yayın girmiyor."
              : "Ortac Global hakkında yayımlananlar. Her kaydın yanında yayının adı, tarihi ve haberin kendi adresi duruyor; alıntıyı buradan değil, kaynağından okuyun."
          }
        />

        <section className="sec-pad" id="kayitlar" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <h2 className="h2">Basın kaydı</h2>
              <p className="sec-lead">
                Kaynağına gidilemeyen kayıt bu listeye hiç girmiyor — bu bir üslup tercihi değil,
                şemanın kuralı.
              </p>
            </div>

            {EMPTY ? (
              /* BOŞ DURUM — sitenin kalıbı: ne yok, hangi kuralla dolar, bu
                 arada nereye gidilir. Metin lib/press.ts'te (onaylanacak
                 metin React'in içine dağılmasın). */
              <FadeUp>
                <div className="krm-empty">
                  <span className="krm-empty-ic" aria-hidden="true">
                    <Inbox size={20} strokeWidth={1.8} />
                  </span>
                  <p className="krm-empty-t">{PRESS_EMPTY.title}</p>
                  <p className="krm-empty-l">{PRESS_EMPTY.line}</p>

                  <p className="krm-empty-k">Bu arada</p>
                  <div className="krm-empty-x">
                    <SmartLink href="/hakkimizda" className="krm-exit">
                      <span>
                        <b>Hakkımızda</b>
                        <em>Firmanın künyesi, yargı bölgeleri ve nasıl çalıştığımız.</em>
                      </span>
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                    <SmartLink href="/iletisim" className="krm-exit">
                      <span>
                        <b>İletişim</b>
                        <em>Üç ülkede ofis, tek muhatap. Basın sorusu da buradan geliyor.</em>
                      </span>
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  </div>
                </div>
              </FadeUp>
            ) : (
              <ul className="krm-feed">
                {ITEMS.map((p, i) => (
                  <li key={p.id}>
                    <FadeUp delay={i * 0.05}>
                      {/* Bağlantı SmartLink DEĞİL: hedef site dışı bir yayın,
                          dolaşım kararının (lib/routes.ts) konusu değil. */}
                      <a
                        className="krm-item"
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="krm-item-h">
                          <span className="krm-item-out">{p.outlet}</span>
                          <span className="krm-item-kind">{PRESS_KIND_LABEL[p.kind]}</span>
                          <time className="krm-item-d" dateTime={p.publishedAt}>
                            {pressDate(p.publishedAt)}
                          </time>
                        </span>
                        <span className="krm-item-t">{p.title}</span>
                        {p.summary && <span className="krm-item-s">{p.summary}</span>}
                        <span className="krm-item-go">
                          <Link2 size={14} strokeWidth={2} aria-hidden="true" />
                          Kaynağında okuyun
                        </span>
                      </a>
                    </FadeUp>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="sec-pad" id="basin-iletisim" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <div className="krm-media">
              <div>
                <h2 className="h2">Basından geliyorsanız</h2>
                <p className="sec-lead">
                  {hasPressContact()
                    ? "Basın soruları için doğrudan aşağıdaki adres kullanılıyor."
                    : "Basına ayrılmış ayrı bir adres yayımlamıyoruz; soru da iletişim sayfasındaki kanallardan geliyor. Yanıt süresi taahhüdümüz yok, o yüzden bir süre de yazmıyoruz."}
                </p>

                <div className="krm-media-a">
                  {hasPressContact() ? (
                    <a className="btn btn-primary" href={PRESS_CONTACT.href}>
                      {PRESS_CONTACT.value}
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </a>
                  ) : (
                    <SmartLink href="/iletisim" className="btn btn-primary">
                      İletişim sayfası
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  )}
                </div>
              </div>

              {/* Gazetecinin ikinci sorusu: "firmanın adını haberde nasıl
                  yazarım". Satırların değeri lib/about.ts'ten geliyor. */}
              <div className="krm-facts">
                <p className="krm-facts-k">
                  <Newspaper size={14} strokeWidth={2} aria-hidden="true" />
                  Haberde kullanabileceğiniz alanlar
                </p>
                <dl className="krm-facts-l">
                  {facts.map((f) => (
                    <div key={f.label} className="krm-facts-r">
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="krm-facts-n">
                  Doğrulanmamış alan burada hiç basılmıyor — kuruluş yılı, lisans numarası ve açık
                  adres bu yüzden listede yok.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
