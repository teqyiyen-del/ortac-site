import AuthorityA1 from "@/components/lab/AuthorityA1";
import AuthorityA2 from "@/components/lab/AuthorityA2";
import AuthorityA3 from "@/components/lab/AuthorityA3";

/* "Neden Ortac Global?" bölümünün geniş karosu — üç aday.
   Adaylar karonun İÇİNİ döndürüyor; dış kabuk (.bn-tile.bn-tile-wide) burada,
   çünkü karo bento ızgarasının bir hücresi ve o ızgara TrustLayer'a ait. */

const CANDIDATES = [
  {
    id: "A1",
    kind: "Dünya",
    Tile: AuthorityA1,
    idea:
      "Sayının yerine coğrafya: 76 piksellik sayaç ve 22 segmentlik yıl şeridi kalktı, görsel sütun artık süreyi değil erişimi anlatıyor.",
    fix: "\"22\" karoda yalnızca bir kez ve yalnızca başlıkta geçiyor.",
  },
  {
    id: "A2",
    kind: "Belge",
    Tile: AuthorityA2,
    idea:
      "Otoriteyi sayı değil belge taşıyor: lisanslar ve resmî iş ortaklıkları somut nesneler gibi, gerçek marka işaretleriyle duruyor.",
    fix: "Kartın içinden her rakam çıkarıldı; sayının yanındaki \"yıl / kesintisiz faaliyet\" açıklamaları da kendiliğinden gitti.",
  },
  {
    id: "A3",
    kind: "Sessiz",
    Tile: AuthorityA3,
    idea:
      "Sağ sütun tek bir cümle bile kurmuyor: ortak bir tel raya asılı üç sessiz kadran, üç ülkenin o anki yerel saatini gösteriyor. Lobi duvarındaki saat sırası.",
    fix: "Görselde hiç metin olmadığı için tekrar edecek bir rakam da kalmadı.",
  },
];

export default function LabAuthorityPage() {
  return (
    <main style={{ background: "var(--paper)", paddingBottom: 96 }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Neden Ortac Global · geniş karo
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "62ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          <b style={{ fontWeight: 600, color: "var(--text-900)" }}>A1 seçildi ve canlıya
          alındı.</b>{" "}
          Canlı hâli birebir bu değil: sol sütundaki üç madde ülkeye kilitli olmaktan
          çıkarıldı (Dubai ofisi ve IFZA adı gitti) ve özdeş tikler yerine her maddenin
          kendi ikonu geldi. Aşağıdaki üç aday karar kaydı olarak duruyor.
        </p>

        {CANDIDATES.map(({ id, kind, Tile, idea, fix }) => (
          <section key={id} style={{ marginTop: 48 }}>
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
                maxWidth: "62ch",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              {idea}
            </p>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: "#8a8a8a" }}>
              <b style={{ fontWeight: 600 }}>Tekrar nasıl çözüldü:</b> {fix}
            </p>

            <div className="bn">
              <div className="bn-tile bn-tile-wide">
                <Tile />
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
