"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Waypoints } from "lucide-react";

/* ============================================================================
   DUBAI HERO KARTI — ADAY H11 · "SAHNE"

   ---------------------------------------------------------------- MUHAKEME

   1) BU KART NEREDEN GELDİ
   Müşteri üçüncü turda üç şeyi ayırdı:
     · H8'in TASARIMI beğenildi — sakin renk, tek nesneye odaklanma, temiz
       düzen, değişen tek kelime, hem ilerleme hem kumanda olan şerit.
     · H8'in KURGUSU (boş bir dosya aşama aşama doluyor) düştü. "İnşa
       mantığından çıkartıp ilerleyebiliriz."
     · Yerine H6'nın aşama kartları istendi, ama küçük küçük geçen kartlar
       olarak değil: "burada BÜYÜK şekilde gösterebiliriz."
   Yani bu kart H8'in kabuğu + H6'nın içeriği değil; H8'in DÜZEN MANTIĞININ
   başka bir konuya uygulanması. H8'te sahne sabitti (hep aynı kağıt) ve
   üstündeki parçalar değişiyordu. Burada tersi: her aşamada sahnedeki NESNE
   komple değişiyor. Ortak olan şey ikisinin de aynı anda tek bir şey
   göstermesi ve o tek şeyi büyük göstermesi.

   2) NEDEN "İNŞA" ÇIKINCA GERİYE İYİ BİR ŞEY KALIYOR
   İnşa kurgusunun bedeli şuydu: her aşama aynı kağıdın üstünde bir çubuğa
   dönüşüyordu, yani beş aşama birbirine benziyordu ve aralarındaki gerçek
   fark (biri karar, biri imza, biri otoritenin işi, biri sizin bizzat orada
   olmanız, biri bankanın kararı) çizimde kayboluyordu. Aşamalar kendi
   nesnelerine kavuşunca bu fark geri geliyor: seçim listesi ile parmak izi
   plakası birbirine benzemiyor, benzememeleri de bilginin kendisi.

   3) ÜÇ SANİYEDE NE VERİYOR
   Bilgi değil ritim: "bunun beş aşaması var, sırayla oluyor, her aşamada
   somut ve tanıdık bir iş yapılıyor". Ziyaretçi imzanın atıldığını, mührün
   indiğini, parmak izinin tarandığını GÖRÜYOR. Detayı merak eden sayfanın
   altındaki yedi adımlık akışa iniyor — müşterinin "özet önde, detay talep
   üzerine" düzeni tam olarak bu, ve kart o bölümle yarışmıyor: kart resmi
   verir, bölüm ayrıntıyı.

   ---------------------------------------------------------------- TASARIM

   DİKEY ORAN — BU TURUN ASIL İŞİ
   Hero'nun sağ sütunu artık ~520-580 genişlik × 560-680 yükseklik. H6/H7/H8
   yatay kurgulardı; buradaki fazlalık yüksekliği metinle doldurmak kartı
   kalabalık yapardı. Onun yerine SAHNEYE veriliyor: kart dikey bir yığın
   (sahne · ad · şerit · alt satır) ve fazla yükseklik yalnızca sahnenin
   payına yazılıyor (CSS'te flex:1). Yani kart uzadıkça çizim büyüyor, satır
   sayısı sabit kalıyor. Kartta aynı anda görünen metin üç birim: kelime,
   kim rozeti, tek satır açıklama — artı sabit alt cümle.

   SAHNE ÇERÇEVESİ NEDEN KALIYOR
   Her aşamada içerik komple değişiyor ama çerçeve değişmiyor. Sebebi ölçü:
   çerçeve de değişseydi kartın altı her geçişte oynardı. Sabit çerçeve
   ayrıca "aynı yere bakıyoruz, gösterilen şey değişiyor" diyor — bir tiyatro
   sahnesi gibi. Değişen şeyin büyüklüğü de bundan geliyor: sahne kartın
   yaklaşık üçte ikisi.

   RENK: H8'İN DÜZENİ, AYNEN
   Sahnedeki her çizimde ilerleyen TEK şey mavi (--blue-600). Geri kalan her
   şey gri kademe. Kural şu: mavi bir palet rengi değil, "şu an olan şey"in
   işareti. Beyaz ise bütün döngüde BİR KEZ görünüyor — lisans sahnesindeki
   mühür izinde. Kıt olduğu için tek başına "bu, sürecin çıktısı" diyebiliyor;
   beş sahnede de beyaz kağıt kullansaydık hiçbiri bir şey söylemezdi.
   Müşteri "kartların beyaz olması şart değil" dedi; şart olmadığı için de
   beyaz, anlamı olan tek yere saklandı.

   KOYU YÜZEYDE ALFA YOK. Kart #111111, sahne #161616, nesneler #1a1a1a,
   çizgiler #262626 / #2c2c2c. Neredeyse siyah zeminde rgba katmanları aynı
   griye çıkıyor; kademeler opak hex olmak zorunda.

   HER SAHNENİN TEK, KISA HAREKETİ VAR
   Kart öne geldiğinde bir kez oynuyor, sonra sahne dinleniyor: seçim
   yerine oturuyor, imza çiziliyor, mühür iniyor, tarama geçiyor, dosya
   kuruma kayıyor. Bir süreci hissettirmek o süreçteki EYLEMİ göstermek
   demek; duran bir belge çizimi çıktıdır, çizilen bir imza eylemdir.
   Sürekli dönen hiçbir şey yok — hero'da o gürültü olur.
   Her çizimin DURAN hâli TAMAMLANMIŞ hâlidir: hareket kapalıyken geriye
   eksik bir kare değil, bitmiş bir resim kalıyor.

   ŞERİT HEM İLERLEME HEM KUMANDA (H8'den)
   Beş eşit segment kartın tamamını kaplıyor. Aktif segment hem maviye
   dönüyor hem KALINLAŞIYOR: rengi ayırt edemeyen ziyaretçide de "buradayız"
   bilgisi kaybolmuyor. Basan istediği aşamaya gidiyor ve kendiliğinden
   dönme orada duruyor — basmak "ben seçiyorum" demek, kartın iki saniye
   sonra bu kararı geri alması kaba olurdu.

   ---------------------------------------------------------------- SINIRLAR
   - Gün sayısı, tarih, fiyat yok. Kart "ne kadar sürer" sorusuna hiçbir
     yerde cevap vermiyor; verdiği tek şey SIRA.
   - Lisans aşamasının satırı takvimin bizde olmadığını söylüyor
     (STANCE_LIMITS 2), banka aşamasınınki kararın bankada olduğunu
     (STANCE_LIMITS 1). Banka sahnesinde onay işareti yok, bekleyen üç nokta
     var — çizim iddiayı metinden önce kapatıyor.
   - Kimlik aşaması FACTS.dubai.limit ile aynı gerçek: bir kez BAE'de.
     Gizlenmiyor, beş aşamadan biri olarak duruyor.
   - Çizimlerde harf, uydurma numara, sahte resmî amblem yok — hepsi siluet.
   - <768px'te kart gizli; mobilde hero'yu metin taşıyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Bir sahnenin ekranda kalma süresi. Sahne 160ms gecikmeyle giriyor, kendi
   mikro hareketi en uzun 3.2 sn sürüyor; 3800 hem hareketin bitmesine hem de
   resmin bir an dinlenmesine yetiyor. Daha kısası telaşlı, daha uzunu kartı
   ölü gösteriyor. */
const DWELL = 3800;
/* Son sahne (banka) bir tık daha duruyor: bekleyen noktalar iki kez yanıp
   sönüyor ve o bekleyiş bu kartın en önemli cümlesi — karar bizde değil. */
const LAST = 4800;
/* Başa dönüş. Sahneler için özel bir iş yok: beşinciden birinciye geçiş de
   öbür geçişlerin aynısı (biri sönüyor, öbürü beliriyor). Geri sarılan tek
   şey ŞERİT — dolu segmentlerin tek tek boşalması "geri adım" diye okunuyor
   (aynı ders lab-h5.css ve lab-h6.css'te de yazılı). O yüzden şerit kısa bir
   an sönüyor, dönüş o sönüklükte yapılıyor. İkinci sayı birinciden büyük:
   ışık geri gelirken segmentler zaten başlangıç hâlinde olmalı. */
const REWIND = 300;
const RELIGHT = 360;

type Who = "siz" | "ortac" | "otorite";

type Stage = {
  key: string;
  /** sahnenin tek kelimelik adı — kartın değişen ana metni */
  word: string;
  /** aşamanın içeriği ya da şartı; tek kısa satır, cümle bütçesinin tamamı */
  meta: string;
  who: Who;
  art: React.ReactNode;
};

/* --------------------------------------------------------------- çizimler */
/* Beşi de aynı 440×340 kutuda ama SİLUETLERİ birbirine benzemiyor: liste,
   yelpaze, mühür, plaka, cephe. Fark kasıtlı — hangi aşamada olduğumuz metin
   okunmadan, sadece kompozisyondan anlaşılsın diye. Kutu H6'daki 230×140'ın
   iki katından biraz büyük: aynı çizimler burada tek başına duruyor, o yüzden
   eleman sayısı azaltılıp kalan elemanlar büyütüldü — müşterinin "büyük
   şekilde gösterebiliriz, daha temiz" dediği yer burası.

   HİÇBİR ÇİZİM KENDİ RENGİNİ BİLMİYOR. Bütün boyalar lab-h11.css'teki
   paletten geliyor (.h11-sur gövde · .h11-ink koyu mürekkep · .h11-dim soluk
   satır · .h11-act mavi = şu an olan şey · .h11-paper beyaz = tek kez).
   Sebebi pratik: bir tonu değiştirmek için otuz yerde arama yapmak
   gerekmesin, ve "mavi yalnızca ilerleyen şey" kuralı tek yerden denetlensin. */

/* 1 · KARAR — üç seçenekli bir liste ve üstünde gezinen seçim.
   Kuruluş tipinin gerçekten üç seçenekli olması (serbest bölge / mainland /
   offshore — countryContent.dubai.steps[2]) çizimi uydurma olmaktan
   çıkarıyor: liste sayfanın kendi içeriğinin şekli.
   Satır adımı 86 birim (68 yükseklik + 18 ara). Seçim katmanı bu adımın
   katlarıyla kayıyor; CSS'teki 0 / 172 / 86 sayıları buradan geliyor, biri
   değişirse öteki de değişmeli. */
function ArtKarar() {
  const rows = [66, 152, 238];
  const bars = [196, 158, 216];
  return (
    <svg className="h11-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      {/* Sorunun kendisi: tek çubuk. Listeyi havada bırakmamak için var,
          okunacak bir şey olduğu için değil. */}
      <rect className="h11-ink" x="30" y="26" width="150" height="11" rx="5.5" />
      {rows.map((y, i) => (
        <g key={y}>
          <rect className="h11-sur" x="30" y={y} width="380" height="68" rx="16" />
          <circle className="h11-ring" cx="64" cy={y + 34} r="13" />
          <rect className="h11-dim" x="94" y={y + 29} width={bars[i]} height="10" rx="5" />
        </g>
      ))}
      {/* Seçim ayrı bir katman ve alttaki satırı TAMAMEN örtüyor: böylece
          hangi satıra kaydığı önemsiz, satırların genişlik farkı görünmüyor.
          Duran hâli ortadaki satır — bir seçim yapılmış olarak kalıyor. */}
      <g className="h11-pick">
        <rect className="h11-well" x="30" y="66" width="380" height="68" rx="16" />
        <circle className="h11-act" cx="64" cy="100" r="13" />
        <circle className="h11-punch" cx="64" cy="100" r="4.6" />
        <rect className="h11-act2" x="94" y="95" width="196" height="10" rx="5" />
      </g>
    </svg>
  );
}

/* 2 · TESCİL — yelpaze gibi açılmış bir dosya, önündeki sayfada imza
   çiziliyor. Üç sayfanın tonu kademeli (arka en koyu, ön en açık): koyu
   zeminde üst üste binen aynı renkte üç dikdörtgen tek bir kütle gibi
   okunuyor, kademe olmadan yelpaze görünmüyor.
   Mavi olan tek şey ayraç: dosyanın "işlem gören" sayfası. İmza da mavi,
   çünkü o da bu aşamada OLAN şey — ikisi aynı eylemin parçası. */
function ArtTescil() {
  return (
    <svg className="h11-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      {/* Yelpazenin ağırlık merkezi sağa kaçıyordu: arka iki kağıt koyu olduğu
          için gözün gördüğü kütle yalnızca öndeki sayfa. Üçlü bu yüzden sola
          alındı — ölçüler değil, konum düzeltmesi. */}
      <g transform="rotate(-10 187 180)">
        <rect className="h11-sur-b" x="76" y="48" width="222" height="264" rx="15" />
      </g>
      <g transform="rotate(-4.5 217 175)">
        <rect className="h11-sur" x="104" y="40" width="226" height="270" rx="15" />
      </g>
      <g transform="rotate(1.5 246 171)">
        <rect className="h11-sur-f" x="130" y="30" width="232" height="282" rx="15" />
        <rect className="h11-act" x="318" y="18" width="15" height="46" rx="4" />
        <rect className="h11-ink" x="158" y="64" width="112" height="13" rx="6.5" />
        <rect className="h11-dim" x="158" y="100" width="162" height="9" rx="4.5" />
        <rect className="h11-dim" x="158" y="122" width="136" height="9" rx="4.5" />
        <rect className="h11-dim" x="158" y="144" width="148" height="9" rx="4.5" />
        {/* İmza satırı ve imza. Çizgi önce, imza sonra: boş bir imza satırı
            "burada bir imza bekleniyor" diyor, imza gelince de nereye
            atıldığı belli oluyor. */}
        <rect className="h11-rule" x="158" y="264" width="158" height="2" rx="1" />
        <path
          className="h11-sign"
          d="M160 254 c11 -24 20 11 31 -7 c9 -15 18 15 29 0 c9 -13 18 11 26 -2 c7 -11 15 7 24 -2"
        />
      </g>
    </svg>
  );
}

/* 3 · LİSANS — inen mühür ve bıraktığı iz. Kartın tek beyaz yüzeyi burada:
   iz. Sebebi anlam, süs değil — ticaret lisansı bu sürecin gerçek çıktısı ve
   onu düzenleyen taraf biz değiliz, otorite. Beyaz o "dışarıdan gelen
   onay"ın rengi oluyor ve bir kez kullanıldığı için yeter.
   Sol üstteki kalkan soyut: gerçek bir kurumun amblemi ya da taklidi değil,
   çünkü sahte resmî işaret bu sayfada yalan olurdu. */
function ArtLisans() {
  return (
    <svg className="h11-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <rect className="h11-sur" x="32" y="44" width="376" height="252" rx="20" />
      <rect className="h11-well-soft" x="62" y="74" width="48" height="48" rx="13" />
      <path
        className="h11-act"
        d="M86 84.56 l13.44 5.28 v10.56 c0 7.68 -5.76 12.96 -13.44 15.36 c-7.68 -2.4 -13.44 -7.68 -13.44 -15.36 v-10.56 Z"
      />
      <rect className="h11-ink" x="126" y="88" width="124" height="14" rx="7" />
      <rect className="h11-dim" x="62" y="152" width="180" height="9" rx="4.5" />
      <rect className="h11-dim" x="62" y="178" width="136" height="9" rx="4.5" />
      <rect className="h11-dim" x="62" y="204" width="160" height="9" rx="4.5" />
      <rect className="h11-dim" x="62" y="230" width="104" height="9" rx="4.5" />

      {/* İz hafif eğik: elle basılmış bir mühür hiçbir zaman tam düz olmuyor,
          ve o küçük eğrilik çizimi "grafik" olmaktan çıkarıp nesne yapıyor.
          İzin üst kenarı (y=196) mührün en aşağıdaki hâliyle birebir hizalı —
          CSS'teki 49 birimlik iniş bu sayıdan hesaplandı. */}
      <g className="h11-print" transform="rotate(-3 310 225)">
        <rect className="h11-paper" x="244" y="196" width="132" height="58" rx="11" />
        <rect className="h11-paper-ink" x="264" y="214" width="70" height="10" rx="5" />
        <rect className="h11-paper-dim" x="264" y="232" width="48" height="8" rx="4" />
      </g>
      {/* Mühür dört parça: tokmak, boyun, taban, keçe. Taban tokmaktan belirgin
          şekilde geniş olmak zorunda — ilk denemede ikisi yakın genişlikteydi
          ve şekil mühür değil halter gibi okunuyordu.
          DURAN HÂLİNDE MÜHÜR YOK (CSS'te opacity 0): iniyor, basıyor, çıkıyor.
          Sahnenin tamamlanmış resmi "kağıt + iz", çünkü kağıdın üstünde asılı
          duran bir mühür "birazdan olacak" diye okunuyor, oysa olan bitmiş. */}
      <g className="h11-stamp">
        <rect className="h11-ink" x="282" y="60" width="56" height="24" rx="12" />
        <rect className="h11-ink2" x="298" y="84" width="24" height="24" />
        <rect className="h11-ink3" x="244" y="108" width="132" height="32" rx="7" />
        <rect className="h11-ink2" x="250" y="140" width="120" height="7" rx="3" />
      </g>
    </svg>
  );
}

/* 4 · KİMLİK — parmak izi plakası, üstünden geçen tarama ve arkada kimlik
   kartı. Bu aşamanın konusu kartın kendisi değil, kartı almak için bizzat
   orada bulunma zorunluluğu (FACTS.dubai.limit); çizimin ağırlık merkezi o
   yüzden plakada, kart ikinci planda ve küçük.
   Sırtlar H6'daki çizimden ölçeklenerek getirilmişti ve BÜYÜTÜLDÜĞÜNDE
   ÇALIŞMADI: 104 birimlik plakada parmak izi gibi duran şekil 204 birimde
   gökkuşağına dönüşüyor. Sebebi şekil değil ölçek — küçükken göz "bu bir
   parmak izi olmalı" diye tamamlıyor, büyükken gördüğünü okuyor ve gördüğü
   şey iç içe altı yay, yani bir kemer.
   Yeniden çizildi. Farkı yapan tek şey UÇLARIN İÇE KIVRILMASI: sırtlar en
   geniş noktadan sonra aşağı inerken içeri dönüyor, yani şekil bir kemer
   değil, alttan açık bir oval — parmak yastığının kendi sınırı. İkinci
   yardımcı, dördüncü sırtın tepede kopuk olması (gerçek izlerdeki sırt sonu):
   kusursuz simetri çizimi grafiğe, küçük kusur nesneye çeviriyor.
   Ara sürümler denendi ve elenirken şu görüldü: uçları serbest bırakılan her
   varyant, sırt sayısı ya da kalınlık ne olursa olsun kemer olarak okunuyor. */
function ArtKimlik() {
  return (
    <svg className="h11-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="h11Plate">
          <rect x="30" y="58" width="204" height="224" rx="28" />
        </clipPath>
      </defs>
      <rect className="h11-sur" x="30" y="58" width="204" height="224" rx="28" />
      <g className="h11-ridge" fill="none" strokeLinecap="round" strokeWidth="3.4">
        <path d="M74 246 C52 224 46 190 50 158 C58 106 92 76 132 76 C172 76 206 106 214 158 C218 190 212 224 190 246" />
        <path d="M88 250 C72 228 66 196 70 168 C78 122 100 96 132 96 C164 96 186 122 194 168 C198 196 192 228 176 250" />
        <path d="M102 248 C92 226 88 200 92 176 C100 140 112 118 132 118 C152 118 164 140 172 176 C176 200 172 226 162 248" />
        <path d="M114 242 C108 222 106 200 110 182 C116 154 122 140 132 140" />
        <path d="M140 141 C150 148 156 164 160 184 C164 204 162 224 156 240" />
        <path d="M124 218 C120 200 122 178 132 172 C142 178 146 196 144 212" />
      </g>
      {/* Tarama çizgisi kırpma yolunun içinde: plakanın yuvarlak
          köşelerinden taşmıyor, yani ışık gerçekten camın üstünde geziyor
          gibi duruyor. */}
      <g clipPath="url(#h11Plate)">
        <rect className="h11-scan" x="30" y="70" width="204" height="4" />
      </g>

      <rect className="h11-sur" x="254" y="104" width="160" height="124" rx="15" />
      <rect className="h11-ink2" x="272" y="122" width="46" height="62" rx="8" />
      <circle className="h11-ink3" cx="295" cy="143" r="10" />
      <path className="h11-ink3" d="M278 176 c0 -11 8 -17 17 -17 c9 0 17 6 17 17 Z" />
      <rect className="h11-ink" x="330" y="128" width="62" height="10" rx="5" />
      <rect className="h11-dim" x="330" y="149" width="50" height="7" rx="3.5" />
      <rect className="h11-dim" x="330" y="164" width="40" height="7" rx="3.5" />
      <rect className="h11-dim" x="272" y="198" width="124" height="8" rx="4" />
    </svg>
  );
}

/* 5 · BANKA — dosya kuruma doğru kayıyor ve orada duruyor. Kurum cephesi
   gri ve hareketsiz, dosya hareketli: yapılan işin bizde, kararın karşı
   tarafta olduğu kompozisyonla söyleniyor. Dosya geri dönseydi "gidip
   geliyor" yani kararsızlık olurdu; oysa anlatılan şey tam tersi, iş bizde
   bitti.
   Dosyadaki tek mavi satır bizim tamamladığımız kısım. Yeşil tik ya da onay
   işareti OLAMAZ — onaylanan hiçbir şey yok, tamamlanan yalnızca hazırlık.
   Bekleyen üç nokta bunu bir kez daha söylüyor: bekleme işareti, onay
   işareti değil. */
function ArtBanka() {
  return (
    <svg className="h11-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      {/* Cephe dosyadan bir ton KOYU. İlk denemede tersiydi ve göz önce kuruma
          gidiyordu; oysa sahnenin öznesi bizim hazırladığımız dosya, kurum
          onun gittiği yer. */}
      <path className="h11-dim" d="M248 112 L334 64 L420 112 Z" />
      <rect className="h11-dim" x="248" y="112" width="172" height="14" rx="3" />
      <rect className="h11-ink2" x="264" y="134" width="26" height="94" rx="3" />
      <rect className="h11-ink2" x="326" y="134" width="26" height="94" rx="3" />
      <rect className="h11-ink2" x="388" y="134" width="26" height="94" rx="3" />
      <rect className="h11-dim" x="240" y="228" width="188" height="15" rx="4" />

      <g className="h11-slide">
        <rect className="h11-sur-f" x="28" y="88" width="180" height="142" rx="15" />
        <rect className="h11-ink" x="50" y="112" width="90" height="13" rx="6.5" />
        <rect className="h11-dim" x="50" y="140" width="114" height="9" rx="4.5" />
        <rect className="h11-dim" x="50" y="162" width="86" height="9" rx="4.5" />
        <rect className="h11-act" x="50" y="186" width="66" height="9" rx="4.5" />
      </g>

      <g className="h11-wait">
        <rect className="h11-sur" x="28" y="250" width="112" height="34" rx="17" />
        <circle className="h11-ink3" cx="56" cy="267" r="5.5" />
        <circle className="h11-ink3" cx="84" cy="267" r="5.5" />
        <circle className="h11-ink3" cx="112" cy="267" r="5.5" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ içerik */
/* Beş aşama, countryContent.dubai.steps'teki yedi adımın sıkıştırılmış hâli.
   Uydurma yok, sıra değişmedi; yalnızca ilk üç adım tek aşamada toplandı,
   çünkü üçü de aynı görüşmede kapanan kararlar (kaynakta üçünün de timing'i
   "ilk görüşme"). Yedi sahne hero'da kalabalık, beş sahne ritim.

   Kelime aşamayı, satır içeriği, rozet sahibi söylüyor. Bu üçlü bilinçli
   olarak birbirini tekrar etmiyor: kelime "Lisans" diyorsa satır lisansın ne
   olduğunu değil, kimin takvimiyle geldiğini söylüyor. */
const STAGES: Stage[] = [
  {
    key: "karar",
    word: "Karar",
    meta: "Ad, faaliyet ve kuruluş tipi birlikte belirleniyor.",
    /* Kararın sahibi ziyaretçi; biz seçenekleri eşleştiriyoruz. */
    who: "siz",
    art: <ArtKarar />,
  },
  {
    key: "tescil",
    word: "Tescil",
    meta: "Ana sözleşme, başvuru ve ekleri hazırlanıyor.",
    who: "ortac",
    art: <ArtTescil />,
  },
  {
    key: "lisans",
    word: "Lisans",
    /* STANCE_LIMITS 2'nin cümleyle söylenen yarısı: takvim bizde değil. Bir
       uyarı kutusunda değil, aşamanın kendi satırında duruyor — orada bir
       kısıt değil, bir olgu. */
    meta: "Ticaret lisansını otorite düzenliyor, takvim onlarda.",
    who: "otorite",
    art: <ArtLisans />,
  },
  {
    key: "kimlik",
    word: "Kimlik",
    /* FACTS.dubai.limit ile aynı gerçek, uyarı tonu olmadan. Beş aşamadan
       yalnızca birinde orada olmak gerekiyor; gizlemek yerine küçültüyoruz. */
    meta: "Biyometri ve Emirates ID; bu aşama için bir kez BAE'de.",
    who: "siz",
    art: <ArtKimlik />,
  },
  {
    key: "banka",
    word: "Banka",
    /* STANCE_LIMITS 1 birebir. "Hesap açılıyor" DEĞİL: bizim ürettiğimiz
       çıktı dosyanın kendisi. */
    meta: "Başvuru dosyasını biz hazırlıyoruz, kararı banka veriyor.",
    who: "ortac",
    art: <ArtBanka />,
  },
];

const WHO_LABEL: Record<Who, string> = {
  siz: "Siz",
  ortac: "Ortac",
  otorite: "Otorite",
};

export default function HeroH11() {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  /* Şerit sönümü: yalnızca son aşamadan birinciye dönerken açılıyor. */
  const [rewind, setRewind] = useState(false);
  /* İki ayrı duraklatma sebebi. Fare kartın üstünde (geçici) ve ziyaretçi bir
     aşamaya bastı (kalıcı). İkincisi kalıcı, çünkü basmak "ben seçiyorum"
     demek; dört saniye sonra kartın onu geri alması kararı çöpe atar. */
  const [hovered, setHovered] = useState(false);
  const [taken, setTaken] = useState(false);

  /* Sahne ilerletici.
     HAREKET KAPALIYSA hiç çalışmıyor: kart birinci sahnede duruyor ve o
     sahnenin çizimi zaten tamamlanmış hâlde (seçim yapılmış). Yani hareketsiz
     hâl eksik bir kare değil; kart hâlâ aynı şeyi anlatıyor, sadece
     kendiliğinden ilerlemiyor. İlerletmek isteyen şeride basıyor.
     `reduced` yalnızca burada, effect içinde okunuyor: useReducedMotion
     sunucuda null döndürdüğü için render çıktısına bağlanırsa hydration
     ayrışır. */
  useEffect(() => {
    if (reduced || hovered || taken || rewind) return;
    const last = active === STAGES.length - 1;
    const id = window.setTimeout(
      () => {
        if (last) setRewind(true);
        else setActive((v) => v + 1);
      },
      last ? LAST : DWELL,
    );
    return () => window.clearTimeout(id);
  }, [active, hovered, taken, rewind, reduced]);

  /* Başa dönüşün ikinci yarısı. Sahneler bu geçişi kendiliğinden yapıyor;
     burada zamanlanan tek şey şeridin sönük olduğu aralık. Ziyaretçi bu
     sırada bir aşamaya basarsa sönüm kapanıyor ve bu effect'in temizliği
     bekleyen iki zamanlayıcıyı iptal ediyor. */
  useEffect(() => {
    if (!rewind) return;
    const back = window.setTimeout(() => setActive(0), REWIND);
    const lit = window.setTimeout(() => setRewind(false), RELIGHT);
    return () => {
      window.clearTimeout(back);
      window.clearTimeout(lit);
    };
  }, [rewind]);

  const pick = useCallback((i: number) => {
    setActive(i);
    setRewind(false);
    setTaken(true);
  }, []);

  const t = (v: number) => (reduced ? 0 : v);

  return (
    <motion.div
      className="h11"
      data-rewind={rewind}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: t(0.7), delay: t(0.2), ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* ---- sahne: kartın üçte ikisi, tek nesne ---- */}
      {/* Beş çizim de DOM'da ve üst üste duruyor; görünen bir tanesi. Sebebi
          ölçü ve süreklilik: sahne kutusu hiç boşalmıyor, geçişte kartın
          yüksekliği oynamıyor, ve çizimler her turda yeniden kurulmuyor. */}
      <div className="h11-stage" aria-hidden="true">
        {STAGES.map((s, i) => (
          <div key={s.key} className="h11-scene" data-on={i === active}>
            {s.art}
          </div>
        ))}
      </div>

      {/* ---- sahnedeki aşamanın adı ---- */}
      {/* Beş metin de DOM'da, mutlak konumla üst üste: aşama değişince kartın
          altı zıplamıyor ve "Karar" ile "Kimlik" arasındaki genişlik farkı
          hizayı bozmuyor. */}
      <div className="h11-say">
        {STAGES.map((s, i) => (
          <div key={s.key} className="h11-c" data-on={i === active} aria-hidden={i !== active}>
            <span className="h11-head">
              <b className="h11-word">{s.word}</b>
              <em className="h11-who" data-who={s.who}>
                {WHO_LABEL[s.who]}
              </em>
            </span>
            <span className="h11-meta">{s.meta}</span>
          </div>
        ))}
      </div>

      {/* ---- şerit: hem ilerleme hem kumanda ---- */}
      <div className="h11-rail">
        {STAGES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className="h11-step"
            data-state={i < active ? "done" : i === active ? "now" : "next"}
            aria-pressed={i === active}
            aria-label={`${s.word} aşaması`}
            onClick={() => pick(i)}
          >
            <i aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Kartın tek sabit cümlesi. Bir iddia kurmuyor: ne süre veriyor ne
          sonuç: yalnızca gördüğünüz şeyin ne olduğunu ve devamının nerede
          olduğunu söylüyor. */}
      <p className="h11-foot">
        <Waypoints size={14} strokeWidth={2} aria-hidden="true" />
        <span>Beş aşama, gerçekleşme sırasıyla. Adımların tamamı aşağıda.</span>
      </p>
    </motion.div>
  );
}
