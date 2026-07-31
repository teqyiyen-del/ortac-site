import StructuresS1 from "@/components/lab/StructuresS1";
import StructuresS2 from "@/components/lab/StructuresS2";
import StructuresS3 from "@/components/lab/StructuresS3";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* "Serbest bölge mi, mainland mi?" — üç aday.
   Üçü de canlı veriyle (COUNTRY_CONTENT.dubai.structures) besleniyor; aradaki
   fark yalnızca sunum, içerik değil. Bölüm hero'dan hemen sonra geldiği için
   üçü de "fazla teknik durmama" kısıtıyla yazıldı. */

const DATA = COUNTRY_CONTENT.dubai.structures!;

const CANDIDATES = [
  {
    id: "S1",
    kind: "Çerçeve",
    Section: StructuresS1,
    idea:
      "Kıyas ızgarası değil karar ağacı: karar kuralı en üstte tam genişlikte bir şerit, oradan çıkan iki çizgi iki kartın merkezine iniyor, her kart kendi kapak çiziminin altında tek bir koşul cümlesi kuruyor.",
    h: "kapalı bölüm ~1028px",
  },
  {
    id: "S2",
    kind: "Tek soru",
    Section: StructuresS2,
    idea:
      "Bölüm kıyas sunmadan önce soruyor: \"Müşteriniz nerede?\" İki cevap çizilmiş bir karar ağacının iki dalı; seçilen dal açılıp yalnızca o yapıyı anlatıyor. Karar kuralı okunacak bir cümle değil, bölümün çalışma mekaniği.",
    h: "kapalı bölüm ~866px",
  },
  {
    id: "S3",
    kind: "Şema",
    Section: StructuresS3,
    idea:
      "Tablo değil tek bir Dubai şeması: kıyı = kararın döndüğü sınır, çitli parseller = serbest bölgeler, ortadaki kutu = siz. Ziyaretçi \"müşterim BAE dışında / içinde\" diyerek şemayı kendi yapısına çeviriyor.",
    h: "şema seçime göre değişiyor",
  },
];

export default function LabStructuresPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Serbest bölge / mainland — üç aday
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
          Bölüm Dubai sayfasında hero&apos;dan hemen sonra geliyor: ziyaretçi ülkeyi henüz
          tanımadan buraya varıyor. Üçü de bu yüzden tablo olmamaya, karar kuralını görünür
          tutmaya ve &quot;dikkat edin&quot; maddesini gizlememeye göre yazıldı. İçerik
          üçünde de aynı veriden geliyor.
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
