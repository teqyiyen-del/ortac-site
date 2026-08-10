"use client";

import { useId } from "react";
import { Building2, Globe, Store } from "lucide-react";

/* ORTAK SAHNE — Y4 · Y5 · Y6 adaylarının paylaştığı Dubai şeması
 * Ad alanı: .yhm-  (yapı haritası)
 *
 * ---------------------------------------------------------------------------
 * NEDEN ORTAK
 *
 * Müşteri S3'ün MANTIĞINI onayladı: tek bir şema, kıyı = kararın döndüğü
 * sınır, çitli parseller = serbest bölgeler, ortadaki kutu = siz. Üç adayın
 * tartıştığı şey bu şema değil, şemanın BOŞTAYKEN NE YAPTIĞI ve yanındaki iki
 * kartın ne kadar yer kapladığı. Aynı çizimi üç kez kopyalasaydık üç dosyada
 * üç ayrı geometri sürüklenirdi ve adaylar arasındaki fark "hangisinde parsel
 * nerede" gibi alakasız bir yere kayardı. Çizim burada tek nüsha; adaylar
 * yalnızca durumu (data-state) veriyor, geri kalanı CSS'te kendi ad alanlarında
 * söylüyor.
 *
 * Bu bileşen sarmalayıcıyı BASMIYOR. Sarmalayıcı (.yhm-map + .yN-map) adayın
 * kendi dosyasında, çünkü data-state ve ölçü kararı adaya ait; burada yalnızca
 * içerik var. Böylece css-check her iki sınıfı da düz metin olarak görüyor.
 *
 * ---------------------------------------------------------------------------
 * SAHNEDE NE VAR
 *
 * - KIYI: kararın döndüğü sınır. Satış okunun bu çizgiyi geçip geçmemesi,
 *   bölümün tek sorusunun görsel karşılığı.
 * - PARSELLER: serbest bölgeler şehrin içinde ama kendi çitleri olan alanlar.
 *   Çoğul ve dağınık olmaları bilgi taşıyor: tek bir serbest bölge yok.
 * - ÇİT (HOST): şirketin etrafındaki kesikli çerçeve. Serbest bölgede
 *   beliriyor, mainland'de kayboluyor. Bölümün tek mekanizma cümlesi bu.
 * - İKİ YOL: satış. Biri kıyıyı geçip denizdeki müşteriye, öteki karada kalıp
 *   iç pazardaki dükkâna gidiyor.
 * - SEVKİYAT (.yhm-flow) ve VARIŞ HALKASI (.yhm-hit): canlı bölümün bu turdaki
 *   kazanımı buraya taşındı. Ana yolun üzerinde tek bir tane şirketten çıkıp
 *   alıcıya gidiyor, vardığı anda hedefin çevresinde bir halka açılıp sönüyor.
 *   Serbest bölge tarafında bu tane BAE sınırını kesip dışarı çıkıyor,
 *   mainland tarafında sınırın içinde kalıyor: yapı seçimini belirleyen kural
 *   çizimin kendi hareketinde.
 *
 * Yol çizgileri tek istisna: bilgi taşımıyorlar, karanın "bir şehir" olarak
 * okunmasını sağlıyorlar. Neredeyse görünmez bir tonda ve dörtten fazla
 * değiller.
 *
 * ---------------------------------------------------------------------------
 * HAREKET BURADA TANIMLANMIYOR
 *
 * .yhm-flow ve .yhm-hit varsayılan olarak GÖRÜNMEZ (opacity: 0) ve hiçbir
 * animasyon almıyorlar. Hangi durumda hangisinin koşacağına adayın kendi CSS
 * dosyası karar veriyor, ve o kurallar tamamen `prefers-reduced-motion:
 * no-preference` sorgusunun içinde. Sonuç: reduce altında bu sahnede sıfır
 * animasyon var, geriye anlamlı bir duruş karesi kalıyor. useReducedMotion
 * kullanılmıyor (bu depoda beş ayrı kalıpta hidrasyon hatası çıkardı) ve bu
 * dosyada motion da yok.
 *
 * ---------------------------------------------------------------------------
 * İDDİA SINIRI
 * Sahnede üretilen tek metin üç aktörün adı ("Şirketiniz", "BAE dışı müşteri",
 * "BAE içi müşteri") ve şemanın ölçekli olmadığını söyleyen not. Süre, oran,
 * vize kotası, vergi iddiası yok. Yapının adı ve anlatısı veriden geliyor,
 * çağıran aday veriyor.
 */

export type YapiState = "none" | "free" | "main";

/* ============================ HARİTA GEOMETRİSİ ============================
   Tek koordinat sistemi: hem SVG hem üstteki HTML etiketler bu sayıları
   kullanıyor. Etiketler SVG <text> değil çünkü (a) gerçek CSS tipografisi
   istiyoruz, (b) daralınca punto kontrolü sadece CSS'te var. Yüzdeye çevirmeyi
   pct() yapıyor: bir düğümü kaydırınca etiketi de kendiliğinden kayıyor. */
const VB_W = 560;
const VB_H = 364;

const pct = (x: number, y: number) => ({
  left: `${(x / VB_W) * 100}%`,
  top: `${(y / VB_H) * 100}%`,
});

/* Kıyı soldan sağa yükseliyor: deniz sol üstte büyük bir üçgen bırakıyor.
   Sebep kompozisyon — "dışarıdaki müşteri" düğümüne denizde yer gerekiyordu ve
   iki ok birbirinin tam tersi yöne gidince kıyas tek bakışta okunuyor. */
const COAST = "M0 116 C 120 106, 212 92, 300 74 C 392 55, 472 34, 560 20";
const SEA = "M560 20 C 472 34, 392 55, 300 74 C 212 92, 120 106, 0 116 V0 H560 Z";
const LAND = `${COAST} V${VB_H} H0 Z`;

/* Karanın dokusu. Bilgi taşımıyor, "burası bir şehir" diyor. Kıyıyı
   taşmasınlar diye kara yoluyla kırpılıyorlar. */
const ROADS = [
  "M-20 176 C 120 164, 300 186, 580 158",
  "M-20 276 C 140 266, 330 288, 580 258",
  "M120 400 C 108 300, 124 200, 104 84",
  "M348 400 C 340 300, 356 200, 334 40",
];

/* Serbest bölgeler: şehrin içine dağılmış, kendi çitleri olan alanlar.
   Şirketi barındıran parsel ayrı (HOST) çünkü onun üç ayrı hâli var. Dördü de
   bilerek etiketlerin ve okların geçtiği koridorların dışında. */
const PARCELS = [
  { x: 96, y: 196, w: 96, h: 64 },
  { x: 416, y: 158, w: 80, h: 54 },
  { x: 110, y: 300, w: 88, h: 54 },
  { x: 250, y: 300, w: 84, h: 50 },
];
const HOST = { x: 238, y: 160, w: 124, h: 96 };
const CO = { x: 270, y: 188, w: 60, h: 40 };
const GLOBE = { cx: 86, cy: 52, r: 26 };
const SHOP = { x: 420, y: 272, w: 62, h: 48 };

/* İki satış yolu. Başlangıçları şirket kutusunun kenarları, bitişleri
   düğümlerin kenarından ~8px önce (ok başı orada duruyor).

   Uzunlukları KASITLI OLARAK EŞİT DEĞİL: dışarı giden yol ~215 birim, içeri
   giden ~118. Sevkiyat ikisinde de aynı sürede yola çıkıp aynı anda varıyor,
   yani değişen tek şey katedilen mesafe — bölümün anlattığı fark zaten bu. */
const P_OUT = "M266 202 C 222 194, 166 148, 108 79";
const P_IN = "M332 220 C 374 236, 386 264, 412 292";

/* Şirketin etiketi her durumda AYNI yerde: şirketin hemen üstünde. Etiket bir
   bölgeyi değil, SİZİN hangi yetki alanında olduğunuzu söylüyor; o yüzden
   şirketle birlikte duruyor ve seçim değişince yerinde değişiyor. Nötr hâlde
   "Şirketiniz" yazıyor, yoksa haritanın ortasındaki kutunun ne olduğu belirsiz
   kalıyor: iki müşterinin adı var, şirketin adı yok. */
const CHIP = { x: 300, y: 154 };
const CO_LABEL = "Şirketiniz";

/** Ok başı. Varsayılan yönü +x; açıyı çağıran veriyor çünkü iki yol da eğik. */
function Head({ x, y, deg, role }: { x: number; y: number; deg: number; role: string }) {
  return (
    <path
      d="M-3.4 -5 L6 0 L-3.4 5 Z"
      className="yhm-ah"
      data-role={role}
      transform={`translate(${x} ${y}) rotate(${deg})`}
    />
  );
}

export default function YapiScene({
  state,
  name,
  alt,
}: {
  /** Haritanın hangi yapıyı gösterdiği. CSS'in tek girdisi bu. */
  state: YapiState;
  /** Şirketin üstündeki etikette yazacak yapı adı; yoksa "Şirketiniz". */
  name: string | null;
  /** Şemanın sözlü karşılığı. Nötr hâlin ne anlama geldiği adaydan adaya
   *  değiştiği için (biri baştan seçili, biri sırayla gösteriyor, biri ikisini
   *  birden) metni çağıran veriyor. */
  alt: string;
}) {
  /* React'in ürettiği id noktalama taşıyor; url(#…) düz id karakteri istiyor
     (bkz. scenes/SetupScenes.tsx'teki aynı kalıp). */
  const uid = `yhm${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const clipId = `${uid}-land`;

  return (
    <>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="yhm-svg" role="img" aria-label={alt}>
        <defs>
          <clipPath id={clipId}>
            <path d={LAND} />
          </clipPath>
        </defs>

        <path d={SEA} className="yhm-sea" />
        <path d={LAND} className="yhm-land" />

        <g clipPath={`url(#${clipId})`} aria-hidden="true">
          {ROADS.map((d) => (
            <path key={d} d={d} className="yhm-road" />
          ))}
        </g>

        <path d={COAST} className="yhm-coast" />

        {PARCELS.map((p) => (
          <rect
            key={`${p.x}-${p.y}`}
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            rx="12"
            className="yhm-parcel"
          />
        ))}

        {/* Şirketin çiti. Serbest bölgede beliriyor, mainland'de kayboluyor. */}
        <rect
          x={HOST.x}
          y={HOST.y}
          width={HOST.w}
          height={HOST.h}
          rx="14"
          className="yhm-host"
        />

        {/* Dışarı giden satış. Sıra önemli: yol → sevkiyat → ok başı. Tane ucun
            üstünden geçerken ok başını örtmesin diye ok başı en sonda. */}
        <path d={P_OUT} className="yhm-path" data-role="out" />
        <path d={P_OUT} pathLength={1} className="yhm-flow" data-role="out" />
        <Head x={108} y={79} deg={230} role="out" />

        {/* İçeri kalan satış */}
        <path d={P_IN} className="yhm-path" data-role="in" />
        <path d={P_IN} pathLength={1} className="yhm-flow" data-role="in" />
        <Head x={412} y={292} deg={47} role="in" />

        {/* Siz. Konumu hiç değişmiyor: değişen şey altındaki zemin ve çit. */}
        <rect x={CO.x} y={CO.y} width={CO.w} height={CO.h} rx="12" className="yhm-co" />
        <Building2
          x={CO.x + 21}
          y={CO.y + 11}
          width={18}
          height={18}
          strokeWidth={2.1}
          className="yhm-co-ic"
        />

        {/* Denizdeki müşteri: sınırın dışı */}
        <circle cx={GLOBE.cx} cy={GLOBE.cy} r={GLOBE.r} className="yhm-node" data-role="out" />
        <Globe
          x={GLOBE.cx - 9}
          y={GLOBE.cy - 9}
          width={18}
          height={18}
          strokeWidth={2.1}
          className="yhm-node-ic"
          data-role="out"
        />
        {/* Varış halkası: içi boş, ikonu kapatmıyor. Büyürken viewBox'ı
            taşmıyor (86 − 26·1.22 = 54 > 0). */}
        <circle cx={GLOBE.cx} cy={GLOBE.cy} r={GLOBE.r} className="yhm-hit" data-role="out" />

        {/* Karadaki müşteri: iç pazar */}
        <rect
          x={SHOP.x}
          y={SHOP.y}
          width={SHOP.w}
          height={SHOP.h}
          rx="14"
          className="yhm-node"
          data-role="in"
        />
        <Store
          x={SHOP.x + 22}
          y={SHOP.y + 15}
          width={18}
          height={18}
          strokeWidth={2.1}
          className="yhm-node-ic"
          data-role="in"
        />
        <rect
          x={SHOP.x}
          y={SHOP.y}
          width={SHOP.w}
          height={SHOP.h}
          rx="14"
          className="yhm-hit"
          data-role="in"
        />
      </svg>

      {/* Müşteri etiketleri sabit: haritanın sorusu ("müşteriniz hangi
          tarafta?") seçim yapılmadan önce de ekranda duruyor. */}
      <span
        className="yhm-pin"
        data-side="out"
        data-on={state === "free" || undefined}
        style={pct(GLOBE.cx + GLOBE.r + 8, GLOBE.cy)}
      >
        <Globe size={13} strokeWidth={2.3} aria-hidden="true" />
        BAE dışı müşteri
      </span>
      <span
        className="yhm-pin"
        data-side="in"
        data-on={state === "main" || undefined}
        style={pct(SHOP.x + SHOP.w / 2, SHOP.y + SHOP.h + 10)}
      >
        <Store size={13} strokeWidth={2.3} aria-hidden="true" />
        BAE içi müşteri
      </span>

      {/* Şirketin etiketi. Metin değişimi anlık: harita 340ms'de renk
          değiştirirken etiketin de solup gelmesi için AnimatePresence
          gerekirdi, o da bu sahneye motion sokardı. Tek kelimelik bir kutunun
          anında değişmesi okunurluğu bozmuyor. */}
      <span
        className="yhm-chip"
        data-neutral={name ? undefined : true}
        style={pct(CHIP.x, CHIP.y)}
      >
        {name ?? CO_LABEL}
      </span>
    </>
  );
}
