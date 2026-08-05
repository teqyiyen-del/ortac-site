import GecisT1Kapi from "@/components/lab/GecisT1Kapi";
import GecisT2Basin from "@/components/lab/GecisT2Basin";
import GecisT3Fisilti from "@/components/lab/GecisT3Fisilti";
import GecisT4Sure from "@/components/lab/GecisT4Sure";
import GecisT5Arac from "@/components/lab/GecisT5Arac";
import CountryIntroC5 from "@/components/lab/CountryIntroC5";
import CountryIntroO1 from "@/components/lab/CountryIntroO1";
import CountryIntroO2 from "@/components/lab/CountryIntroO2";
import CountryIntroO3 from "@/components/lab/CountryIntroO3";
import CountryIntroO4 from "@/components/lab/CountryIntroO4";
import { FACTS } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* Ülke sayfasının hero'dan sonraki ARALIĞI — altıncı tur.
 *
 * ===========================================================================
 * SLOT CANLIDAN KALKTI, SORU DEĞİŞTİ
 *
 * "herodan sonra gelen kısımı daha mantıklı bir işlev için kullanamayacaksak
 * bence direkt siktiret uçur gitsin gerek yok çıkamıyoruz işin içinden.
 * tamamen konudan apayrı düşünerek herodan sonra konuya geçmeden önce ne
 * yapabiliriz olarak düşünerek farklı farklı türde şeyler deneyip laba
 * atabilirsin, şimdilik ordaki kısmı kaldır."
 *
 * Beş turdur reddedilen şey TASARIM DEĞİLDİ. Ölçülen teşhis: bölümün kendine
 * ait bir işi yoktu. Ülkenin iddiası hero'nun lead'inde, avantajlar bir alt
 * bölümde, yapı seçimi hemen altında — her tur bu aralığa bir iş UYDURDU ve
 * her seferinde zayıf kaldı. Müşterinin yeni yönergesi ("tamamen konudan
 * apayrı") kilidi açıyor: bölüm ülkeyi anlatmak ZORUNDA DEĞİL.
 *
 * ===========================================================================
 * BU TURDA DEĞİŞEN: VARYASYON DEĞİL TÜR
 *
 * Önceki turlar aynı fikrin beş sürümüydü (kart + başlık + liste). Bu turda
 * altı adayın altısı BİRBİRİNDEN TÜR OLARAK ayrılıyor ve ikisi bile aynı
 * soruyu cevaplamıyor:
 *
 *   T0  sıfır         bölüm yok — bugünkü canlı hâl, dürüst taban
 *   T1  yönlendirme   ziyaretçiyi ayıran tek soru (kişi hakkında)
 *   T2  sosyal kanıt  bir kez başkası konuşuyor (press.ts, sekiz gerçek kayıt)
 *   T3  duyusal       nefes; tipografi ve zemin, GÖRSEL ÖGE SIFIR
 *   T4  zamansal      başka eksen: ne kadar sürer
 *   T5  işlevsel      sayfanın dışına çıkan bir kapı (yayındaki araç)
 *
 * ORTAK KISITLAR (hepsinde tutuldu): hiçbiri hero'yu tekrar etmiyor, HİÇBİRİ
 * KOYU ZEMİN KULLANMIYOR (yani "iki hero" itirazının dört kaynağı — gece
 * zemin, ızgara, glow, tam yayılan koyu alan — bu turda hiç yok), hiçbiri
 * "… kısaca" + iki paragraf özet kalıbı değil, ve ekrandaki her kelime
 * countryContent.ts / press.ts / brand.ts / tools/catalog.ts'ten geliyor.
 *
 * ESKİLER SİLİNMEDİ. O1–O4 ve C5 sayfanın altında "ex" başlığı altında
 * duruyor — karar kaydı.
 */

const COUNTRY: Country = "dubai";
const NAME = COUNTRY_LABELS[COUNTRY];

const LABEL = {
  sim: {
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize: 11,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
} as const;

/* ---------------------------------------------------- komşu · üstteki hero
   Adaylar ÇIPLAK DEĞİL, komşularıyla basılıyor: karar verilecek olan şey
   bölümün kendisi değil GEÇİŞ — siyahtan beyaza inerken bu aralıkta ne
   oluyor. Bant hero'nun KOPYASI değil, kasten basitleştirilmiş bir taklit:
   gerçek PageHero istemci bileşeni ve vektör sahne taşıyor. Taklit edilen
   tek şey ölçü ve renk. */
function HeroTail() {
  return (
    <div style={{ background: "var(--night)", paddingTop: 54, paddingBottom: 44 }}>
      <div className="container-o">
        <p style={{ ...LABEL.sim, color: "#7a7a7a", margin: 0 }}>
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
          Ülkeler · {NAME}
        </p>
        <p className="h2" style={{ color: "#ffffff", margin: "12px 0 0" }}>
          {`${NAME}'de şirket kurmak.`}
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
          {COUNTRY_CONTENT[COUNTRY].intro}
        </p>
        <p style={{ margin: "18px 0 0", fontSize: 13, color: "rgba(255, 255, 255, 0.55)" }}>
          {FACTS[COUNTRY].limit}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------- komşu · alttaki bölümün başı
   Aralığın altındaki ilk bölüm yapı seçimi ve hiçbir adayda değişmiyor.
   T1'in kapıları buraya bakıyor: seçilen cevap bu bölümün hangi kartı
   olduğunu söylüyor. */
function NextHead() {
  const s = COUNTRY_CONTENT[COUNTRY].structures;
  return (
    <div style={{ background: "var(--white)", paddingTop: 64, paddingBottom: 40 }}>
      <div className="container-o">
        <p style={{ ...LABEL.sim, color: "#8a8a8a", margin: 0 }}>
          ↓ bir sonraki bölümün başlangıcı · simülasyon
        </p>
        <p className="h2" style={{ color: "var(--text-900)", margin: "14px 0 0" }}>
          {s?.title ?? "Yapı seçimi"}
        </p>
        <p className="sec-lead" style={{ margin: "14px 0 0" }}>
          {s?.lead ?? ""}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ aday künyesi */
function Banner({
  id,
  kind,
  job,
  edge,
  note,
  tone = "new",
}: {
  id: string;
  kind: string;
  job: string;
  edge: string;
  note?: string;
  tone?: "new" | "base" | "ex";
}) {
  const bg = tone === "new" ? "var(--blue-100)" : "var(--paper)";
  const fg = tone === "new" ? "var(--blue-900)" : "var(--text-900)";
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
          background: bg,
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: fg,
        }}
      >
        {id} · {kind}
      </span>
      {/* Bu turun tek sorusu: bölümün KENDİNE AİT işi ne. Beş tur boyunca
          eksik olan tam olarak bu satırdı. */}
      <p
        style={{
          margin: "14px 0 0",
          maxWidth: "68ch",
          fontSize: 14.5,
          lineHeight: 1.6,
          color: "var(--text-900)",
        }}
      >
        <b style={{ fontWeight: 600 }}>İşi:</b> {job}
      </p>
      <p
        style={{
          margin: "10px 0 0",
          maxWidth: "68ch",
          fontSize: 14,
          lineHeight: 1.6,
          color: "var(--text-600)",
        }}
      >
        <b style={{ fontWeight: 600 }}>Feda ettiği:</b> {edge}
      </p>
      {note && (
        <p
          style={{
            margin: "12px 0 0",
            maxWidth: "68ch",
            padding: "12px 14px",
            borderRadius: "var(--r-md)",
            background: "var(--paper)",
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--text-900)",
          }}
        >
          {note}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- adaylar */
type Candidate = {
  id: string;
  kind: string;
  /** T0'da yok: bölümün olmaması adayın kendisi. */
  Section: ((p: { country: Country; name: string }) => React.ReactElement | null) | null;
  job: string;
  edge: string;
  note?: string;
  tone: "new" | "base" | "ex";
};

const CANDIDATES: Candidate[] = [
  {
    id: "T0",
    kind: "Sıfır bölüm · taban",
    Section: null,
    tone: "base",
    job:
      "Hiçbiri. Hero biter, yapı seçimi başlar; arada yalnızca zemin değişir (gece → beyaz). Bugün /dubai'de duran hâl bu ve labda taban olarak basılıyor ki karşılaştırma dürüst olsun: bir aday ancak HİÇBİR ŞEYDEN iyiyse eklenmeyi hak ediyor.",
    edge:
      "Sayfanın tek nefes yeri gidiyor: hero'nun altındaki ilk şey doğrudan bir karar bölümü. Fotoğraf da bu turda hiçbir adayda yok, yani sayfa baştan sona vektör ve tipografi kalıyor.",
    note: "Aşağıda bant ile bir sonraki bölüm ARKA ARKAYA duruyor — eksik değil, adayın kendisi.",
  },
  {
    id: "T1",
    kind: "Yönlendirme · etkileşimli",
    Section: GecisT1Kapi,
    tone: "new",
    job:
      "Ziyaretçiyi ayırıyor. Tek soru — \"hangisi sizsiniz?\" — ve iki kapı; cevap, hemen altındaki yapı seçimi bölümünde hangi kartın onunki olduğunu baştan söylüyor. Aralık bir özet değil bir eleme: aşağıya iki seçenekle değil kendi seçeneğiyle iniliyor. Kapıların metni structures.options[n].fit[0], cevap options[n].name + .line.",
    edge:
      "Aynı iki yapının adı bir ekran arayla iki kez geçiyor. Karşılığında alttaki bölüm bir tanıtım olmaktan çıkıp bir onaya dönüşüyor — ama bunu ölçmenin tek yolu ikisini arka arkaya görmek, o yüzden aşağıda öyle basılı. İkinci bedel: bölüm ancak `structures` olan ülkede var (İngiltere ve KKTC'de null döner).",
  },
  {
    id: "T2",
    kind: "Sosyal kanıt · görselsiz",
    Section: GecisT2Basin,
    tone: "new",
    job:
      "Konuşan tarafı bir kez değiştiriyor. Sayfanın geri kalanında Dubai'yi anlatan biziz; bu aralıkta bir haber manşeti duruyor ve doğruluğu bize bağlı değil. Manşet, yayın ve tarih press.ts'ten (en yeni kayıt, elle seçilmiyor); şerit sekiz kaydın yayın adları. Uydurma referans yok — o dosyadaki sekiz adresin sekizi de doğrulanmış.",
    edge:
      "Kanıt ÜLKE hakkında, FİRMA hakkında değil: haberler Dubai'deki Türk şirketi sayısını ve ticaret hacmini anlatıyor, bizim işimizi değil. İkinci bedel kapsam — kayıtların hepsi Dubai'yi anlattığı için bölüm İngiltere ve KKTC'de hiç basılmıyor; üç ülkede aynı şeyi yapabilen bir aday değil.",
  },
  {
    id: "T3",
    kind: "Duyusal · GÖRSEL ÖGE SIFIR",
    Section: GecisT3Fisilti,
    tone: "new",
    job:
      "Hiçbir şey anlatmıyor; nefes aldırıyor. Ekranda iki kelime öbeği var ve ikisi de countryContent.tagline'ın parçası (\"Serbest bölge · IFZA\"); ayraç basılmıyor, yerini bandın boşluğu alıyor. Soldaki öbek bir alt bölümün konusu — yani bandın bıraktığı son kelime, sonraki bölümün ilk kelimesi.",
    edge:
      "Ölçülebilir bir işi yok: kimseyi ayırmıyor, bir şey öğretmiyor, hiçbir yere göndermiyor. Bölüm gereksiz bulunursa en çok bu aday bulunur — ama beş turdur reddedilen şey \"iş uyduran\" bölümlerdi, bu aday iş uydurmayı hiç denemiyor. İkinci bedel: zemin (--paper) kenardan kenara, yani \"yerleştirilmiş parça\" kalıbını bilerek bırakıyor; kart, kenarlık ve yarıçap yok.",
  },
  {
    id: "T4",
    kind: "Zamansal · eksen değişimi",
    Section: GecisT4Sure,
    tone: "new",
    job:
      "Sayfanın eksenini bir kez değiştiriyor: \"burası neresi\"den \"ne kadar sürer\"e. Toplam süre FACTS.days, eksenin iki ucu steps'in ilk ve son `timing` değeri, adım sayısı ve karar/bekleme dağılımı diziden SAYILIYOR. Ayrımın kuralı veriden geliyor — `timing` içinde rakam yoksa o adımda bekleme yok.",
    edge:
      "Süreç bölümüyle aynı diziyi okuyor. Çakışma kelimede değil eksende çözülüyor (burada adım adı ve açıklaması hiç basılmıyor, orada süre bir yan bilgi) ama iki bölüm aynı veriden besleniyor ve bu bir bağ. İkinci bedel: turun en büyük puntolu adayı, çünkü tek iddiası bir rakam.",
  },
  {
    id: "T5",
    kind: "İşlevsel · sayfa dışına kapı",
    Section: GecisT5Arac,
    tone: "new",
    job:
      "Okutmuyor, çalıştırıyor: ziyaretçiye sayfanın yapamadığı bir şeyi uzatıyor. Kapılar LIVE_TOOLS'tan geliyor ve iki süzgeçten geçiyor — rota gerçekten yayında mı (isLive) ve araç bu ülkeye mi ait. Bugün Dubai'de tek kapı çıkıyor; başka bir araç yayına alınırsa bölüm kendiliğinden büyüyor.",
    edge:
      "Ziyaretçiyi hero'dan hemen sonra sayfadan ÇIKARIYOR — üstelik çıkan araç üç ülkeyi puanlıyor, yani onu Dubai'den başka bir ülkeye götürebilir. İkinci bedel: aracın \"ne olmadığı\" burada yazmıyor (o alan aracın kendi sayfasında), yani dürüstlük şerhi bir tık uzakta.",
  },
];

/* Karar kaydı. Müşteri O1–O4 ve C5'i gördü; hiçbiri onaylanmadı ("asla
   hoşuma gitmiyor, gereksiz bir kısım gibi hissettiriyor"). Silinmiyorlar
   çünkü bu turun adayları ancak onlarla yan yana anlamlı: beşi de aynı türün
   varyasyonuydu, altısı da farklı tür. */
const EX: Candidate[] = [
  {
    id: "O4",
    kind: "ex · zemin · fotoğraflı",
    Section: CountryIntroO4,
    tone: "ex",
    job: "Avantajları basıyordu: solda pros, sağda watchouts, arkada Dubai fotoğrafı.",
    edge: "Turun tek koyu zeminli adayıydı. Reddedildi.",
  },
  {
    id: "O1",
    kind: "ex · dosya",
    Section: CountryIntroO1,
    tone: "ex",
    job: "Dört avantaj eşit ağırlıkta, numaralı kütük hâlinde.",
    edge: "Hiyerarşi yok, görsel yok. Reddedildi.",
  },
  {
    id: "O2",
    kind: "ex · başat",
    Section: CountryIntroO2,
    tone: "ex",
    job: "En güçlü avantaj manşet, kalan üçü altta şerit.",
    edge: "Hero'ya en çok yaklaşan aday. Reddedildi.",
  },
  {
    id: "O3",
    kind: "ex · denge",
    Section: CountryIntroO3,
    tone: "ex",
    job: "Solda pros, sağda watchouts — artı ve eksi aynı kartta.",
    edge: "Kartın içine en çok metin giren aday. Reddedildi.",
  },
  {
    id: "C5",
    kind: "ex · eşik · bir tur canlıdaydı",
    Section: CountryIntroC5,
    tone: "ex",
    job: "Ülkenin adı, kurulan yapı ve sayfanın ne yapacağını söyleyen bir cümle.",
    edge:
      "Bu turu başlatan cümle bunun için söylendi: \"gereksiz bir kısım gibi hissettiriyor.\" Sayfanın TEK fotoğrafı buradaydı; slot kalkınca fotoğraf da kalktı.",
  },
];

function Block({ c }: { c: Candidate }) {
  const { id, kind, Section, job, edge, note, tone } = c;
  return (
    <div>
      <Banner id={id} kind={kind} job={job} edge={edge} note={note} tone={tone} />
      <HeroTail />
      {Section && <Section country={COUNTRY} name={NAME} />}
      <NextHead />
    </div>
  );
}

export default function LabCountryIntroPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Hero&apos;dan sonraki aralık — tür turu
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
          Slot canlıdan <b style={{ fontWeight: 600 }}>kaldırıldı</b>; /dubai şu an hero → yapı
          seçimi → avantajlar diye yürüyor. Müşterinin yönü:{" "}
          <b style={{ fontWeight: 600 }}>
            &quot;tamamen konudan apayrı düşünerek herodan sonra konuya geçmeden önce ne
            yapabiliriz olarak düşünerek farklı farklı türde şeyler deneyip laba atabilirsin.&quot;
          </b>{" "}
          Yani bölüm ülkeyi anlatmak zorunda değil. Önceki beş tur aynı fikrin (kart + başlık +
          liste) sürümleriydi; bu turda altı aday{" "}
          <b style={{ fontWeight: 600 }}>birbirinden tür olarak</b> ayrılıyor ve ikisi bile aynı
          soruyu cevaplamıyor. Sayfa yalnızca Dubai&apos;yi basıyor; bileşenler{" "}
          <code style={{ fontSize: 13 }}>country</code> propuyla çalışıyor.
        </p>

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
              color: "var(--blue-900)",
            }}
          >
            Karşılaştırmanın kuralı
          </b>
          <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.65, color: "var(--text-600)" }}>
            İlk aday <b style={{ fontWeight: 600, color: "var(--text-900)" }}>T0</b> ve ekranda
            hiçbir şey basmıyor — bölümün hiç olmadığı hâl. Kasten en üstte: beş turdur reddedilen
            adayların hepsi &quot;iyi mi&quot; diye ölçülüyordu, oysa doğru soru{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>hiçbir şeyden iyi mi</b>. Bir
            aday T0&apos;ı geçemiyorsa slot boş kalır.
          </p>
          <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.65, color: "var(--text-600)" }}>
            Beş turdur konuşulan &quot;iki hero&quot; itirazının ölçülmüş dört kaynağı vardı: gece
            zemin, ızgara, glow ve tam yayılan koyu alan.{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>
              Bu turda hiçbir aday koyu zemin kullanmıyor
            </b>
            , yani dördü de yok. Aşağıdaki tabloda kalan tek ölçü punto — ve turun en büyüğü bile
            hero&apos;nun %59&apos;u.
          </p>
          <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.65, color: "var(--text-600)" }}>
            Ekrandaki her kelime{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>
              countryContent.ts · press.ts · brand.ts · tools/catalog.ts
            </b>
            &apos;ten geliyor; yeni bir oran, süre, koşul ya da referans yazılmadı. T2&apos;deki
            basın kayıtları o dosyadaki sekiz <b style={{ fontWeight: 600 }}>gerçek</b> kayıt.
          </p>
        </div>

        {/* Hero'dan ayrışma bir izlenim değil sayı. Zemin sütunu bu turda tek
            değer taşıyor, o yüzden ağırlık puntoya kaydı. */}
        <div style={{ marginTop: 22, overflowX: "auto", maxWidth: "100%" }}>
          <table
            style={{
              borderCollapse: "collapse",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              minWidth: 980,
            }}
          >
            <caption
              style={{
                captionSide: "top",
                textAlign: "left",
                paddingBottom: 10,
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--blue-900)",
              }}
            >
              Ölçüm · hero ile yan yana
            </caption>
            <thead>
              <tr>
                {[
                  "",
                  "tür",
                  "zemin",
                  "en büyük metin",
                  "1440px",
                  "hero'nun %'si",
                  "görsel öge",
                  "süregiden hareket",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "8px 14px 8px 0",
                      borderBottom: "1px solid var(--border)",
                      fontWeight: 600,
                      color: "var(--text-600)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Hero (.phg / .ph-h1)",
                  "—",
                  "#080808 + ızgara + glow",
                  "clamp(34px, 4.4vw, 58px)",
                  "58px",
                  "—",
                  "vektör sahne / kart",
                  "var",
                ],
                ["T0", "sıfır", "yok — bölüm yok", "—", "—", "—", "yok", "yok"],
                [
                  "T1 (.gc1-q)",
                  "yönlendirme",
                  "#ffffff",
                  "clamp(21px, 2.0vw, 27px)",
                  "27px",
                  "47",
                  "yok (kapı + daire)",
                  "8.4 s · seçimde durur",
                ],
                [
                  "T2 (.gc2-head)",
                  "sosyal kanıt",
                  "#ffffff",
                  "clamp(20px, 1.95vw, 26px)",
                  "26px",
                  "45",
                  "yok",
                  "11 s",
                ],
                [
                  "T3 (.gc3-w)",
                  "duyusal",
                  "#f5f5f5 (--paper)",
                  "clamp(15px, 1.55vw, 21px)",
                  "21px",
                  "36",
                  "SIFIR",
                  "12 s",
                ],
                [
                  "T4 (.gc4-days)",
                  "zamansal",
                  "#ffffff",
                  "clamp(26px, 2.6vw, 34px)",
                  "34px",
                  "59",
                  "eksen kutucukları",
                  "9.5 s",
                ],
                [
                  "T5 (.gc5-t)",
                  "işlevsel",
                  "#ffffff",
                  "clamp(17px, 1.5vw, 20px)",
                  "20px",
                  "34",
                  "ok simgesi",
                  "7.2 s + 2.6 s",
                ],
                [
                  "ex · iki tur önceki",
                  "—",
                  "#080808 + ızgara + glow + fotoğraf",
                  "clamp(30px, 3.5vw, 46px)",
                  "46px",
                  "79",
                  "tam yayılan fotoğraf",
                  "yok",
                ],
              ].map((row) => {
                const ref = row[0].startsWith("Hero") || row[0].startsWith("ex");
                return (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        style={{
                          padding: "9px 14px 9px 0",
                          borderBottom: "1px solid var(--border)",
                          color: ref ? "var(--text-600)" : "var(--text-900)",
                          fontWeight: i === 0 ? 600 : 400,
                          fontVariantNumeric: "tabular-nums",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p
          style={{
            marginTop: 10,
            maxWidth: "72ch",
            fontSize: 13.5,
            lineHeight: 1.6,
            color: "var(--text-600)",
          }}
        >
          En alttaki satır iki tur önce kalkan sürüm: puntosu zaten hero&apos;dan küçüktü,
          &quot;iki hero&quot; hissini yaratan şey <b style={{ fontWeight: 600 }}>zemindi</b>. Bu
          turda o zemin hiç kullanılmıyor.{" "}
          <b style={{ fontWeight: 600 }}>Süregiden hareket</b> sütunu giriş animasyonunu saymıyor:
          hepsi ekranda durduğu sürece devam eden döngüler ve{" "}
          <code style={{ fontSize: 12.5 }}>prefers-reduced-motion: reduce</code> altında
          <b style={{ fontWeight: 600 }}> hiç tanımlanmıyor</b> (iptal edilmiyor — tanımlanmıyor),
          yani o modda bölümlerden sıfır animasyon dönüyor.
        </p>
      </div>

      {CANDIDATES.map((c) => (
        <Block key={c.id} c={c} />
      ))}

      {/* --------------------------------------------------------------- ex */}
      <div
        className="container-o"
        style={{ paddingTop: 64, marginTop: 56, borderTop: "2px solid var(--text-900)" }}
      >
        <h2 className="h2" style={{ color: "var(--text-900)" }}>
          ex — önceki turlar
        </h2>
        <p
          style={{
            marginTop: 12,
            maxWidth: "68ch",
            fontSize: 14.5,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          Beşi de aynı türün varyasyonuydu: bir kart, bir başlık, bir liste. Karar kaydı olarak
          duruyorlar — yukarıdaki altı aday ancak bunlarla yan yana &quot;farklı tür&quot; olarak
          okunuyor.
        </p>
      </div>

      {EX.map((c) => (
        <Block key={c.id} c={c} />
      ))}
    </main>
  );
}
