import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  ChartColumn,
  FileStack,
  Landmark,
  MapPin,
  Receipt,
  Stamp,
  TriangleAlert,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import FinalCta from "@/components/FinalCta";
import { YearRhythmScene } from "@/components/services/AccountingScenes";

import {
  ACC_EXCLUDES,
  ACC_PANEL,
  ACC_PRICE_FOOTNOTE,
  ACC_TAX_NOTE,
  ACC_TAX_ROWS,
  ACCOUNTING_DUBAI as C,
  accountingItems,
  yearLanes,
  type AccIcon,
} from "@/lib/accountingDubai";
import { INCLUSION_LABEL, RHYTHM_LABEL } from "@/lib/afterSetup";

/* ============================================================================
   DUBAİ MUHASEBE HİZMETİ — /dubai/muhasebe

   ---------------------------------------------------------------------------
   SADELEŞTİRME TURU — ÖNCE TEŞHİS

   Müşterinin cümlesi: "çok karışık ve yoğun geldi, her yerde yazı var,
   hiçbir bok anlamadım." Sayfa bilgi veriyordu ama anlaşılmıyordu. Ölçüm
   (sunucudan basılan HTML üzerinde, masaüstü 1440px):

     · 9 içerik bölümü · 24 h3 · 2 SVG sahnesi
     · <main> içindeki görünür metin 14.558 karakter (1.982 kelime)
     · bunun 11.324 karakteri her şey KAPALIYKEN bile ekranda — yani metnin
       yalnızca %22'si tıklamanın arkasındaydı. "Özet önde, detay talep
       üzerine" ilkesi dosyanın yorumlarında yazılıydı ama uygulanmıyordu.
     · iki sahne altyazısı tek başına 494 karakter
     · modellenen sayfa yüksekliği ≈ 9.260 piksel (ekranın ~11 katı)

   Sorun içerik eksikliği değil, dördü birden:

   1. DOKUZ BÖLÜM, DOKUZ AYRI DÜZEN. Ray, künye listesi, koyu şerit, kart
      ızgarası, uyarı kartları, fiyat kartları, alıntı, akordeon, bağlantı
      kartları. Ziyaretçi her kaydırmada "buraya nasıl bakılır"ı yeniden
      öğreniyordu.

   2. HİYERARŞİ YOKTU. Dokuz bölümün dokuzu da aynı `sec-pad` (112px), aynı
      46px h2, aynı giriş paragrafı. Hepsi eşit ağırlıkta olunca sayfa bir
      akış değil bir liste oluyor ve hiçbir yer "asıl cevap burada" demiyor.

   3. AYNI BİLGİ ALTI YERDE. Yıl sonu beyanı: kuruluş maddesi, takvim şeridi,
      kapsam aşaması, sınır maddesi, fiyat kalemi, SSS. KDV: altı yerde.
      Bağımsız denetim: sınır maddesi ile SSS cevabı neredeyse birebir aynı
      cümle.

   4. SAHNE AKIŞI KESİYORDU. İki sahneden biri (LedgerFlow) ilk bölümdeydi ve
      CSS onu telefonda en başa alıyordu: ziyaretçinin gördüğü ilk şey, tek
      cümle okumadan önce, yatay kaydırma gerektiren 520px genişliğinde bir
      şema ve altında 279 karakterlik bir altyazıydı.

   ---------------------------------------------------------------------------
   SONRA — NE DEĞİŞTİ

   Sayfa artık TEK bir soruya cevap veriyor ve o soruyu baştan söylüyor:
   "Dubai'de muhasebeyi kim, ne, ne zaman, ne kadara yapıyor?" Hero girişi bu
   dört soruyu sayıyor, ilk bölüm dördüne birer cümlelik cevap veriyor, kalan
   dört bölüm cevapları sırayla açıyor.

     1 · #ozet               → dört cevap, dört satır (açılış özeti)
     2 · #ortac-perspektifi  → KİM      (destek)
     3 · #kapsam             → NE       (ANA BÖLÜM)
     4 · #takvim             → NE ZAMAN (destek)
     5 · #fiyat              → NE KADAR (destek, sayfanın tek koyu bölümü)
     6 · #sss                → kalan sorular + sonraki adım (kapanış)

   HİYERARŞİ ARTIK GÖRÜNÜR: #kapsam tek "ana" bölüm — daha büyük başlık, daha
   geniş nefes (.svm-main). Kalan beşi destek (.svm-tight): küçük başlık, dar
   padding. Tek koyu bölüm fiyat; koyuluk artık dekor değil, "para burada"
   işareti.

   BÖLÜM DEĞİL BLOK OLANLAR: vergi çerçevesi, kuruluş kayıtları, sınırlar ve
   kapanış bağlantıları artık h2'li bölüm değil, ait oldukları bölümün içinde
   h3'lü blok. Kendi id'lerini KORUYORLAR (#vergi-cercevesi, #neden,
   #sinirlar, #sonra) — eski çapaların hiçbiri kırılmadı.

   ÖLÇÜM — SONRA (aynı yöntem, aynı cetvel):

     · 6 içerik bölümü · 16 h3 · 1 sahne
     · görünür metin 13.655 karakter (%6 az) — az düşmesi normal, çünkü
       istenen şey içeriği silmek değil sunumunu değiştirmekti
     · KAPALI hâlde ekranda 8.719 karakter (%23 az). Asıl ölçü bu: sayfayı
       ilk açan kişinin taraması gereken metin.
     · modellenen yükseklik ≈ 7.380 piksel (%20 az)

   Silinen metin gerçekten tekrar edenlerdi: iki sahne altyazısı (494),
   alıntı kuyruğu (190), vergi çerçevesi bölüm girişi (150) ve dört bölüm
   girişinin uzun hâlleri. Tek bir yükümlülük, oran, şerh veya sınır
   silinmedi; SSS'in altı sorusu da olduğu gibi duruyor.

   SAHNE: iki sahne bire indi. LedgerFlow silindi — anlattığı şey ("girdi →
   defter → çıktı") zaten #kapsam'ın beş aşaması ve altı çıktısıydı, yani
   metnin akışını kesen bir tekrardı. YearRhythm kaldı: üç ritmi 12 ay
   üzerinde yan yana göstermek yazıyla yapılamıyor ve şerit afterSetup.ts'ten
   çiziliyor, süs değil veri.

   ---------------------------------------------------------------------------
   ROTA: NEDEN BU DOSYA DİNAMİK ROTAYI YENİYOR

   /dubai/[hizmet] dinamik rotası zaten var ve dört hizmeti (muhasebe, banka,
   uyum, vize) tek bir şablondan basıyor. App Router'da STATİK SEGMENT
   DİNAMİĞİ YENER: bu dosya var olduğu sürece /dubai/muhasebe buraya düşüyor,
   diğer üç hizmet dinamik rotadan çalışmaya devam ediyor. Dinamik rotaya
   dokunulmadı — orada yapılacak bir düzeltme öteki üç sayfayı da düzeltmeye
   devam etsin diye.

   Bunun bir sonucu var ve bilerek kabul edildi: dinamik şablon muhasebe için
   services.ts'ten "aylık 175 USD" basıyordu (PRICING.dubai.annual / 12), bu
   sayfa ise müşterinin imzalı hizmet belgesindeki 350 USD'yi basıyor. Çelişki
   yeni değil, yalnızca artık görünür (bkz. lib/accountingDubai.ts ·
   SWAP:ACC_PRICING ve lib/afterSetup.ts · SWAP:AFTER_PRICING). pricing.ts'e
   dokunulmadı: hangi rakamın geçerli olduğu müşterinin kararı.

   ---------------------------------------------------------------------------
   BU DOSYADA TEK BİR CÜMLE YOK

   Ekranda görünen her kelime lib/accountingDubai.ts'te; rakamlar da oradan
   değil, onun okuduğu kaynaklardan (afterSetup.ts, countryContent.ts,
   services.ts) geliyor. Şablon yalnızca diziyor. Sebebi sektör sayfasıyla
   aynı: müşteri tek dosyayı baştan sona okuyup onaylayabilsin.

   ---------------------------------------------------------------------------
   SEO — sadeleştirmede korunanlar

     1. Sayfada hâlâ TEK h1 (PageHero) — hizmetin kendisi.
     2. Altı bölümün altısı da kendi <section id>'si ve kendi h2'siyle. h2
        metinleri aranan cümlenin kendisi ("Dubai'de muhasebe ne zaman
        başlıyor", "tam olarak neyi kapsıyor", "ne kadar ödüyorsunuz").
     3. Bölümden bloğa inen dört başlık h3 oldu ama id'leri ve metinleri
        yerinde: içerik kaybı yok, yalnızca ağırlık değişti.
     4. İç bağlantılar SmartLink ile. Kardeş hizmet sayfaları şu an dolaşıma
        kapalı, yani sönük çıkacaklar — bu kasıtlı (bkz. lib/routes.ts).
     5. SSS'in altı sorusu da duruyor. Kapalı <details> içinde oldukları için
        ekranda yer kaplamıyorlar ama FAQPage işaretlemesini besliyorlar.

   JSON-LD üç düğüm: BreadcrumbList, Service, FAQPage. Hiçbirinde sayfada
   yazmayan bir şey yok — puan, yorum, garanti veya süre iddiası taşımıyor.
   ========================================================================= */

/* Kanonik adres mutlak: layout.tsx'te metadataBase yok, göreli bir kanonik
   geliştirme sunucusunun adresine çözülürdü. Alan adı layout.tsx'teki
   JSON-LD ile aynı kaynaktan. */
const SITE = "https://ortacglobal.com";
const PAGE_URL = `${SITE}/dubai/muhasebe`;

export const generateMetadata = (): Metadata => ({
  title: C.seo.title,
  description: C.seo.description,
  alternates: { canonical: PAGE_URL },
  /* keywords meta'sı bilerek yok: arama motorları yıllardır yok sayıyor.
     Sorguların karşılığı h2'lerde ve metnin kendisinde. */
  openGraph: {
    type: "article",
    locale: "tr_TR",
    siteName: "Ortac Global",
    url: PAGE_URL,
    title: C.seo.title,
    description: C.seo.description,
  },
});

/* İçerik dosyası ikon adını string taşıyor (orada gerekçesi yazılı); eşleme
   burada. Mühür ile tik arasındaki fark kasıtlı: lisans bir onay değil,
   bir yetki — Authority.tsx'te de aynı ayrım aynı ikonla yapılıyor. */
const ICON: Record<AccIcon, LucideIcon> = {
  book: BookOpen,
  receipt: Receipt,
  chart: ChartColumn,
  wallet: Wallet,
  stamp: Stamp,
  bank: Landmark,
  files: FileStack,
  calendar: CalendarCheck,
  pin: MapPin,
};

const nf = new Intl.NumberFormat("tr-TR");

/* --------------------------------------------------------------- yardımcı */

/** "başlangıç 350 USD + KDV" — biçim CountryAfter ile birebir aynı. */
function priceText(p: { usd: number; plusVat: boolean; qualifier?: string }) {
  return `${p.qualifier ? `${p.qualifier} ` : ""}${nf.format(p.usd)} USD${p.plusVat ? " + KDV" : ""}`;
}

export default function DubaiAccountingPage() {
  const items = accountingItems();
  const lanes = yearLanes();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Dubai", item: `${SITE}/dubai` },
          { "@type": "ListItem", position: 3, name: "Muhasebe", item: PAGE_URL },
        ],
      },
      {
        /* offers/price BİLEREK yok: kalemlerin yarısı koşullu ve "başlangıç"
           nitelikli. Yapılandırılmış veride tek bir fiyat göstermek, sayfada
           özenle kurulan koşulluluğu arama sonucunda düz bir rakama
           indirgerdi. */
        "@type": "Service",
        name: "Dubai'de şirket muhasebesi, KDV ve vergi beyan hizmeti",
        serviceType: "Muhasebe ve vergi uyumu",
        url: PAGE_URL,
        provider: { "@type": "Organization", name: "Ortac Global", url: SITE },
        areaServed: { "@type": "Place", name: "Dubai" },
        description: C.seo.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: C.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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

        {/* country VERİLMİYOR: PageHero o zaman kompakt başlık bloğunu basıyor.
            İki sütunlu ülke hero'su kuruluş kartını gösteriyor ve bu sayfanın
            konusu kuruluş değil. */}
        <PageHero
          crumb={C.hero.crumb}
          title={C.hero.title}
          accent={C.hero.accent}
          lead={C.hero.lead}
        />

        {/* ========================================================== 1 · ÖZET

            Sayfanın sözleşmesi. Dört soru, dört cümle, dört bağlantı — ve
            sıraları aşağıdaki bölümlerin sırasıyla aynı.

            Eski atlama şeridinin yerinde duruyor ama onun yaptığı işi
            yapmıyor: şerit yalnızca bölüm adlarını sayıyordu ve ziyaretçi
            zaten okumaya başladıktan SONRA, birinci bölümün altında
            karşılaşıyordu. Bu blok cevabın kendisini veriyor; tıklamak
            isteğe bağlı. */}
        <section
          id={C.summary.id}
          className="sec-pad svm-tight"
          style={{ background: "var(--white)" }}
        >
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.summary.heading}
                accent={C.summary.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.summary.lead}</p>
              </FadeUp>
            </div>

            {/* Düz <a>: hedef aynı sayfada, SmartLink rota bileşeni. */}
            <div className="svm-answers">
              {C.summary.answers.map((a, i) => (
                <FadeUp key={a.k} delay={0.1 + i * 0.05}>
                  <a href={`#${a.to}`} className="svm-answer">
                    <span className="svm-answer-k">{a.k}</span>
                    <p>{a.line}</p>
                    <span className="svm-answer-go">
                      {a.cta}
                      <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
                    </span>
                  </a>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ 2 · KİM

            Destek bölümü ve bilerek kısa: dört doğrulanabilir satır ve bir
            alıntı. Eskiden burada bir de "alıntıyı konuya bağlayan" paragraf
            vardı; bölümün girişi zaten aynı şeyi söylediği için kaldırıldı. */}
        <section
          id={C.ortac.id}
          className="sec-pad svm-tight"
          style={{ background: "var(--paper)" }}
        >
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.ortac.heading}
                accent={C.ortac.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.ortac.lead}</p>
              </FadeUp>
            </div>

            <div className="svm-two svm-two-even">
              <div className="svm-facts">
                {C.ortac.facts.map((f, i) => {
                  const Icon = ICON[f.icon];
                  return (
                    <FadeUp key={f.title} delay={0.1 + i * 0.05}>
                      <div className="svm-fact">
                        <span className="svm-fact-ic" aria-hidden="true">
                          <Icon size={17} strokeWidth={2.1} />
                        </span>
                        <div>
                          <b>{f.title}</b>
                          <span>{f.line}</span>
                        </div>
                      </div>
                    </FadeUp>
                  );
                })}
                {ACC_PANEL && (
                  <FadeUp delay={0.3}>
                    {/* Panelin adı brand.ts'ten okunuyor, ikinci kez
                        yazılmıyor: ortaklık listesi değişirse burası da
                        değişsin. */}
                    <p className="svm-note">Kullandığımız müşteri paneli: {ACC_PANEL}.</p>
                  </FadeUp>
                )}
              </div>

              <FadeUp delay={0.16}>
                <figure className="svm-quote">
                  <blockquote>{C.ortac.quote.text}</blockquote>
                  <figcaption>
                    <b>{C.ortac.quote.who}</b>
                    <span>{C.ortac.quote.role}</span>
                  </figcaption>
                </figure>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ===================================================== 3 · ANA BÖLÜM

            Sayfanın tek ana bölümü ve tek büyük başlığı. Üç katman aynı
            başlığın altında ve üçünün ağırlığı bilerek farklı:

              · beş aşama   → açık, ayrıntı tıklamayla
              · altı çıktı  → tek açılır blok (kapalı hâlde tek satır)
              · beş sınır   → AÇIK, tıklamanın arkasında değil

            Sınırların açık kalması bir tasarım tercihi değil duruş: "özet
            önde, detay talep üzerine" ilkesi sırayı düzenlemek için var,
            sınırı tıklanmadan görünmez yapmak için değil. */}
        <section id={C.scope.id} className="sec-pad svm-main" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.scope.heading}
                accent={C.scope.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.scope.lead}</p>
              </FadeUp>
            </div>

            <div className="svm-rail svm-rail-wide">
              {C.scope.phases.map((p, i) => (
                <FadeUp key={p.title} className="svm-step" delay={0.1 + i * 0.05}>
                  <span className="svm-step-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="svm-step-b">
                    <h3>{p.title}</h3>
                    <p>{p.line}</p>
                    {/* native <details>: JavaScript yok, klavye ve ekran
                        okuyucu davranışı tarayıcıdan geliyor, bileşen sunucu
                        tarafında kalabiliyor. Sayfadaki bütün açılır kalemler
                        aynı kalıbı kullanıyor — ziyaretçi tek bir açma
                        hareketi öğreniyor. */}
                    <details className="svm-more">
                      <summary>
                        Bu aşamada ne oluyor?
                        <span className="svm-more-x" aria-hidden="true" />
                      </summary>
                      <p>{p.detail}</p>
                    </details>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* ÇIKTI — eskiden altı kartlık açık bir ızgaraydı ve tek başına
                540 karakter görünür metin tutuyordu. Süreçten ayrı bir soruya
                cevap veriyor ("her ay elime ne geçiyor") ama okuyanın çoğu
                önce süreci anlamak istiyor. Tek açılır blok: kapalıyken bir
                satır, açıkken aynı altı kart. */}
            <FadeUp delay={0.2}>
              <details className="svm-more svm-drop">
                <summary>
                  {C.scope.outputsTitle}
                  <span className="svm-more-x" aria-hidden="true" />
                </summary>
                <div className="svm-out">
                  {C.scope.outputs.map((o) => {
                    const Icon = ICON[o.icon];
                    return (
                      <div className="svm-out-card" key={o.title}>
                        <span className="svm-out-ic" aria-hidden="true">
                          <Icon size={17} strokeWidth={2} />
                        </span>
                        <b>{o.title}</b>
                        <span>{o.line}</span>
                      </div>
                    );
                  })}
                </div>
              </details>
            </FadeUp>

            {/* SINIRLAR — eski #sinirlar bölümü, artık kapsamın ikinci
                yarısı. id korundu; ağırlığı h2'den h3'e indi çünkü "neyi
                kapsıyor" ile "neyi kapsamıyor" aynı sorunun iki yüzü ve iki
                ayrı bölüm olduklarında birbirini doğrulamak yerine iki ayrı
                iddia gibi okunuyorlardı. */}
            <FadeUp delay={0.14}>
              <h3 id={C.limits.id} className="svm-sub">
                {C.limits.title}
              </h3>
            </FadeUp>
            <FadeUp delay={0.18}>
              <p className="svm-sub-lead">{C.limits.lead}</p>
            </FadeUp>

            <div className="svm-limits svm-blockgap">
              {C.limits.items.map((l, i) => (
                <FadeUp key={l.title} delay={0.1 + i * 0.05}>
                  <div className="svm-limit">
                    <span className="svm-limit-ic" aria-hidden="true">
                      <TriangleAlert size={15} strokeWidth={2.1} />
                    </span>
                    <div>
                      <h4>{l.title}</h4>
                      <p>{l.line}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* services.ts'teki hariç listesi. Yukarıdaki beş madde onu zaten
                cümleyle anlatıyor; bu satır aynı bilginin teklifte hangi
                sözcüklerle geçtiğini gösteriyor — iki liste birbirini
                doğruluyor, tekrar etmiyor. */}
            {ACC_EXCLUDES.length > 0 && (
              <FadeUp delay={0.34}>
                <p className="svm-note svm-note-top">
                  Teklifte hariç kalem olarak yazılanlar: {ACC_EXCLUDES.join(" · ")}.
                </p>
              </FadeUp>
            )}
          </div>
        </section>

        {/* ======================================================= 4 · TAKVİM

            "Ne zaman" sorusunun tamamı tek bölümde: kuruluşta ne açılıyor
            (#neden), yıl içinde ne tekrar ediyor (sahne) ve bunların
            dayandığı çerçeve (#vergi-cercevesi). Üçü eskiden üç ayrı
            bölümdü — aralarındaki bağı ziyaretçi kuruyordu. */}
        <section
          id={C.calendar.id}
          className="sec-pad svm-tight"
          style={{ background: "var(--paper)" }}
        >
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.calendar.heading}
                accent={C.calendar.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.calendar.lead}</p>
              </FadeUp>
            </div>

            <FadeUp delay={0.1}>
              <h3 id={C.why.id} className="svm-sub svm-sub-first">
                {C.why.title}
              </h3>
            </FadeUp>
            <div className="svm-rail svm-blockgap">
              {C.why.points.map((p, i) => (
                <FadeUp key={p.title} className="svm-step" delay={0.12 + i * 0.06}>
                  <span className="svm-step-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="svm-step-b">
                    <h4>{p.title}</h4>
                    <p>{p.line}</p>
                    {p.more && (
                      <details className="svm-more">
                        <summary>
                          Neden böyle?
                          <span className="svm-more-x" aria-hidden="true" />
                        </summary>
                        <p>{p.more}</p>
                      </details>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Sayfanın TEK sahnesi. Kutular afterSetup.ts'teki `months`
                dizilerinden çiziliyor; üç ritmi 12 ay üzerinde yan yana
                göstermek yazıyla yapılamıyordu. */}
            <FadeUp delay={0.12} className="svm-cal">
              <YearRhythmScene caption={C.calendar.caption} />
            </FadeUp>

            {/* Şeridin kelimeye çevrilmiş hâli — aynı veriden (yearLanes),
                yani şerit ile metin ayrı düşemiyor. Eskiden üç koyu karttı ve
                ekranda üç paragraf yer tutuyordu; şeridin kendisi zaten
                etiketleri ve sıklığı basıyor, o yüzden kelime karşılığı
                açılır bloğa indi. */}
            <FadeUp delay={0.2}>
              <details className="svm-more svm-drop">
                <summary>
                  {C.calendar.rhythmTitle}
                  <span className="svm-more-x" aria-hidden="true" />
                </summary>
                <ul>
                  {lanes.map((l) => (
                    <li key={l.id}>
                      <b>{l.label}</b> — {l.caption}
                    </li>
                  ))}
                </ul>
              </details>
            </FadeUp>

            {/* VERGİ ÇERÇEVESİ — eski #vergi-cercevesi bölümü. Kendine ait
                tek bir cümlesi bile yoktu (satırlar countryContent.ts'ten
                geliyor), yani bölüm olarak var olmasının tek sebebi başlık
                basmaktı. id korundu, ağırlık h3'e indi.

                ŞERHLER AÇIKTA: "otomatik muafiyet yok" gibi notlar üstündeki
                değeri niteliyor. <details> arkasına konsa sayfa "%0"
                ifadesini çıplak basmış olurdu. */}
            <FadeUp delay={0.14}>
              <h3 id={C.taxFrame.id} className="svm-sub">
                {C.taxFrame.title}
              </h3>
            </FadeUp>
            <FadeUp delay={0.18}>
              <dl className="svm-tax">
                {ACC_TAX_ROWS.map((r) => (
                  <div className="svm-tax-row" key={r.label}>
                    <dt>{r.label}</dt>
                    <dd>
                      <b className="data">{r.value}</b>
                      {r.note && <span>{r.note}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeUp>

            <FadeUp delay={0.24}>
              <div className="svm-note-row">
                <p className="svm-note">{ACC_TAX_NOTE}</p>
                <AskCta label="Kendi durumumu sorayım" />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ======================================================== 5 · FİYAT

            Sayfanın TEK koyu bölümü. Eskiden takvim de koyuydu ve iki koyu
            bölüm arasında hiçbir ağırlık farkı kalmıyordu; şimdi koyuluk
            dekor değil işaret: para burada.

            Kalemler ve tutarlar afterSetup.ts'ten okunuyor; bu dosyada tek
            bir rakam yazılı değil. Rozet (INCLUSION_LABEL) hangi kalemin
            herkeste doğduğunu söylüyor — belgenin en çok vurguladığı ayrım bu
            ve veri seviyesinde duruyor, burada yeniden yorumlanmıyor. */}
        <section id={C.price.id} className="sec-pad svm-tight sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text={C.price.heading}
                accent={C.price.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">{C.price.lead}</p>
              </FadeUp>
            </div>

            <div className="svm-prices">
              {items.map((it, i) => (
                <FadeUp key={it.id} delay={0.1 + i * 0.05}>
                  <div className="svm-price" data-inc={it.inclusion}>
                    <div className="svm-price-top">
                      <span className="svm-badge">{INCLUSION_LABEL[it.inclusion].short}</span>
                      <span className="svm-rhythm">{RHYTHM_LABEL[it.rhythm]}</span>
                    </div>

                    <h3>{it.title}</h3>
                    {it.en && <span className="svm-price-en">{it.en}</span>}

                    <p className="svm-price-v data">
                      {priceText(it.price)}
                      <i>{it.price.unit}</i>
                    </p>

                    {/* AÇIKLAMA ARTIK KAPALI GELİYOR. Altı kartın altısında
                        birden açık dururken fiyat bölümü tek başına 2.400
                        karakter görünür metin tutuyordu ve tutarlar o metnin
                        arasında kayboluyordu. Kartın kapalı hâli şimdi dört
                        şey söylüyor: kalemin adı, herkeste doğup doğmadığı,
                        tutarı ve tutarın neden değişebileceği. Gerisi tıkla.

                        `note` HÂLÂ AÇIK: açıklamanın aksine tutarı niteliyor
                        ("başlangıç seviyesi", "hacme göre değişir"). Onu
                        kapatmak rakamı şerhsiz basmak olurdu. */}
                    {(it.line || (it.scope && it.scope.length > 0)) && (
                      <details className="svm-more svm-more-dark">
                        <summary>
                          Bu kalem ne?
                          <span className="svm-more-x" aria-hidden="true" />
                        </summary>
                        {it.line && <p>{it.line}</p>}
                        {it.scope && it.scope.length > 0 && (
                          <ul>
                            {it.scope.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        )}
                      </details>
                    )}

                    {/* Not şerh: kapalı kalması yanlış olurdu, çünkü hepsi
                        tutarın neden değişebileceğini söylüyor. */}
                    {it.note && <p className="svm-price-n">{it.note}</p>}
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.36}>
              <div className="svm-price-foot">
                <p>{C.price.noTotal}</p>
                <p>{ACC_PRICE_FOOTNOTE}</p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ================================================ 6 · SSS + KAPANIŞ

            İki eski bölüm tek kapanışta. Altı sorunun altısı da duruyor:
            kapalı <details> ekranda yalnızca soru satırı kadar yer tutuyor,
            buna karşılık her biri ayrı bir arama sorgusunun karşılığı ve
            FAQPage işaretlemesini besliyor.

            Kapanış bağlantıları aynı bölümün altında h3 olarak (#sonra id'si
            korundu): "kalan sorun varsa cevap, yoksa çıkış" tek bir hareket. */}
        <section id={C.faq.id} className="sec-pad svm-tight" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.faq.heading}
                accent={C.faq.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.faq.lead}</p>
              </FadeUp>
            </div>

            <div className="svm-faq">
              {C.faq.items.map((f, i) => (
                <FadeUp key={f.q} delay={0.1 + i * 0.04}>
                  <details className="svm-q">
                    <summary>
                      <span>{f.q}</span>
                      <span className="svm-more-x" aria-hidden="true" />
                    </summary>
                    <p>{f.a}</p>
                  </details>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.14}>
              <h3 id={C.close.id} className="svm-sub">
                {C.close.title}
              </h3>
            </FadeUp>
            <FadeUp delay={0.18}>
              <p className="svm-sub-lead">{C.close.lead}</p>
            </FadeUp>

            {/* SmartLink: kardeş hizmet sayfaları şu an dolaşıma kapalı ve
                sönük çıkıyorlar. Ölü tıklama olmuyor, yol haritası görünür
                kalıyor; sayfalar açıldığında hiçbir şeye dokunmadan
                canlanacaklar (lib/routes.ts). */}
            <div className="svm-links svm-blockgap">
              {C.close.links.map((l, i) => (
                <FadeUp key={l.href} delay={0.1 + i * 0.05}>
                  <SmartLink href={l.href} className="svm-link">
                    <b>{l.label}</b>
                    <span>{l.line}</span>
                    <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                  </SmartLink>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.32}>
              <div className="svm-close">
                <div>
                  <h3>{C.close.askTitle}</h3>
                  <p>{C.close.askLine}</p>
                </div>
                <AskCta label={C.close.askLabel} />
              </div>
            </FadeUp>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
