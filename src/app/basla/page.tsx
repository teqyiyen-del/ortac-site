/* STUB — /basla akışı Faz 1'de inşa edilecek.
   Bu sayfa şimdilik hero widget'tan taşınan query parametrelerini doğrular. */

import SmartLink from "@/components/shared/SmartLink";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const LABELS: Record<string, string> = {
  ulke: "Ülke",
  faaliyet: "Faaliyet",
  banka: "Banka hesabı",
  paket: "Paket",
};

export default async function BaslaPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const entries = Object.entries(params).filter(
    (pair): pair is [string, string] => typeof pair[1] === "string",
  );

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "var(--paper)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--gutter-m)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: "var(--white)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-lg)",
          boxShadow: "var(--shadow-card)",
          padding: 28,
        }}
      >
        <p className="tag" style={{ fontSize: 11, color: "var(--blue-700)" }}>
          Başla · yapım aşamasında
        </p>
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            fontSize: 22,
            lineHeight: 1.2,
            marginTop: 12,
            color: "var(--text-900)",
          }}
        >
          Kurulum akışı Faz 1&apos;de inşa edilecek.
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--text-600)",
            marginTop: 8,
          }}
        >
          Seçimlerin başarıyla taşındı:
        </p>
        <div style={{ marginTop: 16 }}>
          {entries.length === 0 && (
            <p style={{ fontSize: 14, color: "var(--text-600)" }}>
              Parametre yok: anasayfadaki karttan gel.
            </p>
          )}
          {entries.map(([key, value]) => (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid var(--border)",
                fontSize: 14,
              }}
            >
              <span style={{ color: "var(--text-600)" }}>
                {LABELS[key] ?? key}
              </span>
              <span className="data" style={{ color: "var(--text-900)" }}>
                {value}
              </span>
            </div>
          ))}
        </div>
        <SmartLink
          href="/"
          style={{
            display: "inline-block",
            marginTop: 20,
            fontSize: 14,
            fontWeight: 500,
            color: "var(--blue-700)",
            textDecoration: "none",
          }}
        >
          ← Anasayfaya dön
        </SmartLink>
      </div>
    </main>
  );
}
