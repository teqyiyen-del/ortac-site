import StructuresS3 from "@/components/lab/StructuresS3";
import StructuresS4 from "@/components/lab/StructuresS4";
import StructuresS5 from "@/components/lab/StructuresS5";
import StructuresS6 from "@/components/lab/StructuresS6";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* "Serbest bölge mi, mainland mi?" · ikinci tur.
   S1 ve S2 birinci turda elendi ve sayfadan çıktı; S3'ün mantığı seçildi ve bu
   turun tabanı oldu. Y4 · Y5 · Y6 "boştayken çok pasif duruyor" sorusuna üç ayrı
   cevap veriyor; kartların büyütülmesi üçünde de var.
   Y5 SEÇİLDİ ve canlıya alındı (/ulke/dubai · CountryStructures.tsx · .ys- ad
   alanı; lab kopyasıyla çakışmasın diye ad alanı değişti, harita 560x400'e çıktı
   ve karar kuralı ızgaranın üstüne taşındı).
   Dördü de COUNTRY_CONTENT.dubai.structures ile besleniyor; fark yalnız sunum.
   Haritaları tek nüsha: StructuresYapiScene. */

const DATA = COUNTRY_CONTENT.dubai.structures!;

const CANDIDATES = [
  {
    id: "S3",
    kind: "Taban · birinci tur",
    Section: StructuresS3,
    not: "Tablo değil tek bir Dubai şeması; kıyas için burada duruyor.",
  },
  {
    id: "Y4",
    kind: "Baştan seçili",
    Section: StructuresS4,
    not: "Boş hâl yok: bölüm serbest bölge seçili açılıyor.",
  },
  {
    id: "Y5",
    kind: "Nöbet · CANLIDA",
    Section: StructuresS5,
    not: "Boşta iki yapı sırayla kısık sesle kendini gösteriyor, fare değince nöbet susuyor.",
  },
  {
    id: "Y6",
    kind: "Kapalı hâl yok",
    Section: StructuresS6,
    not: "Boşta iki yapı da çizili; seçim eklemiyor, seçilmeyeni söndürüyor.",
  },
];

export default function LabStructuresPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Serbest bölge / mainland · ikinci tur
        </h1>
      </div>

      {CANDIDATES.map(({ id, kind, Section, not }) => (
        <div key={id}>
          <div
            className="container-o"
            style={{ paddingTop: 48, marginTop: 40, borderTop: "1px solid var(--border)" }}
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
                margin: "12px 0 0",
                maxWidth: "62ch",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              {not}
            </p>
          </div>
          <Section data={DATA} />
        </div>
      ))}
    </main>
  );
}
