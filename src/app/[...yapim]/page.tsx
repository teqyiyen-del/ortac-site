/* Catch-all stub — henüz inşa edilmemiş her rota (ulke/, rehber/, kaynaklar,
   araclar/, kurumsal sayfalar, rapor) buraya düşer; 404 yerine dürüst durum. */

import Link from "next/link";

type Params = Promise<{ yapim: string[] }>;

export default async function YapimPage({ params }: { params: Params }) {
  const { yapim } = await params;
  const path = "/" + yapim.join("/");

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
          padding: 28,
        }}
      >
        <p className="tag" style={{ fontSize: 11, color: "var(--blue-700)" }}>
          Yapım aşamasında
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
          Bu sayfa sıradaki fazda inşa edilecek.
        </h1>
        <p
          className="data"
          style={{ fontSize: 13, color: "var(--text-600)", marginTop: 10 }}
        >
          {path}
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: 20,
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: 14,
            color: "var(--blue-700)",
            textDecoration: "none",
          }}
        >
          ← Anasayfaya dön
        </Link>
      </div>
    </main>
  );
}
