"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";

import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import {
  FIT_PARTS,
  FIT_QUESTIONS,
  FIT_TOTAL,
  emptyFitAnswers,
  fitBlurb,
  fitPartOf,
  scoreFit,
} from "@/lib/fitTest";
import { ANK_HARF, ANK_ICONS } from "@/components/lab/anketIkon";

/* ============================================================================
   ADAY 1 · SAHNE — ad alanı .ank1- · CSS: src/app/css/lab-ank1.css

   ---------------------------------------------------------------------------
   BU ADAYIN TEK CÜMLESİ: EKRANDA BİR ŞEY VAR.

   Turun teşhisi ölçüldü (sayılar lab sayfasının en üstünde): canlı testte bir
   soru ekranında 232 element, 52 metin bloğu ve 20 okuma modu var; SORUNUN
   KENDİSİ bunun 51 elementi, 7 metin bloğu. Yani ziyaretçi cevaplayacağı şeyin
   yedi katı kadar metnin içinde onu arıyor. Müşterinin "karmaşık hissettirmeye
   başladı" cümlesinin sayısal karşılığı bu.

   SAHNE bu yükü SİLEREK çözüyor, yeniden düzenleyerek değil:
     · sol ray YOK        (canlıda 101 element · 29 metin bloğu · 604,8 px)
     · puan paneli YOK    (canlıda 57 element · 11 metin bloğu · 275,6 px)
     · sayaç TEK SATIR    (bölüm adı + "01 / 09"), üstte saç teli bir çizgi
   Geriye soru, şıklar ve iki düğme kalıyor.

   ---------------------------------------------------------------------------
   PEKİ "SIKICI" NE OLDU — silerek görsel eklenmez, o yüzden ÖLÇEK eklendi

   İkinci ölçüm: canlı panelde 21 SVG var ve toplam glif alanı 4.147 px², yani
   panelin %0,45'i. En büyük tek çizim 20×20 px, 1120 px genişliğinde bir
   panelin içinde. Müşterinin "iconlar durumu tamamen kurtarmadı çünkü çok geri
   planda kaldı gibi" cümlesi ölçümle DOĞRULANDI: ikonlar geri planda değil,
   yok denecek kadar küçük.

   Bu adayın cevabı yeni bir çizim dili icat etmek değil, VAR OLANI BÜYÜTMEK:
   sorunun kendi ikonu sahnenin arkasına 132 px filigran olarak basılıyor
   (alan olarak 20×20'nin 43 katı) ve şık ikonları 30 px'lik disklerde 26 px
   çiziliyor. Aynı lucide dili, aynı strokeWidth 1.9; değişen tek şey ölçek.

   EMOJİ KULLANILMADI — bilinçli. Müşterinin verdiği örneklerden biriydi
   ("hiçbir görsel, logo, emoji vb hiçbir şey yok") ama sitede tek bir emoji
   yok ve marka dili vektör + lucide. Emoji üç somut şeyi bozardı: (1) glifi
   işletim sistemi çiziyor, yani aynı soru macOS ve Windows'ta farklı
   görünürdü; (2) emoji renk paletini biz seçmiyoruz, marka mavisinin yanına
   rastgele altı renk girerdi; (3) ekran okuyucu emojiyi kendi adıyla okur
   ("kredi kartı emojisi"), yani şıkkın erişilebilir adı uzar. Yerine konan
   şey ölçek: aynı ikon, 43 kat alan.

   ---------------------------------------------------------------------------
   İKONSUZ ŞIKTA HARF VAR, GLİF DEĞİL

   fitTest.ts · İKON ANAHTARI kural 2 gereği bazı şıklar bilerek ikonsuz
   (bütçe bandı, takvim bandı, yer adları: aralarındaki fark DERECE, tür
   değil). O kutulara glif uydurmak yasak; boş bırakmak da bu turun teşhisine
   aykırı. Disk harfle doluyor (A · B · C · D). Harf süs değil: şıkkın sırasını
   söylüyor ve ekranda konuşurken ("C şıkkı") karşılığı var.

   ---------------------------------------------------------------------------
   HAREKET

   Hepsi CSS'te ve `prefers-reduced-motion: no-preference` kapısının içinde;
   bu dosyada tek satır hareket kodu yok (useReducedMotion bu depoda yasak,
   beş kalıpta hidrasyon hatası çıkardı). Adım geçişi `key` ile: düğüm sökülüp
   takılıyor, CSS giriş animasyonu kendiliğinden baştan oynuyor.

   Sürekli iki periyot var, ikisi de bu tur seçildi ve listede yok:
     12.13 s  filigranın süzülüşü      (1213 asal)
      7.19 s  ilerleme çizgisinin parlaması (719 asal)
   Seçim yöntemi: aktarim.css'teki tarama komutu çalıştırıldı (88 periyot),
   yüzde birlik ızgarada asal ve listedeki hiçbir periyot bu ikisinin katı
   değil.

   ---------------------------------------------------------------------------
   NELERİ FEDA EDİYOR — künyede de yazıyor, burada gerekçesiyle

   1. "Kaç soru kaldı" yalnızca sayaçta. Canlıdaki ray dokuz sorunun tamamını
      ve verilen cevapları ekranda tutuyordu; bu aday onu atıyor. Karşılığı:
      geri dönüp cevabını görmek için gerçekten geri gitmek gerekiyor.
   2. Test sürerken puan yok. Müşteri paneli geçen tur özellikle geri
      istemişti; bu aday onu sonuca erteliyor. Ölçülmüş bir kazancı var
      (fitTest.ts: ilk cevaptaki lider nihai birinciyi %48,7 tutturuyor) ama
      istenen bir şeyin geri alınması, yani karar müşterinin.
   ========================================================================= */

export default function AnketSahne() {
  /* -1 = açılış ekranı · 0..8 = soru · FIT_TOTAL = sonuç */
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<(number | null)[]>(emptyFitAnswers);
  const box = useRef<HTMLFieldSetElement>(null);

  const asking = step >= 0 && step < FIT_TOTAL;
  const answered = answers.filter((a) => a !== null).length;
  const here = fitPartOf(asking ? step : 0);

  /* Odak yalnızca SORU ekranları arasında geziniyor: açılışta ve ilk soruya
     girerken odak çalınmıyor (sayfa lab sayfası, üç aday alt alta duruyor ve
     birinin odağı çalması ötekini okumayı bozardı). */
  useEffect(() => {
    if (!asking || step === 0) return;
    const g = box.current;
    if (!g) return;
    const t =
      g.querySelector<HTMLInputElement>("input:checked") ??
      g.querySelector<HTMLInputElement>("input");
    t?.focus({ preventScroll: true });
  }, [step, asking]);

  const pick = (oi: number) =>
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = oi;
      return next;
    });

  if (step === -1) return <SahneAcilis onStart={() => setStep(0)} />;
  if (step >= FIT_TOTAL)
    return <SahneSonuc answers={answers} onAgain={() => { setAnswers(emptyFitAnswers()); setStep(-1); }} />;

  const q = FIT_QUESTIONS[step];
  const QIcon = ANK_ICONS[q.icon];
  const picked = answers[step] !== null;

  return (
    <div className="ank1-app">
      {/* İLERLEME: saç teli bir çizgi ve iki kelime. role="progressbar" yerli
          anlamı taşıyor, yüzde ayrıca gizli bir düğümde DEĞİL, ekranda yazılı
          metin (bu depoda görsel olarak gizli span'ler üç kez ağaca düşmedi).
          Bölüm sınırları çizginin üstünde iki çentik: dokuz eşit adım yerine
          "üç perde" okunuyor. */}
      <div
        className="ank1-rail"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={FIT_TOTAL}
        aria-valuenow={answered}
        aria-label="Cevaplanan soru sayısı"
      >
        <span
          className="ank1-rail-run"
          style={{ "--ank1-w": answered / FIT_TOTAL } as React.CSSProperties}
        />
        <span className="ank1-rail-tick" style={{ "--ank1-x": 3 / 9 } as React.CSSProperties} />
        <span className="ank1-rail-tick" style={{ "--ank1-x": 6 / 9 } as React.CSSProperties} />
      </div>

      <div className="ank1-top">
        <p className="ank1-where">
          {here.part.title}
          <span className="ank1-where-s">Bölüm {here.order + 1} / 3</span>
        </p>
        <p className="ank1-count">
          <b>{String(step + 1).padStart(2, "0")}</b> / {FIT_TOTAL}
        </p>
      </div>

      {/* key: adım değişince sahne sökülüp takılıyor, giriş animasyonu baştan. */}
      <div className="ank1-stage" key={q.id}>
        {/* FİLİGRAN: sorunun kendi ikonu, 132 px. Süs değil ölçek kararı —
            teşhisin ikinci yarısı ("ikonlar çok geri planda") tam olarak bu
            sayıya bakıyordu. aria-hidden, çünkü sorunun ikonu soru cümlesinin
            tekrarı; ağaca çıkarsa aynı şey iki kez okunur. */}
        <span className="ank1-mark" aria-hidden="true">
          <QIcon size={132} strokeWidth={1.9} />
        </span>

        {/* role="group" + aria-label REDUNDANT DEĞİL, ÖLÇÜMLE GELDİ.
            <fieldset> + <legend> bu tarayıcıda erişilebilirlik ağacına ADLI BİR
            GRUP OLARAK ÇIKMIYOR: ağaçta ne `group` düğümü var ne de soru
            cümlesi grubun adı oluyor; legend sıradan bir `generic` olarak
            görünüyor. Üç varyant tek tek denendi (canlı testin kendi
            fieldset'i üzerinde, aynı oturumda):
              yalnız <legend>                → grup düğümü YOK
              aria-label (rolsüz)            → `generic "…"`, hâlâ grup değil
              role="group" + aria-label      → `group "Müşterileriniz…"`  ✓
            Aynı kusur CANLI testte de var (aynı kalıp), bu turda oraya
            dokunulmadı, rapor edildi. <legend> DURUYOR: görünen başlık o ve
            explicit role verildiğinde adı aria-label taşıyor, yani iki ad
            çakışmıyor, aynı cümle. */}
        <fieldset className="ank1-fs" ref={box} role="group" aria-label={q.q}>
          <legend className="ank1-q">{q.q}</legend>
          {q.help ? <p className="ank1-help">{q.help}</p> : null}

          <div className="ank1-opts" data-n={q.options.length}>
            {q.options.map((o, oi) => {
              const OIcon = o.icon ? ANK_ICONS[o.icon] : null;
              return (
                <label
                  key={o.id}
                  className="ank1-opt"
                  data-on={answers[step] === oi ? "" : undefined}
                  style={{ "--ank1-o": oi } as React.CSSProperties}
                >
                  {/* AÇILIR KUTU YOK: görünen kutu + yerli radio. aria-label
                      açıkça veriliyor (etiketsiz radyo bu depoda "on" diye
                      okunuyordu) ve görünen metinle başlıyor. */}
                  <input
                    type="radio"
                    name={`ank1-${q.id}`}
                    value={o.id}
                    checked={answers[step] === oi}
                    onChange={() => pick(oi)}
                    aria-label={o.hint ? `${o.label}. ${o.hint}` : o.label}
                  />
                  <span className="ank1-opt-d" aria-hidden="true">
                    {OIcon ? <OIcon size={26} strokeWidth={1.9} /> : ANK_HARF[oi]}
                  </span>
                  <span className="ank1-opt-b">
                    <span className="ank1-opt-t">{o.label}</span>
                    {o.hint ? <span className="ank1-opt-h">{o.hint}</span> : null}
                  </span>
                  <span className="ank1-opt-m" aria-hidden="true">
                    <Check size={15} strokeWidth={2.8} />
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Düğmeler şıkların HEMEN altında. Canlıda soru ile bir sonraki tıklama
          arasındaki fare yolu ölçüldü (dokuz soruda 10.770 px); burada ileri
          düğmesi seçilen kutunun kaç piksel altındaysa yol o kadar. */}
      <div className="ank1-foot">
        <button
          type="button"
          className="ank1-back"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
        >
          <ArrowLeft size={15} strokeWidth={2.1} />
          Geri
        </button>
        <button
          type="button"
          className="btn btn-solid btn-sm ank1-go"
          onClick={() => setStep((s) => s + 1)}
          disabled={!picked}
        >
          {step === FIT_TOTAL - 1 ? "Sonucu gör" : "Devam"}
          <ArrowRight size={15} strokeWidth={2.1} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- AÇILIŞ ---
   Canlı testin açılışı yok: sayfa açılınca birinci soru ekranda. Bu aday bir
   açılış perdesi koyuyor çünkü sol rayı attı — ziyaretçinin "kaç soru, ne
   soruluyor" cevabını bir kez alması gerekiyor ve o cevabın yeri dokuz ekran
   boyunca duran bir ray değil, tek bir perde.
   ÜÇ BAYRAK BURADA, ŞIKLARDA DEĞİL: bayrak yalnızca ÜLKENİN KENDİSİ
   konuşulduğunda kullanılıyor (fitTest.ts · İKON ANAHTARI kural 1). Kap SABİT
   PİKSEL + overflow:clip — <Flag> çıplak <svg viewBox="0 0 60 40"> basıyor,
   width/height yok, kapsız bırakılırsa 300×150'ye şişip iki sayfa bozuyor. */
function SahneAcilis({ onStart }: { onStart: () => void }) {
  return (
    <div className="ank1-app">
      <div className="ank1-open">
        <p className="ank1-open-e">Uygunluk anketi</p>
        <h3 className="ank1-open-h">Dokuz soru, üç perde.</h3>
        <p className="ank1-open-l">
          Sorular işinizi, şirketin dünyaya bağlandığı yeri ve bütçe tarafını soruyor.
          Sonunda üç ülke puanlanıp sıralanıyor; ikinci sıra ve aradaki fark da yazılı.
        </p>

        {/* .akt kabı: üç bölüm işareti sırayla yanıyor. Kalıbın kendi cümlesi
            "A'daki şey B'ye geçti" ve burada taşınan şey ziyaretçinin kendisi:
            birinci perdeden üçüncüye. Değerler CSS'te, reduce kapısı kalıbın
            içinde. */}
        <ol className="ank1-open-parts akt">
          {FIT_PARTS.map((p, i) => {
            const PIcon = ANK_ICONS[p.icon];
            return (
              <li key={p.id} className="ank1-open-part">
                <span
                  className="ank1-open-d akt-durak"
                  aria-hidden="true"
                  style={{ "--akt-i": i } as React.CSSProperties}
                >
                  <PIcon size={30} strokeWidth={1.9} />
                </span>
                <span className="ank1-open-pn">Perde {i + 1}</span>
                <span className="ank1-open-pt">{p.title}</span>
              </li>
            );
          })}
        </ol>

        <ul className="ank1-open-flags">
          {(["dubai", "ingiltere", "kktc"] as const).map((c) => (
            <li key={c} className="ank1-open-flag">
              <span className="ank1-flagbox" aria-hidden="true">
                <Flag country={c} />
              </span>
              {COUNTRY_NAMES[c]}
            </li>
          ))}
        </ul>

        <button type="button" className="btn btn-solid btn-sm ank1-go" onClick={onStart}>
          Başla
          <ArrowRight size={15} strokeWidth={2.1} />
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- SONUÇ ---
   SONUÇ SORUNUN YERİNE GELİYOR, ayrı bir sayfa ya da kayan panel değil: aynı
   sahne, aynı çerçeve, içerik değişti. Adayın ayrışma eksenlerinden biri bu.

   Cümleler uydurulmadı: ülke anlatımı countryContent.intro ve FACTS.limit'ten
   (fitBlurb), sıralama scoreFit'ten. Beraberlik yutulmuyor. */
function SahneSonuc({
  answers,
  onAgain,
}: {
  answers: (number | null)[];
  onAgain: () => void;
}) {
  const r = scoreFit(answers);
  const b = fitBlurb(r.top);

  return (
    <div className="ank1-app">
      <div className="ank1-stage" key="res">
        <div className="ank1-res">
          <p className="ank1-res-e">Sonuç</p>
          <h3 className="ank1-res-h">
            {r.tieCount === 3
              ? "Cevaplarınız üçünü de eşit puanda bırakıyor."
              : r.tie
                ? `${COUNTRY_NAMES[r.top]} ile ${COUNTRY_NAMES[r.runnerUp]} başa baş.`
                : `${COUNTRY_NAMES[r.top]} öne çıkıyor.`}
          </h3>

          <ol className="ank1-res-list">
            {r.standings.map((s, i) => (
              <li key={s.country} className="ank1-res-row" data-first={i === 0 ? "" : undefined}>
                <span className="ank1-flagbox" aria-hidden="true">
                  <Flag country={s.country} />
                </span>
                <span className="ank1-res-n">{COUNTRY_NAMES[s.country]}</span>
                <span className="ank1-res-bar" aria-hidden="true">
                  <span
                    className="ank1-res-fill"
                    style={{ "--ank1-w": s.pts / Math.max(1, r.standings[0].pts) } as React.CSSProperties}
                  />
                </span>
                <span className="ank1-res-p">{s.pts} puan</span>
              </li>
            ))}
          </ol>

          <p className="ank1-res-l">{b.intro}</p>
          <p className="ank1-res-lim">
            <b>Karşılığı:</b> {b.limit}
          </p>
          <p className="ank1-res-note">
            {r.tie
              ? "Test bu cevaplarla ikisini ayıramıyor; sıralamayı listenin kendi yazım sırası belirledi."
              : r.flippable
                ? `${COUNTRY_NAMES[r.runnerUp]} ${r.gap} puan geride: fark, tek bir cevabınızı değiştirseniz sıranın döneceği kadar dar.`
                : `${COUNTRY_NAMES[r.runnerUp]} ${r.gap} puan geride. Tek bir cevap değişikliği bu sırayı çevirmiyor.`}
          </p>

          <button type="button" className="ank1-again" onClick={onAgain}>
            <RotateCcw size={14} strokeWidth={2.1} />
            Baştan
          </button>
        </div>
      </div>
    </div>
  );
}
