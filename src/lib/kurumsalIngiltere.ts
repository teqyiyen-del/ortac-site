/* ============================================================================
   İNGİLTERE · KURUMSAL DANIŞMANLIK — sayfanın bütün metni
   Sayfa: app/ingiltere/kurumsal-danismanlik/page.tsx
   Gövde: components/services/KurumsalSayfa.tsx · Biçim: lib/kurumsalDubai.ts
   (KurumsalVeri; sayfanın gerekçesi de o dosyanın başında)

   09.10.2026 · İLK YAZIM. Sayfa o güne kadar genel şablonun boş hâliydi ve
   yayında değildi (lib/routes.ts · STATIC_LIVE'a bu turda girdi).

   ------------------------------------------------------------ KAYNAK DÜZENİ
   Her hüküm birincil kaynaktan; bu turda yeniden okunanlar (09.10.2026):
     [RESMÎ-1] gov.uk/running-a-limited-company/company-changes-you-must-report
               · direktör, sekreter ve PSC değişikliği 14 gün; yeni pay
               çıkarma bir ay; kayıtlı adres sicile işlenince geçerli; ad,
               ana sözleşme ve direktör azli ortak kararı ister, bazı
               kararlar yüzde 75 çoğunluk.
     [RESMÎ-2] gov.uk/running-a-limited-company/confirmation-statement
               · en az 12 ayda bir, dönem bitiminden sonra 14 gün; SIC kodu,
               sermaye ve ortak bilgisi bununla güncelleniyor; verilmezse
               ceza ve sicilden silinme.
     [RESMÎ-3] gov.uk/strike-off-your-company-from-companies-register
               · son üç ayda ticaret yok, ad değişikliği yok, alacaklı
               anlaşması yok; silinince banka hesabına erişim kalkıyor;
               şart tutmuyorsa tasfiye.
     [RESMÎ-4] gov.uk/running-a-limited-company/company-and-accounting-records
               · ortak bilgileri, oylama ve karar kayıtları şirkette tutulur.
     [DOC]     docs/ingiltere-mevzuat.md (23.09.2026): en az bir direktör ve
               bir hissedar, kayıtlı ofis ve e-posta, PSC eşiği yüzde 25,
               kimlik doğrulama 18.11.2025'ten beri zorunlu, hesaplar 9 ay
               (ilk hesap 21 ay), CT600 12 ay, ödeme 9 ay 1 gün.

   BİLEREK YUMUŞATILANLAR:
     · Pay DEVRİNİN usulü (devir formu, damga vergisi) yazılmadı; birincil
       kaynaktan bu turda okunmadı. Sayfa yalnız "ortak listesi yıllık
       bildirimde güncelleniyor" diyor [RESMÎ-2].
     · Şirketin kendi PSC ve direktör defterini tutup tutmadığı YAZILMADI
       (ECCTA ile değişti, güncel resmî sayfa bulunamadı); sayfa yalnız
       Companies House'a bildirimi anlatıyor.
     · Harç ve ceza tutarları (£50, £5.000) sayfada yok: fiyat yazmıyoruz.
     · İngiltere'de bu hizmetin kapsamı Murat Bey'in teyidini bekliyor
       (docs/teslim/bilgi-ve-murat.md · madde 15).
   ========================================================================= */

import { KURUMSAL_DALLAR, type KurumsalVeri } from "@/lib/kurumsalDubai";

const CTA = { label: "İletişime geçin", href: "/iletisim" };

export const KURUMSAL_INGILTERE: KurumsalVeri = {
  ulke: "İngiltere",
  slug: "ingiltere",

  hero: {
    crumb: "İngiltere · Kurumsal Danışmanlık",
    title: "İngiltere'de kurumsal danışmanlık.",
    accent: "kurumsal danışmanlık.",
    lead: "Ltd şirketin kayıtları Companies House'ta herkese açık ve güncel kalmak zorunda. Direktör, ortak ve adres değişikliklerini, yıllık bildirimi ve kapanışı kuruluşu yapan ekip yürütüyor.",
    cta: CTA,
    trust: [
      { icon: "takvim", line: "Değişikliklerin çoğu 14 gün içinde bildiriliyor." },
      { icon: "dunya", line: "Direktörün İngiltere'de yaşaması gerekmiyor." },
    ],
  },

  /* ----------------------------------------------------- 1 · NE ZAMAN GEREKİR
     [RESMÎ-1] süreler ve ortak kararı; [RESMÎ-3] kapanış; [DOC] kimlik. */
  durum: {
    id: "ne-zaman",
    heading: "Ne zaman gerekir?",
    accent: "gerekir?",
    lead: "Şirketin sicildeki kaydına dokunan her iş. En sık karşılaştığımız altı durum:",
    items: [
      { icon: "yonetici", title: "Direktör değişiyor", line: "Atama ve ayrılma 14 gün içinde bildiriliyor; yeni direktörün kimliği önce doğrulanıyor." },
      { icon: "pay", title: "Yeni pay çıkarılıyor", line: "Pay çıkarma bir ay içinde bildiriliyor; ortak listesi yıllık bildirimde güncelleniyor." },
      { icon: "kimlik", title: "Kontrol sahibi değişti", line: "Yüzde 25'in üstünde pay ya da oy sahibi (PSC) değişince süre 14 gün." },
      { icon: "adres", title: "Kayıtlı adres değişecek", line: "Yeni adres İngiltere'de fiziksel bir adres olmalı; sicile işlenince geçerli oluyor." },
      { icon: "isim", title: "Ad ya da ana sözleşme değişecek", line: "Bu değişiklikler ortakların kararını gerektiriyor; karar metnini biz hazırlıyoruz." },
      { icon: "kapat", title: "Şirketi kapatmak istiyorsunuz", line: "Üç aydır ticaret yapmayan şirket sicilden silinebiliyor; şart tutmuyorsa tasfiye." },
    ],
  },

  /* ------------------------------------------------------------ 2 · YAPI */
  yapi: {
    id: "yapi",
    heading: "Yapıyı işinize göre kuruyoruz.",
    accent: "işinize göre kuruyoruz.",
    lead: "Çoğu iş için tek şirket yeterli. İkinci bir ülke, işiniz gerçekten gerektiriyorsa ekleniyor.",
    agac: { ust: "Siz ve ortaklarınız", dallar: KURUMSAL_DALLAR },
    items: [
      { icon: "ortak", title: "Direktör ve ortak", line: "En az bir direktör ve bir hissedar gerekiyor; ikisi aynı kişi olabiliyor." },
      { icon: "adres", title: "Kayıtlı ofis", line: "İngiltere'de fiziksel bir adres ve kayıtlı e-posta zorunlu; posta kutusu olmuyor." },
      { icon: "uyari", ton: "amber", title: "Vergi ayrı değerlendirilir", line: "Şirket kurmak otomatik vergi avantajı vermez; sonuç mukimliğinize bağlı." },
    ],
  },

  /* ---------------------------------------------------------- 3 · KAPSAM */
  kapsam: {
    id: "kapsam",
    heading: "Neleri üstleniyoruz?",
    accent: "üstleniyoruz?",
    lead: "Üç başlıkta topluyoruz: yapının planı, değişiklik bildirimleri ve yıllık kayıtlar.",
    gruplar: [
      { icon: "yapi", title: "Yapı ve planlama", maddeler: ["Direktör ve pay yapısı", "SIC kodu ve faaliyet tanımı", "İngiltere pazarına giriş planı", "Çok ülkeli yapı değerlendirmesi"] },
      { icon: "devir", title: "Değişiklik bildirimleri", maddeler: ["Direktör atama ve ayrılma", "Pay çıkarma ve ortak değişikliği", "Kontrol sahibi (PSC) değişikliği", "Adres, ad ve ana sözleşme değişikliği"] },
      { icon: "takvim", title: "Yıllık kayıtlar", maddeler: ["Yıllık bildirim (confirmation statement)", "Kimlik doğrulama takibi", "Karar metinlerinin hazırlanması", "Sicilden silme başvurusu"] },
    ],
    haric: {
      title: "Kapsam dışında",
      maddeler: ["Companies House harçları teklifte ayrı satır", "Vize ve oturum başvurusu; şirket oturum hakkı vermiyor", "Hukuki temsil ve dava takibi"],
    },
  },

  /* ------------------------------------------------------ 4 · DEĞİŞİKLİK */
  degisiklik: {
    id: "degisiklik",
    heading: "Bir değişiklik nasıl kayda geçiyor?",
    accent: "nasıl kayda geçiyor?",
    lead: "Üç durak: şirketin kararı, Companies House'a bildirim ve güncellenen sicil.",
    akis: [
      { ad: "Karar", alt: "Şirket karar alıyor" },
      { ad: "Bildirim", alt: "Companies House'a gidiyor" },
      { ad: "Sicil", alt: "Kayıt güncelleniyor" },
    ],
    items: [
      { icon: "yonetici", title: "Direktör değişikliği", line: "Atama, ayrılma ve direktörün adres gibi bilgilerindeki değişiklik bildiriliyor.", tag: "14 gün" },
      { icon: "kimlik", title: "Kontrol sahibi (PSC)", line: "Yüzde 25'in üstünde pay ya da oy sahibi olanlar ve bilgileri bildiriliyor.", tag: "14 gün" },
      { icon: "pay", title: "Yeni pay çıkarma", line: "Çıkarılan paylar bildiriliyor; ortak listesi yıllık bildirimde güncelleniyor.", tag: "1 ay" },
      { icon: "adres", title: "Kayıtlı adres", line: "Yeni adres şirketin tescil edildiği ülkede olmalı; sicile işlenene kadar geçerli değil.", tag: "Sicilde geçerli" },
      { icon: "isim", title: "Ad ve ana sözleşme", line: "Ortakların kararı gerekiyor; bazı kararlar yüzde 75 çoğunluk istiyor.", tag: "Ortak kararı" },
      { icon: "kapat", title: "Sicilden silme", line: "Son üç ayda ticaret ve ad değişikliği olmamalı; alacaklı anlaşması varsa yol tasfiye.", tag: "Şarta bağlı", ton: "amber" },
    ],
  },

  /* ---------------------------------------------------------- 5 · TAKVİM
     [RESMÎ-2] yıllık bildirim; [DOC] hesaplar, beyan, kimlik. */
  takvim: {
    id: "takvim",
    heading: "Şirketin bir yılı.",
    accent: "bir yılı.",
    lead: "Şirket ticaret yapmasa da bu bildirimler sürüyor; tarihleri sizin yerinize biz izliyoruz.",
    orta: "12 ay",
    kalemler: [
      { ay: 12, ad: "Yıllık bildirim", zaman: "12 ayda en az bir", line: "Confirmation statement, dönem bittikten sonra 14 gün içinde veriliyor." },
      { ay: 9, ad: "Yıllık hesaplar", zaman: "Mali yıl sonundan 9 ay", line: "Hesaplar Companies House'a veriliyor; ilk hesapta süre kuruluştan 21 ay." },
      { ay: 6, ad: "Kurumlar vergisi beyanı", zaman: "Dönemden sonra 12 ay", line: "Beyan 12 ay içinde; ödeme dönem sonundan 9 ay 1 gün sonra." },
      { ay: 3, ad: "Kimlik doğrulama", zaman: "Her yeni direktörde", line: "Direktörler ve kontrol sahipleri için 18 Kasım 2025'ten beri zorunlu." },
      { ad: "Direktör ve PSC değişikliği", zaman: "Değişiklikten sonra 14 gün", line: "Değişiklik olduğunda ayrıca bildiriliyor; yıllık bildirim beklenmiyor.", ton: "amber" },
    ],
  },

  /* ---------------------------------------------------------- 6 · ADIMLAR */
  adimlar: {
    id: "nasil",
    heading: "Nasıl çalışıyoruz?",
    accent: "çalışıyoruz?",
    lead: "Beş adım. Kaydı Companies House yapıyor; hazırlık ve takip bizde.",
    items: [
      { icon: "ara", title: "Durumu dinliyoruz", line: "Şirketin sicildeki bugünkü kaydı, neyin değişeceği ve neden." },
      { icon: "yapi", title: "Gereken işlemi belirliyoruz", line: "Hangi bildirim gerekiyor, ortak kararı isteniyor mu, süre ne zaman başlıyor." },
      { icon: "dosya", title: "Karar ve belgeleri hazırlıyoruz", line: "Karar metni ve bildirim için gereken bilgiler tek listede." },
      { icon: "onay", title: "Bildirimi yapıyoruz", line: "Bildirim Companies House'a süresi içinde veriliyor." },
      { icon: "kayit", title: "Sicili kontrol ediyoruz", line: "Kayıt güncellenince size haber veriyor, şirket kayıtlarını da güncelliyoruz." },
    ],
  },

  /* ----------------------------------------------------------- 7 · İLGİLİ */
  ilgili: {
    id: "ilgili",
    heading: "Bağlı olduğu hizmetler.",
    accent: "hizmetler.",
    lead: "Sicildeki bir değişiklik çoğu zaman muhasebeye, vergiye ve bankaya da dokunuyor.",
    items: [
      { icon: "kurulus", title: "Şirket kuruluşu", line: "Kimlik doğrulama, tescil ve kayıtlı adres.", href: "/ingiltere" },
      { icon: "muhasebe", title: "Muhasebe", line: "Yıllık hesaplar ve beyanlar.", href: "/ingiltere/muhasebe" },
      { icon: "vergi", title: "Vergi danışmanlığı", line: "Kurumlar vergisi ve KDV tarafı.", href: "/ingiltere/vergi" },
      { icon: "uyum", title: "AML ve uyum", line: "Kontrol sahibi kaydı ve uyum.", href: "/ingiltere/aml-uyum" },
    ],
  },

  /* -------------------------------------------------------------- 8 · SSS */
  faq: {
    id: "sss",
    heading: "Sık sorulanlar.",
    accent: "sorulanlar.",
    items: [
      { q: "Kurumsal danışmanlık neyi kapsıyor?", a: "Ltd şirketin kuruluştan sonraki yapısal işlerini: direktör, ortak ve kontrol sahibi değişiklikleri, kayıtlı adres, yıllık bildirim, karar metinleri ve gerektiğinde sicilden silme." },
      { q: "Direktörün İngiltere'de yaşaması gerekiyor mu?", a: "Hayır. Direktörün İngiltere'de yaşaması gerekmiyor. Şirketin İngiltere'de bir kayıtlı ofis adresi olması yeterli." },
      { q: "Yıllık bildirim (confirmation statement) nedir?", a: "Şirket bilgilerinin doğru olduğunu en az 12 ayda bir Companies House'a teyit eden bildirim. Verilmezse para cezası kesilebiliyor ve şirket sicilden silinebiliyor." },
      { q: "Kontrol sahibi (PSC) kimdir?", a: "Şirkette yüzde 25'in üstünde paya ya da oy hakkına sahip olan kişi. Bu kişiler Companies House'a bildiriliyor; değişiklik olduğunda süre 14 gün." },
      { q: "Kimlik doğrulama herkes için mi?", a: "18 Kasım 2025'ten beri direktörler ve kontrol sahipleri için zorunlu. Yurt dışında yaşayanlar GOV.UK One Login ile ya da yetkili bir aracı üzerinden doğruluyor." },
      { q: "Kullanmadığım şirketi nasıl kapatırım?", a: "Son üç ayda ticaret yapmamış, adını değiştirmemiş ve alacaklılarıyla anlaşma içinde olmayan şirket sicilden silinmek için başvurabiliyor. Silinince şirketin banka hesabına erişim de kalkıyor; şartları tutmayan şirket için yol tasfiye." },
      { q: "Şirket kurmak vergi avantajı sağlar mı?", a: "Kendiliğinden hayır. Şirket kurmak otomatik vergi avantajı vermez; iş Türkiye'den yönetiliyorsa şirketin nerede mukim sayılacağı ayrıca değerlendiriliyor." },
      { q: "Ücreti ne kadar?", a: "Kapsam işleme göre değiştiği için sabit fiyat yazmıyoruz. Görüşmeden sonra, resmî harçlar ayrı satırda olacak şekilde teklif veriyoruz." },
    ],
  },

  closing: {
    title: "Şirketinizin kayıtlarını birlikte gözden geçirelim.",
    accent: "birlikte gözden geçirelim.",
    cta: CTA,
  },
};
