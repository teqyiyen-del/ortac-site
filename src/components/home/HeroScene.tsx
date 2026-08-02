"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { useReducedMotion } from "motion/react";
import SmartLink from "@/components/shared/SmartLink";
import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import { FACTS } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { gtm } from "@/lib/gtm";
import { useOrtacStore, type Country } from "@/lib/store";

/* ============================ TABELANIN ÇENGELİ ============================
   Kapının yanında yazacak tek satır: o ülkenin EN ÇOK TERCİH EDİLME SEBEBİ.

   Cümle uydurulmuyor — her ülkenin kendi sayfasında zaten yayınlanmış olan
   avantaj listesinden (countryContent · pros) seçiliyor. Seçim ikonla
   yapılıyor, sıra numarasıyla değil: listeye yeni bir madde eklendiğinde ya da
   sıralama değiştiğinde çengelin kayması gerekmiyor.

   NEDEN DUBAİ'DE pros[0] DEĞİL
   Dubai'nin ilk maddesi "Kurumlar vergisi %0*" ve yıldız gerçek bir şart
   taşıyor ("şart ihlalinde standart oran uygulanır"). Hero'da dipnot yeri yok;
   koşulu olmayan bir vergi iddiası burada yanlış beyan olur. Yerine Dubai'nin
   üç ülke içinde GERÇEKTEN tek olduğu şey alındı: şirketin oturum vizesi
   getirmesi. Koşulsuz, doğrulanmış ve ayırt edici. */
const HOOK_ICON: Record<Country, string> = {
  dubai: "id", // "Oturum vizesi alabiliyorsunuz"
  ingiltere: "remote", // "Ziyaret şartı yok"
  kktc: "pin", // "Türkiye'ye yakın"
};

function hookFor(c: Country): string {
  const pros = COUNTRY_CONTENT[c].pros;
  return (pros.find((p) => p.icon === HOOK_ICON[c]) ?? pros[0]).title;
}

/* ============================================================================
   HERO SAHNESİ — CANLI · "EŞİK"
   Ana sayfa hero'sunun varsayılan sahnesi. CSS: src/app/css/hero-scene.css
   Ad alanı .hsc- (lab kopyası .g3- kullanıyor, ikisi aynı sayfada olabilir).

   ------------------------------------------------- ÖNCE: BU GÖRSELİN İŞİ NE?

   Küre ne diyordu: "dünya çapında çalışıyoruz". Müşteri onu klişe buldu, çünkü
   klişe. Ama asıl mesele beğeni değil: o cümle zaten kimsenin sormadığı bir
   sorunun cevabı. Hero'ya gelen kişi "bu firma dünya çapında mı" diye
   düşünmüyor; "ben nereye kurayım, kurunca elime ne geçiyor" diye düşünüyor.

   Bu yüzden görselin işi yeniden tanımlandı:

     Görselin işi, seçilen ülkede KURULMUŞ ŞİRKETİN kendisini göstermek.
     Yani vaadi değil sonucu: bir kapı, yanında sizin şirketinizin tabelası,
     tabelada o ülkenin tüzel biçimi.

   H1 zaten "Şirketinizi kurun, sonrasını da biz yürütelim" diyor. Görselin işi
   o cümlenin NESNESİNİ göstermek — cümlenin geçtiği gezegeni değil.

   Küreden üç somut ayrım (ölçek tersine döndü, küre 10.000 km'den bakıyordu,
   bu sahne göz hizasından bakıyor):

   1) COĞRAFYA HİÇ YOK. Projeksiyon, kıyı çizgisi, enlem/boylam, İstanbul
      rotası, nokta bulutu yok; globeGeo.ts'ten tek bayt okunmuyor. Ülke;
      MİMARİ + TÜZEL BİÇİM + IŞIĞIN RENGİ ile anlatılıyor.
   2) SİLUET DE YOK. Şehir silueti bilerek elendi: bu sektörde Burj Khalifa
      silueti küreden bile çok kullanılıyor. Şehir değil, tek bir kapı.
   3) ANLATILAN ŞEY DEĞİŞTİ. Kürede değişen bilgi "bu ülke şurada"ydı; burada
      "bu ülkede şirketiniz şu biçimde duruyor" (brand.ts → FACTS.structure).

   Mekanik kürenin aynısı: üstte üç bayraklı seçici, seçim sahneyi değiştiriyor.
   Duvar yatayda kayıp seçilen kapıyı ortaya alıyor ve yalnızca onun ışığı
   yanıyor — küre dönüp ülkeyi ortaya alıyordu, burada duvar kayıp kapıyı
   ortaya alıyor.

   İÇERİK SINIRI: tabelada gün sayısı, fiyat, banka vaadi yok. Sahne yalnızca
   ülke adı + tüzel biçim söylüyor; ikisi de brand.ts'te yazılı ve iddia değil.

   ======================= LAB KOPYASINDAN (G3) FARKLARI =======================
   Lab kopyası (src/components/lab/HeroGlobeG3.tsx + css/lab-g3.css) KARAR
   KAYDI olarak yerinde duruyor ve /lab/hero-dunya onu basmaya devam ediyor.
   Bu dosya onun canlı sürümü; ikisi arasında bilerek üç fark var.

   1) DIŞ GRADYAN DURAKLARI ARTIK OPAK SİYAH DEĞİL, SAYDAM.
      Lab kopyasının birinci kuralı "sahne siyah, huzmeler #080808'te bitiyor"
      idi ve doğruydu: zemin saf #080808 iken opak bir durak iz bırakmaz.
      Canlıda hero'nun ARKASINDA artık bir ızgara var (bkz. .hsc-bg). Aynı
      kutu orada ızgarayı silen opak bir dikdörtgen olurdu — ilk denemede kapı
      hâlesi ekranda 230% genişliğinde siyah bir bant olarak göründü.
      Duraklar #080808 yerine rgba(8,8,8,0) oldu. Görüntü siyah zeminde
      MATEMATİKSEL OLARAK AYNI: premultiplied alfa ile (C→şeffaf siyah)
      geçişi, (C→#080808) geçişiyle birebir aynı pikseli veriyor, çünkü dış
      durak zaten zeminin kendisiydi. Değişen tek şey, ızgaranın altından
      görünebilmesi. Ayrıntı hero-scene.css'te.

   2) data-still ARTIK DOM'A YAZILMIYOR.
      Lab kopyası kökte `data-still={still ? "" : undefined}` taşıyor.
      useReducedMotion sunucuda false, istemcinin İLK render'ında gerçek medya
      sorgusu değerini döndürüyor (framer-motion: useState(prefersReducedMotion
      .current)); yani hareket azaltma açıkken sunucu ve istemci ağacı bu
      öznitelikte ayrışıyor — hidrasyon hatası. Lab sayfasında bugüne kadar
      görünmedi, ama ana sayfa canlı: hareket tercihine göre DEĞİŞEN TEK ŞEY
      SÜRE olmalı, render edilen ağaç değil. Kanca yalnızca ilk yanma
      gecikmesini (120ms → 0) belirliyor, o da bir effect'in içinde.
      Geçişleri durdurma işi tamamen CSS'e, @media (prefers-reduced-motion)
      kuralına geçti — desen kalıyor, hareket gidiyor.

   3) AD ALANI .g3- → .hsc-, değişkenler --g3-* → --hsc-*.
      Zorunlu: lab-g3.css import edilmeye devam ediyor ve /lab/hero-dunya'da
      G3 ile bu hero aynı sayfada bulunabilir. Aynı seçici adı iki dosyanın
      birbirini sessizce ezmesi demek — bu depoda yaşandı.

   ------------------------------------------------------------------- MALİYET
   globeGeo.ts'e tek import yok: 320 KB'lık nokta verisi tamamen dışarıda.
   Çalışma anında nokta bulutu, dönen projeksiyon, canvas/WebGL, ResizeObserver
   ve boşta dönen animasyon yok. Seçim anında iş yapan tek şey bir transform
   geçişi ile birkaç renk/opaklık geçişi; onlar bitince sahne tamamen duruyor.

   ERİŞİLEBİLİRLİK: sahnenin tamamı aria-hidden (dekoratif tekrar), durumu
   okuyan tek yer görsel olarak gizli bir aria-live satırı. Seçici gerçek
   tablist ve zustand'daki tek mağazayı sürüyor — hero'daki seçim sayfanın
   geri kalanını (ThreeCountries, fiyat özeti, hesaplayıcı) sürmeye devam
   ediyor, bu bağ kopmadı.
   ========================================================================= */

const ORDER: Country[] = ["dubai", "ingiltere", "kktc"];

/* Duvarda BEŞ kapı var, üç değil. Sebep tamamen kompozisyon: üç kapılık bir
   şeritte uçtaki ülkeyi (Dubai ya da KKTC) seçtiğinizde bir yan komple boş
   kalıyor — ekranın yarısı bomboş siyah oluyor ve sahne "kesilmiş" duruyor.
   Baştaki ve sondaki iki kapı, sıranın öbür ucundaki kapının aynısı; hiçbir
   zaman yanmıyorlar, yalnızca sokağın devam ettiğini söylüyorlar. İkisi de
   ekranda aynı anda görünmüyor (aralarında üç yuva var), o yüzden tekrar
   fark edilmiyor.

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
   (--hsc-l1..l3, --hsc-line, --hsc-hair), yani "yanan kapı bir tane" kuralı
   tek bir seçicide duruyor ve buradan ihlal edilemiyor. */

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
        <path className="hsc-screen" d="M8 0 L16 8 L8 16 L0 8 Z" />
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
        <path className="hsc-barx" d="M42 168 H178" />
      </>
    ),
    frame: (
      <>
        {/* dış kemer (kasa) */}
        <path className="hsc-ln" d="M24 330 V162 C24 96 54 40 110 10 C166 40 196 96 196 162 V330" />
        {/* iç sıva pahı — açıklığın kalınlığını veren tek çizgi */}
        <path className="hsc-hr" d="M52 330 V174 C52 118 76 70 110 46 C144 70 168 118 168 174 V330" />
        {/* kemerin bindiği hizayı işaretleyen iki kısa çıkma */}
        <path className="hsc-hr" d="M32 168 H50 M170 168 H188" />
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
          className="hsc-bar"
          d="M110 158 L168.9 124 M110 158 L144 99.1 M110 158 V90 M110 158 L76 99.1 M110 158 L51.1 124"
        />
        <path className="hsc-bar" d="M76 158 A34 34 0 0 1 144 158" />
        {/* kapı üstü kirişi: camlığı kapı boşluğundan ayıran kalın çıta */}
        <path className="hsc-barx" d="M42 158 H178" />
      </>
    ),
    frame: (
      <>
        <path className="hsc-ln" d="M34 330 V158 A76 76 0 0 1 186 158 V330" />
        <path className="hsc-hr" d="M22 330 V70 M198 330 V70" />
        <path className="hsc-ln" d="M12 70 H208" />
        <path className="hsc-hr" d="M16 60 H204" />
      </>
    ),
  },

  /* KKTC — yuvarlak taş kemer. En alçak ve en geniş açıklık; Akdeniz taş
     yapısının oranı bu. Kemer taşları (voussoir) ışıltıya değil çizgiye
     bırakılmış: bu kapının karakteri ışıkta değil, örgüsünde. */
  kktc: {
    apex: 132,
    open: "M46 330 V196 A64 64 0 0 1 174 196 V330 Z",
    overLight: () => <path className="hsc-bar" d="M46 320 H174" />,
    frame: (
      <>
        <path className="hsc-ln" d="M30 330 V196 A80 80 0 0 1 190 196 V330" />
        {/* Kemer taşları çizginin kendisi kadar önemli: bu kapının karakteri
            ışıkta değil örgüsünde. O yüzden ince değil ana kalemle çiziliyor —
            ilk denemede saç teli kalınlığında çizilmişti ve ekranda hiç
            görünmüyorlardı. */}
        <path
          className="hsc-ln"
          d="M165.4 164 L179.3 156 M142 140.6 L150 126.7 M110 132 V116 M78 140.6 L70 126.7 M54.6 164 L40.7 156"
        />
        {/* Kemeri saracak dik payandalar ve düz saçak. Saçak tek başına
            duruyordu ve kapının üstünde asılı kalmış bir çizgi gibi
            okunuyordu; payandalar onu kemere bağlayınca ortaya Akdeniz taş
            portali çıkıyor — kemerli boşluk, dikdörtgen çerçeve. */}
        <path className="hsc-hr" d="M30 196 V106 M190 196 V106" />
        <path className="hsc-ln" d="M20 106 H200" />
        <path className="hsc-hr" d="M24 96 H196" />
      </>
    ),
  },
};

/** Tek kapı. Işık ayrı bir katman: sönükken opaklığı 0, yanınca 1 — arada
 *  duran hiçbir hâl yok, yani "koyu yüzeyde alfa yok" kuralı duruyor. */
function Door({ c }: { c: Country }) {
  /* Aynı sayfada iki sahne olursa (lab: G3 + bu) gradyan/desen kimlikleri
     çakışmasın. useId iki nokta üretiyor ve url(#…) referansında kaçırılması
     gerekiyor; en ucuzu atmak. */
  const gid = `hsc${useId().replace(/:/g, "")}${c}`;
  const a = ART[c];

  return (
    <svg className="hsc-svg" viewBox="0 0 220 330" aria-hidden="true" focusable="false">
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
          <stop offset="0" stopColor="var(--hsc-l3)" />
          <stop offset="0.5" stopColor="var(--hsc-l2)" />
          <stop offset="1" stopColor="var(--hsc-l1)" />
        </linearGradient>
        <clipPath id={`${gid}c`}>
          <path d={a.open} />
        </clipPath>
        {a.defs?.(gid)}
      </defs>

      {/* sönük hâl: açıklık duvardan koyu bir boşluk */}
      <path className="hsc-void" d={a.open} />

      <g className="hsc-lit">
        <path d={a.open} fill={`url(#${gid}l)`} />
        {/* ışığın kasaya vurduğu ince kenar — derinliği veren tek şey bu */}
        <path className="hsc-rim" d={a.open} />
        {a.overLight?.(gid)}
      </g>

      <g className="hsc-frame">{a.frame}</g>
    </svg>
  );
}

export default function HeroScene() {
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);

  /* Hareket tercihinin DOM'a hiç dokunmadığı tek kullanım: aşağıdaki
     zamanlayıcının süresi. Kökte data-still yok, sınıf yok, koşullu düğüm yok
     — sunucunun bilmediği bir bilgi istemcinin ilk render'ında ağacı
     değiştirseydi hidrasyon hatası olurdu (farkların 2. maddesi). Geçişleri
     durduran kural CSS'te, @media (prefers-reduced-motion: reduce) altında. */
  const still = useReducedMotion();

  /* Işıklar ilk karede yanmıyor: bir kare sonra yanıyorlar, böylece açılışta
     "ışık yandı" geçişi bedavaya geliyor (ayrı bir animasyon yazmadan).
     Başlangıç değeri sunucuda da istemcide de false, yani ilk boyanan ağaç
     iki tarafta aynı. */
  const [lit, setLit] = useState(false);
  useEffect(() => {
    /* Gecikme zamanlayıcının içinde, dışında değil: efekt gövdesinde doğrudan
       setState çağırmak zincirleme render üretiyor. Hareket azaltılmışsa süre
       sıfır — bekleyecek bir geçiş zaten yok. */
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
    <div className="hsc">
      {/* ---- seçici: hero'daki kalıbın aynısı, kendi ad alanında ---- */}
      <div className="hsc-pick">
        <div className="hsc-tabs" role="tablist" aria-label="Ülke seçin" onKeyDown={onKey}>
          {ORDER.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={country === c}
              className="hsc-tab"
              data-on={country === c}
              onMouseEnter={() => pick(c)}
              onFocus={() => pick(c)}
              onClick={() => pick(c)}
            >
              <span className="hsc-tab-disc">
                <Flag country={c} />
              </span>
              <span className="hsc-tab-name">{COUNTRY_NAMES[c]}</span>
            </button>
          ))}
        </div>

        <SmartLink href="/uygunluk-testi" className="hsc-unsure">
          Emin değilim, bana uygun olanı bul
          <span aria-hidden="true">→</span>
        </SmartLink>
      </div>

      {/* ---- sahne ---- */}
      <div className="hsc-stage">
        {/* Duvarın kendisi çizilmiyor: sahne zemini hero'nun #080808'i. Odada
            ışıktan başka bir şey yok; sahnenin sertliği de buradan geliyor. */}

        {/* Duvar kayıyor, kapılar değil: track'in kendi genişliğinin yarısı
            kadar sola çekilmesi orta yuvayı ortalıyor; --hsc-slide ise seçilen
            yuvaya kadar olan farkı ekliyor. Ölçüm yok, ResizeObserver yok —
            kaydırma tamamen CSS uzunluk aritmetiği. */}
        <div
          className="hsc-track"
          aria-hidden="true"
          style={{ "--hsc-slide": `${1 - index}` } as React.CSSProperties}
        >
          {WALL.map((c, pos) => (
            <div
              key={`${c}-${pos}`}
              className="hsc-slot"
              data-c={c}
              /* yalnızca GERÇEK yuva yanıyor; uçlardaki kopyalar hep sönük */
              data-on={lit && pos === ORDER.indexOf(country) + 1}
            >
              <div className="hsc-doorwrap">
                <span className="hsc-glow" />
                <Door c={c} />
                <span className="hsc-spill" />
              </div>

              {/* TABELA: KAPININ ARDINDA NE VAR — "Şirketiniz" değil.

                  Eski hâli üç satırdı ve ikisi boştu: büyük harflerle
                  "Şirketiniz" (her kapıda aynı, dolayısıyla hiçbir şey
                  söylemiyor) ve altında ikinci bir tabelada "Ortac Global
                  tarafından yürütülür" (sitenin tamamı zaten bizim, kapının
                  yanında tekrar etmesi bilgi değil imza).

                  Yerine kapının gerçek cevabı geldi: bu eşikten geçince ELDE
                  EDİLEN tüzel biçim ve TİPİK SÜRESİ. İkisi de üç ülkede
                  gerçekten farklı, yani tabela ülke değiştikçe bir şey
                  söylüyor — sahnenin bütün fikri buydu. İkisi de brand.ts'teki
                  FACTS'ten; elle yazılmış tek kelime yok. */}
              {/* Büyük yazan ÜLKE ADI ve rengi o ülkenin bayrağından; altında
                  tek satır, ülkenin en çok tercih edilme sebebi. Süre bilerek
                  yok — kapının yanında beklenen şey "ne kadar sürer" değil
                  "neden burası". */}
              <div className="hsc-plates">
                <div className="hsc-plate">
                  <strong className="hsc-plate-name">{COUNTRY_NAMES[c]}</strong>
                  <span className="hsc-plate-line">{hookFor(c)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zemin çizgisi şeritten SONRA: hâlenin kutusu onu bir piksel
            siliyordu, ayrıca duvar-yer birleşimi kapı boşluğunun önünden de
            geçer — eşik dediğimiz şey zaten o çizgi. */}
        <span className="hsc-floorline" aria-hidden="true" />

        {/* sahnenin tamamı dekoratif; durumu okuyan tek yer burası */}
        <p className="hsc-sr" aria-live="polite">
          {COUNTRY_NAMES[country]} seçildi — {FACTS[country].structure}.
        </p>
      </div>
    </div>
  );
}
