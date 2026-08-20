import CtaYorunge from "@/components/lab/CtaYorunge";
import CtaEsik from "@/components/lab/CtaEsik";
import CtaAkis from "@/components/lab/CtaAkis";

/* Kapanış CTA'sı · ÜSLUP TURU.

   Müşteri: "senden böyle tamamen özgün farklı kafada cta denemeni istiyorum
   belki tarzda değişiklik yapabiliriz biraz aniamsyonlu hareketli bir şeyler
   olabilir sadece text yazmak yerine."

   Bu yüzden üçü de "sitenin kendi dilini kullan" kuralının dışında duruyor;
   sabit tutulan tek şey marka jetonları, kontrast eşikleri ve hareket kuralı.
   Canlı CTA (.kcta- · Kutu) yerinde, tura girmiyor. */

const CANDIDATES = [
  {
    id: "Yörünge",
    kind: "Üç ülke, üç yörünge",
    Section: CtaYorunge,
    not: "Merkezde firma, çevresinde üç ülke kendi yörüngesinde. Yarıçap keyfî değil, ülkenin kuruluş süresine bağlı.",
  },
  {
    id: "Eşik",
    kind: "İçinden geçiş",
    Section: CtaEsik,
    not: "Hero'da kapıya bakıyorsunuz, kapanışta içinden geçiyorsunuz. Katmanlar farklı hızda, derinlik hissi hareketten geliyor.",
  },
  {
    id: "Akış",
    kind: "Zincir işliyor",
    Section: CtaAkis,
    not: "Beş halkalı zincir canlı canlı yürüyor; düğmeye basınca o akışın başına giriyorsunuz.",
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

export default function LabCta2Page() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Kapanış CTA · üslup turu
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
