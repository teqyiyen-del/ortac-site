import AboutSeritKart from "@/components/lab/AboutSeritKart";
import AboutSeritSahne from "@/components/lab/AboutSeritSahne";
import AboutSeritBolum from "@/components/lab/AboutSeritBolum";

/* /hakkimizda · İLK ŞERİT · DÖRDÜNCÜ TUR · SİTENİN KENDİ DİLİ.

   Üç tur reddedildi. Dördüncüde sebep anlaşıldı: adaylar sitede karşılığı
   olmayan biçimler uyduruyordu. Müşteri: "BUNLAR NE BİZİM ORTACLA NE ALAKASI
   VAR SİTENİN KALANINA UYGUN BİR ŞEY ÇÖZ."

   Bu turda yeni biçim icat etmek YASAKLANDI. Üçü de sayfanın mevcut
   sınıflarını devralıyor; kendi önekleri yalnız yerleşim için. Ayrıştıkları
   eksen hangi mevcut kalıbı taban aldıkları. */

const CANDIDATES = [
  {
    id: "HS1",
    kind: "Kart · sitenin kart ızgarası",
    Section: AboutSeritKart,
    not: "Fotoğraf sitenin kendi kart kalıbında; katkı biçim değil yerleşim.",
  },
  {
    id: "HS2",
    kind: "Sahne · hx-card + hx-stage",
    Section: AboutSeritSahne,
    not: "Sitenin en karakteristik kalıbı: beyaz kart gövdesi, içinde gece sahne. Kare sahnede, metin gövdede.",
  },
  {
    id: "HS3",
    kind: "Bölüm · sayfanın bölüm ritmi",
    Section: AboutSeritBolum,
    not: "Üç ayrı sec-pad bölümü, zemin sırası sayfanın kendi sırasında. Sayfanın kalanından ayırt edilmiyor.",
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
