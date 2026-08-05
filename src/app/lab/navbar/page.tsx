import NavN1 from "@/components/lab/NavN1";
import NavN8 from "@/components/lab/NavN8";

/* Navbar — kalan iki kayıt: N8 (seçilen birleşim) ve N1 (canlıdaki aday).
 *
 * Ara turun adayları N4 · N5 · N6 · N7 müşteri isteğiyle silindi; N8'in
 * gerekçe metinleri onlara yalnızca tarihçe olarak atıfta bulunuyor.
 *
 * Navbar sayfanın tepesinde yapışkan durduğu için adayları aynı sayfada yan
 * yana göstermek mümkün değil: hepsi birden sticky olurdu ve hangisinin hangisi
 * olduğu kaybolurdu. O yüzden her aday kendi "sahnesinde" duruyor — altında o
 * adayın panelini açıp kapatabileceğin kadar boş alan var.
 *
 * Menülerin açılması etkileşim gerektiriyor: üstüne gel, tıkla ya da sekmeyle
 * gez. İkisi de klavyeyle çalışacak şekilde yazıldı, o yüzden fare olmadan da
 * denenebilir. */

const CANDIDATES = [
  {
    id: "N8",
    kind: "N7'nin düzeltilmişi",
    Nav: NavN8,
    idea:
      "Koyu zemin doğru yere geçti: üst ülke şeridi açık zemine döndü, koyu artık Hizmetler panelinin SOLUNDAKİ ülke kartının arkasında. Panelin geri kalanı N4'ün açık kart düzeninde.",
    diff:
      "Koyu kart panelin alanının %14,3'ü (280×241 px, panel 1136×415). Bir tur önceki \"kaba duruyor\" teşhisi alan × yer idi; koyu artık ikinci bir zemin değil, tek bir kart.",
  },
];

const EX = [
  {
    id: "N1",
    kind: "Ülke önce · CANLIDA",
    Nav: NavN1,
    idea:
      "Beğenilen aday. Sonraki varyasyonlar bunun üzerine kuruldu: ülke ekseni ve Hizmetler · Araçlar · Kaynaklar · Kurumsal düzeni korunarak, yalnızca sağdaki koyu blok çözüldü.",
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
          N8 N1&apos;in üzerine kuruldu: ülke ekseni ve Hizmetler · Araçlar · Kaynaklar ·
          Kurumsal düzeni korunarak yalnızca &quot;sağdaki koyu blok kaba duruyor&quot;
          şikâyeti çözüldü. Aynı şikâyeti başka teşhislerle çözen ara tur adayları
          (N4 · N5 · N6 · N7) silindi; altta birinci turun N1&apos;i duruyor. İkisinde de
          hizmet listesi <code>servicesFor()</code>&apos;dan türüyor; yayında olmayan
          adresler sönük ve tıklanamaz. İkisi de klavyeyle geziliyor, Escape kapatıyor.
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
              `position: relative` YETMİYOR ve bu bir kez yanlış yapıldı:
              adayların hepsi position:fixed kullanıyor, fixed ise relative bir
              ataya değil GÖRÜNTÜ PENCERESİNE yapışır — hepsi birden ekranın
              tepesinde üst üste biniyor ve yalnızca biri görünüyordu.
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
