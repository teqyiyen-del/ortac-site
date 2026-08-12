"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, RotateCcw } from "lucide-react";

import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import {
  FIT_CEIL,
  FIT_PARTS,
  FIT_QUESTIONS,
  FIT_TOTAL,
  emptyFitAnswers,
  fitBlurb,
  fitTotals,
  scoreFit,
} from "@/lib/fitTest";
import { ANK_HARF, ANK_ICONS } from "@/components/lab/anketIkon";

/* ============================================================================
   ADAY 3 · AKIŞ — ad alanı .ank3- · CSS: src/app/css/lab-ank3.css

   ---------------------------------------------------------------------------
   BU ADAY NEDEN VAR

   Teşhis bu tur tersine döndü. Geçen tur üç aday da canlının sol rayını ve
   puan panelini SİLDİ; müşteri üçünü de gördü ve "hâlâ canlıdaki hali daha
   iyi" dedi. Yani silinen şey gürültü değildi.

   Yeniden ölçüldü (5. soru, dört cevap girilmiş, 1400 px):
     · canlı ekranın %25,71'i ziyaretçinin KENDİ KAYDINA ayrılmış
       (236.903 px² / 921.279 px²): dört cevaplanmış ray satırı + puan paneli
     · 52 metin bloğunun 7'si ziyaretçinin kendi cevabı ya da onun ürettiği sayı
     · görülmüş herhangi bir soruya TEK TIKLA dönüş: 5 hedef
   Aday 1'de (SAHNE) aynı üç sayı 0 px², 0 blok, 0 hedef; 5. sorudan 1. soruya
   dönmek canlıda 1 tıklama, SAHNE'de 4.

   Canlının doğru yaptığı şey bu: kaydı ekranda tutmak. O kayıt asla yanlış
   olamaz, çünkü tahmin değil olan biten. (Karşılaştırın: elenen PANO ekranın
   büyük kısmını bir ÖNGÖRÜYE ayırıyordu ve fitTest.ts o öngörünün ilk cevapta
   %48,7 tuttuğunu ölçmüş.)

   ---------------------------------------------------------------------------
   AKIŞ NE YAPIYOR

   Kaydı geri getiriyor ama ONA AYRI BİR BÖLGE AÇMIYOR. Cevaplanan soru kendi
   cevabına KATLANIYOR ve listede kendi yerinde kalıyor: dokuz soru tek bir
   sütunda, yukarıdan aşağı. Sol kenarda bir omurga çizgisi var ve her sorunun
   diski onun üstünde duruyor; katlanmış soruların diskinde SİZİN SEÇTİĞİNİZ
   ŞIKKIN ikonu var. Yani omurga boyunca yukarı bakınca verdiğiniz cevapları
   ikon ikon görüyorsunuz. Anlatmak yerine göstermek tam olarak bu.

   Toplam kartı akışın SONUNDA duruyor ve siz ilerledikçe aşağı iniyor. Sabit
   bir puan paneli değil, akışın son halkası.

   ---------------------------------------------------------------------------
   AYRIŞMA EKSENİ (Aday 2 · DEFTER ile) — renk ya da kabuk değil, YAPI

   DEFTER: durum AYRI BİR YERDE durur. Soru her adımda tam olarak aynı
           pikselde, defter sağda birikir, sayfanın boyu hiç değişmez.
   AKIŞ:   ayrı bir durum bölgesi YOKTUR. Cevap sorunun kendi yerinde kalır,
           açık soru aşağı doğru yürür, sayfa uzar.

   İkisi de canlının taşıdığı üç şeyi taşıyor (kendi cevapların, tek tıkla
   dönüş, canlı puan) ve ikisi de Aday 1'in tuttuğu şeyi tutuyor (açık soru
   ekranın en büyük öğesi). Ayrıldıkları tek yer o bilginin NEREDE durduğu.

   ---------------------------------------------------------------------------
   YENİ GÖRSEL DİL İCAT EDİLMEDİ

   Bentoya konan kürenin "diğerleriyle uyumsuz" diye geri alınması bu turun en
   taze dersi. Akışın hiçbir parçası yeni değil:
     · beyaz kart gövdesi + içinde gece bir panel  → globals.css .hx-card/.hx-stage
     · lucide ikon, strokeWidth 1.9                → sitenin tek ikon dili
     · yuvarlak bayrak diski, sabit px + overflow  → .hx-flag-f kalıbı
     · enerji geçişi (omurga → toplam)             → css/aktarim.css .akt/.akt-durak
     · tek marka mavisi                            → --blue-700

   ---------------------------------------------------------------------------
   HAREKET

   Tamamı CSS'te ve `prefers-reduced-motion: no-preference` kapısının içinde.
   Bu dosyada tek satır hareket kodu yok (useReducedMotion bu depoda yasak:
   render ağacında okunduğu beş kalıpta hidrasyon hatası çıkardı).

   İki sürekli periyot, ikisi de bu tur seçildi ve yüzde birlik ızgarada asal:
     13.01 s  omurgadan toplama akan enerji
     16.99 s  gece toplam kartının ışık kayması
   ========================================================================= */

const pad = (n: number) => String(n).padStart(2, "0");

export default function AnketAkis() {
  /* 0..8 = açık soru · FIT_TOTAL = sonuç. AÇILIŞ PERDESİ YOK: akışın ilk
     karesinde zaten bölüm başlığı, birinci soru ve sayaç var, yani perdenin
     söyleyeceği şey ekranda. */
  const [open, setOpen] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(emptyFitAnswers);
  /* Görülmüş en uzak soru. İleri atlamak yok: cevaplanmamış sorularla sonuca
     varmanın kestirme yolu olurdu (canlı testin kuralı, aynen korundu). */
  const [furthest, setFurthest] = useState(0);
  const box = useRef<HTMLFieldSetElement>(null);

  const done = open >= FIT_TOTAL;
  const answered = answers.filter((a) => a !== null).length;

  /* Odak yalnızca AÇIK SORU DEĞİŞİNCE geziniyor, ilk boyamada değil: sayfa bir
     lab sayfası, üç aday alt alta duruyor ve birinin odağı çalması ötekini
     okumayı bozardı. "Başladı" durumdan türetiliyor, ref'ten değil (effect'te
     yazılan ref bir sonraki render'a kadar bayat kalıyor). */
  const started = open > 0 || answered > 0;
  useEffect(() => {
    if (done || !started) return;
    const g = box.current;
    if (!g) return;
    const t =
      g.querySelector<HTMLInputElement>("input:checked") ??
      g.querySelector<HTMLInputElement>("input");
    t?.focus({ preventScroll: true });
    /* started ilk tıklamadan sonra sabit true; bağımlılığı açık soru. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const goTo = (at: number) => {
    setOpen(at);
    setFurthest((f) => Math.max(f, Math.min(at, FIT_TOTAL - 1)));
  };

  const pick = (oi: number) =>
    setAnswers((prev) => {
      const next = [...prev];
      next[open] = oi;
      return next;
    });

  const restart = () => {
    setAnswers(emptyFitAnswers());
    setFurthest(0);
    setOpen(0);
  };

  /* AKIŞTA HANGİ SORULAR VAR: görülmüş olanlar. Görülmemiş soru listede
     DURMUYOR ve bu bilerek. Canlı ray dokuz sorunun dokuzunu da her ekranda
     basıyor, yani beş soru boyunca ekranda dört tane "—" duruyor; ölçüldü,
     rayın 29 metin bloğunun 5'i boş cevap işareti. Kaç soru olduğu akışın
     üstündeki sayaçta yazılı, o yüzden boş satırların taşıdığı ek bilgi yok. */
  const shown = done ? FIT_TOTAL - 1 : Math.max(furthest, open);

  return (
    <div className="ank3-app">
      {/* SAYAÇ — akışın tek sabit satırı. "Kaç soru var" ve "neredeyim"
          sorularının cevabı; canlıda bu iki cevap sol rayda 9 satır, üstte bir
          çubuk ve bir yüzde ile veriliyordu. */}
      <div className="ank3-top">
        <p className="ank3-count">
          {done ? (
            "Anket tamamlandı"
          ) : (
            <>
              <b>{pad(open + 1)}</b> / {FIT_TOTAL}
            </>
          )}
        </p>
        <div
          className="ank3-line"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={FIT_TOTAL}
          aria-valuenow={answered}
          aria-label="Cevaplanan soru sayısı"
        >
          <span
            className="ank3-line-run"
            style={{ "--ank3-w": answered / FIT_TOTAL } as React.CSSProperties}
          />
        </div>
      </div>

      {/* AKIŞ — omurga çizgisi ve onun üstünde duran diskler. .akt kabı:
          enerji omurgadan toplam kartına geçiyor. */}
      <ol className="ank3-flow akt">
        {/* OMURGA GERÇEK BİR ÖĞE, ::before DEĞİL. Kalıbın bilinen sınırı:
            .akt-durak bir sınıf, pseudo-element durak olamaz (aktarim.css ·
            BİLİNEN SINIR). Zincirin en çok ışık taşıması gereken parçası tam
            olarak bu çizgi olduğu için sözleşmenin (a) şıkkına düşülmedi
            ("teli statik bırak"), çizgi gerçek bir <span> yapıldı. */}
        <span className="ank3-spine akt-durak" aria-hidden="true" />

        {FIT_QUESTIONS.slice(0, shown + 1).map((q, qi) => {
          const a = answers[qi];
          const partStart = FIT_PARTS.findIndex((p) => p.id === q.part);
          const first = qi === 0 || FIT_QUESTIONS[qi - 1].part !== q.part;
          const P = ANK_ICONS[FIT_PARTS[partStart].icon];
          const QIcon = ANK_ICONS[q.icon];
          const o = a !== null ? q.options[a] : null;
          const OIcon = o?.icon ? ANK_ICONS[o.icon] : null;
          const isOpen = qi === open && !done;

          return (
            <li key={q.id} className="ank3-item">
              {/* BÖLÜM BAŞLIĞI akışın içinde bir ayraç. Canlıda bölüm bilgisi
                  sol rayda üç ayrı kutu; burada sırası gelince bir kez
                  geçiyor ve geçtikten sonra yerinde kalıyor. */}
              {first ? (
                <p className="ank3-part">
                  <span className="ank3-part-i" aria-hidden="true">
                    <P size={17} strokeWidth={1.9} />
                  </span>
                  Bölüm {partStart + 1} · {FIT_PARTS[partStart].title}
                </p>
              ) : null}

              {isOpen ? (
                /* AÇIK SORU — ADAY 1'İN TUTTUĞU ŞEY BURADA. Ölçüm: canlıda
                   soru cümlesi 16 px ve soru bölgesi ekranın %20,56'sı,
                   SAHNE'de 34 px ve %75,12. Açık soru akışın en büyük öğesi.
                   role="group" + aria-label ÖLÇÜMLE GELDİ: <fieldset> +
                   <legend> bu tarayıcıda ağaçta ADLI BİR GRUP üretmiyor,
                   legend adsız bir `generic` olarak duruyor. Üç varyant
                   denendi; grup düğümünü yalnızca explicit role + aria-label
                   veriyor. <legend> DURUYOR, görünen başlık o. */
                <fieldset
                  className="ank3-open"
                  key={`${q.id}-open`}
                  ref={box}
                  role="group"
                  aria-label={q.q}
                >
                  {/* <legend> FİELDSET'İN İLK ÇOCUĞU OLMAK ZORUNDA (içerik
                      modeli). Diskin ve filigranın ikisi de mutlak konumlu,
                      yani DOM sırası görünen sırayı değiştirmiyor; legend'i
                      öne almak yalnızca işaretlemeyi geçerli kılıyor. */}
                  <legend className="ank3-q">{q.q}</legend>
                  <span className="ank3-dot" data-state="now" aria-hidden="true">
                    <QIcon size={26} strokeWidth={1.9} />
                  </span>
                  {/* FİLİGRAN: sorunun kendi ikonu, 108 px. Aday 1'de ölçülen
                      karar aynen sürüyor (canlıda en büyük çizim 20×20 px,
                      yani 400 px²; burada 11.664 px²). aria-hidden, çünkü
                      soru cümlesinin tekrarı. */}
                  <span className="ank3-mark" aria-hidden="true">
                    <QIcon size={108} strokeWidth={1.9} />
                  </span>
                  {q.help ? <p className="ank3-help">{q.help}</p> : null}

                  <div className="ank3-opts">
                    {q.options.map((opt, oi) => {
                      const Ic = opt.icon ? ANK_ICONS[opt.icon] : null;
                      return (
                        <label
                          key={opt.id}
                          className="ank3-opt"
                          data-on={a === oi ? "" : undefined}
                          style={{ "--ank3-o": oi } as React.CSSProperties}
                        >
                          {/* AÇILIR KUTU YOK: görünen çip + yerli radio.
                              aria-label açıkça veriliyor; etiketsiz radyo bu
                              depoda "on" diye okunuyordu. Görünen metin adın
                              başında (label in name). */}
                          <input
                            type="radio"
                            name={`ank3-${q.id}`}
                            value={opt.id}
                            checked={a === oi}
                            onChange={() => pick(oi)}
                            aria-label={opt.hint ? `${opt.label}. ${opt.hint}` : opt.label}
                          />
                          <span className="ank3-opt-d" aria-hidden="true">
                            {Ic ? <Ic size={21} strokeWidth={1.9} /> : ANK_HARF[oi]}
                          </span>
                          <span className="ank3-opt-b">
                            <span className="ank3-opt-t">{opt.label}</span>
                            {opt.hint ? <span className="ank3-opt-h">{opt.hint}</span> : null}
                          </span>
                          <span className="ank3-opt-m" aria-hidden="true">
                            <Check size={15} strokeWidth={2.8} />
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="ank3-foot">
                    <button
                      type="button"
                      className="btn btn-solid btn-sm ank3-go"
                      onClick={() => goTo(qi + 1)}
                      disabled={a === null}
                    >
                      {qi === FIT_TOTAL - 1 ? "Sonucu gör" : "Devam"}
                      <ArrowRight size={15} strokeWidth={2.1} />
                    </button>
                  </div>
                </fieldset>
              ) : (
                /* KATLANMIŞ SORU — cevabıyla birlikte, kendi yerinde.
                   Ad AÇIKÇA veriliyor: bu depoda görsel olarak gizli
                   <span>'lerle ad vermek üç kez tutmadı, düğme adsız kaldı.
                   Görünen metin (kısa ad) adın başında. */
                <button
                  type="button"
                  className="ank3-fold"
                  data-nil={a === null ? "" : undefined}
                  onClick={() => goTo(qi)}
                  aria-label={
                    o
                      ? `${q.short}. Cevabınız: ${o.label}. Bu soruyu yeniden aç.`
                      : `${q.short}. Cevaplanmadı. Bu soruyu aç.`
                  }
                >
                  <span className="ank3-dot" data-state={o ? "done" : "todo"} aria-hidden="true">
                    {o ? (
                      OIcon ? (
                        <OIcon size={19} strokeWidth={1.9} />
                      ) : (
                        ANK_HARF[a as number]
                      )
                    ) : (
                      <QIcon size={19} strokeWidth={1.9} />
                    )}
                  </span>
                  <span className="ank3-fold-b">
                    <span className="ank3-fold-t">{q.short}</span>
                    <span className="ank3-fold-a">{o ? o.label : "Cevaplanmadı"}</span>
                  </span>
                </button>
              )}
            </li>
          );
        })}

        {/* SON HALKA — toplam ya da sonuç. Sabit bir bölge DEĞİL: akışın
            içinde, en altta duruyor ve siz ilerledikçe aşağı iniyor. Canlıda
            ilk cevaptan sonra beliren .ft-sig panelinin karşılığı, aynı kural:
            cevap yokken puan da yok. */}
        {done ? (
          <li className="ank3-item ank3-item-end">
            <AkisSonuc answers={answers} onAgain={restart} />
          </li>
        ) : answered > 0 ? (
          <li className="ank3-item ank3-item-end">
            <AkisToplam answers={answers} answered={answered} />
          </li>
        ) : null}
      </ol>
    </div>
  );
}

/* ---------------------------------------------------------------- TOPLAM ----
   Gece panel, akışın son halkası. Canlıdaki .ft-sig tablosunun taşıdığı
   bilginin tamamı burada: üç ülke, puanları, çubukları ve panelin dürüst
   karşı ağırlığı. */
function AkisToplam({ answers, answered }: { answers: (number | null)[]; answered: number }) {
  const totals = fitTotals(answers);

  return (
    <div className="ank3-tot">
      <p className="ank3-tot-h">
        <span className="ank3-tot-i akt-durak" aria-hidden="true">
          <Check size={16} strokeWidth={2.4} />
        </span>
        Puan durumu
        <span className="ank3-tot-n">
          {answered} / {FIT_TOTAL} cevap
        </span>
      </p>

      {/* IZGARA SATIRDA DEĞİL LİSTEDE (subgrid). Canlıda ölçülmüş bir kusuru
          kapatıyor: satır kendi ızgarası olunca ad sütunu satırdan satıra
          farklı genişlikte oturuyor ve 1fr'lik çubuk rayı ondan artanı
          alıyordu; tam beraberlikte Dubai'nin çubuğu İngiltere'ninkinden
          15,5 px uzun çıkıyordu. EŞİT PUAN EŞİT PİKSEL. */}
      <ul className="ank3-tot-list">
        {totals.map((t, i) => (
          <li key={t.country} className="ank3-tot-row" data-zero={t.pts === 0 ? "" : undefined}>
            {/* TUZAK H — <Flag> çıplak <svg viewBox="0 0 60 40"> basıyor,
                width/height YOK; kapsız bırakılırsa 300×150'ye şişiyor ve bu
                depoda iki sayfayı bozdu. Kap sabit px + overflow hidden. */}
            <span
              className="ank3-tot-f akt-durak"
              aria-hidden="true"
              style={{ "--akt-i": 2 + i * 0.16 } as React.CSSProperties}
            >
              <Flag country={t.country} />
            </span>
            <span className="ank3-tot-name">{COUNTRY_NAMES[t.country]}</span>
            <span className="ank3-tot-bar" aria-hidden="true">
              {/* Payda SABİT (FIT_CEIL = 26), "o anki en yüksek puan" değil.
                  Canlıda ölçülmüştü: değişken paydayla aynı 1 puanlık fark
                  testin başında 249,8 px, sonunda 55,5 px görünüyor ve bir
                  çubuk puanı hiç değişmeden geri gidebiliyordu. */}
              <span
                className="ank3-tot-fill"
                style={{ "--ank3-w": t.pts / FIT_CEIL } as React.CSSProperties}
              />
            </span>
            {/* Puan GERÇEK METİN: çubuk aria-hidden, bilgi buradan okunuyor. */}
            <span className="ank3-tot-p">{t.pts} puan</span>
          </li>
        ))}
      </ul>

      {/* Panelin bedeli, ekranda yazılı. fitTest.ts'te ölçülmüş iki olgu: ilk
          cevaptan sonra önde görünen ülke nihai birinciyi %48,7 tutturuyor;
          KKTC ilk cevapta %25 lider görünüp sonda %2,3'e düşüyor. Cümle sayı
          vermeden ama uydurmadan aktarıyor. */}
      <p className="ank3-tot-note">
        Sıralama değil, sayaç. İlk cevaplarda öne geçen ülke sonda çoğu zaman değişiyor.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- SONUÇ ---
   AKIŞIN SON HALKASININ YERİNE GELİYOR ve dokuz katlanmış soru yukarıda
   olduğu gibi duruyor. Adayın yapısal iddiası bu: kayıt ayrı bir bölgede
   olmadığı için sonuç geldiğinde de kaybolmuyor.

   Cümleler uydurulmadı: ülke anlatımı countryContent.intro ve FACTS.limit'ten
   (fitBlurb), sıralama scoreFit'ten. Beraberlik yutulmuyor. */
function AkisSonuc({
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
      <p className="ank3-res-e">Sonuç</p>
      <h3 className="ank3-res-h">
        {r.tieCount === 3
          ? "Cevaplarınız üçünü de eşit puanda bırakıyor."
          : r.tie
            ? `${COUNTRY_NAMES[r.top]} ile ${COUNTRY_NAMES[r.runnerUp]} başa baş.`
            : `${COUNTRY_NAMES[r.top]} öne çıkıyor.`}
      </h3>

      <ol className="ank3-res-list">
        {r.standings.map((s, i) => (
          <li key={s.country} className="ank3-res-row" data-first={i === 0 ? "" : undefined}>
            <span className="ank3-res-f" aria-hidden="true">
              <Flag country={s.country} />
            </span>
            <span className="ank3-res-n">{COUNTRY_NAMES[s.country]}</span>
            <span className="ank3-res-p">{s.pts} puan</span>
          </li>
        ))}
      </ol>

      <p className="ank3-res-l">{b.intro}</p>
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

      <button type="button" className="ank3-again" onClick={onAgain}>
        <RotateCcw size={14} strokeWidth={2.1} />
        Baştan
      </button>
    </div>
  );
}
