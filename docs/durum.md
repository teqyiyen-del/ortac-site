# Ortac sitesi · durum

Bu dosyanın işi tek: **sohbet penceresi geri sararsa ya da yeni bir oturuma
geçilirse iş nerede kaldı, buradan okunsun.** Sohbet kaybolur, bu dosya kalır.

Üç kaynak birlikte çalışıyor ve üçü de gerçeğin parçası:

| kaynak | ne tutuyor |
|---|---|
| `git log` | hangi turda ne yapıldı, neden yapıldı (commit mesajları uzun ve gerekçeli) |
| kod yorumları | tek tek kararların gerekçesi, elenen alternatifler, ölçülen sayılar |
| `docs/tuzaklar.md` | değişmez kurallar, teknik tuzaklar, doğrulama kademeleri |
| **bu dosya** | **bugün ne canlıda, ne karar bekliyor, kim neyi bekliyor** |

Her tur sonunda güncelleniyor. Tarih ve commit numarası aşağıda; eskiyse
`git log` daha doğrudur.

---

## Son durum · 19.08.2026 · `b22a202`

Çalışma ağacı temiz, dal `origin/main` ile eşit.
**Vercel deploy'u ELLE**: push otomatik yayına almıyor, panelden Redeploy gerekiyor.

### Son altı tur

| commit | tur |
|---|---|
| `b22a202` | Hakkımızda sıfırdan tur, MT16 canlıda, KKTC haritası düzeldi |
| `bde0ac2` | Bakım: tsc kapısı temizlendi, ölü kod haritası çıktı |
| `4c5fe0c` | Sohbet geri sarmasının sebebi ölçüldü, bu belge tamamlandı |
| `42519a3` | CTA kutuya döndü (canlı), test teşhisi, MT16, hakkımızda fotoğrafı geri çekildi |
| `4a79e81` | docs/durum.md açıldı |
| `b8cb54b` | Test dengesi yarıya indi, huzme sahne dibine indi, üç lab turu açıldı |
| `be2e1ce` | Üç ofisin iletişim bilgisi doldu, dört lab adayı emekli oldu |
| `028ce2d` | Hero P1 duvarına döndü, teste kazanç perdesi, üç lab turu kapandı |
| `b9f86bb` | Kaynaklar tarafındaki dokuz başlık konusunu söylüyor |
| `9c97a54` | Dört sayfanın hero başlığı konusunu cümle içinde söylüyor |
| `4ea66c8` | Uygunluk testine dikey nefes, hero başlığı sayfanın adı oldu |

---

## BAKIM TURUNUN BULGULARI · karar bekliyor (kod işi, müşteri işi değil)

### Yapıldı
- **`tsc --noEmit` artık tamamen sessiz.** `build:yerel`, ürettiği `.next-build`
  dizininin tip dosyalarını `tsconfig.json`'ın `include`'una kendisi eklemişti ve
  oradaki bayat doğrulayıcı, kaynakta karşılığı olmayan iki hata yazdırıyordu.
  `exclude` artık `.next-*` taşıyor; `build:yerel` satırı yeniden eklese de süzülüyor.
  Ayrıntı `docs/tuzaklar.md · S`.
- **`scripts/olu-kod.mjs` eklendi.** Import grafiğini rota girişlerinden yürüyüp
  ulaşılamayan dosyaları listeliyor. `css-check` gibi kalıcı bir araç.

### Ölçüldü, karar bekliyor
**33 dosya hiçbir rotadan ulaşılamıyor** (`node scripts/olu-kod.mjs`). Bunun
doğrudan bir bedeli var: `css-check` tabanı 48 ve **38'i (yüzde 79) yalnızca dört
ölü dosyadan** geliyor (`PricingConfigurator` · `Calculator` · `HeroWizard` ·
`DubaiZoneMap`). O dördü silinse taban **48 → 10**'a düşüyor, yani araç canlı
dosyalardaki gerçek eksikleri ilk kez görünür kılıyor.

`PricingConfigurator` ve `Calculator`'ın ölü olduğu zaten yazılıydı
(`home/PriceSummary.tsx` içindeki yorum). Silme kararı verilmedi çünkü 33 dosya
tek turda silinecek bir şey değil ve `tuzaklar.md · O` dosya silmenin dev
sunucusunu önbellekten patlatabildiğini söylüyor.

**Soru: bu 33 dosya silinsin mi, hangi sırayla?** Öneri: önce yalnızca css-check
tabanını taşıyan dört tanesi, taban ölçülür, sonrası ayrı tur.

### Ölçüldü, sorun çıkmadı
- **Ölü bağlantı yok.** Altı adres (`/panel`, `/sirket-tasima`, dört `/hizmetler/*`)
  hiçbir rotaya düşmüyor ama `SmartLink` hepsini sönük, tıklanamaz `<span>`'e
  çeviriyor; DOM'da `href="/panel"` diye bir şey basılmıyor. Dördü zaten ölü
  dosyada. Mimari çalışıyor.
- **`css-check` tabanı büyümedi**: 48, üç commit öncekiyle aynı. `lint` sıfır.
- **`SWAP:` envanteri**: 61 ayrı işaret, ~56 dosyada. En kalabalığı
  `SWAP:FIT_WEIGHTS` (11) — uygunluk testinin ağırlıkları, aşağıdaki 0/1/2
  maddeleriyle aynı konu.

### Kayda geçen küçük yanlış
`HeroDubaiCards.tsx:49` "DİKKAT: `.phx-grid`, `.phx-copy` … silinmesin" diyor ama
`.phx-copy`'nin hiçbir CSS kuralı yok. Zararsız: ızgara çocuğu olarak zaten doğru
sütuna düşüyor. Kalan 10 css-check kaydının çoğu bu türden, kuralsız sarmalayıcı ad.


## BU TURDA YAPILAN BEŞ İŞ

Müşterinin tek mesajındaki beş ayrı istek. Dördü tamamlandı, biri karar bekliyor.

### 1 · Hakkımızda · KARAR BEKLİYOR
"tamamen 0 dan düşünerek bir şeyler dene." `/lab/hakkimizda-sayfa` açıldı, üç aday:
**Defter** (iddia solda, dayanağı sağda; kart ızgarası hiç yok) · **Zincir** (beş halka
kesintisiz tek omurgada, ülke bilgisi halkaların içine dağılıyor) · **Cephe** (önce
coğrafya; omurga üç ofisin gerçek adres defteri). Üçü de canlı sayfanın bölüm sırasını
devralmıyor. **Müşteri birini seçmeli.**

İki not canlıdan KALKTI (alanlar da silindi, dokuz dosyada kullanılıyorlardı):
"Fotoğraf temsilî; firmanın kendi ekip çekimi değil." ve "Vizyon ve misyon firmanın
kendi resmî ifadesi; bu sayfa için yeniden yazılmadı."

### 2 · Muhasebe takvimi · CANLIDA
**İkinci düzeltme (aynı gün):** yan yana yerleşim CANLIDA GERİ ALINDI. Müşteri
gördü: "bir tanesi açılınca hepsi açılmış oluyor saçma oldu bi. alt alta versiyona
geçirelim ama bu tasarımla kal." Sebep ızgaranın kendisiydi — üç `<details>` aynı
ızgara satırındaydı, biri açılınca satır yüksekliği en uzun sütuna göre büyüyor ve
dikey ayırıcı çizgiler o boy kadar uzuyordu, yani kapalı iki sütun da uzamış
görünüyordu. Lab ölçümü bunu göremedi: orada doğrulanan şey sütunların KONUMUYDU,
yüksekliği değil. Artık her genişlikte alt alta; gece tasarım, numara, artı işareti
ve açılış hareketi aynı kaldı. Ölçüldü: biri açılınca yalnız o büyüyor (45 → 130 px),
ötekiler 46 px'te sabit.

Şeritteki mavi karelere nabız eklendi ("az yaşasın"): dalga soldan sağa akıyor,
gecikme ay numarasından türüyor, üstüne gelince satırın tamamı açılıyor. Periyot
13,711 s — asal ve sayfadaki dokuz sürekli periyodun hepsiyle aralarında asal.
Ayrıca iki ikiz `@keyframes` (`kmt-run` · `kmt-in`) temizlendi; `kmt-in` kopyaları
farklıydı (-6px / -5px), MT16'nın kullandığı 5. tur sürümü korundu.

**Düzeltme turu (aynı gün):** ilk taşımada bir hata vardı ve müşteri gördü. Canlı
bileşen `<ol className="kmt-recs">` basıyordu, yani labdaki iki öznitelik
(`data-tone="night"` ve `data-lay="sutun"`) taşınmamıştı ve o seçicilerin hiçbiri
eşleşmiyordu. Ekranda duran şey ne MT16 ne MT14'tü: üç kayıt **beyaz** ve **alt alta**
düşüyordu, oysa MT16'nın tek farkı zaten "üç kayıt yan yana"ydı. Öznitelikler
düzleştirildi (canlıda tek yerleşim, tek renk var), MT13'ün `[data-lay="row"]` bloğu
silindi. Ölçüldü: 900px ve üstünde yan yana, 899 ve altında alt alta; kart yüksekliği
664 → 569 px. Ayrıca vergi çerçevesi açılır kapanır oldu (ikonlar içeride kaldı, **kapalı başlıyor**) ve
şeridin altındaki şerh cümlesi kaldırıldı.

MT16 canlıya alındı, lab turu kapandı. Yeni bileşen
`components/services/AccountingCalendar.tsx`, yeni ad alanı `.kmt-`, yeni CSS
`css/muhasebe-takvim.css`. Lab önekleri (.mty- .mtw-) canlıya TAŞINMADI.
Müşterinin üç düzeltmesi uygulandı: "12 / 12 ay" rakam çifti kalktı (cevabı artık
veriden kurulan tek cümle taşıyor, elle yazılmıyor) · "Üç ritim ne demek?" kapısı
kalktı (ölçüldü: üç madde, 213 karakter, üçü de şeridin kelimeye çevrilmiş hâliydi,
bilgi kaybı sıfır) · vergi çerçevesi kapıdan çıkıp beş ikonlu künye tahtası oldu.
Dokuz genişlikte (1440 → 320) yatay taşma sıfır.

### 3 · Metin tonu · YAPILDI
"banka tarafı gerçekten açılıyor tarzı ifadeler... daha düz mantıkta yaz."
Aynı savunmacı kalıp sitede sekiz yerde bulundu ve düzeltildi; altı bağ (yorum ve
alıntı) da eşitlendi. Bilerek dokunulmayanlar: sitenin bilerek iddialı ya da bilerek
sınır koyan cümleleri ("Taşeron değil, kendi kadromuz", "Banka onayı garantisi
vermiyoruz").

### 4 · İletişim · YAPILDI
**KKTC haritası gerçek bir hataydı ve düzeldi.** `SHAPE_D.kktc` Natural Earth 110m'nin
**196 numaralı "Cyprus"** öğesiydi, yani Kıbrıs Cumhuriyeti — seçilince adanın GÜNEYİ
maviye boyanıyordu. Kök sebep: 110m verisinde "N. Cyprus" ayrı bir öğe olarak VAR ama
sayısal `id` alanı yok, kimlikle arayan üretici ona ulaşamayıp 196'ya düşmüş.
Doğru çokgen iki bağımsız yoldan türetildi (haritanın kendi LAND_D + BORDER_D
geometrisinden, ve Natural Earth boru hattı yeniden çalıştırılarak) ve **karakter
karakter aynı** çıktı. Alanla da doğrulandı: kuzey 45,5 + güney 75,1 = 120,6 = adanın
tamamı.

Ölçek artık ülkeye göre: `ZOOM = {dubai: 4, ingiltere: 2, kktc: 6}`. Sebebi ölçüldü:
KKTC şeridi Lefkoşa boylamında 2 katta 5,9 px, işaret noktası 20 px — nokta şeridin
3,4 katıydı. Müşteri ölçeği **6**'da bıraktı; ölçüldü, orada da şerit 17 px ve
**nokta sınırı aşmıyor** (alt kenar 2602, sınır 2603). Sığmayan 3 piksel yukarı,
yani denize taşıyor — Rum tarafına değil. 6, kıyı çizgisini 8'e göre daha az
köşeleştirdiği için ayrıca kazanç.

**Dubai 4.** İşaret haritanın sağ alt köşesinde ve çerçeve kutunun dışına taşmadığı
için düşük ölçeklerde kırpılıyordu (2 katta x ve y, 3-4 katta y), yani işaret ortada
değil köşede duruyordu. 4 katta yatay kırpma bitiyor; dikeyde 15 piksel sapma kalıyor,
haritanın 620 piksellik boyunun yüzde 2,4'ü. Tam ortalanma 4,5'te başlıyor, müşteri
4'ü seçti. Üç gövde de tamamen çerçeve içinde.
İngiltere 2'de kaldı: Britanya zaten üç ülkenin en büyüğü, yakınlaştırmanın
okunurluğa katkısı yok.

Ayrıca: haritaya tıklayınca seçili ofisin Google Haritalar araması açılıyor (gerçek
`<a>`, div+onClick değil) · üç ofiste de WhatsApp telefonla aynı numarayla doldu
(KKTC'de yalnız cep; 444'lü servis numarasında WhatsApp hesabı açılmıyor) · kanal
kartlarının altındaki notlar ve haritanın altındaki yazı kalktı · başlık
"Hangi ofisle konuşuyorsunuz?" → **"Üç ülkede de kendi ofisimiz var."**

KKTC koordinatı Kuzey Lefkoşa'ya çekildi. Ekranda fark yaratmıyor (0,46 px) ve bu
bilinerek yapıldı: düzeltme görüntü için değil veri doğruluğu için.

### 5 · Doğrulama
`tsc` 0 · `lint` 0 · `css-check` 48 (taban değişmedi) · on iki rota 200 + kendi
`<title>`'ı · `/dubai/muhasebe` dokuz genişlikte taşma sıfır · iki yeni animasyon
periyodu (16.993s · 29.023s) asal ve sayfadaki sekiz periyodun hepsiyle aralarında
asal (`getAnimations()` ile tarayıcıda doğrulandı).


## HERO · huzme ekran dibine indi (20.08.2026)

Müşteri: "heroda şunları biraz daha aşağı alsana. ışık hüzmesi tam ekranın en altında
bitsin mesela. bunu daha önce yapmıştık diye hatırlıyorum sonra bozuldu mu nolmuş."

**Gerileme değildi, hiç ölçülmemiş bir kırılımdı.** `b8cb54b` huzmeyi dibe indirmişti
ama ölçüm tablosu dört KISA ekranda yapılmış (1440x900 · 1280x800 · 375x812 ·
320x720) ve tablonun kendi açık maddesi zaten bunu yazıyordu: 768x1024'te sahne
kutusu `max-height: 44svh` tavanına dayanıp altında 38,8 piksel boş bırakıyor.
Müşterinin ekranı uzun (1324 px) ve aynı maddeye düşüyor; ölçülen boşluk 85 piksel.

Çözüm iki parça: sahne tavanı **44 → 52svh** (gerçekçi masaüstü boylarında boşluğu
tamamen kapatıyor) ve `.hgt-stage { margin-top: auto }` (tavanın bağladığı çok uzun
ekranlarda kalanı yutuyor). `justify-content: flex-end` DENENMEDİ çünkü zaten
elenmişti — o hâlde artan yer seçicinin üstünde birikip "boğaz köprüsü" açıyor,
gerekçesi `.hgt` yorumunda yazılı. Asgari 30px nefes `.hgt-pick`e taşındı.

Ölçüldü: huzmenin dibi = sahnenin dibi = `.hgt`'nin dibi, sekiz kırılımda da fark
0 piksel; gerçek sayfada huzmenin dibi ile ekranın dibi de birebir aynı. Sahne
583 → 667 px, çizim büyümedi (478 px) yalnız 52 px aşağı indi.


## MÜŞTERİDEN BEKLENENLER

Bunlar kod işi değil, **karar ya da veri** işi. Hiçbiri uydurulmuyor.

### 0 · TESTİN ASIL SORUSU · `ziyaret` cevabının gerçek oranı
Yeni teşhis (docs/uygunluk-testi-teyit.md) tek bir sayıya indirdi: **"her şey uzaktan
olmalı" cevabını ziyaretçilerin yüzde kaçı seçiyor?** Eşitlik noktası **%38,7** — altında
Dubai birinci çıkıyor, üstünde İngiltere. Firma bu oranı kendi müşteri geçmişinden bilir;
tahminle doldurulmadı.

Aynı teşhisin iki içerik bulgusu, ikisi de karar bekliyor:
- **Dubai'nin manşet avantajları uygunluk tablosuna girmemiş.** Vergi oranı, kişisel gelir
  vergisinin olmaması ve serbest bölge/mainland yapı seçimi sitede anlatılıyor ama
  `fitTable`'da satırı yok, yani test onları ödüllendiremiyor. Bu boşluk doldurulmadan
  puanlama düzeltilirse kaynaksız ağırlık yazılmış olur.
- **İki içerik çelişkisi.** `FACTS.dubai.forWhom` ve `structures.fit` Dubai'yi danışmanlık
  için sayıyor ama Dubai'nin `fitTable`'ında satır yok; `is·diger` üç ülkeye de sıfır
  veriyor ama İngiltere ve KKTC sayfaları gayrimenkul için olumlu konuşuyor.

### 1 · Uygunluk testinde `vize` sorusu eksi alsın mı?
Eksiler bugün iki soruda: tahsilat kanalı (KKTC −3) ve ziyaret (Dubai −3).
Müşteri "ödeme yöntemi ve ülkeye ziyaret **fln**" dediği için üçüncüsü sorulmadı.
Eklenirse dağılım **%49,2 / %47,2 / %3,6** olur, yani "kimse %50'yi geçmesin"
hedefi ancak böyle tutuyor. Bugünkü hâl: **Dubai %41,7 · İngiltere %55,8 ·
KKTC %2,5** (124.416 kombinasyon tarandı).

### 2 · KKTC neredeyse hiç önerilmiyor (%2,5)
Sorun puanlama değil **içerik**: erişim perdesinde beklenen puanı sıfır
(Dubai 2,67 · İngiltere 4,50). KKTC'nin gerçekten iyi olduğu senaryolar siteye
yazılmadıkça test onu öneremez. Karar: ya o senaryolar yazılacak ya da KKTC'nin
testteki yeri kabullenilecek.

### 3 · Basın kartlarının görselleri
Yuva, oran ve boş hâl kuruldu; istenen kare ölçüsü `src/lib/press.ts` içinde
yazılı. Uydurma ekran görüntüsü üretilmedi. **Kareler gelince konur.**

### 4 · Alıntı metinleri
Alıntı bloğunun konulacağı yerler belirlendi, cümleler `SWAP:QUOTE` olarak boş.
Alıntı uydurulmuyor; metinlerin Murat abiden gelmesi gerekiyor.

### 5 · İngiltere e-postası
`uk@ortacaudit.com` — diğer iki ofis `ortacglobal.com` kullanıyor. Ayrı tüzel
kişilik olduğu için kasıtlı olabilir; teyit edilmedi, verildiği gibi girildi.

### 6 · Fiyat çelişkisi (eski, hâlâ açık)
`afterSetup.ts` Dubai aylık muhasebeyi 350 USD/ay diyor, `pricing.ts` yıllık
2.100 basıyor. İkisi aynı şeyi iki farklı sayıyla söylüyor. `pricing.ts`'e
kimse dokunmuyor (müşteri isteği), çelişki lab sayfalarında ayrı kutuda yazılı.

### 7 · Onaysız iddialar ekranda
`about.ts · BASIS.cards`: "30 yıllık kurumsal geçmiş" (değer müşteriden geldi,
kuruluş yılı hâlâ `SWAP:FOUNDED`), "IFZA resmî iş ortağıyız"
(`SWAP:AUTHORITY`), "Kendi muhasebe lisansımız" (`SWAP:LICENCE_NO`).
Üçü de hakkımızda sayfasında görünür durumda.

---

## KARAR BEKLEYEN LAB TURLARI

| rota | adaylar | soru |
|---|---|---|
| `/lab/hakkimizda-sayfa` | **Defter · Zincir · Cephe** | **YENİ.** Sayfanın TAMAMI sıfırdan; üçü de canlı bölüm sırasını devralmıyor |
| `/lab/hakkimizda-giris` | Ocak · Fitil · Yaprak | Yalnız giriş şeridi. Müşteri sayfanın bütününü reddedince kapsamı daraldı; yukarıdaki tur seçilirse bu tur anlamsızlaşır |

`/lab/muhasebe-takvim` KAPANDI: MT16 canlıya alındı.

Kapanmış turlar `/lab` indeksinde kırmızı noktayla duruyor (kazananı canlıda).

---

## ÇALIŞMA DÜZENİ

- Tur başına **1-3 ajan**. Denetim turu **varsayılan kapalı**.
- Doğrulama iki kademeli: onaylanmış canlı işlerde tam ölçüm, deneme
  aşamasındakilerde `tsc` + `lint` + `css-check` + rota kontrolü.
- **`npm run build` çalıştırılmaz**, dev sunucusunu öldürüyor. Yerine
  `npm run build:yerel`.
- Mobil ve kusursuzluk kasılması **site bitince**. Bugün tasarım tabanı atılıyor.
- **Müşteri "tam oldu kalsın" demeden hiçbir tasarım bitmiş sayılmaz.**

Ayrıntısı `docs/tuzaklar.md`'de.

---

## SOHBET GERİ SARIYORSA · sebebi ve çözümü

Ölçüldü (19.08.2026): oturum kaydı **tek dosyada 33 MB / 8.274 satır**, bunun
**13,3 MB'ı (%40) gömülü ekran görüntüsü** (183 adet). Aynı klasörde ayrıca
368 MB alt ajan kaydı var. İstemci her yüklenişte bu dosyayı ayrıştırıp
çizmeye çalışıyor; tamamını tutamayınca daha eski bir noktaya düşüyor.
"Geri sarma" bunun belirtisi ve dosya büyüdükçe kötüleşiyor.

**Çözüm: yeni sohbet aç.** Yeni oturum sıfırdan boş bir dosyayla başlıyor.
Devir maliyeti yok, çünkü bu dosya + `git log` işin tamamını tutuyor;
`AGENTS.md` de yeni oturumu buraya yönlendiriyor.

Yeni oturumu şununla açmak yeterli:

> Ortac sitesinde çalışıyoruz. `docs/durum.md` ve `docs/tuzaklar.md` dosyalarını
> oku, `git log -5`'e bak, sonra kaldığımız yerden devam edelim.

Aynı sorunu geciktiren iki alışkanlık:
- Ekran görüntüsü dosyanın %40'ı. Aynı anda çok kare atmak yerine tek kare +
  tarif, kaydı belirgin biçimde küçültüyor.
- Alt ajan kayıtları birikiyor. Sonuçlar zaten commit mesajlarında ve kod
  yorumlarında; ham kayıtlar silinebilir:
  `rm -rf ~/.claude/projects/-Users-burak-ORTAC-S-TE/*/subagents`
