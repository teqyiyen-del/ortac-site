import { FACTS, type CountrySlug } from "@/lib/brand";

/* ============================================================================
   HAKKIMIZDA — sayfanın bütün metni.
   Sayfa: src/app/hakkimizda/page.tsx · Biçim: src/app/css/hakkimizda.css

   ---------------------------------------------------------------- NEDEN AYRI
   Bu dosya teknik bir tercih değil, bir onay mekanizması. Hakkımızda sayfası
   sitedeki tek yer ki içindeki her cümle firma hakkında bir İDDİA: kim
   olduğumuz, neye yetkimiz olduğu, kiminle resmî ilişkimiz olduğu. Böyle bir
   metni JSX'in içine dağıtırsak, onaylaması gereken iki kişi (müşteri ve
   muhasebeci) sayfayı doğrulamak için React okumak zorunda kalır. Metin tek
   dosyada toplanınca onay tek dosyada bitiyor; sayfa yalnızca dizer.

   ------------------------------------------------------------ İDDİA SINIRI
   Sitenin kendi vaadi "yalnızca doğrulanabilir olanı yazıyoruz". Bu sayfada
   o vaat en sıkı biçimde uygulanıyor. Buraya yazılan her satırın ya firmanın
   kendi resmî beyanında ya da basında karşılığı var.

   BİLEREK YAZILMAYANLAR (elimizde doğrulanmış karşılığı yok, uydurulmadı):
   kuruluş yılı, çalışan sayısı, müşteri sayısı, lisans numarası, sertifika
   listesi, ofis adresi, telefon, e-posta. Bunların yeri aşağıda `SWAP:`
   işaretiyle duruyor ve BOŞ; boş kalan satır sayfada hiç basılmıyor. Değer
   girildiği anda ilgili satır kendiliğinden görünür oluyor — sayfaya
   dokunmak gerekmiyor.

   Ölçülemeyen sıfat da yok: "sektörün lideri", "en hızlı", "binlerce müşteri"
   gibi ifadeler bilerek kullanılmadı. Doğrulanamayan övgü, doğrulanabilir
   iddiaların da güvenilirliğini düşürüyor.

   ------------------------------------------------- BURADA OLMAYAN İÇERİKLER
   Ortaklar (PARTNERS), taahhüt sınırları (STANCE_LIMITS) ve hizmet zinciri
   (CHAIN) buraya KOPYALANMADI; sayfa onları doğrudan lib/brand.ts'ten
   okuyor. Sebebi tek: bunlar sitenin başka yerlerinde de basılıyor ve iki
   kopya tutmak, birini güncelleyip diğerini unutmanın garantisi. Aynı şekilde
   sektör adresleri lib/sectors.ts'teki sectorHref()'ten üretiliyor.
   ========================================================================= */

/* İkonlar burada bileşen değil, STRING. about.ts'i React'ten bağımsız tutmak
   istiyoruz: bu dosyayı onaylayacak kişi bir JSX importu görmek zorunda
   kalmasın. Eşleme sayfada (bkz. page.tsx · ICONS). lib/sectors.ts de aynı
   kalıbı kullanıyor. */
export type AboutIcon =
  | "stamp"
  | "handshake"
  | "office"
  | "history"
  | "team"
  | "language"
  | "panel";

/* --------------------------------------------------------------------- HERO
   h1 sayfada tek. PageHero `accent`i başlığın SONUNDAN kesiyor
   (title.endsWith(accent)), o yüzden vurgu son kelimelerde. */
export const HERO = {
  crumb: "Hakkımızda",
  /* Başlık firmanın kendi tanımından geliyor, pazarlama cümlesi değil. */
  title: "Vergi, muhasebe ve şirket kuruluşunda uluslararası danışmanlık",
  accent: "uluslararası danışmanlık",
  lead: "Ortac Global; KKTC, İngiltere ve Dubai'de çalışan bir danışmanlık firması. Bu sayfada firmayla ilgili yalnızca doğrulanabilir olanı yazıyoruz: kim olduğumuzu, nerede çalıştığımızı ve neye dayanarak çalıştığımızı.",
};

/* ------------------------------------------------------------------- KÜNYE
   "Hakkımızda" sayfalarının çoğu üç paragraf duyguyla açılıyor. Burada ilk
   gördüğünüz şey bir künye: doğrulanabilir alanlar, tek tek. Duygu değil kayıt.

   `value: ""` olan satırlar sayfada BASILMIYOR (page.tsx satırları filtreliyor).
   Boş bırakılmalarının sebebi teknik değil: bu bilgilerin webde doğrulanabilir
   bir karşılığı bulunamadı ve uydurulmadı. Değer geldiğinde satır açılıyor. */
export const IDENTITY = {
  heading: "Firmanın künyesi",
  accent: "künyesi",
  lead: "Kendi tanımıyla Ortac; vergi, muhasebe, denetim ve şirket kuruluşu alanlarında uzmanlaşmış uluslararası bir danışmanlık firması. Aşağıdaki satırlar firmanın resmî beyanı.",

  rows: [
    { label: "Ticari isim", value: "Ortac International Accounting · Ortac Global" },
    /* Dubai'deki tüzel kişilik ayrı bir satır çünkü sözleşmede, faturada ve
       banka yazışmasında karşınıza bu isim çıkıyor. Ticari isimle tüzel
       kişiliği aynı satıra sıkıştırmak, ikisinin aynı şey olduğu izlenimini
       verirdi. */
    { label: "Dubai tüzel kişiliği", value: "Ortac Accounting Services LLC" },
    { label: "Yönetici ortak", value: "Murat Ortaç — Managing Partner" },
    { label: "Yargı bölgeleri", value: "KKTC · İngiltere · Dubai" },
    { label: "Müşteri paneli", value: "TaxDome" },

    /* SWAP:FOUNDED — kuruluş yılı. Sitede "22 yıllık kurumsal geçmiş" ifadesi
       var (müşteri beyanı) ama bundan bir yıl TÜRETİLMEDİ: 22 sayısının hangi
       tarihte söylendiği belli değil ve yanlış bir yıl, doğru bir süreden çok
       daha büyük bir hata. */
    { label: "Kuruluş yılı", value: "" },
    /* SWAP:LICENCE_NO — muhasebe lisansının numarası ve veren otorite.
       Lisansın VARLIĞI doğrulanmış ve sayfada yazıyor; numarası yazılmıyor. */
    { label: "Lisans numarası", value: "" },
    /* SWAP:OFFICE_ADDRESS — Dubai ofisinin açık adresi. Ofisin varlığı
       doğrulanmış ve sayfada yazıyor; adresi yazılmıyor. */
    { label: "Ofis adresi", value: "" },
  ],

  /* Vizyon ve misyon <details> içinde KAPALI duruyor, açıkta değil. Sebebi
     müşterinin ana ilkesi: her bölüm özet versin, detay tıklamayla açılsın.
     Bu iki paragraf firmanın kendi resmî ifadesi — silinemez, ama sayfanın
     ilk ekranını dolduracak kadar da bilgi taşımıyor. İsteyen açıyor. */
  statementLabel: "Vizyon ve misyon — firmanın kendi ifadesi",
  vision: {
    t: "Vizyon",
    s: "Müşterilerin bütün finansal ihtiyaç ve beklentilerini analiz ederek etkili hizmet sunmak.",
  },
  mission: {
    t: "Misyon",
    s: "Kapsamlı ve yenilikçi çözümlerle müşterilerin iş hedeflerine ulaşmasını desteklemek; müşteri memnuniyeti, güvenilirlik ve profesyonellik ilkeleriyle uluslararası standartlarda hizmet vermek.",
  },
};

/* ----------------------------------------------------------- ÜÇ YARGI BÖLGESİ
   Bölümün işi coğrafya dersi vermek değil, şunu söylemek: üç ülkede de aynı
   zinciri yürütüyoruz, değişen tek şey o ülkenin kuralları.

   `line` yalnızca ORTAC'ın o ülkedeki durumunu anlatıyor. Ülkenin kendi
   künyesi (yapı, süre, fiyat) buraya kopyalanmadı; onun tek kaynağı
   lib/brand.ts · FACTS ve sayfa `structure` alanını oradan okuyor. Bir fiyat
   değiştiğinde bu dosyaya dokunmak gerekmiyor. */
export const WHERE = {
  heading: "Üç yargı bölgesinde çalışıyoruz",
  accent: "Üç yargı bölgesinde",
  lead: "KKTC, İngiltere ve Dubai. Üçünde de yürüttüğümüz zincir aynı: kuruluş, banka dosyası, muhasebe ve uyum. Değişen, o ülkenin kuralları.",

  /* Sıra batıdan doğuya — sahnedeki üç işaretin dizilişiyle aynı, böylece
     listeyi okurken göz görselde de aynı yönde ilerliyor. */
  countries: [
    {
      slug: "ingiltere" as CountrySlug,
      line: "Companies House tescili ve sonrasında gelen beyan düzeni. Kuruluş uzaktan tamamlanabiliyor.",
      href: "/ingiltere",
    },
    {
      slug: "kktc" as CountrySlug,
      line: "Yerel tescil ve Türkiye'ye yakın operasyon. Firmanın en eski çalıştığı yargı bölgesi.",
      href: "/kktc",
    },
    {
      slug: "dubai" as CountrySlug,
      /* Tek "hub" burası ve sebebi doğrulanabilir: kendi ofisimizin olduğu ve
         serbest bölgeyle resmî iş ortaklığımızın bulunduğu tek yer. */
      line: "Kendi ofisimizin olduğu yer. Serbest bölge başvurusu, otorite ve banka trafiği buradan yürüyor.",
      href: "/dubai",
      hub: true,
    },
  ],

  /* Sahnenin altındaki tek satır. Küre bir harita değil; bunu yazmazsak
     görselin taşımadığı bir coğrafi hassasiyet iddia etmiş oluyoruz. */
  sceneNote: "Şema temsilîdir; işaretler gerçek koordinat değil, çalıştığımız üç yargı bölgesidir.",
};

/* ------------------------------------------------------------------- ALINTI
   Murat Ortaç'ın basına verdiği cümle, alıntı olarak. Üç alıntının üçü de
   Dubai üzerine; sayfada YALNIZCA BİRİ kullanılıyor. Üçünü birden basmak
   üç ülkeyi eşit anlatan bir sayfayı Dubai broşürüne çevirirdi.

   Seçilen cümle bilerek en betimleyici olanı. Diğer ikisi ("küresel ölçekte
   rekabet gücü", "serbest bölgeler girişimciliği teşvik ediyor") bir SONUÇ
   imâ ediyor; bu sayfa sonuç vaat etmiyor.

   SWAP:QUOTE_SOURCE — alıntının yayın adı ve tarihi. Cümlenin kendisi
   doğrulanmış, hangi yayında ve ne zaman söylendiği elimizde yok. Boş
   kaldığı sürece sayfa yalnızca "Murat Ortaç · Managing Partner" basıyor;
   değer girildiğinde künye satırı kendiliğinden uzuyor. */
export const QUOTE = {
  text: "Dünya ticaret yollarının kesişim noktasında yer alan Dubai, özellikle Asya, Avrupa ve Afrika arasındaki ticaret akışını yönetiyor.",
  who: "Murat Ortaç",
  role: "Managing Partner",
  source: "",
};

/* ------------------------------------------------------------ NEYE DAYANARAK
   Sayfanın omurgası. Dört kartın dördü de dışarıdan doğrulanabilir bir olguya
   dayanıyor; hiçbiri sıfat değil.

   Kartlarda BİLEREK olmayanlar: "uzman kadro" (uzmanlık ölçülemez), "yılların
   tecrübesi" (aynı şeyi 22 zaten söylüyor), müşteri sayısı ve başarı oranı
   (elimizde doğrulanmış rakam yok). */
export const BASIS = {
  heading: "Neye dayanarak çalışıyoruz",
  accent: "dayanarak",
  lead: "Bu bölümde tek bir ölçülemeyen sıfat yok. Dördü de dışarıdan sorulabilir, doğrulanabilir şeyler.",

  cards: [
    {
      icon: "stamp" as AboutIcon,
      t: "Kendi muhasebe lisansımız",
      /* Somut kanıt: imzanın hangi sıfatla atıldığı. "Lisanslıyız" demek
         yerine lisansın nerede görünür olduğunu söylüyoruz. */
      s: "Yönetici ortağımız Murat Ortaç, hizmet belgelerini Certified Accountant sıfatıyla imzalıyor. Defter ve beyan taşerona gitmiyor.",
    },
    {
      icon: "handshake" as AboutIcon,
      t: "IFZA resmî iş ortağıyız",
      s: "Dubai serbest bölge başvurusu bir aracı üzerinden değil, doğrudan yürüyor.",
    },
    {
      icon: "office" as AboutIcon,
      t: "Dubai'de kendi ofisimiz",
      s: "Evrak, otorite ve banka trafiği uzaktan bir aracıya devredilmiyor.",
    },
    {
      icon: "history" as AboutIcon,
      /* Sitenin başka yerinde (TrustLayer) geçen ifadenin birebir aynısı.
         Aynı iddianın iki sayfada iki farklı sayıyla çıkmaması için cümle
         yeniden yazılmadı, olduğu gibi alındı. */
      t: "22 yıllık kurumsal geçmiş",
      s: "Kuruluş, lisans yenileme, muhasebe, beyan ve banka dosyası — hepsi aynı çatı altında yürüyor.",
    },
  ],

  /* Ortak listesi buraya kopyalanmıyor; sayfa brand.ts · PARTNERS'ı okuyor.
     Buradaki iki satır yalnızca o iki grubun NE ANLAMA geldiğini söylüyor —
     "resmî iş ortağı" ile "kullandığımız yazılım" arasındaki fark, aynı
     şeritte akarlarsa kaybolur. */
  partners: {
    t: "Resmî iş ortaklıkları",
    s: "Başvuru ve hesap sürecinde adımızın karşı tarafta kayıtlı olduğu kurumlar.",
  },
  infra: {
    t: "Kullandığımız altyapı",
    s: "İşi yürütürken kullandığımız araçlar. Resmî ortaklık değil, çalışma düzeni.",
  },
};

/* --------------------------------------------------------- NASIL ÇALIŞIYORUZ
   Zincir (CHAIN) brand.ts'ten geliyor. Buradaki üç ilke onu tamamlıyor:
   zincir NE yapıldığını, ilkeler KİMİN yaptığını söylüyor. */
export const HOW = {
  heading: "Kuruluş bitiş değil, zincirin ilk halkası",
  accent: "zincirin ilk halkası",
  lead: "Şirketin kurulduğu gün ile ikinci yılı arasındaki her adım aynı ekipte kalıyor. Zincirin bir halkasını devretmiyoruz.",

  principles: [
    {
      icon: "team" as AboutIcon,
      t: "Taşeron değil, kendi kadromuz",
      s: "Defter, beyan ve banka dosyası başka bir firmaya devredilmiyor.",
    },
    {
      icon: "language" as AboutIcon,
      t: "Türkçe tek muhatap",
      s: "İsimli bir danışman. Kuruluş bittiğinde muhatap değişmiyor.",
    },
    {
      icon: "panel" as AboutIcon,
      t: "TaxDome paneli",
      s: "Evrak, talep ve beyan takibi tek panelden yürüyor; e-posta zincirinde kaybolmuyor.",
    },
  ],

  /* Bu blok firmanın resmî duruşu ve sayfada AÇIKTA duruyor — <details>
     içine konmadı. "Özet önde, detay tıklamayla" ilkesi sırayı düzenlemek
     için var, şerhi gizlemek için değil. Taahhüt etmediğimiz şeyi bir
     tıklamanın arkasına saklamak, tam olarak bu üç maddenin engellemeye
     çalıştığı davranış olurdu. */
  limits: {
    t: "Neyi taahhüt etmiyoruz",
    s: "Aşağıdakiler pazarlama tercihi değil, firma politikası. Üçü de sitenin her yerinde aynı.",
  },
};

/* ---------------------------------------------------------------- SEKTÖRLER
   Altı sektör firmanın kendi saydığı listeyle örtüşüyor. Adresler
   lib/sectors.ts · sectorHref() ile üretiliyor; şu an yalnızca biri yayında,
   kalan beşi SmartLink tarafından sönük basılıyor. Bu KASITLI: yol haritası
   görünüyor, ölü tıklama olmuyor.

   Cümleler ana sayfadaki sektör kartlarının kısaltılmışı değil, farklı bir
   iş yapıyor: orada "bu sektörde ne satılır" yazıyor, burada "bu sektörde
   kurgunun düğümü nerede". Aynı sayfayı iki kez okumuş hissi vermesin diye. */
export const FOR_WHOM = {
  heading: "Hangi sektörlerde çalışıyoruz",
  accent: "Hangi sektörlerde",
  lead: "Altı başlık. Kurgunun düğümü her birinde başka yerde — o yüzden liste değil, ayrı ayrı sayfalar.",

  sectors: [
    { slug: "e-ticaret", label: "E-ticaret", line: "Düğüm tahsilatta: kartla ödeme ve pazar yeri hesapları." },
    { slug: "yazilim-ve-teknoloji", label: "Yazılım ve teknoloji", line: "Düğüm abonelikte: yinelenen tahsilat ve uygulama içi satış." },
    { slug: "danismanlik", label: "Danışmanlık", line: "Düğüm sözleşmede: yurt dışı müşteriye şirket adına fatura." },
    { slug: "gayrimenkul", label: "Gayrimenkul", line: "Düğüm mülkiyette: mülk şirket altında, kira şirket hesabında." },
    { slug: "finans-ve-yatirim", label: "Finans ve yatırım", line: "Düğüm izinde: faaliyet lisansa tabi, kapsam önden netleşiyor." },
    { slug: "saglik-ve-medikal", label: "Sağlık ve medikal", line: "Düğüm ruhsatta: şartlar şirket kurgusunu belirliyor." },
  ],
};

/* ------------------------------------------------------------------- TEMAS
   Sayfanın çıkışı. Kanalların tamamı şu an boş ve bu bir eksiklik değil,
   bilinçli bir karar: doğrulanmış bir telefon, e-posta veya adres elimizde
   yok, uydurulmuş bir iletişim bilgisi ise en zararlı uydurma türü — arayan
   kişi karşılık bulamıyor.

   Boş kanal sayfada basılmıyor; hepsi boşken bölümde yalnızca AskCta kalıyor
   ve o zaten sitenin tek gerçek soru kanalı (/basla formu). Değer girildiği
   anda kanallar kendiliğinden görünür oluyor.

   SWAP:CONTACT_PHONE · SWAP:CONTACT_EMAIL · SWAP:CONTACT_ADDRESS */
export type ContactKind = "phone" | "mail" | "address";
export const CONTACT = {
  heading: "Kendi durumunuzu anlatın",
  accent: "durumunuzu anlatın",
  lead: "Buradaki başlıklar genel çerçeve. Faaliyetinizi, tahsilat kanalınızı ve hedef pazarınızı anlatın; hangi ülkenin ve hangi kurgunun işinize yaradığını birlikte netleştirelim.",
  ctaLabel: "Durumumu sorayım",

  channels: [
    { kind: "phone" as ContactKind, label: "Telefon", value: "", href: "" },
    { kind: "mail" as ContactKind, label: "E-posta", value: "", href: "" },
    { kind: "address" as ContactKind, label: "Ofis", value: "", href: "" },
  ],
};

/* --------------------------------------------------------------------- SEO */
export const SEO = {
  title: "Hakkımızda — Ortac Global | Dubai, İngiltere ve KKTC",
  description:
    "Ortac Global; vergi, muhasebe, denetim ve şirket kuruluşu alanlarında çalışan uluslararası bir danışmanlık firması. KKTC, İngiltere ve Dubai'de faaliyet gösteriyor.",
};

/* Ülkenin yapısal künyesi tek kaynaktan: FACTS. Sayfa bu yardımcıyı çağırıyor
   ki brand.ts'teki bir düzeltme buraya da yansısın. */
export const structureOf = (c: CountrySlug) => FACTS[c].structure;
