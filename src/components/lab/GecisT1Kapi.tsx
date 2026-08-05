"use client";

import { useState } from "react";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ADAY T1 (.gc1-) — TÜR: YÖNLENDİRME
 *
 * ==========================================================================
 * BU ARALIĞA VERDİĞİ İŞ
 *
 * Bölüm ülkeyi ANLATMIYOR, ziyaretçiyi AYIRIYOR. Hero bittiğinde sayfa tek
 * bir soru soruyor — "hangisi sizsiniz?" — ve cevap, hemen altındaki yapı
 * seçimi bölümünün hangi kartına bakacağınızı baştan söylüyor. Yani aralık
 * bir özet değil bir ELEME: ziyaretçi aşağıya iki seçenekle değil, kendi
 * seçeneğiyle iniyor.
 *
 * Beş turdur bu aralık başarısızdı çünkü kendine ait bir işi yoktu. Bunun
 * işi var ve işi sayfanın geri kalanından ÇALINMIŞ değil: yapı seçimi bölümü
 * iki yapıyı anlatıyor, burası ziyaretçinin hangisine ait olduğunu soruyor.
 * İkisi aynı şey değil — biri bilgi, öteki karar.
 *
 * ==========================================================================
 * TEK KELİMESİ UYDURULMADI
 *
 * Kapıların üstündeki cümleler countryContent.structures.options[n].fit[0],
 * yani veri zaten "bunu yapıyorsanız burası" diye yazılmış (Structure tipinin
 * kendi yorumu: "the selection logic, not a feature list"). Cevap panelindeki
 * ad ve satır da options[n].name / .line. Soru cümlesi ("Hangisi sizsiniz?")
 * hiçbir olgu taşımıyor — bir sorunun içinde iddia yok.
 *
 * ÜLKEDEN BAĞIMSIZ: structures yoksa bölüm de yok (İngiltere ve KKTC'de
 * `structures` tanımsız). Uydurma bir ikilem üretmektense hiç basmıyor.
 *
 * ==========================================================================
 * HAREKET
 *
 * Ekranda iki şey var → politika "olabildiğince fazla" tarafında. Kapılar
 * arasında sürekli gidip gelen bir ışık var (8.4 s, sonsuz): bölüm bir
 * soruyu bekliyor ve bunu bekleyerek söylüyor. SEÇİM YAPILINCA IŞIK DURUYOR
 * — soru cevaplandı, artık dikkat çekmesinin sebebi kalmadı. Durma CSS'te
 * data-chosen ile, JS zamanlayıcısıyla değil.
 *
 * useReducedMotion YOK (bu depoda hidrasyon hatası çıkardı). Hareketin
 * tamamı CSS ve yalnızca no-preference altında TANIMLANIYOR.
 */

export default function GecisT1Kapi({ country }: { country: Country; name: string }) {
  const s = COUNTRY_CONTENT[country].structures;
  /* Kanca sırası korunuyor: erken return hook'tan SONRA olamaz, o yüzden
     useState yukarıda ve boş veri kontrolü altında. */
  const [pick, setPick] = useState<number | null>(null);
  if (!s || s.options.length < 2) return null;

  const chosen = pick === null ? null : s.options[pick];

  return (
    <section className="gc1">
      <div className="container-o">
        <div className="gc1-in">
          <p className="gc1-kicker">Önce tek soru</p>
          <h2 className="gc1-q">Hangisi sizsiniz?</h2>

          {/* data-chosen sadece ışığı durdurmak için; seçili kapıyı
              data-on işaretliyor. İki ayrı iş, iki ayrı nitelik. */}
          <div className="gc1-doors" data-chosen={pick === null ? undefined : "true"}>
            {s.options.map((o, i) => (
              <button
                key={o.name}
                type="button"
                className="gc1-door"
                style={{ "--i": i } as React.CSSProperties}
                data-on={pick === i || undefined}
                aria-pressed={pick === i}
                onClick={() => setPick(pick === i ? null : i)}
              >
                <span className="gc1-door-t">{o.fit[0]}</span>
                <span className="gc1-door-c" aria-hidden="true" />
              </button>
            ))}
          </div>

          {/* Cevap panelinin kendisi bir bölüm değil, bir işaret: yapının adı
              ve tek satırı. Ayrıntı zaten bir ekran aşağıda ve oraya iki kez
              yazmıyoruz. */}
          <div className="gc1-ans" role="status" aria-live="polite">
            {chosen ? (
              <p className="gc1-ans-p" key={chosen.name}>
                <b className="gc1-ans-b">{chosen.name}.</b> {chosen.line}
              </p>
            ) : (
              <p className="gc1-ans-hint">Seçin, aşağıdaki bölümde hangi kartın sizin olduğunu yazalım.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
