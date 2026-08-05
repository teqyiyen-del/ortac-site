"use client";

import { useCallback, useEffect, useState } from "react";
import { Layers } from "lucide-react";

import { ACCOUNTING_DUBAI } from "@/lib/accountingDubai";

/* ============================================================================
   ADAY 4 · "SAHNE" — muhasebe hero kartı
   CSS: src/app/css/lab-mhs.css · ad alanı .mhs-

   ------------------------------------------------------------------- NEREDEN
   Müşteri iki şeyi ayrı ayrı söyledi:
     "2 de ki mantık gibi bir mantığa gidip 4 tane şey göstermek mantıklı"
        → ADAY 2'NİN (Klasör) MANTIĞI: dört bölme, kendi kendine çeviriyor,
          ziyaretçi seçince duruyor.
     "böyle sağa doğru çıkan tırnaklardan değilde dubai sayfasındaki gibi"
        → ADAY 2'NİN SUNUMU DEĞİL: fihrist tırnakları gidiyor, yerine /dubai
          hero kartının (components/shared/HeroDubaiCards.tsx · .dhs-) dili
          geliyor.

   /dubai KARTINDAN NEYİ ALDIM
     · İskelet: kendi çerçevesi olan koyu panel → içinde sabit bir SAHNE
       kutusu → altında ad + tek satır → altında şerit → en altta tek künye
       satırı. Kart bu sırayla okunuyor.
     · Sahne kutusu HİÇ BOŞALMIYOR: bütün çizimler DOM'da, üst üste, görünen
       bir tanesi. Geçişte kartın yüksekliği oynamıyor.
     · Şerit hem gösterge hem kumanda: basınca kart orada duruyor, kalıcı.
     · "BEYAZ YÜZEY DEĞİL, MÜREKKEPTİR": beyaz yalnızca öndeki nesnenin dış
       hattında; gövde dolguları koyu, iç işaretler gri kademede, olay mavi.
     · Hidrasyon kalıbı: hareket tercihi YALNIZCA useEffect içinde okunuyor.

   /dubai KARTINDAN NEYİ ALMADIM
     · SIRA. O kart beş aşamayı gerçekleşme sırasıyla anlatıyor (karar →
       tescil → lisans → kimlik → banka) ve şeridi "bitti / şimdi / sıradaki"
       diye boyuyor. Burada sıra YOK: dört bölme aynı anda yürüyen dört iş.
       Şerit bu yüzden tek bir "açık olan"ı işaretliyor, ilerleme çizmiyor.
     · GERİ SARMA. Sırası olmayan bir sette "başa dönüş" diye bir şey yok;
       dört bölme kapalı bir halka, rewind durumu hiç doğmuyor.
     · "KİM YAPIYOR" ROZETİ (Siz / Ortac / Otorite). O rozet bir SÜRECİN
       sahipliğini bölüştürüyor; burada dördünü de aynı taraf yürütüyor, rozet
       dört kez aynı kelimeyi yazardı.
     · ANONİM ŞERİT. /dubai'de segmentler isimsiz (ad yukarıda, tek tek).
       Envanterde setin TAMAMI bir arada görünmeli, o yüzden segmentler adlı:
       ziyaretçi dört bölmenin dördünü de tek bakışta görüyor.
     · ÇİZİMLER. Tek bir şekli bile taşımadım — o kartın nesneleri kuruluş
       süreci (mühür, parmak izi, banka cephesi), buradakiler muhasebe
       (ciltli defter, beyanname, rapor kartı, arşiv dolabı).
     · motion/react. O kart girişi motion ile yapıyor; burada hiç yok, bütün
       hareket CSS geçişi. Bir bağımlılık ve bir hidrasyon riski eksik.

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
   useReducedMotion KULLANILMIYOR. Bu depoda beş ayrı kalıpta hidrasyon
   hatası çıkardı (`if (reduce) return null`, `{!reduce && …}`, `initial`
   içinde koşullu değer, `initial={{ width: reduce ? … }}`, `{hub && !reduce
   ? … : null}`). Burada hareket tercihi matchMedia ile YALNIZCA useEffect
   içinde okunuyor ve render ağacına hiç girmiyor: sunucu ile ilk istemci
   render'ı birebir aynı işaretlemeyi üretiyor, fark yalnızca zamanlayıcının
   kurulup kurulmadığı. Kalıp HeroDubaiCards.tsx'ten.

   SÜREKLİ ANİMASYON SAYISI: SIFIR. Tek bir sonsuz döngü yok — bütün hareket
   bir DURUM DEĞİŞİKLİĞİNE cevap, yani geçiş. Geçişler de yalnızca
   no-preference altında TANIMLANIYOR (bkz. lab-mhs.css sonu), o yüzden
   reduce açıkken getAnimations() bu karttan sıfır döndürüyor.

   SVG <text> YOK. Kartın bütün yazısı HTML'de; viewBox metni kapsayıcıyla
   ölçekliyor ve bu sahnede bir kez punto patlamasına yol açmıştı. Çizimlerde
   harf, rakam, tarih ve sahte resmî amblem de yok — hepsi siluet.
   ========================================================================= */

/* Bir bölmenin ekranda kalma süresi. Dört bölme = 16.4 saniyelik tam tur.
   Sitedeki döngülerden (60·42·37·34·31·29·26·23·20·19·17·15·13·11·5.3 s) ve
   iki komşu karttan (/dubai 3.8 s, Klasör 3.7 s) ayrı seçildi: aynı sayfada
   iki kart aynı ritimde nefes alırsa göz ikisini tek bir mekanizma sanıyor. */
const DWELL = 4100;

type Leaf = {
  key: string;
  /** şeritteki ve başlıktaki ad — bölmenin tek kelimesi */
  word: string;
  /** accountingDubai.ts'ten okunan tek satır; cümle bütçesinin tamamı */
  meta: string;
  art: React.ReactNode;
};

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
   hareket (lab-mhs.css · mhsPost) bu yolu adım adım yürüyor; duruş hâli
   dördüncü satır, yani translateY(84px). İki dosya bu 28'de anlaşmak zorunda:
   satır aralığı değişirse keyframe adımları da değişmeli. */
const LIVE_ROW = RIGHT_ROWS[0];

function ArtDefter() {
  return (
    <svg className="mhs-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      {/* sol sayfa — ikincil düzlem */}
      <rect className="mhs-sur-q" x="24" y="44" width="190" height="238" rx="10" />
      <rect className="mhs-dim" x="48" y="66" width="72" height="10" rx="5" />
      <path className="mhs-rule" d="M48 90 H190" />
      <path className="mhs-hair" d={LEFT_ROWS.map((y) => `M48 ${y + 19} H190`).join(" ")} />
      {LEFT_ROWS.map((y, i) => (
        <rect key={y} className="mhs-dim" x="48" y={y} width={LEFT_W[i]} height="9" rx="4.5" />
      ))}

      {/* sağ sayfa — sahnenin öznesi, tek beyaz kontur */}
      <rect className="mhs-sur-f" x="222" y="36" width="192" height="246" rx="10" />
      <rect className="mhs-ink" x="246" y="58" width="88" height="11" rx="5.5" />
      <path className="mhs-rule" d="M246 84 H392 M352 84 V258" />
      <path className="mhs-hair" d={RIGHT_ROWS.map((y) => `M246 ${y + 19} H392`).join(" ")} />
      {RIGHT_ROWS.map((y, i) => (
        <g key={y}>
          <rect className="mhs-dim" x="246" y={y} width={RIGHT_W[i]} height="9" rx="4.5" />
          <rect className="mhs-dim" x="364" y={y} width="22" height="9" rx="4.5" />
        </g>
      ))}
      {/* kapanış: hesabın altındaki çift çizgi */}
      <path className="mhs-rule" d="M246 244 H392 M246 250 H392" />

      {/* cilt — iki sayfanın kenarını bağlayan dikişler */}
      {[76, 122, 168, 214].map((y) => (
        <rect key={y} className="mhs-stitch" x="208" y={y} width="14" height="13" rx="3" />
      ))}

      {/* OLAY: işlenen satır */}
      {/* OLAY: işlenen satır. İkisi tek grupta, çünkü tek bir şeyin iki
          parçası — kaydedilen tutar ve o tutarın satırı. Grup aşağı doğru
          yürüyor, yani kayıt satır satır DEVAM EDİYOR.
          Mavi hücre gri tutar sütunuyla ORTAK MERKEZLİ (ikisi de 375'te):
          2 birim taşması "vurgulanmış hücre" okumasını veriyor, kayma değil. */}
      <g className="mhs-post">
        <path className="mhs-act-line" d={`M246 ${LIVE_ROW + 19} H392`} />
        <rect className="mhs-act" x="362" y={LIVE_ROW} width="26" height="9" rx="4.5" />
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
    <svg className="mhs-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      {/* teslim yarığı — kütle değil boşluk */}
      <rect className="mhs-sur-q" x="100" y="28" width="240" height="28" rx="9" />
      <rect className="mhs-slot" x="122" y="38" width="196" height="8" rx="4" />

      {/* geçmiş dönemler: en uzak ve ikinci düzlem */}
      <g transform="rotate(-6.5 220 190)">
        <rect className="mhs-sur-b" x="118" y="88" width="196" height="196" rx="10" />
      </g>
      <g transform="rotate(-3 220 186)">
        <rect className="mhs-sur-q" x="124" y="82" width="198" height="200" rx="10" />
      </g>

      {/* bu dönemin beyanı — sahnenin öznesi */}
      <g className="mhs-rise">
        <rect className="mhs-sur-f" x="130" y="76" width="200" height="206" rx="10" />
        <rect className="mhs-ink" x="152" y="98" width="86" height="11" rx="5.5" />
        <path className="mhs-rule" d="M152 124 H308" />
        {B_BOXES.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect className="mhs-box" x={x} y={y} width="68" height="40" rx="5" />
            <rect className="mhs-dim" x={x + 11} y={y + 24} width="34" height="7" rx="3.5" />
          </g>
        ))}
        {/* Toplam alanı: diğerlerinden geniş, çünkü beyanın kapandığı yer.
            İçindeki çubuk bir GÖSTERGE — dönem boyunca doluyor, dolduğunda
            beyan veriliyor. Kutu boş kalırken bile şeklini koruyor, yani
            "burada bir toplam var" cümlesi hareket olmadan da okunuyor. */}
        <rect className="mhs-box" x="152" y="240" width="156" height="28" rx="5" />
        <rect className="mhs-gauge" x="164" y="250" width="132" height="8" rx="4" />
      </g>

      {/* OLAY: yarığa dönük ok. Ucu (y=41) yarığın kendi boşluğunun (38..46)
          içinde bitiyor — panelin altında dursaydı "yarığa doğru" değil
          "panelin önünde" okunurdu. */}
      <path className="mhs-act" d="M230 41 l-12 23 h24 z" />
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
    <svg className="mhs-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      <defs>
        {/* Kırpma yolu kimliği bu karta özel: aynı id ikinci kez DOM'a girerse
            tarayıcı ilkine bağlanır ve öteki kartın çubuğu yanlış yerde
            kırpılır. */}
        {/* Yolun ALT KENARI tam tabanda (130+124 = 254). Bir birim bile aşağı
            inseydi çubuk duruş hâlinde tabanın altında ince bir mavi şerit
            olarak sızardı; şimdi duruş hâlinde tamamen görünmez. */}
        <clipPath id="mhsPlot">
          <rect x="120" y="130" width="272" height="124" />
        </clipPath>
      </defs>

      {/* arkadaki tablo kartı — ikincil düzlem */}
      <rect className="mhs-sur-q" x="52" y="32" width="196" height="132" rx="10" />
      <path className="mhs-hair" d="M70 66 H230 M70 90 H230 M70 114 H230 M70 138 H230" />
      {TABLE_ROWS.map(([y, w]) => (
        <rect key={y} className="mhs-dim" x="70" y={y} width={w} height="8" rx="4" />
      ))}

      {/* öndeki rapor kartı — sahnenin öznesi */}
      <rect className="mhs-sur-f" x="104" y="92" width="302" height="196" rx="12" />
      <rect className="mhs-ink" x="128" y="114" width="94" height="11" rx="5.5" />
      <path className="mhs-hair" d="M128 168 H382 M128 196 H382" />
      <path className="mhs-rule" d="M128 254 H382" />
      {/* --i: soldan sağa yürüyen yeniden-hesap dalgasının gecikmesi. Rapor
          defterden TÜRETİLEN bir şey; dalga o türetmenin sürdüğünü söylüyor. */}
      {BARS.map((h, i) => (
        <rect
          key={h}
          className="mhs-bar"
          style={{ "--i": i } as React.CSSProperties}
          x={140 + i * 40}
          y={254 - h}
          width="28"
          height={h}
          rx="3"
        />
      ))}

      {/* OLAY: içinde bulunulan dönem, tabandan yükseliyor */}
      <g clipPath="url(#mhsPlot)">
        <rect
          className="mhs-act"
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
          <rect className="mhs-spine" x={s.x} y={base - s.h} width={s.w} height={s.h} rx="3" />
          <rect
            className="mhs-dim"
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
    <svg className="mhs-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      <rect className="mhs-sur-f" x="36" y="26" width="368" height="266" rx="12" />
      <SpineRow items={UPPER} base={SHELF_TOP} />
      <SpineRow items={LOWER} base={SHELF_BOT} />
      <path className="mhs-shelf" d={`M36 ${SHELF_TOP} H404 M36 ${SHELF_BOT} H404`} />

      {/* yuva: çekilen dosyanın raftaki boşluğu */}
      <rect
        className="mhs-slot"
        x={SLOT.x}
        y={SHELF_BOT - SLOT.h}
        width={SLOT.w}
        height={SLOT.h}
        rx="3"
      />

      {/* OLAY: aranan dosya. Yuvasından yukarı çekiliyor; opaklık yok, nesne
          yok olup var olmuyor, yerinden çıkıyor. */}
      <g className="mhs-pull">
        <rect
          className="mhs-act-file"
          x={SLOT.x - 1}
          y={SHELF_BOT - SLOT.h - 42}
          width={SLOT.w + 2}
          height={SLOT.h}
          rx="3"
        />
        <rect
          className="mhs-act-tag"
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

const LEAVES: Leaf[] = [
  { key: "defter", word: "Defter", meta: P[1].line, art: <ArtDefter /> },
  { key: "beyan", word: "Beyan", meta: P[2].line, art: <ArtBeyan /> },
  { key: "rapor", word: "Rapor", meta: P[3].line, art: <ArtRapor /> },
  { key: "arsiv", word: "Arşiv", meta: P[4].line, art: <ArtArsiv /> },
];

export default function MhSahne() {
  const [active, setActive] = useState(0);
  /* İki ayrı duraklatma sebebi, ikisi de /dubai kartındaki gerekçeyle: fare
     kartın üstünde (geçici) ve ziyaretçi bir segmente bastı (kalıcı).
     İkincisi kalıcı, çünkü basmak "ben seçiyorum" demek; dört saniye sonra
     kartın onu geri alması kararı çöpe atardı. */
  const [hovered, setHovered] = useState(false);
  const [taken, setTaken] = useState(false);

  useEffect(() => {
    /* Hareket tercihi YALNIZCA burada okunuyor — render ağacına girmiyor,
       yani sunucu ve istemci aynı işaretlemeyi üretiyor. Hareket kapalıysa
       zamanlayıcı hiç kurulmuyor: kart ilk bölmede duruyor ve çevirmek
       isteyen şeride basıyor. */
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || hovered || taken) return;
    const id = window.setTimeout(() => {
      setActive((v) => (v + 1) % LEAVES.length);
    }, DWELL);
    return () => window.clearTimeout(id);
  }, [active, hovered, taken]);

  const pick = useCallback((i: number) => {
    setActive(i);
    setTaken(true);
  }, []);

  return (
    <div
      className="mhs"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* ---- sahne: kartın üçte ikisi, tek nesne ---- */}
      {/* Dört çizim de DOM'da ve üst üste; görünen bir tanesi. Sebebi ölçü ve
          süreklilik: sahne kutusu hiç boşalmıyor, geçişte kartın yüksekliği
          oynamıyor ve çizimler her turda yeniden kurulmuyor. */}
      <div className="mhs-stage" aria-hidden="true">
        {LEAVES.map((l, i) => (
          /* data-leaf: her bölmenin GİRİŞ BEATİ kendine ait (defterde mavi
             tutar iniyor, beyanda yaprak yarığa doğru kalkıyor, raporda çubuk
             tabandan yükseliyor, arşivde dosya yuvasından çekiliyor). Ortak
             bir beat dördünü de aynı sahneye çevirirdi. */
          <div key={l.key} className="mhs-scene" data-leaf={l.key} data-on={i === active}>
            {l.art}
          </div>
        ))}
      </div>

      {/* ---- açık olan bölmenin adı ve karşılığı ---- */}
      {/* Dördü de DOM'da, mutlak konumla üst üste: "Defter" ile "Arşiv"
          arasındaki genişlik farkı hizayı bozmuyor ve bölme değişirken kartın
          altı zıplamıyor. */}
      <div className="mhs-say">
        {LEAVES.map((l, i) => (
          <div key={l.key} className="mhs-c" data-on={i === active} aria-hidden={i !== active}>
            <b className="mhs-word">{l.word}</b>
            <span className="mhs-meta">{l.meta}</span>
          </div>
        ))}
      </div>

      {/* ---- şerit: hem gösterge hem kumanda ---- */}
      {/* SEGMENTLERDE GÖRÜNEN AD YOK. Bir tur önce vardı; müşteri kaldırttı:
          "zaten üst kısımda yazıyor ya seçince o yüzden bide şu attığım kısımda
          isimleri yazmasın." Açık bölmenin adı kartın üstünde 30 punto ile
          zaten duruyor, şeritte ikinci kez yazmak tekrardı.

          ERİŞİLEBİLİR AD KALDI — aria-label ile. Önce görsel olarak gizlenmiş
          metin (1px kutu + clip-path) denendi, çünkü adın düğmenin KENDİ
          içeriğinden gelmesi kural olarak daha sağlam. ÖLÇÜLDÜ VE TUTMADI:
          erişilebilirlik ağacında dört düğme de ADSIZ çıktı. Aynı sayfaya
          konan üç kontrol düğmesi farkı kesinleştirdi — aria-label'lı ve
          görünür metinli olanlar adlarıyla listelendi, gizli metinli olan hiç
          listelenmedi. Yani bu kalıp burada ada dönüşmüyor.

          İKİSİ BİRDEN KULLANILMADI: aria-label var olan içeriği zaten ezer,
          gizli metin de yanında dursaydı ölü bir kopya olur ve zamanla
          asıldan ayrı düşerdi. Ad tek yerden geliyor: LEAVES'in `word` alanı —
          kartın üstündeki 30 puntoluk başlığı basan alanla aynı, yani ikisi
          ayrı düşemiyor. Durum yine aria-pressed ile duyuruluyor. */}
      <div className="mhs-rail" role="group" aria-label="Muhasebe bölmeleri">
        {LEAVES.map((l, i) => (
          <button
            key={l.key}
            type="button"
            className="mhs-step"
            data-on={i === active}
            aria-pressed={i === active}
            aria-label={l.word}
            onClick={() => pick(i)}
          >
            <i aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Kartın tek sabit cümlesi. Bir iddia kurmuyor: ne süre veriyor ne
          sonuç. /dubai kartının aynı satırı "gerçekleşme sırasıyla" diyor;
          bu kartınki tam tersini söylüyor ve fark kasıtlı — orada süreç var,
          burada aynı anda yürüyen dört iş. */}
      <p className="mhs-foot">
        <Layers size={14} strokeWidth={2} aria-hidden="true" />
        <span>Dört bölme, aynı anda yürüyor. Kapsamın tamamı aşağıda.</span>
      </p>
    </div>
  );
}
