# Teslim öncesi bilgi kontrolü ve Murat Bey listesi

08.10.2026. Yalnız rapor; kodda hiçbir şey değişmedi.

Neye bakıldı: `src/lib` içindeki bütün içerik dosyaları, ülke ve hizmet sayfaları, ana sayfa, menü, footer, iletişim, hakkımızda, KVKK, uygunluk testi, kurulum akışı, reklam sayfası. Lab sayfaları kapsam dışı. Blog, kaynaklar, gelişmeler ve e-kitap yazıları satır satır okunmadı (yer tutucu içerik); yalnız fiyat ve süre basan yerlerine bakıldı.

Neyle karşılaştırıldı (öncelik sırasıyla):
1. Dubai teklif belgesi (06.10.2026, ORTAC Accounting Services LLC, 20 sayfa) ve KKTC teklif belgesi (06.10.2026, Ortac International Accounting, 7 sayfa). İkisi de `~/Downloads` içinde.
2. Eski broşürler: "DUBAI SERBEST BÖLGE.pdf", "DUBAI ANAKARA (1).pdf", "KKTC.pdf" (2025) ve "Dubai Şirket Kurulduktan Sonra Sizi Neler Bekliyor.pdf". Yeni belgeyle çelişen yerde yeni belge esas alındı (VIP 1.700 değil 800, Dubai'de kalış 8-12 değil 10-12 iş günü).
3. Murat Bey'in cevapları: `docs/teyit-cevaplar-1.md` (203 sorunun 87'si cevaplı: KKTC, Dubai kuruluş, Dubai muhasebe) ve `docs/durum.md` 07.10 (15) kaydı.
4. Mevzuat notları: `docs/bae-mevzuat.md`, `docs/kktc-mevzuat.md`, `docs/ingiltere-mevzuat.md`.

Satır numaraları hakkında: bu kontrol sürerken başka bir oturum aynı depoda metin düzeltmesi yapıyordu (yaklaşık 60 dosya değişmiş görünüyor; bu rapor onlara dokunmadı). Aşağıdaki satır numaraları raporun yazıldığı andaki dosyalara göre yeniden doğrulandı. Kayma olursa yanındaki alıntı cümleyle aranabilir.

Önemli not: 203 soruluk listenin şu bölümleri HİÇ cevaplanmadı: İngiltere (34), Dubai banka (11), Dubai vize (14), ana sayfa (3), hakkımızda (15), iletişim (12), ülke kıyas (4), altı sektör (23). İngiltere için müşteri belgesi yok.

---

## 1. Düzeltilmesi gereken çelişkiler

Site bir şey diyor, kaynak başka bir şey diyor. Doğru değer yanında.

1. **Reklam sayfasında eski Dubai paketleri duruyor.**
   - `src/app/lp/dubai-sirket-kurulusu/page.tsx:107` eski paneli basıyor: Basic 3.900, Gold 5.400, Platinium 8.200 $, ek vize 750 $, yıllık muhasebe 2.100 $ (`pricing.ts:7-10, 69`).
   - Aynı sayfanın girişi "$5.120'den başlayan" diyor; yani sayfa kendi içinde de çelişiyor.
   - Doğrusu (teklif belgesi): paket yok. IFZA 5.120, Meydan 5.300, DWTC 5.820; vize 1.953; VIP 800; muhasebe 350 / ay.
   - Düzeltme: o satırda `<DubaiFiyat />` kullanmak; `:103` ve `:133`'teki "paket" kelimeleri de değişmeli. `pricing.ts`'e dokunmak gerekmiyor.

2. **"En pahalı ülke Dubai" yazıyor; en pahalısı KKTC.**
   - `countryContent.ts:226` ("kuruluş maliyeti üçünün en yükseği"), `countryContent.ts:441` ("Üç ülkenin en yüksek kuruluş ve yenileme maliyeti burada"), `sectors.ts:682`, `fitTest.ts:1009` ("KKTC ortada, Dubai en yüksek").
   - Kaynak: Murat Bey, KKTC 46: "düşük demek yanlış olur, en pahalısıdır aslında". Rakamlar da öyle: KKTC ilk yıl 9.920 € sabit, Dubai 5.120 $'dan başlıyor.
   - Doğrusu: en yüksek KKTC, sonra Dubai, en düşük İngiltere (İngiltere fiyatı teyitsiz).

3. **"IFZA resmî iş ortağı" tek başına yazıyor; ortak üç serbest bölge.**
   - `about.ts:202`, `about.ts:358`, `about.ts:446`, `brand.ts:187` (IFZA "resmî iş ortağı"), `brand.ts:200` (Meydan yalnız "Serbest bölge", DWTC listede yok), `partners.ts:172`.
   - Kaynak: teklif belgesi s. 2 ("IFZA, Meydan Free Zone ve DWTC Free Zone ile sözleşmeli iş ortağı") ve Murat Bey, Dubai kuruluş 7 ("sadece IFZA'yı vurgulamamalıyız").
   - Dubai sayfası zaten doğru yazıyor (`CountryOrtac.tsx:60`, `DubaiEkler.tsx:117`). Hakkımızda, iş ortaklığı ve ortak listesi eski kalmış.

4. **KKTC adresi yanlış kesilmiş.**
   - `offices.ts:266`: "Şht. Murat İlhan Sokak No:5, 039". Sondaki "039" bir adres parçası değil.
   - Kaynak (KKTC teklif belgesi, antet): "Sht. Murat İlhan Sokak No:5 Kumsal".
   - Doğrusu: "Şht. Murat İlhan Sokak No:5, Kumsal". KVKK sayfası zaten böyle yazıyor (`kvkk/page.tsx:35`). Şehir adı kaynakta yok, Murat Bey'e soruldu (aşağıda).

5. **KKTC fiyat bölümünün giriş cümlesi "adres hizmetini siz seçiyorsunuz" diyor.**
   - `src/app/ulke/[slug]/page.tsx:270` ("adres hizmetini ve muhasebe türünü siz seçiyorsunuz").
   - Kaynak: Murat Bey (Burak aktardı, 07.10): KKTC'de bütün kalemler zorunlu, tutar tek. Panel de öyle çalışıyor (`kktcFiyat.ts:26-30`).
   - Doğrusu: "yalnız muhasebe türünü siz seçiyorsunuz".

6. **Hakkımızda'da KKTC için "Yerel tescil" yazıyor.**
   - `about.ts:348`.
   - Kaynak: Murat Bey, KKTC 56: "yerel değil, Serbest Liman'da tescilli".
   - Doğrusu: "Serbest Liman tescili". Aynı kartta "Firmanın en eski çalıştığı ülke" cümlesi var; kaynağı bulunamadı.

7. **KKTC "Başvuru harcı 2.000 USD" satırının altında gösterilen kaynak 200 USD diyor.**
   - `countryContent.ts:1222-1225`. Satır kaynak olarak Serbest Liman Müdürlüğü'nün sayfasını gösteriyor; o sayfada rakam 200 USD (`docs/kktc-mevzuat.md:22`).
   - 2.000 Murat Bey'in cevabı (KKTC 18); bir sıfır fark olduğu için tekrar soruldu, cevap gelmedi.
   - Teklif belgesinde ayrı harç satırı yok: kuruluş tek kalem 4.900 €.
   - Doğrusu belli değil. Cevap gelene kadar iki harç satırını gizlemek en güvenlisi; çünkü üstündeki panel "hepsi dahil 9.920 €" diyor.

8. **Uygunluk testi hâlâ eski yer tutucu fiyatlarla hesap yapıyor ve bunları ekrana basıyor.**
   - `brand.ts:59` (Dubai 3.900), `brand.ts:72` (İngiltere 1.200), `brand.ts:81` (KKTC 2.400) ve `pricing.ts`'teki yıllık rakamlar (2.100 / 700 / 900) `fitTest.ts:454-466`'da toplanıyor.
   - Ekranda görünen: "Üçünün en ucuzu İngiltere: … 1.900 USD" (`FitTest.tsx:1033`), kazanç ve gider şıklarının USD bantları, `fitTest.ts:922` ("Rakamlar USD çünkü kuruluş ve yıllık maliyetler de USD").
   - Doğrusu: Dubai kuruluş 5.120 $ + muhasebe 4.200 $ (ya da yıllık 3.500 $); KKTC 9.920 € + 3.240 € (270 × 12), para birimi euro; İngiltere bilinmiyor.
   - Düzeltme: testin rakamı `dubaiFiyat.ts` ve `kktcFiyat.ts`'ten okuması; "USD" cümlesinin değişmesi. İngiltere fiyatı gelene kadar kazanç, gider ve bütçe sorularındaki rakamlar teyitsiz kalır. Testin puanları da hiç onaylanmadı (`docs/uygunluk-testi-teyit.md`).

9. **KKTC için "€9.920'den başlıyor; yapı, faaliyet ve ofis tipi tutarı değiştiriyor" yazıyor.**
   - `resources.ts:1069` ve `:1111` (kaynaklar sayfasındaki ülke rehberi).
   - Kaynak: `kktcFiyat.ts:28-29`, Murat Bey: "'den başlayan' diye bir şey koymamız mümkün değil."
   - Doğrusu: "€9.920, kuruluş ve ilk yıl, her şey dahil".

10. **Kurulum akışının son ekranı yanlış bilgi veriyor.**
    - `src/components/lab/SatisAkisi.tsx:941`: "Bir kopyası … adresine gönderildi". Hiçbir şey gönderilmiyor.
    - `:547`: özet belgesinde "Geçerlilik: SWAP · teyit edilecek" yazısı ekranda.
    - `:905`: WhatsApp düğmesi hiçbir yere gitmiyor. `:957-965`: "Müşteri paneline geç" düğmesi boş, altında "Demo" notu.
    - Bu akış menüdeki "Kurulumu Başlat" ve ülke sayfalarındaki "Hemen Başla" düğmelerinin hepsinde açılıyor.

11. **İngiltere fiyat panelinin düğmesi çalışmayan yere gidiyor.**
    - `CountryPricing.tsx:238` → `/basla?ulke=ingiltere&paket=…`. Akışta İngiltere seçilemiyor ("Yakında bu akışta", `SatisAkisi.tsx:154`).
    - Düzeltme: fiyat gelene kadar düğmeyi `/iletisim`'e bağlamak.

---

## 2. Sayfalar arası tutarsızlıklar

Aynı şey iki yerde iki türlü yazılmış. Hangisinin doğru olduğu biliniyorsa yazıldı.

**Dubai**

1. Banka adları. Dubai sayfası ve banka sayfası dört banka sayıyor: Wio, Mashreq, Emirates NBD, FAB (`countryContent.ts:259`, `bankaDubai.ts:140-143`). Eski kalanlar iki banka sayıyor: menü `brand.ts:119` ("Wio · Mashreq"), kıyas tablosu `brand.ts:250-252`, uygunluk testi `fitTest.ts:817`, iş ortaklığı `partners.ts:174`. Doğrusu: dört banka (müşteri revizesi, 07.10).
2. Ödeme kanalları. Dubai sayfası: Stripe, PayPal, Binance, Amazon Payment Services, Network International (`countryContent.ts:280`, `bankaDubai.ts:179-183`); Payoneer ve wamo çıkmıştı. Eski kalanlar: `brand.ts:195` (wamo "resmî ortak"), `brand.ts:260` (Payoneer Dubai'de var), `brand.ts:269` (wamo Dubai'de var; ana sayfada "Stripe, PayPal ve wamo çalışıyor" diye çıkıyor), `sectors.ts:779, 918, 976, 1061`, `fitTest.ts:713, 825`, `partners.ts:174`. Doğrusu Murat Bey'e soruldu.
3. Dubai'de kalma süresi. VIP bölümü ve kuruluş sonrası: standart "yaklaşık 10-12 iş günü" (`DubaiEkler.tsx:235`, `afterSetup.ts:264`). Süreç adımı: "Medical fitness ve Emirates ID · tipik 2-4 gün" (`countryContent.ts:495`). Doğrusu teklif belgesi: 10-12 iş günü, VIP ile yaklaşık 5.
4. VIP süresi. Başlıkta "yaklaşık 5 iş günü" (`DubaiEkler.tsx:208, 242`), fiyat kartında "5 iş günü" (`DubaiFiyat.tsx:136`). Belge "yaklaşık" diyor ve süreyi garanti etmiyor.
5. Vizenin süresi. "2 yıllık yatırımcı oturum izni" (`afterSetup.ts:243, 251`) ve "türüne göre 1, 2 ya da 3 yıl" (`vizeDubai.ts:83, 187`). Müşterinin iki belgesi de 2 yıl diyor.
6. Oturumun düşme kuralı. Vize sayfası: "BAE dışında 180 günden uzun kalırsanız oturum düşüyor" (`vizeDubai.ts:188, 243`). Kuruluş sonrası bölümü: yatırımcı 365 gün, çalışan 182 gün (`afterSetup.ts:329-337`). Doğrusu Murat Bey'e soruldu.
7. Lisans yenileme. Kuruluş sonrası: "ortalama 4.800 USD" (`afterSetup.ts:273, 313`; müşteri belgesi). Fiyat formu: 2. yıl için IFZA 4.200, Meydan 4.400, DWTC 4.800 (`dubaiFiyat.ts:26-28`; yer tutucu). Doğrusu Murat Bey'de.
8. Kuruluş süresi. "5-6 gün" (`brand.ts:65, 117`, `PageHero.tsx:323`) ve adımlarda 3-5 gün tescil + 2-4 gün lisans (`countryContent.ts:481, 488`). Murat Bey: 5-6 gün.
9. Yıllık muhasebe. Fiyat formu 3.500 $ (10 ay fiyatına, `dubaiFiyat.ts:34`), kuruluş sonrası örneği 12 × 350 = 4.200 $ (`afterSetup.ts:300-301`). İkisi de doğru olabilir (peşin ve aylık); aynı sayfada iki rakam.
10. "Tutarlar temsilidir" notu teklif belgesinden gelen rakamların altında duruyor: `DubaiFiyat.tsx:340`, `Countries.tsx:312` ve `:785`. Doğrusu: Dubai ve KKTC rakamları belgeden; temsilî olan yalnız İngiltere.
11. Dubai adresinin yazımı. İletişim: "Saaha Offices B - 304 Souk Al Bahar Bridge" (`offices.ts:194`). KVKK ve teklif belgesi: "Al Saaha Offices Block B No 304" (`kvkk/page.tsx:35`). Aynı yer, iki yazım.

**KKTC**

12. Süre. "30-40 iş günü" (`brand.ts:89, 135`, `PageHero.tsx:341`, `KktcFiyat.tsx:108`), "en az 30 iş günü" (`fitTest.ts:1055`), adımların toplamı 30 (`countryContent.ts:1078-1104`). Doğrusu teklif belgesi: yaklaşık 30-40 iş günü.
13. Adres hizmeti. Fiyat panelinde zorunlu kalem (`kktcFiyat.ts:37`). Aynı sayfada müşteriden "Adres kira sözleşmesi" isteniyor (`countryContent.ts:1003`), adımda "şirket kendi adresini kiralayıp personel çalıştırıyor ya da…" (`:1112`), SSS'te "adres sözleşmesi yapılırsa" (`:1241`). Doğrusu Murat Bey'e soruldu.
14. E-posta. İletişim: cyprus@ortacglobal.com (`offices.ts:301`). Teklif belgesi ve KVKK: info@ortacglobal.com (`kvkk/page.tsx:102`).
15. Tüzel ad. İletişimde boş (`offices.ts:267`), KVKK'da "Ortac International Accounting" (`kvkk/page.tsx:35`; teklif belgesi).
16. Para birimi. Fiyatlar euro (`kktcFiyat.ts`), harçlar USD (`countryContent.ts:1222-1223`), uygunluk testi USD (`fitTest.ts:922`).

**İngiltere**

17. Başlangıç fiyatı. Menü ve kıyas tablosu "$1.200" (`brand.ts:73, 128`), fiyat paneli "Basic $900" (`pricing.ts:70` → `CountryPricing.tsx:118`). İkisinin de kaynağı yok. Harçlar sterlin, fiyat dolar.
18. Süre. "3-7 gün" (`brand.ts:74, 128`, `PageHero.tsx:330`, `fitTest.ts:1055`) ve "tescil genellikle 24 saat" (`countryContent.ts:603, 723, 852`). Resmî kaynak 24 saat diyor (öncesinde kimlik doğrulama var); "3-7 gün"ün kaynağı yok.
19. Banka. Menü "Payoneer" (`brand.ts:130`), sayfa "Tide gibi dijital hesapla başlanıyor" (`countryContent.ts:634, 856`, `bankaIngiltere.ts:41`).

**Firma**

20. Kuruluş yılı. Site geneli 1996 (`layout.tsx:27, 53`, `HeroAkis.tsx:141`, `Authority.tsx:180`); hakkımızda künyesinde satır boş (`about.ts:309`). Doğrusu 1996.
21. Denetim. Hakkımızda açıklaması "denetim" hizmetini kendi işimiz gibi sayıyor (`about.ts:691`, `hakkimizda/page.tsx` yapısal veri "Denetim"). Denetim sayfası "anlaşmalı bağımsız denetim firmamız yapıyor" diyor (`muhasebeAltHizmet.ts:540`; Murat Bey, Dubai muhasebe 1). Doğrusu ikincisi.

---

## 3. Kaynağı olmayan iddialar

Hiçbir belgede ya da cevapta karşılığı bulunamadı. Riske göre sıralı.

1. **İngiltere fiyatlarının tamamı.** 900 / 1.500 / 2.600 $ paketler, 1.200 $ başlangıç, yıllık 700 $, banka desteği 400 $ (`pricing.ts:14-20, 70`, `brand.ts:72-73`). Sayfada "temsilidir" notuyla yayında.
2. **Uygunluk testinin rakamları ve puanları.** "İngiltere ilk yıl 1.900 USD", kazanç ve gider bantları, hangi cevabın hangi ülkeye kaç puan yazdığı. Hiçbiri onaylanmadı.
3. **Dubai 2. ve 3. yıl lisans fiyatı.** 4.200 / 4.400 / 4.800 $ (`dubaiFiyat.ts:26-28`). Formda toplamı değiştiriyor.
4. **"Resmî iş ortaklıkları."** Ana sayfa ve iş ortaklığı sayfası (`Authority.tsx:77`, `partners.ts:171-174`); arkasındaki liste IFZA, Wio Business, Mashreq NeoBiz, PayPal, wamo (`brand.ts:187-195`). IFZA dışındakiler için kaynak yok.
5. **İngiltere'de "hepsi açık" denen kanallar.** Payoneer, Revolut Business ve Binance "var" yazıyor (`countryContent.ts:821-823`). Resmî notta üçü de şüpheli (`docs/ingiltere-mevzuat.md` · 7).
6. **İngiltere'de firma iddiaları.** "Londra'da kendi ofisimiz", "kayıtlı adres ve resmî posta bizde" (`CountryOrtac.tsx:87-88`), "Sage ve Xero ortağı" (`:92`), "kimlik doğrulama yetkili aracıyla" (`countryContent.ts:711`). Hepsi eski sunumdan; sorular cevapsız.
7. **"Reddedilirse ikinci bankaya yeniden başvuruyoruz."** `bankaDubai.ts:110, 118, 211, 266`, `countryContent.ts:504, 547`, `HomeFaq.tsx:40`, `partners.ts:382`. Her durumda mı, ücretsiz mi; soruldu, cevap yok. Vaat gibi okunuyor.
8. **"Taşeron yok, aynı ekip" iddiasının KKTC ve İngiltere'ye yayılması.** `CountryOrtac.tsx:126` ("Kuruluştan muhasebeye aynı ekip"), `accountingKktc.ts:85`, `about.ts:590-596`. Dubai için teklif belgesinde karşılığı var ("kendi profesyonel lisansı ve kendi uzman Türk ekibi"); öteki iki ülke için soru (KKTC 52) cevapsız.
9. **"Türkçe tek muhatap: isimli bir danışman, mesai içinde doğrudan erişim."** `CountryOrtac.tsx:72, 99, 133`, `partners.ts:202`. Cevapsız.
10. **Türkiye'deki vergi cümleleri.** "Şirketin en az yarısı sizinse ve parayı getirirseniz yarısı istisna", "pasif gelirde dağıtılmayan kâr da gelir sayılabiliyor" (`countryContent.ts:782, 1157, 1160, 1267`, `hizmetIcerik.ts:223, 273-274`). Kanun maddesi var (`docs/kktc-mevzuat.md` · 9) ama Murat Bey "emin değilim, mali müşavire sorulmalı" dedi (KKTC 7, 8).
11. **"Yapıyı sonradan değiştirmek yeni kuruluş demek."** `countryContent.ts:344, 476`, `sectors.ts:497`. Tekrar soruldu, cevap yok.
12. **KKTC "aynı saat dilimi".** `countryContent.ts:930`, `sectors.ts:554`. Soruldu, cevap net değil.
13. **"Certified Accountant" unvanı.** `about.ts:442, 572`, `accountingDubai.ts:1247`. Unvanı hangi kurumun verdiği yok. Lisansın kendisi için 2025 broşüründe "Accounting & Bookkeeping License Reg. No: 2197511" yazıyor; sitede numara boş (`about.ts:312`).
14. **Kıyas ülkelerinin vergi oranları.** Almanya %30, Hollanda %25,8, Fransa %25, İrlanda %12,5, ABD %21 (`CountryTax.tsx:193-201`). Kodda "mali müşavir onayı gerekiyor" notu var.
15. **Verildiği söylenen ama sayfası ve teyidi olmayan hizmetler.** İngiltere "Sponsor Licence" ve "Şirket Adresi", KKTC "Serbest Bölge" (`brand.ts:131-132, 138`); İngiltere ve KKTC için vergi danışmanlığı, kurumsal danışmanlık, AML (`services.ts:161-191`); "Mevcut şirketinizi taşıyın" ve "Devralınan dosyalar" (ana sayfa).
16. **Kariyer sayfasındaki dört ilan.** "Örnek" rozetli, tarihleri uydurma (`careers.ts:117-212`). Canlı sayfada duruyor.
17. **Basında biz.** Sekiz haber bağlantısı (`press.ts:156-245`). Bu turda tek tek açılıp bakılmadı; kaynak dosyalarda karşılığı yok.
18. **"İngiltere'de onay oranı düşük"**, **"Dubai'de banka başvurusu 5-10 iş günü"** (`services.ts:90-91`; kıyas tablosunda basılıyor, `Countries.tsx:466`).

Kaynağı OLAN ve bu yüzden listeye girmeyenler: Dubai fiyatları ve VIP, KKTC fiyatları, 375.000 AED ve %9, KDV %5, KKTC %0 şartı, 1996 ve 30 yıl, "sürpriz kalem çıkmaz" (Murat Bey onayladı), IFZA "en çok tercih edilen" (teklif belgesi), KKTC'de banka adı yazılmaması, TaxDome adının geçmemesi (ekranda hiçbir yerde yok).

---

## 4. Murat Bey'den yayından önce şart olanlar

Cevap gelmezse site ya yanlış bilgi veriyor ya da bir şey çalışmıyor.

**Fiyat**

1. Dubai'de lisansın 2. ve 3. yılı ne kadar? (IFZA, Meydan, DWTC ayrı ayrı.) Şıklar: ilk yılla aynı · farklı, yazıyorum · sitede 2-3 yıl seçeneği olmasın.
2. Teklif belgesinde IFZA paketi "7.800 $, vergi dahil" yazıyor; kalemleri toplayınca 7.873 $ + %5 KDV = 8.266,65 $ ediyor. Müşteri hangisini ödüyor? (Meydan 7.990 ya da 8.455,65; DWTC 8.575 ya da 9.001,65.) Sitede kalem kalem toplam ve "KDV hariç" yazıyor.
3. İngiltere teklif belgesi ne zaman geliyor? Gelene kadar: 900 / 1.500 / 2.600 $ paketleri kalsın · fiyatı gizleyelim · doğrusunu yazıyorum. Fiyat dolar mı sterlin mi?
4. KKTC'de başvuru harcı (2.000 USD) ve tescil harcı (2.500 USD) 9.920 €'nun içinde mi? Şıklar: içinde · müşteri ayrıca ödüyor · sitede bu iki satır olmasın. (Resmî sayfada başvuru harcı 200 USD.)
5. KKTC'de adres ve temsilcilik hizmeti (2.000 € + KDV) her müşteride zorunlu mu? Şıklar: evet, her zaman · kendi adresini gösteren ödemiyor. (Teklif belgesi md. 5 ikinci şıkkı söylüyor.)
6. KKTC'de denetçi raporu 270 € / 900 € ücrete dahil mi? Şıklar: dahil · ayrı ücret · gerekmiyor.

**Çalışması gerekenler**

7. Formlardan gelen talepler hangi e-posta adresine düşsün? (İletişim formu, kurulum akışı, reklam sayfası formu; üçü de şu an hiçbir yere göndermiyor.) Tek adres mi, ülkeye göre mi?
8. Müşteri panelinin giriş adresi ne? (Menü, footer ve kurulum akışının son adımı oraya gidecek. Burak verecekti; hâlâ yok.)
9. Kurulum akışındaki WhatsApp düğmesi hangi numaraya gitsin? Şıklar: +971 56 286 64 66 · başka numara. Üç ofisin numarası da WhatsApp'ta açık mı?
10. Kurulum özetindeki "Geçerlilik" kaç gün? Şıklar: 7 · 15 · 30 · satır olmasın.
11. Site ortacglobal.com'a hangi gün taşınacak, alan adını kim yönetiyor?

**İletişim bilgileri**

12. KKTC ofisi: adres "Şht. Murat İlhan Sokak No:5, Kumsal, Lefkoşa" mı? E-posta cyprus@ mı info@ mı? +90 548 841 66 66 güncel mi?
13. İngiltere ofisi: e-posta uk@ortacaudit.com doğru mu (öteki ikisi ortacglobal.com)? Telefon +44 750 800 90 36 mı, +90 548 865 42 39 mu? 85 Great Portland St sizin ofisiniz mi, kayıtlı adres hizmeti mi? (Sitede "Londra'da kendi ofisimiz" yazıyor.)

**Yasal**

14. KVKK metni için veri sorumlusunun tam unvanı, adresi ve başvuru e-postası ne? Türkiye'de bir şirket var mı? Metni bir hukukçu okudu mu?
15. KKTC ve İngiltere şirketlerinin tam tescilli adı ne? (Elimizde: "Ortac International Accounting" ve "Ortac International Accounting & Tax Services Ltd.")
16. Hangi kurumlarla yazılı ortaklık sözleşmeniz var? Birden fazla seçin: IFZA · Meydan · DWTC · Wio · Mashreq · PayPal · wamo · Xero · QuickBooks · Sage. (Sitede "Resmî iş ortaklıkları" ve "Sage ve Xero ortağı" yazıyor.)

**Doğru bilgi**

17. Dubai'de Payoneer ve wamo ile bugün çalışıyor muyuz? Şıklar: ikisi de kalsın · yalnız Payoneer · ikisi de çıksın. (Dubai sayfasından çıkardık, altı yerde duruyor.)
18. İngiltere'de müşteriye fiilen hangi hesapları açabiliyoruz? Birden fazla seçin: Tide · Revolut Business · Payoneer · Binance Pay · geleneksel banka.
19. Dubai oturumu BAE dışında ne kadar kalınca düşüyor? Şıklar: yatırımcı 12 ay, çalışan 6 ay · herkes için 6 ay · sitede yazmayalım. (Sitede iki kural birden var.)
20. Dubai'de ortak vizesi kaç yıllık çıkıyor? Şıklar: 2 yıl · türüne göre 1-3 yıl.
21. "Serbest bölge şirketini sonradan mainland'e çevirmek yeni kuruluş demek" doğru mu? Şıklar: doğru · yanlış · cümle olmasın.
22. Dubai'de bordro hizmeti veriyor muyuz? Şıklar: evet, ayrı fiyatla · hayır, siteden çıksın. (Sitede "bordro ayrı fiyatlanıyor" yazıyor; siz "orada bordro yok" demiştiniz.)
23. KKTC ve İngiltere'de muhasebeyi kendi ekibiniz mi yapıyor? Şıklar: kendi ekibimiz · anlaşmalı ofis, tek muhatap biziz. (Sitede "taşeron yok, aynı ekip" yazıyor.)

---

## 5. Murat Bey'den sonra alınabilecekler

Site bunlar olmadan da yanlış bir şey söylemiyor; cevap gelince zenginleşir.

**27 soruluk sayfadan kalanlar** (`/teyit/sorular`)

- VIP başlığında "yaklaşık" kalsın mı? (d-vip)
- KKTC: yıllık hesap ve beyan hangi ayda; her yıl tam olarak ne veriliyor? (k-ay, k-ne)
- KKTC: 2. yıldan itibaren faaliyet harcı ve adres aynı tutarla mı yenileniyor? (k-yenileme)
- KKTC: başka ofisteki şirketin muhasebesini devralıyor muyuz; belgeler hangi yoldan geliyor; standart kapsam ayda kaç işlem; defteri kim imzalıyor? (k-devir, k-belge, k-islem, k-imza)
- KKTC banka: hesap kabaca ne kadar sürede açılıyor; "Tiko" adını yazmaya devam edelim mi; gelen dövizde sınır ya da masraf var mı? (k-sure, k-tiko, k-doviz)
- İngiltere: muhasebe ücreti nasıl yazılsın; hesap başvurusunu kim yapıyor; KDV, bordro, Sponsor Licence, kayıtlı adres hizmetlerinden hangilerini veriyoruz? (i-muh, i-basvuru, i-ek)
- Hangi sayfalar açılsın; hangi ülkelerde şirket devralıyoruz; AML hizmeti İngiltere ve KKTC'de ne kapsıyor? (s-hangi, s-tasima, s-aml)

Bu sayfadan düşenler: "İngiltere için teklif belgesi gelecek mi" (cevap: gelecek), "KKTC'de bankaya şahsen gitmek şart mı" (cevap: evet, bir kez), "Türkiye bankaları cümlesi kalsın mı" (teklif belgesi md. 7 aynısını yazıyor).

**İlk turdan cevapsız kalanlar** (`docs/teyit-cevaplar-1.md` · tekrar sorulacaklar)

- Dubai denetim eşiği: siz 3 milyon AED dediniz, resmî kural 50 milyon AED. Sitede 50 milyon yazıyor; kalsın mı?
- Dubai: %0 serbest bölge oranını sitede hiç anlatmayalım mı? (Muhasebe alt sayfalarında ve vergi sayfasında anlatılıyor; teklif belgesi de anlatıyor.)
- Dubai: kârı Türkiye'ye kâr payı olarak getirmenin vergisi (mali müşavir).
- KKTC: kâr payının yarısı istisna mı; pasif gelirde dağıtılmayan kâr gelir sayılıyor mu? (mali müşavir)
- KKTC: muafiyet için KKTC dışına satış dışında bir şart var mı; Türkiye'deki müşteride stopaj ve KDV çıkıyor mu?
- KKTC: bloke tescilden ne kadar sonra kalkıyor; belgelerde noter ya da apostil gerekiyor mu; temsilci ortak mı direktör mü; tek kişiye ikinci ortak çözümü var mı; iş kurma iznini ve şirket kapatmayı siz mi yürütüyorsunuz?
- KKTC: "aynı saat dilimi" cümlesi kalsın mı? (Bildiğimiz kadarıyla kışın bir saat fark var.)

**Hiç cevaplanmamış bölümlerden**

- Hakkımızda: lisans numarası (2025 broşüründe Reg. No: 2197511) künyeye yazılsın mı; "Certified Accountant" unvanını hangi kurum verdi; her müşteriye isimli danışman atanıyor mu; finans ve sağlık sektörlerinde de şirket kuruyor muyuz?
- Dubai banka: reddedilince ikinci bankaya başvuru ücretsiz mi; banka imzası için her bankada Dubai'ye gelmek şart mı; tahsilat kanallarını siz mi bağlıyorsunuz?
- Dubai vize: aile ve altın vize başvurusunu yürütüyor muyuz; kotayı büyütmek yeni kuruluş gerektiriyor mu?
- Dubai mainland: fiyatı sitede yok. Yazalım mı? (2025 broşüründe 7.800 $ + adres 7.500 AED.)
- Dubai muhasebe: pasif şirket 950 $ / yıl ve 500 işlem üstü 600 $ / ay (teklif belgesi) sitede yok. Ekleyelim mi?
- İngiltere: kimlik doğrulamayı kim yapıyor; UTR mektubu Londra adresine mi geliyor; yıllık dört dosyayı siz mi takip ediyorsunuz?
- Ülke kıyas tablosu: İngiltere için "onay oranı düşük" ve Dubai için "başvuru 5-10 iş günü" kalsın mı?
- Sektör sayfaları: RERA, DHA, CQC, EORI gibi izin süreçlerinde rolümüz var mı; FTA vergi temsilcisi sicilinde kayıtlı mıyız?
- Uygunluk testi: puanların onayı ve "yılda 19.000 USD altı kazanana ülke önerme" eşiği.
- Kariyer: gerçek açık pozisyon var mı, başvurular hangi adrese gelsin? Yoksa dört örnek ilan kalksın mı?
- Basında biz: sekiz haber bağlantısı güncel mi; kullanılacak bir alıntı var mı?
- Fotoğraf: Murat Bey'in ve ekibin kendi fotoğrafı (hakkımızda girişi stok kare).
- Ölçüm: Google Tag Manager kimliği (`layout.tsx`'te boş).
