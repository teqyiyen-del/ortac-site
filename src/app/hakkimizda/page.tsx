import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  Boxes,
  ChartCandlestick,
  Code2,
  Handshake,
  History,
  Languages,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  Stamp,
  Stethoscope,
  TriangleAlert,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Nav from "@/components/Nav";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import { BrandChip } from "@/components/shared/BrandMark";
import { Flag } from "@/components/shared/CountryPicker";
import { brandKeyForName } from "@/lib/brands";
import { CHAIN, COUNTRY_NAME, PARTNERS, STANCE_LIMITS, type CountrySlug } from "@/lib/brand";
import { sectorHref } from "@/lib/sectors";
import {
  BASIS,
  CONTACT,
  FOR_WHOM,
  HERO,
  HOW,
  IDENTITY,
  QUOTE,
  SEO,
  WHERE,
  structureOf,
  type AboutIcon,
  type ContactKind,
} from "@/lib/about";

/* ============================================================================
   HAKKIMIZDA — /hakkimizda

   Bu dosyada tek bir cümle yok. Sayfada görünen her kelime lib/about.ts'te ya
   da lib/brand.ts'te duruyor; şablon yalnızca onu diziyor. Sebebi onaydan
   geliyor: firma hakkındaki iddiaları müşteri ve muhasebeci tek dosyadan
   okuyup onaylayabilsin, kimse doğrulama yapmak için React okumak zorunda
   kalmasın.

   ------------------------------------------------------------------- AKIŞ
   Sayfa bir kurumsal broşür değil, bir kayıt zinciri. Sıra bilerek şu:

     1  kim olduğumuz        künye — isim, tüzel kişilik, yönetici ortak
     2  nerede çalışıyoruz   üç yargı bölgesi + sahne
     3  (alıntı)             Murat Ortaç, basına verdiği cümle
     4  neye dayanarak       lisans, resmî iş ortaklıkları, ofis, geçmiş
     5  nasıl çalışıyoruz    uçtan uca zincir, taşeron yok, tek muhatap, panel
                             + neyi TAAHHÜT ETMEDİĞİMİZ
     6  kimler için          altı sektör
     7  temas                tek çıkış

   Okuyucu "kimsiniz → neredesiniz → neye dayanıyorsunuz → nasıl
   çalışıyorsunuz" sırasıyla iniyor. Ters sıra (önce vaat, sonra dayanak)
   klasik broşür sırası ve bu sayfanın kaçındığı şey tam olarak o.

   -------------------------------------------------------------- ZEMİN RİTMİ
   beyaz(künye) → gece(üç ülke) → gri(alıntı) → beyaz(dayanak) → gece(nasıl)
   → beyaz(sektörler) → gri(temas). İki bölüm hiçbir yerde aynı zeminle
   arka arkaya gelmiyor; bölüm sınırı için ayrı bir çizgiye gerek kalmıyor.

   ------------------------------------------------------- SUNUCU BİLEŞENİ
   Sayfa "use client" DEĞİL ve öyle kalması gerekiyor: generateMetadata ve
   JSON-LD sunucu tarafında üretiliyor. Bunun görselde bir sonucu var —
   aşağıdaki küre sahnesi motion/react değil, saf SVG + CSS. Hareketin
   tamamı (zincirde ilerleyen çizgi, Dubai işaretinin nabzı) CSS keyframe;
   prefers-reduced-motion hem globals.css'teki genel kuralla hem
   hakkimizda.css'teki kendi bloğuyla kapatıyor. Sayfaya giriş
   animasyonlarını taşıyan FadeUp / SplitWords zaten istemci bileşeni ve
   MotionConfig reducedMotion="user" altında çalışıyorlar (Providers.tsx),
   yani onlar da azaltılmış harekete uyuyor.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const PATH = "/hakkimizda";

/* about.ts ikonu string taşıyor (bkz. oradaki gerekçe: dosya React'ten
   bağımsız kalsın). Metin ile görselin buluştuğu tek yer burası. */
const ICONS: Record<AboutIcon, LucideIcon> = {
  stamp: Stamp,
  handshake: Handshake,
  office: Building2,
  history: History,
  team: UsersRound,
  language: Languages,
  panel: LayoutDashboard,
};

const CONTACT_ICONS: Record<ContactKind, LucideIcon> = {
  phone: Phone,
  mail: Mail,
  address: MapPin,
};

/* Sektör ikonları ana sayfadaki kartlarla AYNI: aynı sektörün iki sayfada iki
   farklı glifle çıkması, ziyaretçinin kurduğu görsel eşlemeyi bozuyor. */
const SECTOR_ICONS: Record<string, LucideIcon> = {
  "e-ticaret": Boxes,
  "yazilim-ve-teknoloji": Code2,
  danismanlik: UserRound,
  gayrimenkul: Building2,
  "finans-ve-yatirim": ChartCandlestick,
  "saglik-ve-medikal": Stethoscope,
};

export function generateMetadata(): Metadata {
  /* Kanonik mutlak yazılıyor: layout.tsx'te metadataBase tanımlı değil ve
     göreli bir kanonik geliştirme sunucusunun adresine çözülürdü. */
  return {
    title: SEO.title,
    description: SEO.description,
    alternates: { canonical: `${SITE}${PATH}` },
    openGraph: {
      type: "profile",
      locale: "tr_TR",
      siteName: "Ortac Global",
      url: `${SITE}${PATH}`,
      title: SEO.title,
      description: SEO.description,
    },
  };
}

/* ============================================================================
   SAHNE — üç yargı bölgesi

   Fikir Authority.tsx'teki tel kafes küreden öğrenildi ama sahne yeniden
   kuruldu ve üç yerde bilerek ondan ayrılıyor:

   1) O küre AÇIK zeminde, mavi dolgulu ve alttan kırpık — ufuktan yükselen bir
      gezegen. Bu küre KOYU zeminde, tam ve kırpıksız, hafifçe eğik. Aynı
      fikrin iki farklı okunuşu; yan yana geldiklerinde tekrar değil ritim
      kuruyorlar.

   2) Oradaki üç işaret birbirinden bağımsız pin. Buradakiler tek bir ÇİZGİYLE
      bağlı ve bu sayfanın bütün tezi o çizgi: üç ayrı ülke değil, üç ülkeden
      geçen tek zincir. Çizgi üzerinde yavaşça ilerleyen kısa bir parça var —
      zincirin durmadığını söylemenin en ucuz yolu.

   3) Orada hareketi motion/react taşıyor. Burada sayfa sunucu bileşeni
      olduğu için hareket CSS; reduce bloğu hakkimizda.css'te.

   -------------------------------------------------------------- GEOMETRİ
   Kare olmayan bir kutu (320×300) içinde: merkez (152,148), yarıçap 94.
   Enlemler düz çizgi değil basık elips — düz çizgi çizilirse disk küre değil
   madeni para gibi okunuyor. Her enlemin rx'i kürenin o yükseklikteki gerçek
   kirişi (Pisagor), ry'si o kirişin sabit oranı; böylece hiçbir elips diskin
   dışına taşmıyor. Bütün tel kafes merkez etrafında 14° döndürülüyor:
   eksen eğikliği küreyi "ikon" olmaktan çıkarıp cisim yapan tek detay.

   İŞARET KOORDİNATLARI ENLEM-BOYLAM DEĞİL ve bu bilinçli bir sınır. Küre
   üzerinde kıta yok; gerçek koordinat vermek, görselin taşımadığı bir
   coğrafi hassasiyet iddia etmek olurdu. Üstelik üç ülke gerçek
   koordinatlarında birbirine öyle yakın düşüyor ki üç etiket üst üste
   biniyor. Dizilim yine de keyfî değil: soldan sağa batıdan doğuya
   (İngiltere → KKTC → Dubai), yani gerçeğe ters düşmüyor. Sahnenin altındaki
   tek satır not da bunu açıkça söylüyor (about.ts · WHERE.sceneNote).
   ========================================================================= */

const BOX_W = 320;
const BOX_H = 300;
const CX = 152;
const CY = 148;
const R = 94;
const TILT = -14;

const LATS = [-62, -32, 0, 32, 62].map((dy) => {
  const rx = Math.sqrt(R * R - dy * dy);
  return { cy: CY + dy, rx, ry: rx * 0.24 };
});
const MERIDIANS = [30, 62];

/* İşaretlerin kürenin İÇİNDE kalması tek kısıt: her noktanın merkeze uzaklığı
   R'den küçük. Üçü de ~62-72 piksel, yani kenardan rahat içeride. */
const NODES: Record<CountrySlug, { x: number; y: number }> = {
  ingiltere: { x: 96, y: 104 },
  kktc: { x: 140, y: 148 },
  dubai: { x: 214, y: 184 },
};

/* Zincir NODES'taki üç noktadan geçiyor. Kontrol noktaları çizgiyi hafifçe
   kürenin yüzeyine doğru bombeleştiriyor — düz iki doğru parçası, üzerinde
   durduğu şeyin küre olduğunu unutturuyordu. */
const CHAIN_PATH = "M 96 104 Q 110 126 140 148 Q 180 170 214 184";

function GlobeScene() {
  return (
    <div className="ab-scene">
      <svg
        className="ab-orb"
        viewBox={`0 0 ${BOX_W} ${BOX_H}`}
        aria-hidden="true"
        focusable="false"
      >
        <circle className="ab-disc" cx={CX} cy={CY} r={R} />

        {/* Tel kafes tek bir grupta döndürülüyor: enlemler ve boylamlar aynı
            eksende eğilmezse küre iki ayrı çizim gibi görünüyor. */}
        <g className="ab-grid" transform={`rotate(${TILT} ${CX} ${CY})`}>
          {LATS.map((l, i) => (
            <ellipse key={`lat-${i}`} cx={CX} cy={l.cy} rx={l.rx} ry={l.ry} />
          ))}
          {MERIDIANS.map((rx) => (
            <ellipse key={`mer-${rx}`} cx={CX} cy={CY} rx={rx} ry={R} />
          ))}
        </g>

        <circle className="ab-rim" cx={CX} cy={CY} r={R} />

        {/* Zincir iki katman: altta sabit gövde, üstte ilerleyen kısa parça.
            pathLength="100" ile uzunluk normalize ediliyor, böylece kesikli
            çizgi hesabı yolun gerçek pikseline bağlı kalmıyor —
            getTotalLength() ölçümüne ihtiyaç yok, CSS tek başına yetiyor. */}
        <path className="ab-chain" d={CHAIN_PATH} pathLength={100} />
        <path className="ab-spark" d={CHAIN_PATH} pathLength={100} />
      </svg>

      {/* Etiketler SVG'nin değil, üstündeki HTML katmanının parçası: gerçek
          bayrak SVG'leri ve gerçek metin akışı burada bedavaya geliyor,
          SVG içinde <text> ile dizmek her ölçüde elle satır kırmak demekti.
          Konum yüzdeyle veriliyor ve yüzdeler yukarıdaki viewBox
          koordinatlarından türetiliyor — sahne büyüyüp küçüldükçe işaretler
          küreden kopmuyor. */}
      {WHERE.countries.map((c) => {
        const n = NODES[c.slug];
        return (
          <span
            key={c.slug}
            className="ab-at"
            style={{ left: `${(n.x / BOX_W) * 100}%`, top: `${(n.y / BOX_H) * 100}%` }}
          >
            <span className="ab-mark" data-hub={c.hub || undefined}>
              <span className="ab-pin">
                <span className="ab-flag">
                  <Flag country={c.slug} />
                </span>
                {/* Nabız yalnızca Dubai'de: kendi ofisimizin olduğu tek yer
                    orası. Üçü birden atsaydı vurgu diye bir şey kalmazdı. */}
                {c.hub && <i className="ab-ping" aria-hidden="true" />}
              </span>
              {COUNTRY_NAME[c.slug]}
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------ ortak parçalar */

/* Marka işareti olan ortak BrandChip ile, olmayan (TaxDome — resmî vektörü
   depoda yok) düz metinle çıkıyor. Renk uydurulmuyor: yanlış bir logo,
   logosuzluktan daha kötü. */
function PartnerRow({ name, role }: { name: string; role: string }) {
  const key = brandKeyForName(name);
  return (
    <li className="ab-prow">
      {key ? <BrandChip brand={key} size={18} /> : <b className="ab-prow-n">{name}</b>}
      <span className="ab-prow-r">{role}</span>
    </li>
  );
}

/* ------------------------------------------------------------------- sayfa */

export default function AboutPage() {
  const identityRows = IDENTITY.rows.filter((r) => r.value);
  const channels = CONTACT.channels.filter((c) => c.value);
  const officialPartners = PARTNERS.filter((p) => p.group === "resmi");
  const infraPartners = PARTNERS.filter((p) => p.group === "altyapi");

  /* JSON-LD — YALNIZCA sayfada zaten yazan, doğrulanmış alanlar.
     Bilerek YOK: foundingDate, numberOfEmployees, address, telephone, email,
     aggregateRating, review. Hiçbirinin doğrulanmış karşılığı elimizde yok ve
     yapısal veride uydurma alan, sayfadaki uydurma cümleden daha ağır bir
     hata: arama motoruna makine tarafından okunabilir bir iddia veriyor.

     @id veriliyor çünkü layout.tsx sitenin her sayfasında asgari bir
     Organization düğümü basıyor; ikisi aynı kurumu anlatıyor ve aynı url'i
     gösteriyor. Bu sayfa o düğümün tam hâli. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: HERO.crumb, item: `${SITE}${PATH}` },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Ortac Global",
        alternateName: "Ortac International Accounting",
        legalName: "Ortac Accounting Services LLC",
        url: SITE,
        description: SEO.description,
        areaServed: [
          { "@type": "Place", name: "Dubai" },
          { "@type": "Place", name: "Birleşik Krallık" },
          { "@type": "Place", name: "KKTC" },
        ],
        knowsAbout: [
          "Şirket kuruluşu",
          "Vergi danışmanlığı",
          "Muhasebe",
          "Denetim",
          "Banka hesabı açılışı",
          "Uyum ve AML",
        ],
        employee: {
          "@type": "Person",
          name: "Murat Ortaç",
          jobTitle: "Managing Partner",
        },
      },
      {
        "@type": "AboutPage",
        name: SEO.title,
        url: `${SITE}${PATH}`,
        about: { "@id": `${SITE}/#organization` },
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

        {/* country VERİLMİYOR: PageHero kompakt başlık bloğunu basıyor. İki
            sütunlu hero tek bir ülkenin sahnesini çiziyor ve bu sayfanın
            iddiası tam tersi — üç ülke eşit. */}
        <PageHero crumb={HERO.crumb} title={HERO.title} accent={HERO.accent} lead={HERO.lead} />

        {/* ================= 1 · KÜNYE =================
            Sayfanın ilk gördüğü şey paragraf değil kayıt. Boş değerli satırlar
            hiç basılmıyor (about.ts'teki SWAP notları) — "Kuruluş yılı: —"
            yazan bir satır, bilginin yokluğunu bilgi gibi gösterirdi. */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={IDENTITY.heading}
                accent={IDENTITY.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{IDENTITY.lead}</p>
              </FadeUp>
            </div>

            <FadeUp delay={0.25} y={18}>
              <div className="ab-id">
                <dl className="ab-id-list">
                  {identityRows.map((r) => (
                    <div className="ab-id-row" key={r.label}>
                      <dt>{r.label}</dt>
                      <dd>{r.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Vizyon ve misyon native <details> içinde: JavaScript yok,
                    klavye ve ekran okuyucu davranışı tarayıcıdan geliyor ve
                    sayfa sunucu bileşeni kalabiliyor. Sitedeki bütün
                    kademelendirmeler aynı kalıbı kullanıyor, ziyaretçi tek bir
                    açma hareketi öğreniyor. */}
                <details className="ab-det">
                  <summary>
                    {IDENTITY.statementLabel}
                    <span className="ab-det-x" aria-hidden="true" />
                  </summary>
                  <div className="ab-det-body">
                    {[IDENTITY.vision, IDENTITY.mission].map((s) => (
                      <p key={s.t}>
                        <b>{s.t}</b>
                        {s.s}
                      </p>
                    ))}
                  </div>
                </details>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ================= 2 · ÜÇ YARGI BÖLGESİ =================
            İki sütun: solda sahne, sağda üç ülke. Sahne solda çünkü Latin
            okuma yönünde önce bağlam sonra ayrıntı geliyor; sağdaki üç satır
            sahnedeki üç işaretin karşılığı ve aynı sırada (batıdan doğuya).
            Mobilde CSS sahneyi başa alıyor. */}
        <section className="sec-pad sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text={WHERE.heading}
                accent={WHERE.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">{WHERE.lead}</p>
              </FadeUp>
            </div>

            <div className="ab-where">
              <FadeUp delay={0.1} className="ab-where-art">
                <GlobeScene />
                <p className="ab-scene-note">{WHERE.sceneNote}</p>
              </FadeUp>

              <div className="ab-where-list">
                {WHERE.countries.map((c, i) => (
                  <FadeUp key={c.slug} delay={0.14 + i * 0.07}>
                    {/* Ülke sayfasına çıkış SmartLink ile: İngiltere ve KKTC
                        şu an dolaşıma kapalı, o yüzden sönük ve tıklanamaz
                        çıkıyorlar. Kart yine de basılıyor — üç ülkeden birini
                        gizlemek, sayfanın "üç yargı bölgesi" iddiasını
                        görselde doğru, metinde eksik bırakırdı. */}
                    <SmartLink href={c.href} className="ab-cn" data-hub={c.hub || undefined}>
                      <span className="ab-cn-flag" aria-hidden="true">
                        <Flag country={c.slug} />
                      </span>
                      <span className="ab-cn-b">
                        <b>
                          {COUNTRY_NAME[c.slug]}
                          {/* Yapı künyesi brand.ts · FACTS'ten okunuyor;
                              about.ts'e kopyalanmadı ki iki yerde iki farklı
                              yapı yazma ihtimali hiç doğmasın. */}
                          <i>{structureOf(c.slug)}</i>
                        </b>
                        <span>{c.line}</span>
                      </span>
                      <ArrowRight size={16} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3 · ALINTI =================
            Kısa bir gri bant. İki koyu bölüm arasında değil, koyu ile beyaz
            arasında duruyor; geçişi yumuşatıyor ve sayfanın tek "insan sesi"
            anı olarak nefes alanı açıyor.

            Künye satırında yayın adı ve tarih YOK çünkü elimizde doğrulanmış
            hâli yok (about.ts · SWAP:QUOTE_SOURCE). Boş kaldığı sürece
            basılmıyor; uydurulmuş bir kaynak, alıntının kendisini de
            şüpheli hâle getirirdi. */}
        <section className="sec-pad ab-quote-sec" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <FadeUp>
              <figure className="ab-quote">
                <blockquote>{QUOTE.text}</blockquote>
                <figcaption>
                  <b>{QUOTE.who}</b>
                  <span>{QUOTE.role}</span>
                  {QUOTE.source && <span>{QUOTE.source}</span>}
                </figcaption>
              </figure>
            </FadeUp>
          </div>
        </section>

        {/* ================= 4 · NEYE DAYANARAK ================= */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={BASIS.heading}
                accent={BASIS.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{BASIS.lead}</p>
              </FadeUp>
            </div>

            <div className="ab-basis">
              {BASIS.cards.map((c, i) => {
                const Icon = ICONS[c.icon];
                return (
                  <FadeUp key={c.t} delay={0.12 + i * 0.05}>
                    <article className="ab-bcard">
                      <span className="ab-bic" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <h3>{c.t}</h3>
                      <p>{c.s}</p>
                    </article>
                  </FadeUp>
                );
              })}
            </div>

            {/* İki grup AYRI kutularda ve bu ayrım bu sayfanın en önemli
                dürüstlük detayı: "IFZA resmî iş ortağı" ile "Stripe
                kullanıyoruz" aynı şeritte akarsa ikisi de resmî ortaklık gibi
                okunuyor. Liste brand.ts · PARTNERS'tan geliyor, buraya
                kopyalanmadı. */}
            <div className="ab-partners">
              {[
                { head: BASIS.partners, rows: officialPartners },
                { head: BASIS.infra, rows: infraPartners },
              ].map((g, i) => (
                <FadeUp key={g.head.t} delay={0.3 + i * 0.06}>
                  <div className="ab-pgroup">
                    <h3>{g.head.t}</h3>
                    <p>{g.head.s}</p>
                    <ul>
                      {g.rows.map((p) => (
                        <PartnerRow key={p.name} name={p.name} role={p.role} />
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5 · NASIL ÇALIŞIYORUZ ================= */}
        <section className="sec-pad sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text={HOW.heading}
                accent={HOW.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">{HOW.lead}</p>
              </FadeUp>
            </div>

            {/* Zincir brand.ts · CHAIN'den geliyor — ana sayfadaki Chain
                bölümüyle aynı beş halka, aynı sırada. Burada ikon değil sıra
                numarası var: bu bölümde anlatılan şey halkaların NE olduğu
                değil, PEŞ PEŞE geldiği. */}
            <FadeUp delay={0.12}>
              <ol className="ab-chain">
                {CHAIN.map((s, i) => (
                  <li key={s.key}>
                    <span className="ab-chain-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <b>{s.label}</b>
                    <span>{s.line}</span>
                  </li>
                ))}
              </ol>
            </FadeUp>

            <div className="ab-princ">
              {HOW.principles.map((p, i) => {
                const Icon = ICONS[p.icon];
                return (
                  <FadeUp key={p.t} delay={0.2 + i * 0.06}>
                    <article className="ab-pcard">
                      <span className="ab-pic" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <h3>{p.t}</h3>
                      <p>{p.s}</p>
                    </article>
                  </FadeUp>
                );
              })}
            </div>

            {/* STANCE_LIMITS aynen brand.ts'ten. Metni burada yeniden yazmak,
                firma politikasının iki farklı sürümünü üretmek olurdu. */}
            <FadeUp delay={0.3}>
              <div className="ab-limits">
                <div className="ab-limits-h">
                  <span className="ab-limits-ic" aria-hidden="true">
                    <TriangleAlert size={16} strokeWidth={2.1} />
                  </span>
                  <div>
                    <h3>{HOW.limits.t}</h3>
                    <p>{HOW.limits.s}</p>
                  </div>
                </div>
                <ul>
                  {STANCE_LIMITS.map((l) => (
                    <li key={l.title}>
                      <b>{l.title}</b>
                      <span>{l.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ================= 6 · SEKTÖRLER ================= */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={FOR_WHOM.heading}
                accent={FOR_WHOM.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{FOR_WHOM.lead}</p>
              </FadeUp>
            </div>

            <div className="ab-sectors">
              {FOR_WHOM.sectors.map((s, i) => {
                const Icon = SECTOR_ICONS[s.slug];
                return (
                  <FadeUp key={s.slug} delay={0.12 + i * 0.045}>
                    {/* Altı adresin beşi şu an dolaşıma kapalı ve SmartLink
                        onları sönük basıyor. Kapalı olanı listeden çıkarmak
                        daha "temiz" görünürdü ama sayfa o zaman altı değil bir
                        sektörde çalıştığımızı söylerdi. */}
                    <SmartLink
                      href={sectorHref(s.slug)}
                      className="ab-sec"
                      aria-label={`${s.label} — detayları gör`}
                    >
                      <span className="ab-sec-ic" aria-hidden="true">
                        {Icon && <Icon size={16} strokeWidth={1.9} />}
                      </span>
                      <span className="ab-sec-b">
                        <b>{s.label}</b>
                        <span>{s.line}</span>
                      </span>
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 7 · TEMAS =================
            Kanal listesi şu an boş (about.ts · SWAP:CONTACT_*) ve o yüzden
            hiç basılmıyor; geriye sitenin tek gerçek soru kanalı kalıyor.
            "Mali müşavire danışın" kalıbı emekli — sorusu olan AskCta ile
            doğrudan bize soruyor. */}
        <section className="sec-pad" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <FadeUp>
              <div className="ab-close">
                <div className="ab-close-t">
                  <h2>{CONTACT.heading}</h2>
                  <p>{CONTACT.lead}</p>
                  {channels.length > 0 && (
                    <ul className="ab-chan">
                      {channels.map((c) => {
                        const Icon = CONTACT_ICONS[c.kind];
                        return (
                          <li key={c.kind}>
                            <Icon size={15} strokeWidth={2} aria-hidden="true" />
                            {c.href ? <a href={c.href}>{c.value}</a> : <span>{c.value}</span>}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <AskCta label={CONTACT.ctaLabel} />
              </div>
            </FadeUp>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
