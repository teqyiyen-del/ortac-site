"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { SCENE_BY_KIND, stepSceneKind } from "@/components/scenes/SetupScenes";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { WHO_LABEL, type Step } from "@/lib/countryContent";

/* ============================================================================
   ADAY P2 — "üç evre"
   ============================================================================

   ---- ÖNCE TEŞHİS: ana sayfadaki süreç neden "clean", buradaki neden değil ----

   İkisi de aynı ray + gece kartı dilini kullanıyor, o yüzden farkın adım
   sayısında olduğunu düşünmek doğal. Adım sayısı fark yaratıyor ama tek başına
   değil ve en büyüğü de o değil. Üçünü de saydım.

   (1) SATIR BAŞINA DÜŞEN İŞARET SAYISI. Ana sayfanın ray satırı üç parçadan
       oluşuyor: 24px'lik bir nokta (içinde sıra numarası ya da tik), kalın
       başlık, ve altında dört kelimelik gri bir alt satır — "pasaport ve adres
       beyanı". Renkli olan bir tane: nokta. Ülke sayfasının satırı BEŞ parça:
       38x38 dolu bir simge karosu (mavi/yeşil/gri), mavi sıra numarası, kalın
       başlık, kalın süre metni ("tipik 3-5 gün") ve dolu zeminli bir sahiplik
       rozeti ("Ortac'ta", mavi/yeşil/gri zemin). Beşin üçü renkli ya da dolu.
       Yani satır başına 3'e karşı 5 işaret, renkli işaret 1'e karşı 3.

       Çarpım hesabı acımasız: ana sayfa 5 x 3 = 15 işaret, 5 tanesi renkli.
       Dubai 7 x 5 = 35 işaret, 21 tanesi renkli. Kalabalık hissi buradan
       geliyor — göz yedi satırı değil, otuz beş işareti taramak zorunda. "Beşe
       karşı yedi" farkı bu tablonun yanında küçük kalıyor.

   (2) KARTIN RAYI TEKRAR ETMESİ. Ana sayfada kart rayın söylediği hiçbir şeyi
       söylemiyor: başlık sabit ("Kuruluş dosyası"), alt satır sabit bir iddia
       ("Üç ülkede aynı beş adım"), sağda 3/5 sayacı. Ülke sayfasında kartın alt
       satırı O ANKİ ADIMIN BAŞLIĞINI basıyor — yani solda kalın harflerle yazan
       şey, 60px sağda bir kez daha yazıyor. Kartın dibindeki yedi bölmeli şerit
       de rayın zaten gösterdiği ilerlemenin (yeşil tik + mavi çubuk) ikinci
       kopyası. Sonuç: her adım değişiminde ekranda BEŞ şey birden oynuyor —
       ray vurgusu, ray altındaki sayaç çubuğu, kartın alt başlığı, kartın
       şeridi, çizimin kendisi. Ana sayfada oynayan iki şey var: ray vurgusu ve
       çizim. Aynı 3.6 saniyede beş hareket, üç hareketten kalabalık.

   (3) IZGARANIN ÜRETTİĞİ SİYAH BOŞLUK. Kartı rayın boyuna hizalama isteği
       (haklı bir istekti) kartı Dubai'de 553px'ten 651px'e geriyor. Çizim sabit
       oranlı, 560x330; büyüyemiyor. Aradaki 98px kartın içinde siyah paspartu
       olarak kalıyor ve o boşluğu doldurmak için şerit icat edilmiş durumda —
       yani (2)'deki tekrar, (3)'ün çözümü olarak doğmuş. Bölüm bu yüzden "uzun
       bir liste + yanında yarısı boş siyah bir kutu" gibi okunuyor.

   Özet teşhis: sorun yedi adım DEĞİL. Sorun (a) satır başına iki kat işaret,
   (b) kartın rayı iki ayrı yerden tekrar etmesi, (c) hizalamanın ürettiği boş
   siyah alan. Yedi adım bu üç şeyin çarpanı, sebebi değil.

   ---- FİKİR TEK CÜMLEYLE ----

   Yedi adım yedi eşit satır olarak durduğu sürece liste kalıyor; adımlar üç
   evreye (Kararlar · Kuruluş · Operasyon) kümeleniyor, göz önce ÜÇ şey görüyor,
   seçilen evrenin adımları altındaki tek bir bölgede açılıyor.

   ---- KÜMELEME NEREDEN GELİYOR ----

   Elle yazılmış bir "Dubai'nin 1-3'ü kararlar" tablosu üç ülkede de çalışmaz ve
   ilk metin düzenlemesinde bozulur. Evre adımın KENDİSİNDEN çıkıyor: başlıkta
   geçen kelimeden (PHASE_BY_KEYWORD), tıpkı çizimin stepSceneKind'dan çıktığı
   gibi. Üç ülkenin on yedi adımı da bir evreye düşüyor ve üçünde de kümeler
   bitişik çıkıyor:

     Dubai (7)      Kararlar 1-3 · Kuruluş 4-5 · Operasyon 6-7
     İngiltere (5)  Kararlar 1   · Kuruluş 2-4 · Operasyon 5
     KKTC (5)       Kararlar 1-2 · Kuruluş 3   · Operasyon 4-5

   İki emniyet kemeri var. Birincisi: bilinmeyen bir başlık bir önceki adımın
   evresini devralıyor — sınıflandırılamayan bir adım, ardından geldiği aşamaya
   aittir. İkincisi: evre indeksi geri gidemiyor (koşan maksimum). Bir gün
   "Tescil onayı" metni "Ad onayı" olursa küme sırası bozulup evreler
   birbirinin içine geçmesin; süreç yalnızca ileri gider. Kümeleme tek bir
   evreye çökerse bölüm düz bir listeye dönüyor, yani bugünkü davranışa —
   sessizce kırılmıyor.

   ---- TEŞHİSİN ÜÇ MADDESİ NASIL KARŞILANDI ----

   (1) Satır başına işaret. Simge karoları tamamen kalktı: 38x38'lik dolu bir
       kare, yanındaki başlığı okumaya hiçbir şey katmıyordu ve yedi tanesi yan
       yana duruyordu. Sahiplik rozetinin zemini kalktı, kelimenin kendisi
       renkli: "Ortac'ta" mavi, "Sizde" yeşil, "Otoritede" gri. Renk anlamını
       koruyor, dolu zemin gürültüsü gitti. Adım satırı artık dört parça
       (numara, başlık, süre, sahiplik) ve yalnızca biri renkli.

       Aynı anda ekranda duran satır: 3 evre başlığı + en çok 3 adım = 6, ve
       ikisi farklı katman (özet / detay) olduğu için göz altısını birden
       taramıyor. İşaret sayımı: bugün ~37, burada ~14.

   (2) Kartın tekrarı. Kartın alt başlığı artık adımı yazmıyor, bölümün
       yapısını yazıyor ("7 adım, üç evre") — sabit bir iddia, rayın kopyası
       değil. Kartın dibindeki yedi bölmeli şerit tamamen kalktı. Geriye tek
       bir ilerleme göstergesi kaldı: seçili adım satırının altındaki sayaç
       çubuğu. Adım değişince oynayan şey ikiye indi — satır vurgusu ve çizim,
       ana sayfadaki gibi.

   (3) Siyah boşluk. Kart artık rayın boyuna GERİLMİYOR (align-items: start).
       Gerdirme boşluğu üretiyordu, boşluk şeridi üretiyordu, şerit tekrarı
       üretiyordu. Kart kendi doğal boyunda; iki sütun üst kenarlarından
       hizalanıyor — müşterinin istediği "kartın üstü ilk maddenin üstünde"
       şartı bu. Alt kenarların da çakışması bir tasarım şartı değildi, boşluğun
       bedeli ise ölçülmüştü.

   ---- YÜKSEKLİK NEDEN OYNAMIYOR ----

   Açılır bir kurgunun bilinen bedeli: küme değişince sütun boyu değişir ve
   altındaki her şey zıplar. Burada zıplamıyor, çünkü adım listesi ÜÇ KÜMENİN
   EN UZUNUNUN boyunda sabit: bütün kümelerin listeleri aynı ızgara hücresinde
   üst üste basılıyor (.p2-sizer, ana sayfadaki .pr5-sizer'ın aynısı), görünen
   liste de o hücrede. Hücre en uzun listenin boyunu alıyor, bölge hiç
   boyutlanmıyor. Bedeli iki adımlık kümede bir satırlık boşluk; karşılığı,
   kendi kendine yürüyen bir bölümün sayfayı hiç itmemesi.

   Gerçek akordiyon (adımların açık kümenin SATIRININ ALTINA açılması) denendi
   ve bırakıldı: orada küme değişince alttaki evre satırları bir bölge boyu
   zıplıyor ve bölüm kendi kendine küme değiştirdiği için bu on saniyede bir
   oluyor. Üç evre satırı sabit duruyor, adımlar listenin altındaki tek bir
   bölgede açılıyor; "bu adımlar hangi evrenin" bağını girinti ve sol saç teli
   taşıyor. Bir çizgi, sıfır hareket.

   ---- ÖLÇÜM ----

   Bölüm yüksekliği (headless Chrome, /lab/p2-olcum), Dubai'nin yedi adımıyla:

                  P2 · Dubai   canlı CountryProcess      fark
     1440px          943px           1120px           -177px  (-%16)
     1280px          940px           1118px           -178px  (-%16)
     1024px          906px           1123px           -217px  (-%19)
      768px         1389px           1630px           -241px  (-%15)
      390px         1253px           1593px           -340px  (-%21)

   Karşılaştırma için müşterinin "clean" dediği ana sayfa bölümü
   (ProcessScroll): 1440px'te 775px. Aradaki 168px'in tamamı iki YAPISAL
   farktan geliyor, kalabalıktan değil: başlık bloğu burada tam genişlikte
   duruyor (ana sayfada sol sütunun içinde, rayla aynı yüksekliği paylaşıyor,
   yani bedavaya geliyor) ve kart daha geniş bir sütunda olduğu için çizim de
   daha büyük.

   İki şey daha ölçüldü:
   · Masaüstünde yükseklik ÜÇ ÜLKEDE DE aynı — 1440px'te Dubai 943,
     İngiltere 943, KKTC 943. Adım sayısı bölümün boyunu artık belirlemiyor;
     canlı bölümde Dubai'nin yedi adımı bölümü beş adımlı ülkelerden ~100px
     uzatıyor. 1024px ve altında ülkeler birkaç on piksel ayrılıyor (906 /
     884 / 860) ve bunun sebebi adım sayısı değil, dar sütunda uzun bir adım
     başlığının iki satıra düşmesi.
   · Yükseklik bölüm YÜRÜRKEN de sabit: on iki saniye boyunca iki saniyede bir
     ölçüldü, küme bu sırada iki kez değişti, değer 943'te kaldı.

   ---- ZAMANLAYICI NEDEN DURUYOR ----

   Kendi kendine yürüyen panel iki turdur duruyor ve müşteri ona itiraz
   etmedi — itiraz kalabalığa. Zamanlayıcıyı da kaldırsam bu adayda iki değişken
   birden oynardı ve hangisinin işe yaradığı anlaşılmazdı. Duruyor, tek farkla:
   yürüyen imleç kümenin sonuna geldiğinde sıradaki kümeyi kendisi açıyor, yani
   bölüm hikâyeyi baştan sona yine tek başına anlatıyor. Adım süresi 3.6'dan
   4.2 saniyeye çıktı: ekranda daha az satır olduğu için gözün taraması bitmiş
   oluyor ve aynı hız aceleci geliyordu.

   Ad alanı: her şey .p2- altında, src/app/css/lab-p2.css. Bu bölüm ops-/cps-
   setlerinden hiçbir şey kullanmıyor — o setleri Workflow.tsx ve canlı
   CountryProcess paylaşıyor, aday bir tasarımın onların anlamına dokunması
   gerekmiyor. id="surec" de yok: aday /lab sayfasında öteki adaylarla birlikte
   basılıyor ve üç bölüm aynı id'yi taşıyamaz. Kazanan bölüme taşınırken id
   geri gelir. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Bir adımın ekranda kalma süresi. Canlı bölümde 3600; burada bir tık uzun,
   çünkü aynı anda görünen satır sayısı yarıya indi ve göz taramayı erken
   bitirip beklemeye başlıyor. */
const STEP_MS = 4200;
/* Ziyaretçi bir şey seçtikten sonra panelin ne kadar sessiz kalacağı. Okumayı
   bitirecek kadar uzun, bölümü sonsuza kadar dondurmayacak kadar kısa. */
const HOLD_MS = 12000;

/* ---------------------------------------------------------------- evreler -- */

type PhaseId = "karar" | "kurulus" | "operasyon";

const PHASE_ORDER: readonly PhaseId[] = ["karar", "kurulus", "operasyon"];

/* Evrenin adı ve altındaki tek satır. Alt satır adımların özeti DEĞİL — özet
   olsaydı üç ülkede üç farklı metin gerekirdi ve adım metni her değiştiğinde
   yalan söylemeye başlardı. Söylediği şey evrenin karakteri: kararların ne
   zaman verildiği, kuruluşun kimde yürüdüğü, operasyonun neyi bitirdiği. */
const PHASE_META: Record<PhaseId, { name: string; lead: string }> = {
  karar: { name: "Kararlar", lead: "Görüşmede netleşen seçimler" },
  kurulus: { name: "Kuruluş", lead: "Dosya, tescil ve lisans" },
  operasyon: { name: "Operasyon", lead: "Şirketin çalışır hâle gelmesi" },
};

/* Adım → evre. Sıra ÖNEMLİ, çünkü bir başlık birden çok anahtar taşıyabiliyor
   ve listede önce gelen kazanıyor:
   · "Faaliyet ve lisans türünün belirlenmesi" hem faaliyet hem lisans taşıyor;
     adım bir KARAR (ne satıyorsunuz), lisansın alınması ayrı bir adım — bu
     yüzden "faaliyet" listede "lisans"tan önce.
   · "Vergi kaydı ve teslim" hem kayıt hem teslim taşıyor; adımın bittiği yer
     teslim, o da operasyon.
   · "Evrak ve isim seçimi" hem evrak hem isim taşıyor; ikisi de karar, sıra
     fark etmiyor ama tutarlılık için isim önce.
   Kelime köküyle eşleşiyor: Türkçede ünlü düşmesi var, "isminin" içinde "isim"
   geçmiyor — "ism" her iki çekimi de yakalıyor. */
const PHASE_BY_KEYWORD: ReadonlyArray<readonly [string, PhaseId]> = [
  ["teslim", "operasyon"],
  ["banka", "operasyon"],
  ["hesap", "operasyon"],
  ["gsm", "operasyon"],
  ["emirates", "operasyon"],
  ["medical", "operasyon"],
  ["sağlık", "operasyon"],
  ["kimlik", "operasyon"],
  ["vize", "operasyon"],
  ["kuruluş tipi", "karar"],
  ["faaliyet", "karar"],
  /* İKİ yazım da gerekiyor ve bu bir kopya değil. Türkçede ünlü düşmesi var:
     "isminin" içinde "isim" GEÇMİYOR, "isim onayı" içinde de "ism" geçmiyor.
     Tek kökle yazıldığında KKTC'nin ikinci adımı ("İsim onayı") kararlar
     kümesine düşmüyor, "onay" anahtarına takılıp kuruluşa gidiyordu — ölçüldü,
     kümeler 1 / 2-3 / 4-5 çıkıyordu. */
  ["ism", "karar"],
  ["isim", "karar"],
  ["evrak", "karar"],
  ["seçim", "karar"],
  ["tescil", "kurulus"],
  ["lisans", "kurulus"],
  ["başvuru", "kurulus"],
  ["onay", "kurulus"],
  ["kayıt", "kurulus"],
  ["vergi", "kurulus"],
  ["adres", "kurulus"],
  ["belge", "kurulus"],
];

/** Adımın başlığından evresi. Eşleşme yoksa null — çağıran taraf o adımı bir
 *  öncekinin evresine yazıyor. */
function stepPhase(title: string): PhaseId | null {
  /* Türkçe locale şart: varsayılan toLowerCase "İ" harfini noktalı bir i'ye
     çeviriyor ve "İsim onayı" hiçbir anahtarla eşleşmiyor. */
  const t = title.toLocaleLowerCase("tr");
  for (const [word, phase] of PHASE_BY_KEYWORD) {
    if (t.includes(word)) return phase;
  }
  return null;
}

type Group = { id: PhaseId; steps: Step[]; from: number; to: number };

/** Adım listesini bitişik evre kümelerine ayırıyor. Boş evre üretilmiyor;
 *  kümeler her zaman adım sırasını koruyor. */
function groupSteps(steps: Step[]): Group[] {
  /* Koşan maksimum: evre indeksi geri gidemez. Bu bir üslup tercihi değil,
     kurgunun taşıyıcısı — kümeler bitişik olmazsa "1-3, 5, 4, 6-7" gibi bir
     sıra çıkar ve bölümün tek iddiası (yol, sırayla) çöker. Metin değişince
     kırılma yerine kayma oluyor: yanlış yere düşen bir adım en fazla bir
     önceki kümede kalır. */
  let cursor = 0;
  const phases = steps.map((s, i) => {
    const guess = stepPhase(s.title);
    /* eşleşmeyen adım: bir öncekinin evresi (ilk adımsa en baştaki evre) */
    const idx = guess ? PHASE_ORDER.indexOf(guess) : i === 0 ? 0 : cursor;
    cursor = Math.max(cursor, idx);
    return cursor;
  });

  const out: Group[] = [];
  phases.forEach((p, i) => {
    const last = out[out.length - 1];
    if (last && last.id === PHASE_ORDER[p]) {
      last.steps.push(steps[i]);
      last.to = i;
      return;
    }
    out.push({ id: PHASE_ORDER[p], steps: [steps[i]], from: i, to: i });
  });
  return out;
}

/* ------------------------------------------------------------- bileşen ---- */

export default function ProcessP2({
  steps,
  title,
}: {
  steps: Step[];
  title: string;
}) {
  const hostRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  /* aria-controls bir id istiyor ve id belgede tekil olmak zorunda. Bölüm üç
     ülkede de basılıyor ve aday sayfasında birden çok kopyası yan yana
     durabiliyor; sabit bir metin yazsaydım o sayfada üç düğme aynı bölgeyi
     işaret ederdi. */
  const panelId = `p2-steps-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const groups = useMemo(() => groupSteps(steps), [steps]);

  /* Global adım indeksi tek doğruluk kaynağı. Hangi kümenin açık olduğu ondan
     TÜRETİLİYOR, ayrı bir state değil: iki state olsaydı (açık küme + seçili
     adım) ikisinin çelişmediğini her yerde ayrıca korumak gerekirdi — kümeyi
     değiştiren tıklama, adımı değiştiren zamanlayıcı, kırpma… Tek sayı hepsini
     tutarlı tutuyor. */
  const [active, setActive] = useState(0);
  /* Sayaç, bayrak değil. Bayrakla, zaten açık olan adıma basmak hiçbir state
     değiştirmiyor, dolayısıyla aşağıdaki effect yeniden çalışmıyor ve bekleme
     yenilenmiyordu: panel, ziyaretçinin "burada dur" dediği adımdan yürüyüp
     gidiyordu. Her seçim jetonu artırıyor, her seçim beklemeyi baştan
     başlatıyor. Sıfır = kimse tutmuyor. */
  const [hold, setHold] = useState(0);
  const [inView, setInView] = useState(false);

  const total = steps.length;
  const running = inView && hold === 0 && !reduced && total > 1;

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { rootMargin: "0px 0px -15% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [running, total]);

  useEffect(() => {
    if (hold === 0) return;
    const id = window.setTimeout(() => setHold(0), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [hold]);

  const goTo = useCallback((i: number) => {
    setHold((h) => h + 1);
    setActive(i);
  }, []);

  if (total === 0 || groups.length === 0) return null;

  /* Adım sayısı ülkeye göre değişiyor. İndekse güvenilmiyor, kırpılıyor: liste
     kısalırsa imleç listenin dışını göstermesin. */
  const current = Math.min(active, total - 1);
  const step = steps[current];
  const kind = stepSceneKind(step.title);
  const Scene = kind ? SCENE_BY_KIND[kind] : null;

  /* Açık küme = seçili adımı içeren küme. Bir kümeye basmak o kümenin İLK
     adımını seçiyor; yani "kümeyi aç" ile "adımı seç" tek bir işlem. */
  const openIndex = Math.max(
    0,
    groups.findIndex((g) => current >= g.from && current <= g.to),
  );
  const openGroup = groups[openIndex];

  return (
    /* Hareket azaltma isteği burada tek yerden karşılanıyor. Zamanlayıcıyı
       `running` zaten durduruyor ve kendi geçişlerim `reduced` ile sıfırlanıyor
       — ama SetupScenes'teki dokuz çizimin KENDİ giriş animasyonları (formun
       yazılması, mührün oturması) o dosyanın içinde ve orada böyle bir kontrol
       yok. Dosya ana sayfayla paylaşıldığı için her çizime ayrı bayrak geçirmek
       yerine kural ağacın tepesinde bir kez konuyor: reducedMotion="user"
       alttaki bütün motion bileşenlerinde dönüşüm ve düzen animasyonlarını
       kapatıyor, opaklığı bırakıyor — çizimler yerlerinden oynamadan beliriyor.
       SplitWords ile FadeUp de aynı kuralın altında. */
    <MotionConfig reducedMotion="user">
      <section
        ref={hostRef}
        className="sec-pad"
        style={{ background: "var(--white)" }}
      >
        <div className="container-o">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text={title}
              accent="adım adım."
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">
                {/* Spot cümlenin iki işi var: bölümün kurgusunu (üç evre) ve
                    kontrolünü (tıklayınca durur) tek nefeste söylemek. */}
                Süreç üç evrede yürüyor. Bir evreye basın, adımları açılsın; her
                adımda topun kimde olduğu yazıyor.
              </p>
            </FadeUp>
          </div>

          <div className="p2-grid">
            <div className="p2-rail">
              {/* --- üst katman: üç evre --- */}
              {/* Açılır kurgu, sekme değil: üç düğme tek bir bölgeyi açıyor ve
                  aria-expanded hangisinin açık olduğunu söylüyor. role="tab"
                  seçilmedi çünkü o sözleşme ok tuşlarıyla gezinmeyi de vaat
                  ediyor; burada üç düğme sekmeyle sırayla geziliyor ve
                  vaadedilmeyen bir şey eksik kalmıyor. */}
              <div className="p2-tabs">
                {groups.map((g, gi) => {
                  const meta = PHASE_META[g.id];
                  const on = gi === openIndex;
                  const done = g.to < current;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      className="p2-tab"
                      data-on={on || undefined}
                      data-done={done || undefined}
                      aria-expanded={on}
                      aria-controls={panelId}
                      onClick={() => goTo(g.from)}
                    >
                      <span className="p2-tab-txt">
                        <span className="p2-tab-name">{meta.name}</span>
                        <span className="p2-tab-lead">{meta.lead}</span>
                      </span>
                      {/* Kümenin adım aralığı. Hem kaç adım olduğunu hem yolun
                          neresine denk geldiğini tek işaretle söylüyor; ayrı
                          bir "3 adım" etiketi gereksiz kalıyor. Tek adımlık
                          kümede aralık yerine tek numara. */}
                      <span className="p2-tab-rng">
                        {g.from === g.to
                          ? String(g.from + 1).padStart(2, "0")
                          : `${String(g.from + 1).padStart(2, "0")}–${String(
                              g.to + 1,
                            ).padStart(2, "0")}`}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* --- alt katman: açık kümenin adımları --- */}
              {/* Bölgenin boyu sabit: bütün kümelerin listeleri aynı ızgara
                  hücresinde üst üste basılıyor, hücre en uzun listenin boyunu
                  alıyor. Küme değişince bölge boyutlanmıyor, dolayısıyla
                  altındaki hiçbir şey zıplamıyor — bölüm kendi kendine küme
                  değiştirdiği için bu şart, ziyaretçinin eli sayfada dolaşırken
                  yerin kayması en pahalı hata olurdu. */}
              <div className="p2-stack" id={panelId}>
                <div className="p2-sizer" aria-hidden="true">
                  {groups.map((g) => (
                    <div key={g.id} className="p2-steps">
                      {g.steps.map((s, i) => (
                        <span key={s.title} className="p2-step">
                          <span className="p2-sn">
                            {String(g.from + i + 1).padStart(2, "0")}
                          </span>
                          <span className="p2-stxt">
                            <span className="p2-st">{s.title}</span>
                            <span className="p2-sm">
                              <i>{s.timing}</i>
                              <em>{WHO_LABEL[s.who]}</em>
                            </span>
                          </span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={openGroup.id}
                    className="p2-slide"
                    initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -6 }}
                    transition={{ duration: reduced ? 0 : 0.24, ease: EASE }}
                  >
                    <div
                      className="p2-steps"
                      role="group"
                      aria-label={`${PHASE_META[openGroup.id].name} adımları`}
                    >
                      {openGroup.steps.map((s, i) => {
                        const gi = openGroup.from + i;
                        const on = gi === current;
                        const done = gi < current;
                        return (
                          <button
                            key={s.title}
                            type="button"
                            className="p2-step"
                            data-on={on || undefined}
                            data-done={done || undefined}
                            aria-current={on ? "step" : undefined}
                            onClick={() => goTo(gi)}
                            /* Etiket adımın TAMAMINI taşıyor. Ekranda yalnızca
                               başlık, süre ve sahiplik görünüyor; adımın
                               anlatımı (Step.line) hiçbir yerde basılmıyor ve
                               çizim ekran okuyucudan gizli — metnin tek
                               erişilebilir kopyası burası. */
                            aria-label={`${gi + 1}. adım: ${s.title}. ${s.line} ${s.timing}, ${WHO_LABEL[s.who]}.`}
                          >
                            <span className="p2-sn">
                              {String(gi + 1).padStart(2, "0")}
                            </span>
                            <span className="p2-stxt">
                              <span className="p2-st">{s.title}</span>
                              <span className="p2-sm">
                                <i>{s.timing}</i>
                                {/* Sahiplik: dolu rozet değil, renkli kelime.
                                    Rozetin zemini yedi satırda yedi renkli
                                    dikdörtgen üretiyordu; anlamı taşıyan şey
                                    zaten kelimenin kendisi. */}
                                <em data-who={s.who}>{WHO_LABEL[s.who]}</em>
                              </span>
                            </span>
                            {on && (
                              /* Bölümdeki TEK ilerleme göstergesi. Bir adım
                                 boyunca doluyor, yani sayacın tahmini değil
                                 kendisi. Yalnızca sayaç yürürken basılıyor:
                                 durdurulmuş ya da hareket azaltılmış durumda
                                 boş yatak kalıyor, sahte dolum görünmüyor. */
                              <span className="p2-bar" aria-hidden="true">
                                {running ? (
                                  <motion.i
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{
                                      duration: STEP_MS / 1000,
                                      ease: "linear",
                                    }}
                                  />
                                ) : (
                                  <i style={{ transform: "scaleX(0)" }} />
                                )}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* --- gece kartı --- */}
            <div className="p2-card">
              <div className="p2-card-head">
                <div className="p2-card-txt">
                  <p className="p2-card-t">Kuruluş dosyası</p>
                  {/* Sabit bir iddia, rayın kopyası değil. Eski kart burada o
                      anki adımın başlığını basıyordu — solda kalın harflerle
                      yazan şeyin ikinci kopyası. */}
                  <p className="p2-card-s">
                    {total} adım, {groups.length} evre
                  </p>
                </div>
                <span className="p2-card-tag">
                  {current + 1}/{total}
                </span>
              </div>

              {/* Çizim ekran okuyucudan gizli, bilerek: rayın satırı zaten
                  adımın tamamını taşıyor ve bu yüzey 4.2 saniyede bir kendi
                  kendine değişiyor. Ray kelimeleri taşıyor, bu onların resmi.
                  Dipnot gövdenin DIŞINDA — o bir hukuki cümle, gizlenemez. */}
              <div className="p2-card-body" aria-hidden="true">
                <div className="p2-stage" data-empty={Scene ? undefined : "true"}>
                  <AnimatePresence mode="wait" initial={false}>
                    {Scene && (
                      <motion.div
                        key={current}
                        className="p2-scene"
                        initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                        transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
                      >
                        <Scene />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Kalması şart olan satır: panel son adıma kendi başına
                  yürüyor, dolayısıyla garanti verilmediği tikin yokluğuyla ima
                  edilemez, kelimeyle söylenir. */}
              <p className="p2-card-foot">
                Süreler tipik aralıktır. Kurum ve banka kararları ilgili kuruluşlara
                aittir; sonuç ve süre garanti edilmez.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
