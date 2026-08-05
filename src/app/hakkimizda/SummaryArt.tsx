import type { SummaryKey } from "@/lib/about";

/* ============================================================================
   ÖZET KUTUCUKLARININ SAĞ TARAFI — ÜÇ SAF GÖRSEL
   Kullanan: src/app/hakkimizda/page.tsx · 1. bölüm
   Biçim:    src/app/css/hakkimizda.css · 1. bölüm (.abx-)

   ---------------------------------------------------------------- NEDEN VAR
   Müşteri üç kutucuğu bento kartına çevirmemizi ve her birinin sağına o
   kutucuğun ANLATTIĞI ŞEYİ çizen bir SVG animasyonu koymamızı istedi:
   "ülke olanda ülkeler döner, zincir olanda zincir olur, sektör
   olanda sektör iconları fln döner gibimsi çöz işte."

   Kalite ölçütü olarak verilen dosya components/sectors/SectorCountryArt.tsx
   ve buradaki üç çizim onun kurallarını harfiyen uyguluyor. Aradaki tek fark
   YÜZEY: orası gece zemininde çalışıyor, burası beyaz kartın üstünde.

   -------------------------------------------------------- "use client" YOK
   Ve olmayacak. Hareketin tamamı CSS'te; tarayıcıya bu dosyadan tek satır
   JavaScript inmiyor. Sebebi teknik değil, bu depoya özgü: useReducedMotion
   ile RENDER EDİLEN AĞACI değiştirme hatası burada dört ayrı kalıpta çıktı
   (`if (reduce) return null`, `{!reduce && …}`, `initial` içinde koşullu
   değer, `initial={{ width: reduce ? … }}`). Bir CSS medya sorgusu sunucu ile
   istemci arasında ayrım yaratmıyor — hidrasyon riski sıfır.

   ============================ ÜÇ ÇİZİMİN FİKRİ =============================
   Üçü de tek bir soruya üç ayrı cevap: KUTUCUKTAKİ SAYI NEYİN SAYISI?
   Cevap her çizimde o sayı kadar nesne olarak duruyor — üç iğne, beş halka,
   altı karo. Yani rakam ile görsel birbirini doğruluyor; kutucuk iki kez aynı
   şeyi söylüyor, biri sayıyla biri sayarak.

     3 · ÜLKE — θ EKSENİ (merkez etrafında)
       Küre: dış çember, ekvator ve iki meridyen. Yüzeyinde 120° arayla üç
       iğne. Mavi halka üç iğnenin üstünde SIRAYLA duruyor ve merkez etrafında
       dönerek bir sonrakine geçiyor — "ülkeler dönüyor" tam olarak bu.

     5 · HALKALI ZİNCİR — X EKSENİ (soldan sağa)
       Beş halka, her biri komşusunun içinden geçiyor. Örtüşmenin yönü
       tutarlı: her halka bir öncekinin ÜSTÜNDEN geçiyor (aşağıdaki "knock"
       hilesi). Mavi halka soldan sağa halka halka ilerliyor.

     6 · SEKTÖR — IZGARA (3 × 2)
       Altı karo, her birinde o sektörün en indirgenmiş işareti. Mavi çerçeve
       karoların üstünde tek tek duruyor; satır sonunda alta iniyor.

   Üçünü aynı aile yapan şey: aynı tuval (160 × 120, ızgara birimi 20), aynı
   beş kademeli çizgi merdiveni, aynı opak mürekkep merdiveni, aynı düğüm
   sözlüğü (küçük dolu daire) ve HER ÇİZİMDE TAM OLARAK BİR TANE mavi nesne —
   o da hareket eden nesnenin ta kendisi. Mavi burada süs değil, "şu anda
   canlı olan şey" demek.

   ------------------------------------------------------------------ HAREKET
   Üç kutucuk YAN YANA duruyor, yani üç animasyon aynı anda görülüyor.
   Periyotlar bilerek ortak katsız (13s · 17s · 23s): ortak periyot 5083
   saniye, yani üçü pratikte hiçbir zaman aynı anda "atmıyor" ve satır tek bir
   ritme kilitlenmiyor.

   Üçü de yalnızca transform / opacity üzerinde çalışıyor — her karede JS yok,
   düzen hesabı tetiklenmiyor, sekme arkaya alındığında tarayıcı durduruyor.
   prefers-reduced-motion: reduce altında ÜÇÜ DE HİÇ BAŞLAMIYOR (animasyonlar
   yalnızca no-preference içinde tanımlı) ve üçünün duruş hâli de okunur bir
   kare: mavi halka üstteki iğnede, mavi zincir halkası ortadaki halkada, mavi
   çerçeve üst sıranın ortasındaki karoda.

   ------------------------------------------------------------------ SINIRLAR
   · <text>, etiket, ok, rakam YOK. Çizimler bir iddia taşımıyor; kutucuktaki
     rakam ve etiket bütün bilgiyi zaten veriyor, çizimler aria-hidden.
   · SVG filtresi YOK (sürekli animasyonda pahalı). Yumuşama yalnızca maske.
   · Math.random() YOK, çalışma anında trigonometri YOK: iğnelerin açıları
     JS'te hesaplanmıyor, SVG'nin kendi rotate() dönüşümüyle üretiliyor —
     sunucu ile istemci arasında yuvarlanacak tek ondalık bile olmuyor.
   ========================================================================= */

/* ÜÇ ÇİZİM DE AYNI TUVALDE: 160 × 120, ızgara birimi 20.
   Kabın ölçüsü CSS'te (.abx); buradaki her sayı viewBox birimi, yani kap
   büyüyünce çizimin TAMAMI aynı katsayıyla büyüyor — çizgi kalınlıkları ve
   hareket mesafeleri dahil. */
const VB = "0 0 160 120";

/* Zeminin nokta ızgarası + kadraj kenarına doğru sönen radyal maske.
   Filtre DEĞİL maske: statik ve bedava.

   id ÖNEKİ HER ÇİZİMDE FARKLI. SVG id'leri belge genelinde tekil olmak
   zorunda ve çakışma sessizce yanlış deseni gösteriyor — üç çizim aynı
   sayfada, üçü de bir kez basılıyor. */
function Grid({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={`${id}-p`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle className="abx-dot" cx="10" cy="10" r="0.9" />
        </pattern>
        <radialGradient id={`${id}-g`} cx="50%" cy="50%" r="62%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.5" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id={`${id}-m`}>
          <rect width="160" height="120" fill={`url(#${id}-g)`} />
        </mask>
      </defs>
      <rect width="160" height="120" fill={`url(#${id}-p)`} mask={`url(#${id}-m)`} />
    </>
  );
}

/* ============================================================= 3 · ÜLKE · küre
   Merkez (80, 60), yarıçap 50. Küre dört çizgiden kuruluyor: dış çember
   (figürü tanımlayan en kalın nötr çizgi), ekvator ve iki meridyen.

   İKİ MERİDYEN, ÇÜNKÜ BİR TANESİ YETMİYOR: çember + tek bir iç elips
   kaçınılmaz olarak GÖZ gibi okunuyor (aynı hata SectorCountryArt'ın KKTC
   çiziminde ekranda görüldü ve orada simetriyi kırarak çözüldü). İkinci
   meridyen deseni küreye çeviriyor — beynin bulduğu ilk şablon artık göz
   değil dünya.

   İĞNELER TRİGONOMETRİSİZ: üçü de aynı noktada (0, −34) çiziliyor ve
   ikisi SVG'nin kendi rotate() dönüşümüyle 120° / 240° döndürülüyor. Mavi
   halka da aynı 120°'lik adımlarla döndüğü için iğnelerin üstüne TAM
   oturuyor; elle yazılmış tek bir ondalık yok. */
function ArtWhere() {
  return (
    <svg viewBox={VB} className="abx" aria-hidden="true" focusable="false">
      <Grid id="abx-w" />

      <circle className="abx-edge" cx="80" cy="60" r="50" />
      <ellipse className="abx-thin" cx="80" cy="60" rx="50" ry="18" />
      <ellipse className="abx-thin" cx="80" cy="60" rx="18" ry="50" />
      <ellipse className="abx-hair" cx="80" cy="60" rx="36" ry="50" />

      {/* Üç ülke. Yarıçap 34, yani kürenin YÜZEYİNDE değil içinde:
          kenara oturan bir işaret kürenin siluetini bozuyor, biraz içeride
          duran işaret "yüzeyde bir yer" gibi okunuyor. */}
      <g className="abx-pin" transform="translate(80 60)">
        <circle cx="0" cy="-34" r="3.6" />
        <circle cx="0" cy="-34" r="3.6" transform="rotate(120)" />
        <circle cx="0" cy="-34" r="3.6" transform="rotate(240)" />
      </g>

      {/* ---- çizimin TEK mavi nesnesi ve TEK hareketi ----
          İçi boş bir halka: altındaki iğneyi kapatmıyor, çevreliyor.
          Duruş hâli CSS'te rotate(0), yani en üstteki iğne. */}
      <g className="abx-spin">
        <circle className="abx-lit" cx="80" cy="26" r="9" />
      </g>
    </svg>
  );
}

/* ================================================= 5 · HALKALI ZİNCİR · sıra
   Beş halka, merkezleri 25 birim arayla: 30 · 55 · 80 · 105 · 130. Her halka
   38 × 24 birim (yarı genişlik 19), yani komşusuyla 13 birim örtüşüyor —
   genişliğin üçte biri, gerçek bir zincirin örtüşme oranı. Halka bilerek
   YASSI: eşit en-boy bir daire zincir değil, boncuk dizisi gibi okunuyordu.
   Çizim 11..149 arasında kalıyor, iki kenarda da eşit pay var.

   ÖRTÜŞMENİN YÖNÜ NASIL VERİLİYOR: her halka çizilmeden önce aynı yolun
   KART ZEMİNİ RENGİNDE ve daha kalın bir kopyası basılıyor (.abx-knock).
   O kopya altındaki halkanın çizgisini siliyor, sonra halkanın kendi çizgisi
   üstüne biniyor. Sonuç: her halka bir öncekinin üstünden geçiyor. Bu
   olmadan beş halka üst üste binmiş beş oval olarak okunuyor, zincir olarak
   değil. Maske ya da clipPath ile de yapılabilirdi; bu yol daha ucuz ve
   halkalar bir gün kaydırılırsa kendiliğinden doğru kalıyor. */
const CHAIN_LINKS = [30, 55, 80, 105, 130];

function ArtChain() {
  return (
    <svg viewBox={VB} className="abx" aria-hidden="true" focusable="false">
      <Grid id="abx-c" />

      {CHAIN_LINKS.map((cx) => (
        <g key={cx}>
          <rect className="abx-knock" x={cx - 19} y="48" width="38" height="24" rx="12" />
          <rect className="abx-edge" x={cx - 19} y="48" width="38" height="24" rx="12" />
        </g>
      ))}

      {/* ---- çizimin TEK mavi nesnesi ve TEK hareketi ----
          Birinci halkanın kutusunda çiziliyor; CSS onu 25'er birim sağa
          kaydırıyor, yani beş halkanın her birinin üstünde tam oturuyor.
          Duruş hâli translateX(50px) = ORTADAKİ halka. */}
      <g className="abx-slide">
        <rect className="abx-lit" x="11" y="48" width="38" height="24" rx="12" />
      </g>
    </svg>
  );
}

/* ======================================================= 6 · SEKTÖR · ızgara
   Altı karo, 3 × 2. Karo 46 × 46, aralık 8 → sütunlar 3 · 57 · 111, satırlar
   10 · 64. İki eksende de adım AYNI (54) ve mavi çerçeve tam o adımlarla
   hareket ediyor; ızgara ile hareket aynı sayıdan besleniyor, yani biri
   değişirse diğeri de değişmek zorunda kalıyor — sessizce kayamıyorlar.

   İŞARETLER LUCIDE DEĞİL. Sayfadaki sektör kartları lucide kullanıyor ve o
   doğru — orada işaret bir ETİKET. Burada işaret bir DESEN: 44 birimlik bir
   karoda lucide'nin 24'lük ızgarası ve 2 birimlik konturu bu çizimin çizgi
   merdivenine oturmuyor, altı ikon altı ayrı kalınlıkta görünüyordu. Her
   işaret burada en indirgenmiş hâline inmiş durumda: kutu, ayraç, kişi, çatı,
   sütun, artı. Sıra about.ts · FOR_WHOM.sectors ile aynı. */

/* Karo konumu ve işareti AYNI kayıtta: ikisi ayrı iki dizide dursaydı sıra
   kayması sessizce yanlış karoya yanlış işareti koyardı.

   İşaretler karonun KENDİ koordinatlarında (0..46) çiziliyor; ızgaraya
   yerleştirmeyi dıştaki translate() yapıyor. Hepsi karo merkezine (23, 23)
   göre dengeli ve hepsi aynı 22 × 18 birimlik kutunun içinde — altısı yan
   yana geldiğinde biri diğerinden büyük durmasın. */
const SECTOR_TILES: { x: number; y: number; glyph: React.ReactElement }[] = [
  /* e-ticaret — alışveriş çantası.
     İLK DENEME KOLİYDİ (kutu + yatay bant + dikey bant) ve ekranda kutu gibi
     değil TABLO gibi okundu: 22 birimlik bir karede iki iç çizgi, kolinin
     bandını değil bir ızgarayı çiziyordu. Çanta aynı fikri tek bir ayırt
     edici siluetle veriyor — gövde + sap. */
  {
    x: 3,
    y: 10,
    glyph: (
      <>
        <rect className="abx-line" x="14" y="20" width="18" height="13" rx="1.5" />
        <path className="abx-line" d="M19 20 V17.5 A4 4 0 0 1 27 17.5 V20" />
      </>
    ),
  },
  /* yazılım ve teknoloji — iki ayraç */
  {
    x: 57,
    y: 10,
    glyph: <path className="abx-line" d="M18 15 L12 23 L18 31 M28 15 L34 23 L28 31" />,
  },
  /* danışmanlık — kişi */
  {
    x: 111,
    y: 10,
    glyph: (
      <>
        <circle className="abx-line" cx="23" cy="18" r="4.6" />
        <path className="abx-line" d="M14 32 A9 9 0 0 1 32 32" />
      </>
    ),
  },
  /* gayrimenkul — çatı */
  { x: 3, y: 64, glyph: <path className="abx-line" d="M12 24 L23 14 L34 24 M15 24 V32 H31 V24" /> },
  /* finans ve yatırım — üç sütun */
  { x: 57, y: 64, glyph: <path className="abx-line" d="M15 32 V24 M23 32 V15 M31 32 V27" /> },
  /* sağlık ve medikal — artı */
  { x: 111, y: 64, glyph: <path className="abx-line" d="M23 14 V32 M14 23 H32" /> },
];

function ArtSectors() {
  return (
    <svg viewBox={VB} className="abx" aria-hidden="true" focusable="false">
      <Grid id="abx-s" />

      {SECTOR_TILES.map((t) => (
        <g key={`${t.x}-${t.y}`} transform={`translate(${t.x} ${t.y})`}>
          <rect className="abx-tile" x="0" y="0" width="46" height="46" rx="11" />
          {t.glyph}
        </g>
      ))}

      {/* ---- çizimin TEK mavi nesnesi ve TEK hareketi ----
          Birinci karonun kutusunda çiziliyor; CSS onu ızgaranın adımlarıyla
          (54 sağa, 54 aşağı) dolaştırıyor.
          Duruş hâli translate(54px, 0) = üst sıranın ortası. */}
      <g className="abx-step">
        <rect className="abx-lit" x="3" y="10" width="46" height="46" rx="11" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------ kayıt defteri
   Anahtar about.ts · SummaryKey. Yeni bir kutucuk eklenirse tip denetimi
   burayı da zorluyor, yani sahnesiz bir kutucuk basılamıyor. */
const ART: Record<SummaryKey, () => React.ReactElement> = {
  where: ArtWhere,
  chain: ArtChain,
  sectors: ArtSectors,
};

/* HER SAHNENİN ÇİZDİĞİ NESNE SAYISI — elle tutulan bir kayıt ve öyle olmak
   zorunda: geometri (120°'lik iğne aralığı, 25 birimlik halka adımı, 3 × 2
   ızgara) tam olarak bu sayılar için kurulmuş, diziden türetilemiyor.

   Kutucuktaki rakam ise VERİDEN geliyor (page.tsx · COUNTS). İkisi ayrılırsa
   kutucuk "6" yazarken beş karo gösterir ve bunu hiçbir araç görmez — tip
   denetimi de derleme de sessiz kalır. page.tsx bu kaydı COUNTS ile
   karşılaştırıyor ve geliştirmede uyarıyor.

   BİR SAYI DEĞİŞTİĞİNDE yapılacak iş: ilgili sahneyi yeniden çizmek ve bu
   satırı güncellemek. Sayıyı burada tek başına değiştirmek uyarıyı susturur,
   çizimi düzeltmez. */
export const SCENE_OBJECTS: Record<SummaryKey, number> = {
  where: 3,
  chain: 5,
  sectors: 6,
};

/** Bento kutucuğunun sağ sütunu. Dekor: alt metin yok, aria-hidden.
    Bir şey iddia etmiyor — iddia rakamın kendisinde. */
export default function SummaryArt({ scene }: { scene: SummaryKey }) {
  const Art = ART[scene];
  return <Art />;
}
