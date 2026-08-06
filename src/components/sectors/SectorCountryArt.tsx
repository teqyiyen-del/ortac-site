import type { Country } from "@/lib/store";

/* ============================================================================
   ÜLKE BLOĞUNUN SAĞ SÜTUNU — SAF GÖRSEL
   CSS: src/app/css/sektor.css · 7. bölüm (.sxa-)

   ---------------------------------------------------------------- NEDEN AYRI
   Kardeşi SectorScenes.tsx'te duran şeyler ŞEMA: her biri tek bir cümle
   söylemek zorunda ve söyledikleri veriden geliyor. Buradakiler anlatmıyor —
   sektör sayfasının üç ülke bloğunda sağ sütun tamamen görsel alan. Şema ile
   dekoru aynı dosyada tutmak ikisinin de kuralını bulanıklaştırırdı.

   İKİNCİ FARK TEKNİK: bu dosyada "use client" YOK ve olmayacak. Hareketin
   tamamı CSS'te; tarayıcıya bu bileşenden tek satır JavaScript inmiyor. Yan
   faydası büyük: bu depoda useReducedMotion ile RENDER EDİLEN AĞACI değiştirme
   hatası dört ayrı kalıpta çıktı (`if (reduce) return null`, `{!reduce && …}`,
   `initial` içinde koşullu değer, `initial={{ width: reduce ? … }}`). Bir CSS
   medya sorgusu sunucu/istemci ayrımı yaratmıyor — hidrasyon riski sıfır.

   ============================ ÜÇ ÇİZİMİN FİKRİ =============================
   Üçü de tek bir soruya üç ayrı cevap: BİR YAPI NASIL KURULUR?
   Cevaplar üç farklı EKSENDE veriliyor ve her çizimin hareketi kendi
   ekseninin doğal hareketi. Ayrım budur; palet, çizgi ailesi ve ızgara ortak.

     DUBAI · "KATMAN"    — Z EKSENİ (derinlik)
       İzometrik üç kat, üst üste. Aynı işin farklı seviyeleri; aşağı indikçe
       çizgi kalınlaşıyor ve kat daha çok işleniyor (üst kat boş, orta kat
       bölünmüş, alt kat modülleri dolu). Hareket de Z'de: ışıklı bir kat
       çerçevesi yığında basamak basamak İNİYOR (transform · translateY).

     İNGİLTERE · "GÜZERGÂH" — XY DÜZLEMİ (plan)
       Kuşbakışı bir güzergâh planı. Dik açılı, yarıçapı sabit dönüşlerle
       çizilmiş yollar; hepsi ızgaranın üstünde. Solda kaynak bloğu, sağda
       hedef bloğu, aralarında tek bir ana hat; diğer üç yol kadraj dışına
       çıkıyor (ağ çerçevede bitmiyor). Hareket yol boyunca: tek bir ışık
       kaynaktan hedefe koşuyor (stroke-dashoffset).

     KKTC · "AÇIKLIK"     — θ EKSENİ (merkez)
       Dik ızgaranın üstüne oturmuş dairesel bir açıklık; disk opak olduğu için
       ızgarayı KESİYOR (maske değil, sadece daha açık bir yüzey). İç halkalar,
       24 bölmelik ölçü tarağı ve halkaya içten çizilmiş kare. Hareket θ'da:
       kenardaki tek aydınlık yay merkez etrafında çok yavaş dönüyor (rotate).

   Üçü aynı aileden: aynı ızgara (20 birim), aynı beş kademeli çizgi merdiveni,
   aynı opak mürekkep merdiveni, aynı düğüm noktası sözlüğü (küçük dolu daire),
   ve her çizimde TEK MAVİ, TEK ZİNCİR: mavi taşıyan nesne birden fazla olsa
   da hepsi aynı akışın ardışık parçaları ve hepsi tek periyotta kilitli.
   Renk disiplini buradan geliyor: mavi bir süs değil, "şu anda canlı olan
   şey" demek. (Kural bir tur önce "tam olarak bir nesne" idi; büyük sahnede
   aynı gerekçeyle genişledi — tek darbe "geçtiği yerde bir olay" yaratmıyor.)

   ------------------------------------------------- "DANDİK DURMA" SEBEPLERİ
   Önceki turda çizimlerin amatör durmasının sebepleri ve burada nasıl kapandığı:
     · eşit kalınlıkta çizgiler → beş kademeli merdiven (0.8 / 1 / 1.4 / 2 / 2.8),
       kalınlık artık DERİNLİK taşıyor (uzak ince, yakın kalın)
     · hepsinin aynı opaklıkta olması → opaklık hiç kullanılmıyor; kademe beş
       ayrı OPAK mürekkeple veriliyor (koyu yüzeyde alfa yok kuralı)
     · ızgaraya oturmayan konumlar → bütün koordinatlar 5'in katı, çoğu 20'nin;
       izometrik kat bile üçe bölündüğünde tam sayı veriyor (180/3, 45/3)
     · rastgele yerleştirilmiş kutular → her çizimin tek bir odağı var (yığının
       ortası · hedef bloğu · disk merkezi) ve ışık huzmesi tam oraya konuyor
     · anlamı olmayan süs → eklenen her nesnenin bir işi var; bağlanmayan
       nokta, boşta duran çizgi, sebepsiz köşe yok

   ------------------------------------------------------------------ HAREKET
   BU TURDA HAREKET BÜYÜDÜ. Müşteri: "sağdaki kartta daha fazla yaşayan ve
   göze batan animasyona ihtiyacı var, şu an çok soft yaşıyor, ben görmemiştim
   bile animasyonu olduğunu."

   Teşhis doğruydu ve iki sebebi vardı: (1) çizim başına TEK hareketli nesne
   vardı, yani hareket tek bir ince çizgide oluyordu; (2) periyotlar çok
   uzundu — KKTC'nin yayı 34 saniyede bir tur atıyordu, yani ekranda 5 saniye
   duran biri hareketin varlığını fark edemiyordu.

   Politika şunu söylüyor: ekranda tek ya da iki SVG varsa hareket BELİRGİN
   olmalı. Bu sayfada her ülke bloğu tam ekran genişliğinde ve kendi bölümünde
   duruyor, yani ekranda tek çizim var. Dolayısıyla:

     · her çizimde tek hareketli nesne değil, TEK ZİNCİR var — birden çok
       nesne, ama hepsi aynı akışın ardışık parçaları ve hepsi TEK periyotta
       kilitli (kardeş sahnenin "tek mavi, tek zincir" kuralının aynısı);
     · periyotlar iki-üç kat kısaldı: 19 → 8.3s · 15 → 6.7s · 34 → 10.1s.

   Sürekli animasyon sayısı: Dubai 5, İngiltere 6, KKTC 9. Hepsi saf CSS ve
   yalnızca transform / opacity / stroke-dashoffset / stroke / fill üzerinde
   — her karede JS çalışmıyor, düzen hesabı tetiklenmiyor, sekme arka
   plandayken tarayıcı hepsini park ediyor.

   PERİYOTLAR ORTAK KATSIZ. Sitedeki periyotlar 68·60·42·37·34·31·29·26·23·
   20·19·17·15·13·11·9.7·8.9·7.3·6.1·5.3 ve asal çarpanları
   {2,3,5,7,11,13,17,19,23,29,31,37,53,61,73,89,97}. Yeni üçlünün payları 83,
   67 ve 101 — üçü de bu kümede yok ve birbirlerine de asal. Sayfadaki akış
   zinciri 5.3s (payı 53), o da ayrı. Yani dört hareket hiçbir zaman
   birlikte atmıyor.

   prefers-reduced-motion: reduce altında HİÇBİRİ BAŞLAMIYOR (animasyonlar
   yalnızca no-preference içinde tanımlı). Duruş hâlleri bilerek okunur bir
   kare: Dubai'de ışıklı kat ORTA katta ve o kat yanık, İngiltere'de koşan
   ışık hedefin hemen önünde ve hedef bloğu yanık, KKTC'de yay diskin sağ
   üstünde ve en yakın işaret yanık. Hareket kapalıyken çizim eksik değil,
   durmuş.

   ------------------------------------------------------------------ SINIRLAR
   · Etiket, ok, açıklama, rakam, <text> YOK. Çizimler bir iddia taşımıyor;
     aria-hidden ile basılıyorlar ve ekran okuyucuya hiç görünmüyorlar.
   · SVG filtresi YOK (blur/turbulence sürekli animasyonda pahalı). Yumuşak
     kenarların tamamı gradyan ve maske.
   · Math.random() YOK. Tekrarlayan tek şey ölçü tarağı ve o da JS'te
     trigonometri ile değil, SVG'nin kendi rotate() dönüşümüyle üretiliyor —
     sunucu ile istemci arasında kayan tek ondalık bile olmuyor.
   ========================================================================= */

/* ---------------------------------------------------------------- geometri
   ÜÇ ÇİZİM DE AYNI TUVALDE: 520 × 380, ızgara birimi 20.
   Tek kök ölçü CSS'te (.sxc-art · --sxa-h); buradaki her sayı viewBox
   biriminde, yani kap büyüyünce ÇİZİMİN TAMAMI aynı katsayıyla büyüyor —
   çizgi kalınlıkları ve hareket mesafeleri dahil. Esneme imkânsız çünkü
   preserveAspectRatio varsayılanı oranı koruyor. */
const VB = "0 0 520 380";

/* Ortak süzgeç: ızgara dokusunun kadraj kenarına sert çarpmaması için radyal
   maske. Filtre DEĞİL maske — statik ve bedava.
   Gradyan/maske kimlikleri her çizimde farklı önek taşıyor: SVG id'leri belge
   genelinde tekil olmak zorunda ve çakışma sessizce yanlış deseni gösteriyor.
   Üç çizim aynı sayfada, her ülke bir kez basılıyor. */
function Fade({ id }: { id: string }) {
  return (
    <>
      <radialGradient id={`${id}g`} cx="50%" cy="50%" r="64%">
        <stop offset="0" stopColor="#fff" />
        <stop offset="0.58" stopColor="#fff" />
        <stop offset="1" stopColor="#000" />
      </radialGradient>
      <mask id={id}>
        <rect width="520" height="380" fill={`url(#${id}g)`} />
      </mask>
    </>
  );
}

/* Işık huzmesi. Her çizimde TEK tane ve çizimin odağına konuyor — böylece
   mürekkep merdiveni keyfi değil, bir ışık kaynağının sonucu gibi okunuyor.
   Dış durak tam saydam: kabın zemininde (--night-2) iz bırakmıyor. */
function Glow({ id, cx, cy, r }: { id: string; cx: number; cy: number; r: number }) {
  return (
    <>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#2f6fc4" stopOpacity="0.30" />
          <stop offset="0.55" stopColor="#2f6fc4" stopOpacity="0.10" />
          <stop offset="1" stopColor="#2f6fc4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
    </>
  );
}

/* ========================================================== DUBAI · KATMAN
   İzometrik yığın. Kat kutusu: yarı genişlik 180, yarı yükseklik 45, adım 110.
   İki eksen a=(90,−22.5) ve b=(90,+22.5); katın herhangi bir noktası
   P(s,t) = (260 + 90(s+t), cy + 22.5(t−s)), s,t ∈ [−1,1].

   Bu kutunun tek sebebi ÜÇTE BİRLERİN TAM SAYI VERMESİ: 180/3 = 60,
   45/3 = 15. Yani modül ızgarası (3×3) ve modül karoları elle yazılmış tek bir
   ondalık olmadan ızgaraya oturuyor. Aşağıdaki bütün d= dizeleri o formülden
   çıkmış sabitler.

   DERİNLİK ALFAYLA DEĞİL, MERDİVENLE: üst kat en ince ve en sönük mürekkep
   (.sxa-thin), orta kat bir kademe kalın (.sxa-line), alt kat en kalın ve en
   açık (.sxa-edge). Aynı sıra işlenmişlikte de var — üst kat boş, orta kat iki
   çizgiyle üçe bölünmüş, alt kat tam 3×3 ızgaralı ve üç modülü dolu. Yığın
   aşağıdan yukarı kuruluyor. */
function ArtLayers() {
  return (
    <svg viewBox={VB} className="sxa" aria-hidden="true" focusable="false">
      <Glow id="sxa-glow-layers" cx={260} cy={205} r={235} />

      {/* Dikmeler: katların sol ve sağ köşelerini birleştiren iki saç teli.
          Ön ve arka köşe izometride aynı x'e düştüğü için onlara dikme
          çizilmiyor — çizilse tek uzun bir çizgiye dönüşür ve derinliği
          anlatmak yerine bozardı. */}
      <path className="sxa-hair" d="M80 80 V300 M440 80 V300" />

      {/* Üç kat. HER BİRİ AYRICA .sxa-floor: ışıklı çerçeve o kata indiğinde
          kat kendi mürekkebinden maviye dönüyor ve geri sönüyor (bkz. CSS ·
          HAREKET). Dinlenme mürekkebi --fl değişkeninde tutuluyor, çünkü üç
          katın üçü farklı kademede ve tek bir @keyframes hepsine yetsin
          isteniyor. */}

      {/* Üst kat — boş. En uzak, en ince, en sönük. */}
      <path className="sxa-thin sxa-floor sxa-fl1" d="M80 80 L260 35 L440 80 L260 125 Z" />

      {/* Orta kat — iki çizgiyle üçe bölünmüş. */}
      <path className="sxa-line sxa-floor sxa-fl2" d="M80 190 L260 145 L440 190 L260 235 Z" />
      <path className="sxa-hair" d="M140 205 L320 160 M200 220 L380 175" />

      {/* Alt kat — tam modül ızgarası + üç dolu karo. En yakın, en kalın. */}
      <path className="sxa-edge sxa-floor sxa-fl3" d="M80 300 L260 255 L440 300 L260 345 Z" />
      <path
        className="sxa-thin"
        d="M140 285 L320 330 M200 270 L380 315 M140 315 L320 270 M200 330 L380 285"
      />
      {/* Dolu karolar: çerçeve en alt kata indiğinde birlikte yanıyorlar —
          "iş burada bitti" anını görünür kılan tek olay bu. */}
      <path
        className="sxa-cell sxa-cells"
        d="M80 300 L140 285 L200 300 L140 315 Z M200 300 L260 285 L320 300 L260 315 Z M200 270 L260 255 L320 270 L260 285 Z"
      />

      {/* Dikmelerin katlara bastığı altı düğüm. Üç çizimde de aynı sözlük:
          birleşme noktası küçük dolu daire ile işaretleniyor. */}
      <g className="sxa-pin">
        <circle cx="80" cy="80" r="2.6" />
        <circle cx="80" cy="190" r="2.6" />
        <circle cx="80" cy="300" r="2.6" />
        <circle cx="440" cy="80" r="2.6" />
        <circle cx="440" cy="190" r="2.6" />
        <circle cx="440" cy="300" r="2.6" />
      </g>

      {/* ---- çizimin TEK mavi nesnesi ve TEK hareketi ----
          Üst katın kutusunda çiziliyor, translateY ile 0 → 110 → 220 basamak
          basamak iniyor ve her katta duruyor. Dolgusu YOK: altındaki modül
          ızgarasını kapatmıyor, yalnızca o katı çerçeveliyor.
          Duruş hâli (hareket kapalıyken) ORTA kat — CSS'te translateY(110px). */}
      <g className="sxa-lift">
        <path className="sxa-lit" d="M80 80 L260 35 L440 80 L260 125 Z" />
        <g className="sxa-lit-pin">
          <circle cx="80" cy="80" r="2.8" />
          <circle cx="260" cy="35" r="2.8" />
          <circle cx="440" cy="80" r="2.8" />
          <circle cx="260" cy="125" r="2.8" />
        </g>
      </g>
    </svg>
  );
}

/* ==================================================== İNGİLTERE · GÜZERGÂH
   Kuşbakışı plan. Dört yol da dik açılı ve her dönüş AYNI yarıçapla (16 birim,
   kuadratik) yuvarlatılmış — "rastgele yerleştirilmiş kutu" hissini en çok
   bozan şey buydu: tek bir keyfi köşe yok, dönüşlerin hepsi aynı kalıp.

   YOLLAR BİRBİRİNİ KESMİYOR. Dört yol dört ayrı bölgeye ayrılmış (sol-üst,
   alt, sağ, üst) ve hiçbiri diğerinin şeridine girmiyor. Kesişme bir plan
   çiziminde ya köprü ya hata demek; ikisini de söylemek istemiyoruz.

   ÜÇÜ KADRAJ DIŞINA ÇIKIYOR (x=0, y=380, x=520, y=0). Ağın çerçevede bitmesi
   "burada duruyor" derdi; bitmiyor.

   ANA HAT ise kadrajın İÇİNDE başlayıp içinde bitiyor: solda kaynak bloğu,
   sağda hedef bloğu. Çizimin öznesi bu ikisi arasındaki tek yol — koşan ışık
   da orada. */
const ROUTE_MAIN = "M104 98 H164 Q180 98 180 114 V174 Q180 190 196 190 H280";

/* Yan yollar artık iki kez yazılıyor: bir kez nötr çizgi olarak (ağın
   kendisi), bir kez de üstünden koşacak ışık için. Aynı dizeyi iki yere elle
   yazmak, birini değiştirip ötekini unutmak demek olurdu. */
const ROUTE_SIDE = [
  "M120 380 V316 Q120 300 136 300 H284 Q300 300 300 284 V230",
  "M520 300 H456 Q440 300 440 284 V206 Q440 190 424 190 H360",
  "M420 0 V44 Q420 60 404 60 H336 Q320 60 320 76 V150",
];

function ArtRoute() {
  return (
    <svg viewBox={VB} className="sxa" aria-hidden="true" focusable="false">
      <defs>
        {/* Zeminin nokta ızgarası: 40 birimde bir. Yollar bu ızgaranın üstünde
            duruyor, yani "ızgaraya oturuyor" iddiası çizimin kendisinde
            görünür durumda. Tek <rect> ile boyanıyor, 96 ayrı daire değil. */}
        <pattern id="sxa-dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle className="sxa-dot" cx="20" cy="20" r="1" />
        </pattern>
        <Fade id="sxa-fade-route" />
      </defs>

      <rect width="520" height="380" fill="url(#sxa-dots)" mask="url(#sxa-fade-route)" />

      <Glow id="sxa-glow-route" cx={320} cy={190} r={215} />

      {/* Yan yollar: ana hattan İKİ kademe ince ve iki kademe sönük
          (.sxa-thin). Bir kademe (.sxa-line) denendi ve yetmedi — ekranda ana
          hat ile yan yollar aynı ağırlıkta okunuyordu ve çizimin öznesi
          kayboluyordu. İki kademe açılınca ana hat tek başına konuşuyor,
          yan yollar da "ağ burada bitmiyor"u söylemeye devam ediyor. */}
      {ROUTE_SIDE.map((d) => (
        <path key={d} className="sxa-thin" d={d} />
      ))}

      {/* Ana hat. Aşağıdaki ışık bunun üstünden geçiyor, o yüzden en kalın
          nötr çizgi bu. */}
      <path className="sxa-edge" d={ROUTE_MAIN} />

      {/* Kaynak bloğu — küçük, kapalı, tek çıkışı olan bir kutu.
          .sxa-blk: ışık yola çıkarken yanıyor (bkz. CSS · HAREKET). */}
      <rect className="sxa-face sxa-blk sxa-b1" x="40" y="76" width="64" height="44" rx="8" />
      <rect className="sxa-well" x="56" y="90" width="32" height="16" rx="3" />

      {/* Hedef bloğu — çizimin odağı. Kaynaktan büyük, dört girişi var ve
          yüzeyi bir kademe açık: kabartma gibi duruyor. Işık vardığında
          yanıyor; gecikmesi yolun geometrisinden hesaplandı. */}
      <rect
        className="sxa-face-lg sxa-blk sxa-b2"
        x="280"
        y="150"
        width="80"
        height="80"
        rx="12"
      />
      <rect className="sxa-well" x="302" y="172" width="36" height="36" rx="6" />

      {/* Girişler. Dubai'deki düğüm sözlüğünün aynısı. */}
      <g className="sxa-pin">
        <circle cx="104" cy="98" r="3.4" />
        <circle cx="280" cy="190" r="3.4" />
        <circle cx="300" cy="230" r="3.4" />
        <circle cx="360" cy="190" r="3.4" />
        <circle cx="320" cy="150" r="3.4" />
      </g>

      {/* ---- ZİNCİRİN MAVİ PARÇALARI ----
          pathLength="1000": kesik deseni yolun GERÇEK uzunluğundan bağımsız
          hâle geliyor. Yol bir gün değişirse desen bozulmuyor, ve CSS'teki
          140/1860 sayıları "yolun %14'ü ışık, %186'sı boşluk" diye okunuyor —
          yani bir yolda aynı anda EN FAZLA BİR ışık var.

          ÜÇ YAN YOLDA DA IŞIK VAR ve gecikmeleri farklı: ağ artık "duran bir
          plan" değil, üstünde trafik olan bir plan. Üçü de ana hattan bir
          kademe ince (.sxa-side) — özne hâlâ ana hat. */}
      <path className="sxa-lit sxa-run" pathLength="1000" d={ROUTE_MAIN} />
      {ROUTE_SIDE.map((d, i) => (
        <path
          key={d}
          className={`sxa-lit sxa-side sxa-sd${i + 1}`}
          pathLength="1000"
          d={d}
        />
      ))}
    </svg>
  );
}

/* ======================================================== KKTC · AÇIKLIK
   Dik ızgaranın üstüne oturmuş dairesel açıklık. Disk OPAK ve zeminden bir
   kademe açık; ızgarayı kesen şey bir maske değil, diskin kendisi — "koyu
   yüzeyde alfa yok" kuralının en doğrudan uygulaması.

   AÇIKLIK IZGARAYI GİZLEMİYOR, AÇIYOR. Diskin içinde AYNI 40 birimlik ızgara
   var, yalnızca bir kademe açık mürekkeple. Yani daire bir kapak değil bir
   pencere: dışarıda zar zor sezilen ızgara, açıklığın içinde okunuyor.
   İki desen aynı hizada (ikisi de userSpaceOnUse, ikisi de 40'ın katlarında),
   o yüzden içerideki çizgiler dışarıdakilerin devamı — kenardan geçerken tek
   bir piksel kaymıyor.

   Ölçü tarağı: 24 bölme (15°), her 45°'de bir uzun ve kalın işaret. Açılar
   JS'te trigonometriyle DEĞİL, SVG'nin kendi rotate() dönüşümüyle üretiliyor:
   sunucu ile istemci arasında yuvarlanacak tek ondalık yok, hidrasyon riski
   sıfır ve işaretler tam olarak ızgarada.

   İÇERİDE EŞ MERKEZLİ HİÇBİR ŞEY YOK — İLK DENEMEDE VARDI VE HATAYDI.
   İlk yazımda diskin içinde iki halka, bir eşkenar dörtgen ve ortada koyu bir
   çekirdek vardı; ekranda çıkan şey soyut bir açıklık değil, bir GÖZ oldu
   (dörtgenin sivri uçları göz kapağı, halkalar iris, koyu çekirdek gözbebeği).
   Kompozisyon kusursuz simetrik olduğu için beynin bulduğu ilk yüz benzeri
   şablona oturdu. Çözüm simetriyi kırmak: içeride artık merkeze göre
   simetrik tek nesne yok. Kütle (L biçimli oturum) merkezin biraz solunda ve
   üstünde, ondan çıkan iki hat sağa ve aşağı gidiyor. Vaziyet planı okunuyor,
   yüz okunmuyor.

   Kütle ve hatlar 20'nin katlarında, yani ızgaranın alt bölümünde; dairesel
   kırpma da onları kenarda kesiyor — plan çizimlerinde parselin sınırda
   kesilmesi zaten beklenen davranış. */
function ArtAperture() {
  /* 24 bölme; 45°'nin katları uzun işaret olarak ayrıca çiziliyor, o yüzden
     kısa işaretlerde atlanıyorlar (i % 3). Sabit dizi, rastgelelik yok. */
  const minor = [...Array(24).keys()].filter((i) => i % 3 !== 0);
  const major = [...Array(8).keys()];

  return (
    <svg viewBox={VB} className="sxa" aria-hidden="true" focusable="false">
      <defs>
        {/* Aynı ızgaranın iki mürekkebi: dışarısı (zemin) ve içerisi (disk). */}
        <pattern id="sxa-mesh" width="40" height="40" patternUnits="userSpaceOnUse">
          <path className="sxa-hair" d="M40 0 V40 M0 40 H40" />
        </pattern>
        <pattern id="sxa-mesh-in" width="40" height="40" patternUnits="userSpaceOnUse">
          <path className="sxa-thin" d="M40 0 V40 M0 40 H40" />
        </pattern>
        <Fade id="sxa-fade-ap" />
        {/* Diskin kendi ışığı: merkezde açık, kenara doğru koyu. İki durak da
            OPAK — kademe alfayla değil renkle veriliyor. */}
        <radialGradient id="sxa-disc" cx="50%" cy="46%" r="58%">
          <stop offset="0" stopColor="#1b1f25" />
          <stop offset="1" stopColor="#131519" />
        </radialGradient>
        {/* İçerideki her şey tarağın iç ucunun (r=128) altında kalıyor:
            r=124, yani ızgara ile tarak arasında temiz bir halka boşluk var. */}
        <clipPath id="sxa-ap-clip">
          <circle cx="260" cy="190" r="124" />
        </clipPath>
      </defs>

      <rect width="520" height="380" fill="url(#sxa-mesh)" mask="url(#sxa-fade-ap)" />

      <Glow id="sxa-glow-ap" cx={260} cy={190} r={250} />

      {/* Açıklık. Kenarı çizimin en kalın nötr çizgisi: figürü tanımlayan şey.
          Sınıf .sxa-edge DEĞİL .sxa-disc — .sxa-edge `fill: none` yazıyor ve
          CSS bildirimi sunum özniteliğini ezdiği için diskin gradyanını
          sessizce silerdi. */}
      <circle className="sxa-disc" cx="260" cy="190" r="140" fill="url(#sxa-disc)" />

      <g clipPath="url(#sxa-ap-clip)">
        {/* içeride açılan ızgara — dışarıdakiyle aynı hizada, bir kademe açık */}
        <rect width="520" height="380" fill="url(#sxa-mesh-in)" />
        {/* Oturum: merkeze göre kaçık, L biçimli, ızgaraya oturmuş tek kütle.
            Dolgu ve kontur AYRI iki düğüm, çünkü ikisi ayrı işi yapıyor ve
            .sxa-face burada yanlış olurdu: onun dolgusu ZEMİNDEN açık ama
            DİSKTEN koyu, yani kütle bir kabartma değil bir çukur gibi
            okunuyordu (ekranda denendi). Kütle diskten açık olmak zorunda —
            ışık yukarıdan geliyor kuralı üç çizimde de aynı. */}
        <path className="sxa-cell" d="M220 140 H300 V180 H280 V220 H220 Z" />
        <path className="sxa-line" d="M220 140 H300 V180 H280 V220 H220 Z" />
        {/* Kütleden çıkan iki hat. Daire onları kenarda kesiyor; nereye
            gittikleri yazmıyor ve yazmayacak. */}
        <path className="sxa-line" d="M300 160 H400 M240 220 V320" />
      </g>

      {/* Ölçü tarağı — diskin kenarında, kırpmanın dışında.

          SEKİZ UZUN İŞARET SIRAYLA YANIYOR: dönen yay üstlerinden geçerken.
          Gecikme göz kararı değil, geometriden: yay rotate(-42°)'den
          başlıyor ve i numaralı işaret (-90 + 45i)° konumunda duruyor, yani
          yay ona turun ((45i − 48) mod 360)/360'ında varıyor. Bu oran --d
          olarak yazılıyor, periyodu CSS çarpıyor — böylece periyot tek yerde
          (CSS) kalıyor ve buradaki sayı saf geometri.

          Sunucu ile istemci aynı tam sayılardan aynı diziyi üretiyor;
          yuvarlanacak tek ondalık yok, hidrasyon riski sıfır. */}
      <g transform="translate(260 190)">
        <g className="sxa-thin">
          {minor.map((i) => (
            <line key={i} x1="0" y1="-128" x2="0" y2="-140" transform={`rotate(${i * 15})`} />
          ))}
        </g>
        <g className="sxa-line">
          {major.map((i) => (
            <line
              key={i}
              /* i=1 (-45°) yayın DURUŞ konumuna (-42°) en yakın işaret:
                 hareket kapalıyken yanık kalan tek işaret o. */
              className={i === 1 ? "sxa-tick sxa-tick-rest" : "sxa-tick"}
              style={
                {
                  "--d": (((45 * i - 48 + 360) % 360) / 360).toFixed(4),
                } as React.CSSProperties
              }
              x1="0"
              y1="-118"
              x2="0"
              y2="-140"
              transform={`rotate(${i * 45})`}
            />
          ))}
        </g>
      </g>

      {/* İki hattın kütleden çıktığı yer. Dubai ve İngiltere'deki sözlüğün
          aynısı: birleşme noktası küçük dolu daire. */}
      <g className="sxa-pin">
        <circle cx="300" cy="160" r="3.4" />
        <circle cx="240" cy="220" r="3.4" />
      </g>

      {/* ---- çizimin TEK mavi nesnesi ve TEK hareketi ----
          Kenarın 46°'lik bir parçası. Kenar çizgisinin üstünde ve ondan kalın:
          rimin AYDINLANMIŞ dilimi gibi okunuyor. Merkez etrafında 34 saniyede
          bir tur — tarağın işaretlerinin üstünden yavaşça geçiyor.
          Uç noktalar sabit: r=140, ±23°. cos23 ve sin23 burada bir kez elle
          hesaplandı; çalışma anında trigonometri yok.
          Duruş hâli CSS'te: rotate(-42deg), yani sağ üst. */}
      <path className="sxa-lit sxa-orbit" d="M388.87 135.3 A140 140 0 0 1 388.87 244.7" />
    </svg>
  );
}

/* ---------------------------------------------------------------- kayıt defteri

   Anahtar ÜLKE, sektör değil: üç çizimin hiçbiri sektöre özgü bir şey
   söylemiyor, dolayısıyla ikinci sektör eklendiğinde bu dosyaya dokunmak
   gerekmiyor ve bilinmeyen sektör de boş kutu görmüyor.

   Bir sektöre özel çizim istenirse doğru yer burası değil, SectorScenes'teki
   SECTOR_SCENES kaydıdır — orası sektöre bağlı, burası ülkeye. */
const ART: Record<Country, () => React.ReactElement> = {
  dubai: ArtLayers,
  ingiltere: ArtRoute,
  kktc: ArtAperture,
};

/** Ülke bloğunun sağ sütunu. Dekor: figcaption yok, alt metin yok,
    aria-hidden. Bir şey iddia etmiyor. */
export default function SectorCountryArt({ country }: { country: Country }) {
  const Art = ART[country];
  return (
    <div className="sxc-art" aria-hidden="true">
      <Art />
    </div>
  );
}
