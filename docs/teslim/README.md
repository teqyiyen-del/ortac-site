# Teslim öncesi denetim · 09.10.2026 gecesi

Burak'ın isteği: siteyi teslime hazır hâle getirene kadar incele, tara, düzelt;
sonunda listeleri ver. Bu dosya özet ve yapılacaklar. Ayrıntı yanındaki yedi raporda.

Raporlar denetim başlarkenki hâli anlatıyor. Aşağıda "bu gece düzeltildi" yazan
maddeler raporlarda hâlâ "bozuk" diye geçer; geçerli olan bu dosyadır.

---

## 1. Bu gece düzeltilenler

**Telefon**
- Yeni telefon düzeni artık herkese açık (adres sonuna bir şey eklemek gerekmiyor).
  Eski düzene bakmak için adresin sonuna `?mobil=eski` yazılır. Tek satırla geri alınır
  (`src/app/layout.tsx` içindeki `data-mobil`).
- Kısa cümleler artık sayfa açılırken hazır geliyor; önce uzun cümlenin görünüp sonra
  kısalması (sayfanın zıplaması) kalktı.
- Kıyas tablosu (`/ulkeler` ve ana sayfa): telefonda yana kaydırma yerine üç ülke sekmesi.
- `/basla` adım şeridi telefonda kesik çıkıyordu, düzeldi.
- Dokunma alanları büyütüldü, 12 pikselin altında yazı kalmadı, iş ortaklığı formunda
  iPhone'un yakınlaştırması giderildi.
- 320, 360, 390 ve 430 genişlikte 54 sayfanın hepsi ölçüldü: yana taşma, kırık görsel,
  hata yok.

**Çalışmayan şeyler**
- Dört form da kapalıydı ("Form henüz bir yere bağlı değil" yazıyordu). Hepsi açıldı:
  iletişim, kariyer, iş ortaklığı, reklam sayfası. Bölüm 2'deki anahtar eklenince ileti
  doğrudan e-posta olarak gelir; anahtar yokken ziyaretçinin e-posta uygulamasında
  ilgili ofise adreslenmiş, alanları dolu bir ileti açılır.
- `/basla` sonunda "bir kopyası gönderildi" yazıyordu ama hiçbir şey gitmiyordu. Artık
  özet gerçekten gönderiliyor; gönderilemezse ekran bunu söylüyor ve özeti WhatsApp ya
  da e-postayla iletecek iki düğme veriyor. "demo" etiketleri ve "SWAP" yazısı kalktı.
- `/basla` içindeki WhatsApp düğmesi boştu; ilgili ofisin WhatsApp hattına bağlandı.
- İngiltere'den "başlat"a basan kişi kilitli bir karta düşüyordu. İngiltere kartı ve
  İngiltere fiyat panelinin düğmesi artık iletişime gidiyor.
- "Sorularınız mı var?" türü 62 düğme şirket kuruluş penceresini açıyordu; iletişime
  gidiyorlar. Muhasebe sayfasındaki "Bu listeyle teklif isteyin" de öyle.
- "Panel girişi" soluk ve tıklanmıyordu. Eski sitedeki müşteri paneli adresine bağlandı.
- Ana sayfadaki "Mevcut şirketinizi taşıyın" düğmesi ve döngüdeki "Uyum" satırı ölüydü;
  ikisi de çalışıyor.
- Ülke sayfasında "Kuruluş hizmeti: kapsam ve tutar" bağlantısı sayfanın başına
  atıyordu; fiyat bölümüne iniyor.
- 1024 genişlikte üst menüdeki düğme ekranın dışına taşıyordu; düzeldi.

**Yanlış bilgi**
- Reklam sayfası (`/lp/dubai-sirket-kurulusu`) eski üç paketi gösteriyordu
  (3.900 / 5.400 / 8.200 $). Dubai sayfasındaki panelle değişti.
- "Dubai üç ülkenin en pahalısı" dört yerde yazıyordu. Murat Bey'e göre en pahalısı
  KKTC; cümleler düzeltildi.
- "Yalnız IFZA iş ortağı" yazan yerler "IFZA, Meydan ve DWTC" oldu (teklif belgesi).
- KKTC ofis adresinin sonundaki "039" silindi, "Kumsal" yazıldı (teklif belgesi).
- KKTC fiyat başlığı "adres hizmetini siz seçiyorsunuz" diyordu; yalnız muhasebe türü
  seçiliyor.
- Kaynaklar sayfasında KKTC için "9.920 €'dan başlıyor" yazıyordu; tutar sabit.
- Dubai panelinin altındaki "Tutarlar temsilidir" kalktı (tutarlar belgeden).
- Hakkımızda künyesinde kuruluş yılı boştu: 1996.
- Menüde Dubai bankaları iki taneydi: dört banka.

**Dil**
- Yüz kadar düzeltme, 40 dosya. Örnekler: "ceza yemiyorsunuz" → "ceza almıyorsunuz",
  "hem bizi hem sizi yakar" → "zor durumda bırakır", "Sürpriz kalem çıkmaz" →
  "Beklenmedik kalem çıkmaz", "Tek ziyaret, gerisi bizde" → "Tek ziyaret yeterli".
  Tam liste: `dil-ve-notlar.md`.

**Arama motoru**
- Geçici adres (vercel.app) arama motoruna kapatıldı. Alan adı bağlanınca kendiliğinden açılır.
- 14 sayfada eksik olan kanonik adres eklendi; `/ulke/...` kopya adresleri asıl adrese
  yönleniyor.
- Yalnız örnek içerik taşıyan sayfalar (gelişmeler, e-kitaplar, kariyer, boş blog
  kategorileri) ve kapalı hizmet sayfaları dizin dışı ve haritadan çıktı.
- Sekme simgesi Vercel'in üçgeniydi; Ortac'ın artısı yapıldı. Paylaşım görseli eklendi
  (bağlantı WhatsApp'ta ya da LinkedIn'de paylaşılınca çıkan kart).
- Soluk, tıklanmayan footer bağlantıları (Sponsor Licence, Şirket Adresi, Serbest Bölge)
  gizlendi; sayfaları açılınca kendiliğinden görünür.

---

## 2. Yayına almadan önce yapılacaklar

Sıra önem sırası.

1. **Form anahtarı.** Vercel'de iki ortam değişkeni: `RESEND_API_KEY` ve `FORM_ALICI`
   (iletilerin düşeceği adres). İstenirse `FORM_WEBHOOK_URL` ile başka bir sisteme de
   aktarılabilir. Anahtar yokken formlar e-posta uygulaması açarak çalışır; teslim için
   yeter, yayın için anahtar şart.
2. **Murat Bey'in cevapları** (bölüm 4). Özellikle İngiltere fiyatları: sitedeki 900,
   1.500 ve 2.600 dolarlık paketlerin kaynağı yok.
3. **Örnek içerik kararı** (bölüm 3). Blogdaki 14 yazı, 22 gelişme, 10 e-kitap ve 4
   kariyer ilanı "Örnek" etiketli. Ya gerçeği yazılacak ya da sayfalar menüden çıkacak.
4. **KVKK metni.** Sayfa taslak ve dizin dışı; footer'da bağlantısı yok. Veri sorumlusu
   unvanı ve adresi gelince hukukçuya okutulmalı. Formlar açıldığı için artık gerekli.
5. **Ölçüm kodları.** Eski sitedeki kimlikler bulundu: Google Tag Manager
   `GTM-MJVNCM78` (içinde Analytics ve Ads), Meta Pixel `1139306508051124`. Yeni sitede
   hiçbiri yüklü değil. Çerez izni kararıyla birlikte eklenmeli. Google Ads dönüşümü
   eski sitedeki `/tesekkurler` adresine bağlı; yeni sitede bu sayfa yok.
6. **Eski adreslerin yönlendirmesi.** Eski sitede 148 adres var; yenide birebir duran
   9 tane. Liste `eski-site-tasima.md` içinde. Yapılmazsa Google'daki sıralar ve
   reklamların indiği adresler kırılır.
7. **41 blog yazısı.** Eski sitede duruyor, yenide yok. Taşınacaksa içlerindeki eski
   iddialar ("vergisiz", "%0", Wise) elden geçmeli. Görseller eski sistemde; site
   kapanmadan indirilmeli.
8. **Alan adı.** DNS'te yalnız ana kayıt ve `www` değişecek. E-posta kayıtlarına,
   Google doğrulama kayıtlarına ve `pdf.ortacglobal.com`'a dokunulmayacak.
9. **Companies House anahtarı.** İngiltere isim sorgulama aracı anahtar bekliyor
   (`COMPANIES_HOUSE_API_KEY`); şimdilik "henüz etkin değil" diyor.
10. **Gerçek telefonda deneme.** Ben yalnız Chrome ile ölçtüm. iPhone'da Safari ve bir
    Android'de şu üçüne bakılmalı: menü açıkken arka planın kaymaması, fiyat formunda
    alttaki tutar şeridi, formlarda gönder'e basınca açılan e-posta.
11. **İç sayfalar.** `/lab` (yirmi kadar deneme sayfası) ve `/teyit` herkese açık ama
    dizin dışı. Alan adına geçerken kapatılıp kapatılmayacağı kararlaştırılmalı.
12. **Sekme simgesi.** Logodaki mavi artıdan ürettim. Firmanın kendi simgesi varsa
    değiştirilmeli (`src/app/icon.png`, `apple-icon.png`, `favicon.ico`).

---

## 3. Henüz etkin olmayanlar (yer tutucular)

**Örnek içerik**
- Blog: 15 yazının 14'ü örnek. Gerçek olan tek yazı "Dubai'de şirket kurmanın maliyet
  kalemleri".
- Gelişmeler: 22 kaydın 22'si örnek.
- E-kitaplar: 10 kitap, hiçbirinin dosyası yok, düğmeler "Hazırlanıyor".
- Kariyer: 4 ilan örnek. Eski sitede 1 gerçek ilan var (Muhasebeci, KKTC).
- Ana sayfadaki yazı bölümü bu kayıtlardan besleniyor.

**Sayfası olmayan menü girdileri**
- Sponsor Licence, Şirket Adresi (İngiltere), Serbest Bölge (KKTC), şirket taşıma,
  oturum sayacı.
- İngiltere ve KKTC için kurumsal danışmanlık ile AML sayfaları: adresleri açılıyor
  ama içerik genel şablon; dizin dışı.
- Üst menüdeki "EN" dil düğmesi. Eski sitenin İngilizcesi vardı (74 sayfa), yenide yok.

**Rakamı kesinleşmeyenler**
- İngiltere'nin üç paketi ve başlangıç fiyatı.
- Dubai'de 2. ve 3. yıl lisans bedelleri.
- Uygunluk testi eski rakamlarla hesaplıyor (Dubai 6.000, İngiltere 1.900, KKTC 3.300
  dolar ilk yıl). İngiltere fiyatı gelince üçü birlikte güncellenecek. O zamana kadar
  testin maliyet cümleleri yanıltıcı; istenirse menüden çıkarılabilir.
- Kurumlar vergisi araçlarında "Oran ve eşik mali müşavir onayından henüz geçmedi" yazıyor.

**Boş kalan alanlar**
- İş ortaklığı sayfasında dört ticari şart boş çizgi.
- Hakkımızda'da lisans numarası.
- Basında biz: basın e-postası ve alıntı.
- KKTC ofisinin şehri; KKTC ve İngiltere şirketlerinin tescilli adı.
- Sosyal medya bağlantıları hiç yok (eski sitede beş hesap var).

**Anahtar bekleyenler**
- Form gönderimi, ölçüm kodları, Companies House, kendi ziyaret sayacımız (kapalı).

**Görseller**
- 47 fotoğrafın hepsi stok (Unsplash); ekip fotoğrafı da stok.

---

## 4. Murat Bey'den yayından önce şart olanlar

Kopyalanıp gönderilebilir.

**Fiyat**
1. Dubai'de 2. ve 3. yıl lisans bedeli, IFZA, Meydan ve DWTC için ayrı ayrı nedir?
2. Teklifte IFZA "7.800 $ vergi dahil" yazıyor; kalemleri toplayınca 7.873 + %5 = 8.266,65 çıkıyor. Müşteri hangisini ödüyor?
3. İngiltere teklif belgesi ne zaman gelir? Sitedeki 900 / 1.500 / 2.600 dolar kalsın mı; dolar mı sterlin mi?
4. KKTC'de başvuru harcı (2.000 USD) ve tescil harcı (2.500 USD) 9.920 €'nun içinde mi?
5. KKTC'de adres hizmeti herkese zorunlu mu? (Belgede "tercih" yazıyor.)
6. KKTC'de denetçi raporu aylık 270 € / yıllık 900 € ücretine dahil mi?

**Çalışması gerekenler**
7. Formlardan gelen iletiler hangi e-posta adresine düşsün?
8. Müşteri paneli adresi eski sitedekiyle aynı mı kalacak?
9. Üç ofisin numarası da WhatsApp'ta açık mı? Kurulum akışından gelenler hangisine yazsın?
10. Kurulum özeti kaç gün geçerli sayılacak?
11. Site ortacglobal.com'a hangi gün taşınacak; alan adını kim yönetiyor?

**İletişim**
12. KKTC adresi "Şht. Murat İlhan Sokak No:5, Kumsal, Lefkoşa" mı? E-posta cyprus@ mı info@ mı? +90 548 841 66 66 güncel mi (eski sitede bir yerde 844 yazıyor)?
13. İngiltere: uk@ortacaudit.com doğru mu? Telefon +44 mü +90 mı? Great Portland Street gerçek ofis mi, kayıtlı adres mi?

**Yasal**
14. KVKK için veri sorumlusunun unvanı, adresi ve başvuru e-postası nedir? Türkiye'de şirket var mı? Metni bir hukukçu okudu mu?
15. KKTC ve İngiltere şirketlerinin tescilli tam adı nedir?
16. Yazılı iş ortaklığı kimlerle var: IFZA, Meydan, DWTC, Wio, Mashreq, PayPal, wamo, Xero, QuickBooks, Sage?

**Doğru bilgi**
17. Dubai'de Payoneer ve wamo listede kalsın mı?
18. İngiltere'de fiilen hangi hesaplar açılıyor (Tide, Revolut, Payoneer, Wise)?
19. Dubai oturumu kaç ay ülke dışında kalınca düşüyor?
20. Ortak vizesi kaç yıllık?
21. "Serbest bölgeden mainland'e geçmek yeni kuruluş demek" doğru mu?
22. Dubai'de bordro hizmeti veriyor muyuz?
23. KKTC ve İngiltere'de muhasebeyi kendi ekibimiz mi yapıyor?

Sonra da alınabilecekler ve dayanakları: `bilgi-ve-murat.md`.
Daha önce hazırlanan şıklı soru sayfası: `/teyit/sorular` (27 soru, bir kısmı bunlarla ortak).

---

## 5. Eski siteden taşınacaklar

Tam liste ve adres adres yönlendirme tablosu: `eski-site-tasima.md`.

- Çalışan başvuru yolları: iletişim formu (yenide açıldı), fiyat teklifi formu,
  Calendly ile 15 dakikalık görüşme, bülten kaydı. Son üçü yenide yok.
- Ölçüm kodları ve Google Ads dönüşüm sayfası (`/tesekkurler`).
- 41 blog yazısı ve görselleri.
- Beş sosyal medya hesabı ve `career@ortacglobal.com`.
- Müşteri paneli bağlantısı (bu gece bağlandı).
- İngilizce sürüm (74 sayfa): taşınacak mı, kapatılacak mı karar gerekiyor.
- 4 PDF (üçü 2025 fiyat dosyası) ayrı adreste açık kalıyor; yeni fiyatlarla çelişebilir.
- Daha eski WordPress adreslerinin yönlendirme listesi yalnız Framer panelinde; site
  kapanmadan dışa alınmalı.

Eski siteyle çelişenler (yenisi doğru kabul edildi, teyit iyi olur): deneyim yılı
(eskide "17 yıllık" ve "27 yıllık", yenide 1996'dan beri), "1.200+ mutlu müşteri"
(yenide yok, doğrulanmadan taşınmamalı), Dubai ve KKTC kuruluş süreleri.

---

## 6. Senin kararını bekleyenler

Dokunmadım, çünkü tasarım ya da içerik kararı.

- **Sayfadaki açık notlar.** "Tutarlar temsilîdir", "Adımlara süre yazmıyoruz…",
  "Kaynak: …", muhasebe alt sayfalarındaki kanun maddeleri, KKTC kartındaki yıldızlı
  not, iş ortaklığındaki "henüz kararlaşmamış" cümleleri. Liste ve önerim:
  `dil-ve-notlar.md` · "Sayfadaki açık notlar".
- **Tam siyah bölümler.** Dubai muhasebe, hakkımızda, sektör ve iş ortaklığı
  sayfalarında hâlâ var; kuralımız siyahın yalnız kartta olması. Ayrı bir renk turu ister.
- **Sektör sayfasındaki kıyas tablosu** telefonda hâlâ yana kayıyor (ülke kıyas
  tablosu düzeldi, bu ayrı bir bileşen).
- **`/basla` telefonda** alttaki üç satır (Geri, WhatsApp, Devam) içeriğe az yer bırakıyor.
- **Düğme dili.** "İletişime Geç" ile "İletişime geçin", "Tüm hizmetleri gör" gibi
  sen/siz karışıklığı duruyor; senin yazdırdıkların olduğu için dokunulmadı.
- **Masaüstünde** hakkımızda kapanışı, basında biz kartları, 1920'de içerik genişliği:
  `gorsel-masaustu.md` · B maddeleri.

---

## Raporlar

- `islev-akis-yer-tutucu.md` · çalışan, çalışmayan, akış, yer tutucuların tam dökümü
- `bilgi-ve-murat.md` · çelişkiler, tutarsızlıklar, kaynaksız iddialar, Murat Bey listesi
- `dil-ve-notlar.md` · uygulanan dil düzeltmeleri, sayfadaki açık notlar
- `seo.md` · arama motoru denetimi
- `eski-site-tasima.md` · eski sitenin envanteri ve yönlendirme haritası
- `gorsel-telefon.md` · telefonda bölüm bölüm görsel düzen
- `gorsel-masaustu.md` · masaüstü ve tablette bölüm bölüm görsel düzen
