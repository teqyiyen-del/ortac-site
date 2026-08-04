import type { ReactElement } from "react";

/* ============================================================================
   SEKTÖR SAYFASININ BÜYÜK SAHNESİ — /sektorler/[sektor] · 1. bölüm

   NEDEN VAR: bölümün solunda dört açılır eksen duruyor (tahsilat, ekip,
   faaliyet sınıfı, mülkiyet). Sağ sütun o metnin ŞEMASI değil — dört başlığı
   kutulara bölüp tekrar yazmak sayfayı iki kez okutuyordu. Sahne tek bir şey
   söylüyor ve söylediği şey altındaki tek cümlede (figcaption) yazılı.

   ---------------------------------------------------------------------------
   BU TURDA NE OLDU — SAHNE SADELEŞTİRİLDİ

   Önceki hâli üç sütunlu bir akış tablosuydu: 19 <text>, üç marka rozeti, üç
   lucide ikonu, sekiz kutu, iki ok ucu, akan kesik ray ve rayda dolaşan iki
   darbe — SVG içinde 69 düğüm. Aynı sayfanın üç ülke çizimi
   (SectorCountryArt.tsx) ise yazısız, tek hareketli ve okunaklıydı; ikisi yan
   yana aynı aileden görünmüyordu. Sahne o ailenin diline getirildi ve 69 düğüm
   32'ye indi:

     · <text> KALDIRILDI. Etiketler sahnenin işini değil, solundaki metnin
       işini yapıyordu. Cümle figcaption'da duruyor, ayrıntısı ekseni açan
       paragrafta; çizim artık bir iddia taşımıyor ve aria-hidden basılıyor.
     · MARKA İŞARETLERİ KALDIRILDI. "Stripe ve PayPal" birinci eksenin
       ayrıntı paragrafında zaten adıyla geçiyor; çizimde durması hem bilgiyi
       ikinci kez söylemek hem de dekoru bir vitrine çevirmekti.
     · ÜÇ SÜTUN TEK BİR HATTA İNDİ. Kalan iddia bir tane: satış birden çok
       yerden gelir, tahsilat TEK kanaldan geçer ve o kanal şirketin
       gövdesine bağlanır.
     · HAREKET DÖRTTEN BİRE İNDİ (aşağıda).

   ---------------------------------------------------------------------------
   AİLE — üç ülke çizimiyle ortak olan şey (kurallar sektor.css · 6. bölüm)

     1) BEŞ KADEMELİ ÇİZGİ MERDİVENİ. Kalınlık bilgi taşıyor: nokta ızgarası
        en ince, besleme yolları orta, ana hat en kalın nötr çizgi, mavi en
        parlak. Eşit kalınlıkta iki çizgi yok.
     2) OPACITY HİÇ KULLANILMIYOR. Kademe beş ayrı OPAK mürekkeple veriliyor;
        neredeyse siyah zeminde her alfa aynı griye düşüyor (tek istisna ışık
        huzmesinin gradyanı, o bir yüzey değil ışık).
     3) BÜTÜN KOORDİNATLAR IZGARADA. Tuval 640 × 320, birim 20; her sayı 20'nin
        katı. Tek istisna dönüş yarıçapları (16) ve onlar da her dönüşte aynı.
     4) TEK MAVİ, TEK NESNE. Çizimde --blue-600 taşıyan tam olarak bir nesne
        var ve o nesne aynı zamanda tek hareketli parça. Mavi süs değil,
        "şu anda canlı olan şey" demek.
     5) BAĞLANMAYAN NOKTA YOK. Düğüm (küçük dolu daire) yalnızca iki şeyin
        gerçekten birleştiği yerde duruyor.

   ---------------------------------------------------------------------------
   TEKNİK — bu dosyada "use client" YOK ve olmayacak

   Hareketin tamamı CSS'te; bu bileşenden tarayıcıya tek satır JavaScript
   inmiyor. Yan faydası büyük: bu depoda useReducedMotion ile RENDER EDİLEN
   AĞACI değiştirmek dört ayrı kalıpta hidrasyon hatası çıkardı. Eski sahnenin
   `Pulse` bileşeni tam bu yüzden bir kez düzeltilmişti (öğe ağaçta kalıyor,
   yalnızca hareket kapanıyor); artık böyle bir öğe yok — bir CSS medya sorgusu
   sunucu/istemci ayrımı yaratmıyor, hidrasyon riski sıfır.

   HAREKET BÜTÇESİ: sahne sayfaya TAM BİR sürekli animasyon ekliyor (ışığın
   kanaldan geçmesi · stroke-dashoffset). Üç ülke çizimi 19 / 15 / 34 saniyede
   çalışıyor; bu sahnenin periyodu 23 saniye, dördüyle de ortak katı yok, yani
   sayfa hiçbir zaman tek bir nabza kilitlenmiyor. prefers-reduced-motion:
   reduce altında animasyon hiç KURULMUYOR (yalnızca no-preference içinde
   tanımlı) ve ışık okunur bir duruş karesinde kalıyor.

   SINIRLAR: SVG filtresi yok (blur/turbulence sürekli animasyonda pahalı),
   Math.random() yok, <text> yok.

   ---------------------------------------------------------------------------
   İKİNCİ SEKTÖR EKLENDİĞİNDE

   Eşleme sektör ANAHTARINA bağlı, sıraya değil. sectors.ts'e ikinci bir sektör
   girildiğinde hiçbir şey yapılmasa da sayfa boş kutu göstermiyor: bilinmeyen
   sektör SceneThreeFrames'e düşüyor ve o çizim sektöre değil olguya bakıyor
   (aynı dosya, üç ayrı çerçeve). Sektöre özgü bir şey söylemek isteyen
   SECTOR_SCENES kaydına bir satır ekler.
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
   1 · YAZILIM — "çok kaynak, tek kanal"

   Kuşbakışı bir bağlantı planı. Solda üç eşit kaynak (yazılım her yerden
   satılır: web, mağaza, kurumsal — hangisi olduğu YAZMIYOR, üç olması yeterli).
   Üçü tek bir hatta toplanıyor ve o hat sağdaki gövdeye giriyor.

   İDDİA TEK: satış çoğaltılabilir, tahsilat çoğaltılamaz. Kanal bir tane ve
   bir yere bağlı — figcaption'daki cümlenin tamamı bu.

   HİYERARŞİ ÜÇ KADEMEDE: kaynaklar ve besleme yolları orta kalınlıkta
   (.sxv-line), ortak hat en kalın nötr çizgi (.sxv-edge), üstünden geçen ışık
   tek mavi. Göz sıralamayı kalınlıktan okuyor, etiketten değil.

   Yan yolların dönüşleri AYNI yarıçapla (16, kuadratik) yuvarlatılmış: tek bir
   keyfi köşe yok, dönüşlerin hepsi aynı kalıp. */
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

      {/* Ortak hat — çizimin en kalın nötr çizgisi, ışık bunun üstünden geçiyor */}
      <path className="sxv-edge" d={CHANNEL} />

      {/* Üç kaynak: aynı ölçü, aynı yüzey, aynı kenar. Aralarında hiyerarşi
          YOK ve olmamalı — hangisinden satıldığı tahsilat kanalını
          değiştirmiyor, sahnenin bütün mesele ettiği şey de bu. */}
      <rect className="sxv-face" x="40" y="40" width="80" height="40" rx="10" />
      <rect className="sxv-face" x="40" y="140" width="80" height="40" rx="10" />
      <rect className="sxv-face" x="40" y="240" width="80" height="40" rx="10" />

      {/* Gövde — çizimin odağı: kaynaklardan büyük, yüzeyi bir kademe açık,
          kenarı bir kademe kalın. Kabartma gibi duruyor çünkü ışık yukarıdan
          geliyor; aynı kural üç ülke çiziminde de aynı. */}
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

      {/* Düğümler: üç kaynağın çıkışı, yolların hatta bindiği yer, hattın
          gövdeye girdiği yer. Beşi de gerçek birleşme — boşta duran nokta yok. */}
      <g className="sxv-pin">
        <circle cx="120" cy="60" r="3.4" />
        <circle cx="120" cy="160" r="3.4" />
        <circle cx="120" cy="260" r="3.4" />
        <circle cx="200" cy="160" r="3.4" />
        <circle cx="440" cy="160" r="3.4" />
      </g>

      {/* ---- çizimin TEK mavi nesnesi ve TEK hareketi ----
          pathLength="1000": kesik deseni yolun gerçek uzunluğundan bağımsız
          hâle geliyor, yani hat bir gün uzarsa desen bozulmuyor. CSS'teki
          140/1860 "yolun %14'ü ışık, %186'sı boşluk" diye okunuyor: kanalda
          aynı anda EN FAZLA BİR ışık var ve iki geçiş arasında kanalın tamamen
          sakin kaldığı bir aralık kalıyor. */}
      <path className="sxv-lit sxv-run" pathLength="1000" d={CHANNEL} />
    </svg>
  );
}

/* ============================================================================
   2 · YEDEK — "aynı dosya, üç çerçeve"

   Kaydı olmayan sektör buraya düşüyor. Boş kutu göstermektense sektörden
   BAĞIMSIZ doğru bir şey göstermek daha iyi: aynı kuruluş dosyası üç ülkede üç
   ayrı çerçeveye giriyor. Çerçevelerin hangi ülke olduğu yazmıyor — çizim bir
   olguyu gösteriyor, bir iddiada bulunmuyor, dolayısıyla hangi sektöre düşerse
   düşsün yanlış olmuyor.

   TEK FARK ÇERÇEVELERİN İÇİNDE: üçü aynı genişlikte ama sırasıyla iki, üç ve
   dört bölmeye ayrılmış. "Aynı dosya" ile "ayrı çerçeve" arasındaki fark
   yazıyla değil, bölme sayısıyla söyleniyor. */
const FILE_LINE = "M180 160 H380";

function SceneThreeFrames() {
  return (
    <svg viewBox={VB} className="sxv" aria-hidden="true" focusable="false">
      <Ground />
      <Glow cx={320} cy={160} r={270} />

      {/* Ortak hat — dosyanın üçe ayrılmadan önceki tek gövdesi */}
      <path className="sxv-edge" d={FILE_LINE} />

      {/* Ayrım: dikey omurga ve üç dal */}
      <path className="sxv-line" d="M380 60 V260 M380 60 H440 M380 160 H440 M380 260 H440" />

      {/* Dosya — çizimin sol odağı: bir gövde, içinde bir çukur */}
      <rect className="sxv-face-lg" x="40" y="120" width="140" height="80" rx="14" />
      <rect className="sxv-well" x="64" y="144" width="60" height="16" rx="4" />

      {/* Üç çerçeve: aynı ölçü, farklı bölünme */}
      <rect className="sxv-face" x="440" y="40" width="160" height="40" rx="10" />
      <rect className="sxv-face" x="440" y="140" width="160" height="40" rx="10" />
      <rect className="sxv-face" x="440" y="240" width="160" height="40" rx="10" />
      <path
        className="sxv-thin"
        d="M480 40 V80 M480 140 V180 M520 140 V180 M480 240 V280 M520 240 V280 M560 240 V280"
      />

      <g className="sxv-pin">
        <circle cx="180" cy="160" r="3.4" />
        <circle cx="380" cy="160" r="3.4" />
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

/** Bir sahne ve altındaki tek cümle. İkisi hiçbir zaman ayrı taşınmıyor —
    ayrı iki tabloda dursalardı biri güncellenip öteki unutulduğunda sayfa
    yanlış çizimin altına doğru cümleyi basardı (bu bir kez oldu: kayıt
    anahtarı değişince yedek çizim, sektörün altyazısıyla çıktı). */
type Panel = { Scene: SceneFn; caption: string };

/* Altyazı ARTIK DAHA ÇOK İŞ YAPIYOR: çizimde yazı kalmadığı için sahnenin tek
   cümlesi burası. Çizim "ne", altyazı "ne anlama geliyor". */

/* Kaydı olmayan sektörün düştüğü yer. Boş kutu yok. */
const FALLBACK_HERO: Panel = {
  Scene: SceneThreeFrames,
  caption: "Aynı kuruluş dosyası üç ülkede üç ayrı çerçeveye giriyor.",
};

const SECTOR_SCENES: Record<string, { hero: Panel }> = {
  "yazilim-ve-teknoloji": {
    hero: {
      Scene: SceneSoftwareChannel,
      caption:
        "Kod nerede yazılırsa yazılsın, kartı çeken altyapı şirketin hangi ülkede kurulduğuna bakıyor.",
    },
  },
};

/* ------------------------------------------------------------------- çıkış

   Bileşen olarak dışa veriliyor, fonksiyon olarak değil: aramayı bileşenin
   kendisi yapınca sayfa yalnızca bir anahtar geçiriyor ve kayıt defteri bu
   dosyanın içinde kalıyor. Sayfa da bu dosya da sunucu bileşeni — sınırı
   geçen hiçbir şey yok. */

/** Giriş bölümündeki büyük sahne + altyazısı. Bilinmeyen sektör yedeğe düşer.
    Sahne aria-hidden; bölümün erişilebilir metni figcaption ile soldaki dört
    eksende duruyor. */
export function SectorHeroScene({ slug }: { slug: string }) {
  const { Scene, caption } = SECTOR_SCENES[slug]?.hero ?? FALLBACK_HERO;

  return (
    <figure className="sxv-panel">
      <Scene />
      <figcaption className="sxv-cap">{caption}</figcaption>
    </figure>
  );
}
