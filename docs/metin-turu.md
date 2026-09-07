# Metin turu · konuşma dilinden kurumsal dile

Müşteri iki ayrı yerden aynı şeyi söyledi:

> *"yazı dili kötü çok samimi komple değişmesi lazım"* · *"mahalle ağzı :)"*

> *"ANA sayfanın girişi fazla esnaf ağzı oldu. Bu sorunu sosyal medyada da
> görüyorum çok konuşma dili yazıyorsunuz biraz daha kurumsal olmalı."*

Bu belge **ne neydi, ne oldu, neden** sorusunu tek tek cevaplıyor.

---

## Nasıl tarandı

Göz kararı gezmedim. Kaynak dosyalardan yorumları ayıklayıp ekrana çıkan bütün
Türkçe metinleri çıkardım: **1.626 benzersiz metin, ~13.800 kelime, 120 dosya.**
Sonra bu metinleri konuşma dili işaretlerine göre taradım (emir kipi, istek kipi,
"şey", deyim listesi, retorik soru, dolgu sözcükleri) ve çıkan adayları tek tek okudum.

---

## Uygulanan yedi kural

| # | kural | örnek |
|---|---|---|
| 1 | **Emir kipiyle okura seslenmek.** Buton ve form talimatı hariç. | "teste bakın" → "Uygunluk testi" |
| 2 | **İstek / ortak-eylem kipi** bildirim kipine. | "listelensin" → "listelenir" |
| 3 | **"şey" belirsiz adı** yerine ne kastedildiği. | "üç şey" → "üç başlık" |
| 4 | **Deyim ve mecaz.** | "topun kimde olduğu" → "sorumluluğun kimde olduğu" |
| 5 | **Bölüm başlığı soru olmaz.** SSS soruları kalır. | "Bu işi kim yürütüyor?" → "Süreci yürüten ekip." |
| 6 | **Dolgu ve pekiştirme** atılır. | "tam olarak", "zaten", "her üçünde de" |
| 7 | **Doğrulanamayan iddia** metinden çıkar. | "ücretsiz danışmanlık" |

### Kasten dokunulmayanlar

- **SSS soruları.** Ziyaretçinin gerçekten sorduğu cümle odur; kurumsallaştırmak
  onları sorudan çıkarırdı. Yalnızca bölüm BAŞLIĞI olan sorular değişti.
- **Buton ve form talimatları.** "Formu doldurun", "Ülkeyi seçin" kurumsal arayüz
  dilidir, esnaf ağzı değil.
- **Ayırt edici iddialar ve rakamlar.** "Defter ve beyan taşerona gitmiyor" gibi
  cümleler firmanın farkını anlatıyor ve olgusal.
- **Hukuki çekinceler.** Banka onayı, süre ve vergi görüşü çekinceleri aynen duruyor.

---

## Düzeltmeler · toplam 88

### Ana sayfa · hero

**Önce:** Şirketinizi kurup tüm süreçlerinizi yönetiyoruz.  ·  vurgu: tüm süreçlerinizi yönetiyoruz.  
**Sonra:** Şirketinizi kuruyor, sonrasındaki süreçleri yürütüyoruz.  ·  vurgu: sonrasındaki süreçleri yürütüyoruz.  
*Neden:* "-ip" ulacı iki fiili tek nefese bağlıyordu (konuşma dili). İki bağımsız yüklem oldu. "yönetiyoruz" bir iddia, "yürütüyoruz" bir tarif. "tüm süreçlerinizi" mutlakçıydı ve sitenin kendi çekinceleriyle çelişiyordu (banka onayı garantisi yok).

> **07.09.2026 GÜNCELLEMESİ · bu satır artık canlıyı anlatmıyor.** Başlık iki
> turluk bir aday çalışmasından sonra **"Şirketinizi kuruyor, süreçlerinizi
> yönetiyoruz."** oldu (müşteri kararı, `components/Hero.tsx`).
>
> Yani yukarıdaki iki gerekçeden biri geri alındı, biri korundu ve bu bilerek:
> · **"tüm" GERİ GELMEDİ.** İtirazın asıl konusu oydu — mutlakçı olan ve
>   sitenin çekinceleriyle çelişen kelime "tüm"dü, "yönetmek" değil.
> · **"yönetiyoruz" geri geldi.** Süreci kimin yürüttüğünü söylüyor, sonucu
>   garanti etmiyor; banka onayı çekincesi bundan etkilenmiyor.
> · Nesne "şirketiniz" değil "süreçleriniz" olarak kaldı: şirketi
>   yönetmiyoruz, süreçlerini yönetiyoruz.
>
> Değişimin ikinci sebebi ölçüm: eski başlık masaüstünde üç, telefonda dört
> satıra taşıyordu. Yenisi 2 / 3. Ayrıntı `docs/durum.md`.

**Önce:** Üç ülkede de kendi ofisimizden, Türkçe yürütülür.  
**Sonra:** Üç ülkede kendi ofislerimizden, Türkçe yürütülür.  
*Neden:* "de" pekiştirmesi konuşma dili; ayrıca üç ülkede tek bir ofis yok, çoğul doğru olan.

**Önce:** Ücretsiz danışmanlık  
**Sonra:** İletişime Geç  
*Neden:* "Ücretsiz" sitede hiçbir yerde doğrulanmayan bir taahhüt. Aynı ifade kapanış CTA'sından bir tur önce aynı gerekçeyle çıkarılmıştı; hero'da kalmıştı.

### Ana sayfa · SSS

**Önce:** Durumunuza uygun mu, teste bakın  
**Sonra:** Uygunluk testi  
*Neden:* Bağlantı etiketleri emir kipiyle bitiyordu ("bakın"). Altı bağlantının hepsi ad öbeğine döndü; nereye gittiğini söylüyorlar, ziyaretçiye ne yapacağını söylemiyorlar.

**Önce:** Muhasebe ve vergi tarafına bakın  
**Sonra:** Muhasebe ve vergi  
*Neden:* "taraf" gündelik bölümleme sözcüğü; bağlantı zaten o sayfaya gidiyor.

**Önce:** Banka ve ödeme sürecine bakın  
**Sonra:** Banka ve ödeme süreci  
*Neden:* Aynı kalıp.

**Önce:** Ödeme altyapısı matrisini açın  
**Sonra:** Ödeme altyapısı matrisi  
*Neden:* Aynı kalıp.

**Önce:** Dubai sürecini inceleyin  
**Sonra:** Dubai süreci  
*Neden:* Aynı kalıp.

**Önce:** Oturum ve vize sürecine bakın  
**Sonra:** Oturum ve vize süreci  
*Neden:* Aynı kalıp.

**Önce:** Kimseden kesin süre ya da kesin onay sözü almayın.  
**Sonra:** Bu süreçte kesin süre ya da kesin onay taahhüdü verilemez.  
*Neden:* "Kimseden ... almayın" hem emir hem de rakipler hakkında üstü kapalı bir iddia. Aynı bilgi kendi çekincemiz olarak yazıldı.

**Önce:** Kategorideki firmaların çoğu ilk halkada bitiyor; ceza da, sorun da sonrasında çıkıyor.  
**Sonra:** Yükümlülükler kuruluşla bitmiyor; ceza riski de kuruluş sonrasında doğuyor.  
*Neden:* RAKİP HAKKINDA DOĞRULANAMAZ İDDİA ("kategorideki firmaların çoğu") + "bitiyor/çıkıyor" konuşma dili. Cümle artık yalnız yükümlülüğü anlatıyor ve doğrulanabilir.

**Önce:** Satın almadan önce en çok takılınan altı başlık.  
**Sonra:** Karar öncesinde en çok sorulan altı başlık.  
*Neden:* "takılınan" argoya yakın; ayrıca "satın almadan önce" satış diliydi.

### Ana sayfa · zincir

**Önce:** Kategorideki firmaların çoğu ilk halkada bitiyor. Ceza da, sorun da sonrasında çıkıyor.  
**Sonra:** Yükümlülükler kuruluşla bitmiyor. Ceza riski de kuruluş sonrasında doğuyor.  
*Neden:* SSS'teki aynı cümlenin ikinci kopyası; aynı gerekçeyle düzeltildi.

**Önce:** Şirket kurulduktan sonra başlayan iş burada.  
**Sonra:** Kuruluş sonrasında yürütülen işler.  
*Neden:* "iş burada" işaret ederek konuşma kalıbı.

### Ana sayfa · ödeme altyapısı

**Önce:** Hangi kanalın hangi ülkede çalıştığı aşağıda. Çalışmayanı da yazıyoruz.  
**Sonra:** Hangi kanalın hangi ülkede kullanılabildiği aşağıda; desteklenmeyenler de listede.  
*Neden:* "Çalışmayanı da yazıyoruz" dürüstlük vurgusunu sohbetle yapıyordu. Bilgi aynı, kip bildirim.

**Önce:** Farklı lisans ve koruma rejimine tabidir; ikisini aynı şey gibi anlatan yeri ciddiye almayın.  
**Sonra:** Farklı lisans ve koruma rejimine tabidir; ikisinin aynı şey olarak sunulması yanıltıcıdır.  
*Neden:* "ciddiye almayın" hem emir hem de başkaları hakkında yargı. Cümle artık olgunun kendisini söylüyor.

**Önce:** Şirket amaç değil. Amaç hesabın açılması ve tahsilatın çalışması.  
**Sonra:** Şirket bir araçtır; asıl sonuç hesabın açılması ve tahsilatın işlemesidir.  
*Neden:* İki eksiltili cümle (yüklem yok) konuşma ritmi kuruyordu.

### Ana sayfa · üç ülke

**Önce:** Üç ülkede kuruluş, banka ve muhasebe. Tek tek bakın ya da temel ölçütlerde yan yana koyun; ölçüt ölçüt kıyas ülkeler sayfasında.  
**Sonra:** Üç ülkede kuruluş, banka ve muhasebe. Ülkeleri tek tek inceleyebilir ya da temel ölçütlerde karşılaştırabilirsiniz; ayrıntılı kıyas ülkeler sayfasında.  
*Neden:* İki emir kipi arka arkaya ("bakın ... koyun") ve "yan yana koyun" gündelik. Cümle olanağı bildiriyor, talimat vermiyor.

### Ana sayfa · hizmetler

**Önce:** Kuruluş bir halka; zincirin tamamı bizde. Kapsam ve fiyat ülkeye göre değiştiği için, her hizmette hangi ülkeye bakacağınızı siz seçiyorsunuz.  
**Sonra:** Kuruluş zincirin yalnızca bir halkası; zincirin tamamı tek elden yürütülüyor. Kapsam ve fiyat ülkeye göre değiştiği için her hizmette ülkeyi siz seçiyorsunuz.  
*Neden:* "tamamı bizde" konuşma dilinde sahiplik bildirimi. "hangi ülkeye bakacağınızı" dolambaçlıydı, "ülkeyi" yeterli.

### Ana sayfa · profiller

**Önce:** Şirketiniz zaten var mı? Ortac'a taşıyın.  
**Sonra:** Mevcut şirketinizi Ortac'a taşıyın.  
*Neden:* "zaten" dolgu sözcüğü; retorik soru başlığı düz ifadeye döndü.

**Önce:** Mevcut kaydınızı, beyanlarınızı ve banka hareketlerinizi inceleyip geçiş planı çıkarıyoruz. Eksik varsa önce onu kapatıyoruz.  
**Sonra:** Mevcut kaydınızı, beyanlarınızı ve banka hareketlerinizi inceleyip geçiş planı çıkarıyoruz. Eksik varsa önce tamamlıyoruz.  
*Neden:* "onu kapatıyoruz" gündelik; eksik "tamamlanır", "kapatılmaz".

### Ana sayfa · fiyat özeti

**Önce:** Şirket kuruluşu her üçünde de var. Ek olarak neye ihtiyacınız olduğunu seçin, üç ülkenin tutarı aynı anda güncellensin.  
**Sonra:** Şirket kuruluşu üç ülkede de kapsam içinde. Ek olarak ihtiyaç duyduğunuz kalemleri seçtiğinizde üç ülkenin tutarı aynı anda güncellenir.  
*Neden:* "her üçünde de var" ve istek kipiyle biten "güncellensin" sohbet ritmi. Cümle artık ne olduğunu söylüyor.

### Ana sayfa · iş ortaklığı şeridi

**Önce:** Müşterilerinizin yurt dışı kuruluş, muhasebe ve banka tarafını birlikte yürütüyoruz. Süreç sizde görünür kalır.  
**Sonra:** Müşterilerinizin yurt dışı kuruluş, muhasebe ve banka süreçlerini birlikte yürütüyoruz. Süreç size açık kalır.  
*Neden:* "taraf" gündelik bölümleme; "sizde görünür kalır" muğlaktı, "size açık kalır" ne olduğunu söylüyor.

### Ana sayfa · duruş

**Önce:** Durumunuza uygun mu, 6 soruda bakalım  
**Sonra:** Uygunluğunuzu 6 soruda ölçün  
*Neden:* "bakalım" ortak-eylem kipi, düpedüz sohbet dili. Düğme metni artık ne yaptığını söylüyor.

### Ana sayfa · araçlar ve kaynaklar

**Önce:** Kullanıp götüreceğiniz araçlar, rehberler ve güncel mevzuat.  
**Sonra:** Kullanabileceğiniz araçlar, rehberler ve güncel mevzuat.  
*Neden:* "kullanıp götüreceğiniz" pazar diline en yakın ifadelerden biriydi.

### Araçlar sayfası · giriş

**Önce:** Kullanın, çıktısı sizde kalsın.  ·  vurgu: çıktısı sizde kalsın.  
**Sonra:** Araçlar, çıktısı sizde kalır.  ·  vurgu: çıktısı sizde kalır.  
*Neden:* Emir kipi + istek kipi ("Kullanın, ... kalsın") başlığı sohbete çeviriyordu. Bildirim kipi aynı bilgiyi veriyor.

**Önce:** Buradaki araçlar bizim satış yardımcılarımız değil, sizin işinizi gören şeyler: bir hesap, bir liste, bir takvim. Her biri kendi sayfasında; hepsi tarayıcınızda çalışıyor ve hiçbiri girdiğiniz bilgiyi bize göndermiyor.  
**Sonra:** Buradaki araçlar bir satış aracı değil, işinizi kolaylaştıran uygulamalar: bir hesaplama, bir liste, bir takvim. Her biri kendi sayfasında; hepsi tarayıcınızda çalışıyor ve girdiğiniz bilgiyi bize göndermiyor.  
*Neden:* "bizim ... -mız" + "sizin ... şeyler" iki kat samimiyet. "şey" belirsiz ad; yerine ne olduğu yazıldı. "hiçbiri ... göndermiyor" ikili olumsuzlama sadeleşti.

### Araçlar · kayıt defteri

**Önce:** Bir sayı sorup bir sayı alıyorsunuz. Huninin en tepesi: arama sonuçlarından gelen kişi buraya iniyor.  
**Sonra:** Bir değer giriyor, karşılığında bir sonuç alıyorsunuz.  
*Neden:* İKİNCİ CÜMLE İÇ JARGONDU VE EKRANA SIZMIŞTI: "huninin en tepesi", "arama sonuçlarından gelen kişi" pazarlama defterinin dili, ziyaretçiye söylenecek şey değil.

**Önce:** Seçenekleri daraltıyor. Cevabı sizde kalıyor, bir sonraki adımı siz seçiyorsunuz.  
**Sonra:** Seçenekleri daraltır; kararı ve sonraki adımı siz verirsiniz.  
*Neden:* İki kısa cümle bir cümlede toplandı, "kalıyor" konuşma dilinden bildirim kipine döndü.

**Önce:** Şirket kurulduktan sonra işe yarayanlar: tarih, takvim, liste.  
**Sonra:** Kuruluş sonrasında kullanılanlar: tarih, takvim, liste.  
*Neden:* "işe yarayanlar" gündelik; "kullanılanlar" aynı şeyi nötr söylüyor.

**Önce:** çıkan şey bir kısa liste  
**Sonra:** çıktı bir kısa liste  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

**Önce:** İki yapının vergi yükünü aynı kazanç üzerinden yan yana koyar.  
**Sonra:** İki yapının vergi yükünü aynı kazanç üzerinden karşılaştırır.  
*Neden:* "yan yana koymak" gündelik; "karşılaştırır" aracın ne yaptığını söylüyor.

**Önce:** İki yapıyı maliyet, sahiplik ve ofis şartı ekseninde yan yana koyar.  
**Sonra:** İki yapıyı maliyet, sahiplik ve ofis şartı ekseninde karşılaştırır.  
*Neden:* Aynı kalıbın ikinci kopyası.

### Ülkeler sayfası · başlık

**Önce:** Nerede kuracağınıza önce burada karar verin.  ·  vurgu: burada karar verin.  
**Sonra:** Kuruluş ülkesine karar vermeden önce.  ·  vurgu: karar vermeden önce.  
*Neden:* Sayfa başlığı emir kipiyle okura sesleniyordu. Ad öbeği aynı işi yapıyor ve başlık gibi okunuyor.

### E-kitaplar · başlık

**Önce:** E-kitapları indirin, yanınızda götürün.  
**Sonra:** E-kitapları indirin, çevrimdışı okuyun.  
*Neden:* "yanınızda götürün" pazar dili; ayrıca ne yapılacağını söylemiyordu. PDF'in gerçek faydası çevrimdışı okunabilmesi.

**Önce:** yanınızda götürün.  
**Sonra:** çevrimdışı okuyun.  
*Neden:* BENİM AÇTIĞIM İKİNCİ KIRIK: başlığı değiştirip vurguyu unutmuştum. PageHero vurgunun SONEK olmasını şart koşuyor (title.endsWith); tutmayınca başlık sessizce vurgusuz basılıyordu.

### Ülke sayfası · profil bölümü

**Önce:** Profilinizi seçin, cevabı burada verelim.  
**Sonra:** Profilinizi seçin, karşılığı aşağıda.  
*Neden:* "cevabı burada verelim" ortak-eylem kipi; iki kişilik bir sohbet kuruyordu.

### Ülke sayfası · süreç

**Önce:** Her adımda topun kimde olduğu yazıyor; tıklayın, durur.  
**Sonra:** Her adımda sorumluluğun kimde olduğu yazıyor; tıklandığında akış durur.  
*Neden:* SPOR DEYİMİ ("topun kimde olduğu") en belirgin esnaf ağzı örneklerinden biriydi. "tıklayın, durur" da eksiltili konuşma kalıbıydı.

### Ülke sayfası · SSS

**Önce:** Kendi durumunuzu ücretsiz danışmanlıkta sorun.  
**Sonra:** Kendi durumunuzu görüşmede sorabilirsiniz.  
*Neden:* "ücretsiz" sitede doğrulanmayan bir taahhüt (hero ve kapanış CTA'sında da aynı gerekçeyle çıkarıldı); emir kipi de olanak bildirimine döndü.

### Kariyer · form

**Önce:** Pozisyonu işaretleyin, size nasıl döneceğimizi bırakın.  
**Sonra:** Pozisyonu işaretleyin, size nasıl ulaşabileceğimizi yazın.  
*Neden:* "nasıl döneceğimizi bırakın" hem gündelik hem de anlamı belirsizdi (ne bırakılacak?).

### Sektörler · kapanış

**Önce:** Dördü de tam oturmuyorsa: ürününüzü, ekibinizi ve tahsilat kanalınızı anlatın, hangisinin işinize yaradığını birlikte netleştirelim.  
**Sonra:** Dördü de tam uymuyorsa ürününüzü, ekibinizi ve tahsilat kanalınızı iletin; hangisinin uygun olduğunu birlikte belirleyelim.  
*Neden:* "tam oturmuyorsa" ve "işinize yaradığını" gündelik; iki nokta üst üste ile başlayan eksiltili kurulum da konuşma ritmiydi.

### Paketler · giriş

**Önce:** Ülkeyi seçin, paketler ona göre listelensin.  
**Sonra:** Ülkeyi seçin; paketler ona göre listelenir.  
*Neden:* İstek kipi ("listelensin") arayüzün ne yapacağını dilek gibi anlatıyordu.

### Araç · BAE kurumlar vergisi

**Önce:** Kazancınızı yazın; eşiğin altı ve üstü ayrı hesaplanıp toplam vergi ve efektif oran çıksın.  
**Sonra:** Kazancınızı yazın; eşiğin altı ve üstü ayrı hesaplanır, toplam vergi ile efektif oran gösterilir.  
*Neden:* İstek kipi ("çıksın") bildirim kipine döndü.

### Araç · BAE KDV

**Önce:** Tutarı yazın; matrah, KDV ve toplam üç satır hâlinde çıksın.  
**Sonra:** Tutarı yazın; matrah, KDV ve toplam üç satır hâlinde gösterilir.  
*Neden:* Aynı istek kipi kalıbı.

### Marka künyesi

**Önce:** AB üyesi değil, Güney Kıbrıs ile aynı şey değil  
**Sonra:** AB üyesi değil; Güney Kıbrıs ile aynı ülke değil  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

### Ülke içerikleri

**Önce:** Güney Kıbrıs ile aynı şey değil  
**Sonra:** Güney Kıbrıs ile aynı ülke değil  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

**Önce:** Dubai'de karıştırılan üç şey.  
**Sonra:** Dubai'de sık karıştırılan üç başlık.  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

**Önce:** İngiltere'de karıştırılan üç şey.  
**Sonra:** İngiltere'de sık karıştırılan üç başlık.  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

**Önce:** KKTC'de karıştırılan dört şey.  
**Sonra:** KKTC'de sık karıştırılan dört başlık.  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

**Önce:** İki tarafı birlikte kurgulamadan karar vermeyin; kişiye özel vergi görüşü vermiyoruz.  
**Sonra:** İki taraf birlikte değerlendirilmeden karar verilmesi risklidir; kişiye özel vergi görüşü vermiyoruz.  
*Neden:* Okura doğrudan yasak koyan emir kipi ("karar vermeyin") yerine riskin kendisi yazıldı.

**Önce:** Global platformlarda satış yapacaksanız ve kart tahsilatı ana kanalınızsa mantıklı değil.  
**Sonra:** Global platformlarda satış yapacaksanız ve kart tahsilatı ana kanalınızsa uygun değil.  
*Neden:* "mantıklı değil" gündelik bir yargı; "uygun değil" aynı sonucu ölçüte bağlıyor.

**Önce:** Kimliğin renkli taraması, adres beyanı ve şirket adı sizden geliyor.  
**Sonra:** Kimliğin renkli taraması, adres beyanı ve şirket adı sizden alınıyor.  
*Neden:* "sizden geliyor" konuşma dili; süreci anlatan bölümde "alınıyor" doğru fiil.

**Önce:** Kimliğin renkli taraması, adres beyanı ve faaliyet konusu tarifi sizden geliyor.  
**Sonra:** Kimliğin renkli taraması, adres beyanı ve faaliyet konusu tarifi sizden alınıyor.  
*Neden:* Aynı kalıbın ikinci kopyası.

### Sektörler

**Önce:** Yazılımda kuruluş kararını dört şey veriyor.  
**Sonra:** Yazılımda kuruluş kararını dört ölçüt belirliyor.  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

**Önce:** satan taraf, sattığı şeyin sahibi olduğunu gösteremiyor  
**Sonra:** satan taraf, sattığı ürünün sahibi olduğunu gösteremiyor  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

### Ofisler · iletişim kanalları

**Önce:** Anlatması yazmaktan kısa olan her şey: tek soru, kısa teyit, randevu.  
**Sonra:** Anlatması yazmaktan kısa olan konular: tek soru, kısa teyit, randevu.  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

**Önce:** Ek belge, sözleşme, resmî yazışma: iz bırakması gereken her şey.  
**Sonra:** Ek belge, sözleşme, resmî yazışma: iz bırakması gereken her konu.  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

### Hakkımızda

**Önce:** Bunun arkasında üç somut şey var:  
**Sonra:** Bunun arkasında üç somut dayanak var:  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

### Dubai muhasebe

**Önce:** Banka hesap incelemesinde ya da bir denetim talebinde istenen şey hep aynı: güncel mali tablolar ve onları destekleyen belgeler.  
**Sonra:** Banka hesap incelemesinde ya da bir denetim talebinde istenen belgeler hep aynı: güncel mali tablolar ve onları destekleyen kayıtlar.  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

**Önce:** İstenen şey hep aynı: güncel mali tablolar ve dayanak belgeler.  
**Sonra:** İstenen belgeler hep aynı: güncel mali tablolar ve dayanak kayıtları.  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

**Önce:** Şartın sağlandığını gösteren şey de kayıtların kendisi.  
**Sonra:** Şartın sağlandığını gösteren de kayıtların kendisi.  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

### Menü

**Önce:** Aşağıdaki her şey seçtiğiniz ülkeye göre değişiyor  
**Sonra:** Aşağıdaki başlıklar seçtiğiniz ülkeye göre değişiyor  
*Neden:* "şey" belirsiz bir ad; ne kastedildiği yazılınca cümle hem kurumsallaşıyor hem bilgilendiriyor.

### Hesaplayıcı

**Önce:** veya ücretsiz danışmanlık planlayın  
**Sonra:** veya görüşme planlayın  
*Neden:* "ücretsiz" sitede doğrulanmayan bir taahhüt; dördüncü ve son geçtiği yer burasıydı.

**Önce:** Ülke ve faaliyetinizi seçin; kuruluş, vize ve banka kalemleri ile yıllık yenileme tutarı kalem kalem çıkar.  
**Sonra:** Ülke ve faaliyetinizi seçin; kuruluş, vize ve banka kalemleri ile yıllık yenileme tutarı kalem kalem listelenir.  
*Neden:* "çıkar" gündelik; hesabın çıktısı "listelenir".

### İş ortaklığı

**Önce:** Kategorideki firmaların çoğu ilk halkada bitiyor; ceza da, sorun da sonrasında çıkıyor. Yönlendirdiğiniz müşteri kuruluştan sonra da aynı ekipte kalıyor.  
**Sonra:** Yükümlülükler kuruluşla bitmiyor; ceza riski de kuruluş sonrasında doğuyor. Yönlendirdiğiniz müşteri kuruluştan sonra da aynı ekiple çalışmaya devam ediyor.  
*Neden:* Rakipler hakkında doğrulanamaz iddianın üçüncü ve son kopyası. Ana sayfada iki, burada bir kez geçiyordu.

**Önce:** Müşteriniz her aşamada aynı kişiyle konuşuyor; anlattığı şeyi ikinci kez anlatmak zorunda kalmıyor. Yönlendirdiğiniz kişinin size geri dönüp şikâyet etmesinin en sık sebebi budur.  
**Sonra:** Müşteriniz her aşamada aynı kişiyle konuşuyor; anlattıklarını ikinci kez anlatmak zorunda kalmıyor. Yönlendirdiğiniz kişinin geri dönüp şikâyet etmesinin en sık sebebi budur.  
*Neden:* "anlattığı şeyi" belirsiz ad; "size geri dönüp" fazlalıktı.

### Sektörler · giriş

**Önce:** Soru şu: yazılım işiniz için Dubai, İngiltere ve KKTC'den hangisi mantıklı? Sayfa bunu dört adımda kapatıyor: önce kararı veren dört şey, sonra üç ülke yan yana, sonra her ülkenin kendi ayrıntısı, en sonda da bu işte Ortac'ın ne yaptığı.  
**Sonra:** Yazılım işi için Dubai, İngiltere ve KKTC'den hangisinin uygun olduğu dört adımda ele alınıyor: kararı belirleyen dört ölçüt, üç ülkenin karşılaştırması, her ülkenin ayrıntısı ve Ortac'ın bu süreçteki rolü.  
*Neden:* "Soru şu:" ile açılan retorik soru, "kapatıyor" gündelik fiili ve "dört şey" belirsiz adı birlikte sayfayı sohbete çeviriyordu. Bilgi ve sıralama aynen korundu.

### Blog kategori

**Önce:** Bir ülke hakkında bugün yayında olan her şey kendi sayfasında  
**Sonra:** Bir ülke hakkında bugün yayında olan içeriklerin tamamı kendi sayfasında  
*Neden:* "her şey" belirsiz ad.

### Dubai muhasebe · bölüm başlıkları

**Önce:** Kim yapıyor, ne yapıyor, hangi ay ne oluyor, ne kadar tutuyor.  
**Sonra:** Kimin yaptığı, neyi kapsadığı, hangi ayda ne yapıldığı ve bedeli.  
*Neden:* Dört yüklemli eksiltili sayım konuşma ritmiydi; ad öbeğine döndü, sıralama ve bilgi aynı.

**Önce:** Muhasebe ne zaman başlıyor, hangi ay ne oluyor?", accent: "hangi ay ne oluyor?  
**Sonra:** Muhasebe ne zaman başlıyor, hangi ayda ne yapılıyor.", accent: "hangi ayda ne yapılıyor.  
*Neden:* Bölüm BAŞLIĞI sohbet sorusuydu. SSS soruları kalıyor (ziyaretçinin gerçekten sorduğu şey odur), ama bölüm başlıkları bölümün adını söylemeli. Vurgu (accent) da başlığın sonuyla eşleşmek zorunda; ikisi birlikte değişti.

**Önce:** İlk 12 ayda iş hangi aylarda çıkıyor?  
**Sonra:** İlk 12 ayda yükümlülüklerin aylara dağılımı  
*Neden:* "iş ... çıkıyor" gündelik; şerit zaten yükümlülüklerin takvimi.

**Önce:** Muhasebe hizmetimiz tam olarak neyi kapsıyor?", accent: "tam olarak neyi kapsıyor?  
**Sonra:** Muhasebe hizmetinin kapsamı.", accent: "kapsamı.  
*Neden:* "tam olarak" konuşmada güven veren bir pekiştirme, yazıda dolgu. Başlık ad öbeğine döndü.

**Önce:** Beş aşama. Başlığa dokunun, o aşamada ne olduğu açılsın.  
**Sonra:** Beş aşama. Başlığa dokunduğunuzda o aşamanın ayrıntısı açılır.  
*Neden:* İstek kipi ("açılsın") bildirim kipine döndü.

**Önce:** Siz ne veriyorsunuz, biz ne veriyoruz?  
**Sonra:** Kimin neyi sağladığı.  
*Neden:* "Siz ... biz ..." karşılıklı konuşma kurgusu, başlıkta en samimi kalıplardan biri.

**Önce:** Düzenli muhasebe neyi değiştiriyor?", accent: "neyi değiştiriyor?  
**Sonra:** Düzenli muhasebenin karşılığı.", accent: "karşılığı.  
*Neden:* Bölüm BAŞLIĞI sohbet sorusuydu. SSS soruları kalıyor (ziyaretçinin gerçekten sorduğu şey odur), ama bölüm başlıkları bölümün adını söylemeli. Vurgu (accent) da başlığın sonuyla eşleşmek zorunda; ikisi birlikte değişti.

**Önce:** Muhasebe tarafında ne kadar ödüyorsunuz?", accent: "ne kadar ödüyorsunuz?  
**Sonra:** Muhasebe hizmetinin bedeli.", accent: "bedeli.  
*Neden:* "taraf" gündelik bölümleme + doğrudan soru. Bölüm BAŞLIĞI sohbet sorusuydu. SSS soruları kalıyor (ziyaretçinin gerçekten sorduğu şey odur), ama bölüm başlıkları bölümün adını söylemeli. Vurgu (accent) da başlığın sonuyla eşleşmek zorunda; ikisi birlikte değişti.

**Önce:** Bu işi kim yürütüyor?", accent: "kim yürütüyor?  
**Sonra:** Süreci yürüten ekip.", accent: "yürüten ekip.  
*Neden:* "Bu işi" işaret ederek konuşma kalıbı. Bölüm BAŞLIĞI sohbet sorusuydu. SSS soruları kalıyor (ziyaretçinin gerçekten sorduğu şey odur), ama bölüm başlıkları bölümün adını söylemeli. Vurgu (accent) da başlığın sonuyla eşleşmek zorunda; ikisi birlikte değişti.

### Kuruluş sonrası

**Önce:** Şirket kurulduktan sonra sizi neler bekliyor?", accent: "sizi neler bekliyor?  
**Sonra:** Kuruluş sonrasında sizi bekleyen yükümlülükler.", accent: "sizi bekleyen yükümlülükler.  
*Neden:* Bölüm başlığı sohbet sorusuydu; ad öbeğine döndü. Vurgu da başlığın sonuyla eşleşecek biçimde güncellendi.

**Önce:** Kuruluş yalnızca ilk adım: sonrasında muhasebe, vergi ve lisans tarafında tekrar eden yükümlülükler başlıyor. Hepsini rakamıyla birlikte baştan yazıyoruz ki sonradan sürpriz maliyet çıkmasın.  
**Sonra:** Kuruluş yalnızca ilk adım: sonrasında muhasebe, vergi ve lisans başlıklarında tekrar eden yükümlülükler doğuyor. Tamamı rakamıyla birlikte baştan yazılıyor; sonradan beklenmeyen bir maliyet çıkmıyor.  
*Neden:* "taraf" gündelik bölümleme, "ki ... çıkmasın" konuşma bağlacı, "sürpriz maliyet" pazarlama argosu.

**Önce:** İlk yılın sonunda toplam ne çıkıyor?  
**Sonra:** İlk yılın toplam maliyeti  
*Neden:* "ne çıkıyor" gündelik; başlık artık neyi gösterdiğini söylüyor.

### Blog · yazı başlığı

**Önce:** "İlk yılın sonunda toplam ne çıkıyor?" }  
**Sonra:** "İlk yılın toplam maliyeti" }  
*Neden:* Aynı başlığın yazı içindeki kopyası.

### Ülke içerikleri · SSS

**Önce:** Kimler için mantıklı değil?  
**Sonra:** Kimler için uygun değil?  
*Neden:* "mantıklı" gündelik bir yargı sözcüğü; ölçüte bağlı "uygun" doğru karşılığı.

### Menü · araçlar paneli

**Önce:** Hangi ülke size uyuyor, emin değil misiniz?  
**Sonra:** Hangi ülkenin uygun olduğundan emin değilseniz  
*Neden:* Menüdeki bu satır ziyaretçiye doğrudan soru soruyordu; koşul cümlesi aynı işi sohbet kurmadan yapıyor.

### Sektörler · karar bölümü

**Önce:** dört şey veriyor.  
**Sonra:** dört ölçüt belirliyor.  
*Neden:* BENİM AÇTIĞIM KIRIK: başlığı değiştirip vurguyu unutmuştum. SplitWords vurguyu `indexOf` ile arıyor, bulamayınca sessizce vurgusuz basıyordu — hata vermeyen türden bir bozulma.

**Önce:** Ürün dijital olduğu için depo, mağaza ve yerel stok denklemden çıkıyor. Geriye bu dört başlık kalıyor ve dördü de kuruluş anında karar istiyor. Özet burada; ayrıntısını merak eden satırı açsın.  
**Sonra:** Ürün dijital olduğu için depo, mağaza ve yerel stok denklemden çıkıyor. Geriye bu dört başlık kalıyor ve dördü de kuruluş anında karar istiyor. Özeti aşağıda; ayrıntı için satırı açabilirsiniz.  
*Neden:* "merak eden satırı açsın" hem üçüncü kişiye seslenme hem istek kipi.

### İletişim · form

**Önce:** Bir ülke işaretleyin. Karar vermediyseniz son kutu da geçerli bir cevap.  
**Sonra:** Bir ülke işaretleyin. Karar vermediyseniz son seçenek de geçerlidir.  
*Neden:* "son kutu da geçerli bir cevap" eksiltili konuşma kalıbı; ayrıca ekranda "kutu" değil seçenek var.

**Önce:** Ülkeyi ve konuyu işaretleyin. Cümleniz burada kurulacak.  
**Sonra:** Ülkeyi ve konuyu işaretleyin. Talebiniz burada özetlenecek.  
*Neden:* "Cümleniz burada kurulacak" mecazlı ve gündelik; alan gerçekte talebin özetini gösteriyor.

**Önce:** Ne kadar yazarsanız ilk dönüş o kadar isabetli olur.  
**Sonra:** Ayrıntı arttıkça ilk dönüş de o ölçüde isabetli olur.  
*Neden:* "Ne kadar ... o kadar" atasözü kalıbı, konuşma dilinin en tanıdık yapılarından.

---

## Dürüstlük notları

**İki kırığı kendim açtım ve kendim yakaladım.** Başlık metnini değiştirip yanındaki
`accent` (vurgulanan yarı) değerini güncellemeyi iki yerde unuttum: `sectors.ts` ve
`/e-kitaplar`. İkisi de HATA VERMEYEN türden: `SplitWords` vurguyu bulamayınca
sessizce vurgusuz basıyor, `PageHero` da öyle. Otuz iki başlık/vurgu çiftinin hepsini
tarayan bir sınamayla bulundu ve düzeltildi; sınama artık sıfır uyumsuzluk veriyor.

**İki düzeltme şu an ekranda görünmüyor.** `Stance` ve `ToolsResources` bileşenleri
bir önceki turlarda ana sayfadan çıkarılmış ve hiçbir rotadan erişilmiyor (ölü kod
taramasında ikisi de listede). Metinleri yine de düzelttim ki bir gün geri gelirlerse
eski dille dönmesinler, ama bugün bir şeyi değiştirmiyorlar.

**"Ücretsiz danışmanlık" dört yerden çıktı.** Bu bir üslup düzeltmesi değil: ücretsiz
olduğu sitenin hiçbir yerinde yazılı değil ve firma adına verilmiş bir taahhüt.
Kapanış CTA'sından bir önceki turda aynı gerekçeyle çıkarılmıştı; hero, ülke SSS'i
ve hesaplayıcıda kalmıştı.

**Rakip hakkındaki iddia üç kopyadan da silindi.** "Kategorideki firmaların çoğu ilk
halkada bitiyor" cümlesi ana sayfada iki, iş ortaklığı sayfasında bir yerde geçiyordu.
Doğrulanamaz ve gereksiz: aynı bilgi kendi yükümlülüğümüz olarak yazılınca hem
kurumsal hem savunulabilir oluyor.

**İç jargon ekrana sızmıştı.** `/araclar` sayfasında "Huninin en tepesi: arama
sonuçlarından gelen kişi buraya iniyor" yazıyordu. Bu pazarlama defterinin dili,
ziyaretçiye söylenecek cümle değil.
