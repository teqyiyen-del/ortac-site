import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ============================================================================
   SWAP:TOOL_RATES — hesaplayıcıların kullandığı BÜTÜN oran ve eşikler
   ============================================================================

   NEDEN TEK DOSYA

   Araçlar bölümünün ağırlığı bu turda huninin tepesine kaydı: vergi
   hesaplayıcıları. Hesaplayıcı demek, ekranda bir SAYI üretmek demek — ve bir
   şirket kuruluş sitesinde yanlış basılmış bir vergi oranı, yanlış yazılmış bir
   cümleden başka bir sınıfta hata. O yüzden buradaki kural sert:

     Hiçbir bileşen kendi içinde oran ya da eşik taşımıyor. Hepsi burada,
     kaynağıyla birlikte. Müşteri tek bir dosyaya bakıp "evet, bu oranlar
     doğru" diyebiliyor; onaylandığında da dokunulacak tek yer burası.

   HER DEĞERİN İKİ KAYNAĞI VAR VE İKİSİ DE YAZILI
     · `repoRule` — depodaki DOĞRULANMIŞ metin (lib/countryContent.ts). Araç bu
       cümleyi ekranda AYNEN basıyor, yani ziyaretçi hesabın dayandığı kuralı
       sayının hemen yanında okuyor.
     · İkinci kaynak İKİ TÜRDEN BİRİ (tip bunu zorunlu tutuyor, bkz. ToolRate):
         `docPage`  — müşterinin ajansının hazırladığı araç analizi belgesindeki
                      sayfa. Belge bir rakip analizi, hukuki teyit değil; o
                      yüzden tek başına yeterli sayılmıyor. BAE değerleri bu.
         `official` — oranı yayımlayan otoritenin KENDİ sayfası: adresi, başlığı,
                      sayfanın kendi güncelleme tarihi ve bu depoda açılıp
                      okunduğu gün. İngiltere değerleri bu (11.09.2026 turu).
       `official` belgeden güçlü bir kaynak ama o da `confirmed` alanını true
       yapmıyor: teyit, müşterinin mali müşavirinin "bu sayıyı sitede
       yayımlayabiliriz" demesi. Resmî tabloyu okumuş olmamız o kararın yerine
       geçmiyor.

   `confirmed: false` NE DEMEK
   Sayı kullanılabilir ama TEYİT EDİLMEDİ. Araçlar bunu saklamıyor: sonucun
   altında oranın teyit beklediği yazıyor. Alan true olduğunda o satır kendi
   kendine kayboluyor — yani onay, arayüzde de karşılığı olan bir işlem.

   BURADA OLMAYANLAR VE NEDENİ
     · İngiltere KDV — belge %20 diyor (s.7) ama kayıt eşiği için sayı vermiyor
       ve depoda da yok ("Eşik aşılırsa zorunlu"). Yalnızca oranla bir KDV
       aracı yazılabilirdi; eşik kontrolü aracın yarısı olduğu için beklettik.
     · KKTC ORANI — countryContent.ts açıkça "bu sayfada oran yayımlamıyoruz"
       diyor. Belgedeki %0 / ~%1 / %10+%15 üçlüsü (s.8) sitenin kendi yayın
       kararıyla çelişiyor. Bu çelişki bir araçla değil, müşteriyle çözülür.
       Dosyada bir KKTC kaydı VAR ama içinde tek sayı yok: yalnızca sitenin
       yayın kararını ve yayımlanan satırı gösteriyor (aşağıda KKTC_CT).

   BU LİSTEDEN ÇIKAN · İngiltere kurumlar vergisi (11.09.2026)
   Eskiden burada "Marjinal indirim eşiği hiçbir yerde yazmıyor; eşiksiz bir
   dilimli hesap yanlış sonuç üretir" yazıyordu ve doğruydu: depodaki tek satır
   (countryContent · SWAP:UK_CT_RATE) "kâr dilimine göre %19-25" diyor, iki
   sınırı ve indirim kesrini vermiyor. Eksik olan veri değil KAYNAKTI; bu turda
   GOV.UK'nin kendi sayfaları açılıp okundu ve beş değerin beşi de oradan
   geldi (aşağıda UK_CT, her sayfanın adresi yanında). Müşterinin isteği de
   bunu gerektiriyordu: "tek araç sayfası ülke seçimiyle … ingiltere oraya
   göre." countryContent'teki satır DEĞİŞMEDİ ve araç onu değil resmî kaynağı
   ekrana basıyor; o satırın SWAP işareti ana oturumun konusu.
   ========================================================================= */

/** Oranı yayımlayan otoritenin kendi sayfası. Belge sayfası (`docPage`) gibi
 *  bir atıf değil, bir ADRES: gözden geçiren kişi tek tıkla açıp aynı tabloyu
 *  görebiliyor. Tarih alanları iki ayrı soruya cevap veriyor. */
export type OfficialSource = {
  /** sayfanın adresi */
  url: string;
  /** sayfanın kendi başlığı, çevrilmeden — kaynakta aranınca bulunsun */
  title: string;
  /** sayfanın KENDİ "Updated" tarihi: kaynak ne zaman değişti */
  updated: string;
  /** bu depoda açılıp satırın okunduğu gün: biz ne zaman baktık */
  checked: string;
};

type ToolRateBase = {
  /** ekranda ve hesapta kullanılan değer */
  value: number;
  /** insan okunur birim/biçim — arayüz bunu yazıyor, kendi metni yok */
  label: string;
  /** depodaki doğrulanmış satırın etiketi; ruleOf() bununla buluyor */
  repoRow: { country: Country; label: string };
  /** mali müşavir teyidi geldi mi */
  confirmed: boolean;
};

/* TİP BU TURDA GENİŞLEDİ, DARALMADI. Eskiden `docPage: number` zorunluydu ve
   İngiltere değerlerinin belge sayfası yok (belge s.7 İngiltere kurumlar
   vergisi için oran vermiyor). İki yol vardı: `docPage`'i isteğe bağlı yapmak
   ya da ikinci kaynağı bir birleşime çevirmek. İlki elendi: isteğe bağlı alan
   "kaynaksız oran" yazmaya da izin verirdi, yani bu dosyanın tek kuralını
   tipten silerdi. Birleşimde her değer İKİ türden birini taşımak ZORUNDA;
   ikisini de taşımayan değer tsc'den geçmiyor. BAE girdileri hiç değişmedi,
   ilk dala oldukları gibi oturuyorlar. */
export type ToolRate = ToolRateBase &
  (
    | {
        /** müşterinin araç analizi belgesindeki sayfa */
        docPage: number;
      }
    | {
        /** otoritenin kendi yayımladığı sayfa */
        official: OfficialSource;
      }
  );

/* ------------------------------------------------------- BAE kurumlar vergisi
   Depo satırı: "375.000 AED'ye kadar %0, üzeri %9" (countryContent.dubai.tax).
   Belge s.6: "BAE Kurumlar Vergisi Hesaplayıcı — %9 oran, 375.000 AED muafiyet
   eşiği." İki kaynak birbirini tutuyor; yine de teyit bekliyor. */
export const UAE_CT = {
  /** eşiğe kadar olan kısma uygulanan oran */
  lower: {
    value: 0,
    label: "%0",
    repoRow: { country: "dubai", label: "Kurumlar vergisi" },
    docPage: 6,
    confirmed: false,
  } satisfies ToolRate,
  /** eşiği AŞAN kısma uygulanan oran */
  upper: {
    value: 0.09,
    label: "%9",
    repoRow: { country: "dubai", label: "Kurumlar vergisi" },
    docPage: 6,
    confirmed: false,
  } satisfies ToolRate,
  /** dilim eşiği, AED */
  threshold: {
    value: 375_000,
    label: "375.000 AED",
    repoRow: { country: "dubai", label: "Kurumlar vergisi" },
    docPage: 6,
    confirmed: false,
  } satisfies ToolRate,
  currency: "AED",
} as const;

/* ------------------------------------------------------------------- BAE KDV
   Depo satırı: "%5" + notu "Yıllık vergiye tabi tedarik 375.000 AED eşiğini
   aşarsa kayıt zorunlu." Belge s.6: "%5 KDV, dâhil/hariç hesap."
   Eşik sayısı kurumlar vergisininkiyle aynı ama AYNI ŞEY DEĞİL: biri vergiye
   tabi kazanç, öteki yıllık vergiye tabi tedarik. Bilerek ayrı tanımlandı —
   birini değiştiren öteki hakkında karar vermiş olmasın. */
export const UAE_VAT = {
  rate: {
    value: 0.05,
    label: "%5",
    repoRow: { country: "dubai", label: "KDV" },
    docPage: 6,
    confirmed: false,
  } satisfies ToolRate,
  /** kayıt zorunluluğu eşiği — yıllık vergiye tabi tedarik, AED */
  registration: {
    value: 375_000,
    label: "375.000 AED",
    repoRow: { country: "dubai", label: "KDV" },
    docPage: 6,
    confirmed: false,
  } satisfies ToolRate,
  currency: "AED",
} as const;

/* ------------------------------------------------- İngiltere kurumlar vergisi
   KAYNAK — dört GOV.UK sayfası, 11.09.2026'da bu turda açılıp okundu:

   1) Rates and allowances: Corporation Tax · güncelleme 1 Nisan 2026
      https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax
      Tablonun başlığı "Rates for Corporation Tax years starting 1 April",
      2026 sütunu: Small profits rate 19% · Main rate 25% · Marginal Relief
      lower limit £50,000 · upper limit £250,000 · Standard fraction 3/200.
      2023, 2024 ve 2025 sütunlarının dördü de AYNI değerleri taşıyor.
      → beş değerin beşi buradan. Araçta gösterilen kaynak da bu sayfa.

   2) Marginal Relief for Corporation Tax · güncelleme 5 Ocak 2023
      https://www.gov.uk/guidance/corporation-tax-marginal-relief
      Aynı iki sınır ve iki oran. ARACIN DIŞINDA KALAN iki kural da burada
      yazıyor ve araç ikisini de ekranda söylüyor:
        · ilişkili şirket: "if your company has 3 other associated companies,
          the limits are divided by 4"
        · kısa dönem: "If your accounting period is shorter than 12 months
          these limits are proportionately reduced."

   3) HMRC Company Taxation Manual · CTM03925
      https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03925
      Formül: (F × (U − A)) × (N ÷ A) · F standart kesir, U üst sınır,
      A artırılmış kâr (augmented profits), N vergiye tabi toplam kâr.
      Sayfanın kendi örneği: N 90.000, A 98.000 → indirim 2.094, vergi
      20.406. Aracın hesap fonksiyonu A'yı ayrı parametre olarak alıyor ve
      bu örnekle çağrılınca aynı iki sayıyı veriyor (ölçüm bileşenin
      başındaki yorumda). Ekranda A = N: araç muaf kâr payını sıfır sayıyor
      ve bunu söylüyor.

   4) HMRC Company Taxation Manual · CTM03940
      https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03940
      "A company may be an associated company regardless of where it is tax
      resident." Türkiye'de de şirketi olan bir ziyaretçi için sınırın
      yarıya inebileceği anlamına geliyor; araç bu cümleyi ekranda söylüyor.

   NEDEN BAE GİBİ DİLİMLİ DEĞİL
   İngiltere'de oran kârın DİLİMİNE değil TAMAMINA uygulanıyor: kâr alt sınırı
   aşmıyorsa tamamına %19, üst sınırı aşıyorsa tamamına %25, aradaysa tamamına
   %25 uygulanıp formüldeki indirim düşülüyor. Bu kaydı `lower`/`upper` dilim
   oranları diye yazmak (BAE'deki gibi) kuralı yanlış anlatırdı; o yüzden
   alanların adı otoritenin kendi adları: small · main · lower · upper ·
   fraction.

   countryContent.ingiltere.tax'taki "Kurumlar vergisi" satırı `repoRow` olarak
   bağlı ama ekrana BASILMIYOR: o satır SWAP:UK_CT_RATE ile teyitsiz ve
   sınırları vermiyor. Bağ yalnızca izlenebilirlik için — sitenin ülke
   sayfasında yazan cümle ile aracın sayısı aynı vergiyi anlatıyor. */
const GOV_UK_CT = {
  url: "https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax",
  title: "Rates and allowances: Corporation Tax",
  updated: "1 Nisan 2026",
  checked: "11.09.2026",
} as const satisfies OfficialSource;

export const UK_CT = {
  /** küçük kâr oranı — kâr alt sınırı aşmıyorsa kârın TAMAMINA */
  small: {
    value: 0.19,
    label: "%19",
    repoRow: { country: "ingiltere", label: "Kurumlar vergisi" },
    official: GOV_UK_CT,
    confirmed: false,
  } satisfies ToolRate,
  /** ana oran — üst sınırı aşan kârın TAMAMINA; iki sınır arasında da bu
   *  oran uygulanıp marjinal indirim düşülüyor */
  main: {
    value: 0.25,
    label: "%25",
    repoRow: { country: "ingiltere", label: "Kurumlar vergisi" },
    official: GOV_UK_CT,
    confirmed: false,
  } satisfies ToolRate,
  /** marjinal indirim alt sınırı (lower limit), GBP, 12 aylık dönem, ilişkili şirket yok */
  lower: {
    value: 50_000,
    label: "50.000 GBP",
    repoRow: { country: "ingiltere", label: "Kurumlar vergisi" },
    official: GOV_UK_CT,
    confirmed: false,
  } satisfies ToolRate,
  /** marjinal indirim üst sınırı (upper limit), GBP, aynı iki koşulla */
  upper: {
    value: 250_000,
    label: "250.000 GBP",
    repoRow: { country: "ingiltere", label: "Kurumlar vergisi" },
    official: GOV_UK_CT,
    confirmed: false,
  } satisfies ToolRate,
  /** standart kesir (standard fraction) — formüldeki F. Ondalık değil KESİR
   *  olarak yazılı: 0.015 yazılsaydı kaynaktaki "3/200" ile yan yana
   *  konunca aynı sayı olduğu ilk bakışta görülmezdi. */
  fraction: {
    value: 3 / 200,
    label: "3/200",
    repoRow: { country: "ingiltere", label: "Kurumlar vergisi" },
    official: GOV_UK_CT,
    confirmed: false,
  } satisfies ToolRate,
  /** hangi vergi yılının değerleri — kaynağın tablo başlığından, çevirisi */
  year: "1 Nisan 2026'da başlayan vergi yılı",
  /** araçta gösterilen kaynak bağlantısı */
  source: GOV_UK_CT,
  currency: "GBP",
} as const;

/* ------------------------------------------------------------------- KKTC
   BU BİR ORAN KAYDI DEĞİL ve içinde tek sayı yok. Kurumlar vergisi aracı
   ülke seçimli ve KKTC seçilebiliyor; seçildiğinde araç HESAP YAPMIYOR, çünkü
   sitenin yayın kararı KKTC için oran yayımlamamak (countryContent.kktc.tax).
   Bu bir eksik değil, karar — ve kararın metni burada da bir yerden
   KOPYALANMIYOR: `decision` countryContent'teki cümlenin kendisi. Karar
   değişirse (müşteri KKTC oranı yayımlamaya karar verirse) cümle orada
   değişir, araç kendiliğinden yeni cümleyi basar.

   Kayıt neden burada, bileşenin içinde değil: bu dosya "araçların hesaba
   soktuğu HER ŞEY" dosyası ve KKTC'nin cevabı da o listenin parçası — "oran
   yok" da bir cevap. Gözden geçiren kişi üç ülkenin durumunu tek dosyada
   okuyor. */
export const KKTC_CT = {
  /** sitede yayımlanan satır: "Kurumlar vergisi · Var" + notu */
  repoRow: { country: "kktc", label: "Kurumlar vergisi" },
  /** sitenin yayın kararı, countryContent'ten aynen */
  decision: COUNTRY_CONTENT.kktc.tax.note,
} as const;

/**
 * Bir oranın dayandığı DEPODAKİ cümle. Araçlar hesabın kuralını kendi
 * kelimeleriyle değil bu cümleyle yazıyor: kural ile sayı yan yana durunca
 * gözden geçiren kişi ikisini tek bakışta karşılaştırabiliyor.
 *
 * Satır bulunamazsa null dönüyor ve arayüz kural bloğunu hiç basmıyor —
 * countryContent.ts'te etiket değişirse araç uydurmuyor, susuyor.
 *
 * Parametre bu turda `ToolRate`'ten yalnızca `repoRow`'a daraldı: KKTC
 * kaydının oranı yok ama yayımlanan satırı var, ve aynı fonksiyonla
 * bulunabilmeli. Mevcut çağrılar değişmedi — her ToolRate zaten repoRow taşıyor.
 */
export function ruleOf(
  rate: Pick<ToolRate, "repoRow">,
): { label: string; value: string; note?: string } | null {
  const rows = COUNTRY_CONTENT[rate.repoRow.country].tax.rows;
  return rows.find((r) => r.label === rate.repoRow.label) ?? null;
}

/** Aracın altında basılan teyit uyarısı. Onaylanan oranda satır kaybolsun diye
 *  karar burada veriliyor, her araçta ayrı ayrı değil. */
export function needsConfirm(...rates: ToolRate[]): boolean {
  return rates.some((r) => !r.confirmed);
}

/** Bütün araçların altında geçen ortak ibare — belgenin de istediği cümle
 *  ("Rakiplerin hepsi araç sonucuna 'tahmindir, teklif değildir' ibaresi
 *  koyuyor. Biz de koyacağız", belge s.3). Tek yerden, çünkü tek cümle. */
export const ESTIMATE_NOTE =
  "Bu sonuç bir tahmindir, teklif değildir. Size uygulanacak çerçeveyi yazılı teklifte satır satır yazıyoruz.";
