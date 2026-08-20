import { Compass, Target } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { HERO, OPENING } from "@/lib/about";

/* ADAY · SAHNE — /hakkimizda'nın ilk şeridi: hero + vizyon/misyon + kim olduğumuz.
 *
 * TEŞHİS. Üç parça bugün ayrı ayrı doğru ama birlikte oturmuyor, çünkü aynı
 * şeyi üç kez söylüyorlar: hero'nun lead'i firmanın tanımı, OPENING.lead yine
 * firmanın tanımı, OPENING.body[0] bir kez daha. Üçü de düz metin, üçü de ayrı
 * bir kutuda; ziyaretçi sayfanın ilk ekranında yeni tek bir şey görmüyor.
 * Vizyon ve misyon ise iki EŞİT beyaz kartta duruyor, oysa eşit değiller
 * (89 karaktere karşı 182): biri boş, öteki tıka basa görünüyor.
 *
 * YÖN: GÖRSELLE AÇ, AMA FOTOĞRAFLA DEĞİL. Elde firmanın kendi ekip karesi yok,
 * kullanılan kare stok ve künyesi müşteri isteğiyle kalktı — yani şerhsiz bir
 * görsel iddia olarak duruyordu. Bu aday onu sitenin kendi çizim diline
 * çeviriyor: gece panel, ince çizgi, tek marka mavisi.
 *
 * ÜÇ PARÇA TEK GÖVDE. Hero'nun gece zemini kesilmiyor: vizyon ve misyon aynı
 * karanlığın içinde, sahnenin hemen altında, büyük puntoda duruyor. "Kim
 * olduğumuz" onların ardından beyaz zeminde geliyor ve şeridi kapatıyor.
 * Sıra bilerek böyle: h1 bir soru soruyor ("Ortac Global kimdir?"), sahnenin
 * altındaki iki beyan firmanın NİYETİNİ söylüyor, beyaz bölüm de günlük işin
 * ne olduğunu düz cümleyle anlatıyor.
 *
 * ZEMİN RİTMİ TUTUYOR: gece (hero + beyan) → beyaz (kim olduğumuz) → gece
 * (canlı 2. bölüm, üç ülke). Beyan bloğu beyaza alınsaydı ya da beyaz bölüm
 * atlansaydı, iki gece bölüm arka arkaya gelip birbirine yapışırdı.
 *
 * KÜRE YOK (denendi, elendi) · FOTOĞRAF YOK · KÜNYE SATIRI YOK ·
 * "firmanın resmî ifadesi" ŞERHİ YOK. Dördü de müşterinin kaldırttığı şeyler.
 */

/* ---------------------------------------------------------------- SAHNE
   Hero'nun sağ sütunu. Anlattığı şey firmanın işi: ışığın altında duran bir
   TESCİL BELGESİ ve altında satır satır dolan bir DEFTER. İkisi de sayfanın
   kendi cümlesinden çıkıyor ("tescil, banka hesabı, defter, beyan, uyum ve
   lisans yenilemesi diye uzayan bir sıra").

   NEDEN ZİNCİR ÇİZİLMEDİ: sayfanın 5. bölümü zaten zincirin beş adımını
   adıyla basıyor; hero'da ikinci bir zincir, aşağıdaki bölümün yukarı taşınmış
   hâli gibi durur. Aynı sebeple ülke/bayrak da yok — o 2. bölümün işi. Hero'ya
   kalan tek şey firmanın KENDİSİ: masanın üstündeki iş.

   Defter satırlarının sırayla yanması bilinçli bir iddia: iş tek seferlik
   değil, periyot periyot tekrar ediyor. Sahnenin sürekli hareketi de bu.

   Ölçüler kendi 560x380 viewBox'ında; kap genişliğine göre esniyor. Hareketin
   TAMAMI CSS'te — render ağacında tek bir hareket değeri okunmuyor (tuzak A).
   Metin taşımadığı için aria-hidden. */
const LEDGER = [200, 176, 200, 152, 200, 168];

const SAHNE = (
  <div className="hzc-art">
    <svg className="hzc-svg" viewBox="0 0 560 380" aria-hidden="true" focusable="false">
      <defs>
        {/* Huzme ve zemin havuzu: gece yüzeyde ALFA'nın tek meşru yeri.
            Işığın kendisi yarı saydam olmak zorunda; altında metin yok, yani
            "gece yüzeyde alfa yok" kuralının koruduğu ölçüm bozulmuyor. */}
        <linearGradient id="hzcBeamG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#307fe2" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#307fe2" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="hzcPoolG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#307fe2" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#307fe2" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Işık: panelin üst kenarından sarkan ince bir askı ve lamba.
          Huzme sahnenin ekseni; belge tam onun içinde duruyor. */}
      <path d="M280 8 V44" className="hzc-stem" />
      <rect x="246" y="44" width="68" height="9" rx="3.5" className="hzc-lamp" />

      {/* İKİ KATLI OPAKLIK. Dış <g> fareyle değişiyor, iç <path> nefes alıyor.
          Aynı öge üstünde hem keyframe hem hover yazılamaz: animasyon çalışırken
          normal bildirimi eziyor ve hover sessizce ölü kalıyor. */}
      <g className="hzc-beamw">
        <path d="M250 55 L92 352 H468 L310 55 Z" className="hzc-beam" fill="url(#hzcBeamG)" />
      </g>

      {/* Tescil belgesi. Antet çizgisi marka mavisi, iki satır metin, sağ altta
          mühür halkası. Belirli bir ülkenin evrağı değil: üç ülkede de aynı
          işin yapıldığını söylemesi gerekiyor, o yüzden okunabilir bir yazı ya
          da arma taşımıyor. */}
      <rect x="180" y="110" width="200" height="118" rx="10" className="hzc-card" />
      <rect x="200" y="130" width="76" height="9" rx="4.5" className="hzc-head" />
      <rect x="200" y="155" width="160" height="5" rx="2.5" className="hzc-text" />
      <rect x="200" y="169" width="124" height="5" rx="2.5" className="hzc-text" />
      <circle cx="344" cy="198" r="15" className="hzc-seal" />
      <circle cx="344" cy="198" r="5.5" className="hzc-sealc" />

      {/* Defter. Altı satır, aynı periyot, altıya bölünmüş gecikme: hiçbir anda
          ikisi aynı parlaklıkta değil, dalga yukarıdan aşağı iniyor. */}
      <g className="hzc-lines">
        {LEDGER.map((w, i) => (
          <rect
            key={254 + i * 16}
            x="180"
            y={254 + i * 16}
            width={w}
            height="5"
            rx="2.5"
            className="hzc-line"
            style={{ "--hzc-i": i } as React.CSSProperties}
          />
        ))}
      </g>

      {/* Zemin: huzmenin düştüğü yer. Tek çizgi, altında yumuşak bir havuz. */}
      <ellipse cx="280" cy="351" rx="176" ry="13" fill="url(#hzcPoolG)" />
      <rect x="76" y="350" width="408" height="2" rx="1" className="hzc-ground" />
    </svg>
  </div>
);

export default function AboutSeritSahne() {
  return (
    <>
      {/* Hero'nun SOL sütunu canlıdakiyle birebir aynı: kırıntı, h1, tek
          cümlelik lead. Bilerek — müşterinin itirazı metne değil, ilk ekranın
          bomboş oluşunaydı. Tek değişken sağdaki sahne olsun ki karar tek
          soruya insin. `cta` ve `trust` geçilmiyor: sayfanın kendi kapanış
          CTA'sı var ve hero'da ikinci bir çıkış onu zayıflatır. */}
      <PageHero
        crumb={HERO.crumb}
        title={HERO.title}
        accent={HERO.accent}
        lead={HERO.lead}
        art={SAHNE}
      />

      {/* ================= VİZYON VE MİSYON · SAHNENİN ALTINDA =================
          Kart yok. İki beyan aynı gece zeminde, soldaki dar sütunda adı,
          sağdaki geniş sütunda cümlesi olan iki KAYIT satırı. Kart kabuğu
          kalkınca "sönük" görüntünün sebebi de kalkıyor: ayrım artık beyaz
          üstündeki 1px'lik gri kenarlıkta değil, zeminin kendisinde.

          Uzunluk farkı da böyle çözülüyor. İki eşit kart yan yana konunca göz
          onları kıyaslıyor ve 89 karakterlik vizyon, 182 karakterlik misyonun
          yanında eksik duruyordu. Alt alta iki satırda kıyas yok: her biri
          kendi boyunda.

          Metinlerin tek harfi değişmedi ve değişmemeli (gerekçe about.ts).
          Ekranda bunu söyleyen bir şerh YOK, müşteri onu kaldırttı.

          İki <h2>: sayfanın diğer bölüm başlıklarıyla aynı kademede duruyorlar,
          yani h1'den h3'e atlama olmuyor. Puntoları küçük, kademeleri değil. */}
      <section className="hzc-deck">
        <div className="container-o">
          <FadeUp className="hzc-say" delay={0.12} y={18}>
            <div className="hzc-say-h">
              <span className="hzc-say-ic" aria-hidden="true">
                <Compass size={18} strokeWidth={1.9} />
              </span>
              <h2 className="hzc-say-k">{OPENING.vision.t}</h2>
            </div>
            <p className="hzc-say-s">{OPENING.vision.s}</p>
          </FadeUp>

          {/* İkinci satır üstündeki saç teli ayırıcıyı taşıyor. Yatay ve nötr:
              kartlardaki renkli ince şerit yasağına girmiyor, çünkü ortada kart
              da yok, renk de yok. */}
          <FadeUp className="hzc-say hzc-say-b" delay={0.2} y={18}>
            <div className="hzc-say-h">
              <span className="hzc-say-ic" aria-hidden="true">
                <Target size={18} strokeWidth={1.9} />
              </span>
              <h2 className="hzc-say-k">{OPENING.mission.t}</h2>
            </div>
            <p className="hzc-say-s">{OPENING.mission.s}</p>
          </FadeUp>
        </div>
      </section>

      {/* ================= KİM OLDUĞUMUZ · BEYAZ =================
          Şeridin kapanışı ve tek düz anlatım yeri: solda başlık, sağda iki
          paragraf. Fotoğraf yok, kart yok, ikon yok — sahne yukarıda kuruldu,
          burada yalnız cümleler var.

          OPENING.lead BİLEREK BASILMIYOR. İçeriği iki parçaydı: "Üç ülkede
          çalışan tek bir ekip" (aynısı OPENING.body[0]'ın son cümlesinde daha
          somut hâliyle zaten var: "KKTC, İngiltere ve Dubai'de, aynı ekiple ve
          Türkçe") ve "Aşağıda ne yaptığımızı ve neyi hedeflediğimizi ... yazdık"
          (sayfanın kendi içindekiler tablosu). İkincisi bu düzende ayrıca
          YANLIŞ olurdu: vizyon ve misyon artık aşağıda değil, yukarıda.
          Aynı gerekçeyle hero'nun ikinci cümlesi bir tur önce zaten silinmişti
          (about.ts · HERO), yani bu yeni bir karar değil, aynı kararın devamı.
          Bilgi kaybı yok, yeni cümle de yazılmadı. */}
      <section className="hzc-who sec-pad">
        <div className="container-o">
          <div className="hzc-who-grid">
            <div className="hzc-who-head">
              <SplitWords
                as="h2"
                text={OPENING.heading}
                accent={OPENING.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
            </div>
            <div className="hzc-who-body">
              {OPENING.body.map((p, i) => (
                <FadeUp key={p.slice(0, 24)} delay={0.16 + i * 0.08}>
                  <p className="hzc-who-p">{p}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
