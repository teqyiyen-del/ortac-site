"use client";

import { useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import CountryPicker, { COUNTRY_ORDER } from "@/components/shared/CountryPicker";
import { FACTS } from "@/lib/brand";
import { useOrtacStore, type Country } from "@/lib/store";
import { gtm } from "@/lib/gtm";

/* ============================================================================
   HERO SAHNESİ — ADAY G4 · "BELGE"
   CSS: src/app/css/lab-g4.css (ad alanı .g4-)

   ------------------------------------------------------------ FİKİR NE, NEDEN

   Küre "dünya çapındayız" diyordu ve müşteri onu klişe buldu. Ama asıl kusur
   klişelik değil: o cümle kimsenin sormadığı sorunun cevabı. Hero'ya gelen kişi
   "bu firma dünya çapında mı" diye düşünmüyor; "kurunca elime ne geçiyor" diye
   düşünüyor.

   G4 tam o soruyu cevaplıyor ve vaadi değil ÇIKTIYI gösteriyor:

     Sahne, kuruluşun sonunda elinize geçen evrakın kendisi.
     Dubai'de ticaret lisansı, İngiltere'de kuruluş tescil belgesi,
     KKTC'de yerel tescil belgesi. Ülke seçimi belgeyi değiştiriyor.

   Beğenilen çekirdek korunuyor: seçim yukarıdan yapılıyor, sahne ona tepki
   veriyor, ve değişen şey o ülkeyi HİSSETTİRİYOR. Yalnız burada "hissettiren"
   şey manzara değil kâğıdın kendisi — oranı, mühürün yeri, alan düzeni, damga.

   ------------------------------------------------------- ÖLÇEK: MASA MESAFESİ

   G2 ufuk mesafesinden bakıyor (kilometrelerce), G3 göz hizasından bir kapının
   önünden (metrelerce). G4 masa mesafesinden bakıyor: elinizin uzanacağı kadar
   yakın. Üç aday aynı soruya üç farklı uzaklıktan cevap veriyor; bu yüzden yan
   yana konduklarında birbirinin varyasyonu gibi durmuyorlar.

   Bunun bir sonucu daha var: G4, üç adayın içinde AYDINLIK olan tek sahne.
   Kâğıt beyaz. #080808'lik hero'da açık renkli bir dikdörtgen gözün gittiği tek
   yer oluyor ve "belge" kelimesi hiç yazılmadan okunuyor.

   ---------------------------------------------------------- MEKANİK: DESTE

   G2 şeridi yatayda kaydırıyor, G3 duvarı. G4 kaydırmıyor — DESTEYİ ÇEVİRİYOR.
   Üç evrak aynı taban çizgisine oturmuş bir yelpaze hâlinde duruyor; seçilen
   ülkenin evrakı öne geliyor, dikleşiyor ve ışığı üstüne alıyor, diğer ikisi
   yana yatıp gölgede kalıyor. Masada duran bir evrak destesinden birini üste
   almak gibi. Dönüş merkezi kâğıdın ALT kenarı: yelpaze açılırken üç kâğıt da
   masadan kalkmıyor, hepsi aynı çizgiye basmaya devam ediyor.

   ------------------------------------------------- SAHTE EVRAK ÜRETİLMİYOR

   Bu bir kural, tercih değil. Ekranda tek bir harf yok: başlıklar, alanlar ve
   satırlar STİLİZE çubuk. Numara, tarih, imza, QR, barkod, gerçek arma yok;
   mühürler ve damgalar soyut (halka + ışın, kalkan konturu, elips) — hiçbiri
   var olan bir kurumun armasına benzemiyor. Yani belgenin BİÇİMİ tanınıyor,
   içeriği okunmuyor. Gerçekçi görünen sahte resmî evrak hem yanıltıcı olurdu
   hem de gereksiz: "bu bir ticaret lisansı" bilgisini kâğıdın düzeni zaten
   veriyor.

   Gerçek metin tek yerde: sahnenin yanındaki etiket. Orada da yalnızca belgenin
   adı ve brand.ts'teki FACTS.structure yazıyor (Dubai serbest bölge/mainland,
   Limited · Companies House, Limited · yerel tescil). Fiyat, gün sayısı, banka
   vaadi yok. Metnin kâğıdın DIŞINDA olmasının ikinci bir faydası daha var:
   evrak küçüldükçe okunaksızlaşan bir yazı kalmıyor, etiket her ekranda
   HTML tipografisi olarak okunuyor.

   -------------------------------------------------------- ÜÇ EVRAK NEDEN FARKLI

   Farklar süs değil, tanınma işareti:

     DUBAI · yatay kâğıt, çerçeveli. Lisanslar çerçeveli ve alan yoğun basılır:
       iki sütun × üç satır alan ızgarası. Mühür sağ ÜSTTE (halka + ışınlar),
       damga sağ altta ve dikdörtgen.
     İNGİLTERE · dikey A4, çerçevesiz ve seyrek. Tescil belgesi ortaya hizalı
       az sayıda satırdan oluşur, kenar boşluğu bol. Arma ÜST ORTADA (kalkan
       konturu), kabartma mühür alt ortada ve yuvarlak.
     KKTC · daha kısa/dolgun dikey kâğıt, sicil defteri düzeni. Solda dosya
       kenarı ve iki delik, boydan boya çizgili satırlar, sol üstte küçük
       yuvarlak işaret, sağ üstte eğik oval damga.

   Üçü aynı ölçüde değil: kâğıt oranı ülkenin ilk işareti, o yüzden yükseklikler
   de farklı. Yelpaze bu yüzden simetrik değil ve bir bakışta "üç ayrı evrak"
   olduğu görülüyor.

   ------------------------------------------------------------------- MALİYET

   Sürekli animasyon YOK: sahne seçim anı dışında tamamen duruyor, yani boşta
   tek kare hesaplanmıyor. Seçim anında çalışan şey üç transform ve birkaç renk
   geçişi; hepsi CSS. JS'in sahne hakkında bildiği tek şey hangi ülkenin seçili
   olduğu ve her kâğıdın ona göre kaçıncı sırada durduğu (-1 / 0 / +1).
   Ölçüm yok: ne ResizeObserver, ne getBoundingClientRect. Dış görsel, dış yazı
   tipi, dış istek yok — evraklar satır içi SVG.

   HAREKET AZALTILMIŞSA: ağaç aynı kalıyor, yalnızca geçiş süreleri sıfırlanıyor
   (kök öğedeki data-still). Sunucu HTML'i ile istemci ilk render'ı birebir aynı
   olsun diye; koşullu render hidrasyon çakışması demek.
   ========================================================================== */

/* Belgenin adı. Uydurma kurum, numara ya da tarih değil — brief'in kendi
   tarifi: Dubai'de ticaret lisansı, İngiltere'de kuruluş tescili, KKTC'de yerel
   tescil. Tüzel biçim bilgisi ise brand.ts'ten (FACTS.structure) okunuyor. */
const DOC_TITLE: Record<Country, string> = {
  dubai: "Ticaret lisansı",
  ingiltere: "Kuruluş tescil belgesi",
  kktc: "Yerel tescil belgesi",
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* --------------------------------------------------------------- yardımcılar */

type Bar = readonly [x: number, y: number, w: number, h: number];

/** stilize metin satırı — hiçbir zaman harf değil, yalnızca çubuk */
function Bars({ list, cls }: { list: readonly Bar[]; cls: string }) {
  return (
    <>
      {list.map(([x, y, w, h], i) => (
        <rect key={`${x}-${y}-${i}`} className={cls} x={x} y={y} width={w} height={h} rx={h / 2} />
      ))}
    </>
  );
}

/* Halka ışınları ve mühür dişleri modül düzeyinde bir kez hesaplanıp
   donduruluyor: sabit oldukları için sunucu ile istemci birebir aynı sayıyı
   basıyor, tek ondalığa yuvarlama kalan kayan nokta farkını da siliyor.
   (G2'deki London Eye ile aynı gerekçe.) */
function ring(cx: number, cy: number, r1: number, r2: number, n: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    return {
      x1: Number((cx + c * r1).toFixed(1)),
      y1: Number((cy + s * r1).toFixed(1)),
      x2: Number((cx + c * r2).toFixed(1)),
      y2: Number((cy + s * r2).toFixed(1)),
    };
  });
}

/* ============================================================================
   DUBAI — TİCARET LİSANSI
   Yatay kâğıt (420 × 300), çift çerçeve, iki sütunlu alan ızgarası, sağ üstte
   halka mühür, sağ altta dikdörtgen damga. Lisans "dolu" bir evraktır: boşluk
   değil alan sayısı karakteri veriyor.
   ========================================================================== */

const AE_SEAL = ring(352, 62, 17, 24, 10);

/* İki sütun × üç satır: her alanda bir etiket çubuğu ve bir değer çubuğu.
   Değer genişlikleri elle verilmiş — hepsi eşit olursa ızgara tabloya değil
   tarağa benziyor. Sıra soldan sağa, satır satır. */
const AE_COLS = [32, 214];
const AE_ROWS = [102, 140, 178];
const AE_VALUE_W = [136, 118, 104, 142, 124, 92];

function aeGrid(kind: "label" | "value"): Bar[] {
  return AE_ROWS.flatMap((y, r) =>
    AE_COLS.map((x, c): Bar =>
      kind === "label" ? [x, y, 38, 5] : [x, y + 12, AE_VALUE_W[r * 2 + c], 8],
    ),
  );
}

const AE_LABELS = aeGrid("label");
const AE_VALUES = aeGrid("value");

const AE_FOOT: Bar[] = [
  [32, 224, 128, 6],
  [32, 238, 104, 6],
  [32, 252, 78, 6],
];

const DUBAI_DOC = (
  <svg className="g4-svg" viewBox="0 0 420 300" aria-hidden="true" focusable="false">
    <rect className="g4-paper" x="0.5" y="0.5" width="419" height="299" rx="3" />
    {/* çift çerçeve: lisansın en hızlı okunan işareti */}
    <rect className="g4-rule" x="12" y="12" width="396" height="276" rx="2" fill="none" />
    <rect className="g4-hair" x="19" y="19" width="382" height="262" rx="1" fill="none" />

    {/* başlık bloğu — sol üst */}
    <Bars
      cls="g4-hd"
      list={[
        [32, 38, 152, 13],
        [32, 58, 96, 7],
      ]}
    />
    <path className="g4-rule" d="M32 84 H388" />

    {/* mühür: halka + ışınlar. Hiçbir armaya benzemiyor, benzememesi de şart. */}
    <circle className="g4-seal" cx="352" cy="62" r="26" fill="none" />
    <circle className="g4-seal" cx="352" cy="62" r="15" fill="none" />
    <g className="g4-seal">
      {AE_SEAL.map((t) => (
        <line key={`${t.x1}-${t.y1}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
      ))}
    </g>

    <Bars cls="g4-lbl" list={AE_LABELS} />
    <Bars cls="g4-txt" list={AE_VALUES} />

    <path className="g4-rule" d="M32 210 H388" />
    <Bars cls="g4-lbl" list={AE_FOOT} />

    {/* damga: eğik, dikdörtgen, içi soyut. Basıldıktan sonra vurulmuş gibi
        alanların üstünde duruyor — bu yüzden ayrı ve en son katman. */}
    <g className="g4-stamp" transform="rotate(-8 318 238)">
      <rect x="256" y="212" width="124" height="52" rx="5" fill="none" />
      <rect x="264" y="220" width="108" height="36" rx="3" fill="none" />
      <rect x="278" y="228" width="80" height="7" rx="3.5" stroke="none" />
      <rect x="292" y="242" width="52" height="6" rx="3" stroke="none" />
    </g>
  </svg>
);

/* ============================================================================
   İNGİLTERE — KURULUŞ TESCİL BELGESİ
   Dikey A4 (300 × 420), çerçevesiz. Tescil belgesi seyrektir: ortaya hizalı az
   sayıda satır, geniş kenar boşluğu, üstte kalkan, altta kabartma mühür.
   Dubai'nin yoğunluğunun tam tersi — fark oradan okunuyor.
   ========================================================================== */

/* Mühür 362'de ve yarıçapı 30. İlk yerleşimde 352/32 idi ve üst kenarı (320)
   son satırın (324) üstüne biniyordu: ekranda mühür bir satırı yalıyor gibi
   duruyordu. Kuyruk satırları yukarı, mühür aşağı — aralarında 20 birim boşluk
   var ve altta 28 birim kenar payı kalıyor. */
const UK_SEAL = ring(150, 362, 20, 28, 18);

/** ortaya hizalı satır: genişliği verip x'i hesaplatıyoruz */
function mid(y: number, w: number, h = 7): Bar {
  return [150 - w / 2, y, w, h];
}

/* Ritim: kısa giriş → BÜYÜK ad → kısa kuyruk. İlk denemede başlıktan önce dört
   satır vardı ve genişlikleri geniş/dar diye almaşıyordu; ortaya hizalı olunca
   ekranda bir ses dalgası gibi okunuyordu, tescil belgesi gibi değil. Satır
   sayısı ikiye indi, genişlikler azalarak gidiyor ve tek vurgu ortadaki ad. */
const UK_BODY: Bar[] = [mid(184, 196), mid(202, 152)];
const UK_TAIL: Bar[] = [mid(268, 176, 6), mid(286, 132, 6), mid(304, 96, 6)];

const UK_DOC = (
  <svg className="g4-svg" viewBox="0 0 300 420" aria-hidden="true" focusable="false">
    <rect className="g4-paper" x="0.5" y="0.5" width="299" height="419" rx="3" />

    {/* arma yerine kalkan konturu: biçim tanınıyor, hiçbir kurumun arması
        kopyalanmıyor. İçinde bir kuşak ve bir çapraz, o kadar. */}
    <g className="g4-seal" fill="none">
      <path d="M126 40 H174 V64 C174 82 162 92 150 98 C138 92 126 82 126 64 Z" />
      <path d="M126 62 H174" />
      <path d="M138 74 L150 66 L162 74" />
    </g>

    {/* başlık ortada */}
    <Bars cls="g4-hd" list={[mid(114, 150, 14)]} />
    <Bars cls="g4-lbl" list={[mid(138, 92, 7)]} />
    <path className="g4-rule" d="M96 158 H204" />

    <Bars cls="g4-txt" list={UK_BODY} />

    {/* belgenin ortasındaki tek kalın satır: her tescil belgesinde şirket adı
        büyük basılır. Burada da tek vurgu o — ama yine çubuk, harf değil. */}
    <Bars cls="g4-hd" list={[mid(238, 158, 14)]} />
    <Bars cls="g4-lbl" list={UK_TAIL} />

    {/* kabartma mühür: yuvarlak, dişli, düz duruyor. Kabartma mühür eğik
        basılmaz — damga eğilir, mühür eğilmez. */}
    <circle className="g4-seal" cx="150" cy="362" r="30" fill="none" />
    <circle className="g4-seal" cx="150" cy="362" r="20" fill="none" />
    <circle className="g4-seal" cx="150" cy="362" r="8" fill="none" />
    <g className="g4-seal">
      {UK_SEAL.map((t) => (
        <line key={`${t.x1}-${t.y1}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
      ))}
    </g>
  </svg>
);

/* ============================================================================
   KKTC — YEREL TESCİL BELGESİ
   Daha kısa ve dolgun dikey kâğıt (320 × 380). Düzen sicil defteri: solda dosya
   kenarı ve iki delik, boydan boya çizgili satırlar, her satırda etiket + değer.
   Üç evrakın en "idari" olanı; Londra'nın seyrekliği ile Dubai'nin süsü
   arasındaki üçüncü karakter bu.
   ========================================================================== */

const KKTC_ROWS = [108, 138, 168, 198, 228, 258];
const KKTC_VALUE_W = [128, 96, 142, 110, 84, 132];

const KKTC_DOC = (
  <svg className="g4-svg" viewBox="0 0 320 380" aria-hidden="true" focusable="false">
    <rect className="g4-paper" x="0.5" y="0.5" width="319" height="379" rx="3" />

    {/* dosya kenarı: dikey çizgi ve iki delik. Delikler kâğıdın rengini değil
        arkadaki masayı gösteriyor, o yüzden ayrı bir ton. */}
    <path className="g4-rule" d="M46 22 V358" />
    <circle className="g4-hole" cx="24" cy="132" r="7" />
    <circle className="g4-hole" cx="24" cy="248" r="7" />

    {/* sol üstte küçük yuvarlak işaret — soyut, arma değil */}
    <circle className="g4-seal" cx="74" cy="50" r="13" fill="none" />
    <path className="g4-seal" d="M74 37 V63 M61 50 H87" />

    <Bars
      cls="g4-hd"
      list={[
        [98, 38, 128, 12],
        [98, 56, 84, 6],
      ]}
    />
    <path className="g4-rule" d="M58 82 H296" />

    {/* çizgili satırlar: değer çubuğu çizginin hemen üstünde oturuyor */}
    {KKTC_ROWS.map((y, i) => (
      <g key={y}>
        <path className="g4-hair" d={`M58 ${y} H296`} />
        <rect className="g4-lbl" x="58" y={y - 22} width="36" height="5" rx="2.5" />
        <rect
          className="g4-txt"
          x="118"
          y={y - 24}
          width={KKTC_VALUE_W[i]}
          height="8"
          rx="4"
        />
      </g>
    ))}

    <path className="g4-rule" d="M58 296 H296" />
    <Bars
      cls="g4-lbl"
      list={[
        [58, 310, 118, 6],
        [58, 324, 86, 6],
      ]}
    />

    {/* Eğik oval damga, sicil satırlarının ORTASINA vurulmuş. Bu kâğıdın en
        ayırt edici hareketi: Dubai'nin damgası boş bir köşede duruyor, buradaki
        yazının üstünden geçiyor — sicil kaydı önce basılır, damga sonra vurulur.

        İlk yerleşimde sağ üstteydi ve iki sorun vardı: sağ kenar boşluğunu
        yiyordu, ayrıca iç içe iki kalın elips artı iki dolu çubuk o ölçekte
        (kâğıt ekranda ~150px) tek bir kırmızı karalamaya dönüşüyordu. Şimdi
        ortada, bir gömlek küçük ve içinde tek çubuk var. */}
    <g className="g4-stamp" transform="rotate(11 206 214)">
      <ellipse cx="206" cy="214" rx="56" ry="29" fill="none" />
      <ellipse cx="206" cy="214" rx="46" ry="20" fill="none" />
      <rect x="178" y="211" width="56" height="6" rx="3" stroke="none" />
    </g>
  </svg>
);

const DOC: Record<Country, React.ReactNode> = {
  dubai: DUBAI_DOC,
  ingiltere: UK_DOC,
  kktc: KKTC_DOC,
};

/* ========================================================================== */

export default function HeroGlobeG4() {
  /* Küre ile aynı mağaza dilimi: bu bileşen HeroGlobe'un yerine takılabilir
     olsun ve seçim ile hesaplayıcı ayrışmasın diye. */
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);
  const still = useReducedMotion() ?? false;

  /* Bayrağın üstünde gezinmek desteyi çeviriyor, tıklamak ayrıca ölçülüyor:
     fareyi üç bayrağın üstünden geçirmek üç "seçim" olayı üretmemeli, ama
     sahne yine de anında cevap vermeli. */
  const show = useCallback((c: Country) => setCountry(c), [setCountry]);
  const pick = useCallback(
    (c: Country) => {
      setCountry(c);
      if (c !== country) gtm("hero_doc_country", { country: c });
    },
    [country, setCountry],
  );

  const index = COUNTRY_ORDER.indexOf(country);

  return (
    <div className="g4" data-still={still ? "" : undefined}>
      {/* Seçici paylaşılan bileşen: mekanik G2/G3 ile birebir aynı kalsın ve
          karşılaştırmada değişen tek şey sahne olsun. Klavye ile gezilebiliyor
          (gerçek tablist, odak da yakıyor), dokunmatikte tıklama çalışıyor. */}
      <CountryPicker value={country} onSelect={pick} onHover={(c) => c && show(c)} withLegend />

      {/* data-c sahnenin üstünde: masaya vuran ışığın rengi ülkeye göre
          değişiyor (kum / gün ışığı / zeytin). Kâğıdın kendi renkleri
          kâğıdın üstünde duruyor, bu yalnızca ortamın tonu. */}
      <div className="g4-stage" data-c={country}>
        {/* Masaya vuran ışık havuzu. Dış durağı tam olarak #080808 — sahne
            zemini de o olduğu için kutunun kenarı görünmüyor ve tek bir alfa
            değeri kullanmadan yumuşak ışık çıkıyor. */}
        <span className="g4-pool" aria-hidden="true" />

        <div className="g4-stack" aria-hidden="true">
          {COUNTRY_ORDER.map((c) => {
            /* Her kâğıdın seçilene göre sırası: -1 solda, 0 önde, +1 sağda.
               Üçlü halka olduğu için hangi ülkeden hangisine geçilirse
               geçilsin iki yan her zaman dolu — deste hiçbir seçimde tek yana
               yığılmıyor. */
            const d = ((COUNTRY_ORDER.indexOf(c) - index + 4) % 3) - 1;
            return (
              <div
                key={c}
                className="g4-sheet"
                data-c={c}
                data-on={c === country}
                style={{ "--g4-d": d } as React.CSSProperties}
              >
                {DOC[c]}
              </div>
            );
          })}
        </div>

        {/* Masa kenarı: tam genişlikte, iki ucu sahne zeminine sönen saç teli.
            Üç kâğıt da bu çizgiye basıyor ve etiket de aynı çizgide duruyor —
            sahnedeki her şeyin tek bir yüzeyde olmasını sağlayan tek eleman. */}
        <span className="g4-edge" aria-hidden="true" />

        {/* Sahnedeki TEK gerçek metin. Kâğıdın üstünde harf yok; belgenin adı
            ve tüzel biçim burada, HTML tipografisiyle yazıyor — her ekranda
            okunaklı kalsın ve kâğıt sahte evrak taklidine dönüşmesin diye. */}
        <div className="g4-cap" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={country}
              className="g4-cap-in"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: still ? 0 : 0.22, ease: EASE }}
            >
              <span className="g4-cap-eyebrow">Elinize geçen belge</span>
              <strong className="g4-cap-name">{DOC_TITLE[country]}</strong>
              <span className="g4-cap-sub">{FACTS[country].structure}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
