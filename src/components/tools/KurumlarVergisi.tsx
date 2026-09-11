"use client";

import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import { COUNTRY_NAME, COUNTRY_ORDER, type CountrySlug } from "@/lib/brand";
import {
  ESTIMATE_NOTE,
  KKTC_CT,
  UAE_CT,
  UK_CT,
  needsConfirm,
  ruleOf,
} from "@/lib/tools/rates";
import { formatAmount, formatPercent, parseAmount } from "@/lib/tools/num";

/* ============================================================================
   KURUMLAR VERGİSİ HESAPLAYICI · ülke seçimli (Dubai · İngiltere · KKTC)
   ============================================================================

   NEDEN TEK ARAÇ
   Müşteri: "Kurumlar Vergisi Hesaplama | tek araç sayfası ülke seçimiyle
   farklı farklı olacak kktc seçecek oraya göre dubai seçecek oraya göre
   ingiltere oraya göre gibi." Defter (lib/tools/catalog.ts) iki kalemi tek
   adrese indirdi: /araclar/kurumlar-vergisi. Bu dosya o adresin ekranı; BAE
   sürümü (UaeCorporateTax.tsx) bu turda SİLİNDİ ve hesabı aşağıya taşındı,
   karar kayıtları da onunla birlikte (bkz. "BAE TARAFI").

   ÜLKE SEÇİLİNCE NE DEĞİŞİYOR
   Para birimi, hazır tutar çipleri, hesabın kendisi, kural kutusu, sonuç
   cümlesi ve tablonun biçimi. Değişmeyen tek şey dönem seçimi: kişinin
   kazancını aylık mı yıllık mı düşündüğü ülkeye bağlı değil.

   HER ÜLKENİN KUTUSU AYRI (degerler)
   Ülke değişince yazılan tutar TAŞINMIYOR. Taşınsaydı "500.000" AED olarak
   yazılıp İngiltere'ye geçildiğinde aynı rakam 500.000 GBP diye hesaplanırdı:
   aynı sayı, yaklaşık beş kat farklı bir para. Kur çevrimi yapmak bir oran
   uydurmak olurdu (sitenin kıyas bölümü de çevirmiyor, CountryTax.tsx). Her
   ülke kendi kutusunu hatırlıyor; geri dönülünce yazılan geri geliyor.

   SAYILAR NEREDEN
   Tek kaynak lib/tools/rates.ts: UAE_CT · UK_CT · KKTC_CT. Bu dosyada tek bir
   oran, sınır ya da kesir sabiti YOK. Hazır çiplerdeki sınır değerleri de
   (375.000 · 50.000 · 250.000) sabit yazılmadı, rates.ts'ten okunuyor: sınır
   değişirse "tam sınırda" örneği de kendiliğinden değişir.

   ---------------------------------------------------------------------------
   BAE TARAFI · UaeCorporateTax.tsx'ten AYNEN taşındı

   NE YAPIYOR. Vergiye tabi kazancı iki dilime bölüyor — eşiğe kadarı ve eşiği
   aşan kısım — her birine kendi oranını uygulayıp toplamı ve efektif oranı
   yazıyor. Kural cümlesi yeniden yazılmıyor: ruleOf() countryContent.ts'teki
   doğrulanmış satırı getiriyor ve ekrana aynen basılıyor; gözden geçiren kişi
   kuralı ve sayıyı yan yana görüyor.

   EFEKTİF ORAN NEDEN VAR. Asıl işi yapan satır o. "%9" korkutucu bir sayı ama
   eşik altı %0 olduğu için gerçek yük her zaman daha düşük; 500.000 AED
   kazançta efektif oran %2,25. Belgenin "kaça mal olur korkusunu siler"
   dediği şeyin vergi tarafındaki karşılığı bu tek satır (belge s.4).

   DÖNEM. Müşteri: "bi seçme şeyi olsun, Dubai şirket kuruluş sayfasındaki
   hesaplayıcı gibi." "Aylık" seçilince girilen tutar 12 ile çarpılıyor, o
   kadar; çarpım ekranda da yazıyor. Varsayım (on iki ay eşit) açıkça söyleniyor.

   HAZIR TUTARLAR. Tek başına boş bir kutu "ne yazsam" diye düşündürüp aracı
   hiç kullandırmıyordu. Çipler bir İDDİA DEĞİL, birer örnek girdi; hiçbiri
   "tipik kazanç" demiyor. Aralarında sınırın kendisi bilerek var: aracın
   anlattığı şeyi tek tıkla gösteren sayı o.

   SERBEST BÖLGE MUAFİYETİ HESABA GİRMİYOR ve bu karar. countryContent.ts:
   "Serbest bölge şirketi olmak otomatik muafiyet vermiyor…". Bir kutucuk
   koysaydık araç, karşılığı olmayan bir "%0" sonucu üretirdi. Kural ekranda
   yazıyor, hesap standart oran üzerinden yürüyor.

   ---------------------------------------------------------------------------
   İNGİLTERE TARAFI · bu turda yazıldı

   DİLİMLİ DEĞİL. BAE'de oran kazancın DİLİMİNE uygulanıyor; İngiltere'de
   kârın TAMAMINA. Kâr alt sınırı aşmıyorsa tamamına %19, üst sınıra
   ulaşıyorsa tamamına %25, arada tamamına %25 uygulanıp marjinal indirim
   düşülüyor. BAE'nin dört sütunlu dilim tablosunu burada kullanmak kuralı
   yanlış anlatırdı; İngiltere tablosu "adım · hesap · tutar" diye kuruluyor
   ve indirim satırı formülü o kârın kendi sayılarıyla yazıyor.

   FORMÜL — HMRC CTM03925, harfleri kaynağınkiyle aynı:
     indirim = (F × (U − A)) × (N ÷ A)
   F standart kesir, U üst sınır, A artırılmış kâr, N vergiye tabi kâr.
   Ekranda A = N (muaf kâr payı sıfır), yani formül F × (U − N)'ye iniyor.
   Hesap fonksiyonu A'yı yine AYRI alıyor: kaynağın örneği A ≠ N ve fonksiyonu
   o örnekle sınayabilmek için. ÖLÇÜLDÜ (TypeScript'in kendi derleyicisiyle bu
   dosya olduğu gibi derlenip çağrıldı, 11.09.2026):
     GOV.UK örneği  N 90.000 · A 98.000 → ana oran 22.500 · indirim 2.094 ·
                    vergi 20.406   (kaynak: 2.094 ve 20.406, birebir)
     ekrandaki hâl  N = A = 90.000 → 22.500 − 2.400 = 20.100 · efektif %22,33

   İKİ SINIRIN ARASINDA EK KÂRIN VERGİSİ %26,5. Uydurma bir oran değil,
   formülün türevi: vergi = %25·N − F·(U − N), yani her ek sterlin %25 artı
   F = 3/200 kadar vergi ekliyor. Sonuç cümlesinde yazıyor çünkü İngiltere'nin
   "efektif oran" satırı bu: "%19 ile %25 arası" diye bilinen aralıkta ek kâr
   aslında iki orandan da ağır vergileniyor. Sayı ekranda
   formatPercent(main + fraction) ile basılıyor, elle yazılmıyor.

   YUVARLAMA · TAM STERLİN, SATIR SATIR. Ana oranla vergi ve indirim ayrı ayrı
   tam sterline yuvarlanıyor, ödenecek vergi yuvarlanmış iki satırın farkı.
   Kaynağın kendi örneği de böyle gösteriyor (2.093,88 → 2.094; 22.500 −
   2.094 = 20.406). Elenen iki yol: kuruşa kadar basmak tabloyu okunmaz
   yapıyordu; satırları yuvarlayıp toplamı kesin değerden basmak ise ekranda
   "22.501 − 2.400 = 20.100" gibi tutmayan bir çıkarma üretebiliyordu (ana
   oran ×0,25 kesirli çıktığında). ÖLÇÜLDÜ: 0 ile 600.000 arasında 7'şer
   adımla 85.715 noktada kesin formülden en büyük sapma 0,99 GBP, ekranda
   tutmayan çıkarma sıfır.

   ARACIN DIŞINDA KALANLAR ekranda yazıyor, gizli varsayım değil: ilişkili
   şirket sınır bölmesi (yurt dışındaki şirket de sayılabiliyor, CTM03940),
   on iki aydan kısa dönemde sınırın küçülmesi ve muaf kâr payları.

   ---------------------------------------------------------------------------
   KKTC TARAFI · hesap YOK

   Bu bir eksik değil, sitenin yayın kararı (countryContent.kktc.tax: "KKTC
   için bu sayfada oran yayımlamıyoruz"). KKTC seçilince tutar alanı ve dönem
   hiç basılmıyor; sonuç kutusunda sitenin kendi cümlesi, altında sitede
   yayımlanan satır ve bir sonraki adım duruyor. Tek sayı yok. Kutunun
   gizlenip "seçilemez" yapılması da elendi: müşteri üç ülkeyi saydı ve KKTC'yi
   arayan ziyaretçinin cevabı "burada yok" değil, "neden yok ve ne yapılır".

   Sonuç kutusu (.tl-out) üç ülkede de AYNI öge ve hep DOM'da: aria-live
   bölgesi sonradan eklenirse ekran okuyucu ilk duyuruyu yutuyor. Ülke
   değişince içeriği değişiyor ve duyuruluyor.
   ========================================================================= */

/** Hesap yapılan ülkeler. KKTC bu birleşimde bilerek yok: tip düzeyinde
 *  "KKTC için tutar tutulmuyor" demek bu. */
type HesapUlke = Exclude<CountrySlug, "kktc">;

/* Dönem seçenekleri. `kat` doğrudan çarpan: yıllıkta 1, aylıkta 12. Sayı
   burada tek bir yerde duruyor ki bileşenin içine ikinci bir 12 sızmasın. */
const DONEMLER = [
  { key: "yillik", label: "Yıllık", hint: "Bir mali yılın tamamı" },
  { key: "aylik", label: "Aylık", hint: "12 ile çarpılıp yıllığa çevrilir" },
] as const;
type Donem = (typeof DONEMLER)[number]["key"];

/* Örnek girdiler, iddia değil (bkz. HAZIR TUTARLAR).
   · BAE: yıllık dizinin ortası eşiğin kendisi, aylık dizideki karşılığı
     eşiğin tam on ikide biri (375.000 / 12 = 31.250, kesirsiz).
   · İngiltere: yıllık dizide İKİ sınır da var ve beş çip üç rejimin üçünü de
     gösteriyor — 30.000 küçük kâr oranı, 100.000 marjinal indirim, 500.000
     ana oran; 50.000 ve 250.000 tam sınırda. Aylık dizi aynı dağılımı yuvarlak
     sayılarla veriyor (yıllığa çevrilince 30.000 · 60.000 · 120.000 ·
     240.000 · 600.000): sınırların on ikide biri kesirli (4.166,67 ·
     20.833,33) ve kesirli bir çip "örnek" gibi değil hesap artığı gibi
     okunuyordu. */
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

/* Ülke çipinin alt satırı: seçmeden önce neyin değişeceğini söylüyor. Oranlar
   rates.ts'in etiketlerinden; KKTC'de sayı yerine karar. */
const ULKE_IPUCU: Record<CountrySlug, string> = {
  dubai: `${UAE_CT.currency} · ${UAE_CT.lower.label} ve ${UAE_CT.upper.label}, iki dilim`,
  ingiltere: `${UK_CT.currency} · ${UK_CT.small.label} ile ${UK_CT.main.label} arası`,
  kktc: "Oran yayımlanmıyor",
};

/* Ülkeye göre değişen sözcükler. BAE metinleri "vergiye tabi kazanç" diyor
   (taşınan aracın metni, aynen); İngiltere kaynağı "taxable profits" diyor ve
   defterin kendi cümlesi de "kâr". `ornek` hem kutunun yer tutucusu hem
   yardım satırının örneği: ikisi ayrı sayı olsaydı kutuda "500.000" görüp
   altında başka bir örnek okumak kafa karıştırırdı. */
const TERIM: Record<HesapUlke, { ad: string; Ad: string; ornek: string; okunus: string }> = {
  dubai: { ad: "kazanç", Ad: "Kazanç", ornek: "500.000", okunus: "beş yüz bin" },
  ingiltere: { ad: "kâr", Ad: "Kâr", ornek: "100.000", okunus: "yüz bin" },
};

const BAE_KURAL = ruleOf(UAE_CT.upper);
const BAE_FZ = ruleOf({ repoRow: { country: "dubai", label: "Serbest bölge şirketi" } });
const BAE_TEYIT = needsConfirm(UAE_CT.lower, UAE_CT.upper, UAE_CT.threshold);
const ING_TEYIT = needsConfirm(UK_CT.small, UK_CT.main, UK_CT.lower, UK_CT.upper, UK_CT.fraction);
const KKTC_SATIR = ruleOf(KKTC_CT);

/* İki sınırın arasında her ek sterlinin vergisi: ana oran + standart kesir
   (türetme dosya başında). Modül düzeyinde bir kez. */
const ING_MARJ = formatPercent(UK_CT.main.value + UK_CT.fraction.value, 1);

/** BAE: iki dilim. UaeCorporateTax'taki üç satır, değişmeden. Eşiğe kadarki
 *  kısım her zaman düşük oranla, yalnızca AŞAN kısım yüksek oranla — dilimli
 *  vergide sık yapılan hata tutarın tamamına yüksek oranı uygulamak. */
function baeHesap(profit: number) {
  const lowerBase = Math.min(profit, UAE_CT.threshold.value);
  const upperBase = Math.max(0, profit - UAE_CT.threshold.value);
  const tax = lowerBase * UAE_CT.lower.value + upperBase * UAE_CT.upper.value;
  const effective = profit > 0 ? tax / profit : 0;
  return { lowerBase, upperBase, tax, effective };
}

type IngBant = "kucuk" | "arada" | "ana";

/** İngiltere: GOV.UK + HMRC CTM03925. `n` vergiye tabi kâr (N), `a`
 *  artırılmış kâr (A); ekrandan her zaman a = n geliyor.
 *
 *  Sınır karşılaştırması A üzerinden (kaynak: "augmented profits" sınırlarla
 *  kıyaslanıyor). Alt sınır DAHİL küçük oranda ("£50,000 or less"), üst sınır
 *  dahil ana oranda: tam 250.000'de formülün indirimi zaten sıfır, yani iki
 *  okuma aynı sayıyı veriyor ve ekrandaki cümle "indirim kalmıyor" diyebiliyor.
 *  Tam 50.000'de de iki yol aynı sayıyı veriyor: 50.000 × %19 = 9.500 ve
 *  50.000 × %25 − 3/200 × 200.000 = 12.500 − 3.000 = 9.500. Ölçüldü: sınırın
 *  iki yanında (49.999 · 50.000 · 50.001) üçü de 9.500. */
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

export default function KurumlarVergisi() {
  const uid = useId();
  const [ulke, setUlke] = useState<CountrySlug>("dubai");
  const [donem, setDonem] = useState<Donem>("yillik");
  const [degerler, setDegerler] = useState<Record<HesapUlke, string>>({
    dubai: "",
    ingiltere: "",
  });

  const hu: HesapUlke | null = ulke === "kktc" ? null : ulke;
  const value = hu ? degerler[hu] : "";
  const setValue = (v: string) => {
    if (hu) setDegerler((d) => ({ ...d, [hu]: v }));
  };

  const girilen = parseAmount(value);
  const kat = donem === "aylik" ? 12 : 1;
  /* Hesabın tamamı YILLIK kazanç üzerinden; dönem yalnızca girdiyi çeviriyor. */
  const profit = girilen === null ? null : girilen * kat;
  const cur = hu === "ingiltere" ? UK_CT.currency : UAE_CT.currency;
  const t = hu ? TERIM[hu] : null;

  /* Yazılmış ama okunamamış girdi ayrı bir hâl. Eskiden boş kutuyla aynı
     cümleyi basıyordu ("Kazancınızı yazın"), yani "abc" ya da "-5" yazan kişi
     yazdığının neden sonuç vermediğini göremiyordu. num.ts'in sözleşmesi
     değişmedi (okunamayan değer null); değişen yalnızca ekrandaki cümle. */
  const okunamadi = value.trim() !== "" && girilen === null;

  return (
    <div className="tl-app">
      {/* Ülke ve form TEK YIĞINDA: ülke seçimi kartın tam genişliğinde, altında
          bugünkü iki sütunlu form. .tl-stack burada "birlikte okunan alanlar"
          işini yapıyor — yeni bir sınıf yazılmadı. */}
      <div className="tl-stack">
        <fieldset className="tl-fs">
          <legend className="tl-legend">1 · Ülke</legend>
          <div className="tl-radios" data-cols="3">
            {COUNTRY_ORDER.map((c) => (
              <label key={c} className="tl-radio" data-on={c === ulke ? "" : undefined}>
                <input
                  type="radio"
                  name={`${uid}-ulke`}
                  checked={c === ulke}
                  onChange={() => setUlke(c)}
                />
                <span className="tl-radio-t">{COUNTRY_NAME[c]}</span>
                <span className="tl-radio-h">{ULKE_IPUCU[c]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {hu && t && (
          <div className="tl-form">
            {/* Dönem seçimi ve kural kutusu TEK SÜTUNDA. Ayrı ayrı ızgara
                hücresi olsalardı ikisi farklı satıra düşüyordu: sağdaki alan
                (kutu + hazır çipler + yardım satırı) birinci satırı
                yükseltiyor ve solda kural kutusuna kadar boş bir bant
                kalıyordu. Ölçüldü, ekran görüntüsünde görüldü (BAE turu). */}
            <div className="tl-stack">
              <fieldset className="tl-fs">
                <legend className="tl-legend">2 · {t.Ad} dönemi</legend>
                <div className="tl-radios">
                  {DONEMLER.map((d) => (
                    <label key={d.key} className="tl-radio" data-on={d.key === donem ? "" : undefined}>
                      <input
                        type="radio"
                        name={`${uid}-donem`}
                        checked={d.key === donem}
                        onChange={() => setDonem(d.key)}
                      />
                      <span className="tl-radio-t">{d.label}</span>
                      <span className="tl-radio-h">{d.hint}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {hu === "dubai" ? <BaeKural /> : <IngKural />}
            </div>

            <div className="tl-field">
              <label className="tl-label" htmlFor={`${uid}-profit`}>
                3 · {donem === "aylik" ? "Aylık" : "Yıllık"} vergiye tabi {t.ad}{" "}
                <span className="tl-label-x">({cur})</span>
              </label>
              {/* type="number" değil: tarayıcının kendi ok tuşları ve yerel
                  ayrım işareti davranışı, Türkçe binlik noktasıyla çakışıyor.
                  Metin alanı + inputMode="decimal" mobilde de sayı klavyesi
                  açıyor. */}
              <input
                id={`${uid}-profit`}
                className="tl-input"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder={t.ornek}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-describedby={`${uid}-help`}
              />
              {/* Hazır tutarlar. Düğme, bağlantı değil: sayfayı değiştirmiyor,
                  yalnızca kutuyu dolduruyor. Seçili olanı işaretliyoruz ki
                  kişi kendi yazdığı sayıyla çipten geleni ayırt edebilsin. */}
              <div className="tl-hazir">
                <span className="tl-hazir-k">Hazır tutarlar</span>
                {HAZIR[hu][donem].map((h) => (
                  <button
                    key={h}
                    type="button"
                    className="tl-hazir-b"
                    data-on={girilen === h ? "" : undefined}
                    onClick={() => setValue(formatAmount(h))}
                  >
                    {formatAmount(h)}
                  </button>
                ))}
              </div>
              <p id={`${uid}-help`} className="tl-help">
                Ciro değil, vergiye tabi {t.ad}. Binlik ayracı nokta, ondalık virgül:{" "}
                <b>{t.ornek}</b> {t.okunus} demek.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="tl-out" role="status" aria-live="polite">
        {hu === null ? (
          <KktcSonuc />
        ) : profit === null ? (
          <p className="tl-out-empty">
            {okunamadi ? (
              <>
                “{value}” bir tutar olarak okunamadı. Yalnızca rakam kullanın; binlik ayracı
                nokta, ondalık virgül.
              </>
            ) : hu === "dubai" ? (
              "Kazancınızı yazın; eşiğin altı ve üstü ayrı hesaplanır, toplam vergi ile efektif oran gösterilir."
            ) : (
              "Kârınızı yazın; kârın hangi sınırda kaldığına göre oran ve marjinal indirim hesaplanır, toplam vergi ile efektif oran gösterilir."
            )}
          </p>
        ) : hu === "dubai" ? (
          <BaeSonuc profit={profit} girilen={girilen} donem={donem} />
        ) : (
          <IngSonuc profit={profit} girilen={girilen} donem={donem} />
        )}
      </div>

      {hu === "dubai" && profit !== null && <BaeTablo profit={profit} />}
      {hu === "ingiltere" && profit !== null && <IngTablo profit={profit} />}

      {hu && t && donem === "aylik" && (
        <p className="tl-note">
          <b>Aylık girdi bir varsayım taşıyor:</b> on iki ayın birbirine eşit olduğunu kabul
          ediyoruz. Vergi yılın tamamındaki vergiye tabi {t.ad} üzerinden hesaplanıyor; ayları
          değişkense yıllık toplamı yazmak daha doğru sonuç verir.
        </p>
      )}

      {hu === "dubai" && <BaeNotlar />}
      {hu === "ingiltere" && <IngNotlar />}
      {hu === null && <KktcAdim />}

      {/* Tahmin ibaresi yalnızca bir tahmin üretilen yerde. KKTC'de sayı yok;
          "bu sonuç bir tahmindir" demek olmayan bir sonuca atıf olurdu. */}
      {hu && <p className="tl-note">{ESTIMATE_NOTE}</p>}
    </div>
  );
}

/* ================================================================= BAE ==== */

function BaeKural() {
  if (!BAE_KURAL) return null;
  return (
    <div className="tl-ct">
      <span className="tl-ct-k">Uygulanan kural</span>
      <p className="tl-ct-rule">{BAE_KURAL.value}</p>
      {BAE_KURAL.note && <p className="tl-ct-out">{BAE_KURAL.note}</p>}
    </div>
  );
}

function BaeSonuc({ profit, girilen, donem }: { profit: number; girilen: number | null; donem: Donem }) {
  const { tax, effective } = baeHesap(profit);
  const c = UAE_CT.currency;
  return (
    <>
      <span className="tl-out-k">Hesaplanan kurumlar vergisi</span>
      <strong className="tl-big">
        {formatAmount(tax)} {c}
      </strong>
      <span className="tl-sub">
        {donem === "aylik" && girilen !== null && (
          <>
            Aylık {formatAmount(girilen)} × 12 ={" "}
            <b>
              {formatAmount(profit)} {c}
            </b>{" "}
            yıllık kazanç.{" "}
          </>
        )}
        {formatAmount(profit)} {c} kazanç üzerinden efektif oran{" "}
        <b>{formatPercent(effective, 2)}</b>, çünkü {UAE_CT.threshold.label} eşiğine kadarki kısma{" "}
        {UAE_CT.lower.label} uygulanıyor.
      </span>
    </>
  );
}

function BaeTablo({ profit }: { profit: number }) {
  const { lowerBase, upperBase, tax, effective } = baeHesap(profit);
  const c = UAE_CT.currency;
  return (
    <>
      <table className="tl-tab">
        <caption className="sr-only">Dilim dilim kurumlar vergisi hesabı</caption>
        <thead>
          <tr>
            <th scope="col">Dilim</th>
            <th scope="col">Matrah</th>
            <th scope="col">Oran</th>
            <th scope="col">Vergi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{UAE_CT.threshold.label} ve altı</th>
            <td>{formatAmount(lowerBase)}</td>
            <td>{UAE_CT.lower.label}</td>
            <td>{formatAmount(lowerBase * UAE_CT.lower.value)}</td>
          </tr>
          <tr>
            <th scope="row">Eşiği aşan kısım</th>
            <td>{formatAmount(upperBase)}</td>
            <td>{UAE_CT.upper.label}</td>
            <td>{formatAmount(upperBase * UAE_CT.upper.value)}</td>
          </tr>
          <tr data-sum="">
            <th scope="row">Toplam</th>
            <td>{formatAmount(profit)}</td>
            <td>{formatPercent(effective, 2)}</td>
            <td>{formatAmount(tax)}</td>
          </tr>
        </tbody>
      </table>
      <p className="tl-note">
        Vergi sonrası kalan: <b>{formatAmount(profit - tax)} {c}</b>. Tablodaki bütün tutarlar {c}{" "}
        cinsinden.
      </p>
    </>
  );
}

function BaeNotlar() {
  return (
    <>
      {BAE_FZ && (
        <p className="tl-note">
          <b>Serbest bölge:</b> {BAE_FZ.note ?? BAE_FZ.value} Bu yüzden hesap standart oran
          üzerinden yürüyor; muafiyeti bir kutucukla açmak, karşılığı olmayan bir sonuç üretirdi.
        </p>
      )}
      {BAE_TEYIT && (
        <p className="tl-warn">
          Oran ve eşik <b>teyit bekliyor</b>: {UAE_CT.threshold.label} eşiği ve {UAE_CT.upper.label}{" "}
          oranı depodaki vergi tablosundan alındı, mali müşavir onayından geçmedi.
        </p>
      )}
    </>
  );
}

/* ============================================================ İNGİLTERE ==== */

/* Kural kutusu BAE'dekinden farklı kuruluyor ve bu bilinçli: BAE'de kural
   cümlesi countryContent'teki DOĞRULANMIŞ satırdan aynen geliyor. İngiltere'nin
   o satırı ("Kâr dilimine göre %19-25") SWAP:UK_CT_RATE ile teyitsiz ve iki
   sınırı vermiyor; ekrana basılsa hesabın dayandığı kuralı değil, eksik bir
   özetini gösterirdi. Burada cümlenin kelimeleri bu dosyada, SAYILARI
   rates.ts'ten ve kaynağın bağlantısı kutunun içinde: gözden geçiren kişi
   cümleyi, sayıyı ve otoritenin tablosunu yan yana görüyor. */
function IngKural() {
  const { small, main, lower, upper, fraction, source, year } = UK_CT;
  return (
    <div className="tl-ct">
      <span className="tl-ct-k">Uygulanan kural · {year}</span>
      <p className="tl-ct-rule">
        Kâr {lower.label} ve altındaysa tamamına {small.label}, {upper.label} ve üstündeyse
        tamamına {main.label}. İkisinin arasında kârın tamamına {main.label} uygulanıp marjinal
        indirim düşülüyor.
      </p>
      <p className="tl-ct-out">
        Marjinal indirim = {fraction.label} × ({formatAmount(upper.value)} − kâr)
      </p>
      {/* Kaynak site dışı: SmartLink dolaşım kararı veren bir bileşen ve dış
          adreste işi yok (aynı kalıp kaynaklar/KynTimeline.tsx). Görünür
          metin kaynağın kendi başlığı, çevrilmeden — GOV.UK'de aranınca aynı
          sayfa çıksın. aria-label görünür metni İÇERİYOR (etiket-ad eşleşmesi)
          ve yeni sekmeyi söylüyor; <a> rolü yazardan ad almayı destekliyor,
          tuzak G-2'deki <p>/<div> durumu değil. .tl-ghost dosyanın kendi
          ikincil eylem kalıbı: araçlar.css'e satır eklenmedi. */}
      <p className="tl-ct-out">
        <a
          className="tl-ghost"
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GOV.UK · ${source.title}, ${source.updated} güncellemesi, yeni sekmede açılır`}
        >
          GOV.UK · {source.title}
          <ArrowUpRight size={15} strokeWidth={2.1} aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}

function IngSonuc({ profit, girilen, donem }: { profit: number; girilen: number | null; donem: Donem }) {
  const { small, main, lower, upper } = UK_CT;
  const r = ingHesap(profit);
  const c = UK_CT.currency;
  const p = `${formatAmount(profit)} ${c}`;
  return (
    <>
      <span className="tl-out-k">Hesaplanan kurumlar vergisi</span>
      <strong className="tl-big">
        {formatAmount(r.vergi)} {c}
      </strong>
      <span className="tl-sub">
        {donem === "aylik" && girilen !== null && (
          <>
            Aylık {formatAmount(girilen)} × 12 = <b>{p}</b> yıllık kâr.{" "}
          </>
        )}
        {r.bant === "kucuk" && (
          <>
            {p} kâr {lower.label} alt sınırını aşmıyor, yani kârın tamamına{" "}
            <b>{small.label}</b> uygulanıyor.
          </>
        )}
        {r.bant === "arada" && (
          <>
            {p} kâr iki sınırın arasında: kârın tamamına {main.label} uygulanıp{" "}
            <b>
              {formatAmount(r.indirim)} {c}
            </b>{" "}
            marjinal indirim düşülüyor. Efektif oran <b>{formatPercent(r.efektif, 2)}</b>; bu
            aralıkta eklenen her sterlinin vergisi {ING_MARJ}.
          </>
        )}
        {r.bant === "ana" && (
          <>
            {p} kâr {upper.label} üst sınırına ulaşıyor, yani kârın tamamına{" "}
            <b>{main.label}</b> uygulanıyor ve marjinal indirim kalmıyor.
          </>
        )}
      </span>
    </>
  );
}

/* Tablo "adım · hesap · tutar". BAE'nin dilim tablosu burada yanlış olurdu
   (dosya başı: DİLİMLİ DEĞİL). Satırlar banda göre değişiyor: küçük kâr
   oranında indirim satırı yok, çünkü o rejimde indirim diye bir kavram yok;
   ana oranda VAR ve sıfır, çünkü "neden indirim yok" sorusunun cevabı o
   satır. Eksi işareti U+2212: kısa çizgi (-) tabular rakamların yanında
   kısa kalıyor ve bir tire gibi okunuyor. */
function IngTablo({ profit }: { profit: number }) {
  const { small, main, upper, fraction } = UK_CT;
  const r = ingHesap(profit);
  const c = UK_CT.currency;
  const p = formatAmount(profit);
  return (
    <>
      <table className="tl-tab">
        <caption className="sr-only">Kurumlar vergisi hesabının adımları</caption>
        <thead>
          <tr>
            <th scope="col">Adım</th>
            <th scope="col">Hesap</th>
            <th scope="col">Tutar ({c})</th>
          </tr>
        </thead>
        <tbody>
          {r.bant === "kucuk" ? (
            <tr>
              <th scope="row">Küçük kâr oranı</th>
              <td>
                {p} × {small.label}
              </td>
              <td>{formatAmount(r.vergi)}</td>
            </tr>
          ) : (
            <>
              <tr>
                <th scope="row">Ana oran</th>
                <td>
                  {p} × {main.label}
                </td>
                <td>{formatAmount(r.anaVergi)}</td>
              </tr>
              <tr>
                <th scope="row">Marjinal indirim</th>
                <td>
                  {r.bant === "arada"
                    ? `${fraction.label} × (${formatAmount(upper.value)} − ${p})`
                    : "üst sınıra ulaşıldı"}
                </td>
                <td>{r.indirim > 0 ? `−${formatAmount(r.indirim)}` : "0"}</td>
              </tr>
            </>
          )}
          <tr data-sum="">
            <th scope="row">Ödenecek vergi</th>
            <td>efektif {formatPercent(r.efektif, 2)}</td>
            <td>{formatAmount(r.vergi)}</td>
          </tr>
        </tbody>
      </table>
      <p className="tl-note">
        Vergi sonrası kalan: <b>{formatAmount(profit - r.vergi)} {c}</b>. Tablodaki bütün tutarlar{" "}
        {c} cinsinden ve tam sterline yuvarlanmış.
      </p>
    </>
  );
}

/* Aracın DIŞINDA kalan üç kural — gizli varsayım değil, ekranda. Kaynakları
   rates.ts · UK_CT'nin başında (GOV.UK marjinal indirim sayfası, CTM03940,
   CTM03905). İki not, tek not değil: ilişkili şirket kuralı bu sitenin
   ziyaretçisi için ötekilerden ağır — Türkiye'de de şirketi olan birinin
   sınırları yarıya inebiliyor — ve uzun bir paragrafın ortasında kaybolurdu. */
function IngNotlar() {
  const { small, main, lower, upper, fraction, source } = UK_CT;
  return (
    <>
      <p className="tl-note">
        <b>İlişkili şirket:</b> şirketiniz başka bir şirketi kontrol ediyorsa ya da ikisini aynı
        kişiler kontrol ediyorsa o şirket ilişkili şirket (associated company) sayılıyor ve iki
        sınır şirket sayısına bölünüyor; üç ilişkili şirketi olan bir şirkette sınırlar dörde
        bölünür. İlişkili şirketin İngiltere&apos;de olması gerekmiyor: HMRC&apos;ye göre nerede
        vergi mukimi olursa olsun ilişkili sayılabiliyor. Araç sınırları tek şirket için
        kullanıyor.
      </p>
      <p className="tl-note">
        <b>Kısa dönem ve muaf kâr payı:</b> hesap dönemi on iki aydan kısaysa iki sınır aynı oranda
        küçülüyor. Şirketin aldığı bazı muaf kâr payları (exempt distributions) da sınırlarla
        kıyaslanan tutara ekleniyor. Araç on iki aylık dönem ve muaf kâr payı olmadığı
        varsayımıyla hesaplıyor.
      </p>
      {ING_TEYIT && (
        <p className="tl-warn">
          Oran ve sınırlar <b>teyit bekliyor</b>: {small.label}, {main.label}, {lower.label},{" "}
          {upper.label} ve {fraction.label} GOV.UK&apos;nin resmî tablosundan alındı (
          {source.updated} güncellemesi), mali müşavir onayından geçmedi.
        </p>
      )}
    </>
  );
}

/* ================================================================= KKTC ==== */

/* Sonuç kutusunun KKTC hâli. Büyük satır aracın ne yaptığını söylüyor, alt
   satır nedenini — ve neden cümlesi sitenin kendi cümlesi (KKTC_CT.decision
   = countryContent.kktc.tax.note), burada yeniden yazılmıyor. "Bu bir eksik
   değil" gibi bir savunma cümlesi bilerek YOK: sitenin başka bir bölümünde
   aynı gerekçeyle silinmişti — kimsenin yöneltmediği bir suçlamaya cevap. */
function KktcSonuc() {
  return (
    <>
      <span className="tl-out-k">{COUNTRY_NAME.kktc} · kurumlar vergisi</span>
      <strong className="tl-big">Hesap yapılmıyor</strong>
      <span className="tl-sub">{KKTC_CT.decision}</span>
    </>
  );
}

/* Sitede yayımlanan satır + bir sonraki adım. Satır ruleOf() ile geliyor,
   yani ülke sayfasındaki vergi bloğuyla aynı cümle. Adım AskCta, çünkü
   sitenin tek soru çıkışı o; hedefi /basla'ya ülkeyi taşıyor (sitedeki
   kalıp: FitTest · PriceSummary · CountryPricing "/basla?ulke=…"). Etiket
   "Sorularınız mı var?" değil: kararın cümlesi "size uygulanacak çerçeveyi
   yazılı teklifte satır satır yazıyoruz" diyor, sonraki adım da o teklif. */
function KktcAdim() {
  return (
    <>
      {KKTC_SATIR && (
        <div className="tl-ct">
          <span className="tl-ct-k">Sitede yayımlanan çerçeve</span>
          <p className="tl-ct-rule">
            {KKTC_SATIR.label}: {KKTC_SATIR.value}
          </p>
          {KKTC_SATIR.note && <p className="tl-ct-out">{KKTC_SATIR.note}</p>}
        </div>
      )}
      <div className="tl-actions">
        <AskCta label="Yazılı teklif isteyin" href="/basla?ulke=kktc" />
      </div>
    </>
  );
}
