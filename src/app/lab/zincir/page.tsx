import Chain from "@/components/home/Chain";
import ChainZ1 from "@/components/lab/ChainZ1";
import ChainZ2 from "@/components/lab/ChainZ2";
import ChainZ3 from "@/components/lab/ChainZ3";
import ChainZ4 from "@/components/lab/ChainZ4";
import ChainZ5 from "@/components/lab/ChainZ5";
import ChainZ6 from "@/components/lab/ChainZ6";

/* "Kuruluş bir halka, zincir devam ediyor" — üç alternatif.
 *
 * Anlatım beğenildi, tasarım aykırı bulundu. Üç ajan bağımsız çalıştı ve
 * teşhiste birleştiler: canlı bölüm bir GANTT / GÖREV ÇİZELGESİ ve sitede
 * ikinci bir örneği yok. İki somut sonucu var:
 *  · Anlam çubuk DOKUSUNA kodlanmış (düz / sık tırtıklı / seyrek tırtıklı),
 *    yani okumak için bir lejant çözmek gerekiyor — oysa site her yerde aynı
 *    şeyi kelimeyle söylüyor.
 *  · Bölümün bir yüzeyi yok; sitenin geri kalanı kart, kuyu ve panel
 *    yüzeyleriyle konuşuyor, burası çıplak bir eksen.
 *
 * Üçünde de beş halkanın adı ve cümlesi brand.ts'teki CHAIN'den geliyor —
 * bilgi değişmedi, değişen yalnızca sunum.
 *
 * En altta canlı bölümün kendisi duruyor, karşılaştırma için. */

const CANDIDATES = [
  {
    id: "Z4",
    kind: "Sayılabilir miktar",
    Section: ChainZ4,
    idea:
      "Zaman ekseni bir yıl, on iki kare — her kare bir ay. Sıklık dokuya değil MİKTARA kodlu: yılda bir olan iş bir kare, her ay olan iş on iki kare. Beş halka aynı eksenin üstünde, sağdaki rakam elle yazılmıyor, dolu kareler sayılarak çıkıyor.",
  },
  {
    id: "Z5",
    kind: "Tekrar eden nesne",
    Section: ChainZ5,
    idea:
      "Sıklık eksende değil nesnede: her halka bir iş kartı ve iş kaç kez tekrarlanıyorsa kart o kadar kez üst üste biniyor. Kuruluş tek yaprak, Oturum & Vize üç yapraklı ince deste, Muhasebe & Vergi sekiz yapraklı kalın deste — kalınlık farkı tek bakışta kıyaslanıyor.",
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
          Anlatım korundu — beş halkanın adı ve cümlesi hâlâ <code>brand.ts</code>&apos;teki
          CHAIN&apos;den geliyor, hiçbiri değişmedi. Değişen yalnızca sunum.
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
            Ortak teşhis
          </b>
          <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.65, color: "var(--text-600)" }}>
            Üç ajan bağımsız çalıştı ve aynı yere vardı: canlı bölüm bir{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>Gantt / görev çizelgesi</b> ve
            sitede ikinci bir örneği yok. İki somut sonucu var — anlam çubukların{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>dokusuna</b> kodlanmış (düz /
            sık tırtıklı / seyrek tırtıklı), yani okumak için lejant çözmek gerekiyor, oysa site her
            yerde aynı şeyi kelimeyle söylüyor; ve bölümün bir{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>yüzeyi</b> yok — sitenin geri
            kalanı kart, kuyu ve panel yüzeyleriyle konuşurken burası çıplak bir eksen.
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
          Ex · ilk tur
        </span>
        <p style={{ margin: "14px 0 0", maxWidth: "68ch", fontSize: 14, lineHeight: 1.6, color: "#8a8a8a" }}>
          Sıklığı yazıya çevirdikleri için düştüler — görselleştirme kaybolmuştu. Teşhisleri yine
          de doğruydu ve üstteki üç adayı yönlendirdi.
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
          Karşılaştırma için burada duruyor. Aykırılığın ne demek olduğu, üç adayın hemen ardından
          bakınca en net görünüyor.
        </p>
      </div>
      <div style={{ opacity: 0.9 }}>
        <Chain />
      </div>
    </main>
  );
}
