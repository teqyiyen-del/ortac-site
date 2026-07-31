"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { useReducedMotion } from "motion/react";
import SmartLink from "@/components/shared/SmartLink";
import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import { FACTS } from "@/lib/brand";
import { gtm } from "@/lib/gtm";
import { useOrtacStore, type Country } from "@/lib/store";

/* ============================================================================
   HERO SAHNESİ — ADAY G3 · "EŞİK"
   Küreye alternatif. CSS: src/app/css/lab-g3.css (ad alanı .g3-)

   ------------------------------------------------- ÖNCE: BU GÖRSELİN İŞİ NE?

   Küre ne diyordu: "dünya çapında çalışıyoruz". Müşteri onu klişe buldu, çünkü
   klişe. Ama asıl mesele beğeni değil: o cümle zaten kimsenin sormadığı bir
   sorunun cevabı. Hero'ya gelen kişi "bu firma dünya çapında mı" diye
   düşünmüyor; "ben nereye kurayım, kurunca elime ne geçiyor" diye düşünüyor.
   Küre bu sorunun ikisine de cevap vermiyordu — üç ülke, aynı gezegenin
   üzerinde üç noktaydı; noktalar birbirinin aynıydı, seçim de öyle görünüyordu.

   Bu yüzden görselin işini yeniden tanımladım:

     Görselin işi, seçilen ülkede KURULMUŞ ŞİRKETİN kendisini göstermek.
     Yani vaadi değil sonucu: bir kapı, yanında sizin şirketinizin tabelası,
     tabelada o ülkenin tüzel biçimi.

   H1 zaten "Şirketinizi kurun, sonrasını da biz yürütelim" diyor. Görselin işi
   o cümlenin NESNESİNİ göstermek — cümlenin geçtiği gezegeni değil.

   -------------------------------------------- KÜRE TROPE'UNDAN NEREDE AYRILIR

   Tek cümleyle: ölçek tersine döndü. Küre 10.000 km'den bakıyordu (hiçbir insan
   oradan bakmaz), bu sahne göz hizasından bakıyor — bir adresin önünde durur
   gibi. Bunun üç somut sonucu var:

   1) COĞRAFYA HİÇ YOK. Projeksiyon yok, kıyı çizgisi yok, enlem/boylam yok,
      İstanbul'dan çizilen rota yok, nokta bulutu yok. globeGeo.ts'ten tek bayt
      okunmuyor. Ülke; MİMARİ + TÜZEL BİÇİM + IŞIĞIN RENGİ ile anlatılıyor.
      "Harita değil" kuralını harfiyen değil, kökünden tutuyor: bu sahnenin
      hiçbir yerinde bir yer, bir yerin şekliyle temsil edilmiyor.

   2) SİLUET DE YOK. İlk denediğim şey şehir siluetiydi (sitenin DubaiSkyline
      dili orada duruyor) ve çöpe gitti: şirket kuruluşu sektöründe Burj Khalifa
      silueti küreden bile daha çok kullanılan görsel. Küreyi klişe diye eleyip
      yerine sektörün bir numaralı klişesini koymak olurdu. Şehir değil, tek bir
      kapı: kimsenin reklamında olmayan ölçek bu.

   3) ANLATILAN ŞEY DEĞİŞTİ. Kürede değişen bilgi "bu ülke şurada"ydı. Burada
      değişen bilgi "bu ülkede şirketiniz şu biçimde duruyor": Dubai'de serbest
      bölge/mainland, İngiltere'de Companies House limited, KKTC'de yerel
      tescil (brand.ts → FACTS.structure). Yani seçim artık bir konum değil,
      bir sonuç gösteriyor.

   -------------------------------------------------------------- MEKANİK AYNI

   Müşterinin şartı: "mantık yine aynı olacak, yukardan ülke seçmeli şekilde".
   Aynen duruyor ve kürenin dönüş hissi de duruyor — sahne yer değiştirerek
   cevap veriyor:

     · Üstte üç bayraklı seçici (role="tablist"), CountryPicker'ın davranışının
       birebir aynısı: üzerine gelmek de seçiyor, tıklamak da (dokunmatikte
       hover yok). Ok tuşlarıyla gezinme burada fazladan var.
     · Sahne tek kapı değil, KAPILI BİR DUVAR — bir sokak cephesi. Seçim
       yapılınca duvar yatayda kayıp seçilen kapıyı ortaya alıyor ve yalnızca
       onun ışığı yanıyor. Küre dönüp ülkeyi ortaya alıyordu; burada duvar
       kayıp kapıyı ortaya alıyor: aynı mekanik, ölçek değişti. Kenarlarda
       kalan sönük kapılar da "başka kapılar da var" diyor, yani seçicinin
       söylediğini sahne de söylüyor. (Duvarda kaç kapı olduğu ve neden,
       aşağıda WALL'da yazılı.)

   ---------------------------------------------------------------- SAHNE NEDEN

   KAPI, çünkü kuruluşun tek somut çıktısı bir eşiktir: o ülkede bir adresiniz,
   bir tüzel kişiliğiniz olur. Kapı kültürel olarak da okunur — üç kapının
   kemeri üç ülkeyi bayraktan bile hızlı ayırıyor (sivri kemer / Georgian
   camlıklı kapı / yuvarlak taş kemer).

   TABELA, çünkü ziyaretçinin kendini içeride görmesi gereken tek yer orası.
   Üstünde "Şirketiniz" yazıyor — uydurma bir şirket adı değil. Alt satır
   FACTS.structure, yani gerçek bilgi. Altındaki küçük tabela "Ortac Global
   tarafından yürütülür" diyor: H1'in ikinci yarısı.

   IŞIK, çünkü seçimin bedava ve okunaklı bir dili lazım. Yanan tek kapı var;
   hangi ülkedeysek orası aydınlık. Renk de oradan geliyor: Dubai sıcak kum,
   İngiltere soğuk gün ışığı, KKTC deniz yeşili — hepsi kısık, marka mavisi
   tabelada kalıyor.

   İÇERİK SINIRI: tabelada gün sayısı, fiyat, banka vaadi yok. Sahne yalnızca
   ülke adı + tüzel biçim söylüyor; ikisi de brand.ts'te yazılı ve iddia değil.

   ------------------------------------------------------------------- MALİYET

   Ölçülen sahne: tarayıcıda 180 DOM düğümü (beş kapı, tabelalar ve seçici
   dahil), yorumsuz kaynak 14,6 KB — gzip 4,4 KB. Karşılaştırma için kürenin
   kendi dosyasında yazan rakam 24 KB gzip, üstüne 45.623 noktalık veri.
   Buradan globeGeo.ts'e tek bir import yok: 320 KB'ın tamamı dışarıda kalıyor.

   Çalışma anında: nokta bulutu yok, her karede dönen projeksiyon yok,
   canvas/WebGL yok, tampon yok, ResizeObserver yok, boşta dönen animasyon
   yok. Seçim anında iş yapan tek şey bir transform geçişi (bileşik katman)
   ile birkaç renk/opaklık geçişi; onlar da bitince sahne tamamen duruyor.

   ERİŞİLEBİLİRLİK: sahnenin tamamı aria-hidden (dekoratif tekrar), durumu
   okuyan tek yer görsel olarak gizli bir aria-live satırı. Seçicinin kendisi
   gerçek tablist.
   ========================================================================= */

const ORDER: Country[] = ["dubai", "ingiltere", "kktc"];

/* Duvarda BEŞ kapı var, üç değil. Sebep tamamen kompozisyon: üç kapılık bir
   şeritte uçtaki ülkeyi (Dubai ya da KKTC) seçtiğinizde bir yan komple boş
   kalıyor — ekranın yarısı bomboş siyah oluyor ve sahne "kesilmiş" duruyor.
   Baştaki ve sondaki iki kapı, sıranın öbür ucundaki kapının aynısı; hiçbir
   zaman yanmıyorlar, yalnızca sokağın devam ettiğini söylüyorlar. İkisi de
   ekranda aynı anda görünmüyor (aralarında üç yuva var, yani en geniş
   ekranda bile birbirini görmüyorlar), o yüzden tekrar fark edilmiyor.

   Kaydırma hesabı da bundan bozulmuyor: gerçek yuva ORDER'daki sırasının bir
   fazlasında duruyor, beşlinin ortası da 2 — fark yine (1 - index). */
const WALL: Country[] = ["kktc", "dubai", "ingiltere", "kktc", "dubai"];

/* ---------------------------------------------------------------- geometri */
/* Üç kapı da aynı kutuda: 220 × 330, tabanı y=330. Kutunun ALT KENARI zeminin
   ta kendisi — CSS kapıyı zemin çizgisinin üstüne oturttuğu için hiçbir kapının
   kendi tabanını çizmesi gerekmiyor, üçü de aynı çizgiye basıyor.

   Kutu tek ve ortak; içindeki kemer profili değil. "Ülke farkı" tam olarak bu
   profilde: aynı ölçüdeki üç açıklık, üç ayrı mimari.

   Renk BURADA YOK. Bütün dolgu ve çizgiler CSS değişkenlerine bağlı
   (--g3-l1..l3, --g3-line, --g3-hair). Sebebi lab-h11'den beri aynı: "yanan
   kapı bir tane" ve "koyu yüzeyde alfa yok" kurallarının tutup tutmadığı tek
   dosyadan görülsün. */

type Art = {
  /** ışık gradyanının başladığı tepe y'si — açıklığın en üst noktası */
  apex: number;
  /** açıklığın konturu: hem ışık dolgusu hem kırpma maskesi bu yoldan çıkıyor */
  open: string;
  /** yalnızca gerekliyse: desen/tanım (Dubai'nin kafesi) */
  defs?: (gid: string) => React.ReactNode;
  /** ışığın ÜSTÜNE düşen koyu parçalar: kafes, camlık çıtası, eşik taşı */
  overLight?: (gid: string) => React.ReactNode;
  /** duvara oyulmuş çizgiler: kasa, sütunçe, kemer taşları, saçak */
  frame: React.ReactNode;
};

const ART: Record<Country, Art> = {
  /* DUBAI — sivri kemer. Üç kapının en yükseği ve en darı; Körfez mimarisinin
     en kısa işareti bu. Üstteki kafes (mashrabiya) ışığın önüne geçen tek
     desen: hem kültürel işaret, hem de açıklığın üst yarısını boş bırakmıyor. */
  dubai: {
    apex: 28,
    open: "M42 330 V168 C42 108 68 56 110 28 C152 56 178 108 178 168 V330 Z",
    defs: (gid) => (
      <pattern
        id={`${gid}p`}
        width="16"
        height="16"
        patternUnits="userSpaceOnUse"
        patternTransform="translate(110 0)"
      >
        <path className="g3-screen" d="M8 0 L16 8 L8 16 L0 8 Z" />
      </pattern>
    ),
    overLight: (gid) => (
      <>
        {/* Kafes kemerin tepesinden (y=26) kemerin bindiği hizaya (y=168)
            kadar; kırpma maskesi açıklığın kendisi olduğu için dikdörtgenin
            kenarları görünmüyor. */}
        <rect
          x="40"
          y="26"
          width="140"
          height="142"
          fill={`url(#${gid}p)`}
          clipPath={`url(#${gid}c)`}
        />
        {/* Kafesin alt sınırını taşıyan kiriş. Olmadığında desen ışığın
            ortasında havada kesiliyor ve ekranda yatay bir dikiş izi
            bırakıyordu; kiriş konunca kafes bir üst pencereye, altı da kapı
            boşluğuna dönüşüyor. */}
        <path className="g3-barx" d="M42 168 H178" />
      </>
    ),
    frame: (
      <>
        {/* dış kemer (kasa) */}
        <path className="g3-ln" d="M24 330 V162 C24 96 54 40 110 10 C166 40 196 96 196 162 V330" />
        {/* iç sıva pahı — açıklığın kalınlığını veren tek çizgi */}
        <path className="g3-hr" d="M52 330 V174 C52 118 76 70 110 46 C144 70 168 118 168 174 V330" />
        {/* kemerin bindiği hizayı işaretleyen iki kısa çıkma */}
        <path className="g3-hr" d="M32 168 H50 M170 168 H188" />
      </>
    ),
  },

  /* İNGİLTERE — Georgian kapı. Yarım daire camlık (fanlight), iki sütunçe ve
     üstte korniş. Londra kapısının tanınma hızı kemerden değil, çıtalı
     camlıktan geliyor; o yüzden çıtalar ışığın üstünde koyu duruyor. */
  ingiltere: {
    apex: 90,
    open: "M42 330 V158 A68 68 0 0 1 178 158 V330 Z",
    overLight: () => (
      <>
        <path
          className="g3-bar"
          d="M110 158 L168.9 124 M110 158 L144 99.1 M110 158 V90 M110 158 L76 99.1 M110 158 L51.1 124"
        />
        <path className="g3-bar" d="M76 158 A34 34 0 0 1 144 158" />
        {/* kapı üstü kirişi: camlığı kapı boşluğundan ayıran kalın çıta */}
        <path className="g3-barx" d="M42 158 H178" />
      </>
    ),
    frame: (
      <>
        <path className="g3-ln" d="M34 330 V158 A76 76 0 0 1 186 158 V330" />
        <path className="g3-hr" d="M22 330 V70 M198 330 V70" />
        <path className="g3-ln" d="M12 70 H208" />
        <path className="g3-hr" d="M16 60 H204" />
      </>
    ),
  },

  /* KKTC — yuvarlak taş kemer. En alçak ve en geniş açıklık; Akdeniz taş
     yapısının oranı bu. Kemer taşları (voussoir) ışıltıya değil çizgiye
     bırakılmış: bu kapının karakteri ışıkta değil, örgüsünde. */
  kktc: {
    apex: 132,
    open: "M46 330 V196 A64 64 0 0 1 174 196 V330 Z",
    overLight: () => <path className="g3-bar" d="M46 320 H174" />,
    frame: (
      <>
        <path className="g3-ln" d="M30 330 V196 A80 80 0 0 1 190 196 V330" />
        {/* Kemer taşları çizginin kendisi kadar önemli: bu kapının karakteri
            ışıkta değil örgüsünde. O yüzden ince değil ana kalemle çiziliyor —
            ilk denemede saç teli kalınlığında çizilmişti ve ekranda hiç
            görünmüyorlardı. */}
        <path
          className="g3-ln"
          d="M165.4 164 L179.3 156 M142 140.6 L150 126.7 M110 132 V116 M78 140.6 L70 126.7 M54.6 164 L40.7 156"
        />
        {/* Kemeri saracak dik payandalar ve düz saçak. Saçak tek başına
            duruyordu ve kapının üstünde asılı kalmış bir çizgi gibi
            okunuyordu; payandalar onu kemere bağlayınca ortaya Akdeniz taş
            portali çıkıyor — kemerli boşluk, dikdörtgen çerçeve. */}
        <path className="g3-hr" d="M30 196 V106 M190 196 V106" />
        <path className="g3-ln" d="M20 106 H200" />
        <path className="g3-hr" d="M24 96 H196" />
      </>
    ),
  },
};

/** Tek kapı. Işık ayrı bir katman: sönükken opaklığı 0, yanınca 1 — arada
 *  duran hiçbir hâl yok, yani "koyu yüzeyde alfa yok" kuralı duruyor. */
function Door({ c }: { c: Country }) {
  /* Aynı sayfada iki sahne olursa gradyan/desen kimlikleri çakışmasın. useId
     iki nokta üretiyor ve url(#…) referansında kaçırılması gerekiyor; en ucuzu
     atmak. */
  const gid = `g3${useId().replace(/:/g, "")}${c}`;
  const a = ART[c];

  return (
    <svg className="g3-svg" viewBox="0 0 220 330" aria-hidden="true" focusable="false">
      <defs>
        {/* Işık dikey bir rampa: tepede neredeyse siyah, eşiğe doğru açılıyor.
            userSpaceOnUse çünkü kemerin tepesi ülkeye göre değişiyor — gradyan
            her kapıda kendi açıklığına göre hizalanıyor. */}
        <linearGradient
          id={`${gid}l`}
          gradientUnits="userSpaceOnUse"
          x1="110"
          y1={a.apex}
          x2="110"
          y2="330"
        >
          <stop offset="0" stopColor="var(--g3-l3)" />
          <stop offset="0.5" stopColor="var(--g3-l2)" />
          <stop offset="1" stopColor="var(--g3-l1)" />
        </linearGradient>
        <clipPath id={`${gid}c`}>
          <path d={a.open} />
        </clipPath>
        {a.defs?.(gid)}
      </defs>

      {/* sönük hâl: açıklık duvardan koyu bir boşluk */}
      <path className="g3-void" d={a.open} />

      <g className="g3-lit">
        <path d={a.open} fill={`url(#${gid}l)`} />
        {/* ışığın kasaya vurduğu ince kenar — derinliği veren tek şey bu */}
        <path className="g3-rim" d={a.open} />
        {a.overLight?.(gid)}
      </g>

      <g className="g3-frame">{a.frame}</g>
    </svg>
  );
}

export default function HeroGlobeG3() {
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);
  const still = useReducedMotion();

  /* Işıklar ilk karede yanmıyor: bir kare sonra yanıyorlar, böylece açılışta
     "ışık yandı" geçişi bedavaya geliyor (ayrı bir animasyon yazmadan). Hareket
     azaltılmışsa beklemek anlamsız — geçiş zaten olmayacak. */
  const [lit, setLit] = useState(false);
  useEffect(() => {
    /* Gecikme zamanlayıcının içinde, dışında değil: efekt gövdesinde doğrudan
       setState çağırmak zincirleme render üretiyor (react-hooks kuralı da
       bunu yakalıyor). Hareket azaltılmışsa süre sıfır — bekleyecek bir geçiş
       zaten yok. */
    const t = window.setTimeout(() => setLit(true), still ? 0 : 120);
    return () => window.clearTimeout(t);
  }, [still]);

  /* Seçili olanı yeniden seçmek hiçbir şey yapmıyor. Küçük ama gerçek bir
     fark: aynı bayrağın üstüne ikinci kez gelmek, tıklamak ya da ok tuşuyla
     gelip odaklanmak (odak da seçiyor) aynı olayı dataLayer'a üç kez
     yazıyordu. Sahne de gereksiz yere yeniden hesaplanmıyor. */
  const pick = useCallback(
    (c: Country) => {
      if (c === country) return;
      setCountry(c);
      gtm("hero_globe_country", { country: c });
    },
    [country, setCountry],
  );

  /* Gerçek tablist klavye davranışı: ok tuşları seçimi taşıyor ve odağı da
     götürüyor. Buton listesini DOM'dan okuyoruz — üç düğme için ref dizisi
     tutmak gereksiz. */
  const onKey = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const i = ORDER.indexOf(country);
      let next = -1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % ORDER.length;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + ORDER.length) % ORDER.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = ORDER.length - 1;
      if (next < 0) return;
      e.preventDefault();
      pick(ORDER[next]);
      const tabs = e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      tabs[next]?.focus();
    },
    [country, pick],
  );

  const index = ORDER.indexOf(country);

  return (
    <div className="g3" data-still={still ? "" : undefined}>
      {/* ---- seçici: hero'daki kalıbın aynısı, kendi ad alanında ---- */}
      <div className="g3-pick">
        <div className="g3-tabs" role="tablist" aria-label="Ülke seçin" onKeyDown={onKey}>
          {ORDER.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={country === c}
              className="g3-tab"
              data-on={country === c}
              onMouseEnter={() => pick(c)}
              onFocus={() => pick(c)}
              onClick={() => pick(c)}
            >
              <span className="g3-tab-disc">
                <Flag country={c} />
              </span>
              <span className="g3-tab-name">{COUNTRY_NAMES[c]}</span>
            </button>
          ))}
        </div>

        <SmartLink href="/uygunluk-testi" className="g3-unsure">
          Emin değilim, bana uygun olanı bul
          <span aria-hidden="true">→</span>
        </SmartLink>
      </div>

      {/* ---- sahne ---- */}
      <div className="g3-stage">
        {/* Duvarın kendisi çizilmiyor: sahne zemini hero'nun #080808'i. Tek
            sebep teknik ve önemli — duvara bir ton verilseydi, üstüne düşen
            ışık huzmelerinin dış kenarı (#080808'te biten gradyanlar) duvardan
            koyu bir dikdörtgen olarak görünürdü. Duvar zaten siyahken huzmenin
            dış kenarı hiçbir iz bırakmıyor, alfa da gerekmiyor. Odada ışıktan
            başka bir şey yok; sahnenin sertliği de buradan geliyor. */}

        {/* Duvar kayıyor, kapılar değil: track'in kendi genişliğinin yarısı
            kadar sola çekilmesi orta yuvayı ortalıyor; --g3-slide ise seçilen
            yuvaya kadar olan farkı ekliyor. Ölçüm yok, ResizeObserver yok —
            kaydırma tamamen CSS uzunluk aritmetiği. */}
        <div
          className="g3-track"
          aria-hidden="true"
          style={{ "--g3-slide": `${1 - index}` } as React.CSSProperties}
        >
          {WALL.map((c, pos) => (
            <div
              key={`${c}-${pos}`}
              className="g3-slot"
              data-c={c}
              /* yalnızca GERÇEK yuva yanıyor; uçlardaki kopyalar hep sönük */
              data-on={lit && pos === ORDER.indexOf(country) + 1}
            >
              <div className="g3-doorwrap">
                <span className="g3-glow" />
                <Door c={c} />
                <span className="g3-spill" />
              </div>

              <div className="g3-plates">
                <div className="g3-plate">
                  <span className="g3-plate-top">{COUNTRY_NAMES[c]}</span>
                  <strong className="g3-plate-name">Şirketiniz</strong>
                  <span className="g3-plate-line">{FACTS[c].structure}</span>
                </div>
                <div className="g3-plate g3-plate-sm">Ortac Global tarafından yürütülür</div>
              </div>
            </div>
          ))}
        </div>

        {/* Zemin çizgisi şeritten SONRA: hâlenin opak kutusu onu bir piksel
            siliyordu, ayrıca duvar-yer birleşimi kapı boşluğunun önünden de
            geçer — eşik dediğimiz şey zaten o çizgi. */}
        <span className="g3-floorline" aria-hidden="true" />

        {/* sahnenin tamamı dekoratif; durumu okuyan tek yer burası */}
        <p className="g3-sr" aria-live="polite">
          {COUNTRY_NAMES[country]} seçildi — {FACTS[country].structure}.
        </p>
      </div>
    </div>
  );
}
