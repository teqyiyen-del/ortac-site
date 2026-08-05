import Chain from "@/components/home/Chain";
import ChainZ6 from "@/components/lab/ChainZ6";
import ChainZ7 from "@/components/lab/ChainZ7";
import ChainZ8 from "@/components/lab/ChainZ8";

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
    id: "Z8",
    kind: "Ekleyerek değil, düzelterek",
    Section: ChainZ8,
    idea:
      "Z7 kabuğu korudu ama satırı kalabalıklaştırdı: tek çubuk on iki kutucuğa bölündü, üstüne bir cetvel, bir grup ayracı ve iki grup başlığı geldi — ve lejantı kaldırmaya çalışırken lejantı yazıya çevirdi. Z8 hiçbir şey eklemiyor, satırda zaten duran iki şeyi somutlaştırıyor: etiket artık \"Yılda 12 kez\" / \"2 yılda 1 yenileme\" diyor, çubuğun tırtık aralığı da aynı veriden türüyor. Kaydırma silindi, beş çubuk da kuruluş anından başlıyor; kuruluşu ayıran şey konumu değil, tek biten çubuk olması. Adsız dikey omurga da 1. yılın hizasına geçip adını aldı.",
  },
];

/* Reddedilen üçüncü tur. Doğru yerden tutmuştu — canlının kabuğunu birebir
   korudu ve kutu kullanmadı — ama satır başına okunacak nesne sayısını
   artırdı. Müşteri: "hala bizim şuan live da olanın hissini vermiyor bir
   şeyler çok karışık gibi." */
const EX3 = [
  {
    id: "Z7",
    kind: "Canlı tasarımın onarımı",
    Section: ChainZ7,
    idea:
      "Kabuk birebir korundu, kutu yok. Eksen adlandırıldı (sol hücre \"Kuruluştan itibaren · ilk 12 ay\", üstte 1–12 ay numaraları) ve sıklık dokudan miktara geçti: dolu kare sayısı işin yılda kaç kez çıktığı. Kare fikri doğruydu; düşme sebebi satırın kalabalıklaşması.",
  },
];

/* Reddedilen ikinci tur. Sıklığı doğru şekilde GÖRSELLEŞTİRDİLER — teşhis
   tutuyordu. Düşme sebepleri sunumdaki fazlalık: üçü de bölümü bir panelin
   içine aldı. Müşteri: "genel olarak tüm sectionun bi box içinde olması fln
   hoşuma gitmedi. bizim şuan canlıdaki açık ferah tasarıma dön."
   Turun diğer iki adayı (Z4 sayılabilir miktar, Z5 tekrar eden nesne) müşteri
   isteğiyle silindi; kayıtta kalan Z6. */
const EX2 = [
  {
    id: "Z6",
    kind: "Zaman şeridi",
    Section: ChainZ6,
    idea:
      "Ortak bir şerit: 0 kuruluş anı, 24 ikinci yılın sonu. Üstünde kendini anlatan üç işaret — tırtık bir kez iş çıkması (iki tırtığın arası doğrudan periyodun kendisi), kesintisiz bant sürekli devam eden iş.",
  },
];

/* İlk turun üç adayı (Z1 · Z2 · Z3) müşteri isteğiyle silindi. Teşhisleri
   doğruydu (canlı bölüm bir Gantt çizelgesi ve sitede ikinci örneği yok) ama
   çözümleri fazla ileri gitti: sıklığı GÖRSEL olmaktan çıkarıp yazıya
   çevirdiler. Oysa asıl beğenilen şey sıklığın görselleştirilmesiydi;
   beğenilmeyen, onun ÇUBUK DOKUSUNA kodlanmış olması — yani okumak için lejant
   çözmek gerekmesiydi. Sonraki turlar sıklığı görsel tuttu ama lejantsız
   okunacak biçimde. */

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
          Dördüncü tur. Z7 doğru yerden tutmuştu ama satırı kalabalıklaştırdı;{" "}
          <b style={{ fontWeight: 600 }}>Z8 hiçbir şey EKLEMİYOR</b> — canlıda zaten duran iki
          şeyi (sıklık etiketi ve çubuğun dokusu) somutlaştırıyor, kaydırmayı siliyor ve adsız
          dikey omurgaya adını veriyor. Satır içi nesne sayısı canlıyla birebir aynı: ad + cümle +
          tek çubuk + etiket. Beş halkanın adı ve cümlesi dört turdur hiç değişmedi — hepsi{" "}
          <code>brand.ts</code>&apos;teki CHAIN&apos;den geliyor.
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
          Ex · üçüncü tur
        </span>
        <p style={{ margin: "14px 0 0", maxWidth: "68ch", fontSize: 14, lineHeight: 1.6, color: "#8a8a8a" }}>
          Kabuğu doğru korudu ama satır başına okunacak nesne sayısını artırdı — canlının
          ferahlığı tam olarak &quot;her satırda tek grafik nesne&quot; olmasından geliyordu.
        </p>
      </div>
      <div style={{ opacity: 0.85 }}>
        {EX3.map(({ id, kind, Section, idea }) => (
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
          Ex · ikinci tur
        </span>
        <p style={{ margin: "14px 0 0", maxWidth: "68ch", fontSize: 14, lineHeight: 1.6, color: "#8a8a8a" }}>
          Sıklığı doğru şekilde görselleştirdi ama bölümü bir panelin içine aldı. Turun
          diğer iki adayı (Z4 · Z5) silindi.
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
