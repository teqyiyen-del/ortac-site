"use client";

import { useId, useState, type ReactNode } from "react";
import {
  CalendarDays,
  CalendarRange,
  Calculator,
  Coins,
  FileSignature,
  Globe,
  Landmark,
  Layers,
  Minus,
  Percent,
  Scale,
  Timer,
  Wallet,
} from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import {
  Adim,
  AracDefter,
  AracIs,
  AracKart,
  BayrakDisk,
  DefterNot,
  Derin,
  DerinListe,
  Dokum,
  DokumSatir,
  Halka,
  Kaynak,
  Kural,
  Olcek,
  PayCubugu,
  Sayac,
  Secenek,
  Secenekler,
  Sonuc,
  UlkeYolu,
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
   göre ingiltere oraya göre gibi." Sonra (11.09.2026 · araç dili turu):
   "kurumlar vergisi hesaplayıcıya tek tuşla girilsin evet ama içerden
   ülkeye göre ayrılsın ve link değişsin istiyorum. google a hepsini ayrı
   ayrı indexlemek istiyorum."

   Yani araç TEK (menüde tek kart, tek bileşen), sayfası ÜÇ:
   /araclar/kurumlar-vergisi/{dubai,ingiltere,kktc}. Bileşen ülkeyi prop
   olarak alıyor; ülke seçimi artık bir radyo değil bir BAĞLANTI
   (ToolShell · UlkeYolu, aria-current="page") ve adresi değiştiriyor.
   Adres kuralı catalog.ts · kvHref; sayfa app/araclar/kurumlar-vergisi/[ulke].

   ÜLKE DEĞİŞİNCE TUTAR TAŞINMIYOR — artık yapı gereği. Eskiden her ülke
   kendi kutusunu bir state nesnesinde hatırlıyordu, çünkü "500.000" AED
   olarak yazılıp İngiltere'ye geçildiğinde aynı rakam 500.000 GBP diye
   hesaplanırdı: aynı sayı, yaklaşık beş kat farklı bir para. Kur çevrimi bir
   oran uydurmak olurdu (sitenin kıyas bölümü de çevirmiyor, CountryTax.tsx).
   Şimdi her ülke ayrı sayfa ve sayfa bileşeni `key={ulke}` ile takıyor: ülke
   değişince bileşen sıfırdan kuruluyor, kutu o ülkenin örnek tutarıyla
   açılıyor. Geri dönüldüğünde yazılan geri GELMİYOR (eski davranıştan tek
   kayıp); bir sayfa değişiminin arasında girdiyi tutmak için adrese ya da
   depoya yazmak gerekirdi ve ikisi de bu turun kapsamı değildi.

   SAYILAR NEREDEN
   Tek kaynak lib/tools/rates.ts: UAE_CT · UK_CT · KKTC_CT. Bu dosyada tek bir
   oran, sınır ya da kesir sabiti YOK. Hazır çiplerdeki sınır değerleri de
   (375.000 · 50.000 · 250.000) sabit yazılmadı, rates.ts'ten okunuyor.

   ---------------------------------------------------------------------------
   SUNUM · ARAÇ DİLİ TURU (11.09.2026)

   Müşteri: "tasarımlar fena kötü … icondur, bayraktır, kontrasttır bir
   şeyler ekle … uygunluk testimiz güzeldi … karman çorman." Hesap mantığına
   DOKUNULMADI (aşağıdaki iki fonksiyon bayt bayt eski dosyadan); değişen
   yalnız sunum ve ortak dil ToolShell.tsx'te. Burada o dilin ilk kullanıcısı:

     SOLDA  beyaz çalışma paneli — künye ("Kurumlar vergisi · Dubai · AED",
            sağda dolu adım sayacı ve saç teli), üç adım (ülke bağlantıları
            bayraklı · dönem şıkları ikonlu · tutar kutusu), dipte kuralın
            özeti ve kaynağı.
     SAĞDA  gece "hesap defteri" — sayarak değişen vergi, efektif oranın
            halkası, kazancın dilimleri (BAE) ya da hangi bantta olunduğu
            (İngiltere), döküm satırları, dipnot.
     ALTTA  açılır satırlar: aracın varsayımları + kabuğun "ne değil"i.

   ESKİDEN EKRANDA OLUP ARTIK AÇILIRDA OLANLAR: aylık girdinin varsayımı,
   İngiltere'nin kısa dönem ve muaf kâr payı notu. İlişkili şirket notu ve
   serbest bölge notu sayfanın SSS'ine geçti (app/araclar/kurumlar-vergisi ·
   icerik.ts) — iki yerde birden basılmasın diye buradan kalktı. Teyit
   uyarısının kehribar kutusu tek satıra indi ve kuralın dibinde duruyor.
   Hesap tablosu (<table>) defterin döküm satırlarına döndü; satırlar aynı:
   matrah × oran = vergi.

   ÖRNEK TUTARLA AÇILIYOR. Eskiden kutu boştu ve sağ taraf "Kazancınızı
   yazın" diyen gri bir kutuydu; sonucun canlı olduğu, ilk rakam yazılana
   kadar görünmüyordu. Artık kutu yer tutucusunun kendisiyle (Dubai 500.000,
   İngiltere 100.000) dolu açılıyor, defter o örneğin sonucunu gösteriyor ve
   yardım satırı "Kutudaki tutar bir örnek" diyor. Sitede emsali var: Dubai
   sayfasının vergi özeti de 900.000 ile açılıyor (CountryTax · TAX_SWAP).
   Örnek bir İDDİA değil, tıpkı hazır çipler gibi (bkz. HAZIR TUTARLAR).

   ---------------------------------------------------------------------------
   BAE TARAFI · UaeCorporateTax.tsx'ten AYNEN taşındı (bir tur önce)

   NE YAPIYOR. Vergiye tabi kazancı iki dilime bölüyor — eşiğe kadarı ve eşiği
   aşan kısım — her birine kendi oranını uygulayıp toplamı ve efektif oranı
   yazıyor. Kural cümlesi yeniden yazılmıyor: ruleOf() countryContent.ts'teki
   doğrulanmış satırı getiriyor ve ekrana aynen basılıyor.

   EFEKTİF ORAN NEDEN VAR. Asıl işi yapan satır o. "%9" korkutucu bir sayı ama
   eşik altı %0 olduğu için gerçek yük her zaman daha düşük; 500.000 AED
   kazançta efektif oran %2,25. Bu turda halkaya döndü: halkanın dolu kısmı
   efektif oranın üst orana payı, yani "%9'un ne kadarı gerçekten ödeniyor".

   DÖNEM. "Aylık" seçilince girilen tutar 12 ile çarpılıyor, o kadar; çarpım
   defterde ilk satır olarak yazıyor. Varsayım (on iki ay eşit) açılırda.

   SERBEST BÖLGE MUAFİYETİ HESABA GİRMİYOR ve bu karar. countryContent.ts:
   "Serbest bölge şirketi olmak otomatik muafiyet vermiyor…". Bir kutucuk
   koysaydık araç, karşılığı olmayan bir "%0" sonucu üretirdi.

   ---------------------------------------------------------------------------
   İNGİLTERE TARAFI

   DİLİMLİ DEĞİL. BAE'de oran kazancın DİLİMİNE uygulanıyor; İngiltere'de
   kârın TAMAMINA. Kâr alt sınırı aşmıyorsa tamamına %19, üst sınıra
   ulaşıyorsa tamamına %25, arada tamamına %25 uygulanıp marjinal indirim
   düşülüyor. O yüzden defterde BAE'nin pay çubuğu yerine bir BANT ÖLÇEĞİ
   var: üç rejim yan yana, imleç kârın bulunduğu yerde.

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
   Araç dili turunda aynı ölçüm fonksiyonlar yeni dosyadan çağrılarak
   TEKRARLANDI; sayılar ana oturuma dönen raporda.

   İKİ SINIRIN ARASINDA EK KÂRIN VERGİSİ %26,5. Uydurma bir oran değil,
   formülün türevi: vergi = %25·N − F·(U − N), yani her ek sterlin %25 artı
   F = 3/200 kadar vergi ekliyor. formatPercent(main + fraction) ile basılıyor.

   YUVARLAMA · TAM STERLİN, SATIR SATIR. Ana oranla vergi ve indirim ayrı ayrı
   tam sterline yuvarlanıyor, ödenecek vergi yuvarlanmış iki satırın farkı.
   Kaynağın kendi örneği de böyle (2.093,88 → 2.094; 22.500 − 2.094 = 20.406).
   ÖLÇÜLDÜ: 0 ile 600.000 arasında 7'şer adımla 85.715 noktada kesin
   formülden en büyük sapma 0,99 GBP, ekranda tutmayan çıkarma sıfır.

   ---------------------------------------------------------------------------
   KKTC TARAFI · hesap YOK

   Bu bir eksik değil, sitenin yayın kararı (countryContent.kktc.tax: "KKTC
   için bu sayfada oran yayımlamıyoruz"). KKTC sayfasında tutar alanı ve dönem
   hiç basılmıyor; defterin sonucunda sitenin kendi cümlesi, altında sitede
   yayımlanan çerçeve satırları, çalışma panelinde bir sonraki adım (yazılı
   teklif). Tek sayı yok.

   Sonuç bölgesi (ToolShell · Sonuc, role="status") üç ülkede de AYNI öge ve
   hep DOM'da: aria-live bölgesi sonradan eklenirse ekran okuyucu ilk
   duyuruyu yutuyor.
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

/* Dönem şıkkının diski. Uygunluk testinde ikonsuz şıklar HARF alıyordu
   (anlam uydurmamak için); burada iki şıkkın ikisinin de ayırt edici bir
   glifi var — uzun takvim aralığı ve tek ay. */
const DONEM_IKON: Record<Donem, ReactNode> = {
  yillik: <CalendarRange size={20} strokeWidth={1.9} />,
  aylik: <CalendarDays size={20} strokeWidth={1.9} />,
};

/* Örnek girdiler, iddia değil (HAZIR TUTARLAR).
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

/* Ülke bağlantısının alt satırı: tıklamadan önce neyin değişeceğini söylüyor.
   Oranlar rates.ts'in etiketlerinden; KKTC'de sayı yerine karar. */
const ULKE_IPUCU: Record<CountrySlug, string> = {
  dubai: `${UAE_CT.currency} · ${UAE_CT.lower.label} ve ${UAE_CT.upper.label}, iki dilim`,
  ingiltere: `${UK_CT.currency} · ${UK_CT.small.label} ile ${UK_CT.main.label} arası`,
  kktc: "Oran yayımlanmıyor",
};

/* Üç ülke bağlantısı. Adres defterden (kvHref), elle yazılmıyor. */
const ULKE_YOLU = COUNTRY_ORDER.map((c) => ({ ulke: c, href: kvHref(c), ipucu: ULKE_IPUCU[c] }));

/* Ülkeye göre değişen sözcükler. BAE metinleri "vergiye tabi kazanç" diyor;
   İngiltere kaynağı "taxable profits" diyor ve defterin kendi cümlesi de
   "kâr". `ornek` hem kutunun yer tutucusu hem AÇILIŞ DEĞERİ (bkz. ÖRNEK
   TUTARLA AÇILIYOR): ikisi ayrı sayı olsaydı boş kutuda bir örnek, dolu
   kutuda başka bir örnek görülürdü. */
const TERIM: Record<HesapUlke, { ad: string; Ad: string; ornek: string }> = {
  dubai: { ad: "kazanç", Ad: "Kazanç", ornek: "500.000" },
  ingiltere: { ad: "kâr", Ad: "Kâr", ornek: "100.000" },
};

const BAE_KURAL = ruleOf(UAE_CT.upper);
const BAE_TEYIT = needsConfirm(UAE_CT.lower, UAE_CT.upper, UAE_CT.threshold);
const ING_TEYIT = needsConfirm(UK_CT.small, UK_CT.main, UK_CT.lower, UK_CT.upper, UK_CT.fraction);
const KKTC_SATIR = ruleOf(KKTC_CT);
/* KKTC defterinin ikinci satırı: sitede yayımlanan beyan satırı. ruleOf ile,
   yani countryContent'teki etiket değişirse satır uydurulmuyor, susuyor. */
const KKTC_BEYAN = ruleOf({ repoRow: { country: "kktc", label: "Beyan yükümlülüğü" } });

/* İki sınırın arasında her ek sterlinin vergisi: ana oran + standart kesir
   (türetme dosya başında). Modül düzeyinde bir kez. */
const ING_MARJ = formatPercent(UK_CT.main.value + UK_CT.fraction.value, 1);

const pad = (n: number) => String(n).padStart(2, "0");

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

/* İngiltere ölçeğinin üç bandı. Genişlikler 1 : 2 : 1 ve bu bir GÖRSEL
   karar, sayı ekseni değil: iki sınırın arası kâr ekseninde 200.000'lik bir
   aralık, alt bant 50.000'lik; doğrusal çizilse alt bant 300 px'lik defterde
   yirmi pikselin altına iner ve imleç orada okunmaz. Bantların adı ve
   aralığı altlarında YAZILI, yani ölçeğin doğrusal olmadığı gizli değil. */
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

/** Kâr → imlecin ölçekteki yeri (0..1). Bant içinde doğrusal; son bant açık
 *  uçlu olduğu için üst sınırın iki katında dibe dayanıyor. */
function ingImlec(p: number): number {
  const { lower, upper } = UK_CT;
  if (p <= lower.value) return 0.25 * (p / lower.value);
  if (p < upper.value) return 0.25 + 0.5 * ((p - lower.value) / (upper.value - lower.value));
  return 0.75 + 0.25 * Math.min(1, (p - upper.value) / upper.value);
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
  const kat = donem === "aylik" ? 12 : 1;
  /* Hesabın tamamı YILLIK kazanç üzerinden; dönem yalnızca girdiyi çeviriyor. */
  const profit = girilen === null ? null : girilen * kat;
  const cur = ulke === "ingiltere" ? UK_CT.currency : UAE_CT.currency;

  /* Yazılmış ama okunamamış girdi ayrı bir hâl: "abc" ya da "-5" yazan kişi
     yazdığının neden sonuç vermediğini görebilmeli. num.ts'in sözleşmesi
     değişmedi (okunamayan değer null). */
  const okunamadi = value.trim() !== "" && girilen === null;
  const ornekte = value === t.ornek;

  /* Künyedeki sayaç: dolu adım sayısı. Ülke sayfanın kendisi (hep dolu),
     dönemin varsayılanı var (hep dolu), tutar okunabiliyorsa üçüncü. */
  const dolu = 2 + (profit !== null ? 1 : 0);

  const bae = ulke === "dubai" && profit !== null ? baeHesap(profit) : null;
  const ing = ulke === "ingiltere" && profit !== null ? ingHesap(profit) : null;
  const vergi = bae ? bae.tax : ing ? ing.vergi : null;

  return (
    <>
      <AracKart>
        <AracIs
          baslik="Kurumlar vergisi"
          /* KÜNYEYE BAYRAK (bütünlük denetimi turu). Künye düz metindi ve bu,
             ülke başına ayrılan bir araçta ailenin en görünür eksiğiydi:
             KDV ve SIC künyelerinde bayrak vardı, bu araçta yoktu. Bayrak
             seçilen ülkeyle birlikte değişiyor, yani adres değiştiğinde
             künye de değişiyor — müşterinin "içerden ülkeye göre ayrılsın ve
             link değişsin" isteğinin künyedeki karşılığı.
             Sarmalayıcı yok: hiza ortak kuralda (araclar.css · .ta-bas-s). */
          alt={
            <>
              <BayrakDisk ulke={ulke} boy="xs" />
              {COUNTRY_NAME[ulke]} · {cur}
            </>
          }
          sag={
            <span className="ta-sayim" aria-hidden="true">
              <b>{pad(dolu)}</b> / 03
            </span>
          }
          ilerleme={dolu / 3}
        >
          <Adim
            no={1}
            ikon={<Globe size={18} strokeWidth={1.9} />}
            baslik="Ülke"
            ipucu="Ülke değişince sayfa, para birimi ve kural da değişir."
          >
            <UlkeYolu aktif={ulke} secenekler={ULKE_YOLU} />
          </Adim>

          <Adim no={2} ikon={<CalendarRange size={18} strokeWidth={1.9} />} baslik={`${t.Ad} dönemi`}>
            <Secenekler>
              {DONEMLER.map((d) => (
                <Secenek
                  key={d.key}
                  ad={`${uid}-donem`}
                  secili={d.key === donem}
                  onSec={() => setDonem(d.key)}
                  disk={DONEM_IKON[d.key]}
                  baslik={d.label}
                  ipucu={d.hint}
                />
              ))}
            </Secenekler>
          </Adim>

          <Adim
            no={3}
            akt
            ikon={<Coins size={18} strokeWidth={1.9} />}
            etiketIcin={`${uid}-tutar`}
            baslik={
              /* Boşluk parantezli kuyruğun İÇİNDE: dışarıda bir boşluk metni
                 olarak durunca kutunun erişilebilir adı "kazanç(AED)" diye
                 bitişik okunuyordu (tarayıcıda ölçüldü). */
              <>
                {donem === "aylik" ? "Aylık" : "Yıllık"} vergiye tabi {t.ad}
                <span className="ta-adim-x">{` (${cur})`}</span>
              </>
            }
          >
            {/* type="number" değil: tarayıcının kendi ok tuşları ve yerel
                ayrım işareti davranışı, Türkçe binlik noktasıyla çakışıyor.
                Metin alanı + inputMode="decimal" mobilde de sayı klavyesi
                açıyor. Para birimi kutunun içinde bir rozet (aria-hidden),
                çünkü etiketin kendisi zaten "(AED)" diyor. */}
            <div className="ta-tutar" data-hata={okunamadi ? "" : undefined}>
              <input
                id={`${uid}-tutar`}
                className="ta-girdi"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder={t.ornek}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-describedby={`${uid}-yardim`}
                aria-invalid={okunamadi || undefined}
              />
              <span className="ta-birim" aria-hidden="true">
                {cur}
              </span>
            </div>

            {/* Hazır tutarlar. Düğme, bağlantı değil: sayfayı değiştirmiyor,
                yalnızca kutuyu dolduruyor. Seçili olanı işaretliyoruz ki kişi
                kendi yazdığı sayıyla çipten geleni ayırt edebilsin. */}
            <div className="ta-hazir">
              <span className="ta-hazir-k">Hazır tutarlar</span>
              {HAZIR[ulke][donem].map((h) => (
                <button
                  key={h}
                  type="button"
                  className="ta-hazir-b"
                  data-on={girilen === h ? "" : undefined}
                  onClick={() => setValue(formatAmount(h))}
                >
                  {formatAmount(h)}
                </button>
              ))}
            </div>

            <p id={`${uid}-yardim`} className="ta-yardim">
              {ornekte && <b>Kutudaki tutar bir örnek. </b>}
              Ciro değil, vergiye tabi {t.ad}. Binlik ayracı nokta, ondalık virgül.
            </p>
          </Adim>

          {ulke === "dubai" ? <BaeKural /> : <IngKural />}
        </AracIs>

        <AracDefter
          ikon={<Calculator size={15} strokeWidth={1.9} />}
          baslik="Hesap defteri"
          sag={
            <>
              <BayrakDisk ulke={ulke} boy="xs" />
              {cur}
            </>
          }
        >
          <Sonuc
            etiket="Hesaplanan kurumlar vergisi"
            tetik={vergi ?? (okunamadi ? "hata" : "bos")}
            alt={
              profit === null ? (
                okunamadi ? (
                  <>
                    “{value}” bir tutar olarak okunamadı. Yalnızca rakam kullanın; binlik ayracı
                    nokta, ondalık virgül.
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
              ) : null
            }
          >
            {vergi === null ? (
              <>
                <span className="ta-sonuc-bos" aria-hidden="true">
                  —
                </span>
                <span className="sr-only">Henüz hesap yok.</span>
              </>
            ) : (
              <>
                <Sayac deger={vergi} />
                <span className="ta-sonuc-b">{cur}</span>
              </>
            )}
          </Sonuc>

          {bae && profit !== null && (
            <BaeDefter profit={profit} girilen={girilen} donem={donem} r={bae} />
          )}
          {ing && profit !== null && (
            <IngDefter profit={profit} girilen={girilen} donem={donem} r={ing} />
          )}

          {/* Tahmin ibaresi yalnızca bir tahmin üretilen yerde. KKTC'de sayı
              yok; orada bu satır basılmıyor. */}
          <DefterNot>{ESTIMATE_NOTE}</DefterNot>
        </AracDefter>
      </AracKart>

      {/* Aracın kendi varsayımları. Kabuğun "ne değil" satırı hemen altta ve
          iki liste CSS'te tek liste gibi birleşiyor. */}
      <DerinListe>
        <Derin
          ikon={<CalendarDays size={16} strokeWidth={1.9} />}
          baslik="Aylık tutar nasıl çevriliyor"
          ipucu="12 ile çarpılıyor; on iki ay birbirine eşit sayılıyor."
        >
          Vergi yılın tamamındaki vergiye tabi {t.ad} üzerinden hesaplanıyor. Aylık seçildiğinde
          girdiğiniz tutar 12 ile çarpılıyor ve çarpım defterin ilk satırında yazıyor. Aylarınız
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

/* Kural çalışma panelinin dibinde. Cümle countryContent'teki DOĞRULANMIŞ
   satırdan aynen (ruleOf). Kaynak çipi Dubai sayfasının vergi bölümüne
   gidiyor: bu oranın sitede yayımlandığı yer orası; resmî bir otorite
   adresi rates.ts'te yok (değerler depo satırı + belge s.6) ve uydurulmadı. */
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
    <>
      Oran kazancın tamamına değil, {threshold.label} eşiğini aşan kısmına uygulanıyor.
    </>
  );
}

function BaeDefter({
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
  const { lowerBase, upperBase, tax, effective } = r;
  const { threshold, lower, upper, currency: c } = UAE_CT;
  const pay = (v: number) => (profit > 0 ? v / profit : 0);
  return (
    <>
      <div className="ta-oranlar">
        <Halka oran={effective / upper.value}>
          <Sayac deger={effective} yuzde ondalik={2} />
        </Halka>
        <p className="ta-oranlar-t">
          <b>Efektif oran</b>
          <span>
            Üst oran {upper.label}; eşiğe kadarki kısma {lower.label}.
          </span>
        </p>
      </div>

      {/* Kazancın iki dilimi, payları kadar. Çubuk süs; aynı iki tutar
          altındaki göstergede ve dökümde yazılı. */}
      <div className="ta-dilim">
        <PayCubugu
          parcalar={[
            { oran: pay(lowerBase), ton: "sonuk" },
            { oran: pay(upperBase), ton: "mavi" },
          ]}
        />
        <ul className="ta-dilim-e">
          <li data-ton="sonuk">
            <i aria-hidden="true" />
            {threshold.label}&apos;ye kadar · {lower.label}
          </li>
          <li data-ton="mavi">
            <i aria-hidden="true" />
            Aşan kısım · {upper.label}
          </li>
        </ul>
      </div>

      <Dokum>
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
          alt={`${formatAmount(lowerBase)} × ${lower.label}`}
          deger={formatAmount(lowerBase * lower.value)}
        />
        <DokumSatir
          ikon={<Layers size={14} strokeWidth={1.9} />}
          etiket="Eşiği aşan kısım"
          alt={`${formatAmount(upperBase)} × ${upper.label}`}
          deger={formatAmount(upperBase * upper.value)}
        />
        <DokumSatir
          toplam
          ikon={<Wallet size={14} strokeWidth={1.9} />}
          etiket="Vergi sonrası kalan"
          alt={`${formatAmount(profit)} − ${formatAmount(tax)} ${c}`}
          deger={<Sayac deger={profit - tax} />}
        />
      </Dokum>
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

/* Satırlar banda göre değişiyor: küçük kâr oranında indirim satırı yok,
   çünkü o rejimde indirim diye bir kavram yok; ana oranda VAR ve sıfır, çünkü
   "neden indirim yok" sorusunun cevabı o satır. Eksi işareti U+2212: kısa
   çizgi (-) tabular rakamların yanında kısa kalıyor ve bir tire gibi okunuyor. */
function IngDefter({
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
    <>
      <div className="ta-oranlar">
        <Halka oran={r.efektif / main.value}>
          <Sayac deger={r.efektif} yuzde ondalik={2} />
        </Halka>
        <p className="ta-oranlar-t">
          <b>Efektif oran</b>
          <span>
            Ana oran {main.label}, küçük kâr oranı {small.label}.
          </span>
        </p>
      </div>

      <Olcek bantlar={ING_BANTLAR} imlec={ingImlec(profit)} aktif={ING_BANT_NO[r.bant]} />

      <Dokum>
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
          deger={<Sayac deger={profit - r.vergi} />}
        />
      </Dokum>
    </>
  );
}

/* ================================================================= KKTC ==== */

/* Hesap yok; sebebi sitenin kendi cümlesi (KKTC_CT.decision =
   countryContent.kktc.tax.note), burada yeniden yazılmıyor. "Bu bir eksik
   değil" gibi bir savunma cümlesi bilerek YOK: sitenin başka bir bölümünde
   aynı gerekçeyle silinmişti — kimsenin yöneltmediği bir suçlamaya cevap.

   Sonraki adım AskCta, çünkü sitenin tek soru çıkışı o; hedefi /basla'ya
   ülkeyi taşıyor (sitedeki kalıp: FitTest · PriceSummary · CountryPricing
   "/basla?ulke=…"). Etiket "Sorularınız mı var?" değil: kararın cümlesi
   "size uygulanacak çerçeveyi yazılı teklifte satır satır yazıyoruz" diyor,
   sonraki adım da o teklif.

   Künyede sayaç YOK: sayılacak bir girdi yok. Yerine kararın kendisi rozet
   olarak duruyor. */
function KktcArac() {
  return (
    <AracKart>
      {/* KKTC dalının künyesinde para birimi YOK (hesap yapılmıyor, birim
          yazmak hesap vaadi olurdu) ama bayrak öteki iki ülkedeki gibi var:
          eksik olan hesap, ülke değil. */}
      <AracIs
        baslik="Kurumlar vergisi"
        alt={
          <>
            <BayrakDisk ulke="kktc" boy="xs" />
            {COUNTRY_NAME.kktc}
          </>
        }
        sag={<span className="ta-rozet">{ULKE_IPUCU.kktc}</span>}
      >
        <Adim
          no={1}
          ikon={<Globe size={18} strokeWidth={1.9} />}
          baslik="Ülke"
          ipucu="Hesap Dubai ve İngiltere sayfalarında yapılıyor."
        >
          <UlkeYolu aktif="kktc" secenekler={ULKE_YOLU} />
        </Adim>

        <Adim
          no={2}
          akt
          ikon={<FileSignature size={18} strokeWidth={1.9} />}
          baslik="Sonraki adım: yazılı teklif"
          ipucu="Size uygulanacak oranı ve istisnaları teklifte satır satır yazıyoruz."
        >
          <div className="ta-eylem">
            <AskCta label="Yazılı teklif isteyin" href="/basla?ulke=kktc" />
          </div>
        </Adim>
      </AracIs>

      <AracDefter
        ikon={<Calculator size={15} strokeWidth={1.9} />}
        baslik="Hesap defteri"
        sag={
          <>
            <BayrakDisk ulke="kktc" boy="xs" />
            {COUNTRY_NAME.kktc}
          </>
        }
      >
        <Sonuc etiket={`${COUNTRY_NAME.kktc} · kurumlar vergisi`} tetik="kktc" alt={KKTC_CT.decision}>
          <span className="ta-sonuc-yok">Hesap yapılmıyor</span>
        </Sonuc>

        {/* Sitede yayımlanan çerçeve: countryContent.kktc.tax'ın vergiyle
            ilgili iki satırı. İkisi de oran içermiyor, yani kararla
            çelişmiyor. Etiket değişirse satır susuyor (ruleOf). */}
        {(KKTC_SATIR || KKTC_BEYAN) && (
          <>
            <p className="ta-defter-k">Sitede yayımlanan çerçeve</p>
            <Dokum>
              {KKTC_SATIR && (
                <DokumSatir
                  ikon={<Landmark size={14} strokeWidth={1.9} />}
                  etiket={KKTC_SATIR.label}
                  alt={KKTC_SATIR.note}
                  deger={KKTC_SATIR.value}
                />
              )}
              {KKTC_BEYAN && (
                <DokumSatir
                  yigin
                  ikon={<CalendarDays size={14} strokeWidth={1.9} />}
                  etiket={KKTC_BEYAN.label}
                  deger={KKTC_BEYAN.value}
                />
              )}
            </Dokum>
          </>
        )}
      </AracDefter>
    </AracKart>
  );
}
