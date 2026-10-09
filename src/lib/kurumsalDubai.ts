/* ============================================================================
   DUBAİ · KURUMSAL DANIŞMANLIK — sayfanın bütün metni ve ORTAK VERİ BİÇİMİ
   Sayfa: app/dubai/kurumsal-danismanlik/page.tsx
   Gövde: components/services/KurumsalSayfa.tsx · Biçim: css/svc-kurumsal.css (.skr-)
   Kardeşleri: lib/kurumsalIngiltere.ts · lib/kurumsalKktc.ts (aynı biçim)

   09.10.2026 · İLK YAZIM. Burak: "Kurumsal danışmanlığa geliyorum, bir şey
   yok. Üç dört kart koymuşsun, bitmiş. Banka, şirket kuruluşu, muhasebe çok
   güzel oldu: SVG görseller var, animasyonlar var. Bunları da öyle doldur."
   Sayfa o güne kadar genel hizmet şablonundan basılıyordu (lib/hizmetIcerik.ts;
   üç kart, dört kural, dört adım, dört soru). O kayıt SİLİNMEDİ, şablon başka
   hizmetler için duruyor; bu sayfa artık kendi klasöründen çıkıyor.

   KURUMSAL DANIŞMANLIK NEDİR (services.ts · YENİ · Murat Bey'in tablosu):
   "Şirket yapılandırması, pazara giriş ve iş danışmanlığı." Sayfa bunu şirketin
   KURULUŞTAN SONRAKİ yapısal işleri olarak anlatıyor: ortak ve yönetici
   değişikliği, faaliyet ekleme, lisans yenileme takibi, gerçek faydalanıcı
   kaydı, çok ülkeli yapı ve kapanış.

   ------------------------------------------------------------ KAYNAK DÜZENİ
     [ONAYLI]  sitede yayında olan cümle: hizmetIcerik.ts (Dubai kurumsal ve
               AML kayıtları; müşteri belgesinden), afterSetup.ts (Murat Bey'in
               "Dubai'de Şirket Kurduktan Sonra" belgesi), countryContent.ts.
     [TEYİT]   docs/teyit-cevaplar-1.md (Murat Bey, 27.09.2026): üç serbest
               bölge ortağı IFZA, Meydan, DWTC (Dubai kuruluş 7).
     [RESMÎ]   docs/bae-mevzuat.md (kurumlar vergisi beyanı dönem sonundan
               9 ay, CT Law md. 53) ve bu turda bakılan birincil kaynak:
               mof.gov.ae · ESR: Cabinet Resolution 98/2024 ile 31.12.2022'den
               sonra biten mali yıllar için bildirim ve rapor kalktı.

   BİLEREK YUMUŞATILANLAR (rapor: docs/durum.md'ye geçecek):
     · Gerçek faydalanıcı (UBO) bildiriminin GÜN SAYISI yazılmadı. İkincil
       kaynaklar 15 gün diyor (Cabinet Resolution 109/2023) ama resmî metin
       bu turda okunamadı; sayfa "değişince güncellenip bildiriliyor" diyor.
     · Serbest bölge şirketinin sonradan mainland'e çevrilmesi YAZILMADI:
       Murat Bey'e tekrar soruldu (Dubai kuruluş 8), cevap yok.
     · Pay devri, yönetici değişikliği ve faaliyet eklemenin adım adım usulü
       serbest bölgeye göre değişiyor; süre, harç ve belge sayısı yazılmadı.
     · FİYAT VE SÜRE HİÇBİR YERDE YOK (pricing.ts'e dokunulmadı).
   ========================================================================= */

import type { Faq } from "@/lib/countryContent";
import type { CountrySlug } from "@/lib/brand";

export type KurumsalIkon =
  | "yapi" | "ortak" | "yonetici" | "faaliyet" | "lisans" | "masa" | "dunya" | "kapat"
  | "takvim" | "kayit" | "karar" | "dosya" | "ara" | "onay" | "adres" | "kimlik"
  | "sermaye" | "uyari" | "muhasebe" | "vergi" | "uyum" | "kurulus" | "isim" | "devir" | "pay";

type Madde = { icon: KurumsalIkon; title: string; line: string };
type Bas = { id: string; heading: string; accent: string; lead: string };

/** Yıl halkasındaki kalem. `ay` (1-12) verilirse halkada işaret çıkıyor;
 *  verilmezse kalem yalnız listede ("değişiklik olunca" türü işler). */
export type KurumsalKalem = { ad: string; zaman: string; line: string; ay?: number; ton?: "amber" };

export type KurumsalVeri = {
  ulke: string;
  slug: CountrySlug;
  hero: { crumb: string; title: string; accent: string; lead: string; cta: { label: string; href: string }; trust: { icon: KurumsalIkon; line: string }[] };
  /** ne zaman gerekir · altı durum kartı */
  durum: Bas & { items: Madde[] };
  /** yapı ağacı: üstte ortaklar, altta üç ülkenin şirketi (bu ülke dolu çizgi) */
  yapi: Bas & {
    agac: { ust: string; dallar: { ulke: CountrySlug; ad: string; alt: string }[] };
    items: (Madde & { ton?: "amber" | "yesil" })[];
  };
  /** ne yapıyoruz · üç kapsam grubu ve kapsam dışı */
  kapsam: Bas & { gruplar: { icon: KurumsalIkon; title: string; maddeler: string[] }[]; haric: { title: string; maddeler: string[] } };
  /** değişiklik akışı (üç durak) ve değişiklik türleri */
  degisiklik: Bas & { akis: { ad: string; alt: string }[]; items: (Madde & { tag: string; ton?: "amber" })[] };
  /** şirketin bir yılı · halka ve kalem listesi */
  takvim: Bas & { orta: string; kalemler: KurumsalKalem[] };
  adimlar: Bas & { items: Madde[] };
  ilgili: Bas & { items: (Madde & { href: string })[] };
  faq: { id: string; heading: string; accent: string; items: Faq[] };
  closing: { title: string; accent: string; cta: { label: string; href: string } };
};

/* Hizmet sayfalarının düğmesi tek kalıp (bankaDubai.ts · 07.10.2026 notu):
   "İletişime geçin" → /iletisim; hizmetler ayrı satılmıyor. */
const CTA = { label: "İletişime geçin", href: "/iletisim" };

/* Ağacın üç dalı her ülkede aynı üç şirket; yalnız `slug` olan dolu çiziliyor.
   Şirketler arasında sahiplik çizgisi YOK (bir şirketin ötekine ortak olması
   üç ülkenin üçünde de doğrulanmadı); ağaç "ortaklar → şirketler" diyor. */
export const KURUMSAL_DALLAR: KurumsalVeri["yapi"]["agac"]["dallar"] = [
  { ulke: "dubai", ad: "Dubai", alt: "Serbest bölge şirketi" },
  { ulke: "ingiltere", ad: "İngiltere", alt: "Limited (Ltd)" },
  { ulke: "kktc", ad: "KKTC", alt: "Serbest Liman şirketi" },
];

export const KURUMSAL_DUBAI: KurumsalVeri = {
  ulke: "Dubai",
  slug: "dubai",

  hero: {
    crumb: "Dubai · Kurumsal Danışmanlık",
    title: "Dubai'de kurumsal danışmanlık.",
    accent: "kurumsal danışmanlık.",
    lead: "Şirket kurulduktan sonra da yapısı değişiyor: ortak giriyor, faaliyet ekleniyor, lisans yenileniyor. Bu işleri kuruluşu yapan ekip yürütüyor ve kayıtları güncel tutuyor.",
    cta: CTA,
    trust: [
      { icon: "kayit", line: "Değişiklikler serbest bölge otoritesinde kayda geçiyor." },
      { icon: "dunya", line: "Dubai, İngiltere ve KKTC'de kendi ofisimiz var." },
    ],
  },

  /* ----------------------------------------------------- 1 · NE ZAMAN GEREKİR
     [ONAYLI] masa, kapanış ve "ek izin" satırları hizmetIcerik.ts'ten. */
  durum: {
    id: "ne-zaman",
    heading: "Ne zaman gerekir?",
    accent: "gerekir?",
    lead: "Şirketin yapısına dokunan her iş. En sık karşılaştığımız altı durum:",
    items: [
      { icon: "ortak", title: "Ortak giriyor ya da çıkıyor", line: "Pay devri serbest bölge otoritesinde işleniyor; gerçek faydalanıcı kaydı da güncelleniyor." },
      { icon: "yonetici", title: "Yönetici değişiyor", line: "Yeni yönetici otoriteye bildiriliyor, şirket belgeleri yeniden düzenleniyor." },
      { icon: "faaliyet", title: "Yeni bir faaliyet ekleyeceksiniz", line: "Faaliyet lisansa ekleniyor; ek izin gerekiyorsa baştan söylüyoruz." },
      { icon: "masa", title: "Ofis ihtiyacınız değişti", line: "Paylaşımlı masadan özel ofise; işiniz büyüdükçe seçenek değiştirilebiliyor." },
      { icon: "dunya", title: "İkinci bir ülke düşünüyorsunuz", line: "Üç ülkede ofisimiz var; hangisinin işinize uyduğuna birlikte bakıyoruz." },
      { icon: "kapat", title: "Şirketi kullanmıyorsunuz", line: "Şirket kendiliğinden kapanmıyor; lisans iptali ve tasfiye ayrıca yürütülüyor." },
    ],
  },

  /* ------------------------------------------------------------ 2 · YAPI
     [TEYİT] üç serbest bölge. Amber satır sitenin duruşu (brand.ts · STANCE). */
  yapi: {
    id: "yapi",
    heading: "Yapıyı işinize göre kuruyoruz.",
    accent: "işinize göre kuruyoruz.",
    lead: "Çoğu iş için tek şirket yeterli. İkinci bir ülke, işiniz gerçekten gerektiriyorsa ekleniyor.",
    agac: { ust: "Siz ve ortaklarınız", dallar: KURUMSAL_DALLAR },
    items: [
      { icon: "lisans", title: "Serbest bölge ve lisans", line: "IFZA, Meydan ve DWTC arasından fiyata göre değil, planınıza göre seçiyoruz." },
      { icon: "ortak", title: "Ortaklık ve yönetim", line: "Pay dağılımı, yönetici, vize sayısı ve çalışma alanı birlikte planlanıyor." },
      { icon: "uyari", ton: "amber", title: "Vergi ayrı değerlendirilir", line: "Şirket kurmak otomatik vergi avantajı vermez; sonuç mukimliğinize bağlı." },
    ],
  },

  /* ---------------------------------------------------------- 3 · KAPSAM */
  kapsam: {
    id: "kapsam",
    heading: "Neleri üstleniyoruz?",
    accent: "üstleniyoruz?",
    lead: "Üç başlıkta topluyoruz: yapının planı, değişiklik işlemleri ve yıllık kayıtlar.",
    gruplar: [
      { icon: "yapi", title: "Yapı ve planlama", maddeler: ["Serbest bölge ve lisans türü seçimi", "Ortaklık ve yönetim yapısı", "Pazara giriş planı", "Çok ülkeli yapı değerlendirmesi"] },
      { icon: "devir", title: "Değişiklik işlemleri", maddeler: ["Pay devri ve ortak değişikliği", "Yönetici değişikliği", "Faaliyet ekleme ve lisans değişikliği", "Çalışma alanı değişikliği"] },
      { icon: "takvim", title: "Yıllık kayıtlar", maddeler: ["Lisans ve adres yenileme takibi", "Gerçek faydalanıcı kaydının güncellenmesi", "Karar metinlerinin hazırlanması", "Lisans iptali ve tasfiye"] },
    ],
    haric: {
      title: "Kapsam dışında",
      maddeler: ["Resmî harçlar ve serbest bölge ücretleri teklifte ayrı satır", "Banka hesabı kararı bankaya ait", "Hukuki temsil ve dava takibi"],
    },
  },

  /* ------------------------------------------------------ 4 · DEĞİŞİKLİK
     [ONAYLI] hizmet devri ve kapanış satırları hizmetIcerik.ts'ten. */
  degisiklik: {
    id: "degisiklik",
    heading: "Bir değişiklik nasıl kayda geçiyor?",
    accent: "nasıl kayda geçiyor?",
    lead: "Üç durak: ortakların kararı, otoriteye başvuru ve yenilenen şirket belgeleri.",
    akis: [
      { ad: "Karar", alt: "Ortaklar karar alıyor" },
      { ad: "Başvuru", alt: "Dosya otoriteye gidiyor" },
      { ad: "Kayıt", alt: "Belgeler yenileniyor" },
    ],
    items: [
      { icon: "pay", title: "Pay devri", line: "Devir serbest bölge otoritesinde işleniyor; yeni ortağın kimlik belgeleri isteniyor.", tag: "Otorite onayı" },
      { icon: "yonetici", title: "Yönetici değişikliği", line: "Atama kararı alınıyor, otoriteye bildiriliyor ve şirket belgeleri güncelleniyor.", tag: "Otorite bildirimi" },
      { icon: "faaliyet", title: "Faaliyet ekleme", line: "Yeni faaliyet lisansa ekleniyor; bazı faaliyetler ek onay istiyor.", tag: "Lisans değişir" },
      { icon: "kimlik", title: "Gerçek faydalanıcı kaydı", line: "Ortaklık ya da kontrol değişince kayıt güncellenip otoriteye bildiriliyor.", tag: "Her değişiklikte" },
      { icon: "devir", title: "Hizmet devri", line: "Şirketi başka bir danışmana devretmek isterseniz gereken yazıyı biz düzenliyoruz.", tag: "Yazı bizden" },
      { icon: "kapat", title: "Kapanış", line: "Lisans iptal ediliyor ve tasfiye yürütülüyor; açık kalan şirketin yükümlülüğü sürüyor.", tag: "Kendiliğinden olmaz", ton: "amber" },
    ],
  },

  /* ---------------------------------------------------------- 5 · TAKVİM
     [ONAYLI] lisans, adres, vize: afterSetup.ts. [RESMÎ] beyan 9 ay. */
  takvim: {
    id: "takvim",
    heading: "Şirketin bir yılı.",
    accent: "bir yılı.",
    lead: "Şirket faaliyet göstermese de bu işler sürüyor; tarihleri sizin yerinize biz izliyoruz.",
    orta: "12 ay",
    kalemler: [
      { ay: 12, ad: "Lisans yenileme", zaman: "Her yıl", line: "Ticaret lisansı her yıl yenileniyor; yenilenmezse şirket faaliyetine devam edemiyor." },
      { ay: 11, ad: "Kayıtlı adres", zaman: "Lisansla birlikte", line: "Serbest bölgedeki adresin kullanım hakkı lisansla birlikte yenileniyor." },
      { ay: 9, ad: "Kurumlar vergisi beyanı", zaman: "Dönem sonundan 9 ay", line: "Beyan ve ödeme, vergi dönemi bittikten sonra dokuz ay içinde." },
      { ay: 5, ad: "Oturum vizesi", zaman: "İki yılda bir", line: "Yatırımcı oturumu iki yıllık; yenilemesi lisanstan ayrı izleniyor." },
      { ad: "Gerçek faydalanıcı kaydı", zaman: "Değişiklik olunca", line: "Ortaklık ya da kontrol değişince kayıt güncelleniyor.", ton: "amber" },
    ],
  },

  /* ---------------------------------------------------------- 6 · ADIMLAR */
  adimlar: {
    id: "nasil",
    heading: "Nasıl çalışıyoruz?",
    accent: "çalışıyoruz?",
    lead: "Beş adım. Onay kararını otorite veriyor; hazırlık ve takip bizde.",
    items: [
      { icon: "ara", title: "Durumu dinliyoruz", line: "Şirketin bugünkü yapısı, neyin değişeceği ve neden." },
      { icon: "yapi", title: "Seçenekleri çıkarıyoruz", line: "Hangi işlem gerekiyor, hangi otoriteye gidiyor, hangi belge isteniyor." },
      { icon: "dosya", title: "Dosyayı hazırlıyoruz", line: "Karar metnini ve başvuru belgelerini tek listede biz hazırlıyoruz." },
      { icon: "onay", title: "Başvuruyu yürütüyoruz", line: "Otoriteyle yazışma bizde; sonucu otorite belirliyor." },
      { icon: "kayit", title: "Kayıtları güncelliyoruz", line: "Yeni şirket belgeleri size teslim ediliyor; bağlı kayıtlar da güncelleniyor." },
    ],
  },

  /* ----------------------------------------------------------- 7 · İLGİLİ */
  ilgili: {
    id: "ilgili",
    heading: "Bağlı olduğu hizmetler.",
    accent: "hizmetler.",
    lead: "Yapıdaki bir değişiklik çoğu zaman muhasebeye, vergiye ve bankaya da dokunuyor.",
    items: [
      { icon: "kurulus", title: "Şirket kuruluşu", line: "Serbest bölge seçimi, lisans ve tescil.", href: "/dubai" },
      { icon: "muhasebe", title: "Muhasebe", line: "Aylık kayıt, yıl sonu ve beyanlar.", href: "/dubai/muhasebe" },
      { icon: "vergi", title: "Vergi danışmanlığı", line: "Kurumlar vergisi ve KDV tarafı.", href: "/dubai/vergi" },
      { icon: "uyum", title: "AML ve uyum", line: "Gerçek faydalanıcı ve uyum kayıtları.", href: "/dubai/aml-uyum" },
    ],
  },

  /* -------------------------------------------------------------- 8 · SSS
     2. ve 6. soru hizmetIcerik.ts'teki onaylı cevaplar. 5. soru [RESMÎ] MoF. */
  faq: {
    id: "sss",
    heading: "Sık sorulanlar.",
    accent: "sorulanlar.",
    items: [
      { q: "Kurumsal danışmanlık neyi kapsıyor?", a: "Şirketin kuruluştan sonraki yapısal işlerini: pay devri, yönetici ve faaliyet değişikliği, lisans yenileme takibi, gerçek faydalanıcı kaydı ve gerektiğinde kapanış. Kuruluş öncesindeki yapı seçimi de bu işin parçası." },
      { q: "Hangi serbest bölgeyi önereceğinizi neye göre belirliyorsunuz?", a: "Faaliyet alanınıza, müşteri yapınıza, vize sayınıza, ofis ihtiyacınıza ve banka planınıza göre. Üç serbest bölgenin maliyeti, lisans seçenekleri ve çalışma alanı şartları birbirinden farklı." },
      { q: "Şirketi kullanmıyorum, kapatmam gerekir mi?", a: "Kullanmadığınız şirket kendiliğinden kapanmıyor. Lisans yenileme, vergi ve muhasebe yükümlülükleri sürüyor; kullanmayacaksanız lisans iptali ve tasfiyeyle resmî olarak kapatmak gerekiyor." },
      { q: "Ortak değişince başka neyi güncellemek gerekiyor?", a: "Gerçek faydalanıcı kaydını. Ortaklık ya da kontrol değişince bu kayıt güncellenip lisans otoritesine bildiriliyor. Banka da kendi kayıtları için güncel belgeleri isteyebiliyor." },
      { q: "Ekonomik varlık (ESR) bildirimi hâlâ veriliyor mu?", a: "31 Aralık 2022'den sonra biten mali yıllar için bildirim ve rapor yükümlülüğü kaldırıldı. Daha eski yıllar için durumunuza görüşmede birlikte bakıyoruz." },
      { q: "Şirketi sonradan başka bir danışmana taşıyabilir miyim?", a: "Evet. Serbest bölgenin kuralları izin verdiği ölçüde gereken yazıyı ve idari desteği sağlıyoruz." },
      { q: "Şirket kurmak vergi avantajı sağlar mı?", a: "Kendiliğinden hayır. Şirket kurmak otomatik vergi avantajı vermez; sonuç vergi mukimliğinize ve gelirin nerede doğduğuna bağlı. Yapıyı buna göre birlikte değerlendiriyoruz." },
      { q: "Ücreti ne kadar?", a: "Kapsam işleme göre değiştiği için sabit fiyat yazmıyoruz. Görüşmeden sonra, resmî harçlar ayrı satırda olacak şekilde teklif veriyoruz." },
    ],
  },

  closing: {
    title: "Şirketinizin yapısını birlikte gözden geçirelim.",
    accent: "birlikte gözden geçirelim.",
    cta: CTA,
  },
};
