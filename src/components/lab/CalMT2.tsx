"use client";

import { useId, useState } from "react";

import {
  ACCOUNTING_DUBAI as C,
  frequencyLabel,
  yearLanes,
} from "@/lib/accountingDubai";
import { MtHead, MtTaxFold, MtWhyFold, mtCaption } from "@/components/lab/MtakvimShared";

/* ============================================================================
   MT2 · ŞU AN NEREDEYİM — takvim yok, tek durum

   TEŞHİSE CEVABI: bugünkü şerit ziyaretçiye bütün yılı aynı anda gösteriyor
   ve okuma işini ona bırakıyor — üç şeridi, on iki ayı ve dolu/boş ayrımını
   kafasında kesiştirmesi gerekiyor. Oysa ziyaretçinin gerçek sorusu tek bir
   ay hakkında: "şu an bende ne var?"

   Bu alternatif o soruyu ekrana koyuyor ve tek bir durumla cevaplıyor.
   Yılın tamamı hiç çizilmiyor; on üç durak var (kuruluş anı + on iki ay) ve
   her an yalnızca biri açık.

   HEM OLAN HEM OLMAYAN YAZILI: panel "bu ay ne var" kadar "bu ay ne yok"u da
   söylüyor. Boş kutu bir nesne olmaktan çıkıp bir cümleye dönüşüyor — yer
   kaplamıyor ama bilgi de kaybolmuyor.

   ERİŞİLEBİLİRLİK: kontrol gerçek bir radio grubu (<fieldset> + <legend> +
   name paylaşan <input type="radio">). Ok tuşlarıyla gezinme, roving
   tabindex ve "seçili" duyurusu tarayıcının kendi davranışı — taklit
   edilmiyor. Panel aria-live="polite", yani seçim değişince yeni durum
   okunuyor.

   NEYİ FEDA EDİYOR: yılın bütünü. "Yıl sonunda iş yığılıyor" gibi bir şekil
   artık tek bakışta görünmüyor; on iki durağı görmek on iki tıklama.
   ========================================================================= */

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

/** 0 = kuruluş anı; 1-12 = şirketin kaçıncı ayı. */
type Stop = number;

export default function CalMT2() {
  const lanes = yearLanes();
  const name = useId();

  /* Varsayılan kuruluş anı: bölümün başlığı önce "ne zaman başlıyor" diye
     soruyor, cevabı da bu durak. */
  const [stop, setStop] = useState<Stop>(0);

  const on = stop === 0 ? [] : lanes.filter((l) => l.months.includes(stop));
  const off = stop === 0 ? [] : lanes.filter((l) => !l.months.includes(stop));

  return (
    <section id="mt2" className="mtx-sec">
      <div className="container-o">
        <MtHead />

        <div className="mtx-body">
          <fieldset className="mt2-ask">
            <legend className="mt2-q">Şirketiniz kaçıncı ayında?</legend>

            <div className="mt2-ctl">
              <label className="mt2-opt">
                <input
                  type="radio"
                  name={name}
                  checked={stop === 0}
                  onChange={() => setStop(0)}
                />
                <span className="mt2-pill">Kuruluş</span>
              </label>

              {MONTHS.map((m) => (
                <label className="mt2-opt" key={m}>
                  <input
                    type="radio"
                    name={name}
                    checked={stop === m}
                    onChange={() => setStop(m)}
                  />
                  <span className="mt2-pill">{m}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Tek panel, tek durum. aria-live: seçim değişince içerik
              duyuruluyor, odak yerinden oynamıyor. */}
          <div className="mt2-panel" aria-live="polite">
            {stop === 0 ? (
              <>
                <p className="mt2-when">Lisansın hemen ardından</p>
                <ul className="mt2-list">
                  {C.why.points.map((p) => (
                    <li key={p.title}>
                      <span className="mt2-item">{p.title}</span>
                      <span className="mt2-tag">bir kez</span>
                    </li>
                  ))}
                </ul>
                <p className="mt2-off">
                  Bu üçü kuruluşta açılıyor. Sonrası aşağıdaki ritim: ay
                  numarasını seçin.
                </p>
              </>
            ) : (
              <>
                <p className="mt2-when">{stop}. ay</p>
                <ul className="mt2-list">
                  {on.map((l) => (
                    <li key={l.id}>
                      <span className="mt2-item">{l.label}</span>
                      <span className="mt2-tag">{frequencyLabel(l.months.length)}</span>
                    </li>
                  ))}
                </ul>
                {off.length > 0 && (
                  <p className="mt2-off">
                    Bu ay doğmayan:{" "}
                    {off.map((l, i) => (
                      <span key={l.id}>
                        {i > 0 && ", "}
                        {l.label} ({frequencyLabel(l.months.length)})
                      </span>
                    ))}
                    .
                  </p>
                )}
              </>
            )}
          </div>

          <p className="mtx-note">{mtCaption("Bu panel")}</p>

          <div className="mtx-folds">
            <MtWhyFold />

            <details className="mtx-fold">
              <summary>
                {C.calendar.rhythmTitle}
                <span className="mtx-x" aria-hidden="true" />
              </summary>
              <ul className="mtx-caps">
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
