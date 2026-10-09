/* GELİR VERGİSİ OLMAYAN ÜLKELER · eski siteden taşınan yazı
   (Search Console, 16 ay: 739 tıklama, yaklaşık 40.000 gösterim, ortalama sıra 6,4).

   ADRES: eski sitedekiyle AYNI, "…-2025" dahil. Asgari ücret yazısının
   tersine burada yıl adreste KALDI (Google'daki sıra korunsun); yıl yalnız
   başlıkta 2026 oldu. Yazı her yıl aynı adreste güncellenir.
   TARİH VE YAZAR (Burak, 09.10.2026): yazı baştan yazıldığı için yeni yazı
   gibi çıkıyor: publishedAt bugünün tarihi, updatedAt yok, yazar Murat Ortaç.
   Aynı turda uzunluk 1.400-2.000 kelimeye, metin içi site bağlantısı 8-10'a
   çıktı; öteki taşınan yazılara da bağlanıyor.

   BAŞLIK sayfanın gerçekten çıktığı sorgulardan kuruldu: "gelir vergisi
   olmayan ülkeler", "en az vergi alan ülkeler 2025", "vergi cenneti ülkeler",
   "dubai'de vergi var mı". Dördü de gövdede bir başlıkta ya da SSS'te geçiyor.

   DURUŞ: eski yazı on dört ülkelik bir "vergisiz yaşam" listesiydi (her ülke
   için "avantajları", yatırımla vatandaşlık fiyatları, "kazancınızı optimize
   edin"). Sitenin duruşu bunun tersi: şirket kurmak otomatik vergi avantajı
   vermez. Yeni yazı listeyi doğru bilgiyle veriyor ve asıl belirleyicinin
   vergi mukimliği olduğunu anlatıyor (GVK md. 3, 4, 6).

   KAYNAK (09.10.2026'da tek tek okundu):
     · BAE KDV %5, eşik 375.000 AED   tax.gov.ae (KDV kayıt sayfası)
     · BAE kurumlar vergisi           mof.gov.ae (1 Haziran 2023 ve sonrası mali
                                      yıllar) + PwC (375.000 AED'ye kadar %0,
                                      üstü %9; büyük gruplarda %15, 01.01.2025)
     · Bahreyn, Katar, Kuveyt, Suudi Arabistan, Umman, Bahamalar, Bermuda,
       Cayman Adaları               PwC Worldwide Tax Summaries, ülke sayfaları
                                      (kişisel + kurumlar + diğer vergiler;
                                      hepsi 2026'da gözden geçirilmiş). Ülkelerin
                                      kendi vergi idaresi siteleri bu oturumda
                                      açılmadı (403/404), o yüzden rakamların
                                      dayanağı PwC; yazıda adıyla anılıyor.
     · Umman gelir vergisi            PwC: 01.01.2028, 42.000 OMR üstü, %5
     · Monako                         Fransız vergi idaresi (bofip.impots.gouv.fr,
                                      BOI-INT-CVB-MCO-10): Monako'da oturan
                                      gerçek kişiden gelir vergisi yok; Fransız
                                      vatandaşı 1963 anlaşması md. 7 ile Fransa'da
                                      vergileniyor. Kâr vergisinin ORANI resmî
                                      sayfadan okunamadı, tabloya rakam yazılmadı.
     · Maldivler                      mira.gov.mv: 2020'den beri gelir vergisi
                                      var (en üst dilim %15). Listeden ÇIKTI.
     · AB listesi                     AB Konseyi sonuç belgesi 5869/26,
                                      17 Şubat 2026, Ek I: on ülke
     · Türkiye                        Gelir Vergisi Kanunu md. 3, 4, 6
                                      ve kâr payı istisnası md. 22/4
                                      (mevzuat.gov.tr); KVK md. 3 ve pasif gelir
                                      uyarısı sitenin ülke vergi bölümlerinden
   LİSTEYE GİRMEYENLER: Batı Sahra (bir vergi idaresi yok, doğrulanamaz),
   Antigua ve Barbuda, Saint Kitts ve Nevis, Vanuatu (bu turda doğrulanmadı;
   Vanuatu yalnız AB listesi cümlesinde geçiyor), Maldivler (gelir vergisi var).
   KKTC bilerek listede değil: KKTC'de kişisel gelir vergisi var; Serbest Liman
   şirketinin durumu sitedeki bilgiyle ayrı bölümde anlatılıyor.
   Ortac'a dair cümleler sitenin Dubai, İngiltere ve KKTC vergi bölümlerinden. */
import type { BlogPost } from "@/lib/blog";
import { SLUG } from "@/lib/blogTemel";
import { COUNTRY_PHOTO, POST_PHOTO } from "@/lib/media";

export const POST_GELIR_VERGISI_OLMAYAN: BlogPost = {
  slug: SLUG.gelirVergisiOlmayan,
  category: "maliyet-ve-vergi",
  title: "Gelir vergisi olmayan ülkeler 2026: güncel liste ve vergi mukimliği",
  heroAccent: "güncel liste ve vergi mukimliği",
  summary:
    "Kişisel gelir vergisi almayan on ülke, kurumlar vergisi oranlarıyla birlikte. Türkiye'de yaşayanlar için asıl belirleyici olan vergi mukimliği.",
  /* 10.10.2026 · Burak: yazılar toplu girildi; tarihleri 2026'ya yay.
     Yayın tarihi yayıldı, güncelleme tarihi rakamların doğrulandığı gün
     (yazı içindeki "Ekim 2026 itibarıyla" ifadeleriyle tutarlı). */
  publishedAt: "2026-01-22",
  updatedAt: "2026-10-09",
  topic: "Vergi",
  tags: ["Gelir vergisi", "Vergi mukimliği", "Dubai"],
  author: "Murat Ortaç",
  cover: POST_PHOTO.corpTax,

  seo: {
    title: "Gelir Vergisi Olmayan Ülkeler 2026: Güncel Liste",
    description:
      "Gelir vergisi olmayan ülkeler 2026 listesi: BAE, Katar, Bahreyn, Monako ve diğerleri. Dubai'de vergi var mı, Türkiye'de yaşayan için ne değişir?",
  },

  sourceNote:
    "Ülke oranları PwC Worldwide Tax Summaries ülke sayfalarından, BAE için ayrıca Federal Vergi Otoritesi ve Maliye Bakanlığı'ndan, Türkiye kuralları Gelir Vergisi Kanunu'ndan, AB listesi AB Konseyi'nin 17 Şubat 2026 tarihli belgesinden alınmıştır. Bilgiler 9 Ekim 2026 itibarıyla günceldir.",

  body: [
    {
      kind: "ozet",
      items: [
        "Kişisel gelir vergisi almayan ülkelerin başında Körfez ülkeleri geliyor: BAE, Bahreyn, Katar, Kuveyt ve Suudi Arabistan maaştan gelir vergisi almıyor.",
        "Dubai'de (BAE) kişisel gelir vergisi yok; şirketler 375.000 dirhemin üstündeki kârdan yüzde 9 kurumlar vergisi, satışlardan yüzde 5 KDV ödüyor.",
        "Umman 1 Ocak 2028'den itibaren yıllık 42.000 Umman riyalinin üstündeki gelirden yüzde 5 gelir vergisi alacak.",
        "Türkiye'de yaşayan biri bu ülkelerden birinde şirket kurduğunda Türkiye'deki vergi yükümlülüğü sona ermiyor; belirleyici olan vergi mukimliği.",
      ],
    },
    {
      kind: "p",
      text: "Gelir vergisi olmayan ülkeler aranırken iki ayrı vergi birbirine karışıyor: kişinin maaşından ve kâr payından alınan kişisel gelir vergisi ile şirketin kârından alınan kurumlar vergisi. Bu yazı 9 Ekim 2026 itibarıyla kişisel gelir vergisi almayan ülkeleri kurumlar vergisi oranlarıyla birlikte veriyor, ardından Türkiye'de yaşayan biri için bu listenin ne anlama geldiğini anlatıyor.",
    },

    { kind: "h2", id: "iki-vergi", text: "Gelir vergisi ile kurumlar vergisi arasındaki fark nedir?" },
    {
      kind: "p",
      text: "Gelir vergisi gerçek kişinin kazancından alınır: maaş, serbest meslek kazancı, kira, kâr payı. Kurumlar vergisi ise şirketin yıllık kârından alınır. \"Vergisiz ülke\" diye anılan yerlerin çoğunda sıfır olan yalnız birincisidir. Şirket kuran biri iki vergiyle de karşılaşır: önce şirket kârı vergilenir, sonra kârdan kişiye geçen pay, kişinin vergi mukimi olduğu ülkenin kurallarına girer. Bu yüzden aşağıdaki listeyi okurken iki sütuna ayrı ayrı bakmak gerekiyor.",
    },

    { kind: "h2", id: "liste", text: "Gelir vergisi olmayan ülkeler hangileri?" },
    {
      kind: "p",
      text: "2026'da kişisel gelir vergisi almayan ülkelerin en bilinenleri Körfez'de: Birleşik Arap Emirlikleri (BAE), Bahreyn, Katar, Kuveyt ve Suudi Arabistan. Avrupa'da Monako, Karayipler ve Atlantik'te Bahamalar, Bermuda ve Cayman Adaları da gelir vergisi almıyor. Aşağıdaki tablodaki her satır, PwC'nin [Worldwide Tax Summaries](https://taxsummaries.pwc.com/) yayınındaki ülke sayfasıyla karşılaştırıldı.",
    },
    {
      kind: "tablo",
      caption: "Kişisel gelir vergisi almayan ülkeler · Ekim 2026",
      head: ["Ülke", "Kişisel gelir vergisi", "Kurumlar vergisi", "Dikkat edilecek nokta"],
      rows: [
        ["BAE (Dubai, Abu Dabi)", "Yok", "375.000 AED'ye kadar %0, üstü %9", "KDV %5. Büyük gruplarda %15 asgari vergi."],
        ["Bahreyn", "Yok", "Genel kurumlar vergisi yok; petrol ve gazda %46", "KDV %10. Büyük gruplarda %15 asgari vergi."],
        ["Katar", "Maaştan yok", "%10; tamamı Katar ya da Körfez vatandaşlarına ait şirketten alınmıyor", "KDV yok. Serbest çalışan, Katar kaynaklı gelirinden vergi ödeyebiliyor."],
        ["Kuveyt", "Yok", "Yabancı şirketlerde %15", "KDV yok. Büyük gruplarda %15 asgari vergi."],
        ["Suudi Arabistan", "Maaştan yok", "Yabancı ortağın payına %20; Suudi ve Körfez vatandaşı ortağa %2,5 zekât", "KDV %15."],
        ["Umman", "2028'e kadar yok", "%15", "1 Ocak 2028'den itibaren 42.000 riyal üstü gelire %5. KDV %5."],
        ["Monako", "Yok (Fransız vatandaşları hariç)", "Monako dışından ciro elde eden şirketlerde kâr vergisi var", "Fransız vatandaşları 1963 anlaşması gereği Fransa'da vergileniyor."],
        ["Bahamalar", "Yok", "Yok", "Büyük gruplarda %15 asgari vergi."],
        ["Bermuda", "Yok", "Yalnız büyük gruplarda %15", "Kurumlar vergisi 2025'te başladı."],
        ["Cayman Adaları", "Yok", "Yok", "Kişilerden stopaj da alınmıyor."],
      ],
      foot: "Büyük grup: yıllık küresel cirosu 750 milyon avro ve üstü olan çok uluslu şirket grubu. Tablo genel oranları gösterir; sektöre ve şirket yapısına göre istisnalar vardır.",
    },
    {
      kind: "p",
      text: "Tablonun gösterdiği ilk şey, gelir vergisi olmayan ülkelerin çoğunda başka vergilerin bulunduğu: KDV, kurumlar vergisi, zekât ya da sosyal güvenlik primi. \"En az vergi alan ülkeler\" sorusunun tek bir cevabı bu yüzden yok; maaşla çalışan biriyle şirket sahibi için sıralama farklı çıkıyor.",
    },
    { kind: "h3", text: "Körfez ülkelerinde gelir vergisi nasıl işliyor?" },
    {
      kind: "p",
      text: "Körfez ülkelerinin beşi maaştan gelir vergisi almıyor, ama kuralları aynı değil. Bahreyn'de kişisel gelir vergisi düzeni hiç yok; çalışanlar yalnız sosyal sigorta primi ödüyor. Katar ve Suudi Arabistan'da vergisiz olan ücret geliri: Katar'da serbest çalışan biri Katar kaynaklı kazancından vergi ödeyebiliyor, Suudi Arabistan'da ücret dışındaki ticari kazanç şirket gibi vergileniyor. Kuveyt kişilerden gelir vergisi almıyor, yabancı şirketlerin kârından ise yüzde 15 alıyor.",
    },
    { kind: "h3", text: "Monako'da gelir vergisi kimden alınmıyor?" },
    {
      kind: "p",
      text: "Monako, ülkede oturan gerçek kişilerden gelir vergisi almıyor. Tek istisna Fransız vatandaşları: Fransa ile Monako arasındaki 1963 tarihli vergi anlaşması gereği Monako'ya yerleşen Fransız vatandaşı, Fransa'da oturuyormuş gibi Fransa'da vergileniyor. Monako örneği, bir ülkenin vergi almamasının herkes için aynı sonucu doğurmadığını gösteriyor; kişinin vatandaşlığı ve geldiği ülkenin kuralları da hesaba giriyor.",
    },
    { kind: "h3", text: "Bahamalar, Bermuda ve Cayman Adaları'nda hangi vergiler var?" },
    {
      kind: "p",
      text: "Bahamalar'da kişisel gelir vergisi de kurumlar vergisi de yok. Cayman Adaları kişilerden gelir vergisi ve stopaj almıyor; şirketlerden de kurumlar vergisi, sermaye kazancı vergisi ya da bordro vergisi alınmıyor. Bermuda kişilerden gelir vergisi almıyor, 2025'ten beri de yalnız büyük çok uluslu gruplara yüzde 15 kurumlar vergisi uyguluyor. Üç ülke de AB'nin Şubat 2026'da güncellenen iş birliği yapmayan ülkeler listesinde yer almıyor.",
    },

    { kind: "h2", id: "dubai", text: "Dubai'de vergi var mı?" },
    {
      kind: "p",
      text: "Dubai'de, yani BAE'de kişisel gelir vergisi yok: maaş ve kâr payı üzerinden BAE'de vergi alınmıyor. Şirketler için durum farklı. BAE, 1 Haziran 2023 ve sonrasında başlayan mali yıllar için [federal kurumlar vergisini](https://mof.gov.ae/en/public-finance/tax/corporate-tax/) yürürlüğe koydu. Net kârın ilk 375.000 dirhemi (AED) yüzde 0, üstü yüzde 9 oranında vergileniyor.",
    },
    {
      kind: "p",
      text: "Serbest bölgede kurulan Dubai şirketi de kurumlar vergisi mükellefi; \"serbest bölge şirketi vergi ödemez\" genellemesi doğru değil. BAE'de ayrıca yüzde 5 KDV var ve yıllık vergiye tabi satışı 375.000 dirhemi aşan şirketin KDV kaydı yaptırması zorunlu. Oranların tamamı [Dubai vergi sayfasında](/dubai/vergi) duruyor; kendi kârınızla hesap yapmak için [Dubai kurumlar vergisi hesaplayıcısını](/araclar/kurumlar-vergisi/dubai) kullanabilirsiniz.",
    },
    {
      kind: "gorsel",
      src: POST_PHOTO.dubaiCost,
      alt: "Gün batımında Dubai silueti, ortada Burj Khalifa",
      caption: "Dubai'de kişisel gelir vergisi yok; şirket kârı ve satışlar ise vergiye tabi.",
    },
    { kind: "h3", text: "Dubai'de şirket kuran biri hangi giderlerle karşılaşır?" },
    {
      kind: "p",
      text: "Dubai'de gelir vergisi olmaması, şirketin masrafsız olduğu anlamına gelmiyor. Lisans her yıl yenileniyor, defter tutma ve kurumlar vergisi beyanı zorunlu; beyan, vergi döneminin bitiminden itibaren dokuz ay içinde veriliyor. Hangi işlerin Dubai'de karşılık bulduğunu [Dubai'de iş fikirleri](/blog/dubai-is-fikirleri-en-karlı-is-imkanlari) yazısında, kira ve gündelik harcamaları [Dubai yaşam rehberinde](/blog/dubai-yasam-rehberi-maliyetler-is-imkanlari) bulabilirsiniz.",
    },

    { kind: "h2", id: "degisim", text: "Gelir vergisi olmayan ülkelerde kurallar değişiyor mu?" },
    {
      kind: "p",
      text: "Gelir vergisi olmayan ülkelerin sayısı azalıyor ve kalanlar yeni vergiler getiriyor. Umman, Körfez'de kişisel gelir vergisini yasalaştıran ilk ülke oldu: 1 Ocak 2028'den itibaren yıllık 42.000 Umman riyalinin üstündeki gelirden yüzde 5 vergi alınacak. Maldivler eski listelerde hâlâ geçiyor, oysa ülkede 2020'den beri kademeli bir gelir vergisi uygulanıyor; en üst dilim yüzde 15.",
    },
    { kind: "h3", text: "Yüzde 15 asgari vergi kimleri etkiliyor?" },
    {
      kind: "p",
      text: "Şirketler tarafında da kurallar değişti. BAE'nin kurumlar vergisi 2023'te başladı. BAE, Bahreyn ve Katar, 1 Ocak 2025'ten itibaren başlayan mali yıllarda büyük çok uluslu gruplara yüzde 15 asgari vergi uyguluyor; Kuveyt ve Bahamalar benzer bir kuralı yasalaştırdı, Bermuda aynı gruplar için yüzde 15 kurumlar vergisi getirdi. Asgari vergi, yıllık küresel cirosu 750 milyon avro ve üstü olan grupları kapsıyor; küçük ve orta ölçekli şirketi doğrudan etkilemiyor. Bir ülkenin bugünkü oranına göre yapılan plan birkaç yıl içinde geçerliliğini yitirebiliyor.",
    },

    { kind: "h2", id: "vergi-cenneti", text: "Vergi cenneti ülkeler hangileri, bu terim ne anlama geliyor?" },
    {
      kind: "p",
      text: "\"Vergi cenneti\" bir hukuk terimi sayılmaz; düşük ya da sıfır vergi uygulayan ve vergi bilgisi paylaşımında yetersiz bulunan ülkeler için kullanılan gündelik bir ad. Resmî karşılığı, uluslararası kurumların tuttuğu listeler. OECD'nin \"iş birliği yapmayan vergi cennetleri\" listesinde 2009'dan beri hiçbir ülke bulunmuyor.",
    },
    {
      kind: "p",
      text: "Bugün başvurulan liste Avrupa Birliği'ninki. [AB Konseyi'nin vergi konusunda iş birliği yapmayan ülkeler listesi](https://www.consilium.europa.eu/en/policies/eu-list-of-non-cooperative-jurisdictions/) yılda iki kez güncelleniyor. 17 Şubat 2026 güncellemesinde listede on ülke var: Amerikan Samoası, Anguilla, Guam, Palau, Panama, Rusya, Turks ve Caicos Adaları, ABD Virjin Adaları, Vanuatu ve Vietnam. Listenin ölçütü vergi şeffaflığı ve bilgi değişimi standartlarına uyum; düşük vergi oranı tek başına listeye girme sebebi sayılmıyor. Yukarıdaki tabloda yer alan on ülkenin hiçbiri bu listede yok.",
    },

    { kind: "h2", id: "turkiye", text: "Türkiye'de yaşıyorsanız yurt dışındaki şirket vergiyi bitirir mi?" },
    {
      kind: "p",
      text: "Hayır. Türkiye'de yaşayan biri gelir vergisi olmayan bir ülkede şirket kurduğunda Türkiye'deki vergi yükümlülüğü kendiliğinden sona ermiyor. [Gelir Vergisi Kanunu](https://www.mevzuat.gov.tr/MevzuatMetin/1.4.193.pdf)'nun 3. maddesine göre Türkiye'de yerleşmiş olanlar, Türkiye içinde ve dışında elde ettikleri kazançların tamamı üzerinden vergilendiriliyor. Buna tam mükellefiyet deniyor.",
    },
    {
      kind: "p",
      text: "Kanunun 4. maddesi kimin Türkiye'de yerleşmiş sayıldığını iki ölçüyle belirliyor: ikametgâhı Türkiye'de olanlar ve bir takvim yılı içinde Türkiye'de sürekli olarak altı aydan fazla oturanlar. Geçici ayrılmalar bu süreyi kesmiyor. Bu iki ölçüden biri sizin için geçerliyse, Dubai şirketinden size geçen kâr payı ya da maaş Türkiye'de beyan konusu olabiliyor.",
    },
    {
      kind: "note",
      tone: "warn",
      title: "Şirketin nereden yönetildiği de önemli",
      text: "Yurt dışında kurulmuş olsa bile işleri fiilen Türkiye'de toplanıp yönetilen bir şirket, Türkiye'de kurumlar vergisi mükellefi sayılabiliyor. Çifte vergilendirmeyi önleme anlaşmaları aynı gelirin iki kez vergilenmesini engellemek için var; geliri vergisiz hâle getirmiyor.",
    },

    { kind: "h3", text: "Yurt dışındaki şirketten alınan kâr payı Türkiye'de nasıl vergileniyor?" },
    {
      kind: "p",
      text: "Türkiye'de tam mükellef olan biri, yurt dışındaki şirketinden aldığı kâr payını Türkiye'de yıllık beyannameyle beyan ediyor. Gelir Vergisi Kanunu'nun 22. maddesi bu kâr payının yarısını iki şartla vergiden istisna tutuyor: şirketin ödenmiş sermayesinin en az yüzde 50'sine sahip olmak ve kâr payını, ilgili yılın beyannamesinin verilmesi gereken tarihe kadar Türkiye'ye getirmek.",
    },
    {
      kind: "p",
      text: "Kâr şirkette kalıp şirketin işine harcandıkça, hizmet ve ticaret gibi aktif gelirlerde Türkiye'de vergi doğmuyor. Gelirin ağırlığı faiz, kira ya da lisans gibi pasif gelirse durum değişiyor: dağıtılmayan kâr da ortağın geliri sayılabiliyor.",
    },

    { kind: "h2", id: "mukimlik", text: "Gelir vergisi olmayan bir ülkeye taşınmak vergi mukimliğini değiştirir mi?" },
    {
      kind: "p",
      text: "Vergi mukimliği, hangi ülkenin sizi dünya genelindeki gelirinizden vergilendirebileceğini belirler ve fiilen nerede yaşadığınıza bağlıdır. Türkiye'de yerleşmiş sayılmayan gerçek kişiler, Gelir Vergisi Kanunu'nun 6. maddesine göre yalnız Türkiye'de elde ettikleri kazançlar üzerinden vergilendiriliyor. Türkiye'deki bir evin kira geliri bu durumda da Türkiye'de vergileniyor.",
    },
    {
      kind: "p",
      text: "Başka bir ülkeden oturum kartı ya da vize almak tek başına bu sonucu doğurmuyor. İkametgâhınız Türkiye'de kaldığı ya da yılın altı ayından fazlasını Türkiye'de geçirdiğiniz sürece kanun sizi Türkiye'de yerleşmiş sayıyor. Eviniz ve yaşamınız Türkiye'de sürüyorsa, yurt dışındaki şirket Türkiye'deki beyan yükümlülüğünüzü değiştirmiyor.",
    },

    { kind: "h2", id: "kktc-ingiltere", text: "KKTC ve İngiltere bu listede neden yok?" },
    {
      kind: "p",
      text: "KKTC ve İngiltere gelir vergisi olmayan ülkeler arasında sayılmıyor, çünkü ikisinde de kişisel gelir vergisi var. KKTC'de vergi avantajı belirli bir şirket türüne tanınmış durumda: KKTC Serbest Liman şirketi, KKTC dışındaki ve Serbest Liman içindeki şirketlere yaptığı işte kurumlar ve gelir vergisi ödemiyor, KDV mükellefi de olmuyor. KKTC içine satışta normal vergi kuralları uygulanıyor. Ayrıntısı [KKTC vergi sayfasında](/kktc/vergi) ve [KKTC vergi avantajları](/blog/kktc-vergi-avantajlari) yazısında.",
    },
    {
      kind: "gorsel",
      src: COUNTRY_PHOTO.kktc,
      alt: "Girne Limanı ve Kalesi, arkada Beşparmak Dağları",
      caption: "KKTC'de vergi avantajı Serbest Liman şirketine tanınıyor.",
    },
    {
      kind: "p",
      text: "İngiltere'de limited şirketin kârı yüzde 19 ile 25 arasında kurumlar vergisine tabi. İngiltere şirketi çoğunlukla ödeme altyapısı ve tanınırlık için seçiliyor. Oranlar ve kârın Türkiye'ye nasıl geldiği [İngiltere vergi sayfasında](/ingiltere/vergi) anlatılıyor.",
    },
    {
      kind: "p",
      text: "İki ülkeyi yaşam ve iş tarafıyla tanımak isteyenler için ayrı yazılar var: [KKTC yaşam rehberi](/blog/kktc-yasam-rehberi-kibris-is-firsatlari-maliyetler) ve [İngiltere yaşam rehberi](/blog/ingiltere-yasam-rehberi-is-imkanlari-vize-maliyetler). İngiltere'de çalışan alacaksanız [İngiltere asgari ücret](/blog/ingiltere-asgari-ucret) oranlarına, İngiltere ile mal ticareti yapacaksanız [EORI numarası](/blog/eori-numarasi-nedir-nasil-alinir) yazısına bakabilirsiniz.",
    },

    { kind: "h2", id: "ulke-secimi", text: "Yurt dışında şirket kuracaklar ülke seçerken neye bakmalı?" },
    {
      kind: "p",
      text: "Yurt dışında şirket kurarken vergi oranı karara giren ölçütlerden yalnız biri. Müşterilerinizin hangi ülkede olduğu, ödemeyi hangi kanaldan alacağınız, banka hesabının açılıp açılamayacağı ve şirketin yıllık yenileme ile muhasebe gideri sonucu en az oran kadar etkiliyor. Dubai için bu giderlerin dökümü [Dubai'de şirket kurmanın maliyet kalemleri](/blog/dubaide-sirket-kurmanin-maliyet-kalemleri) yazısında var.",
    },
    {
      kind: "note",
      tone: "info",
      title: "Ortac Global bu konuda ne yapıyor?",
      text: "Ortac Global 1996'dan beri muhasebe, vergi, şirket kuruluşu ve kurumsal danışmanlık alanında çalışıyor; Dubai, İngiltere ve KKTC'de kendi ofisleri var. Bir şirketin vergi avantajı gerçek faaliyete, yönetimin nerede yürüdüğüne, mukimliğinize ve gelir türünüze bağlı. Bunu değerlendirmeden kurulum yapmıyoruz. Kişiye özel vergi görüşü vermiyoruz.",
    },
    {
      kind: "p",
      text: "Üç ülkeyi vergi, maliyet ve banka tarafıyla yan yana görmek için [ülke karşılaştırmasına](/ulkeler) bakabilirsiniz. Hangi ülkenin işinize uyduğundan emin değilseniz [uygunluk testi](/uygunluk-testi) birkaç soruyla bir başlangıç noktası veriyor. Kuruluş adımları [Dubai'de şirket kurma sayfasında](/dubai) yer alıyor; kendi durumunuzu konuşmak için [iletişim sayfasından](/iletisim) yazabilirsiniz.",
    },

    { kind: "h2", id: "sss", text: "Sık sorulan sorular" },
    {
      kind: "sss",
      items: [
        {
          q: "Dubai'de vergi var mı?",
          a: "Dubai'de kişisel gelir vergisi yok; maaş ve kâr payından BAE'de vergi alınmıyor. Şirketler net kârın 375.000 dirhemi aşan kısmından yüzde 9 kurumlar vergisi ödüyor, mal ve hizmet satışında yüzde 5 KDV uygulanıyor. Ayrıntı [Dubai vergi sayfasında](/dubai/vergi).",
        },
        {
          q: "Gelir vergisi olmayan ülkeler hangileri?",
          a: "2026'da kişisel gelir vergisi almayan ülkeler arasında BAE, Bahreyn, Katar, Kuveyt, Suudi Arabistan, Monako, Bahamalar, Bermuda ve Cayman Adaları var. Umman 2028'e kadar bu grupta; o tarihten sonra yüksek gelirden yüzde 5 vergi alacak.",
        },
        {
          q: "En az vergi alan ülkeler hangileri?",
          a: "Tek bir sıralama yok, çünkü sonuç hangi vergiye baktığınıza göre değişiyor. Bahamalar ve Cayman Adaları hem kişisel gelir vergisi hem genel kurumlar vergisi almıyor. BAE'de kişisel gelir vergisi yok ama şirket kârında yüzde 9, satışta yüzde 5 KDV var.",
        },
        {
          q: "Dubai'de şirket kurarsam Türkiye'de vergi öder miyim?",
          a: "Türkiye'de yerleşmiş sayılıyorsanız dünya genelindeki geliriniz Türkiye'de beyana tabi olabilir; Dubai şirketinden aldığınız kâr payı da buna dahil. Şirket kurmak tek başına Türkiye'deki yükümlülüğü sona erdirmiyor. Belirleyici olan vergi mukimliğiniz ve şirketin nereden yönetildiği.",
        },
        {
          q: "Vergi cenneti sayılan bir ülkede şirket kurmak yasal mı?",
          a: "Düşük vergili bir ülkede şirket kurmak yasaldır. Sorun, mukim olduğunuz ülkede beyan edilmesi gereken gelir beyan edilmediğinde doğar.",
        },
        {
          q: "KKTC'de gelir vergisi var mı?",
          a: "Evet, KKTC'de kişisel gelir vergisi var. Vergi avantajı KKTC Serbest Liman şirketine ait: bu şirket KKTC dışındaki ve Serbest Liman içindeki şirketlere yaptığı işte kurumlar ve gelir vergisi ödemiyor. Ayrıntı [KKTC'de şirket kurma sayfasında](/kktc).",
        },
        {
          q: "Umman'da gelir vergisi ne zaman başlıyor?",
          a: "Umman'da kişisel gelir vergisi 1 Ocak 2028'de başlıyor. Yıllık 42.000 Umman riyalinin üstündeki gelirden yüzde 5 vergi alınacak; bu eşiğin altında kalan gelir vergilenmeyecek.",
        },
      ],
    },
  ],

  links: [
    {
      label: "Dubai vergi çerçevesi",
      href: "/dubai/vergi",
      line: "Kurumlar vergisi, KDV ve Türkiye'de mukim olanlar için dikkat edilecekler.",
    },
    {
      label: "Ülke karşılaştırması",
      href: "/ulkeler",
      line: "Dubai, İngiltere ve KKTC vergi, maliyet ve banka tarafıyla yan yana.",
    },
    {
      label: "KKTC vergi çerçevesi",
      href: "/kktc/vergi",
      line: "Serbest Liman şirketinin vergi durumu ve kârın Türkiye'ye gelişi.",
    },
  ],

  closing: {
    title: "Hangi ülkenin işinize uyduğunu birlikte konuşalım",
    line: "Faaliyetinizi ve mukimliğinizi değerlendirmeden kurulum yapmıyoruz; önce durumunuzu konuşuyoruz.",
    cta: "İletişime geçin",
  },

  footnote:
    "Bu yazı genel bilgilendirme amaçlıdır; kişiye özel vergi, hukuk ya da göçmenlik danışmanlığı değildir. Vergi oranları ve listeler değişir; karar vermeden önce güncel mevzuatı ve kendi mukimlik durumunuzu bir uzmanla değerlendirin.",
};
