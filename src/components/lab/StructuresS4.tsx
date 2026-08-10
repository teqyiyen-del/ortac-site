"use client";

import { useId, useState } from "react";
import { Check, Globe, Store, TriangleAlert } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import YapiScene, { type YapiState } from "@/components/lab/StructuresYapiScene";
import type { CountryContent } from "@/lib/countryContent";

/* ADAY Y4 (.y4-) — "AÇILIŞTA SERBEST BÖLGE SEÇİLİ"
 *
 * ---------------------------------------------------------------------------
 * BOŞTAKİ PASİFLİĞE CEVABI: BOŞ HÂL DİYE BİR ŞEY YOK
 *
 * Müşterinin şikâyeti şuydu: "üstlerine gelince okey haritada bir şey
 * gözüküyor ama gelmediğimizde çok pasif durumda." Kendi önerdiği iki
 * çözümden biri de buydu: "sanki serbest bölge başlangıçta seçili gelmiş gibi
 * de yapabiliriz."
 *
 * Bu aday o cümleyi harfiyen uyguluyor. Bölüm açıldığı anda serbest bölge
 * seçili: harita mavi, çit şirketin etrafında, sevkiyat kıyıyı geçip dışarı
 * gidiyor, sağdaki kart açık ve listesi görünüyor. Ziyaretçi hiçbir şey
 * yapmadan bölümün ne anlattığını baştan sona görüyor. "Pasif" hâl ortadan
 * kalkıyor çünkü öyle bir hâl hiç üretilmiyor.
 *
 * NEDEN SERBEST BÖLGE. Keyfi değil, verinin kendi cümlesi:
 * options[0].line → "Kuruluşların büyük çoğunluğu burada." Yani varsayılan bir
 * tavsiye değil, çoğunluğun bulunduğu yeri gösteren bir başlangıç noktası.
 *
 * FEDA EDİLEN ŞEY. S3'ün en iyi tarafı, ziyaretçiden bilmediği bir şeyi
 * (hangi yapı) değil en iyi bildiği şeyi (müşterim nerede) istemesiydi ve
 * soruyu SORULMUŞ hâlde bırakmasıydı. Burada soru zaten cevaplanmış olarak
 * geliyor; mainland tarafına geçmek artık bir düzeltme hareketi. İkinci
 * seçenek yapısal olarak ikinci sırada.
 *
 * ---------------------------------------------------------------------------
 * KARTLAR NE KADAR BÜYÜDÜ
 *
 * İkinci istek: "sağdaki serbest bölge ve mainland kartlarının daha büyük
 * olması lazım." Üç şey birden yapıldı:
 *   1. Izgara oranı ters çevrildi. S3'te harita 1fr, kartlar 0.74fr idi;
 *      burada harita 0.78fr, kartlar 1fr. Kart sütunu haritadan geniş.
 *   2. Kart artık tek satırlık bir düğme değil: ikon karosu 30px'ten 46px'e,
 *      yapının adı 17px'ten 21px'e çıktı, altında verinin `line` cümlesi ve
 *      `watch` uyarısı KAPALIYKEN DE duruyor.
 *   3. Seçili kartın `fit` listesi açık duruyor. İki kart bilerek eşit
 *      yükseklikte değil: seçimin kendisi yerleşimden okunuyor.
 *
 * ---------------------------------------------------------------------------
 * ERİŞİLEBİLİRLİK — GERÇEK RADYO DÜĞMELERİ
 *
 * Bu depoda bir bulgu var: rolü olmayan <span aria-current> erişilebilirlik
 * ağacında adsız kalıyor ve durum hiç yayınlanmıyor. O yüzden burada durum
 * taklit edilmiyor: kartın başlığı bir <label>, içinde gerçek bir
 * <input type="radio"> var. Kazançlar bedava geliyor:
 *   · rol "radio", durum "checked" olarak ağaçta
 *   · aynı name'i paylaşan iki radyo arasında ok tuşlarıyla geçiş
 *   · erişilebilir ad label'ın metni: "BAE dışına satıyorsanız Serbest bölge"
 * Girdi görsel olarak gizli ama odaklanabilir; odak halkası kardeş seçiciyle
 * (.y4-in:focus-visible ~ .y4-face) kartın yüzüne taşınıyor.
 *
 * ---------------------------------------------------------------------------
 * İDDİA SINIRI
 * Bütün metin countryContent.structures'tan. Burada üretilen tek şey kuralın
 * iki dalının kısa etiketi ("BAE dışına satıyorsanız" / "BAE içine
 * satıyorsanız") ki o da data.rule cümlesinin kendi ifadesi, ve açılan
 * listenin başlığı ("Bunu yapıyorsanız") — canlı bölümden gelen dil. Yeni
 * süre, oran, kota, vergi iddiası yok.
 */

/* Kuralın iki dalı. Sıra data.options ile aynı olmak zorunda: 0 = serbest
   bölge, 1 = mainland. Bileşen yalnızca Dubai'de çalışıyor (structures başka
   ülkede tanımlı değil), o yüzden bu eşleşme veriye değil sunuma ait. */
const VIEWS = [
  { key: "free", when: "BAE dışına satıyorsanız", Icon: Globe },
  { key: "main", when: "BAE içine satıyorsanız", Icon: Store },
] as const;

/* Şemanın sözlü karşılığı. Y4'te nötr hâl hiç oluşmadığı için iki metin var. */
const ALT: Record<"free" | "main", string> = {
  free:
    "Şematik harita: serbest bölge seçili. Şirket ülkenin içindeki çitli bir alanda; satış kıyıyı geçip BAE dışındaki müşteriye gidiyor.",
  main:
    "Şematik harita: mainland seçili. Şirket ülkenin genelinde; satış sınırın içinde kalıp BAE içindeki müşteriye gidiyor.",
};

export default function StructuresS4({
  data,
}: {
  data: NonNullable<CountryContent["structures"]>;
}) {
  /* Açılış seçimi. null değil 0: bu adayın tek fikri bu. Sunucuda da 0
     basıldığı için hidrasyon farkı yok. */
  const [picked, setPicked] = useState(0);
  /* Önizleme: üzerine gelinen kart, seçimi değiştirmeden haritayı o yapıya
     çeviriyor. Fare çekilince seçim geri geliyor, yani harita hiçbir an
     boşta kalmıyor. */
  const [hint, setHint] = useState<number | null>(null);
  const shown = hint ?? picked;

  /* React'in ürettiği id noktalama taşıyor; htmlFor ve name düz id karakteri
     istiyor. */
  const uid = `y4${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const group = `${uid}-yapi`;

  const state: YapiState = VIEWS[shown]?.key ?? "free";
  const name = data.options[shown]?.name ?? null;

  return (
    <section className="sec-pad y4-sec" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          {/* accent "yapıyı seçiyoruz:" — veri kısaldığında da (başlık artık
              yalnızca "Önce yapıyı seçiyoruz:") doğru yerde kalan tek parça. */}
          <SplitWords
            as="h2"
            text={data.title}
            accent="yapıyı seçiyoruz:"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{data.lead}</p>
          </FadeUp>
        </div>

        <div className="y4-grid">
          <FadeUp delay={0.26}>
            <figure className="y4-fig">
              <div className="yhm-map y4-map" data-state={state}>
                <YapiScene state={state} name={name} alt={ALT[state]} />
              </div>
              <figcaption className="yhm-cap">
                Şematik gösterim; ölçekli harita değildir.
              </figcaption>
            </figure>
          </FadeUp>

          <FadeUp delay={0.32}>
            <div className="y4-side">
              <p className="y4-rule">
                <span className="y4-rule-k">Karar kuralı</span>
                <span className="y4-rule-t">{data.rule}</span>
              </p>

              {/* Grubun adı ağaçta görünsün diye aria-label: iki radyo tek bir
                  soruya cevap veriyor, ekran okuyucu o soruyu duymalı. */}
              <div className="y4-cards" role="radiogroup" aria-label="Yapı seçimi">
                {data.options.map((o, idx) => {
                  const v = VIEWS[idx];
                  const on = picked === idx;
                  const rid = `${uid}-r${idx}`;
                  return (
                    <div
                      key={o.name}
                      className="y4-card"
                      data-on={on || undefined}
                      data-pre={(hint === idx && !on) || undefined}
                      onPointerEnter={() => setHint(idx)}
                      onPointerLeave={() => setHint(null)}
                    >
                      <label className="y4-head" htmlFor={rid}>
                        {/* aria-label AÇIKÇA yazılıyor. Girdi zaten <label>'ın
                            içinde, yani adı içerikten hesaplanmalı; ama bu
                            depoda bir bulgu var (görsel-gizli metin bir kez
                            ağaçta hiç görünmedi, aria-label çözdü) ve
                            erişilebilirlik ağacını okurken radyoların adı
                            görünmedi. Açık ad hem hesaplamaya bağımlılığı
                            kaldırıyor hem de görünen metnin ikisini de
                            (koşul + yapı adı) aynı sırada taşıyor, yani
                            "görünen ad, erişilebilir adın içinde" kuralı
                            bozulmuyor. */}
                        <input
                          id={rid}
                          className="y4-in"
                          type="radio"
                          name={group}
                          aria-label={`${v?.when}: ${o.name}`}
                          checked={on}
                          onChange={() => setPicked(idx)}
                          onFocus={() => setHint(idx)}
                          onBlur={() => setHint(null)}
                        />
                        <span className="y4-face">
                          <span className="y4-ic">
                            {v ? <v.Icon size={21} strokeWidth={2.1} aria-hidden="true" /> : null}
                          </span>
                          <span className="y4-when">{v?.when}</span>
                          <span className="y4-name">{o.name}</span>
                          {/* Seçili işareti yalnız renk değil bir GLİF: rengi
                              ayırt edemeyen için de bir işaret kalsın. */}
                          <span className="y4-mark" aria-hidden="true">
                            <Check size={13} strokeWidth={3.4} />
                          </span>
                        </span>
                      </label>

                      <p className="y4-line">{o.line}</p>

                      {/* Açılan liste. Yükseklik geçişi saf CSS
                          (grid-template-rows 0fr → 1fr); motion yok, yani
                          reduce altında da anında ve hatasız. Kapalıyken
                          visibility:hidden — içerik erişilebilirlik ağacından
                          da çıkıyor, yoksa ekran okuyucu görünmeyen listeyi
                          okurdu. */}
                      <div className="y4-det">
                        <div className="y4-det-in">
                          <p className="y4-fit-k">Bunu yapıyorsanız</p>
                          <ul className="y4-fit">
                            {o.fit.map((f) => (
                              <li key={f}>
                                <Check size={12} strokeWidth={3.4} aria-hidden="true" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Uyarı kapalıyken de duruyor: bir yapının bedelini
                          görmek için tıklamak gerekmemeli. Sakin bir satır,
                          pano gibi bağıran bir kutu değil; metin nötr renkte
                          (4.5:1), yalnız glif amber. */}
                      <p className="y4-watch">
                        <TriangleAlert size={14} strokeWidth={2.3} aria-hidden="true" />
                        <span>
                          <b>Dikkat:</b> {o.watch}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
