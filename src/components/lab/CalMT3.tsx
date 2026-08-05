import {
  ACCOUNTING_DUBAI as C,
  frequencyLabel,
  yearLanes,
} from "@/lib/accountingDubai";
import { MtHead, MtTaxFold, mtCaption } from "@/components/lab/MtakvimShared";

/* ============================================================================
   MT3 · ÜÇ SATIRLIK LİSTE — görsel yok

   TEŞHİSE CEVABI: en radikal cevap — takvimi hiç çizmemek. Bugünkü bölümde
   dört ayrı okuma biçimi üst üste duruyor (numaralı akordiyonlar, 4×13'lük
   kutu matrisi, lejant, oran tablosu). Bu alternatifte TEK bir okuma biçimi
   var: satır. Fiyat listesi nasıl okunuyorsa öyle.

   ÇIPA SIKLIK: satırın solunda ne olduğu değil NE SIKLIKTA olduğu yazıyor,
   çünkü sorunun kendisi "hangi ay ne oluyor". Kalem adı sağda. Sektör
   sahnesindeki teşhisin aynısı — anlatan şey etiket envanteri değil, üç
   çıpaydı.

   AY NUMARALARI SİLİNMİYOR, KATMANLANIYOR: "3, 6, 9 ve 12. aylar" satırın
   içinde, tıklamanın arkasında. Kapalı hâlde ekranda hiçbir sayı yok.

   NEYİ FEDA EDİYOR: zaman hissinin tamamı. Yıl artık bir şekil değil bir
   liste; "yıl sonunda iş yığılıyor" hiçbir yerde görünmüyor, yalnızca 12.
   ayın iki satırda birden geçtiğini fark edenler çıkarabiliyor.
   ========================================================================= */

export default function CalMT3() {
  const lanes = yearLanes();

  return (
    <section id="mt3" className="mtx-sec">
      <div className="container-o">
        <MtHead />

        <div className="mtx-body">
          <div className="mt3-rows">
            {/* 1 · Kuruluşta açılan kayıtlar. Diğer satırlarla aynı dilde:
                solda sıklık ("bir kez"), sağda ne olduğu. */}
            <details className="mt3-row">
              <summary>
                <span className="mt3-freq">bir kez</span>
                <span className="mt3-name">{C.why.title}</span>
                <span className="mtx-x" aria-hidden="true" />
              </summary>
              <div className="mt3-body">
                <ul className="mt3-sub">
                  {C.why.points.map((p) => (
                    <li key={p.title}>
                      <b>{p.title}</b>
                      {p.line}
                      {p.more ? ` ${p.more}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            {/* 2-4 · Üç ritim. Sıklık etiketi kutulardan sayılıyor
                (frequencyLabel), ay listesi months dizisinden geliyor —
                ikisi de elle yazılmıyor. */}
            {lanes.map((l) => (
              <details className="mt3-row" key={l.id}>
                <summary>
                  <span className="mt3-freq">{frequencyLabel(l.months.length)}</span>
                  <span className="mt3-name">{l.label}</span>
                  <span className="mtx-x" aria-hidden="true" />
                </summary>
                <div className="mt3-body">
                  {l.months.length < 12 && (
                    <p className="mt3-when">{l.months.join(", ")}. aylar</p>
                  )}
                  <p>{l.caption}</p>
                </div>
              </details>
            ))}

            {/* 5 · Vergi çerçevesi. Ayrı bir eksen ama aynı satır dilinde:
                kutu içinde ikinci bir kutu açılmıyor (bare). */}
            <details className="mt3-row">
              <summary>
                <span className="mt3-freq">çerçeve</span>
                <span className="mt3-name">{C.taxFrame.title}</span>
                <span className="mtx-x" aria-hidden="true" />
              </summary>
              <div className="mt3-body">
                <MtTaxFold bare />
              </div>
            </details>
          </div>

          <p className="mtx-note">{mtCaption("Satırlar")}</p>
        </div>
      </div>
    </section>
  );
}
