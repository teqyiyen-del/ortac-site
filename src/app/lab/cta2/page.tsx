import CtaDekKure from "@/components/lab/CtaDekKure";
import CtaDekYorunge from "@/components/lab/CtaDekYorunge";
import CtaDekUfuk from "@/components/lab/CtaDekUfuk";

/* Kapanış CTA'sı · İKİNCİ TUR · DEKORATİF.

   Birinci turun üç adayı reddedildi ve silindi. Müşteri: "3 cta da bok gibi
   olmuş kral. işlevsel olsun diye bir şeyler anlatmak istemişsin ama karman
   çorman olmuş. bana daha dekoratif kafada bir cta lzm bişi anlatmasın ztn
   her boku anlattık ya... dünya üzerinden gidelim ama o mantıklı."

   Bu turun tek kuralı: SAHNE HİÇBİR ŞEY ANLATMIYOR. Hiçbir öge bir veriye
   karşılık gelmiyor, sahnede etiket ve rakam yok. Ekrandaki toplam metin
   rozet + iki satır başlık + tek düğme; üçünde de aynı ve canlı CTA'dan
   geliyor, yeni vaat yok. */

const CANDIDATES = [
  {
    id: "K1",
    kind: "Küre · tel kafes dünya",
    Section: CtaDekKure,
    not: "Ortada ince çizgili bir dünya, çevresinde yörüngeler; bayrak diskleri ve uçaklar sessizce dolaşıyor.",
  },
  {
    id: "K2",
    kind: "Yörünge · küre yok, yalnız yaylar",
    Section: CtaDekYorunge,
    not: "Örneğe en yakın olan: iç içe geçmiş geniş yaylar, üstlerinde farklı hızlarda ilerleyen diskler ve uçaklar.",
  },
  {
    id: "K3",
    kind: "Ufuk · gece sahne, kayan yıldız",
    Section: CtaDekUfuk,
    not: "Dolgu yok: ortak bir merkeze bağlı üç temiz yay, üstlerinde üç bayrak diski ve yıldızların içinden geçen bir uçak.",
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
          Kapanış CTA · dekoratif tur
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
