"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";

import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import {
  FIT_CEIL,
  FIT_COUNTRIES,
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
   ADAY 3 · PANO — ad alanı .ank3- · CSS: src/app/css/lab-ank3.css

   ---------------------------------------------------------------------------
   BU ADAYIN TEK CÜMLESİ: PUAN PANELİ BİR PANEL DEĞİL, EKRANIN KENDİSİ.

   Teşhiste dört sabit bölge sayıldı: sol ray, sayaç, soru, puan paneli
   (artı gezinme satırı = beş). Ölçüldü: rayın sol kenarı ile sorunun sol
   kenarı arasında 345 px, sorunun ortası ile panelin ortası arasında 302 px.
   Yani ziyaretçinin gözü her cevapta iki yöne birden gidiyor.

   SAHNE bölgeleri SİLİYOR. FÖY ekran sayısını düşürüyor. PANO ise İKİ BÖLGEYİ
   BİRLEŞTİRİYOR: puan paneli ile "görsel" aynı şey oluyor. Üç ülke ekranın
   üstünde üç sütun olarak duruyor, cevap verildikçe yükseliyorlar; ayrıca bir
   panel yok çünkü panelin göstereceği şey zaten resmin kendisi.

   GÖSTERGE SÜS DEĞİL, ÖLÇEKLİ. Arkadaki yatay çizgiler dekor değil skala:
   sütunun boyu puan / FIT_CEIL (26, tek bir ülkenin toplayabileceği en yüksek
   puan). Sabit payda bilerek: "o anki en yüksek puan" paydasıyla bir ülkenin
   sütunu, puanı hiç değişmediği hâlde başkası puan aldığında KISALIYOR (canlı
   testte ölçülüp düzeltilen kusur). Sabit paydayla sütun yalnızca uzuyor,
   müşterinin istediği cümle de tam olarak buydu: "sürekli puan kazanıyor".

   PUAN NEREDEN GELDİĞİ GÖRÜNÜYOR. Bir şık seçilince kazanan sütunun dibinden
   "+3" pulu yükseliyor. Bu, aktarim.css'in cümlesinin ("A'daki şey B'ye
   geçti") bu adaydaki karşılığı; kalıbın kendisi kullanılmadı çünkü kalıp
   DURUM TAŞIMIYOR (turu her zaman aynı, cevaba tepki vermiyor) ve burada
   hareketin tamamı cevaba bağlı. Kalıp yalnızca üç bayrağın sırayla
   halkalandığı sakin turda kullanılıyor.

   ---------------------------------------------------------------------------
   BU ADAYIN DÜRÜSTLÜK BORCU EN BÜYÜK

   Puanı ekranın merkezine koymak, fitTest.ts'te ölçülmüş iki olguyu
   büyütüyor:
     · ilk cevaptan sonra önde görünen ülke nihai birinciyi %48,7 tutturuyor
     · KKTC ilk cevapta %25 lider görünüp sonda %2,3'e düşüyor
   O yüzden göstergenin altındaki not bir süs cümlesi değil, adayın bedeli;
   silinirse aday yalan söylemeye başlar. Kıyas tablosunda da yazılı.
   ========================================================================= */

export default function AnketPano() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(emptyFitAnswers);
  /* Son cevabın hangi ülkeye kaç puan getirdiği ve kaçıncı tıklama olduğu.
     `n` yalnızca `key` üretmek için: aynı ülke arka arkaya aynı puanı alsa
     bile pul yeniden takılsın ve CSS animasyonu baştan oynasın. */
  const [gain, setGain] = useState<{ n: number; by: Partial<Record<string, number>> }>({
    n: 0,
    by: {},
  });

  const done = step >= FIT_TOTAL;
  const answered = answers.filter((a) => a !== null).length;
  const totals = fitTotals(answers);
  const here = fitPartOf(done ? FIT_TOTAL - 1 : step);

  const pick = (oi: number) => {
    const before = fitTotals(answers);
    const next = [...answers];
    next[step] = oi;
    const after = fitTotals(next);
    const by: Partial<Record<string, number>> = {};
    after.forEach((t, i) => {
      const d = t.pts - before[i].pts;
      if (d > 0) by[t.country] = d;
    });
    setAnswers(next);
    setGain((g) => ({ n: g.n + 1, by }));
  };

  const q = done ? FIT_QUESTIONS[FIT_TOTAL - 1] : FIT_QUESTIONS[step];
  const QIcon = ANK_ICONS[q.icon];

  return (
    <div className="ank3-app" data-done={done ? "" : undefined}>
      {/* ============================================================ GÖSTERGE
          Ekranın üstünde duran tek görsel ve tek puan tablosu. .akt kabı: üç
          bayrak sırayla halkalanıyor. Tur HİÇBİR duruma bağlı değil (sıra hep
          aynı, hız hep aynı) — gezen halka "şu an önde olan" demiyor, sadece
          üç ülkenin de canlı olduğunu söylüyor. */}
      <div className="ank3-gauge akt">
        {/* SKALA. Süs değil: sütunun boyu puan/26 ve çizgiler o ölçeğin
            kademeleri. aria-hidden, çünkü taşıdığı bilgi (kaç puan) her
            sütunun altında GERÇEK METİN olarak yazılı. */}
        <svg className="ank3-skala" viewBox="0 0 600 190" preserveAspectRatio="none" aria-hidden="true">
          <g className="ank3-skala-g">
            <line x1="0" y1="10" x2="600" y2="10" />
            <line x1="0" y1="55" x2="600" y2="55" />
            <line x1="0" y1="100" x2="600" y2="100" />
            <line x1="0" y1="145" x2="600" y2="145" />
          </g>
          <line className="ank3-skala-b" x1="0" y1="189" x2="600" y2="189" />
          {/* Tarayıcı ışığı: göstergenin üstünden geçen ince bant. */}
          <rect className="ank3-tara" x="-160" y="0" width="160" height="190" />
        </svg>

        <ul className="ank3-cols">
          {totals.map((t, i) => {
            const g = gain.by[t.country];
            return (
              <li key={t.country} className="ank3-col" data-zero={t.pts === 0 ? "" : undefined}>
                {/* Pul yalnızca puan GELDİĞİNDE var; key değişince yeniden
                    takılıyor ve tek seferlik animasyon baştan oynuyor.
                    aria-hidden: aynı bilgi altındaki "N puan" metninde. */}
                {g ? (
                  <span className="ank3-pip" key={`${gain.n}-${t.country}`} aria-hidden="true">
                    +{g}
                  </span>
                ) : null}
                <span className="ank3-col-t" aria-hidden="true">
                  <span
                    className="ank3-col-f"
                    style={{ "--ank3-h": t.pts / FIT_CEIL } as React.CSSProperties}
                  />
                </span>
                <span
                  className="ank3-col-d akt-durak"
                  aria-hidden="true"
                  style={{ "--akt-i": i } as React.CSSProperties}
                >
                  {/* TUZAK H: <Flag> width/height'sız svg basıyor, kapsız
                      300×150'ye şişer. Kap sabit piksel + overflow gizli. */}
                  <span className="ank3-flagbox">
                    <Flag country={t.country} />
                  </span>
                </span>
                <span className="ank3-col-n">{COUNTRY_NAMES[t.country]}</span>
                <span className="ank3-col-p">{t.pts} puan</span>
              </li>
            );
          })}
        </ul>

        {/* İLERLEME GÖSTERGENİN İÇİNDE, ayrı bir çubuk değil. Dokuz nokta üçlü
            gruplar hâlinde: bölüm sınırı boşlukla okunuyor, ayrıca "Bölüm 2"
            yazmaya gerek kalmıyor. */}
        <div
          className="ank3-dots"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={FIT_TOTAL}
          aria-valuenow={answered}
          aria-label="Cevaplanan soru sayısı"
        >
          {FIT_QUESTIONS.map((qq, qi) => (
            <span
              key={qq.id}
              className="ank3-dot"
              data-state={answers[qi] !== null ? "done" : !done && qi === step ? "now" : "todo"}
              data-gap={qi === 3 || qi === 6 ? "" : undefined}
            />
          ))}
        </div>

        {/* Adayın bedeli. Süs cümlesi değil: puanı ekranın merkezine koyan bir
            tasarım, fitTest.ts'te ölçülmüş iki olguyu büyütüyor. */}
        <p className="ank3-gauge-note">
          Sütunlar aynı ölçekte ve yalnızca uzuyor; sıralama değil, listenin kendi
          sırası. İlk cevaplarda öne geçen ülke sonda çoğu zaman değişiyor, kesin
          sıralama sonuçta.
        </p>
      </div>

      {/* ================================================================ SORU
          Göstergenin altında tek şeritte: nerede olduğunu söyleyen bir satır,
          soru ve şıklar. Sol ray yok, ikinci bir sayaç yok. */}
      {done ? (
        <PanoSonuc answers={answers} onAgain={() => { setAnswers(emptyFitAnswers()); setGain({ n: 0, by: {} }); setStep(0); }} />
      ) : (
        <div className="ank3-ask" key={q.id}>
          <p className="ank3-ask-w">
            {here.part.title}
            <span className="ank3-ask-s">
              Soru {step + 1} / {FIT_TOTAL}
            </span>
          </p>

          {/* role="group" + aria-label: <fieldset> + <legend> bu tarayıcıda
              ağaca ADLI GRUP olarak çıkmıyor; üç varyantın ölçümü
              AnketSahne.tsx'te yazılı. */}
          <fieldset className="ank3-fs" role="group" aria-label={q.q}>
            <legend className="ank3-q">
              <span className="ank3-q-i" aria-hidden="true">
                <QIcon size={22} strokeWidth={1.9} />
              </span>
              <span className="ank3-q-t">{q.q}</span>
            </legend>
            {q.help ? <p className="ank3-help">{q.help}</p> : null}

            <div className="ank3-opts">
              {q.options.map((o, oi) => {
                const OIcon = o.icon ? ANK_ICONS[o.icon] : null;
                return (
                  <label
                    key={o.id}
                    className="ank3-opt"
                    data-on={answers[step] === oi ? "" : undefined}
                    style={{ "--ank3-o": oi } as React.CSSProperties}
                  >
                    <input
                      type="radio"
                      name={`ank3-${q.id}`}
                      value={o.id}
                      checked={answers[step] === oi}
                      onChange={() => pick(oi)}
                      aria-label={o.hint ? `${o.label}. ${o.hint}` : o.label}
                    />
                    <span className="ank3-opt-i" aria-hidden="true">
                      {OIcon ? <OIcon size={20} strokeWidth={1.9} /> : ANK_HARF[oi]}
                    </span>
                    <span className="ank3-opt-b">
                      <span className="ank3-opt-t">{o.label}</span>
                      {o.hint ? <span className="ank3-opt-h">{o.hint}</span> : null}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="ank3-foot">
            <button
              type="button"
              className="ank3-back"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
            >
              <ArrowLeft size={15} strokeWidth={2.1} />
              Önceki
            </button>
            <button
              type="button"
              className="btn btn-solid btn-sm ank3-go"
              onClick={() => setStep((s) => s + 1)}
              disabled={answers[step] === null}
            >
              {step === FIT_TOTAL - 1 ? "Sonucu gör" : "Sonraki"}
              <ArrowRight size={15} strokeWidth={2.1} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- SONUÇ ---
   SONUÇ GÖSTERGENİN ALTINDAN AÇILIYOR ve gösterge yerinde kalıyor: sütunlar
   nihai puanda donuyor, altına rapor geliyor. Üç adayın sonuç davranışı
   bilerek üç ayrı şey (SAHNE'de sorunun yerine gelir, FÖY'de dördüncü kâğıt
   olur, PANO'da göstergenin altında açılır) — kıyas tablosunda ayrı satır. */
function PanoSonuc({
  answers,
  onAgain,
}: {
  answers: (number | null)[];
  onAgain: () => void;
}) {
  const r = scoreFit(answers);
  const b = fitBlurb(r.top);

  return (
    <div className="ank3-res" key="res">
      <p className="ank3-res-e">
        <span className="ank3-res-ei" aria-hidden="true">
          <Check size={14} strokeWidth={2.6} />
        </span>
        Dokuz cevap değerlendirildi
      </p>
      <h4 className="ank3-res-h">
        {r.tieCount === 3
          ? "Cevaplarınız üçünü de eşit puanda bırakıyor."
          : r.tie
            ? `${COUNTRY_NAMES[r.top]} ile ${COUNTRY_NAMES[r.runnerUp]} başa baş.`
            : `${COUNTRY_NAMES[r.top]} öne çıkıyor.`}
      </h4>
      <p className="ank3-res-t">{b.intro}</p>
      <p className="ank3-res-lim">
        <b>Karşılığı:</b> {b.limit}
      </p>
      <p className="ank3-res-note">
        {r.tie
          ? "Test bu cevaplarla ikisini ayıramıyor; sıralamayı listenin kendi yazım sırası belirledi."
          : r.flippable
            ? `${COUNTRY_NAMES[r.runnerUp]} ${r.gap} puan geride: fark, tek bir cevabınızı değiştirseniz sıranın döneceği kadar dar.`
            : `${COUNTRY_NAMES[r.runnerUp]} ${r.gap} puan geride. Tek bir cevap değişikliği bu sırayı çevirmiyor.`}
      </p>
      <p className="ank3-res-src">
        Puanlar yukarıdaki sütunlarda duruyor. Sıralama:{" "}
        {r.standings.map((s) => `${COUNTRY_NAMES[s.country]} ${s.pts}`).join(" · ")}. Puanlanan
        ülkeler: {FIT_COUNTRIES.length}.
      </p>
      <button type="button" className="ank3-back" onClick={onAgain}>
        <RotateCcw size={14} strokeWidth={2.1} />
        Baştan
      </button>
    </div>
  );
}
