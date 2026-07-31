"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Waypoints } from "lucide-react";

/* ============================================================================
   DUBAI HERO KARTI — ADAY H12 · "SAHNE, BEYAZ ÇİZİM"

   H11'in beyaz çizimli varyantı. H11 (src/components/lab/HeroH11.tsx) olduğu
   gibi duruyor ve aday olarak kalıyor; bu dosya onun yerine geçmiyor, yanına
   konuyor.

   ---------------------------------------------------------------- TALEP
   Müşteri aynen şunu söyledi: "h11'i de arkası siyah kalsın ama gösterdiğimiz
   svg'ler var ya, onları beyaz yapabiliriz dikkat çeksin diye. yine alternatif
   olarak sun ama bunu silme."

   Yani istenen şey iki cümlelik: (1) kart siyah kalacak, (2) sahnedeki
   çizimler beyaza dönecek. Kurgunun geri kalanı — sabit koyu sahne çerçevesi,
   aşama değiştikçe komple değişen nesne, altında tek kelimelik ad, kim rozeti
   ve beş segmentlik şerit — aynen korundu. Metinler, ölçüler, zamanlamalar,
   hareketler H11 ile birebir aynı. İki kart yan yana konduğunda aralarındaki
   TEK fark çizimlerin rengi olmalı; başka bir şey de değişseydi müşteri
   "beyaz mı daha iyi" sorusunu değil, "hangi kart daha iyi" sorusunu
   cevaplamak zorunda kalırdı ve karşılaştırma anlamını yitirirdi.

   ------------------------------------------------- BU NEDEN BASİT BİR İŞ DEĞİL
   H11'in çizimleri koyu zemin İÇİN yazılmıştı: gövdeler #1a1a1a, konturlar
   #2c2c2c, iç satırlar #272727. Yani bütün çizim, zeminin bir-iki ton üstünde
   duran kasıtlı olarak kısık bir gri kabartma. Mavi de tam bu yüzden
   çalışıyordu — kadrajdaki en parlak nesne o olduğu için "şu an olan şey"i
   işaretleyebiliyordu.

   Bu paletteki her rengi beyaza çevirmek üç şeyi aynı anda bozardı:
     (a) Mavi kadrajın en SÖNÜK öğesine düşer, yani vurgu tersine döner.
     (b) Beyaz dolgunun üstünde beyaz kontur görünmez; tescil sahnesindeki üç
         kağıt tek bir beyaz kütleye yapışır.
     (c) Kart, bir önceki turda "çok beyazlık" diye reddedilen şeye dönüşür.

   ----------------------------------------------------- ÇÖZÜM: BEYAZ = ÇİZGİ
   H12'nin kuralı tek cümle:

       BEYAZ YÜZEY DEĞİL, MÜREKKEPTİR.

   Beyaz yalnızca nesnenin DIŞ HATTINA harcanıyor. Gövde dolguları koyu
   kalıyor (#161616 / #1a1a1a / #1f1f1f), iç işaretler gri kademede kalıyor
   (#d4d4d4 → #454545), olay hâlâ mavi. Yani bu kart "aydınlatılmış kağıt"
   değil, "siyah kağıda beyaz kalemle çizim".

   Müşterinin istediği bu okumada birebir karşılanıyor: çizimler gerçekten
   beyaz, göz gerçekten onlara gidiyor. H11'de kontur #2c2c2c'ydi, burada
   #ffffff — aradaki fark gece ile gündüz. Ama beyaz alan olarak neredeyse
   hiçbir şey harcanmıyor, çünkü kontur 1,5 birim kalınlığında.

   Üç tuzağın üçü de kapanıyor:
     (a) Mavi artık en parlak şey değil ama kadrajdaki tek KROMA ve tek büyük
         DOLU şekil. Çevresindeki her beyaz ince bir çizgi. Parlaklıkta değil,
         doygunlukta ve kütlede kazanıyor. Karar sahnesinde seçili satır
         380×68'lik dolu mavi bir kütle; beyaz hiçbir yerde bu ağırlıkta
         değil.
     (b) Dolgular koyu kaldığı için kontur her yerde görünür; yelpazenin üç
         kağıdı üç ayrı kontur tonuyla (uzak #5e5e5e, orta #9e9e9e, ön
         #ffffff) ayrılıyor. Bu havadan perspektif: uzaklaşan kenar soluyor.
     (c) Kart bir gram daha parlak değil. Beş sahnenin tamamı rasterize edilip
         ölçüldü (tablonun tamamı lab-h12.css'in başında): açık mürekkep
         %2,5'ten %7,3'e çıkıyor ama kutunun TOPLAM parlaklığı H11 ile aynı
         kalıyor (%10,3 → %10,2). Sebebi sahne zemininin #161616'dan --night'a
         (#080808) indirilmesi — beyaz çizginin eklediği ışık zeminden geri
         alınıyor. Müşterinin iki şartı ("dikkat çeksin" ve "arkası siyah
         kalsın") çelişiyor gibi duruyordu; çelişki burada çözülüyor.
         Karşılaştırma için: "beyaz kart" adaylarında (H9/H10) aynı ölçü
         %85-100.

   -------------------------------------------------- KITLIĞIN EKSENİ DEĞİŞTİ
   H11'de beyaz KITTI ve kıt olduğu için anlam taşıyordu: bütün döngüde bir
   kez, lisans sahnesindeki mühür izinde. H12'de bu ayrım aynen çalışamaz,
   çünkü artık her sahnede beyaz çizgi var.

       H11'de kıt olan BEYAZ'dı.  H12'de kıt olan DOLULUK.

   Bütün kart çizgiyle çiziliyor; döngüde saf beyazla DOLU tek şekil lisans
   izi. "Bu, sürecin dışarıdan gelen çıktısı" cümlesini önce beyazlık
   söylüyordu, şimdi doluluk söylüyor. Anlam korundu, taşıyıcısı değişti.

   ------------------------------------------------------------ ZEMİN KOYULDU
   Sahne zemini H11'de #161616'ydı, burada --night (#080808) — yani sitenin en
   koyu yüzeyi. İki sebep: beyaz çizgi en çok kontrastı en koyu zeminde alıyor,
   ve eklenen parlaklık zeminden geri alınıyor. Bu ikinci sebep tasarımın
   omurgası: kartın ölçülen toplam parlaklığı H11 ile aynı kaldı, değişen tek
   şey çizimin kendi içindeki kontrast oldu.

   ---------------------------------------------------------------- SINIRLAR
   H11'in sınırları aynen geçerli, çünkü içerik hiç değişmedi:
   - Gün sayısı, tarih, fiyat yok. Kartın verdiği tek şey SIRA.
   - Lisans satırı takvimin bizde olmadığını söylüyor (STANCE_LIMITS 2), banka
     satırı kararın bankada olduğunu (STANCE_LIMITS 1). Banka sahnesinde onay
     işareti yok, bekleyen üç nokta var.
   - Kimlik aşaması FACTS.dubai.limit ile aynı gerçek: bir kez BAE'de.
   - Çizimlerde harf, uydurma numara, sahte resmî amblem yok — hepsi siluet.
     Beyaza dönmek bu kuralı daha da önemli yaptı: okunur görünen beyaz bir
     belge, üstünde sahte bir numara olsaydı, koyu gri hâlinden çok daha fazla
     "gerçek belge" gibi durur ve yalan olurdu.
   - <768px'te kart gizli; mobilde hero'yu metin taşıyor.
   - useReducedMotion: hareket kapalıyken kart birinci sahnede duruyor ve o
     sahne zaten tamamlanmış hâlde. Beyaz çizim bu hâlde H11'den avantajlı —
     kısık gri bir kabartmanın aksine hareketsiz beyaz çizgi kendi başına
     okunuyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Süreler H11 ile birebir. Renk hareketin hızını değiştirmez; iki kart yan
   yana dururken ritim farkı olsaydı fark "beyaz mı" değil "hangisi daha
   sakin" sorusuna kayardı. */
const DWELL = 3800;
const LAST = 4800;
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
/* Geometri H11'den birebir kopyalandı: aynı 440×340 kutu, aynı koordinatlar,
   aynı yollar. Değişen tek şey her şeklin hangi palet sınıfına bağlandığı.
   Bu bilerek böyle: iki adayın karşılaştırılabilir olması için siluetlerin
   aynı kalması gerekiyor.

   İki istisna var ve ikisi de renk kararının doğrudan sonucu:
     · İmza konturu 3.2 → 3.6 (lab-h12.css'te)
     · Tarama çizgisi 4 → 5 birim (aşağıda, ArtKimlik içinde)
   İkisi de mavinin beyaz konturların arasında ayakta kalması için. Bunu bir
   renk numarasıyla (ikinci bir aksan rengi eklemek, maviyi parlatmak) çözmek
   paletin kuralını bozardı; çizgi ağırlığı en dürüst çözüm.

   HİÇBİR ÇİZİM KENDİ RENGİNİ BİLMİYOR — bütün boyalar lab-h12.css'ten geliyor.
   Sınıfların anlamı şu:
     .h12-sur / .h12-sur-f   ön plandaki nesne · BEYAZ kontur
     .h12-sur-q              ikincil düzlem    · gri kontur
     .h12-sur-b              en uzak düzlem    · sönük kontur
     .h12-ink…dim / rule     iç işaretler      · ASLA beyaz
     .h12-solid / -2         katı açık yüzey   · yalnızca mühür
     .h12-far / -2           uzak kütle        · yalnızca banka cephesi
     .h12-act / act2 / well  olay              · mavi
     .h12-paper              döngünün tek dolu beyazı · yalnızca lisans izi */

/* 1 · KARAR — üç seçenekli bir liste ve üstünde gezinen seçim.
   BEYAZ: üç satırın konturu ve seçim düğmelerinin halkası. Liste bu sahnenin
   nesnesi, o yüzden hattı en parlak bant.
   GRİ: üstteki soru çubuğu (.h12-ink) ve satır içindeki etiketler (.h12-dim).
   Etiketler kasten sessiz — çizimdeki en kalabalık öğe onlar, bir kademe
   yukarı çekilseler çizim gri bir metin bloğuna dönerdi.
   MAVİ: seçilen satırın tamamı. Burası kararın en zor yeriydi. İki beyaz
   konturlu boş satırın yanına mavi bir KONTUR koymak yetmezdi — beyazdan
   sönük kalıp "seçilmemiş" gibi okunurdu. O yüzden seçim DOLU bir kütle:
   kadrajdaki tek dolu ve tek renkli parça o. Boşun yanındaki dolu, parlağın
   yanındaki sönükten daha güçlü bir işaret. */
function ArtKarar() {
  const rows = [66, 152, 238];
  const bars = [196, 158, 216];
  return (
    <svg className="h12-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      {/* Sorunun kendisi. Sahnenin tek .h12-ink'i: belge başlığı rolündeki
          çubuk sahne başına bir tane, yoksa "en parlak dolu şey" ayrımı
          dağılır. */}
      <rect className="h12-ink" x="30" y="26" width="150" height="11" rx="5.5" />
      {rows.map((y, i) => (
        <g key={y}>
          <rect className="h12-sur" x="30" y={y} width="380" height="68" rx="16" />
          <circle className="h12-ring" cx="64" cy={y + 34} r="13" />
          <rect className="h12-dim" x="94" y={y + 29} width={bars[i]} height="10" rx="5" />
        </g>
      ))}
      {/* Seçim ayrı bir katman ve alttaki satırı TAMAMEN örtüyor: hangi satıra
          kaydığı önemsiz, satırların genişlik farkı görünmüyor. Duran hâli
          ortadaki satır — bir seçim yapılmış olarak kalıyor. */}
      <g className="h12-pick">
        <rect className="h12-well" x="30" y="66" width="380" height="68" rx="16" />
        <circle className="h12-act" cx="64" cy="100" r="13" />
        <circle className="h12-punch" cx="64" cy="100" r="4.6" />
        <rect className="h12-act2" x="94" y="95" width="196" height="10" rx="5" />
      </g>
    </svg>
  );
}

/* 2 · TESCİL — yelpaze gibi açılmış bir dosya, önündeki sayfada imza
   çiziliyor.
   BEYAZ: yalnızca öndeki sayfanın konturu, ve bir tık kalın (1.7). Arkadaki
   iki kağıt gri kademede — H11'de derinliği DOLGU kademesi taşıyordu (arka en
   koyu, ön en açık), burada KONTUR kademesi taşıyor. Bu inversiyonun en temiz
   kazancı: dolgu farkı koyu zeminde 4-5 birim oynayabiliyordu ve zar zor
   görünüyordu, kontur farkı (#5e5e5e / #9e9e9e / #ffffff) tartışmasız.
   GRİ: sayfa başlığı ve gövde satırları. İmza çizgisi en sönük (.h12-rule):
   boş satır imzayla yarışmamalı.
   MAVİ: ayraç ve imza. İkisi aynı eylemin parçası — "işlem gören sayfa" ve
   "o sayfaya atılan imza". İmza artık 3.6 kalınlığında, çünkü 3.2'de sayfanın
   kendi beyaz konturuyla aynı ağırlığa düşüyordu. */
function ArtTescil() {
  return (
    <svg className="h12-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <g transform="rotate(-10 187 180)">
        <rect className="h12-sur-b" x="76" y="48" width="222" height="264" rx="15" />
      </g>
      <g transform="rotate(-4.5 217 175)">
        <rect className="h12-sur-q" x="104" y="40" width="226" height="270" rx="15" />
      </g>
      <g transform="rotate(1.5 246 171)">
        <rect className="h12-sur-f" x="130" y="30" width="232" height="282" rx="15" />
        <rect className="h12-act" x="318" y="18" width="15" height="46" rx="4" />
        <rect className="h12-ink" x="158" y="64" width="112" height="13" rx="6.5" />
        <rect className="h12-dim" x="158" y="100" width="162" height="9" rx="4.5" />
        <rect className="h12-dim" x="158" y="122" width="136" height="9" rx="4.5" />
        <rect className="h12-dim" x="158" y="144" width="148" height="9" rx="4.5" />
        {/* Çizgi önce, imza sonra: boş bir imza satırı "burada bir imza
            bekleniyor" diyor, imza gelince nereye atıldığı belli oluyor. */}
        <rect className="h12-rule" x="158" y="264" width="158" height="2" rx="1" />
        <path
          className="h12-sign"
          d="M160 254 c11 -24 20 11 31 -7 c9 -15 18 15 29 0 c9 -13 18 11 26 -2 c7 -11 15 7 24 -2"
        />
      </g>
    </svg>
  );
}

/* 3 · LİSANS — inen mühür ve bıraktığı iz. Döngünün en parlak sahnesi ve
   mürekkep bütçesinin tepe noktası: %10,5 duruyorken, mühür inerken %12,6.
   Ortalamanın (%7,3) belirgin üstünde ve bu bilerek — beş sahnenin hepsi aynı
   parlaklıkta olsaydı hiçbiri bir şey söylemezdi.
   BEYAZ DOLU: yalnızca iz. Kartın tamamında saf beyazla dolu tek şekil bu.
   Ticaret lisansı bu sürecin gerçek çıktısı ve onu düzenleyen taraf biz
   değiliz; doluluk o "dışarıdan gelen onay"ın işareti oluyor.
   GRİ KONTUR: büyük panel bilerek .h12-sur-q. Beyaz konturlu olsaydı 376×252
   birimlik bir beyaz çerçeve, içindeki 132×58'lik dolu izin tekliğini
   yutardı — sahnenin öznesi panel değil, izin kendisi.
   TONLU KATI: mühür konturla değil tonla çiziliyor. Dört parçası birbirine
   değiyor; her birine kontur verilseydi temas yerlerinde çift çizgi çıkar,
   alet bir şemaya dönerdi. Tonlu kütle ALET gibi okunuyor. Duran hâlinde
   mühür yok (CSS'te opacity 0) — sahnenin tamamlanmış resmi "kağıt + iz",
   ve bu sayede o açık tonlar bütçede kalıcı bir kalem değil.
   MAVİ: kalkan. Soyut, gerçek bir kurumun amblemi değil — sahte resmî işaret
   bu sayfada yalan olurdu, ve beyazlaşan bir çizimde o yalan daha da inandırıcı
   görünürdü. */
function ArtLisans() {
  return (
    <svg className="h12-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <rect className="h12-sur-q" x="32" y="44" width="376" height="252" rx="20" />
      <rect className="h12-well-soft" x="62" y="74" width="48" height="48" rx="13" />
      <path
        className="h12-act"
        d="M86 84.56 l13.44 5.28 v10.56 c0 7.68 -5.76 12.96 -13.44 15.36 c-7.68 -2.4 -13.44 -7.68 -13.44 -15.36 v-10.56 Z"
      />
      <rect className="h12-ink" x="126" y="88" width="124" height="14" rx="7" />
      <rect className="h12-dim" x="62" y="152" width="180" height="9" rx="4.5" />
      <rect className="h12-dim" x="62" y="178" width="136" height="9" rx="4.5" />
      <rect className="h12-dim" x="62" y="204" width="160" height="9" rx="4.5" />
      <rect className="h12-dim" x="62" y="230" width="104" height="9" rx="4.5" />

      {/* İz hafif eğik: elle basılmış bir mühür hiçbir zaman tam düz olmuyor,
          ve o küçük eğrilik çizimi "grafik" olmaktan çıkarıp nesne yapıyor.
          Üst kenarı (y=196) mührün en aşağıdaki hâliyle birebir hizalı. */}
      <g className="h12-print" transform="rotate(-3 310 225)">
        <rect className="h12-paper" x="244" y="196" width="132" height="58" rx="11" />
        <rect className="h12-paper-ink" x="264" y="214" width="70" height="10" rx="5" />
        <rect className="h12-paper-dim" x="264" y="232" width="48" height="8" rx="4" />
      </g>
      {/* Tokmak, boyun, taban, keçe. Taban tokmaktan belirgin şekilde geniş
          olmak zorunda, yoksa şekil mühür değil halter gibi okunuyor. Ton
          sırası H11'dekiyle aynı (tokmak en açık, taban ikinci, boyun ve keçe
          gölgede) — yalnızca bütün kademe yukarı taşındı. */}
      <g className="h12-stamp">
        <rect className="h12-solid" x="282" y="60" width="56" height="24" rx="12" />
        <rect className="h12-ink3" x="298" y="84" width="24" height="24" />
        <rect className="h12-solid-2" x="244" y="108" width="132" height="32" rx="7" />
        <rect className="h12-ink3" x="250" y="140" width="120" height="7" rx="3" />
      </g>
    </svg>
  );
}

/* 4 · KİMLİK — parmak izi plakası, üstünden geçen tarama ve arkada kimlik
   kartı. Beyaz çizim kararının en çok kazandırdığı sahne bu: siyah zeminde
   beyaz bir parmak izi, kartın tamamındaki en akılda kalıcı kare.
   BEYAZ: plakanın konturu ve sırtlar. Sırtlar #ffffff değil #e2e2e2, çünkü
   3.4 birim kalınlıkta bir çizgi 1.5 birimlik konturun iki katından fazla alan
   kaplıyor ve saf beyazda parlıyor. Bir ton kısmak sırtları beyaz olmaktan
   çıkarmıyor, üstünden geçen mavi taramaya nefes bırakıyor.
   GRİ: kimlik kartı ikincil düzlem (.h12-sur-q) — sahnenin konusu kartın
   kendisi değil, kartı almak için bizzat orada bulunma zorunluluğu.
   MAVİ: yalnızca tarama. H11'de bu sahnede İKİ mavi vardı (sırtlar kısık
   mavi, tarama parlak mavi); sırtlar beyaza geçtiği için sahne ikinci
   maviden kurtuldu ve tarama tek olay işareti olarak güçlendi. Ölçümde bu
   sahnedeki mavi piksel oranı %4,2'den %0,7'ye düşüyor — sayı düştü ama
   belirsizlik de düştü: artık "şu an olan şey"in hangisi olduğu sorulmuyor.
   Beş sahne içinde mavinin en az yer kapladığı sahne bu ve olması gereken de
   bu, çünkü buradaki iş bir tarama, bir belge doldurma değil. Yine de beyaz
   sırtların üstünden geçtiği için 4 birimden 5'e çıkarıldı — "nesne beyaz,
   olay mavi" ayrımı okunaklı kalsın diye.
   Sırtların geometrisi H11'den aynen geliyor; oradaki uzun ders (uçlar içe
   kıvrılmazsa şekil kemer gibi okunuyor) burada da aynen geçerli, hatta beyaz
   çizgide daha kritik: kısık gri bir şekli göz "parmak izi olmalı" diye
   tamamlıyordu, beyaz bir şekli gördüğü gibi okuyor. */
function ArtKimlik() {
  return (
    <svg className="h12-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <defs>
        {/* Kırpma yolunun kimliği h11'den ayrı: iki aday aynı lab sayfasında
            yan yana render ediliyor ve aynı id iki kez DOM'a girerse tarayıcı
            ilkine bağlanır, ikinci kartın tarama çizgisi yanlış yerde kırpılır. */}
        <clipPath id="h12Plate">
          <rect x="30" y="58" width="204" height="224" rx="28" />
        </clipPath>
      </defs>
      <rect className="h12-sur" x="30" y="58" width="204" height="224" rx="28" />
      <g className="h12-ridge" fill="none" strokeLinecap="round" strokeWidth="3.4">
        <path d="M74 246 C52 224 46 190 50 158 C58 106 92 76 132 76 C172 76 206 106 214 158 C218 190 212 224 190 246" />
        <path d="M88 250 C72 228 66 196 70 168 C78 122 100 96 132 96 C164 96 186 122 194 168 C198 196 192 228 176 250" />
        <path d="M102 248 C92 226 88 200 92 176 C100 140 112 118 132 118 C152 118 164 140 172 176 C176 200 172 226 162 248" />
        <path d="M114 242 C108 222 106 200 110 182 C116 154 122 140 132 140" />
        <path d="M140 141 C150 148 156 164 160 184 C164 204 162 224 156 240" />
        <path d="M124 218 C120 200 122 178 132 172 C142 178 146 196 144 212" />
      </g>
      {/* Tarama çizgisi kırpma yolunun içinde: plakanın yuvarlak köşelerinden
          taşmıyor, yani ışık gerçekten camın üstünde geziyor gibi duruyor. */}
      <g clipPath="url(#h12Plate)">
        <rect className="h12-scan" x="30" y="70" width="204" height="5" />
      </g>

      <rect className="h12-sur-q" x="254" y="104" width="160" height="124" rx="15" />
      {/* Fotoğraf bloğu koyu, üstündeki figür açık. H11'de tersiydi (ikisi de
          koyu griydi ve figür bloktan zar zor ayrılıyordu); açık mürekkep
          bandına geçince figürü bloktan AÇIK yapmak bedava bir okunurluk. */}
      <rect className="h12-dim" x="272" y="122" width="46" height="62" rx="8" />
      <circle className="h12-ink2" cx="295" cy="143" r="10" />
      <path className="h12-ink2" d="M278 176 c0 -11 8 -17 17 -17 c9 0 17 6 17 17 Z" />
      <rect className="h12-ink2" x="330" y="128" width="62" height="10" rx="5" />
      <rect className="h12-dim" x="330" y="149" width="50" height="7" rx="3.5" />
      <rect className="h12-dim" x="330" y="164" width="40" height="7" rx="3.5" />
      <rect className="h12-dim" x="272" y="198" width="124" height="8" rx="4" />
    </svg>
  );
}

/* 5 · BANKA — dosya kuruma doğru kayıyor ve orada duruyor.
   BEYAZ: yalnızca dosyanın konturu. Sahnenin öznesi bizim hazırladığımız
   dosya; kurum onun gittiği yer.
   EN KOYU KÜTLE: cephe (.h12-far / .h12-far2). Bu sahnede en çok düşünülen
   karar buydu. Cephe 16.700 birimlik bir alan — açık mürekkep bandına
   alınsaydı kadrajın yarısı gri bir bina olur, göz önce oraya giderdi ve
   "kararı banka veriyor" cümlesi çizimde "banka her şeydir"e dönerdi. H11'de
   de cephe dosyadan koyuydu ve aynı sebeple; burada fark büyütüldü, çünkü
   dosya beyaz konturla çok daha öne çıktı ve cephe onunla aynı yönde
   parlatılsaydı denge bozulurdu.
   MAVİ: dosyadaki tek satır — bizim tamamladığımız kısım. Yeşil tik ya da
   onay işareti OLAMAZ; onaylanan hiçbir şey yok, tamamlanan yalnızca hazırlık.
   Bekleyen üç nokta bunu bir kez daha söylüyor: bekleme işareti, onay
   işareti değil. */
function ArtBanka() {
  return (
    <svg className="h12-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <path className="h12-far" d="M248 112 L334 64 L420 112 Z" />
      <rect className="h12-far" x="248" y="112" width="172" height="14" rx="3" />
      <rect className="h12-far2" x="264" y="134" width="26" height="94" rx="3" />
      <rect className="h12-far2" x="326" y="134" width="26" height="94" rx="3" />
      <rect className="h12-far2" x="388" y="134" width="26" height="94" rx="3" />
      <rect className="h12-far" x="240" y="228" width="188" height="15" rx="4" />

      <g className="h12-slide">
        <rect className="h12-sur-f" x="28" y="88" width="180" height="142" rx="15" />
        <rect className="h12-ink" x="50" y="112" width="90" height="13" rx="6.5" />
        <rect className="h12-dim" x="50" y="140" width="114" height="9" rx="4.5" />
        <rect className="h12-dim" x="50" y="162" width="86" height="9" rx="4.5" />
        <rect className="h12-act" x="50" y="186" width="66" height="9" rx="4.5" />
      </g>

      <g className="h12-wait">
        <rect className="h12-sur-q" x="28" y="250" width="112" height="34" rx="17" />
        <circle className="h12-ink2" cx="56" cy="267" r="5.5" />
        <circle className="h12-ink2" cx="84" cy="267" r="5.5" />
        <circle className="h12-ink2" cx="112" cy="267" r="5.5" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ içerik */
/* H11 ile birebir aynı. Tek harf değişmedi ve değişmemeliydi: bu tur sorulan
   soru "metin doğru mu" değil, "çizim beyaz olunca daha mı iyi". İçerik de
   oynasaydı iki kart iki ayrı öneri olurdu.
   Beş aşama, countryContent.dubai.steps'teki yedi adımın sıkıştırılmış hâli;
   ilk üç adım tek aşamada toplandı, çünkü üçü de aynı görüşmede kapanıyor. */
const STAGES: Stage[] = [
  {
    key: "karar",
    word: "Karar",
    meta: "Ad, faaliyet ve kuruluş tipi birlikte belirleniyor.",
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
    /* STANCE_LIMITS 2'nin cümleyle söylenen yarısı: takvim bizde değil. */
    meta: "Ticaret lisansını otorite düzenliyor, takvim onlarda.",
    who: "otorite",
    art: <ArtLisans />,
  },
  {
    key: "kimlik",
    word: "Kimlik",
    /* FACTS.dubai.limit ile aynı gerçek, uyarı tonu olmadan. */
    meta: "Biyometri ve Emirates ID; bu aşama için bir kez BAE'de.",
    who: "siz",
    art: <ArtKimlik />,
  },
  {
    key: "banka",
    word: "Banka",
    /* STANCE_LIMITS 1 birebir. "Hesap açılıyor" DEĞİL. */
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

export default function HeroH12() {
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
     sahnenin çizimi zaten tamamlanmış hâlde (seçim yapılmış). İlerletmek
     isteyen şeride basıyor.
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
      className="h12"
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
      <div className="h12-stage" aria-hidden="true">
        {STAGES.map((s, i) => (
          <div key={s.key} className="h12-scene" data-on={i === active}>
            {s.art}
          </div>
        ))}
      </div>

      {/* ---- sahnedeki aşamanın adı ---- */}
      {/* Beş metin de DOM'da, mutlak konumla üst üste: aşama değişince kartın
          altı zıplamıyor ve "Karar" ile "Kimlik" arasındaki genişlik farkı
          hizayı bozmuyor. */}
      <div className="h12-say">
        {STAGES.map((s, i) => (
          <div key={s.key} className="h12-c" data-on={i === active} aria-hidden={i !== active}>
            <span className="h12-head">
              <b className="h12-word">{s.word}</b>
              <em className="h12-who" data-who={s.who}>
                {WHO_LABEL[s.who]}
              </em>
            </span>
            <span className="h12-meta">{s.meta}</span>
          </div>
        ))}
      </div>

      {/* ---- şerit: hem ilerleme hem kumanda ---- */}
      <div className="h12-rail">
        {STAGES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className="h12-step"
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
          sonuç; yalnızca gördüğünüz şeyin ne olduğunu ve devamının nerede
          olduğunu söylüyor. */}
      <p className="h12-foot">
        <Waypoints size={14} strokeWidth={2} aria-hidden="true" />
        <span>Beş aşama, gerçekleşme sırasıyla. Adımların tamamı aşağıda.</span>
      </p>
    </motion.div>
  );
}
