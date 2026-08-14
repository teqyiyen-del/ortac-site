"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Pencil, Radar, RotateCcw, Scale } from "lucide-react";

import SmartLink from "@/components/shared/SmartLink";
import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import {
  FIT_CEIL,
  FIT_COUNTRIES,
  FIT_PARTS,
  FIT_PART_INDEXES,
  FIT_QUESTIONS,
  FIT_TOTAL,
  emptyFitAnswers,
  fitAnswerWeight,
  fitBlurb,
  fitPartOf,
  fitSpread,
  fitTotals,
  scoreFit,
} from "@/lib/fitTest";
import { ANK_ICONS } from "@/components/lab/anketIkon";

/* ============================================================================
   YEDEK · ÖNCEKİ CANLI SÜRÜM — ad alanı .ftv1- · CSS: src/app/css/lab-ftv1.css

   Bu dosya 14 Ağustos gününe kadar /uygunluk-testi ve /araclar/uygunluk-testi
   adreslerinde yayında olan FitTest.tsx bileşeninin BİREBİR kopyası. Müşteri
   MELEZ tasarımını canlıya alırken "live da olanıda laba koy burda backup
   dursun" dedi; ekranda duran şey o.

   ÜÇ FARK, üçü de kopyanın lab sayfasında durmasından geliyor:
   1. Sınıf öneki .ft- → .ftv1-. Zorunlu: yeni canlı sürüm de bu sayfada değil
      ama aynı depoda, ve iki sürüm aynı .ft- adlarını paylaşsaydı biri
      ötekinin kurallarını sessizce ezerdi.
   2. gtm olayları KALDIRILDI (fit_test_start · fit_test_complete). Bir lab
      sayfasından atılan olay canlı ölçümü kirletir; olay adları ve yükleri
      canlı bileşende aynen duruyor.
   3. Ülke mağazasına yazma (setCountry) kaldırıldı, aynı gerekçeyle: lab
      sayfasında verilen bir cevap sitenin geri kalanının durumunu değiştirmez.
   İkon haritası ortak lab dosyasından geliyor (anketIkon.tsx), canlıdakiyle
   birebir aynı. Gerçek geri dönüş kaynağı git; bu kopya gözle karşılaştırma
   içindir.
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

  const QIcon = ANK_ICONS[q.icon];

  return (
    <fieldset className="ftv1-fs" ref={box}>
      {/* İkon <legend>'İN İÇİNDE, kendi sarmalayıcısında DEĞİL. Denenip
          elenen kalıp şuydu: <div><span ikon/><legend/></div>. Çalışmıyor —
          <legend> yalnızca <fieldset>'in DOĞRUDAN ilk çocuğuyken grubun adı
          olur; bir <div> araya girdiği anda dokuz sorunun dokuzu da adsız
          bir gruba dönüşüyordu. İkon legend'in içinde ve aria-hidden, yani
          grubun erişilebilir adı hâlâ yalnızca soru cümlesi. */}
      <legend className="ftv1-legend">
        <span className="ftv1-qicon" aria-hidden="true">
          <QIcon size={19} strokeWidth={1.9} />
        </span>
        <span className="ftv1-legend-t">{q.q}</span>
      </legend>
      {q.help ? <p className="ftv1-help">{q.help}</p> : null}

      <div className="ftv1-choices">
        {q.options.map((o, oi) => {
          const OIcon = o.icon ? ANK_ICONS[o.icon] : null;
          return (
            /* --ftv1-o: kutuların sırayla girmesi için gecikme çarpanı. Süre
               CSS'te, burada yalnızca sıra numarası var. */
            <label
              key={o.id}
              className="ftv1-choice"
              data-on={answer === oi ? "" : undefined}
              data-icon={OIcon ? "" : undefined}
              style={{ "--ftv1-o": oi } as React.CSSProperties}
            >
              {/* aria-label AÇIKÇA veriliyor. Etiketsiz radyolar bu depoda
                  ağaçta "on" diye okunuyordu; üstelik <label>'ın metnini
                  toplayan örtük ad, kutuya ikon girince gliflerin başlığını
                  da içine alma riski taşıyor. İpucu adın sonunda çünkü
                  görünen metinle başlaması gerekiyor (label in name). */}
              <input
                type="radio"
                name={`ftv1-${q.id}`}
                value={o.id}
                checked={answer === oi}
                onChange={() => onPick(oi)}
                aria-label={o.hint ? `${o.label}. ${o.hint}` : o.label}
              />
              {OIcon ? (
                <span className="ftv1-choice-i" aria-hidden="true">
                  <OIcon size={17} strokeWidth={1.9} />
                </span>
              ) : null}
              <span className="ftv1-choice-body">
                <span className="ftv1-choice-t">{o.label}</span>
                {o.hint ? <span className="ftv1-choice-h">{o.hint}</span> : null}
              </span>
              <span className="ftv1-choice-mark" aria-hidden="true">
                <Check size={14} strokeWidth={2.8} />
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ======================================================== CANLI SİNYAL ===== */
/* Test sürerken duran tek "canlı" parça. BU TURDA PUAN TABLOSU GERİ GELDİ.

   Müşterinin cümlesi birebir: "alt kısmındaki ülkelerin sürekli puan
   kazandığı sistemi geri getirebiliriz ya o dursun murat abi istemezse
   kaldırırız." Yani panel yine ülke adı, bayrak, çubuk ve puan gösteriyor.

   GEÇEN TURUN ÖLÇÜMLERİ SİLİNMEDİ, biri hariç hepsi bilerek geri alındı ve
   hangisinin ne olduğu fitTest.ts'te tek tek yazılı. Geri ALINMAYAN tek şey
   F2: tam beraberlikte Dubai'nin çubuğu İngiltere'ninkinden 15,5 px uzun
   çıkıyordu. O bir tercih değil bir yerleşim kazasıydı (her satır kendi
   ızgarası → ad sütunu satırdan satıra farklı genişlikte → 1fr'lik ray
   farklı). Yeni tabloda satırlar tek bir ızgaranın sütunlarını paylaşıyor
   (subgrid), yani EŞİT PUAN EŞİT PİKSEL: aynı üç beraberlikte (2-2, 4-4,
   7-7) fark 15,5 px yerine 0,00 px ölçüldü. Tablo fittest.css · TALLY.

   ÇUBUĞUN PAYDASI DA DEĞİŞTİ: `puan / o anki en yüksek puan` değil,
   `puan / FIT_CEIL`. Gerekçe ve iki ölçüm fitTest.ts · ÇUBUKLARIN ÖLÇEĞİ.
   Kısası: eski paydayla aynı 1 puanlık fark testin başında 249,8 px, sonunda
   55,5 px görünüyordu ve bir ülkenin çubuğu puanı hiç değişmeden geri
   gidebiliyordu. Sabit paydayla 1 puan her zaman 19,2 px ve çubuk yalnızca
   uzuyor — ki müşterinin istediği cümle tam olarak bu: "sürekli puan
   kazanıyor".

   SIRA SABİT: satırlar FIT_COUNTRIES sırasında duruyor, puana göre
   sıralanmıyor. Sıralasaydı her cevapta satırlar yer değiştirir ve göz yarım
   kalmış bir sıralamayı sonuç sanardı; sıralamanın yeri sonuç ekranı.

   SEVİYE KADEMELERİ KALDI ve tablonun altına indi. Tablo "kim kaç puan"
   diyor, kademeler "kalan sorular bunu hâlâ çevirebilir mi" diyor: ikincisi
   birincinin dürüst karşı ağırlığı, o yüzden ikisi bir arada.

   Erişilebilirlik: panelde ANLAM TAŞIYAN her şey ekranda yazılı metin. Üç
   kademe, çubuklar ve bayrak diskleri süs, hepsi aria-hidden; ülke adları,
   puanlar ve seviye cümlesi gerçek metin. role="meter" denendi ve atıldı,
   gerekçesi kademelerin yanında. */

/* Dört cümle, dört hâl. Hiçbiri ülke adı geçirmiyor; hepsi "kalan sorular bu
   farkı çevirebilir mi" sorusunun cevabı (hesabı fitTest.ts · fitSpread). */
const FIT_LEVELS = [
  "Cevaplarınız üç ülkeyi henüz ayırmadı.",
  "Ayrım çok dar: kalan sorular sıralamayı rahatça çevirebilir.",
  "Ayrım belirginleşti ama kalan sorular hâlâ çevirebilir.",
  "Kalan sorular bu ayrımı artık çeviremiyor.",
] as const;

function Signal({
  answers,
  answered,
  step,
}: {
  answers: (number | null)[];
  answered: number;
  step: number;
}) {
  const spread = fitSpread(answers);
  /* SIRALANMIYOR: fitTotals FIT_COUNTRIES sırasında dönüyor ve o sıra
     ekranda aynen duruyor. */
  const totals = fitTotals(answers);
  /* Dokuz cevabın dokuzu da girildiğinde "kalan sorular" diye bir şey yok;
     L3 cümlesi orada teknik olarak doğru ama tuhaf okunuyordu. Son hâl ayrı
     yazıldı ve üç kademe de yanıyor. Beraberlikte bile böyle: cümle bir
     sonuç değil, "girdi tamam" diyor. */
  const full = answered >= FIT_TOTAL;
  const level = full ? 3 : spread.level;
  const line = full
    ? "Dokuz cevabın hepsi girildi. Sonucu görebilirsiniz."
    : FIT_LEVELS[level];
  /* Ekrandaki sorunun cevabı ne yaptı: puan getirdi mi, getirmedi mi.
     -1 = bu soru henüz cevaplanmadı. Yirmi altı şıkkın beşi sıfır ağırlıklı,
     yani bu cümle gerçekten iki hâl arasında gidiyor (ölçüm: ardışık iki
     cevap arasında %77,3 değişiyor). */
  const w = fitAnswerWeight(step, answers[step]);

  return (
    /* .akt kabı: üç bayrak sırayla halkalanıyor (aktGolge). Tur HİÇBİR duruma
       bağlı değil — sıra her zaman aynı, hız her zaman aynı, cevap değişince
       hiçbir şey olmuyor. Puanlar ekrandayken bu ayrım daha da önemli: halka
       gezen bir ilgi işareti, "şu an önde olan" değil. Fare panelin üstüne
       gelince tur duruyor (kalıbın kendi davranışı). */
    <div className="ftv1-sig akt">
      <p className="ftv1-sig-h">
        <span className="ftv1-sig-i" aria-hidden="true">
          <Radar size={16} strokeWidth={1.9} />
        </span>
        {/* Başlık kısa tutuldu: 320 pikselde uzun bir başlık üç satıra
            iniyor ve paneli gereksiz uzatıyor. */}
        Puan durumu
        <span className="ftv1-sig-n">
          {answered} / {FIT_TOTAL} cevap
        </span>
      </p>

      {/* -------------------------------------------------------- puan tablosu
          Satırlar SIRALANMIYOR (FIT_COUNTRIES sırası) ve çubuklar sabit
          paydayla (FIT_CEIL) çiziliyor. İkisi de bu turun kararı; ölçümleri
          bileşenin başındaki notta ve fitTest.ts'te.

          TUZAK H — <Flag> çıplak <svg viewBox="0 0 60 40"> basıyor, width ve
          height YOK. Kapsız bırakılırsa 300x150'ye şişiyor ve bu depoda iki
          sayfayı bozdu. Kap sabit piksel + overflow:clip, CSS'te. */}
      <ul className="ftv1-tally-list">
        {totals.map((t, i) => (
          <li
            key={t.country}
            className="ftv1-tally-row"
            /* Sıfır puanlı satır silikleşiyor ama YALNIZCA bayrağı ve rayı;
               metin rengi sabit kalıyor ki kontrast eşiğin altına inmesin. */
            data-zero={t.pts === 0 ? "" : undefined}
          >
            <span
              className="ftv1-tally-flag akt-durak"
              aria-hidden="true"
              style={{ "--akt-i": i } as React.CSSProperties}
            >
              <Flag country={t.country} />
            </span>
            <span className="ftv1-tally-name">{COUNTRY_NAMES[t.country]}</span>
            <span className="ftv1-tally-bar" aria-hidden="true">
              <span
                className="ftv1-tally-fill"
                style={{ "--ftv1-w": t.pts / FIT_CEIL } as React.CSSProperties}
              />
            </span>
            {/* Puan GERÇEK METİN: çubuk aria-hidden, bilgi buradan okunuyor. */}
            <span className="ftv1-tally-pts">{t.pts} puan</span>
          </li>
        ))}
      </ul>

      <p className="ftv1-sig-pts" data-nil={w === 0 ? "" : undefined}>
        {w < 0
          ? "Bu soru henüz cevaplanmadı."
          : w === 0
            ? "Bu cevap puan getirmedi: üç ülkeyi birbirinden ayırmıyor."
            : "Bu cevap puanları değiştirdi."}
      </p>

      {/* ------------------------------------------------------ çevrilebilir mi
          Tablonun karşı ağırlığı. Üç kademe, seviye kadarı yanık. Kademe
          sayısı üç çünkü seviye 0 "hiç ayrım yok" demek ve o hâlde hiçbir
          kademe yanmıyor: dördüncü bir kademe koyup sıfırda birini yakmak,
          olmayan bir ayrımı göstermek olurdu.

          role="meter" DENENDİ VE ATILDI. ARIA'da meter "presentational
          children" rollerinden biri: içine konan metin erişilebilirlik
          ağacına ÇIKMIYOR. Seviye cümlesini kabın içine koysaydık ekran
          okuyucu onu hiç görmeyecekti; dışına koyup ayrıca aria-valuetext
          verseydik aynı cümle iki kez okunacaktı. Sonuç: kademeler saf süs
          (aria-hidden), anlamı taşıyan şey ekranda YAZILI cümle.

          Cümle aria-live DEĞİL. Sayfada zaten bir canlı bölge var (.ftv1-eyebrow)
          ve her cevapta ikinci bir duyuru, soruyu okumaya çalışan kişinin
          üstüne konuşurdu. */}
      <div className="ftv1-sig-foot">
        <div className="ftv1-sig-steps" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="ftv1-sig-step"
              data-on={i < level ? "" : undefined}
              /* Yalnızca SON yanan kademe nefes alıyor, öncekiler sabit
                 duruyor: üç kademenin birden atması nabız gibi okunuyordu. */
              data-last={i === level - 1 ? "" : undefined}
            />
          ))}
        </div>
        <p className="ftv1-sig-line">{line}</p>
      </div>

      {/* Not üç şeyi birden söylüyor ve üçü de ölçülmüş bir riski kapatıyor:
          (1) sıra bir sıralama değil, listenin kendi sırası;
          (2) üç çubuk aynı ölçekte, yani eşit puan eşit uzunluk (F2);
          (3) ilk cevaplardaki lider nihai birinciyi yalnızca %48,7 tutturuyor
              (F3) ve KKTC ilk cevapta %25 lider görünüp sonunda %2,3'e
              düşüyor (F4). Cümle bunu sayı vermeden ama uydurmadan aktarıyor. */}
      <p className="ftv1-sig-note">
        Satırlar puana göre sıralanmıyor, listenin kendi sırasında duruyor. Üç çubuk
        aynı ölçekte: eşit puan eşit uzunluk. İlk cevaplarda öne geçen ülke sonda çoğu
        zaman değişiyor; kesin sıralama sonuç ekranında.
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
    <div className="ftv1-res">
      {/* Başlık da beraberliği yutmuyor: eşitken "şu öne çıkıyor" demek,
          altındaki cümlenin hemen geri aldığı bir hüküm kurmak olurdu. */}
      <h2 className="ftv1-verdict" ref={head} tabIndex={-1}>
        {r.tieCount === 3 ? (
          <>
            Verdiğiniz cevaplar <span className="ftv1-verdict-em">üçünü de eşit</span> puanda
            bırakıyor.
          </>
        ) : r.tie ? (
          <>
            Verdiğiniz cevaplara göre{" "}
            <span className="ftv1-verdict-em">{COUNTRY_NAMES[r.top]}</span> ile{" "}
            <span className="ftv1-verdict-em">{COUNTRY_NAMES[r.runnerUp]}</span> başa baş.
          </>
        ) : (
          <>
            Verdiğiniz cevaplara göre{" "}
            <span className="ftv1-verdict-em">{COUNTRY_NAMES[r.top]}</span> öne çıkıyor.
          </>
        )}
      </h2>

      <p className="ftv1-gap">{gapLine}</p>

      {/* --------------------------------------------------- puan tablosu
          Çubuklar sırayla doluyor: --ftv1-w hedef oran, --ftv1-o sıra numarası.
          Süre ve gecikme CSS'te; buradaki iki sayı yalnızca veri. */}
      <ol className="ftv1-list">
        {r.standings.map((s, i) => (
          <li key={s.country} className="ftv1-item" data-top={i === 0 ? "" : undefined}>
            <span className="ftv1-item-no" aria-hidden="true">
              {i + 1}
            </span>
            <span className="ftv1-item-flag" aria-hidden="true">
              <Flag country={s.country} />
            </span>
            <span className="ftv1-item-name">{COUNTRY_NAMES[s.country]}</span>
            <span className="ftv1-item-bar" aria-hidden="true">
              <span
                className="ftv1-item-fill"
                style={{ "--ftv1-w": s.pts / r.max, "--ftv1-o": i } as React.CSSProperties}
              />
            </span>
            <span className="ftv1-item-pts">{s.pts} puan</span>
          </li>
        ))}
      </ol>

      {/* ------------------------------------------------ ilk iki, yan yana
          Üçüncü ülke bilerek yok: iki seçeneği karşılaştırmak karar, üçünü
          karşılaştırmak araştırma — ve onun yeri /ulkeler. */}
      <div className="ftv1-pair">
        {[
          { c: r.top, b: top, role: "Öne çıkan" },
          { c: r.runnerUp, b: second, role: "İkinci sıra" },
        ].map((x) => (
          <div key={x.c} className="ftv1-card" data-top={x.c === r.top ? "" : undefined}>
            <div className="ftv1-card-top">
              <span className="ftv1-card-flag" aria-hidden="true">
                <Flag country={x.c} />
              </span>
              <b className="ftv1-card-name">{COUNTRY_NAMES[x.c]}</b>
              <span className="ftv1-card-role">{x.role}</span>
            </div>
            <p className="ftv1-card-line">{x.b.intro}</p>
            <p className="ftv1-card-limit">{x.b.limit}</p>
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------- cevap dökümü
          Sonucun neye dayandığı gizli kalmasın: dokuz cevap da yazılı, her
          satır kendi sorusuna geri götürüyor ve o cevabın hangi ülkeye kaç
          puan verdiği yanında duruyor. Puanı gösteren bir ekranın girdisini
          saklaması, puanı bir hükme çeviriyor. */}
      <div className="ftv1-recap">
        <p className="ftv1-recap-h">Bu sonuç şu {FIT_TOTAL} cevaptan çıktı:</p>
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
                  className="ftv1-recap-b"
                  onClick={() => onGoTo(qi)}
                  aria-label={`${q.short}: ${a === null ? "cevaplanmadı" : q.options[a].label}. Bu soruya dön ve cevabı değiştir.`}
                >
                  <span className="ftv1-recap-q">
                    {qi + 1}. {q.q}
                  </span>
                  <span className="ftv1-recap-a">{a === null ? "—" : q.options[a].label}</span>
                  <span className="ftv1-recap-w" aria-hidden="true">
                    {chips.length === 0 ? (
                      <i className="ftv1-recap-nil">puan yok</i>
                    ) : (
                      chips.map((ch) => (
                        <i key={ch.c} className="ftv1-recap-chip">
                          {COUNTRY_NAMES[ch.c]} +{ch.n}
                        </i>
                      ))
                    )}
                  </span>
                  <span className="ftv1-recap-x" aria-hidden="true">
                    <Pencil size={13} strokeWidth={2.2} />
                    Değiştir
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="ftv1-acts">
        {/* Canlıdaki iki yan etki (setCountry + gtm "fit_test_start") bu
            kopyada YOK: lab sayfasından atılan olay canlı ölçümü kirletir,
            lab sayfasında verilen bir cevap da sitenin durumunu değiştirmez.
            Bağlantının kendisi ve etiketi aynen duruyor. */}
        <SmartLink href={`/basla?ulke=${r.top}`} className="btn btn-solid">
          {COUNTRY_NAMES[r.top]} ile konuşalım
          <ArrowRight size={15} strokeWidth={2.1} />
        </SmartLink>
        <SmartLink href="/ulkeler" className="btn btn-line">
          <Scale size={15} strokeWidth={2.1} />
          Üçünü yan yana görün
        </SmartLink>
        <button type="button" className="ftv1-reset" onClick={onRestart}>
          <RotateCcw size={14} strokeWidth={2.1} />
          Baştan
        </button>
      </div>

      <p className="ftv1-disc">
        Bu bir kısa liste aracı: sonucu {FIT_TOTAL} cevabın puanlanması üretiyor, mali veya
        hukuki tavsiye değil. Puanlama sizi bir ülkeye yönlendirmek için değil, konuşmayı
        kısaltmak için var: hangi yapının işinize yaradığı faaliyetinize, mukimliğinize ve
        gelir türünüze bağlı ve teyit gerektiriyor.
      </p>
    </div>
  );
}

/* ================================================================= AKIŞ === */

export default function AnketYedek() {
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
    /* Canlıda burada gtm("fit_test_complete", …) var; lab kopyasında yok. */
    if (at >= FIT_TOTAL && !seenResult) setSeenResult(true);
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
        <div className="ftv1-app">
          {/* data-done: sonuç ekranında sol şerit kapanıyor ve rapor bütün
              genişliği alıyor. Anketin katlanıp yerini raporun alması,
              "bitti" demenin düzenle söylenmiş hâli. */}
          <div className="ftv1-shell" data-done={done ? "" : undefined}>
            {/* ------------------------------------------------- sol şerit
                .akt kabı: enerji geçişi kalıbı (css/aktarim.css) üç bölüm
                işaretinde sırayla dolaşıyor. Durakların kendi durum rengine
                DOKUNMUYOR, çünkü kullanılan adaptör aktGolge — yani yanan şey
                halka, dolgu değil. Değerler fittest.css'te, reduce kapısı
                kalıbın kendi içinde. */}
            {/* GÖRSEL BAŞLIK BU TURDA KALKTI ("bide üstlerine uygunluk anketi
                yazmana gerek yok"). ERİŞİLEBİLİR AD KAYBOLMUYOR: adı taşıyan
                şey zaten <nav>'ın aria-label'ı, başlık <p> idi ve ağaçta adsız
                bir `generic` düğüm olarak duruyordu. Ölçüldü — kaldırmadan
                önce de sonra da ağaçta `navigation "Anket bölümleri"`. */}
            <nav className="ftv1-side akt" aria-label="Anket bölümleri">
              <ol className="ftv1-parts">
                {FIT_PARTS.map((p, pi) => {
                  const idx = FIT_PART_INDEXES[p.id];
                  const allDone = idx.every((i) => answers[i] !== null);
                  const isHere = !done && here.part.id === p.id;
                  const PIcon = ANK_ICONS[p.icon];
                  return (
                    <li
                      key={p.id}
                      className="ftv1-part"
                      data-state={allDone ? "done" : isHere ? "now" : "todo"}
                    >
                      <div className="ftv1-part-top">
                        <span className="ftv1-part-dot akt-durak" aria-hidden="true" />
                        {/* Bölüm ikonu 1040 px'in ALTINDA görünüyor, üstünde
                            gizli. Sebebi ölçüm: dar ekranda üç kutuda "Bölüm 1"
                            yazısı ve soru listesi zaten kapalı, geriye tek
                            başına bir kelime kalıyordu; ikon o kutuya kimlik
                            veriyor. Geniş ekranda ise aynı satırda hem nokta
                            hem ikon hem numara hem başlık dört ayrı işaret
                            demek, yani gürültü. */}
                        <span className="ftv1-part-i" aria-hidden="true">
                          <PIcon size={15} strokeWidth={1.9} />
                        </span>
                        <span className="ftv1-part-n" aria-hidden="true">
                          Bölüm {pi + 1}
                        </span>
                        <span className="ftv1-part-t">{p.title}</span>
                      </div>
                      {/* KISA AÇIKLAMA (.ftv1-part-l) BU TURDA EKRANDAN ÇIKTI:
                          "özellikle başlıkların altında yer alan kısa
                          açıklamalara gerek yok, sadece 3 bölüme bölüp
                          onların aşamalarını koyman yeterli."
                          VERİ DURUYOR, EKRANDA DEĞİL: metinler hâlâ
                          fitTest.ts · FIT_PARTS.line içinde (oradaki notta
                          neden silinmediği yazılı). */}
                      <ol className="ftv1-jumps">
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
                            className="ftv1-jump"
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
                            <span className="ftv1-jump-i" aria-hidden="true">
                              {a !== null ? <Check size={11} strokeWidth={3} /> : qi + 1}
                            </span>
                            <span className="ftv1-jump-b">
                              <span className="ftv1-jump-t">{q.short}</span>
                              <span className="ftv1-jump-a">
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
        <div className="ftv1-main">
          {/* aria-live burada ve adım kabının DIŞINDA: adım değişince
              metni değişen sabit bir düğüm. İçeriği değil kendisi
              söküldüğü anda hiçbir duyuru olmazdı. */}
          <div className="ftv1-hud">
            <p className="ftv1-eyebrow" aria-live="polite">
              {done
                ? "Sonuç · dokuz cevap değerlendirildi"
                : `Bölüm ${here.order + 1} / ${FIT_PARTS.length} · ${here.part.title} · Soru ${step + 1} / ${FIT_TOTAL}`}
            </p>
            <p className="ftv1-hud-pct">%{filled} tamamlandı</p>

            <div
              className="ftv1-track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={FIT_TOTAL}
              aria-valuenow={answered}
              aria-label="Cevaplanan soru sayısı"
            >
              <span
                className="ftv1-track-run"
                style={{ "--ftv1-w": answered / FIT_TOTAL } as React.CSSProperties}
              />
            </div>
          </div>

          {/* key: adım değişince düğüm yeniden takılıyor ve CSS giriş
              animasyonu kendiliğinden baştan oynuyor. AnimatePresence'in
              yaptığı işin JS'siz hâli. */}
          <div className="ftv1-stage" key={done ? "result" : `q-${step}`}>
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

          {/* Canlı sinyal ilk cevaptan sonra beliriyor. Sonuç ekranında
              yok: orada sıralanmış tablo var ve sıralamayı gizleyen bir
              paneli sıralamanın yanında tutmak anlamsız olurdu. */}
          {!done && answered > 0 && (
            <Signal answers={answers} answered={answered} step={step} />
          )}

          {/* Gezinme sonuç ekranında yok: oradaki çıkışlar Result'ın kendi
              eylem satırında (devam et · karşılaştır · baştan). */}
          {!done && (
            <div className="ftv1-nav">
              <button
                type="button"
                className="ftv1-prev"
                onClick={() => goTo(step - 1)}
                disabled={step === 0}
              >
                <ArrowLeft size={15} strokeWidth={2.1} />
                Önceki
              </button>

              {answered > 0 && (
                <button type="button" className="ftv1-reset" onClick={restart}>
                  <RotateCcw size={14} strokeWidth={2.1} />
                  Baştan
                </button>
              )}

              <button
                type="button"
                className="btn btn-solid btn-sm ftv1-next"
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
  );
}
