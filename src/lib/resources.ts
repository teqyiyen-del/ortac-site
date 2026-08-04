import { COUNTRY_NAME, COUNTRY_ORDER, FACTS, type CountrySlug } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { AFTER_SETUP } from "@/lib/afterSetup";
import {
  BLOG_POSTS,
  formatDate,
  postsForCountry,
  postsOfKind,
  publishedOfKind,
  publishedPosts,
} from "@/lib/blog";

/* ============================================================================
   KAYNAKLAR — dört türün kayıt defteri
   ============================================================================

   NEDEN BU DOSYA VAR

   Müşterinin teşhisi tek cümleydi: "kaynaklar kısmında aslında hepsi aynı yere
   çıkıyor biraz." Doğruydu. Eskiden /kaynaklar tek bir kart ızgarasıydı, altı
   kartın altısı da `/kaynaklar` adresine bağlanıyordu; ana sayfadaki yayın
   bölümü de, navbar paneli de aynı yere iniyordu. Yani sitede dört ayrı iş
   yapan dört ayrı içerik türü vardı ama tek bir yüzeyleri vardı.

   Dört tür ve HER BİRİNİN İŞİ — ayrımın tamamı bu dört satırda:

     blog     · Bir konuyu açan yazı. Ziyaretçi okumaya gelir.
     rehber   · Bir ÜLKEDE ne yapılabileceğinin ve nasıl yapıldığının yolu.
                Ziyaretçi bir sonraki adımını bulmaya gelir.
     gelisme  · Tarihli kayıt: neyin ne zaman değiştiği. Ziyaretçi (ve arama
                motoru) sitenin yaşadığını buradan görür.
     ekitap   · İndirilen dosya. Ziyaretçi bir şey almaya gelir.

   Dördü ayrı sayfada ve ayrı görsel ritimde yaşıyor. Dördünü aynı kart
   ızgarasında göstermek, müşterinin şikâyetini sunumda sürdürmek olurdu.

   ---------------------------------------------------------------------------
   İÇERİK KURALI — BU DOSYANIN ASIL İŞİ  ·  BU TURDA DEĞİŞTİ

   Önceki turda bu bölüm neredeyse boştu ve boşluğu ekranda anlatıyordu: uyarı
   panelleri, "hazırlananlar" başlıkları, boş durum iskeleleri. Müşteri bunu
   tek cümleyle kesti: "şu üstteki örnektirler bir kayıt dört şeyi taşımadan
   yayınlanmıyor kısımlarını kaldır ya … bu kısım finalde nasıl gözükecek onu
   tasarlamanı istiyorum ne bu not düşme sevdası."

   Haklı: şu an TASARIM yapılıyor ve boş bir sayfanın tasarımı değerlendirilemez.
   O yüzden raflar ve zaman çizelgesi DOLU. Sayfa dolu hâliyle görünüyor.

   KORUNAN SINIR — tek ve tartışmaya kapalı: yer tutucular OLGU İDDİASI
   TAŞIMIYOR. Aşağıdaki dizilerde tek bir oran, tutar, eşik, yürürlük tarihi,
   kanun maddesi ya da "şu otorite şu kararı aldı" cümlesi yok. Her kayıt KONU
   BAŞLIĞI düzeyinde duruyor: neyin konusu olduğunu söylüyor, ne olduğunu
   iddia etmiyor. Ayrıntı alanları da soru cümlesi — soru bir iddia taşımaz.

     DOĞRU  · "Serbest bölge faaliyet listesi güncellemesi"
     YANLIŞ · "Kurumlar vergisi 1 Ocak'ta %9'dan %12'ye çıktı"

   Şemalar bu ayrımı tip düzeyinde tutuyor, iyi niyete bırakmıyor:

   · `Update.source` ZORUNLU (resmî otoritenin kendi duyurusu). Kaynağı olmayan
     bir kayıt tip denetiminden geçmiyor.
   · `Ebook.file` ZORUNLU ve public/ altındaki gerçek dosyayı gösteriyor.
     Dosya yoksa kayıt yazılamıyor, yani indirilemeyen bir e-kitap listelenemez.
   · Yer tutucular ayrı dizilerde (`DRAFT_*`) ve TİPLERİ FARKLI. `DraftUpdate`ın
     `source`u, `DraftEbook`un `file`ı YOK; `UPDATES`/`EBOOKS`e kopyalanamıyor,
     JSON-LD'ye giremiyor, `download` niteliğiyle bağlanamıyor.

   EKRANDAKİ İŞARET KÜÇÜLDÜ, KALKMADI. Müşteri kaydın kendisindeki işareti
   açıkça kabul etti ("zaten koyduklarının içinde örnektir fln diye
   yazıyorsun"). Kalan tek işaret kayıt başına küçük bir "Örnek" rozeti
   (.kyn-seed-tag). Kalkanlar: sayfa başındaki uyarı panelleri, kesikli kart
   çerçeveleri, "neden yayında değil" satırları, ayrı "hazırlananlar" bölümleri.

   JSON-LD'YE YER TUTUCU GİRMİYOR ve bu ayrım korunuyor. Görsel yer tutucu bir
   tasarım kararı; yapılandırılmış veride sahte kayıt arama motoruna verilmiş
   yanlış beyandır ve geri alınması ekrandaki bir karttan çok daha zordur.

   ---------------------------------------------------------------------------
   REHBERLER BU TURDA BLOGUN İÇİNE TAŞINDI

   Rehber artık ayrı bir içerik deposu değil, bir BLOG TÜRÜ: lib/blog.ts'teki
   `BlogPost.kind === "rehber"`. Adresi de /rehberler değil /blog/rehberler
   (eski adres 308 ile yönleniyor). Bu dosyada iki sonucu var:

   1. `RESOURCE_KINDS.rehber.href` yeni adresi gösteriyor — bağlantılar
      yönlendirme zincirine girmiyor.
   2. `countOf("rehber")` artık yayınlanmış rehberleri sayıyor
      (`postsOfKind("rehber")`), ülke sayısını değil. Gerekçe countOf'un
      başında.

   HUB'DA KAPI KALDI — KARAR VE GEREKÇESİ
   Rehberin blogun içine taşınması ADRESİ değiştirdi, ZİYARETÇİNİN İŞİNİ
   değiştirmedi. Bu hub'ın var olma sebebi müşterinin tek cümlesiydi:
   "kaynaklar kısmında aslında hepsi aynı yere çıkıyor." Hub'ın işi türleri
   birbirinden ayırmak; "bir konu okumak" ile "bir ülkede yolumu bulmak" hâlâ
   iki ayrı iş ve ikincisi için gelen kişiyi önce /blog'a gönderip orada bir
   filtre aratmak, tam da kaldırdığımız fazladan adımı geri koymak olurdu.
   Kapı gerçek bir sayfaya iniyor (/blog/rehberler, kendi <title>'ı var), yani
   ayrım sözde kalmıyor.

   ---------------------------------------------------------------------------
   AŞAĞIDAKİ `GUIDES` MODELİ ARTIK SAYFA BASMIYOR

   Ülke rehberini "yol" olarak kuran model (bölümler ülkenin verisinden türer,
   her `href` gerçek bir sayfaya ya da çapaya iner) aşağıda duruyor ama artık
   yayında bir sayfası yok: /blog/rehberler kendi listesini blog kayıtlarından
   kuruyor. Silinmedi çünkü hub'daki rehber kapısı, yayınlanmış rehber
   olmadığında önizlemesini bu modelden kuruyor (components/kaynaklar/
   KynDoors.tsx). Ayrıntı: GUIDES'ın kendi başlığında.
   ========================================================================= */

/* ------------------------------------------------------------------ türler */

export type ResourceKind = "blog" | "rehber" | "gelisme" | "ekitap";

export type KindMeta = {
  id: ResourceKind;
  /** menüde ve başlıklarda görünen ad */
  label: string;
  /** türün kendi sayfası — dördü de ayrı adres, ayrı ritim */
  href: string;
  /** türün İŞİ: hub kapısındaki tek satır */
  job: string;
  /**
   * Türün ne OLMADIĞI. Dört tür birbirine karışmasın diye her birinin bunu
   * söylemesi gerekiyor: sitede "araçlar" bölümü de aynı kuralla yazıldı
   * (bkz. lib/tools/catalog.ts · isNot).
   */
  isNot: string;
  /**
   * Tür GERÇEKTEN boşaldığında basılacak başlık.
   *
   * Bugün hiçbir yüzeyde görünmüyor: dört türün dördü de dolu (blog gerçek
   * yazılarla, kalan üçü işaretli yer tutucularla). Alan duruyor çünkü
   * components/kaynaklar/KynEmpty.tsx sitenin tek boş durum tasarımı ve bir
   * tür bir gün gerçekten boşalırsa metni burada olmalı — bileşende değil.
   */
  emptyTitle: string;
  /** boşken basılan açıklama: neden boş ve buraya ne girecek */
  emptyLine: string;
};

export const RESOURCE_KINDS: Record<ResourceKind, KindMeta> = {
  blog: {
    id: "blog",
    label: "Blog",
    href: "/blog",
    job: "Bir konuyu baştan sona açan yazılar; her yazıda rakamın nereden geldiği yazılı.",
    isNot: "Haber akışı değil. Bir yazı ancak kaynağı gösterilebiliyorsa yayınlanıyor.",
    emptyTitle: "Henüz yayınlanmış yazı yok.",
    emptyLine:
      "İlk yazılar iç kontrolden geçtikçe burada tarih sırasıyla listelenecek. O zamana kadar buraya doldurulmuş bir liste koymuyoruz.",
  },
  rehber: {
    id: "rehber",
    label: "Ülke rehberleri",
    /* Rehberler bu turda blogun altına taşındı: /rehberler → /blog/rehberler.
       Adres tek yerde yazılı, o yüzden taşıma bu satırla bitiyor. */
    href: "/blog/rehberler",
    job: "Bir ülkede ne yapılabileceğinin ve nasıl yapıldığının adım adım yolu.",
    isNot: "Ülke reklamı değil. Her rehber o ülkenin dürüst kısıtını da yazıyor.",
    emptyTitle: "Henüz yayınlanmış rehber yok.",
    emptyLine:
      "Rehberler artık blogun bir türü ve kendi filtresinde listeleniyor. Bir rehber, her satırının kaynağı gösterilebildiğinde yayına giriyor.",
  },
  gelisme: {
    id: "gelisme",
    label: "Gelişmeler",
    href: "/gelismeler",
    job: "Neyin ne zaman değiştiği; tarih, ülke ve resmî kaynak bağlantısıyla.",
    isNot:
      "Hukuki görüş değil ve tam liste iddiası taşımıyor. Kaydın kaynağı resmî otoritenin kendi duyurusudur.",
    emptyTitle: "Henüz yayınlanmış bir gelişme yok.",
    emptyLine:
      "Buraya bir kayıt ancak resmî kaynağına bağlanabildiğinde giriyor: tarih, hangi ülke, kimi ilgilendiriyor ve duyurunun kendisi.",
  },
  ekitap: {
    id: "ekitap",
    label: "E-kitaplar",
    href: "/e-kitaplar",
    job: "İndirip yanınızda götürdüğünüz uzun içerik.",
    isNot: "Form karşılığı değil: indirmek için bilgi istemiyoruz.",
    emptyTitle: "Henüz indirilebilir bir dosya yok.",
    emptyLine: "Bir e-kitap ancak dosyası hazır olduğunda indirilebilir oluyor.",
  },
};

/** Hub'daki kapı sırası. Ziyaretçinin muhtemel sırası: oku → yolunu bul →
    güncelini gör → indir. */
export const KIND_ORDER: ResourceKind[] = ["blog", "rehber", "gelisme", "ekitap"];

/* ============================================================================
   1 · GELİŞMELER — tarihli akış
   ========================================================================= */

/** Kaydın ne tür bir değişiklik olduğu; akışta rozet olarak görünüyor. */
export type UpdateChannel = "mevzuat" | "uygulama" | "tarih";

export const UPDATE_CHANNEL_LABEL: Record<UpdateChannel, string> = {
  mevzuat: "Mevzuat",
  uygulama: "Uygulama",
  tarih: "Takvim",
};

/**
 * Bir gelişme kaydı.
 *
 * `source` bilerek opsiyonel DEĞİL. Bu alan bu bölümün tek güvencesi: bir
 * satır ancak resmî otoritenin kendi duyurusuna bağlanabiliyorsa yayınlanıyor.
 * Opsiyonel olsaydı, kaynağı olmayan bir satır eklemek bir alanı boş
 * bırakmak kadar kolay olurdu.
 */
export type Update = {
  id: string;
  /** ISO (YYYY-AA-GG) — duyurunun/değişikliğin tarihi, yazının değil */
  date: string;
  /** yürürlük tarihi duyuru tarihinden farklıysa; değilse boş bırakılır */
  effectiveFrom?: string;
  country: CountrySlug | "genel";
  channel: UpdateChannel;
  title: string;
  /** iki cümleyi geçmeyen özet — akışta tam metin okunmuyor */
  summary: string;
  /** kimi ilgilendiriyor: "BAE'de serbest bölge şirketi olanlar" gibi */
  who: string;
  /** varsa yapılması gereken tek şey */
  action?: string;
  /** ZORUNLU · resmî kaynak. Kaynağı olmayan kayıt yayınlanmaz. */
  source: { name: string; url: string };
  /** sitede konuyla ilgili sayfa — varsa akıştan oraya çıkış */
  related?: { label: string; href: string };
};

/**
 * Yayındaki gelişmeler.
 *
 * BİLEREK BOŞ. Depoda teyit edilmiş, kaynağına bağlanabilen tek bir mevzuat
 * kaydı yok ve uydurmak bu firma için gerçek bir risk. Sayfa boş listeyi
 * gizlemiyor; ne zaman kayıt gireceğini açıkça yazıyor (bkz. RESOURCE_KINDS).
 */
export const UPDATES: Update[] = [];

/**
 * SWAP:LEGISLATION — yer tutucu gelişme kayıtları.
 *
 * TİPİ `Update` DEĞİL ve bu kasıtlı: `source` alanı olmadığı için UPDATES
 * dizisine kopyalanamıyorlar, JSON-LD'ye giremiyorlar. Yayına almanın tek
 * yolu resmî duyuruyu bulup kaydı `Update` olarak baştan yazmak.
 *
 * NE TAŞIYORLAR — hepsi KONU BAŞLIĞI düzeyinde:
 *   topic  · kaydın konusu. Bir olay değil, bir başlık.
 *   line   · konunun kapsamı, tek satır. "Neyin konusu" der, "ne oldu" demez.
 *   who    · kaydın hangi okuyucu kesimini ilgilendirdiği. Bu bir hukuki
 *            tespit değil, bizim okuyucumuzun tarifi — o yüzden yazılabiliyor.
 *   covers · kayıt dolduğunda cevaplanacak SORULAR. Soru bir iddia taşımaz;
 *            bu yüzden ayrıntı alanı bilerek soru cümlelerinden kuruldu.
 *
 * NE TAŞIMIYORLAR — dizinin tamamında tek bir oran, tutar, eşik, yürürlük
 * tarihi, kanun maddesi ya da "şu otorite şu kararı aldı" cümlesi YOK. Metin
 * artık kayıt başına yazılıyor (önceki turda hepsinde aynı sabit cümle vardı);
 * güvenceyi sağlayan şey metnin tekrarı değil, cümlenin BİÇİMİ: başlık + kapsam
 * + soru. Yeni kayıt eklerken kural bu — "…güncellemesi", "…takvimi",
 * "…belge seti" olur; "%X'e çıktı", "1 Ocak'ta yürürlüğe girdi" olmaz.
 *
 * Tarihler eksendeki YERİ belirliyor. Bir duyuru tarihi iddiası değiller;
 * çizelgenin aylara bölünmüş hâlinin nasıl aktığını göstermek için varlar.
 */
export type DraftUpdate = {
  id: string;
  /** ISO (YYYY-AA-GG) — eksendeki YERİ belirliyor, bir duyuru tarihi değil */
  date: string;
  country: CountrySlug | "genel";
  channel: UpdateChannel;
  /** kaydın konu başlığı — iddia değil, "bu kayıt şu konuda" */
  topic: string;
  /** tek satır kapsam; kapalı kartta görünen son satır */
  line: string;
  /** kaydın hangi okuyucu kesimini ilgilendirdiği */
  who: string;
  /** açılınca görünen sorular — kayıt dolduğunda cevaplanacak başlıklar */
  covers: string[];
  /** varsa sitede bugün karşılığı olan sayfa; hepsi lib/routes.ts'te açık */
  related?: { label: string; href: string };
};

export const DRAFT_UPDATES: DraftUpdate[] = [
  /* ---------------------------------------------------------- Temmuz 2026 */
  {
    id: "d-2607-uae-faaliyet",
    date: "2026-07-28",
    country: "dubai",
    channel: "mevzuat",
    topic: "Serbest bölge faaliyet listesi güncellemesi",
    line: "Lisansın kapsadığı faaliyet başlıkları ve başlık eklerken izlenen yol.",
    who: "Serbest bölgede lisansı olan veya lisans başvurusu hazırlayan şirketler",
    covers: [
      "Bir lisansa hangi faaliyet başlıkları birlikte eklenebiliyor?",
      "Faaliyet değiştirmek lisansı yenilemeyi gerektiriyor mu?",
      "Hangi başlıklar için ek izin isteniyor?",
    ],
    related: { label: "Dubai · yapı seçimi", href: "/dubai#yapi" },
  },
  {
    id: "d-2607-genel-takvim",
    date: "2026-07-21",
    country: "genel",
    channel: "tarih",
    topic: "Üç ülkede beyan ve bildirim takvimi",
    line: "Dubai, İngiltere ve KKTC'de tekrar eden bildirim kalemlerinin aynı takvimde toplanması.",
    who: "Üç ülkeden birinde şirketi olan herkes",
    covers: [
      "Hangi kalem hangi ülkede tekrar ediyor?",
      "Takvim kuruluş tarihine mi, hesap dönemine mi bağlı?",
      "Bir kalem kaçırılırsa ne oluyor?",
    ],
    related: { label: "Üç ülkenin karşılaştırması", href: "/ulkeler" },
  },
  {
    id: "d-2607-uk-kimlik",
    date: "2026-07-14",
    country: "ingiltere",
    channel: "uygulama",
    topic: "Companies House kimlik doğrulama tarafı",
    line: "Şirket kaydında kimlik doğrulamanın nasıl yapıldığı ve kimden istendiği.",
    who: "İngiltere'de limited şirketi olan veya kuran ortak ve yöneticiler",
    covers: [
      "Doğrulama kimden isteniyor?",
      "Uzaktan tamamlanabiliyor mu?",
      "Hangi belgeler kabul ediliyor?",
    ],
  },
  {
    id: "d-2607-uae-beyan",
    date: "2026-07-06",
    country: "dubai",
    channel: "tarih",
    topic: "Kurumlar vergisi beyan dönemi",
    line: "Beyanın hangi döneme bağlandığı ve hazırlığın ne zaman başladığı.",
    who: "BAE'de kurumlar vergisi kaydı olan şirketler",
    covers: [
      "Dönem hangi tarihe göre belirleniyor?",
      "Hazırlık için hangi kayıtlar isteniyor?",
      "İlk yıl farklı mı işliyor?",
    ],
    related: { label: "Dubai · vergi çerçevesi", href: "/dubai#vergi" },
  },

  /* --------------------------------------------------------- Haziran 2026 */
  {
    id: "d-2606-uae-goaml",
    date: "2026-06-25",
    country: "dubai",
    channel: "uygulama",
    topic: "goAML kayıt yükümlülüğü tarafı",
    line: "Kaydın hangi faaliyet gruplarında istendiği ve nasıl tamamlandığı.",
    who: "Belirli faaliyet gruplarında lisansı olan şirketler",
    covers: [
      "Kayıt hangi faaliyet gruplarından isteniyor?",
      "Kayıt tamamlandıktan sonra ne yapılıyor?",
      "Sorumluluk kimin üstünde?",
    ],
  },
  {
    id: "d-2606-kktc-tescil",
    date: "2026-06-17",
    country: "kktc",
    channel: "mevzuat",
    topic: "Yerel tescil ve şirket kayıt işlemleri",
    line: "Tescil sırasında izlenen adımlar ve dosyaya giren belgeler.",
    who: "KKTC'de şirket kuran veya kayıt bilgisini güncelleyenler",
    covers: [
      "Tescil hangi adımlardan oluşuyor?",
      "Yerinde bulunmak gerekiyor mu?",
      "Kayıt bilgisi değişince ne yapılıyor?",
    ],
  },
  {
    id: "d-2606-uae-kdv",
    date: "2026-06-04",
    country: "dubai",
    channel: "mevzuat",
    topic: "KDV kaydı ve beyan başlıkları",
    line: "Kaydın hangi durumda gündeme geldiği ve beyanın hangi kalemleri kapsadığı.",
    who: "BAE'de mal veya hizmet satan şirketler",
    covers: [
      "Kayıt hangi durumda gündeme geliyor?",
      "Beyan hangi kalemleri kapsıyor?",
      "İhracat ve serbest bölge tarafı nasıl işliyor?",
    ],
    related: { label: "Dubai · vergi çerçevesi", href: "/dubai#vergi" },
  },

  /* ----------------------------------------------------------- Mayıs 2026 */
  {
    id: "d-2605-genel-sonrasi",
    date: "2026-05-27",
    country: "genel",
    channel: "uygulama",
    topic: "Kuruluş sonrası yükümlülük akışı",
    line: "Şirket kurulduktan sonra doğan kalemlerin sırası ve birbirine bağlanma biçimi.",
    who: "Yeni şirket kurmuş olan herkes",
    covers: [
      "Hangi kalem kuruluşun hemen ardından doğuyor?",
      "Hangileri yılda bir tekrar ediyor?",
      "Hangi sırayla ilerlemek işi kolaylaştırıyor?",
    ],
    related: { label: "Dubai · kuruluş sonrası", href: "/dubai#kurulus-sonrasi" },
  },
  {
    id: "d-2605-uk-adres",
    date: "2026-05-19",
    country: "ingiltere",
    channel: "uygulama",
    topic: "Kayıtlı adres ve bildirim tarafı",
    line: "Kayıtlı adresin ne işe yaradığı ve adres değişikliğinin nasıl bildirildiği.",
    who: "İngiltere'de şirketi olan ve yurt dışından yöneten ortaklar",
    covers: [
      "Kayıtlı adres hangi bildirimlerde kullanılıyor?",
      "Adres değişikliği nasıl bildiriliyor?",
      "Yazışmalar nereye ulaşıyor?",
    ],
  },
  {
    id: "d-2605-uae-lisans",
    date: "2026-05-08",
    country: "dubai",
    channel: "tarih",
    topic: "Serbest bölge lisans yenileme dönemi",
    line: "Yenilemenin hangi tarihe bağlandığı ve hazırlığın hangi belgelerle yapıldığı.",
    who: "Serbest bölgede lisansı olan şirketler",
    covers: [
      "Yenileme hangi tarihe bağlanıyor?",
      "Hangi belgeler önceden hazırlanıyor?",
      "Serbest bölgeye göre süreç değişiyor mu?",
    ],
  },

  /* ----------------------------------------------------------- Nisan 2026 */
  {
    id: "d-2604-kktc-banka",
    date: "2026-04-23",
    country: "kktc",
    channel: "uygulama",
    topic: "Kurumsal hesap açılışında belge seti",
    line: "Hesap açılışında istenen belgelerin toplandığı liste ve sürecin işleyişi.",
    who: "KKTC'de kurumsal hesap açacak şirketler",
    covers: [
      "Hangi belgeler bir arada isteniyor?",
      "Ortakların bizzat bulunması gerekiyor mu?",
      "Süreç hangi adımlarda ilerliyor?",
    ],
  },
  {
    id: "d-2604-uk-donem",
    date: "2026-04-15",
    country: "ingiltere",
    channel: "tarih",
    topic: "Hesap dönemi ve bildirim takvimi",
    line: "Hesap döneminin nasıl belirlendiği ve takvimin buna nasıl bağlandığı.",
    who: "İngiltere'de limited şirketi olanlar",
    covers: [
      "Hesap dönemi nasıl belirleniyor?",
      "Dönem değiştirilebiliyor mu?",
      "İlk dönem sonrakilerden farklı mı?",
    ],
  },
  {
    id: "d-2604-genel-ubo",
    date: "2026-04-02",
    country: "genel",
    channel: "mevzuat",
    topic: "Nihai fayda sahibi bildirimi",
    line: "Bildirimin hangi bilgileri kapsadığı ve ortaklık değiştiğinde ne yapıldığı.",
    who: "Ortaklık yapısında birden fazla kişi bulunan şirketler",
    covers: [
      "Bildirim hangi bilgileri kapsıyor?",
      "Ortaklık değişince ne yapılıyor?",
      "Üç ülkede aynı mı işliyor?",
    ],
  },

  /* ------------------------------------------------------------ Mart 2026 */
  {
    id: "d-2603-uae-ofis",
    date: "2026-03-26",
    country: "dubai",
    channel: "uygulama",
    topic: "Ofis tipi ile lisans arasındaki ilişki",
    line: "Ofis seçiminin lisansı ve vize tarafını hangi noktalarda etkilediği.",
    who: "Serbest bölge ile anakara arasında seçim yapanlar",
    covers: [
      "Ofis tipi lisansı nasıl etkiliyor?",
      "Vize sayısıyla ilişkisi ne?",
      "Sonradan değiştirilebiliyor mu?",
    ],
    related: { label: "Dubai · kuruluş bedeli", href: "/dubai#fiyat" },
  },
  {
    id: "d-2603-kktc-beyan",
    date: "2026-03-12",
    country: "kktc",
    channel: "tarih",
    topic: "Yıllık beyan dönemi",
    line: "Beyanın hangi döneme bağlandığı ve hazırlığın hangi kayıtlarla yapıldığı.",
    who: "KKTC'de şirketi olanlar",
    covers: [
      "Dönem hangi tarihe göre işliyor?",
      "Hangi kayıtlar önceden hazırlanıyor?",
      "Faaliyeti olmayan şirkette ne değişiyor?",
    ],
  },
  {
    id: "d-2603-uk-bordro",
    date: "2026-03-05",
    country: "ingiltere",
    channel: "mevzuat",
    topic: "Çalışan bordro kaydı başlıkları",
    line: "Şirket çalışan aldığında açılan kayıtların kapsamı.",
    who: "İngiltere'de çalışan istihdam edecek şirketler",
    covers: [
      "Kayıt ne zaman açılıyor?",
      "Yönetici ücretinin durumu ne?",
      "Kayıt açıldıktan sonra ne tekrar ediyor?",
    ],
  },

  /* ----------------------------------------------------------- Şubat 2026 */
  {
    id: "d-2602-uae-vize",
    date: "2026-02-24",
    country: "dubai",
    channel: "uygulama",
    topic: "Vize ve biyometri randevu akışı",
    line: "Randevu sırasının nasıl işlediği ve hangi adımların yerinde yapıldığı.",
    who: "BAE'de oturum izni alacak ortak ve çalışanlar",
    covers: [
      "Adımlar hangi sırayla ilerliyor?",
      "Hangileri için BAE'de bulunmak gerekiyor?",
      "Aile başvurusu ne zaman gündeme geliyor?",
    ],
    related: { label: "Dubai · süreç adımları", href: "/dubai#surec" },
  },
  {
    id: "d-2602-genel-transfer",
    date: "2026-02-12",
    country: "genel",
    channel: "uygulama",
    topic: "Ülkeler arası para transferi tarafı",
    line: "Tahsilat ve transfer kanallarının şirketin bulunduğu ülkeye göre kurulması.",
    who: "Yurt dışından tahsilat yapan veya kâr aktaran şirketler",
    covers: [
      "Hangi kanallar hangi ülkede kurulabiliyor?",
      "Transferde hangi bilgiler isteniyor?",
      "Banka dışı kanalların yeri ne?",
    ],
    related: { label: "Dubai · para transferi", href: "/dubai#para-transferi" },
  },
  {
    id: "d-2602-uk-tescil",
    date: "2026-02-03",
    country: "ingiltere",
    channel: "mevzuat",
    topic: "Şirket tescilinde istenen bilgiler",
    /* "hangisinin kamuya açık olduğu" DEĞİL: o cümle bir kısmının kamuya açık
       olduğunu varsayıyor, yani konu başlığı olmaktan çıkıp örtük bir iddiaya
       dönüyor. Alan adı olarak bırakmak yeterli. */
    line: "Tescil formuna giren bilgiler ve kamuya açık kayıt tarafı.",
    who: "İngiltere'de şirket kuracak ortaklar",
    covers: [
      "Tescilde hangi bilgiler isteniyor?",
      "Hangileri kamuya açık kayıtta görünüyor?",
      "Sonradan değiştirilebiliyor mu?",
    ],
  },

  /* ------------------------------------------------------------ Ocak 2026 */
  {
    id: "d-2601-uae-defter",
    date: "2026-01-27",
    country: "dubai",
    channel: "mevzuat",
    topic: "Defter tutma ve kayıt saklama başlıkları",
    line: "Hangi kayıtların tutulduğu ve ne kadar süreyle saklandığı.",
    who: "BAE'de faaliyet gösteren bütün şirketler",
    covers: [
      "Hangi kayıtlar tutuluyor?",
      "Saklama süresi neye göre belirleniyor?",
      "Dijital kayıt kabul ediliyor mu?",
    ],
  },
  {
    id: "d-2601-kktc-ortaklik",
    date: "2026-01-19",
    country: "kktc",
    channel: "mevzuat",
    topic: "Ortaklık yapısı ve pay devri tarafı",
    line: "Pay devrinin hangi adımlarla yapıldığı ve kayıtlara nasıl işlendiği.",
    who: "KKTC'de ortaklık yapısını değiştirecek şirketler",
    covers: [
      "Devir hangi adımlarla yapılıyor?",
      "Hangi belgeler hazırlanıyor?",
      "Kayıtlara nasıl işleniyor?",
    ],
  },
  {
    id: "d-2601-genel-yil",
    date: "2026-01-08",
    country: "genel",
    channel: "tarih",
    topic: "Yıl başında tekrar eden kalemler",
    line: "Takvim yılıyla birlikte gündeme gelen kalemlerin tek listede toplanması.",
    who: "Üç ülkeden birinde şirketi olan herkes",
    covers: [
      "Hangi kalemler yıl başında gündeme geliyor?",
      "Hangileri hesap dönemine bağlı kalıyor?",
      "Hazırlık ne zaman başlıyor?",
    ],
    related: { label: "Üç ülkenin karşılaştırması", href: "/ulkeler" },
  },
];

/** En yeni üstte. Akışın tek sıralama kuralı. */
export function sortedUpdates(): Update[] {
  return [...UPDATES].sort((a, b) => b.date.localeCompare(a.date));
}

/** Yer tutucularda da aynı kural: en yeni üstte. */
export function sortedDraftUpdates(): DraftUpdate[] {
  return [...DRAFT_UPDATES].sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Akış ay başlıklarıyla bölünüyor: tarih ekseni ancak gruplandığında akış
 * gibi okunuyor, yoksa tarihli bir liste oluyor. Boş listede boş dizi döner
 * ve sayfa hiç başlık basmaz.
 */
export function updatesByMonth(): { key: string; label: string; items: Update[] }[] {
  const out: { key: string; label: string; items: Update[] }[] = [];
  for (const u of sortedUpdates()) {
    const key = u.date.slice(0, 7);
    const last = out[out.length - 1];
    if (last?.key === key) last.items.push(u);
    else out.push({ key, label: monthLabel(key), items: [u] });
  }
  return out;
}

/* ---------------------------------------------------- zaman çizelgesi satırı

   Çizelgeyi basan bileşen İSTEMCİ tarafında (ülke seçimi durum tutuyor). Ona
   `@/lib/resources`ı import ettirmek bu dosyanın tamamını — GUIDES üzerinden
   countryContent, afterSetup ve blog dahil — istemci paketine sokardı. O
   yüzden satırın ekranda görünen HER PARÇASI sunucuda hazırlanıp prop olarak
   geçiyor; bileşen yalnızca süzüyor ve grupluyor.

   `draft` alanı satırın tek ayrımı: doğruysa kartta küçük "Örnek" rozeti
   basılıyor ve `source` alanı hiç olmuyor.

   ---------------------------------------------------------------------------
   SATIR İKİYE BÖLÜNDÜ — KAPALI HÂL / AÇILAN HÂL

   Müşteri: "her kartın yüksekliği baya fazla amk daha küçük duyuru gibi
   yapabiliriz onları hatta her şeyi ilk bakışta göstermek yerine tıklandığında
   akordiyon şekilde de verebilir."

   Kartın hangi parçasının kapalı hâlde görüneceği bir TASARIM kararı ve
   burada, veri katmanında yazılı duruyor ki bileşen keyfî kesmesin:

     KAPALI (her zaman görünür)  · tarih · ülke · tür rozeti · başlık · `line`
     AÇILAN                      · `who` · `covers` · `related` · `source`

   Gerekçe: bir zaman çizelgesinin işi TARAMA. Tarih, ülke ve başlık tıklamadan
   okunamıyorsa liste taranamaz hâle gelir — akordiyon o zaman kartı küçültmez,
   sayfayı kullanılmaz yapar. Kartı 348px yapan şey zaten başlık değildi; üç
   sütunluk künye tablosu ve altındaki bağlantı şerididi. Akordiyona giren de
   tam olarak o. */
export type TimelineRow = {
  id: string;
  /** <time dateTime> için ISO */
  date: string;
  /** eksendeki kısa etiket: "12 Tem" */
  dayLabel: string;
  /** kart içindeki tam tarih: "12 Temmuz 2026" */
  dateLabel: string;
  monthKey: string;
  monthLabel: string;
  country: CountrySlug | "genel";
  countryLabel: string;
  /**
   * Ülke rozetindeki bayrak için ham slug. "genel" kayıtta YOK — üç ülkeyi
   * birden ilgilendiren bir kaydın tek bayrağı olamaz; onun yerine küre
   * simgesi basılıyor (bkz. KynTimeline).
   */
  flag?: CountrySlug;
  /**
   * Satırın hangi seçimlerde görüneceği — SUNUCUDA hesaplanıyor.
   *
   * Süzme kuralı ("genel" kayıt her ülkede görünür) tek yerde kalsın diye:
   * istemci bileşeni kuralı tekrar yazmıyor, yalnızca `shownIn.includes(seçim)`
   * diyor. Kural değişirse matchesFilter'ı düzeltmek yetiyor.
   */
  shownIn: UpdateFilter[];
  /** rozetin okunan adı */
  channelLabel: string;
  /** rozetin rengi için ham değer (data-tone) */
  channel: UpdateChannel;
  draft: boolean;
  title: string;
  /** kapalı kartın son satırı — tek satırlık kapsam */
  line: string;
  /* ---- buradan aşağısı yalnızca kart AÇILDIĞINDA görünüyor ---- */
  who: string;
  /** yer tutucuda sorular, yayındaki kayıtta varsa yapılması gereken */
  covers?: string[];
  effectiveLabel?: string;
  effectiveFrom?: string;
  action?: string;
  /** yalnızca yayındaki kayıtta dolu — yer tutucuda alan hiç yok */
  source?: { name: string; url: string };
  related?: { label: string; href: string };
};

/**
 * Yer tutucu gelişme kayıtlarının ORTAK metni — geriye tek kelime kaldı.
 *
 * Önceki turda burada kartın tamamı vardı (özet, "kimi ilgilendiriyor", uyarı
 * cümlesi, ana sayfa için ayrı bir `feedLine`) ve on iki kartta aynen tekrar
 * ediyordu. Müşteri o tekrarı kaldırttı. Her yüzey artık metnini kaydın kendi
 * alanlarından okuyor; ortak kalan tek şey İŞARET.
 *
 * `badge` bilerek tek kelime: kartın üstünde şerit değil, künye satırının
 * içinde küçük bir rozet olarak duruyor.
 */
export const DRAFT_UPDATE_COPY = {
  badge: "Örnek",
} as const;

/** Yayındaki kayıt → çizelge satırı. */
function rowFromUpdate(u: Update): TimelineRow {
  return {
    id: u.id,
    date: u.date,
    dayLabel: shortDate(u.date),
    dateLabel: formatDate(u.date),
    monthKey: u.date.slice(0, 7),
    monthLabel: monthLabel(u.date.slice(0, 7)),
    country: u.country,
    countryLabel: countryLabel(u.country),
    flag: u.country === "genel" ? undefined : u.country,
    shownIn: filtersFor(u.country),
    channelLabel: UPDATE_CHANNEL_LABEL[u.channel],
    channel: u.channel,
    draft: false,
    title: u.title,
    line: u.summary,
    who: u.who,
    effectiveFrom: u.effectiveFrom,
    effectiveLabel: u.effectiveFrom ? formatDate(u.effectiveFrom) : undefined,
    action: u.action,
    source: u.source,
    related: u.related,
  };
}

/** Yer tutucu → çizelge satırı. `source` alanı BİLEREK yazılmıyor. */
function rowFromDraft(d: DraftUpdate): TimelineRow {
  return {
    id: d.id,
    date: d.date,
    dayLabel: shortDate(d.date),
    dateLabel: formatDate(d.date),
    monthKey: d.date.slice(0, 7),
    monthLabel: monthLabel(d.date.slice(0, 7)),
    country: d.country,
    countryLabel: countryLabel(d.country),
    flag: d.country === "genel" ? undefined : d.country,
    shownIn: filtersFor(d.country),
    channelLabel: UPDATE_CHANNEL_LABEL[d.channel],
    channel: d.channel,
    draft: true,
    /* Başlığa "Örnek:" öneki EKLENMİYOR. Önceki turda ekleniyordu ve on iki
       başlığın on ikisi aynı kelimeyle başlıyordu — liste tasarım olarak
       okunamaz hâle geliyordu. İşaret artık künyedeki rozette; bir kere ve
       başlığın dışında. */
    title: d.topic,
    line: d.line,
    who: d.who,
    covers: d.covers,
    related: d.related,
  };
}

/**
 * Çizelgenin tamamı: yayındakiler + yer tutucular, en yeni üstte.
 *
 * İkisi aynı listede duruyor çünkü ziyaretçinin göreceği şey tek bir eksen;
 * ayrım kartın kendisinde yapılıyor, listeyi ikiye bölerek değil. Yayına ilk
 * gerçek kayıt girdiğinde o kart yer tutucuların arasına tarihine göre
 * oturuyor ve tek farkı işaretinin olmaması oluyor.
 */
export function timelineRows(): TimelineRow[] {
  return [...UPDATES.map(rowFromUpdate), ...DRAFT_UPDATES.map(rowFromDraft)].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

/* ============================================================================
   2 · E-KİTAPLAR
   ========================================================================= */

/**
 * İndirilebilir dosya.
 *
 * `file` zorunlu ve public/ altındaki gerçek yolu gösteriyor. `pages` ve
 * `sizeMb` de zorunlu: ikisi de dosyanın kendisinden okunan bilgiler, yani
 * dosya varsa bilinirler. Dosya yoksa kayıt yazılamıyor.
 */
export type Ebook = {
  id: string;
  title: string;
  summary: string;
  country: CountrySlug | "genel";
  /** public/ altındaki yol, örn. "/kaynaklar/dubai-kurulus-rehberi.pdf" */
  file: string;
  format: "PDF";
  pages: number;
  sizeMb: number;
  /** dosyanın kendi güncellenme tarihi (ISO) */
  updatedAt: string;
};

/**
 * Yayındaki e-kitaplar.
 *
 * BİLEREK BOŞ. `public/` altında tek bir PDF yok — depo kontrol edildi. Üç
 * "rehber" kaydı sitede üç yerde birden listeleniyordu (ana sayfa, navbar,
 * /kaynaklar) ve üçü de indirilemiyordu: tıklayan ziyaretçi dosya yerine
 * başka bir sayfaya gidiyordu.
 */
export const EBOOKS: Ebook[] = [];

/**
 * SWAP:EBOOK_FILES — dosyası olmayan yer tutucular. Raf bu diziden basılıyor.
 *
 * TİPİ `Ebook` DEĞİL: `file`, `sizeMb` ve `updatedAt` alanları YOK. Yani
 * EBOOKS'a kopyalanamıyor, JSON-LD'ye `DigitalDocument` olarak giremiyor ve
 * `download` niteliğiyle bir bağlantıya bağlanamıyor — tıklanınca dosya
 * indiren tek işaretleme o ve bu kayıtlarda kurulamıyor.
 *
 * `plannedPages` PLANLANAN uzunluk, ölçülmüş değil; ekranda da "~" ile
 * basılıyor. Dosya olmadan sayfa sayısı ölçülemez, kesin bir sayı yazmak
 * uydurma olurdu.
 *
 * `scope` bir KAPSAM tarifi: dosyanın hangi konuları toplayacağını söylüyor,
 * o konularda bir şey İDDİA ETMİYOR — dizide tek bir oran, tutar ya da tarih
 * yok. Kural DRAFT_UPDATES'teki ile aynı.
 */
export type DraftEbook = {
  id: string;
  title: string;
  /** dosyanın KAPSAMI — planlanan içerik, yayınlanmış bir iddia değil */
  scope: string;
  country: CountrySlug | "genel";
  format: "PDF";
  /** planlanan uzunluk; ekranda "~" ile basılıyor */
  plannedPages: number;
  /**
   * ISO — kaydın TARİHLİ AKIŞTAKİ yeri (ana sayfa dizini). Bir yayın tarihi
   * değil; `Ebook.updatedAt` gibi dosyadan okunmuş bir bilgi de değil, çünkü
   * dosya yok. Ayrı isimde duruyor ki `Ebook`e kopyalanınca yanlış alana
   * düşmesin.
   */
  addedAt: string;
};

export const DRAFT_EBOOKS: DraftEbook[] = [
  {
    id: "de-dubai-kurulus",
    title: "Dubai kuruluş rehberi",
    scope:
      "Yapı seçimi, kuruluş adımları, evrak listesi ve kuruluş sonrası yükümlülükler tek dosyada.",
    country: "dubai",
    format: "PDF",
    plannedPages: 32,
    addedAt: "2026-07-18",
  },
  {
    id: "de-dubai-bolge",
    title: "Serbest bölge karşılaştırma defteri",
    scope:
      "Serbest bölgelerin aynı ölçütlerle yan yana konduğu tablo: faaliyet başlıkları, ofis tipleri ve vize tarafı.",
    country: "dubai",
    format: "PDF",
    plannedPages: 28,
    addedAt: "2026-07-02",
  },
  {
    id: "de-ingiltere-ltd",
    title: "İngiltere Ltd el kitabı",
    scope:
      "Limited şirketin kuruluş akışı, kayıtlı adres tarafı ve kuruluştan sonra tekrar eden kalemler.",
    country: "ingiltere",
    format: "PDF",
    plannedPages: 24,
    addedAt: "2026-06-30",
  },
  {
    id: "de-ingiltere-takvim",
    title: "İngiltere'de kuruluş sonrası takvim",
    scope: "Hesap dönemi, bildirim kalemleri ve bunların birbirine bağlanma sırası.",
    country: "ingiltere",
    format: "PDF",
    plannedPages: 16,
    addedAt: "2026-06-11",
  },
  {
    id: "de-kktc-baslangic",
    title: "KKTC başlangıç rehberi",
    scope: "Yerel tescil akışı, kurumsal hesap tarafı ve kuruluş sonrası işleyiş.",
    country: "kktc",
    format: "PDF",
    plannedPages: 18,
    addedAt: "2026-05-14",
  },
  {
    id: "de-kktc-ortaklik",
    title: "KKTC'de ortaklık ve pay yapısı",
    scope: "Ortaklık kurulumu, pay devri adımları ve kayıtlara işleme tarafı.",
    country: "kktc",
    format: "PDF",
    plannedPages: 14,
    addedAt: "2026-04-30",
  },
  {
    id: "de-genel-kiyas",
    title: "Üç ülke karşılaştırma defteri",
    scope:
      "Dubai, İngiltere ve KKTC'nin aynı ölçütlerle yan yana konduğu tablo; her ülkenin dürüst kısıtı da aynı sayfada.",
    country: "genel",
    format: "PDF",
    plannedPages: 12,
    addedAt: "2026-04-24",
  },
  {
    id: "de-genel-banka",
    title: "Kurumsal hesap belge seti",
    scope: "Hesap açılışında istenen belgelerin ülkeye göre ayrılmış kontrol listesi.",
    country: "genel",
    format: "PDF",
    plannedPages: 14,
    addedAt: "2026-03-27",
  },
  {
    id: "de-genel-ilk-yil",
    title: "Kuruluş sonrası ilk 12 ay",
    scope: "Şirket kurulduktan sonra doğan kalemlerin ay ay sıralandığı çalışma defteri.",
    country: "genel",
    format: "PDF",
    plannedPages: 20,
    addedAt: "2026-03-06",
  },
  {
    id: "de-genel-sozluk",
    title: "Vergi ve beyan sözlüğü",
    scope: "Üç ülkenin belgelerinde geçen terimlerin karşılıklarını veren sözlük.",
    country: "genel",
    format: "PDF",
    plannedPages: 22,
    addedAt: "2026-02-13",
  },
];

/**
 * Yer tutucu e-kitapların ORTAK metni.
 *
 * Müşteri: "tıklayınca bir şey inmicek o kadar" — yani bunu söylemenin yolu
 * bir uyarı paneli değil. `disabledNote` indirme düğmesinin YANINDA tek satır
 * olarak duruyor, düğmenin kendisi de `disabled`. Kırık bağlantı ya da sahte
 * indirme yok: `DraftEbook`ta `file` alanı olmadığı için kurulamıyor da.
 */
export const DRAFT_EBOOK_COPY = {
  badge: "Örnek",
  /** devre dışı indirme düğmesinin yanındaki tek satır */
  disabledNote: "Dosya hazırlandığında bu düğme açılacak.",
  /** düğmenin üstündeki metin — indirme vaadi taşımıyor */
  disabledLabel: "Hazırlanıyor",
} as const;

/** En yeni üstte. */
export function sortedEbooks(): Ebook[] {
  return [...EBOOKS].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

/* ============================================================================
   3 · ÜLKE REHBERLERİ — gerçek adreslerden kurulu yol
   ========================================================================= */

export type GuideChapter = {
  /** bölümün adı — ziyaretçinin sorusu, bizim başlığımız değil */
  q: string;
  /** tek satır özet; mümkün olan her yerde ülke verisinden türüyor */
  line: string;
  /** GERÇEK adres: sayfa ya da o sayfadaki çapa. Uydurma adres yok. */
  href: string;
};

export type Guide = {
  country: CountrySlug;
  /** /rehberler sayfasındaki çapa */
  anchor: string;
  name: string;
  /** ülke sayfasının kendi tanıtım satırı */
  tagline: string;
  lead: string;
  /** künye şeridi: üç ölçü, hepsi brand.ts FACTS'ten */
  facts: { k: string; v: string }[];
  /** ülkenin dürüst kısıtı — rehberde de saklanmıyor */
  limit: string;
  chapters: GuideChapter[];
  /** ülke sayfası */
  href: string;
  /** bu ülkeyle ilgili yayınlanmış yazılar (blog.ts'ten) */
  posts: { slug: string; title: string; summary: string; publishedAt: string }[];
};

/**
 * Bir ülkenin yolu.
 *
 * Bölümler ülkenin kendi verisinden türüyor, elle yazılmıyor. İki bölüm
 * koşullu:
 *   · "yapı seçimi" yalnızca countryContent'te `structures` doluysa (bugün
 *     sadece Dubai) — ülke sayfasında o bölüm de koşullu basılıyor, yani
 *     olmayan bir çapaya bağlanmıyoruz.
 *   · "kuruluş sonrası" yalnızca afterSetup.ts o ülkeyi taşıyorsa (bugün
 *     sadece Dubai).
 * Kalan bölümlerin hepsinin karşılığı üç ülkede de var (ulke/[slug]/page.tsx).
 */
function buildGuide(country: CountrySlug): Guide {
  const c = COUNTRY_CONTENT[country];
  const f = FACTS[country];
  const base = `/${country}`;
  const after = AFTER_SETUP[country];

  const chapters: GuideChapter[] = [
    {
      q: "Bu ülke kimin işine yarıyor?",
      line: f.forWhom,
      href: base,
    },
  ];

  /* Yapı seçimi — ülke sayfasında `c.structures &&` ile basılıyor (bkz.
     app/ulke/[slug]/page.tsx). Veri yoksa çapa da yok. */
  if (c.structures) {
    chapters.push({
      q: "Hangi yapıyı seçmeliyim?",
      line: c.structures.rule,
      href: `${base}#yapi`,
    });
  }

  chapters.push(
    {
      q: "Kuruluş ne kadar tutuyor?",
      line: `${f.fromLabel}'dan başlıyor; yapı, faaliyet ve ofis tipi tutarı değiştiriyor.`,
      href: `${base}#fiyat`,
    },
    {
      q: "Süreç nasıl işliyor?",
      /* Adım sayısı veriden: bir adım eklendiğinde bu satır kendiliğinden
         doğru kalıyor. */
      line: `${c.steps.length} adım, tipik süre ${f.days}.`,
      href: `${base}#surec`,
    },
    {
      q: "Hangi evrak isteniyor?",
      line: `${c.docs.groups.length} başlıkta toplanıyor; listeyi işaretleyip kopyalayabiliyorsunuz.`,
      href: `${base}#evrak`,
    },
    {
      q: "Vergi tarafı ne durumda?",
      line: `Yayınlanan çerçeve ${c.tax.rows.length} kalem; oranı konuşmadan önce kayıt yükümlülüğü var.`,
      href: `${base}#vergi`,
    },
    {
      q: "Parayı nasıl tahsil eder, nasıl çıkarırım?",
      line: "Banka, tahsilat kanalları ve transfer tarafı tek bölümde.",
      href: `${base}#para-transferi`,
    },
  );

  if (after) {
    chapters.push({
      q: "Şirket kurulduktan sonra ne çıkıyor?",
      line: `${after.items.length} kalem yükümlülük; hangisi ne zaman doğuyor.`,
      href: `${base}#kurulus-sonrasi`,
    });
  }

  return {
    country,
    anchor: country,
    name: COUNTRY_NAME[country],
    tagline: c.tagline,
    lead: c.intro,
    facts: [
      { k: "Kuruluş", v: `${f.fromLabel}'dan` },
      { k: "Tipik süre", v: f.days },
      { k: "Yapı", v: f.structure },
    ],
    limit: f.limit,
    chapters,
    href: base,
    posts: postsForCountry(country).map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      publishedAt: p.publishedAt,
    })),
  };
}

/**
 * DİKKAT — ARTIK REHBER SAYFASININ KAYNAĞI DEĞİL.
 *
 * Bu turda rehberler blogun bir TÜRÜ oldu (`BlogPost.kind === "rehber"`) ve
 * /blog/rehberler kendi listesini `postsOfKind("rehber")`ten kuruyor. Yani
 * yukarıdaki "yol" modeli yayında bir sayfa BASMIYOR — ama hâlâ tek bir işi
 * var: hub'daki rehber kapısı, yayınlanmış rehber olmadığında önizlemesini
 * buradan kuruyor (components/kaynaklar/KynDoors.tsx). Uydurma değil, ülkenin
 * kendi verisinden hesaplanıyor.
 *
 * Hiçbir SAYIM bunu okumuyor — bkz. countOf ve shelfCountOf. Yalnızca
 * yedek önizleme kaynağı.
 */
export const GUIDES: Guide[] = COUNTRY_ORDER.map(buildGuide);

/* ============================================================================
   4 · SAYAÇLAR — hub'daki kapılar bunları okuyor
   ========================================================================= */

/**
 * Bir türde kaç YAYIN var.
 *
 * Hub'daki kapı bu sayıya bakıyor: sıfırsa önizleme satırı hiç basılmıyor,
 * kapının kendisi "hazırlanıyor" durumuna geçiyor. Sayı elle yazılmıyor ki
 * bir kayıt eklendiğinde hub kendiliğinden canlansın.
 *
 * REHBER SAYIMI DEĞİŞTİ. Eskiden GUIDES.length'ti, yani "kaç ülkenin yolu
 * var" demekti ve üç dönüyordu. Rehber blogun bir türü olunca o sayının
 * karşılığı kalmadı: kapı "3 yayın" derken /blog/rehberler'de yayınlanmış tek
 * rehber olmayacaktı — sayının vaat ettiği şey sayfada yoktu. Şimdi sayım
 * gerçekten yayınlanmış rehberleri sayıyor (bugün 0, üç tanesi taslak) ve
 * kapı dürüstçe "Hazırlanıyor" diyor.
 *
 * Taslaklar HİÇBİR sayıma girmiyor: `postsOfKind` yalnızca yayınlanmışları
 * döndürüyor (bkz. lib/blog.ts · sortedPosts). Bu, bu dosyanın gelişme ve
 * e-kitap tarafındaki kuralının aynısı — yer tutucu sayılmaz, işaretlenir.
 */
export function countOf(kind: ResourceKind): number {
  switch (kind) {
    /* `publishedPosts` / `publishedOfKind` — `BLOG_POSTS` ve `postsOfKind`
       DEĞİL. Blog tarafı da bu turda doldu ve yer tutucuları aynı diziye
       koydu (ayrım `BlogPost.placeholder` alanında). Yani `BLOG_POSTS.length`
       artık "kaç yayın var" sorusuna cevap vermiyor. */
    case "blog":
      return publishedPosts().length;
    case "rehber":
      return publishedOfKind("rehber").length;
    case "gelisme":
      return UPDATES.length;
    case "ekitap":
      return EBOOKS.length;
  }
}

/**
 * Türün SAYFASINDA kaç kayıt listeleniyor — yayındakiler + yer tutucular.
 *
 * `countOf`tan ayrı duruyor çünkü ikisi ayrı soruya cevap veriyor:
 *   countOf     · "kaç YAYIN var" — JSON-LD ve içerik kararları için.
 *   shelfCountOf· "ziyaretçi o sayfada kaç kart görecek" — kapı ve şerit için.
 *
 * Kapıdaki rakam ile tıklayınca çıkan liste hiçbir zaman ayrışmasın diye
 * bu ikinci sayım gerekiyordu: gelişmeler sayfasında 22 kart varken kapının
 * "Hazırlanıyor" demesi, sayfayı görmüş kişi için doğrudan bir hata.
 *
 * Birim bilerek "kayıt", "yayın" değil: listedeki kartların bir kısmı örnek
 * ve rozetiyle öyle işaretli. "22 yayın" demek onları yayınlanmış saymak
 * olurdu; "22 kayıt" ise sayfada gerçekten duran şeyi söylüyor.
 *
 * Blog ve rehber sayımı lib/blog.ts'ten geliyor — burada elle sabit
 * yazılmıyor ki yazılar eklendikçe kapılar kendiliğinden doğru kalsın. Orada
 * da yer tutucular yayınlanmışlarla aynı dizide duruyor ve ayrım kaydın kendi
 * `placeholder` alanında; yani `BLOG_POSTS` / `postsOfKind` tam olarak bu
 * fonksiyonun sorduğu şeyi sayıyor: sayfada kaç kart var.
 */
export function shelfCountOf(kind: ResourceKind): number {
  switch (kind) {
    case "blog":
      return BLOG_POSTS.length;
    case "rehber":
      return postsOfKind("rehber").length;
    case "gelisme":
      return UPDATES.length + DRAFT_UPDATES.length;
    case "ekitap":
      return EBOOKS.length + DRAFT_EBOOKS.length;
  }
}

/* ------------------------------------------------------------------ biçim */

const AYLAR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

/**
 * "2026-07" → "Temmuz 2026".
 *
 * Intl + new Date kullanılmıyor: blog.ts'teki formatDate ile aynı sebep —
 * "2026-07-01" UTC gece yarısına çözülüyor ve sunucu saat dilimi geride
 * kalırsa ay bir geri kayıyor.
 */
export function monthLabel(key: string): string {
  const [y, m] = key.split("-");
  const ay = AYLAR[Number(m) - 1];
  if (!y || !ay) return key;
  return `${ay} ${y}`;
}

/** Ülke rozeti: kayıt üç ülkeden birine ait olabilir ya da hepsini ilgilendirir. */
export function countryLabel(c: CountrySlug | "genel"): string {
  return c === "genel" ? "Üç ülke" : COUNTRY_NAME[c];
}

/**
 * "2026-07-12" → "12 Tem".
 *
 * Eksenin sol sütunu için. Tam tarih (formatDate) 132px'lik sütunda iki
 * satıra sarıyor ve tarihler alt alta hizalanmıyor; kısaltma hizayı koruyor.
 * Kartın içinde tam tarih zaten yazıyor, yani bilgi kaybolmuyor.
 */
export function shortDate(iso: string): string {
  const [, m, d] = iso.split("-");
  const ay = AYLAR[Number(m) - 1];
  if (!ay || !d) return iso;
  return `${Number(d)} ${ay.slice(0, 3)}`;
}

/* ------------------------------------------------------- ülke seçici (akış)

   Müşteri: "ülke seçme olmalı ülkeye geldiğinde o ülkedeki gelişmeleri
   görücez gibi düşün."

   Seçenekler burada duruyor ki hem çizelge hem de ileride başka bir yüzey
   (ör. ana sayfa akışı) aynı listeyi okusun. "hepsi" ilk sırada: sayfaya
   gelen kişi önce her şeyi görüyor, sonra daraltıyor. */
export const UPDATE_FILTERS = ["hepsi", ...COUNTRY_ORDER] as const;
export type UpdateFilter = (typeof UPDATE_FILTERS)[number];

export const UPDATE_FILTER_LABEL: Record<UpdateFilter, string> = {
  hepsi: "Hepsi",
  dubai: COUNTRY_NAME.dubai,
  ingiltere: COUNTRY_NAME.ingiltere,
  kktc: COUNTRY_NAME.kktc,
};

/**
 * Bir kayıt seçilen ülkede görünür mü?
 *
 * "genel" kayıtlar HER ülkede görünüyor: üç ülkeyi birden ilgilendiren bir
 * değişikliği Dubai'yi seçen kişiden saklamak, onu ilgilendirmediğini
 * söylemek olurdu. Seçici bunu bir satırla ekranda da yazıyor.
 */
export function matchesFilter(country: CountrySlug | "genel", f: UpdateFilter): boolean {
  return f === "hepsi" || country === f || country === "genel";
}

/** Bir kaydın göründüğü seçimlerin listesi — TimelineRow.shownIn bunu taşıyor. */
export function filtersFor(country: CountrySlug | "genel"): UpdateFilter[] {
  return UPDATE_FILTERS.filter((f) => matchesFilter(country, f));
}

/**
 * Seçicinin ekranda görünen hâli — SUNUCUDA hazırlanıyor.
 *
 * Müşteri: "ülke seçtirme yerini daha dinamik yapabilirsin bayraklı iconlu vb
 * bilmiyorum çok pasif duruyor." Bayrağı basmak için seçeneğin ülke slug'ına
 * ihtiyaç var; "hepsi" seçeneğinde slug YOK ve olmamalı — üç ülkeyi birden
 * gösteren bir seçeneğin tek bayrağı olamaz, orada küre simgesi basılıyor.
 *
 * Liste burada kuruluyor ki istemci bileşeni `@/lib/resources`ı değer olarak
 * import etmesin (bkz. KynTimeline başlığı: GUIDES üzerinden countryContent,
 * afterSetup ve blog istemci paketine girerdi).
 */
export type UpdateFilterOption = {
  id: UpdateFilter;
  label: string;
  /** "hepsi"de yok — bayrak yerine küre simgesi basılıyor */
  flag?: CountrySlug;
};

export function updateFilterOptions(): UpdateFilterOption[] {
  return UPDATE_FILTERS.map((id) => ({
    id,
    label: UPDATE_FILTER_LABEL[id],
    flag: id === "hepsi" ? undefined : id,
  }));
}
