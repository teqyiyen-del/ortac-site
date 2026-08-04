import Link from "next/link";
import CountryIntro from "@/components/country/CountryIntro";
import CountryIntroC1 from "@/components/lab/CountryIntroC1";
import CountryIntroC2 from "@/components/lab/CountryIntroC2";
import CountryIntroC3 from "@/components/lab/CountryIntroC3";
import { FACTS } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* Ülke sayfasının GİRİŞ BÖLÜMÜ — hero ile yapı seçiminin arasındaki aralık.
 *
 * Müşterinin cümlesi: "dubai kısaca kısmına gerçekten dubai kısaca başlığı atıp
 * 2 tane yazı mı yazdın bu nasıl giriş kısmı… neden dubai fln gibi bir şey
 * yazılabilir ya da sırf görsel koycaz diye böyle bir kısma hiç girmeyebiliriz.
 * yani burayı vitrin gibi kullanmamız lazım aslında konuya girmeden önce çok
 * baymayan bir yer olmalı."
 *
 * Adaylar ÇIPLAK DEĞİL, komşularıyla birlikte basılıyor: üstlerinde hero'nun
 * alt ucunu taklit eden gece bir bant, altlarında bir sonraki bölümün beyaz
 * başlangıcı. Karar verilecek olan şey bölümün kendisi değil GEÇİŞ — siyahtan
 * beyaza inerken bu aralıkta ne oluyor. Tek başına bakılınca üç aday da makul
 * görünür; asıl soru hangisinin hero'yu kesmediği ve hangisinin karar bölümünü
 * geciktirmediği.
 *
 * Komşu bantlar hero'nun ve bölümlerin KOPYASI değil, kasten basitleştirilmiş
 * birer taklit: gerçek PageHero istemci bileşeni, üç ülkenin vektör sahnesini
 * ve fiyat kartını taşıyor — üç kez üst üste basılınca sayfa adayların değil
 * hero'nun karşılaştırması olurdu. Burada taklit edilen tek şey ölçü ve renk:
 * siyah zemin, aynı başlık, aynı lead, aynı sol kenar.
 *
 * Ülke ?u= ile değişiyor (varsayılan Dubai) ve üç aday da aynı ülkeyi gösteriyor
 * — karşılaştırma ancak öyle adil. Bileşenlerin üçü de sunucu bileşeni, sayfada
 * durum yok, o yüzden seçim sorgu parametresiyle taşınıyor.
 */

const COUNTRIES: Country[] = ["dubai", "ingiltere", "kktc"];

const isCountry = (s: string): s is Country => (COUNTRIES as string[]).includes(s);

/* Ülke sayfasında CountryPros'un başlığı bu ekten üretiliyor; komşu bandın
   doğru cümleyi göstermesi için aynı ek burada da lazım. */
const POSSESSIVE: Record<string, string> = {
  Dubai: "Dubai'nin",
  İngiltere: "İngiltere'nin",
  KKTC: "KKTC'nin",
};

const LABEL = {
  sim: {
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize: 11,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
} as const;

/* ---------------------------------------------------- komşu · üstteki hero */
function HeroTail({ country, name }: { country: Country; name: string }) {
  return (
    <div style={{ background: "var(--night)", paddingTop: 54, paddingBottom: 44 }}>
      <div className="container-o">
        <p style={{ ...LABEL.sim, color: "#4a4a4a", margin: 0 }}>
          ↑ hero&apos;nun alt ucu · simülasyon
        </p>
        <p
          style={{
            margin: "18px 0 0",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--blue-500)",
          }}
        >
          Ülkeler · {name}
        </p>
        <p className="h2" style={{ color: "#ffffff", margin: "12px 0 0" }}>
          {`${name}'de şirket kurmak.`}
        </p>
        <p
          style={{
            margin: "16px 0 0",
            maxWidth: "52ch",
            fontSize: 16.5,
            lineHeight: 1.6,
            color: "rgba(255, 255, 255, 0.76)",
          }}
        >
          {COUNTRY_CONTENT[country].intro}
        </p>
        <p style={{ margin: "18px 0 0", fontSize: 13, color: "rgba(255, 255, 255, 0.45)" }}>
          {FACTS[country].limit}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------- komşu · alttaki bölümün başı */
function NextHead({ country, name }: { country: Country; name: string }) {
  const s = COUNTRY_CONTENT[country].structures;
  const title = s ? s.title : `${POSSESSIVE[name] ?? `${name}'nin`} avantajları`;
  const lead = s
    ? s.lead
    : "Bunlar ülkenin kendi sağladıkları. Şarta bağlı olan her madde şart rozetiyle işaretli.";

  return (
    <div style={{ background: "var(--white)", paddingTop: 64, paddingBottom: 40 }}>
      <div className="container-o">
        <p style={{ ...LABEL.sim, color: "#b0b0b0", margin: 0 }}>
          ↓ bir sonraki bölümün başlangıcı · simülasyon
        </p>
        <p className="h2" style={{ color: "var(--text-900)", margin: "14px 0 0" }}>
          {title}
        </p>
        <p className="sec-lead" style={{ margin: "14px 0 0" }}>
          {lead}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ aday başlığı */
function Banner({
  id,
  kind,
  idea,
  edge,
  tone = "live",
}: {
  id: string;
  kind: string;
  idea: string;
  edge: string;
  tone?: "live" | "ex";
}) {
  const muted = tone === "ex";
  return (
    <div
      className="container-o"
      style={{ paddingTop: 56, marginTop: 40, borderTop: "1px solid var(--border)" }}
    >
      <span
        style={{
          display: "inline-flex",
          padding: "5px 12px",
          borderRadius: 999,
          background: muted ? "var(--paper)" : "var(--blue-100)",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: muted ? "#8a8a8a" : "var(--blue-700)",
        }}
      >
        {id} · {kind}
      </span>
      <p
        style={{
          margin: "14px 0 0",
          maxWidth: "68ch",
          fontSize: 14.5,
          lineHeight: 1.6,
          color: muted ? "#8a8a8a" : "var(--text-600)",
        }}
      >
        {idea}
      </p>
      <p
        style={{
          margin: "12px 0 0",
          maxWidth: "68ch",
          fontSize: 14,
          lineHeight: 1.6,
          color: muted ? "#8a8a8a" : "var(--text-900)",
        }}
      >
        <b style={{ fontWeight: 600 }}>Cesareti:</b> {edge}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------- adaylar */
const CANDIDATES = [
  {
    id: "C1",
    kind: "Vitrin camı",
    Section: CountryIntroC1,
    idea:
      "Bölüm konuşmayı bırakıyor. Kenardan kenara tek bir fotoğraf bandı: üst kenarı hero'nun siyahından devralıyor, alt kenarı koyulaşıp beyaz karar bölümüne kesiliyor. Üstünde iki şey var — ülkenin adı levha büyüklüğünde ve tek satır künye (kurulacak yapı, FACTS.structure). Başlık yok, liste yok, paragraf yok.",
    edge:
      "Bu bölümün bilgi verme iddiasını tamamen bırakıyor — vitrin bir şey anlatmaz, gösterir. Karşılığında sayfanın ilk yarım ekranını fotoğrafa veriyor: iddia zayıfsa bu boşluk affetmez.",
  },
  {
    id: "C2",
    kind: "Kapıdaki tabela",
    Section: CountryIntroC2,
    idea:
      "Fotoğraf yok. Hero'nun siyahı devam ediyor ve üstünde tek bir soru duruyor: \"Burası size göre mi?\" Altında fitTable'ın dört \"evet\" satırı, ama künye etiketi olarak değil ikinci tekil şahıs cümlesi olarak — \"Online satış yapıyorsanız\". Kapanış satırı \"hayır\" cevabının sayfanın neresinde olduğunu söylüyor.",
    edge:
      "\"Neden Dubai\" sorusunu ülkeyi savunarak değil ziyaretçiyi konu ederek cevaplıyor — tek tekrar etmeyen yol bu, çünkü ülkenin savunması hero'nun lead'inde zaten yazılı. Bedeli açık: bu aday seçilirse ülke sayfasında fotoğraf kalmıyor.",
  },
  {
    id: "C3",
    kind: "Dikiş",
    Section: CountryIntroC3,
    idea:
      "Bölüm olmaktan çıkıyor, noktalama işaretine dönüşüyor. Bir manzarayı taşımaya yetmeyecek kadar alçak bir fotoğraf yarığı, altında tek satır (ad + kurulacak yapı) ve sağda sayfanın ilk kararını adıyla duyuran bir işaret — sıradaki bölümün adı sayfanın kendi akışından türüyor (Dubai'de yapı seçimi, diğer ikisinde avantajlar). Toplam yüksekliği bir bölümün dörtte biri.",
    edge:
      "\"Hiç olmasın\"a evet demeden önceki son durak: boşluğu doldurmayı reddediyor, yalnızca hero ile karar bölümünün birbirine çarpmasını engelliyor. Dürüst olalım — burada fotoğraf var ama vitrin yok.",
  },
];

type Search = Promise<{ u?: string | string[] }>;

export default async function LabCountryIntroPage({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.u) ? sp.u[0] : sp.u;
  const country: Country = raw && isCountry(raw) ? raw : "dubai";
  const name = COUNTRY_LABELS[country];

  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Ülke sayfasının giriş bölümü
        </h1>

        <p
          style={{
            marginTop: 12,
            maxWidth: "68ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          Hero ile yapı seçiminin arasındaki aralık. Bugün orada{" "}
          <b style={{ fontWeight: 600 }}>&quot;{name}, kısaca.&quot;</b> başlığı ve iki künye
          satırı duruyor. Müşteri haklı: bu bir vitrin değil,{" "}
          <b style={{ fontWeight: 600 }}>bir künye</b> — bir nesnenin etiketi. Vitrin bakana
          seslenir, künye nesneyi tarif eder.
        </p>

        {/* Ortak teşhis: adayların hepsi buradan çıkıyor, o yüzden sayfanın
            başında ve tek yerde duruyor. */}
        <div
          style={{
            marginTop: 20,
            padding: "18px 20px",
            borderRadius: "var(--r-lg)",
            background: "var(--paper)",
            border: "1px solid var(--border)",
            maxWidth: "72ch",
          }}
        >
          <b
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--blue-700)",
            }}
          >
            Teşhis · bu aralığın gerçek sorunu
          </b>
          <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.65, color: "var(--text-600)" }}>
            Bölüm kötü tasarlandığı için değil,{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>
              söyleyecek sözü kalmadığı için
            </b>{" "}
            kuru. Ülkenin başlık iddiası bir ekran yukarıda, hero&apos;nun lead&apos;inde zaten
            yazılı (&quot;{COUNTRY_CONTENT[country].intro.split(".")[0]}.&quot;). Avantajlar bir
            bölüm aşağıda kendi ızgarasında; rakam şeridi ve uyarı bloğu buradan bilerek
            kaldırıldı. Geriye bu aralığın tekrar etmeden kullanabileceği üç şey kalıyor:{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>kurulacak yapı</b> (FACTS.structure),{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>kimin için</b> (fitTable) ve{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>fotoğraf</b>. Yani buraya
            &quot;neden {name}&quot; diye bir argüman yazmak, aynı cümleyi iki ekran arayla iki
            kez söylemek olurdu — kuruluğun üstüne bir de tekrar.
          </p>
          <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.65, color: "var(--text-600)" }}>
            Üç aday bu yüzden üç farklı cevap veriyor:{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>göster</b> (C1),{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>okura seslen</b> (C2),{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>yalnızca geçir</b> (C3).
            Müşterinin kendi verdiği dördüncü seçenek — &quot;hiç girmeyebiliriz&quot; — üçünün
            altında <b style={{ fontWeight: 600, color: "var(--text-900)" }}>C0</b> olarak
            gerçekten basılı: hero doğrudan karar bölümüne bağlanınca sayfanın ne kazanıp ne
            kaybettiği ancak öyle görülür.
          </p>
        </div>

        {/* Ülke seçici. Üç aday da aynı ülkeyi gösteriyor. */}
        <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8a8a8a",
              marginRight: 4,
            }}
          >
            Ülke
          </span>
          {COUNTRIES.map((c) => {
            const on = c === country;
            return (
              <Link
                key={c}
                href={`/lab/ulke-giris?u=${c}`}
                style={{
                  padding: "7px 14px",
                  borderRadius: 999,
                  border: `1px solid ${on ? "var(--text-900)" : "var(--border)"}`,
                  background: on ? "var(--text-900)" : "var(--white)",
                  color: on ? "#ffffff" : "var(--text-600)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 13.5,
                  textDecoration: "none",
                }}
              >
                {COUNTRY_LABELS[c]}
              </Link>
            );
          })}
        </div>
      </div>

      {CANDIDATES.map(({ id, kind, Section, idea, edge }) => (
        <div key={id}>
          <Banner id={id} kind={kind} idea={idea} edge={edge} />
          <HeroTail country={country} name={name} />
          <Section country={country} name={name} />
          <NextHead country={country} name={name} />
        </div>
      ))}

      {/* ---------------------------------------------- C0 · bölüm hiç olmasın */}
      <Banner
        id="C0"
        kind="Bölüm hiç olmasın"
        idea="Müşterinin kendi verdiği seçenek, tasarım değil silme. Hero'nun alt kenarı doğrudan bir sonraki bölümün beyazına bağlanıyor; arada hiçbir şey yok. Aşağıdaki blokta ilave edilmiş tek bir piksel yok — iki komşu bant yan yana."
        edge="Sayfa hızlanıyor ve tek bir kelime tekrar etmiyor. Karşılığında iki şey gidiyor: siyahtan beyaza tek karede düşen sert kesim (hero'nun bittiği yer artık bir nefes almıyor) ve sayfanın TEK fotoğrafı — müşterinin fotoğraf isteği tam da bu bölümden geçiyordu, C0 seçilirse fotoğrafın yeri başka bir bölümde yeniden aranmak zorunda."
      />
      <HeroTail country={country} name={name} />
      <NextHead country={country} name={name} />

      {/* ------------------------------------------------ karşılaştırma · canlı */}
      <div
        className="container-o"
        style={{ paddingTop: 72, marginTop: 56, borderTop: "2px solid var(--border)" }}
      >
        <span
          style={{
            display: "inline-flex",
            padding: "5px 12px",
            borderRadius: 999,
            background: "var(--paper)",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#8a8a8a",
          }}
        >
          Şu an canlıda olan
        </span>
        <p
          style={{
            margin: "14px 0 0",
            maxWidth: "68ch",
            fontSize: 14,
            lineHeight: 1.6,
            color: "#8a8a8a",
          }}
        >
          Aynı komşulukta, aynı ülkede. Arka arkaya bakınca görülecek olan şey şu: bu bölüm
          yalnız bırakıldığında iyi duruyor, ama hero&apos;nun hemen altında aynı ölçüde ikinci
          bir metin bloğu olarak okunuyor — başlık, gövde, yanında kare. Sayfa iki kez aynı
          şekle giriyor ve ikincisinin söyleyecek yeni bir şeyi yok.
        </p>
      </div>
      <HeroTail country={country} name={name} />
      <div style={{ opacity: 0.9 }}>
        <CountryIntro country={country} name={name} />
      </div>
      <NextHead country={country} name={name} />
    </main>
  );
}
