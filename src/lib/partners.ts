/* ============================================================================
   İŞ ORTAKLIĞI — /is-ortakligi sayfasının bütün metni burada.
   Sayfa: app/is-ortakligi/page.tsx · Biçim: css/is-ortakligi.css (.iob-)

   09.10.2026 · SAYFA BUGÜNKÜ DİLLE YENİDEN YAZILDI. Eski hâl eski dilde
   kalmıştı: yazı yığını, rakam yerine tire basan boş "Ticari şartlar"
   tablosu, tam siyah bölüm, hiç görsel yok. Örnek alınan iki sayfa
   kurumsal danışmanlık ve AML (KurumsalSayfa.tsx · AmlSayfa.tsx): az yazı,
   her bölümde gerçek içerikli çizim, beyaz ve kırık beyaz zemin sırayla,
   arada büyük gece KART.

   MÜŞTERİNİN TARİFİ (Murat Bey): "İş ortaklığı sayfasını kullanacağız. Doğru
   kurgulayıp yaparsak yurt dışındaki danışmanlık firmalarına B2B partner
   portalı vermeliyiz; adam başvurusunu verdiğinde oradan süreci takip
   edebilmeli ve müşterisiyle ilgili bizim belirleyeceğimiz yetkilerde her
   adımı, her işlemi görmeli."
   Sayfanın ana fikri buradan: müşterinizi yönlendirin, kuruluşu ve sonrasını
   biz yürütelim, siz her adımı izleyin. Okur müşteri değil, müşteriyi
   yönlendiren danışmanlık firması, mali müşavir, hukuk bürosu ya da ajans
   (Türkiye'de ve yurt dışında).

   ---------------------------------------------------------------- İDDİA SINIRI

   1) ORTAK PANELİ HENÜZ YOK. Sayfa onu var gibi anlatmıyor: "hazırlanıyor"
      diyor ve bugün olanı ayrı söylüyor (adımlar başvuruyla birlikte ortakla
      paylaşılıyor; müşterinin kendi paneli var). Panelin marka adı hiçbir
      yerde geçmiyor (docs/tuzaklar.md · kural 7), adı "müşteri paneli".

   2) TİCARİ ŞART YOK. Komisyon oranı, ödeme koşulu, asgari adet
      kararlaştırılmadı. Eski sayfa dört satırlık boş bir tablo basıyordu;
      tablo kalktı, yerine tek cümle geldi: "Şartları ilk görüşmede birlikte
      belirliyoruz." (adımlarda ve SSS'te).

   3) İKİ MODEL (referans · white-label) ÇIKARILDI. Eski sayfa bunu "yapısal
      bilgi" diye yazıyordu ama müşterinin tarifinde white-label yok; teyit
      edilmemiş bir çalışma biçimini satış sayfasında tutmak yerine soru
      olarak Murat Bey'e bırakıldı (rapor: docs/durum.md'ye geçecek).

   4) FİRMA OLGULARI yalnız teyitli listeden: 1996'dan beri (30 yıl); üç
      ülkede kendi ofis (Dubai, Londra, Lefkoşa); IFZA, Meydan ve DWTC iş
      ortağı; 700'den fazla şirket kuruluşu; 300 civarı aktif muhasebe
      müşterisi; muhasebe Dubai ve KKTC'de kendi ekibiyle, İngiltere'de
      anlaşmalı ofisle; banka hesabı açılışı garanti edilmez; kişiye özel
      vergi görüşü siteden verilmez. Banka ve ödeme kuruluşu ADI yazılmadı
      (eski metindeki dört ad da çıktı). Ortak sayısı, "en hızlı", "lider"
      gibi hiçbir şey yok.

   Metin kuralları: açıklama en çok iki satır, uzun tire yok, "bölge" değil
   "ülke" ("serbest bölge" terim), sayfaya dipnot düşülmüyor.
   ========================================================================= */

/* İkon adı string taşınıyor, bileşen değil: bu dosya saf veri. Eşleme
   sayfada (kurumsalDubai.ts · KurumsalIkon ile aynı kalıp). */
export type PartnerIcon =
  | "yonlendir"
  | "yurut"
  | "izle"
  | "paylas"
  | "panel"
  | "ortakPanel"
  | "danisman"
  | "musavir"
  | "hukuk"
  | "ajans";

type Bas = { id: string; heading: string; accent: string; lead: string };

/* -------------------------------------------------------------------- SEO
   Başlık 60, açıklama 155 karakterin altında (09.10.2026'da sayıldı: 50 · 155). */
export const PARTNER_SEO = {
  title: "İş Ortaklığı: Danışmanlık Firmaları | Ortac Global",
  description:
    "Müşterinizi Dubai, İngiltere veya KKTC'ye yönlendirin; şirket kuruluşunu ve sonrasını Ortac Global yürütsün, siz her adımı izleyin. İş ortaklığı başvurusu.",
  path: "/is-ortakligi",
};

/* ------------------------------------------------------------------- giriş
   Foto giriş (shared/FotoGiris; hizmet sayfalarıyla aynı). Başlık önceki
   turdan: konu başlıkta CÜMLE İÇİNDE geçsin ("İş ortağımız olun"), cümlenin
   iyi yarısı ("süreci biz yürütelim") mavi. `accent` başlığın SONU. */
export const PARTNER_HERO = {
  crumb: "İş ortaklığı",
  title: "İş ortağımız olun, süreci biz yürütelim.",
  accent: "süreci biz yürütelim.",
  lead: "Müşterinizi Dubai, İngiltere ya da KKTC'ye yönlendirin. Kuruluşu ve sonrasını biz yürütelim, siz her adımı izleyin.",
  cta: { label: "Başvuru yapın", href: "#basvuru" },
  ikinci: { label: "Nasıl çalışır", href: "#nasil" },
  /* fotoğrafın dibindeki belge kartı: işin sonunda ortağın önünde duran şey */
  belge: { ad: "Müşteri dosyası", cip: "Adım adım" },
  /* üç rozet, üçü de teyitli olgu; `b` kalın basılan parça */
  rozetler: [
    { b: "1996'dan", s: " beri" },
    { b: "Üç ülkede", s: " kendi ofis" },
    { b: "IFZA, Meydan, DWTC", s: " iş ortağı" },
  ],
};

/* ------------------------------------------------------ 1 · nasıl çalışır
   ÇİZİM 1 · akış: Siz → Ortac → Müşteriniz, altta geri dönen bilgi hattı.
   Üç kart çizimdeki üç hareketi birer cümleyle söylüyor. */
export const PARTNER_AKIS: Bas & {
  duraklar: { ad: string; alt: string }[];
  donus: string;
  items: { icon: PartnerIcon; title: string; line: string }[];
} = {
  id: "nasil",
  heading: "Siz yönlendirin, gerisi bizde.",
  accent: "gerisi bizde.",
  lead: "Üç hareketten oluşan bir iş birliği: yönlendirme, yürütme, izleme.",
  duraklar: [
    { ad: "Siz", alt: "Müşteriyi yönlendirirsiniz" },
    { ad: "Ortac", alt: "Kuruluş ve sonrası" },
    { ad: "Müşteriniz", alt: "Şirketi kurulur" },
  ],
  donus: "Her adımın bilgisi size döner",
  items: [
    {
      icon: "yonlendir",
      title: "Müşterinizi yönlendirirsiniz",
      line: "İhtiyacı ve ülkeyi birlikte netleştiririz; dosyayı biz açarız.",
    },
    {
      icon: "yurut",
      title: "Süreci biz yürütürüz",
      line: "Kuruluş, banka, muhasebe ve vergi aynı ekipte ilerler.",
    },
    {
      icon: "izle",
      title: "Siz her adımı izlersiniz",
      line: "Hangi adım tamamlandı, sırada ne var; bilgisi size ulaşır.",
    },
  ],
};

/* ---------------------------------------------------------- 2 · izleme
   ÇİZİM 2 · gece kartta örnek dosya çizelgesi. Çizim TEMSİLÎ ve bunu kendi
   içinde söylüyor ("Örnek" çipi); sağdaki üç satır neyin BUGÜN var olduğunu,
   neyin hazırlandığını ayırıyor. Üçüncü satır amber: "hazırlanıyor" bir not.
   Adım adları bilerek ülkeden bağımsız (lisans, Companies House gibi ülkeye
   özel ad yok): çizim üç ülke için de doğru kalsın. */
export const PARTNER_IZLEME: Bas & {
  dosya: { ad: string; cip: string; gorunum: string };
  adimlar: { ad: string; durum: "tamam" | "suruyor" | "sirada" }[];
  durumAd: Record<"tamam" | "suruyor" | "sirada", string>;
  items: { icon: PartnerIcon; title: string; line: string; cip: string; ton?: "amber" }[];
} = {
  id: "izleme",
  heading: "Dosyanın her adımı önünüzde.",
  accent: "önünüzde.",
  lead: "Müşterinizin dosyası hangi adımda, sırada ne var; bunu sizinle paylaşıyoruz.",
  dosya: { ad: "Müşteri dosyası", cip: "Örnek", gorunum: "Ortak görünümü" },
  adimlar: [
    { ad: "Evrak", durum: "tamam" },
    { ad: "Kuruluş başvurusu", durum: "tamam" },
    { ad: "Şirket tescili", durum: "tamam" },
    { ad: "Banka başvurusu", durum: "suruyor" },
    { ad: "Muhasebe", durum: "sirada" },
  ],
  durumAd: { tamam: "Tamamlandı", suruyor: "Sürüyor", sirada: "Sırada" },
  items: [
    {
      icon: "paylas",
      title: "Adım bilgisi",
      line: "Başvurunuzla birlikte süreç adımlarını sizinle paylaşıyoruz.",
      cip: "Bugün",
    },
    {
      icon: "panel",
      title: "Müşteri paneli",
      line: "Müşterinizin evrak, talep ve imza akışı tek panelde yürüyor.",
      cip: "Bugün",
    },
    {
      icon: "ortakPanel",
      title: "Ortak paneli",
      line: "Yönlendirdiğiniz dosyaları yetkinizle tek ekrandan izleyeceksiniz.",
      cip: "Hazırlanıyor",
      ton: "amber",
    },
  ],
};

/* ------------------------------------------------------------ 3 · ekip
   ÇİZİM 3 · zaman çizgisi (1996'dan bugüne) ve üç sayı. Sayıların dördü de
   teyitli (dosya başı · madde 4). "300" teyitte "300 civarı"; etiket bunu
   "civarında" diye söylüyor.
   Altındaki amber kutu ortağın müşterisine veremeyeceği üç söz: brand.ts ·
   STANCE_LIMITS'in ortak diline çevrilmiş kısa hâli (amber = şart ve risk). */
export const PARTNER_EKIP: Bas & {
  cizgi: { bas: string; son: string; orta: string; alt: string };
  sayilar: { sayi: string; ad: string }[];
  sinir: { title: string; maddeler: string[] };
} = {
  id: "ekip",
  heading: "Müşterinizi emanet ettiğiniz ekip.",
  accent: "emanet ettiğiniz ekip.",
  lead: "1996'dan beri muhasebe, vergi ve kurumsal danışmanlık alanındayız.",
  cizgi: { bas: "1996", son: "Bugün", orta: "30 yıl", alt: "aynı alanda" },
  sayilar: [
    { sayi: "3", ad: "ülkede kendi ofis" },
    { sayi: "700+", ad: "şirket kuruluşu" },
    { sayi: "300", ad: "civarında aktif muhasebe müşterisi" },
  ],
  sinir: {
    title: "Müşterinize veremeyeceğiniz sözler",
    maddeler: [
      "Banka hesabı garantisi. Kararı banka verir.",
      "Kesin tarih. Süreler tipik aralıktır.",
      "Kişiye özel vergi görüşü. Siteden verilmez.",
    ],
  },
};

/* ---------------------------------------------------------- 4 · üç ülke
   Fotoğraflı üç kart (hafıza: foto üstüne yazı kartları beğenildi). Ofis
   şehirleri teyitli. Muhasebe satırı teyit cevabından: Dubai ve KKTC'de
   kendi ekip, İngiltere'de anlaşmalı ofis. Vize yalnız Dubai'de (sitede
   /dubai/oturum-vize var, öteki iki ülkede yok). KKTC için banka adı yok. */
export const PARTNER_ULKELER: Bas & {
  items: { slug: "dubai" | "ingiltere" | "kktc"; ad: string; ofis: string; line: string; href: string }[];
} = {
  id: "ulkeler",
  heading: "Üç ülke, kendi ofislerimiz.",
  accent: "kendi ofislerimiz.",
  lead: "Müşterinizin işine hangi ülke uygunsa oraya yönlendirirsiniz.",
  items: [
    {
      slug: "dubai",
      ad: "Dubai",
      ofis: "Dubai ofisi",
      line: "Serbest bölge şirketi, vize ve muhasebe kendi ekibimizde.",
      href: "/dubai",
    },
    {
      slug: "ingiltere",
      ad: "İngiltere",
      ofis: "Londra ofisi",
      line: "Limited şirket kuruluşu; muhasebe anlaşmalı ofisle yürür.",
      href: "/ingiltere",
    },
    {
      slug: "kktc",
      ad: "KKTC",
      ofis: "Lefkoşa ofisi",
      line: "Serbest Liman şirketi ve muhasebe kendi ekibimizde.",
      href: "/kktc",
    },
  ],
};

/* ------------------------------------------------- 5 · kimler ortak olur
   Gece pano, dört kart. "Çalıştığımız ortaklar" DEĞİL (öyle bir liste teyit
   edilmedi), o yüzden başlık "olabilir". Dört meslek müşterinin tarifinden. */
export const PARTNER_KIMLER: Bas & { items: { icon: PartnerIcon; title: string; line: string }[] } = {
  id: "kimler",
  heading: "Kimler iş ortağı olabilir.",
  accent: "iş ortağı olabilir.",
  lead: "Müşterisi yurt dışında şirket kurmayı soran her meslek.",
  items: [
    {
      icon: "danisman",
      title: "Danışmanlık firmaları",
      line: "Türkiye'de ya da yurt dışında; müşterinize üç ülkede tek ekip.",
    },
    {
      icon: "musavir",
      title: "Mali müşavirler",
      line: "Yurt dışı ayağı için ikinci bir ofis aramazsınız.",
    },
    {
      icon: "hukuk",
      title: "Hukuk büroları",
      line: "Müvekkilinizin kuruluşunu ve sonrasını biz yürütürüz.",
    },
    {
      icon: "ajans",
      title: "Ajanslar",
      line: "Müşterilerinize kuruluş ve ödeme altyapısı.",
    },
  ],
};

/* --------------------------------------------------------- 6 · başvuru
   Dört adım yatay RAY (çubuk + sayı; hafıza: "liste + sağda kart" kalıbı
   süreçte yasak, o yüzden adımlar formun yanında değil ÜSTÜNDE). Süre
   taahhüdü yok. Ticari şart cümlesi ikinci adımda.

   FORM ÇALIŞIYOR (shared/FormBagla → lib/formGonder → /api/form; sunucu
   gönderemezse ziyaretçinin e-posta uygulamasında web@ortacglobal.com'a
   adresli, alanları dolu bir ileti açılır). Alanlar sadeleşti: "web sitesi"
   ve "hangi model" çıktı, "firma" ve "hangi ülke" geldi. Zorunlu iki alan
   aynı: ad ve e-posta. */
export type PartnerField = {
  name: string;
  label: string;
  /* "secenek" ADI BİLEREK "select" DEĞİL (docs/tuzaklar.md · kural 9: açılır
     kutu yasak). Ekrandaki karşılığı görünür çip + gizli native radio. */
  type: "text" | "email" | "tel" | "secenek";
  placeholder?: string;
  autoComplete?: string;
  options?: string[];
  /** iki sütunlu ızgarada tam satırı kaplasın mı */
  wide?: boolean;
};

export const PARTNER_BASVURU: Bas & {
  adimlar: { t: string; s: string }[];
  formBaslik: string;
  fields: PartnerField[];
  zorunlu: string[];
  submitLabel: string;
  note: string;
  askLabel: string;
} = {
  id: "basvuru",
  heading: "Ortaklık başvurusu.",
  accent: "başvurusu.",
  lead: "Kısa bir form. Şartları ilk görüşmede birlikte belirliyoruz.",
  adimlar: [
    { t: "Başvuru", s: "Formu doldurursunuz." },
    { t: "İlk görüşme", s: "Şartları birlikte belirleriz." },
    { t: "İlk yönlendirme", s: "Müşterinizin dosyasını açarız." },
    { t: "İzleme", s: "Adımları sizinle paylaşırız." },
  ],
  formBaslik: "Başvuru formu",
  fields: [
    { name: "ad", label: "Ad Soyad", type: "text", placeholder: "Adınız ve soyadınız", autoComplete: "name" },
    { name: "firma", label: "Firma", type: "text", placeholder: "Firmanızın adı", autoComplete: "organization" },
    { name: "eposta", label: "E-posta", type: "email", placeholder: "ornek@firma.com", autoComplete: "email" },
    { name: "telefon", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx", autoComplete: "tel" },
    {
      name: "alan",
      label: "Faaliyet alanınız",
      type: "secenek",
      options: ["Danışmanlık firması", "Mali müşavirlik", "Hukuk bürosu", "Ajans", "Diğer"],
      wide: true,
    },
    {
      name: "ulke",
      label: "Müşterileriniz en çok hangi ülkeyi soruyor?",
      type: "secenek",
      options: ["Dubai", "İngiltere", "KKTC", "Henüz belli değil"],
      wide: true,
    },
  ],
  zorunlu: ["ad", "eposta"],
  submitLabel: "Başvuruyu gönder",
  note: "Başvurunuz ekibimize iletilir; ilk görüşme için size dönüş yapıyoruz.",
  askLabel: "Ortaklık için bize yazın",
};

/* -------------------------------------------------------------------- SSS
   Yedi soru; CountryFaq'ı ve FAQPage şemasını AYNI liste besliyor. Eski
   sayfada şema bilerek yoktu, çünkü ilk cevap "bu bilgi henüz yok" diyordu;
   artık her cevap bir şey söylüyor. Ticari şart cevabı tek cümle ve rakamsız.
   Banka ve vergi cevapları brand.ts · STANCE_LIMITS politikasının ortak
   diline çevrilmiş hâli. Panelin adı geçmiyor (kural 7). */
export const PARTNER_FAQ_BAS: Bas = {
  id: "sss",
  heading: "Ortaklıkta sık sorulanlar.",
  accent: "sık sorulanlar.",
  lead: "Başvurmadan önce en çok sorulan yedi başlık.",
};

export const PARTNER_FAQ: { q: string; a: string }[] = [
  {
    q: "Komisyon ve ödeme şartları nedir?",
    a: "Şartları ilk görüşmede birlikte belirliyoruz. Bu sayfada oran yayımlamıyoruz.",
  },
  {
    q: "Müşterimin sürecini nasıl takip ederim?",
    a: "Başvurunuzla birlikte süreç adımlarını sizinle paylaşıyoruz. Yönlendirdiğiniz dosyaları tanımlanan yetkiyle tek ekrandan izleyeceğiniz ortak paneli hazırlanıyor.",
  },
  {
    q: "Müşterimi hangi ülkelere yönlendirebilirim?",
    a: "Dubai, İngiltere ve KKTC. Üç ülkede de kendi ofisimiz var; hangisinin uygun olduğu müşterinizin faaliyetine ve ihtiyacına göre değişir.",
  },
  {
    q: "Kuruluştan sonra müşteriye kim bakıyor?",
    a: "Aynı ekip. Muhasebe Dubai ve KKTC'de kendi ekibimizle, İngiltere'de anlaşmalı ofisle yürür. Vergi, banka başvurusu ve uyum işleri de bizde kalır.",
  },
  {
    q: "Müşterime banka hesabının açılacağını söyleyebilir miyim?",
    a: "Hayır. Hesabı banka açar ve karar bankanındır. Biz dosyayı hazırlar ve başvuruyu yürütürüz.",
  },
  {
    q: "Müşterime vergi konusunda ne söyleyebilirim?",
    a: "Genel çerçeveyi. Şirket kurmak tek başına vergi avantajı getirmez; sonuç müşterinin faaliyetine ve mukimliğine bağlıdır. Kişiye özel görüş siteden verilmez, durum ayrıca konuşulur.",
  },
  {
    q: "Yurt dışındaki bir danışmanlık firması da başvurabilir mi?",
    a: "Evet. Türkiye'deki ve yurt dışındaki danışmanlık firmaları, mali müşavirler, hukuk büroları ve ajanslar başvurabilir.",
  },
];
