import {
  ACCOUNTING_DUBAI as C,
  frequencyLabel,
  yearLanes,
} from "@/lib/accountingDubai";
import { MtHead, MtTaxFold, MtWhyFold, mtCaption } from "@/components/lab/MtakvimShared";

/* ============================================================================
   MT1 · YILIN ŞEKLİ — üç şerit yerine tek eksen

   TEŞHİSE CEVABI: bugünkü şeritte 36 kutu var ama söylediği şey üç olgu
   (her ay · 3 ayda bir · yılda bir). Kutuların 18'i BOŞ, yani ekranın yarısı
   "burada bir şey yok" demek için duruyor; üstelik boş/dolu ayrımını okumak
   için önce iki maddelik bir lejant çözmek gerekiyor.

   Bu alternatif ekseni tek satıra indiriyor: her ay bir sütun, sütunun
   yüksekliği o ay kaç kalemin çıktığı. Boş kutu yok — iş yoksa sütun kısa.
   Lejant yok — okunacak renk ya da doku kodu kalmadı, yüksekliğin birimi tek
   satırda yazılı.

   SAYIYI VERİ SÖYLÜYOR: sütun yüksekliği yearLanes()'in months dizilerinden
   sayılıyor. 12. ay üç kalemle en yüksek sütun, çünkü o ay gerçekten üç kalem
   birden çıkıyor (aylık muhasebe + KDV beyannamesi + mali yıl kapanışı).
   Burada icat edilmiş tek bir sayı yok.

   NEYİ FEDA EDİYOR: hangi kalemin hangi ay olduğunu artık sütundan
   okuyamıyorsunuz. Üç çıpa satırı sıklığı söylüyor, ayların tam listesi
   "Üç ritim tam olarak ne demek?" bloğunda.
   ========================================================================= */

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function CalMT1() {
  const lanes = yearLanes();

  /* Ay başına düşen kalemler. Filtre veri üretmiyor, var olan months
     dizilerini sayıyor — kalem sıklığı değişirse grafik de değişiyor. */
  const load = MONTHS.map((m) => lanes.filter((l) => l.months.includes(m)));

  /* Grafiğin sözle söylenmiş hâli. Görseli göremeyen aynı cümleyi okuyor. */
  const alt = `Yılın on iki ayı. Sütun yüksekliği o ay çıkan kalem sayısı: ${load
    .map((x, i) => `${i + 1}. ay ${x.length}`)
    .join(", ")}.`;

  return (
    <section id="mt1" className="mtx-sec">
      <div className="container-o">
        <MtHead />

        <div className="mtx-body">
          <div className="mt1-panel">
            <p className="mt1-cap">{C.calendar.stripTitle}</p>

            <div className="mt1-chart" role="img" aria-label={alt}>
              {load.map((items, i) => (
                <span className="mt1-bar" key={MONTHS[i]}>
                  {items.map((l) => (
                    <i className="mt1-blk" key={l.id} />
                  ))}
                </span>
              ))}
            </div>

            <div className="mt1-axis" aria-hidden="true">
              {MONTHS.map((m) => (
                <span className="mt1-m" key={m}>
                  {m}
                </span>
              ))}
            </div>

            {/* Ay adı YAZILMIYOR ("Aralık" değil "12. ay"): mali yıl şirkete
                göre belirleniyor, yani 12. ay takvimin aralığı olmak zorunda
                değil. Aşağıdaki şerh de bunu söylüyor. */}
            <p className="mt1-unit">
              Sütun yüksekliği: o ay kaç kalem çıkıyor. En yüksek sütun 12. ay,
              çünkü üç kalem aynı aya düşüyor.
            </p>

            {/* Üç çıpa — bölümün gerçekten anlattığı üç olgu. Sıklık önde,
                çünkü ziyaretçinin aklında kalan şey o. Etiket de kutulardan
                sayılıyor (frequencyLabel), elle yazılmıyor. */}
            <ul className="mt1-keys">
              {lanes.map((l) => (
                <li key={l.id}>
                  <span className="mt1-freq">{frequencyLabel(l.months.length)}</span>
                  <span className="mt1-name">{l.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mtx-note">{mtCaption("Sütunlar")}</p>

          <div className="mtx-folds">
            <MtWhyFold />

            <details className="mtx-fold">
              <summary>
                {C.calendar.rhythmTitle}
                <span className="mtx-x" aria-hidden="true" />
              </summary>
              <ul className="mtx-caps">
                {/* Ay listesi yalnızca her ay OLMAYAN kalemlerde basılıyor:
                    "1, 2, 3 … 12. aylar" hiçbir şey söylemiyor, "her ay"
                    zaten satırın çıpasında yazılı. */}
                {lanes.map((l) => (
                  <li key={l.id}>
                    <b>{l.label}</b> — {l.caption}
                    {l.months.length < 12 && ` (${l.months.join(", ")}. aylar)`}
                  </li>
                ))}
              </ul>
            </details>

            <MtTaxFold />
          </div>
        </div>
      </div>
    </section>
  );
}
