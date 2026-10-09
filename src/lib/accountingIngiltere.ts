/* İNGİLTERE · MUHASEBE — /ingiltere/muhasebe · metin (08.10.2026)
   Burak: "sitede eksik olan sayfaları detaylıca araştırıp oluştur, içlerini
   doldur; eksik kalanı Murat abiye soru olarak yaz."

   Gövde KKTC ve Dubai'yle ortak (services/MuhasebeSayfa). İngiltere için
   müşterinin teklif belgesi YOK; o yüzden:
     · ÜCRET BÖLÜMÜ YOK, hiçbir tutar yazılmadı (soruldu).
     · Tarihler, harçlar ve cezalar resmî kaynaktan: docs/ingiltere-mevzuat.md
       (gov.uk, Companies House, HMRC; kontrol 23.09.2026). Aynı rakamlar
       ülke sayfasının takviminde zaten yayında.
     · "Biz yapıyoruz" cümleleri ülke sayfasında yayında olanlar
       (countryContent.ts · ingiltere: kayıtlı adres bizde, yıllık hesap,
       beyanname ve KDV beyanını biz hazırlıyoruz, Sage ve Xero).
   Açık sorular docs/durum.md · 08.10.2026 ve /teyit/sorular. */

import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { MuhasebeVeri } from "@/lib/accountingKktc";

const TAKVIM = COUNTRY_CONTENT.ingiltere.takvim;

export const ACCOUNTING_INGILTERE: MuhasebeVeri = {
  seo: {
    title: "İngiltere'de Muhasebe Hizmeti: Ltd Şirket Hesapları ve Beyan | Ortac Global",
    description:
      "İngiltere Ltd şirketinizin defteri, yıllık hesapları, kurumlar vergisi beyannamesi ve yıllık bildirimi. Companies House ve HMRC takvimi tek ekipte.",
  },

  hero: {
    crumb: "İngiltere · Muhasebe",
    title: "İngiltere muhasebe hizmeti.",
    accent: "muhasebe hizmeti.",
    lead: "Ltd şirketinizin defterini, yıllık hesaplarını ve vergi beyannamesini aynı ekip tutuyor; Companies House ve HMRC tarihlerini biz izliyoruz.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
    rozetler: ["Yıllık hesaplar", "Kurumlar vergisi beyannamesi", "Yıllık bildirim"],
  },

  strengths: {
    id: "arti",
    heading: "Defteri kimin tuttuğu fark ediyor.",
    accent: "fark ediyor.",
    items: [
      { icon: "stamp", title: "1996'dan beri muhasebe", line: "Otuz yıllık muhasebe ve vergi geçmişi." },
      { icon: "users", title: "Kuruluş sonrası aynı ekip", line: "Şirketi kuran ekip defteri de tutuyor." },
      { icon: "building", title: "Londra'da kendi ofisimiz", line: "Kayıtlı adres ve resmî posta bizde." },
      { icon: "folder", title: "Sage ve Xero", line: "İngiltere'nin yaygın programlarıyla çalışıyoruz." },
    ],
  },

  scope: {
    id: "kapsam",
    heading: "Ne yapıyoruz, ne yapmıyoruz.",
    accent: "ne yapmıyoruz.",
    excludesLead: "",
    youTitle: "Sizden gelen",
    feeLabel: "Bilmeniz gereken",
    kalemler: [
      {
        id: "altyapi",
        kisa: "Başlangıç",
        baslik: "Vergi kaydı ve düzenin kurulması",
        ozet: "Vergi numarası, kurumlar vergisi kaydı ve belge akışı.",
        detay:
          "Şirketin vergi numarası (UTR) HMRC'den postayla Londra adresimize geliyor. Kurumlar vergisi kaydı, faaliyete başladıktan sonra üç ay içinde yapılıyor. Hangi belgenin bize nasıl ulaşacağını baştan belirliyoruz.",
        cipler: [
          { icon: "bank", label: "Banka hareketleri" },
          { icon: "receipt", label: "Satış ve alış faturaları" },
          { icon: "files", label: "Sözleşmeler" },
        ],
        sinir: [],
      },
      {
        id: "takip",
        kisa: "Defter",
        baslik: "Gelir, gider ve banka kaydı",
        ozet: "Faturalar ve banka hareketleri düzenli olarak deftere işleniyor.",
        detay:
          "Kayıtlar Sage ya da Xero üzerinde tutuluyor. Yıl içinde düzenli tutulan defter, yıl sonu hesaplarının ve beyannamenin dayanağı.",
        cipler: [],
        sinir: [],
      },
      {
        id: "beyan",
        kisa: "KDV",
        baslik: "KDV kaydı ve beyanı",
        ozet: "Yıllık ciro £90.000'i aşarsa kayıt zorunlu; altında isteğe bağlı.",
        detay:
          "Eşiği aşan şirket KDV'ye kaydoluyor ve dönem dönem beyan veriyor. Müşteri profiliniz gerektiriyorsa eşiğin altında gönüllü kayıt da mümkün; hangisinin size uyduğunu birlikte değerlendiriyoruz.",
        cipler: [],
        sinir: [{ t: "Mal taşıyorsanız", l: "Büyük Britanya ile mal alıp satan şirketin ayrıca EORI numarası alması gerekiyor; başvuru hizmetimizin dışında." }],
      },
      {
        id: "yilsonu",
        kisa: "Yıllık Hesaplar",
        baslik: "Yıllık hesaplar ve vergi beyannamesi",
        ozet: "Hesaplar Companies House'a, beyanname (CT600) HMRC'ye veriliyor.",
        detay:
          "Yıllık hesaplar mali yıl sonundan itibaren dokuz ay içinde Companies House'a veriliyor; ilk hesapların süresi kuruluştan itibaren 21 ay. Kurumlar vergisi beyannamesi dönem sonundan itibaren 12 ay içinde, vergi ise dokuz ay bir gün içinde ödeniyor.",
        cipler: [],
        sinir: [{ t: "Kişiye özel vergi görüşü", l: "Türkiye'deki beyanınız sizin yükümlülüğünüz; durumunuzu görüşmede konuşuyoruz." }],
      },
      {
        id: "pasif",
        kisa: "Yıllık Bildirim",
        baslik: "Yıllık bildirim ve sicil",
        ozet: "Şirket bilgileri her yıl Companies House'a teyit ediliyor.",
        detay:
          "Direktör, ortak ve adres bilgileri yılda bir kez Companies House'a teyit ediliyor; harcı £50. Yıl içindeki değişiklikleri de sicile biz bildiriyoruz.",
        cipler: [],
        sinir: [{ t: "Maaş ödeyecekseniz", l: "Direktör olarak kendinize maaş ödeyecekseniz bordro (PAYE) kaydı ayrıca gerekiyor." }],
      },
    ],
  },

  takvim: {
    ...TAKVIM!,
    title: "Hangi dosya ne zaman veriliyor.",
    accent: "ne zaman veriliyor.",
    lead: "İngiltere'de takvim sıkı, cezalar otomatik. Dört tarihi de biz izliyoruz.",
  },

  gains: {
    id: "fayda",
    heading: "Düzenli muhasebenin karşılığı.",
    accent: "karşılığı.",
    items: [
      { icon: "calendar", title: "Otomatik ceza almıyorsunuz", line: "Geç verilen hesap ve beyannamede ceza kendiliğinden işliyor." },
      { icon: "bank", title: "Banka ve Stripe sorduğunda hazır", line: "Hesap ve tahsilat kanalları şirket belgelerini istiyor." },
      { icon: "chart", title: "Kâr payının dayanağı belli", line: "Türkiye'deki beyanınız şirketin hesaplarına dayanıyor." },
      { icon: "files", title: "Sicil temiz kalıyor", line: "Kayıtlar kamuya açık; geciken dosya herkese görünüyor." },
    ],
  },

  faq: {
    id: "sss",
    heading: "Sık sorulanlar.",
    accent: "sorulanlar.",
    items: [
      { q: "Şirket hiç gelir elde etmediyse yine de bir şey vermem gerekir mi?", a: "Evet. Yıllık bildirim ve yıllık hesaplar faaliyet olmasa da Companies House'a veriliyor. Vergi tarafında ne gerektiği şirketin HMRC'deki durumuna bağlı; birlikte değerlendiriyoruz." },
      { q: "Yıllık hesaplar ne zaman veriliyor?", a: "Mali yıl sonundan itibaren dokuz ay içinde. Yeni kurulan şirketin ilk hesapları için süre kuruluştan itibaren 21 ay." },
      { q: "Geç kalırsam ne olur?", a: "Ceza otomatik. Hesaplarda gecikmeye göre £150 ile £1.500 arası, iki yıl üst üste gecikmede iki katı. Beyannamede bir gün gecikme £200, üç ayı geçerse £200 daha." },
      { q: "KDV kaydı yaptırmalı mıyım?", a: "Yıllık ciro £90.000'i aşarsa zorunlu; altında isteğe bağlı. Müşteri profiliniz gerektiriyorsa gönüllü kayıt öneriyoruz." },
      { q: "Kurumlar vergisi oranı ne?", a: "Kâr £50.000'e kadar %19, £250.000'in üstünde %25; arada oran kademeli yükseliyor." },
      { q: "Hangi programı kullanıyorsunuz?", a: "Sage ve Xero ile çalışıyoruz. Hangisinin kullanılacağını şirketin işlem yapısına göre belirliyoruz." },
      { q: "Kendime maaş ödeyebilir miyim?", a: "Evet, ama bordro (PAYE) kaydı gerekiyor; şirketin tek çalışanı siz olsanız bile. Maaş mı kâr payı mı sorusunu vergi tarafıyla birlikte konuşuyoruz." },
      { q: "Ücreti ne kadar?", a: "Kapsam işlem hacmine ve KDV kaydına göre değişiyor; görüşmeden sonra yazılı olarak bildiriyoruz." },
    ],
  },

  closing: {
    title: "İngiltere şirketinizin muhasebesini birlikte yönetelim.",
    accent: "birlikte yönetelim.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
  },
};
