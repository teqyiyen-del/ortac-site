"use client";

import { useId, useState } from "react";
import {
  CalendarDays,
  CalendarRange,
  Coins,
  FileSignature,
  Info,
  Layers,
  Minus,
  Percent,
  Scale,
  Timer,
  Wallet,
} from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import {
  AracKunye,
  Bant,
  Bolusum,
  Cip,
  Cipler,
  Derin,
  DerinListe,
  Dip,
  Girdi,
  GirdiSatiri,
  Halka,
  Hazirlar,
  Kaynak,
  Kural,
  Satir,
  Satirlar,
  Sayac,
  Surgu,
  Tezgah,
  Yardim,
} from "@/components/tools/ToolShell";
import { COUNTRY_NAME, COUNTRY_ORDER, type CountrySlug } from "@/lib/brand";
import {
  ESTIMATE_NOTE,
  KKTC_CT,
  UAE_CT,
  UK_CT,
  needsConfirm,
  ruleOf,
} from "@/lib/tools/rates";
import { kvHref } from "@/lib/tools/catalog";
import { formatAmount, formatPercent, parseAmount } from "@/lib/tools/num";

/* ============================================================================
   KURUMLAR VERGİSİ HESAPLAYICI · ülke başına adres (Dubai · İngiltere · KKTC)
   ============================================================================

   NEDEN TEK ARAÇ, ÜÇ ADRES
   Müşteri önce: "Kurumlar Vergisi Hesaplama | tek araç sayfası ülke
   seçimiyle farklı farklı olacak kktc seçecek oraya göre dubai seçecek oraya
   göre ingiltere oraya göre gibi." Sonra: "kurumlar vergisi hesaplayıcıya
   tek tuşla girilsin evet ama içerden ülkeye göre ayrılsın ve link değişsin
   istiyorum. google a hepsini ayrı ayrı indexlemek istiyorum."

   Yani araç TEK (menüde tek kart, tek bileşen), sayfası ÜÇ:
   /araclar/kurumlar-vergisi/{dubai,ingiltere,kktc}. Bileşen ülkeyi prop
   olarak alıyor; ülke seçimi bir radyo değil BAĞLANTI (ToolShell ·
   AracKunye, aria-current="page") ve adresi değiştiriyor. Adres kuralı
   catalog.ts · kvHref; sayfa app/araclar/kurumlar-vergisi/[ulke]. BU TURDA
   DEĞİŞMEDİ: metadata, kanonik, FAQPage, sitemap ve /kurumlar-vergisi →
   /dubai yönlendirmesi olduğu gibi duruyor.

   ÜLKE DEĞİŞİNCE TUTAR TAŞINMIYOR — yapı gereği. "500.000" AED olarak
   yazılıp İngiltere'ye geçilseydi aynı rakam 500.000 GBP diye hesaplanırdı:
   aynı sayı, yaklaşık beş kat farklı bir para. Kur çevrimi bir oran
   uydurmak olurdu (sitenin kıyas bölümü de çevirmiyor, CountryTax.tsx). Her
   ülke ayrı sayfa ve sayfa bileşeni `key={ulke}` ile takıyor.

   SAYILAR NEREDEN
   Tek kaynak lib/tools/rates.ts: UAE_CT · UK_CT · KKTC_CT. Bu dosyada tek
   bir oran, sınır ya da kesir sabiti YOK. Hazır çiplerdeki sınır değerleri
   de (375.000 · 50.000 · 250.000) sabit yazılmadı, rates.ts'ten okunuyor.

   ---------------------------------------------------------------------------
   SUNUM · 12.09.2026 · TEZGÂH DİLİNE GEÇİŞ (A2)

   Bir tur önce bu araç uygunluk testinin İKİ PANELLİ kurgusundaydı: solda
   beyaz çalışma paneli, sağda gece "hesap defteri". Müşteri o kurguyu geri
   çevirdi ("tüm araçlarda sağ tarafa siyah alan koy onun içinde dönsün her
   şey gibi bir şey demedimki sana amk ben") ve /lab/arac-dili'nin A2
   adayını seçti: doğru referans test değil SİTENİN KENDİ HESAPLAYICISI
   (CountryTax.tsx · .txm- · /dubai#vergi), çünkü müşteri bu aracı ilk
   isterken zaten onu göstermişti.

   YENİ SIRA (üç ülkede de aynı iskelet, dolan yerler farklı):
     künye      aracın adı + büyük bayrak solda, üç ülke pili sağda
     tezgâh     tek panel · kicker + (varsa) ikinci değişkenin çipleri
     girdi      geniş tek kutu + sürgü; altında hazır çipler ve yardım
     BANT       cevap · sayfanın tek gece yüzeyi, tek büyük değer + halka
     bölüşüm    "Örnek dağılım": şirkette kalan + tek çubuk + tek cümle
     satırlar   "nasıl çıktı" · satır · mini çubuk · sağda değer
     kural      dipnot + kaynak çipi + teyit satırı
     dip        tahmin ibaresi + soru çıkışı, sonra açılır notlar

   KALKANLAR: gece yan panel, üç numaralı adım (ülke artık ADRES, dönem
   başlık satırında, geriye tek girdi kalıyor), adım sayacı ve saç teli
   (sayılacak adım kalmadı), İngiltere'nin bant ölçeği (yerini sürgünün
   üstündeki iki sınır işareti aldı — o ölçek 1:2:1 bantlarla doğrusal
   DEĞİLDİ ve bunu altındaki yazıyla telafi etmek zorundaydı).

   HESAP MANTIĞINA DOKUNULMADI: aşağıdaki iki fonksiyon bayt bayt eski
   dosyadan. Testler bu turda tekrarlandı ve sayılar tuttu (raporda).

   ---------------------------------------------------------------------------
   BAE TARAFI

   Vergiye tabi kazancı iki dilime bölüyor — eşiğe kadarı ve eşiği aşan
   kısım — her birine kendi oranını uygulayıp toplamı ve efektif oranı
   yazıyor. Kural cümlesi yeniden yazılmıyor: ruleOf() countryContent.ts'teki
   doğrulanmış satırı getiriyor ve ekrana aynen basılıyor.

   EFEKTİF ORAN NEDEN VAR. Asıl işi yapan sayı o. "%9" korkutucu bir sayı
   ama eşik altı %0 olduğu için gerçek yük her zaman daha düşük; 500.000 AED
   kazançta efektif oran %2,25. Bandın halkası onun üst orana payını
   gösteriyor: "%9'un ne kadarı gerçekten ödeniyor".

   SERBEST BÖLGE MUAFİYETİ HESABA GİRMİYOR ve bu karar. countryContent.ts:
   "Serbest bölge şirketi olmak otomatik muafiyet vermiyor…". Bir kutucuk
   koysaydık araç, karşılığı olmayan bir "%0" sonucu üretirdi.

   ---------------------------------------------------------------------------
   İNGİLTERE TARAFI · DÖKÜM BURADA BAŞKA TÜRLÜ ÇALIŞIYOR

   BAE'de oran kazancın DİLİMİNE uygulanıyor; İngiltere'de kârın TAMAMINA.
   Kâr alt sınırı aşmıyorsa tamamına %19, üst sınıra ulaşıyorsa tamamına
   %25, arada tamamına %25 uygulanıp marjinal indirim düşülüyor. O yüzden
   "nasıl çıktı" satırları BAE'dekinin aynısı olamazdı:
     alt sınırın altında  TEK satır — hesabın kendisi tek çarpma
     iki sınır arasında   ana oran · marjinal indirim (eksi) · ödenecek
     üst sınırda ve üstü  ana oran · marjinal indirim SIFIR · ödenecek
   Son satırdaki sıfır bir boşluk değil CEVAP: "neden indirim yok" sorusunun
   karşılığı o satır. Küçük kâr oranında ise indirim diye bir kavram YOK, o
   yüzden satır hiç basılmıyor (boş bir satır uydurmak olurdu).

   FORMÜL — HMRC CTM03925, harfleri kaynağınkiyle aynı:
     indirim = (F × (U − A)) × (N ÷ A)
   F standart kesir, U üst sınır, A artırılmış kâr, N vergiye tabi kâr.
   Ekranda A = N (muaf kâr payı sıfır), yani formül F × (U − N)'ye iniyor.
   Hesap fonksiyonu A'yı yine AYRI alıyor: kaynağın örneği A ≠ N ve
   fonksiyonu o örnekle sınayabilmek için.

   İKİ SINIRIN ARASINDA EK KÂRIN VERGİSİ %26,5. Uydurma bir oran değil,
   formülün türevi: vergi = %25·N − F·(U − N), yani her ek sterlin %25 artı
   F = 3/200 kadar vergi ekliyor. formatPercent(main + fraction) ile
   basılıyor.

   YUVARLAMA · TAM STERLİN, SATIR SATIR. Ana oranla vergi ve indirim ayrı
   ayrı tam sterline yuvarlanıyor, ödenecek vergi yuvarlanmış iki satırın
   farkı. Kaynağın kendi örneği de böyle (2.093,88 → 2.094;
   22.500 − 2.094 = 20.406).

   ---------------------------------------------------------------------------
   KKTC TARAFI · HESAP YOK, DOLAYISIYLA PARÇA DA YOK

   Sitenin yayın kararı KKTC için oran yayımlamamak (countryContent.kktc.tax).
   O yüzden bu dalda SÜRGÜ, HAZIR ÇİPLER, DÖNEM ÇİPLERİ, BÖLÜŞÜM ve "nasıl
   çıktı" satırları HİÇ BASILMIYOR — hiçbiri boş bırakılmıyor, hiçbiri
   uydurma bir sayıyla doldurulmuyor. Bant bir rakam yerine kararın kendisini
   ve yazılı teklif çağrısını taşıyor. Sitede yayımlanan iki çerçeve satırı
   kaybolmadı: biri kural dipnotuna, öteki açılır listeye geçti.

   "Bu bir eksik değil" gibi bir savunma cümlesi bilerek YOK: sitenin başka
   bir bölümünde aynı gerekçeyle silinmişti — kimsenin yöneltmediği bir
   suçlamaya cevap.
   ========================================================================= */

/** Hesap yapılan ülkeler. KKTC bu birleşimde bilerek yok: tip düzeyinde
 *  "KKTC için tutar tutulmuyor" demek bu. */
type HesapUlke = Exclude<CountrySlug, "kktc">;

/* Dönem seçenekleri. `kat` doğrudan çarpan: yıllıkta 1, aylıkta 12. Sayı
   burada tek bir yerde duruyor ki bileşenin içine ikinci bir 12 sızmasın. */
const DONEMLER = [
  { key: "yillik", label: "Yıllık", hint: "Bir mali yılın tamamı", kat: 1 },
  { key: "aylik", label: "Aylık", hint: "12 ile çarpılıp yıllığa çevrilir", kat: 12 },
] as const;
type Donem = (typeof DONEMLER)[number]["key"];

/* Dönem çipinin glifi: uzun takvim aralığı ve tek ay. 17 px — çip tek
   satırlık bir pil, 20 px glif pili 42 px'in üstüne çıkarıyordu. */
const DONEM_IKON: Record<Donem, React.ReactNode> = {
  yillik: <CalendarRange size={17} strokeWidth={1.9} />,
  aylik: <CalendarDays size={17} strokeWidth={1.9} />,
};

/* Örnek girdiler, iddia değil.
   · BAE: yıllık dizinin ortası eşiğin kendisi, aylık dizideki karşılığı
     eşiğin tam on ikide biri (375.000 / 12 = 31.250, kesirsiz).
   · İngiltere: yıllık dizide İKİ sınır da var ve beş çip üç rejimin üçünü de
     gösteriyor — 30.000 küçük kâr oranı, 100.000 marjinal indirim, 500.000
     ana oran; 50.000 ve 250.000 tam sınırda. Aylık dizi aynı dağılımı
     yuvarlak sayılarla veriyor (yıllığa çevrilince 30.000 · 60.000 ·
     120.000 · 240.000 · 600.000): sınırların on ikide biri kesirli ve
     kesirli bir çip "örnek" gibi değil hesap artığı gibi okunuyordu.

   DİZİNİN İKİNCİ İŞİ (bu turda eklendi): SON öğesi sürgünün üst sınırı.
   Sınır uydurulmadı, zaten ekranda duran en büyük örnek oldu. */
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

/* Sürgünün üstündeki sınır işaretleri: aracın anlattığı kural ölçeğin
   NERESİNDE duruyor. Sayılar yine rates.ts'ten; bu dizide tek bir rakam yok.
   BAE'de tek eşik, İngiltere'de iki sınır (eski bant ölçeğinin işini bunlar
   devraldı). */
const ISARETLER: Record<HesapUlke, { ad: string; deger: number }[]> = {
  dubai: [{ ad: "Eşik", deger: UAE_CT.threshold.value }],
  ingiltere: [
    { ad: "Alt sınır", deger: UK_CT.lower.value },
    { ad: "Üst sınır", deger: UK_CT.upper.value },
  ],
};

/* Üç ülke pili. Adres defterden (kvHref), elle yazılmıyor. */
const ULKE_YOLU = COUNTRY_ORDER.map((c) => ({ ulke: c, href: kvHref(c) }));

/* Ülkeye göre değişen sözcükler. BAE metinleri "vergiye tabi kazanç" diyor;
   İngiltere kaynağı "taxable profits" diyor ve sitenin cümlesi de "kâr".
   `ornek` hem kutunun yer tutucusu hem AÇILIŞ DEĞERİ: ikisi ayrı sayı
   olsaydı boş kutuda bir örnek, dolu kutuda başka bir örnek görülürdü.

   ÖRNEK TUTARLA AÇILIYOR. Kutu boş açılsaydı bant ilk rakam yazılana kadar
   bir tire gösterirdi ve sonucun canlı olduğu görünmezdi. Sitede emsali var:
   Dubai sayfasının vergi özeti de 900.000 ile açılıyor (CountryTax ·
   TAX_SWAP). Örnek bir İDDİA değil, tıpkı hazır çipler gibi. */
const TERIM: Record<HesapUlke, { ad: string; Ad: string; ornek: string }> = {
  dubai: { ad: "kazanç", Ad: "Kazanç", ornek: "500.000" },
  ingiltere: { ad: "kâr", Ad: "Kâr", ornek: "100.000" },
};

const BAE_KURAL = ruleOf(UAE_CT.upper);
const BAE_TEYIT = needsConfirm(UAE_CT.lower, UAE_CT.upper, UAE_CT.threshold);
const ING_TEYIT = needsConfirm(UK_CT.small, UK_CT.main, UK_CT.lower, UK_CT.upper, UK_CT.fraction);
const KKTC_SATIR = ruleOf(KKTC_CT);
/* KKTC'nin ikinci satırı: sitede yayımlanan beyan satırı. ruleOf ile, yani
   countryContent'teki etiket değişirse satır uydurulmuyor, susuyor. */
const KKTC_BEYAN = ruleOf({ repoRow: { country: "kktc", label: "Beyan yükümlülüğü" } });
/* KKTC bandının tek satırlık kararı. Bir oran değil bir yayın kararı, o
   yüzden rates.ts'te değil burada; uzun hâli KKTC_CT.decision. */
const KKTC_KISA = "Oran yayımlanmıyor";

/* İki sınırın arasında her ek sterlinin vergisi: ana oran + standart kesir
   (türetme dosya başında). Modül düzeyinde bir kez. */
const ING_MARJ = formatPercent(UK_CT.main.value + UK_CT.fraction.value, 1);

/* Dönemin birimine çevrilen sınır tam sayı çıkmayabilir: 375.000/12 = 31.250
   kesirsiz ama 50.000/12 = 4.166,67. Tam sayıda ondalık basmak ("31.250,00")
   hesap artığı gibi okunuyor, kesirli sayıyı yuvarlamak ise YANLIŞ sayı
   yazmak olurdu. O yüzden ondalık sayısı değerin kendisinden çıkıyor. */
const bicim = (v: number) => formatAmount(v, Number.isInteger(v) ? 0 : 2);

/** BAE: iki dilim. Eşiğe kadarki kısım her zaman düşük oranla, yalnızca
 *  AŞAN kısım yüksek oranla — dilimli vergide sık yapılan hata tutarın
 *  tamamına yüksek oranı uygulamak. */
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
 *  okuma aynı sayıyı veriyor. Tam 50.000'de de iki yol aynı sayıyı veriyor:
 *  50.000 × %19 = 9.500 ve 50.000 × %25 − 3/200 × 200.000 = 9.500. */
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

/* ============================================================== GİRİŞ ==== */

export default function KurumlarVergisi({ ulke }: { ulke: CountrySlug }) {
  return ulke === "kktc" ? <KktcArac /> : <HesapArac ulke={ulke} />;
}

/* ============================================================ HESAP ====== */

function HesapArac({ ulke }: { ulke: HesapUlke }) {
  const uid = useId();
  const t = TERIM[ulke];
  const [donem, setDonem] = useState<Donem>("yillik");
  const [value, setValue] = useState<string>(t.ornek);

  const girilen = parseAmount(value);
  const kat = DONEMLER.find((d) => d.key === donem)!.kat;
  /* Hesabın tamamı YILLIK kazanç üzerinden; dönem yalnızca girdiyi çeviriyor. */
  const profit = girilen === null ? null : girilen * kat;
  const cur = ulke === "ingiltere" ? UK_CT.currency : UAE_CT.currency;

  /* Yazılmış ama okunamamış girdi ayrı bir hâl: "abc" ya da "-5" yazan kişi
     yazdığının neden sonuç vermediğini görebilmeli. */
  const okunamadi = value.trim() !== "" && girilen === null;
  const ornekte = value === t.ornek;

  const bae = ulke === "dubai" && profit !== null ? baeHesap(profit) : null;
  const ing = ulke === "ingiltere" && profit !== null ? ingHesap(profit) : null;
  const vergi = bae ? bae.tax : ing ? ing.vergi : null;
  const efektif = bae ? bae.effective : ing ? ing.efektif : null;
  /* Halkanın doluluğu: efektif oranın ÜST orana payı. BAE'de üst oran %9,
     İngiltere'de ana oran %25 — ikisi de aracın "en çok bu kadar" sayısı. */
  const ustOran = ulke === "dubai" ? UAE_CT.upper.value : UK_CT.main.value;
  const kalan = profit !== null && vergi !== null ? profit - vergi : null;
  const pay = (v: number) => (profit && profit > 0 ? v / profit : 0);

  const hazir = HAZIR[ulke][donem];
  /* Sürgünün sınırı ARAYÜZ kısıtı, vergi kuralı değil: kutuya daha büyük bir
     rakam yazılabiliyor, sürgü o rakamda sağ uca dayanıyor. Adım sınırın
     seksende biri (referansın adımıyla aynı bölme). */
  const surguUst = hazir[hazir.length - 1];
  const surguDeger = Math.min(Math.max(girilen ?? 0, 0), surguUst);

  /* Dönem değişince kutudaki rakam TAŞINMIYOR: 500.000 aylık okunursa yıllık
     6.000.000 olurdu ve kimsenin yazmadığı bir sayı ekrana düşerdi. Yeni
     dönemin örnek tutarı diziden geliyor (dizinin ortası). */
  const donemDegis = (d: Donem) => {
    setDonem(d);
    setValue(formatAmount(HAZIR[ulke][d][2]));
  };

  const tarif = okunamadi ? `${uid}-hata` : `${uid}-yardim`;

  return (
    <>
      <AracKunye
        ad="Kurumlar vergisi"
        alt={`${COUNTRY_NAME[ulke]} · ${cur}`}
        ulke={ulke}
        yol={ULKE_YOLU}
      />

      <Tezgah
        kicker={
          <>
            <Info size={15} strokeWidth={2.1} aria-hidden="true" />
            Temsilî gösterim
          </>
        }
        sag={
          <Cipler ad={`${t.Ad} dönemi`}>
            {DONEMLER.map((d) => (
              <Cip
                key={d.key}
                ad={`${uid}-donem`}
                secili={d.key === donem}
                onSec={() => donemDegis(d.key)}
                ikon={DONEM_IKON[d.key]}
                baslik={d.label}
                ipucu={d.hint}
              />
            ))}
          </Cipler>
        }
      >
        <GirdiSatiri surgulu>
          <Girdi
            id={`${uid}-tutar`}
            no="01"
            etiket={
              <>
                {donem === "aylik" ? "Aylık" : "Yıllık"} vergiye tabi {t.ad}
              </>
            }
            ek={` (${cur})`}
            ikon={<Coins size={18} strokeWidth={1.9} />}
            birim={cur}
            deger={value}
            onDeger={setValue}
            hata={okunamadi}
            tarif={tarif}
            ipucu={t.ornek}
          />
          <Surgu
            etiket={`${donem === "aylik" ? "Aylık" : "Yıllık"} vergiye tabi ${t.ad} sürgüsü (${cur})`}
            deger={surguDeger}
            ust={surguUst}
            adim={surguUst / 80}
            onDeger={(n) => setValue(formatAmount(n))}
            degerYazi={`${formatAmount(surguDeger)} ${cur}`}
            isaretler={ISARETLER[ulke].map((i) => ({
              oran: i.deger / kat / surguUst,
              /* ETİKET DÖNEMİN BİRİMİNDE, sınırın kendi etiketi DEĞİL. A2'de
                 ilk yazımda burada UAE_CT.threshold.label ("375.000 AED")
                 yazıyordu ve aylık dönemde YANLIŞ oluyordu: ölçeğin sağ ucu
                 200.000 iken işaret "375.000" diyordu. İşaret doğru yerde
                 duruyordu, etiketi yıllık sayıyı yazıyordu. */
              etiket: `${i.ad} · ${bicim(i.deger / kat)}`,
            }))}
            solUc="0"
            sagUc={`${formatAmount(surguUst)} ${cur}`}
          />
        </GirdiSatiri>

        <Hazirlar degerler={hazir} secili={girilen} onSec={(n) => setValue(formatAmount(n))} yaz={formatAmount} />

        <Yardim id={`${uid}-yardim`}>
          {ornekte && <b>Kutudaki tutar bir örnek. </b>}
          Ciro değil, vergiye tabi {t.ad}. Binlik ayracı nokta, ondalık virgül.
        </Yardim>

        <Bant
          ikon={<Scale size={14} strokeWidth={1.9} aria-hidden="true" />}
          kicker="Hesaplanan kurumlar vergisi"
          duyuru={
            vergi === null || efektif === null
              ? "Henüz hesap yok."
              : `Hesaplanan kurumlar vergisi ${formatAmount(vergi)} ${cur}. Temsilî efektif oran ${formatPercent(efektif, 2)}.`
          }
          gosterge={
            vergi !== null && efektif !== null ? (
              <>
                <Halka oran={efektif / ustOran}>
                  <Sayac deger={efektif} yuzde ondalik={2} />
                </Halka>
                <p className="ta-oranlar-t">
                  <b>Efektif oran</b>
                  <span>
                    {ulke === "dubai" ? (
                      <>
                        Üst oran {UAE_CT.upper.label}; eşiğe kadarki kısma {UAE_CT.lower.label}.
                      </>
                    ) : (
                      <>
                        Ana oran {UK_CT.main.label}, küçük kâr oranı {UK_CT.small.label}.
                      </>
                    )}
                  </span>
                </p>
              </>
            ) : undefined
          }
        >
          {vergi === null ? (
            <span className="ta-bant-bos">—</span>
          ) : (
            <>
              <Sayac deger={vergi} />
              <span className="ta-bant-c">{cur}</span>
            </>
          )}
        </Bant>

        {/* Bölüşüm: kazancın/kârın ne kadarı şirkette kalıyor. İki ülkede de
            aynı soru, o yüzden aynı parça. Büyük rakam BEYAZ tarafta kaldı
            (banttaki vergiyle ikisi çubukta hâlâ birlikte okunuyor). */}
        <Bolusum
          baslik="Örnek dağılım"
          ustbilgi={
            profit === null ? "rakam girilmedi" : `${formatAmount(profit)} ${cur} üzerinden`
          }
          kalem={{
            etiket: `Şirkette kalan`,
            ton: "mavi",
            bos: kalan === null,
            deger:
              kalan === null ? (
                "—"
              ) : (
                <>
                  <Sayac deger={kalan} />
                  <span className="ta-kalan-c">{cur}</span>
                </>
              ),
          }}
          paylar={[
            { oran: pay(kalan ?? 0), ton: "mavi" },
            { oran: pay(vergi ?? 0), ton: "koyu" },
          ]}
          not={{
            id: `${uid}-hata`,
            hata: okunamadi,
            metin: okunamadi ? (
              <>
                “{value}” bir tutar olarak okunamadı. Yalnızca rakam kullanın; binlik ayracı
                nokta, ondalık virgül.
              </>
            ) : profit === null ? (
              `Bir rakam yazın, dağılım burada oluşsun.`
            ) : bae ? (
              <BaeCumle profit={profit} />
            ) : ing ? (
              <IngCumle r={ing} />
            ) : null,
          }}
        />
      </Tezgah>

      {profit !== null && (bae || ing) && (
        <Satirlar>
          {/* Aylık girdide ilk satır çevrimin kendisi: çarpım görünmeden
              sonraki satırların matrahı havadan gelmiş gibi duruyordu. */}
          {donem === "aylik" && girilen !== null && (
            <Satir
              ikon={<CalendarDays size={15} strokeWidth={1.9} />}
              baslik={`Yıllık ${t.ad}`}
              alt={`Aylık ${formatAmount(girilen)} × 12`}
              oran={1}
              ton="acik"
              deger={formatAmount(profit)}
              birim={cur}
            />
          )}
          {bae ? <BaeSatirlar profit={profit} r={bae} /> : ing ? <IngSatirlar profit={profit} r={ing} /> : null}
        </Satirlar>
      )}

      {ulke === "dubai" ? <BaeKural /> : <IngKural />}

      <Dip not={ESTIMATE_NOTE}>
        <AskCta />
      </Dip>

      {/* Aracın kendi varsayımları. Kabuğun "ne değil" satırı hemen altta ve
          iki liste CSS'te tek liste gibi birleşiyor. */}
      <DerinListe>
        <Derin
          ikon={<CalendarDays size={16} strokeWidth={1.9} />}
          baslik="Aylık tutar nasıl çevriliyor"
          ipucu="12 ile çarpılıyor; on iki ay birbirine eşit sayılıyor."
        >
          Vergi yılın tamamındaki vergiye tabi {t.ad} üzerinden hesaplanıyor. Aylık seçildiğinde
          girdiğiniz tutar 12 ile çarpılıyor ve çarpım dökümün ilk satırında yazıyor. Aylarınız
          birbirinden farklıysa yıllık toplamı yazmak daha doğru sonuç verir.
        </Derin>
        {ulke === "ingiltere" && (
          <Derin
            ikon={<Timer size={16} strokeWidth={1.9} />}
            baslik="Kısa dönem ve muaf kâr payı"
            ipucu="Araç on iki aylık dönem ve muaf kâr payı olmadığı varsayımıyla hesaplıyor."
          >
            Hesap dönemi on iki aydan kısaysa iki sınır aynı oranda küçülüyor. Şirketin aldığı bazı
            muaf kâr payları (exempt distributions) da sınırlarla kıyaslanan tutara ekleniyor.
            İkisi de sonucu değiştirebilir; araç ikisini de hesaba katmıyor.
          </Derin>
        )}
      </DerinListe>
    </>
  );
}

/* ================================================================= BAE ==== */

/* Kural dipnotu. Cümle countryContent'teki DOĞRULANMIŞ satırdan aynen
   (ruleOf). Kaynak çipi Dubai sayfasının vergi bölümüne gidiyor: bu oranın
   sitede yayımlandığı yer orası; resmî bir otorite adresi rates.ts'te yok
   (değerler depo satırı + belge s.6) ve uydurulmadı. */
function BaeKural() {
  if (!BAE_KURAL) return null;
  return (
    <Kural
      ikon={<Scale size={18} strokeWidth={1.9} />}
      baslik="Uygulanan kural"
      kaynak={<Kaynak href="/dubai#vergi">Dubai vergi çerçevesi</Kaynak>}
      teyit={BAE_TEYIT ? "Oran ve eşik mali müşavir onayından henüz geçmedi." : undefined}
    >
      {BAE_KURAL.value}. {BAE_KURAL.note}
    </Kural>
  );
}

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

/* İKİ DİLİM + TOPLAM. Toplam satırı gerçekten iki satırın toplamı
   (0 + 11.250 = 11.250); "vergi sonrası kalan" DEĞİL — o sayının adı
   bölüşümde "Şirkette kalan" ve tek yerde durması gerekiyor. */
function BaeSatirlar({ profit, r }: { profit: number; r: ReturnType<typeof baeHesap> }) {
  const { lowerBase, upperBase, tax } = r;
  const { threshold, lower, upper, currency: c } = UAE_CT;
  const pay = (v: number) => (profit > 0 ? v / profit : 0);
  return (
    <>
      <Satir
        ikon={<Layers size={15} strokeWidth={1.9} />}
        baslik={`${threshold.label} ve altı`}
        alt={`${formatAmount(lowerBase)} × ${lower.label}`}
        oran={pay(lowerBase)}
        ton="acik"
        deger={formatAmount(lowerBase * lower.value)}
        birim={c}
      />
      <Satir
        ikon={<Layers size={15} strokeWidth={1.9} />}
        baslik="Eşiği aşan kısım"
        alt={`${formatAmount(upperBase)} × ${upper.label}`}
        oran={pay(upperBase)}
        ton="mavi"
        deger={formatAmount(upperBase * upper.value)}
        birim={c}
      />
      <Satir
        toplam
        ikon={<Wallet size={15} strokeWidth={1.9} />}
        baslik="Ödenecek kurumlar vergisi"
        alt={`${formatAmount(lowerBase * lower.value)} + ${formatAmount(upperBase * upper.value)} ${c}`}
        /* Toplam satırının çubuğu verginin kazanca oranı; 500.000'de %2,25 ve
           400 px'lik rayda 9 px. İnceliği bir kusur değil aracın söylediği
           şey: oran kazancın tamamına uygulanmıyor. */
        oran={pay(tax)}
        deger={<Sayac deger={tax} />}
        birim={c}
      />
    </>
  );
}

/* ============================================================ İNGİLTERE ==== */

/* Kural cümlesi BAE'dekinden farklı kuruluyor ve bu bilinçli: İngiltere'nin
   countryContent satırı ("Kâr dilimine göre %19-25") SWAP:UK_CT_RATE ile
   teyitsiz ve iki sınırı vermiyor. Burada cümlenin kelimeleri bu dosyada,
   SAYILARI rates.ts'ten ve kaynağın bağlantısı çipte: gözden geçiren kişi
   cümleyi, sayıyı ve otoritenin tablosunu yan yana görüyor. Çipin adı görünür
   metni İÇERİYOR (etiket-ad eşleşmesi) ve yeni sekmeyi söylüyor. */
function IngKural() {
  const { small, main, lower, upper, fraction, source, year } = UK_CT;
  return (
    <Kural
      ikon={<Scale size={18} strokeWidth={1.9} />}
      baslik={`Uygulanan kural · ${year}`}
      kaynak={
        <Kaynak
          href={source.url}
          dis={`GOV.UK · ${source.title}, ${source.updated} güncellemesi, yeni sekmede açılır`}
        >
          GOV.UK · {source.title}
        </Kaynak>
      }
      teyit={ING_TEYIT ? "Oran ve sınırlar mali müşavir onayından henüz geçmedi." : undefined}
    >
      Kâr {lower.label} ve altındaysa tamamına {small.label}, {upper.label} ve üstündeyse
      tamamına {main.label}. Arada tamamına {main.label} uygulanıp {fraction.label} × (
      {formatAmount(upper.value)} − kâr) kadar marjinal indirim düşülüyor.
    </Kural>
  );
}

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

/* Satırlar banda göre değişiyor (gerekçe dosya başında). Eksi işareti
   U+2212: kısa çizgi (-) tabular rakamların yanında kısa kalıyor ve bir tire
   gibi okunuyor.

   MİNİ ÇUBUKLAR BURADA DA KÂRIN TAMAMINA oranlı, satırların kendi
   aralarına değil — BAE'yle aynı ölçek kuralı. Böylece toplam satırının
   çubuğu doğrudan efektif oranı çiziyor (%22,33'te rayın beşte biri) ve
   indirim satırının çubuğu indirimin kâra oranı kadar kalıyor. */
function IngSatirlar({ profit, r }: { profit: number; r: ReturnType<typeof ingHesap> }) {
  const { small, main, upper, fraction, currency: c } = UK_CT;
  const p = formatAmount(profit);
  const pay = (v: number) => (profit > 0 ? v / profit : 0);
  return (
    <>
      {r.bant !== "kucuk" && (
        <>
          <Satir
            ikon={<Percent size={15} strokeWidth={1.9} />}
            baslik="Ana oran"
            alt={`${p} × ${main.label}`}
            oran={pay(r.anaVergi)}
            ton="mavi"
            deger={formatAmount(r.anaVergi)}
            birim={c}
          />
          <Satir
            ikon={<Minus size={15} strokeWidth={1.9} />}
            baslik="Marjinal indirim"
            alt={
              r.bant === "arada"
                ? `${fraction.label} × (${formatAmount(upper.value)} − ${p})`
                : "üst sınıra ulaşıldı"
            }
            oran={pay(r.indirim)}
            ton="acik"
            deger={r.indirim > 0 ? `−${formatAmount(r.indirim)}` : "0"}
            birim={c}
          />
        </>
      )}
      <Satir
        toplam
        ikon={<Wallet size={15} strokeWidth={1.9} />}
        baslik="Ödenecek kurumlar vergisi"
        alt={
          r.bant === "kucuk"
            ? `${p} × ${small.label}`
            : `${formatAmount(r.anaVergi)} − ${formatAmount(r.indirim)} ${c}, tam sterline yuvarlı`
        }
        oran={pay(r.vergi)}
        deger={<Sayac deger={r.vergi} />}
        birim={c}
      />
    </>
  );
}

/* ================================================================= KKTC ==== */

/* Hesap yok; sebebi sitenin kendi cümlesi (KKTC_CT.decision =
   countryContent.kktc.tax.note), burada yeniden yazılmıyor.

   Sonraki adım AskCta, çünkü sitenin tek soru çıkışı o; hedefi /basla'ya
   ülkeyi taşıyor (sitedeki kalıp: FitTest · PriceSummary · CountryPricing
   "/basla?ulke=…"). Etiket "Sorularınız mı var?" değil: kararın cümlesi
   "size uygulanacak çerçeveyi yazılı teklifte satır satır yazıyoruz" diyor,
   sonraki adım da o teklif. AskCta bandın İÇİNDE ve `tone="solid"`: koyu
   zeminde kenarlıklı hâli okunmuyor.

   BANT ARIA-HIDDEN DEĞİL (Bant · `duyuru` verilmedi): buradaki büyük metin
   bir sayı değil bir cümle ve kendisi okunmalı. Sayan rakam da yok, yani
   ara kareler diye bir sorun doğmuyor. */
function KktcArac() {
  return (
    <>
      <AracKunye
        ad="Kurumlar vergisi"
        /* KKTC künyesinde para birimi YOK: hesap yapılmıyor, birim yazmak
           hesap vaadi olurdu. Bayrak öteki iki ülkedeki gibi var — eksik
           olan hesap, ülke değil. */
        alt={COUNTRY_NAME.kktc}
        ulke="kktc"
        yol={ULKE_YOLU}
      />

      <Tezgah
        kicker={
          <>
            <Info size={15} strokeWidth={2.1} aria-hidden="true" />
            Sitenin yayın kararı
          </>
        }
      >
        <Bant
          ikon={<Scale size={14} strokeWidth={1.9} aria-hidden="true" />}
          kicker={`${COUNTRY_NAME.kktc} · kurumlar vergisi`}
          alt={KKTC_CT.decision}
          eylem={<AskCta label="Yazılı teklif isteyin" href="/basla?ulke=kktc" tone="solid" />}
        >
          <span className="ta-bant-karar">{KKTC_KISA}</span>
        </Bant>
      </Tezgah>

      {/* Sitede yayımlanan çerçeve satırı kural dipnotuna geçti: burada
          "uygulanan kural" gerçekten o satır. İkinci satır (beyan) açılır
          listeye indi — ikisini bir dökümde toplamak, hesabın olmadığı yerde
          hesap satırı gibi okunurdu. Etiket değişirse ikisi de susuyor
          (ruleOf), uydurulmuyor.

          KAYNAK ÇİPİ YOK ve bu ölçülerek karar verildi. Satırın yayımlandığı
          yer /kktc#vergi ama /kktc DOLAŞIMA KAPALI (routes.ts · STATIC_LIVE
          listesinde yok); SmartLink kapalı adreste bağlantı değil <span>
          basıyor, yani çip tıklanmayan bir rozet olarak duruyordu. Kaynağı
          olmayan yerde kaynak çipi basmıyoruz.

          TEYİT SATIRI DA YOK: teyit bir ORANIN mali müşavir onayını bekliyor
          demek, burada onay bekleyen bir oran yok — sitenin kararı zaten
          "oran yayımlamıyoruz". */}
      {KKTC_SATIR && (
        <Kural ikon={<Scale size={18} strokeWidth={1.9} />} baslik="Sitede yayımlanan çerçeve">
          {KKTC_SATIR.label}: {KKTC_SATIR.value}. {KKTC_SATIR.note}
        </Kural>
      )}

      {/* TAHMİN İBARESİ VE İKİNCİ SORU ÇIKIŞI YOK. İbare ("bu sonuç bir
          tahmindir") bir tahmin üretilen yerde anlamlı; burada sayı yok.
          İkinci AskCta da bandın içindekiyle aynı sayfada iki kez aynı
          düğme demekti. */}

      <DerinListe>
        {KKTC_BEYAN && (
          <Derin
            ikon={<FileSignature size={16} strokeWidth={1.9} />}
            baslik={KKTC_BEYAN.label}
            ipucu={KKTC_BEYAN.value}
          />
        )}
      </DerinListe>
    </>
  );
}
