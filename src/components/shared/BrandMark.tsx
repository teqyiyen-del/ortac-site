import { BRANDS, type Brand, type BrandKey, type Wordmark } from "@/lib/brands";

/* Markayı ekrana basan üç bileşen. Kayıt defteri tek: lib/brands.ts.
 *
 * `BrandChip` normal DOM akışında duruyor: tablo satırı, şerit, kart altı.
 * TAM LOGO BASAN TEK YER BURASI — çünkü lockup yatay ve akışkan bir kutu
 * istiyor, DOM'da bunu verebilen tek bileşen bu.
 *
 * `BrandBadge` bir SVG sahnesinin İÇİNE giriyor: yuvarlatılmış açık bir plaka
 * ve üstünde markanın kendi rengiyle işareti. Plaka şart — PayPal'ın lacivert
 * tonu ya da Stripe'ın moru neredeyse siyah bir zeminde kayboluyor. Gerçek
 * dünyada ödeme rozetleri de zaten hep açık bir zemin üstünde duruyor.
 *
 * `BrandGlyph` plakasız, satır içi işaret: kendi zemini olan listeler için.
 *
 * BADGE VE GLYPH TAM LOGO BASMIYOR — bilerek, ve müşteri de böyle istedi
 * İkisi de KARE bir yuvada duruyor: Badge 20–24px'lik bir plakanın içinde,
 * Glyph 14–16px'lik bir tablo hücresinde, adın hemen solunda. Yatay bir
 * lockup'ı o yuvaya sokmanın iki yolu var, ikisi de kötü: ya lockup küçülür
 * (yazısı 4px'e iner, okunmaz) ya yuva genişler (matrisin sütun ritmi
 * bozulur). Üstelik o satırlarda ad ZATEN yanında yazılı ve yazılı kalmalı,
 * çünkü satırın konusu marka değil kanalın durumu.
 *
 * Müşterinin tam logo dosyalarını gönderirken koyduğu kural bu ayrımı birebir
 * doğruluyor: "sadece iconunu kullandığımız yerlerde renkli icon kullanmaya
 * devam ederiz." Yani Badge ve Glyph markanın KENDİ RENGİNDE kalıyor
 * (`path` + `hex`), tek tonlu lockup yalnızca BrandChip'e giriyor. Bu yüzden
 * lockup'ı gelen satırlarda `path` silinmedi; iki varlık bir arada duruyor ve
 * seçimi burası yapıyor, çağrı yeri değil.
 *
 * Resmî SİMGESİ olmayan markalar (SWAP:BRAND_ASSET) bu iki bileşende baş
 * harfle çıkıyor — tam logosu olsa bile, çünkü kare yuvaya lockup girmiyor.
 * Renk uydurulmuyor; kilit nötr kalıyor ki ekranda "yanlış logo" durmasın.
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

/** Plakasız, satır içi işaret. Zaten kendi zemini olan listeler için. */
export function BrandGlyph({ brand, size = 16 }: { brand: BrandKey; size?: number }) {
  const b = BRANDS[brand];
  if (!("path" in b) || !b.path) {
    return (
      <b className="bm-g bm-g-mono" style={{ fontSize: size * 0.68 }} aria-hidden="true">
        {"mono" in b ? b.mono : "?"}
      </b>
    );
  }
  return (
    <svg
      className="bm-g"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d={b.path} fill={b.hex} />
    </svg>
  );
}

/* ------------------------------------------------------------- tam logo -- */
/* OPTİK DENGE — neden kutuya değil gövdeye göre ölçekliyoruz
 *
 * Tam logolar aynı şeritte yan yana duruyor. Ham hâlleriyle konurlarsa biri
 * devasa biri minicik görünür ve bunun sebebi logoların kendisi değil,
 * DOSYALARIN kırpımı: bir marka viewBox'ı yazının tam sınırına oturtur, öbürü
 * descender'a kadar indirir, üçüncüsü çevresine yarım birim pay bırakır.
 * Kutuları eşitleyen bir ölçek bu farkı olduğu gibi ekrana geçirir.
 *
 * Göz kutuya değil GÖVDEYE bakıyor. `wordmark.body` o şeridi taşıyor ve ölçek
 * ona kuruluyor: hangi dosya gelirse gelsin gövde tam `optical` piksele
 * oturuyor.
 *
 * İKİNCİ İŞ — kutuyu da yeniden kırpıyoruz, ve bu şart
 * Yalnızca ölçeği düzeltmek yetmiyor. Gövdesi doğru ölçeğe gelmiş ama dosyası
 * bol paylı bir logo, kutusuyla birlikte hâlâ devasa bir yer kaplıyor: şerit
 * bir yongada 42px, öbüründe 70px oluyor ve bu sefer boşluklar dengesizleşiyor.
 * O yüzden ekrana basılan viewBox, gelen dosyanınki değil — gövdenin ortasına
 * oturtulmuş, gövdenin `WORDMARK_BOX` katı yüksekliğinde YENİ bir pencere.
 *
 * İki kazancı var:
 *   1. Kutu yüksekliği artık markadan bağımsız, hep `optical × WORDMARK_BOX`.
 *      Şeritteki bütün yongalar birebir aynı boyda.
 *   2. Dikey hizalama bedava geliyor — pencere gövdenin ortasına kuruluyor,
 *      dosyanın kırpımı asimetrik olsa da logo satır çizgisine oturuyor.
 *      Ayrıca bir transform'a gerek kalmıyor.
 *
 * KARŞILIĞINDA `body` DOĞRU VERİLMELİ: pencerenin dışında kalan mürekkep
 * kırpılır. `body`, logonun optik olarak okunan bütün gövdesini kapsamalı
 * (işaret yazıdan yüksekse işareti de). Pay yine de bol: pencere gövdenin iki
 * katı, yani altta ve üstte gövdenin yarısı kadar hava var — descender ve
 * aksan oraya rahat sığıyor. */
const WORDMARK_BOX = 2;

function wordmarkBox(wm: Wordmark, optical: number) {
  const [vx, , vw] = wm.viewBox.split(/[\s,]+/).map(Number);
  const [top, bottom] = wm.body;
  const bodyH = bottom - top;
  /* px / viewBox birimi — gövdeyi tam `optical` piksele oturtan katsayı */
  const s = optical / bodyH;
  /* pencerenin viewBox birimi cinsinden yüksekliği */
  const winH = bodyH * WORDMARK_BOX;
  return {
    w: vw * s,
    h: optical * WORDMARK_BOX,
    viewBox: `${vx} ${(top + bottom) / 2 - winH / 2} ${vw} ${winH}`,
  };
}

/* Kare işaretin yüksekliği ile lockup gövdesinin yüksekliği aynı sayı olamaz:
 * 20px'lik bir simge dolu bir kütle, 20px'lik bir versal harf sırası ise
 * ondan çok daha ağır okunur. 0.7 şu hesabın sonucu: nav şeridinde işaret 20px
 * ve plakasıyla birlikte yonga 42px tutuyor. Lockup'ta gövde 20×0.7=14px,
 * pencere 14×2=28px, yonganın 7px'lik simetrik dolgusuyla yine 42px. Yani
 * lockup'lı ve işaretli yonga şeritte birebir aynı yüksekliğe oturuyor.
 * Çağrı yeri gerekirse `optical` ile kendi sayısını verebiliyor. */
const WORDMARK_OPTICAL = 0.7;

/** DOM akışı: tam logo, yoksa işaret + ad. Tablo satırı, şerit, kart altı. */
export function BrandChip({
  brand,
  withName = true,
  size = 20,
  optical,
}: {
  brand: BrandKey;
  withName?: boolean;
  size?: number;
  /** lockup gövdesinin piksel yüksekliği; verilmezse `size`dan türer */
  optical?: number;
}) {
  /* `as const satisfies` her satıra kendi dar tipini veriyor, yani `wordmark`
     alanı yalnızca onu TAŞIYAN satırların tipinde var. `"wordmark" in b` ile
     daraltmak bu yüzden kırılgan: alan bir satırdan çıktığı gün daraltma boş
     tip üretiyor. Okuma `Brand` üzerinden yapılıyor — hangi satırda alan var
     hangisinde yok, bu kodun umurunda değil. */
  const b: Brand = BRANDS[brand];
  const wm = b.wordmark;

  /* TAM LOGO — ne plaka ne ad.
     Plaka yok, çünkü lockup zaten kendi kilidini taşıyor; arkasına ikinci bir
     beyaz kutu koymak "kutu içinde kutu" oluyor. Ad yok, çünkü ad logonun
     İÇİNDE — yanına bir de düz yazıyla yazmak müşterinin şikâyet ettiği
     şeyin ta kendisi. `withName` bu dalda bilerek okunmuyor. */
  if (wm) {
    const box = wordmarkBox(wm, optical ?? size * WORDMARK_OPTICAL);
    return (
      <span className="bm-chip" data-wm="">
        <svg
          width={box.w}
          height={box.h}
          viewBox={box.viewBox}
          role="img"
          aria-label={b.title}
          focusable="false"
        >
          {wm.parts.map((p, i) => (
            <path key={i} d={p.d} fill={p.fill ?? "currentColor"} />
          ))}
        </svg>
      </span>
    );
  }

  return (
    <span className="bm-chip">
      <span className="bm-chip-plate" style={{ width: size + 12, height: size + 12 }}>
        {b.path ? (
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
            {b.mono ?? "?"}
          </b>
        )}
      </span>
      {withName && <span className="bm-chip-n">{b.title}</span>}
    </span>
  );
}
