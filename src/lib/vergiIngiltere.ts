/* ============================================================================
   İNGİLTERE · VERGİ DANIŞMANLIĞI — sayfanın bütün metni
   Sayfa: app/ingiltere/vergi/page.tsx · Gövde: components/services/VergiSayfa.tsx
   Biçim ve tip: lib/vergiDubai.ts (VergiVeri) · css/svc-vergi.css (.svr-)

   09.10.2026 · İLK YAZIM (gerekçe vergiDubai.ts başında). Eski sayfa genel
   şablondaydı (hizmetIcerik.ts · INGILTERE · vergi).

   ------------------------------------------------------------ KAYNAK DÜZENİ
     [RESMÎ]   docs/ingiltere-mevzuat.md (23.09.2026, gov.uk · HMRC ·
               Companies House): oranlar (4), KDV eşiği (4), kayıt ve beyan
               süreleri (4), gecikme cezaları (4), bordro (4), kâr payı ve
               Türkiye (5).
     [ONAYLI]  sitede yayında: countryContent.ts · ingiltere · tax, paraYolu,
               takvim, faq; hizmetIcerik.ts · INGILTERE · vergi.

   BİLEREK YUMUŞATILANLAR
     · Kâr payının Türkiye'deki yarı istisnası: kanun maddesi var (GVK 22/4)
       ama Murat Bey "mali müşavire sorulmalı" dedi (docs/teslim/bilgi-ve-
       murat.md · 10). Cümleler "şartlar sağlanırsa" ile sınırlı; oran yok.
     · Firmanın İngiltere'de KDV ve bordro işini üstlenip üstlenmediği açık
       soru (aynı belge · i-ek). Kapsam "değerlendiriyoruz, planlıyoruz"
       düzeyinde; "KDV beyanınızı biz veriyoruz" denmiyor.
     · KDV beyan tarihleri notta yok; takvime ve halkaya KDV konmadı.
   ========================================================================= */

import type { VergiVeri } from "@/lib/vergiDubai";

export const VERGI_INGILTERE: VergiVeri = {
  ulke: "İngiltere",
  yol: "/ingiltere/vergi",
  seo: {
    title: "İngiltere'de Vergi Danışmanlığı: Kurumlar Vergisi ve KDV | Ortac Global",
    description:
      "İngiltere Ltd şirketinizde kurumlar vergisi, KDV ve kâr payı: oranlar, beyan takvimi, cezalar ve Türkiye tarafı. Kurumlar vergisi %19 ile %25 arası, KDV eşiği £90.000.",
  },

  hero: {
    crumb: "İngiltere · Vergi Danışmanlığı",
    title: "İngiltere'de vergi danışmanlığı.",
    accent: "vergi danışmanlığı.",
    /* [ONAYLI] ilk cümle hizmetIcerik · kurallar · lead. */
    lead: "İngiltere vergi için değil, ödeme altyapısı ve tanınırlık için seçiliyor. Kurumlar vergisi, KDV ve kâr payı tarafında size işleyen kuralları netleştiriyor, beyan takvimini birlikte kuruyoruz.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
    trust: [
      { icon: "takvim", line: "Beyan takvimi tek dosyada takip ediliyor." },
      { icon: "defter", line: "1996'dan beri muhasebe ve vergi." },
    ],
  },

  /* [RESMÎ] 4. Eğri ülke sayfasında yayında olan bileşen (VergiGrafik);
     başlığı countryContent · ingiltere · tax · bant ile aynı. */
  cerceve: {
    id: "cerceve",
    heading: "İngiltere'de vergi çerçevesi.",
    accent: "vergi çerçevesi.",
    lead: "Kurumlar vergisi kâra göre değişiyor: küçük kârda %19, yüksek kârda %25, arası kademeli.",
    gorsel: { tur: "egri", baslik: "Kurumlar vergisi kâra göre değişiyor" },
    kartlar: [
      { deger: "%19", etiket: "£50.000'e kadar kâr", line: "Küçük kâr oranı.", ton: "yesil" },
      { deger: "%25", etiket: "£250.000'in üstü", line: "Ana oran; arada kademeli geçiş var.", ton: "amber" },
      { deger: "£90.000", etiket: "KDV eşiği", line: "Yıllık ciro aşarsa kayıt zorunlu; altında isteğe bağlı.", ton: "mavi" },
      { deger: "1988", etiket: "Türkiye ile anlaşma", line: "Çifte vergilendirmeyi önleme anlaşması yürürlükte.", ton: "mavi" },
    ],
  },

  /* [ONAYLI] hizmetIcerik kartları ve adımları; bordro [RESMÎ] 4. */
  kapsam: {
    id: "kapsam",
    heading: "Bu hizmette ne yapıyoruz?",
    accent: "ne yapıyoruz?",
    lead: "Hangi kuralın size işlediğini netleştiriyoruz. Kayıt ve beyan muhasebe ekibimizle birlikte yürüyor.",
    items: [
      { icon: "yuzde", title: "Kurumlar vergisi çerçevesi", line: "Kârınıza göre hangi oranın işlediğini ve beyan takvimini çıkarıyoruz." },
      { icon: "fatura", title: "KDV durumu", line: "Kayıt zorunlu mu, gönüllü kayıt size uyar mı; birlikte değerlendiriyoruz." },
      { icon: "dosya", title: "Kayıtların planlanması", line: "Vergi kaydı ve gerekiyorsa KDV kaydı muhasebe ekibimizle kuruluyor." },
      { icon: "kisi", title: "Kâr payı ve Türkiye", line: "Şirketin ve sizin vergi tarafınızı birlikte ele alıyoruz." },
      { icon: "para", title: "Maaş mı, kâr payı mı", line: "İki yolun İngiltere'deki karşılığını, bordro kaydıyla birlikte anlatıyoruz." },
      { icon: "pusula", title: "Yıl içi takip", line: "Ciro eşiğe yaklaşır ya da yapı değişirse durumunuza yeniden bakıyoruz." },
    ],
    haric: {
      baslik: "Bu hizmetin dışında kalanlar",
      items: [
        "Aylık muhasebe kaydı (muhasebe hizmetinde)",
        "Bağımsız denetim raporu",
        "Türkiye'deki kişisel beyannameniz",
        "Vergi sonucu için garanti",
      ],
    },
  },

  /* [RESMÎ] 4 · [ONAYLI] countryContent · ingiltere · takvim (cümleler
     oradan). Halka mali yılı 31 Aralık'ta biten şirket: hesaplar 30 Eylül,
     ödeme 1 Ekim, beyanname 31 Aralık. */
  takvim: {
    id: "takvim",
    heading: "Yıl içinde vergi takvimi.",
    accent: "vergi takvimi.",
    lead: "İngiltere'de takvim sıkı ve cezalar otomatik. Aşağıdaki halka, yılı aralıkta kapanan bir şirketin örneği.",
    ornek: { ust: "Mali yıl", alt: "Ocak - Aralık" },
    isaretler: [
      { ad: "Yıllık hesaplar", ton: "ana", aylar: [9] },
      { ad: "Kurumlar vergisi ödemesi", ton: "yesil", aylar: [10] },
      { ad: "Vergi beyannamesi", ton: "ara", aylar: [12] },
    ],
    kalemler: [
      { sure: "3 ay", ne: "Kurumlar vergisi kaydı", kural: "Şirket faaliyete başladıktan sonra üç ay içinde yapılıyor." },
      { sure: "9 ay", ne: "Yıllık hesaplar", kural: "Mali yıl sonundan itibaren; ilk hesaplar kuruluştan 21 ay içinde.", ceza: "£150'den £1.500'e" },
      { sure: "9 ay 1 gün", ne: "Vergi ödemesi", kural: "Dönem sonundan itibaren; beyannameden önce ödeniyor." },
      { sure: "12 ay", ne: "Vergi beyannamesi", kural: "Kurumlar vergisi beyannamesi, dönem sonundan itibaren.", ceza: "1 günde £200, 3 ayda +£200" },
    ],
  },

  /* [ONAYLI] countryContent · ingiltere · paraYolu (iki katman anlatımı ve
     gerekçesi orada). İstisna oranı yazılmadı (yukarıda · yumuşatılanlar). */
  turkiye: {
    id: "turkiye",
    heading: "Türkiye'de yaşıyorsanız vergi nerede çıkıyor?",
    accent: "vergi nerede çıkıyor?",
    lead: "Kâr önce İngiltere'de vergileniyor. Türkiye'de vergi, kâr payı olarak size geçtiğinde çıkıyor.",
    duraklar: [
      { ikon: "sirket", kim: "Şirketiniz", yer: "İngiltere'de", vergi: "%19-25", line: "Kâr önce burada vergileniyor. Kâr £50.000'e kadarsa %19.", ton: "vergi" },
      { ikon: "kasa", kim: "Kâr şirkette kalırsa", yer: "Türkiye'de", vergi: "Ek vergi yok", line: "Dağıtılmayan kâr Türkiye'de vergilenmiyor.", ton: "sifir" },
      { ikon: "kisi", kim: "Kâr payı alırsanız", yer: "Türkiye'de", vergi: "Beyan", line: "Yıllık beyannamede; şartlar sağlanırsa bir kısmı istisna.", ton: "beyan" },
    ],
    ayrim: 1,
    ayrintilar: [
      { baslik: "Şirket Türkiye'den yönetilirse", line: "İşlerin fiilen Türkiye'de yönetildiği bir şirket Türkiye'de de mükellef sayılabiliyor; çatışmada iki ülke karşılıklı anlaşmayla karar veriyor." },
      { baslik: "Maaş da bir seçenek", line: "Direktör olarak kendinize maaş ödeyecekseniz İngiltere'de bordro kaydı gerekiyor." },
      { baslik: "Kişiye özel görüş", line: "Kişiye özel vergi görüşü vermiyoruz; durumunuzu görüşmede konuşuyoruz." },
    ],
  },

  /* [RESMÎ] 4 (cezalar, bordro), 5 (iş merkezi). Merdiven: geç verilen
     yıllık hesaplarda Companies House cezası, dört basamak. */
  hatalar: {
    id: "hatalar",
    heading: "Sık yapılan hatalar ve cezaları.",
    accent: "hatalar ve cezaları.",
    lead: "İngiltere'de ceza kendiliğinden kesiliyor; gecikme uzadıkça tutar büyüyor.",
    items: [
      { icon: "yuzde", title: "Vergi avantajı beklemek", line: "Kâr %19 ile %25 arasında vergileniyor; İngiltere vergi için seçilmiyor." },
      { icon: "takvim", title: "Beyannameyi geciktirmek", line: "Bir gün gecikmede ceza kesiliyor; üç ayı geçerse bir kez daha.", ceza: "£200'den" },
      { icon: "dosya", title: "Hesapları geç vermek", line: "İki yıl üst üste gecikirse ceza iki katına çıkıyor.", ceza: "£150 - £1.500" },
      { icon: "fatura", title: "KDV eşiğini izlememek", line: "Yıllık ciro £90.000'i aşınca kayıt zorunlu oluyor." },
      { icon: "harita", title: "Şirketi Türkiye'den yönetmek", line: "Fiilen Türkiye'de yönetilen şirket Türkiye'de de mükellef sayılabiliyor." },
      { icon: "para", title: "Maaş ödeyip bordro kaydı yapmamak", line: "Tek direktör yalnız kendine maaş ödese de bordro kaydı gerekiyor." },
    ],
    merdiven: {
      baslik: "Geciken hesapta ceza büyüyor",
      alt: "Yıllık hesaplar, gecikme süresine göre ceza.",
      birim: "£",
      onde: true,
      basamaklar: [
        { sure: "1 aya kadar", tutar: 150 },
        { sure: "1-3 ay", tutar: 375 },
        { sure: "3-6 ay", tutar: 750 },
        { sure: "6 ay üstü", tutar: 1500 },
      ],
    },
  },

  /* [ONAYLI] hizmetIcerik.ts · INGILTERE · vergi · adimlar. */
  adimlar: {
    id: "surec",
    heading: "Adım adım nasıl çalışıyoruz?",
    accent: "nasıl çalışıyoruz?",
    lead: "Dört adım; ilki bir görüşme.",
    items: [
      { icon: "ara", title: "Faaliyetinize bakıyoruz", line: "Ne sattığınızı ve şirketi nereden yönettiğinizi dinliyoruz." },
      { icon: "terazi", title: "Çerçeveyi netleştiriyoruz", line: "Size işleyen kuralları yazıyla bildiriyoruz." },
      { icon: "dosya", title: "Kayıtları planlıyoruz", line: "Vergi kaydı ve gerekiyorsa KDV kaydı planlanıyor." },
      { icon: "pusula", title: "Yıl içinde takip ediyoruz", line: "Ciro eşiğe yaklaşırsa durumunuza yeniden bakıyoruz." },
    ],
  },

  ilgili: {
    id: "ilgili",
    heading: "Vergiyle birlikte yürüyen hizmetler.",
    accent: "birlikte yürüyen hizmetler.",
    items: [
      { icon: "defter", title: "Muhasebe", line: "Yıllık hesaplar ve beyannamenin dayanağı olan kayıtlar.", href: "/ingiltere/muhasebe" },
      { icon: "banka", title: "Banka ve ödeme", line: "İşletme hesabı ve tahsilat kanalları.", href: "/ingiltere/banka-hesabi" },
      { icon: "kurulus", title: "Şirket kuruluşu", line: "Kimlik doğrulama, tescil ve vergi numarası.", href: "/ingiltere" },
    ],
  },

  /* İlk beş soru [ONAYLI] (hizmetIcerik · sss, istisna cümlesi yumuşatıldı);
     son ikisi [ONAYLI] countryContent · ingiltere · faq ve [RESMÎ] 4. */
  faq: {
    id: "sss",
    heading: "Sık sorulan sorular.",
    accent: "sorulan sorular.",
    items: [
      { q: "İngiltere'de şirket kurarsam daha az vergi öder miyim?", a: "Bu beklentiyle kurulması doğru olmaz. Şirketin kârı İngiltere'de %19 ile %25 arasında kurumlar vergisine tabi. İngiltere ödeme altyapısı ve tanınırlık için seçiliyor." },
      { q: "Şirketi Türkiye'den yönetirsem ne olur?", a: "İşlerin fiilen Türkiye'de yönetildiği bir şirket Türkiye'de de mükellef sayılabiliyor; iki ülke çatışmada karşılıklı anlaşmayla karar veriyor. Durumunuzu görüşmede konuşuyoruz." },
      { q: "Kâr payı alırsam Türkiye'de vergi öder miyim?", a: "Türkiye'de yaşıyorsanız kâr payını yıllık beyannamenizle beyan ediyorsunuz; şartlar sağlanırsa bir kısmı istisna. Kişiye özel vergi görüşü vermiyoruz." },
      { q: "Maaş mı, kâr payı mı?", a: "İkisi de mümkün. Maaş için İngiltere'de bordro kaydı gerekiyor. Hangisinin size uyduğu Türkiye'deki durumunuza bağlı." },
      { q: "KDV kaydı yaptırmalı mıyım?", a: "Yıllık ciro £90.000'i aşarsa zorunlu; altında isteğe bağlı. Müşteri profiliniz gerektiriyorsa gönüllü kaydı birlikte değerlendiriyoruz." },
      { q: "Beyannameyi geç verirsem ne olur?", a: "Ceza kendiliğinden kesiliyor: bir gün gecikmede £200, üç ayı geçerse £200 daha. Üç kez üst üste gecikirse tutar £1.000'e çıkıyor." },
      { q: "Şirket kâr etmediyse yine de beyanname veriyor muyum?", a: "Evet. Faaliyeti olan şirket yıllık hesaplarını ve kurumlar vergisi beyannamesini kâr olmasa da veriyor; süreleri aynı." },
      { q: "Ücreti ne kadar?", a: "Kapsam şirketten şirkete değiştiği için sabit fiyat yazmıyoruz; görüşmeden sonra yazılı olarak bildiriyoruz." },
    ],
  },

  closing: {
    title: "Vergi tarafını birlikte netleştirelim.",
    accent: "birlikte netleştirelim.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
  },
};
