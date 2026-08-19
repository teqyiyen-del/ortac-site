"use client";

import { useCallback, useId } from "react";
import SmartLink from "@/components/shared/SmartLink";
import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { gtm } from "@/lib/gtm";
import { useOrtacStore, type Country } from "@/lib/store";

/* ============================================================================
   HERO SAHNESİ — CANLI · "EŞİK DUVARI"
   Ana sayfa hero'sunun varsayılan sahnesi. CSS: src/app/css/hero-portal.css
   Ad alanı .hgt-, değişkenler --hgt-*.

   Müşterinin bu turdaki cümlesi, birebir: "ana sayfanın herosu için P1 i
   seçtik ama onu şu içinde bir şey olmayan kapılar vardı ya bir önceki
   versiyonda ve yanda seçili olmayanlar soluk olarak gözüküyordu yine de,
   onun gibi yapıcaz. P1 tasarımında ama yanda soluk şekilde gözükecek şekilde."

   Yani sahne İKİ KAYNAĞIN BİRLEŞİMİ ve hangi parçanın nereden geldiği aşağıda
   madde madde yazılı. Kaynaklar:
     P1  = /lab/hero-portal · "Eşik" (lab/HeroPortalP1.tsx + css/lab-ptl1.css)
           Tek, sabit, taş kasalı kemerli açıklık; içinden ülkenin göğü ve
           silueti görünüyor; eşikten ışık süzüyor.
     ÖNCEKİ = home/HeroScene.tsx + css/hero-scene.css · "Eşik" (sokak cephesi)
           Yatayda kayan bir DUVAR: seçili kapı ortada ve yanık, seçilmeyen
           ülkeler solda ve sağda sönük duruyor, içleri boş.

   BURADAN GELEN ŞEY (P1)                | BURADAN GELEN ŞEY (ÖNCEKİ SAHNE)
   -------------------------------------+---------------------------------------
   kapının biçimi: taş kasa + iç sıva    | duvar kurgusu: beş yuvalı şerit,
     pahı + kemer derzleri + kilit taşı  |   yatayda kayıp seçileni ortalıyor
   açıklığın içinde ÜLKENİN KENDİSİ      | yanan/sönük ayrımı: tek yanan kapı,
     (gök + siluet, Vista)               |   ötekiler sönük ve İÇLERİ BOŞ
   eşikten dışarı süzülen ışık huzmesi   | yuva başına tabela (sönük de olsa)
   ışığın kasaya vurduğu kenar (rim)     | zemin çizgisi sahnenin tamamında
   nefes alan huzme (7.1 s)              | uçlardaki iki kopya kapı
   tuval 360x330, açıklık x 40..320,     | 700 ms yaylanmalı kayma
     kemer hizası y=170, eşik y=300      |

   ÜÇÜNCÜ BİR KAYNAK: KAPININ ÜLKEYE GÖRE DEĞİŞMESİ. Profil tablosu (aşağıda
   PROFIL) bir önceki canlı sahneden, "Serbest Geçit"ten geliyor. Üç orandan
   ikisi hiç değişmedi; KKTC bu turda müşterinin isteğiyle 0.62'den 1.0'a
   çıktı ve gerekçesi PROFIL satırında sayılarla duruyor. P1'in
   kendi kuralı "kapı tek ve hiç değişmiyor" idi ve o kural burada bilerek
   bozuldu: duvarda yan yana duran üç kapı aynı olsaydı sahne "üç ülke" değil
   "tekrarlayan bir desen" okunurdu. Bir önceki sokak cephesinde de üç kapı üç
   ayrı mimariydi; müşterinin beğendiği yan kapı davranışı zaten o sahnenin.

   ====================== NEYİ KAYBETTİK · AÇIK KAYIT ======================
   "Serbest Geçit" (koridor) gitti ve onunla birlikte üç şey gitti:
     1) SERBEST KATMAN VE MASKESİ. Koridorun yankıları sahne kutusunun dışına
        çıkıp hero'nun başlığına kadar varıyordu; onları söndüren iki katmanlı
        maske de gitti (hero-portal.css'in en uzun bloğuydu). Bu sahne kutunun
        içinde duruyor, kutu yine `overflow: clip`.
     2) DALGA (aktarim kalıbı, 8.09 s). Koridorun sekiz halkası üstünden geçen
        ışıktı; halka kalmayınca taşıyıcısı da kalmadı.
     3) IZGARA KISMASI. `.hgt-hero .hsc-bg-grid { opacity: .55 }` kuralı
        yankıların ızgara içinde kaybolmasını çözüyordu; yankı yok, kural yok,
        hero'nun onaylanmış ızgarası tam güçte geri döndü.
   Sonuç: sahnenin sürekli hareketi 14'ten 3'e indi (huzme 7.1 s · pus 13.1 s ·
   uyarı ışığı 3.7 s) ve üçü de P1'in kendi hareket hikâyesi. Sayı düştü ama
   hareket görünürlüğü düşmedi: eski on dördün sekizi ekranda tek bir dalga
   olarak okunuyordu. Yine de bu, müşteriye sorulacak açık bir madde.

   ---------------------------------------------- NEDEN useReducedMotion YOK
   Bu dosyada hareket tercihini okuyan tek satır bile yok ve bu bilinçli
   (tuzak A). Sahnenin bütün hareketi CSS'te, @media (prefers-reduced-motion)
   kapısının altında. Bir önceki sokak cephesinde kanca bir zamanlayıcının
   süresi için duruyordu (ışığın ilk yanması); burada öyle bir zamanlayıcı da
   yok, kapı ilk kareden itibaren yanık. Sunucu ile istemcinin ürettiği ağaç
   birebir aynı.

   ERİŞİLEBİLİRLİK: sahnenin tamamı aria-hidden (dekoratif tekrar). Ağaçta
   görünen tek şey seçici: <fieldset> + görsel olarak gizli <legend> "Ülke
   seçin" + üç native radyo. Ayrı bir aria-live satırı BİLEREK yok — radyo
   kendi durumunu zaten duyuruyor. Seçim zustand'daki tek mağazayı sürüyor,
   yani hero'daki ülke sayfanın geri kalanını (ThreeCountries, fiyat özeti,
   hesaplayıcı) sürmeye devam ediyor; bu bağ kopmadı.
   ========================================================================= */

const ORDER: Country[] = ["dubai", "ingiltere", "kktc"];

/* DUVARDA BEŞ YUVA VAR, ÜÇ DEĞİL — bir önceki sahnenin kararı, birebir taşındı.
   Sebep tamamen kompozisyon: üç kapılık bir şeritte uçtaki ülkeyi (Dubai ya da
   KKTC) seçtiğinizde bir yan komple boş kalıyor, ekranın yarısı bomboş siyah
   oluyor ve sahne "kesilmiş" duruyor. Baştaki ve sondaki iki kapı, sıranın öbür
   ucundaki kapının aynısı; hiçbir zaman yanmıyorlar ve İÇLERİ HİÇ ÇİZİLMİYOR
   (ülke çizimi yalnız gerçek üç yuvada duruyor, bkz. HeroPortal). İkisi ekranda
   aynı anda görünmüyor, o yüzden tekrar fark edilmiyor.

   Kaydırma hesabı bundan bozulmuyor: gerçek yuva ORDER'daki sırasının bir
   fazlasında duruyor, beşlinin ortası da 2, yani fark yine (1 - index). */
const WALL: Country[] = ["kktc", "dubai", "ingiltere", "kktc", "dubai"];

/* ============================ TABELANIN ÇENGELİ ============================
   Kapının yanında yazacak tek satır: o ülkenin EN ÇOK TERCİH EDİLME SEBEBİ.
   Cümle uydurulmuyor — her ülkenin kendi sayfasında zaten yayınlanmış olan
   avantaj listesinden (countryContent · pros) seçiliyor. Seçim ikonla
   yapılıyor, sıra numarasıyla değil: listeye yeni bir madde eklendiğinde ya da
   sıralama değiştiğinde çengelin kayması gerekmiyor.

   NEDEN DUBAİ'DE pros[0] DEĞİL: ilk madde "Kurumlar vergisi %0*" ve yıldız
   gerçek bir şart taşıyor. Hero'da dipnot yeri yok; koşulu olmayan bir vergi
   iddiası burada yanlış beyan olur. */
const HOOK_ICON: Record<Country, string> = {
  dubai: "id", // "Şirket üzerinden oturum vizesi"
  ingiltere: "remote", // "Ziyaret şartı yok"
  kktc: "pin", // "Türkiye'ye yakın"
};

function hookFor(c: Country): string {
  const pros = COUNTRY_CONTENT[c].pros;
  return (pros.find((p) => p.icon === HOOK_ICON[c]) ?? pros[0]).title;
}

/** SVG id'leri belge genelinde tekil olmak zorunda ve çakışma sessizce yanlış
 *  gradyanı gösteriyor. Çakışma teorik değil: /lab/hero-portal'da bu canlı
 *  hero ile altı lab sahnesi aynı anda DOM'da. React'in useId'i harf dışı
 *  karakter üretiyor (sürüme göre iki nokta ya da köşeli tırnak) ve url(#…)
 *  referansı onları kaldıramıyor; en ucuzu hepsini atmak. */
function useArtId(prefix: string): string {
  return `${prefix}${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
}

/* ############################################################################
   GEOMETRİ — P1'İN TUVALİ, TEK BİRİM DEĞİŞMEDİ

   Tuval 360 x 330. Kemerin bindiği hiza y=170, eşik (zemin) y=300, orta x=180.
   Üç eşmerkezli yarı genişlik:
     açıklık   140  (x 40..320)   — kırpma maskesi, ışık kenarı, huzmenin ağzı
     iç pah    126  (x 54..306)   — açıklığın kalınlığını veren tek çizgi
     kasa dışı 166  (x 14..346)   — taş kasanın dış konturu

   ÜÇÜ DE AYNI FONKSİYONDAN ÇIKIYOR ve (180,170) etrafında homotetik. Bu bir
   kolaylık değil, kemer derzlerinin ÇALIŞMA ŞARTI: iç yay ile dış yay aynı
   merkezden aynı oranla büyüdüğü için bir derzin iki ucu tek bir ölçekleme ile
   bulunuyor (aşağıda `derzler`), yani hangi ülke seçilirse seçilsin derz
   gerçekten radyal kalıyor. P1'de bu üç yay ayrı ayrı elle yazılmıştı ve
   derzlerin uçları da elle hesaplanmış sabitlerdi; kapı ülkeye göre
   değişmeye başlayınca elle yazmak imkânsız oldu.

   DOĞRULAMA: fonksiyon P1'in yuvarlak kemeriyle (yay=1, sivri=false)
   çağrıldığında P1'in elle yazdığı sayıları birebir üretiyor — derzin iç ucu
   (48.4, 122.1), dış ucu (24.0, 113.2); P1'de "M48.4 122.1 L25 113.2" yazıyor
   (dış uçtaki 1 birimlik fark P1'in yuvarlamasından, doğrusu burada).
   ############################################################################ */

const CX = 180;
/** Kemerin bindiği hiza. */
const YS = 170;
/** Eşik: kapının ayak bastığı çizgi. Zemin çizgisi sahne düzeyinde ve bu
 *  hizaya oturuyor (css · .hgt-floorline). */
const YF = 300;
const W_ACIK = 140;
const W_PAH = 126;
const W_KASA = 166;

const r1 = (n: number) => +n.toFixed(1);

/** Bir kapının kemer profili.
 *    yay    yayın yüksekliği, yarı genişliğe oran
 *    sivri  yay yerine iki kübik eğri, tepede birleşiyor
 *    orgu   kemer derzleri saç teliyle değil ANA KALEMLE çiziliyor
 *
 *  DÜZ ÜYE ALANI YOK, VE OLMAYACAK. Bu tipin bir zamanlar `kiris` (kutu
 *  tepesinde yatay üye) ve `dikme` (uçlarından inen iki dikey) alanları vardı;
 *  müşteri onları görüp istemedi: "portalın üstlerinde bu iki ülkede çizgi
 *  kalmış." Alanlar "kullanılmıyor" diye bırakılmadı, silindi — ölü alan bir
 *  sonraki turda yeniden doldurulmaya davetiye. `orgu` da aynı kurala tabi:
 *  üç ülkeden birinde açık, yani ölü değil. */
type Profil = {
  yay: number;
  sivri: boolean;
  orgu: boolean;
};

/** KAPININ profili, ülkeye göre. Bir önceki canlı sahneden değişmeden taşındı.
 *  Üçü de AYNI KUTUYA oturuyor (aynı ayak, aynı hiza, aynı yarı genişlik);
 *  kutu ortak olmasa duvar boyunca kapılar birbirinden farklı yükseklikte
 *  ayaklara basardı ve şerit bir cephe değil bir liste gibi okunurdu.
 *
 *  AYIRT ETME ARTIK TEK BİR SAYIYA BİNMİYOR. Üç yay 1.0 (sivri) · 0.86 · 1.0
 *  ve son ikisi de yuvarlak, yani KKTC ile İngiltere'yi ayıran şey yayın
 *  yüksekliği değil derzin kalemi (orgu). Gerekçe aşağıda, KKTC satırında. */
const PROFIL: Record<Country, Profil> = {
  /* İlk canlı sahne (HeroScene · ART.dubai): "sivri kemer, üç kapının en
     yükseği ve en darı." Eğrinin denetim noktaları o yoldan oranlanarak alındı
     (M42 330 V168 C42 108 68 56 110 28 …): birinci denetim yayın %43'ünde,
     ikincisi %80'inde ve yarı enin %62'sinde. Profil uydurulmadı, ölçüldü. */
  dubai: { yay: 1, sivri: true, orgu: false },
  /* Georgian kapı, yarım daire camlık. Oradaki KORNİŞ taşınmadı: düz bir yatay
     üyeydi. Kimlik yayın basıklığında: 0.86 ile üç kapının en basığı. */
  ingiltere: { yay: 0.86, sivri: false, orgu: false },
  /* ---------------------------------------- KKTC · BU TURDA 0.62'DEN 1.0'A
     Müşteri: "kktc nin kapısı biraz garip hissettirdi, tipini az adam et onun.
     TABAN · Önceki canlı · eşik ve tabela versiyonundaki kapılar gibi fln
     olabilir belki biraz." Referans o yüzden tahmin değil, dosyada duruyor:
     HeroScene · ART.kktc.

     REFERANSIN SAYILARI (tuval 220x330, yarı genişlik w=64):
       açıklık   M46 330 V196 A64 64 …   → yay/w = 64/64 = 1.00, TAM YARIM DAİRE
       kasa      A80 80                  → 1.00, kasa/açıklık = 80/64 = 1.25
       ayak      330-196 = 134           → 2.09 w  (kapı portre)
       süsleme   kemer taşları ANA KALEMLE (hsc-ln), saç teliyle değil
     BUGÜNKÜ (tuval 360x330, w=140), ÖNCE → SONRA:
       yay/w     0.62 → 1.00      yay yüksekliği  86.8 → 140 birim
       tepe y    83.2 → 30        açıklık boyu   216.8 → 270 birim
       ayak      130 = 0.93 w (kutu ortak olduğu için değişmiyor)
       kasa/açıklık 166/140 = 1.19 (referansın 1.25'ine yakın, değişmedi)

     NEDEN TAM 1.0 VE ARADA BİR SAYI DEĞİL. 0.62'de yay bir elips: tepede
     eğrilik yarıçapı w²/a = 226, ayakta a²/w = 54 birim, yani köşeler keskin
     tepe düz — ekranda taş kemer değil TÜNEL AĞZI okunuyor ("garip"). 1.0'da
     üç yay da (açıklık 140, pah 126, kasa 166) gerçek çember ve merkezleri
     ortak (180,170); eğrilik sabit, derzler yaya dik, kilit taşı kendi
     kemerinin sırtında. Ara değerler denendi ve elendi: 0.90 ile 0.86 (İngiltere)
     ekranda ayırt edilmiyordu (229px'lik çizimde tepe farkı 2.8px).

     BEDELİ VE ÖDEMESİ: tepe artık Dubai ile aynı hizada (ikisi de y=30).
     Dubai'nin kimliği zaten yükseklik değil SİVRİLİK — yanaklarda sivri kemer
     yuvarlaktan alçak kalıyor (u=0.25'te y 87.9'a karşı 74.7), tepede tek
     noktada birleşiyor. KKTC'yi İngiltere'den ayıran şey ise `orgu`: referansın
     kendi kararı, "bu kapının karakteri ışıkta değil örgüsünde". */
  kktc: { yay: 1, sivri: false, orgu: true },
};

/** Yayın konturu: sol ayaktan yukarı, kemerden geçip sağ ayağa. Kapalı DEĞİL —
 *  kapatılsaydı eşik boyunca bir taban çizgisi de çizilirdi, yani kaldırılan
 *  düz yatay üye arka kapıdan geri gelirdi. Kapının tabanı zaten ışığın
 *  kendisi (huzme) ve sahne düzeyindeki zemin çizgisi. */
function kemer(p: Profil, w: number): string {
  const a = p.yay * w;
  if (p.sivri) {
    return (
      `M${r1(CX - w)} ${YF} V${YS} ` +
      `C${r1(CX - w)} ${r1(YS - 0.43 * a)} ${r1(CX - 0.62 * w)} ${r1(YS - 0.8 * a)} ${CX} ${r1(YS - a)} ` +
      `C${r1(CX + 0.62 * w)} ${r1(YS - 0.8 * a)} ${r1(CX + w)} ${r1(YS - 0.43 * a)} ${r1(CX + w)} ${YS} ` +
      `V${YF}`
    );
  }
  return `M${r1(CX - w)} ${YF} V${YS} A${r1(w)} ${r1(a)} 0 0 1 ${r1(CX + w)} ${YS} V${r1(YF)}`;
}

/** Yay üzerinde bir nokta. u = 0 sol ayak, u = 1 sağ ayak.
 *  Yuvarlak profilde u doğrudan açı (πu); sivri profilde kübiğin parametresi.
 *  İkisinin "aynı u"su aynı açıya karşılık gelmiyor ve gelmesi de gerekmiyor:
 *  bu parametre yalnızca derzleri yay boyunca DENGELİ dağıtmak için var. */
function yayNoktasi(p: Profil, w: number, u: number): [number, number] {
  const a = p.yay * w;
  if (!p.sivri) {
    return [CX - w * Math.cos(Math.PI * u), YS - a * Math.sin(Math.PI * u)];
  }
  const sag = u > 0.5;
  const t = sag ? 2 * (1 - u) : 2 * u;
  const m = 1 - t;
  const px = [CX - w, CX - w, CX - 0.62 * w, CX];
  const py = [YS, YS - 0.43 * a, YS - 0.8 * a, YS - a];
  const bx = m ** 3 * px[0] + 3 * m ** 2 * t * px[1] + 3 * m * t ** 2 * px[2] + t ** 3 * px[3];
  const by = m ** 3 * py[0] + 3 * m ** 2 * t * py[1] + 3 * m * t ** 2 * py[2] + t ** 3 * py[3];
  return [sag ? 2 * CX - bx : bx, by];
}

/** Kemer taşlarının derzleri — P1'de 20°/45°/70° ve aynaları. */
const DERZ = [20, 45, 70, 110, 135, 160].map((d) => d / 180);

/** Altı derz tek yolda. Her derz açıklık yayındaki bir noktadan kasa yayındaki
 *  KARŞILIĞINA gidiyor; karşılık homotetiden çıkıyor (oran 166/140 = 1.1857),
 *  yani derz gerçekten radyal ve profil değişse de radyal kalıyor. */
function derzler(p: Profil): string {
  const k = W_KASA / W_ACIK;
  return DERZ.map((u) => {
    const [x, y] = yayNoktasi(p, W_ACIK, u);
    return `M${r1(x)} ${r1(y)} L${r1(CX + (x - CX) * k)} ${r1(YS + (y - YS) * k)}`;
  }).join(" ");
}

/** Yayın sağ yarısında, merkezden `dx` kadar uzaktaki noktanın u parametresi.
 *  x, u'ya göre [0.5, 1] aralığında artan olduğu için ikiye bölme yetiyor;
 *  otuz adım 1e-9 altına iniyor. Sivri profilde kübiği tersine çevirmenin
 *  kapalı formu yok, sayısal çözüm hem kısa hem profilden bağımsız. */
function uIcinX(p: Profil, w: number, dx: number): number {
  let lo = 0.5;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const orta = (lo + hi) / 2;
    if (yayNoktasi(p, w, orta)[0] - CX < dx) lo = orta;
    else hi = orta;
  }
  return (lo + hi) / 2;
}

/** Kilit taşı: kemeri KAPATAN tek dolu parça. Kasa tepesinin 4 birim içinden
 *  başlıyor, açıklık tepesinin 4 birim altında bitiyor — yani iki yayın
 *  arasındaki boşluğu tam dolduruyor ve ülkeye göre kendiliğinden uzuyor
 *  kısalıyor. Üst kenar yarı eni 14, alt kenar 8 birim (P1'in oranları).
 *
 *  İKİ KENARI DA YAYIN ÜSTÜNDE, DÜZ DEĞİL — VE BU BİR ÖLÇÜM SONUCU.
 *  P1'de bu taş "M166 8 H194 L188 34 H172 Z" diye yazılıydı, yani üstü 28 alt
 *  16 birimlik iki DÜZ YATAY kontur taşıyordu. Tek kapılık bir sahnede kimse
 *  fark etmedi; burada üç kapı yan yana duruyor ve depo kuralı net: üç ülkede
 *  de düz yatay üye sıfır (müşteri: "portalın üstlerinde bu iki ülkede çizgi
 *  kalmış"). Tarama bu iki kenarı bulup raporladı, o yüzden kenarlar taşın
 *  oturduğu yayı izliyor.
 *
 *  Bedava gelen ikinci fayda: gerçek bir kilit taşının dış yüzü zaten kemerin
 *  sırtındadır. Sivri kemerde tepe noktası taşın üstünde de bir sivrilik
 *  oluşturuyor, basık kemerde kenar neredeyse düzleşiyor — taş kendi kemerinin
 *  taşı oluyor.
 *
 *  KENAR BAŞINA ÜÇ NOKTA (iki parça), dokuz değil — ve bu da ölçümden çıktı.
 *  Dokuz örnekle denendi: yayı daha iyi izliyor ama tepedeki parçalar tek tek
 *  fazla kısa kalıyor ve tarama onları yeniden "düz yatay" sayıyordu (kktc'de
 *  8, İngiltere'de 4.5 birimlik koşular). İki parçada her yarının eğimi tek ve
 *  belirli; koşu kenarın tamamı boyunca sürüyor ve (ymax - ymin) eşiği aşıyor,
 *  yani üç ülkede de sıfır. Ekranda fark yok: taş en geniş kırılımda 30 piksel
 *  ve basık kemerde iki parçanın sapması 0.38 birim (bir pikselin dörtte biri).
 *  Sivri kemerde ise tam tersine GEREKLİ — tepe noktası taşın da tepesi. */
const KILIT_N = 2;

function kilitTasi(p: Profil): string {
  /* Yarıçapı 4 birim küçülmüş iki yay: taşın dış yüzü kasanın 4 birim içinde,
     iç yüzü açıklığın 4 birim altında. Bölme yay oranına: 0.62'lik basık bir
     kemerde 4 birimlik DÜŞEY kaçıklık, yarı genişlikte 6.45 birim demek. */
  const wt = W_KASA - 4 / p.yay;
  const wb = W_ACIK - 4 / p.yay;
  const du = uIcinX(p, wt, 14) - 0.5;
  const db = uIcinX(p, wb, 8) - 0.5;
  const nokta = (w: number, u: number) => {
    const [x, y] = yayNoktasi(p, w, u);
    return `${r1(x)} ${r1(y)}`;
  };
  const ust: string[] = [];
  const alt: string[] = [];
  for (let i = 0; i <= KILIT_N; i++) {
    ust.push(nokta(wt, 0.5 - du + (2 * du * i) / KILIT_N));
    alt.push(nokta(wb, 0.5 + db - (2 * db * i) / KILIT_N));
  }
  return `M${ust.join(" L")} L${alt.join(" L")} Z`;
}

/** Ağzın açıklığı, KAPALI: ülkenin göründüğü pencerenin kırpma maskesi. Bu Z
 *  bir çizgi üretmiyor, kırpma yolunu kapatıyor.
 *
 *  Ülkeyi kendi kapısının biçiminden görüyorsunuz ve üç kadraj da ÖLÇÜLDÜ
 *  (Vista tuvali `translate(-38 74) scale(1.09)` ile yerleşiyor, yani ufuk
 *  y=292'ye düşüyor): Dubai'de sivri kemerin ucu (30) Burj Khalifa'nın
 *  iğnesinin (82.7) üstünde, İngiltere'de yuvarlak baş (49.6) Tower Bridge'in
 *  külahlarının (124.1) üstünde, KKTC'de yarım daire (bu turda 83.2'den 30'a
 *  çıktı) Beşparmak'ın en yüksek tepesinin (174.3) üstünde. Bir profil
 *  KISILIRSA bu üç sayı yeniden kontrol edilmeli; yükselmesi kadrajı
 *  genişletiyor, yani KKTC'nin beş tepesi (x 57.9 … 308.6) yerinde —
 *  onları belirleyen ağzın ENİ ve o değişmedi. */
const agiz = (c: Country) => `${kemer(PROFIL[c], W_ACIK)} Z`;

/* ############################################################################
   VISTA — ÜLKENİN KENDİSİ
   Tuval: 0 0 400 220 · ufuk (yer/deniz çizgisi) y = 200 · üstü gökyüzü.
   Bu bölüm bir önceki sahneden DEĞİŞMEDEN geldi: çizimler, palet ve pus bandı
   aynı; değişen tek şey kırpıldıkları açıklık ve ölçek.

   NEDEN SİLUET, NEDEN ÇİZİM. Müşterinin cümlesi net: "dubai seçince
   burjkhalifa gözüksün". Fotoğraf değil çizim, üç sebeple: (1) depodaki ülke
   kareleri gündüz fotoğrafı, hero'nun #080808 gecesine bir fotoğraf koymak
   sahneyi ikiye bölüyor, (2) bir Unsplash kimliğinin arkasındaki kare
   değişebiliyor ve bu depoda bir kimlik 404 döndü (lib/media.ts) — hero
   sitenin ilk ekranı, orada kırık kare kabul edilemez, (3) çizimde çizgi
   kalınlığı, ışık yönü ve odak bize ait.

   DERİNLİK ALFAYLA DEĞİL, DÖRT KADEMELİ OPAK MÜREKKEPLE (koyu yüzeyde alfa
   yok): uzak → orta → mark (ülkenin imzası, tek parlak kenarı olan tek nesne)
   → yakın. Gökyüzü üç durak ve renkler uydurulmadı: ilk canlı sahnenin o ülke
   için ONAYLANMIŞ ışık paletinden geliyor (hero-scene.css · --hsc-l1/2/3).

   İDDİA YOK: çizimlerde tek harf yok — yazı, rakam, arma, logo, marka yok.
   Bir siluet "burada ofisimiz var" demiyor, "bu ülke" diyor.
   ############################################################################ */

/** Vista'nın çizdiği tek şey: gökyüzü + siluetler. Kırpma, ölçek ve konum
 *  çağıran sahnenin işi. */
function Vista({ c, id }: { c: Country; id: string }) {
  return (
    <g className="hgt-vista">
      <defs>
        {/* userSpaceOnUse: duraklar tuvalin kendi y'sine oturuyor, yani gökyüzü
            kutusu ne kadar taşarsa taşsın ufuk çizgisindeki en parlak bant hep
            y=200'de. Kutu bilerek çok geniş: kapının açıklığı bu çizimi kendi
            biçiminde kırpıyor ve gökyüzü hiçbir kenarda bitmemeli. */}
        <linearGradient
          id={`${id}sky`}
          gradientUnits="userSpaceOnUse"
          x1="200"
          y1="-70"
          x2="200"
          y2="200"
        >
          {/* Duraklar ekranda ölçülerek çekildi (0.58/0.85 idi, 0.42/0.74 oldu).
              Sebep: parlak bant ufka çok yapışıkken siluetlerin üst yarısı
              gökle aynı tona düşüyordu — KKTC'nin sırtı fark edilmiyordu bile.
              Bant yukarı çekilince her kütle kendi yüksekliğinde gökten koyu
              kalıyor, yani siluet gerçekten siluet oluyor. */}
          <stop offset="0" stopColor="var(--hgt-s0)" />
          <stop offset="0.42" stopColor="var(--hgt-s1)" />
          <stop offset="0.74" stopColor="var(--hgt-s2)" />
          <stop offset="1" stopColor="var(--hgt-s3)" />
        </linearGradient>

        {/* PUS LEKESİ. Yumuşak kenarın tamamı gradyan, SVG filtresi değil:
            sürekli dönen bir animasyonda blur filtresi her karede yeniden
            hesaplanır ve bu sahne hero'nun içinde, ilk ekranda duruyor. */}
        <radialGradient id={`${id}hz`} cx="50%" cy="86%" r="56%">
          <stop offset="0" stopColor="var(--hgt-s3)" stopOpacity="0.36" />
          <stop offset="0.55" stopColor="var(--hgt-s3)" stopOpacity="0.13" />
          <stop offset="1" stopColor="var(--hgt-s3)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="-320" y="-320" width="1040" height="540" fill={`url(#${id}sky)`} />

      {/* PUS BANDI — ufkun üstünde yol alan ışık. Üç kopya yan yana ve grup tam
          bir kopya boyu kayıyor, yani tur bitişinde desen başlangıçla çakışıyor
          ve dikiş görünmüyor. */}
      <g className="hgt-haze">
        <rect x="-400" y="56" width="400" height="146" fill={`url(#${id}hz)`} />
        <rect x="0" y="56" width="400" height="146" fill={`url(#${id}hz)`} />
        <rect x="400" y="56" width="400" height="146" fill={`url(#${id}hz)`} />
      </g>

      {c === "dubai" ? <VistaDubai /> : null}
      {c === "ingiltere" ? <VistaUk /> : null}
      {c === "kktc" ? <VistaKktc /> : null}

      {/* yer: ufkun altı, siluetlerin bastığı zemin */}
      <rect className="hgt-v-ground" x="-320" y="200" width="1040" height="120" />
    </g>
  );
}

/* -------------------------------------------------------------- DUBAI
   İmza: Burj Khalifa. Kademeli daralan gövde ve uzun iğne; profilin kendisi
   tanınıyor, tek bir yazıya gerek kalmıyor. Yarı genişlikler x=200'den
   26 / 21 / 17 / 13 / 9.5 / 6 / 3.5 / 1.3, yani her kademe bir öncekinin
   yaklaşık %78'i — kulenin gerçek daralma ritmi bu. */
function VistaDubai() {
  return (
    <>
      <path
        className="hgt-v-far"
        d="M-320 200 V178 H16 V168 H30 V182 H44 V162 H60 V176 H76 V166 H92 V180 H108 V170 H124 V184 H140 V172 H156 V164 H172 V178 H188 V170 H204 V182 H220 V168 H236 V180 H252 V172 H268 V162 H284 V176 H300 V166 H316 V180 H332 V172 H348 V184 H364 V174 H380 V180 H720 V200 Z"
      />

      <path className="hgt-v-mid" d="M104 200 V108 L118 88 L132 108 V200 Z" />
      <path className="hgt-v-mid" d="M140 200 V130 L152 114 L164 130 V200 Z" />
      <path className="hgt-v-mid" d="M222 200 V146 H244 V200 Z" />
      {/* yelken: tek dikey kenar ve ona yaslanan eğri — Körfez'in ikinci en
          tanınan kütlesi, ama kuleyle yarışmasın diye orta katmanda */}
      <path className="hgt-v-mid" d="M250 200 V86 C266 118 284 156 296 200 Z" />

      <path
        className="hgt-v-mark"
        d="M174 200 V164 H179 V134 H183 V108 H187 V82 H190.5 V58 H194 V36 H196.5 V22 H198.7 V8 H201.3 V22 H203.5 V36 H206 V58 H209.5 V82 H213 V108 H217 V134 H221 V164 H226 V200 Z"
      />

      {/* İğnenin ucundaki uyarı ışığı. Çizimin TEK parlak noktası ve uydurma
          değil: o yükseklikteki her kulede var. */}
      <circle className="hgt-v-beacon" cx="200" cy="8" r="2.6" />

      <path className="hgt-v-near" d="M64 200 V162 H92 V176 H108 V200 Z" />
      <path className="hgt-v-near" d="M300 200 V152 H328 V166 H342 V200 Z" />
    </>
  );
}

/* -------------------------------------------------------------- İNGİLTERE
   İmza: Tower Bridge. Köprünün kendisi zaten bir KAPI — iki kule ve
   aralarındaki yüksek geçit, portal fikrinin ülke tarafındaki karşılığı. */
function VistaUk() {
  return (
    <>
      <path
        className="hgt-v-far"
        d="M-320 200 V182 H22 V174 H44 V186 H66 V178 H88 V188 H110 V180 H132 V186 H154 V176 H176 V188 H198 V180 H220 V186 H242 V178 H264 V188 H286 V180 H308 V186 H330 V176 H352 V186 H374 V180 H720 V200 Z"
      />
      {/* Koni ve şiş: Londra'nın iki modern imzası. Konumları ÖLÇÜMLE seçildi,
          göz kararıyla değil — dar bir kapı açıklığı bu tuvalin yalnızca
          72..328 aralığını gösteriyor ve ikisi de ilk yazımda o pencerenin
          dışında kalıyordu. */}
      <path
        className="hgt-v-far"
        d="M95 200 V142 C95 124 102 112 110 108 C118 112 125 124 125 142 V200 Z"
      />
      <path className="hgt-v-far" d="M287 200 L296 98 L300 62 L304 98 L313 200 Z" />

      {/* askı halatları: kuleden kıyıya sarkan iki eğri. Dolgu değil kontur,
          çünkü halat bir kütle değil bir hat. */}
      <path className="hgt-v-chain" d="M-30 132 Q54 162 138 116" />
      <path className="hgt-v-chain" d="M262 116 Q346 162 430 132" />

      <path className="hgt-v-mid" d="M-320 160 H720 V172 H-320 Z" />
      <path className="hgt-v-mid" d="M130 172 H178 V200 H130 Z" />
      <path className="hgt-v-mid" d="M222 172 H270 V200 H222 Z" />

      {/* iki kule + sivri külah + iğne, ve aralarındaki iki geçit katı */}
      <path className="hgt-v-mark" d="M138 172 V104 H172 V172 Z" />
      <path className="hgt-v-mark" d="M132 104 L154 66 L155 46 L156 66 L178 104 Z" />
      <path className="hgt-v-mark" d="M228 172 V104 H262 V172 Z" />
      <path className="hgt-v-mark" d="M222 104 L244 66 L245 46 L246 66 L268 104 Z" />
      <path className="hgt-v-mark" d="M172 108 H228 V122 H172 Z" />
      <path className="hgt-v-mark" d="M172 128 H228 V134 H172 Z" />
    </>
  );
}

/* -------------------------------------------------------------- KKTC
   İmza: Beşparmak sırtı. Adanın kuzeyini tanımlayan şey bir bina değil bir
   ufuk çizgisi, o yüzden burada "mark" olan şey de farklı bir cinsten. Sırt
   UZAK katmanda kalıyor ve imzayı taşıyan parlak kenar Girne kalesine
   veriliyor: en koyu mürekkep en öndeki kütlenin hakkı, sırt ise en arkada. */
function VistaKktc() {
  return (
    <>
      {/* BEŞ TEPE, BEŞİ DE PENCEREDE. İlk yazımda tepeler x = 54 · 108 · 170 ·
          234 · 298'deydi ve dar bir açıklık yalnızca 72..328'i gösterdiği için
          birincisi kırpılıyordu; "Beşparmak" dört parmakla okunmaz. Tepeler
          88 · 148 · 205 · 262 · 318'e sıkıştırıldı ve ortadaki en yüksek
          olacak biçimde sıralandı. */}
      <path
        className="hgt-v-far"
        d="M-320 200 V168 H12 L44 156 L88 116 L118 148 L148 104 L178 146 L205 92 L232 144 L262 106 L292 150 L318 122 L352 152 L400 162 H720 V200 Z"
      />

      <path className="hgt-v-mid" d="M204 200 V174 H312 V200 Z" />

      {/* kale: mazgallı beden duvarı, solda kare burç, sağda yuvarlak tabya */}
      <path className="hgt-v-mark" d="M204 174 H312 V200 H204 Z" />
      <path
        className="hgt-v-mark"
        d="M206 166 H216 V174 H206 Z M222 166 H232 V174 H222 Z M238 166 H248 V174 H238 Z M254 166 H264 V174 H254 Z M270 166 H280 V174 H270 Z M286 166 H296 V174 H286 Z"
      />
      <path className="hgt-v-mark" d="M192 200 V156 H220 V200 Z" />
      <path className="hgt-v-mark" d="M194 148 H202 V156 H194 Z M208 148 H216 V156 H208 Z" />
      <path className="hgt-v-mark" d="M288 200 V172 A14 14 0 0 1 316 172 V200 Z" />

      <path className="hgt-v-near" d="M84 200 V172 H116 V182 H136 V200 Z" />
      <path className="hgt-v-near" d="M146 200 V178 H166 V186 H182 V200 Z" />
      <path className="hgt-v-near" d="M-320 194 H720 V200 H-320 Z" />
    </>
  );
}

/* ============================== KAPI ==============================
   Tek yuvanın çizimi. `dunya` false ise açıklığın içi boş: uçtaki iki kopya
   kapı hiçbir zaman yanmıyor, yani onlara ülke çizimi basmak DOM'a bedavaya
   iki Vista eklemek olurdu.

   KATMAN SIRASI (alttan üste): açıklığın koyu boşluğu → ülke → ışık kenarı →
   kasa → kilit taşı. HUZME ARTIK BU SVG'DE DEĞİL: eşiğin altına, tuvalin
   dışına taşması gerekiyor ve SVG kökü kendi görüntü kutusunu kırpıyor.
   Yeri .hgt-art'ın içinde bir DOM katmanı (aşağıda, HeroPortal). */
function Kapi({ c, id, dunya }: { c: Country; id: string; dunya: boolean }) {
  const p = PROFIL[c];

  return (
    <svg className="hgt-svg" viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet" focusable="false">
      <defs>
        <clipPath id={`${id}c`}>
          <path d={agiz(c)} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}c)`}>
        {/* Sönük kapının içi: gecenin kendisinden bir tık koyu bir boşluk.
            Müşterinin "içinde bir şey olmayan kapılar" dediği hâl bu. */}
        <rect x="40" y="20" width="280" height="290" fill="#090909" />
        {dunya ? (
          <g className="hgt-world">
            {/* Ölçek 1.09: kulenin tepesi kemerin altında yaklaşık 50 birim
                boşluk bırakacak kadar büyük, tuvalin yanları ise açıklıktan
                geniş kalacak kadar — yani hiçbir kadrajda gökyüzü bitmiyor. */}
            <g transform="translate(-38 74) scale(1.09)">
              <Vista c={c} id={`${id}v`} />
            </g>
          </g>
        ) : null}
      </g>

      {/* Işığın kasaya vurduğu kenar: açıklığa derinlik veren tek çizgi ve
          ülkenin ışığını alan tek çerçeve parçası.

          KIRPMA YOLUYLA AYNI DEĞİL, VE OLAMAZ. Kırpma kapalı (agiz), bu açık
          (kemer). P1'de ikisi tek dizeydi ve ölçüm o yüzden düşüyordu:
          kapatan Z, iki ayağın arasını eşik boyunca birleştiriyor ve KONTURLU
          bir yolda o 280 birimlik yatay çizgi ekrana da çiziliyor — tam olarak
          kaldırılan kirişin kapının altındaki ikizi. Tarama bunu 279.5 birimlik
          düz yatay üye olarak buldu (ölçüm bloğu). */}
      <path className="hgt-rim" d={kemer(p, W_ACIK)} />

      {/* ---- TAŞ KASA · ülkeye göre yayı ve derzin kalemi değişiyor ----
          Derz saç teliyle (hgt-hr) değil ANA KALEMLE (hgt-ln) çizilebiliyor;
          referansın KKTC kapısında bu bilinçliydi ve gerekçesi orada yazılı:
          "kemer taşları çizginin kendisi kadar önemli, bu kapının karakteri
          ışıkta değil örgüsünde". Yol dizesi ikisinde de aynı, değişen tek şey
          mürekkep ve kalınlık — yani geometri kanıtı bundan etkilenmiyor. */}
      <g className="hgt-frame">
        <path className="hgt-ln" d={kemer(p, W_KASA)} />
        <path className="hgt-hr" d={kemer(p, W_PAH)} />
        <path className={p.orgu ? "hgt-ln" : "hgt-hr"} d={derzler(p)} />
      </g>
      <path className="hgt-key" d={kilitTasi(p)} />
    </svg>
  );
}

/* ============================== KUMANDA ==============================
   GÖRÜNEN ÇİP + GİZLİ NATIVE RADYO (tuzaklar · değişmez kural 9). Altta yatan
   kontrol gerçek bir <input type="radio"> grubu: ok tuşlarıyla gezinme,
   klavyeyle seçme ve ekran okuyucu duyurusu tarayıcıdan geliyor, taklit
   edilmiyor. Grubun adı <legend> ile veriliyor.

   name useId'den: /lab/hero-portal'da bu canlı hero ile lab adayları aynı anda
   ekranda ve sabit bir ad ikisini TEK radyo grubu yapardı — birinde seçim
   yapmak ötekinin işaretini düşürürdü. Mağaza (zustand) zaten ortak, yani iki
   sahne yine birlikte değişiyor; ayrılan tek şey HTML grubu.

   Fare ile üstüne gelmek de seçiyor: ilk canlı sahnenin davranışı buydu ve
   kaybolmamalı. */
function Picker() {
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);
  const group = useArtId("hgtg");

  /* Seçili olanı yeniden seçmek hiçbir şey yapmıyor. Küçük ama gerçek bir
     fark: aynı bayrağın üstüne ikinci kez gelmek, tıklamak ve ok tuşuyla gelip
     odaklanmak aynı olayı dataLayer'a üç kez yazıyordu.

     OLAY ADI DEĞİŞMEDİ ("hero_globe_country"), oysa ortada küre kalmadı. Ad
     bir açıklama değil bir ANAHTAR: canlıda toplanmış geçmiş veriyle
     karşılaştırılabilir kalması, sahnenin bugünkü adını taşımasından daha
     değerli. */
  const pick = useCallback(
    (c: Country) => {
      if (c === country) return;
      setCountry(c);
      gtm("hero_globe_country", { country: c });
    },
    [country, setCountry],
  );

  return (
    <div className="hgt-pick">
      <fieldset className="hgt-fs">
        <legend className="hgt-legend">Ülke seçin</legend>
        <div className="hgt-tabs">
          {ORDER.map((c) => (
            <label key={c} className="hgt-tab" data-on={country === c} onMouseEnter={() => pick(c)}>
              <input
                className="hgt-radio"
                type="radio"
                name={group}
                value={c}
                checked={country === c}
                onChange={() => pick(c)}
              />
              <span className="hgt-tab-disc">
                <Flag country={c} />
              </span>
              <span className="hgt-tab-name">{COUNTRY_NAMES[c]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <SmartLink href="/uygunluk-testi" className="hgt-unsure">
        Emin değilim, bana uygun olanı bul
        <span aria-hidden="true">→</span>
      </SmartLink>
    </div>
  );
}

export default function HeroPortal() {
  const country = useOrtacStore((s) => s.country);
  const id = useArtId("hgt");
  const index = ORDER.indexOf(country);

  return (
    <div className="hgt">
      <Picker />

      <div className="hgt-stage" aria-hidden="true">
        {/* Duvar kayıyor, kapılar değil: şeridin kendi genişliğinin yarısı
            kadar sola çekilmesi orta yuvayı ortalıyor, --hgt-slide ise seçilen
            yuvaya kadar olan farkı ekliyor. Ölçüm yok, ResizeObserver yok —
            kaydırma tamamen CSS uzunluk aritmetiği. */}
        <div
          className="hgt-track"
          style={{ "--hgt-slide": `${1 - index}` } as React.CSSProperties}
        >
          {WALL.map((c, pos) => {
            /* yalnızca GERÇEK yuva yanıyor; uçlardaki kopyalar hep sönük */
            const gercek = pos >= 1 && pos <= 3;
            return (
              <div
                key={`${c}-${pos}`}
                className="hgt-slot hgt-tone"
                data-c={c}
                data-on={pos === index + 1}
              >
                <div className="hgt-art">
                  <Kapi c={c} id={`${id}${pos}`} dunya={gercek} />
                  {/* EŞİKTEN SÜZÜLEN IŞIK (müşteri: "kapının alt kısmında ışık
                      süzmesi olsun" · bu turda "sayfanın en altına kadar gelip
                      bitsin"). Çizimin KARDEŞİ, içi değil: huzme eşikten sahne
                      kutusunun dibine kadar iniyor, oysa SVG kökü kendi
                      görüntü kutusunu (0 0 360 330) kırpıyor ve tuvalin altına
                      taşan hiçbir şeyi boyamıyor. Boyu, eni ve sönümü tamamen
                      CSS'te ve sahnenin kendi uzunluklarından türüyor
                      (hero-portal.css · BÖLÜM 4). */}
                  <span className="hgt-spill" />
                </div>

                {/* TABELA: ülke adı + o ülkenin en çok tercih edilme sebebi.
                    Kapının yanında beklenen şey "ne kadar sürer" değil "neden
                    burası" — süre ve fiyat bilerek yok. Sönük yuvada tabela da
                    sönüyor: duvarın devam ettiğini söylüyor, okunmak için
                    durmuyor. */}
                <div className="hgt-plate">
                  <strong className="hgt-plate-name">{COUNTRY_NAMES[c]}</strong>
                  <span className="hgt-plate-line">{hookFor(c)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Zemin çizgisi şeritten SONRA ve sahne düzeyinde: duvarla yerin
            birleştiği hat bütün kapıların önünden geçer, eşik dediğimiz şey
            zaten o. P1'de bu çizgi çizimin İÇİNDEYDİ (x -20..380) ve yan yana
            duran kapılarda uçları birbirine değip kesik kesik bir hat
            bırakırdı; tek bir çizgiye çıkarıldı. */}
        <span className="hgt-floorline" />
      </div>
    </div>
  );
}
