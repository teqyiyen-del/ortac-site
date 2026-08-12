import HeroH2 from "@/components/lab/HeroH2";
import HeroH6 from "@/components/lab/HeroH6";
import HeroH8 from "@/components/lab/HeroH8";
import HeroH9 from "@/components/lab/HeroH9";
import HeroH10 from "@/components/lab/HeroH10";
import HeroH11 from "@/components/lab/HeroH11";
import HeroH12 from "@/components/lab/HeroH12";

/* Dubai hero kartı · iki tur.
   Üstteki dördü ikinci turdan ve hepsi "süreç / hareket" mantığında; H12 seçildi
   ve canlıya alındı. Alttaki üçü birinci turdan ex: H2 (tasvir dili beğenildi,
   "bitince elinde ne var" çerçevesi düştü), H6 (mantığı seçildi, H9 olarak
   yeniden kuruldu), H8 (tasarımı beğenildi, inşa kurgusu düştü, H11 oldu).
   H1 · H3 · H4 · H5 · H7 daha önce silindi.
   Fikir cümleleri elle yazılı: adaylar "use client" modülü ve Next istemci
   modülünden düz veri export etmeye izin vermiyor, yalnız bileşen geçiyor. */

const NEW = [
  {
    id: "H9",
    kind: "Aşama · büyük",
    Card: HeroH9,
    not: "Sırası gelen aşama neredeyse bütün genişliği kaplayarak öne gelip beyazlıyor.",
  },
  {
    id: "H10",
    kind: "Dikey akış",
    Card: HeroH10,
    not: "Sol kenardaki dikey rayda beş aşama; sırası gelen olduğu yerde açılıyor.",
  },
  {
    id: "H12",
    kind: "Tek nesne · beyaz çizim · CANLIDA",
    Card: HeroH12,
    not: "H11'in kurgusu; beyaz yüzey değil mürekkep, yalnız dış hatta harcanıyor.",
  },
  {
    id: "H11",
    kind: "Tek nesne",
    Card: HeroH11,
    not: "Sabit koyu sahne, aşama değiştikçe içindeki nesne komple değişiyor.",
  },
];

const EX = [
  { id: "H2", kind: "Kanıt", Card: HeroH2, not: "Belgeler üst üste, öndeki okunur." },
  { id: "H6", kind: "Aşama kartları", Card: HeroH6, not: "Aşama kartı sahneye gelip beyazlıyor." },
  { id: "H8", kind: "İnşa", Card: HeroH8, not: "Boş dosya aşama aşama doluyor." },
];

const chip = (bg: string, bd: string, fg: string) => ({
  display: "inline-flex" as const,
  gap: 8,
  alignItems: "center" as const,
  padding: "5px 12px",
  borderRadius: 999,
  background: bg,
  border: `1px solid ${bd}`,
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: fg,
});

const NOT: React.CSSProperties = {
  margin: "12px 0 20px",
  maxWidth: "56ch",
  fontSize: 14,
  lineHeight: 1.6,
  color: "#9c9c9c",
};

export default function LabHeroPage() {
  return (
    <main style={{ background: "var(--night)", minHeight: "100dvh", padding: "48px 0 96px" }}>
      <div className="container-o">
        <h1 className="h2" style={{ color: "#ffffff" }}>
          Dubai hero kartı
        </h1>

        <div
          style={{
            marginTop: 40,
            display: "grid",
            gap: 56,
            gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))",
          }}
        >
          {NEW.map(({ id, kind, Card, not }) => (
            <section key={id}>
              <span style={chip("#152333", "#284469", "#9cc6f5")}>
                {id} · {kind}
              </span>
              <p style={NOT}>{not}</p>
              <Card />
            </section>
          ))}
        </div>

        {/* ---------------- birinci tur ---------------- */}
        <div style={{ marginTop: 96, paddingTop: 40, borderTop: "1px solid #262626" }}>
          <span style={chip("#1a1a1a", "#333333", "#9c9c9c")}>Ex · birinci tur</span>

          <div
            style={{
              marginTop: 32,
              display: "grid",
              gap: 48,
              gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
              opacity: 0.82,
            }}
          >
            {EX.map(({ id, kind, Card, not }) => (
              <section key={id}>
                <span style={chip("#1a1a1a", "#333333", "#8a8a8a")}>
                  {id} · {kind} · ex
                </span>
                <p style={{ ...NOT, color: "#707070" }}>{not}</p>
                <Card />
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
