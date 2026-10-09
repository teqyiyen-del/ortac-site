/* ============================================================================
   KKTC · AML VE MEVZUAT UYUMU — sayfanın bütün metni
   Sayfa: app/kktc/aml-uyum/page.tsx · Gövde: components/services/AmlSayfa.tsx
   Biçim (tip): lib/amlDubai.ts · AmlVeri

   09.10.2026 · İLK YAZIM (Burak: "neredeyse boş bıraktığın sayfaların hepsini
   yap"). Fiyat, süre taahhüdü, banka adı yok.

   KKTC'DE AYRIM ŞÖYLE: her şirket ŞİRKETLER MUKAYYİTLİĞİ'ne karşı sorumlu
   (yıllık rapor, değişiklik bildirimi, denetçi) ve bankasına kendini
   belgeyle anlatıyor. KARA PARA ÖNLEME YASASI (1/2024) ise yükümlüleri tek
   tek sayıyor; ticaret yapan bir Serbest Liman şirketi o listede değil,
   ama bankası ve muhasebecisi listede.

   ------------------------------------------------------------ KAYNAK DÜZENİ
   Kontrol tarihi 09.10.2026.
     [RESMÎ] parakambiyo.gov.ct.tr (Para, Kambiyo ve İnkişaf Sandığı İşleri
       Dairesi · "Yükümlülükler Hk."): yasanın adı ve numarası (1/2024 sayılı
       Suç Gelirlerinin Aklanmasının, Terörizmin Finansmanının ve Kitle İmha
       Silahlarının Yaygınlaşmasının Finansmanının Önlenmesi Yasası), on
       başlıklık yükümlü listesi, yükümlülükler (kurum politikası, risk
       değerlendirmesi, müşterini tanı, şüpheli işlem bildirimi, nakit işlem
       limiti üstü bildirim, kayıt saklama, uyum görevlisi ve yardımcısı,
       eğitim ve iç denetim) ve bildirimin yapıldığı Birim (MABEB).
     [RESMÎ] docs/kktc-mevzuat.md · 1, 3, 7 (Fasıl 113: yıllık rapor genel
       kuruldan sonra 42 gün, direktör ve sekreter değişikliği 14 gün, adres
       14 gün, her genel kurulda denetçi; Serbest Liman'da iç piyasaya
       yönelik işlem muafiyet dışında).
     [BELGE] lib/accountingKktc.ts ("muafiyetten yararlansa da beyan ve uyum
       yükümlülükleri sürüyor").

   BİLEREK YAZILMAYANLAR (resmî sayfada yok, yasa metni okunamadı):
     · kayıt saklama süresi yıl olarak, nakit işlem limitinin tutarı
     · ceza tutarları ve türleri (sonuç bölümü bu yüzden genel)
     · KKTC'de ayrı bir gerçek faydalanıcı sicili olup olmadığı. services.ts
       "Gerçek faydalanıcı (UBO) bildirimi" diyor (Murat Bey'in listesi);
       burada bankanın ve yükümlülerin istediği BEYAN olarak anlatıldı.
   SWAP:AML_KAPSAM_KKTC · Murat Bey doğrulayacak
   (docs/teslim/bilgi-ve-murat.md · "AML hizmeti KKTC'de ne kapsıyor").
   ========================================================================= */

import type { AmlVeri } from "@/lib/amlDubai";

export const AML_KKTC: AmlVeri = {
  ulke: "KKTC",
  yol: "/kktc/aml-uyum",
  seo: {
    title: "KKTC'de AML ve Mevzuat Uyumu: Serbest Liman Şirketi Bildirimleri | Ortac Global",
    description:
      "KKTC şirketiniz kara para önleme yasasında yükümlü mü? Yükümlü listesi, Serbest Liman şirketinin yıllık rapor ve bildirimleri, bankanın sorduğu belgeler.",
  },
  hero: {
    crumb: "KKTC · AML ve mevzuat uyumu",
    title: "KKTC'de AML ve mevzuat uyumu.",
    accent: "AML ve mevzuat uyumu.",
    lead: "Kara para önleme yasası yükümlüleri tek tek sayıyor; çoğu ticaret şirketi o listede değil. Şirketinizin yıllık rapor ve bildirimleri ise her durumda var ve onları biz takip ediyoruz.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
    rozetler: ["Yıllık rapor ve bildirim takibi", "Gerçek faydalanıcı beyanları", "Mevzuat uyumu tek ekipten"],
  },

  /* [RESMÎ] sağ koldaki altı çip yasadaki on başlığın bu kitleyle ilgili
     olanları; bankalar ve şans oyunları gibi başlıklar SSS'te anılıyor. */
  kim: {
    id: "kimler",
    heading: "Şirketiniz hangi yükümlülüğe giriyor?",
    accent: "hangi yükümlülüğe giriyor?",
    lead: "Şirket kayıtları her şirket için. Kara para önleme yasası ise yalnız saydığı işler için.",
    kok: "KKTC şirketiniz",
    herkes: {
      etiket: "Her şirket",
      baslik: "Şirketler Mukayyitliği'ne karşı",
      maddeler: [
        "Yıllık rapor",
        "Direktör, sekreter ve adres değişikliği bildirimi",
        "Denetçi atanması ve yıllık hesaplar",
        "Bankanın müşterini tanı sorularına belgeli cevap",
      ],
    },
    belirli: {
      etiket: "Yalnız yasada sayılan işler",
      soru: "İşiniz bu listede mi?",
      faaliyetler: [
        "Muhasebe, denetim, vergi danışmanlığı",
        "Şirket hizmet sağlayıcılığı",
        "Emlak ve ticari gayrimenkul",
        "Kuyumculuk",
        "Motorlu araç satışı",
        "Döviz, ödeme ve kripto varlık hizmetleri",
      ],
      kopru: "Listedeyse bunlar ekleniyor",
      maddeler: [
        "Müşterini tanı önlemleri",
        "Şüpheli işlem bildirimi",
        "Nakit işlem limitini aşan işlemlerin bildirimi",
        "Risk değerlendirmesi, kurum politikası ve uyum görevlisi",
      ],
    },
    not: "Serbest Liman'da ticaret yapan bir şirket çoğunlukla yalnız ilk grupta kalıyor.",
  },

  kapsam: {
    id: "kapsam",
    heading: "Uyumda neyi üstleniyoruz?",
    accent: "neyi üstleniyoruz?",
    lead: "Önce size hangi kuralın işlediğini netleştiriyoruz, sonra bildirimlerin takvimini tutuyoruz.",
    var: {
      title: "Üstlendiklerimiz",
      items: [
        "İşinize hangi yükümlülüğün işlediğinin tespiti",
        "Yıllık rapor ve değişiklik bildirimleri",
        "Bankanın istediği gerçek faydalanıcı beyanları",
        "Yükümlü işlerde kurum politikası ve risk değerlendirmesi metinleri",
        "Bankanın uyum soruları için dosya hazırlığı",
      ],
    },
    yok: {
      title: "Kapsam dışında",
      items: [
        "Hukuki görüş ve savunma",
        "Şüpheli işlem bildirimi kararı (şirketin uyum görevlisinde)",
        "Bankanın hesap kararı",
        "Bakanlık ve Serbest Liman onay kararları",
      ],
    },
  },

  yukum: {
    id: "yukumlulukler",
    heading: "Yükümlülükler tek tek.",
    accent: "tek tek.",
    lead: "Her kartın etiketi kimin için olduğunu söylüyor. Ayrıntı için karta dokunun.",
    sorular: { ne: "Ne isteniyor?", zaman: "Ne zaman?", biz: "Biz ne yapıyoruz?" },
    items: [
      {
        icon: "takvim", kim: "herkes", etiket: "Her şirket",
        title: "Yıllık rapor",
        line: "Şirketin güncel hâlinin Mukayyitliğe bildirilmesi.",
        ne: "Şirketin ortak, direktör ve sermaye bilgilerini gösteren yıllık rapor Şirketler Mukayyitliği'ne veriliyor.",
        zaman: "Yıllık genel kuruldan sonra 42 gün içinde.",
        biz: "Tarihi biz izliyor, raporu hazırlayıp teslim ediyoruz.",
      },
      {
        icon: "kisiler", kim: "herkes", etiket: "Her şirket",
        title: "Değişiklik bildirimleri",
        line: "Direktör, sekreter ya da adres değişince.",
        ne: "Direktör, sekreter ya da kayıtlı adres değiştiğinde Mukayyitliğe bildiriliyor.",
        zaman: "Değişiklikten sonra 14 gün içinde.",
        biz: "Değişikliği bize bildirmeniz yeterli; bildirimi biz yapıyoruz.",
      },
      {
        icon: "defter", kim: "herkes", etiket: "Her şirket",
        title: "Denetçi ve yıllık hesaplar",
        line: "Her genel kurulda denetçi atanıyor.",
        ne: "Şirket her genel kurulda bir denetçi atıyor; yıllık hesaplar denetleniyor.",
        zaman: "Her yıl.",
        biz: "Hesapları muhasebe ekibimiz hazırlıyor.",
      },
      {
        icon: "parmak", kim: "herkes", etiket: "Her şirket",
        title: "Gerçek faydalanıcı beyanı",
        line: "Bankanın görmek istediği gerçek kişi.",
        ne: "Ortaklık yapısı, pasaport ve adres belgeleriyle şirketin arkasındaki gerçek kişiye kadar gösteriliyor.",
        zaman: "Hesap açılışında ve bilgiler değiştiğinde.",
        biz: "Beyanları ve eklerini hazırlıyoruz; hesap kararını banka veriyor.",
      },
      {
        icon: "kalkan", kim: "herkes", etiket: "Her şirket",
        title: "Muafiyette de süren beyanlar",
        line: "Vergi muafiyeti bildirimleri kaldırmıyor.",
        /* [BELGE] accountingKktc.ts */
        ne: "Serbest Liman şirketi vergi muafiyetinden yararlansa da beyan ve kayıt yükümlülükleri sürüyor.",
        zaman: "Beyan takvimine göre, yıl boyunca.",
        biz: "Neyin ne zaman verileceğini izliyor, zamanı gelince hazırlıyoruz.",
      },
      {
        icon: "liste", kim: "belirli", etiket: "İşe göre",
        title: "Müşterini tanı önlemleri",
        line: "Yükümlü işlerde müşterinin belgeyle tanınması.",
        ne: "Yasada sayılan işleri yapanlar müşterilerini tanımak için gereken önlemleri alıyor.",
        zaman: "İş ilişkisi kurulurken ve ilişki sürdükçe.",
        biz: "Tarama düzenini ve tutulacak kayıt biçimini birlikte kuruyoruz.",
      },
      {
        icon: "zil", kim: "belirli", etiket: "İşe göre",
        title: "Şüpheli ve nakit işlem bildirimi",
        line: "Bildirimler Birim'e (MABEB) yapılıyor.",
        ne: "Şüpheli işlemler ve nakit işlem limitini aşan işlemler Birim'e bildiriliyor.",
        zaman: "Şüphe oluştuğunda ve limit aşıldığında.",
        biz: "Adımları yazılı hâle getiriyoruz; bildirim kararı şirketin uyum görevlisinde.",
      },
      {
        icon: "pusula", kim: "belirli", etiket: "İşe göre",
        title: "Kurum politikası ve uyum görevlisi",
        line: "Yazılı politika, risk değerlendirmesi, eğitim.",
        ne: "Kurum politikası yazılıyor, risk değerlendiriliyor, uyum görevlisi ve yardımcısı atanıp Birim'e bildiriliyor.",
        zaman: "Faaliyete başlarken; düzenli iç denetimle gözden geçiriliyor.",
        biz: "Metinleri işinize göre hazırlıyoruz.",
      },
    ],
  },

  /* KKTC'de eşik yazılmıyor (dosya başı): sahne zincirin gerçek kişiye kadar
     izlendiğini gösteriyor, alt yazısı da onu söylüyor. */
  zincir: {
    id: "gercek-faydalanici",
    heading: "Banka şirketin arkasında kimi görüyor?",
    accent: "kimi görüyor?",
    lead: "Banka şirkete değil, zincirin sonundaki gerçek kişiye bakıyor.",
    sahne: {
      kisiA: "Ortak A",
      kisiB: "Ortak B",
      ara: "Ara şirket",
      sirket: "Şirketiniz",
      payA: "%100",
      payAra: "%60",
      payB: "%40",
      alt: "Zincir her iki ortakta da gerçek kişiye kadar belgeleniyor.",
    },
    points: [
      { icon: "kisi", title: "Gerçek kişiye kadar", line: "Hesap açılırken ortaklık yapısı pasaport ve adres belgeleriyle gösteriliyor." },
      { icon: "bina", title: "Araya şirket girse de", line: "Ortak bir şirketse onun da ortakları belgeleniyor." },
      { icon: "takvim", title: "Bilgi değişince", line: "Ortaklık değiştiğinde bankadaki bilgiler de güncelleniyor." },
    ],
  },

  tarama: {
    id: "tarama",
    heading: "Bir müşteri nasıl taranıyor?",
    accent: "nasıl taranıyor?",
    lead: "Yükümlü işlerde her yeni müşteri aynı beş duraktan geçiyor. Bankanız da sizi aynı sırayla inceliyor.",
    duraklar: [
      { title: "Müşteri", line: "İş ilişkisi başlamadan önce bilgileri alınıyor." },
      { title: "Kimlik", line: "Belgeler doğrulanıyor, gerçek faydalanıcı belirleniyor." },
      { title: "Yaptırım listesi", line: "Ad, uluslararası yaptırım listelerinde aranıyor." },
      { title: "Risk puanı", line: "Ülke, iş ve işlem türüne göre risk düzeyi belirleniyor." },
      { title: "Kayıt", line: "Belgeler ve sonuç dosyalanıp yasal süre boyunca saklanıyor." },
    ],
    exit: { href: "/kktc/banka-hesabi", label: "Banka hesabı sürecine bakın" },
  },

  takvim: {
    id: "takvim",
    heading: "Uyum yıl içinde nasıl dönüyor?",
    accent: "nasıl dönüyor?",
    lead: "Şirket kayıtlarının dört ayrı zamanı var.",
    orta: "Her yıl",
    items: [
      { zaman: "Kuruluşta", title: "Kayıtlar açılıyor", line: "Mukayyitlik, vergi ve Serbest Liman kayıtları." },
      { zaman: "Değişiklikte", title: "14 gün içinde bildirim", line: "Direktör, sekreter ya da adres değiştiğinde.", ton: "amber" },
      { zaman: "Genel kuruldan sonra", title: "Yıllık rapor", line: "42 gün içinde Şirketler Mukayyitliği'ne." },
      { zaman: "Yıl boyunca", title: "Beyan ve kayıt", line: "Muhasebe kayıtları ve beyanlar takvimine göre." },
    ],
  },

  /* TUTAR VE CEZA TÜRÜ YOK (dosya başı): yasa metni okunamadı. Dördüncü
     madde [RESMÎ] (Serbest Liman vergi sayfası). */
  sonuc: {
    id: "sonuclar",
    heading: "Uyulmazsa ne oluyor?",
    accent: "ne oluyor?",
    lead: "Sonuç ihlale ve kuruma göre değişiyor. Dört başlıkta toplanıyor.",
    items: [
      { icon: "ceza", title: "Yasal yaptırım", line: "Kara para önleme yasası, yükümlülüğünü yerine getirmeyenler için yaptırım öngörüyor." },
      { icon: "takvim", title: "Geciken bildirim", line: "Süresinde verilmeyen yıllık rapor ve bildirimlerden şirket ve direktörleri sorumlu." },
      { icon: "hesap", title: "Banka tarafı", line: "Soruları cevapsız kalan hesap kısıtlanabiliyor ya da kapatılabiliyor." },
      { icon: "kilit", title: "Muafiyetin dışında kalmak", line: "KKTC iç piyasasına yönelik işlem Serbest Liman muafiyetinin dışında kalıyor." },
    ],
  },

  ilgili: {
    id: "ilgili",
    heading: "Uyumun dokunduğu öteki işler.",
    accent: "öteki işler.",
    lead: "Uyum tek başına durmuyor; kuruluşla başlıyor, banka ve muhasebeyle sürüyor.",
    items: [
      { icon: "banka", title: "Banka ve ödeme", line: "Hesap açılışı ve bankanın istediği belgeler.", href: "/kktc/banka-hesabi" },
      { icon: "defter", title: "Muhasebe", line: "Kayıtlar, beyanlar ve yıllık hesaplar.", href: "/kktc/muhasebe" },
      { icon: "el", title: "Kurumsal danışmanlık", line: "Şirket ve vergi yapılandırması.", href: "/kktc/kurumsal-danismanlik" },
      { icon: "bina", title: "Şirket kuruluşu", line: "Serbest Liman şirketinin kuruluşu.", href: "/kktc" },
    ],
  },

  faq: {
    id: "sss",
    heading: "Sık sorulanlar.",
    accent: "sorulanlar.",
    items: [
      { q: "Serbest Liman şirketim kara para önleme yasasında yükümlü mü?", a: "Yasa yükümlüleri tek tek sayıyor: bankalar, finansal kuruluşlar, muhasebeciler, şirket hizmet sağlayıcıları, emlakçılar, kuyumcular, oto galeriler gibi. İşiniz bu listede değilse yükümlü sayılmıyorsunuz; görüşmede birlikte bakıyoruz." },
      { q: "Yükümlü değilsem benden neden belge isteniyor?", a: "Bankanız ve muhasebeciniz yükümlü. Sizi tanımak ve şirketin arkasındaki gerçek kişiyi belgelemek zorundalar." },
      { q: "Vergi muafiyeti varken bildirim vermem gerekir mi?", a: "Evet. Muafiyet beyan ve kayıt yükümlülüklerini kaldırmıyor." },
      { q: "Direktör değişti, ne kadar sürede bildirmeliyim?", a: "Değişiklik 14 gün içinde Şirketler Mukayyitliği'ne bildiriliyor. Bize haber vermeniz yeterli." },
      { q: "Yıllık rapor ne zaman veriliyor?", a: "Yıllık genel kuruldan sonra 42 gün içinde Şirketler Mukayyitliği'ne veriliyor." },
      { q: "Şüpheli işlem bildirimi nereye yapılıyor?", a: "Yükümlüler bildirimi Para, Kambiyo ve İnkişaf Sandığı İşleri Dairesi'ndeki Birim'e (MABEB) yapıyor." },
      { q: "Banka hesabı açılmasını garanti ediyor musunuz?", a: "Hayır. Kararı banka veriyor; biz dosyayı bankanın istediği biçimde hazırlıyoruz." },
    ],
  },

  closing: {
    title: "KKTC şirketinizin uyum tarafını birlikte netleştirelim.",
    accent: "birlikte netleştirelim.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
  },
};
