import StructuresS3 from "@/components/lab/StructuresS3";
import StructuresS4 from "@/components/lab/StructuresS4";
import StructuresS5 from "@/components/lab/StructuresS5";
import StructuresS6 from "@/components/lab/StructuresS6";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* "Serbest bölge mi, mainland mi?" — İKİNCİ TUR.
 *
 * Müşteri birinci turda S3'ün MANTIĞINI seçti ("s3 ü daha mantıklı buluyoruz")
 * ve üç düzeltme istedi:
 *   1. Sağdaki iki kart daha büyük olsun.
 *   2. Boştayken sahne çok pasif duruyor. İki çözüm önerdi: ya hover olmadan
 *      da ikisini az gösteren dinamik bir hâl, ya da serbest bölge baştan
 *      seçili gelsin.
 *   3. Bu turu S3'ün üzerinden yürütelim.
 *
 * Bu yüzden S1 ve S2 sayfadan çıktı (bileşenleri duruyor, kararı verilmiş bir
 * kıyası tekrar göstermenin faydası yok) ve S3 taban olarak en üstte kaldı.
 * Altındaki üç aday 2. maddeye ÜÇ FARKLI cevap veriyor; kart büyümesi ve
 * canlı bölümün bu turdaki kazanımları (kısa başlık, sevkiyat tanesi, sınırı
 * kesen/kesmeyen satış) üçünde de var.
 *
 * Dördü de canlı veriyle (COUNTRY_CONTENT.dubai.structures) besleniyor;
 * aradaki fark yalnızca sunum, içerik değil. */

const DATA = COUNTRY_CONTENT.dubai.structures!;

const CANDIDATES = [
  {
    id: "S3",
    kind: "Taban · birinci tur",
    Section: StructuresS3,
    idea:
      "Müşterinin beğendiği mantık: tablo değil tek bir Dubai şeması. Kıyı = kararın döndüğü sınır, çitli parseller = serbest bölgeler, ortadaki kutu = siz. Kıyas için burada duruyor.",
    h: "boşta harita nötr, sağdaki kartlar 464x69px (1440'ta)",
  },
  {
    id: "Y4",
    kind: "Baştan seçili",
    Section: StructuresS4,
    idea:
      "Boş hâl diye bir şey yok: bölüm serbest bölge seçili açılıyor, harita mavi ve sevkiyat kıyıyı geçiyor. Varsayılan keyfi değil, verinin kendi cümlesi (\"kuruluşların büyük çoğunluğu burada\"). Feda edilen: soru sorulmuş hâlde durmuyor, mainland yapısal olarak ikinci sırada.",
    h: "boşta 2 animasyon · 8.3s · kart 616x335 (seçili) ve 616x187 · S3'te 464x69",
  },
  {
    id: "Y5",
    kind: "Nöbet",
    Section: StructuresS5,
    idea:
      "Boşta hiçbir şey seçili değil ama hiçbir şey de durmuyor: 10.7 saniyelik turun ilk yarısında serbest bölge, ikinci yarısında mainland kısık sesle kendini gösteriyor, sağdaki kartlar da sırayla yanıyor. Fare değdiği anda nöbet susuyor. Feda edilen: boşta sürekli değişen bir sahne, gözün ucunda gürültü olabiliyor.",
    h: "boşta 12 animasyon · 10.7s · kart 602x185 kapalı · S3'te 464x69",
  },
  {
    id: "Y6",
    kind: "Kapalı hâl yok",
    Section: StructuresS6,
    idea:
      "Kendi cevabım: boş hâl sahnenin en dolu hâli. Boşta iki yapı da çizili, iki sevkiyat aynı anda yola çıkıyor, iki kartın listesi de açık. Seçim eklemiyor, çıkarıyor: seçilmeyen taraf sönüyor. Feda edilen: mavinin \"sizin sahanız\" sözleşmesi boş hâlde esniyor, temiz tek yapı okuması ancak seçimden sonra geliyor.",
    h: "boşta 6 animasyon · 6.7s · kart 637x335, ikisi de açık · S3'te 464x69",
  },
];

export default function LabStructuresPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Serbest bölge / mainland · ikinci tur
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "64ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          En üstteki S3 birinci turun kazananı ve bu turun tabanı; altındaki üç aday onun
          mantığını koruyup iki şeyi değiştiriyor: sağdaki kartlar büyüdü, ve &quot;boştayken
          çok pasif duruyor&quot; sorusuna üçü üç ayrı cevap veriyor. Sahne dördünde de aynı
          veriden besleniyor. Adayların haritası tek nüsha (
          <code>StructuresYapiScene</code>); değişen şey o haritanın hangi durumda ne yaptığı.
        </p>
      </div>

      {CANDIDATES.map(({ id, kind, Section, idea, h }) => (
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
                margin: "14px 0 4px",
                maxWidth: "62ch",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              {idea}
            </p>
            <p style={{ fontSize: 13, color: "#8a8a8a" }}>{h}</p>
          </div>
          <Section data={DATA} />
        </div>
      ))}
    </main>
  );
}
