import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";
import { MtHead } from "@/components/lab/MtakvimShared";
import { MtwNote, mtwAlt, mtwLanes } from "@/components/lab/CalMTShared4";
import {
  MtyAxis,
  MtyCount,
  MtyDoors,
  MtyKey,
  MtyRecords,
  MtyTrack,
  mtyFacts,
  mtyPeakText,
  mtyPeakX,
  mtySplitText,
} from "@/components/lab/CalMTShared5";

/* ============================================================================
   MT14 · TEK KART, İKİ PERDE — her şey siyahın içinde

   Dört düzeltmenin bu adaydaki çözümü:

   d) KAYITLAR KARTIN İÇİNDE, İLK PERDE. Müşterinin iki seçeneğinden "entegre
      et" olanı. Kart yukarıdan aşağı zaman: önce kuruluşta bir kez açılan üç
      kayıt, sonra tekrar eden on iki ay. Kayıtlar burada kutu DEĞİL satır —
      kartın içine üç kutu daha koymak "aynı anda görünen nesne azalsın"
      sözleşmesini bozardı.

   c) CEVAP BİR RAKAM ÇİFTİ: 12 / 12 ay. MT11'in çapası tek bir toplamdı (17)
      ve neyin toplamı olduğu okunmuyordu; burada rakam doğrudan sorunun
      birimiyle aynı (ay). 17 dağılım satırında duruyor.
      YIĞILMA ÇİZİLİYOR: en yoğun ayın konumuna rayı boydan boya kesen ince
      bir kılavuz iniyor. Konum veriden (mtyPeakX), cümleden değil — üç
      satırın işareti o çizginin üstünde üst üste geliyor ve "bir ay üç kalem"
      iddiası gözle doğrulanıyor.

   a) MAVİ MT10'UN DİLİNDE. Ayrıntı CalMTShared5 · MtyTrack.

   b) İKİ KAPI, GÖVDELERİ TASARIM (MT13 ile aynı; kıyas yüzeyde).

   HAREKET: çentiklerin altından geçen tek ışık, 19.441s. Saf CSS.
   ========================================================================= */

export default function CalMT14() {
  const lanes = mtwLanes();
  const f = mtyFacts(lanes);

  return (
    <section className="mtx-sec" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <MtHead />

        <div className="mtw-body">
          <div className="mty-card">
            {/* PERDE 1 — kuruluşta bir kez. */}
            <p className="mty-act">{C.why.title}</p>
            <MtyRecords tone="night" />

            {/* PERDE 2 — sonra her yıl. Soru ve cevabı iki perdenin arasında:
                yukarısı bir kez oldu, aşağısı tekrar ediyor. */}
            <div className="mty-act2">
              <div className="mty-hd">
                <p className="mty-q">{C.calendar.stripTitle}</p>
                <p className="mty-a">
                  {f.busy}
                  <span className="mty-aden">/ {f.load.length} ay</span>
                </p>
                <p className="mty-al">
                  İş çıkmayan ay yok. Toplam <b>{f.total} iş</b>: {mtySplitText(f)};{" "}
                  {mtyPeakText(f)}.
                </p>
              </div>

              <div
                className="mty-rail"
                data-peak=""
                style={
                  { "--mty-dur": "19.441s", "--pk": mtyPeakX(f) } as React.CSSProperties
                }
              >
                {/* Çizim aria-hidden; cümle ayrı bir düğüm (tuzak G). */}
                <p className="sr-only">{mtwAlt(lanes)}</p>

                <MtyAxis />

                <ol className="mty-rows">
                  {lanes.map((l) => (
                    <li key={l.id}>
                      <div className="mty-key-row">
                        <MtyKey lane={l} />
                        <MtyTrack months={l.months} />
                        <MtyCount n={l.months.length} />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <MtwNote subject="Kart" />
        </div>

        <MtyDoors />
      </div>
    </section>
  );
}
