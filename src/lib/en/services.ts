/* kaynak: src/lib/services.ts · ozet: e60ed797 */
/* services.ts'ten gelen ve MENÜDE basılan yazıların İngilizcesi: hizmet adı
   ve kartın altındaki tek satır (NavIstemci · hintOf, kapsamın ilk bir ya da
   iki maddesi). Anahtar Türkçe yazı. Hizmet sayfalarının gövdesi (kapsam
   listeleri, fiyat satırları) burada DEĞİL; o sayfalar İngilizceye geçerken.
   KKTC için banka adı yok ("Local bank"). */
import type { Sozluk } from "@/lib/i18n/cevir";

export const EN_SERVICES: Sozluk = {
  "Şirket kuruluşu": "Company formation",
  "Muhasebe ve vergi": "Accounting and tax",
  "Banka ve ödeme": "Banking and payments",
  "Vize ve oturum": "Visa and residency",
  "Vergi danışmanlığı": "Tax advisory",
  "Kurumsal danışmanlık": "Corporate advisory",
  "AML ve mevzuat uyumu": "AML and regulatory compliance",
  /* kart altı satırları */
  "Serbest bölge ticaret lisansı": "Free zone trade licence",
  "Companies House tescili": "Companies House registration",
  "Yerel ticaret tescili": "Local trade registration",
  "Defter tutma · KDV beyanı": "Bookkeeping · VAT returns",
  "Hesap başvurusu (Wio · Mashreq NeoBiz)": "Account application (Wio · Mashreq NeoBiz)",
  "Hesap başvurusu (Revolut Business)": "Account application (Revolut Business)",
  "Hesap başvurusu (Yerel banka)": "Account application (local bank)",
  "Vize kotası başvurusu": "Visa quota application",
  "Kurumlar vergisi kaydı ve beyanı": "Corporate tax registration and returns",
  "Corporation Tax beyanı": "Corporation Tax return",
  "Vergi beyannameleri": "Tax returns",
  "Şirket yapılandırması": "Company structuring",
  "İngiltere pazarına giriş": "UK market entry",
  "Vergi ve şirket yapılandırması": "Tax and company structuring",
  "AML uyumu · Gerçek faydalanıcı (UBO) bildirimi": "AML compliance · UBO filing",
  "Gerçek faydalanıcı (PSC) kaydı": "PSC (beneficial owner) register",
  "Kurumsal uyum · Gerçek faydalanıcı (UBO) bildirimi": "Corporate compliance · UBO filing",
};
