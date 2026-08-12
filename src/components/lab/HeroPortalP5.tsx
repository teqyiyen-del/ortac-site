"use client";

import { useOrtacStore, type Country } from "@/lib/store";
import { ORDER, PortalPicker, PortalPlate, Vista, useArtId } from "./HeroPortalShell";

/* ============================================================================
   ADAY P5 · "SERBEST GEÇİT" — P2'nin koridoru, kutusundan çıkmış hâli
   CSS: src/app/css/lab-ptl5.css · ad alanı .ptl5-

   ------------------------------------------------------------------ İSTEK
   Müşterinin bu turdaki cümlesi birebir: "portalı beğenmedim p2 daha iyi
   geliyor hala sadece sınırlandırmayıp çizgileri rahat bırak ama üste doğru
   baya taşacakları için soluklaşıp giderler yazıların arkasına doğru fln.
   gerekirse arkadaki gridi kaldırırız fln. kapının tipi ülkeye göre
   değişiyordu ya şuanki live da olan halinde, onu yine yapsak çok mu karmaşık
   olur? bide kapının alt kısmında ışık süzmesi olsun ya p1 deki gibi fln o
   hoş duruyor ışık saçıyor diye."

   Dört ayrı talimat olarak okundu ve dördü de aşağıda tek tek karşılanıyor.
   Taban P2; koridor kurgusunun (beş iç içe eşik, tek kaçış noktası, ışığın
   uçtan gelmesi) tek satırı değişmedi. P4 elendi, silinmedi.

   ---------------------------------------------- 1 · ÇİZGİLER NEDEN SERBEST
   P2'de koridorun tamamı zaten sahne kutusundan BÜYÜKTÜ; onu kutuya sığdıran
   şey iki kırpmaydı: sahnenin `overflow: clip`'i ve SVG'nin kendi görüntü
   kapısı. 1440x900'de sahne yalnızca 127 kullanıcı birimlik bir bant
   gösteriyordu (y 116.75..243.75), yani en yakın halkanın tepesi (y=8) çoktan
   kesilmişti. "Sınırlandırma" diye bir katman eklenmiş değildi — kırpmanın
   kendisi sınırlandırmaydı.

   O yüzden bu adayda YENİ ÇİZGİ EKLENMEDİ, KIRPMA KALDIRILDI. Çizim artık
   sahne kutusunun 5 katı yükseklikte bir katmanda duruyor ve halkalar yukarı
   doğru serbestçe çıkıyor. Üstüne üç halka daha eklendi (aşağıda ECHO):
   koridorun ağzından DIŞARI, yani izleyicinin arkasına doğru devam eden
   yankılar. Dalga da onlara devam ediyor: ışık koridorun sonundan çıkıp
   yanınızdan geçip gidiyor.

   Katmanın ölçeği sahnenin ölçeğiyle BİREBİR aynı kalmak zorunda, yoksa
   koridor kayardı. Bunu sağlayan cebir CSS dosyasında: kutu sahnenin tam 5
   katı ve tuval da tuvalin tam 5 katı, ikisi aynı merkezde. slice'ın ölçeği
   max(genişlik oranı, yükseklik oranı) olduğu için iki oran da aynı katsayıyla
   büyüyünce ölçek DEĞİŞMİYOR — dört kırılımda da ölçüldü.

   ------------------------------------------------- 2 · YAZININ ARKASINDA NE OLUYOR
   Sönme kırpma değil GRADYAN: katmanın tamamı dikey bir maskeden geçiyor
   (eğri CSS dosyasında, ölçülmüş sayılarla). Maske sahnenin içinde 1, sahnenin
   40px üstünde hâlâ 1, butonların bittiği yerde 0.42, alt satırın üstünde
   0.12, başlığın içinde 0.05'in altında ve tamamen sönüyor. Yani çizgiler
   yazıya VARIYOR ama yazıya çarpmıyor.

   Yığın sırası da bu yüzden zorunlu: metin çizgilerin ÖNÜNDE. Hero'da
   .hero4-top ile .hero4-globe'un ikisi de z-index:1 ve globe DOM'da sonra
   geldiği için normalde çizgiler yazının üstüne çıkardı; lab sayfasındaki
   .ptl5-host sarmalayıcısı yalnız bu bölümde metni bir kademe yukarı alıyor.

   ------------------------------------------------------------- 3 · IZGARA
   Ölçüldü, karar CSS dosyasında yazılı: ızgara kalıyor ama bu bölümde
   kısılıyor. Kaldırmak müşterinin verdiği izindi, zorunluluk değildi.

   --------------------------------------------- 4 · KAPI ÜLKEYE GÖRE DEĞİŞİYOR
   Canlı sahnede (home/HeroScene.tsx · ART) ülkeye göre değişen şey dört
   parça: kemer profili (open), ışık gradyanının tepesi (apex), ışığın ÜSTÜNE
   düşen desen (overLight — Dubai'nin kafesi, İngiltere'nin yelpaze çıtaları,
   KKTC'nin eşik taşı) ve duvara oyulmuş kasa (frame — kemer taşları, sütunçe,
   saçak). Üç varyant var.

   Bunlardan KEMER PROFİLİ buraya birebir taşındı. Üç profil (canlıdaki ART
   girdilerinin karşılıkları):
     dubai      sivri kemer, kutunun tamamını dolduruyor — en yüksek, en sivri
     ingiltere  yuvarlak baş (0.86) + üstünde taşkın korniş (1.16 × yarı en)
     kktc       basık segman kemer (0.62) + hizasında düz kiriş — taş portal

   DESEN VE KASA TAŞINMADI, ve bu bilinçli: ağza koyulsa tam olarak müşterinin
   görmek istediği şeyin — Burj Khalifa'nın, Tower Bridge'in, Beşparmak
   sırtının — üstünü örtüyor, çünkü ağzın içi zaten ülkenin kendisi. Bu yüzden
   ağız TEMİZ bırakıldı; ülkeyi anlatan üç şey profil, ışığın rengi ve
   manzaranın kendisi.

   ····································· 4b · KAPI ÜLKENİN, YANKI HERKESİN
   DÜZELTME · 4. tur. Müşterinin cümlesi birebir: "p5 fikri okey ama dubai
   dışındakilerde bug var bak dubaide çizgiler düzgün ama ingilterede ve kktc
   de oval çizgiler yerine bide kare bişiler var düzelt onu."

   TEŞHİS · YANKININ BİÇİMİ KAPININ BİÇİMİNDEN TÜRÜYORDU. Tek bir çağrı
   yüzünden: `halka(country, K[n])` sekiz halkanın HEPSİNE ülke profilini
   uyguluyordu. Yani kapı düzleştikçe yankı da düzleşiyor, üstelik düzleşen
   üye sekiz kez tekrarlanıyordu. Türetme zinciri PROFIL[c].kiris ve .dikme
   üzerinden: kiriş = kutu tepesindeki DÜZ YATAY, dikme = uçlarından hizaya
   inen İKİ DİKEY. Dubai'de ikisi de null/false, öteki ikisinde dolu.

   ÖLÇÜM (1440x900'de GÖRÜNEN kutu: x 0..720, y -138.1..498.1; sekiz halkanın
   yol dizeleri ayrıştırılıp kutuya kırpıldı):
                 düz yatay   dikey   eğri taç   en uzun yatayın görünen boyu
     dubai            0        10       16        —
     ingiltere        7        10        8       720 birim (kutuyu boydan boya)
     kktc             7        20        8       720 birim (kutuyu boydan boya)
   On dikeyin ONU üç ülkede de ortak: koridorun kendi ayakları (n 0-4'ün iki
   yan bacağı, hizanın ALTINDA). Dubai onlarla "düzgün" görünüyor, yani sorun
   onlar değil. Farkı yapan iki şey: ingiltere'nin YEDİ kirişi ve kktc'nin
   yedi kirişi + hizanın ÜSTÜNDEKİ ON dikmesi (2 x n 0-4), ki o on dikme
   kirişle birleşince BEŞ TAM DİKDÖRTGEN ÇERÇEVE veriyor. Müşterinin "kare
   bişiler" dediği şey birebir bu.
   Kirişlerin kırpmasız boyu da tabloyu tamamlıyor: ingiltere n=5 1034.6 ·
   n=6 1398.1 · n=7 1889.4 birim; kktc 891.9 · 1205.3 · 1628.8. Tuval 720
   birim geniş, yani bu altı çizgi ekranı boydan boya kesiyordu.

   DÜZELTME. İki ayrı şekil var artık ve sınır keyfi değil, kodun kendi
   ayrımı: KAPI = ağız (n=0), ülkenin göründüğü ve `agiz()`in kırptığı tek
   halka; YANKI = onun dışındaki yedi halka (n 1-7), ülkeden bağımsız tek
   profil. Yankı profili DUBAI'NİNKİYLE ALAN ALAN AYNI ({yay:1, kiris:null,
   dikme:false, sivri:true}) ve bu bir tesadüf değil, düzeltmenin kilidi:
   müşterinin "oval" dediği şey Dubai'de gördüğü eğri, o yüzden referans
   olarak başka bir eğri (örneğin yarım elips) seçmek Dubai'yi de değiştirirdi.
   Bu seçimle Dubai'nin sekiz yolunun sekizi de HARF HARF aynı kalıyor.

   ÖLÇÜLEN SONUÇ (aynı kutu, aynı sayım):
                 düz yatay   dikey   eğri taç   en uzun yatayın görünen boyu
     dubai            0        10       16        —            (değişmedi)
     ingiltere        1        10       15       225.8 birim   (kapının kornişi)
     kktc             1        12       15       194.8 birim   (kapının kirişi)
   Kalan tek yatay ve kktc'deki iki fazla dikey KAPININ KENDİSİ, yani geçen
   turda onaylanan ülke kimliği. Yankıda düz üye sıfır.

   NEDEN TAM BU SINIR, neden "düz üyeleri at, yay ülkede kalsın" değil.
   Denendi ve elendi: yay ülkede kalınca taç merdiveni n=0'dan sonra da
   ülkeye göre kayıyor ve dış halkalar üç ülkede üç ayrı yükseklikte bitiyor
   (kktc n=7 -81.1 · ingiltere -180.6 · dubai -238.6). Aynı hero'nun aynı
   yerinde üç ayrı yükseklik demek, maskenin ölçülmüş duraklarının yalnız bir
   ülkede doğru olması demek. Ortak taç n=1'den başlayınca merdiven üç ülkede
   de tek dizi: 108.8 · 84.4 · 51.7 · 8 · -51 · -130.8 · -238.6.

   BAĞ KOPMUYOR (istenen şart). Üç sebeple yankı hâlâ kapıdan doğuyor:
   (1) bütün halkalar hâlâ (360,176) merkezli homotetik, yani kaçış
   noktasından çıkan her ışın hepsini aynı yerden kesiyor ve yankı kapının
   oranını sürdürüyor; (2) kapının tacı üç ülkede de yankının ilk halkasının
   İÇİNDE kalıyor (dubai 17.6 · ingiltere 24.6 · kktc 36.5 birim aşağıda),
   yani ülkenin kemeri yankının ağzına oturuyor, onu kesmiyor; (3) dalga hâlâ
   n=0'dan başlayıp dışa gidiyor, yani ışığın kaynağı kapının kendisi.

   KAPININ LENTOSU YANKIYI BİRAZ AŞIYOR ve bu eskiden de böyleydi: ingiltere
   kornişinin ucu yankı n=1'in eğrisinin 40.5 birim dışında duruyor (eski
   düzende aynı ölçü 45.1 birimdi, yani aşma AZALDI), kktc kirişinde 25.0
   birim. Lento açıklıktan taşkın bir üye, duvara oturur; içeri çekmek
   İngiliz entablatürünü de KKTC'nin taş portalını da bozardı.

   RENK ÜLKEDE KALDI. Sorun biçimdi, renk değil: yankının taşıdığı mürekkep
   (--pv-s2/s3) ülkeye göre değişmeye devam ediyor, yani seçim koridorun
   tamamını hâlâ yeniden renklendiriyor.

   -------------------------------------------- 5 · KAPININ ALTINDAN IŞIK SÜZMESİ
   P1'den alındı (ptl1-spill): eşikten dışarı taşan, dış durağı SAYDAM bir
   dikey gradyan ve nefes alan bir opaklık. Koridorda "kapının altı"
   koridorun ağzının altı: ışık ağzın eşiğinden çıkıp koridorun tabanına
   yayılıyor ve size doğru gelirken sönüyor. Yani P1'deki huzmenin yönü
   korunuyor (kaynaktan izleyiciye), yalnız kaynak koridorun sonunda.

   ------------------------------------------------------------------ GEOMETRİ
   P2'nin tuvali ve sayıları aynen: kaçış noktası (360, 176), halka oranı
   k = 1 · 0.74 · 0.545 · 0.40 · 0.295, yarı genişlik 330k, yarı yükseklik
   168k, ayak y = 176 + 168k. Dışa doğru üç yankı aynı oranın tersinden
   (÷0.74) devam ediyor. Bütün halkalar (360,176) merkezli homotetik olduğu
   için kaçış noktasından çıkan her ışın hepsini aynı yerden kesiyor —
   perspektif göz kararı değil, cebirden geliyor.
   ========================================================================= */

const CX = 360;
/** Kemerin bindiği hiza = kaçış noktasının yüksekliği. */
const YS = 176;

/** Halka merdiveni. İlk beşi P2'nin koridoru (yakından uzağa okunacak sıra
 *  aşağıda ters), son üçü koridorun ağzından DIŞARI devam eden yankılar:
 *  1/0.74 = 1.3514 ile aynı oran dışa doğru sürüyor. Dördüncü bir yankı
 *  denendi ve atıldı: ry 560, yani dört kırılımın hiçbirinde maskenin
 *  sıfırından önce ekrana girmiyor — bedava DOM düğümü. */
const K: readonly number[] = [0.295, 0.4, 0.545, 0.74, 1, 1.3514, 1.8262, 2.4679];

/** Bir halkanın kutusunun İÇİNDEKİ şekil. Kutu her zaman ortak (yarı en 330k,
 *  ayak 176+168k, kutu tepesi 176-168k); profil yalnızca o kutuyu nasıl
 *  dolduracağını söylüyor.
 *    yay    yayın yüksekliği, kutu yüksekliğine oran
 *    kiris  kirişin/kornişin yarı genişliği, kutu yarı enine oran (yoksa null)
 *    dikme  kirişin uçlarından hizaya inen iki dikme (dikdörtgen çerçeve)
 *    sivri  yay yerine iki kübik eğri, tepede birleşiyor */
type Profil = {
  yay: number;
  kiris: number | null;
  dikme: boolean;
  sivri: boolean;
};

/** KAPININ profili, ülkeye göre. Üçü de AYNI KUTUYA oturuyor; kutu ortak
 *  olmasa halka merdiveni ülkeden ülkeye zıplardı ve sahne "yeniden çizildi"
 *  gibi okunurdu, şimdi "aynı koridor, başka mimari" okunuyor. Bu tablo
 *  YALNIZ n=0'a uygulanıyor (bkz. 4b): kapı ülkenin, yankı herkesin. */
const PROFIL: Record<Country, Profil> = {
  /* Canlı: "sivri kemer. Üç kapının en yükseği ve en darı." Eğrinin denetim
     noktaları canlı yoldan oranlanarak alındı (M42 330 V168 C42 108 68 56
     110 28 …): birinci denetim yayın %43'ünde, ikincisi %80'inde ve yarı enin
     %62'sinde. Yani profil uydurulmadı, ölçülüp taşındı. */
  dubai: { yay: 1, kiris: null, dikme: false, sivri: true },
  /* Canlı: Georgian kapı — yarım daire camlık ve üstünde korniş. Korniş
     AÇIKLIKTAN TAŞKIN (canlıda 98/68 = 1.44; burada 1.16, çünkü bir sonraki
     halkanın ayağı 1.3514 katta duruyor ve 1.44 onu keserdi) ve altında
     dikme yok: entablatür duvara oturur, çerçeve kapatmaz. Oran 4b'den sonra
     da geçerli: kornişin ucu x=247.1'de, yankı n=1'in ayağı x=228'de, yani
     içeride kalıyor; 1.44 olsaydı 219.8'e, yani ayağın dışına düşerdi. */
  ingiltere: { yay: 0.86, kiris: 1.16, dikme: false, sivri: false },
  /* Canlı: "yuvarlak taş kemer. En alçak ve en geniş açıklık" + kemeri saran
     DİK PAYANDALAR ve düz saçak. Kiriş açıklıkla aynı ende (1.0) ve uçlarından
     iki dikme hizaya iniyor: dışarıda dikdörtgen bir taş portal, içinde basık
     bir kemer. Payandalar olmadan İngiltere'nin kornişiyle karışıyordu —
     ekranda denendi, iki ülke aynı görünüyordu. */
  kktc: { yay: 0.62, kiris: 1, dikme: true, sivri: false },
};

/** YANKININ profili — n 1-7, ÜLKEDEN BAĞIMSIZ TEK ŞEKİL.
 *
 *  Alanları PROFIL.dubai ile birebir aynı ve ayrı bir sabit olarak yazılması
 *  bilinçli: burada yazan şey "yankı Dubai'nin kapısıdır" değil, "yankının
 *  kendi biçimi vardır ve o biçim kutuyu tam dolduran sivri taç". Dubai'nin
 *  kapısı bugün aynı biçimi kullanıyor, yarın kapı değişirse yankı yerinde
 *  kalır. Ölçünün seçilme sebebi 4b'de: müşterinin "oval" dediği eğri Dubai'de
 *  gördüğü eğri, o yüzden referans o. Nesne dondurulmuyor çünkü modül
 *  kapsamında ve dışa açılmıyor; kimse yazamaz. */
const YANKI: Profil = { yay: 1, kiris: null, dikme: false, sivri: true };

const r1 = (n: number) => +n.toFixed(1);

/** Açıklığın konturu: sol ayaktan yukarı, kemerden geçip sağ ayağa. Kapalı
 *  değil — kapatılsaydı zemin boyunca bir taban çizgisi de çizilirdi ve
 *  koridorun tabanı zaten ışığın kendisi. */
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

/** Halkanın tamamı: açıklık + (varsa) kutu tepesindeki kiriş. Tek <path>
 *  içinde iki alt yol — ikisi aynı anda yanmalı ve animation-name tek bir
 *  özellik, yani iki ayrı öge iki ayrı durak olurdu. */
function halka(p: Profil, k: number): string {
  let d = acikli(p, k);
  if (p.kiris == null) return d;
  const w = 330 * k;
  const h = 168 * k;
  const kx = p.kiris * w;
  d += ` M${r1(CX - kx)} ${r1(YS - h)} H${r1(CX + kx)}`;
  if (p.dikme) {
    d += ` M${r1(CX - kx)} ${r1(YS - h)} V${YS} M${r1(CX + kx)} ${r1(YS - h)} V${YS}`;
  }
  return d;
}

/** Ağzın açıklığı, KAPALI: ülkenin göründüğü pencerenin kırpma maskesi.
 *  Ülkeyi kendi kapısının biçiminden görüyorsunuz — Dubai'de sivri kemerin
 *  ucu Burj Khalifa'nın iğnesiyle aynı eksende bitiyor (tepe 126.4, iğnenin
 *  ucu 131.7), İngiltere'de yuvarlak baş (133.3) Tower Bridge'in külahlarının
 *  (149.2) üstünde kalıyor, KKTC'de basık kemer (145.2) Beşparmak'ın en
 *  yüksek tepesinin (170.3) üstünde. Üçü de ÖLÇÜLDÜ; bir profil kısılırsa
 *  bu üç sayı yeniden kontrol edilmeli. */
const agiz = (c: Country) => `${acikli(PROFIL[c], K[0])} Z`;

export default function HeroPortalP5() {
  const country = useOrtacStore((s) => s.country);
  const id = useArtId("p5");

  return (
    <div className="ptl ptl5">
      <PortalPicker />

      {/* akt: fare sahnenin üstündeyken dalga duruyor (kapı css/aktarim.css'te).
          Değişkenler de burada: bir sahnenin bütün hareket hikâyesi tek blokta. */}
      <div className="ptl-stage ptl5-stage ptl-tone akt" data-c={country} aria-hidden="true">
        {/* SERBEST KATMAN — sahne kutusunun 5 katı, aynı merkezde, maskeli.
            Kırpan tek şey SVG'nin kendi görüntü kapısı (yatayda sahne
            genişliği), yani sayfa yatayda hiçbir koşulda uzamıyor. */}
        <div className="ptl5-free">
          <svg viewBox="0 -720 720 1800" preserveAspectRatio="xMidYMid slice" focusable="false">
            <defs>
              <clipPath id={`${id}c`}>
                <path d={agiz(country)} />
              </clipPath>

              {/* Koridorun sonundaki bloom. Dış durak saydam: hero'nun
                  arkasındaki ızgarayı silen opak bir dikdörtgen bırakmıyor. */}
              <radialGradient id={`${id}g`} cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="var(--pv-s2)" stopOpacity="0.5" />
                <stop offset="0.5" stopColor="var(--pv-s2)" stopOpacity="0.16" />
                <stop offset="1" stopColor="var(--pv-s2)" stopOpacity="0" />
              </radialGradient>

              {/* IŞIK SÜZMESİ (P1'den). Dış durak SAYDAM, opak siyah değil:
                  canlı sahnede opak durak ızgarayı silen bir dikdörtgen
                  bırakmıştı. */}
              <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--pv-s2)" stopOpacity="0.62" />
                <stop offset="1" stopColor="var(--pv-s2)" stopOpacity="0" />
              </linearGradient>

              {/* Zemin çizgisi iki ucunda sönüyor: kenarda kesilmiyor, bitiyor. */}
              <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#1c1c1c" stopOpacity="0" />
                <stop offset="0.5" stopColor="#2f2f2f" />
                <stop offset="1" stopColor="#1c1c1c" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Işık en altta, nesne en üstte. */}
            <ellipse className="ptl5-bloom" cx="360" cy="176" rx="300" ry="200" fill={`url(#${id}g)`} />

            {/* KORİDORUN TABANINA SÜZÜLEN IŞIK. Yamuk ağzın eşiğinden (y=225.6)
                en yakın halkanın ayağına (y=344) açılıyor: ışık kaynaktan
                izleyiciye doğru geliyor ve gelirken sönüyor — P1'deki huzmenin
                yönü ve gradyanı, koridorun geometrisine oturtulmuş hâli. */}
            <path
              className="ptl5-spill"
              d="M262.6 225.6 H457.4 L690 344 H30 Z"
              fill={`url(#${id}s)`}
            />
            <rect x="-60" y="343.3" width="840" height="1.4" fill={`url(#${id}f)`} />

            {/* zemin ışınları ve kilit taşı hattı: halkaların köşelerini ve
                tepelerini kaçış noktasına bağlayan üç saç teli. Dikey hat
                artık en dıştaki yankının tepesine kadar sürüyor (y=-239):
                koridorun ekseni de kutudan çıkıyor. */}
            <path className="ptl5-ray" d="M30 344 L262.6 225.6 M690 344 L457.4 225.6 M360 -239 V126.4" />
            {/* kemerin bindiği hiza: kaçış noktası tam o yükseklikte olduğu
                için bu hat perspektifte yatay, eğik değil */}
            <path className="ptl5-ray" d="M30 176 H262.6 M457.4 176 H690" />

            <g clipPath={`url(#${id}c)`}>
              <rect x="255" y="120" width="210" height="112" fill="#090909" />
              {ORDER.map((c) => (
                <g key={c} className="ptl5-world" data-on={c === country}>
                  <g transform="translate(268 128) scale(0.46)">
                    <Vista c={c as Country} id={`${id}${c}`} />
                  </g>
                </g>
              ))}
            </g>

            {/* HALKALAR. DOM'da dıştan içe (ağız en üstte boyansın), dalganın
                sırası --akt-i ile veriliyor ve içten dışa: ışık koridorun
                sonundan çıkıp yanınızdan geçip gidiyor.

                Profil seçimi 4b'nin tamamı: yalnız n=0 ülkenin kapısı, geri
                kalan yedisi ortak yankı. Tek satır, çünkü ayrım da tek: kapı
                ülkeyi ÇERÇEVELİYOR (agiz() aynı şekli kırpma olarak da
                kullanıyor), yankı ülkeyi çerçevelemiyor. */}
            {[...K.keys()].reverse().map((n) => (
              <path
                key={n}
                className="ptl5-ring akt-durak"
                data-n={n}
                d={halka(n === 0 ? PROFIL[country] : YANKI, K[n])}
                style={{ "--akt-i": n } as React.CSSProperties}
              />
            ))}
          </svg>
        </div>

        <div className="ptl5-plate">
          <PortalPlate c={country} />
        </div>
      </div>
    </div>
  );
}
