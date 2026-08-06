import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";

/* ============================================================================
   ADAY 2 · "ÇATAL" — /lab/muhasebe-takas
   CSS: src/app/css/lab-tks2.css · ad alanı .ctl-

   FİKİR: bölümün cevaplayamadığı soru "üç şey verip altı şey almak nasıl
   oluyor". Üç tur boyunca bu soru bir DENGE PROBLEMİ gibi ele alındı (solda az
   var, sağı nasıl doldururuz). Bu aday soruyu tersine çeviriyor: 3 ile 6
   arasındaki fark bölümün kusuru değil KONUSU. Üç tür ham belge tek bir
   deftere giriyor, o defter altı kalem çıkarıyor. Çizim de tam olarak bunu
   söylüyor: üç çizgi bir noktada birleşiyor, o noktadan altı çizgi ayrılıyor.

   Ortada ADSIZ bir düğüm var ve bu bilerek: oraya bir kelime yazmak
   (defter, muhasebe, süreç) veri dosyasında olmayan bir metin uydurmak
   olurdu. Düğüm bir isim değil bir geçiş noktası, o yüzden çizgi olarak
   duruyor.

   ---------------------------------------------------------------------------
   ASİMETRİYE CEVAP: FARKI GÖRSELİN KENDİSİ YAPMAK
   ---------------------------------------------------------------------------

   Aday 1 satır sayısını eşitliyor, aday 3 satırlara 1:2 ölçüsü veriyor. Bu
   aday hiçbirini yapmıyor: solda üç uç var, sağda altı uç var ve aradaki
   çatal bu farkı okunur kılıyor. Denge sayıdan değil BİÇİMDEN geliyor, iki
   yaka da aynı yükseklikte çünkü ikisi de aynı ızgara satırını paylaşıyor.

   ---------------------------------------------------------------------------
   ÖLÇEK TUZAĞINA CEVAP: SVG VAR AMA İÇİNDE TEK HARF YOK
   ---------------------------------------------------------------------------

   Ortadaki çatal bir SVG ve esneyen bir kap içinde duruyor. İçinde hiç metin
   olmadığı için ölçek tuzağı doğmuyor: dokuz kalemin dokuzu da HTML metni,
   puntosu 14 px sabit.

   Çatalın uçlarının satır ortalarına denk gelmesi bir yerleştirme değil bir
   HESAP: iki liste de aynı ızgara satırında ve satırları `1fr`, yani sol üç
   satırın ortası tuvalin %16.7 · %50 · %83.3'ü, sağ altı satırınki
   %8.3 · %25 · %41.7 · %58.3 · %75 · %91.7'si. viewBox 240 birim yüksek
   olduğu için bu oranlar tam sayı: 40/120/200 ve 20/60/100/140/180/220.

   Tuval `preserveAspectRatio="none"` ile esniyor; ölçek 1'e yakın kalsın diye
   viewBox'ın genişliği (340) çatal sütununun gerçekte aldığı genişliğe göre
   seçildi. Ölçüm: sütun 760 px'te 231, 1440 px'te 376 piksel, yani yatay ölçek
   0.68–1.11; dikey ölçek 0.9 civarı. 1.5 birimlik kontur ekranda 1.2–1.6 px.
   non-scaling-stroke bilerek kullanılmadı (kesikli çizgi ile birlikte
   tarayıcıdan tarayıcıya değişebiliyor).

   ---------------------------------------------------------------------------
   ERİŞİLEBİLİRLİĞE CEVAP
   ---------------------------------------------------------------------------

   Dokuz kalem iki <ul> içinde düz <li> metni, sütun başlıklarına
   aria-labelledby ile bağlı. Çatal ve düğümler aria-hidden. Görsel olarak
   gizlenmiş metin yok. Sunucu bileşeni: tarayıcıya bu bloktan JS inmiyor.

   ---------------------------------------------------------------------------
   HAREKET — 47 SANİYE, 10 ANİMASYON
   ---------------------------------------------------------------------------

   Orta yoğunluk. Hareket eden tek şey ÇİZGİLERİN ÜZERİNDEKİ KESİKLER: dokuz
   yolda kesikler ~10 px/s hızla düğüme doğru ve düğümden dışarı akıyor.
   Metne, satıra, düğüme dokunulmuyor; ekranın orta şeridinde sürekli ama
   sessiz bir akış var.

   Neden bu kadar: bu adayın anlattığı şey zaten bir AKIŞ. Hareket burada süs
   değil, çatalın yön bilgisini taşıyan şey. Ama akış çevre görüşte kalıyor,
   metnin üstünde bir olay olmuyor.

   Onuncu animasyon düğümün kendisi: turda bir kez, yarım saniyeliğine
   koyulaşıyor. Bir vurgu değil bir nabız.

   Periyot 47 s: asal, sitedeki sürekli periyotlarla ortak böleni yok, diğer
   iki adayla (67 ve 43) da ortak katı yok.

   `reduce` altında SIFIR animasyon. Duruş karesi tam: çatal, dokuz uç ve
   dokuz ad yerinde.
   ========================================================================= */

/* Uçların tuvaldeki y karşılıkları. Tek yerde duruyorlar çünkü hem yolun
   tanımı hem de listenin satır sayısı bunlara bağlı; biri değişirse hepsi
   değişmeli. */
const IN_Y = [40, 120, 200];
const OUT_Y = [20, 60, 100, 140, 180, 220];

export default function TakasCatal() {
  const you = C.exchange.you;
  const outputs = C.exchange.outputs;

  return (
    <div className="ctl-wrap">
      <div className="ctl-stage">
        <span className="ctl-k ctl-kin" id="ctlKin">
          {C.exchange.youTitle}
        </span>
        <ul className="ctl-in" aria-labelledby="ctlKin">
          {you.map((y) => (
            <li key={y.label} className="ctl-row">
              <span className="ctl-name">{y.label}</span>
              <span className="ctl-node" aria-hidden="true" />
            </li>
          ))}
        </ul>

        {/* ÇATAL. Geniş ekranda SVG, dar ekranda tek bir kesikli çizgi ve ok:
            üç uç alt alta inince çatalın geometrisi anlamını kaybediyor,
            kalan tek doğru cümle "yukarıdan aşağı" oluyor. */}
        <div className="ctl-fan" aria-hidden="true">
          <svg
            className="ctl-fan-svg"
            viewBox="0 0 340 240"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            {IN_Y.map((y, i) => (
              <path
                key={`in-${y}`}
                className="ctl-line-in"
                style={{ "--i": i } as React.CSSProperties}
                d={`M0 ${y} C 85 ${y}, 85 120, 170 120`}
              />
            ))}
            {OUT_Y.map((y, i) => (
              <path
                key={`out-${y}`}
                className="ctl-line-out"
                style={{ "--i": i } as React.CSSProperties}
                d={`M170 120 C 255 120, 255 ${y}, 340 ${y}`}
              />
            ))}
            {/* Düğüm: adsız, kısa bir dikey çizgi. Dikey çizgi esneyen tuvalde
                de dikey kalıyor, yani daire gibi ezilmiyor. */}
            <path className="ctl-trunk" d="M170 103 V137" />
          </svg>
          <span className="ctl-rail" />
          <span className="ctl-arrow">
            <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
              <path d="M1 0 L12 6 L1 12 Z" />
            </svg>
          </span>
        </div>

        <span className="ctl-k ctl-kout" id="ctlKout">
          {C.exchange.usTitle}
        </span>
        <ul className="ctl-out" aria-labelledby="ctlKout">
          {outputs.map((o) => (
            <li key={o.label} className="ctl-row">
              <span className="ctl-node" aria-hidden="true" />
              <span className="ctl-name">{o.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
