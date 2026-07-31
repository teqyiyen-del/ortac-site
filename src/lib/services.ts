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
  | "uyum";

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
    ingiltere: "Wise · Revolut Business",
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

/* Brief §5 — uyum her ülkede ayrı bir sayfa. goAML BAE'ye özgü bir sistem,
   o yüzden başlık ve kapsam ülkeye göre değişiyor. Fiyat uydurmuyoruz:
   kapsam faaliyet koduna göre değiştiği için teklife bağlı. */
function compliance(c: Country): Service {
  const title: Record<Country, string> = {
    dubai: "Uyum (AML / goAML)",
    ingiltere: "Uyum ve AML",
    kktc: "Uyum ve AML",
  };
  const line: Record<Country, string> = {
    dubai: "goAML kaydı, AML politikası ve dönemsel bildirim yükümlülüklerinin yürütülmesi.",
    ingiltere: "AML politikası, gerçek fayda sahibi kaydı ve beyan takviminin takibi.",
    kktc: "AML politikası, kayıt yükümlülükleri ve dönemsel bildirimlerin takibi.",
  };
  const first: Record<Country, string> = {
    dubai: "goAML kaydı ve yetkili kişi tanımı",
    ingiltere: "Gerçek fayda sahibi (PSC) kaydı",
    kktc: "Yetkili kişi tanımı ve kayıt",
  };
  return {
    slug: "uyum",
    title: title[c],
    line: line[c],
    from: null,
    unit: "teklife bağlı",
    duration: "Sürekli yükümlülük",
    includes: [first[c], "AML politika ve prosedür dosyası", "Dönemsel bildirim takibi", "Yükümlülük takvimi"],
    excludes: ["Hukuki temsil", "Ceza ve idari para cezaları"],
    lines: [
      { label: first[c], amount: null },
      { label: "Politika ve prosedür dosyası", amount: null },
      { label: "Dönemsel bildirim ve takip", note: "faaliyet koduna göre", amount: null },
    ],
  };
}

export function servicesFor(c: Country): Service[] {
  return [formation(c), accounting(c), banking(c), visa(c), compliance(c)].filter(
    Boolean,
  ) as Service[];
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
   Kalan dört hizmetin (muhasebe, banka, uyum, vize) kendi sayfası var. */
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
