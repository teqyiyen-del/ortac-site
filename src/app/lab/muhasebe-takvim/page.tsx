import CalMT1 from "@/components/lab/CalMT1";
import CalMT2 from "@/components/lab/CalMT2";
import CalMT3 from "@/components/lab/CalMT3";
import CalMT4 from "@/components/lab/CalMT4";
import CalMT5 from "@/components/lab/CalMT5";
import CalMT6 from "@/components/lab/CalMT6";
import CalMT7 from "@/components/lab/CalMT7";
import CalMT8 from "@/components/lab/CalMT8";
import CalMT9 from "@/components/lab/CalMT9";

/* ============================================================================
   LAB · /dubai/muhasebe · "Muhasebe ne zaman başlıyor, hangi ay ne oluyor?"

   ÜÇÜNCÜ TUR. Müşterinin üç cümlesi, sırayla:

     1) "şuan aşırı karman çorman geliyor gözüme… çok teknik ve karmaşık
         geliyor göze"                                   → MT1 · MT2 · MT3
     2) "hiçbiri hoşuma gitmedi başka deneyelim lütfen"  → MT4 · MT5 · MT6
     3) "sadeleştir derken yok etmişsin kral biraz efektif düşün lütfen"

   ÜÇÜNCÜ CÜMLE TEŞHİSİN KENDİSİ. İkinci tur metni %36-69 kısarak sadeleştirdi
   ve müşteri sonucu YOK ETME olarak okudu — MT4 bölümü tek cümleye indirmişti.
   Yani iki tur aynı hatanın iki ucu: biri fazla nesne, diğeri fazla az içerik.

   BU TURUN KURALI: gürültü düşecek, içerik ayakta kalacak. Sadeleştirme =
   katmanlama, silme değil. Ve bölüm bir şey GÖSTERECEK — sitenin mottosu
   "anlatmıcaz göstericez"; ziyaretçi buradan "beni ay ay ne bekliyor"
   hissiyle çıkmalı, bir paragraf okumuş gibi değil.

   ÜÇ YENİ ADAYIN ORTAK NOKTASI: üçü de bir görsel çiziyor ve üçü de aynı dört
   gürültü kaynağını çözüyor. Farkları görselin NE olduğu — MT7 bir ray,
   MT8 üç kart, MT9 bir duvar takvimi.

   VERİ DEĞİŞMEDİ. Aylar, beyan dönemleri, oranlar ve süreler
   accountingDubai.ts'ten (o da afterSetup.ts / countryContent.ts'ten)
   okunuyor. Dokuz adayda da yeni tarih, oran, ceza veya süre yok.
   ========================================================================= */

const CANDIDATES = [
  {
    id: "MT7",
    kind: "Yalnız işaretler",
    Section: CalMT7,
    idea:
      "Şerit duruyor, matris gidiyor. On iki aylık tek bir ray var ve üzerinde yalnızca iş OLAN yer işaretli; her ay tekrar eden kalem on iki kutu değil, on iki ayı boydan boya geçen tek çubuk. 36 kutu + 12 sayı + 2 lejant kutusu → 1 çubuk + 5 nokta + 4 sayı.",
    fixes:
      "Boş kutuyu bir nesne olmaktan çıkarıyor: \"yok\"un görsel karşılığı hiçbir şey çizmemek. Ay ekseni de adını yanında taşıyor — ölçekte on iki adsız sayı yerine dört sayı var ve solunda \"lisanstan sonra kaçıncı ay\" yazıyor.",
    keeps:
      "Kalem adı ve sıklığı yüzeyde; KDV'nin herkeste doğmadığı yüzeyde kelimeyle. Gerekçe cümleleri ve tam ay listeleri tek kapının, kuruluş kayıtları ikinci kapının, oran tablosu kendi sorusunun altında.",
    cost:
      "\"Kaç kalem\" sayısı. 12. ayda üç işaretin üst üste geldiği dikey hizadan okunuyor ama bir sayıyla söylenmiyor.",
  },
  {
    id: "MT8",
    kind: "Ayın üç ağırlığı",
    Section: CalMT8,
    idea:
      "On iki sütunda on iki farklı ay yok — üç desen var: sekiz ayda tek kalem, üç ayda iki, bir ayda üç. Matris bunu ancak ziyaretçi üç satırı gözüyle hizalarsa söylüyor. Burada hizalamayı veri yapıyor: aylar ağırlığa göre üç karta bölünüyor, kart uzadıkça o ayda iş artıyor.",
    fixes:
      "Boş kutu kavramını tamamen kaldırıyor: üç grup on iki ayı TAM bölüyor, her ay bir ve yalnız bir kartta geçiyor. \"Bu ayda bu kalem yok\" diyen bir nesne kalmıyor. Ay ekseni de bir konum değil bir etiket, ve adı her kartta yazılı.",
    keeps:
      "On iki ayın hepsi, hangi ayda hangi kalem, sıklıklar ve koşulluluk yüzeyde. Gerekçeler, kuruluş kayıtları ve oran tablosu üç ayrı kapıda.",
    cost:
      "Yılın sırası. Aylar ağırlığa göre dizildiği için 1. ay ile 12. ay yan yana düşmüyor; \"önce şu sonra bu\" hissi yok.",
  },
  {
    id: "MT9",
    kind: "Duvar takvimi",
    Section: CalMT9,
    idea:
      "Tekrar eden şey çizilmez, söylenir: aylık muhasebenin on iki kutusu ızgaranın üstünde tek cümleye iniyor. Izgarada yalnızca o aya ÖZEL olan iş yazılı — sekiz hücre sessiz, dört hücre dolu. Üç şerit üst üste değil iç içe.",
    fixes:
      "36 kutuyu 12 hücreye indiriyor ve boş kutuyu ortadan kaldırıyor: sessiz hücre \"burada bir şey yok\" demiyor, üstteki cümle onun da ne olduğunu söylüyor. Lejant gerekmiyor çünkü hücrenin içinde kalemin ADI yazılı; sayı da birimiyle duruyor (\"3. ay\", \"3\" değil).",
    keeps:
      "Her ay tekrar eden iş, on iki ayın hepsi, hangi ayda hangi kalem, sıklık ve koşulluluk — hepsi yüzeyde. Gerekçeler, kuruluş kayıtları ve oran tablosu kapıların arkasında.",
    cost:
      "Yer. Üçünün en uzunu; telefonda on iki hücre iki sütuna dizilince altı satır ediyor. Bugünkü şeritten kısa ama MT7 ve MT8'den uzun.",
  },
];

/* Emekliler. Silinmiyorlar: bu depoda eski adaylar çöpe gitmez, "ex" başlığı
   altına iner. Müşteri üç turu yan yana görebilsin ve bir fikir geri
   istenirse yeniden yazılmasın. */
const RETIRED = [
  {
    id: "MT4",
    round: "ikinci tur",
    kind: "Tek cümle",
    Section: CalMT4,
    idea: "Bölüm bir cevaba iniyor; üç ritim tek cümlenin içinde, ayrıntının tamamı tek kapıda.",
    cost:
      "Müşterinin \"yok etmişsin\" dediği yer büyük ihtimalle burası: zamanın görsel karşılığı sıfır.",
  },
  {
    id: "MT5",
    round: "ikinci tur",
    kind: "Tetikleyici sırası",
    Section: CalMT5,
    idea:
      "Eksen ay değil olay: lisans çıkınca · ay kapanınca · çeyrek bitince · mali yıl kapanınca.",
    cost: "Yoğunluk. 12. ayda üç kalemin üst üste bindiği yüzeyde hiç görünmüyor.",
  },
  {
    id: "MT6",
    round: "ikinci tur",
    kind: "Bende doğar mı",
    Section: CalMT6,
    idea:
      "Eksen geçerlilik: altı kalem ikiye ayrılıyor — şirket aktifse doğan, yalnızca şartı oluşursa doğan.",
    cost: "Yılın sırası ve ay bilgisi yüzeyde hiç yok; bölüm ay göstermeyi bırakıyor.",
  },
  {
    id: "MT1",
    round: "birinci tur",
    kind: "Yılın şekli",
    Section: CalMT1,
    idea: "Üç şerit tek eksene iniyor: her ay bir sütun, yüksekliği o ay kaç kalem çıktığı.",
    cost: "Hangi kalemin hangi ay olduğu sütundan okunamıyor.",
  },
  {
    id: "MT2",
    round: "birinci tur",
    kind: "Şu an neredeyim",
    Section: CalMT2,
    idea: "Takvim çizilmiyor. Tek soru — şirketiniz kaçıncı ayında — ve tek panel cevap veriyor.",
    cost: "Yılın bütünü görünmüyor; on iki durağı görmek on iki tıklama.",
  },
  {
    id: "MT3",
    round: "birinci tur",
    kind: "Üç satırlık liste",
    Section: CalMT3,
    idea: "Görsel yok. Beş satır, tek okuma biçimi: solda sıklık, sağda kalem.",
    cost: "Zaman hissi tamamen kayboluyor; yıl bir şekil değil bir liste.",
  },
];

/* ÖLÇÜM TABLOSU.

   Bu turda iki sütun fazla — ve sebebi tam olarak müşterinin cümlesi. İlk iki
   turda tablo yalnızca KÜÇÜLMEYİ ölçüyordu: metin, element, yükseklik. MT4 o
   tabloda en iyi satırdı (414 karakter) ve müşteri onu "yok etmişsin" diye
   reddetti. Yani tablo yanlış şeyi ölçüyordu.

   "okuma" ve "nesne" o boşluğu kapatıyor: gürültü bu iki sayıda, içerik ise
   "metin" sütununda. İyi aday ikisini birden tutan aday — okuma ve nesne
   düşerken metin çökmeyen satır.

     · metin   → kapalı hâlde görünür karakter sayısı (içeriğin yüzeydeki payı)
     · element → kapalı hâlde DOM element sayısı
     · okuma   → yüzeyde kaç ayrı OKUMA BİÇİMİ var; yani ziyaretçinin kaç ayrı
                 görsel dil öğrenmesi gerekiyor. Aynı biçimdeki açılır kapılar
                 tek biçim sayılıyor.
     · nesne   → ANA GÖRSELİN kaç ayrı görsel birimi var: kutu · hücre · işaret ·
                 kart · ay numarası · kaleme ait etiket (ad, sıklık, şerh) ·
                 lejant kutusu. Görselin dışındaki cümleler (başlık, okuma
                 anahtarı, alt şerh) sayılmıyor — onlar "metin" sütununda.
     · px      → bölümün başlıkla birlikte toplam yüksekliği

   Sayılar elle yazılı çünkü ölçüm çalışma anında değil, tarayıcıda tek
   seferlik alındı: her bölüm KAPALI hâlde, sabit genişlikli aynı köken
   iframe'inde (tarayıcı paneli dar viewport'u güvenilir ölçmüyor). "nesne"
   sütunu da tahmin değil, aynı DOM'da sınıf sınıf sayıldı. Bölüm değişirse bu
   satırlar da yeniden ölçülmeli — tablo bir iddia değil, bir kayıt. */
const COLS = ["", "metin", "element", "okuma", "nesne", "320px", "375px", "768px", "1440px"];

const MEASURED: { k: string; v: (string | number)[]; ex?: boolean }[] = [
  { k: "Bugünkü bölüm", v: ["1.315", 179, 4, 59, "1.975", "1.800", "1.422", "1.215"] },
  { k: "MT7", v: [583, 106, 2, 18, "1.164", "1.050", 886, "1.016"] },
  { k: "MT8", v: [820, 128, 2, 32, "1.597", "1.434", 965, "1.076"] },
  { k: "MT9", v: [762, 126, 2, 29, "1.559", "1.290", "1.054", "1.101"] },
  { k: "ex MT4", v: [414, 77, 2, 5, 693, 613, 561, 678], ex: true },
  { k: "ex MT5", v: [847, 101, 2, 17, "1.369", "1.236", 823, 903], ex: true },
  { k: "ex MT6", v: [741, 105, 2, 14, "1.212", "1.148", 772, 886], ex: true },
  { k: "ex MT1", v: [606, 128, 3, 35, "1.181", "1.089", 849, 980], ex: true },
  { k: "ex MT2", v: [635, 127, 3, 21, "1.235", "1.099", 905, "1.036"], ex: true },
  { k: "ex MT3", v: [428, 85, 1, 10, 878, 804, 637, 768], ex: true },
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

const KICKER_EX: React.CSSProperties = {
  ...KICKER,
  background: "var(--paper)",
  color: "#8a8a8a",
};

const STRONG: React.CSSProperties = { fontWeight: 600, color: "var(--text-900)" };

const P: React.CSSProperties = {
  marginTop: 12,
  fontSize: 14.5,
  lineHeight: 1.65,
  color: "var(--text-600)",
};

const NOTE: React.CSSProperties = {
  margin: "8px 0 0",
  maxWidth: "70ch",
  fontSize: 13.5,
  lineHeight: 1.6,
  color: "var(--text-600)",
};

export default function LabMuhasebeTakvimPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Muhasebe takvimi
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "68ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          <code>/dubai/muhasebe</code> · &quot;Muhasebe ne zaman başlıyor, hangi ay ne
          oluyor?&quot; bölümüne <b style={STRONG}>üçüncü tur</b> üç alternatif. Canlı
          sayfaya dokunulmadı; hiçbiri bağlı değil. Aylar, dönemler ve oranlar dokuzunda
          da aynı kaynaktan okunuyor — değişen tek şey sunum.
        </p>

        <div
          style={{
            marginTop: 20,
            padding: "20px 22px",
            borderRadius: "var(--r-lg)",
            background: "var(--paper)",
            border: "1px solid var(--border)",
            maxWidth: "74ch",
          }}
        >
          <b style={KICKER}>Teşhis</b>
          <p style={P}>
            Bölüm tek bir soru soruyor ama ekranda{" "}
            <b style={STRONG}>dört ayrı okuma biçimi</b> aynı anda çalışıyor: üç numaralı
            akordiyon, 4×13&apos;lük bir kutu matrisi, matrisi çözmek için bir lejant, ve
            beş satırlık bir oran tablosu. Kapalı hâlde 179 element, 1.315 karakter
            görünür metin; masaüstünde 1.215 piksel, 375&apos;te 1.800 piksel.
          </p>
          <p style={P}>
            Asıl yük matriste:{" "}
            <b style={STRONG}>
              36 kutu, 12 ay numarası, 3 etiket, 3 sıklık altbaşlığı ve 2 lejant kutusu —
              59 nesne, ve söyledikleri şey üç olgu
            </b>{" "}
            (her ay · 3 ayda bir · yılda bir). Kutuların 18&apos;i boş, yani ekranın
            yarısı &quot;burada bir şey yok&quot; demek için duruyor. Üstüne ay numaraları
            bir tuzak: 1–12 takvim ayı değil, kuruluştan itibaren sayılan aylar — bunu
            ancak matrisin altındaki şerhi okuyan anlıyor.
          </p>
          <p style={P}>
            İkinci yük eksen karışması:{" "}
            <b style={STRONG}>
              oran tablosu &quot;ne zaman&quot; sorusunun altında duruyor ama &quot;neye
              göre&quot; sorusuna cevap veriyor
            </b>{" "}
            (%0/%9, 375.000 AED). Bölümün en teknik görünen parçası bu ve konusu bile
            başka.
          </p>
        </div>

        <div
          style={{
            marginTop: 16,
            padding: "20px 22px",
            borderRadius: "var(--r-lg)",
            background: "var(--paper)",
            border: "1px solid var(--border)",
            maxWidth: "74ch",
          }}
        >
          <b style={KICKER}>Üçüncü tur neyi değiştiriyor</b>
          <p style={P}>
            İlk iki tur aynı hatanın iki ucu. Canlı bölüm{" "}
            <b style={STRONG}>fazla nesne</b> (59 nesne, 3 olgu); ikinci tur{" "}
            <b style={STRONG}>fazla az içerik</b> — metni %36-69 kısarak
            &quot;sadeleştirdi&quot; ve müşteri sonucu yok etme olarak okudu. Ölçüm
            tablosu bunu neden yakalayamadı: yalnızca küçülmeyi ölçüyordu, MT4 orada en
            iyi satırdı ve reddedilen aday oydu.
          </p>
          <p style={P}>
            Bu turdaki üçünün ortak kuralı şu:{" "}
            <b style={STRONG}>gürültü düşecek, içerik ayakta kalacak.</b> Üçü de bir
            görsel çiziyor — bölüm bir şey göstermeli, paragrafa inmemeli. Üçü de dört
            gürültü kaynağının dördünü birden çözüyor. Ve üçünde de silinen tek bir iddia,
            tek bir tutar, tek bir süre yok: her cümle ya yüzeyde ya tek tıklamanın
            arkasında.
          </p>
          <p style={P}>
            Ortak iki hamle: (1) <b style={STRONG}>ay ekseni adını yanında taşıyor</b> —
            &quot;3&quot; değil &quot;lisanstan sonra 3. ay&quot;; (2){" "}
            <b style={STRONG}>oran tablosu kendi sorusunun altına indi</b> — bölümde
            kalıyor, beş satır ve şerhleri eksiksiz, ama artık &quot;ne zaman&quot;ın
            altında değil.
          </p>
        </div>

        {/* ÖLÇÜM — "daha sade" bir iddia değil, sayı. Bu turda iki sütun fazla,
            çünkü küçülmeyi ölçmek yetmiyor: gürültü "okuma" ve "nesne"de,
            içerik "metin"de. İyi aday üçünü birden dengeleyen. */}
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
                lineHeight: 1.55,
                color: "#8a8a8a",
              }}
            >
              Kapalı hâlde görünür metin, element sayısı, yüzeydeki okuma biçimi ve görsel
              nesne sayısı, ve bölüm yüksekliği. Gürültü &quot;okuma&quot; ile
              &quot;nesne&quot; sütunlarında; içerik &quot;metin&quot; sütununda.
            </caption>
            <thead>
              <tr>
                {COLS.map((h, i) => (
                  <th
                    key={h || i}
                    scope="col"
                    style={{
                      padding: "8px 10px 8px 0",
                      textAlign: i === 0 ? "left" : "right",
                      borderBottom: "1px solid var(--text-900)",
                      fontWeight: 600,
                      color: "var(--text-600)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEASURED.map((m) => (
                <tr key={m.k}>
                  <th
                    scope="row"
                    style={{
                      padding: "9px 10px 9px 0",
                      textAlign: "left",
                      borderBottom: "1px solid var(--border)",
                      fontWeight: m.k === "Bugünkü bölüm" ? 700 : 600,
                      color: m.ex ? "#8a8a8a" : "var(--text-900)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {m.k}
                  </th>
                  {m.v.map((cell, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "9px 10px 9px 0",
                        textAlign: "right",
                        borderBottom: "1px solid var(--border)",
                        color: m.ex ? "#8a8a8a" : "var(--text-600)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {CANDIDATES.map(({ id, kind, Section, idea, fixes, keeps, cost }) => (
        <div key={id}>
          <div
            className="container-o"
            style={{ paddingTop: 56, marginTop: 40, borderTop: "1px solid var(--border)" }}
          >
            <span style={KICKER}>
              {id} · {kind}
            </span>
            <p
              style={{
                margin: "14px 0 0",
                maxWidth: "70ch",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              {idea}
            </p>
            <p style={NOTE}>
              <b style={STRONG}>Gürültüyü nasıl düşürüyor:</b> {fixes}
            </p>
            <p style={NOTE}>
              <b style={STRONG}>İçeriği nasıl tutuyor:</b> {keeps}
            </p>
            <p style={{ ...NOTE, color: "#8a8a8a" }}>
              <b style={{ fontWeight: 600 }}>Feda ettiği:</b> {cost}
            </p>
          </div>
          <Section />
        </div>
      ))}

      {/* ------------------------------------------------------------ EX

          Birinci ve ikinci turun altı adayı. Müşteri altısını da beğenmedi ama
          silinmiyorlar: bu depoda eski adaylar emekliye ayrılır, çöpe gitmez. */}
      <div
        className="container-o"
        style={{ paddingTop: 64, marginTop: 48, borderTop: "2px solid var(--text-900)" }}
      >
        <span style={KICKER_EX}>ex · birinci ve ikinci tur</span>
        <p
          style={{
            margin: "14px 0 0",
            maxWidth: "70ch",
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "#8a8a8a",
          }}
        >
          Müşterinin beğenmediği altı aday. Karşılaştırma için duruyorlar; bir fikir geri
          istenirse yeniden yazılmasın diye silinmediler.
        </p>
      </div>

      {RETIRED.map(({ id, round, kind, Section, idea, cost }) => (
        <div key={id}>
          <div className="container-o" style={{ paddingTop: 44, marginTop: 32 }}>
            <span style={KICKER_EX}>
              ex {id} · {round} · {kind}
            </span>
            <p
              style={{
                margin: "12px 0 0",
                maxWidth: "70ch",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "#8a8a8a",
              }}
            >
              {idea} <b style={{ fontWeight: 600 }}>Feda ettiği:</b> {cost}
            </p>
          </div>
          <Section />
        </div>
      ))}
    </main>
  );
}
