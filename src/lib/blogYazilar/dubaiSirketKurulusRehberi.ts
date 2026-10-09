/* DUBAİ'DE ŞİRKET KURMA REHBERİ · yeni yazı (10.10.2026)

   NEDEN YAZILDI: Search Console'da "dubai şirketi kurma" 55.897 gösterim,
   0 tıklama, sıra ~13. Sorguyu karşılayan tek sayfa /dubai (hizmet sayfası);
   bilgi arayanın sorusuna baştan sona cevap veren bir rehber yoktu.

   HEDEF SORGULAR: "dubai şirket kurma", "dubai şirketi kurma", "dubai'de
   şirket kurmak", "dubai şirket kurma maliyeti", "dubai şirket kurma
   şartları". Ortak kelime "şirket kurma"; başlıkta, ilk paragrafta ve
   h2'lerin çoğunda geçiyor. "Maliyet" ve "şartlar" başlıkta ve birer h2'de.

   YAMYAMLIK NOTU: /dubai hizmet sayfası aynı baş kelimeye oynuyor. Ayrım:
   hizmet sayfası "Ortac'la kuruluş", bu yazı "konunun tamamı" (kim kurabilir,
   yapı, belgeler, vergi, hatalar). Yazı /dubai'ye yedi ayrı yerden bağlanıyor.
   Maliyet kalemlerinin dökümü zaten ayrı yazıda (SLUG.dubaiMaliyet); burada
   yalnız özet tablo var ve oraya bağlantı veriliyor.

   SLUG: "dubai-sirket-kurulusu-rehberi". SLUG kaydında (lib/blogTemel.ts)
   HENÜZ YOK; o dosyaya dokunmamam istendi. Aşağıdaki `SLUG_GECICI` bağlama
   yapılırken SLUG.dubaiKurulusRehberi gibi bir kayda çevrilecek ve `as
   BlogSlug` kalkacak.

   KAYNAK (her rakam nereden):
     · fiyatlar            lib/dubaiFiyat.ts: IFZA 5.120, Meydan 5.300, DWTC
                           5.820 (kuruluş + 1 yıl lisans); vize 1.953; VIP 800;
                           muhasebe 350/ay, yıllık 3.500. KDV hariç.
                           ELLE YAZILDI, dosyadan okunmuyor: fiyat değişirse bu
                           yazı da güncellenecek (özet, tablo, SSS, links).
     · çok yıllı indirim   Murat Bey, 09.10.2026: IFZA 2 yıl %15, 3 yıl %20,
                           5 yıl %30; Meydan 2-3 yıl %15; DWTC yalnız yıllık.
                           Yalnız YÜZDE yazıldı, türetilmiş toplam yazılmadı
                           (bazın tamamı lisans mı sorusu açık, durum.md).
     · süre                Murat Bey (teyit · Dubai kuruluş 1): kuruluş 5-6
                           gün, vize dahil en fazla 14 gün, Dubai'de 5 iş günü
                           kalınınca süreç yaklaşık 3 hafta.
     · vize                Murat Bey, 09.10.2026: ortak vizesi 2 yıllık, BAE
                           dışında 12 ay; çalışan vizesinde 6 ay. Adımlar
                           lib/vizeDubai.ts.
     · belgeler            lib/countryContent.ts · dubai.docs; "ıslak imza
                           yok, hepsi dijital" teyit (Dubai kuruluş 11).
     · banka ve ödeme      lib/bankaDubai.ts (Wio, Mashreq, Emirates NBD, FAB;
                           Stripe, PayPal, Binance, Amazon Payment Services,
                           Network International).
     · kurumlar vergisi    u.ae · Corporate tax (10.10.2026'da okundu, sayfa
                           güncellemesi 30.03.2026): 375.000 AED'ye kadar %0,
                           üstü %9. Kayıt 3 ay, beyan 9 ay, küçük işletme
                           muafiyeti 3 milyon AED ve 31.12.2029: docs/
                           bae-mevzuat.md (FTA Decision 3/2024, CT Law md. 53,
                           MD 73/2023).
     · KDV                 docs/bae-mevzuat.md: %5, zorunlu kayıt 375.000 AED,
                           gönüllü kayıt 187.500 AED, beyan dönem sonunu
                           izleyen 28. gün.
     · yabancı mülkiyet    u.ae · Full foreign ownership of commercial
                           companies (güncelleme 06.04.2026): 26/2020 sayılı
                           kararname 2021 başında yürürlükte, 32/2021 ile
                           birleştirildi; stratejik etkili faaliyetleri
                           Bakanlar Kurulu belirliyor.
     · iç pazara satış     u.ae · Running a business in a free zone
                           (güncelleme 28.09.2026) ve Dubai Yürütme Konseyi
                           Kararı 11/2025 (dlp.dubai.gov.ae).
     · mainland adımları   u.ae · Steps to start a business on the mainland
                           ve dubaidet.gov.ae (lisansı DET veriyor, fiziki
                           adres ve Dubai'de Ejari kaydı).

   BİLEREK YAZILMAYANLAR:
     · %0 "nitelikli serbest bölge kişisi" oranı ayrıntısıyla anlatılmadı.
       Murat Bey (Dubai kuruluş 3): şartlar pratikte sağlanmıyor, "akıl
       karıştırmak istemem". Tek cümleyle var olduğu ve plana alınmadığı
       söylendi; ayrıntı öteki yazıda (serbest bölge mi mainland mi).
     · asgari sermaye, lisans harcının devlet payı, mainland kuruluş maliyeti,
       vize harçlarının dökümü: doğrulanmış rakam yok.
     · offshore için otorite adı, maliyet ve süre: resmî kaynaktan okunmadı;
       yalnız "ne işe yarar, ne işe yaramaz" düzeyinde.
     · lisans yenileme TUTARI: yenileme bedelinin baz fiyata eşit olduğu teyit
       edilmedi; "teklifte ayrı satır" denildi.
     · Türkiye tarafında oran, süre, madde numarası: kişiye özel görüş
       vermiyoruz; genel çerçeve ve "mali müşavirinizle değerlendirin".
     · Dubai'de bordro hizmeti (yok), banka onay oranı, "garanti" türü söz.
     · Ortac'ın mainland kuruluşu yapıp yapmadığı bilinmiyor: "kuruyoruz"
       denmedi, "ilk görüşmede birlikte değerlendiriyoruz" denildi.
   Ortac'a dair cümleler sitenin Dubai, vize, banka ve hakkımızda
   sayfalarından (1996, üç ülkede kendi ofis, 700'den fazla şirket). */
import type { BlogPost } from "@/lib/blog";
import { SLUG } from "@/lib/blogTemel";
import { GUIDE_PHOTO, POST_PHOTO } from "@/lib/media";

/* GEÇİCİ: slug SLUG kaydına eklenince bu sabit silinir (bkz. dosya başı). */

export const POST_DUBAI_KURULUS_REHBERI: BlogPost = {
  slug: SLUG.dubaiKurulusRehberi,
  category: "ulke-rehberi",
  title: "Dubai'de şirket kurma 2026: şartlar, maliyet ve adım adım süreç",
  heroAccent: "şartlar, maliyet ve adım adım süreç",
  summary:
    "Dubai'de şirket kurma şartları, serbest bölge ve mainland seçimi, belgeler, süre, vize, banka, vergi ve gerçek rakamlarla ilk yıl maliyeti.",
  publishedAt: "2026-09-24",
  topic: "Şirket kuruluşu",
  country: "dubai",
  tags: ["Dubai", "Şirket kuruluşu", "Maliyet"],
  author: "Murat Ortaç",
  cover: POST_PHOTO.dubaiGece,

  seo: {
    title: "Dubai Şirket Kurma 2026: Şartlar, Maliyet ve Süreç",
    description:
      "Dubai'de şirket kurmak $5.120'den başlıyor, kuruluş 5-6 gün sürüyor. Şartlar, belgeler, vize, banka, vergi ve ilk yıl maliyeti tek rehberde.",
  },

  sourceNote:
    "Vergi ve mülkiyet kuralları BAE resmî portalından (u.ae) ve BAE Maliye Bakanlığı ile Federal Vergi Kurumu'nun yayımladığı metinlerden alınmıştır. Fiyatlar ve süreler Ortac Global'in kendi fiyatları ve kendi dosyalarındaki tipik sürelerdir. Bilgiler 10 Ekim 2026 itibarıyla günceldir.",

  body: [
    {
      kind: "ozet",
      items: [
        "Dubai'de şirket kurmak için BAE vatandaşı ortak ya da BAE'de ikamet gerekmiyor; serbest bölge şirketinin tamamı yabancı ortağa ait olabiliyor.",
        "Ortac Global'de Dubai şirket kuruluşu 1 yıllık lisans dahil $5.120'den başlıyor; vize kişi başı $1.953, muhasebe ayda $350.",
        "Dubai'de şirket tescili tipik olarak 5-6 gün sürüyor; vizeyle birlikte süreç en fazla 14 günde tamamlanıyor.",
        "Dubai şirketi net kârının ilk 375.000 AED'si için kurumlar vergisi ödemiyor, üstü için %9 ödüyor; KDV %5.",
      ],
    },
    {
      kind: "p",
      text: "Dubai'de şirket kurma süreci üç karara dayanıyor: şirketin yapısı, faaliyet konusu ve kaç kişiye vize alınacağı. Maliyet, süre ve kime satış yapabileceğiniz bu üç karardan çıkıyor. Bu rehber Dubai'de şirket kurmak isteyenlerin en çok sorduğu konuları sırayla ele alıyor: şartlar, yapı seçimi, adımlar, belgeler, maliyet, vize, banka ve vergi. Rakamlar Ortac Global'in güncel fiyatları ve BAE'nin resmî kaynaklarıdır; bilgiler 10 Ekim 2026 itibarıyla güncel.",
    },

    { kind: "h2", id: "kim-kurabilir", text: "Dubai'de kimler şirket kurabilir?" },
    {
      kind: "p",
      text: "Dubai'de şirket kurmak için BAE vatandaşı olmak ya da BAE'de yaşamak gerekmiyor. Türkiye Cumhuriyeti vatandaşları dahil yabancı gerçek kişiler ve yabancı şirketler Dubai'de şirket ortağı olabiliyor. BAE resmî portalına göre serbest bölge şirketlerinin tamamı yabancı yatırımcıya ait olabiliyor. Mainland şirketlerde de 2021'den beri %100 yabancı mülkiyet mümkün; yalnız Bakanlar Kurulu'nun belirlediği stratejik etkili faaliyetlerde sınır var. [Kuralın özeti BAE resmî portalında](https://u.ae/en/information-and-services/business/Doing-business/doing-business-on-the-mainland/full-foreign-ownership-of-commercial-companies).",
    },
    { kind: "h3", text: "Dubai şirket kurma şartları neler?" },
    {
      kind: "p",
      text: "Dubai'de şirket kurma şartları kısa bir listeye sığıyor: geçerli bir pasaport, lisansa yazılacak faaliyet konusu, BAE'nin isimlendirme kurallarına uyan bir şirket adı ve şirketin kayıtlı adresi. Serbest bölge kuruluşunda adres, lisans paketine dahil paylaşımlı ofis adresiyle karşılanıyor. Kuruluş başvurusu uzaktan yürüyor ve ıslak imza istenmiyor. BAE'ye gelmeniz gereken tek aşama vize: sağlık kontrolü ve biyometri vekâletle yapılmıyor.",
    },
    {
      kind: "p",
      text: "Faaliyet konusu şartların en çok hafife alınanı. Lisans yalnız üzerinde yazan faaliyetler için geçerli ve bazı faaliyetler ek onaya bağlı. Hangi işlerin kurulduğunu [Dubai'de ne iş yapılır](/blog/dubai-is-fikirleri-en-karlı-is-imkanlari) yazısında anlattık. Serbest bölgedeki faaliyet kodlarına [IFZA faaliyet kodu aracından](/araclar/ifza-faaliyet-kodu) bakabilir, ad adaylarınız için [şirket ismi üretecini](/araclar/isim-ureteci) kullanabilirsiniz.",
    },

    { kind: "h2", id: "yapi", text: "Dubai'de şirket kurarken hangi yapı seçilir?" },
    {
      kind: "p",
      text: "Dubai'de şirket üç yapıdan biriyle kuruluyor: serbest bölge şirketi, mainland şirketi ya da offshore şirket. Seçimi büyük ölçüde müşterinizin nerede olduğu belirliyor. Yapıyı sonradan değiştirmek kolay değil: serbest bölge şirketini mainland'e çevirmek yeni bir kuruluş anlamına geliyor.",
    },
    {
      kind: "tablo",
      caption: "Dubai'de üç şirket yapısı",
      head: ["Yapı", "Lisansı kim veriyor", "Kimin için"],
      rows: [
        [
          "Serbest bölge",
          "Serbest bölgenin kendi otoritesi (IFZA, Meydan, DWTC gibi)",
          "Müşterisi BAE dışında olan e-ticaret, yazılım, danışmanlık ve ajans işleri",
        ],
        [
          "Mainland",
          "Dubai Ekonomi ve Turizm Dairesi (DET)",
          "BAE içinde mağaza, restoran, depo açacak ya da yerel müşteriye doğrudan satacak işler",
        ],
        [
          "Offshore",
          "Offshore sicilini tutan otorite",
          "BAE içinde faaliyet göstermeyen, pay ve varlık tutan yapılar",
        ],
      ],
      foot: "Offshore şirket BAE içinde ticaret yapmak ve oturum vizesi almak için kullanılan bir yapı değil; bu rehberin geri kalanı serbest bölge ve mainland üzerine.",
    },
    {
      kind: "p",
      text: "Serbest bölge şirketi Türkiye'den gelen girişimcilerin en sık seçtiği yapı: kuruluş maliyeti daha düşük, fiziki ofis kiralama şartı yok ve süreç uzaktan yürüyor. Mainland şirketi BAE iç pazarında serbestçe çalışıyor; karşılığında fiziki adres ve daha yüksek toplam maliyet istiyor. İki yapının farkını, hangi iş için hangisinin uyduğunu ve aradaki geçişi [Dubai'de serbest bölge mi mainland mi](/blog/dubai-serbest-bolge-mi-mainland-mi) yazısında ayrıntısıyla karşılaştırdık.",
    },

    { kind: "h2", id: "surec", text: "Dubai'de şirket kurma adım adım nasıl ilerliyor?" },
    {
      kind: "p",
      text: "Dubai'de şirket kurma süreci yedi adımdan oluşuyor. İlk üç adım karar adımı ve aynı görüşmede kapanıyor; bekleme, dosya otoriteye gittikten sonra başlıyor.",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "Şirket adı: üç ad adayını tercih sırasıyla veriyorsunuz; uygunluk kontrolü ve rezervasyon yapılıyor.",
        "Faaliyet ve lisans türü: ne sattığınıza göre faaliyet kodu ve lisans sınıfı eşleştiriliyor.",
        "Yapı seçimi: serbest bölge ya da mainland, serbest bölge seçildiyse hangisi.",
        "Kuruluş başvurusu ve tescil: kuruluş sözleşmesi ve ekleri hazırlanıp otoriteye veriliyor; sizden dijital onay ve imza isteniyor.",
        "Ticari lisans: lisansı otorite düzenliyor ve şirket yasal olarak faaliyete başlayabiliyor.",
        "Vize, sağlık kontrolü ve Emirates ID: giriş izni çıkınca BAE'ye geliyor, sağlık kontrolü ve biyometriyi tamamlıyorsunuz.",
        "Banka hesabı: başvuru dosyası hazırlanıp bankaya sunuluyor; kararı banka veriyor.",
      ],
    },
    { kind: "h3", text: "Dubai'de şirket kurmak ne kadar sürer?" },
    {
      kind: "p",
      text: "Ortac Global'in yürüttüğü dosyalarda Dubai şirket kuruluşu tipik olarak 5-6 günde tamamlanıyor. Vize başvurusuyla birlikte süreç en fazla 14 günde bitiyor. Sağlık kontrolü ve biyometri için Dubai'de yaklaşık 5 iş günü kalmanız gerekiyor; bu ziyaretle birlikte toplam süre üç haftayı buluyor. Faaliyet kodu ek onaya bağlıysa lisans adımı uzayabiliyor. Banka hesabı bu takvimin dışında: süreyi ve sonucu banka belirliyor. Adımların güncel hâli [Dubai'de şirket kuruluşu sayfasında](/dubai).",
    },
    {
      kind: "gorsel",
      src: GUIDE_PHOTO.dubaiIsler,
      alt: "Açık planlı modern bir ofis katı",
      caption: "Dubai'de serbest bölge kuruluşunda paylaşımlı ofis adresi lisans paketine dahil.",
    },

    { kind: "h2", id: "belgeler", text: "Dubai'de şirket kurmak için hangi belgeler gerekiyor?" },
    {
      kind: "p",
      text: "Dubai'de serbest bölge şirketi kurmak için sizden istenen belgelerin tamamı dijital olarak gönderiliyor; evrak kargolamanız gerekmiyor.",
    },
    {
      kind: "list",
      items: [
        "Pasaportun renkli taraması (en az 6 ay geçerli)",
        "Beyaz fonlu vesikalık fotoğraf",
        "Adres beyanı: son 3 aya ait fatura ya da ikametgâh belgesi",
        "Faaliyet konusunun ve hedef müşterinin kısa tarifi",
        "Tercih sırasıyla üç şirket adı",
      ],
    },
    {
      kind: "p",
      text: "Kuruluş sözleşmesi, pay yapısı, isim onayı ve lisans başvurusu süreç içinde hazırlanıyor; bu belgelerde sizden yalnız onay ve imza isteniyor. Ortak bir şirketse o şirketin tescil belgeleri de dosyaya giriyor. Faaliyet koduna ve seçilen otoriteye göre ek belge istenebiliyor. Ortak ve yönetici değişikliği gibi kuruluş sonrası işlemler için [Dubai kurumsal danışmanlık sayfasına](/dubai/kurumsal-danismanlik) bakabilirsiniz.",
    },

    { kind: "h2", id: "maliyet", text: "Dubai şirket kurma maliyeti 2026'da ne kadar?" },
    {
      kind: "p",
      text: "Dubai şirket kurma maliyeti dört kalemden oluşuyor: kuruluş ve lisans, vize, muhasebe ve varsa ek hizmetler. Aşağıdaki rakamlar Ortac Global'in 2026 fiyatları; piyasa ortalaması değil. Ortac Global'de Dubai'de paket yok: baz fiyatın üstüne ihtiyacınız olan kalemler ekleniyor.",
    },
    {
      kind: "tablo",
      caption: "Dubai şirket kurma maliyeti · ilk yıl kalemleri (Ortac Global, 2026)",
      head: ["Kalem", "Tutar (USD)", "Not"],
      rows: [
        ["IFZA kuruluş + 1 yıllık lisans", "$5.120", "Paylaşımlı ofis adresi dahil"],
        ["Meydan kuruluş + 1 yıllık lisans", "$5.300", "Paylaşımlı ofis adresi dahil"],
        ["DWTC kuruluş + 1 yıllık lisans", "$5.820", "Paylaşımlı ofis adresi dahil"],
        ["Vize", "$1.953 / kişi", "Ortak ya da çalışan; isteğe bağlı"],
        ["VIP vize hizmeti", "$800", "İsteğe bağlı"],
        ["Muhasebe", "$350 / ay", "Yıllık ödemede $3.500"],
      ],
      foot: "Tutarlar KDV hariç; BAE'de KDV %5. Üç serbest bölgeden yalnız biri seçiliyor. Uçuş, konaklama, fiziki ofis kirası ve aile vizesi bu kalemlerin dışında.",
    },
    {
      kind: "p",
      text: "Bir örnek: IFZA'da kurulan ve tek ortağı için vize alınan bir şirketin kuruluş tarafı $5.120 + $1.953 = $7.073 tutuyor. Muhasebe yıllık ödenirse $3.500 ekleniyor. Vize almayacaksanız ilk kalem tek başına yeterli; vize sonradan da eklenebiliyor. Kalemlerin ne işe yaradığını [Dubai'de şirket kurmanın maliyet kalemleri](/blog/dubaide-sirket-kurmanin-maliyet-kalemleri) yazısında tek tek açtık.",
    },
    { kind: "h3", text: "Dubai şirketinin ikinci yıl maliyeti ne?" },
    {
      kind: "p",
      text: "Dubai'de lisans her yıl yenileniyor; ikinci yılın en büyük kalemi bu. Lisans birden çok yıl için peşin alınırsa indirim uygulanıyor: IFZA'da 2 yılda %15, 3 yılda %20, 5 yılda %30; Meydan'da 2 ve 3 yılda %15. DWTC'de lisans yalnız yıllık yenileniyor.",
    },
    {
      kind: "tablo",
      caption: "Dubai şirketinin sonraki yıllardaki kalemleri",
      head: ["Kalem", "Ne zaman", "Not"],
      rows: [
        ["Lisans yenileme", "Her yıl", "Çok yıllı peşin alımda indirimli; tutar teklifte ayrı satır"],
        ["Vize yenileme", "Ortak vizesinde 2 yılda bir", "Vizesi olan her kişi için"],
        ["Muhasebe", "Her ay", "$350 / ay ya da yıllık $3.500"],
        ["Kurumlar vergisi beyanı", "Yılda bir", "Vergi döneminin bitiminden itibaren 9 ay içinde"],
        ["KDV beyanı", "Kayıtlıysanız üç ayda bir", "Kayıt eşiği 375.000 AED"],
      ],
      foot: "Lisans süresi dolmadan yenilenmezse ceza işliyor ve banka hesabı riske giriyor.",
    },

    { kind: "h2", id: "vize", text: "Dubai'de şirket kurunca oturum izni alınır mı?" },
    {
      kind: "p",
      text: "Evet. Dubai'de şirket ortağı olarak 2 yıllık oturum vizesi alabiliyorsunuz; şirket ayrıca çalışanları için vize çıkarabiliyor. Oturumunuz çıktıktan sonra eşiniz ve çocuklarınız için aile vizesi başvurusu yapılabiliyor. Oturumla birlikte Emirates ID düzenleniyor; banka dahil BAE'deki resmî işlemlerin çoğunda bu kimlik isteniyor.",
    },
    {
      kind: "p",
      text: "Bir Dubai şirketinin kaç kişiye vize alabileceğini lisans paketi ve ofis tipi belirliyor. Bu yüzden vize sayısı kuruluştan önce konuşuluyor; kotayı sonradan büyütmek paket ya da ofis değişikliği demek. Ortak vizesi BAE dışında kesintisiz 12 ay, çalışan vizesi 6 ay kalındığında düşüyor. Dubai'de yaşamanız şart değil, ama bu süreler dolmadan BAE'ye giriş yapmanız gerekiyor. Başvuru adımları [Dubai oturum ve vize sayfasında](/dubai/oturum-vize), Dubai'deki günlük hayatın maliyeti [Dubai'de yaşam](/blog/dubai-yasam-rehberi-maliyetler-is-imkanlari) yazısında.",
    },
    {
      kind: "note",
      tone: "warn",
      title: "Vize için bir kez BAE'ye gelmeniz gerekiyor",
      text: "Şirket tescili uzaktan tamamlanıyor. Sağlık kontrolü ve biyometri ise vekâletle yürümüyor; vize almak istiyorsanız Dubai'de yaklaşık 5 iş günü kalacak şekilde plan yapın. Vize kararını BAE makamları veriyor.",
    },

    { kind: "h2", id: "banka", text: "Dubai şirketine banka hesabı nasıl açılıyor?" },
    {
      kind: "p",
      text: "Dubai'de kurumsal banka hesabı, kurulmuş ve lisansını almış şirket adına açılıyor. Başvuru Wio, Mashreq, Emirates NBD ve First Abu Dhabi Bank gibi bankalara yapılıyor. Banka hesabı garanti edilemiyor: kararı yalnız banka veriyor ve hiçbir aracı bu kararı taahhüt edemez. Banka faaliyetinizi, ortaklık yapısını, hesaba girecek paranın kaynağını ve beklenen işlem hacmini soruyor.",
    },
    {
      kind: "p",
      text: "Bu sorular BAE'nin kara para aklamayı önleme kurallarından geliyor; cevapların lisanstaki faaliyetle ve sunduğunuz belgelerle örtüşmesi gerekiyor. Ortac Global başvuru dosyasını bankanın istediği biçimde hazırlıyor; başvuru reddedilirse ikinci bankaya yeniden başvuruluyor. Kartla ve platformdan tahsilat için Stripe, PayPal, Binance, Amazon Payment Services ve Network International gibi kanallar hesap açıldıktan sonra bağlanıyor. Ayrıntılar [Dubai banka hesabı sayfasında](/dubai/banka-hesabi) ve [Dubai AML uyum sayfasında](/dubai/aml-uyum).",
    },

    { kind: "h2", id: "vergi", text: "Dubai şirketi ne kadar vergi ödüyor?" },
    {
      kind: "p",
      text: "Dubai'de şirket kurmak vergisiz çalışmak anlamına gelmiyor. BAE'de kurumlar vergisi net kâr üzerinden hesaplanıyor: vergilendirilebilir gelirin 375.000 AED'ye kadar olan kısmı için oran %0, üstü için %9. Serbest bölge şirketleri de bu verginin mükellefi. Yasada nitelikli serbest bölge şirketleri için %0 oranı var, ancak şartları ağır ve küçük şirketlerin çoğu sağlamıyor; bütçenizi %9 üzerinden yapmanız doğru olur. [Oranlar BAE resmî portalında](https://u.ae/en/information-and-services/finance-and-investment/taxation/corporate-tax).",
    },
    {
      kind: "tablo",
      caption: "Dubai şirketi için vergi çerçevesi · 2026",
      head: ["Vergi", "Oran ya da kural", "Not"],
      rows: [
        ["Kurumlar vergisi", "375.000 AED'ye kadar %0, üstü %9", "Net kâr üzerinden; serbest bölge şirketi dahil"],
        ["Kurumlar vergisi kaydı", "Kuruluştan itibaren 3 ay içinde", "Kâr olmasa da kayıt ve beyan zorunlu"],
        ["Kurumlar vergisi beyanı", "Dönem bitiminden itibaren 9 ay içinde", "Yılda bir"],
        ["KDV", "%5", "Vergiye tabi satış 12 ayda 375.000 AED'yi aşarsa kayıt zorunlu"],
        ["Kişisel gelir vergisi", "Yok", "BAE maaş ve kâr payından gelir vergisi almıyor"],
      ],
      foot: "Kaynak: BAE resmî portalı, BAE Maliye Bakanlığı ve Federal Vergi Kurumu. Geliri 3 milyon AED'yi aşmayan şirketler, 31 Aralık 2029'a kadar biten dönemlerde küçük işletme muafiyetini seçebiliyor; kayıt ve beyan yükümlülüğü yine sürüyor.",
    },
    {
      kind: "p",
      text: "Dubai'de her şirket muhasebe kaydı tutmak zorunda; serbest bölge ya da mainland ayrımı yok. KDV'de gönüllü kayıt eşiği 187.500 AED ve beyan, dönemi izleyen 28. güne kadar veriliyor. Kendi rakamlarınızla hesap yapmak için [BAE kurumlar vergisi hesaplayıcısını](/araclar/kurumlar-vergisi/dubai) ve [BAE KDV aracını](/araclar/bae-kdv) kullanabilirsiniz. Kurallar [Dubai vergi sayfasında](/dubai/vergi), aylık işleyiş [Dubai muhasebe sayfasında](/dubai/muhasebe).",
    },

    { kind: "h2", id: "turkiye", text: "Türkiye'de yaşayan ortak Dubai şirketi kurarken neye dikkat etmeli?" },
    {
      kind: "p",
      text: "Dubai'de şirket kurmak, Türkiye'deki vergi durumunuzu kendiliğinden değiştirmiyor. Türkiye'de yerleşik sayılmaya devam eden bir kişi, yurt dışında elde ettiği geliri de Türkiye'de beyan etmekle yükümlü olabiliyor. Dubai şirketinden alınan kâr payı ya da maaş Türkiye'ye geldiğinde Türkiye'nin kuralları devreye giriyor; iki ülke arasında çifte vergilendirmeyi önleme anlaşması var ve sonuç bu anlaşmayla birlikte değerlendiriliyor.",
    },
    {
      kind: "p",
      text: "İkinci konu şirketin fiilen nereden yönetildiği. Kararların alındığı, sözleşmelerin imzalandığı ve işin yürütüldüğü yer Türkiye ise, Dubai şirketinin Türkiye'de de vergi yükümlülüğü doğabiliyor. Sonucu belirleyen dört şey var: gerçek faaliyet, yönetimin yeri, mukimliğiniz ve gelirin türü. Bu yazı kişiye özel vergi görüşü vermiyor; kuruluştan önce durumunuzu Türkiye'deki mali müşavirinizle birlikte değerlendirin. Konunun kişi tarafını [gelir vergisi olmayan ülkeler](/blog/gelir-vergisi-olmayan-ulkeler-2025) yazısında ele aldık.",
    },

    { kind: "h2", id: "hatalar", text: "Dubai'de şirket kurarken en sık yapılan hatalar neler?" },
    {
      kind: "list",
      items: [
        "Yapıyı fiyata göre seçmek: Dubai içinde mağaza ya da restoran açacak bir iş için serbest bölge lisansı yetmiyor; yapı değişikliği yeni kuruluş demek.",
        "Faaliyet kodunu geniş ya da yanlış seçmek: banka, lisanstaki faaliyetle gerçek işin örtüşmesine bakıyor.",
        "Vize sayısını sonradan düşünmek: kota lisans paketine bağlı, büyütmek paket değişikliği gerektiriyor.",
        "Banka hesabını kesin saymak: karar bankanın; ödeme ve tahsilat planını hesap açılmadan başlatmayın.",
        "\"Dubai'de vergi yok\" diye bütçe yapmak: 375.000 AED üstü kâra %9 kurumlar vergisi, satışa %5 KDV uygulanıyor.",
        "İkinci yılı hesaba katmamak: lisans her yıl yenileniyor, muhasebe ve beyan her yıl sürüyor.",
        "Türkiye tarafını kuruluştan sonraya bırakmak: mukimlik ve yönetim yeri sorusu kuruluştan önce sorulmalı.",
      ],
    },

    {
      kind: "note",
      tone: "info",
      title: "Ortac Global bu konuda ne yapıyor?",
      text: "Ortac Global 1996'dan beri muhasebe, vergi ve şirket kuruluşu alanında çalışıyor; Dubai, İngiltere ve KKTC'de kendi ofisi var ve bugüne kadar 700'den fazla şirket kuruluşu yürüttü. Dubai'de IFZA, Meydan ve DWTC serbest bölgelerinin iş ortağıyız. Kuruluşu, vize başvurularını ve kuruluş sonrası muhasebeyi Dubai ofisimizden yürütüyoruz. Banka dosyasını biz hazırlıyoruz, kararı banka veriyor. Hangi yapının size uyduğunu ilk görüşmede birlikte değerlendiriyoruz.",
    },
    {
      kind: "p",
      text: "Dubai'nin işinize uyup uymadığından emin değilseniz [uygunluk testi](/uygunluk-testi) birkaç soruyla yön gösteriyor. Dubai'yi İngiltere ve KKTC ile yan yana görmek için [ülke karşılaştırması](/ulkeler) sayfasına, sektörünüze özel notlar için [e-ticaret](/sektorler/e-ticaret) ve [yazılım ve teknoloji](/sektorler/yazilim-ve-teknoloji) sayfalarına bakabilirsiniz. Hazırsanız [kuruluşu çevrim içi başlatabilir](/basla) ya da [bize yazabilirsiniz](/iletisim).",
    },

    { kind: "h2", id: "sss", text: "Sık sorulan sorular" },
    {
      kind: "sss",
      items: [
        {
          q: "Dubai'de şirket kurmak ne kadar tutar?",
          a: "Ortac Global'de Dubai şirket kuruluşu 1 yıllık lisans dahil IFZA'da $5.120, Meydan'da $5.300, DWTC'de $5.820. Vize kişi başı $1.953, muhasebe ayda $350. Tutarlar KDV hariç.",
        },
        {
          q: "Dubai'de şirket kurmak kaç gün sürer?",
          a: "Dubai'de şirket tescili tipik olarak 5-6 gün sürüyor. Vizeyle birlikte süreç en fazla 14 günde tamamlanıyor; Dubai'de geçireceğiniz yaklaşık 5 iş günüyle toplam üç haftayı buluyor.",
        },
        {
          q: "Dubai'ye gitmeden şirket kurulur mu?",
          a: "Evet, Dubai'de şirket tescili uzaktan ve dijital imzayla tamamlanıyor. Vize almak istiyorsanız sağlık kontrolü ve biyometri için, banka imzası için de bir kez Dubai'ye gelmeniz gerekiyor.",
        },
        {
          q: "Dubai'de şirket kurmak için yerel ortak gerekiyor mu?",
          a: "Hayır. Serbest bölge şirketinin tamamı yabancı ortağa ait olabiliyor. Mainland şirketlerde de 2021'den beri %100 yabancı mülkiyet mümkün; istisna, stratejik etkili sayılan faaliyetler.",
        },
        {
          q: "Dubai şirketi vergi ödüyor mu?",
          a: "Evet. Dubai şirketi net kârının 375.000 AED'yi aşan kısmı için %9 kurumlar vergisi ödüyor; KDV %5. BAE kişilerden gelir vergisi almıyor. Ayrıntı [Dubai vergi sayfasında](/dubai/vergi).",
        },
        {
          q: "Dubai şirketi için muhasebe tutmak zorunlu mu?",
          a: "Evet. Dubai'de serbest bölge ve mainland şirketlerinin tamamı muhasebe kaydı tutmak ve kurumlar vergisi beyanı vermek zorunda. Ortac Global'de Dubai muhasebe hizmeti ayda $350. Ayrıntı [Dubai muhasebe sayfasında](/dubai/muhasebe).",
        },
        {
          q: "Dubai şirketiyle oturum izni alabilir miyim?",
          a: "Evet. Dubai şirketinin ortağı olarak 2 yıllık oturum vizesi alınabiliyor. Ortak vizesi BAE dışında kesintisiz 12 ay kalındığında düşüyor. Adımlar [Dubai oturum ve vize sayfasında](/dubai/oturum-vize).",
        },
        {
          q: "Dubai şirketine banka hesabı açılması garanti mi?",
          a: "Hayır. Dubai'de banka hesabı kararını yalnız banka veriyor. Ortac Global dosyayı bankanın istediği biçimde hazırlıyor; başvuru reddedilirse ikinci bankaya başvuruluyor.",
        },
        {
          q: "Dubai'de serbest bölge şirketi mi mainland şirketi mi kurmalıyım?",
          a: "Müşteriniz BAE dışındaysa serbest bölge, Dubai içinde mağaza ya da restoran gibi fiziksel bir iş kuracaksanız mainland uyuyor. Karşılaştırma [serbest bölge mi mainland mi](/blog/dubai-serbest-bolge-mi-mainland-mi) yazısında.",
        },
        {
          q: "Dubai şirketinin her yıl yapması gerekenler neler?",
          a: "Dubai şirketi her yıl lisansını yeniliyor, muhasebe kaydı tutuyor ve kurumlar vergisi beyanını dönem bitiminden itibaren 9 ay içinde veriyor. KDV'ye kayıtlıysa üç ayda bir KDV beyanı da var.",
        },
      ],
    },
  ],

  links: [
    {
      label: "Dubai'de şirket kuruluşu",
      href: "/dubai",
      line: "Kuruluş adımları, üç serbest bölge ve $5.120'den başlayan fiyat hesabı.",
    },
    {
      label: "Serbest bölge mi mainland mi?",
      href: "/blog/dubai-serbest-bolge-mi-mainland-mi",
      line: "İki yapının farkı, karşılaştırma tablosu ve hangi iş için hangisi.",
    },
    {
      label: "Dubai vergi rehberi",
      href: "/dubai/vergi",
      line: "Kurumlar vergisi, KDV ve beyan takvimi.",
    },
  ],

  closing: {
    title: "Dubai şirketinizi birlikte planlayalım.",
    line: "Yapıyı, faaliyeti ve vize sayısını ilk görüşmede netleştiriyor, teklifi kalem kalem yazıyoruz.",
    cta: "İletişime geçin",
  },

  footnote:
    "Bu yazı genel bilgilendirme amaçlıdır; kişiye özel vergi, hukuk ya da göçmenlik danışmanlığı değildir. Fiyatlar Ortac Global'in 10 Ekim 2026 tarihli fiyatlarıdır ve KDV hariçtir; süreler tipik sürelerdir, taahhüt değildir.",
};
