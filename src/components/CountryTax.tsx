"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Info } from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
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
 * İKİNCİ SADELEŞTİRME TURU — müşteri bölümü hâlâ kalabalık buldu ve kıyas
 * şeridinden ("Aynı rakam …'de olsaydı") SONRASINI işaret etti. Kesilen üç
 * blok ve gerekçeleri:
 *
 *  - "Yayımlanmış çerçeye" ızgarası (data.rows: kurumlar vergisi, serbest bölge,
 *    beyan süresi, KDV, kişisel gelir vergisi) ARACI OLAN ÜLKEDE ARTIK BASILMIYOR.
 *    Sebep basit: bu bölümün en üstünde "Detaylı hesapla" çıkışı duruyor ve o
 *    çıkışın gittiği yer tam olarak bu satırların yeri. Aynı ekranda hem özeti
 *    hem dökümü göstermek, ziyaretçiye "istediğini" değil "her şeyi" vermekti.
 *    Satırlar countryContent'te olduğu gibi duruyor.
 *    DİKKAT: ızgara tamamen silinmedi, KOŞULA BAĞLANDI. Aracı olmayan ülkede
 *    (İngiltere, KKTC) panel de kıyas da çizilmiyor; ızgarayı orada da
 *    kaldırmak vergi bölümünü tamamen boşaltırdı. Yani ızgara artık "özetin
 *    yanındaki fazlalık" değil, "özet yoksa devreye giren tek içerik".
 *
 *  - data.note paragrafı ("Bu tablo genel çerçeve…"): ızgaranın altında altı
 *    satır sürüyordu ve söylediği şey duruş cümlesinin uzun hâliydi — durumun
 *    faaliyete, yönetime, mukimliğe ve gelir türüne bağlı olduğu. Aynı bilgi
 *    aşağıdaki tek satırlık dipnotta zaten var. Ayrıca Dubai ve KKTC
 *    metinlerinde emekliye ayrılan "mali müşavirimizle netleştiriyoruz"
 *    kalıbı geçiyordu; render kalksa da o kalıbın ekrana düşmesi doğru değildi.
 *
 *  - Duruş bloğu (.tx-stance: soru satırı + büyük cevap + "Mali müşavire
 *    danışın" butonu): bölümü üç kutu daha uzatıyordu ve butonu firmanın
 *    kurgusunda olmayan bir randevuya yönlendiriyordu. Duruşun kendisi
 *    kaybolmadı — STANCE_Q/STANCE_A tek satırlık sakin bir dipnota indi,
 *    butonun yerini AskCta ("Sorularınız mı var?") aldı.
 *
 * Aynı turda kıyas altındaki not tek cümleye, panel uyarısı da tek cümleye
 * indi: kıyas notunun ikinci cümlesi ("düşük oran tek başına gerekçe değil")
 * kelimesi kelimesine dipnottaki duruş cümlesinin tekrarıydı.
 *
 * ÜÇÜNCÜ TUR — TASARIM. Müşteri artık içeriği değil GÖRÜNÜŞÜ işaret etti:
 * "Burası daha tasarımsal göze hoş gelmeli şu alttaki çizgiyi daha ince hale
 *  getirebiliriz çok kalın duruyor ve dubai türkiye yazan yerlere bayrak
 *  koyalım sağ üstteki ki kıyas ülkesi daha belirgin olsa daha iyi olur ve
 *  dubai mavi olacaksa alttakiler de o ülkelerin renkleri olsa tatlı olr"
 * Dört düzeltme, dördü de biçim — TEK BİR RAKAM, ORAN YA DA EŞİK EKLENMEDİ,
 * hiçbir şerh kaldırılmadı ("Temsilî gösterim", "bağlayıcı değildir",
 * "yayımlanmış genel oran", "kur çevrimi yapılmıyor" hepsi yerinde):
 *   1. Dağılım şeridi 58px'ten 18px'e indi (gerekçe css/tax.css, .txm-bar).
 *   2. Kıyas satırlarının başına bayrak geldi. Ölçü tuzağı ve kap sözleşmesi
 *      PEER_LOOK'un başında; kısaca: Flag ölçüsüz SVG basıyor, kabı sabit.
 *   3. Kıyas seçicisi belirginleşti (yükseklik, punto, bayrak, renkli kenar).
 *   4. Kıyas ülkesinin çubuğu artık düz siyah değil, KENDİ BAYRAK RENGİ;
 *      sayfanın kendi satırı mavi kalıyor. Renk hiçbir yerde tek başına bilgi
 *      taşımıyor ve küçük metne hiç uygulanmadı.
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
 *  - Duruş cümlesi bölümü kapatıyor — artık blok olarak değil, dipnot olarak.
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

/* ---------------------------------------------------------------------------
   KIYAS ÜLKESİNİN BAYRAĞI VE RENGİ  (SWAP DEĞİL — yalnızca sunum)

   Müşteri: "dubai türkiye yazan yerlere bayrak koyalım … dubai mavi olacaksa
   alttakiler de o ülkelerin renkleri olsa tatlı olur."

   NEDEN PEERS_SWAP'İN İÇİNE YAZILMADI: o sabit mali müşavir onayı bekleyen
   ORAN kaydı; içine renk ve vektör karıştırmak, oran güncellemek isteyen kişiyi
   tasarım kodunun içinde gezdirirdi. İki tablo `key` ile eşleşiyor.

   BAYRAKLAR NEDEN BURADA ÇİZİLİYOR: paylaşılan Flag bileşeni (shared/
   CountryPicker) yalnızca sitenin çalıştığı üç ülkeyi tanıyor. Kıyas listesi
   yedi ülke, o yüzden kalanlar burada duruyor. İngiltere paylaşılan bileşenden
   geliyor — aynı bayrağın iki çizimi olmasın.

   ÖLÇÜ SÖZLEŞMESİ — BU DEPODA İKİ SAYFA TAM BURADAN ÇÖKTÜ.
   Bayraklar width/height TAŞIMIYOR, yalnızca viewBox. Kabı ölçülmemiş bir
   viewBox'lı SVG varsayılan 300x150'ye açılıyor ve satırı dağıtıyor. Kap
   .txm-fl'de sabit piksel + overflow: hidden ile kilitli (css/tax.css).
   viewBox 60x40 = 3:2 ve kap 24x16 = 3:2, yani bayrak kırpılmadan tam oturuyor;
   oran bozulursa `slice` devreye girip bayrağın ortasını keser.

   RENKLER BAYRAĞIN KENDİ DEĞERİNDEN ALINDI, palet icat edilmedi. Aynı yöntem
   sitede zaten var (css/kaynaklar.css, ülke rengi bloğu). Ölçülen kontrast —
   ilk sütun kıyas çubuğunun izi (--white), ikinci sütun panel zemini (--paper);
   çubuk ve kenar birer GRAFİK, eşik 3:1:
     tr  #e30a17  Türk bayrağı kırmızısı      4,86 : 1  ·  4,46 : 1
     gb  #012169  Union Jack lacivert zemini 14,76 : 1  ·  13,54 : 1
     de  #dd0000  Bundesflagge kırmızısı      5,15 : 1  ·  4,73 : 1
     nl  #21468b  Hollanda bayrağı mavisi     9,08 : 1  ·  8,33 : 1
     fr  #000091  Fransa bayrağı mavisi      14,91 : 1  ·  13,67 : 1
     ie  #169b62  İrlanda bayrağı yeşili      3,56 : 1  ·  3,27 : 1
     us  #3c3b6e  ABD bayrağı laciverti      10,28 : 1  ·  9,43 : 1
   En düşük değer İrlanda yeşili (3,27:1) ve eşiğin üstünde. Renk hiçbir yerde
   TEK BAŞINA bilgi taşımıyor: ülkenin adı, bayrağı ve rakamı aynı satırda
   yazılı. Renk küçük METNE hiç uygulanmadı — kırmızı ve lacivert 12,5px'te
   4,5:1'in altına düşebiliyor, o yüzden yalnızca çubukta ve kenarda.
   ------------------------------------------------------------------------ */
type PeerLook = { color: string; flag: React.JSX.Element };

/* Türk bayrağı: KKTC bayrağı paylaşılan bileşende var ama o beyaz zeminli ve
   kırmızı hilalli — ikisi karıştırılamaz, bu yüzden ayrı çiziliyor. */
const FlagTr = (
  <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="60" height="40" fill="#e30a17" />
    <circle cx="24" cy="20" r="8.4" fill="#ffffff" />
    <circle cx="27.6" cy="20" r="6.7" fill="#e30a17" />
    <path
      d="M37.6 15.4 L38.9 19.1 L42.8 19.1 L39.7 21.4 L40.8 25.1 L37.6 22.8 L34.4 25.1 L35.5 21.4 L32.4 19.1 L36.3 19.1 Z"
      fill="#ffffff"
    />
  </svg>
);

/** yatay üç bant */
const Bands3 = ({ c }: { c: [string, string, string] }) => (
  <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {c.map((f, i) => (
      <rect key={f + i} y={i * (40 / 3)} width="60" height={40 / 3} fill={f} />
    ))}
  </svg>
);

/** dikey üç bant */
const Cols3 = ({ c }: { c: [string, string, string] }) => (
  <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {c.map((f, i) => (
      <rect key={f + i} x={i * 20} width="20" height="40" fill={f} />
    ))}
  </svg>
);

/* ABD bayrağı SADELEŞTİRİLMİŞ: on üç şerit ve lacivert köşe gerçek, ama elli
   yıldız 24x16 piksellik bir kapta zaten çözünmüyor — yerine düzenli bir nokta
   ızgarası var. Aynı sadeleştirme paylaşılan Union Jack çiziminde de yapılmış
   (orada da haç kalınlıkları temsilî). */
const FlagUs = (
  <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="60" height="40" fill="#ffffff" />
    {[0, 2, 4, 6, 8, 10, 12].map((i) => (
      <rect key={i} y={(i * 40) / 13} width="60" height={40 / 13} fill="#b22234" />
    ))}
    <rect width="24" height={(40 * 7) / 13} fill="#3c3b6e" />
    {[0, 1, 2, 3].map((r) =>
      [0, 1, 2, 3, 4].map((k) => (
        <circle key={`${r}-${k}`} cx={2.8 + k * 4.6} cy={2.8 + r * 5.2} r="1.05" fill="#ffffff" />
      )),
    )}
  </svg>
);

const PEER_LOOK: Record<string, PeerLook> = {
  tr: { color: "#e30a17", flag: FlagTr },
  gb: { color: "#012169", flag: <Flag country="ingiltere" /> },
  de: { color: "#dd0000", flag: <Bands3 c={["#000000", "#dd0000", "#ffce00"]} /> },
  nl: { color: "#21468b", flag: <Bands3 c={["#ae1c28", "#ffffff", "#21468b"]} /> },
  fr: { color: "#000091", flag: <Cols3 c={["#000091", "#ffffff", "#ef4135"]} /> },
  ie: { color: "#169b62", flag: <Cols3 c={["#169b62", "#ffffff", "#ff883e"]} /> },
  us: { color: "#3c3b6e", flag: FlagUs },
};

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
  /* PEERS_SWAP'e bakış kaydı olmayan bir ülke eklenirse bölüm ÇÖKMESİN diye
     geri düşüş var: bayrak yerine hiçbir şey, renk yerine --text-900 (çubuğun
     eski rengi). Yani eksik kayıt sessizce eski görünüşe düşer, beyaz ekran
     üretmez. */
  const look = PEER_LOOK[peer.key] ?? { color: "var(--text-900)", flag: null };
  /* Sayfanın kendi bayrağı paylaşılan bileşenden; `model` varsa `slug` da var
     ama TS bunu koşuldan türetemiyor, o yüzden burada bir kez çözülüyor. */
  const selfFlag = slug ? <Flag country={slug} /> : null;

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
                      : "Tutarın tamamına yakını ilk dilimde kalıyor; koşullar sağlanmazsa standart oran işler."}
                </p>
              </div>

              {/* Tek satıra indi ve emekli kalıptan arındı. Eski hâli "kesin
                  değerlendirme mali müşavir görüşmesinde yazılı olarak yapılır"
                  diyordu — firmanın öyle bir kurgusu yok. Kalkan şey uyarı değil,
                  olmayan bir randevuya yapılan yönlendirme: bağlayıcı olmadığı
                  ve rakamın cihazdan çıkmadığı bilgisi her durumda ekranda. */}
              <p className="txm-warn">
                <Info size={14} strokeWidth={2.1} aria-hidden="true" />
                <span>
                  Temsilî gösterim, bağlayıcı değildir. Girdiğiniz rakam tarayıcınızdan
                  çıkmıyor.
                </span>
              </p>
            </div>
          </FadeUp>
        )}

        {/* ---------- kıyas: aynı rakam, seçilen ülkenin yayımlanmış genel oranı ---------- */}
        {model && (
          <FadeUp delay={0.28}>
            {/* --txm-pc: seçilen kıyas ülkesinin kendi bayrak rengi. Kutunun
                kökünde duruyor çünkü İKİ yer okuyor — seçicinin kenarı ve kıyas
                satırının çubuğu. Sayfanın kendi satırı bunu okumuyor, o mavi
                kalıyor ("dubai mavi olacaksa alttakiler de o ülkelerin
                renkleri"). */}
            <div
              className="txm-cmp"
              style={{ "--txm-pc": look.color } as React.CSSProperties}
            >
              <div className="txm-cmp-head">
                <p className="txm-cmp-h">Aynı rakam {peer.loc} olsaydı</p>
                {/* Seçim yalnızca kıyas satırının adını, rakamını, oranını ve
                    rengini değiştiriyor; ızgara, çubuk ve tipografi sabit.

                    SEÇİCİ BU TURDA BELİRGİNLEŞTİ ("sağ üstteki kıyas ülkesi
                    daha belirgin olsa daha iyi olur"): pil büyüdü, yazı
                    kalınlaştı, soluna ülkenin bayrağı geldi ve kenarı seçilen
                    ülkenin rengini alıyor. Bayrak <select> içine konamıyor —
                    option yalnızca metin taşır — o yüzden pilin içinde mutlak
                    konumda duruyor ve tıklamayı geçiriyor (pointer-events:
                    none), yani hedef hâlâ tek bir kontrol. */}
                <span className="txm-sel">
                  <label className="txm-sel-l" htmlFor={`${uid}-peer`}>
                    Kıyas ülkesi
                  </label>
                  <span className="txm-sel-w">
                    <span className="txm-fl txm-sel-f" aria-hidden="true">
                      {look.flag}
                    </span>
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
                    <ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                </span>
              </div>

              <div className="txm-cmp-rows">
                <div className="txm-crow" data-self="">
                  <span className="txm-crow-k">
                    <span className="txm-fl" aria-hidden="true">
                      {selfFlag}
                    </span>
                    {name}
                  </span>
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
                  <span className="txm-crow-k">
                    <span className="txm-fl" aria-hidden="true">
                      {look.flag}
                    </span>
                    {peer.name}
                  </span>
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

              {/* İkinci cümle ("düşük oran tek başına taşınma gerekçesi değil:
                  vergi, faaliyetin ve yönetimin nerede yürüdüğüne ve
                  mukimliğinize bağlı") buradan çıktı — bölümü kapatan duruş
                  dipnotu zaten aynı şeyi, daha kısa söylüyor. İki yerde
                  söylenince ikisi de okunmuyordu. */}
              <p className="txm-cmp-note">
                Yayımlanmış genel oran üzerinden temsilî kıyas; kur çevrimi yapılmıyor.
              </p>
            </div>
          </FadeUp>
        )}

        {/* ---------- oran yayımlamadığımız yerde sayı değil, gerekçe ---------- */}
        {!model && withheld && (
          <FadeUp delay={0.24}>
            {/* Burada yalnızca dağılımın neden çizilmediği yazıyor. Eskiden bu
                cümlenin devamını data.note taşıyordu ("…mali müşavir
                görüşmesinde veriyoruz"); o paragraf artık basılmıyor, çünkü
                emekli kalıbı içeriyordu ve söylediği şeyi bölümü kapatan duruş
                dipnotu daha kısa söylüyor. */}
            <p className="txm-none">
              Burada temsilî dağılım göstermiyoruz: tek bir dağılım çizmek, faaliyet
              konusuna göre değişen bir tabloyu tek bir tabloymuş gibi gösterirdi.
              Çerçeve aşağıdaki başlıklarda.
            </p>
          </FadeUp>
        )}

        {/* ---------- yayımlanmış başlıklar: YALNIZCA aracı olmayan ülkede ----------
            Dubai'de bu ızgara artık basılmıyor. Panelin başındaki "Detaylı
            hesapla" çıkışı zaten bu satırların — dilim dilim oranlar, beyan
            takvimi, KDV eşiği — çok daha ayrıntılı anlatıldığı yere gidiyor;
            özetin hemen altına dökümü de sermek ziyaretçiyi sayfada tutmak
            yerine yoruyordu.
            Koşul burada duruyor çünkü aracı olmayan ülkede (İngiltere, KKTC)
            ne panel ne kıyas çiziliyor: ızgarayı orada da kaldırmak vergi
            bölümünü başlıkla dipnot arasında bomboş bırakırdı. Yani ızgara
            "özetin yanındaki fazlalık" olduğu yerde kalktı, "tek içerik"
            olduğu yerde durdu. */}
        {!model && (
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
        )}

        {/* ---------- duruş: blok değil, kapanış dipnotu ----------
            Eskiden burada kendi kutusu, kendi soru satırı, büyük punto cevabı
            ve "Mali müşavire danışın" butonu olan bir blok vardı. Duruş
            firmanın resmî politikası, o yüzden metin ekrandan kalkmadı; ama
            bir ziyaretçinin okumadan geçtiği yerde üç kutu yer kaplamasının
            gereği yok. Soru, cevabın "Hayır." ile başlayabilmesi için inline
            giriş olarak duruyor — tek başına bırakılsa cevap havada kalırdı.
            data.note buradan çıktı: aynı şeyi altı satırda söylüyordu ve
            metninde emekliye ayrılan "mali müşavir" kalıbı geçiyordu. */}
        <FadeUp delay={0.32}>
          <div className="txm-foot">
            <p className="txm-foot-t">
              <b>{STANCE_Q}</b> {STANCE_A}
            </p>
            <AskCta />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
