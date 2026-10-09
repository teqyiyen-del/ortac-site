/* KKTC'DE YAŞAM · eski sitenin KKTC yazıları içinde en çok trafik alanı
   (Search Console, 16 ay: 1.978 tıklama).

   ADRES eski sitedekiyle AYNI (/blog/kktc-yasam-rehberi-kibris-is-firsatlari-
   maliyetler); Google'daki sıra korunsun diye slug'a dokunulmadı.

   BAŞLIK sayfanın gerçekten çıktığı sorgulardan kuruldu: "kıbrısta yaşam",
   "kıbrıs'ta yaşam", "kıbrısta yaşamak", "kıbrısta ne iş yapılır", "kıbrıs
   yaşam maliyeti 2025", "kktc para birimi". Ortak kelimeler (Kıbrıs, yaşam,
   maliyet, iş) başlıkta; para birimi ve "ne iş yapılır" soru başlıklı bölüm.

   KAYNAK (09.10.2026'da tek tek okundu):
     · asgari ücret       csgb.gov.ct.tr/ASGARİ-ÜCRET ve vergi.gov.ct.tr duyurusu
                          (1 Temmuz 2026: brüt 70.893 TL, net 61.677 TL)
     · enflasyon          istatistik.gov.ct.tr · TÜFE Eylül 2026 (5 Ekim 2026):
                          aylık %3,34, yıllık %35,02
     · istihdam           istatistik.gov.ct.tr · Hanehalkı İşgücü Anketi 2025
                          3. çeyrek (7 Mayıs 2026): 189.791 kişi, işsizlik %4,7
     · çalışma izni       csgb.gov.ct.tr/YABANCICALISMAIZNI
     · kira ve fiyatlar   RESMÎ KAYNAĞI YOK. Numbeo'nun Girne sayfası (2 Ekim
                          2026, son 12 ayda 11 kişiden 86 giriş); aralık olarak
                          ve kaynağın adıyla verildi, euro olarak okundu.
     · para ve kambiyo    docs/kktc-mevzuat.md · 8 (38/1997)
   Kur çevirisi bilerek yok. ESKİ YAZIDAN ALINMAYANLAR: TL cinsinden kira,
   yemek, benzin ve araç kiralama rakamları (kaynağı yoktu, 2025'te bile
   eskimişti), sıcaklık dereceleri, sağlık ve eğitim sistemi iddiaları,
   "uygun yaşam maliyeti" ve "vergi avantajı" genellemeleri.
   09.10.2026 (2) · Burak'ın güncellemesi: yazı uzadı (h3'lü alt bölümler),
   metin içi bağlantı arttı (öteki taşınan yazılar dahil), yazar Murat Ortaç,
   tarih yeni yazı gibi (publishedAt 2026-10-09, updatedAt yok; eski sitedeki
   tarih 22.05.2025 idi), yazı içine bir fotoğraf.
   Ortac'a dair cümleler sitenin KKTC sayfalarından (countryContent.ts · kktc,
   kktcFiyat.ts, bankaKktc.ts). KKTC'de banka adı yazılmıyor (teyit KKTC 20). */
import type { BlogPost } from "@/lib/blog";
import { SLUG } from "@/lib/blogTemel";
import { POST_PHOTO } from "@/lib/media";

export const POST_KKTC_YASAM: BlogPost = {
  slug: SLUG.kktcYasam,
  category: "ulke-rehberi",
  title: "Kıbrıs'ta yaşam 2026: KKTC'de yaşam maliyeti ve iş imkanları",
  heroAccent: "yaşam maliyeti ve iş imkanları",
  summary:
    "KKTC'de yaşam maliyeti, para birimi, asgari ücret ve iş imkanları resmî rakamlarla. Kıbrıs'ta yaşamak ve iş kurmak isteyenler için 2026 rehberi.",
  /* 10.10.2026 · Burak: yazılar toplu girildi; tarihleri 2026'ya yay.
     Yayın tarihi yayıldı, güncelleme tarihi rakamların doğrulandığı gün
     (yazı içindeki "Ekim 2026 itibarıyla" ifadeleriyle tutarlı). */
  publishedAt: "2026-05-14",
  updatedAt: "2026-10-09",
  topic: "Yaşam ve çalışma",
  country: "kktc",
  tags: ["KKTC", "Yaşam maliyeti", "Çalışma izni"],
  author: "Murat Ortaç",
  cover: POST_PHOTO.girneLiman,

  seo: {
    title: "Kıbrıs'ta Yaşam 2026: KKTC Yaşam Maliyeti ve İş İmkanları",
    description:
      "KKTC'de asgari ücret 1 Temmuz 2026'dan beri net 61.677 TL. Kıbrıs'ta kira, para birimi, çalışma izni ve hangi işlerin yapıldığı resmî kaynaklarla.",
  },

  sourceNote:
    "Asgari ücret KKTC Çalışma ve Sosyal Güvenlik Bakanlığı'ndan, enflasyon ve istihdam KKTC İstatistik Kurumu'ndan alınmıştır. Kira ve fiyat aralıkları resmî veri değildir; Numbeo'nun Girne sayfasından aktarılmıştır. Bilgiler 9 Ekim 2026 itibarıyla günceldir.",

  body: [
    {
      kind: "ozet",
      items: [
        "KKTC'nin resmî para birimi Türk lirası; döviz bulundurmak ve dövizle sözleşme yapmak serbest.",
        "KKTC'de asgari ücret 1 Temmuz 2026'dan beri brüt 70.893 TL, net 61.677 TL.",
        "KKTC'de yıllık enflasyon Eylül 2026'da yüzde 35,02; kiralar çoğunlukla dövizle konuşuluyor.",
        "Türkiye vatandaşları KKTC'de yabancı sayılıyor; çalışmak için çalışma izni, şirket yönetmek için iş kurma izni gerekiyor.",
      ],
    },
    {
      kind: "p",
      text: "Kıbrıs'ta yaşam düşünenlerin sorduğu sorular birbirine benziyor: para birimi ne, kira ne kadar, hangi işler yapılıyor, çalışmak için ne gerekiyor. Bu yazı Kuzey Kıbrıs Türk Cumhuriyeti'ni (KKTC) anlatıyor ve rakamları 9 Ekim 2026 itibarıyla resmî kurumların yayımladığı hâliyle veriyor. Resmî kaynağı olmayan rakamlarda kaynağın adını yazdık.",
    },

    { kind: "h2", id: "yasam", text: "Kıbrıs'ta yaşam nasıl, KKTC'de gündelik hayat nasıl işliyor?" },
    {
      kind: "p",
      text: "KKTC'de yaşam Türkiye'den gelen biri için tanıdık başlıyor: resmî dil Türkçe, para birimi Türk lirası, saat dilimi aynı. Farklar gündelik ayrıntılarda çıkıyor. Trafik soldan akıyor, kira dövizle konuşuluyor, çalışmak için izin gerekiyor. Aşağıdaki bölümler bu farkları sırayla ele alıyor.",
    },
    { kind: "h3", text: "KKTC'nin ilçeleri ve şehirleri" },
    {
      kind: "p",
      text: "KKTC altı ilçeden oluşuyor: başkent Lefkoşa, Girne, Gazimağusa, Güzelyurt, İskele ve Lefke. Kamu kurumları ve iş hayatı Lefkoşa'da toplanıyor. Girne ve İskele kıyı şeridindeki turizm ve konut projeleriyle, Gazimağusa limanı ve üniversitesiyle biliniyor. Nerede yaşayacağınızı çoğu zaman işin ya da okulun yeri belirliyor.",
    },
    { kind: "h3", text: "KKTC'de ulaşım ve trafik" },
    {
      kind: "p",
      text: "KKTC'de trafik soldan akıyor; araçların direksiyonu sağda. Şehirler arası toplu taşıma sınırlı olduğu için yerleşenlerin çoğu kendi aracını kullanıyor. Kıbrıs'ta yaşam bütçesi kurarken araç ve akaryakıtı baştan hesaba katmak gerekiyor.",
    },
    {
      kind: "note",
      tone: "warn",
      title: "KKTC ile Güney Kıbrıs aynı ülke değil",
      text: "KKTC Avrupa Birliği üyesi değil. İnternette \"Kıbrıs'ta yaşam\" diye okuduğunuz içeriklerin bir kısmı güneydeki Kıbrıs Cumhuriyeti'ni anlatıyor; oturum, vergi ve banka kuralları iki tarafta farklı.",
    },

    { kind: "h2", id: "para-birimi", text: "KKTC para birimi nedir?" },
    {
      kind: "p",
      text: "KKTC'nin resmî para birimi Türk lirası. Maaşlar, faturalar, market ve akaryakıt fiyatları TL üzerinden. KKTC'de döviz bulundurmak, dövizle sözleşme yapmak ve yurt dışına para göndermek serbest; bunu Para ve Kambiyo İşleri Yasası düzenliyor.",
    },
    {
      kind: "p",
      text: "Serbestlik gündelik hayata da yansıyor: KKTC'de kira ve konut ilanlarında fiyatı sterlin ya da euro olarak görmek olağan. Geliri TL olan biri için kira bütçesi kurla birlikte oynuyor; taşınmadan önce hesaba katılması gereken ilk kalem bu.",
    },

    {
      kind: "gorsel",
      src: POST_PHOTO.bank,
      alt: "ATM tuş takımında işlem yapan el",
      caption: "KKTC'de gündelik ödemeler Türk lirasıyla yapılıyor; döviz hesabı açmak ve dövizle sözleşme yapmak serbest.",
    },
    { kind: "h3", text: "KKTC'de şirket hesabı hangi para biriminde açılıyor?" },
    {
      kind: "p",
      text: "KKTC bankasında kurumsal hesap TL ve dövizle açılıyor. Türkiye'deki müşteriden TL ödeme alınabiliyor; yurt dışından gelen döviz Türkiye'deki aracı banka üzerinden KKTC'deki hesaba ulaşıyor. Hesabın nasıl açıldığı [KKTC banka hesabı sayfasında](/kktc/banka-hesabi) adım adım yazıyor.",
    },

    { kind: "h2", id: "yasam-maliyeti", text: "Kıbrıs'ta yaşam maliyeti 2026'da ne kadar?" },
    {
      kind: "p",
      text: "KKTC'de fiyatlar hızlı değişiyor. KKTC İstatistik Kurumu'nun [Eylül 2026 tüketici fiyat endeksine](https://istatistik.gov.ct.tr/HABERLER/t252ketici-fiyat-endeksi-eyl252l-2026) göre fiyatlar bir ayda yüzde 3,34, bir yılda yüzde 35,02 arttı. Bir yıl önceki TL fiyatlarla bütçe yapmak bu yüzden yanıltıyor.",
    },
    { kind: "h3", text: "KKTC'de hangi fiyatlar daha hızlı artıyor?" },
    {
      kind: "p",
      text: "KKTC İstatistik Kurumu'na göre Eylül 2026'da en hızlı artan ana grup yüzde 12,52 ile eğitim oldu; ulaştırma yüzde 5,66, gıda ve alkolsüz içecekler yüzde 2,66 arttı. Fiyatlar 2025'in aralık ayına göre yüzde 28,15 yukarıda. Okul çağında çocuğu olan aileler için eğitim, araç kullananlar için ulaştırma kalemi bütçeyi en çok oynatan başlıklar.",
    },
    { kind: "h3", text: "Kıbrıs'ta ev kiraları ne kadar?" },
    {
      kind: "p",
      text: "KKTC'de kira için resmî bir istatistik yayımlanmıyor. Aşağıdaki aralıklar, kullanıcıların kendi girdiği fiyatları toplayan Numbeo'nun Girne sayfasından; son on iki ayda 11 kişinin girdiği 86 fiyata dayanıyor. Veri az olduğu için aralıklar yalnızca büyüklük fikri veriyor.",
    },
    {
      kind: "tablo",
      caption: "Girne'de kira ve gider aralıkları · Numbeo, 2 Ekim 2026",
      head: ["Kalem", "Aralık"],
      rows: [
        ["1+1 daire kirası, merkez", "528 - 1.000 €"],
        ["1+1 daire kirası, merkez dışı", "411 - 718 €"],
        ["3+1 daire kirası, merkez", "762 - 1.796 €"],
        ["3+1 daire kirası, merkez dışı", "586 - 1.916 €"],
        ["Elektrik, su ve benzeri faturalar (85 m²)", "96 - 360 €"],
        ["Ev interneti", "14 - 30 €"],
        ["Uygun bir restoranda bir öğün", "8 - 30 €"],
        ["Benzin, litre", "1,19 - 1,70 €"],
      ],
      foot: "Resmî veri değildir. Rakamlar kaynakta euro olarak yayımlanıyor; kur çevirisi yapılmadı. Öteki ilçelerde kira farklı olabilir.",
    },
    {
      kind: "p",
      text: "Kıbrıs'ta ev kiralarken kiranın hangi para biriminde yazıldığına, kaç aylık peşin istendiğine ve depozitoya bakın. Bu üçü sözleşmeden sözleşmeye değişiyor ve ilk ayın nakit ihtiyacını belirliyor.",
    },

    { kind: "h2", id: "asgari-ucret", text: "KKTC'de asgari ücret 2026'da ne kadar?" },
    {
      kind: "p",
      text: "KKTC'de asgari ücret 1 Temmuz 2026'dan beri aylık brüt 70.893 TL, net 61.677 TL. Saatlik karşılığı 408,99 TL. Rakamı Asgari Ücret Saptama Komisyonu belirliyor ve [Çalışma ve Sosyal Güvenlik Bakanlığı](https://csgb.gov.ct.tr/ASGAR%C4%B0-%C3%9CCRET) yayımlıyor. KKTC'de asgari ücret 2026'da iki kez belirlendi.",
    },
    {
      kind: "tablo",
      caption: "KKTC asgari ücreti, 2026",
      head: ["Geçerlilik", "Aylık brüt", "Aylık net"],
      rows: [
        ["1 Temmuz 2026'dan itibaren", "70.893 TL", "61.677 TL"],
        ["1 Ocak - 30 Haziran 2026", "60.618 TL", "52.738 TL"],
      ],
      foot: "Kaynak: KKTC Çalışma ve Sosyal Güvenlik Bakanlığı. Aynı rakamı KKTC Gelir ve Vergi Dairesi de duyuruyor.",
    },
    {
      kind: "p",
      text: "Asgari ücreti yukarıdaki kira aralıklarıyla yan yana koyduğunuzda KKTC'de tek maaşla kira ödemenin neden zorlaştığı görülüyor. Kıbrıs'ta yaşam maliyetini belirleyen şey çoğu zaman gelirin TL, kiranın döviz olması.",
    },

    { kind: "h3", text: "KKTC'de maaştan gelir vergisi nasıl kesiliyor?" },
    {
      kind: "p",
      text: "KKTC'de ücret geliri artan oranlı gelir vergisine tabi; oranlar yüzde 10'dan başlayıp yüzde 37'ye çıkıyor. KKTC Gelir ve Vergi Dairesi'nin 2026 tablosuna göre yıllık kişisel indirim 655.000 TL; on iki maaş alan biri için ayda 54.583 TL. Vergi, indirimlerden sonra kalan tutara uygulanıyor. Dilimlerin tamamı [KKTC vergi yazımızda](/blog/kktc-vergi-avantajlari) tablo olarak duruyor.",
    },
    {
      kind: "p",
      text: "KKTC'de asgari ücret aylık tutar olarak açıklanıyor. Saatlik belirlenen bir örnekle karşılaştırmak isterseniz [İngiltere asgari ücret yazımıza](/blog/ingiltere-asgari-ucret) bakabilirsiniz.",
    },

    { kind: "h2", id: "ne-is-yapilir", text: "Kıbrıs'ta ne iş yapılır?" },
    {
      kind: "p",
      text: "KKTC İstatistik Kurumu'nun 2025 üçüncü çeyrek işgücü anketine göre KKTC'de 189.791 kişi çalışıyor, işsizlik oranı yüzde 4,7. İstihdamın ağırlığı hizmet sektöründe. Kıbrıs'ta iş arayanların en sık karşılaştığı alanlar şunlar:",
    },
    {
      kind: "list",
      items: [
        "Turizm ve konaklama: oteller, restoranlar ve bunlara hizmet veren işletmeler.",
        "Yükseköğretim: üniversiteler ve öğrenci nüfusuna bağlı işler.",
        "İnşaat ve emlak: konut projeleri ve satış ofisleri.",
        "Perakende ve gündelik hizmetler.",
      ],
    },
    { kind: "h3", text: "Kıbrıs'ta kendi işini kurmak" },
    {
      kind: "p",
      text: "Kıbrıs'ta kendi işini kurmak isteyenler için iki ayrı yol var. KKTC iç piyasasına satış yapacaksanız yerel bir limited şirket kuruluyor ve şirket KKTC'nin genel vergi kurallarına giriyor. Müşterileriniz KKTC dışındaysa Serbest Liman ve Bölge şirketi gündeme geliyor; bu şirket KKTC dışına yaptığı işte kurumlar ve gelir vergisi ödemiyor.",
    },
    {
      kind: "p",
      text: "KKTC Serbest Liman şirketi en çok şu işlere uyuyor:",
    },
    {
      kind: "list",
      items: [
        "Yurt dışındaki müşterilere hizmet veren yazılımcılar ve serbest çalışanlar.",
        "Malı Serbest Liman'dan yurt dışına giden transit ticaret ve ihracat işleri.",
        "Şirketinde TL hesaba ihtiyaç duyan işler.",
      ],
    },
    {
      kind: "p",
      text: "Mal ticareti yapıp Avrupa Birliği'ne satış planlıyorsanız gümrük tarafında [EORI numarası](/blog/eori-numarasi-nedir-nasil-alinir) da karşınıza çıkıyor. İş fikri arayanlar için [Dubai'de iş fikirleri yazımız](/blog/dubai-is-fikirleri-en-karlı-is-imkanlari) başka bir ülkeden örnekler veriyor.",
    },

    { kind: "h2", id: "calisma-izni", text: "KKTC'de çalışmak için izin gerekiyor mu?" },
    {
      kind: "p",
      text: "Evet. Türkiye vatandaşları KKTC'de yabancı sayılıyor ve çalışmak için çalışma izni almak zorunda. Başvuruyu işveren yapıyor. [Bakanlığın yayımladığı usule](https://csgb.gov.ct.tr/YABANCICALISMAIZNI) göre sıra şöyle:",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "İşveren, çalışan KKTC'ye gelmeden önce Bakanlıktan ön izin alıyor.",
        "Çalışan KKTC'ye giriş yaptıktan sonra işveren en geç 15 gün içinde çalışma izni başvurusunu yapıyor.",
        "İşlemler en geç 30 gün içinde tamamlanıyor; izin en az 6 ay, en çok 1 yıl için veriliyor.",
      ],
    },
    {
      kind: "p",
      text: "KKTC'de çalışma izni belirli bir işyeri ve işveren için geçerli; başka bir işyerinde aynı izinle çalışılamıyor. Bütün harç ve giderleri işveren ödüyor, çalışanın ücretinden kesinti yapılamıyor.",
    },

    { kind: "h3", text: "KKTC'de çalışma izni nasıl uzatılıyor?" },
    {
      kind: "p",
      text: "KKTC'de çalışma izninin uzatma başvurusu, izin bitmeden en çok iki ay önce yapılabiliyor; süre dolduktan sonra en geç 90 gün içinde yapılmış olması gerekiyor. Uzatma için, biten izin döneminde yurt dışında 135 günden fazla kalmamış olmak şart. İşe başlanmazsa ya da iş sözleşmesi sona ererse izin geçersiz oluyor ve Bakanlık izni iptal ediyor.",
    },

    { kind: "h2", id: "sirket", text: "KKTC'de şirket kurmak oturum hakkı verir mi?" },
    {
      kind: "p",
      text: "Hayır. KKTC'de şirket sahibi olmak kendiliğinden oturum ya da çalışma hakkı vermiyor. KKTC'de oturup şirketini yönetecek yabancı ortak, Çalışma ve Sosyal Güvenlik Bakanlığı'ndan ayrıca iş kurma izni alıyor. Türkiye'de yaşamaya devam edenlerin bakacağı konu ise Türkiye'deki vergi tarafı.",
    },
    {
      kind: "p",
      text: "KKTC'de yaşamak ile KKTC'de şirket kurmak ayrı kararlar. KKTC Serbest Liman şirketiyle Stripe, PayPal, Payoneer, Shopify Payments, Amazon ve Etsy hesabı açılmıyor; tahsilat KKTC bankası ve yerel sanal POS üzerinden yürüyor. Bu yüzden [e-ticaret yapanlar](/sektorler/e-ticaret) için çoğu zaman [İngiltere](/ingiltere) ya da [Dubai](/dubai) daha uygun çıkıyor. Üçünü [ülke karşılaştırmasında](/ulkeler) yan yana görebilir, kendi durumunuzu [uygunluk testinde](/uygunluk-testi) deneyebilirsiniz.",
    },
    {
      kind: "note",
      tone: "info",
      title: "Ortac Global bu konuda ne yapıyor?",
      text: "Ortac Global KKTC'de Serbest Liman ve Bölge şirketi kuruyor; kuruluşu ve sonrasındaki muhasebeyi Lefkoşa'daki ofisinden yürütüyor. Kuruluş ve ilk yıl toplamı 9.920 €, süre belgeler tamamlandıktan sonra yaklaşık 30-40 iş günü. İmza ve banka hesabı için bir kez KKTC'ye geliyorsunuz. İş kurma izni kuruluş hizmetinin içinde değil.",
    },
    {
      kind: "p",
      text: "Kuruluş adımları ve fiyatın kalemleri [KKTC'de şirket kurma sayfasında](/kktc), hesap açılışı ve tahsilat kanalları [KKTC banka hesabı sayfasında](/kktc/banka-hesabi), yıllık yükümlülükler [KKTC muhasebe sayfasında](/kktc/muhasebe) yazıyor.",
    },

    { kind: "h2", id: "karsilastirma", text: "Kıbrıs'ta yaşam Dubai ve İngiltere'ye göre nasıl?" },
    {
      kind: "p",
      text: "KKTC'yi Dubai ve İngiltere'den ayıran ilk şey dil ve mesafe: KKTC'de gündelik hayat Türkçe yürüyor ve Türkiye'ye yakın. Para birimi de Türk lirası; Dubai'de dirhem, İngiltere'de sterlinle yaşıyorsunuz. Buna karşılık KKTC şirketinin uluslararası ödeme kuruluşlarına erişimi yok; yurt dışına çevrim içi satış yapan işler için bu fark belirleyici oluyor.",
    },
    {
      kind: "p",
      text: "Öteki iki ülkede gündelik hayatı ve maliyetleri aynı sırayla anlattık: [Dubai'de yaşam rehberi](/blog/dubai-yasam-rehberi-maliyetler-is-imkanlari) ve [İngiltere'de yaşam rehberi](/blog/ingiltere-yasam-rehberi-is-imkanlari-vize-maliyetler). Kararınızı vergi belirleyecekse [gelir vergisi olmayan ülkeler yazımız](/blog/gelir-vergisi-olmayan-ulkeler-2025) de işinize yarar.",
    },

    { kind: "h2", id: "kontrol-listesi", text: "Kıbrıs'a taşınmadan önce nelere bakmalı?" },
    {
      kind: "p",
      text: "Kıbrıs'ta yaşamaya karar vermeden önce aşağıdaki başlıkları netleştirmek, ilk ayların sürprizlerini azaltıyor:",
    },
    {
      kind: "list",
      items: [
        "Geliriniz hangi para biriminde olacak, kiranız hangisinde? İkisi farklıysa kur hareketi bütçenize doğrudan yansıyor.",
        "Çalışacaksanız ön izni işvereniniz aldı mı? Ön izin KKTC'ye gelmeden önce alınıyor.",
        "Kira sözleşmesinde para birimi, peşin istenen ay sayısı ve depozito yazıyor mu?",
        "Araç kullanacak mısınız? Trafik soldan akıyor ve toplu taşıma sınırlı.",
        "Şirket kuracaksanız müşterileriniz nerede ve tahsilatı hangi kanaldan yapacaksınız?",
      ],
    },

    { kind: "h2", id: "sss", text: "Sık sorulan sorular" },
    {
      kind: "sss",
      items: [
        {
          q: "Kıbrıs'ta yaşam pahalı mı?",
          a: "KKTC'de yıllık enflasyon Eylül 2026'da yüzde 35,02. Kira çoğunlukla dövizle konuşulduğu için geliri TL olanlarda en ağır kalem kira oluyor. Numbeo'ya göre Girne'de 1+1 daire kirası 411 ile 1.000 euro arasında değişiyor; bu resmî veri değil.",
        },
        {
          q: "KKTC para birimi nedir?",
          a: "KKTC'nin resmî para birimi Türk lirası. Döviz bulundurmak, dövizle sözleşme yapmak ve yurt dışına para göndermek serbest; kira ve konut ilanlarında sterlin ve euro sık görülüyor.",
        },
        {
          q: "KKTC'de asgari ücret ne kadar?",
          a: "KKTC'de asgari ücret 1 Temmuz 2026'dan beri aylık brüt 70.893 TL, net 61.677 TL. Rakamı Çalışma ve Sosyal Güvenlik Bakanlığı yayımlıyor.",
        },
        {
          q: "Kıbrıs'ta ne iş yapılır?",
          a: "KKTC'de istihdamın ağırlığı hizmet sektöründe: turizm ve konaklama, üniversiteler, inşaat ve emlak, perakende. Kendi işini kuracaklar için yerel limited şirket ve Serbest Liman şirketi olmak üzere iki yol var.",
        },
        {
          q: "Türkiye vatandaşı KKTC'de izinsiz çalışabilir mi?",
          a: "Hayır. Türkiye vatandaşları KKTC'de yabancı sayılıyor. İşverenin önce ön izin, girişten sonra 15 gün içinde çalışma izni başvurusu yapması gerekiyor.",
        },
        {
          q: "KKTC'de şirket kurarsam oturum alır mıyım?",
          a: "Şirket kurmak kendiliğinden oturum vermiyor. KKTC'de oturup şirketi yönetecekseniz ayrıca iş kurma izni almanız gerekiyor. Şirket tarafı için [KKTC sayfasına](/kktc) bakabilirsiniz.",
        },
        {
          q: "KKTC Avrupa Birliği üyesi mi?",
          a: "Hayır. KKTC Avrupa Birliği üyesi değil ve güneydeki Kıbrıs Cumhuriyeti ile aynı ülke değil. AB içinde tescilli şirket ya da AB oturumu arayanlar için KKTC bu ihtiyacı karşılamıyor.",
        },
      ],
    },
  ],

  links: [
    {
      label: "KKTC'de şirket kurmak",
      href: "/kktc",
      line: "Serbest Liman şirketinin adımları, belgeleri ve 9.920 €'luk toplamın kalemleri.",
    },
    {
      label: "KKTC'de banka hesabı",
      href: "/kktc/banka-hesabi",
      line: "Hesabın nasıl açıldığı ve hangi tahsilat kanallarının çalıştığı.",
    },
    {
      label: "KKTC vergi avantajları 2026",
      href: "/blog/kktc-vergi-avantajlari",
      line: "Vergi oranları, Serbest Liman muafiyetinin şartı ve sınırları.",
    },
  ],

  closing: {
    title: "KKTC'de şirket kurmayı mı düşünüyorsunuz?",
    line: "İşinize KKTC'nin mi başka bir ülkenin mi uyduğunu ilk görüşmede birlikte değerlendiriyoruz.",
    cta: "İletişime geçin",
  },

  footnote:
    "Bu yazı genel bilgilendirme amaçlıdır; kişiye özel vergi, hukuk ya da göçmenlik danışmanlığı değildir. Asgari ücret ve fiyatlar yıl içinde değişir; kira aralıkları resmî veri değildir.",
};
