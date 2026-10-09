import type { Country } from "@/lib/store";
import type { ServiceSlug } from "@/lib/services";

/* ÜÇ YENİ HİZMETİN SAYFA İÇERİĞİ · Dubai (07.10.2026)
   Burak: "üç tane yeni gelen şeyin içi boş, sadece kapsam / teklife bağlı
   yazıyor. Vize ve oturum sayfasını yapmıştık, kısa; diğerlerine de aynı
   şekilde, sana attığım PDF'e de bakarak yol izleyebilirsin."

   KALIP vize sayfasının kısa kalıbı (app/dubai/oturum-vize): üç kart, dört
   kural karosu, dört adım, kısa SSS. Genel hizmet şablonu
   (app/ulke/[slug]/[hizmet]) bu dosyada içerik bulursa zengin düzeni basıyor.

   KAYNAK müşterinin teklif belgesi (ORTAC Accounting Services LLC, Dubai
   Free Zone teklifi, 06.10.2026; Burak: "oradaki bilgiler doğru"). Hangi
   cümlenin hangi bölümden geldiği her blokta yazılı. Belgede OLMAYAN hiçbir
   oran, süre ya da tutar eklenmedi; üç hizmetin fiyatı yok ("diğer
   hizmetlerde fiyat vermeyiz").

   VERGİ DANIŞMANLIĞI İLE MUHASEBENİN FARKI (Burak sordu). Muhasebe kaydı
   tutar, KDV beyanını verir, beyanın dayanağını hazırlar (/dubai/muhasebe).
   Vergi danışmanlığı "hangi rejimdeyim, serbest bölge avantajı bana işler
   mi, mukimliğim ne olur" sorusudur; belge de kurumlar vergisi kaydı,
   beyanı, özel danışmanlık ve transfer fiyatlandırmasını aylık muhasebenin
   DIŞINDA sayıyor (madde 9.7). İki sayfa bu yüzden ayrı.

   KKTC'nin iki sayfası kendi dosyasında (dosyanın sonundaki not). İngiltere
   için içerik YOK (kaynak belge yok); o sayfalar kapalı. */

export type HizmetIkon =
  | "yuzde" | "kalkan" | "kisi" | "harita" | "katman" | "ortak" | "takvim" | "masa"
  | "devir" | "kapat" | "dosya" | "parmak" | "bayrak" | "banka" | "saat" | "tik" | "ara" | "terazi";

export type HizmetIcerik = {
  kartlar: { baslik: string; vurgu: string; lead: string; items: { icon: HizmetIkon; kim: string; title: string; line: string }[] };
  kurallar: { baslik: string; vurgu: string; lead: string; items: { icon: HizmetIkon; title: string; line: string }[] };
  adimlar: { baslik: string; vurgu: string; lead: string; items: { icon: HizmetIkon; title: string; line: string }[]; cikis?: { label: string; href: string } };
  /** fiyatı net olan hizmette (KKTC muhasebe) kartların altında fiyat kutuları */
  fiyat?: { baslik: string; vurgu: string; lead: string; items: { ad: string; tutar: string; line: string }[] };
  sss: { q: string; a: string }[];
};

const DUBAI: Partial<Record<ServiceSlug, HizmetIcerik>> = {
  /* ------------------------------------------------------------- VERGİ
     Belge: "Corporate Tax ve %0 Vergi Avantajı", "Standart UAE Corporate Tax
     Sistemi", "Kişisel Gelir Vergisi Avantajı", madde 8 ve 9.7. */
  /* 09.10.2026 · ARTIK BASILMIYOR: vergi sayfası kendi gövdesine çıktı (services/VergiSayfa · lib/vergi*.ts); kayıt silinmedi. */
  vergi: {
    kartlar: {
      baslik: "Vergide neye bakıyoruz?",
      vurgu: "neye bakıyoruz?",
      lead: "Kayıt ve beyan muhasebenin işi. Burada hangi kuralın size işlediğini netleştiriyoruz.",
      items: [
        { icon: "yuzde", kim: "Her şirket", title: "Kurumlar vergisi durumunuz", line: "Faaliyetinize ve gelir yapınıza bakıp hangi rejime girdiğinizi netleştiriyoruz." },
        { icon: "kalkan", kim: "Serbest bölge şirketi", title: "Serbest bölge avantajı", line: "Nitelikli serbest bölge statüsünün şartlarını ve hangi gelirin sayıldığını değerlendiriyoruz." },
        { icon: "kisi", kim: "Yurt dışında yaşayan ortak", title: "Şirket ve kişisel mukimlik", line: "Şirketin ve sizin vergi mukimliğinizi birlikte ele alıyoruz." },
      ],
    },
    kurallar: {
      baslik: "Bilmeniz gereken dört kural.",
      vurgu: "dört kural.",
      lead: "Dubai'de şirket kurmak tek başına vergi avantajı vermiyor. Çerçeve şöyle:",
      items: [
        { icon: "yuzde", title: "375.000 AED'ye kadar %0", line: "Standart rejimde vergilendirilebilir gelirin ilk 375.000 AED'si %0, üstü %9." },
        { icon: "kalkan", title: "Serbest bölge otomatik %0 değil", line: "Şartları sağlayan şirketin yalnız nitelikli sayılan geliri %0 kapsamına giriyor." },
        { icon: "terazi", title: "Ciro değil, vergilendirilebilir gelir", line: "Hesap cirodan değil, mevzuata göre belirlenen vergilendirilebilir gelirden yapılıyor." },
        { icon: "kisi", title: "Kişisel gelir vergisi yok", line: "BAE'de maaş ve kişisel gelir vergilendirilmiyor; başka ülkedeki mukimliğiniz sürüyorsa o ülkenin kuralı geçerli." },
      ],
    },
    adimlar: {
      baslik: "Nasıl ilerliyor?",
      vurgu: "ilerliyor?",
      lead: "Dört adım; ilki bir görüşme.",
      items: [
        { icon: "ara", title: "Faaliyetinize bakıyoruz", line: "Ne iş yaptığınızı, müşterilerinizin nerede olduğunu ve gelir türlerinizi dinliyoruz." },
        { icon: "terazi", title: "Rejimi netleştiriyoruz", line: "Standart rejim mi, serbest bölge avantajı mı; hangi geliriniz hangisine giriyor, yazıyla bildiriyoruz." },
        { icon: "dosya", title: "Kayıt ve beyanı planlıyoruz", line: "Kurumlar vergisi kaydı ve beyan takvimi muhasebe ekibimizle birlikte kuruluyor." },
        { icon: "takvim", title: "Yıl içinde takip ediyoruz", line: "Faaliyet, gelir kaynağı ya da yapı değişirse statünüzün korunup korunmadığına yeniden bakıyoruz." },
      ],
      cikis: { label: "Muhasebe hizmetine bakın", href: "/dubai/muhasebe" },
    },
    sss: [
      { q: "Muhasebe hizmetinden farkı ne?", a: "Muhasebe kayıtları tutuyor ve beyanın dayanağını hazırlıyor. Kurumlar vergisi kaydı, beyanın hazırlanıp sunulması, özel vergi danışmanlığı ve transfer fiyatlandırması çalışmaları aylık muhasebe ücretine dahil değil; ayrı yürüyor." },
      { q: "Serbest bölgede kurarsam vergi ödemez miyim?", a: "Bu garanti değil. %0 yalnız gerekli şartları sağlayan şirketin nitelikli geliri için geçerli; kalan gelir standart kurala göre vergileniyor. Durumunuza bakmadan oran söylemiyoruz." },
      { q: "Dubai'de oturum alınca Türkiye'deki vergi mukimliğim biter mi?", a: "Kendiliğinden bitmez. Oturum izni ya da Emirates ID sahibi olmak, başka bir ülkedeki mukimliği tek başına sona erdirmiyor; iki tarafı birlikte değerlendiriyoruz." },
      { q: "Ücreti ne kadar?", a: "Kapsam şirketten şirkete değiştiği için sabit fiyat yazmıyoruz; görüşmeden sonra teklif veriyoruz." },
    ],
  },

  /* 09.10.2026 · BU KAYIT ARTIK BASILMIYOR: sayfa kendi klasöründe (lib/kurumsalDubai.ts); kayıt kaynak olarak duruyor. */
  /* ------------------------------------------------ KURUMSAL DANIŞMANLIK
     Belge: "Hangi Dubai Free Zone?", "ORTAC ile Doğru Yapının Belirlenmesi",
     madde 2.1, "Şirket Adresi ve Workspace Seçenekleri", madde 10, 11, 14. */
  "kurumsal-danismanlik": {
    kartlar: {
      baslik: "Kuruluştan önce neyi netleştiriyoruz?",
      vurgu: "neyi netleştiriyoruz?",
      lead: "Yapı baştan doğru kurulursa sonradan değiştirmek gerekmiyor.",
      items: [
        { icon: "harita", kim: "Nerede", title: "Serbest bölge seçimi", line: "IFZA, Meydan ve DWTC arasından işinize uygun olanı fiyata göre değil, planınıza göre seçiyoruz." },
        { icon: "katman", kim: "Ne iş", title: "Faaliyet ve lisans", line: "İşinize uygun faaliyeti ve lisans türünü belirliyoruz; ek izin gerekiyorsa baştan söylüyoruz." },
        { icon: "ortak", kim: "Kimlerle", title: "Ortaklık ve yönetim", line: "Ortaklık ve yönetim yapısını, vize sayısını ve çalışma alanı ihtiyacını birlikte planlıyoruz." },
      ],
    },
    kurallar: {
      baslik: "Kuruluştan sonra da yanınızdayız.",
      vurgu: "yanınızdayız.",
      lead: "Şirket kurulunca iş bitmiyor. Sonradan karşınıza çıkan dört konu:",
      items: [
        { icon: "takvim", title: "Lisans yenileme", line: "Lisans ve adres hizmeti süre sonunda yenileniyor; ücret o günün tarifesine göre belirleniyor." },
        { icon: "masa", title: "Çalışma alanı", line: "Paylaşımlı masadan özel ofise; işiniz büyüdükçe seçenek değiştirilebiliyor." },
        { icon: "devir", title: "Hizmet devri", line: "Şirketi başka bir danışmana devretmek isterseniz gereken yazıyı biz düzenliyoruz." },
        { icon: "kapat", title: "Kapanış", line: "Kullanmadığınız şirket kendiliğinden kapanmıyor; lisans iptali ve tasfiye ayrıca yürütülüyor." },
      ],
    },
    adimlar: {
      baslik: "Nasıl ilerliyor?",
      vurgu: "ilerliyor?",
      lead: "Dört adım; sonuncusu kuruluşun kendisi.",
      items: [
        { icon: "ara", title: "İş modelinizi dinliyoruz", line: "Faaliyet, ortaklar, hedef pazar, vize ihtiyacı ve banka planı." },
        { icon: "harita", title: "Serbest bölgeyi seçiyoruz", line: "Üç bölgeyi sizin durumunuz için karşılaştırıp birini öneriyoruz." },
        { icon: "katman", title: "Faaliyet ve lisansı belirliyoruz", line: "Faaliyet kodu, lisans türü ve gerekiyorsa ek onaylar netleşiyor." },
        { icon: "tik", title: "Kuruluşa geçiyoruz", line: "Yapı netleşince başvuru aynı ekipte başlıyor." },
      ],
      cikis: { label: "Dubai'de şirket kuruluşuna bakın", href: "/dubai" },
    },
    sss: [
      { q: "Kimler için uygun?", a: "Uluslararası danışmanlık ve hizmet şirketleri, yazılım ve teknoloji, e-ticaret, uluslararası ticaret, holding ve yatırım yapıları ile müşterisi BAE dışında olan işletmeler." },
      { q: "Hangi serbest bölgeyi önereceğinizi neye göre belirliyorsunuz?", a: "Faaliyet alanınıza, müşteri yapınıza, vize sayınıza, ofis ihtiyacınıza ve banka planınıza göre. Üç bölgenin maliyeti, lisans seçenekleri ve çalışma alanı şartları birbirinden farklı." },
      { q: "Şirketi sonradan başka bir danışmana taşıyabilir miyim?", a: "Evet. Serbest bölgenin kuralları izin verdiği ölçüde gereken yazıyı ve idari desteği sağlıyoruz." },
      { q: "Ücreti ne kadar?", a: "Kuruluşla birlikte yürüyen ön danışmanlık kuruluş hizmetinin parçası. Ayrı bir çalışma gerekiyorsa görüşmeden sonra teklif veriyoruz." },
    ],
  },

  /* 09.10.2026 · BU KAYIT ARTIK BASILMIYOR: üç ülkenin AML sayfası kendi gövdesinde (services/AmlSayfa.tsx · lib/aml*.ts). Kayıt olarak duruyor. */
  /* -------------------------------------------------------- AML VE UYUM
     Belge: süreç adımı "KYC ve Şirket Belgeleri", madde 3.2, 8 (UBO ve
     kurumsal kayıtların güncellenmesi, AML ve diğer uyum yükümlülükleri),
     "Kurumsal Banka Hesabı", madde 14. Belge bu başlığı kısa geçiyor; sayfa
     da bilerek kısa, belgede olmayan yükümlülük yazılmadı. */
  "aml-uyum": {
    kartlar: {
      baslik: "Uyumda neyi üstleniyoruz?",
      vurgu: "neyi üstleniyoruz?",
      lead: "Serbest bölge de banka da şirketin kim olduğunu belgeyle görmek istiyor.",
      items: [
        { icon: "dosya", kim: "Kuruluşta", title: "Kimlik ve şirket belgeleri", line: "Ortakların ve yöneticilerin belgelerini serbest bölgenin istediği biçimde hazırlıyoruz." },
        { icon: "parmak", kim: "Her şirket", title: "Gerçek faydalanıcı kaydı", line: "Şirketin gerçek faydalanıcı kaydını açıyor, ortaklık değiştiğinde güncelliyoruz." },
        { icon: "kalkan", kim: "Faaliyete göre", title: "Kara para önleme yükümlülükleri", line: "Faaliyetiniz bu kurallara tabiyse kayıt ve bildirim yükümlülüklerini takip ediyoruz." },
      ],
    },
    kurallar: {
      baslik: "Bilmeniz gereken dört nokta.",
      vurgu: "dört nokta.",
      lead: "Uyum bir kez yapılıp biten bir iş değil.",
      items: [
        { icon: "banka", title: "Banka da soruyor", line: "Hesap açarken banka ortaklık yapınıza, gerçek faaliyetinize ve paranın kaynağına bakıyor." },
        { icon: "saat", title: "Şirket faaliyetsiz kalsa da sürüyor", line: "Faaliyet göstermemek ya da banka hesabının olmaması yükümlülükleri kaldırmıyor." },
        { icon: "takvim", title: "Kayıtlar güncel kalmalı", line: "Ortak, yönetici ya da faaliyet değişince kayıtlar da güncelleniyor." },
        { icon: "tik", title: "Belgeler doğru ve eksiksiz", line: "Geçerli pasaport, adres belgesi ve şirket belgeleri zamanında ve eksiksiz verilmeli." },
      ],
    },
    adimlar: {
      baslik: "Nasıl ilerliyor?",
      vurgu: "ilerliyor?",
      lead: "Dört adım; çoğu kuruluşla birlikte yürüyor.",
      items: [
        { icon: "dosya", title: "Belgeleri topluyoruz", line: "Hangi belgenin kimden gerektiğini tek listede veriyoruz." },
        { icon: "parmak", title: "Kayıtları açıyoruz", line: "Gerçek faydalanıcı ve şirket kayıtları kuruluşla birlikte açılıyor." },
        { icon: "ara", title: "Yükümlülüğünüzü belirliyoruz", line: "Faaliyetinizin ek kayıt ya da bildirim gerektirip gerektirmediğine bakıyoruz." },
        { icon: "takvim", title: "Güncel tutuyoruz", line: "Değişiklik olduğunda kayıtları biz güncelliyoruz." },
      ],
    },
    sss: [
      { q: "Her şirketin kara para önleme kaydı yapması gerekiyor mu?", a: "Hayır, faaliyete göre değişiyor. Gerçek faydalanıcı kaydı ise her şirket için var. Sizin faaliyetinizde ne gerektiğini görüşmede netleştiriyoruz." },
      { q: "Şirketi kullanmıyorum, yine de bir şey yapmam gerekir mi?", a: "Evet. Şirketin faaliyet göstermemesi lisans yenileme, vergi, muhasebe ve öteki yasal yükümlülükleri kendiliğinden ortadan kaldırmıyor. Kullanmayacaksanız resmî olarak kapatmak gerekiyor." },
      { q: "Banka hesabı açılmasını garanti ediyor musunuz?", a: "Hayır. Kararı banka veriyor; biz dosyayı bankanın istediği biçimde hazırlıyoruz." },
      { q: "Ücreti ne kadar?", a: "Kapsam faaliyete göre değiştiği için sabit fiyat yazmıyoruz; görüşmeden sonra teklif veriyoruz." },
    ],
  },
};

/* ============================================================ İNGİLTERE
   08.10.2026 · VERGİ. Müşteri belgesi yok; oran, eşik, süre ve cezaların
   hepsi resmî kaynaktan (docs/ingiltere-mevzuat.md · 4, 5: gov.uk, HMRC,
   legislation.gov.uk; kontrol 23.09.2026) ve aynı rakamlar ülke sayfasında
   yayında. Fiyat yok. */
const INGILTERE: Partial<Record<ServiceSlug, HizmetIcerik>> = {
  /* 09.10.2026 · ARTIK BASILMIYOR: vergi sayfası kendi gövdesine çıktı (services/VergiSayfa · lib/vergi*.ts); kayıt silinmedi. */
  vergi: {
    kartlar: {
      baslik: "Vergide neye bakıyoruz?",
      vurgu: "neye bakıyoruz?",
      lead: "Kayıt ve beyan muhasebenin işi. Burada hangi kuralın size işlediğini netleştiriyoruz.",
      items: [
        { icon: "yuzde", kim: "Her şirket", title: "Kurumlar vergisi", line: "Kârınıza göre hangi oranın işlediğini ve beyan takvimini çıkarıyoruz." },
        { icon: "terazi", kim: "Satış yapan şirket", title: "KDV durumu", line: "Kayıt zorunlu mu, gönüllü kayıt size uyar mı; birlikte değerlendiriyoruz." },
        { icon: "kisi", kim: "Türkiye'de yaşayan ortak", title: "Kâr payı ve Türkiye", line: "Şirketin ve sizin vergi tarafınızı birlikte ele alıyoruz." },
      ],
    },
    kurallar: {
      baslik: "Bilmeniz gereken dört kural.",
      vurgu: "dört kural.",
      lead: "İngiltere vergi için değil, ödeme altyapısı ve tanınırlık için seçiliyor. Çerçeve şöyle:",
      items: [
        { icon: "yuzde", title: "Kurumlar vergisi %19 ile %25 arası", line: "Kâr £50.000'e kadar %19, £250.000'in üstünde %25; arada kademeli." },
        { icon: "terazi", title: "KDV eşiği £90.000", line: "Yıllık ciro eşiği aşarsa kayıt zorunlu; altında isteğe bağlı." },
        { icon: "takvim", title: "Geciken beyannamede ceza otomatik", line: "Bir gün gecikme £200, üç ayı geçerse £200 daha." },
        { icon: "kisi", title: "Kâr payı Türkiye'de beyan ediliyor", line: "Kâr şirkette kaldıkça Türkiye'de ek vergi yok; size geçtiğinde beyan ediyorsunuz." },
      ],
    },
    adimlar: {
      baslik: "Nasıl ilerliyor?",
      vurgu: "ilerliyor?",
      lead: "Dört adım; ilki bir görüşme.",
      items: [
        { icon: "ara", title: "Faaliyetinize bakıyoruz", line: "Ne sattığınızı, müşterilerinizin nerede olduğunu ve şirketi nereden yönettiğinizi dinliyoruz." },
        { icon: "terazi", title: "Çerçeveyi netleştiriyoruz", line: "Kurumlar vergisi, KDV ve kâr payı tarafında size işleyen kuralları yazıyla bildiriyoruz." },
        { icon: "dosya", title: "Kayıtları planlıyoruz", line: "Kurumlar vergisi kaydı ve gerekiyorsa KDV kaydı muhasebe ekibimizle kuruluyor." },
        { icon: "takvim", title: "Yıl içinde takip ediyoruz", line: "Ciro eşiğe yaklaşır ya da yapı değişirse durumunuza yeniden bakıyoruz." },
      ],
      cikis: { label: "Muhasebe hizmetine bakın", href: "/ingiltere/muhasebe" },
    },
    sss: [
      { q: "İngiltere'de şirket kurarsam daha az vergi öder miyim?", a: "Bu beklentiyle kurulması doğru olmaz. Ltd'nin kârı İngiltere'de %19 ile %25 arasında kurumlar vergisine tabi. İngiltere ödeme altyapısı ve tanınırlık için seçiliyor." },
      { q: "Şirketi Türkiye'den yönetirsem ne olur?", a: "İşlerin fiilen Türkiye'de yönetildiği bir şirket Türkiye'de de mükellef sayılabiliyor; iki ülke çatışmada karşılıklı anlaşmayla karar veriyor. Durumunuzu görüşmede konuşuyoruz." },
      { q: "Kâr payı alırsam Türkiye'de vergi öder miyim?", a: "Türkiye'de yaşıyorsanız kâr payını yıllık beyannamenizle beyan ediyorsunuz; şartlar sağlanırsa yarısı istisna. Kişiye özel vergi görüşü vermiyoruz." },
      { q: "Maaş mı, kâr payı mı?", a: "İkisi de mümkün. Maaş için İngiltere'de bordro (PAYE) kaydı gerekiyor. Hangisinin size uyduğu Türkiye'deki durumunuza bağlı." },
      { q: "Ücreti ne kadar?", a: "Kapsam şirketten şirkete değiştiği için sabit fiyat yazmıyoruz; görüşmeden sonra yazılı olarak bildiriyoruz." },
    ],
  },
};

/* ================================================================= KKTC
   08.10.2026 · VERGİ. Kaynak: KKTC teklif belgesi, teyit cevapları ve
   docs/kktc-mevzuat.md · 3, 9 (Serbest Liman vergi sayfası, GVK, Türkiye-KKTC
   anlaşması). Cümlelerin çoğu ülke sayfasının "vergi nerede çıkıyor"
   bölümünde yayında. Fiyat yok. */
const KKTC: Partial<Record<ServiceSlug, HizmetIcerik>> = {
  /* 09.10.2026 · ARTIK BASILMIYOR: vergi sayfası kendi gövdesine çıktı (services/VergiSayfa · lib/vergi*.ts); kayıt silinmedi. */
  vergi: {
    kartlar: {
      baslik: "Vergide neye bakıyoruz?",
      vurgu: "neye bakıyoruz?",
      lead: "Muafiyet şarta bağlı. Burada o şartın sizin işinizde sağlanıp sağlanmadığına bakıyoruz.",
      items: [
        { icon: "kalkan", kim: "Serbest Liman şirketi", title: "Muafiyetin şartı", line: "İşinizin KKTC dışına ya da Serbest Liman içine yönelik olup olmadığını değerlendiriyoruz." },
        { icon: "harita", kim: "KKTC içine satış", title: "Yerel satış", line: "KKTC içindeki yerel şirkete satışta normal vergi kuralları işliyor; hangi işlem nereye giriyor, ayırıyoruz." },
        { icon: "kisi", kim: "Türkiye'de yaşayan ortak", title: "Kâr payı ve Türkiye", line: "Kazancın Türkiye tarafındaki beyanını birlikte ele alıyoruz." },
      ],
    },
    kurallar: {
      baslik: "Bilmeniz gereken dört kural.",
      vurgu: "dört kural.",
      lead: "Şirket tarafında vergi çıkmaması, hiçbir yerde vergi çıkmayacağı anlamına gelmiyor.",
      items: [
        { icon: "yuzde", title: "KKTC dışı işte kurumlar vergisi yok", line: "KKTC dışındaki ve Serbest Liman içindeki şirketlere yapılan işte kurumlar ve gelir vergisi yok." },
        { icon: "terazi", title: "İç piyasaya satış muafiyet dışında", line: "KKTC içindeki yerel şirkete satışta gümrük, KDV ve kurumlar vergisi kuralları uygulanıyor." },
        { icon: "kisi", title: "Kâr payı Türkiye'de beyan ediliyor", line: "Kâr şirkette kaldıkça vergi doğmuyor; size geçtiğinde Türkiye'de beyan ediyorsunuz." },
        { icon: "harita", title: "Şirket Türkiye'den yönetilirse", line: "İşlerin fiilen Türkiye'de yönetildiği şirket Türkiye'de kurumlar vergisi mükellefi sayılabiliyor." },
      ],
    },
    adimlar: {
      baslik: "Nasıl ilerliyor?",
      vurgu: "ilerliyor?",
      lead: "Dört adım; ilki kuruluştan önce.",
      items: [
        { icon: "ara", title: "Faaliyetinize bakıyoruz", line: "Kime sattığınızı, malın ya da hizmetin nereye gittiğini dinliyoruz." },
        { icon: "kalkan", title: "Muafiyeti değerlendiriyoruz", line: "Hangi gelirinizin muafiyete girdiğini, hangisinin girmediğini yazıyla bildiriyoruz." },
        { icon: "dosya", title: "Kayıtları buna göre kuruyoruz", line: "Muafiyetin dayanağı düzgün tutulan kayıtlar; muhasebe ekibimizle birlikte yürüyor." },
        { icon: "takvim", title: "Yıl içinde takip ediyoruz", line: "Müşteri yapınız ya da gelir türünüz değişirse yeniden bakıyoruz." },
      ],
      cikis: { label: "KKTC muhasebe hizmetine bakın", href: "/kktc/muhasebe" },
    },
    sss: [
      { q: "Gerçekten hiç vergi ödemiyor muyum?", a: "KKTC dışındaki ve Serbest Liman içindeki şirketlere yaptığınız işte kurumlar ve gelir vergisi yok, şirket KDV mükellefi değil. KKTC içindeki yerel şirkete satışta normal vergi kuralları uygulanıyor. Yıllık faaliyet harcı ise vergi değil, sabit bir bedel." },
      { q: "Bu yasal mı?", a: "Muafiyet Serbest Liman ve Bölge Yasası'ndan geliyor, yasal. Şartı KKTC dışına yönelik gerçek faaliyet ve düzgün tutulan kayıtlar." },
      { q: "Kâr payı alırsam Türkiye'de vergi öder miyim?", a: "Türkiye'de yaşıyorsanız kâr payını yıllık beyannamenizle beyan ediyorsunuz. Şirketin en az yarısı sizinse ve parayı beyanname tarihine kadar Türkiye'ye getirirseniz kâr payının yarısı istisna. Kişiye özel vergi görüşü vermiyoruz." },
      { q: "Gelirim faiz, kira ya da lisans geliriyse?", a: "Gelirin ağırlığı bu tür pasif gelirse, dağıtılmayan kâr da ortağın geliri sayılabiliyor. Hizmet ve ticaret gelirinde bu kural işlemiyor; durumunuzu görüşmede konuşuyoruz." },
      { q: "Ücreti ne kadar?", a: "Kapsam şirketten şirkete değiştiği için sabit fiyat yazmıyoruz; görüşmeden sonra yazılı olarak bildiriyoruz." },
    ],
  },
};

/* KKTC'nin muhasebe ve banka sayfaları, İngiltere'nin muhasebe ve banka
   sayfaları kendi klasörlerinde (ortak gövdeler: services/MuhasebeSayfa,
   services/BankaSayfa). */

export function hizmetIcerik(c: Country, slug: string): HizmetIcerik | undefined {
  const s = slug as ServiceSlug;
  return c === "dubai" ? DUBAI[s] : c === "ingiltere" ? INGILTERE[s] : KKTC[s];
}
