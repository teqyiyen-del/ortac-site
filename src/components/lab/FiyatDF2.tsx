"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { configure, TIER_META } from "@/lib/pricing";
import { ACTIVITY_LABELS, type Activity, type Country, type Tier } from "@/lib/store";
import {
  DF_ACTIVITIES,
  DF_ADDON_LABEL,
  DF_TIERS,
  dfAddonPrice,
  dfIncluded,
  dfMoney,
} from "./fiyatDf";

/* ===========================================================================
   DF2 · "ÜÇ TUTAR AYNI ANDA" — yapılandırıcı değil, kıyas tablosu.

   TURUN DÖRT SORUSUNA BU ADAYIN CEVABI
   1) Tutar nerede: ÜÇ TANE VAR ve üçü de sürekli ekranda. Her paketin kendi
      sütununun dibinde kendi toplamı duruyor, hepsi aynı anda güncelleniyor.
      Canlı sürümde ziyaretçi tek bir tutar görüyor; diğer iki paketin AYNI
      ihtiyaçlarla kaça geldiğini öğrenmek için paketi değiştirip sayının
      değişmesini izlemek, sonra geri dönmek zorunda. Burada kıyas hafızaya
      değil ekrana yaslanıyor.
   2) Ne kaybettiğini görüyor mu: EVET, üç kere. Bir ihtiyacı kapatınca o satır
      üç sütunda birden soluyor ve üç toplam birden düşüyor; satırdaki fiyat
      silinmiyor, soluk hâlde duruyor. Yani "bunu istemezsem her pakette ne
      kadar düşer" tek bakışta görünüyor.
   3) Paketler arası fark görünüyor mu: BÖLÜMÜN TAMAMI BU. Aynı satır üç
      sütunda üç farklı şey yazıyor: "dahil" / "+$600" / soluk "+$600". Fark
      artık paket adının yanındaki bir cümle değil, hücrenin kendisi.
      Sütun diplerinde ayrıca seçili pakete göre fark yazıyor (−$1.300 / +$2.800).
   4) Zemin: BEYAZ. Sayfa ritmi için: üstteki MoneyHome `sec-night`, bu bölüm de
      gece olursa arka arkaya iki gece bloğu oluyor (bugün canlıda olan durum).
      İkinci sebep tabloya özgü: yan yana üç sütunu ayıran şey ince çizgiler ve
      bir tek dolgu farkı; gece zeminde bu ayrımların hepsi 1,2:1 civarına
      düşüyor (canlı .ip-tier kenarının bugünkü ölçülmüş sorunu). Beyazda aynı
      iş --border ile değil, seçili sütunun tam çerçevesi + --blue-100 dolgusuyla
      çözülüyor.

   İHTİYAÇ MODELİ — CANLIDAN AYRILDIĞI YER. Canlıda "banka" bir paket ek
   hizmeti; pakete dahilse anahtar kilitleniyor. Burada "banka" ZİYARETÇİNİN
   İHTİYACI ve paketten bağımsız: bir kere işaretleniyor, sonra üç paketin o
   ihtiyaca ne dediği tabloda okunuyor. Kıyasın çalışması için şart — ihtiyaç
   pakete bağlı kalsaydı sütunlar farklı sorulara cevap veriyor olurdu.
   Basılan sayılar yine configure()'dan, paket başına bir çağrı.

   VAZGEÇİLEN: tek bir "sizin tutarınız" odağı. Üç sayı yan yana durunca göz
   hangisinin "cevap" olduğunu seçili sütunun çerçevesinden anlıyor, tipografik
   büyüklükten değil. Rozet yok, "önerilen" yok — hangi paketin çok seçildiği
   doğrulanmış bilgi değil.
   ======================================================================== */

export default function FiyatDF2({ country, name }: { country: Country; name: string }) {
  const [tier, setTier] = useState<Tier>("gold");
  const [activity, setActivity] = useState<Activity>("e-ticaret");
  const [visas, setVisas] = useState(1);
  const [needBank, setNeedBank] = useState(true);
  const [needAcc, setNeedAcc] = useState(false);

  /* Üç paket, aynı ihtiyaçlar. Tek fark tier. */
  const cols = DF_TIERS.map((t) => ({
    t,
    r: configure({ country, tier: t, activity, visas, bank: needBank, accounting: needAcc }),
  }));
  const hasVisa = cols[0].r.perVisa > 0;
  const selected = cols.find((c) => c.t === tier)!;

  /* Satır tanımı tek yerde: üç sütun da bu listeyi geziyor, yani bir satır
     eklendiğinde üç sütunda birden çıkıyor ve subgrid hizası bozulmuyor. */
  const rows = (["bank", "visa", "accounting"] as const).filter((k) => k !== "visa" || hasVisa);

  const need = (k: "bank" | "visa" | "accounting") =>
    k === "bank" ? needBank : k === "accounting" ? needAcc : visas > 0;

  return (
    <section className="sec-pad df2-sec" aria-labelledby="df2-h">
      <div className="container-o">
        <div className="sec-head">
          <h2 className="h2 df2-h" id="df2-h">
            İhtiyacınızı yazın, üç paket de fiyatını söylesin.
          </h2>
          <p className="sec-lead">
            {name} için neye ihtiyacınız olduğunu işaretleyin; üç paketin tutarı aynı anda,
            aynı ihtiyaç listesiyle oluşur.
          </p>
        </div>

        {/* ---- ihtiyaç satırı ---- */}
        <div className="df2-needs">
          <div className="df2-need">
            <span className="df2-need-k">Faaliyet alanı</span>
            <div className="df2-chips" role="group" aria-label="Faaliyet alanı">
              {DF_ACTIVITIES.map((a: Activity) => (
                <button
                  key={a}
                  type="button"
                  className="df2-chip"
                  data-on={activity === a}
                  aria-pressed={activity === a}
                  onClick={() => setActivity(a)}
                >
                  {ACTIVITY_LABELS[a]}
                </button>
              ))}
            </div>
          </div>

          <div className="df2-need df2-need-row">
            {hasVisa && (
              <div className="df2-need-c">
                <span className="df2-need-k">Vize (kişi)</span>
                <span className="df2-step">
                  <button
                    type="button"
                    aria-label="Vize sayısını azalt"
                    disabled={visas <= 0}
                    onClick={() => setVisas(visas - 1)}
                  >
                    −
                  </button>
                  <span className="df2-step-v">{visas}</span>
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
            <div className="df2-need-c">
              <span className="df2-need-k">Ayrıca gerekli</span>
              <div className="df2-sws">
                {[
                  { k: "bank" as const, on: needBank, set: setNeedBank },
                  { k: "accounting" as const, on: needAcc, set: setNeedAcc },
                ].map((s) => (
                  <button
                    key={s.k}
                    type="button"
                    role="switch"
                    aria-checked={s.on}
                    className="df2-sw"
                    data-on={s.on}
                    onClick={() => s.set(!s.on)}
                  >
                    <span className="df2-sw-t" aria-hidden="true">
                      <span className="df2-sw-k" />
                    </span>
                    {DF_ADDON_LABEL[s.k]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---- üç sütun ----
            data-visa satır sayısını CSS'e söylüyor: subgrid'in çalışması için
            dış ızgaranın satır sayısı AÇIKÇA tanımlı olmak zorunda, ve o sayı
            vize satırının basılıp basılmadığına göre 7 veya 6. Inline style
            yerine data niteliği: kural CSS dosyasında kalsın, bileşen yerleşim
            hesabı taşımasın. */}
        <div className="df2-grid" data-visa={hasVisa} role="group" aria-label="Paket kıyası">
          {cols.map(({ t, r }) => {
            const on = t === tier;
            const diff = r.total - selected.r.total;
            return (
              <div key={t} className="df2-col" data-on={on}>
                <div className="df2-cell df2-head">
                  <button
                    type="button"
                    className="df2-pick"
                    aria-pressed={on}
                    onClick={() => setTier(t)}
                  >
                    <span className="df2-pick-n">{TIER_META[t].name}</span>
                    <span className="df2-pick-i">{TIER_META[t].info}</span>
                    <span className="df2-pick-s">{on ? "Seçili" : "Bu paketi seç"}</span>
                  </button>
                </div>

                <div className="df2-cell df2-base">
                  <span className="df2-cl">Kuruluş + lisans</span>
                  <span className="df2-v">{dfMoney(r.lines[0].amount)}</span>
                </div>

                {rows.map((k) => {
                  const inc = dfIncluded(t, k);
                  const wanted = need(k);
                  /* Vizede paket 1 kişiyi kapsıyor; fazlası satırda ayrıca
                     yazıyor. Sayı configure()'un döktüğü satırdan okunuyor,
                     burada tekrar hesaplanmıyor. */
                  const billed = r.lines.find((l) =>
                    k === "bank"
                      ? l.label === DF_ADDON_LABEL.bank
                      : k === "accounting"
                        ? l.label === "Yıllık muhasebe"
                        : l.label.startsWith("Ek vize"),
                  );
                  /* DÖRT DURUM, ÜÇ DEĞİL. İlk yazımda "istenmedi" hâli tek
                     durumdu ve fiyatın üstünü çiziyordu; paketin ZATEN
                     kapsadığı bir kalemde bu "pakete dahil" yazısının üstünü
                     çizmek anlamına geliyordu, yani ekranda saçmalıyordu.
                     offinc ayrı tutuldu: istenmemiş ama paket kapsıyor —
                     üstü çizilmiyor, yalnızca soluyor. */
                  const state = !wanted ? (inc ? "offinc" : "off") : billed ? "paid" : "inc";
                  return (
                    <div key={k} className="df2-cell df2-row" data-state={state}>
                      <span className="df2-cl">
                        {k === "visa" ? `Vize (${visas} kişi)` : DF_ADDON_LABEL[k]}
                      </span>
                      <span className="df2-v">
                        {state === "inc" && (
                          <>
                            <Check size={13} strokeWidth={3} aria-hidden="true" />
                            pakete dahil
                          </>
                        )}
                        {state === "paid" && `+${dfMoney(billed!.amount)}`}
                        {state === "offinc" && "pakete dahil"}
                        {state === "off" &&
                          `+${dfMoney(dfAddonPrice(country, k))}${k === "visa" ? " / kişi" : ""}`}
                      </span>
                      {(state === "off" || state === "offinc") && (
                        <span className="df2-off">istenmedi</span>
                      )}
                    </div>
                  );
                })}

                <div className="df2-cell df2-total">
                  <span className="df2-cl">Toplam</span>
                  {/* key={r.total}: tutar değişince CSS parlaması baştan oynasın. */}
                  <span className="df2-total-n" key={r.total}>
                    {dfMoney(r.total)}
                  </span>
                  <span className="df2-diff" data-sign={diff === 0 ? "same" : diff > 0 ? "up" : "down"}>
                    {diff === 0
                      ? "seçili paket"
                      : `${diff > 0 ? "+" : "−"}${dfMoney(Math.abs(diff))} · ${TIER_META[tier].name}'e göre`}
                  </span>
                </div>

                <div className="df2-cell df2-foot">
                  <SmartLink href={`/basla?ulke=${country}&paket=${t}`} className="df2-cta">
                    {TIER_META[t].name} ile başlayın
                    <ArrowRight size={14} strokeWidth={2.1} />
                  </SmartLink>
                </div>
              </div>
            );
          })}
        </div>

        {/* ÜÇ TUTAR SESSİZCE DEĞİŞMESİN. Bu adayın bütün iddiası "üç sayı aynı
            anda güncelleniyor"; ekranı görmeyen biri için o güncellemenin hiçbir
            karşılığı yoktu (ölçüldü: bölümde tek bir canlı alan bile yoktu).
            aria-live doğrudan ızgaraya konmadı — o zaman her değişimde otuz
            küsur hücre baştan okunurdu. Tek cümlelik özet okunuyor.
            GİZLEME MUTLAK KONUMLA DEĞİL: 1x1 kutu + clip-path akışta kalıyor,
            yani kaptan kaçıp belgeyi uzatma riski yok (AGENTS.md · tuzak C). */}
        <p className="df2-sr" aria-live="polite">
          {cols.map((c) => `${TIER_META[c.t].name} ${dfMoney(c.r.total)}`).join(", ")}
        </p>
        <p className="df2-meta">
          <span className="df2-live" aria-hidden="true" />
          Üç tutar da aynı ihtiyaç listesinden hesaplanıyor · Yapı {selected.r.license} · Süre{" "}
          {selected.r.duration} · Yıllık gider {dfMoney(selected.r.annual)}
        </p>
        <p className="df2-note">
          Tutarlar temsilidir; nihai teklif faaliyet ve belgelere göre netleşir.
        </p>
      </div>
    </section>
  );
}
