import Chain from "@/components/home/Chain";
import ChainZ1 from "@/components/lab/ChainZ1";
import ChainZ2 from "@/components/lab/ChainZ2";
import ChainZ3 from "@/components/lab/ChainZ3";
import ChainZ4 from "@/components/lab/ChainZ4";
import ChainZ5 from "@/components/lab/ChainZ5";
import ChainZ6 from "@/components/lab/ChainZ6";
import ChainZ7 from "@/components/lab/ChainZ7";

/* "Kuruluş bir halka, zincir devam ediyor" — üçüncü tur.
 *
 * Bu turda arama bitti: karar canlı tasarımı DEĞİŞTİRMEK değil ONARMAK.
 * Müşterinin cümlesi: "aslında beğendiğimiz bir tasarım şuan olan ama hem
 * şirket kuruluşda olan siyah çizgi neden sola diye bir yorum geldi hemde çok
 * soyut ya neyi ifade ettiğini anlamaz insanlar dediler."
 *
 * Yani canlı bölümün açık, ferah, kutusuz düzeni KALIYOR; yalnızca iki şey
 * gidiyor — adlandırılmamış eksen ve dokuya kodlanmış sıklık. Z7 tam olarak
 * bunu yapıyor, başka hiçbir şeye dokunmuyor.
 *
 * Beş halkanın adı ve cümlesi hep brand.ts'teki CHAIN'den geldi; üç turda da
 * bilgi hiç değişmedi, değişen yalnızca sunum. */

const CANDIDATES = [
  {
    id: "Z7",
    kind: "Canlı tasarımın onarımı",
    Section: ChainZ7,
    idea:
      "Canlı bölümün kabuğu birebir duruyor — aynı boşluk, aynı satır ritmi, kutu yok. Değişen iki şey: eksen adlandırıldı (sol hücre \"Kuruluştan itibaren · ilk 12 ay\", üstte 1–12 ay numaraları), böylece kuruluşun solda olması tasarım tercihi değil okunabilir bir olgu — 1. ay. Ve sıklık dokudan miktara geçti: dolu kare sayısı işin yılda kaç kez çıktığı. Sağdaki rakam elle yazılmıyor, kareler sayılarak türüyor.",
  },
];

/* Reddedilen ikinci tur. Sıklığı doğru şekilde GÖRSELLEŞTİRDİLER — teşhis
   tutuyordu ve Z7'nin kare mantığı doğrudan Z4'ten geliyor. Düşme sebepleri
   sunumdaki fazlalık: üçü de bölümü bir panelin içine aldı. Müşteri: "genel
   olarak tüm sectionun bi box içinde olması fln hoşuma gitmedi. bizim şuan
   canlıdaki açık ferah tasarıma dön." */
const EX2 = [
  {
    id: "Z4",
    kind: "Sayılabilir miktar",
    Section: ChainZ4,
    idea:
      "Zaman ekseni bir yıl, on iki kare — her kare bir ay. Sıklık dokuya değil MİKTARA kodlu: yılda bir olan iş bir kare, her ay olan iş on iki kare. Kare fikri tuttu ve Z7'ye taşındı; panel kabuğu düştü.",
  },
  {
    id: "Z5",
    kind: "Tekrar eden nesne",
    Section: ChainZ5,
    idea:
      "Sıklık eksende değil nesnede: her halka bir iş kartı ve iş kaç kez tekrarlanıyorsa kart o kadar kez üst üste biniyor. Kuruluş tek yaprak, Oturum & Vize üç yapraklı ince deste, Muhasebe & Vergi sekiz yapraklı kalın deste.",
  },
  {
    id: "Z6",
    kind: "Zaman şeridi",
    Section: ChainZ6,
    idea:
      "Ortak bir şerit: 0 kuruluş anı, 24 ikinci yılın sonu. Üstünde kendini anlatan üç işaret — tırtık bir kez iş çıkması (iki tırtığın arası doğrudan periyodun kendisi), kesintisiz bant sürekli devam eden iş.",
  },
];

/* Reddedilen ilk tur. Teşhisleri doğruydu (canlı bölüm bir Gantt çizelgesi ve
   sitede ikinci örneği yok) ama çözümleri fazla ileri gitti: sıklığı GÖRSEL
   olmaktan çıkarıp yazıya çevirdiler. Oysa asıl beğenilen şey sıklığın
   görselleştirilmesiydi; beğenilmeyen, onun ÇUBUK DOKUSUNA kodlanmış olması —
   yani okumak için lejant çözmek gerekmesiydi. Üstteki üç aday sıklığı yine
   görsel tutuyor ama lejantsız okunacak biçimde. */
const EX = [
  {
    id: "Z1",
    kind: "Bölüm gibi davransın",
    Section: ChainZ1,
    idea:
      "Çizelge gidiyor, argüman kalıyor: beş halka sitenin standart bölüm kalıbında (sec-head + paper kuyu + satır dili). Zincir fikri sol oluğa taşınıyor — her satırın hizasında bir halka, ilki siyah (tek seferlik), son satırdan sonra zincir bitmiyor, sönerek notun yanından çıkıyor.",
  },
  {
    id: "Z2",
    kind: "Zamanda göster",
    Section: ChainZ2,
    idea:
      "Beş halka çizelge değil, aşağı akan tek bir zaman rayı. Panel iki yüzeye bölünüyor: beyaz (tek seferlik) ve kâğıt (süresiz devam eden). Siyah iplik kuruluştan sonra ayrılmış bir uçla bitiyor, mavi iplik son noktadan sonra da sürüyor.",
  },
  {
    id: "Z3",
    kind: "Metaforu çizme",
    Section: ChainZ3,
    idea:
      "Zinciri çizmek yerine beş iş tek bir panonun içine alınıyor: üstte tek bant (Kuruluş · tek seferlik), altında panoyu ikiye bölen mavi ray, rayın altında saç teliyle ayrılmış dört hücre (süresiz devam eden). Bağlantıyı taşıyan şey ortak çerçeve; metafor sadece başlıkta kalıyor.",
  },
];

export default function LabChainPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Zincir bölümü
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
          Üçüncü tur, ve bu turda arama bitti: <b style={{ fontWeight: 600 }}>Z7 yeni bir tasarım
          değil, canlı bölümün hedefli onarımı</b>. Kabuk, boşluk ve satır ritmi birebir duruyor;
          yalnızca adlandırılmamış eksen ile dokuya kodlanmış sıklık gidiyor. Beş halkanın adı ve
          cümlesi üç turdur hiç değişmedi — hepsi <code>brand.ts</code>&apos;teki CHAIN&apos;den
          geliyor.
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
              color: "var(--blue-700)",
            }}
          >
            Bu turda karar
          </b>
          <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.65, color: "var(--text-600)" }}>
            İki tur alternatif arandı, sonuç şu: aranan şey{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>başka bir tasarım değil</b>.
            Canlı bölümün açık ve kutusuz düzeni zaten beğeniliyor; sorun iki noktada. Biri{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>adlandırılmamış eksen</b> —
            kuruluş çubuğu solda başlayıp %24&apos;te bitiyor ama ekseni okutan hiçbir işaret yok,
            o yüzden konum keyfi görünüyor ve &quot;siyah çizgi neden solda?&quot; sorusu geliyor.
            Diğeri{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>dokuya kodlanmış sıklık</b> —
            düz / sık tırtıklı / seyrek tırtıklı çubuklar bir lejant çözmeyi gerektiriyor. Z7 bu
            ikisini onarıyor ve başka hiçbir şeye dokunmuyor.
          </p>
        </div>
      </div>

      {CANDIDATES.map(({ id, kind, Section, idea }) => (
        <div key={id}>
          <div
            className="container-o"
            style={{ paddingTop: 56, marginTop: 40, borderTop: "1px solid var(--border)" }}
          >
            <span
              style={{
                display: "inline-flex",
                padding: "5px 12px",
                borderRadius: 999,
                background: "var(--blue-100)",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--blue-700)",
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
                color: "var(--text-600)",
              }}
            >
              {idea}
            </p>
          </div>
          <Section />
        </div>
      ))}

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
          Ex · ikinci tur
        </span>
        <p style={{ margin: "14px 0 0", maxWidth: "68ch", fontSize: 14, lineHeight: 1.6, color: "#8a8a8a" }}>
          Sıklığı doğru şekilde görselleştirdiler — Z7&apos;nin kare mantığı doğrudan Z4&apos;ten
          geliyor. Düşme sebepleri sunumdaki fazlalık: üçü de bölümü bir panelin içine aldı.
        </p>
      </div>
      <div style={{ opacity: 0.85 }}>
        {EX2.map(({ id, kind, Section, idea }) => (
          <div key={id}>
            <div className="container-o" style={{ paddingTop: 48, marginTop: 32 }}>
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
                {id} · {kind} · ex
              </span>
              <p style={{ margin: "12px 0 0", maxWidth: "68ch", fontSize: 13.5, lineHeight: 1.6, color: "#8a8a8a" }}>
                {idea}
              </p>
            </div>
            <Section />
          </div>
        ))}
      </div>

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
          Ex · ilk tur
        </span>
        <p style={{ margin: "14px 0 0", maxWidth: "68ch", fontSize: 14, lineHeight: 1.6, color: "#8a8a8a" }}>
          Sıklığı yazıya çevirdikleri için düştüler — görselleştirme kaybolmuştu. Teşhisleri yine
          de doğruydu ve sonraki turları yönlendirdi.
        </p>
      </div>
      <div style={{ opacity: 0.85 }}>
        {EX.map(({ id, kind, Section, idea }) => (
          <div key={id}>
            <div className="container-o" style={{ paddingTop: 48, marginTop: 32 }}>
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
                {id} · {kind} · ex
              </span>
              <p style={{ margin: "12px 0 0", maxWidth: "68ch", fontSize: 13.5, lineHeight: 1.6, color: "#8a8a8a" }}>
                {idea}
              </p>
            </div>
            <Section />
          </div>
        ))}
      </div>

      {/* karşılaştırma için canlı bölümün kendisi */}
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
        <p style={{ margin: "14px 0 0", maxWidth: "68ch", fontSize: 14, lineHeight: 1.6, color: "#8a8a8a" }}>
          Z7&apos;nin karşılaştırması burada. İkisi arka arkaya bakınca görülecek olan şey şu:
          düzen, boşluk ve satır ritmi aynı — değişen yalnızca şeridin ne söylediği.
        </p>
      </div>
      <div style={{ opacity: 0.9 }}>
        <Chain />
      </div>
    </main>
  );
}
