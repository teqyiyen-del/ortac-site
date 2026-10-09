/* ============================================================================
   DUBAİ · AML VE MEVZUAT UYUMU — sayfanın bütün metni ve ORTAK VERİ BİÇİMİ
   Sayfa: app/dubai/aml-uyum/page.tsx · Gövde: components/services/AmlSayfa.tsx
   Biçim: css/svc-aml.css (.sam-)

   09.10.2026 · İLK YAZIM. Burak: "AML ve mevzuat da çok kısa, hiçbir şey yok.
   Üç dört kart koymuşsun, bitmiş. Banka, şirket kuruluşu, muhasebe çok güzel
   oldu: SVG görseller var, animasyonlar var. Az detaylandır, güzelliği yap."
   Önceki hâl genel hizmet şablonuydu (lib/hizmetIcerik.ts · DUBAI · aml-uyum:
   üç kart, dört kural, dört adım). O kayıt duruyor, bu sayfa onu basmıyor.

   SAYFANIN EN DEĞERLİ BİLGİSİ: hangi yükümlülük HER şirkette var, hangisi
   YALNIZ BELİRLİ FAALİYETLERDE. Bütün bölümler bu ayrımı taşıyor (karar
   şeması, yükümlülük kartlarının etiketi, SSS'in ilk sorusu).

   FİYAT, SÜRE TAAHHÜDÜ, MÜŞTERİ SAYISI YOK. CTA "İletişime geçin" (hizmet
   sayfaları ayrı satılmıyor; bankaDubai.ts · hero.cta notu).

   ------------------------------------------------------------ KAYNAK DÜZENİ
   Kontrol tarihi 09.10.2026. Her olgu şu üç kaynaktan birinden:
     [RESMÎ]   resmî sayfada okundu:
       · moet.gov.ae/en/financial-crimes-legislations (yürürlükteki liste:
         10/2025 sayılı Federal Kararname-Kanun, 134/2025 uygulama
         yönetmeliği, 74/2020 terör listeleri, 109/2023 gerçek faydalanıcı,
         132/2023 ve 71/2024 idari cezalar)
       · moet.gov.ae/en/aml ve Bakanlığın haber sayfaları (denetlediği dört
         grup: gayrimenkul aracıları, kıymetli maden ve taş tüccarları,
         muhasebeci ve denetçiler, kurumsal hizmet sağlayıcılar; goAML kaydı
         lisanstan hemen sonra; 2023'te kaydolmayan 50 işletmeye üç ay
         durdurma)
       · Bakanlığın 2026 kıymetli maden rehberi (55.000 AED eşiği)
       · mof.gov.ae haberi, 14.10.2024 (ESR: 31.12.2022'den sonra biten
         mali yıllar için bildirim ve rapor yok; Kabine Kararı 98/2024)
     [BELGE]   Dubai teklif belgesi (hizmetIcerik.ts'teki kaydın kaynağı:
               KYC ve şirket belgeleri, UBO ve kurumsal kayıtların
               güncellenmesi, banka maddeleri) ve yayındaki banka sayfası.
     [İKİNCİL] resmî metni açılamayan (uaelegislation.gov.ae 403 verdi),
               hukuk bürosu özetlerinden okunan: %25 eşiği, "eşiği geçen
               yoksa kontrol eden, o da yoksa üst yönetici", üçüncü ihlalde
               lisansın askıya alınması. Üçü de birden çok kaynakta aynı.

   BİLEREK YAZILMAYANLAR (doğrulanamadı ya da kaynaklar çelişiyor):
     · gerçek faydalanıcı değişikliğini bildirme süresi (15 gün diyen de var,
       demeyen de) → "değişince güncelleniyor"
     · ceza tutarları (yeni yasanın cetveli birincil kaynaktan okunamadı)
     · kayıt saklama süresi yıl olarak → "yasal süre boyunca"
     · gerçek faydalanıcı kaydının kamuya açık olup olmadığı
   SWAP:AML_KAPSAM · "ne yapıyoruz" maddeleri services.ts'teki üç maddeden
   (AML uyumu, UBO bildirimi, goAML kaydı ve desteği; Murat Bey'in listesi)
   genişletildi: risk değerlendirmesi ve iç politika metinleri Burak'ın bu
   turdaki brifinden. Murat Bey doğrulayacak (docs/teslim/bilgi-ve-murat.md).
   ========================================================================= */

import type { Faq } from "@/lib/countryContent";

export type AmlIkon =
  | "kalkan" | "parmak" | "dosya" | "banka" | "ara" | "liste" | "zil" | "terazi"
  | "takvim" | "kisi" | "kisiler" | "bina" | "nakit" | "kimlik" | "posta" | "defter"
  | "ceza" | "dur" | "kilit" | "sil" | "hesap" | "el" | "pusula" | "arsiv";

/** Yükümlülük kimin: her şirket (mavi) · yalnız belirli faaliyet (amber, şart)
 *  · kalkmış kural (gri; Dubai'de ESR). */
export type AmlKim = "herkes" | "belirli" | "kalkti";

type Bas = { id: string; heading: string; accent: string; lead: string };
type Madde = { icon: AmlIkon; title: string; line: string };

export type AmlVeri = {
  ulke: string;
  /** künye ve yapısal veri için: "/dubai/aml-uyum" */
  yol: string;
  seo: { title: string; description: string };
  hero: { crumb: string; title: string; accent: string; lead: string; cta: { label: string; href: string }; rozetler: string[] };
  /** KARAR ŞEMASI · kök → iki kol */
  kim: Bas & {
    kok: string;
    herkes: { etiket: string; baslik: string; maddeler: string[] };
    belirli: { etiket: string; soru: string; faaliyetler: string[]; kopru: string; maddeler: string[] };
    not: string;
  };
  kapsam: Bas & { var: { title: string; items: string[] }; yok: { title: string; items: string[] } };
  /** açılır kartlar: üstte ad ve tek cümle, içinde üç cevap */
  yukum: Bas & {
    sorular: { ne: string; zaman: string; biz: string };
    items: { icon: AmlIkon; kim: AmlKim; etiket: string; title: string; line: string; ne: string; zaman: string; biz: string }[];
  };
  /** GERÇEK FAYDALANICI ZİNCİRİ · iki kişi, bir ara şirket, sizin şirket */
  zincir: Bas & {
    sahne: { kisiA: string; kisiB: string; ara: string; sirket: string; payA: string; payAra: string; payB: string; alt: string };
    points: Madde[];
  };
  /** TARAMA AKIŞI · beş durak, sırası sabit (çizimler durağa bağlı) */
  tarama: Bas & { duraklar: { title: string; line: string }[]; exit: { href: string; label: string } };
  /** UYUM DÖNGÜSÜ · halkadaki dilim sayısı = madde sayısı */
  takvim: Bas & { orta: string; items: { zaman: string; title: string; line: string; ton?: "amber" }[] };
  sonuc: Bas & { items: Madde[] };
  ilgili: Bas & { items: (Madde & { href: string })[] };
  faq: { id: string; heading: string; accent: string; items: Faq[] };
  closing: { title: string; accent: string; cta: { label: string; href: string } };
};

export const AML_DUBAI: AmlVeri = {
  ulke: "Dubai",
  yol: "/dubai/aml-uyum",
  seo: {
    title: "Dubai'de AML ve Mevzuat Uyumu: goAML, UBO Kaydı | Ortac Global",
    description:
      "Dubai şirketiniz hangi uyum yükümlülüğüne giriyor? Gerçek faydalanıcı (UBO) kaydı, goAML, yaptırım listesi taraması ve ESR'nin güncel durumu.",
  },
  hero: {
    crumb: "Dubai · AML ve mevzuat uyumu",
    title: "Dubai'de AML ve mevzuat uyumu.",
    accent: "AML ve mevzuat uyumu.",
    lead: "Kara para aklamanın önlenmesi kuralları her şirkete aynı yükü getirmiyor. Şirketinizin hangi kayıt ve bildirime girdiğini belirliyor, girdiklerini biz takip ediyoruz.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
    /* PageHero · rozetIkon metne göre ikon seçiyor (faydalanıcı → parmak izi,
       goAML → dosya, uyum → kalkan). */
    rozetler: ["Gerçek faydalanıcı kaydı her şirkette", "goAML yalnız belirli faaliyetlerde", "Mevzuat uyumu tek ekipten"],
  },

  /* ---------------------------------------------------------- kimler için
     [RESMÎ] dört grup Ekonomi Bakanlığı'nın denetlediği gruplar; hukuk
     meslekleri Adalet Bakanlığı'nda (71/2024'ün başlığı ikisini birlikte
     anıyor). [BELGE] soldaki kol hizmetIcerik.ts'teki onaylı cümlelerle aynı. */
  kim: {
    id: "kimler",
    heading: "Şirketiniz hangi yükümlülüğe giriyor?",
    accent: "hangi yükümlülüğe giriyor?",
    lead: "Bazı kurallar her şirket için geçerli. Bazıları yalnız belirli işleri yapanlara uygulanıyor.",
    kok: "Dubai şirketiniz",
    herkes: {
      etiket: "Her şirket",
      baslik: "Faaliyet ne olursa olsun",
      maddeler: [
        "Gerçek faydalanıcı (UBO) kaydı",
        "Ortak ve yönetici kayıtlarının güncel tutulması",
        "Bankanın müşterini tanı sorularına belgeli cevap",
      ],
    },
    belirli: {
      etiket: "Yalnız belirli faaliyetler",
      soru: "Faaliyetiniz bu listede mi?",
      faaliyetler: [
        "Gayrimenkul aracılığı",
        "Kıymetli maden ve taş ticareti",
        "Muhasebe ve denetim",
        "Kurumsal hizmet sağlayıcılığı",
        "Hukuk hizmetleri",
      ],
      kopru: "Listedeyse bunlar ekleniyor",
      maddeler: [
        "goAML kaydı",
        "Müşteri tanıma ve yaptırım listesi taraması",
        "Şüpheli işlem bildirimi",
        "Risk değerlendirmesi, iç politika ve uyum görevlisi",
      ],
    },
    not: "Genel ticaret, danışmanlık ve e-ticaret şirketleri çoğunlukla yalnız ilk grupta kalıyor.",
  },

  /* ------------------------------------------------------------- kapsam
     SWAP:AML_KAPSAM (dosya başı). "Kapsam dışı" maddeleri sitenin genel
     sınırlarıyla aynı: hukuki görüş vermiyoruz, bankanın kararını biz
     vermiyoruz (brand.ts · STANCE_LIMITS, bankaDubai.ts). */
  kapsam: {
    id: "kapsam",
    heading: "Uyumda neyi üstleniyoruz?",
    accent: "neyi üstleniyoruz?",
    lead: "Önce size hangi kuralın işlediğini netleştiriyoruz, sonra o kuralların kaydını tutuyoruz.",
    var: {
      title: "Üstlendiklerimiz",
      items: [
        "Faaliyetinize hangi yükümlülüğün işlediğinin tespiti",
        "Gerçek faydalanıcı kaydının açılması ve güncellenmesi",
        "goAML kaydı ve kullanım desteği",
        "Risk değerlendirmesi ve iç politika metinleri",
        "Bankanın uyum soruları için dosya hazırlığı",
      ],
    },
    yok: {
      title: "Kapsam dışında",
      items: [
        "Hukuki görüş ve savunma",
        "Şüpheli işlem bildirimi kararı (şirketin uyum görevlisinde)",
        "Bankanın hesap kararı",
        "Denetimde kesilen idari cezalar",
      ],
    },
  },

  /* -------------------------------------------------------- yükümlülükler */
  yukum: {
    id: "yukumlulukler",
    heading: "Yükümlülükler tek tek.",
    accent: "tek tek.",
    lead: "Her kartın etiketi kimin için olduğunu söylüyor. Ayrıntı için karta dokunun.",
    sorular: { ne: "Ne isteniyor?", zaman: "Ne zaman?", biz: "Biz ne yapıyoruz?" },
    items: [
      {
        icon: "parmak", kim: "herkes", etiket: "Her şirket",
        title: "Gerçek faydalanıcı (UBO) kaydı",
        line: "Şirketin arkasındaki gerçek kişiyi gösteren kayıt.",
        /* [İKİNCİL] %25; [RESMÎ] 109/2023 */
        ne: "Şirketin en az %25'ine sahip olan ya da onu başka yolla kontrol eden gerçek kişiler kayda yazılıyor.",
        zaman: "Kuruluşta açılıyor; ortaklık ya da kontrol değişince güncelleniyor.",
        biz: "Kaydı açıyor, değişiklikleri lisans otoritesine bildiriyoruz.",
      },
      {
        icon: "kisiler", kim: "herkes", etiket: "Her şirket",
        title: "Ortak ve yönetici kayıtları",
        line: "Ortakların ve yöneticilerin güncel listesi.",
        ne: "Ortakların ve yöneticilerin kaydı tutuluyor; bilgiler lisans otoritesindeki kayıtla aynı olmalı.",
        zaman: "Sürekli. Ortak, yönetici ya da faaliyet değişince güncelleniyor.",
        biz: "Değişikliği bize bildirmeniz yeterli; kayıtları biz güncelliyoruz.",
      },
      {
        icon: "banka", kim: "herkes", etiket: "Her şirket",
        title: "Bankanın müşterini tanı (KYC) soruları",
        line: "Hesap açarken ve sonrasında bankanın görmek istedikleri.",
        /* [BELGE] hizmetIcerik.ts · kurallar · "Banka da soruyor" */
        ne: "Ortaklık yapınız, gerçek faaliyetiniz ve paranın kaynağı belgeyle gösteriliyor.",
        zaman: "Hesap açılışında ve bankanın dönemsel güncellemelerinde.",
        biz: "Dosyayı bankanın istediği biçimde hazırlıyoruz; kararı banka veriyor.",
      },
      {
        icon: "dosya", kim: "belirli", etiket: "Faaliyete göre",
        title: "goAML kaydı",
        line: "Mali İstihbarat Birimi'nin bildirim sistemi.",
        /* [RESMÎ] Bakanlık SSS'i: kayıt lisanstan hemen sonra */
        ne: "Belirlenmiş finans dışı iş ve meslekler sisteme kaydoluyor; bildirimler buradan yapılıyor.",
        zaman: "Ticaret lisansı alındıktan hemen sonra.",
        biz: "Kaydı açıyor, sistemin nasıl kullanılacağını gösteriyoruz.",
      },
      {
        icon: "liste", kim: "belirli", etiket: "Faaliyete göre",
        title: "Müşteri tanıma ve yaptırım listesi taraması",
        line: "Kiminle iş yaptığınızı belgeyle bilmek.",
        /* [RESMÎ] 74/2020: BM Güvenlik Konseyi listeleri ve BAE yerel listesi */
        ne: "Müşterinin kimliği doğrulanıyor, gerçek faydalanıcısı belirleniyor ve adı yaptırım listelerinde aranıyor.",
        zaman: "İş ilişkisi kurulmadan önce ve ilişki sürdükçe.",
        biz: "Tarama düzenini ve tutulacak kayıt biçimini birlikte kuruyoruz.",
      },
      {
        icon: "zil", kim: "belirli", etiket: "Faaliyete göre",
        title: "Şüpheli işlem bildirimi",
        line: "Şüphe doğuran işlemin birime bildirilmesi.",
        ne: "Şüphe doğuran işlem ya da girişim goAML üzerinden Mali İstihbarat Birimi'ne bildiriliyor.",
        zaman: "Şüphe oluştuğunda, gecikmeden.",
        biz: "Adımları yazılı hâle getiriyoruz; bildirim kararı şirketin uyum görevlisinde.",
      },
      {
        icon: "nakit", kim: "belirli", etiket: "Faaliyete göre",
        title: "Eşik üstü işlem raporları",
        line: "Kıymetli maden ve gayrimenkul işlerine özel.",
        /* [RESMÎ] Bakanlığın 2026 rehberi (55.000 AED) ve 5/2022 genelgesi
           (gayrimenkul işlem raporu) */
        ne: "Kıymetli maden ve taş ticaretinde 55.000 AED ve üzeri nakit işlemler raporlanıyor; gayrimenkulde ayrı bir işlem raporu var.",
        zaman: "İşlemle birlikte.",
        biz: "Hangi işlemin rapora girdiğini ayırıyor, raporun biçimini gösteriyoruz.",
      },
      {
        icon: "pusula", kim: "belirli", etiket: "Faaliyete göre",
        title: "Risk değerlendirmesi ve iç politika",
        line: "Şirketin kendi riskini yazıyla ortaya koyması.",
        ne: "Yazılı risk değerlendirmesi, politika ve prosedürler hazırlanıyor; bir uyum görevlisi atanıyor.",
        zaman: "Faaliyete başlarken; iş değiştikçe gözden geçiriliyor.",
        biz: "Metinleri faaliyetinize göre hazırlıyoruz.",
      },
      {
        icon: "arsiv", kim: "kalkti", etiket: "Artık yok",
        title: "Ekonomik varlık bildirimi (ESR)",
        line: "Eski bir yükümlülük; güncel durumu çok soruluyor.",
        /* [RESMÎ] mof.gov.ae, 14.10.2024 · Kabine Kararı 98/2024 */
        ne: "31 Aralık 2022'den sonra biten mali yıllar için bildirim ve rapor yükümlülüğü kaldırıldı.",
        zaman: "2019-2022 dönemlerine ait yükümlülükler ise duruyor.",
        biz: "Eski döneme ait dosyanız varsa durumuna bakıyoruz.",
      },
    ],
  },

  /* ----------------------------------------------------- gerçek faydalanıcı
     Sahnedeki paylar GÖSTERİM: A, ara şirketin tamamına sahip ve ara şirket
     şirketin %60'ını tutuyor (dolaylı %60); B doğrudan %40. İkisi de eşiğin
     üstünde. */
  zincir: {
    id: "gercek-faydalanici",
    heading: "Gerçek faydalanıcı kim sayılıyor?",
    accent: "kim sayılıyor?",
    lead: "Kayıt şirkete değil, zincirin sonundaki gerçek kişiye bakıyor.",
    sahne: {
      kisiA: "Ortak A",
      kisiB: "Ortak B",
      ara: "Ara şirket",
      sirket: "Şirketiniz",
      payA: "%100",
      payAra: "%60",
      payB: "%40",
      alt: "İkisi de eşiğin üstünde: ikisi de gerçek faydalanıcı.",
    },
    points: [
      { icon: "terazi", title: "Eşik %25", line: "Sermayenin ya da oy hakkının en az %25'ine doğrudan ya da dolaylı sahip olan gerçek kişi." },
      { icon: "bina", title: "Araya şirket girse de", line: "Pay başka bir şirket üzerinden tutuluyorsa zincir gerçek kişiye kadar izleniyor." },
      { icon: "kisi", title: "Kimse eşiği geçmiyorsa", line: "Şirketi başka yolla kontrol eden kişi, o da yoksa üst yönetici kayda yazılıyor." },
    ],
  },

  /* ---------------------------------------------------------- tarama akışı */
  tarama: {
    id: "tarama",
    heading: "Bir müşteri nasıl taranıyor?",
    accent: "nasıl taranıyor?",
    lead: "Yükümlü faaliyetlerde her yeni müşteri aynı beş duraktan geçiyor. Banka da sizi aynı sırayla inceliyor.",
    duraklar: [
      { title: "Müşteri", line: "İş ilişkisi başlamadan önce bilgileri alınıyor." },
      { title: "Kimlik", line: "Belgeler doğrulanıyor, gerçek faydalanıcı belirleniyor." },
      { title: "Yaptırım listesi", line: "Ad, BM ve BAE yerel listelerinde aranıyor." },
      { title: "Risk puanı", line: "Ülke, faaliyet ve işlem türüne göre risk düzeyi belirleniyor." },
      { title: "Kayıt", line: "Belgeler ve sonuç dosyalanıp yasal süre boyunca saklanıyor." },
    ],
    exit: { href: "/dubai/banka-hesabi", label: "Bankanın başvuruda baktıklarını görün" },
  },

  /* -------------------------------------------------------------- döngü */
  takvim: {
    id: "takvim",
    heading: "Uyum yıl içinde nasıl dönüyor?",
    accent: "nasıl dönüyor?",
    lead: "Uyum bir kez yapılıp biten bir iş değil. Dört ayrı zamanı var.",
    orta: "Her yıl",
    items: [
      { zaman: "Kuruluşta", title: "Kayıtlar açılıyor", line: "Gerçek faydalanıcı kaydı ve gerekiyorsa goAML kaydı." },
      { zaman: "Değişiklikte", title: "Kayıtlar güncelleniyor", line: "Ortak, yönetici ya da faaliyet değiştiğinde.", ton: "amber" },
      { zaman: "Yıl boyunca", title: "Tarama ve bildirim", line: "Yükümlü faaliyetlerde müşteri taraması, gerektiğinde bildirim." },
      { zaman: "Lisans yenilenirken", title: "Gözden geçirme", line: "Kayıtlara ve risk değerlendirmesine yeniden bakılıyor." },
    ],
  },

  /* ------------------------------------------------------------- sonuçlar
     TUTAR YOK (dosya başı). [RESMÎ] cetveller 132/2023 ve 71/2024;
     durdurma Bakanlığın 2023 haberi. [İKİNCİL] lisansın askıya alınması. */
  sonuc: {
    id: "sonuclar",
    heading: "Uyulmazsa ne oluyor?",
    accent: "ne oluyor?",
    lead: "Sonuç ihlale ve otoriteye göre değişiyor. Türleri ise belli.",
    items: [
      { icon: "ceza", title: "İdari para cezası", line: "Gerçek faydalanıcı kaydı ve kara para önleme ihlalleri için ayrı ceza cetvelleri var." },
      { icon: "dur", title: "Faaliyetin durdurulması", line: "Ekonomi Bakanlığı, goAML'e kaydolmayan işletmelerin faaliyetini üç ay durdurdu." },
      { icon: "kilit", title: "Lisansın askıya alınması", line: "Tekrarlanan gerçek faydalanıcı ihlalinde lisans askıya alınabiliyor." },
      { icon: "hesap", title: "Banka tarafı", line: "Soruları cevapsız kalan hesap kısıtlanabiliyor ya da kapatılabiliyor." },
    ],
  },

  /* ---------------------------------------------------------- ilgili hizmetler */
  ilgili: {
    id: "ilgili",
    heading: "Uyumun dokunduğu öteki işler.",
    accent: "öteki işler.",
    lead: "Uyum tek başına durmuyor; kuruluşla başlıyor, banka ve muhasebeyle sürüyor.",
    items: [
      { icon: "banka", title: "Banka ve ödeme", line: "Bankanın sorduğu sorular ve başvuru dosyası.", href: "/dubai/banka-hesabi" },
      { icon: "defter", title: "Muhasebe", line: "Kayıtlar, beyanlar ve mali tablolar.", href: "/dubai/muhasebe" },
      { icon: "el", title: "Kurumsal danışmanlık", line: "Şirket yapısı ve ortaklık düzeni.", href: "/dubai/kurumsal-danismanlik" },
      { icon: "bina", title: "Şirket kuruluşu", line: "Kayıtların ilk açıldığı yer.", href: "/dubai" },
    ],
  },

  /* ------------------------------------------------------------------ SSS
     4. ve 6. soru hizmetIcerik.ts'teki onaylı cevaplar. Ücret sorusu yok
     (bankaDubai.ts · ikinci geçiş notu: ücret hiçbir yerde yazmıyor). */
  faq: {
    id: "sss",
    heading: "Sık sorulanlar.",
    accent: "sorulanlar.",
    items: [
      { q: "Her şirketin goAML kaydı yapması gerekiyor mu?", a: "Hayır. goAML kaydı gayrimenkul aracılığı, kıymetli maden ve taş ticareti, muhasebe, denetim ve kurumsal hizmet sağlayıcılığı gibi belirlenmiş faaliyetler için. Gerçek faydalanıcı kaydı ise her şirkette var." },
      { q: "Şirketin tek ortağı benim, yine de gerçek faydalanıcı kaydı gerekiyor mu?", a: "Evet. Tek ortaklı şirkette gerçek faydalanıcı sizsiniz ve kayıt yine açılıyor." },
      { q: "ESR bildirimi hâlâ veriliyor mu?", a: "31 Aralık 2022'den sonra biten mali yıllar için verilmiyor. 2019-2022 dönemlerine ait yükümlülükler ise duruyor." },
      { q: "Şirketi kullanmıyorum, yine de bir şey yapmam gerekir mi?", a: "Evet. Şirketin faaliyet göstermemesi lisans yenileme, vergi, muhasebe ve öteki yasal yükümlülükleri kendiliğinden ortadan kaldırmıyor. Kullanmayacaksanız resmî olarak kapatmak gerekiyor." },
      { q: "Banka neden bu kadar soru soruyor?", a: "Banka da kara para önleme kurallarına tabi. Ortaklık yapınızı, gerçek faaliyetinizi ve paranın kaynağını belgeyle görmek zorunda." },
      { q: "Banka hesabı açılmasını garanti ediyor musunuz?", a: "Hayır. Kararı banka veriyor; biz dosyayı bankanın istediği biçimde hazırlıyoruz." },
      { q: "Ortak değişti, ne yapmam gerekiyor?", a: "Bize haber vermeniz yeterli. Gerçek faydalanıcı ve ortak kayıtlarını güncelliyor, lisans otoritesine bildiriyoruz." },
    ],
  },

  closing: {
    title: "Şirketinizin uyum tarafını birlikte netleştirelim.",
    accent: "birlikte netleştirelim.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
  },
};
