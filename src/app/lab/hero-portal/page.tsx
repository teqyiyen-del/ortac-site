import Hero from "@/components/Hero";
import HeroPortalP1 from "@/components/lab/HeroPortalP1";
import HeroPortalP2 from "@/components/lab/HeroPortalP2";
import HeroPortalP3 from "@/components/lab/HeroPortalP3";
import HeroPortalP4 from "@/components/lab/HeroPortalP4";

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
 * ÜLKE SEÇİMİ HEPSİNDE ORTAK. Seçiciler zustand'daki tek mağazayı sürüyor,
 * yani bir adayda İngiltere'ye geçmek ötekileri de İngiltere'ye alıyor.
 * Bilerek bozulmadı: karşılaştırma ancak bütün sahneler aynı ülkeyi
 * gösterirken adil.
 *
 * ------------------------------------------------------------- 2. TUR · P4
 * Müşterinin cümlesi birebir: "portal olayı için p1 iyi ama p2 deki gibi
 * dışına doğru çizgiler yanarak ilerliyor ya daha bi portl hissi veriyor p1 e
 * onu ekleyebiliriz sanki ama bi alana sıkıştırıp pat diye kesmek de
 * istemiyorum pek p3 de o hoşuma gitmedi."
 *
 * SIRALAMA BU CÜMLEYE GÖRE: taban en üstte, sonra beğenilen iki referans
 * (P1 ve P2) ve hemen ardından yeni aday P4 — yani P4, kendisini doğuran iki
 * sahnenin devamında okunuyor. P3 en altta ve ELENMİŞ olarak işaretli.
 *
 * P3 SİLİNMEDİ. Bir aday "hoşuma gitmedi" diye dosyadan atılmıyor: karar
 * kaydı sayfanın kendisi ve iki hafta sonra "şu halkalı olan neydi" diye
 * sorulduğunda ekranda duruyor olmalı. Elenmişlik rozette ve künyede yazılı,
 * bölüm de sayfanın sonuna alındı.
 */

type Card = {
  id: string;
  anchor: string;
  kind: string;
  Scene?: () => React.ReactElement;
  /* Bölümün durumu. "ex" elenmiş adayı soluklaştırıp rozetine not düşüyor. */
  state?: "ex";
  read: string;
  cost: string;
  pick: string;
  /* Yalnız P4'te dolu: adayın nereden ne aldığı ve hangi kısıtı nasıl
     çözdüğü. Üç madde, çünkü müşterinin cümlesi de üç parçaydı. */
  kunye?: [string, string][];
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
    id: "P4",
    anchor: "aday-p4",
    kind: "P1'in kapısı + P2'nin çizgileri",
    Scene: HeroPortalP4,
    kunye: [
      [
        "P1'den ne alındı",
        "Her şey: kasa, açıklık, ülke çizimi, tabela, seçim mantığı ve geçişin kendisi birebir P1. Tek değişen ölçü, kapının sahne yüksekliğine oranı; gerekçesi aşağıda.",
      ],
      [
        "P2'den ne alındı",
        "Yalnız davranış: sıradaki halkanın yanıp bir sonrakine devretmesi. P2'nin koridoru, kaçış noktası ve derinlik kurgusu gelmedi. Yön de ters çevrildi, çünkü burada ışığın kaynağı koridorun sonu değil kapının kendisi: dalga kapının ışık kenarında başlıyor ve dışa doğru gidiyor.",
      ],
      [
        "Kesim sorunu nasıl çözüldü",
        "Üç ayrı güvenceyle. Bir: bütün mürekkep tuvalin içinde, yani çizim hiçbir ekran ölçüsünde kırpılmıyor. İki: yankı katmanının tamamı kutusuna içten teğet bir elips gradyanıyla maskeleniyor ve ışık kenara varmadan sönüyor; dıştaki halkaların ayakları zemine değmeden dağılıyor. Üç: yankı kutusu sahnenin içinde kalıyor, yani sahnenin kırpması hiçbir yere değmiyor. Bedeli kapının küçülmesi: dikey yer kapı ile yankı arasında paylaşılmak zorunda.",
      ],
    ],
    read:
      "P1'in kapısı duruyor, ama artık tek başına değil: kapının silueti dışa doğru beş kez yankılanıyor ve ışık kapının kendi kenarında başlayıp o yankıların içinden geçerek dağılıyor. Halkalar dışa gittikçe basıklaşıyor ve soluyor, yani dalga yayılırken enerjisini kaybediyor. Hiçbir çizgi bir kenarda kesilmiyor; hepsi sönerek bitiyor.",
    cost:
      "Kapı küçüldü. Sahne yüksekliği sabit ve P1'in kapısı o yüksekliğin neredeyse tamamını yiyordu; kemerin üstünde tek bir halkaya bile yer yoktu. Kapı P1'dekinin %72'si, karşılığında ekranda duran portal nesnesi P1'inkinden büyük. İkinci bedel: 700px altında kapının solunda kasa dışına 14 birim yer kalıyor, yani orada halka koymak kesmek demekti. Dar ekranda sahne aynen P1.",
    pick:
      "P1'in geçişi aynen: açıklık bir an kararıyor, giden ülke seçim yönünün tersine kayıp siliniyor, gelen yerine oturuyor. Üstüne, dalganın taşıdığı ışık o ülkenin göğünün en parlak rengine dönüyor; yani seçim yalnız kapının içini değil kapının etrafındaki yankıyı da yeniden renklendiriyor.",
  },
  {
    id: "P3",
    anchor: "aday-p3",
    kind: "Portal = ülkenin geçtiği sınır",
    Scene: HeroPortalP3,
    state: "ex",
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

/* Elenmiş adayın rozeti. Renk değil TON farkı: mavi rozet "bu bir aday"
   diyor, gri rozet "bu artık aday değil". Kırmızı bilerek kullanılmadı,
   çünkü elenmek bir hata değil bir karar.
   Ölçülen kontrast (#0f0f0f zemin üstünde): metin #9a9a9a 6.72:1. */
const BADGE_EX: React.CSSProperties = {
  ...BADGE,
  background: "#1a1a1a",
  border: "1px solid #333333",
  color: "#9a9a9a",
};

/* P4'ün künyesi: nereden ne alındığı ve kısıtın nasıl çözüldüğü. Kart
   metinlerinden AYRI duruyor, çünkü öteki bölümlerde karşılığı yok ve aynı
   paragraf akışına karışsaydı "bu da bir yorum" diye okunurdu. */
const KUNYE: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: 10,
  margin: "16px 0 2px",
  maxWidth: "78ch",
  padding: "14px 16px",
  borderRadius: 10,
  background: "#0d0d0d",
  border: "1px solid #242424",
};

const KUNYE_K: React.CSSProperties = {
  display: "block",
  marginBottom: 3,
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: "0.06em",
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
          Hero portalı: adaylar, tam hero içinde
        </h1>
        <p style={{ marginTop: 12, maxWidth: "68ch", fontSize: 15, lineHeight: 1.65, color: "#a4a4a4" }}>
          İstek iki parçalıydı: seçim bir eşiğe bakma hissi versin, ve seçilen ülkenin
          kendisi karşıya çıksın. Bugünkü hero birincisini zaten yapıyor; eksik olan
          ikincisi, çünkü ülke yalnızca ışığın rengiyle anlatılıyor. Adayların hepsi
          ülkeyi kendi biçimiyle getiriyor. Ayrıştıkları yer <b>portalın ne olduğu</b>:
          içinden bakılan bir açıklık mı, içinden geçilen bir koridor mu, yoksa ülkenin
          geçtiği bir sınır mı.
        </p>
        <p style={{ marginTop: 10, maxWidth: "68ch", fontSize: 15, lineHeight: 1.65, color: "#a4a4a4" }}>
          <b style={{ color: "#e6e6e6" }}>Bu turda gelen aday P4.</b> Beğenilen iki sahnenin
          birleşimi: P1&apos;in kapısı duruyor, P2&apos;nin dışa doğru yanarak ilerleyen
          çizgileri onun etrafında yankılanıyor. Sıralama da ona göre; P4, kendisini
          doğuran iki sahnenin hemen ardında. P3 elendi ama silinmedi, kayıt olarak en
          altta duruyor.
        </p>
        <p style={{ marginTop: 10, maxWidth: "68ch", fontSize: 13.5, lineHeight: 1.6, color: "#8f8f8f" }}>
          En üstteki bölüm bugün canlıda olan hero, tek satırı değiştirilmeden. Hepsi
          gerçek hero bileşenini basıyor, taklidini değil; değişen tek şey sahne.
          Bayraklardan ülke değiştirmek bütün sahneleri birden değiştirir. Üstteki sabit
          menü çubuğu bilerek basılmadı, ama kapladığı yer boş bırakıldı: başlığın
          ekrandaki yüksekliği canlıdakiyle aynı.
        </p>

        <div
          id="adaylar"
          style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28, scrollMarginTop: ANCHOR_GAP }}
        >
          {/* Elenen adayın hapı da listede: bağlantı kesilirse müşteri onu
              ararken sayfayı elle kaydırmak zorunda kalır. Solukluk yeterli
              işaret, ayrıca "elendi" yazıyor. */}
          {CARDS.map((c) => (
            <a
              key={c.id}
              href={`#${c.anchor}`}
              style={c.state === "ex" ? { ...JUMP, color: "#8f8f8f" } : JUMP}
            >
              <b style={{ fontWeight: 700, color: c.state === "ex" ? "#8f8f8f" : "#9cc6f5" }}>
                {c.id}
              </b>
              {c.kind}
              {c.state === "ex" ? " · elendi" : null}
            </a>
          ))}
        </div>
      </div>

      {CARDS.map(({ id, anchor, kind, Scene, state, read, cost, pick, kunye }) => (
        <section key={id} id={anchor} style={{ scrollMarginTop: ANCHOR_GAP }}>
          <div style={BAND}>
            <div className="container-o">
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={state === "ex" ? BADGE_EX : BADGE}>
                  {id} · {kind}
                  {state === "ex" ? " · elendi" : null}
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
              {state === "ex" ? (
                <p style={{ ...NOTE, color: "#8a8a8a", marginBottom: 0 }}>
                  <b style={{ fontWeight: 700, color: "#c4c4c4" }}>Elendi.</b> Müşterinin kararı
                  birebir: <i>&quot;p3 de o hoşuma gitmedi&quot;</i>. Bölüm kayıt olarak duruyor,
                  sahne silinmedi.
                </p>
              ) : null}
              <p style={NOTE}>{read}</p>
              {kunye ? (
                <div style={KUNYE}>
                  {kunye.map(([k, v]) => (
                    <p key={k} style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "#a4a4a4" }}>
                      <b style={KUNYE_K}>{k}</b>
                      {v}
                    </p>
                  ))}
                </div>
              ) : null}
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
