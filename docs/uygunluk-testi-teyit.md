# Uygunluk testi · Murat abiye sorulacaklar

Bu belge tek bir işaretin karşılığı: `src/lib/fitTest.ts` içindeki **`SWAP:FIT_WEIGHTS`**.

## Neden bu teyide ihtiyaç var

Test, ziyaretçinin cevaplarını puanlayıp bir ülkeyi öne çıkarıyor. Hangi ülkenin
çıkacağını **tamamen o puanlar belirliyor** ve puanları bugün kimse onaylamadı.
Yani test şu an açık, ama söylediği şeyin arkasında firmanın imzası yok.

## Bu turda ne değişti: beş soru dokuz oldu

Müşterinin isteği üzerine anket derinleşti. Dört yeni soru geldi (`kanal`,
`platform`, `banka`, `sure`), `vize` sorusuna üçüncü bir seçenek eklendi ve
sorular üç bölüme ayrıldı. **Eski beş sorunun ağırlıklarına dokunulmadı.**

Ölçüm yeniden çalıştırıldı: artık 192 değil **10.368** olası cevap kombinasyonu var
ve hepsi tek tek puanlandı.

| | eski (5 soru · 192 kombinasyon) | yeni (9 soru · 10.368 kombinasyon) |
|---|---|---|
| Dubai birinci | 101 (%53) | 5.639 (**%54,4**) |
| İngiltere birinci | 76 (%40) | 4.490 (**%43,3**) |
| **KKTC birinci** | 15 (%8) | **239 (%2,3)** |
| Teorik tavan | Dubai 15 · İng 14 · KKTC 10 | Dubai 24 · İng **26** · KKTC **13** |
| Beraberlik | 20 | 754 (üçlü beraberlik 26) |
| Beraberliği kazanan | Dubai 16/20 | Dubai 685 · İngiltere 69 · **KKTC 0** |
| Tek cevapla sıra dönerdi | 156 (%81) | 7.632 (%73,6) |

### En kritik satır: KKTC daha da geriledi

Soruları derinleştirmek KKTC'nin açığını **kapatmadı, büyüttü**: %8'den %2,3'e
düştü ve tavanı artık lider tavanının yarısı (13'e karşı 26).

Bunun sebebi bir kodlama hatası değil, sitenin kendi içeriği. Dört yeni sorunun
dördü de **küresel erişim** sorusu ve sitede o dört başlıkta KKTC'nin karşılığı
yok ya da açıkça olumsuz:

| yeni soru | dayandığı yer | KKTC'nin sitedeki durumu |
|---|---|---|
| `kanal` tahsilat | `brand.ts · PAY_MATRIX` Tahsilat grubu | Stripe ve PayPal ✗. KKTC sayfası: “Ana kısıt bu.” |
| `platform` satış | `countryContent · KKTC watchouts` ve `fitTable` | “Bazı yurt dışı platformlar KKTC şirketini kabul etmiyor.” |
| `banka` ihtiyacı | `PAY_MATRIX` Banka hesabı ve Ödeme kuruluşu grupları | Wise ve Payoneer ✗; yerel banka ✓ ama açılışta yerinde imza |
| `sure` takvim | `brand.ts · FACTS.days` | 5-10 gün, üç ülkenin ortası |

Yani soru ne kadar somutlaşırsa KKTC o kadar geriliyor. **Bu bir bulgu, karar
değil.** İki ihtimalden biri doğru ve ikisini ayıran şey aşağıdaki A2:

1. Site KKTC'yi eksik anlatıyor (avantajları yazılmamış), ya da
2. KKTC gerçekten dar bir niş ve test bunu doğru söylüyor.

### KKTC hangi yollarda kazanıyor

Birinci çıktığı 239 kombinasyonun neredeyse tamamı tek bir profil:

| soru | KKTC'nin kazandığı 239 durumdaki dağılım |
|---|---|
| Müşteri konumu | **Türkiye 217** · diğer üçü toplam 22 |
| Seyahat | **gidebilirim 213** · uzaktan 26 |
| Platform satışı | **hayır 196** · evet 43 |
| Tahsilat kanalı | **havale 178** · belirsiz 57 · kart 4 |
| Banka ihtiyacı | **yerel 148** · kurumsal 58 · ödeme 33 |

Tek cümlesi: **Türkiye'ye satan, seyahat edebilen, platformda satmayan, kartla
tahsilat yapmayan iş.** Firma "KKTC'yi bundan daha geniş bir yelpazede
satıyoruz" diyorsa ağırlıklar yanlış demektir.

### Hangi soru gerçekten karar veriyor

Her soru için "yalnızca bu sorunun cevabı değişse birinci değişir miydi":

| soru | sırayı çevirebildiği kombinasyon |
|---|---|
| Seyahat | %50,5 |
| Oturum vizesi | %40,0 |
| Bütçe | %39,8 |
| Müşteri konumu | %34,9 |
| Faaliyet | %33,1 |
| Banka ihtiyacı | %26,5 |
| Takvim | %19,2 |
| Platform satışı | %8,5 |
| Tahsilat kanalı | %5,0 |

`kanal` ve `platform` en zayıf iki kaldıraç: ikisi de Dubai ile İngiltere'ye
birlikte puan verdiği için aralarındaki sırayı bozmuyorlar, yalnızca KKTC'yi
geriye itiyorlar. Bu tasarım gereği mi, teyit gerekiyor.

---

## A · Önce zemin: gerçek nedir?

Bu üç cevap gelmeden tek tek puanları konuşmak erken. Ağırlıkların ne olması
gerektiğini bu üçü belirliyor.

**A1. Kapanan işlerin ülkelere gerçek dağılımı nedir?**
Kabaca yüzde yeter. Eğer iş zaten %70 Dubai ise, testin %54 Dubai demesi bir kusur
değil, doğru davranış. Dağılım dengeliyse ağırlıklar yanlış demektir.

**A2. KKTC sattığımız bir ürün mü, kabul ettiğimiz bir niş mi?**
Bu turda daha da kritik hâle geldi: aktif olarak öneriyorsak %2,3 savunulamaz ve
düzeltilmesi gereken şey ağırlık değil, sitedeki KKTC içeriği. Yalnızca özellikle
isteyene yapıyorsak %2,3 gerçeği anlatıyor olabilir.

**A3. Kesin eleyici var mı?**
"Şu koşulda o ülkeyi asla önermeyiz" diyebileceğimiz durumlar. Bugün testte
fiilen **iki** tane var, ikisi de en yüksek ağırlığı (4) taşıyor:

- *"Her şey uzaktan olmalı"* → İngiltere +4, diğer ikisine 0
- *"Vize kendim ve ekibim için"* → Dubai +4, diğer ikisine 0 **(bu turda eklendi)**

İkisi de tek cevapla iki ülkeyi eliyor. Başka eleyiciler varsa puanla değil,
kuralla modellenmeli; bu ikisi yanlışsa 4'ler düşürülmeli.

---

## B · Soru soru teyit

### Yeni sorular (bu turda eklendi)

#### ⚠️ B0-a. `kanal` ile `banka` aynı olguyu iki kez sayıyor olabilir

`kanal` müşterinin size nasıl ödediğini soruyor (PAY_MATRIX · Tahsilat),
`banka` şirketin parasının nerede durduğunu (PAY_MATRIX · Banka hesabı ve Ödeme
kuruluşu). Matris bunları ayrı gruplara bölmüş, o yüzden iki ayrı soru olarak
soruldu. Ama pratikte kartla tahsilat yapan bir işletme neredeyse her zaman ödeme
kuruluşu hesabı da istiyor, yani ikisi birlikte Dubai ve İngiltere'ye 5-6 puan
birden verebiliyor.

**Soru:** Bu iki soruyu ayrı ayrı sormak doğru mu, yoksa tek soruya mı
indirilmeli? Ayrı kalacaksa ikisinden birinin ağırlığı düşürülmeli mi?

#### ⚠️ B0-b. `platform` sorusunda Dubai'ye 2 puan

Bugün: *"Evet, platformlarda satacağım"* → İngiltere 3, **Dubai 2**, KKTC 0.

İngiltere'nin 3'ü sitenin kendi cümlesi ("Ltd yapısı Avrupa'daki müşteri ve
platformlarda sorunsuz kabul görür"). Dubai'nin 2'si ise dolaylı: KKTC'nin
"Global platformda satış" satırı ziyaretçiyi Dubai'ye yolluyor.

**Soru:** Platformda satan birine Dubai'yi öneriyor muyuz? Öneriyorsak neden;
önermiyorsak 0 olmalı.

#### ⚠️ B0-c. `sure` sorusunda KKTC'ye 1 puan

Bugün: *"En kısa sürede"* → İngiltere 3, **KKTC 1**, Dubai 0.

Puan doğrudan `FACTS.days` sıralamasını izliyor (İngiltere 3-7, KKTC 5-10, Dubai
7-14 gün).

**Soru:** Bu tipik süreler güncel mi? Değişirse bu sorunun puanı doğrudan
değişir. Ayrıca "acele" gerçek bir seçim kriteri mi, yoksa herkes acele mi diyor?

#### B0-d. `vize` üçüncü seçeneği: "kendim ve ekibim için"

Bugün: **Dubai 4**, diğer ikisi 0. Gerekçe: yalnızca Dubai sayfası çalışan
vizesinden söz ediyor, geniş kotayı mainland yapısına bağlıyor; İngiltere ve
KKTC'de şirket sahipliği oturum hakkı doğurmuyor.

**Soru:** Ekip vizesi gerçekten sadece Dubai'de mi mümkün? Öyleyse 4 doğru,
değilse düşürülmeli. (A3'teki ikinci eleyici bu.)

### Eski sorular (ağırlıkları değişmedi, şüpheler duruyor)

#### ⚠️ B1. Bütçe sorusu · KKTC iki bantta birden puan alıyor
Bugün: *"Mümkün olan en düşük"* → İngiltere 3, **KKTC 2**. Ayrıca *"Orta"* → KKTC 2.

KKTC hem "en düşük" hem "orta" bantta aynı puanı alıyor. İkisi birden doğru olamaz.
**Soru:** KKTC gerçekte düşük bütçeli mi, orta bütçeli mi? Orta ise "en düşük"
bandındaki 2 puan 0 ya da 1 olmalı.

#### ⚠️ B2. Seyahat sorusu · testin en güçlü kaldıracı
Bugün: *"Hayır, her şey uzaktan olmalı"* → **İngiltere 4**, Dubai 0, KKTC 0.

Ölçüm bunu doğruladı: sırayı en çok çeviren soru bu (%50,5).

**Soru:** Dubai'de hiçbir senaryoda %100 uzaktan kuruluş mümkün değil mi? Banka
imzası ve vize biyometrisi için gelmek gerçekten şart mı, yoksa istisnası var mı?
Eğer istisna varsa 4 fazla; yoksa doğru ve dokunmayacağız.

#### ⚠️ B3. Müşteri konumu · Avrupa cevabında Dubai'ye 1 puan
Bugün: *"Avrupa ve İngiltere"* → İngiltere 3, **Dubai 1**.

**Soru:** Avrupa müşterisi olan birine Dubai'yi öneriyor muyuz? Öneriyorsak neden,
o 1 puanın gerekçesi ne? Önermiyorsak 0 olmalı.

#### ⚠️ B4. Vize sorusu · "sadece şirket" cevabında KKTC'ye 1 puan
Bugün: *"Hayır, sadece şirket"* → İngiltere 2, **KKTC 1**.

**Soru:** Vize istemeyen biri için KKTC'nin İngiltere'ye göre bir üstünlüğü var mı?
Yoksa 0 olmalı.

#### B5. Faaliyet sorusu · kapsanmayan sektörler
*"Ne satıyorsunuz?"* sorusunda dört seçenek var: yazılım, e-ticaret, danışmanlık ve
**"Başka bir alan"**. Sonuncusunun ağırlığı bilerek **sıfır**, çünkü gayrimenkul,
turizm, sağlık, finans gibi alanlar için üç ülkeyi ayıran doğrulanmış bir kuralımız yok.

**Soru:** Bu alanlarda net bir tercih var mı? (Örn. "gayrimenkulde Dubai", "turizmde
KKTC".) Varsa seçenek bölünüp puanlanabilir; yoksa sıfır kalması doğru.

### Sorulmayan sorular ve nedenleri

Bu turda değerlendirilip **bilerek eklenmeyen** sorular, çünkü cevabı sitede
kullanılamıyordu:

- **"Şirketi nereden yöneteceksiniz?"** Site "yönetimin nerede yürüdüğü"
  başlığını üç ülkede de kritik sayıyor ama bir ülke sıralaması vermiyor ve
  kişiye özel vergi görüşü vermediğini yazıyor. Cevap puanlanamıyor.
- **"Fiziki ofis, depo veya mağaza gerekiyor mu?"** Yalnızca Dubai tarafında
  (mainland) karşılığı var; İngiltere ve KKTC için sitede karşılığı yok.
- **"Geliriniz hangi para biriminde?"** Yalnızca KKTC clarify maddesinde geçiyor
  ve müşteri konumu sorusuyla neredeyse birebir örtüşüyor.

---

## C · Beraberlik kuralı · bugün kural yok

754 kombinasyonda ilk iki ülke **tam eşit puan** alıyor, 26'sında üçü birden.
Bugün kazanan hep Dubai (685) ya da İngiltere (69), KKTC hiç. Bunun bir gerekçesi
yok: dizide önce yazıldığı için kazanıyor. Sonuç ekranı bunu gizlemiyor ve açıkça
"sıralamayı listenin kendi yazım sırası belirledi" diyor, ama bu bir çözüm değil,
dürüst bir itiraf.

**Soru:** Eşitlikte ne olsun?
- (a) Firmanın tercih sırası belirlesin, o sıra nedir?
- (b) Hiçbiri öne çıkmasın, "ikisi de uygun" densin ve ziyaretçi kıyasa gitsin
- (c) Eşitliği bozacak bir ek soru sorulsun

---

## D · Aracın iddiası ne olsun?

Bugünkü sonuç ekranı bilerek **hüküm kurmuyor**: "şu ülke size uygun" demiyor,
"verdiğiniz cevaplara göre şu öne çıkıyor" diyor, ikinci sırayı ve puan farkını
gösteriyor, farkın tek bir cevapla dönüp dönmediğini söylüyor. Bu turda bir şey
daha ekledi: her cevabın hangi ülkeye kaç puan verdiği sonuç ekranında yazılı.

**Soru:** Bu doğru ton mu? Firma daha kesin konuşmak istiyor mu, yoksa kısa liste
aracı olarak kalması mı doğru? (Kesin konuşmak istiyorsa ağırlıkların teyidi
daha da kritik hâle gelir, çünkü o zaman araç tavsiye veriyor demektir.)

---

## E · Ağırlıkları tahminden çıkarmanın kestirme yolu

En sağlam kalibrasyon, geçmiş işlerden gelir. Elde şu varsa ağırlıkları
tartışmaya hiç gerek kalmaz:

**Son 20-30 müşteri için:** müşterinin durumu (nerede müşterisi var, ne satıyor,
parayı nasıl tahsil ediyor, banka tarafında ne istedi, seyahat edebiliyor muydu,
bütçesi, vize istedi mi) ve **sonunda hangi ülkede kurulduğu**.

Bu liste gelirse testi o listeye göre ayarlarız: ağırlıkları, gerçek kararların
en çoğunu doğru tahmin edecek şekilde çözeriz. O zaman puanlar bizim görüşümüz
değil, firmanın kendi geçmişi olur. Dokuz soru bu iş için beşten daha elverişli:
kalibre edilecek daha çok girdi var.

---

## F · Test sürerken alttaki panel: kaldırılmıştı, bu turda geri geldi

Geçen turun sorusu: *"altta şuan hangi ülkeye daha yakınsın gibi bir kısım koymak
zekice ama doğru mu olur emin olamadım, sadece sonda göstermek mi daha mantıklı
yoksa?"*

Geçen turun cevabı: panel kalsın ama ülke adı, puan ve çubuk göstermesin. Dört
ölçüm bu kararı verdirmişti (F1, F2, F3, F4) ve dördü de aşağıda, hiçbiri
silinmedi.

**Bu turda karar döndü.** İsteğiniz birebir şuydu: *"alt kısmındaki ülkelerin
sürekli puan kazandığı sistemi geri getirebiliriz ya o dursun murat abi istemezse
kaldırırız."* Panel yine ülke adı, bayrak, çubuk ve puan gösteriyor.

Ölçümler bir yasak değil, bir fiyat listesi. Aşağıdaki dördünden **üçü bilerek
geri alındı**; biri geri alınmadı, çünkü o bir tercih değil bir hataydı. Hangisi
hangisi, F4'ten sonraki "Bu turda ne geri geldi" bölümünde.

### F1. "Sıralamıyoruz" iddiası boştu · çubuklar lideri ele veriyordu

Eski panelin altında şu cümle yazılıydı: *"burada bir birinci ilan edilmiyor."*
Ekranda ölçüldü (1400 piksel genişlik, çubuk uzunlukları piksel cinsinden):

| durum | Dubai | İngiltere | KKTC |
|---|---|---|---|
| 1. soruda "Türkiye" | 0 px | **167,7 px** | **520,1 px** |
| 1. soruda "Körfez" | **515,7 px** | 0 px | 0 px |
| 5 cevap, 9'a 8 | **515,3 px** | 444,2 px | 0 px |

Tek puanlık fark **71 piksel** olarak görünüyor. Göz iki çubuk arasındaki 1-2
piksellik farkı zaten ayırt ediyor. Yani panel her cevapta bir birinci ilan
ediyordu; cümle onu ilan etmediğini söylüyordu.

### F2. Üstelik beraberlikte YANLIŞ birinciyi gösteriyordu

Çubuğun kabı, ülke adı sütununun artanı kadar yer alıyordu. "İngiltere" kelimesi
"Dubai"den 15,4 piksel geniş, dolayısıyla İngiltere'nin çubuk rayı 15,5 piksel
dar. Üç ayrı tam beraberlik ölçüldü:

| puan | Dubai çubuğu | İngiltere çubuğu |
|---|---|---|
| 2 – 2 | 516,0 px | 500,5 px |
| 4 – 4 | 514,9 px | 499,5 px |
| 7 – 7 | 516,3 px | 500,8 px |

Puanlar eşitken çubuk **Dubai'yi 15,5 piksel önde** gösteriyordu. Bu, 10.368
kombinasyonun %7,3'ünde (ilk cevaptan sonra %25,0'inde) gerçekleşen bir durum.

### F3. Erken lider zaten yanlış: ilk cevapta isabet %48,7

Her kombinasyon için "k cevap verildikten sonra önde görünen ülke, nihai birinci
mi" hesaplandı:

| cevap sayısı | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| erken lider = nihai lider | %48,7 | %54,4 | %56,0 | %59,0 | %64,9 | %77,1 | %82,5 | %79,5 |

Anketin ilk yarısında görünen lider yazı-turadan iyi değil. Ayrıca
kombinasyonların yalnızca **%27,5'inde** lider baştan sona hiç değişmiyor: kalan
%72,5'te ziyaretçi "önde olan ülkenin" en az bir kez değiştiğini görüyordu.

### F4. Sızan şey Dubai eğilimi değil, KKTC yanılgısı

| | ilk cevaptan sonra önde görünen | nihai birinci |
|---|---|---|
| Dubai | %50,0 | %54,4 |
| İngiltere | %25,0 | %43,3 |
| **KKTC** | **%25,0** | **%2,3** |

Dubai eğilimi baştan görünüyor ama abartılmıyor (%50 → %54). Asıl sorun KKTC:
ziyaretçilerin dörtte birine **ilk soruda** KKTC lider gösteriliyor, sonunda
%2,3'e düşüyor, **on bir kat** abartı. "Test bana önce KKTC dedi, sonra geri
aldı" cümlesi tam olarak buradan çıkıyor. Bu, A2 maddesindeki KKTC sorusunu daha
da acil hâle getiriyor.

### Elenen seçenek: "hiçbir şey gösterme, sadece sonda"

Sizin ikinci şıkkınız. Geçen turda da elenmişti, bu turda da duruyor. Sebep:
panelin taşıdığı **tek yanlış şey kimlikti**. Hareketin ve geri bildirimin
kendisi doğru çalışıyordu ve ölçülebilir biçimde canlı:

| sinyal | ardışık iki cevap arasında değişme oranı |
|---|---|
| cevap sayacı (n/9) | %100 |
| "bu cevap puan getirdi mi" | %77,3 |
| ayrım seviyesi (üç kademe) | %37,4 |

Paneli tamamen kaldırmak, yanlış olmayan bu üçünü de atmak olurdu. Bu üçü hâlâ
ekranda; puan tablosu onların **üstüne** eklendi, yerine değil.

---

### Bu turda ne geri geldi, ne gelmedi

| ölçüm | bu turda | neden |
|---|---|---|
| **F1** 1 puan = 71 px | geri alındı, **ölçek değiştirildi** | panel bir sıralama gösterecekse çubuk şart; abartıyı ölçek kapatıyor |
| **F2** beraberlikte Dubai 15,5 px önde | **geri gelmedi** | bu bir tasarım tercihi değil, bir yerleşim kazasıydı |
| **F3** erken lider isabeti %48,7 | geri alındı, **ekranda yazılı** | ölçümü gizlemek yerine ziyaretçiye söylüyoruz |
| **F4** KKTC ilk cevapta %25 lider | geri alındı, **ekranda yazılı** | aynı gerekçe, ayrıca A2 hâlâ açık bir soru |

### F2 nasıl kapatıldı

Sebep hiçbir zaman "Dubai'yi kayırmak" değildi. Her satır kendi ızgarasıydı, ad
sütunu genişliğini kendi metninden alıyordu ve çubuk rayı ondan **artan** yeri
alıyordu. "İngiltere" kelimesi "Dubai"den geniş olduğu için İngiltere'nin rayı
dardı. Puan sütunu da aynı tuzağı taşıyordu, yani tek bir sütunu sabitlemek
yetmiyordu.

Yeni tabloda satırlar kendi ızgaraları değil: sütunlar bir kez listenin üstünde
tanımlı, üç satır aynı sütunları paylaşıyor. Ad sütunu üç satırda da aynı, puan
sütunu üç satırda da aynı, dolayısıyla ray üçünde de aynı. Aynı üç beraberlik
yeniden ölçüldü (1400 piksel):

| puan | Dubai çubuğu | İngiltere çubuğu | fark | eskiden |
|---|---|---|---|---|
| 2 – 2 | 38,44 px | 38,44 px | **0,00 px** | 15,5 px |
| 4 – 4 | 76,84 px | 76,84 px | **0,00 px** | 15,4 px |
| 7 – 7 | 134,52 px | 134,52 px | **0,00 px** | 15,5 px |

Üç satırın rayı da aynı ölçümde 499,66 piksel.

Tablo tur bitiminde **ikinci kez, sıfırdan ölçüldü** (aynı üç beraberlik, aynı
1400 piksel, geçişler kapatılıp bitiş durumu zorlanarak): üç satırda da aynı
sayılar çıktı, fark yine 0,00 piksel. Ölçek de kontrol edildi: aynı ekranda
9 puan ile 10 puanın çubukları 171,45 ve 190,50 piksel, arada 19,05 piksel var
ve bu tam olarak bir puan. Yani çubuk artık ne beraberlikte yalan söylüyor ne
de puan başına farklı uzunluk veriyor.

Bu hatanın büyüklüğü sondaki %7,3 ile ölçülmez, çünkü panel **test sürerken**
ekranda. Tepede beraberlik oranı, k cevap verilmişken (10.368 kombinasyonun
tamamı sayıldı):

| cevap sayısı | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| tepede beraberlik | %25,0 | %18,8 | %16,7 | %14,6 | %12,8 | %9,0 | %8,7 | %7,9 | %7,3 |

Yani yanlış bilgi tam olarak panelin en çok bakıldığı yerde, ilk cevaplarda, en
sık çıkıyordu.

### F1'e verilen cevap: ölçek sıfırdan başlıyor, tavanı sabit

Sorulacak soru şuydu: 1 puanlık farkın 71 piksele büyümesi ölçekten geliyordu,
peki hangi ölçek doğru? İki ayrı şey karıştırılmasın:

- **Ölçek sıfırdan başlıyor.** Sıfır puan alan ülkenin çubuğu gerçekten boş.
  Kırpılmış bir taban (örneğin "en düşük puan = boş") üç ülkeden ikisini eşit
  görünmeye zorlardı.
- **Değişen şey tavan.** Eskiden payda "o anki en yüksek puan" idi, şimdi
  "bir ülkenin toplayabileceği en yüksek puan" (26; ülke başına tavanlar Dubai
  24, İngiltere 26, KKTC 13, en yükseği alındı ki üç satır aynı ölçekte olsun).

Sayıyla:

| | eski payda (o anki en yüksek) | yeni payda (sabit tavan 26) |
|---|---|---|
| 1 puanlık fark, 2'ye 1'de | 249,8 px | 19,2 px |
| 1 puanlık fark, 9'a 8'de | 55,5 px | 19,2 px |
| aynı olgunun görünüm oranı | **4,5 kat değişiyor** | **sabit** |
| çubuk puan artmadan geri gidebilir mi | **evet** | hayır |

İkinci satır eski paydanın asıl kusuru: Dubai 3, İngiltere 1 iken Dubai'nin
çubuğu tamamen doluydu; İngiltere 4'e çıkınca Dubai'nin **puanı hiç değişmediği
hâlde** çubuğu dörtte üçe iniyordu. "Sürekli puan kazanıyor" diyen bir panelde
çubuğun geri gitmesi doğrudan yanlış bilgi.

Sabit paydanın bedeli: hiçbir çubuk asla tam dolmuyor. Kabul edildi, çünkü dolu
bir çubuk zaten "birinci" demenin sessiz hâliydi.

### Panelde şimdi ne var

1. **Puan tablosu**: üç ülke, bayrağı, çubuğu ve puanı. Sıra sabit, listenin
   kendi sırası; puana göre sıralanmıyor. Sıralasak her cevapta satırlar yer
   değiştirir ve göz yarım kalmış bir sıralamayı sonuç sanardı.
2. **Kaç cevap verildi** (n / 9).
3. **Bu cevap puan getirdi mi**: 26 şıkkın 5'i sıfır ağırlıklı olduğu için bu
   cümle gerçekten iki hâl arasında gidip geliyor.
4. **Ayrım seviyesi**, üç kademe. Ölçtüğü şey "kim önde" değil,
   *fark / (fark + kalan soruların çevirebileceği en büyük miktar)*. Yani
   "kalan sorular bu sıralamayı hâlâ çevirebilir mi". Ortalama değer 1. cevapta
   0,062'den 8. cevapta 0,435'e **monoton** yükseliyor; adımların yalnızca %7,3'ü
   geriye gidiyor. En üst kademe matematiksel bir hâl, eşik değil: fark, kalan
   soruların toplam salınımından büyükse kalan sorular hepsi en aleyhte
   cevaplansa bile sırayı çeviremez (7. cevapta kombinasyonların %12,0'ı, 8.
   cevapta %39,7'si bu durumda).
5. **Panelin altında bir uyarı cümlesi**: satırların sıralama olmadığı, üç
   çubuğun aynı ölçekte olduğu ve ilk cevaplarda öne geçen ülkenin sonda çoğu
   zaman değiştiği yazıyor. F3 ve F4 buradan kapatılmıyor, sadece söyleniyor.

Erişilebilirlik tarafı: ülke adları ve puanlar gerçek metin, ekran okuyucu
tabloyu olduğu gibi okuyor. Bayraklar, çubuklar ve kademeler süs olarak
işaretli, yani aynı bilgi iki kez okunmuyor.

### Murat abi "kalksın" derse

Tek bir koşul bloğu; panel tamamen kalkar, geri kalan test hiç değişmez.
Kaybedilen şey yukarıdaki beş maddenin hepsi. Ara bir yol isterseniz
(örneğin lider yalnızca son iki soruda görünsün) F3'teki tablo hazır: 8. cevapta
bile isabet %79,5, yani beşte bir ihtimalle yanlış ülkeyi göstermiş oluruz.

---

## Özet: en az şu üçü lazım

1. **A1** kapanan işlerin ülke dağılımı
2. **A2** KKTC gerçekten satılıyor mu (bu turda aciliyeti arttı: %8 değil %2,3)
3. **C** beraberlikte ne olacak

Bunlar gelirse test savunulabilir hâle gelir. B'deki maddeler ince ayar,
E ise "tahmin etmeyi tamamen bırakalım" seçeneği.

**F artık bir soru.** Panel geri geldi ve son sözü Murat abi söyleyecek. Karar
verirken bakılacak tek şey F3 ile F4: panel ekranda bir lider gösteriyor ve o
lider ilk cevapta ancak yazı-tura kadar isabetli. Şu an bunun karşılığında
panelin altına bir uyarı cümlesi konuldu. Yetmezse panel tek koşul bloğuyla
kalkar. F2, yani beraberlikte bir ülkeyi önde çizme hatası, bu turda tamamen
kapatıldı ve tercih meselesi değil: geri gelmesi gündemde yok.

Cevaplar geldiğinde değişecek tek dosya `src/lib/fitTest.ts`; her seçeneğin
yanında ağırlığın neden o olduğunu anlatan bir `why` alanı duruyor, yeni
gerekçeler oraya yazılacak.

### Ölçümü yeniden üretmek

Dağılım tablosu elle yazılmadı. Ağırlık değiştiğinde yeniden çalıştırın:
`src/lib/fitTest.ts` içindeki `FIT_QUESTIONS` üzerinden bütün kombinasyonları
`scoreFit` ile puanlayan kısa bir betik yeterli (importları ve `fitBlurb`'ü
çıkarıp Node'un tip sıyırma desteğiyle dosyayı doğrudan içe aktarmak en kolayı).
Bakılacaklar: ülke başına birincilik sayısı, teorik tavan, beraberlik sayısı ve
soru bazında "tek başına sırayı çevirebiliyor mu" oranı.
