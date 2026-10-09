/* ============================================================================
   İNGİLTERE · AML VE COMPANIES HOUSE UYUMU — sayfanın bütün metni
   Sayfa: app/ingiltere/aml-uyum/page.tsx · Gövde: components/services/AmlSayfa.tsx
   Biçim (tip): lib/amlDubai.ts · AmlVeri

   09.10.2026 · İLK YAZIM (Burak: "İngiltere'de de aynı şekilde. Neredeyse boş
   bıraktığın sayfaların hepsini yap."). Müşteri belgesi yok; her olgu resmî
   kaynaktan. Fiyat, süre taahhüdü yok.

   İNGİLTERE'DE AYRIM ŞÖYLE: her Ltd COMPANIES HOUSE'a karşı sorumlu (kimlik
   doğrulama, PSC, yıllık teyit beyanı, adres). KARA PARA ÖNLEME
   YÖNETMELİĞİ'ne (Money Laundering Regulations 2017) ise yalnız "relevant
   person" sayılan işler giriyor; başka bir kurumun denetiminde olmayan dokuz
   sektörü HMRC denetliyor.

   ------------------------------------------------------------ KAYNAK DÜZENİ
   Kontrol tarihi 09.10.2026. [RESMÎ]:
     · gov.uk/guidance/money-laundering-regulations-who-needs-to-register
       (HMRC'nin dokuz sektörü; kayıtsız faaliyet suç)
     · gov.uk/guidance/money-laundering-regulations-your-responsibilities
       (risk değerlendirmesi, politika, müşteri tanıma, nominated officer,
       eğitim, kayıtların 5 yıl saklanması)
     · legislation.gov.uk/uksi/2017/692/regulation/40 (5 yıl; iş ilişkisinin
       bitiminden ya da işlemin tamamlanmasından)
     · gov.uk/guidance/people-with-significant-control-pscs (%25'ten fazla
       pay ya da oy, direktör çoğunluğunu atama, fiilî kontrol; değişiklik 14
       gün; bilgi vermemek suç, iki yıla kadar hapis)
     · changestoukcompanylaw.campaign.gov.uk (18.11.2025: direktör, sekreter
       ve PSC defterleri kalktı, pay sahipleri defteri duruyor; 04.03.2024:
       uygun adres, kayıtlı e-posta, hukuka uygunluk beyanı)
     · docs/ingiltere-mevzuat.md · 1, 2, 3 (kimlik doğrulama 18.11.2025'ten
       beri zorunlu, One Login ya da ACSP; yıllık teyit beyanı)
   [GENEL BİLGİ, bu turda resmî sayfası açılmadı]: şüpheli işlem bildiriminin
   Ulusal Suç Ajansı'na (NCA) yapıldığı; teyit beyanı verilmeyen şirketin
   sicilden silinebildiği; PSC kaydında sicilde görünen alanlar. Tutar
   yazılmadı.

   SWAP:AML_KAPSAM_UK · "ne yapıyoruz" maddeleri services.ts'ten (PSC kaydı,
   Companies House uyumu, mevzuat desteği). Kimlik doğrulamayı kimin yaptığı
   ve kayıtlı adresin kimde olduğu müşteride cevapsız
   (docs/teslim/bilgi-ve-murat.md · 6); o yüzden "yönlendirme" ve "kurala
   uygunluğuna bakma" diye yazıldı, "biz yapıyoruz" diye değil.
   ========================================================================= */

import type { AmlVeri } from "@/lib/amlDubai";

export const AML_INGILTERE: AmlVeri = {
  ulke: "İngiltere",
  yol: "/ingiltere/aml-uyum",
  seo: {
    title: "İngiltere'de AML ve Companies House Uyumu: PSC, Kimlik Doğrulama | Ortac Global",
    description:
      "İngiltere Ltd şirketiniz hangi uyum yükümlülüğüne giriyor? Kimlik doğrulama, PSC bildirimi, yıllık teyit beyanı ve HMRC kara para önleme denetimi.",
  },
  hero: {
    crumb: "İngiltere · AML ve mevzuat uyumu",
    title: "İngiltere'de AML ve mevzuat uyumu.",
    accent: "AML ve mevzuat uyumu.",
    lead: "Her Ltd şirket Companies House'a karşı sorumlu. Kara para önleme denetimine ise yalnız belirli işleri yapanlar giriyor. Hangisinin size işlediğini netleştiriyoruz.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
    rozetler: ["PSC bildirimi her şirkette", "Companies House kimlik doğrulaması", "HMRC denetimi yalnız belirli işlerde"],
  },

  kim: {
    id: "kimler",
    heading: "Şirketiniz hangi yükümlülüğe giriyor?",
    accent: "hangi yükümlülüğe giriyor?",
    lead: "Companies House kuralları her şirket için. Kara para önleme yönetmeliği yalnız belirli işler için.",
    kok: "İngiltere Ltd şirketiniz",
    herkes: {
      etiket: "Her şirket",
      baslik: "Companies House'a karşı",
      maddeler: [
        "Direktör ve PSC için kimlik doğrulama",
        "PSC (önemli kontrol sahibi) bildirimi",
        "Yıllık teyit beyanı",
        "Uygun kayıtlı adres ve e-posta",
      ],
    },
    belirli: {
      etiket: "Yalnız belirli işler",
      soru: "İşiniz bu listede mi?",
      /* [RESMÎ] HMRC'nin denetlediği sektörlerden bu kitlenin karşılaşabileceği
         altısı; liste bu altıyla sınırlı değil (cevabı ilk SSS veriyor). */
      faaliyetler: [
        "Muhasebe hizmeti",
        "Şirket kuruluş ve adres hizmeti",
        "Emlak ve kiralama aracılığı",
        "10.000 € ve üzeri nakit kabul eden ticaret",
        "Sanat eseri ticareti",
        "Para transferi ve döviz",
      ],
      kopru: "Listedeyse bunlar ekleniyor",
      maddeler: [
        "HMRC'ye kara para önleme kaydı",
        "Müşteri tanıma",
        "Şüpheli işlem bildirimi",
        "Risk değerlendirmesi, yazılı politika ve sorumlu kişi",
      ],
    },
    not: "E-ticaret, yazılım ve danışmanlık şirketleri çoğunlukla yalnız ilk grupta kalıyor.",
  },

  kapsam: {
    id: "kapsam",
    heading: "Uyumda neyi üstleniyoruz?",
    accent: "neyi üstleniyoruz?",
    lead: "Önce size hangi kuralın işlediğini netleştiriyoruz, sonra o kuralların takvimini tutuyoruz.",
    var: {
      title: "Üstlendiklerimiz",
      items: [
        "İşinize hangi yükümlülüğün işlediğinin tespiti",
        "PSC bildirimi ve güncellemesi",
        "Kimlik doğrulama adımlarında yönlendirme",
        "Yıllık teyit beyanının hazırlanması",
        "Gerekiyorsa HMRC kaydı için başvuru hazırlığı",
      ],
    },
    yok: {
      title: "Kapsam dışında",
      items: [
        "Hukuki görüş ve savunma",
        "Kimliğinizi sizin yerinize doğrulamak",
        "Şüpheli işlem bildirimi kararı (şirketin sorumlu kişisinde)",
        "Bankanın ya da ödeme kuruluşunun hesap kararı",
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
        icon: "kimlik", kim: "herkes", etiket: "Her şirket",
        title: "Kimlik doğrulama",
        line: "Direktörler ve önemli kontrol sahipleri kimliğini doğrulatıyor.",
        ne: "GOV.UK One Login ile ya da yetkili bir aracı (ACSP) üzerinden doğrulama yapılıyor; sonunda kişisel bir kod veriliyor.",
        zaman: "Yeni şirkette başvurudan önce. 18 Kasım 2025'ten beri zorunlu.",
        biz: "Hangi yolun size uyduğunu söylüyor, adımlarda yanınızda oluyoruz.",
      },
      {
        icon: "parmak", kim: "herkes", etiket: "Her şirket",
        title: "PSC bildirimi",
        line: "Şirketi kimin kontrol ettiğinin sicile yazılması.",
        ne: "Payların ya da oyların %25'inden fazlasını tutan, direktörlerin çoğunluğunu atayabilen ya da şirketi fiilen kontrol eden kişiler bildiriliyor.",
        zaman: "Kuruluşta; değişiklik teyit edildikten sonra 14 gün içinde.",
        biz: "Bildirimi hazırlıyor, değişiklikleri süresi içinde gönderiyoruz.",
      },
      {
        icon: "takvim", kim: "herkes", etiket: "Her şirket",
        title: "Yıllık teyit beyanı",
        line: "Sicildeki bilgilerin yılda bir doğrulanması.",
        ne: "Şirket bilgilerinin doğru olduğu ve faaliyetin hukuka uygun olduğu Companies House'a teyit ediliyor.",
        zaman: "En az yılda bir.",
        biz: "Tarihi biz izliyor, beyanı hazırlıyoruz.",
      },
      {
        icon: "posta", kim: "herkes", etiket: "Her şirket",
        title: "Kayıtlı adres ve e-posta",
        line: "Şirkete resmî yazının ulaşabildiği adres.",
        ne: "İngiltere'de uygun bir kayıtlı adres ve kayıtlı bir e-posta adresi şart; posta kutusu kabul edilmiyor.",
        zaman: "4 Mart 2024'ten beri, sürekli.",
        biz: "Adresinizin kurala uygun olup olmadığına bakıyoruz.",
      },
      {
        icon: "defter", kim: "herkes", etiket: "Her şirket",
        title: "Pay sahipleri defteri",
        line: "Şirketin kendi tuttuğu ortak kaydı.",
        ne: "18 Kasım 2025'ten beri direktör, sekreter ve PSC defterlerini ayrıca tutmak gerekmiyor; pay sahipleri defteri ise hâlâ zorunlu.",
        zaman: "Sürekli; pay devrinde güncelleniyor.",
        biz: "Defterin düzenini kuruyor, pay devrinde ne yazılacağını gösteriyoruz.",
      },
      {
        icon: "dosya", kim: "belirli", etiket: "İşe göre",
        title: "HMRC kara para önleme kaydı",
        line: "Belirli sektörlerin denetim kaydı.",
        ne: "Başka bir kurumun denetiminde olmayan muhasebeciler, şirket hizmet sağlayıcıları, emlak ve kiralama aracıları, yüksek tutarlı nakit kabul edenler ve sanat eseri tüccarları kaydoluyor.",
        zaman: "Faaliyete başlamadan önce.",
        biz: "İşinizin kapsama girip girmediğine bakıyor, başvuruyu hazırlıyoruz.",
      },
      {
        icon: "liste", kim: "belirli", etiket: "İşe göre",
        title: "Müşteri tanıma",
        line: "Kiminle iş yaptığınızı belgeyle bilmek.",
        ne: "Müşterinin adı, fotoğraflı resmî belgesi, adresi ve doğum tarihi doğrulanıyor; gerekiyorsa gerçek faydalanıcısı belirleniyor.",
        zaman: "İş ilişkisi kurulurken ve şüphe doğduğunda.",
        biz: "Tarama düzenini ve tutulacak kayıt biçimini birlikte kuruyoruz.",
      },
      {
        icon: "zil", kim: "belirli", etiket: "İşe göre",
        title: "Şüpheli işlem bildirimi",
        line: "Şüphenin şirket içinde ve dışında izleyeceği yol.",
        ne: "Çalışanlar şüpheyi şirketin sorumlu kişisine iletiyor; bildirim Ulusal Suç Ajansı'na yapılıyor.",
        zaman: "Şüphe oluştuğunda.",
        biz: "Akışı yazılı hâle getiriyoruz; bildirim kararı sorumlu kişide.",
      },
      {
        icon: "pusula", kim: "belirli", etiket: "İşe göre",
        title: "Risk değerlendirmesi ve kayıt saklama",
        line: "Yazılı politika, eğitim ve beş yıllık kayıt.",
        ne: "Yazılı risk değerlendirmesi, politika ve çalışan eğitimi isteniyor; kayıtlar iş ilişkisi bittikten sonra beş yıl saklanıyor.",
        zaman: "Faaliyete başlarken; iş değiştikçe gözden geçiriliyor.",
        biz: "Metinleri işinize göre hazırlıyoruz.",
      },
    ],
  },

  /* Sahnedeki paylar gösterim (amlDubai.ts · zincir notu). İngiltere'de eşik
     "%25'ten FAZLA"; ikisi de üstünde. */
  zincir: {
    id: "gercek-faydalanici",
    heading: "PSC kim sayılıyor?",
    accent: "kim sayılıyor?",
    lead: "Sicil şirkete değil, zincirin sonundaki gerçek kişiye bakıyor.",
    sahne: {
      kisiA: "Ortak A",
      kisiB: "Ortak B",
      ara: "Ara şirket",
      sirket: "Şirketiniz",
      payA: "%100",
      payAra: "%60",
      payB: "%40",
      alt: "İkisi de eşiğin üstünde: ikisi de bildiriliyor.",
    },
    points: [
      { icon: "terazi", title: "Eşik: %25'ten fazla", line: "Payların ya da oy haklarının %25'inden fazlasını elinde tutan kişi." },
      { icon: "kisi", title: "Pay olmadan da", line: "Direktörlerin çoğunluğunu atayıp görevden alabilen ya da şirketi fiilen yöneten kişi de sayılıyor." },
      { icon: "bina", title: "Sicil herkese açık", line: "PSC bilgisi Companies House sicilinde yayımlanıyor." },
    ],
  },

  tarama: {
    id: "tarama",
    heading: "Bir müşteri nasıl taranıyor?",
    accent: "nasıl taranıyor?",
    lead: "Kapsamdaki işlerde her yeni müşteri aynı beş duraktan geçiyor. Banka ve ödeme kuruluşu da sizi aynı sırayla inceliyor.",
    duraklar: [
      { title: "Müşteri", line: "İş ilişkisi başlamadan önce bilgileri alınıyor." },
      { title: "Kimlik", line: "Ad, resmî belge, adres ve doğum tarihi doğrulanıyor." },
      { title: "Yaptırım listesi", line: "Ad, İngiltere'nin mali yaptırım listesinde aranıyor." },
      { title: "Risk puanı", line: "Ülke, iş ve işlem türüne göre risk düzeyi belirleniyor." },
      { title: "Kayıt", line: "Belgeler dosyalanıyor ve beş yıl saklanıyor." },
    ],
    exit: { href: "/ingiltere/banka-hesabi", label: "Banka ve ödeme hesaplarına bakın" },
  },

  takvim: {
    id: "takvim",
    heading: "Uyum yıl içinde nasıl dönüyor?",
    accent: "nasıl dönüyor?",
    lead: "Companies House tarafının dört ayrı zamanı var.",
    orta: "Her yıl",
    items: [
      { zaman: "Kuruluştan önce", title: "Kimlik doğrulama", line: "Direktör ve PSC kişisel kodunu alıyor." },
      { zaman: "Kuruluşta", title: "PSC bildirimi", line: "Kontrol sahipleri başvuruyla birlikte sicile yazılıyor." },
      { zaman: "Değişiklikte", title: "14 gün içinde bildirim", line: "PSC değişikliği teyit edildikten sonra.", ton: "amber" },
      { zaman: "Her yıl", title: "Teyit beyanı", line: "Bilgiler ve hukuka uygunluk beyanı yenileniyor." },
    ],
  },

  /* TUTAR YOK. İlk iki madde [RESMÎ]; üçüncü docs/ingiltere-mevzuat.md · 2;
     dördüncü genel bilgi (dosya başı). */
  sonuc: {
    id: "sonuclar",
    heading: "Uyulmazsa ne oluyor?",
    accent: "ne oluyor?",
    lead: "İngiltere'de bu ihlallerin bir kısmı idari değil, doğrudan suç.",
    items: [
      { icon: "ceza", title: "PSC bilgisini vermemek", line: "Bilgiyi vermeyi reddetmek suç; iki yıla kadar hapis ya da para cezası öngörülüyor." },
      { icon: "dur", title: "Kayıtsız faaliyet", line: "Kapsamdaki bir işi HMRC'ye kaydolmadan yürütmek suç." },
      { icon: "kilit", title: "Doğrulanmamış kimlik", line: "Kimliğini doğrulamayan kişi yeni şirkette direktör olarak kaydedilemiyor." },
      { icon: "sil", title: "Sicilden silinme", line: "Teyit beyanı verilmeyen şirket sicilden silinebiliyor." },
    ],
  },

  ilgili: {
    id: "ilgili",
    heading: "Uyumun dokunduğu öteki işler.",
    accent: "öteki işler.",
    lead: "Uyum tek başına durmuyor; kuruluşla başlıyor, banka ve muhasebeyle sürüyor.",
    items: [
      { icon: "banka", title: "Banka ve ödeme", line: "Hesap ve ödeme kuruluşu başvuruları.", href: "/ingiltere/banka-hesabi" },
      { icon: "defter", title: "Muhasebe", line: "Yıllık hesaplar ve beyan takvimi.", href: "/ingiltere/muhasebe" },
      { icon: "el", title: "Kurumsal danışmanlık", line: "Şirket yapısı ve pazara giriş.", href: "/ingiltere/kurumsal-danismanlik" },
      { icon: "bina", title: "Şirket kuruluşu", line: "Kimlik doğrulama ve tescil.", href: "/ingiltere" },
    ],
  },

  faq: {
    id: "sss",
    heading: "Sık sorulanlar.",
    accent: "sorulanlar.",
    items: [
      { q: "Her Ltd şirketin HMRC'ye kara para önleme kaydı yapması gerekiyor mu?", a: "Hayır. Kayıt, muhasebe hizmeti, şirket kuruluş ve adres hizmeti, emlak aracılığı, yüksek tutarlı nakit ticaret gibi belirli işleri yapanlar için. PSC bildirimi ve yıllık teyit beyanı ise her şirkette var." },
      { q: "Yurt dışında yaşıyorum, kimliğimi nasıl doğrulatırım?", a: "GOV.UK One Login ile çevrim içi ya da yetkili bir aracı (ACSP) üzerinden. İngiltere'de yaşamanız gerekmiyor." },
      { q: "PSC kimdir?", a: "Şirketi kontrol eden gerçek kişi: payların ya da oyların %25'inden fazlasını tutan, direktörlerin çoğunluğunu atayabilen ya da şirketi fiilen yöneten kişi." },
      { q: "Şirketin tek sahibi benim, PSC bildirimi yine gerekir mi?", a: "Evet. Tek sahipli şirkette PSC sizsiniz ve bildirim yine yapılıyor." },
      { q: "Şirket faaliyetsiz, yine de bir şey vermem gerekir mi?", a: "Evet. Yıllık teyit beyanı ve hesaplar faaliyetsiz şirkette de veriliyor." },
      { q: "PSC değişirse ne kadar sürede bildirmeliyim?", a: "Değişiklik teyit edildikten sonra 14 gün içinde Companies House'a bildiriliyor. Bize haber vermeniz yeterli." },
      { q: "Banka ve ödeme kuruluşları neden ayrıca belge istiyor?", a: "Onlar da kara para önleme kurallarına tabi; şirketin sahibini ve faaliyetini kendileri doğrulamak zorunda." },
    ],
  },

  closing: {
    title: "İngiltere şirketinizin uyum tarafını birlikte netleştirelim.",
    accent: "birlikte netleştirelim.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
  },
};
