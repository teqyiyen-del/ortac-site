import Chain from "@/components/home/Chain";
import ChainZ7 from "@/components/lab/ChainZ7";
import ChainZ8 from "@/components/lab/ChainZ8";

/* "Kuruluş bir halka, zincir devam ediyor" · dördüncü tur.
   Karar canlı tasarımı değiştirmek değil ONARMAK: açık, ferah, kutusuz düzen
   kalıyor; giden iki şey adlandırılmamış eksen ve dokuya kodlanmış sıklık.
   Z8 bu turun tek adayı. Elenenler: Z7 (kabuğu doğru korudu, satırı
   kalabalıklaştırdı), Z4-Z6 (bölümü kutuya aldı, silindi), Z1-Z3 (sıklığı
   görsel olmaktan çıkarıp yazıya çevirdi, silindi).
   Beş halkanın adı ve cümlesi dört turdur brand.ts · CHAIN'den geliyor. */

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

const KICKER_EX: React.CSSProperties = {
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

export default function LabChainPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Zincir bölümü
        </h1>
      </div>

      <div className="container-o" style={{ paddingTop: 48, marginTop: 32 }}>
        <span style={KICKER}>Z8 · Ekleyerek değil, düzelterek</span>
        <p style={NOT}>
          Satırda zaten duran iki şeyi somutlaştırıyor: sıklık etiketi ve çubuğun tırtık
          aralığı. Kaydırma silindi, adsız dikey omurga adını aldı.
        </p>
      </div>
      <ChainZ8 />

      <div
        className="container-o"
        style={{ paddingTop: 64, marginTop: 56, borderTop: "2px solid var(--border)" }}
      >
        <span style={KICKER_EX}>Z7 · Canlı tasarımın onarımı · ex</span>
        <p style={{ ...NOT, color: "#8a8a8a" }}>
          Eksen adlandırıldı, sıklık kare sayısına geçti; satır kalabalıklaştığı için elendi.
        </p>
      </div>
      <div style={{ opacity: 0.85 }}>
        <ChainZ7 />
      </div>

      <div
        className="container-o"
        style={{ paddingTop: 64, marginTop: 56, borderTop: "2px solid var(--border)" }}
      >
        <span style={KICKER_EX}>Şu an canlıda olan</span>
      </div>
      <div style={{ opacity: 0.9 }}>
        <Chain />
      </div>
    </main>
  );
}
