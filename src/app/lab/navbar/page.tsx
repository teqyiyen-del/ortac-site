import NavN1 from "@/components/lab/NavN1";
import NavN2 from "@/components/lab/NavN2";
import NavN3 from "@/components/lab/NavN3";
import NavN4 from "@/components/lab/NavN4";
import NavN5 from "@/components/lab/NavN5";
import NavN6 from "@/components/lab/NavN6";

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
    id: "N4",
    kind: "Açık panel",
    Nav: NavN4,
    idea:
      "N1'in ülke ekseni aynen duruyor ama panelden koyu yüzey tamamen kalkıyor: eksen ağırlığını siyah levhadan değil, panelin tepesindeki paper zeminli sekme şeridinden alıyor; seçili ülke bandın içinden beyaz bir kart olarak kalkıyor.",
    diff:
      "Teşhis: kabalık siyahın kendisi değil, ölçü hatası. 320px genişlikte tam boy opak levha panelin üçte biriydi — o ölçekte koyu renk vurgu değil ikinci bir zemin oluyor, panel tek belge değil birbirine yapıştırılmış iki belge gibi okunuyordu.",
  },
  {
    id: "N5",
    kind: "Koyu ama ince",
    Nav: NavN5,
    idea:
      "Gece artık bir yüzey değil bir işaret: üç boyu var (3px ray, 42px jeton, 38px hap) ve dördüncüsü yok. Ülke ekseni duruyor, koyu yalnızca onu işaretliyor.",
    diff:
      "Ölçtü: koyu alan panelin ~%25'iydi. Suçlu kontrast değil — #111'in kontrastı gövde metniyle aynı ve paragraf kaba durmuyor. Sorun alan × yer: ağırlık ikincil sütundaydı, yani görsel hiyerarşi bilgi hiyerarşisini ters çeviriyordu.",
  },
  {
    id: "N6",
    kind: "Kart ızgarası",
    Nav: NavN6,
    idea:
      "Panel iki sütuna bölünmüyor: üç ülke kartı, seçili ülkenin brifing şeridi ve hizmet hücreleri tek bir üç sütunlu ızgaranın satırları. Menü bir pano gibi okunuyor.",
    diff:
      "Teşhis: koyu yanlış iş için kullanılmıştı. Panel geçici ve hafif bir katman olmak zorundayken 360px'lik levha katmanın en ağır kütlesiydi; göz menüye değil dekora iniyordu.",
  },
];

const EX = [
  {
    id: "N1",
    kind: "Ülke önce · temel",
    Nav: NavN1,
    idea:
      "Beğenilen aday. Üstteki üç varyasyon bunun üzerine kuruldu: ülke ekseni ve Hizmetler · Araçlar · Kaynaklar · Kurumsal düzeni korunarak, yalnızca sağdaki koyu blok çözüldü.",
  },
  {
    id: "N2",
    kind: "Hizmet önce",
    Nav: NavN2,
    idea:
      "Ekseni ters çevirir. Değerli tespiti: ülke-önce bir menüde bir hizmetin bir ülkede OLMADIĞI hiç görünmez — satır yoktur, yokluk sessizdir. Burada üç slot hep basılıyor.",
  },
  {
    id: "N3",
    kind: "Tek panel",
    Nav: NavN3,
    idea: "Tek tetikleyici, tek panel; bir açılışta bütün site haritası. Panel açılınca çubuk da geceye dönüyor.",
  },
];

export default function LabNavPage() {
  return (
    <main style={{ background: "var(--paper)", paddingBottom: 96 }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Navbar — megabar adayları
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
          Üstteki üç aday N1&apos;in üzerine kuruldu: ülke ekseni ve Hizmetler · Araçlar ·
          Kaynaklar · Kurumsal düzeni korunarak yalnızca &quot;sağdaki koyu blok kaba
          duruyor&quot; şikâyeti çözüldü — üçü de farklı bir teşhisle. Altta birinci turun
          üç adayı duruyor. Hepsinde hizmet listesi <code>servicesFor()</code>&apos;dan
          türüyor; yayında olmayan adresler sönük ve tıklanamaz. Hepsi klavyeyle
          geziliyor, Escape kapatıyor.
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

      <div className="container-o" style={{ paddingTop: 72, marginTop: 40, borderTop: "2px solid var(--border)" }}>
        <span
          style={{
            display: "inline-flex",
            padding: "5px 12px",
            borderRadius: 999,
            background: "var(--white)",
            border: "1px solid var(--border)",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#8a8a8a",
          }}
        >
          Ex · birinci tur
        </span>
      </div>

      {EX.map(({ id, kind, Nav, idea }) => (
        <section key={id} style={{ marginTop: 48, opacity: 0.9 }}>
          <div className="container-o">
            <span
              style={{
                display: "inline-flex",
                padding: "5px 12px",
                borderRadius: 999,
                background: "var(--white)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#8a8a8a",
              }}
            >
              {id} · {kind} · ex
            </span>
            <p style={{ margin: "14px 0 0", maxWidth: "66ch", fontSize: 14, lineHeight: 1.6, color: "#8a8a8a" }}>
              {idea}
            </p>
          </div>
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
