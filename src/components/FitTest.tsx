"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Briefcase,
  Building2,
  CalendarClock,
  Check,
  CircleHelp,
  Code,
  CreditCard,
  Fingerprint,
  Globe,
  Handshake,
  IdCard,
  Landmark,
  Laptop,
  Layers,
  MapPin,
  NotebookPen,
  Package,
  PanelsTopLeft,
  Pencil,
  Plane,
  Receipt,
  RotateCcw,
  Scale,
  SlidersHorizontal,
  Stamp,
  Store,
  UserRound,
  UserRoundX,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import SmartLink from "@/components/shared/SmartLink";
import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import {
  FIT_COUNTRIES,
  FIT_ERKEN_ESIK,
  FIT_ERKEN_UCUZ,
  FIT_KAZANC_ORAN,
  FIT_PARTS,
  FIT_PART_INDEXES,
  FIT_QUESTIONS,
  FIT_TOTAL,
  FIT_ZERO,
  emptyFitAnswers,
  fitAnswerEffect,
  fitBarPay,
  fitBlurb,
  fitPartOf,
  fitSpread,
  fitTotals,
  scoreFit,
  type FitIcon,
  type FitPartId,
} from "@/lib/fitTest";
import { gtm } from "@/lib/gtm";
import { useOrtacStore } from "@/lib/store";

/* ============================================================================
   UYGUNLUK TESTİ
   Sorular, bölümler ve ağırlıklar: src/lib/fitTest.ts (SWAP:FIT_WEIGHTS orada)
   CSS: src/app/css/fittest.css · ad alanı .uyg-

   ---------------------------------------------------------------------------
   BU DOSYADA İÇERİK KARARI YOK

   Soru metni, seçenek, ipucu ve puan burada değil. Sonuçtaki ülke cümlesi de
   burada değil — countryContent.intro ve FACTS.limit'ten geliyor (bkz.
   fitTest.ts · fitBlurb). Bu dosya yalnızca akışı yürütüyor.

   ---------------------------------------------------------------------------
   BU TURDA NE OLDU · DÖRDÜNCÜ PERDE, NEGATİF PUAN, DÖRDÜNCÜ SONUÇ

   Müşteri puanlamayı açıkça değiştirdi ve üç şey geldi. İçerik kararlarının
   tamamı fitTest.ts'te; burada yalnızca ekrandaki karşılıkları:

   1. PERDE SAYISI DÖRT OLDU, SORU SAYISI ON BİR. Ekranda "/ 3" yazan tek yer
      künye satırıydı ve artık FIT_PARTS.length okuyor; "dokuz cevap
      değerlendirildi" de FIT_TOTAL'den basılıyor. Elle yazılmış perde ya da
      soru sayısı bu dosyada kalmadı.
   2. ÇUBUKLAR İKİ YÖNLÜ. Negatif puan girince `puan / FIT_CEIL` kırılıyordu.
      Hem defterdeki panel hem sonuç tablosu artık aynı fonksiyondan besleniyor
      (fitBarPay) ve rayın içinde sabit bir sıfır çizgisi var. Sonuç tablosunun
      paydası da değişti: eskiden `r.max` idi, yani birincinin çubuğu hep tam
      doluydu ve negatifle birlikte ters işaret üretiyordu.
   3. DÖRDÜNCÜ SONUÇ EKRANI. "Henüz erken" hâli; kararların tamamı aşağıda,
      DÖRDÜNCÜ SONUÇ başlığında.

   Bu turda kapanan İKİ ÖLÇÜLMÜŞ KUSUR (ikisi de bu dosyanın kendi eskisinden):
     · Sonuç tablosundaki F2. Defterdeki tablo bir tur önce subgrid'e alınmıştı
       ama sonuç tablosu eski kalıptaydı: her satır kendi ızgarası, ad sütunu
       auto, çubuk rayı ondan artan. Tam beraberlikte eşit puanlar farklı
       uzunlukta çiziliyordu. Ölçüm ve çözüm fittest.css · puan tablosu.
     · Dökümdeki eksi pullar. Süzgeç `> 0` olduğu için negatif ağırlıklar
       tabloda HİÇ görünmüyordu ve ekran onlara "puan yok" diyordu.

   ---------------------------------------------------------------------------
   ÖNCEKİ TUR · ANKETİN DOLDURULMA BİÇİMİ DEĞİŞTİ, RAPOR DEĞİŞMEDİ

   /lab/anket turunda MELEZ adayı beğenildi ve canlıya alındı. Taşınan şey
   ANKETİN DOLDURULMA BİÇİMİ: soru sütunu + gece "cevap defteri". Sonuç
   ekranına TEK SATIR dokunulmadı — MELEZ bir demoydu ve sonuç ekranı bilerek
   kısaltılmıştı; olduğu gibi taşımak çalışan bir özelliği kaybettirirdi.

   ÜÇ PARÇA DEĞİŞTİ:
   1) SOL RAY GİTTİ, YERİNE CEVAP DEFTERİ GELDİ (.uyg-book). Aynı işi yapıyor
      — dört perde, on bir sorunun haritası, geçilmiş soruya tek tıkla dönüş —
      ama listeyi ekrana yaymak yerine sıkıştırıyor: yalnızca içinde
      bulunulan perde kalemlerini tam metinle basıyor, kapanan perdeler tek
      satıra inip cevaplarını kendi ikon diskleriyle taşıyor.
   2) PUAN PANELİ DEFTERİN İÇİNE GİRDİ (.uyg-sum). Ayrı bir kutu değil,
      defterin dibinde: üç ülke, sabit paydalı çubuklar, seviye cümlesi,
      "bu cevap puan getirdi mi" satırı ve sıralama uyarısı. Beşi de eski
      .ft-sig panelinden geliyor, hiçbiri düşmedi.
   3) SORU BÜYÜDÜ. Eski sürümde soru cümlesi sabit 16 px ve soru bölgesi
      ekranın %20,56'sıydı; şimdi clamp(21px, 2.5vw, 30px).

   FİLİGRAN YOK. Lab adaylarında sorunun ikonu 120–132 px soluk bir filigran
   olarak sahnenin arkasına basılıyordu; müşteri istemedi ("hafif opaklığı
   kısık olan icondan bahsediyorum ona gerek yok"), üç ekrandan da kaldırıldı.
   Sorunun ikonu duruyor: başlıktaki 54 px'lik disk.

   AD ALANI .ft- DEĞİL .uyg-. Önceki canlı sürüm bir tur boyunca yedek olarak
   /lab/anket'te duruyordu (.ftv1-) ve iki sürüm aynı adları paylaşsaydı biri
   ötekini sessizce ezerdi; .uyg- deponun tamamında boştu (grep ile doğrulandı).
   O TUR KAPANDI VE SİLİNDİ: müşteri "uygunluk anketini komple silebilirsin, o
   artık onaylı, sadece içeriksel değişiklikler olur gerekirse" dedi. Yedek
   artık yalnız git'te: `git show 0abb849:src/components/lab/AnketYedek.tsx`
   ve `0abb849:src/app/css/lab-ftv1.css`. Eski tasarıma dönmek gerekirse
   başlangıç noktası orası.

   ---------------------------------------------------------------------------
   HAREKET — motion/react BU DOSYADA YOK

   · useReducedMotion bu depoda YASAK, beş ayrı kalıpta hidrasyon hatası
     çıkardı. Bütün hareket CSS'te ve `prefers-reduced-motion` kapısı orada.
   · Adım geçişi keyed bir düğümün yeniden takılmasıyla oluyor (React zaten
     söküp takıyor, CSS animasyonu kendiliğinden baştan oynuyor).

   `reduce` altında testin TAMAMI çalışıyor: hiçbir düğüm koşullu değil.

   ---------------------------------------------------------------------------
   KORUNAN KALIPLAR

   · AÇILIR MENÜ YOK. Seçenek görünen kutucuk, altında yerli
     <input type="radio">. Ok tuşlarıyla gezinme ve ekran okuyucu duyurusu
     tarayıcıdan geliyor.
   · OTOMATİK GEÇİŞ YOK. Seçim ekranda kalıyor, ilerlemek ayrı bir düğme.
   · aria-live SABİT BİR DÜĞÜMDE ve adım kabının DIŞINDA: her adımda söküp
     takılan bir canlı bölge hiçbir şey duyurmaz. Ayrı bir düğüm KURULMUYOR,
     zaten ekranda olan künye satırı (.uyg-head) canlı bölge.
   · gtm olayları ve yükleri aynen duruyor: fit_test_start · fit_test_complete.

   ---------------------------------------------------------------------------
   ODAK YÖNETİMİ

   Adım değişince odak yeni sorunun radyo grubuna gidiyor (seçiliye, yoksa
   ilkine); sonuç ekranında sonuç başlığına. Sayfa ilk açıldığında odak
   ÇALINMIYOR — ilk mount'ta `focusOnMount` false geliyor.
   ========================================================================= */

/* ================================================================= İKONLAR = */
/* Anahtar → lucide bileşeni. Anahtarın KENDİSİ fitTest.ts'te, sorunun yanında;
   burada yalnızca hangi anahtarın hangi glifi çağırdığı var. Ayrım kasıtlı:
   "bu soru bir yer soruyor" bir içerik kararı, "yer = MapPin" bir çizim kararı.

   strokeWidth 1.9 site geneliyle aynı. Boyut üç yerde üç farklı: soru
   başlığında 30, şık diskinde 22, defterde 13–18; hepsi kendi kabının
   ölçüsüyle dengelendi.

   lucide-react 1.26 çocuksuz ve a11y prop'suz her ikona aria-hidden="true"
   basıyor (Icon.mjs · hasA11yProp), yani süs ikonlar erişilebilirlik ağacına
   ZATEN çıkmıyor. Yine de kaplarına ayrıca aria-hidden yazıldı: bu depoda
   "görsel olarak gizli düğüm ağaçta yok" varsayımı üç kez tutmadı. */
const FIT_ICONS: Record<FitIcon, LucideIcon> = {
  pin: MapPin,
  layers: Layers,
  receipt: Receipt,
  panels: PanelsTopLeft,
  landmark: Landmark,
  plane: Plane,
  wallet: Wallet,
  calendar: CalendarClock,
  stamp: Stamp,
  code: Code,
  package: Package,
  handshake: Handshake,
  help: CircleHelp,
  card: CreditCard,
  cash: Banknote,
  store: Store,
  user: UserRound,
  userx: UserRoundX,
  users: UsersRound,
  building: Building2,
  id: IdCard,
  finger: Fingerprint,
  laptop: Laptop,
  briefcase: Briefcase,
  globe: Globe,
  sliders: SlidersHorizontal,
};

/* Şıkkın ikonu yoksa kutuya ne konacak — KASITLI olarak ikon değil HARF.
   Gerekçe fitTest.ts · İKON ANAHTARI kural 2: ikonsuz şıklar (bütçe bandı,
   takvim bandı) birbirinden yalnızca DERECE ile ayrılıyor, oraya glif
   uydurmak üç kutuya üç rastgele resim dağıtmak olurdu. Harf süs değil ve
   anlam uydurmuyor; ayrıca "A şıkkı" demenin ekrandaki karşılığı. */
const FIT_HARF = ["A", "B", "C", "D", "E"] as const;

/* Dört cümle, dört hâl. Hiçbiri ülke adı geçirmiyor; hepsi "kalan sorular bu
   farkı çevirebilir mi" sorusunun cevabı (hesabı fitTest.ts · fitSpread). */
const FIT_LEVELS = [
  "Cevaplarınız üç ülkeyi henüz ayırmadı.",
  "Ayrım çok dar: kalan sorular sıralamayı rahatça çevirebilir.",
  "Ayrım belirginleşti ama kalan sorular hâlâ çevirebilir.",
  "Kalan sorular bu ayrımı artık çeviremiyor.",
] as const;

/* "Bu cevap ne yaptı" satırının dört hâli. BU TURDA ÜÇTEN DÖRDE ÇIKTI: negatif
   puanla birlikte "puan getirdi" ile "bir ülkeyi geriye itti" ayrı iki olay ve
   ikisini aynı cümleyle geçiştirmek, negatif puanı görünmez kılardı. Hesabı
   fitTest.ts · fitAnswerEffect. */
const FIT_PTS_LINE: Record<string, string> = {
  cevapsiz: "Bu soru henüz cevaplanmadı.",
  notr: "Bu cevap puan getirmedi: üç ülkeyi birbirinden ayırmıyor.",
  arti: "Bu cevap puanları değiştirdi.",
  eksi: "Bu cevap bir ülkeye puan yazdırdı, birine de eksi: sitede o profilde uygun olmadığı yazılı.",
};

const pad = (n: number) => String(n).padStart(2, "0");

/* Ekrandaki para biçimi. Intl KULLANILMIYOR (fitTest.ts'teki `bin` ile aynı
   gerekçe: sunucu ile tarayıcının ICU'su ayrışırsa metin hidrasyonda değişir). */
const bin = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ============================================================ SORU EKRANI == */

function Ask({
  index,
  answer,
  onPick,
  focusOnMount,
}: {
  index: number;
  answer: number | null;
  onPick: (oi: number) => void;
  focusOnMount: boolean;
}) {
  const q = FIT_QUESTIONS[index];
  const box = useRef<HTMLFieldSetElement>(null);

  useEffect(() => {
    if (!focusOnMount) return;
    const group = box.current;
    if (!group) return;
    /* Seçili radyo varsa ona, yoksa ilkine. */
    const target =
      group.querySelector<HTMLInputElement>("input:checked") ??
      group.querySelector<HTMLInputElement>("input");
    target?.focus({ preventScroll: true });
    /* focusOnMount mount anında sabit; bağımlılık listesi bilerek boş. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const QIcon = FIT_ICONS[q.icon];

  return (
    /* role="group" + aria-label ÖLÇÜMLE GELDİ: <fieldset> + <legend> bu
       tarayıcıda ağaçta ADLI BİR GRUP üretmiyor, legend adsız bir `generic`
       olarak duruyor. Üç varyant aynı oturumda tek tek denendi:
         yalnız <legend>            → grup düğümü YOK
         aria-label (rolsüz)        → `generic "…"`, hâlâ grup değil
         role="group" + aria-label  → `group "Müşterileriniz…"`  ✓
       <legend> DURUYOR: görünen başlık o ve explicit role verildiğinde adı
       aria-label taşıyor, yani iki ad çakışmıyor, aynı cümle. */
    <fieldset className="uyg-fs" ref={box} role="group" aria-label={q.q}>
      <legend className="uyg-q">
        <span className="uyg-q-i" aria-hidden="true">
          <QIcon size={30} strokeWidth={1.9} />
        </span>
        <span className="uyg-q-t">{q.q}</span>
      </legend>
      {q.help ? <p className="uyg-help">{q.help}</p> : null}

      <div className="uyg-opts">
        {q.options.map((o, oi) => {
          const OIcon = o.icon ? FIT_ICONS[o.icon] : null;
          return (
            /* --uyg-o: kutuların sırayla girmesi için gecikme çarpanı. Süre
               CSS'te, burada yalnızca sıra numarası var. */
            <label
              key={o.id}
              className="uyg-opt"
              data-on={answer === oi ? "" : undefined}
              style={{ "--uyg-o": oi } as React.CSSProperties}
            >
              {/* aria-label AÇIKÇA veriliyor. Etiketsiz radyolar bu depoda
                  ağaçta "on" diye okunuyordu; üstelik <label>'ın metnini
                  toplayan örtük ad, kutuya ikon girince gliflerin başlığını
                  da içine alma riski taşıyor. İpucu adın sonunda çünkü
                  görünen metinle başlaması gerekiyor (label in name). */}
              <input
                type="radio"
                name={`fit-${q.id}`}
                value={o.id}
                checked={answer === oi}
                onChange={() => onPick(oi)}
                aria-label={o.hint ? `${o.label}. ${o.hint}` : o.label}
              />
              <span className="uyg-opt-d" aria-hidden="true">
                {OIcon ? <OIcon size={22} strokeWidth={1.9} /> : FIT_HARF[oi]}
              </span>
              <span className="uyg-opt-b">
                <span className="uyg-opt-t">{o.label}</span>
                {o.hint ? <span className="uyg-opt-h">{o.hint}</span> : null}
              </span>
              <span className="uyg-opt-m" aria-hidden="true">
                <Check size={15} strokeWidth={2.8} />
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ========================================================= CEVAP DEFTERİ == */
/* Gece panel. Eski sürümün SOL RAYI ile PUAN PANELİ burada birleşti; ikisi de
   silinmedi, yer değiştirdi. Beş şey taşıyor:
     1. PERDELER  → dört bölüm adıyla + on bir sorunun haritası (eski .ft-side)
     2. kalemler  → verilmiş cevaplar, tek tıkla dönüşle       (eski .ft-jump)
     3. toplam    → üç ülkenin puanı, sabit paydalı çubuklarla (eski .ft-tally)
     4. seviye    → kalan sorular sıralamayı çevirebilir mi    (eski .ft-sig-line)
     5. iki not   → "bu cevap puan getirdi mi" + sıralama uyarısı
                                            (eski .ft-sig-pts / .ft-sig-note)

   PERDE DURUMU (şimdi/bitti/sıradaki) yalnızca renkle anlatılmıyor: aynı şeyi
   soru sütunundaki künye satırı YAZIYOR ("Erişim · Bölüm 2 / 3") ve o satır
   canlı bölge, yani her adımda duyuruluyor.

   AÇIK PERDE. Defter yalnızca İÇİNDE BULUNULAN PERDENİN kalemlerini tam
   metinle basıyor — en çok üç kalem. Kapanan perdeler tek satıra iniyor ve
   cevapları O SATIRDA, kendi ikon diskleriyle duruyor. Sebebi ölçüm: on bir
   kalem 348 px.lik sütuna sığmıyor, Q9'da 329 px kayıt ekrandan düşüyordu.
   CEVAP KAYBOLMUYOR, SIKIŞIYOR: kapanan perdedeki disk cevabın kendi glifi,
   tıklanabilir ve tam metni aria-label'ında.

   BİLEŞENİN BOYUNU SORU SÜTUNU BELİRLER, CEVAP DEFTERİ ASLA. Kilit CSS'te
   (mutlak konum), gerekçesi fittest.css · DEFTER YÜKSEKLİK KİLİDİ. */
function Defter({
  answers,
  answered,
  step,
  herePart,
  furthest,
  seenResult,
  onGoTo,
}: {
  answers: (number | null)[];
  answered: number;
  step: number;
  herePart: FitPartId;
  furthest: number;
  seenResult: boolean;
  onGoTo: (i: number) => void;
}) {
  /* SIRALANMIYOR: fitTotals FIT_COUNTRIES sırasında dönüyor ve o sıra ekranda
     aynen duruyor. Sıralasaydı her cevapta satırlar yer değiştirir ve göz
     yarım kalmış bir sıralamayı sonuç sanardı; sıralamanın yeri sonuç ekranı. */
  const totals = fitTotals(answers);
  /* Aktarım zincirinin ikinci durağı: EN SON İŞLENEN kalem. Perde açıkken o
     kalemin diski, perde kapalıyken aynı cevabın kapanmış perdedeki diski
     taşıyor — zincir perde değişince kopmuyor. */
  const lastAnswered = answers.reduce<number>((m, a, i) => (a !== null ? i : m), -1);

  const spread = fitSpread(answers);
  const full = answered >= FIT_TOTAL;
  const level = full ? 3 : spread.level;
  const line = full
    ? `${FIT_TOTAL} cevabın hepsi girildi. Sonucu görebilirsiniz.`
    : FIT_LEVELS[level];
  /* Ekrandaki sorunun cevabı ne yaptı. Otuz üç şıkkın yedisi sıfır ağırlıklı ve
     on biri en az bir eksi taşıyor, yani bu cümle gerçekten dört hâl arasında
     geziniyor. */
  const eff = fitAnswerEffect(step, answers[step]);

  return (
    /* .akt kabı: enerji perdeden kaleme, kalemden ayraca, ayraçtan toplama
       geçiyor. Cümlesi "bulunduğunuz bölüm → verdiğiniz cevap → toplam".
       Değerler CSS'te, mekanizma css/aktarim.css'te. Fare panelin üstüne
       gelince tur duruyor (kalıbın kendi davranışı). */
    <aside className="uyg-book akt" aria-label="Cevap defteri">
      <p className="uyg-book-h">
        <span className="uyg-book-i" aria-hidden="true">
          <NotebookPen size={16} strokeWidth={1.9} />
        </span>
        Cevap defteri
        <span className="uyg-book-n">
          {answered} / {FIT_TOTAL}
        </span>
      </p>

      <div className="uyg-log-wrap">
        <ol className="uyg-perdeler">
          {FIT_PARTS.map((p) => {
            const idx = FIT_PART_INDEXES[p.id];
            const allDone = idx.every((i) => answers[i] !== null);
            const PIcon = FIT_ICONS[p.icon];
            const open = herePart === p.id;
            /* Kalemler CEVAPLANMA SIRASINDA değil SORU SIRASINDA duruyor:
               cevaplanma sırası daha "canlı" görünürdü ama bir cevabı
               düzeltince satır yerinden zıplardı. Defterin kalemi oynamaz. */
            const rows = open ? idx.filter((qi) => answers[qi] !== null) : [];
            return (
              <li
                key={p.id}
                className="uyg-perde"
                data-state={allDone ? "done" : open ? "now" : "todo"}
                data-open={open ? "" : undefined}
              >
                <p className="uyg-perde-h">
                  <span className={open ? "uyg-perde-i akt-durak" : "uyg-perde-i"} aria-hidden="true">
                    <PIcon size={15} strokeWidth={1.9} />
                  </span>
                  <span className="uyg-perde-t">{p.title}</span>
                  {open ? (
                    /* Açık perdede sağdaki işaretler İLERLEME: cevapların
                       kendisi hemen altta tam metinle duruyor, disk tekrarı
                       olurdu. Kapalı perdede tam tersi (aşağıda). */
                    <span className="uyg-perde-pips" aria-hidden="true">
                      {idx.map((qi) => (
                        <span
                          key={qi}
                          className="uyg-pip"
                          data-state={answers[qi] !== null ? "done" : qi === step ? "now" : "todo"}
                        />
                      ))}
                    </span>
                  ) : (
                    /* KAPALI PERDENİN KAYDI. Cevaplanmamış soru boş halka;
                       şekil aynı kalsın diye nokta değil halka. */
                    <span className="uyg-perde-marks">
                      {idx.map((qi) => {
                        const a = answers[qi];
                        if (a === null)
                          return <span key={qi} className="uyg-mk" aria-hidden="true" />;
                        const mq = FIT_QUESTIONS[qi];
                        const o = mq.options[a];
                        const OIcon = o.icon ? FIT_ICONS[o.icon] : null;
                        return (
                          <button
                            key={qi}
                            type="button"
                            className={qi === lastAnswered ? "uyg-mk akt-durak" : "uyg-mk"}
                            data-on=""
                            disabled={!(qi <= furthest || seenResult)}
                            /* Ad AÇIKÇA veriliyor. Düğmenin tek görünen içeriği
                               bir glif ve lucide ikonları <title> basmıyor,
                               yani aria-label olmadan bu düğme ağaçta adsız
                               kalırdı — kalemde de aynı gerekçeyle var. */
                            aria-label={`${mq.short}. Cevabınız: ${o.label}. Bu soruya dön.`}
                            onClick={() => onGoTo(qi)}
                          >
                            {OIcon ? <OIcon size={13} strokeWidth={1.9} /> : FIT_HARF[a]}
                          </button>
                        );
                      })}
                    </span>
                  )}
                </p>

                {rows.length > 0 && (
                  <ol className="uyg-log">
                    {rows.map((qi) => {
                      const eq = FIT_QUESTIONS[qi];
                      const a = answers[qi] as number;
                      const o = eq.options[a];
                      const OIcon = o.icon ? FIT_ICONS[o.icon] : null;
                      /* Sonuç bir kez görüldüyse kalemlerin hepsi
                         tıklanabilir; öncesinde yalnız görülmüş sorular.
                         İleri atlamak, cevaplanmamış sorularla sonuca varmanın
                         kestirme yolu olurdu. */
                      const reachable = qi <= furthest || seenResult;
                      return (
                        <li key={eq.id}>
                          <button
                            type="button"
                            className="uyg-entry"
                            data-now={qi === step ? "" : undefined}
                            disabled={!reachable}
                            aria-current={qi === step ? "step" : undefined}
                            aria-label={`${eq.short}. Cevabınız: ${o.label}. Bu soruya dön.`}
                            onClick={() => onGoTo(qi)}
                          >
                            <span
                              className={
                                qi === lastAnswered ? "uyg-entry-d akt-durak" : "uyg-entry-d"
                              }
                              aria-hidden="true"
                            >
                              {OIcon ? <OIcon size={18} strokeWidth={1.9} /> : FIT_HARF[a]}
                            </span>
                            <span className="uyg-entry-b">
                              <span className="uyg-entry-t">{eq.short}</span>
                              <span className="uyg-entry-a">{o.label}</span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </li>
            );
          })}
        </ol>

        {/* Yalnız hiç cevap yokken: panelin ne işe yaradığını bir kez söylüyor,
            ilk cevapla birlikte kalkıyor ve yerini kalemlere bırakıyor. */}
        {answered === 0 && <p className="uyg-empty">İlk cevabınız buraya işlenecek.</p>}
      </div>

      {/* AYRAÇ: enerji geçişinin üçüncü durağı; kalemleri toplamdan ayırıyor. */}
      <span className="uyg-rule akt-durak" aria-hidden="true" />

      {/* ------------------------------------------------------------- TOPLAM
          Eski .ft-sig panelinin tamamı burada. Erişilebilirlik: ANLAM TAŞIYAN
          her şey ekranda yazılı metin. Çubuklar, kademeler ve bayrak diskleri
          süs, hepsi aria-hidden; ülke adları, puanlar ve cümleler gerçek
          metin. role="meter" eski sürümde denendi ve atıldı: ARIA'da meter
          "presentational children" rollerinden biri, içine konan metin
          erişilebilirlik ağacına çıkmıyor. */}
      <div className="uyg-sum">
        <p className="uyg-sum-h">Toplam</p>
        {/* IZGARA SATIRDA DEĞİL LİSTEDE (subgrid). Ölçülmüş bir kusuru
            kapatıyor: satır kendi ızgarası olunca ad sütunu satırdan satıra
            farklı genişlikte oturuyor ve 1fr'lik çubuk rayı ondan artanı
            alıyordu; tam beraberlikte Dubai'nin çubuğu İngiltere'ninkinden
            15,5 px uzun çıkıyordu. EŞİT PUAN EŞİT PİKSEL. */}
        <ul className="uyg-sum-list">
          {totals.map((t, i) => (
            <li key={t.country} className="uyg-sum-row" data-zero={t.pts === 0 ? "" : undefined}>
              {/* TUZAK H — <Flag> çıplak <svg viewBox="0 0 60 40"> basıyor,
                  width/height YOK; kapsız bırakılırsa 300×150'ye şişiyor ve bu
                  depoda iki sayfayı bozdu. Kap sabit px + overflow hidden. */}
              <span
                className="uyg-sum-f akt-durak"
                aria-hidden="true"
                style={{ "--akt-i": 3 + i * 0.18 } as React.CSSProperties}
              >
                <Flag country={t.country} />
              </span>
              <span className="uyg-sum-n">{COUNTRY_NAMES[t.country]}</span>
              {/* İKİ YÖNLÜ ÇUBUK · bu turda geldi, negatif puan yüzünden.
                  Ray SABİT ölçekli (FIT_SPAN) ve içinde sabit bir sıfır çizgisi
                  var; artı sağa, eksi sola doluyor. Payda "o anki en yüksek
                  puan" DEĞİL: ölçülmüştü, değişken paydayla aynı 1 puanlık fark
                  testin başında 249,8 px, sonunda 55,5 px görünüyor ve bir
                  çubuk puanı hiç değişmeden geri gidebiliyordu.
                  Sıfırda kırpmak da elendi: −1 ile −6 aynı görünürdü. */}
              <span
                className="uyg-sum-bar"
                aria-hidden="true"
                style={{ "--uyg-zero": FIT_ZERO } as React.CSSProperties}
              >
                <span className="uyg-sum-zero" />
                <span
                  className="uyg-sum-fill"
                  data-neg={t.pts < 0 ? "" : undefined}
                  style={{ "--uyg-w": Math.abs(fitBarPay(t.pts)) } as React.CSSProperties}
                />
              </span>
              {/* Puan GERÇEK METİN: çubuk aria-hidden, bilgi buradan okunuyor.
                  Eksi işareti U+2212, kısa çizgi değil: ekran okuyucu "eksi üç"
                  diyor, "üç" değil. */}
              <span className="uyg-sum-p">
                {t.pts < 0 ? `−${Math.abs(t.pts)}` : t.pts} puan
              </span>
            </li>
          ))}
        </ul>

        {/* Eski .ft-sig-pts. Cümle aria-live DEĞİL: sayfada zaten bir canlı
            bölge var (.uyg-head) ve her cevapta ikinci bir duyuru, soruyu
            okumaya çalışan kişinin üstüne konuşurdu. */}
        <p className="uyg-sum-pts">{FIT_PTS_LINE[eff]}</p>

        {/* SEVİYE · tablonun dürüst karşı ağırlığı: tablo "kim kaç puan"
            diyor, bu satır "kalan sorular bunu hâlâ çevirebilir mi" diyor.
            Kademe sayısı üç, çünkü seviye 0 "hiç ayrım yok" demek ve o hâlde
            hiçbir kademe yanmıyor. */}
        <div className="uyg-sig">
          <div className="uyg-sig-steps" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="uyg-sig-step" data-on={i < level ? "" : undefined} />
            ))}
          </div>
          <p className="uyg-sig-line">{line}</p>
        </div>

        {/* Eski .ft-sig-note, iki cümleye indi (348 px'lik gece sütunda üç
            cümle beş satır ediyor ve defteri soru sütununun tabanının üstüne
            çıkarıyordu). ÜÇ BİLGİNİN ÜÇÜ DE DURUYOR: (1) sıra bir sıralama
            değil, (2) üç çubuk aynı ölçekte, (3) baştaki lider sonda çoğu
            zaman değişiyor (ölçüm: ilk cevaplardaki lider nihai birinciyi
            %48,7 tutturuyor). */}
        <p className="uyg-sum-note">
          Satırlar sıralanmıyor, üç çubuk aynı ölçekte ve çizginin solu eksi puan. İlk
          cevaplarda öne geçen ülke sonda çoğu zaman değişiyor; kesin sıralama sonuç
          ekranında.
        </p>
      </div>
    </aside>
  );
}

/* ==================================================== DÖRDÜNCÜ SONUÇ ======
   "HENÜZ ERKEN, TÜRKİYE'DE KALIN." Müşterinin sözü: "kazanç konusunda gerçekten
   çok düşükse ... direkt testin sonunda dürüst bir şekilde 'sen henüz hazır
   değilsin türkiyede kal' diyebiliriz, samimi bir tavsiye tonunda."

   BU EKRAN NE YAPMIYOR, ÖNCE ONU YAZALIM:
     · Ülke önermiyor. Üç ülkenin hiçbiri "öne çıkan" diye işaretlenmiyor,
       birinci satırın mavi vurgusu ve parıltısı kapalı (data-quiet).
     · "Kurulumu başlat" demiyor. O düğme bu ekranda doğrudan çelişki olurdu:
       ekran "kurmayın" derken birincil eylem "kurun" olamaz. Birincil çıkış
       BİLGİ (/ulkeler), ikincil çıkış SORU (/iletisim).
     · setCountry ÇAĞIRMIYOR ve fit_test_start GÖNDERMİYOR. Mağazada bir ülke
       seçili bırakmak, ziyaretçi hiç seçmemişken /basla sayfasını o ülkeyle
       açardı.

   NE YAPIYOR:
     · Sebebi SAYIYLA söylüyor: en ucuz yapının ilk yıl toplamı ve bunun
       bandın üst ucuna oranı. İki sayı da hesaptan geliyor (fitTest.ts ·
       KAZANÇ EŞİKLERİ), ekranda elle yazılmış rakam yok.
     · Sıralamayı GİZLEMİYOR. Diğer on cevap gerçek bir sıralama üretti ve onu
       saklamak, ziyaretçiyi cezalandırmak gibi okunurdu. Tablo duruyor ama
       "eşiği geçtiğinizde" diye çerçeveleniyor.
     · Dökümü ve tek tıkla dönüşü koruyor: bu sonucu hangi cevabın doğurduğu
       görülebilir ve tek tıkla değiştirilebilir olmalı.

   TON. "Hazır değilsin" değil "bu iş henüz bunu kaldırmıyor": özne kişi değil
   hesap. Ve kapanış cümlesi bir ret değil bir randevu: ne değişirse geri gelin.

   ========================================================== SONUÇ EKRANI ==
   Ülke önerilen hâl. Yapısı ÖNCEKİ TURDAN DEĞİŞMEDİ (sıralama tablosu, ilk iki
   ülkenin kartları, cevap dökümü, üç çıkış, yasal not); bu turda değişen iki
   şey var ve ikisi de negatif puan yüzünden: çubuklar iki yönlü, döküm pulları
   eksi puanı da basıyor. */

function Result({
  answers,
  onGoTo,
  onRestart,
  focusOnMount,
}: {
  answers: (number | null)[];
  onGoTo: (qi: number) => void;
  onRestart: () => void;
  focusOnMount: boolean;
}) {
  const head = useRef<HTMLHeadingElement>(null);
  const setCountry = useOrtacStore((s) => s.setCountry);
  const r = scoreFit(answers);
  const top = fitBlurb(r.top);
  const second = fitBlurb(r.runnerUp);

  useEffect(() => {
    if (focusOnMount) head.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Farkın cümlesi. Üç hâl ayrı ayrı yazıldı çünkü tek şablona sıkıştırmak
     Türkçeyi bozuyor ve — daha önemlisi — "0 puan geride" diye bir şey yok. */
  let gapLine: React.ReactNode;
  if (r.tieCount === 3) {
    /* Üçlü beraberlik gerçekten çıkıyor (bkz. fitTest.ts · tieCount). Bu hâlde
       "şu ülke öne çıkıyor" demek doğrudan yanlış olur. */
    gapLine = (
      <>
        <b>Üç ülke de tam eşit puanda.</b> Bu cevaplarla test hiçbirini öne çıkaramıyor;
        yukarıdaki sıralamayı listenin kendi yazım sırası belirledi. Karar için üçünü yan
        yana görmek gerekiyor.
      </>
    );
  } else if (r.tie) {
    gapLine = (
      <>
        <b>{COUNTRY_NAMES[r.runnerUp]}</b> ile tam eşit puandalar. Bu cevaplarla test
        ikisini birbirinden ayıramıyor; sıralamayı listenin kendi yazım sırası belirledi.
      </>
    );
  } else if (r.flippable) {
    /* "Fark küçük" demiyoruz, farkın NE KADAR dar olduğunu söylüyoruz — ve bunu
       bir eşikten değil hesaptan alıyoruz. Eşik koymak yanlış olurdu: bu
       ağırlıklarla sıranın tek bir cevapla döndüğü durumlar 1 puanlık farkta da
       7 puanlık farkta da çıkıyor, yani "küçük" sayının kendisiyle ölçülemiyor. */
    gapLine = (
      <>
        <b>{COUNTRY_NAMES[r.runnerUp]}</b> {r.gap} puan geride: fark, tek bir cevabınızı
        değiştirseniz sıranın döneceği kadar dar.
      </>
    );
  } else {
    gapLine = (
      <>
        <b>{COUNTRY_NAMES[r.runnerUp]}</b> {r.gap} puan geride. Cevaplarınız içinde tek bir
        değişiklik bu sırayı çevirmiyor.
      </>
    );
  }

  return (
    <div className="uyg-res" data-quiet={r.early ? "" : undefined}>
      {/* Başlık da beraberliği yutmuyor: eşitken "şu öne çıkıyor" demek,
          altındaki cümlenin hemen geri aldığı bir hüküm kurmak olurdu.
          ERKEN HÂLİNDE hiçbir ülke adı geçmiyor: bu ekranın cümlesi bir ülke
          değil bir zamanlama. */}
      <h2 className="uyg-verdict" ref={head} tabIndex={-1}>
        {r.early ? (
          <>
            Bu ölçekte şirket kurmak <span className="uyg-verdict-em">henüz erken</span>{" "}
            görünüyor.
          </>
        ) : r.tieCount === 3 ? (
          <>
            Verdiğiniz cevaplar <span className="uyg-verdict-em">üçünü de eşit</span> puanda
            bırakıyor.
          </>
        ) : r.tie ? (
          <>
            Verdiğiniz cevaplara göre{" "}
            <span className="uyg-verdict-em">{COUNTRY_NAMES[r.top]}</span> ile{" "}
            <span className="uyg-verdict-em">{COUNTRY_NAMES[r.runnerUp]}</span> başa baş.
          </>
        ) : (
          <>
            Verdiğiniz cevaplara göre{" "}
            <span className="uyg-verdict-em">{COUNTRY_NAMES[r.top]}</span> öne çıkıyor.
          </>
        )}
      </h2>

      {r.early ? <Erken /> : <p className="uyg-gap">{gapLine}</p>}

      {/* --------------------------------------------------- puan tablosu
          Çubuklar sırayla doluyor: --uyg-w hedef oran, --uyg-o sıra numarası.
          Süre ve gecikme CSS'te; buradaki iki sayı yalnızca veri.
          ERKEN HÂLİNDE tablo DURUYOR ama başına bir çerçeve cümlesi geliyor ve
          birinci satırın vurgusu kapanıyor (.uyg-res[data-quiet]). */}
      {r.early && (
        <p className="uyg-quiet-h">
          Diğer cevaplarınız yine de bir sıralama üretti. Eşiği geçtiğinizde şöyle
          görünüyor:
        </p>
      )}
      <ol className="uyg-list">
        {r.standings.map((s, i) => (
          <li key={s.country} className="uyg-item" data-top={i === 0 ? "" : undefined}>
            <span className="uyg-item-no" aria-hidden="true">
              {i + 1}
            </span>
            <span className="uyg-item-flag" aria-hidden="true">
              <Flag country={s.country} />
            </span>
            <span className="uyg-item-name">{COUNTRY_NAMES[s.country]}</span>
            {/* ÖLÇEK DEFTERDEKİYLE AYNI OLDU. Eskiden payda `r.max` idi, yani
                birincinin çubuğu hep tamamen doluydu; negatif puan girince o
                payda kırılıyor (r.max negatifse oran ters işaretli çıkıyor ve
                scaleX çubuğu aynalıyor). Artık iki ekran da fitBarPay'i
                çağırıyor: aynı puan iki ekranda aynı uzunlukta ve eksi
                gerçekten sola doluyor. */}
            <span
              className="uyg-item-bar"
              aria-hidden="true"
              style={{ "--uyg-zero": FIT_ZERO } as React.CSSProperties}
            >
              <span className="uyg-item-zero" />
              <span
                className="uyg-item-fill"
                data-neg={s.pts < 0 ? "" : undefined}
                style={
                  { "--uyg-w": Math.abs(fitBarPay(s.pts)), "--uyg-o": i } as React.CSSProperties
                }
              />
            </span>
            <span className="uyg-item-pts">
              {s.pts < 0 ? `−${Math.abs(s.pts)}` : s.pts} puan
            </span>
          </li>
        ))}
      </ol>

      {/* ------------------------------------------------ ilk iki, yan yana
          Üçüncü ülke bilerek yok: iki seçeneği karşılaştırmak karar, üçünü
          karşılaştırmak araştırma — ve onun yeri /ulkeler.
          ERKEN HÂLİNDE BU BLOK HİÇ BASILMIYOR: "Öne çıkan" rozetli bir kart,
          başlıkta kurulan "henüz erken" cümlesini bir satır sonra geri alırdı.
          Yerine `Erken` bileşenindeki "ne değişirse geri gelin" listesi var. */}
      {!r.early && (
        <div className="uyg-pair">
          {[
            { c: r.top, b: top, role: "Öne çıkan" },
            { c: r.runnerUp, b: second, role: "İkinci sıra" },
          ].map((x) => (
            <div key={x.c} className="uyg-card" data-top={x.c === r.top ? "" : undefined}>
              <div className="uyg-card-top">
                <span className="uyg-card-flag" aria-hidden="true">
                  <Flag country={x.c} />
                </span>
                <b className="uyg-card-name">{COUNTRY_NAMES[x.c]}</b>
                <span className="uyg-card-role">{x.role}</span>
              </div>
              <p className="uyg-card-line">{x.b.intro}</p>
              <p className="uyg-card-limit">{x.b.limit}</p>
            </div>
          ))}
        </div>
      )}

      {/* ----------------------------------------------------- cevap dökümü
          Sonucun neye dayandığı gizli kalmasın: cevapların hepsi yazılı, her
          satır kendi sorusuna geri götürüyor ve o cevabın hangi ülkeye kaç
          puan verdiği yanında duruyor. Puanı gösteren bir ekranın girdisini
          saklaması, puanı bir hükme çeviriyor.
          ERKEN HÂLİNDE BU BLOK ÖZELLİKLE ÖNEMLİ: sonucu doğuran kazanç cevabı
          burada, tam metniyle ve tek tıkla değiştirilebilir hâlde duruyor. */}
      <div className="uyg-recap">
        <p className="uyg-recap-h">Bu sonuç şu {FIT_TOTAL} cevaptan çıktı:</p>
        <ol>
          {FIT_QUESTIONS.map((q, qi) => {
            const a = answers[qi];
            const w = a === null ? undefined : q.options[a].weights;
            /* Puan vermeyen cevabın pulu da yazılıyor ("puan yok"): boş
               bırakmak, o cevabın atlandığı izlenimi veriyordu.
               EKSİ PULLAR BU TURDA GELDİ. Süzgeç `> 0` iken negatif ağırlıklar
               dökümde HİÇ GÖRÜNMÜYORDU: ekran "puan yok" der, oysa o cevap bir
               ülkeyi geriye itmiş olurdu. Puanı gösteren bir ekranın eksiyi
               saklaması, tam da bu bölümün kapatmak için var olduğu şey. */
            const chips = w
              ? FIT_COUNTRIES.filter((c) => (w[c] ?? 0) !== 0).map((c) => ({
                  c,
                  n: w[c] as number,
                }))
              : [];
            return (
              <li key={q.id}>
                <button
                  type="button"
                  className="uyg-recap-b"
                  onClick={() => onGoTo(qi)}
                  aria-label={`${q.short}: ${a === null ? "cevaplanmadı" : q.options[a].label}. Bu soruya dön ve cevabı değiştir.`}
                >
                  <span className="uyg-recap-q">
                    {qi + 1}. {q.q}
                  </span>
                  <span className="uyg-recap-a">{a === null ? "—" : q.options[a].label}</span>
                  <span className="uyg-recap-w" aria-hidden="true">
                    {chips.length === 0 ? (
                      <i className="uyg-recap-nil">puan yok</i>
                    ) : (
                      chips.map((ch) => (
                        <i
                          key={ch.c}
                          className="uyg-recap-chip"
                          data-neg={ch.n < 0 ? "" : undefined}
                        >
                          {COUNTRY_NAMES[ch.c]} {ch.n < 0 ? `−${Math.abs(ch.n)}` : `+${ch.n}`}
                        </i>
                      ))
                    )}
                  </span>
                  <span className="uyg-recap-x" aria-hidden="true">
                    <Pencil size={13} strokeWidth={2.2} />
                    Değiştir
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ÇIKIŞLAR · ERKEN HÂLİNDE BİRİNCİL DÜĞME DEĞİŞİYOR.
          "Kurulumu başlat" bu ekranda doğrudan çelişki: başlık "henüz erken"
          derken birincil eylem "kurun" olamaz. Sıra da değişiyor: önce BİLGİ
          (üç ülkeyi yan yana görmek bir taahhüt değil), sonra SORU. */}
      <div className="uyg-acts">
        {r.early ? (
          <>
            <SmartLink href="/ulkeler" className="btn btn-solid">
              <Scale size={15} strokeWidth={2.1} />
              Üçünü yan yana görün
            </SmartLink>
            <SmartLink href="/iletisim" className="btn btn-line">
              Durumunuzu yazın
              <ArrowRight size={15} strokeWidth={2.1} />
            </SmartLink>
          </>
        ) : (
          <>
            <SmartLink
              href={`/basla?ulke=${r.top}`}
              className="btn btn-solid"
              onClick={() => {
                /* Mağazadaki ülke de güncelleniyor (eski davranış korundu):
                   /basla sayfası URL parametresini okuyor ama hero ve
                   hesaplayıcı aynı dilimden besleniyor, ikisi ayrışmasın. */
                setCountry(r.top);
                gtm("fit_test_start", { country: r.top });
              }}
            >
              {COUNTRY_NAMES[r.top]} ile konuşalım
              <ArrowRight size={15} strokeWidth={2.1} />
            </SmartLink>
            <SmartLink href="/ulkeler" className="btn btn-line">
              <Scale size={15} strokeWidth={2.1} />
              Üçünü yan yana görün
            </SmartLink>
          </>
        )}
        <button type="button" className="uyg-reset" onClick={onRestart}>
          <RotateCcw size={14} strokeWidth={2.1} />
          Baştan
        </button>
      </div>

      <p className="uyg-disc">
        Bu bir kısa liste aracı: sonucu {FIT_TOTAL} cevabın puanlanması üretiyor, mali veya
        hukuki tavsiye değil. Puanlama sizi bir ülkeye yönlendirmek için değil, konuşmayı
        kısaltmak için var: hangi yapının işinize yaradığı faaliyetinize, mukimliğinize ve
        gelir türünüze bağlı ve teyit gerektiriyor.
      </p>
    </div>
  );
}

/* ============================================== "HENÜZ ERKEN" GÖVDESİ ======
   Kararların tamamı DÖRDÜNCÜ SONUÇ bloğunda; burada yalnızca metin ve iki sayı
   var. İki sayı da hesaptan geliyor:
     FIT_ERKEN_ESIK   bandın üst ucu (ilk yıl maliyeti × oran, bine yuvarlı)
     FIT_ERKEN_UCUZ   üç ülkenin en ucuzu ve onun ilk yıl toplamı
   Oran da yazılı, çünkü "onda biri" cümlesinin dayanağı o. */
function Erken() {
  const ucuz = FIT_ERKEN_UCUZ;
  const pay = Math.round((ucuz.yil1 / FIT_ERKEN_ESIK) * 100);

  return (
    <div className="uyg-erken">
      <p className="uyg-erken-lead">
        Bu ölçekte doğru cevap şu an Türkiye&apos;de kalmak. Sebebini gizlemiyoruz, sayıyla
        yazıyoruz.
      </p>

      {/* Tek paragraflık hesap. Rakamlar ekranda ama hiçbiri elle yazılmadı;
          eşik değişirse cümle de kendiliğinden değişiyor. */}
      <p className="uyg-erken-hesap">
        Üçünün en ucuzu {COUNTRY_NAMES[ucuz.country]}: kuruluş ve ilk yılın muhasebesiyle
        birlikte <b>{bin(ucuz.yil1)} USD</b>. Yılda {bin(FIT_ERKEN_ESIK)} USD&apos;nin
        altında net kazanan bir işte bu, kazancın <b>en az yüzde {pay}</b> kadarı ve gelir
        düştükçe oran büyüyor. Bir yapının yıllık maliyeti kazancın{" "}
        <b>1/{FIT_KAZANC_ORAN}</b> sınırını geçtiğinde o yapı işin en büyük sabit gideri
        hâline geliyor, üstelik karşılığında otomatik bir vergi avantajı da gelmiyor:
        Ltd&apos;nin kârı İngiltere&apos;de kurumlar vergisine tabi.
      </p>

      {/* Ret değil randevu: hangi eşik geçilince bu ekran değişir. */}
      <p className="uyg-erken-h">Şunlardan biri değiştiğinde bu test yeniden anlamlı:</p>
      <ul className="uyg-erken-liste">
        <li>
          Yıllık net kazanç {bin(FIT_ERKEN_ESIK)} USD&apos;yi geçtiğinde. O noktada en ucuz
          yapının maliyeti 1/{FIT_KAZANC_ORAN} sınırının altına iniyor.
        </li>
        <li>
          Kart tahsilatı, global platform satışı ya da oturum vizesi gerçekten gerektiğinde.
          Üçü de yapının kendisiyle ilgili ve üçünde de ülkeler birbirinden ayrışıyor.
        </li>
        <li>
          Müşterileriniz ağırlıklı olarak yurt dışına kaydığında. Bugün öyleyse cevabı
          aşağıdan değiştirip sonuca yeniden bakabilirsiniz.
        </li>
      </ul>

      <p className="uyg-erken-not">
        Bu bir ret değil: eşik tek bir orandan çıkıyor ve kuruluş maliyetleri
        güncellendikçe kendiliğinden değişiyor. Sorunuz varsa bugünkü ölçeğinizle de
        yazabilirsiniz.
      </p>
    </div>
  );
}

/* ================================================================= AKIŞ === */

export default function FitTest() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(emptyFitAnswers);
  /* Sonuç bir kez görüldüyse geri dönen kişi soruları yeniden tıklamasın:
     birincil düğme "Sonuca dön" olup doğrudan sonuca atlıyor. */
  const [seenResult, setSeenResult] = useState(false);
  /* Defterdeki gezinme yalnızca GÖRÜLMÜŞ sorulara açık: ileriye atlamak,
     cevaplanmamış sorularla sonuca varmanın kestirme yolu olurdu. */
  const [furthest, setFurthest] = useState(0);

  const done = step >= FIT_TOTAL;
  const answered = answers.filter((a) => a !== null).length;
  const picked = !done && answers[step] !== null;
  const here = fitPartOf(done ? FIT_TOTAL - 1 : step);

  /* Sayfa açılışında odak ÇALINMIYOR, sonraki her adımda çalınıyor.
     "Başladı" zaten mevcut durumun içinde yazılı: adım ilerlediyse, bir cevap
     verildiyse ya da sonuç görüldüyse ziyaretçi bu bileşenle etkileşmiş
     demektir. Ref yok, effect yok, bayat değer yok (effect'te yazılan ref
     yeniden render tetiklemiyor, bir sonraki render'a kadar bayat kalıyor). */
  const started = step > 0 || answered > 0 || seenResult;

  const pick = (oi: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = oi;
      return next;
    });
  };

  const goTo = (at: number) => {
    setStep(at);
    setFurthest((f) => Math.max(f, Math.min(at, FIT_TOTAL - 1)));
    if (at >= FIT_TOTAL && !seenResult) {
      setSeenResult(true);
      const r = scoreFit(answers);
      /* OLAY ADI VE MEVCUT DÖRT ALAN DEĞİŞMEDİ (GTM sözleşmesi). Bu turda tek
         alan EKLENDİ: `verdict`. `top` bozulmadı çünkü onu "henüz erken" diye
         işaretlemek, alanı ülke bekleyen her raporda kırardı; yeni alan eski
         raporları etkilemeden yeni hâli ayırt ediyor. */
      gtm("fit_test_complete", {
        answers: answers.join(","),
        top: r.top,
        runner_up: r.runnerUp,
        gap: r.gap,
        verdict: r.early ? "erken" : "ulke",
      });
    }
  };

  const restart = () => {
    setAnswers(emptyFitAnswers());
    setSeenResult(false);
    setFurthest(0);
    setStep(0);
  };

  const nextLabel = seenResult
    ? "Sonuca dön"
    : step === FIT_TOTAL - 1
      ? "Sonucu gör"
      : "Sonraki soru";

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="uyg-app">
          {/* data-done: sonuç ekranında cevap defteri kapanıyor ve rapor
              bütün genişliği alıyor. Anketin katlanıp yerini raporun alması,
              "bitti" demenin düzenle söylenmiş hâli — eski sürümde sol ray
              aynı şeyi yapıyordu.
              DEFTER SONUÇTA NEDEN DURMUYOR: raporun kendi cevap dökümü
              (.uyg-recap) bütün cevapları tam metniyle, puan pullarıyla ve tek
              tıkla dönüşle zaten basıyor. Defteri yanında bırakmak aynı
              kaydı iki kez göstermek olurdu; döküm defterin üstüne çıkıyor,
              altına değil. */}
          <div className="uyg-grid" data-done={done ? "" : undefined}>
            <div className="uyg-ask">
              {/* aria-live SABİT ve adım kabının DIŞINDA: içeriği değil
                  kendisi söküldüğü anda hiçbir duyuru olmazdı. Ayrı bir
                  duyuru düğümü kurulmuyor, ekranda zaten olan künye satırı
                  canlı bölge. */}
              <div className="uyg-head" aria-live="polite">
                {/* Perde sayısı ELLE YAZILMIYOR. Bir tur önce burada "/ 3"
                    yazıyordu ve dördüncü perde eklenince sessizce yalan
                    söyleyecekti; sayı artık FIT_PARTS'tan geliyor. Aynısı
                    sayaçta da geçerli: "dokuz cevap" yerine FIT_TOTAL. */}
                <p className="uyg-where">
                  {done ? "Sonuç" : here.part.title}
                  <span className="uyg-where-s">
                    {done
                      ? `${FIT_TOTAL} cevap değerlendirildi`
                      : `Bölüm ${here.order + 1} / ${FIT_PARTS.length}`}
                  </span>
                </p>
                {/* Sonuçta sayaç dolu duruyor ("09 / 9"), kaybolmuyor: eski
                    sürümün HUD'ı da orada "%100 tamamlandı" yazıyordu. Kalın
                    rakam iki hâlde de aynı yerde, yani satır zıplamıyor. */}
                <p className="uyg-count">
                  <b>{done ? pad(FIT_TOTAL) : pad(step + 1)}</b> / {FIT_TOTAL}
                </p>
              </div>

              {/* İlerleme: saç teli çizgi. Yüzde AYRICA yazılmıyor; sayaç
                  zaten "05 / 9" diyor ve iki sayı aynı şeyi söylerdi. */}
              <div
                className="uyg-line"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={FIT_TOTAL}
                aria-valuenow={answered}
                aria-label="Cevaplanan soru sayısı"
              >
                <span
                  className="uyg-line-run"
                  style={{ "--uyg-w": answered / FIT_TOTAL } as React.CSSProperties}
                />
              </div>

              {/* key: adım değişince düğüm yeniden takılıyor ve CSS giriş
                  animasyonu kendiliğinden baştan oynuyor. */}
              {done ? (
                <Result
                  key="res"
                  answers={answers}
                  onGoTo={goTo}
                  onRestart={restart}
                  focusOnMount={started}
                />
              ) : (
                <Ask
                  key={`q-${step}`}
                  index={step}
                  answer={answers[step]}
                  onPick={pick}
                  focusOnMount={started}
                />
              )}

              {/* Gezinme sonuç ekranında yok: oradaki çıkışlar Result'ın kendi
                  eylem satırında (devam et · karşılaştır · baştan). */}
              {!done && (
                <div className="uyg-foot">
                  <button
                    type="button"
                    className="uyg-back"
                    onClick={() => goTo(step - 1)}
                    disabled={step === 0}
                  >
                    <ArrowLeft size={15} strokeWidth={2.1} />
                    Önceki
                  </button>

                  {answered > 0 && (
                    <button type="button" className="uyg-reset" onClick={restart}>
                      <RotateCcw size={14} strokeWidth={2.1} />
                      Baştan
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-solid btn-sm uyg-go"
                    onClick={() => goTo(seenResult ? FIT_TOTAL : step + 1)}
                    disabled={!picked}
                  >
                    {nextLabel}
                    <ArrowRight size={15} strokeWidth={2.1} />
                  </button>
                </div>
              )}
            </div>

            {!done && (
              <Defter
                answers={answers}
                answered={answered}
                step={step}
                herePart={here.part.id}
                furthest={furthest}
                seenResult={seenResult}
                onGoTo={goTo}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
