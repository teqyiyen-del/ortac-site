import type { Metadata } from "next";
import {
  ArrowRight,
  Boxes,
  Building2,
  ChartCandlestick,
  ChevronDown,
  Code2,
  Handshake,
  History,
  Languages,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  Quote as QuoteMark,
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
import { CHAIN, COUNTRY_NAME, PARTNERS, STANCE_LIMITS } from "@/lib/brand";
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
  SUMMARY,
  WHERE,
  structureOf,
  type AboutIcon,
  type ContactKind,
  type SummaryKey,
} from "@/lib/about";

/* ============================================================================
   HAKKIMIZDA — /hakkimizda

   Bu dosyada tek bir cümle yok. Sayfada görünen her kelime lib/about.ts'te ya
   da lib/brand.ts'te duruyor; şablon yalnızca onu diziyor. Sebebi onaydan
   geliyor: firma hakkındaki iddiaları müşteri ve muhasebeci tek dosyadan
   okuyup onaylayabilsin, kimse doğrulama yapmak için React okumak zorunda
   kalmasın.

   ------------------------------------------------------ NEDEN BAŞTAN YAZILDI
   Önceki sürüm ekranda çöküyordu ve sebebi tek bir şeydi: bu sayfanın CSS'i
   hiç yazılmamıştı (hakkimizda.css tek satırlık bir yer tutucuydu). Flag
   bileşeni width/height taşımayan çıplak bir <svg> döndürüyor — kabı
   ölçülmediğinde bayrak kabına yayılıyor ve ekranı kaplıyor. Aynı sebeple
   metinler de biçimsiz akıyordu.

   Bu turda hem CSS yazıldı hem sayfa yeniden kurgulandı. En büyük kurgu
   değişikliği: ÜÇ ÜLKE KÜRESİ KALDIRILDI. Mutlak konumlu bayrak işaretleriyle
   dolu bir tel kafes küre, sayfaya hiçbir bilgi eklemeden bütün kırılganlığı
   üstlenen parçaydı — ve kırıldığı yer tam olarak orasıydı. Yerine aynı üç
   ülkeyi taşıyan ama ölçüsü sabit üç kart geldi.

   ---------------------------------------------- MÜŞTERİNİN İKİ KURALI, BURADA
   1) "Her section özet versin, detay tıklamayla ya da başka sayfada açılsın."
      Sayfanın ilk ekranı üç RAKAM (özet), her rakam kendi bölümüne iniyor.
      Ülke kartları ülke sayfasına, sektör kartları sektör sayfasına çıkıyor.
      Vizyon/misyon <details> içinde kapalı bekliyor.

   2) "Anlatmayacağız, göstereceğiz." Bu sayfada uzun paragraf yok. Her bilgi
      bir yapıya bağlandı: künye bir tabloya, ülke bir bayrak diskine, hizmet
      sırası numaralı bir raya, ortaklar gerçek marka işaretlerine, sektörler
      kartlara. En uzun metin bloğu üç satırlık bir alıntı.

   ------------------------------------------------------------------- AKIŞ
   Sayfa bir kurumsal broşür değil, bir kayıt zinciri:

     0  özet          üç rakam — üç bölüme inen kısayol
     1  kim olduğumuz künye tablosu + (kapalı) vizyon ve misyon
     2  neredeyiz     üç yargı bölgesi, üç kart, üç çıkış      #nerede
     3  (alıntı)      Murat Ortaç
     4  neye dayanarak  dört olgu + iki ayrı ortak grubu
     5  nasıl         beş halkalı ray + üç ilke + taahhüt sınırları  #nasil
     6  kimler için   altı sektör                              #sektorler
     7  temas         tek çıkış

   -------------------------------------------------------------- ZEMİN RİTMİ
   beyaz(künye) → gece(ülkeler) → gri(alıntı) → beyaz(dayanak) → gece(nasıl)
   → beyaz(sektörler) → gri(temas). İki bölüm hiçbir yerde aynı zeminle arka
   arkaya gelmiyor; bölüm sınırı için ayrı bir çizgiye gerek kalmıyor.

   ------------------------------------------------------------ SUNUCU BİLEŞENİ
   Sayfa "use client" DEĞİL ve öyle kalmalı: generateMetadata ve JSON-LD
   sunucu tarafında üretiliyor. Sayfadaki bütün hareketi FadeUp ve SplitWords
   taşıyor; ikisi de istemci bileşeni ve MotionConfig reducedMotion="user"
   altında çalışıyor (Providers.tsx). Küre gidince sayfada elle yazılmış tek
   bir CSS keyframe kalmadı — azaltılmış hareket ayarı hiçbir istisna
   bırakmadan uygulanıyor.
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

  /* Özet kutucuklarındaki üç sayı ELLE YAZILMIYOR, dizilerin uzunluğu.
     Bir ülke ya da sektör eklendiğinde kutucuk kendiliğinden doğru kalıyor;
     yanlış bir sayı, hiç olmayan bir sayıdan daha kötü olurdu. */
  const COUNTS: Record<SummaryKey, number> = {
    where: WHERE.countries.length,
    chain: CHAIN.length,
    sectors: FOR_WHOM.sectors.length,
  };

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
            Bölüm üç rakamla açılıyor, cümleyle değil. Üç kutucuk sayfanın
            içindekiler tablosu gibi çalışıyor: her biri kendi bölümüne inen bir
            çapa. Ziyaretçi yalnızca sektörlerle ilgileniyorsa aradaki dört
            bölümü okumadan atlıyor — "özet önde, detay istenirse" kuralının en
            doğrudan uygulaması.

            Ardından künye tablosu. Boş değerli satırlar hiç basılmıyor
            (about.ts'teki SWAP notları): "Kuruluş yılı: —" yazan bir satır,
            bilginin yokluğunu bilgi gibi gösterirdi. */}
        <section className="sec-pad">
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

            <FadeUp delay={0.1} y={18}>
              <nav className="ab-stats" aria-label="Sayfa özeti">
                {SUMMARY.map((s) => (
                  <a className="ab-stat" href={s.href} key={s.k}>
                    <b className="ab-stat-n">{COUNTS[s.k]}</b>
                    <span className="ab-stat-l">{s.label}</span>
                    <ChevronDown size={15} strokeWidth={2.1} aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </FadeUp>

            <FadeUp delay={0.18} y={18}>
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
                    <span>{IDENTITY.statementLabel}</span>
                    <ChevronDown className="ab-det-x" size={16} strokeWidth={2.1} aria-hidden="true" />
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
            Üç eşit kart. Eşitlik burada biçimsel değil, bölümün tezi: üç ayrı
            ülke değil, üç ülkeden geçen tek zincir. Tek fark Dubai'nin rozeti
            ve o rozet doğrulanabilir bir olguya dayanıyor (kendi ofisimizin
            olduğu tek yer).

            Sıra batıdan doğuya. Coğrafi bir iddia taşımıyor, yalnızca keyfî
            olmamasını sağlıyor. */}
        <section className="sec-pad sec-night ab-anchor" id="nerede">
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

            <div className="ab-geo">
              {WHERE.countries.map((c, i) => (
                <FadeUp key={c.slug} delay={0.12 + i * 0.07}>
                  {/* Ülke sayfasına çıkış SmartLink ile: İngiltere ve KKTC şu an
                      dolaşıma kapalı, o yüzden sönük ve tıklanamaz çıkıyorlar.
                      Kart yine de basılıyor — üç ülkeden birini gizlemek,
                      sayfanın "üç yargı bölgesi" iddiasını görselde doğru,
                      metinde eksik bırakırdı. */}
                  <SmartLink href={c.href} className="ab-cn" data-hub={c.hub || undefined}>
                    <span className="ab-cn-head">
                      <span className="ab-cn-flag" aria-hidden="true">
                        <Flag country={c.slug} />
                      </span>
                      <b className="ab-cn-name">{COUNTRY_NAME[c.slug]}</b>
                      {c.hub && <span className="ab-cn-hub">{WHERE.hubLabel}</span>}
                    </span>

                    {/* Yapı künyesi brand.ts · FACTS'ten okunuyor; about.ts'e
                        kopyalanmadı ki iki yerde iki farklı yapı yazma ihtimali
                        hiç doğmasın. */}
                    <span className="ab-cn-st">{structureOf(c.slug)}</span>
                    <span className="ab-cn-line">{c.line}</span>
                    <span className="ab-cn-go">
                      Ülke sayfası
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </span>
                  </SmartLink>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 3 · ALINTI =================
            Kısa bir gri bant, kendi bölümü değil bir nefes: sec-pad yerine
            kendi dar dolgusu var. Koyu ile beyazın arasında duruyor ve sayfanın
            tek "insan sesi" anı.

            Künye satırında yayın adı ve tarih YOK çünkü elimizde doğrulanmış
            hâli yok (about.ts · SWAP:QUOTE_SOURCE). Boş kaldığı sürece
            basılmıyor; uydurulmuş bir kaynak, alıntının kendisini de şüpheli
            hâle getirirdi. */}
        <section className="ab-quote-sec">
          <div className="container-o">
            <FadeUp>
              <figure className="ab-quote">
                <QuoteMark className="ab-quote-m" size={26} strokeWidth={1.8} aria-hidden="true" />
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
        <section className="sec-pad">
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
                    <ul className="ab-plist">
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
        <section className="sec-pad sec-night ab-anchor" id="nasil">
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
                değil, PEŞ PEŞE geldiği. Beş halkanın üstünden geçen kesintisiz
                ray da bunu söylüyor — cümle kurmadan. */}
            <FadeUp delay={0.12}>
              <ol className="ab-chain">
                {CHAIN.map((s, i) => (
                  <li className="ab-step" key={s.key}>
                    <span className="ab-step-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <b className="ab-step-t">{s.label}</b>
                    <span className="ab-step-l">{s.line}</span>
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
                firma politikasının iki farklı sürümünü üretmek olurdu. Blok
                AÇIKTA duruyor, <details> içinde değil: taahhüt etmediğimiz şeyi
                bir tıklamanın arkasına saklamak, tam olarak bu üç maddenin
                engellemeye çalıştığı davranış olurdu. */}
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
                <ul className="ab-limits-l">
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
        <section className="sec-pad ab-anchor" id="sektorler">
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
                        <b className="ab-sec-t">{s.label}</b>
                        <span className="ab-sec-l">{s.line}</span>
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
