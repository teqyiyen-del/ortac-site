import AboutBentoBase from "@/components/lab/AboutBentoBase";
import AboutBentoKaro from "@/components/lab/AboutBentoKaro";
import AboutBentoBeyan from "@/components/lab/AboutBentoBeyan";
import AboutBentoYerinde from "@/components/lab/AboutBentoYerinde";
import AboutBentoAkis from "@/components/lab/AboutBentoAkis";
import AboutBentoOyma from "@/components/lab/AboutBentoOyma";
import AboutBentoMuhur from "@/components/lab/AboutBentoMuhur";

/* ============================================================================
   LAB · /hakkimizda · "Kim olduğumuz" bölümünün bentosu

   ---------------------------------------------------------------- 2. TUR
   MÜŞTERİNİN KARARI:

     "hakkımızda bentoları iyi olmuş hoş olmuş ama zaten sayfanın az aşağısına
      kayınca üç ülkede çalışıyoruz diyip detaylı bilgi vermişiz ya o yüzden
      tekrar bentoda verince biraz garip oluyor. bentoyu biraz daha tasarımsal
      odakta fln yapmak lazım fazla bilgi vermeye uğraşmaktan ziyade
      animasyonlu fln fistan bişiler olmalı. aslında sayfanın devamında bir çok
      ana başlığı detaylı açıyoruz zaten o yüzden ordakilerin hepsinin çok özet
      hali olmalı bu kısım. tasarım odaklı düşün o yüzden bir şeyler anlatmaya
      çalışmana gerek yok."

   Birinci turun üç adayı (Karo · Beyan · Yerinde) BEĞENİLDİ ama yanlış
   problemi çözdü: üçü de bentoyu daha iyi ANLATMAYA çalıştı. Bu turun tek
   kuralı bentonun anlatmaması. Üç eski aday silinmedi, aşağıda "ex" başlığı
   altında duruyor — kıyasın metin tarafını onlar tutuyor.

   Bu sayfa canlı hiçbir şeye dokunmuyor. /hakkimizda, hakkimizda.css,
   aktarim.css ve TrustLayer.tsx bu turda yalnızca OKUNDU.
   ========================================================================= */

/* ------------------------------------------------------------ metin sayımı
   BU TURUN ASIL ÖLÇÜSÜ. Sayılar tarayıcıda tek seferlik alındı: her blok sabit
   genişlikli (1280 piksel) aynı köken iframe'inde açıldı ve bölümün GÖRÜNÜR
   metni sayıldı: sayım DOM'u geziyor, gizli ögeleri (display:none,
   visibility:hidden) ve <style>/<script> içeriğini atlıyor, kalan metin
   düğümlerinin boşlukları sadeleştirilmiş uzunluğunu topluyor.

   aria-hidden alt ağaçları SAYIMA DAHİL ve bu bilerek: bir ekran okuyucudan
   gizlenmiş rakam ekranda hâlâ duruyor. Bugünkü bentonun zincir numaraları
   (01 … 05) ve birinci turun ray numaraları böyle sayıldı; kural yeni üç
   adayın lehine değil aleyhine işliyor, çünkü onların aria-hidden
   bölgelerinde zaten hiç metin yok.

   İKİ SÜTUN VAR ÇÜNKÜ ADAYLAR AYNI ŞEYİ KAPSAMIYOR: bazı adaylar bölüm
   başlığı ve giriş paragrafı da getiriyor (Karo, Beyan), taban ise bentonun
   üstündeki "Vizyon ve misyon firmanın kendi resmî ifadesi" satırını
   taşıyor; o satır bugün sayfada gerçekten orada duruyor ama bentonun
   parçası değil. "Bento" sütunu yalnızca ızgarayı sayıyor, "Bölüm" sütunu
   bileşenin ekrana bastığı her şeyi. Karar ikisine birden bakılarak verilir. */
const METIN_COLS = ["", "bölüm", "bento", "tabana göre"];

type MetinRow = { k: string; bolum: number; bento: number; not?: string };

const METIN: MetinRow[] = [
  { k: "Taban · bugünkü blok", bolum: 272, bento: 193, not: "ölçüt" },
  { k: "ex · Aday 1 · Karo", bolum: 1625, bento: 1375 },
  { k: "ex · Aday 2 · Beyan", bolum: 1254, bento: 1254 },
  { k: "ex · Aday 3 · Yerinde", bolum: 1187, bento: 1108 },
  { k: "Aday 4 · Akış", bolum: 4, bento: 4 },
  { k: "Aday 5 · Oyma", bolum: 3, bento: 3 },
  { k: "Aday 6 · Mühür", bolum: 0, bento: 0 },
];

/* Son sütun: tabanla oran. Büyükler kat, küçükler kesir olarak yazılıyor —
   "× 0,01" hiçbir şey anlatmıyor, "1 / 68" anlatıyor. */
function oran(bolum: number, taban: number) {
  if (bolum === 0) return "0";
  if (bolum >= taban) return `× ${(bolum / taban).toFixed(1).replace(".", ",")}`;
  return `1 / ${Math.round(taban / bolum)}`;
}

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
  { k: "Taban · bugünkü blok", v: ["10 / 9", "23 s", 123, 914, 879, 701, 680] },
  { k: "ex · Aday 1 · Karo", v: ["10 / 9", "35,9 s", 238, 3013, 2649, 1417, 1233] },
  { k: "ex · Aday 2 · Beyan", v: [6, "44,3 s", 247, 2535, 2264, 1613, 1148] },
  { k: "ex · Aday 3 · Yerinde", v: [13, "33,7 s", 184, 2331, 2067, 1627, 1064] },
  { k: "Aday 4 · Akış", v: [25, "11,3 s", 118, 800, 800, 472, 552] },
  { k: "Aday 5 · Oyma", v: [17, "19,9 s", 101, 717, 710, 710, 462] },
  { k: "Aday 6 · Mühür", v: [18, "41,9 s", 107, 476, 476, 522, 748] },
];

/* ------------------------------------------------------------ bu turun üçü */
const CANDIDATES = [
  {
    id: "Aday 4",
    name: "Akış",
    kind: "Tek makine · aktarım dalgası",
    Section: AboutBentoAkis,
    idea:
      "Bento dört ayrı kart değil tek bir makine. Dört karo aynı enerji geçişinin dört durağı: ışık ülkelerden çıkıyor, zincirin beş halkasından geçiyor, altı sektöre yayılıyor, dayanaklara varıyor. Karolar arasında çizgi yok; onları bağlayan şey sıra: ışığın hangi karoda ne zaman göründüğü. Ana sayfanın geometrisi ve tonu alındı (2 · 4 / 4 · 2, iki koyu iki açık), anatomisi alınmadı: başlık, satır ve dipnot yok.",
    text:
      "Dört rakam, etiketsiz. Karonun ne saydığını yanındaki nesneler söylüyor: üç bayrak, beş halka, altı sektör işareti, dört mühür. Rakamlar dizi uzunluğundan, elle yazılmıyor. Tabana göre altmış sekizde bir; birinci turun en hafif adayına göre (Yerinde, 1.187) yaklaşık üç yüzde bir.",
    motion:
      "İki katman. SÜREKLİ: ray boyunca hiç durmayan bir parıltı (10,3 s), ekran hiçbir an ölü değil. OLAY: 11,3 saniyede bir bütün bentoyu kat eden aktarım dalgası; on dokuz durak, 5,4 saniyede baştan sona. Yirmi beş sonsuz animasyon: kalıbın iki adaptörünü birden okuyan duraklar (halkalar) iki animasyon sayılıyor. Önceki turda bir sahne 34 saniyede bir dönüyordu ve müşteri görmediğini söylemişti; bu onun üç katı sıklık.",
    akt: "Evet, ve adayın omurgası bu. Dalganın tamamı aktarim.css; lab-hb4.css'te mekanizmanın tek satırı yok, yalnızca durak sırası, adaptör ve renkler var. Duraklar dört karoya birden yayılıyor; kalıp bu depoda ilk kez tek bir bileşenin içinde değil, bir ızgaranın tamamında kullanılıyor.",
    tekrar:
      "Sayfanın 2, 4, 5 ve 6. bölümlerinin dördü de burada temsil ediliyor ama hiçbirinin cümlesi geçmiyor. Ziyaretçi burada bir şey öğrenmiyor, sayfanın neyle ilgili olduğunu görüyor.",
    cost:
      "Rakamların etiketsizliği. Üç bayrağın yanındaki 3 kendini açıklıyor, dört soyut mührün yanındaki 4 açıklamıyor: o karo yalnızca 'dört tane bir şey' diyor. İkinci bedel: ızgara ana sayfanınkiyle aynı, bir ziyaretçi iki bölümü arka arkaya okursa geometriyi tanıyabilir.",
  },
  {
    id: "Aday 5",
    name: "Oyma",
    kind: "Afiş · ızgara verinin kendisi",
    Section: AboutBentoOyma,
    idea:
      "Bento bir kart dizisi değil afiş. Üç karonun her birinde tek bir dev rakam var ve rakam karonun içeriği değil YÜZEYİ: gövdesinden ışık geçiyor, işaretler üstüne biniyor. Asıl hamle ızgarada: karo genişlikleri saydıkları sayıyla orantılı, 3 : 5 : 6. Sıra da elle dizilmedi, sayıya göre artan. Bir sektör eklendiğinde o karo kendiliğinden genişliyor.",
    text:
      "Üç rakam. Bloğun taşıdığı tek şey bu; ülke adı, halka adı, sektör adı yok. Tabana göre doksan birde bir.",
    motion:
      "İki mekanik, ikisi de kesintisiz. Rakamın gövdesinden geçen ışık durmadan akıyor (14,9 s, karo başına biri, üçü ayrı evrede). On dört işaret tek bir dalga hâlinde sırayla bir tık yükseliyor (19,9 s), yani ortalama her 1,4 saniyede bir şey oluyor. Boş an yok ama tek bir nesnenin yaptığı iş dört piksel ve bir halka.",
    akt: "Hayır, bilerek. Kararı verecek kişi kalıbın kullanıldığı hâli (aday 4 · aday 6) ile kullanılmadığı hâli yan yana görmeli. Buradaki hareket bir aktarım değil bir NEFES: yön yok, dalga bir yerden bir yere gitmiyor.",
    tekrar:
      "Aynı üç bölüm temsil ediliyor ama tek bir kelime taşınmıyor. Rakam da sayfada başka hiçbir yerde manşet değil.",
    cost:
      "Rakamların rütbesi. Bugünkü bentonun kusuru rakamı manşet yapmasıydı ve bu aday rakamı daha da büyütüyor. Savunması şu: orada rakamın yanında bir etiket ve bir liste vardı, yani rakam bir istatistik iddiasıydı; burada etiket yok ve rakam bir biçim ögesi. Ama bu ayrım ince ve müşteri 'yine sayı vermişsin' diyebilir. İkinci bedel: oran fikri ancak üç karo yan yana durduğunda görünüyor, 860 pikselin altında karolar alt alta iniyor ve genişlikler eşitleniyor.",
  },
  {
    id: "Aday 6",
    name: "Mühür",
    kind: "Izgara yok · tek amblem",
    Section: AboutBentoMuhur,
    idea:
      "Izgarayı tamamen bırakıyor. Bento dört karo değil tek bir nesne: firmanın yaptığı işin amblemi. Dış halkada altı sektör işareti, iç halkada zincirin beş halkası, çekirdekte üç bayrak; iki halka birbirinin tersine, çok yavaş dönüyor. Ambleme soldan bir enerji geliyor, mühür yanıyor, sağdan çıkıyor. Tezi şu: bento anlatmayacaksa en dürüst cevap onu bilgi ızgarası olmaktan çıkarıp bir işarete çevirmek.",
    text:
      "Sıfır. Ekranda tek bir karakter yok, rakam da yok; üç sayı nesnelerin kendi sayısı olarak duruyor. Görünür metin olmadığı için sahne role=\"img\" ve aria-label ile duyuruluyor; etiketin kelimeleri about.ts'ten.",
    motion:
      "Dört mekanik, on sekiz sonsuz animasyon; üçünün en yükseği ve bu KURAL GEREĞİ. Müşterinin kuralı 'tek ya da 2 tane gözüküyorsa olabildiğince fazla' ve burada ekranda tek sahne var. Dış halka 41,9 saniyede tam tur, iç halka 29,3 saniyede tersine, doku halkası 23,9 saniyede, çekirdekten 7,9 saniyede bir nabız halkası çıkıyor, 13,7 saniyede bir de aktarım dalgası ekseni kat ediyor. Dönüşler saniyede 8,6 derece: bir saatin akrebinden hızlı, saniye kolundan çok yavaş.",
    akt: "Evet, ve kalıbın anlattığı cümle burada birebir görünüyor: enerji soldan geliyor (eksen), mühür yanıyor (rim), üç ülkeye ulaşıyor (bayraklar), sağdan çıkıyor. Yedi durak, tek tur.",
    tekrar:
      "Tekrar ihtimali sıfır çünkü ekranda okunacak hiçbir şey yok.",
    cost:
      "Bento olmayı. Eşit olmayan hücre, ton karşıtlığı ve 'her karonun kendi mekaniği' ölçütünün üçü de burada karşılanamıyor çünkü karo yok; müşterinin bir tur önce beğendiği ana sayfa ızgarası bu adayda hiç kullanılmıyor. İkinci bedel: bölüm gece ve sayfada hemen ardından gelen 'Üç ülkede çalışıyoruz' bölümü de gece, yani seçilirse ikisinden birinin zemini değişmeli. Üçüncüsü: dönen bir amblem kurumsal bir muhasebe sayfası için fazla dekoratif bulunabilir.",
  },
];

/* ------------------------------------------------------------ birinci turun üçü */
const EX = [
  {
    id: "ex · Aday 1",
    name: "Karo",
    kind: "Ana sayfanın ızgarası",
    Section: AboutBentoKaro,
    idea:
      "Ana sayfa bentosunun ızgarasını olduğu gibi alıyor: altı sütun, bir geniş (4), bir uzun (2×2), iki normal (2). Karoların içi değişiyor, geometri değişmiyor. Bölüm vizyon/misyondan ayrılıyor ve kendi başlığıyla açılıyor.",
    motion:
      "Üç mekanik, on sonsuz animasyon: ray ışığı (18,7 s), üç bayrak sırayla (22,1 s), altı sektör ikonu sırayla (35,9 s). Dördüncü karo bilerek hareketsiz.",
    cost:
      "BU TURUN İTİRAZI: dört karonun dördü de bir başlık ve bir açıklama satırı taşıyor, yani sayfanın 2, 4, 5 ve 6. bölümlerinin girişleri bir kez daha okunuyor. 1.625 karakter.",
  },
  {
    id: "ex · Aday 2",
    name: "Beyan",
    kind: "Gece · ton tersine",
    Section: AboutBentoBeyan,
    idea:
      "Bölümün başlığı yok, çünkü başlık ilk karonun içinde. Beyan karosu bölümün sorusunu soruyor, firmanın iki paragrafıyla cevaplıyor ve ayağında on iki kurumun gerçek logosunu taşıyor.",
    motion:
      "Üç mekanik, altı sonsuz animasyon; birinci turun en sakini. Logo şeridinin arkasından yavaş bir ışık (44,3 s), üç ülke diski (27,1 s), dikey zincir rayı (12,7 s).",
    cost:
      "BU TURUN İTİRAZI: firmanın iki paragrafını bentoya taşıyor, yani en çok anlatan aday. Üstelik on iki logo sayfanın 4. bölümünde ikinci kez basılıyor. 1.254 karakter.",
  },
  {
    id: "ex · Aday 3",
    name: "Yerinde",
    kind: "Yerinde kalıyor · sayaçlı",
    Section: AboutBentoYerinde,
    idea:
      "Bento yerinden oynamıyor: vizyon/misyon kartlarının altında, bugünkü yerinde, kendi başlığı olmadan. Üç eşit hücre yerine bir uzun koyu ve iki normal açık karo.",
    motion:
      "Dört mekanik, on üç sonsuz animasyon; birinci turun en yükseği. Ülke satırları (33,7 s), üç okuma ışığı (16,3 s), zincir şeridi (21,7 s), altı sektör kuyusu (24,7 s).",
    cost:
      "BU TURUN İTİRAZI: üçünün en hafifi ama hâlâ tabanın dört katı metin taşıyor; ülke satırlarında yapı künyesi ve cümle, sektör kuyularında etiket var. 1.187 karakter.",
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

const TABLE: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: "var(--font-sans)",
  fontSize: 13,
};

const CAPTION: React.CSSProperties = {
  textAlign: "left",
  paddingBottom: 10,
  fontSize: 12.5,
  lineHeight: 1.6,
  color: "var(--text-600)",
};

const TH: React.CSSProperties = {
  padding: "0 10px 8px",
  borderBottom: "1px solid var(--border)",
  fontSize: 11.5,
  fontWeight: 600,
  color: "var(--blue-900)",
};

const RULE: React.CSSProperties = {
  marginTop: 64,
  paddingTop: 8,
  borderTop: "1px solid var(--border)",
};

/* Bu turun blok künyesi. Birinci turunkinden farklı alanlar taşıyor çünkü
   karar başka bir soruya veriliyor: orada "ana sayfadan ne aldı", burada
   "ne kadar metin taşıyor". */
function Kunye({ c }: { c: (typeof CANDIDATES)[number] }) {
  return (
    <div style={BOX}>
      <b style={KICKER}>
        {c.id} · {c.name} · {c.kind}
      </b>
      <span style={LABEL}>Fikir</span>
      <p style={{ ...P, marginTop: 6 }}>{c.idea}</p>
      <span style={LABEL}>Ne kadar metin taşıyor</span>
      <p style={{ ...P, marginTop: 6 }}>{c.text}</p>
      <span style={LABEL}>Hareket ne yapıyor</span>
      <p style={{ ...P, marginTop: 6 }}>{c.motion}</p>
      <span style={LABEL}>aktarim.css kalıbını kullanıyor mu</span>
      <p style={{ ...P, marginTop: 6 }}>{c.akt}</p>
      <span style={LABEL}>Alt bölümlerle tekrarı nasıl kırıyor</span>
      <p style={{ ...P, marginTop: 6 }}>{c.tekrar}</p>
      <span style={LABEL}>Neyi feda ediyor</span>
      <p style={{ ...P, marginTop: 6 }}>{c.cost}</p>
    </div>
  );
}

function KunyeEx({ c }: { c: (typeof EX)[number] }) {
  return (
    <div style={BOX}>
      <b style={KICKER_BASE}>
        {c.id} · {c.name} · {c.kind}
      </b>
      <span style={LABEL}>Fikir</span>
      <p style={{ ...P, marginTop: 6 }}>{c.idea}</p>
      <span style={LABEL}>Hareket</span>
      <p style={{ ...P, marginTop: 6 }}>{c.motion}</p>
      <span style={LABEL}>Bu turda neden yeterli değil</span>
      <p style={{ ...P, marginTop: 6 }}>{c.cost}</p>
    </div>
  );
}

export default function LabHakkimizdaBentoPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Hakkımızda bentosu · 2. tur
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
          <code>/hakkimizda</code> · 1. bölümün sonundaki bentoya üç YENİ alternatif.
          Birinci turun üç adayı beğenildi ama yön değişti; onlar sayfanın altında{" "}
          <b style={STRONG}>ex</b> olarak duruyor. Canlı sayfaya,{" "}
          <code>hakkimizda.css</code>&apos;e, <code>aktarim.css</code>&apos;e ve{" "}
          <code>TrustLayer.tsx</code>&apos;e dokunulmadı; dördü de yalnızca okundu.
        </p>

        {/* ------------------------------------------------------- teşhis */}
        <div style={BOX}>
          <b style={KICKER}>Bu turun teşhisi: bento yanlış problemi çözüyordu</b>
          <p style={P}>
            Birinci turun üç adayı da <b style={STRONG}>bentoyu daha iyi anlatmaya</b>{" "}
            çalıştı. Müşterinin söylediği şu: bento anlatmamalı.
          </p>
          <p style={P}>
            Sebep yapısal. <code>/hakkimizda</code> sayfası aşağıda her ana başlığı{" "}
            <b style={STRONG}>zaten detaylı açıyor</b>: 2. bölüm üç ülkeyi (fotoğraf,
            yapı künyesi, ülke başına birer cümle), 4. bölüm dört dayanağı ve on iki
            kurumu, 5. bölüm zincirin beş halkasını, 6. bölüm altı sektörü. Bento aynı
            dört şeyi başlık ve cümleyle tekrar edince ziyaretçi{" "}
            <b style={STRONG}>aynı şeyi iki kez</b> okuyor ve ikincisi daha eksik
            olduğu için ilki değersizleşiyor.
          </p>
          <p style={P}>
            Bu turun kuralı tek: bentonun işi <b style={STRONG}>anlatmak değil açmak</b>.
            Sayfanın kapısı, özeti değil. Yani daha az kelime, daha çok biçim ve hareket,
            müşterinin cümlesiyle &quot;animasyonlu fln fistan bişiler olmalı&quot;.
          </p>
          <p style={P}>
            <b style={STRONG}>Ölçüt sayılabilir hâle getirildi:</b> her adayın ekranda
            gösterdiği görünür karakter sayısı. Birinci turun üç adayı 1.187 ile
            1.625 arasında, bugünkü blok 272; bu turun üçü <b style={STRONG}>0 ile 4</b>{" "}
            arasında. Aşağıdaki ilk tablo bu turun karnesi.
          </p>
        </div>

        {/* -------------------------------------------------- metin sayımı */}
        <div style={{ marginTop: 16, maxWidth: "78ch", overflowX: "auto" }}>
          <table style={TABLE}>
            <caption style={CAPTION}>
              <b style={STRONG}>Görünür metin.</b> Sayım tarayıcıda, 1280 piksel
              genişlikte, aynı köken iframe içinde yapıldı: DOM geziliyor, gizli
              ögeler (<code>display:none</code>, <code>visibility:hidden</code>) ile{" "}
              <code>&lt;style&gt;</code> ve <code>&lt;script&gt;</code> içeriği
              atlanıyor, kalan metin düğümlerinin boşlukları sadeleştirilmiş uzunluğu
              toplanıyor. <code>aria-hidden</code> alt ağaçları{" "}
              <b style={STRONG}>sayıma dahil</b>: ekran okuyucudan gizlenmiş bir rakam
              ekranda hâlâ duruyor. Bu kural yeni üç adayın aleyhine işliyor, lehine
              değil; onların <code>aria-hidden</code> bölgelerinde zaten hiç metin yok,
              bugünkü bentonun zincir numaraları (01 … 05) ise sayılıyor.{" "}
              <b style={STRONG}>Bölüm</b> = bileşenin ekrana bastığı her şey,{" "}
              <b style={STRONG}>bento</b> = yalnızca ızgara. İkisi ayrı çünkü bazı
              adaylar bölüm başlığı da getiriyor, taban ise bentonun üstündeki
              vizyon/misyon künye satırını taşıyor.
            </caption>
            <thead>
              <tr>
                {METIN_COLS.map((c, i) => (
                  <th
                    key={c || "k"}
                    scope="col"
                    style={{ ...TH, textAlign: i === 0 ? "left" : "right" }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {METIN.map((r) => (
                <tr key={r.k}>
                  <th scope="row" style={CELL_K}>
                    {r.k}
                  </th>
                  <td style={CELL}>{r.bolum}</td>
                  <td style={CELL}>{r.bento}</td>
                  <td style={CELL}>
                    {r.not ?? oran(r.bolum, METIN[0].bolum)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --------------------------------------------------------- ölçüm */}
        <div style={{ marginTop: 28, maxWidth: "78ch", overflowX: "auto" }}>
          <table style={TABLE}>
            <caption style={CAPTION}>
              <b style={STRONG}>Hareket ve taşma.</b> Animasyon sayısı gerçekten çalışan
              sonsuz animasyonlardan (<code>getAnimations</code>), kural taraması da ham{" "}
              <code>cssText</code> üzerinden yapıldı: bu depoda{" "}
              <code>document.styleSheets</code> geliştirme modunda kırpılmış sonuç
              veriyor. Yükseklikler sabit genişlikli aynı köken iframe içinde, bölüm
              dolgusu dahil. Dört genişlikte de yatay taşma sıfır ve ölçüm{" "}
              <code>scrollWidth</code> ile değil, gerçekten <code>scrollTo(9999, 0)</code>{" "}
              denenip <code>scrollX</code>&apos;e bakılarak yapıldı (
              <code>body &#123; overflow-x: clip &#125;</code> yüzünden scrollWidth temiz
              görünüyor). Element sayısı bölüm kabı dahil.{" "}
              <code>prefers-reduced-motion: reduce</code> altında sekiz bloğun da
              animasyon sayısı <b style={STRONG}>0</b>.
            </caption>
            <thead>
              <tr>
                {COLS.map((c, i) => (
                  <th
                    key={c || "k"}
                    scope="col"
                    style={{ ...TH, textAlign: i === 0 ? "left" : "right" }}
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

        {/* ------------------------------------------------ üçünün ortak sözü */}
        <div style={BOX}>
          <b style={KICKER}>Yeni üçünün de tuttuğu sözler</b>
          <p style={P}>
            <b style={STRONG}>İçerik:</b> üçünde de tek bir cümle yazılmadı. Ekrandaki
            rakamlar dizilerin uzunluğu (<code>WHERE.countries.length</code> …), ekran
            okuyucunun duyduğu etiketler <code>lib/about.ts</code>&apos;in kendi
            kelimeleri (<code>SUMMARY</code>, <code>BASIS.heading</code>). Yeni iddia,
            kuruluş yılı, kişi ya da müşteri sayısı yok.
          </p>
          <p style={P}>
            <b style={STRONG}>Erişim:</b> görünür metin sıfıra yaklaştığı için ad
            aria-label ile veriliyor. Aday 4 ve 5&apos;te her karo bir{" "}
            <code>&lt;article&gt;</code> ve kendi adını taşıyor; aday 6 tek sahne olduğu
            için <code>role=&quot;img&quot;</code>. İçerideki işaretler{" "}
            <code>aria-hidden</code>: taşıdıkları bilgi karonun adında zaten var, iki kez
            okunmalarının anlamı yok.
          </p>
          <p style={P}>
            <b style={STRONG}>Bayrak:</b> <code>Flag</code> width/height taşımayan çıplak
            bir <code>&lt;svg viewBox=&quot;0 0 60 40&quot;&gt;</code> döndürüyor ve kabı
            ölçülmezse 300 × 150&apos;ye açılıyor; hakkımızda sayfası bir kez tam bu
            yüzden çöktü. Üçünde de bayrağın kabı sabit pikselle sınırlı.
          </p>
          <p style={P}>
            <b style={STRONG}>Hareket:</b> üçü de sunucu bileşeni ve hareketin tamamı saf
            CSS; tarayıcıya bu bloklardan tek satır JavaScript inmiyor.{" "}
            <code>useReducedMotion</code> hiçbirinde yok. Animasyon tanımlarının tamamı{" "}
            <code>prefers-reduced-motion: no-preference</code> içinde, yani{" "}
            <b style={STRONG}>reduce açıkken üçünden de sıfır animasyon</b> sayılıyor;
            duraklatılmış bir animasyon bile kalmıyor ve duruş kareleri okunur.
          </p>
          <p style={P}>
            <b style={STRONG}>Periyot:</b> sekiz yeni periyot (10,3 · 11,3 · 14,9 · 19,9 ·
            7,9 · 13,7 · 23,9 · 29,3 · 41,9) ve hepsinin onda birliği ASAL. Ne
            birbirleriyle ne de sitedeki 48 periyotla makul bir sürede senkron oluyorlar;
            liste ve onu yeniden üretme komutu <code>aktarim.css</code>&apos;in başında.
          </p>
          <p style={P}>
            <b style={STRONG}>Hover:</b> üçünde de imleç gelince hareket DURUYOR ve
            nesnelerin hepsi birden yanıyor. Hover kuralları bilerek animasyonun
            dokunmadığı özelliklerde: duraklatılmış bir animasyon değerini yazmaya devam
            ettiği için aynı özelliğe yazılan bir geçiş hiç görünmezdi.
          </p>
          <p style={P}>
            <b style={STRONG}>Ad alanı:</b> canlı bento <code>.bn-</code>, canlı
            hakkımızda <code>.ab-</code>, birinci tur <code>.hb1- .hb2- .hb3-</code>.
            Bu turunkiler <code>.hb4-</code>, <code>.hb5-</code> ve <code>.hb6-</code>;
            hiçbiri canlı bir sınıfı ezmiyor. Renkli kenar şeridi hiçbirinde yok.
          </p>
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

      {/* ============================================================= ex */}
      <div className="container-o">
        <div style={RULE}>
          <h2 className="h2" style={{ color: "var(--text-900)" }}>
            ex · 1. turun üç adayı
          </h2>
          <p
            style={{
              marginTop: 12,
              maxWidth: "72ch",
              fontSize: 15,
              lineHeight: 1.65,
              color: "var(--text-600)",
            }}
          >
            Müşteri üçünü de beğendi (&quot;iyi olmuş hoş olmuş&quot;) ve hiçbiri
            silinmedi. Yalnızca yön değişti: üçü de bentoyu daha iyi ANLATMAYA
            çalışıyordu ve sayfanın devamı zaten aynı başlıkları detaylı açıyor. Burada
            kalmalarının bir sebebi daha var: yukarıdaki metin tablosunun kıyas ucunu
            onlar tutuyor.
          </p>
        </div>

        <div style={BOX}>
          <b style={KICKER_BASE}>Ana sayfa bentosu neden güçlü (1. turun teşhisi)</b>
          <p style={P}>
            Ana sayfadaki bento (<code>TrustLayer.tsx</code> · <code>.bn-</code>) dört
            karo ve gücü <b style={STRONG}>dört ayrı kararı birden vermesinden</b>{" "}
            geliyor: hücreler eşit değil, iki karo siyah, her karonun kendi mekaniği var
            ve karo bir sayı saymıyor, bir cümle söyleyip onu gösteriyor. Bu teşhis hâlâ
            geçerli ve bu turun üç adayı da ilk üç maddeyi tutuyor. Değişen dördüncüsü:
            burada karo bir cümle de söylemiyor.
          </p>
        </div>
      </div>

      {EX.map((c) => (
        <div key={c.id}>
          <div className="container-o">
            <KunyeEx c={c} />
          </div>
          <c.Section />
        </div>
      ))}

      <div className="container-o" style={{ paddingBottom: 72 }}>
        <div style={BOX}>
          <b style={KICKER}>Karar verirken bakılacak üç şey</b>
          <p style={P}>
            <b style={STRONG}>1 · Izgara kalsın mı?</b> Aday 4 ana sayfanın ızgarasını
            koruyor, aday 5 oranı veriden üreten başka bir ızgara kuruyor, aday 6
            ızgarayı tamamen bırakıyor. Bırakmanın bedeli bentonun bento olmaktan
            çıkması; korumanın bedeli ana sayfayla benzeşmek.
          </p>
          <p style={P}>
            <b style={STRONG}>2 · Rakam kalsın mı?</b> Aday 4&apos;te dört küçük rakam
            köşede, aday 5&apos;te üç dev rakam yüzeyin kendisi, aday 6&apos;da hiç yok.
            Üçünde de etiket yok: etiket olduğu anda karo bir şey saymaya geri dönüyor.
          </p>
          <p style={P}>
            <b style={STRONG}>3 · Zemin ne olsun?</b> Aday 6 gece ve sayfada hemen
            ardından gelen bölüm de gece, yani seçilirse ikisinden birinin rengi
            değişmeli. Aday 4 ve 5 beyaz kalıyor ve sayfanın ritmine dokunmuyor.
          </p>
        </div>
      </div>
    </main>
  );
}
