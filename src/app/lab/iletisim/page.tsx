import ContactI1 from "@/components/lab/ContactI1";
import ContactI2 from "@/components/lab/ContactI2";
import ContactI3 from "@/components/lab/ContactI3";
import ContactI4 from "@/components/lab/ContactI4";
import ContactI5 from "@/components/lab/ContactI5";
import ContactI6 from "@/components/lab/ContactI6";

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
    id: "I6",
    kind: "Üç ofis omurga",
    Body: ContactI6,
    idea:
      "Sayfanın omurgası artık form değil OFİS: üç ülkenin ayrı adresi ve ayrı iletişim bilgisi var, o yüzden üstte üç büyük ofis düğmesi, altında tam genişlikte gerçek harita, onun altında üç büyük kanal kartı (telefon / WhatsApp / e-posta). Form ikinci bölümde ve ülke ile konu açılır menüden değil, görünen kutucuklardan seçiliyor.",
    bold:
      "Tek bir <select> yok — ülke ve konu, gizli yerli radio üstüne çizilmiş kutucuklar, yani ok tuşları ve ekran okuyucu duyurusu tarayıcıdan geliyor. Harita dış servis değil: world-atlas + d3-geo ile derleme dışında bir kez üretilip dosyaya gömülmüş gerçek kıyı çizgisi, 20 KB. Kanal kartları büyük ve kartın tamamı tıklama hedefi.",
  },
];

/* Reddedilen ikinci tur. Klasik olma isteğini karşıladılar ama üç şeyi
   yanlış tuttular: "bunları beklemeyin" bandı gereksizdi, olmayan bir müşteri
   paneli kanal olarak duruyordu, ve en önemlisi üç ülkenin AYRI ADRESİ olduğu
   bilgisi sayfada hiç yoktu. Kanallar da küçüktü. I6 bu üçünü devraldı;
   formun iyi parçaları (I4'ün alan ızgarası, I3'ün canlı cümlesi) korundu. */
const EX2 = [
  {
    id: "I4",
    kind: "Kanallar solda, form sağda",
    Body: ContactI4,
    idea:
      "Bilerek tanıdık iki sütun: solda iletişim kanalları düz ve eşit ağırlıkta bir liste, sağda tam alan setini tek ekranda gösteren form. Formun sıkı alan ızgarası ve etiket disiplini beğenildi ve I6'ya taşındı.",
  },
  {
    id: "I5",
    kind: "Form önde, kanallar altta",
    Body: ContactI5,
    idea:
      "Gri zeminde beyaz panel içinde geniş form en üstte, altında düz listelenmiş kanallar, kapanışta \"bekleyebilecekleriniz / söz veremediklerimiz\" bandı — o bant bu turda kaldırıldı. Adım rozetleri ve ilerleme rayı da düştü.",
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
          Üçüncü tur. Bu turda sayfanın omurgası değişti: firmanın{" "}
          <b style={{ fontWeight: 600 }}>üç ülkede ayrı adresi ve ayrı iletişim bilgisi</b> var, o
          yüzden sayfa artık formla değil ofisle açılıyor. Ülke başına saat ve hizmet başına
          muhatap yine yok — firmada karşılığı olmayan tek şey onlardı, ofis adresi ayrı bir şey.
          Hepsinde form <b style={{ fontWeight: 600 }}>göndermiyor</b>: çalışan bir uç noktamız yok
          ve sahte bir &quot;mesajınız iletildi&quot; ekranı, gerçekten yazan birinin mesajını
          sessizce kaybetmek olurdu. Telefon, e-posta ve adres uydurulmadı; üç ofisin de alanları
          boş ve <code>src/lib/offices.ts</code> dolunca hepsi tek dosyadan canlanıyor.
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
          Ex · ikinci tur
        </span>
        <p style={{ margin: "14px 0 0", maxWidth: "68ch", fontSize: 14, lineHeight: 1.6, color: "#8a8a8a" }}>
          Klasik olma isteğini karşıladılar ama üç şeyi yanlış tuttular: gereksiz &quot;bunları
          beklemeyin&quot; bandı, kanal olarak duran ama var olmayan müşteri paneli, ve üç ülkenin
          ayrı adresi olduğu bilgisinin sayfada hiç bulunmaması. Kanallar da küçüktü. Formun iyi
          parçaları I6&apos;ya taşındı.
        </p>
      </div>

      <div style={{ opacity: 0.85 }}>
        {EX2.map(({ id, kind, Body, idea }) => (
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
          Fikirleri beğenildi ama algılanabilirlik sorunu vardı. Silinmediler; I3&apos;ün canlı
          cümlesi I6&apos;nın formunda yaşıyor.
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
