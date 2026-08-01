import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  ChartColumn,
  Check,
  FileStack,
  Landmark,
  MapPin,
  Receipt,
  Stamp,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import FinalCta from "@/components/FinalCta";

import {
  ACC_EXCLUDES,
  ACC_PANEL,
  ACC_PRICE_FOOTNOTE,
  ACC_TAX_NOTE,
  ACC_TAX_ROWS,
  ACCOUNTING_DUBAI as C,
  accountingItems,
  frequencyLabel,
  yearLanes,
  type AccIcon,
} from "@/lib/accountingDubai";
import { INCLUSION_LABEL, RHYTHM_LABEL } from "@/lib/afterSetup";

/* ============================================================================
   DUBAİ MUHASEBE HİZMETİ — /dubai/muhasebe

   ---------------------------------------------------------------------------
   BU TURUN İŞİ: "ANLATMICAZ, GÖSTERİCEZ"

   Müşterinin cümlesi: "hukuk makalesi okur gibi bir sürü yazı okumasını
   istemiyorum." Bir önceki tur bölüm sayısını dokuzdan altıya indirmişti ama
   metnin BİÇİMİ paragraf olarak kalmıştı. Ölçüm (Chrome, sayfadaki bütün
   açılırlar KAPALI — yani sayfayı ilk açanın taraması gereken metin):

                        ÖNCE     SONRA
     yükseklik 1440px   8.657    7.127 px   (−%18)
     yükseklik  375px  11.831    9.817 px   (−%17)
     görünür metin      8.444    5.445 kr   (−%36)
     TOPLAM metin      13.335   12.594 kr   (−%6 · içerik yerinde duruyor)
     <p>                   66       53
     açılır kalem          22       29
     ikon / kutu           36       84      (46 ikon + 38 takvim kutusu)
     <li>                  16       38

   Görünür metin %36 düşerken toplam metnin yalnızca %6 düşmesi bu turun
   tanımı: metin silinmedi, açılır bölümlere indi.

   Değişen şey içerik değil, içeriğin biçimi. Aynı bilgi duruyor — bir iddia,
   bir oran, bir tutar, bir süre silinmedi — ama artık cümle olarak değil YAPI
   olarak duruyor:

     · dört cevap cümlesi (≈420 kr) → dört künye satırı (≈140 kr)
     · beş aşamalık süreç metni     → beş açılır satır, yüzeyde yalnızca başlık
     · altı çıktı kartı             → TAKAS PANELİ: sizden gelen → size dönen
     · beş sınır paragrafı (≈900kr) → beş "×" satırı, gerekçe tıklamada
     · 520px'lik SVG takvim         → 12 sütunlu CSS ızgarası, telefonda tam
     · altı fiyat kartı             → altı satırlık fiyat listesi
     · kapanış paragrafı            → üç adımlı "nasıl başlanıyor" şeridi

   ---------------------------------------------------------------------------
   NE GİZLENMEZ — bu turun tek sert kuralı

   Bir rakamı, bir oranı veya bir iddiayı NİTELEYEN şerh <details> arkasına
   konmuyor. Açık kalanlar: fiyat satırındaki "başlangıç" sıfatı ve "+ KDV",
   kalem notları, vergi satırlarının altındaki "otomatik muafiyet yok", sınır
   başlıklarının kendisi, ACC_TAX_NOTE ve "toplam yok" satırı.

   Tıklamanın arkasına giden şey yalnızca AÇIKLAMA — nitelik değil, ayrıntı.

   ---------------------------------------------------------------------------
   BÖLÜMLER (altı, hepsi eski id'siyle)

     1 · #ozet               → dört künye satırı        (açılış)
     2 · #ortac-perspektifi  → KİM                      (destek)
     3 · #kapsam             → NE                       (ANA BÖLÜM)
          ├─ süreç · beş açılır satır
          ├─ takas · sizden gelen → size dönen
          └─ #sinirlar · beş "×" satırı
     4 · #takvim             → NE ZAMAN                 (destek)
          ├─ #neden · kuruluşta açılan üç kayıt
          ├─ 12 aylık şerit
          └─ #vergi-cercevesi
     5 · #fiyat              → NE KADAR                 (tek koyu bölüm)
     6 · #sss                → kalan sorular
          ├─ #sonra · ilgili sayfalar
          └─ nasıl başlanıyor · üç adım

   ---------------------------------------------------------------------------
   TAKVİM ŞERİDİ ARTIK BU DOSYADA ÇİZİLİYOR

   Eski hâli components/services/AccountingScenes.tsx içinde bir SVG'ydi
   (YearRhythmScene). Silinme sebebi tasarım değil MOBİL: çizim 520 pikselin
   altında okunmadığı için kendi kabında yatay kayıyordu, yani telefondaki
   ziyaretçinin keşfetmesi gereken gizli bir kaydırma vardı. Sayfanın en
   önemli görselinin bulunması bir keşfe bağlı olamaz.

   Yerine 12 sütunlu bir CSS ızgarası: 375 pikselde de tam görünüyor, sunucuda
   basılıyor (JavaScript yok) ve dolu kutular yine afterSetup.ts'ten geliyor
   (yearLanes). Dolu kutu "bu ayda iş var", boş kutu "bu ayda o kalem
   doğmuyor" — kutuların anlamı lejantta GÖSTERİLİYOR, yazılmıyor.

   AccountingScenes.tsx artık hiçbir sayfa tarafından kullanılmıyor. Bu turda
   dosyaya dokunulmadı (kapsam dışı); dosya ve CSS'teki .svmv- bloğu birlikte
   silinebilir.

   ---------------------------------------------------------------------------
   ROTA: NEDEN BU DOSYA DİNAMİK ROTAYI YENİYOR

   /dubai/[hizmet] dinamik rotası zaten var ve dört hizmeti tek bir şablondan
   basıyor. App Router'da STATİK SEGMENT DİNAMİĞİ YENER: bu dosya var olduğu
   sürece /dubai/muhasebe buraya düşüyor, diğer üç hizmet dinamik rotadan
   çalışmaya devam ediyor.

   Bunun bir sonucu var ve bilerek kabul edildi: dinamik şablon muhasebe için
   services.ts'ten "aylık 175 USD" basıyordu (PRICING.dubai.annual / 12), bu
   sayfa ise müşterinin imzalı hizmet belgesindeki 350 USD'yi basıyor. Çelişki
   yeni değil (bkz. lib/accountingDubai.ts · SWAP:ACC_PRICING ve
   lib/afterSetup.ts · SWAP:AFTER_PRICING). pricing.ts'e dokunulmadı: hangi
   rakamın geçerli olduğu müşterinin kararı.

   ---------------------------------------------------------------------------
   BU DOSYADA TEK BİR CÜMLE YOK

   Ekranda görünen her kelime lib/accountingDubai.ts'te; rakamlar da oradan
   değil, onun okuduğu kaynaklardan (afterSetup.ts, countryContent.ts,
   services.ts) geliyor. Şablon yalnızca diziyor.

   ---------------------------------------------------------------------------
   SEO — metin AZALMADI, YER DEĞİŞTİRDİ

   Müşteri "opacity ile gizli metin gömeriz" dedi; yapılmadı. Kapalı <details>
   içeriği Google tarafından normal biçimde indeksleniyor ve gizleme sayılmaz;
   opaklığı sıfırlanmış metin ise Google'ın spam politikalarında adı geçen bir
   teknik. Yani doğru çözüm zaten müşterinin istediği görsel sonucu veriyor.

   Bozulmadan duranlar: tek h1 (PageHero), bölüm başına bir h2, blok başına
   bir h3, bütün id'ler ve üç düğümlü JSON-LD (BreadcrumbList, Service,
   FAQPage). Hiçbirinde sayfada yazmayan bir şey yok.
   ========================================================================= */

/* Kanonik adres mutlak: layout.tsx'te metadataBase yok, göreli bir kanonik
   geliştirme sunucusunun adresine çözülürdü. */
const SITE = "https://ortacglobal.com";
const PAGE_URL = `${SITE}/dubai/muhasebe`;

export const generateMetadata = (): Metadata => ({
  title: C.seo.title,
  description: C.seo.description,
  alternates: { canonical: PAGE_URL },
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
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

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
           özenle kurulan koşulluluğu düz bir rakama indirgerdi. */
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

            Dört soru, dört karşılık, dört bağlantı — ve sıraları aşağıdaki
            bölümlerin sırasıyla aynı.

            KART DEĞİL KÜNYE: eski hâlde her kart tam bir cümle taşıyordu ve
            dördü birden sayfanın başında ikinci bir metin duvarı kuruyordu.
            Şimdi etiket + üç-dört kelime. Cevabın kendisi zaten bağlantının
            indiği bölümde. */}
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
            </div>

            {/* Düz <a>: hedef aynı sayfada, SmartLink rota bileşeni. */}
            <div className="svm-answers">
              {C.summary.answers.map((a, i) => {
                const Icon = ICON[a.icon];
                return (
                  <FadeUp key={a.k} delay={0.06 + i * 0.05}>
                    <a href={`#${a.to}`} className="svm-answer">
                      <span className="svm-answer-ic" aria-hidden="true">
                        <Icon size={16} strokeWidth={2.1} />
                      </span>
                      <span className="svm-answer-k">{a.k}</span>
                      <b className="svm-answer-v">{a.v}</b>
                      <ArrowRight
                        className="svm-answer-go"
                        size={15}
                        strokeWidth={2.1}
                        aria-hidden="true"
                      />
                    </a>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ 2 · KİM

            Dört başlık yüzeyde, dört açıklama tek açılır blokta. Dört ayrı
            <details> koymak yerine tek blok: ziyaretçi ya dördünü birden
            merak eder ya hiçbirini. */}
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
            </div>

            <div className="svm-two svm-two-even">
              <div>
                <div className="svm-facts">
                  {C.ortac.facts.map((f, i) => {
                    const Icon = ICON[f.icon];
                    return (
                      <FadeUp key={f.title} delay={0.06 + i * 0.05}>
                        <div className="svm-fact">
                          <span className="svm-fact-ic" aria-hidden="true">
                            <Icon size={16} strokeWidth={2.1} />
                          </span>
                          <b>{f.title}</b>
                        </div>
                      </FadeUp>
                    );
                  })}
                </div>

                <FadeUp delay={0.26}>
                  <details className="svm-more svm-drop">
                    <summary>
                      {C.ortac.factsTitle}
                      <span className="svm-more-x" aria-hidden="true" />
                    </summary>
                    <ul>
                      {C.ortac.facts.map((f) => (
                        <li key={f.title}>
                          <b>{f.title}</b> — {f.line}
                        </li>
                      ))}
                    </ul>
                  </details>
                </FadeUp>

                {ACC_PANEL && (
                  <FadeUp delay={0.3}>
                    {/* Panelin adı brand.ts'ten okunuyor, ikinci kez
                        yazılmıyor: ortaklık listesi değişirse burası da
                        değişsin. */}
                    <p className="svm-note svm-note-top">Müşteri paneli: {ACC_PANEL}.</p>
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

            Üç katman, üç ayrı görsel biçim. Aynı biçimde çizilselerdi
            ziyaretçi aralarındaki farkı okumak zorunda kalırdı:

              · süreç  → numaralı ray, açılır satırlar
              · takas  → iki sütun ve bir ok
              · sınır  → çarpı işaretli satırlar */}
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

            {/* SÜREÇ — native <details>: JavaScript yok, klavye ve ekran
                okuyucu davranışı tarayıcıdan geliyor, bölüm sunucu tarafında
                kalabiliyor. Sayfadaki bütün açılır kalemler aynı kalıbı
                kullanıyor — ziyaretçi tek bir açma hareketi öğreniyor.

                Yüzeyde yalnızca başlık var ve bu bilgi kaybı değil: beş başlık
                üst üste okunduğunda süreç zaten okunuyor. */}
            <div className="svm-flow">
              {C.scope.phases.map((p, i) => (
                <FadeUp key={p.title} delay={0.06 + i * 0.04}>
                  <details className="svm-more svm-fstep">
                    <summary>
                      <span className="svm-fstep-n" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <b>{p.title}</b>
                      <span className="svm-more-x" aria-hidden="true" />
                    </summary>
                    <div className="svm-fstep-d">
                      <p>{p.line}</p>
                      <p>{p.detail}</p>
                    </div>
                  </details>
                </FadeUp>
              ))}
            </div>

            {/* TAKAS — sayfanın en görsel parçası ve iki soruyu birden
                kapatıyor: "benden ne isteniyor" ve "karşılığında ne alıyorum".
                İkisi de eskiden metnin içine gömülüydü.

                Ok tek yönlü ve bu kasıtlı: bu bir iş birliği değil bir devir.
                Belge sizde, defter bizde, çıktı yine sizde. */}
            {/* Panelin kendi girişi yok ve olmayacak: iki sütun başlığı
                ("Sizden gelen" / "Size dönen") zaten girişin söyleyeceği her
                şeyi söylüyor. Bir cümle eklemek göstermek yerine anlatmak
                olurdu. */}
            <FadeUp delay={0.1}>
              <h3 className="svm-sub">{C.exchange.title}</h3>
            </FadeUp>

            <FadeUp delay={0.14} className="svm-blockgap">
              <div className="svm-swap">
                <div className="svm-swap-col">
                  <span className="svm-swap-k">{C.exchange.youTitle}</span>
                  <ul>
                    {C.exchange.you.map((y) => {
                      const Icon = ICON[y.icon];
                      return (
                        <li key={y.label}>
                          <span className="svm-swap-ic" aria-hidden="true">
                            <Icon size={15} strokeWidth={2} />
                          </span>
                          {y.label}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Ok masaüstünde yatay, telefonda dikey (CSS döndürüyor):
                    sütunlar alt alta düştüğünde sağa bakan bir ok yanlış yeri
                    gösterirdi. */}
                <div className="svm-swap-arrow" aria-hidden="true">
                  <ArrowRight size={18} strokeWidth={2.2} />
                </div>

                <div className="svm-swap-col svm-swap-out">
                  <span className="svm-swap-k">{C.exchange.usTitle}</span>
                  <ul>
                    {C.exchange.outputs.map((o) => {
                      const Icon = ICON[o.icon];
                      return (
                        <li key={o.title}>
                          <span className="svm-swap-ic" aria-hidden="true">
                            <Icon size={15} strokeWidth={2} />
                          </span>
                          {o.title}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.22}>
              <details className="svm-more svm-drop">
                <summary>
                  {C.exchange.outputsTitle}
                  <span className="svm-more-x" aria-hidden="true" />
                </summary>
                <ul>
                  {C.exchange.outputs.map((o) => (
                    <li key={o.title}>
                      <b>{o.title}</b> — {o.line}
                    </li>
                  ))}
                </ul>
              </details>
            </FadeUp>

            {/* SINIRLAR — sınırın KENDİSİ açık, gerekçesi tıklamada. Bu ayrım
                bir tasarım tercihi değil duruş: "özet önde, detay talep
                üzerine" ilkesi sırayı düzenlemek için var, sınırı görünmez
                yapmak için değil. Eskiden beş gerekçe de açıktaydı ve tek
                başına 900 karakter tutuyordu — ziyaretçi beş sınırı görmek
                için beş paragraf okuyordu. */}
            <FadeUp delay={0.1}>
              <h3 id={C.limits.id} className="svm-sub">
                {C.limits.title}
              </h3>
            </FadeUp>
            <FadeUp delay={0.14}>
              <p className="svm-sub-lead">{C.limits.lead}</p>
            </FadeUp>

            <div className="svm-limits svm-blockgap">
              {C.limits.items.map((l, i) => (
                <FadeUp key={l.title} delay={0.06 + i * 0.04}>
                  <details className="svm-more svm-limit">
                    <summary>
                      <span className="svm-limit-ic" aria-hidden="true">
                        <X size={14} strokeWidth={2.6} />
                      </span>
                      <b>{l.title}</b>
                      <span className="svm-more-x" aria-hidden="true" />
                    </summary>
                    <p>{l.line}</p>
                  </details>
                </FadeUp>
              ))}
            </div>

            {/* services.ts'teki hariç listesi — aynı bilginin teklifte hangi
                sözcüklerle geçtiği. Rozet biçiminde: iki liste birbirini
                doğruluyor, tekrar etmiyor. */}
            {ACC_EXCLUDES.length > 0 && (
              <FadeUp delay={0.26}>
                <p className="svm-note svm-note-top">
                  Teklifte hariç kalem olarak yazılanlar:{" "}
                  {ACC_EXCLUDES.map((e) => (
                    <span className="svm-tag" key={e}>
                      {e}
                    </span>
                  ))}
                </p>
              </FadeUp>
            )}
          </div>
        </section>

        {/* ======================================================= 4 · TAKVİM

            "Ne zaman" sorusunun tamamı tek bölümde: kuruluşta ne açılıyor
            (#neden), yıl içinde ne tekrar ediyor (şerit) ve bunların dayandığı
            çerçeve (#vergi-cercevesi). */}
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

            <FadeUp delay={0.06}>
              <h3 id={C.why.id} className="svm-sub svm-sub-first">
                {C.why.title}
              </h3>
            </FadeUp>
            <div className="svm-opens svm-blockgap">
              {C.why.points.map((p, i) => (
                <FadeUp key={p.title} delay={0.08 + i * 0.05}>
                  <details className="svm-more svm-open">
                    <summary>
                      <span className="svm-open-n" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <b>{p.title}</b>
                      <span className="svm-more-x" aria-hidden="true" />
                    </summary>
                    <p>{p.line}</p>
                    {p.more && <p>{p.more}</p>}
                  </details>
                </FadeUp>
              ))}
            </div>

            {/* ŞERİT — sayfanın ana görseli. Dolu kutu "bu ayda iş var", boş
                kutu "bu ayda o kalem doğmuyor"; hangi ayın dolu olduğu
                afterSetup.ts'ten geliyor (yearLanes), sıklık etiketi de
                kutuların kendisinden sayılıyor. Yani şerit süs değil veri:
                kalemin sıklığı değişirse şerit de değişiyor.

                Izgara 12 eşit sütun. SVG'nin aksine 375 pikselde de tam
                görünüyor — gizli yatay kaydırma yok. */}
            <FadeUp delay={0.1}>
              <h3 className="svm-sub">{C.calendar.stripTitle}</h3>
            </FadeUp>

            <FadeUp delay={0.14} className="svm-blockgap">
              <div className="svm-cal">
                {/* Ay başlıkları aria-hidden: altındaki her şerit kendi
                    aylarını zaten sözle söylüyor, sayı dizisini ekran
                    okuyucuya iki kez okutmanın anlamı yok. */}
                <div className="svm-cal-row svm-cal-months" aria-hidden="true">
                  <span className="svm-cal-lbl">
                    <b>ay</b>
                  </span>
                  <div className="svm-cal-cells">
                    {MONTHS.map((m) => (
                      <span className="svm-cal-m" key={m}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {lanes.map((lane) => {
                  const on = new Set(lane.months);
                  return (
                    <div className="svm-cal-row" key={lane.id}>
                      <span className="svm-cal-lbl">
                        <b>{lane.label}</b>
                        <i>{frequencyLabel(lane.months.length)}</i>
                      </span>
                      {/* Kutu dizisi tek bir resim gibi okunuyor: on iki ayrı
                          düğüm yerine tek bir etiket. */}
                      <div
                        className="svm-cal-cells"
                        role="img"
                        aria-label={`${lane.label}: ${frequencyLabel(
                          lane.months.length,
                        )} — ${lane.months.join(", ")}. aylar.`}
                      >
                        {MONTHS.map((m) => (
                          <span
                            className="svm-cal-c"
                            data-on={on.has(m) ? "1" : "0"}
                            key={m}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeUp>

            {/* Lejant — kutunun ne demek olduğunu yazıyla anlatmak yerine
                kutunun kendisini gösteriyor. */}
            <FadeUp delay={0.18}>
              <p className="svm-legend">
                <span className="svm-legend-i">
                  <i className="svm-cal-c" data-on="1" aria-hidden="true" />
                  {C.calendar.legendOn}
                </span>
                <span className="svm-legend-i">
                  <i className="svm-cal-c" data-on="0" aria-hidden="true" />
                  {C.calendar.legendOff}
                </span>
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="svm-note svm-note-top">{C.calendar.caption}</p>
            </FadeUp>

            {/* Şeridin kelimeye çevrilmiş hâli — aynı veriden (yearLanes),
                yani şerit ile metin ayrı düşemiyor. */}
            <FadeUp delay={0.22}>
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

            {/* VERGİ ÇERÇEVESİ — satırlar countryContent.ts'ten.

                ŞERHLER AÇIKTA: "otomatik muafiyet yok" gibi notlar üstündeki
                değeri niteliyor. <details> arkasına konsa sayfa "%0"
                ifadesini çıplak basmış olurdu. */}
            <FadeUp delay={0.1}>
              <h3 id={C.taxFrame.id} className="svm-sub">
                {C.taxFrame.title}
              </h3>
            </FadeUp>
            <FadeUp delay={0.14}>
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

        {/* ======================================================== 5 · FİYAT

            Sayfanın TEK koyu bölümü; koyuluk dekor değil işaret: para burada.

            ALTI KART DEĞİL ALTI SATIR. Kart düzeni her kalemi eşit ağırlıkta
            bir nesne yapıyordu ve tutar kartın içinde kayboluyordu. Listede
            göz tek sütunda aşağı iniyor ve tutarlar alt alta hizalı duruyor —
            fiyat listesi zaten böyle okunur.

            AÇIK KALANLARIN HEPSİ TUTARI NİTELİYOR: rozet (herkeste doğuyor
            mu), ritim, tutar, "başlangıç" sıfatı ve kalemin kendi notu.
            Tıklamanın arkasında yalnızca kalemin ne olduğu ve kapsamı var. */}
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

            <div className="svm-plist">
              {items.map((it, i) => (
                <FadeUp key={it.id} delay={0.06 + i * 0.04}>
                  <details className="svm-more svm-more-dark svm-prow" data-inc={it.inclusion}>
                    <summary>
                      <span className="svm-prow-t">
                        <b>{it.title}</b>
                        <span className="svm-prow-tags">
                          <em className="svm-badge">{INCLUSION_LABEL[it.inclusion].short}</em>
                          <em className="svm-rhythm">{RHYTHM_LABEL[it.rhythm]}</em>
                        </span>
                      </span>
                      <span className="svm-prow-v data">
                        {priceText(it.price)}
                        <i>{it.price.unit}</i>
                      </span>
                      <span className="svm-more-x" aria-hidden="true" />
                    </summary>

                    <div className="svm-prow-d">
                      {it.en && <p className="svm-prow-en">{it.en}</p>}
                      {it.line && <p>{it.line}</p>}
                      {it.scope && it.scope.length > 0 && (
                        <ul>
                          {it.scope.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </details>
                </FadeUp>
              ))}
            </div>

            {/* Kalem notları listenin ALTINDA değil, kalemin yanında dursun
                istenirdi ama <summary> içine üçüncü bir satır girince satır
                yüksekliği iki katına çıkıyor ve liste liste olmaktan çıkıyor.
                Bu yüzden notlar kendi bloklarında, kalemin adıyla birlikte:
                hangi tutarı nitelediği kayboluyor değil, yanına yazılıyor. */}
            {items.some((it) => it.note) && (
              <FadeUp delay={0.3}>
                <ul className="svm-pnotes">
                  {items
                    .filter((it) => it.note)
                    .map((it) => (
                      <li key={it.id}>
                        <b>{it.title}</b> — {it.note}
                      </li>
                    ))}
                </ul>
              </FadeUp>
            )}

            <FadeUp delay={0.34}>
              <div className="svm-price-foot">
                <p>{C.price.noTotal}</p>
                {/* Özet satırı tutarın iki niteliğini kapalıyken de basıyor
                    (USD, KDV hariç); tamamı tek tıkla açılıyor. */}
                <details className="svm-more svm-more-dark">
                  <summary>
                    {C.price.termsTitle}
                    <span className="svm-more-x" aria-hidden="true" />
                  </summary>
                  <p>{ACC_PRICE_FOOTNOTE}</p>
                </details>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ================================================ 6 · SSS + KAPANIŞ

            Altı soru kapalı <details> içinde: ekranda yalnızca soru satırı
            kadar yer tutuyorlar, buna karşılık her biri ayrı bir arama
            sorgusunun karşılığı ve FAQPage işaretlemesini besliyor.

            Kapanış iki blok: nereye gidilir (#sonra) ve nasıl başlanır. */}
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
            </div>

            <div className="svm-faq">
              {C.faq.items.map((f, i) => (
                <FadeUp key={f.q} delay={0.06 + i * 0.03}>
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

            {/* SmartLink: kardeş hizmet sayfaları şu an dolaşıma kapalı ve
                sönük çıkıyorlar. Ölü tıklama olmuyor, yol haritası görünür
                kalıyor; sayfalar açıldığında hiçbir şeye dokunmadan
                canlanacaklar (lib/routes.ts). */}
            <FadeUp delay={0.1}>
              <h3 id={C.close.id} className="svm-sub">
                {C.close.title}
              </h3>
            </FadeUp>
            <div className="svm-links svm-blockgap">
              {C.close.links.map((l, i) => (
                <FadeUp key={l.href} delay={0.06 + i * 0.04}>
                  <SmartLink href={l.href} className="svm-link">
                    <b>{l.label}</b>
                    <span>{l.line}</span>
                    <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                  </SmartLink>
                </FadeUp>
              ))}
            </div>

            {/* NASIL BAŞLANIYOR — kapanış artık bir paragraf değil üç adım.
                Ziyaretçinin son sorusu "peki ne yapmam gerekiyor" ve cevabı
                eskiden kutunun içinde tek cümleydi.

                Üçüncü adımda süre yok ve olmayacak: firma kesin süre taahhüdü
                vermiyor (brand.ts · STANCE_LIMITS). */}
            <FadeUp delay={0.1}>
              <h3 className="svm-sub">{C.start.title}</h3>
            </FadeUp>

            <div className="svm-start svm-blockgap">
              {C.start.steps.map((s, i) => (
                <FadeUp key={s.title} delay={0.08 + i * 0.05}>
                  <div className="svm-start-s">
                    <span className="svm-start-n" aria-hidden="true">
                      <Check size={14} strokeWidth={2.6} />
                    </span>
                    <b>{s.title}</b>
                    <span>{s.line}</span>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.26}>
              <div className="svm-close">
                <AskCta label={C.start.askLabel} />
              </div>
            </FadeUp>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
