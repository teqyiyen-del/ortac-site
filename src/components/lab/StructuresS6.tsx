"use client";

import { useState } from "react";
import { Check, Globe, Store, TriangleAlert } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import YapiScene, { type YapiState } from "@/components/lab/StructuresYapiScene";
import type { CountryContent } from "@/lib/countryContent";

/* ADAY Y6 (.y6-) — "KAPALI HÂL DİYE BİR ŞEY YOK"
 *
 * ---------------------------------------------------------------------------
 * BOŞTAKİ PASİFLİĞE CEVABI: BOŞ HÂL EN DOLU HÂL
 *
 * Müşteri iki çözüm önerdi (biri baştan seçili gelsin, biri boşta ikisi az
 * görünsün); Y4 ve Y5 onları kuruyor. Bu üçüncü aday soruyu tersinden alıyor.
 *
 * Y4 ve Y5 dahil bugüne kadarki bütün sürümlerde ortak bir varsayım vardı:
 * boş hâl EKSİK bir hâl, seçim onu tamamlıyor. Pasiflik şikâyeti de buradan
 * çıkıyor — ekranda kapatılmış, sönük, "henüz doldurulmamış" bir şey var.
 * Burada o varsayım kaldırıldı: BOŞ HÂL SAHNENİN EN DOLU HÂLİ.
 *
 * Hiçbir şey seçili değilken harita iki yapıyı da AYNI ANDA çiziyor. Çit
 * şirketin etrafında duruyor, kara da mavi, iki yol da mavi, iki müşteri de
 * yanıyor ve iki sevkiyat aynı anda yola çıkıyor: biri kıyıyı kesip dışarı,
 * öteki sınırın içinde dükkâna. Yani boştaki sahne "iki yapı da mümkün"
 * cümlesini kuruyor, ki bölümün başlangıç durumu tam olarak budur.
 *
 * SEÇİM EKLEMİYOR, ÇIKARIYOR. Bir kart seçildiğinde o taraf tam mavisine
 * geçiyor ve ÖTEKİ TARAF sönüyor: yol kesik ve soluk kalıyor, sevkiyatı
 * duruyor. Yani etkileşim bir filtre. Ziyaretçi bir şeyi açmıyor, gereksizi
 * kapatıyor. Seçili karta tekrar basınca ikisi birden geri geliyor.
 *
 * FEDA EDİLEN ŞEY, VE BÜYÜK OLANI. Bu bölümde mavi tek bir şey demek: sizin
 * serbestçe satabildiğiniz saha. Boştaki hâlde mavi iki yerde birden olduğu
 * için o sözleşme geçici olarak esniyor; "iki yapı da mümkün" cümlesinin
 * bedeli bu. Temiz tek yapı okuması ancak bir seçimden sonra geliyor. Buna
 * karşılık boşta sönmüş tek bir piksel yok.
 *
 * ---------------------------------------------------------------------------
 * KARTLAR NE KADAR BÜYÜDÜ — ÜÇÜNÜN EN BÜYÜĞÜ
 *
 * Aynı mantık kartlara da uygulandı: kapalı kart yok. İki kartın da `fit`
 * listesi ve `watch` uyarısı sürekli açık, açılıp kapanan bir katman yok.
 * Izgara oranı harita 0.72fr, kartlar 1fr (S3'te harita 1fr, kartlar 0.74fr
 * idi). Karar kuralı sol sütuna, haritanın altına indi: kuralı söyleyen cümle
 * ile onu çizen resim yan yana değil, alt alta duruyor ve sağ sütunun tamamı
 * kartlara kalıyor.
 *
 * ---------------------------------------------------------------------------
 * ERİŞİLEBİLİRLİK — RADYO DEĞİL, İKİ AYRI ANAHTAR
 *
 * Y4 ve Y5'te kartlar radyo düğmesi, çünkü orada her zaman bir seçim var.
 * Burada üçüncü bir hâl var (ikisi birden) ve radyo grubunda seçimi geri alma
 * diye bir şey yok. O yüzden kartlar aria-pressed taşıyan düğmeler: basılı
 * durum ağaçta yayınlanıyor, Enter/Space ile açılıp kapanıyor, Tab ile
 * aralarında geziliyor. Taklit durum (rolü olmayan <span aria-current>) bu
 * depoda ağaçta adsız kalmıştı; burada durum düğmenin kendi özelliği.
 *
 * ---------------------------------------------------------------------------
 * İDDİA SINIRI
 * Bütün metin countryContent.structures'tan. Üretilen tek şey kuralın iki
 * dalının etiketi ve liste başlığı; ikisi de canlı bölümün dili.
 */

const VIEWS = [
  { key: "free", when: "BAE dışına satıyorsanız", Icon: Globe },
  { key: "main", when: "BAE içine satıyorsanız", Icon: Store },
] as const;

const ALT: Record<YapiState, string> = {
  none: "Şematik harita: iki yapı da çizili. Şirketten çıkan iki satış yolu var; biri kıyıyı geçip BAE dışındaki müşteriye, öteki sınırın içinde kalıp BAE içindeki müşteriye gidiyor. Bir kart seçilince harita yalnız o yapıyı gösteriyor.",
  free: "Şematik harita: yalnız serbest bölge gösteriliyor. Şirket ülkenin içindeki çitli bir alanda; satış kıyıyı geçip BAE dışındaki müşteriye gidiyor, iç pazara giden yol sönük.",
  main: "Şematik harita: yalnız mainland gösteriliyor. Şirket ülkenin genelinde; satış sınırın içinde kalıp BAE içindeki müşteriye gidiyor, dışarı giden yol sönük.",
};

export default function StructuresS6({
  data,
}: {
  data: NonNullable<CountryContent["structures"]>;
}) {
  /* null = ikisi birden. Bu adayda null bir eksiklik değil, üçüncü ve
     varsayılan hâl. */
  const [picked, setPicked] = useState<number | null>(null);
  const [hint, setHint] = useState<number | null>(null);
  const shown = hint ?? picked;

  const state: YapiState = shown === null ? "none" : VIEWS[shown]?.key ?? "none";
  const name = shown === null ? null : data.options[shown]?.name ?? null;

  return (
    <section className="sec-pad y6-sec" data-state={state} style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
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

        <div className="y6-grid">
          <FadeUp delay={0.26}>
            <div className="y6-left">
              <figure className="y6-fig">
                <div className="yhm-map y6-map" data-state={state}>
                  <YapiScene state={state} name={name} alt={ALT[state]} />
                </div>
                <figcaption className="yhm-cap">
                  Şematik gösterim; ölçekli harita değildir.
                </figcaption>
              </figure>

              {/* Kural haritanın altında: cümle ile onu çizen resim alt alta.
                  Sağ sütunun tamamı kartlara kalıyor. */}
              <p className="y6-rule">
                <span className="y6-rule-k">Karar kuralı</span>
                <span className="y6-rule-t">{data.rule}</span>
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.32}>
            <div className="y6-cards">
              {data.options.map((o, idx) => {
                const v = VIEWS[idx];
                const on = picked === idx;
                return (
                  <div
                    key={o.name}
                    className="y6-card"
                    data-i={idx}
                    data-on={on || undefined}
                    data-pre={(hint === idx && !on) || undefined}
                    onPointerEnter={() => setHint(idx)}
                    onPointerLeave={() => setHint(null)}
                  >
                    {/* aria-pressed: basılı durum ağaçta yayınlanıyor ve geri
                        alınabiliyor. Radyo grubu bunu yapamazdı — bu adayda
                        "hiçbiri" geçerli ve varsayılan bir hâl. */}
                    {/* aria-label açıkça yazılıyor (gerekçe
                        lab/StructuresS4.tsx'te): düğmenin adı içerikten
                        hesaplanmaya bırakılmıyor. Görünen iki metni aynı
                        sırada taşıyor. */}
                    <button
                      type="button"
                      className="y6-head"
                      aria-label={`${v?.when}: ${o.name}`}
                      aria-pressed={on}
                      onClick={() => setPicked(on ? null : idx)}
                      onFocus={() => setHint(idx)}
                      onBlur={() => setHint(null)}
                    >
                      <span className="y6-ic">
                        {v ? <v.Icon size={21} strokeWidth={2.1} aria-hidden="true" /> : null}
                      </span>
                      <span className="y6-when">{v?.when}</span>
                      <span className="y6-name">{o.name}</span>
                      <span className="y6-mark" aria-hidden="true">
                        <Check size={13} strokeWidth={3.4} />
                      </span>
                    </button>

                    <p className="y6-line">{o.line}</p>

                    {/* Liste hep açık: bu adayın tek fikri kapalı hâlin
                        kaldırılması. Açılıp kapanan katman yok, o yüzden
                        yükseklik geçişi de yok. */}
                    <p className="y6-fit-k">Bunu yapıyorsanız</p>
                    <ul className="y6-fit">
                      {o.fit.map((f) => (
                        <li key={f}>
                          <Check size={12} strokeWidth={3.4} aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <p className="y6-watch">
                      <TriangleAlert size={14} strokeWidth={2.3} aria-hidden="true" />
                      <span>
                        <b>Dikkat:</b> {o.watch}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
