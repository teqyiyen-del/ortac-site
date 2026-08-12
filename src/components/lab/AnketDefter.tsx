"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, NotebookPen, RotateCcw } from "lucide-react";

import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import {
  FIT_CEIL,
  FIT_QUESTIONS,
  FIT_TOTAL,
  emptyFitAnswers,
  fitBlurb,
  fitPartOf,
  fitTotals,
  scoreFit,
} from "@/lib/fitTest";
import { ANK_HARF, ANK_ICONS } from "@/components/lab/anketIkon";

/* ============================================================================
   ADAY 2 · DEFTER — ad alanı .ank2- · CSS: src/app/css/lab-ank2.css

   ---------------------------------------------------------------------------
   BU ADAY NEDEN VAR: TEŞHİS TERSİNE DÖNDÜ

   Geçen tur ölçüm şunu diyordu: canlı bir soru ekranında 52 metin bloğu var,
   45'i sorunun dışında, en büyük kalem sol ray (29 blok · 604,8 px). Üç aday
   da o 45 bloğu kesti. Müşteri üçünü de gördü ve "hâlâ canlıdaki hali daha
   iyi" dedi. Yani 45 blok GÜRÜLTÜ DEĞİLDİ.

   Bu tur o rayı yeniden ölçtük, bu kez "kaç blok" diye değil "ne yazıyor"
   diye. 5. soruda (dört cevap girilmiş, 1400 px) canlıda duranlar:
     · 7 blok  = ZİYARETÇİNİN KENDİ KAYDI (4 cevap metni + 3 ülke puanı)
     · 236.903 px² = ekranın %25,71'i, aynı kayda ayrılmış yüzey
     · 5 tıklanabilir hedef = görülmüş herhangi bir soruya TEK tıkla dönüş
   Aday 1'de (SAHNE) bu üç sayı sırasıyla 0 blok, 0 px² ve 1 hedef (yalnız bir
   önceki soruya götüren "Geri"). 5. sorudan 1. soruya dönüş canlıda 1,
   SAHNE'de 4 tıklama.

   Canlının doğru yaptığı şey bu: EKRANIN DÖRTTE BİRİNİ ZİYARETÇİNİN KENDİ
   KAYDINA harcıyor. O kayıt asla yanlış olamaz, çünkü tahmin değil olan
   biten. (Karşılaştırın: elenen PANO ekranın yaklaşık yarısını bir ÖNGÖRÜYE
   ayırıyordu ve fitTest.ts o öngörünün ilk cevapta %48,7 tuttuğunu ölçmüş.)

   ---------------------------------------------------------------------------
   O HÂLDE DEFTER NE YAPIYOR: AYNI KAYIT, YAZI DEĞİL ÇİZİM

   Kaydı kaldırmıyor, ONU ÇİZİYOR. Sorunun sağında gece bir defter duruyor ve
   her cevap oraya bir SATIR olarak işleniyor: seçtiğiniz şıkkın kendi ikonu
   34 px bir diskte, yanında sorunun kısa adı ve cevabınız. Defterin dibinde
   üç ülkenin toplamı var — muhasebe defterinin kendi mantığı: önce kalemler,
   sonra toplam.

   NEDEN YAZILMAMIŞ SORULAR DEFTERDE YOK. Canlı ray dokuz sorunun dokuzunu da
   her ekranda basıyor, yani beş soru boyunca ekranda beş boş cevap işareti
   duruyor. Defter yalnızca İŞLENMİŞ kalemi gösteriyor; kaç soru olduğu
   üstteki omurgada (dokuz nokta, üç bölüm boşluklu) ve sayaçta yazılı.

   ÖLÇÜLEN KARŞILIĞI (5. soru, dört cevap girilmiş, 1400 px): canlı aynı
   bilgiyi İKİ AYRI BÖLGEDE, 29 + 11 = 40 metin bloğu ve 604,8 + 275,6 =
   880,4 px dikey yer harcayarak veriyor. Defter TEK bölgede, 19 metin bloğu
   ve 529,8 px ile veriyor; on dokuzun 7'si (dört cevap metni + üç puan)
   doğrudan ziyaretçinin kendi kaydı, yani canlının kendi kayıt blok sayısıyla
   birebir aynı.

   ---------------------------------------------------------------------------
   YENİ GÖRSEL DİL İCAT EDİLMEDİ

   Bu turun en taze dersi, bentoya konan kürenin "diğerleriyle uyumsuz" diye
   geri alınması. O yüzden defterin hiçbir parçası yeni değil:
     · beyaz kart gövdesi + içinde gece bir panel   → globals.css .hx-card/.hx-stage
     · lucide ikon, strokeWidth 1.9                  → sitede 63 kullanım
     · yuvarlak bayrak diski, sabit px + overflow    → .hx-flag-f ve .ft-tally-flag
     · enerji geçişi (yeni kalem → toplam)           → css/aktarim.css .akt/.akt-durak
     · tek marka mavisi                              → --blue-700
   Yani DEFTER bir üslup önerisi değil, YERLEŞİM önerisi.

   ---------------------------------------------------------------------------
   AYRIŞMA EKSENİ (Aday 3 ile)

   DEFTER: durum AYRI BİR YERDE durur. Soru her adımda tam olarak aynı
   pikselde; defter sağda birikir. Sayfa hiç uzamaz.
   AKIŞ (Aday 3): ayrı bir durum bölgesi YOKTUR; cevaplanan soru kendi
   cevabına katlanır ve listede kendi yerinde kalır. Sayfa uzar.
   İkisi de canlının taşıdığı üç şeyi (kendi cevapların, tek tıkla dönüş,
   canlı puan) taşıyor; ayrıldıkları yer o bilginin NEREDE durduğu.

   ---------------------------------------------------------------------------
   HAREKET

   Tamamı CSS'te ve `prefers-reduced-motion: no-preference` kapısının içinde.
   Bu dosyada tek satır hareket kodu yok (useReducedMotion bu depoda yasak;
   render ağacında okunduğu beş kalıpta hidrasyon hatası çıkardı).

   İki sürekli periyot, ikisi de bu tur seçildi ve yüzde birlik ızgarada asal:
     11.23 s  defterin enerji geçişi (yeni kalem → ayraç → toplam)
     24.11 s  gece panelin çok hafif ışık kayması
   Adım geçişi periyot değil: `key` ile düğüm sökülüp takılıyor.
   ========================================================================= */

const pad = (n: number) => String(n).padStart(2, "0");

export default function AnketDefter() {
  /* 0..8 = soru · FIT_TOTAL = sonuç. AÇILIŞ PERDESİ YOK: SAHNE'de perde
     gerekliydi çünkü orada "kaç soru var" sorusunun başka cevabı yoktu;
     burada omurga ve sayaç ilk karede zaten ekranda, yani perde bir tıklama
     eklemekten başka bir şey yapmazdı (SAHNE 19 tıklama, DEFTER 18). */
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(emptyFitAnswers);
  /* Görülmüş en uzak soru. İleri atlamak yok: cevaplanmamış sorularla sonuca
     varmanın kestirme yolu olurdu (canlı testin kuralı, aynen korundu). */
  const [furthest, setFurthest] = useState(0);
  const box = useRef<HTMLFieldSetElement>(null);

  const done = step >= FIT_TOTAL;
  const answered = answers.filter((a) => a !== null).length;
  const here = fitPartOf(done ? FIT_TOTAL - 1 : step);

  /* Odak yalnızca ADIM DEĞİŞİNCE geziniyor, ilk boyamada değil: sayfa bir lab
     sayfası, üç aday alt alta duruyor ve birinin odağı çalması ötekini okumayı
     bozardı. "Başladı" durumdan türetiliyor, ref'ten değil (canlı testte aynı
     karar: effect'te yazılan ref bir sonraki render'a kadar bayat kalıyor). */
  const started = step > 0 || answered > 0;
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
    setStep(0);
  };

  const q = done ? null : FIT_QUESTIONS[step];
  const QIcon = q ? ANK_ICONS[q.icon] : null;
  const picked = !done && answers[step] !== null;

  return (
    <div className="ank2-app">
      {/* IZGARA: geniş ekranda soru solda, defter sağda.
          DEFTER NEDEN SAĞDA. Canlıda ray solda ve DOM'da da ilk sırada, yani
          klavye ilk olarak dokuz gezinme düğmesine giriyor. Burada DOM sırası
          soru → defter; görsel sıra da soru → defter. İkisi aynı olduğu için
          odak sırası ile okuma sırası ayrışmıyor ve klavye kullanıcısı önce
          cevaplayacağı şeye varıyor. Sütunları takas etmek (defter solda)
          ikisini ayırırdı. */}
      <div className="ank2-grid">
        <div className="ank2-ask">
          <div className="ank2-head">
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

          {/* İlerleme: saç teli çizgi. Yüzde ayrıca YAZILMIYOR — sayaç zaten
              "05 / 9" diyor ve iki ayrı sayı aynı şeyi söylerdi. */}
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
            <DefterSonuc answers={answers} onAgain={restart} />
          ) : (
            /* role="group" + aria-label ÖLÇÜMLE GELDİ: bu tarayıcıda
               <fieldset> + <legend> erişilebilirlik ağacında ADLI BİR GRUP
               üretmiyor, legend adsız bir `generic` olarak duruyor. Üç varyant
               denendi; grup düğümünü yalnızca explicit role + aria-label
               veriyor. <legend> DURUYOR, görünen başlık o. */
            <fieldset
              className="ank2-fs"
              key={q!.id}
              ref={box}
              role="group"
              aria-label={q!.q}
            >
              <legend className="ank2-q">
                <span className="ank2-q-i" aria-hidden="true">
                  {QIcon ? <QIcon size={30} strokeWidth={1.9} /> : null}
                </span>
                <span className="ank2-q-t">{q!.q}</span>
              </legend>
              {/* FİLİGRAN — Aday 1'de alınan karar burada da geçerli ve
                  BİLEREK tekrar ediliyor. Müşteri Aday 1 için "iyi gibi"
                  dedi; tutarlılık bu turun birinci kuralı, o yüzden aynı
                  hamle yeni bir kılığa sokulmadı. Ölçüm: canlıda en büyük
                  çizim 20×20 px (400 px²), buradaki filigran 120×120
                  (14.400 px², 36 katı). aria-hidden, çünkü sorunun ikonu
                  soru cümlesinin tekrarı. */}
              <span className="ank2-mark" aria-hidden="true">
                {QIcon ? <QIcon size={120} strokeWidth={1.9} /> : null}
              </span>
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
                          okunuyordu. Görünen metin adın başında (label in name). */}
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
              <button
                type="button"
                className="btn btn-solid btn-sm ank2-go"
                onClick={() => goTo(step + 1)}
                disabled={!picked}
              >
                {step === FIT_TOTAL - 1 ? "Sonucu gör" : "Devam"}
                <ArrowRight size={15} strokeWidth={2.1} />
              </button>
            </div>
          )}
        </div>

        <Defter
          answers={answers}
          answered={answered}
          step={done ? -1 : step}
          furthest={furthest}
          onGoTo={goTo}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ DEFTER --
   Gece panel. İçinde üç şey var ve üçü de canlı testin taşıdığı bir bilgi:
     1. omurga    → dokuz soru, üç bölüm (canlıdaki ray listesinin karşılığı)
     2. kalemler  → verilmiş cevaplar, tek tıkla dönüşle (canlıdaki .ft-jump)
     3. toplam    → üç ülkenin puanı (canlıdaki .ft-sig tablosu)
   Fark sunumda: canlı bunları 29 + 11 metin bloğuyla yazıyor, defter aynı
   bilgiyi ikon diski, dolan halka ve çubukla ÇİZİYOR; yazılı kalan tek şey
   cevabın kendi metni ve puan sayısı — ikisi de gerçek bilgi, süs değil. */
function Defter({
  answers,
  answered,
  step,
  furthest,
  onGoTo,
}: {
  answers: (number | null)[];
  answered: number;
  step: number;
  furthest: number;
  onGoTo: (i: number) => void;
}) {
  const totals = fitTotals(answers);
  /* Kalemler CEVAPLANMA SIRASINDA değil SORU SIRASINDA duruyor. Cevaplanma
     sırası daha "canlı" görünürdü ama bir cevabı düzeltince satır yerinden
     zıplardı; defterin kalemi yerinden oynamaz. */
  const entries = FIT_QUESTIONS.map((q, qi) => ({ q, qi, a: answers[qi] })).filter(
    (e) => e.a !== null,
  );

  return (
    /* .akt kabı: enerji son kalemden ayraca, ayraçtan üç toplama geçiyor.
       Kalıbın kendi cümlesi "A'daki şey B'ye geçti" ve burada geçen şey tam
       olarak bu: verdiğiniz cevap toplamı besledi. Değerler CSS'te. */
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

      {/* OMURGA: dokuz nokta, üç bölüm boşluklu. "Kaç soru var" sorusunun
          cevabı; canlıda bu cevap dokuz satırlık bir liste, burada dokuz
          nokta. aria-hidden çünkü aynı bilgi yukarıda sayı olarak yazılı. */}
      <ol className="ank2-spine" aria-hidden="true">
        {FIT_QUESTIONS.map((q, qi) => (
          <li
            key={q.id}
            className="ank2-pip"
            data-state={answers[qi] !== null ? "done" : qi === step ? "now" : "todo"}
            data-gap={qi === 3 || qi === 6 ? "" : undefined}
          />
        ))}
      </ol>

      <div className="ank2-log-wrap">
        {entries.length === 0 ? (
          <p className="ank2-empty">İlk cevabınız buraya işlenecek.</p>
        ) : (
          <ol className="ank2-log">
            {entries.map((e, ei) => {
              const o = e.q.options[e.a as number];
              const OIcon = o.icon ? ANK_ICONS[o.icon] : null;
              const reachable = e.qi <= furthest;
              /* Enerji geçişinin BİRİNCİ durağı en yeni kalem. Sabit bir
                 satır değil: kalem eklendikçe durak da aşağı iniyor, çünkü
                 kalıbın cümlesi "en son verdiğiniz cevap toplamı besledi".
                 Sınıf yalnızca son satırda; ötekiler sıradan satır. */
              const son = ei === entries.length - 1;
              return (
                <li key={e.q.id}>
                  <button
                    type="button"
                    className="ank2-entry"
                    data-now={e.qi === step ? "" : undefined}
                    disabled={!reachable}
                    aria-current={e.qi === step ? "step" : undefined}
                    /* Ad AÇIKÇA veriliyor: bu depoda görsel olarak gizli
                       <span>'lerle ad vermek üç kez tutmadı, düğme adsız
                       kaldı. Görünen metin (kısa ad) adın başında. */
                    aria-label={`${e.q.short}. Cevabınız: ${o.label}. Bu soruya dön.`}
                    onClick={() => onGoTo(e.qi)}
                  >
                    <span
                      className={son ? "ank2-entry-d akt-durak" : "ank2-entry-d"}
                      aria-hidden="true"
                    >
                      {OIcon ? <OIcon size={20} strokeWidth={1.9} /> : ANK_HARF[e.a as number]}
                    </span>
                    <span className="ank2-entry-b">
                      <span className="ank2-entry-t">{e.q.short}</span>
                      <span className="ank2-entry-a">{o.label}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      {/* AYRAÇ: enerji geçişinin ikinci durağı. Süs bir çizgi değil, defterin
          kalemleri ile toplamını ayıran satır. */}
      <span className="ank2-rule akt-durak" aria-hidden="true" />

      <div className="ank2-sum">
        <p className="ank2-sum-h">Toplam</p>
        {/* IZGARA SATIRDA DEĞİL LİSTEDE (subgrid). Canlıda ölçülmüş bir kusuru
            kapatıyor: satır kendi ızgarası olunca ad sütunu satırdan satıra
            farklı genişlikte oturuyor ve 1fr'lik çubuk rayı ondan artanı
            alıyordu; tam beraberlikte Dubai'nin çubuğu İngiltere'ninkinden
            15,5 px uzun çıkıyordu. Sütunlar listede tanımlı, satırlar subgrid:
            EŞİT PUAN EŞİT PİKSEL. */}
        <ul className="ank2-sum-list">
          {totals.map((t, i) => (
            <li key={t.country} className="ank2-sum-row" data-zero={t.pts === 0 ? "" : undefined}>
              {/* TUZAK H — <Flag> çıplak <svg viewBox="0 0 60 40"> basıyor,
                  width/height YOK. Kapsız bırakılırsa 300x150'ye şişiyor ve bu
                  depoda iki sayfayı bozdu. Kap sabit px + overflow clip. */}
              <span
                className="ank2-sum-f akt-durak"
                aria-hidden="true"
                style={{ "--akt-i": 2 + i * 0.18 } as React.CSSProperties}
              >
                <Flag country={t.country} />
              </span>
              <span className="ank2-sum-n">{COUNTRY_NAMES[t.country]}</span>
              <span className="ank2-sum-bar" aria-hidden="true">
                {/* Payda SABİT (FIT_CEIL = 26), "o anki en yüksek puan" değil.
                    Canlıda ölçüldü: değişken paydayla aynı 1 puanlık fark
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
        {/* Panelin dürüst karşı ağırlığı. fitTest.ts'te ölçülmüş iki olgu:
            ilk cevaptan sonra önde görünen ülke nihai birinciyi %48,7
            tutturuyor; KKTC ilk cevapta %25 lider görünüp sonda %2,3'e
            düşüyor. Cümle sayı vermeden ama uydurmadan aktarıyor. */}
        <p className="ank2-sum-note">
          Sıralama değil, sayaç. İlk cevaplarda öne geçen ülke sonda çoğu zaman değişiyor.
        </p>
      </div>
    </aside>
  );
}

/* ----------------------------------------------------------------- SONUÇ ---
   SONUÇ DEFTERİN YANINDA AÇILIYOR, defter yerinde kalıyor ve dokuz kalemin
   dokuzu da orada duruyor. Adayın yapısal iddiası tam olarak bu: durum ayrı
   bir yerde durduğu için sonuç geldiğinde kaybolmuyor. Canlıda ise sonuçta
   sol ray KAPANIYOR ve cevap dökümü raporun içinde yeniden basılıyor.

   Cümleler uydurulmadı: ülke anlatımı countryContent.intro ve FACTS.limit'ten
   (fitBlurb), sıralama scoreFit'ten. Beraberlik yutulmuyor. */
function DefterSonuc({
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
