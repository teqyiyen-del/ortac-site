import CalMT10 from "@/components/lab/CalMT10";
import CalMT11 from "@/components/lab/CalMT11";

/* /dubai/muhasebe · takvim bölümü · 4. tur.
   Sözleşme: bilgi kalemi sayısı sabit, aynı anda görünen nesne azalıyor,
   fazlası tek tık uzakta. Üçü de aynı kapıları taşıyor; ayrıştıkları tek yer
   yüzeyde duran nesnenin cinsi (çizim / sayı / kapı).
   Aylar, oranlar ve süreler on ikisinde de accountingDubai.ts'ten okunuyor.
   Canlı sayfaya dokunulmadı.

   MT1-MT9 VE MT12 BU TURDA SİLİNDİ (müşteri: "muhasebe takviminde mt10 mt11
   hariç hepsini kaldır"). Üç turun dokuz adayı ve dördüncü turun üçüncüsü
   gitti; neden elendikleri git geçmişinde. Kalan ikisi karar bekliyor. */

const CANDIDATES = [
  {
    id: "MT10",
    kind: "Tek ray",
    Section: CalMT10,
    not: "Üç kalem tek eksende; süren iş on iki çentikli tek çubuk, biten iş nokta, boş ay hiç çizilmiyor.",
  },
  {
    id: "MT11",
    kind: "Üç sayaç",
    Section: CalMT11,
    not: "Çapa bir rakam: ilk 12 ayda 17 kez iş. Aylar kutu değil yazı, üç satırda.",
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
