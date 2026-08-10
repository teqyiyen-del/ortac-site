import Hero from "@/components/Hero";
import HeroPortalP1 from "@/components/lab/HeroPortalP1";
import HeroPortalP2 from "@/components/lab/HeroPortalP2";
import HeroPortalP3 from "@/components/lab/HeroPortalP3";

/* /lab/hero-portal — hero sahnesinin "portal" okumaları.
 *
 * ------------------------------------------------------------------ İSTEK
 * Müşterinin ortağının cümlesi birebir şu: "Hero da bir şeyler eksik, Dubai
 * vesaire iyi hoş ta bunu biraz daha portal kafasında ilerletip işte seçince
 * portal kafasında olmasını sağlayabiliriz bence işte dubai seçince
 * burjkhalifa gözüksün gibi gibi."
 *
 * İçindeki iki ayrı istek ayrıştırıldı, çünkü ikisi ayrı şeyler:
 *   (a) SEÇİM BİR EŞİĞE BAKMA HİSSİ VERSİN — "portal kafası".
 *   (b) SEÇİLEN ÜLKENİN KENDİSİ KARŞIYA ÇIKSIN — "Burj Khalifa gözüksün".
 * Bugünkü hero (a)'yı zaten yapıyor: üç kapılı bir sokak, seçilen kapının
 * ışığı yanıyor. Eksik olan (b): ülke yalnızca ışığın RENGİYLE anlatılıyor,
 * kendi biçimiyle değil. Üç aday da (b)'yi getiriyor; ayrıştıkları yer
 * PORTALIN NE OLDUĞU.
 *
 * ÜÇÜ AYNI FİKRİN ÜÇ TONU DEĞİL, ÜÇ AYRI OKUMA:
 *   P1  portal = İÇİNDEN BAKILAN AÇIKLIK   (kapı sabit, arkasındaki ülke değişir)
 *   P2  portal = İÇİNDEN GEÇİLEN KORİDOR   (derinlik; ışık öbür taraftan gelir)
 *   P3  portal = ÜLKENİN GEÇTİĞİ SINIR     (kütle halkayı kırıp bu tarafa çıkar)
 *
 * -------------------------------------------------------------- ÇERÇEVE
 * Dört bölümün dördü de src/components/Hero.tsx'i, yani canlıdaki hero'nun
 * kendisini basıyor; değişen tek şey `scene` propu. Hero'nun bir kopyasını
 * çıkarmak en kötü seçenekti: kopya ilk gün birebir, üçüncü gün yalan olur ve
 * müşteri hero'yu değil hero taklidini değerlendirmeye başlar. Başlık, alt
 * satır, buton ölçüleri, boşluk ritmi (--hero-s/m/l) ve 100dvh'lik ilk ekran
 * şartı burada ana sayfadaki ne ise odur.
 *
 * EN ÜSTTEKİ BÖLÜM TABAN: propsuz <Hero /> çağrısı, yani BUGÜN CANLIDA NE
 * VARSA O (HeroScene · .hsc-). Tek satırı değiştirilmedi, yalnızca okundu.
 * Adaylar ancak tabanla yan yana anlam taşıyor: soru "bu güzel mi" değil,
 * "bugünkünden daha mı iyi".
 *
 * ÜST BARIN YOKLUĞU KASITLI. Hero'nun tepesindeki boşluk sabit navigasyon
 * çubuğu için ayrılan yer ve o boşluk duruyor, yani başlığın ekranda oturduğu
 * yükseklik doğru. Çubuğun kendisi basılmıyor: Nav position:fixed ve dört
 * hero alt alta dururken tek bir sabit çubuk aşağıdakilerin üstüne yapışırdı.
 *
 * ÜLKE SEÇİMİ DÖRDÜNDE ORTAK. Seçiciler zustand'daki tek mağazayı sürüyor,
 * yani bir adayda İngiltere'ye geçmek diğer üçünü de İngiltere'ye alıyor.
 * Bilerek bozulmadı: karşılaştırma ancak dört sahne aynı ülkeyi gösterirken
 * adil.
 */

type Card = {
  id: string;
  anchor: string;
  kind: string;
  Scene?: () => React.ReactElement;
  read: string;
  cost: string;
  pick: string;
};

const CARDS: Card[] = [
  {
    id: "TABAN",
    anchor: "taban",
    kind: "Bugün canlıda · eşik ve tabela",
    read:
      "Üç kapılı bir sokak cephesi. Ülke seçilince duvar yatayda kayıp o kapıyı ortaya alıyor ve yalnız onun ışığı yanıyor. Portal fikri zaten burada, ama ülke yalnızca ışığın rengiyle ve tabeladaki adla anlatılıyor.",
    cost:
      "Eksik olan tek şey ortağın işaret ettiği şey: kapının arkasında ülkenin kendisi yok. Üç kapı da aynı boş açıklığa bakıyor.",
    pick: "Duvar kayıyor, seçilen kapının ışığı yanıyor, tabeladaki ülke adı ve satır değişiyor.",
  },
  {
    id: "P1",
    anchor: "aday-p1",
    kind: "Portal = içinden bakılan açıklık",
    Scene: HeroPortalP1,
    read:
      "Kapı tek ve hiç değişmiyor; arkasındaki ülke değişiyor. Siz kıpırdamıyorsunuz, kasa kıpırdamıyor, açıklıkta seçtiğiniz ülkenin göğü ve kendi silueti duruyor: Dubai'de Burj Khalifa, İngiltere'de Tower Bridge, KKTC'de Beşparmak sırtı ve Girne kalesi. İsteğin en birebir karşılığı bu aday.",
    cost:
      "Üç kapılı sokak gidiyor, yani \"diğer ülkeler de orada, sönük duruyor\" bilgisi kayboluyor. Ve bugünkü sahnenin yazılı kararlarından biri tersine çevriliyor: şehir silueti bilerek elenmişti, burada geri geliyor. Karşılığında tanınma anında oluyor.",
    pick:
      "Açıklık bir an kararıyor, giden ülke seçim yönünün tersine kayarak siliniyor, gelen ülke yerine oturuyor. Eşikten taşan ışık ve tabela o ülkenin rengine geçiyor.",
  },
  {
    id: "P2",
    anchor: "aday-p2",
    kind: "Portal = içinden geçilen koridor",
    Scene: HeroPortalP2,
    read:
      "Portal bir yüzey değil bir derinlik: üst üste beş eşik, hepsi aynı kaçış noktasına gidiyor ve ülke koridorun sonunda duruyor. Işık da o uçtan çıkıp size doğru geliyor, halkalar sırayla uzaktan yakına yanıyor. Hareket sitedeki ortak \"aktarım\" kalıbı, yani yeni bir mekanizma yazılmadı.",
    cost:
      "Ülke en küçük burada: koridorun sonundaki açıklık sahnenin dörtte biri, yani Burj Khalifa P1'dekinin üçte biri boyunda. Üç aday içinde ülkeyi en az gösteren ve en soyut duran bu. Tabela da kapının yanından eşiğin bu tarafına çekiliyor.",
    pick:
      "Koridorun sonundaki ülke derinlikten büyüyerek geliyor, en uçtaki halkanın kenarı o ülkenin ışığına dönüyor ve dalganın taşıdığı renk değişiyor: seçim koridorun tamamını yeniden renklendiriyor.",
  },
  {
    id: "P3",
    anchor: "aday-p3",
    kind: "Portal = ülkenin geçtiği sınır",
    Scene: HeroPortalP3,
    read:
      "Zemine oturmuş bir halka, içi seçilen ülkenin göğüyle dolu, ve o ülkenin kütlesi halkayı kırıp bu tarafa geçiyor. Sınırın içinde kalan parça ışığa karşı düz bir siluet, dışına taşan parça bizim karanlığımızda duran ve yalnız kenarı ışık almış bir kütle. Üç ülke üç ayrı yönden geçiyor: Dubai dikey, İngiltere yatay, KKTC alçak ve geniş.",
    cost:
      "Çerçevenin bütünlüğü gidiyor: halkanın sınırı her ülkede başka yerden kırılıyor, yani P1'in sakinliği yok. Sahnede \"şirketinizin kapısı\" okuması da kalmıyor, çünkü bu portal bir kapı değil bir halka. Dikey yer isteyen aday da bu.",
    pick:
      "Halkanın içindeki gökyüzü, kenarını dolaşan parlak yay ve zemindeki ışık havuzu o ülkenin rengine geçiyor; sınırı aşan kütle komple değişiyor, yani sahnenin silueti bile başka oluyor.",
  },
];

/* Açıklama bandının zemini. Hero'nun gecesi #080808; bant bir ton açık ve iki
   yanında saç teli bir çizgi var. Amaç dekor değil SINIR: müşteri nerede bizim
   notumuzun bittiğini, nerede hero'nun başladığını tek bakışta görmeli. */
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

/* Bağlantıyla gelen bölümün tepesi lab'in sticky şeridinin altında kalmasın
   diye bırakılan pay. Şerit sabit yükseklikte değil (haplar dar ekranda alt
   satıra kayıyor), o yüzden bilerek cömert: fazla pay verilirse üstte bir
   parça koyu hero görünür, eksik verilirse adayın rozeti çubuğun altında
   kaybolur; ikisi arasında görünür olan yanılgı tercih edilir. */
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

const NOTE: React.CSSProperties = {
  margin: "14px 0 6px",
  maxWidth: "70ch",
  fontSize: 14.5,
  lineHeight: 1.6,
  color: "#a4a4a4",
};

const SUB: React.CSSProperties = {
  margin: "0 0 6px",
  maxWidth: "72ch",
  fontSize: 13.5,
  lineHeight: 1.6,
  color: "#8f8f8f",
};

export default function LabHeroPortalPage() {
  return (
    <main style={{ background: "var(--night)" }}>
      <div className="container-o" style={{ padding: "48px 0 40px" }}>
        <h1 className="h2" style={{ color: "#ffffff" }}>
          Hero portalı — üç okuma, tam hero içinde
        </h1>
        <p style={{ marginTop: 12, maxWidth: "68ch", fontSize: 15, lineHeight: 1.65, color: "#a4a4a4" }}>
          İstek iki parçalıydı: seçim bir eşiğe bakma hissi versin, ve seçilen ülkenin
          kendisi karşıya çıksın. Bugünkü hero birincisini zaten yapıyor; eksik olan
          ikincisi, çünkü ülke yalnızca ışığın rengiyle anlatılıyor. Üç aday da ülkeyi
          kendi biçimiyle getiriyor. Ayrıştıkları yer <b>portalın ne olduğu</b>: içinden
          bakılan bir açıklık mı, içinden geçilen bir koridor mu, yoksa ülkenin geçtiği
          bir sınır mı.
        </p>
        <p style={{ marginTop: 10, maxWidth: "68ch", fontSize: 13.5, lineHeight: 1.6, color: "#8f8f8f" }}>
          En üstteki bölüm bugün canlıda olan hero, tek satırı değiştirilmeden. Dördü de
          gerçek hero bileşenini basıyor, taklidini değil; değişen tek şey sahne.
          Bayraklardan ülke değiştirmek dört sahneyi birden değiştirir. Üstteki sabit
          menü çubuğu bilerek basılmadı, ama kapladığı yer boş bırakıldı: başlığın
          ekrandaki yüksekliği canlıdakiyle aynı.
        </p>

        <div
          id="adaylar"
          style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28, scrollMarginTop: ANCHOR_GAP }}
        >
          {CARDS.map((c) => (
            <a key={c.id} href={`#${c.anchor}`} style={JUMP}>
              <b style={{ fontWeight: 700, color: "#9cc6f5" }}>{c.id}</b>
              {c.kind}
            </a>
          ))}
        </div>
      </div>

      {CARDS.map(({ id, anchor, kind, Scene, read, cost, pick }) => (
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
                    color: "#8f8f8f",
                    textDecoration: "none",
                  }}
                >
                  ↑ adaylar
                </a>
              </div>
              <p style={NOTE}>{read}</p>
              <p style={SUB}>
                <b style={{ fontWeight: 600 }}>Neyi feda ediyor:</b> {cost}
              </p>
              <p style={{ ...SUB, marginBottom: 0 }}>
                <b style={{ fontWeight: 600 }}>Ülke seçilince:</b> {pick}
              </p>
            </div>
          </div>

          {/* partners={false}: hero'nun altındaki ortak marka şeridi burada dört
              kez basılırdı ve iki aday arasına ikisiyle de ilgisi olmayan bir
              bant sokardı. Şerit ana sayfada kendi yerinde duruyor. */}
          <Hero scene={Scene ? <Scene /> : undefined} partners={false} />
        </section>
      ))}
    </main>
  );
}
