import type { ReactElement } from "react";

/* ============================================================================
   SEKTÖR SAYFASININ BÜYÜK SAHNESİ — /sektorler/[sektor] · 1. bölüm

   NEDEN VAR: bölümün solunda dört açılır eksen duruyor (tahsilat, ekip,
   faaliyet sınıfı, mülkiyet). Sağ sütun o metnin ŞEMASI değil — dört başlığı
   kutulara bölüp tekrar yazmak sayfayı iki kez okutuyordu. Sahne tek bir şey
   söylüyor ve kendi cümlesini kuruyor.

   ---------------------------------------------------------------------------
   BU TURDA NE OLDU — SAHNE YENİDEN KONUŞMAYA BAŞLADI

   Üç tur geriye bakınca sıralama şu:

     1) Üç sütunlu akış tablosu — 19 <text>, üç marka rozeti, üç lucide ikonu,
        iki ok ucu, akan kesik ray, rayda dolaşan iki darbe: 69 düğüm.
        Müşteri: "çok kalabalıktı."
     2) Bütün metin ve rozetler kaldırıldı, 32 düğüm kaldı.
        Müşteri: "hiçbişi anlatmıyor ya, öncekinde anlatıyordu."
     3) BURASI. Anlatım doğruydu, MİKTARI yanlıştı — geri gelen şey bütün
        etiketler değil, ÜÇ ÇAPA.

   Kalabalığı yapan şey etiket SAYISI ve TEKRAR idi: sahne, sekiz kutunun
   hepsini adıyla ve alt satırıyla yazıyordu ("Web ve SaaS / abonelik",
   "PayPal / kart, cüzdan", "İş hesabı / çoklu para birimi") ve bunların
   yarısı solundaki eksen metninin ikinci kez okunması demekti. Anlatan şey
   ise o envanter değil, ÜSTTEKİ ÜÇ SÜTUN BAŞLIĞI idi: satış → tahsilat →
   şirket. Göz yapıyı oradan okuyordu.

   O yüzden geri gelen tam olarak üç başlık, iki satırlık:

       satış              tahsilat            şirket
       her kanaldan       tek kanaldan        tek ülkede

   Sahnenin kurduğu cümle bu ve dört eksenin görünen metninde bu cümle yok:
   eksen başlıkları "Tahsilat nereden geçiyor", "Ekip nerede oturuyor",
   "Faaliyet hangi sınıfa yazılıyor", "Kod ve marka kimin üstünde" diye soru
   soruyor; sahne cevabın ŞEKLİNİ gösteriyor.

   ---------------------------------------------------------------------------
   ÇAPALAR NEDEN SVG'NİN İÇİNDE DEĞİL

   <text> yasak değil (sahne zaten aria-hidden), ama viewBox içindeki yazı
   kabın genişliğiyle ÖLÇEKLENİYOR ve bu sayfada kap 250px ile 960px arasında
   geziyor:

     · 360px telefon → panel içi 292px → ölçek 0.46
     · 1039px (tek sütun, kırılımın hemen altı) → 960px → ölçek 1.50
     · 1041px (iki sütun) → ~446px → ölçek 0.70

   Yani viewBox biriminde tek bir punto seçmek imkânsız: telefonda 10px'e
   düşen etiket, geniş tek sütunda 33px'e çıkıyor. "Küçük ekranda okunamayan
   etiket kalabalığın kendisidir" kuralı bunu doğrudan yasaklıyor. Çapalar bu
   yüzden DOM'da, gerçek px ile (.sxv-key) — her genişlikte okunur, kırılımda
   kendi puntosunu değiştirebiliyor ve ekran okuyucuya da geçiyor.

   HİZA TESADÜF DEĞİL: SVG width:100% + height:auto olduğu için viewBox'ın x
   ekseni kabın genişliğine BİREBİR oturuyor, dolayısıyla yüzdeyle verilen bir
   ızgara sütunu çizimdeki nesnenin tam üstüne düşüyor. Üç çapa üç BANDA
   yerleşiyor ve iki sahne de aynı bantları kullanıyor:

       BANT 1: x  40 → 200   (kaynaklar / dosya)
       BANT 2: x 280 → 440   (hattın üstündeki tek kutu)
       BANT 3: x 440 → 640   (gövde / çerçeveler)

   Yeni bir sahne eklenecekse bu üç banda oturmak zorunda; sütun yüzdeleri
   sektor.css · 6. bölümde sabit yazılı.

   ---------------------------------------------------------------------------
   NE GERİ GELMEDİ VE NEDEN

   · KUTU BAŞINA ETİKET. Sekiz kutunun sekiz adı ve sekiz alt satırı
     kalabalığın kendisiydi. Üç kaynak kutusunun hangisi olduğu YAZMIYOR —
     üç olmaları zaten "satış çoğaltılabilir" demek, adları tahsilat kanalını
     değiştirmiyor.
   · MARKA ROZETLERİ (Stripe, PayPal). İki sebep: (a) rozet gerçek marka
     rengini basıyor, oysa bu ailede çizim başına TEK parlak nesne var ve o da
     hareket eden mavi — ikinci ve üçüncü bir renk kuralı bozar; (b) ikisini
     birden basmak vitrini geri getirir, birini seçmek ise sahnenin
     yapmadığı bir tercih ilan eder. Stripe ve PayPal birinci eksenin ayrıntı
     paragrafında zaten adıyla geçiyor.
   · OK UÇLARI. Yön zaten hattın kendisinden ve ışığın gidiş yönünden
     okunuyor; ok ucu her düğüme bir üçgen daha ekliyordu.
   · IKONLAR. lucide her ikon için 3–6 düğüm basıyor ve hiçbiri kutunun
     söylemediği bir şey söylemiyordu.

   ---------------------------------------------------------------------------
   DÜĞÜM SAYISI

   Yazılım sahnesi: SVG içinde 39 düğüm (kök <svg> hariç) + 10 DOM düğümü
   (çapa listesi) = 49. Yedek sahne: 36 + 10 = 46. Ölçek 32 ile 69 arasında ve
   bilerek ALT uca yakın: müşterinin şikâyeti "kalabalık" tarafındaydı, yani
   hata payı sadelik yönünde bırakılıyor.

   32'nin üstüne çıkan 7 düğümün her birinin tek bir işi var:
     · 3 yuva (.sxv-well) → üç kaynak kutusu artık boş dikdörtgen değil, içi
       olan bir nesne; "kaynak" olduğu şekilden okunuyor
     · 2 düğüm (kutu + iç bölme) → hattın üstündeki TEK KUTU. Sahnenin bütün
       iddiası buydu ve önceki turda çizimde karşılığı yoktu: hat kesintisiz
       geçiyordu, yani "tek kanal" görünmüyordu. Şimdi her şey bu kutuya girip
       çıkıyor ve orta çapa ("tahsilat / tek kanaldan") tam onun üstünde
     · 2 nokta (.sxv-pin) → o kutunun giriş ve çıkışı; ikisi de gerçek birleşme

   ---------------------------------------------------------------------------
   AİLE — üç ülke çizimiyle ortak olan şey (kurallar sektor.css · 6. bölüm)

     1) BEŞ KADEMELİ ÇİZGİ MERDİVENİ. Kalınlık bilgi taşıyor: nokta ızgarası
        en ince, iç bölmeler ince, besleme yolları orta, ana hat en kalın nötr
        çizgi, mavi en parlak. Eşit kalınlıkta iki çizgi yok.
     2) OPACITY HİÇ KULLANILMIYOR. Kademe beş ayrı OPAK mürekkeple veriliyor;
        neredeyse siyah zeminde her alfa aynı griye düşüyor (tek istisna ışık
        huzmesinin gradyanı, o bir yüzey değil ışık).
     3) BÜTÜN KOORDİNATLAR IZGARADA. Tuval 640 × 320, birim 20; her sayı 20'nin
        (birkaçı 10'un) katı. Tek istisna dönüş yarıçapları (16) ve onlar da
        her dönüşte aynı.
     4) TEK MAVİ, TEK NESNE. Çizimde --blue-600 taşıyan tam olarak bir nesne
        var ve o nesne aynı zamanda tek hareketli parça. Mavi süs değil,
        "şu anda canlı olan şey" demek.
     5) BAĞLANMAYAN NOKTA YOK. Düğüm (küçük dolu daire) yalnızca iki şeyin
        gerçekten birleştiği yerde duruyor.

   İKİ SAHNE BİRBİRİNİN KARDEŞİ: ikisi de "bir taraf → hattın üstünde tek bir
   kutu → öbür taraf" kurgusunda. Yedek sahne sektöre değil olguya baktığı
   için bilinmeyen sektörde yanlış bir şey söylemiyor, ama aynı gramerle
   söylüyor.

   ---------------------------------------------------------------------------
   TEKNİK — bu dosyada "use client" YOK ve olmayacak

   Hareketin tamamı CSS'te; bu bileşenden tarayıcıya tek satır JavaScript
   inmiyor. Yan faydası büyük: bu depoda useReducedMotion ile RENDER EDİLEN
   AĞACI değiştirmek dört ayrı kalıpta hidrasyon hatası çıkardı. Eski sahnenin
   `Pulse` bileşeni tam bu yüzden bir kez düzeltilmişti; artık böyle bir öğe
   yok — bir CSS medya sorgusu sunucu/istemci ayrımı yaratmıyor, hidrasyon
   riski sıfır. Çapa listesi de düz DOM, durum tutmuyor.

   HAREKET BÜTÇESİ: sahne sayfaya TAM BİR sürekli animasyon ekliyor (ışığın
   kanaldan geçmesi · stroke-dashoffset). Üç ülke çizimi 19 / 15 / 34 saniyede
   çalışıyor; bu sahnenin periyodu 23 saniye, hiçbiriyle ortak katı yok, yani
   sayfa hiçbir zaman tek bir nabza kilitlenmiyor. prefers-reduced-motion:
   reduce altında animasyon hiç KURULMUYOR (yalnızca no-preference içinde
   tanımlı) ve ışık okunur bir duruş karesinde kalıyor.

   SINIRLAR: SVG filtresi yok (blur/turbulence sürekli animasyonda pahalı),
   Math.random() yok, SVG içinde <text> yok.

   ---------------------------------------------------------------------------
   İKİNCİ SEKTÖR EKLENDİĞİNDE

   Eşleme sektör ANAHTARINA bağlı, sıraya değil. sectors.ts'e ikinci bir sektör
   girildiğinde hiçbir şey yapılmasa da sayfa boş kutu göstermiyor: bilinmeyen
   sektör SceneThreeFrames'e düşüyor. Sektöre özgü bir şey söylemek isteyen
   SECTOR_SCENES kaydına bir satır ekler — çizim, üç çapa ve altyazı TEK bir
   nesnede duruyor, ayrı ayrı taşınmıyorlar.
   ========================================================================= */

/* ---------------------------------------------------------------- geometri
   İKİ ÇİZİM DE AYNI TUVALDE: 640 × 320, ızgara birimi 20. Kap büyüyünce
   çizimin TAMAMI aynı katsayıyla büyüyor — çizgi kalınlıkları ve hareket
   mesafeleri dahil — çünkü hepsi viewBox birimi. Esneme imkânsız:
   preserveAspectRatio varsayılanı oranı koruyor. */
const VB = "0 0 640 320";

/* Zemin dokusu ve ışık huzmesi. Bu iki yardımcının ikizi SectorCountryArt'ta
   duruyor ama oradan alınmıyor: o dosya ülke bloklarının dekoru ve dışa
   yalnızca kendi bileşenini veriyor. İki dosyayı birbirine bağlamak yerine
   ölçüleri bu tuvale (640 × 320) göre yazılmış iki küçük kopya tutuluyor.

   SVG id'leri belge genelinde tekil olmak zorunda ve çakışma sessizce yanlış
   deseni gösterir. Burada sabit id kullanılabiliyor çünkü SectorHeroScene
   sayfada TEK sahne basıyor — iki çizim aynı anda ekranda olamıyor. */
function Ground() {
  return (
    <>
      <defs>
        <pattern id="sxv-dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle className="sxv-dot" cx="20" cy="20" r="1" />
        </pattern>
        {/* Izgaranın kadraj kenarına sert çarpmaması için radyal maske.
            Filtre DEĞİL maske — statik ve bedava. */}
        <radialGradient id="sxv-fade-g" cx="50%" cy="50%" r="64%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.58" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="sxv-fade">
          <rect width="640" height="320" fill="url(#sxv-fade-g)" />
        </mask>
      </defs>
      <rect width="640" height="320" fill="url(#sxv-dots)" mask="url(#sxv-fade)" />
    </>
  );
}

/* Işık huzmesi. Çizimde TEK tane ve odağa konuyor: mürekkep merdiveni böylece
   keyfi durmuyor, bir ışık kaynağının sonucu gibi okunuyor. Dış durak tam
   saydam — panelin zemininde (--night-2) iz bırakmıyor. */
function Glow({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <>
      <defs>
        <radialGradient id="sxv-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#2f6fc4" stopOpacity="0.30" />
          <stop offset="0.55" stopColor="#2f6fc4" stopOpacity="0.10" />
          <stop offset="1" stopColor="#2f6fc4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="url(#sxv-glow)" />
    </>
  );
}

/* ============================================================================
   1 · YAZILIM — "her kanaldan satış, tek kanaldan tahsilat"

   Kuşbakışı bir bağlantı planı, üç istasyon:

     BANT 1 (x 40→200)   üç eşit kaynak. Yazılım her yerden satılır; hangisi
                         olduğu YAZMIYOR, üç olması yeterli. Üçü de aynı ölçü,
                         aynı yüzey, aynı yuva — aralarında hiyerarşi yok ve
                         olmamalı, çünkü hangisinden satıldığı tahsilat
                         kanalını değiştirmiyor.
     BANT 2 (x 280→440)  hattın üstündeki TEK KUTU. Sahnenin iddiası burada:
                         üç yol tek hatta iniyor ve o hat bu kutuya giriyor.
                         Kutunun ortasındaki bant hattın geçtiği yer; giriş ve
                         çıkışı düğümle işaretli.
     BANT 3 (x 440→640)  gövde. Kaynaklardan büyük, yüzeyi bir kademe açık,
                         kenarı bir kademe kalın — kabartma gibi duruyor çünkü
                         ışık yukarıdan geliyor.

   HİYERARŞİ KALINLIKTAN OKUNUYOR: kaynaklar ve besleme yolları orta
   kalınlıkta (.sxv-line), ortak hat en kalın nötr çizgi (.sxv-edge), üstünden
   geçen ışık tek mavi. Yan yolların dönüşleri AYNI yarıçapla (16, kuadratik)
   yuvarlatılmış: tek bir keyfi köşe yok. */
const CHANNEL = "M120 160 H440";

function SceneSoftwareChannel() {
  return (
    <svg viewBox={VB} className="sxv" aria-hidden="true" focusable="false">
      <Ground />
      <Glow cx={400} cy={160} r={270} />

      {/* Üst ve alt kaynağın ortak hatta indiği iki yol. Ortadaki kaynak zaten
          hattın üstünde, ona ayrı yol çizilmiyor — çizilseydi üç yolun ikisi
          dirsekli biri düz olurdu ve düz olan öne çıkardı; üçü eşit. */}
      <path
        className="sxv-line"
        d="M120 60 H184 Q200 60 200 76 V160 M120 260 H184 Q200 260 200 244 V160"
      />

      {/* Ortak hat — çizimin en kalın nötr çizgisi. ÖNCE basılıyor: aşağıdaki
          kutu 280–360 arasında onun üstünü kapatıyor, yani hat kutuya GİRİYOR,
          kutunun üstünden geçmiyor. Işık en sonda ve o hepsinin üstünde. */}
      <path className="sxv-edge" d={CHANNEL} />

      {/* --- BANT 1: üç kaynak --- */}
      <rect className="sxv-face" x="40" y="40" width="80" height="40" rx="10" />
      <rect className="sxv-face" x="40" y="140" width="80" height="40" rx="10" />
      <rect className="sxv-face" x="40" y="240" width="80" height="40" rx="10" />
      {/* Yuvalar: kutuyu boş dikdörtgen olmaktan çıkaran tek şey. Üçü birebir
          aynı — farklı desen vermek "biri ötekinden başka türlü" derdi ve
          sahne o ayrımı yapmıyor. */}
      <rect className="sxv-well" x="60" y="50" width="40" height="20" rx="4" />
      <rect className="sxv-well" x="60" y="150" width="40" height="20" rx="4" />
      <rect className="sxv-well" x="60" y="250" width="40" height="20" rx="4" />

      {/* --- BANT 2: hattın üstündeki tek kutu ---
          .sxv-face-lg DEĞİL .sxv-face: odak gövde, bu kutu değil. Ayrımı
          kalınlık değil ÖLÇEK yapıyor — kaynaklardan büyük, gövdeden küçük.
          İç bölme hattı 140 ve 180'de: ortadaki 40 birimlik bant tam olarak
          hattın geçtiği yer. */}
      <rect className="sxv-face" x="280" y="120" width="80" height="80" rx="10" />
      <path className="sxv-thin" d="M280 140 H360 M280 180 H360" />

      {/* --- BANT 3: gövde --- */}
      <rect className="sxv-face-lg" x="440" y="80" width="160" height="160" rx="16" />

      {/* Gövdenin içi: 3 × 3 modül alanı, iki modülü dolu. Dubai çizimindeki
          alt katın modül ızgarasıyla aynı fikir — gövde kapalı bir kutu değil,
          içi kurulmuş bir yapı.
          BİR ÖNCEKİ DENEMEDE İÇERİDE TEK BİR KOYU DİKDÖRTGEN VARDI VE HATAYDI:
          yuvarlak köşeli bir gövdenin ortasındaki büyük koyu yüzey ekranda bir
          CİHAZ okutuyordu (monitör + tuş). Modüllere bölünen bir alan aynı
          yanılsamayı vermiyor.
          Dolu iki modül köşegen basamak yapıyor; merkeze göre simetrik
          yerleşim bu ölçekte yine bir yüz/hedef şablonuna oturuyor. */}
      <path className="sxv-cell" d="M460 100 H500 V140 H460 Z M500 140 H540 V180 H500 Z" />
      {/* Alanın çerçevesi ayrı bir düğüm: ızgara çizgilerinin uçları boşlukta
          bitmesin — bağlanmayan çizgi bırakmama kuralı burada da geçerli. */}
      <rect className="sxv-thin" x="460" y="100" width="120" height="120" rx="4" />
      <path className="sxv-thin" d="M500 100 V220 M540 100 V220 M460 140 H580 M460 180 H580" />

      {/* Düğümler: üç kaynağın çıkışı, yolların hatta bindiği yer, kutunun
          girişi ve çıkışı, hattın gövdeye girdiği yer. Yedisi de gerçek
          birleşme — boşta duran nokta yok. */}
      <g className="sxv-pin">
        <circle cx="120" cy="60" r="3.4" />
        <circle cx="120" cy="160" r="3.4" />
        <circle cx="120" cy="260" r="3.4" />
        <circle cx="200" cy="160" r="3.4" />
        <circle cx="280" cy="160" r="3.4" />
        <circle cx="360" cy="160" r="3.4" />
        <circle cx="440" cy="160" r="3.4" />
      </g>

      {/* ---- çizimin TEK mavi nesnesi ve TEK hareketi ----
          pathLength="1000": kesik deseni yolun gerçek uzunluğundan bağımsız
          hâle geliyor, yani hat bir gün uzarsa desen bozulmuyor. CSS'teki
          140/1860 "yolun %14'ü ışık, %186'sı boşluk" diye okunuyor: kanalda
          aynı anda EN FAZLA BİR ışık var ve iki geçiş arasında kanalın tamamen
          sakin kaldığı bir aralık kalıyor. Işık kutunun üstünden geçiyor —
          altında kalsaydı sahnenin tek parlak nesnesi ortada kaybolurdu. */}
      <path className="sxv-lit sxv-run" pathLength="1000" d={CHANNEL} />
    </svg>
  );
}

/* ============================================================================
   2 · YEDEK — "aynı dosya, üç çerçeve"

   Kaydı olmayan sektör buraya düşüyor. Boş kutu göstermektense sektörden
   BAĞIMSIZ doğru bir şey göstermek daha iyi: aynı kuruluş dosyası bir ayrımdan
   geçip üç ayrı çerçeveye giriyor. Çerçevelerin hangi ülke olduğu yazmıyor —
   çizim bir olguyu gösteriyor, bir iddiada bulunmuyor, dolayısıyla hangi
   sektöre düşerse düşsün yanlış olmuyor.

   KARDEŞ SAHNEYLE AYNI GRAMER: bant 1'de bir gövde, bant 2'de hattın üstünde
   tek bir kutu, bant 3'te öbür taraf. Çapalar da aynı üç banda oturuyor, yani
   yedek sahne "başka bir çizim" gibi durmuyor.

   TEK FARK ÇERÇEVELERİN İÇİNDE: üçü aynı genişlikte ama sırasıyla iki, üç ve
   dört bölmeye ayrılmış. "Aynı dosya" ile "ayrı çerçeve" arasındaki fark
   yazıyla değil, bölme sayısıyla söyleniyor. */
const FILE_LINE = "M180 160 H400";

function SceneThreeFrames() {
  return (
    <svg viewBox={VB} className="sxv" aria-hidden="true" focusable="false">
      <Ground />
      <Glow cx={320} cy={160} r={270} />

      {/* Ortak hat — dosyanın üçe ayrılmadan önceki tek gövdesi. Kardeş
          sahnedeki gibi önce basılıyor, kutu üstünü kapatıyor. */}
      <path className="sxv-edge" d={FILE_LINE} />

      {/* --- BANT 1: dosya --- çizimin sol odağı. Bir başlık yuvası ve altında
          üç satır: "içi olan bir dosya" kapalı bir kutuyla anlatılmıyor. */}
      <rect className="sxv-face-lg" x="40" y="100" width="140" height="120" rx="14" />
      <rect className="sxv-well" x="60" y="120" width="60" height="20" rx="4" />
      <path className="sxv-thin" d="M60 160 H160 M60 180 H120 M60 200 H140" />

      {/* --- BANT 2: ayrımın kutusu --- kardeş sahnedeki kutuyla aynı ölçü ve
          aynı iç bölme; iki sahnenin aynı aileden olduğunu söyleyen şey bu. */}
      <rect className="sxv-face" x="280" y="120" width="80" height="80" rx="10" />
      <path className="sxv-thin" d="M280 140 H360 M280 180 H360" />

      {/* Ayrım: dikey omurga ve üç dal */}
      <path className="sxv-line" d="M400 60 V260 M400 60 H440 M400 160 H440 M400 260 H440" />

      {/* --- BANT 3: üç çerçeve --- aynı ölçü, farklı bölünme */}
      <rect className="sxv-face" x="440" y="40" width="160" height="40" rx="10" />
      <rect className="sxv-face" x="440" y="140" width="160" height="40" rx="10" />
      <rect className="sxv-face" x="440" y="240" width="160" height="40" rx="10" />
      <path
        className="sxv-thin"
        d="M480 40 V80 M480 140 V180 M520 140 V180 M480 240 V280 M520 240 V280 M560 240 V280"
      />

      <g className="sxv-pin">
        <circle cx="180" cy="160" r="3.4" />
        <circle cx="280" cy="160" r="3.4" />
        <circle cx="360" cy="160" r="3.4" />
        <circle cx="400" cy="160" r="3.4" />
        <circle cx="440" cy="60" r="3.4" />
        <circle cx="440" cy="160" r="3.4" />
        <circle cx="440" cy="260" r="3.4" />
      </g>

      {/* ---- tek mavi, tek hareket: ışık ortak gövdede, ayrımdan ÖNCE ----
          Dallardan birinde koşsaydı "asıl olan bu ülke" derdi; çizim üç
          çerçeve arasında tercih yapmıyor. */}
      <path className="sxv-lit sxv-run" pathLength="1000" d={FILE_LINE} />
    </svg>
  );
}

/* ============================================================================
   3 · KAYIT DEFTERİ — sahne sektör anahtarına bağlı, sıraya değil
   ========================================================================= */

type SceneFn = () => ReactElement;

/** Bir istasyonun çapası: kalın satır ne olduğunu, ince satır kaç tane
    olduğunu söylüyor. İkisi birden bir kelimeden uzun olmayacak — uzayan her
    çapa, kaldırdığımız etiket tablosuna geri dönmenin ilk adımı. */
type Key = { t: string; s: string };

/** Bir sahne, çapaları ve altındaki tek cümle. Üçü hiçbir zaman ayrı
    taşınmıyor — ayrı tablolarda dursalardı biri güncellenip öteki
    unutulduğunda sayfa yanlış çizimin altına doğru cümleyi basardı (bu bir kez
    oldu: kayıt anahtarı değişince yedek çizim, sektörün altyazısıyla çıktı).

    `keys` ÜÇLÜ demet, dizi değil: çapa sütunlarının yüzdeleri sektor.css'te
    sabit ve üç banda göre yazılı. Dördüncü bir çapa eklemek hizayı sessizce
    bozardı; tip bunu derlemede durduruyor. */
type Panel = { Scene: SceneFn; caption: string; keys: [Key, Key, Key] };

/* Altyazı çapaların söylediğini TEKRAR ETMİYOR: çapalar yapıyı ("ne, kaç
   tane"), altyazı sonucu söylüyor ("o hâlde ne oluyor"). */

/* Kaydı olmayan sektörün düştüğü yer. Boş kutu yok. */
const FALLBACK_HERO: Panel = {
  Scene: SceneThreeFrames,
  keys: [
    { t: "dosya", s: "aynı içerik" },
    { t: "ayrım", s: "üç ülke" },
    { t: "çerçeve", s: "üç ayrı biçim" },
  ],
  caption: "Değişen şey işin kendisi değil, şirketin kurulduğu ülkenin çerçevesi.",
};

const SECTOR_SCENES: Record<string, { hero: Panel }> = {
  "yazilim-ve-teknoloji": {
    hero: {
      Scene: SceneSoftwareChannel,
      keys: [
        { t: "satış", s: "her kanaldan" },
        { t: "tahsilat", s: "tek kanaldan" },
        { t: "şirket", s: "tek ülkede" },
      ],
      caption:
        "Satış tarafını çoğaltmak kolay; tahsilat tek bir kanaldan geçtiği için şirketin adresini çoğu zaman o kanal belirliyor.",
    },
  },
};

/* ------------------------------------------------------------------- çıkış

   Bileşen olarak dışa veriliyor, fonksiyon olarak değil: aramayı bileşenin
   kendisi yapınca sayfa yalnızca bir anahtar geçiriyor ve kayıt defteri bu
   dosyanın içinde kalıyor. Sayfa da bu dosya da sunucu bileşeni — sınırı
   geçen hiçbir şey yok. */

/** Giriş bölümündeki büyük sahne: üstte üç çapa, ortada çizim, altta tek
    cümle. Bilinmeyen sektör yedeğe düşer.

    ÇİZİM aria-hidden, ÇAPALAR DEĞİL: çizim bir iddia taşımıyor ama çapalar üç
    kelimelik gerçek bir cümle kuruyor ve ekran okuyucunun onu duymaması için
    bir sebep yok. Sıralı liste, çünkü sıra bilginin kendisi — satıştan
    şirkete doğru okunuyor. */
export function SectorHeroScene({ slug }: { slug: string }) {
  const { Scene, caption, keys } = SECTOR_SCENES[slug]?.hero ?? FALLBACK_HERO;

  return (
    <figure className="sxv-panel">
      <ol className="sxv-key">
        {keys.map((k) => (
          <li key={k.t}>
            <b>{k.t}</b>
            <i>{k.s}</i>
          </li>
        ))}
      </ol>
      <Scene />
      <figcaption className="sxv-cap">{caption}</figcaption>
    </figure>
  );
}
