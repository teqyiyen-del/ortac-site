"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Info } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { STANCE_A, STANCE_Q } from "@/lib/brand";
import type { CountryContent } from "@/lib/countryContent";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* Brief §8 — vergi çerçevesi, yalnızca çerçeve.
 *
 * SADELEŞTİRME TURU (müşteri geri bildirimi): bu bölüm daha önce bir araç gibi
 * duruyordu — sol sütunda ayrı bir başlık ve giriş metni, sağda dilim dilim
 * ayrışan ikinci bir grafik, altında dört sekmeli bir olgu paneli ve her
 * sekmenin kendi giriş paragrafı. Hepsi doğruydu ama hepsi aynı ekranda
 * olunca ülke sayfası okunmuyordu. Bölüm artık bir ÖZET: ziyaretçi rakamını
 * yazar, dağılımı görür, kıyası görür ve detaylı hesap için araca gider.
 *
 * NEDEN NE ÇIKTI (metinler veri dosyasında duruyor, yalnızca bu ekrandan
 * kaldırıldı):
 *  - Sol tanıtım sütunu (kicker + h3 + üç satır giriş): bölümün zaten bir h2'si
 *    ve bir lead'i var. Aynı vaadi panelin içinde ikinci kez kurmak, ekranın
 *    üçte birini tekrar için harcıyordu. Yerine tek satırlık "Temsilî gösterim"
 *    etiketi kaldı.
 *  - "Dilimler nasıl ayrışıyor" bloğu (ince çubuk + iki lejant satırı + koşul
 *    paragrafı): dilim aritmetiği tam olarak "araç" işi. Yayımlanmış dilim
 *    rakamları aşağıdaki olgu ızgarasında zaten duruyor, detaylı kurgu ise
 *    /araclar/vergi-hesaplayici'nin işi.
 *  - Sekmeli olgu paneli ve dört sekme girişi: bölümdeki en büyük metin
 *    yığınıydı ve içerdiği cümleler yayımlanmış bilgi değil, editoryal yorumdu.
 *    Yayımlanmış satırlar sekmesiz, sade bir ızgaraya indi; her satırın kendi
 *    notu (nitelikli mükellef koşulu, KDV eşiği vb.) korundu — o notlar iddiayı
 *    sınırlayan cümleler, onlar düşerse geriye çıplak iddia kalırdı.
 *  - Panel içi uyarı ve kıyas notu: üç ve altı cümleden birer/iki cümleye indi.
 *    Bağlayıcı olmadığı bilgisi ekrandan kalkmadı, yalnızca kısaldı.
 *
 * NE EKLENDİ:
 *  - Araca çıkış: /araclar/vergi-hesaplayici. Adres henüz yayında olmadığı için
 *    SmartLink bağlantıyı sönük bırakıp "yakında" rozeti basıyor — bu kasıtlı.
 *  - Kıyas ülkesi seçici. Eski TAX_SWAP.tr tek bir Türkiye oranı tutuyordu;
 *    yerine PEERS_SWAP geldi. Seçim yalnızca satırın adını, rakamını ve oran
 *    etiketini değiştiriyor; ızgara ölçüleri sabit olduğu için tasarım
 *    değişmiyor.
 *
 * NE KORUNDU (ve neden):
 *  - Dağılım şeridi: müşterinin beğendiği tek parça. Aynı mantık, biraz daha
 *    büyük tipografi ve daha kalın çubukla duruyor.
 *  - Girilen rakam tarayıcıdan çıkmıyor; dil "hesaplama" değil "temsilî
 *    gösterim" (brief §2, STANCE_LIMITS: kişiye özel vergi görüşü verilmez).
 *  - Çıplak sıfır oran hâlâ basılmıyor. Efektif oran gösterim eşiğinin altına
 *    düşerse yüzde yerine dilim cümlesi yazılıyor: yuvarlanınca sıfır görünen
 *    bir oran, okunduğunda bir vaat oluyor. Bu bileşen hiçbir yerde
 *    model.lowerRate'i tek başına ekrana basmaz.
 *  - Oran yayımlamadığımız ülkede sayısal gösterim hiç açılmıyor; yerine
 *    nedeni yazılıyor (tahmin edilmiyor).
 *  - Duruş sorusu bölümü kapatıyor.
 */

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
  input: { min: number; max: number; step: number; start: number };
  display: { rateFloor: number };
} = {
  models: {
    dubai: { currency: "AED", bandLimit: 375000, lowerRate: 0, upperRate: 0.09 },
  },
  /* oran yayımlamadığımız ülkeler: sayısal gösterim yerine gerekçe çıkar */
  withheld: ["kktc"],
  /* yalnızca arayüz sınırı, vergi kuralı değil */
  input: { min: 0, max: 10000000, step: 25000, start: 900000 },
  /* yalnızca gösterim eşiği, vergi kuralı değil: bunun altındaki efektif oran
     yuvarlanınca sıfır görünürdü, o yüzden oran yerine dilim cümlesi yazılır */
  display: { rateFloor: 0.001 },
};

/* ---------------------------------------------------------------------------
   SWAP: mali müşavir onayı gerekiyor — kıyas ülkeleri.
   Kıyas şeridinde seçilebilen bütün ülkeler ve oranları yalnızca burada durur;
   ekranda başka hiçbir yerde kıyas oranı yazılı değildir, bu yüzden listeyi
   büyütmek ya da bir oranı güncellemek tek satırlık iş.

   Her satır ilgili ülkenin YAYIMLANMIŞ GENEL kurumlar vergisi oranıdır ve
   temsilî gösterim içindir; kişiye özel vergi görüşü değildir. `basis` alanı
   oranın neyi kapsadığını ekrana yazar — bir ülkenin oranı tek bir sayıya
   inmiyorsa (Almanya'da yerel ticaret vergisi, ABD'de eyalet vergisi) bunu
   gizlemek yerine oranın yanında söylüyoruz. `loc` yalnızca Türkçe bulunma
   hâli için: "Türkiye'de", "Almanya'da" — ek otomatik türetilemiyor.
   ------------------------------------------------------------------------ */
type Peer = {
  key: string;
  name: string;
  /** başlıkta kullanılan bulunma hâli — ek ülkeye göre değişiyor */
  loc: string;
  rate: number;
  /** oranın neyi kapsadığı; oranla birlikte hep ekranda */
  basis: string;
};

const PEERS_SWAP: Peer[] = [
  { key: "tr", name: "Türkiye", loc: "Türkiye'de", rate: 0.25, basis: "kurumlar vergisi genel oranı" },
  { key: "gb", name: "İngiltere", loc: "İngiltere'de", rate: 0.25, basis: "ana oran; küçük kâr oranı ayrı" },
  /* Almanya tek bir sayıya inmiyor: %15 federal kurumlar vergisi + %5,5
     dayanışma payı + belediyeye göre değişen ticaret vergisi. Ekrandaki etiket
     kısa tutuldu (satır sarmaması için), kapsamı bu yorum taşıyor. */
  { key: "de", name: "Almanya", loc: "Almanya'da", rate: 0.3, basis: "federal, yerel ve dayanışma payı birlikte" },
  { key: "nl", name: "Hollanda", loc: "Hollanda'da", rate: 0.258, basis: "üst dilim oranı; ilk dilim daha düşük" },
  { key: "fr", name: "Fransa", loc: "Fransa'da", rate: 0.25, basis: "kurumlar vergisi genel oranı" },
  { key: "ie", name: "İrlanda", loc: "İrlanda'da", rate: 0.125, basis: "ticari kazanç oranı; diğer gelirde farklı" },
  { key: "us", name: "ABD", loc: "ABD'de", rate: 0.21, basis: "yalnızca federal oran; eyalet vergisi ayrı" },
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
      {suffix ? <span className="txm-unit"> {suffix}</span> : null}
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

  /* Sayfanın kendi ülkesi kıyas listesinden düşüyor: bir ülkeyi kendisiyle
     kıyaslamak iki özdeş satır üretirdi. Liste yine de en az altı seçenek
     bırakıyor, çünkü PEERS_SWAP yediyle başlıyor. */
  const peers = PEERS_SWAP.filter((p) => p.name !== name);
  const [peerKey, setPeerKey] = useState(peers[0].key);
  const peer = peers.find((p) => p.key === peerKey) ?? peers[0];

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
  const tax = model ? lowPart * model.lowerRate + highPart * model.upperRate : 0;
  const keep = profit - tax;
  const eff = profit > 0 ? tax / profit : 0;
  const peerTax = profit * peer.rate;
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
        ? `temsilî efektif oran %${pf(eff)}`
        : "tutar ağırlıkla ilk dilimde";

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

        {/* ---------- özet panel: girdi + korunan dağılım şeridi ---------- */}
        {model && (
          <FadeUp delay={0.24}>
            <div className="txm">
              <div className="txm-head">
                <p className="txm-kicker">
                  <Info size={15} strokeWidth={2.1} aria-hidden="true" />
                  Temsilî gösterim
                </p>
                {/* Detaylı kurgu — çalışan sayısı, gider kalemleri, gelir türü —
                    bu sayfanın işi değil. SmartLink adres yayına girene kadar
                    bağlantıyı sönük bırakıp "yakında" rozeti basıyor; bu
                    kasıtlı, düzeltilecek bir durum değil. */}
                <SmartLink href="/araclar/vergi-hesaplayici" className="txm-more">
                  Detaylı hesapla
                  <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                </SmartLink>
              </div>

              {/* Tek satır: etiket, rakam kutusu ve aynı değerin sürgüsü yan yana.
                  Eski kurguda bunlar kendi sütununda, kendi başlığı ve giriş
                  paragrafıyla duruyordu; bölümün "form" hissini asıl veren şey
                  oydu. */}
              <div className="txm-ctl">
                <label className="txm-label" htmlFor={`${uid}-amount`}>
                  Yıllık vergiye tabi kazanç ({model.currency})
                </label>
                <div className="txm-inputwrap">
                  <input
                    id={`${uid}-amount`}
                    className="txm-input"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={typed}
                    onChange={(e) => onTyped(e.target.value)}
                    onBlur={() => setTyped(nf.format(profit))}
                  />
                  <span className="txm-cur">{model.currency}</span>
                </div>

                <div className="txm-slider">
                  <input
                    className="txm-range"
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
                  <p className="txm-scale">
                    <span>{nf.format(TAX_SWAP.input.min)}</span>
                    <span>
                      {nf.format(TAX_SWAP.input.max)} {model.currency}
                    </span>
                  </p>
                </div>
              </div>

              {/* ---- müşterinin beğendiği şerit: aynı mantık, daha güçlü tipografi ---- */}
              <div className="txm-strip">
                <p className="txm-sh">
                  <span className="txm-sh-t">Örnek dağılım</span>
                  <span className="txm-sh-v">
                    {profit === 0
                      ? "rakam girilmedi"
                      : `${nf.format(profit)} ${model.currency} üzerinden`}
                  </span>
                </p>

                {/* the figures count while they change, so the visual copy is
                    hidden from assistive tech and the settled values are
                    announced once per change from the status line below */}
                <div className="txm-stats" aria-hidden="true">
                  <span className="txm-stat">
                    <span className="txm-stat-k">
                      <i className="txm-dot" data-k="keep" />
                      Şirkette kalan
                    </span>
                    <b className="txm-stat-v" data-k="keep">
                      <Num value={keep} suffix={model.currency} reduce={reduce} />
                    </b>
                  </span>
                  <span className="txm-stat">
                    <span className="txm-stat-k">
                      <i className="txm-dot" data-k="tax" />
                      Vergiye giden
                    </span>
                    <b className="txm-stat-v">
                      <Num value={tax} suffix={model.currency} reduce={reduce} />
                    </b>
                  </span>
                </div>
                <p className="sr-only" role="status">
                  {profit === 0
                    ? "Henüz bir rakam girilmedi."
                    : `${nf.format(profit)} ${model.currency} üzerinden temsilî dağılım. Şirkette kalan ${nf.format(Math.round(keep))} ${model.currency}, vergiye giden ${nf.format(Math.round(tax))} ${model.currency}.`}
                </p>

                <div className="txm-bar" aria-hidden="true">
                  <motion.span
                    className="txm-seg"
                    data-k="keep"
                    initial={{ width: `${share(keep)}%` }}
                    animate={{ width: `${share(keep)}%` }}
                    transition={grow}
                  />
                  <motion.span
                    className="txm-seg"
                    data-k="tax"
                    initial={{ width: `${share(tax)}%` }}
                    animate={{ width: `${share(tax)}%` }}
                    transition={grow}
                  />
                </div>
                <p className="txm-eff">
                  {profit === 0
                    ? "Bir rakam yazın, dağılım burada oluşsun."
                    : showsRate
                      ? `Bu rakamda temsilî efektif oran %${pf(eff)}.`
                      : "Bu rakamda tutarın tamamına yakını ilk dilimin içinde kalıyor. Koşullar sağlanmazsa standart oran işler."}
                </p>
              </div>

              {/* kısaldı ama kalktı sayılmaz: her durumda ekranda — brief §2 */}
              <p className="txm-warn">
                <Info size={14} strokeWidth={2.1} aria-hidden="true" />
                <span>
                  Sonuç bağlayıcı değildir; kesin değerlendirme mali müşavir görüşmesinde
                  yazılı olarak yapılır. Girdiğiniz rakam tarayıcınızdan çıkmıyor.
                </span>
              </p>
            </div>
          </FadeUp>
        )}

        {/* ---------- kıyas: aynı rakam, seçilen ülkenin yayımlanmış genel oranı ---------- */}
        {model && (
          <FadeUp delay={0.28}>
            <div className="txm-cmp">
              <div className="txm-cmp-head">
                <p className="txm-cmp-h">Aynı rakam {peer.loc} olsaydı</p>
                {/* Seçim yalnızca kıyas satırının adını, rakamını ve oranını
                    değiştiriyor; ızgara, çubuk ve tipografi sabit kalıyor. */}
                <span className="txm-sel">
                  <label className="txm-sel-l" htmlFor={`${uid}-peer`}>
                    Kıyas ülkesi
                  </label>
                  <span className="txm-sel-w">
                    <select
                      id={`${uid}-peer`}
                      className="txm-sel-i"
                      value={peer.key}
                      onChange={(e) => setPeerKey(e.target.value)}
                    >
                      {peers.map((p) => (
                        <option key={p.key} value={p.key}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={15} strokeWidth={2.1} aria-hidden="true" />
                  </span>
                </span>
              </div>

              <div className="txm-cmp-rows">
                <div className="txm-crow" data-self="">
                  <span className="txm-crow-k">{name}</span>
                  <span className="txm-mini" aria-hidden="true">
                    <motion.span
                      initial={{ width: `${eff * 100}%` }}
                      animate={{ width: `${eff * 100}%` }}
                      transition={grow}
                    />
                  </span>
                  <span className="txm-crow-v">
                    <b>
                      <Num value={tax} suffix={model.currency} reduce={reduce} />
                    </b>
                    {rateLabel && <span className="txm-crow-r">{rateLabel}</span>}
                  </span>
                </div>
                <div className="txm-crow">
                  <span className="txm-crow-k">{peer.name}</span>
                  <span className="txm-mini" aria-hidden="true">
                    <motion.span
                      initial={{ width: `${peer.rate * 100}%` }}
                      animate={{ width: `${peer.rate * 100}%` }}
                      transition={grow}
                    />
                  </span>
                  <span className="txm-crow-v">
                    <b>
                      <Num value={peerTax} suffix={model.currency} reduce={reduce} />
                    </b>
                    <span className="txm-crow-r">
                      {peer.basis} %{pf(peer.rate)}
                    </span>
                  </span>
                </div>
              </div>

              <p className="txm-cmp-note">
                Yayımlanmış genel oran üzerinden temsilî kıyas; kur çevrimi yapılmıyor.
                Düşük oran tek başına taşınma gerekçesi değil: vergi, faaliyetin ve
                yönetimin gerçekten nerede yürüdüğüne ve mukimliğinize bağlı.
              </p>
            </div>
          </FadeUp>
        )}

        {/* ---------- oran yayımlamadığımız yerde sayı değil, gerekçe ---------- */}
        {!model && withheld && (
          <FadeUp delay={0.24}>
            {/* data.note zaten "yazılı teklif + mali müşavir" cümlesini bölümün
                sonunda taşıyor; burada yalnızca dağılımın neden çizilmediği
                yazıyor. */}
            <p className="txm-none">
              Burada temsilî dağılım göstermiyoruz: tek bir dağılım çizmek, faaliyet
              konusuna göre değişen bir tabloyu tek bir tabloymuş gibi gösterirdi.
              Çerçeve aşağıdaki başlıklarda.
            </p>
          </FadeUp>
        )}

        {/* ---------- yayımlanmış başlıklar: sekmesiz, yorumsuz, sade ---------- */}
        <FadeUp delay={0.3}>
          <p className="txm-cap">Yayımlanmış çerçeve</p>
          <dl className="txm-facts">
            {data.rows.map((r) => (
              <div key={r.label} className="txm-fact">
                <dt>{r.label}</dt>
                <dd>
                  <b>{r.value}</b>
                  {r.note && <span>{r.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </FadeUp>

        <FadeUp delay={0.34}>
          <p className="tx-note">{data.note}</p>
        </FadeUp>

        <FadeUp delay={0.38}>
          <div className="tx-stance">
            <p className="tx-q">{STANCE_Q}</p>
            <p className="tx-a">{STANCE_A}</p>
            <SmartLink href="/basla" className="btn btn-line">
              Mali müşavire danışın
              <ArrowRight size={15} strokeWidth={2.1} />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
