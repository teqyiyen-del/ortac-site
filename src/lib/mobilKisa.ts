/* TELEFONDA KISA YAZI · deneme sözlüğü (08.10.2026)
   Burak: "mobile özel: svg görseller, yazı puntosu, yazı miktarı …
   gerekirse yazılarda kısaltma yapabilirsin."

   375 px'te ölçüldü: giriş cümleleri beş altı satır, bölüm cümleleri dört
   beş satır tutuyor. Buradaki her satır bir cümlenin TELEFON sürümü: anlam
   aynı, ikinci yan cümle atılmış. Hedef giriş cümlesinde en çok üç, bölüm
   cümlesinde en çok iki satır.

   NASIL ÇALIŞIYOR (09.10.2026'dan beri canlıda). Anahtar, cümlenin başı (ilk
   kelimeler yeter). components/mobil/Tel bir cümleyi basarken bu sözlüğe
   bakıyor; karşılığı varsa uzun ve kısa sürümü birlikte basıyor, hangisinin
   görüneceğini CSS seçiyor (.m-uzun / .m-kisa). Deneme aşamasında yazı
   tarayıcıda değiştiriliyordu (zıplama yapıyordu); o yöntem kalktı.
   YENİ CÜMLE EKLERKEN: cümlenin basıldığı yer <Tel> ile sarılı olmalı.
   Bir cümlenin başı değişirse buradaki anahtar da değişmeli.

   Dokunulmayanlar: SSS cevapları (isteyen açıp okuyor), misyon ve vizyon
   (firmanın kendi cümlesi), rakam ve şart taşıyan cümlelerin rakamı. */

export const MOBIL_KISA: [bas: string, kisa: string][] = [
  /* ---- ana sayfa */
  ["Dubai, İngiltere ve KKTC'de kendi ofislerimizle çalışıyoruz", "Üç ülkede kendi ofisimiz var. Size uygun olanı seçin."],
  ["Muhasebe ve vergiden şirket kuruluşuna, bankadan uyuma", "Altı alan, tek ekip. Kapsam ülkeye göre değiştiği için ülkeyi siz seçiyorsunuz."],
  ["Kurum ve süre ülkeye göre değişiyor, çalışma biçimimiz", "Evrakı bir kez veriyorsunuz, gerisini biz yürütüyoruz."],
  ["1996'dan beri muhasebe, vergi, şirket kuruluşu ve kurumsal", "1996'dan beri muhasebe, vergi ve şirket kuruluşu aynı çatı altında."],
  ["Eksik kurulmuş şirketleri devralıp", "Eksik kurulmuş şirketi devralıp açıklarını kapatıyoruz."],
  ["Mevcut kaydınızı, beyanlarınızı ve banka hareketlerinizi", "Kayıtlarınızı inceleyip geçiş planı çıkarıyoruz; eksik varsa önce tamamlıyoruz."],

  /* ---- Dubai */
  ["Dubai, vergi avantajı ile banka ve vize erişimini", "Vergi avantajı, banka ve vize erişimi tek yapıda. Bir kez Dubai'ye gelmeniz gerekiyor."],
  ["Fiyat, vize kotası ve kime satabileceğiniz bu seçime", "Fiyat, vize kotası ve kime satacağınız bu seçime bağlı."],
  ["Üçünün de sözleşmeli iş ortağıyız", "Üçünün de iş ortağıyız; hangisi uygun, birlikte karar veriyoruz."],
  ["Her maddenin altında nasıl işlediğini gösteren", "Her maddenin kendi çizimi var."],
  ["Süreci uzaktan bir aracıya devretmiyoruz", "Evrak, otorite ve banka trafiği aynı ekipten geçiyor; muhatabınız değişmiyor."],
  ["Vize ve Emirates ID için Dubai'de bulunmanız gerekiyor", "VIP'te randevular önceden kurulur, Dubai'de kalış süreniz kısalır."],
  ["Serbest bölgeyi ve eklemek istediklerinizi seçin", "Serbest bölgeyi ve ekleri seçin; tutar altta oluşur."],
  ["Her adımda sorumluluğun kimde olduğu yazıyor", "Her adımda sorumluluğun kimde olduğu yazıyor."],
  ["Kuruluş yalnızca ilk adım: sonrasında muhasebe", "Kuruluştan sonra muhasebe, vergi ve lisans yükümlülükleri tekrar ediyor. Hepsi rakamıyla baştan yazılı."],
  ["Tutarlar USD ve aksi belirtilmedikçe KDV hariç", "Tutarlar USD ve KDV hariç. Süreler mevzuat takvimidir; kesin süre taahhüdü vermiyoruz."],
  ["Koşullu ve talebe bağlı kalemler bu toplamın dışında", "Koşullu kalemler bu toplamın dışında; yalnız şartlar oluşursa doğuyorlar."],
  ["Yeni kurulmuş, standart faaliyet gösteren bir şirket için örnek", "Yeni kurulmuş standart bir şirket için örnek hesap; sizin rakamınız değişebilir."],
  ["Bu kalemler yalnızca şartlar oluştuğunda ya da talep", "Bu kalemler yalnız şart oluşunca ya da siz isteyince doğuyor; gerekenleri teklifte ayrı satır yazıyoruz."],
  ["Faaliyet koduna ve seçtiğiniz otoriteye göre ek belge", "Faaliyet koduna ve otoriteye göre ek belge istenebiliyor."],

  /* avantaj kartları (ikinci tur · "açıklamalar uzun, yazılardan kısalt") */
  ["Vergi net kâr üzerinden. Kişisel gelir vergisi yok", "Vergi net kâr üzerinden; kişisel gelir vergisi yok."],
  ["Başvuru dosyasını bankanın istediği formatta biz hazırlıyoruz", "Dosyayı biz hazırlıyoruz, kararı banka veriyor."],
  ["Stripe, PayPal, Binance, Amazon Payment Services ve Network International ile", "Kartla, platformdan ve kriptoyla tahsilat kurulabiliyor."],

  /* ---- KKTC */
  ["KKTC Serbest Liman şirketi, KKTC dışındaki ve Serbest Liman", "KKTC dışına ve Serbest Liman içine yaptığınız işte kurumlar ve gelir vergisi yok. İmza ve banka için bir kez KKTC'ye geliyorsunuz."],
  ["KKTC dışındaki ve Serbest Liman içindeki şirketlere yapılan işte kurumlar ve gelir vergisi yok, KDV", "KKTC dışına yapılan işte vergi ve KDV yok; KKTC içine satışta normal vergi."],
  ["İmza ve banka hesabı için bir kez KKTC'ye geliyorsunuz; başvuru", "Bir kez geliyorsunuz; başvuru, onay ve tescil bizde."],
  ["Hukuk ve ticari pratik Türkiye'ye yakın", "Hukuk ve ticari pratik tanıdık; para transferi serbest."],
  ["Serbest Liman başvurusu, onay ve tescil trafiği", "Başvuru, onay ve tescil KKTC'deki kendi ofisimizden yürüyor."],
  ["Kâr şirkette kalıp şirketin işine harcandıkça", "Kâr şirkette kaldıkça vergi doğmuyor; size kişisel gelir olarak geçtiğinde çıkıyor."],
  ["Uluslararası ödeme kuruluşları KKTC şirketiyle çalışmıyor. Kartla", "Uluslararası ödeme kuruluşları çalışmıyor; kartla tahsilat yerel sanal POS'la."],
  ["Kuruluş ve ilk yılın kalemleri açık yazılı", "Kuruluş ve ilk yılın kalemleri açık yazılı."],
  ["Sermaye şirketinizin parası; kimseye ödenmiyor", "Sermaye sizin paranız: tescile kadar bloke, sonra şirket hesabında serbest."],
  ["Adres, muhasebe ofisiyle yapılan sözleşmeyle de", "Adres muhasebe ofisiyle sözleşmeyle karşılanabiliyor; temsilciyi Serbest Liman atıyor."],

  /* ---- İngiltere */
  ["İngiltere'nin asıl gücü bu. Kartla tahsilat", "İngiltere'nin asıl gücü bu: global ödeme altyapısının hepsi açılıyor."],
  ["İngiltere'de takvim sıkı ve cezalar otomatik", "Takvim sıkı, cezalar otomatik. Dört dosyayı da biz takip ediyoruz."],
  ["İngiltere için paket ve ek hizmetleri seçin", "Paketi ve ekleri seçin; tutar altta oluşur."],

  ["Stripe, PayPal, Amazon ve Etsy İngiltere şirketiyle çalışıyor. Stripe için", "Stripe, PayPal, Amazon ve Etsy İngiltere şirketiyle çalışıyor."],
  ["Direktörün İngiltere'de yaşaması gerekmiyor. Kimlik doğrulama", "İngiltere'de yaşamanız gerekmiyor; her adım uzaktan."],
  ["Kimlik doğrulama tamamlandıktan sonra Companies House başvuruyu", "Kimlik doğrulamadan sonra tescil genellikle bir günde."],
  ["İngiliz Ltd'si müşteri, tedarikçi ve platformlarda tanıdık", "İngiliz Ltd'si müşteri ve platformlarda tanıdık bir yapı."],

  /* ---- hizmet sayfaları */
  ["Kurumsal hesap ve tahsilat kanalları şirket kuruluşunun içinde", "Dosyayı bankanın istediği formatta biz hazırlıyoruz; hesap kararını banka veriyor."],
  ["Bankacılık lisansı olan kurumda açılan, şirketin ana hesabı", "Şirketin ana hesabı. Hangi bankanın uygun olduğunu başvurudan önce birlikte belirliyoruz."],
  ["Banka değil; farklı lisans ve koruma rejimi", "Banka değil: tahsilatı toplayıp banka hesabınıza aktarıyor. Hangisi gerekli, satış biçiminize bağlı."],
  ["Ortak, çalışan ve aile vizesi: başvuruların ve randevuların", "Ortak, çalışan ve aile vizesi: başvuru ve randevuları biz yürütüyoruz. Bir kez BAE'ye gelmeniz yeterli."],
  ["Dubai şirketiniz üç tür oturumun kapısını açıyor", "Şirketiniz üç tür oturumun kapısını açıyor; üçünün de başvurusunu biz yürütüyoruz."],
  ["Bir şirketin kaç kişiye vize alabileceği sınırsız değil", "Vize sayısı sınırsız değil; kotayı kuruluşta seçilen paket belirliyor."],
  ["Şirketin ortağı olarak aldığınız oturum", "Ortak olarak aldığınız oturum; Dubai'de yaşamak ve resmî işlemler için temel belge."],
  ["Şirketinizin istihdam ettiği kişiler için", "Çalışanlarınız için. Her vize şirketin kotasından düşüyor."],
  ["Oturumunuz çıktıktan sonra eşiniz ve çocuklarınızın", "Eşiniz ve çocuklarınız için; oturumları sizinkinden uzun olamıyor."],

  /* ---- hakkımızda ve iletişim */
  ["Şirket kurmak tek bir işlem değil: tescil, banka hesabı", "Şirket kurmak tek işlem değil, uzayan bir sıra: tescil, banka, defter, beyan, uyum. Ortac Global bu sıranın tamamını üstleniyor."],
  ["Kuruluştan oturum ve vizeye kadar zincirin her halkası", "Kuruluştan vizeye zincirin her halkası aynı ekipte; dosya el değiştirmiyor."],
  ["KKTC, İngiltere ve Dubai: üçünü de kendimiz yürütüyoruz", "Üç ülkeyi de kendimiz yürütüyoruz; iş bir aracıya devredilmiyor."],
  ["Dubai serbest bölge başvurusu bir aracı üzerinden değil", "Dubai serbest bölge başvurusu aracısız, doğrudan yürüyor."],
  ["Kuruluş dosyasından aylık deftere kadar işin içine giren", "Kuruluştan aylık deftere, işin içine giren kurumlar."],
  ["Dubai, İngiltere ve KKTC ofislerimizin telefonu", "Üç ofisimizin telefonu, WhatsApp hattı ve e-postası aşağıda."],
  ["Seçtiğiniz ofis haritanın çerçevesini", "Ofisi seçin; harita, adres ve kanallar ona göre değişsin."],
];

/** telefon sürümü aranacak yazı kutuları (yalnız çocuk öğesi olmayanlar) */

