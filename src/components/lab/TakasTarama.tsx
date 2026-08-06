import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";

/* ============================================================================
   ADAY 3 · "TARAMA" — /lab/muhasebe-takas
   CSS: src/app/css/lab-tks3.css · ad alanı .trm-

   FİKİR: hareketi nesneden alıp IŞIĞA vermek. Üç turdur ekranda bir şey
   TAŞINIYORDU (belge kalkıyor, kanalda yol alıyor, klasöre giriyor) ve
   müşterinin "tutmuyor" dediği şey büyük ihtimalle buydu: bir muhasebe
   bölümünde uçan kağıt, bilgiyi değil kendini gösteriyor.

   Burada hiçbir şey taşınmıyor. Dokuz kalem yerinde duruyor; üzerlerinden
   soldan sağa yavaş bir ışık geçiyor ve geçerken her kalemin işareti bir an
   yanıp sönüyor. Ekranda sürekli bir hareket var ama hareket eden şey liste
   değil, listeye BAKAN şey.

   ---------------------------------------------------------------------------
   ASİMETRİYE CEVAP: 1:2 ÖLÇÜSÜ
   ---------------------------------------------------------------------------

   Aday 1 satır sayısını eşitliyor, aday 2 farkı konu yapıyor. Bu aday üçüncü
   bir yol tutuyor: soldaki bir satır, sağdaki İKİ satırla tam olarak aynı
   yüksekliğe oturuyor. Üç ile altı arasındaki fark bir dengesizlik değil bir
   ÖLÇÜ oluyor.

   Bu göz kararı değil: iki liste de ızgaranın aynı satırında, sol
   `repeat(3, 1fr)`, sağ `repeat(6, 1fr)`. Yani sol satır yüksekliği sağın tam
   iki katı, her genişlikte. Bandın görünür olması için sağdaki 1., 3. ve 5.
   satırların üstündeki saç teli koyu, aradakiler açık: koyu teller soldaki
   satır sınırlarıyla aynı y'de bitiyor.

   BİR EŞLEŞME İDDİASI YOK. Işık satırları değil SÜTUNLARI sırayla geçiyor
   (önce soldakiler, sonra sağdakiler); bir soldaki kalemle iki sağdaki kalem
   arasında zamanlama bağı kurulmuyor. "Fatura → dijital defter" gibi bir cümle
   bu adayda da kurulmuyor.

   ---------------------------------------------------------------------------
   ÖLÇEK TUZAĞINA CEVAP
   ---------------------------------------------------------------------------

   Bu adayda SVG olarak yalnızca 12 × 12 birimlik ok başı var, içinde metin
   yok. Işık huzmesi bir SVG değil, CSS gradyanı. Dokuz kalemin dokuzu da HTML
   metni, puntosu 14 px sabit; 320'de de 1440'ta da aynı.

   ---------------------------------------------------------------------------
   ERİŞİLEBİLİRLİĞE CEVAP
   ---------------------------------------------------------------------------

   Dokuz kalem iki <ul> içinde düz <li> metni, sütun başlıklarına
   aria-labelledby ile bağlı. İşaretler, huzme, çizgi ve ok aria-hidden.
   Görsel olarak gizlenmiş metin yok. Sunucu bileşeni: JS inmiyor.

   Huzme metnin ARKASINDAN geçiyor (z-index), yani hiçbir an bir adın üstünü
   örtmüyor. Metnin opaklığına da dokunulmuyor.

   ---------------------------------------------------------------------------
   HAREKET — 43 SANİYE, 11 ANİMASYON
   ---------------------------------------------------------------------------

   Üç adayın en hareketlisi ve amplitüdü de en yüksek olanı:

     1. Huzme soldan sağa geçiyor, ~26 px/s. Turun neredeyse tamamı bu geçiş;
        tek bir tur, tek bir yön.
     2. Dokuz işaret huzme üzerlerinden geçerken bir saniyeliğine maviye
        dönüp %30 uzuyor. Gecikmeler huzmenin o sütuna vardığı ana göre
        hesaplandı (soldakiler ~4.2 s, sağdakiler ~21 s).
     3. Aradaki çizginin kesikleri oka doğru süzülüyor.

   Kalıcı bir durum değişikliği YOK: tur bittiğinde ekran tur başındaki
   hâlinde. Sebebi dürüstlük — bir işaretin dolu kalması "bu kalem çıktı"
   demek olurdu ve bölümün böyle bir iddiası yok.

   Periyot 43 s: asal, sitedeki sürekli periyotlarla ortak böleni yok, diğer
   iki adayla (67 ve 47) da ortak katı yok.

   `reduce` altında SIFIR animasyon. Duruş karesinde huzme görünmüyor
   (varsayılan opaklığı 0), dokuz işaret boş, dokuz ad tam kontrastta.
   ========================================================================= */

export default function TakasTarama() {
  const you = C.exchange.you;
  const outputs = C.exchange.outputs;

  return (
    <div className="trm-wrap">
      <div className="trm-stage">
        {/* Huzme ızgaranın ilk çocuğu ve metnin ARKASINDA (z-index 0). Metin
            katmanı 1: hiçbir an bir adın üstüne binmiyor. */}
        <span className="trm-sweep" aria-hidden="true" />

        <span className="trm-k trm-kin" id="trmKin">
          {C.exchange.youTitle}
        </span>
        <ul className="trm-in" aria-labelledby="trmKin">
          {you.map((y, i) => (
            <li key={y.label} className="trm-row" style={{ "--i": i } as React.CSSProperties}>
              <span className="trm-tick" aria-hidden="true" />
              <span className="trm-name">{y.label}</span>
            </li>
          ))}
        </ul>

        <div className="trm-gate" aria-hidden="true">
          <span className="trm-rail" />
          <span className="trm-arrow">
            <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
              <path d="M1 0 L12 6 L1 12 Z" />
            </svg>
          </span>
        </div>

        <span className="trm-k trm-kout" id="trmKout">
          {C.exchange.usTitle}
        </span>
        <ul className="trm-out" aria-labelledby="trmKout">
          {outputs.map((o, i) => (
            <li key={o.label} className="trm-row" style={{ "--i": i } as React.CSSProperties}>
              <span className="trm-tick" aria-hidden="true" />
              <span className="trm-name">{o.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
