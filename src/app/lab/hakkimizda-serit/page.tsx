import AboutKapakKapak from "@/components/lab/AboutKapakKapak";
import AboutKapakYasli from "@/components/lab/AboutKapakYasli";
import AboutKapakKule from "@/components/lab/AboutKapakKule";

/* /hakkimizda · İLK ŞERİT · ÜÇÜNCÜ TUR.

   İki tur üst üste reddedildi. Müşteri: "hakkımızda kısmı yine bok gibi oldu ya
   niye çözemedik dünyanın en kolay kısmını. radiusu olan görsel istiyorum ve
   büyük olmalı, opaklık oyunuyla geçişli olmasın görsel, arkaplanda da olmasın.
   ne yapıyoruz kısmının tamamı paragraf halinde aksın bi kısmı solda bi kısmı
   sağda fln olmasın (önceki örneklerde çok vardı öyle bir şey)."

   O son cümle ikinci turun tamamını geçersiz kıldı: İkili'nin "iki sütun, iki
   zaman kipi" fikri gövde metni için artık yasak. Üç aday da metni TEK AKIŞ
   olarak basıyor ve yalnız görselin nereye oturduğuyla ayrışıyor.

   ÖNCEKİ TURLARIN ADAYLARI SİLİNDİ (Kare · Sahne · Zemin · İkili): fikirleri
   reddedilen kısıtın üstüne kurulmuştu, referans olarak tutmak yanıltırdı. */

const CANDIDATES = [
  {
    id: "Kapak",
    kind: "Görsel kutudan geniş",
    Section: AboutKapakKapak,
    not: "Fotoğraf metin kabından 60'ar piksel taşıyor; metin altında tek sütun iniyor.",
  },
  {
    id: "Yaslı",
    kind: "Kenara yaslı",
    Section: AboutKapakYasli,
    not: "Fotoğraf sağ kenara, mavi levha sol kenara yaslı; metin ikisinin de yanında tek sütun.",
  },
  {
    id: "Kule",
    kind: "Tek dikey kolon",
    Section: AboutKapakKule,
    not: "Kompozisyonun tek aracı genişlik: dar hero, geniş görsel, orta metin, mavi taban.",
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
