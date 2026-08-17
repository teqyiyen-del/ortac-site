import { Ft2Cta, Ft2Directory } from "@/components/Footer";
import CtaKutu from "@/components/lab/CtaKutu";
import CtaSerit from "@/components/lab/CtaSerit";
import CtaKapak from "@/components/lab/CtaKapak";

/* Kapanış CTA'sı · kutu mu tam genişlik mi.
   Müşteri bir tur önce kutuyu kaldırtıp tam genişliğe geçirtti, şimdi tersini
   düşünüyor. Bu bir geri alma değil karşılaştırma: iki uç da denendi.
   Ayrışma ekseni: A en çok ayrışır (nesne), B ortada (şerit + kart),
   C en az ayrışır (footer'ın başı). Genişlik bu eksenin sonucu. */

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

const KICKER_TABAN: React.CSSProperties = {
  ...KICKER,
  background: "var(--paper)",
  color: "#8a8a8a",
};

const NOT: React.CSSProperties = {
  margin: "12px 0 0",
  maxWidth: "66ch",
  fontSize: 14,
  lineHeight: 1.6,
  color: "var(--text-600)",
};

/* Adayın üstündeki "önceki bölümün sonu". CTA açık zeminli bir bölümden sonra
   gelir; tek başına bakınca üç aday da yanlış değerlendiriliyor. İçi metin
   değil iskelet çubuk — lab ekrana yazı dökmez. */
function OncekiBolum() {
  return (
    <div className="ctal-onceki" aria-hidden="true">
      <div className="container-o">
        <div className="ctal-cizgi" style={{ maxWidth: "34%" }} />
        <div className="ctal-cizgi" style={{ maxWidth: "62%" }} />
        <div className="ctal-cizgi" style={{ maxWidth: "48%" }} />
      </div>
    </div>
  );
}

function Baslik({
  ad,
  kunye,
  taban,
}: {
  ad: string;
  kunye: string;
  taban?: boolean;
}) {
  return (
    <div
      className="container-o"
      style={{ paddingTop: 64, marginTop: 56, borderTop: "2px solid var(--border)" }}
    >
      <span style={taban ? KICKER_TABAN : KICKER}>{ad}</span>
      <p style={NOT}>{kunye}</p>
    </div>
  );
}

export default function LabCtaPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Kapanış CTA&apos;sı
        </h1>
      </div>

      {/* ---------------------------------------------- taban · bugün canlıda */}
      <Baslik
        taban
        ad="Şu an canlıda · tam genişlik"
        kunye="Kenardan kenara gece şerit, yazı sitenin hattında. Ayrışma: yüzey değişimi ve üstteki kırağı çizgisi."
      />
      <OncekiBolum />
      <footer className="ft2">
        <Ft2Cta placement="lab" />
        <Ft2Directory />
      </footer>

      {/* ------------------------------------------------------------- A */}
      <Baslik
        ad="A · Kutu — sayfanın son kartı"
        kunye="En çok ayrışan uç: CTA sayfanın içinde duran bir nesne. Kenarı, köşesi ve dört yanında beyazı var."
      />
      <OncekiBolum />
      <footer className="ft2">
        <CtaKutu />
        <Ft2Directory />
      </footer>

      {/* ------------------------------------------------------------- B */}
      <Baslik
        ad="B · Şerit + kart — şerit kapatır, kart konuşur"
        kunye="Ara cevap: gece yüzey sayfayı kenardan kenara kapatır, mesaj sınırı belli bir kartın içinde durur."
      />
      <OncekiBolum />
      <footer className="ft2">
        <CtaSerit />
        <Ft2Directory />
      </footer>

      {/* ------------------------------------------------------------- C */}
      <Baslik
        ad="C · Kapak — footer'ın başı"
        kunye="En az ayrışan uç: alt kenar yok. Gece yüzey CTA'da başlar, site dizinini de alır, sayfayla biter."
      />
      <OncekiBolum />
      <CtaKapak />
    </main>
  );
}
