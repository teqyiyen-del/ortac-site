"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight, TriangleAlert } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PAY_MATRIX,
  type CountrySlug,
} from "@/lib/brand";

/* ============================================================================
   ADAY C3 — "hizmet verdiğimiz bölgeler", tek eksene indirilmiş hâli.

   NEDEN BÖYLE

   Müşterinin şikâyeti bölümün kalabalık olması; brief'in bana verdiği açı ise
   "tek güçlü görsel eksen — harita/küre üzerinde üç nokta". Açıyı aldım ama
   küreyi almadım, çünkü küre bu sayfada zaten var: hero'nun içinde noktalı bir
   dünya dönüyor, üstünde bu üç ülkenin pini ve bayrak seçicisi duruyor
   (HeroGlobe + SvgGlobe). Hero'nun hemen ardından ikinci bir küre koymak
   "sadeleştirme" değil, aynı görselin tekrarı olurdu.

   Onun yerine küreyi tek bir çizgiye indirdim: ufuk. Yay gerçek boylamlara
   göre çizilmiş bir eksen — soldan sağa batıdan doğuya. İstanbul yayın
   tepesinde duruyor (bakan kişi orada), İngiltere batıda uzakta, KKTC
   İstanbul'un hemen yanında, Dubai doğuda. Yani pinlerin yerleri süs değil,
   veri: "KKTC yakın, Dubai uzak doğu, İngiltere batı" cümlesini hiç yazmadan
   söylüyor. Yayın altındaki gitgide düzleşen nokta sıraları da aynı işi
   yapıyor — çizginin bir gezegenin kenarı olduğunu söylüyorlar, yoksa rastgele
   bir kavis olurdu.

   NE ÇIKARDIM

   Açılır panel, "Uygun / Neden?" çip listeleri, dört kanallı tahsilat şeridi,
   iki görünüm arasındaki anahtar ve alttaki iki paragraflık ödeme notu — hepsi
   gitti. Hiçbiri yanlış değildi; hepsi bu bölümün işi değildi. Ana sayfa bir
   vitrin: ziyaretçiyi doğru ülkeye yollamak dışında bir görevi yok, detaylı
   kıyas /ulkeler'de ve ülke sayfalarında zaten duruyor. Bölümdeki her ülke
   artık üç şey söylüyor — nerede, adı ne, tek cümlelik farkı ne — ve tıklanınca
   kendi sayfasına gidiyor.

   DÜRÜST KISIT NE OLDU

   Silinmedi, öne de çıkarılmadı. Her pin FACTS[c].limit'i kendi içinde
   taşıyor: masaüstünde görsel olarak gizli ama ekran okuyucuya okunuyor,
   mobilde satırın altında düz metin olarak görünüyor. Fareyle ya da klavyeyle
   bir ülkenin üstüne gelindiğinde yayın altındaki sabit yükseklikli yuva o ülkenin
   kısıtına dönüşüyor. Yani "özet önde, detay talep üzerine" kuralı kısıta da
   uygulanıyor; ziyaretçi hiçbir şeye dokunmasa bile altta "her ülkenin kendi
   kısıtı var" satırını ve kıyas çıkışını görüyor.

   Bunun bilerek ödenen bedeli: KKTC'de Stripe/PayPal'ın çalışmadığı bilgisi
   artık ilk bakışta görünmüyor. Tamamen kaybolmasın diye o satır kısıt
   metnine PAY_MATRIX'ten türetilerek ekleniyor (limitOf), yani elle yazılmış
   bir cümle değil — matris değişirse metin de değişir.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* --------------------------------------------------------------- eksen ---- */
/* Yayın çizildiği kutu. preserveAspectRatio="none" ile sahneye geriliyor, bu
   yüzden viewBox'ın oranı sahnenin oranıyla aynı olmak zorunda değil: x ekseni
   genişliğin, y ekseni yüksekliğin yüzdesine birebir eşleniyor. Pinleri de bu
   yüzden yüzdeyle konumlandırabiliyorum — sahnenin CSS yüksekliğini
   değiştirmek hiçbir sayıyı bozmuyor. */
const VB_W = 1000;
const VB_H = 400;
/** yayın iki ucunun yüksekliği */
const BASE_Y = 300;
/** tepe noktasının uçlardan yüksekliği */
const RISE = 106;

/* Gerçek boylamlar. Pinlerin yatay yeri buradan çıkıyor; "güzel dursun diye"
   kaydırılmış tek bir değer yok, çünkü kaydırıldığı anda görsel bilgi taşımayı
   bırakıp dekora dönüşüyor. */
const LNG: Record<CountrySlug, number> = {
  ingiltere: -0.1278, // Londra
  kktc: 33.3823, // Lefkoşa
  dubai: 55.2708,
};
/** ekseni okuyan kişinin durduğu yer — hero küresinin rotalarıyla aynı nokta */
const HOME_LNG = 28.9784; // İstanbul

/** iki uçta bırakılan pay, derece cinsinden: pinler kenara yapışmasın diye */
const PAD = 10;
const LNGS = Object.values(LNG);
const LNG_MIN = Math.min(...LNGS) - PAD;
const LNG_SPAN = Math.max(...LNGS) + PAD - LNG_MIN;

/** boylam → sahnenin solundan yüzde (0…1) */
function fx(lng: number) {
  return (lng - LNG_MIN) / LNG_SPAN;
}

/* Yay bir karesel Bézier ve x'i t'de doğrusal olduğu için eğri sade bir
   parabole iniyor: y = BASE_Y - 4·RISE·p·(1-p). Yani bir pinin dikey yerini
   bulmak için eğriyi örneklemek gerekmiyor, yatay yüzdesini koymak yetiyor —
   pin ile çizgi hiçbir ekran boyunda birbirinden ayrılamaz. */
function fy(p: number) {
  return (BASE_Y - 4 * RISE * p * (1 - p)) / VB_H;
}

/* Yayın kendisi ve altındaki yüzey sıraları. İki şey aynı anda oluyor: her sıra
   biraz daha aşağıda (dy) ve biraz daha düz (k). Sadece aşağı kaydırılmış
   kopyalar olsalardı gökkuşağı gibi iç içe kemerler olurdu; düzleşerek geldikleri
   için öne doğru açılan bir yüzey okunuyor. Alt uçları CSS'teki dikey maskeyle
   eriyor — kesilen bir çizgi "yüzey" değil "hata" gibi duruyordu. */
const ARC_ROWS = [
  { dy: 0, k: 1, o: 1 },
  { dy: 18, k: 0.86, o: 0.4 },
  { dy: 42, k: 0.72, o: 0.24 },
  { dy: 72, k: 0.58, o: 0.14 },
].map((r) => {
  const y0 = BASE_Y + r.dy;
  /* kontrol noktası eğrinin orta noktasını y0 - RISE·k yapan değer */
  return { ...r, d: `M0 ${y0}Q${VB_W / 2} ${y0 - 2 * RISE * r.k} ${VB_W} ${y0}` };
});

/* Sıra batıdan doğuya. COUNTRY_ORDER (Dubai önce) sitenin geri kalanında
   doğru sıra ama burada değil: eksende soldan sağa okunan şey coğrafya, ve
   klavyeyle gezerken sekme sırasının gözün sırasıyla aynı olması gerekiyor.
   Sıra veriden türüyor, elle yazılmıyor. */
const AXIS_ORDER = [...COUNTRY_ORDER].sort((a, b) => LNG[a] - LNG[b]);

/* --------------------------------------------------------------- metin ---- */
/* Pin başına tek etiket. Üç kural: (1) üçü birbirinin aynısını söylemeyecek,
   (2) hiçbiri taahhüt olmayacak — Dubai'ninki bu yüzden "çıkabilen", "çıkar"
   değil, (3) iki satırı geçmeyecek. Fiyat ve süre burada yok; ikisi de
   fiyat bölümünün işi. */
const TAG: Record<CountrySlug, string> = {
  ingiltere: "Uzaktan kuruluş",
  kktc: "Türkiye'ye en yakın",
  dubai: "Vize çıkabilen tek ülke",
};

/* KKTC'nin kartla tahsilat sorunu bu bölümün kaldırdığı en değerli tek veri.
   Kısıt satırına geri eklenirken elle yazılmıyor: PAY_MATRIX'ten hangi kartlı
   kanalın çalışmadığı okunuyor, cümle ondan kuruluyor. Matris değişirse (ya da
   Stripe bir gün KKTC'yi açarsa) bu metin kendiliğinden düzeliyor. */
const CARD_ROWS =
  PAY_MATRIX.find((g) => g.title === "Tahsilat")?.rows.filter(
    (r) => r.name === "Stripe" || r.name === "PayPal",
  ) ?? [];

function limitOf(c: CountrySlug): string {
  const dead = CARD_ROWS.filter((r) => r.cells[c] !== "yes").map((r) => r.name);
  const base = FACTS[c].limit;
  return dead.length ? `${base}. ${dead.join(" ve ")} çalışmıyor.` : `${base}.`;
}

export default function CountriesC3() {
  /* fare ya da klavye hangi ülkenin üstündeyse o. null = hiçbiri, altta genel
     satır duruyor. Seçim değil, sadece vurgu: tıklama her zaman gezinme. */
  const [hot, setHot] = useState<CountrySlug | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="ulkeler" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Hizmet verdiğimiz bölgeler."
            accent="bölgeler."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            {/* eski satır "Kanallar ve sınırlar kartlarda." diyordu; kart
                kalmadı. Yerine bölümün yeni sözleşmesi: burada seçiyorsun,
                detayı orada okuyorsun. */}
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Ülkeyi seçin, detayı kendi
              sayfasında.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16}>
          <figure className="cgor-fig">
            {/* Yay ekran okuyucuya hiçbir şey söylemiyor (aria-hidden); eksenin
                taşıdığı bilgi burada tek cümleye çevriliyor. */}
            <figcaption className="sr-only">
              Batıdan doğuya uzanan bir eksen: en batıda İngiltere, ortada
              İstanbul, hemen doğusunda KKTC, en doğuda Dubai.
            </figcaption>

            <div className="cgor-stage">
              <svg
                className="cgor-arc"
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* non-scaling-stroke: kutu yatayda gerildiği için normalde
                    noktalar yumurtaya dönerdi. Bu özellikle kontur ekran
                    uzayında hesaplanıyor — nokta her genişlikte yuvarlak, her
                    aralıkta eşit kalıyor. */}
                {ARC_ROWS.map((r) => (
                  <path
                    key={r.dy}
                    d={r.d}
                    opacity={r.o}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {/* Eksenin sıfır noktası. Etiket noktanın batısında duruyor,
                  üstünde ya da altında değil: İstanbul ile KKTC arasında
                  yalnızca 4,4 derece var ve ortalanmış bir etiket dar
                  ekranlarda KKTC'nin diskine giriyordu. Batı tarafı ise
                  İngiltere'ye kadar tamamen boş. */}
              <span
                className="cgor-home"
                style={{ left: `${fx(HOME_LNG) * 100}%`, top: `${fy(fx(HOME_LNG)) * 100}%` }}
                aria-hidden="true"
              >
                <span className="cgor-home-t">İstanbul</span>
                <span className="cgor-home-dot" />
              </span>

              {AXIS_ORDER.map((c, i) => {
                const p = fx(LNG[c]);
                return (
                  /* İki sarmal, tek iş: dış kutu konumu taşıyor (transform ile
                     diskin merkezini yaya oturtuyor), iç kutu motion'ın
                     kendi transform'unu yazıyor. Tek elemanda birleştirilirse
                     motion konumlandırmayı eziyor. */
                  <div
                    key={c}
                    className="cgor-pin"
                    style={{ left: `${p * 100}%`, top: `${fy(p) * 100}%` }}
                  >
                    <motion.div
                      className="cgor-pin-in"
                      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.92 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                      transition={{
                        duration: reduce ? 0 : 0.6,
                        ease: EASE,
                        delay: reduce ? 0 : 0.3 + i * 0.1,
                      }}
                    >
                      <SmartLink
                        href={`/${c}`}
                        className="cgor-pin-a"
                        data-on={hot === c}
                        onMouseEnter={() => setHot(c)}
                        onMouseLeave={() => setHot(null)}
                        onFocus={() => setHot(c)}
                        onBlur={() => setHot(null)}
                      >
                        <span className="cgor-pin-lb">
                          <span className="cgor-pin-n">
                            {COUNTRY_NAME[c]}
                            <ChevronRight size={15} strokeWidth={2.2} aria-hidden="true" />
                          </span>
                          <span className="cgor-pin-t">{TAG[c]}</span>
                        </span>

                        <span className="cgor-disc">
                          <Flag country={c} />
                        </span>

                        {/* Kısıtın tek gerçek kopyası. Masaüstünde görünmüyor
                            ama DOM'da ve erişilebilirlik ağacında burada — alt
                            satırdaki görsel yuva bunun kopyası değil, yankısı
                            (o yüzden aria-hidden). Mobilde bu satır görünür
                            hâle geliyor, çünkü orada hover diye bir şey yok. */}
                        <span className="cgor-pin-limit">
                          <TriangleAlert size={13} strokeWidth={2.1} aria-hidden="true" />
                          {limitOf(c)}
                        </span>
                      </SmartLink>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </figure>
        </FadeUp>

        <FadeUp delay={0.26}>
          <div className="cgor-foot">
            {/* İki satırlık sabit yükseklikte yuva: ülkeden ülkeye geçerken
                altındaki her şeyin zıplamaması için. */}
            <p className="cgor-note" aria-hidden="true">
              <TriangleAlert size={14} strokeWidth={2.1} />
              <span>
                {hot ? (
                  <>
                    <b>{COUNTRY_NAME[hot]}</b>
                    {limitOf(hot)}
                  </>
                ) : (
                  "Her ülkenin kendi kısıtı var; hepsi ülke sayfasında ve yan yana kıyasta yazılı."
                )}
              </span>
            </p>

            <SmartLink href="/ulkeler" className="link-arrow cgor-exit">
              Üç ülkeyi yan yana kıyaslayın
              <ArrowRight size={15} strokeWidth={2.1} />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
