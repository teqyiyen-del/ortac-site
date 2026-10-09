/* kaynak: src/lib/brand.ts · ozet: 53a0ae9d */
/* brand.ts'ten gelen ve ana sayfa, menü, alt bilgide basılan kısa yazıların
   İngilizcesi (anahtar Türkçe yazı): ülke adları, ülke alt satırı, kuruluş
   yapısı, dizindeki hizmet adları, zincir (CHAIN) satırları.
   Dosyanın TAMAMI çevrilmedi: fiyat etiketleri, kime uygun, sınır cümleleri,
   ortak rolleri ülke sayfaları İngilizceye geçerken.
   FARKLAR
     · "KKTC" dar yerlerde "Northern Cyprus", tam adıyla geçtiği yerde
       "Northern Cyprus (TRNC)". "İngiltere" dar yerlerde "UK".
     · "Kuzey Kıbrıs · Türkiye'ye en yakın" küresel okura bir şey söylemiyor;
       İngilizcesi ülkenin yapısını söylüyor ("Free Port and Zone"). */
import type { Sozluk } from "@/lib/i18n/cevir";

export const EN_BRAND: Sozluk = {
  /* ülke adları (COUNTRY_NAME · store.ts COUNTRY_LABELS) */
  İngiltere: "UK",
  KKTC: "Northern Cyprus",
  /* COUNTRY_LINE */
  "Birleşik Arap Emirlikleri": "United Arab Emirates",
  "Birleşik Krallık · Companies House": "United Kingdom · Companies House",
  /* menüdeki ülke kartında tek satır: ülke adı kartın başlığında zaten yazıyor */
  "Kuzey Kıbrıs · Türkiye'ye en yakın": "TRNC · Free Port and Zone",
  /* FACTS.structure */
  "Serbest bölge veya mainland": "Free zone or mainland",
  "Serbest Liman · limited": "Free Port and Zone · limited",
  /* COUNTRY_SERVICES (alt bilgi dizini) */
  "Şirket Kuruluşu": "Company Formation",
  "Muhasebe & Vergi": "Accounting & Tax",
  "Banka & Ödeme": "Banking & Payments",
  "Oturum & Vize": "Residency & Visa",
  "AML & Uyum": "AML & Compliance",
  "Şirket Adresi": "Company Address",
  "Serbest Bölge": "Free Zone",
  /* CHAIN */
  Kuruluş: "Formation",
  "Lisans, tescil ve kuruluş evrakı": "Licence, registration and formation documents",
  "Hesap başvurusu ve tahsilat kanalları": "Account applications and payment channels",
  "Defter, beyan ve raporlama": "Bookkeeping, filings and reporting",
  Uyum: "Compliance",
  "AML / goAML yükümlülükleri": "AML / goAML obligations",
  "Vize, biyometri ve kimlik": "Visa, biometrics and ID",
};
