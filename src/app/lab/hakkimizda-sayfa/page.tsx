import AboutSayfaA from "@/components/lab/AboutSayfaA";
import AboutSayfaB from "@/components/lab/AboutSayfaB";
import AboutSayfaC from "@/components/lab/AboutSayfaC";

/* /hakkimizda · SAYFANIN TAMAMI · sıfırdan tur.

   Müşteri: "hakkımızda kısmını beğenemedim kral sen onu biraz daha farklı
   düşünerek burda kısılı kalmadan tamamen 0 dan düşünerek bir şeyler dene."

   Bu yüzden üç aday da canlı sayfanın bölüm sırasını DEVRALMIYOR; üçü de
   sayfanın hangi soruyu cevapladığını değiştiriyor. Ayrıştıkları eksen bu,
   görsel süs değil:

     Defter → sayfa bir iddia/dayanak defteri; kutu yok, taşıyıcı nesne satır.
     Zincir → sayfa bir güzergâh; beş halka tek omurgada, her halkada kanıt.
     Cephe  → sayfa coğrafyayla açılıyor; omurga üç ofisin gerçek adres defteri.

   Üçünde de kalkan iki şey (müşterinin bu turdaki iki ayrı isteği):
   fotoğraf altındaki "temsilî" künyesi ve vizyon/misyon altındaki "firmanın
   kendi resmî ifadesi" notu. */

const CANDIDATES = [
  {
    id: "Defter",
    kind: "İddia ve dayanağı",
    Section: AboutSayfaA,
    not: "Her iddia satırın solunda, dayanağı sağında. Kart ızgarası hiç yok; üç ülke stok fotoğrafla değil gerçek adres ve hatla anlatılıyor.",
  },
  {
    id: "Zincir",
    kind: "Güzergâh",
    Section: AboutSayfaB,
    not: "Beş halka kesintisiz tek omurgada iniyor; her halkada o adımın kanıtı ayrı bir şekille. Ülke bilgisi kendi bölümünü bırakıp halkaların içine dağılıyor.",
  },
  {
    id: "Cephe",
    kind: "Önce coğrafya",
    Section: AboutSayfaC,
    not: "Sorusu 'Ortac kim' değil 'benim ülkemde eli var mı'. Omurga üç ofisin adres, telefon ve e-postasını basan bir defter.",
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

export default function LabHakkimizdaSayfaPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Hakkımızda · sayfanın tamamı
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
