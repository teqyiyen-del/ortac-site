import NavN1 from "@/components/lab/NavN1";
import NavN2 from "@/components/lab/NavN2";
import NavN3 from "@/components/lab/NavN3";

/* Navbar — üç megabar adayı.
 *
 * Navbar sayfanın tepesinde yapışkan durduğu için üçünü aynı sayfada yan yana
 * göstermek mümkün değil: üçü birden sticky olurdu ve hangisinin hangisi
 * olduğu kaybolurdu. O yüzden her aday kendi "sahnesinde" duruyor — altında o
 * adayın panelini açıp kapatabileceğin kadar boş alan var.
 *
 * Menülerin açılması etkileşim gerektiriyor: üstüne gel, tıkla ya da sekmeyle
 * gez. Üçü de klavyeyle çalışacak şekilde yazıldı, o yüzden fare olmadan da
 * denenebilir. */

const CANDIDATES = [
  {
    id: "N1",
    kind: "Ülke önce",
    Nav: NavN1,
    idea:
      "Menünün birinci ekseni ülke: üç ülke çubuğun içinde tek bir rayda yan yana; hangisine girilirse mega panel o ülkenin brifingine dönüşüyor — koyu kimlik sütunu (bayrak, yapı, tipik süre, kimler için, dürüst sınır) yanında o ülkenin hizmet kartları.",
    diff:
      "\"Hizmetler\" diye ülkeden bağımsız bir üst başlık yok, çünkü ülkeden bağımsız bir hizmet listesi de yok — vize İngiltere'de verilmiyor.",
  },
  {
    id: "N2",
    kind: "Hizmet önce",
    Nav: NavN2,
    idea:
      "Ekseni ters çevirir: ziyaretçi \"muhasebe\" der, panel o hizmeti hangi ülkelerde yürüttüğümüzü ve her ülkedeki kısa farkı üç slot hâlinde yan yana gösterir.",
    diff:
      "Ülke-önce bir menüde bir hizmetin bir ülkede OLMADIĞI hiç görünmez; satır yoktur, yokluk sessizdir. Burada üç slot hep basılıyor ve \"Oturum ve vize\"de İngiltere gerekçesiyle kesik çizgili duruyor.",
  },
  {
    id: "N3",
    kind: "Tek panel",
    Nav: NavN3,
    idea:
      "Dört ayrı açılır menü yerine tek tetikleyici ve tek panel: solda üç ülke sekmesi, sağda seçili ülkenin hizmetleri, altta araçlar / kaynaklar / kurumsal rafı. Bir açılışta bütün site haritası ekranda.",
    diff:
      "Panel koyu ve açıldığında çubuk da geceye dönüyor — beyaz sayfanın üstüne düşen kocaman beyaz panel yerine sayfanın kendisi geri çekiliyor.",
  },
];

export default function LabNavPage() {
  return (
    <main style={{ background: "var(--paper)", paddingBottom: 96 }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Navbar — üç megabar adayı
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "66ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          Üçü de aynı bilgi mimarisini taşıyor: üç ülke, beş hizmet (hepsi her ülkede yok —
          liste <code>servicesFor()</code>&apos;dan türüyor), araçlar, kaynaklar, kurumsal ve
          panel. Yayında olmayan adresler üçünde de kendiliğinden sönük ve
          &quot;yakında&quot; rozetli. Üçü de klavyeyle geziliyor, Escape kapatıyor.
          <br />
          <b style={{ fontWeight: 600, color: "var(--text-900)" }}>
            Denemek için menülerin üstüne gel ya da tıkla.
          </b>{" "}
          Aşağıdaki her çubuk kendi sahnesinde; sayfanın gerçek navbar&apos;ı en üstteki lab
          şeridi değil.
        </p>
      </div>

      {CANDIDATES.map(({ id, kind, Nav, idea, diff }) => (
        <section key={id} style={{ marginTop: 56 }}>
          <div className="container-o">
            <span
              style={{
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
                color: "var(--text-600)",
              }}
            >
              {idea}
            </p>
            <p style={{ margin: 0, maxWidth: "66ch", fontSize: 13.5, color: "#8a8a8a" }}>
              <b style={{ fontWeight: 600 }}>Ayrıldığı karar:</b> {diff}
            </p>
          </div>

          {/* Aday kendi sahnesinde.
              `position: relative` YETMİYOR ve bu bir kez yanlış yapıldı: üç
              aday da position:fixed kullanıyor, fixed ise relative bir ataya
              değil GÖRÜNTÜ PENCERESİNE yapışır — üçü birden ekranın tepesinde
              üst üste biniyor ve yalnızca biri görünüyordu.
              Çözüm: atada bir transform olması. transform (filter, perspective,
              contain: paint da olur) fixed torunlar için yeni bir kapsayıcı
              blok yaratır, böylece her aday kendi kutusunun tepesine yapışıyor.
              translateZ(0) görünürde hiçbir şeyi kaydırmıyor, yalnızca bu
              kapsayıcı bloğu açıyor. */}
          <div
            style={{
              position: "relative",
              transform: "translateZ(0)",
              marginTop: 20,
              minHeight: 620,
              background: "var(--white)",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <Nav />
          </div>
        </section>
      ))}
    </main>
  );
}
