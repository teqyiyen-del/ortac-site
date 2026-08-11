"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";

import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import {
  FIT_CEIL,
  FIT_PARTS,
  FIT_PART_INDEXES,
  FIT_QUESTIONS,
  FIT_TOTAL,
  emptyFitAnswers,
  fitBlurb,
  fitTotals,
  scoreFit,
} from "@/lib/fitTest";
import { ANK_ICONS } from "@/components/lab/anketIkon";

/* ============================================================================
   ADAY 2 · FÖY — ad alanı .ank2- · CSS: src/app/css/lab-ank2.css

   ---------------------------------------------------------------------------
   BU ADAYIN TEK CÜMLESİ: DOKUZ EKRAN DEĞİL, ÜÇ FÖY.

   Teşhis iki şey söylüyordu ve ikisi de ölçüldü:
     · bir soru ekranında 52 metin bloğu var, sorunun kendisi 7'si
     · dokuz soru 18 tıklama ve 1400 px'de 10.770 px fare yolu demek

   SAHNE (aday 1) birinci sayıya saldırıyor. FÖY İKİNCİSİNE: soru sayısını
   değil EKRAN sayısını düşürüyor. Dokuz soru zaten üç bölüme ayrılmıştı
   (fitTest.ts · FIT_PARTS); bu aday o bölümü bir sayfa yapıyor. Üç soru aynı
   föyde, alt alta, hepsi görünür.

   NE KAZANIYOR
     · ekran: 9 → 3 · ilerleme düğmesi: 9 → 3 · tıklama: 18 → 12
     · "kaç soru kaldı" sorusu ekranın kendisinden cevaplanıyor, ayrı bir
       ray gerekmiyor (canlıdaki ray 101 element ve 29 metin bloğuydu)
     · bir cevabı düzeltmek için geri gitmek yok: üçü de aynı föyde

   NE KAYBEDİYOR
     · Bir föyde üç soru = bir ekranda daha fazla metin. Bu bilerek: sayfa
       başına yük artıyor ama TOPLAM yük ve geçiş sayısı düşüyor. Kıyas
       tablosunda ikisi de ayrı satır, çünkü ikisi ayrı şey.

   ---------------------------------------------------------------------------
   "GOOGLE ANKET PANELİ GİBİ DURSUN" EN ÇOK BU ADAYDA

   Müşterinin önceki turdan gelen ve hâlâ geçerli cümlesi buydu. Bir anket
   panelinin yapısı tam olarak şu: numaralı soru, altında şıklar, bir bölüm
   başlığı, en altta tek bir ilerleme düğmesi. Aday o yapıyı taklit etmiyor,
   onu kuruyor; farkı marka dili (lucide + vektör bayrak) ve bölüm bandı.

   ---------------------------------------------------------------------------
   BÖLÜM SATIRI GERİ GELDİ — VERİ ZATEN DURUYORDU

   FIT_PARTS[].line üç cümle: "Kime satıyorsunuz, ne satıyorsunuz, parayı nasıl
   alıyorsunuz." gibi. Müşteri bu satırları geçen tur SOL RAYDAN kaldırttı
   ("başlıkların altında yer alan kısa açıklamalara gerek yok") ve fitTest.ts
   verisi bilerek silmedi. İstek yerinde bir istekti: rayda üç açıklama DOKUZ
   EKRAN BOYUNCA duruyordu, yani 27 kez okutuluyordu. Bu adayda aynı cümle
   bölüm başına BİR KEZ ve bölümün kendi başlığının altında görünüyor. Yani
   kaldırılan şey metin değil TEKRARDI; föy yapısında tekrar yok.

   ---------------------------------------------------------------------------
   PUAN ŞERİDİ KALIYOR, ÇÜNKÜ ARTIK ÜÇ EKRAN VAR

   Müşteri paneli geçen tur özellikle geri istemişti ("ülkelerin sürekli puan
   kazandığı sistemi geri getirebiliriz ya o dursun"). Canlıda panel 275,6 px
   ve sorunun kendisi 279,4 px, yani panel soruyla aynı büyüklükte. Burada
   şerit 3 satır değil 3 SÜTUN ve föyün dibinde: dokuz kez değil üç kez
   okunuyor.

   EŞİT PUAN EŞİT PİKSEL. Canlıda ölçülen kaza (tam beraberlikte Dubai'nin
   çubuğu İngiltere'ninkinden 15,5 px uzun) burada yapısal olarak imkânsız:
   üç sütun `repeat(3, minmax(0,1fr))`, yani ray üçünde de birebir aynı
   genişlikte ve ülke adı rayın içinde değil üstünde.

   ÇUBUK PAYDASI SABİT (FIT_CEIL = 26). "O anki en yüksek puan" paydası, puanı
   hiç değişmeyen bir ülkenin çubuğunu geri götürebiliyordu; sabit paydayla
   çubuk yalnızca uzuyor.
   ========================================================================= */

export default function AnketFoy() {
  /* 0..2 = bölüm föyü · 3 = sonuç föyü */
  const [sheet, setSheet] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(emptyFitAnswers);

  const done = sheet >= FIT_PARTS.length;
  const answered = answers.filter((a) => a !== null).length;
  const totals = fitTotals(answers);

  const pick = (qi: number, oi: number) =>
    setAnswers((prev) => {
      const next = [...prev];
      next[qi] = oi;
      return next;
    });

  const part = done ? FIT_PARTS[FIT_PARTS.length - 1] : FIT_PARTS[sheet];
  const idx = FIT_PART_INDEXES[part.id];
  const partDone = idx.every((i) => answers[i] !== null);

  return (
    <div className="ank2-app">
      {/* ------------------------------------------------------------ SEKME
          Üç bölüm + sonuç. Canlıdaki dokuz düğümlü rayın yerine dört düğüm.
          Gezinme yalnızca GERİYE ve tamamlanmış föye açık: ileri atlamak,
          cevapsız sorularla sonuca varmanın kestirme yolu olurdu.
          .akt kabı: üç bölüm işareti sırayla yanıyor (mekanizma aktarim.css). */}
      <ol className="ank2-tabs akt">
        {FIT_PARTS.map((p, i) => {
          const PIcon = ANK_ICONS[p.icon];
          const pIdx = FIT_PART_INDEXES[p.id];
          const n = pIdx.filter((qi) => answers[qi] !== null).length;
          const state = !done && i === sheet ? "now" : n === pIdx.length ? "done" : "todo";
          return (
            <li key={p.id} className="ank2-tab" data-state={state}>
              <button
                type="button"
                className="ank2-tab-b"
                disabled={i > sheet}
                aria-current={!done && i === sheet ? "step" : undefined}
                /* Ad AÇIKÇA veriliyor: görsel olarak gizli span'lerle ad vermek
                   bu depoda üç kez tutmadı, düğme adsız kaldı. Görünen metin
                   adın başında, yani "label in name" bozulmuyor. */
                aria-label={`Bölüm ${i + 1}: ${p.title}. ${pIdx.length} sorunun ${n} tanesi cevaplandı.`}
                onClick={() => setSheet(i)}
              >
                <span
                  className="ank2-tab-d akt-durak"
                  aria-hidden="true"
                  style={{ "--akt-i": i } as React.CSSProperties}
                >
                  <PIcon size={22} strokeWidth={1.9} />
                </span>
                <span className="ank2-tab-b2">
                  <span className="ank2-tab-n">Bölüm {i + 1}</span>
                  <span className="ank2-tab-t">{p.title}</span>
                </span>
                <span className="ank2-tab-c" aria-hidden="true">
                  {n} / {pIdx.length}
                </span>
              </button>
            </li>
          );
        })}
        <li className="ank2-tab" data-state={done ? "now" : "todo"}>
          <button
            type="button"
            className="ank2-tab-b"
            disabled={answered < FIT_TOTAL}
            aria-label={
              answered < FIT_TOTAL
                ? `Sonuç. Dokuz sorunun ${answered} tanesi cevaplandı, sonuç için hepsi gerekiyor.`
                : "Sonuç"
            }
            onClick={() => setSheet(FIT_PARTS.length)}
          >
            <span className="ank2-tab-d" aria-hidden="true">
              <Check size={22} strokeWidth={2.2} />
            </span>
            <span className="ank2-tab-b2">
              <span className="ank2-tab-n">Föy 4</span>
              <span className="ank2-tab-t">Sonuç</span>
            </span>
            <span className="ank2-tab-c" aria-hidden="true">
              {answered} / {FIT_TOTAL}
            </span>
          </button>
        </li>
      </ol>

      {/* key: föy değişince kâğıt sökülüp takılıyor, giriş animasyonu baştan. */}
      <div className="ank2-sheet" key={done ? "res" : part.id}>
        {done ? (
          <FoySonuc answers={answers} onAgain={() => { setAnswers(emptyFitAnswers()); setSheet(0); }} />
        ) : (
          <>
            {/* BÖLÜM BANDI — renkli yüzeyin kendisi. Kartın kenarına renkli
                ince şerit ÇEKİLMİYOR (depo kuralı); renk bandın alanında. */}
            <div className="ank2-band">
              <span className="ank2-band-d" aria-hidden="true">
                {(() => {
                  const BIcon = ANK_ICONS[part.icon];
                  return <BIcon size={34} strokeWidth={1.9} />;
                })()}
              </span>
              <div className="ank2-band-b">
                <p className="ank2-band-n">
                  Bölüm {sheet + 1} / {FIT_PARTS.length}
                </p>
                <h4 className="ank2-band-t">{part.title}</h4>
                {/* Veri fitTest.ts · FIT_PARTS[].line. Sol raydan kaldırılmıştı
                    çünkü orada dokuz ekran boyunca duruyordu; burada bölüm
                    başına bir kez okunuyor. */}
                <p className="ank2-band-l">{part.line}</p>
              </div>
            </div>

            <ol className="ank2-qs">
              {idx.map((qi, row) => {
                const q = FIT_QUESTIONS[qi];
                const QIcon = ANK_ICONS[q.icon];
                return (
                  <li key={q.id} className="ank2-qi" style={{ "--ank2-r": row } as React.CSSProperties}>
                    {/* role="group" + aria-label: <fieldset> + <legend> bu
                        tarayıcıda ağaca ADLI GRUP olarak çıkmıyor, ölçüldü
                        (üç varyantın karşılaştırması AnketSahne.tsx'te
                        yazılı). Ad numarayı da içeriyor çünkü föyde üç soru
                        aynı anda ekranda: ekran okuyucu kullanan kişinin
                        hangi soruda olduğunu grubun adından bilmesi gerekiyor. */}
                    <fieldset
                      className="ank2-fs"
                      data-on={answers[qi] !== null ? "" : undefined}
                      role="group"
                      aria-label={`Soru ${qi + 1}: ${q.q}`}
                    >
                      <legend className="ank2-qh">
                        <span className="ank2-qn" aria-hidden="true">
                          {String(qi + 1).padStart(2, "0")}
                        </span>
                        <span className="ank2-qd" aria-hidden="true">
                          <QIcon size={20} strokeWidth={1.9} />
                        </span>
                        <span className="ank2-qt">{q.q}</span>
                      </legend>
                      {q.help ? <p className="ank2-qhelp">{q.help}</p> : null}

                      {/* ÇİP + GİZLİ RADIO. <select> yasak; görünen şey çip,
                          altında yerli <input type="radio">. */}
                      <div className="ank2-chips">
                        {q.options.map((o, oi) => {
                          const OIcon = o.icon ? ANK_ICONS[o.icon] : null;
                          return (
                            <label
                              key={o.id}
                              className="ank2-chip"
                              data-on={answers[qi] === oi ? "" : undefined}
                            >
                              <input
                                type="radio"
                                name={`ank2-${q.id}`}
                                value={o.id}
                                checked={answers[qi] === oi}
                                onChange={() => pick(qi, oi)}
                                aria-label={o.hint ? `${o.label}. ${o.hint}` : o.label}
                              />
                              {OIcon ? (
                                <span className="ank2-chip-i" aria-hidden="true">
                                  <OIcon size={18} strokeWidth={1.9} />
                                </span>
                              ) : null}
                              <span className="ank2-chip-t">{o.label}</span>
                              {o.hint ? <span className="ank2-chip-h">{o.hint}</span> : null}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  </li>
                );
              })}
            </ol>

            {/* -------------------------------------------------- PUAN ŞERİDİ
                Üç SÜTUN, üçü de `minmax(0,1fr)`: ray üçünde de birebir aynı
                genişlikte, yani eşit puan eşit piksel. Payda sabit (FIT_CEIL),
                yani çubuk yalnızca uzuyor. Puan gerçek metin, çubuk aria-hidden.
                TUZAK H: bayrak kabı sabit piksel + overflow gizli. */}
            <div className="ank2-tally">
              <p className="ank2-tally-h">
                Puan durumu
                <span className="ank2-tally-n">
                  {answered} / {FIT_TOTAL} cevap
                </span>
              </p>
              <ul className="ank2-tally-l">
                {totals.map((t) => (
                  <li key={t.country} className="ank2-tally-i" data-zero={t.pts === 0 ? "" : undefined}>
                    <span className="ank2-flagbox" aria-hidden="true">
                      <Flag country={t.country} />
                    </span>
                    <span className="ank2-tally-c">{COUNTRY_NAMES[t.country]}</span>
                    <span className="ank2-tally-p">{t.pts} puan</span>
                    <span className="ank2-tally-bar" aria-hidden="true">
                      <span
                        className="ank2-tally-fill"
                        style={{ "--ank2-w": t.pts / FIT_CEIL } as React.CSSProperties}
                      />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="ank2-tally-note">
                Sıralama değil, listenin kendi sırası. Üç çubuk aynı ölçekte. İlk
                cevaplarda öne geçen ülke sonda çoğu zaman değişiyor.
              </p>
            </div>

            <div className="ank2-foot">
              <button
                type="button"
                className="ank2-back"
                onClick={() => setSheet((s) => s - 1)}
                disabled={sheet === 0}
              >
                <ArrowLeft size={15} strokeWidth={2.1} />
                Önceki bölüm
              </button>
              <button
                type="button"
                className="btn btn-solid btn-sm ank2-go"
                onClick={() => setSheet((s) => s + 1)}
                disabled={!partDone}
              >
                {sheet === FIT_PARTS.length - 1 ? "Sonucu gör" : "Sonraki bölüm"}
                <ArrowRight size={15} strokeWidth={2.1} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- SONUÇ ---
   SONUÇ DÖRDÜNCÜ FÖY. Ayrı bir sayfa değil, aynı yığının bir kâğıdı daha:
   sekme şeridi yerinde duruyor ve geriye dönmek bir tıklama. Adayın ayrışma
   eksenlerinden biri bu (SAHNE'de sonuç sorunun yerine geliyor, PANO'da
   göstergenin içinde açılıyor). */
function FoySonuc({
  answers,
  onAgain,
}: {
  answers: (number | null)[];
  onAgain: () => void;
}) {
  const r = scoreFit(answers);
  const b = fitBlurb(r.top);

  return (
    <div className="ank2-res">
      <div className="ank2-band" data-res="">
        <span className="ank2-band-d" aria-hidden="true">
          <Check size={34} strokeWidth={2.2} />
        </span>
        <div className="ank2-band-b">
          <p className="ank2-band-n">Föy 4 / 4</p>
          <h4 className="ank2-band-t">
            {r.tieCount === 3
              ? "Üç ülke de eşit puanda"
              : r.tie
                ? `${COUNTRY_NAMES[r.top]} ile ${COUNTRY_NAMES[r.runnerUp]} başa baş`
                : `${COUNTRY_NAMES[r.top]} öne çıkıyor`}
          </h4>
          <p className="ank2-band-l">Dokuz cevap değerlendirildi.</p>
        </div>
      </div>

      <ol className="ank2-res-l">
        {r.standings.map((s, i) => (
          <li key={s.country} className="ank2-res-i" data-first={i === 0 ? "" : undefined}>
            <span className="ank2-res-o" aria-hidden="true">
              {i + 1}
            </span>
            <span className="ank2-flagbox" aria-hidden="true">
              <Flag country={s.country} />
            </span>
            <span className="ank2-res-n">{COUNTRY_NAMES[s.country]}</span>
            <span className="ank2-res-p">{s.pts} puan</span>
          </li>
        ))}
      </ol>

      <p className="ank2-res-t">{b.intro}</p>
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

      <button type="button" className="ank2-back" onClick={onAgain}>
        <RotateCcw size={14} strokeWidth={2.1} />
        Baştan
      </button>
    </div>
  );
}
