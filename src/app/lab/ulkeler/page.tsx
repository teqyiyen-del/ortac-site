import CountriesC1 from "@/components/lab/CountriesC1";
import CountriesC2 from "@/components/lab/CountriesC2";
import CountriesC3 from "@/components/lab/CountriesC3";

/* Ana sayfadaki ülkeler bölümü — üç aday, tam genişlikte, üst üste.
   Kartlar değil bölümler karşılaştırıldığı için ızgara yok: her aday
   ana sayfada duracağı ölçüde duruyor. */

const CANDIDATES = [
  {
    id: "C1",
    kind: "En az",
    Section: CountriesC1,
    idea:
      "Ana sayfa kıyas yapmayı bırakıyor: üç ülke eşit ağırlıkta üç kapı (bayrak + ad + o ülkeyi ayıran tek cümle + dürüst kısıt). Kıyas isteyen tek satırlık çıkışla /ulkeler'e gidiyor.",
    height: "1440px'te 1209 → 695 px (−%43)",
  },
  {
    id: "C2",
    kind: "Soru",
    Section: CountriesC2,
    idea:
      "Kıyas tablosu yok, tek bir soru var: \"Önceliğiniz hangisi?\" Dört cevaptan biri seçilince üç ülkeden biri öne çıkıyor ve altta tek cümlelik bir teşhis beliriyor.",
    height: "boşta belirgin şekilde kısa, seçim yapılınca açılıyor",
  },
  {
    id: "C3",
    kind: "Görsel",
    Section: CountriesC3,
    idea:
      "Kürenin yerine tek bir ufuk çizgisi: gerçek boylamlara göre çizilmiş bir yay üzerinde İstanbul'un iki yanında üç bayrak. \"Hangi ülke nerede ve bana ne kadar yakın\" sorusunu tek kelime yazmadan cevaplıyor.",
    height: "metin en aza indi, bilgi görselde",
  },
];

export default function LabCountriesPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Ana sayfa · ülkeler bölümü — üç aday
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "62ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          Üçü de aynı soruyu cevaplıyor: ana sayfa bir vitrin, satışın kendisi değil.
          Detaylı kıyas zaten /ulkeler sayfasında duruyor, bu bölümün tek işi ziyaretçiyi
          doğru ülkeye yollamak.
        </p>
      </div>

      {CANDIDATES.map(({ id, kind, Section, idea, height }) => (
        <div key={id}>
          <div
            className="container-o"
            style={{ paddingTop: 56, borderTop: "1px solid var(--border)", marginTop: 40 }}
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
                maxWidth: "60ch",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              {idea}
            </p>
            <p style={{ fontSize: 13, color: "#8a8a8a" }}>{height}</p>
          </div>
          <Section />
        </div>
      ))}
    </main>
  );
}
