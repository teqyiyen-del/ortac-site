import Link from "next/link";

import AnketSahne from "@/components/lab/AnketSahne";
import AnketDefter from "@/components/lab/AnketDefter";
import AnketAkis from "@/components/lab/AnketAkis";

/* ============================================================================
   /lab/anket — UYGUNLUK TESTİNE TASARIM ALTERNATİFLERİ · İKİNCİ TUR

   ---------------------------------------------------------------------------
   MÜŞTERİNİN BU TURDAKİ CÜMLESİ, BİREBİR

   "uygunluk anketinde aday 1 iyi gibi diğerleri rezalet ama hala da
    acanlıdaki hali daha iyi. beğenilerimizi anladıysan aday 2-3 ü sil ve
    yenilerini dene."

   Üç bilgi var ve üçü de kullanıldı:
     1. Aday 1 (SAHNE) "iyi gibi"      → DURUYOR, tek satırı değişmedi.
     2. Aday 2 (FÖY) ve 3 (PANO) "rezalet" → SİLİNDİ, bileşenleri ve CSS'leri
        dahil. Gerekçeleri aşağıdaki ELENENLER bölümünde duruyor.
     3. "hâlâ canlıdaki hâli daha iyi" → EN ÖNEMLİSİ. Üç aday da canlıyı
        geçemedi, yani yeni adaylar canlıyı sıfırdan değiştirmeye değil
        CANLIYI GEÇMEYE çalışıyor.

   ---------------------------------------------------------------------------
   TEŞHİS TERSİNE DÖNDÜ, VE BU TURUN BÜTÜN HİKÂYESİ BU

   Geçen turun ölçümü şunu diyordu: canlı bir soru ekranında 52 metin bloğu
   var, 45'i sorunun dışında, en büyük kalem sol ray. Üç aday da o 45 bloğu
   kesti. Müşteri üçünü de gördü ve canlıyı seçti.

   Demek ki 45 blok gürültü DEĞİLDİ. Bu tur aynı ekran yeniden ölçüldü, ama
   "kaç blok" diye değil "NE YAZIYOR" diye. Cevap aşağıdaki TEŞHİS tablosunda:
   canlı ekranın dörtte biri ZİYARETÇİNİN KENDİ KAYDINA ayrılmış ve o kayda
   tek tıkla dönülebiliyor. Adaylarda o kayıt sıfır.

   İki yeni aday aynı sözleşmeyi imzalıyor: CANLININ TAŞIDIĞI BİLGİYİ KAYBETME,
   SUNUMUNU DEĞİŞTİR. Ayrıştıkları eksen renk ya da kabuk değil yapı: kayıt
   AYRI BİR YERDE mi durur (DEFTER), yoksa SORUNUN KENDİ YERİNDE mi (AKIŞ).

   ---------------------------------------------------------------------------
   NE TAM, NE DEĞİL

   Üçü de dokuz sorunun tamamını gerçekten yürütüyor: soru metinleri, ipuçları
   ve puanlar fitTest.ts'ten, ülke adları ve bayraklar CountryPicker'dan, sonuç
   scoreFit'ten. Tek bir cümle, tek bir ağırlık, tek bir logo uydurulmadı.

   TAMAMLANMAMIŞ OLAN: sonuç ekranı üç adayda da KISALTILMIŞ. Canlı sonuçta
   cevap dökümü, puan pulları, ülke kartları ve üç çıkış düğmesi var; burada
   sıralama, ülke cümlesi, kısıt cümlesi ve fark cümlesi var. Sebep,
   karşılaştırmayı temiz tutmak: bu turda sorulan soru "sonuç raporu nasıl
   olmalı" değil, "anket nasıl doldurulmalı".

   BAŞKA BİR AJAN aynı anda CANLI teste dokunuyor olabilir (FitTest.tsx ·
   fittest.css · fitTest.ts). Taban ölçümleri 12 Ağustos'ta alındı; canlı taraf
   değişirse sayılar eskir, adayların gerekçesi eskimez çünkü gerekçe teşhise
   dayanıyor.
   ========================================================================= */

export const metadata = {
  title: "Uygunluk anketi · tasarım alternatifleri, ikinci tur | Ortac Global",
  robots: { index: false, follow: false },
};

/* --------------------------------------------------------------- TEŞHİS ----
   Ölçüm ortamı: Chrome, 1400 px genişlikte aynı-kaynak iframe (resize_window
   gerçek yerleşim görünümünü değiştirmiyor, o yüzden ölçüm sabit genişlikli
   iframe içinde alındı). Referans ekran her yerde AYNI: 5. soru ("Banka
   tarafında ne lazım?"), dört soru cevaplanmış hâl. */
const TESHIS: { k: string; v: string; n: string }[] = [
  {
    k: "Canlı ekranın ne kadarı ziyaretçinin KENDİ KAYDI",
    v: "%25,71 · 236.903 px²",
    n: "Dört cevaplanmış ray satırı (238×44,8 px) ile puan paneli (678×275,6 px) toplandı, panelin tamamı 921.279 px². Aday 1'de bu yüzey 0 px². Bu turun tek asıl bulgusu bu satır.",
  },
  {
    k: "Kendi kaydını taşıyan metin bloğu",
    v: "7 / 52",
    n: "Dört cevabın kendi metni ve üç ülkenin puanı. Aday 1'de 0. Ziyaretçinin ekranda kendisine ait tek bir izi kalmıyor.",
  },
  {
    k: "Görülmüş bir soruya tek tıkla dönüş",
    v: "5 hedef",
    n: "Canlıda ray düğmelerinin beşi etkin. Aday 1'de tek hedef var ve o da yalnızca bir önceki soruya götürüyor: 5. sorudan 1. soruya dönüş canlıda 1, Aday 1'de 4 tıklama.",
  },
  {
    k: "Aynı kaydı yazmanın canlıdaki maliyeti",
    v: "40 blok · 880,4 px · 2 bölge",
    n: "Sol ray 29 metin bloğu ve 604,8 px, puan paneli 11 blok ve 275,6 px. Bilgi doğru, sunum pahalı. İki yeni adayın bütün işi bu maliyeti düşürmek.",
  },
  {
    k: "Bir soru ekranında kaç element var",
    v: "232",
    n: "Sorunun kendisi bunun 51'i. Sol ray 101, puan paneli 57 element.",
  },
  {
    k: "Kaç ayrı okuma modu",
    v: "20",
    n: "Punto + kalınlık + renk kombinasyonu. Dokuz soruluk bir formda yirmi ayrı tipografik ton.",
  },
  {
    k: "Sorunun kendisi ekranın ne kadarı",
    v: "%20,56 · cümle 16 px",
    n: "Soru bölgesi 678×279,4 px. Aday 1'de aynı iki sayı %75,12 ve 34 px. Müşterinin \"aday 1 iyi gibi\" dediği şeyin ölçüsü bu.",
  },
  {
    k: "Görsel mürekkep",
    v: "%0,45",
    n: "21 SVG, toplam glif alanı 4.147 px². En büyük tek çizim 20×20 px, 1120 px genişliğinde bir panelde. Aday 1'de en büyük çizim 132×132 px ve mürekkep %3,65.",
  },
  {
    k: "Renk yüzeyi",
    v: "%6,95 · ton 1,14:1",
    n: "Beyazdan tonal uzaklık 1,14:1, yani göz onu bir renk alanı olarak neredeyse hiç kaydetmiyor. Sayfada renk alanı yok, açık gri bir kâğıt var.",
  },
  {
    k: "Dokuz soru kaç tıklama, ne kadar fare yolu",
    v: "18 tıklama · 10.765 px",
    n: "Seçilen şık ile ileri düğmesi arasındaki gidiş gelişin dokuz soruluk toplamı, 1400 px'de ölçüldü.",
  },
  {
    k: "Erişilebilirlik ağacında soru grubu",
    v: "Yok",
    n: "Soru bir <fieldset> ve soru cümlesi bir <legend> ama ağaçta adlı bir `group` düğümü ÇIKMIYOR; legend adsız bir `generic` olarak duruyor. Üç varyant aynı oturumda denendi: yalnız legend → grup yok; aria-label (rolsüz) → `generic`; role=\"group\" + aria-label → adlı `group`. Üç aday da sonuncusunu kullanıyor.",
  },
];

/* --------------------------------------------------------------- KÜNYELER -- */
type Kunye = {
  id: string;
  ad: string;
  kind: string;
  fikir: string;
  tutan: string;
  geri: string;
  gorsel: string;
  feda: string;
};

const KUNYE: Record<"a1" | "a2" | "a3", Kunye> = {
  a1: {
    id: "SAHNE",
    ad: "Aday 1 · korundu",
    kind: "Tek soru, tam sahne · ray yok, puan paneli yok",
    fikir:
      "Yükü yeniden düzenlemiyor, siliyor. Sol ray ve puan paneli ekrandan kalkıyor; kalan yer soruyu büyütmeye harcanıyor. Müşteri bu adaya \"iyi gibi\" dedi ve tek satırı değişmedi.",
    tutan:
      "Soruyu ekranın kendisi yapıyor. Ölçüldü: soru cümlesi 16 px'ten 34 px'e, soru bölgesi ekranın %20,56'sından %75,12'sine çıkıyor; metin bloğu 52'den 13'e, element 232'den 69'a iniyor. İki yeni aday bu kazancı korumak zorunda.",
    geri: "Getirmiyor. Bu adayın bilinen açığı tam olarak bu ve yeni iki adayın var olma sebebi.",
    gorsel:
      "Ölçek. Canlıdaki en büyük çizim 20×20 px (400 px²), buradaki filigran 132×132 px (17.424 px²), yani 44 katı. Yeni bir ikon dili icat edilmedi: aynı lucide, aynı strokeWidth 1.9, büyütülmüş hâli.",
    feda:
      "Ziyaretçinin kendi kaydı sıfır: verilmiş cevaplar ekranda yok (0 metin bloğu, 0 px²), test sürerken puan yok, tek tıkla dönüş yok. 5. sorudan 1. soruya dönmek dört tıklama.",
  },
  a2: {
    id: "DEFTER",
    ad: "Aday 2 · yeni",
    kind: "Soru solda, gece bir defter sağda · durum ayrı bir yerde durur",
    fikir:
      "Kaydı geri getiriyor ama yazmıyor, çiziyor. Her cevap sağdaki gece panele bir satır olarak işleniyor: seçtiğiniz şıkkın kendi ikonu 34 px bir diskte, yanında sorunun kısa adı ve cevabınızın kendi metni. Defterin dibinde üç ülkenin toplamı, muhasebe defterinin kendi mantığı: önce kalemler, sonra toplam.",
    tutan:
      "Soru hâlâ ekranın en büyük öğesi: cümle 30 px, soru sütunu 786×529,8 px. Sağa 348 px verildiği için 34 px'i tutamıyor ama 16'ya da dönmüyor.",
    geri:
      "Üçünü de. Kendi kaydı 7 metin bloğu (canlıyla birebir aynı sayı), tek tıkla dönüş 5 hedef, canlı puan tablosu yerinde. Fark maliyette: canlı bu bilgiyi iki bölgede 40 blok ve 880,4 px ile veriyor, defter tek bölgede 19 blok ve 529,8 px ile.",
    gorsel:
      "Gece yüzey. 348×530 px, ekranın %30,52'si ve beyazdan tonal uzaklığı 18,88:1; canlıdaki tek renk yüzeyi 1,14:1 idi. Üstüne Aday 1'in filigranı bilerek tekrar ediliyor (120×120 px): beğenilen bir hamleyi yeni bir kılığa sokmak tutarlılığı bozardı.",
    feda:
      "Ekranda daha çok şey var: element 69'dan 175'e, metin bloğu 13'ten 32'ye çıkıyor. Bu bilerek, çünkü artan şeyin 7 bloğu ziyaretçinin kendi kaydı. Dar ekranda defter sorunun altına düşüyor, yani 768 px'de bölüm boyu 1.010,9 px oluyor.",
  },
  a3: {
    id: "AKIŞ",
    ad: "Aday 3 · yeni",
    kind: "Tek sütun, cevaplanan soru kendi cevabına katlanır · ayrı durum bölgesi yok",
    fikir:
      "Kayda ayrı bir bölge açmıyor. Cevaplanan soru kendi cevabına katlanıyor ve listede kendi yerinde kalıyor; sol kenarda bir omurga çizgisi var ve her sorunun diski onun üstünde duruyor. Katlanmış sorunun diskinde SİZİN seçtiğiniz şıkkın ikonu var, yani omurga boyunca yukarı bakınca verdiğiniz cevapları ikon ikon görüyorsunuz.",
    tutan:
      "Açık soru akışın tek renkli yüzeyi ve en büyük öğesi: cümle 31 px, kart 1074×356,7 px. Filigran yine orada (108×108 px).",
    geri:
      "Üçünü de, en yüksek payla: kendi kaydına ayrılan yüzey 414.387 px², yani akışın %35,09'u (canlıda %25,71). Katlanmış her soru tek tıkla açılan bir dönüş hedefi. Toplam kartı akışın son halkası, sabit bir panel değil.",
    gorsel:
      "Omurga ve diskler. Enerji geçişi kalıbı (aktarim.css) omurgadan aşağı akıp gece toplam kartını besliyor, yani hareketin cümlesi \"verdiğiniz cevaplar toplamı besledi\". Gece kart 1020×187 px, ekranın %16,17'si, ton 18,88:1.",
    feda:
      "Sayfa uzuyor. 1400 px'de bölüm boyu 1.039,5 px (DEFTER 531,8), 320 px'de 1.595,8 px. Dokuzuncu soruda akışın tamamı ekrandan taşıyor ve kaydırmak gerekiyor. Adayın bütün iddiası bu bedelin karşılığında alınıyor.",
  },
};

/* ---------------------------------------------------------- KIYAS TABLOSU --
   Sayılar tarayıcıda ölçüldü: Chrome, 1400 px sabit genişlikli aynı-kaynak
   iframe. Soru ekranı ölçümleri her adayda AYNI SORUYA bakıyor (5. soru,
   dört cevap girilmiş hâl); başka türlü karşılaştırma adil olmazdı. Taban
   sütunu canlı testin aynı andaki hâli. */
const CMP: { k: string; taban: string; a1: string; a2: string; a3: string }[] = [
  {
    k: "Ziyaretçinin kendi kaydı · yüzey",
    taban: "%25,71 · 236.903 px²",
    a1: "%0 · 0 px²",
    a2: "%19,11 · 115.423 px²",
    a3: "%35,09 · 414.387 px²",
  },
  {
    k: "Ziyaretçinin kendi kaydı · metin bloğu",
    taban: "7",
    a1: "0",
    a2: "7",
    a3: "7",
  },
  {
    k: "O kaydı yazmanın maliyeti",
    taban: "40 blok · 880,4 px · 2 bölge",
    a1: "yok",
    a2: "19 blok · 529,8 px · 1 bölge",
    a3: "akışın içinde, ayrı bölge yok",
  },
  {
    k: "Tek tıkla dönüş hedefi",
    taban: "5",
    a1: "1 · yalnız bir önceki soru",
    a2: "5 · dört kalem + Geri",
    a3: "4 · katlanmış her soru",
  },
  {
    k: "5. sorudan 1. soruya kaç tıklama",
    taban: "1",
    a1: "4",
    a2: "1",
    a3: "1",
  },
  {
    k: "Test sürerken puan görünüyor mu",
    taban: "Evet · 3 satırlık panel",
    a1: "Hayır · sonuçta",
    a2: "Evet · defterin dibinde",
    a3: "Evet · akışın son halkası",
  },
  {
    k: "Sabit bölge sayısı",
    taban: "5 · ray, sayaç, soru, puan paneli, gezinme",
    a1: "3 · çizgi, soru, gezinme",
    a2: "4 · sayaç, soru, defter, gezinme",
    a3: "2 · sayaç, akış",
  },
  {
    k: "Element · bir soru ekranı",
    taban: "232",
    a1: "69",
    a2: "175",
    a3: "161",
  },
  {
    k: "Metin bloğu · bir soru ekranı",
    taban: "52",
    a1: "13",
    a2: "32",
    a3: "30",
  },
  {
    k: "Okuma modu (punto+kalınlık+renk)",
    taban: "20",
    a1: "10",
    a2: "17",
    a3: "16",
  },
  {
    k: "Kenarlı/dolgulu yüzey",
    taban: "41",
    a1: "13",
    a2: "38",
    a3: "30",
  },
  {
    k: "Soru cümlesinin puntosu",
    taban: "16 px",
    a1: "34 px",
    a2: "30 px",
    a3: "31 px",
  },
  {
    k: "Dokuz soru kaç tıklama",
    taban: "18",
    a1: "19 · açılıştaki Başla dahil",
    a2: "18",
    a3: "18",
  },
  {
    k: "Fare yolu · 1400 px · dokuz soru",
    taban: "10.765 px",
    a1: "8.941 px · %17 daha kısa",
    a2: "6.332 px · %41 daha kısa",
    a3: "3.490 px · %68 daha kısa",
  },
  {
    k: "Görsel mürekkep (glif alanı / bölüm alanı)",
    taban: "%0,45 · 4.147 px²",
    a1: "%3,65 · 20.751 px²",
    a2: "%3,44 · 20.785 px²",
    a3: "%1,52 · 17.932 px² (bölüm iki kat uzun olduğu için oran düşük, mutlak alan yakın)",
  },
  {
    k: "En büyük tek çizim",
    taban: "20 × 20 px",
    a1: "132 × 132 px",
    a2: "120 × 120 px",
    a3: "108 × 108 px",
  },
  {
    k: "Renk yüzeyi · alan ve beyazdan tonal uzaklık",
    taban: "%6,95 · ton 1,14:1",
    a1: "%75,12 · sahne 1136×376, ton 1,08:1 (geniş ama SOLUK)",
    a2: "%30,52 gece (348×530, ton 18,88:1) + %68,93 açık mavi (ton 1,08:1)",
    a3: "%16,17 gece (1020×187, ton 18,88:1) + %32,44 açık mavi (ton 1,08:1)",
  },
  {
    k: "Bölüm yüksekliği · 1400 px",
    taban: "822,6 px",
    a1: "500,3 px",
    a2: "531,8 px",
    a3: "1.039,5 px",
  },
  {
    k: "Bölüm yüksekliği · 768 px",
    taban: "880,6 px",
    a1: "513,5 px",
    a2: "1.010,9 px · defter sorunun altına düşüyor",
    a3: "1.098,8 px",
  },
  {
    k: "Bölüm yüksekliği · 320 px",
    taban: "1.247,8 px",
    a1: "796,1 px",
    a2: "1.220,7 px",
    a3: "1.595,8 px",
  },
  {
    k: "Yatay taşma · 320 / 375 / 768 / 1400",
    taban: "0 / 0 / 0 / 0 px",
    a1: "0 / 0 / 0 / 0 px",
    a2: "0 / 0 / 0 / 0 px",
    a3: "0 / 0 / 0 / 0 px",
  },
  {
    k: "En kötü metin kontrastı",
    taban: "5,87:1 · .ft-part-n 10,5 px, --text-600 / --blue-100",
    a1: "6,44:1 · .ank1-help 14,5 px, --text-600 / #f1f7fe",
    a2: "5,36:1 · .ank2-entry-t 10,5 px, #8b8e95 / #191919",
    a3: "5,76:1 · .ank3-tot-note 11,5 px, #8b8e95 / #111111",
  },
  {
    k: "Paylaşılan birincil düğme kontrastı",
    taban: "3,99:1 · .btn-solid, 14,5 px / 600, beyaz üstünde #307fe2",
    a1: "3,99:1 · aynı düğme",
    a2: "3,99:1 · aynı düğme",
    a3: "3,99:1 · aynı düğme",
  },
  {
    k: "Sürekli periyot (getAnimations ile doğrulandı)",
    taban: "5 · 25,1 s · 13,9 s · 10,7 s · 7,1 s · 2,9 s",
    a1: "3 · 12,13 s · 7,19 s · 19,01 s",
    a2: "2 · 11,23 s · 24,11 s",
    a3: "2 · 13,01 s · 16,99 s",
  },
  {
    k: "Soru grubu erişilebilirlik ağacında",
    taban: "Adsız · fieldset + legend `group` üretmiyor",
    a1: "group \"Müşterileriniz ağırlıklı olarak nerede?\"",
    a2: "group \"Banka tarafında ne lazım?\" + complementary \"Cevap defteri\"",
    a3: "group \"Banka tarafında ne lazım?\"",
  },
  {
    k: "Emoji",
    taban: "Yok",
    a1: "Yok · yerine ölçek",
    a2: "Yok · yerine gece yüzey ve ikon diski",
    a3: "Yok · yerine omurga ve ikon diski",
  },
];

function KunyeBlok({ k }: { k: Kunye }) {
  return (
    <div className="ankx-kunye">
      <div className="ankx-kunye-h">
        <span className="ankx-tag">{k.id}</span>
        <span className="ankx-kind">{k.kind}</span>
      </div>
      <p className="ankx-fikir">{k.fikir}</p>
      <dl className="ankx-qa">
        <div className="ankx-qa-i">
          <dt className="ankx-q">Aday 1&apos;in tuttuğu şeyi tutuyor mu</dt>
          <dd className="ankx-a">{k.tutan}</dd>
        </div>
        <div className="ankx-qa-i">
          <dt className="ankx-q">Canlının kaybettirdiğini geri getiriyor mu</dt>
          <dd className="ankx-a">{k.geri}</dd>
        </div>
        <div className="ankx-qa-i">
          <dt className="ankx-q">Hangi görselliği ekliyor</dt>
          <dd className="ankx-a">{k.gorsel}</dd>
        </div>
        <div className="ankx-qa-i">
          <dt className="ankx-q">Feda edilen</dt>
          <dd className="ankx-a">{k.feda}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function LabAnketPage() {
  return (
    <main className="ankx-page">
      {/* ------------------------------------------------------------ GİRİŞ */}
      <section className="ankx-intro">
        <div className="container-o">
          <h1 className="h2 ankx-title">Uygunluk anketi · tasarım alternatifleri, ikinci tur</h1>
          <p className="ankx-lead">
            Müşteri geçen turun üç adayını gördü ve şunu söyledi: birincisi &quot;iyi gibi&quot;,
            diğer ikisi &quot;rezalet&quot;, ama &quot;hâlâ canlıdaki hâli daha iyi&quot;. Üçüncü
            cümle en önemlisi, çünkü üç aday da ölçülebilir biçimde daha sade ve daha görseldi.
            Demek ki canlının taşıdığı bir şey adaylarda yoktu. Bu tur önce o şeyi bulduk, sonra
            iki yeni aday tasarladık: ikisi de Aday 1&apos;in tuttuğunu tutuyor ve canlının
            kaybettirdiğini geri veriyor. Ayrıştıkları eksen renk değil yapı.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------- TEŞHİS */}
      <section className="ankx-teshis">
        <div className="container-o">
          <h2 className="ankx-h">Teşhis</h2>
          <p className="ankx-note">
            Ölçüm ortamı: Chrome, 1400 px genişlikte aynı-kaynak iframe (<code>resize_window</code>{" "}
            gerçek yerleşim görünümünü değiştirmiyor). Referans ekran her yerde aynı: beşinci soru
            (&quot;Banka tarafında ne lazım?&quot;), dört soru cevaplanmış hâl. Hem canlı test hem
            üç aday tarayıcıda baştan sona dolduruldu.
          </p>

          <dl className="ankx-mets">
            {TESHIS.map((t) => (
              <div key={t.k} className="ankx-met">
                <dt className="ankx-met-k">{t.k}</dt>
                <dd className="ankx-met-v">{t.v}</dd>
                <dd className="ankx-met-n">{t.n}</dd>
              </div>
            ))}
          </dl>

          <div className="ankx-find">
            <h3 className="ankx-find-h">Canlı neyi doğru yapıyor</h3>
            <p className="ankx-find-p">
              <b>Ekranın dörtte birini ziyaretçinin kendi kaydına harcıyor.</b> Beşinci soruda
              canlı panelde dört cevabın kendi metni ve üç ülkenin puanı duruyor: 7 metin bloğu ve
              236.903 px², yani 921.279 px²&apos;lik panelin %25,71&apos;i. O kayıt asla yanlış
              olamaz, çünkü tahmin değil olan biten. Üstelik kayda tek tıkla dönülüyor: beş etkin
              hedef var ve beşinci sorudan birinci soruya dönüş tek tıklama.
            </p>
            <p className="ankx-find-p">
              <b>Üç adayda o kayıt yoktu.</b> Aday 1&apos;de aynı üç sayı 0 metin bloğu, 0 px² ve
              tek bir dönüş hedefi (yalnız bir önceki soruya götüren &quot;Geri&quot;); beşinci
              sorudan birinci soruya dönüş dört tıklama. Elenen iki aday da kaydı ya bir sekme
              şeridine indirdi ya da yerine bir öngörü koydu. Geçen turun ölçümü doğruydu ama eksik
              okundu: ekrandaki 45 blok gerçekten çoktu, ancak içlerinden 7&apos;si atılamazdı.
            </p>
            <p className="ankx-find-p">
              <b>Bilgi doğru, sunum pahalı.</b> Canlı o 7 bloğu iki ayrı bölgede, toplam 40 metin
              bloğu ve 880,4 px dikey yer harcayarak veriyor (sol ray 29 blok ve 604,8 px, puan
              paneli 11 blok ve 275,6 px). Kaydı silmek yanlıştı; asıl iş onun maliyetini
              düşürmek. İki yeni adayın tamamı bu cümlenin üstüne kurulu.
            </p>
            <h3 className="ankx-find-h ankx-find-h2">Aday 1 neyi doğru yapıyor</h3>
            <p className="ankx-find-p">
              <b>Soruyu ekranın kendisi yapıyor.</b> Canlıda soru cümlesi 16 px ve soru bölgesi
              ekranın %20,56&apos;sı; Aday 1&apos;de 34 px ve %75,12. Yanında metin yükü dörtte bire
              iniyor (52 blok yerine 13) ve en büyük çizim 20×20&apos;den 132×132 px&apos;e çıkıyor.
              Müşterinin &quot;iyi gibi&quot; dediği şeyin ölçüsü bu üç sayı, o yüzden ikisi de yeni
              adayın sözleşmesine yazıldı: soru cümlesi 30 ve 31 px, filigran 120 ve 108 px.
            </p>
          </div>

          {/* BU KUTU BİR HATA RAPORUNU GERİ ALIYOR. Burada önce "canlı tarafta
              .ft-jump-i kontrastı düşüyor" diye bir kusur bildirilmişti; bağımsız
              denetim ölçtü ve kusur mevcut kodda YOK. Yanlış rapor bir sonraki
              ajanı olmayan bir işe yönlendireceği için silinmedi, düzeltildi:
              yanlış bir teşhisin kaydı da bir karar kaydıdır. */}
          <div className="ankx-bug">
            <h3 className="ankx-bug-h">Geri alınan bir kusur raporu</h3>
            <p className="ankx-bug-p">
              Burada canlı testin sol rayındaki soru rozetinin (<code>.ft-jump-i</code>) metin
              kontrastının düştüğü yazıyordu: beyaz üstüne <code>#307fe2</code>, <b>3,99:1</b>,
              metin eşiği 4,5. Oran doğru ama <b>teşhis yanlış</b>. Mavi zemin yalnızca{" "}
              <code>data-state=&quot;done&quot;</code> hâlinde oluşuyor ve o hâlde rozetin
              içinde rakam değil <code>aria-hidden</code> bir onay işareti var; yani ölçülmesi
              gereken eşik metnin 4,5&apos;i değil grafiğin 3&apos;ü ve oran{" "}
              <b>geçiyor</b>. Rakamın gerçekten göründüğü iki hâlde zemin beyaz:
              &quot;şu anki&quot; 7,14:1, &quot;cevaplanmadı&quot; 6,13:1. Canlı dosyaya
              dokunulmadı, gerek de yokmuş.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- TABAN */}
      <section className="ankx-taban">
        <div className="container-o">
          <h2 className="ankx-h">Taban</h2>
          <p className="ankx-note">
            Bugün canlıda olan hâl: dokuz soru, ekranda aynı anda bir soru, solda dokuz düğmeli bir
            yol haritası, altında üç ülkenin puan tablosu. Adaylar ancak bununla yan yana anlam
            taşıyor ve bu tur geçilmesi gereken şey de bu.
          </p>
          <p className="ankx-taban-l">
            <Link className="ankx-link" href="/araclar/uygunluk-testi">
              Canlı testi aç
            </Link>
            <span className="ankx-taban-s">
              /araclar/uygunluk-testi · bu sayfada gömülü değil, çünkü canlı bileşen başka bir
              ajanın elinde olabilir ve gömülü bir kopya turun ortasında adayları da bozardı.
            </span>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- ADAY 1 */}
      <section className="ankx-aday" id="sahne">
        <div className="container-o">
          <p className="ankx-aday-e">
            {KUNYE.a1.ad}
            <span className="ankx-aday-n">{KUNYE.a1.id}</span>
          </p>
        </div>
        <div className="container-o ankx-demo">
          <AnketSahne />
        </div>
        <div className="container-o">
          <KunyeBlok k={KUNYE.a1} />
        </div>
      </section>

      {/* ------------------------------------------------------------- ADAY 2 */}
      <section className="ankx-aday" id="defter">
        <div className="container-o">
          <p className="ankx-aday-e">
            {KUNYE.a2.ad}
            <span className="ankx-aday-n">{KUNYE.a2.id}</span>
          </p>
        </div>
        <div className="container-o ankx-demo">
          <AnketDefter />
        </div>
        <div className="container-o">
          <KunyeBlok k={KUNYE.a2} />
        </div>
      </section>

      {/* ------------------------------------------------------------- ADAY 3 */}
      <section className="ankx-aday" id="akis">
        <div className="container-o">
          <p className="ankx-aday-e">
            {KUNYE.a3.ad}
            <span className="ankx-aday-n">{KUNYE.a3.id}</span>
          </p>
        </div>
        <div className="container-o ankx-demo">
          <AnketAkis />
        </div>
        <div className="container-o">
          <KunyeBlok k={KUNYE.a3} />
        </div>
      </section>

      {/* ---------------------------------------------------------- ELENENLER
          Bu depoda elenen adayın gerekçesi kayıtta kalıyor: bir sonraki ajan
          aynı fikri yeniden denemesin diye. */}
      <section className="ankx-elen">
        <div className="container-o">
          <h2 className="ankx-h">Elenen iki aday</h2>
          <div className="ankx-find">
            <h3 className="ankx-find-h">FÖY · bölüm başına tek sayfa</h3>
            <p className="ankx-find-p">
              Fikir, soru sayısını değil ekran sayısını düşürmekti: dokuz soru zaten üç bölüme
              ayrılmıştı (fitTest.ts · FIT_PARTS) ve her bölüm bir kâğıt oluyordu, üç soru alt
              alta. Yolculuk ölçülerini gerçekten kazandı: ekran 9&apos;dan 3&apos;e, tıklama
              18&apos;den 12&apos;ye, fare yolu 10.770&apos;ten 5.867 px&apos;e indi. İki yerden
              düştü. Bir, &quot;sıkıcı&quot; şikâyetini neredeyse hiç oynatmadı: çizim alanı
              %0,45&apos;ten yalnızca %0,61&apos;e çıktı ve bir ekranda hâlâ 46 metin bloğu vardı.
              İki, ziyaretçinin kendi kaydını dört sekmeye indirdi, yani bu turun teşhisinde asıl
              kaybedilen şeyi tam olarak kaybetti. Müşterinin cevabı tek kelimeydi:
              &quot;rezalet&quot;. Bileşeni (AnketFoy.tsx) silindi, CSS&apos;i (lab-ank2.css)
              tamamen yenilendi.
            </p>
            <h3 className="ankx-find-h ankx-find-h2">PANO · puan paneli ile görsel aynı şey</h3>
            <p className="ankx-find-p">
              Fikir, canlıdaki iki bölgeyi (puan paneli ve görsel) tek bir koyu göstergede
              birleştirmekti: üç ülke ekranın üstünde üç sütun, cevap verildikçe yükseliyorlar.
              Görsel ölçüleri açık ara kazandı: çizim alanı %20,32 (tabanın 45 katı) ve gösterge
              1136×358 px ile ekranın %48,18&apos;i, beyazdan 18,88:1 uzaklıkta gerçek bir yüzey.
              Düştüğü yer tam olarak bu: ekranın yarısı bir ÖNGÖRÜYE ayrılmıştı ve fitTest.ts o
              öngörünün ilk cevaptan sonra nihai birinciyi yalnızca %48,7 tutturduğunu, KKTC&apos;nin
              ilk cevapta %25 lider görünüp sonda %2,3&apos;e düştüğünü ölçmüştü. Yani ekranın en
              büyük öğesi, ölçülmüş bir yanılgıydı. Ziyaretçinin kendi cevapları ise dokuz noktaya
              inmişti. Müşteri buna da &quot;rezalet&quot; dedi. Bileşeni (AnketPano.tsx) silindi,
              CSS&apos;i (lab-ank3.css) tamamen yenilendi.
            </p>
            <p className="ankx-find-p">
              <b>İkisinden çıkan ortak ders</b> bu turun tasarım kuralı oldu: ziyaretçinin kendi
              kaydı bir süs değil, ekranın taşıdığı en güvenilir bilgi. Sunumu değiştirilebilir,
              yeri değiştirilebilir, ama yerine bir öngörü ya da bir özet konamaz.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- KIYAS */}
      <section className="ankx-cmp">
        <div className="container-o">
          <h2 className="ankx-h">Kıyas</h2>
          {/* TUZAK C: overflow-x taşıyan kap MUTLAKA position:relative, yoksa
              içerideki .sr-only kaçıp belgeyi uzatıyor. Kural CSS'te. */}
          <div className="ankx-cmp-wrap">
            <table className="ankx-table">
              <thead>
                <tr>
                  <th scope="col">Ölçü</th>
                  <th scope="col">Taban</th>
                  <th scope="col">SAHNE</th>
                  <th scope="col">DEFTER</th>
                  <th scope="col">AKIŞ</th>
                </tr>
              </thead>
              <tbody>
                {CMP.map((r) => (
                  <tr key={r.k}>
                    <th scope="row">{r.k}</th>
                    <td>{r.taban}</td>
                    <td>{r.a1}</td>
                    <td>{r.a2}</td>
                    <td>{r.a3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="ankx-note">
            Ölçüm yöntemi: her aday sabit genişlikli aynı-kaynak iframe içinde beşinci soruya kadar
            dolduruldu ve aynı anda ölçüldü. &quot;Metin bloğu&quot; = kendi doğrudan metin düğümü
            olan element. &quot;Okuma modu&quot; = ekrandaki farklı punto + kalınlık + renk üçlüsü
            sayısı. &quot;Kendi kaydı&quot; = ziyaretçinin verdiği cevabın metni ile o cevabın
            ürettiği puanı taşıyan öğeler. Yatay taşma <code>scrollTo(9999,0)</code> sonrası{" "}
            <code>scrollX</code> okunarak ölçüldü, çünkü <code>body</code> üzerinde{" "}
            <code>overflow-x: clip</code> varken <code>scrollWidth</code> yanlış söylüyor. Sürekli
            periyotlar tarayıcıda <code>getAnimations()</code> ile sayıldı; altısı da yüzde birlik
            ızgarada birbirine asal.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ TAVSİYE */}
      <section className="ankx-son">
        <div className="container-o">
          <h2 className="ankx-h">Tavsiye</h2>
          <div className="ankx-son-b">
            <p className="ankx-son-p">
              <b>DEFTER.</b> İkisi de canlıyı geçiyor, ama bu turda alınacak risk kadarını
              DEFTER alıyor.
            </p>
            <p className="ankx-son-p">
              <b>Neden DEFTER.</b> Teşhisin bulduğu üç şeyin üçünü de geri veriyor ve bunu
              canlıdan ucuza yapıyor: ziyaretçinin kendi kaydı yine 7 metin bloğu, tek tıkla dönüş
              yine 5 hedef, puan tablosu yerinde; ama canlı bunu iki bölgede 40 blok ve 880,4 px
              ile yazarken defter tek bölgede 19 blok ve 529,8 px ile çiziyor. Aynı anda Aday
              1&apos;in kazancı da duruyor: soru cümlesi 16 px&apos;ten 30 px&apos;e, filigran
              20×20&apos;den 120×120 px&apos;e. &quot;Sıkıcı&quot; şikâyetine verdiği cevap ise
              ölçülebilir bir yüzey: 348×530 px gece panel, ekranın %30,52&apos;si, beyazdan
              18,88:1 uzaklıkta. Canlıdaki tek renk yüzeyi 1,14:1 idi, yani göz onu renk olarak
              kaydetmiyordu bile.
            </p>
            <p className="ankx-son-p">
              <b>Bir de risk tarafı var ve DEFTER&apos;in riski daha küçük.</b> Sayfanın boyu
              değişmiyor: soru her adımda tam olarak aynı pikselde duruyor, defter sağda birikiyor.
              1400 px&apos;de bölüm boyu 531,8 px, yani canlının (822,6 px) belirgin altında.
              AKIŞ&apos;ta aynı sayı 1.039,5 px ve dokuzuncu soruda akış ekrandan taşıyor. Müşteri
              geçen tur &quot;çok karmaşık hissettirmeye başladı ve içinden çıkamadım&quot; demişti;
              uzayan bir sayfa o cümleye en yakın risk.
            </p>
            <p className="ankx-son-p">
              <b>AKIŞ neden birinci değil, ve hangi cümleyi duyarsak birinci olur.</b> Üç ölçüyü
              açık ara kazanıyor: kendi kaydına ayrılan yüzey %35,09 (canlıda %25,71, DEFTER&apos;de
              %19,11), sabit bölge sayısı 2 (canlıda 5), fare yolu 3.490 px (canlıda 10.765, yani
              %68 aşağı). Cevapların ikon ikon dizildiği omurga, bu turda &quot;anlatmıcaz
              göstericez&quot; motifine en yakın duran çizim. Bedeli tek ve büyük: sayfa uzuyor.
              Müşteri &quot;bir bakışta nerede olduğumu görmek istiyorum&quot; ya da
              &quot;cevaplarımı hep görmek istiyorum&quot; derse doğru cevap AKIŞ&apos;tır;
              &quot;ekran sabit dursun, ben soruya bakayım&quot; derse DEFTER.
            </p>
            <p className="ankx-son-p">
              <b>SAHNE neden hâlâ masada.</b> Ekran başına yükü hâlâ en çok o düşürüyor (13 metin
              bloğu, tabanın dörtte biri) ve müşteri onu beğendi. Ama tek başına bu turun teşhisine
              cevap vermiyor: kendi kaydı 0 blok ve 0 px². Kayda geçsin, çünkü bir gün geri
              dönebilir: <b>müşteri &quot;test sürerken hiçbir şey görünmesin, sadece soru
              olsun&quot; derse doğru cevap SAHNE&apos;dir</b>; ekranı 13 bloğa indiren tek yapı o.
            </p>
            <p className="ankx-son-p">
              <b>Sonraki adım, eğer &quot;hâlâ uzun&quot; derse.</b> DEFTER duruyor ve soru sütunu
              bölüm bölüm gruplanır: ekranda üç soru, üç ekran, 12 tıklama. Bedeli hesaplanabilir,
              çünkü elenen FÖY&apos;ün sayıları elimizde: ekran başına metin bloğu 32&apos;den
              yaklaşık 60&apos;a çıkar ve bu tabanı (52) aşar. Yani bu birleşim ancak defter
              sütunu daraltılarak alınmalı, yoksa &quot;karmaşık&quot; şikâyeti geri gelir.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
