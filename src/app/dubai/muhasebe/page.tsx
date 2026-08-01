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
import { LedgerFlowScene, YearRhythmScene } from "@/components/services/AccountingScenes";

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
   SAYFANIN AKIŞI — altı soru, sırayla

   Müşterinin isteği "liste değil akış" idi. Bölümler bu yüzden konu başlığına
   göre değil, ziyaretçinin kafasındaki soru sırasına göre dizildi:

     1 · #neden            → Muhasebe neden zorunlu, ne zaman başlıyor?
     2 · #vergi-cercevesi  → Neye göre tutuluyor? (oranlar, eşikler)
     3 · #takvim           → Yıl içinde ne zaman ne oluyor?
     4 · #kapsam           → Biz tam olarak ne yapıyoruz?
     5 · #sinirlar         → Neyi yapmıyoruz?
     6 · #fiyat            → Ne kadar?
     7 · #ortac-perspektifi→ Bu işi kim, nasıl yürütüyor?
     8 · #sss              → Kalan sorular
     9 · #sonra            → Bundan sonra ne oluyor?

   Her bölüm ÖZET veriyor, uzun kalemler <details> ile açılıyor. Tek istisna
   #sinirlar: sınırlar tıklamanın arkasına konmuyor (bkz. oradaki not).

   ---------------------------------------------------------------------------
   SEO — bu sayfanın var olma sebebi

   "dubaide muhasebe hizmeti", "dubai şirket muhasebesi", "dubai kdv kaydı",
   "dubai kurumlar vergisi beyannamesi" ayrı ayrı aranan cümleler ve hiçbirinin
   sitede karşılığı yoktu: dinamik şablon dört hizmete tek bir kapsam/fiyat
   iskeleti veriyordu. Yapının üç kuralı bu yüzden estetik değil işlevsel:

     1. Sayfada TEK h1 (PageHero) — hizmetin kendisi.
     2. Her bölüm kendi <section id>'si ve kendi h2'si. h2 metinleri aranan
        cümlenin kendisi olacak şekilde yazıldı, başlık süsü değil.
     3. İç bağlantılar SmartLink ile. Kardeş hizmet sayfaları şu an dolaşıma
        kapalı, yani sönük çıkacaklar — bu kasıtlı (bkz. lib/routes.ts) ve
        sayfalar açıldığında kendiliğinden canlanacaklar.

   JSON-LD üç düğüm: BreadcrumbList, Service, FAQPage. Hiçbirinde sayfada
   yazmayan bir şey yok — puan, yorum, garanti veya süre iddiası taşımıyor.
   FAQPage doğrudan içerik dosyasındaki listeden üretiliyor, yani işaretleme
   ile ekrandaki metin ayrı düşemiyor.
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

/* Sayfa içi atlama şeridi. İki işi var: ziyaretçi aradığı bölüme tek tıkla
   iniyor, ve bölüm adresleri sayfanın kendi metninde bağlantı olarak geçiyor.
   Dokuz bölümün hepsi değil altısı: kapanış, SSS ve vergi çerçevesi zaten
   akışın içinde karşılaşılan yerler, şeride girince şerit menüye dönüyordu. */
const JUMP = [
  { id: C.why.id, label: "Ne zaman başlıyor" },
  { id: C.calendar.id, label: "Yıllık takvim" },
  { id: C.scope.id, label: "Kapsam" },
  { id: C.limits.id, label: "Sınırlar" },
  { id: C.price.id, label: "Fiyat" },
  { id: C.ortac.id, label: "Ortac'ın perspektifi" },
];

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

        {/* ================================================= 1 · NEDEN, NE ZAMAN */}
        <section id={C.why.id} className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.why.heading}
                accent={C.why.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.why.lead}</p>
              </FadeUp>
            </div>

            {/* İki sütun: solda üç madde, sağda akış şeması. Sahne ızgarada
                İKİNCİ sırada ama mobilde CSS onu başa alıyor — telefonda
                bölümün ilk gördüğü şey yine görsel olsun diye. */}
            <div className="svm-two">
              <div className="svm-rail">
                {C.why.points.map((p, i) => (
                  <FadeUp key={p.title} className="svm-step" delay={0.12 + i * 0.06}>
                    <span className="svm-step-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="svm-step-b">
                      <h3>{p.title}</h3>
                      <p>{p.line}</p>
                      {/* native <details>: JavaScript yok, klavye ve ekran
                          okuyucu davranışı tarayıcıdan geliyor, bileşen sunucu
                          tarafında kalabiliyor. Sayfadaki bütün açılır
                          kalemler aynı kalıbı kullanıyor — ziyaretçi tek bir
                          açma hareketi öğreniyor. */}
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

              <FadeUp delay={0.1} className="svm-art">
                <LedgerFlowScene caption={C.why.sceneCaption} />
              </FadeUp>
            </div>

            <FadeUp delay={0.3}>
              <nav className="svm-jump" aria-label="Sayfa bölümleri">
                {JUMP.map((j) => (
                  <a key={j.id} href={`#${j.id}`} className="svm-jump-a">
                    {j.label}
                    <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </FadeUp>
          </div>
        </section>

        {/* ================================================= 2 · VERGİ ÇERÇEVESİ */}
        <section id={C.taxFrame.id} className="sec-pad" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.taxFrame.heading}
                accent={C.taxFrame.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.taxFrame.lead}</p>
              </FadeUp>
            </div>

            {/* Satırlar countryContent.ts'ten okunuyor, burada yazılmıyor:
                ülke sayfasıyla bu sayfa aynı oranı iki farklı biçimde
                söyleyemesin diye.

                ŞERHLER AÇIKTA: "otomatik muafiyet yok" gibi notlar üstündeki
                değeri niteliyor. <details> arkasına konsa sayfa "%0" ifadesini
                çıplak basmış olurdu — STANCE_LIMITS'in yasakladığı şey tam
                olarak bu. */}
            <FadeUp delay={0.12}>
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

            <FadeUp delay={0.2}>
              <div className="svm-note-row">
                <p className="svm-note">{ACC_TAX_NOTE}</p>
                <AskCta label="Kendi durumumu sorayım" />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ========================================================= 3 · TAKVİM */}
        <section id={C.calendar.id} className="sec-pad sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text={C.calendar.heading}
                accent={C.calendar.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">{C.calendar.lead}</p>
              </FadeUp>
            </div>

            <FadeUp delay={0.12} className="svm-cal">
              <YearRhythmScene caption={C.calendar.sceneCaption} />
            </FadeUp>

            {/* Şeridin kelimeye çevrilmiş hâli. Aynı veriden besleniyor
                (yearLanes), yani şerit ile metin ayrı düşemiyor. */}
            <div className="svm-lanes">
              {lanes.map((l, i) => (
                <FadeUp key={l.id} delay={0.16 + i * 0.06}>
                  <div className="svm-lane">
                    <h3>{l.label}</h3>
                    <p>{l.caption}</p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.34}>
              <p className="svm-note svm-note-dark">{C.calendar.note}</p>
            </FadeUp>
          </div>
        </section>

        {/* ========================================================= 4 · KAPSAM */}
        <section id={C.scope.id} className="sec-pad" style={{ background: "var(--white)" }}>
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

            {/* SÜREÇ — beş aşama, sıralı. Ayrıntı kapalı geliyor. */}
            <div className="svm-rail svm-rail-wide">
              {C.scope.phases.map((p, i) => (
                <FadeUp key={p.title} className="svm-step" delay={0.1 + i * 0.05}>
                  <span className="svm-step-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="svm-step-b">
                    <h3>{p.title}</h3>
                    <p>{p.line}</p>
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

            {/* ÇIKTI — süreçten ayrı bir soru: "her ay elime ne geçiyor".
                Tek listede birleştirildiğinde ikisi de bulanıklaşıyordu:
                "banka mutabakatı" bir iş adımı, "nakit akış raporu" bir
                teslim. Ayrı duruyorlar. */}
            <FadeUp delay={0.18}>
              <h3 className="svm-sub">{C.scope.outputsTitle}</h3>
            </FadeUp>
            <div className="svm-out">
              {C.scope.outputs.map((o, i) => {
                const Icon = ICON[o.icon];
                return (
                  <FadeUp key={o.title} delay={0.12 + i * 0.04}>
                    <div className="svm-out-card">
                      <span className="svm-out-ic" aria-hidden="true">
                        <Icon size={17} strokeWidth={2} />
                      </span>
                      <b>{o.title}</b>
                      <span>{o.line}</span>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======================================================= 5 · SINIRLAR */}
        <section id={C.limits.id} className="sec-pad" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.limits.heading}
                accent={C.limits.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.limits.lead}</p>
              </FadeUp>
            </div>

            {/* Bu bölüm <details> KULLANMIYOR ve kullanmayacak. "Özet önde,
                detay talep üzerine" ilkesi bilgiyi saklamak için değil sırayı
                düzenlemek için; sınırı tıklanmadan görünmez yapmak firmanın
                duruşuna aykırı olurdu. */}
            <div className="svm-limits">
              {C.limits.items.map((l, i) => (
                <FadeUp key={l.title} delay={0.1 + i * 0.05}>
                  <div className="svm-limit">
                    <span className="svm-limit-ic" aria-hidden="true">
                      <TriangleAlert size={15} strokeWidth={2.1} />
                    </span>
                    <div>
                      <h3>{l.title}</h3>
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
                <p className="svm-note">
                  Teklifte hariç kalem olarak yazılanlar: {ACC_EXCLUDES.join(" · ")}.
                </p>
              </FadeUp>
            )}
          </div>
        </section>

        {/* ========================================================== 6 · FİYAT */}
        <section id={C.price.id} className="sec-pad sec-night">
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

            {/* Kalemler ve tutarlar afterSetup.ts'ten okunuyor; bu dosyada tek
                bir rakam yazılı değil. Rozet (INCLUSION_LABEL) hangi kalemin
                herkeste doğduğunu söylüyor — belgenin en çok vurguladığı ayrım
                bu ve veri seviyesinde duruyor, burada yeniden yorumlanmıyor. */}
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

                    <p className="svm-price-l">{it.line}</p>

                    {it.scope && it.scope.length > 0 && (
                      <details className="svm-more svm-more-dark">
                        <summary>
                          Bu kaleme ne dahil?
                          <span className="svm-more-x" aria-hidden="true" />
                        </summary>
                        <ul>
                          {it.scope.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
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

        {/* ========================================================== 7 · ORTAC */}
        <section id={C.ortac.id} className="sec-pad" style={{ background: "var(--white)" }}>
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

              {/* Alıntı Murat Ortaç'ın basına verdiği cümle ve Dubai'yi
                  anlatıyor, muhasebeyi değil. Altındaki satır onu sayfanın
                  konusuna bağlıyor; yoksa alıntı süs olarak kalırdı. */}
              <FadeUp delay={0.16}>
                <figure className="svm-quote">
                  <blockquote>{C.ortac.quote.text}</blockquote>
                  <figcaption>
                    <b>{C.ortac.quote.who}</b>
                    <span>{C.ortac.quote.role}</span>
                  </figcaption>
                  <p>{C.ortac.quoteTail}</p>
                </figure>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ============================================================ 8 · SSS */}
        <section id={C.faq.id} className="sec-pad" style={{ background: "var(--paper)" }}>
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
          </div>
        </section>

        {/* ========================================================== 9 · SONRA */}
        <section id={C.close.id} className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.close.heading}
                accent={C.close.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.close.lead}</p>
              </FadeUp>
            </div>

            {/* SmartLink: kardeş hizmet sayfaları şu an dolaşıma kapalı ve
                sönük çıkıyorlar. Ölü tıklama olmuyor, yol haritası görünür
                kalıyor; sayfalar açıldığında hiçbir şeye dokunmadan
                canlanacaklar (lib/routes.ts). */}
            <div className="svm-links">
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
