"use client";

import { useId, useState } from "react";
import { Check, Globe, Store, TriangleAlert } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import YapiScene, { type YapiState } from "@/components/lab/StructuresYapiScene";
import type { CountryContent } from "@/lib/countryContent";

/* ADAY Y5 (.y5-) — "BOŞTA DURUYOR AMA DURMUYOR"
 *
 * ---------------------------------------------------------------------------
 * BOŞTAKİ PASİFLİĞE CEVABI: NÖBET
 *
 * Müşterinin iki önerisinden ötekisi: "ya üzerlerinde değilken bile ikisini az
 * gösteren şekilde dinamik dursun."
 *
 * Bu aday onu birebir kuruyor. Hiçbir şey seçili değilken bölüm kendi kendine
 * iki yapıyı SIRAYLA ve KISIK sesle gösteriyor: 13.9 saniyelik bir turun ilk
 * yarısında şirketin çiti hafifçe doluyor, dışarı giden yol maviye dönüyor,
 * bir sevkiyat kıyıyı geçip denizdeki müşteriye varıyor ve sağdaki serbest
 * bölge kartının kenarı aynı anda hafifçe yanıyor. İkinci yarısında aynı şey
 * mainland için oluyor: kara doluyor, satış sınırın içinde kalıyor, alttaki
 * kart yanıyor. Sonra baştan.
 *
 * KISIK OLMASI TASARIMIN KENDİSİ. Nöbet sırasındaki mavi, seçili hâlin mavisi
 * değil: yollar ince ve kesik kalıyor, dolgular blue-100'ün de altında bir
 * tonda. Yani ekranda "bir şey seçilmiş" izlenimi doğmuyor, "burada iki şey
 * var ve ikisi de canlı" izlenimi doğuyor. Seçim yapıldığı anda ya da fare
 * kartlara değdiği anda nöbet TAMAMEN duruyor ve harita tek bir yapıya, tam
 * mavisiyle kilitleniyor. Yani hareket ziyaretçiyi karşılıyor, sonra çekiliyor.
 *
 * FEDA EDİLEN ŞEY. Boşta ekranda sürekli bir değişim var; sayfayı okurken göz
 * ucuyla yakalanan bu hareket bazı ziyaretçiler için gürültü. Ayrıca "harita
 * kendi kendine dönüyor" hissi, ziyaretçinin bir süre BEKLEYİP izlemesine yol
 * açabiliyor: seçim yapması gerektiğini anlaması Y4'e göre bir tık geç oluyor.
 *
 * ---------------------------------------------------------------------------
 * KARTLAR NE KADAR BÜYÜDÜ
 *
 * Izgara oranı S3'ün tersi: harita 0.82fr, kartlar 1fr. Kart tek satırlık bir
 * düğme olmaktan çıktı; ikon karosu 30px'ten 44px'e, yapının adı 17px'ten
 * 20px'e çıktı ve verinin `line` cümlesi ile `watch` uyarısı kapalıyken de
 * kartın içinde duruyor. `fit` listesi seçilince açılıyor.
 *
 * İki kart boştayken EŞİT yükseklikte, çünkü bu adayın iddiası eşitlik: hiçbir
 * yapı ötekinden önce gelmiyor, ikisi de sırayla kendini gösteriyor.
 *
 * ---------------------------------------------------------------------------
 * ERİŞİLEBİLİRLİK
 *
 * Kart başlıkları gerçek <input type="radio">; rol, "checked" durumu ve ok
 * tuşlarıyla geçiş tarayıcıdan geliyor. Bu depoda taklit durum (rolü olmayan
 * <span aria-current>) ağaçta adsız kalmıştı, o yüzden taklit yok.
 *
 * Açılışta HİÇBİR radyo seçili değil. Bu bilinçli: seçili gelseydi bu aday
 * Y4'e dönerdi. Seçilmemiş bir radyo grubunda Tab ilk radyoya giriyor, ok
 * tuşları seçiyor — standart davranış.
 *
 * ---------------------------------------------------------------------------
 * İDDİA SINIRI
 * Bütün metin countryContent.structures'tan. Üretilen tek şey kuralın iki
 * dalının etiketi ve açılan listenin başlığı; ikisi de canlı bölümün dili.
 */

const VIEWS = [
  { key: "free", when: "BAE dışına satıyorsanız", Icon: Globe },
  { key: "main", when: "BAE içine satıyorsanız", Icon: Store },
] as const;

/* Şemanın sözlü karşılığı. Nöbet bir animasyon; metin animasyonu değil DURUMU
   anlatıyor, çünkü reduce açıkken nöbet hiç çalışmıyor ve aynı metin o hâlde
   de doğru olmak zorunda. */
const ALT: Record<YapiState, string> = {
  none: "Şematik harita: henüz bir yapı seçilmedi. Ülkenin içinde çitli serbest bölge parselleri, dışarıda ve içeride birer müşteri duruyor. Bir yapı seçildiğinde harita o yapıya göre değişiyor.",
  free: "Şematik harita: serbest bölge seçili. Şirket ülkenin içindeki çitli bir alanda; satış kıyıyı geçip BAE dışındaki müşteriye gidiyor.",
  main: "Şematik harita: mainland seçili. Şirket ülkenin genelinde; satış sınırın içinde kalıp BAE içindeki müşteriye gidiyor.",
};

export default function StructuresS5({
  data,
}: {
  data: NonNullable<CountryContent["structures"]>;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [hint, setHint] = useState<number | null>(null);
  const shown = hint ?? picked;

  const uid = `y5${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const group = `${uid}-yapi`;

  const state: YapiState = shown === null ? "none" : VIEWS[shown]?.key ?? "none";
  const name = shown === null ? null : data.options[shown]?.name ?? null;

  return (
    /* data-state bölümün kökünde de duruyor: nöbet yalnız haritayı değil
       sağdaki kartları da kapsıyor, ve kartların CSS'i "boşta mıyız"
       sorusunu buradan okuyor. */
    <section className="sec-pad y5-sec" data-state={state} style={{ background: "var(--white)" }}>
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

        <div className="y5-grid">
          <FadeUp delay={0.26}>
            <figure className="y5-fig">
              <div className="yhm-map y5-map" data-state={state}>
                <YapiScene state={state} name={name} alt={ALT[state]} />
              </div>
              <figcaption className="yhm-cap">
                Şematik gösterim; ölçekli harita değildir.
              </figcaption>
            </figure>
          </FadeUp>

          <FadeUp delay={0.32}>
            <div className="y5-side">
              <p className="y5-rule">
                <span className="y5-rule-k">Karar kuralı</span>
                <span className="y5-rule-t">{data.rule}</span>
              </p>

              <div className="y5-cards" role="radiogroup" aria-label="Yapı seçimi">
                {data.options.map((o, idx) => {
                  const v = VIEWS[idx];
                  const on = picked === idx;
                  const rid = `${uid}-r${idx}`;
                  return (
                    /* data-i nöbetin sırasını veriyor: 0 turun ilk yarısında,
                       1 ikinci yarısında yanıyor. CSS negatif gecikmeyle aynı
                       keyframe'i yarım tur kaydırıyor. */
                    <div
                      key={o.name}
                      className="y5-card"
                      data-i={idx}
                      data-on={on || undefined}
                      data-pre={(hint === idx && !on) || undefined}
                      onPointerEnter={() => setHint(idx)}
                      onPointerLeave={() => setHint(null)}
                    >
                      <label className="y5-head" htmlFor={rid}>
                        {/* Açık aria-label: gerekçe lab/StructuresS4.tsx'te,
                            aynı bulgu. Görünen iki metni aynı sırada taşıyor. */}
                        <input
                          id={rid}
                          className="y5-in"
                          type="radio"
                          name={group}
                          aria-label={`${v?.when}: ${o.name}`}
                          checked={on}
                          onChange={() => setPicked(idx)}
                          onFocus={() => setHint(idx)}
                          onBlur={() => setHint(null)}
                        />
                        <span className="y5-face">
                          <span className="y5-ic">
                            {v ? <v.Icon size={20} strokeWidth={2.1} aria-hidden="true" /> : null}
                          </span>
                          <span className="y5-when">{v?.when}</span>
                          <span className="y5-name">{o.name}</span>
                          <span className="y5-mark" aria-hidden="true">
                            <Check size={13} strokeWidth={3.4} />
                          </span>
                        </span>
                      </label>

                      <p className="y5-line">{o.line}</p>

                      <div className="y5-det">
                        <div className="y5-det-in">
                          <p className="y5-fit-k">Bunu yapıyorsanız</p>
                          <ul className="y5-fit">
                            {o.fit.map((f) => (
                              <li key={f}>
                                <Check size={12} strokeWidth={3.4} aria-hidden="true" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <p className="y5-watch">
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
