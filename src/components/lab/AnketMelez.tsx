"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, NotebookPen, RotateCcw } from "lucide-react";

import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import {
  FIT_CEIL,
  FIT_PARTS,
  FIT_PART_INDEXES,
  FIT_QUESTIONS,
  FIT_TOTAL,
  emptyFitAnswers,
  fitBlurb,
  fitPartOf,
  fitSpread,
  fitTotals,
  scoreFit,
  type FitPartId,
} from "@/lib/fitTest";
import { ANK_HARF, ANK_ICONS } from "@/components/lab/anketIkon";

/* ============================================================================
   ADAY 2 · MELEZ — ad alanı .ank2- · CSS: src/app/css/lab-ank2.css

   Müşterinin isteği: "aday 2 ile şuan live da olanın bi karmasını denesene."
   Aday 2 = DEFTER (bu dosyanın önceki hâli, AnketDefter.tsx; git'te duruyor).

   NEREDEN NE ALINDI
   Canlıdan: üç perde adıyla ekranda ve hangi perdede olduğun · dokuz sorunun
   haritası · seviye cümlesi (kalan sorular sıralamayı çevirebilir mi) ·
   "Sonuca dön" ile sonuç görüldükten sonra serbest gezinme · adım duyurusu
   (aria-live) · "Baştan" çıkışı.
   Defter'den: kayıt TEK bölgede ve yazılmıyor çiziliyor (ikon diski) · yalnız
   işlenmiş kalem basılıyor · soru sütunu büyük punto + filigran · sabit
   paydalı çubuklar ve subgrid tablo (eşit puan eşit piksel) · sayfa uzamıyor.

   Hareketin tamamı CSS'te ve reduce kapısının içinde; bu dosyada tek satır
   hareket kodu yok (useReducedMotion bu depoda hidrasyon hatası çıkarıyor).
   ========================================================================= */

/* Canlıdaki dört cümlenin AYNISI (FitTest.tsx · FIT_LEVELS). Kopyalandı,
   import edilmedi: FitTest.tsx başka bir ajanın elinde olabilir ve oradan içeri
   almak lab adayını canlı bileşenin bugünkü hâline bağlardı (aynı gerekçe
   anketIkon.tsx'te de yazılı). Cümleleri üreten hesap ortak: fitSpread. */
const MLZ_LEVELS = [
  "Cevaplarınız üç ülkeyi henüz ayırmadı.",
  "Ayrım çok dar: kalan sorular sıralamayı rahatça çevirebilir.",
  "Ayrım belirginleşti ama kalan sorular hâlâ çevirebilir.",
  "Kalan sorular bu ayrımı artık çeviremiyor.",
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

export default function AnketMelez() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(emptyFitAnswers);
  /* Görülmüş en uzak soru. İleri atlamak yok (canlının kuralı, aynen korundu):
     cevaplanmamış sorularla sonuca varmanın kestirme yolu olurdu. */
  const [furthest, setFurthest] = useState(0);
  /* CANLIDAN ALINDI. Sonuç bir kez görüldüyse geri dönen kişi soruları
     yeniden tıklamak zorunda kalmıyor: birincil düğme "Sonuca dön" oluyor ve
     defterdeki dokuz kalemin hepsi tıklanabilir hâle geliyor. Melezin
     "güven" tarafının en ucuz parçası: tek durum, tek etiket. */
  const [seenResult, setSeenResult] = useState(false);
  const box = useRef<HTMLFieldSetElement>(null);

  const done = step >= FIT_TOTAL;
  const answered = answers.filter((a) => a !== null).length;
  const here = fitPartOf(done ? FIT_TOTAL - 1 : step);

  /* Odak yalnızca ADIM DEĞİŞİNCE geziniyor, ilk boyamada değil: sayfa bir lab
     sayfası, üç aday alt alta duruyor ve birinin odağı çalması ötekini okumayı
     bozardı. "Başladı" durumdan türetiliyor, ref'ten değil (effect'te yazılan
     ref bir sonraki render'a kadar bayat kalıyor). */
  const started = step > 0 || answered > 0 || seenResult;
  useEffect(() => {
    if (done || !started) return;
    const g = box.current;
    if (!g) return;
    const t =
      g.querySelector<HTMLInputElement>("input:checked") ??
      g.querySelector<HTMLInputElement>("input");
    t?.focus({ preventScroll: true });
    /* started ilk tıklamadan sonra sabit true; bağımlılığı adım. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const goTo = (at: number) => {
    setStep(at);
    setFurthest((f) => Math.max(f, Math.min(at, FIT_TOTAL - 1)));
    if (at >= FIT_TOTAL) setSeenResult(true);
  };

  const pick = (oi: number) =>
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = oi;
      return next;
    });

  const restart = () => {
    setAnswers(emptyFitAnswers());
    setFurthest(0);
    setSeenResult(false);
    setStep(0);
  };

  const q = done ? null : FIT_QUESTIONS[step];
  const QIcon = q ? ANK_ICONS[q.icon] : null;
  const picked = !done && answers[step] !== null;
  const nextLabel = seenResult ? "Sonuca dön" : step === FIT_TOTAL - 1 ? "Sonucu gör" : "Devam";

  return (
    <div className="ank2-app">
      {/* IZGARA: geniş ekranda soru solda, defter sağda. DOM sırası da soru →
          defter, yani odak sırası ile okuma sırası ayrışmıyor. Canlıda ray
          DOM'da ilk sırada ve klavye önce dokuz gezinme düğmesine giriyor. */}
      <div className="ank2-grid">
        <div className="ank2-ask">
          {/* CANLIDAN ALINDI · adım duyurusu. Canlıda bu iş .ft-eyebrow'da
              aria-live ile yapılıyor. Burada ayrı bir düğüm KURULMADI, zaten
              ekranda olan künye satırı canlı bölge yapıldı: kap sabit ve adım
              kabının DIŞINDA (her adımda söküp takılan bir canlı bölge hiçbir
              şey duyurmaz). Ekrana tek bir metin bloğu bile eklemiyor. */}
          <div className="ank2-head" aria-live="polite">
            <p className="ank2-where">
              {here.part.title}
              <span className="ank2-where-s">Bölüm {here.order + 1} / 3</span>
            </p>
            <p className="ank2-count">
              {done ? (
                "Sonuç"
              ) : (
                <>
                  <b>{pad(step + 1)}</b> / {FIT_TOTAL}
                </>
              )}
            </p>
          </div>

          {/* İlerleme: saç teli çizgi. Yüzde AYRICA yazılmıyor (canlıda yazıyor):
              sayaç zaten "05 / 9" diyor ve iki sayı aynı şeyi söylerdi. */}
          <div
            className="ank2-line"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={FIT_TOTAL}
            aria-valuenow={answered}
            aria-label="Cevaplanan soru sayısı"
          >
            <span
              className="ank2-line-run"
              style={{ "--ank2-w": answered / FIT_TOTAL } as React.CSSProperties}
            />
          </div>

          {done ? (
            <MelezSonuc answers={answers} onAgain={restart} />
          ) : (
            /* role="group" + aria-label ÖLÇÜMLE GELDİ: <fieldset> + <legend>
               bu tarayıcıda ağaçta ADLI BİR GRUP üretmiyor, legend adsız bir
               `generic` olarak duruyor. <legend> DURUYOR, görünen başlık o. */
            <fieldset className="ank2-fs" key={q!.id} ref={box} role="group" aria-label={q!.q}>
              <legend className="ank2-q">
                <span className="ank2-q-i" aria-hidden="true">
                  {QIcon ? <QIcon size={30} strokeWidth={1.9} /> : null}
                </span>
                <span className="ank2-q-t">{q!.q}</span>
              </legend>
              {/* FİLİGRAN KALKTI (14 Ağustos). Sorunun ikonu 120 px soluk bir
                  filigran olarak sahnenin arkasına basılıyordu; müşteri her
                  ekrandan kaldırılmasını istedi: "hafif opaklığı kısık olan
                  icondan bahsediyorum ona gerek yok. onu her sayfadan kaldır."
                  Sorunun ikonu duruyor, başlıktaki 54 px'lik diskte. */}
              {q!.help ? <p className="ank2-help">{q!.help}</p> : null}

              <div className="ank2-opts">
                {q!.options.map((o, oi) => {
                  const OIcon = o.icon ? ANK_ICONS[o.icon] : null;
                  return (
                    <label
                      key={o.id}
                      className="ank2-opt"
                      data-on={answers[step] === oi ? "" : undefined}
                      style={{ "--ank2-o": oi } as React.CSSProperties}
                    >
                      {/* AÇILIR KUTU YOK: görünen çip + yerli radio. aria-label
                          açıkça veriliyor; etiketsiz radyo bu depoda "on" diye
                          okunuyordu. Görünen metin adın başında. */}
                      <input
                        type="radio"
                        name={`ank2-${q!.id}`}
                        value={o.id}
                        checked={answers[step] === oi}
                        onChange={() => pick(oi)}
                        aria-label={o.hint ? `${o.label}. ${o.hint}` : o.label}
                      />
                      <span className="ank2-opt-d" aria-hidden="true">
                        {OIcon ? <OIcon size={22} strokeWidth={1.9} /> : ANK_HARF[oi]}
                      </span>
                      <span className="ank2-opt-b">
                        <span className="ank2-opt-t">{o.label}</span>
                        {o.hint ? <span className="ank2-opt-h">{o.hint}</span> : null}
                      </span>
                      <span className="ank2-opt-m" aria-hidden="true">
                        <Check size={15} strokeWidth={2.8} />
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {!done && (
            <div className="ank2-foot">
              <button
                type="button"
                className="ank2-back"
                onClick={() => goTo(step - 1)}
                disabled={step === 0}
              >
                <ArrowLeft size={15} strokeWidth={2.1} />
                Geri
              </button>
              {/* CANLIDAN ALINDI: ilk cevaptan sonra beliren "Baştan". Canlının
                  gezinme satırında var, Defter'de yalnız sonuçta vardı. */}
              {answered > 0 && (
                <button type="button" className="ank2-again ank2-again-nav" onClick={restart}>
                  <RotateCcw size={14} strokeWidth={2.1} />
                  Baştan
                </button>
              )}
              <button
                type="button"
                className="btn btn-solid btn-sm ank2-go"
                onClick={() => goTo(seenResult ? FIT_TOTAL : step + 1)}
                disabled={!picked}
              >
                {nextLabel}
                <ArrowRight size={15} strokeWidth={2.1} />
              </button>
            </div>
          )}
        </div>

        <Defter
          answers={answers}
          answered={answered}
          step={done ? -1 : step}
          /* Sonuçta da bir perde AÇIK kalıyor: `here` zaten sonuçta son soruyu
             (yani "Kısıtlar") gösteriyor ve soru sütunundaki künye satırı da
             orada "Kısıtlar · Bölüm 3 / 3" yazıyor, yani ikisi aynı şeyi
             söylüyor. Üçünü birden kapatmak denendi ve elendi: defter 130 px'e
             düşüyor, kilitli panelde 610 px'lik boyun altında ~300 px boşluk
             kalıyordu. Son perde açık kalınca hem boşluk ~140 px'e iniyor hem
             de anketin bittiği yerdeki üç cevap tam metniyle duruyor. */
          herePart={here.part.id}
          furthest={furthest}
          seenResult={seenResult}
          onGoTo={goTo}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ DEFTER --
   Gece panel, melezin tamamı burada birleşiyor. Dört şey taşıyor:
     1. PERDELER  → üç bölüm adıyla + dokuz sorunun haritası   (CANLIDAN)
     2. kalemler  → verilmiş cevaplar, tek tıkla dönüşle       (DEFTER'den)
     3. toplam    → üç ülkenin puanı, sabit paydalı çubuklarla (ikisinde de var)
     4. seviye    → kalan sorular sıralamayı çevirebilir mi    (CANLIDAN)

   PERDE DURUMU (şimdi/bitti/sıradaki) yalnızca renkle anlatılmıyor: aynı şeyi
   soru sütunundaki künye satırı YAZIYOR ("Erişim · Bölüm 2 / 3") ve o satır
   canlı bölge, yani her adımda duyuruluyor.

   ---------------------------------------------------------------------------
   AÇIK PERDE · BU TURDA GELEN DEĞİŞİKLİK

   Müşteri: "tüm hepsi listelenince çok uzun oluyor … orası uzayınca tüm
   componentin boyu da uzuyor, tasarım saçma bir hal almış oluyor."

   ÖLÇÜM (1400 px, her soruda en uzun etiketli şık işaretlenerek): defter dokuz
   kalemde 443 → 868,8 px'e çıkıyordu ve DÖRDÜNCÜ cevapta soru sütununu geçiyor
   (Q4: soru 497,4 · defter 573,8), oradan sonra bileşenin boyunu artık soru
   değil defter belirliyordu — tam olarak müşterinin tarif ettiği şey.

   KURAL: BİLEŞENİN BOYUNU SORU SÜTUNU BELİRLER, CEVAP DEFTERİ ASLA.
   İki ayaklı çözüm; ikisi de gerekiyor.

   1) YAPISAL KİLİT (CSS · lab-ank2.css). Geniş ekranda defter ızgara satırını
      artık BÜYÜTMÜYOR: mutlak konumla soru sütununun açtığı yüksekliğe
      oturuyor. Yani kural bir tasarım temennisi değil, yerleşimin garantisi.
   2) AÇIK PERDE (bu dosya). Kilit tek başına yetmiyordu: dokuz kalem 348 px'lik
      sütuna sığmayınca içeride kaydırma çubuğu çıkıyor ve dokuz cevabın beşi
      ekrandan düşüyordu (ölçüldü: Q9'da 329 px taşma). Artık defter yalnızca
      İÇİNDE BULUNULAN PERDENİN kalemlerini tam metinle basıyor — en çok üç
      kalem. Kapanan perdeler tek satıra iniyor ve cevapları O SATIRDA, kendi
      ikon diskleriyle duruyor.

   CEVAP KAYBOLMUYOR, SIKIŞIYOR. Bu adayın varlık sebebi ziyaretçinin kendi
   kaydının görünür olmasıydı; kaydı gizleyen bir çözüm adayı SAHNE'ye
   çevirirdi. Kapanan perdedeki disk, cevabın kendi glifi (kalemde kullanılan
   ikonun aynısı), tıklanabilir ve tam metni aria-label'ında taşıyor; o soruya
   dönüldüğünde perde yeniden açılıp cevap tam metne geri dönüyor.

   ELENEN ÜÇÜNCÜ YOL · "daha küçük satırlar" (müşterinin ikinci önerisi).
   Kuruldu ve ölçüldü: disk 34 → 24 px, iç boşluk 8 → 5, cevap metni 12,5 →
   11,5 px. Defter 868,8 → 740 px'e iniyor ama soru sütununu YİNE dördüncü
   cevapta geçiyor (Q4: 497,4'e karşı 509) ve en uzun soru sütununun 105 px
   üstünde bitiyor. Yani satırları küçültmek sorunu ertelemiyor bile; üstelik
   11,5 px'lik cevap metni bu panelin en küçük puntosu olurdu. */
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
  herePart: FitPartId | null;
  furthest: number;
  seenResult: boolean;
  onGoTo: (i: number) => void;
}) {
  const totals = fitTotals(answers);
  /* Aktarım zincirinin ikinci durağı: EN SON İŞLENEN kalem. Perde açıkken o
     kalemin diski, perde kapalıyken aynı cevabın kapanmış perdedeki diski
     taşıyor — zincir perde değiştirince kopmuyor. */
  const lastAnswered = answers.reduce<number>((m, a, i) => (a !== null ? i : m), -1);

  /* Seviye cümlesi canlının hesabıyla: gap / (gap + kalan soruların
     oynatabileceği en büyük fark). Dokuz cevap girildiğinde "kalan sorular"
     diye bir şey yok, o hâl ayrı yazılıyor (canlıda da öyle). */
  const spread = fitSpread(answers);
  const full = answered >= FIT_TOTAL;
  const level = full ? 3 : spread.level;
  const line = full ? "Dokuz cevabın hepsi girildi. Sonucu görebilirsiniz." : MLZ_LEVELS[level];

  return (
    /* .akt kabı: enerji perdeden kaleme, kalemden ayraca, ayraçtan toplama
       geçiyor. Cümlesi "bulunduğunuz bölüm → verdiğiniz cevap → toplam".
       Değerler CSS'te, mekanizma css/aktarim.css'te. */
    <aside className="ank2-book akt" aria-label="Cevap defteri">
      <p className="ank2-book-h">
        <span className="ank2-book-i" aria-hidden="true">
          <NotebookPen size={16} strokeWidth={1.9} />
        </span>
        Cevap defteri
        <span className="ank2-book-n">
          {answered} / {FIT_TOTAL}
        </span>
      </p>

      {/* PERDELER · üç bölüm alt alta, YALNIZ İÇİNDE OLUNAN AÇIK.
          Perde şeridi ile kalem listesi bu turda BİRLEŞTİ; ikisi ayrı dururken
          panel aynı bilgiyi iki kez veriyordu (şeritte "Erişim · 3 nokta",
          listede aynı üç sorunun kalemleri) ve ikisi birden büyüyordu.
          Sonuç ekranında hiçbir perde açık değil: ziyaretçi artık bir bölümün
          içinde değil, defter kapanmış hâlde duruyor ve dokuz cevabın dokuzu
          disk olarak orada. */}
      <div className="ank2-log-wrap">
        <ol className="ank2-acts">
          {FIT_PARTS.map((p) => {
            const idx = FIT_PART_INDEXES[p.id];
            const allDone = idx.every((i) => answers[i] !== null);
            const PIcon = ANK_ICONS[p.icon];
            const open = herePart === p.id;
            /* Kalemler CEVAPLANMA SIRASINDA değil SORU SIRASINDA duruyor:
               cevaplanma sırası daha "canlı" görünürdü ama bir cevabı
               düzeltince satır yerinden zıplardı. Defterin kalemi oynamaz. */
            const rows = open ? idx.filter((qi) => answers[qi] !== null) : [];
            return (
              <li
                key={p.id}
                className="ank2-act"
                data-state={allDone ? "done" : open ? "now" : "todo"}
                data-open={open ? "" : undefined}
              >
                <p className="ank2-act-h">
                  <span className={open ? "ank2-act-i akt-durak" : "ank2-act-i"} aria-hidden="true">
                    <PIcon size={15} strokeWidth={1.9} />
                  </span>
                  <span className="ank2-act-t">{p.title}</span>
                  {open ? (
                    /* Açık perdede sağdaki işaretler İLERLEME: cevapların
                       kendisi hemen altta tam metinle duruyor, disk tekrarı
                       olurdu. Kapalı perdede tam tersi (aşağıda). */
                    <span className="ank2-act-pips" aria-hidden="true">
                      {idx.map((qi) => (
                        <span
                          key={qi}
                          className="ank2-pip"
                          data-state={answers[qi] !== null ? "done" : qi === step ? "now" : "todo"}
                        />
                      ))}
                    </span>
                  ) : (
                    /* KAPALI PERDENİN KAYDI. Cevap silinmiyor, sıkışıyor:
                       her disk o cevabın kendi glifi, tıklanınca sorusuna
                       dönüyor ve tam metni aria-label'da. Cevaplanmamış soru
                       boş halka; şekil aynı kalsın diye nokta değil halka. */
                    <span className="ank2-act-marks">
                      {idx.map((qi) => {
                        const a = answers[qi];
                        if (a === null)
                          return <span key={qi} className="ank2-mk" aria-hidden="true" />;
                        const mq = FIT_QUESTIONS[qi];
                        const o = mq.options[a];
                        const OIcon = o.icon ? ANK_ICONS[o.icon] : null;
                        return (
                          <button
                            key={qi}
                            type="button"
                            className={qi === lastAnswered ? "ank2-mk akt-durak" : "ank2-mk"}
                            data-on=""
                            disabled={!(qi <= furthest || seenResult)}
                            /* Ad AÇIKÇA veriliyor. Düğmenin tek görünen içeriği
                               bir glif ve lucide ikonları <title> basmıyor,
                               yani aria-label olmadan bu düğme ağaçta adsız
                               kalırdı — kalemde de aynı gerekçeyle var. */
                            aria-label={`${mq.short}. Cevabınız: ${o.label}. Bu soruya dön.`}
                            onClick={() => onGoTo(qi)}
                          >
                            {OIcon ? <OIcon size={13} strokeWidth={1.9} /> : ANK_HARF[a]}
                          </button>
                        );
                      })}
                    </span>
                  )}
                </p>

                {rows.length > 0 && (
                  <ol className="ank2-log">
                    {rows.map((qi) => {
                      const eq = FIT_QUESTIONS[qi];
                      const a = answers[qi] as number;
                      const o = eq.options[a];
                      const OIcon = o.icon ? ANK_ICONS[o.icon] : null;
                      /* CANLIDAN: sonuç bir kez görüldüyse dokuz kalemin
                         dokuzu da tıklanabilir. Öncesinde görülmüş sorular. */
                      const reachable = qi <= furthest || seenResult;
                      return (
                        <li key={eq.id}>
                          <button
                            type="button"
                            className="ank2-entry"
                            data-now={qi === step ? "" : undefined}
                            disabled={!reachable}
                            aria-current={qi === step ? "step" : undefined}
                            aria-label={`${eq.short}. Cevabınız: ${o.label}. Bu soruya dön.`}
                            onClick={() => onGoTo(qi)}
                          >
                            <span
                              className={
                                qi === lastAnswered ? "ank2-entry-d akt-durak" : "ank2-entry-d"
                              }
                              aria-hidden="true"
                            >
                              {OIcon ? <OIcon size={18} strokeWidth={1.9} /> : ANK_HARF[a]}
                            </span>
                            <span className="ank2-entry-b">
                              <span className="ank2-entry-t">{eq.short}</span>
                              <span className="ank2-entry-a">{o.label}</span>
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
        {answered === 0 && <p className="ank2-empty">İlk cevabınız buraya işlenecek.</p>}
      </div>

      {/* AYRAÇ: enerji geçişinin üçüncü durağı; kalemleri toplamdan ayırıyor. */}
      <span className="ank2-rule akt-durak" aria-hidden="true" />

      <div className="ank2-sum">
        <p className="ank2-sum-h">Toplam</p>
        {/* IZGARA SATIRDA DEĞİL LİSTEDE (subgrid). Canlıda ölçülmüş kusuru
            kapatıyor: satır kendi ızgarası olunca ad sütunu satırdan satıra
            farklı genişlikte oturuyor ve 1fr'lik çubuk rayı ondan artanı
            alıyordu; tam beraberlikte Dubai'nin çubuğu İngiltere'ninkinden
            15,5 px uzun çıkıyordu. EŞİT PUAN EŞİT PİKSEL. */}
        <ul className="ank2-sum-list">
          {totals.map((t, i) => (
            <li key={t.country} className="ank2-sum-row" data-zero={t.pts === 0 ? "" : undefined}>
              {/* TUZAK H — <Flag> çıplak <svg viewBox="0 0 60 40"> basıyor,
                  width/height YOK; kapsız bırakılırsa 300×150'ye şişiyor ve bu
                  depoda iki sayfayı bozdu. Kap sabit px + overflow hidden. */}
              <span
                className="ank2-sum-f akt-durak"
                aria-hidden="true"
                style={{ "--akt-i": 3 + i * 0.18 } as React.CSSProperties}
              >
                <Flag country={t.country} />
              </span>
              <span className="ank2-sum-n">{COUNTRY_NAMES[t.country]}</span>
              <span className="ank2-sum-bar" aria-hidden="true">
                {/* Payda SABİT (FIT_CEIL = 26), "o anki en yüksek puan" değil.
                    Canlıda ölçülmüştü: değişken paydayla aynı 1 puanlık fark
                    testin başında 249,8 px, sonunda 55,5 px görünüyor ve bir
                    çubuk puanı hiç değişmeden geri gidebiliyordu. */}
                <span
                  className="ank2-sum-fill"
                  style={{ "--ank2-w": t.pts / FIT_CEIL } as React.CSSProperties}
                />
              </span>
              {/* Puan GERÇEK METİN: çubuk aria-hidden, bilgi buradan okunuyor. */}
              <span className="ank2-sum-p">{t.pts} puan</span>
            </li>
          ))}
        </ul>

        {/* SEVİYE · CANLIDAN. Tablonun dürüst karşı ağırlığı: tablo "kim kaç
            puan" diyor, bu satır "kalan sorular bunu hâlâ çevirebilir mi"
            diyor. Defter'de burada sabit bir not vardı; onun yerini aldı,
            yani ekrana yeni bir metin bloğu eklemiyor ama artık her cevapta
            değişiyor (ölçüldü, canlıda: ardışık iki cevapta %37,4 değişiyor).
            Kademeler saf süs ve aria-hidden; role="meter" canlıda denenip
            atılmıştı, içindeki metin erişilebilirlik ağacına çıkmıyor. */}
        <div className="ank2-sig">
          <div className="ank2-sig-steps" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="ank2-sig-step" data-on={i < level ? "" : undefined} />
            ))}
          </div>
          <p className="ank2-sig-line">{line}</p>
        </div>
      </div>
    </aside>
  );
}

/* ----------------------------------------------------------------- SONUÇ ---
   Sonuç sorunun yerine geliyor, DEFTER YERİNDE KALIYOR ve dokuz kalemin
   dokuzu da orada duruyor. Melezin yapısal iddiası bu: kayıt ayrı bir yerde
   durduğu için sonuç geldiğinde kaybolmuyor, üstelik oradan bir soruya dönüp
   "Sonuca dön" ile geri gelinebiliyor. Canlıda sonuçta sol ray KAPANIYOR ve
   cevap dökümü raporun içinde yeniden basılıyor.

   Cümleler uydurulmadı: ülke anlatımı countryContent.intro ve FACTS.limit'ten
   (fitBlurb), sıralama scoreFit'ten. Beraberlik yutulmuyor. */
function MelezSonuc({
  answers,
  onAgain,
}: {
  answers: (number | null)[];
  onAgain: () => void;
}) {
  const r = scoreFit(answers);
  const b = fitBlurb(r.top);

  return (
    <div className="ank2-res" key="res">
      <p className="ank2-res-e">Sonuç</p>
      <h3 className="ank2-res-h">
        {r.tieCount === 3
          ? "Cevaplarınız üçünü de eşit puanda bırakıyor."
          : r.tie
            ? `${COUNTRY_NAMES[r.top]} ile ${COUNTRY_NAMES[r.runnerUp]} başa baş.`
            : `${COUNTRY_NAMES[r.top]} öne çıkıyor.`}
      </h3>

      <ol className="ank2-res-list">
        {r.standings.map((s, i) => (
          <li key={s.country} className="ank2-res-row" data-first={i === 0 ? "" : undefined}>
            <span className="ank2-res-f" aria-hidden="true">
              <Flag country={s.country} />
            </span>
            <span className="ank2-res-n">{COUNTRY_NAMES[s.country]}</span>
            <span className="ank2-res-p">{s.pts} puan</span>
          </li>
        ))}
      </ol>

      <p className="ank2-res-l">{b.intro}</p>
      <p className="ank2-res-lim">
        <b>Karşılığı:</b> {b.limit}
      </p>
      <p className="ank2-res-note">
        {r.tie
          ? "Test bu cevaplarla ikisini ayıramıyor; sıralamayı listenin kendi yazım sırası belirledi."
          : r.flippable
            ? `${COUNTRY_NAMES[r.runnerUp]} ${r.gap} puan geride: fark, tek bir cevabınızı değiştirseniz sıranın döneceği kadar dar.`
            : `${COUNTRY_NAMES[r.runnerUp]} ${r.gap} puan geride. Tek bir cevap değişikliği bu sırayı çevirmiyor.`}
      </p>

      <button type="button" className="ank2-again" onClick={onAgain}>
        <RotateCcw size={14} strokeWidth={2.1} />
        Baştan
      </button>
    </div>
  );
}
