import ThreeCountries from "@/components/home/ThreeCountries";
import PriceSummary from "@/components/home/PriceSummary";
import UlkeHalka from "@/components/lab/UlkeHalka";
import UlkeUcHalka from "@/components/lab/UlkeUcHalka";
import UlkeHat from "@/components/lab/UlkeHat";
import MaviKartLab from "@/components/lab/MaviKartLab";

/* ============================================================================
   LAB · /  (ana sayfa) — İKİ BÖLÜM, ALTI ADAY

   Bu sayfa canlı hiçbir şeye dokunmuyor. Ana sayfanın iki bölümü burada önce
   BUGÜNKÜ hâliyle (canlı bileşenin kendisi, kopya değil) basılıyor, altına
   adaylar geliyor.

   1 · Hizmet verdiğimiz ülkeler   → src/components/home/ThreeCountries.tsx
   2 · Rakamlar, ihtiyacınıza göre → src/components/home/PriceSummary.tsx

   İKİ İSTEK, MÜŞTERİNİN ORTAĞINDAN BİREBİR:

     "Burası daha Saturn gibi hissettirilebilir ve nokta nokta yerine tek düz
      mavi çizgi ile halledilebilir yani o mavi çizgiye de motionda yaptığımız
      gibi efekt veririz sürekli git gel takılabilir"

     "Burada ki fiyatlar mavi cardların üzerinden olabilir king, daha hoş durur"

   Müşterinin kendi eklediği iki not da turun sınırını çiziyor: Saturn için
   "emin değilim … dene bakalım bi", fiyat kartları için "3 tane fln labda".
   ========================================================================= */

/* ---------------------------------------------------------------- ölçüm ----
   Sayılar elle yazılı çünkü ölçüm çalışma anında değil tarayıcıda tek
   seferlik alındı. Yöntem, satır satır:

   · SÜREKLİ ANİMASYON — getAnimations(), playState === "running" olanlar ve
     yalnızca bloğun içinde kalanlar. Giriş animasyonları (FadeUp, SplitWords,
     whileInView) sayılmıyor çünkü bitiyorlar; sayılan şey ekranda durduğu
     sürece dönen döngü. Canlı iki bölümün de bu anlamda sıfır olması bir
     eksiklik teşhisi: bugün iki bölüm de yalnızca açılışta kımıldıyor.

   · YÜKSEKLİK — 1440 pikselde, offsetHeight. Ülkeler için karşılaştırılan
     kutu .uk3-grid / .sax-grid (yani yayın ve satırların kendisi, bölüm
     dolgusu hariç), fiyat için .fy2-cols / .mkx-cols. İki değer verilen
     yerde ilki hiçbir kalem seçili değilken, ikincisi üç kalem de açıkken.

     TUZAK: kalem satırları motion ile height 0 → auto açılıyor ve bu
     requestAnimationFrame'e bağlı. Sekme ARKA PLANDAYKEN rAF kısılıyor,
     animasyon ilerlemiyor ve ölçüm 0 döndürüyor. "Açık" ölçümleri bu yüzden
     sekme önde tutularak alındı; arka planda alınan ilk değerler yanlıştı.

   · YATAY TAŞMA — sabit genişlikli aynı köken iframe içinde (tarayıcı paneli
     dar viewport'u güvenilir ölçmüyor) ve scrollWidth ile DEĞİL, gerçekten
     scrollTo(9999,0) denenip scrollX okunarak: body'de overflow-x:clip var,
     scrollWidth bu yüzden yanıltıyor.

   · reduce — çalışma anında ÖLÇÜLMEDİ, tarayıcıda hareket azaltmayı taklit
     edecek bir yol yoktu. Yerine CSSOM taraması yapıldı, ham cssText
     üzerinden: bu turda yazılan DOKUZ animasyon bildiriminin dokuzu da
     @media (prefers-reduced-motion: no-preference) kapısının içinde, kapısız
     bildirim sıfır. Işık öğeleri kapının dışında opacity:0 taşıdığı için
     reduce altında duruş karesi hareket hiç eklenmemiş hâlin birebir aynısı.

   Blok değişirse bu satırlar yeniden ölçülmeli. */
const COLS = [
  "",
  "sürekli animasyon",
  "periyot",
  "yükseklik",
  "taşma 320",
  "375",
  "768",
  "1440",
];

const MEASURED_UK: { k: string; v: (string | number)[] }[] = [
  { k: "Taban · bugün canlıda", v: [0, "yok", 203, 0, 0, 0, 0] },
  { k: "Aday 1 · Halka", v: [2, "13.9 s", 253, 0, 0, 0, 0] },
  { k: "Aday 2 · Üç halka", v: [4, "10.9 s", 217, 0, 0, 0, 0] },
  { k: "Aday 3 · Hat", v: [1, "19.7 s", 189, 0, 0, 0, 0] },
  { k: "Üç aday, reduce altında", v: [0, "yok", "aynı", 0, 0, 0, 0] },
];

const MEASURED_FY: { k: string; v: (string | number)[] }[] = [
  { k: "Taban · bugün canlıda", v: [0, "yok", "439 / 625", 0, 0, 0, 0] },
  { k: "Aday 1 · Tam mavi kart", v: [3, "17.9 s", "369 / 549", 0, 0, 0, 0] },
  { k: "Aday 2 · Mavi plaka", v: [3, "19.1 s", "371 / 551", 0, 0, 0, 0] },
  { k: "Aday 3 · Mavi kabuk", v: [3, "21.1 s", "388 / 570", 0, 0, 0, 0] },
  { k: "Üç aday, reduce altında", v: [0, "yok", "aynı", 0, 0, 0, 0] },
];

/* --------------------------------------------------------------- kontrast --
   Ölçülen değerler; elle hesap değil, tarayıcıda gerçekten basılan renkler
   üzerinden. Saydam metin renkleri altındaki opak zeminle birleştirilerek
   çözüldü (getComputedStyle ile renk, ağaçta yukarı yürüyerek zemin).
   Eşikler: normal metin 4.5:1, büyük metin (24px ve üstü ya da 18.66px kalın)
   3:1, grafik 3:1. */
const CONTRAST: { k: string; zemin: string; metin: string; o: string; e: string }[] = [
  { k: "Marka mavisi + beyaz (referans)", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "büyük metin ve grafik geçer, normal punto GEÇMEZ" },
  { k: "Aday 1 · ad, değer, rakam", zemin: "#1b56a8", metin: "#ffffff", o: "7.14:1", e: "geçer" },
  { k: "Aday 1 · kalem etiketi 14px", zemin: "#1b56a8", metin: "#e4ebf5", o: "5.93:1", e: "geçer" },
  { k: "Aday 1 · dipnot ve süre", zemin: "#1b56a8", metin: "#c8d6ea", o: "4.86:1", e: "geçer (eşiğe yakın, ton düşürülmeyecek)" },
  { k: "Aday 2 plaka · ad ve rakam", zemin: "#2468c4", metin: "#ffffff", o: "5.45:1", e: "geçer" },
  { k: "Aday 2 plaka · süre 13px", zemin: "#2468c4", metin: "#edf3fa", o: "4.88:1", e: "geçer" },
  { k: "Aday 2 gövde · kalem etiketi", zemin: "#111111", metin: "#cbcbcb", o: "11.60:1", e: "geçer" },
  { k: "Aday 2 gövde · dipnot", zemin: "#111111", metin: "#969696", o: "6.41:1", e: "geçer" },
  { k: "Aday 3 kabuk · ülke adı 22px/700", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "büyük metin, geçer" },
  { k: "Aday 3 kabuk · rakam 50px/700", zemin: "#307fe2", metin: "#ffffff", o: "3.99:1", e: "büyük metin, geçer" },
  { k: "Aday 3 kabuk · fark hapı", zemin: "#ffffff", metin: "#1b56a8", o: "7.14:1", e: "geçer" },
  { k: "Aday 3 panel · kalem etiketi", zemin: "#ffffff", metin: "#080808", o: "20.03:1", e: "geçer" },
  { k: "Aday 3 panel · dipnot ve süre", zemin: "#ffffff", metin: "#5c5c5c", o: "6.69:1", e: "geçer" },
  { k: "Ülke adayları · ülke adı", zemin: "#ffffff", metin: "#080808", o: "20.03:1", e: "geçer" },
  { k: "Ülke adayları · yapı, künye, süre", zemin: "#ffffff", metin: "#5c5c5c", o: "6.69:1", e: "geçer" },
  { k: "Ülke adayları · mavi çizgi ve halka", zemin: "#ffffff", metin: "#307fe2", o: "3.99:1", e: "grafik, geçer" },
];

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
  color: "var(--blue-700)",
};

const KICKER_BASE: React.CSSProperties = {
  ...KICKER,
  background: "var(--paper)",
  color: "#8a8a8a",
};

const BOX: React.CSSProperties = {
  marginTop: 16,
  padding: "20px 22px",
  borderRadius: "var(--r-lg)",
  background: "var(--paper)",
  border: "1px solid var(--border)",
  maxWidth: "76ch",
};

const P: React.CSSProperties = {
  marginTop: 12,
  fontSize: 14.5,
  lineHeight: 1.65,
  color: "var(--text-600)",
};

const STRONG: React.CSSProperties = { fontWeight: 600, color: "var(--text-900)" };

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

const CELL_L: React.CSSProperties = { ...CELL, textAlign: "left" };

/* Künye. Labda her adayın üstünde iki şey duruyor: fikir ve neyi feda ettiği.
   İkinci satır olmadan kıyas bir beğeni oylamasına dönüyor. */
function Kunye({
  id,
  name,
  idea,
  cost,
  base = false,
}: {
  id: string;
  name: string;
  idea: string;
  cost: string;
  base?: boolean;
}) {
  return (
    <div className="container-o">
      <div style={BOX}>
        <b style={base ? KICKER_BASE : KICKER}>
          {id} · {name}
        </b>
        <p style={P}>
          <b style={STRONG}>Fikir:</b> {idea}
        </p>
        <p style={P}>
          <b style={STRONG}>Neyi feda ediyor:</b> {cost}
        </p>
      </div>
    </div>
  );
}

function Olcum({
  cap,
  rows,
}: {
  cap: string;
  rows: { k: string; v: (string | number)[] }[];
}) {
  return (
    <div style={{ marginTop: 16, maxWidth: "76ch", overflowX: "auto", position: "relative" }}>
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
          {cap}
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
          {rows.map((r) => (
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
  );
}

export default function LabAnaSayfaPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Ana sayfa · iki bölüm
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "70ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          İki bölüm, altı aday. Her bölüm önce <b style={STRONG}>bugünkü hâliyle</b>{" "}
          basılıyor ve bu bir kopya değil, canlı bileşenin kendisi; altına adaylar
          geliyor. Canlı hiçbir dosya değişmedi.
        </p>
      </div>

      {/* ==================================================================
          1 · ÜLKELER
          ================================================================== */}
      <div className="container-o" style={{ paddingTop: 40 }}>
        <div style={BOX}>
          <b style={KICKER}>1 · Hizmet verdiğimiz ülkeler</b>
          <p style={P}>
            Ortağın cümlesi:{" "}
            <b style={STRONG}>
              &quot;Burası daha Saturn gibi hissettirilebilir ve nokta nokta yerine
              tek düz mavi çizgi ile halledilebilir yani o mavi çizgiye de motionda
              yaptığımız gibi efekt veririz sürekli git gel takılabilir.&quot;
            </b>
          </p>
          <p style={P}>
            İçinde <b style={STRONG}>üç ayrı istek</b> var: halka, tek kesiksiz mavi
            çizgi, o çizgide sürekli git gel. Bugün canlıda olan şey tam tersi: üç
            ayrı yay, üçü de noktalı (<code>stroke-dasharray: 0.1 10</code>) ve
            hiçbiri kımıldamıyor. Yani ikinci ve üçüncü istek net birer eksik;
            birincisi, müşterinin kendi deyişiyle{" "}
            <b style={STRONG}>&quot;emin değilim … dene bakalım bi&quot;</b>, bir
            deneme.
          </p>
          <p style={P}>
            Üç aday bir A/B/C değil, <b style={STRONG}>kademeli bir soru</b>: tek
            büyük halka → ülke başına küçük halka → halka yok. İkinci ve üçüncü aday
            aynı çizgiyi, aynı diskleri ve aynı hareketi paylaşıyor, aralarındaki tek
            fark halkalar. Yani yan yana konduklarında cevaplanan şey{" "}
            <b style={STRONG}>&quot;halka gerçekten bir şey katıyor mu&quot;</b>.
          </p>
        </div>

        <div style={BOX}>
          <b style={KICKER}>&quot;Git gel&quot; için hazır kalıp yetmedi</b>
          <p style={P}>
            Depoda bir <b style={STRONG}>enerji geçişi</b> kalıbı var (
            <code>src/app/css/aktarim.css</code>, ad alanı <code>.akt-</code>) ve
            müşterinin &quot;motionda yaptığımız gibi&quot; dediği şey büyük ihtimalle
            o. Üç yerden birden yetmiyor:
          </p>
          <p style={P}>
            <b style={STRONG}>1) Kalıp durak yakıyor, yol katetmiyor.</b> Bir öğenin
            rengini periyodun belli bir penceresinde değiştiriyor; buradaki hareket
            ise tek bir çizginin üzerinde sürekli yer değiştiren bir ışık. Ortada
            yakılacak ayrık durak yok, kat edilecek bir yol var.
          </p>
          <p style={P}>
            <b style={STRONG}>2) Kalıp tek yönlü.</b> Duraklar arası kayma{" "}
            <code>animation-delay</code> ile kuruluyor, yani ışık her turda aynı
            yönde. Git gel dönüşü de istiyor;{" "}
            <code>animation-direction: alternate</code> ya da 0/50/100 kareli bir
            eğri gerekiyor ve kalıpta ikisi de yok.
          </p>
          <p style={P}>
            <b style={STRONG}>3) Zarf sabit ve tek tepeli.</b> Bir durak turda bir kez
            yanıyor; git gel&apos;de her nokta gidişte ve dönüşte olmak üzere iki kez
            aydınlanmalı. Aynı öğeye aynı kare adını iki farklı gecikmeyle vermek
            mümkün değil, çünkü <code>animation-delay</code> listesi{" "}
            <code>animation-name</code> listesine göre tekrarlanıyor.
          </p>
          <p style={P}>
            <b style={STRONG}>Kalıp genişletilirse maliyeti üç şey:</b>{" "}
            <code>--akt-yon</code> değişkeni (animation-direction), sürekli yollar
            için bir <code>aktKayma</code> adaptörü (stroke-dashoffset) ve zarfın iki
            tepeli bir varyantı. Üçü de sözleşme değişikliği olduğu için bu turda
            yapılmadı; hareket <code>lab-uk4.css</code> içinde elle yazıldı ve{" "}
            <code>reduce</code> kapısı kalıptakiyle aynı biçimde kuruldu.
          </p>
        </div>

        <Olcum
          cap="Ülkeler bölümü. Yükseklik 1440 pikselde ve karşılaştırılan kutu yayın/satırların kendisi (.uk3-grid ile .sax-grid), bölüm dolgusu hariç. Sürekli animasyon = ekranda durduğu sürece dönen döngü; giriş animasyonları sayılmıyor, o yüzden bugünkü canlı hâl sıfır. Dört genişlikte de yatay taşma sıfır (scrollWidth ile değil, gerçekten kaydırılarak). Reduce satırı ölçüm değil CSSOM kanıtı: bu turda yazılan dokuz animasyon bildiriminin dokuzu da no-preference kapısının içinde ve ışık öğeleri kapının dışında opacity:0."
          rows={MEASURED_UK}
        />

        <div style={BOX}>
          <b style={KICKER_BASE}>Taban · bugün canlıda olan hâli</b>
          <p style={P}>
            Canlı bileşenin kendisi (<code>ThreeCountries.tsx</code>), kopya değil.
            Üç katlı noktalı yay, açılan panel ve yan yana kıyas görünümü burada
            duruyor. Adaylar bu bölümün <b style={STRONG}>yalnızca yay kısmını</b>{" "}
            yeniden yazıyor; panel ile kıyas tablosu hiçbir adayda yok, çünkü istek
            onlarla ilgili değil.
          </p>
        </div>
      </div>

      <ThreeCountries />

      <Kunye
        id="Aday 1"
        name="Halka"
        idea="Üç ülke tek bir halkanın üstünde; halkanın alt yayı onların altından geçip kapanıyor. Bölümün tamamı bir gezegen, üç ülke de kuşağın üstündeki duraklar. Işık halkanın üst yayında git gel yapıyor ve üç diskin de arkasından geçiyor."
        cost="Halka 124 piksel yer kaplıyor ve hiçbir bilgi taşımıyor. Daha önemlisi: kapalı bir elips üç ülkeyi bir sıraya değil bir çembere koyuyor, oysa bunlar bir döngünün parçası değil üç ayrı seçenek. Canlı yay en azından bir kemer olarak hiyerarşi çiziyordu."
      />
      <UlkeHalka />

      <Kunye
        id="Aday 2"
        name="Üç halka"
        idea="Saturn bölümün tamamına değil her ülkeye veriliyor: tek düz mavi çizgi üç diski diziyor, her diskin kendi eğik halkası var. Halka iki parça: arka yarısı diskin altında, ön yarısı üstünde. Derinliği yapan tek şey bu sıralama. Işık çizgide git gel yaparken üç halka sırayla parlıyor, dönüşte ters sırayla."
        cost="Üç halka üç ayrı süs demek: bölümde zaten üç bayrak, üç ad, üç künye ve bir çizgi var. Disk yuvası da halkasız hâle göre 28 piksel fazla istiyor."
      />
      <UlkeUcHalka />

      <Kunye
        id="Aday 3"
        name="Hat (halkasız)"
        idea="Halka yok, yay yok. Müşterinin diğer iki isteği aynen yerinde: tek düz mavi çizgi ve o çizgide sürekli git gel. Çizgi bir süs değil satırın kendi çizgisi. Aday 2 ile arasındaki tek fark halkalar ve disk boyu, yani ölçülen tek şey halkanın katkısı."
        cost="Sahne. Canlıdaki üç katlı yay bir açılış jesti veriyordu; burada geriye tek bir yatay hat kalıyor ve ana sayfada arka arkaya gelen bölümler birbirinden yalnızca içerikle ayrılır hâle geliyor. Buna karşılık band 124 pikselden 60'a iniyor."
      />
      <UlkeHat />

      {/* ==================================================================
          2 · FİYAT KARTLARI
          ================================================================== */}
      <div className="container-o" style={{ paddingTop: 56 }}>
        <div style={BOX}>
          <b style={KICKER}>2 · Rakamlar, ihtiyacınıza göre</b>
          <p style={P}>
            Ortağın cümlesi:{" "}
            <b style={STRONG}>
              &quot;Burada ki fiyatlar mavi cardların üzerinden olabilir king, daha
              hoş durur.&quot;
            </b>{" "}
            Bugün canlıda kart yok: üç sütun saç teliyle bölünmüş, zemin siyah ve
            rakam doğrudan siyahın üstünde duruyor. Yani istek iki şey birden:
            kart olsun ve mavi olsun.
          </p>
        </div>

        <div style={BOX}>
          <b style={KICKER}>Bu turun asıl kısıtı tasarım değil, tek bir sayı</b>
          <p style={P}>
            Marka mavisi <code>--blue-700</code> (#307fe2) üzerine{" "}
            <b style={STRONG}>beyaz metin 3.99:1</b>. Normal punto eşiği 4.5:1, yani{" "}
            <b style={STRONG}>düşüyor</b>. Aynı renk büyük yazı (24px ve üstü ya da
            18.66px kalın) ve grafik için 3:1 eşiğini geçiyor. Beyazdan daha açık bir
            renk olmadığı için marka mavisinin üstünde 14 punto bir etiketi okunur
            yapmanın hiçbir yolu yok.
          </p>
          <p style={P}>
            Üç aday bu tek sayının etrafında kuruldu ve üç farklı cevap veriyor:{" "}
            <b style={STRONG}>Aday 1</b> maviyi koyulaştırıyor,{" "}
            <b style={STRONG}>Aday 2</b> mavi yüzeyi küçültüyor,{" "}
            <b style={STRONG}>Aday 3</b> küçük metni maviden çıkarıyor. Yani soru
            &quot;hangisi daha güzel&quot; değil:{" "}
            <b style={STRONG}>markanın mavisinden ne kadar vazgeçiyoruz.</b>
          </p>
        </div>

        <div style={BOX}>
          <b style={KICKER}>Rakamlar: ne değişti, ne değişmedi</b>
          <p style={P}>
            <b style={STRONG}>Hiçbir tutar yazılmadı.</b> Başlangıç tutarı{" "}
            <code>brand.ts · FACTS[c].from</code>, ek kalemler{" "}
            <code>pricing.ts · PRICING[c]</code> üzerinden okunuyor.{" "}
            <code>pricing.ts</code> dosyasına dokunulmadı.
          </p>
          <p style={P}>
            <b style={STRONG}>Çözülmemiş çelişki bilerek çözülmedi.</b>{" "}
            <code>afterSetup.ts</code> Dubai&apos;de aylık muhasebeyi 350 USD diyor
            (12 ay = 4.200 USD), <code>pricing.ts</code> ise yıllık 2.100 basıyor.
            Hangisinin doğru olduğu müşterinin kararı; o karar gelene kadar bu
            adaylar canlı bölümün bugün bastığı sayıyı basıyor,{" "}
            <b style={STRONG}>fazlasını değil</b>. Aylık bir tutar hiçbir adayda
            ekrana gelmiyor. Karar geldiğinde değişecek tek yer{" "}
            <code>pricing.ts</code> ve üç aday da kendiliğinden düzelir.
          </p>
        </div>

        <Olcum
          cap="Fiyat kartları. Yükseklik 1440 pikselde, karşılaştırılan kutu sütun ızgarası (.fy2-cols ile .mkx-cols); iki değerden ilki hiçbir kalem seçili değilken, ikincisi üç kalem de açıkken. Taban satırının animasyonu sıfır çünkü canlı bölümde sürekli dönen bir döngü yok; hareketin tamamı giriş ve hover. Üç adayın üçü de kart başına bir döngü taşıyor, yani ekranda üç kart varken üç döngü. Dört genişlikte de yatay taşma sıfır."
          rows={MEASURED_FY}
        />

        <div style={{ marginTop: 24, maxWidth: "88ch", overflowX: "auto", position: "relative" }}>
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
              Kontrast. Tarayıcıda gerçekten basılan renkler üzerinden ölçüldü,
              elle hesaplanmadı: saydam metin renkleri altındaki opak zeminle
              birleştirilerek çözüldü. Eşikler: normal metin 4.5:1, büyük metin (24px
              ve üstü ya da 18.66px kalın) 3:1, grafik 3:1. Hareketli ışıkların ikisi
              zemini KOYULAŞTIRIYOR, üçüncüsü hiçbir metnin arkasında değil. Yani bu
              değerler turun her karesi için geçerli, yalnızca duruş karesi için
              değil.
            </caption>
            <thead>
              <tr>
                {["", "zemin", "metin", "oran", "sonuç"].map((c, i) => (
                  <th
                    key={c || "k"}
                    scope="col"
                    style={{
                      padding: "0 10px 8px",
                      borderBottom: "1px solid var(--border)",
                      textAlign: i === 0 || i === 4 ? "left" : "right",
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
              {CONTRAST.map((r) => (
                <tr key={r.k}>
                  <th scope="row" style={CELL_K}>
                    {r.k}
                  </th>
                  <td style={CELL}>{r.zemin}</td>
                  <td style={CELL}>{r.metin}</td>
                  <td style={CELL}>{r.o}</td>
                  <td style={CELL_L}>{r.e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={BOX}>
          <b style={KICKER_BASE}>Taban · bugün canlıda olan hâli</b>
          <p style={P}>
            Canlı bileşenin kendisi (<code>PriceSummary.tsx</code>). Kart yok, üç
            sütun saç teliyle bölünmüş ve bölümün kendi notu bunun neden böyle
            olduğunu yazıyor: <b style={STRONG}>rakam bloğu taşıyor.</b> Üç adayda da
            kaybolan şey bu: rakam bir kutunun içine giriyor.
          </p>
          <p style={P}>
            Aşağıdaki seçici <b style={STRONG}>üç adayı birden</b> sürüyor. Bir kaleme
            basın: üç tasarımın da nasıl uzadığını ve rakamların nasıl döndüğünü aynı
            anda görün.
          </p>
        </div>
      </div>

      <PriceSummary />

      <MaviKartLab
        n1={
          <Kunye
            id="Aday 1"
            name="Tam mavi kart"
            idea="Kartın tamamı mavi, isteğin en doğrudan okuması. Renk --blue-900 (#1b56a8) çünkü marka mavisinde kalem etiketleri kontrast eşiğinin altında kalıyordu; bu tonda beyaz 7.13:1. Kartın üst kenarında ülke bölümündekiyle aynı dilde bir git gel ışığı var."
            cost="Bu artık markanın mavisi değil, koyu tonu. Ayrıca canlı hâlde rakam doğrudan siyahın üstünde duruyor ve bölümün tamamı 'rakam' diye okunuyor; kart geldiğinde ağırlık merkezi rakamdan kutuya kayıyor. Üç adayın bu bedeli en çok ödeyeni bu."
          />
        }
        n2={
          <Kunye
            id="Aday 2"
            name="Mavi plaka"
            idea="Kart koyu kalıyor, mavi olan yalnızca rakamın oturduğu plaka. Cümleyi en dar okuyan aday: mavi olan şey fiyatın kendisi. Plaka --blue-800 ve üstündeki beyaz 5.45:1, yani normal punto bile geçiyor. Kontrast yüzünden en az bükülmüş tasarım bu."
            cost="En az 'mavi kart' olan aday. Müşteri kartın kendisinin mavi olmasını kastettiyse bu cevap eksik kalır. Buna karşılık bölümün gece kimliği bozulmuyor, canlı hâle en yakın duran düzen bu."
          />
        }
        n3={
          <Kunye
            id="Aday 3"
            name="Mavi kabuk"
            idea="Kart marka mavisinde: üç aday içinde markanın kendi rengini büyük yüzeyde kullanan tek aday. Kabukta yalnızca ülke adı (22px kalın) ve rakam duruyor, ikisi de 'büyük yazı' eşiğini geçiyor; kalem listesinin tamamı beyaz bir panele iniyor ve orada metin 19:1'e çıkıyor. Kontrast sorununu gizlemiyor, tasarıma çeviriyor."
            cost="İki yüzey iki dolgu demek: kart üçünün en uzunu. Beyaz panel bölümün gece zeminini de kırıyor: siyah bir bölümde üç beyaz dikdörtgen, canlı hâlin sessizliğinden en uzak duran öneri bu."
          />
        }
      />

      <div className="container-o" style={{ paddingBlock: 56 }}>
        <div style={BOX}>
          <b style={KICKER}>Karar verilirse ne olacak</b>
          <p style={P}>
            Kazanan aday kendi bölümünün dosyasına taşınır (
            <code>countries.css</code> ve <code>ThreeCountries.tsx</code>, ya da
            fiyat bloğu için <code>globals.css</code>&apos;in <code>.fy2-</code>{" "}
            bölümü ve <code>PriceSummary.tsx</code>), kaybedenler ile{" "}
            <code>src/components/lab</code> altındaki kopyaları silinir,{" "}
            <code>globals.css</code>&apos;teki iki <code>@import</code> satırı kalkar
            ve bu rota gider.
          </p>
          <p style={P}>
            <code>src/components/lab/fiyatKart.ts</code> içindeki metin sabitleri
            (kapsam cümleleri, kalem adları, dürüst dipnotlar){" "}
            <code>PriceSummary.tsx</code>&apos;ten aynalandı çünkü o dosya bu turda
            salt okunur ve export edemiyordu.{" "}
            <b style={STRONG}>
              Tur kapanmadan o satırlar canlıda değişirse buraya da elle taşınmalı.
            </b>
          </p>
        </div>
      </div>
    </main>
  );
}
