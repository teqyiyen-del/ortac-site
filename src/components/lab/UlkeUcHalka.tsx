import {
  SAX_ORDER,
  SaxBody,
  SaxDisc,
  SaxHat,
  SaxHead,
} from "@/components/lab/UlkeSax";

/* ============================================================================
   LAB · ADAY 2 · "ÜÇ HALKA" — her ülke kendi gezegeni · ad alanı .sa2-

   FİKİR. Saturn'ü bölümün tamamına değil HER ÜLKEYE veriyor. Tek düz mavi
   çizgi üç diski diziyor; her diskin kendi eğik halkası var. Müşterinin üç
   isteği burada çakışmadan bir arada duruyor: halka var, çizgi tek ve düz,
   git gel çizginin üstünde.

   HALKA NEDEN İKİ PARÇA. Arka yarı diskin ALTINDA, ön yarı ÜSTÜNDE çiziliyor.
   Tek parça olsaydı halka bayrağın önünden geçer ve gezegen değil madalyon
   okunurdu. Derinliği yapan tek şey bu sıralama; oran (halka diskten geniş
   ama basık) ikinci işaret.

   NEYİ FEDA EDİYOR. Üç halka üç ayrı süs demek: bölümde zaten üç bayrak, üç
   ad, üç künye ve bir çizgi var. Halkalar bunların üstüne bir katman daha
   koyuyor ve bilgi taşımıyorlar. Ayrıca 88 piksellik disk yuvası, halkasız
   hâle göre 28 piksel fazla yer istiyor.

   HAREKET. Işık çizgide soldan sağa giderken halkalar SIRAYLA parlıyor,
   dönüşte ters sırayla. Üçünün periyodu hattınkiyle aynı (10.9 s) ve bu
   bilerek: farklı periyot verilseydi halkalar ışıktan bağımsız bir ritim
   kurar ve "bir şey bozuldu" gibi okunurdu. Aynı periyot burada senkron
   kazası değil, tek bir olayın üç yerden anlatılması.

   GEOMETRİ. Halka kutusu 88x88, merkez (44,44), rx 42, ry 13, eğim -14 derece.
   Yarıçapların ucu (majör eksenin iki ucu) arka ile ön yayı ayıran nokta;
   ikisi de oradan başlayıp saat yönünde çiziliyor.
     A = merkez - (rx·cos14, -rx·sin14) = (3.25, 54.16)
     B = merkez + (rx·cos14, -rx·sin14) = (84.75, 33.84)
   Disk 56 piksel, yani halka yatayda 13'er piksel taşıyor, dikeyde diskin
   içinde kalıyor.
   ========================================================================= */

const BACK_D = "M3.25 54.16A42 13 -14 0 1 84.75 33.84";
const FRONT_D = "M84.75 33.84A42 13 -14 0 1 3.25 54.16";

/* Sütunun sırası CSS'e sınıf adıyla söyleniyor: üç halkanın parlama anı
   farklı (sol %0/%100, orta %25/%75, sağ %50) ve bu ancak seçiciyle
   ayrılabiliyor. Negatif animation-delay ile tek kare setinden de
   çıkarılabilirdi ama depoda kural var (aktarim.css · üçüncü tuzak): sayfa
   açıldığında hiçbir şey yanık başlamamalı. */
const COL_I = ["sa2-col-0", "sa2-col-1", "sa2-col-2"];

export default function UlkeUcHalka() {
  return (
    <section className="sec-pad sa2" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <SaxHead />

        <div className="sax-grid sa2-grid">
          <SaxHat />

          {SAX_ORDER.map((c, i) => (
            <div key={c} className={"sax-col sa2-col " + COL_I[i]}>
              <span className="sax-discwrap">
                {/* Sıra DOM'da da doğru olmak zorunda: arka yay → disk → ön
                    yay. z-index üçünü ayırıyor ama aynı yığın bağlamında
                    kaynak sırası da okunabilirliğin bir parçası. */}
                <svg className="sa2-halka sa2-halka-b" viewBox="0 0 88 88" aria-hidden="true">
                  <path className="sa2-hb" d={BACK_D} />
                </svg>

                <SaxDisc c={c} />

                <svg className="sa2-halka sa2-halka-f" viewBox="0 0 88 88" aria-hidden="true">
                  {/* Beyaz alt kat: ön yay bayrağın üstünden geçiyor ve
                      İngiltere'nin lacivert zemininde mavi bir tel
                      kayboluyordu. Arka yayda gerek yok, orası beyaz zeminde. */}
                  <path className="sa2-hw" d={FRONT_D} />
                  <path className="sa2-hb" d={FRONT_D} />
                </svg>
              </span>
              <SaxBody c={c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
