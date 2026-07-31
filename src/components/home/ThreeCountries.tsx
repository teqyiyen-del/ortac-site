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
   §3 — ÜLKE KARARI · "yay + yerinde açılan panel"

   NEREDEN GELDİ

   Bu bölüm /lab/ulkeler'de yarışan on iki adaydan C11'in canlıya alınmış hâli.
   Önceki canlı sürüm (uk2-) üç fotoğraflı sütun + "yan yana kıyas" tablosu
   ikilisiydi; müşteri C11'i seçti. Aday dosyası src/components/lab/CountriesC11.tsx
   olduğu yerde duruyor ve /lab/ulkeler'de yayında kalıyor — canlıya taşınan
   kopya odur, kesilip alınmış hâli değil. İki dosya bu yüzden birbirine ÇOK
   benziyor ve bu bilerek: aday sayfası "müşteriye ne gösterdik"in kaydı,
   burası ise onun üç düzeltmeyle canlıya girmiş hâli. Aşağıda o üç düzeltme
   tek tek işaretli.

   CSS AD ALANI — uk3-
   Aday lab-c11.css'te c11- önekiyle yaşıyor ve orada YAŞAMAYA DEVAM EDİYOR.
   Aynı sınıf adlarını buraya kopyalasaydık iki dosya aynı seçicileri tanımlar,
   ikisi de globals.css'e import edildiği için sonuncusu kazanır ve canlıda
   yapılan bir düzeltme sessizce /lab/ulkeler'deki adayı da değiştirirdi —
   yani karşılaştırma kaydı bozulurdu. Bu dosyanın CSS'i src/app/css/countries.css
   ve öneki uk3-: bölümün üçüncü kuşağı (uk- → uk2- → uk3-).

   ESKİ uk2- BLOĞU
   globals.css'teki .uk2-* kuralları artık bu dosyadan çağrılmıyor. Silinmediler
   çünkü globals.css bu turda kilitli; ölü CSS olarak duruyorlar. Bir gün
   temizlenirlerse DİKKAT: o bloğun içinde bir :root var ve --red-600 /
   --red-100 / --green-300 / --red-300 orada tanımlı. Bu dosya --red-600
   kullanıyor (çalışmayan kanalın çarpısı); token'lar silinirse çarpı renksiz
   kalır.

   ÇAPALAR — ikisi de zorunlu
   · id="ulkeler"        — lib/routes.ts HOME_ANCHORS'ta canlı, /#ulkeler oraya iner.
   · id="odeme-altyapisi" — aynı listede canlı; FinalCta (yayındaki
     /sektorler/yazilim-ve-teknoloji sayfasında duruyor) ve footer oraya
     bağlanıyor. Aday C11'de bu çapayı taşıyan blok YOKTU, çünkü lab sayfasında
     kimse oraya bağlanmıyor. Canlıya alırken eski bölümün iki dipnotu (ödeme
     kuruluşu ≠ banka, onay taahhüdü yok) çapasıyla birlikte devralındı: çapa
     "ödeme altyapısı" diyor ve bu iki cümle tam olarak o. Dipnotları atıp
     çapayı başka bir bloğa iliştirmek, /#odeme-altyapisi'ni konusuyla
     ilgisiz bir yere indirmek olurdu.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------- geometri --- */
/* Yayın şeridi BAND kadar yüksek, SVG'nin viewBox yüksekliği de aynı sayı ve
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

/* ---------------------------------------------------------------- DÜZELTME 2
   SIRA ARTIK COĞRAFİ DEĞİL — İngiltere · Dubai · KKTC.

   Adayda sıra boylamdan hesaplanıyordu: bir LNG haritası (İngiltere -0,13 ·
   KKTC 33,38 · Dubai 55,27) ve onu küçükten büyüğe sıralayan bir satır. Çıkan
   dizi İngiltere → KKTC → Dubai idi, yani soldan sağa okunan şey batıdan
   doğuya bir harita şeridiydi.

   Müşteri Dubai'yi ORTAYA, KKTC'yi SAĞA istedi. Bu istek coğrafyayı bozuyor ve
   bozması sorun değil: bu bölüm bir harita değil, bir menü. Dubai firmanın
   ana ürünü — üç ülke içinde sayfası elden geçirilmiş tek ülke o (bkz.
   lib/routes.ts, /dubai açık; /ingiltere ve /kktc kapalı) ve üç sütunlu bir
   dizide gözün ilk gittiği yer orta sütun. Yani sıra artık coğrafi değil
   editoryal: ortada olan, en çok anlatmak istediğimiz.

   Boylam haritası da sıralama satırı da SİLİNDİ, saklanmadı. Yorumda durup
   kullanılmayan bir sabit, bir sonraki kişiye "burada bir yerde coğrafi sıra
   hâlâ var" dedirtir.

   YAYIN KENDİSİ NE OLDU
   Yay boylamdan hiç beslenmiyordu: eğri simetrik bir kubbe (M0 → Q orta →
   1000) ve diskler sütun merkezlerine (1/6, 1/2, 5/6) oturuyor. Yani
   geometride düzeltilecek bir hesap yoktu; düzeltilecek olan ANLAMDI. Eski
   okumada simetrik kubbe sessizce "KKTC yolun ortası" diyordu ve bu coğrafi
   bir iddiaydı. Yeni sırada kubbe hiçbir coğrafi iddia taşımıyor; tepe noktası
   yalnızca orta sütunu işaretliyor — ve orta sütun artık Dubai. Yani müşterinin
   isteği ile yayın en yüksek noktası aynı yere düşüyor: orta disk yanındakilerden
   19 piksel yukarıda duruyor ve öne çıkan ülke olan Dubai o tepeye oturuyor.
   Sıra ile çizim tutarlı; kimse "neden ortadaki daha yukarıda" diye sormuyor.

   Adaydaki sr-only satır ("Ülkeler batıdan doğuya sıralı: İngiltere, KKTC,
   Dubai") de kalktı — artık doğru değil ve yerine yenisi yazılmadı: editoryal
   bir sıranın açıklanacak bir kuralı yok, üç adı ekran okuyucuya iki kez
   saydırmak yalnızca gürültü olurdu. Düğmeler adları zaten okuyor. */
const ORDER: CountrySlug[] = ["ingiltere", "dubai", "kktc"];

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
/* KAPALI HÂL. Maliyet sırası FACTS.from'dan türüyor, elle yazılmıyor; rakam yok
   çünkü bu bölümün sözleşmesi "tutar fiyat bölümünde".

   Sıralama COUNTRY_ORDER üzerinden, ORDER üzerinden DEĞİL: burada hesaplanan
   şey ekrandaki dizilim değil, üç ülkenin fiyat sıralaması. Ekran sırası
   editoryal bir tercih ve değişebilir; hangi ülkenin daha ucuz olduğu veriden
   çıkan bir olgu. İkisini aynı diziye bağlamak, bir gün sıra değiştiğinde
   "en düşük maliyet" etiketini yanlış ülkeye yapıştırırdı. */
const COST_WORD = ["en düşük", "orta", "en yüksek"];
const COST_RANK = [...COUNTRY_ORDER].sort((a, b) => FACTS[a].from - FACTS[b].from);
const costWord = (c: CountrySlug) => COST_WORD[COST_RANK.indexOf(c)] ?? "—";

type Feat = { i: LucideIcon; t: string };

/* Ülke başına tam iki satır. Kurallar: üçünde de doğru olan bir şey yazılmaz,
   taahhüt yok, tek satır, ülkenin ÖNDE olduğu eksen seçilir. */
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
   forWhom virgülle, structure orta noktayla. Ayırıcı listesi tek yerde çünkü
   iki alan iki farklı işaret kullanıyor ve ileride biri değişirse (ör.
   structure'a virgül girerse) bölme kuralının tek satırda düzelmesi gerekiyor.
   filter(Boolean) sondaki olası boş parçayı atıyor — veri elle yazılıyor,
   "Limited · " gibi bir satır bir gün girebilir. */
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
    <li className="uk3-ch" data-v={ch.on ? "yes" : "no"}>
      {ch.brand ? (
        <BrandGlyph brand={ch.brand} size={16} />
      ) : (
        /* Resmî işareti olmayan ve markası da olmayan tek kalem "Yerel banka".
           Soyut bir madde imi yerine ne olduğunu söyleyen ikon: bu bir banka.
           Grup başlığıyla aynı ikon olması tekrar değil, aynı şeyin iki
           ölçeği — satır grubun bir örneği. */
        <Landmark className="bm-g" size={16} strokeWidth={1.8} aria-hidden="true" />
      )}
      <span className="uk3-ch-n">{ch.name}</span>
      {/* Durum ikonu tek başına bilgi taşımıyor: ekran okuyucu için kelime de
          yazılı. Renk yalnızca hızlandırıyor. */}
      {ch.on ? (
        <Check className="uk3-ch-s" size={15} strokeWidth={2.6} aria-hidden="true" />
      ) : (
        <X className="uk3-ch-s" size={15} strokeWidth={2.6} aria-hidden="true" />
      )}
      <span className="sr-only">{ch.on ? "çalışıyor" : "desteklenmiyor"}</span>
    </li>
  );
}

export default function ThreeCountries() {
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
    /* Zemin beyaz ve bu yapısal bir zorunluluk, tercih değil: açılan panelin
       kendi zemini --paper, içindeki para kartı --white ve disklerin halkası
       yine --white. Bölüm --paper olsaydı panel zeminle aynı renge düşer,
       halkalar da gri üstünde beyaz bir daire olarak görünürdü. Önceki canlı
       sürüm --paper idi; bu bölüm ile altındaki "Verdiğimiz hizmetler" (o da
       beyaz) arasındaki gri şerit bu turda kayboluyor. Ayrımı artık renk değil
       yayın kendisi yapıyor: bölüm boş bir beyazlıkla değil, üç diskli bir
       kemerle açılıyor. */
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
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Her ülkenin öne çıktığı iki
              başlık adının altında.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16} className="uk3-wrap">
          {/* BAND tek sayı olarak buradan çıkıyor ve iki yere birden gidiyor:
              yayın SVG yüksekliği ve disklerin oturduğu yuvanın yüksekliği. */}
          <div
            className="uk3-grid"
            style={{ "--uk3-band": `${BAND}px` } as React.CSSProperties}
          >
            <svg
              className="uk3-arc"
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
                /* .uk3-lane masaüstünde display:contents — kutusu yok, iki
                   çocuğu doğrudan ızgaraya giriyor: düğme 1. satıra, panel 2.
                   satıra ve üç sütunu birden kaplayarak. Dar ekranda lane
                   gerçek bir bloğa dönüşüyor ve aynı DOM ülke ülke satırlara
                   iniyor. Tek işaretleme, iki yerleşim. */
                <div key={c} className="uk3-lane">
                  <button
                    type="button"
                    className="uk3-pick"
                    style={{ gridColumn: String(i + 1) }}
                    data-on={on}
                    aria-expanded={on}
                    aria-controls={on ? `uk3-p-${c}` : undefined}
                    onClick={() => setOpen((p) => (p === c ? null : c))}
                  >
                    <span className="uk3-discwrap">
                      <motion.span
                        className="uk3-disc"
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

                    <span className="uk3-name">
                      {COUNTRY_NAME[c]}
                      <ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" />
                    </span>

                    <span className="uk3-feats">
                      {FEATS[c].map((f) => {
                        const Icon = f.i;
                        return (
                          <span key={f.t} className="uk3-feat">
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
                        className="uk3-panel"
                        style={{ gridColumn: "1 / -1" }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}
                      >
                        <div
                          className="uk3-panel-in"
                          id={`uk3-p-${c}`}
                          role="group"
                          aria-label={`${COUNTRY_NAME[c]} detayı`}
                        >
                          {/* Başlık kademeye girmiyor: panelin çapası o ve
                              kayarak gelen bir başlık, açılan kutunun kendisi
                              zaten büyürken, iki ayrı hareket demek. */}
                          <div className="uk3-phead">
                            <span className="uk3-pflag" aria-hidden="true">
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

                          {/* Kademeyi yöneten kap. Ara katmanlar (.uk3-brief,
                              .uk3-money) düz div: motion'ın varyant yayılımı
                              bağlam üzerinden yürüdüğü için aradaki sade
                              elemanlar zinciri kesmiyor ve beş kalem sırayla
                              geliyor — künyenin ikisi, paranın üçü. */}
                          <motion.div variants={listV} initial="hidden" animate="show">
                            {/* Geniş ekranda künye SOLDA dar bir sütun, para
                                kartı sağda: künye sütunu para kartından kısa,
                                yani satırın yüksekliğini zaten kart belirliyor
                                ve künye bedava biniyor. 1024'ün altında yeniden
                                alt alta iniyor; orada sağdaki kart üç kanal
                                sütununu taşıyamayacak kadar daralıyor. */}
                            <div className="uk3-body">
                              <div className="uk3-brief">
                                {brief(c).map((b) => {
                                  const Icon = b.i;
                                  return (
                                    <motion.div key={b.k} className="uk3-bit" variants={itemV}>
                                      <span className="uk3-bic" aria-hidden="true">
                                        <Icon size={17} strokeWidth={1.9} />
                                      </span>
                                      <div>
                                        <p className="uk3-blabel">{b.k}</p>
                                        {/* Veride zaten liste olan şey ekranda
                                            da liste: dört kısa nesne saymak bir
                                            cümle okumaktan hafif. */}
                                        <ul className="uk3-chips">
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
                              <div className="uk3-money">
                                {money(c).map((g) => {
                                  const Icon = g.i;
                                  return (
                                    <motion.div key={g.title} className="uk3-mg" variants={itemV}>
                                      <p className="uk3-mgt">
                                        <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                                        {g.title}
                                      </p>
                                      {/* Grubun kendi açıklaması veriden
                                          geliyor. "Banka değil; farklı lisans"
                                          uyarısı bu yüzden ayrı bir dipnot
                                          bloğu istemiyor — üç grubun üç
                                          açıklaması yan yana zaten farkı
                                          anlatıyor. */}
                                      <p className="uk3-mgh">{g.hint}</p>
                                      {g.items.length ? (
                                        <ul className="uk3-list">
                                          {g.items.map((ch) => (
                                            <Channel key={ch.name} ch={ch} />
                                          ))}
                                        </ul>
                                      ) : (
                                        /* Bugün hiçbir ülkede bu duruma
                                           düşülmüyor; veri değişirse grup boş
                                           bir başlık olarak kalmasın diye
                                           duruyor. */
                                        <p className="uk3-empty">Bu ülkede sunulmuyor</p>
                                      )}
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* ------------------------------------ DÜZELTME 1
                                DÜRÜST KISIT BU BÖLÜMDEN ÇIKTI.

                                Burada, panelin en altında, amber bir üçgen ve
                                "Dürüst kısıt — {FACTS[c].limit}" satırı vardı.
                                Kalkma sebebi müşterinin cümlesi: "ülkelerin
                                hepsine dürüst kısıt yazmışsın, aşırı dikkat
                                çekiyor". Haklı olduğu yer şu — ana sayfa bir
                                menü ve menüde her satırın altına bir uyarı
                                asmak, uyarıyı bilgi olmaktan çıkarıp desene
                                çeviriyor: üç ülke, üç amber üçgen, hiçbiri
                                okunmuyor.

                                NEREYE GİTTİ — SİLİNMEDİ, TAŞINDI DEĞİL, ZATEN
                                ORADA. Bilgi ülke sayfalarında yaşamaya devam
                                ediyor ve tek kaynaktan basılıyor:

                                  src/lib/brand.ts        → FACTS[c].limit (kaynak, DURUYOR)
                                  src/components/shared/PageHero.tsx:431
                                                          → { icon: Info, line: FACTS[country].limit }

                                PageHero her ülke sayfasının (/dubai,
                                /ingiltere, /kktc) hero'sunda güven satırlarını
                                basıyor ve o satırlardan biri tam olarak bu
                                cümle. Yani ziyaretçi kısıtı, o ülkeye karar
                                vermeye başladığı ilk ekranda görüyor — bir
                                menüde üstünkörü değil, ilgilendiği yerde.
                                Ayrıca /ulkeler karşılaştırma sayfasında da
                                kendi satırı var.

                                Bu yüzden FACTS[c].limit alanı brand.ts'ten
                                SİLİNMEDİ ve silinmemeli: burada kullanılmıyor
                                olması onu ölü alan yapmıyor.

                                Bölümün kalan dürüstlük yükü aşağıdaki iki
                                dipnotta (#odeme-altyapisi) ve panelin içindeki
                                çarpılarda: KKTC'de Stripe ve PayPal'ın yanında
                                duran dört kırmızı çarpı, bu sayfanın en keskin
                                "her yerde her şey olmuyor" ifadesi ve o hiçbir
                                yere gitmedi. */}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Alt satır: not tıkın arkasında ne olduğunu söylüyor, bağlantı
              bölümün tek çıkışı. Nottan "ve o ülkenin dürüst kısıtı" ibaresi
              de çıktı — panelde olmayan bir şeyi vaat eden bir not, kalkan
              satırın kendisinden daha kötü. */}
          <div className="uk3-foot">
            <p className="uk3-note">
              Ülkeye tıklayın: yapı, banka ve tahsilat kanalları yerinde açılır.
            </p>
            <SmartLink href="/ulkeler" className="link-arrow uk3-exit">
              Üç ülkeyi yan yana kıyaslayın
              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </div>
        </FadeUp>

        {/* Eski bölümden devralınan iki dipnot ve onların taşıdığı çapa.
            id="odeme-altyapisi" lib/routes.ts'te canlı sayılıyor; FinalCta
            (yayındaki sektör sayfasında duruyor) ve footer oraya bağlanıyor,
            yani bu id kaybolursa çalışan bir bağlantı hiçbir yere inmez.

            İçerik de yerinde duruyor olmayı hak ediyor: ikisi de ülkeye özel
            DEĞİL, üçü için birden geçerli. Müşterinin kaldırttığı şey ülke
            başına tekrarlanan uyarıydı; bölümün sonunda bir kez söylenen ve
            marka duruşunun (STANCE_LIMITS) parçası olan "onay taahhüdü yok"
            cümlesi o tarife girmiyor. Panelde açılıp kapanmıyorlar, bölümün
            altında sabit duruyorlar — yani hiçbir ülkenin yanında görünmüyorlar. */}
        <FadeUp delay={0.3}>
          <div className="uk3-notes" id="odeme-altyapisi">
            <p>
              <b>Ödeme kuruluşu hesabı, banka hesabı değildir.</b>
              Wise ve Payoneer farklı lisansa tabidir.
            </p>
            <p>
              <b>Hesabı banka açar, karar bankanındır.</b>
              Onay taahhüdü vermiyoruz. Dosyayı hazırlar, süreci yürütürüz.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
