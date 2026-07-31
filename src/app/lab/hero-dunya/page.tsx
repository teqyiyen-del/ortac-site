import HeroGlobeG1 from "@/components/lab/HeroGlobeG1";
import HeroGlobeG2 from "@/components/lab/HeroGlobeG2";
import HeroGlobeG3 from "@/components/lab/HeroGlobeG3";

/* Ana sayfa hero'sundaki dünyaya alternatifler.
 *
 * Şikâyet klişeydi: noktalı dönen küre bu sektörde herkeste var. Mekanik
 * korunuyor (ülke seçici üstte, seçim sahneyi değiştiriyor), giden şey yalnızca
 * kürenin kendisi.
 *
 * Üçü de hero'nun gerçek zemininde (#080808) duruyor ve seçiciyi kendileri
 * render ediyor — canlıdaki HeroGlobe gibi tek parça, yani birini seçince
 * doğrudan yerine konabilir. */

const CANDIDATES = [
  {
    id: "G1",
    kind: "Düz dünya haritası",
    Scene: HeroGlobeG1,
    idea:
      "Dönen bir gezegen değil, açık bir dünya haritası üzerinde duran bir kamera: bayrak seçilince kamera o ülkeye kayıp yaklaşıyor, ülke mavi doluyor, İstanbul'dan yay çiziliyor.",
    why:
      "Küreyi küre yapan şey nokta bulutu değil siluet — dairesel limb, kenara doğru sönen ışık, dönerken kenardan kaybolan kara. Üçü de yok: sahne dikdörtgen bir plaka, düz kenarlı, enlem/boylam ızgaralı, sol altta canlı koordinat okuması var. Hareket de dönme değil, kaydırma + yaklaşma.",
  },
  {
    id: "G2",
    kind: "Yer · siluet",
    Scene: HeroGlobeG2,
    idea:
      "Dünya hiç çizilmiyor: seçilen ülke kendi ufkuyla anlatılıyor — Dubai'nin dikey kulesi, Londra'nın karışık hattı, Girne'nin yatay Beşparmak sırtı ve kalesi. Üç derinlik katmanı farklı hızlarda kayıyor.",
    why:
      "Harita coğrafyayı anlatır (\"burası dünyanın şurası\") ve o cümleyi herkes aynı küreyle kuruyor; siluet YERİ anlatır ve kopyalanamaz, çünkü çizim ülkenin kendisine ait. Mekanik farkı da yüzeysel değil: küre bir nesnenin döndürülmesi, buradaki bir yolculuk.",
  },
  {
    id: "G3",
    kind: "Sokak cephesi",
    Scene: HeroGlobeG3,
    idea:
      "Seçilen ülkede kurulmuş şirketin kendisi: bir sokak cephesi, üstünde yanan tek kapı, yanında \"Şirketiniz · o ülkenin tüzel biçimi\" yazan tabela.",
    why:
      "Ölçek tersine döndü — küre 10.000 km'den bakıyordu, bu sahne göz hizasından bir adresin önünden bakıyor. Coğrafya sıfır: projeksiyon, kıyı çizgisi, İstanbul rotası, nokta bulutu yok. Şehir silueti de bilerek elendi: Dubai skyline'ı bu sektörde küreden bile büyük klişe.",
  },
];

export default function LabHeroWorldPage() {
  return (
    <main style={{ background: "var(--night)", minHeight: "100dvh", padding: "48px 0 96px" }}>
      <div className="container-o">
        <h1 className="h2" style={{ color: "#ffffff" }}>
          Hero dünyası — üç alternatif
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "66ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "#9c9c9c",
          }}
        >
          Küre gidiyor, mekanik kalıyor: ülke seçici üstte duruyor ve seçim sahneyi
          değiştiriyor. Üçü de hero&apos;nun gerçek zemininde ve seçiciyi kendileri render
          ediyor, yani biri seçilince doğrudan yerine konabilir.
        </p>
      </div>

      {CANDIDATES.map(({ id, kind, Scene, idea, why }) => (
        <section key={id} style={{ marginTop: 64 }}>
          <div className="container-o">
            <span
              style={{
                display: "inline-flex",
                padding: "5px 12px",
                borderRadius: 999,
                background: "#152333",
                border: "1px solid #284469",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#9cc6f5",
              }}
            >
              {id} · {kind}
            </span>
            <p
              style={{
                margin: "14px 0 6px",
                maxWidth: "66ch",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "#9c9c9c",
              }}
            >
              {idea}
            </p>
            <p style={{ margin: 0, maxWidth: "70ch", fontSize: 13.5, lineHeight: 1.6, color: "#707070" }}>
              <b style={{ fontWeight: 600 }}>Küreden nerede ayrılıyor:</b> {why}
            </p>
          </div>
          <div style={{ marginTop: 24 }}>
            <Scene />
          </div>
        </section>
      ))}
    </main>
  );
}
