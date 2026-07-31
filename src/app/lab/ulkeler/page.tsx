import CountriesC11 from "@/components/lab/CountriesC11";
import CountriesC12 from "@/components/lab/CountriesC12";

/* Ana sayfa ülkeler bölümü — iki aday kaldı.
 *
 * Önceki on aday (C1-C10) silindi: karar bu ikisi üzerinden ilerliyor, geri
 * kalanı lab'da yer kaplamaktan başka bir iş yapmıyordu. C11 C7'den, C12
 * C8'den türedi; ikisinin de kapalı hâli beğenilmişti, geliştirilen yalnızca
 * açılan panel oldu.
 *
 * C11 CANLIDA — src/components/home/ThreeCountries.tsx onun kopyası, .uk3-
 * ad alanıyla. Buradaki .c11- kopyası aday olarak duruyor: canlıda yapılan bir
 * düzeltme burayı, buradaki bir deneme de canlıyı etkilemesin diye ikisi ayrı
 * dosyada yaşıyor.
 *
 * İkisinde de bu turda iki şey değişti: dürüst kısıt (FACTS[c].limit) bölümden
 * çıkarıldı — bilgi silinmedi, ülke sayfalarında yaşamaya devam ediyor — ve
 * sıra coğrafi olmaktan çıktı: İngiltere · Dubai · KKTC. */

const CANDIDATES = [
  {
    id: "C11",
    kind: "Yay · CANLIDA",
    Section: CountriesC11,
    idea:
      "Yay estetiği, ülke adının altında iki ikonlu öne çıkan özellik, tıklayınca yerinde açılan panel. Panelde metin az, her kalemin kendi ikonu var, tahsilat anlatılan yerde gerçek marka işaretleri basılıyor.",
  },
  {
    id: "C12",
    kind: "Sade açılır · geliştirilebilir",
    Section: CountriesC12,
    idea:
      "Canlı bölümün sadeleştirilmiş iskeleti. \"Kimler için\" listesi virgülünden bölünüp kalem başına kendi ikonuna dönüşüyor — ikon ülkeye elle yazılmıyor, anahtar kelimeyle eşleniyor. Açılma animasyonundaki beş ayrı kusur bu turda düzeltildi.",
  },
];

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
            maxWidth: "66ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          İkisi de yerinde açılıyor ve kapalıyken de kıyas hissi veriyor. Dürüst kısıt bu
          bölümden çıkarıldı — bilgi silinmedi, ülke sayfalarında duruyor. Sıra coğrafi
          değil: İngiltere · Dubai · KKTC.
        </p>
      </div>

      {CANDIDATES.map(({ id, kind, Section, idea }) => (
        <div key={id}>
          <div
            className="container-o"
            style={{ paddingTop: 56, marginTop: 40, borderTop: "1px solid var(--border)" }}
          >
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
                margin: "14px 0 0",
                maxWidth: "64ch",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              {idea}
            </p>
          </div>
          <Section />
        </div>
      ))}
    </main>
  );
}
