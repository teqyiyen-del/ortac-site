import ProcessP1 from "@/components/lab/ProcessP1";
import ProcessP2 from "@/components/lab/ProcessP2";
import ProcessP3 from "@/components/lab/ProcessP3";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* Süreç bölümü — üç aday, Dubai'nin yedi adımıyla.
 *
 * Bu tur bir tasarım turu olduğu kadar bir teşhis turuydu: üç ajana da önce
 * "ana sayfadaki süreç neden clean hissettiriyor da bu hissettirmiyor" diye
 * soruldu, çünkü dördüncü bir denemeyi teşhissiz yapmanın anlamı yoktu.
 * Üçü birbirinden bağımsız çalıştı ve aynı yere vardı — teşhis aşağıda. */

const STEPS = COUNTRY_CONTENT.dubai.steps;
const TITLE = "Dubai'de süreç, adım adım.";

const CANDIDATES = [
  {
    id: "P1",
    kind: "Aynı dil, daha az yük",
    Section: ProcessP1,
    idea:
      "Ana sayfanın rayı birebir alındı (nokta + iplik, 15px başlık, tek gri alt satır) ve ülke sayfasının fazladan taşıdığı ne varsa atıldı. Ziyaretçi iki bölümü aynı ailenin üyesi olarak tanıyor.",
  },
  {
    id: "P2",
    kind: "Gruplama",
    Section: ProcessP2,
    idea:
      "Yedi adım yedi eşit satır olduğu için liste gibi okunuyordu. Adımlar anlamlı kümelere ayrıldı; göz yedi şey yerine üç şey görüyor, küme açılınca içindeki adımlar geliyor.",
  },
  {
    id: "P3",
    kind: "Yatay yol",
    Section: ProcessP3,
    idea:
      "Dikey ray yerine yatay güzergâh: adımlar soldan sağa duraklar, seçili durak tek bir sahneyle açılıyor. Dikeyde yer kaplamıyor, yedi durak liste değil yol gibi okunuyor.",
  },
];

export default function LabProcessPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Süreç bölümü — üç aday
        </h1>

        <div
          style={{
            marginTop: 20,
            padding: "20px 22px",
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
          <p
            style={{
              marginTop: 10,
              fontSize: 14.5,
              lineHeight: 1.65,
              color: "var(--text-600)",
            }}
          >
            Üç ajan bağımsız çalıştı ve aynı sonuca vardı: sorun adım sayısı değil,{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>
              satır başına düşen nesne sayısı
            </b>
            . Ana sayfanın ray satırı 2-3 parça taşıyor (nokta, başlık, tek gri alt satır) ve
            tek aksan rengi var; ülke sayfasınınki 5 parça taşıyor (38px dolu simge karesi,
            mavi sıra numarası, 18,5px kalın başlık, koyu süre etiketi, renkli
            &quot;kimde&quot; rozeti) ve üç ayrı renk sistemi çalışıyor. Çarpınca 5×3=15&apos;e
            karşı 7×5=35 nesne. Üstüne iki şey daha ekleniyor: aynı şeyi söyleyen{" "}
            <b style={{ fontWeight: 600, color: "var(--text-900)" }}>iki ilerleme göstergesi</b>{" "}
            (satır altı sayaç + kart dibindeki şerit), ve kartın raya gerilmesinin ürettiği
            boşluk — 1440px&apos;te kartın yaklaşık %29&apos;u boş siyah. Bölüm aynı anda solda
            kalabalık, sağda boş.
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
                maxWidth: "64ch",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              {idea}
            </p>
          </div>
          <Section steps={STEPS} title={TITLE} />
        </div>
      ))}
    </main>
  );
}
