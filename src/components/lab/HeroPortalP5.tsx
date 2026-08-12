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

   ····································· 4b · DÜZ ÜYELER KALKTI
   İki tur sürdü. Önce yankı kapının biçimini alıyordu ve İngiltere/KKTC'de
   yedi düz kiriş + dikmeler beş dikdörtgen çerçeve üretiyordu; kirişlerin
   boyu 720 birimlik tuvalde 892-1889 birim, yani ekranı boydan boya
   kesiyorlardı. Yankı ülkeden ayrıldı. Kapının KENDİ kirişi kaldı ve müşteri
   onu da istemedi: "portalın üstlerinde bu iki ülkede çizgi kalmış."
   Şimdi düz üye hiç yok: kiriş ve dikme kavramları koddan tamamen kalktı.
   Ülke kimliği yayın kendisinde duruyor (dubai sivri 1.0 · ingiltere 0.86 ·
   kktc 0.62), yani üç kapı hâlâ ayrı ama üçü de eğri.
   Yankı n 1-7 tek profil ({yay:1, sivri:true}); bütün halkalar (360,176)
   merkezli homotetik ve dalga n=0'dan dışa gidiyor, yani bağ kopmuyor.
   Renk ülkede kaldı (--pv-s2/s3).

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
 *    sivri  yay yerine iki kübik eğri, tepede birleşiyor
 *  DÜZ ÜYE ALANI YOK: kiriş (kutu tepesinde yatay) ve dikme (uçlarından inen
 *  iki dikey) alanları vardı, müşteri istemedi ve 4b'de tamamen kaldırıldı.
 *  Alanları "kullanılmıyor" diye bırakmak yerine silmek tercih edildi; ölü
 *  alan bir sonraki turda yeniden doldurulmaya davetiye. */
type Profil = {
  yay: number;
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
  dubai: { yay: 1, sivri: true },
  /* Canlı: Georgian kapı, yarım daire camlık. Canlıdaki korniş BURAYA
     TAŞINMADI (4b): düz bir yatay üyeydi ve müşteri portalda düz çizgi
     istemiyor. Kimlik yayın basıklığında: 0.86 ile üç kapının ortası. */
  ingiltere: { yay: 0.86, sivri: false },
  /* Canlı: yuvarlak taş kemer, en alçak ve en geniş açıklık. Canlıdaki dik
     payandalar ve düz saçak BURAYA TAŞINMADI (4b), aynı sebeple. 0.62 yay
     İngiltere'nin 0.86'sından belirgin basık, yani payandasız da ayrışıyor. */
  kktc: { yay: 0.62, sivri: false },
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
const YANKI: Profil = { yay: 1, sivri: true };

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
                d={acikli(n === 0 ? PROFIL[country] : YANKI, K[n])}
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
