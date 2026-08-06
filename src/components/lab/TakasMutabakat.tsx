import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";

/* ============================================================================
   ADAY 1 · "MUTABAKAT" — /lab/muhasebe-takas
   CSS: src/app/css/lab-tks1.css · ad alanı .mtb-

   FİKİR: sahne kurmayı bırakmak. Müşterinin cümlesindeki asıl bilgi şuydu:
   "önceki halimiz bile daha iyiydi ama çok statik diye burda dinamizm katarak
   bir şey yapmaya çalışıyoruz ama pek tutmuyor." Üç turdur bölüme eklenen şey
   hep bir NESNE oldu (çizilmiş belge, kanal, uçan kopya, klasör). Bu aday
   nesneyi tamamen çıkarıyor: geriye bir mutabakat sayfası kalıyor. İki liste,
   aralarında tek bir çizgi, ve sayfanın kendi ölçüsü.

   Yani "dinamizm" burada bir gösteri değil bir OKUMA KOLAYLIĞI: ziyaretçi ne
   verdiğini ve ne aldığını iki bakışta görüyor, üçüncü bakışta hiçbir şey
   onu rahatsız etmiyor.

   ---------------------------------------------------------------------------
   ASİMETRİYE CEVAP: SATIR SAYISINI EŞİTLE
   ---------------------------------------------------------------------------

   Solda 3 kalem, sağda 6. Bu adayın cevabı sayıyı değil DÜZENİ değiştirmek:
   sağdaki altı kalem iki sütuna, üç satıra diziliyor. Böylece iki kıyı da tam
   ÜÇ SATIR yüksekliğinde oluyor ve satır çizgileri boşluğun iki yanında
   birebir aynı hizaya düşüyor.

   Bu, sayfada ölçülebilir bir yapı: her iki liste de ızgaranın aynı satırında
   duruyor ve satırları `1fr`, yani üç satırın üçü de iki tarafta aynı
   yükseklikte. 3 ile 6 arasındaki fark ekranda bir dengesizlik değil, bir
   sütun katsayısı (6 = 3 × 2).

   Bir eşleşme İDDİASI YOK: sağdaki iki hücre soldaki satırın karşılığı değil,
   yalnızca aynı satır bandında duruyorlar. Hareket de bu bandı hiç
   kullanmıyor (aşağıya bakın), yani "fatura → dijital defter" gibi bir cümle
   kurulmuyor.

   ---------------------------------------------------------------------------
   ÖLÇEK TUZAĞINA CEVAP: SVG'DE TEK BİR HARF YOK
   ---------------------------------------------------------------------------

   Bu adayda SVG olarak yalnızca 12 × 12 birimlik ok başı var; onun da içinde
   metin yok. Dokuz kalemin dokuzu da gerçek HTML metni ve puntosu CSS
   pikseli (14 px), yani 320'de de 1440'ta da aynı. Ölçekle oynayan hiçbir
   metin öğesi bulunmuyor, dolayısıyla ölçek tuzağı bu adayda DOĞMUYOR.

   ---------------------------------------------------------------------------
   ERİŞİLEBİLİRLİĞE CEVAP
   ---------------------------------------------------------------------------

   Dokuz kalem iki <ul> içinde, her biri düz <li> metni. Sütun başlıkları
   <span> ve listeler onlara aria-labelledby ile bağlı. Görsel olarak gizlenen
   tek bir metin yok (bu depoda gizli <span> bir kez erişilebilirlik ağacında
   hiç görünmemişti). Sıra numaraları aria-hidden: onlar bir bilgi değil, bir
   sayfa düzeni işareti.

   Sunucu bileşeni: tarayıcıya bu bloktan tek satır JS inmiyor,
   useReducedMotion'a dokunulmuyor.

   ---------------------------------------------------------------------------
   HAREKET — 67 SANİYE, 7 ANİMASYON, SIFIR TRANSFORM
   ---------------------------------------------------------------------------

   Üç adayın en sakini ve bilerek öyle. Ekranda hareket eden iki şey var:

     1. Aradaki çizginin kesikleri oka doğru süzülüyor. Hızı 1.6 px/s, yani
        bakılmadığı sürece fark edilmiyor; bakıldığında sayfanın hangi yöne
        aktığını söylüyor.
     2. Sağdaki altı satırın sıra numarası sırayla koyulaşıyor, her biri 11
        saniye. Defterin baştan sona işlendiğini söyleyen tek işaret bu.

   Toplam 7 animasyon ve HİÇBİRİ konum değiştirmiyor: biri arka plan konumu,
   altısı renk. Kalem adlarının opaklığına, boyutuna ve yerine dokunulmuyor.

   Periyot 67 s: asal, ve sitedeki sürekli periyotların
   (68·60·42·37·34·31·29·26·23·20·19·17·15·13·11·9.7·8.9·7.3·6.1·5.3) hiçbiriyle
   ortak böleni yok. Diğer iki adayla da ortak katı yok (47 ve 43 de asal).

   `reduce` altında SIFIR animasyon: animation- ile başlayan hiçbir bildirim
   no-preference sorgusunun dışına yazılmadı. Duruş karesi eksiksiz.
   ========================================================================= */

export default function TakasMutabakat() {
  const you = C.exchange.you;
  const outputs = C.exchange.outputs;

  return (
    <div className="mtb-wrap">
      {/* Izgara geniş ekranda 3 sütun × 2 satır: başlıklar üstte, listeler
          altta. Başlıkları ayrı satıra almanın sebebi ölçü — iki liste aynı
          ızgara satırında olunca yükseklikleri eşitleniyor ve satır çizgileri
          boşluğun iki yanında aynı hizaya düşüyor. Dar ekranda ızgara tek
          sütuna iniyor, DOM sırası zaten doğru okuma sırası. */}
      <div className="mtb-stage">
        <span className="mtb-k mtb-kin" id="mtbKin">
          {C.exchange.youTitle}
        </span>
        <ul className="mtb-in" aria-labelledby="mtbKin">
          {you.map((y, i) => (
            <li key={y.label} className="mtb-row">
              <span className="mtb-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mtb-name">{y.label}</span>
            </li>
          ))}
        </ul>

        {/* Tek yönlü: bu bir iş birliği değil bir devir. Ok başı dışında bu
            adayda çizim yok. Geniş ekranda yatay, dar ekranda dikey. */}
        <div className="mtb-gate" aria-hidden="true">
          <span className="mtb-rail" />
          <span className="mtb-arrow">
            <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
              <path d="M1 0 L12 6 L1 12 Z" />
            </svg>
          </span>
        </div>

        <span className="mtb-k mtb-kout" id="mtbKout">
          {C.exchange.usTitle}
        </span>
        {/* --i yalnızca sıra numarasının gecikmesini hesaplıyor; satırın
            kendisi hiç hareket etmiyor. */}
        <ul className="mtb-out" aria-labelledby="mtbKout">
          {outputs.map((o, i) => (
            <li
              key={o.label}
              className="mtb-row mtb-row-out"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="mtb-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mtb-name">{o.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
