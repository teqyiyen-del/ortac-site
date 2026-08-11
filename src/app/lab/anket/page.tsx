import Link from "next/link";

import AnketSahne from "@/components/lab/AnketSahne";
import AnketFoy from "@/components/lab/AnketFoy";
import AnketPano from "@/components/lab/AnketPano";

/* ============================================================================
   /lab/anket — UYGUNLUK TESTİNE ÜÇ TASARIM ALTERNATİFİ

   ---------------------------------------------------------------------------
   İSTEK, BİREBİR

   "uygunluk anketi çok karmaşık hissettirmeye başladı ve içinden çıkamadım.
    tasarımında bir şeyler yanlış ve eksik gibi geliyor sıkıcı gibi geliyor
    bilemedim labda bi 3 alternatif yapsana bu işe. tamamını tasarlamana gerek
    yok ama 2-3 sayfasını tasarlayıp demo tasarım olarak koysak olur. … şuan
    form çok sıkıcı hiçbir görsel, logo, emoji vb hiçbir şey yok diye sadece
    her şeyi okutmayab çalışıyor. iconlar durumu tamamen kurtarmadı çünkü çok
    geri planda kaldı gibi."

   Ve hâlâ geçerli olan önceki istek: "böyle gerçek bir anket gibi hissettirsin
   … Google anket paneli gibi dursun … biraz şov yap."

   ---------------------------------------------------------------------------
   İKİ ŞİKÂYET ÇELİŞMİYOR, İKİ AYRI ÖLÇÜYE BAKIYORLAR

   "Karmaşık" = ekrandaki YÜK. "Sıkıcı" = ekrandaki GÖRSEL. İkisi de ölçüldü
   (aşağıdaki TEŞHİS bölümü) ve ikisi de doğru çıktı: bir soru ekranında 52
   metin bloğu var ama sorunun kendisi 7'si; 21 çizim var ama hepsinin toplam
   alanı panelin %0,45'i.

   Üç aday bu ikisini FARKLI ORANLARDA çözüyor ve ayrıştıkları eksen görsel dil
   değil YAPI:
     SAHNE  bölgeleri siler          → soru başına yük en düşük
     FÖY    ekran sayısını düşürür   → dokuz ekran yerine üç föy
     PANO   iki bölgeyi birleştirir  → puan paneli ile görsel aynı şey olur

   ---------------------------------------------------------------------------
   NE TAM, NE DEĞİL

   Üçü de dokuz sorunun tamamını gerçekten yürütüyor: soru metinleri, ipuçları
   ve puanlar fitTest.ts'ten, ülke adları ve bayraklar CountryPicker'dan, sonuç
   scoreFit'ten. Tek bir cümle uydurulmadı. Müşteri "2-3 sayfa yeter" demişti;
   dokuzunun da çalışması ek maliyet çıkarmadı çünkü üç kabuk da aynı veriyi
   döngüyle basıyor ve demo ancak gerçekten doldurulabildiğinde bir şey söyler.

   TAMAMLANMAMIŞ OLAN: sonuç ekranı üç adayda da KISALTILMIŞ. Canlı sonuçta
   cevap dökümü, puan pulları, ülke kartları ve üç çıkış düğmesi var; burada
   sıralama, ülke cümlesi, kısıt cümlesi ve fark cümlesi var. Sebep, karşılaştırmayı
   temiz tutmak: bu turda sorulan soru "sonuç raporu nasıl olmalı" değil, "anket
   nasıl doldurulmalı". Sonuç ekranı ayrı bir tur.

   BAŞKA BİR AJAN aynı anda CANLI teste dokunuyor (FitTest.tsx · fittest.css ·
   fitTest.ts). Aşağıdaki taban ölçümleri 11 Ağustos'ta alındı; canlı taraf o
   turda değişirse sayılar eskir, adayların gerekçesi eskimez çünkü gerekçe
   teşhise dayanıyor.
   ========================================================================= */

export const metadata = {
  title: "Uygunluk anketi · üç tasarım alternatifi | Ortac Global",
  robots: { index: false, follow: false },
};

/* --------------------------------------------------------------- TEŞHİS ----
   Ölçüm ortamı: Chrome, /araclar/uygunluk-testi, 1400×1200 aynı-kaynak iframe
   (resize_window gerçek yerleşim görünümünü değiştirmiyor, o yüzden ölçüm
   sabit genişlikli iframe içinde alındı). Referans ekran: 5. soru ("Banka
   tarafında ne lazım?"), dört soru cevaplanmış hâl. */
const TESHIS: { k: string; v: string; n: string }[] = [
  {
    k: "Bir soru ekranında kaç element var",
    v: "232",
    n: "Sorunun kendisi bunun 51'i. Yani ekrandaki her beş elementten dördü soru değil.",
  },
  {
    k: "Kaç ayrı metin bloğu okunuyor",
    v: "52",
    n: "Sorunun kendisi 7 blok. Ziyaretçi cevaplayacağı şeyin yedi katı metnin içinde onu arıyor.",
  },
  {
    k: "Kaç ayrı okuma modu",
    v: "20",
    n: "Punto + kalınlık + renk kombinasyonu. Dokuz soruluk bir formda yirmi ayrı tipografik ton.",
  },
  {
    k: "Kaç ayrı kenarlı/dolgulu yüzey",
    v: "41",
    n: "Göz aynı anda 41 kutu sınırı ayıklıyor.",
  },
  {
    k: "Sabit bölge sayısı",
    v: "5",
    n: "Sol ray · sayaç · soru · puan paneli · gezinme. Rayın solu ile sorunun solu arası 345 px, sorunun ortası ile panelin ortası arası 302 px.",
  },
  {
    k: "Sol ray ne kadar yer tutuyor",
    v: "101 element · 29 metin · 604,8 px",
    n: "Sorunun kendisi 279,4 px. Yani ray, cevaplanacak sorunun iki katından uzun ve metin bloğunun %56'sı orada.",
  },
  {
    k: "Puan paneli ne kadar yer tutuyor",
    v: "57 element · 11 metin · 275,6 px",
    n: "Soruyla neredeyse birebir aynı yükseklikte (279,4 px).",
  },
  {
    k: "Dokuz soru kaç tıklama",
    v: "18",
    n: "Soru başına iki: şıkkı seç, ileri bas. Otomatik geçiş bilerek yok (klavye kullanıcısını sorudan atmasın diye).",
  },
  {
    k: "Fare yolu · 1400 px",
    v: "10.770 px",
    n: "Seçilen şık ile ileri düğmesi arasındaki gidiş gelişin dokuz soruluk toplamı.",
  },
  {
    k: "Görsel mürekkep",
    v: "%0,45",
    n: "21 SVG, toplam glif alanı 4.147 px², panel alanı 921.279 px². En büyük tek çizim 20×20 px.",
  },
  {
    k: "Renk yüzeyi",
    v: "%6,95 · ton 1,14:1",
    n: "İç içe yüzeyler tek sayıldı. Bu %6,95'in 5,85 puanı TEK bir soluk mavi bloktan geliyor: sol raydaki \"şu anki bölüm\" vurgusu (264×204). Geriye 1,10 puan kalıyor. Yüzeyin beyazdan tonal uzaklığı da 1,14:1, yani göz onu bir renk alanı olarak neredeyse hiç kaydetmiyor.",
  },
  {
    k: "Erişilebilirlik ağacında soru grubu",
    v: "Yok",
    n: "Soru bir <fieldset> ve soru cümlesi bir <legend> ama ağaçta adlı bir `group` düğümü ÇIKMIYOR; legend adsız bir `generic` olarak duruyor. Üç varyant aynı oturumda tek tek denendi: yalnız legend → grup yok; aria-label (rolsüz) → `generic` ; role=\"group\" + aria-label → `group \"Müşterileriniz ağırlıklı olarak nerede?\"`. Şıkların kendi aria-label'ı olduğu için okunamayan bir şey yok, ama soru cümlesi grubun adı değil.",
  },
];

/* --------------------------------------------------------------- KÜNYELER -- */
type Kunye = {
  id: string;
  ad: string;
  kind: string;
  fikir: string;
  yuk: string;
  gorsel: string;
  sonuc: string;
  feda: string;
  sayi: [string, string][];
};

const KUNYE: Record<"a1" | "a2" | "a3", Kunye> = {
  a1: {
    id: "SAHNE",
    ad: "Aday 1",
    kind: "Tek soru, tam sahne · ray yok, puan paneli yok",
    fikir:
      "Yükü yeniden düzenlemiyor, siliyor. Sol ray ve puan paneli ekrandan kalkıyor; kalan yer soruyu büyütmeye harcanıyor. Sorunun kendi ikonu 132 px filigran olarak sahnenin arkasına basılıyor, şık ikonları 44 px disklerde 26 px çiziliyor.",
    yuk: "Soru başına metin bloğunu düşürüyor: ekrandaki her şey ya soru ya şık ya da iki düğme. Bölüm bilgisi tek satıra, ilerleme 3 px'lik bir çizgiye iniyor.",
    gorsel:
      "Ölçek. Canlıdaki en büyük çizim 20×20 px (400 px²); buradaki filigran 132×132 px (17.424 px²), yani 43,6 katı. Yeni bir ikon dili icat edilmedi, aynı lucide ve aynı strokeWidth 1.9 büyütüldü.",
    sonuc: "Sorunun yerine geliyor. Aynı sahne, aynı çerçeve, içerik değişiyor.",
    feda:
      "Test sürerken puan yok. Müşteri paneli geçen tur özellikle geri istemişti; bu aday onu sonuca erteliyor. Ayrıca verilen cevapları görmek için geri gitmek gerekiyor, çünkü cevapları listeleyen ray yok.",
    sayi: [],
  },
  a2: {
    id: "FÖY",
    ad: "Aday 2",
    kind: "Bölüm başına tek sayfa · üç soru bir arada",
    fikir:
      "Soru sayısını değil EKRAN sayısını düşürüyor. Dokuz soru zaten üç bölüme ayrılmıştı (fitTest.ts · FIT_PARTS); bu aday o bölümü bir kâğıt yapıyor. Üç soru aynı föyde, alt alta, hepsi görünür; bir cevabı düzeltmek için geri gitmek gerekmiyor.",
    yuk:
      "Ekran 9'dan 3'e, ilerleme düğmesi 9'dan 3'e, tıklama 18'den 12'ye iniyor. Sol rayın yerine dört sekme geçiyor (üç bölüm + sonuç).",
    gorsel:
      "Bölüm bandı: dolu renk alanı, 62 px amblem kabında 34 px ikon, bölüm numarası ve bölümün tek satırlık konusu. Şıklar çip; ikonlu şıkta 26 px disk içinde 18 px glif.",
    sonuc: "Dördüncü föy. Sekme şeridi yerinde kalıyor, geri dönmek bir tıklama.",
    feda:
      "Bir ekranda daha fazla metin. Bu bilerek: sayfa başına yük artıyor, toplam yük ve geçiş sayısı düşüyor. \"Karmaşık\" şikâyeti tek ekrana bakıyorsa bu aday onu tam çözmez.",
    sayi: [],
  },
  a3: {
    id: "PANO",
    ad: "Aday 3",
    kind: "Puan paneli ile görsel aynı şey · koyu gösterge",
    fikir:
      "Canlıdaki dört sabit bölgeden ikisini birleştiriyor. Üç ülke ekranın üstünde üç sütun; cevap verildikçe yükseliyorlar. Ayrıca bir puan paneli yok, çünkü panelin göstereceği şey resmin kendisi. Bir şık seçilince kazanan sütunun dibinden \"+3\" pulu yükseliyor.",
    yuk:
      "Bölge sayısını beşten üçe indiriyor (gösterge · soru · gezinme). Sol ray yok; ilerleme dokuz nokta hâlinde göstergenin içinde, üçlü gruplar bölüm sınırını boşlukla söylüyor.",
    gorsel:
      "En büyük alan bu adayda. Koyu gösterge 1400 px'de yaklaşık 1120×300 px kaplıyor ve arkasındaki yatay çizgiler süs değil skala: sütun boyu puan / 26 (FIT_CEIL).",
    sonuc: "Göstergenin altından açılıyor, gösterge yerinde kalıyor ve sütunlar nihai puanda donuyor.",
    feda:
      "Dürüstlük borcu en büyük olan aday. Puanı ekranın merkezine koymak, fitTest.ts'te ölçülmüş iki olguyu büyütüyor: ilk cevaptan sonra önde görünen ülke nihai birinciyi yalnızca %48,7 tutturuyor ve KKTC ilk cevapta %25 lider görünüp sonda %2,3'e düşüyor. Göstergenin altındaki not bu yüzden süs değil, adayın bedeli.",
    sayi: [],
  },
};

/* ---------------------------------------------------------- KIYAS TABLOSU --
   Sayılar tarayıcıda ölçüldü: Chrome, /lab/anket, sabit genişlikli aynı-kaynak
   iframe. Soru ekranı ölçümleri her adayda AYNI SORUYA bakıyor (5. soru,
   "Banka tarafında ne lazım?", dört cevap girilmiş hâl) — başka türlü
   karşılaştırma adil olmazdı. Taban sütunu canlı testin aynı andaki hâli. */
const CMP: { k: string; taban: string; a1: string; a2: string; a3: string }[] = [
  {
    k: "Bir ekranda kaç soru",
    taban: "1",
    a1: "1",
    a2: "3",
    a3: "1",
  },
  {
    k: "Kaç ekran geçiliyor",
    taban: "9",
    a1: "10 (açılış perdesi dahil)",
    a2: "3",
    a3: "9",
  },
  {
    k: "Sabit bölge sayısı",
    taban: "5 · ray, sayaç, soru, puan paneli, gezinme",
    a1: "3 · çizgi, soru, gezinme",
    a2: "4 · sekme, band, sorular, puan şeridi",
    a3: "3 · gösterge, soru, gezinme",
  },
  {
    k: "Element · bir soru ekranı",
    taban: "232",
    a1: "69",
    a2: "211 · üç soru birden",
    a3: "116",
  },
  {
    k: "Metin bloğu · bir soru ekranı",
    taban: "52",
    a1: "13",
    a2: "46 · üç soru birden",
    a3: "20",
  },
  {
    k: "Metin bloğu · SORU BAŞINA",
    taban: "52",
    a1: "13",
    a2: "15,3",
    a3: "20",
  },
  {
    k: "Okuma modu (punto+kalınlık+renk)",
    taban: "20",
    a1: "10",
    a2: "18",
    a3: "12",
  },
  {
    k: "Kenarlı/dolgulu yüzey",
    taban: "41",
    a1: "13",
    a2: "46",
    a3: "31",
  },
  {
    k: "Dokuz soru kaç tıklama",
    taban: "18",
    a1: "19 (açılıştaki Başla dahil)",
    a2: "12",
    a3: "18",
  },
  {
    k: "Fare yolu · 1400 px · dokuz soru",
    taban: "10.770 px",
    a1: "8.825 px · %18 daha kısa",
    a2: "5.867 px · %46 daha kısa",
    a3: "8.706 px · %19 daha kısa",
  },
  {
    k: "Görsel mürekkep (glif alanı / panel alanı)",
    taban: "%0,45",
    a1: "%3,61 · tabanın 8,0 katı",
    a2: "%0,61 · tabanın 1,4 katı",
    a3: "%20,32 · tabanın 45,2 katı (%0,46 ikon + %19,86 skala çizimi)",
  },
  {
    k: "Renk yüzeyi · alan ve beyazdan tonal uzaklık",
    taban: "%6,95 · en büyük yüzey 264×204, ton 1,14:1",
    a1: "%75,99 · sahne 1136×376, ton 1,08:1 (geniş ama SOLUK)",
    a2: "%16,27 · band 1134×139, ton 1,18:1",
    a3: "%48,18 · gösterge 1136×358, ton 18,88:1",
  },
  {
    k: "En büyük tek çizim",
    taban: "20 × 20 px",
    a1: "132 × 132 px",
    a2: "34 × 34 px",
    a3: "30 × 20 px bayrak · 150 px sütun",
  },
  {
    k: "Test sürerken puan görünüyor mu",
    taban: "Evet · 3 satırlık panel",
    a1: "Hayır · sonuçta",
    a2: "Evet · 3 sütunlu şerit, föy başına bir kez",
    a3: "Evet · ekranın ana görseli",
  },
  {
    k: "İlerleme nerede",
    taban: "Sol rayda (9 düğme) + üstte çubuk + yüzde",
    a1: "Üstte 3 px çizgi + bölüm çentiği",
    a2: "Dört sekme (3 bölüm + sonuç)",
    a3: "Göstergenin içinde dokuz nokta",
  },
  {
    k: "Sonuç nasıl açılıyor",
    taban: "Ray kapanıyor, rapor tüm genişliği alıyor",
    a1: "Sorunun yerine geliyor",
    a2: "Dördüncü föy",
    a3: "Göstergenin altından açılıyor, gösterge kalıyor",
  },
  {
    k: "Bölüm yüksekliği · 1400 px",
    taban: "822,6 px",
    a1: "500,3 px",
    a2: "1.141,5 px · soru başına 380,5 px",
    a3: "755,3 px",
  },
  {
    k: "Bölüm yüksekliği · 768 px",
    taban: "880,6 px",
    a1: "513,5 px",
    a2: "1.253,0 px · soru başına 417,7 px",
    a3: "755,3 px",
  },
  {
    k: "Bölüm yüksekliği · 320 px",
    taban: "1.247,8 px",
    a1: "796,1 px",
    a2: "1.865,3 px · soru başına 621,8 px",
    a3: "905,3 px",
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
    taban: "5,87:1 · .ft-part-n 10,5 px ve .ft-jump-a 11,5 px, --text-600 / --blue-100",
    a1: "6,69:1 · .ank1-help 14,5 px, --text-600 / #f1f7fe",
    a2: "5,87:1 · .ank2-tab-n 10,5 px, --text-600 / --blue-100",
    a3: "6,69:1 · .ank3-help 13,5 px, --text-600 / beyaz",
  },
  {
    k: "Sürekli periyot (getAnimations ile doğrulandı)",
    taban: "5 · 25,1 s · 13,9 s · 10,7 s · 7,1 s · 2,9 s",
    a1: "3 · 12,13 s · 7,19 s · 19,01 s",
    a2: "2 · 16,07 s · 5,03 s",
    a3: "3 · 21,13 s · 9,29 s · 4,09 s",
  },
  {
    k: "Paylaşılan birincil düğme kontrastı",
    taban: "3,99:1 · .btn-solid, 14,5 px / 600, beyaz üstünde #307fe2",
    a1: "3,99:1 · aynı düğme",
    a2: "3,99:1 · aynı düğme",
    a3: "3,99:1 · aynı düğme",
  },
  {
    k: "Soru grubu erişilebilirlik ağacında",
    taban: "Adsız · fieldset + legend `group` üretmiyor",
    a1: "group \"Müşterileriniz ağırlıklı olarak nerede?\"",
    a2: "group \"Soru 5: Banka tarafında ne lazım?\"",
    a3: "group \"Banka tarafında ne lazım?\"",
  },
  {
    k: "Emoji",
    taban: "Yok",
    a1: "Yok · yerine ölçek (bkz. künye)",
    a2: "Yok · yerine renk bandı ve amblem",
    a3: "Yok · yerine koyu gösterge ve bayrak",
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
          <dt className="ankx-q">Hangi yükü azaltıyor</dt>
          <dd className="ankx-a">{k.yuk}</dd>
        </div>
        <div className="ankx-qa-i">
          <dt className="ankx-q">Hangi görselliği ekliyor</dt>
          <dd className="ankx-a">{k.gorsel}</dd>
        </div>
        <div className="ankx-qa-i">
          <dt className="ankx-q">Sonuç nasıl açılıyor</dt>
          <dd className="ankx-a">{k.sonuc}</dd>
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
          <h1 className="h2 ankx-title">Uygunluk anketi · üç tasarım alternatifi</h1>
          <p className="ankx-lead">
            Müşterinin bu turdaki cümlesi iki şey birden söylüyor ve ikisi çelişmiyor:
            &quot;çok karmaşık hissettirmeye başladı&quot; (ekrandaki yük fazla) ve &quot;çok
            sıkıcı, hiçbir görsel yok&quot; (ekrandaki görsel az). İkisi de ölçüldü, ikisi de
            doğru çıktı. Üç aday bu ikisini farklı oranlarda çözüyor ve ayrıştıkları eksen
            görsel dil değil YAPI.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------- TEŞHİS */}
      <section className="ankx-teshis">
        <div className="container-o">
          <h2 className="ankx-h">Teşhis</h2>
          <p className="ankx-note">
            Ölçüm ortamı: Chrome, <code>/araclar/uygunluk-testi</code>, 1400×1200 aynı-kaynak
            iframe. Referans ekran beşinci soru (&quot;Banka tarafında ne lazım?&quot;), dört soru
            cevaplanmış hâl. Testin tamamı tarayıcıda baştan sona dolduruldu; dokuz soru boyunca
            element sayısı 148 ile 238, metin bloğu 43 ile 55 arasında gidip geldi.
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
            <h3 className="ankx-find-h">Üç okuma</h3>
            <p className="ankx-find-p">
              <b>Bir.</b> &quot;Karmaşık&quot; şikâyetinin kaynağı soru değil, sorunun etrafı.
              Ekrandaki metnin %87&apos;si (52 blokun 45&apos;i) cevaplanacak sorunun dışında.
              En büyük tek kalem sol ray: 29 metin bloğu ve 604,8 px, yani sorunun kendisinden
              (279,4 px) iki kat uzun. Ray dokuz sorunun tamamını ve verilmiş cevapları her
              ekranda yeniden basıyor.
            </p>
            <p className="ankx-find-p">
              <b>İki.</b> &quot;İkonlar geri planda kaldı&quot; iddiası ölçümle DOĞRULANDI, hem de
              iddia edilenden sert: ikonlar geri planda değil, yok denecek kadar küçük. Yirmi bir
              çizimin toplam alanı panelin binde dördü ve en büyük çizim 1120 px genişliğinde bir
              panelde 20×20 piksel. Renk yüzeyi de aynı hikâyeyi anlatıyor: ölçülen %6,95&apos;in
              5,85 puanı tek bir soluk mavi bloktan geliyor (raydaki &quot;şu anki bölüm&quot;
              vurgusu) ve o yüzeyin beyazdan tonal uzaklığı 1,14:1. Yani sayfada gerçekten bir
              renk alanı yok, açık gri bir kâğıt var.
            </p>
            <p className="ankx-find-p">
              <b>Üç · dokuz soru fazla mı?</b> Ölçüm &quot;hayır&quot; diyor, ama şartlı. Soru
              başına yük zaten düşük (7 metin bloğu, 2 tıklama); testi uzun hissettiren şey soru
              sayısı değil, her sorunun yanında duran 45 blokluk çerçevenin dokuz kez yeniden
              okunması. Yine de bir sayı var: dokuz soru 18 tıklama ve 1400 px&apos;de 10.770 px
              fare yolu demek. Beşten dokuza çıkış içeriksel olarak gerekçeliydi (dört yeni soru
              da sitenin kendi verisinden türüyor, fitTest.ts) ve bu turda soruların içeriğine
              dokunulmadı; adaylar aynı dokuz soruyu farklı yapılarda soruyor. Soru sayısını
              düşürmek ayrı bir karar ve ağırlıklar teyit edilmeden alınmamalı.
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
            Bugün canlıda olan hâl: dokuz soru, ekranda aynı anda bir soru, solda dokuz düğmeli
            bir yol haritası, altında üç ülkenin puan tablosu. Adaylar ancak bununla yan yana
            anlam taşıyor.
          </p>
          <p className="ankx-taban-l">
            <Link className="ankx-link" href="/araclar/uygunluk-testi">
              Canlı testi aç
            </Link>
            <span className="ankx-taban-s">
              /araclar/uygunluk-testi · bu sayfada gömülü değil, çünkü canlı bileşen bu tur başka
              bir ajanın elinde ve gömülü bir kopya turun ortasında adayları da bozardı.
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
      <section className="ankx-aday" id="foy">
        <div className="container-o">
          <p className="ankx-aday-e">
            {KUNYE.a2.ad}
            <span className="ankx-aday-n">{KUNYE.a2.id}</span>
          </p>
        </div>
        <div className="container-o ankx-demo">
          <AnketFoy />
        </div>
        <div className="container-o">
          <KunyeBlok k={KUNYE.a2} />
        </div>
      </section>

      {/* ------------------------------------------------------------- ADAY 3 */}
      <section className="ankx-aday" id="pano">
        <div className="container-o">
          <p className="ankx-aday-e">
            {KUNYE.a3.ad}
            <span className="ankx-aday-n">{KUNYE.a3.id}</span>
          </p>
        </div>
        <div className="container-o ankx-demo">
          <AnketPano />
        </div>
        <div className="container-o">
          <KunyeBlok k={KUNYE.a3} />
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
                  <th scope="col">FÖY</th>
                  <th scope="col">PANO</th>
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
            Ölçüm yöntemi: her aday sabit genişlikli aynı-kaynak iframe içinde beşinci soruya
            kadar dolduruldu ve aynı anda ölçüldü. &quot;Metin bloğu&quot; = kendi doğrudan metin
            düğümü olan element. &quot;Okuma modu&quot; = ekrandaki farklı punto + kalınlık +
            renk üçlüsü sayısı. Yatay taşma <code>scrollTo(9999,0)</code> sonrası{" "}
            <code>scrollX</code> okunarak ölçüldü, çünkü <code>body</code> üzerinde{" "}
            <code>overflow-x: clip</code> varken <code>scrollWidth</code> yanlış söylüyor.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ TAVSİYE */}
      <section className="ankx-son">
        <div className="container-o">
          <h2 className="ankx-h">Tavsiye</h2>
          <div className="ankx-son-b">
            <p className="ankx-son-p">
              <b>PANO.</b> Üçünün de kazandığı bir ölçü var, temiz galibiyet yok; seçim hangi
              şikâyetin daha pahalı olduğuna bakıyor.
            </p>
            <p className="ankx-son-p">
              <b>Neden PANO.</b> &quot;Sıkıcı&quot; şikâyetini sayıyla karşılayan tek aday bu.
              Çizim alanını %0,45&apos;ten %20,32&apos;ye çıkarıyor (45 kat) ve ekrana beyazdan
              18,88:1 uzaklıkta gerçek bir yüzey koyuyor; SAHNE&apos;nin geniş görünen yüzeyi ise
              1,08:1, yani tabandan bile SOLUK, o adayın görsel cevabı renk değil ölçek. Aynı anda
              PANO &quot;karmaşık&quot; tarafında da ikinci sırada: bir soru ekranındaki metin
              bloğu 52&apos;den 20&apos;ye (%62 aşağı), element 232&apos;den 116&apos;ya, sabit
              bölge 5&apos;ten 3&apos;e iniyor. Üstüne, müşterinin geçen tur özellikle geri
              istediği puan panelini KALDIRMIYOR; onu ekranın kendisi yapıyor, yani &quot;biraz
              şov yap&quot; ile &quot;puan dursun&quot; aynı hamlede karşılanıyor.
            </p>
            <p className="ankx-son-p">
              <b>Bedeli ve şartı.</b> Puanı merkeze almak, fitTest.ts&apos;te ölçülmüş iki olguyu
              büyütüyor: ilk cevaptan sonra önde görünen ülke nihai birinciyi yalnızca %48,7
              tutturuyor ve KKTC ilk cevapta %25 lider görünüp sonda %2,3&apos;e düşüyor.
              Tavsiyenin şartı bu yüzden tek ve pazarlıksız: göstergenin altındaki not kalacak.
              Not silinirse aday, ölçtüğümüz bir yanılgıyı ekranın en büyük öğesi hâline getirmiş
              olur.
            </p>
            <p className="ankx-son-p">
              <b>FÖY neden birinci değil.</b> Yolculuk ölçülerinin tamamını o kazanıyor: ekran
              9&apos;dan 3&apos;e, tıklama 18&apos;den 12&apos;ye, fare yolu 10.770&apos;ten
              5.867 px&apos;e (%46 aşağı). Ama &quot;sıkıcı&quot; tarafını neredeyse hiç
              oynatmıyor: çizim alanı %0,45&apos;ten yalnızca %0,61&apos;e çıkıyor ve bir ekranda
              hâlâ 46 metin bloğu var. Müşterinin cümlesi (&quot;tasarımında bir şeyler yanlış ve
              eksik gibi geliyor&quot;) tek bir ekrana bakıyor, yolculuğun uzunluğuna değil.
            </p>
            <p className="ankx-son-p">
              <b>SAHNE neden birinci değil.</b> Ekran başına yükü en çok o düşürüyor (13 metin
              bloğu, tabanın dörtte biri) ve bu gerçek bir kazanç. İki şeyden dolayı ikinci
              sırada: puan panelini test sürerken tamamen kaldırıyor, yani geçen turda verilmiş
              bir kararı geri alıyor; ve görsel cevabı yalnızca ölçek olduğu için ekran hâlâ
              beyaz bir sayfa gibi duruyor (yüzey tonu 1,08:1). Yine de kayda geçsin:{" "}
              <b>müşteri bir gün &quot;puan paneli dursun&quot; kararından dönerse doğru cevap
              SAHNE&apos;dir</b>, çünkü panel gidince ekranı 13 metin bloğuna indiren tek yapı o.
            </p>
            <p className="ankx-son-p">
              <b>Sonraki adım, eğer &quot;hâlâ uzun&quot; derse.</b> PANO&apos;nun göstergesi
              yerinde kalır, soru şeridi FÖY&apos;ün gruplamasını alır: ekranda üç soru, üç ekran,
              12 tıklama. Ölçülen bedeli hesaplanabilir, çünkü iki adayın da sayıları elimizde:
              ekran başına metin bloğu 20&apos;den yaklaşık 34&apos;e çıkar, yani tabanın (52)
              hâlâ üçte bir altında kalır. Bu birleşim ancak PANO ile mümkün; SAHNE ile değil,
              çünkü SAHNE&apos;nin bütün kazancı ekranda tek soru olmasından geliyor.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
