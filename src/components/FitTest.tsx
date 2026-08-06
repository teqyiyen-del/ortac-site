"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Pencil, RotateCcw, Scale } from "lucide-react";

import SmartLink from "@/components/shared/SmartLink";
import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import {
  FIT_QUESTIONS,
  FIT_TOTAL,
  emptyFitAnswers,
  fitBlurb,
  scoreFit,
} from "@/lib/fitTest";
import { gtm } from "@/lib/gtm";
import { useOrtacStore } from "@/lib/store";

/* ============================================================================
   UYGUNLUK TESTİ
   Sorular ve ağırlıklar: src/lib/fitTest.ts (SWAP:FIT_WEIGHTS orada)
   CSS: src/app/css/fittest.css · ad alanı .ft-

   ---------------------------------------------------------------------------
   BU DOSYADA İÇERİK KARARI YOK

   Soru metni, seçenek, ipucu ve puan burada değil. Sonuçtaki ülke cümlesi de
   burada değil — countryContent.intro ve FACTS.limit'ten geliyor (bkz.
   fitTest.ts · fitBlurb). Bu dosya yalnızca akışı yürütüyor: hangi soru
   ekranda, cevap nereye yazılıyor, sonuç nasıl gösteriliyor.

   ---------------------------------------------------------------------------
   ÜÇ TASARIM KARARI

   1) SEÇENEK KUTUCUK, AÇILIR MENÜ DEĞİL. Altta yatan kontrol yerli
      <input type="radio">; görünmüyor ama DOM'da ve odaklanabiliyor. Ok
      tuşlarıyla gezinme, klavyeyle seçme ve ekran okuyucu duyurusu
      tarayıcıdan geliyor, taklit edilmiyor. Gruplama <fieldset> + <legend>
      ile — soru cümlesi grubun ADI oluyor, yani radyoya odaklanan kişi hangi
      soruyu cevapladığını duyuyor.

   2) OTOMATİK GEÇİŞ KALKTI, "SONRAKİ" DÜĞMESİ GELDİ. Eski sürüm seçeneğe
      basıldığı an bir sonraki soruya atlıyordu. İki sorunu vardı: klavyeyle
      ok tuşuna basan kişi seçimini değiştirdiği için sorudan atılıyordu, ve
      hiç kimse seçtiği şeyi göremiyordu — kutucukların seçili hâli ekranda
      bir an bile durmuyordu. Görünür kutucuk isteniyorsa seçim de görünür
      kalmalı. Fiyatı bir tıklama; karşılığı geri alınabilir bir seçim.

   3) İLERLEME İKİ YERDE. Üstte "Soru 3 / 5" yazısı ve beş çentik. Yazı aynı
      zamanda aria-live bölgesi: AnimatePresence'in DIŞINDA, sabit bir düğüm
      olarak duruyor, çünkü her adımda söküp takılan bir canlı bölge hiçbir
      şey duyurmaz.

   ---------------------------------------------------------------------------
   ODAK YÖNETİMİ

   Adım değişince odak yeni sorunun radyo grubuna gidiyor (seçiliye, yoksa
   ilkine); sonuç ekranında sonuç başlığına. Sayfa ilk açıldığında odak
   ÇALINMIYOR — o yüzden Ask/Result kendi mount'unda odaklanıyor ve ilk
   mount'ta `focusOnMount` false geliyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Hareket azaltılmışken RENDER EDİLEN AĞAÇ AYNI KALIYOR: aşağıda hiçbir yerde
   koşullu düğüm yok, yalnızca süre sıfırlanıyor. */
function useDur() {
  const reduce = useReducedMotion();
  return (d: number) => (reduce ? 0 : d);
}

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
    /* Seçili radyo varsa ona, yoksa ilkine. Radyo grubuna odaklanmak ekran
       okuyucuya legend'i (soru cümlesini) de okutuyor — ayrıca bir duyuru
       düğümü kurmaya gerek kalmıyor. */
    const target =
      group.querySelector<HTMLInputElement>("input:checked") ??
      group.querySelector<HTMLInputElement>("input");
    target?.focus({ preventScroll: true });
    /* focusOnMount mount anında sabit; bağımlılık listesi bilerek boş. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <fieldset className="ft-fs" ref={box}>
      <legend className="ft-legend">{q.q}</legend>
      {q.help ? <p className="ft-help">{q.help}</p> : null}

      <div className="ft-choices">
        {q.options.map((o, oi) => (
          <label key={o.id} className="ft-choice" data-on={answer === oi ? "" : undefined}>
            <input
              type="radio"
              name={`fit-${q.id}`}
              value={o.id}
              checked={answer === oi}
              onChange={() => onPick(oi)}
            />
            <span className="ft-choice-body">
              <span className="ft-choice-t">{o.label}</span>
              {o.hint ? <span className="ft-choice-h">{o.hint}</span> : null}
            </span>
            <span className="ft-choice-mark" aria-hidden="true">
              <Check size={14} strokeWidth={2.8} />
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* ========================================================== SONUÇ EKRANI == */

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
  const dur = useDur();
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
    <div className="ft-res">
      {/* Başlık da beraberliği yutmuyor: eşitken "şu öne çıkıyor" demek,
          altındaki cümlenin hemen geri aldığı bir hüküm kurmak olurdu. */}
      <h2 className="ft-verdict" ref={head} tabIndex={-1}>
        {r.tieCount === 3 ? (
          <>
            Verdiğiniz cevaplar <span className="ft-verdict-em">üçünü de eşit</span> puanda
            bırakıyor.
          </>
        ) : r.tie ? (
          <>
            Verdiğiniz cevaplara göre{" "}
            <span className="ft-verdict-em">{COUNTRY_NAMES[r.top]}</span> ile{" "}
            <span className="ft-verdict-em">{COUNTRY_NAMES[r.runnerUp]}</span> başa baş.
          </>
        ) : (
          <>
            Verdiğiniz cevaplara göre{" "}
            <span className="ft-verdict-em">{COUNTRY_NAMES[r.top]}</span> öne çıkıyor.
          </>
        )}
      </h2>

      <p className="ft-gap">{gapLine}</p>

      {/* --------------------------------------------------- puan tablosu */}
      <ol className="ft-list">
        {r.standings.map((s, i) => (
          <li key={s.country} className="ft-item" data-top={i === 0 ? "" : undefined}>
            <span className="ft-item-no" aria-hidden="true">
              {i + 1}
            </span>
            <span className="ft-item-flag" aria-hidden="true">
              <Flag country={s.country} />
            </span>
            <span className="ft-item-name">{COUNTRY_NAMES[s.country]}</span>
            <span className="ft-item-bar" aria-hidden="true">
              <motion.span
                className="ft-item-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: s.pts / r.max }}
                transition={{ duration: dur(0.6), delay: dur(0.12 + i * 0.08), ease: EASE }}
              />
            </span>
            <span className="ft-item-pts">{s.pts} puan</span>
          </li>
        ))}
      </ol>

      {/* ------------------------------------------------ ilk iki, yan yana
          Üçüncü ülke bilerek yok: iki seçeneği karşılaştırmak karar, üçünü
          karşılaştırmak araştırma — ve onun yeri /ulkeler. */}
      <div className="ft-pair">
        {[
          { c: r.top, b: top, role: "Öne çıkan" },
          { c: r.runnerUp, b: second, role: "İkinci sıra" },
        ].map((x) => (
          <div key={x.c} className="ft-card" data-top={x.c === r.top ? "" : undefined}>
            <div className="ft-card-top">
              <span className="ft-card-flag" aria-hidden="true">
                <Flag country={x.c} />
              </span>
              <b className="ft-card-name">{COUNTRY_NAMES[x.c]}</b>
              <span className="ft-card-role">{x.role}</span>
            </div>
            <p className="ft-card-line">{x.b.intro}</p>
            <p className="ft-card-limit">{x.b.limit}</p>
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------- cevap dökümü
          Sonucun neye dayandığı gizli kalmasın: beş cevap da yazılı ve her
          satır kendi sorusuna geri götürüyor. Puanı gösteren bir ekranın
          girdisini saklaması, puanı bir hükme çeviriyor. */}
      <div className="ft-recap">
        <p className="ft-recap-h">Bu sonuç şu beş cevaptan çıktı:</p>
        <ol>
          {FIT_QUESTIONS.map((q, qi) => {
            const a = answers[qi];
            return (
              <li key={q.id}>
                <button type="button" className="ft-recap-b" onClick={() => onGoTo(qi)}>
                  <span className="ft-recap-q">{q.q}</span>
                  <span className="ft-recap-a">
                    {a === null ? "—" : q.options[a].label}
                  </span>
                  <span className="ft-recap-x" aria-hidden="true">
                    <Pencil size={13} strokeWidth={2.2} />
                    Değiştir
                  </span>
                  <span className="sr-only">, cevabı değiştir</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="ft-acts">
        <SmartLink
          href={`/basla?ulke=${r.top}`}
          className="btn btn-solid"
          onClick={() => {
            /* Mağazadaki ülke de güncelleniyor (eski davranış korundu):
               /basla sayfası URL parametresini okuyor ama hero ve hesaplayıcı
               aynı dilimden besleniyor, ikisi ayrışmasın. */
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
        <button type="button" className="ft-reset" onClick={onRestart}>
          <RotateCcw size={14} strokeWidth={2.1} />
          Baştan
        </button>
      </div>

      <p className="ft-disc">
        Bu bir kısa liste aracı: sonucu beş cevabın puanlanması üretiyor, mali veya
        hukuki tavsiye değil. Puanlama sizi bir ülkeye yönlendirmek için değil,
        konuşmayı kısaltmak için var: hangi yapının işinize yaradığı faaliyetinize,
        mukimliğinize ve gelir türünüze bağlı ve teyit gerektiriyor.
      </p>
    </div>
  );
}

/* ================================================================= AKIŞ === */

export default function FitTest() {
  const dur = useDur();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(emptyFitAnswers);
  /* Sonuç bir kez görüldüyse geri dönen kişi beş soruyu yeniden tıklamasın:
     birincil düğme "Sonuca dön" olup doğrudan sonuca atlıyor. */
  const [seenResult, setSeenResult] = useState(false);

  const done = step >= FIT_TOTAL;
  const answered = answers.filter((a) => a !== null).length;
  const filled = Math.round((answered / FIT_TOTAL) * 100);
  const picked = !done && answers[step] !== null;

  /* Sayfa açılışında odak ÇALINMIYOR, sonraki her adımda çalınıyor.

     Önce bir ref + mount effect'iyle yapılıyordu (`started.current`) ve iki
     ayrı sebepten yanlıştı. Biri lint'in söylediği: ref render sırasında
     okunuyordu. Diğeri daha sinsi — effect'te yazılan ref YENİDEN RENDER
     TETİKLEMİYOR, yani değer bir sonraki render'a kadar bayat kalıyordu.

     Doğrusu türetmek: "başladı" zaten mevcut durumun içinde yazılı. Adım
     ilerlediyse, bir cevap verildiyse ya da sonuç görüldüyse ziyaretçi bu
     bileşenle etkileşmiş demektir. İlk boyamada üçü de yanlış, yani odak
     çalınmıyor; ilk tıklamadan sonra üçünden biri doğru oluyor. Ref yok,
     effect yok, bayat değer yok. */
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
    if (at >= FIT_TOTAL && !seenResult) {
      setSeenResult(true);
      const r = scoreFit(answers);
      /* Mevcut olay adı ve `answers` yükü korundu; sonucun kendisi eklendi —
         hangi cevabın hangi ülkeye çıktığı ölçülmeden puanlama gözden
         geçirilemiyor (SWAP:FIT_WEIGHTS). */
      gtm("fit_test_complete", {
        answers: answers.join(","),
        top: r.top,
        runner_up: r.runnerUp,
        gap: r.gap,
      });
    }
  };

  const restart = () => {
    setAnswers(emptyFitAnswers());
    setSeenResult(false);
    setStep(0);
  };

  const nextLabel = seenResult ? "Sonuca dön" : step === FIT_TOTAL - 1 ? "Sonucu gör" : "Sonraki soru";

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="ft-app">
          {/* ------------------------------------------------------- başlık
              aria-live burada ve AnimatePresence'in dışında: adım değişince
              metni değişen sabit bir düğüm. İçeriği değil kendisi söküldüğü
              anda hiçbir duyuru olmazdı. */}
          <div className="ft-top">
            <p className="ft-eyebrow" aria-live="polite">
              {done ? "Sonuç" : `Soru ${step + 1} / ${FIT_TOTAL}`}
            </p>

            <span className="ft-pips" aria-hidden="true">
              {FIT_QUESTIONS.map((q, i) => (
                <span
                  key={q.id}
                  className="ft-pip"
                  data-state={
                    answers[i] !== null ? "done" : !done && i === step ? "now" : "todo"
                  }
                >
                  <motion.span
                    initial={false}
                    animate={{ scaleX: answers[i] !== null ? 1 : 0 }}
                    transition={{ duration: dur(0.34), ease: EASE }}
                  />
                </span>
              ))}
            </span>

            <span className="sr-only">{filled}% tamamlandı</span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={done ? "result" : `q-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: dur(0.26), ease: EASE }}
            >
              {done ? (
                <Result
                  answers={answers}
                  onGoTo={goTo}
                  onRestart={restart}
                  focusOnMount={started}
                />
              ) : (
                <Ask
                  index={step}
                  answer={answers[step]}
                  onPick={pick}
                  focusOnMount={started}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* --------------------------------------------------------- gezinme
              Sonuç ekranında yok: oradaki çıkışlar Result'ın kendi eylem
              satırında (devam et · karşılaştır · baştan). */}
          {!done && (
            <div className="ft-nav">
              <button
                type="button"
                className="ft-prev"
                onClick={() => goTo(step - 1)}
                disabled={step === 0}
              >
                <ArrowLeft size={15} strokeWidth={2.1} />
                Önceki
              </button>

              {answered > 0 && (
                <button type="button" className="ft-reset" onClick={restart}>
                  <RotateCcw size={14} strokeWidth={2.1} />
                  Baştan
                </button>
              )}

              <button
                type="button"
                className="btn btn-solid btn-sm ft-next"
                onClick={() => goTo(seenResult ? FIT_TOTAL : step + 1)}
                disabled={!picked}
              >
                {nextLabel}
                <ArrowRight size={15} strokeWidth={2.1} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
