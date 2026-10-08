/* ============================================================================
   KKTC · MUHASEBE — /kktc/muhasebe · metin (07.10.2026)
   Burak: "Kıbrıs'ın muhasebe sayfası biraz kısa … Dubai'deki section'ları
   bir bak, aynıları Kıbrıs'ta da olabiliyorsa olsun. Eksik bilgileri kendin
   araştır, Murat abiye soracağımız bir şey olursa onu da yaz."

   DUBAİ'YLE PARALEL BÖLÜMLER (app/dubai/muhasebe): giriş · artılarımız
   (dört karo) · kapsam (beş aşama, açılır) · takvim · karşılık (defter
   sahnesi + dört satır) · ücret · SSS. Bölümler Dubai'nin bileşenleri
   (services/AccountingSections), veri buradan.

   DUBAİ'DE OLUP BURADA OLMAYANLAR, bilerek:
     · alıntı ve imza kutusu: KKTC için Murat Bey'in bir cümlesi yok, Dubai
       cümlesi buraya taşınmaz; defteri kimin imzaladığı da soruldu.
     · muhasebeci değiştirenler: KKTC'de adres ve temsilci muhasebe ofisine
       bağlı, devrin nasıl yürüdüğünü bilmiyoruz.
     · ihtiyaç bulucu: Dubai'de altı kalem var, burada iki hâl (aktif,
       pasif); ücret bölümü zaten o ikisi.
   Üçü de docs/durum.md · 07.10.2026 (17)'de Murat Bey'e soru.

   KAYNAKLAR
     [BELGE]  KKTC teklif belgesi (Ortac International Accounting,
              06.10.2026) madde 6: aktif 270 € / ay, pasif 900 € / yıl;
              kapsam, pasif tanımı, aktife geçiş, ek ücret hâlleri.
     [TEYİT]  docs/teyit-cevaplar-1.md · KKTC 19 (yıllık bildirim "kesinlikle
              zorunlu"); adres ve temsilci (ülke sayfasında yayında).
     [RESMÎ]  docs/kktc-mevzuat.md: tasfiye için bilanço ve raporların
              verilmiş olması (Fasıl 113), Türkiye tarafı beyan (GVK).
   Belgede ve teyitte OLMAYAN tarih, süre ya da tutar yazılmadı: yıllık
   hesabın hangi ayda verildiği, denetçi raporunun ücrete dahil olup
   olmadığı soruldu, sayfada geçmiyor. */

import type { Takvim, Faq } from "@/lib/countryContent";
import type { AccChip, AccGain, AccStrength } from "@/lib/accountingDubai";

export type KktcKapsam = {
  id: string;
  kisa: string;
  baslik: string;
  ozet: string;
  detay: string;
  cipler: AccChip[];
  sinir: { t: string; l: string }[];
};

/* Ortak gövdenin (services/MuhasebeSayfa) beklediği biçim; İngiltere'nin
   verisi de bu biçimde (lib/accountingIngiltere.ts). */
export type MuhasebeVeri = {
  seo: { title: string; description: string };
  hero: { crumb: string; title: string; accent: string; lead: string; cta: { label: string; href: string }; price?: { amount: string; label: string; href: string }; rozetler: string[] };
  strengths: { id: string; heading: string; accent: string; items: AccStrength[] };
  scope: { id: string; heading: string; accent: string; excludesLead: string; youTitle: string; feeLabel: string; kalemler: KktcKapsam[] };
  takvim: Takvim;
  gains: { id: string; heading: string; accent: string; items: AccGain[] };
  fiyat?: { id: string; heading: string; accent: string; lead: string; items: { ad: string; tutar: string; line: string }[] };
  faq: { id: string; heading: string; accent: string; items: Faq[] };
  closing: { title: string; accent: string; cta: { label: string; href: string } };
};

export const ACCOUNTING_KKTC: MuhasebeVeri = {
  seo: {
    title: "KKTC'de Muhasebe Hizmeti: Serbest Bölge Şirketi | Ortac Global",
    description:
      "KKTC Serbest Bölge şirketinizin aylık kaydı, yıllık hesabı ve beyanları. Aktif şirket 270 € / ay, pasif şirket 900 € / yıl.",
  },

  hero: {
    crumb: "KKTC · Muhasebe",
    title: "KKTC muhasebe hizmeti.",
    accent: "muhasebe hizmeti.",
    lead: "Serbest Bölge şirketinizin aylık kaydını, yıllık hesabını ve beyanlarını aynı ekip tutuyor.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
    price: { amount: "€270", label: "/ay · aktif şirket", href: "#fiyat" },
    rozetler: ["Aylık kayıt", "Beyan ve uyum takibi", "Yıllık hesaplar"],
  },

  /* 1996: doğrulanmış (ORTAC). Aynı ekip ve adres: [BELGE] kuruluş, adres
     ve muhasebe aynı tekliften; [TEYİT] adres muhasebe ofisiyle sözleşme. */
  strengths: {
    id: "arti",
    heading: "Defteri kimin tuttuğu fark ediyor.",
    accent: "fark ediyor.",
    items: [
      { icon: "stamp", title: "1996'dan beri muhasebe", line: "Otuz yıllık muhasebe ve vergi geçmişi." },
      { icon: "users", title: "Kuruluş sonrası aynı ekip", line: "Şirketi kuran ekip defteri de tutuyor." },
      { icon: "building", title: "Adres de bizde", line: "Kayıtlı adres ofisimiz; ayrı ofis gerekmiyor." },
      { icon: "folder", title: "Türkçe, tek muhatap", line: "Kuruluş, adres ve muhasebe tek ekipte." },
    ] as AccStrength[],
  },

  /* [BELGE] madde 6. id'ler Dubai'ninkilerle aynı (ikon tonu id'den:
     "takip" yeşil, "beyan" amber · AccountingSections · KAPSAM_TON). */
  scope: {
    id: "kapsam",
    heading: "Ne yapıyoruz, ne yapmıyoruz.",
    accent: "ne yapmıyoruz.",
    excludesLead: "",
    youTitle: "Sizden gelen",
    feeLabel: "Aylık ücrete dahil değil",
    kalemler: [
      {
        id: "altyapi",
        kisa: "Başlangıç",
        baslik: "Hesap açılınca düzen kuruluyor",
        ozet: "Banka hesabının açıldığı ay, aylık hizmetin ilk ayı.",
        detay:
          "Şirket tescil olup banka hesabı açıldığında aylık düzene geçiyoruz. Hangi belgenin bize nasıl ulaşacağını baştan belirliyoruz; o aydan itibaren kayıtlar düzenli tutuluyor.",
        cipler: [
          { icon: "bank", label: "Banka hareketleri" },
          { icon: "receipt", label: "Faturalar" },
          { icon: "files", label: "Sözleşmeler" },
        ],
        sinir: [{ t: "Geçmiş dönem kayıtları", l: "Önceki dönemlerin kaydı gerekiyorsa ayrıca ücretlendiriliyor." }],
      },
      {
        id: "takip",
        kisa: "Aylık Kayıt",
        baslik: "Gelir, gider ve banka kaydı",
        ozet: "Banka hareketleri, gelir ve gider işlemleri her ay kaydediliyor.",
        detay:
          "Gönderdiğiniz belgeler ve banka hareketleri her ay deftere işleniyor. Kayıt düzenli tutulduğu için yıl sonunda geriye dönük toparlama gerekmiyor.",
        cipler: [],
        sinir: [{ t: "Yüksek işlem hacmi", l: "Standart kapsamı önemli ölçüde aşan hacimde önceden bilgi veriyor, ayrıca ücretlendiriyoruz." }],
      },
      {
        id: "beyan",
        kisa: "Beyan ve Uyum",
        baslik: "Beyan ve uyum takibi",
        ozet: "Muhasebe, beyan ve uyum yükümlülüklerini biz takip ediyoruz.",
        detay:
          "Serbest Bölge şirketi vergi muafiyetinden yararlansa da beyan ve uyum yükümlülükleri sürüyor. Neyin ne zaman verileceğini biz izliyor, zamanı gelince hazırlıyoruz.",
        cipler: [],
        sinir: [
          { t: "Özel raporlama", l: "Standart kapsamın dışındaki rapor talepleri ayrıca ücretlendiriliyor." },
          { t: "Türkiye'deki beyanınız", l: "Kâr payının Türkiye'de beyanı sizin yükümlülüğünüz; durumunuzu görüşmede konuşuyoruz." },
        ],
      },
      {
        id: "yilsonu",
        kisa: "Yıllık Hesaplar",
        baslik: "Yıllık hesaplar ve beyanlar",
        ozet: "Yıl sonunda hesaplar hazırlanıyor, beyanlar ilgili mercilere sunuluyor.",
        detay:
          "Vergi çıkmasa da şirket her yıl bilançosunu ve yıllık raporlarını veriyor. Yıllık hesapları hazırlıyor, beyanları ilgili mercilere sunuyoruz.",
        cipler: [],
        sinir: [],
      },
      {
        id: "pasif",
        kisa: "Pasif Şirket",
        baslik: "Faaliyeti olmayan şirket",
        ozet: "Banka hesabı ve işlemi olmayan şirketin de yıllık hesabı veriliyor.",
        detay:
          "Banka hesabı bulunmayan ve dönem boyunca ticari faaliyeti ya da finansal işlemi olmayan şirket pasif sayılıyor. Aylık kayıt yok; yalnız yıllık hesaplar hazırlanıyor ve beyanlar veriliyor. Yıl içinde hesap açılır ya da faaliyet başlarsa o aydan itibaren aylık hizmete geçiliyor.",
        cipler: [],
        sinir: [],
      },
    ] as KktcKapsam[],
  },

  /* Tarih YOK (soruldu). Yıllık bildirim [TEYİT] KKTC 19; faaliyet harcı
     ülke sayfasının SSS'inde yayında ("vergi değil, sabit bir bedel"). */
  takvim: {
    title: "Yıl içinde ne zaman ne çıkıyor.",
    accent: "ne çıkıyor.",
    lead: "Kayıt her ay, hesap kapanışı yılda bir.",
    kalemler: [
      { sure: "Her ay", ne: "Kayıt", kural: "Aktif şirkette banka hareketleri, gelir ve giderler kaydediliyor.", ceza: "" },
      { sure: "Yıl sonu", ne: "Yıllık hesaplar", kural: "Dönem kapanıyor, bilanço hazırlanıyor.", ceza: "" },
      { sure: "Her yıl", ne: "Beyan ve yıllık raporlar", kural: "Vergi çıkmasa da ilgili mercilere veriliyor; zorunlu.", ceza: "" },
      { sure: "Her yıl", ne: "Yıllık faaliyet harcı", kural: "Vergi değil, sabit bir bedel; muhasebe ücretinden ayrı.", ceza: "" },
    ],
    kaynak: { label: "", href: "" },
  } as Takvim,

  /* banka: [BELGE] hususlar · kâr payı: [RESMÎ] GVK · tasfiye: [RESMÎ]
     Fasıl 113 md. 203, 261-263 */
  gains: {
    id: "fayda",
    heading: "Düzenli muhasebenin karşılığı.",
    accent: "karşılığı.",
    items: [
      { icon: "calendar", title: "Yıllık yükümlülük aksamıyor", line: "Bilanço ve yıllık raporlar her yıl zamanında veriliyor." },
      { icon: "bank", title: "Banka sorduğunda dosya hazır", line: "Sözleşme, fatura ve paranın kaynağı kayıtlardan çıkıyor." },
      { icon: "chart", title: "Kâr payının dayanağı belli", line: "Türkiye'deki beyanınız şirketin kayıtlarına dayanıyor." },
      { icon: "files", title: "Kapatırken engel çıkmıyor", line: "Tasfiye için bütün bilanço ve raporların verilmiş olması gerekiyor." },
    ] as AccGain[],
  },

  /* [BELGE] madde 6 */
  fiyat: {
    id: "fiyat",
    heading: "Ücret, şirketin durumuna göre.",
    accent: "şirketin durumuna göre.",
    lead: "İki hâl var; hangisinde olduğunuzu banka hesabı ve faaliyet belirliyor.",
    items: [
      { ad: "Aktif şirket", tutar: "€270 / ay", line: "Banka hesabının açıldığı aydan itibaren, şirket aktif olduğu sürece." },
      { ad: "Pasif şirket", tutar: "€900 / yıl", line: "Banka hesabı ve ticari faaliyeti olmayan şirket için yıllık hesap ve beyan." },
    ],
  },

  faq: {
    id: "sss",
    heading: "Sık sorulanlar.",
    accent: "sorulanlar.",
    items: [
      { q: "Şirket vergi ödemiyorsa neden muhasebe tutuluyor?", a: "Serbest Bölge şirketinin vergi muafiyetinden yararlanması, muhasebe kayıtlarının tutulması ve yıllık hesap ile beyanların hazırlanması yükümlülüğünü ortadan kaldırmıyor." },
      { q: "Vergi çıkmıyorsa her yıl bir şey vermem gerekiyor mu?", a: "Evet, zorunlu. Vergi çıkmasa da Serbest Liman şirketi her yıl bilançosunu ve yıllık raporlarını veriyor." },
      { q: "Pasif şirket ne demek?", a: "Banka hesabı bulunmayan ve o hesap dönemi boyunca ticari faaliyeti ya da finansal işlemi olmayan şirket. Pasif şirketin de yıllık hesapları hazırlanıyor ve beyanları veriliyor." },
      { q: "Yıl içinde pasiften aktife geçersem ne olur?", a: "Banka hesabı açıldığı ya da ticari faaliyet başladığı aydan itibaren aylık hizmet uygulanıyor." },
      { q: "Muhasebe kuruluş bedeline dahil mi?", a: "Hayır. Muhasebe kuruluş tutarının içinde değil; ayrıca yürütülüyor ve faturalanıyor." },
      { q: "İşlem hacmim yüksekse ücret değişir mi?", a: "Standart kapsamı önemli ölçüde aşan işlem hacmi, geçmiş dönem kayıtları ya da özel raporlama gerekirse önceden bilgi veriyor ve ayrıca ücretlendiriyoruz." },
      { q: "Şirket KDV beyanı veriyor mu?", a: "KKTC dışındaki ve Serbest Liman içindeki şirketlere yaptığınız işte şirket KDV mükellefi değil. KKTC içindeki yerel şirkete satışta normal vergi kuralları uygulanıyor." },
      { q: "Şirketi kapatmak istersem muhasebe tarafında ne gerekiyor?", a: "Kapanış gönüllü tasfiyeyle yürüyor. Önce tüm bilanço ve yıllık raporların verilmiş olması gerekiyor; kayıtlar düzenliyse bu adım hazır oluyor." },
    ] as Faq[],
  },

  closing: {
    title: "KKTC şirketinizin muhasebesini birlikte yönetelim.",
    accent: "birlikte yönetelim.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
  },
};
