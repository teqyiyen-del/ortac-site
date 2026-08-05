"use client";

import { Layers } from "lucide-react";

import HeroSceneCard, { type HeroSceneItem } from "@/components/shared/HeroSceneCard";
import { ACCOUNTING_DUBAI } from "@/lib/accountingDubai";

/* ============================================================================
   MUHASEBE HERO KARTI — /dubai/muhasebe hero'sunun sağındaki kart
   İSKELET: components/shared/HeroSceneCard.tsx (ortak · .hkc-)
   PALET:   src/app/css/svc-muhasebe.css · 16. bölüm · ad alanı .svmk-

   ------------------------------------------------------------ NE DEĞİŞTİ
   Kartın ÖLÇÜSÜ VE DAVRANIŞI bu dosyadan çıktı. Sahne kutusunun yüksekliği,
   ad kutusu, şerit, künye, geçişler, duraklatma mantığı, erişilebilir ad ve
   hidrasyon kuralı artık sitenin tek hero kartı iskeletinde ve kuruluş
   kartıyla BİREBİR AYNI. Bu dosyada kalan tek şey bu sayfaya ait olan: dört
   çizim, dört kelime, dört satır, bekleme süresi, künye cümlesi.
   Sebep: iki kart ayrı ayrı yazıldığı için ayrışmışlardı — sahne kutusu 1440'ta
   kuruluşta 379.5, burada 339.5 ölçülmüştü. Gerekçenin tamamı ve ölçü tablosu
   HeroSceneCard.tsx'in başında.

   ÇİZİMLER VE METİNLER DEĞİŞMEDİ. Dört bölme, dört viewBox, dört döngü ve
   dört cümle olduğu gibi duruyor; standardizasyon yalnızca iskeleti kapsıyor.

   ------------------------------------------------------------------- NEREDEN
   /lab/muhasebe-hero'nun dördüncü adayı ("Sahne" · components/lab/MhSahne.tsx ·
   .mhs-). Müşteri: "muhasebe herosunun kartı yapmışsın güzel olmuş … ondan
   sonra yayına alabilirsin."

   ESKİ SAHNE (AccountingHeroScene · .svma- · "kapanan mali sayfa") HERO'DAN
   ÇIKTI ama SİLİNMEDİ: /lab/muhasebe-hero onu "taban" olarak basmaya devam
   ediyor, müşteri kıyası orada yapıyor. Neden gittiğinin ölçümü lab sayfasında
   ve 16. bölümün başlığında: kımıldayan alan tuvalin binde ikisi, iki olay
   arasında 4,8 saniye boşluk — hareket VARDI ama görünmüyordu.

   ------------------------------------------------------------- AD ALANI NEDEN
   Lab kopyası .mhs-, bu kopya .svmk-. İkisi de aynı globals.css'e giriyor
   (svc-muhasebe.css 83. satır, lab-mhs.css 135. satır) — önek ortak olsaydı
   labda yapılan her deneme sessizce canlı karta da geçerdi ve lab-mhs.css
   SONRA basıldığı için kazanan hep lab olurdu. Aynı gerekçe kırpma yolu
   kimliği (svmkPlot) ve altı keyframe adı (svmkPost · svmkFill · svmkSend ·
   svmkRecalc · svmkPeriod · svmkFile) için de geçerli: keyframe adları CSS'te
   küresel, çakışsalardı lab tanımı canlıyı ezerdi.

   LAB DOSYALARI OLDUĞU GİBİ DURUYOR: MhSahne.tsx ve lab-mhs.css'e tek karakter
   dokunulmadı. Aday orada, karar burada.

   -------------------------------------------------- METİN NEREDEN GELİYOR
   Dört alt satırın dördü de accountingDubai.ts'ten OKUNUYOR, elle
   kopyalanmıyor: ACCOUNTING_DUBAI.scope.phases[1..4].line. Sayfa metni
   değişirse kart kendiliğinden takip ediyor. Tek kelimelik adlar (Defter ·
   Beyan · Rapor · Arşiv) o aşamaların sıkıştırılmış hâli — yeni bir rakam,
   oran, tarih ya da kalem adı üretilmedi.

   phases[0] ("Altyapı kurulumu") BİLEREK DIŞARIDA: kaynak dosyanın kendi
   cümlesi "Bu adım bir kez yapılıyor" diyor. Kart yürüyen işi gösteriyor,
   kurulumu değil — ve dört bölme müşterinin istediği sayı.

   ------------------------------------------------------ HİDRASYON KURALI
   useReducedMotion KULLANILMIYOR. Bu depoda beş ayrı kalıpta hidrasyon hatası
   çıkardı. Bu dosyada artık hiç durum yok — hareket tercihi ortak iskelette,
   matchMedia ile ve YALNIZCA useEffect içinde okunuyor. Bu kartın kalıbı
   standarda taşındı; gerekçesi HeroSceneCard.tsx'in başında.

   SVG <text> YOK. Kartın bütün yazısı HTML'de; viewBox metni kapsayıcıyla
   ölçekliyor ve bu sahnede bir kez punto patlamasına yol açmıştı. Çizimlerde
   harf, rakam, tarih ve sahte resmî amblem de yok — hepsi siluet.
   ========================================================================= */

/* Bir bölmenin ekranda kalma süresi. Dört bölme = 16.4 saniyelik tam tur.
   Sitedeki döngülerden (68·60·42·37·34·31·29·26·23·20·19·17·15·13·11·5.3 s) ve
   /dubai hero kartından (3.8 s) ayrı seçildi: aynı sayfada iki kart aynı
   ritimde nefes alırsa göz ikisini tek bir mekanizma sanıyor. Bu sayfanın
   kendi ikinci sürekli sahnesi de var (Geçit · .svsg- · 31 s); 41 ile 310'un
   ortak böleni yok. PERİYOT DİSİPLİNİ STANDARTLAŞMADI VE STANDARTLAŞMAMALI:
   ortak bir bekleme süresi tam olarak bu ortak katsızlığı bozardı, o yüzden
   HeroSceneCard `dwell`i prop olarak alıyor. */
const DWELL = 4100;

/* --------------------------------------------------------------------------
   1 · DEFTER — açık ciltli defter, iki sayfa ve ortada dikişli cilt.

   BEYAZ: yalnızca SAĞ sayfanın konturu. Sol sayfa gri kademede — derinliği
   dolgu değil kontur taşıyor, çünkü bu koyulukta iki dolgu tonu arasındaki
   fark zar zor görünüyor, iki kontur tonu arasındaki fark tartışmasız.
   Cilt dikişleri iki sayfanın kenarını birbirine bağlıyor; dikiş olmasaydı
   şekil "iki ayrı kağıt" diye okunurdu.
   GRİ: cetvel kılcalları, satır dolguları, tutar sütunu. Çizimin en kalabalık
   öğesi bunlar; bir kademe yukarı çekilseler çizim gri bir metin bloğuna
   dönerdi.
   MAVİ: işlenen satırın tutarı ve o satırın altındaki çizgi. Sahnenin tek
   olayı: "şu an bu satır kaydediliyor". Rakam yazılmadı — yazılsaydı sahte
   bir tutar iddia edilmiş olurdu.
   Alttaki ÇİFT ÇİZGİ muhasebenin kendi işareti: hesap kapandı.
-------------------------------------------------------------------------- */
/* sağ sayfa sahnenin öznesi, sol sayfa arkada kalan komşusu */
const RIGHT_ROWS = [104, 132, 160, 188, 216];
const RIGHT_W = [66, 50, 72, 56, 62];
const LEFT_ROWS = [110, 138, 166, 194, 222];
const LEFT_W = [64, 52, 70, 48, 60];
/* Mavi tutar BİRİNCİ satıra çiziliyor ve aşağı doğru taşınıyor: satır adımı 28
   birim (RIGHT_ROWS'un kendi aralığı), beş satır = 112 birimlik yol. Yaşayan
   hareket (svc-muhasebe.css · svmkPost) bu yolu adım adım yürüyor; duruş hâli
   dördüncü satır, yani translateY(84px). İki dosya bu 28'de anlaşmak zorunda:
   satır aralığı değişirse keyframe adımları da değişmeli. */
const LIVE_ROW = RIGHT_ROWS[0];

function ArtDefter() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      {/* sol sayfa — ikincil düzlem */}
      <rect className="svmk-sur-q" x="24" y="44" width="190" height="238" rx="10" />
      <rect className="svmk-dim" x="48" y="66" width="72" height="10" rx="5" />
      <path className="svmk-rule" d="M48 90 H190" />
      <path className="svmk-hair" d={LEFT_ROWS.map((y) => `M48 ${y + 19} H190`).join(" ")} />
      {LEFT_ROWS.map((y, i) => (
        <rect key={y} className="svmk-dim" x="48" y={y} width={LEFT_W[i]} height="9" rx="4.5" />
      ))}

      {/* sağ sayfa — sahnenin öznesi, tek beyaz kontur */}
      <rect className="svmk-sur-f" x="222" y="36" width="192" height="246" rx="10" />
      <rect className="svmk-ink" x="246" y="58" width="88" height="11" rx="5.5" />
      <path className="svmk-rule" d="M246 84 H392 M352 84 V258" />
      <path className="svmk-hair" d={RIGHT_ROWS.map((y) => `M246 ${y + 19} H392`).join(" ")} />
      {RIGHT_ROWS.map((y, i) => (
        <g key={y}>
          <rect className="svmk-dim" x="246" y={y} width={RIGHT_W[i]} height="9" rx="4.5" />
          <rect className="svmk-dim" x="364" y={y} width="22" height="9" rx="4.5" />
        </g>
      ))}
      {/* kapanış: hesabın altındaki çift çizgi */}
      <path className="svmk-rule" d="M246 244 H392 M246 250 H392" />

      {/* cilt — iki sayfanın kenarını bağlayan dikişler */}
      {[76, 122, 168, 214].map((y) => (
        <rect key={y} className="svmk-stitch" x="208" y={y} width="14" height="13" rx="3" />
      ))}

      {/* OLAY: işlenen satır. İkisi tek grupta, çünkü tek bir şeyin iki
          parçası — kaydedilen tutar ve o tutarın satırı. Grup aşağı doğru
          yürüyor, yani kayıt satır satır DEVAM EDİYOR.
          Mavi hücre gri tutar sütunuyla ORTAK MERKEZLİ (ikisi de 375'te):
          2 birim taşması "vurgulanmış hücre" okumasını veriyor, kayma değil. */}
      <g className="svmk-post">
        <path className="svmk-act-line" d={`M246 ${LIVE_ROW + 19} H392`} />
        <rect className="svmk-act" x="362" y={LIVE_ROW} width="26" height="9" rx="4.5" />
      </g>
    </svg>
  );
}

/* --------------------------------------------------------------------------
   2 · BEYAN — üç dönem yaprağı ve üstteki teslim yarığı.

   FORM KUTULU ALANLARDAN kuruluyor, satırlardan değil: kutulu alan bir
   beyannamenin, düz satır bir mektubun işareti.
   ÜÇ YAPRAK yelpaze gibi: beyan tek seferlik bir belge değil, dönem dönem
   tekrar eden bir kalem. Arkadaki iki yaprak gri ve sönük kademede — havadan
   perspektif, uzaklaşan kenar soluyor.
   YARIK bir kurum DEĞİL: amblem, tabela, bina yok. Sahte bir resmî işaret
   çizmek çizimi yalana çevirir (aynı kural /dubai kartında da yazılı).
   MAVİ: yarığa doğru bakan ok. TESLİM işareti, onay işareti değil —
   onaylanan hiçbir şey yok, verilen bir beyan var.
-------------------------------------------------------------------------- */
const B_BOXES = [
  [152, 140],
  [240, 140],
  [152, 190],
  [240, 190],
];

function ArtBeyan() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      {/* teslim yarığı — kütle değil boşluk */}
      <rect className="svmk-sur-q" x="100" y="28" width="240" height="28" rx="9" />
      <rect className="svmk-slot" x="122" y="38" width="196" height="8" rx="4" />

      {/* geçmiş dönemler: en uzak ve ikinci düzlem */}
      <g transform="rotate(-6.5 220 190)">
        <rect className="svmk-sur-b" x="118" y="88" width="196" height="196" rx="10" />
      </g>
      <g transform="rotate(-3 220 186)">
        <rect className="svmk-sur-q" x="124" y="82" width="198" height="200" rx="10" />
      </g>

      {/* bu dönemin beyanı — sahnenin öznesi */}
      <g className="svmk-rise">
        <rect className="svmk-sur-f" x="130" y="76" width="200" height="206" rx="10" />
        <rect className="svmk-ink" x="152" y="98" width="86" height="11" rx="5.5" />
        <path className="svmk-rule" d="M152 124 H308" />
        {B_BOXES.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect className="svmk-box" x={x} y={y} width="68" height="40" rx="5" />
            <rect className="svmk-dim" x={x + 11} y={y + 24} width="34" height="7" rx="3.5" />
          </g>
        ))}
        {/* Toplam alanı: diğerlerinden geniş, çünkü beyanın kapandığı yer.
            İçindeki çubuk bir GÖSTERGE — dönem boyunca doluyor, dolduğunda
            beyan veriliyor. Kutu boş kalırken bile şeklini koruyor, yani
            "burada bir toplam var" cümlesi hareket olmadan da okunuyor. */}
        <rect className="svmk-box" x="152" y="240" width="156" height="28" rx="5" />
        <rect className="svmk-gauge" x="164" y="250" width="132" height="8" rx="4" />
      </g>

      {/* OLAY: yarığa dönük ok. Ucu (y=41) yarığın kendi boşluğunun (38..46)
          içinde bitiyor — panelin altında dursaydı "yarığa doğru" değil
          "panelin önünde" okunurdu. */}
      <path className="svmk-act" d="M230 41 l-12 23 h24 z" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   3 · RAPOR — arkada bir tablo kartı, önde çubuk serisi.

   ÇUBUKLAR BİR ORAN İDDİA ETMİYOR: eksen yok, etiket yok, rakam yok ve boylar
   BİLEREK inişli çıkışlı. Sürekli yükselen bir seri "kazandırıyoruz" derdi ve
   bu sahnenin söyleyeceği bir şey değil. En yüksek çubuk da bilerek sonuncu
   DEĞİL: sonuncu en yüksek olsaydı seri, hiçbir rakama dayanmayan bir büyüme
   grafiğine dönerdi.
   BEYAZ: yalnızca öndeki kartın konturu. Çubuklar iç işaret bandında — bir
   kart dolusu beyaz çubuk kartın kendi sınırıyla yarışırdı.
   MAVİ: son çubuk, yani içinde bulunulan dönem. Kırpma yolunun içinde
   tabandan yükseliyor: bir çubuk hiçbir zaman tabanın altına taşmıyor.
-------------------------------------------------------------------------- */
const TABLE_ROWS = [
  [52, 62],
  [76, 40],
  [100, 58],
  [124, 46],
];
/* taban y=254 · boylar inişli çıkışlı, en yükseği dördüncü */
const BARS = [52, 82, 64, 108, 74];
const BAR_LIVE = 90;

function ArtRapor() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      <defs>
        {/* Kırpma yolu kimliği bu karta özel — LAB KOPYASINDAN DA AYRI (orada
            mhsPlot). Aynı kimlik ikinci kez DOM'a girerse tarayıcı ilkine
            bağlanır ve öteki kartın çubuğu yanlış yerde kırpılır. */}
        {/* Yolun ALT KENARI tam tabanda (130+124 = 254). Bir birim bile aşağı
            inseydi çubuk duruş hâlinde tabanın altında ince bir mavi şerit
            olarak sızardı; şimdi duruş hâlinde tamamen görünmez. */}
        <clipPath id="svmkPlot">
          <rect x="120" y="130" width="272" height="124" />
        </clipPath>
      </defs>

      {/* arkadaki tablo kartı — ikincil düzlem */}
      <rect className="svmk-sur-q" x="52" y="32" width="196" height="132" rx="10" />
      <path className="svmk-hair" d="M70 66 H230 M70 90 H230 M70 114 H230 M70 138 H230" />
      {TABLE_ROWS.map(([y, w]) => (
        <rect key={y} className="svmk-dim" x="70" y={y} width={w} height="8" rx="4" />
      ))}

      {/* öndeki rapor kartı — sahnenin öznesi */}
      <rect className="svmk-sur-f" x="104" y="92" width="302" height="196" rx="12" />
      <rect className="svmk-ink" x="128" y="114" width="94" height="11" rx="5.5" />
      <path className="svmk-hair" d="M128 168 H382 M128 196 H382" />
      <path className="svmk-rule" d="M128 254 H382" />
      {/* --i: soldan sağa yürüyen yeniden-hesap dalgasının gecikmesi. Rapor
          defterden TÜRETİLEN bir şey; dalga o türetmenin sürdüğünü söylüyor. */}
      {BARS.map((h, i) => (
        <rect
          key={h}
          className="svmk-bar"
          style={{ "--i": i } as React.CSSProperties}
          x={140 + i * 40}
          y={254 - h}
          width="28"
          height={h}
          rx="3"
        />
      ))}

      {/* OLAY: içinde bulunulan dönem, tabandan yükseliyor */}
      <g clipPath="url(#svmkPlot)">
        <rect
          className="svmk-act"
          x="340"
          y={254 - BAR_LIVE}
          width="28"
          height={BAR_LIVE}
          rx="3"
        />
      </g>
    </svg>
  );
}

/* --------------------------------------------------------------------------
   4 · ARŞİV — iki raflı dolap ve rafından çekilmiş tek dosya.

   Sahnenin cümlesi tek: "istendiği anda bulunuyor". Sırtların genişliği ve
   boyu EŞİT DEĞİL — eşit olsalardı bir grafik gibi okunurdu, oysa bunlar
   farklı kalınlıkta dosyalar. Rakam, tarih ve ay adı YOK: bir raf takvim
   değildir ve bu çizim bir takvim iddiası taşımıyor.
   BEYAZ: yalnızca dolabın konturu. Yirmi üç sırtın hepsi beyaz konturlu
   olsaydı kadraj beyaz bir tarağa dönerdi; sırtlar ikincil düzlemde kalıyor.
   BOŞ YUVA olmasaydı çekilen dosya raftan gelmiş gibi okunmazdı.
   MAVİ: çekilen dosya. Koyu keyline'ı arkasındaki sırtlardan ayırıyor —
   kontur olmadan mavi kütle gri sırtların üstüne yapışıyordu.
-------------------------------------------------------------------------- */
type Spine = { x: number; w: number; h: number };
const SHELF_TOP = 158;
const SHELF_BOT = 276;
const UPPER: Spine[] = [
  { x: 54, w: 22, h: 92 },
  { x: 80, w: 28, h: 106 },
  { x: 112, w: 18, h: 84 },
  { x: 134, w: 26, h: 100 },
  { x: 164, w: 20, h: 112 },
  { x: 188, w: 30, h: 90 },
  { x: 222, w: 22, h: 102 },
  { x: 248, w: 26, h: 80 },
  { x: 278, w: 18, h: 108 },
  { x: 300, w: 28, h: 94 },
  { x: 332, w: 22, h: 86 },
  { x: 358, w: 26, h: 104 },
];
const LOWER: Spine[] = [
  { x: 54, w: 26, h: 88 },
  { x: 84, w: 20, h: 100 },
  { x: 108, w: 28, h: 82 },
  { x: 140, w: 22, h: 94 },
  { x: 166, w: 26, h: 86 },
  { x: 196, w: 18, h: 96 },
  { x: 218, w: 24, h: 90 },
  { x: 280, w: 20, h: 98 },
  { x: 304, w: 26, h: 84 },
  { x: 334, w: 22, h: 92 },
  { x: 360, w: 26, h: 100 },
];
/* çekilen dosyanın alt raftaki yuvası — LOWER'da 246..276 arası bilerek boş */
const SLOT = { x: 246, w: 30, h: 98 };

function SpineRow({ items, base }: { items: Spine[]; base: number }) {
  return (
    <>
      {items.map((s) => (
        <g key={`${base}-${s.x}`}>
          <rect className="svmk-spine" x={s.x} y={base - s.h} width={s.w} height={s.h} rx="3" />
          <rect
            className="svmk-dim"
            x={s.x + 4}
            y={base - s.h + 14}
            width={s.w - 8}
            height="10"
            rx="2"
          />
        </g>
      ))}
    </>
  );
}

function ArtArsiv() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      <rect className="svmk-sur-f" x="36" y="26" width="368" height="266" rx="12" />
      <SpineRow items={UPPER} base={SHELF_TOP} />
      <SpineRow items={LOWER} base={SHELF_BOT} />
      <path className="svmk-shelf" d={`M36 ${SHELF_TOP} H404 M36 ${SHELF_BOT} H404`} />

      {/* yuva: çekilen dosyanın raftaki boşluğu */}
      <rect
        className="svmk-slot"
        x={SLOT.x}
        y={SHELF_BOT - SLOT.h}
        width={SLOT.w}
        height={SLOT.h}
        rx="3"
      />

      {/* OLAY: aranan dosya. Yuvasından yukarı çekiliyor; opaklık yok, nesne
          yok olup var olmuyor, yerinden çıkıyor. */}
      <g className="svmk-pull">
        <rect
          className="svmk-act-file"
          x={SLOT.x - 1}
          y={SHELF_BOT - SLOT.h - 42}
          width={SLOT.w + 2}
          height={SLOT.h}
          rx="3"
        />
        <rect
          className="svmk-act-tag"
          x={SLOT.x + 4}
          y={SHELF_BOT - SLOT.h - 42 + 18}
          width={SLOT.w - 8}
          height="13"
          rx="2"
        />
      </g>
    </svg>
  );
}

/* Dört bölme. Alt satırların dördü de accountingDubai.ts'ten OKUNUYOR —
   scope.phases[1..4].line, elle kopyalanmıyor. Tek kelimelik adlar o
   aşamaların sıkıştırılmış hâli:
     Defter ← "Gelir, gider ve fatura takibi"   (çıktısı exchange.outputs[0])
     Beyan  ← "KDV ve yıllık beyan"
     Rapor  ← "Finansal raporlama ve analiz"
     Arşiv  ← "Banka ve denetim uyumu"          (gains[2] aynı şeyi söylüyor) */
const P = ACCOUNTING_DUBAI.scope.phases;

const LEAVES: HeroSceneItem[] = [
  { key: "defter", word: "Defter", meta: P[1].line, art: <ArtDefter /> },
  { key: "beyan", word: "Beyan", meta: P[2].line, art: <ArtBeyan /> },
  { key: "rapor", word: "Rapor", meta: P[3].line, art: <ArtRapor /> },
  { key: "arsiv", word: "Arşiv", meta: P[4].line, art: <ArtArsiv /> },
];

export default function AccountingHeroCard() {
  /* İSKELET ARTIK ORTAK. Sahne kutusu, ad kutusu, şerit, künye, ölçüler,
     geçişler, duraklatma mantığı, erişilebilir ad ve hidrasyon kuralı
     HeroSceneCard'da. Burada kalan tek şey BU SAYFAYA AİT OLAN: dört çizim,
     dört kelime, dört satır, bekleme süresi ve künye cümlesi.

     `ordered` VERİLMEDİ (varsayılan false): dört iş aynı anda yürüyor, bir
     sıra yok. Şerit "bitti / şimdi / sıradaki" değil "açık / kapalı" boyanıyor
     ve geri sarma da yok — sıra olmayan yerde geri sarmanın anlamı olmazdı.
     Aynı sebeple `badge` da yok: "kim yapıyor" bilgisi bu kartın konusu değil.

     Künye cümlesi /dubai kartının aynı satırının TAM TERSİNİ söylüyor ve fark
     kasıtlı: orada süreç var, burada aynı anda yürüyen dört iş. */
  return (
    <HeroSceneCard
      ns="svmk"
      scenes={LEAVES}
      dwell={DWELL}
      railLabel="Muhasebe bölmeleri"
      foot={{
        icon: <Layers size={14} strokeWidth={2} aria-hidden="true" />,
        line: "Dört bölme, aynı anda yürüyor. Kapsamın tamamı aşağıda.",
      }}
    />
  );
}
