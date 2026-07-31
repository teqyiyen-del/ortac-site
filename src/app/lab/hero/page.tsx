import HeroH1 from "@/components/lab/HeroH1";
import HeroH2 from "@/components/lab/HeroH2";
import HeroH3 from "@/components/lab/HeroH3";
import HeroH4 from "@/components/lab/HeroH4";
import HeroH5 from "@/components/lab/HeroH5";
import HeroH6 from "@/components/lab/HeroH6";
import HeroH7 from "@/components/lab/HeroH7";
import HeroH8 from "@/components/lab/HeroH8";
import HeroH9 from "@/components/lab/HeroH9";
import HeroH10 from "@/components/lab/HeroH10";
import HeroH11 from "@/components/lab/HeroH11";

/* Dubai hero kartı — iki tur.
 *
 * Üstteki üç aday ikinci turdan: hepsi "süreç / hareket" mantığında, çünkü
 * birinci turda beğenilen yön oydu (H5) ve beğenilen estetik H2'nin SVG
 * tasvir diliydi — ama "bitince elinde ne var" çerçevesi düştü.
 *
 * Alttaki beş aday birinci turdan ve EX olarak duruyor: silinmediler, karar
 * verirken yan yana görülebilsinler diye. Aralarından H2 ve H5 ikinci turu
 * yönlendirdi.
 *
 * Fikir cümleleri burada elle yazılı, aday dosyalarından import edilmiyor:
 * hepsi "use client" modülü ve Next bir istemci modülünden düz veri (string)
 * export etmeye izin vermiyor. Bileşen referansları geçiyor, veri geçmiyor. */

const NEW = [
  {
    id: "H9",
    kind: "Aşama · büyük",
    Card: HeroH9,
    idea:
      "Sahne tek karttır: sırası gelen aşama neredeyse bütün genişliği kaplayarak öne gelip beyazlıyor ve kendi çizimini oynatıyor; sıradaki iki aşama sağ uçta yalnızca birer kenar dilimi olarak var oluyor.",
    diff: "H6'dan türedi. İki şikâyet çözüldü: bekleyen kartlar artık aynı alanı kaplamıyor (ölü alan gitti) ve düzen dikey oranda yeniden kuruldu.",
  },
  {
    id: "H10",
    kind: "Dikey akış",
    Card: HeroH10,
    idea:
      "Sol kenardaki dikey rayda beş aşama alt alta; sırası gelen aşama olduğu yerde büyük bir beyaz karta açılıp çizimini oynatıyor, biten yukarıda küçülüp griye düşerken rayın o parçası maviye dönüyor.",
    diff: "H7'den türedi — yatay film bandı 90° çevrildi. Yedek plan: H9 yerine koyunca karışık gelirse bu.",
  },
  {
    id: "H11",
    kind: "Tek nesne",
    Card: HeroH11,
    idea:
      "Sabit koyu bir sahne çerçevesi var, aşama değiştikçe içindeki nesne komple değişiyor: seçim listesi, imzalanan dosya, mühürlenen lisans, taranan parmak izi, bankaya giden dosya.",
    diff: "H8'in temiz düzeninden türedi, inşa kurgusu çıkarıldı — artık bir şey inşa edilmiyor, süreç akıyor.",
  },
];

const EX = [
  {
    id: "H1",
    kind: "Karar",
    Card: HeroH1,
    idea:
      "Kart soruyor: \"Müşteriniz nerede?\" Cevaba göre yapıyı söylüyor — yalnızca AB'ye satıyorsanız açıkça \"Dubai değil, İngiltere\".",
  },
  {
    id: "H2",
    kind: "Kanıt",
    Card: HeroH2,
    idea:
      "Elinize geçen belgeler üst üste, öndeki okunur. Tasvir dili beğenildi, \"bitince elinde ne var\" çerçevesi beğenilmedi.",
  },
  {
    id: "H3",
    kind: "Rakam",
    Card: HeroH3,
    idea: "%0'ı büyük gösterip yıldızını yanına koyuyor; şartı isteyene tek tıkla açıyor.",
  },
  {
    id: "H4",
    kind: "Yer",
    Card: HeroH4,
    idea: "Gerçek boylamlara ve uçuş sürelerine göre dizilmiş dört şehir.",
  },
  {
    id: "H5",
    kind: "Hareket",
    Card: HeroH5,
    idea: "Dikey yol; iki durakta ziyaretçi var, aradaki uzun bölümü biz yürüyoruz. İkinci turun çıkış noktası.",
  },
  {
    id: "H6",
    kind: "Aşama kartları",
    Card: HeroH6,
    idea: "Aşama kartı sahneye gelip beyazlıyor. Mantığı seçildi; fazla yatay olduğu ve bekleyen kart ölü alan kapladığı için H9 olarak yeniden kuruldu.",
  },
  {
    id: "H7",
    kind: "Tek şerit",
    Card: HeroH7,
    idea: "Yatay film bandı, sabit \"şimdi\" noktası. H10 olarak dikeye çevrildi.",
  },
  {
    id: "H8",
    kind: "İnşa",
    Card: HeroH8,
    idea: "Boş dosya aşama aşama doluyor. Tasarımı beğenildi, inşa kurgusu düştü — H11 olarak uyarlandı.",
  },
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

export default function LabHeroPage() {
  return (
    <main style={{ background: "var(--night)", minHeight: "100dvh", padding: "48px 0 96px" }}>
      <div className="container-o">
        <h1 className="h2" style={{ color: "#ffffff" }}>
          Dubai hero kartı
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "64ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "#9c9c9c",
          }}
        >
          Üçü de süreç/hareket mantığında: sonuç envanteri değil, olan biteni boğmadan
          hissettirmek. Hepsi aynı kısıtlarla yazıldı — kart koyu, beyaz yalnızca aksan, en
          fazla sekiz kısa satır, kesin gün sayısı ve banka onayı vaadi yok.
          Hero&apos;nun sol sütunu üçünde de aynı kalıyor, burada gösterilmiyor.
        </p>

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gap: 56,
            gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))",
          }}
        >
          {NEW.map(({ id, kind, Card, idea, diff }) => (
            <section key={id}>
              <span style={chip("#152333", "#284469", "#9cc6f5")}>
                {id} · {kind}
              </span>
              <p
                style={{
                  margin: "14px 0 6px",
                  maxWidth: "58ch",
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "#9c9c9c",
                }}
              >
                {idea}
              </p>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "#707070" }}>{diff}</p>
              <Card />
            </section>
          ))}
        </div>

        {/* ---------------- birinci tur ---------------- */}
        <div style={{ marginTop: 96, paddingTop: 40, borderTop: "1px solid #262626" }}>
          <span style={chip("#1a1a1a", "#333333", "#9c9c9c")}>Ex · birinci tur</span>
          <p
            style={{
              margin: "14px 0 0",
              maxWidth: "62ch",
              fontSize: 14,
              lineHeight: 1.6,
              color: "#707070",
            }}
          >
            Silinmediler; karar verirken yan yana durabilsinler diye burada. H2&apos;nin
            tasvir dili ve H5&apos;in hareket mantığı ikinci turu yönlendirdi.
          </p>

          <div
            style={{
              marginTop: 40,
              display: "grid",
              gap: 48,
              gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
              opacity: 0.82,
            }}
          >
            {EX.map(({ id, kind, Card, idea }) => (
              <section key={id}>
                <span style={chip("#1a1a1a", "#333333", "#8a8a8a")}>
                  {id} · {kind} · ex
                </span>
                <p
                  style={{
                    margin: "12px 0 18px",
                    maxWidth: "56ch",
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: "#707070",
                  }}
                >
                  {idea}
                </p>
                <Card />
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
