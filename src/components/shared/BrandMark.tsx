import { BRANDS, type BrandKey } from "@/lib/brands";

/* Marka işaretini ekrana basan iki bileşen.
 *
 * `BrandBadge` bir SVG sahnesinin İÇİNE giriyor: yuvarlatılmış açık bir plaka
 * ve üstünde markanın kendi rengiyle işareti. Plaka şart — PayPal'ın lacivert
 * tonu ya da Stripe'ın moru neredeyse siyah bir zeminde kayboluyor. Gerçek
 * dünyada
 * ödeme rozetleri de zaten hep açık bir zemin üstünde duruyor.
 *
 * `BrandChip` normal DOM akışında duruyor: işaret + marka adı, tablo satırı
 * veya şerit için.
 *
 * Resmî vektörü olmayan markalar (SWAP:BRAND_ASSET) baş harfle çıkıyor. Renk
 * uydurulmuyor; kilit nötr kalıyor ki ekranda "yanlış logo" durmasın.
 */

const FALLBACK_INK = "#5c5c5c";

/** SVG sahnesi içi: plaka + işaret. x/y plakanın sol üst köşesi. */
export function BrandBadge({
  brand,
  x,
  y,
  size = 34,
  radius = 10,
}: {
  brand: BrandKey;
  x: number;
  y: number;
  size?: number;
  radius?: number;
}) {
  const b = BRANDS[brand];
  const inset = size * 0.22;
  const glyph = size - inset * 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={size}
        height={size}
        rx={radius}
        className="bm-plate"
      />
      {"path" in b && b.path ? (
        <svg
          x={x + inset}
          y={y + inset}
          width={glyph}
          height={glyph}
          viewBox="0 0 24 24"
          focusable="false"
        >
          <path d={b.path} fill={b.hex} />
        </svg>
      ) : (
        <text
          x={x + size / 2}
          y={y + size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          className="bm-mono"
          style={{ fontSize: size * 0.36 }}
        >
          {"mono" in b ? b.mono : "?"}
        </text>
      )}
    </g>
  );
}

/** DOM akışı: işaret + ad. Tablo satırı, şerit, kart altı için. */
export function BrandChip({
  brand,
  withName = true,
  size = 20,
}: {
  brand: BrandKey;
  withName?: boolean;
  size?: number;
}) {
  const b = BRANDS[brand];
  const hasPath = "path" in b && !!b.path;

  return (
    <span className="bm-chip">
      <span className="bm-chip-plate" style={{ width: size + 12, height: size + 12 }}>
        {hasPath ? (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            role="img"
            aria-label={b.title}
            focusable="false"
          >
            <path d={b.path} fill={b.hex} />
          </svg>
        ) : (
          <b style={{ fontSize: size * 0.52, color: FALLBACK_INK }} aria-label={b.title}>
            {"mono" in b ? b.mono : "?"}
          </b>
        )}
      </span>
      {withName && <span className="bm-chip-n">{b.title}</span>}
    </span>
  );
}
