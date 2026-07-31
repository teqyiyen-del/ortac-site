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
   Aşamalar farklı yüksekliklerde: kapalı bir satır 26px, açık bir aşama 320px.
   Yani şerit KATI değil — açılan aşama kendine yer açıyor, kapanan aşama
   yerini kapatıyor. Böyle bir düzende her satır aynı mesafeyi kat etmiyor;
   sahneye giren satır ~315px yol alırken ötekiler 18px alıyor. Eğer beyaz kart
   da o satırla birlikte seyahat etseydi ekranda 315px zıplayan kocaman beyaz
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
   parçasını çiziyor. Sebebi geometrik: aktif aşamanın altındaki boşluk 342px,
   kapalı satırlar arası 46px — tek parça bir ray bu ikisini aynı anda
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

   ÇİZİMLER — VE BU TURDA NEDEN HEPSİ YENİDEN DENGELENDİ
   H6'nın beğenilen çizim dili (harfsiz siluetler, sahte damga yok, tek mavi
   vurgu) baştan beri korunuyor; değişen şey kutunun oranı.

   Bir önceki turda beyaz kart 470×172 idi, yani 2.7:1 — neredeyse bir bant.
   Müşterinin bu turdaki tek cümlesi buydu: "onların yüksekliği çok az kalmış
   oluyor, biraz daha alan verebiliriz." Haklı, ve sebebi ölçülebilir: 172px'lik
   bir kutuda bir belgenin üstüne bir mühür indirmek için mührün alacağı yol
   28px kalıyordu; parmak izi plakası kutunun neredeyse tamamı kadar yüksekti
   ama yanındaki kimlik kartı basık duruyordu; kuruluş cephesinin sütunları
   42px'e sığdığı için "bina" değil "tarak" gibi okunuyordu. Dar bir kutuda
   nesneler yan yana dizilir, üst üste yığılamaz — oysa bu işin her aşaması bir
   şeyin bir şeyin ÜSTÜNE gelmesi.

   Kutu şimdi 470×272 (1.73:1). Bu, kompozisyonları esnetmekle olmadı; her biri
   yeni orana göre yeniden kuruldu, çünkü bir kutuyu %58 uzatıp içindekini
   olduğu yerde bırakmak alt ve üstte iki şerit ölü beyaz demek — yani
   müşterinin ŞİKÂYET ETTİĞİ şeyin dikey hâli. Aşama aşama ne değişti:
     1 KARAR   satırlar 38 → 54px ve her satır artık iki çubuk taşıyor (başlık
               + alt satır); üç seçenek 44px değil 68px aralıkla nefes alıyor.
     2 TESCİL  dosya yatay bir kağıttan gerçek oranlı bir belgeye döndü
               (358×230); gövde metni üç satırdan dörde çıktı ve imza sayfanın
               altına, kendi boşluğuna oturdu.
     3 LİSANS  mührün yolu 28 → 40px: hazırlık, iniş ve dönüş artık ayrı ayrı
               görülüyor. Ruhsatın başlık bandı da yükseldi, içine alt satır
               sığdı.
     4 KİMLİK  plaka 140×140'lık kareden 176×220'lik dikey cama döndü ve parmak
               izi DESEN OLARAK değişti — büyütülen eski desen kemere dönüyordu,
               gerekçesi aşağıda uzun uzun yazılı. Kimlik kartı da gerçek kart
               oranına (214×135) oturdu.
     5 BANKA   cephe 109 → 187px yükseldi: çatı, saçak, sütun ve basamak artık
               ayrı ayrı okunuyor. Dosya da 112 → 178, içine dördüncü satır.

   Yatay karşılaşma fikri duruyor — belge + mühür, parmak izi + kimlik, dosya +
   kurum hâlâ yan yana. Yalnızca artık ikisi de tam boyunda.

   HER BİRİ ÖLÇÜLDÜ, GÖZLE ONAYLANMADI. Beşi de tarayıcıda getBBox ile ölçüldü:
   kutunun yüksekliğinin sırasıyla %85, %91, %85, %81 ve %82'sini kullanıyorlar
   ve hiçbiri viewBox'ın dışına taşmıyor. İlk denemede KİMLİK %62'de kalmıştı —
   yani açtığımız yerin üçte birini geri boşluğa veriyordu; ölçmeseydik
   görülmezdi, çünkü beyaz kartta boş beyaz göze batmıyor.

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
   Hepsi aynı 470×272 kutuda, hepsi BEYAZ zeminde (kartın kendisi beyaz),
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
   Seçim katmanı alttaki satırı OPAK bir dikdörtgenle tamamen örttüğü için
   hangi satıra kaydığı önemli değil; alttaki çubukların uzunluk farkı hiçbir
   karede görünmüyor.

   YENİ ORANDA NE DEĞİŞTİ. Eski kutuda satır 38px yüksekliğindeydi ve içinde
   tek bir çubuk vardı — 426px genişliğinde 38px'lik bir şerit, üstünde 7px'lik
   bir çizgi: bir seçenek değil, bir cetvel. Satır artık 54px ve iki çubuk
   taşıyor (üstte seçeneğin adı, altında daha soluk bir alt satır). İkinci çubuk
   dekor değil, satırı okunabilir kılan şey: tek çubuk yükseklik içinde yüzüyor,
   iki çubuk bir metin bloğu oluşturuyor ve satır "içi dolu bir seçenek" olarak
   okunuyor. Aralık da 44 → 68px: üç seçenek arasında gerçekten seçim yapılan
   bir liste bu kadar boşluk ister. */
function ArtKarar() {
  const rows = [64, 132, 200];
  const bars = [214, 172, 244];
  const subs = [128, 96, 150];
  return (
    <svg className="h10-art" viewBox="0 0 470 272" aria-hidden="true" focusable="false">
      <rect x="30" y="24" width="110" height="11" rx="5.5" fill="#1c1c1c" />
      <rect x="150" y="26.5" width="52" height="7" rx="3.5" fill="#e6e6e6" />
      {rows.map((y, n) => (
        <g key={y}>
          <rect x="26" y={y} width="418" height="54" rx="12" fill="#f5f5f5" />
          <circle cx="52" cy={y + 27} r="9" fill="#ffffff" stroke="#dcdcdc" strokeWidth="1.7" />
          <rect x="76" y={y + 16} width={bars[n]} height="8" rx="4" fill="#e0e0e0" />
          <rect x="76" y={y + 32} width={subs[n]} height="6" rx="3" fill="#ebebeb" />
        </g>
      ))}
      <g className="h10-pick">
        <rect x="26" y="64" width="418" height="54" rx="12" fill="#e8f1fd" stroke="#307fe2" strokeWidth="1.6" />
        <circle cx="52" cy="91" r="9.5" fill="#307fe2" />
        <circle cx="52" cy="91" r="3.6" fill="#ffffff" />
        <rect x="76" y="80" width="214" height="8" rx="4" fill="#a9cdf5" />
        <rect x="76" y="96" width="128" height="6" rx="3" fill="#c8dff8" />
      </g>
    </svg>
  );
}

/* 2 · TESCİL — yelpaze gibi açılmış bir dosya ve önündeki sayfaya çizilen
   imza. Arkadaki iki sayfa hafifçe döndürülmüş: bu bir "içindekiler" değil,
   elde tutulan bir dosya. Mavi olan tek şey ayraç ve imza — yani dosyanın
   İŞLEM GÖREN yeri.

   YENİ ORANDA NE DEĞİŞTİ — bu, yükseklikten en çok kazanan çizim. Eski kutuda
   ön sayfa 364×142 idi, yani 2.6:1: dünyada o oranda bir belge yok, ekranda
   "kağıt" değil "pano" gibi duruyordu ve göz onu bir doküman olarak
   okumuyordu. Şimdi 358×230, yani 1.56:1 — hâlâ yatay, ama bir belgenin
   makul oranı. Bunun iki somut karşılığı var: gövde metni üç satırdan DÖRDE
   çıktı (üç satır bir not, dört satır bir metindir) ve imza artık sayfanın
   son üçte birine, kendi boşluğuna oturuyor. Eskiden imza ile en alttaki gövde
   satırı arasında 46px vardı ve imza sayfanın dibine sıkışmıştı; şimdi 78px
   var, yani imza atılacak yer bir boşluk olarak görünüyor. */
function ArtTescil() {
  return (
    <svg className="h10-art" viewBox="0 0 470 272" aria-hidden="true" focusable="false">
      <g transform="rotate(-5 250 140)">
        <rect x="46" y="44" width="330" height="196" rx="10" fill="#f0f0f0" stroke="#e4e4e4" />
      </g>
      <g transform="rotate(-2.2 254 138)">
        <rect x="60" y="34" width="344" height="212" rx="10" fill="#f7f7f7" stroke="#e4e4e4" />
      </g>
      <g transform="rotate(0.8 262 136)">
        <rect x="74" y="22" width="358" height="230" rx="10" fill="#ffffff" stroke="#dedede" />
        {/* ayraç kağıdın üst kenarına biniyor: bitişik dursa ayrı bir nesne
            olurdu, binince "bu dosyanın işaretlenmiş sayfası" oluyor */}
        <rect x="396" y="12" width="13" height="36" rx="2" fill="#307fe2" />
        <rect x="100" y="56" width="118" height="11" rx="5.5" fill="#1c1c1c" />
        <rect x="100" y="90" width="248" height="7" rx="3.5" fill="#e8e8e8" />
        <rect x="100" y="108" width="206" height="7" rx="3.5" fill="#e8e8e8" />
        <rect x="100" y="126" width="232" height="7" rx="3.5" fill="#e8e8e8" />
        <rect x="100" y="144" width="182" height="7" rx="3.5" fill="#e8e8e8" />
        <rect x="316" y="178" width="90" height="7" rx="3.5" fill="#ededed" />
        <rect x="316" y="196" width="64" height="7" rx="3.5" fill="#ededed" />
        {/* İmza çizginin üstünde ve BÜYÜK: bir imza sayfanın en insan işareti,
            ve kalabalık etmeden en büyük olabileceği yer burası. Yükselen
            kutuda beşinci bir kıvrım eklendi — dört kıvrım bir zikzak, beş
            kıvrım bir el yazısı; ayrıca genişlik aynı kalırken yükseklik
            arttığı için imzanın genliği de büyüdü, yoksa uzun sayfanın
            dibinde yassı bir çizgi olarak kalırdı. */}
        <rect x="100" y="222" width="210" height="1.8" rx="0.9" fill="#e2e2e2" />
        <path
          className="h10-sign"
          d="M104 216 c14 -26 23 10 37 -6 c10 -12 21 15 32 0 c9 -13 21 11 31 -2 c8 -11 17 8 27 -2 c7 -10 16 8 26 -3"
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

/* 3 · LİSANS — yatay bir ruhsat ve üstüne inen mühür. Mühür bir NESNE değil
   bir EYLEM: kalkıyor, iniyor, iz bırakıyor, yerine dönüyor. İz daire değil
   dikdörtgen ve hafif eğik — elle basılmış hiçbir mühür tam düz durmuyor, o
   küçük eğrilik çizimi "grafik" olmaktan çıkarıp nesne yapıyor.
   Sol üstteki kalkan soyut bir otorite işareti; gerçek bir kurum ambleminin
   taklidi bu sayfada yalan olurdu.

   YENİ ORANDA NE DEĞİŞTİ — bu çizim yüksekliği en çok HAREKET için istiyordu.
   Eski kutuda mührün kat ettiği yol 28px'ti; ekranda mühür inip kalkmıyor,
   titriyor gibi görünüyordu, çünkü 28px'lik bir düşüş 2.2 saniyeye yayılınca
   göz onu bir olay olarak ayırt edemiyor. Yol şimdi 40px, hazırlık kalkışı da
   12 → 14: üç evre (kalk, in, dön) artık birbirinden ayrı okunuyor.
   İkinci kazanç bantta: 32px'lik başlık bandına yalnızca bir ad sığıyordu,
   56px'lik banda ad + altında bir satır daha sığıyor — bir ruhsatın tepesinde
   tek satır olmaz, kurum adı ile belge türü ayrı satırlardır. Gövde satırları
   da 20 → 26px aralığa açıldı; sıkışık satırlar "form", açık satırlar
   "belge" gibi okunuyor. */
function ArtLisans() {
  return (
    <svg className="h10-art" viewBox="0 0 470 272" aria-hidden="true" focusable="false">
      {/* Belge BEYAZ, gri değil. İlk denemede #f7f7f7 idi ve gövde beyaz kartın
          neredeyse tamamını kaplayınca sahne "kağıt" değil "gri levha" gibi
          okunuyordu — kartın beyaz olmasının bütün anlamı kaçıyor. Şimdi
          kağıdı ince kenarı tanımlıyor, rengi taşıyan tek yer otoritenin
          bandı. Bu karar yeni oranda daha da kritik: kutu uzadıkça belgenin
          kapladığı alan büyüyor, gri olsaydı kart tamamen gri olurdu. */}
      <rect x="24" y="20" width="422" height="232" rx="12" fill="#ffffff" stroke="#e4e4e4" />
      <path d="M24 32a12 12 0 0 1 12-12h398a12 12 0 0 1 12 12v44H24z" fill="#e8f1fd" />
      <rect x="48" y="32" width="32" height="32" rx="8" fill="#ffffff" />
      <path
        d="M64 39 l8 3.1 v6.3 c0 4.5 -3.5 7.7 -8 9.2 c-4.5 -1.5 -8 -4.7 -8 -9.2 v-6.3 Z"
        fill="#307fe2"
      />
      <rect x="94" y="34" width="136" height="12" rx="6" fill="#1c1c1c" />
      {/* Bandın ikinci satırı. Rengi gri değil kırık mavi: #e8f1fd zeminde gri
          bir çubuk kirli duruyor, aynı ailenin bir tık koyusu bandın kendi
          içinden çıkmış gibi duruyor. */}
      <rect x="94" y="56" width="88" height="7" rx="3.5" fill="#c6dcf7" />
      <rect x="48" y="112" width="176" height="8" rx="4" fill="#ededed" />
      <rect x="48" y="138" width="142" height="8" rx="4" fill="#ededed" />
      <rect x="48" y="164" width="158" height="8" rx="4" fill="#ededed" />
      <rect x="48" y="190" width="118" height="8" rx="4" fill="#f0f0f0" />
      <g className="h10-print" transform="rotate(-3 350 188)">
        <rect x="276" y="160" width="148" height="56" rx="10" fill="#e8f1fd" stroke="#307fe2" strokeWidth="1.8" />
        <rect x="294" y="174" width="76" height="8" rx="4" fill="#307fe2" />
        <rect x="294" y="192" width="52" height="7" rx="3.5" fill="#7fb3f0" />
      </g>
      {/* Mührün dikey yerleşimi izin konumundan geriye hesaplandı: duruş
          hâlinde tabanın altı y=120, basınca 40px iniyor ve izin üst kenarına
          (y=160) değiyor. Hazırlık için 14px kalktığında tutamağın üstü (y=54)
          hâlâ kağıdın içinde (kağıt y=20'de başlıyor). Üç sayı birbirine
          bağlı: -14 / +40 / y=160 — biri değişirse mühür ya izin üstüne
          basmıyor ya da izin içine gömülüyor.
          Mührün kendisi kutu büyüdüğü hâlde yalnızca az büyütüldü: sahnenin en
          siyah kütlesi o, oranını korumak yerine büyütseydik göz belgeyi değil
          mührü okurdu. */}
      <g className="h10-stamp">
        <rect x="322" y="68" width="56" height="16" rx="8" fill="#1c1c1c" />
        <rect x="340" y="84" width="20" height="17" fill="#2c2c2c" />
        <rect x="314" y="101" width="72" height="19" rx="5" fill="#1c1c1c" />
      </g>
    </svg>
  );
}

/* 4 · KİMLİK — parmak izi plakası ve yanında Emirates ID kartı. Bu aşamanın
   konusu kartın kendisi değil, kartı almak için bizzat orada bulunma
   zorunluluğu (FACTS.dubai.limit); ağırlık merkezi o yüzden tarayıcıda ve
   hareket eden tek şey tarama çizgisi.
   PARMAK İZİ ÜÇÜNCÜ KEZ YENİDEN ÇİZİLDİ — ve bu sefer sebebi ölçek.
   Önceki iki tur şu dersi bırakmıştı: iç içe, eşit aralıklı, iki ucu da aynı
   hizada biten YAYLAR bir kemerdir, parmak izi değil. O turlarda çözüm üç
   maddeydi (çekirdek + düzensiz sırt sonları + eğiklik) ve 172'lik kutuda
   işe yarıyordu.

   Bu turda kutu yükselince şekil de büyütüldü ve tam olarak o eski tuzak geri
   geldi: 1.35 kat büyütülmüş hâli ekranda GÖKKUŞAĞI gibi okunuyordu. Ders
   yanlış değildi, eksikti — üç madde küçük ölçekte yetiyor, büyük ölçekte
   yetmiyor. Sebebi basit: yay ne kadar büyürse açık ucu o kadar göze batıyor.

   O yüzden desen değişti: kemer değil WHORL (sarmal). Sırtlar artık altta
   birbirine dönüp kapanıyor, yani her sırt kapalıya yakın bir oval. Kapalı bir
   oval kaç kat büyütülürse büyütülsün kemere dönüşemez — sorun ölçekle
   birlikte geri gelmiyor. Ekranda dördü yan yana kondu (eski 1.35, whorl 1.25,
   loop 1.2, whorl 1.05) ve whorl 1.25 seçildi; loop denemesindeki delta
   çizgisi bir hata payı gibi okunduğu için elendi.

   Önceki turların üç maddesi AYNEN duruyor, çünkü hâlâ doğrular:
     · ÇEKİRDEK. Ortada kıvrılıp kapanan küçük bir ilmek. Sarmalın ortası boş
       kalırsa desen hedef tahtasına döner — çekirdek en güçlü işaret.
     · SIRT SONLARI. Ovallerin uçları farklı yerlerde kesiliyor ve altta iki
       kopuk parça duruyor. Kusursuz kapanan halkalar deseni grafiğe çeviriyor.
     · EĞİKLİK. Bütün grup 8 derece dönük. Hiçbir parmak cama tam dik basmaz.
   Sırt kalınlığı ölçekle birlikte büyütülmedi (1.88 × 1.25 = 2.35, eskisi
   2.2): iz büyürken çizgi aynı kalırsa sırtlar incelir, ve ince sırt parmak
   izinin kendi dokusudur.

   PLAKA NEDEN KARE DEĞİL ARTIK. İlk denemede plaka kutuyla birlikte büyütüldü
   ama karelik korundu (168×168). Ölçünce ortaya çıktı: çizim yeni kutunun
   yalnızca %62'sini kullanıyordu, yani az önce açtığımız yüksekliğin üçte biri
   plakanın altında ve üstünde boş beyaz olarak duruyordu — müşterinin
   şikâyetini çözmek için alan alıp o alanı geri boşluğa vermek. Plaka şimdi
   176×220, yani dikey. İki gerekçesi var ve ikisi de uydurma değil:
     · Başparmak okuyucuların camı dikeydir; parmak cama dikey basar.
     · Tarama çizgisinin yolu plakanın boyu kadar. Kare plakada ışık 140px
       gidiyordu, dikey plakada 180px — sahnedeki tek hareket bu olduğu için
       yolun uzaması doğrudan animasyonun okunurluğu demek.
   Kullanım %62'den %81'e çıktı.

   Kartın kendisi de düzeldi: eski kutuda 254×108 idi (2.35:1), yani gerçek bir
   kimlik kartından çok bir etiket gibi duruyordu. Şimdi 214×135 (1.59:1) —
   gerçek bir kartın oranı. Ağırlık merkezi hâlâ tarayıcıda, çünkü bu aşamanın
   konusu kart değil bizzat orada bulunma zorunluluğu (FACTS.dubai.limit). */
function ArtKimlik() {
  return (
    <svg className="h10-art" viewBox="0 0 470 272" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="h10Plate">
          <rect x="28" y="26" width="176" height="220" rx="22" />
        </clipPath>
      </defs>
      <rect x="28" y="26" width="176" height="220" rx="22" fill="#f5f5f5" stroke="#e6e6e6" />
      <g clipPath="url(#h10Plate)">
        {/* Zincir: izi kendi merkezinden (92,105) yakalayıp plakanın merkezine
            (116,136) taşıyor, orada büyütüyor ve eğiyor. Merkezi yakalamak
            şart — plaka bir daha boyut değiştirirse yalnızca scale'i
            değiştirmek yetiyor, yolların hiçbirine dokunmak gerekmiyor. */}
        <g
          transform="translate(116 136) rotate(-8) scale(1.25) translate(-92 -105)"
          fill="none"
          stroke="#307fe2"
          strokeWidth="1.88"
          strokeLinecap="round"
        >
          {/* Dört sırt: her biri altta kendi üstüne dönen, kapanmaya yakın bir
              oval. Uçlar bilerek farklı yerlerde kesiliyor — tam kapanan dört
              halka hedef tahtası olurdu. */}
          <path d="M64 143 C50 133 42 116 42 94 C42 66 64 44 92 44 C120 44 142 66 142 94 C142 117 133 133 118 143" />
          <path d="M75 134 C63 127 54 112 54 94 C54 72 71 55 92 55 C113 55 130 72 130 94 C130 111 123 125 111 133" />
          <path d="M82 125 C72 119 66 108 66 94 C66 78 78 66 92 66 C106 66 118 78 118 94 C118 107 113 116 104 123" />
          <path d="M87 116 C81 111 78 103 78 94 C78 84 84 77 92 77 C100 77 106 84 106 94 C106 102 103 108 98 113" />
          {/* çekirdek: yukarı kıvrılıp içine kapanan ilmek */}
          <path d="M90 106 C88 99 89 91 94 91 C99 91 101 97 99 104" />
          {/* iki kopuk sırt: simetriyi kıran şey */}
          <path d="M54 156 C66 163 79 166 92 166" />
          <path d="M106 163 C116 159 125 153 131 146" />
        </g>
      </g>
      {/* Tarama çizgisi kırpma yolunun içinde: plakanın yuvarlak köşelerinden
          taşmıyor, yani ışık gerçekten camın üstünde geziyor gibi duruyor.
          Yolu plakanın yeni boyuyla birlikte uzadı (116 → 180px, lab-h10.css'teki
          h10Scan): ışık plakanın tepesinden dibine kadar gitmezse tarama yarım
          kalmış gibi duruyor. Sahnedeki tek hareket bu. */}
      <g clipPath="url(#h10Plate)">
        <rect className="h10-scan" x="28" y="42" width="176" height="3.5" fill="#307fe2" />
      </g>
      <rect x="232" y="68" width="214" height="135" rx="14" fill="#ffffff" stroke="#e0e0e0" />
      <rect x="252" y="88" width="74" height="95" rx="10" fill="#e4e4e4" />
      <circle cx="289" cy="118" r="15" fill="#c9c9c9" />
      <path d="M263 175 c0 -17 12 -26 26 -26 s26 9 26 26 Z" fill="#c9c9c9" />
      <rect x="344" y="96" width="80" height="10" rx="5" fill="#1c1c1c" />
      <rect x="344" y="120" width="68" height="7" rx="3.5" fill="#e2e2e2" />
      <rect x="344" y="138" width="52" height="7" rx="3.5" fill="#e2e2e2" />
      {/* Akıllı kart çipi — bir kimliği tek başına ele veren detay. Eski
          yerleşimde kartın sağ üst köşesindeydi; kart artık gerçek kart oranına
          yaklaştığı için çip metin sütununun ALTINA indi, gerçek kartlardaki
          gibi. Yanındaki soluk çubuk sağ alt köşeyi kapatıyor, yoksa kartın o
          köşesi boş kalıyor ve kart yarım basılmış gibi duruyordu. */}
      <rect x="344" y="158" width="38" height="26" rx="5" fill="#ededed" />
      <rect x="344" y="170" width="38" height="1.6" fill="#dcdcdc" />
      <rect x="361" y="158" width="1.6" height="26" fill="#dcdcdc" />
      <rect x="392" y="169" width="32" height="6" rx="3" fill="#ededed" />
    </svg>
  );
}

/* 5 · BANKA — dosya kuruma doğru kayıyor ve orada duruyor. Kurum cephesi gri
   ve hareketsiz, dosya beyaz ve hareketli: yapılan işin bizde, kararın karşı
   tarafta olduğu kompozisyonla söyleniyor. Dosyanın son satırı mavi — bizde
   biten kısım; sahnede onay tiki YOK, çünkü onaylanan hiçbir şey yok.
   Bekleyen üç nokta iddiayı kapatıyor: bu bir bekleme işareti.

   YENİ ORANDA NE DEĞİŞTİ — kurum en çok yükseklik isteyen nesneydi. Eski
   kutuda cephenin tamamı 109px'ti ve sütunlar 42px'e sıkışıyordu: çatı, saçak,
   sütun ve basamak dört ayrı parça olarak değil tek bir tırtıklı gri kütle
   olarak okunuyordu — bina değil tarak. Cephe şimdi 187px ve dördü de ayrı
   ayrı görünüyor; bir kurumun ağırlığını veren şey tam olarak bu dört parçanın
   üst üste yığılması.
   Dosya da 112 → 178 yükseldi ve içine dördüncü bir satır girdi. Bunun bir de
   anlam tarafı var: dosya kurumun karşısında EŞİT ağırlıkta durmalı (biri
   ötekine teslim ediliyor, biri ötekini eziyor değil), ve eşitlik iki nesnenin
   aynı zeminde aynı boyda durmasıyla kuruluyor. */
function ArtBanka() {
  return (
    <svg className="h10-art" viewBox="0 0 470 272" aria-hidden="true" focusable="false">
      {/* Kurumun tabanının altı (217) ile dosyanın alt kenarı (217) aynı
          hizada: iki nesne aynı zeminde duruyor, biri ötekine teslim ediliyor.
          Bu hiza tesadüf değil, dosyanın y'si tabandan geriye hesaplandı. */}
      <path d="M276 84 L361 30 L446 84 Z" fill="#e6e6e6" />
      <rect x="276" y="84" width="170" height="12" rx="2" fill="#dcdcdc" />
      <rect x="298" y="106" width="28" height="98" rx="2" fill="#ededed" />
      <rect x="347" y="106" width="28" height="98" rx="2" fill="#ededed" />
      <rect x="396" y="106" width="28" height="98" rx="2" fill="#ededed" />
      <rect x="276" y="204" width="170" height="13" rx="3" fill="#dcdcdc" />
      <g className="h10-slide">
        <rect x="26" y="39" width="222" height="178" rx="12" fill="#ffffff" stroke="#dcdcdc" />
        <rect x="50" y="68" width="104" height="10" rx="5" fill="#1c1c1c" />
        <rect x="50" y="100" width="140" height="7" rx="3.5" fill="#e8e8e8" />
        <rect x="50" y="118" width="112" height="7" rx="3.5" fill="#e8e8e8" />
        <rect x="50" y="136" width="128" height="7" rx="3.5" fill="#e8e8e8" />
        <rect x="50" y="154" width="96" height="7" rx="3.5" fill="#e8e8e8" />
        <rect x="50" y="188" width="80" height="7" rx="3.5" fill="#307fe2" />
      </g>
      {/* Bekleme rozeti dosyanın altında ve kutunun alt kenarından 20px içeride:
          ilk yerleşimde 4px kalmıştı ve rozet kartın kenarına yapışık
          duruyordu — bir nesne değil, bir taşma gibi. */}
      <g className="h10-wait">
        <rect x="26" y="228" width="92" height="24" rx="12" fill="#f2f2f2" />
        <circle cx="54" cy="240" r="3.6" fill="#bdbdbd" />
        <circle cx="72" cy="240" r="3.6" fill="#bdbdbd" />
        <circle cx="90" cy="240" r="3.6" fill="#bdbdbd" />
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
