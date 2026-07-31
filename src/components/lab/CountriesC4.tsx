"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Minus, Plus, TriangleAlert, X } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { BrandGlyph } from "@/components/shared/BrandMark";
import { brandKeyForName } from "@/lib/brands";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PAY_MATRIX,
  type Cell,
  type CountrySlug,
} from "@/lib/brand";

/* ============================================================================
   ADAY C4 — "yay + açılım"

   NEREDEN GELDİ

   İkinci turda müşteri iki şeyi aynı anda söyledi: C3'ün yayı estetik olarak
   doğru giriş, ama C3 detaydan hiç bahsetmiyor; C1'in çözümü ise yanlış yerde
   çözüyor — "tıklayıp başka bir yere gitmek" istenmiyor. Canlı bölüm
   (ThreeCountries) tıklayınca yerinde açılıyor, orası doğru; sorun onun ne
   kadar dolu olduğu.

   C4 bu üçünün kesişimi: C3'ün yayı duruyor, tıklama artık gezinme değil
   açılım, ve açılan şey canlı bölümün dörtte biri kadar.

   ÜÇ BAĞLAYICI KURAL, ÜÇ KARŞILIĞI

   1) "Yerinde açılsın." Yaydaki her bayrak bir <button>; tıklanınca yayın
      hemen altındaki yuva açılıyor. Bölümden çıkan tek bağlantı, açılan
      panelin sonundaki "…'de kuruluş" — o da detay değil, bir sonraki adım.

   2) "Kapalıyken de biraz detay olsun, kıyas hissi versin." Her bayrağın
      altında iki şey var: ülkeyi ayıran etiket (üçü üç ayrı şey söylüyor) ve
      ÜÇÜNDE DE AYNI olan tek bir eksen — "Kartla tahsilat: Var / Var / Yok".
      Kıyas hissi buradan geliyor: farklı üç etiket yan yana durunca kıyas
      olmuyor, aynı sorunun üç farklı cevabı yan yana durunca oluyor. Bu
      ekseni seçtim çünkü PAY_MATRIX'teki en keskin ayrım o (KKTC'nin iki
      çarpısı) ve ülke kararını gerçekten değiştiren tek satır.

   3) "İstanbul referansı yok." C3'teki İstanbul noktası ve etiketi tamamen
      kalktı; eksenin sıfır noktası yok, yay yalnızca batı-doğu sırasını
      söylüyor. KKTC'nin yakınlık argümanı kendi etiketinde kaldı, bölümün
      geneline yayılmıyor. Boylam aralığındaki pay (PAD) İstanbul gidince
      10'dan 13'e çıktı: uçtaki İngiltere etiketi kapsayıcının sol kenarına
      dayanıyordu, İstanbul artık ortada durmadığı için yayı biraz
      toplayabiliyorum.

   KAPALI DURUM NEDEN BOŞ AÇILIYOR

   Hiçbir ülke seçili değil. Canlı bölüm Dubai'yi açık başlatıyor; burada
   başlatmıyorum çünkü müşterinin genel yönü "özet önde, detay talep üzerine"
   ve açık başlayan bir panel bölümün kapalı yüksekliğini görünmez kılıyor —
   ziyaretçi bölümü hiç kısa görmüyor. Açılım isteğe bağlı olunca kapalı
   yükseklik bölümün gerçek boyu oluyor.

   DÜRÜST KISIT NEREDE

   Panelin dördüncü kaleminde, amber üçgeniyle, FACTS[c].limit'ten aynen.
   Kapalıyken görünmüyor ve bu bilinçli: kısıt bir iddianın karşılığıdır,
   kapalı durumda ise ortada iddia yok — üç ad, üç etiket ve bir tahsilat
   sözcüğü var. Kısıt bir tıklama uzakta ve o tıklama ziyaretçiyi sayfadan
   çıkarmıyor; C1'de kısıt görünürdü ama ayrıntının tamamı başka sayfadaydı,
   burada tam tersi. Panelin dört kaleminden biri olması da onu köşeye
   atılmış bir dipnot değil, özetin dörtte biri yapıyor.

   NE ALMADIM

   Canlı bölümden gelen "Uygun" çipleri, "Neden?" ikon sırası, kart/tablo
   anahtarı, ülke fotoğrafları ve iki paragraflık ödeme notu burada yok.
   Not bloğunun taşıdığı id="odeme-altyapisi" da alınmadı: bu bölüm o metni
   barındırmıyor, dolayısıyla çapayı da sahiplenmiyor (C1 aynı kararı verdi).
   Aday /lab sayfasında üç bölümle birlikte render edildiği için id="ulkeler"
   de yok — canlıya geçerken eklenecek tek şey o.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------- geometri --- */
/* Yayın çizildiği kutu. preserveAspectRatio="none" ile sahneye geriliyor:
   x ekseni genişliğin, y ekseni yüksekliğin yüzdesine birebir eşleniyor, bu
   yüzden pinler yüzdeyle konumlanabiliyor ve sahnenin CSS yüksekliğini
   değiştirmek hiçbir sayıyı bozmuyor. (Mantık C3'ten; İstanbul çıkınca
   değişen tek sayı PAD.) */
const VB_W = 1000;
const VB_H = 400;
/** yayın iki ucunun yüksekliği */
const BASE_Y = 300;
/** tepe noktasının uçlardan yüksekliği */
const RISE = 106;

/* Gerçek boylamlar. Pinlerin yatay yeri buradan çıkıyor; "güzel dursun diye"
   kaydırılmış tek bir değer yok — kaydırıldığı anda eksen bilgi taşımayı
   bırakıp dekora dönüşür. */
const LNG: Record<CountrySlug, number> = {
  ingiltere: -0.1278, // Londra
  kktc: 33.3823, // Lefkoşa
  dubai: 55.2708,
};

/* İki uçta bırakılan pay, derece cinsinden. Doğrusal bir dönüşüm olduğu için
   payı büyütmek ülkeler arasındaki oranı bozmuyor, yalnızca üçünü de içeri
   çekiyor: 13 derecede İngiltere'nin etiketi 1200'lük kapta sol kenardan
   ~110px içeride kalıyor (10 derecede kabın dışına taşıyordu). */
const PAD = 13;
const LNGS = Object.values(LNG);
const LNG_MIN = Math.min(...LNGS) - PAD;
const LNG_SPAN = Math.max(...LNGS) + PAD - LNG_MIN;

/** boylam → sahnenin solundan yüzde (0…1) */
function fx(lng: number) {
  return (lng - LNG_MIN) / LNG_SPAN;
}

/* Yay karesel bir Bézier ve x, t'de doğrusal; dolayısıyla eğri sade bir
   parabole iniyor: y = BASE_Y - 4·RISE·p·(1-p). Pinin dikey yerini bulmak için
   eğriyi örneklemek gerekmiyor, yatay yüzdesini koymak yetiyor — pin ile çizgi
   hiçbir ekran boyunda ayrışamaz. */
function fy(p: number) {
  return (BASE_Y - 4 * RISE * p * (1 - p)) / VB_H;
}

/* Yay ve altındaki yüzey sıraları. Her sıra biraz daha aşağıda (dy) ve biraz
   daha düz (k): yalnızca aşağı kaydırılmış kopyalar olsalardı iç içe kemerler
   olurdu, düzleşerek geldikleri için öne doğru açılan bir yüzey okunuyor. */
const ARC_ROWS = [
  { dy: 0, k: 1, o: 1 },
  { dy: 18, k: 0.86, o: 0.4 },
  { dy: 42, k: 0.72, o: 0.24 },
  { dy: 72, k: 0.58, o: 0.14 },
].map((r) => {
  const y0 = BASE_Y + r.dy;
  return { ...r, d: `M0 ${y0}Q${VB_W / 2} ${y0 - 2 * RISE * r.k} ${VB_W} ${y0}` };
});

/* Sıra batıdan doğuya. COUNTRY_ORDER (Dubai önce) sitenin geri kalanında doğru
   sıra ama burada değil: eksende soldan sağa okunan şey coğrafya ve klavyeyle
   gezerken sekme sırasının gözün sırasıyla aynı olması gerekiyor. Sıra veriden
   türüyor, elle yazılmıyor. */
const AXIS_ORDER = [...COUNTRY_ORDER].sort((a, b) => LNG[a] - LNG[b]);

/* ---------------------------------------------------------------- metin --- */
/* Kapalı durumdaki ayırt edici etiket. Üç kural: (1) üçü birbirinin aynısını
   söylemeyecek, (2) hiçbiri taahhüt olmayacak — Dubai'ninki bu yüzden
   "çıkabiliyor", "çıkıyor" değil, (3) panelin dört kaleminden hiçbirini
   tekrar etmeyecek. Üçüncüsü FACTS[c].tag'i kullanmamamın sebebi: Dubai'nin
   tag'i "Serbest bölge" ve aynı cümle panelde "Yapı" olarak zaten duruyor. */
const TAG: Record<CountrySlug, string> = {
  ingiltere: "Uzaktan kuruluş",
  kktc: "Türkiye'ye en yakın",
  dubai: "Oturum vizesi çıkabiliyor",
};

/* ------------------------------------------------------------ PAY_MATRIX --- */
/* Kapalı durumdaki ortak eksen de, panelin üçüncü kalemi de aynı gruptan
   okunuyor: biri "var mı", öteki "hangileri". Elle yazılmış tek bir kanal adı
   yok; matris değişirse ikisi birden değişir. */
const CARD_ROWS = PAY_MATRIX.find((g) => g.title === "Tahsilat")?.rows ?? [];

/** o ülkede gerçekten sunulan kanallar — "none" satırları listeye girmiyor,
    çünkü "bu ülkede yok" bilgisi kanal adı kadar yer kaplayıp hiçbir şey
    söylemiyor. Çalışmayanlar ("no") kalıyor: KKTC'nin iki çarpısı bu bölümün
    en değerli verisi. */
function cardsOf(c: CountrySlug) {
  return CARD_ROWS.filter((r) => r.cells[c] !== "none");
}

/** kapalı satırdaki tek sözcük */
function cardsWork(c: CountrySlug) {
  return CARD_ROWS.some((r) => r.cells[c] === "yes");
}

const MARK_TEXT: Record<Cell, string> = {
  yes: "çalışıyor",
  no: "çalışmıyor",
  none: "bu ülkede sunulmuyor",
};

/* Renge bağlı kalmayan işaret: ikon + sözcük + ekran okuyucuya tam cümle. */
function Mark({ v, size = 13 }: { v: Cell; size?: number }) {
  if (v === "yes") return <Check size={size} strokeWidth={2.4} aria-hidden="true" />;
  if (v === "no") return <X size={size} strokeWidth={2.4} aria-hidden="true" />;
  return <Minus size={size} strokeWidth={2.4} aria-hidden="true" />;
}

/* Kanal adının yanında markanın kendi işareti. Resmî vektörü olmayan satırlar
   yalnızca metin kalıyor — uydurma logo basmıyoruz. */
function ChannelName({ name }: { name: string }) {
  const k = brandKeyForName(name);
  return (
    <>
      {k && <BrandGlyph brand={k} size={14} />}
      {name}
    </>
  );
}

/* ---------------------------------------------------------------- panel --- */
/* Dört kalem, fazlası yok. Sıra kasıtlı: önce kime uyduğu (ziyaretçi kendini
   arıyor), sonra ne kurduğumuz, sonra parayı nasıl alacağı, en sonda kısıt.
   Kısıt sonda çünkü diğer üçü okunmadan gelen bir uyarı bağlamsız kalıyor. */
function Panel({ c }: { c: CountrySlug }) {
  return (
    <div className="cyay-panel">
      <dl className="cyay-dl">
        <div className="cyay-item">
          <dt>Kimin için</dt>
          <dd>{FACTS[c].forWhom}</dd>
        </div>

        <div className="cyay-item">
          <dt>Yapı</dt>
          <dd>{FACTS[c].structure}</dd>
        </div>

        <div className="cyay-item">
          {/* Kapalı satırdaki etiketin birebir aynısı. Aynı sözcükler olması
              şart: üstte "Var/Yok" diyen eksen ile burada isim isim açılan
              liste aynı sorunun iki derinliği, iki ayrı konu değil. */}
          <dt>Kartla tahsilat</dt>
          <dd>
            <ul className="cyay-chan">
              {cardsOf(c).map((r) => (
                <li key={r.name} data-v={r.cells[c]}>
                  <Mark v={r.cells[c]} />
                  <ChannelName name={r.name} />
                  <span className="sr-only"> {MARK_TEXT[r.cells[c]]}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>

        <div className="cyay-item">
          <dt>Kısıt</dt>
          <dd className="cyay-limit">
            <TriangleAlert size={14} strokeWidth={2.1} aria-hidden="true" />
            {FACTS[c].limit}
          </dd>
        </div>
      </dl>

      {/* Panelin tek bağlantısı ve bölümün sonu değil, devamı: özet burada
          okundu, ayrıntı isteyen ülke sayfasına geçiyor. */}
      <SmartLink href={`/${c}`} className="cyay-go">
        {COUNTRY_NAME[c]}&apos;de kuruluş
        <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
      </SmartLink>
    </div>
  );
}

export default function CountriesC4() {
  /* Açık olan ülke. null = hepsi kapalı, bölüm en kısa hâlinde. */
  const [open, setOpen] = useState<CountrySlug | null>(null);
  /* Kapanırken panelin içeriği duruyor olmalı, yoksa yuva kapanma animasyonu
     boyunca boş bir kutu olarak inip "içerik yok oldu, sonra yükseklik indi"
     gibi görünüyor. shown kapanınca değişmiyor: son açılan ülke, yuva
     tamamen kapanana kadar ekranda kalıyor. */
  const [shown, setShown] = useState<CountrySlug>(AXIS_ORDER[0]);
  const reduce = useReducedMotion();

  function toggle(c: CountrySlug) {
    setShown(c);
    setOpen((prev) => (prev === c ? null : c));
  }

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
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
            {/* İkinci cümle bölümün sözleşmesi: tıklamanın seni bir yere
                götürmeyeceğini, aynı yerde açacağını baştan söylüyor. */}
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Bir ülkeye dokunun, özeti
              burada açılsın.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16}>
          <figure className="cyay-fig">
            {/* Yay ekran okuyucuya hiçbir şey söylemiyor (aria-hidden); eksenin
                taşıdığı bilgi burada tek cümleye iniyor. */}
            <figcaption className="sr-only">
              Batıdan doğuya bir eksen: en batıda İngiltere, ortada KKTC, en
              doğuda Dubai.
            </figcaption>

            {/* data-open: bir panel açıkken yayın noktaları geri çekiliyor,
                dikkat aşağıya iniyor. Sönen yalnızca dekor — pinlerin metni
                tam kontrastta kalıyor, yoksa açık panelin yanındaki iki ülke
                okunamaz hâle gelir ve kıyas satırı işe yaramaz olur. */}
            <div className="cyay-stage" data-open={open !== null}>
              <svg
                className="cyay-arc"
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* non-scaling-stroke: kutu yatayda gerildiği için noktalar
                    normalde yumurtaya dönerdi; bu özellikle kontur ekran
                    uzayında hesaplanıyor, nokta her genişlikte yuvarlak. */}
                {ARC_ROWS.map((r) => (
                  <path key={r.dy} d={r.d} opacity={r.o} vectorEffect="non-scaling-stroke" />
                ))}
              </svg>

              {AXIS_ORDER.map((c, i) => {
                const p = fx(LNG[c]);
                const on = open === c;
                const works = cardsWork(c);
                return (
                  /* İki sarmal, tek iş: dış kutu konumu taşıyor (transform ile
                     diskin merkezini yaya oturtuyor), iç kutu motion'ın kendi
                     transform'unu yazıyor. Tek elemanda birleşirse motion
                     konumlandırmayı eziyor. */
                  <div
                    key={c}
                    className="cyay-pin"
                    /* --cyay-p yalnızca mobilde işe yarıyor: orada yay düşüyor,
                       pinler satıra dönüyor ve panel tıklanan satırın hemen
                       altına giriyor (order: p*2, panel p*2+1). Masaüstünde
                       konumu left/top veriyor. */
                    style={
                      {
                        left: `${p * 100}%`,
                        top: `${fy(p) * 100}%`,
                        "--cyay-p": i,
                      } as React.CSSProperties
                    }
                  >
                    <motion.div
                      className="cyay-pin-in"
                      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.92 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                      transition={{
                        duration: reduce ? 0 : 0.6,
                        ease: EASE,
                        delay: reduce ? 0 : 0.3 + i * 0.1,
                      }}
                    >
                      {/* <button>, <a> değil: bu tıklama gezinme değil, açılım.
                          aria-expanded + aria-controls bunu ekran okuyucuya da
                          söylüyor; yanlış eleman seçilseydi kullanıcıya sayfa
                          değişeceği vaat edilmiş olurdu. */}
                      <button
                        type="button"
                        className="cyay-btn"
                        data-on={on}
                        aria-expanded={on}
                        aria-controls="cyay-panel"
                        onClick={() => toggle(c)}
                      >
                        <span className="cyay-lb">
                          <span className="cyay-name">{COUNTRY_NAME[c]}</span>
                          <span className="cyay-tag">{TAG[c]}</span>
                          {/* Ortak eksen. Üç pinde de aynı etiket, değişen tek
                              sözcük — kıyas hissini tıklamadan veren şey bu. */}
                          <span className="cyay-axis" data-v={works ? "yes" : "no"}>
                            <Mark v={works ? "yes" : "no"} size={12} />
                            <span className="cyay-axis-k">Kartla tahsilat</span>
                            <b>{works ? "Var" : "Yok"}</b>
                          </span>
                        </span>

                        <span className="cyay-disc">
                          <Flag country={c} />
                        </span>

                        {/* Artı/eksi rozeti: bölümün "açılıyor" vaadinin tek
                            statik işareti — ok olsaydı bağlantı gibi okunurdu.
                            Diskin içinde değil, düğmenin doğrudan çocuğu:
                            masaüstünde diskin köşesine mutlak konumla
                            oturuyor, telefonda satırın sonundaki ızgara
                            hücresine geçiyor. Diskin içinde kalsaydı ikinci
                            yerleşim mümkün olmazdı (grid-area yalnızca doğrudan
                            çocuklarda çalışıyor). */}
                        <span className="cyay-badge" aria-hidden="true">
                          {on ? (
                            <Minus size={12} strokeWidth={2.6} />
                          ) : (
                            <Plus size={12} strokeWidth={2.6} />
                          )}
                        </span>
                      </button>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Açılan yuva. Yükseklik animasyonu CSS'te grid-template-rows
                0fr → 1fr ile yapılıyor, motion'ın height:"auto" ölçümüyle
                değil: içerik ülkeden ülkeye bir satır uzayıp kısalıyor ve
                ölçülmüş piksel yükseklik o değişimde takılı kalıyor. Grid
                yöntemi her zaman güncel içeriği ölçüyor, desteklenmediği
                yerde de animasyonsuz açılıp kapanıyor — bozulmuyor.

                --cyay-x: panelin üst kenarındaki oku açık ülkenin tam altına
                koyan tek değişken. Aynı yüzde ölçeği hem sahnede hem burada
                geçerli, çünkü ikisi de kapsayıcı genişliğinde.

                --cyay-i: mobilde satırlar arasına giren panelin sırası (flex
                order). Masaüstünde kullanılmıyor. */}
            <div
              className="cyay-slot"
              data-on={open !== null}
              style={
                {
                  "--cyay-x": `${fx(LNG[shown]) * 100}%`,
                  "--cyay-i": AXIS_ORDER.indexOf(shown) * 2 + 1,
                } as React.CSSProperties
              }
            >
              {/* visibility CSS'te kapalı durumda hidden'a düşüyor: kapalı
                  panelin metni ne ekran okuyucuya okunuyor ne de sekme
                  sırasına giriyor. display:none olsaydı geçiş de olmazdı. */}
              <div className="cyay-clip">
                <div id="cyay-panel" role="region" aria-label={`${COUNTRY_NAME[shown]} özeti`}>
                  <Panel c={shown} />
                </div>
              </div>
            </div>
          </figure>
        </FadeUp>

        {/* Bölümün tek dış çıkışı. Detay artık burada açıldığı için bu satır
            "daha fazla bilgi" değil, gerçekten kıyas isteyenin kapısı. */}
        <FadeUp delay={0.26}>
          <SmartLink href="/ulkeler" className="link-arrow cyay-exit">
            Üç ülkeyi yan yana kıyaslayın
            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
          </SmartLink>
        </FadeUp>
      </div>
    </section>
  );
}
