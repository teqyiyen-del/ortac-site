import Hero from "@/components/Hero";
import HeroScene from "@/components/home/HeroScene";
import HeroPortalP1 from "@/components/lab/HeroPortalP1";
import HeroPortalP2 from "@/components/lab/HeroPortalP2";
import HeroPortalP3 from "@/components/lab/HeroPortalP3";
import HeroPortalP4 from "@/components/lab/HeroPortalP4";
import HeroPortalP5 from "@/components/lab/HeroPortalP5";

/* /lab/hero-portal — hero sahnesinin "portal" okumaları · 3. tur.
   İstek iki parçalıydı: seçim bir eşiğe bakma hissi versin, ve seçilen ülkenin
   kendisi karşıya çıksın. Bugünkü hero birincisini zaten yapıyor.
   TABAN P2 ("p2 daha iyi geliyor hala"), yeni aday P5: P2'nin koridoru kutudan
   çıktı (kırpma kaldırıldı, çizgiler yukarı serbest, dikey gradyan maskeyle
   yazıya varmadan sönüyor), kemer profili ülkeye göre değişiyor, ağzın altından
   ışık süzülüyor (P1'den alındı), ızgara 0,55 opaklığa kısıldı.
   ELENENLER, müşterinin cümlesiyle: P3 "p3 de o hoşuma gitmedi",
   P4 "portalı beğenmedim p2 daha iyi geliyor hala". Silinmediler, en altta.

   P5 CANLIYA ALINDI ("p5 i live alsana hero için"). Canlı sürüm ayrı bir
   dosyada (components/home/HeroPortal.tsx + css/hero-portal.css, ad alanı
   .hgt-); buradaki lab kopyası karar kaydı olarak yerinde duruyor ve bu sayfa
   onu basmaya devam ediyor. Taban kartı artık propsuz <Hero /> DEĞİL, açıkça
   HeroScene basıyor: propsuz çağrı bugün P5'in canlı kopyasını getirir ve
   sayfada aynı sahne iki kez görünürdü — üstelik iki kopyanın periyotları aynı
   olduğu için ekranda senkron atarlardı.

   ÇERÇEVE: hepsi canlı Hero bileşenini basıyor, taklidini değil; değişen tek
   şey `scene`.
   partners={false}: hero'nun altındaki ortak şerit burada altı kez basılırdı.
   Üst bar bilerek basılmıyor (Nav position:fixed) ama kapladığı yer duruyor.
   Ülke seçimi tek zustand mağazası: bir adayda ülke değiştirmek hepsini
   değiştirir; karşılaştırma ancak hepsi aynı ülkedeyken adil.
   host: yalnız P5 dolduruyor — o adayın çizgileri hero'nun metnine kadar
   çıktığı için yığın sırası ve ızgara opaklığı yalnız o bölümde değişiyor
   (css/lab-ptl5.css · BÖLÜM 2). Sınıfsız yazılsaydı canlı ana sayfa etkilenirdi. */

type Card = {
  id: string;
  anchor: string;
  kind: string;
  Scene?: () => React.ReactElement;
  /* "ex" elenmiş adayı soluklaştırıyor, "base" o turun tabanını, "live" ise
     canlıya alınan adayı işaretliyor. */
  state?: "ex" | "base" | "live";
  not: string;
  host?: string;
};

const CARDS: Card[] = [
  {
    id: "TABAN",
    anchor: "taban",
    kind: "Önceki canlı · eşik ve tabela",
    Scene: HeroScene,
    not: "Üç kapılı sokak cephesi; duvar kayıp seçilen kapıyı ortaya alıyor, yalnız onun ışığı yanıyor.",
  },
  {
    id: "P2",
    anchor: "aday-p2",
    kind: "Portal = içinden geçilen koridor · BU TURUN TABANI",
    Scene: HeroPortalP2,
    state: "base",
    not: "Üst üste beş eşik, tek kaçış noktası; ülke koridorun sonunda, ışık o uçtan size doğru geliyor.",
  },
  {
    id: "P5",
    anchor: "aday-p5",
    kind: "P2'nin koridoru, kutusundan çıkmış hâli",
    Scene: HeroPortalP5,
    state: "live",
    host: "ptl5-host",
    not: "Halkalar yukarı serbestçe çıkıp başlığa varmadan sönüyor; kemerin biçimi ülkeye göre değişiyor, ağzın altından ışık süzülüyor.",
  },
  {
    id: "P1",
    anchor: "aday-p1",
    kind: "Portal = içinden bakılan açıklık · referans",
    Scene: HeroPortalP1,
    not: "Kapı tek ve hiç değişmiyor; açıklıkta seçilen ülkenin göğü ve silueti duruyor. Işık süzmesi P5'e buradan geldi.",
  },
  {
    id: "P3",
    anchor: "aday-p3",
    kind: "Portal = ülkenin geçtiği sınır",
    Scene: HeroPortalP3,
    state: "ex",
    not: "Zemine oturmuş bir halka, içi ülkenin göğü; o ülkenin kütlesi halkayı kırıp bu tarafa geçiyor.",
  },
  {
    id: "P4",
    anchor: "aday-p4",
    kind: "P1'in kapısı + P2'nin çizgileri",
    Scene: HeroPortalP4,
    state: "ex",
    not: "P1'in kapısı beş kez dışa yankılanıyor; ışık kapının kenarında başlayıp yankıların içinden dağılıyor.",
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

/* Elenmiş adayın rozeti: renk değil TON farkı, çünkü elenmek bir hata değil bir
   karar. Ölçülen kontrast (#0f0f0f zemin üstünde) #9a9a9a 6,72:1. */
const BADGE_EX: React.CSSProperties = {
  ...BADGE,
  background: "#1a1a1a",
  border: "1px solid #333333",
  color: "#9a9a9a",
};

/* Tabanın rozeti amber, çünkü "onaylanmış" değil "üstüne çalışılan" demek.
   Ölçülen kontrast (#2a2109 zemin üstünde) #f0c674 9,02:1. */
const BADGE_BASE: React.CSSProperties = {
  ...BADGE,
  background: "#2a2109",
  border: "1px solid #4d3d10",
  color: "#f0c674",
};

/* Canlıya alınan adayın rozeti. Tek kelime, çünkü sayfanın işi adayı
   göstermek; "hangisi seçildi" bilgisi bir cümleye değil bir renge sığar.
   Ölçülen kontrast: #86d8a6 · rozet zemininde (#0d2418) 9,66:1, hap
   zemininde (#111111) 11,14:1. */
const BADGE_LIVE: React.CSSProperties = {
  ...BADGE,
  background: "#0d2418",
  border: "1px solid #1d4a32",
  color: "#86d8a6",
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

const NOT: React.CSSProperties = {
  margin: "12px 0 0",
  maxWidth: "70ch",
  fontSize: 14,
  lineHeight: 1.6,
  color: "#a4a4a4",
};

export default function LabHeroPortalPage() {
  return (
    <main style={{ background: "var(--night)" }}>
      <div className="container-o" style={{ padding: "48px 0 32px" }}>
        <h1 className="h2" style={{ color: "#ffffff" }}>
          Hero portalı · adaylar, tam hero içinde
        </h1>

        <div
          id="adaylar"
          style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24, scrollMarginTop: ANCHOR_GAP }}
        >
          {CARDS.map((c) => (
            <a
              key={c.id}
              href={`#${c.anchor}`}
              style={c.state === "ex" ? { ...JUMP, color: "#8f8f8f" } : JUMP}
            >
              <b
                style={{
                  fontWeight: 700,
                  color:
                    c.state === "ex"
                      ? "#8f8f8f"
                      : c.state === "base"
                        ? "#f0c674"
                        : c.state === "live"
                          ? "#86d8a6"
                          : "#9cc6f5",
                }}
              >
                {c.id}
              </b>
              {c.kind}
              {c.state === "ex" ? " · elendi" : null}
              {c.state === "live" ? " · canlıda" : null}
            </a>
          ))}
        </div>
      </div>

      {CARDS.map(({ id, anchor, kind, Scene, state, not, host }) => (
        <section key={id} id={anchor} style={{ scrollMarginTop: ANCHOR_GAP }}>
          <div style={BAND}>
            <div className="container-o">
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span
                  style={
                    state === "ex"
                      ? BADGE_EX
                      : state === "base"
                        ? BADGE_BASE
                        : state === "live"
                          ? BADGE_LIVE
                          : BADGE
                  }
                >
                  {id} · {kind}
                  {state === "ex" ? " · elendi" : null}
                  {state === "live" ? " · canlıda" : null}
                </span>
                <a
                  href="#adaylar"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: "#8f8f8f",
                    textDecoration: "none",
                  }}
                >
                  ↑ adaylar
                </a>
              </div>
              <p style={state === "ex" ? { ...NOT, color: "#8a8a8a" } : NOT}>{not}</p>
            </div>
          </div>

          <div className={host}>
            <Hero scene={Scene ? <Scene /> : undefined} partners={false} />
          </div>
        </section>
      ))}
    </main>
  );
}
