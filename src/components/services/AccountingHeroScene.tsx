/* ============================================================================
   MUHASEBE HERO SAHNESİ — /dubai/muhasebe hero'sunun sağ sütunu
   CSS: src/app/css/svc-muhasebe.css · 16. bölüm (.svma-)

   ------------------------------------------------------------------ NEDEN VAR
   Bir önceki sahne müşteriye gösterildi ve reddedildi: "çok yüzeysel ve hiçbişi
   anlatmıyor. dubai sayfasındaki çok daha iyiydi." Ölçüt orada: ülke hero'sunun
   sağındaki kart (components/shared/HeroDubaiCards.tsx · .dhs-).

   REDDEDİLEN NEYDİ: bölünmüş bir zaman ekseni ve üstünde tekrar eden boş
   plakalar. Şerit soyut bir eksendi, plakalar hiçbir şeyin resmi değildi;
   çizim "muhasebe" değil "ritim" diyordu ve ritmi de sayfanın kendi takvim
   şeridi zaten söylüyordu. Yüzeysellik tam olarak buydu: tanınabilir tek bir
   nesne yoktu.

   BU SAHNE NE ÇİZİYOR: muhasebenin gerçekten ÜRETTİĞİ şeyi — kapanan bir mali
   sayfa. Kalem satırları, tutar sütunu, alt toplam çizgisi, toplam satırı ve
   toplamın altındaki ÇİFT ÇİZGİ. Çift çizgi muhasebenin evrensel kapanış
   işareti: "bu hesap kapandı" demenin çizimdeki karşılığı, ve tek bakışta
   okunuyor. Sağda ikinci bir nesne var — aynı defterden çıkan rapor kartı
   (sütun grafiği) — ve sayfaya bir saç teliyle bağlı: "çıktı buradan doğuyor."

   NEDEN /dubai'nin KARTININ KOPYASI DEĞİL: o kart beş sahneli, düğmeli bir
   ANLATIM (aşama adı + kim yapıyor + şerit kumandası). Burada tek bir sahne,
   iki nesne ve o iki nesnenin adı olan İKİ KELİME var. Aynı seviyeyi tutturan
   şey somutluk: orada mühür, parmak izi, dosya; burada mali sayfa ve rapor.
   İki sayfa yan yana açıldığında aynı kart iki kez görünmüyor.

   ------------------------------------------------------------------ KELİMELER
   Müşteri "yazı da ekleyebiliriz EĞER DESTEK VERECEKSE" dedi; şart bu, o yüzden
   eklenen şey en aza indirildi: iki nesnenin altında birer kelime, her biri
   kendi nesnesine bir sapla bağlı — kapanış · rapor.

   NEDEN GEREKİYORDU: sahnenin bütün iddiası toplamın altındaki ÇİFT ÇİZGİ ve o
   işaret muhasebecinin sözlüğünde, ziyaretçinin sözlüğünde değil. Cetvelli
   satırlar "defter" dedirtiyor ama "bu defter KAPANDI ve kapanıştan bir rapor
   çıktı" cümlesini kurmuyor. İki kelime tam o iki adımı adlandırıyor; üçüncüsü
   olmadığı için de çizim bir altyazı şeridine dönüşmüyor.

   NEDEN BU İKİ KELİME: ikisi de çizimde ZATEN VAR OLAN bir şeyi adlandırıyor.
   Yeni rakam, oran, kalem adı, tarih, belge numarası üretilmedi — sahnedeki
   bütün tutar blokları boş kalmaya devam ediyor. Bir kelime bir bilgi iddia
   etmiyor, bir nesneye ad veriyor.

   NEDEN SVG'NİN İÇİNDE: kalıp SectorScenes.tsx'ten alındı (satış · tahsilat ·
   şirket) — orada kutu başına başlık+altbaşlık denendi, kalabalık yaptı, elendi;
   ayakta kalan biçim "istasyon başına tek kelime, oraya bir sapla bağlı".
   viewBox metni kapsayıcıyla ölçekleniyor, yani punto kabın genişliğine bağlı;
   o yüzden kap üstten sınırlandı (.svma-wrap max-width · svc-muhasebe.css).
   Ölçülen aralık 14.7px – 19.9px, yani 1.36 kat. Ayrıntı CSS'te.

   ÖLÇÜT — KALİTE: dil, müşterinin beğendiği çizimlerden alındı
   (components/sectors/SectorCountryArt.tsx + sektor.css · 7. bölüm). Oradaki
   beş kural burada da geçerli:

     1) KADEMELİ ÇİZGİ MERDİVENİ — uzak olan ince, yakın olan kalın.
        Kalınlık süs değil DERİNLİK taşıyor.
     2) OPAKLIK YOK — derinlik alfayla değil ayrı OPAK mürekkeplerle.
     3) IZGARAYA OTURAN KOORDİNAT — aşağıdaki her sayı 10'un katı, çoğu 20'nin.
        Sayfanın iç ritmi 30 (satır adımı) — o da 10'un katı.
     4) ÇİZİM BAŞINA TAM BİR PARLAK MAVİ NESNE — ve o nesne aynı zamanda tek
        hareketli parça. Mavi "şu anda işlenen şey" demek.
     5) ORTAK DÜĞÜM SÖZLÜĞÜ — iki şeyin birleştiği yer küçük dolu daire.
        Bağlanmayan nokta, boşta duran çizgi yok.

   ------------------------------------------------------------------- HAREKET
   Müşteri "animasyonu daha arttıralım" dedi. Artış YENİ BİR SAAT EKLEYEREK
   değil, var olan 29 saniyelik turu SONUNA KADAR ANLATARAK yapıldı: kapanış bir
   an değil bir sıra, ve sıranın her adımı artık ekranda görünüyor.

     %4  – %55  KAYIT   mavi tutar bloğu tutar sütununda satır satır iniyor
                        (beş kalem). Var olan hareket; adımları biraz sıkıştı,
                        çünkü asıl olay aşağıda.
     %58 – %66  TOPLAM  blok TOPLAM satırına oturuyor ve o satırın mürekkebi
                        kalem satırı kademesinden (k5) cevap kademesine (k6)
                        çıkıyor: rakamlar toplandı.
     %66 – %74  KAPANIŞ toplamın altındaki ÇİFT ÇİZGİ soldan sağa ÇİZİLİYOR.
                        Sahnenin cümlesini kuran işaret artık kurulduğu anda
                        görülüyor; önce hazır duruyordu.
     %74 – %82  ÇIKTI   mavi bir kıvılcım sayfayı rapora bağlayan telden
                        geçiyor. "Rapor buradan doğuyor" iddiası saç teliyle
                        çiziliydi, şimdi kanıtlanıyor.
     %82 – %94  RAPOR   raporun künye çubuğu soldan sağa yazılıyor, ardından
                        üç sütun sırayla cevap kademesine çıkıyor. Kapanışın
                        ürünü. Sütunların BOYU değişmiyor: değişen bir boy bir
                        oran iddia eder, ve sıfırdan büyüyen üç çubuk rapor
                        kartını turun dörtte üçünde boş bırakırdı — sahne
                        beğenilmişti, kompozisyonu boşaltmak doğru takas değil.
     %96 – %100 turun tamamı sönüyor; sonraki ay boş sayfayla başlıyor.

   TEK MAVİ KURALI: kural "aynı anda iki mavi nesne yok" değil, "mavi TEK BİR
   MADDE ve o madde işlenen şeyi gösteriyor". Blok toplamda kalıyor çünkü toplam
   artık kayıtlı; kıvılcım o kaydın rapora giden kopyası. İkisi turun yalnızca
   %8'inde aynı anda görünüyor ve ikisi aynı zincirin iki ucu.

   NEDEN YENİ PERİYOT YOK: sahne turun tamamını tek bir 29 saniyelik saatte
   anlatıyor. İkinci bir periyot eklemek anlatıya bir şey katmaz, yalnızca
   sayfaya ikinci bir nabız koyardı — ve eklenen her yeni periyodun sitedeki
   diğer periyotlarla (60 · 46 · 42 · 34 · 30 · 29 · 26 · 23 · 20 · 19 · 17 ·
   15 · 13) ortak katsız olması gerekirdi. 29 asal ve zaten hiçbiriyle ortak
   böleni yok; hepsini o saate bağlamak bu şartı tur başına bir kez çözüyor.

   ------------------------------------------------------------------- TEKNİK
   · "use client" YOK ve olmayacak. Hareketin tamamı CSS'te; tarayıcıya bu
     dosyadan tek satır JavaScript inmiyor. Yan faydası kritik: bu depoda
     useReducedMotion ile RENDER EDİLEN AĞACI değiştirme hatası dört ayrı
     kalıpta hidrasyon hatası çıkardı (`if (reduce) return null`,
     `{!reduce && …}`, `initial` içinde koşullu değer, `initial={{ width:
     reduce ? … }}`). Bir CSS medya sorgusu sunucu/istemci ayrımı yaratmıyor.
   · ETKİLEŞİM DE SAF CSS: fare çizimin üstündeyken hareket duruyor
     (animation-play-state, .svma-wrap:hover). Ülke kartındaki "ziyaretçi
     durdurabiliyor" davranışının JavaScript'siz karşılığı. Düğme YOK — çizim
     aria-hidden ve odak alan bir öğe aria-hidden ağacın içinde duramaz.
   · SÜREKLİ ANİMASYON SAYISI: 9 öğe, 6 keyframe kümesi, TEK periyot (29s).
     Dokuz öğe: mavi blok · TOPLAM satırının iki bloğu · çift çizgi · kıvılcım ·
     raporun künyesi · rapor sütunları (3). Hepsi aynı saatte ve keyframe
     yüzdeleriyle sıralandıkları için aynı anda en fazla ikisi kımıldıyor.
     29 saniye bilerek asal — sitedeki diğer sürekli periyotların (60 · 46 · 42
     · 34 · 30 · 29 · 26 · 23 · 20 · 19 · 17 · 15 · 13 · 9) hiçbiriyle ortak
     böleni yok, yani sayfa tek bir nabza kilitlenmiyor.
   · prefers-reduced-motion: reduce altında animasyon HİÇ TANIMLANMIYOR
     (yalnızca no-preference içinde kuruluyor), yani getAnimations() bu
     çizimden sıfır döndürüyor. Duruş hâli okunur bir kare ve artık TAM bir
     kare: mavi blok TOPLAM satırında, toplam cevap kademesinde, çift çizgi
     çizili, rapor sütunları ayakta — eksik değil, KAPANMIŞ ve TESLİM EDİLMİŞ.
   · HER TUR KENDİNE KAPANIYOR: turun sonu ile başı arasında hiçbir öğe zıplama
     yapmıyor. Sönen her şey %96–%100 arasında opaklıkla siliniyor, geri dönen
     her şey (çift çizginin kesiği, toplamın mürekkebi) o silinme penceresinin
     içinde eski hâline dönüyor. Döngü dikişi görünmüyor.
   · SVG filtresi YOK (blur/turbulence sürekli animasyonda pahalı); yumuşama
     yalnızca gradyan ve maske ile.
   · Math.random() YOK. Bütün konumlar elle yazılmış sabitler.
   · aria-hidden + focusable="false" KORUNUYOR — iki kelime eklendi diye çizim
     erişilebilir ağaca girmiyor. Gerekçe: kelimeler çizime ait birer etiket,
     sayfanın bir iddiası değil; "kapanış" ve "rapor" cümle olarak zaten
     hero'nun metninde ve sayfanın bölümlerinde geçiyor, yani ekran okuyucu
     hiçbir bilgiyi kaybetmiyor. Çizimde RAKAM hâlâ yok: HeroDubaiCards'taki
     kural aynen geçerli — okunur görünen sahte bir rakam çizimi yalana çevirir,
     ve bir nesnenin adı bir rakam değildir.
   ========================================================================= */

/* Tuval 560 × 420, ızgara birimi 20. Tek kök ölçü CSS'te (.svma-wrap);
   buradaki her sayı viewBox birimi, yani kap büyüyünce çizgi kalınlıkları ve
   hareket mesafeleri dahil her şey aynı katsayıyla büyüyor. preserveAspectRatio
   varsayılanı (xMidYMid meet) oranı koruduğu için esneme imkânsız. */
const VB = "0 0 560 420";

/* ---------------------------------------------------------------- geometri

   MALİ SAYFA (yakın düzlem) x 60..360, y 80..360. İç kenar boşluğu 24, yani
   içerik x 84..336.

     · başlık çubuğu   y 100
     · başlık çizgisi  y 130
     · beş kalem       y 150 · 180 · 210 · 240 · 270   (adım 30)
     · alt toplam      y 300
     · TOPLAM satırı   y 320
     · çift çizgi      y 338 · 344

   Tutar sütunu x 288..336 ve sütun ayracı x=284'te: kalem adı ile tutar
   arasındaki dikey çizgi bir mali sayfanın en tanınabilir işareti, o yüzden
   çizimde var.

   Kalem adlarının genişlikleri EŞİT DEĞİL (148/120/160/132/144): eşit
   olsalardı satırlar bir tablo gibi okunurdu, oysa bunlar farklı adlarda
   kalemler. Tutarlar ise EŞİT genişlikte — bir tutar sütunu zaten hizalıdır.
   Hiçbir rakam iddia edilmiyor; bloklar boş. */
const ROWS = [150, 180, 210, 240, 270];
const NAME_W = [148, 120, 160, 132, 144];

/* Rapor kartındaki üç sütun. Tabanları alt toplam çizgisiyle AYNI hizada
   (y=300): iki nesne aynı zemine oturuyor, yani rapor sayfanın yanında
   yüzmüyor. Yükseklikler farklı ama bir oran iddia etmiyorlar — etiket, eksen
   ve rakam yok. */
const BARS = [
  { x: 424, y: 240 },
  { x: 452, y: 210 },
  { x: 480, y: 260 },
];

/* KELİMELERİN ORTAK TABAN ÇİZGİSİ. Tuvalin altında zaten 60 birimlik boş bant
   vardı (en alttaki mürekkep sayfanın alt kenarı, y 360) — kelimeler oraya
   oturuyor, çizimin hiçbir parçası kaymadı.

   Saplar y 370'te bitiyor, taban çizgisi 390: kelimenin üstünde 20 birimlik
   nefes var, yani punto (20) kadar. SectorScenes'te aynı oran 30/32.

   x'ler nesnelerin ORTASI, kelimenin yakın durduğu bir kenar değil:
     · mali sayfa   x 60..360  → orta 210
     · rapor kartı  x 400..520 → orta 460
   ÖLÇÜLDÜ (getBBox, 20 punto, Poppins): "kapanış" 79.3 birim → 170.4..249.6,
   "rapor" 54.2 birim → 432.9..487.1. İkisi de kendi nesnesinin genişliğinin
   içinde kalıyor (sayfa 60..360, kart 400..520) ve aralarında 183 birim boşluk
   var — çarpışma imkânsız, en dar kırılımda bile. */
const WORD_Y = 390;
const STEM_Y = 370;

export default function AccountingHeroScene() {
  return (
    <div className="svma-wrap" aria-hidden="true">
      <svg viewBox={VB} className="svma" aria-hidden="true" focusable="false">
        <defs>
          {/* Zeminin nokta ızgarası: 40 birimde bir, tek <rect> ile boyanıyor
              (126 ayrı daire değil). Sayfa ve rapor bu ızgaranın üstünde
              duruyor, yani "ızgaraya oturuyor" iddiası çizimin kendisinde
              görünür durumda. */}
          <pattern id="svmaDots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle className="svma-dot" cx="20" cy="20" r="1" />
          </pattern>
          {/* Dokunun kadraj kenarına sert çarpmaması için radyal maske.
              Filtre DEĞİL maske — statik ve bedava. */}
          <radialGradient id="svmaFadeG" cx="50%" cy="50%" r="64%">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.58" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id="svmaFade">
            <rect width="560" height="420" fill="url(#svmaFadeG)" />
          </mask>
          {/* Işık huzmesi. Çizimde TEK tane ve odağın (mali sayfa) üstünde:
              mürekkep merdiveni keyfi değil, bir ışık kaynağının sonucu gibi
              okunsun. Dış durak tam saydam — kabın zemininde iz bırakmıyor. */}
          <radialGradient id="svmaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#2f6fc4" stopOpacity="0.30" />
            <stop offset="0.55" stopColor="#2f6fc4" stopOpacity="0.10" />
            <stop offset="1" stopColor="#2f6fc4" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="560" height="420" fill="url(#svmaDots)" mask="url(#svmaFade)" />
        <circle cx="200" cy="220" r="250" fill="url(#svmaGlow)" />

        {/* ---- ARKADAKİ İKİ SAYFA · derinlik merdiveni ----
            Aynı ölçüde iki sayfa, 20'şer birim sola-yukarı kaydırılmış. Uzak
            olan en ince ve en sönük mürekkeple. Öndeki sayfanın dolgusu OPAK
            olduğu için arkadakilerden yalnızca sol ve üst kenarları görünüyor —
            bir deste böyle okunur. Derinlik perspektifle değil MERDİVENLE.

            Köşe yarıçapı 6 ve bilerek küçük: 10'da üç dikdörtgen bir kâğıt
            destesinden çok bir arayüz penceresi gibi okunuyordu. */}
        <rect className="svma-thin" x="20" y="40" width="300" height="280" rx="6" />
        <rect className="svma-line" x="40" y="60" width="300" height="280" rx="6" />

        {/* ---- MALİ SAYFA · çizimin odağı ----
            Tek dolu yüzey + en kalın nötr kenar. Dolgu zeminden AÇIK: ışık
            yukarıdan geliyor, yani sayfa bir çukur değil bir kabartma. */}
        <rect className="svma-face" x="60" y="80" width="300" height="280" rx="6" />

        {/* Başlık çubuğu ve altındaki çizgi — sayfanın künyesi. */}
        <rect className="svma-item" x="84" y="100" width="132" height="12" rx="6" />
        <path className="svma-rule" d="M84 130 H336" />

        {/* SATIR ÇİZGİLERİ — çizimin en çok iş yapan ayrıntısı. Bunlar yokken
            beş çubuk çifti bir "yükleniyor" iskeleti gibi okunuyordu; çizgiler
            girdiği anda aynı şekil ÇİZGİLİ BİR DEFTER SAYFASI oluyor, çünkü
            cetvelli satır bir mali sayfanın en tanınabilir dokusu. Her çizgi
            kalemin 20 birim altında, yani satırın oturduğu taban. */}
        <path
          className="svma-hair"
          d={ROWS.map((y) => `M84 ${y + 20} H336`).join(" ")}
        />

        {/* Kalem adı ile tutar arasındaki dikey sütun ayracı. */}
        <path className="svma-rule" d="M284 130 V300" />

        {/* Beş kalem: solda ad, sağda tutar. İkisi de aynı satır hizasında. */}
        {ROWS.map((y, i) => (
          <g key={y}>
            <rect className="svma-item" x="84" y={y} width={NAME_W[i]} height="10" rx="5" />
            <rect className="svma-item" x="288" y={y} width="48" height="10" rx="5" />
          </g>
        ))}

        {/* Alt toplam çizgisi — kalemlerin bittiği yer. Satır çizgilerinden
            kalın: burası bir satır tabanı değil, listenin sonu. */}
        <path className="svma-rule" d="M84 300 H336" />

        {/* TOPLAM satırı bir kademe açık mürekkeple: sayfanın cevabı bu satır.
            Altındaki ÇİFT ÇİZGİ muhasebenin kapanış işareti — çizimin en çok
            iş yapan iki çizgisi, çünkü "bu bir mali sayfa" cümlesini tek
            başlarına kuruyorlar. */}
        <rect className="svma-sum" x="84" y="320" width="96" height="10" rx="5" />
        <rect className="svma-sum" x="288" y="320" width="48" height="10" rx="5" />
        <path className="svma-close" d="M282 338 H342 M282 344 H342" />

        {/* ---- RAPOR KARTI · aynı defterden çıkan ikinci nesne ----
            Bir kademe geride (ince kenar, dolgusuz): sayfanın önüne geçmiyor.
            Sütunların tabanı alt toplam çizgisiyle aynı hizada. */}
        <rect className="svma-line" x="400" y="160" width="120" height="160" rx="6" />
        {/* Raporun künye çubuğu. Turun sonunda soldan sağa YAZILIYOR: "rapor
            düzenlendi". Sütunlar değil bu blok hareket ediyor, çünkü sütunları
            sıfırdan büyütmek rapor kartını turun dörtte üçünde boş bir
            dikdörtgene çeviriyordu — sahne beğenilmişti, kompozisyonu bir
            animasyon uğruna boşaltmak doğru takas değil. */}
        <rect className="svma-item svma-head" x="416" y="180" width="56" height="10" rx="5" />
        {/* Sütunlar bir <g> içinde: CSS'teki basamaklı gecikme nth-of-type ile
            veriliyor ve bu grubun içinde <rect>'ten başka bir şey yok, yani
            sayaç çizimin geri kalanına bağlı değil. Sınıfsız bir grup DOM'a
            hiçbir stil sokmuyor; yalnızca sayaç kabı.

            Sütunlar HER ZAMAN tam boyda duruyor; hareketleri mürekkep
            kademesinde: künye yazılırken sırayla cevap kademesine (k6) çıkıp
            turun sonunda geri iniyorlar. Boy değişmiyor, çünkü değişen bir boy
            bir ORAN iddia eder ve bu çizim hiçbir rakam iddia etmiyor. */}
        <g className="svma-chart">
          {BARS.map((b) => (
            <rect
              key={b.x}
              className="svma-item svma-bar"
              x={b.x}
              y={b.y}
              width="16"
              height={300 - b.y}
              rx="3"
            />
          ))}
        </g>
        <path className="svma-thin" d="M416 300 H504" />

        {/* Sayfayı rapora bağlayan tel ve iki ucundaki düğüm. Kardeş
            çizimlerdeki sözlüğün aynısı: birleşme noktası küçük dolu daire. */}
        <path className="svma-wire" d="M360 240 H400" />
        <g className="svma-pin">
          <circle cx="360" cy="240" r="3.4" />
          <circle cx="400" cy="240" r="3.4" />
        </g>

        {/* ---- çizimin mavi maddesi · 1: işlenen tutar ----
            Tutar sütununda inen blok. Basamaklar CSS'te: beş kalem satırı
            (0 → 30 → 60 → 90 → 120) ve son durak TOPLAM satırı (170).
            Duruş hâli toplamda. */}
        <rect className="svma-lit" x="288" y="150" width="48" height="10" rx="5" />

        {/* ---- çizimin mavi maddesi · 2: telden geçen çıktı ----
            Yarıçapı düğümlerle AYNI (3.4) ve tam düğümün üstünde başlıyor: yola
            çıkarken sayfanın düğümü maviye dönüyor, varırken raporun düğümünde
            sönüyor. Yeni bir nokta değil, var olan iki noktanın arasındaki yol.
            Duruş hâli görünmez — tur dışında telde asılı duran bir şey yok. */}
        <circle className="svma-spark" cx="360" cy="240" r="3.4" />

        {/* ---- İKİ KELİME ve saplar ----
            Sap kelimeyi kendi nesnesine bağlıyor; sapsız iki kelime çizimin
            altına yapıştırılmış bir altyazı şeridi olurdu. Saplar boşlukta
            bitmiyor, kendi kelimesine iniyor (aile kuralı).

            Kelimeler küçük harf: bunlar birer başlık değil, birer ad. */}
        <path
          className="svma-stem"
          d={`M210 360 V${STEM_Y} M460 320 V${STEM_Y}`}
        />
        <text className="svma-word" x="210" y={WORD_Y} textAnchor="middle">
          kapanış
        </text>
        <text className="svma-word" x="460" y={WORD_Y} textAnchor="middle">
          rapor
        </text>
      </svg>
    </div>
  );
}
