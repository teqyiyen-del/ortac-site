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

   İngiltere ve KKTC için içerik YOK (kaynak belge yok); o sayfalar kapalı. */

export type HizmetIkon =
  | "yuzde" | "kalkan" | "kisi" | "harita" | "katman" | "ortak" | "takvim" | "masa"
  | "devir" | "kapat" | "dosya" | "parmak" | "bayrak" | "banka" | "saat" | "tik" | "ara" | "terazi";

export type HizmetIcerik = {
  kartlar: { baslik: string; vurgu: string; lead: string; items: { icon: HizmetIkon; kim: string; title: string; line: string }[] };
  kurallar: { baslik: string; vurgu: string; lead: string; items: { icon: HizmetIkon; title: string; line: string }[] };
  adimlar: { baslik: string; vurgu: string; lead: string; items: { icon: HizmetIkon; title: string; line: string }[]; cikis?: { label: string; href: string } };
  sss: { q: string; a: string }[];
};

const DUBAI: Partial<Record<ServiceSlug, HizmetIcerik>> = {
  /* ------------------------------------------------------------- VERGİ
     Belge: "Corporate Tax ve %0 Vergi Avantajı", "Standart UAE Corporate Tax
     Sistemi", "Kişisel Gelir Vergisi Avantajı", madde 8 ve 9.7. */
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
      baslik: "Bilmeniz gereken dört şey.",
      vurgu: "dört şey.",
      lead: "Uyum bir kez yapılıp biten bir iş değil.",
      items: [
        { icon: "banka", title: "Banka da soruyor", line: "Hesap açarken banka ortaklık yapınıza, gerçek faaliyetinize ve paranın kaynağına bakıyor." },
        { icon: "saat", title: "Şirket boşta kalsa da sürüyor", line: "Faaliyet göstermemek ya da banka hesabının olmaması yükümlülükleri kaldırmıyor." },
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

export function hizmetIcerik(c: Country, slug: string): HizmetIcerik | undefined {
  return c === "dubai" ? DUBAI[slug as ServiceSlug] : undefined;
}
