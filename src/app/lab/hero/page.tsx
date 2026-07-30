import HeroH1 from "@/components/lab/HeroH1";
import HeroH2 from "@/components/lab/HeroH2";
import HeroH3 from "@/components/lab/HeroH3";
import HeroH4 from "@/components/lab/HeroH4";
import HeroH5 from "@/components/lab/HeroH5";

/* Dubai hero kartı — beş aday.
 *
 * Fikir cümleleri burada elle yazılı, aday dosyalarından import edilmiyor:
 * hepsi "use client" modülü ve Next bir istemci modülünden düz veri (string,
 * dizi) export etmeye izin vermiyor — sunucu bileşeni o değeri okuyamıyor.
 * Bileşen referansları sorunsuz geçiyor, düz veri geçmiyor. */

const CANDIDATES = [
  {
    id: "H1",
    kind: "Karar",
    Card: HeroH1,
    idea:
      "Kart bir şey anlatmıyor, soruyor: \"Müşteriniz nerede?\" Cevaba göre ona ait yapıyı söylüyor — BAE dışıysa serbest bölge, içindeyse mainland, yalnızca AB'ye satıyorsa açıkça \"Dubai değil, İngiltere\".",
  },
  {
    id: "H2",
    kind: "Kanıt",
    Card: HeroH2,
    idea:
      "Kart bir dosya: kuruluşun sonunda elinize geçen belgeler üst üste duruyor, öndeki açık ve okunur, diğerleri kenarıyla görünüyor. Sekmeye basan istediğini öne alıyor.",
  },
  {
    id: "H3",
    kind: "Rakam",
    Card: HeroH3,
    idea:
      "Ziyaretçi \"Dubai'de vergi yok\" cümlesini zaten duymuş geliyor. Kart yeni rakam vermiyor, elindekini düzeltiyor: %0'ı büyük gösterip yanına yıldızını koyuyor, şartı isteyene tek tıkla açıyor.",
  },
  {
    id: "H4",
    kind: "Yer",
    Card: HeroH4,
    idea:
      "Dubai bir mevzuat değil bir yer: ufuk çizgisinin üstünde gerçek boylamlara ve gerçek uçuş sürelerine göre dizilmiş dört şehir. Londra ile Singapur neredeyse eşit uzaklıkta, İstanbul dört buçuk saat.",
  },
  {
    id: "H5",
    kind: "Hareket",
    Card: HeroH5,
    idea:
      "\"Şu an buradasınız\"dan Dubai'de faal bir şirkete çıkan dikey bir yol. Yolun yalnızca iki durağında ziyaretçi var; aradaki uzun bölümde yol kalınlaşıyor, orayı biz yürüyoruz.",
  },
];

export default function LabHeroPage() {
  return (
    <main style={{ background: "var(--night)", minHeight: "100dvh", padding: "48px 0 96px" }}>
      <div className="container-o">
        <h1 className="h2" style={{ color: "#ffffff" }}>
          Dubai hero kartı — beş aday
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "62ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "#9c9c9c",
          }}
        >
          Beşi de aynı kısıtlarla yazıldı: kart koyu, beyaz yalnızca aksan, en fazla sekiz
          kısa satır, kesin gün sayısı ve banka onayı vaadi yok. Hero&apos;nun sol sütunu
          (başlık, butonlar, güven satırları) beşinde de aynı kalıyor, burada
          gösterilmiyor. Kartlar hero&apos;daki gerçek genişliğinde duruyor.
        </p>

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gap: 56,
            gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))",
          }}
        >
          {CANDIDATES.map(({ id, kind, Card, idea }) => (
            <section key={id}>
              <span
                style={{
                  display: "inline-flex",
                  gap: 8,
                  alignItems: "center",
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
                  margin: "14px 0 20px",
                  maxWidth: "58ch",
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "#9c9c9c",
                }}
              >
                {idea}
              </p>
              <Card />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
