"use client";

import { Waypoints } from "lucide-react";
import HeroSceneCard from "@/components/shared/HeroSceneCard";

/* ============================================================================
   DUBAI HERO KARTI

   CANLIDA OLAN: DubaiStageCard — "sahne, beyaz çizim". Dosyanın sonundaki
   DubaiHeroCard onu gösteriyor, PageHero de yalnızca o adı tanıyor.
   Kart /lab/hero'daki H12 adayının canlıya alınmış hâli; müşteri "h12'yi
   siteye taşıyabilirsin şimdilik, sonra üzerine biraz daha kafa patlatırız"
   dedi. Yani yerleşti ama bitmedi.

   ADAY KOPYASI DURUYOR: src/components/lab/HeroH12.tsx + lab-h12.css, sınıf
   öneki .h12-. Silinmedi, çünkü /lab/hero H12'yi H10 ve H11 ile yan yana
   göstermeye devam ediyor. Buradaki canlı kopya ayrı bir ad alanı kullanıyor
   (.dhs-, hero.css); iki dosya aynı sınıf adını taşısaydı lab-h12.css
   globals.css'te hero.css'ten SONRA import edildiği için lab'da yapılan her
   deneme sessizce canlı karta da geçerdi. Gerekçenin tamamı hero.css'teki
   .dhs- bloğunun başında.

   İKİ TARAFI BİRDEN DEĞİŞTİRME KURALI: canlı kart ile aday kopya artık iki
   ayrı dosya. Birinde yapılan düzeltme ötekine kendiliğinden geçmiyor; hangi
   kopyanın değişmesi gerektiğine önce karar verin. Canlıda görünen bu dosya.

   ---------------------------------------------------------------- A / B / C
   Bir önceki turun adayları (HeroCardA / B / C) ve yalnız onların kullandığı
   yardımcılar 25.09.2026 optimizasyon turunda silindi: /hero-lab sayfası
   kalktı, bu dosyanın kendi temizlik talimatı uygulandı. Kodları git'te.

   ORTAK KISITLAR (dört kart da uyar)
   - Kart KOYU. Zemin --night / --night-2 / --night-3 ailesi, opak hex.
     Neredeyse siyah yüzeyde alfa üç farklı tonu aynı griye çeviriyor.
   - Beyaz yalnızca aksan. Canlı kartta bu kural "beyaz yüzey değil,
     mürekkeptir" biçimini aldı: beyaz yalnızca çizimin dış hattında.
   - Metin az: toplam 6-8 kısa satır. Açıklama cümlesi yok, etiket var.
   - Somut. Ziyaretçi üç saniyede bir bilgi edinmeli; süs diyagram değil.
   - STANCE_LIMITS: kesin gün sayısı yok, fiyat yok, banka onayı vaadi yok.
     Dört kartta da bankanın geçtiği yerde kararın bankada olduğu yazılı.

   Döngülerin tamamı CSS'te (hero.css). motion yalnızca girişi yapıyor;
   prefers-reduced-motion sonsuz döngüyü CSS tarafında da kapatıyor.
   ========================================================================= */

/* ============================================================================
   CANLI KART — "SAHNE, BEYAZ ÇİZİM" (lab'daki H12)

   Sabit koyu bir sahne çerçevesi var; aşama değiştikçe içindeki nesne komple
   değişiyor. Altında aşamanın tek kelimelik adı, yanında işi kimin yaptığını
   söyleyen rozet, en altta beş segmentlik şerit. Şerit hem ilerlemeyi
   gösteriyor hem kumanda: ziyaretçi bir aşamaya basınca kart orada duruyor.

   -------------------------------------------------------- İSKELET ORTAKLAŞTI
   Kartın ÖLÇÜSÜ VE DAVRANIŞI bu dosyadan çıktı: sahne kutusu, ad kutusu,
   şerit, künye, dolgular, paylar, geçişler, duraklatma mantığı, geri sarma,
   erişilebilir ad ve hidrasyon kuralı artık sitenin tek hero kartı
   iskeletinde — components/shared/HeroSceneCard.tsx + hero.css · .hkc-.
   Muhasebe kartı (/dubai/muhasebe) aynı iskeleti kullanıyor ve iki kart artık
   BİREBİR AYNI ölçüde. Bu dosyada kalan: beş çizim, beş kelime, beş satır,
   rozetler, süreler ve künye cümlesi.

   BU TURDA DEĞİŞEN İKİ ÖLÇÜ (ikisi de standarttan geliyor, gerekçeleri orada):
     · şerit 26 → 44px. 26px dokunma hedefi eşiğinin altındaydı; hata
       muhasebede değil BURADAYDI.
     · ad kutusu 64 → 86px, künye 32.5 → 50px (iki satırlık rezerv). Kart
       604 → 644px; sahne kutusu buna karşılık 379.5'te SABİTLENDİ, artık
       alt katmanlardan artan yer değil.
   Çizimler, metinler ve renkler DEĞİŞMEDİ.

   ----------------------------------------------------------- BEYAZ = ÇİZGİ
   Kartın tek renk kuralı: BEYAZ YÜZEY DEĞİL, MÜREKKEPTİR. Beyaz yalnızca
   nesnenin dış hattına harcanıyor; gövde dolguları koyu, iç işaretler gri
   kademede, olay mavi. Kart "aydınlatılmış kağıt" değil, "siyah kağıda beyaz
   kalemle çizim". Bunun neden böyle olduğu (paleti topluca beyaza çevirmek
   maviyi kadrajın en sönük öğesine düşürüyor, beyaz üstüne beyaz kontur
   görünmüyor, kart bir önceki turda reddedilen beyaz lekeye dönüyor) ve
   ölçümle nasıl doğrulandığı hero.css'teki .dhs- bloğunun başında.

   HİÇBİR ÇİZİM KENDİ RENGİNİ BİLMİYOR — bütün boyalar hero.css'ten geliyor.
   Sınıfların anlamı:
     .dhs-sur / -sur-f       ön plandaki nesne · BEYAZ kontur
     .dhs-sur-q              ikincil düzlem    · gri kontur
     .dhs-sur-b              en uzak düzlem    · sönük kontur
     .dhs-ink…dim / rule     iç işaretler      · ASLA beyaz
     .dhs-solid / -2         katı açık yüzey   · yalnızca mühür
     .dhs-far / -2           uzak kütle        · yalnızca banka cephesi
     .dhs-act / act2 / well  olay              · mavi
     .dhs-paper              döngünün tek dolu beyazı · yalnızca lisans izi

   ---------------------------------------------------------------- SINIRLAR
   - Gün sayısı, tarih, fiyat yok. Kartın verdiği tek şey SIRA.
   - Lisans satırı takvimin bizde olmadığını söylüyor (STANCE_LIMITS 2), banka
     satırı kararın bankada olduğunu (STANCE_LIMITS 1). Banka sahnesinde onay
     işareti yok, bekleyen üç nokta var.
   - Kimlik aşaması FACTS.dubai.limit ile aynı gerçek: bir kez BAE'de.
   - Çizimlerde harf, uydurma numara, sahte resmî amblem yok — hepsi siluet.
     Beyaz çizimde bu kural daha da kritik: okunur görünen beyaz bir belge,
     üstünde sahte bir numara olsaydı koyu gri hâlinden çok daha fazla "gerçek
     belge" gibi durur ve yalan olurdu.
   - <768px'te kart gizli; mobilde hero'yu metin taşıyor.
   ========================================================================= */

/* Bir aşamanın ekranda kalma süresi ve son aşamanınki. Sonuncusu daha uzun,
   çünkü ardından başa dönülüyor: dönüşün okunması için sahnenin oturması
   gerekiyor. Muhasebe kartının beklemesinden (4.1 s) ayrı seçildi — aynı
   sayfada iki kart aynı ritimde nefes alırsa göz ikisini tek bir mekanizma
   sanıyor. Süreler PROP: ortak katsızlık disiplini iskelete taşınmadı, çünkü
   ortak bir bekleme süresi tam olarak o disiplini bozardı. */
const DWELL = 3800;
const LAST = 4800;

type Who = "siz" | "ortac" | "otorite";

/** Kartın kendi aşama tipi. HeroSceneItem'dan tek farkı `who`: burada işi kimin
 *  yaptığı VERİDEN geliyor, rozete ortak bileşene girerken çevriliyor. */
type Stage = {
  key: string;
  /** sahnenin tek kelimelik adı — kartın değişen ana metni */
  word: string;
  /** aşamanın içeriği ya da şartı; tek kısa satır, cümle bütçesinin tamamı */
  meta: string;
  who: Who;
  art: React.ReactNode;
};

/* 1 · KARAR — üç seçenekli bir liste ve üstünde gezinen seçim.
   BEYAZ: üç satırın konturu ve seçim düğmelerinin halkası; liste bu sahnenin
   nesnesi, o yüzden hattı en parlak bant.
   GRİ: üstteki soru çubuğu ve satır içindeki etiketler. Etiketler kasten
   sessiz — çizimdeki en kalabalık öğe onlar, bir kademe yukarı çekilseler
   çizim gri bir metin bloğuna dönerdi.
   MAVİ: seçilen satırın tamamı. Buradaki karar zordu: iki beyaz konturlu boş
   satırın yanına mavi bir KONTUR koymak yetmezdi, beyazdan sönük kalıp
   "seçilmemiş" gibi okunurdu. O yüzden seçim DOLU bir kütle — boşun yanındaki
   dolu, parlağın yanındaki sönükten daha güçlü bir işaret. */
function StageArtKarar() {
  const rows = [66, 152, 238];
  const bars = [196, 158, 216];
  return (
    <svg className="hkc-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      {/* Sorunun kendisi. Sahnenin tek .dhs-ink'i: belge başlığı rolündeki
          çubuk sahne başına bir tane, yoksa "en parlak dolu şey" ayrımı
          dağılıyor. */}
      <rect className="dhs-ink" x="30" y="26" width="150" height="11" rx="5.5" />
      {rows.map((y, i) => (
        <g key={y}>
          <rect className="dhs-sur" x="30" y={y} width="380" height="68" rx="16" />
          <circle className="dhs-ring" cx="64" cy={y + 34} r="13" />
          <rect className="dhs-dim" x="94" y={y + 29} width={bars[i]} height="10" rx="5" />
        </g>
      ))}
      {/* Seçim ayrı bir katman ve alttaki satırı TAMAMEN örtüyor: hangi satıra
          kaydığı önemsiz, satırların genişlik farkı görünmüyor. Duran hâli
          ortadaki satır — bir seçim yapılmış olarak kalıyor. */}
      <g className="dhs-pick">
        <rect className="dhs-well" x="30" y="66" width="380" height="68" rx="16" />
        <circle className="dhs-act" cx="64" cy="100" r="13" />
        <circle className="dhs-punch" cx="64" cy="100" r="4.6" />
        <rect className="dhs-act2" x="94" y="95" width="196" height="10" rx="5" />
      </g>
    </svg>
  );
}

/* 2 · TESCİL — yelpaze gibi açılmış bir dosya, önündeki sayfada imza
   çiziliyor.
   BEYAZ: yalnızca öndeki sayfanın konturu, ve bir tık kalın. Arkadaki iki
   kağıt gri kademede: derinliği DOLGU değil KONTUR taşıyor. Kazancı somut —
   dolgu farkı koyu zeminde 4-5 birim oynayabiliyor ve zar zor görünüyordu,
   kontur farkı (#5e5e5e / #9e9e9e / #ffffff) tartışmasız.
   MAVİ: ayraç ve imza; ikisi aynı eylemin parçası — "işlem gören sayfa" ve "o
   sayfaya atılan imza". */
function StageArtTescil() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <g transform="rotate(-10 187 180)">
        <rect className="dhs-sur-b" x="76" y="48" width="222" height="264" rx="15" />
      </g>
      <g transform="rotate(-4.5 217 175)">
        <rect className="dhs-sur-q" x="104" y="40" width="226" height="270" rx="15" />
      </g>
      <g transform="rotate(1.5 246 171)">
        <rect className="dhs-sur-f" x="130" y="30" width="232" height="282" rx="15" />
        <rect className="dhs-act" x="318" y="18" width="15" height="46" rx="4" />
        <rect className="dhs-ink" x="158" y="64" width="112" height="13" rx="6.5" />
        <rect className="dhs-dim" x="158" y="100" width="162" height="9" rx="4.5" />
        <rect className="dhs-dim" x="158" y="122" width="136" height="9" rx="4.5" />
        <rect className="dhs-dim" x="158" y="144" width="148" height="9" rx="4.5" />
        {/* Çizgi önce, imza sonra: boş bir imza satırı "burada bir imza
            bekleniyor" diyor, imza gelince nereye atıldığı belli oluyor. */}
        <rect className="dhs-rule" x="158" y="264" width="158" height="2" rx="1" />
        <path
          className="dhs-sign"
          d="M160 254 c11 -24 20 11 31 -7 c9 -15 18 15 29 0 c9 -13 18 11 26 -2 c7 -11 15 7 24 -2"
        />
      </g>
    </svg>
  );
}

/* 3 · LİSANS — inen mühür ve bıraktığı iz. Döngünün en parlak sahnesi ve
   bunun bilerek böyle olması gerekiyor: beş sahne aynı parlaklıkta olsaydı
   hiçbiri bir şey söylemezdi.
   BEYAZ DOLU: yalnızca iz. Kartın tamamında saf beyazla dolu tek şekil bu.
   Ticaret lisansı bu sürecin gerçek çıktısı ve onu düzenleyen taraf biz
   değiliz; doluluk o "dışarıdan gelen onay"ın işareti.
   GRİ KONTUR: büyük panel bilerek ikincil düzlemde. Beyaz konturlu olsaydı
   376×252 birimlik bir beyaz çerçeve, içindeki 132×58'lik dolu izin tekliğini
   yutardı — sahnenin öznesi panel değil, izin kendisi.
   MAVİ: kalkan. Soyut; gerçek bir kurumun amblemi değil. */
function StageArtLisans() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <rect className="dhs-sur-q" x="32" y="44" width="376" height="252" rx="20" />
      <rect className="dhs-well-soft" x="62" y="74" width="48" height="48" rx="13" />
      <path
        className="dhs-act"
        d="M86 84.56 l13.44 5.28 v10.56 c0 7.68 -5.76 12.96 -13.44 15.36 c-7.68 -2.4 -13.44 -7.68 -13.44 -15.36 v-10.56 Z"
      />
      <rect className="dhs-ink" x="126" y="88" width="124" height="14" rx="7" />
      <rect className="dhs-dim" x="62" y="152" width="180" height="9" rx="4.5" />
      <rect className="dhs-dim" x="62" y="178" width="136" height="9" rx="4.5" />
      <rect className="dhs-dim" x="62" y="204" width="160" height="9" rx="4.5" />
      <rect className="dhs-dim" x="62" y="230" width="104" height="9" rx="4.5" />

      {/* İz hafif eğik: elle basılmış bir mühür hiçbir zaman tam düz olmuyor,
          ve o küçük eğrilik çizimi "grafik" olmaktan çıkarıp nesne yapıyor.
          Üst kenarı (y=196) mührün en aşağıdaki hâliyle birebir hizalı. */}
      <g className="dhs-print" transform="rotate(-3 310 225)">
        <rect className="dhs-paper" x="244" y="196" width="132" height="58" rx="11" />
        <rect className="dhs-paper-ink" x="264" y="214" width="70" height="10" rx="5" />
        <rect className="dhs-paper-dim" x="264" y="232" width="48" height="8" rx="4" />
      </g>
      {/* Tokmak, boyun, taban, keçe. Taban tokmaktan belirgin şekilde geniş
          olmak zorunda, yoksa şekil mühür değil halter gibi okunuyor. */}
      <g className="dhs-stamp">
        <rect className="dhs-solid" x="282" y="60" width="56" height="24" rx="12" />
        <rect className="dhs-ink3" x="298" y="84" width="24" height="24" />
        <rect className="dhs-solid-2" x="244" y="108" width="132" height="32" rx="7" />
        <rect className="dhs-ink3" x="250" y="140" width="120" height="7" rx="3" />
      </g>
    </svg>
  );
}

/* 4 · KİMLİK — parmak izi plakası, üstünden geçen tarama ve arkada kimlik
   kartı. Beyaz çizim kararının en çok kazandırdığı sahne bu: siyah zeminde
   beyaz bir parmak izi, kartın tamamındaki en akılda kalıcı kare.
   BEYAZ: plakanın konturu ve sırtlar. Sırtlar saf beyaz değil, bir ton kısık:
   3.4 birimlik bir çizgi 1.5 birimlik konturun iki katından fazla alan
   kaplıyor ve saf beyazda parlayıp üstünden geçen mavi taramayı yutuyor.
   MAVİ: yalnızca tarama. Parmak izi NESNE, tarama OLAY — sahnede tek mavi
   kaldığı için hangisinin "şu an olan şey" olduğu sorulmuyor.
   Sırtların uçları içe kıvrılıyor; kıvrılmasaydı şekil parmak izi değil bir
   dizi kemer gibi okunurdu. Beyaz çizgide bu daha kritik: kısık gri bir şekli
   göz "parmak izi olmalı" diye tamamlıyordu, beyaz bir şekli gördüğü gibi
   okuyor. */
function StageArtKimlik() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <defs>
        {/* Kırpma yolunun kimliği lab kopyasındakinden (h12Plate) ayrı: aynı
            id iki kez DOM'a girerse tarayıcı ilkine bağlanır ve ikinci kartın
            tarama çizgisi yanlış yerde kırpılır. İki kart bugün ayrı
            sayfalarda ama /lab/hero yarın canlı kartı da gösterebilir. */}
        <clipPath id="dhsPlate">
          <rect x="30" y="58" width="204" height="224" rx="28" />
        </clipPath>
      </defs>
      <rect className="dhs-sur" x="30" y="58" width="204" height="224" rx="28" />
      <g className="dhs-ridge" fill="none" strokeLinecap="round" strokeWidth="3.4">
        <path d="M74 246 C52 224 46 190 50 158 C58 106 92 76 132 76 C172 76 206 106 214 158 C218 190 212 224 190 246" />
        <path d="M88 250 C72 228 66 196 70 168 C78 122 100 96 132 96 C164 96 186 122 194 168 C198 196 192 228 176 250" />
        <path d="M102 248 C92 226 88 200 92 176 C100 140 112 118 132 118 C152 118 164 140 172 176 C176 200 172 226 162 248" />
        <path d="M114 242 C108 222 106 200 110 182 C116 154 122 140 132 140" />
        <path d="M140 141 C150 148 156 164 160 184 C164 204 162 224 156 240" />
        <path d="M124 218 C120 200 122 178 132 172 C142 178 146 196 144 212" />
      </g>
      {/* Tarama çizgisi kırpma yolunun içinde: plakanın yuvarlak köşelerinden
          taşmıyor, yani ışık gerçekten camın üstünde geziyor gibi duruyor. */}
      <g clipPath="url(#dhsPlate)">
        <rect className="dhs-scan" x="30" y="70" width="204" height="5" />
      </g>

      <rect className="dhs-sur-q" x="254" y="104" width="160" height="124" rx="15" />
      {/* Fotoğraf bloğu koyu, üstündeki figür açık — açık mürekkep bandına
          geçince figürü bloktan AÇIK yapmak bedava bir okunurluk. */}
      <rect className="dhs-dim" x="272" y="122" width="46" height="62" rx="8" />
      <circle className="dhs-ink2" cx="295" cy="143" r="10" />
      <path className="dhs-ink2" d="M278 176 c0 -11 8 -17 17 -17 c9 0 17 6 17 17 Z" />
      <rect className="dhs-ink2" x="330" y="128" width="62" height="10" rx="5" />
      <rect className="dhs-dim" x="330" y="149" width="50" height="7" rx="3.5" />
      <rect className="dhs-dim" x="330" y="164" width="40" height="7" rx="3.5" />
      <rect className="dhs-dim" x="272" y="198" width="124" height="8" rx="4" />
    </svg>
  );
}

/* 5 · BANKA — dosya kuruma doğru kayıyor ve orada duruyor.
   BEYAZ: yalnızca dosyanın konturu. Sahnenin öznesi bizim hazırladığımız
   dosya; kurum onun gittiği yer.
   EN KOYU KÜTLE: cephe. Bu sahnenin en çok düşünülen kararı — cephe 16.700
   birimlik bir alan, açık mürekkep bandına alınsaydı kadrajın yarısı gri bir
   bina olur, göz önce oraya giderdi ve "kararı banka veriyor" cümlesi çizimde
   "banka her şeydir"e dönerdi.
   MAVİ: dosyadaki tek satır — bizim tamamladığımız kısım. Yeşil tik ya da
   onay işareti OLAMAZ; onaylanan hiçbir şey yok, tamamlanan yalnızca hazırlık.
   Bekleyen üç nokta bunu bir kez daha söylüyor: bekleme işareti, onay işareti
   değil. */
function StageArtBanka() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <path className="dhs-far" d="M248 112 L334 64 L420 112 Z" />
      <rect className="dhs-far" x="248" y="112" width="172" height="14" rx="3" />
      <rect className="dhs-far2" x="264" y="134" width="26" height="94" rx="3" />
      <rect className="dhs-far2" x="326" y="134" width="26" height="94" rx="3" />
      <rect className="dhs-far2" x="388" y="134" width="26" height="94" rx="3" />
      <rect className="dhs-far" x="240" y="228" width="188" height="15" rx="4" />

      <g className="dhs-slide">
        <rect className="dhs-sur-f" x="28" y="88" width="180" height="142" rx="15" />
        <rect className="dhs-ink" x="50" y="112" width="90" height="13" rx="6.5" />
        <rect className="dhs-dim" x="50" y="140" width="114" height="9" rx="4.5" />
        <rect className="dhs-dim" x="50" y="162" width="86" height="9" rx="4.5" />
        <rect className="dhs-act" x="50" y="186" width="66" height="9" rx="4.5" />
      </g>

      <g className="dhs-wait">
        <rect className="dhs-sur-q" x="28" y="250" width="112" height="34" rx="17" />
        <circle className="dhs-ink2" cx="56" cy="267" r="5.5" />
        <circle className="dhs-ink2" cx="84" cy="267" r="5.5" />
        <circle className="dhs-ink2" cx="112" cy="267" r="5.5" />
      </g>
    </svg>
  );
}

/* 5 (KKTC) · TESLİM — panel ekranı, belge kartı panele kayıyor.
   22.09.2026 · KKTC kartı için tek yeni çizim; öteki dördü Dubai'ninkiler
   (ülkeden bağımsız: seçim, dosya, mühür, banka).
   BEYAZ: panelin konturu. GRİ: panelin satırları. MAVİ: panele giren belge
   kartının şeridi ve satır tikleri — "teslim edildi" olayı. Kayma dhs-slide
   (Banka sahnesiyle aynı hareket, aynı keyframe). */
function StageArtTeslim() {
  const rows = [134, 170, 206, 242];
  return (
    <svg className="hkc-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <rect className="dhs-sur-f" x="150" y="54" width="262" height="238" rx="18" />
      <rect className="dhs-ink" x="176" y="80" width="104" height="12" rx="6" />
      <rect className="dhs-rule" x="176" y="108" width="210" height="2" rx="1" />
      {rows.map((y, i) => (
        <g key={y}>
          <rect className="dhs-well" x="176" y={y} width="22" height="22" rx="6" />
          <rect className="dhs-dim" x="210" y={y + 6} width={[120, 96, 136, 84][i]} height="9" rx="4.5" />
        </g>
      ))}
      <g className="dhs-slide">
        <rect className="dhs-sur-q" x="28" y="120" width="110" height="140" rx="14" />
        <rect className="dhs-act" x="28" y="120" width="110" height="14" rx="7" />
        <rect className="dhs-dim" x="46" y="156" width="62" height="8" rx="4" />
        <rect className="dhs-dim" x="46" y="176" width="74" height="8" rx="4" />
        <rect className="dhs-dim" x="46" y="196" width="50" height="8" rx="4" />
      </g>
    </svg>
  );
}

/* Beş aşama, countryContent.dubai.steps'teki yedi adımın sıkıştırılmış hâli;
   ilk üç adım tek aşamada toplandı, çünkü üçü de aynı görüşmede kapanıyor.
   Kartın işi adımların tamamını saymak değil, SIRAyı göstermek — tamamı
   sayfanın aşağısındaki süreç bölümünde zaten var ve alt satır oraya
   yolluyor. */
const STAGES: Stage[] = [
  {
    key: "karar",
    word: "Karar",
    meta: "Ad, faaliyet ve kuruluş tipi birlikte belirleniyor.",
    who: "siz",
    art: <StageArtKarar />,
  },
  {
    key: "tescil",
    word: "Tescil",
    meta: "Ana sözleşme, başvuru ve ekleri hazırlanıyor.",
    who: "ortac",
    art: <StageArtTescil />,
  },
  {
    key: "lisans",
    word: "Lisans",
    /* STANCE_LIMITS 2'nin cümleyle söylenen yarısı: takvim bizde değil. */
    meta: "Ticaret lisansını otorite düzenliyor, takvim onlarda.",
    who: "otorite",
    art: <StageArtLisans />,
  },
  {
    key: "kimlik",
    word: "Kimlik",
    /* FACTS.dubai.limit ile aynı gerçek, uyarı tonu olmadan. */
    meta: "Biyometri ve Emirates ID; bu aşama için bir kez BAE'de.",
    who: "siz",
    art: <StageArtKimlik />,
  },
  {
    key: "banka",
    word: "Banka",
    /* STANCE_LIMITS 1 birebir. "Hesap açılıyor" DEĞİL. */
    meta: "Başvuru dosyasını biz hazırlıyoruz, kararı banka veriyor.",
    who: "ortac",
    art: <StageArtBanka />,
  },
];

const WHO_LABEL: Record<Who, string> = {
  siz: "Siz",
  ortac: "Ortac",
  otorite: "Otorite",
};

/* Kartın kendi aşama listesi ortak bileşenin beklediği biçime burada
   çevriliyor. Tek gerçek dönüşüm rozet: MAVİ = siz, GRİ = siz değilsiniz —
   yani "ortac" ile "otorite" ziyaretçi açısından aynı kategoride ve rozet iki
   tonlu kalıyor. Kelime yine WHO_LABEL'dan, yani ekranda hiçbir şey değişmedi. */
const SCENES = STAGES.map((s) => ({
  key: s.key,
  word: s.word,
  meta: s.meta,
  art: s.art,
  badge: { label: WHO_LABEL[s.who], tone: s.who === "siz" ? ("you" as const) : ("muted" as const) },
}));

function DubaiStageCard() {
  /* İSKELET ARTIK ORTAK. Sahne kutusu, ad kutusu, şerit, künye, ölçüler,
     geçişler, duraklatma mantığı, geri sarma, erişilebilir ad ve hidrasyon
     kuralı HeroSceneCard'da; burada kalan tek şey bu sayfaya ait olan.

     `ordered` VE `rewind` AÇIK: bu kartın anlattığı şey SIRA. Şerit
     "bitti / şimdi / sıradaki" diye boyanıyor ve beşinciden birinciye dönüş
     şerit sönükken yapılıyor — dolu segmentlerin tek tek boşalması "geri adım"
     diye okunurdu. İkisi de opsiyonel: muhasebe kartı ikisini de kullanmıyor,
     çünkü orada dört iş aynı anda yürüyor.

     `stepLabel` "Karar aşaması" üretiyor: burada beş şey bir sürecin adımları,
     düğmenin adı da bunu söylüyor. */
  return (
    <HeroSceneCard
      ns="dhs"
      scenes={SCENES}
      dwell={DWELL}
      lastDwell={LAST}
      ordered
      rewind
      railLabel="Kuruluş aşamaları"
      stepLabel={(s) => `${s.word} aşaması`}
      foot={{
        icon: <Waypoints size={14} strokeWidth={2} aria-hidden="true" />,
        line: "Beş aşama, gerçekleşme sırasıyla. Adımların tamamı aşağıda.",
      }}
    />
  );
}

/* ------------------------------------------------------------ KKTC KARTI
   22.09.2026 · Burak KKTC kuruluş sayfasını başlattı ("dubaideki akış ile
   aynı mantığı güdebilirsin"). Kart Dubai'ninkiyle AYNI iskelet ve palet
   (ns "dhs"): sahne döngüleri sahne anahtarına değil çizim sınıflarına bağlı
   (.dhs-pick · .dhs-sign · .dhs-stamp · .dhs-slide), o yüzden dört çizim
   olduğu gibi taşındı, CSS'e dokunulmadı.
   Aşamalar countryContent.kktc.steps'in (müşterinin sunumundaki Serbest
   Liman süreci) kartlık özeti; kimin işi olduğu teyit bekliyor. "Kimlik" aşaması YOK: KKTC'de şirket
   kurmak oturum vermiyor (countryContent · kktc · clarify). */
const KKTC_STAGES: Stage[] = [
  {
    key: "karar",
    word: "İsim",
    meta: "Şirket adı için 2-3 alternatif, uygunluğu kontrol ediliyor.",
    who: "siz",
    art: <StageArtKarar />,
  },
  {
    key: "tescil",
    word: "Belgeler",
    meta: "Kuruluş belgeleri hazırlanıyor; imzalı nüshalar kargoyla geliyor.",
    who: "ortac",
    art: <StageArtTescil />,
  },
  {
    key: "banka",
    word: "Başvuru",
    meta: "Başvuru dosyası Serbest Liman'a veriliyor.",
    who: "ortac",
    art: <StageArtBanka />,
  },
  {
    key: "lisans",
    word: "Onay",
    meta: "Serbest Liman ve Bakanlar Kurulu onayı, takvim onlarda.",
    who: "otorite",
    art: <StageArtLisans />,
  },
  {
    key: "teslim",
    word: "Tescil",
    meta: "Adres belirleniyor, tescil tamamlanıyor, belgeler panelinize geçiyor.",
    who: "ortac",
    art: <StageArtTeslim />,
  },
];
const KKTC_SCENES = KKTC_STAGES.map((s) => ({
  key: s.key,
  word: s.word,
  meta: s.meta,
  art: s.art,
  badge: { label: WHO_LABEL[s.who], tone: s.who === "siz" ? ("you" as const) : ("muted" as const) },
}));

export function KktcHeroCard() {
  return (
    <HeroSceneCard
      ns="dhs"
      scenes={KKTC_SCENES}
      dwell={DWELL}
      lastDwell={LAST}
      ordered
      rewind
      railLabel="Kuruluş aşamaları"
      stepLabel={(s) => `${s.word} aşaması`}
      foot={{
        icon: <Waypoints size={14} strokeWidth={2} aria-hidden="true" />,
        line: "Beş aşama, gerçekleşme sırasıyla. Adımların tamamı aşağıda.",
      }}
    />
  );
}

/* ------------------------------------------------------- İNGİLTERE KARTI
   23.09.2026 · KKTC kartıyla aynı kalıp (ns dhs, Dubai'nin çizimleri). Kimlik
   aşaması GERİ GELDİ: İngiltere'de 18.11.2025'ten beri direktör kimlik
   doğrulaması başvurudan önce zorunlu (docs/ingiltere-mevzuat.md · 2);
   Dubai'nin parmak izi çizimi tam bunu anlatıyor. */
const UK_STAGES: Stage[] = [
  {
    key: "karar",
    word: "İsim",
    meta: "Şirket adı ve iki alternatifi, uygunluğu kontrol ediliyor.",
    who: "siz",
    art: <StageArtKarar />,
  },
  {
    key: "kimlik",
    word: "Kimlik",
    meta: "Companies House kimlik doğrulaması, yurt dışından.",
    who: "siz",
    art: <StageArtKimlik />,
  },
  {
    key: "tescil",
    word: "Başvuru",
    meta: "Evraklar hazırlanıp Companies House'a veriliyor.",
    who: "ortac",
    art: <StageArtTescil />,
  },
  {
    key: "lisans",
    word: "Tescil",
    meta: "Tescil genellikle 24 saatte; belgeler e-postayla geliyor.",
    who: "otorite",
    art: <StageArtLisans />,
  },
  {
    key: "teslim",
    word: "UTR",
    meta: "Vergi numarası HMRC'den postayla, yaklaşık 14 günde.",
    who: "ortac",
    art: <StageArtTeslim />,
  },
];
const UK_SCENES = UK_STAGES.map((s) => ({
  key: s.key,
  word: s.word,
  meta: s.meta,
  art: s.art,
  badge: { label: WHO_LABEL[s.who], tone: s.who === "siz" ? ("you" as const) : ("muted" as const) },
}));

export function UkHeroCard() {
  return (
    <HeroSceneCard
      ns="dhs"
      scenes={UK_SCENES}
      dwell={DWELL}
      lastDwell={LAST}
      ordered
      rewind
      railLabel="Kuruluş aşamaları"
      stepLabel={(s) => `${s.word} aşaması`}
      foot={{
        icon: <Waypoints size={14} strokeWidth={2} aria-hidden="true" />,
        line: "Beş aşama, gerçekleşme sırasıyla. Adımların tamamı aşağıda.",
      }}
    />
  );
}

/* PageHero'nun Dubai hero'sunda gösterdiği kart.
   SEÇİM BURADA: PageHero yalnızca bu adı biliyor, kartı değiştirmek isteyen
   tek satırı değiştiriyor. Şu an sahne kartı — müşteri lab'da H12'yi görüp
   "siteye taşıyabilirsin şimdilik" dedi.

   Kart .phx-col'un (Dubai silueti + panel) İÇİNDE DEĞİL, sağ sütunun kendisi.
   İki sebep: müşteri kartı lab'da tam olarak böyle, kendi başına duran bir
   panel olarak onayladı; ve kart zaten kendi çerçevesini taşıyor. Onu ikinci
   bir panelin içine koymak 644px'lik bir kartın etrafına 20px'lik ince bir
   çerçeve bırakırdı, siluet de o kadar dar bir şeritte okunmazdı. HeroPanel
   ve siluet duruyor, çünkü /hero-lab'daki A/B/C onları kullanıyor.

   İNGİLTERE VE KKTC HENÜZ BU KARTI KULLANMIYOR: PageHero o iki ülkede eski
   vektör sahneyi (CountryScene) basmaya devam ediyor. Kart oraya geçtiğinde
   yapılacak tek şey PageHero'daki `dubai` koşulunu kaldırmak ve her ülke için
   beş çizim üretmek; ÖLÇÜ TARAFINDA HİÇBİR ŞEY YAPILMAYACAK. */
export const DubaiHeroCard = DubaiStageCard;
