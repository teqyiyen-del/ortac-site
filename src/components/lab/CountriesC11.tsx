"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeftRight,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  CreditCard,
  IdCard,
  Landmark,
  Languages,
  MapPin,
  MonitorSmartphone,
  TriangleAlert,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { BrandGlyph } from "@/components/shared/BrandMark";
import { brandKeyForName, type BrandKey } from "@/lib/brands";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PAY_MATRIX,
  type CountrySlug,
} from "@/lib/brand";

/* ============================================================================
   ADAY C11 — C7'nin panel revizyonu

   NEDEN VAR

   C7 gösterildiğinde geri bildirim iki parçalıydı ve ikisi birbirinin zıddıydı:
   kapalı hâl (yay, diskler, ad altındaki iki ikonlu başlık) beğenildi, açılan
   panel beğenilmedi — "çok fazla yazıyla karşılaşıyoruz", "aşırı donuk". Yani
   sorun bölümün fikri değil, tek bir bileşenin iç düzeni. O yüzden C11 sıfırdan
   bir aday değil: C7'nin kapalı hâlini olduğu gibi devralıyor (aynı yay
   denklemi, aynı geometri, aynı altı başlık) ve YALNIZCA paneli yeniden kuruyor.
   C7 dosyası duruyor; iki panel yan yana karşılaştırılabilsin diye.

   "DONUK" NEYDİ, TEŞHİS

   C7'nin paneli altı kalemi tek bir kalıba sokuyordu: küçük büyük harf etiket +
   altında gri cümle, üç sütuna dizili. Altı kez aynı ritim. Bilginin türü
   değişiyordu (kim için / yapı / hangi banka / hangi kart kanalı / kısıt) ama
   ekrandaki BİÇİM hiç değişmiyordu — göz için altı özdeş blok, yani okunacak
   bir metin bloğu. Üstelik en somut bilgi olan tahsilat kanalları da orada
   yalnızca metindi: "Stripe, PayPal, Wam" yazıyordu ama ekranda Stripe'ın moru,
   PayPal'ın laciverti yoktu. Sitenin başka yerlerinde (ortaklar şeridi,
   /ulkeler matrisi) o işaretler basılıyor; panelde basılmayınca aynı iddia daha
   zayıf ve daha "yazılı" duruyordu.

   ÜÇ MÜDAHALE

   1. LİSTELER İŞARETE DÖNDÜ. Panelin en kalabalık üç satırı (banka hesabı,
      ödeme kuruluşu, tahsilat) artık virgüllü cümle değil; her kanal kendi
      markasının işaretiyle, kendi satırında, yanında çalışıp çalışmadığını
      söyleyen bir işaretle duruyor. Kelime sayısı düşüyor ÇÜNKÜ marka adı zaten
      tek kelime ve gerisini logo ile ✓/✗ söylüyor. KKTC'de C7'nin
      "Yok — Stripe ve PayPal desteklemiyor" cümlesi tamamen kalktı: yerinde iki
      griye düşmüş logo ve iki çarpı var. Aynı bilgi, sıfır cümle.

   2. NİTELİKSEL İKİ KALEM ETİKETE DÖNDÜ. "Kim için" ve "Yapı" zaten virgülle
      ya da nokta ile ayrılmış listelerdi ("E-ticaret, teknoloji, danışmanlık,
      oturum isteyen"); veride liste, ekranda cümle görünüyorlardı. Artık
      gerçekten liste: her öğe kendi kutucuğunda. Metin aynı, algılanan yoğunluk
      yarı yarıya düşüyor çünkü göz dört kısa nesne sayıyor, bir cümle okumuyor.

   3. HER KALEMİN KENDİ İKONU VAR. Altı kalem, altı farklı ikon; hiçbiri süs
      değil, hepsi kalemin ne olduğunu söylüyor. İkon dili kapalı hâlle de
      tutarlı: kartla tahsilat kapalı hâlde de CreditCard ile işaretleniyor,
      panelde de. Tek bilinçli sapma "Ödeme kuruluşu": Wallet ikonu kapalı hâlde
      İngiltere'nin MALİYET satırında kullanılıyor, aynı ikonu panelde başka bir
      anlamda basmak ikon dilini kırardı — o yüzden burada ArrowLeftRight (para
      transferi) duruyor.

   NE GİTMEDİ

   Dürüst kısıt (FACTS[c].limit) panelde ve gizlenmiyor; C7'de olduğu gibi en
   sonda, çünkü kapatan cümle o olmalı. Kutusu ve rengi yok, uyarıyı üçgen
   taşıyor — C7'de verilmiş bu karar hâlâ doğru: üç ülkede üç amber kutu uyarı
   olmaktan çıkıp desen olur. PAY_MATRIX'in kendi açıklamaları (lisans
   uyarıları) da duruyor; "ödeme kuruluşu banka değildir" bu sitede pazarlama
   tercihi değil.

   HAREKET

   Panel açılırken içerik kademeli geliyor (stagger). Sebebi süs değil sıra:
   künye → para → kısıt sırası panelin argüman sırası ve içerik hep birlikte
   belirdiğinde o sıra kayboluyor, altı kalem aynı anda "işte metin" diyor.
   Toplam gecikme 0,3 saniyenin altında ve her kalem yalnızca 8 piksel yukarıdan
   geliyor — açılışı geciktirmiyor, yalnızca yönlendiriyor. useReducedMotion
   açıksa hem stagger hem kayma tamamen kapanıyor: içerik ilk karede tam.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------- geometri --- */
/* C7 ile birebir aynı sayılar — kapalı hâl bu turda değişmiyor. Yayın şeridi
   BAND kadar yüksek, SVG'nin viewBox yüksekliği de aynı sayı ve
   preserveAspectRatio="none" yalnızca yatayda geriyor: viewBox'taki y birimi
   ile ekrandaki piksel birebir eşit. Diskleri yayın üstüne oturtmak için eğriyi
   örneklemek yetiyor, ölçek düzeltmesi gerekmiyor. */
const BAND = 112;
const VB_W = 1000;
/** yayın iki ucunun yüksekliği */
const BASE_Y = 82;
/** tepe noktasının uçlardan yüksekliği */
const RISE = 43;

/* Sütun merkezleri: üç eşit sütunda 1/6, 1/2, 5/6. */
const LANE_P = [1 / 6, 1 / 2, 5 / 6];

/** yayın p noktasındaki yüksekliği — eğri karesel Bézier, x'te doğrusal */
function arcY(p: number) {
  return BASE_Y - 4 * RISE * p * (1 - p);
}

/* Yay ve altındaki iki sönük sıra. Her sıra biraz aşağıda (dy) ve biraz daha
   düz (k): sadece kaydırılmış kopyalar olsalardı iç içe kemerler okunurdu. */
const ARC_ROWS = [
  { dy: 0, k: 1, o: 1 },
  { dy: 14, k: 0.84, o: 0.32 },
  { dy: 30, k: 0.68, o: 0.16 },
].map((r) => {
  const y0 = BASE_Y + r.dy;
  return { ...r, d: `M0 ${y0}Q${VB_W / 2} ${y0 - 2 * RISE * r.k} ${VB_W} ${y0}` };
});

/* Sıra batıdan doğuya: soldan sağa okunan şey coğrafya. Boylamlar yalnızca
   sıralama için duruyor, konum onlardan çıkmıyor. */
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
/* KAPALI HÂL — C7'den birebir. Maliyet sırası FACTS.from'dan türüyor, elle
   yazılmıyor; rakam yok çünkü bu bölümün sözleşmesi "tutar fiyat bölümünde". */
const COST_WORD = ["en düşük", "orta", "en yüksek"];
const COST_RANK = [...COUNTRY_ORDER].sort((a, b) => FACTS[a].from - FACTS[b].from);
const costWord = (c: CountrySlug) => COST_WORD[COST_RANK.indexOf(c)] ?? "—";

type Feat = { i: LucideIcon; t: string };

/* Ülke başına tam iki satır; kurallar C7'deki gibi: üçünde de doğru olan bir
   şey yazılmaz, taahhüt yok, tek satır, ülkenin ÖNDE olduğu eksen seçilir. */
const FEATS: Record<CountrySlug, [Feat, Feat]> = {
  dubai: [
    { i: IdCard, t: "Oturum vizesi çıkabilen tek ülke" },
    { i: CreditCard, t: `${trList(worksIn("Tahsilat", "dubai"))} çalışıyor` },
  ],
  ingiltere: [
    { i: MonitorSmartphone, t: "Baştan sona uzaktan kuruluş" },
    { i: Wallet, t: `Üç ülkede ${costWord("ingiltere")} maliyet` },
  ],
  kktc: [
    { i: MapPin, t: "Türkiye'ye en yakın ülke" },
    { i: Languages, t: "Süreç tamamen Türkçe" },
  ],
};

/* =========================================================== PANEL VERİSİ == */

/* --------------------------------------------------------------- künye ---- */
/* İki niteliksel kalem. Her ikisi de veride zaten AYRILMIŞ listeler:
   forWhom virgülle, structure orta noktayla. C7 ikisini de cümle olarak
   basıyordu; burada ayırıcıdan bölünüp öğe öğe çıkıyorlar.

   Ayırıcı listesi tek yerde çünkü iki alan iki farklı işaret kullanıyor ve
   ileride biri değişirse (ör. structure'a virgül girerse) bölme kuralının tek
   satırda düzelmesi gerekiyor. filter(Boolean) sondaki olası boş parçayı
   atıyor — veri elle yazılıyor, "Limited · " gibi bir satır bir gün girebilir. */
function parts(v: string): string[] {
  return v
    .split(/[·,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

type Brief = { i: LucideIcon; k: string; items: string[] };

function brief(c: CountrySlug): Brief[] {
  return [
    { i: Users, k: "Kim için", items: parts(FACTS[c].forWhom) },
    { i: Building2, k: "Yapı", items: parts(FACTS[c].structure) },
  ];
}

/* ---------------------------------------------------------------- para ---- */
/* PAY_MATRIX'in üç grubu, olduğu gibi ve aynı sırayla. Grup başlığına göre ikon
   seçiliyor; eşleşmezse Wallet'a düşüyor — başlık bir gün değişirse panel
   çökmüyor, yalnızca ikonu genelleşiyor.

   "Ödeme kuruluşu" için Wallet DEĞİL ArrowLeftRight: Wallet kapalı hâlde
   İngiltere'nin maliyet satırında duruyor ve aynı ikonun bölümün iki yerinde
   iki ayrı anlama gelmesi ikon dilini kırar. Transfer oku hem Wise'ın hem
   Payoneer'ın gerçekten yaptığı işi söylüyor. */
const GROUP_ICON: Record<string, LucideIcon> = {
  "Banka hesabı": Landmark,
  "Ödeme kuruluşu": ArrowLeftRight,
  Tahsilat: CreditCard,
};

type Chan = { name: string; brand: BrandKey | null; on: boolean };
type MoneyGroup = { title: string; hint: string; i: LucideIcon; items: Chan[] };

function money(c: CountrySlug): MoneyGroup[] {
  return PAY_MATRIX.map((g) => ({
    title: g.title,
    hint: g.hint,
    i: GROUP_ICON[g.title] ?? Wallet,
    /* "none" satırları düşüyor, "no" satırları KALIYOR. İkisi farklı şeyler:
       "none" o ülkede konusu bile olmayan kanal (BAE bankası İngiltere'de —
       kimse beklemiyor, satır olarak durursa gürültü), "no" ise sağlayıcının
       o ülkeyi açıkça desteklemediği kanal. İkincisi bu bölümün en keskin
       bilgisi; KKTC'nin dört çarpısı buradan geliyor ve gizlenmiyor. */
    items: g.rows
      .filter((r) => r.cells[c] !== "none")
      .map((r) => ({
        name: r.name,
        /* Marka anahtarı addan türüyor: PAY_MATRIX satırları markayı anahtarla
           değil görünen adıyla taşıyor ve o listeyi yeniden yazmadan işaret
           basmanın yolu bu. Karşılığı olmayan ad (ör. "Yerel banka") null
           dönüyor, o satır lucide ikonuyla çıkıyor. */
        brand: brandKeyForName(r.name),
        on: r.cells[c] === "yes",
      })),
  }));
}

/* =================================================================== UI ==== */

/** panelde tek kanal satırı: işaret + ad + durum */
function Channel({ ch }: { ch: Chan }) {
  /* data-v yalnızca yerel biçim için değil: globals.css'te [data-v="no"] > .bm-g
     kuralı zaten var ve çalışmayan kanalın logosunu griye düşürüp soluklaştırıyor.
     Renkli bir Stripe logosu, yanındaki çarpıya rağmen "çalışıyor" diye okunuyor;
     o kural tam bu yüzden yazılmıştı ve burada ikinci kez yazılmıyor. Kuralın
     çalışması için işaretin data-v taşıyan elemanın DOĞRUDAN çocuğu olması
     gerekiyor — aradaki her sarmalayıcı kuralı sessizce iptal ederdi. */
  return (
    <li className="c11-ch" data-v={ch.on ? "yes" : "no"}>
      {ch.brand ? (
        <BrandGlyph brand={ch.brand} size={16} />
      ) : (
        /* Resmî işareti olmayan ve markası da olmayan tek kalem "Yerel banka".
           Soyut bir madde imi yerine ne olduğunu söyleyen ikon: bu bir banka.
           Grup başlığıyla aynı ikon olması tekrar değil, aynı şeyin iki
           ölçeği — satır grubun bir örneği. */
        <Landmark className="bm-g" size={16} strokeWidth={1.8} aria-hidden="true" />
      )}
      <span className="c11-ch-n">{ch.name}</span>
      {/* Durum ikonu tek başına bilgi taşımıyor: ekran okuyucu için kelime de
          yazılı. Renk yalnızca hızlandırıyor. */}
      {ch.on ? (
        <Check className="c11-ch-s" size={15} strokeWidth={2.6} aria-hidden="true" />
      ) : (
        <X className="c11-ch-s" size={15} strokeWidth={2.6} aria-hidden="true" />
      )}
      <span className="sr-only">{ch.on ? "çalışıyor" : "desteklenmiyor"}</span>
    </li>
  );
}

export default function CountriesC11() {
  /** açık ülke; null = hepsi kapalı, bölümün gerçek boyu bu */
  const [open, setOpen] = useState<CountrySlug | null>(null);
  const reduce = useReducedMotion();

  /* Kademeli giriş iki varyantla. Hareket azaltmada ikisi de boşa çıkıyor:
     stagger yok, kayma yok, süre yok — içerik ilk karede yerinde ve tam.
     Varyantlar bileşen gövdesinde tanımlı çünkü `reduce` bir kanca değeri;
     modül seviyesinde sabit olsalardı tercihe uyamazlardı. */
  const listV = reduce
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } } };

  const itemV = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
      };

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
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Her ülkenin öne çıktığı iki
              başlık adının altında.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16} className="c11-wrap">
          {/* BAND tek sayı olarak buradan çıkıyor ve iki yere birden gidiyor:
              yayın SVG yüksekliği ve disklerin oturduğu yuvanın yüksekliği. */}
          <div
            className="c11-grid"
            style={{ "--c11-band": `${BAND}px` } as React.CSSProperties}
          >
            <p className="sr-only">
              Ülkeler batıdan doğuya sıralı: İngiltere, KKTC, Dubai.
            </p>

            <svg
              className="c11-arc"
              viewBox={`0 0 ${VB_W} ${BAND}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {ARC_ROWS.map((r) => (
                <path key={r.dy} d={r.d} opacity={r.o} vectorEffect="non-scaling-stroke" />
              ))}
            </svg>

            {ORDER.map((c, i) => {
              const on = open === c;
              const dy = arcY(LANE_P[i]);

              return (
                /* .c11-lane masaüstünde display:contents — kutusu yok, iki
                   çocuğu doğrudan ızgaraya giriyor: düğme 1. satıra, panel 2.
                   satıra ve üç sütunu birden kaplayarak. Dar ekranda lane
                   gerçek bir bloğa dönüşüyor ve aynı DOM ülke ülke satırlara
                   iniyor. Tek işaretleme, iki yerleşim. */
                <div key={c} className="c11-lane">
                  <button
                    type="button"
                    className="c11-pick"
                    style={{ gridColumn: String(i + 1) }}
                    data-on={on}
                    aria-expanded={on}
                    aria-controls={on ? `c11-p-${c}` : undefined}
                    onClick={() => setOpen((p) => (p === c ? null : c))}
                  >
                    <span className="c11-discwrap">
                      <motion.span
                        className="c11-disc"
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

                    <span className="c11-name">
                      {COUNTRY_NAME[c]}
                      <ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" />
                    </span>

                    <span className="c11-feats">
                      {FEATS[c].map((f) => {
                        const Icon = f.i;
                        return (
                          <span key={f.t} className="c11-feat">
                            <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
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
                         yanal kayma olmuyor — sadece bölüm uzuyor. */
                      <motion.div
                        key="panel"
                        className="c11-panel"
                        style={{ gridColumn: "1 / -1" }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}
                      >
                        <div
                          className="c11-panel-in"
                          id={`c11-p-${c}`}
                          role="group"
                          aria-label={`${COUNTRY_NAME[c]} detayı`}
                        >
                          {/* Başlık kademeye girmiyor: panelin çapası o ve
                              kayarak gelen bir başlık, açılan kutunun kendisi
                              zaten büyürken, iki ayrı hareket demek. */}
                          <div className="c11-phead">
                            <span className="c11-pflag" aria-hidden="true">
                              <Flag country={c} />
                            </span>
                            <b>{COUNTRY_NAME[c]}</b>
                            {/* Panelin kendi kapatma düğmesi yok: açan düğme
                                her zaman görünür, mavi ve oku dönmüş durumda. */}
                            <SmartLink href={`/${c}`} className="btn btn-solid btn-sm">
                              {COUNTRY_NAME[c]}&apos;de kuruluş
                              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                            </SmartLink>
                          </div>

                          {/* Kademeyi yöneten kap. Ara katmanlar (.c11-brief,
                              .c11-money) düz div: motion'ın varyant yayılımı
                              bağlam üzerinden yürüdüğü için aradaki sade
                              elemanlar zinciri kesmiyor ve altı kalem sırayla
                              geliyor — künye, üç para grubu, kısıt. */}
                          <motion.div variants={listV} initial="hidden" animate="show">
                            {/* Geniş ekranda künye SOLDA dar bir sütun, para
                                kartı sağda. İlk kurulumda ikisi alt alta
                                duruyordu ve panel C7'ye göre 125 piksel
                                uzuyordu — okunaklılık için ödenmiş ama gereksiz
                                bir bedel, çünkü künye sütunu para kartından
                                kısa: yan yana konunca kartın yüksekliği zaten
                                künyeyi de kapsıyor ve o 125 pikselin 73'ü
                                kendiliğinden geri geliyor. 1024'ün altında
                                yeniden alt alta iniyor; orada sağdaki kart üç
                                kanal sütununu taşıyamayacak kadar daralıyor. */}
                            <div className="c11-body">
                              <div className="c11-brief">
                                {brief(c).map((b) => {
                                  const Icon = b.i;
                                  return (
                                    <motion.div key={b.k} className="c11-bit" variants={itemV}>
                                      <span className="c11-bic" aria-hidden="true">
                                        <Icon size={17} strokeWidth={1.9} />
                                      </span>
                                      <div>
                                        <p className="c11-blabel">{b.k}</p>
                                        {/* Veride zaten liste olan şey ekranda
                                            da liste: dört kısa nesne saymak bir
                                            cümle okumaktan hafif. */}
                                        <ul className="c11-chips">
                                          {b.items.map((t) => (
                                            <li key={t}>{t}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>

                              {/* Paranın üç kanalı tek beyaz kartta. Panelin
                                  zemini gri (--paper); kartı beyaz yapmak hem
                                  marka işaretlerine kendi doğal zeminini
                                  veriyor (BrandGlyph plakasız, çünkü zemin
                                  zaten beyaz) hem de panelin odağını işaret
                                  eden tek yüzey oluyor. */}
                              <div className="c11-money">
                                {money(c).map((g) => {
                                  const Icon = g.i;
                                  return (
                                    <motion.div key={g.title} className="c11-mg" variants={itemV}>
                                      <p className="c11-mgt">
                                        <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                                        {g.title}
                                      </p>
                                      {/* Grubun kendi açıklaması veriden
                                          geliyor. "Banka değil; farklı lisans"
                                          uyarısı bu yüzden ayrı bir dipnot
                                          bloğu istemiyor — üç grubun üç
                                          açıklaması yan yana zaten farkı
                                          anlatıyor. */}
                                      <p className="c11-mgh">{g.hint}</p>
                                      {g.items.length ? (
                                        <ul className="c11-list">
                                          {g.items.map((ch) => (
                                            <Channel key={ch.name} ch={ch} />
                                          ))}
                                        </ul>
                                      ) : (
                                        /* Bugün hiçbir ülkede bu duruma
                                           düşülmüyor; veri değişirse grup boş
                                           bir başlık olarak kalmasın diye
                                           duruyor. */
                                        <p className="c11-empty">Bu ülkede sunulmuyor</p>
                                      )}
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Dürüst kısıt en sonda ve gizlenmiyor. Amber kutu
                                yok: uyarıyı üçgen taşıyor, metin siyah kalıyor.
                                Üç ülkede üç renkli kutu, uyarı olmaktan çıkıp
                                desen olurdu. */}
                            <motion.p className="c11-limit" variants={itemV}>
                              <TriangleAlert size={15} strokeWidth={2.1} aria-hidden="true" />
                              <span>
                                <b>Dürüst kısıt</b>
                                {" — "}
                                {FACTS[c].limit}
                              </span>
                            </motion.p>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Alt satır C7'den birebir: not tıkın arkasında ne olduğunu söylüyor,
              bağlantı bölümün tek çıkışı. */}
          <div className="c11-foot">
            <p className="c11-note">
              Ülkeye tıklayın: yapı, banka, tahsilat kanalları ve o ülkenin dürüst
              kısıtı yerinde açılır.
            </p>
            <SmartLink href="/ulkeler" className="link-arrow c11-exit">
              Üç ülkeyi yan yana kıyaslayın
              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
