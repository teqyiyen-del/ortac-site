"use client";

import { useState } from "react";
import { ArrowRight, Check, Minus } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { configure, TIER_META, TIER_PRICE, type ConfigLine } from "@/lib/pricing";
import { ACTIVITY_LABELS, type Country, type Tier, type Activity } from "@/lib/store";
import {
  DF_ACTIVITIES,
  DF_ADDON_LABEL,
  DF_TIERS,
  dfAddonPrice,
  dfIncluded,
  dfMoney,
  useDfCount,
  useDfDelta,
} from "./fiyatDf";

/* ===========================================================================
   DF1 · "TUTAR YUKARIDA DURUR" — tek sütun, yapışkan tutar çubuğu, aydınlık.

   TURUN DÖRT SORUSUNA BU ADAYIN CEVABI
   1) Tutar nerede: EN ÜSTTE ve ekrandan çıkmıyor. Sağ panel değil, bölümün
      kendi başlığının altına yapışan bir çubuk. Sebep ölçülebilir: canlıdaki
      sağ panel 960px'in altında ızgaranın İKİNCİ satırına düşüyor, yani telefonda
      ziyaretçi bütün seçimleri sayı ekranda yokken yapıyor, sonuna gelince
      görüyor. Çubukta tutar her genişlikte aynı yerde — 320px'te de 1440'ta da
      seçimlerin üstünde.
   2) Ne kaybettiğini görüyor mu: EVET, iki ayrı yerde. (a) Tutar her
      değiştiğinde çubuktan bir fark pulu çıkıyor: +$600 / −$600. (b) Aşağıdaki
      dökümde "Eklemediğiniz kalemler" listesi duruyor — seçilmemiş her kalem
      fiyatıyla birlikte ekranda kalıyor, gizlenmiyor. Canlı sürümde seçilmeyen
      kalem satır listesinden tamamen düşüyor ve fiyatı hiç görünmüyor.
   3) Paketler arası fark görünüyor mu: EVET. Üç kartın her birinde aynı üç
      satır var (banka · vize · muhasebe) ve tik/tire deseni kartlar arasında
      değişiyor. Ad ve fiyat değil, DESEN kıyaslanıyor.
   4) Zemin: AYDINLIK (--paper). Bu bir renk tercihi değil, ritim düzeltmesi:
      canlı ülke sayfasında fiyat bölümünün hemen ÜSTÜNDEKİ MoneyHome de
      `sec-night`, yani bugün sayfada arka arkaya iki gece bloğu var. Tutar yine
      siyah zeminde okunuyor ama siyah artık bölüm değil, çubuk.

   VAZGEÇİLEN: sağ paneldeki "büyük sayı + döküm" bütünlüğü. Burada sayı
   yukarıda, döküm aşağıda; ikisi aynı bakışta değil. Karşılığında sayı hiç
   kaybolmuyor. Ayrıca yapışkan çubuk, ziyaretçi bölümü geçtikten sonra da
   ekranda kalmasın diye bölüm kabına bağlı (position:sticky), sayfa geneline
   sabitlenmiş bir bar değil.
   ======================================================================== */

export default function FiyatDF1({ country, name }: { country: Country; name: string }) {
  const [tier, setTier] = useState<Tier>("gold");
  const [activity, setActivity] = useState<Activity>("e-ticaret");
  const [visas, setVisas] = useState(0);
  const [bank, setBank] = useState(true);
  const [accounting, setAccounting] = useState(false);

  const r = configure({ country, tier, activity, visas, bank, accounting });
  const hasVisa = r.perVisa > 0;
  const shown = useDfCount(r.total);
  const { delta, seq } = useDfDelta(r.total);

  /* Seçilmemiş kalemler: pakete dahil DEĞİL ve ziyaretçi de eklememiş.
     configure() bunları hiç döndürmüyor (yalnızca faturalanacak satırları
     veriyor), o yüzden liste burada kuruluyor. */
  const off: { label: string; amount: number; suffix?: string }[] = [];
  if (!bank && !r.includes.bank)
    off.push({ label: DF_ADDON_LABEL.bank, amount: dfAddonPrice(country, "bank") });
  if (hasVisa && visas === 0 && r.includes.visas === 0)
    off.push({ label: DF_ADDON_LABEL.visa, amount: dfAddonPrice(country, "visa"), suffix: "/ kişi" });
  if (!accounting && !r.includes.accounting)
    off.push({ label: DF_ADDON_LABEL.accounting, amount: dfAddonPrice(country, "accounting") });

  return (
    <section className="sec-pad df1-sec" aria-labelledby="df1-h">
      <div className="container-o">
        <div className="sec-head">
          <h2 className="h2 df1-h" id="df1-h">
            Kurulumunuzu seçin, fiyat anında çıksın.
          </h2>
          <p className="sec-lead">
            {name} için paket ve ek hizmetleri seçin; tutar yukarıdaki çubukta durur, kalem
            dökümü en altta oluşur.
          </p>
        </div>

        {/* ---- yapışkan tutar çubuğu ----
            aria-live="polite": sayı sessizce değişmesin. Ekran okuyucu için
            asıl bilgi tutarın kendisi, o yüzden canlı alan yalnızca sayıyı ve
            birimini kapsıyor; fark pulu aria-hidden çünkü aynı bilgiyi ikinci
            kez okutmanın faydası yok. */}
        <div className="df1-bar">
          <span className="df1-sweep" aria-hidden="true" />
          <div className="df1-bar-in">
            <p className="df1-bar-l" aria-live="polite">
              <span className="df1-bar-k">Tahmini kurulum tutarı</span>
              <span className="df1-bar-n">{dfMoney(shown)}</span>
              <span className="df1-bar-u">
                tek seferlik · {r.duration} · yıllık gider {dfMoney(r.annual)}
              </span>
            </p>
            <div className="df1-bar-r">
              {/* key={seq}: düğüm yenilenince CSS animasyonu baştan oynuyor.
                  delta === 0 iken (ilk render) hiç basılmıyor. */}
              {delta !== 0 && (
                <span
                  className="df1-delta"
                  key={seq}
                  data-sign={delta > 0 ? "up" : "down"}
                  aria-hidden="true"
                >
                  {delta > 0 ? "+" : "−"}
                  {dfMoney(Math.abs(delta))}
                </span>
              )}
              <SmartLink href={`/basla?ulke=${country}&paket=${tier}`} className="df1-cta">
                Bu kurulumla başlayın
                <ArrowRight size={15} strokeWidth={2.1} />
              </SmartLink>
            </div>
          </div>
        </div>

        {/* ---- seçimler: tek sütun, numaralı satırlar ---- */}
        <div className="df1-rows">
          <div className="df1-row">
            <div className="df1-row-h">
              <span className="df1-no" aria-hidden="true">
                1
              </span>
              <h3 className="df1-row-t">Paket</h3>
            </div>
            <div className="df1-tiers" role="group" aria-label="Paket seçimi">
              {DF_TIERS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="df1-tier"
                  data-on={tier === t}
                  aria-pressed={tier === t}
                  onClick={() => setTier(t)}
                >
                  <span className="df1-tier-n">{TIER_META[t].name}</span>
                  <span className="df1-tier-p">{dfMoney(TIER_PRICE[country][t])}</span>
                  {/* PAKET FARKI EKRANDA: üç kartta da aynı üç satır var, değişen
                      tik deseni. Rozet YOK — hangi paketin çok seçildiği
                      doğrulanmış bilgi değil (bkz. CountryPricing · TIER_BADGE). */}
                  <span className="df1-tier-f">
                    {(["bank", "visa", "accounting"] as const)
                      .filter((a) => a !== "visa" || hasVisa)
                      .map((a) => {
                        const on = dfIncluded(t, a);
                        return (
                          <span key={a} className="df1-feat" data-on={on}>
                            {on ? (
                              <Check size={13} strokeWidth={3} aria-hidden="true" />
                            ) : (
                              <Minus size={13} strokeWidth={3} aria-hidden="true" />
                            )}
                            {a === "visa" ? "Vize (1 kişi)" : DF_ADDON_LABEL[a]}
                            <b className="df1-feat-s">{on ? "dahil" : "dahil değil"}</b>
                          </span>
                        );
                      })}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="df1-row">
            <div className="df1-row-h">
              <span className="df1-no" aria-hidden="true">
                2
              </span>
              <h3 className="df1-row-t">Faaliyet alanı</h3>
            </div>
            <div className="df1-chips" role="group" aria-label="Faaliyet alanı">
              {DF_ACTIVITIES.map((a) => (
                <button
                  key={a}
                  type="button"
                  className="df1-chip"
                  data-on={activity === a}
                  aria-pressed={activity === a}
                  onClick={() => setActivity(a)}
                >
                  {ACTIVITY_LABELS[a]}
                </button>
              ))}
            </div>
            <p className="df1-hint">
              Lisans sınıfı faaliyete göre değişir; bazı alanlarda ek onay gerekir.
            </p>
          </div>

          <div className="df1-row">
            <div className="df1-row-h">
              <span className="df1-no" aria-hidden="true">
                3
              </span>
              <h3 className="df1-row-t">Ek hizmetler</h3>
            </div>
            {/* Her kalemin FİYATI KARARIN YANINDA. Canlı sürümde ek hizmet
                anahtarının yanında rakam yok; kaç para olduğunu ancak açıp sağ
                paneldeki satırı görünce anlıyorsunuz. */}
            <div className="df1-adds">
              {hasVisa && (
                <div className="df1-add" data-on={visas > 0 || r.includes.visas > 0}>
                  <span className="df1-add-t">
                    Vize
                    <b className="df1-add-p">
                      {dfMoney(dfAddonPrice(country, "visa"))} / kişi
                      {r.includes.visas > 0 && ` · ${r.includes.visas} kişi pakete dahil`}
                    </b>
                  </span>
                  <span className="df1-step">
                    <button
                      type="button"
                      aria-label="Vize sayısını azalt"
                      disabled={visas <= 0}
                      onClick={() => setVisas(visas - 1)}
                    >
                      −
                    </button>
                    <span className="df1-step-v">{visas}</span>
                    <button
                      type="button"
                      aria-label="Vize sayısını artır"
                      disabled={visas >= 4}
                      onClick={() => setVisas(visas + 1)}
                    >
                      +
                    </button>
                  </span>
                </div>
              )}

              {(
                [
                  { k: "bank" as const, on: bank, set: setBank, inc: r.includes.bank },
                  {
                    k: "accounting" as const,
                    on: accounting,
                    set: setAccounting,
                    inc: r.includes.accounting,
                  },
                ]
              ).map((s) => (
                <div key={s.k} className="df1-add" data-on={s.on || s.inc}>
                  <span className="df1-add-t">
                    {DF_ADDON_LABEL[s.k]}
                    <b className="df1-add-p">
                      {s.inc
                        ? `${dfMoney(dfAddonPrice(country, s.k))} · pakete dahil`
                        : `+${dfMoney(dfAddonPrice(country, s.k))}`}
                    </b>
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={s.on || s.inc}
                    aria-label={DF_ADDON_LABEL[s.k]}
                    className="df1-sw"
                    data-on={s.on || s.inc}
                    disabled={s.inc}
                    onClick={() => s.set(!s.on)}
                  >
                    <span className="df1-sw-k" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- döküm ---- */}
        <div className="df1-sheet">
          <h3 className="df1-sheet-t">Tutar nasıl oluştu</h3>
          <ul className="df1-lines">
            {r.lines.map((l: ConfigLine) => (
              <li key={l.label} className="df1-line" data-base={l.base || undefined}>
                <span>{l.label}</span>
                <span className="df1-line-a">
                  {l.base ? dfMoney(l.amount) : `+${dfMoney(l.amount)}`}
                </span>
              </li>
            ))}
            <li className="df1-line df1-line-sum">
              <span>Toplam</span>
              <span className="df1-line-a">{dfMoney(r.total)}</span>
            </li>
          </ul>

          {/* NE KAYBETTİĞİNİ GÖRMEK — seçilmeyen kalem listeden düşmüyor,
              fiyatıyla birlikte burada duruyor. */}
          {off.length > 0 && (
            <div className="df1-off">
              <h4 className="df1-off-t">Eklemediğiniz kalemler</h4>
              <ul className="df1-off-l">
                {off.map((o) => (
                  <li key={o.label}>
                    <span>{o.label}</span>
                    <span className="df1-off-a">
                      +{dfMoney(o.amount)} {o.suffix}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="df1-meta">
            <span>
              Yapı<b>{r.license}</b>
            </span>
            <span>
              Süre<b>{r.duration}</b>
            </span>
            <span>
              Yıllık gider<b>{dfMoney(r.annual)}</b>
            </span>
          </p>
          <p className="df1-note">
            Tutarlar temsilidir; nihai teklif faaliyet ve belgelere göre netleşir.
          </p>
        </div>
      </div>
    </section>
  );
}
