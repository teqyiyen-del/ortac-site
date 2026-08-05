import type { ReactElement } from "react";
import { Building2, FileStack, FileText, Globe, Split, Store, type LucideIcon } from "lucide-react";
import { BrandBadge } from "@/components/shared/BrandMark";

/* ============================================================================
   SEKTÖR SAYFASININ BÜYÜK SAHNESİ — /sektorler/[sektor] · 1. bölüm
   CSS: src/app/css/sektor.css · 6. bölüm (.sxv-)

   NEDEN VAR: bölümün solunda dört açılır eksen duruyor (tahsilat, ekip,
   faaliyet sınıfı, mülkiyet). Sağ sütun o metnin ŞEMASI değil — dört başlığı
   kutulara bölüp tekrar yazmak sayfayı iki kez okutuyordu. Sahne tek bir şey
   söylüyor ve kendi cümlesini KENDİ İÇİNDE kuruyor.

   ---------------------------------------------------------------------------
   BU TURDA NE DÜZELDİ — ANLATIM ÇİZİMİN İÇİNE GERİ DÖNDÜ

   Beş turluk sıralama:

     1) Üç sütunlu akış tablosu — 19 <text>, 3 marka rozeti, 4 lucide simgesi,
        2 ok ucu, akan kesik ray, rayda dolaşan 2 darbe.
        Müşteri: "ne güzel logolar simgeler anlatımlar vardı, tek derdim çok
        karışık olmasıydı."
     2) Bütün metin, rozet ve simgeler kaldırıldı; geriye yazısız bir çizim
        kaldı. Müşteri: "hiçbişi anlatmıyor."
     3) Anlatım geri geldi ama ÇİZİMİN DIŞINA — üç çapa SVG'nin üstünde bir
        DOM listesi, tek cümle altında altyazı. Müşteri: "sanki oraya bir SVG
        koymuşuz da içini boş unutmuşuz gibi duruyor; bunu üst ve alta text
        yazarak çözemezsin."
     4) Anlatan her şey ÇİZİMİN İÇİNE alındı. SVG'nin üstündeki çapa listesi
        (.sxv-key) tamamen kaldırıldı; panelde çizimden önce tek bir kelime
        kalmadı. Altında hâlâ bir altyazı vardı.
     5) BURASI. Altyazı da gitti — panelde çizimden başka HİÇBİR ŞEY yok.

   ---------------------------------------------------------------------------
   ALTYAZI NEDEN KALKTI VE CÜMLESİ NEREYE GİTTİ

   Müşteri: "şu yazılım kartının en altındaki yazıyı kaldırabiliriz."

   Kalkan cümle şuydu: "Satış tarafını çoğaltmak kolay; tahsilat tek bir
   kanaldan geçtiği için şirketin adresini çoğu zaman o kanal belirliyor."
   İki iddia taşıyordu ve İKİSİ DE yerinde duruyor:

     · YAPI (çok kaynak → tek kanal → tek şirket) ÇİZİMİN KENDİSİNDE. Üç ayrı
       simgeli kutu tek bir tahsilat kutusuna iniyor, o kutudan çıkan tek hat
       tek gövdeye bağlanıyor. Zincir animasyonu bunu ayrıca zamanda da
       anlatıyor: üç darbe birleşiyor, tek darbe devam ediyor.
     · SONUÇ ("şirketin adresini o kanal belirliyor") ÇİZİMİN SOLUNDA, birinci
       eksenin ayrıntı paragrafında, neredeyse birebir aynı cümleyle:
       "Şirketin adresini çoğu zaman bu tek satır belirliyor: satış her yerden
       gelir, tahsilat tek bir kanaldan geçer." (lib/sectors.ts · YAZILIM ·
       decide.axes[0].detail)

   Yani altyazı, iki metre solundaki paragrafın tekrarıydı. Kaybı yok.

   İÇERİDE ANLATAN DOKUZ ÖĞE — hepsi bir işe yarıyor, hiçbiri süs değil:
     · 3 lucide simgesi — satışın üç ayrı kanalı (web/abonelik, uygulama
       mağazası, sözleşmeli kurumsal satış). Üç kutunun üçü de aynı olsaydı
       "her kanaldan" görünmezdi; ayrımı yapan şey simgeler.
     · 2 GERÇEK MARKA İŞARETİ (Stripe, PayPal) — soyut bir vektör "kart
       tahsilatı" demiyor, Stripe diyor. İkisi de uydurma değil: birinci
       eksenin ayrıntı paragrafı ikisini de adıyla anıyor.
     · 1 lucide simgesi — gövdedeki şirket.
     · 3 kelime (<text>) — istasyonların adı: satış · tahsilat · şirket.

   NE GERİ GELMEDİ VE NEDEN — kalabalık öğeleri silerek değil, KATMAN SEÇEREK
   çözülüyor: hangi işaret gerçekten anlatıyor, hangisi yalnızca yer kaplıyor?

     · KUTU BAŞINA BAŞLIK + ALT SATIR (12 <text>). Kalabalığın ana kaynağıydı
       ve yarısı solundaki eksen metninin ikinci kez okunması demekti.
       Simge aynı şeyi bir düğümde söylüyor.
     · ÇAPALARIN İKİNCİ SATIRI ("her kanaldan", "tek kanaldan", "tek ülkede").
       Çizim işini yapıyorsa bunlar zaten görünüyor: üç ayrı kaynak üç ayrı
       simge, hepsi TEK kutuya iniyor, o kutudan TEK gövdeye çıkıyor. Yazıyla
       tekrar etmek çizime güvenmemek olurdu. Cümlenin tamamı altyazıda.
     · OK UÇLARI. Yön hattın kendisinden ve ışığın gidiş yönünden okunuyor.
     · SÜTUN BAŞLIĞI OLARAK ETİKET ŞERİDİ. Kelimeler artık şeritte değil, her
       biri kendi istasyonunun ALTINDA ve oraya bir sapla bağlı.

   ---------------------------------------------------------------------------
   KELİMELER NEDEN SVG'NİN İÇİNDE <text> OLARAK DURUYOR — VE OKUNUYOR

   viewBox içindeki yazı kabın genişliğiyle ÖLÇEKLENİYOR; sorun buydu ve bir
   tur önce metni DOM'a kaçırmanın gerekçesiydi. Çözüm metni dışarı atmak
   değil, ÖLÇEĞİ SINIRLAMAK — iki taraftan birden:

     · KAP DAR TUTULDU: tek sütun düzeninde panel 560px'te durduruluyor
       (sektor.css · .sx-art max-width). Eskiden 960px'e kadar açılıyordu ve
       aynı kelime orada 48px'lik bir manşete dönüşüyordu.
     · PUNTO KABA GÖRE SEÇİLİYOR: tek sabit sayı değil, üç basamak — kap
       büyüdükçe viewBox puntosu KÜÇÜLÜYOR ki ekrandaki punto sabit kalsın
       (sektor.css · .sxv-word · @container).

   Bu turda müşteri "satış · tahsilat · şirket daha küçük olsun, doğal
   dursun" dedi ve haklıydı: tek sabit punto (32 birim) en geniş kapta 26.4px
   veriyordu, yani bir grafik etiketi değil bir ALT BAŞLIK ölçüsü. Ölçülen
   yeni aralık 11.0px–18.3px; en geniş kapta 26.4 → 18.1px.

   EKRAN OKUYUCU: çizim artık aria-hidden DEĞİL, role="img" + aria-label.
   Kaldırılan DOM çapa listesi erişilebilir bir cümle taşıyordu ve o cümle
   kaybolmadı — etiket olarak aynı şeyi söylüyor.

   ---------------------------------------------------------------------------
   MARKA İŞARETİ NEDEN "TEK MAVİ" KURALINI BOZMUYOR

   Aile kuralı şu: çizimde --blue-600 taşıyan TEK nesne var ve o da tek
   hareketli parça. Stripe (#635BFF) ve PayPal (#002991) o kuralın dışında
   çünkü ÇİZİLMİŞ MÜREKKEP DEĞİLLER: ikisi de kendi beyaz plakasının üstünde
   duran gerçek dünya işaretleri (BrandMark · BrandBadge), tıpkı kıyas
   tablosundaki satırlar gibi. Plaka zorunlu — iki marka rengi de neredeyse
   siyah zeminde kayboluyor.

   İKİ TANE, ne bir ne üç: bir tane basmak sahnenin yapmadığı bir tercih ilan
   ederdi, üçüncüsü vitrin olurdu. Kayıt defteri (lib/brands.ts) bu dosyaya
   kapalı — buradan yeni marka eklenmiyor.

   ---------------------------------------------------------------------------
   AİLE — üç ülke çizimiyle ortak olan şey (kurallar sektor.css · 6. bölüm)

     1) KADEMELİ ÇİZGİ MERDİVENİ. Kalınlık bilgi taşıyor: iç bölmeler ve saplar
        ince, besleme yolları orta, ana hat en kalın nötr çizgi, mavi en
        parlak. Eşit kalınlıkta iki çizgi yok.
     2) OPACITY HİÇ KULLANILMIYOR. Kademe ayrı ayrı OPAK mürekkeplerle
        veriliyor (tek istisna ışık huzmesinin gradyanı, o bir yüzey değil
        ışık). Anlatan katman (simge · kelime) merdivenin en açık iki
        basamağında: okunması gereken şey hissedilecek şeyle aynı tonda olamaz.
     3) BÜTÜN KOORDİNATLAR IZGARADA. Tuval 640 × 400, birim 20; her sayı 20'nin
        (birkaçı 10'un) katı. Tek istisna dönüş yarıçapları ve onlar da her
        dönüşte aynı.
     4) TEK MAVİ (bkz. yukarıdaki marka şerhi). Kural eskiden "tek mavi, TEK
        HAREKET"ti; bu turda ikinci yarısı düştü — müşteri tek darbeyi "hem
        çok yavaş hem geçtiği yerde bi olay yok" diye reddetti. Yeni hâli
        TEK MAVİ, TEK ZİNCİR: mavi nesne birden fazla ama hepsi aynı akışın
        ardışık parçaları ve hepsi TEK periyotta (11s) kilitli, yani ekranda
        birbirinden bağımsız kıpırdayan hiçbir şey yok.
     5) BAĞLANMAYAN NOKTA YOK. Düğüm yalnızca iki şeyin gerçekten birleştiği
        yerde duruyor; saplar da boşlukta bitmiyor, kendi kelimesine iniyor.
     6) IŞIK KADRAJIN İÇİNDE BİTİYOR. Huzmenin sıfır alfaya indiği elips
        tuvalin dışına taşamaz; taşarsa SVG viewport'u onu sert bir doğruyla
        kesiyor ve ışık, hâle değil dikdörtgen leke olarak okunuyor. Bu tam
        olarak bu turda düzelen hataydı (bkz. Glow).

   İKİ SAHNE BİRBİRİNİN KARDEŞİ: ikisi de "bir taraf → hattın üstünde tek bir
   kutu → öbür taraf" kurgusunda, ikisi de aynı üç bantta, ikisinde de üç
   kelime aynı taban çizgisinde (y 386).

   ---------------------------------------------------------------------------
   TEKNİK — bu dosyada "use client" YOK ve olmayacak

   Hareketin tamamı CSS'te; bu bileşenden tarayıcıya tek satır JavaScript
   inmiyor. Yan faydası büyük: bu depoda useReducedMotion ile RENDER EDİLEN
   AĞACI değiştirmek dört ayrı kalıpta hidrasyon hatası çıkardı. Bir CSS medya
   sorgusu sunucu/istemci ayrımı yaratmıyor — hidrasyon riski sıfır.

   HAREKET BÜTÇESİ: yazılım sahnesi sayfaya 10 sürekli animasyon ekliyor ve
   ONU DA TEK BİR PERİYOTLA yapıyor — hepsi 11 saniye, aralarındaki fark
   yalnızca animation-delay. Tek periyot şart: farklı süreler verilseydi
   zincir her turda başka bir sırayla çalışır, "önce satış, sonra tahsilat,
   sonra şirket" iddiası dağılırdı. Onu da ancak hepsi aynı süredeyken faz
   kilidi tutuyor.

   NEDEN 11 SANİYE — hem HIZ hem ÇAKIŞMAMA. Sitedeki periyotlar
   60·42·34·29·26·23·20·19·17·15·13; asal çarpanlarının birleşimi
   {2,3,5,7,13,17,19,23,29}. 30 saniyenin altında bu kümeden hiçbir çarpan
   taşımayan tek sayı 11 — yani hem müşterinin istediği kadar hızlı, hem
   sayfadaki hiçbir hareketle ortak katı olmayan tek aday. Zincir 11
   saniyenin ilk ~4.6'sında çalışıyor, kalan ~6.4 saniye kanal sakin: nabız
   değil OLAY, tekrar ederken de olay kalıyor.

   prefers-reduced-motion: reduce altında animasyon hiç KURULMUYOR; onun
   yerine zincir tek karede donduruluyor (darbeler yolun ortasında, tahsilat
   kutusu yanık) — çizim o hâlde de akışı gösteriyor.

   SINIRLAR: SVG filtresi yok (blur/turbulence sürekli animasyonda pahalı),
   Math.random() yok. On animasyonun dokuzu yalnızca BOYA değiştiriyor
   (stroke-dashoffset · fill · stroke · color); düzen hesabı tetikleyen tek
   şey birleşme düğümünün yarıçapı ve o da 3.6 → 5.6 birimlik bir daire.

   ---------------------------------------------------------------------------
   İKİNCİ SEKTÖR EKLENDİĞİNDE

   Eşleme sektör ANAHTARINA bağlı, sıraya değil. sectors.ts'e ikinci bir sektör
   girildiğinde hiçbir şey yapılmasa da sayfa boş kutu göstermiyor: bilinmeyen
   sektör SceneThreeFrames'e düşüyor. Sektöre özgü bir şey söylemek isteyen
   SECTOR_SCENES kaydına bir satır ekler — çizim, erişilebilir etiketi ve
   altyazısı TEK bir nesnede duruyor, ayrı ayrı taşınmıyorlar.
   ========================================================================= */

/* ---------------------------------------------------------------- geometri
   İKİ ÇİZİM DE AYNI TUVALDE: 640 × 400, ızgara birimi 20. Kap büyüyünce
   çizimin TAMAMI aynı katsayıyla büyüyor — çizgi kalınlıkları, punto ve
   hareket mesafeleri dahil. Esneme imkânsız: preserveAspectRatio varsayılanı
   oranı koruyor.

   ÜÇ BANT, iki sahnede de aynı yerde. Kelimeler bantların ortasına oturuyor:

       BANT 1: x  40 → 200   orta 120   (kaynaklar / dosya)
       BANT 2: x 280 → 400   orta 340   (hattın üstündeki tek kutu)
       BANT 3: x 460 → 620   orta 540   (gövde / çerçeveler)

   Yazılım sahnesinde bant 1'in kutuları 40–160 arasında (orta 100), yedek
   sahnede tek gövde 40–200 arasında (orta 120); kelime her iki durumda da
   kendi nesnesinin ortasına oturuyor.

   Ortak hat y 200'de, yani tuvalin tam ortasında. Kelimelerin taban çizgisi
   y 386; saplar y 356'da bitiyor, yani her kelimenin üstünde 30 birimlik
   nefes var. */
const VB = "0 0 640 400";

/** Kelimelerin ortak taban çizgisi. Tek yerde duruyor: iki sahnede farklı
    olsaydı kardeşlik ilk bakışta bozulurdu. */
const WORD_Y = 386;

/* Zemin dokusu ve ışık huzmesi. Bu iki yardımcının ikizi SectorCountryArt'ta
   duruyor ama oradan alınmıyor: o dosya ülke bloklarının dekoru ve dışa
   yalnızca kendi bileşenini veriyor. İki dosyayı birbirine bağlamak yerine
   ölçüleri bu tuvale (640 × 400) göre yazılmış iki küçük kopya tutuluyor.

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
          <rect width="640" height="400" fill="url(#sxv-fade-g)" />
        </mask>
      </defs>
      <rect width="640" height="400" fill="url(#sxv-dots)" mask="url(#sxv-fade)" />
    </>
  );
}

/* Işık huzmesi. Çizimde TEK tane ve odağa konuyor: mürekkep merdiveni böylece
   keyfi durmuyor, bir ışık kaynağının sonucu gibi okunuyor. Dış durak tam
   saydam — panelin zemininde (--night-2) iz bırakmıyor.

   ---------------------------------------------------------------------------
   BU TURDA DÜZELEN HATA — "arkadaki mavi glow bozulmuş, yayılmıyor"

   Huzme bir DAİREYDİ: cx 540, cy 200, r 300. Tuval 640 × 400. Yani şeklin
   sınırları x 240…840 ve y −100…500 — sağdan 200, alttan ve üstten 100'er
   birim tuvalin DIŞINA taşıyordu. Kırpan şey bir ata ya da border-radius
   değil, <svg> elemanının KENDİ viewport'u: tarayıcı varsayılanı
   overflow:hidden ve kırpma dikdörtgeni tam olarak viewBox.

   Kırpmanın tek başına zararsız olduğu bir durum var: kesildiği yerde
   gradyan zaten sıfır alfadaysa. Burada değildi. Gradyan sıfıra ancak r=300'de
   iniyor, oysa sağ kenar merkezden yalnızca 100 birim uzakta:

       sağ kenar   (640, 200)  d=100  → t=0.333 → alfa 0.179
       üst kenar   (540,   0)  d=200  → t=0.667 → alfa 0.074
       sağ üst köşe(640,   0)  d=224  → t=0.745 → alfa 0.057

   0.179 alfadan sıfıra tek pikselde düşen dikey bir doğru: ekranda hâle değil
   KUTU. Müşterinin gördüğü "sert kenarlı dikdörtgen mavi leke" buydu.

   ÇÖZÜM KOZMETİK DEĞİL GEOMETRİK: şekil artık elips ve KADRAJIN İÇİNDE
   bitiyor. Gradyan objectBoundingBox biriminde (cx/cy/r = %50) tanımlı,
   dolayısıyla sıfır alfa çizgisi tam olarak elipsin kendi sınırı; elips
   tuvalin içinde kaldığı sürece kesilecek bir şey kalmıyor. Yarıçapları r
   yerine rx/ry almasının sebebi de bu: tek yarıçapla, merkez odağa (sağa)
   konduğunda kadrajın içine sığan en büyük daire çok küçük kalıyor.

   YENİ DEĞERİ DEĞİŞTİRECEK OLANA: cx±rx ⊆ [0,640] ve cy±ry ⊆ [0,400]
   olmak zorunda. Bu tutmuyorsa hata geri gelir. */
function Glow({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  return (
    <>
      <defs>
        <radialGradient id="sxv-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#2f6fc4" stopOpacity="0.30" />
          <stop offset="0.55" stopColor="#2f6fc4" stopOpacity="0.10" />
          <stop offset="1" stopColor="#2f6fc4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#sxv-glow)" />
    </>
  );
}

/** Simgenin ekrandaki kontur kalınlığı, TUVAL birimiyle. 2 birim seçildi:
    ana hattın (.sxv-edge) kalınlığı — simge yapı değil ama yapı kadar
    görünür olmalı, yoksa küçük ekranda kayboluyor. */
const MARK_STROKE = 2;

/** Bir lucide simgesini tuvale MERKEZİNDEN yerleştiriyor.
    Merkezden, çünkü her simge bir kutunun ortasına oturuyor ve sol üst köşeyi
    elle hesaplamak bir kutu taşındığında sessizce kayan bir sayı bırakıyor.

    strokeWidth simgenin KENDİ 24 birimlik kutusunda ölçülüyor; ölçek
    size/24 olduğu için kalınlık her boyda aynı MARK_STROKE'a düşsün diye geri
    çevriliyor. Sabit bir sayı yazılsaydı 48'lik simge ile 72'lik simge iki
    farklı kalınlıkta çıkardı ve çizgi merdiveni bozulurdu. */
function Mark({
  icon: Icon,
  cx,
  cy,
  size,
}: {
  icon: LucideIcon;
  cx: number;
  cy: number;
  size: number;
}) {
  return (
    <Icon
      className="sxv-ic"
      x={cx - size / 2}
      y={cy - size / 2}
      width={size}
      height={size}
      strokeWidth={Number(((MARK_STROKE * 24) / size).toFixed(3))}
    />
  );
}

/** İstasyonun adı, kendi bandının ortasında. Taban çizgisi ortak (WORD_Y),
    dolayısıyla üç kelime aynı satırda oturuyor ama her biri kendi sapının
    ucunda duruyor — şerit değil, tabela. */
function Word({ cx, children }: { cx: number; children: string }) {
  return (
    <text className="sxv-word" x={cx} y={WORD_Y} textAnchor="middle">
      {children}
    </text>
  );
}

/* ============================================================================
   1 · YAZILIM — "her kanaldan satış, tek kanaldan tahsilat"

   Kuşbakışı bir bağlantı planı, üç istasyon:

     BANT 1  satış. Üç kaynak kutusu, üçü aynı ölçü ve aynı yüzey — aralarında
             hiyerarşi YOK, çünkü hangisinden satıldığı tahsilat kanalını
             değiştirmiyor. Ayrımı yalnızca simge yapıyor: web/abonelik,
             uygulama mağazası, sözleşmeli kurumsal satış.
     BANT 2  tahsilat. Hattın üstündeki TEK KUTU ve sahnenin bütün iddiası
             burada: üç yol tek hatta iniyor, o hat bu kutuya giriyor. Kutunun
             içinde iki gerçek işaret var ve ortak hat tam ikisinin arasından
             geçiyor — para oradan akıyor, çevresinden değil.
     BANT 3  şirket. Kaynaklardan büyük, yüzeyi bir kademe açık, kenarı bir
             kademe kalın; ışık yukarıdan geldiği için kabartma gibi duruyor.

   HİYERARŞİ KALINLIKTAN OKUNUYOR: besleme yolları orta kalınlıkta
   (.sxv-line), ortak hat en kalın nötr çizgi (.sxv-edge), üstünden geçen ışık
   tek mavi. Yan yolların dönüşleri AYNI yarıçapla (16, kuadratik)
   yuvarlatılmış: tek bir keyfi köşe yok.

   ---------------------------------------------------------------------------
   ZİNCİR — bu turun asıl işi

   Müşteri: "şuan içinden mavi bişi geçiyor ama hem çok yavaş hem de geçtiği
   yerde bi olay yok, bi girdiği kutulara etki versin."

   Üç ayrı şikâyet, üç ayrı cevap:

     ÇOK YAVAŞ    → kanalı geçmek 11.5 saniye sürüyordu, artık 1.8 saniye.
                    Zincirin tamamı (satıştan şirkete) 4.6 saniye.
     OLAY YOK     → darbe artık yalnız değil: üç kaynak kutusu önce yanıyor,
                    üç darbe yola çıkıyor, birleşme düğümünde buluşuyor ve
                    düğüm o anda büyüyüp maviye dönüyor.
     KUTUYA ETKİ  → darbe bir kutunun İÇİNDEYKEN o kutu tepki veriyor: yüzeyi
                    kalkıyor, kenarı maviye dönüyor, içindeki simge
                    aydınlanıyor. Tepkinin zamanlaması geometriden
                    hesaplandı, göz kararı değil (aşağıdaki tablo).

   ZAMAN ÇİZELGESİ — hepsi 11 saniyelik tek periyodun içinde, tek fark gecikme:

       t=0.00  üç kaynak kutusu + simgeleri yanıyor
       t=0.35  üç darbe yola çıkıyor (her biri kendi yolunu 1.2s'de geçiyor —
               ortadaki kaynak hatta zaten bitişik, o yüzden yolu kısa ama
               süresi aynı: üçü BİRLİKTE varsın diye)
       t=1.25  darbeler (200,200) düğümünde birleşiyor · düğüm parlıyor ·
               kanal darbesi aynı anda oradan yola çıkıyor
       t=1.60  tahsilat kutusu tepkiye başlıyor
       t=1.68  darbe kutuya giriyor (x=280) ── ölçüldü, tahmin değil
       t=2.52  darbe kutudan çıkıyor (x=400)
       t=2.60  şirket tepkiye başlıyor
       t=2.64  darbe şirkete varıyor (x=460)
       t=4.58  her şey sönmüş; kanal 11. saniyeye kadar sakin

   Neden üç kaynak AYNI ANDA yanıyor: aralarında hiyerarşi yok. Sırayla
   yanmaları "önce web, sonra mağaza" gibi olmayan bir sıra iddia ederdi.
   Buna karşılık kutuların TEPKİSİ sırayla geliyor, çünkü o sıra gerçek: para
   önce tahsilat kanalına, sonra şirkete giriyor.

   ---------------------------------------------------------------------------
   YOLLAR. Nötr hat (CHANNEL) 160'tan başlıyor ve değişmedi. Mavi darbeler
   ayrı yollarda koşuyor: üç besleme + birleşmeden sonrası. RUN'ın 200'den
   başlamasının sebebi 160–200 arasını ORTADAKİ kaynağın kendi darbesinin
   (FEED_MID) doldurması — o parça iki kez boyanmıyor. */
const CHANNEL = "M160 200 H460";
const FEED_TOP = "M160 100 H184 Q200 100 200 116 V200";
const FEED_MID = "M160 200 H200";
const FEED_BOT = "M160 300 H184 Q200 300 200 284 V200";
const RUN = "M200 200 H460";

function SceneSoftwareChannel() {
  return (
    <svg
      viewBox={VB}
      className="sxv"
      role="img"
      aria-label="Üç ayrı satış kanalı tek bir tahsilat kutusuna iniyor; Stripe ve PayPal işaretlerini taşıyan o kutudan çıkan tek hat şirkete bağlanıyor."
      focusable="false"
    >
      <Ground />
      {/* Elipsin sınırları x 360…640, y 10…390 — tuvalin (640 × 400) içinde.
          Kesilecek bir şey yok, dolayısıyla sert kenar da yok. */}
      <Glow cx={500} cy={200} rx={140} ry={190} />

      {/* Üst ve alt kaynağın ortak hatta indiği iki yol. Ortadaki kaynak zaten
          hattın üstünde, ona ayrı yol çizilmiyor — çizilseydi üç yolun ikisi
          dirsekli biri düz olurdu ve düz olan öne çıkardı; üçü eşit. */}
      <path className="sxv-line" d={`${FEED_TOP} ${FEED_BOT}`} />

      {/* --- BANT 1: üç kaynak ---
          KUTU VE SİMGESİ ARTIK TEK <g>: darbe bir istasyona vurduğunda yüzey,
          kenar ve simge BİRLİKTE tepki versin diye. Üçü de kalıtılan özellik
          (fill · stroke · color), yani grubun üstünde animasyona sokulunca
          içerideki rect ve lucide simgesi kendiliğinden takip ediyor —
          eleman başına ayrı animasyon kurmaya gerek kalmıyor (5 animasyon,
          9 değil). Simgenin kendi fill="none"/stroke="currentColor"
          nitelikleri kalıtımı eziyor; o yüzden grubun fill'i simgeyi
          doldurmuyor, yalnızca color'ı ona geçiyor. */}
      <g className="sxv-node">
        <rect x="40" y="60" width="120" height="80" rx="12" />
        <Mark icon={Globe} cx={100} cy={100} size={48} />
      </g>
      <g className="sxv-node">
        <rect x="40" y="160" width="120" height="80" rx="12" />
        <Mark icon={Store} cx={100} cy={200} size={48} />
      </g>
      <g className="sxv-node">
        <rect x="40" y="260" width="120" height="80" rx="12" />
        <Mark icon={FileText} cx={100} cy={300} size={48} />
      </g>

      {/* --- BANT 2: hattın üstündeki tek kutu ---
          .sxv-node-lg DEĞİL .sxv-node: odak gövde, bu kutu değil. Ayrımı
          kalınlık değil ÖLÇEK yapıyor — kaynaklardan uzun, gövdeden dar.
          Kutu iki plakayı 30 birimlik payla sarıyor; daha geniş olduğunda
          plakalar boş bir alanda yüzüyordu.
          Marka plakaları grubun DIŞINDA: kutunun yüzeyi tepki verirken
          plakaların beyazı sabit kalmalı, yoksa logo rengi oynar. */}
      <g className="sxv-node sxv-t2">
        <rect x="280" y="110" width="120" height="180" rx="14" />
      </g>

      {/* --- BANT 3: gövde --- */}
      <g className="sxv-node sxv-node-lg sxv-t3">
        <rect x="460" y="120" width="160" height="160" rx="16" />
        {/* Gövdenin simgesi. Çizimdeki en büyük işaret, çünkü odak burası. */}
        <Mark icon={Building2} cx={540} cy={200} size={72} />
      </g>

      {/* Ortak hat — çizimin en kalın nötr çizgisi. Kutulardan SONRA basılıyor:
          tahsilat kutusunun içinden kesintisiz geçmesi gerekiyor, yoksa "her
          şey buradan geçiyor" iddiası kutunun içinde kayboluyor. Gövdenin sol
          kenarında (x 460) bitiyor, altına girmiyor. Simgelerin üstünden
          geçmiyor: kaynak simgeleri x 76–124'te, gövdeninki 504–576'da. */}
      <path className="sxv-edge" d={CHANNEL} />

      {/* Tahsilat kutusunun içindeki iki gerçek işaret. Ortak hat (y 200) tam
          ikisinin arasından geçiyor: üstteki plaka 130–190, alttaki 210–270,
          yani hatta 10 birim mesafe var ve mavi ışık aradan görünerek geçiyor.
          Plakalar hattın ÜSTÜNE basılmıyor — işaretin üstünden geçen bir çizgi
          logoyu kirletirdi. */}
      <BrandBadge brand="stripe" x={310} y={130} size={60} radius={14} />
      <BrandBadge brand="paypal" x={310} y={210} size={60} radius={14} />

      {/* Düğümler: üç kaynağın çıkışı, yolların hatta bindiği yer, kutunun
          girişi ve çıkışı, hattın gövdeye girdiği yer. Yedisi de gerçek
          birleşme — boşta duran nokta yok.

          BİRİ FARKLI: (200,200), üç yolun tek hatta indiği nokta. Sahnenin
          iddiası tam orada, o yüzden üç darbe oraya vardığında büyüyüp maviye
          dönüyor ve aynı anda tek darbe oradan yola çıkıyor.

          Sınıf <g>'ye DEĞİL doğrudan <circle>'a: fill kalıtılan bir özellik
          olduğu için gruptan iner ama r inmez (geometri özellikleri
          kalıtılmaz). Grupta denendi, rengi değişti ama büyümedi. */}
      <g className="sxv-pin">
        <circle cx="160" cy="100" r="3.6" />
        <circle cx="160" cy="200" r="3.6" />
        <circle cx="160" cy="300" r="3.6" />
        <circle className="sxv-merge" cx="200" cy="200" r="3.6" />
        <circle cx="280" cy="200" r="3.6" />
        <circle cx="400" cy="200" r="3.6" />
        <circle cx="460" cy="200" r="3.6" />
      </g>

      {/* Saplar: her kelimeyi kendi istasyonuna bağlıyor. Üçü de y 356'da
          bitiyor, yani kelimeler tabelaya asılmış gibi duruyor; sap olmasa üç
          kelime çizimin altına dizilmiş bir şerit gibi okunurdu ve tam olarak
          bir tur önce reddedilen şey oydu. */}
      <path className="sxv-stem" d="M100 340 V356 M340 290 V356 M540 280 V356" />

      {/* Kelimeler istasyon gruplarının DIŞINDA: etiket okunacak şey, tepki
          verecek şey değil. Kutuyla birlikte yanıp sönselerdi okunurluğu
          zamana bağlı olurdu. */}
      <Word cx={100}>satış</Word>
      <Word cx={340}>tahsilat</Word>
      <Word cx={540}>şirket</Word>

      {/* ---- zincirin mavi parçaları, en sonda ----
          pathLength="1000": kesik deseni yolun gerçek uzunluğundan bağımsız
          hâle geliyor. Dört yolun gerçek uzunluğu farklı (133 · 40 · 133 ·
          260 birim) ama normalize edildikleri için hepsinde aynı 150/1850
          deseni geçerli — ve üç besleme darbesi, yolları farklı uzunlukta
          olmasına rağmen AYNI SÜREDE varıyor. Ortadaki kaynak hatta bitişik
          diye erken varsaydı buluşma anı diye bir an kalmazdı.
          En sonda basılıyor: iki marka plakasının arasından geçerken de
          görünür kalması gerekiyor. */}
      <path className="sxv-lit sxv-feed" pathLength="1000" d={FEED_TOP} />
      <path className="sxv-lit sxv-feed" pathLength="1000" d={FEED_MID} />
      <path className="sxv-lit sxv-feed" pathLength="1000" d={FEED_BOT} />
      <path className="sxv-lit sxv-flow" pathLength="1000" d={RUN} />
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
   tek bir kutu, bant 3'te öbür taraf; üç kelime aynı taban çizgisinde, üç sap
   aynı yerde bitiyor.

   TEK FARK ÇERÇEVELERİN İÇİNDE: üçü aynı ölçüde ama sırasıyla iki, üç ve dört
   bölmeye ayrılmış. "Aynı dosya" ile "ayrı çerçeve" arasındaki fark yazıyla
   değil, bölme sayısıyla söyleniyor. Marka işareti YOK: bu sahne hangi
   sektörde çıkacağını bilmiyor, dolayısıyla hiçbir sağlayıcı adı veremez. */
const FILE_LINE = "M200 200 H440";

function SceneThreeFrames() {
  return (
    <svg
      viewBox={VB}
      className="sxv"
      role="img"
      aria-label="Tek bir kuruluş dosyası bir ayrım kutusundan geçip üç ayrı çerçeveye giriyor; çerçevelerin bölme sayısı farklı."
      focusable="false"
    >
      <Ground />
      {/* Kardeş sahnedeki hatanın ikizi buradaydı da: r=300'lük daire üstten
          ve alttan 100'er birim taşıyor, gradyan oralarda hâlâ 0.074 alfada
          olduğu için tuvalin üst ve alt kenarında iki yatay kesik çıkıyordu.
          Elipsin sınırları artık x 20…620, y 10…390 — tamamı kadrajın içinde. */}
      <Glow cx={320} cy={200} rx={300} ry={190} />

      {/* Ortak hat ve ışık, ikisi de KUTULARDAN ÖNCE. Kardeş sahnede ışık en
          üstte basılıyor çünkü orada kutunun içinde iki marka plakası var ve
          hat tam aralarından geçiyor. Burada kutunun ortasında bir simge var:
          hattın simgenin üstünden geçmesi konturu kirletirdi. O yüzden hat da
          ışık da kutunun ALTINDA — ışık kutuya giriyor, öbür ucundan çıkıyor.
          Aynı iddia, çakışmasız.

          IŞIK AYRIMDAN ÖNCE BİTİYOR: dallardan birinde koşsaydı "asıl olan bu
          çerçeve" derdi ve çizim üç çerçeve arasında tercih yapmıyor. */}
      <path className="sxv-edge" d={FILE_LINE} />
      <path className="sxv-lit sxv-run" pathLength="1000" d={FILE_LINE} />

      {/* --- BANT 1: dosya --- çizimin sol odağı */}
      <rect className="sxv-face-lg" x="40" y="120" width="160" height="160" rx="16" />

      {/* --- BANT 2: ayrımın kutusu --- kardeş sahnedeki tahsilat kutusuyla
          BİREBİR aynı dikdörtgen (x 280, y 110, 120 × 180). İki sahnenin aynı
          aileden olduğunu söyleyen şey bu; oradaki iki marka plakasının yerini
          burada tek bir ayrım simgesi alıyor, çünkü bu sahne hangi sektörde
          çıkacağını bilmiyor ve hiçbir sağlayıcı adı veremez. */}
      <rect className="sxv-face" x="280" y="110" width="120" height="180" rx="14" />

      {/* Ayrım: dikey omurga ve üç dal */}
      <path className="sxv-line" d="M440 100 V300 M440 100 H460 M440 300 H460" />

      <Mark icon={FileStack} cx={120} cy={200} size={72} />
      <Mark icon={Split} cx={340} cy={200} size={56} />

      {/* --- BANT 3: üç çerçeve --- aynı ölçü, farklı bölünme */}
      <rect className="sxv-face" x="460" y="70" width="160" height="60" rx="10" />
      <rect className="sxv-face" x="460" y="170" width="160" height="60" rx="10" />
      <rect className="sxv-face" x="460" y="270" width="160" height="60" rx="10" />
      <path
        className="sxv-thin"
        d="M500 70 V130 M500 170 V230 M540 170 V230 M500 270 V330 M540 270 V330 M580 270 V330"
      />

      <g className="sxv-pin">
        <circle cx="200" cy="200" r="3.6" />
        <circle cx="280" cy="200" r="3.6" />
        <circle cx="400" cy="200" r="3.6" />
        <circle cx="440" cy="100" r="3.6" />
        <circle cx="440" cy="200" r="3.6" />
        <circle cx="440" cy="300" r="3.6" />
      </g>

      <path className="sxv-stem" d="M120 280 V356 M340 290 V356 M540 330 V356" />

      <Word cx={120}>dosya</Word>
      <Word cx={340}>ayrım</Word>
      <Word cx={540}>çerçeve</Word>
    </svg>
  );
}

/* ============================================================================
   3 · KAYIT DEFTERİ — sahne sektör anahtarına bağlı, sıraya değil
   ========================================================================= */

/** Sahnenin tamamı tek bir fonksiyon. Yanında taşınan başka bir şey YOK —
    bir tur önce burada bir de altyazı vardı (Panel = { Scene, caption }) ve
    ikisi tek nesnede duruyordu ki biri güncellenip öteki unutulmasın. Altyazı
    kalkınca o eşleşme derdi de kalktı.

    Erişilebilir cümle sahnenin KENDİ içinde (role="img" + aria-label):
    çizimin ne gösterdiğini söylüyor ve çizimle birlikte değişiyor. Altyazı
    kalkarken ekran okuyucudan hiçbir şey eksilmedi çünkü o cümle zaten
    buradaydı. */
type SceneFn = () => ReactElement;

/* Kaydı olmayan sektörün düştüğü yer. Boş kutu yok. */
const FALLBACK_HERO: SceneFn = SceneThreeFrames;

const SECTOR_SCENES: Record<string, { hero: SceneFn }> = {
  "yazilim-ve-teknoloji": { hero: SceneSoftwareChannel },
};

/* ------------------------------------------------------------------- çıkış

   Bileşen olarak dışa veriliyor, fonksiyon olarak değil: aramayı bileşenin
   kendisi yapınca sayfa yalnızca bir anahtar geçiriyor ve kayıt defteri bu
   dosyanın içinde kalıyor. Sayfa da bu dosya da sunucu bileşeni — sınırı
   geçen hiçbir şey yok. */

/** Giriş bölümündeki büyük sahne. Bilinmeyen sektör yedeğe düşer.

    PANELDE ÇİZİMDEN BAŞKA HİÇBİR ŞEY YOK — ne üstünde ne altında. İki tur
    önce üstünde bir DOM çapa listesi vardı ("SVG'nin üstüne yazılmış yazı"
    diye reddedildi), bir tur önce altında bir altyazı vardı (bu turda
    kaldırıldı, gerekçesi dosya başlığında). Söylenecek her şey ya çizimin
    içinde ya da bölümün sol sütununda.

    <div>, <figure> değil: figcaption gidince <figure>'ın tek işi kalmıştı ve
    o da erişilebilirlik ağacına ikinci bir "şekil" düğümü eklemekti. Çizimin
    kendisi zaten role="img". */
export function SectorHeroScene({ slug }: { slug: string }) {
  const Scene = SECTOR_SCENES[slug]?.hero ?? FALLBACK_HERO;

  return (
    <div className="sxv-panel">
      <Scene />
    </div>
  );
}
