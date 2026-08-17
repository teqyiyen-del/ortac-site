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
  mtyBusyText,
  mtyBusyWord,
  mtyFacts,
  mtyPeakText,
  mtySplitText,
} from "@/components/lab/CalMTShared5";

/* ============================================================================
   MT13 · ÖNCE KURULUŞ — iki ayrı perde, kayıtlar kartın ÜSTÜNDE

   Dört düzeltmenin bu adaydaki çözümü:

   d) KAYITLAR KARTIN ÜSTÜNDE. Canlıdaki akış birebir: önce kuruluşta açılan
      üç kayıt, sonra tekrar eden yıl. Kart yalnızca YILIN kendisi kalıyor;
      "bir kez olan" ile "her yıl olan" iki ayrı nesne, o yüzden karışmıyor.
      Geniş ekranda üç kayıt yan yana — alt alta olsalardı kartın üstünde
      ikinci bir metin duvarı doğardı.

   c) CEVAP BİR KELİME. Soru panelin başlığı, cevabı tek kelime: "Hepsinde".
      MT11'in "17 kez"i çapa olmaktan çıktı; dağılım satırının içinde duruyor.
      Kelime veriden geliyor (busy === 12), elle yazılmıyor.

   a) MAVİ MT10'UN DİLİNDE. Oluk yok, pill yok; çentikli tek çubuk ve gerçek
      ay konumlarında kareler. Ayrıntı CalMTShared5 · MtyTrack.

   b) İKİ KAPI, GÖVDELERİ TASARIM. Rozet içeride kaç kalem olduğunu söylüyor;
      ritim ızgarayla, vergi değer-önce künyeyle açılıyor.

   HAREKET: çentiklerin altından geçen tek ışık, 11.987s. Saf CSS, reduce
   kapısı CSS'te.
   ========================================================================= */

export default function CalMT13() {
  const lanes = mtwLanes();
  const f = mtyFacts(lanes);

  return (
    <section className="mtx-sec" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <MtHead />

        <div className="mtw-body">
          {/* PERDE 1 — kuruluş. Başlık verinin kendi başlığı (C.why.title). */}
          <div className="mty-open">
            <p className="mty-open-h">{C.why.title}</p>
            <MtyRecords lay="row" />
          </div>

          {/* PERDE 2 — yıl. */}
          <div className="mty-card">
            <div className="mty-hd">
              <p className="mty-q">{C.calendar.stripTitle}</p>
              <p className="mty-a">{mtyBusyWord(f)}</p>
              <p className="mty-al">
                Lisanstan sonraki {mtyBusyText(f)} en az bir kalem doğuyor.
                Toplam <b>{f.total} iş</b>: {mtySplitText(f)}; {mtyPeakText(f)}.
              </p>
            </div>

            <div
              className="mty-rail"
              style={{ "--mty-dur": "11.987s" } as React.CSSProperties}
            >
              {/* Çizim aria-hidden; cümle ayrı bir düğüm. Kap overflow
                  taşımıyor, o yüzden .sr-only dışarı kaçamaz (tuzak C). */}
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

          <MtwNote subject="Ray" />
        </div>

        <MtyDoors />
      </div>
    </section>
  );
}
