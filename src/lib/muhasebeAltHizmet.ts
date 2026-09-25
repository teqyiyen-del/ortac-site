import { AFTER_SETUP, type AfterItem } from "@/lib/afterSetup";
import type { Faq } from "@/lib/countryContent";

/* ============================================================================
   DUBAİ MUHASEBE · ALT HİZMET SAYFALARI — tek içerik kaynağı
   Rota: app/dubai/muhasebe/[alt]/page.tsx · CSS: css/svc-muhasebe-alt.css

   15.09.2026 · marketing listesi, madde 14 ("Dubai Bookkeeping, VAT
   Registration, Corporate Tax Registration, VAT Return, Audit gibi …
   SEO tarafında daha iyi sonuç alırız"). Burak seçti: "kesinlikle ele alınsın."

   ALTI SAYFA = FİYAT LİSTESİNİN ALTI KALEMİ. Her kaydın `kalem` alanı
   afterSetup.ts'teki satırın id'si; bedel, kapsam listesi ve not oradan
   okunuyor ve BURADA HİÇBİR TUTAR YAZILMIYOR. Birebirliğin gerekçesi rota
   dosyasının başında.

   MEVZUAT CÜMLELERİ — her olgu kartının `dayanak` alanı var ve boş değilse
   ekranda kartın dibinde basılıyor. Rakamların ve sürelerin hepsi 15.09.2026
   tarihli resmî kaynak taramasından: tax.gov.ae (FTA kılavuzları, konsolide
   yasa metinleri), mof.gov.ae (Ministerial Decision'lar ve duyurular),
   dmcc.ae. Özeti docs/bae-mevzuat.md'de, kaynak adresleriyle. Bir olgunun
   birincil kaynağı okunamadıysa o olgu YAZILMADI.

   2024'TE YAZILMIŞ BİR SAYFANIN YANLIŞ SÖYLEYECEĞİ ÜÇ ŞEY ve buradaki hâli:
     · denetlenmiş tablo kararı MD 82/2023 değil, 2025'ten başlayan dönemler
       için Ministerial Decision No. 84 of 2025,
     · küçük işletme indirimi 2026'da bitmiyor, 31.12.2029'a kadar biten
       dönemlere uzatıldı (Maliye Bakanlığı duyurusu, 07.08.2026),
     · KDV geç ödeme cezası 14.04.2026'dan beri yıllık %14
       (Cabinet Decision No. 129 of 2025).

   DURUŞ (brand.ts · STANCE_LIMITS) burada da geçerli:
     · kesin süre taahhüdü yok — yazılı süreler mevzuatın süreleri,
       bizim işlem hızımız değil,
     · kişiye özel vergi görüşü yok — çerçeve anlatılıyor, çıkış teklif,
     · banka/otorite onayı garantisi yok.

   KİŞİ ÖNERİSİ: bu dosyadaki mevzuat cümleleri Murat Ortaç'ın gözünden
   geçmeli (docs/durum.md'de açık iş olarak yazılı). Sayfalar yayında, ama
   "müşavir okudu" onayı henüz yok.
   ========================================================================= */

/* Adresler muhasebeAltAdres.ts'te (hafif, tarayıcıya giden parça); burada
   yeniden dışa aktarılıyor. */
import { altHizmetHref, type AltSlug } from "@/lib/muhasebeAltAdres";
export { MUHASEBE_KOK, altHizmetHref, ALT_SLUGLAR } from "@/lib/muhasebeAltAdres";
export type { AltSlug } from "@/lib/muhasebeAltAdres";

export type Olgu = { title: string; line: string; dayanak?: string };
export type Adim = { title: string; line: string };
export type KunyeSatir = { k: string; v: string };

export type AltHizmet = {
  slug: AltSlug;
  /** afterSetup.ts · items[].id — bedelin ve kapsam listesinin kaynağı */
  kalem: string;
  /** kırıntı, kardeş kartı ve bedel başlığındaki kısa ad */
  kisaAd: string;
  /** kardeş kartındaki tek satır */
  ozet: string;
  seo: { title: string; description: string; serviceName: string };
  hero: { title: string; accent: string; lead: string };
  /** hero kartı; "Bedeli" satırı kalemden ekleniyor, burada yazılmıyor */
  kunye: KunyeSatir[];
  neZaman: { heading: string; accent: string; lead?: string; items: Olgu[] };
  surec: { heading: string; accent: string; adimlar: Adim[] };
  sizden: string[];
  /** kalemin kendi `scope` listesi yoksa "Hizmete dahil olanlar" bunu basar */
  bizden: string[];
  sss: Faq[];
  kapanis: { title: string; accent: string };
};

export const ALT_HIZMETLER: AltHizmet[] = [
  /* ---------------------------------------------------------- defter tutma */
  {
    slug: "defter-tutma",
    kalem: "aylik-muhasebe",
    kisaAd: "Defter tutma",
    ozet: "Aylık kayıt, banka mutabakatı ve raporlama.",
    seo: {
      title: "Dubai Defter Tutma (Bookkeeping) Hizmeti | Ortac Global",
      description:
        "Dubai şirketiniz için aylık defter tutma: gelir-gider kayıtları, fatura işleme, banka mutabakatı ve raporlama. Kimin için zorunlu, kayıtlar ne kadar saklanıyor, bedeli ne.",
      serviceName: "Dubai'de defter tutma (bookkeeping) hizmeti",
    },
    hero: {
      title: "Dubai defter tutma hizmeti.",
      accent: "defter tutma hizmeti.",
      lead: "Gelir, gider, fatura ve banka hareketleriniz her ay işleniyor; yıl sonu beyanı toplu değil, hazır bir defterden çıkıyor.",
    },
    kunye: [
      { k: "Kim için", v: "Mainland ve serbest bölgedeki her şirket" },
      { k: "Ne zaman", v: "Şirket faaliyette olduğu sürece" },
      { k: "Sıklık", v: "Aylık" },
    ],
    neZaman: {
      heading: "Defter kimin için zorunlu.",
      accent: "zorunlu.",
      items: [
        {
          title: "Kayıt tutmak zorunlu",
          line: "İş yapan her şirket muhasebe kayıtlarını ve ticari defterini tutmak zorunda; mainland ya da serbest bölge ayrımı yok.",
          dayanak: "Federal Decree-Law No. 28 of 2022 (Vergi Usul), md. 4 · Federal Decree-Law No. 47 of 2022, md. 56",
        },
        {
          title: "Kayıtlar yıllarca saklanıyor",
          line: "Kurumlar vergisi kayıtları vergi döneminin bitiminden itibaren yedi yıl, KDV kayıtları beş yıl saklanıyor; gayrimenkul kayıtlarında süre daha uzun.",
          dayanak: "Federal Decree-Law No. 47 of 2022, md. 56 · Cabinet Decision No. 74 of 2023, md. 3",
        },
        {
          title: "Beyanın dayanağı defter",
          line: "Mali tablolar ve kurumlar vergisi beyanı aylık kayıtlardan çıkıyor. Yıl sonunda toplu tutulan defterde eksik belge geriye dönük toplanamıyor.",
        },
      ],
    },
    surec: {
      heading: "Her ay nasıl yürüyor.",
      accent: "nasıl yürüyor.",
      adimlar: [
        { title: "Belge akışı", line: "Faturaların, fişlerin ve banka ekstrelerinin bize hangi yoldan geleceği bir kez tanımlanıyor." },
        { title: "Kayıt", line: "Satış ve alış faturaları işleniyor, gider belgeleri sınıflanıyor." },
        { title: "Banka mutabakatı", line: "Ay sonunda banka hareketleri defterle karşılaştırılıyor; fark o ay içinde bulunuyor." },
        { title: "Aylık rapor", line: "Gelir-gider tablosu ve nakit durumu panele yükleniyor." },
      ],
    },
    sizden: [
      "Satış ve alış faturaları",
      "Gider belgeleri ve fişler",
      "Banka ekstreleri",
      "Sözleşmeler ve tekrar eden ödemeler",
    ],
    bizden: [],
    sss: [
      {
        q: "Dubai'de defter tutmak zorunlu mu?",
        a: "Evet. Kurumlar vergisine tabi her şirket muhasebe kayıtlarını düzenli tutmak ve vergi döneminin bitiminden itibaren yedi yıl saklamak zorunda. Yıl sonunda toplu tutulan defter hem cezaya hem yanlış vergi hesabına açık.",
      },
      {
        q: "Serbest bölge şirketinin de defter tutması gerekiyor mu?",
        a: "Evet. Serbest bölge şirketi de kurumlar vergisine kayıt oluyor ve kayıt tutuyor. %0 oranından yararlanıyorsa şartları sağladığını gösteren de bu kayıtlar.",
      },
      {
        q: "Aylık ücret her şirkette aynı mı?",
        a: "Hayır. Fiyat listesindeki tutar başlangıç seviyesi; işlem hacmi yüksek şirketlerde aylık işlem sayısına göre değişebiliyor. Fatura ve hareket sayınızı söylerseniz teklifte net rakamla gösteriyoruz.",
      },
    ],
    kapanis: { title: "Defterinizi her ay birlikte kapatalım.", accent: "birlikte kapatalım." },
  },

  /* -------------------------------------------------------------- KDV kaydı */
  {
    slug: "kdv-kaydi",
    kalem: "kdv-kaydi",
    kisaAd: "KDV kaydı",
    ozet: "Eşik kontrolü, başvuru ve vergi numarası.",
    seo: {
      title: "Dubai KDV Kaydı (VAT Registration) | Ortac Global",
      description:
        "Dubai'de KDV kaydı: 375.000 AED zorunlu ve 187.500 AED isteğe bağlı eşik, başvuru süresi, gereken belgeler, kayıttan istisna ve bedeli.",
      serviceName: "Dubai'de KDV kaydı (VAT registration) hizmeti",
    },
    hero: {
      title: "Dubai KDV kaydı.",
      accent: "KDV kaydı.",
      lead: "Vergiye tabi tedarikiniz eşiği geçtiyse kayıt zorunlu; geçmediyse isteğe bağlı kayıt ya da kayıttan istisna mümkün. Hangisinin sizde doğduğunu birlikte netleştiriyoruz.",
    },
    kunye: [
      { k: "Zorunlu eşik", v: "375.000 AED" },
      { k: "İsteğe bağlı", v: "187.500 AED" },
      { k: "Başvuru süresi", v: "Yükümlülük doğduktan itibaren 30 gün" },
      { k: "Sonuç", v: "KDV vergi numarası (TRN)" },
    ],
    neZaman: {
      heading: "KDV kaydı ne zaman gerekiyor.",
      accent: "ne zaman gerekiyor.",
      items: [
        {
          title: "Zorunlu kayıt",
          line: "Son 12 aydaki vergiye tabi tedarik ve ithalatınız 375.000 AED'yi geçtiyse ya da önümüzdeki 30 günde geçecekse kayıt zorunlu. Başvuru yükümlülük doğduktan itibaren 30 gün içinde.",
          dayanak: "Federal Decree-Law No. 8 of 2017, md. 13 · Cabinet Decision No. 52 of 2017, md. 7",
        },
        {
          title: "İsteğe bağlı kayıt",
          line: "Tedarikleriniz ya da vergiye tabi giderleriniz 187.500 AED'yi geçiyorsa, zorunlu eşiğin altında olsanız da kayıt olabiliyorsunuz.",
          dayanak: "Federal Decree-Law No. 8 of 2017, md. 17 · Cabinet Decision No. 52 of 2017, md. 8",
        },
        {
          title: "Kayıttan istisna",
          line: "Yalnızca sıfır oranlı tedarik yapıyorsanız (örneğin yalnız ihracat) talep üzerine kayıttan istisna mümkün. İşiniz değişirse FTA'ya bildiriliyor.",
          dayanak: "Federal Decree-Law No. 8 of 2017, md. 15",
        },
      ],
    },
    surec: {
      heading: "Kayıt nasıl yürüyor.",
      accent: "nasıl yürüyor.",
      adimlar: [
        { title: "Eşik kontrolü", line: "Son 12 ayın ve önümüzdeki 30 günün tedarikleri eşikle karşılaştırılıyor." },
        { title: "Belgeler", line: "Lisans, kimlik ve ciro belgeleri başvuruya hazırlanıyor." },
        { title: "Başvuru", line: "Başvuru FTA'nın EmaraTax sisteminde yapılıyor ve sorulara cevap veriliyor." },
        { title: "Numara ve takvim", line: "TRN geliyor; faturalarınız ve beyan takviminiz buna göre düzenleniyor." },
      ],
    },
    sizden: [
      "Ticaret lisansı",
      "Ortak ve müdürlerin pasaport ve Emirates ID kopyaları",
      "Son 12 ayın satış dökümü ya da önümüzdeki dönemin tahmini",
      "Şirket sözleşmesi ve banka hesap bilgileri",
    ],
    bizden: ["Eşik ve istisna değerlendirmesi", "Başvuru dosyasının hazırlanması", "EmaraTax başvurusu ve takibi", "TRN sonrası fatura ve beyan takviminin kurulması"],
    sss: [
      {
        q: "Eşiğin altındayım, yine de KDV kaydı olabilir miyim?",
        a: "Tedarikleriniz ya da vergiye tabi giderleriniz 187.500 AED'yi geçiyorsa isteğe bağlı kayıt mümkün. Kayıt olunca her dönem beyanname verme yükümlülüğü de başlıyor; ikisini birlikte değerlendiriyoruz.",
      },
      {
        q: "Eşiği geçtim ama kayıt olmadım, ne olur?",
        a: "Süresinde kayıt başvurusu yapmamanın idari cezası 10.000 AED ve kayıt, yükümlülüğün doğduğu tarihe göre başlatılıyor; o tarihten sonraki satışların KDV'si de doğuyor. Durumu tespit edip kaydı ve varsa düzeltmeleri birlikte yapıyoruz.",
      },
      {
        q: "KDV kaydı olunca ne değişiyor?",
        a: "Faturalarınıza KDV ekleniyor, aldığınız hizmetlerdeki KDV'yi indirebiliyorsunuz ve her dönem beyanname veriyorsunuz. Beyanname kalemi ayrı sayfada ve ayrı fiyatla yazılı.",
      },
    ],
    kapanis: { title: "KDV kaydınızı doğru eşikle yapalım.", accent: "doğru eşikle yapalım." },
  },

  /* -------------------------------------------------------- KDV beyannamesi */
  {
    slug: "kdv-beyannamesi",
    kalem: "kdv-beyannamesi",
    kisaAd: "KDV beyannamesi",
    ozet: "Dönemsel beyan, ödeme takibi.",
    seo: {
      title: "Dubai KDV Beyannamesi (VAT Return) Hizmeti | Ortac Global",
      description:
        "Dubai'de KDV beyannamesi: kimler veriyor, dönem ve son gün, satış olmayan dönemde beyan, hata düzeltme ve bedeli.",
      serviceName: "Dubai'de KDV beyannamesi (VAT return) hizmeti",
    },
    hero: {
      title: "Dubai KDV beyannamesi.",
      accent: "KDV beyannamesi.",
      lead: "KDV kaydı olan şirketin beyannamesi her dönem hazırlanıp FTA'ya gönderiliyor; o dönemde satış olmasa da.",
    },
    kunye: [
      { k: "Kim için", v: "KDV kaydı olan şirket" },
      { k: "Sıklık", v: "Genellikle üç ayda bir" },
      { k: "Son gün", v: "Dönem bitiminden sonraki 28. gün" },
    ],
    neZaman: {
      heading: "Beyanname ne zaman veriliyor.",
      accent: "ne zaman veriliyor.",
      items: [
        {
          title: "Dönem ve son gün",
          line: "Beyanname ve ödeme, vergi döneminin bitimini izleyen 28. güne kadar yapılıyor. Standart dönem üç takvim ayı; FTA aylık gibi farklı bir dönem atayabiliyor.",
          dayanak: "Cabinet Decision No. 52 of 2017 (KDV Uygulama Yönetmeliği), md. 62 ve 64",
        },
        {
          title: "Satış yoksa da beyan",
          line: "O dönemde hiç satış ya da alış olmasa da kayıtlı şirket beyannamesini veriyor.",
        },
        {
          title: "Gecikmenin bedeli",
          line: "Geç beyanın cezası 1.000 AED, 24 ay içinde tekrarında 2.000 AED. Geç ödemede ödenmeyen tutara yıllık %14 işliyor.",
          dayanak: "Cabinet Decision No. 40 of 2017 (Cabinet Decision No. 129 of 2025 ile değişik, 14.04.2026)",
        },
        {
          title: "Hata düzeltme",
          line: "Verilmiş beyannamede vergiyi eksik gösteren hata çıkarsa düzeltme beyanı veriliyor. Kendiliğinden verilen düzeltmenin cezası vergi farkına aylık %1.",
          dayanak: "Federal Decree-Law No. 28 of 2022 (Vergi Usul), md. 10",
        },
      ],
    },
    surec: {
      heading: "Her dönem nasıl yürüyor.",
      accent: "nasıl yürüyor.",
      adimlar: [
        { title: "Dönemin kapanması", line: "Dönemin satış ve alış kayıtları defterde tamamlanıyor." },
        { title: "Hesaplama", line: "Hesaplanan ve indirilecek KDV fatura fatura eşleştiriliyor." },
        { title: "Onayınız", line: "Beyanname taslağı ve ödenecek tutar size gönderiliyor." },
        { title: "Gönderim", line: "Beyanname EmaraTax'ta veriliyor, ödeme son güne kadar takip ediliyor." },
      ],
    },
    sizden: [
      "Dönemin satış ve alış faturaları",
      "İthalat ve gümrük belgeleri (varsa)",
      "Banka ekstreleri",
      "Beyanname taslağına onayınız",
    ],
    bizden: ["Dönem kayıtlarının kontrolü", "Hesaplanan ve indirilecek KDV'nin eşleştirilmesi", "Beyannamenin hazırlanması ve gönderimi", "Ödeme son gününün takibi"],
    sss: [
      {
        q: "O dönemde hiç satış yapmadım, beyanname vermem gerekiyor mu?",
        a: "Evet. KDV kaydı olan şirket, dönemde işlem olmasa da beyannamesini veriyor. Vermemenin cezası 1.000 AED, 24 ay içinde tekrarında 2.000 AED.",
      },
      {
        q: "Beyanname hangi sıklıkta veriliyor?",
        a: "Çoğu şirket için üç ayda bir. FTA bazı şirketlere aylık dönem atayabiliyor; dönemin ne olduğu kayıt belgenizde yazılı.",
      },
      {
        q: "Verdiğim beyannamede hata çıktı, ne yapılıyor?",
        a: "Hatanın tutarına göre ya bir sonraki beyannamede düzeltiliyor ya da gönüllü düzeltme beyanı veriliyor. Hangisinin gerektiğini kayıtlara bakıp söylüyoruz.",
      },
    ],
    kapanis: { title: "KDV beyanlarınızı zamanında verelim.", accent: "zamanında verelim." },
  },

  /* ------------------------------------------------- kurumlar vergisi kaydı */
  {
    slug: "kurumlar-vergisi-kaydi",
    kalem: "kurumlar-vergisi-kaydi",
    kisaAd: "Kurumlar vergisi kaydı",
    ozet: "FTA kaydı ve vergi numarası.",
    seo: {
      title: "Dubai Kurumlar Vergisi Kaydı (Corporate Tax Registration) | Ortac Global",
      description:
        "Dubai'de kurumlar vergisi kaydı: serbest bölge dahil kimler kayıt oluyor, son gün nasıl belirleniyor, geç kayıt cezası ve bedeli.",
      serviceName: "Dubai'de kurumlar vergisi kaydı (corporate tax registration) hizmeti",
    },
    hero: {
      title: "Dubai kurumlar vergisi kaydı.",
      accent: "kurumlar vergisi kaydı.",
      lead: "Serbest bölgedekiler dahil her şirket kayıt yaptırıyor, vergi %0 çıkacak olsa da. Yeni kurulan şirketin süresi kuruluştan itibaren üç ay.",
    },
    kunye: [
      { k: "Kim için", v: "Mainland ve serbest bölgedeki tüm şirketler" },
      { k: "Son gün", v: "Yeni şirkette kuruluştan itibaren 3 ay" },
      { k: "Geç kayıt", v: "10.000 AED ceza" },
      { k: "Sonuç", v: "Kurumlar vergisi numarası" },
    ],
    neZaman: {
      heading: "Kayıt kimin için, ne zaman.",
      accent: "ne zaman.",
      items: [
        {
          title: "Herkes kayıt oluyor",
          line: "BAE'de kurulu her tüzel kişi kurumlar vergisine kayıt yaptırıyor; serbest bölge şirketleri ve vergisi %0 çıkacak olanlar dahil.",
          dayanak: "Federal Decree-Law No. 47 of 2022, md. 51",
        },
        {
          title: "Yeni şirkette üç ay",
          line: "1 Mart 2024'ten sonra kurulan şirket, kuruluşundan itibaren üç ay içinde başvuruyor. Daha önce kurulanların lisans ayına göre belirlenen son günleri 2024 sonunda doldu.",
          dayanak: "FTA Decision No. 3 of 2024, md. 3",
        },
        {
          title: "Geç kaydın cezası",
          line: "Süresinde yapılmayan kaydın cezası 10.000 AED. FTA'nın bugün yürüttüğü uygulamada ilk beyan, ilk vergi döneminin bitiminden itibaren yedi ay içinde verilirse bu ceza siliniyor.",
          dayanak: "Cabinet Decision No. 75 of 2023 (Cabinet Decision No. 10 of 2024 ile) · FTA ceza muafiyeti uygulaması",
        },
      ],
    },
    surec: {
      heading: "Kayıt nasıl yürüyor.",
      accent: "nasıl yürüyor.",
      adimlar: [
        { title: "Yapı kontrolü", line: "Lisans, ortaklık yapısı ve mali yıl birlikte netleştiriliyor." },
        { title: "Belgeler", line: "Lisans, sözleşme ve kimlik belgeleri başvuruya hazırlanıyor." },
        { title: "Başvuru", line: "Başvuru EmaraTax'ta yapılıyor ve FTA'nın soruları cevaplanıyor." },
        { title: "Numara ve takvim", line: "Kayıt numarası geliyor; ilk beyanın son günü takvime yazılıyor." },
      ],
    },
    sizden: [
      "Ticaret lisansı",
      "Şirket sözleşmesi (MoA) ya da kuruluş belgesi",
      "Ortak ve müdürlerin pasaport ve Emirates ID kopyaları",
      "İletişim ve mali yıl bilgisi",
    ],
    bizden: [],
    sss: [
      {
        q: "Vergim %0 çıkacak, yine de kayıt olmam gerekiyor mu?",
        a: "Evet. Kayıt yükümlülüğü oranın ne çıkacağından bağımsız. Serbest bölgede %0 oranından yararlanan şirket de kayıt oluyor ve beyan veriyor.",
      },
      {
        q: "Kayıt için son gün ne zaman?",
        a: "1 Mart 2024'ten sonra kurulan şirkette kuruluştan itibaren üç ay. Daha önce kurulmuş şirketlerin son günleri 2024 sonunda doldu; kaydı hâlâ yoksa geç kayıt durumunda.",
      },
      {
        q: "Kaydı geç yaparsam ne olur?",
        a: "Geç kaydın cezası 10.000 AED. FTA'nın bugünkü uygulamasında ilk beyan, ilk vergi döneminin bitiminden itibaren yedi ay içinde verilirse ceza siliniyor, ödenmişse hesaba alacak yazılıyor. Bu yüzden geç kalmış bir dosyada kayıt ile ilk beyanı birlikte planlıyoruz.",
      },
    ],
    kapanis: { title: "Kurumlar vergisi kaydınızı süresinde yapalım.", accent: "süresinde yapalım." },
  },

  /* ---------------------------------------------- kurumlar vergisi beyanı */
  {
    slug: "kurumlar-vergisi-beyannamesi",
    kalem: "yil-sonu",
    kisaAd: "Kurumlar vergisi beyanı",
    ozet: "Yıl sonu mali tablolar ve beyan.",
    seo: {
      title: "Dubai Kurumlar Vergisi Beyannamesi (Corporate Tax Return) | Ortac Global",
      description:
        "Dubai'de kurumlar vergisi beyannamesi: %0 ve %9 oran, beyanın son günü, küçük işletme indirimi, mali tablolar ve bedeli.",
      serviceName: "Dubai'de kurumlar vergisi beyannamesi ve yıl sonu hizmeti",
    },
    hero: {
      title: "Dubai kurumlar vergisi beyannamesi.",
      accent: "kurumlar vergisi beyannamesi.",
      lead: "Mali yıl kapanınca tablolar hazırlanıyor, vergi hesaplanıyor ve beyan dokuz ay içinde FTA'ya veriliyor; vergi %0 çıksa da.",
    },
    kunye: [
      { k: "Kim için", v: "Kurumlar vergisine kayıtlı her şirket" },
      { k: "Son gün", v: "Mali yıl bitiminden itibaren 9 ay" },
      { k: "Oran", v: "375.000 AED'ye kadar %0, üstü %9" },
    ],
    neZaman: {
      heading: "Beyan ne zaman, nasıl veriliyor.",
      accent: "nasıl veriliyor.",
      items: [
        {
          title: "Dokuz ay",
          line: "Beyanname ve ödeme, vergi döneminin bitiminden itibaren dokuz ay içinde yapılıyor.",
          dayanak: "Federal Decree-Law No. 47 of 2022, md. 53",
        },
        {
          title: "Oran %0 çıksa da beyan",
          line: "Vergilendirilebilir gelirin ilk 375.000 AED'si %0, üstü %9. Vergi çıkmasa da kayıtlı şirket beyanını veriyor.",
          dayanak: "Cabinet Decision No. 116 of 2022",
        },
        {
          title: "Mali tablolar",
          line: "Beyan mali tablolara dayanıyor. Geliri 50 milyon AED'yi aşan şirketlerde ve nitelikli serbest bölge şirketlerinde tabloların denetlenmiş olması gerekiyor.",
          dayanak: "Ministerial Decision No. 84 of 2025",
        },
        {
          title: "Küçük işletme indirimi",
          line: "Geliri o dönemde ve önceki bütün dönemlerde 3 milyon AED'yi aşmayan şirket, 31 Aralık 2029'a kadar biten dönemlerde vergisiz sayılmayı seçebiliyor. Beyan yine veriliyor; nitelikli serbest bölge şirketleri yararlanamıyor.",
          dayanak: "Ministerial Decision No. 73 of 2023 · Maliye Bakanlığı uzatma duyurusu, 07.08.2026",
        },
      ],
    },
    surec: {
      heading: "Yıl sonu nasıl yürüyor.",
      accent: "nasıl yürüyor.",
      adimlar: [
        { title: "Yılın kapanışı", line: "Aylık kayıtlar tamamlanıyor, yıl sonu düzeltmeleri yapılıyor." },
        { title: "Mali tablolar", line: "Bilanço ve gelir tablosu hazırlanıyor." },
        { title: "Vergi hesabı", line: "Muafiyetler, indirimler ve serbest bölge şartları kontrol edilip vergi hesaplanıyor." },
        { title: "Beyan", line: "Beyanname onayınızla EmaraTax'ta veriliyor, varsa ödeme takip ediliyor." },
      ],
    },
    sizden: [
      "Yılın tamamlanmış muhasebe kayıtları",
      "Banka ekstreleri ve kredi belgeleri",
      "Varlık alımları ve sözleşmeler",
      "Denetim gerekiyorsa denetlenmiş tablolar",
    ],
    bizden: ["Yıl sonu kapanış ve düzeltmeler", "Mali tabloların hazırlanması", "Kurumlar vergisi hesabı", "Beyannamenin hazırlanması ve gönderimi"],
    sss: [
      {
        q: "Vergim %0 çıkıyor, beyan vermem gerekiyor mu?",
        a: "Evet. Kayıtlı her şirket, vergi çıksın çıkmasın beyanını vergi döneminin bitiminden itibaren dokuz ay içinde veriyor.",
      },
      {
        q: "Serbest bölgede %0 oranı otomatik mi?",
        a: "Hayır. %0, şartları sağlayan nitelikli serbest bölge şirketinin nitelikli gelirinde uygulanıyor. Şartlar arasında bölgede yeterli faaliyet, denetlenmiş mali tablolar ve nitelikli olmayan gelirin 5 milyon AED ile toplam gelirin %5'inden küçük olanını aşmaması var. Bir şart dönem içinde bozulursa o dönemin başından itibaren statü kaybediliyor.",
      },
      {
        q: "Aylık muhasebe hizmeti yıl sonu beyanını kapsıyor mu?",
        a: "Hayır. Yıl sonu ve kurumlar vergisi beyanı aylık muhasebeden bağımsız yürütülen yıllık bir çalışma ve fiyat listesinde ayrı satır olarak yazılı.",
      },
    ],
    kapanis: { title: "Yıl sonunuzu erkenden hazırlayalım.", accent: "erkenden hazırlayalım." },
  },

  /* ------------------------------------------------------ bağımsız denetim */
  {
    slug: "bagimsiz-denetim",
    kalem: "bagimsiz-denetim",
    kisaAd: "Bağımsız denetim",
    ozet: "Denetlenmiş mali tablolar.",
    seo: {
      title: "Dubai Bağımsız Denetim (Audit) Hizmeti | Ortac Global",
      description:
        "Dubai'de bağımsız denetim: hangi şirketler için zorunlu, serbest bölgede %0 oranı ile ilişkisi, sürecin adımları ve bedeli.",
      serviceName: "Dubai'de bağımsız denetim (audit) hizmeti",
    },
    hero: {
      title: "Dubai bağımsız denetim.",
      accent: "bağımsız denetim.",
      lead: "Kurumlar vergisi için geliri 50 milyon AED'yi aşan şirketlerde ve %0 oranından yararlanan serbest bölge şirketlerinde şart; şirketler kanunu ve bazı bölge otoriteleri de denetim istiyor.",
    },
    kunye: [
      { k: "Kim için", v: "Geliri 50 milyon AED üstü, nitelikli serbest bölge ve mainland LLC şirketleri" },
      { k: "Ne zaman", v: "Mali yıl kapandıktan sonra, beyandan önce" },
      { k: "Sıklık", v: "Yıllık" },
    ],
    neZaman: {
      heading: "Denetim kimin için zorunlu.",
      accent: "zorunlu.",
      items: [
        {
          title: "Gelir 50 milyon AED üstü",
          line: "Vergi dönemindeki geliri 50 milyon AED'yi aşan şirket, kurumlar vergisi için denetlenmiş mali tablo hazırlıyor.",
          dayanak: "Ministerial Decision No. 84 of 2025, md. 2",
        },
        {
          title: "Nitelikli serbest bölge şirketi",
          line: "Serbest bölgede %0 oranından yararlanan şirket, gelirinden bağımsız olarak denetlenmiş mali tablo hazırlıyor.",
          dayanak: "Ministerial Decision No. 84 of 2025, md. 2",
        },
        {
          title: "Mainland LLC",
          line: "Şirketler kanunu mainland limited ve anonim şirketlerin her yıl denetçi atamasını öngörüyor.",
          dayanak: "Federal Decree-Law No. 32 of 2021 (Ticari Şirketler), md. 27",
        },
        {
          title: "Bölge otoritesi",
          line: "Bazı serbest bölgeler de denetlenmiş tablo istiyor; örneğin DMCC üye şirketlerinden tabloyu mali yıl sonundan itibaren altı ay içinde yüklemesini bekliyor. Sizin bölgenizin şartı lisansınıza bağlı.",
          dayanak: "DMCC, Audited Financial Statements Submission Guidelines (2025)",
        },
      ],
    },
    surec: {
      heading: "Denetim nasıl yürüyor.",
      accent: "nasıl yürüyor.",
      adimlar: [
        { title: "Kapsam", line: "Denetimin neden gerektiği ve hangi dönemi kapsadığı netleştiriliyor." },
        { title: "Hazırlık", line: "Defter kapanıyor, mutabakatlar ve belgeler denetime hazırlanıyor." },
        { title: "Denetim çalışması", line: "Denetçinin soruları ve örneklem talepleri cevaplanıyor." },
        { title: "Rapor", line: "Denetim raporu çıkıyor; beyana ve bölge otoritesine giden dosyaya ekleniyor." },
      ],
    },
    sizden: [
      "Yılın tamamlanmış muhasebe kayıtları",
      "Banka ekstreleri ve bakiye teyitleri",
      "Sözleşmeler, faturalar ve varlık belgeleri",
      "Denetçinin istediği ek belgeler",
    ],
    bizden: ["Denetim kapsamının netleştirilmesi", "Defterin denetime hazırlanması", "Denetim sürecinin yürütülmesi", "Raporun beyan ve lisans dosyasına bağlanması"],
    sss: [
      {
        q: "Şirketim küçük, yine de denetim gerekir mi?",
        a: "Kurumlar vergisi açısından geliri 50 milyon AED'nin altındaysa ve %0 serbest bölge oranından yararlanmıyorsanız gerekmiyor. Ama şirketler kanunu mainland LLC'lere yıllık denetçi atamayı öngörüyor ve bazı serbest bölgeler de istiyor; şirket türünüze ve bölgenize bakıp söylüyoruz.",
      },
      {
        q: "Denetim ücreti neye göre değişiyor?",
        a: "İşlem hacmine ve kayıtların durumuna göre. Fiyat listesindeki tutar başlangıç seviyesi; kapsamı gördükten sonra teklifte net rakam veriyoruz.",
      },
      {
        q: "Denetim ile yıl sonu beyanı aynı iş mi?",
        a: "Hayır. Yıl sonu çalışması tabloları hazırlayıp beyanı veriyor; denetim o tabloların bağımsız incelenmesi. İkisi fiyat listesinde ayrı satır.",
      },
    ],
    kapanis: { title: "Denetiminizi beyandan önce bitirelim.", accent: "beyandan önce bitirelim." },
  },
];

export function altHizmet(slug: string): AltHizmet | undefined {
  return ALT_HIZMETLER.find((h) => h.slug === slug);
}

/** Fiyat kaleminin id'sinden alt sayfa adresi (ihtiyaç bulucu, fiyat listesi). */
export function altHizmetHrefByKalem(kalemId: string): string | undefined {
  const h = ALT_HIZMETLER.find((x) => x.kalem === kalemId);
  return h ? altHizmetHref(h.slug) : undefined;
}

/** Sayfanın bedel kalemi — afterSetup.ts'ten, burada tutar yok. */
export function altHizmetKalemi(h: AltHizmet): AfterItem | undefined {
  return AFTER_SETUP.dubai?.items.find((i) => i.id === h.kalem);
}
