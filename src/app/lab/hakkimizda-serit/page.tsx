import AboutIkiliKare from "@/components/lab/AboutIkiliKare";
import AboutIkiliSahne from "@/components/lab/AboutIkiliSahne";
import AboutIkiliZemin from "@/components/lab/AboutIkiliZemin";
import AboutSeritIkili from "@/components/lab/AboutSeritIkili";

/* /hakkimizda · İLK ŞERİT · İKİNCİ TUR.

   Müşteri birinci turdan İkili'yi seçti ve öteki ikisini sildirdi: "ikili
   dediğin seçenek iş yapabilir belki onu biraz geliştirip işin içine bir
   şekilde görselde eklersek ondan bişi çıkar. diğer ikisini silip ondan
   3 tane türet labda."

   Üç türev de İkili'nin fikrini KORUYOR — solda firma bugün ne yapıyor,
   sağda ne hedefliyor; fark görsel değil dilsel, iki sütun iki zaman kipinde
   konuşuyor. Ayrıştıkları tek eksen görselin nereden girdiği.

   İKİLİ EN ALTTA REFERANS OLARAK DURUYOR: türevlerin neyi değiştirdiği ancak
   tabanla yan yana görülüyor. */

const CANDIDATES = [
  {
    id: "Kare",
    kind: "Fotoğraf sol sütunda",
    Section: AboutIkiliKare,
    not: "Görsel sol sütunun içinde, metnin parçası gibi. Sağ sütunda fotoğraf yok: bugünün kanıtı var, yarının sözü var.",
  },
  {
    id: "Sahne",
    kind: "Sütunlar arası çizim",
    Section: AboutIkiliSahne,
    not: "Fotoğraf hiç yok. İki sütunun arasındaki dikiş bir çizime dönüyor; soldan çıkan bir şey sağa geçiyor.",
  },
  {
    id: "Zemin",
    kind: "Görsel zemin oluyor",
    Section: AboutIkiliZemin,
    not: "Görsel kutuda değil, şeridin zemininde; hero ve iki sütun onun üstünde duruyor.",
  },
  {
    id: "İkili",
    kind: "Referans · taban",
    Section: AboutSeritIkili,
    not: "Türevlerin çıktığı hâl. Görsel yok; üçünün neyi eklediği ancak buna bakınca görünüyor.",
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

export default function LabHakkimizdaSeritPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Hakkımızda · giriş şeridi
        </h1>
      </div>

      {CANDIDATES.map(({ id, kind, Section, not }) => (
        <div key={id}>
          <div
            className="container-o"
            style={{ paddingTop: 48, marginTop: 40, borderTop: "1px solid var(--border)" }}
          >
            <span style={KICKER}>
              {id} · {kind}
            </span>
            <p
              style={{
                margin: "12px 0 0",
                maxWidth: "70ch",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              {not}
            </p>
          </div>
          <Section />
        </div>
      ))}
    </main>
  );
}
