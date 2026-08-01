import ContactI1 from "@/components/lab/ContactI1";
import ContactI2 from "@/components/lab/ContactI2";
import ContactI3 from "@/components/lab/ContactI3";
import ContactI4 from "@/components/lab/ContactI4";
import ContactI5 from "@/components/lab/ContactI5";

/* İletişim sayfası — iki yeni aday, üç ex.
 *
 * İlk tur "taşaklı, efektif" istendiği için özgün mekaniklerle çıktı ve
 * fikirleri beğenildi — ama karar "insanlar bunu pek algılayamayabilir" oldu.
 * İkinci tur bilerek KLASİK: ziyaretçi sayfayı açtığında ne yapacağını
 * düşünmeden bilmeli.
 *
 * Ayrıca iki şey kalktı, çünkü firmada karşılığı yok: ülke başına ayrı saat
 * ve hizmet başına ayrı muhatap. Olmayan bir yapıyı göstermek yanlış bilgi.
 *
 * ÜÇÜNDE DE ORTAK OLAN İKİ EKSİK, bilerek bırakıldı:
 * · Çalışan bir form uç noktamız yok. Formlar görsel olarak duruyor ama
 *   göndermiyor ve sahte "mesajınız iletildi" ekranı basmıyorlar. Sahte onay,
 *   gerçekten yazan birinin mesajını sessizce çöpe atmak demek.
 * · Telefon, e-posta ve açık adres doğrulanamadı — hiçbiri uydurulmadı,
 *   SWAP:CONTACT_INFO olarak yer tutucu duruyor.
 * Bu ikisi gelince üç aday da tek dosyadan dolar.
 *
 * Adaylar sayfa gövdesi döndürüyor (bölüm yığını), o yüzden her biri kendi
 * bandının altında tam boy duruyor; sayfa uzun. */

const CANDIDATES = [
  {
    id: "I4",
    kind: "Kanallar solda, form sağda",
    Body: ContactI4,
    idea:
      "Bilerek tanıdık iki sütun: solda iletişim kanalları düz ve eşit ağırlıkta bir liste, sağda tam alan setini tek ekranda gösteren form.",
    bold:
      "\"Sıradan değil\" iddiası düzenden değil, sitenin kendi tipografi ve boşluk ritminden geliyor. Düzen tahmin edilebilir kalıyor — ziyaretçi ne yapacağını düşünmeden biliyor.",
  },
  {
    id: "I5",
    kind: "Form önde, kanallar altta",
    Body: ContactI5,
    idea:
      "Gri zeminde beyaz panel içinde geniş form en üstte, altında düz listelenmiş kanallar, kapanışta \"bekleyebilecekleriniz / söz veremediklerimiz\" bandı.",
    bold:
      "Ziyaretçilerin çoğu form doldurmaya geliyor, sayfa da onunla açılıyor. Hiçbir yerde bilmece, klavye mekaniği, ülke saati ya da hizmet başına muhatap yok.",
  },
];

/* Reddedilen ilk tur. Fikirleri beğenildi ama "insanlar bunu pek
   algılayamayabilir" denildi — sayfa bir bilmece gibi açılıyordu. Silinmediler;
   I4 ve I5 bunların form ve kanal parçalarını sadeleştirerek devraldı. */
const EX = [
  {
    id: "I1",
    kind: "Tek soru",
    Body: ContactI1,
    idea:
      "Sayfa bir form değil, konuşmanın ilk cümlesi: ekranı kaplayan siyah tuvalde tek bir soru duruyor (\"Nerede şirket kurmak istiyorsunuz?\") ve verilen cevaplardan sonra form kendini kuruyor.",
    bold:
      "Boş açılıyor — tam ekran siyah, tek soru, başka hiçbir şey. Klavyeyle sürülebiliyor (1-4 seçiyor, Backspace geri alıyor) ve verilen cevaplar üstte tıklanabilir kelimelere dönüşüyor: \"geri\" düğmesi yok, düzeltilecek şeyin kendisine basılıyor.",
  },
  {
    id: "I2",
    kind: "Masa",
    Body: ContactI2,
    idea:
      "Omurga form değil MASA: ziyaretçi önce konusunu seçiyor (Kuruluş / Banka / Muhasebe / Uyum / Oturum), o masanın hangi ülkelerde çalıştığını ve yazarken neyi eklemesi gerektiğini görüyor; form en sonda ve seçilen masaya bağlı.",
    bold:
      "Kendi aleyhine de çalışabilen iki şey koyuyor: üç ülkenin gerçek yerel saatini gösteren canlı pano, ve her masanın peşinen söylediği sınır. Yani sayfa \"her şeyi yaparız\" demiyor.",
  },
  {
    id: "I3",
    kind: "Santral",
    Body: ContactI3,
    idea:
      "Kanallar eşit değil: işe göre sıralı tek bir dikey rayda duruyorlar ve her birinin ne için doğru olduğu tek satırda yazıyor.",
    bold:
      "Başlık bir pozisyon beyanı: \"Santral yok. Sıra numarası yok.\" Hız sorusuna taahhüt yerine gerçek cevap veriyor — Dubai yerel saati akıyor ve mesai içinde olup olmadığımız görünüyor. \"2 saatte döneriz\" gibi tutulamayacak bir söz yok.",
  },
];

const BAND: React.CSSProperties = {
  background: "var(--paper)",
  borderTop: "1px solid var(--border)",
  borderBottom: "1px solid var(--border)",
  padding: "28px 0 26px",
};

export default function LabContactPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ padding: "48px 0 36px" }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          İletişim sayfası
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "68ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          Üstteki iki aday klasik: kanallar şeffaf ve düz listeli, form hizmet ve ülke seçimi
          içeriyor. Ülke başına saat ve hizmet başına muhatap kaldırıldı — firmada karşılığı yok.
          Hepsinde form <b style={{ fontWeight: 600 }}>göndermiyor</b>: çalışan bir uç noktamız yok
          ve sahte bir &quot;mesajınız iletildi&quot; ekranı, gerçekten yazan birinin mesajını
          sessizce kaybetmek olurdu. Telefon, e-posta ve adres uydurulmadı; bu bilgiler gelince
          hepsi tek dosyadan dolar.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
          {CANDIDATES.map((c) => (
            <a
              key={c.id}
              href={`#aday-${c.id.toLowerCase()}`}
              style={{
                display: "inline-flex",
                gap: 8,
                padding: "9px 16px",
                borderRadius: 999,
                border: "1px solid var(--border)",
                background: "var(--white)",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 13,
                color: "var(--text-900)",
                textDecoration: "none",
              }}
            >
              {c.id} · {c.kind}
            </a>
          ))}
        </div>
      </div>

      {CANDIDATES.map(({ id, kind, Body, idea, bold }) => (
        <section key={id} id={`aday-${id.toLowerCase()}`} style={{ scrollMarginTop: 70 }}>
          <div style={BAND}>
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
                  maxWidth: "68ch",
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "var(--text-600)",
                }}
              >
                {idea}
              </p>
              <p style={{ margin: 0, maxWidth: "70ch", fontSize: 13.5, lineHeight: 1.6, color: "#8a8a8a" }}>
                <b style={{ fontWeight: 600 }}>Cesareti nerede:</b> {bold}
              </p>
            </div>
          </div>
          <Body />
        </section>
      ))}

      <div
        className="container-o"
        style={{ paddingTop: 72, marginTop: 40, borderTop: "2px solid var(--border)" }}
      >
        <span
          style={{
            display: "inline-flex",
            padding: "5px 12px",
            borderRadius: 999,
            background: "var(--paper)",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#8a8a8a",
          }}
        >
          Ex · ilk tur
        </span>
        <p style={{ margin: "14px 0 0", maxWidth: "68ch", fontSize: 14, lineHeight: 1.6, color: "#8a8a8a" }}>
          Fikirleri beğenildi ama algılanabilirlik sorunu vardı. Silinmediler; I4 ve I5 bunların
          form ve kanal parçalarını sadeleştirerek devraldı.
        </p>
      </div>

      <div style={{ opacity: 0.85 }}>
        {EX.map(({ id, kind, Body, idea }) => (
          <section key={id}>
            <div style={BAND}>
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
                <p
                  style={{
                    margin: "12px 0 0",
                    maxWidth: "68ch",
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: "#8a8a8a",
                  }}
                >
                  {idea}
                </p>
              </div>
            </div>
            <Body />
          </section>
        ))}
      </div>
    </main>
  );
}
