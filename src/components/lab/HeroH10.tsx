"use client";

import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MoveDown } from "lucide-react";

/* ============================================================================
   DUBAI HERO KARTI — ADAY H10 · "DİKEY AKIŞ"   (H7'nin yedek planı)

   ---------------------------------------------------------------- NEREDEN

   Müşteri H7'yi "timeline gibi akıyor ya, öyle gideriz" diye tanımladı ve
   yedek olarak tutulmasını istedi. Aynı turda iki şey daha söyledi ve ikisi
   de bu kartı H7'den ayıran şey:

     · "yukardaki beyaz kart daha büyük olsun … boşa ölü alan ayırmış
        oluyoruz"  → beyaz yüzey büyüyor, ve büyüdüğü yer bir dekor değil
        aşamanın kendi sahnesi oluyor.
     · "şuan çok yatay bi tarzı var … bizim heroda buna ayrılacak alan biraz
        daha DİKEY olacak, biraz daha nefes aldırabilirsin."

   H7 yatay bir film bandıydı: kareler soldan sağa akıyor, pencerenin %38'inde
   duran beyaz nokta "şimdi"yi işaretliyordu. Bu kart aynı mekaniği 90 derece
   çeviriyor — ama çevirmek tek başına yetmiyor, çünkü dikey alanda yan yana
   duran altı küçük kare bu sefer alt alta duran altı şerit oluyor ve o da
   liste demek. Dikeyin kazandırdığı şeyi kullanmak gerekiyordu: YÜKSEKLİK.
   O yüzden aşamalar akarken küçük kalıyor, sıra kendisine geldiğinde AÇILIYOR.

   ---------------------------------------------------------------- TASARIM

   TEK BİR AKIŞ, TEK BİR SAHNE.
   Sol kenarda dikey bir ray, üstünde aşamaların noktaları. Sıradaki aşama
   yukarı doğru süzülüyor, sahnenin hizasına gelince duruyor ve tam orada BEYAZ
   BİR KARTA dönüşüp kendi çizimini açıyor. İşi bitince adı yukarıda küçülüp
   griye düşüyor, ray o kısımda maviye dönüyor, sahne bir sonrakine kalıyor.
   Açılış karesinde beş aşamanın hepsi alt alta duruyor: kart önce listeyi
   gösteriyor, sonra o listenin içinde yürümeye başlıyor.

   BEYAZ KART GÖRÜNÜRKEN HİÇ HAREKET ETMİYOR (bu kartın en önemli kararı)
   Aşamalar farklı yüksekliklerde: kapalı bir satır 26px, açık bir aşama 232px.
   Yani şerit KATI değil — açılan aşama kendine yer açıyor, kapanan aşama
   yerini kapatıyor. Böyle bir düzende her satır aynı mesafeyi kat etmiyor;
   sahneye giren satır ~230px yol alırken ötekiler 26px alıyor. Eğer beyaz kart
   da o satırla birlikte seyahat etseydi ekranda 230px zıplayan kocaman beyaz
   bir kütle olurdu — ilk denemede aynen öyle oldu ve göz akışı takip edemedi.
   Çözüm şu: kart iki konum arasında GÖRÜNMÜYOR ve üç iş SIRAYLA oluyor —
   eski kart söner (200ms), şerit akar (200-900ms), yeni kart açılır (900ms).
   Sıra şart: ilk denemede şerit kartla aynı anda akıyordu ve sahneye giren
   satırın adı, yarı saydam kartın içinden geçerken görünüyordu. Ekranda yol
   alan tek şey ince bir ad satırı — hafif, takip edilebilir bir şey — ve kart
   "sahne değişti" diyor. Zamanlama tablosunun tamamı lab-h10.css'te.

   SAHNE HER AŞAMADA BİR ADIM AŞAĞI İNİYOR
   İlk kurgudaki sahne konumu sabitti (H7'nin pencerenin %38'inde duran beyaz
   noktasının dikey karşılığı). Ekranda görünce sorun ortaya çıktı: sabit bir
   çizgi + sonlu bir liste, ilk aşamada üstte 140px, son aşamada altta 108px
   boşluk demek. Müşterinin bu turdaki şikâyeti tam olarak buydu — "boşa ölü
   alan ayırmış oluyoruz". Şimdi sahne her aşamada 28px iniyor: ilk aşamada
   şerit kartın tepesinden başlıyor, ilerledikçe geçmiş yukarıda birikiyor ve
   aşağıdaki yol kısalıyor. Sonda kalan boşluk artık kusur değil, cümlenin
   kendisi: sıra tükendi.

   NEDEN RAY SATIRLARIN KENDİSİNDEN ÇIKIYOR
   Ray tek parça bir çizgi değil; her satır kendinden bir SONRAKİNE giden
   parçasını çiziyor. Sebebi geometrik: aktif aşamanın altındaki boşluk 260px,
   kapalı satırlar arası 54px — tek parça bir ray bu ikisini aynı anda
   tutamazdı. Satır başına parça, satırla aynı süre ve aynı yumuşamayla
   uzayıp kısaldığı için uçlar birbirinden hiç kopmuyor (matematiği
   lab-h10.css'te yazılı). Yan faydası: ray gerçekten bir bağ oluyor —
   aşamalar birbirine bağlı, süreç kopuk kutular dizisi değil.

   İLERLEME NEREDEN OKUNUYOR — H7'deki fikrin aynısı
   Sayaç yok ("3 / 5" gibi), yüzde yok, gün yok. Şerit sonlu bir parça ve
   nerede olduğunuzu BOŞLUĞUN YERİ söylüyor:
     · Başta  → sahnenin üstünde hiçbir şey yok, altında dört satır bekliyor.
     · Ortada → iki yan da dolu. İçindeyiz.
     · Sonda  → altta hiçbir şey yok, ray bitiyor. Sıra tükendi.
   Buna ek olarak geçilen ray parçaları maviye dönüyor: birikim görünür.

   NEDEN BEYAZ, VE NEDEN SADECE ORADA
   Bu adayın kimliği beyaz kart. Kartın geri kalanı koyu; beyaz olan tek büyük
   yüzey sahnedeki aşama, artı "şimdi" noktasının kendisi. Bu iş kağıt işi —
   sahnede bir kağıt olması metafor değil, karşılığı. Beyaz yüzeyin üstünde
   HİÇ YAZI YOK: bütün metin koyu tarafta duruyor, beyaz alan tamamen çizime
   ayrılmış durumda. Aynı bütçe H6'da da vardı, oradan geliyor.

   ÇİZİMLER
   H6'nın beğenilen çizim dili (harfsiz siluetler, sahte damga yok, tek mavi
   vurgu) korundu ama kompozisyonlar bu kartın kutusuna göre YENİDEN kuruldu:
   H6'nın kutusu 230×140 (1.6:1), buradaki beyaz kart 470×172 (2.7:1). Eski
   çizimleri olduğu gibi koymak kartın iki yanında birer avuç ölü beyaz
   bırakırdı — müşterinin şikâyet ettiği şeyin aynısı. Geniş kutu aslında bu
   işe daha uygun: kuruluşun her aşaması iki nesnenin karşılaşması (belge +
   mühür, parmak izi + kimlik, dosya + kurum), ve o karşılaşma yatay durur.

   ---------------------------------------------------------------- SINIRLAR
   · Gün, tarih, fiyat, banka onayı vaadi yok. Kartın verdiği tek şey SIRA.
   · Üçüncü aşamanın alt satırı takvimin bizde olmadığını söylüyor
     ("Düzenleyen otorite, takvim onlarda") — STANCE_LIMITS 2.
   · Beşinci aşamanın hem adı hem alt satırı hem çizimi aynı sınırı taşıyor:
     üretilen şey DOSYA, kararı banka veriyor (STANCE_LIMITS 1). Çizimde onay
     tiki yok, bekleyen üç nokta var.
   · Dördüncü aşama FACTS.dubai.limit ile aynı gerçek: bir kez BAE'de.
   · Aşamalar countryContent.dubai.steps'in yedi adımından sıkıştırıldı,
     uydurulmadı; ilk üç adım tek aşamada toplandı çünkü üçünün de zamanı
     kaynakta "ilk görüşme".
   · AYNI ANDA GÖRÜNEN METİN 8 KISA SATIR: üst etiket, iki geçmiş ad, aktif
     ad, aktif alt satır, iki sıradaki ad, alt cümle. Kim rozeti (Siz/Ortac/
     Otorite) satır değil işaret — H6'daki sayımın aynısı.
   · <768px kart gizli; telefonda hero'yu metin taşıyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Bir aşamanın sahnede kalma süresi. Geçişin kendisi 1.3 saniye sürüyor
   (sön → ak → aç), çizimin hareketi ~2.4s; 3800ms hem ikisinin bitmesine hem
   de resmin bir an dinlenmesine yetiyor. Daha kısası kartı telaşlı, daha
   uzunu hero'nun köşesinde duran ölü bir pano yapıyor. */
const DWELL = 3800;
/* Son aşama daha uzun duruyor: ray bitmiş, altta hiçbir şey kalmamış —
   o boşluğun görülmesi gerekiyor, yoksa başa dönüş bir kaza gibi geliyor. */
const HOLD = 5400;
/* Sessiz sıfırlama. Şerit geri akmıyor: geri kayan bir ilerleme "geri adım"
   diye okunuyor (aynı ders hero.css'te ve lab-h5.css'te yazılı). Bunun
   yerine şerit sönüyor, görünmezken başa alınıyor, tekrar beliriyor. */
const FADE = 260;

type Who = "siz" | "ortac" | "otorite";

type Stage = {
  key: string;
  /* Satırın tek satırlık adı. Kapalıyken de aynı metin duruyor, sahneye
     gelince yalnızca büyüyüp beyazlıyor — ad değişmediği için göz aynı şeyi
     takip ettiğini biliyor. */
  title: string;
  /* Aşamanın şartı ya da sahibi. Yalnızca aktif aşamada görünüyor. */
  note: string;
  who: Who;
  art: ReactNode;
};

/* ------------------------------------------------------------------ çizimler
   Hepsi aynı 470×172 kutuda, hepsi BEYAZ zeminde (kartın kendisi beyaz),
   hiçbirinde harf yok, hiçbirinde gerçek bir belgenin, kurumun ya da damganın
   taklidi yok — sadece "kağıt", "kimlik", "dosya", "kurum" siluetleri.

   Ortak renk sözlüğü, H6'dan birebir devralındı:
     #ffffff / #f7f7f7 / #f5f5f5   kağıt kademeleri
     #e6e6e6 / #e2e2e2 / #ededed   çizgi ve pasif metin blokları
     #1c1c1c                       başlık mürekkebi (her çizimde tek bir tane)
     #307fe2 + #e8f1fd + #a9cdf5   o aşamada İLERLEYEN şey
   Her çizimin DURAN hâli TAMAMLANMIŞ hâlidir: imza atılmış, mühür basılmış,
   dosya teslim edilmiş. Animasyon o hâle gidiyor; hareket kapatıldığında
   geriye eksik bir kare değil bitmiş bir resim kalıyor. */

/* 1 · KARAR — üç seçenekli bir liste ve üstünde gezinen seçim. Kuruluş
   tipinin gerçekten üç seçenekli olması (serbest bölge / mainland / offshore)
   çizimi uydurma olmaktan çıkarıyor: liste, sayfanın kendi içeriğinin şekli.
   Seçim katmanı alttaki satırı tamamen örttüğü için hangi satıra kaydığı
   önemli değil; çubuk uzunlukları farkı görünmüyor. */
function ArtKarar() {
  const rows = [34, 78, 122];
  const bars = [196, 158, 224];
  return (
    <svg className="h10-art" viewBox="0 0 470 172" aria-hidden="true" focusable="false">
      <rect x="22" y="12" width="96" height="9" rx="4.5" fill="#1c1c1c" />
      <rect x="128" y="13.5" width="44" height="6" rx="3" fill="#e6e6e6" />
      {rows.map((y, n) => (
        <g key={y}>
          <rect x="22" y={y} width="426" height="38" rx="10" fill="#f5f5f5" />
          <circle cx="46" cy={y + 19} r="8" fill="#ffffff" stroke="#dcdcdc" strokeWidth="1.6" />
          <rect x="68" y={y + 15.5} width={bars[n]} height="7" rx="3.5" fill="#e0e0e0" />
        </g>
      ))}
      <g className="h10-pick">
        <rect x="22" y="34" width="426" height="38" rx="10" fill="#e8f1fd" stroke="#307fe2" strokeWidth="1.4" />
        <circle cx="46" cy="53" r="8.5" fill="#307fe2" />
        <circle cx="46" cy="53" r="3.2" fill="#ffffff" />
        <rect x="68" y="49.5" width="196" height="7" rx="3.5" fill="#a9cdf5" />
      </g>
    </svg>
  );
}

/* 2 · TESCİL — yelpaze gibi açılmış bir dosya ve önündeki sayfaya çizilen
   imza. Arkadaki iki sayfa hafifçe döndürülmüş: bu bir "içindekiler" değil,
   elde tutulan bir dosya. Mavi olan tek şey ayraç ve imza — yani dosyanın
   İŞLEM GÖREN yeri. */
function ArtTescil() {
  return (
    <svg className="h10-art" viewBox="0 0 470 172" aria-hidden="true" focusable="false">
      <g transform="rotate(-4.5 210 92)">
        <rect x="44" y="30" width="330" height="126" rx="9" fill="#f0f0f0" stroke="#e4e4e4" />
      </g>
      <g transform="rotate(-2 220 90)">
        <rect x="58" y="24" width="344" height="132" rx="9" fill="#f7f7f7" stroke="#e4e4e4" />
      </g>
      <g transform="rotate(0.8 236 88)">
        <rect x="72" y="16" width="364" height="142" rx="9" fill="#ffffff" stroke="#dedede" />
        {/* ayraç kağıdın üst kenarına biniyor: bitişik dursa ayrı bir nesne
            olurdu, binince "bu dosyanın işaretlenmiş sayfası" oluyor */}
        <rect x="398" y="8" width="12" height="32" rx="2" fill="#307fe2" />
        <rect x="96" y="40" width="104" height="9" rx="4.5" fill="#1c1c1c" />
        <rect x="96" y="64" width="242" height="6" rx="3" fill="#e8e8e8" />
        <rect x="96" y="78" width="198" height="6" rx="3" fill="#e8e8e8" />
        <rect x="96" y="92" width="220" height="6" rx="3" fill="#e8e8e8" />
        <rect x="330" y="112" width="82" height="6" rx="3" fill="#ededed" />
        <rect x="330" y="126" width="58" height="6" rx="3" fill="#ededed" />
        {/* İmza çizginin üstünde ve BÜYÜK: ilk denemede H6'nın ölçüsüyle
            çizilmişti ve bu kutu iki kat geniş olduğu için sayfanın köşesinde
            unutulmuş bir tırtık gibi duruyordu. Bir imza sayfanın en insan
            işareti; kalabalık etmeden en büyük olabileceği yer burası. */}
        <rect x="96" y="138" width="192" height="1.6" rx="0.8" fill="#e2e2e2" />
        <path
          className="h10-sign"
          d="M100 133 c12 -21 20 8 32 -5 c9 -10 18 13 28 0 c8 -11 18 9 27 -2 c7 -9 15 7 23 -2"
          fill="none"
          stroke="#307fe2"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/* 3 · LİSANS — yatay bir ruhsat ve üstüne inen mühür. Mühür bir NESNE değil
   bir EYLEM: kalkıyor, iniyor, iz bırakıyor, yerine dönüyor. İz daire değil
   dikdörtgen ve hafif eğik — elle basılmış hiçbir mühür tam düz durmuyor, o
   küçük eğrilik çizimi "grafik" olmaktan çıkarıp nesne yapıyor.
   Sol üstteki kalkan soyut bir otorite işareti; gerçek bir kurum ambleminin
   taklidi bu sayfada yalan olurdu. */
function ArtLisans() {
  return (
    <svg className="h10-art" viewBox="0 0 470 172" aria-hidden="true" focusable="false">
      {/* Belge BEYAZ, gri değil. İlk denemede #f7f7f7 idi ve 430×148'lik gövde
          beyaz kartın neredeyse tamamını kaplayınca sahne "kağıt" değil "gri
          levha" gibi okunuyordu — kartın beyaz olmasının bütün anlamı kaçıyor.
          Şimdi kağıdı ince kenarı tanımlıyor, rengi taşıyan tek yer otoritenin
          bandı. */}
      <rect x="20" y="12" width="430" height="148" rx="10" fill="#ffffff" stroke="#e4e4e4" />
      <path d="M20 22a10 10 0 0 1 10-10h410a10 10 0 0 1 10 10v32H20z" fill="#e8f1fd" />
      <rect x="42" y="22" width="22" height="22" rx="6" fill="#ffffff" />
      <path
        d="M53 26.4 l6.2 2.4 v4.9 c0 3.5 -2.7 6 -6.2 7.1 c-3.5 -1.1 -6.2 -3.6 -6.2 -7.1 v-4.9 Z"
        fill="#307fe2"
      />
      <rect x="76" y="28" width="112" height="10" rx="5" fill="#1c1c1c" />
      <rect x="42" y="78" width="152" height="7" rx="3.5" fill="#ededed" />
      <rect x="42" y="98" width="122" height="7" rx="3.5" fill="#ededed" />
      <rect x="42" y="118" width="138" height="7" rx="3.5" fill="#f0f0f0" />
      <g className="h10-print" transform="rotate(-3 355 125)">
        <rect x="290" y="102" width="130" height="46" rx="8" fill="#e8f1fd" stroke="#307fe2" strokeWidth="1.6" />
        <rect x="306" y="114" width="66" height="7" rx="3.5" fill="#307fe2" />
        <rect x="306" y="128" width="44" height="6" rx="3" fill="#7fb3f0" />
      </g>
      {/* Mührün dikey yerleşimi izin konumundan geriye hesaplandı: duruş
          hâlinde tabanın altı y=74, basınca 28px iniyor ve izin üst kenarına
          (y=102) değiyor. Hazırlık için 12px kalktığında tutamağın üstü hâlâ
          kağıdın içinde. Üç sayı birbirine bağlı: -12 / +28 / y=102.
          Ölçüler H6'dakinden bir tık küçük: bu kutu iki kat geniş ama mühür
          aynı kalınca sahnenin en siyah kütlesi oluyor ve göz belgeyi değil
          onu okuyordu. */}
      <g className="h10-stamp">
        <rect x="332" y="30" width="46" height="13" rx="6.5" fill="#1c1c1c" />
        <rect x="346" y="43" width="18" height="14" fill="#2c2c2c" />
        <rect x="326" y="57" width="58" height="17" rx="4.5" fill="#1c1c1c" />
      </g>
    </svg>
  );
}

/* 4 · KİMLİK — parmak izi plakası ve yanında Emirates ID kartı. Bu aşamanın
   konusu kartın kendisi değil, kartı almak için bizzat orada bulunma
   zorunluluğu (FACTS.dubai.limit); ağırlık merkezi o yüzden tarayıcıda ve
   hareket eden tek şey tarama çizgisi.
   PARMAK İZİ İKİ KEZ YENİDEN ÇİZİLDİ, ikisi de ekranda görüldükten sonra.
   H6'daki sırtlar bu kutuya büyütülünce şekil parmak izi değil GÖKKUŞAĞI gibi
   okundu — H6'nın kendi yorumunda uyardığı tuzağın aynısı, ama bu ölçekte çok
   daha belirgin: iç içe, eşit aralıklı, iki ucu da aynı hizada biten yaylar
   bir kemerdir. Şekli parmak izine çeviren üç şey var ve üçü de burada:
     · ÇEKİRDEK. Ortada kıvrılıp kapanan küçük bir ilmek. Kemerin ortası boş,
       parmak izinin ortasında bir çekirdek vardır — tek başına en güçlü işaret.
     · SIRT SONLARI. Yayların uçları farklı yüksekliklerde bitiyor ve altta iki
       kopuk parça duruyor. Eşit biten uçlar deseni grafiğe çeviriyor.
     · EĞİKLİK. Bütün grup 8 derece dönük. Hiçbir parmak cama tam dik basmaz;
       simetri kırıldığı an göz "çizim" değil "iz" görüyor. */
function ArtKimlik() {
  return (
    <svg className="h10-art" viewBox="0 0 470 172" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="h10Plate">
          <rect x="22" y="16" width="140" height="140" rx="16" />
        </clipPath>
      </defs>
      <rect x="22" y="16" width="140" height="140" rx="16" fill="#f5f5f5" stroke="#e6e6e6" />
      <g clipPath="url(#h10Plate)">
        <g
          transform="rotate(-8 92 86)"
          fill="none"
          stroke="#307fe2"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <path d="M44 124 C39 84 55 42 92 42 C129 42 145 84 140 118" />
          <path d="M56 130 C52 92 65 56 92 56 C119 56 132 92 128 126" />
          <path d="M68 126 C65 98 74 70 92 70 C110 70 119 98 116 122" />
          <path d="M80 130 C78 106 82 84 92 84 C102 84 106 104 104 118" />
          {/* çekirdek: yukarı kıvrılıp içine kapanan ilmek */}
          <path d="M90 118 C89 106 90 96 96 97 C101 98 101 105 99 112" />
          {/* iki kopuk sırt: simetriyi kıran şey */}
          <path d="M50 138 C58 133 66 132 74 135" />
          <path d="M112 134 C120 132 128 135 134 140" />
        </g>
      </g>
      {/* Tarama çizgisi kırpma yolunun içinde: plakanın yuvarlak köşelerinden
          taşmıyor, yani ışık gerçekten camın üstünde geziyor gibi duruyor. */}
      <g clipPath="url(#h10Plate)">
        <rect className="h10-scan" x="22" y="26" width="140" height="3" fill="#307fe2" />
      </g>
      <rect x="186" y="32" width="254" height="108" rx="12" fill="#ffffff" stroke="#e0e0e0" />
      <rect x="204" y="50" width="64" height="72" rx="8" fill="#e4e4e4" />
      <circle cx="236" cy="74" r="12" fill="#c9c9c9" />
      <path d="M216 116 c0 -13 9 -20 20 -20 s20 7 20 20 Z" fill="#c9c9c9" />
      <rect x="286" y="58" width="96" height="9" rx="4.5" fill="#1c1c1c" />
      <rect x="286" y="78" width="80" height="6" rx="3" fill="#e2e2e2" />
      <rect x="286" y="94" width="62" height="6" rx="3" fill="#e2e2e2" />
      <rect x="286" y="112" width="110" height="6" rx="3" fill="#ededed" />
      {/* akıllı kart çipi — bir kimliği tek başına ele veren detay */}
      <rect x="396" y="52" width="30" height="24" rx="4" fill="#ededed" />
      <rect x="396" y="63" width="30" height="1.4" fill="#dcdcdc" />
      <rect x="410" y="52" width="1.4" height="24" fill="#dcdcdc" />
    </svg>
  );
}

/* 5 · BANKA — dosya kuruma doğru kayıyor ve orada duruyor. Kurum cephesi gri
   ve hareketsiz, dosya beyaz ve hareketli: yapılan işin bizde, kararın karşı
   tarafta olduğu kompozisyonla söyleniyor. Dosyanın son satırı mavi — bizde
   biten kısım; sahnede onay tiki YOK, çünkü onaylanan hiçbir şey yok.
   Bekleyen üç nokta iddiayı kapatıyor: bu bir bekleme işareti. */
function ArtBanka() {
  return (
    <svg className="h10-art" viewBox="0 0 470 172" aria-hidden="true" focusable="false">
      {/* Kurumun tabanı (129) ile dosyanın alt kenarı (128) aynı hizada:
          iki nesne aynı zeminde duruyor, biri ötekine teslim ediliyor. */}
      <path d="M292 56 L364 20 L436 56 Z" fill="#e6e6e6" />
      <rect x="292" y="56" width="144" height="9" rx="2" fill="#dcdcdc" />
      <rect x="306" y="77" width="22" height="42" rx="2" fill="#ededed" />
      <rect x="353" y="77" width="22" height="42" rx="2" fill="#ededed" />
      <rect x="400" y="77" width="22" height="42" rx="2" fill="#ededed" />
      <rect x="292" y="119" width="144" height="10" rx="3" fill="#dcdcdc" />
      <g className="h10-slide">
        <rect x="26" y="16" width="204" height="112" rx="10" fill="#ffffff" stroke="#dcdcdc" />
        <rect x="48" y="36" width="96" height="9" rx="4.5" fill="#1c1c1c" />
        <rect x="48" y="60" width="130" height="6" rx="3" fill="#e8e8e8" />
        <rect x="48" y="76" width="104" height="6" rx="3" fill="#e8e8e8" />
        <rect x="48" y="98" width="74" height="6" rx="3" fill="#307fe2" />
      </g>
      {/* Bekleme rozeti dosyanın altında ve kutunun alt kenarından 12px içeride:
          ilk yerleşimde 4px kalmıştı ve rozet kartın kenarına yapışık
          duruyordu — bir nesne değil, bir taşma gibi. */}
      <g className="h10-wait">
        <rect x="26" y="140" width="80" height="20" rx="10" fill="#f2f2f2" />
        <circle cx="44" cy="150" r="3.2" fill="#bdbdbd" />
        <circle cx="60" cy="150" r="3.2" fill="#bdbdbd" />
        <circle cx="76" cy="150" r="3.2" fill="#bdbdbd" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ içerik */
/* Beş aşama, countryContent.dubai.steps'teki yedi adımın sıkıştırılmış hâli.
   Sıra değişmedi, hiçbir şey uydurulmadı; yalnızca ilk üç adım tek aşamada
   toplandı çünkü kaynakta üçünün de zamanı "ilk görüşme" — üçü de aynı
   görüşmede kapanan kararlar. Yedi satır bir hero'da liste, beş aşama ritim.
   GSM hattı kartta yok: kuruluşun hikâyesini değiştirmeyen bir kalem. */
const STAGES: Stage[] = [
  {
    key: "karar",
    title: "Ad, faaliyet ve yapı",
    note: "Kararlar ilk görüşmede kapanıyor",
    /* Kararın sahibi ziyaretçi; biz seçenekleri eşleştiriyoruz. */
    who: "siz",
    art: <ArtKarar />,
  },
  {
    key: "tescil",
    title: "Kuruluş dosyası ve tescil",
    note: "Ana sözleşme, başvuru ve ekleri",
    who: "ortac",
    art: <ArtTescil />,
  },
  {
    key: "lisans",
    title: "Ticaret lisansı",
    /* STANCE_LIMITS 2'nin cümleyle söylenen yarısı. Bunu bir uyarı kutusuna
       değil aşamanın kendi satırına koymak gerekiyordu: orada bir kısıt
       değil, sürecin bir olgusu. */
    note: "Düzenleyen otorite, takvim onlarda",
    who: "otorite",
    art: <ArtLisans />,
  },
  {
    key: "kimlik",
    title: "Biyometri ve Emirates ID",
    /* FACTS.dubai.limit ile aynı gerçek, uyarı tonu olmadan: beş aşamadan
       yalnızca birinde orada olmak gerekiyor. Gizlemek yerine küçültüyoruz. */
    note: "Bu aşama için bir kez BAE'de",
    who: "siz",
    art: <ArtKimlik />,
  },
  {
    key: "banka",
    /* "Hesap açılıyor" DEĞİL. Bizim ürettiğimiz çıktı dosyanın kendisi. */
    title: "Banka başvuru dosyası",
    note: "Hazırlayan biz, kararı banka veriyor",
    who: "ortac",
    art: <ArtBanka />,
  },
];

const LAST = STAGES.length - 1;

const WHO_LABEL: Record<Who, string> = {
  siz: "Siz",
  ortac: "Ortac",
  otorite: "Otorite",
};

export default function HeroH10() {
  const reduced = useReducedMotion() ?? false;
  const [i, setI] = useState(0);
  /* Tek duraklatma sebebi var: imleç ya da klavye odağı kartın üstünde.
     Kalıcı bir kilit (H6'daki gibi "bastı, seçimini yaptı") burada bilerek
     yok — tıklanan aşama birkaç saniye sonra zaten sahneden çıkıyor, kilit
     ziyaretçiyi geri dönemeyeceği bir yerde bırakırdı. İmleç ayrılınca akış
     kaldığı yerden devam ediyor. */
  const [held, setHeld] = useState(false);
  /* Sıfırlama penceresi: şerit görünmezken başa alınıyor. */
  const [blank, setBlank] = useState(false);

  useEffect(() => {
    if (reduced || held || blank) return;
    if (i < LAST) {
      const id = window.setTimeout(() => setI(i + 1), DWELL);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setBlank(true), HOLD);
    return () => window.clearTimeout(id);
  }, [i, reduced, held, blank]);

  /* Sıfırlama kendi etkisinde duruyor. Yukarıdaki etkiye konsaydı setI(0)
     kendi temizleyicisini tetikleyip "blank'i kapat" zamanlayıcısını siler ve
     şerit görünmez kalırdı. Burada bağımlılık yalnızca blank olduğu için dizi
     kesintisiz işliyor: sön → başa al → yeniden belir. */
  useEffect(() => {
    if (!blank) return;
    const toStart = window.setTimeout(() => setI(0), FADE);
    const show = window.setTimeout(() => setBlank(false), FADE + 60);
    return () => {
      window.clearTimeout(toStart);
      window.clearTimeout(show);
    };
  }, [blank]);

  const go = useCallback((n: number) => {
    setI(n);
    setBlank(false);
    setHeld(true);
  }, []);

  /* reduced hâlde işaretleme değişmiyor, yalnızca süre sıfırlanıyor: sunucu ve
     ilk istemci render'ı aynı DOM'u üretmek zorunda. Duran hâl için ayrıca bir
     yerleşim düzeltmesi de gerekmiyor — kart i=0'da kalıyor ve o hâlde şerit
     zaten beş aşamanın tamamını gösteriyor. */
  const t = (v: number) => (reduced ? 0 : v);

  return (
    <motion.div
      className="h10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: t(0.7), delay: t(0.2), ease: EASE }}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <span className="h10-k">Kuruluş, aşama aşama</span>

      <div className="h10-win" role="group" aria-label="Kuruluş aşamaları">
        {/* Şeridin nereye oturduğunu tek bir sayı belirliyor: kaçıncı
            aşamadayız. Sahne her aşamada bir adım aşağı iniyor — sabit bir
            "şimdi" çizgisi ilk aşamada kartın tepesinde, son aşamada altında
            kocaman bir boşluk bırakıyordu (gerekçesi lab-h10.css'te uzun uzun
            yazılı). Yerleşimin geri kalanı bu sayıdan türüyor. */}
        <ol className="h10-strip" data-blank={blank} style={{ "--i": String(i) } as CSSProperties}>
          {STAGES.map((s, n) => {
            /* Satırın "şimdi"ye göre işaretli uzaklığı. Bütün yerleşim tek bu
               sayıdan türüyor (formüller lab-h10.css'te): negatifse yukarıda
               ve kapalı, sıfırsa sahnede ve açık, pozitifse aşağıda ve sırada.
               data-far ikinci kademeyi açıyor: uzaktakiler bir tık daha küçük
               ve bir tık daha sönük, yani derinlik hissi opaklıkla değil renk
               kademesiyle kuruluyor (koyu yüzeyde alfa yok). */
            const k = n - i;
            const rel = k < 0 ? "past" : k > 0 ? "next" : "on";
            return (
              <li
                key={s.key}
                className="h10-row"
                data-rel={rel}
                data-far={Math.abs(k) > 1}
                data-last={n === LAST}
                style={{ "--k": String(k) } as CSSProperties}
              >
                <button
                  type="button"
                  className="h10-hit"
                  aria-label={s.title}
                  aria-current={n === i ? "step" : undefined}
                  onClick={() => go(n)}
                  /* Klavyeyle gezen kullanıcı pencerenin dışındaki bir satıra
                     odaklanabiliyor; odak o satırı sahneye getiriyor ki
                     görünmeyen bir düğmeye basılmasın. */
                  onFocus={() => go(n)}
                >
                  <span className="h10-dot" aria-hidden="true" />
                  <span className="h10-name">{s.title}</span>
                  {/* Kim rozeti. MAVİ = siz, GRİ = siz değilsiniz. İki renk
                      yetiyor, çünkü ziyaretçinin sorduğu şey "kim yapıyor"
                      değil, "ben mi yapıyorum". Etiket yine de dürüst:
                      Ortac ile Otorite ayrı yazılıyor. */}
                  <em className="h10-who" data-who={s.who} aria-hidden={n !== i}>
                    {WHO_LABEL[s.who]}
                  </em>
                </button>

                <span className="h10-note" aria-hidden={n !== i}>
                  {s.note}
                </span>

                {/* Sahne. Beş kartın beşi de DOM'da ve hepsi aynı yerde
                    açılıyor; görünen tek bir tanesi. */}
                <div className="h10-card" aria-hidden="true">
                  {s.art}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="h10-foot">
        <MoveDown size={14} strokeWidth={2} aria-hidden="true" />
        <span>Sıra kimde olursa olsun, takibi bizde.</span>
      </p>
    </motion.div>
  );
}
