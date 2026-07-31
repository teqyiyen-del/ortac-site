"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CreditCard,
  IdCard,
  Languages,
  MapPin,
  MonitorSmartphone,
  TriangleAlert,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
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
   ADAY C7 — "yay + iki başlık"

   NE DEĞİŞTİ, NEDEN

   C6 beğenildi ama üstündeki ölçüt şeridi istenmedi. Şerit bir kontroldü:
   ziyaretçi bir ölçüt seçiyor, üç ülkenin o ölçütteki cevabı aynı anda
   değişiyordu. Fikir çalışıyordu ama bir bedeli vardı ve müşteri o bedeli
   gördü — ziyaretçiye bölümü okumadan önce bir KARAR verdiriyordu. Dört
   düğmeden hangisi? Cevabı bilmeyen biri neyi seçeceğini de bilmiyor; şerit,
   bilgiyi bir tık arkasına saklayan bir menüye dönüşüyordu.

   Şeridin yerine geçen şey menü değil, cevabın kendisi: her ülkenin adının
   altında o ülkenin öne çıktığı İKİ başlık, ikonlu, hep açık. Bir tık gerekmiyor
   ve kimse bir ölçüt seçmek zorunda değil.

   İKİ BAŞLIK NEDEN "KIYAS" SAYILIYOR

   Bu turun bağlayıcı şartlarından biri kapalıyken de kıyas hissi olması. Altı
   satır üç sütunda AYNI geometride duruyor: aynı hizada, aynı ikon dilinde,
   aynı uzunlukta. Göz soldan sağa okuyunca üç ülkeyi yan yana koymuş oluyor.
   Cümlelerin çoğu da kendi içinde kıyaslı kuruldu — "tek ülke", "en düşük",
   "en yakın". Yani kıyas bir tabloya değil, cümlelerin kendisine gömülü.

   Seçilen altı başlık, her ülkenin ÖNDE OLDUĞU eksenler; hiçbir ülke geride
   kaldığı bir eksende gösterilmiyor. Bu bilerek: kapalı hâl bölümün vitrini,
   eleme değil. Elemeyi yapan bilgi (KKTC'de kartla tahsilat yok, her ülkenin
   dürüst kısıtı) panelde ve tek tıkla orada — gizlenmiyor, sıraya konuyor.

   BAŞLIKLARIN KAYNAĞI

   Mümkün olan her satır veriden türüyor, elle yazılmıyor: Dubai'nin tahsilat
   kanalları PAY_MATRIX'ten, İngiltere'nin maliyet sırası FACTS.from'dan. Elle
   yazılan üç satır (vize, uzaktan kuruluş, Türkçe süreç) sitenin başka
   yerlerinde de aynı kelimelerle duran, veriye çevrilmesi mümkün olmayan
   niteliksel gerçekler. Hiçbiri taahhüt içermiyor: Dubai'ninki "çıkabilen",
   "çıkar" değil.

   YAY DURUYOR

   Müşterinin C3'te beğendiği ve C6'da korunan yay aynen kalıyor: aynı denklem,
   aynı üç sıra, aynı maskeler. Tek fark altında daha az şey olması. Yay zaten
   bilgi taşımıyordu, işi kolonların üstünü bağlamaktı; şerit kalkınca o iş
   büyüdü — bölümün tek yapısal jesti artık o.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------- geometri --- */
/* C6 ile birebir aynı sayılar. Yayın şeridi BAND kadar yüksek, SVG'nin viewBox
   yüksekliği de aynı sayı ve preserveAspectRatio="none" yalnızca yatayda
   geriyor — yani viewBox'taki y birimi ile ekrandaki piksel birebir eşit.
   Diskleri yayın üstüne oturtmak için eğriyi örneklemek yetiyor, ölçek
   düzeltmesi gerekmiyor. */
const BAND = 112;
const VB_W = 1000;
/** yayın iki ucunun yüksekliği */
const BASE_Y = 82;
/** tepe noktasının uçlardan yüksekliği */
const RISE = 43;

/* Sütun merkezleri: üç eşit sütunda 1/6, 1/2, 5/6. Aradaki column-gap bunu
   binde yedi kaydırıyor, yayda bir pikselden az fark ediyor ve diskin beş
   piksellik beyaz halkasının altında kalıyor. */
const LANE_P = [1 / 6, 1 / 2, 5 / 6];

/** yayın p noktasındaki yüksekliği — eğri karesel Bézier, x'te doğrusal */
function arcY(p: number) {
  return BASE_Y - 4 * RISE * p * (1 - p);
}

/* Yay ve altındaki iki sönük sıra. Her sıra biraz aşağıda (dy) ve biraz daha
   düz (k): sadece kaydırılmış kopyalar olsalardı iç içe kemerler okunurdu,
   düzleşerek geldikleri için öne doğru açılan bir yüzey okunuyor. */
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
   sıra ama bir eksende değil: soldan sağa okunan şey coğrafya, göz sırası ile
   harita sırası aynı olmak zorunda. Boylamlar yalnızca sıralama için duruyor,
   konum artık onlardan çıkmıyor — o yüzden ondalık hassasiyet de gerekmiyor. */
const LNG: Record<CountrySlug, number> = {
  ingiltere: -0.13,
  kktc: 33.38,
  dubai: 55.27,
};
const ORDER = [...COUNTRY_ORDER].sort((a, b) => LNG[a] - LNG[b]);

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

/** "a, b ve c" — cümlenin içinde kanal adı sayarken virgül listesi kaba kalıyor */
function trList(xs: string[]) {
  if (xs.length < 2) return xs[0] ?? "";
  return `${xs.slice(0, -1).join(", ")} ve ${xs[xs.length - 1]}`;
}

/* --------------------------------------------------------- iki başlık ----- */
/* Maliyet sırası FACTS.from'dan türüyor, elle yazılmıyor. Rakam yok: bu bölümün
   sözleşmesi baştan beri "tutar fiyat bölümünde" ve buraya üç rakam koymak
   fiyat tartışmasını da beraberinde getirir. Sıra zaten kıyasın istediği şey.
   Dizi veriye bağlı olduğu için fiyat listesi güncellenip sıra değişirse cümle
   de değişiyor — sessizce yanlış kalmıyor. */
const COST_WORD = ["en düşük", "orta", "en yüksek"];
const COST_RANK = [...COUNTRY_ORDER].sort((a, b) => FACTS[a].from - FACTS[b].from);
const costWord = (c: CountrySlug) => COST_WORD[COST_RANK.indexOf(c)] ?? "—";

type Feat = { i: LucideIcon; t: string };

/* Ülke başına tam iki satır. Dört kural:
   1) Üçünde de doğru olan bir şey yazılmaz. "Yerel banka hesabı" üç ülkede de
      var; başlık olarak yazılsaydı ayırt etmeyen bir satır olurdu, yani boş
      yer. Panelde duruyor, orada yeri var.
   2) Taahhüt yok. Dubai "çıkabilen", "çıkar" değil; hiçbir satırda süre, onay
      ya da vergi sonucu vaadi geçmiyor (STANCE_LIMITS).
   3) Tek satır. En uzun cümle 32 karakter — masaüstünde altı satırın altısı da
      tek satır kalıyor, blok üç sütunda aynı yükseklikte duruyor. Kıyas hissi
      hizadan geliyor; sarma başlayınca hiza bozuluyor.
   4) Ülkenin ÖNDE olduğu eksen seçiliyor. Geride kaldığı eksen kapalı hâlde
      yok — ama panelde var ve bir tık uzakta. */
const FEATS: Record<CountrySlug, [Feat, Feat]> = {
  dubai: [
    { i: IdCard, t: "Oturum vizesi çıkabilen tek ülke" },
    /* Kanal adları PAY_MATRIX'ten: Stripe bir gün listeyi değiştirirse cümle
       kendiliğinden düzeliyor. Dubai bu eksende üç kanalla önde ve satır bunu
       "en geniş" diye iddia etmeden, isimleri sayarak gösteriyor. */
    { i: CreditCard, t: `${trList(worksIn("Tahsilat", "dubai"))} çalışıyor` },
  ],
  ingiltere: [
    { i: MonitorSmartphone, t: "Baştan sona uzaktan kuruluş" },
    { i: Wallet, t: `Üç ülkede ${costWord("ingiltere")} maliyet` },
  ],
  kktc: [
    /* İkisi ayrı şeyler, tekrar değil: biri coğrafya, öbürü sürecin dili.
       Hiçbirinde İstanbul geçmiyor — yakınlık argümanı ülke düzeyinde. */
    { i: MapPin, t: "Türkiye'ye en yakın ülke" },
    { i: Languages, t: "Süreç tamamen Türkçe" },
  ],
};

/* ------------------------------------------------------------- panel ------ */
/* Kapalı hâlde OLMAYAN her şey burada, altı alanda. Panelin işi başlıkları
   tekrar etmek değil, onların söylemediğini söylemek — o yüzden yukarıdaki altı
   cümlenin hiçbiri burada ikinci kez geçmiyor.
   Sıra bilinçli: önce kim için ve hangi yapı, sonra paranın üç kanalı, en sonda
   dürüst kısıt. Kısıt en sonda çünkü kapatan cümle o olmalı; en başta olsaydı
   panel bir uyarıyla açılırdı ve altındaki her şey onun gölgesinde okunurdu. */
type Row = { k: string; v: string; hint?: string; tone?: "yes" | "no" | "warn" };

function panelRows(c: CountrySlug): Row[] {
  const on = worksIn("Tahsilat", c);
  /* hangi kanalın kapalı olduğu da matristen okunuyor: elle yazılsaydı matris
     değiştiğinde sessizce yanlışa dönerdi */
  const off = (group("Tahsilat")?.rows ?? [])
    .filter((r) => r.cells[c] === "no")
    .map((r) => r.name);

  return [
    { k: "Kim için", v: FACTS[c].forWhom },
    { k: "Yapı", v: FACTS[c].structure },
    on.length
      ? { k: "Kartla tahsilat", v: on.join(", "), tone: "yes" }
      : { k: "Kartla tahsilat", v: `Yok — ${trList(off)} desteklemiyor`, tone: "no" },
    {
      k: "Banka hesabı",
      v: worksIn("Banka hesabı", c).join(", ") || "Bu ülkede sunulmuyor",
      /* "Bankacılık lisansı olan kurum" / "Banka değil; farklı lisans" uyarıları
         ayrı bir dipnot bloğu istemiyor: metin zaten PAY_MATRIX'te duruyor,
         burada ikinci kopyası açılmıyor. */
      hint: group("Banka hesabı")?.hint,
    },
    {
      k: "Ödeme kuruluşu",
      v: worksIn("Ödeme kuruluşu", c).join(", ") || "Bu ülkede çalışan kanal yok",
      hint: group("Ödeme kuruluşu")?.hint,
    },
    { k: "Dürüst kısıt", v: FACTS[c].limit, tone: "warn" },
  ];
}

export default function CountriesC7() {
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
            {/* İkinci cümle mekanizmayı öğretiyor ama talimat vermiyor: bölümün
                nasıl okunduğunu söylüyor, ziyaretçiden bir şey istemiyor.
                C6'daki "Ölçütü seçin" bir emirdi ve artık seçilecek ölçüt de
                yok. */}
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Her ülkenin öne çıktığı iki
              başlık adının altında.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16} className="c7-wrap">
          {/* BAND tek sayı olarak buradan çıkıyor ve iki yere birden gidiyor:
              yayın SVG yüksekliği ve disklerin oturduğu yuvanın yüksekliği.
              Satır içi height yerine değişken, çünkü dar ekranda yuvanın
              yüksekliğini CSS'in geri alması gerekiyor — satır içi yazılsaydı
              bunun tek yolu !important olurdu. */}
          <div
            className="c7-grid"
            style={{ "--c7-band": `${BAND}px` } as React.CSSProperties}
          >
            <p className="sr-only">
              Ülkeler batıdan doğuya sıralı: İngiltere, KKTC, Dubai.
            </p>

            {/* Yay: ızgaranın arkasında, akıştan çıkmış. viewBox yüksekliği BAND
                ile aynı olduğu için disklerin top değeri doğrudan eğrinin y'si —
                iki sayı asla birbirinden ayrılamaz. */}
            <svg
              className="c7-arc"
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
              const dy = arcY(LANE_P[i]);

              return (
                /* .c7-lane masaüstünde display:contents — kutusu yok, iki çocuğu
                   doğrudan ızgaraya giriyor: düğme 1. satıra, panel 2. satıra ve
                   üç sütunu birden kaplayarak. Dar ekranda lane gerçek bir bloğa
                   dönüşüyor ve aynı DOM ülke ülke satırlara iniyor — panel de
                   kendi ülkesinin hemen altında kalıyor. Tek işaretleme, iki
                   yerleşim. */
                <div key={c} className="c7-lane">
                  <button
                    type="button"
                    className="c7-pick"
                    style={{ gridColumn: String(i + 1) }}
                    data-on={on}
                    aria-expanded={on}
                    aria-controls={on ? `c7-p-${c}` : undefined}
                    onClick={() => setOpen((p) => (p === c ? null : c))}
                  >
                    <span className="c7-discwrap">
                      <motion.span
                        className="c7-disc"
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

                    <span className="c7-name">
                      {COUNTRY_NAME[c]}
                      <ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" />
                    </span>

                    {/* İki başlık düğmenin İÇİNDE: tıklama hedefi ülkenin kimlik
                        bloğunun tamamı olsun diye. Ekran okuyucu da düğmenin
                        adını "Dubai, oturum vizesi çıkabilen tek ülke, Stripe,
                        PayPal ve Wam çalışıyor" diye okuyor — uzun ama kapalı
                        hâlin bütün bilgisi orada, ayrı bir gezinme gerekmiyor. */}
                    <span className="c7-feats">
                      {FEATS[c].map((f) => {
                        const Icon = f.i;
                        return (
                          <span key={f.t} className="c7-feat">
                            <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                            {/* Metin ayrı bir span'de, çıplak metin düğümü
                                olarak değil: .c7-feat bir ızgara ve çıplak metin
                                anonim bir ızgara öğesine dönüşüyor. Çalışıyor
                                ama anonim öğe seçilemiyor, yani ileride o metne
                                tek bir kural yazmak gerektiğinde işaretlemeyi
                                değiştirmek zorunda kalınırdı. */}
                            <span>{f.t}</span>
                          </span>
                        );
                      })}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {on && (
                      /* Yerinde açılım. Panel ızgaranın son satırı ve üç sütunu
                         birden kaplıyor, o yüzden hangi ülke açılırsa açılsın
                         yanal kayma olmuyor — sadece bölüm uzuyor. Kapanınca
                         satır DOM'dan tamamen çıkıyor, boş yuva bırakmıyor. */
                      <motion.div
                        key="panel"
                        className="c7-panel"
                        style={{ gridColumn: "1 / -1" }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}
                      >
                        <div
                          className="c7-panel-in"
                          id={`c7-p-${c}`}
                          role="group"
                          aria-label={`${COUNTRY_NAME[c]} detayı`}
                        >
                          <div className="c7-panel-head">
                            <span className="c7-panel-flag" aria-hidden="true">
                              <Flag country={c} />
                            </span>
                            <b>{COUNTRY_NAME[c]}</b>
                            {/* Panelin kendi kapatma düğmesi yok: açan düğme
                                (ülkenin adı) her zaman görünür durumda, mavi
                                kalıyor ve oku dönmüş duruyor. İkinci bir kontrol
                                kalabalıktan başka bir şey getirmiyordu. */}
                            <SmartLink href={`/${c}`} className="btn btn-solid btn-sm">
                              {COUNTRY_NAME[c]}&apos;de kuruluş
                              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                            </SmartLink>
                          </div>

                          <dl className="c7-rows">
                            {panelRows(c).map((r) => (
                              <div key={r.k}>
                                <dt>{r.k}</dt>
                                <dd>
                                  <span className="c7-v" data-tone={r.tone}>
                                    {/* Renk tek başına bilgi taşımıyor: "Yok"
                                        kelimesi ve ikon zaten orada, renk
                                        yalnızca hızlandırıyor. */}
                                    {r.tone === "yes" && (
                                      <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                                    )}
                                    {r.tone === "no" && (
                                      <X size={15} strokeWidth={2.5} aria-hidden="true" />
                                    )}
                                    {r.tone === "warn" && (
                                      <TriangleAlert
                                        size={14}
                                        strokeWidth={2.1}
                                        aria-hidden="true"
                                      />
                                    )}
                                    {r.v}
                                  </span>
                                  {r.hint && <span className="c7-hint">{r.hint}</span>}
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

          {/* Alt satır iki iş yapıyor ve ikisi de tek cümlelik. Not, tıkın
              arkasında ne olduğunu söylüyor — özellikle dürüst kısıtı, çünkü o
              artık kapalı hâlde görünmüyor ve "erişilebilir kalsın" şartı bir
              yerde yazılı olmasını değil, ziyaretçinin onu bulabilmesini
              istiyor. Üç kez tekrarlanan bir dipnot yerine bir kez, doğru yerde.
              Bağlantı ise bölümün tek çıkışı; detay yolu değil, kıyas yolu. */}
          <div className="c7-foot">
            <p className="c7-note">
              Ülkeye tıklayın: yapı, banka, tahsilat kanalları ve o ülkenin dürüst
              kısıtı yerinde açılır.
            </p>
            <SmartLink href="/ulkeler" className="link-arrow c7-exit">
              Üç ülkeyi yan yana kıyaslayın
              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
