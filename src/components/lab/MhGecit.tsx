/* ============================================================================
   ADAY 1 · "GEÇİT" — muhasebe hero sahnesi denemesi
   CSS: src/app/css/lab-mhg.css · ad alanı .mhg-

   ---------------------------------------------------------------- FİKİR
   Sahne bir belge değil, bir DEVİR gösteriyor: solda sizin gönderdiğiniz
   dağınık kağıtlar, sağda size dönen kapanmış dosya, ortada tek yönlü ok.
   Kaynağı sayfanın kendi 5. bölümü — "Siz ne veriyorsunuz, biz ne
   veriyoruz?" (accountingDubai.ts · exchange). Yeni bir iddia üretilmedi;
   sayfada zaten yazan cümle çizildi. Aradaki okun tek yönlü olması da o
   bölümün kendi gerekçesi: "bu bir iş birliği değil bir devir".

   DÖRT ŞİKÂYETE KARŞILIK
   · "çok basic"      → üç kaynak belgenin üçü de FARKLI bir nesne: faturanın
                        künyesi ve tutar bloğu var, fişin altı YIRTIK (testere
                        kenar), ekstre yatık ve çift sütunlu. Canlı sahnedeki
                        "aynı yuvarlak çubuk beş kere" dokusu yok.
   · "bir şey yanlış" → canlı sahnede kütle solda toplanıyor, sağdaki rapor
                        kartı küçük ve boş kalıyordu. Burada iki kıyı eşit
                        ağırlıkta ve aynı zemin çizgisine oturuyor.
   · "anlatmıyor"     → sahnenin cümlesi tek: "belge sizde, defter bizde,
                        dosya yine sizde". İki kelime bunu adlandırıyor.
   · "aksiyon yok"    → sahnede HER AN yolda bir belge var (aşağıdaki ölçüme
                        bak) ve dosya turun içinde boştan doluya gidiyor.
                        Canlı sahnede hareket eden şey tuvalin binde ikisiydi;
                        burada hareket eden şey tuvali boydan boya geçiyor.

   NEYİ FEDA EDİYOR: etkileşim yok (tıklanmıyor), ve sahne bir OLGU değil bir
   AKIŞ anlatıyor — Dubai'ye, KDV'ye ya da takvime dair tek kelime geçmiyor.

   ---------------------------------------------------------------- HAREKET
   Tek periyot: 31 saniye. Altı belge aynı saatte, aralarında 31/6 ≈ 5.17s
   gecikmeyle. Bir belgenin görünür penceresi turun %24'ü, gecikme %16.7 —
   yani ortalama 1.44 belge aynı anda yolda, ve boşluklar dosyaya düşen
   sayfalarla doluyor. Canlı sahneyle fark burada: orada altı adım 29 saniyeye
   yayılmıştı ve iki adım arasında 5 saniye HİÇBİR ŞEY olmuyordu.

   31 BİLEREK: sitedeki sürekli periyotların (60·42·34·29·26·23·20·19·17·15·
   13·11) hiçbiriyle ortak böleni yok — 31 asal ve o listedeki hiçbir sayıyı
   bölmüyor, hiçbiri de onu bölmüyor. Hero'nun kendi zemini 60s ve 26s ile
   akıyor; gcd(31,60) = gcd(31,26) = 1.

   DURUŞ HÂLİ (prefers-reduced-motion: reduce): animasyon HİÇ TANIMLANMIYOR.
   Kalan kare eksik değil, TAM: solda yığın, sağda altı sayfası da yerinde
   duran dosya ve üstünde rapor. Uçan kopyalar varsayılan olarak görünmez.
   ========================================================================= */

/* Tuval canlı sahneyle AYNI (560 × 420, ızgara birimi 20): aday kazanırsa
   hero'nun sağ sütununda birebir aynı yeri kaplasın, düzen yeniden
   ölçülmesin. */
const VB = "0 0 560 420";

/* Uçan kopyaların gecikmesi CSS'te --i ile veriliyor; sıra burada. İki tur:
   üç belge tipi ikişer kez geçiyor, yani dosyaya altı sayfa iniyor. */
const FLIGHT: ("fatura" | "fis" | "ekstre")[] = [
  "fatura",
  "fis",
  "ekstre",
  "fatura",
  "ekstre",
  "fis",
];

/* Dosyanın sayfaları, alttan yukarı. Adım 16, yükseklik 12: aradaki 4
   birimlik boşluk şart — bitişik dizilseler altı sayfa tek bir blok gibi
   okunurdu, boşluk girince aynı şekil bir DESTE oluyor.
   Her birinin sol kenarında MAVİ bir tırnak var: o sayfanın kaydı. Mavi bu
   çizimde tek madde ve anlamı sabit — "kaydedildi". */
const SLABS = [282, 266, 250, 234, 218, 202];

/* --------------------------------------------------------------- belgeler
   Üçü de kendi başlangıç noktasında (0,0) çiziliyor; nereye konacaklarını
   çağıran yer söylüyor. Böylece aynı çizim hem soldaki yığında hem yoldaki
   kopyada kullanılıyor ve iki yerde iki farklı fatura olmuyor. */

/* FATURA — 96 × 124. Künye çubuğu, altında ayraç, dört satır ve sağ altta
   tutar bloğu. Tutar bloğunun SAĞ ALTTA olması faturanın en tanınabilir
   yerleşimi; ortada olsaydı şekil sıradan bir sayfaya dönerdi. */
function Fatura() {
  return (
    <>
      <rect className="mhg-paper" x="0" y="0" width="96" height="124" rx="3" />
      <rect className="mhg-ink" x="12" y="14" width="46" height="9" rx="4.5" />
      <path className="mhg-hair" d="M12 34 H84" />
      <rect className="mhg-dim" x="12" y="46" width="60" height="7" rx="3.5" />
      <rect className="mhg-dim" x="12" y="60" width="48" height="7" rx="3.5" />
      <rect className="mhg-dim" x="12" y="74" width="56" height="7" rx="3.5" />
      <rect className="mhg-dim" x="12" y="88" width="40" height="7" rx="3.5" />
      <path className="mhg-hair" d="M52 102 H84" />
      <rect className="mhg-ink" x="58" y="108" width="26" height="8" rx="4" />
    </>
  );
}

/* FİŞ — 42 × 104, ALTI YIRTIK. Testere kenar bu çizimin en ucuz ve en çok
   iş yapan ayrıntısı: dar bir dikdörtgen "kağıt" bile demiyor, altı yırtık
   dar bir dikdörtgen tek bakışta FİŞ. Altı diş, her biri 7 birim. */
function Fis() {
  return (
    <>
      <path
        className="mhg-paper"
        d="M0 3 q0 -3 3 -3 h36 q3 0 3 3 V96 l-7 6 l-7 -6 l-7 6 l-7 -6 l-7 6 l-7 -6 Z"
      />
      <rect className="mhg-ink" x="9" y="12" width="24" height="7" rx="3.5" />
      <path className="mhg-hair" d="M8 28 H34" />
      <rect className="mhg-dim" x="9" y="38" width="18" height="6" rx="3" />
      <rect className="mhg-dim" x="9" y="52" width="24" height="6" rx="3" />
      <rect className="mhg-dim" x="9" y="66" width="14" height="6" rx="3" />
      <path className="mhg-hair" d="M8 80 H34" />
    </>
  );
}

/* EKSTRE — 122 × 82, YATIK ve ÇİFT SÜTUNLU. Dolu künye bandı bir banka
   dökümünün üst şeridi; üç satırın her birinde solda açıklama sağda tutar
   var, yani sütun ayracı olmadan da iki sütunlu okunuyor. Yatıklık bilerek:
   üç belge farklı ORANDA olmasa üçü de "bir kağıt" diye okunurdu. */
function Ekstre() {
  return (
    <>
      <rect className="mhg-paper" x="0" y="0" width="122" height="82" rx="3" />
      <rect className="mhg-band" x="0" y="0" width="122" height="15" rx="3" />
      <rect className="mhg-dim" x="10" y="26" width="46" height="7" rx="3.5" />
      <rect className="mhg-dim" x="80" y="26" width="30" height="7" rx="3.5" />
      <rect className="mhg-dim" x="10" y="42" width="38" height="7" rx="3.5" />
      <rect className="mhg-dim" x="80" y="42" width="30" height="7" rx="3.5" />
      <rect className="mhg-dim" x="10" y="58" width="52" height="7" rx="3.5" />
      <rect className="mhg-dim" x="80" y="58" width="30" height="7" rx="3.5" />
    </>
  );
}

function DocArt({ kind }: { kind: "fatura" | "fis" | "ekstre" }) {
  if (kind === "fatura") return <Fatura />;
  if (kind === "fis") return <Fis />;
  return <Ekstre />;
}

/* Uçan kopyanın DURDUĞU yer. Üç tipin merkezi de (246, 240)'a getiriliyor:
   CSS'teki tek transform-origin üçü için de doğru olsun, yani küçülme
   belgenin kendi ortasından olsun. Sayılar tip boyutlarının yarısı:
   fatura 96×124 → 246-48, 240-62. */
const FLIGHT_AT: Record<string, string> = {
  fatura: "translate(198,178)",
  fis: "translate(225,188)",
  ekstre: "translate(185,199)",
};

export default function MhGecit() {
  return (
    <div className="mhg-wrap" aria-hidden="true">
      <svg viewBox={VB} className="mhg" aria-hidden="true" focusable="false">
        <defs>
          {/* Zeminin nokta ızgarası — canlı sahnedeki kalıbın aynısı: 40
              birimde bir tek <rect> ile boyanıyor, 126 ayrı daire değil. */}
          <pattern id="mhgDots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle className="mhg-dot" cx="20" cy="20" r="1" />
          </pattern>
          <radialGradient id="mhgFadeG" cx="50%" cy="50%" r="64%">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.58" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id="mhgFade">
            <rect width="560" height="420" fill="url(#mhgFadeG)" />
          </mask>
          {/* Işık huzmesi ortada, yani yolun üstünde: sahnenin öznesi iki
              kıyıdan biri değil, aradaki geçiş. */}
          <radialGradient id="mhgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#2f6fc4" stopOpacity="0.26" />
            <stop offset="0.55" stopColor="#2f6fc4" stopOpacity="0.09" />
            <stop offset="1" stopColor="#2f6fc4" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="560" height="420" fill="url(#mhgDots)" mask="url(#mhgFade)" />
        <circle cx="280" cy="230" r="248" fill="url(#mhgGlow)" />

        {/* İki zemin çizgisi AYNI y'de (314): iki kıyı aynı masaya oturuyor.
            Canlı sahnenin dengesizliği tam buradaydı — rapor kartı sayfanın
            yanında havada duruyordu. */}
        <path className="mhg-desk" d="M32 314 H218" />
        <path className="mhg-desk" d="M346 314 H532" />

        {/* ---- SOL KIYI · sizden gelen ----
            Üç belge, üç farklı açı ve üç farklı oran. Üst üste biniyorlar
            çünkü bir yığın böyle okunur; hizalı dizilseler bir liste olurdu
            ve liste "dağınık belge" demez.
            Yığın 48..192 arası ve 136..309 arası: karşıdaki klasörle
            (356..524 · 132..310) neredeyse aynı kütle. İki kıyının eşit
            ağırlıkta olması bu adayın "bir şeyler yanlış" cevabı. */}
        <g transform="translate(48,136) rotate(-7 48 62)">
          <Fatura />
        </g>
        <g transform="translate(150,154) rotate(9 21 52)">
          <Fis />
        </g>
        <g transform="translate(54,224) rotate(3 61 41)">
          <Ekstre />
        </g>

        {/* ---- TEK YÖNLÜ OK ----
            Sayfanın 5. bölümündeki okun aynısı ve aynı gerekçeyle tek yönlü.
            İki kelimenin saplarının arasına yerleşti (x 200..368), yani
            hiçbir sapla çakışmıyor. */}
        <path className="mhg-flow" d="M196 348 H328" />
        <path className="mhg-flow-head" d="M336 348 l-11 -6 v12 z" />

        {/* ---- SAĞ KIYI · size dönen ----
            KLASÖR GRUBUN DIŞINDA ve hep duruyor. İki iş birden yapıyor:
            (1) sağ kıyıya soldaki yığın kadar kütle veriyor — canlı sahnenin
            küçük ve boş kalan yan kartı bu yüzden yanlış hissettiriyordu;
            (2) dosya turun sonunda gidince yerinde BOŞ klasör kalıyor, yani
            "yeni ay boş klasörle başlıyor" cümlesi çizimde görünüyor. */}
        <rect className="mhg-folder" x="356" y="132" width="168" height="178" rx="6" />

        <g className="mhg-file">
          {/* Sıra CSS'te nth-of-type ile okunuyor, o yüzden bu grubun içinde
              <g>'den başka bir şey yok — sayaç çizimin geri kalanına bağlı
              değil. Sınıfsız bir grup DOM'a hiçbir stil sokmuyor. */}
          {SLABS.map((y) => (
            <g key={y} className="mhg-slab">
              <rect className="mhg-page" x="370" y={y} width="140" height="12" rx="2" />
              {/* Sayfanın kaydı. Tek mavi madde, anlamı sabit. */}
              <rect className="mhg-mark" x="373" y={y + 4} width="8" height="4" rx="2" />
            </g>
          ))}

          {/* Destenin üstüne konan rapor. Turun son beati: dosya tamamlandı,
              üstüne özet geldi, sonra ikisi birlikte gidiyor.
              Üç çubuk BİR ORAN İDDİA ETMİYOR — eksen, etiket ve rakam yok. */}
          <g className="mhg-cover">
            <rect className="mhg-paper" x="370" y="154" width="140" height="42" rx="4" />
            <rect className="mhg-ink" x="382" y="164" width="44" height="8" rx="4" />
            <rect className="mhg-dim" x="382" y="178" width="30" height="6" rx="3" />
            <rect className="mhg-bar" x="442" y="178" width="10" height="12" rx="1.5" />
            <rect className="mhg-bar" x="456" y="170" width="10" height="20" rx="1.5" />
            <rect className="mhg-bar" x="470" y="176" width="10" height="14" rx="1.5" />
            <path className="mhg-hair" d="M438 190 H484" />
          </g>
        </g>

        {/* ---- YOLDAKİ KOPYALAR ----
            Altı tane, hepsi aynı 31 saniyelik saatte, --i kadar gecikmeyle.
            Varsayılan opaklıkları 0 — yani hareket kapalıyken yolda asılı
            duran belge olmuyor, duruş karesi temiz kalıyor. */}
        {FLIGHT.map((kind, i) => (
          <g
            key={`${kind}-${i}`}
            className="mhg-fly"
            style={{ "--i": i } as React.CSSProperties}
          >
            <g transform={FLIGHT_AT[kind]}>
              <DocArt kind={kind} />
            </g>
          </g>
        ))}

        {/* ---- İKİ KELİME ----
            Canlı sahnenin dil kalıbı korundu (sap + küçük harf ad), ama iş
            değişti: orada kelimeler çizimin söyleyemediğini söylüyordu
            ("çift çizgi = kapanış"), burada iki kıyının adını veriyorlar ve
            ikisi de sayfanın kendi başlığından geliyor. */}
        {/* x'ler nesnelerin ORTASI: yığın 48..192 → 120, klasör 356..524 →
            440. ÖLÇÜLDÜ (getBBox, 20 punto, Poppins): "sizden gelen" 123.5
            birim → 58.2..181.7, "size dönen" 105.5 birim → 387.2..492.7.
            İkisi de kendi nesnesinin genişliği içinde kalıyor ve aralarında
            205.5 birim boşluk var — dört kırılımda da (768 · 1023 · 1024 ·
            1440) aynı viewBox kutusu, yani çarpışma imkânsız. */}
        <path className="mhg-stem" d="M120 320 V370 M440 320 V370" />
        <text className="mhg-word" x="120" y="390" textAnchor="middle">
          sizden gelen
        </text>
        <text className="mhg-word" x="440" y="390" textAnchor="middle">
          size dönen
        </text>
      </svg>
    </div>
  );
}
