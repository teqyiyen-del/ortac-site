"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PanelsTopLeft } from "lucide-react";

/* ============================================================================
   DUBAI HERO KARTI — ADAY H9 · "SAHNE"

   H6'nın dikey ve büyük hâli. Mekanik aynı: sırası gelen aşama kartı sahneye
   geliyor, beyazlıyor, kendi çizimini bir kez oynatıyor, işi bitince çıkıyor.
   Değişen iki şey var ve ikisi de müşterinin H6 üzerine söylediği iki cümlenin
   karşılığı.

   ------------------------------------------------------- BİRİNCİ DÜZELTME
   "Öndeki beyaz kart, arkadan gelen kartla aynı alanı kaplıyor, o biraz
   mantıksız, boşa ölü alan ayırmış oluyoruz."

   H6'da sahnedeki kart şeridin %46'sıydı; kalan %54'te aynı boydaki iki koyu
   kart bekliyordu. Yani ekranın yarısından fazlası, henüz okunmayacak bir
   şeyin ölçüsünü göstermek için ayrılmıştı. Sıradaki kartın anlattığı tek şey
   "arkadan biri daha geliyor" — bu cümleyi söylemek için kartın TAMAMINI
   göstermeye gerek yok, KENARI yetiyor.

   Bu kartta sahne tek bir kartındır. Sıradaki iki aşama sahnenin sağ ucunda
   yalnızca birer dilim: 16px ve 14px. Üst üste binmiş kağıtların yandan
   görünen kenarı gibi — bir yığın olduğunu söylüyorlar, ne oldukları hakkında
   hiçbir şey söylemiyorlar (zaten söylememeliler; sahne aynı anda tek şey
   gösteriyor, kartın bütün fikri bu). Sıradaki dilimler bir tık kısa: yığının
   arkaya doğru gittiği, boy farkıyla okunuyor.

   Kazanılan alan doğrudan çizime gitti. H6'da çizim 230×140'lık bir kutuya
   sığıyordu; burada aynı beş sahne 460×404'te, yani dört katından geniş bir
   alanda çiziliyor. Aynı şeyi anlatan çizimler, okunması için gözün
   yaklaşmasını gerektirmeyen ölçüde.

   ------------------------------------------------------- İKİNCİ DÜZELTME
   "Şu an çok yatay bir tarzı var, bizim heroda buna ayrılacak alan biraz daha
   DİKEY olacak, biraz daha nefes aldırabilirsin."

   H6 yatay bir şeritti; şerit dar bir bantta yaşar, altındaki metin de o
   bandın altına sıkışır. Burada düzen dikey: kartın üst üçte ikisi sahne, alt
   üçte biri söz. Sahne 5:4 oranında (yani genişliğine bağlı, sabit piksel
   değil) — kart 520 ile 580 arasında hangi genişliğe düşerse düşsün sahnenin
   oranı ve dolayısıyla çizimin kompozisyonu bozulmuyor.

   Beş çizimin hepsi bu yeni orana göre YENİDEN kuruldu, H6'nınkiler
   büyütülmedi. Sebebi basit: 230×140'lık bir kompozisyon (yatay yerleşim,
   yan yana duran nesneler) 460×404'e uzatıldığında ortada boşluk kalıyor.
   Nesneler bu sefer üst üste diziliyor — tarayıcının altında kimlik kartı,
   kurumun altında dosya, belgenin üstünde inen mühür.

   Ray duruyor ama yer kaplamıyor: 12px'lik beş nokta ve altlarında beşer
   kelime, toplam 32px. Sahne "şu an ne oluyor", ray "kaç aşama var, hangisi".
   Ray aynı zamanda kartın tek etkileşimi.

   ÖLÇÜLEN YÜKSEKLİK (tarayıcıda, hero'nun hedef aralığında):
     520px genişlikte 613px · 560'ta 645px · 580'de 661px.
   Yani kart hedeflenen 560-680 bandının içinde kalıyor ve genişlik değişince
   yüksekliği oranla değişiyor — sahne dışındaki her şey (söz, ray, alt satır)
   sabit 222px, oynayan tek şey sahnenin kendisi.

   ------------------------------------------------------------------ SINIRLAR
   - Gün sayısı yok, fiyat yok. Süre yerine SIRA var.
   - Banka aşaması onay vaadi vermiyor: dosya bizde hazır, karar bankada
     (STANCE_LIMITS 1). Çizimdeki bekleyen üç nokta bunu yazıdan önce söylüyor.
   - Lisans aşamasının satırı takvimin bizde olmadığını söylüyor
     (STANCE_LIMITS 2).
   - Metin bütçesi 8: 5 ray kelimesi + aktif başlık + aktif alt satır + kartın
     alt cümlesi. Kim etiketi (Siz / Ortac / Otorite) rozet, satır değil.
   - Çizimlerde harf, uydurma numara, sahte resmî amblem yok. Hepsi siluet.
   - <768px kart gizli; hero telefonda metinle taşınıyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Bir sahnenin ekranda kalma süresi. Kartın sahneye oturması 760ms, kendi
   mikro hareketi ~2.4s sürüyor; 4s hem hareketin bitmesine hem de resmin bir
   an dinlenmesine yetiyor. Daha kısası sahneyi telaşlı, daha uzunu kartı ölü
   gösteriyor. Çizim H6'dakinden büyük ama süre aynı kaldı — büyüyen çizim
   daha uzun bakılmayı değil, daha kolay okunmayı sağlıyor. */
const DWELL_MS = 4000;
/* Son aşama bir tık daha duruyor: ray dolmuş, süreç bitmiş — o hâlin bir
   nefeslik görülmesi gerekiyor, yoksa başa dönüş bir kaza gibi geliyor. */
const LAST_MS = 5000;
/* Başa dönüşün iki adımı. Yığın kendi kendini toparlıyor (modülo konum),
   sıfırlanan tek şey ray: önce ray sönüyor, sönükken başa dönülüyor, sonra
   geri yanıyor. İkinci sayı birincisinden büyük olmak zorunda — dönüş ray
   görünürken yapılırsa dolgu geri kayıyor ve ilerleme geri alınmış gibi
   okunuyor. */
const REWIND_MS = 300;
const RELIGHT_MS = 350;

type Who = "siz" | "ortac" | "otorite";

type Stage = {
  key: string;
  /** rayda duran tek kelime — sürecin "içindekiler" satırı */
  word: string;
  title: string;
  /** aşamanın şartı ya da sahibi; tek kısa satır */
  meta: string;
  who: Who;
  art: React.ReactNode;
};

/* --------------------------------------------------------------- çizimler */
/* Beşi de aynı 460×404 kutuda. Oran tesadüf değil: sahne 5:4, kartın sağında
   sıradakiler için 44px ayrılıyor, geriye kalan alanın oranı 1.14 — viewBox
   tam olarak o. Böylece çizim kartın içinde ne esniyor ne de iki yanında
   görünür bir pay bırakıyor.

   SİLUETLER BİRBİRİNE BENZEMİYOR: form, yelpaze, belge+mühür, tarayıcı,
   cephe. Fark kasıtlı — hangi aşamada olduğumuz metin okunmadan, sadece
   kompozisyondan anlaşılsın. Yeni orana geçerken korunan şey bu ayrım oldu;
   nesnelerin yerleşimi ise baştan kuruldu, çünkü yatay bir kompozisyonu
   dikey bir kutuya uzatmak ortada boşluk bırakıyor.

   Her çizimin DURAN hâli tamamlanmış hâlidir (seçim yapılmış, imza atılmış,
   mühür basılmış, dosya teslim edilmiş). Animasyon o tamamlanmış hâle
   GİDİYOR; hareket kapatıldığında geriye eksik bir kare değil, bitmiş bir
   resim kalıyor. */

/* 1 · KARAR — üç seçenekli bir form ve üstünde gezinen seçim.
   Kuruluş tipinin gerçekten üç seçenekli olması (serbest bölge / mainland /
   offshore) çizimi uydurma olmaktan çıkarıyor: liste, sayfanın kendi
   içeriğinin şekli. Dikey kutuda satırlar iri ve aralıklı — H6'da üç ince
   çubuktu, burada üç gerçek seçenek satırı. */
function ArtKarar() {
  const rows = [108, 184, 260];
  const bars = [196, 156, 224];
  return (
    <svg className="h9-art" viewBox="0 0 460 404" aria-hidden="true" focusable="false">
      <rect x="34" y="44" width="152" height="17" rx="8.5" fill="#1c1c1c" />
      <rect x="198" y="47.5" width="78" height="10" rx="5" fill="#e6e6e6" />
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="34" y={y} width="392" height="64" rx="14" fill="#f5f5f5" />
          <circle cx="70" cy={y + 32} r="14" fill="#ffffff" stroke="#dcdcdc" strokeWidth="2" />
          <rect x="104" y={y + 25} width={bars[i]} height="13" rx="6.5" fill="#e0e0e0" />
        </g>
      ))}
      {/* Seçim, satırların üstüne oturan ayrı bir katman: alttaki satırı
          tamamen örtüyor, o yüzden hangi satıra kaydığı önemli değil —
          genişlik farkları görünmüyor. Duran hâli ortadaki satır. */}
      <g className="h9-pick">
        <rect
          x="34"
          y="108"
          width="392"
          height="64"
          rx="14"
          fill="#e8f1fd"
          stroke="#307fe2"
          strokeWidth="2"
        />
        <circle cx="70" cy="140" r="14.5" fill="#307fe2" />
        <circle cx="70" cy="140" r="5.4" fill="#ffffff" />
        <rect x="104" y="133" width="196" height="13" rx="6.5" fill="#a9cdf5" />
      </g>
      {/* Formun altı: ayraç çizgisi, bir alt satır ve bir düğme silueti.
          Süs değil ölçü işi — üç satır kutunun üst üçte ikisinde bittiği için
          alt kenar boş kalıyor ve kompozisyon tepeye yığılmış görünüyordu. */}
      <rect x="34" y="336" width="392" height="1.5" rx="0.75" fill="#ececec" />
      <rect x="34" y="352" width="180" height="12" rx="6" fill="#ededed" />
      <rect x="330" y="344" width="96" height="28" rx="14" fill="#f0f0f0" />
    </svg>
  );
}

/* 2 · TESCİL — yelpaze gibi açılmış bir dosya, önündeki sayfada imza
   çiziliyor. Sayfalar bu kutuda DİKEY (262×306): H6'da yatay bir dosya
   vardı, dikey kutuda aynı yatay dosya kutunun ortasında yüzüyordu.
   Ayakta duran bir dosya hem kutuyu dolduruyor hem de gerçek bir kuruluş
   dosyasının biçimine daha yakın. */
function ArtTescil() {
  return (
    <svg className="h9-art" viewBox="0 0 460 404" aria-hidden="true" focusable="false">
      {/* Arkadaki iki sayfa kasten kademeli koyu: #ffffff bir kartın üstünde
          #f7f7f7 neredeyse görünmüyordu ve yelpaze tek bir sayfa gibi
          okunuyordu. Kağıt üstünde kağıt ancak tonla ayrışıyor. */}
      <g transform="rotate(-8 170 200)">
        <rect x="62" y="68" width="250" height="286" rx="14" fill="#eaeaea" stroke="#dedede" />
      </g>
      <g transform="rotate(-3.6 190 196)">
        <rect x="92" y="56" width="252" height="290" rx="14" fill="#f3f3f3" stroke="#e2e2e2" />
      </g>
      <g transform="rotate(1.4 246 200)">
        <rect x="124" y="44" width="262" height="306" rx="14" fill="#ffffff" stroke="#dedede" />
        {/* mavi ayraç: dosyanın "işlem gören" sayfası. Tek mavi kütle, göz
            önce oraya gidiyor, imza da onun altındaki sayfada atılıyor. */}
        <rect x="344" y="28" width="22" height="64" rx="4" fill="#307fe2" />
        <rect x="150" y="84" width="128" height="17" rx="8.5" fill="#1c1c1c" />
        <rect x="150" y="124" width="196" height="11" rx="5.5" fill="#e8e8e8" />
        <rect x="150" y="148" width="172" height="11" rx="5.5" fill="#e8e8e8" />
        <rect x="150" y="172" width="184" height="11" rx="5.5" fill="#e8e8e8" />
        <rect x="150" y="196" width="144" height="11" rx="5.5" fill="#e8e8e8" />
        <rect x="150" y="300" width="190" height="2" rx="1" fill="#e2e2e2" />
        {/* İmza, çizgiyi neredeyse baştan sona kaplıyor (144 birim / 190
            birimlik satır). İlk sürümde daha kısaydı ve büyük sayfanın
            üstünde bir paraf gibi duruyordu; imza bir eylemin izi, sayfayı
            boydan boya geçmesi gerekiyor. */}
        <path
          className="h9-sign"
          d="M152 292 c16 -34 27 16 43 -7 c13 -19 25 20 38 1 c11 -17 22 15 34 -1 c9 -13 19 9 29 -3"
          fill="none"
          stroke="#307fe2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/* 3 · LİSANS — inen mühür. Mühür burada bir NESNE değil bir EYLEM: iniyor,
   iz bırakıyor, yerine dönüyor. İz daire değil dikdörtgen; yuvarlak mühür
   fazla "resmî damga" taklidi oluyor, dikdörtgen iz ise sadece bir iz. */
function ArtLisans() {
  return (
    <svg className="h9-art" viewBox="0 0 460 404" aria-hidden="true" focusable="false">
      <rect x="44" y="52" width="372" height="300" rx="16" fill="#f7f7f7" stroke="#e6e6e6" />
      {/* Sol üstteki kalkan: belgenin resmî olduğunu söyleyen tek işaret.
          Gerçek bir kurumun amblemi değil — soyut bir otorite işareti, çünkü
          gerçek bir arma taklidi bu sayfada yalan olurdu. */}
      <rect x="72" y="82" width="44" height="44" rx="12" fill="#e8f1fd" />
      <path
        d="M94 88 l12 4.6 v9.4 c0 6.8 -5.1 11.5 -12 13.6 c-6.9 -2.1 -12 -6.8 -12 -13.6 v-9.4 Z"
        fill="#307fe2"
      />
      <rect x="132" y="92" width="132" height="18" rx="9" fill="#1c1c1c" />
      <rect x="132" y="118" width="86" height="11" rx="5.5" fill="#e2e2e2" />
      <rect x="72" y="168" width="196" height="12" rx="6" fill="#e6e6e6" />
      <rect x="72" y="196" width="152" height="12" rx="6" fill="#e6e6e6" />
      <rect x="72" y="224" width="174" height="12" rx="6" fill="#ededed" />
      <rect x="72" y="252" width="116" height="12" rx="6" fill="#ededed" />
      {/* İz hafif eğik: elle basılmış bir mühür hiçbir zaman tam düz olmuyor,
          ve o küçük eğrilik çizimi "grafik" olmaktan çıkarıp nesne yapıyor. */}
      <g className="h9-print" transform="rotate(-3 320 296)">
        <rect
          x="250"
          y="266"
          width="140"
          height="62"
          rx="12"
          fill="#e8f1fd"
          stroke="#307fe2"
          strokeWidth="2.2"
        />
        <rect x="270" y="282" width="76" height="11" rx="5.5" fill="#307fe2" />
        <rect x="270" y="302" width="50" height="9" rx="4.5" fill="#7fb3f0" />
      </g>
      {/* Mühür üç parça: dar sap, ince boyun, GENİŞ taban. Oran önemli — ilk
          denemede sap tabanla neredeyse aynı genişlikteydi ve şekil mühür
          değil HALTER gibi okunuyordu. Bir mührü mühür yapan şey tabanın
          sapa göre iri olması.
          Dikey yerleşim izin konumundan geriye hesaplandı: basınca 26px
          iniyor ve tabanın alt kenarı izin üst kenarına (y=266) 2px biniyor.
          Hazırlık için 14px kalktığında sapın üstü belgenin içinde kalıyor.
          Üç sayı birbirine bağlı: -14 / +26 / taban y=208. Biri değişirse
          ötekiler de değişmeli. Yatayda üçü de izin merkezine (x=320)
          hizalı, yoksa mühür kendi izinin yanına basıyor gibi duruyor. */}
      <g className="h9-stamp">
        <rect x="284" y="152" width="72" height="26" rx="13" fill="#1c1c1c" />
        <rect x="305" y="178" width="30" height="30" fill="#2c2c2c" />
        <rect x="254" y="208" width="132" height="34" rx="8" fill="#1c1c1c" />
      </g>
    </svg>
  );
}

/* 4 · KİMLİK — parmak izi ve üstünden geçen tarama, altında Emirates ID.
   Bu aşamanın konusu kartın kendisi değil, kartı almak için bizzat orada
   bulunma zorunluluğu (FACTS.dubai.limit) — o yüzden ağırlık merkezi
   tarayıcıda, kart ikinci planda ve altta duruyor. Dikey kutunun en doğal
   kullanıldığı sahne bu: iki nesne yan yana değil, üst üste. */
function ArtKimlik() {
  return (
    <svg className="h9-art" viewBox="0 0 460 404" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="h9Plate">
          <rect x="116" y="34" width="228" height="206" rx="28" />
        </clipPath>
      </defs>
      <rect x="116" y="34" width="228" height="206" rx="28" fill="#f5f5f5" stroke="#e6e6e6" />
      {/* Parmak izi, ilmek deseni. H6'daki çizim büyütülünce GÖKKUŞAĞI gibi
          okunuyordu ve büyük kutuda kusur daha da belli oluyordu; buradaki
          desen o yüzden baştan çizildi. Bir yay yığınını parmak izinden
          ayıran iki şey var ve ikisi de burada:
            · KAPALI ÇEKİRDEK — ortadaki ilmek kendi üstüne dönüyor, yani
              desenin bir merkezi var. Kemerde merkez yoktur.
            · ALT PARÇALAR — sırtlar altta boşlukta bitmiyor, iki kopuk yay
              siluetin altını kapatıyor. Parmak ucunun yastığı böyle oluşuyor;
              bu iki yay olmadan şekil hâlâ bir kemer.
          Bir de sol alta "delta" çatalı konmuştu ve çıkarıldı: bu ölçekte
          deseni zenginleştirmiyor, kağıdın üstünde bir çizik gibi duruyordu.
          Kalınlık 3: 136px genişliğindeki bir desende sırtlar arası ~14px,
          daha kalını sırtları birbirine yapıştırıyor. */}
      <g fill="none" stroke="#307fe2" strokeLinecap="round" strokeWidth="3">
        <path d="M172 200 C160 168 162 118 190 94 C218 70 262 76 280 104 C296 130 296 174 288 202" />
        <path d="M186 204 C176 174 178 126 202 108 C226 90 256 98 268 120 C280 142 280 174 276 198" />
        <path d="M198 202 C192 176 194 142 214 128 C232 116 250 124 258 142 C264 156 264 174 262 190" />
        <path d="M212 192 C208 172 210 150 226 144 C240 139 250 150 249 164 C248 175 242 181 234 180" />
        <path d="M230 166 C234 161 241 164 240 171" />
        <path d="M182 210 C196 218 214 221 232 220" />
        <path d="M246 218 C258 216 268 212 276 206" />
      </g>
      {/* Tarama çizgisi kırpma yolunun içinde: plakanın yuvarlak köşelerinden
          taşmıyor, yani ışık gerçekten camın üstünde geziyor gibi duruyor. */}
      <g clipPath="url(#h9Plate)">
        <rect className="h9-scan" x="116" y="44" width="228" height="5" fill="#307fe2" />
      </g>
      <rect x="70" y="266" width="320" height="110" rx="14" fill="#ffffff" stroke="#e0e0e0" />
      <rect x="92" y="286" width="68" height="70" rx="9" fill="#e4e4e4" />
      <circle cx="126" cy="310" r="12" fill="#c9c9c9" />
      <path d="M106 344 c0 -13 9 -20 20 -20 c11 0 20 7 20 20 Z" fill="#c9c9c9" />
      <rect x="180" y="292" width="96" height="13" rx="6.5" fill="#1c1c1c" />
      <rect x="180" y="316" width="76" height="10" rx="5" fill="#e2e2e2" />
      <rect x="180" y="336" width="60" height="10" rx="5" fill="#e2e2e2" />
      {/* akıllı kart çipi — bir kimliği tek başına ele veren detay */}
      <rect x="316" y="306" width="48" height="36" rx="7" fill="#ededed" />
      <rect x="316" y="323" width="48" height="1.6" fill="#dcdcdc" />
      <rect x="337" y="306" width="1.6" height="36" fill="#dcdcdc" />
    </svg>
  );
}

/* 5 · BANKA — dosya kuruma doğru kayıyor ve orada duruyor. Kurum cephesi gri
   ve hareketsiz, dosya beyaz ve hareketli: yapılan işin bizde, kararın karşı
   tarafta olduğu kompozisyonla söyleniyor. Dikey kutuda kurum ÜSTTE, dosya
   ALTTA ve yukarı doğru kayıyor — H6'da yön soldan sağaydı, burada aşağıdan
   yukarı; ikisi de "bize düşen kısım bitti, sıra onlarda" diyor.
   Bekleyen üç nokta iddiayı kapatıyor: bir onay işareti değil, bir bekleme
   işareti. */
function ArtBanka() {
  return (
    <svg className="h9-art" viewBox="0 0 460 404" aria-hidden="true" focusable="false">
      <path d="M136 118 L230 44 L324 118 Z" fill="#e6e6e6" />
      <rect x="136" y="118" width="188" height="14" rx="3" fill="#dcdcdc" />
      <rect x="150" y="140" width="24" height="70" rx="2" fill="#ededed" />
      <rect x="195" y="140" width="24" height="70" rx="2" fill="#ededed" />
      <rect x="240" y="140" width="24" height="70" rx="2" fill="#ededed" />
      <rect x="285" y="140" width="24" height="70" rx="2" fill="#ededed" />
      <rect x="128" y="210" width="204" height="16" rx="5" fill="#dcdcdc" />
      <g className="h9-slide">
        <rect x="64" y="246" width="258" height="120" rx="12" fill="#ffffff" stroke="#dcdcdc" />
        <rect x="88" y="270" width="104" height="13" rx="6.5" fill="#1c1c1c" />
        <rect x="88" y="296" width="160" height="11" rx="5.5" fill="#e8e8e8" />
        <rect x="88" y="316" width="124" height="11" rx="5.5" fill="#e8e8e8" />
        {/* Son satır mavi: dosyanın bizde biten kısmı. Sahnedeki tek mavi
            kütle bu — yeşil tik ya da onay işareti olamaz, çünkü onaylanan
            hiçbir şey yok; tamamlanan yalnızca hazırlık. */}
        <rect x="88" y="336" width="84" height="11" rx="5.5" fill="#307fe2" />
      </g>
      <g className="h9-wait">
        <rect x="334" y="287" width="90" height="38" rx="19" fill="#f2f2f2" />
        <circle cx="356" cy="306" r="4.4" fill="#bdbdbd" />
        <circle cx="379" cy="306" r="4.4" fill="#bdbdbd" />
        <circle cx="402" cy="306" r="4.4" fill="#bdbdbd" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ içerik */
/* Beş aşama, countryContent.dubai.steps'teki yedi adımın sıkıştırılmış hâli —
   H6'da hangi metinler onaylandıysa aynısı. Uydurma yok, sıra değişmedi;
   yalnızca ilk üç adım tek aşamada toplandı, çünkü üçü de aynı görüşmede
   kapanan kararlar. Yedi kart bir hero'da kalabalık, beş kart ritim. */
const STAGES: Stage[] = [
  {
    key: "karar",
    word: "Karar",
    title: "Ad, faaliyet ve yapı",
    meta: "Kararlar ilk görüşmede kapanıyor",
    /* Üçü de karar; kararın sahibi ziyaretçi, biz eşleştiriyoruz. */
    who: "siz",
    art: <ArtKarar />,
  },
  {
    key: "tescil",
    word: "Tescil",
    title: "Kuruluş dosyası ve tescil",
    meta: "Ana sözleşme, başvuru ve ekleri",
    who: "ortac",
    art: <ArtTescil />,
  },
  {
    key: "lisans",
    word: "Lisans",
    title: "Ticaret lisansı",
    /* STANCE_LIMITS 2'nin çizimle değil cümleyle söylenen yarısı: takvim
       bizde değil. Bir uyarı kutusunda değil, aşamanın kendi satırında —
       orada bir kısıt değil, bir olgu. */
    meta: "Düzenleyen otorite, takvim onlarda",
    who: "otorite",
    art: <ArtLisans />,
  },
  {
    key: "kimlik",
    word: "Kimlik",
    title: "Biyometri ve Emirates ID",
    /* FACTS.dubai.limit ile aynı gerçek, uyarı tonu olmadan: beş aşamadan
       yalnızca birinde orada olmak gerekiyor. Gizlemek yerine küçültüyoruz. */
    meta: "Bu aşama için bir kez BAE'de",
    who: "siz",
    art: <ArtKimlik />,
  },
  {
    key: "banka",
    word: "Banka",
    /* "Hesap açılıyor" DEĞİL. Bizim ürettiğimiz çıktı dosyanın kendisi. */
    title: "Banka başvuru dosyası",
    meta: "Hazırlayan biz, kararı banka veriyor",
    who: "ortac",
    art: <ArtBanka />,
  },
];

const WHO_LABEL: Record<Who, string> = {
  siz: "Siz",
  ortac: "Ortac",
  otorite: "Otorite",
};

export default function HeroH9() {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  /* Ray sönümü: yalnızca son aşamadan birinciye dönerken açılıyor. */
  const [rewind, setRewind] = useState(false);
  /* İki ayrı duraklatma sebebi. Fare kartın üstünde (geçici) ve ziyaretçi bir
     aşamaya bastı (kalıcı). İkincisi kalıcı, çünkü basmak "ben seçiyorum"
     demek; dört saniye sonra kartın onu geri alması ziyaretçinin kararını
     çöpe atar. */
  const [hovered, setHovered] = useState(false);
  const [taken, setTaken] = useState(false);

  /* Sahne ilerletici. Son aşamadayken ilerlemiyor, ray sönümünü başlatıyor. */
  useEffect(() => {
    if (reduced || hovered || taken || rewind) return;
    const last = active === STAGES.length - 1;
    const id = window.setTimeout(
      () => {
        if (last) setRewind(true);
        else setActive((v) => v + 1);
      },
      last ? LAST_MS : DWELL_MS,
    );
    return () => window.clearTimeout(id);
  }, [active, hovered, taken, rewind, reduced]);

  /* Başa dönüşün ikinci yarısı. Yığın bu geçişi öbürleriyle aynı şekilde
     yapıyor (sahnedeki kart sola çıkar, birinci aşama onun yerine gelir);
     burada zamanlanan tek şey rayın sönük olduğu aralık.
     Ziyaretçi bu arada bir aşamaya basarsa sönüm kapanıyor, bu effect'in
     temizliği de bekleyen iki zamanlayıcıyı iptal ediyor. */
  useEffect(() => {
    if (!rewind) return;
    const back = window.setTimeout(() => setActive(0), REWIND_MS);
    const lit = window.setTimeout(() => setRewind(false), RELIGHT_MS);
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
  /* Rayın dolgu oranı. Birimsiz sayı olarak gidiyor, CSS calc() ile yüzdeye
     çevriliyor — dolgunun genişliği ilk ve son noktanın merkezleri arasında,
     yani rayın kendi iç ölçüsünde hesaplanıyor. */
  const fill = active / (STAGES.length - 1);

  return (
    <motion.div
      className="h9"
      data-rewind={rewind}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: t(0.7), delay: t(0.2), ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* ---- sahne: tek büyük kart, arkasında yığının kenarı ---- */}
      <div className="h9-stage" aria-hidden="true">
        {STAGES.map((s, i) => {
          /* Konum = aktif olana göre kaçıncı sıradasın. Modülo sayesinde
             döngü hep aynı yönde: 0 sahnede, 1-2 sağda birer dilim, 3 henüz
             görünmez, 4 çıkıp gitti. 4'ten 3'e geçiş (yani sağa ışınlanma)
             ikisi de görünmez olduğu için fark edilmiyor — sonsuz yığının
             tek numarası bu. */
          const pos = (i - active + STAGES.length) % STAGES.length;
          return (
            <div key={s.key} className="h9-card" data-pos={pos}>
              {s.art}
            </div>
          );
        })}
      </div>

      {/* ---- sahnedeki aşamanın adı ---- */}
      {/* Beş metin de DOM'da, üst üste. Yükseklik sabit kalsın diye: aşama
          değişince kartın altı zıplamıyor. */}
      <div className="h9-say">
        {STAGES.map((s, i) => (
          <div key={s.key} className="h9-c" data-on={i === active} aria-hidden={i !== active}>
            <span className="h9-h">
              <b className="h9-t">{s.title}</b>
              <em className="h9-w" data-who={s.who}>
                {WHO_LABEL[s.who]}
              </em>
            </span>
            <span className="h9-m">{s.meta}</span>
          </div>
        ))}
      </div>

      {/* ---- ray: bütünü gösteren ve tek etkileşimi taşıyan şerit ---- */}
      <div className="h9-rail" style={{ "--h9-p": fill } as CSSProperties}>
        <span className="h9-track" aria-hidden="true">
          <span className="h9-fill" />
        </span>
        {STAGES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className="h9-step"
            data-state={i < active ? "done" : i === active ? "now" : "next"}
            aria-pressed={i === active}
            onClick={() => pick(i)}
          >
            <span className="h9-dot" aria-hidden="true" />
            <span className="h9-word">{s.word}</span>
          </button>
        ))}
      </div>

      <p className="h9-foot">
        <PanelsTopLeft size={14} strokeWidth={2} aria-hidden="true" />
        <span>Hangi aşamada olduğunuzu süreç boyunca panelden görüyorsunuz.</span>
      </p>
    </motion.div>
  );
}
