"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { configure, TIER_META, TIER_PRICE } from "@/lib/pricing";
import { ACTIVITY_LABELS, type Activity, type Country, type Tier } from "@/lib/store";
import {
  DF_ACTIVITIES,
  DF_ADDON_LABEL,
  DF_TIERS,
  dfAddonPrice,
  dfIncluded,
  dfMoney,
  useDfCount,
} from "./fiyatDf";

/* ===========================================================================
   DF3 · "TUTAR BİR ŞERİT" — fiyat yazılmıyor, ÇİZİLİYOR. Aydınlık mavi.

   TURUN DÖRT SORUSUNA BU ADAYIN CEVABI
   1) Tutar nerede: SEÇİMİN HEMEN ALTINDA, akışın içinde — sabit panel yok,
      yapışkan çubuk yok. Ama tutar tek bir rakam değil: yığılmış bir şerit.
      Şeritteki her dilim bir kalem ve genişliği tutarıyla orantılı. Ziyaretçi
      "paket 5.400, ekler 600" cümlesini okumadan önce paketin şeridin dokuz
      onunu kapladığını görüyor.
   2) Ne kaybettiğini görüyor mu: EVET, ŞERİDİN ÜZERİNDE. Eklemediği kalemler
      şeritten silinmiyor, kesikli HAYALET dilim olarak sonuna ekleniyor —
      yani "bugünkü tutar" ile "hepsini alsam" arasındaki mesafe fiziksel bir
      uzunluk. Dilimler tıklanabilir: dolu bir dilime basınca kalem çıkıyor ve
      dilim yerinde hayalete dönüşüyor. Kaybın kendisi bir animasyon.
   3) Paketler arası fark görünüyor mu: EVET, YUTMA HAREKETİYLE. Paket
      değişince taban dilim genişliyor ve o paketin kapsadığı ek hizmet dilimleri
      şeritten kayboluyor — çünkü artık tabanın içindeler. Şeridin altındaki
      cümle bunu yazıyla da söylüyor: "Gold paketi banka hesabını ve 1 vizeyi
      kendi içine aldı."
   4) Zemin: AÇIK MAVİ (--blue-100). Müşteri iki tur önce "mavi üzerine bir yapı"
      istemişti, geçen tur DENENEN KOYU MAVİ geri alındı. Bu aday maviyi
      bırakmıyor ama yönünü çeviriyor: koyu değil açık. İki kazancı var —
      (a) sayfa ritmi: üstteki MoneyHome zaten `sec-night`, koyu mavi yine
      arka arkaya iki koyu blok demek olurdu;
      (b) kontrast: aşağıdaki nota bakın.

   MARKA MAVİSİ KISITI (#307fe2 üzerine beyaz 3,99:1, normal punto eşiği 4,5)
   BU ADAYDA NASIL ÇÖZÜLDÜ — üç kural:
     · #307fe2 hiçbir yerde METİN RENGİ değil. Yalnızca grafik dolgusu olarak
       geçiyor (şerit dilimi, hayalet kenarı, seçili çerçeve). Grafik eşiği 3:1
       ve ölçümler geçiyor: #307fe2 / beyaz kart = 3,99 · #307fe2 / #e8f1fd
       bölüm zemini = 3,50.
     · #307fe2 dolgusunun ÜZERİNE beyaz yazı hiç konmadı. Taban dilimin içindeki
       tek yazı SİYAH (--night #080808): #080808 / #307fe2 = 5,02 — normal punto
       eşiğini de geçiyor. Beyaz yerine siyah seçmenin sebebi tam olarak bu 4,5
       eşiği; mavi zeminde beyaz yazmak isteseydim maviyi #1b56a8'e kadar
       koyultmam gerekirdi ve o zaman renk marka mavisi olmaktan çıkardı.
     · Metnin tamamı açık zemin üstünde koyu: #080808 / #e8f1fd = 17,58 ·
       --text-600 / #e8f1fd = 5,87. Şeridin ikincil dilimleri #1b56a8 (7,14) ve
       #2468c4 (5,45) — üçü de beyaz kart üstünde 3:1 grafik eşiğinin üstünde,
       yani dilim sınırları aradaki 2px beyaz boşlukla birlikte ayırt ediliyor.

   VAZGEÇİLEN: kalem dökümünün satır satır okunabilirliği. Şerit oranı iyi
   anlatıyor ama küçük kalemler dar dilime düşüyor; o yüzden şeridin altındaki
   künye listesi ZORUNLU, süs değil — dilimin karşılığı orada yazıyor.
   ======================================================================== */

type Seg = {
  k: string;
  label: string;
  amount: number;
  kind: "base" | "add";
  ghost?: boolean;
  addon?: "bank" | "visa" | "accounting";
};

export default function FiyatDF3({ country, name }: { country: Country; name: string }) {
  const [tier, setTier] = useState<Tier>("gold");
  const [activity, setActivity] = useState<Activity>("e-ticaret");
  const [visas, setVisas] = useState(0);
  const [bank, setBank] = useState(true);
  const [accounting, setAccounting] = useState(false);

  const r = configure({ country, tier, activity, visas, bank, accounting });
  const hasVisa = r.perVisa > 0;
  const shown = useDfCount(r.total);

  /* --- şeridin dilimleri --------------------------------------------------
     Dolu dilimler configure()'un döktüğü satırlar; hayaletler ise seçilmemiş
     ve pakete de dahil olmayan kalemler. İkisi aynı diziye giriyor ki genişlik
     hesabı tek bir toplam üzerinden yapılsın. */
  const solid: Seg[] = r.lines.map((l, i) => ({
    k: l.label,
    label: l.label,
    amount: l.amount,
    kind: i === 0 ? "base" : "add",
  }));

  const ghosts: Seg[] = [];
  if (!bank && !r.includes.bank)
    ghosts.push({
      k: "g-bank",
      label: DF_ADDON_LABEL.bank,
      amount: dfAddonPrice(country, "bank"),
      kind: "add",
      ghost: true,
      addon: "bank",
    });
  /* VİZE HAYALETİNİN KOŞULU `visas === 0` DEĞİL `visas >= includes.visas`.
     İlk yazımda `visas === 0` vardı ve YANLIŞ SAYI BASIYORDU: Gold bir vizeyi
     zaten kapsıyor, yani visas 0 iken bir vize eklemenin bedeli 0. Ekranda ise
     "+$750" yazan bir hayalet duruyordu. Doğru kural, bir sonraki vizenin
     faturalanıp faturalanmadığı; pricing.ts'teki extraVisas = max(0, visas -
     inc.visas) hesabının aynısı. */
  if (hasVisa && visas >= r.includes.visas)
    ghosts.push({
      k: "g-visa",
      label: r.includes.visas > 0 ? "Ek vize (1 kişi)" : "Vize (1 kişi)",
      amount: dfAddonPrice(country, "visa"),
      kind: "add",
      ghost: true,
      addon: "visa",
    });
  if (!accounting && !r.includes.accounting)
    ghosts.push({
      k: "g-acc",
      label: DF_ADDON_LABEL.accounting,
      amount: dfAddonPrice(country, "accounting"),
      kind: "add",
      ghost: true,
      addon: "accounting",
    });

  const segs = [...solid, ...ghosts];
  const grand = segs.reduce((a, s) => a + s.amount, 0);
  const pct = (n: number) => `${((n / grand) * 100).toFixed(3)}%`;

  /* Taban dilimin içine yazı ancak yeterince genişse basılıyor. Eşik render
     sırasında saf veriden hesaplanıyor (ölçüm değil), yani sunucu ve istemci
     aynı sonucu üretiyor — hidratasyon farkı yok. */
  const baseWide = solid[0].amount / grand >= 0.38;

  /* Paketin YUTTUĞU kalemler: ek hizmet olarak ayrı ücretlendirilmeyenler.
     Bu cümle paket farkını yazıyla da söylüyor. */
  const swallowed = (["bank", "visa", "accounting"] as const)
    .filter((a) => (a !== "visa" || hasVisa) && dfIncluded(tier, a))
    .map((a) => (a === "visa" ? `${r.includes.visas} vize` : DF_ADDON_LABEL[a].toLocaleLowerCase("tr-TR")));

  const toggle = (a: "bank" | "visa" | "accounting") => {
    if (a === "bank") setBank((v) => !v);
    else if (a === "accounting") setAccounting((v) => !v);
    else setVisas((v) => v + 1);
  };

  return (
    <section className="sec-pad df3-sec" aria-labelledby="df3-h">
      <div className="container-o">
        <div className="sec-head">
          <h2 className="h2 df3-h" id="df3-h">
            Kurulumunuzu seçin, tutar gözünüzün önünde oluşsun.
          </h2>
          <p className="sec-lead df3-lead">
            {name} için paket ve ek hizmetleri seçin; her kalem şeritte kendi payı kadar yer
            kaplar, almadıklarınız kesikli durur.
          </p>
        </div>

        <div className="df3-card">
          {/* ---- seçimler ---- */}
          <div className="df3-ctrl">
            <div className="df3-seg" role="group" aria-label="Paket seçimi">
              {DF_TIERS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="df3-segb"
                  data-on={tier === t}
                  aria-pressed={tier === t}
                  onClick={() => setTier(t)}
                >
                  <span className="df3-segb-n">{TIER_META[t].name}</span>
                  <span className="df3-segb-p">{dfMoney(TIER_PRICE[country][t])}</span>
                </button>
              ))}
            </div>

            <div className="df3-ctrl-b">
              <div className="df3-cf">
                <span className="df3-k">Faaliyet alanı</span>
                <div className="df3-chips" role="group" aria-label="Faaliyet alanı">
                  {DF_ACTIVITIES.map((a: Activity) => (
                    <button
                      key={a}
                      type="button"
                      className="df3-chip"
                      data-on={activity === a}
                      aria-pressed={activity === a}
                      onClick={() => setActivity(a)}
                    >
                      {ACTIVITY_LABELS[a]}
                    </button>
                  ))}
                </div>
              </div>

              {hasVisa && (
                <div className="df3-cf">
                  <span className="df3-k">Vize (kişi)</span>
                  <span className="df3-step">
                    <button
                      type="button"
                      aria-label="Vize sayısını azalt"
                      disabled={visas <= 0}
                      onClick={() => setVisas(visas - 1)}
                    >
                      −
                    </button>
                    <span className="df3-step-v">{visas}</span>
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
            </div>
          </div>

          {/* ---- tutar + şerit ---- */}
          <p className="df3-sum" aria-live="polite">
            <span className="df3-sum-k">Tahmini kurulum tutarı</span>
            <span className="df3-sum-n">{dfMoney(shown)}</span>
            <span className="df3-sum-u">tek seferlik · {r.duration}</span>
          </p>

          <div className="df3-bar">
            <span className="df3-sheen" aria-hidden="true" />
            {segs.map((s, i) => {
              const style = { "--dfw": pct(s.amount) } as CSSProperties;
              if (s.ghost)
                return (
                  <button
                    key={s.k}
                    type="button"
                    className="df3-slice df3-slice-g"
                    style={style}
                    onClick={() => toggle(s.addon!)}
                    aria-label={`${s.label} ekle, ${dfMoney(s.amount)}`}
                    title={`${s.label} · +${dfMoney(s.amount)}`}
                  />
                );
              if (s.kind === "base")
                return (
                  <span
                    key={s.k}
                    className="df3-slice df3-slice-b"
                    style={style}
                    role="img"
                    aria-label={`${s.label}, ${dfMoney(s.amount)}`}
                  >
                    {/* Mavi dolgu üzerindeki TEK yazı ve rengi SİYAH:
                        #080808 / #307fe2 = 5,02:1. Beyaz olsaydı 3,99 olurdu. */}
                    {baseWide && <span className="df3-slice-t">{dfMoney(s.amount)}</span>}
                  </span>
                );
              return (
                <button
                  key={s.k}
                  type="button"
                  className="df3-slice df3-slice-a"
                  data-i={i % 2}
                  style={style}
                  onClick={() => {
                    /* Vize dilimini kaldırmak = pakete dahil olan sayıya
                       dönmek, sıfıra değil. Sıfıra çekmek Gold'da bedava olan
                       vizeyi de silerdi ve tutar değişmediği için tıklama
                       hiçbir şey yapmamış gibi görünürdü. */
                    if (s.label.startsWith("Ek vize")) setVisas(r.includes.visas);
                    else if (s.label === DF_ADDON_LABEL.bank) setBank(false);
                    else setAccounting(false);
                  }}
                  aria-label={`${s.label} kaldır, ${dfMoney(s.amount)}`}
                  title={`${s.label} · ${dfMoney(s.amount)} · kaldırmak için tıklayın`}
                />
              );
            })}
          </div>

          <p className="df3-axis">
            <span>$0</span>
            <span>
              {ghosts.length > 0
                ? `hepsini eklerseniz ${dfMoney(grand)}`
                : "bütün kalemler eklendi"}
            </span>
          </p>

          {/* ---- künye: dilimin karşılığı ---- */}
          <ul className="df3-key">
            {solid.map((s, i) => (
              <li key={s.k} className="df3-ki" data-kind={s.kind} data-i={i % 2}>
                <span className="df3-sw" aria-hidden="true" />
                <span className="df3-ki-t">{s.label}</span>
                <span className="df3-ki-a">{dfMoney(s.amount)}</span>
              </li>
            ))}
            {ghosts.map((s) => (
              <li key={s.k} className="df3-ki df3-ki-g">
                <span className="df3-sw" aria-hidden="true" />
                <span className="df3-ki-t">{s.label}</span>
                <span className="df3-ki-a">
                  eklenmedi · +{dfMoney(s.amount)}
                  <button type="button" className="df3-add" onClick={() => toggle(s.addon!)}>
                    ekle
                  </button>
                </span>
              </li>
            ))}
          </ul>

          {swallowed.length > 0 && (
            <p className="df3-swallow">
              {TIER_META[tier].name} paketi şu kalemleri kendi içine aldı: {swallowed.join(", ")}.
              Şeritte ayrı dilim çıkmıyor, taban dilim onların payını da taşıyor.
            </p>
          )}

          <div className="df3-foot">
            <p className="df3-meta">
              <span>
                Yapı<b>{r.license}</b>
              </span>
              <span>
                Yıllık gider<b>{dfMoney(r.annual)}</b>
              </span>
            </p>
            <SmartLink href={`/basla?ulke=${country}&paket=${tier}`} className="df3-cta">
              Bu kurulumla başlayın
              <ArrowRight size={15} strokeWidth={2.1} />
            </SmartLink>
          </div>
          <p className="df3-note">
            Tutarlar temsilidir; nihai teklif faaliyet ve belgelere göre netleşir.
          </p>
        </div>
      </div>
    </section>
  );
}
