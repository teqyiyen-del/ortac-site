import { PRICING } from "@/lib/pricing";
import type { Country } from "@/lib/store";

/* SWAP:SERVICE_PRICES — a service only exists here if we actually run it in
   that country, and every line is priced from the country's own numbers in
   pricing.ts rather than a single global list. */
/* URL mimarisi SABİT (brief §5): slug'lar adres olduğu için brief'teki
   yazımları birebir taşıyor. Değiştirmek URL'i değiştirmek demek. */
export type ServiceSlug =
  | "sirket-kurulusu"
  | "muhasebe"
  | "banka-hesabi"
  | "oturum-vize"
  | "vergi"
  | "kurumsal-danismanlik"
  | "aml-uyum";

export type Service = {
  slug: ServiceSlug;
  title: string;
  line: string;
  /** headline price in USD; null when it is quoted per case */
  from: number | null;
  unit: string;
  duration: string;
  includes: string[];
  excludes: string[];
  /** the itemised quote shown on the service page */
  lines: { label: string; note?: string; amount: number | null }[];
};

const money = (n: number) => Math.round(n / 50) * 50;

function formation(c: Country): Service {
  const p = PRICING[c];
  const label: Record<Country, string> = {
    dubai: "Serbest bölge ticaret lisansı",
    ingiltere: "Companies House tescili",
    kktc: "Yerel ticaret tescili",
  };
  const second: Record<Country, string> = {
    dubai: "Şirket tescili ve kuruluş sözleşmesi",
    ingiltere: "Kayıtlı adres (1 yıl)",
    kktc: "Şirket tescili ve ana sözleşme",
  };
  return {
    slug: "sirket-kurulusu",
    title: "Şirket kuruluşu",
    line: "Lisans sınıfının seçilmesi, isim onayı, tescil ve kuruluş evrakının teslimi.",
    from: money(p.base),
    unit: "tek seferlik",
    duration: p.duration,
    includes: [label[c], second[c], "İsim onayı ve ön başvuru", "Evrak takibi ve panel erişimi"],
    excludes: ["Banka hesabı başvurusu", "Muhasebe ve beyan"],
    lines: [
      { label: label[c], amount: money(p.base * 0.72) },
      { label: second[c], amount: money(p.base * 0.18) },
      { label: "Kuruluş hizmet bedeli", amount: money(p.base * 0.1) },
    ],
  };
}

function accounting(c: Country): Service {
  const p = PRICING[c];
  return {
    slug: "muhasebe",
    title: "Muhasebe ve vergi",
    line: "Aylık kayıt, dönemsel raporlama ve beyanların süresinde verilmesi.",
    from: money(p.annual / 12),
    unit: "aylık",
    duration: "Aylık döngü",
    includes: ["Defter tutma", "KDV beyanı", "Kurumlar vergisi beyanı", "Yıllık mali tablolar"],
    excludes: ["Bağımsız denetim", "Bordro (ayrı fiyatlanır)"],
    lines: [
      { label: "Aylık defter ve kayıt", note: "12 ay", amount: money(p.annual * 0.55) },
      { label: "Dönemsel beyanlar", amount: money(p.annual * 0.3) },
      { label: "Yıllık mali tablolar", amount: money(p.annual * 0.15) },
    ],
  };
}

function banking(c: Country): Service {
  const p = PRICING[c];
  const banks: Record<Country, string> = {
    dubai: "Wio · Mashreq NeoBiz",
    ingiltere: "Revolut Business",
    kktc: "Yerel banka",
  };
  const hard: Record<Country, string> = {
    dubai: "Başvuru 5-10 iş günü",
    ingiltere: "Onay oranı düşük, süre değişken",
    kktc: "Yerinde imza gerekir",
  };
  return {
    slug: "banka-hesabi",
    title: "Banka ve ödeme",
    line: "Kurumsal hesap başvurusu, dosya hazırlığı ve banka yazışmasının yürütülmesi.",
    from: money(p.bank),
    unit: "tek seferlik",
    duration: hard[c],
    includes: [`Hesap başvurusu (${banks[c]})`, "Başvuru dosyasının hazırlanması", "Banka görüşmeleri"],
    excludes: ["Bankanın açılışı garanti etmesi", "Minimum bakiye yükümlülüğü"],
    lines: [
      { label: "Dosya hazırlığı", amount: money(p.bank * 0.6) },
      { label: "Başvuru ve takip", amount: money(p.bank * 0.4) },
      { label: "Ödeme altyapısı bağlantısı", note: "Stripe · PayPal", amount: null },
    ],
  };
}

function visa(c: Country): Service | null {
  const p = PRICING[c];
  /* 27.09.2026 · KKTC'de vize/oturum hizmeti YOK. Teyit (KKTC 48):
     "kaldıralım, o sıkıntı; KKTC'de sadece KKTC'de yaşayan yasal izin
     alabiliyor o işleme." Fiyat dosyasındaki perVisa'ya dokunulmadı
     (pricing.ts kuralı), hizmet burada kapanıyor; ana sayfadaki "Yalnızca
     Dubai ve KKTC" satırı kendiliğinden "Yalnızca Dubai" oluyor. */
  if (c === "kktc") return null;
  if (p.perVisa <= 0) return null;
  return {
    slug: "oturum-vize",
    title: "Vize ve oturum",
    line: "Ortak ve çalışan vizesi, sağlık kontrolü ve kimlik kartı adımları.",
    from: money(p.perVisa),
    unit: "kişi başı",
    duration: c === "dubai" ? "10-20 iş günü" : "15-25 iş günü",
    includes: ["Vize kotası başvurusu", "Sağlık kontrolü randevusu", "Kimlik kartı işlemleri"],
    excludes: ["Uçuş ve konaklama", "Aile vizesi (ayrı fiyatlanır)"],
    lines: [
      { label: "Vize kotası ve giriş izni", amount: money(p.perVisa * 0.5) },
      { label: "Sağlık kontrolü ve kimlik", amount: money(p.perVisa * 0.3) },
      { label: "İşlem takibi", amount: money(p.perVisa * 0.2) },
    ],
  };
}

/* UYUM (AML / goAML) HİZMETİ KALDIRILDI · 23.09.2026. Burak: "uyumu ordan
   komple kaldır." Bir gün önce yalnız Dubai'den çıkmıştı ("uyum diye bir
   hizmet dubaide yok"); İngiltere ve KKTC'de de teyitsizdi (teyit listesi).
   Slug, sayfa şablonu, menü hücresi, ana sayfa kartı ve zincir halkası
   birlikte gitti (brand.ts · CHAIN). */

/* 07.10.2026 · ALTI ANA BAŞLIK. Murat Bey'in hizmet tablosu (Burak iletti):
   üç ülkede de aynı altı uzmanlık var; Dubai'de ek olarak vize.
     Muhasebe ve finansal raporlama        → muhasebe (vardı)
     Vergi danışmanlığı ve uyum            → vergi (YENİ)
     Kurumsal danışmanlık                  → kurumsal-danismanlik (YENİ)
     Şirket kuruluşu ve kurumsal hizmetler → sirket-kurulusu (vardı)
     Banka ve iş desteği                   → banka-hesabi (vardı)
     AML ve mevzuat uyumu                  → aml-uyum (YENİ)
   "Hukuki danışmanlık" ve "Pazar araştırması" aynı gün iptal edildi
   (22.09'da yalnız adlarıyla, sönük düğme olarak eklenmişlerdi).

   ÜÇ YENİ HİZMETİN İÇERİĞİ. Kapsam maddeleri Murat Bey'in aynı sohbetteki
   ülke ülke alt hizmet listesinden; fiyat, süre ve hariç kalem YAZILMADI
   (bilinmiyor, uydurulmuyor): `from: null`, kalem listesi boş, sayfa
   "teklife bağlı" diyor. Sohbetin 23 satırlık uzun tablosu hatalı çıktığı
   için (KKTC'de vize, Dubai'de bordro) oradan bir şey alınmadı.
   SWAP:ALTI_HIZMET_KAPSAM · Murat Bey doğrulayacak. */
type Yeni = { slug: ServiceSlug; title: string; line: string; kapsam: Record<Country, string[]> };
const YENI: Yeni[] = [
  {
    slug: "vergi",
    title: "Vergi danışmanlığı",
    line: "Vergi kaydı, beyan ve planlama; mevzuata uygun, tek ekipten.",
    kapsam: {
      dubai: ["Kurumlar vergisi kaydı ve beyanı", "KDV kaydı ve beyanı", "Vergi planlaması ve danışmanlık"],
      ingiltere: ["Corporation Tax beyanı", "VAT kaydı ve beyanı", "Vergi planlaması ve danışmanlık"],
      kktc: ["Vergi beyannameleri", "KDV", "Vergi yapılandırması"],
    },
  },
  {
    slug: "kurumsal-danismanlik",
    title: "Kurumsal danışmanlık",
    line: "Şirket yapılandırması, pazara giriş ve iş danışmanlığı.",
    kapsam: {
      dubai: ["Şirket yapılandırması", "Pazara giriş", "İş danışmanlığı"],
      ingiltere: ["İngiltere pazarına giriş", "Şirket yapılandırması", "Uluslararası iş danışmanlığı"],
      kktc: ["Vergi ve şirket yapılandırması", "Uluslararası iş yapılandırması", "Yatırım ve iş danışmanlığı"],
    },
  },
  {
    slug: "aml-uyum",
    title: "AML ve mevzuat uyumu",
    line: "Kara para önleme, gerçek faydalanıcı bildirimi ve mevzuat uyumu.",
    kapsam: {
      dubai: ["AML uyumu", "Gerçek faydalanıcı (UBO) bildirimi", "goAML kaydı ve desteği"],
      ingiltere: ["Gerçek faydalanıcı (PSC) kaydı", "Companies House uyumu", "Mevzuat desteği"],
      kktc: ["Kurumsal uyum", "Gerçek faydalanıcı (UBO) bildirimi", "Mevzuat gereklilikleri"],
    },
  },
];
const yeni = (c: Country): Service[] =>
  YENI.map((y) => ({
    slug: y.slug,
    title: y.title,
    line: y.line,
    from: null,
    unit: "teklife bağlı",
    duration: "kapsama göre",
    includes: y.kapsam[c],
    excludes: [],
    lines: [],
  }));

export function servicesFor(c: Country): Service[] {
  return [
    formation(c),
    accounting(c),
    banking(c),
    visa(c),
    ...yeni(c),
  ].filter(Boolean) as Service[];
}

export function serviceFor(c: Country, slug: string): Service | undefined {
  return servicesFor(c).find((s) => s.slug === slug);
}

/* Şirket kuruluşunun AYRI BİR SAYFASI YOK ve olmayacak.
   Ülke sayfasının kendisi zaten o hizmetin sayfası: /dubai baştan sona
   Dubai'de şirket kurmayı anlatıyor — yapı seçimi, avantajlar, vergi
   çerçevesi, fiyat, süreç, evraklar, kuruluş sonrası. Aynı içeriği bir de
   /dubai/sirket-kurulusu altında tutmak iki adresin aynı şeyi anlatması,
   yani kendi kendimizle SEO yarışına girmemiz demek.
   Kalan hizmetlerin (muhasebe, banka, vize) kendi sayfası var. */
export const FORMATION_SLUG: ServiceSlug = "sirket-kurulusu";

/** Bir hizmetin gerçek adresi. Kuruluş → ülke sayfası, ötekiler → alt sayfa. */
export function serviceHref(c: Country, slug: ServiceSlug): string {
  return slug === FORMATION_SLUG ? `/${c}` : `/${c}/${slug}`;
}

/** Kendi sayfası olan hizmetler — kuruluş hariç. Rota üretimi bunu kullanıyor. */
export function pagedServicesFor(c: Country): Service[] {
  return servicesFor(c).filter((s) => s.slug !== FORMATION_SLUG);
}

export const COUNTRY_SLUGS: Country[] = ["dubai", "ingiltere", "kktc"];
