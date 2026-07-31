import CountriesC1 from "@/components/lab/CountriesC1";
import CountriesC2 from "@/components/lab/CountriesC2";
import CountriesC3 from "@/components/lab/CountriesC3";
import CountriesC4 from "@/components/lab/CountriesC4";
import CountriesC5 from "@/components/lab/CountriesC5";
import CountriesC6 from "@/components/lab/CountriesC6";

/* Ana sayfa ülkeler bölümü — iki tur.
 *
 * İkinci turun kuralları birinci turun geri bildiriminden çıktı: detay için
 * başka sayfaya göndermek yok (yerinde açılım), kapalıyken de kıyas hissi
 * olacak, ve İstanbul referansı kalkacak (KKTC'nin yakınlık argümanı bölümün
 * geneline yayılmamalı). C3'ün yay fikri beğenildiği için ikinci turda iki
 * aday onu temel aldı. */

const NEW = [
  {
    id: "C4",
    kind: "Yay + açılım",
    Section: CountriesC4,
    idea:
      "C3'ün yayı duruyor, İstanbul yok. Bayraklar artık bağlantı değil açıcı: her pinin altında ülkeyi ayıran etiket ve üçünde de aynı hizada tek bir kıyas ekseni var; tıklayınca yayın altında dört kalemlik özet yerinde açılıyor.",
    h: "kapalı 721px · açık ~900px · canlı 1209px (−%40)",
  },
  {
    id: "C5",
    kind: "Sade açılır",
    Section: CountriesC5,
    idea:
      "Canlı bölümün açılır mekaniği kalıyor ama kıyas kapalı hâle taşınıyor: üç satır, her birinde ülkeyi ayıran tek cümle ve aynı hizada tek bir kıyas ekseni. Tıklanınca satır yerinde açılıp yalnızca üç bilgi veriyor.",
    h: "kapalı 647px · açık 779px · canlı 1209px (−%46)",
  },
  {
    id: "C6",
    kind: "Kıyas satırı",
    Section: CountriesC6,
    idea:
      "Yay estetik giriş olarak kalıyor, altına bir kıyas satırı giriyor: ziyaretçi ölçüt seçiyor (maliyet · kim için · kartla tahsilat · dürüst kısıt) ve üç ülkenin cevabı aynı anda değişiyor. Ülkeye tıklamak ise o ülkenin tamamını açıyor.",
    h: "kapalı 778px · açık 970px · canlı 1209px (−%36)",
  },
];

const EX = [
  {
    id: "C1",
    kind: "En az",
    Section: CountriesC1,
    idea: "Üç eşit kapı, kıyas yok, çıkış /ulkeler'e. Sadeliği beğenildi ama başka sayfaya göndermesi istenmedi.",
  },
  {
    id: "C2",
    kind: "Soru",
    Section: CountriesC2,
    idea: "\"Önceliğiniz hangisi?\" — cevaba göre ülke öne çıkıyor.",
  },
  {
    id: "C3",
    kind: "Görsel",
    Section: CountriesC3,
    idea: "Ufuk yayı üzerinde üç bayrak. Estetiği beğenildi; detay taşımaması ve İstanbul referansı sorun oldu — C4 ve C6 buradan doğdu.",
  },
];

const chip = (bg: string, fg: string) => ({
  display: "inline-flex" as const,
  padding: "5px 12px",
  borderRadius: 999,
  background: bg,
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: fg,
});

export default function LabCountriesPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Ana sayfa · ülkeler bölümü
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "64ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          Üçü de yerinde açılıyor — detay için başka sayfaya göndermiyor. Kapalıyken de
          kıyas hissi veriyorlar ve hiçbirinde İstanbul referansı yok.
        </p>
      </div>

      {NEW.map(({ id, kind, Section, idea, h }) => (
        <div key={id}>
          <div
            className="container-o"
            style={{ paddingTop: 56, marginTop: 40, borderTop: "1px solid var(--border)" }}
          >
            <span style={chip("var(--blue-100)", "var(--blue-700)")}>
              {id} · {kind}
            </span>
            <p
              style={{
                margin: "14px 0 4px",
                maxWidth: "62ch",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              {idea}
            </p>
            <p style={{ fontSize: 13, color: "#8a8a8a" }}>{h}</p>
          </div>
          <Section />
        </div>
      ))}

      <div
        className="container-o"
        style={{ paddingTop: 72, marginTop: 56, borderTop: "2px solid var(--border)" }}
      >
        <span style={chip("var(--paper)", "#8a8a8a")}>Ex · birinci tur</span>
        <p
          style={{
            margin: "14px 0 0",
            maxWidth: "62ch",
            fontSize: 14,
            lineHeight: 1.6,
            color: "#8a8a8a",
          }}
        >
          Silinmediler; yan yana bakılabilsin diye burada duruyorlar.
        </p>
      </div>

      <div style={{ opacity: 0.85 }}>
        {EX.map(({ id, kind, Section, idea }) => (
          <div key={id}>
            <div className="container-o" style={{ paddingTop: 48, marginTop: 32 }}>
              <span style={chip("var(--paper)", "#8a8a8a")}>
                {id} · {kind} · ex
              </span>
              <p
                style={{
                  margin: "12px 0 0",
                  maxWidth: "60ch",
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  color: "#8a8a8a",
                }}
              >
                {idea}
              </p>
            </div>
            <Section />
          </div>
        ))}
      </div>
    </main>
  );
}
