import { Fragment } from "react";

import {
  ACCOUNTING_DUBAI as C,
  frequencyLabel,
  yearLanes,
} from "@/lib/accountingDubai";
import {
  MtHead,
  MtTaxFold,
  MtWhyList,
  mtCaption,
  mtConditionalIds,
  mtSoften,
} from "@/components/lab/MtakvimShared";

/* ============================================================================
   MT4 · TEK CÜMLE — bölüm bir cevaba iniyor, gerisi tek kapı

   HANGİ VARSAYIMI KIRIYOR: reddedilen üçü de "bu bölüm bir GÖRSEL etrafında
   kurulmalı" diye başlamıştı (çubuk grafik · durum paneli · satır listesi).
   Üçü de bir okuma NESNESİ çiziyordu. Bu alternatif hiç nesne çizmiyor:
   bölümün tamamı okunacak bir cümle.

   Gerekçesi teşhisin kendisinde yazılı. Bugünkü matriste 59 nesne var ve
   söylediği şey üç olgu. Üç olgu bir cümleye sığıyor — sığdığı anda okunacak
   şekil, çözülecek lejant, tuzağa düşülecek ay ekseni de kalmıyor.

   CÜMLE ELLE YAZILMIYOR: üç ritim yearLanes()'ten geliyor, sıklıklar
   frequencyLabel() ile kutulardan sayılıyor, "kaydınız varsa" şerhi
   afterSetup.ts'teki `inclusion` alanından okunuyor. Kalem sıklığı değişirse
   cümle de değişiyor — yani bu bir metin değil, verinin cümle hâli.

   TEK KAPI, ÜÇ RAF: ayrıntı üç ayrı akordiyona bölünmüyor. Ziyaretçi ya cevabı
   okuyup geçiyor ya da tek kapıyı açıp hepsini bir arada buluyor. Bugünkü
   bölümün en pahalı yanı "kaç ayrı yere bakmam gerekiyor" sorusuydu; burada
   cevap bir.

   NEYİ FEDA EDİYOR: zamanın hiçbir görsel karşılığı yok. Yılın şekli, ayların
   sırası, yoğunlaşan aylar — hiçbiri okunmuyor. Ay listesini isteyen kapıyı
   açmak zorunda ve kapının arkasında üç ayrı konu birden duruyor.
   ========================================================================= */

export default function CalMT4() {
  const lanes = yearLanes();
  const cond = mtConditionalIds();

  return (
    <section id="mt4" className="mtx-sec">
      <div className="container-o">
        {/* lead kapalı: aşağıdaki cümle o cümlenin tamamlanmış hâli. */}
        <MtHead lead={false} />

        <div className="mtx-body">
          <p className="mt4-say">
            {C.calendar.lead.split(".")[0]}. Sonrası tekrar eden{" "}
            {lanes.length === 3 ? "üç" : lanes.length} iş:{" "}
            {lanes.map((l, i) => (
              <Fragment key={l.id}>
                {i > 0 && (i === lanes.length - 1 ? " ve " : ", ")}
                {mtSoften(l.label)}{" "}
                <b className="mt4-key">{frequencyLabel(l.months.length)}</b>
                {/* Şerh cümlenin İÇİNDE kalıyor: "3 ayda bir" ifadesi
                    "kaydınız varsa" olmadan hiçbir hâlde ekrana çıkmıyor. */}
                {cond.has(l.id) && <span className="mt4-if"> (kaydınız varsa)</span>}
              </Fragment>
            ))}
            .
          </p>

          {/* Şerh cümlenin ne gösterdiğini doğru niteliyor: burada ay değil
              SIKLIK var. "Hangi ay" deseydi şerhin kendisi yanlış olurdu. */}
          <p className="mtx-note">
            {mtCaption("Yukarıdaki cümle", "işin hangi sıklıkta çıktığını")}
          </p>

          {/* TEK KAPI. İçinde üç raf var ama kapı bir; her rafın kendi
              başlığı, hangi soruya cevap verdiğini söylüyor. */}
          <div className="mtx-folds">
            <details className="mtx-fold">
              <summary>
                Hangi kayıt, hangi ay, hangi oran?
                <span className="mtx-x" aria-hidden="true" />
              </summary>

              <div className="mt4-drawer">
                <div className="mt4-shelf">
                  <h3 className="mt4-sh">{C.why.title}</h3>
                  <MtWhyList />
                </div>

                <div className="mt4-shelf">
                  <h3 className="mt4-sh">{C.calendar.rhythmTitle}</h3>
                  <ul className="mtx-caps">
                    {lanes.map((l) => (
                      <li key={l.id}>
                        <b>{l.label}</b> — {l.caption}
                        {/* Ay listesi yalnızca her ay OLMAYAN kalemlerde:
                            "1, 2, 3 … 12. aylar" hiçbir şey söylemiyor. */}
                        {l.months.length < 12 && ` (${l.months.join(", ")}. aylar)`}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt4-shelf">
                  <h3 className="mt4-sh">{C.taxFrame.title}</h3>
                  <MtTaxFold bare />
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
