import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { CountrySlug } from "@/lib/brand";
import { KKTC_CT, UAE_CT, UK_CT, ruleOf } from "@/lib/tools/rates";
import { formatAmount, formatPercent } from "@/lib/tools/num";
import type { SssMadde } from "@/components/tools/ToolShell";

/* ============================================================================
   KURUMLAR VERGİSİ · ÜLKE SAYFALARININ METNİ — tek kaynak
   ============================================================================

   11.09.2026 · araç dili turu. Müşteri: "google a hepsini ayrı ayrı
   indexlemek istiyorum dubai kurumlar vergisi, ingiltere kurumlar vergisi..."

   Her ülke sayfası Google için ÖZGÜN ama KISA: <title>, açıklama, <h1>, tek
   cümlelik giriş ve 3-4 soruluk açılır SSS. Adresler bu dosyada DEĞİL
   (catalog.ts · kvHref), çünkü adresi menü ve CountryTax gibi istemci
   bileşenleri de okuyor; buradaki metinleri yalnız sunucu sayfası okuyor ve
   countryContent'i (40 KB) istemci paketine sokmamak için ayrı dosyada.

   UYDURMA YOK — HER CEVABIN KAYNAĞI SATIRININ YANINDA
     · Oran, sınır, kesir, yıl: lib/tools/rates.ts (UAE_CT · UK_CT · KKTC_CT).
     · Kural cümleleri ve SSS cevapları: lib/countryContent.ts'in DOĞRULANMIŞ
       satırları, ruleOf() ya da `faq` dizisinden AYNEN.
     · Satır bulunamazsa (countryContent'te etiket değişirse) soru SSS'ten
       düşüyor, yerine bir şey yazılmıyor — rates.ts · ruleOf ile aynı
       sözleşme: "araç uydurmuyor, susuyor".
   Değişken sayılara Türkçe ek eklenmiyor ("%9'un" gibi): oran değişince ek
   yanlış kalırdı ("%15'un"). Cümleler eki gerektirmeyecek biçimde kuruldu.

   AYNI DİZİ İKİ YERDE: sayfa bu `sss` dizisini hem kabuğa (ekrandaki açılır
   liste) hem kendi FAQPage JSON-LD'sine veriyor. İki okuyucu, tek dizi; soru
   metni iki yerde ayrışamıyor.

   İKİ YERDE BASILMASIN: ilişkili şirket notu ve serbest bölge notu eskiden
   aracın altında paragraf olarak duruyordu; bu turda buraya geçti ve araçtan
   kalktı (KurumlarVergisi.tsx · SUNUM).
   ========================================================================= */

export type KvSayfa = {
  /** <title> — "Dubai Kurumlar Vergisi Hesaplama | Ortac Global" kalıbı */
  title: string;
  description: string;
  /** kırıntı yolunun son halkası */
  crumb: string;
  /** <h1>; `accent` h1'in vurgulanan KUYRUĞU, h1 içinde birebir geçmek zorunda */
  h1: string;
  accent: string;
  /** hero'nun tek cümlesi */
  lead: string;
  sss: SssMadde[];
  sssGiris: string;
};

/* countryContent'ten tek satır: bulunamazsa null (ruleOf sözleşmesi). */
const satir = (country: CountrySlug, label: string) => ruleOf({ repoRow: { country, label } });
/* countryContent'ten tek SSS: soru metniyle, aynen. */
const sssOf = (country: CountrySlug, q: string): SssMadde | null => {
  const f = COUNTRY_CONTENT[country].faq.find((x) => x.q === q);
  return f ? { q: f.q, a: f.a } : null;
};
const dolu = (liste: (SssMadde | null)[]): SssMadde[] =>
  liste.filter((m): m is SssMadde => m !== null);

/* --------------------------------------------------------------- DUBAİ ---
   Kural cümlesi countryContent.dubai.tax · "Kurumlar vergisi" satırı
   ("375.000 AED'ye kadar %0, üzeri %9" + "Vergiye tabi kazanç üzerinden.").
   rates.ts'teki UAE_CT de o satıra bağlı (repoRow), yani ekrandaki hesap ile
   bu cümle aynı vergiyi aynı sayılarla anlatıyor. */
const BAE_KURAL = ruleOf(UAE_CT.upper);
const BAE_FZ = satir("dubai", "Serbest bölge şirketi");
const BAE_BEYAN = satir("dubai", "Kurumlar vergisi beyanı");

const DUBAI: KvSayfa = {
  title: "Dubai Kurumlar Vergisi Hesaplama | Ortac Global",
  /* 155 karakter civarı; sayılar satırın kendisinden. */
  description: `Dubai kurumlar vergisi hesaplayıcı: ${BAE_KURAL?.value ?? ""}. Vergiye tabi kazancınızı yazın; vergi, efektif oran ve vergi sonrası kalan anında çıksın.`,
  crumb: "Araçlar · Kurumlar vergisi · Dubai",
  h1: "Dubai kurumlar vergisi hesaplama.",
  accent: "kurumlar vergisi hesaplama.",
  lead: `Vergiye tabi kazancınızı yazın; eşiğe kadarki kısma ${UAE_CT.lower.label}, ${UAE_CT.threshold.label} eşiğini aşan kısma ${UAE_CT.upper.label} uygulanarak vergi ve efektif oran hesaplanır.`,
  sssGiris: "Cevaplar sitede yayımlanan vergi çerçevesinden. Kişiye özel vergi görüşü değildir.",
  sss: dolu([
    BAE_KURAL && {
      q: "Dubai'de kurumlar vergisi oranı nedir?",
      /* İkinci cümle kuralın aritmetik sonucu, yeni bir iddia değil: oran
         yalnız eşiği aşan kısma uygulanıyorsa efektif oran üst orandan
         küçük kalmak zorunda. */
      a: `${BAE_KURAL.value}. ${BAE_KURAL.note ?? ""} Oran kazancın tamamına değil eşiği aşan kısmına uygulandığı için efektif oran her zaman üst oranın altında kalıyor.`.replace(
        /\s+/g,
        " ",
      ),
    },
    BAE_FZ && {
      q: "Serbest bölge şirketi kurumlar vergisinden muaf mı?",
      /* Son cümle aracın kendi davranışı (KurumlarVergisi.tsx · SERBEST BÖLGE
         MUAFİYETİ HESABA GİRMİYOR). */
      a: `${BAE_FZ.value}. ${BAE_FZ.note ?? ""} Bu yüzden hesaplayıcı muafiyeti varsaymıyor, standart oranla hesaplıyor.`.replace(
        /\s+/g,
        " ",
      ),
    },
    BAE_BEYAN && {
      q: "Dubai'de kurumlar vergisi beyanı ne zaman verilir?",
      a: `${BAE_BEYAN.value}.`,
    },
    sssOf("dubai", "Türkiye'de mukimsem ne olur?"),
  ]),
};

/* ----------------------------------------------------------- İNGİLTERE ---
   Sayılar GOV.UK'nin kendi tablosundan (rates.ts · UK_CT, kaynak adresiyle).
   countryContent.ingiltere.tax'taki "Kâr dilimine göre %19-25" satırı
   SWAP:UK_CT_RATE ile teyitsiz ve sınırları vermiyor; burada KULLANILMIYOR
   (aracın kendisiyle aynı karar, KurumlarVergisi.tsx · IngKural).

   İlişkili şirket cevabı aracın bir tur önce ekrana bastığı notun aynısı;
   kaynağı rates.ts · UK_CT'nin başında (GOV.UK marjinal indirim sayfası:
   "if your company has 3 other associated companies, the limits are divided
   by 4" · HMRC CTM03940: "regardless of where it is tax resident"). */
const { small, main, lower, upper, fraction, year, source } = UK_CT;
const ING_MARJ = formatPercent(main.value + fraction.value, 1);

const INGILTERE: KvSayfa = {
  title: "İngiltere Kurumlar Vergisi Hesaplama | Ortac Global",
  description: `İngiltere kurumlar vergisi hesaplayıcı: ${small.label} küçük kâr oranı, ${main.label} ana oran ve ${lower.label} ile ${upper.label} arasında marjinal indirim. GOV.UK tablosuyla vergi ve efektif oran.`,
  crumb: "Araçlar · Kurumlar vergisi · İngiltere",
  h1: "İngiltere kurumlar vergisi hesaplama.",
  accent: "kurumlar vergisi hesaplama.",
  lead: `Vergiye tabi kârınızı yazın; ${year} oranlarıyla vergi, marjinal indirim ve efektif oran hesaplanır.`,
  sssGiris: `Oranlar GOV.UK'nin "${source.title}" tablosundan. Kişiye özel vergi görüşü değildir.`,
  sss: dolu([
    {
      q: "İngiltere'de kurumlar vergisi oranı nedir?",
      a: `${year} için kâr ${lower.label} ve altındaysa kârın tamamına ${small.label}, ${upper.label} ve üstündeyse tamamına ${main.label} uygulanıyor. İki sınırın arasında kârın tamamına ${main.label} uygulanıp marjinal indirim düşülüyor.`,
    },
    {
      q: "Marjinal indirim nasıl hesaplanıyor?",
      a: `İndirim = ${fraction.label} × (${formatAmount(upper.value)} − kâr). Bu, HMRC'nin şirket vergilendirme el kitabındaki (CTM03925) formülün muaf kâr payı olmayan hâli. İki sınırın arasında eklenen her sterlinin vergisi ${ING_MARJ}.`,
    },
    {
      q: "İlişkili şirketler sınırları değiştirir mi?",
      a: "Evet. Şirketiniz başka bir şirketi kontrol ediyorsa ya da ikisini aynı kişiler kontrol ediyorsa o şirket ilişkili şirket sayılıyor ve iki sınır şirket sayısına bölünüyor; üç ilişkili şirketi olan bir şirkette sınırlar dörde bölünür. HMRC'ye göre ilişkili şirketin İngiltere'de vergi mukimi olması gerekmiyor. Hesaplayıcı sınırları tek şirket için kullanıyor.",
    },
    sssOf("ingiltere", "Vergiyi nerede öderim?"),
  ]),
};

/* ---------------------------------------------------------------- KKTC ---
   Oran yok ve bu sitenin kararı (KKTC_CT.decision = countryContent.kktc.tax
   .note). Sayfa var ve indekslenebilir: "kktc kurumlar vergisi" arayan kişi
   neden rakam vermediğimizi ve sonraki adımı öğreniyor. Arama açısından ZAYIF
   kaldığı biliniyor (sorgunun asıl cevabı olan oran sayfada yok); bu, ana
   oturuma dönen raporda ayrıca yazılı.

   Başlıkta "hesaplama" YOK: sayfa hesap yapmıyor ve başlıkta vaat edip
   sayfada geri almak arama sonucunda yanlış beklenti kurar. */
const KKTC_SATIR = ruleOf(KKTC_CT);
const KKTC_BEYAN = satir("kktc", "Beyan yükümlülüğü");

const KKTC: KvSayfa = {
  title: "KKTC Kurumlar Vergisi | Ortac Global",
  description: `KKTC'de kurumlar vergisi var. ${KKTC_CT.decision}`,
  crumb: "Araçlar · Kurumlar vergisi · KKTC",
  h1: "KKTC kurumlar vergisi.",
  accent: "kurumlar vergisi.",
  lead: "KKTC'de kurumlar vergisi var; oran ve istisnalar faaliyet konusuna göre değiştiği için bu sayfa hesap yapmıyor, nedenini ve sonraki adımı söylüyor.",
  sssGiris: "Cevaplar sitede yayımlanan çerçeveden. Kişiye özel vergi görüşü değildir.",
  sss: dolu([
    KKTC_SATIR && {
      q: "KKTC'de kurumlar vergisi var mı?",
      a: `${KKTC_SATIR.value}. ${KKTC_SATIR.note ?? ""}`.trim(),
    },
    {
      q: "Bu sayfada neden KKTC kurumlar vergisi oranı yok?",
      a: KKTC_CT.decision,
    },
    KKTC_BEYAN && {
      q: "KKTC'de kurumlar vergisi beyanı nasıl?",
      a: `${KKTC_BEYAN.value}.`,
    },
    sssOf("kktc", "Türkiye'den yönetirsem sorun olur mu?"),
  ]),
};

export const KV_SAYFA: Record<CountrySlug, KvSayfa> = {
  dubai: DUBAI,
  ingiltere: INGILTERE,
  kktc: KKTC,
};
