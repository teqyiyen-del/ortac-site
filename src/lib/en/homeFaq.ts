/* kaynak: src/components/home/HomeFaq.tsx · ozet: 53c9f03d */
/* Ana sayfa SSS'nin İngilizcesi (anahtar Türkçe soru / cevap).
   Olgular aynı: Stripe ve PayPal Dubai ve İngiltere şirketiyle çalışıyor, KKTC
   şirketiyle çalışmıyor; KKTC'de kart yerel bankanın sanal POS'uyla. Banka adı
   yok. KKTC ilk geçişte "Northern Cyprus (TRNC)". */
import type { Sozluk } from "@/lib/i18n/cevir";

export const EN_FAQ: Sozluk = {
  "Sık sorulanlar.": "Frequently asked.",
  "sorulanlar.": "asked.",
  "Karar öncesinde en çok sorulan altı başlık.": "The six questions asked most often before deciding.",
  "Sorularınızı sorun": "Ask your questions",

  "Şirket kurarak otomatik vergi avantajı elde eder miyim?": "Do I automatically get a tax advantage by setting up a company?",
  "Hayır. Avantaj gerçek faaliyete, yönetime, mukimliğe, gelir türüne ve ilgili ülke kurallarına bağlıdır. Serbest bölge şirketi olmak tek başına muafiyet vermez; şartların sağlanması ve belgelenmesi gerekir.":
    "No. Any advantage depends on real activity, management, tax residency, the type of income and the rules of the country concerned. Being a free zone company does not grant an exemption on its own; the conditions have to be met and documented.",
  "Uygunluk testi": "Eligibility test",

  "Kuruluştan sonra ne yapmam gerekiyor?": "What do I need to do after formation?",
  "Defter tutma, dönemsel beyanlar, lisans yenilemesi ve varsa AML yükümlülükleri devam eder. Yükümlülükler kuruluşla bitmiyor; ceza riski de kuruluş sonrasında doğuyor.":
    "Bookkeeping, periodic filings, licence renewal and, where applicable, AML obligations continue. Obligations do not end with formation; the risk of penalties also arises afterwards.",
  "Muhasebe ve vergi": "Accounting and tax",

  "Banka hesabı açılacağı garanti mi?": "Is opening a bank account guaranteed?",
  "Hayır, hesabı banka açar ve karar bankanındır. Biz dosyayı bankanın istediği formatta hazırlar, görüşmeleri yürütür ve reddedilirse ikinci kuruma yeniden başvururuz. Bu süreçte kesin süre ya da kesin onay taahhüdü verilemez.":
    "No. The bank opens the account and the decision is the bank's. We prepare the file in the format the bank requires, handle the discussions and, if it is declined, apply again to a second institution. No fixed timeline or guaranteed approval can be promised in this process.",
  "Banka ve ödeme süreci": "Banking and payments process",

  "Stripe ve PayPal her ülkede çalışıyor mu?": "Do Stripe and PayPal work in every country?",
  "Hayır. Dubai ve İngiltere şirketleriyle çalışıyor; KKTC şirketleri Stripe'ın resmî ülke listesinde yer almıyor ve PayPal da desteklemiyor; KKTC'de kart yerel bankanın sanal POS'uyla alınıyor. Stripe ya da PayPal ana kanalınızsa ülke seçimi buradan değişir.":
    "No. They work with Dubai and UK companies. Northern Cyprus (TRNC) companies are not on Stripe's official country list and PayPal does not support them either; in Northern Cyprus, card payments are taken through a local bank's virtual POS. If Stripe or PayPal is your main channel, this is where the choice of country changes.",
  "Ödeme altyapısı matrisi": "Payment infrastructure matrix",

  "Hiç gitmeden şirket kurulur mu?": "Can a company be set up without travelling?",
  "İngiltere'de evet, süreç tamamen uzaktan yürür. Dubai'de tescil uzaktan tamamlanabilir; ancak vize, biyometri ve sağlık kontrolü için fiziken BAE'de bulunmanız gerekir. KKTC'de belge imzası ve banka hesabı için bir kez gelmeniz gerekiyor.":
    "In the UK, yes; the process runs fully remotely. In Dubai, registration can be completed remotely, but you need to be physically in the UAE for the visa, biometrics and medical check. In Northern Cyprus, you need to come once to sign documents and open the bank account.",
  "Dubai süreci": "The Dubai process",

  "Şirket kurmak oturum hakkı veriyor mu?": "Does setting up a company give me residency?",
  "İngiltere'de vermiyor; göçmenlik ayrı bir süreçtir. Dubai'de şirket üzerinden oturum vizesi başvurusu yapılabiliyor. KKTC'de şirket kurmak tek başına oturum vermiyor.":
    "Not in the UK; immigration is a separate process. In Dubai, a residence visa can be applied for through the company. In Northern Cyprus, setting up a company does not grant residency on its own.",
  "Oturum ve vize süreci": "Residency and visa process",
};
