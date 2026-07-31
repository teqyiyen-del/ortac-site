import CountriesC1 from "@/components/lab/CountriesC1";
import CountriesC2 from "@/components/lab/CountriesC2";
import CountriesC3 from "@/components/lab/CountriesC3";
import CountriesC4 from "@/components/lab/CountriesC4";
import CountriesC5 from "@/components/lab/CountriesC5";
import CountriesC6 from "@/components/lab/CountriesC6";
import CountriesC7 from "@/components/lab/CountriesC7";
import CountriesC8 from "@/components/lab/CountriesC8";
import CountriesC9 from "@/components/lab/CountriesC9";
import CountriesC10 from "@/components/lab/CountriesC10";
import CountriesC11 from "@/components/lab/CountriesC11";
import CountriesC12 from "@/components/lab/CountriesC12";

/* Ana sayfa ülkeler bölümü — iki tur.
 *
 * İkinci turun kuralları birinci turun geri bildiriminden çıktı: detay için
 * başka sayfaya göndermek yok (yerinde açılım), kapalıyken de kıyas hissi
 * olacak, ve İstanbul referansı kalkacak (KKTC'nin yakınlık argümanı bölümün
 * geneline yayılmamalı). C3'ün yay fikri beğenildiği için ikinci turda iki
 * aday onu temel aldı. */

const NEW = [
  {
    id: "C11",
    kind: "Yay · panel geliştirildi",
    Section: CountriesC11,
    idea:
      "C7'nin kapalı hâli birebir aynı (yay, bayraklar, iki ikonlu başlık — ölçüldü, dört kırılımda da aynı yükseklik). Değişen yalnızca açılan panel: metin azaldı, her kalem kendi ikonunu aldı, tahsilat anlatılan yerde gerçek marka işaretleri var.",
    h: "kapalı 703px — C7 ile birebir",
  },
  {
    id: "C12",
    kind: "Sade açılır · panel geliştirildi",
    Section: CountriesC12,
    idea:
      "C8'in iskeleti duruyor, paneli yeniden kuruldu. \"Kimler için\" listesi virgülünden bölünüp kalem başına kendi ikonuna dönüştü — ikon ülkeye elle yazılmıyor, anahtar kelimeyle eşleniyor. Etiket–değer ızgarası gitti, bilgi olarak hiçbir şey atılmadı.",
    h: "C8 iskeleti korundu",
  },
];

const EX = [
  {
    id: "C7",
    kind: "Yay · ölçütsüz",
    Section: CountriesC7,
    idea: "Kapalı hâli beğenildi, paneli fazla metinli bulundu — C11 onun geliştirilmiş hâli.",
  },
  {
    id: "C8",
    kind: "Canlının sadesi",
    Section: CountriesC8,
    idea: "İskeleti beğenildi, paneli donuk bulundu — C12 onun geliştirilmiş hâli.",
  },
  {
    id: "C9",
    kind: "Kart destesi",
    Section: CountriesC9,
    idea: "Üç ülke üst üste deste; öndeki açık, arkadakiler alt şeridiyle görünüyor.",
  },
  {
    id: "C10",
    kind: "Tek şerit",
    Section: CountriesC10,
    idea: "Bölüm tek bir beyaz şeride indi; kart, gölge, aralık yok.",
  },
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
  {
    id: "C4",
    kind: "Yay + açılım",
    Section: CountriesC4,
    idea: "Yay + tıklayınca açılan dört kalemlik özet. C7 bunun ölçütsüz ve iki-özellikli hâli.",
  },
  {
    id: "C5",
    kind: "Sade açılır",
    Section: CountriesC5,
    idea: "Görev yanlış anlaşılmıştı: yeni fikir yerine canlının sadeleştirilmesi isteniyordu — C8 o iş.",
  },
  {
    id: "C6",
    kind: "Kıyas satırı",
    Section: CountriesC6,
    idea: "Ölçüt seçici + yay. Beğenildi ama üstteki seçici şeridi fazla bulundu; C7 onsuz hâli.",
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
