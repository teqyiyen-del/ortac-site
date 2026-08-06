import type { ReactElement } from "react";
import {
  AppWindow,
  Building2,
  FileStack,
  FileText,
  Split,
  Store,
  type LucideIcon,
} from "lucide-react";
import { BrandBadge } from "@/components/shared/BrandMark";

/* ============================================================================
   SEKTÖR SAYFASININ BÜYÜK SAHNESİ — /sektorler/[sektor] · 1. bölüm
   CSS: src/app/css/sektor.css · 6. bölüm (.sxv-)

   NEDEN VAR: bölümün solunda dört açılır eksen duruyor (tahsilat, ekip,
   faaliyet sınıfı, mülkiyet). Sağ sütun o metnin ŞEMASI değil — dört başlığı
   kutulara bölüp tekrar yazmak sayfayı iki kez okutuyordu. Sahne tek bir şey
   söylüyor ve kendi cümlesini KENDİ İÇİNDE kuruyor.

   ---------------------------------------------------------------------------
   BU TURDA NE DEĞİŞTİ — KELİMELER ÜÇÜNCÜ KEZ YER DEĞİŞTİRDİ VE BU SEFER
   BİR NESNENİN İÇİNE GİRDİLER

   Müşteri: "alt kısımlarında satış tahsilat şirket fln yazıyor ya o yüzden
   tüm kartın hizzalaması bi garip hissettirdi, kaldırsak da anlaşılmayabilir
   ama nasıl çözeriz bunu bi düşün."

   Teşhis ölçülebilirdi. Eski tuval 640 × 400 idi ve içindeki kütle şöyle
   dağılıyordu: üstte 60 birim boş, ortada kutular (y 60–340), altta saplar ve
   üç kelime (y 340–386), en altta 14 birim boş. Yani kompozisyonun üst
   boşluğu alt boşluğunun dört katıydı ve kelimeler kartın DİBİNE yapışmış tek
   bir yatay şerit oluşturuyordu. Göz o şeridi çizimin parçası olarak değil,
   kartın altına eklenmiş bir altyazı satırı olarak okuyordu — hizasızlık
   hissi buradan geliyordu.

   ÜÇÜNCÜ YER: kelime artık kendi istasyonunun İÇİNDE, panelin başlık
   bandında duruyor. Sıralama böylece tamamlandı:
     1) SVG'nin ÜSTÜNDE, DOM listesi   → "içi boş bırakılmış SVG + yazı" (ret)
     2) SVG'nin İÇİNDE, dipte ortak taban çizgisi + saplar → bu tur (ret)
     3) SVG'nin İÇİNDE, nesnenin kendi başlık bandında → BURASI

   Bunun getirdiği üç şey:
     · SAP KALKTI. Kelimeyi nesnesine bağlayan çizgiye gerek yok; kelime
       zaten nesnenin içinde.
     · ÜÇ PANEL AYNI YÜKSEKLİKTE (y 60–380). Üstlerinden ve altlarından eşit
       60'ar birim boşluk kalıyor. Kompozisyon simetrik; "garip hizalama"nın
       geometrik sebebi ortadan kalktı.
     · ÜÇ KELİME AYNI TABAN ÇİZGİSİNDE (y 100) AMA ARTIK ŞERİT DEĞİL: her biri
       kendi panelinin başlık bandının içinde, altlarında da o bandı
       kapatan bir saç teli çizgi var. Şerit ile başlık bandı arasındaki fark
       tam olarak bu çizgi ve onu çevreleyen kutu.

   KARTIN YÜKSEKLİĞİ ARTIK SOL SÜTUNA EŞİT (bkz. sektor.css · 1. bölüm):
   çizim iki sütunlu düzende mutlak konumlanıyor, yani satır yüksekliğine
   HİÇ katkı vermiyor; satırın yüksekliğini sol sütun belirliyor ve panel o
   yüksekliğe geriliyor. Tuval oranı (640 × 440 = 1.4545) o düzende ortaya
   çıkan kutuya göre seçildi, dolayısıyla çizim kutuyu neredeyse tam
   dolduruyor: 1215px ve üstünde kutu 527 × 350, çizim 509 × 350.

   ---------------------------------------------------------------------------
   "ANİMASYON HOŞ AMA DOĞRUDAN YAZILIMLA ALAKASI YOK, EKSİK OLUR MU?"

   Müşterinin sorusu haklıydı ve cevabı kısmen evet. Sahnenin KURGUSU
   yazılıma ait: ürün dijital olduğu için depo, sevkiyat ve yerel stok
   düğümü YOK; zincir doğrudan satıştan tahsilata, oradan şirkete gidiyor —
   bölümün giriş cümlesi de zaten bunu söylüyor. Ama İŞARETLER tarafında
   yazılıma ait olan tek şey Stripe ve PayPal plakalarıydı.

   TEK BİR İŞARET DEĞİŞTİ: üst satış kanalının simgesi dünya (Globe) yerine
   uygulama penceresi (AppWindow) oldu. Dünya "uluslararası" diyordu,
   "yazılım" demiyordu. Uygulama penceresi + uygulama mağazası (Store) +
   sözleşmeli satış (FileText) üçlüsü, ortasında Stripe ve PayPal ile
   birlikte, yazılım/SaaS resmini tek bakışta veriyor.

   YENİ İDDİA EKLENMEDİ: üç kanalın üçü de sayfanın kendi metninde geçiyor —
   kart/abonelik ve uygulama mağazası birinci eksenin ayrıntısında,
   sözleşmeyle yürüyen tahsilat da KKTC yönlendirmesinde.

   ---------------------------------------------------------------------------
   İÇERİDE ANLATAN ÖĞELER — hepsi bir işe yarıyor, hiçbiri süs değil:
     · 3 lucide simgesi — satışın üç ayrı kanalı (kendi uygulaması/web,
       uygulama mağazası, sözleşmeli kurumsal satış). Üç kanal aynı panelin
       içinde ama panelden ÜÇ AYRI HAT çıkıyor; ayrımı yapan şey simgeler.
     · 2 GERÇEK MARKA İŞARETİ (Stripe, PayPal) — soyut bir vektör "kart
       tahsilatı" demiyor, Stripe diyor. İkisi de uydurma değil: birinci
       eksenin ayrıntı paragrafı ikisini de adıyla anıyor.
     · 1 lucide simgesi — gövdedeki şirket.
     · 3 kelime (<text>) — istasyonların adı: satış · tahsilat · şirket.

   NE GERİ GELMEDİ VE NEDEN:
     · KUTU BAŞINA BAŞLIK + ALT SATIR (12 <text>). Kalabalığın ana kaynağıydı
       ve yarısı solundaki eksen metninin ikinci kez okunması demekti.
     · ÇAPALARIN İKİNCİ SATIRI ("her kanaldan", "tek kanaldan", "tek ülkede").
       Çizim işini yapıyorsa bunlar zaten görünüyor.
     · OK UÇLARI. Yön hattın kendisinden ve ışığın gidiş yönünden okunuyor.
     · SAPLAR VE ORTAK ALT TABAN ÇİZGİSİ. Bu turda kalktı; gerekçesi yukarıda.

   ---------------------------------------------------------------------------
   KELİMELER NEDEN SVG'NİN İÇİNDE <text> OLARAK DURUYOR — VE OKUNUYOR

   viewBox içindeki yazı kabın genişliğiyle ÖLÇEKLENİYOR. Çözüm metni dışarı
   atmak değil, ÖLÇEĞİ SINIRLAMAK — iki taraftan birden:

     · KAP DAR TUTULDU: tek sütun düzeninde panel 560px'te durduruluyor
       (sektor.css · .sx-art max-width).
     · PUNTO KABA GÖRE SEÇİLİYOR: üç basamak — kap büyüdükçe viewBox puntosu
       KÜÇÜLÜYOR ki ekrandaki punto sabit kalsın (.sxv-word · @container).

   Yeni bir üst sınır daha var ve o geometrik: kelime artık 160 birimlik bir
   panelin İÇİNDE. En uzun kelime "tahsilat" ve 30 birimlik puntoda ~102
   birim yer kaplıyor, yani panele iki yandan 29'ar birim payla oturuyor.
   Punto merdiveninin tepesi bu yüzden 32 değil 30.

   EKRAN OKUYUCU: çizim aria-hidden DEĞİL, role="img" + aria-label.

   ---------------------------------------------------------------------------
   MARKA İŞARETİ NEDEN "TEK MAVİ" KURALINI BOZMUYOR

   Aile kuralı şu: çizimde --blue-600 taşıyan nesneler tek bir zincirin
   parçaları. Stripe (#635BFF) ve PayPal (#002991) o kuralın dışında çünkü
   ÇİZİLMİŞ MÜREKKEP DEĞİLLER: ikisi de kendi beyaz plakasının üstünde duran
   gerçek dünya işaretleri (BrandMark · BrandBadge), tıpkı kıyas tablosundaki
   satırlar gibi. Plaka zorunlu — iki marka rengi de neredeyse siyah zeminde
   kayboluyor.

   İKİ TANE, ne bir ne üç: bir tane basmak sahnenin yapmadığı bir tercih ilan
   ederdi, üçüncüsü vitrin olurdu. Kayıt defteri (lib/brands.ts) bu dosyaya
   kapalı — buradan yeni marka eklenmiyor.

   ---------------------------------------------------------------------------
   AİLE — üç ülke çizimiyle ortak olan şey (kurallar sektor.css · 6. bölüm)

     1) KADEMELİ ÇİZGİ MERDİVENİ. Kalınlık bilgi taşıyor: iç bölmeler ince,
        besleme yolları orta, ana hat en kalın nötr çizgi, mavi en parlak.
     2) OPACITY HİÇ KULLANILMIYOR. Kademe ayrı ayrı OPAK mürekkeplerle
        veriliyor (tek istisna ışık huzmesinin gradyanı, o bir yüzey değil
        ışık). Anlatan katman (simge · kelime) merdivenin en açık iki
        basamağında.
     3) BÜTÜN KOORDİNATLAR IZGARADA. Tuval 640 × 440, birim 20; her sayı
        20'nin katı. Tek istisna dönüş yarıçapları ve onlar da her dönüşte
        aynı.
     4) TEK MAVİ, TEK ZİNCİR: mavi nesne birden fazla ama hepsi aynı akışın
        ardışık parçaları ve hepsi TEK periyotta (5.3s) kilitli.
     5) BAĞLANMAYAN NOKTA YOK. Düğüm yalnızca iki şeyin gerçekten birleştiği
        yerde duruyor.
     6) IŞIK KADRAJIN İÇİNDE BİTİYOR. Huzmenin sıfır alfaya indiği elips
        tuvalin dışına taşamaz; taşarsa SVG viewport'u onu sert bir doğruyla
        kesiyor ve ışık, hâle değil dikdörtgen leke olarak okunuyor.

   İKİ SAHNE BİRBİRİNİN KARDEŞİ: ikisi de "bir taraf → hattın üstünde tek bir
   panel → öbür taraf" kurgusunda, ikisinde de üç panel aynı yükseklikte
   (y 60–380) ve üç kelime aynı başlık bandında (taban çizgisi y 100).

   ---------------------------------------------------------------------------
   TEKNİK — bu dosyada "use client" YOK ve olmayacak

   Hareketin tamamı CSS'te; bu bileşenden tarayıcıya tek satır JavaScript
   inmiyor. Yan faydası büyük: bu depoda useReducedMotion ile RENDER EDİLEN
   AĞACI değiştirmek beş ayrı kalıpta hidrasyon hatası çıkardı. Bir CSS medya
   sorgusu sunucu/istemci ayrımı yaratmıyor — hidrasyon riski sıfır.

   HAREKET BÜTÇESİ: yazılım sahnesi sayfaya 8 sürekli animasyon ekliyor
   (3 panel tepkisi · 1 birleşme düğümü · 3 besleme darbesi · 1 kanal darbesi)
   ve hepsini TEK BİR PERİYOTLA yapıyor — 5.3 saniye, aralarındaki fark
   yalnızca animation-delay. Ölçüldü: document.getAnimations() bu sahneden
   8 animasyon döndürüyor. Tek periyot şart: farklı süreler verilseydi zincir
   her turda başka bir sırayla çalışır, "önce satış, sonra tahsilat, sonra
   şirket" iddiası dağılırdı.

   Sayı bir tur önce 10'du; üç ayrı kaynak kutusu tek bir "satış" panelinde
   birleşince iki tepki animasyonu düştü. Hareketin görünürlüğü azalmadı:
   yanan yüzey artık üç küçük kutu değil, 160 × 320 birimlik bir panel.

   prefers-reduced-motion: reduce altında animasyon hiç KURULMUYOR; onun
   yerine zincir tek karede donduruluyor (darbeler yolun ortasında, tahsilat
   paneli yanık) — çizim o hâlde de akışı gösteriyor.

   SINIRLAR: SVG filtresi yok (blur/turbulence sürekli animasyonda pahalı),
   Math.random() yok. Sekiz animasyonun yedisi yalnızca BOYA değiştiriyor
   (stroke-dashoffset · fill · stroke · color); düzen hesabı tetikleyen tek
   şey birleşme düğümünün yarıçapı ve o da 3.6 → 5.6 birimlik bir daire.

   ---------------------------------------------------------------------------
   İKİNCİ SEKTÖR EKLENDİĞİNDE

   Eşleme sektör ANAHTARINA bağlı, sıraya değil. Bilinmeyen sektör
   SceneThreeFrames'e düşüyor; o sahne de aynı grameri (üç panel, üç başlık
   bandı) kullanıyor, yani ailenin dışına düşmüyor.
   ========================================================================= */

/* ---------------------------------------------------------------- geometri
   İKİ ÇİZİM DE AYNI TUVALDE: 640 × 440, ızgara birimi 20.

   NEDEN 440 VE NEDEN 400 DEĞİL — oran, kartın kendisinden geldi. İki sütunlu
   düzende panelin iç kutusu 527 × 350 piksel (ölçüldü, 1215px ve üstü) ve
   o kutunun oranı 1.506. 640 × 440 = 1.4545, yani çizim kutuyu yüksekliğinden
   dolduruyor, iki yanında toplam 18px pay kalıyor. Eski 640 × 400 (1.6)
   oranıyla aynı kutuda 21px'lik bir DİKEY boşluk kalıyordu ve kart sol sütuna
   eşitlendiğinde o boşluk büyüyordu.

   ÜÇ PANEL, ikisi de aynı yerde ve aynı ölçüde:

       P1  x  20 → 180   orta 100   (satış / dosya)
       P2  x 240 → 400   orta 320   (tahsilat / ayrım)
       P3  x 460 → 620   orta 540   (şirket / çerçeveler)

   Üçü de y 60 → 380. Aralarındaki boşluk 60, kadraj payı 20 — toplam
   20+160+60+160+60+160+20 = 640, yani yerleşim tam oturuyor.

   BAŞLIK BANDI her panelde y 60 → 120; kelimenin taban çizgisi y 100, bandı
   kapatan saç teli çizgi y 120. Geriye kalan y 120 → 380 içerik alanı ve
   ortası y 250 — ortak hat tam orada. */
const VB = "0 0 640 440";

/** Panellerin ortak dikey ölçüsü. Tek yerde duruyor: iki sahnede farklı
    olsaydı kardeşlik ilk bakışta bozulurdu. */
const P_TOP = 60;
const P_H = 320;
/** Başlık bandını içerik alanından ayıran çizginin yüksekliği. */
const HEAD_Y = 120;
/** Kelimelerin ortak taban çizgisi — başlık bandının içinde. */
const WORD_Y = 100;
/** İçerik alanının ortası; ortak hat da orada. */
const MID = 250;

/* Zemin dokusu ve ışık huzmesi. Bu iki yardımcının ikizi SectorCountryArt'ta
   duruyor ama oradan alınmıyor: o dosya ülke bloklarının dekoru ve dışa
   yalnızca kendi bileşenini veriyor. İki dosyayı birbirine bağlamak yerine
   ölçüleri bu tuvale (640 × 440) göre yazılmış iki küçük kopya tutuluyor.

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
          <rect width="640" height="440" fill="url(#sxv-fade-g)" />
        </mask>
      </defs>
      <rect width="640" height="440" fill="url(#sxv-dots)" mask="url(#sxv-fade)" />
    </>
  );
}

/* Işık huzmesi. Çizimde TEK tane ve odağa konuyor: mürekkep merdiveni böylece
   keyfi durmuyor, bir ışık kaynağının sonucu gibi okunuyor. Dış durak tam
   saydam — panelin zemininde (--night-2) iz bırakmıyor.

   ŞEKİL KADRAJIN İÇİNDE BİTMEK ZORUNDA. Bir tur önceki hata buydu: huzme bir
   daireydi ve sınırları tuvalin dışına taşıyordu; kırpan şey <svg>'nin kendi
   viewport'u (varsayılan overflow:hidden, kırpma dikdörtgeni tam olarak
   viewBox). Gradyan kesildiği yerde hâlâ 0.18 alfadaydı, yani ekranda hâle
   değil KUTU çıkıyordu.

   Gradyan objectBoundingBox biriminde (cx/cy/r = %50), dolayısıyla sıfır alfa
   çizgisi tam olarak elipsin kendi sınırı; elips tuvalin içinde kaldığı
   sürece kesilecek bir şey kalmıyor.

   YENİ DEĞERİ DEĞİŞTİRECEK OLANA: cx±rx ⊆ [0,640] ve cy±ry ⊆ [0,440]
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
    Merkezden, çünkü her simge bir panelin ortasına oturuyor ve sol üst köşeyi
    elle hesaplamak bir panel taşındığında sessizce kayan bir sayı bırakıyor.

    strokeWidth simgenin KENDİ 24 birimlik kutusunda ölçülüyor; ölçek
    size/24 olduğu için kalınlık her boyda aynı MARK_STROKE'a düşsün diye geri
    çevriliyor. Sabit bir sayı yazılsaydı 44'lük simge ile 84'lük simge iki
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

/** İstasyonun BAŞLIK BANDI: kelime + bandı kapatan saç teli çizgi.
    İkisi tek bir yardımcıda çünkü ayrılırlarsa biri taşınıp öteki yerinde
    kalabilir; band bir bütün.

    Çizgi panelin iki kenarına kadar gidiyor (x → x+w): bandı GERÇEKTEN
    kapatması gerekiyor, içeriden başlayan bir çizgi bandı kapatmaz, altını
    çizer — ikisi farklı şeyler ve ikincisi bir başlık değil, bir vurgu
    olurdu. */
function Head({ x, w, children }: { x: number; w: number; children: string }) {
  return (
    <>
      <text className="sxv-word" x={x + w / 2} y={WORD_Y} textAnchor="middle">
        {children}
      </text>
      <path className="sxv-thin" d={`M${x} ${HEAD_Y} H${x + w}`} />
    </>
  );
}

/* ============================================================================
   1 · YAZILIM — "her kanaldan satış, tek kanaldan tahsilat"

   Kuşbakışı bir bağlantı planı, üç istasyon ve üçü de aynı ölçüde panel:

     P1  satış. Üç kanal simgesi alt alta ve panelden ÜÇ AYRI HAT çıkıyor.
         Aralarında hiyerarşi YOK, çünkü hangisinden satıldığı tahsilat
         kanalını değiştirmiyor. Ayrımı yalnızca simge yapıyor: kendi
         uygulaması/web, uygulama mağazası, sözleşmeli kurumsal satış.
     P2  tahsilat. Hattın üstündeki panel ve sahnenin bütün iddiası burada:
         üç yol tek hatta iniyor, o hat bu panele giriyor. Panelin içinde iki
         gerçek işaret var ve ortak hat tam ikisinin arasından geçiyor — para
         oradan akıyor, çevresinden değil.
     P3  şirket. Yüzeyi bir kademe açık, kenarı bir kademe kalın; ışık
         yukarıdan geldiği için kabartma gibi duruyor. Huzme de burada.

   HİYERARŞİ KALINLIKTAN OKUNUYOR: besleme yolları orta kalınlıkta
   (.sxv-line), ortak hat en kalın nötr çizgi (.sxv-edge), üstünden geçen ışık
   tek mavi. Yan yolların dönüşleri AYNI yarıçapla (16, kuadratik)
   yuvarlatılmış: tek bir keyfi köşe yok.

   ---------------------------------------------------------------------------
   ZİNCİR — hareketin kendisi değişmedi, yalnızca yeni geometriye oturdu

     ÇOK YAVAŞ    → kanalı geçmek 1.8 saniye sürüyor, zincirin tamamı 4.6.
     OLAY YOK     → darbe yalnız değil: satış paneli önce yanıyor, üç darbe
                    yola çıkıyor, birleşme düğümünde buluşuyor ve düğüm o anda
                    büyüyüp maviye dönüyor.
     KUTUYA ETKİ  → darbe bir panelin İÇİNDEYKEN o panel tepki veriyor: yüzeyi
                    kalkıyor, kenarı maviye dönüyor, içindeki simge
                    aydınlanıyor.

   ZAMAN ÇİZELGESİ — hepsi 5.3 saniyelik tek periyodun içinde, tek fark
   gecikme. Sayılar yeni geometriden yeniden hesaplandı, göz kararı değil:

       t=0.00  satış paneli + üç simgesi yanıyor
       t=0.35  üç darbe yola çıkıyor (pathLength normalizasyonu sayesinde üçü
               de aynı sürede varıyor; yolların gerçek uzunluğu 103 · 40 · 103)
       t=1.27  darbeler (220,250) düğümünde birleşiyor · düğüm parlıyor ·
               kanal darbesi 1.25'te oradan yola çıkmış oluyor
       t=1.30  tahsilat paneli tepkiye başlıyor
       t=1.37  darbe panele giriyor (x=240) ── yoldan hesaplandı
       t=2.29  darbe panelden çıkıyor (x=400)
       t=2.60  şirket tepkiye başlıyor
       t=2.63  darbe şirkete varıyor (x=460)
       t=4.58  her şey sönmüş; kanal 5.3'e kadar sakin (0.72s sessizlik)

   ---------------------------------------------------------------------------
   YOLLAR. Nötr hat (CHANNEL) satış panelinin sağ kenarından (180) şirket
   panelinin sol kenarına (460) gidiyor. Mavi darbeler ayrı yollarda koşuyor:
   üç besleme + birleşmeden sonrası. RUN'ın 220'den başlamasının sebebi
   180–220 arasını ORTADAKİ kanalın kendi darbesinin (FEED_MID) doldurması —
   o parça iki kez boyanmıyor. */
const CHANNEL = "M180 250 H460";
const FEED_TOP = "M180 180 H204 Q220 180 220 196 V250";
const FEED_MID = "M180 250 H220";
const FEED_BOT = "M180 320 H204 Q220 320 220 304 V250";
const RUN = "M220 250 H460";

function SceneSoftwareChannel() {
  return (
    <svg
      viewBox={VB}
      className="sxv"
      role="img"
      aria-label="Satış panelinden çıkan üç kanal tek bir tahsilat paneline iniyor; Stripe ve PayPal işaretlerini taşıyan o panelden çıkan tek hat şirkete bağlanıyor."
      focusable="false"
    >
      <Ground />
      {/* Elipsin sınırları x 320…640, y 60…440 — tuvalin (640 × 440) içinde.
          Kesilecek bir şey yok, dolayısıyla sert kenar da yok. */}
      <Glow cx={480} cy={250} rx={160} ry={190} />

      {/* Üst ve alt kanalın ortak hatta indiği iki yol. Ortadaki kanal zaten
          hattın hizasında, ona dirsek çizilmiyor — çizilseydi üç yolun ikisi
          dirsekli biri düz olurdu ve düz olan öne çıkardı; üçü eşit. */}
      <path className="sxv-line" d={`${FEED_TOP} ${FEED_BOT}`} />

      {/* --- P1: satış ---
          PANEL VE İÇİNDEKİ SİMGELER TEK <g>: darbe istasyona vurduğunda
          yüzey, kenar ve simgeler BİRLİKTE tepki versin diye. Üçü de
          kalıtılan özellik (fill · stroke · color), yani grubun üstünde
          animasyona sokulunca içerideki rect ve lucide simgeleri
          kendiliğinden takip ediyor — panel başına ayrı animasyon kurmaya
          gerek kalmıyor. Simgenin kendi fill="none"/stroke="currentColor"
          nitelikleri kalıtımı eziyor; o yüzden grubun fill'i simgeyi
          doldurmuyor, yalnızca color'ı ona geçiyor.

          BAŞLIK BANDI (kelime + bandı kapatan çizgi) GRUBUN DIŞINDA ve en
          sonda basılıyor — etiket okunacak şey, tepki verecek şey değil.
          Panelle birlikte yanıp sönseydi okunurluğu zamana bağlı olurdu. */}
      <g className="sxv-node">
        <rect x="20" y={P_TOP} width="160" height={P_H} rx="16" />
        <Mark icon={AppWindow} cx={100} cy={180} size={44} />
        <Mark icon={Store} cx={100} cy={250} size={44} />
        <Mark icon={FileText} cx={100} cy={320} size={44} />
      </g>

      {/* --- P2: hattın üstündeki panel ---
          .sxv-node-lg DEĞİL .sxv-node: odak gövde, bu panel değil. Ayrımı
          kalınlık ve yüzey yapıyor, ölçü değil — üç panel aynı ölçüde.
          Marka plakaları grubun DIŞINDA: panelin yüzeyi tepki verirken
          plakaların beyazı sabit kalmalı, yoksa logo rengi oynar. */}
      <g className="sxv-node sxv-t2">
        <rect x="240" y={P_TOP} width="160" height={P_H} rx="16" />
      </g>

      {/* --- P3: gövde --- */}
      <g className="sxv-node sxv-node-lg sxv-t3">
        <rect x="460" y={P_TOP} width="160" height={P_H} rx="16" />
        {/* Gövdenin simgesi. Çizimdeki en büyük işaret, çünkü odak burası. */}
        <Mark icon={Building2} cx={540} cy={MID} size={84} />
      </g>

      {/* Ortak hat — çizimin en kalın nötr çizgisi. Panellerden SONRA
          basılıyor: tahsilat panelinin içinden kesintisiz geçmesi gerekiyor,
          yoksa "her şey buradan geçiyor" iddiası panelin içinde kayboluyor.
          Gövdenin sol kenarında (x 460) bitiyor, altına girmiyor. Simgelerin
          üstünden geçmiyor: satış simgeleri x 78–122'de, gövdeninki
          498–582'de ve hat x 180'den başlıyor. */}
      <path className="sxv-edge" d={CHANNEL} />

      {/* Tahsilat panelindeki iki gerçek işaret. Ortak hat (y 250) tam
          ikisinin arasından geçiyor: üstteki plaka 160–240, alttaki 260–340,
          yani hatta 10 birim mesafe var ve mavi ışık aradan görünerek geçiyor.
          Plakalar hattın ÜSTÜNE basılmıyor — işaretin üstünden geçen bir çizgi
          logoyu kirletirdi. */}
      <BrandBadge brand="stripe" x={280} y={160} size={80} radius={16} />
      <BrandBadge brand="paypal" x={280} y={260} size={80} radius={16} />

      {/* Düğümler: üç kanalın çıkışı, yolların hatta bindiği yer, tahsilat
          panelinin girişi ve çıkışı, hattın gövdeye girdiği yer. Yedisi de
          gerçek birleşme — boşta duran nokta yok.

          BİRİ FARKLI: (220,250), üç yolun tek hatta indiği nokta. Sahnenin
          iddiası tam orada, o yüzden üç darbe oraya vardığında büyüyüp maviye
          dönüyor ve aynı anda tek darbe oradan yola çıkıyor.

          Sınıf <g>'ye DEĞİL doğrudan <circle>'a: fill kalıtılan bir özellik
          olduğu için gruptan iner ama r inmez (geometri özellikleri
          kalıtılmaz). Grupta denendi, rengi değişti ama büyümedi. */}
      <g className="sxv-pin">
        <circle cx="180" cy="180" r="3.6" />
        <circle cx="180" cy="250" r="3.6" />
        <circle cx="180" cy="320" r="3.6" />
        <circle className="sxv-merge" cx="220" cy="250" r="3.6" />
        <circle cx="240" cy="250" r="3.6" />
        <circle cx="400" cy="250" r="3.6" />
        <circle cx="460" cy="250" r="3.6" />
      </g>

      {/* Başlık bantları en sonda ve panellerin DIŞINDA: üstlerinden hiçbir
          şey geçmiyor, hiçbir animasyon onlara dokunmuyor. */}
      <Head x={20} w={160}>
        satış
      </Head>
      <Head x={240} w={160}>
        tahsilat
      </Head>
      <Head x={460} w={160}>
        şirket
      </Head>

      {/* ---- zincirin mavi parçaları, en sonda ----
          pathLength="1000": kesik deseni yolun gerçek uzunluğundan bağımsız
          hâle geliyor. Dört yolun gerçek uzunluğu farklı (103 · 40 · 103 ·
          240 birim) ama normalize edildikleri için hepsinde aynı 150/1850
          deseni geçerli — ve üç besleme darbesi, yolları farklı uzunlukta
          olmasına rağmen AYNI SÜREDE varıyor. Ortadaki kanal hatta bitişik
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

   KARDEŞ SAHNEYLE AYNI GRAMER: üç panel aynı ölçüde ve aynı yerde, üç kelime
   kendi panelinin başlık bandında, ortak hat y 250'de.

   TEK FARK ÜÇÜNCÜ PANELİN İÇİNDE: üç çerçeve aynı ölçüde ama sırasıyla iki,
   üç ve dört bölmeye ayrılmış. "Aynı dosya" ile "ayrı çerçeve" arasındaki
   fark yazıyla değil, bölme sayısıyla söyleniyor. Marka işareti YOK: bu sahne
   hangi sektörde çıkacağını bilmiyor, dolayısıyla hiçbir sağlayıcı adı
   veremez. */
const FILE_LINE = "M180 250 H430";

function SceneThreeFrames() {
  return (
    <svg
      viewBox={VB}
      className="sxv"
      role="img"
      aria-label="Tek bir kuruluş dosyası bir ayrım panelinden geçip üç ayrı çerçeveye giriyor; çerçevelerin bölme sayısı farklı."
      focusable="false"
    >
      <Ground />
      {/* Elipsin sınırları x 20…620, y 60…440 — tamamı kadrajın içinde. */}
      <Glow cx={320} cy={250} rx={300} ry={190} />

      {/* Ortak hat ve ışık, ikisi de PANELLERDEN ÖNCE. Kardeş sahnede ışık en
          üstte basılıyor çünkü orada panelin içinde iki marka plakası var ve
          hat tam aralarından geçiyor. Burada panelin ortasında bir simge var:
          hattın simgenin üstünden geçmesi konturu kirletirdi. O yüzden hat da
          ışık da panelin ALTINDA — ışık panele giriyor, öbür ucundan çıkıyor.

          IŞIK AYRIMDAN ÖNCE BİTİYOR: dallardan birinde koşsaydı "asıl olan bu
          çerçeve" derdi ve çizim üç çerçeve arasında tercih yapmıyor. */}
      <path className="sxv-edge" d={FILE_LINE} />
      <path className="sxv-lit sxv-run" pathLength="1000" d={FILE_LINE} />

      {/* --- P1: dosya --- çizimin sol odağı */}
      <g>
        <rect className="sxv-face-lg" x="20" y={P_TOP} width="160" height={P_H} rx="16" />
        <Head x={20} w={160}>
          dosya
        </Head>
        <Mark icon={FileStack} cx={100} cy={MID} size={84} />
      </g>

      {/* --- P2: ayrımın paneli --- kardeş sahnedeki tahsilat paneliyle
          BİREBİR aynı dikdörtgen. İki sahnenin aynı aileden olduğunu söyleyen
          şey bu; oradaki iki marka plakasının yerini burada tek bir ayrım
          simgesi alıyor. */}
      <g>
        <rect className="sxv-face" x="240" y={P_TOP} width="160" height={P_H} rx="16" />
        <Head x={240} w={160}>
          ayrım
        </Head>
        <Mark icon={Split} cx={320} cy={MID} size={60} />
      </g>

      {/* Ayrım: dikey omurga ve üç dal. Omurga x 430'da, yani hattın bittiği
          yerde; dallar üç çerçevenin ortasına (y 175 · 250 · 325) iniyor. */}
      <path
        className="sxv-line"
        d="M430 175 V325 M430 175 H460 M430 250 H460 M430 325 H460"
      />

      {/* --- P3: üç çerçeve --- aynı ölçü, farklı bölünme */}
      <g>
        <rect className="sxv-face" x="460" y={P_TOP} width="160" height={P_H} rx="16" />
        <Head x={460} w={160}>
          çerçeve
        </Head>
        <rect className="sxv-face" x="480" y="150" width="120" height="50" rx="8" />
        <rect className="sxv-face" x="480" y="225" width="120" height="50" rx="8" />
        <rect className="sxv-face" x="480" y="300" width="120" height="50" rx="8" />
        <path
          className="sxv-thin"
          d="M540 150 V200 M520 225 V275 M560 225 V275 M510 300 V350 M540 300 V350 M570 300 V350"
        />
      </g>

      <g className="sxv-pin">
        <circle cx="180" cy="250" r="3.6" />
        <circle cx="240" cy="250" r="3.6" />
        <circle cx="400" cy="250" r="3.6" />
        <circle cx="430" cy="175" r="3.6" />
        <circle cx="430" cy="250" r="3.6" />
        <circle cx="430" cy="325" r="3.6" />
      </g>
    </svg>
  );
}

/* ============================================================================
   3 · KAYIT DEFTERİ — sahne sektör anahtarına bağlı, sıraya değil
   ========================================================================= */

/** Sahnenin tamamı tek bir fonksiyon. Yanında taşınan başka bir şey YOK.
    Erişilebilir cümle sahnenin KENDİ içinde (role="img" + aria-label):
    çizimin ne gösterdiğini söylüyor ve çizimle birlikte değişiyor. */
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
    diye reddedildi), bir tur önce altında bir altyazı vardı (kaldırıldı).
    Bu turda çizimin İÇİNDEKİ üç kelime de dipten kalkıp kendi panellerinin
    başlık bandına girdi. Söylenecek her şey ya çizimin içinde ya da bölümün
    sol sütununda.

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
