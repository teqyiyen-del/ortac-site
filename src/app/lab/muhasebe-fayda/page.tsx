import { FaydaOmurga, FaydaRay, FaydaTekSahne } from "@/components/lab/FaydaTur2";
import { FaydaDefter } from "@/components/lab/FaydaAdaylar";

/* /dubai/muhasebe · #fayda — İKİNCİ TUR

   Müşteri: "kral çok aşırı sade olmuş biraz arasını bulmamız lazım muhasebe
   sayfası için. labda yaptığın kısımdan f3 ü biraz beğendim mesela ama
   sağdakilerin her birinde soldaki şey de değişebilir."

   Sayfa önce üç yeni adayı, en altta da neyin üstüne kurulduklarını gösteriyor.
   F1 (Bento) ve F2 (Sahne) silindi — müşteri ikisini de seçmedi. */

const ADAYLAR = [
  {
    id: "G1",
    kind: "Ray",
    Section: FaydaRay,
    not: "F3'ün doğrudan devamı: sağdaki dört satır tıklanabilir bir ray, soldaki sahne o raya bağlı. Ray kendiliğinden ilerliyor, tıklayınca duruyor.",
  },
  {
    id: "G2",
    kind: "Tek sahne",
    Section: FaydaTekSahne,
    not: "Dört kutu yok: tam genişlik tek bir makine. Kayıt soldan giriyor, defterden geçiyor, üç sonuç sırayla yanıyor; altı ayrı hareket aynı anda dönüyor.",
  },
  {
    id: "G3",
    kind: "Omurga",
    Section: FaydaOmurga,
    not: "Tek sütun, dört bant, biri açık. Açılan bant kendi sahnesini içinden çıkarıyor, yani bölüm seçime göre büyüyor.",
  },
];

const KICKER: React.CSSProperties = {
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
};

const KUNYE: React.CSSProperties = {
  paddingTop: 48,
  marginTop: 40,
  borderTop: "1px solid var(--border)",
};

const NOT: React.CSSProperties = {
  margin: "12px 0 0",
  maxWidth: "70ch",
  fontSize: 14,
  lineHeight: 1.6,
  color: "var(--text-600)",
};

export default function LabMuhasebeFaydaPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Düzenli muhasebenin karşılığı
        </h1>
      </div>

      {ADAYLAR.map(({ id, kind, Section, not }) => (
        <div key={id}>
          <div className="container-o" style={KUNYE}>
            <span style={KICKER}>
              {id} · {kind}
            </span>
            <p style={NOT}>{not}</p>
          </div>
          <Section />
        </div>
      ))}

      {/* Başlangıç noktası: müşterinin işaret ettiği aday, hiç değişmeden.
          Üç yeni adayın neyi çözmeye çalıştığı yan yana konunca görünüyor. */}
      <div className="container-o" style={KUNYE}>
        <span style={{ ...KICKER, background: "var(--paper)", color: "var(--text-600)" }}>
          Başlangıç noktası · F3
        </span>
        <p style={NOT}>
          Birinci turun beğenilen adayı. Soldaki sahne sabit, sağdaki dört satır
          seçilemiyor; bu turun üç adayı da bu iki noktayı açıyor.
        </p>
      </div>
      <FaydaDefter />
    </main>
  );
}
