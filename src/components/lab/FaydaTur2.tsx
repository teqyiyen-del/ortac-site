import { CalendarCheck, ChartColumn, ChevronDown, Landmark, Stamp } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { ACCOUNTING_DUBAI } from "@/lib/accountingDubai";

/* /dubai/muhasebe · #fayda ("Düzenli muhasebenin karşılığı") · İKİNCİ TUR
   Biçim: src/app/css/lab-fayda2.css · .fyr- Ray · .fy2g- Tek sahne · .fyo- Omurga

   Müşteri: "kral çok aşırı sade olmuş biraz arasını bulmamız lazım muhasebe
   sayfası için. labda yaptığın kısımdan f3 ü biraz beğendim mesela ama
   sağdakilerin her birinde soldaki şey de değişebilir. süreç kısmı gibi
   düşünerek yapabilirsin belki burayı ya da tek bir şey olup çok daha hareketli
   animasyon olur onu sana bırakıyorum."

   Birinci turun teşhisi: F3 doğru eksende ama soldaki tek sahne SABİT, sağdaki
   dört satır ÖLÜ. Üç adayın üçü de bu iki ölüyü kaldırıyor, üç ayrı yoldan.

   ÜÇÜ DE SUNUCU BİLEŞENİ, TARAYICIYA BU DOSYADAN JS İNMİYOR. Seçim durumunu
   native radyo + CSS `:has(:checked)` taşıyor. Kalıp bu depoda ZATEN çalışıyor
   ve ölçülerek doğrulandı: css/lab-hak-levha.css (iki okuma çipi, `#lhl-a`),
   css/partnerlik.css (.pt-chip), css/fittest.css ve css/iletisim.css (gizli
   native radyo + görünür kabuk). Yani "use client" yazmak için bir sebep yok;
   useReducedMotion tuzağı (tuzak A) da böylece hiç doğmuyor, reduce kapısı
   CSS'te kuruluyor.

   HAREKET İLKESİ AccountingHandover'ın ilkesi: DOM'a yeni nesne eklenmiyor.
   Uçan belge, kıvılcım kabı, ekrana giren kopya yok — zaten orada olan şeyler
   sırayla yanıyor, kayıyor, adım atıyor. Aktarım gerektiren iki adayda
   (G2 · G3) mekanizma sitenin PAYLAŞILAN kalıbından geliyor
   (css/aktarim.css · .akt / .akt-durak); bu dosya orada tek bir keyframe
   yazmıyor, yalnız değer veriyor.

   ÇİZİM KURALI (ProcessScroll.tsx'in kuralı) korunuyor: hiçbir sahne gerçek bir
   belgenin, bankanın ya da otoritenin taklidi değil. Firma adı, tutar, tarih,
   oran, rozet ve "onaylandı" gibi karar sözcüğü yok; sahnelerin hepsi
   aria-hidden ve söyledikleri her şey yanlarındaki yazıda zaten yazılı. */

const G = ACCOUNTING_DUBAI.gains;

/* Kalemin ikonu veri dosyasındaki `icon` adından geliyor; dört satırlık dal
   canlı sayfanın ICON haritasıyla aynı eşleme. */
const IC = [CalendarCheck, ChartColumn, Landmark, Stamp] as const;

/* KISALTILMIŞ MEKANİZMA CÜMLELERİ — birinci turdan devralındı ve tek kelimesi
   değişmedi. Kaynak accountingDubai.ts · gains.items[].line; canlı cümleler
   ortalama 95 karakter ve müşteri az yazı istiyor. Kısaltma veri dosyasına
   YAZILMADI (canlı sayfa aynen duruyor). YENİ İDDİA KURULMADI: atılan kısım
   ya tekrar ya örnekleme.
     0 · "…; yukarıdaki şerit onu gösteriyor" düştü — sayfanın kendi takvimine
         yapılan bir yönlendirme, bölümün cümlesi değil.
     1 · "Gelir-gider tablosu, bilanço ve nakit akışı" bir örnekleme; iddia
         "aynı defterden çıkıyor" ve "kararlarınız için".
     2 · "güncel mali tablolar ve dayanak kayıtları" yine örnekleme; iddia
         "hep aynı" ve "ayrıca hazırlanmıyor".
     3 · yalnızca "şartın sağlandığını" kısaldı.

   BU DİZİ ARTIK BURADA DURUYOR, FaydaAdaylar.tsx'te DEĞİL: birinci turun iki
   adayı (F1 Bento, F2 Sahne) bu turda silindi, geriye kalan F3 referans olarak
   duruyor ve metnin tek kopyası ikisinde de aynı kalsın diye buradan okunuyor. */
export const KISA = [
  "Hangi ay hangi kalemin doğduğu baştan belli.",
  "Aynı defterden çıkıyor: vergi için değil, kararlarınız için.",
  "İstenen belgeler hep aynı; ay ay tutulunca ayrıca hazırlanmıyor.",
  "Nitelikli mükellefiyet otomatik gelmiyor; şartı kayıtlar gösteriyor.",
];

/** başlık — dört adayda da birebir aynı, karşılaştırma yalnız gövdede.

    LEAD YOK ve bu bir unutma değil, /lab/muhasebe'de verilmiş bir kararın
    buraya taşınması. Canlı verinin lead'i ("Dördü de bir vaat değil, kaydın
    ay ay tutulmasının doğrudan sonucu.") o sayfada silindi: bölüm kimsenin
    yöneltmediği bir suçlamaya karşı kendini savunuyordu (gerekçe
    app/lab/muhasebe/veri.ts · KARSILIK). Aday seçildiğinde o sayfaya girecek;
    burada lead'le kıyaslanırsa müşteri canlıya girmeyecek bir cümleyi de
    değerlendirmiş olurdu. */
export function FaydaBas() {
  return (
    <div className="sec-head">
      <SplitWords
        as="h2"
        text={G.heading}
        accent={G.accent}
        className="h2"
        style={{ color: "var(--text-900)" }}
      />
    </div>
  );
}

/* ============================================================================
   DÖRT SAHNE — G1 ve G3 ORTAK KULLANIYOR

   Dördü de AYNI viewBox'ta (380 × 210) ve aynı dış panelin içinde. Bu bir üslup
   tercihi değil iki ayrı işi birden çözüyor:

   1) SAHNE DEĞİŞİRKEN KART BOYU DEĞİŞMİYOR. ProcessScroll'un ölçülmüş dersi
      (pr5-sizer yorumu): farklı boydaki beş mock 3,6 saniyede bir takas olunca
      panel kendi kendine 76 piksel büyüyüp küçülüyor ve sayfanın kalanını
      itiyor. Orada çözüm beş kopyayı aynı ızgara gözüne yığmaktı; burada aynı
      sonuç DAHA UCUZA geliyor, çünkü dört sahnenin viewBox'ı zaten aynı —
      yükseklik hiçbir genişlikte oynamıyor.
   2) DÖRT KALEM AYNI DEFTERİN DÖRT OKUMASI. Aynı panelin içinde farklı şeyler
      olması bölümün kendi cümlesini söylüyor: "dördü de … kaydın ay ay
      tutulmasının doğrudan sonucu."

   Çizim dili sitenin kendi dili (.svx-*, globals.css). Bu dosya yeni renk, yeni
   kalınlık, yeni yüzey kademesi tanımlamıyor.
   ========================================================================== */

/** dış panel — dört sahnede de birebir aynı, tek yerde duruyor */
function Panel() {
  return <rect x="12" y="14" width="356" height="182" rx="16" className="svx-box" />;
}

/* 1 · TAKVİM — "Beyan takvimi kaçmıyor"
   On iki eş kutu ve üstünde ay ay SIÇRAYAN tek işaret. Kutuların hepsi AYNI:
   dolu/boş ayrımı yapılsaydı sayfanın gerçek takviminin (afterSetup · yearLanes)
   uydurma bir kopyası çıkardı. Sahnede tek bir ay adı, tarih ya da sayı yok. */
function SahneTakvim() {
  const aylar = Array.from({ length: 12 }, (_, i) => 32 + i * 26);
  return (
    <svg viewBox="0 0 380 210" className="fy2-svg" focusable="false" aria-hidden="true">
      <Panel />
      <rect x="32" y="34" width="92" height="7" rx="3.5" className="svx-bar" />
      <path d="M32 58 H348" className="svx-line" />
      {aylar.map((x) => (
        <rect key={x} x={x} y="76" width="20" height="20" rx="6" className="svx-box-2" />
      ))}
      {/* işaret ilk kutunun üstünde duruyor; hareket onu 26'şar piksel taşıyor */}
      <rect x="32" y="76" width="20" height="20" rx="6" fill="#307fe2" className="fy2-ay" />
      <path d="M32 114 H348" className="svx-line" />
      {[
        [132, 196],
        [150, 150],
        [168, 172],
      ].map(([y, w]) => (
        <rect key={y} x="32" y={y} width={w} height="7" rx="3.5" className="svx-bar" />
      ))}
      <rect x="270" y="128" width="68" height="48" rx="12" className="svx-box-2" />
      <CalendarCheck x={292} y={140} width={24} height={24} strokeWidth={1.9} className="svx-ic-b" />
    </svg>
  );
}

/* 2 · TABLO — "Kâr ve zarar yıl kapanmadan görünüyor"
   Sütun yükseklikleri ETİKETSİZ ve eksensiz: bir tablo ŞEKLİ, bir veri değil.
   Altındaki mavi çizgi ay ay yer değiştiriyor — "yıl kapanmadan güncelleniyor".
   İkon yok, bilerek: sütunların kendisi zaten ikon. */
function SahneTablo() {
  const boy = [30, 44, 26, 52, 38, 60, 34, 48, 42, 56, 32, 46];
  return (
    <svg viewBox="0 0 380 210" className="fy2-svg" focusable="false" aria-hidden="true">
      <Panel />
      <rect x="32" y="34" width="92" height="7" rx="3.5" className="svx-bar" />
      <path d="M32 66 H348" className="svx-line" />
      <path d="M32 104 H348" className="svx-line" />
      {boy.map((h, i) => (
        <rect
          key={i}
          x={32 + i * 26}
          y={148 - h}
          width="16"
          height={h}
          rx="4"
          className="svx-bar-mid"
        />
      ))}
      <path d="M32 152 H348" className="svx-line" />
      <rect x="32" y="158" width="16" height="4" rx="2" fill="#307fe2" className="fy2-sut" />
    </svg>
  );
}

/* 3 · DOSYA — "Banka ve denetim talebi hazır dosya buluyor"
   Gelen talep solda, hazır dosya sağda. Landmark ikonu jenerik: belirli bir
   bankanın adı, logosu ya da rengi yok (sitede aynı ikon aynı işle
   SceneBanking'de de duruyor). Nokta hedefe varınca sönüyor; dönüş yolu
   görünmüyor, yoksa "dosya geri gidiyor" gibi okunurdu. */
function SahneDosya() {
  return (
    <svg viewBox="0 0 380 210" className="fy2-svg" focusable="false" aria-hidden="true">
      <Panel />
      <rect x="32" y="74" width="76" height="60" rx="12" className="svx-box-2" />
      <Landmark x={57} y={91} width={26} height={26} strokeWidth={1.9} className="svx-ic-b" />
      <path d="M114 104 H186" className="svx-line-b" />
      <path d="M186 99.6 L192.4 104 L186 108.4 Z" className="svx-ah-b" />
      <circle cx="116" cy="104" r="3.4" className="svx-dot fy2-tal" />
      <rect x="200" y="44" width="148" height="122" rx="14" className="svx-box-2" />
      {[62, 96, 130].map((y) => (
        <g key={y}>
          <rect x="214" y={y} width="120" height="24" rx="7" className="svx-box" />
          <rect x="224" y={y + 9} width="58" height="6" rx="3" className="svx-bar" />
        </g>
      ))}
    </svg>
  );
}

/* 4 · MÜHÜR — "%0 oranının dayanağı kaydın kendisi"
   Soldaki kayıt, sağdaki kapanan halka. Halka DÖNMÜYOR; kesikleri kayıyor
   (.svx-flow ile aynı idiyom, çok daha yavaş). "Sonsuz dönen ikon" bu depoda
   yasak ve o yasak burada da geçerli. */
function SahneMuhur() {
  return (
    <svg viewBox="0 0 380 210" className="fy2-svg" focusable="false" aria-hidden="true">
      <Panel />
      <rect x="24" y="52" width="146" height="106" rx="12" className="svx-box-2" />
      {[
        [70, 110],
        [90, 86],
        [110, 102],
        [130, 74],
      ].map(([y, w]) => (
        <rect key={y} x="40" y={y} width={w} height="7" rx="3.5" className="svx-bar" />
      ))}
      <path d="M176 104 H206" className="svx-line-b" />
      <path d="M206 99.6 L212.4 104 L206 108.4 Z" className="svx-ah-b" />
      <circle cx="284" cy="104" r="44" strokeDasharray="4 7" className="svx-ring fy2-hal" />
      <Stamp x={270} y={90} width={28} height={28} strokeWidth={1.9} className="svx-ic-b" />
    </svg>
  );
}

const SAHNE = [SahneTakvim, SahneTablo, SahneDosya, SahneMuhur] as const;

/* ============================================================================
   G1 · RAY — F3'ün doğrudan devamı

   Müşterinin cümlesi birebir bunu istiyor: "sağdakilerin her birinde soldaki şey
   de değişebilir. süreç kısmı gibi düşünerek yapabilirsin."

   YERLEŞİM F3'ÜN AYNISI (sol 7 sütun sahne, sağ 5 sütun liste) — kasıtlı:
   müşterinin beğendiği eksen korunuyor, değişen tek şey iki ölü parçanın
   canlanması. Sağdaki dört satır artık tıklanabilir bir ray, soldaki sahne o
   raya bağlı.

   SÜREÇ BÖLÜMÜNÜN DAVRANIŞI, ONUN JS'İ OLMADAN. ProcessScroll üç şey yapıyor:
   kendiliğinden ilerliyor, tıklanınca duruyor, ray hangi adımda olduğunu
   gösteriyor. Üçü de burada saf CSS ile var:
     · ilerleme  → dört sahne aynı periyodu çeyrekli gecikmeyle paylaşıyor
     · durma     → `.fyr:has(input:checked)` bütün döngüyü `animation: none`
                   yapıyor, seçilen sahne açık kalıyor
     · gösterge  → aynı gecikmeyle rayın satır zemini ve nokta kabı yanıyor

   ProcessScroll'DAN AYRILAN İKİ NOKTA, ikisi de rapora açık soru olarak yazıldı:
     1) Tıklandıktan sonra döngü KENDİLİĞİNDEN GERİ DÖNMÜYOR (canlı bölüm 11
        saniye sonra devam ediyor). Zamanlayıcıyı geri açmanın CSS karşılığı yok.
     2) Döngü ekran dışındayken de dönüyor; canlı bölüm IntersectionObserver ile
        duruyor. Sitedeki 60+ sürekli CSS animasyonunun tamamı zaten böyle
        çalışıyor, yani aday bu konuda sitenin geri kalanıyla aynı hizada.

   RADYO NEDEN BAŞLANGIÇTA SEÇİLİ DEĞİL: `defaultChecked` yazsaydım
   `:has(input:checked)` sayfa açılır açılmaz eşleşir ve döngü HİÇ başlamazdı.
   Seçimsiz başlamak ayrıca dürüst: ziyaretçi henüz bir şey seçmedi.
   ========================================================================== */

export function FaydaRay() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <FaydaBas />

        <div className="fyr">
          <FadeUp className="fyr-card" delay={0.06}>
            {/* Dört sahne aynı ızgara gözünde üst üste duruyor; görünen olanı
                opaklık seçiyor. aria-hidden: dördünün de söylediği her şey
                sağdaki rayda kelimeyle yazılı. */}
            <div className="fyr-stage" aria-hidden="true">
              {SAHNE.map((S, i) => (
                <div
                  key={i}
                  className={`fyr-sahne fyr-s${i + 1}`}
                  style={{ "--i": String(i) } as React.CSSProperties}
                >
                  <S />
                </div>
              ))}
            </div>
          </FadeUp>

          {/* fieldset + aria-label: dört radyo bir grup ve grubun adı var.
              `group` rolü adı yazardan ALIYOR — tuzak G-2'nin tersi durum, orada
              sorun `paragraph` rolünün almamasıydı. Gizli metin (.sr-only)
              yazmaya gerek kalmıyor. */}
          <fieldset className="fyr-rail" aria-label={G.heading}>
            {G.items.map((g, i) => (
              <div
                key={g.title}
                className="fyr-row"
                style={{ "--i": String(i) } as React.CSSProperties}
              >
                {/* SARMALAYAN <label> YOK, BİLEREK. Sitenin çip kalıbı
                    (partnerlik.css · .pt-chip, lab-hak-levha.css · .lhl-chip)
                    radyoyu bir <label>'ın içine koyuyor ve adı label'ın
                    metninden alıyor; orada metin düz bir <span>. Burada satırın
                    metni bir <h3> ve bir <p>, ikisi de AKIŞ içeriği ve <label>
                    yalnız ifade içeriği alıyor — yani label'a sarmak geçersiz
                    HTML olurdu. Radyo bunun yerine satırın tamamını kaplıyor
                    (inset 0) ve tıklama alanı yine satırın tamamı; adını
                    aria-label taşıyor. Tuzak G: adsız radyo erişilebilirlik
                    ağacında "on" diye okunur, o yüzden ad atlanamaz. */}
                <input type="radio" name="fyr-kalem" id={`fyr-${i + 1}`} aria-label={g.title} />
                <span className="fyr-dot" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="fyr-t">{g.title}</h3>
                <p className="fyr-p">{KISA[i]}</p>
              </div>
            ))}
            {/* Tek satır ARAYÜZ metni, iddia değil: ray kendiliğinden yürüdüğü
                için tıklanabilir olduğunu söylemek zorunda. Canlı süreç bölümü
                de aynı sebeple aynı şeyi yapıyor ("Üç ülkede de aynı beş adım;
                tıklayın, durur."). */}
            <p className="fyr-not">Ray kendiliğinden ilerliyor; bir satıra tıklayın, orada durur.</p>
          </fieldset>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   G2 · TEK SAHNE — müşterinin ikinci izni

   "ya da tek bir şey olup çok daha hareketli animasyon olur."

   Bölüm dört kutu olmaktan çıkıyor: TAM GENİŞLİK tek bir gece sahne ve altında
   dört kalemin künye satırı. Sahnenin kendisi bir makine —
     solda ay ay tutulan kayıt → besleme çizgileri → defter → üç sonuç

   Dördüncü kalem yok mu? Var: BİRİNCİ kalem (beyan takvimi) sahnenin SOL
   ucunda, sonuç değil sebep tarafında duruyor. Bölümün giriş cümlesi zaten
   bunu söylüyor.

   ALTI AYRI HAREKET, hepsi zaten orada olan öğelerde:
     1 · soldaki yığında ay ay inen vurgu (12 adım)
     2 · defterin üstünden geçen tarama çizgisi
     3 · beş duraklı ışık dalgası (aktarim · kayıt → besleme → defter → dallar)
     4 · ikinci dalda ilerleyen talep noktası
     5 · üçüncü sonuçta kayan mühür kesikleri
     6 · (3) dalganın içinde her düğümün kendi konturunun yanması
   Sitenin hareket politikası bunu açıkça serbest bırakıyor: "Sayfada tek/iki
   sahne varsa olabildiğince zengin olabilir."

   IŞIK KISMI İÇİN TEK SATIR KEYFRAME YAZILMADI: mekanizma css/aktarim.css'te,
   bu dosya yalnız değer veriyor. Müşterinin beğendiği hareket dili bu
   ("soldaki kutu önce line olarak yanar ordan bi enerji gelir…").
   ========================================================================== */

function TekSahne() {
  const aylar = Array.from({ length: 12 }, (_, i) => 58 + i * 17);
  const satir = Array.from({ length: 8 }, (_, i) => 76 + i * 22);
  const sutun = [18, 28, 14, 34, 22, 36];
  return (
    <svg viewBox="0 0 900 300" className="fy2g-svg" focusable="false" aria-hidden="true">
      {/* --- sol: ay ay tutulan kayıt (1. kalem) ------------------------- */}
      <rect
        x="40"
        y="40"
        width="170"
        height="220"
        rx="16"
        className="svx-box akt-durak fy2g-kayit"
      />
      {/* vurgu bantı satırların ALTINDA çiziliyor ki satırı örtmesin */}
      <rect x="52" y="55" width="146" height="13" rx="5" className="svx-halo fy2g-ay" />
      {aylar.map((y, i) => (
        <rect
          key={y}
          x="58"
          y={y}
          width={i % 2 === 0 ? 104 : 78}
          height="7"
          rx="3.5"
          className="svx-bar"
        />
      ))}

      {/* --- besleme: üç kanal, tek defter ------------------------------- */}
      {[
        "M210 92 C 250 92, 256 150, 300 150",
        "M210 150 H300",
        "M210 208 C 250 208, 256 150, 300 150",
      ].map((d) => (
        <path key={d} d={d} fill="none" className="svx-line akt-durak fy2g-besle" />
      ))}

      {/* --- defter: tek nesne ------------------------------------------- */}
      <rect
        x="300"
        y="48"
        width="250"
        height="204"
        rx="18"
        className="svx-box akt-durak fy2g-defter"
      />
      {satir.map((y, i) => (
        <rect
          key={y}
          x="322"
          y={y}
          width={i % 2 === 0 ? 204 : 168}
          height="7"
          rx="3.5"
          className="svx-bar"
        />
      ))}
      <rect x="312" y="64" width="226" height="2" rx="1" fill="#5c9eeb" className="fy2g-tara" />

      {/* --- üç dal ve üç sonuç ------------------------------------------ */}
      <path
        d="M550 150 C 592 150, 600 76, 640 76"
        fill="none"
        className="svx-line akt-durak fy2g-dal fy2g-d1"
      />
      <path
        d="M550 150 C 592 150, 600 154, 640 154"
        fill="none"
        className="svx-line akt-durak fy2g-dal fy2g-d2"
      />
      <path
        d="M550 150 C 592 150, 600 232, 640 232"
        fill="none"
        className="svx-line akt-durak fy2g-dal fy2g-d3"
      />
      <circle cx="556" cy="150" r="3.6" className="svx-dot fy2g-nok" />

      {/* 2. kalem — tablo */}
      <rect x="640" y="44" width="220" height="64" rx="14" className="svx-box-2 akt-durak fy2g-n1" />
      {sutun.map((h, i) => (
        <rect
          key={i}
          x={664 + i * 22}
          y={96 - h}
          width="13"
          height={h}
          rx="4"
          className="svx-bar-mid"
        />
      ))}
      <ChartColumn x={806} y={62} width={26} height={26} strokeWidth={1.9} className="svx-ic-b" />

      {/* 3. kalem — hazır dosya */}
      <rect
        x="640"
        y="122"
        width="220"
        height="64"
        rx="14"
        className="svx-box-2 akt-durak fy2g-n2"
      />
      {[
        [136, 118],
        [152, 94],
        [168, 108],
      ].map(([y, w]) => (
        <rect key={y} x="664" y={y} width={w} height="6" rx="3" className="svx-bar" />
      ))}
      <Landmark x={806} y={140} width={26} height={26} strokeWidth={1.9} className="svx-ic-b" />

      {/* 4. kalem — mühür */}
      <rect
        x="640"
        y="200"
        width="220"
        height="64"
        rx="14"
        className="svx-box-2 akt-durak fy2g-n3"
      />
      <circle cx="692" cy="232" r="22" strokeDasharray="4 7" className="svx-ring fy2g-hal" />
      <Stamp x={681} y={221} width={22} height={22} strokeWidth={1.9} className="svx-ic-b" />
      {[
        [224, 104],
        [240, 76],
      ].map(([y, w]) => (
        <rect key={y} x="728" y={y} width={w} height="6" rx="3" className="svx-bar" />
      ))}
    </svg>
  );
}

export function FaydaTekSahne() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <FaydaBas />

        <FadeUp className="fy2g-card" delay={0.06}>
          {/* `akt` yalnızca kapsam etiketi: fare sahnenin üstündeyken tur
              duruyor (kalıbın kendi kuralı). Ölçüye dokunmuyor. */}
          <div className="fy2g-stage akt fy2g-akt" aria-hidden="true">
            <TekSahne />
          </div>
        </FadeUp>

        {/* Künye: dört kalem kutu DEĞİL sütun. Aralarındaki 1 piksel iki şeyin
            ARASINDA duruyor — ayraç, şerit değil (docs/tuzaklar.md · kural 4,
            ayrımın gerekçesi scripts/serit-check.mjs başında). */}
        <div className="fy2g-kunye">
          {G.items.map((g, i) => {
            const Icon = IC[i];
            return (
              <div key={g.title} className="fy2g-k">
                <span className="fy2g-ic" aria-hidden="true">
                  <Icon size={15} strokeWidth={2.1} />
                </span>
                <h3 className="fy2g-t">{g.title}</h3>
                <p className="fy2g-p">{KISA[i]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   G3 · OMURGA — kendi bulduğum üçüncü yön

   GEREKÇE. G1 ve G2 aynı soruyu iki farklı ölçekte cevaplıyor ama ikisi de
   soldaki/üstteki tek sahneye bağlı: bölümün genişliği sabit, yüksekliği sabit,
   ziyaretçi bir kalemi seçse de bölüm hep aynı boyda duruyor. Müşterinin asıl
   şikâyeti ise ölçüyle ilgili: "çok aşırı sade olmuş." Üçüncü yön tam da bunu
   deniyor — bölüm SEÇİME GÖRE BÜYÜYOR.

   Tek sütun, dört bant, tek seferde biri açık. Açılan bandın içinden o kalemin
   kendi geniş sahnesi çıkıyor; kapalı bantlar başlık + mekanizma cümlesi olarak
   okunmaya devam ediyor, yani hiçbir satır "ölü" değil. Dört bandı soldan bir
   omurga bağlıyor ve omurganın üstündeki dört nokta sırayla yanıyor: F3'ün
   "tek sebep, dört sonuç" fikri ayakta, yalnız yatay değil DİKEY.

   Kalıp sitenin kendi kalıbı: /dubai/muhasebe'nin süreç ve sınır bölümleri
   zaten "başlık görünür, gerisi tık" biçiminde çalışıyor. Yeni bir görsel dil
   icat edilmedi.

   AÇILMA HİLESİ `grid-template-rows: 0fr → 1fr`. Tuzak B'nin çıplak `1fr`
   yasağı bunu açıkça istisna tutuyor. Sabit `max-height` denenmedi çünkü
   sahnenin yüksekliği genişliğe bağlı ve her kırılım için ayrı bir sayı
   yazmak gerekirdi — ProcessScroll'un min-height'la öğrendiği ders.

   BURADA `defaultChecked` VAR ve G1'de yoktu: bu aday kendiliğinden ilerlemiyor,
   yani açık bir seçimle başlaması gerekiyor. Kapalı başlasaydı bölüm ilk
   bakışta yine "dört satır" olurdu — turun düzeltmeye çalıştığı şeyin ta
   kendisi.

   OMURGA ÇİZGİSİ STATİK, NOKTALAR YANIYOR. Aktarım sözleşmesinin "bilinen
   sınır" maddesi: .akt-durak bir sınıf, sözde öğeye verilemez. Çizgi bir
   ::before olduğu için ışık kutudan kutuya atlıyor — sözleşmenin (a) seçeneği,
   bilerek.
   ========================================================================== */

export function FaydaOmurga() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <FaydaBas />

        <div className="fyo akt">
          {G.items.map((g, i) => {
            const Icon = IC[i];
            const S = SAHNE[i];
            return (
              <div
                key={g.title}
                className="fyo-row"
                style={{ "--i": String(i) } as React.CSSProperties}
              >
                {/* Radyo başlığın tamamını kaplıyor, <label> yok — gerekçe
                    G1'in aynısı: <h3> ve <p> akış içeriği, <label> yalnız
                    ifade içeriği alıyor. */}
                <div className="fyo-head">
                  <input
                    type="radio"
                    name="fyo-kalem"
                    defaultChecked={i === 0}
                    aria-label={g.title}
                  />
                  <span className="fyo-dot akt-durak" aria-hidden="true">
                    <Icon size={16} strokeWidth={2} />
                  </span>
                  <h3 className="fyo-t">{g.title}</h3>
                  <p className="fyo-p">{KISA[i]}</p>
                  <ChevronDown size={16} strokeWidth={2} className="fyo-ok" aria-hidden="true" />
                </div>
                <div className="fyo-panel">
                  <div className="fyo-panel-in">
                    <div className="fyo-stage" aria-hidden="true">
                      <S />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
