import type { Metadata } from "next";
import SmartLink from "@/components/shared/SmartLink";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import CountryPricing from "@/components/CountryPricing";
import CountryProcess from "@/components/CountryProcess";
import CountryStructures from "@/components/CountryStructures";
import CountryDocs from "@/components/CountryDocs";
import CountryTax from "@/components/CountryTax";
import CountryFaq from "@/components/CountryFaq";
import CountryFit from "@/components/CountryFit";
import CountryPros from "@/components/country/CountryPros";
import CountryOrtac from "@/components/country/CountryOrtac";
import CountryAfter from "@/components/country/CountryAfter";
import MoneyHome from "@/components/country/MoneyHome";
import FinalCta from "@/components/FinalCta";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_SLUGS } from "@/lib/services";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { PRICING } from "@/lib/pricing";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

type Params = Promise<{ slug: string }>;

const isCountry = (s: string): s is Country => (COUNTRY_SLUGS as string[]).includes(s);

export function generateStaticParams() {
  return COUNTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  if (!isCountry(slug)) return {};
  const name = COUNTRY_LABELS[slug];
  return {
    title: `${name}'de şirket kuruluşu — maliyet, süreç ve hizmetler | Ortac Global`,
    description: `${name}'de kuruluş süresi, maliyeti, avantajları ve dikkat edilmesi gerekenler. Kurulumunuzu seçin, fiyat anında çıksın.`,
  };
}

const money = (n: number) => `$${n.toLocaleString("tr-TR")}`;

export default async function CountryPage({ params }: { params: Params }) {
  const { slug } = await params;
  if (!isCountry(slug)) notFound();

  const name = COUNTRY_LABELS[slug];
  const c = COUNTRY_CONTENT[slug];
  const others = COUNTRY_SLUGS.filter((x) => x !== slug);

  /* Para yolları buradan çıktı: artık MoneyHome kendi içinde kuruyor. Sebebi
     hedef ülke seçicisi — sahnelerdeki "Türkiye şirketiniz" düğümü seçime göre
     değiştiği için diyagram state'e bağlı, yani istemci tarafında yaşamak
     zorunda. Sunucu bileşeni olan bu sayfa onu artık hazır kuramıyor. */

  return (
    <>
      <Nav />
      <main>
        {/* country geçince PageHero iki sütunlu hero'ya dönüyor: solda başlık,
            butonlar ve güven satırları, sağda ülkeye özgü vektör sahne.
            Verilmezse eski kompakt başlık bloğu aynen çıkıyor, o yüzden
            /ulkeler, /kaynaklar ve hizmet sayfaları etkilenmiyor. */}
        {/* backdrop propu ARTIK GEÇİLMİYOR. Izgara + glow zemini /dubai'de
            denenip onaylandı ve PageHero'nun varsayılanı oldu, yani üç ülke de
            (dubai / ingiltere / kktc) aynı girişi alıyor. Buradaki koşullu
            prop kalksaydı bile davranış değişmezdi; silinmesinin sebebi
            "Dubai özel" okumasının artık yanlış olması.
            Kalibrasyon: src/app/css/pagehero-grid.css, TİP B (.ph-split). */}
        <PageHero
          country={slug}
          crumb={`Ülkeler · ${name}`}
          title={`${name}'de şirket kurmak.`}
          accent="şirket kurmak."
          lead={c.intro}
        />

        {/* ---------- KALDIRILDI · rakam şeridi (.cp-facts) ----------
             Hero'nun hemen altında dört rakam duruyordu: süre, yapı, kuruluş
             başlangıcı, vize. Sayfa daha "burası neden" demeden fiyat
             konuşmaya başlıyordu ve dört sayı beyaz bir şeritte tasarımsız
             duruyordu. Aynı rakamların hepsi zaten aşağıda, kendi
             bağlamlarında var: süre ve yapı süreç bölümünde, tutarlar
             fiyat yapılandırıcısında.

             ---------- KALDIRILDI · CountryClarify ----------
             "…'de karıştırılan üç şey" bloğu buradaydı. İçerik doğru ama yeri
             yanlıştı: ziyaretçi ülkeyi tanımadan üç uyarıyla karşılaşıyordu.
             Bileşen ve metni duruyor (countryContent.clarify), akıştan çıktı.
             Duruşun kendisi kaybolmadı — "şirket kurmak vergi avantajı
             üretmiyor" cümlesi CountryTax içinde STANCE_Q/STANCE_A olarak,
             "serbest bölge otomatik muafiyet değil" satırı da aynı bölümün
             vergi tablosunda yaşamaya devam ediyor. */}

        {/* ---------- the structural choice, where there is one ---------- */}
        {c.structures && <CountryStructures data={c.structures} />}

        {/* ---------- what the country itself gives you ---------- */}
        <CountryPros name={name} pros={c.pros} />

        {/* ---------- what WE add on top of it (base, dubai only for now) ---------- */}
        <CountryOrtac country={slug} />

        {/* ---------- tax frame ----------
             Akışta yukarı alındı: avantajlardan hemen sonra, fiyattan önce.
             It used to sit near the end, after the process and the document
             list, which is long past the point where the question gets asked.
             What a visitor wants to know right after "why here" is what they
             actually keep, and only then what our own work costs. */}
        <CountryTax data={c.tax} name={name} />

        {/* ---------- money home ----------
             Akışta yukarı alındı: vergi çerçevesinin hemen altına. Eskiden
             fiyatın, sürecin, evrakların ve "kimin işine yarar"ın arkasındaydı;
             oysa "burada ne kalıyor" sorusunun doğal devamı "peki onu nasıl
             eve getiririm". İki bölüm yan yana durunca ziyaretçi parayı uçtan
             uca takip edebiliyor, fiyat konuşması ondan sonra başlıyor. */}
        <MoneyHome country={slug} name={name} />

        {/* ---------- interactive price ---------- */}
        <section id="fiyat" className="sec-pad sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text="Kurulumunuzu seçin, fiyat anında çıksın."
                accent="fiyat anında çıksın."
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">
                  {name} için paket ve ek hizmetleri seçin; tutar sağda satır satır oluşur.
                </p>
              </FadeUp>
            </div>
            <CountryPricing country={slug} />
          </div>
        </section>

        {/* ---------- KALDIRILDI · "… hizmetleri" fiyat kartları ----------
             Beş hizmet kartı, her birinin üstünde bir fiyat. Fiyat konusu bu
             sayfada zaten bir bölüm önce, yapılandırıcıyla açılıyor; burada
             ikinci kez ve bağlamsız açılınca sayfa iki ayrı fiyat okuması
             veriyordu. Hizmetlere giriş kalktığı yerde durmuyor: ana sayfadaki
             hizmet kartlarında ülke seçimiyle, ayrıca Nav'daki ülke menüsünde
             duruyor. */}

        {/* ---------- KALDIRILDI · "Neyi dahil ediyoruz, neyi etmiyoruz" ----------
             Kapsam matrisi tek ve sabit bir liste veriyordu, oysa neyin dahil
             olduğu seçilen pakete göre değişiyor. Sayfanın ortasında paketten
             bağımsız bir "dahil / hariç" tablosu, fiyat yapılandırıcısında
             görülenle çelişme riski taşıyordu. Kapsam fiyatın içine taşınacak;
             ayrı bir bölüm olarak durmuyor. Veri (countryContent.included /
             .excluded) ve CountryScope bileşeni yerinde duruyor. */}

        {/* ---------- process ---------- */}
        <CountryProcess steps={c.steps} title={`${name}'de süreç, adım adım.`} />

        {/* ---------- documents: the inputs that process needs ---------- */}
        <CountryDocs data={c.docs} name={name} />

        {/* ---------- what happens after the company exists ----------
             Yeri kasıtlı: kuruluş anlatıldıktan (süreç) ve neyin istendiği
             yazıldıktan (evraklar) sonra geliyor. Daha önce koyulsaydı henüz
             kurulmamış bir şirketin yıllık yükümlülüklerini okutuyor olurduk.
             Şimdilik yalnızca Dubai'de içerik var; diğer ülkelerde null. */}
        <CountryAfter country={slug} />

        {/* ---------- fit ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={`${name} kimin işine yarar?`}
                accent="kimin işine yarar?"
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">Profilinizi seçin, cevabı burada verelim.</p>
              </FadeUp>
            </div>

            <CountryFit rows={c.fitTable} country={slug} />
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text="Sık sorulanlar."
                accent="sorulanlar."
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
            </div>
            <CountryFaq items={c.faq} />
          </div>
        </section>

        {/* ---------- other countries ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <h2 className="sp-h">Diğer ülkelere bakın</h2>
            <div className="sp-cross-row">
              {others.map((o) => (
                <SmartLink key={o} href={`/${o}`} className="sp-cross-card">
                  <span className="sp-cross-flag" aria-hidden="true">
                    <Flag country={o} />
                  </span>
                  <span>
                    <b>{COUNTRY_LABELS[o]}</b>
                    {PRICING[o].duration}
                  </span>
                  <span className="sp-cross-p">{money(PRICING[o].base)}</span>
                </SmartLink>
              ))}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
