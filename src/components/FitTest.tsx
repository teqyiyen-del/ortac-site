"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Pencil, RotateCcw, Scale } from "lucide-react";

import SmartLink from "@/components/shared/SmartLink";
import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import {
  FIT_COUNTRIES,
  FIT_PARTS,
  FIT_PART_INDEXES,
  FIT_QUESTIONS,
  FIT_TOTAL,
  emptyFitAnswers,
  fitBlurb,
  fitPartOf,
  fitTotals,
  scoreFit,
} from "@/lib/fitTest";
import { gtm } from "@/lib/gtm";
import { useOrtacStore } from "@/lib/store";

/* ============================================================================
   UYGUNLUK TESTİ
   Sorular, bölümler ve ağırlıklar: src/lib/fitTest.ts (SWAP:FIT_WEIGHTS orada)
   CSS: src/app/css/fittest.css · ad alanı .ft-

   ---------------------------------------------------------------------------
   BU DOSYADA İÇERİK KARARI YOK

   Soru metni, seçenek, ipucu ve puan burada değil. Sonuçtaki ülke cümlesi de
   burada değil — countryContent.intro ve FACTS.limit'ten geliyor (bkz.
   fitTest.ts · fitBlurb). Bu dosya yalnızca akışı yürütüyor: hangi soru
   ekranda, cevap nereye yazılıyor, sonuç nasıl gösteriliyor.

   ---------------------------------------------------------------------------
   MÜŞTERİNİN TEŞHİSİ VE BU TURDA NE DEĞİŞTİ

   "şuanki sanki form uygulamalarından birini siteye gömmüşüz gibi sıkıcı
   basic" — teşhis doğruydu ve sebebi tek bir şeydi: ekranda AYNI ANDA
   yalnızca bir soru vardı. Nerede olduğunuzu, ne kadar kaldığını, verdiğiniz
   cevabın bir şeyi değiştirip değiştirmediğini gösteren hiçbir şey yoktu.
   Gömülü bir form uygulaması tam olarak böyle görünür.

   Dört şey eklendi, dördü de "anket paneli" hissinin parçası:

   1) SOL ŞERİT (.ft-side). Üç bölüm ve dokuz sorunun tamamı listede duruyor,
      cevaplananın yanında kendi cevabı yazılı. Ziyaretçi hiçbir zaman "kaç
      soru daha var" diye merak etmiyor, çünkü hepsi ekranda. Geçilen her
      soruya geri dönülebiliyor: liste aynı zamanda gezinme.

   2) İLERLEME ÇUBUĞU (.ft-track). role="progressbar" ile yerli anlam
      taşıyor; yüzde ekranda YAZILI metin, ekran okuyucuya ayrıca gizli bir
      düğüm kurulmuyor (bu depoda görsel olarak gizli <span>'ler üç kez
      erişilebilirlik ağacına hiç düşmedi).

   3) CANLI SAYAÇ (.ft-tally). İlk cevaptan sonra beliriyor ve her cevapta
      çubukları değişiyor. Sıralamıyor: ülkeler her zaman FIT_COUNTRIES
      sırasında duruyor, çünkü test bitmeden bir birinci ilan etmek, sonuç
      ekranının bilerek kurmadığı hükmü yarı yolda kurmak olurdu.

   4) CEVAP DÖKÜMÜNDE PUAN PULLARI. Sonuç ekranında her cevabın hangi ülkeye
      kaç puan verdiği yazıyor. Puanı gösteren bir ekranın girdisini saklaması,
      puanı bir hükme çeviriyor.

   ---------------------------------------------------------------------------
   HAREKET — motion/react BU DOSYADAN ÇIKTI

   Eski sürüm AnimatePresence + useReducedMotion kullanıyordu. İkisi de gitti:

   · useReducedMotion bu depoda YASAK, beş ayrı kalıpta hidrasyon hatası
     çıkardı. Buradaki kullanım (`useDur`) zararsız görünüyordu ama kancanın
     kendisi sunucuda null, ilk boyamada null, sonra değer döndürüyor — yani
     her yeni kullanım aynı tuzağın bir adım yakınında duruyor.
   · Yerine geçen şey daha az kod: bütün hareket CSS'te ve
     `prefers-reduced-motion` kapısı orada. Adım geçişi keyed bir düğümün
     yeniden takılmasıyla oluyor (React zaten söküp takıyor, CSS animasyonu
     kendiliğinden baştan oynuyor), sürekli dönen hareketler ise
     no-preference sorgusunun içinde.

   `reduce` altında testin TAMAMI çalışıyor: hiçbir düğüm koşullu değil,
   yalnızca süreler globals.css'teki kural tarafından sıfırlanıyor.

   ---------------------------------------------------------------------------
   KORUNAN KALIPLAR

   · AÇILIR MENÜ YOK. Seçenek görünen kutucuk, altında yerli
     <input type="radio">. Ok tuşlarıyla gezinme, klavyeyle seçme ve ekran
     okuyucu duyurusu tarayıcıdan geliyor. Gruplama <fieldset> + <legend>.
   · OTOMATİK GEÇİŞ YOK. Seçim ekranda kalıyor, ilerlemek ayrı bir düğme.
     Klavyeyle ok tuşuna basan kişi sorudan atılmıyor.
   · aria-live SABİT BİR DÜĞÜMDE ve adım kabının DIŞINDA: her adımda söküp
     takılan bir canlı bölge hiçbir şey duyurmaz.

   ---------------------------------------------------------------------------
   ODAK YÖNETİMİ

   Adım değişince odak yeni sorunun radyo grubuna gidiyor (seçiliye, yoksa
   ilkine); sonuç ekranında sonuç başlığına. Sayfa ilk açıldığında odak
   ÇALINMIYOR — o yüzden Ask/Result kendi mount'unda odaklanıyor ve ilk
   mount'ta `focusOnMount` false geliyor.
   ========================================================================= */

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
          /* --ft-o: kutuların sırayla girmesi için gecikme çarpanı. Süre
             CSS'te, burada yalnızca sıra numarası var. */
          <label
            key={o.id}
            className="ft-choice"
            data-on={answer === oi ? "" : undefined}
            style={{ "--ft-o": oi } as React.CSSProperties}
          >
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

/* ======================================================== CANLI SAYAÇ ===== */
/* Test sürerken duran tek "canlı" parça. İki kuralı var ve ikisi de bilinçli:
   sıralamıyor ve birinci ilan etmiyor. Sıralasaydı her cevapta satırlar yer
   değiştirirdi ve göz sıralamayı bir sonuç sanardı; oysa burada söylenen tek
   şey "toplam işliyor". Çubuklar aria-hidden, puanlar gerçek metin — yani
   ekran okuyucu da aynı bilgiyi alıyor, canlı bölge gürültüsü olmadan. */

function Tally({ answers, answered }: { answers: (number | null)[]; answered: number }) {
  const totals = fitTotals(answers);
  const max = Math.max(1, ...totals.map((t) => t.pts));

  return (
    <div className="ft-tally">
      <p className="ft-tally-h">
        İşleyen toplam
        <span className="ft-tally-n">
          {answered} / {FIT_TOTAL} cevap
        </span>
      </p>
      <ul className="ft-tally-list">
        {totals.map((t) => (
          <li key={t.country} className="ft-tally-row" data-zero={t.pts === 0 ? "" : undefined}>
            <span className="ft-tally-flag" aria-hidden="true">
              <Flag country={t.country} />
            </span>
            <span className="ft-tally-name">{COUNTRY_NAMES[t.country]}</span>
            <span className="ft-tally-bar" aria-hidden="true">
              <span
                className="ft-tally-fill"
                style={{ "--ft-w": t.pts / max } as React.CSSProperties}
              />
            </span>
            <span className="ft-tally-pts">{t.pts} puan</span>
          </li>
        ))}
      </ul>
      <p className="ft-tally-note">
        Sıra alfabetik değil, listenin kendi sırası. Kalan sorular bu tabloyu
        değiştirebilir; burada bir birinci ilan edilmiyor.
      </p>
    </div>
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

      {/* --------------------------------------------------- puan tablosu
          Çubuklar sırayla doluyor: --ft-w hedef oran, --ft-o sıra numarası.
          Süre ve gecikme CSS'te; buradaki iki sayı yalnızca veri. */}
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
              <span
                className="ft-item-fill"
                style={{ "--ft-w": s.pts / r.max, "--ft-o": i } as React.CSSProperties}
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
          Sonucun neye dayandığı gizli kalmasın: dokuz cevap da yazılı, her
          satır kendi sorusuna geri götürüyor ve o cevabın hangi ülkeye kaç
          puan verdiği yanında duruyor. Puanı gösteren bir ekranın girdisini
          saklaması, puanı bir hükme çeviriyor. */}
      <div className="ft-recap">
        <p className="ft-recap-h">Bu sonuç şu {FIT_TOTAL} cevaptan çıktı:</p>
        <ol>
          {FIT_QUESTIONS.map((q, qi) => {
            const a = answers[qi];
            const w = a === null ? undefined : q.options[a].weights;
            /* Puan vermeyen cevabın pulu da yazılıyor ("puan yok"): boş
               bırakmak, o cevabın atlandığı izlenimi veriyordu. */
            const chips = w
              ? FIT_COUNTRIES.filter((c) => (w[c] ?? 0) > 0).map((c) => ({ c, n: w[c] as number }))
              : [];
            return (
              <li key={q.id}>
                <button
                  type="button"
                  className="ft-recap-b"
                  onClick={() => onGoTo(qi)}
                  aria-label={`${q.short}: ${a === null ? "cevaplanmadı" : q.options[a].label}. Bu soruya dön ve cevabı değiştir.`}
                >
                  <span className="ft-recap-q">
                    {qi + 1}. {q.q}
                  </span>
                  <span className="ft-recap-a">{a === null ? "—" : q.options[a].label}</span>
                  <span className="ft-recap-w" aria-hidden="true">
                    {chips.length === 0 ? (
                      <i className="ft-recap-nil">puan yok</i>
                    ) : (
                      chips.map((ch) => (
                        <i key={ch.c} className="ft-recap-chip">
                          {COUNTRY_NAMES[ch.c]} +{ch.n}
                        </i>
                      ))
                    )}
                  </span>
                  <span className="ft-recap-x" aria-hidden="true">
                    <Pencil size={13} strokeWidth={2.2} />
                    Değiştir
                  </span>
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
        Bu bir kısa liste aracı: sonucu {FIT_TOTAL} cevabın puanlanması üretiyor, mali veya
        hukuki tavsiye değil. Puanlama sizi bir ülkeye yönlendirmek için değil, konuşmayı
        kısaltmak için var: hangi yapının işinize yaradığı faaliyetinize, mukimliğinize ve
        gelir türünüze bağlı ve teyit gerektiriyor.
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
  /* Sol şeritteki gezinme yalnızca GÖRÜLMÜŞ sorulara açık: ileriye atlamak,
     cevaplanmamış sorularla sonuca varmanın kestirme yolu olurdu. */
  const [furthest, setFurthest] = useState(0);

  const done = step >= FIT_TOTAL;
  const answered = answers.filter((a) => a !== null).length;
  const filled = Math.round((answered / FIT_TOTAL) * 100);
  const picked = !done && answers[step] !== null;
  const here = fitPartOf(done ? FIT_TOTAL - 1 : step);

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
    setFurthest((f) => Math.max(f, Math.min(at, FIT_TOTAL - 1)));
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
        <div className="ft-app">
          {/* data-done: sonuç ekranında sol şerit kapanıyor ve rapor bütün
              genişliği alıyor. Anketin katlanıp yerini raporun alması,
              "bitti" demenin düzenle söylenmiş hâli. */}
          <div className="ft-shell" data-done={done ? "" : undefined}>
            {/* ------------------------------------------------- sol şerit
                .akt kabı: enerji geçişi kalıbı (css/aktarim.css) üç bölüm
                işaretinde sırayla dolaşıyor. Durakların kendi durum rengine
                DOKUNMUYOR, çünkü kullanılan adaptör aktGolge — yani yanan şey
                halka, dolgu değil. Değerler fittest.css'te, reduce kapısı
                kalıbın kendi içinde. */}
            <nav className="ft-side akt" aria-label="Anket bölümleri">
              <p className="ft-side-h">Uygunluk anketi</p>

              <ol className="ft-parts">
                {FIT_PARTS.map((p, pi) => {
                  const idx = FIT_PART_INDEXES[p.id];
                  const allDone = idx.every((i) => answers[i] !== null);
                  const isHere = !done && here.part.id === p.id;
                  return (
                    <li
                      key={p.id}
                      className="ft-part"
                      data-state={allDone ? "done" : isHere ? "now" : "todo"}
                    >
                      <div className="ft-part-top">
                        <span className="ft-part-dot akt-durak" aria-hidden="true" />
                        <span className="ft-part-n" aria-hidden="true">
                          Bölüm {pi + 1}
                        </span>
                        <span className="ft-part-t">{p.title}</span>
                      </div>
                      <p className="ft-part-l">{p.line}</p>

                      <ol className="ft-jumps">
                        {idx.map((qi) => {
                          const q = FIT_QUESTIONS[qi];
                          const a = answers[qi];
                          const reachable = qi <= furthest || seenResult;
                          const state =
                            !done && qi === step ? "now" : a !== null ? "done" : "todo";
                          return (
                            <li key={q.id}>
                              <button
                                type="button"
                                className="ft-jump"
                                data-state={state}
                                disabled={!reachable}
                                aria-current={!done && qi === step ? "step" : undefined}
                                /* Ad AÇIKÇA veriliyor. Bu depoda görsel olarak
                                   gizli <span>'lerle ad vermek üç kez
                                   tutmadı; düğme adsız kaldı. Görünen metin
                                   (q.short) adın başında duruyor, yani
                                   "label in name" da bozulmuyor. */
                                aria-label={`${q.short}. Soru ${qi + 1}: ${q.q} ${
                                  a === null
                                    ? "Henüz cevaplanmadı."
                                    : `Cevabınız: ${q.options[a].label}.`
                                }`}
                                onClick={() => goTo(qi)}
                              >
                                <span className="ft-jump-i" aria-hidden="true">
                                  {a !== null ? <Check size={11} strokeWidth={3} /> : qi + 1}
                                </span>
                                <span className="ft-jump-b">
                                  <span className="ft-jump-t">{q.short}</span>
                                  <span className="ft-jump-a">
                                    {a === null ? "—" : q.options[a].label}
                                  </span>
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* ------------------------------------------------------- gövde */}
            <div className="ft-main">
              {/* aria-live burada ve adım kabının DIŞINDA: adım değişince
                  metni değişen sabit bir düğüm. İçeriği değil kendisi
                  söküldüğü anda hiçbir duyuru olmazdı. */}
              <div className="ft-hud">
                <p className="ft-eyebrow" aria-live="polite">
                  {done
                    ? "Sonuç · dokuz cevap değerlendirildi"
                    : `Bölüm ${here.order + 1} / ${FIT_PARTS.length} · ${here.part.title} · Soru ${step + 1} / ${FIT_TOTAL}`}
                </p>
                <p className="ft-hud-pct">%{filled} tamamlandı</p>

                <div
                  className="ft-track"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={FIT_TOTAL}
                  aria-valuenow={answered}
                  aria-label="Cevaplanan soru sayısı"
                >
                  <span
                    className="ft-track-run"
                    style={{ "--ft-w": answered / FIT_TOTAL } as React.CSSProperties}
                  />
                </div>
              </div>

              {/* key: adım değişince düğüm yeniden takılıyor ve CSS giriş
                  animasyonu kendiliğinden baştan oynuyor. AnimatePresence'in
                  yaptığı işin JS'siz hâli. */}
              <div className="ft-stage" key={done ? "result" : `q-${step}`}>
                {done ? (
                  <Result
                    answers={answers}
                    onGoTo={goTo}
                    onRestart={restart}
                    focusOnMount={started}
                  />
                ) : (
                  <Ask index={step} answer={answers[step]} onPick={pick} focusOnMount={started} />
                )}
              </div>

              {/* Canlı sayaç ilk cevaptan sonra beliriyor. Sonuç ekranında yok:
                  orada zaten sıralanmış tablo var, aynı sayıyı iki kez
                  göstermek okuyanı hangisinin geçerli olduğunu aramaya
                  zorluyor. */}
              {!done && answered > 0 && <Tally answers={answers} answered={answered} />}

              {/* Gezinme sonuç ekranında yok: oradaki çıkışlar Result'ın kendi
                  eylem satırında (devam et · karşılaştır · baştan). */}
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
        </div>
      </div>
    </section>
  );
}
