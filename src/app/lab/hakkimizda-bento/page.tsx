import AboutBentoBase from "@/components/lab/AboutBentoBase";
import AboutBentoKaro from "@/components/lab/AboutBentoKaro";
import AboutBentoBeyan from "@/components/lab/AboutBentoBeyan";
import AboutBentoYerinde from "@/components/lab/AboutBentoYerinde";

/* ============================================================================
   LAB · /hakkimizda · "Kim olduğumuz" bölümünün bentosu — üç alternatif

   MÜŞTERİNİN CÜMLESİ:

     "hakkımızdaki bento hoşuma gitmedi kral aşırı öylesine yapılmış bir kısım
      gibi duruyor. bi anasayfadaki bentomuza bak bi buna bak amk. şunu daha
      güçlü yap lütfen ve vizyon misyon kısmından ayırıp ayrı bi bento kısmı da
      yapabiliriz ne bizim olayımız diye girişip anlatırız. ülke olayını zaten
      anasayfada olan bento kartını kullanabilirsin o baya iyiydi. bu kısım
      için bi 3 tane şey dene labda öyle karar verelim."

   Bu sayfa canlı hiçbir şeye dokunmuyor. /hakkimizda, hakkimizda.css ve
   TrustLayer.tsx bu turda hiç değişmedi; üçü de yalnızca OKUNDU. Taban blok
   canlı sınıflarla basılıyor, üç aday kendi ad alanlarında (.hb1- .hb2- .hb3-).
   ========================================================================= */

/* ----------------------------------------------------------------- ölçüm
   Sayılar elle yazılı çünkü ölçüm çalışma anında değil tarayıcıda tek
   seferlik alındı: her blok sabit genişlikli aynı köken iframe'inde (tarayıcı
   paneli dar viewport'u güvenilir ölçmüyor), yatay taşma da scrollWidth ile
   değil gerçekten scrollTo(9999,0) denenip scrollX'e bakılarak. Animasyon
   sayısı getAnimations() ile, sonsuz olanlar sayılarak. Blok değişirse bu
   satırlar da yeniden ölçülmeli. */
const COLS = ["", "animasyon", "en uzun periyot", "element", "320px", "375px", "768px", "1440px"];

const MEASURED: { k: string; v: (string | number)[] }[] = [
  /* Ölçüt satırı: ana sayfanın kendi bentosu (#neden-ortac). Periyot alanı boş
     çünkü oradaki dört sonsuz hareketi CSS değil motion sürüyor; süreleri
     getAnimations üzerinden tek bir sayıya inmiyor. */
  { k: "Ölçüt · ana sayfa bentosu", v: [4, "·", 185, 2592, 2357, 1370, 1259] },
  { k: "Taban · bugünkü blok", v: [10, "23 s", 123, 897, 879, 701, 680] },
  /* Aday 1'de iki animasyon sayısı yazılı: ilki geniş ekran, ikincisi 640
     pikselin altı. Orada ray dikeye dönüyor ve ışığı hiç kurulmuyor. */
  { k: "Aday 1 · Karo", v: ["10 / 9", "35,9 s", 238, 2911, 2610, 1417, 1233] },
  { k: "Aday 2 · Beyan", v: [6, "44,3 s", 247, 2487, 2217, 1613, 1148] },
  { k: "Aday 3 · Yerinde", v: [13, "33,7 s", 184, 2237, 2047, 1628, 1066] },
];

const CANDIDATES = [
  {
    id: "Aday 1",
    name: "Karo",
    kind: "Ana sayfanın ızgarası",
    Section: AboutBentoKaro,
    idea:
      "Ana sayfa bentosunun ızgarasını olduğu gibi alıyor: altı sütun, bir geniş (4), bir uzun (2×2), iki normal (2). Karoların içi değişiyor, geometri değişmiyor. Bölüm vizyon/misyondan ayrılıyor ve kendi başlığıyla açılıyor.",
    took:
      "Dördünü birden. Eşit olmayan hücre, iki koyu iki açık ton, her karonun kendi mekaniği (ray · ülke panosu · sektör ızgarası · dayanak listesi) ve en önemlisi: karo bir sayı saymıyor, bir cümle söyleyip onu gösteriyor. Ülke karosu doğrudan TrustLayer'daki uzun koyu karonun iskeleti.",
    ask: "Evet. Kendi bölümü, kendi h2'si; girişi firmanın kendi paragrafı.",
    card: "Evet. Uzun koyu karo = ana sayfanın \"Tek muhatap\" karosu: işaret, başlık, tek satır, canlı pano, dipnot.",
    motion:
      "Üç mekanik, on sonsuz animasyon: ray ışığı (18,7 s · 1), üç bayrak sırayla üç piksel yukarı (22,1 s · 3), altı sektör ikonu sırayla maviye (35,9 s · 6). Dördüncü karo bilerek hareketsiz; ızgaranın dinlenme noktası o. 640 pikselin altında ray dikeye dönüyor ve ışığı hiç kurulmuyor, sayı dokuza iniyor. İmleç gelince hepsi birden canlanıyor.",
    cost:
      "Yenilik. Ana sayfada olan ızgara ikinci kez, bir sayfa aşağıda görünüyor; iki bölümü arka arkaya okuyan ziyaretçi \"aynı şeyi gördüm\" diyebilir. İkinci bedel: sayaç yok, üç rakam dipnota indi.",
  },
  {
    id: "Aday 2",
    name: "Beyan",
    kind: "Gece · ton tersine",
    Section: AboutBentoBeyan,
    idea:
      "Bölümün başlığı yok, çünkü başlık ilk karonun İÇİNDE. Beyan karosu bölümün sorusunu soruyor, firmanın iki paragrafıyla cevaplıyor ve ayağında birlikte çalıştığı on iki kurumun gerçek logosunu taşıyor. Diğer üç karo o beyanın kanıtı.",
    took:
      "Izgarayı değil ilkeyi. Eşit olmayan hücre var (7 × 2 · 5 · 5 · 12), ton karşıtlığı var ama TERSİNE ÇEVRİLMİŞ: ana sayfada zemin beyaz ve iki karo siyah, burada zemin siyah ve iki karo beyaz. Her karonun kendi mekaniği var, hiçbiri bir sayı saymıyor. Müşterinin \"logo vb girebilir işin içine, elini korkak alıştırma\" cümlesinin karşılığı da bu adayda: soyut bir işaret değil, kurumların kendi tam logoları.",
    ask: "Evet, ve en sert biçimde: bölümün girişi bir başlık değil, bir karo.",
    card: "Hayır, bilerek. Kararı verecek kişi kartın kullanıldığı hâli (aday 1 · aday 3) ile kullanılmadığı hâli yan yana görmeli. Ülke karosu burada üç sütunlu bir şerit.",
    motion:
      "Üç mekanik, altı sonsuz animasyon; dördünün en sakini. Logo şeridinin arkasından yavaş bir ışık geçiyor (44,3 s · 1), üç ülke diski sırayla halkalanıyor ve taban çizgisinde onlarla aynı ritimde bir ışık geziyor (27,1 s · 4), dikey zincir rayında ışık yukarıdan aşağı iniyor (12,7 s · 1). Sektör karosu hareketsiz. Logolara tek tek animasyon TAKILMADI: on iki nesnenin her birine bir hareket vermek kuralın \"minimal\" tarafını deler, o yüzden on iki küçük hareket yerine tek bir ışık var.",
    cost:
      "Zemin ritmi. Bölüm gece; hakkımızda sayfasında hemen ardından gelen \"Üç ülkede çalışıyoruz\" bölümü de gece. İkisi arka arkaya gelirse sayfanın beyaz, gece, mavi ritmi bozuluyor; birinin rengi değişmeli. İkinci bedel: dört dayanak (BASIS) ekranda yok, yerini logolar aldı. Üçüncüsü ve en önemlisi: sayfanın 4. bölümü zaten aynı on iki kurumu türe göre gruplu basıyor, yani bu aday seçilirse iki listeden biri sadeleşmeli. Dördüncüsü: beyan karosunda paragraflarla logo ayağı arasında geniş bir boşluk kalıyor, sağdaki sütun daha uzun olduğu için.",
  },
  {
    id: "Aday 3",
    name: "Yerinde",
    kind: "Yerinde kalıyor · sayaçlı",
    Section: AboutBentoYerinde,
    idea:
      "Bento yerinden oynamıyor: vizyon/misyon kartlarının hemen altında, bugünkü yerinde, kendi başlığı olmadan. Üstündeki tek satır bile aynı. Değişen tek şey bentonun kendisi: üç eşit hücre yerine bir uzun koyu ve iki normal açık karo. Sorusu şu: bu blok yerinden oynatılmadan güçlenebilir mi?",
    took:
      "Eşit olmayan hücreyi, tonu (bir karo siyah), karonun anatomisini (işaret → başlık → satır → pano → dipnot) ve panonun okumasını. Ana sayfadaki \"Şeffaf süreç\" karosunda durum çubuğunun sağında bir yüzde duruyor; sayı orada panonun okuması, karonun konusu değil. Üç sayaç da tam bu role geçti.",
    ask: "Hayır, bilerek. \"Ayrı bölüm\" fikrini aday 1 ve aday 2 zaten üstleniyor; bu aday karşı tezi temsil ediyor.",
    card: "Evet. Uzun koyu karo yine ana sayfanın kart iskeleti, bu kez içinde bir sayaç okuması ve ülke başına yapı + künye yongası var.",
    motion:
      "Dört mekanik, on üç sonsuz animasyon; dördünün en yükseği ve bu kural gereği: ekranda üç karo var, dört değil. Ülke satırlarının zemini sırayla açılıyor (33,7 s · 3), üç panonun da başlığının altında bir okuma ışığı geçiyor (16,3 s · 3), zincir şeridi bölme bölme doluyor (21,7 s · 1), altı sektör kuyusu sırayla maviye dönüyor (24,7 s · 6).",
    cost:
      "Anlatı. \"Ne bizim olayımız\" diye girişen bir bölüm yok; blok hâlâ vizyon/misyonun kuyruğu. Müşterinin iki önerisinden biri bu adayda karşılanmıyor.",
  },
];

/* ----------------------------------------------------------------- biçim
   Bu sayfanın kendi CSS'i yok: karşılaştırma metni satır içi biçimle
   basılıyor. Bir karar sayfası için ayrı bir stil dosyası açmak, karar
   verildiğinde silinecek bir dosya daha demek. */
const KICKER: React.CSSProperties = {
  display: "inline-flex",
  padding: "5px 12px",
  borderRadius: 999,
  background: "var(--blue-100)",
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--blue-900)",
};

const KICKER_BASE: React.CSSProperties = {
  ...KICKER,
  background: "var(--paper)",
  color: "#5c5c5c",
};

const BOX: React.CSSProperties = {
  marginTop: 16,
  padding: "20px 22px",
  borderRadius: "var(--r-lg)",
  background: "var(--paper)",
  border: "1px solid var(--border)",
  maxWidth: "78ch",
};

const P: React.CSSProperties = {
  marginTop: 12,
  fontSize: 14.5,
  lineHeight: 1.65,
  color: "var(--text-600)",
};

const STRONG: React.CSSProperties = { fontWeight: 600, color: "var(--text-900)" };

const LABEL: React.CSSProperties = {
  display: "block",
  marginTop: 14,
  fontSize: 11.5,
  fontWeight: 600,
  letterSpacing: "0.02em",
  color: "var(--blue-900)",
};

const CELL: React.CSSProperties = {
  padding: "9px 10px",
  borderBottom: "1px solid var(--border)",
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
  color: "var(--text-600)",
};

const CELL_K: React.CSSProperties = {
  ...CELL,
  textAlign: "left",
  fontWeight: 600,
  color: "var(--text-900)",
};

/* Blok künyesi. Altı satır, hepsi aynı sırada — karar bir kıyas kararı. */
function Kunye({ c }: { c: (typeof CANDIDATES)[number] }) {
  return (
    <div style={BOX}>
      <b style={KICKER}>
        {c.id} · {c.name} · {c.kind}
      </b>
      <span style={LABEL}>Fikir</span>
      <p style={{ ...P, marginTop: 6 }}>{c.idea}</p>
      <span style={LABEL}>Ana sayfa bentosundan ne aldı</span>
      <p style={{ ...P, marginTop: 6 }}>{c.took}</p>
      <span style={LABEL}>Vizyon/misyondan ayrı bölüm mü</span>
      <p style={{ ...P, marginTop: 6 }}>{c.ask}</p>
      <span style={LABEL}>Ana sayfanın bento kartını kullanıyor mu</span>
      <p style={{ ...P, marginTop: 6 }}>{c.card}</p>
      <span style={LABEL}>Ne kadar hareket var</span>
      <p style={{ ...P, marginTop: 6 }}>{c.motion}</p>
      <span style={LABEL}>Neyi feda ediyor</span>
      <p style={{ ...P, marginTop: 6 }}>{c.cost}</p>
    </div>
  );
}

export default function LabHakkimizdaBentoPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Hakkımızda bentosu
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "72ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          <code>/hakkimizda</code> · 1. bölümün sonundaki bento kutucuklarına üç
          alternatif. Canlı sayfaya, <code>hakkimizda.css</code>&apos;e ve{" "}
          <code>TrustLayer.tsx</code>&apos;e dokunulmadı; üçü de yalnızca okundu. Taban
          blok en üstte, canlı sınıflarıyla. Üç adayın hiçbiri canlı akışa bağlı değil.
        </p>

        {/* ------------------------------------------------------- teşhis */}
        <div style={BOX}>
          <b style={KICKER}>Teşhis: ana sayfa bentosu neden güçlü</b>
          <p style={P}>
            Ana sayfadaki bento (<code>TrustLayer.tsx</code> · <code>.bn-</code>) dört
            karo. Güçlü olmasının sebebi &quot;daha iyi tasarlanmış&quot; olması değil,{" "}
            <b style={STRONG}>dört ayrı kararı birden vermesi</b>:
          </p>
          <p style={P}>
            <b style={STRONG}>1 · Hücreler eşit değil.</b> Altı sütunluk bir ızgarada bir
            karo dört sütun, biri iki sütun ve iki satır, ikisi normal. Göz nereye önce
            bakacağını ızgaradan öğreniyor. Ölçüler de keyfî değil, içerikten çıkıyor:
            geniş karo iki sütunlu bir pano taşıdığı için geniş, uzun karo bir sohbet
            taşıdığı için uzun.
          </p>
          <p style={P}>
            <b style={STRONG}>2 · İki karo siyah.</b> Ana sayfanın kendi CSS&apos;inde bu
            karar için düşülmüş not aynen şu: dördü de açık olduğunda ızgara tek bir düz
            levha gibi okunuyor. Ton, ızgaraya derinlik ve ağırlık merkezi veriyor.
          </p>
          <p style={P}>
            <b style={STRONG}>3 · Her karonun kendi mekaniği var.</b> Biri yazan bir
            sohbet, biri yürüyen bir durum çubuğu, biri sırayla kapanan bir düzeltme
            listesi, biri bir onarım oku. Karo bir resim taşımıyor;{" "}
            <b style={STRONG}>ekranda bir şey OLUYOR</b> ve olan şey karonun iddiasının ta
            kendisi.
          </p>
          <p style={P}>
            <b style={STRONG}>4 · Karo bir sayı saymıyor, bir şey gösteriyor.</b> Dördünün
            manşeti de bir cümle: &quot;Tek muhatap, Türkçe süreç&quot;, &quot;Şeffaf
            süreç&quot;, &quot;Devralınan dosyalar&quot;. Altındaki mekanik o cümleyi
            kanıtlıyor, dipnot da sınırını söylüyor (&quot;Buradaki akış örnektir&quot;).
            İddia → kanıt → şerh.
          </p>
        </div>

        <div style={BOX}>
          <b style={KICKER_BASE}>Bugünkü hakkımızda bentosu neden zayıf</b>
          <p style={P}>
            Dört maddenin <b style={STRONG}>dördü de yok</b>, ve müşterinin
            &quot;öylesine yapılmış&quot; hissi tam olarak buradan geliyor:
          </p>
          <p style={P}>
            <b style={STRONG}>Hücreler eşit.</b> İki artı bir hücre var ama üçü de aynı
            ağırlıkta; hangisinin önce okunacağını söyleyen bir şey yok.{" "}
            <b style={STRONG}>Üçü de beyaz</b> ve bölümün zemini de beyaz, yani ızgara tek
            bir levha.
            <b style={STRONG}> Mekanik yok:</b> hareket var ama olay yok; bayraklar ve
            ikonlar sırayla iki piksel yükseliyor, ekranda hiçbir şey olmuyor.
          </p>
          <p style={P}>
            En ağırı sonuncusu: <b style={STRONG}>üç hücre de bir rakam sayıyor.</b>{" "}
            &quot;3 ülke&quot;, &quot;5 halkalı zincir&quot;, &quot;6 sektör&quot;. Rakam
            bir iddia değil: &quot;3 ülke&quot; firma hakkında hiçbir şey söylemiyor,
            yalnızca bir envanter kalemi. Üstelik üç hücrenin iskeleti de birebir aynı:
            sayı, etiket, o sayının saydığı nesnelerin listesi. Aynı fikrin üç varyasyonu
            bir bento değil, bir istatistik şeridi.
          </p>
          <p style={P}>
            Buna bir de <b style={STRONG}>bloğun yeri</b> ekleniyor: blok
            vizyon/misyonun kuyruğunda duruyor, kendi başlığı yok, ziyaretçiye niye
            baktığını söyleyen bir cümle yok. Müşterinin ikinci önerisi (&quot;ayrı bi
            bento kısmı, ne bizim olayımız diye girişip anlatırız&quot;) tam bu boşluğu
            kapatıyor.
          </p>
        </div>

        {/* ------------------------------------------------ üçünün ortak sözü */}
        <div style={BOX}>
          <b style={KICKER}>Üçünün de tuttuğu sözler</b>
          <p style={P}>
            <b style={STRONG}>İçerik:</b> üçünde de tek bir cümle yazılmadı. Başlıklar,
            satırlar ve nesnelerin tamamı <code>lib/about.ts</code>,{" "}
            <code>lib/brand.ts</code> ve <code>lib/brands.ts</code>&apos;ten okunuyor.
            Yeni iddia, rakam, kuruluş yılı, kişi ya da müşteri sayısı yok. Sayılar
            dizilerin uzunluğundan türüyor (<code>WHERE.countries.length</code> …), elle
            yazılmıyor: bir ülke ya da sektör eklendiğinde üçü de kendiliğinden doğru
            kalıyor.
          </p>
          <p style={P}>
            <b style={STRONG}>Bayrak:</b> <code>Flag</code> width/height taşımayan çıplak
            bir <code>&lt;svg viewBox=&quot;0 0 60 40&quot;&gt;</code> döndürüyor ve kabı
            ölçülmezse 300 × 150&apos;ye açılıyor ve hakkımızda sayfası bir kez tam bu
            yüzden çöktü. Üç adayda da bayrağın kabı sabit pikselle sınırlı.
          </p>
          <p style={P}>
            <b style={STRONG}>Hareket:</b> üçü de sunucu bileşeni ve hareketin tamamı saf
            CSS; tarayıcıya bu bloklardan tek satır JavaScript inmiyor.{" "}
            <code>useReducedMotion</code> hiçbirinde yok (bu depoda beş kalıpta hidrasyon
            uyarısı çıkardı). Animasyon tanımlarının tamamı{" "}
            <code>prefers-reduced-motion: no-preference</code> içinde, yani{" "}
            <b style={STRONG}>reduce açıkken üçünden de sıfır animasyon</b> sayılıyor;
            duraklatılmış bir animasyon bile kalmıyor ve duruş kareleri okunur.
          </p>
          <p style={P}>
            <b style={STRONG}>Sayaç:</b> yalnızca aday 3&apos;te var ve canlı{" "}
            <code>CountUp</code>&apos;ı çağırıyor (kopyalamıyor). Sunucu son rakamı
            basıyor: JS kapalıyken de doğru sayı görünüyor, hareket azaltılmışsa sayaç hiç
            çalışmıyor.
          </p>
          <p style={P}>
            <b style={STRONG}>Ad alanı:</b> canlı bento <code>.bn-</code>, canlı
            hakkımızda <code>.ab-</code>. Adaylar <code>.hb1-</code>, <code>.hb2-</code> ve{" "}
            <code>.hb3-</code>; hiçbiri canlı bir sınıfı ezmiyor. Renkli kenar şeridi
            hiçbirinde yok.
          </p>
        </div>

        {/* --------------------------------------------------------- ölçüm */}
        <div style={{ marginTop: 16, maxWidth: "78ch", overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
            }}
          >
            <caption
              style={{
                textAlign: "left",
                paddingBottom: 10,
                fontSize: 12.5,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              Ölçüm. Animasyon sayısı gerçekten çalışan sonsuz animasyonlardan
              (getAnimations), kural taraması da ham cssText üzerinden yapıldı: bu depoda{" "}
              <code>document.styleSheets</code> geliştirme modunda kırpılmış sonuç
              veriyor. Yükseklikler sabit genişlikli aynı köken iframe içinde, bölüm
              dolgusu dahil. Dört genişlikte de yatay taşma sıfır ve ölçüm{" "}
              <code>scrollWidth</code> ile değil, gerçekten <code>scrollTo(9999, 0)</code>{" "}
              denenip <code>scrollX</code>&apos;e bakılarak yapıldı (
              <code>body &#123; overflow-x: clip &#125;</code> yüzünden scrollWidth temiz
              görünüyor). Element sayısı bölüm kabı dahil.
            </caption>
            <thead>
              <tr>
                {COLS.map((c, i) => (
                  <th
                    key={c || "k"}
                    scope="col"
                    style={{
                      padding: "0 10px 8px",
                      borderBottom: "1px solid var(--border)",
                      textAlign: i === 0 ? "left" : "right",
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "var(--blue-900)",
                    }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEASURED.map((r) => (
                <tr key={r.k}>
                  <th scope="row" style={CELL_K}>
                    {r.k}
                  </th>
                  {r.v.map((v, i) => (
                    <td key={i} style={CELL}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --------------------------------------------------------- taban */}
        <div style={BOX}>
          <b style={KICKER_BASE}>Taban · bugün canlıda olan hâli</b>
          <p style={P}>
            Aşağıdaki blok <code>/hakkimizda</code>&apos;daki bloğun kendisi: canlı
            sınıflar, canlı CSS, canlı sayaç. Yeni tek satır CSS yazılmadı. Üstündeki
            &quot;Vizyon ve misyon firmanın kendi resmî ifadesi&quot; satırı da orada
            olduğu için burada; blok bugün o satırın kuyruğunda duruyor.
          </p>
        </div>
      </div>

      <AboutBentoBase />

      {CANDIDATES.map((c) => (
        <div key={c.id}>
          <div className="container-o">
            <Kunye c={c} />
          </div>
          <c.Section />
        </div>
      ))}

      <div className="container-o" style={{ paddingBottom: 72 }}>
        <div style={BOX}>
          <b style={KICKER}>Karar verirken bakılacak üç şey</b>
          <p style={P}>
            <b style={STRONG}>1 · Bölüm ayrılsın mı?</b> Aday 1 ve aday 2 ayırıyor, aday 3
            ayırmıyor. Ayırmanın bedeli sayfaya bir bölüm daha eklemek; ayırmamanın bedeli
            bloğun hâlâ bir kuyruk olarak kalması.
          </p>
          <p style={P}>
            <b style={STRONG}>2 · Rakamlar kalsın mı?</b> Aday 3&apos;te sayaçlar duruyor
            ama panonun okuması olarak; aday 1 ve 2&apos;de rakam dipnota indi. Hiçbirinde
            rakam manşet değil, çünkü manşet olduğu sürece karo bir şey saymaya devam
            ediyor.
          </p>
          <p style={P}>
            <b style={STRONG}>3 · Zemin ne olsun?</b> Aday 2 gece. Sayfada hemen ardından
            gelen bölüm de gece, yani bu aday seçilirse ikisinden birinin rengi
            değişmeli. Aday 1 ve aday 3 beyaz kalıyor ve sayfanın ritmine dokunmuyor.
          </p>
        </div>
      </div>
    </main>
  );
}
