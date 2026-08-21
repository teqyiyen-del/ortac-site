import FooterFB1 from "@/components/lab/FooterFB1";
import FooterFB2 from "@/components/lab/FooterFB2";

/* Kapanış CTA'sı + site dizini · zemin turu.

   Müşteri: "bide footerı siyah yapma fikrine ne dersin? şuan cta ile ayrışmıyor
   sectionlar, cta yı da full genişliğe alınca bi garip oluyor bu sefer footer
   geriplana düşüyor dikkat çekicilik olarak. ya da ikisinide birleştirip siyah
   fln yapmak lzm bilmiyorum denesene bunları bi fikir olarak."

   İkisi de canlı bileşenleri import ediyor, kopyalamıyor: dizin içeriği ve CTA
   sahnesi canlının aynısı, değişen yalnız zemin ve sınır. Ölçüldü, çıkış kaybı
   yok (30 girdi ↔ 30 girdi). */

const CANDIDATES = [
  {
    id: "FB1",
    kind: "Ayrı ama ikisi de gece",
    Section: FooterFB1,
    not: "Dizin gece yüzeye geçiyor, CTA kartı kimliğini koruyor. Aradaki sınır okunur kalıyor.",
  },
  {
    id: "FB2",
    kind: "Birleşik tek blok",
    Section: FooterFB2,
    not: "CTA üst kat, dizin alt kat, tek gece blok. Kart kenarı yok; katları gökyüzü ve ince çizgi ayırıyor.",
  },
];

const KICKER: React.CSSProperties = {
  display: "inline-flex",
  padding: "5px 12px",
  borderRadius: 999,
  background: "var(--blue-100)",
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.01em",
  color: "var(--blue-700)",
};

export default function LabFooterPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Kapanış ve dizin · zemin turu
        </h1>
      </div>

      {CANDIDATES.map(({ id, kind, Section, not }) => (
        <div key={id}>
          <div
            className="container-o"
            style={{ paddingTop: 48, marginTop: 40, borderTop: "1px solid var(--border)" }}
          >
            <span style={KICKER}>
              {id} · {kind}
            </span>
            <p
              style={{
                margin: "12px 0 0",
                maxWidth: "70ch",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              {not}
            </p>
          </div>
          <Section />
        </div>
      ))}
    </main>
  );
}
