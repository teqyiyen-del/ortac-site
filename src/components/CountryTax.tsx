"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  FileText,
  Info,
  Landmark,
  Receipt,
  ShieldCheck,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { STANCE_A, STANCE_Q } from "@/lib/brand";
import type { CountryContent, TaxRow } from "@/lib/countryContent";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* Brief §8 — the tax frame, and only the frame. The block has three layers:
   a representative distribution the visitor drives with their own figure, a
   small Türkiye comparison on published general rates, and the country's own
   published rows split into readable parts. None of it is advice: the figure
   the visitor types never leaves the browser, the wording says "temsilî
   gösterim" rather than "hesaplama" everywhere, and the disclaimer sits inside
   the tool so it is on screen in every state. The stance question still closes
   the block. Where a country does not publish a rate the tool never opens and
   the section says why instead of guessing.

   One thing the wording deliberately never does is print a bare zero rate.
   The bands are described by position (ilk dilim / üst dilim) rather than by
   announcing a rate of nothing, and the effective-rate line switches to a band
   sentence whenever the figure would round down to zero. A number that reads
   as "no tax" is a promise, and this section does not make promises. */

const EASE = [0.22, 1, 0.36, 1] as const;

const nf = new Intl.NumberFormat("tr-TR");
const pf = (ratio: number) =>
  (ratio * 100).toLocaleString("tr-TR", { maximumFractionDigits: 1 });

type TaxModel = {
  /** the currency the country publishes its own threshold in — never converted */
  currency: string;
  /** upper bound of the first band */
  bandLimit: number;
  /** rate applied inside the first band. Used in the arithmetic, never printed
   *  on its own: where it is zero, a lone figure would read as a promise. */
  lowerRate: number;
  /** rate applied to the part above the first band */
  upperRate: number;
};

/* ---------------------------------------------------------------------------
   SWAP: mali müşavir onayı gerekiyor.
   Bileşendeki BÜTÜN oran, eşik ve sürgü sınırları yalnızca bu sabitte durur;
   başka hiçbir satırda sayı yazmaz. Ekrandaki her etiket bu değerlerden
   türetilir, dolayısıyla güncelleme tek yerden yapılır.
   Değerler temsilî gösterim içindir, kişiye özel vergi görüşü değildir.
   `models` içine yalnızca ülkenin kendi yayımlanmış çerçevesi girilir; girilmemiş
   ülkede sayısal gösterim hiç açılmaz. `withheld` ise oran yayımlamadığımız
   ülkeleri tutar: orada sayı yerine gerekçe çıkar.
   ------------------------------------------------------------------------ */
const TAX_SWAP: {
  models: Partial<Record<Country, TaxModel>>;
  withheld: Country[];
  tr: { rate: number };
  input: { min: number; max: number; step: number; start: number };
  display: { rateFloor: number };
} = {
  models: {
    dubai: { currency: "AED", bandLimit: 375000, lowerRate: 0, upperRate: 0.09 },
  },
  /* oran yayımlamadığımız ülkeler: sayısal gösterim yerine gerekçe çıkar */
  withheld: ["kktc"],
  /* Türkiye kıyası: kamuya açık kurumlar vergisi genel oranı */
  tr: { rate: 0.25 },
  /* yalnızca arayüz sınırı, vergi kuralı değil */
  input: { min: 0, max: 10000000, step: 25000, start: 900000 },
  /* yalnızca gösterim eşiği, vergi kuralı değil: bunun altındaki efektif oran
     yuvarlanınca sıfır görünürdü, o yüzden oran yerine dilim cümlesi yazılır */
  display: { rateFloor: 0.001 },
};

type IconCmp = typeof Landmark;

/* the published rows, grouped into parts a person can read one at a time.
   Order matters: the fallback part collects whatever the earlier tests miss. */
const SECTIONS: {
  key: string;
  label: string;
  icon: IconCmp;
  lead: string;
  test: RegExp | null;
}[] = [
  {
    key: "kurumlar",
    label: "Kurumlar vergisi",
    icon: Landmark,
    test: /kurumlar|beyan/i,
    lead: "Oran tek başına sonucu vermiyor. Hangi kazancın vergiye tabi sayıldığı, hangi giderin kabul edildiği ve beyanın hangi takvimde verildiği birlikte belirleyici.",
  },
  {
    key: "bolge",
    label: "Serbest bölge koşulları",
    icon: ShieldCheck,
    test: /serbest bölge/i,
    lead: "Serbest bölge avantajı otomatik değil. Nitelikli mükellef ve nitelikli gelir koşulları, faaliyetin gerçekten burada yürümesi ve belgelendirme birlikte sağlanmazsa standart oran uygulanıyor.",
  },
  {
    key: "kdv",
    label: "KDV",
    icon: Receipt,
    test: /kdv/i,
    lead: "Kayıt zorunluluğu eşiğe ve faaliyet türüne bağlı. Eşiğin altında gönüllü kayıt gündeme gelebiliyor.",
  },
  {
    key: "diger",
    label: "Diğer başlıklar",
    icon: FileText,
    test: null,
    lead: "Bu başlıklar şirketin kendi vergisinden ayrı yürüyor. Kişisel tarafınız mukimliğinize bağlı olarak ayrıca değerlendiriliyor.",
  },
];

const matchCountry = (name: string): Country | null =>
  (Object.keys(COUNTRY_LABELS) as Country[]).find(
    (k) => COUNTRY_LABELS[k] === name,
  ) ?? null;

/* ---------------------------------------------------------- number that moves */
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function Num({
  value,
  suffix,
  reduce,
}: {
  value: number;
  suffix?: string;
  reduce: boolean | null;
}) {
  const [shown, setShown] = useState(value);
  const current = useRef(value);
  const raf = useRef(0);

  /* Reduced motion never schedules a frame: it renders `value` straight away
     and the effect only keeps the animation origin in step. That matters more
     than it looks — requestAnimationFrame is paused while the tab is hidden,
     so counting there would leave a stale figure on screen. */
  useEffect(() => {
    cancelAnimationFrame(raf.current);
    if (reduce) {
      current.current = value;
      return;
    }
    const from = current.current;
    if (from === value) return;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - t0) / 420, 1);
      current.current = from + (value - from) * easeInOut(p);
      setShown(current.current);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [value, reduce]);

  return (
    <>
      {nf.format(Math.round(reduce ? value : shown))}
      {suffix ? <span className="txd-unit"> {suffix}</span> : null}
    </>
  );
}

/* ------------------------------------------------------------------ section */
export default function CountryTax({
  data,
  name,
  country,
}: {
  data: CountryContent["tax"];
  name: string;
  /** pass the slug where you have it; the label match is only a fallback */
  country?: Country;
}) {
  const reduce = useReducedMotion();
  const uid = useId();

  const slug = country ?? matchCountry(name);
  const model = slug ? TAX_SWAP.models[slug] : undefined;
  /* oran yayımlamadığımız yerde boş bırakmak yerine nedenini yazıyoruz */
  const withheld = slug ? TAX_SWAP.withheld.includes(slug) : false;

  const [profit, setProfit] = useState(TAX_SWAP.input.start);
  const [typed, setTyped] = useState(() => nf.format(TAX_SWAP.input.start));

  const setBoth = (n: number) => {
    setProfit(n);
    setTyped(nf.format(n));
  };
  const onTyped = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 9);
    if (digits === "") {
      setTyped("");
      setProfit(0);
      return;
    }
    const n = Math.min(Number(digits), TAX_SWAP.input.max);
    setBoth(n);
  };

  const lowPart = model ? Math.min(profit, model.bandLimit) : 0;
  const highPart = model ? Math.max(0, profit - model.bandLimit) : 0;
  const tax = model
    ? lowPart * model.lowerRate + highPart * model.upperRate
    : 0;
  const keep = profit - tax;
  const eff = profit > 0 ? tax / profit : 0;
  const trTax = profit * TAX_SWAP.tr.rate;
  const share = (v: number) => (profit > 0 ? (v / profit) * 100 : 0);
  const grow = { duration: reduce ? 0 : 0.5, ease: EASE };
  /* below the floor the percentage would round to zero on screen, and a zero
     rate printed on its own reads as a promise. There the copy describes the
     band instead of announcing a rate. */
  const showsRate = eff >= TAX_SWAP.display.rateFloor;
  /* the field can be cleared, and an empty field must not produce a sentence
     about a figure nobody entered */
  const rateLabel =
    profit === 0
      ? null
      : showsRate
        ? `temsilî efektif %${pf(eff)}`
        : "tutar ağırlıkla ilk dilimde";

  /* the published rows, split into parts; empty parts never render a tab */
  const groups = useMemo(() => {
    const taken = new Set<TaxRow>();
    return SECTIONS.map((s) => ({
      ...s,
      rows: data.rows.filter((r) => {
        if (taken.has(r)) return false;
        const hit = s.test ? s.test.test(r.label) : true;
        if (hit) taken.add(r);
        return hit;
      }),
    })).filter((g) => g.rows.length > 0);
  }, [data.rows]);

  const [tab, setTab] = useState(0);
  const index = Math.min(tab, groups.length - 1);
  const active = groups[index];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = groups.length - 1;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="vergi" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text={`${name}'de vergi çerçevesi.`}
            accent="vergi çerçevesi."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Genel kural burada. Sizin durumunuz görüşmede çıkıyor.</p>
          </FadeUp>
        </div>

        {/* ---------- representative distribution ---------- */}
        {model && (
          <FadeUp delay={0.24}>
            <div className="txd">
              <div className="txd-side">
                <p className="txd-kicker">
                  <Info size={15} strokeWidth={2.1} aria-hidden="true" />
                  Temsilî gösterim
                </p>
                <h3 className="txd-h">Rakamı yazın, dağılımı burada görün.</h3>
                <p className="txd-lead">
                  Bu alan bir hesaplama aracı değil. {name} çerçevesinin nasıl işlediğini
                  görmeniz için hazırlanmış temsilî bir gösterim; girdiğiniz rakam
                  tarayıcınızdan çıkmıyor.
                </p>

                <div className="txd-field">
                  <label className="txd-label" htmlFor={`${uid}-amount`}>
                    Yıllık vergiye tabi kazanç ({model.currency})
                  </label>
                  <div className="txd-inputwrap">
                    <input
                      id={`${uid}-amount`}
                      className="txd-input"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      value={typed}
                      onChange={(e) => onTyped(e.target.value)}
                      onBlur={() => setTyped(nf.format(profit))}
                    />
                    <span className="txd-cur">{model.currency}</span>
                  </div>

                  <input
                    className="txd-range"
                    type="range"
                    min={TAX_SWAP.input.min}
                    max={TAX_SWAP.input.max}
                    step={TAX_SWAP.input.step}
                    value={Math.min(profit, TAX_SWAP.input.max)}
                    onChange={(e) => setBoth(Number(e.target.value))}
                    aria-label={`Yıllık vergiye tabi kazanç sürgüsü (${model.currency})`}
                    aria-valuetext={`${nf.format(profit)} ${model.currency}`}
                    style={
                      {
                        "--p": `${(Math.min(profit, TAX_SWAP.input.max) / TAX_SWAP.input.max) * 100}%`,
                      } as React.CSSProperties
                    }
                  />
                  <p className="txd-scale">
                    <span>{nf.format(TAX_SWAP.input.min)}</span>
                    <span>
                      {nf.format(TAX_SWAP.input.max)} {model.currency}
                    </span>
                  </p>
                </div>

                {/* on screen in every state — brief §2 */}
                <p className="txd-warn">
                  <Info size={15} strokeWidth={2.1} aria-hidden="true" />
                  <span>
                    Sonuç bağlayıcı değildir. Gerçek durum faaliyetinize, yönetimin nerede
                    yürüdüğüne, mukimliğinize ve belgelendirmenize göre değişir. Kesin
                    değerlendirme mali müşavir görüşmesinde yazılı olarak yapılır.
                  </span>
                </p>
              </div>

              <div className="txd-vis">
                <p className="txd-vh">
                  <span className="txd-vh-t">Örnek dağılım</span>
                  <span className="txd-vh-v">
                    {profit === 0
                      ? "rakam girilmedi"
                      : `${nf.format(profit)} ${model.currency} üzerinden`}
                  </span>
                </p>

                {/* the figures count while they change, so the visual copy is
                    hidden from assistive tech and the settled values are
                    announced once per change from the status line below */}
                <div className="txd-stats" aria-hidden="true">
                  <span className="txd-stat">
                    <span className="txd-stat-k">
                      <i className="txd-dot" data-k="keep" />
                      Şirkette kalan
                    </span>
                    <b className="txd-stat-v" data-k="keep">
                      <Num value={keep} suffix={model.currency} reduce={reduce} />
                    </b>
                  </span>
                  <span className="txd-stat">
                    <span className="txd-stat-k">
                      <i className="txd-dot" data-k="tax" />
                      Vergiye giden
                    </span>
                    <b className="txd-stat-v">
                      <Num value={tax} suffix={model.currency} reduce={reduce} />
                    </b>
                  </span>
                </div>
                <p className="sr-only" role="status">
                  {profit === 0
                    ? "Henüz bir rakam girilmedi."
                    : `${nf.format(profit)} ${model.currency} üzerinden temsilî dağılım. Şirkette kalan ${nf.format(Math.round(keep))} ${model.currency}, vergiye giden ${nf.format(Math.round(tax))} ${model.currency}.`}
                </p>

                <div className="txd-bar" aria-hidden="true">
                  <motion.span
                    className="txd-seg"
                    data-k="keep"
                    initial={{ width: `${share(keep)}%` }}
                    animate={{ width: `${share(keep)}%` }}
                    transition={grow}
                  />
                  <motion.span
                    className="txd-seg"
                    data-k="tax"
                    initial={{ width: `${share(tax)}%` }}
                    animate={{ width: `${share(tax)}%` }}
                    transition={grow}
                  />
                </div>
                <p className="txd-eff">
                  {profit === 0
                    ? "Bir rakam yazın, dağılım burada oluşsun."
                    : showsRate
                      ? `Bu rakamda temsilî efektif oran %${pf(eff)}.`
                      : "Bu rakamda tutarın tamamına yakını ilk dilimin içinde kalıyor. Koşullar sağlanmazsa standart oran işler."}
                </p>

                <div className="txd-bands">
                  <p className="txd-vh-t">Dilimler nasıl ayrışıyor</p>
                  <div className="txd-bar" data-slim aria-hidden="true">
                    <motion.span
                      className="txd-seg"
                      data-k="low"
                      initial={{ width: `${share(lowPart)}%` }}
                      animate={{ width: `${share(lowPart)}%` }}
                      transition={grow}
                    />
                    <motion.span
                      className="txd-seg"
                      data-k="high"
                      initial={{ width: `${share(highPart)}%` }}
                      animate={{ width: `${share(highPart)}%` }}
                      transition={grow}
                    />
                  </div>
                  <div className="txd-legend">
                    {/* the bands are named by position. The lower band's own
                        rate is published in the fact rows below; repeating it
                        here as a lone figure would read as a claim. */}
                    <span className="txd-leg">
                      <i className="txd-dot" data-k="low" aria-hidden="true" />
                      <span className="txd-legk">
                        İlk dilim: {nf.format(model.bandLimit)} {model.currency}
                        &apos;ye kadar olan kısım
                      </span>
                      <b className="txd-legv">
                        <Num value={lowPart} reduce={reduce} />
                      </b>
                    </span>
                    <span className="txd-leg">
                      <i className="txd-dot" data-k="high" aria-hidden="true" />
                      <span className="txd-legk">
                        Üst dilim: {nf.format(model.bandLimit)} {model.currency} üzeri, %
                        {pf(model.upperRate)} uygulanan kısım
                      </span>
                      <b className="txd-legv">
                        <Num value={highPart} reduce={reduce} />
                      </b>
                    </span>
                  </div>
                  <p className="txd-cond">
                    Serbest bölge tarafındaki indirimli uygulama otomatik değil: nitelikli
                    mükellef ve nitelikli gelir koşulları ile belgelendirme birlikte
                    sağlanmazsa standart oran işler.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        )}

        {/* ---------- Türkiye comparison, same figure, published general rates ---------- */}
        {model && (
          <FadeUp delay={0.28}>
            <div className="txd-tr">
              <p className="txd-tr-h">Aynı rakam Türkiye&apos;de olsaydı</p>
              <div className="txd-tr-rows">
                <div className="txd-trow">
                  <span className="txd-trow-k">{name}</span>
                  <span className="txd-mini" aria-hidden="true">
                    <motion.span
                      data-k="tax"
                      initial={{ width: `${eff * 100}%` }}
                      animate={{ width: `${eff * 100}%` }}
                      transition={grow}
                    />
                  </span>
                  <span className="txd-trow-v">
                    <b>
                      <Num value={tax} suffix={model.currency} reduce={reduce} />
                    </b>
                    {rateLabel && <span className="txd-trow-r">{rateLabel}</span>}
                  </span>
                </div>
                <div className="txd-trow">
                  <span className="txd-trow-k">Türkiye</span>
                  <span className="txd-mini" aria-hidden="true">
                    <motion.span
                      data-k="tax"
                      initial={{ width: `${TAX_SWAP.tr.rate * 100}%` }}
                      animate={{ width: `${TAX_SWAP.tr.rate * 100}%` }}
                      transition={grow}
                    />
                  </span>
                  <span className="txd-trow-v">
                    <b>
                      <Num value={trTax} suffix={model.currency} reduce={reduce} />
                    </b>
                    <span className="txd-trow-r">
                      kurumlar vergisi genel oranı %{pf(TAX_SWAP.tr.rate)}
                    </span>
                  </span>
                </div>
              </div>
              <p className="txd-tr-note">
                Kıyas yalnızca kurumlar vergisi genel oranını gösteriyor; kâr dağıtımı,
                ücret ve diğer yükümlülükler dahil değil. Kur çevrimi yapılmıyor, aynı
                tutar iki genel oran üzerinden gösteriliyor. Düşük görünen bir oran tek
                başına taşınma gerekçesi olmuyor: vergi, faaliyetin ve yönetimin gerçekten
                nerede yürüdüğüne ve mukimliğinize bağlı. İki tarafı birlikte
                kurgulamadan karar vermeyin.
              </p>
            </div>
          </FadeUp>
        )}

        {/* ---------- where a rate is not published, the reason is ---------- */}
        {!model && withheld && (
          <FadeUp delay={0.24}>
            {/* data.note already carries the "yazılı teklif + mali müşavir"
                sentence at the foot of the section. This block says only what
                the note does not: why no distribution is drawn here. */}
            <div className="txd-none">
              <h3 className="txd-none-h">Burada temsilî dağılım göstermiyoruz.</h3>
              <p className="txd-none-p">
                Tek bir dağılım çizmek, faaliyet konusuna göre değişen bir tabloyu tek
                bir tabloymuş gibi gösterirdi. Çerçeveyi aşağıdaki başlıklarda
                anlatıyoruz.
              </p>
            </div>
          </FadeUp>
        )}

        {/* ---------- the published rows, one part at a time ---------- */}
        {active && (
          <FadeUp delay={0.3}>
            <div className="txs">
              <div
                className="txs-tabs"
                role="tablist"
                aria-label="Vergi başlıkları"
                onKeyDown={onTabKey}
              >
                {groups.map((g, i) => {
                  const Icon = g.icon;
                  const on = i === index;
                  return (
                    <button
                      key={g.key}
                      type="button"
                      role="tab"
                      id={`${uid}-t-${g.key}`}
                      aria-selected={on}
                      aria-controls={`${uid}-panel`}
                      tabIndex={on ? 0 : -1}
                      className="txs-tab"
                      data-on={on || undefined}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      onClick={() => setTab(i)}
                    >
                      <Icon size={15} strokeWidth={2.1} aria-hidden="true" />
                      {g.label}
                    </button>
                  );
                })}
              </div>

              <div
                className="txs-panel"
                id={`${uid}-panel`}
                role="tabpanel"
                aria-labelledby={`${uid}-t-${active.key}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.key}
                    initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                    transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
                  >
                    <p className="txs-lead">{active.lead}</p>
                    <dl className="tx">
                      {active.rows.map((r) => (
                        <div key={r.label} className="tx-row">
                          <dt>{r.label}</dt>
                          <dd>
                            <b>{r.value}</b>
                            {r.note && <span>{r.note}</span>}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </FadeUp>
        )}

        <FadeUp delay={0.34}>
          <p className="tx-note">{data.note}</p>
        </FadeUp>

        <FadeUp delay={0.38}>
          <div className="tx-stance">
            <p className="tx-q">{STANCE_Q}</p>
            <p className="tx-a">{STANCE_A}</p>
            <Link href="/basla" className="btn btn-line">
              Mali müşavire danışın
              <ArrowRight size={15} strokeWidth={2.1} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
