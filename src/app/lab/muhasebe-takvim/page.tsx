import CalMT10 from "@/components/lab/CalMT10";
import CalMT11 from "@/components/lab/CalMT11";
import CalMT13 from "@/components/lab/CalMT13";
import CalMT14 from "@/components/lab/CalMT14";
import CalMT15 from "@/components/lab/CalMT15";
import CalMT16 from "@/components/lab/CalMT16";

/* /dubai/muhasebe · takvim bölümü · 5. tur.
   Sözleşme: bilgi kalemi sayısı sabit, aynı anda görünen nesne azalıyor,
   fazlası tek tık uzakta.
   Aylar, oranlar ve süreler hepsinde accountingDubai.ts'ten okunuyor.
   Canlı sayfaya dokunulmadı.

   BU TUR: MT11 taban, üç türev. Müşterinin dört düzeltmesi (mavi MT10'un
   diline, kapılar tasarıma, "17 kez" başlığı gidiyor, kuruluş kayıtları siyah
   kartın içine ya da üstüne) üçünde de var; adaylar yalnız BUNLARI NASIL
   çözdükleriyle ayrışıyor. MT10 ve MT11 referans olarak altta duruyor. */

const CANDIDATES = [
  {
    id: "MT13",
    kind: "Önce kuruluş",
    Section: CalMT13,
    not: "Üç kayıt kartın üstünde ayrı bir perde; kart yalnız yılın kendisi. Cevap tek kelime.",
  },
  {
    id: "MT14",
    kind: "Tek kart",
    Section: CalMT14,
    not: "Üç kayıt kartın içinde ilk perde; cevap 12/12 ve en yoğun ay rayda çizgiyle işaretli.",
  },
  {
    id: "MT16",
    kind: "Üç kayıt yan yana",
    Section: CalMT16,
    not: "MT14'ün aynısı, tek fark: kuruluş kayıtları kartın içinde üç sütun. 900px altında alt alta düşüyor.",
  },
  {
    id: "MT15",
    kind: "Tek eksen",
    Section: CalMT15,
    not: "Kayıtlar rayın sıfırıncı satırı; her satır kendi kapısı, altta tek kapı kalıyor.",
  },
  {
    id: "MT10",
    kind: "Referans · tek ray",
    Section: CalMT10,
    not: "Mavinin dili buradan alındı: oluk yok, çentikli tek çubuk, gerçek ay konumunda kareler.",
  },
  {
    id: "MT11",
    kind: "Referans · taban",
    Section: CalMT11,
    not: "Türevlerin tabanı. Düzeltilen dört şey burada henüz eski hâlinde.",
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


export default function LabMuhasebeTakvimPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Muhasebe takvimi
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
