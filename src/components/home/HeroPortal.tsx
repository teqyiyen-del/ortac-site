"use client";

import { useCallback, useId } from "react";
import SmartLink from "@/components/shared/SmartLink";
import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { gtm } from "@/lib/gtm";
import { useOrtacStore, type Country } from "@/lib/store";

/* ============================================================================
   HERO SAHNESİ — CANLI · "SERBEST GEÇİT"
   Ana sayfa hero'sunun varsayılan sahnesi. CSS: src/app/css/hero-portal.css
   Ad alanı .hgt- ("hero geçit"), değişkenler --hgt-*.

   Müşterinin bu turdaki tek cümlesi: "p5 i live alsana hero için."
   Yani /lab/hero-portal'daki P5 adayı ("Serbest Geçit") canlıya alınıyor;
   yerini aldığı sahne home/HeroScene.tsx ("Eşik", üç kapılı sokak cephesi).

   ------------------------------------------------------- SAHNENİN FİKRİ
   Portal = içinden GEÇİLEN koridor. Üst üste sekiz eşik, tek kaçış noktası
   (360,176); ülke koridorun sonunda duruyor ve ışık o uçtan size doğru
   geliyor. Kapının profili ülkeye göre değişiyor, yankılar herkesin.
   Tasarımın tam gerekçesi lab kopyasında (components/lab/HeroPortalP5.tsx);
   burada yalnızca CANLIYA TAŞINIRKEN VERİLEN KARARLAR yazılı.

   ======================= LAB KOPYASINDAN (P5) FARKLARI =======================
   Lab kopyası (lab/HeroPortalP5.tsx + lab/HeroPortalShell.tsx + css/lab-ptl5
   .css + css/lab-portal.css) KARAR KAYDI olarak yerinde duruyor ve
   /lab/hero-portal onu basmaya devam ediyor. Bu dosya onun canlı sürümü;
   bilerek verilmiş dört fark var.

   1) AD ALANI .ptl- / .ptl5- → .hgt-, --pv-* / --ptl-* / --ptl5-* → --hgt-*.
      ZORUNLU. lab-portal.css ve lab-ptl5.css globals.css'e import edilmeye
      devam ediyor, yani lab seçicileri canlı sayfada da yüklü. Aynı öneki
      canlıda ikinci kez tanımlamak iki dosyanın birbirini sessizce ezmesi
      demekti — bu depoda .g3-/.hsc- ayrımının sebebi tam buydu. Üstelik
      /lab/hero-portal sayfasında canlı hero ile lab P5'i AYNI DOM'da duruyor.

   2) ORTAK KATMAN DA TAŞINDI, P5 TEK BAŞINA EKSİK.
      Lab'de P5'in yalnızca sahnesi kendi dosyasındaydı; kabuk (.ptl), seçici,
      tabela ve ülke çizimi (Vista) + paleti üç adayın PAYLAŞTIĞI
      lab-portal.css/HeroPortalShell.tsx'teydi. Canlıya yalnız P5'i taşımak
      ekranda kumandasız, tabelasız ve ülkesiz bir koridor bırakırdı.
      Bu dosya ikisinin birleşimi; lab tarafında hiçbir satır değişmedi.

   3) SEÇİCİ YERİ DEĞİL, TÜRÜ DEĞİŞTİ — ve bu bir borç kapatıyor.
      Canlı hero'nun bugün KENDİ seçicisi var (HeroScene · .hsc-pick) ve o
      seçici role="tab" taklidi. P5'inki gerçek <input type="radio"> grubu.
      İkisi birden ekranda olamaz; sahne bir bütün olarak değiştiği için
      HeroScene'in seçicisi de onunla gidiyor, yerine P5'inki geçiyor. Üç
      gerekçe: (a) depo kuralı "görünür çip + gizli native radio" (tuzaklar ·
      değişmez kural 9), (b) ok tuşu gezinmesi, seçim ve ekran okuyucu
      duyurusu tarayıcıdan geliyor, taklit edilmiyor (tuzak G: gizli span ve
      rolsüz taklitler bu depoda üç kez ağaçtan düştü), (c) ÖLÇÜLEN KONTRAST:
      seçili olmayan ülke adı canlıda #767676 = 4.38:1, yani AA altı ve
      hero-scene.css'te "bu turda düzeltilmeyen borç" diye yazılı. Radyo
      kalıbının rengi #8a8a8a = 5.80:1. Ölçüler birebir aynı (52px disk, 22px
      aralık), yani hero'nun ritmi kıpırdamıyor.
      TAŞINAN İKİ DAVRANIŞ: fare ile üstüne gelmek de seçiyor (canlının
      davranışı) ve seçim dataLayer'a yazılıyor (aşağıda pick()).

   4) TABELA TEK DÜĞÜM. Lab'de konumlandıran kutu (.ptl5-plate) ile plakanın
      kendisi (.ptl-plate) ayrıydı, çünkü üç aday aynı plakayı üç ayrı yere
      koyuyordu. Canlıda tek yer var: iki sınıf tek düğümde birleşti.

   ---------------------------------------------- NEDEN useReducedMotion YOK
   Bu dosyada hareket tercihini okuyan tek satır bile yok ve bu bilinçli.
   Sahnenin bütün hareketi CSS'te, @media (prefers-reduced-motion) kapısının
   altında; dalga da ortak "aktarım" kalıbından geliyor ve kapı kalıbın
   içinde. HeroScene'de kanca bir zamanlayıcının süresi için duruyordu (ışığın
   ilk yanması), burada öyle bir zamanlayıcı da yok: koridor ilk kareden
   itibaren yanık. Yani sunucu ile istemcinin ürettiği ağaç birebir aynı ve
   tuzak A'nın (useReducedMotion hidrasyonu) bu sahnede zemini yok.

   ------------------------------------------------------------------- MALİYET
   globeGeo.ts'e tek import yok; canvas, WebGL, ResizeObserver, nokta bulutu
   yok. Ölçülen DOM ve eşzamanlı animasyon sayısı hero-portal.css'in sonundaki
   ölçüm bloğunda, HeroScene ile yan yana.

   ERİŞİLEBİLİRLİK: sahnenin tamamı aria-hidden (dekoratif tekrar). Ağaçta
   görünen tek şey seçici: <fieldset> + görsel olarak gizli <legend> "Ülke
   seçin" + üç native radyo. Ayrı bir aria-live satırı BİLEREK yok — radyo
   kendi durumunu zaten duyuruyor, ikinci bir canlı bölge aynı seçimi iki kez
   okuturdu. Seçim zustand'daki tek mağazayı sürüyor, yani hero'daki ülke
   sayfanın geri kalanını (ThreeCountries, fiyat özeti, hesaplayıcı) sürmeye
   devam ediyor; bu bağ kopmadı.
   ========================================================================= */

const ORDER: Country[] = ["dubai", "ingiltere", "kktc"];

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
  dubai: "id", // "Oturum vizesi alabiliyorsunuz"
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
   GEOMETRİ — P2/P5'in tuvali, tek birim değişmedi
   Kaçış noktası (360, 176); halka oranı k = 1 · 0.74 · 0.545 · 0.40 · 0.295,
   yarı genişlik 330k, yarı yükseklik 168k, ayak y = 176 + 168k. Dışa doğru üç
   yankı aynı oranın tersinden (÷0.74) devam ediyor. Bütün halkalar (360,176)
   merkezli homotetik olduğu için kaçış noktasından çıkan her ışın hepsini aynı
   yerden kesiyor — perspektif göz kararı değil, cebirden geliyor.
   ############################################################################ */

const CX = 360;
/** Kemerin bindiği hiza = kaçış noktasının yüksekliği. */
const YS = 176;

/** Halka merdiveni. İlk beşi koridorun kendisi (yakından uzağa okunacak sıra
 *  aşağıda ters), son üçü koridorun ağzından DIŞARI, izleyicinin arkasına
 *  doğru devam eden yankılar: 1/0.74 = 1.3514 ile aynı oran dışa sürüyor. */
const K: readonly number[] = [0.295, 0.4, 0.545, 0.74, 1, 1.3514, 1.8262, 2.4679];

/** Bir halkanın kutusunun İÇİNDEKİ şekil. Kutu her zaman ortak (yarı en 330k,
 *  ayak 176+168k, kutu tepesi 176-168k); profil yalnızca o kutuyu nasıl
 *  dolduracağını söylüyor.
 *    yay    yayın yüksekliği, kutu yüksekliğine oran
 *    sivri  yay yerine iki kübik eğri, tepede birleşiyor
 *
 *  DÜZ ÜYE ALANI YOK, VE OLMAYACAK. Bu tipin bir zamanlar `kiris` (kutu
 *  tepesinde yatay üye) ve `dikme` (uçlarından inen iki dikey) alanları vardı;
 *  müşteri onları görüp istemedi: "portalın üstlerinde bu iki ülkede çizgi
 *  kalmış." Alanlar "kullanılmıyor" diye bırakılmadı, silindi — ölü alan bir
 *  sonraki turda yeniden doldurulmaya davetiye. Sonuç: üç ülkede de düz yatay
 *  üye SIFIR, ülke kimliği tamamen yayın kendisinde. */
type Profil = {
  yay: number;
  sivri: boolean;
};

/** KAPININ profili, ülkeye göre. Üçü de AYNI KUTUYA oturuyor; kutu ortak
 *  olmasa halka merdiveni ülkeden ülkeye zıplardı ve sahne "yeniden çizildi"
 *  gibi okunurdu, şimdi "aynı koridor, başka mimari" okunuyor. Bu tablo
 *  YALNIZ n=0'a uygulanıyor: kapı ülkenin, yankı herkesin.
 *
 *  Üç oran birbirinden belirgin ayrı (1.0 · 0.86 · 0.62), yani düz üye
 *  olmadan da üç kapı ayırt ediliyor. */
const PROFIL: Record<Country, Profil> = {
  /* Eski canlı sahne (HeroScene · ART.dubai): "sivri kemer, üç kapının en
     yükseği ve en darı." Eğrinin denetim noktaları o yoldan oranlanarak alındı
     (M42 330 V168 C42 108 68 56 110 28 …): birinci denetim yayın %43'ünde,
     ikincisi %80'inde ve yarı enin %62'sinde. Profil uydurulmadı, ölçüldü. */
  dubai: { yay: 1, sivri: true },
  /* Eski canlı: Georgian kapı, yarım daire camlık. Oradaki KORNİŞ taşınmadı:
     düz bir yatay üyeydi. Kimlik yayın basıklığında: 0.86 ile üç kapının
     ortası. */
  ingiltere: { yay: 0.86, sivri: false },
  /* Eski canlı: yuvarlak taş kemer, en alçak ve en geniş açıklık. Oradaki dik
     payandalar ve düz saçak taşınmadı, aynı sebeple. 0.62 yay İngiltere'nin
     0.86'sından belirgin basık, yani payandasız da ayrışıyor. */
  kktc: { yay: 0.62, sivri: false },
};

/** YANKININ profili — n 1-7, ÜLKEDEN BAĞIMSIZ TEK ŞEKİL.
 *
 *  Alanları PROFIL.dubai ile birebir aynı ve ayrı bir sabit olarak yazılması
 *  bilinçli: burada yazan şey "yankı Dubai'nin kapısıdır" değil, "yankının
 *  kendi biçimi vardır ve o biçim kutuyu tam dolduran sivri taç". Dubai'nin
 *  kapısı bugün aynı biçimi kullanıyor, yarın kapı değişirse yankı yerinde
 *  kalır. Nesne dondurulmuyor çünkü modül kapsamında ve dışa açılmıyor. */
const YANKI: Profil = { yay: 1, sivri: true };

const r1 = (n: number) => +n.toFixed(1);

/** Açıklığın konturu: sol ayaktan yukarı, kemerden geçip sağ ayağa. Kapalı
 *  DEĞİL — kapatılsaydı zemin boyunca bir taban çizgisi de çizilirdi, yani
 *  kaldırdığımız düz yatay üye arka kapıdan geri gelirdi. Koridorun tabanı
 *  zaten ışığın kendisi. */
function acikli(p: Profil, k: number): string {
  const w = 330 * k;
  const h = 168 * k;
  const yb = YS + h;
  const a = p.yay * h;
  if (p.sivri) {
    return (
      `M${r1(CX - w)} ${r1(yb)} V${YS} ` +
      `C${r1(CX - w)} ${r1(YS - 0.43 * a)} ${r1(CX - 0.62 * w)} ${r1(YS - 0.8 * a)} ${CX} ${r1(YS - a)} ` +
      `C${r1(CX + 0.62 * w)} ${r1(YS - 0.8 * a)} ${r1(CX + w)} ${r1(YS - 0.43 * a)} ${r1(CX + w)} ${YS} ` +
      `V${r1(yb)}`
    );
  }
  return `M${r1(CX - w)} ${r1(yb)} V${YS} A${r1(w)} ${r1(a)} 0 0 1 ${r1(CX + w)} ${YS} V${r1(yb)}`;
}

/** Ağzın açıklığı, KAPALI: ülkenin göründüğü pencerenin kırpma maskesi. Bu Z
 *  bir çizgi üretmiyor, kırpma yolunu kapatıyor — hiçbir yerde kontur olarak
 *  kullanılmıyor.
 *
 *  Ülkeyi kendi kapısının biçiminden görüyorsunuz ve üç kadraj da ÖLÇÜLDÜ:
 *  Dubai'de sivri kemerin ucu (126.4) Burj Khalifa'nın iğnesinin (131.7)
 *  üstünde bitiyor, İngiltere'de yuvarlak baş (133.3) Tower Bridge'in
 *  külahlarının (149.2) üstünde, KKTC'de basık kemer (145.2) Beşparmak'ın en
 *  yüksek tepesinin (170.3) üstünde. Bir profil kısılırsa bu üç sayı yeniden
 *  kontrol edilmeli. */
const agiz = (c: Country) => `${acikli(PROFIL[c], K[0])} Z`;

/* ############################################################################
   VISTA — ÜLKENİN KENDİSİ
   Tuval: 0 0 400 220 · ufuk (yer/deniz çizgisi) y = 200 · üstü gökyüzü.

   NEDEN SİLUET, NEDEN ÇİZİM. Müşterinin cümlesi net: "dubai seçince
   burjkhalifa gözüksün". Fotoğraf değil çizim, üç sebeple: (1) depodaki ülke
   kareleri gündüz fotoğrafı, hero'nun #080808 gecesine bir fotoğraf koymak
   sahneyi ikiye bölüyor, (2) bir Unsplash kimliğinin arkasındaki kare
   değişebiliyor ve bu depoda bir kimlik 404 döndü (lib/media.ts) — hero
   sitenin ilk ekranı, orada kırık kare kabul edilemez, (3) çizimde çizgi
   kalınlığı, ışık yönü ve odak bize ait.

   DERİNLİK ALFAYLA DEĞİL, DÖRT KADEMELİ OPAK MÜREKKEPLE (koyu yüzeyde alfa
   yok): uzak → orta → mark (ülkenin imzası, tek parlak kenarı olan tek nesne)
   → yakın. Gökyüzü üç durak ve renkler uydurulmadı: eski canlı sahnenin o
   ülke için ONAYLANMIŞ ışık paletinden geliyor (hero-scene.css · --hsc-l1/2/3).
   Bugün kapının içinden gelen ışık, burada o ışığın geldiği gökyüzü oluyor.

   İDDİA YOK: çizimlerde tek harf yok — yazı, rakam, arma, logo, marka yok.
   Bir siluet "burada ofisimiz var" demiyor, "bu ülke" diyor.
   ############################################################################ */

/** Vista'nın çizdiği tek şey: gökyüzü + siluetler. Kırpma, ölçek ve konum
 *  çağıran sahnenin işi. */
function Vista({ c, id }: { c: Country; id: string }) {
  return (
    <g className="hgt-vista hgt-tone" data-c={c}>
      <defs>
        {/* userSpaceOnUse: duraklar tuvalin kendi y'sine oturuyor, yani gökyüzü
            kutusu ne kadar taşarsa taşsın ufuk çizgisindeki en parlak bant hep
            y=200'de. Kutu bilerek çok geniş: koridorun sonu bu çizimi kendi
            ölçeğinde kırpıyor ve gökyüzü hiçbir kenarda bitmemeli. */}
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

/* ============================== KUMANDA ==============================
   GÖRÜNEN ÇİP + GİZLİ NATIVE RADYO (tuzaklar · değişmez kural 9). Altta yatan
   kontrol gerçek bir <input type="radio"> grubu: ok tuşlarıyla gezinme,
   klavyeyle seçme ve ekran okuyucu duyurusu tarayıcıdan geliyor, taklit
   edilmiyor. Grubun adı <legend> ile veriliyor.

   name useId'den: /lab/hero-portal'da bu canlı hero ile lab P5 aynı anda
   ekranda ve sabit bir ad ikisini TEK radyo grubu yapardı — birinde seçim
   yapmak ötekinin işaretini düşürürdü. Mağaza (zustand) zaten ortak, yani iki
   sahne yine birlikte değişiyor; ayrılan tek şey HTML grubu.

   Fare ile üstüne gelmek de seçiyor: HeroScene'in davranışı buydu ve canlıda
   kaybolmamalı. */
function Picker() {
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);
  const group = useArtId("hgtg");

  /* Seçili olanı yeniden seçmek hiçbir şey yapmıyor. Küçük ama gerçek bir
     fark, HeroScene'den birebir taşındı: aynı bayrağın üstüne ikinci kez
     gelmek, tıklamak ve ok tuşuyla gelip odaklanmak aynı olayı dataLayer'a üç
     kez yazıyordu.

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

  return (
    <div className="hgt">
      <Picker />

      {/* akt: fare sahnenin üstündeyken dalga duruyor (kapı css/aktarim.css'te).
          Değişkenler de orada: bir sahnenin bütün hareket hikâyesi tek blokta. */}
      <div className="hgt-stage hgt-tone akt" data-c={country} aria-hidden="true">
        {/* SERBEST KATMAN — sahne kutusunun 5 katı, aynı merkezde, maskeli.
            Kırpan tek şey SVG'nin kendi görüntü kapısı (yatayda sahne
            genişliği), yani sayfa yatayda hiçbir koşulda uzamıyor. Sönme
            kırpma değil gradyan: çizgiler hero'nun yazısına VARIYOR ama
            yazıya çarpmıyor (eğri ve ölçülen kontrast hero-portal.css'te). */}
        <div className="hgt-free">
          <svg viewBox="0 -720 720 1800" preserveAspectRatio="xMidYMid slice" focusable="false">
            <defs>
              <clipPath id={`${id}c`}>
                <path d={agiz(country)} />
              </clipPath>

              {/* Koridorun sonundaki bloom. Dış durak SAYDAM: hero'nun
                  arkasındaki ızgarayı silen opak bir dikdörtgen bırakmıyor. */}
              <radialGradient id={`${id}g`} cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="var(--hgt-s2)" stopOpacity="0.5" />
                <stop offset="0.5" stopColor="var(--hgt-s2)" stopOpacity="0.16" />
                <stop offset="1" stopColor="var(--hgt-s2)" stopOpacity="0" />
              </radialGradient>

              {/* IŞIK SÜZMESİ (P1'den alınmıştı, müşteri istedi: "kapının alt
                  kısmında ışık süzmesi olsun"). Dış durak yine SAYDAM. */}
              <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--hgt-s2)" stopOpacity="0.62" />
                <stop offset="1" stopColor="var(--hgt-s2)" stopOpacity="0" />
              </linearGradient>

              {/* Zemin çizgisi iki ucunda sönüyor: kenarda kesilmiyor, bitiyor. */}
              <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#1c1c1c" stopOpacity="0" />
                <stop offset="0.5" stopColor="#2f2f2f" />
                <stop offset="1" stopColor="#1c1c1c" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Işık en altta, nesne en üstte. */}
            <ellipse className="hgt-bloom" cx="360" cy="176" rx="300" ry="200" fill={`url(#${id}g)`} />

            {/* KORİDORUN TABANINA SÜZÜLEN IŞIK. Yamuk ağzın eşiğinden (y=225.6)
                en yakın halkanın ayağına (y=344) açılıyor: ışık kaynaktan
                izleyiciye doğru geliyor ve gelirken sönüyor. Dolgu, kontur
                değil — yani bir çizgi üyesi değil, bir huzme. */}
            <path className="hgt-spill" d="M262.6 225.6 H457.4 L690 344 H30 Z" fill={`url(#${id}s)`} />
            <rect x="-60" y="343.3" width="840" height="1.4" fill={`url(#${id}f)`} />

            {/* Zemin ışınları ve kilit taşı hattı: halkaların köşelerini ve
                tepelerini kaçış noktasına bağlayan üç saç teli. Dikey hat en
                dıştaki yankının tepesine kadar sürüyor (y=-239), yani
                koridorun ekseni de kutudan çıkıyor. */}
            <path className="hgt-ray" d="M30 344 L262.6 225.6 M690 344 L457.4 225.6 M360 -239 V126.4" />
            {/* Kemerin bindiği hiza. Perspektifte yatay görünüyor çünkü kaçış
                noktası TAM o yükseklikte (y=176); eğik çizilseydi koridor
                yamulurdu. Sahnenin içinde, kapının SOLUNDA ve SAĞINDA duruyor
                — müşterinin kaldırttığı şey "portalın ÜSTÜNDEki çizgi"ydi,
                yani kapıya oturan kirişler; bu iki teli o turda da yerinde
                bıraktı ve üç ülkede birebir aynılar. */}
            <path className="hgt-ray" d="M30 176 H262.6 M457.4 176 H690" />

            <g clipPath={`url(#${id}c)`}>
              <rect x="255" y="120" width="210" height="112" fill="#090909" />
              {ORDER.map((c) => (
                <g key={c} className="hgt-world" data-on={c === country}>
                  <g transform="translate(268 128) scale(0.46)">
                    <Vista c={c} id={`${id}${c}`} />
                  </g>
                </g>
              ))}
            </g>

            {/* HALKALAR. DOM'da dıştan içe (ağız en üstte boyansın), dalganın
                sırası --akt-i ile veriliyor ve içten dışa: ışık koridorun
                sonundan çıkıp yanınızdan geçip gidiyor.

                Profil seçimi tek satır, çünkü ayrım da tek: kapı ülkeyi
                ÇERÇEVELİYOR (agiz() aynı şekli kırpma olarak da kullanıyor),
                yankı çerçevelemiyor. */}
            {[...K.keys()].reverse().map((n) => (
              <path
                key={n}
                className="hgt-ring akt-durak"
                data-n={n}
                d={acikli(n === 0 ? PROFIL[country] : YANKI, K[n])}
                style={{ "--akt-i": n } as React.CSSProperties}
              />
            ))}
          </svg>
        </div>

        {/* TABELA: ülke adı + o ülkenin en çok tercih edilme sebebi. Kapının
            yanında beklenen şey "ne kadar sürer" değil "neden burası" — süre
            ve fiyat bilerek yok. */}
        <div className="hgt-plate">
          <strong className="hgt-plate-name">{COUNTRY_NAMES[country]}</strong>
          <span className="hgt-plate-line">{hookFor(country)}</span>
        </div>
      </div>
    </div>
  );
}
