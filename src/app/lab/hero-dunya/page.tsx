import Hero from "@/components/Hero";
/* G1 (düz dünya haritası) SİLİNDİ: bileşen, CSS ve buradaki aday kaydı.
   Fikir zaten tutmamıştı ve yalnızca kayıt olarak duruyordu; müşteri bu turda
   kaydı da kaldırttı ("lab temizliği: … g1"). Neden tutmadığı hâlâ okunabilir
   olsun diye gerekçesi CANDIDATES'in üstündeki nota taşındı. */
import HeroGlobeG2 from "@/components/lab/HeroGlobeG2";
import HeroGlobeG3 from "@/components/lab/HeroGlobeG3";
import HeroGlobeG4 from "@/components/lab/HeroGlobeG4";
import HeroGlobeG5 from "@/components/lab/HeroGlobeG5";
import HeroGlobeG6 from "@/components/lab/HeroGlobeG6";

/* Ana sayfa hero'sundaki dünyaya alternatifler.
 *
 * Şikâyet klişeydi: noktalı dönen küre bu sektörde herkeste var. Mekanik
 * korunuyor (ülke seçici üstte, seçim sahneyi değiştiriyor), giden şey yalnızca
 * kürenin kendisi.
 *
 * ------------------------------------------------ BU TURDA DEĞİŞEN: ÇERÇEVE
 * Sayfa önceden adayları çıplak gösteriyordu — koyu bir zeminde tek başına
 * sahne. Müşterinin isteği açıktı: "bu canlandırmaları gerçekten şu anki hero
 * tasarımımızın içindeymiş gibi simüle edip gösterir misin, başlığımız vb ile
 * birlikte yani." Haklı bir istek, çünkü çıplak sahne yanlış soruyu sordurur.
 * Tek başına bakınca insan "bu animasyon güzel mi" diye bakar; oysa karar
 * verilecek şey o değil — sahne başlığın altında, butonların arkasında,
 * bayrakların komşuluğunda ne yapıyor, ilk ekranı kalabalıklaştırıyor mu,
 * gözü başlıktan mı çalıyor yoksa ona zemin mi oluyor. Bunların hiçbiri sahne
 * yalnızken görünmez.
 *
 * Çerçeve hero'nun KOPYASI değil: aşağıdaki üç blok da src/components/Hero.tsx'i,
 * yani canlıdaki hero'nun kendisini çağırıyor; yalnızca `scene` propu doluyor.
 * Kopya çıkarmak ilk gün birebir görünür, üçüncü gün canlıyla ayrışır ve
 * müşteri farkında olmadan hero'yu değil hero taklidini değerlendirir. Bu
 * kurulumda başlık, alt satır, buton ölçüleri, boşluk ritmi (--hero-s/m/l) ve
 * 100dvh'lik ilk ekran şartı ana sayfadan ne ise burada da odur; canlıda hero
 * değişirse bu sayfa kendiliğinden onunla değişir.
 *
 * ÜST BARIN YOKLUĞU KASITLI. Hero'nun tepesindeki boşluk sabit navigasyon
 * çubuğu için ayrılan yer (padding-top: 77px + bölüm ritmi) ve o boşluk
 * korunuyor, yani başlığın ekranda oturduğu yükseklik doğru. Çubuğun kendisi
 * basılmıyor: Nav position:fixed, üç hero alt alta dururken tek bir sabit çubuk
 * ikinci ve üçüncü adayın üstüne yapışır ve lab'in kendi şeridiyle çakışırdı.
 *
 * ÜLKE SEÇİMİ ÜÇÜNDE ORTAK. Seçici zustand'daki tek mağazayı okuyor, o yüzden
 * bir adayda Londra'ya geçmek diğer ikisini de Londra'ya alıyor. Bunu bilerek
 * bozmadım: karşılaştırma ancak üç sahne aynı ülkeyi gösterirken adil.
 *
 * Üçü de seçiciyi kendileri render ediyor — canlıdaki HeroGlobe gibi tek parça,
 * yani birini seçince doğrudan yerine konabilir. */

/* SIRA KASITLI: yeni üçlü önce, sonra beğenilen ikisi.
   Karar verilecek olan yeni adaylar; G2 ve G3 karşılaştırma için hemen
   altlarında duruyor ("bunlar kadar iyi mi?" sorusu ancak yan yana sorulur).

   G1 ARTIK YOK. Düz dünya haritası üzerinde kayan bir kameraydı; bayrak
   seçilince ülkeye yaklaşıp İstanbul'dan yay çiziyordu. İki ölçülmüş sebeple
   elenmişti: sahne kutusu 4,66:1 iken harita plakası 2,55:1, yani "bütün
   dünyayı göster" bu kutuda geometrik olarak mümkün değildi; ve İstanbul'dan
   yay çekmek müşteri tabanını yanlış anlatıyordu ("bizim müşteriler sadece
   tr de değil"). Kayıt bu paragraf; dosyaları bu turda silindi. */
const CANDIDATES = [
  {
    id: "G4",
    anchor: "aday-g4",
    kind: "Belge · masa mesafesi",
    Scene: HeroGlobeG4,
    idea:
      "Kuruluşun sonunda elinize geçen evrakın kendisi: üç ülkenin belgesi masada bir deste hâlinde duruyor, seçilen ülkeninki öne gelip ışığı üstüne alıyor. Kâğıt oranı, mühür yeri, alan düzeni, damga açısı ve ortam ışığı ülkeye göre baştan farklı.",
    why:
      "Hero'ya gelen kişi \"bu firma dünya çapında mı\" diye düşünmüyor, \"kurunca elime ne geçiyor\" diye düşünüyor — sahne tam o sorunun cevabını gösteriyor. Kâğıtların üstünde tek harf yok: numara, tarih, imza, arma yok, hepsi stilize çubuk. Sahte resmî evrak üretmeden belgenin BİÇİMİ tanınıyor. Üç adayın içindeki tek aydınlık sahne.",
  },
  {
    id: "G5",
    anchor: "aday-g5",
    kind: "Pencere · içeriden",
    Scene: HeroGlobeG5,
    idea:
      "Kamera içeride: pencerenin önünde oturuyorsunuz. Çerçeve, pervaz ve pervazdaki masa üç ülkede de aynı; değişen tek şey camın arkasındaki ışık — kaynağın yüksekliği ve yönü, ufkun keskinliği, camın hâli (toz / yağmur izi / temiz), pervazdaki ışığın erişimi ve masadaki gölgenin boyu.",
    why:
      "G2 şehre dışarıdan bakıyor; bu onu tersine çeviriyor — şehri seyretmiyorsunuz, içinde oturuyorsunuz. Sabit çerçeve + değişen manzara, ülke seçiminin ne demek olduğunu tek hamlede söylüyor: iş aynı iş, yer değişiyor. Camın arkasında tanınabilir tek kütle yok, yani siluet diline düşmüyor.",
  },
  {
    id: "G6",
    anchor: "aday-g6",
    kind: "Üstten · vaziyet planı",
    Scene: HeroGlobeG6,
    idea:
      "Tek dik açı: tam tepeden, parsel ölçeğinde bir pafta. Vurgulanan parsel üç ülkede de tuvalin tam merkezinde ve kıpırdamıyor — değişen etrafı. Dubai planlı ızgara, İngiltere avlulu ve kaçık köşeli birikmiş doku, KKTC seyrek ve eğik yerleşim.",
    why:
      "Diğer bütün adaylar yatay bakıyor. Ölçek \"gezegen\" değil \"parsel\" ve bunu ilan eden şey metre cinsinden ölçek çubuğu — ölçeğini metreyle yazan şey harita olamaz. Üç ölçeğin farklı olması (100 / 60 / 120 m) dokunun tanesinin gerçekten farklı olduğunu söylüyor. Ayrıca ızgara-organik farkı, sitenin zaten anlattığı serbest bölge / mainland ayrımıyla aynı dili konuşuyor.",
  },
  {
    id: "G2",
    anchor: "aday-g2",
    kind: "Yer · siluet",
    Scene: HeroGlobeG2,
    idea:
      "Dünya hiç çizilmiyor: seçilen ülke kendi ufkuyla anlatılıyor — Dubai'nin dikey kulesi, Londra'nın karışık hattı, Girne'nin yatay Beşparmak sırtı ve kalesi. Üç derinlik katmanı farklı hızlarda kayıyor.",
    why:
      "Harita coğrafyayı anlatır (\"burası dünyanın şurası\") ve o cümleyi herkes aynı küreyle kuruyor; siluet YERİ anlatır ve kopyalanamaz, çünkü çizim ülkenin kendisine ait. Mekanik farkı da yüzeysel değil: küre bir nesnenin döndürülmesi, buradaki bir yolculuk.",
  },
  {
    id: "G3",
    anchor: "aday-g3",
    kind: "Sokak cephesi",
    Scene: HeroGlobeG3,
    idea:
      "Seçilen ülkede kurulmuş şirketin kendisi: bir sokak cephesi, üstünde yanan tek kapı, yanında \"Şirketiniz · o ülkenin tüzel biçimi\" yazan tabela.",
    why:
      "Ölçek tersine döndü — küre 10.000 km'den bakıyordu, bu sahne göz hizasından bir adresin önünden bakıyor. Coğrafya sıfır: projeksiyon, kıyı çizgisi, İstanbul rotası, nokta bulutu yok. Şehir silueti de bilerek elendi: Dubai skyline'ı bu sektörde küreden bile büyük klişe.",
  },
];

/* Açıklama bandının zemini. Hero'nun gecesi #080808; bant bir ton açık
   (#111111) ve altında saç teli bir çizgi var. Amaç dekor değil sınır: müşteri
   nerede bizim notumuzun bittiğini, nerede hero'nun başladığını tek bakışta
   görmeli, yoksa rozet ve açıklama metni hero'nun ilk ekranının parçasıymış
   gibi okunur — ki tam da bu turda düzeltmeye çalıştığımız şey buydu. */
const BAND: React.CSSProperties = {
  background: "#111111",
  borderTop: "1px solid #262626",
  borderBottom: "1px solid #262626",
  padding: "26px 0 24px",
};

const BADGE: React.CSSProperties = {
  display: "inline-flex",
  padding: "5px 12px",
  borderRadius: 999,
  background: "#152333",
  border: "1px solid #284469",
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#9cc6f5",
};

/* Bağlantıyla gelen bölümün tepesinin, lab'in sticky şeridinin altında
   kalmaması için bırakılan pay. Şerit sabit yükseklikte DEĞİL: içindeki
   sayfa hapları pencere daraldıkça alt satıra kayıyor, 1440'ta iki satır
   (ölçtüm: 106px), dar ekranda üç. Tek bir sayı bu yüzden tam tutturamaz, o
   yüzden bilerek cömert: fazla pay verilirse üstte bir parça koyu hero
   görünür, eksik verilirse adayın rozeti çubuğun altında kaybolur — ikisi
   arasında görünür olan yanılgı tercih edilir. */
const ANCHOR_GAP = 132;

const JUMP: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "9px 16px",
  borderRadius: 999,
  border: "1px solid #262626",
  background: "#111111",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 13,
  color: "#e6e6e6",
  textDecoration: "none",
};

export default function LabHeroWorldPage() {
  return (
    <main style={{ background: "var(--night)" }}>
      <div className="container-o" style={{ padding: "48px 0 40px" }}>
        <h1 className="h2" style={{ color: "#ffffff" }}>
          Hero dünyası — üç alternatif, tam hero içinde
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "66ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "#9c9c9c",
          }}
        >
          Küre gidiyor, mekanik kalıyor: ülke seçici üstte duruyor ve seçim sahneyi
          değiştiriyor. Üç aday da bu sayfada çıplak değil, hero&apos;nun tamamının
          içinde — başlık, alt satır, butonlar ve bayraklar canlıdaki yerlerinde.
          Çerçeve taklit değil, canlı hero bileşeninin kendisi; değişen tek şey
          sahne.
        </p>
        <p
          style={{
            marginTop: 10,
            maxWidth: "66ch",
            fontSize: 13.5,
            lineHeight: 1.6,
            color: "#707070",
          }}
        >
          Üstteki sabit menü çubuğu bilerek basılmadı — üç hero alt alta dururken
          tek bir sabit çubuk aşağıdaki adayların üzerine yapışırdı. Çubuğun
          kapladığı yer yine de boş bırakıldı, yani başlığın ekrandaki yüksekliği
          canlıdakiyle aynı. Bayraklardan ülke değiştirmek üç adayı birden
          değiştirir; karşılaştırma ancak üçü aynı ülkeyi gösterirken adil.
        </p>

        {/* Her aday tam ekran kapladığı için sayfa uzun: üç hero + üç açıklama
            bandı, aşağı doğru ~3.5 ekran. Şerit bunun için var, aday listesini
            en başta bir arada görmek ve doğrudan birine atlamak için.
            Sticky YAPILMADI: sayfanın tek işi hero'yu olduğu gibi göstermek,
            ekranın üstünde sürekli duran ikinci bir çubuk ilk ekranı örter ve
            değerlendirmeyi bozar. Şeridin kaybolmaması için her adayın kendi
            bandında "adaylar" bağlantısı var, o da buraya geri getiriyor. */}
        <div
          id="adaylar"
          style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28, scrollMarginTop: ANCHOR_GAP }}
        >
          {CANDIDATES.map((c) => (
            <a key={c.id} href={`#${c.anchor}`} style={JUMP}>
              <b style={{ fontWeight: 700, color: "#9cc6f5" }}>{c.id}</b>
              {c.kind}
            </a>
          ))}
        </div>
      </div>

      {CANDIDATES.map(({ id, anchor, kind, Scene, idea, why }) => (
        <section key={id} id={anchor} style={{ scrollMarginTop: ANCHOR_GAP }}>
          <div style={BAND}>
            <div className="container-o">
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={BADGE}>
                  {id} · {kind}
                </span>
                <a
                  href="#adaylar"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: "#707070",
                    textDecoration: "none",
                  }}
                >
                  ↑ adaylar
                </a>
              </div>
              <p
                style={{
                  margin: "14px 0 6px",
                  maxWidth: "66ch",
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "#9c9c9c",
                }}
              >
                {idea}
              </p>
              <p
                style={{
                  margin: 0,
                  maxWidth: "70ch",
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  color: "#707070",
                }}
              >
                <b style={{ fontWeight: 600 }}>Küreden nerede ayrılıyor:</b> {why}
              </p>
            </div>
          </div>

          {/* Canlı hero, tek farkı sahnesi. partners={false} çünkü hero'nun
              altındaki ortak şeridi burada üç kez basılırdı: aynı on ismin üç
              kopyası sayfayı bir ekran daha uzatır ve iki aday arasına, ikisiyle
              de ilgisi olmayan bir bant sokardı. Şeridin kendisi ana sayfada
              aynı yerde duruyor; burada değerlendirilen şey o değil. */}
          <Hero scene={<Scene />} partners={false} />
        </section>
      ))}
    </main>
  );
}
