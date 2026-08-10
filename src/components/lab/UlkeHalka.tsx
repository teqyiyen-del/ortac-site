import {
  SAX_ORDER,
  SaxBody,
  SaxDisc,
  SaxHat,
  SaxHead,
} from "@/components/lab/UlkeSax";

/* ============================================================================
   LAB · ADAY 1 · "HALKA" — tek büyük Saturn halkası · ad alanı .sa1-

   FİKİR. Üç ülke tek bir halkanın üstünde duruyor; halkanın alt yayı onların
   altından geçip kapanıyor. Yani bölümün tamamı bir gezegen, üç ülke de o
   gezegenin kuşağı üzerindeki duraklar. Müşterinin "daha Saturn gibi
   hissettirilebilir" cümlesinin en doğrudan karşılığı bu.

   NEYİ FEDA EDİYOR. Halka 124 piksel yer kaplıyor ve hiçbir bilgi taşımıyor;
   canlı yay da öyleydi ama yay bir "kemer" olarak en azından bir hiyerarşi
   çiziyordu. Kapalı bir elips, üç ülkeyi bir sıraya değil bir ÇEMBERE koyuyor
   ve bu bölümün söylediği şeyle çelişebilir: bu üç ülke bir döngünün parçası
   değil, üç ayrı seçenek. Dürüst risk bu.

   GEOMETRİ — tek yerden
   viewBox 1000x104 ve CSS yüksekliği de 104: y ölçeği tam 1, yani neredeyse
   yatay olan yerlerde çizgi kalınlığı ekranda birebir 2 piksel.
   Elips: merkez (500, 68) · rx 470 · ry 42.
   Diskler elipsin ÜST yayında, sütun merkezlerinde (1/6, 1/2, 5/6).

   YOLUN YÖNÜ ÖNEMLİ. Yol soldaki uçtan başlıyor ve ilk yarısı üst yay; ışığın
   git gel'i stroke-dashoffset 0 → -50 → 0 ile kuruluyor, yani ışık sol uçtan
   üst yay boyunca sağ uca gidip aynı yoldan dönüyor. Yol ters çizilseydi ışık
   alt yayda gezerdi ve üç diskin hiçbirine uğramazdı.
   ========================================================================= */

const VB_W = 1000;
const BAND = 124;
/** elipsin merkezi ve yarıçapları */
const CY = 68;
const RX = 470;
const RY = 42;

/* Tek yol, kesiksiz. İlk yay sol uçtan sağ uca ÜSTTEN (sweep=1, saat yönü:
   9'dan 12'ye, oradan 3'e), ikincisi aynı yönde devam edip alttan kapatıyor. */
const RING_D = `M${500 - RX} ${CY}A${RX} ${RY} 0 0 1 ${500 + RX} ${CY}A${RX} ${RY} 0 0 1 ${500 - RX} ${CY}`;

/* Sütun merkezleri ve o noktadaki üst yay yüksekliği. Orta sütun kenardakilerden
   12.4 piksel yukarıda kalıyor ve orta sütun Dubai (SAX_ORDER: İngiltere · Dubai ·
   KKTC). Canlı yay da tam bunu yapıyor — halka o editoryal düzeni bozmuyor. */
const LANE_P = [1 / 6, 1 / 2, 5 / 6];
const ringY = (p: number) => CY - RY * Math.sqrt(1 - ((p * VB_W - 500) / RX) ** 2);

export default function UlkeHalka() {
  return (
    <section className="sec-pad sa1" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <SaxHead />

        <div className="sax-grid sa1-grid">
          {/* Halka ızgaranın bir hücresini işgal etmiyor, üstünden geçiyor.
              preserveAspectRatio="none": yalnızca yatayda geriliyor, viewBox'ın
              y birimi ile ekran pikseli birebir eşit kalıyor. */}
          <svg
            className="sa1-ring"
            viewBox={`0 0 ${VB_W} ${BAND}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="sa1-r" d={RING_D} />
            {/* Işık iki yol, aynı dasharray: geniş-sönük hale ve ince-koyu
                çekirdek. pathLength=100 yol uzunluğunu normalize ediyor, yani
                dashoffset yüzde gibi okunuyor ve elipsin gerçek çevresini
                hesaplamaya (ya da JS ile ölçmeye) gerek kalmıyor. */}
            <path className="sa1-i sa1-i-h" d={RING_D} pathLength={100} />
            <path className="sa1-i sa1-i-c" d={RING_D} pathLength={100} />
          </svg>

          {/* Dar ekranda halka düşüyor, yerine düz hat geliyor: git gel
              telefonda da görünsün diye. CSS masaüstünde gizliyor. */}
          <SaxHat />

          {SAX_ORDER.map((c, i) => (
            <div key={c} className="sax-col">
              <span className="sax-discwrap">
                <SaxDisc c={c} top={ringY(LANE_P[i])} />
              </span>
              <SaxBody c={c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
