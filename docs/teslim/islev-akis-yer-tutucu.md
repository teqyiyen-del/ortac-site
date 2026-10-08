# İşlev, akış ve yer tutucu denetimi

Tarih: 08.10.2026 gece. Bakılan yer: canlı geçici adres (ortac-global-site.vercel.app), commit `2e0d2b7`.
Kod değiştirilmedi, hiçbir form gönderilmedi.

Not: denetim sürerken çalışma ağacında başka düzenlemeler yapılıyordu (FitTest, CountryPricing, NavIstemci, ContactSections, layout ve başkaları). Aşağıdaki satır numaraları o anki çalışma ağacına göre ve yaklaşık. Davranış bulguları canlı siteye ait.

## Nasıl bakıldı

- 95 adres tek tek çekildi: site haritasındaki 54 adres, sayfalardan toplanan bütün iç bağlantılar ve elle denenen eski/kapalı adresler.
- `scripts/sayfa-denetim.mjs` canlıya karşı iki genişlikte çalıştı (1440 ve 390): 64 sayfa + 3 `/basla` sorgulu adres.
- Tarayıcıda gerçek tıklamayla: üst menü, telefon menüsü, `/basla` (üç ülke), üç fiyat paneli, uygunluk testi (iki adres), sekiz araç, SSS, iletişim sayfası.
- Duman testi: 63 sayfada gövdedeki 429 düğmenin her birine bir kez basıldı (1440 ve 390).
- İngiltere isim sorgusu bir kez denendi (kendi sunucu rotamız; firmaya ileti gitmiyor).

## Bozuk olanlar

### 1. `/basla` sonunda hiçbir şey olmuyor, ekran ise "gönderildi" diyor
- Ne: sitenin ana çağrısı (Kurulumu Başlat). Dört adım yürüyor, son düğme "Süreci başlatalım". Basınca ad, soyad, e-posta hiçbir yere gitmiyor (ağda tek istek yok). Ekranda "Bir kopyası … adresine gönderildi. Devamı müşteri panelinde." yazıyor, bu doğru değil.
- Aynı ekranda: "Müşteri paneline geç" düğmesinin üstünde "demo" rozeti var ve düğme hiçbir şey yapmıyor. Altında "Demo: hiçbir bilgi bir yere gönderilmedi, panel bağlantısı henüz bağlı değil." satırı ziyaretçiye görünüyor.
- Özet belgesinde "Geçerlilik: SWAP · teyit edilecek" yazısı ziyaretçiye görünüyor.
- Her adımdaki "Takıldınız mı? WhatsApp'tan yazın" düğmesi boş (numara bağlı değil).
- Yeniden üretme: herhangi bir sayfada sağ üstte Kurulumu Başlat → Dubai → Devam → Devam → ad, soyad, e-posta yaz → Devam → Süreci başlatalım.
- Yer: `src/components/lab/SatisAkisi.tsx:300-305` (son düğme yalnız ekran değiştiriyor), `:547` (SWAP yazısı), `:903-912` (WhatsApp düğmesi), `:931-966` (bitiş ekranı: `:941` cümle, `:959-963` demo düğme, `:965` demo satırı).
- Not: `docs/tuzaklar.md` kural 10 "formlar sahte başarı vermez" diyor; bu ekran o kurala da uymuyor.

### 2. İngiltere için başlatılamıyor
- Ne: `/ingiltere` sayfasındaki altı düğmenin hepsi (Hemen Başla, Bu kurulumla başlayın, Kurulumu başlat, Görüşme planlayın, Sorularınız mı var?, alttaki Kurulumu Başlat) kurulum penceresini açıyor. Pencere birinci adımdan açılıyor ve İngiltere seçilemiyor: "Yakında bu akışta". Fiyat panelinde seçilen paket de taşınmıyor.
- Aynı sorun uygunluk testinde: sonuç İngiltere çıkınca düğme "İngiltere ile konuşalım" → aynı pencere, İngiltere kapalı.
- Yeniden üretme: `/ingiltere` → fiyat bölümü → Platinium seç → Bu kurulumla başlayın.
- Yer: `src/components/lab/SatisAkisi.tsx:155` (`OZET_ACIK` yalnız Dubai ve KKTC), `:389-405`; `src/components/CountryPricing.tsx:238` (bağlantı `?ulke=ingiltere&paket=…`); `src/lib/baslaSecim.ts:16-28` (İngiltere ve `paket` okunmuyor); `src/components/FitTest.tsx:970-980`.

### 3. Sitede çalışan form yok (dördü de bilerek kapalı)
- `/iletisim`: Gönder düğmesi devre dışı, altında "Form henüz bir yere bağlı değil…" yazıyor. `src/app/iletisim/ContactSections.tsx:845` (onSubmit boş), `:1157` (disabled), `:1196` (not).
- `/kariyer`: başvuru formu ve dosya yükleme kapalı. `src/app/kariyer/CareerSections.tsx:261`, `:490`, `:503`.
- `/is-ortakligi`: bütün alanlar `fieldset disabled`. `src/app/is-ortakligi/page.tsx:476`.
- `/lp/dubai-sirket-kurulusu` (reklam iniş sayfası): "Teklif isteyin" kapalı. `src/components/LandingLeadForm.tsx:48`, `:102`.
- Sonuç: 1. maddeyle birlikte, sitede ziyaretçinin bilgisini firmaya ulaştıran tek bir yol yok. Çalışan tek çıkış `/iletisim` altındaki telefon, WhatsApp ve e-posta bağlantıları.
- Yeniden üretme: sayfayı aç, formu doldur, düğmeye basılamıyor.

### 4. Muhasebe "Bu listeyle teklif isteyin" şirket kuruluş penceresi açıyor, liste kayboluyor
- Ne: `/dubai/muhasebe` içindeki dört soruluk ihtiyaç bulucu bitince çıkan düğme `/basla?hizmet=muhasebe&bolge=…&durum=…&ciro=…&kdv=…` adresine gidiyor. Pencere bu bilgiyi okumuyor; ikinci adımdan "Kurulumunuzu seçin · IFZA · $5.120" ile açılıyor. Muhasebe teklifi isteyen kişiye şirket kuruluşu soruluyor.
- Aynı sayfada "Devir için durumumu sorayım" (`?hizmet=muhasebe&durum=degistir`) da aynı pencereyi açıyor.
- Yeniden üretme: `/dubai/muhasebe#ihtiyac` → dört soruyu cevapla → Bu listeyle teklif isteyin.
- Yer: `src/components/services/AccountingNeeds.tsx:304`, `src/lib/accountingDubai.ts:1422`, `src/lib/baslaSecim.ts:16-28`.

### 5. "Soru" ve "görüşme" yazan 62 düğme şirket kuruluş penceresi açıyor
- Ne: 41 sayfada 62 yerleşim. Etiketler: Görüşme planlayın (31), Sorularınız mı var? (12), Durumumu sorayım (8), ayrıca Sorularınızı sorun, Hangisi bana uyar?, Benim durumumda hangisi?, Bize ulaşın, Ortaklık şartlarını sorun, Durumumu anlatayım, Ortaklık için bize yazın, Kendi durumumu sorayım, Hangi kalemler bende doğuyor?, Süreci kendi dosyanız için konuşalım.
- Hepsi `/basla`'ya gidiyor. `/basla` 06-07.10'dan beri soru sayfası değil, "Şirketinizi hangi ülkede kuruyorsunuz?" diye başlayan kurulum penceresi. Dubai ve KKTC sayfalarında ikinci adımdan (fiyat seçimi) açılıyor.
- En çarpıcı örnekler: `/is-ortakligi` (ortak adayı kuruluş penceresine düşüyor, üç düğme), `/hakkimizda` "Bize ulaşın", blog yazısı "Durumumu sorayım", araç sayfaları "Sorularınız mı var?".
- Yeniden üretme: `/is-ortakligi` → Ortaklık şartlarını sorun.
- Yer: `src/components/shared/AskCta.tsx:19` (varsayılan hedef `/basla`), `src/components/shared/SssAkordeon.tsx:155` (SSS altındaki düğme), kullanan yerler `grep -rn "AskCta" src`.

### 6. Ana sayfada birincil düğme tıklanmıyor: "Şirketimi taşı"
- Ne: "Hizmet verdiğimiz sektörler" bölümünün altındaki "Mevcut şirketinizi Ortac'a taşıyın" kartında mavi düğme sönük. Hedefi `/sirket-tasima`, böyle bir sayfa yok (404).
- Yer: `src/components/home/Profiles.tsx:102`.

### 7. Ana sayfa döngüsünde "Uyum" satırı sönük, oysa sayfası var
- Ne: "Bir şirketin bütün döngüsü" bölümünde Uyum satırı tıklanmıyor. Hedefi `/dubai/uyum` (23.09'da kaldırılan hizmet, 404). Karşılığı olan `/dubai/aml-uyum` canlı.
- Yer: `src/components/home/Chain.tsx:153`.

### 8. Ülke sayfasında kendine dönen bağlantı
- Ne: `/dubai`, `/ingiltere`, `/kktc` süreç bölümünün altındaki "Kuruluş hizmeti: kapsam, hariç kalemler ve tutar" bağlantısı bulunduğu sayfanın kendisine gidiyor; tıklayan sayfanın en başına atılıyor (Dubai'de 6.900 px yukarı).
- Yer: `src/components/CountryProcess.tsx:143-148`, `:211`.

### 9. İngiltere şirket ismi sorgulama sonuç vermiyor
- Ne: "Kayıtta ara" düğmesi `/api/araclar/isim-sorgu`'ya gidiyor, sunucu 503 `anahtar-yok` dönüyor. Ekranda "Sorgu henüz etkin değil" ve Companies House'un kendi sayfasına bağlantı çıkıyor. Hata değil, anahtar eksik; ama araç menüde ve footer'da "çalışan araç" gibi duruyor.
- Yer: `src/app/api/araclar/isim-sorgu/route.ts:149-150`. Vercel'e `COMPANIES_HOUSE_API_KEY` eklenince kod değişmeden çalışır.

## Çalışan ama dikkat isteyenler

Çalışanlar, kısa:
- Site haritasındaki 54 adresin hepsi 200. Sayfalardan toplanan iç bağlantıların hiçbiri 404'e gitmiyor. Sayfa içi ve sayfalar arası çapaların (#) hepsinin hedefi var.
- Yönlendirmeler tek adım: `/araclar/kurumlar-vergisi` → `/araclar/kurumlar-vergisi/dubai` (308), `/rehberler` ve `/blog/rehberler` → `/blog/kategori/ulke-rehberi` (308), `/{ulke}/sirket-kurulusu` → ülke sayfası (307), `/teyit/kktc` → `/teyit/sorular` (307).
- Sayfa denetimi iki genişlikte temiz: konsol hatası, kırık istek, yatay taşma, yinelenen id, hedefsiz çapa, yüklenmeyen görsel yok.
- Üst menünün dört paneli ve telefon menüsü açılıyor, Esc ile kapanıyor, bütün girdiler doğru sayfaya gidiyor.
- Dubai ve KKTC fiyat panelleri: seçim tutarı değiştiriyor, "Bu kurulumla başlayın" seçimi pencereye doğru taşıyor (Dubai: bölge, yıl, vize, VIP, yıllık muhasebe).
- Uygunluk testi 11 soruyla sonuna kadar gidiyor, sonuç ve "Raporu açın" çalışıyor.
- Araçlar hesap yapıyor: BAE KDV, kurumlar vergisi (Dubai, İngiltere), isim üreteci, SIC kodu, IFZA faaliyet kodu. Hatalı girdiye anlaşılır uyarı veriyor.
- Dış bağlantıların 24'ü de 200. Telefon, WhatsApp ve e-posta bağlantıları doğru biçimde.
- Duman testi: 429 düğme, iki genişlikte, hata yok.

Dikkat isteyenler:
- Ölçüm hiç yok. GTM betiği yok (`src/app/layout.tsx:69`, kimlik bekliyor), kendi izleyicimiz Vercel'de kapalı. Kodda 27 `gtm()` çağrısı var, hiçbiri bir yere yazmıyor. Yarın müşteri "kaç kişi tıkladı" diye sorarsa cevap yok.
- Site haritası, robots ve kanonik adresler `https://ortacglobal.com` yazıyor (`src/lib/routes.ts:25`, ayrıca 15 dosyada elle). O alan adında bugün eski site (Framer) duruyor. Geçici Vercel adresi aramaya açık (robots "Allow: /"), ülke ve hizmet sayfalarında kanonik etiketi yok.
- Kopya adresler açık: `/ulke/dubai`, `/ulke/ingiltere`, `/ulke/kktc` ve `/ulke/{ulke}/{hizmet}` 200 dönüyor, noindex ve kanonik yok. İçerik `/dubai` ile aynı.
- `/teyit` ve `/teyit/sorular` herkese açık (noindex). İçinde Murat Bey'e sorulan iç sorular var, örneğin "Sitede şu an yer tutucu rakam var". Teslimden sonra yayında kalmamalı ya da adresi yalnız ilgili kişiye verilmeli.
- `/lab` ve altındaki yaklaşık 20 adres açık (noindex). Site içinden bağlantı yok. `/lab/kapali` kapalı sayfaların arka kapısı.
- `/lp/dubai-sirket-kurulusu` eski üç paketli Dubai fiyatını gösteriyor (Basic 3.900, Gold 5.400, Platinium 8.200). Dubai sayfasındaki baz fiyat düzeniyle (5.120'den) çelişiyor. Site içinden bağlantı yok, noindex.
- `/kvkk` yalnız kurulum penceresinin üçüncü adımından bağlanıyor. Footer'da ve iletişim sayfasında bağlantısı yok.
- İletişim sayfası formla açılıyor, form kapalı. Çalışan kanallar sayfanın altında. "İletişime geçin" diyen her düğme ziyaretçiyi önce çalışmayan forma getiriyor.
- KKTC adresi "Şht. Murat İlhan Sokak No:5, 039" diye basılıyor, şehir boş (`src/lib/offices.ts:265-267`). KVKK metninde aynı adres "Kumsal, KKTC" diye geçiyor. "039" ne, belli değil.
- WhatsApp bağlantıları açılıyor ama numaraların WhatsApp'ta kayıtlı olduğu teyit edilmedi (offices.ts notu).
- İngiltere e-postası başka alan adında: `uk@ortacaudit.com`. Alan adının e-posta kaydı var; web sitesi açılmıyor.
- KVKK metnindeki başvuru adresi `info@ortacglobal.com`. Bu adres sitenin başka hiçbir yerinde kullanılmıyor (footer'dan bilerek çıkarılmıştı).
- İngiltere fiyat panelinde Gold paketi "Kuruluş + banka + vize" diyor; İngiltere'de vize hizmeti yok (`src/lib/pricing.ts:83`, dosyaya dokunma kuralı var, gösterimde düzeltilebilir).
- Dubai fiyat panelinin altında "Tutarlar temsilidir" yazıyor (`src/components/country/DubaiFiyat.tsx:340`); oysa rakamlar teklif belgesinden.
- IFZA için "En çok tercih edilen" rozeti ve cümlesi var (`src/components/country/DubaiEkler.tsx:56`, `src/lib/dubaiFiyat.ts:26`). `docs/tuzaklar.md` kural 3 bu etiketi teyitsiz kullanmayı yasaklıyor.
- KKTC kurulum özetinde seçilen muhasebe türü (aktif ya da pasif) görünmüyor; seçim pencereye taşınıyor ama belgeye yazılmıyor.
- Site haritasına giren tek blog yazısının (`/blog/dubaide-sirket-kurmanin-maliyet-kalemleri`) başında "Demo: bütün bağlantılar bu sayfaya iniyor" notu görünüyor.
- Blog dizininde "15 yazı · 14 tanesi örnek kayıt · bağlantılar şimdilik demo sayfasına iniyor" cümlesi ziyaretçiye görünüyor.
- Sayfa denetimi her sayfada iki "kesik metin" bulgusu basıyor: `.kcta-yildiz` (kapanış kartındaki yıldız katmanı, metni yok). Gürültü; betiğin eleme listesine eklenirse rapor "temiz" der (`scripts/sayfa-denetim.mjs`, GURULTU dizisi).
- `src/lib/routes.ts` içindeki bazı notlar bayat: "KKTC kurumlar vergisi adresi açık" diyor, adres 404 (bilerek kapatılmış, `KV_ULKELER`); iletişim notunda "İngiltere tüzel kişilik adı boş" diyor, dolu.
- Emin olunamayan tek şey: araç testleri sırasında bir kez `/araclar/isim-ureteci` açıkken sayfa `/basla`'ya geçti. Üç tekrar denemesinde olmadı, kodda buna yol açacak bir yönlendirme yok. Test düzeneği kaynaklı sayıldı.

## Akış: zayıf noktalar ve öneriler

Akışa dokunulmadı; aşağıdakiler öneri.

1. Huninin dibi boş. Ziyaretçi nereden gelirse gelsin iki yere varıyor: `/basla` (bilgi alıyor, göndermiyor) ya da `/iletisim` (form kapalı). Gerçekten çalışan tek şey iletişim sayfasının altındaki telefon, WhatsApp, e-posta.
   Öneri: teslimden önce en az bir yol bağlansın. En ucuzu: `/basla` son adımı ve iletişim formu tek bir sunucu rotasına yazsın ve firmaya e-posta düşsün. O da yetişmiyorsa son düğme seçilen ülkenin WhatsApp hattını hazır mesajla açsın (numaralar `offices.ts`'te var) ve "gönderildi" cümlesi kalksın.

2. İki ayrı niyet tek kapıya gidiyor. "Başlamak istiyorum" ile "bir şey soracağım" aynı pencereyi açıyor. Soru soran kişi "Şirketinizi hangi ülkede kuruyorsunuz?" ile karşılaşıyor.
   Öneri: soru ve görüşme etiketli düğmeler `/iletisim`'e gitsin (`AskCta` varsayılanı ve `SssAkordeon` düğmesi, iki satır). `/basla` yalnız "Başlat" etiketli düğmelerde kalsın.

3. Ülke sayfasında aynı hedefe çok düğme var. `/dubai`'de menü dışında dokuz düğme `/basla`'ya gidiyor, altı ayrı etiketle; iletişime giden yalnız alttaki tek düğme.
   Öneri: birincil çağrı iki yerde kalsın (girişteki Hemen Başla ve fiyat panelindeki Bu kurulumla başlayın); ötekiler iletişime dönsün.

4. İngiltere'de fiyat var, akış yok. Sayfa paket seçtiriyor, sonra "yakında" diyor.
   Öneri: ya pencereye İngiltere eklensin (ikinci adımda üç paket) ya da İngiltere sayfasındaki düğmeler "İletişime geçin" olsun. Firma İngiltere'ye "prestij için" baktığına göre ikincisi daha hızlı.

5. Hizmet sayfalarının kapanışı üç ayrı kalıpta.
   - 11 sayfa yalnız "İletişime geçin" (muhasebe ve alt sayfaları, İngiltere ve KKTC banka ve muhasebe).
   - 2 sayfa "Kuruluşu başlatın + İletişime Geç" (Dubai banka, Dubai vize).
   - 9 sayfa "Şirketinizi bugün kuralım · Kurulumu Başlat + İletişime Geç" (üç ülkede vergi, kurumsal danışmanlık, AML; dördü dolaşıma kapalı). Vergi danışmanlığına gelen kişinin şirketi büyük ihtimalle kurulu.
   Öneri: kuruluş dışındaki bütün hizmet sayfaları tek kalıba insin: "İletişime geçin".

6. "İletişime geçin" kapalı forma iniyor. Sayfanın ilk ekranı çalışmayan form, çalışan kanallar altta.
   Öneri: form bağlanana kadar ofis kanalları üste alınsın ya da form gizlensin.

7. Blog ve kaynaklar çıkmaz. Blogdaki 15 satırın hepsi iki sayfaya iniyor. Yazının sonundaki çıkış "Durumumu sorayım" kuruluş penceresi açıyor. E-kitaplarda on kartın onu da "Hazırlanıyor". Gelişmelerde 22 kaydın hepsi "Örnek".
   Öneri: müşteriye teslimde bu üç bölümün örnek olduğu açıkça söylensin; gerçek ziyaretçiye açılmadan önce menüde sönük kalmaları daha güvenli.

8. Ana sayfa kendi içine dönüyor. Girişte ve en alttaki kapanışta birincil düğme "Uzmanlık alanlarımız" (aynı sayfadaki bölüm). Sayfanın sonuna gelen kişi yukarı sarılıyor.
   Öneri: kapanışta birincil düğme "Bizimle iletişime geçin" olsun, ikincil "Kurulumu Başlat".

9. WhatsApp iki tık uzakta. Yalnız iletişim sayfasında var; penceredeki WhatsApp düğmesi boş.
   Öneri: pencere düğmesi seçilen ülkenin hattına bağlansın.

Adım sayıları makul: kurulum penceresi dört adım, üç zorunlu alan (fiyat panelinden gelince üç adım). İletişim formu iki seçim, beş alan, üçü zorunlu. Uygunluk testi 11 soru; uzun ama sonunda rapor veriyor. Kısaltma önermiyorum.

"Başlat" ile "İletişime geçin" bugün nerede çıkıyor:
- Menü: her sayfada "Kurulumu Başlat".
- Ana sayfa: giriş ve kapanışta "Uzmanlık alanlarımız" ve "İletişime geç"; başlat yalnız menüde.
- Ülke sayfaları: girişte "Hemen Başla" ve "Fiyatları Gör"; kapanışta "Kurulumu Başlat" ve "İletişime Geç".
- Hizmet sayfaları: girişte "İletişime geçin"; SSS altında "Görüşme planlayın" (pencere açıyor); kapanış 5. maddedeki üç kalıptan biri.
- Araçlar, blog, kurumsal sayfalar: kapanışta "Kurulumu Başlat" ve "İletişime Geç".

## Yer tutucuların tam listesi

### A. Sönük, tıklanmayan girdiler (`data-soon`): 11 hedef
Sayfası hiç olmayanlar (7):
- "Panel girişi" → `/panel`. Her sayfada üç yerde: üst çubuk, telefon menüsü, footer. `src/components/NavIstemci.tsx:1521`, `:1722`, `src/components/Footer.tsx:113`.
- Footer İngiltere sütunu: "Sponsor Licence" → `/ingiltere/sponsor-licence`, "Şirket Adresi" → `/ingiltere/adres`. `src/lib/brand.ts:131-132`.
- Footer KKTC sütunu: "Serbest Bölge" → `/kktc/serbest-bolge`. `src/lib/brand.ts:138`.
- Ana sayfa: "Şirketimi taşı" → `/sirket-tasima` (Bozuk 6).
- Ana sayfa: döngüde "Uyum" → `/dubai/uyum` (Bozuk 7).
- `/dubai` kuruluş sonrası bölümü: "Oturum sayacı" kartı → `/araclar/oturum-sayaci`. `src/components/country/CountryAfter.tsx:635`.

Sayfası olup dolaşıma kapalı olanlar (4): `/ingiltere/kurumsal-danismanlik`, `/ingiltere/aml-uyum`, `/kktc/kurumsal-danismanlik`, `/kktc/aml-uyum`. Sönük göründükleri yerler:
- Menü, Hizmetler paneli, İngiltere ve KKTC sekmeleri (masaüstü ve telefon).
- Ana sayfa "Uzmanlık alanlarımız" kartlarının ülke seçicisi (dört çip). `src/components/home/HomeServices.tsx:285`.
- `/ingiltere/vergi` ve `/kktc/vergi` sayfalarındaki ilgili hizmet bağlantıları.

Ayrıca: dil düğmesinde "EN" sönük, ipucu "Yakında". `src/components/NavIstemci.tsx:1510`.

### B. Adresi açılan ama dolaşımda olmayan sayfalar
- Dört kapalı hizmet sayfası (yukarıda). Genel şablonda, 200 dönüyor.
- 13 blog yazısı adresi: gövdesi yazılmamış örnek kayıtlar, 200 ve noindex. Örnek: `/blog/serbest-bolge-mi-mainland-mi`.
- `/ulke/…` kopya adresleri (noindex yok).
- `/lp/dubai-sirket-kurulusu` (reklam iniş sayfası).
- `/lab` ve alt sayfaları, `/teyit`, `/teyit/sorular`.

### C. "Örnek" etiketli içerik
- Blog: 15 kayıt, 14'ü örnek. Gerçek yazı bir tane: "Dubai'de şirket kurmanın maliyet kalemleri". Liste bağlantılarının hepsi iki demo sayfasına iniyor. `src/lib/blog.ts:977` (SEED_POSTS), `src/lib/blogTemel.ts:177` (DEMO_POST). Yazar adı kurum (SWAP:BLOG_AUTHOR), tarihler yer tutucu (SWAP:BLOG_DATES).
- Ülke rehberleri: 6 kayıt, 6'sı örnek (blogun bir kategorisi).
- Gelişmeler ve mevzuat: gerçek kayıt 0, örnek 22. `src/lib/resources.ts:245` (boş liste), `:290` (örnekler).
- E-kitaplar: gerçek dosya 0, örnek 10, hepsinde "Hazırlanıyor". `src/lib/resources.ts:844`, `:880`.
- Kariyer: 4 ilan, 4'ü örnek. `src/lib/careers.ts:116`.
- Ana sayfa yayın bölümü: 5 örnek satır. `src/components/home/HomeBlog.tsx:295`.
- `/kaynaklar`: dört kapının önizlemelerinde 11 "Örnek" etiketi.

### D. Kurumsal sayfaların içi
- Basında biz: gerçek. 8 kayıt, hepsi yayının kendi adresine gidiyor ve açılıyor. Boş kalanlar: basın e-postası (`src/lib/press.ts:274`), sayfa alıntısı (`:328`), kayıt başına görsel ve alıntı yuvaları.
- Kariyer: ilanlar örnek, form ve dosya yükleme kapalı, başvuru e-postası yok (SWAP:CAREER_INBOX).
- İş ortaklığı: metin gerçek, dört ticari şart boş ve sayfa bunu söylüyor (komisyon, ödeme koşulu, asgari yönlendirme, white-label bedeli; `src/lib/partners.ts:128`). Form kapalı.
- Hakkımızda: metin gerçek. Boş: lisans numarası, ofis adresleri satırı, alttaki üç iletişim kanalı (oysa `offices.ts` dolu), alıntının kaynağı. Künyedeki kuruluş yılı satırı canlıda boş (çalışma ağacında 1996 yazılmış, henüz yayında değil). `src/lib/about.ts:309-317`, `:403`, `:683`.
- Kaynaklar, e-kitaplar, gelişmeler: yapı gerçek, içerik örnek (C).
- KVKK: taslak, hukukçu onayı bekliyor; sayfada taslak olduğu yazmıyor. `src/app/kvkk/page.tsx:6`. Açık kalanlar: veri sorumlusunun tam unvanı, başvuru e-postası, saklama süreleri.

### E. Çalışmayan formlar ve akış sonu
- Dört form (Bozuk 3) ve `/basla` bitişi (Bozuk 1).
- "Panel girişi" ve "Müşteri paneline geç": panel adresi yok.
- Kurulum penceresinde WhatsApp düğmesi: numara bağlı değil (SWAP:WHATSAPP).
- Özet belgesinde geçerlilik süresi: teyit bekliyor.

### F. Fiyat ve sayı yer tutucuları
- İngiltere üç paket (900, 1.500, 2.600 USD) ve ekleri: temsilî, firma onaylamadı. `src/lib/pricing.ts:3`, `:64`.
- Dubai: Meydan 5.300 ve DWTC 5.820 belgeden türetildi, açık yazmıyor. İkinci ve üçüncü yıl lisans bedeli (4.200, 4.400, 4.800) yer tutucu. `src/lib/dubaiFiyat.ts:17`, `:26-28`.
- Ülke özetleri: İngiltere "$1.200'den" temsilî. `src/lib/brand.ts:44`.
- `/ulkeler` karşılaştırması: "Tutarlar temsilîdir" notuyla. `src/components/Countries.tsx:785`.
- Uygunluk testi: puan ağırlıkları teyitsiz (SWAP:FIT_WEIGHTS, `src/lib/fitTest.ts:25`). Hangi ülkenin önerileceğini bunlar belirliyor.
- Araçlardaki oran ve eşikler: kaynaklı ama firma teyidi yok (SWAP:TOOL_RATES, SWAP:UK_CT_RATE, `src/lib/tools/rates.ts:5`).
- Kuruluş sonrası "Örnek hesap" (Dubai, ilk 12 ay): `src/lib/afterSetup.ts` (SWAP:AFTER_PRICING). İngiltere ve KKTC için bu bölüm hiç yok (veri yok).
- `/lp`'deki eski Dubai paketleri.
- KKTC rakamları gerçek (teklif belgesi, 9.920 EUR).

### G. Temsilî görseller
- 47 fotoğrafın hepsi Unsplash stok ve Unsplash'ten canlı çekiliyor. `src/lib/media.ts:1`, `:165`.
- Ekip fotoğrafı stok (SWAP:TEAM_PHOTO, `src/lib/media.ts:105`). Murat Ortaç fotoğrafı ve kısa özgeçmişi yok (baş harfler basılıyor).
- Ülke giriş fotoğrafının altında "Görsel ülkeyi temsil ediyor; firmanın kendi çekimi değil." `src/components/country/CountryIntro.tsx:329`. KKTC karesi Kıbrıs değil.
- Süreç sahnelerinde örnek kişiyle doldurulan form ("Örnek doldurma", "Şematik özet"). `src/components/scenes/SetupScenes.tsx:91`, `:287`.
- Ana sayfa güven bölümündeki sohbet ve takip sahnesi: "Buradaki akış örnektir". `src/components/TrustLayer.tsx:127`.
- Vergi grafikleri: "Temsilî gösterim", "Örnek dağılım". `src/components/CountryTax.tsx:471`, `:564`; araçlarda `src/components/tools/KurumlarVergisi.tsx:335`, `:446`.
- İletişim haritası çizim, ofis işaretleri şehir merkezinde (ofisin kendi koordinatı yok).
- Marka logoları: Wise tam logosu, Mashreq yatay logosu ve birkaç simge eksik (SWAP:BRAND_ASSET, `src/lib/brands.ts:263`, `:430`).

### H. Anahtar ya da kimlik bekleyenler
- Companies House API anahtarı (İngiltere isim sorgulama).
- GTM kapsayıcı kimliği (ölçüm).
- Kendi izleyicimiz (kalıcı diski olan sunucu ve üç değişken).
- Müşteri paneli adresi.
- Alan adı: site `ortacglobal.com`'a taşınınca kanonik ve site haritası doğru olur.

### I. İletişim bilgisi boşlukları
- KKTC: şehir ve tüzel kişilik adı boş (`src/lib/offices.ts:265-267`).
- Üç ofisin harita koordinatı ofisin kendisi değil.
- Basın e-postası, kariyer e-postası, hakkımızda kanalları boş.
- Sosyal medya: sitede hiç yok. Ne bağlantı ne de yer tutucu var; JSON-LD'de de `sameAs` yok.
- Telefon ve WhatsApp numaraları dolu ve gerçek (üç ofis). Yer tutucu numara yok.

### J. Teyit bekleyen metinler
Kodda 66 ayrı `SWAP:` işareti var. Yukarıdakiler dışında kalanlar metin teyidi: banka (BANKA_TEYIT, BANKA_BELGE, BANKA_SSS), vize (VIZE_TEYIT, VIZE_BELGE, VIZE_SSS), altı hizmetin kapsamı (ALTI_HIZMET_KAPSAM, DANISMANLIK_KAPSAM), ülke içerikleri (COUNTRY_CONTENT, DUBAI_STEPS, PRESENCE), sektör çerçevesi (SECTOR_FRAMING), muhasebe (ACC_PRICING, TAX_AGENT, MURAT_BIO). Toplu liste `docs/teyit-listesi.md` ve canlıdaki `/teyit`.
Tam döküm: `grep -rhoE "SWAP:[A-Z_0-9]+" src | sort | uniq -c`.

## Ortam değişkenleri

Kodda `process.env.` geçen beş anahtar var. İlk ikisinin canlıda tanımlı olmadığı davranıştan ölçüldü. `IZLEME_DB` ve `IZLEME_TUZ` dışarıdan ölçülemiyor; izleyici kapalı olduğu için bugün zaten etkisizler. Depoda `.env` dosyası yok.

- `COMPANIES_HOUSE_API_KEY` · `src/app/api/araclar/isim-sorgu/route.ts:149`. İngiltere isim sorgusu için. Yokken rota 503 `anahtar-yok` dönüyor, ekranda "Sorgu henüz etkin değil" ve kurumun kendi sayfasına bağlantı çıkıyor. Canlıda yok (ölçüldü). İstek anında okunuyor; eklenince yeniden derleme gerekmiyor.
- `IZLEME_ACIK` · `src/app/layout.tsx:105`. "1" ise sayfaya kendi izleyicimiz basılıyor. Yokken hiçbir ölçüm yapılmıyor. Canlıda kapalı (tarayıcıda oturum kimliği oluşmuyor, `/api/olay`'a istek gitmiyor). Sayfaların çoğu derlemede üretildiği için değer değişince yeniden yayın gerekir.
- `IZLEME_DB` · `src/lib/izlemeDepo.ts:23`. İzleme kayıtlarının yazılacağı SQLite dosyasının yolu. Yokken `/api/olay` 204 dönüp kaydı sessizce atıyor. Node 22.13 ve kalıcı disk ister; Vercel'de bilerek kapalı.
- `IZLEME_TUZ` · `src/app/api/olay/route.ts:34`. Günlük tekil ziyaretçi sayımının gizli tuzu. Yokken süreç başına rastgele üretiliyor; sunucu yeniden başlayınca tekil sayım sıfırlanıyor, veri sızmıyor.
- `NEXT_DIST_DIR` · `next.config.ts:11`. Yalnız geliştirme kolaylığı (derleme klasörü). Sitenin davranışını etkilemiyor.

Ortam değişkeni olmayan ama aynı işi gören sabitler:
- GTM kimliği: kodda yeri var (`src/app/layout.tsx:69`), betik basılmıyor. `src/lib/gtm.ts` `window.dataLayer` yoksa sessizce geçiyor.
- Sitenin kök adresi: `src/lib/routes.ts:25` içinde sabit `https://ortacglobal.com`; ayrıca 15 dosyada elle yazılı.

`/api` rotaları: ikisi de yalnız POST kabul ediyor, GET 405 dönüyor. `/api/araclar/isim-sorgu` JSON dışı gövdeye 415, boş isme 400, anahtarsız 503 veriyor. `/api/olay` her durumda gövdesiz 204 dönüyor.
