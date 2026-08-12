import Link from "next/link";
import { LAB_DURUM_AD, LAB_TURLARI, labAd } from "./turlar";

/* Tur listesi burada değil ./turlar.ts'te. İki kopya olduğu için künyeler iki
   tur üst üste bayatladı ve yeni açılan rotalar hiçbir yerden bağlanmadan
   kaldı; tek kaynağa indirildi. Sıra kuralı da orada: yeni tur dizinin BAŞINA
   eklenir, yani ekranın sol üstünde çıkar. */

export default function LabIndex() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100dvh", padding: "64px 0" }}>
      <div className="container-o">
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Aday tasarımlar
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "60ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          Hiçbiri canlı sayfalara bağlı değil; seçilen kendi bölümüne taşınıyor,
          kalanlar siliniyor. Liste yeniden eskiye sıralı.{" "}
          <b style={{ fontWeight: 600, color: "var(--text-900)" }}>Kırmızı nokta</b> turun
          kazananının canlıya alındığını,{" "}
          <b style={{ fontWeight: 600, color: "var(--text-900)" }}>yeşil nokta</b> kararın hâlâ
          beklediğini söylüyor.
        </p>
        <p
          style={{
            marginTop: 10,
            maxWidth: "60ch",
            fontSize: 13.5,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          Karara bağlanan ve kaldırılan turlar: iletişim sayfası, ana sayfa ülkeler
          bölümü, süreç bölümü, navbar, gelişmeler kartı, muhasebe hero sahnesi,
          &quot;kim yürütüyor&quot; bölümü, hero sonrası geçiş aralığı, ana sayfa fiyat
          bölümü, hakkımızda sayfa akışı, ülke sayfası fiyat bölümü ve muhasebe takas
          bölümü. Hepsi yalnızca canlı dosyalarında ve commit geçmişinde yaşıyor.
        </p>

        <div style={{ display: "grid", gap: 14, marginTop: 40, maxWidth: 720 }}>
          {LAB_TURLARI.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              aria-label={labAd(p)}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                flexWrap: "wrap",
                padding: "20px 22px",
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--border)",
                background: "var(--white)",
                textDecoration: "none",
              }}
            >
              {/* Nokta aria-hidden; durum kelimesi bağlantının aria-label'ında.
                  Kâğıt zeminde --red-300/--green-300 grafik eşiğini geçmiyor
                  (1,9 ve 1,7), o yüzden burada 600 kademeleri kullanılıyor:
                  --red-600 #c33b3b beyazda 5,04:1 · --green-600 #1e8a54 4,72:1.
                  Şeritteki gece zeminde tersi geçerliydi, oradaki değerler
                  turlar.ts'te. */}
              {p.durum !== "yok" && (
                <span
                  aria-hidden="true"
                  style={{
                    alignSelf: "center",
                    width: 8,
                    height: 8,
                    flex: "none",
                    borderRadius: "50%",
                    background:
                      p.durum === "canli" ? "var(--red-600)" : "var(--green-600)",
                  }}
                />
              )}
              <b
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 17,
                  color: "var(--text-900)",
                }}
              >
                {p.t}
              </b>
              <span style={{ fontSize: 13, color: "var(--blue-900)" }}>{p.n}</span>
              {p.durum !== "yok" && (
                <span style={{ fontSize: 12.5, color: "var(--text-600)" }}>
                  {LAB_DURUM_AD[p.durum]}
                </span>
              )}
              <span style={{ fontSize: 13.5, color: "var(--text-600)", width: "100%" }}>
                {p.l}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
