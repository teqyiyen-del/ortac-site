# Uygunluk testi · Murat abiye sorulacaklar

Bu belge tek bir işaretin karşılığı: `src/lib/fitTest.ts` içindeki **`SWAP:FIT_WEIGHTS`**.

## Neden bu teyide ihtiyaç var

Test, ziyaretçinin cevaplarını puanlayıp bir ülkeyi öne çıkarıyor. Hangi ülkenin
çıkacağını **tamamen o puanlar belirliyor** ve puanları bugün kimse onaylamadı.
Yani test şu an açık, ama söylediği şeyin arkasında firmanın imzası yok.

---

# BU TUR · dengenin onarımı

Murat abinin sözü birebir: *"testteki oranların dengesi neden bu kadar bozuldu
bilemedim, aşırı ingiltere önermeye başladık ve böyle olması normal değil.
- yazma olayı biraz kafa karıştırmışta olabilir, onu sadece belli başlı
sorularda yapmak lazım sadece: ödeme yöntemi olayı ve ülkeye ziyaret edebilir
misin sorusunda fln."*

İki ayrı iş yapıldı. Hepsi 124.416 kombinasyonun tamamı taranarak ölçüldü.

## Tek cümlelik sonuç

**İngiltere %62,0'den %55,8'e indi, Dubai %33,9'dan %41,7'ye çıktı.** Birinci
ile ikinci arasındaki fark 28,1 puandan 14,1 puana, yani tam yarıya indi.
Hedeflenen "hiçbir ülke %50'yi geçmesin" TUTMADI ve neden tutmadığı ölçüldü;
aşağıda, "Hedef" başlığında.

| | geçen tur | bu tur |
|---|---|---|
| Dubai birinci | 42.229 (%33,9) | 51.892 (**%41,7**) |
| İngiltere birinci | 77.120 (%62,0) | 69.429 (**%55,8**) |
| KKTC birinci | 5.067 (%4,1) | 3.095 (**%2,5**) |
| Teorik tavan | D 24 · İ 30 · K 17 | D **26** · İ 29 · K 16 |
| Teorik taban | D −10 · İ −3 · K −11 | D **−3** · İ **0** · K **−3** |
| Toplam salınım (Σ FIT_SWING) | 52 | **38** |
| Beraberlik | 6.682 (%5,4) · üçlü 228 | 7.285 (%5,9) · üçlü 268 |
| Beraberliği kazanan | D 5.547 · İ 1.135 · K 0 | D 6.257 · İ 1.028 · K 0 |
| Tek cevapla sıra döner | %75,2 | %80,6 |
| "Henüz erken" | 31.104 (%25,0) | 31.104 (%25,0) |

---

## 1 · Eksi puan iki soruya indi

Kalan iki eksi: **`kanal` · kartla tahsilat → KKTC −3** ve **`ziyaret` · her şey
uzaktan → Dubai −3**. Başka hiçbir soruda eksi yok.

### Önce bir ölçüm: "eksiyi ötekilere artı yazmak" dengeyi düzeltmiyor

Bir şıkta bir ülkeye −2 yazmakla, aynı şıkta öteki ikisine +2 yazmak
**sıralama açısından birebir aynı şey** (tek şıkta üç ülkeye aynı sabiti
eklemek sırayı değiştirmez). Tam tarama bunu doğruluyor: kaydırmalı kurgu da
%33,9 / %62,0 / %4,1 veriyor, yani tek kazancı ekranda eksi görünmemesi,
karşılığı ise tavanın şişmesi. Bu yüzden kaydırma değil **sıfırlama** seçildi
ve her satır için bilginin nereye gittiği ayrıca yazıldı.

### Kalan iki eksi

| soru · şık | ülke | puan | dayanak |
|---|---|---|---|
| `kanal` · Kartla tahsilat | KKTC | **−3** | Stripe ✗ + PayPal ✗ (K2, iki hücre) · fitTable ok:false → Dubai · watchouts "Ana kısıt bu" · faq düz "Hayır" |
| `ziyaret` · Her şey uzaktan | Dubai | **−3** | fitTable ok:false → İngiltere · FACTS.limit · clarify "vekâletle yürümüyor" |

İkisinin ortak yanı seçilme sebebi: ikisi de bir tercih değil bir **kapı**
soruyor ve reddi tek bir ülkeye yazılı.

### Sıfırlanan altı eksi · bilgi nereye gitti

| soru · şık | ülke | eski | yeni | bilgi korundu mu |
|---|---|---|---|---|
| `musteri` · Avrupa ve İngiltere | KKTC | −2 | 0 | **Evet.** Öteki ikisi zaten artı alıyor (İng 3 · Dubai 1); mesafe 5'ten 3'e indi |
| `platform` · Evet | KKTC | −2 | 0 | **Evet.** İng 3 · Dubai 2 duruyor; mesafe 5 → 3 |
| `banka` · Ödeme kuruluşu | KKTC | −2 | 0 | **Evet, en az kayıpla.** Zaten sayfa düzeyinde ret yoktu, yalnız matris hücresi vardı |
| `butce` · Mümkün olan en düşük | Dubai | −2 | 0 | **Evet.** Sıralama İng 3 > KKTC 2 > Dubai 0 olarak duruyor |
| `vize` · Kendim için | İngiltere | −2 | 0 | **Evet, ama bedeli var.** Dubai 3 · KKTC 1 duruyor; İngiltere'nin beklenen puanı yükseliyor (aşağıda C1) |
| `vize` · Kendim ve ekibim | İngiltere | −3 | 0 | **HAYIR.** Tek gerçek kayıp bu satırda |

**`vize · ekip` neden kurtarılamadı.** O şıkta KKTC de sıfır (sitede KKTC
çalışan vizesine dair tek satır yok, kaynağı olmayan puan yazılmıyor). Eksi
kalkınca "sayfası açıkça reddediyor" (İngiltere) ile "sitede hiçbir şey
yazmıyor" (KKTC) aynı sıfıra düştü. Kaydırma da çözmüyordu: tam kaydırma
KKTC'ye kaynağı olmayan +3 yazardı, yalnız Dubai'ye kaydırmak ise tek şıkta 7
puan demekti ve dosyanın 1-4 bandını kırardı. Ayrım tamamen kaybolmadı, çünkü
aynı sorunun `hayir` şıkkında İngiltere 2 alıyor.

### ⚠️ C1. "fln" dediniz · üçüncü soru `vize` olsun mu?

Bu, İngiltere oranını en ucuza düşüren tek kaldıraç ve ölçüldü. `vize`
sorusunun iki eksisi İngiltere'nin testteki **tek karşı ağırlığıydı**; ikisi
sıfırlanınca İngiltere'nin beklenen puanı +1,67 yükseliyor.

| | Dubai | İngiltere | KKTC |
|---|---|---|---|
| bugünkü (eksi iki soruda) | %41,7 | **%55,8** | %2,5 |
| `vize` de eksi yazabilse | %49,2 | **%47,2** | %3,6 |

`vize` tam olarak öteki ikisiyle aynı cinsten bir soru: yayımlanmış, kategorik
bir "bu ülke bunu vermiyor" (`FACTS.ingiltere.limit`). **Soru: eksi listesine
`vize` de eklensin mi?** Eklenirse "hiçbir ülke %50'yi geçmesin" hedefi de
kendiliğinden tutuyor.

---

## 2 · İngiltere neden patlamıştı · teşhis

Cevaplar eşit olasılıklıyken bir ülkenin **beklenen toplam puanı** ölçüldü.
Teşhis burada tek bakışta görünüyor:

| perde | Dubai | İngiltere | KKTC | İngiltere − Dubai |
|---|---|---|---|---|
| İşiniz | 3,75 | 3,50 | 0,67 | −0,25 |
| Erişim | 2,67 | 4,50 | −0,67 | +1,83 |
| **Kazanç** | **−1,92** | **1,67** | 0,67 | **+3,58** |
| Kısıtlar | 3,00 | 1,50 | 2,50 | −1,50 |
| **toplam** | **7,50** | **11,17** | **3,17** | **+3,67** |

**İngiltere'nin Dubai'ye olan +3,67'lik beklenen üstünlüğünün +3,58'i, yani
%98'i tek bir perdeden geliyordu: Kazanç.** Brifteki hipotez doğrulandı ve
sebebi de sayıya döküldü: kazanç perdesinin **yedi şık satırının yedisinde de
Dubai sıfır ya da eksi alıyordu**; İngiltere üçünde artı alıyordu. Perde tek
bir eksene, ucuzluğa bağlanmıştı, üstelik iki kez: `kazanc` eşiği ilk yıl
maliyetinden, `gider` eşiği yıllık kalemden türüyor ve ikisi de ülkeleri
**aynı sırada** diziyor (İngiltere < KKTC < Dubai). Üstüne `butce` ve `sure`
soruları da aynı sırayı izliyor, yani on bir sorunun dördü tek eksen sayıyordu.

`gider`'in ayrıca bir kusuru var: iki sınırı var (üç değil) ve İngiltere ile
KKTC'yi **hiç ayıramıyor** (ikisinin yıllık kalemi de bine yuvarlanınca 1.000).
Daha az bilgi taşıyan soru, `kazanc` ile eşit ağırlıktaydı.

### Kaymanın tamamı kazanç perdesi değil

Eksileri iki soruya indirmek tek başına İngiltere'yi %62,0'den %59,5'e
indiriyor, ama aynı hamle İngiltere'nin karşı ağırlığını da kaldırdığı için
**kazanç perdesinin puanı tamamen kapatılsa bile İngiltere %51,9'da kalıyor**
(Dubai %45,7). Yani perde üzerinden yapılacak hiçbir ayar İngiltere'yi %50'nin
altına indiremez.

---

## 3 · Denenen ayarlar · her biri tam tarama

Hepsi "eksiler daraltıldıktan sonraki" hâlin (%37,5 / %59,5 / %3,0) üstüne
uygulandı.

| ayar | Dubai | İngiltere | KKTC |
|---|---|---|---|
| (yalnız eksi daraltma) | %37,5 | %59,5 | %3,0 |
| **A1** perde ağırlığı iki soruda da 2 → 1 | %41,4 | %55,8 | %2,7 |
| **A2** yalnız `gider` 2 → 1 (çift sayım) | %39,1 | %58,1 | %2,8 |
| **A3** en üst band iki yönlü (Dubai +2) | %40,1 | %57,2 | %2,7 |
| A1 + A3 | %42,8 | %54,7 | %2,6 |
| **SEÇİLEN · A2 + A3** | **%41,7** | **%55,8** | **%2,5** |
| (üst sınır) perde puanı tamamen kapalı | %45,7 | %51,9 | %2,4 |

**Neden A1 değil A2+A3.** A1 ile A2+A3 aynı sayıyı veriyor (%55,8) ama A1
"düğmeyi kıs" demek: Murat abinin istediği perdeyi sessizce zayıflatıyor ve
perde hâlâ tek yönlü kalıyor. A2+A3'te iki değişikliğin de adı var:
biri ölçülmüş bir çift sayımı düzeltiyor, öteki perdeyi iki yönlü yapıyor.
Kazanç sorusunun kendi ağırlığına (2) hiç dokunulmadı.

### A3 · en üst band artık boş dönmüyor · SWAP:FIT_WEIGHTS

En üst band (60.000 USD üzeri) bugüne kadar hiç puan dağıtmıyordu: "üçünün de
eşiği geride kaldı, kazanç kimseyi ayırmıyor." O cümle eksikti; ayırmıyor
değil, **yalnızca maliyetle** ayırmıyor. Sitenin kendisi bu ölçekte ikinci bir
ekseni yazılı olarak veriyor:

- İngiltere `fitTable`: *"Vergi avantajı arayan → ok:false, kâr üzerinden
  %19-25 bandında kurumlar vergisi var"*, `alt: dubai`
- İngiltere `clarify`: *"Vergi avantajı için gelen yanlış adreste. Burası
  maliyet ve tanınırlık için seçilir, vergi için değil."*
- Dubai `clarify`: *"Kurumlar vergisi %0*"* · Dubai `intro`: *"vergi avantajı
  ile banka ve vize erişimini aynı anda veren tek seçenek"*

Soru zaten **net** kazancı soruyor, yani kurumlar vergisinin matrahını; band
yükseldikçe o kalem büyüyor, kuruluş bedeli sabit kalıyor. Bu bandda Dubai +2
alıyor. **KKTC 0 kalıyor**, çünkü KKTC vergi bloğu "Kurumlar vergisi: Var"
deyip "KKTC için bu sayfada oran yayımlamıyoruz" diyor, yani kaynağı olmayan artı
yazılmıyor. Ekranda hiçbir oran basılmıyor (duruş: kişiye özel vergi görüşü
verilmiyor); şıkkın altında yalnız *"Bu ölçekte ayıran şey kuruluş maliyeti
değil"* yazıyor.

**Soru: bu ikinci eksen doğru mu?** Yüksek kazanç ile "vergi avantajı arayan"
profilini eşitliyor. Sitenin iki sayfası bunu söylüyor ama eşitliği kuran biziz.

### Yeni bant merdiveni

Eski: alt uçta **+2** · bandın içinde **0** · üstünde **−2** · iki bant
uzakta **−3**.
Yeni: alt uçta **+tepe** · başka her hâl **0**. `tepe` = 2 (`kazanc`),
1 (`gider`). Üç ülke de aynı sayıyı alırsa band boş dönüyor.

Karşılığı yazılı: "bir bant uzakta" ile "iki bant uzakta" ayrımı artık puana
girmiyor. Rakam ekranda duruyor (band etiketi yazıyor) ama sıralamayı
değiştirmiyor.

---

## 4 · Hedef · neyin tutup neyin tutmadığı

**Önerilen hedef: hiçbir ülke %50'yi geçmesin.** Gerekçe: test bir kısa liste
aracı; bir ülke kombinasyonların üçte ikisini kazanıyorsa sorular ayırt etmeyi
bırakmış demektir ve müşterinin cümlesi ("böyle olması normal değil") tam olarak
bunu söylüyor. Eski dağılıma (54/43/2) dönmek hedef alınmadı: kazanç perdesini
müşteri istedi ve perdenin dürüst etkisi İngiltere'yi büyütmek, ayrıca eski
%2,3'lük KKTC zaten bir sorun olarak işaretliydi (A2).

**Tutmadı: İngiltere %55,8.** Ve tutmaması yapısal, iki isteğin ikisi de aynı
yöne itiyor:

1. Kazanç perdesi → en ucuz ülke İngiltere.
2. Eksinin iki soruya inmesi → İngiltere'nin tek karşı ağırlığı (`vize`) kalktı.

Perde puanı tamamen kapatılsa bile İngiltere %51,9. **%50'nin altı ancak C1
kabul edilirse mümkün** (`vize` de eksi yazabilirse: %49,2 / %47,2 / %3,6).

Ulaşılan ve savunulabilir hedef: **birinci ile ikinci arasındaki fark yarıya
indi** (28,1 → 14,1 puan) ve iki ülke artık gerçekten yarışıyor.

### ⚠️ C2. KKTC %4,1'den %2,5'e düştü

Beklentinin tersi ama sebebi biliniyor ve geçen turda da ölçülmüştü: eksileri
kaldırmak KKTC'yi yükseltmiyor, çünkü KKTC'nin eksileri zaten öteki ikisinin
artı aldığı şıklardaydı; kaldırılan eksilerden en çok Dubai ve İngiltere
kazanıyor. KKTC'nin gerçek sorunu puanlama değil içerik: erişim perdesinde
beklenen puanı 0,00 (Dubai 2,67 · İngiltere 4,50). **Bu A2 maddesinin aynısı ve
hâlâ açık.**

### ⚠️ C3. "Henüz erken" %25 fazla mı?

**Bu oran bir ölçüm değil, bir bölme işlemi.** Kapı dört şıklı tek bir sorunun
bir şıkkına bağlı, tarama da bütün şıkları eşit olasılıklı sayıyor: 1/4 = %25.
Gerçek ziyaretçi dağılımı bu değil. Oranı düşürmenin tek dürüst yolu bandı
daraltmak, o da `SWAP:FIT_KAZANC_ORAN`'ı (1/10) değiştirmek demek, yani K2
maddesi. Ayrı bir ayar önerilmiyor.

### ⚠️ C4. Tek cevapla sıra dönme oranı %75,2'den %80,6'ya çıktı

Dengelenmenin doğrudan sonucu: puanlar birbirine yaklaştıkça tek cevap daha sık
belirleyici oluyor. Sonuç ekranı bunu zaten yazıyor ("tek bir cevabınızı
değiştirseniz sıra değişebilirdi"), yani yeni bir yalan doğmuyor; ama testin
"kesin" hissi azaldı. Kabul mü?

---

# ÖNCEKİ TUR · kazanç perdesi, negatif puan, "henüz erken"

Murat abinin isteği üzerine puanlama **açıkça değiştirildi**. Üç iş yapıldı ve
üçünün de sonucu ölçüldü. Aşağıdaki bölüm bu turun kaydı; ondan sonraki bölümler
önceki turlardan kalan ve **hâlâ açık** olan sorular.

## Tek cümlelik sonuç

Dağılım ciddi biçimde kaydı. Kombinasyon evreni 10.368'den **124.416**'ya çıktı:

| | önce (9 soru, negatifsiz) | sonra (11 soru, negatifli) |
|---|---|---|
| Dubai birinci | 5.639 (**%54,4**) | 42.229 (**%33,9**) |
| İngiltere birinci | 4.490 (**%43,3**) | 77.120 (**%62,0**) |
| KKTC birinci | 239 (**%2,3**) | 5.067 (**%4,1**) |
| Teorik tavan | Dubai 24 · İng 26 · KKTC 13 | Dubai 24 · İng **30** · KKTC 17 |
| Teorik taban | üçü de 0 | Dubai **−10** · İng −3 · KKTC **−11** |
| Beraberlik | 754 (%7,3) | 6.682 (%5,4) · üçlü 228 |
| Beraberliği kazanan | Dubai 685 · İng 69 · KKTC 0 | Dubai 5.547 · İng 1.135 · **KKTC 0** |
| Tek cevapla sıra döner | %73,6 | %75,2 |
| "Henüz erken" | yok | 31.104 (**%25,0**) |

**Dubai %54'ten %34'e düştü, İngiltere %43'ten %62'ye çıktı.** Bu, uygulama
hatası değil; isteğin doğrudan sonucu ve nedeni ayrıştırılabiliyor.

### Hangi değişiklik ne kadarını yaptı

Aynı tarama iki kez daha, tek tek yalıtarak çalıştırıldı:

| senaryo | Dubai | İngiltere | KKTC |
|---|---|---|---|
| bugünkü canlı (9 soru, negatifsiz) | %54,4 | %43,3 | %2,3 |
| **yalnız negatif puan** (9 soru) | %50,8 | %46,2 | %3,0 |
| **yalnız kazanç perdesi** (11 soru, negatifsiz) | %40,2 | %57,1 | %2,6 |
| ikisi birden (canlıya çıkan hâl) | %33,9 | %62,0 | %4,1 |

İki okuma çıkıyor ve ikisi de karar gerektiriyor:

1. **Kaymanın büyük kısmı kazanç perdesinden geliyor, negatiften değil.** Bunun
   sebebi yapısal: kazanç soruları "bu ölçek hangi yapıyı taşıyor" diye soruyor
   ve üç ülkenin en ucuzu İngiltere. Dört bandın üçünde İngiltere artı alıyor.
   Murat abinin cümlesi zaten buydu ("çok az kazanıyorsa … gitsin İngiltere'de
   kursun"), yani test isteneni yapıyor. **Soru: bu oran kabul mü?**
2. **Negatif puan KKTC'yi düşürmedi, YÜKSELTTİ** (%2,3 → %3,0). Beklentinin
   tersi. Sebep: eksiler yalnız KKTC'ye değil, Dubai ve İngiltere'ye de yazıldı
   ve Dubai daha çok eksi topluyor (taban −10'a karşı −11, ama Dubai'nin eksileri
   daha sık tetiklenen cevaplarda).

## 1 · Dördüncü perde: Kazanç

İki soru eklendi (`kazanc`, `gider`), perde sırası **İşiniz · Erişim · Kazanç ·
Kısıtlar** oldu. Kazanç, `butce` ile aynı konuyu konuştuğu için onun hemen
öncesine kondu; anket yine "Kısıtlar" ile bitiyor.

### Eşikler nereden geliyor · uydurma sayı yok

Ekrandaki hiçbir rakam elle yazılmadı; hepsi maliyet dosyalarından hesaplanıyor
ve fiyat teyidi geldiğinde **soru metni dâhil** kendiliğinden güncelleniyor.

**Adım 1 · ilk yıl toplamı** = kuruluş (`brand.ts · FACTS.from`, sitede
yayımlanan rakam) + ilk yılın tekrar eden kalemi (`pricing.ts · PRICING.annual`):

| | kuruluş | yıllık | ilk yıl |
|---|---|---|---|
| İngiltere | 1.200 | 700 | **1.900** |
| KKTC | 2.400 | 900 | **3.300** |
| Dubai | 3.900 | 2.100 | **6.000** |

**Adım 2 · maliyeti kazanca çeviren tek sayı.** Bu, testteki **tek
uydurulabilir** rakam ve tek başına işaretlendi:
`SWAP:FIT_KAZANC_ORAN = 1/10`, yani *"bir yapının ilk yıl maliyeti, işin yıllık
net kazancının onda birini geçiyorsa o yapı o iş için henüz erken."*
Eşik = ilk yıl × 10, bine yukarı yuvarlı: **19.000 / 33.000 / 60.000 USD**.

Gider sorusunda oran hiç kullanılmıyor: sınırlar doğrudan yıllık kalemler,
bine yuvarlı ve tekrarı ayıklanmış → **1.000 / 3.000 USD**. İngiltere (700) ile
KKTC (900) aynı sınıra düşüyor; bu bir kayıp değil, olgunun kendisi.

**Adım 3 · puan mekanik.** Elle puan yazılmıyor, `bantAgirlik` yazıyor.
*(Bu turda değişti; yeni merdiven ve gerekçesi yukarıda, "3 · Denenen ayarlar"
başlığının sonunda. Aşağıdaki O TURUN kaydı:)* eşik bandın alt ucunda ya da
altındaysa **+2**, bandın içindeyse **0**, bandın üstündeyse **−2**, bir sonraki
bandın da üstündeyse **−3**. Üçü birden +2 alıyorsa sıralamaya bir şey
katmadığı için band **boş** bırakılıyor.

### ⚠️ K1. Dubai'nin yıllık rakamı hangisi? Cevap eşikleri ikiye katlıyor

Bu turun en pahalı açık maddesi ve zaten var olan bir çelişkinin sonucu
(`afterSetup.ts · SWAP:AFTER_PRICING`):

- `PRICING.dubai.annual = 2.100` (fiyat yapılandırıcısı bunu basıyor)
- Sizin belgeniz: aylık muhasebe 350 × 12 + yıl sonu beyanı 420 + lisans
  yenileme 4.800 = **9.420/yıl**, ilk yıl toplamı 9.820.

Eşik `PRICING`'den hesaplanıyor, çünkü üç ülke için **aynı cetvel** ancak orada
var (`afterSetup.ts` yalnız Dubai için dolu; İngiltere ve KKTC'nin karşılığı
yazılmadı). İlk denemede Dubai için belge, ötekiler için `PRICING` kullanıldı ve
ölçüm bunun bir bulgu değil **ölçüm hatası** olduğunu gösterdi: farklı sepetler
karşılaştırılıyordu.

**Sayısal karşılığı:** belge teyit edilirse Dubai'nin kazanç eşiği 60.000'den
140.000 USD'ye çıkıyor ve testin Dubai önerme oranı **%33,9'dan %27,5'e**
düşüyor. Yani bu çelişki artık soyut değil, fiyatı belli.

**Soru:** Dubai'nin gerçek yıllık yükü 2.100 mü 9.420 mi? Ve İngiltere ile KKTC
için aynı dökümü verebilir misiniz? İkincisi gelmeden üç ülke tam olarak aynı
cetvelle ölçülemiyor.

### ⚠️ K2. 1/10 oranı doğru mu?

Testte uydurulabilecek tek sayı bu. Bugünkü hâliyle: yılda 19.000 USD'nin altında
net kazanan bir işe hiçbir ülke önerilmiyor (kombinasyonların %25'i).

**Soru:** Bu eşik gerçek müşteri profiline uyuyor mu? Daha önce 19.000 USD'nin
altında kazanan birine kuruluş yaptınız mı, yaptıysanız hangi ülkede ve iş
tuttu mu? Oran değişirse dört bandın da sınırı kendiliğinden kayıyor.

### ⚠️ K3. `kazanc` ile `gider` aynı şeyi iki kez sayıyor olabilir

`B0-a`'nın (kanal/banka) aynısı. `kazanc` işin bugünkü büyüklüğünü, `gider` her
yıl tekrar eden yükü soruyor ve site bu ayrımı yüksek sesle yapıyor ("Kuruluş
yalnızca ilk adım"). Ama pratikte ikisi korelasyonlu.

Ölçüm biraz rahatlatıcı: `gider` testin **en zayıf ikinci** kaldıracı (sırayı tek
başına %9,3'te çeviriyor), `kazanc` ise ortalarda (%18,6).

**Soru:** İki soru mu kalsın, tek soruya mı insin?

## 2 · Negatif puan

İsteğiniz birebir: *"bazı seçenekler - puan yazabilir. mesela stripe fln kktc de
yok ya, birisi o seçeneği seçtiğinde 0 puan yerine - de verebiliriz yani, çünkü
o önemli bir etken."*

### Kural: eksi ancak sitenin kendisi "hayır" diyorsa yazılıyor

Eksi puan bir ülkeyi eleyen en güçlü araç; kaynağı olmayan bir eksi, kaynağı
olmayan bir artıdan daha zararlı. Kabul edilen **üç kaynak** var, üçü de makine
tarafından okunabilir:

- **K1** `countryContent · fitTable` satırı `ok: false`
- **K2** `brand.ts · PAY_MATRIX` hücresi `"no"` (✗ = desteklenmiyor; `"none"`
  yani "ilgisiz" eksi yazdırmıyor)
- **K3** `brand.ts · FACTS[ülke].limit` (ülkenin yayımlanmış tek dürüst kısıtı)

Büyüklük varsayılan **−2**; **−3** yalnız kaynak birden fazlaysa ve sitenin dili
kesinse. **−4 hiç yok**: testteki 4'ler iki eleyici artıya ayrılmış (A3) ve
negatif tarafta aynı şiddet, tek cevapla ülke silmek olurdu.

### Yazılan sekiz eksi

*(BU TURDA ALTISI SIFIRLANDI. Kalan ikisi ve sıfırlananların tek tek gerekçesi
yukarıda, "1 · Eksi puan iki soruya indi" başlığında. Aşağıdaki o turun kaydı.)*

| soru · şık | ülke | puan | dayanak |
|---|---|---|---|
| `kanal` · Kartla tahsilat | KKTC | **−3** | Stripe ✗ + PayPal ✗ (K2, iki hücre) · fitTable "Stripe ile kart tahsilatı" ok:false → Dubai · watchouts "Ana kısıt bu" · faq düz "Hayır" |
| `platform` · Evet | KKTC | −2 | fitTable "Global platformda satış" ok:false → Dubai. "**Bazı** platformlar" dediği için −3 değil |
| `banka` · Ödeme kuruluşu | KKTC | −2 | Wise ✗ + Payoneer ✗ (K2). Sayfa düzeyinde ret satırı yok, o yüzden −2 |
| `musteri` · Avrupa ve İngiltere | KKTC | −2 | fitTable "AB pazarına fatura kesen" ok:false → İngiltere · FACTS.limit "AB üyesi değil" |
| `ziyaret` · Her şey uzaktan | Dubai | **−3** | fitTable "Hiç seyahat edemeyecek olan" ok:false → İngiltere · FACTS.limit · clarify "vekâletle yürümüyor" |
| `butce` · Mümkün olan en düşük | Dubai | −2 | fitTable "Kuruluş bütçesi dar olan" ok:false → İngiltere · watchouts |
| `vize` · Kendim için | İngiltere | −2 | fitTable "Oturum vizesi isteyen" ok:false → Dubai · FACTS.limit |
| `vize` · Kendim ve ekibim | İngiltere | **−3** | aynı üç kaynak, bir kademe yukarı |

Kazanç perdesindeki eksiler bu listede yok çünkü elle yazılmadılar; bant
kuralından çıkıyorlar (yukarıda, Adım 3).

### Bilerek YAZILMAYAN iki eksi

- **`ziyaret · uzaktan` KKTC'ye eksi yazmıyor.** KKTC'de de yerinde imza
  isteniyor (watchouts + steps + faq) ama bu bir watchout, `fitTable`'da
  `ok:false` satırı değil ve tescil vekâletle yürüyor. Kurala girmiyor.
- **`musteri · avrupa` Dubai'ye eksi yazmıyor**, oysa Dubai fitTable'ında
  "Yalnızca AB'ye fatura kesen → ok:false" satırı var. Şıkkın metni "ağırlıklı
  olarak", satır "yalnızca". İkisi aynı şey değil. (B3 zaten bunu soruyor.)

**Soru:** Bu iki boşluk doğru mu, yoksa o iki eksi de yazılsın mı?

## 3 · Dördüncü sonuç: "Henüz erken"

Kapı **tek bir cevaba** bağlı: kazanç en alt bandda (19.000 USD ve altı).
Bileşik bir skora bağlanmadı, üç sebeple: eşik tek bir sayıyla ilgili, ziyaretçi
hangi cevabın bu sonucu doğurduğunu görebilmeli ve tek tıkla geri
alabilmeli. Kombinasyonların **%25'i** bu ekrana düşüyor.

Ekranda ne var, ne yok:

- **Ülke önerilmiyor.** Sıralama tablosu duruyor ama birinci satırın mavi
  vurgusu ve parıltısı kapalı, başına da "eşiği geçtiğinizde şöyle görünüyor"
  çerçevesi konuyor. Tabloyu tamamen gizlemek, ziyaretçiyi cezalandırmak gibi
  okunurdu: diğer on cevap gerçek bir sıralama üretti.
- **İlk iki ülkenin kartları hiç basılmıyor.** "Öne çıkan" rozetli bir kart,
  başlıkta kurulan cümleyi bir satır sonra geri alırdı.
- **"Kurulumu başlat" yok.** Birincil çıkış **bilgi** (/ulkeler), ikincil çıkış
  **soru** (/iletisim). Mağazadaki ülke de değişmiyor ve `fit_test_start` olayı
  gönderilmiyor.
- **Sebep sayıyla yazılı:** en ucuz yapı 1.900 USD, bu bandda kazancın en az
  yüzde 10'u, ve karşılığında otomatik vergi avantajı yok (sitenin kendi
  cümlesi: "Vergi avantajı için gelen yanlış adreste").
- **Ret değil randevu:** üç maddelik "şu değişirse geri gelin" listesi.
- **Döküm duruyor:** sonucu doğuran kazanç cevabı tam metniyle görünüyor ve tek
  tıkla değiştirilebiliyor.
- GTM: `fit_test_complete` olayına tek alan eklendi, `verdict: "erken" | "ulke"`.
  Mevcut dört alan (`answers`, `top`, `runner_up`, `gap`) bozulmadı.

**Soru:** Ton doğru mu? Bugünkü başlık *"Bu ölçekte şirket kurmak henüz erken
görünüyor."* Özne kişi değil hesap; "hazır değilsiniz" bilerek yazılmadı.

## 4 · Ölçek: negatif puan çubuğu kırıyordu

Puan eksiye düşebildiği anda `puan / FIT_CEIL` kalıbı bozuluyor: negatif oran
negatif genişlik demek, tarayıcı 0'a kırpıyor ve çubuk kaybı hiç göstermiyor.
Üç yol denendi:

| yol | karar | gerekçe |
|---|---|---|
| sıfırda kırpma | **elendi** | −1 ile −6 aynı görünür; puan DÜŞERKEN çubuk oynamaz. F1'in aynası |
| taban kaydırma (payda = tavan − taban) | **elendi** | hiç cevap yokken üç çubuk dolu başlardı; ayrıca F1'e verilen cevap "ölçek sıfırdan başlar" idi |
| **iki yönlü çubuk** | seçildi | rayda sabit sıfır çizgisi; artı sağa, eksi sola, piksel/puan iki yönde aynı |

### Beraberlik testi yeniden yapıldı · ve F2 sonuç ekranında hâlâ duruyordu

Bu turun ikinci ölçülmüş kusuru. Defterdeki puan tablosu bir tur önce subgrid'e
alınmıştı ("eşit puan eşit piksel"), ama **sonuç ekranındaki tablo eski
kalıptaydı**: `.uyg-list` bir flex sütunu, her satır kendi ızgarası, ad sütunu
`minmax(84px, auto)` ve çubuk rayı ondan artan. Yani F2 kapatılmamış, yer
değiştirmişti.

Üç tam beraberlik, 1400 pikselde, geçişler kapatılıp bitiş durumu zorlanarak
yeniden ölçüldü (tuzak N):

| puan | ray | Dubai | İngiltere | fark |
|---|---|---|---|---|
| 2 – 2 | 651,99 px (üç satırda da aynı) | 31,80 px | 31,80 px | **0,00 px** |
| 4 – 4 | 651,99 px | 63,60 px | 63,60 px | **0,00 px** |
| 7 – 7 | 653,46 px | 111,56 px | 111,56 px | **0,00 px** |

Aynı üç beraberlik **cevap defterindeki panelde** de ölçüldü: 7,97 / 7,97 ·
15,94 / 15,94 · 28,11 / 28,11 → üçünde de 0,00 px. Ayrıca 16 – 16 beraberliğinde
KKTC −6 puanla ölçüldü: eksi çubuk 22,98 px, sağ kenarı tam sıfır çizgisinde.

Ölçek de doğrulandı: ray 651,99 px, açıklık 41 puan → **1 puan = 15,90 px** ve
4 puan tam olarak 63,60 px. Aynı sayı iki ekranda da geçerli, çünkü ikisi de
`fitBarPay`'i çağırıyor.

*BU TURDA AÇIKLIK DEĞİŞTİ: eksiler daralınca taban −11'den −3'e, tavan 30'dan
29'a indi, yani açıklık 41 → 32 ve sıfır çizgisi rayın %26,8'inden %9,4'üne
kaydı. Piksel ölçümü yeniden alınmadı çünkü CSS'te tek satır değişmedi ve
taşmama artık cebirsel olarak garanti: en derin eksinin dolgusu
`|FIT_FLOOR| / FIT_SPAN = 3/32 = FIT_ZERO`, en yüksek artınınki
`FIT_CEIL / FIT_SPAN = 29/32 = 1 − FIT_ZERO`. İkisi de rayın kendi yarısını tam
dolduruyor, dışına çıkmıyor.*

## 5 · Bu turda ekranda düzelen iki şey daha

- **Dökümdeki eksi pullar görünmüyordu.** Süzgeç `> 0` olduğu için negatif
  ağırlıklar sonuç dökümünde hiç basılmıyor, ekran onlara "puan yok" diyordu.
  Puanı gösteren bir ekranın eksiyi saklaması, o bölümün kapatmak için var
  olduğu şeyin ta kendisi.
- **375 pikselde gezinme satırı kesiliyordu.** "Önceki + Baştan + Sonraki soru"
  359 px, sütunun içi 335 px; birincil düğmenin 38,6 pikseli ekrandan
  düşüyordu. `overflow-x: clip` yüzünden gerçek kaydırma 0 çıkıyor, yani
  scrollX'e bakan bir doğrulama bunu yakalamıyor (tuzak D).

## 6 · Bu turda ekran dışında kalan, HÂLÂ AÇIK iş

Testin kendi dosyaları güncellendi ama **testi anlatan üç metin başka
dosyalarda** ve hâlâ dokuz/beş soru diyor:

| dosya | bugün yazan | olması gereken |
|---|---|---|
| `src/app/araclar/uygunluk-testi/page.tsx` · `lead` | "Dokuz soru, üç bölüm." | "On bir soru, dört bölüm." |
| aynı dosya · `metadata.description` | "Dokuz soruluk anket" | "On bir soruluk anket" |
| `src/lib/tools/catalog.ts` · `meta` ve `is` | "beş soru" (bir tur önce de eskiydi) | "on bir soru" |

Ayrıca `src/components/lab/anketIkon.tsx` artık **öksüz**: onu kullanan üç lab
adayı bu turda silindi ama dosya duruyor ve `Record<FitIcon, LucideIcon>`
tuttuğu için `FitIcon`'a yeni anahtar eklenmesini engelliyor. Dördüncü perdenin
ikonları tam bu yüzden mevcut anahtarlardan seçildi.

---

# ÖNCEKİ TURLARDAN KALAN AÇIK SORULAR

> **Bu bölümdeki bütün sayılar 9 SORULUK EVRENDE (10.368 kombinasyon) alındı ve
> tarihî kayıt olarak duruyor.** Bugünkü evren 124.416 kombinasyon; güncel
> dağılım yukarıdaki "Tek cümlelik sonuç" tablosunda. Sorular ise hâlâ açık:
> hiçbiri cevaplanmadı, yalnız üzerlerine bir tur daha bindi.
>
> Güncelleme gereken üç yer, güncel karşılıklarıyla:
>
> | eski sayı | bugünkü karşılığı |
> |---|---|
> | KKTC %2,3 | **%4,1** (negatif puan KKTC'yi düşürmedi, yükseltti) |
> | soru bazında sıra çevirme sırası | Seyahat %53,4 · Oturum vizesi %40,4 · Bütçe %36,7 · Müşteri konumu %29,4 · Faaliyet %24,7 · Banka %21,6 · **Yıllık kazanç %18,6** · Takvim %14,0 · Platform %10,3 · **Yıllık gider %9,3** · Tahsilat %8,6 |
> | KKTC'nin kazandığı profil | değişmedi: Türkiye'ye satan (3.883/5.067), platformda satmayan (4.654), havaleyle tahsil eden (3.579), seyahat edebilen (3.807) |

## Önceki tur: beş soru dokuz oldu

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

## Özet: en az şu beşi lazım

1. **A1** kapanan işlerin ülke dağılımı. Bu tur daha da kritik: test artık
   kombinasyonların **%62'sinde İngiltere** diyor, oysa bir tur önce %43'tü.
   Gerçek dağılım buysa doğru davranıyor, değilse kazanç bandları fazla geniş.
2. **K1** Dubai'nin yıllık yükü 2.100 mü 9.420 mu, ve İngiltere ile KKTC'nin
   aynı dökümü. Cevap Dubai'nin önerilme oranını %33,9 ile %27,5 arasında
   oynatıyor.
3. **K2** 1/10 oranı. Testteki tek uydurulabilir sayı ve kombinasyonların
   %25'ini "henüz erken" ekranına düşüren şey bu.
4. **A2** KKTC gerçekten satılıyor mu. Bu turda %2,3'ten %4,1'e çıktı ama hâlâ
   yirmide bir.
5. **C** beraberlikte ne olacak. 6.682 kombinasyonda ilk iki eşit ve kazananı
   hâlâ dizideki yazım sırası belirliyor; KKTC bir kez bile kazanmıyor.

Bunlar gelirse test savunulabilir hâle gelir. B ve K3'teki maddeler ince ayar,
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

Dağılım tablosu elle yazılmadı. Ağırlık ya da fiyat değiştiğinde yeniden
çalıştırın: `src/lib/fitTest.ts` içindeki `FIT_QUESTIONS` üzerinden bütün
kombinasyonları puanlayan kısa bir betik yeterli. En pratik yol depodaki
`jiti`'yi kullanmak, çünkü dosya `@/` takma adıyla üç modül daha çekiyor:

```js
import { createJiti } from "<depo>/node_modules/jiti/lib/jiti.mjs";
const jiti = createJiti(import.meta.url, { alias: { "@": "<depo>/src" } });
const { FIT_QUESTIONS, FIT_COUNTRIES } = await jiti.import("<depo>/src/lib/fitTest.ts");
```

Bakılacaklar: ülke başına birincilik sayısı, teorik tavan **ve taban**,
beraberlik sayısı, soru bazında "tek başına sırayı çevirebiliyor mu" oranı, ve
bu turdan itibaren "henüz erken" tetiklenme oranı. Kaymanın nereden geldiğini
ayrıştırmak için iki yalıtım da işe yarıyor: eksileri 0'a kırpmak ve kazanç
perdesini çıkarmak (yukarıda "Hangi değişiklik ne kadarını yaptı").

Beraberlik ölçümü tarayıcıda ve **1400 piksellik aynı kaynaklı bir iframe
içinde** yapılıyor (`resize_window` gerçek yerleşimi değiştirmiyor, tuzak L) ve
ölçmeden önce bütün geçişler kapatılıp bitiş durumu zorlanıyor (tuzak N):

```css
*, *::before, *::after { animation: none !important; transition: none !important }
```
