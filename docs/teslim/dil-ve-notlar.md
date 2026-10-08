# Dil ve notlar · teslim öncesi tarama

Tarih: 08.10.2026. Kapsam: ziyaretçinin gördüğü Türkçe metinler (`src/lib`, `src/components`, `src/app`).
Lab ve teyit sayfaları, kod yorumları, `pricing.ts`, `layout.tsx`, `css`, `mobil` dosyaları taranmadı ve değişmedi.

Nasıl tarandı: kaynak dosyalardan yorumlar ayıklanıp ekrana çıkan bütün yazılar tek listeye döküldü
(206 dosya, yaklaşık 6.000 satır metin) ve baştan sona okundu. SIC kod kataloğu, logo çizimleri ve
kullanılmayan üç dosya (`Hero.tsx`, `HeroPortal.tsx`, `PriceSummary.tsx`) okunmadı.

Sonuç: 40 dosyada yüz kadar düzeltme yapıldı (yaklaşık 110 satır). Rakam, fiyat, süre, oran, kurum adı ve adres değişmedi.
`tsc` temiz, `eslint` temiz. `mobilKisa.ts` değişmedi: düzeltilen cümlelerin hiçbirinde oradaki
anahtarla eşleşen baş kısım değişmedi.

Genel izlenim: site daha önce bir dil turundan geçmiş, kaba argo çok az. Kalanlar üç kümede toplanıyor:
"sürpriz", "şey", "bakıyoruz", "bizde" gibi sohbet kelimeleri; "çıksın, oluşsun" gibi istek kipi;
ve sayfaya açık yazılmış iç notlar. Üçüncü küme karar bekliyor, aşağıda ayrı bölümde.

---

## Uygulanan düzeltmeler

### Gündelik söyleyiş, kurumsal ama sade karşılığı

- `src/components/CountryPricing.tsx:253` · Sürpriz kalem çıkmaz → Beklenmedik kalem çıkmaz
- `src/components/country/DubaiFiyat.tsx:337` · Sürpriz kalem çıkmaz → Beklenmedik kalem çıkmaz
- `src/components/TrustLayer.tsx:112` · Sürpriz kalem çıkmıyor; her aşama panelde görünür. → Beklenmedik kalem çıkmıyor; her aşama panelde görünür.
- `src/lib/countryContent.ts:321` · Bunları baştan yazıyoruz ki süreç ortasında sürpriz olmasın. → Süreç ortasında beklenmedik bir durumla karşılaşmamanız için baştan yazıyoruz.
- `src/lib/countryContent.ts:551` · Rakamı kuruluş teklifinde ayrı satır olarak yazıyoruz ki sürpriz olmasın. → Rakamı kuruluş teklifinde ayrı satır olarak baştan yazıyoruz.
- `src/lib/countryContent.ts:555` · Muhasebeyi bizden almasanız da bir yerden almanız gerekiyor. → Bu hizmeti bizden almasanız da bir muhasebe firmasından almanız gerekiyor.
- `src/lib/countryContent.ts:629` · Vergi avantajı için gelen yanlış adreste → Vergi avantajı için uygun ülke değil
- `src/lib/countryContent.ts:772` · şartlar tutarsa yarısı istisna → şartlar sağlanırsa yarısı istisna
- `src/lib/countryContent.ts:835` · siz yalnız tarihleri bilin. → tarihleri bilmeniz yeterli.
- `src/lib/countryContent.ts:937` · Tek ziyaret, gerisi bizde → Tek ziyaret yeterli
- `src/lib/hizmetIcerik.ts:150` · Bilmeniz gereken dört şey. (vurgu: dört şey.) → Bilmeniz gereken dört nokta. (vurgu: dört nokta.)
- `src/lib/hizmetIcerik.ts:155` · Şirket boşta kalsa da sürüyor → Şirket faaliyetsiz kalsa da sürüyor
- `src/lib/hizmetIcerik.ts:221` · Bu beklentiyle gelmeyin. → Bu beklentiyle kurulması doğru olmaz.
- `src/lib/hizmetIcerik.ts:223` · şartlar tutarsa yarısı istisna → şartlar sağlanırsa yarısı istisna
- `src/lib/hizmetIcerik.ts:240` · o şartın sizin işinizde tutup tutmadığına bakıyoruz. → o şartın sizin işinizde sağlanıp sağlanmadığına bakıyoruz.
- `src/lib/accountingIngiltere.ts:126` · Otomatik ceza yemiyorsunuz → Otomatik ceza almıyorsunuz
- `src/lib/accountingIngiltere.ts:138` · birlikte bakıyoruz. → birlikte değerlendiriyoruz.
- `src/lib/accountingDubai.ts:966` ve `src/components/services/AccountingSections.tsx:518` · Banka onayı ve otorite hızı bizde değil → Banka onayı ve otorite hızı bize bağlı değil
- `src/lib/accountingDubai.ts:1027` · Beyan takvimi kaçmıyor → Beyan takvimi aksamıyor
- `src/lib/accountingKktc.ts:183` · Yıllık yükümlülük kaçmıyor → Yıllık yükümlülük aksamıyor
- `src/lib/accountingDubai.ts:1400` · Durumu çıkaralım → Durum tespiti
- `src/lib/accountingDubai.ts:1401` · Kayıtları devralalım → Kayıtların devri
- `src/lib/accountingDubai.ts:1402` · Erişimi güncelleyelim → Erişim güncellemesi
- `src/lib/accountingDubai.ts:1403` · Düzene geçelim → Düzene geçiş
- `src/lib/afterSetup.ts:281` · Kalemin en oynak olanı bu. → En değişken kalem bu.
- `src/lib/afterSetup.ts:317` · …doğuyorlar, o yüzden herkese olacakmış gibi toplanmıyorlar. → …doğuyorlar; bu yüzden toplama katılmıyorlar.
- `src/lib/bankaDubai.ts:150` · Bankanın başvuruda baktığı şeyler → Bankanın başvuruda baktığı başlıklar
- `src/lib/bankaIngiltere.ts:46` · Hesap açan kurumun baktığı şeyler → Hesap açan kurumun baktığı başlıklar
- `src/lib/bankaKktc.ts:59` · Bankanın baktığı şeyler → Bankanın baktığı başlıklar
- `src/lib/bankaDubai.ts:155` · …tutarının kabaca tahmini. → …tutarının yaklaşık tahmini.
- `src/lib/bankaIngiltere.ts:51` · …tutarının kabaca tahmini. → …tutarının yaklaşık tahmini.
- `src/lib/blog.ts:578` · Kalemleri birbirinden ayıran şey tutarları değil, ne zaman doğdukları. → Kalemleri birbirinden ayıran, tutarları değil ne zaman doğdukları.
- `src/lib/blog.ts:651` · bu listenin en oynak kalemi → bu listenin en değişken kalemi
- `src/lib/blog.ts:683` · katılırlarsa herkese olacakmış gibi okunuyorlar. → katılırlarsa herkeste doğacakmış gibi okunuyorlar.
- `src/lib/blog.ts:741` · Bütçeyi kurarken üç şey → Bütçeyi kurarken üç başlık
- `src/lib/blog.ts:745` · en yükseği ve en oynağı. → en yükseği ve en değişkeni.
- `src/lib/blog.ts:746` · …sonradan sürpriz oluyor. → …sonradan beklenmedik bir gider oluyor.
- `src/lib/blog.ts:779` · birlikte netleştirelim. → birlikte netleştiriyoruz.
- `src/lib/blog.ts:963` · Yazı hazır değil ama sorunuz bekleyebilir bir şey değil. … hangi yapının işinizi gördüğünü birlikte bakalım. → Yazı hazır değil ama sorunuzun beklemesi gerekmiyor. … hangi yapının işinize uyduğunu birlikte değerlendiriyoruz.
- `src/lib/partners.ts:56` · …muhasebe tarafını kendi ekibimiz yürütsün. → …muhasebeyi kendi ekibimiz yürütür.
- `src/lib/partners.ts:160` · Müşterinizin işine hangisi oturuyorsa oraya gidebiliyorsunuz → Müşterinizin işine hangi ülke uygunsa ona yönlendirebiliyorsunuz
- `src/lib/partners.ts:184` · Hiçbir ülkede işin yereli uzaktan bir aracıya devredilmiyor → Hiçbir ülkede yerel işlemler uzaktaki bir aracıya devredilmiyor
- `src/lib/partners.ts:213` · …hem bizi hem sizi yakar. → …hem bizi hem sizi zor durumda bırakır.
- `src/lib/partners.ts:374` · Hangisinin işe oturduğu → Hangisinin uygun olduğu
- `src/lib/sectors.ts:425` · Kod ve marka kimin üstünde → Kod ve marka kime ait
- `src/lib/sectors.ts:426` · …kuruluş anında belli olsun. → …kuruluş anında belirleniyor.
- `src/lib/sectors.ts:824` · …burası doğru adres değil → …KKTC uygun seçenek değil
- `src/lib/sectors.ts:1301` · hukuken farklı şeyler → hukuken ayrı konular
- `src/lib/sectors.ts:1439` · farklı şeyler → ayrı konular
- `src/components/CountryTax.tsx:458` · Sizin durumunuz görüşmede çıkıyor. → Sizin durumunuz görüşmede netleşiyor.
- `src/components/CountryTax.tsx:619` · Bir rakam yazın, dağılım burada oluşsun. → Bir rakam yazın; dağılım burada oluşur.
- `src/components/tools/KurumlarVergisi.tsx:477` · Bir rakam yazın, dağılım burada oluşsun. → Bir rakam yazın; dağılım burada oluşur.
- `src/components/tools/UaeVat.tsx:391` · Bir tutar yazın, dağılım burada oluşsun. → Bir tutar yazın; dağılım burada oluşur.
- `src/components/services/AccountingNeeds.tsx:264` · Dört soruyu cevaplayın, liste burada çıksın → Dört soruyu cevaplayın; liste burada oluşur
- `src/app/araclar/kurumlar-vergisi/icerik.ts:76` · …vergi sonrası kalan anında çıksın. → …vergi sonrası kalan anında hesaplanır.
- `src/app/lp/dubai-sirket-kurulusu/page.tsx:96` · Kurulumunuzu seçin, fiyat anında çıksın. → Kurulumunuzu seçin, fiyatı anında görün.
- `src/app/ulke/[slug]/page.tsx:48` (sayfa açıklaması) · Kurulumunuzu seçin, fiyat anında çıksın. → Kurulumunuzu seçin, fiyatı anında görün.
- `src/app/ulke/[slug]/page.tsx:260` (bölüm başlığı) · Kurulumunuzu seçin, fiyat anında çıksın. → Kurulumunuzu seçin, fiyatı anında görün.
- `src/components/NavIstemci.tsx:1012` · Ne sorduğunuzu anlatın, hangi ülkede olduğunuz fark etmeden aynı ekip cevaplasın. → Sorunuzu yazın; hangi ülkede olursanız olun aynı ekip yanıtlar.
- `src/app/iletisim/ContactSections.tsx:1132` · …tahsilat kanalınız: aklınızda ne varsa. → …tahsilat kanalınız ve sormak istedikleriniz.
- `src/app/error.tsx:63` · Sorun sizde değil. → Sorun sizden kaynaklanmıyor.
- `src/components/tools/UkIsimSorgu.tsx:649` · son söz Companies House'un. → kararı Companies House veriyor.
- `src/components/tools/UkIsimSorgu.tsx:654` · son söz Companies House'un. → kararı Companies House veriyor.
- `src/components/tools/UkIsimSorgu.tsx:877` · son sözü başvuruda Companies House söylüyor. → kararı başvuruda Companies House veriyor.
- `src/lib/tools/catalog.ts:380` · son sözü başvuru sırasında Companies House söyler. → kararı başvuru sırasında Companies House verir.
- `src/lib/tools/catalog.ts:367` · Müsaitlik sorgusu DEĞİL. → Müsaitlik sorgusu değil.
- `src/components/FitTest.tsx:226` · sıralamayı rahatça çevirebilir → sıralamayı kolayca çevirebilir
- `src/lib/resources.ts:185` · İndirip yanınızda götürdüğünüz uzun içerik. → İndirip çevrim dışı okuyabileceğiniz uzun içerik.
- `src/lib/careers.ts:226` · …elimizdeki başvurulara ilk biz bakıyoruz. → …önce elimizdeki başvurulara bakıyoruz.
- `src/components/CountryDocs.tsx:189` · …işaretleyin, süreç tarafını biz yürütüyoruz. → …işaretleyin; süreci biz yürütüyoruz.
- `src/lib/vizeDubai.ts:255` · görüşmede birlikte bakıyoruz. → görüşmede birlikte değerlendiriyoruz.

### Uzun tire

Yalnız tire işareti değişti, rakamlar aynı.

- `src/lib/countryContent.ts:532` · {hedef}(uzun tire)BAE çifte vergilendirme anlaşması → {hedef}-BAE çifte vergilendirme anlaşması
- `src/lib/countryContent.ts:675` · £50.000 (uzun tire) £250.000 → £50.000 - £250.000
- `src/lib/countryContent.ts:770` · %19(uzun tire)25 → %19-25 (sitenin öteki yerleriyle aynı)
- `src/lib/muhasebeIhtiyac.ts:112` · 375 bin (uzun tire) 50 milyon AED → 375 bin - 50 milyon AED
- `src/lib/tools/raporlar.ts:255` · PDF raporda "kod (uzun tire) tanım" → "kod · tanım"

### Yazım ve tutarlılık

- `src/lib/bankaDubai.ts:173`, `:180` · pazaryerinden, pazaryeri, etiket "Pazaryeri" → pazar yerinden, pazar yeri, "Pazar yeri"
- `src/lib/bankaIngiltere.ts:60`, `:65`, `:82` · pazaryeri, etiket "Pazaryeri" → pazar yeri, "Pazar yeri"
- `src/lib/countryContent.ts:805`, `:813`, `:814`, `:821` · pazaryeri, pazaryerinde, Pazaryerlerinden, etiket "Pazaryeri" → pazar yeri, pazar yerinde, Pazar yerlerinden, "Pazar yeri"
- `src/app/gelismeler/page.tsx:77` · Yayınlanan her kayıt → Yayımlanan her kayıt
- `src/lib/blog.ts:566`, `:706`, `:945` · yayınlanan, Yayınlanan, Yayınlanmış → yayımlanan, Yayımlanan, Yayımlanmış
- `src/lib/resources.ts:152`, `:153`, `:166`, `:177`, `:1086` · yayınlanıyor, yayınlanmış, Yayınlanan → yayımlanıyor, yayımlanmış, Yayımlanan
- `src/components/shared/LiveChat.tsx:57` · Çevrimiçi → Çevrim içi
- `src/app/e-kitaplar/page.tsx:121` · E-kitapları indirin, çevrimdışı okuyun. → E-kitapları indirin, çevrim dışı okuyun.
- `src/app/iletisim/ContactSections.tsx:1095` · Website → Web sitesi
- `src/app/is-ortakligi/page.tsx:485`, `:503` · Opsiyonel → İsteğe bağlı (öteki formlarla aynı)
- `src/lib/resources.ts:494` · Serbest bölge ile anakara arasında → Serbest bölge ile mainland arasında (sitede 27 yerde mainland)
- `src/lib/afterSetup.ts:236` · Bazı Free Zone otoriteleri → Bazı serbest bölge otoriteleri
- `src/lib/afterSetup.ts:277` · yalnızca Free Zone → yalnızca serbest bölge
- `src/lib/afterSetup.ts:311` · Free Zone lisans yenileme → Serbest bölge lisans yenileme
- `src/components/LandingLeadForm.tsx:51` · Ad soyad → Ad Soyad
- `src/lib/partners.ts:315` · Ad soyad → Ad Soyad

Bulunmayanlar: ülke için "bölge" kullanımı yok (geçen her "bölge" serbest bölge anlamında).
TaxDome adı, TODO, lorem, ünlem işareti, çift boşluk ve yazım hatası görünür metinde çıkmadı.

---

## Sayfadaki açık notlar (karar bekliyor)

Hiçbirine dokunulmadı. Sıra, önem sırası.

### 1 · İç durum cümleleri (en önemli küme)

- `src/components/tools/KurumlarVergisi.tsx:567`, `:650` · `src/components/tools/UaeVat.tsx:466` · `src/lib/tools/raporlar.ts:43` (PDF rapor) · Oran ve eşik mali müşavir onayından henüz geçmedi. · **Öneri:** Kaldır ya da teslimden önce onayı alın. Müşteri bunu "rakamlar kontrol edilmedi" diye okur.
- `src/app/araclar/page.tsx:256` (açılır kutunun içinde) · İkisi de henüz mali müşavir onayından geçmedi ve araç bunu sonucun altında yazıyor. … sitenin kararı KKTC'de oran yayımlamamak · **Öneri:** Aynı karar. Cümle çıkarılabilir; "sitenin kararı" iç dil.
- `src/lib/tools/catalog.ts:354` (uygunluk testi, "Bu araç ne değil") · Puan ağırlıkları da henüz teyit edilmedi, o yüzden sonuç ekranı hüküm kurmuyor · **Öneri:** Kaldır. İlk cümle yeterli: "Tek bir öneri vermiyor ve yerinize karar vermiyor: çıktı bir kısa liste."
- `src/components/tools/KurumlarVergisi.tsx:763` · Sitenin yayın kararı (KKTC sayfasında kutu başlığı) · **Öneri:** Başlığı değiştir: "Neden hesap yok" gibi.
- `src/app/iletisim/ContactSections.tsx:1196` ve `:1162` · Form henüz bir yere bağlı değil: gönderim uç noktası eklenene kadar bu buton çalışmıyor ve yazdıklarınız hiçbir yere kaydedilmiyor. / Gönderim kapalı · **Öneri:** Form bağlanmadan teslim edilecekse sadeleştir: "Form yakında açılacak. Bize aşağıdaki kanallardan ulaşabilirsiniz."
- `src/components/LandingLeadForm.tsx:108` · Gönderim henüz bağlı değil · **Öneri:** Aynı.
- `src/lib/careers.ts:256`, `:262`, `:276` · `src/app/kariyer/CareerSections.tsx:465`, `:478` · Dosya yükleme henüz bağlı değil: yüklenen dosyayı alacak bir uç nokta yok… / Form henüz bir yere bağlı değil… / Özgeçmiş yüklenemediği için… / Yükleme kapalı · **Öneri:** Aynı. "uç nokta" teknik dil.
- `src/lib/partners.ts:347`, `:348` · Form henüz açılmadı / Bu formun gönderim ucu henüz bağlanmadı, o yüzden alanlar kapalı duruyor. · **Öneri:** Aynı.
- `src/app/iletisim/ContactSections.tsx:535`, `:575` · Açık adres eklenecek / Eklenecek · **Öneri:** KKTC ofisinde şehir ve tüzel ad boş (`offices.ts:265`, `:267`); bilgi gelince kendiliğinden kalkar.
- `src/lib/partners.ts:139`, `:366` · Bu dört başlık şu an sayfada yayımlanmıyor. Kararlaşmamış bir rakamı buraya yazmak yerine boş bırakıyoruz… · **Öneri:** Sadeleştir: "Ticari şartları ortaklık görüşmesinde paylaşıyoruz."
- `src/app/is-ortakligi/page.tsx:254` · Altı maddenin altısı da doğrulanabilir. Ortaklık sayfası, yeni iddia üretmek için uygun bir yer değil. · **Öneri:** Kaldır. Yazım gerekçesi, ziyaretçiye söylenecek söz değil.
- `src/app/is-ortakligi/page.tsx:555` · Sekiz başlık. Cevabı henüz kararlaşmamış olan tek konu ilk sırada duruyor. · **Öneri:** Kaldır.
- `src/app/kariyer/page.tsx:152` · `src/lib/careers.ts:226` · Sayfayı doldurmak için olmayan bir pozisyon yazmıyoruz · **Öneri:** Çıkar; "Şu an açık pozisyonumuz yok, başvurunuzu bırakabilirsiniz" yeterli.
- `src/components/tools/UkIsimSorgu.tsx:197` · Companies House bağlantımız henüz kurulmadı. · **Öneri:** Anahtar (müşteriden bekleniyor) eklenince kendiliğinden kalkar.

### 2 · "Örnek" kayıtlar

- `src/components/home/HomeBlog.tsx:295` (ana sayfa) · `src/app/blog/BlogHub.tsx:295`, `:296`, `:307` · "Örnek" rozeti · "… tanesi örnek kayıt" · "bağlantılar şimdilik demo sayfasına iniyor" · **Öneri:** Karar: gerçek yazı gelene kadar örnekleri gizlemek ya da böyle bırakmak. Bu sayfalar bugün arama dizininden çıkarılmış ama ziyaretçi görüyor.
- `src/app/blog/[slug]/page.tsx:451` · Demo · Akışın oturması için bu tur boyunca … bütün bağlantılar bu sayfaya iniyor · **Öneri:** Kaldır.
- `src/lib/blog.ts:917`, `:923`, `:924`, `:968` ve 11 kayıtta "Örnek kayıt: metin hazırlanıyor." · Bu bir örnek kayıt. Sayfanın düzenini görebilmek için konuldu… · **Öneri:** Yukarıdaki kararla birlikte.
- `src/lib/resources.ts:988`, `:990` · gelişmeler ve e-kitap örnekleri · Dosya hazırlandığında bu düğme açılacak. / Hazırlanıyor · **Öneri:** Aynı karar.

### 3 · "Temsilî" ibaresi

- `src/components/Countries.tsx:312` · Tutarlar temsilî · **Öneri:** Kaldır. Rakamlar teklif belgesinden geliyorsa "temsilî" yanlış izlenim veriyor.
- `src/components/Countries.tsx:785` · Tutarlar temsilîdir, süreler tipik aralıktır. Kesin tutar ve takvim dosyaya göre netleşir. Vergi satırları genel çerçevedir; kişiye özel vergi görüşü siteden verilmiyor. · **Öneri:** Ayrıntılar'a al ya da tek cümleye indir: "Kesin tutar ve takvim dosyaya göre netleşir."
- `src/components/CountryPricing.tsx:256` · `src/components/country/DubaiFiyat.tsx:340` · `src/app/ulke/[slug]/[hizmet]/page.tsx:352` · Tutarlar temsilidir; nihai teklif faaliyet ve belgelere göre netleşir. · **Öneri:** İlk yarıyı at: "Nihai teklif faaliyet ve belgelere göre netleşir." (Yazımı da iki biçimde: temsilidir / temsilîdir.)
- `src/components/CountryTax.tsx:471`, `:443`, `:621` · `src/components/tools/KurumlarVergisi.tsx:335`, `:406` · `src/components/tools/UaeVat.tsx:260` · Temsilî gösterim · temsilî efektif oran · **Öneri:** "Örnek hesap" ve yalnız "efektif oran" de.
- `src/components/TrustLayer.tsx:126` (ana sayfa) · Buradaki akış örnektir; sıra ve içerik dosyaya göre değişir · **Öneri:** Kaldır. Çizimin örnek olduğu belli.
- `src/components/country/CountryIntro.tsx:329` · Görsel ülkeyi temsil ediyor; firmanın kendi çekimi değil. · **Öneri:** Kaldır.
- `src/components/country/CountryAfter.tsx:318` · Yeni kurulmuş, standart faaliyet gösteren bir şirket için örnek hesap. Kendi rakamınız … değişir. · **Öneri:** Kalsın. Toplamın ne olduğunu söylüyor.

### 4 · Süre ve garanti çekinceleri

- `src/lib/bankaDubai.ts:201` · `src/lib/bankaKktc.ts:90` · `src/lib/bankaIngiltere.ts:75` · `src/lib/vizeDubai.ts:163` · Adımlara süre yazmıyoruz: bankanın takvimi bizim kontrolümüzde değil. · **Öneri:** Kaldır. Olmayan bir şeyi açıklıyor; SSS aynı şeyi söylüyor.
- `src/lib/afterSetup.ts:346` (Dubai "Kuruluş sonrası" bölümünün dibi; ayrıca `/dubai/muhasebe` alt sayfalarında her fiyat kartının altında, `[alt]/page.tsx:304`) · Tutarlar USD ve aksi belirtilmedikçe KDV hariç; … kesin süre taahhüdü vermiyoruz. Hangi kalemin sizin şirketinizde doğacağı… · **Öneri:** Ayrıntılar'a al. Üç cümlelik paragraf.
- `src/components/home/ThreeCountries.tsx:1083` (ana sayfa) · Süreler tipik aralıktır; vergi satırı genel çerçevedir. · **Öneri:** Kaldır ya da Ayrıntılar'a al.
- `src/components/Countries.tsx:328` · Kesin süre taahhüdü yok · **Öneri:** Kaldır; satır adı zaten "Tipik süre".
- `src/app/basinda-biz/page.tsx:484` · …Yanıt süresi taahhüdümüz yok. · **Öneri:** Son cümleyi kaldır.
- `src/components/FitTest.tsx:621` · Satırlar sıralanmıyor, üç çubuk aynı ölçekte ve çizginin solu eksi puan… · **Öneri:** Kısalt ya da Ayrıntılar'a al.
- `src/components/NavIstemci.tsx:853` (menü) · Araçların çıktısı bir ön değerlendirmedir, teklif değildir. · **Öneri:** Menüden kaldır; her araç kendi sayfasında söylüyor.

### 5 · Kaynak, dayanak ve dipnot

- `src/lib/muhasebeAltHizmet.ts:104`, `:109`, `:181`, `:186`, `:191`, `:258`, `:267`, `:272` ve devamı (kartların altında küçük yazı, `[alt]/page.tsx:205`) · Federal Decree-Law No. 28 of 2022 (Vergi Usul), md. 4 … · **Öneri:** Ayrıntılar'a al. Kural: kaynak sayfada açık basılmaz.
- `src/app/dubai/muhasebe/[alt]/page.tsx:301` · **Not:** … · **Öneri:** "Not:" etiketini kaldır ya da notu Ayrıntılar'a al.
- `src/lib/vizeDubai.ts:192` (`oturum-vize/page.tsx:280`) · Kaynak: BAE resmî portalı u.ae · **Öneri:** Ayrıntılar'a al.
- `src/lib/countryContent.ts:920`, `:923` (KKTC avantaj kartı) · Kurumlar ve gelir vergisi %0* … Yıldız önemli: KKTC içine satışta normal vergi kuralları uygulanıyor. · **Öneri:** Yıldızı ve "Yıldız önemli:" sözünü kaldır; başlık "KKTC dışı işte vergi %0" olabilir.
- `src/lib/sectors.ts:460`, `:673` · Tahsilat satırı ödeme altyapısı tablosundan okunuyor; kanalı açan kurum sağlayıcının kendisidir ve onay garantisi vermiyoruz. Vergi hücreleri genel çerçevedir… · **Öneri:** Ayrıntılar'a al. "tablosundan okunuyor" iç dil.
- `src/lib/sectors.ts:462`, `:676` · Kuruluş maliyeti, tipik süre … bu tabloda yok: sektörden bağımsız oldukları için… · **Öneri:** Kaldır; altındaki bağlantı yeterli.
- `src/lib/accountingDubai.ts:777` · Kart işin hangi ay çıktığını gösteriyor, teslim tarihini değil. Mali yıl … varsayılıyor. · **Öneri:** Ayrıntılar'a al.
- `src/lib/countryContent.ts:1194` · Listelerde geçen "Cyprus" güneydeki Kıbrıs Cumhuriyeti; KKTC şirketi onun yerine geçmiyor. · **Öneri:** Kalsın. Sık yapılan bir yanlışı önlüyor.
- `src/lib/countryContent.ts:403`, `:667`, `:1021` · `src/lib/bankaDubai.ts:250` · `src/lib/bankaKktc.ts:129` · `src/lib/bankaIngiltere.ts:113` · `src/lib/vizeDubai.ts:228` · Liste bankadan bankaya değişiyor; tam listeyi başvurudan önce paylaşıyoruz. (ve benzerleri) · **Öneri:** Kalsın; tek cümle ve işe yarıyor.
- `src/app/basinda-biz/page.tsx:468` · Kartlardaki kareler haberin kendi sayfasından alınmış ekran görüntüleri; hakları yayınlara ait. · **Öneri:** Kalsın (telif notu).
- `src/lib/resources.ts:152`, `:165`, `:176`, `:186` (kaynaklar sayfası kapıları) · Haber akışı değil… / Ülke reklamı değil… / Hukuki görüş değil ve tam liste iddiası taşımıyor… / Form karşılığı değil… · **Öneri:** Dört "ne değil" cümlesi; kaldırılabilir. Üçüncüsü hukuki nitelikte, kalsın.

Sayfada artık basılmayan ama veride duran kaynak satırları (işlem gerekmiyor):
`countryContent.ts:686`, `:843`, `:1042`, `:1225`. Kanun maddeleri (`:790`, `:1165`) zaten açılır kutunun içinde.

### 6 · Yasal nitelikte olanlar (silinmedi, yalnız liste)

- `src/components/Footer.tsx:410` · Bu sitedeki bilgiler genel bilgilendirme amaçlıdır; mali, hukuki veya vergi danışmanlığı yerine geçmez.
- `src/components/CountryProcess.tsx:205` · `src/components/ProcessScroll.tsx:137` · Kurum ve banka kararları ilgili kuruluşlara aittir; sonuç ve süre garanti edilmez.
- `src/components/Countries.tsx:464` · Hesabı banka açar; onay taahhüdü vermiyoruz.
- `src/lib/brand.ts:280` ile `:302` arası · vergi avantajı, banka onayı, kesin süre ve kişiye özel vergi görüşü çekinceleri (ülke vergi bölümü ve iş ortaklığı sayfası).
- `src/app/araclar/kurumlar-vergisi/icerik.ts:81`, `:130`, `:173` · Kişiye özel vergi görüşü değildir.
- `src/lib/rapor.ts:95` · `src/lib/tools/raporlar.ts:105`, `:166`, `:225`, `:262`, `:303`, `:376` · `src/lib/tools/rates.ts:319` · PDF rapor ve araç sonucu çekinceleri.
- `src/components/FitTest.tsx:775`, `:1005` · mali veya hukuki tavsiye değildir.
- `src/components/tools/NameForge.tsx:383` · kopyalanan metindeki "müsaitlik sorgusu değildir" notu.
- SSS cevaplarındaki "Kişiye özel vergi görüşü vermiyoruz" ve "kararı banka veriyor" cümleleri (ülke, banka, vize ve hizmet sayfaları).

---

## Öneriler (uygulanmadı)

1. **Sayfa başlıklarındaki uzun tire.** On beş sayfanın tarayıcı başlığında "Araçlar (uzun tire) kurumlar vergisi…" biçimi var:
   `araclar/page.tsx:69`, `araclar/[arac]/page.tsx:104`, `basinda-biz/page.tsx:85`, `e-kitaplar/page.tsx:54`,
   `gelismeler/page.tsx:75`, `iletisim/page.tsx:55`, `kariyer/page.tsx:75`, `kaynaklar/page.tsx:27`, `not-found.tsx:53`,
   `ulke/[slug]/page.tsx:47`, `ulke/[slug]/[hizmet]/page.tsx:45`, `ulkeler/page.tsx:13`, `lib/about.ts:689`,
   `lib/accountingDubai.ts:481`, `lib/partners.ts:54`. `docs/tuzaklar.md` kural 5 başlık ayıracında uzun tireyi serbest
   bıraktığı için dokunmadım. İstenirse hepsi iki noktaya çevrilir ("Araçlar: kurumlar vergisi…").
2. **Düğmelerde iki hitap.** "Tüm hizmetleri gör", "Süreci gör", "Ülkeye özel süreci gör", "Detaylı gör", "Detaylı hesapla",
   "Yeniden dene", "Ana sayfaya dön", "Şirketimi taşı", "Baştan başla" sen diliyle; "İletişime geçin", "Aracı açın",
   "Yazıyı okuyun", "Teklif isteyin" siz diliyle. "Tüm hizmetleri gör" Burak'ın kendi sözü olduğu için hiçbirine dokunmadım.
   Aynı cümle iki biçimde de yazılı: `NavIstemci.tsx:1689` "bana uygun olanı bulun", `CountryPicker.tsx:107` "bana uygun olanı bul".
3. **Ana çağrı iki biçimde.** "İletişime Geç" (footer, 404) ile "İletişime geçin" (hizmet sayfaları). Biri seçilmeli.
4. **Çağrı başlıklarında ortak eylem kipi.** "Şirketinizi bugün kuralım.", "Uluslararası işinizi birlikte konuşalım.",
   "…muhasebesini birlikte yönetelim.", "…banka tarafını birlikte kuralım.", "Defterinizi her ay birlikte kapatalım." ve
   beş benzeri (`muhasebeAltHizmet.ts`). Yaygın bir çağrı kalıbı, bıraktım. Daha resmî istenirse "birlikte yönetiyoruz" olur.
   "banka tarafını" yerine "banka altyapısını" daha düzgün.
5. **Birinci ağızdan düğmeler.** "Durumumu sorayım", "Kendi durumumu sorayım", "Devir için durumumu sorayım",
   "Durumumu anlatayım". Tutarlı ama samimi; "Durumunuzu sorun" seçeneği var.
6. **"Kimin işine yarar?"** (`ulke/[slug]/page.tsx:327`). Hizmet sayfalarında aynı soru "Kimler için uygun?" diye geçiyor.
7. **"Dürüst kısıt"** (`Countries.tsx:576`, `ThreeCountries.tsx:826`, sektör sayfası `:566`, `resources.ts:165`, `:942`).
   "Dürüst" sıfatı öteki satırların dürüst olmadığını ima ediyor; "Kısıtlar" ya da "Bilinmesi gereken" yeter.
8. **"takvim onlarda"** (`HeroDubaiCards.tsx:394`, `:500`). "takvimi otorite belirliyor" daha düzgün; kart dar olduğu için ölçmeden değiştirmedim.
9. **"Adres de bizde"** (`accountingKktc.ts:86`). "Kayıtlı adres ofisimiz" olabilir.
10. **"Yalnızca doğrulanabilir olanı yazıyoruz."** (`TrustLayer.tsx:57`, ana sayfa "Neden Ortac Global?" alt cümlesi). Firmayı değil siteyi anlatıyor.
11. **"dahil" iki yazımla.** 30 yerde "dahil", 10 yerde "dâhil" (araçlar). Site "resmî, hâlâ, kâr" yazdığı için doğrusu "dâhil"; otuz satır olduğu için sormadan çevirmedim.
12. **KKTC'de iki ad.** `accountingKktc.ts` ve `kktcFiyat.ts` "Serbest Bölge şirketi" diyor, ülke sayfası ve sektörler "Serbest Liman şirketi".
    Sayfa başlığında arama kelimesi olabilir diye dokunmadım; tek ad seçilmeli.
13. **Teklif belgesinden kalan terimler** (`afterSetup.ts:242`, `:251`, `:253`, `:331`, `:334`): "Yatırımcı / İşçi Vizesi", "partner".
    Sitenin geri kalanı "ortak vizesi" ve "çalışan vizesi" diyor. Belge esas olduğu için dokunmadım.
14. **"Online"** beş yerde, "çevrim içi" yedi yerde. "Online ödeme" (PayPal etiketi) kalabilir; cümle içindekiler tek biçime çekilebilir.
15. **Telefon kısa sürümü** (`mobilKisa.ts:90`): "Ofisi seçin; harita, adres ve kanallar ona göre değişsin." İstek kipi; "değişir" olmalı. Dosya bende değil.
16. **"gerçek fayda sahibi / nihai fayda sahibi / gerçek faydalanıcı"** üç biçimde (örnek ilan ve örnek kayıtlarda). Hizmet sayfaları "gerçek faydalanıcı" diyor.
17. **KVKK metni** (`kvkk/page.tsx`): dili düzgün; son commit "taslak" dediği için hukukçu onayı alınmalı.
18. `src/lib/fitTest.ts:962` içindeki açıklama satırı eski başlığı alıntılıyor ("vergi avantajı için gelen yanlış adreste"). Ekrana basılmıyor; iz için güncellenebilir.
