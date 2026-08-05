"use client";

import { useCallback, useEffect, useState } from "react";

/* ============================================================================
   ADAY 2 · "KLASÖR" — muhasebe hero sahnesi denemesi
   CSS: src/app/css/lab-mhk.css · ad alanı .mhk-

   ---------------------------------------------------------------- FİKİR
   Sahne tek bir nesne: sağ kenarında dört FİHRİST TIRNAĞI olan bir klasör.
   Tırnağa basınca klasör o bölmeye açılıyor; kimse basmazsa kendi kendine
   çeviriyor. Dört bölme muhasebenin dört yüzü — defter, beyan, rapor, arşiv.

   NEDEN /dubai KARTININ KOPYASI DEĞİL: o kartın kumandası çizimin ALTINDAKİ
   beş segmentlik şerit, yani bir arayüz parçası. Buradaki kumanda çizimin
   KENDİSİ: bir klasörün gerçek fihrist tırnakları. Şerit yok, "kim yapıyor"
   rozeti yok, beş aşama yok. Ortak olan tek şey ilke: ziyaretçi seçince kart
   susuyor ve onu dinliyor.

   DÖRT ŞİKÂYETE KARŞILIK
   · "aksiyon yok"    → iki cevap birden. (1) OTOMATİK: 3.7 saniyede bir
                        sahnenin TAMAMI değişiyor; canlı sahnede kımıldayan
                        şey tuvalin binde ikisiydi, burada değişen şey tuvalin
                        tamamı. (2) ETKİLEŞİM: tırnak gerçek bir düğme, basınca
                        tur duruyor. Müşterinin "çok daha iyiydi" dediği kartta
                        beğendiği şey buydu.
   · "anlatmıyor"     → dört bölmenin dördü de ADLI ve her birinin altında tek
                        satır karşılığı var. Dördü de sayfanın kendi metninden
                        çıkıyor (accountingDubai.ts · phases, outputs, gains),
                        yeni bir iddia yok.
   · "çok basic"      → dört ayrı nesne: dikişli sırtı olan ciltli defter,
                        kutulu alanları olan beyan formu ve girdiği yarık,
                        eksensiz bir eğrinin olduğu rapor, sırtları dizili
                        arşiv rafı. Hiçbiri diğerinin yeniden renklendirilmiş
                        hâli değil.
   · "bir şey yanlış" → canlı sahnede çizim panelin içinde yüzüyordu ve iki
                        kelime altına yapışmış bir altyazı şeridi gibi
                        duruyordu. Burada çizimin bir SAHNESİ var (kendi
                        çerçevesi), adı sahnenin altında manşet punto ile.

   NEYİ FEDA EDİYOR: "use client" gerekiyor (diğer iki aday saf CSS), DOM'a
   dört çizim birden giriyor, ve dördü tek bir nesnenin bölmeleri olduğu için
   sahne bir SÜREÇ anlatamıyor — sıra yok, envanter var.

   ------------------------------------------------------ HİDRASYON KURALI
   useReducedMotion KULLANILMIYOR. Bu depoda beş ayrı kalıpta hidrasyon hatası
   çıkardı. Burada `reduced` matchMedia ile YALNIZCA useEffect içinde okunuyor
   ve render ağacına hiç girmiyor: sunucu ile ilk istemci render'ı birebir aynı
   işaretlemeyi üretiyor, fark yalnızca zamanlayıcının kurulup kurulmadığı.
   Kalıp HeroDubaiCards.tsx'ten alındı.

   SÜREKLİ ANİMASYON SAYISI: SIFIR. Bu adayda hiçbir sonsuz döngü yok —
   bütün hareket bir DURUM DEĞİŞİKLİĞİNE cevap, yani geçiş (transition).
   Geçişler de yalnızca no-preference altında tanımlı, o yüzden reduce açıkken
   getAnimations() bu karttan sıfır döndürüyor ve hiçbir periyot sitedeki
   döngülerle senkrona giremiyor.
   ========================================================================= */

/* Bir bölmenin ekranda kalma süresi. Dört bölme = 14.8 saniyelik tam tur.
   /dubai kartının 3800 ms'inden bilerek ayrı: iki kart aynı sayfada değil ama
   aynı ailede, aynı ritimde nefes almalarına gerek yok. */
const DWELL = 3700;

type Leaf = {
  key: string;
  /** tırnağın üstündeki ad — aynı zamanda sahnenin adı */
  word: string;
  /** o bölmenin tek satırlık karşılığı; cümle bütçesinin tamamı */
  meta: string;
  art: React.ReactNode;
};

/* --------------------------------------------------------------------------
   1 · DEFTER — ciltli bir defter sayfası.

   Canlı sahnenin en çok iş yapan parçası (cetvelli satır + tutar sütunu)
   burada KORUNDU, çünkü reddedilen şey o doku değil, o dokunun tek başına
   bütün sahneyi taşımasıydı. Ama tek başına bir "yükleniyor" iskeleti gibi
   okunmasın diye üç şey eklendi: arkada ikinci bir sayfa, solda DİKİŞLİ SIRT
   ve satırların üstünde gezen mavi imleç. Dikiş bu çizimi tartışmasız bir
   ciltli deftere çeviriyor.
   MAVİ: işlenmekte olan satırın tutarı. Sahnenin tek olayı.
-------------------------------------------------------------------------- */
const LEDGER_ROWS = [96, 128, 160, 192, 224, 256];
const LEDGER_W = [150, 118, 162, 132, 144, 126];

function LeafDefter() {
  return (
    <svg className="mhk-art" viewBox="0 0 460 340" aria-hidden="true" focusable="false">
      {/* arkadaki sayfa — derinlik perspektifle değil MERDİVENLE */}
      <rect className="mhk-sur-q" x="58" y="44" width="368" height="258" rx="10" />
      <rect className="mhk-face" x="44" y="32" width="376" height="268" rx="10" />

      {/* Sırt ve dikişler. Beş dikiş, sayfanın boyuna eşit aralıklı. */}
      <path className="mhk-rule" d="M74 32 V300" />
      {[62, 110, 158, 206, 254].map((y) => (
        <rect key={y} className="mhk-stitch" x="52" y={y} width="14" height="16" rx="3" />
      ))}

      <rect className="mhk-ink" x="92" y="52" width="116" height="12" rx="6" />
      <path className="mhk-rule" d="M92 80 H400" />
      <path className="mhk-rule" d="M330 80 V278" />

      {/* Satır tabanları: cetvelli satır bir defterin en tanınabilir dokusu. */}
      <path className="mhk-hair" d={LEDGER_ROWS.map((y) => `M92 ${y + 20} H400`).join(" ")} />
      {LEDGER_ROWS.map((y, i) => (
        <g key={y}>
          <rect className="mhk-dim" x="92" y={y} width={LEDGER_W[i]} height="10" rx="5" />
          <rect className="mhk-dim" x="340" y={y} width="52" height="10" rx="5" />
        </g>
      ))}
      {/* İşlenen satır. Bölme açılırken yukarıdan yerine iniyor — sahnenin
          "şu anda çalışılıyor" beati. */}
      <rect className="mhk-act" x="340" y="192" width="52" height="10" rx="5" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   2 · BEYAN — form ve girdiği yarık.

   Form KUTULU ALANLARDAN kuruluyor, satırlardan değil: kutulu alan bir
   beyannamenin, düz satır bir mektubun işareti. Sağdaki yarık beyanın
   gittiği yer; kurum çizilmedi, amblem çizilmedi — sahte bir resmî işaret
   çizimi yalana çevirir (aynı kural /dubai kartında da yazılı).
   MAVİ: yarığa giren ok. Onay değil, TESLİM.
-------------------------------------------------------------------------- */
function LeafBeyan() {
  const boxes = [
    [52, 96],
    [172, 96],
    [52, 158],
    [172, 158],
    [52, 220],
    [172, 220],
  ];
  return (
    <svg className="mhk-art" viewBox="0 0 460 340" aria-hidden="true" focusable="false">
      <rect className="mhk-face" x="28" y="30" width="272" height="280" rx="10" />
      <rect className="mhk-ink" x="52" y="52" width="104" height="12" rx="6" />
      <path className="mhk-rule" d="M52 78 H276" />

      {boxes.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect className="mhk-box" x={x} y={y} width="104" height="50" rx="5" />
          <rect className="mhk-dim" x={x + 12} y={y + 30} width="44" height="7" rx="3.5" />
        </g>
      ))}
      {/* İmza satırı: boş bir imza satırı "burada bir şey bekleniyor" diyor. */}
      <path className="mhk-hair" d="M52 288 H276" />

      {/* Yarık paneli: beyanın gittiği yer. En uzak düzlem, dolgusuz. */}
      <rect className="mhk-sur-q" x="356" y="58" width="80" height="224" rx="10" />
      <rect className="mhk-well" x="368" y="152" width="56" height="14" rx="7" />

      <path className="mhk-act-line" d="M312 159 H352" />
      <path className="mhk-act" d="M362 159 l-12 -6.5 v13 z" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   3 · RAPOR — eksensiz bir eğri ve altında iki özet bloğu.

   EĞRİ BİR ORAN İDDİA ETMİYOR: eksen yok, etiket yok, rakam yok, ve çizgi
   BİLEREK inişli çıkışlı. Sürekli yükselen bir çizgi "kazandırıyoruz" derdi
   ve bu sahnenin söyleyeceği bir şey değil — rapor bir sonucu değil, sonucun
   GÖRÜLEBİLİR olduğunu anlatıyor.
   MAVİ: eğrinin kendisi. Raporun tek konusu o.
-------------------------------------------------------------------------- */
function LeafRapor() {
  const dots = [
    [72, 202],
    [136, 168],
    [200, 190],
    [264, 146],
    [328, 176],
    [392, 140],
  ];
  return (
    <svg className="mhk-art" viewBox="0 0 460 340" aria-hidden="true" focusable="false">
      <rect className="mhk-face" x="34" y="30" width="392" height="280" rx="10" />
      <rect className="mhk-ink" x="58" y="52" width="112" height="12" rx="6" />
      <path className="mhk-rule" d="M58 78 H402" />

      {/* taban ve iki yatay kılavuz — ölçek değil, zemin */}
      <path className="mhk-hair" d="M58 146 H402 M58 194 H402" />
      <path className="mhk-rule" d="M58 242 H402" />

      <path
        className="mhk-act-line"
        d="M72 202 L136 168 L200 190 L264 146 L328 176 L392 140"
      />
      {dots.map(([x, y]) => (
        <circle key={`${x}`} className="mhk-act" cx={x} cy={y} r="4.2" />
      ))}

      {/* İki özet bloğu: tablo ve bilanço. İçlerinde rakam değil, satır var. */}
      {[58, 236].map((x) => (
        <g key={x}>
          <rect className="mhk-box" x={x} y="262" width="166" height="30" rx="5" />
          <rect className="mhk-dim" x={x + 14} y="273" width="62" height="8" rx="4" />
          <rect className="mhk-dim" x={x + 106} y="273" width="42" height="8" rx="4" />
        </g>
      ))}
    </svg>
  );
}

/* --------------------------------------------------------------------------
   4 · ARŞİV — raftaki sırtlar ve dışarı çekilmiş olan.

   Sahnenin cümlesi tek: "istendiği anda bulunuyor". Sırtların genişliği ve
   boyu EŞİT DEĞİL — eşit olsalardı bir grafik gibi okunurdu, oysa bunlar
   farklı kalınlıkta dosyalar. Rakam, tarih ve ay adı YOK: bir raf takvim
   değildir ve bu çizim bir takvim iddiası taşımıyor.
   MAVİ: çekilmiş olan sırt. Aranan şey.
-------------------------------------------------------------------------- */
const SPINES: { x: number; w: number; h: number }[] = [
  { x: 46, w: 26, h: 172 },
  { x: 78, w: 20, h: 196 },
  { x: 104, w: 30, h: 160 },
  { x: 140, w: 22, h: 188 },
  { x: 168, w: 26, h: 176 },
  { x: 200, w: 18, h: 204 },
  { x: 258, w: 24, h: 184 },
  { x: 288, w: 20, h: 158 },
  { x: 314, w: 30, h: 192 },
  { x: 350, w: 22, h: 170 },
  { x: 378, w: 26, h: 186 },
];
const SHELF_Y = 284;
/* boşluk bırakılan yer: çekilen dosyanın raftaki yuvası (x 224..252) */
const PULLED = { x: 224, w: 28, h: 198 };

function LeafArsiv() {
  return (
    <svg className="mhk-art" viewBox="0 0 460 340" aria-hidden="true" focusable="false">
      <rect className="mhk-sur-q" x="26" y="34" width="408" height="272" rx="10" />
      <path className="mhk-rule" d={`M40 ${SHELF_Y} H420`} />

      {SPINES.map((s) => (
        <g key={s.x}>
          <rect
            className="mhk-spine"
            x={s.x}
            y={SHELF_Y - s.h}
            width={s.w}
            height={s.h}
            rx="3"
          />
          <rect
            className="mhk-dim"
            x={s.x + 4}
            y={SHELF_Y - s.h + 16}
            width={s.w - 8}
            height="12"
            rx="2"
          />
        </g>
      ))}

      {/* Yuva: çekilen dosyanın raftaki boşluğu. Boşluk olmasaydı çekilen
          dosya raftan gelmiş gibi okunmazdı. */}
      <rect
        className="mhk-slot"
        x={PULLED.x}
        y={SHELF_Y - PULLED.h}
        width={PULLED.w}
        height={PULLED.h}
        rx="3"
      />

      {/* Çekilmiş dosya: yuvasından yukarı ve öne. Bölme açılırken yerine
          oturuyor, yani "arandı ve bulundu" bir an olarak görünüyor. */}
      <g className="mhk-pull">
        <rect
          className="mhk-act-fill"
          x={PULLED.x - 2}
          y={SHELF_Y - PULLED.h - 34}
          width={PULLED.w + 4}
          height={PULLED.h}
          rx="3"
        />
        <rect
          className="mhk-act-tag"
          x={PULLED.x + 3}
          y={SHELF_Y - PULLED.h - 16}
          width={PULLED.w - 6}
          height="14"
          rx="2"
        />
      </g>
    </svg>
  );
}

/* Dört bölme. Alt satırların dördü de sayfanın kendi metninden:
   defter/rapor → exchange.outputs, beyan → phases[2], arşiv → gains[2].
   Yeni bir rakam, oran, tarih ya da vaat üretilmedi. */
const LEAVES: Leaf[] = [
  {
    key: "defter",
    word: "Defter",
    meta: "Gelir, gider ve fatura kayıtları burada tutuluyor.",
    art: <LeafDefter />,
  },
  {
    key: "beyan",
    word: "Beyan",
    meta: "KDV ve yıllık beyan takvime göre veriliyor.",
    art: <LeafBeyan />,
  },
  {
    key: "rapor",
    word: "Rapor",
    meta: "Gelir-gider tablosu, bilanço ve nakit akışı.",
    art: <LeafRapor />,
  },
  {
    key: "arsiv",
    word: "Arşiv",
    meta: "Banka ya da denetim istediğinde dosya hazır.",
    art: <LeafArsiv />,
  },
];

export default function MhKlasor() {
  const [active, setActive] = useState(0);
  /* İki ayrı duraklatma sebebi, ikisi de /dubai kartındaki gerekçeyle:
     fare kartın üstünde (geçici) ve ziyaretçi bir tırnağa bastı (kalıcı).
     İkincisi kalıcı, çünkü basmak "ben seçiyorum" demek; dört saniye sonra
     kartın onu geri alması kararı çöpe atardı. */
  const [hovered, setHovered] = useState(false);
  const [taken, setTaken] = useState(false);

  useEffect(() => {
    /* reduced YALNIZCA burada okunuyor — render ağacına girmiyor, yani
       sunucu ve istemci aynı işaretlemeyi üretiyor. Hareket kapalıysa
       zamanlayıcı hiç kurulmuyor: klasör ilk bölmede duruyor ve çevirmek
       isteyen tırnağa basıyor. */
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || hovered || taken) return;
    const id = window.setTimeout(() => {
      setActive((v) => (v + 1) % LEAVES.length);
    }, DWELL);
    return () => window.clearTimeout(id);
  }, [active, hovered, taken]);

  const pick = useCallback((i: number) => {
    setActive(i);
    setTaken(true);
  }, []);

  return (
    <div
      className="mhk"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="mhk-body">
        {/* Sahne: dört çizim de DOM'da ve üst üste. Sebebi ölçü ve süreklilik —
            sahne kutusu hiç boşalmıyor, bölme değişirken kartın yüksekliği
            oynamıyor ve çizimler her turda yeniden kurulmuyor. */}
        <div className="mhk-stage" aria-hidden="true">
          {LEAVES.map((l, i) => (
            /* data-leaf: her bölmenin GİRİŞ BEATİ kendine ait (defter'de mavi
               satır yukarıdan iniyor, beyan'da ok yarığa giriyor, rapor'da
               eğri çiziliyor, arşiv'de dosya yuvasından çekiliyor). Ortak bir
               beat dördünü de aynı sahneye çevirirdi. */
            <div key={l.key} className="mhk-scene" data-leaf={l.key} data-on={i === active}>
              {l.art}
            </div>
          ))}
        </div>

        {/* Fihrist tırnakları. Sol kenarları negatif kenar boşluğuyla sahnenin
            altına giriyor (CSS), yani tırnak sahneye YAPIŞIK duruyor —
            yanında duran dört düğme değil, klasörün kendi kenarı. */}
        <div className="mhk-tabs">
          {LEAVES.map((l, i) => (
            <button
              key={l.key}
              type="button"
              className="mhk-tab"
              data-on={i === active}
              aria-pressed={i === active}
              onClick={() => pick(i)}
            >
              <i aria-hidden="true" />
              <span>{l.word}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bölmenin adı ve karşılığı. Dördü de DOM'da, mutlak konumla üst üste:
          "Defter" ile "Arşiv" arasındaki genişlik farkı hizayı bozmuyor ve
          bölme değişirken kartın altı zıplamıyor. */}
      <div className="mhk-say">
        {LEAVES.map((l, i) => (
          <div key={l.key} className="mhk-c" data-on={i === active} aria-hidden={i !== active}>
            <b className="mhk-word">{l.word}</b>
            <span className="mhk-meta">{l.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
