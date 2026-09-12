"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CalendarRange,
  Check,
  ChevronDown,
  Coins,
  Info,
  Layers,
  Scale,
  TriangleAlert,
  Wallet,
} from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_NAME, COUNTRY_ORDER } from "@/lib/brand";
import { ESTIMATE_NOTE, UAE_CT, needsConfirm, ruleOf } from "@/lib/tools/rates";
import { TOOL_BY_ID, kvHref } from "@/lib/tools/catalog";
import { formatAmount, formatPercent, parseAmount } from "@/lib/tools/num";

/* ============================================================================
   A2 · TEZGÂH — kurumlar vergisi (Dubai) düzen denemesi
   ============================================================================

   TEZ. Bu araç sitede yoktan var olmadı: ülke sayfalarında zaten bir vergi
   hesaplayıcısı var (CountryTax.tsx · .txm-, /dubai#vergi) ve müşteri aracı
   ilk isterken tam olarak onu göstermişti ("bi seçme şeyi olsun fln, dubai
   şirket kuruluş sayfasındaki hesaplayıcı gibi fln"). Yani doğru referans
   uygunluk testi değil, SİTENİN KENDİ HESAPLAYICISI. Bu aday o hesaplayıcının
   dilini tam sayfalık bir araca büyütüyor. Gece yan sütun YOK.

   .txm-'DEN AYNEN ALINAN GRAMER (sırasıyla):
     kicker satırı · etiket + rakam kutusu + sürgü aynı satırda · "Örnek
     dağılım" şeridi (iki büyük rakam + tek çubuk) · efektif oran cümlesi ·
     bayraklı karşılaştırma satırları (ad · mini çubuk · sağda tutar ve altında
     gerekçe) · kapanış dipnotu + AskCta.

   BÜYÜTÜRKEN NEYİ DEĞİŞTİRMEK GEREKTİ (ölçülerek)
   Bölüm 1120 px'lik araç sayfasına çıkınca dört yer birebir taşınamadı:

   1. KIYAS NE İLE YAPILACAK. .txm-'de kıyas BAŞKA BİR ÜLKE (PEERS_SWAP: yedi
      ülkenin genel oranı) ve orada doğru: ülke sayfasında ziyaretçi "burası mı
      orası mı" sorusunu soruyor. Araç sayfasında ülke zaten seçilmiş (adres
      /araclar/kurumlar-vergisi/dubai) ve ikinci bir ülkenin oranını aynı
      rakama uygulamak kur çevrimi olurdu — site bunu bilerek yapmıyor
      (CountryTax.tsx: "kur çevrimi yapılmıyor"). O yüzden kıyas satırlarının
      yerini HESABIN KENDİ SATIRLARI aldı: iki dilim + kalan. Gramer aynı
      (ad · mini çubuk · sağda tutar + gerekçe), kıyaslanan şey değişti —
      ülkeler değil, aynı kazancın iki dilimi.
   2. TEK ÜLKE OLUNCA SEÇİCİ BOŞALDI. .txm-'de sağ üstteki pil kıyas ülkesini
      seçiyordu. Burada o yeri DÖNEM şıkları aldı (yıllık/aylık): panelin sağ
      üstü "hesabın ikinci değişkeni" yeri ve aracın ikinci değişkeni dönem.
      Açılır kutu değil, görünür çip + gizli yerli radyo (tuzaklar.md kural 9).
   3. İKİ RAKAMDAN BİRİ KOYU BANDA ÇIKTI. .txm-'de "Şirkette kalan" ve
      "Vergiye giden" eşit ağırlıkta iki rakam. Araç sayfasında ziyaretçi tek
      bir cevap için geliyor, o yüzden "vergiye giden" tek koyu banda taşındı
      (sayfadaki TEK koyu yüzey, bir bant — yan sütun değil) ve efektif oran
      halkası onun yanına geçti. "Şirkette kalan" beyazda kaldı ve çubuk ikisini
      hâlâ birlikte gösteriyor.
   4. SÜRGÜNÜN ÜST SINIRI VE EŞİK İŞARETİ. .txm- 10.000.000 AED'lik sabit bir
      arayüz sınırı taşıyor. Burada sınır uydurulmadı, HAZIR ÇİPLERİN EN
      BÜYÜĞÜ (2.000.000 AED) sınır oldu; adım da sınırın seksende biri, yani
      yıllıkta 25.000 (.txm-'in adımıyla aynı sayı) ve aylıkta 2.500. Sürgünün
      üstüne dilim eşiğinin işareti kondu: eşik 375.000 AED, yani yıllık
      ölçekte %18,75'te. İşaret aracın anlattığı tek kuralı sürgünün üstünde
      görünür kılıyor.

   ORANLAR, EŞİKLER VE KURAL CÜMLESİ DEĞİŞMEDİ. Hepsi lib/tools/rates.ts'ten
   (UAE_CT) ve kural cümlesi ruleOf() ile countryContent'ten aynen geliyor;
   bu dosyada tek bir oran ya da eşik sabiti YOK. Hesap da KurumlarVergisi.tsx'
   in baeHesap()'i ile aynı üç satır (dilim tabanları · toplam · efektif oran).

   KONTRAST · .txm-'DEN BİLEREK AYRILAN TEK YER. Referansın kicker'ı
   --blue-700'ü 13,5 px'te kullanıyor (beyaz üstünde 3,99:1, normal punto eşiği
   4,5). Aynı hatayı büyütmek olurdu; buradaki kicker --blue-900 (7,14:1).
   --blue-700 yalnız BÜYÜK rakamda kaldı (clamp 28-40 px, grafik/büyük metin
   eşiği 3:1) — .txm-stat-v[data-k="keep"] da tam olarak bunu yapıyor.

   HAREKET. useReducedMotion YOK (tuzak A). Tek sürekli hareket koyu bandın
   ışığı; periyot 13007 ms asal ve kapısı CSS'te @media (prefers-reduced-
   motion: no-preference). Sayan rakam ve çubuk genişlikleri tetiklenen
   hareket: tercih yalnız useEffect içinde okunuyor.
   ========================================================================= */

/* Dönem şıkları. `kat` doğrudan çarpan; sayı tek yerde dursun diye burada.
   KurumlarVergisi.tsx · DONEMLER ile aynı iki şık, aynı ipuçları. */
const DONEMLER = [
  { key: "yillik", label: "Yıllık", ipucu: "Bir mali yılın tamamı", kat: 1 },
  { key: "aylik", label: "Aylık", ipucu: "12 ile çarpılıp yıllığa çevrilir", kat: 12 },
] as const;
type Donem = (typeof DONEMLER)[number]["key"];

const DONEM_IKON: Record<Donem, React.ReactNode> = {
  yillik: <CalendarRange size={17} strokeWidth={1.9} />,
  aylik: <CalendarDays size={17} strokeWidth={1.9} />,
};

/* Hazır tutarlar — KurumlarVergisi.tsx · HAZIR.dubai ile AYNI dizi (eşik
   rates.ts'ten, aylık karşılığı eşiğin tam on ikide biri). Burada ikinci bir
   işi daha var: dizinin SON öğesi sürgünün üst sınırı. */
const HAZIR: Record<Donem, number[]> = {
  yillik: [250_000, UAE_CT.threshold.value, 500_000, 1_000_000, 2_000_000],
  aylik: [20_000, UAE_CT.threshold.value / 12, 50_000, 100_000, 200_000],
};

/* Sürgünün sınırı ve adımı. Sınır arayüz kısıtı, vergi kuralı değil: kutuya
   daha büyük bir rakam yazılabiliyor, sürgü o rakamda sağ uca dayanıyor. */
const ust = (d: Donem) => HAZIR[d][HAZIR[d].length - 1];
const adim = (d: Donem) => ust(d) / 80;

/* Kural cümlesi ve teyit durumu modül düzeyinde bir kez: ikisi de sabit. */
const KURAL = ruleOf(UAE_CT.upper);
const TEYIT = needsConfirm(UAE_CT.lower, UAE_CT.upper, UAE_CT.threshold);
/* Kabuğun zorunlu "ne değil" satırı defterden; bu adayda açılırın içinde. */
const NE_DEGIL = TOOL_BY_ID["kurumlar-vergisi"].isNot;

/* Hesap · KurumlarVergisi.tsx · baeHesap() ile bayt bayt aynı mantık. Eşiğe
   kadarki kısma düşük oran, YALNIZCA aşan kısma yüksek oran. */
function baeHesap(kazanc: number) {
  const altTaban = Math.min(kazanc, UAE_CT.threshold.value);
  const ustTaban = Math.max(0, kazanc - UAE_CT.threshold.value);
  const vergi = altTaban * UAE_CT.lower.value + ustTaban * UAE_CT.upper.value;
  return { altTaban, ustTaban, vergi, efektif: kazanc > 0 ? vergi / kazanc : 0 };
}

/* ------------------------------------------------------------ SAYAN RAKAM
   Değer değişince eski değerden yenisine sayıyor. İlk basışta saymıyor:
   sunucu ile tarayıcı aynı sayıyı basıyor, hidrasyon farkı doğmuyor.

   HAREKET KAPISI useEffect İÇİNDE (tuzak A): render ağacında hiçbir dal
   tercihe bakmıyor. Gizli sekmede de anında yazıyor — tuzak N'de rAF donuk
   ve sayı eski değerde kalırdı.

   Erişilebilirlik: bu bileşen GÖRÜNEN rakamı basıyor ve çağıran yerde
   aria-hidden bir kabın içinde duruyor; kesin değeri role="status" kabındaki
   görünmez METİN duyuruyor (aria-label değil — tuzak G-2). */
const SAY_MS = 520;
const yavasla = (p: number) => 1 - Math.pow(1 - p, 4);

function Sayi({ deger, yuzde = false, ondalik = 0 }: { deger: number; yuzde?: boolean; ondalik?: number }) {
  const [goster, setGoster] = useState(deger);
  const son = useRef(deger);

  useEffect(() => {
    const bas = son.current;
    if (bas === deger) return;
    const anlik =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.hidden;
    if (anlik) {
      const z = window.setTimeout(() => {
        son.current = deger;
        setGoster(deger);
      }, 0);
      return () => window.clearTimeout(z);
    }
    let raf = 0;
    let t0 = -1;
    const kare = (t: number) => {
      if (t0 < 0) t0 = t;
      const p = Math.min((t - t0) / SAY_MS, 1);
      const v = p >= 1 ? deger : bas + (deger - bas) * yavasla(p);
      son.current = v;
      setGoster(v);
      if (p < 1) raf = window.requestAnimationFrame(kare);
    };
    raf = window.requestAnimationFrame(kare);
    return () => window.cancelAnimationFrame(raf);
  }, [deger]);

  return <>{yuzde ? formatPercent(goster, ondalik) : formatAmount(goster, ondalik)}</>;
}

/* Oranı taşıyan değişken birimsiz (tuzak J): birimi CSS veriyor. */
const oran = (n: number) => Math.min(1, Math.max(0, Number.isFinite(n) ? n : 0));
const w = (n: number) => ({ "--ad2-w": oran(n) }) as React.CSSProperties;

/* ============================================================ BİLEŞEN ==== */

export default function AracDili2() {
  const uid = useId();
  const [donem, setDonem] = useState<Donem>("yillik");
  const [yazi, setYazi] = useState("500.000");

  const girilen = parseAmount(yazi);
  const kat = DONEMLER.find((d) => d.key === donem)!.kat;
  /* Hesap her zaman YILLIK kazanç üzerinden; dönem yalnız girdiyi çeviriyor. */
  const kazanc = girilen === null ? null : girilen * kat;
  const okunamadi = yazi.trim() !== "" && girilen === null;
  const ornekte = yazi === "500.000";

  const r = kazanc === null ? null : baeHesap(kazanc);
  const kalan = kazanc !== null && r ? kazanc - r.vergi : 0;
  const pay = (v: number) => (kazanc && kazanc > 0 ? v / kazanc : 0);

  const c = UAE_CT.currency;
  const surguUst = ust(donem);
  const surguDeger = Math.min(girilen ?? 0, surguUst);
  /* Eşik işaretinin sürgüdeki yeri: dilim eşiği, dönemin birimine çevrili. */
  const esikIz = UAE_CT.threshold.value / kat / surguUst;

  /* Dönem değişince kutudaki rakam TAŞINMIYOR: 500.000 aylık okunursa yıllık
     6.000.000 olurdu ve kimsenin yazmadığı bir sayı ekrana düşerdi. Yeni
     dönemin örnek tutarı diziden geliyor (yıllık 500.000, aylık 50.000 —
     ikisi de HAZIR'ın ortası). */
  const donemDegis = (d: Donem) => {
    setDonem(d);
    setYazi(formatAmount(HAZIR[d][2]));
  };

  return (
    <section className="sec-pad ad2">
      <div className="container-o">
        {/* ---------------------------------------------------- künye satırı
            Aracın adı + ülkesi solda, ülke yolu sağda. Ülke seçimi BAĞLANTI:
            her ülkenin kendi adresi var (kvHref) ve seçim adresi değiştiriyor;
            aria-current="page" <a>'da yayımlanıyor (tuzak G).
            Pilin alt satırı (oran ipucu) burada YOK: künye aracın adıyla aynı
            hizada duruyor ve iki satırlık pil künyeyi tezgâhın başlık
            satırından yüksek yapıyordu. İpucunun bilgisi zaten tezgâhın
            içinde, kural satırında yazılı. */}
        <div className="ad2-kunye">
          <p className="ad2-kunye-b">
            <span className="ad2-fl" data-boy="l" aria-hidden="true">
              <Flag country="dubai" />
            </span>
            <span className="ad2-kunye-y">
              <span className="ad2-kunye-t">Kurumlar vergisi</span>
              <span className="ad2-kunye-a">
                {COUNTRY_NAME.dubai} · {c}
              </span>
            </span>
          </p>

          <ul className="ad2-yol">
            {COUNTRY_ORDER.map((u) => {
              const on = u === "dubai";
              return (
                <li key={u}>
                  <Link
                    href={kvHref(u)}
                    scroll={false}
                    className="ad2-yol-a"
                    data-on={on ? "" : undefined}
                    aria-current={on ? "page" : undefined}
                  >
                    <span className="ad2-fl" data-boy="s" aria-hidden="true">
                      <Flag country={u} />
                    </span>
                    {COUNTRY_NAME[u]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ======================================================= TEZGÂH ==== */}
        <div className="ad2-tezgah">
          {/* Referansın başlık satırı: solda kicker, sağda ikinci değişken.
              .txm-'de orası kıyas ülkesiydi, burada dönem. */}
          <div className="ad2-head">
            <p className="ad2-kicker">
              <Info size={15} strokeWidth={2.1} aria-hidden="true" />
              Temsilî gösterim
            </p>

            <div className="ad2-donem" role="group" aria-label="Kazanç dönemi">
              {DONEMLER.map((d) => (
                <label key={d.key} className="ad2-cip" data-on={d.key === donem ? "" : undefined}>
                  <input
                    type="radio"
                    name={`${uid}-donem`}
                    checked={d.key === donem}
                    onChange={() => donemDegis(d.key)}
                    aria-label={`${d.label}. ${d.ipucu}`}
                  />
                  <span className="ad2-cip-i" aria-hidden="true">
                    {DONEM_IKON[d.key]}
                  </span>
                  {d.label}
                  <span className="ad2-cip-m" aria-hidden="true">
                    <Check size={12} strokeWidth={2.8} />
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------- girdi satırı
              Referansın tek satırı, araç ölçüsünde: etiket · rakam kutusu ·
              sürgü. Numaralı adım testten alınan paralellik; üç adım yerine
              TEK adım var çünkü ülke adres, dönem de başlık satırında.
              1fr değil minmax(0, 1fr) (tuzak B): sürgünün doğal genişliği
              izi çekiyor ve auto minimum dar ekranda satırı taşırıyor. */}
          <div className="ad2-ctl">
            <label className="ad2-etiket" htmlFor={`${uid}-tutar`}>
              <span className="ad2-no" aria-hidden="true">
                01
              </span>
              <span>
                {donem === "aylik" ? "Aylık" : "Yıllık"} vergiye tabi kazanç
                {/* Boşluk parantezin İÇİNDE: dışarıda metin olarak durunca
                    erişilebilir ad "kazanç(AED)" diye bitişik okunuyor. */}
                <span className="ad2-etiket-x">{` (${c})`}</span>
              </span>
            </label>

            {/* type="number" değil: tarayıcının ayrım işareti davranışı Türkçe
                binlik noktasıyla çakışıyor. inputMode="decimal" mobilde sayı
                klavyesi açıyor. */}
            <div className="ad2-kutu" data-hata={okunamadi ? "" : undefined}>
              <Coins className="ad2-kutu-i" size={18} strokeWidth={1.9} aria-hidden="true" />
              <input
                id={`${uid}-tutar`}
                className="ad2-girdi"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={yazi}
                onChange={(e) => setYazi(e.target.value)}
                /* Okunamayan girdide tarif satırı DEĞİŞİYOR: hata cümlesi
                   şeridin açıklama satırında görünür duruyor (aşağıda
                   .ad2-serit-e) ve kutunun tarifi oraya bağlanıyor. Böylece
                   hata hem ekranda okunuyor hem de alanın adının ardından
                   duyuruluyor; ikinci bir gizli metin yazmak gerekmiyor. */
                aria-describedby={okunamadi ? `${uid}-hata` : `${uid}-yardim`}
                aria-invalid={okunamadi || undefined}
              />
              <span className="ad2-birim" aria-hidden="true">
                {c}
              </span>
            </div>

            <div className="ad2-surgu">
              {/* Eşik işareti sürgünün üstünde: aracın anlattığı tek kural
                  (dilim eşiği) ölçeğin neresinde, görünür olsun.

                  ETİKET DÖNEMİN BİRİMİNDE, eşiğin kendi etiketi DEĞİL. İlk
                  yazımda burada UAE_CT.threshold.label ("375.000 AED")
                  yazıyordu ve aylık dönemde YANLIŞ oluyordu: ölçeğin sağ ucu
                  200.000 iken işaret "375.000" diyordu. İşaret doğru yerde
                  duruyordu (375.000 / 12 = 31.250) ama etiketi yıllık sayıyı
                  yazıyordu. Bölme uydurma değil: 31.250 hazır çiplerde de var
                  ve aynı kaynaktan (UAE_CT.threshold.value / 12) geliyor. */}
              <span className="ad2-esik" style={{ "--ad2-x": esikIz } as React.CSSProperties} aria-hidden="true">
                <i />
                <b>
                  Eşik · {formatAmount(UAE_CT.threshold.value / kat)} {c}
                </b>
              </span>
              <input
                className="ad2-range"
                type="range"
                min={0}
                max={surguUst}
                step={adim(donem)}
                value={surguDeger}
                onChange={(e) => setYazi(formatAmount(Number(e.target.value)))}
                aria-label={`${donem === "aylik" ? "Aylık" : "Yıllık"} vergiye tabi kazanç sürgüsü (${c})`}
                aria-valuetext={`${formatAmount(surguDeger)} ${c}`}
                style={{ "--ad2-p": `${(surguDeger / surguUst) * 100}%` } as React.CSSProperties}
              />
              <p className="ad2-olcek">
                <span>0</span>
                <span>
                  {formatAmount(surguUst)} {c}
                </span>
              </p>
            </div>
          </div>

          {/* Hazır tutarlar: düğme, bağlantı değil — sayfayı değiştirmiyor,
              kutuyu dolduruyor. Seçili olan işaretli ki kişi kendi yazdığı
              sayıyla çipten geleni ayırt edebilsin. */}
          <div className="ad2-hazir">
            <span className="ad2-hazir-k">Hazır tutarlar</span>
            {HAZIR[donem].map((h) => (
              <button
                key={h}
                type="button"
                className="ad2-hazir-b"
                data-on={girilen === h ? "" : undefined}
                onClick={() => setYazi(formatAmount(h))}
              >
                {formatAmount(h)}
              </button>
            ))}
          </div>

          <p id={`${uid}-yardim`} className="ad2-yardim">
            {ornekte && <b>Kutudaki tutar bir örnek. </b>}
            Ciro değil, vergiye tabi kazanç. Binlik ayracı nokta, ondalık virgül.
          </p>

          {/* ------------------------------------------- sonuç · TEK KOYU BANT
              Sayfadaki tek koyu yüzey ve bir BANT: yan sütun değil, tezgâhın
              içinde tek satır. Referansın iki büyük rakamından biri ("Vergiye
              giden") buraya çıktı, efektif oran halkası yanına geldi.
              role="status" kabı HEP DOM'da: canlı bölge sonradan eklenirse
              ekran okuyucu ilk duyuruyu yutuyor. Sayan rakam aria-hidden,
              kesin değer görünmez METİN. */}
          <div className="ad2-bant" role="status" aria-live="polite">
            <span className="ad2-bant-isik" aria-hidden="true" />

            <div className="ad2-bant-s" aria-hidden="true">
              <p className="ad2-bant-k">
                <Scale size={14} strokeWidth={1.9} aria-hidden="true" />
                Hesaplanan kurumlar vergisi
              </p>
              <p className="ad2-bant-n">
                {r === null ? (
                  <span className="ad2-bant-bos">—</span>
                ) : (
                  <>
                    <Sayi deger={r.vergi} />
                    <span className="ad2-bant-c">{c}</span>
                  </>
                )}
              </p>
            </div>

            {r !== null && (
              <div className="ad2-halka-s" aria-hidden="true">
                {/* data-sifir: eşik altındaki kazançta oran 0 ve yuvarlak uçlu
                    çizgi sıfır uzunlukta bile bir NOKTA basıyordu — halkanın
                    tepesinde sebepsiz bir benek duruyordu. Sıfırda uç düz. */}
                <span
                  className="ad2-halka"
                  data-sifir={r.efektif === 0 ? "" : undefined}
                  style={w(r.efektif / UAE_CT.upper.value)}
                >
                  <svg viewBox="0 0 68 68">
                    <circle className="ad2-halka-r" cx="34" cy="34" r="30" />
                    <circle className="ad2-halka-d" cx="34" cy="34" r="30" />
                  </svg>
                  <span className="ad2-halka-m">
                    <Sayi deger={r.efektif} yuzde ondalik={2} />
                  </span>
                </span>
                <p className="ad2-halka-t">
                  <b>Efektif oran</b>
                  <span>
                    Üst oran {UAE_CT.upper.label}; eşiğe kadarki kısma {UAE_CT.lower.label}.
                  </span>
                </p>
              </div>
            )}

            {/* Görünmez METİN, aria-label değil: rolsüz öğede aria yayımlanmıyor
                (tuzak G-2). Hata cümlesi burada TEKRAR EDİLMİYOR — o, kutunun
                aria-describedby'ına bağlı görünür satırda duruyor; iki yerden
                birden duyurulsa aynı cümle iki kez okunurdu. */}
            <span className="sr-only">
              {r === null
                ? "Henüz hesap yok."
                : `Hesaplanan kurumlar vergisi ${formatAmount(r.vergi)} ${c}. Temsilî efektif oran ${formatPercent(r.efektif, 2)}.`}
            </span>
          </div>

          {/* --------------------------------------------- "Örnek dağılım" şeridi
              Referansın korunan parçası: başlık satırı, büyük rakam ve tek
              çubuk. Buradaki tek fark, iki rakamdan birinin koyu banda
              çıkması — çubuk ikisini hâlâ birlikte gösteriyor. */}
          <div className="ad2-serit">
            <p className="ad2-serit-h">
              <span>Örnek dağılım</span>
              <span className="ad2-serit-v">
                {kazanc === null ? "rakam girilmedi" : `${formatAmount(kazanc)} ${c} üzerinden`}
              </span>
            </p>

            {/* Etiket ÜSTTE, rakam altında — referansın .txm-stat'ı da dikey
                yığın. İlk yazımda ikisi satırın iki ucuna dağılmıştı ve
                1120 px'lik kapta arada 700 px boşluk kalıyordu: rakam kendi
                etiketinden uzak düşünce "neyin rakamı" okunmuyordu. */}
            <p className="ad2-kalan" aria-hidden="true">
              <span className="ad2-kalan-k">
                <i data-k="kalan" />
                Şirkette kalan
              </span>
              {/* Boş hâlde büyük mavi bir tire kalıyordu ve "sonuç" gibi
                  okunuyordu; boşluğun kendi sönük biçimi var. */}
              {r === null ? (
                <b className="ad2-kalan-v" data-bos="">
                  —
                </b>
              ) : (
                <b className="ad2-kalan-v">
                  <Sayi deger={kalan} />
                  <span className="ad2-kalan-c">{c}</span>
                </b>
              )}
            </p>

            <span className="ad2-cubuk" aria-hidden="true">
              <span className="ad2-cubuk-p" data-k="kalan" style={w(pay(kalan))} />
              <span className="ad2-cubuk-p" data-k="vergi" style={w(pay(r?.vergi ?? 0))} />
            </span>

            {/* Şeridin TEK açıklama satırı üç işi birden yapıyor: hesabın
                cümlesi, boş kutunun daveti ve okunamayan girdinin gerekçesi.
                Hata için ayrı bir kutu açmak bölüme dördüncü bir blok
                eklerdi; aynı satırın kırmızı hâli yeterli ve kutunun tarifi
                buraya bağlı (yukarıda aria-describedby). */}
            <p
              id={`${uid}-hata`}
              className="ad2-serit-e"
              data-hata={okunamadi ? "" : undefined}
            >
              {okunamadi
                ? `“${yazi}” bir tutar olarak okunamadı. Yalnızca rakam kullanın; binlik ayracı nokta, ondalık virgül.`
                : r === null
                  ? "Bir rakam yazın, dağılım burada oluşsun."
                  : kazanc !== null && kazanc <= UAE_CT.threshold.value
                    ? `Kazanç ${UAE_CT.threshold.label} eşiğini aşmıyor; tamamına ${UAE_CT.lower.label} uygulanıyor.`
                    : `Oran kazancın tamamına değil, ${UAE_CT.threshold.label} eşiğini aşan kısmına uygulanıyor.`}
            </p>
          </div>
        </div>

        {/* ================================================ HESABIN SATIRLARI
            Referansın kıyas satırlarının grameri (ad · mini çubuk · sağda
            tutar, altında gerekçe), kıyaslanan şey değişmiş hâliyle: ülkeler
            değil aynı kazancın iki dilimi. Mini çubuklar kazancın tamamına
            oranlı, yani üçü tek ölçekte okunuyor.
            Gerçek <dl>: satırın adı ile tutarı "terim · değer" ilişkisi. */}
        {r !== null && kazanc !== null && (
          <dl className="ad2-satirlar">
            {donem === "aylik" && girilen !== null && (
              <div className="ad2-satir">
                <dt>
                  <span className="ad2-disk" aria-hidden="true">
                    <CalendarDays size={15} strokeWidth={1.9} />
                  </span>
                  <span className="ad2-satir-b">
                    <span className="ad2-satir-t">Yıllık kazanç</span>
                    <span className="ad2-satir-a">Aylık {formatAmount(girilen)} × 12</span>
                  </span>
                </dt>
                <span className="ad2-mini" aria-hidden="true">
                  <span data-k="tam" style={w(1)} />
                </span>
                <dd>
                  <b>{formatAmount(kazanc)}</b>
                  <span className="ad2-satir-c">{c}</span>
                </dd>
              </div>
            )}

            <div className="ad2-satir">
              <dt>
                <span className="ad2-disk" aria-hidden="true">
                  <Layers size={15} strokeWidth={1.9} />
                </span>
                <span className="ad2-satir-b">
                  <span className="ad2-satir-t">{UAE_CT.threshold.label} ve altı</span>
                  <span className="ad2-satir-a">
                    {formatAmount(r.altTaban)} × {UAE_CT.lower.label}
                  </span>
                </span>
              </dt>
              <span className="ad2-mini" aria-hidden="true">
                <span data-k="sonuk" style={w(pay(r.altTaban))} />
              </span>
              <dd>
                <b>{formatAmount(r.altTaban * UAE_CT.lower.value)}</b>
                <span className="ad2-satir-c">{c}</span>
              </dd>
            </div>

            <div className="ad2-satir">
              <dt>
                <span className="ad2-disk" aria-hidden="true">
                  <Layers size={15} strokeWidth={1.9} />
                </span>
                <span className="ad2-satir-b">
                  <span className="ad2-satir-t">Eşiği aşan kısım</span>
                  <span className="ad2-satir-a">
                    {formatAmount(r.ustTaban)} × {UAE_CT.upper.label}
                  </span>
                </span>
              </dt>
              <span className="ad2-mini" aria-hidden="true">
                <span data-k="mavi" style={w(pay(r.ustTaban))} />
              </span>
              <dd>
                <b>{formatAmount(r.ustTaban * UAE_CT.upper.value)}</b>
                <span className="ad2-satir-c">{c}</span>
              </dd>
            </div>

            {/* TOPLAM SATIRI İKİ DİLİMİN TOPLAMI, "kalan" DEĞİL. İlk yazımda
                burada "Vergi sonrası kalan" duruyordu ve aynı rakam şeritte
                "Şirkette kalan" adıyla zaten büyükçe yazılıydı: tek sayının
                iki adı vardı ve döküm de toplanmıyordu. Şimdi satırlar
                gerçekten toplanıyor (0 + 11.250 = 11.250) ve kalan tek bir
                yerde, şeritte duruyor. Mini çubuk verginin kazanca oranı:
                aracın anlattığı şeyin resmi tam olarak o küçük paydır. */}
            <div className="ad2-satir" data-toplam="">
              <dt>
                <span className="ad2-disk" aria-hidden="true">
                  <Wallet size={15} strokeWidth={1.9} />
                </span>
                <span className="ad2-satir-b">
                  <span className="ad2-satir-t">Ödenecek kurumlar vergisi</span>
                  <span className="ad2-satir-a">
                    {formatAmount(r.altTaban * UAE_CT.lower.value)} +{" "}
                    {formatAmount(r.ustTaban * UAE_CT.upper.value)} {c}
                  </span>
                </span>
              </dt>
              <span className="ad2-mini" aria-hidden="true">
                <span data-k="vergi" style={w(pay(r.vergi))} />
              </span>
              <dd>
                <b>
                  <Sayi deger={r.vergi} />
                </b>
                <span className="ad2-satir-c">{c}</span>
              </dd>
            </div>
          </dl>
        )}

        {/* ----------------------------------------------------- kural + kaynak
            Kutu değil, dipnot: üstünde 1 px ayraç, solunda disk. Cümle
            countryContent'teki DOĞRULANMIŞ satırdan aynen (ruleOf); kaynak
            çipi oranın sitede yayımlandığı yere gidiyor. Teyit satırı
            saklanmıyor ama bir paragrafla da söylenmiyor. */}
        {KURAL && (
          <div className="ad2-kural">
            <span className="ad2-disk" data-boy="m" aria-hidden="true">
              <Scale size={19} strokeWidth={1.9} />
            </span>
            <div className="ad2-kural-b">
              <p className="ad2-kural-k">Uygulanan kural</p>
              <p className="ad2-kural-t">
                {KURAL.value}. {KURAL.note}
              </p>
              <div className="ad2-kural-alt">
                <SmartLink className="ad2-kaynak" href="/dubai#vergi">
                  Dubai vergi çerçevesi
                  <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
                </SmartLink>
                {TEYIT && (
                  <p className="ad2-teyit">
                    <TriangleAlert size={14} strokeWidth={2} aria-hidden="true" />
                    <span>Oran ve eşik mali müşavir onayından henüz geçmedi.</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Kapanış dipnotu + soru çıkışı — referansın .txm-foot'u. */}
        <div className="ad2-dip">
          <p className="ad2-dip-t">{ESTIMATE_NOTE}</p>
          <AskCta />
        </div>

        {/* Derinlik açılırda: yüzey taranarak anlaşılıyor. Kapalı <details>
            içeriği Google'da normal indeksleniyor, yani metin kaybolmuyor. */}
        <div className="ad2-derin-l">
          <details className="ad2-derin">
            <summary className="ad2-derin-s">
              <span className="ad2-disk" aria-hidden="true">
                <CalendarDays size={15} strokeWidth={1.9} />
              </span>
              <span className="ad2-derin-b">
                <span className="ad2-derin-t">Aylık tutar nasıl çevriliyor</span>
                <span className="ad2-derin-h">
                  12 ile çarpılıyor; on iki ay birbirine eşit sayılıyor.
                </span>
              </span>
              <ChevronDown className="ad2-derin-c" size={16} strokeWidth={2} aria-hidden="true" />
            </summary>
            <div className="ad2-derin-g">
              Vergi yılın tamamındaki vergiye tabi kazanç üzerinden hesaplanıyor. Aylık
              seçildiğinde girdiğiniz tutar 12 ile çarpılıyor ve çarpım hesabın ilk satırında
              yazıyor. Aylarınız birbirinden farklıysa yıllık toplamı yazmak daha doğru sonuç
              verir.
            </div>
          </details>

          <details className="ad2-derin">
            <summary className="ad2-derin-s">
              <span className="ad2-disk" aria-hidden="true">
                <Info size={15} strokeWidth={1.9} />
              </span>
              <span className="ad2-derin-b">
                <span className="ad2-derin-t">Bu araç ne değil</span>
                <span className="ad2-derin-h">Vergi beyanı ya da vergi görüşü değil.</span>
              </span>
              <ChevronDown className="ad2-derin-c" size={16} strokeWidth={2} aria-hidden="true" />
            </summary>
            <div className="ad2-derin-g">{NE_DEGIL}</div>
          </details>
        </div>
      </div>
    </section>
  );
}
