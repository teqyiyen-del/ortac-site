/* İNGİLTERE'DE YAŞAM REHBERİ · eski siteden taşınan yazı
   (Search Console, 16 ay: 276 tıklama, 79.828 gösterim, ortalama sıra 9,6;
   "ingiltere" gibi geniş sorgularda çıkıyor, tıklama oranı düşük).

   ADRES eski sitedekiyle aynı; yalnız içerik baştan yazıldı.

   NEDEN BAŞTAN: eski yazı kaynaksız rakamlarla doluydu (şehir şehir kira
   aralıkları, sektör maaşları, "aylık 3.000 £ lazım", kreş ve özel okul
   ücretleri, yakıt fiyatı) ve birkaç bilgisi yanlıştı ya da eskimişti:
   asgari ücret "11,50-12,50 £", "yatırımcı vizesi", "NHS oturum izni olan
   herkese ücretsiz". Yeni yazı arayanın asıl sorduğu üç şeye indi: vize,
   iş ve maaş, kira. Şehir tanıtımı, sosyal hayat, ulaşım ve "yapılmaması
   gerekenler" bölümleri alınmadı (kaynağı yok, işimiz değil).

   KAYNAK (09.10.2026'da tek tek okundu):
     · ziyaretçi vizesi     gov.uk/standard-visitor (135 £, 6 ay)
     · vize zorunluluğu     Immigration Rules, Appendix Visitor: Visa national list
     · çalışma vizesi       gov.uk/skilled-worker-visa (+ /your-job, /how-much-it-costs,
                            /knowledge-of-english): 41.700 £, 819 / 1.618 £, 1.270 £, B2
     · öğrenci vizesi       gov.uk/student-visa (558 £)
     · kurucu vizesi        gov.uk/innovator-founder-visa (1.357 £, onay 1.000 £, 3 yıl)
     · Türk iş insanı       gov.uk/turkish-business-person (yeni başvuruya kapalı)
     · sağlık harcı         gov.uk/healthcare-immigration-application (1.035 / 776 £)
     · süresiz oturum       gov.uk/indefinite-leave-to-remain
     · vatandaşlık          gov.uk/apply-citizenship-indefinite-leave-to-remain (1.839 £)
     · kira                 ONS, Private rent and house prices, UK (16 Eylül 2026 bülteni,
                            Ağustos 2026 verisi)
     · kazanç               ONS, Annual Survey of Hours and Earnings (Nisan 2025 verisi)
     · gelir vergisi        gov.uk/income-tax-rates (2026-27)
     · ziyaretçi ücretleri  gov.uk/standard-visitor/apply-standard-visitor-visa
   TARİH VE YAZAR (Burak, 09.10.2026): yazı yeni yazı gibi çıkıyor
   (publishedAt bugün, updatedAt yok), yazar Murat Ortaç.
   Süresiz oturum süresinin uzatılması hükümetin açıkladığı bir plan; kural ve
   tarih yayımlanmadığı için yazıda kesin süre olarak YAZILMADI, uyarı olarak
   geçti. Kur çevirisi bilerek yok. Market, ulaşım ve fatura için tek bir
   resmî aylık rakam olmadığından bu kalemlere rakam yazılmadı.
   Ortac'a dair cümleler sitenin İngiltere sayfasından (countryContent). */
import type { BlogPost } from "@/lib/blog";
import { SLUG } from "@/lib/blogTemel";
import { POST_PHOTO } from "@/lib/media";

export const POST_UK_YASAM: BlogPost = {
  slug: SLUG.ukYasam,
  category: "ulke-rehberi",
  title: "İngiltere'de yaşam 2026: vize, iş imkanları ve maliyetler",
  heroAccent: "vize, iş imkanları ve maliyetler",
  summary:
    "İngiltere'de yaşamak için hangi vize gerekiyor, çalışma vizesinin maaş şartı ne, ortalama kira ve kazanç ne kadar? Resmî kaynaklardan 2026 rakamları.",
  /* 10.10.2026 · Burak: yazılar toplu girildi; tarihleri 2026'ya yay.
     Yayın tarihi yayıldı, güncelleme tarihi rakamların doğrulandığı gün
     (yazı içindeki "Ekim 2026 itibarıyla" ifadeleriyle tutarlı). */
  publishedAt: "2026-03-26",
  updatedAt: "2026-10-09",
  topic: "Yaşam ve vize",
  country: "ingiltere",
  tags: ["İngiltere", "Vize", "Yaşam maliyeti"],
  author: "Murat Ortaç",
  cover: POST_PHOTO.londraEvler,

  seo: {
    title: "İngiltere'de Yaşam 2026: Vize, İş İmkanları, Maliyetler",
    description:
      "İngiltere'de yaşam rehberi: vize türleri ve ücretleri, çalışma vizesinde 41.700 sterlin maaş şartı, sağlık harcı, ortalama kira ve maaş. 2026 rakamları.",
  },

  sourceNote:
    "Vize ücretleri ve şartları Birleşik Krallık hükümetinin resmî sayfalarından (gov.uk), kira ve kazanç rakamları Ulusal İstatistik Ofisi'nden (ONS) alınmıştır. Bilgiler 9 Ekim 2026 itibarıyla günceldir.",

  body: [
    {
      kind: "ozet",
      items: [
        "Türkiye Cumhuriyeti vatandaşları İngiltere'ye her amaçla girişte vize alır; yaşamak için çalışma, öğrenci, aile ya da kurucu vizelerinden biri gerekir.",
        "Çalışma vizesinde (Skilled Worker) maaşın yılda en az 41.700 sterlin ya da işin kendi taban ücreti olması gerekir; hangisi yüksekse o geçerlidir.",
        "Ortalama aylık kira Ağustos 2026'da Birleşik Krallık genelinde 1.400, Londra'da 2.332 sterlin (ONS).",
        "İngiltere'de şirket kurmak oturum ya da çalışma hakkı vermez.",
      ],
    },
    {
      kind: "p",
      text: "İngiltere'de yaşam planı üç soruyla başlar: hangi vizeyle gideceksiniz, ne kazanacaksınız ve kiraya ne ödeyeceksiniz. Bu yazı üçünü de resmî kaynakların 9 Ekim 2026 itibarıyla yayımladığı rakamlarla yanıtlıyor. Vize ücretleri yılda birkaç kez değişebildiği için başvurudan önce her rakamı bağlantısı verilen resmî sayfadan yeniden kontrol edin.",
    },

    { kind: "h2", id: "vize", text: "İngiltere'de yaşamak için hangi vize gerekiyor?" },
    {
      kind: "p",
      text: "İngiltere'ye Türkiye Cumhuriyeti pasaportuyla her amaçla girişte önceden vize almak gerekiyor. Ziyaretçi vizesi (Standard Visitor) 135 sterlin ve en çok 6 ay kalış veriyor; bu vizeyle İngiltere'de bir işverene bağlı çalışılamıyor ve yerleşilemiyor. İngiltere'de yaşamak için uzun süreli vizelerden biri gerekiyor. En sık kullanılan dört yol aşağıda; şartların tamamı [hükümetin vize sayfalarında](https://www.gov.uk/browse/visas-immigration) duruyor.",
    },
    {
      kind: "tablo",
      caption: "İngiltere vize türleri ve başvuru ücretleri · 9 Ekim 2026",
      head: ["Vize", "Kimin için", "Başvuru ücreti", "Süre"],
      rows: [
        ["Ziyaretçi (Standard Visitor)", "Gezi, aile ziyareti, iş görüşmesi", "135 £", "En çok 6 ay"],
        ["Çalışma (Skilled Worker)", "Onaylı işverenden iş teklifi olan", "819 £ (3 yıla kadar), 1.618 £ (3 yıldan uzun)", "5 yıla kadar, uzatılabilir"],
        ["Öğrenci (Student)", "Lisanslı okuldan kabul alan", "558 £", "Lisans düzeyinde çoğunlukla 5 yıla kadar"],
        ["Kurucu (Innovator Founder)", "Onaylı kurumdan iş fikrine onay alan", "1.357 £ ve kuruma 1.000 £ onay ücreti", "3 yıl, uzatılabilir"],
      ],
      foot: "Ücretler Birleşik Krallık dışından yapılan başvuru içindir ve kişi başınadır. Uzun süreli vizelerde sağlık harcı ayrıca ödenir.",
    },
    { kind: "h3", text: "İngiltere ziyaretçi vizesi neye izin veriyor?" },
    {
      kind: "p",
      text: "İngiltere ziyaretçi vizesi gezi, aile ziyareti ve iş görüşmesi gibi kısa amaçlar içindir. Tek seferlik vize 135 sterlin. Sık gidenler için uzun süreli seçenekler var: 2 yıllık vize 506, 5 yıllık vize 903, 10 yıllık vize 1.128 sterlin. Uzun süreli vizelerde de her ziyaret en çok 6 ay sürebiliyor; vizenin süresi kalış süresini uzatmıyor. Başvuru seyahatten en erken 3 ay önce yapılıyor ve karar çoğunlukla 3 hafta içinde çıkıyor. Ücretler [ziyaretçi vizesi sayfasında](https://www.gov.uk/standard-visitor/apply-standard-visitor-visa).",
    },
    { kind: "h3", text: "İngiltere öğrenci vizesi nasıl alınır?" },
    {
      kind: "p",
      text: "İngiltere öğrenci vizesi için lisanslı bir okuldan koşulsuz kabul ve okulun düzenlediği kabul belgesi (CAS) gerekiyor. Başvuru ücreti 558 sterlin; Birleşik Krallık dışından başvuru, dersin başlamasından en erken 6 ay önce yapılabiliyor. Vize 18 yaş üstü ve lisans düzeyindeki öğrenciler için çoğunlukla 5 yıla kadar, lisans altı programlarda 2 yıla kadar veriliyor. Öğrenci vizesiyle çalışma, programa ve dönem içi ya da dönem dışı olmasına göre sınırlı; kendi hesabına çalışmak yasak. Ayrıntılar [öğrenci vizesi sayfasında](https://www.gov.uk/student-visa).",
    },
    { kind: "h3", text: "Aile vizesi ve Türk vatandaşlarına özel yol" },
    {
      kind: "p",
      text: "Eş ve çocuklar için aile vizeleri ayrı bir başlıktır ve şartları başvuranın İngiltere'deki statüsüne göre değişir. Türk vatandaşlarına özel Türk İş İnsanı vizesi (Turkish Businessperson) yeni başvuruya kapalı; yalnız mevcut vize sahipleri uzatma yapabiliyor. Durum [Türk İş İnsanı vizesi sayfasında](https://www.gov.uk/turkish-business-person) yazıyor.",
    },

    { kind: "h2", id: "calisma-vizesi", text: "İngiltere çalışma vizesinin şartları neler?" },
    {
      kind: "p",
      text: "İngiltere çalışma vizesi (Skilled Worker) için önce iş teklifi gerekir. İşverenin İçişleri Bakanlığı'nca onaylı sponsor olması, işin uygun meslekler listesinde yer alması ve işverenin size bir sponsorluk belgesi (certificate of sponsorship) düzenlemesi şart. Maaş yılda en az 41.700 sterlin ya da o mesleğin taban ücreti olmalı; hangisi yüksekse o uygulanıyor. Sağlık ve eğitim mesleklerinde ulusal maaş skalaları geçerli. Güncel rakamlar [çalışma vizesi sayfasında](https://www.gov.uk/skilled-worker-visa/your-job).",
    },
    {
      kind: "list",
      items: [
        "İngilizce: 8 Ocak 2026'dan beri ilk başvuruda B2 düzeyi isteniyor.",
        "Birikim: banka hesabında 28 gün boyunca en az 1.270 sterlin; işveren ilk ayın masrafını üstlenirse aranmıyor.",
        "Karar süresi: Birleşik Krallık dışından başvuruda çoğunlukla 3 hafta.",
        "Başvuru, sponsorluk belgesindeki işe başlama tarihinden en erken 3 ay önce yapılabiliyor.",
      ],
    },
    { kind: "h3", text: "İngiltere çalışma vizesi toplamda kaça mal olur?" },
    {
      kind: "p",
      text: "İngiltere çalışma vizesinin başvuru ücreti Birleşik Krallık dışından 3 yıla kadar 819, 3 yıldan uzun süre için 1.618 sterlin. Ülke içinden uzatma ya da vize değişikliğinde ücret 943 ve 1.865 sterline çıkıyor. Başvuru ücretine sağlık harcı ekleniyor: beş yıllık vize için tek kişinin ödeyeceği toplam 1.618 sterlin başvuru ücreti ve 5.175 sterlin sağlık harcıyla 6.793 sterlin ediyor. Eş ve çocuklar aynı kalemleri ayrı ayrı ödüyor. Kalemlerin tamamı [çalışma vizesi ücret sayfasında](https://www.gov.uk/skilled-worker-visa/how-much-it-costs).",
    },

    { kind: "h2", id: "saglik", text: "İngiltere vizesinde sağlık harcı ne kadar?" },
    {
      kind: "p",
      text: "İngiltere'de 6 aydan uzun süreli vizeye başvuranlar, başvuru ücretine ek olarak göçmenlik sağlık harcı (Immigration Health Surcharge) öder. Harç yılda 1.035 sterlin; öğrenciler, 18 yaş altındakiler ve Youth Mobility vizesi sahipleri için 776 sterlin. Tutar vizenin her yılı için peşin ödenir: beş yıllık bir çalışma vizesinde yalnız harç 5.175 sterlin eder ve aile üyelerinin her biri ayrıca öder.",
    },
    {
      kind: "p",
      text: "Sağlık harcını ödeyen kişi, vizesinin başladığı günden itibaren kamu sağlık sistemi NHS'i kullanır. Reçeteli ilaç, diş tedavisi ve göz muayenesi için yine ücret ödenir. Ziyaretçi vizesinde sağlık harcı alınmaz; ziyaretçi NHS'ten bu kapsamda yararlanamaz. Tutarların tamamı [sağlık harcı sayfasında](https://www.gov.uk/healthcare-immigration-application/how-much-pay).",
    },

    { kind: "h2", id: "sirket-oturum", text: "İngiltere'de şirket kurmak oturum hakkı verir mi?" },
    {
      kind: "p",
      text: "Hayır. İngiltere'de limited şirket kurmak ya da şirketin direktörü olmak vize, oturum ya da çalışma hakkı doğurmuyor. Türkiye'den [İngiltere'de şirket kurabilir](/ingiltere) ve şirketi uzaktan yönetebilirsiniz, ama İngiltere'de yaşamak için ayrı bir vize başvurusu gerekir.",
    },
    {
      kind: "p",
      text: "Kendi işini kurarak İngiltere'ye yerleşmek isteyenler için resmî yol Innovator Founder vizesi. Bu vizede iş fikrinin yeni, yenilikçi, uygulanabilir ve büyümeye açık olması ve onaylı bir kurumun fikri değerlendirip onaylaması aranıyor; hâlihazırda faaliyette olan bir işe ortak olmak yetmiyor. Vize 3 yıllık veriliyor, onay veren kurumla 12. ve 24. ayda görüşme yapılıyor. Şartlar [Innovator Founder sayfasında](https://www.gov.uk/innovator-founder-visa).",
    },
    {
      kind: "note",
      tone: "warn",
      title: "Şirket ile vize iki ayrı başvuru",
      text: "İngiltere şirketinizin olması vize başvurusunda size öncelik kazandırmaz. Şirket Companies House'a, vize İçişleri Bakanlığı'na yapılan iki ayrı başvurudur ve biri ötekinin yerine geçmez.",
    },

    { kind: "h2", id: "is-maas", text: "İngiltere'de iş imkanları ve maaşlar ne durumda?" },
    {
      kind: "p",
      text: "İngiltere'de tam zamanlı çalışanların medyan brüt kazancı Nisan 2025'te haftada 766,60 sterlin, yılda 39.039 sterlin oldu; bir yıl öncesine göre haftalık kazanç yüzde 5,3 arttı. Rakamlar Ulusal İstatistik Ofisi'nin [yıllık kazanç araştırmasından](https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/latest) ve Birleşik Krallık genelini kapsıyor. Çalışma vizesinin 41.700 sterlinlik eşiği bu medyanın üzerinde kalıyor.",
    },
    {
      kind: "p",
      text: "Aynı araştırmaya göre kamu sektöründe medyan haftalık kazanç 807,67, özel sektörde 752,28 sterlin. Bir yılda kazancın en hızlı arttığı sektörler finans ve sigorta (yüzde 10,3), idari ve destek hizmetleri (yüzde 8,3) ile bilgi ve iletişim (yüzde 6,5) oldu. Türkiye'den iş arayanlar için ilk süzgeç işverenin sponsor lisansı: lisansı olmayan işveren çalışma vizesi için sponsorluk belgesi düzenleyemiyor. Lisanslı işverenlerin listesi gov.uk'ta açık.",
    },
    { kind: "h3", text: "İngiltere'de asgari ücret ne kadar?" },
    {
      kind: "p",
      text: "İngiltere'de yasal taban ücret 1 Nisan 2026'dan beri 21 yaş ve üstü için saatte 12,71 sterlin. Ücret saatlik belirleniyor ve yaşa göre değişiyor. Aylık brüt karşılığı, net tutar ve yaşa göre oranlar [İngiltere asgari ücret yazısında](/blog/ingiltere-asgari-ucret) hesabıyla birlikte duruyor.",
    },
    { kind: "h3", text: "İngiltere'de maaştan hangi kesintiler yapılır?" },
    {
      kind: "p",
      text: "İngiltere'de maaştan gelir vergisi ve ulusal sigorta primi kesilir. 2026-27 vergi yılında yıllık 12.570 sterline kadar kazanç gelir vergisinden muaf. 12.571 ile 50.270 sterlin arası yüzde 20, 50.271 ile 125.140 sterlin arası yüzde 40, bunun üzeri yüzde 45 oranında vergileniyor; İskoçya'da dilimler farklı. Dilimler [gelir vergisi sayfasında](https://www.gov.uk/income-tax-rates) yayımlanıyor. Kişisel gelirin hiç vergilenmediği ülkeleri merak ediyorsanız [gelir vergisi olmayan ülkeler yazısına](/blog/gelir-vergisi-olmayan-ulkeler-2025) bakabilirsiniz.",
    },
    {
      kind: "gorsel",
      src: POST_PHOTO.corpTax,
      alt: "Masada vergi formları, hesap makinesi ve kalem",
      caption: "İngiltere'de gelir vergisi ve ulusal sigorta maaştan işveren eliyle kesiliyor.",
    },

    { kind: "h2", id: "kira", text: "İngiltere'de kira ve yaşam maliyeti ne kadar?" },
    {
      kind: "p",
      text: "İngiltere'de yaşam maliyetinin en büyük kalemi kira. Ulusal İstatistik Ofisi'ne göre ortalama aylık özel kira Ağustos 2026'da Birleşik Krallık genelinde 1.400 sterlin; bir yılda yüzde 3,8 arttı. Londra 2.332 sterlinle ortalamanın belirgin üzerinde; Kuzey Doğu İngiltere 788 sterlinle İngiltere'nin en düşük ortalamasına sahip. Rakamlar oda sayısından bağımsız genel ortalamadır ve [ONS'nin aylık kira bülteninden](https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/privaterentandhousepricesuk/latest) alındı.",
    },
    {
      kind: "tablo",
      caption: "Ortalama aylık özel kira · Ağustos 2026 (ONS)",
      head: ["Yer", "Ortalama aylık kira", "Yıllık değişim"],
      rows: [
        ["Birleşik Krallık geneli", "1.400 £", "%3,8"],
        ["İngiltere", "1.459 £", "%4,0"],
        ["Londra", "2.332 £", "%3,5"],
        ["Kuzey Doğu İngiltere", "788 £", "%5,8"],
        ["İskoçya", "1.013 £", "%1,1"],
        ["Galler", "846 £", "%4,3"],
      ],
      foot: "En yüksek ortalama Londra'da Kensington and Chelsea (3.690 £); Londra dışındaki en yüksek ortalama Oxford (1.963 £). Ağustos 2026 rakamları geçicidir, sonraki bültenlerde düzeltilebilir.",
    },
    {
      kind: "p",
      text: "Kiraya ek olarak belediye vergisi (council tax), enerji faturaları, ulaşım ve market harcaması gelir. Bu kalemler şehre, evin vergi dilimine ve hane büyüklüğüne göre değiştiği için tek bir aylık rakam vermek yanıltıcı olur. Bütçeyi kurarken taşınmayı düşündüğünüz şehrin kira ortalamasını ONS bülteninden, council tax tutarını o belediyenin kendi sayfasından alın.",
    },
    { kind: "h3", text: "İngiltere'de ev fiyatları ne kadar?" },
    {
      kind: "p",
      text: "İngiltere'yi de kapsayan Birleşik Krallık genelinde ortalama ev fiyatı Temmuz 2026'da 273.000 sterlin; bir yılda yüzde 1,4 arttı. Rakam aynı ONS bülteninden ve geçici veridir. Aynı bültende ortalama aylık kira 1.400 sterlin olarak geçiyor; iki rakam birlikte, kirada kalmak ile ev almak arasındaki hesabın başlangıç noktasını veriyor.",
    },

    { kind: "h2", id: "kalici-oturum", text: "İngiltere'de kalıcı oturum ve vatandaşlık ne zaman alınır?" },
    {
      kind: "p",
      text: "İngiltere'de süresiz oturum izni (Indefinite Leave to Remain) için bugünkü kurallarda çalışma vizesiyle çoğunlukla 5 yıl, Innovator Founder vizesiyle 3 yıl yaşamış olmak gerekiyor. Süresiz oturumu aldıktan 12 ay sonra vatandaşlığa başvurulabiliyor; vatandaşlık başvurusu tören ücretiyle birlikte 1.839 sterlin. Koşullar [süresiz oturum sayfasında](https://www.gov.uk/indefinite-leave-to-remain).",
    },
    {
      kind: "note",
      tone: "warn",
      title: "Süresiz oturum kuralları değişebilir",
      text: "Birleşik Krallık hükümeti süresiz oturum için aranan süreyi uzatmayı planladığını açıkladı. 9 Ekim 2026 itibarıyla yeni kural ve yürürlük tarihi yayımlanmadı. Uzun vadeli plan yapıyorsanız başvurudan önce gov.uk'taki güncel sayfayı kontrol edin.",
    },

    { kind: "h2", id: "uzaktan-sirket", text: "İngiltere'de yaşamadan İngiltere şirketiyle çalışmak mümkün mü?" },
    {
      kind: "p",
      text: "Evet. İngiltere'de limited şirket kurmak için direktörün İngiltere'de yaşaması gerekmiyor; kuruluş baştan sona uzaktan tamamlanıyor. Türkiye'de yaşayıp yurt dışına satış yapanlar İngiltere şirketini çoğunlukla ödeme altyapısı için tercih ediyor: Stripe, PayPal, Amazon ve Etsy İngiltere şirketiyle çalışıyor. Hesap tarafı [İngiltere banka hesabı sayfasında](/ingiltere/banka-hesabi), online satış yapanlara özel notlar [e-ticaret sayfasında](/sektorler/e-ticaret) anlatılıyor.",
    },
    {
      kind: "p",
      text: "İngiltere vergi avantajı arayanlar için uygun bir ülke sayılmaz: kurumlar vergisi kâra göre yüzde 19 ile 25 arasında. Oranların nasıl işlediği [İngiltere vergi sayfasında](/ingiltere/vergi), kendi kârınızla hesap [kurumlar vergisi hesaplayıcısında](/araclar/kurumlar-vergisi/ingiltere) var. Önceliğiniz oturum ya da düşük vergiyse [Dubai](/dubai) ve [KKTC](/kktc) farklı koşullar sunuyor; üçünü [ülke karşılaştırmasında](/ulkeler) yan yana görebilir, hangisinin işinize uyduğunu [uygunluk testiyle](/uygunluk-testi) deneyebilirsiniz.",
    },
    {
      kind: "note",
      tone: "info",
      title: "Ortac Global bu konuda ne yapıyor?",
      text: "Ortac Global İngiltere'de şirket kuruluşunu ve kuruluş sonrası muhasebeyi Londra ofisinden yürütüyor. Direktörün İngiltere'de yaşaması gerekmediği için kimlik doğrulama dahil her adım uzaktan tamamlanıyor. Kuruluş vize ya da oturum hakkı doğurmuyor; bu yazıdaki vize yolları şirketten ayrı başvurulardır.",
    },

    { kind: "h2", id: "diger-ulkeler", text: "İngiltere dışında hangi ülkelere bakılabilir?" },
    {
      kind: "p",
      text: "İngiltere'de yaşam planı vize şartına takılıyorsa, Ortac Global'in ofisinin bulunduğu öteki iki ülke farklı bir tablo sunuyor. Dubai'de şirket kuran kişi şirketi üzerinden oturum vizesi alabiliyor; yaşam tarafı [Dubai yaşam rehberinde](/blog/dubai-yasam-rehberi-maliyetler-is-imkanlari), hangi işlerin kurulduğu [Dubai iş fikirleri yazısında](/blog/dubai-is-fikirleri-en-karlı-is-imkanlari) anlatılıyor. KKTC için [KKTC yaşam rehberine](/blog/kktc-yasam-rehberi-kibris-is-firsatlari-maliyetler) ve [KKTC vergi avantajları yazısına](/blog/kktc-vergi-avantajlari) bakabilirsiniz.",
    },
    {
      kind: "p",
      text: "İngiltere şirketiyle mal alıp satmayı planlıyorsanız gümrük tarafında ayrıca bir kayıt numarası gerekiyor; ne olduğu ve nasıl alındığı [EORI numarası yazısında](/blog/eori-numarasi-nedir-nasil-alinir) duruyor. Şirketin yıllık yükümlülükleri için [İngiltere muhasebe sayfası](/ingiltere/muhasebe) açık.",
    },

    { kind: "h2", id: "sss", text: "Sık sorulan sorular" },
    {
      kind: "sss",
      items: [
        {
          q: "İngiltere'de yaşamak için hangi vize gerekiyor?",
          a: "İngiltere'de yaşamak için uzun süreli bir vize gerekir: iş teklifi olanlar için çalışma vizesi (Skilled Worker), okul kabulü olanlar için öğrenci vizesi, eşi ya da ailesi İngiltere'de olanlar için aile vizesi, onaylı iş fikri olanlar için Innovator Founder vizesi. Ziyaretçi vizesi en çok 6 ay kalış verir ve yerleşmeye izin vermez.",
        },
        {
          q: "İngiltere çalışma vizesi için maaş şartı ne kadar?",
          a: "İngiltere çalışma vizesinde (Skilled Worker) maaş yılda en az 41.700 sterlin ya da mesleğin taban ücreti olmalı; hangisi yüksekse o geçerli. Sağlık ve eğitim mesleklerinde ulusal maaş skalaları uygulanıyor.",
        },
        {
          q: "İngiltere vizesi ne kadar?",
          a: "9 Ekim 2026 itibarıyla ziyaretçi vizesi 135 sterlin, öğrenci vizesi 558 sterlin, çalışma vizesi 3 yıla kadar 819 sterlin, 3 yıldan uzun süre için 1.618 sterlin. Uzun süreli vizelerde yılda 1.035 sterlin sağlık harcı ayrıca ödeniyor.",
        },
        {
          q: "İngiltere'de ortalama kira ne kadar?",
          a: "Ulusal İstatistik Ofisi'ne göre Ağustos 2026'da ortalama aylık özel kira Birleşik Krallık genelinde 1.400 sterlin, Londra'da 2.332 sterlin, Kuzey Doğu İngiltere'de 788 sterlin.",
        },
        {
          q: "İngiltere'de ortalama maaş ne kadar?",
          a: "İngiltere'yi de kapsayan Birleşik Krallık genelinde tam zamanlı çalışanların medyan brüt kazancı Nisan 2025'te yılda 39.039 sterlin, haftada 766,60 sterlin (ONS). Asgari ücret 21 yaş üstü için saatte 12,71 sterlin; ayrıntısı [asgari ücret yazısında](/blog/ingiltere-asgari-ucret).",
        },
        {
          q: "İngiltere'de şirket kurarsam oturum alabilir miyim?",
          a: "Hayır. İngiltere'de şirket kurmak ya da direktör olmak oturum ve çalışma hakkı vermez. Kendi işiyle yerleşmek isteyenler için resmî yol Innovator Founder vizesidir. Şirket kuruluşunun kendisi için [İngiltere sayfasına](/ingiltere) bakabilirsiniz.",
        },
        {
          q: "İngiltere'de vatandaşlık kaç yılda alınır?",
          a: "Bugünkü kurallarda çalışma vizesiyle çoğunlukla 5 yıl sonra süresiz oturuma, süresiz oturumdan 12 ay sonra vatandaşlığa başvurulabiliyor. Hükümet oturum süresini uzatmayı planladığını açıkladı; kesin kural 9 Ekim 2026 itibarıyla yayımlanmadı.",
        },
      ],
    },
  ],

  links: [
    {
      label: "İngiltere'de şirket kurmak",
      href: "/ingiltere",
      line: "Uzaktan kuruluş adımları ve İngiltere şirketiyle çalışan ödeme kanalları.",
    },
    {
      label: "İngiltere asgari ücret 2026",
      href: "/blog/ingiltere-asgari-ucret",
      line: "Saatlik oranlar, aylık brüt ve net karşılığı.",
    },
    {
      label: "Ülke karşılaştırması",
      href: "/ulkeler",
      line: "İngiltere, Dubai ve KKTC vergi, banka ve oturum başlıklarında yan yana.",
    },
  ],

  closing: {
    title: "İngiltere'de şirket kurmayı mı düşünüyorsunuz?",
    line: "Kuruluştan muhasebeye bütün süreci Londra ofisimizden, Türkçe yürütüyoruz.",
    cta: "İletişime geçin",
  },

  footnote:
    "Bu yazı genel bilgilendirme amaçlıdır; kişiye özel göçmenlik, vergi ya da hukuk danışmanlığı değildir. Vize ücretleri ve şartları sık değişir; başvurudan önce gov.uk'taki güncel sayfayı kontrol edin.",
};
