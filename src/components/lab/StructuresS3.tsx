"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Globe,
  Store,
  TriangleAlert,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import type { CountryContent } from "@/lib/countryContent";

/* ADAY S3 (.shar-) — "serbest bölge mi, mainland mi?" · HARİTA/ŞEMA
 *
 * ---------------------------------------------------------------------------
 * 1) NEDEN TEKRAR HARİTA
 *
 * Bu bölüm hero'dan hemen sonra geliyor. Oraya gelen ziyaretçi henüz ülkeyi
 * tanımıyor; "bölge otoritesi", "mainland", "vize kotası" kelimelerinin hiçbiri
 * onun için henüz bir şey ifade etmiyor. Kıyas tablosu bu yüzden ters tepti:
 * tablo, karşılaştıracak iki şeyi ZATEN bilen birine hitap eder. Burada
 * ziyaretçinin ilk ihtiyacı kıyas değil, ZİHİNSEL RESİM — "serbest bölge" diye
 * bir yer varmış, o yer ülkenin içindeymiş, ve satışın nereye gittiği o yerin
 * seçimini belirliyormuş.
 *
 * İlk turda bir bölge haritası vardı ve müşteri o çerçeveyi özlüyor. Haritanın
 * yaptığı iş şu: iki kelimeyi (serbest bölge / mainland) iki YERE çeviriyor.
 * Yer, kelimeden önce anlaşılır. O yüzden bu adayda bölümün merkezi tek bir
 * çizim; metin çizimin etrafında ve az.
 *
 * ---------------------------------------------------------------------------
 * 2) ÇİZİMDE NE VAR, NEDEN VAR
 *
 * Haritadaki hiçbir öge süs değil; her biri kuralın bir parçasını taşıyor:
 *
 * - KIYI ÇİZGİSİ: kararın döndüğü sınır. Satış okunun bu çizgiyi geçip
 *   geçmemesi, bölümün tek sorusunun görsel karşılığı. Deniz sadece "burası
 *   Dubai" demek için değil — dışarısı için bir YÖN gerekiyordu, suyu geçmek
 *   "yurt dışı" demenin en kısa yolu.
 * - PARSELLER: serbest bölgeler şehrin içinde ama kendi çitleri olan ayrı
 *   alanlar. Çoğul ve dağınık çizilmeleri bilgi taşıyor: tek bir "serbest
 *   bölge" yok, düzinelerce var.
 * - ÇİT (kesikli mavi çerçeve): lisansın hangi otoriteye bağlı olduğunun
 *   coğrafi karşılığı. Serbest bölge seçilince şirketin etrafında BELİRİYOR,
 *   mainland seçilince KAYBOLUYOR. Bölümün anlatmak istediği mekanizma tam
 *   olarak bu tek hareket: aynı şirket, farklı yetki alanı.
 * - İKİ OK: satış. Biri kıyıyı geçip denizdeki müşteriye, öteki karada kalıp
 *   iç pazardaki dükkâna gidiyor. Seçilmeyen taraf silinmiyor, KESİK ve SOLUK
 *   kalıyor — "o taraf imkânsız değil, ama bu yapıyı kurma sebebiniz o değil".
 *   Serbest bölge tarafında bu kesik çizgi doğrudan `watch` alanının resmi:
 *   iç pazara doğrudan satış ek düzenleme istiyor.
 *
 * Yol çizgileri tek istisna: bilgi taşımıyorlar, karanın "bir şehir" olarak
 * okunmasını sağlıyorlar. Onlarsız kara soyut bir dikdörtgen; parsellerin
 * "şehrin içindeki alanlar" olduğu okunmuyor. Bu yüzden neredeyse görünmez
 * bir tonda ve dörtten fazla değiller.
 *
 * ---------------------------------------------------------------------------
 * 3) KURAL BİR METİN KUTUSU DEĞİL, KUMANDA
 *
 * data.rule ("Kararı satış yaptığınız taraf veriyor: müşteriniz BAE dışındaysa
 * serbest bölge, BAE içindeyse mainland.") aynen basılıyor — dipnot değil,
 * sağ sütunun en üstünde. Ama asıl iş onun altında: iki seçim satırı kuralın
 * iki dalını AYNEN tekrar ediyor ve tıklanabilir. Yani ziyaretçi yapı seçmiyor,
 * KENDİ MÜŞTERİSİNİN NEREDE OLDUĞUNU söylüyor; yapıyı harita cevaplıyor.
 *
 * Bu ayrım önemli: "serbest bölge mi mainland mi" sorusuna cevap vermek uzmanlık
 * gerektirir, "müşterim nerede" sorusuna cevap vermek gerektirmez. Bölüm bu
 * yüzden hero'dan sonraki yere yakışıyor — ziyaretçiden bilmediği bir şeyi
 * değil, en iyi bildiği şeyi istiyor.
 *
 * Satırların üzerine gelmek haritayı ÖNİZLİYOR (seçim değişmeden şema o yapıyı
 * gösteriyor). Kural ile çizim arasındaki bağı tek bir hareketle kuran şey bu;
 * ziyaretçinin tıklamadan önce ne olacağını görmesi tıklama eşiğini düşürüyor.
 *
 * ---------------------------------------------------------------------------
 * 4) ÖZET ÖNDE, DETAY TALEP ÜZERİNE
 *
 * Kapalı hâlde ekranda: harita + kural cümlesi + iki satır. Toplam ~40 kelime.
 * `line`in ilk cümlesi (otorite bilgisi) haritada, seçilen bölgenin üzerindeki
 * etikette duruyor — yani metin olarak değil, YERE İLİŞTİRİLMİŞ olarak. İkinci
 * cümlesi ve `fit` listesi satır açılınca geliyor.
 *
 * `watch` gizlenmiyor: bir yapıyı seçen kişi o yapının uyarısını EK BİR TIK
 * OLMADAN görüyor (uyarı açılan katmanın içinde, ikinci bir düğmenin arkasında
 * değil). Üstelik serbest bölge tarafının uyarısı kapalıyken bile haritada
 * kesik çizgi olarak duruyor.
 *
 * ---------------------------------------------------------------------------
 * ---------------------------------------------------------------------------
 * NOT: Bölümde id="yapi" yok. Aday olduğu için: üç aday aynı lab sayfasında
 * yan yana duruyor ve aynı id üç kez basılamaz. Kazanan bölüme taşınırken
 * id oraya eklenecek.
 *
 * ---------------------------------------------------------------------------
 * İDDİA SINIRI
 * Bütün metin data'dan geliyor; burada üretilen tek kelime kuralın iki dalının
 * kısa etiketleri ("BAE dışı" / "BAE içi") ve haritanın şematik olduğunu
 * söyleyen not. Süre, banka veya vergi iddiası yok. Harita ölçekli değil ve
 * bunu altındaki notta kendisi söylüyor.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ============================ HARİTA GEOMETRİSİ ============================
   Tek bir koordinat sistemi: hem SVG hem üstteki HTML etiketler bu sayıları
   kullanıyor. Etiketler SVG <text> değil çünkü (a) gerçek CSS tipografisi
   istiyoruz, (b) daralınca punto/satır kırma kontrolü sadece CSS'te var,
   (c) seçime göre girip çıkmaları motion ile tek satırda oluyor.
   Yüzdeye çevirme işini pct() yapıyor; yani bir düğümü kaydırınca etiketi de
   kendiliğinden kayıyor, iki yerde sayı güncellemek yok. */
const VB_W = 560;
const VB_H = 364;

const pct = (x: number, y: number) => ({
  left: `${(x / VB_W) * 100}%`,
  top: `${(y / VB_H) * 100}%`,
});

/* Kıyı soldan sağa yükseliyor: deniz sol üstte büyük bir üçgen bırakıyor.
   Sebep kompozisyon — "dışarıdaki müşteri" düğümüne denizde yer gerekiyordu ve
   iki ok birbirinin tam tersi yöne (sol-yukarı / sağ-aşağı) gidince kıyas
   tek bakışta okunuyor. */
const COAST = "M0 116 C 120 106, 212 92, 300 74 C 392 55, 472 34, 560 20";
const SEA = "M560 20 C 472 34, 392 55, 300 74 C 212 92, 120 106, 0 116 V0 H560 Z";
const LAND = `${COAST} V${VB_H} H0 Z`;

/* Karanın dokusu. Bilgi taşımıyor, "burası bir şehir" diyor — bkz. başlıktaki
   2. madde. Kıyıyı taşmasınlar diye kara yoluyla kırpılıyorlar. */
const ROADS = [
  "M-20 176 C 120 164, 300 186, 580 158",
  "M-20 276 C 140 266, 330 288, 580 258",
  "M120 400 C 108 300, 124 200, 104 84",
  "M348 400 C 340 300, 356 200, 334 40",
];

/* Serbest bölgeler: şehrin içine dağılmış, kendi çitleri olan alanlar.
   Şirketi barındıran parsel ayrı (HOST) çünkü onun üç ayrı hâli var.
   Dördü de bilerek etiketlerin ve okların geçtiği koridorların dışında:
   parseller kompozisyonun zeminini kuruyor, üstünden geçen hiçbir şeyi
   kesmiyorlar. */
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
   düğümlerin kenarından ~8px önce (ok başı orada duruyor). */
const P_OUT = "M266 202 C 222 194, 166 148, 108 79";
const P_IN = "M332 220 C 374 236, 386 264, 412 292";

/* Seçilen yapının etiketi her iki durumda da AYNI yerde: şirketin hemen
   üstünde. İlk denemede etiket "anlattığı bölgenin üzerinde" duruyordu —
   serbest bölgede çitin üstünde, mainland'de karanın ortasında. İki sorun
   çıktı: mainland etiketi haritanın sağ alt köşesini (iç pazar düğümü + onun
   etiketi + satış oku) tıkıyordu, ve dar ekranda HTML etiketler SVG kadar
   küçülmediği için üst üste biniyorlardı.

   Sabit yer aslında daha doğru da: etiket bir bölgeyi değil, SİZİN hangi
   yetki alanında olduğunuzu söylüyor. O yüzden şirketin üstünde duruyor ve
   seçim değişince yerinde değişiyor — bölümün "aynı şirket, farklı yetki
   alanı" cümlesini etiketin kendisi de tekrar ediyor.

   Nötr hâlde de duruyor, "Şirketiniz" yazarak. İlk denemede seçim yapılmadan
   etiket yoktu ve haritanın ortasındaki küçük kutunun ne olduğu belirsiz
   kalıyordu: iki müşterinin adı vardı, şirketin adı yoktu. Bu, çizimin
   cümlesini yarım bırakıyordu. */
const CHIP = { x: 300, y: 154 };
/* Haritadaki üç aktörden birinin adı; veri değil, arayüz sözlüğü. */
const CO_LABEL = "Şirketiniz";

/** Ok başı. Varsayılan yönü +x; açıyı çağıran veriyor çünkü iki yol da eğik. */
function Head({ x, y, deg, role }: { x: number; y: number; deg: number; role: string }) {
  return (
    <path
      d="M-3.4 -5 L6 0 L-3.4 5 Z"
      className="shar-ah"
      data-role={role}
      transform={`translate(${x} ${y}) rotate(${deg})`}
    />
  );
}

/* ============================ SUNUM SÖZLÜĞÜ ============================
   data.rule cümlesindeki iki koşulun okunur hâli. İçerik oradan geliyor,
   burada yeni bir iddia yok; yalnızca cümleyi tıklanabilir iki dala bölüyoruz.
   Sıra options dizisiyle aynı olmak zorunda: 0 = serbest bölge, 1 = mainland.
   Bileşen zaten yalnızca Dubai'de kullanılıyor (structures başka ülkede yok),
   o yüzden bu eşleşme veriye değil sunuma ait bir karar. */
const VIEWS = [
  { key: "free", when: "Müşteriniz BAE dışında", Icon: Globe },
  { key: "main", when: "Müşteriniz BAE içinde", Icon: Store },
] as const;

/* `line` iki cümle taşıyor: önce lisansın bağlı olduğu otorite, sonra bir
   bağlam cümlesi. İkisi bu tasarımda iki ayrı yere gidiyor — otorite haritadaki
   etikete (çünkü otorite bir YER meselesi ve orada gösterilebiliyor), bağlam
   cümlesi açılan detaya. Böylece aynı cümle iki kez basılmıyor ve haritanın
   etiketi tek satırda kalıyor. */
function splitLine(line: string) {
  const [first, ...rest] = line.split(". ");
  return { head: first.replace(/\.$/, ""), tail: rest.join(". ") };
}

export default function StructuresS3({
  data,
}: {
  data: NonNullable<CountryContent["structures"]>;
}) {
  /* Açılışta seçim yok. Varsayılan bir yapı koymak, ziyaretçi daha soruyu
     okumadan ona bir öneri yapmak olurdu; harita nötr başlıyor ve iki yol da
     eşit soluklukta duruyor — soru çizilmiş hâlde. */
  const [picked, setPicked] = useState<number | null>(null);
  /* Önizleme: fareyle üzerine gelinen (veya klavyeyle odaklanılan) satır,
     seçimi değiştirmeden haritayı o yapıya çeviriyor. Satır ile çizim
     arasındaki bağı kuran şey bu. */
  const [hint, setHint] = useState<number | null>(null);
  const shown = hint ?? picked;

  const reduce = useReducedMotion();
  /* React'in ürettiği id noktalama taşıyor; hem url(#…) hem aria-controls
     düz id karakteri istiyor (bkz. scenes/SetupScenes.tsx'teki aynı kalıp). */
  const uid = `s3${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const clipId = `${uid}-land`;

  const state = shown === null ? "none" : VIEWS[shown]?.key ?? "none";
  const shownName = shown === null ? null : data.options[shown]?.name;

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text={data.title}
            accent="serbest bölge mi, mainland mi?"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{data.lead}</p>
          </FadeUp>
        </div>

        <div className="shar-grid">
          {/* ---------------------------- HARİTA ---------------------------- */}
          <FadeUp delay={0.26}>
            <figure className="shar-fig">
              <div className="shar-map" data-state={state}>
                <svg
                  viewBox={`0 0 ${VB_W} ${VB_H}`}
                  className="shar-svg"
                  role="img"
                  aria-label={
                    shownName
                      ? `Şematik harita: ${shownName} seçili. ${
                          state === "free"
                            ? "Şirket, ülkenin içindeki çitli bir serbest bölgede; satış kıyıyı geçip BAE dışındaki müşteriye gidiyor."
                            : "Şirket ülkenin genelinde; satış sınırın içinde kalıp BAE içindeki müşteriye gidiyor."
                        }`
                      : "Şematik harita: ülkenin içinde çitli serbest bölge parselleri, dışarıda ve içeride birer müşteri. Bir seçim yapıldığında harita o yapıya göre değişiyor."
                  }
                >
                  <defs>
                    <clipPath id={clipId}>
                      <path d={LAND} />
                    </clipPath>
                  </defs>

                  <path d={SEA} className="shar-sea" />
                  <path d={LAND} className="shar-land" />

                  <g clipPath={`url(#${clipId})`} aria-hidden="true">
                    {ROADS.map((d) => (
                      <path key={d} d={d} className="shar-road" />
                    ))}
                  </g>

                  {/* Kıyı ayrı bir yol: kara dolgusundan bağımsız çiziliyor ki
                      bölüm görüş alanına girdiğinde kendini çizebilsin. Haritanın
                      "gelme" anı tek bir ögede toplanıyor; gerisi sabit. */}
                  <motion.path
                    d={COAST}
                    className="shar-coast"
                    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                    whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
                  />

                  {PARCELS.map((p) => (
                    <rect
                      key={`${p.x}-${p.y}`}
                      x={p.x}
                      y={p.y}
                      width={p.w}
                      height={p.h}
                      rx="12"
                      className="shar-parcel"
                    />
                  ))}

                  {/* Şirketin çiti. Serbest bölgede beliriyor, mainland'de
                      kayboluyor — bölümün tek mekanizma cümlesi bu hareket. */}
                  <rect
                    x={HOST.x}
                    y={HOST.y}
                    width={HOST.w}
                    height={HOST.h}
                    rx="14"
                    className="shar-host"
                  />

                  {/* İki yol da hep duruyor; seçilmeyen kesik ve soluk kalıyor */}
                  <path d={P_OUT} className="shar-path" data-role="out" />
                  <Head x={108} y={79} deg={230} role="out" />
                  <path d={P_IN} className="shar-path" data-role="in" />
                  <Head x={412} y={292} deg={47} role="in" />

                  {/* Siz. Konumu hiç değişmiyor: değişen şey altındaki zemin */}
                  <rect
                    x={CO.x}
                    y={CO.y}
                    width={CO.w}
                    height={CO.h}
                    rx="12"
                    className="shar-co"
                  />
                  <Building2
                    x={CO.x + 21}
                    y={CO.y + 11}
                    width={18}
                    height={18}
                    strokeWidth={2.1}
                    className="shar-co-ic"
                  />

                  {/* Denizdeki müşteri: sınırın dışı */}
                  <circle
                    cx={GLOBE.cx}
                    cy={GLOBE.cy}
                    r={GLOBE.r}
                    className="shar-node"
                    data-role="out"
                  />
                  <Globe
                    x={GLOBE.cx - 9}
                    y={GLOBE.cy - 9}
                    width={18}
                    height={18}
                    strokeWidth={2.1}
                    className="shar-node-ic"
                    data-role="out"
                  />

                  {/* Karadaki müşteri: iç pazar */}
                  <rect
                    x={SHOP.x}
                    y={SHOP.y}
                    width={SHOP.w}
                    height={SHOP.h}
                    rx="14"
                    className="shar-node"
                    data-role="in"
                  />
                  <Store
                    x={SHOP.x + 22}
                    y={SHOP.y + 15}
                    width={18}
                    height={18}
                    strokeWidth={2.1}
                    className="shar-node-ic"
                    data-role="in"
                  />
                </svg>

                {/* Müşteri etiketleri sabit: haritanın sorusu ("müşteriniz hangi
                    tarafta?") seçim yapılmadan önce de ekranda duruyor. Seçim
                    yapılınca ilgili taraf maviye dönüyor. */}
                <span
                  className="shar-pin"
                  data-side="out"
                  data-on={state === "free" || undefined}
                  style={pct(GLOBE.cx + GLOBE.r + 8, GLOBE.cy)}
                >
                  <Globe size={13} strokeWidth={2.3} aria-hidden="true" />
                  BAE dışı müşteri
                </span>
                <span
                  className="shar-pin"
                  data-side="in"
                  data-on={state === "main" || undefined}
                  style={pct(SHOP.x + SHOP.w / 2, SHOP.y + SHOP.h + 10)}
                >
                  <Store size={13} strokeWidth={2.3} aria-hidden="true" />
                  BAE içi müşteri
                </span>

                {/* Şirketin etiketi. Nötr hâlde yalnızca "Şirketiniz"; seçim
                    yapılınca yerinde yapının adına ve o yapının bağlı olduğu
                    otoriteye dönüşüyor. mode="wait": iki etiket aynı noktada
                    durduğu için üst üste binmesinler, biri çıksın öteki girsin.
                    Süre kısa (0.18) çünkü bu geçiş satırların üzerinde
                    gezinirken de tetikleniyor. */}
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={shownName ?? "co"}
                    className="shar-terr"
                    data-neutral={shownName ? undefined : true}
                    style={pct(CHIP.x, CHIP.y)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18, ease: EASE }}
                  >
                    <span className="shar-terr-n">{shownName ?? CO_LABEL}</span>
                    {shown !== null && data.options[shown] ? (
                      <span className="shar-terr-a">
                        {splitLine(data.options[shown].line).head}
                      </span>
                    ) : null}
                  </motion.span>
                </AnimatePresence>
              </div>

              <figcaption className="shar-cap">
                Şematik gösterim; ölçekli harita değildir.
              </figcaption>
            </figure>
          </FadeUp>

          {/* ------------------------ KURAL + SEÇİM ------------------------ */}
          <FadeUp delay={0.32}>
            <div className="shar-side">
              <div className="shar-rule">
                <span className="shar-rule-k">Karar kuralı</span>
                <p className="shar-rule-t">{data.rule}</p>
              </div>

              <div className="shar-picks">
                {data.options.map((o, idx) => {
                  const v = VIEWS[idx];
                  const on = picked === idx;
                  const det = `${uid}-d${idx}`;
                  const { head, tail } = splitLine(o.line);
                  return (
                    <div
                      key={o.name}
                      className="shar-pick"
                      data-on={on || undefined}
                      data-pre={(hint === idx && !on) || undefined}
                    >
                      <button
                        type="button"
                        className="shar-pick-t"
                        aria-expanded={on}
                        aria-controls={on ? det : undefined}
                        onClick={() => setPicked(on ? null : idx)}
                        onPointerEnter={() => setHint(idx)}
                        onPointerLeave={() => setHint(null)}
                        onFocus={() => setHint(idx)}
                        onBlur={() => setHint(null)}
                      >
                        <span className="shar-pick-ic">
                          {v ? <v.Icon size={16} strokeWidth={2.2} aria-hidden="true" /> : null}
                        </span>
                        <span className="shar-pick-if">{v?.when}</span>
                        <span className="shar-pick-then">
                          <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
                          {o.name}
                        </span>
                        <ChevronDown
                          size={16}
                          strokeWidth={2.3}
                          className="shar-pick-cv"
                          aria-hidden="true"
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            key="det"
                            id={det}
                            className="shar-det"
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.38, ease: EASE }}
                          >
                            <div className="shar-det-in">
                              {/* Otorite cümlesi normalde haritadaki etikette
                                  duruyor. Dar ekranda o etiket tek satıra
                                  iniyor (HTML etiketler SVG kadar küçülemiyor)
                                  ve cümle oradan düşüyor — burada geri geliyor.
                                  Hangisinin görüneceğine CSS karar veriyor, iki
                                  yerde birden görünmüyor. */}
                              <p className="shar-det-l">
                                {tail ? <span className="shar-det-a">{head}. </span> : null}
                                {tail || `${head}.`}
                              </p>
                              <ul className="shar-fit">
                                {o.fit.map((f) => (
                                  <li key={f}>
                                    <Check size={12} strokeWidth={3.4} aria-hidden="true" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                              {/* Uyarı, açılan katmanın İÇİNDE ve ikinci bir
                                  düğmenin arkasında değil: bir yapıyı seçen
                                  kişi onun kısıtını aynı hareketle görüyor. */}
                              <p className="shar-watch">
                                <TriangleAlert size={14} strokeWidth={2.3} aria-hidden="true" />
                                {o.watch}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
