"use client";

import { useCallback, useId } from "react";
import { useReducedMotion } from "motion/react";
import CountryPicker from "@/components/shared/CountryPicker";
import { FACTS } from "@/lib/brand";
import { COUNTRY_LABELS, useOrtacStore, type Country } from "@/lib/store";
import { gtm } from "@/lib/gtm";

/* ============================================================================
   HERO SAHNESİ — ADAY G5 · "PENCERE"
   CSS: src/app/css/lab-g5.css (ad alanı .g5-)

   ------------------------------------------------------------- TEK CÜMLEYLE

   G2 şehre dışarıdan bakıyor, G3 bir kapının önünde duruyor. G5 kamerayı
   içeri alıyor: pencerenin ÖNÜNDE oturuyorsunuz. Sabit olan şey çerçeve ve
   pervazın üstündeki masa — üç ülkede de aynı masa, aynı dizüstü, aynı fincan.
   Değişen tek şey camın arkası: o yerin ışığı, havası, ufku, günün saati ve o
   ışığın masanıza nasıl düştüğü.

   ---------------------------------------------------- NEDEN BU FİKİR SEÇİLDİ

   Müşterinin beğendiği çekirdek "ülkeye göre değişen ve o yeri HİSSETTİREN"
   sahneydi. Hissettirmenin en kısa yolu manzarayı göstermek değil, o yerde
   olmanın ne demek olduğunu göstermek: ışığın rengi, havanın durumu, gölgenin
   uzunluğu. Bunlar bir şehri tanımanızı gerektirmez — vücudunuz bilir.

   Ve sabit çerçeve tek hamlede bir cümle kuruyor: İŞ AYNI İŞ, YER DEĞİŞİYOR.
   Masadaki dizüstünün ekranı üç ülkede de aynı maviyle yanıyor; onun dışında
   sahnedeki her renk ülkeyle birlikte kayıyor. Kuruluş kararı tam olarak bu:
   yaptığınız şey değişmiyor, hangi ışığın altında yaptığınız değişiyor.

   ------------------------------------------------------ NEYE BENZEMİYOR, NİÇİN

   · ŞEHİR SİLUETİ YOK. Camın arkasında tanınabilir tek bir bina yok — o G2'nin
     dili ve iki adayın aynı dili konuşması karşılaştırmayı anlamsız kılardı.
     Manzara yalnızca altı şeyle kuruluyor: gökyüzünün rengi, ışık kaynağının
     yüksekliği, ufuk çizgisinin yüksekliği ve keskinliği, ufka yakın pus,
     havadaki sürüklenme, camın kendi hâli (toz / yağmur izi / temiz).
   · KAPI + TABELA YOK (G3). Burada okunacak bir levha yok; sahne konuşmuyor,
     ışık konuşuyor.
   · KÜRE, HARİTA, ROTA, BURJ KHALİFA YOK. Sahnede tek bir coğrafi işaret bile
     yok — ne kıyı çizgisi ne kıta ne ok.
   · SAAT KADRANI YOK. Günün saati yalnızca ışığın yüksekliği ve gölgenin boyu
     ile söyleniyor; hiçbir yerde rakam yok.

   ------------------------------------------------- ÜÇ ÜLKEDE TAM OLARAK NE DEĞİŞİYOR

   DUBAI · öğle sonrası, toz. Işık yüksek ve sağdan; gökyüzü ufka doğru kum
     sarısına dönüyor. Ufuk çizgisi YOK — çölde ufku toz yer, o yüzden çizgi
     rengi yerin rengiyle aynı ve görünmüyor. Camda ince bir toz filmi var.
     Güneş yüksek olduğu için pervaza düşen ışık KISA: masanın hemen dibinde
     bitiyor, gölgeler kısa ve dik.

   İNGİLTERE · kapalı hava. Kaynak yok, gökyüzünün tamamı kaynak: geniş, yayvan
     ve renksiz bir aydınlık. Ufuk alçak, yakın ve zar zor okunuyor. Camda
     yağmurun bıraktığı dikey izler var — sahnenin "içerideyiz" duygusunu en
     çok taşıyan detay bu. Yönlü ışık olmadığı için pervazdaki huzme sönük ve
     eğimsiz; gölgeler neredeyse yok.

   KKTC · alçak güneş, açık hava, deniz. Tek net ufuk burada: deniz kenarı
     keskin bir çizgi verir, çöl ve kapalı hava vermez. Güneş solda ve alçak;
     kursu görünüyor, denizde parıltı bırakıyor. Alçak güneş demek UZUN ve
     YATIK gölge demek: pervazdaki ışık odanın içine kadar giriyor ve dikmelerin
     gölgesi masanın üstünde yana yatıyor.

   Üçünde de ortak olan tek hareket, dikmelerin (mullion) gölgesinin pervaza
   düşmesi. Ülke değişince o gölge tarağı yana yatıyor, uzuyor ve rengi
   değişiyor — sahnedeki "ışık değişti" anını taşıyan asıl şey bu.

   ------------------------------------------------------------------ MEKANİK

   Müşterinin şartı korunuyor: seçim YUKARIDAN yapılıyor, sahne ona tepki
   veriyor. Seçici canlıdaki paylaşılan CountryPicker'ın kendisi (G2 ile
   birebir aynı davranış: üstüne gelmek de seçiyor, tıklamak da, sekme ile
   gelip odaklanmak da). Sahnenin JS'ten bildiği tek şey hangi ülkenin seçili
   olduğu: kökteki data-c niteliği. Geri kalan her şey CSS değişkeni.

   ------------------------------------------------------------------- MALİYET

   Her karede JS çalışmıyor; seçim anında yapılan iş bir grup renk/dönüşüm
   geçişi ve bitince sahne duruyor. Sürekli hareket iki CSS animasyonundan
   ibaret (havanın sürüklenmesi + KKTC'de deniz parıltısı), ikisi de transform
   üzerinde, yani sekme arka plandayken tarayıcı durdurabiliyor. Tek bir SVG
   filtresi yok: yumuşak kenarların tamamı maske ve gradyan — G2'nin kuralı,
   "maske boya değil kesme aletidir".

   ERİŞİLEBİLİRLİK: sahnenin tamamı dekoratif ve aria-hidden; durumu okuyan tek
   yer görsel olarak gizli bir aria-live satırı. Seçici gerçek tablist.

   HAREKET AZALTMA: useReducedMotion yalnızca kökteki data-still niteliğini
   açıyor — RENDER EDİLEN AĞAÇ DEĞİŞMİYOR. Sunucu ve istemci birebir aynı
   ağacı basıyor, tercih yalnızca geçişleri ve animasyonları susturuyor.
   ========================================================================= */

/* --------------------------------------------------------------------- masa */
/* Tuval 820 × 240, pervazın üst hattı y=120 — yani tuvalin tam ortası. CSS
   masayı sahnenin alt %72'sine oturtuyor, dolayısıyla y=120 sahnenin %64'üne
   düşüyor ve tam olarak .g5-ledge'in başladığı yer orası. Sayı tesadüf değil,
   iki dosyanın tek buluşma noktası: masa ile pervaz aynı çizgiye basıyor.

   Nesneler y=120'nin ÜSTÜNE çıkıyor, yani camın önüne. "İçeridesiniz" hissini
   veren şey bu örtüşme: arkadan aydınlanan bir cisim, önündeki ışıktan koyu
   kalır ve yalnızca kenarı parlar. O yüzden hepsi koyu dolgu + tek renk kenar
   çizgisi ile çiziliyor; kenarın rengi ülkeye göre değişen tek şey.

   Ekran bir istisna: kendi ışığı var ve o ışık üç ülkede de aynı. Sahnedeki
   tek sabit renk kaynağı bu. */
function Desk() {
  /* Aynı sayfada iki sahne durursa gradyan kimlikleri çakışmasın. useId iki
     nokta üretiyor, url(#…) içinde kaçırılması gerekiyor — atmak en ucuzu. */
  const gid = `g5${useId().replace(/:/g, "")}`;

  return (
    <div className="g5-deskbox" aria-hidden="true">
      {/* viewBox soldan ve sağdan kırpılmış (130..690), çünkü nesneler zaten o
          bantta duruyor. Kadrajı daraltmak masayı büyütmenin tek yolu: kutunun
          yüksekliği serbest değil, y=120'nin sahnenin %64'üne düşmesi şartı onu
          %72'ye çiviliyor. Merkez (130+690)/2 = 410, yani gölge dönüşümünün
          merkeziyle aynı — kadraj değişse de nesneler ortada kalıyor. */}
      <svg className="g5-desk" viewBox="130 0 560 240" focusable="false">
        <defs>
          {/* Gölge, temas hattından uzaklaştıkça sönüyor. Alfa burada boya
              değil mesafe: sert kesilen bir gölge kesme kâğıdı gibi duruyordu. */}
          <linearGradient id={`${gid}c`} gradientUnits="userSpaceOnUse" x1="0" y1="118" x2="0" y2="214">
            <stop offset="0" stopColor="#050505" stopOpacity="0.95" />
            <stop offset="1" stopColor="#050505" stopOpacity="0" />
          </linearGradient>
          {/* Ekranın kendi ışığı. Pencereye karşı yine de KOYU kalıyor —
              gerçekte de öyle olur; parlak bir camın önünde açık bir dizüstü
              ekranı silüet gibi görünür, yalnızca rengi belli olur. */}
          <linearGradient id={`${gid}s`} gradientUnits="userSpaceOnUse" x1="0" y1="44" x2="0" y2="120">
            <stop offset="0" stopColor="#0e161f" />
            <stop offset="1" stopColor="#1c3450" />
          </linearGradient>
        </defs>

        {/* Gölgeler. Tek grup, tek dönüşüm: skewX güneşin yönünü, scaleY
            yüksekliğini taşıyor. Dönüşümün merkezi (410,120) temas hattında
            olduğu için nesnelerin ayağı yerinde kalıyor, yalnızca gölge
            savruluyor. */}
        <g className="g5-cast" fill={`url(#${gid}c)`}>
          <path d="M172 130 L266 126 L292 178 L162 183 Z" />
          <path d="M322 134 L520 134 L552 216 L288 216 Z" />
          <path d="M552 114 L581 114 L594 166 L534 166 Z" />
          <path d="M632 118 L672 118 L688 160 L612 160 Z" />
        </g>

        <g className="g5-things">
          {/* kâğıt yığını */}
          <path className="g5-body" d="M152 122 L246 117 L266 127 L172 132 Z" />
          <path className="g5-body" d="M172 132 L266 127 L266 131 L172 136 Z" />
          {/* kalem */}
          <path className="g5-edge" d="M250 140 L302 133" />

          {/* dizüstü: ekran bize dönük, klavye önde ve kısaltılmış */}
          <path className="g5-screen" fill={`url(#${gid}s)`} d="M344 120 L352 44 L490 44 L498 120 Z" />
          <path className="g5-deck" d="M336 120 L506 120 L520 138 L322 138 Z" />

          {/* fincan */}
          <path className="g5-body" d="M551 95 L554 115 A12.5 5 0 0 0 579 115 L582 95 Z" />
          <ellipse className="g5-body" cx="566.5" cy="95" rx="15.8" ry="5" />
          <path className="g5-edge" d="M582 100 C592 100.5 592 111.5 581.5 112" />

          {/* saksı ve yapraklar */}
          <path className="g5-body" d="M632 120 L638 101 L678 101 L672 120 Z" />
          <path
            className="g5-leaf"
            d="M657 101 C651 88 648 76 647 62 M657 101 C664 90 672 82 683 75 M657 101 C650 93 641 88 632 85 M657 101 C661 92 665 84 663 72"
          />
        </g>
      </svg>
    </div>
  );
}

/* ========================================================================== */

export default function HeroGlobeG5() {
  /* Kürenin okuduğu mağaza diliminin aynısı: bu bileşen HeroGlobe'un yerine
     doğrudan takılabilsin ve hesaplayıcı ile ülke seçimi ayrışmasın diye. */
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);
  const still = useReducedMotion() ?? false;

  /* Üstünde gezinmek sahneyi değiştiriyor, tıklamak ayrıca ölçülüyor. Ayrım
     kasıtlı: üç bayrağın üstünden fare geçmek üç "seçim" olayı üretmemeli,
     ama sahne yine de anında cevap vermeli. */
  const show = useCallback((c: Country) => setCountry(c), [setCountry]);
  const pick = useCallback(
    (c: Country) => {
      if (c === country) return;
      setCountry(c);
      gtm("hero_window_country", { country: c });
    },
    [country, setCountry],
  );

  const facts = FACTS[country];

  return (
    <div className="g5" data-c={country} data-still={still ? "" : undefined}>
      <CountryPicker value={country} onSelect={pick} onHover={(c) => c && show(c)} withLegend />

      <div className="g5-stage">
        {/* ---------------------------------------------------- camın arkası */}
        {/* Çerçevenin kendisi çizilmiyor. Sahnenin zemini hero'nun #080808'i ve
            cam o siyahın içine açılmış bir dikdörtgen: üstteki bant lento,
            alttaki ince boşluk alt kayıt. Boyanmayan çerçeve, boyanmış bir
            çerçeveden daha doğru duruyor — karanlık bir odada zaten çerçeveyi
            görmezsiniz, ışığın bittiği yeri görürsünüz. */}
        <div className="g5-glass" aria-hidden="true">
          <span className="g5-hi" />

          {/* Işık kaynağı iki parça: konumu taşıyan kutu ve içindeki yayvan
              hâle. Bölmek gerekti çünkü hâlenin ölçeği ile konumu ayrı ayrı
              değişiyor — kapalı havada hâle devasa ve ortada, akşam güneşinde
              küçük ve solda. */}
          <span className="g5-sunbox">
            <span className="g5-sun" />
            <span className="g5-disc" />
          </span>

          {/* Ufka bağlı ne varsa tek kutuda: yer/deniz düzlemi, ufuk çizgisi
              (yer düzleminin üst kenarı), pus bandı ve deniz parıltısı. Ufuk
              yüksekliği değiştiğinde dördü birden aynı transform ile kayıyor,
              yani hiçbiri diğerinden ayrı düşmüyor. */}
          <span className="g5-horizon">
            <span className="g5-ground" />
            <span className="g5-haze" />
            <span className="g5-glit" />
          </span>

          {/* Sürüklenen hava iki katman: dıştaki bandın gökyüzünün NEREsinde
              yaşadığını (yalnızca ufka yakın yarıda) söylüyor, içteki desenin
              kendisini taşıyor ve kayan da o. Bölmek zorunluydu — tek katmanla
              denendiğinde pus camın tepesine kadar çıkıyor ve mavinin üstünde
              kahverengi bir bulaşık gibi duruyordu. */}
          <span className="g5-drift">
            <span className="g5-drift-in" />
          </span>

          {/* Yağmurun camda bıraktığı izler. Hareketsiz ve bu kasıtlı: akan
              damla bir hero'da gözü çalıyor, akmış damla ise yalnızca "dışarısı
              yağmurlu, siz içeridesiniz" diyor ve hiçbir şeye mal olmuyor. */}
          <span className="g5-rain">
            <span className="g5-rain-in" />
          </span>

          {/* Camın kendi hâli: Dubai'de üstüne oturmuş toz, İngiltere'de ıslak
              yüzeyin iç yansıması, KKTC'de neredeyse temiz. */}
          <span className="g5-film" />

          {/* Dikmeler. Tek bir tekrarlayan gradyan — sıfır DOM düğümü, tam
              genişlik, her çözünürlükte simetrik (ortada bölme var, dikme
              yok; merkeze denk gelen bir dikme kompozisyonu ikiye bölerdi). */}
          <span className="g5-bars" />

          {/* Kasanın iç yüzü: camın üstü ve altı koyuluyor, cam bir yüzey değil
              bir boşluk gibi okunuyor. */}
          <span className="g5-reveal" />
        </div>

        {/* ------------------------------------------------ pervaz ve ışığı */}
        <span className="g5-ledge" aria-hidden="true" />

        {/* Pervaza düşen ışık. Tarak deseninin adımı dikmelerin adımıyla AYNI
            değişkenden (--g5-pitch) geliyor: gölgeler pencerenin kendisinden
            düşüyor, benzetme değil. Dış katman eğimi ve erişimi, iç katman
            yayılmayı taşıyor; ikisi de dönüşüm, yani geçiş bileşik katmanda
            oluyor ve tek bir yeniden yerleşim tetiklemiyor. */}
        <span className="g5-pool" aria-hidden="true">
          <span className="g5-pool-in" />
        </span>

        <Desk />

        {/* Sahnenin okunmasına yardım eden tek metin. Kart değil, düz iki
            parça: ülke ve brand.ts'teki iki kelimelik etiket. Fiyat, gün
            sayısı, kat, adres, manzara iddiası yok — sahne atmosferik, iddia
            değil. */}
        <p className="g5-note" aria-hidden="true">
          <span className="g5-note-c">{COUNTRY_LABELS[country]}</span>
          <span className="g5-note-t">{facts.tag}</span>
        </p>

        <p className="g5-sr" aria-live="polite">
          {COUNTRY_LABELS[country]} seçildi — {facts.tag}.
        </p>
      </div>
    </div>
  );
}
