import Link from "next/link";
import { CLOSED_ROUTES, LIVE_ROUTES } from "@/lib/routes";

/* Arka kapı.
 *
 * Dolaşıma kapatılan sayfalar SİLİNMEDİ — rotaları duruyor, yalnızca site içi
 * bağlantıları kesildi. Ama bağlantı kesilince o sayfalara ulaşmanın yolu da
 * kalmıyor; bu sayfa o yolu geri veriyor.
 *
 * Buradaki bağlantılar bilerek SmartLink DEĞİL, düz <Link>: SmartLink kapalı
 * adresi sönükleştirip tıklanamaz yapardı, yani arka kapı da kapanırdı. /lab
 * zaten iç alan ve noindex, dışarıya açık bir kapı açmıyor.
 */

export default function LabClosedPage() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100dvh", padding: "48px 0 96px" }}>
      <div className="container-o">
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Dolaşıma kapalı sayfalar
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
          Bu sayfaların hiçbiri silinmedi. Rotaları duruyor ve adresi yazan herkes
          açabiliyor; kapanan tek şey site içi bağlantı — menüden, karttan veya
          footer&apos;dan oraya gidilemiyor, girdiler sönük ve tıklanamaz duruyor.
          Aşağıdakiler gerçek bağlantı, buradan gezebilirsin.
        </p>
        <p style={{ marginTop: 10, fontSize: 13.5, color: "#8a8a8a" }}>
          Bir sayfayı yeniden açmak: <code>src/lib/routes.ts</code> içindeki{" "}
          <code>STATIC_LIVE</code> listesine bir satır. Menü, kartlar ve footer
          kendiliğinden canlanıyor.
        </p>

        <h2
          style={{
            marginTop: 40,
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: 17,
            color: "var(--text-900)",
          }}
        >
          Kapalı ({CLOSED_ROUTES.length})
        </h2>
        <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "grid", gap: 8 }}>
          {CLOSED_ROUTES.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  gap: 12,
                  padding: "13px 16px",
                  borderRadius: "var(--r-md)",
                  border: "1px solid var(--border)",
                  background: "var(--white)",
                  textDecoration: "none",
                }}
              >
                <b
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 14.5,
                    color: "var(--text-900)",
                  }}
                >
                  {r.t}
                </b>
                <code style={{ fontSize: 12.5, color: "var(--blue-700)" }}>{r.href}</code>
                <span style={{ fontSize: 12.5, color: "#8a8a8a" }}>{r.why}</span>
              </Link>
            </li>
          ))}
        </ul>

        <h2
          style={{
            marginTop: 40,
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: 17,
            color: "var(--text-900)",
          }}
        >
          Açık ({LIVE_ROUTES.size})
        </h2>
        <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[...LIVE_ROUTES].sort().map((href) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  display: "inline-block",
                  padding: "8px 13px",
                  borderRadius: "var(--r-pill)",
                  border: "1px solid var(--border)",
                  background: "var(--white)",
                  fontSize: 13,
                  color: "var(--text-900)",
                  textDecoration: "none",
                }}
              >
                {href}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
