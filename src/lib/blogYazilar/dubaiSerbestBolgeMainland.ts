/* DUBAİ'DE SERBEST BÖLGE Mİ MAINLAND Mİ · yeni yazı (10.10.2026)

   HEDEF SORGULAR: "dubai serbest bölge şirket", "dubai free zone mainland
   farkı", "dubai mainland şirket kurma", "dubai serbest bölge mi mainland
   mi". Başlık son sorguyu birebir taşıyor; "free zone" ilk paragrafta ve
   bir h2'de, "mainland şirket kurma" bir h2'de geçiyor.

   YAMYAMLIK NOTU: SLUG kaydında aynı konuda bir YER TUTUCU var
   (SLUG.bolgeSecimi = "serbest-bolge-mi-mainland-mi", gövdesi boş, noindex).
   Bu yazı onun gerçek hâli; bağlama yapılırken yer tutucunun kaldırılması ya
   da bu adrese yönlendirilmesi gerekir, yoksa listede iki kayıt çıkar.

   SLUG: "dubai-serbest-bolge-mi-mainland-mi". SLUG kaydında (lib/
   blogTemel.ts) HENÜZ YOK; o dosyaya dokunmamam istendi. `SLUG_GECICI`
   bağlama yapılırken SLUG kaydına çevrilecek ve `as BlogSlug` kalkacak.

   KAYNAK (10.10.2026'da tek tek okundu):
     · iç pazara satış     u.ae · Running a business in a free zone
                           (güncelleme 28.09.2026): serbest bölge şirketi ayrı
                           hukuki çerçevede; mainland'de doğrudan satış genel
                           olarak serbest değil; lisanslı dağıtıcı ya da
                           mainland şubesi/şirketi; mal mainland'e geçince
                           gümrük vergisi.
     · Dubai'nin 2025 kararı  Dubai Yürütme Konseyi Kararı 11/2025
                           (dlp.dubai.gov.ae, 03.03.2025): DET'ten şube
                           lisansı (1 yıl), serbest bölgeden yürütülen şube
                           lisansı (1 yıl, 10.000 AED) ya da geçici izin
                           (en çok 6 ay, 5.000 AED); ayrı mali kayıt şartı;
                           DIFC'deki finans kuruluşları kapsam dışı.
     · yabancı mülkiyet    u.ae · Full foreign ownership of commercial
                           companies (güncelleme 06.04.2026).
     · mainland lisansı    u.ae · Steps to start a business on the mainland;
                           dubaidet.gov.ae: lisansı DET veriyor, fiziki adres
                           şart, Dubai'de kira sözleşmesi Ejari'ye kayıtlı.
     · vergi               u.ae · Corporate tax (güncelleme 30.03.2026) ve
                           docs/bae-mevzuat.md: %9 / 375.000 AED; nitelikli
                           serbest bölge kişisi şartları (CT Law md. 18, CD
                           100/2023: yeterli varlık, nitelikli gelir, denetimli
                           tablo, 5 milyon AED ya da %5 sınırı); KDV %5.
     · denetim             docs/bae-mevzuat.md: Şirketler Kanunu md. 27,
                           mainland LLC yıllık denetçi atar.
     · IFZA                ifza.com: merkez Dubai Silicon Oasis; ticari ve
                           profesyonel lisans; faaliyetler tek lisansta
                           birleşebiliyor; kuruluşta fiziki bulunma şartı yok.
     · Meydan              meydanfz.ae: süreç ve ödemeler uzaktan; 2.500'den
                           fazla faaliyet; tek lisansta üç faaliyet grubu;
                           görüşmeler Meydan Hotel'de ya da çevrim içi.
     · DWTC                dwtc.com: Rashid Tower'dan One Central'a; 1.200'den
                           fazla faaliyet; FZE, FZCO ve şube; ortak çalışma
                           alanından ticari ofise dört ofis seçeneği.
     · fiyat ve indirim    lib/dubaiFiyat.ts ve Murat Bey, 09.10.2026.
     · geçiş               Murat Bey: "serbest bölgeden mainland'e geçmek
                           yeni kuruluş demek" doğru.

   ÇELİŞKİ, BİLEREK BÖYLE YAZILDI: Murat Bey'in ilk teyit cevabı (Dubai
   kuruluş 8) "serbest bölgede kurulu şirket sorunsuz iç pazara satış
   yapabiliyor" diyor; u.ae ise doğrudan satışın genel olarak serbest
   olmadığını yazıyor. Yazı resmî kuralı ve Dubai'nin 2025'te açtığı izin
   yolunu veriyor, "hangi satış izin gerektirir" sorusunu ilk görüşmeye
   bırakıyor. Murat Bey'e sorulacak (rapor).

   BİLEREK YAZILMAYANLAR:
     · mainland kuruluş maliyeti, ofis kirası, DET harçları: doğrulanmış
       rakam yok. Yalnız "toplam maliyet serbest bölgenin üzerinde".
     · mainland'de vize kotasının metrekare formülü: resmî kaynaktan
       okunmadı; "kiralanan ofisle birlikte büyüyor" düzeyinde bırakıldı.
     · serbest bölgelerin denetim şartı (IFZA, Meydan, DWTC): birincil belge
       okunmadı (bae-mevzuat.md · DOĞRULANAMADI); "serbest bölgenin kendi
       kuralına bağlı" denildi.
     · Meydan'ın sitesindeki "garantili IBAN" ve "60 dakikada lisans" sözleri:
       sitenin duruşuyla (banka kararı bankanın) çelişiyor, alınmadı.
     · DWTC'nin sanal varlık lisansları, IFZA'nın bağlı olduğu üst otorite:
       bu turda resmî sayfada görülmedi.
     · "Ortac mainland kuruyor" cümlesi: bilinmiyor; "hangi yapının size
       uyduğunu ilk görüşmede birlikte değerlendiriyoruz" denildi.
     · restoran ve perakendede gıda, belediye gibi ek izinlerin adı ve
       süresi: genel ifadeyle ("ek onay"). */
import type { BlogPost } from "@/lib/blog";
import { SLUG } from "@/lib/blogTemel";
import { POST_PHOTO } from "@/lib/media";

/* GEÇİCİ: slug SLUG kaydına eklenince bu sabit silinir (bkz. dosya başı). */

export const POST_DUBAI_SERBEST_BOLGE_MAINLAND: BlogPost = {
  slug: SLUG.dubaiSerbestMainland,
  category: "yapi-ve-ulke-secimi",
  title: "Dubai'de serbest bölge mi mainland mi: hangi şirket size uyar?",
  heroAccent: "hangi şirket size uyar?",
  summary:
    "Dubai'de serbest bölge şirketi ile mainland şirketinin farkı: kime satabilir, ofis, vize, vergi, maliyet ve hangi iş için hangisi.",
  publishedAt: "2026-10-08",
  topic: "Yapı seçimi",
  country: "dubai",
  tags: ["Dubai", "Şirket kuruluşu", "Vergi"],
  author: "Murat Ortaç",
  cover: POST_PHOTO.dubaiAlaca,

  seo: {
    title: "Dubai Serbest Bölge mi Mainland mi? Farklar ve Seçim",
    description:
      "Dubai serbest bölge şirketi ile mainland farkı: kime satabilir, ofis şartı, vize kotası, vergi ve maliyet. Karşılaştırma tablosu ve işe göre seçim.",
  },

  sourceNote:
    "Serbest bölge ve mainland kuralları BAE resmî portalından (u.ae) ve Dubai Yürütme Konseyi'nin 11/2025 sayılı kararından, vergi bilgileri BAE Maliye Bakanlığı ile Federal Vergi Kurumu'nun metinlerinden alınmıştır. Serbest bölgelere dair bilgiler IFZA, Meydan ve DWTC'nin kendi sitelerinden, fiyatlar Ortac Global'in kendi fiyatlarıdır. Bilgiler 10 Ekim 2026 itibarıyla günceldir.",

  body: [
    {
      kind: "ozet",
      items: [
        "Dubai'de serbest bölge şirketinin lisansını serbest bölge otoritesi, mainland şirketinin lisansını Dubai Ekonomi ve Turizm Dairesi (DET) veriyor.",
        "Dubai'de iki yapıda da şirketin tamamı yabancı ortağa ait olabiliyor ve ikisi de aynı kurumlar vergisine tabi: 375.000 AED'ye kadar %0, üstü %9.",
        "Müşterisi BAE dışında olan işler için serbest bölge, Dubai içinde mağaza ya da restoran açacak işler için mainland uyuyor.",
        "Serbest bölge şirketini sonradan mainland'e çevirmek yeni bir kuruluş demek; seçim baştan doğru yapılmalı.",
      ],
    },
    {
      kind: "p",
      text: "Dubai'de şirket kurarken verilen ilk karar yapı: serbest bölge (free zone) şirketi mi, mainland şirketi mi. Kime satış yapabileceğiniz, ofis şartı, vize kotası ve toplam maliyet bu karardan çıkıyor. Bu yazı Dubai'de serbest bölge ile mainland arasındaki farkı başlık başlık karşılaştırıyor ve dört iş türü için hangisinin uyduğunu söylüyor. Kuruluşun tamamını [Dubai'de şirket kurma rehberinde](/blog/dubai-sirket-kurulusu-rehberi) anlattık. Bilgiler 10 Ekim 2026 itibarıyla güncel.",
    },

    { kind: "h2", id: "fark", text: "Dubai'de free zone ile mainland farkı nedir?" },
    {
      kind: "p",
      text: "Dubai'de serbest bölge şirketi, belirli bir serbest bölgenin sınırları içinde kayıtlı ve o serbest bölgenin otoritesinden lisans alan şirkettir. Mainland şirketi ise Dubai'nin serbest bölgeler dışında kalan kısmında kayıtlı; lisansını Dubai Ekonomi ve Turizm Dairesi (DET) veriyor. BAE resmî portalı serbest bölge şirketlerinin mainland şirketlerinden ayrı bir hukuki çerçevede çalıştığını yazıyor. Farkın pratikteki karşılığı şu: mainland şirketi BAE'nin her yerinde serbestçe iş yapıyor, serbest bölge şirketinin BAE iç pazarına doğrudan satışı kurala bağlı.",
    },
    {
      kind: "p",
      text: "Dubai'de iki yapı arasında sanıldığı kadar büyük olmayan farklar da var. Serbest bölge şirketinin tamamı yabancı ortağa ait olabiliyor; mainland şirketlerde de 2021'den beri %100 yabancı mülkiyet mümkün ve yerel ortak şartı kalktı. Stratejik etkili sayılan faaliyetler bu kuralın dışında. İki yapı da aynı kurumlar vergisi ve KDV kurallarına tabi.",
    },

    { kind: "h2", id: "karsilastirma", text: "Dubai serbest bölge şirketi ile mainland şirketi karşılaştırması" },
    {
      kind: "tablo",
      caption: "Dubai'de serbest bölge ve mainland · yan yana",
      head: ["Başlık", "Serbest bölge şirketi", "Mainland şirketi"],
      rows: [
        ["Lisansı veren", "Serbest bölgenin otoritesi", "Dubai Ekonomi ve Turizm Dairesi (DET)"],
        ["Yabancı mülkiyet", "%100", "%100; stratejik etkili faaliyetler hariç"],
        [
          "Kime satabilir",
          "Serbest bölge içine ve BAE dışına serbest; BAE iç pazarına dağıtıcı, şube ya da DET izniyle",
          "BAE'nin tamamına ve BAE dışına serbest",
        ],
        ["Ofis", "Paylaşımlı ofis adresi yeterli", "Fiziki adres ve kayıtlı kira sözleşmesi şart"],
        ["Vize kotası", "Lisans paketine ve ofis tipine bağlı", "Kiralanan ofisle birlikte büyüyor"],
        ["Kurumlar vergisi", "375.000 AED'ye kadar %0, üstü %9", "375.000 AED'ye kadar %0, üstü %9"],
        ["KDV", "%5", "%5"],
        ["Denetim", "Serbest bölgenin kendi kuralına bağlı", "Limited şirket her yıl denetçi atıyor"],
        ["Kuruluş", "Uzaktan, dijital imzayla", "Kira sözleşmesi ve faaliyete göre ek onaylarla"],
        ["Toplam maliyet", "Daha düşük", "Ofis kirası nedeniyle daha yüksek"],
      ],
      foot: "Kaynak: BAE resmî portalı (u.ae), Dubai Yürütme Konseyi Kararı 11/2025, BAE Şirketler Kanunu. Serbest bölge sütunu IFZA, Meydan ve DWTC gibi genel ticari serbest bölgeler için; finans merkezleri ayrı kurallara tabi.",
    },

    { kind: "h2", id: "satis", text: "Dubai serbest bölge şirketi BAE içine satış yapabilir mi?" },
    {
      kind: "p",
      text: "Dubai'de serbest bölge şirketi, serbest bölgenin içindeki şirketlere ve BAE dışındaki müşterilere serbestçe satış yapıyor. BAE iç pazarı için kural farklı: BAE resmî portalına göre serbest bölge şirketinin mainland'de doğrudan satışı genel olarak serbest değil. Yerel pazara girmek isteyen serbest bölge şirketi lisanslı bir mainland dağıtıcısıyla çalışıyor ya da mainland'de şube ya da şirket açıyor. Serbest bölgedeki mal mainland pazarına geçtiğinde gümrük vergisine tabi oluyor. [Kuralın özeti BAE resmî portalında](https://u.ae/en/information-and-services/business/Doing-business/doing-business-in-free-zones/running-a-business-in-a-free-zone-).",
    },
    { kind: "h3", text: "Dubai'nin 2025'te getirdiği izin yolu" },
    {
      kind: "p",
      text: "Dubai bu sınırı 2025'te esnetti. Dubai Yürütme Konseyi'nin 11/2025 sayılı kararıyla serbest bölge şirketleri, DET'ten alacakları lisans ya da izinle Dubai'nin serbest bölge dışındaki kısmında da faaliyet gösterebiliyor. Kararda üç yol var: Dubai içinde şube lisansı, serbest bölgeden yürütülen şube lisansı ve belirli faaliyetler için geçici izin. Şube lisansları 1 yıl geçerli ve yenilenebiliyor; geçici izin en çok 6 ay. Serbest bölgeden yürütülen şube lisansının harcı yılda 10.000 AED, geçici iznin harcı 5.000 AED.",
    },
    {
      kind: "p",
      text: "Dubai'deki bu karar şirkete bir yükümlülük de getiriyor: serbest bölge dışındaki faaliyetin mali kayıtları ayrı tutuluyor. DIFC'de lisanslı finans kuruluşları kararın kapsamında değil. Hangi satışın izin gerektirdiği faaliyete ve satışın biçimine göre değişiyor; BAE içinden müşteriniz olacaksa bunu kuruluştan önce söylemeniz yapıyı doğru seçmek için yeterli. [Kararın metni Dubai mevzuat portalında](https://dlp.dubai.gov.ae/Legislation%20Reference/2025/Executive%20Council%20Resolution%20No.%20%2811%29%20of%202025%20Regulating%20the%20Conduct%20of%20Free%20Zone%20Establishments%E2%80%99%20Activities.html).",
    },

    { kind: "h2", id: "ofis-vize", text: "Dubai'de ofis şartı ve vize kotası iki yapıda nasıl farklı?" },
    {
      kind: "p",
      text: "Dubai'de serbest bölge şirketi için fiziki ofis kiralamak zorunlu değil. Ortac Global'in çalıştığı serbest bölgelerde paylaşımlı ofis adresi lisans paketine dahil ve kuruluş için yeterli. Mainland şirketinde ise fiziki adres şart: BAE resmî portalı mainland'de her işletmenin fiziki bir adresi olması gerektiğini, Dubai'de kira sözleşmesinin Ejari sistemine kaydedildiğini yazıyor. Mainland'in toplam maliyetini serbest bölgenin üstüne çıkaran kalem çoğunlukla bu kira.",
    },
    {
      kind: "p",
      text: "Vize kotası ofisle birlikte belirleniyor. Dubai'de serbest bölge şirketinin kaç kişiye vize alabileceği lisans paketine ve ofis tipine bağlı; paylaşımlı masa küçük bir kota veriyor. Mainland şirketinde kota kiralanan ofisle birlikte büyüyor; kalabalık ekip kuracak işler bu yüzden mainland'e yöneliyor. İki yapıda da ortak vizesi 2 yıllık ve sağlık kontrolü ile biyometri için bir kez BAE'ye gelmek gerekiyor. Adımlar [Dubai oturum ve vize sayfasında](/dubai/oturum-vize).",
    },

    { kind: "h2", id: "vergi", text: "Dubai'de serbest bölge şirketi vergi öder mi?" },
    {
      kind: "p",
      text: "Evet. Dubai'de serbest bölge şirketi de mainland şirketi de kurumlar vergisi mükellefi: net kârın 375.000 AED'ye kadar olan kısmı için oran %0, üstü için %9. İkisi de kuruluştan itibaren 3 ay içinde vergi kaydı yaptırıyor ve her yıl beyan veriyor. KDV iki yapıda da %5 ve vergiye tabi satış 12 ayda 375.000 AED'yi aşınca kayıt zorunlu. [Oranlar BAE resmî portalında](https://u.ae/en/information-and-services/finance-and-investment/taxation/corporate-tax).",
    },
    { kind: "h3", text: "Serbest bölgedeki %0 oranı kimler için?" },
    {
      kind: "p",
      text: "BAE Kurumlar Vergisi Kanunu, nitelikli serbest bölge kişisi sayılan şirketlerin nitelikli gelirine %0 oran tanıyor. Şartlar ağır: serbest bölgede yeterli varlık ve çalışan, gelirin kanunda sayılan nitelikli faaliyetlerden gelmesi, denetimli finansal tablo ve nitelikli olmayan gelirin 5 milyon AED ile toplam gelirin %5'inden düşük olanını aşmaması. Şartlardan biri bozulduğunda şirket o dönemin başından itibaren statüyü kaybediyor. Küçük ve orta ölçekli şirketlerin çoğu bu şartları sağlamıyor; Dubai'de serbest bölge seçerken bütçeyi %9 üzerinden yapmak gerekiyor. Kurallar [Dubai vergi sayfasında](/dubai/vergi); kendi kârınızla hesap için [BAE kurumlar vergisi hesaplayıcısı](/araclar/kurumlar-vergisi/dubai) var.",
    },

    { kind: "h2", id: "maliyet", text: "Dubai'de maliyet, denetim ve banka tarafında fark var mı?" },
    {
      kind: "p",
      text: "Dubai'de serbest bölge kuruluşu mainland'e göre daha düşük bütçeyle yapılıyor. Ortac Global'de serbest bölge kuruluşu 1 yıllık lisans dahil $5.120'den başlıyor; vize kişi başı $1.953 ve tutarlar KDV hariç. Mainland için bu yazıda rakam vermiyoruz: maliyet ofis kirasına ve faaliyetin istediği onaylara göre değişiyor. Serbest bölge kalemlerinin dökümü [Dubai'de şirket kurmanın maliyet kalemleri](/blog/dubaide-sirket-kurmanin-maliyet-kalemleri) yazısında.",
    },
    {
      kind: "p",
      text: "Dubai'de muhasebe kaydı tutmak iki yapıda da zorunlu. Denetimde fark var: BAE Şirketler Kanunu mainland limited şirketlerin her yıl denetçi atamasını öngörüyor; serbest bölgelerde denetim şartını serbest bölgenin kendi kuralı belirliyor. Banka tarafında yapı tek başına sonucu belirlemiyor. Banka iki yapıda da faaliyete, ortaklık yapısına, paranın kaynağına ve beklenen hacme bakıyor; hesap kararını yalnız banka veriyor. Ayrıntılar [Dubai muhasebe](/dubai/muhasebe) ve [Dubai banka hesabı](/dubai/banka-hesabi) sayfalarında.",
    },
    {
      kind: "gorsel",
      src: POST_PHOTO.konteyner,
      alt: "Limanda vinçlerin altında yük alan konteyner gemisi",
      caption: "Serbest bölgedeki mal mainland pazarına geçtiğinde gümrük vergisine tabi oluyor.",
    },

    { kind: "h2", id: "hangi-is", text: "Dubai'de hangi iş için serbest bölge, hangi iş için mainland?" },
    { kind: "h3", text: "E-ticaret için serbest bölge mi mainland mi?" },
    {
      kind: "p",
      text: "Dubai şirketiyle BAE dışındaki müşteriye, kendi sitenizden ya da pazar yerlerinden satış yapıyorsanız serbest bölge şirketi uyuyor: maliyet düşük, kuruluş uzaktan ve kartla tahsilat kanalları bağlanabiliyor. Malı Dubai'de depolayıp BAE içindeki tüketiciye satacaksanız durum değişiyor; iç pazara satış kuralı ve gümrük devreye giriyor. Sektörün ayrıntıları [e-ticaret sayfasında](/sektorler/e-ticaret).",
    },
    { kind: "h3", text: "Danışmanlık ve ajans işleri" },
    {
      kind: "p",
      text: "Dubai'de danışmanlık, tasarım ve ajans şirketleri müşterisi yurt dışındaysa serbest bölgede kuruluyor; iş bilgisayar başında yürüdüğü için fiziki ofis gerekmiyor. Müşterilerinizin çoğu BAE içindeki şirketler ya da kamu kurumlarıysa mainland lisansı ya da DET izni gündeme geliyor. Ayrıntı [danışmanlık sektörü sayfasında](/sektorler/danismanlik).",
    },
    { kind: "h3", text: "Yazılım ve SaaS" },
    {
      kind: "p",
      text: "Dubai'de yazılım ve abonelik geliriyle çalışan şirketler için serbest bölge en sık seçilen yapı. Müşteri dünyanın her yerinde, tahsilat Stripe ya da PayPal üzerinden ve ekip uzaktan çalışıyor. Vize ihtiyacı çoğunlukla kurucularla sınırlı olduğu için küçük kota yeterli oluyor. Ayrıntı [yazılım ve teknoloji sayfasında](/sektorler/yazilim-ve-teknoloji).",
    },
    { kind: "h3", text: "Restoran, mağaza ve öteki fiziksel işler" },
    {
      kind: "p",
      text: "Dubai'de sokağa açılan bir restoran, kafe ya da mağaza için mainland lisansı gerekiyor: iş, Dubai'nin serbest bölge dışındaki kısmında ve doğrudan yerel müşteriye yapılıyor. Bu işlerde kira sözleşmesi kuruluşun parçası ve faaliyete göre ek onaylar isteniyor. Dubai'de hangi işlerin kurulduğunu [Dubai'de ne iş yapılır](/blog/dubai-is-fikirleri-en-karlı-is-imkanlari) yazısında anlattık.",
    },

    { kind: "h2", id: "gecis", text: "Dubai'de serbest bölge şirketi mainland'e çevrilebilir mi?" },
    {
      kind: "p",
      text: "Dubai'de serbest bölge şirketini mainland şirketine dönüştüren bir işlem yok; serbest bölgeden mainland'e geçmek yeni bir şirket kurmak demek. Yeni lisans, yeni kuruluş masrafı, yeni banka başvurusu ve vizelerin yeni şirkete taşınması gerekiyor. Eski şirket ya kapatılıyor ya da iki şirket birlikte yürütülüyor.",
    },
    {
      kind: "p",
      text: "Dubai'de işi büyüdükçe iç pazara açılan serbest bölge şirketleri için ara yol, yukarıda anlatılan DET şube lisansı ya da izni. Bu yol yeni kuruluş kadar ağır değil, ama ayrı mali kayıt ve yıllık harç getiriyor. Pay devri, faaliyet ekleme ve şube gibi kuruluş sonrası işlemler için [Dubai kurumsal danışmanlık sayfasına](/dubai/kurumsal-danismanlik) bakabilirsiniz.",
    },
    {
      kind: "note",
      tone: "warn",
      title: "Yapıyı fiyata göre seçmeyin",
      text: "Dubai'de serbest bölge kuruluşu daha ucuz olduğu için ilk tercih oluyor. İşiniz Dubai içinde bir mekân ya da yerel müşteriye doğrudan satış gerektiriyorsa bu tasarruf, bir yıl sonra ikinci bir kuruluş masrafına dönüşüyor.",
    },

    { kind: "h2", id: "serbest-bolgeler", text: "Dubai'de hangi serbest bölgeler var: IFZA, Meydan ve DWTC" },
    {
      kind: "p",
      text: "Dubai'de çok sayıda serbest bölge var ve her biri kendi otoritesine, faaliyet listesine ve fiyatına sahip. Ortac Global üç serbest bölgenin iş ortağı: IFZA, Meydan ve DWTC. Üçü de genel ticari ve hizmet faaliyetlerine açık; fark konumda, lisans süresi seçeneklerinde ve fiyatta.",
    },
    { kind: "h3", text: "IFZA" },
    {
      kind: "p",
      text: "IFZA'nın merkezi Dubai Silicon Oasis'te. IFZA ticari ve profesyonel lisans veriyor, farklı faaliyetlerin tek lisansta birleştirilmesine izin veriyor ve kuruluş sırasında fiziken bulunmanızı istemiyor. Ortac Global'de IFZA kuruluşu 1 yıllık lisans dahil $5.120; üç serbest bölge içinde en düşük başlangıç fiyatı bu. Lisans birden çok yıl için peşin alınırsa 2 yılda %15, 3 yılda %20, 5 yılda %30 indirim uygulanıyor. Faaliyetinizin karşılığını [IFZA faaliyet kodu aracında](/araclar/ifza-faaliyet-kodu) arayabilirsiniz.",
    },
    { kind: "h3", text: "Meydan" },
    {
      kind: "p",
      text: "Meydan Free Zone başvuru ve ödeme adımlarının tamamını uzaktan yürütüyor; görüşmeler Meydan Hotel'de ya da çevrim içi yapılıyor. Meydan'ın listesinde 2.500'den fazla faaliyet var ve tek lisansa üç faaliyet grubu yazılabiliyor. Ortac Global'de Meydan kuruluşu 1 yıllık lisans dahil $5.300; 2 ve 3 yıllık peşin lisansta %15 indirim var. Fiziki ofis ihtiyacı sınırlı, dijital çalışan şirketlere uyuyor.",
    },
    { kind: "h3", text: "DWTC" },
    {
      kind: "p",
      text: "DWTC serbest bölgesi Dubai World Trade Centre'da, Rashid Tower'dan One Central'a uzanan alanda; Dubai'nin iş merkezinin ortasında. DWTC 1.200'den fazla faaliyete lisans veriyor ve ortak çalışma alanından ticari ofise kadar farklı ofis seçenekleri sunuyor. Ortac Global'de DWTC kuruluşu 1 yıllık lisans dahil $5.820. DWTC'de çok yıllı lisans yok; lisans her yıl yenileniyor. Merkezde bir adres ve kurumsal bir görünüm isteyen şirketlere uyuyor.",
    },

    {
      kind: "note",
      tone: "info",
      title: "Ortac Global bu konuda ne yapıyor?",
      text: "Ortac Global 1996'dan beri muhasebe, vergi ve şirket kuruluşu alanında çalışıyor ve Dubai'de kendi ofisi var. IFZA, Meydan ve DWTC serbest bölgelerinin iş ortağıyız; kuruluşu, vize başvurularını ve muhasebeyi Dubai ofisimizden yürütüyoruz. Ne sattığınızı ve müşterinizin nerede olduğunu dinliyor, hangi yapının size uyduğunu ilk görüşmede birlikte değerlendiriyoruz.",
    },
    {
      kind: "p",
      text: "Dubai'nin işinize uyup uymadığını görmek için [uygunluk testini](/uygunluk-testi) çözebilir, Dubai'yi İngiltere ve KKTC ile [ülke karşılaştırması](/ulkeler) sayfasında yan yana görebilirsiniz. Serbest bölge kuruluşunun adımları ve fiyat hesabı [Dubai'de şirket kuruluşu sayfasında](/dubai); sorularınız için [bize yazabilirsiniz](/iletisim).",
    },

    { kind: "h2", id: "sss", text: "Sık sorulan sorular" },
    {
      kind: "sss",
      items: [
        {
          q: "Dubai'de serbest bölge şirketi ile mainland şirketinin farkı nedir?",
          a: "Dubai'de serbest bölge şirketi lisansını serbest bölge otoritesinden, mainland şirketi DET'ten alıyor. Mainland şirketi BAE'nin her yerinde serbestçe satış yapıyor; serbest bölge şirketinin iç pazara doğrudan satışı kurala bağlı.",
        },
        {
          q: "Dubai mainland şirket kurma için yerel ortak gerekiyor mu?",
          a: "Hayır. Dubai'de mainland şirketlerde 2021'den beri %100 yabancı mülkiyet mümkün. İstisna, BAE Bakanlar Kurulu'nun belirlediği stratejik etkili faaliyetler.",
        },
        {
          q: "Dubai serbest bölge şirketi Dubai içindeki müşteriye fatura kesebilir mi?",
          a: "BAE resmî portalına göre serbest bölge şirketinin mainland'de doğrudan satışı genel olarak serbest değil. Dubai'de 2025'ten beri DET'ten şube lisansı ya da geçici izin alarak serbest bölge dışında çalışmak mümkün.",
        },
        {
          q: "Dubai'de serbest bölge şirketi vergiden muaf mı?",
          a: "Hayır. Dubai'de serbest bölge şirketi de kurumlar vergisi mükellefi: 375.000 AED'ye kadar %0, üstü %9. Kanundaki %0 oranı ağır şartlara bağlı ve küçük şirketlerin çoğu bu şartları sağlamıyor.",
        },
        {
          q: "Dubai'de serbest bölge şirketinden mainland şirketine geçilebilir mi?",
          a: "Dubai'de serbest bölge şirketi mainland şirketine dönüştürülemiyor; geçiş yeni bir kuruluş demek. İç pazara açılmak isteyen serbest bölge şirketi için ara yol, DET'ten alınan şube lisansı ya da izin.",
        },
        {
          q: "Dubai'de IFZA, Meydan ve DWTC arasındaki fark ne?",
          a: "Ortac Global'de IFZA $5.120, Meydan $5.300, DWTC $5.820'den başlıyor. IFZA'da 5 yıla, Meydan'da 3 yıla kadar indirimli çok yıllı lisans var; DWTC yalnız yıllık yenileniyor ve Dubai'nin iş merkezinde.",
        },
      ],
    },
  ],

  links: [
    {
      label: "Dubai'de şirket kurma rehberi",
      href: "/blog/dubai-sirket-kurulusu-rehberi",
      line: "Şartlar, belgeler, adım adım süreç, vize, banka ve ilk yıl maliyeti.",
    },
    {
      label: "Dubai'de şirket kuruluşu",
      href: "/dubai",
      line: "IFZA, Meydan ve DWTC için kuruluş adımları ve fiyat hesabı.",
    },
    {
      label: "Dubai vergi rehberi",
      href: "/dubai/vergi",
      line: "Kurumlar vergisi, KDV ve beyan takvimi.",
    },
  ],

  closing: {
    title: "Hangi yapının size uyduğunu birlikte değerlendirelim.",
    line: "Ne sattığınızı ve müşterinizin nerede olduğunu anlatın; yapıyı ve serbest bölgeyi ilk görüşmede netleştirelim.",
    cta: "İletişime geçin",
  },

  footnote:
    "Bu yazı genel bilgilendirme amaçlıdır; kişiye özel vergi ya da hukuk danışmanlığı değildir. Serbest bölge kuralları ve harçlar otoritelerce değiştirilebilir; fiyatlar Ortac Global'in 10 Ekim 2026 tarihli fiyatlarıdır ve KDV hariçtir.",
};
