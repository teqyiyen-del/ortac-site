"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PanelsTopLeft } from "lucide-react";

/* ============================================================================
   DUBAI HERO KARTI — ADAY H6 · "AŞAMA"

   ---------------------------------------------------------------- MUHAKEME

   1) NEREDEN GELDİK
   Müşteri iki şeyi ayırdı: H2'nin TASARIM dili (svg kartlar, tasvirler, üst
   üste duran belgeler) beğenildi; H2'nin KONUSU ("bitince elinizde ne var")
   beğenilmedi. H5'in konusu — süreç, hareket, ilerleme — tuttu ama sunumu
   için alternatif istendi. Bu kart tam olarak o kesişim: H2'nin çizim dili,
   H5'in konusu, ikisinin de olmadığı bir sunum.

   2) BU SAYFAYA KİM GELİYOR VE KART ÜÇ SANİYEDE NE VERİYOR?
   Türkiye'den, Dubai'de şirket kurmayı düşünen ama "bu iş nasıl yürüyor"
   sorusunun cevabını bilmeyen biri. Kafasındaki "kuruluş" tek parça, sınırı
   belirsiz bir kütle. Ona liste okutmak bu kütleyi küçültmüyor, sadece
   yazıya çeviriyor.
   Bu yüzden kart ANLATMIYOR, SAHNELİYOR. Üç saniyede verdiği şey bilgi değil
   ritim: "bunun beş aşaması var, sırayla oluyor, her aşamada somut ve
   tanıdık bir iş yapılıyor." Ziyaretçi bir belgenin imzalandığını, bir
   mührün indiğini, bir parmak izinin okunduğunu GÖRÜYOR; bu üç saniyede
   okunabilecek her cümleden daha çok şey söylüyor.

   3) HANGİ SORUYU KAPATIYOR, AŞAĞIDA ZATEN VAR MI?
   Kapattığı soru: "Bu süreç neye benziyor?"
   CountryProcess yedi adımı gün gün yazıyor — ama o bir METİN listesi ve
   sayfanın çok aşağısında. Adımların NEYE BENZEDİĞİ, yani bu işin fiziksel
   karşılığı sayfanın hiçbir yerinde yok. Kart o boşluğu dolduruyor ve
   aşağıdaki bölümle yarışmıyor: kart resmi verir, bölüm ayrıntıyı. Müşterinin
   "özet önde, detay talep üzerine" düzeni tam olarak bu.

   ---------------------------------------------------------------- TASARIM

   Yatay bir ŞERİT. Aşamalar birer kart ve kartlar şeridin içinden geçiyor:
   sırası gelen kart soldaki sahne konumuna oturup BEYAZLIYOR ve kendi
   çizimini açıyor, işi bitince sola doğru süzülüp çıkıyor, arkadan bir
   sonraki geliyor. Yani hareket bir işaretçinin yol boyunca ilerlemesi (H5)
   değil, sahnenin kendisinin değişmesi.

   ÜÇ TASARIM KARARI VE GEREKÇELERİ

   a) NEDEN YATAY ŞERİT, NEDEN H2'NİN ÇAPRAZ YIĞINI DEĞİL?
      H2'nin yığını bir DOSYA: içindekiler eşzamanlı, sırası önemsiz, yığın
      yerinde dönüyor. Süreç öyle değil — yönü var. Yatay şerit yönü
      geometriyle söylüyor: gelen sağdan geliyor, biten soldan çıkıyor,
      altındaki ray soldan sağa doluyor. Üç öğe de aynı yönü gösteriyor;
      kart "ilerliyoruz" cümlesini hiç yazmadan kuruyor.

   b) NEDEN HER SAHNENİN KENDİ KÜÇÜK HAREKETİ VAR?
      Kart öne geldiğinde çizim durmuyor: imza çiziliyor, mühür iniyor,
      tarayıcı geçiyor, dosya bankaya kayıyor. Sebebi şu — bir süreci
      "hissettirmek" demek, o süreçteki EYLEMİ göstermek demek. Duran bir
      belge çizimi bir çıktıdır (H2'nin işi); çizilen bir imza bir eylemdir.
      Hareketler kısa ve tek seferlik: kart öne gelince bir kez oluyor,
      sonra sahne dinleniyor. Sürekli dönen bir animasyon hero'da gürültü
      olurdu, "sakin" kısıtı bunu yasaklıyor.

   c) NEDEN RAY (alt şerit) VAR?
      Sahne aynı anda tek aşamayı gösteriyor; ray bütünü gösteriyor. İkisinin
      iş bölümü net: sahne "şu an ne oluyor", ray "kaç aşama var, hangisindeyiz".
      Ray aynı zamanda kartın tek etkileşimi — merak eden bir aşamaya basıp
      sahnesini açabiliyor, kendiliğinden dönme orada duruyor.

   BEYAZ BÜTÇESİ
   Beyaz olan tek büyük yüzey öndeki sahne kartı, tıpkı H2'de olduğu gibi ve
   aynı oranda (kartın kabaca beşte biri). Gerekçesi de aynı: bu işin bütün
   nesneleri kağıt. Sahne kartının üstünde HİÇ YAZI YOK — her şey şekil.
   Bütün metin koyu tarafta. Beyaz metin yalnızca aktif aşamanın başlığında;
   koyu kartta başlık beyazı bu projede standart.

   BAŞA DÖNÜŞ
   Şerit için özel bir iş yok: kartların konumu aktif olana GÖRE (modülo)
   hesaplandığı için beşinciden birinciye geçiş de öbür geçişlerin aynısı —
   sahnedeki kart sola çıkar, birinci aşama onun yerine gelir, sıradan düşen
   tek kart görünmezken sağa döner. Sıfırlanan tek şey ray: dolgusu ve
   noktaları kısa bir an sönüyor, dönüş o sönüklükte yapılıyor. Sebebi H5'te
   de yazılı — geri kayan bir ilerleme "geri adım" diye okunuyor.

   ---------------------------------------------------------------- SINIRLAR
   - Gün sayısı yok, fiyat yok. Süre yerine SIRA var: "önce bu, sonra şu".
   - Banka aşamasının metni de çizimi de onay vaadi vermiyor: dosya bizde
     hazır, karar bankada (STANCE_LIMITS 1). Çizimdeki bekleyen üç nokta bunu
     yazıdan önce söylüyor.
   - Lisans aşaması "otorite" etiketli ve metni takvimin bizde olmadığını
     söylüyor (STANCE_LIMITS 2).
   - Metin bütçesi: 5 ray kelimesi + aktif başlık + aktif alt satır + kartın
     alt cümlesi = 8. Kim etiketi (Siz / Ortac / Otorite) rozet, satır değil.
   - <768px kart gizli; hero telefonda metinle taşınıyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Bir sahnenin ekranda kalma süresi. Kart öne gelmesi 640ms, kendi mikro
   hareketi ~2.4s sürüyor; 4s hem hareketin bitmesine hem de resmin bir an
   dinlenmesine yetiyor. Daha kısası sahneyi telaşlı, daha uzunu kartı ölü
   gösteriyor. */
const DWELL_MS = 4000;
/* Son aşama bir tık daha duruyor: ray dolmuş, süreç bitmiş — o hâlin bir
   nefeslik görülmesi gerekiyor, yoksa başa dönüş bir kaza gibi geliyor. */
const LAST_MS = 5000;
/* Başa dönüşün iki adımı. Şerit kendi kendini toparlıyor (modülo), sıfırlanan
   tek şey ray: önce ray sönüyor, sönükken başa dönülüyor, sonra geri yanıyor.
   İkinci sayı birincisinden büyük olmak zorunda — dönüş ray görünürken
   yapılırsa dolgu geri kayıyor ve ilerleme geri alınmış gibi okunuyor. */
const REWIND_MS = 280;
const RELIGHT_MS = 330;

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
/* Beşi de aynı 230×140 kutuda ama SİLUETLERİ birbirine benzemiyor: liste,
   yelpaze, mühür, tarayıcı, cephe. Fark kasıtlı — hangi aşamada olduğumuz
   metin okunmadan, sadece kompozisyondan anlaşılsın.
   Hiçbirinde harf yok, hiçbirinde gerçek bir belgenin taklidi yok: uydurma
   numara, uydurma resmî damga, gerçek kurum amblemi kullanılmıyor. Sadece
   "belge", "kimlik", "kurum" siluetleri.
   Her çizimin DURAN hâli tamamlanmış hâlidir (imza atılmış, mühür basılmış,
   dosya teslim edilmiş). Animasyon o tamamlanmış hâle GİDİYOR; hareket
   kapatıldığında geriye eksik bir kare değil, bitmiş bir resim kalıyor. */

/* 1 · KARAR — üç seçenekli bir liste ve üstünde gezinen seçim.
   Kuruluş tipinin gerçekten üç seçenekli olması (serbest bölge / mainland /
   offshore) çizimi uydurma olmaktan çıkarıyor: liste sayfanın kendi
   içeriğinin şekli. */
function ArtKarar() {
  const rows = [38, 71, 104];
  const bars = [104, 86, 118];
  return (
    <svg className="asama-art" viewBox="0 0 230 140" aria-hidden="true" focusable="false">
      <rect x="20" y="14" width="64" height="8" rx="4" fill="#1c1c1c" />
      <rect x="90" y="15.5" width="30" height="5" rx="2.5" fill="#e6e6e6" />
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="20" y={y} width="190" height="26" rx="8" fill="#f5f5f5" />
          <circle cx="36" cy={y + 13} r="6.6" fill="#ffffff" stroke="#dcdcdc" strokeWidth="1.5" />
          <rect x="54" y={y + 10} width={bars[i]} height="6" rx="3" fill="#e0e0e0" />
        </g>
      ))}
      {/* Seçim, satırların üstüne oturan ayrı bir katman: alttaki satırı
          tamamen örtüyor, o yüzden hangi satıra kaydığı önemli değil —
          genişlik farkları görünmüyor. Duran hâli ortadaki satır. */}
      <g className="asama-pick">
        <rect x="20" y="38" width="190" height="26" rx="8" fill="#e8f1fd" stroke="#307fe2" strokeWidth="1.3" />
        <circle cx="36" cy="51" r="7" fill="#307fe2" />
        <circle cx="36" cy="51" r="2.6" fill="#ffffff" />
        <rect x="54" y="48" width="104" height="6" rx="3" fill="#a9cdf5" />
      </g>
    </svg>
  );
}

/* 2 · TESCİL — yelpaze gibi açılmış bir dosya, önündeki sayfada imza
   çiziliyor. H2'nin yığını çapraz ve düzdü; buradaki yelpaze döndürülmüş,
   çünkü bu bir "içindekiler" değil, elde tutulan bir dosya. */
function ArtTescil() {
  return (
    <svg className="asama-art" viewBox="0 0 230 140" aria-hidden="true" focusable="false">
      <g transform="rotate(-11 78 82)">
        <rect x="30" y="30" width="98" height="94" rx="8" fill="#f0f0f0" stroke="#e4e4e4" />
      </g>
      <g transform="rotate(-5 98 80)">
        <rect x="52" y="26" width="98" height="94" rx="8" fill="#f7f7f7" stroke="#e4e4e4" />
      </g>
      <g transform="rotate(1.5 122 78)">
        <rect x="76" y="20" width="106" height="100" rx="8" fill="#ffffff" stroke="#dedede" />
        {/* mavi ayraç: dosyanın "işlem gören" sayfası. Tek mavi kütle, göz
            önce oraya gidiyor, imza da hemen altında. */}
        <rect x="160" y="12" width="10" height="28" rx="2" fill="#307fe2" />
        <rect x="90" y="38" width="52" height="8" rx="4" fill="#1c1c1c" />
        <rect x="90" y="56" width="74" height="5.5" rx="2.75" fill="#e8e8e8" />
        <rect x="90" y="68" width="60" height="5.5" rx="2.75" fill="#e8e8e8" />
        <rect x="90" y="80" width="68" height="5.5" rx="2.75" fill="#e8e8e8" />
        <rect x="90" y="106" width="72" height="1.6" rx="0.8" fill="#e2e2e2" />
        <path
          className="asama-sign"
          d="M92 102 c5 -11 9 5 14 -3 c4 -7 8 7 13 0 c4 -6 8 5 12 -1 c3 -5 7 3 11 -1"
          fill="none"
          stroke="#307fe2"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/* 3 · LİSANS — inen mühür. H2'de lisans DURAN bir mühürle çizilmişti (çıktı);
   burada mühür bir EYLEM: iniyor, iz bırakıyor, kalkıyor. İz daire değil
   dikdörtgen — H2'nin yuvarlak mührüyle karışmasın diye. */
function ArtLisans() {
  return (
    <svg className="asama-art" viewBox="0 0 230 140" aria-hidden="true" focusable="false">
      <rect x="22" y="22" width="186" height="106" rx="8" fill="#f7f7f7" stroke="#e6e6e6" />
      {/* Sol üstteki kalkan: belgenin resmî olduğunu söyleyen tek işaret.
          Gerçek bir kurumun amblemi değil — soyut bir otorite işareti, çünkü
          gerçek bir mühür ya da arma taklidi bu sayfada yalan olurdu. */}
      <rect x="38" y="34" width="20" height="20" rx="5" fill="#e8f1fd" />
      <path
        d="M48 38.4 l5.6 2.2 v4.4 c0 3.2 -2.4 5.4 -5.6 6.4 c-3.2 -1 -5.6 -3.2 -5.6 -6.4 v-4.4 Z"
        fill="#307fe2"
      />
      <rect x="66" y="40" width="52" height="8" rx="4" fill="#1c1c1c" />
      <rect x="38" y="66" width="76" height="6" rx="3" fill="#e6e6e6" />
      <rect x="38" y="80" width="58" height="6" rx="3" fill="#e6e6e6" />
      <rect x="38" y="94" width="68" height="6" rx="3" fill="#ededed" />
      <rect x="38" y="108" width="44" height="6" rx="3" fill="#ededed" />
      {/* İz hafif eğik: elle basılmış bir mühür hiçbir zaman tam düz olmuyor,
          ve o küçük eğrilik çizimi "grafik" olmaktan çıkarıp nesne yapıyor. */}
      <g className="asama-print" transform="rotate(-3 155 101)">
        <rect x="120" y="86" width="70" height="30" rx="6" fill="#e8f1fd" stroke="#307fe2" strokeWidth="1.5" />
        <rect x="130" y="95" width="36" height="5" rx="2.5" fill="#307fe2" />
        <rect x="130" y="104" width="24" height="4.5" rx="2.25" fill="#7fb3f0" />
      </g>
      {/* Mührün dikey yerleşimi izin konumundan geriye hesaplandı: basınca
          22px iniyor ve başlığın alt kenarı tam izin üst kenarına (y=86)
          değiyor. Hazırlık için 10px kalktığında da sapın üstü kartın üst
          kenarına 4px kala duruyor — daha yükseği kırpılıyordu. Üç sayı
          birbirine bağlı: -10 / +22 / y=44. */}
      <g className="asama-stamp">
        <rect x="132" y="14" width="46" height="14" rx="7" fill="#1c1c1c" />
        <rect x="146" y="28" width="18" height="16" fill="#2c2c2c" />
        <rect x="124" y="44" width="62" height="18" rx="4" fill="#1c1c1c" />
      </g>
    </svg>
  );
}

/* 4 · KİMLİK — parmak izi ve üstünden geçen tarama. Emirates ID kartı burada
   ikinci planda ve küçük: bu aşamanın konusu kartın kendisi değil, kartı
   almak için bizzat orada bulunma zorunluluğu (FACTS.dubai.limit). Çizimin
   ağırlık merkezi o yüzden tarayıcıda. */
function ArtKimlik() {
  return (
    <svg className="asama-art" viewBox="0 0 230 140" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="asamaPlate">
          <rect x="20" y="20" width="104" height="100" rx="14" />
        </clipPath>
      </defs>
      <rect x="20" y="20" width="104" height="100" rx="14" fill="#f5f5f5" stroke="#e6e6e6" />
      {/* Dört sırt. İlk denemede daire yayı + düz kuyruk kullanıldı ve şekil
          parmak izi değil GÖKKUŞAĞI gibi okunuyordu: kuyruklar birbirine
          paralel inince göz onu bir kemer sanıyor. Buradaki eğriler uçlara
          doğru dışa açılıyor ve her sırt farklı yükseklikte bitiyor — parmak
          izini kemerden ayıran tek şey bu düzensizlik. */}
      <g fill="none" stroke="#307fe2" strokeLinecap="round" strokeWidth="2">
        <path d="M40 100 C38 62 50 44 72 44 C94 44 106 62 104 100" />
        <path d="M50 102 C48 68 57 53 72 53 C87 53 96 68 94 102" />
        <path d="M60 100 C59 74 64 62 72 62 C80 62 85 74 84 100" />
        <path d="M69 96 C69 80 70 72 73 72 C76 72 78 80 77 88" />
        {/* iki kopuk parça: simetriyi kıran şey. Bunlar olmadan dört iç içe
            yay hâlâ bir kemer gibi duruyor. */}
        <path d="M43 110 C47 106 52 105 57 106" />
        <path d="M87 106 C92 105 97 106 101 110" />
      </g>
      {/* Tarama çizgisi kırpma yolunun içinde: plakanın yuvarlak köşelerinden
          taşmıyor, yani ışık gerçekten camın üstünde geziyor gibi duruyor. */}
      <g clipPath="url(#asamaPlate)">
        <rect className="asama-scan" x="20" y="26" width="104" height="3" fill="#307fe2" />
      </g>
      <rect x="132" y="36" width="82" height="64" rx="9" fill="#ffffff" stroke="#e0e0e0" />
      <rect x="142" y="46" width="24" height="32" rx="5" fill="#e4e4e4" />
      <circle cx="154" cy="56" r="5" fill="#c9c9c9" />
      <path d="M145 73 c0 -6 4 -9 9 -9 c5 0 9 3 9 9 Z" fill="#c9c9c9" />
      <rect x="174" y="48" width="30" height="6.5" rx="3.25" fill="#1c1c1c" />
      <rect x="174" y="61" width="26" height="4.5" rx="2.25" fill="#e2e2e2" />
      <rect x="174" y="71" width="20" height="4.5" rx="2.25" fill="#e2e2e2" />
      <rect x="142" y="86" width="62" height="4" rx="2" fill="#ededed" />
    </svg>
  );
}

/* 5 · BANKA — dosya kuruma doğru kayıyor ve orada duruyor. Kurum cephesi
   gri ve hareketsiz, dosya beyaz ve hareketli: yapılan işin bizde, kararın
   karşı tarafta olduğu kompozisyonla söyleniyor. Bekleyen üç nokta iddiayı
   kapatıyor — bir onay işareti değil, bir bekleme işareti. */
function ArtBanka() {
  return (
    <svg className="asama-art" viewBox="0 0 230 140" aria-hidden="true" focusable="false">
      <path d="M124 50 L170 24 L216 50 Z" fill="#e6e6e6" />
      <rect x="124" y="50" width="92" height="7" rx="2" fill="#dcdcdc" />
      <rect x="133" y="61" width="14" height="48" rx="2" fill="#ededed" />
      <rect x="163" y="61" width="14" height="48" rx="2" fill="#ededed" />
      <rect x="193" y="61" width="14" height="48" rx="2" fill="#ededed" />
      <rect x="124" y="109" width="92" height="8" rx="3" fill="#dcdcdc" />
      <g className="asama-slide">
        <rect x="20" y="34" width="92" height="70" rx="7" fill="#ffffff" stroke="#dcdcdc" />
        <rect x="32" y="46" width="46" height="7" rx="3.5" fill="#1c1c1c" />
        <rect x="32" y="62" width="58" height="5" rx="2.5" fill="#e8e8e8" />
        <rect x="32" y="73" width="44" height="5" rx="2.5" fill="#e8e8e8" />
        {/* Son satır mavi: dosyanın bizde biten kısmı. Sahnedeki tek mavi
            kütle bu — yeşil tik ya da onay işareti olamaz, çünkü onaylanan
            hiçbir şey yok; tamamlanan yalnızca hazırlık. */}
        <rect x="32" y="86" width="34" height="5" rx="2.5" fill="#307fe2" />
      </g>
      <g className="asama-wait">
        <rect x="20" y="112" width="56" height="18" rx="9" fill="#f2f2f2" />
        <circle cx="34" cy="121" r="2.8" fill="#bdbdbd" />
        <circle cx="48" cy="121" r="2.8" fill="#bdbdbd" />
        <circle cx="62" cy="121" r="2.8" fill="#bdbdbd" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ içerik */
/* Beş aşama, countryContent.dubai.steps'teki yedi adımın sıkıştırılmış hâli.
   Uydurma yok, sıra değişmedi; yalnızca ilk üç adım tek aşamada toplandı,
   çünkü üçü de aynı görüşmede kapanan kararlar (kaynakta üçünün de timing'i
   "ilk görüşme"). Yedi kart bir hero'da kalabalık, beş kart ritim. */
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
       bizde değil. Bunu bir uyarı kutusuna değil, aşamanın kendi satırına
       koymak gerekiyordu — orada bir kısıt değil, bir olgu. */
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

export default function HeroH6() {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  /* Ray sönümü: yalnızca son aşamadan birinciye dönerken açılıyor. */
  const [rewind, setRewind] = useState(false);
  /* İki ayrı duraklatma sebebi. Fare kartın üstünde (geçici) ve ziyaretçi
     bir aşamaya bastı (kalıcı). İkincisi kalıcı, çünkü basmak "ben
     seçiyorum" demek; dört saniye sonra kartın onu geri alması ziyaretçinin
     kararını çöpe atar. Aynı ayrım H2'de de var, sebebi de aynı. */
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

  /* Başa dönüşün ikinci yarısı. Şerit bu geçişi öbürleriyle aynı şekilde
     yapıyor (son kart sola çıkar, birinci aşama yerine gelir); burada
     zamanlanan tek şey rayın sönük olduğu aralık.
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
      className="asama"
      data-rewind={rewind}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: t(0.7), delay: t(0.2), ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* ---- şerit: aşama kartları sahneden geçiyor ---- */}
      <div className="asama-band" aria-hidden="true">
        {STAGES.map((s, i) => {
          /* Konum = aktif olana göre kaçıncı sıradasın. Modülo sayesinde
             döngü hep aynı yönde: 0 sahnede, 1-2 sırada bekliyor, 3 henüz
             gelmedi, 4 çıkıp gitti. 4'ten 3'e geçiş (yani sağa ışınlanma)
             ikisi de görünmez olduğu için fark edilmiyor — sonsuz şeridin
             tek numarası bu. */
          const pos = (i - active + STAGES.length) % STAGES.length;
          return (
            <div key={s.key} className="asama-scene" data-pos={pos}>
              {/* Kapalı kartın üstündeki üç çizgi: içinde bir şey olduğunu
                  söylüyor ama ne olduğunu açmıyor. Sahneye gelince siliniyor. */}
              <span className="asama-shut" />
              {s.art}
            </div>
          );
        })}
      </div>

      {/* ---- sahnedeki aşamanın adı ---- */}
      {/* Beş metin de DOM'da, üst üste. Yükseklik sabit kalsın diye: aşama
          değişince kartın altı zıplamıyor. */}
      <div className="asama-say">
        {STAGES.map((s, i) => (
          <div key={s.key} className="asama-c" data-on={i === active} aria-hidden={i !== active}>
            <span className="asama-h">
              <b className="asama-t">{s.title}</b>
              <em className="asama-w" data-who={s.who}>
                {WHO_LABEL[s.who]}
              </em>
            </span>
            <span className="asama-m">{s.meta}</span>
          </div>
        ))}
      </div>

      {/* ---- ray: bütünü gösteren ve tek etkileşimi taşıyan şerit ---- */}
      <div className="asama-rail" style={{ "--asama-p": fill } as CSSProperties}>
        <span className="asama-track" aria-hidden="true">
          <span className="asama-fill" />
        </span>
        {STAGES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className="asama-step"
            data-state={i < active ? "done" : i === active ? "now" : "next"}
            aria-pressed={i === active}
            onClick={() => pick(i)}
          >
            <span className="asama-dot" aria-hidden="true" />
            <span className="asama-word">{s.word}</span>
          </button>
        ))}
      </div>

      <p className="asama-foot">
        <PanelsTopLeft size={14} strokeWidth={2} aria-hidden="true" />
        <span>Hangi aşamada olduğunuzu süreç boyunca panelden görüyorsunuz.</span>
      </p>
    </motion.div>
  );
}
