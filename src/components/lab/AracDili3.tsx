"use client";

import { useId, useState, type ReactNode } from "react";
import {
  Ban,
  CalendarDays,
  CalendarRange,
  Check,
  ChevronDown,
  Coins,
  FileSignature,
  Globe,
  Landmark,
  Layers,
  Minus,
  Percent,
  Receipt,
  Scale,
  Timer,
  TriangleAlert,
  Wallet,
} from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { Sayac } from "@/components/tools/ToolShell";
import { COUNTRY_NAME, COUNTRY_ORDER, type CountrySlug } from "@/lib/brand";
import {
  ESTIMATE_NOTE,
  KKTC_CT,
  UAE_CT,
  UK_CT,
  needsConfirm,
  ruleOf,
} from "@/lib/tools/rates";
import { TOOL_BY_ID, kvHref } from "@/lib/tools/catalog";
import { formatAmount, formatPercent, parseAmount } from "@/lib/tools/num";

/* ============================================================================
   ADAY A3 · KART — /lab/arac-dili üçüncü bölüm
   ============================================================================

   TEZ: AİDİYET. Bir önceki tur her araca zorla iki panelli bir kurgu giydirdi
   (solda beyaz çalışma paneli, sağda gece "defter") ve müşteri onu geri
   çevirdi: "tüm araçlarda sağ tarafa siyah alan koy onun içinde dönsün her şey
   gibi bir şey demedimki sana amk ben."

   Bu adayın cevabı yeni bir yerleşim değil: araç sayfası sitenin geri
   kalanından AYRI BİR GEZEGEN OLMASIN. Site bölümlerini kartlarla anlatıyor
   (ana sayfada .hx-card, bentoda .bn-tile, muhasebede .svm- kartları); araç da
   onlardan biri gibi dursun. Sayfayı açan "bu Ortac'ın bir sayfası" desin,
   "bu bir uygulama" demesin.

   DEVRALINAN REÇETE — ÖLÇÜLDÜ, KOPYALANMADI (12.09.2026 · 1440 px · / sayfası,
   getComputedStyle):
     .hx-card    kenarlık 1px rgb(230,230,230) · köşe 28px · zemin #ffffff
     .hx-stage   dolgu 24px · zemin rgb(8,8,8)
     .hx-body    dolgu 22px 24px 0
     .hx-t       19px / 600 / -0,342px (-0,018em) / satır 23,75px / #080808
     .hx-l       14,5px / satır 23,2px (1,6) / #5c5c5c
     .bn-tile    dolgu 26px · köşe 28px · kenarlık rgb(230,230,230)
   Kartın gövde dolgusu bu ikisinin ortasında (26px, .bn-tile) ve sahne
   .hx-stage'in 24'ünden büyütüldü (28px): sahne bu kartta bir çizim değil
   sonucun kendisi, yani daha çok nefes istiyor.

   GECE YÜZEY UYDURULMADI. Sahne koyu ama bu bir "yan panel" değil: sitenin
   kendi kart reçetesinde zaten BEYAZ KARTIN İÇİNDE GECE BİR SAHNE var
   (.hx-card > .hx-stage, globals.css). A3 o eşleşmeyi aynen kullanıyor,
   yalnız sahnenin içine çizim yerine SONUÇ koyuyor. Sağda duran, içinde her
   şeyin döndüğü bir panel yok; koyu olan tek şey kartın baş bandı.

   SONUÇ EN ÜSTTE. Aranan şey vergi rakamı; kart onunla açılıyor, girdiler
   altında, ayrıntı kartın altındaki açılırlarda. Bu, reddedilen kurgunun
   tersi: orada sonuç sağdaki sütunun içindeydi ve göz önce formu tarıyordu.

   NUMARALI ADIM YOK — BU BİLEREK. Reddedilen kurguda alanlar "1 · Ülke",
   "2 · Dönem", "3 · Tutar" diye numaralıydı ve künyede bir "03 / 03" sayacı
   vardı. Numara ve sayaç bir SIRA vaat ediyor; on bir soruluk uygunluk
   testinde doğru, üç alanı aynı anda gören bir kartta ise kartı sihirbaza
   çeviriyor. Burada alanların yalnız ikonu ve adı var.

   İKON · BAYRAK · KONTRAST (müşterinin gerçekten istediği üç şey, duruyor):
     ikon   lucide-react, strokeWidth 1,9 — sitenin ölçüsü
     bayrak künyede (22px) ve üç ülke bağlantısında (34px), kapları SABİT
            PİKSEL + overflow:hidden (tuzak H: Flag çıplak <svg> basıyor,
            kapsız 300×150'ye şişiyor)
     kontrast sahne #080808 üstünde beyaz rakam; beyaz metin --blue-700
            üstüne HİÇ konmadı (3,99:1, yasak). Ölçülen değerler CSS'te.

   DİNAMİZM üç yerde ve üçü de kartın BAŞINDA, yani göz zaten oradayken:
     1. rakam sayarak değişiyor (ToolShell · Sayac — hazır ve doğru çözülmüş:
        tuzak A'nın kapısı useEffect içinde, gizli sekmede rAF donuyor diye
        anlık yazıyor, ara kareler ekran okuyucuya gitmiyor)
     2. sonuç değişince sahnenin üstünden bir kez ışık geçiyor (.ad3-isik,
        React anahtarı değişince düğüm sökülüp takılıyor, JS'te zamanlayıcı
        yok)
     3. sürekli aktarım zinciri: bayrak → halka → bant (aktarim.css kalıbı,
        periyot 18773 ms — gerekçe CSS'te)

   HESAP MANTIĞI DEĞİŞMEDİ. baeHesap ve ingHesap aşağıda, canlı dosyadan
   (components/tools/KurumlarVergisi.tsx) BAYT BAYT kopya. Lab dosyası bir gün
   silinecek; hesabın kalıcı yeri orası. Oran, eşik, kural cümlesi ve kaynak
   çipi tek kaynaktan geliyor (lib/tools/rates.ts + countryContent.ts), bu
   dosyada tek bir sabit sayı yok.

   ÜLKE SEÇİMİ LAB'DE YERİNDE DEĞİŞİYOR. Canlıda üç ülke üç AYRI ADRES
   (/araclar/kurumlar-vergisi/{dubai,ingiltere,kktc}) ve seçim gerçek bir
   bağlantı; o kurguya dokunulmadı. Ama bir lab sayfasında bağlantı ziyaretçiyi
   labın dışına atardı ve müşteri üç ülkenin düzenini karşılaştıramazdı. O
   yüzden bağlantılar canlıdaki href'lerini (catalog · kvHref) ve aria-current
   işaretini AYNEN taşıyor, yalnız labda tıklama durduruluyor. Cmd+tık ve orta
   tık hâlâ gerçek adrese gidiyor.
   ========================================================================= */

/* Hesap yapılan ülkeler. KKTC bu birleşimde bilerek yok (canlı dosyadaki
   aynı karar): tip düzeyinde "KKTC için tutar tutulmuyor" demek bu. */
type HesapUlke = Exclude<CountrySlug, "kktc">;

const DONEMLER = [
  { key: "yillik", label: "Yıllık", hint: "Bir mali yılın tamamı" },
  { key: "aylik", label: "Aylık", hint: "12 ile çarpılıp yıllığa çevrilir" },
] as const;
type Donem = (typeof DONEMLER)[number]["key"];

const DONEM_IKON: Record<Donem, ReactNode> = {
  yillik: <CalendarRange size={18} strokeWidth={1.9} />,
  aylik: <CalendarDays size={18} strokeWidth={1.9} />,
};

/* Örnek girdiler, iddia değil — canlı dosyadaki HAZIR tablosunun aynısı ve
   sınır değerleri yine rates.ts'ten okunuyor. */
const HAZIR: Record<HesapUlke, Record<Donem, number[]>> = {
  dubai: {
    yillik: [250_000, UAE_CT.threshold.value, 500_000, 1_000_000, 2_000_000],
    aylik: [20_000, UAE_CT.threshold.value / 12, 50_000, 100_000, 200_000],
  },
  ingiltere: {
    yillik: [30_000, UK_CT.lower.value, 100_000, UK_CT.upper.value, 500_000],
    aylik: [2_500, 5_000, 10_000, 20_000, 50_000],
  },
};

const ULKE_IPUCU: Record<CountrySlug, string> = {
  dubai: `${UAE_CT.currency} · iki dilim`,
  ingiltere: `${UK_CT.currency} · iki sınır`,
  kktc: "Oran yayımlanmıyor",
};

const TERIM: Record<HesapUlke, { ad: string; Ad: string; ornek: string }> = {
  dubai: { ad: "kazanç", Ad: "Kazanç", ornek: "500.000" },
  ingiltere: { ad: "kâr", Ad: "Kâr", ornek: "100.000" },
};

const BAE_KURAL = ruleOf(UAE_CT.upper);
const BAE_TEYIT = needsConfirm(UAE_CT.lower, UAE_CT.upper, UAE_CT.threshold);
const ING_TEYIT = needsConfirm(UK_CT.small, UK_CT.main, UK_CT.lower, UK_CT.upper, UK_CT.fraction);
const KKTC_SATIR = ruleOf(KKTC_CT);
const KKTC_BEYAN = ruleOf({ repoRow: { country: "kktc", label: "Beyan yükümlülüğü" } });

/* İki sınır arasında her ek sterlinin vergisi: ana oran + standart kesir.
   Türetme canlı dosyanın başında; burada yeniden yazılmıyor. */
const ING_MARJ = formatPercent(UK_CT.main.value + UK_CT.fraction.value, 1);

/* Kabuğun (ToolShell) zorunlu "ne değil" satırı defterden geliyor. Labda
   kabuk yok ama satır burada basılıyor: aday, canlıda görüleceği yığının
   tamamını göstersin. */
const NE_DEGIL = TOOL_BY_ID["kurumlar-vergisi"].isNot;

/* --- hesap · canlı dosyadan bayt bayt kopya, tek satır değişmedi --------- */

function baeHesap(profit: number) {
  const lowerBase = Math.min(profit, UAE_CT.threshold.value);
  const upperBase = Math.max(0, profit - UAE_CT.threshold.value);
  const tax = lowerBase * UAE_CT.lower.value + upperBase * UAE_CT.upper.value;
  const effective = profit > 0 ? tax / profit : 0;
  return { lowerBase, upperBase, tax, effective };
}

type IngBant = "kucuk" | "arada" | "ana";

function ingHesap(n: number, a: number = n) {
  const { small, main, lower, upper, fraction } = UK_CT;
  let bant: IngBant;
  let anaVergi = 0;
  let indirim = 0;
  let vergi: number;

  if (a <= lower.value) {
    bant = "kucuk";
    vergi = Math.round(n * small.value);
  } else if (a >= upper.value) {
    bant = "ana";
    anaVergi = Math.round(n * main.value);
    vergi = anaVergi;
  } else {
    bant = "arada";
    anaVergi = Math.round(n * main.value);
    indirim = Math.round(fraction.value * (upper.value - a) * (n / a));
    vergi = anaVergi - indirim;
  }

  return { bant, anaVergi, indirim, vergi, efektif: n > 0 ? vergi / n : 0 };
}

/* İngiltere ölçeğinin üç bandı. Genişlikler 1 : 2 : 1 ve bu bir GÖRSEL karar,
   sayı ekseni değil (gerekçe canlı dosyada: doğrusal çizilse alt bant okunmaz
   kalıyor). Bantların adı ve aralığı altlarında YAZILI. */
const ING_BANTLAR = [
  { pay: 1, ust: UK_CT.small.label, alt: `≤ ${formatAmount(UK_CT.lower.value)}` },
  {
    pay: 2,
    ust: "Marjinal indirim",
    alt: `${formatAmount(UK_CT.lower.value)} ile ${formatAmount(UK_CT.upper.value)}`,
  },
  { pay: 1, ust: UK_CT.main.label, alt: `≥ ${formatAmount(UK_CT.upper.value)}` },
];
const ING_BANT_NO: Record<IngBant, number> = { kucuk: 0, arada: 1, ana: 2 };

function ingImlec(p: number): number {
  const { lower, upper } = UK_CT;
  if (p <= lower.value) return 0.25 * (p / lower.value);
  if (p < upper.value) return 0.25 + 0.5 * ((p - lower.value) / (upper.value - lower.value));
  return 0.75 + 0.25 * Math.min(1, (p - upper.value) / upper.value);
}

/* Oranı taşıyan özel değişken. Birimsiz: birimi CSS veriyor (tuzak J —
   `border: 1.5 solid` geçersizdir ve kenarlık 0px hesaplanır). */
const oran01 = (n: number) => Math.min(1, Math.max(0, Number.isFinite(n) ? n : 0));

/* ================================================================= GİRİŞ == */

export default function AracDili3() {
  const [ulke, setUlke] = useState<CountrySlug>("dubai");

  return (
    <section className="sec-pad ad3-sec">
      <div className="container-o">
        <div className="ad3-app">
          {/* key={ulke}: ülke değişince kart sıfırdan kuruluyor ve tutar
              kutusu o ülkenin örneğiyle açılıyor. Canlıda aynı işi sayfa
              değişimi yapıyor (app/araclar/kurumlar-vergisi/[ulke]); taşınan
              bir tutar, AED ile GBP'yi aynı sayı sanmak demek olurdu. */}
          {ulke === "kktc" ? (
            <KktcKart onUlke={setUlke} />
          ) : (
            <HesapKart key={ulke} ulke={ulke} onUlke={setUlke} />
          )}
        </div>
      </div>
    </section>
  );
}

/* =============================================================== HESAP ==== */

function HesapKart({ ulke, onUlke }: { ulke: HesapUlke; onUlke: (u: CountrySlug) => void }) {
  const uid = useId();
  const t = TERIM[ulke];
  const [donem, setDonem] = useState<Donem>("yillik");
  const [value, setValue] = useState<string>(t.ornek);

  const girilen = parseAmount(value);
  const kat = donem === "aylik" ? 12 : 1;
  /* Hesabın tamamı YILLIK kazanç üzerinden; dönem yalnızca girdiyi çeviriyor. */
  const profit = girilen === null ? null : girilen * kat;
  const cur = ulke === "ingiltere" ? UK_CT.currency : UAE_CT.currency;

  const okunamadi = value.trim() !== "" && girilen === null;
  const ornekte = value === t.ornek;

  const bae = ulke === "dubai" && profit !== null ? baeHesap(profit) : null;
  const ing = ulke === "ingiltere" && profit !== null ? ingHesap(profit) : null;
  const vergi = bae ? bae.tax : ing ? ing.vergi : null;
  const efektif = bae ? bae.effective : ing ? ing.efektif : 0;
  const ustOran = ulke === "ingiltere" ? UK_CT.main.value : UAE_CT.upper.value;

  return (
    <>
      <article className="ad3-kart">
        {/* ---------------------------------------------------------- SAHNE
            Kartın gece baş bandı: künye, sonuç, bant. Sitenin kendi
            .hx-card > .hx-stage eşleşmesi; `akt` sınıfı aktarım zincirinin
            kabı (fare üstündeyken tur duruyor). */}
        <div className="ad3-sahne akt">
          {/* Sonuç değişince bir kez geçen ışık. Anahtar değişince React
              düğümü söküp takıyor, CSS animasyonu baştan oynuyor — JS'te
              zamanlayıcı yok. */}
          <span
            key={String(vergi ?? (okunamadi ? "hata" : "bos"))}
            className="ad3-isik"
            aria-hidden="true"
          />

          <p className="ad3-kunye">
            <span className="ad3-bayrak akt-durak" data-boy="s" aria-hidden="true">
              <Flag country={ulke} />
            </span>
            <span className="ad3-kunye-t">{COUNTRY_NAME[ulke]}</span>
            <span className="ad3-kunye-x">{cur}</span>
            <span className="ad3-kunye-s">Kurumlar vergisi</span>
          </p>

          {/* role="status" KAP HEP DOM'DA: canlı bölge sonradan eklenirse
              ekran okuyucu ilk duyuruyu yutuyor (canlı dosyadaki aynı karar). */}
          <div className="ad3-sonuc" role="status" aria-live="polite">
            <Halka oran={ustOran > 0 ? efektif / ustOran : 0} bos={vergi === null}>
              {vergi === null ? (
                <span className="ad3-halka-bos" aria-hidden="true">
                  ·
                </span>
              ) : (
                <Sayac deger={efektif} yuzde ondalik={2} />
              )}
            </Halka>

            <div className="ad3-sonuc-b">
              <span className="ad3-sonuc-k">Hesaplanan kurumlar vergisi</span>
              <p className="ad3-sonuc-n">
                {vergi === null ? (
                  <>
                    <span className="ad3-sonuc-yok" aria-hidden="true">
                      —
                    </span>
                    <span className="sr-only">Henüz hesap yok.</span>
                  </>
                ) : (
                  <>
                    <Sayac deger={vergi} />
                    <span className="ad3-sonuc-c">{cur}</span>
                  </>
                )}
              </p>
              <p className="ad3-sonuc-a">
                {profit === null ? (
                  okunamadi ? (
                    <>
                      “{value}” bir tutar olarak okunamadı. Yalnızca rakam kullanın; binlik
                      ayracı nokta, ondalık virgül.
                    </>
                  ) : ulke === "dubai" ? (
                    "Kazancınızı yazın; eşiğin altı ve üstü ayrı hesaplanır."
                  ) : (
                    "Kârınızı yazın; kârın hangi sınırda kaldığına göre oran ve marjinal indirim hesaplanır."
                  )
                ) : bae ? (
                  <BaeCumle profit={profit} />
                ) : ing ? (
                  <IngCumle r={ing} />
                ) : null}
              </p>
            </div>
          </div>

          {bae && profit !== null && <PayBandi profit={profit} r={bae} />}
          {ing && profit !== null && <OlcekBandi profit={profit} aktif={ING_BANT_NO[ing.bant]} />}

          <p className="ad3-tahmin">{ESTIMATE_NOTE}</p>
        </div>

        {/* ---------------------------------------------------------- GÖVDE
            Beyaz gövde: üç alan. Ülke tam genişlikte (üç bayrak yan yana),
            dönem ile tutar 860 pikselden sonra yan yana — tutar geniş kalsın
            diye ızgara 4 sütun, dönem 3'ünü tutar 5'ini... hayır: dönem iki
            şık, tutar bir kutu artı beş çip. Ölçü minmax(0, …fr) ile veriliyor,
            çıplak 1fr yasak (tuzak B, bu depoda dört mobil taşmanın sebebi). */}
        <div className="ad3-govde">
          <Alan ikon={<Globe size={19} strokeWidth={1.9} />} baslik="Ülke">
            <UlkeSecimi aktif={ulke} onUlke={onUlke} />
          </Alan>

          <div className="ad3-ikili">
            <Alan ikon={DONEM_IKON[donem]} baslik={`${t.Ad} dönemi`}>
              <div className="ad3-secler">
                {DONEMLER.map((d) => (
                  <label key={d.key} className="ad3-secenek" data-on={d.key === donem ? "" : undefined}>
                    {/* Açılır kutu yasak (tuzaklar.md · kural 9): görünür çip
                        + gizli yerli radyo. Radyonun adı AÇIKÇA veriliyor —
                        etiketsiz radyo bu depoda ağaçta "on" diye okundu
                        (tuzak G). */}
                    <input
                      type="radio"
                      name={`${uid}-donem`}
                      checked={d.key === donem}
                      onChange={() => setDonem(d.key)}
                      aria-label={`${d.label}. ${d.hint}`}
                    />
                    <span className="ad3-secenek-d" aria-hidden="true">
                      {DONEM_IKON[d.key]}
                    </span>
                    <span className="ad3-secenek-b">
                      <span className="ad3-secenek-t">{d.label}</span>
                      <span className="ad3-secenek-h">{d.hint}</span>
                    </span>
                    <span className="ad3-onay" aria-hidden="true">
                      <Check size={12} strokeWidth={2.8} />
                    </span>
                  </label>
                ))}
              </div>
            </Alan>

            <Alan
              ikon={<Coins size={19} strokeWidth={1.9} />}
              etiketIcin={`${uid}-tutar`}
              baslik={
                /* Boşluk parantezli kuyruğun İÇİNDE: dışarıda ayrı bir metin
                   düğümü olarak durunca erişilebilir ad "kazanç(AED)" diye
                   bitişik okunuyordu (canlı dosyada tarayıcıda ölçülmüştü). */
                <>
                  {donem === "aylik" ? "Aylık" : "Yıllık"} vergiye tabi {t.ad}
                  <span className="ad3-alan-x">{` (${cur})`}</span>
                </>
              }
            >
              {/* type="number" değil: tarayıcının ok tuşları ve yerel ayrım
                  işareti Türkçe binlik noktasıyla çakışıyor. inputMode
                  mobilde sayı klavyesi açıyor. */}
              <div className="ad3-tutar" data-hata={okunamadi ? "" : undefined}>
                <input
                  id={`${uid}-tutar`}
                  className="ad3-girdi"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder={t.ornek}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  aria-describedby={`${uid}-yardim`}
                  aria-invalid={okunamadi || undefined}
                />
                <span className="ad3-birim" aria-hidden="true">
                  {cur}
                </span>
              </div>

              <div className="ad3-hazir">
                {HAZIR[ulke][donem].map((h) => (
                  <button
                    key={h}
                    type="button"
                    className="ad3-hazir-b"
                    data-on={girilen === h ? "" : undefined}
                    onClick={() => setValue(formatAmount(h))}
                  >
                    {formatAmount(h)}
                  </button>
                ))}
              </div>

              <p id={`${uid}-yardim`} className="ad3-yardim">
                {ornekte && <b>Kutudaki tutar bir örnek. </b>}
                Ciro değil, vergiye tabi {t.ad}.
              </p>
            </Alan>
          </div>
        </div>

        {/* ------------------------------------------------------------ AYAK
            Hesabın tek satırı ve dayandığı kural. Reddedilen kurguda bunların
            yerinde bir gri kutu ile dört satırlık bir döküm tablosu vardı;
            burada hesap TEK SATIR (matrah × oran = vergi), dökümün tamamı
            kartın altındaki ilk açılırda. */}
        <div className="ad3-ayak">
          {bae && profit !== null && <BaeHesapSatiri profit={profit} r={bae} />}
          {ing && profit !== null && <IngHesapSatiri profit={profit} r={ing} />}
          {ulke === "dubai" ? <BaeKural /> : <IngKural />}
        </div>
      </article>

      {/* ------------------------------------------------------------ DERİNLİK
          "Yüzey sade, derinlik tıklamayla." Kapalı <details> içeriği Google'da
          normal indeksleniyor (bu depoda /dubai/muhasebe ile kayıtlı), yani
          metin kaybolmuyor, yer değiştiriyor. */}
      <div className="ad3-derin">
        <Derin
          ikon={<Receipt size={16} strokeWidth={1.9} />}
          baslik="Hesap nasıl çıktı"
          ipucu="Satır satır: matrah, oran, vergi ve vergi sonrası kalan."
        >
          {bae && profit !== null ? (
            <BaeDokum profit={profit} girilen={girilen} donem={donem} r={bae} />
          ) : ing && profit !== null ? (
            <IngDokum profit={profit} girilen={girilen} donem={donem} r={ing} />
          ) : (
            <p className="ad3-derin-p">
              Tutar kutusuna okunabilir bir sayı yazıldığında döküm burada satır satır çıkıyor.
            </p>
          )}
        </Derin>

        <Derin
          ikon={<CalendarDays size={16} strokeWidth={1.9} />}
          baslik="Aylık tutar nasıl çevriliyor"
          ipucu="12 ile çarpılıyor; on iki ay birbirine eşit sayılıyor."
        >
          <p className="ad3-derin-p">
            Vergi yılın tamamındaki vergiye tabi {t.ad} üzerinden hesaplanıyor. Aylık
            seçildiğinde girdiğiniz tutar 12 ile çarpılıyor ve çarpım dökümün ilk satırında
            yazıyor. Aylarınız birbirinden farklıysa yıllık toplamı yazmak daha doğru sonuç
            verir.
          </p>
        </Derin>

        {ulke === "ingiltere" && (
          <Derin
            ikon={<Timer size={16} strokeWidth={1.9} />}
            baslik="Kısa dönem ve muaf kâr payı"
            ipucu="Araç on iki aylık dönem ve muaf kâr payı olmadığı varsayımıyla hesaplıyor."
          >
            <p className="ad3-derin-p">
              Hesap dönemi on iki aydan kısaysa iki sınır aynı oranda küçülüyor. Şirketin aldığı
              bazı muaf kâr payları (exempt distributions) da sınırlarla kıyaslanan tutara
              ekleniyor. İkisi de sonucu değiştirebilir; araç ikisini de hesaba katmıyor.
            </p>
          </Derin>
        )}

        <Derin ikon={<Ban size={16} strokeWidth={1.9} />} baslik="Bu araç ne değil">
          <p className="ad3-derin-p">{NE_DEGIL}</p>
        </Derin>
      </div>
    </>
  );
}

/* ================================================================ KKTC ==== */

/* Hesap yok; sebebi sitenin kendi cümlesi (KKTC_CT.decision =
   countryContent.kktc.tax.note), burada yeniden yazılmıyor. Sahne aynı yerde
   ve aynı ağırlıkta duruyor: eksik olan hesap, ülke değil. Sayı yerine
   kararın kendisi, altında sitede yayımlanan çerçeve, gövdede sonraki adım. */
function KktcKart({ onUlke }: { onUlke: (u: CountrySlug) => void }) {
  return (
    <>
      <article className="ad3-kart">
        <div className="ad3-sahne akt" data-hesapsiz="">
          <p className="ad3-kunye">
            <span className="ad3-bayrak akt-durak" data-boy="s" aria-hidden="true">
              <Flag country="kktc" />
            </span>
            <span className="ad3-kunye-t">{COUNTRY_NAME.kktc}</span>
            <span className="ad3-kunye-s">Kurumlar vergisi</span>
          </p>

          <div className="ad3-sonuc" role="status" aria-live="polite">
            <span className="ad3-karar akt-durak" aria-hidden="true">
              <Landmark size={22} strokeWidth={1.9} />
            </span>
            <div className="ad3-sonuc-b">
              <span className="ad3-sonuc-k">{COUNTRY_NAME.kktc} · kurumlar vergisi</span>
              <p className="ad3-sonuc-n">
                <span className="ad3-sonuc-yok">Hesap yapılmıyor</span>
              </p>
              <p className="ad3-sonuc-a">{KKTC_CT.decision}</p>
            </div>
          </div>

          {/* Sitede yayımlanan çerçeve: countryContent.kktc.tax'ın vergiyle
              ilgili iki satırı; ikisi de oran içermiyor, yani kararla
              çelişmiyor. Etiket değişirse satır susuyor (ruleOf). */}
          {(KKTC_SATIR || KKTC_BEYAN) && (
            <dl className="ad3-cerceve">
              {KKTC_SATIR && (
                <div className="ad3-cerceve-s">
                  <dt>{KKTC_SATIR.label}</dt>
                  <dd>{KKTC_SATIR.value}</dd>
                </div>
              )}
              {KKTC_BEYAN && (
                <div className="ad3-cerceve-s">
                  <dt>{KKTC_BEYAN.label}</dt>
                  <dd>{KKTC_BEYAN.value}</dd>
                </div>
              )}
            </dl>
          )}
        </div>

        <div className="ad3-govde">
          <Alan ikon={<Globe size={19} strokeWidth={1.9} />} baslik="Ülke">
            <UlkeSecimi aktif="kktc" onUlke={onUlke} />
          </Alan>

          <Alan
            ikon={<FileSignature size={19} strokeWidth={1.9} />}
            baslik="Sonraki adım: yazılı teklif"
          >
            <p className="ad3-yardim">
              Size uygulanacak oranı ve istisnaları teklifte satır satır yazıyoruz.
            </p>
            <div className="ad3-eylem">
              <AskCta label="Yazılı teklif isteyin" href="/basla?ulke=kktc" />
            </div>
          </Alan>
        </div>
      </article>

      <div className="ad3-derin">
        <Derin ikon={<Ban size={16} strokeWidth={1.9} />} baslik="Bu araç ne değil">
          <p className="ad3-derin-p">{NE_DEGIL}</p>
        </Derin>
      </div>
    </>
  );
}

/* ============================================================== PARÇALAR == */

/* Gövdenin bir alanı: ikon diski + ad, altında içerik. Ad İKİ YOLDAN
   veriliyor: alanın içinde tek bir metin kutusu varsa (`etiketIcin` o kutunun
   id'si) ad <label> olarak basılıyor ve kutunun adı oluyor; yoksa kap
   role="group" + aria-labelledby. <fieldset>/<legend> denenmedi: uygunluk
   testinde ölçülmüştü, bu tarayıcıda ağaçta ADLI bir grup üretmiyor. */
function Alan({
  ikon,
  baslik,
  etiketIcin,
  children,
}: {
  ikon: ReactNode;
  baslik: ReactNode;
  etiketIcin?: string;
  children: ReactNode;
}) {
  const id = useId();
  const tId = `${id}-t`;
  return (
    <div
      className="ad3-alan"
      role={etiketIcin ? undefined : "group"}
      aria-labelledby={etiketIcin ? undefined : tId}
    >
      <div className="ad3-alan-h">
        <span className="ad3-ikon" aria-hidden="true">
          {ikon}
        </span>
        {etiketIcin ? (
          <label className="ad3-alan-t" htmlFor={etiketIcin} id={tId}>
            {baslik}
          </label>
        ) : (
          <span className="ad3-alan-t" id={tId}>
            {baslik}
          </span>
        )}
      </div>
      <div className="ad3-alan-g">{children}</div>
    </div>
  );
}

/* Üç ülke. Canlıda gerçek bağlantı ve adres değişiyor; labda tıklama
   durduruluyor (dosya başındaki ÜLKE SEÇİMİ notu). href, aria-current ve
   bayrak canlıdakiyle aynı. */
function UlkeSecimi({
  aktif,
  onUlke,
}: {
  aktif: CountrySlug;
  onUlke: (u: CountrySlug) => void;
}) {
  return (
    <ul className="ad3-ulkeler">
      {COUNTRY_ORDER.map((c) => {
        const on = c === aktif;
        return (
          <li key={c}>
            <a
              className="ad3-ulke"
              href={kvHref(c)}
              data-on={on ? "" : undefined}
              aria-current={on ? "page" : undefined}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                onUlke(c);
              }}
            >
              <span className="ad3-bayrak" data-boy="l" aria-hidden="true">
                <Flag country={c} />
              </span>
              <span className="ad3-ulke-b">
                <span className="ad3-ulke-t">{COUNTRY_NAME[c]}</span>
                <span className="ad3-ulke-h">{ULKE_IPUCU[c]}</span>
              </span>
              <span className="ad3-onay" aria-hidden="true">
                <Check size={12} strokeWidth={2.8} />
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/* Efektif oranın halkası. Halkanın dolu kısmı "üst oranın ne kadarı gerçekten
   ödeniyor" demek. Aktarım zincirinin ikinci durağı; duran parça ray, o yüzden
   akt-durak rayda (dolu yay her girdide zaten değişiyor). */
function Halka({ oran, bos, children }: { oran: number; bos?: boolean; children: ReactNode }) {
  return (
    <span className="ad3-halka" data-bos={bos ? "" : undefined}>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle className="ad3-halka-r akt-durak" cx="32" cy="32" r="27" />
        <circle
          className="ad3-halka-d"
          cx="32"
          cy="32"
          r="27"
          style={{ "--ad3-o": oran01(oran) } as React.CSSProperties}
        />
      </svg>
      <span className="ad3-halka-m">{children}</span>
    </span>
  );
}

/* BAE · kazancın iki dilimi, payları kadar. Çubuk SÜS: aynı iki tutar hemen
   altındaki göstergede ve dökümde YAZILI. Aktarım zincirinin son durağı mavi
   dilim — "eşiği aşan kısım", yani verginin geldiği yer. */
function PayBandi({ profit, r }: { profit: number; r: ReturnType<typeof baeHesap> }) {
  const pay = (v: number) => (profit > 0 ? v / profit : 0);
  return (
    <div className="ad3-bant">
      <span className="ad3-pay" aria-hidden="true">
        <span
          className="ad3-pay-p"
          data-ton="sonuk"
          style={{ "--ad3-w": oran01(pay(r.lowerBase)) } as React.CSSProperties}
        />
        <span
          className="ad3-pay-p akt-durak"
          data-ton="mavi"
          style={{ "--ad3-w": oran01(pay(r.upperBase)) } as React.CSSProperties}
        />
      </span>
      <ul className="ad3-bant-e">
        <li data-ton="sonuk">
          <i aria-hidden="true" />
          {UAE_CT.threshold.label}&apos;ye kadar · {UAE_CT.lower.label}
        </li>
        <li data-ton="mavi">
          <i aria-hidden="true" />
          Aşan kısım · {UAE_CT.upper.label}
        </li>
      </ul>
    </div>
  );
}

/* İngiltere · oran kârın dilimine değil TAMAMINA uygulanıyor, o yüzden pay
   çubuğu yerine üç rejimli bir ÖLÇEK var ve imleç kârın bulunduğu yerde.
   Aktarım zincirinin son durağı imleç: bant her girdide değişiyor ama imleç
   hep DOM'da, yani ışık her turda aynı öğeye düşüyor. */
function OlcekBandi({ profit, aktif }: { profit: number; aktif: number }) {
  const sablon = {
    gridTemplateColumns: ING_BANTLAR.map((b) => `minmax(0, ${b.pay}fr)`).join(" "),
  };
  return (
    <div className="ad3-bant">
      <span className="ad3-olcek" style={sablon} aria-hidden="true">
        {ING_BANTLAR.map((b, i) => (
          <span key={b.ust} className="ad3-olcek-b" data-on={aktif === i ? "" : undefined} />
        ))}
        <span
          className="ad3-imlec akt-durak"
          style={{ "--ad3-x": oran01(ingImlec(profit)) } as React.CSSProperties}
        />
      </span>
      <ul className="ad3-bant-e" data-olcek="" style={sablon}>
        {ING_BANTLAR.map((b, i) => (
          <li key={b.ust} data-on={aktif === i ? "" : undefined}>
            <b>{b.ust}</b>
            <span>{b.alt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Açılır satır. Gövdesi olmayan satır açılır DEĞİL — boş bir <details>
   açılınca hiçbir şey göstermez ve "bozuk" okunur. */
function Derin({
  ikon,
  baslik,
  ipucu,
  children,
}: {
  ikon: ReactNode;
  baslik: string;
  ipucu?: string;
  children: ReactNode;
}) {
  return (
    <details className="ad3-d">
      <summary className="ad3-d-s">
        <span className="ad3-ikon" data-boy="s" aria-hidden="true">
          {ikon}
        </span>
        <span className="ad3-d-b">
          <span className="ad3-d-t">{baslik}</span>
          {ipucu && <span className="ad3-d-h">{ipucu}</span>}
        </span>
        <ChevronDown className="ad3-d-c" size={16} strokeWidth={2} aria-hidden="true" />
      </summary>
      <div className="ad3-d-g">{children}</div>
    </details>
  );
}

function DokumSatir({
  ikon,
  etiket,
  alt,
  deger,
  toplam,
}: {
  ikon: ReactNode;
  etiket: ReactNode;
  alt?: ReactNode;
  deger: ReactNode;
  toplam?: boolean;
}) {
  return (
    <div className="ad3-dokum-s" data-toplam={toplam ? "" : undefined}>
      <dt>
        <span className="ad3-ikon" data-boy="s" aria-hidden="true">
          {ikon}
        </span>
        <span className="ad3-dokum-b">
          <span className="ad3-dokum-t">{etiket}</span>
          {alt && <span className="ad3-dokum-a">{alt}</span>}
        </span>
      </dt>
      <dd>{deger}</dd>
    </div>
  );
}

/* ================================================================= BAE ==== */

function BaeCumle({ profit }: { profit: number }) {
  const { threshold, lower } = UAE_CT;
  return profit <= threshold.value ? (
    <>
      Kazanç {threshold.label} eşiğini aşmıyor; tamamına {lower.label} uygulanıyor.
    </>
  ) : (
    <>Oran kazancın tamamına değil, {threshold.label} eşiğini aşan kısmına uygulanıyor.</>
  );
}

/* Hesabın TEK SATIRI. Reddedilen kurguda bu bilgi sağ panelde dört satırlık
   bir dökümdü; burada kartın ayağında bir cümle uzunluğunda ve canlı:
   "375.000 × %0 + 125.000 × %9 = 11.250 AED". */
function BaeHesapSatiri({ profit, r }: { profit: number; r: ReturnType<typeof baeHesap> }) {
  const { lower, upper, currency: c } = UAE_CT;
  return (
    <p className="ad3-hesap">
      <span className="ad3-hesap-t">
        {formatAmount(r.lowerBase)} × {lower.label}
      </span>
      <span className="ad3-hesap-o" aria-hidden="true">
        +
      </span>
      <span className="ad3-hesap-t">
        {formatAmount(r.upperBase)} × {upper.label}
      </span>
      <span className="ad3-hesap-o" aria-hidden="true">
        =
      </span>
      <span className="ad3-hesap-s">
        {formatAmount(r.tax)} {c}
      </span>
      <span className="sr-only">
        Vergi sonrası kalan {formatAmount(profit - r.tax)} {c}.
      </span>
    </p>
  );
}

function BaeDokum({
  profit,
  girilen,
  donem,
  r,
}: {
  profit: number;
  girilen: number | null;
  donem: Donem;
  r: ReturnType<typeof baeHesap>;
}) {
  const { threshold, lower, upper, currency: c } = UAE_CT;
  return (
    <dl className="ad3-dokum">
      {donem === "aylik" && girilen !== null && (
        <DokumSatir
          ikon={<CalendarDays size={14} strokeWidth={1.9} />}
          etiket="Yıllık kazanç"
          alt={`Aylık ${formatAmount(girilen)} × 12`}
          deger={formatAmount(profit)}
        />
      )}
      <DokumSatir
        ikon={<Layers size={14} strokeWidth={1.9} />}
        etiket={`${threshold.label} ve altı`}
        alt={`${formatAmount(r.lowerBase)} × ${lower.label}`}
        deger={formatAmount(r.lowerBase * lower.value)}
      />
      <DokumSatir
        ikon={<Layers size={14} strokeWidth={1.9} />}
        etiket="Eşiği aşan kısım"
        alt={`${formatAmount(r.upperBase)} × ${upper.label}`}
        deger={formatAmount(r.upperBase * upper.value)}
      />
      <DokumSatir
        toplam
        ikon={<Wallet size={14} strokeWidth={1.9} />}
        etiket="Vergi sonrası kalan"
        alt={`${formatAmount(profit)} − ${formatAmount(r.tax)} ${c}`}
        deger={formatAmount(profit - r.tax)}
      />
    </dl>
  );
}

/* Kural kartın ayağında, bir dipnot gibi. Cümle countryContent'teki
   DOĞRULANMIŞ satırdan aynen (ruleOf); kaynak çipi bu oranın sitede
   yayımlandığı yere gidiyor — resmî bir otorite adresi rates.ts'te yok ve
   uydurulmadı. */
function BaeKural() {
  if (!BAE_KURAL) return null;
  return (
    <div className="ad3-kural">
      <span className="ad3-ikon" aria-hidden="true">
        <Scale size={19} strokeWidth={1.9} />
      </span>
      <div className="ad3-kural-b">
        <p className="ad3-kural-t">
          <b>Uygulanan kural. </b>
          {BAE_KURAL.value}. {BAE_KURAL.note}
        </p>
        <p className="ad3-kural-alt">
          <SmartLink className="ad3-kaynak" href="/dubai#vergi">
            Dubai vergi çerçevesi
          </SmartLink>
          {BAE_TEYIT && (
            <span className="ad3-teyit">
              <TriangleAlert size={13} strokeWidth={2} aria-hidden="true" />
              Oran ve eşik mali müşavir onayından henüz geçmedi.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

/* =========================================================== İNGİLTERE ==== */

function IngCumle({ r }: { r: ReturnType<typeof ingHesap> }) {
  const { small, main, lower, upper, currency: c } = UK_CT;
  if (r.bant === "kucuk") {
    return (
      <>
        Kâr {lower.label} alt sınırını aşmıyor; kârın tamamına {small.label} uygulanıyor.
      </>
    );
  }
  if (r.bant === "ana") {
    return (
      <>
        Kâr {upper.label} üst sınırına ulaşıyor; kârın tamamına {main.label} uygulanıyor ve
        marjinal indirim kalmıyor.
      </>
    );
  }
  return (
    <>
      Kâr iki sınırın arasında: tamamına {main.label} uygulanıp {formatAmount(r.indirim)} {c}{" "}
      marjinal indirim düşülüyor. Bu aralıkta eklenen her sterlinin vergisi {ING_MARJ}.
    </>
  );
}

/* Eksi işareti U+2212: kısa çizgi (-) tabular rakamların yanında kısa kalıyor
   ve bir tire gibi okunuyor. */
function IngHesapSatiri({ profit, r }: { profit: number; r: ReturnType<typeof ingHesap> }) {
  const { small, main, currency: c } = UK_CT;
  return (
    <p className="ad3-hesap">
      <span className="ad3-hesap-t">
        {formatAmount(profit)} × {r.bant === "kucuk" ? small.label : main.label}
      </span>
      {r.bant !== "kucuk" && (
        <>
          <span className="ad3-hesap-o" aria-hidden="true">
            −
          </span>
          <span className="ad3-hesap-t">
            {r.indirim > 0 ? formatAmount(r.indirim) : "0"} indirim
          </span>
        </>
      )}
      <span className="ad3-hesap-o" aria-hidden="true">
        =
      </span>
      <span className="ad3-hesap-s">
        {formatAmount(r.vergi)} {c}
      </span>
      <span className="sr-only">
        Vergi sonrası kalan {formatAmount(profit - r.vergi)} {c}.
      </span>
    </p>
  );
}

/* Satırlar banda göre değişiyor: küçük kâr oranında indirim satırı YOK (o
   rejimde indirim diye bir kavram yok); ana oranda VAR ve sıfır, çünkü "neden
   indirim yok" sorusunun cevabı o satır. */
function IngDokum({
  profit,
  girilen,
  donem,
  r,
}: {
  profit: number;
  girilen: number | null;
  donem: Donem;
  r: ReturnType<typeof ingHesap>;
}) {
  const { small, main, upper, fraction, currency: c } = UK_CT;
  const p = formatAmount(profit);
  return (
    <dl className="ad3-dokum">
      {donem === "aylik" && girilen !== null && (
        <DokumSatir
          ikon={<CalendarDays size={14} strokeWidth={1.9} />}
          etiket="Yıllık kâr"
          alt={`Aylık ${formatAmount(girilen)} × 12`}
          deger={p}
        />
      )}
      {r.bant === "kucuk" ? (
        <DokumSatir
          ikon={<Percent size={14} strokeWidth={1.9} />}
          etiket="Küçük kâr oranı"
          alt={`${p} × ${small.label}`}
          deger={formatAmount(r.vergi)}
        />
      ) : (
        <>
          <DokumSatir
            ikon={<Percent size={14} strokeWidth={1.9} />}
            etiket="Ana oran"
            alt={`${p} × ${main.label}`}
            deger={formatAmount(r.anaVergi)}
          />
          <DokumSatir
            ikon={<Minus size={14} strokeWidth={1.9} />}
            etiket="Marjinal indirim"
            alt={
              r.bant === "arada"
                ? `${fraction.label} × (${formatAmount(upper.value)} − ${p})`
                : "üst sınıra ulaşıldı"
            }
            deger={r.indirim > 0 ? `−${formatAmount(r.indirim)}` : "0"}
          />
        </>
      )}
      <DokumSatir
        toplam
        ikon={<Wallet size={14} strokeWidth={1.9} />}
        etiket="Vergi sonrası kalan"
        alt={`${p} − ${formatAmount(r.vergi)} ${c}, tam sterline yuvarlı`}
        deger={formatAmount(profit - r.vergi)}
      />
    </dl>
  );
}

/* Kural cümlesinin kelimeleri burada, SAYILARI rates.ts'ten ve otoritenin
   tablosu çipte: gözden geçiren kişi üçünü yan yana görüyor. Çipin adı görünür
   metni İÇERİYOR ve yeni sekmeyi söylüyor (<a> rolü yazardan ad almayı
   destekliyor; tuzak G-2'deki <p>/<div> durumu değil). */
function IngKural() {
  const { small, main, lower, upper, fraction, source, year } = UK_CT;
  return (
    <div className="ad3-kural">
      <span className="ad3-ikon" aria-hidden="true">
        <Scale size={19} strokeWidth={1.9} />
      </span>
      <div className="ad3-kural-b">
        <p className="ad3-kural-t">
          <b>Uygulanan kural · {year}. </b>
          Kâr {lower.label} ve altındaysa tamamına {small.label}, {upper.label} ve üstündeyse
          tamamına {main.label}. Arada tamamına {main.label} uygulanıp {fraction.label} × (
          {formatAmount(upper.value)} − kâr) kadar marjinal indirim düşülüyor.
        </p>
        <p className="ad3-kural-alt">
          <a
            className="ad3-kaynak"
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GOV.UK · ${source.title}, ${source.updated} güncellemesi, yeni sekmede açılır`}
          >
            GOV.UK · {source.title}
          </a>
          {ING_TEYIT && (
            <span className="ad3-teyit">
              <TriangleAlert size={13} strokeWidth={2} aria-hidden="true" />
              Oran ve sınırlar mali müşavir onayından henüz geçmedi.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
