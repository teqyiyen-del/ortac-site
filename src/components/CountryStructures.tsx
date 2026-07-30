"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Circle, TriangleAlert } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import type { CountryContent, Structure } from "@/lib/countryContent";

/* Brief §8 revizyon — bu bölüm eskiden solda şematik bir Dubai haritası
   (DubaiZoneMap) ve sağda üst üste iki kart olarak duruyordu. İki sorun vardı:
   harita seçimi "tasvir" ediyordu ama hiçbir şey açıklamıyordu, ve iki kart
   alt alta olduğu için ziyaretçi serbest bölge ile mainland'i aynı anda
   göremiyordu — yani kıyas diye bir şey yoktu, iki paragraf okuma egzersizi
   vardı. Bölüm 1071px yer kaplıyordu.

   Yeni kurgu üç parçadan oluşuyor:
   1) Karar kuralı, başlığın yanındaki boş sağ yarıya taşındı. O alan zaten
      kullanılmıyordu; kural artık dipnot değil, başlıkla aynı hizada duran
      ikinci en görünür şey. Kuralın iki dalı altında şema gibi yazılı.
   2) Kıyas tablosu: aynı satırda serbest bölge ve mainland. Her satır tek bir
      soruyu iki yapı için birden cevaplıyor, "dikkat" satırı dahil — uyarılar
      seçili olmayan tarafta da görünür kalıyor, saklanmıyor.
   3) Bir sütuna tıklayınca altta "nasıl işliyor" şeridi açılıyor: şirket →
      lisansın bağlı olduğu otorite → satış tarafı. Tıklamanın karşılığı
      vurgulanmış bir kutu değil, mekanizmanın kendisi. */

/* Karar kuralının iki dalı. data.rule cümlesinin içindeki koşulları tek tek
   okunur hale getiriyor; içerik oradan geliyor, burada yeni bir iddia yok.
   Sıra options dizisiyle aynı olmak zorunda: 0 = serbest bölge, 1 = mainland.
   Bileşen zaten Dubai'ye özel (structures yalnızca Dubai'de tanımlı), o yüzden
   bu eşleşme veriye değil bileşene ait bir sunum kararı. */
const BRANCHES = [
  { when: "Müşteriniz BAE dışında", side: "BAE dışındaki müşteri" },
  { when: "Müşteriniz BAE içinde", side: "BAE içindeki müşteri" },
];

/* Kıyas satırları. fit[0] ve fit[1] iki seçenekte de aynı soruyu cevapladığı
   için kendi satırlarını alıyor; geri kalan maddeler tek satırda rozet olarak
   toplanıyor, çünkü oradan sonrası iki tarafta birebir örtüşmüyor ve zorlama
   bir eşleştirme tabloyu yanlış okutur. */
const ROWS: { label: string; pick: (o: Structure) => string | undefined }[] = [
  { label: "Kime satarsınız", pick: (o) => o.fit[0] },
  { label: "Tipik iş modeli", pick: (o) => o.fit[1] },
];

/* line iki cümle taşıyor: önce lisansın bağlı olduğu otorite, sonra bir
   bağlam cümlesi. İkisini ayırıyoruz çünkü dar ekranda sütun genişliği
   ~175px'e düşüyor ve ikinci cümle başlığı beş satıra çıkarıyor — orada
   yalnız birincisi kalıyor (bkz. .stx-h-l2), şema da zaten birinciyi
   kullanıyor. */
function splitLine(line: string) {
  const [first, ...rest] = line.split(". ");
  /* nokta ayrı basılıyor (şemada nokta istemiyoruz), tek cümlelik bir line
     gelirse çift nokta çıkmasın */
  return { head: first.replace(/\.$/, ""), tail: rest.join(". ") };
}

export default function CountryStructures({
  data,
}: {
  data: NonNullable<CountryContent["structures"]>;
}) {
  /* Başlangıçta hiçbir sütun seçili değil. Varsayılan bir seçim koymak
     ziyaretçi daha soruyu okumadan bir yapıyı önermek olurdu; tablo nötr
     başlasın, seçimi kullanıcı yapsın. Aynı sütuna tekrar tıklamak seçimi
     kaldırıyor. */
  const [picked, setPicked] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const active = picked === null ? null : data.options[picked];
  const branch = picked === null ? null : BRANCHES[picked];
  /* Lisansın bağlı olduğu otorite line'ın ilk cümlesinde duruyor
     ("Bölge otoritesine bağlı lisans. …"). Şemada tek başına kullanılıyor. */
  const authority = active ? splitLine(active.line).head : "";

  /* fit dizisinin ilk iki maddesi kendi satırlarında; kalanı rozet satırında.
     Veri kısalırsa satır hiç basılmıyor. */
  const hasExtras = data.options.some((o) => o.fit.length > 2);

  return (
    <section id="yapi" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="stx-top">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text={data.title}
              accent="serbest bölge mi, mainland mi?"
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">{data.lead}</p>
            </FadeUp>
          </div>

          <FadeUp delay={0.26}>
            <aside className="stx-rule">
              <span className="stx-rule-k">Karar kuralı</span>
              <p className="stx-rule-t">{data.rule}</p>
              <ul className="stx-map">
                {data.options.map((o, idx) => (
                  <li key={o.name}>
                    <span className="stx-map-if">{BRANCHES[idx]?.when}</span>
                    <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
                    <span className="stx-map-then">{o.name}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </FadeUp>
        </div>

        <FadeUp delay={0.3}>
          <div className="stx-tbl">
            {/* tablo başlığı: sol üst köşe boş kalmasın diye ızgaranın ne
                olduğunu söyleyen küçük bir etiket taşıyor */}
            <div className="stx-corner">Kıyas</div>
            {data.options.map((o, idx) => {
              const on = picked === idx;
              const { head, tail } = splitLine(o.line);
              return (
                <button
                  key={o.name}
                  type="button"
                  className="stx-h"
                  aria-pressed={on}
                  data-on={on || undefined}
                  onClick={() => setPicked(on ? null : idx)}
                >
                  <span className="stx-h-n">{o.name}</span>
                  <span className="stx-h-l">
                    {head}.{tail ? <span className="stx-h-l2"> {tail}</span> : null}
                  </span>
                  <span className="stx-h-cta">
                    {on ? (
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    ) : (
                      <Circle size={12} strokeWidth={2.4} aria-hidden="true" />
                    )}
                    {on ? "Durumunuz bu" : "Durumum bu"}
                  </span>
                </button>
              );
            })}

            {ROWS.map((row) => (
              /* display:contents — satırın üç hücresi doğrudan ızgaraya
                 düşsün, araya kutu girmesin */
              <div key={row.label} style={{ display: "contents" }}>
                <div className="stx-lb">{row.label}</div>
                {data.options.map((o, idx) => (
                  <div key={o.name} className="stx-c" data-on={picked === idx || undefined}>
                    {row.pick(o)}
                  </div>
                ))}
              </div>
            ))}

            {hasExtras && (
              <div style={{ display: "contents" }}>
                <div className="stx-lb">Ayrıca size uyuyorsa</div>
                {data.options.map((o, idx) => (
                  <div key={o.name} className="stx-c" data-on={picked === idx || undefined}>
                    <span className="stx-chips">
                      {o.fit.slice(2).map((f) => (
                        <span key={f} className="stx-chip">
                          <Check size={11} strokeWidth={3.4} aria-hidden="true" />
                          {f}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* dikkat satırı seçimden bağımsız: iki tarafın da uyarısı hep
                açıkta duruyor, seçilen yapının arkasına saklanmıyor */}
            <div style={{ display: "contents" }}>
              <div className="stx-lb stx-lb-warn">Dikkat edin</div>
              {data.options.map((o) => (
                <div key={o.name} className="stx-c stx-c-warn">
                  <TriangleAlert size={14} strokeWidth={2.3} aria-hidden="true" />
                  {o.watch}
                </div>
              ))}
            </div>

            {active && (
              <motion.div
                className="stx-flow-w"
                initial={reduce ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="stx-flow">
                  <span className="stx-flow-k">{active.name}: nasıl işliyor</span>
                  <ol className="stx-flow-s">
                    <li>
                      <span className="stx-flow-l">Şirket</span>
                      <span className="stx-flow-v">Dubai&apos;de kurulu şirketiniz</span>
                    </li>
                    <li>
                      <span className="stx-flow-l">Lisans</span>
                      <span className="stx-flow-v">{authority}</span>
                    </li>
                    <li>
                      <span className="stx-flow-l">Satış</span>
                      <span className="stx-flow-v">{branch?.side}</span>
                    </li>
                  </ol>
                </div>
              </motion.div>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
