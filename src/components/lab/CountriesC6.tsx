"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown, TriangleAlert, X } from "lucide-react";
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
   ADAY C6 — "kıyas satırı"

   NE YAPIYOR

   İki ayrı okuma yönü var ve ikisi aynı küçük veri kümesinin devriği:

     yatay — bir ölçüt seçilir, üç ülkenin o ölçütteki cevabı AYNI ANDA
             görünür. Tıklama ülkeyi değil ölçütü değiştirir.
     dikey — bir ülkeye tıklanır, o ülkenin geri kalanı AYNI YERDE açılır.

   Böylece müşterinin bu turdaki üç şartı da tek yapıda karşılanıyor:

   1) "tıklayıp başka yere gitmek değil, burada açılsın" → açılan panel
      bölümün içinde, kapanınca hiçbir iz bırakmıyor. Ülke sayfasına giden
      bağlantı panelin içinde duruyor: gitmek isteyen gidiyor, çoğu ziyaretçi
      cevabı burada alıyor.

   2) "tıklamadan bile biraz detay lazım, kıyas yaptığını hissettirmeli" →
      bölüm hiç dokunulmadan da bir ölçüt seçili geliyor ve üç ülkenin cevabı
      yan yana duruyor. Yani kıyas açılınca başlamıyor, açılışta zaten var.
      Boşta duran bir "seçim yapın" ekranı yok.

   3) "İstanbul detayına gerek yok" → eksende referans nokta kalmadı.
      Yakınlık argümanı yalnızca KKTC'nin kendi satırında ("Türkiye'ye en
      yakın") duruyor, bölümün geneline yayılmıyor.

   C3'TEN NE ALINDI, NE DEĞİŞTİ

   Yay alındı: müşteri kartlar yerine ülkeleri bir yaya dizme fikrini beğendi
   ve estetik giriş burada da onu yapıyor. Ama iki şey değişti.

   Boylam gitti, sıra kaldı. C3'te pinlerin yatay yeri gerçek boylamdı ve bunun
   tek anlamı İstanbul'a göre uzaklıktı — İstanbul kalkınca ölçek ölçmediği bir
   şeyi ölçüyor gibi durur. Şimdi aralık eşit, sıra hâlâ batıdan doğuya
   (İngiltere · KKTC · Dubai) ve o sıra LNG'den türetiliyor, elle yazılmıyor.
   Eşit aralığın ikinci ve asıl sebebi altındaki kıyas: yan yana okunacak üç
   hücrenin eşit genişlikte olması gerekiyor, eşit olmayan sütunlarda göz
   satır takip edemiyor.

   Yay artık dekor değil ama bilgi de taşımıyor; kolonların üstünü bağlayan bir
   ufuk. İşi tek: bölümü kart yığınına benzemekten kurtarmak.

   DÜRÜST KISIT NEDEN KAPALIYKEN GÖRÜNMÜYOR

   Görünüyor — ama üç kez tekrarlanan bir dipnot olarak değil, kıyasın dört
   ölçütünden biri olarak. "Dürüst kısıt" düğmesi bölüm açılır açılmaz orada,
   yanında amber üçgeniyle; bir tık sonra üç kısıt YAN YANA okunuyor. Canlı
   bölümde bunun için üç kartı tek tek açmak gerekiyor, /ulkeler tablosunda ise
   en alt satıra inmek. Kısıtı bir ölçüt seviyesine çıkarmak onu gizlemenin
   tersi: kıyaslanabilir hâle getiriyor.

   ÖLÇÜT SETİ NEDEN BU DÖRT

   Hepsi brand.ts'ten türüyor, hiçbiri elle yazılmış bir sayı ya da iddia
   değil (bkz. her ölçütün kendi yorumu). Fiyat ve süre bilerek yok: bu
   bölümün sözleşmesi baştan beri "rakam fiyat bölümünde" ve süre taahhüdü
   STANCE_LIMITS'e göre verilmiyor. Maliyet yine de kıyasın en çok sorulan
   ekseni olduğu için rakamsız hâliyle duruyor — sıralama olarak.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------- geometri --- */
/* Yayın çizildiği şeridin yüksekliği. SVG'nin viewBox yüksekliği de bu sayı ve
   preserveAspectRatio="none" yalnızca yatayda geriyor — yani viewBox'taki y
   birimi ile ekrandaki piksel BİREBİR. Diskleri yay üzerine oturtmak için
   eğriyi örneklemem yetiyor, ölçek düzeltmesi gerekmiyor. */
const BAND = 112;
const VB_W = 1000;
/** yayın iki ucunun yüksekliği */
const BASE_Y = 82;
/** tepe noktasının uçlardan yüksekliği */
const RISE = 43;

/* Sütun merkezleri. Üç eşit sütunda merkezler 1/6, 1/2, 5/6; aradaki boşluk
   (column-gap) bunu ~%0,7 kaydırıyor, bu da yayda 1 pikselden az fark demek —
   diskin 5 piksellik beyaz halkasının altında görünmüyor. Bu yüzden sütun
   genişliğini CSS'ten JS'e taşıyacak bir ölçüm koymadım: kazancı yok. */
const LANE_P = [1 / 6, 1 / 2, 5 / 6];

/** yayın p noktasındaki yüksekliği — eğri karesel Bézier, x'te doğrusal */
function arcY(p: number) {
  return BASE_Y - 4 * RISE * p * (1 - p);
}

/* Yay ve altındaki iki sönük sıra. Her sıra biraz aşağıda (dy) ve biraz daha
   düz (k): sadece kaydırılmış kopyalar olsalardı iç içe kemerler olurdu,
   düzleşerek geldikleri için öne doğru açılan bir yüzey okunuyor. Alt uçları
   CSS'teki dikey maskeyle eriyor. */
const ARC_ROWS = [
  { dy: 0, k: 1, o: 1 },
  { dy: 14, k: 0.84, o: 0.32 },
  { dy: 30, k: 0.68, o: 0.16 },
].map((r) => {
  const y0 = BASE_Y + r.dy;
  /* kontrol noktası: eğrinin orta noktasını y0 - RISE·k yapan değer */
  return { ...r, d: `M0 ${y0}Q${VB_W / 2} ${y0 - 2 * RISE * r.k} ${VB_W} ${y0}` };
});

/* Sıra batıdan doğuya. COUNTRY_ORDER (Dubai önce) sitenin geri kalanında doğru
   sıra ama bir eksende değil: soldan sağa okunan şey coğrafya ve klavye sırası
   ile göz sırası aynı olmak zorunda. Boylamlar yalnızca bu sıralama için
   duruyor — konum artık onlardan çıkmıyor, o yüzden ondalık hassasiyet de
   gerekmiyor. */
const LNG: Record<CountrySlug, number> = {
  ingiltere: -0.13,
  kktc: 33.38,
  dubai: 55.27,
};
const ORDER = [...COUNTRY_ORDER].sort((a, b) => LNG[a] - LNG[b]);

/* ---------------------------------------------------------------- metin --- */
/* Ülke başına tek satır: kıyastan bağımsız, hep görünen ayırt edici cümle.
   Üç kural: (1) üçünde de doğru olan bir şey yazılmaz — kuruluş/banka/muhasebe
   zaten başlığın altında, (2) taahhüt yok — Dubai'ninki "çıkabilen", "çıkar"
   değil, (3) tek satır. Bu satır kıyasın değil kimliğin parçası: ölçüt
   değişince değişmiyor. */
const EDGE: Record<CountrySlug, string> = {
  ingiltere: "Baştan sona uzaktan kuruluş",
  kktc: "Türkiye'ye en yakın, süreç Türkçe",
  dubai: "Oturum vizesi çıkabilen tek ülke",
};

/* ----------------------------------------------------- PAY_MATRIX okuma --- */
function group(title: string) {
  return PAY_MATRIX.find((g) => g.title === title);
}

/** bir grupta o ülkede gerçekten çalışan kanalların adları */
function worksIn(title: string, c: CountrySlug): string[] {
  return (
    group(title)
      ?.rows.filter((r) => r.cells[c] === "yes")
      .map((r) => r.name) ?? []
  );
}

/* ------------------------------------------------------------- ölçütler --- */
type Tone = "plain" | "yes" | "no" | "warn";
type Val = { head: string; sub?: string; tone: Tone };

/* Maliyet rakamla değil sırayla veriliyor.
   Sebep tek değil, iki: (1) bu bölümün baştan beri sözleşmesi "tutar fiyat
   bölümünde" — buraya üç rakam koymak fiyat tartışmasını da beraberinde
   getirir; (2) sıralama zaten kıyasın istediği şey, rakam değil. Sıra
   FACTS[c].from'dan türüyor, elle yazılmıyor: liste güncellenince sıra da
   kendiliğinden düzeliyor, hatta ülke sayısı değişse bile bozulmuyor
   (kelime bitince "—" basılıyor). */
const COST_WORD = ["En düşük", "Ortada", "En yüksek"];
const COST_ORDER = [...COUNTRY_ORDER].sort((a, b) => FACTS[a].from - FACTS[b].from);

type Crit = {
  key: string;
  label: string;
  /** üç hücrenin altındaki tek satır: ölçütün sınırı ya da kapsamı */
  note: string;
  /** yalnızca kısıt ölçütünde: düğmede amber üçgen */
  warn?: boolean;
  val: (c: CountrySlug) => Val;
};

const CRITS: Crit[] = [
  {
    key: "maliyet",
    label: "Kuruluş maliyeti",
    note: "Sıralama yalnızca bu üç ülke arasında; tutarlar fiyat bölümünde.",
    val: (c) => ({ head: COST_WORD[COST_ORDER.indexOf(c)] ?? "—", tone: "plain" }),
  },
  {
    /* "Ne için iyi" yerine "Kim için": aynı veri (FACTS.forWhom) ama soru
       ziyaretçinin sorduğu biçimde. Cümle kurulmuyor, listenin kendisi
       basılıyor — üç sütunda yan yana okunduğunda zaten cümle gibi çalışıyor
       ve elle yazılmış her ek kelime üç yerde birden bakım borcu olurdu. */
    key: "kimicin",
    label: "Kim için",
    note: "Başlıklar genel çerçeve; uygunluk işin kendisine göre değişir.",
    val: (c) => ({ head: FACTS[c].forWhom, tone: "plain" }),
  },
  {
    /* Bölümün en keskin verisi ve tek gerçek "yan yana" anı: iki yeşil, bir
       kırmızı. KKTC'nin çarpısı gizlenmiyor, kıyasın merkezine konuyor.
       Hangi kanalın çalıştığı PAY_MATRIX'ten okunuyor; Stripe bir gün KKTC'yi
       açarsa bu hücre kendiliğinden yeşile döner. */
    key: "tahsilat",
    label: "Kartla tahsilat",
    note: "Kanalı sağlayıcı açar; ülke listesi sağlayıcının kuralıdır.",
    val: (c) => {
      const on = worksIn("Tahsilat", c);
      return on.length
        ? { head: "Var", sub: on.join(", "), tone: "yes" }
        : {
            head: "Yok",
            /* isimler yine matristen: hangi kanalın kapalı olduğunu elle
               yazmak, matris değiştiğinde sessizce yanlışa dönüşürdü */
            sub: `${(group("Tahsilat")?.rows ?? [])
              .filter((r) => r.cells[c] === "no")
              .map((r) => r.name)
              .join(" ve ")} desteklemiyor`,
            tone: "no",
          };
    },
  },
  {
    key: "kisit",
    label: "Dürüst kısıt",
    warn: true,
    note: "Her ülkenin kısıtı burada yazılı; ayrıntısı ülke sayfasında.",
    val: (c) => ({ head: FACTS[c].limit, tone: "warn" }),
  },
];

/* Açılan panelin içeriği. Kıyas satırında OLMAYAN üç şey — yani panel
   tekrar değil, devam. Ödeme kuruluşunun "banka değildir" uyarısı ayrı bir
   dipnot bloğu olarak değil, grubun kendi hint'i olarak geliyor: metin zaten
   PAY_MATRIX'te duruyordu, burada ikinci kopyası açılmıyor. */
function panelRows(c: CountrySlug) {
  return [
    { k: "Yapı", v: FACTS[c].structure, hint: undefined as string | undefined },
    {
      k: "Banka hesabı",
      v: worksIn("Banka hesabı", c).join(", ") || "Bu ülkede sunulmuyor",
      hint: group("Banka hesabı")?.hint,
    },
    {
      k: "Ödeme kuruluşu",
      v: worksIn("Ödeme kuruluşu", c).join(", ") || "Bu ülkede çalışan kanal yok",
      hint: group("Ödeme kuruluşu")?.hint,
    },
  ];
}

export default function CountriesC6() {
  /* Ölçütün null hâli YOK: bölüm bir seçimle geliyor, çünkü boşta duran bir
     kıyas kıyas değil. Maliyet varsayılan — en çok sorulan eksen ve üç farklı
     cevabı olduğu için "burada bir kıyas var" cümlesini tek bakışta kuruyor.
     Kısıt varsayılan olsaydı bölüm üç uyarıyla açılırdı; uyarı orada duruyor
     ama karşılama ekranı değil. */
  const [crit, setCrit] = useState(CRITS[0]);
  /** açık ülke; null = hepsi kapalı, bölümün gerçek boyu bu */
  const [open, setOpen] = useState<CountrySlug | null>(null);
  const reduce = useReducedMotion();

  return (
    /* id="ulkeler" bilerek yok: /lab/ulkeler'de adaylar aynı sayfada duruyor ve
       çapayı ikinci kez basmak sayfada çift id demek. Kazanan aday canlıya
       taşınırken hem bu id'yi hem de eski bölümün #odeme-altyapisi çapasını
       (routes.ts onu canlı sayıyor) devralmak zorunda. */
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
            {/* Eski satır "Kanallar ve sınırlar kartlarda." diyordu; kart
                kalmadı. Yeni satır mekanizmayı öğretiyor ama talimat vermiyor:
                ne yaptığımızı söylüyor, sonra bölümün nasıl okunduğunu tek
                yan cümleyle geçiyor. */}
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Ölçütü seçin, üçü aynı anda
              değişsin.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16} className="ckar-wrap">
          {/* --------------------------------------------------- kıyas satırı */}
          {/* Düğmeler yayın ÜSTÜNDE: DOM sırası ile görsel sıra aynı kalsın
              diye. Aşağı alınsaydı klavye odağı sayfada geri zıplardı. Kontrolün
              değiştirdiği hücreler bir yay boyu aşağıda kalıyor; bunu hücrelerin
              soldan sağa kademeli geçişi telafi ediyor (aşağıda). */}
          <div className="ckar-crits" role="group" aria-label="Kıyas ölçütü">
            {CRITS.map((k) => (
              <button
                key={k.key}
                type="button"
                className="ckar-crit"
                data-on={crit.key === k.key}
                aria-pressed={crit.key === k.key}
                onClick={() => setCrit(k)}
              >
                {/* Amber üçgen yalnızca burada. Kısıtın metni seçilmeden
                    görünmüyor; bu işaret onun var olduğunu seçilmeden söylüyor
                    ve bir satır yer harcamıyor. */}
                {k.warn && <TriangleAlert size={13} strokeWidth={2.2} aria-hidden="true" />}
                {k.label}
              </button>
            ))}
          </div>

          {/* BAND tek sayı olarak buradan çıkıyor ve iki yere birden gidiyor:
              yayın SVG yüksekliği ve disklerin oturduğu yuvanın yüksekliği.
              Satır içi height yerine değişken, çünkü dar ekranda yuva
              yüksekliğini CSS'in geri alması gerekiyor — satır içi yazılsaydı
              bunun tek yolu !important olurdu. */}
          <div
            className="ckar-grid"
            style={{ "--ckar-band": `${BAND}px` } as React.CSSProperties}
          >
            <p className="sr-only">
              Ülkeler batıdan doğuya sıralı: İngiltere, KKTC, Dubai.
            </p>

            {/* Yay: ızgaranın arkasında, akıştan çıkmış. viewBox yüksekliği
                BAND ile aynı olduğu için disklerin top değeri doğrudan eğrinin
                y'si — iki sayı asla birbirinden ayrılamaz. */}
            <svg
              className="ckar-arc"
              viewBox={`0 0 ${VB_W} ${BAND}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {ARC_ROWS.map((r) => (
                /* non-scaling-stroke: kutu yatayda gerildiği için noktalar
                   normalde yumurtaya dönerdi; kontur ekran uzayında
                   hesaplanınca her genişlikte yuvarlak kalıyor. */
                <path key={r.dy} d={r.d} opacity={r.o} vectorEffect="non-scaling-stroke" />
              ))}
            </svg>

            {ORDER.map((c, i) => {
              const on = open === c;
              const v = crit.val(c);
              const dy = arcY(LANE_P[i]);

              return (
                /* .ckar-lane masaüstünde display:contents — yani kutusu yok,
                   üç çocuğu doğrudan ızgaraya giriyor ve satırlarına CSS'ten
                   yerleşiyor (düğmeler 1. satır, hücreler 2., panel 3.).
                   Dar ekranda lane gerçek bir bloğa dönüşüyor ve aynı DOM
                   ülke ülke satırlara iniyor — panel de kendi ülkesinin
                   hemen altında kalıyor. Tek işaretleme, iki yerleşim. */
                <div key={c} className="ckar-lane">
                  <button
                    type="button"
                    className="ckar-pick"
                    style={{ gridColumn: String(i + 1) }}
                    data-on={on}
                    aria-expanded={on}
                    aria-controls={on ? `ckar-p-${c}` : undefined}
                    onClick={() => setOpen((p) => (p === c ? null : c))}
                  >
                    <span className="ckar-discwrap">
                      <motion.span
                        className="ckar-disc"
                        style={{ top: dy }}
                        initial={reduce ? false : { opacity: 0, y: 14, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                        transition={{
                          duration: reduce ? 0 : 0.6,
                          ease: EASE,
                          delay: reduce ? 0 : 0.28 + i * 0.1,
                        }}
                      >
                        <Flag country={c} />
                      </motion.span>
                    </span>

                    <span className="ckar-name">
                      {COUNTRY_NAME[c]}
                      <ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <span className="ckar-edge">{EDGE[c]}</span>
                  </button>

                  {/* Hücre. key={crit.key} kasıtlı: ölçüt değişince React eski
                      içeriği söküp yenisini takıyor, yani giriş animasyonu
                      bedavaya geliyor ve AnimatePresence'a gerek kalmıyor —
                      çıkış animasyonu olmadığı için iki metin asla üst üste
                      binmiyor. Kademe soldan sağa: üç hücrenin aynı anda
                      değiştiği tek karede anlaşılmıyordu. */}
                  <div className="ckar-cell" style={{ gridColumn: String(i + 1) }} data-on={on}>
                    <motion.span
                      key={crit.key}
                      className="ckar-val"
                      data-tone={v.tone}
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.3,
                        ease: EASE,
                        delay: reduce ? 0 : i * 0.05,
                      }}
                    >
                      <span className="ckar-val-h">
                        {v.tone === "yes" && (
                          <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                        )}
                        {v.tone === "no" && <X size={15} strokeWidth={2.5} aria-hidden="true" />}
                        {v.tone === "warn" && (
                          <TriangleAlert size={14} strokeWidth={2.1} aria-hidden="true" />
                        )}
                        {v.head}
                      </span>
                      {v.sub && <span className="ckar-val-s">{v.sub}</span>}
                    </motion.span>
                  </div>

                  <AnimatePresence initial={false}>
                    {on && (
                      /* Yerinde açılım. Yükseklik animasyonu height:auto ile:
                         panel ızgaranın son satırı ve üç sütunu birden
                         kaplıyor, o yüzden hangi ülke açılırsa açılsın yanal
                         kayma olmuyor — sadece bölüm uzuyor. Kapanınca satır
                         DOM'dan tamamen çıkıyor, boş bir yuva bırakmıyor. */
                      <motion.div
                        key="panel"
                        className="ckar-panel"
                        style={{ gridColumn: "1 / -1" }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}
                      >
                        <div
                          className="ckar-panel-in"
                          id={`ckar-p-${c}`}
                          role="group"
                          aria-label={`${COUNTRY_NAME[c]} detayı`}
                        >
                          <div className="ckar-panel-head">
                            <span className="ckar-panel-flag" aria-hidden="true">
                              <Flag country={c} />
                            </span>
                            <b>{COUNTRY_NAME[c]}</b>
                            {/* Panelin kendi kapatma düğmesi yok: açan düğme
                                (ülkenin adı) her zaman görünür durumda ve mavi
                                kalıyor, ikinci bir kontrol kalabalıktan başka
                                bir şey getirmiyordu. */}
                            <SmartLink href={`/${c}`} className="btn btn-solid btn-sm">
                              {COUNTRY_NAME[c]}&apos;de kuruluş
                              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                            </SmartLink>
                          </div>

                          <dl className="ckar-panel-rows">
                            {panelRows(c).map((r) => (
                              <div key={r.k}>
                                <dt>{r.k}</dt>
                                <dd>
                                  {r.v}
                                  {r.hint && <span>{r.hint}</span>}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Ölçütün altyazısı ve bölümün tek çıkışı aynı satırda. Yuva iki
              satırlık sabit yükseklikte: ölçüt değişirken altındaki hiçbir şey
              zıplamıyor. */}
          <div className="ckar-foot">
            <p className="ckar-note">{crit.note}</p>
            <SmartLink href="/ulkeler" className="link-arrow ckar-exit">
              Üç ülkeyi yan yana kıyaslayın
              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
