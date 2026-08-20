import AboutSeritNefes from "@/components/lab/AboutSeritNefes";
import AboutSeritIkili from "@/components/lab/AboutSeritIkili";
import AboutSeritSahne from "@/components/lab/AboutSeritSahne";

/* /hakkimizda · İLK ŞERİT · hero + "kim olduğumuz" + vizyon/misyon.

   Müşteri: "aslında sayfayı beğeniyorum ben sadece hero, biz kimiz, vizyon
   misyon kısımları kafamda oturmuyor oraya kafa patlatman lazım aslında."

   Yani tur sayfanın TAMAMINI değil bu üçlüyü deniyor; sayfanın geri kalanı
   canlıda kaldığı gibi duruyor. Üç aday da üçünü birden basıyor, çünkü
   şikâyet parçaların tek tek değil BİRLİKTE oturmaması. */

const CANDIDATES = [
  {
    id: "Nefes",
    kind: "Tek şerit",
    Section: AboutSeritNefes,
    not: "Üç parça üç bölüm değil; hero bitmeden kim olduğumuz, o bitmeden vizyon geliyor. Vizyon ve misyon kart değil, şeridin sonu.",
  },
  {
    id: "İkili",
    kind: "İki sütun, iki ses",
    Section: AboutSeritIkili,
    not: "Solda bugün ne yapıyoruz, sağda ne hedefliyoruz. Fark görsel değil dilsel: iki sütun iki farklı zaman kipinde konuşuyor.",
  },
  {
    id: "Sahne",
    kind: "Görselle aç",
    Section: AboutSeritSahne,
    not: "Fotoğraf yerine çizim: hero'da sitenin kendi dilinde bir sahne var, vizyon/misyon onun altında.",
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
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--blue-700)",
};

export default function LabHakkimizdaSeritPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Hakkımızda · giriş şeridi
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
