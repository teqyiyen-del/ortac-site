import Hero from "@/components/Hero";
import HeroGlobeG2 from "@/components/lab/HeroGlobeG2";
import HeroGlobeG3 from "@/components/lab/HeroGlobeG3";
import HeroGlobeG4 from "@/components/lab/HeroGlobeG4";
import HeroGlobeG5 from "@/components/lab/HeroGlobeG5";
import HeroGlobeG6 from "@/components/lab/HeroGlobeG6";

/* Ana sayfa hero'sundaki noktalı dönen küreye alternatifler. Mekanik korunuyor
   (ülke seçici üstte, seçim sahneyi değiştiriyor), giden şey yalnız küre.
   G4 · G5 · G6 bu turun adayları; G2 ve G3 kıyas için altlarında duruyor.
   G1 (düz dünya haritası) elendi ve bu turda dosyaları silindi: sahne kutusu
   4,66:1 iken harita plakası 2,55:1 idi, yani "bütün dünyayı göster" bu kutuda
   geometrik olarak mümkün değildi; ayrıca İstanbul'dan yay çekmek müşteri
   tabanını yanlış anlatıyordu.

   ÇERÇEVE: adaylar çıplak değil, canlı Hero bileşeninin kendisinin içinde;
   değişen tek şey `scene` propu. Kopya çıkarmak üçüncü gün canlıyla ayrışırdı.
   partners={false}: hero'nun altındaki ortak şeridi burada beş kez basılırdı.
   Üst bar bilerek basılmıyor (Nav position:fixed, alt alta duran hero'ların
   üstüne yapışırdı) ama kapladığı yer duruyor, yani başlığın yüksekliği doğru.
   Ülke seçimi tek zustand mağazası: bir adayda ülke değiştirmek hepsini
   değiştirir; karşılaştırma ancak hepsi aynı ülkedeyken adil. */

const CANDIDATES = [
  {
    id: "G4",
    anchor: "aday-g4",
    kind: "Belge · masa mesafesi",
    Scene: HeroGlobeG4,
    not: "Üç ülkenin belgesi masada deste hâlinde; seçilenin öne gelip ışığı üstüne alıyor. Kâğıtlarda tek harf yok.",
  },
  {
    id: "G5",
    anchor: "aday-g5",
    kind: "Pencere · içeriden",
    Scene: HeroGlobeG5,
    not: "Çerçeve ve pervaz üç ülkede de aynı; değişen tek şey camın arkasındaki ışık.",
  },
  {
    id: "G6",
    anchor: "aday-g6",
    kind: "Üstten · vaziyet planı",
    Scene: HeroGlobeG6,
    not: "Tam tepeden parsel ölçeğinde pafta; merkezdeki parsel sabit, etrafındaki doku ülkeye göre değişiyor.",
  },
  {
    id: "G2",
    anchor: "aday-g2",
    kind: "Yer · siluet",
    Scene: HeroGlobeG2,
    not: "Dünya hiç çizilmiyor: ülke kendi ufkuyla anlatılıyor, üç derinlik katmanı farklı hızda kayıyor.",
  },
  {
    id: "G3",
    anchor: "aday-g3",
    kind: "Sokak cephesi",
    Scene: HeroGlobeG3,
    not: "Bir sokak cephesi, üstünde yanan tek kapı ve o ülkenin tüzel biçimini yazan tabela.",
  },
];

/* Açıklama bandının zemini. Hero'nun gecesi #080808; bant bir ton açık. Amaç
   dekor değil SINIR: nerede bizim notumuz bitiyor, nerede hero başlıyor. */
const BAND: React.CSSProperties = {
  background: "#111111",
  borderTop: "1px solid #262626",
  borderBottom: "1px solid #262626",
  padding: "22px 0 20px",
};

const BADGE: React.CSSProperties = {
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
};

/* Bağlantıyla gelen bölümün tepesi lab'in sticky şeridinin altında kalmasın
   diye pay. Şerit sabit yükseklikte değil (haplar dar ekranda alt satıra
   kayıyor), o yüzden bilerek cömert. */
const ANCHOR_GAP = 132;

const JUMP: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "9px 16px",
  borderRadius: 999,
  border: "1px solid #262626",
  background: "#111111",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 13,
  color: "#e6e6e6",
  textDecoration: "none",
};

export default function LabHeroWorldPage() {
  return (
    <main style={{ background: "var(--night)" }}>
      <div className="container-o" style={{ padding: "48px 0 32px" }}>
        <h1 className="h2" style={{ color: "#ffffff" }}>
          Hero dünyası · küreye alternatifler
        </h1>

        {/* Her aday tam ekran kapladığı için sayfa beş ekran uzunluğunda; şerit
            doğrudan bir adaya atlamak için. Sticky yapılmadı: ekranın üstünde
            duran ikinci bir çubuk ilk ekranı örter ve değerlendirmeyi bozar. */}
        <div
          id="adaylar"
          style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24, scrollMarginTop: ANCHOR_GAP }}
        >
          {CANDIDATES.map((c) => (
            <a key={c.id} href={`#${c.anchor}`} style={JUMP}>
              <b style={{ fontWeight: 700, color: "#9cc6f5" }}>{c.id}</b>
              {c.kind}
            </a>
          ))}
        </div>
      </div>

      {CANDIDATES.map(({ id, anchor, kind, Scene, not }) => (
        <section key={id} id={anchor} style={{ scrollMarginTop: ANCHOR_GAP }}>
          <div style={BAND}>
            <div className="container-o">
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={BADGE}>
                  {id} · {kind}
                </span>
                <a
                  href="#adaylar"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: "#707070",
                    textDecoration: "none",
                  }}
                >
                  ↑ adaylar
                </a>
              </div>
              <p style={{ margin: "12px 0 0", maxWidth: "66ch", fontSize: 14, lineHeight: 1.6, color: "#9c9c9c" }}>
                {not}
              </p>
            </div>
          </div>

          <Hero scene={<Scene />} partners={false} />
        </section>
      ))}
    </main>
  );
}
