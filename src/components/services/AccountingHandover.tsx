/* ============================================================================
   TAKAS SAHNESİ · "GEÇİT" — /dubai/muhasebe · #kapsam · takas bloğu
   CSS: src/app/css/svc-muhasebe.css · 15. bölüm · ad alanı .svsg-

   ---------------------------------------------------------------- NEREDEN
   Bu çizim /lab/muhasebe-hero'daki 1. adayın (MhGecit · .mhg-) canlıya
   taşınmış hâli. Müşteri: "aday 1 i de sayfanın içinde bir yerde kullanırız
   çünkü güzel anlatıyor konuyu hoşuma gitti."

   LAB KOPYASI SİLİNMEDİ ve silinmeyecek: müşteri iki hâli yan yana
   karşılaştırıyor. components/lab/MhGecit.tsx ile css/lab-mhg.css oldukları
   gibi duruyor; bu dosya onların canlı KOPYASI, devamı değil. Ad alanı da o
   yüzden ayrı (.mhg- labda, .svsg- burada): labda yapılan bir deneme sessizce
   bu sayfaya geçmesin.

   ------------------------------------------------------------------ NEREYE
   Sahne hero'ya girmedi (hero'nun kendi sahnesi var: AccountingHeroScene ·
   .svma-). Sayfanın 5. bölümüne, "Siz ne veriyorsunuz, biz ne veriyoruz?"
   takas bloğunun BAŞINA girdi — çünkü çizimin kaynağı zaten o blok:

     · soldaki üç belge  = exchange.you'nun üç kalemi
                           (satış/alış faturaları · gider belgeleri ve fişler ·
                           banka ekstreleri)
     · sağdaki klasör    = exchange.usTitle, yani "size dönen"
     · tek yönlü ok      = bloğun kendi gerekçesi: bu bir iş birliği değil bir
                           DEVİR (accountingDubai.ts · exchange yorumu)

   Yani sahne yeni bir iddia getirmiyor; blok zaten neyi SAYIYORSA onu
   gösteriyor. Sıralama da bunun üstüne kuruldu:

     h3 (soru) → SAHNE (fiil: belge gidiyor, dosya dönüyor) → panel (isimler:
     üç kalem gelen, altı kalem dönen)

   PANELİN ORTA SÜTUNU KALKTI. Orada .svs-conn duruyordu: "üç besleme çizgisi →
   defter → tek çıkış oku". Cümlesi bu sahnenin cümlesinin ta kendisiydi, üstelik
   96 piksel genişliğinde. İki çizim aynı bloğun içinde, 24 piksel arayla, aynı
   şeyi anlatıyordu. Panel artık iki sütun; gerekçe svc-muhasebe.css · 6. bölüm.

   METİN: sahne bir kelime EKLEMİYOR. Labdaki iki ad ("sizden gelen" · "size
   dönen") ve saplar canlı kopyada YOK — çünkü onlar tam olarak panelin iki
   sütun başlığı ve panel sahnenin 24 piksel altında duruyor. Çizimin altına
   panelin başlığını bir kez daha yazmak, altyazıya altyazı yazmak olurdu.
   Sahnenin sol/sağ kıyısını panelin sol/sağ sütunu adlandırıyor.

   ------------------------------------------------------------------- TUVAL
   Labdaki tuval 560 × 420 (hero'nun sağ sütununa oturması için kare-yakını).
   Buradaki kutu 560 × 214, yani AYNI koordinat sistemi kırpılmış hâli: iki
   ad ve iki sap gidince altta 100 birimlik boş bir şerit kalıyordu. Tek bir
   nesne yerinden oynamadı — kırpma dışında değişen tek geometri ok.

   OK NEREDEN NEREYE: labda iki sapın arasında, masa çizgisinin ALTINDAYDI
   (y 348). Saplar gidince masanın kendi boşluğuna taşındı (y 314): iki masa
   çizgisi 32..218 ve 346..532 arasında duruyor, yani aralarında zaten 128
   birimlik bir açıklık var ve ok tam onu köprülüyor. Çizim böylece tek bir
   zemin çizgisine oturuyor. Uçuş yolu y 136..289 arasında; okla çakışmıyor.

   -------------------------------------------------------------------- IŞIK
   Labdaki palet GECE zemini içindi (--night-2 · #111). Burası beyaz bölüm,
   sahnenin kendi yüzeyi de --paper (#f5f5f5). Kademelerin tamamı yeniden
   ölçüldü — ölçüm tablosu CSS'te, 15. bölümde. Kısaca: labda ışık aşağıdan
   geliyordu (kağıt zeminden AÇIK), burada yukarıdan (kağıt beyaz, zemin gri).

   MAVİNİN İŞİ BÜYÜDÜ ve bu bilerek: labda tek mavi madde vardı (kayıt
   tırnakları), burada klasörün kenarı da mavi. Sebebi sayfanın kendi dili —
   panelin "size dönen" sütunu zaten --blue-100 zeminli ve --blue-700
   başlıklı. Sahnenin klasörü o kutunun küçük hâli olsun diye aynı iki değeri
   kullanıyor; ziyaretçi çizimdeki mavi klasörle panelin mavi sütununu
   birbirine bağlayabiliyor.

   ---------------------------------------------------------------- HAREKET
   Labdaki saat aynen korundu: tek periyot 31 saniye, 14 animasyon, altı belge
   31/6 ≈ 5.1667 s aralıkla. 31 asal ve sitedeki sürekli periyotların
   (60·42·37·34·29·26·23·20·19·17·15·13·11·5.3) hiçbiriyle ortak böleni yok —
   bu sayfanın kendi hero sahnesi 29 saniyede akıyor, gcd(31,29) = 1.

   useReducedMotion YOK ve olmayacak: bu depoda beş ayrı kalıpta hidrasyon
   hatası çıkardı. Sahne saf CSS ve animasyonlar YALNIZCA
   `prefers-reduced-motion: no-preference` altında TANIMLANIYOR — `reduce`
   altında getAnimations() bu çizimden sıfır döndürüyor, duraklatılmış bir
   animasyon bile kalmıyor. Duruş karesi eksik değil TAM: solda yığın, sağda
   altı sayfası da yerinde duran dolu klasör, üstünde rapor, arada ok.

   Bu bir sunucu bileşeni: tarayıcıya bu çizimden tek satır JS inmiyor.
   ========================================================================= */

/* Kırpılmış kutu. Sayılar labdaki 560 × 420 tuvalinin koordinatları — bu
   yüzden y 118'den başlıyor. 118: klasörün üst kenarı (132) ile uçan
   belgenin en yüksek noktası (136) için 14 birim pay. 332: okun başının alt
   ucu (320) için 12 birim pay. */
const VB = "0 118 560 214";

/* Zeminin ve ışığın boyandığı dikdörtgen — kutunun kendisi. Nokta ızgarası ve
   sönüm maskesi bu kutuya göre çözülüyor, yani kenarlarda dört yandan da
   soluyor. (Labda 0 0 560 420'ydi; kırpılan tuvalde eski dikdörtgen bırakılsa
   sönüm görünür alanın dışında kalır ve noktalar kenarda kesilirdi.) */
const FIELD = { x: 0, y: 118, width: 560, height: 214 };

/* Uçan kopyaların sırası. İki tur: üç belge tipi ikişer kez geçiyor, yani
   klasöre altı sayfa iniyor. Gecikme CSS'te --i ile veriliyor. */
const FLIGHT: ("fatura" | "fis" | "ekstre")[] = [
  "fatura",
  "fis",
  "ekstre",
  "fatura",
  "ekstre",
  "fis",
];

/* Klasörün sayfaları, alttan yukarı. Adım 16, YÜKSEKLİK 10 (labda 12): aradaki
   boşluk 4'ten 6'ya çıktı. Sebep zemin — labda sayfalar koyu bir klasörün
   içinde açık bloklardı ve 4 birim yetiyordu; burada dolu gri sayfalar açık
   mavi bir klasörün içinde ve 4 birimlik aralıkla altısı tek bir gri blok
   gibi okunuyordu (ekranda ölçüldü). 6 birimde aynı altı şekil yine bir
   KÜTLE ama artık sayılabilir bir deste. */
const SLABS = [282, 266, 250, 234, 218, 202];
const SLAB_H = 10;

/* --------------------------------------------------------------- belgeler
   Üçü de kendi başlangıç noktasında (0,0) çiziliyor; nereye konacaklarını
   çağıran yer söylüyor. Böylece aynı çizim hem soldaki yığında hem yoldaki
   kopyada kullanılıyor ve iki yerde iki farklı fatura olmuyor.

   Üçü de FARKLI bir nesne — "aynı dikdörtgen üç kere" değil. Panelin sol
   sütunundaki üç kalemle birebir eşleşiyorlar. */

/* FATURA — 96 × 124. Künye çubuğu, ayraç, dört satır, sağ altta tutar bloğu.
   Tutar bloğunun SAĞ ALTTA olması faturanın en tanınabilir yerleşimi. */
function Fatura() {
  return (
    <>
      <rect className="svsg-paper" x="0" y="0" width="96" height="124" rx="3" />
      <rect className="svsg-ink" x="12" y="14" width="46" height="9" rx="4.5" />
      <path className="svsg-hair" d="M12 34 H84" />
      <rect className="svsg-dim" x="12" y="46" width="60" height="7" rx="3.5" />
      <rect className="svsg-dim" x="12" y="60" width="48" height="7" rx="3.5" />
      <rect className="svsg-dim" x="12" y="74" width="56" height="7" rx="3.5" />
      <rect className="svsg-dim" x="12" y="88" width="40" height="7" rx="3.5" />
      <path className="svsg-hair" d="M52 102 H84" />
      <rect className="svsg-ink" x="58" y="108" width="26" height="8" rx="4" />
    </>
  );
}

/* FİŞ — 42 × 104, ALTI YIRTIK. Testere kenar bu çizimin en ucuz ve en çok iş
   yapan ayrıntısı: dar bir dikdörtgen "kağıt" bile demiyor, altı yırtık dar
   bir dikdörtgen tek bakışta FİŞ. Altı diş, her biri 7 birim. */
function Fis() {
  return (
    <>
      <path
        className="svsg-paper"
        d="M0 3 q0 -3 3 -3 h36 q3 0 3 3 V96 l-7 6 l-7 -6 l-7 6 l-7 -6 l-7 6 l-7 -6 Z"
      />
      <rect className="svsg-ink" x="9" y="12" width="24" height="7" rx="3.5" />
      <path className="svsg-hair" d="M8 28 H34" />
      <rect className="svsg-dim" x="9" y="38" width="18" height="6" rx="3" />
      <rect className="svsg-dim" x="9" y="52" width="24" height="6" rx="3" />
      <rect className="svsg-dim" x="9" y="66" width="14" height="6" rx="3" />
      <path className="svsg-hair" d="M8 80 H34" />
    </>
  );
}

/* EKSTRE — 122 × 82, YATIK ve ÇİFT SÜTUNLU. Dolu künye bandı bir banka
   dökümünün üst şeridi; üç satırın her birinde solda açıklama sağda tutar var,
   yani sütun ayracı olmadan da iki sütunlu okunuyor. Yatıklık bilerek: üç
   belge farklı ORANDA olmasa üçü de "bir kağıt" diye okunurdu. */
function Ekstre() {
  return (
    <>
      <rect className="svsg-paper" x="0" y="0" width="122" height="82" rx="3" />
      <rect className="svsg-band" x="0" y="0" width="122" height="15" rx="3" />
      <rect className="svsg-dim" x="10" y="26" width="46" height="7" rx="3.5" />
      <rect className="svsg-dim" x="80" y="26" width="30" height="7" rx="3.5" />
      <rect className="svsg-dim" x="10" y="42" width="38" height="7" rx="3.5" />
      <rect className="svsg-dim" x="80" y="42" width="30" height="7" rx="3.5" />
      <rect className="svsg-dim" x="10" y="58" width="52" height="7" rx="3.5" />
      <rect className="svsg-dim" x="80" y="58" width="30" height="7" rx="3.5" />
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

export default function AccountingHandover() {
  return (
    <div className="svsg-wrap" aria-hidden="true">
      <svg viewBox={VB} className="svsg" aria-hidden="true" focusable="false">
        <defs>
          {/* Nokta ızgarası: 40 birimde bir tek <rect> ile boyanıyor, 126 ayrı
              daire değil. */}
          <pattern id="svsgDots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle className="svsg-dot" cx="20" cy="20" r="1" />
          </pattern>
          <radialGradient id="svsgFadeG" cx="50%" cy="50%" r="62%">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.54" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id="svsgFade">
            <rect {...FIELD} fill="url(#svsgFadeG)" />
          </mask>
          {/* Işık ortada, yani YOLUN üstünde: sahnenin öznesi iki kıyıdan biri
              değil, aradaki geçiş. Labda gece zemininde mavi bir huzmeydi;
              beyaz kağıtta huzme leke gibi durur, o yüzden burada yüzeyin
              kendisi ortada bir tık AÇILIYOR. Beyaza yaklaşan bir zemin
              üstündeki her ölçüm en kötü hâline burada düşüyor ve tabloda
              (CSS · 15. bölüm) eşiğe göre o hâl yazılı. */}
          <radialGradient id="svsgBloom" cx="46%" cy="50%" r="58%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.42" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect {...FIELD} fill="url(#svsgBloom)" />
        <rect {...FIELD} fill="url(#svsgDots)" mask="url(#svsgFade)" />

        {/* İki zemin çizgisi AYNI y'de (314): iki kıyı aynı masaya oturuyor.
            Aralarındaki 128 birimlik açıklık okun yeri. */}
        <path className="svsg-desk" d="M32 314 H218" />
        <path className="svsg-desk" d="M346 314 H532" />

        {/* ---- SOL KIYI · sizden gelen ----
            Üç belge, üç farklı açı ve üç farklı oran. Üst üste biniyorlar
            çünkü bir yığın böyle okunur; hizalı dizilseler bir liste olurdu ve
            liste "dağınık belge" demez. Yığın 48..192 · 136..309; karşıdaki
            klasör 356..524 · 132..310 — iki kıyı neredeyse aynı kütlede. */}
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
            Panelin okuyla aynı ve aynı gerekçeyle tek yönlü: bu bir iş birliği
            değil bir devir. İki masa çizgisinin arasında (218..346), yani
            çizimin tamamı tek bir zemin çizgisi üstünde okunuyor. */}
        <path className="svsg-flow" d="M226 314 H324" />
        <path className="svsg-flow-head" d="M338 314 l-11 -6 v12 z" />

        {/* ---- SAĞ KIYI · size dönen ----
            KLASÖR GRUBUN DIŞINDA ve hep duruyor. İki iş birden yapıyor:
            (1) sağ kıyıya soldaki yığın kadar kütle veriyor;
            (2) dosya turun sonunda gidince yerinde BOŞ klasör kalıyor, yani
            "yeni ay boş klasörle başlıyor" cümlesi çizimde görünüyor. */}
        <rect className="svsg-folder" x="356" y="132" width="168" height="178" rx="6" />

        <g className="svsg-file">
          {/* Sıra CSS'te nth-of-type ile okunuyor, o yüzden bu grubun içinde
              <g>'den başka bir şey yok — sayaç çizimin geri kalanına bağlı
              değil. */}
          {SLABS.map((y) => (
            <g key={y} className="svsg-slab">
              <rect className="svsg-page" x="370" y={y} width="140" height={SLAB_H} rx="2" />
              {/* Sayfanın kaydı: anlamı sabit — "işlendi".

                  TIRNAK SAYFANIN ÜSTÜNDE DEĞİL, YANINDA. Labda beyaz değil
                  koyu bir sayfanın üstünde duruyordu; burada sayfa beyaz ve
                  içine konan renkli bir çubuk altı sayfayı altı boş form
                  satırına çeviriyordu (ekranda denendi). Klasörün kenarı ile
                  sayfanın arasındaki 14 birimlik pay zaten boştu: tırnak oraya,
                  yani dosyanın SIRTINA taşındı — bir klasörde fihrist tırnağı
                  da orada durur. Kontrastı da böylece kendi zeminine karşı
                  ölçülüyor (klasör dolgusu · 3.50:1). */}
              <rect className="svsg-mark" x="361" y={y + 2} width="5" height="6" rx="1.5" />
            </g>
          ))}

          {/* Destenin üstüne konan rapor. Turun son beati: dosya tamamlandı,
              üstüne özet geldi, sonra ikisi birlikte gidiyor.
              Üç çubuk BİR ORAN İDDİA ETMİYOR — eksen, etiket ve rakam yok. */}
          <g className="svsg-cover">
            <rect className="svsg-paper" x="370" y="154" width="140" height="42" rx="4" />
            <rect className="svsg-ink" x="382" y="164" width="44" height="8" rx="4" />
            <rect className="svsg-dim" x="382" y="178" width="30" height="6" rx="3" />
            <rect className="svsg-bar" x="442" y="178" width="10" height="12" rx="1.5" />
            <rect className="svsg-bar" x="456" y="170" width="10" height="20" rx="1.5" />
            <rect className="svsg-bar" x="470" y="176" width="10" height="14" rx="1.5" />
            <path className="svsg-hair" d="M438 190 H484" />
          </g>
        </g>

        {/* ---- YOLDAKİ KOPYALAR ----
            Altı tane, hepsi aynı 31 saniyelik saatte, --i kadar gecikmeyle.
            Varsayılan opaklıkları 0 — yani hareket kapalıyken yolda asılı
            duran belge olmuyor, duruş karesi temiz kalıyor. */}
        {FLIGHT.map((kind, i) => (
          <g
            key={`${kind}-${i}`}
            className="svsg-fly"
            style={{ "--i": i } as React.CSSProperties}
          >
            <g transform={FLIGHT_AT[kind]}>
              <DocArt kind={kind} />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
