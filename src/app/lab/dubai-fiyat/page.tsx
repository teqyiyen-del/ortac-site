import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import CountryPricing from "@/components/CountryPricing";
import FiyatDF1 from "@/components/lab/FiyatDF1";
import FiyatDF2 from "@/components/lab/FiyatDF2";
import FiyatDF3 from "@/components/lab/FiyatDF3";
import { COUNTRY_LABELS } from "@/lib/store";

/* /lab/dubai-fiyat — ÜLKE SAYFASININ FİYAT BÖLÜMÜ, YENİ TUR.
 *
 * Müşteri: "dubai fiyat kısmını eski haline çevir ve o kısım için labda tasarım
 * dene yeni daha farklı nasıl bi fiyat kısmı yaparız fln diye."
 *
 * İki iş var, ikisi ayrı yerde yapıldı. Canlı bölüm BAŞKA BİR AJAN tarafından
 * eski hâline (siyah zemin, .ip-) döndürüldü; bu sayfa yalnızca YENİ ARAYIŞ.
 * En üstte taban duruyor — bugün canlıda olan bileşenin ta kendisi, kopyası
 * değil: <CountryPricing> doğrudan import edildi. Sebep basit, kıyas ancak
 * taban gerçekten canlının bastığı şeyse anlamlı; kopyalasaydım canlı bir gün
 * değiştiğinde bu sayfa sessizce yalan söylemeye başlardı.
 *
 * ÜLKE NEDEN DUBAI: rota adı öyle ve üç ülke içinde tek "tam" veri seti onda —
 * vize kalemi yalnızca Dubai ve KKTC'de var (İngiltere perVisa = 0), Platinium
 * ile Basic arasındaki mesafe en geniş orada. Üç aday da country propu alıyor,
 * yani ülke değiştirmek tek satır.
 *
 * ÜÇ ADAY ÜÇ AYRI SORUYA CEVAP VERİYOR, birbirinin renk varyasyonu değil:
 *   DF1 tutarı YUKARI ALIYOR (yapışkan çubuk, tek sütun, aydınlık zemin)
 *   DF2 tutarı ÜÇE ÇIKARIYOR (üç paket aynı anda, kıyas tablosu, beyaz zemin)
 *   DF3 tutarı ÇİZİYOR (yığılmış şerit, oran okuması, açık mavi zemin)
 * Ayrıntılı gerekçe ve her adayın neyi feda ettiği bileşen dosyalarının
 * başında; buradaki künyeler o kararların özeti.
 */

export const metadata = {
  title: "Fiyat bölümü · aday tasarımlar | Ortac Global",
  robots: { index: false, follow: false },
};

const COUNTRY = "dubai" as const;
const NAME = COUNTRY_LABELS[COUNTRY];

type KunyeData = {
  id: string;
  kind: string;
  fikir: string;
  cevap: [string, string][];
  feda: string;
};

const KUNYE: Record<string, KunyeData> = {
  taban: {
    id: "TABAN",
    kind: "Bugün canlıda · /dubai #fiyat",
    fikir:
      "Solda beyaz form kartı, sağda yapışkan siyah tutar paneli. Bölümün tamamı gece zemininde. Bu turun kıyas noktası; aşağıdaki üç aday bunun neyini değiştirdiğini anlatıyor.",
    cevap: [
      ["Tutar nerede", "Sağda yapışkan panel. 960px'in altında ızgaranın ikinci satırına düşüyor, yani telefonda bütün seçimler sayı ekranda yokken yapılıyor."],
      ["Ne kaybettiğini görüyor mu", "Hayır. Seçilmeyen kalem satır listesinden tamamen düşüyor; fiyatı hiçbir yerde yazmıyor. Ek hizmet anahtarının yanında da rakam yok."],
      ["Paket farkı görünüyor mu", "Kısmen. Kartta ad, tek satır künye ve fiyat var; neyin dahil olduğu ancak paket seçildikten sonra anahtarların kilitlenmesinden anlaşılıyor."],
      ["Zemin", "Gece. Sayfa ritmi sorunu burada: hemen üstteki MoneyHome de sec-night, yani canlıda şu an arka arkaya iki gece bloğu var."],
    ],
    feda: "",
  },
  df1: {
    id: "DF1",
    kind: "Tutar yukarıda durur",
    fikir:
      "Tek sütun. Tutar sağ panelden çıkıp bölümün başına yapışkan bir çubuğa taşınıyor ve her genişlikte seçimlerin üstünde kalıyor. Seçimler numaralı üç satır; her ek hizmetin fiyatı kararın yanında yazıyor. Döküm en altta, üstelik seçilmeyen kalemler de fiyatıyla listede.",
    cevap: [
      ["Tutar nerede", "En üstte, yapışkan çubukta. 320px'te de 1440'ta da aynı yerde; ikinci satıra düşmüyor."],
      ["Ne kaybettiğini görüyor mu", "İki yerde. Her değişimde çubuktan +$600 / −$600 pulu çıkıyor; ayrıca dökümde 'Eklemediğiniz kalemler' başlığı altında seçilmeyenler fiyatıyla duruyor."],
      ["Paket farkı görünüyor mu", "Evet. Üç kartın her birinde aynı üç satır (banka · vize · muhasebe) tik/tire deseniyle basılıyor; kıyaslanan şey ad değil desen."],
      ["Zemin", "Aydınlık (--paper). Siyah kalkmıyor ama bölüm değil çubuk oluyor. MoneyHome'un altına aydınlık bir blok geliyor, ritim düzeliyor."],
    ],
    feda:
      "Sayı ile döküm artık aynı bakışta değil: biri en üstte, diğeri en altta. Yapışkan çubuk bölüm kabına bağlı, sayfa geneline sabitlenmiş bir bar değil; bölüm bitince ekrandan çıkıyor.",
  },
  df2: {
    id: "DF2",
    kind: "Üç tutar aynı anda",
    fikir:
      "Yapılandırıcı değil kıyas tablosu. Ziyaretçi paketi değil İHTİYACINI işaretliyor; üç paket de aynı ihtiyaç listesine kendi fiyatını söylüyor. Aynı satır üç sütunda üç farklı şey yazıyor: 'dahil' / '+$600' / soluk '+$600'. Sütun diplerinde seçili pakete göre fark.",
    cevap: [
      ["Tutar nerede", "Üç tane var, üçü de sürekli ekranda, her sütunun dibinde. Paket değiştirip sayının değişmesini izlemek gerekmiyor."],
      ["Ne kaybettiğini görüyor mu", "Üç kere. Bir ihtiyaç kapatılınca satır üç sütunda birden soluyor, fiyatı silinmiyor, üç toplam birden düşüyor."],
      ["Paket farkı görünüyor mu", "Bölümün tamamı bu. Hücrenin kendisi fark; ayrıca dipte −$1.300 / +$2.800 gibi doğrudan fark yazıyor."],
      ["Zemin", "Beyaz. Yan yana üç sütunu ayıran şey ince çizgi ve dolgu farkı; gece zeminde bu ayrımlar 1,2:1 civarına düşüyor (canlı .ip-tier kenarının bugün ölçülmüş sorunu)."],
    ],
    feda:
      "Tek bir 'sizin tutarınız' odağı yok; hangisinin cevap olduğu tipografik büyüklükten değil seçili sütunun çerçevesinden anlaşılıyor. Ayrıca ihtiyaç modeli canlıdan ayrılıyor: banka artık pakete bağlı bir ek hizmet değil, ziyaretçinin ihtiyacı.",
  },
  df3: {
    id: "DF3",
    kind: "Tutar bir şerit · açık mavi",
    fikir:
      "Fiyat yazılmıyor, çiziliyor. Yığılmış şeritte her kalem tutarı kadar yer kaplıyor; almadıklarınız kesikli hayalet dilim olarak sonda duruyor. Dilimler tıklanabilir: dolu dilime basınca kalem çıkıyor ve dilim yerinde hayalete dönüşüyor. Paket değişince taban dilim ekleri yutuyor.",
    cevap: [
      ["Tutar nerede", "Seçimin hemen altında, akışın içinde. Sabit panel de yapışkan çubuk da yok; tutar hem rakam hem uzunluk."],
      ["Ne kaybettiğini görüyor mu", "Şeridin üzerinde, fiziksel uzunluk olarak. 'Bugünkü tutar' ile 'hepsini alsam' arasındaki mesafe kesikli dilimlerin genişliği kadar."],
      ["Paket farkı görünüyor mu", "Yutma hareketiyle. Paket büyüyünce ek dilimler şeritten kayboluyor çünkü tabanın içine giriyorlar; altındaki cümle bunu yazıyla da söylüyor."],
      ["Zemin", "AÇIK mavi (--blue-100). Müşterinin istediği mavi bırakılmadı ama yönü çevrildi: geçen tur denenip geri alınan koyu mavi değil. Hem ritim hem kontrast bu yüzden düzeliyor."],
    ],
    feda:
      "Şerit oranı iyi anlatıyor ama küçük kalemler dar dilime düşüyor; altındaki künye listesi süs değil zorunlu. Ayrıca şerit bir grafik: tek başına ekran okuyucuya yetmiyor, her dilimin aria-label'i ayrıca yazıldı.",
  },
};

function Kunye({ k }: { k: KunyeData }) {
  return (
    <div className="container-o">
      <div className="dfx-kunye">
        <div className="dfx-kunye-h">
          <span className="dfx-tag">{k.id}</span>
          <span className="dfx-kind">{k.kind}</span>
        </div>
        <p className="dfx-fikir">{k.fikir}</p>
        <dl className="dfx-qa">
          {k.cevap.map(([q, a]) => (
            <div key={q} className="dfx-qa-i">
              <dt className="dfx-q">{q}</dt>
              <dd className="dfx-a">{a}</dd>
            </div>
          ))}
        </dl>
        {k.feda !== "" && (
          <p className="dfx-feda">
            <b>Feda edilen</b>
            {k.feda}
          </p>
        )}
      </div>
    </div>
  );
}

/* Kıyas tablosunun satırları. Sayılar tarayıcıda ölçüldü (1440x900, Chrome,
   /lab/dubai-fiyat, varsayılan seçimler); ölçüm yöntemi tablonun altındaki
   notta yazıyor. */
const CMP: { k: string; taban: string; df1: string; df2: string; df3: string }[] = [
  {
    k: "Okuma modu (tutar kaç ayrı yoldan okunuyor)",
    taban: "2 · büyük rakam, satır dökümü",
    df1: "4 · çubuk rakamı, fark pulu, döküm, eklenmeyenler listesi",
    df2: "3 · üç sütun toplamı, hücre başına dahil/ücretli, dipteki fark",
    df3: "3 · büyük rakam, şerit oranı, künye listesi",
  },
  {
    k: "Üç paketin aynı ihtiyaçla fiyatını görmek (tıklama)",
    taban: "2",
    df1: "2",
    df2: "0",
    df3: "2",
  },
  {
    k: "Bir ek hizmetin fiyatını öğrenmek (tıklama)",
    taban: "1 · açıp satırı okumak, sonra geri almak",
    df1: "0 · anahtarın yanında yazıyor",
    df2: "0 · hücrede yazıyor",
    df3: "0 · hayalet dilim ve künye satırı",
  },
  {
    k: "Hedef kuruluma ulaşma (Platinium + 2 vize + muhasebe)",
    taban: "3",
    df1: "3",
    df2: "3",
    df3: "3",
  },
  {
    k: "Bölüm yüksekliği · 1440px",
    taban: "954 px",
    df1: "1.713 px (tabanın %80 üstünde)",
    df2: "1.455 px",
    df3: "1.192 px",
  },
  {
    k: "Bölüm yüksekliği · 768px",
    taban: "1.317 px",
    df1: "1.586 px",
    df2: "2.489 px (üç sütun alt alta düşüyor)",
    df3: "1.111 px",
  },
  {
    k: "Bölüm yüksekliği · 390px",
    taban: "1.806 px",
    df1: "2.242 px",
    df2: "2.749 px",
    df3: "1.530 px",
  },
  {
    k: "Bölüm yüksekliği · 320px",
    taban: "2.002 px",
    df1: "2.457 px",
    df2: "2.888 px",
    df3: "1.658 px",
  },
  {
    k: "En kötü kontrast (metin)",
    taban: "3,81:1 · .ip-note, 12px, rgba(255,255,255,.4) / #111111 · eşik 4,5",
    df1: "4,80:1 · --red-600 fark pulu ve --text-600 ipuçları --paper üstünde",
    df2: "5,24:1 · --red-600 fark satırı beyaz üstünde",
    df3: "5,02:1 · #080808 taban dilim yazısı #307fe2 üstünde",
  },
  {
    k: "En kötü kontrast (arayüz sınırı, eşik 3:1)",
    taban: "1,24:1 · --night-line kart kenarı #111111 üstünde",
    df1: "3,45:1 · kart kenarı #d2d2d2 --paper üstünde",
    df2: "3,99:1 · seçili sütun kenarı #307fe2 beyaz üstünde",
    df3: "3,50:1 · şerit dilimi #307fe2 bölüm zemini #e8f1fd üstünde",
  },
  {
    k: "Yatay taşma · 320 / 390 / 768 / 1440",
    taban: "0 / 0 / 0 / 0 px",
    df1: "0 / 0 / 0 / 0 px",
    df2: "0 / 0 / 0 / 0 px",
    df3: "0 / 0 / 0 / 0 px",
  },
  {
    k: "Sürekli animasyon (periyot)",
    taban: "0",
    df1: "1 · 25,1s çubuk taraması (fark pulu tek seferlik, 0,52s)",
    df2: "2 · 26,3s seçili sütun parlaması, 26,9s canlı noktası",
    df3: "2 · 27,7s şerit parlaması, 28,1s hayalet kesikleri",
  },
  {
    k: "Sayfa ritmine etkisi (üstünde sec-night MoneyHome var)",
    taban: "Arka arkaya iki gece bloğu",
    df1: "Gece → aydınlık, ritim kırılıyor",
    df2: "Gece → beyaz, ritim kırılıyor",
    df3: "Gece → açık mavi, ritim kırılıyor ve mavi sayfada yeni bir zemin",
  },
];

export default function LabDubaiFiyatPage() {
  return (
    <main className="dfx-page">
      <div className="container-o dfx-intro">
        <h1 className="h2 dfx-title">Fiyat bölümü · yeni tur</h1>
        <p className="dfx-lead">
          En üstte bugün canlıda olan hâl duruyor; kopyası değil, <code>CountryPricing</code>{" "}
          bileşeninin kendisi. Altındaki üç aday aynı bölümün işini (paket ve ek hizmet seç,
          tutar satır satır oluşsun) bozmadan dört soruya farklı cevap veriyor: tutar nerede
          görünmeli, ziyaretçi çıkardığı kalemin ne kadar olduğunu görüyor mu, paketler arası
          fark ekranda görünüyor mu, ve bölüm hangi zeminde durmalı. Dördü de{" "}
          <code>lib/pricing.ts</code>&apos;in bugün bastığı sayıları basıyor; o dosyaya
          dokunulmadı. Ülke Dubai.
        </p>
        <p className="dfx-lead">
          Rozet hiçbir adayda yok. Hangi paketin en çok tercih edildiği doğrulanmış bir bilgi
          değil; mekanizma canlıda kurulu ve bilerek boş, adaylarda da boş.
        </p>
      </div>

      {/* ---------------- TABAN ---------------- */}
      <section className="sec-pad sec-night">
        <div className="container-o">
          <div className="sec-head sec-head-dark">
            <SplitWords
              as="h2"
              text="Kurulumunuzu seçin, fiyat anında çıksın."
              accent="fiyat anında çıksın."
              className="h2"
              style={{ color: "#ffffff" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead sec-lead-dark">
                {NAME} için paket ve ek hizmetleri seçin; tutar sağda satır satır oluşur.
              </p>
            </FadeUp>
          </div>
          <CountryPricing country={COUNTRY} />
        </div>
      </section>
      <Kunye k={KUNYE.taban} />

      {/* ---------------- DF1 ---------------- */}
      <FiyatDF1 country={COUNTRY} name={NAME} />
      <Kunye k={KUNYE.df1} />

      {/* ---------------- DF2 ---------------- */}
      <FiyatDF2 country={COUNTRY} name={NAME} />
      <Kunye k={KUNYE.df2} />

      {/* ---------------- DF3 ---------------- */}
      <FiyatDF3 country={COUNTRY} name={NAME} />
      <Kunye k={KUNYE.df3} />

      {/* ---------------- çelişki kutusu ---------------- */}
      <div className="container-o">
        <div className="dfx-warn">
          <h2 className="dfx-warn-h">Çözülmemiş çelişki · aylık muhasebe tutarı</h2>
          <p>
            <code>lib/afterSetup.ts</code> muhasebe hizmetini <b>350 USD/ay</b> diye kaydediyor,
            yani on iki ayda 4.200 USD. <code>lib/pricing.ts</code> ise aynı hizmeti{" "}
            <b>2.100 USD/yıl</b> olarak basıyor ve fiyat yapılandırıcısındaki &quot;Yıllık
            muhasebe&quot; kalemi ile &quot;Yıllık gider&quot; satırı bu ikinci sayıyı gösteriyor.
            İki kayıt aynı hizmeti anlatıyor ve birbirini tutmuyor; aradaki fark iki katın
            altında değil, tam <b>2.100 USD</b>.
          </p>
          <p>
            <b>Bu turda ne yapıldı:</b> hiçbir adayda aylık tutar ekrana getirilmedi. Üç aday da
            yalnızca yıllık rakamı basıyor, çünkü ikisini yan yana koymak ziyaretçiye aynı
            hizmetin iki fiyatını göstermek olurdu. Sayı da düzeltilmedi; hangisinin doğru
            olduğu bu depoda yazmıyor ve <code>pricing.ts</code> bu turda dokunulmayacak
            dosyalardan.
          </p>
          <p>
            <b>Karar gerekiyor:</b> aylık 350 mi doğru, yıllık 2.100 mü? Cevap geldiğinde
            düzeltme iki dosyada birden yapılmalı; tek tarafı değiştirmek çelişkiyi yer
            değiştirtmekten başka işe yaramaz. Aynı kutuda ikinci bir kalem daha var:
            afterSetup vize/ID kalemini kişi başı 2.400 USD, pricing ise 750 USD yazıyor.
          </p>
        </div>
      </div>

      {/* ---------------- kıyas tablosu ---------------- */}
      <div className="container-o">
        <h2 className="dfx-cmp-h">Kıyas</h2>
        {/* overflow-x taşıyan kabın position:relative olması ZORUNLU: yoksa
            mutlak konumlu torunlar (Tailwind .sr-only dahil) kaptan kaçıp
            belgeyi yatayda uzatıyor. Bu depoda iki kez oldu. */}
        <div className="dfx-cmp">
          <table className="dfx-tbl">
            <thead>
              <tr>
                <th scope="col">Ölçü</th>
                <th scope="col">TABAN</th>
                <th scope="col">DF1</th>
                <th scope="col">DF2</th>
                <th scope="col">DF3</th>
              </tr>
            </thead>
            <tbody>
              {CMP.map((row) => (
                <tr key={row.k}>
                  <th scope="row">{row.k}</th>
                  <td>{row.taban}</td>
                  <td>{row.df1}</td>
                  <td>{row.df2}</td>
                  <td>{row.df3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="dfx-cmp-n">
          Yükseklikler <code>getBoundingClientRect().height</code> ile, taşma{" "}
          <code>window.scrollTo(9999,0)</code> sonrası <code>scrollX</code> okunarak ölçüldü;{" "}
          <code>body&#123;overflow-x:clip&#125;</code> yüzünden <code>scrollWidth</code> bu
          depoda yalan söylüyor. Periyotlar <code>getAnimations()</code> ile doğrulandı.
        </p>
      </div>
    </main>
  );
}
