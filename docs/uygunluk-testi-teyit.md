# Uygunluk testi — Murat abiye sorulacaklar

Bu belge tek bir işaretin karşılığı: `src/lib/fitTest.ts` içindeki **`SWAP:FIT_WEIGHTS`**.

## Neden bu teyide ihtiyaç var

Test, ziyaretçinin beş cevabını puanlayıp bir ülkeyi öne çıkarıyor. Hangi ülkenin
çıkacağını **tamamen o puanlar belirliyor** ve puanları bugün kimse onaylamadı.
Yani test şu an açık, ama söylediği şeyin arkasında firmanın imzası yok.

192 olası cevap kombinasyonunun tamamı çalıştırıldı. Çıkan tablo:

| | sonuç |
|---|---|
| Dubai birinci | 101 / 192 (%53) |
| İngiltere birinci | 76 / 192 (%40) |
| **KKTC birinci** | **15 / 192 (%8)** |
| Teorik tavan | Dubai 15 · İngiltere 14 · **KKTC 10** |
| Beraberlik | 20 durum |
| Beraberliği kazanan | Dubai 16/20 — **yalnızca listede önce yazıldığı için** |
| Tek cevap değişse sıra dönerdi | 156 / 192 (%81) |

En kritik satır sonuncudan ikincisi: **KKTC yapısal olarak kazanamıyor.** Tavanı
Dubai'nin üçte bir altında, yani ziyaretçi hangi cevapları verirse versin KKTC'nin
birinci çıkması çoğu yolda matematiksel olarak imkânsız.

Bu bir hata olabilir — ya da firmanın gerçeğinin doğru yansıması olabilir.
Ayıramayız, çünkü gerçeği bilmiyoruz. Aşağıdaki sorular tam olarak bunu ayırmak için.

---

## A · Önce zemin: gerçek nedir?

Bu üç cevap gelmeden tek tek puanları konuşmak erken. Ağırlıkların ne olması
gerektiğini bu üçü belirliyor.

**A1. Kapanan işlerin ülkelere gerçek dağılımı nedir?**
Kabaca yüzde yeter. Eğer iş zaten %70 Dubai ise, testin %53 Dubai demesi bir kusur
değil, doğru davranış. Dağılım dengeliyse ağırlıklar yanlış demektir.

**A2. KKTC sattığımız bir ürün mü, kabul ettiğimiz bir niş mi?**
Aktif olarak öneriyorsak %8 düşük ve düzeltilmeli. Yalnızca özellikle isteyene
yapıyorsak %8 gerçeği anlatıyor olabilir ve dokunmaya gerek yok.

**A3. Kesin eleyici var mı?**
Yani "şu koşulda o ülkeyi asla önermeyiz" diyebileceğimiz durumlar. Bugün testte
fiilen bir tane var: *"her şey uzaktan olmalı" → İngiltere +4*, diğer ikisine 0.
Bu, tek cevapla iki ülkeyi eleyen tek ağırlık. Başka eleyiciler varsa puanla değil,
kuralla modellenmeli.

---

## B · Soru soru teyit

Beş sorunun her biri için "bu doğru mu" sorusu. Ölçüm sırasında **zayıf ya da
şüpheli** bulunan dördünü başa aldım.

### ⚠️ B1. Bütçe sorusu — KKTC iki bantta birden puan alıyor
Bugün: *"Mümkün olan en düşük"* → İngiltere 3, **KKTC 2**. Ayrıca *"Orta"* → KKTC 2.

KKTC hem "en düşük" hem "orta" bantta aynı puanı alıyor. İkisi birden doğru olamaz.
**Soru:** KKTC gerçekte düşük bütçeli mi, orta bütçeli mi? Orta ise "en düşük"
bandındaki 2 puan 0 ya da 1 olmalı.

### ⚠️ B2. Seyahat sorusu — tek eleyici ağırlık
Bugün: *"Hayır, her şey uzaktan olmalı"* → **İngiltere 4**, Dubai 0, KKTC 0.

**Soru:** Dubai'de hiçbir senaryoda %100 uzaktan kuruluş mümkün değil mi? Banka
imzası ve vize biyometrisi için gelmek gerçekten şart mı, yoksa istisnası var mı?
Eğer istisna varsa 4 fazla; yoksa doğru ve dokunmayacağız.

### ⚠️ B3. Müşteri konumu — Avrupa cevabında Dubai'ye 1 puan
Bugün: *"Avrupa ve İngiltere"* → İngiltere 3, **Dubai 1**.

**Soru:** Avrupa müşterisi olan birine Dubai'yi öneriyor muyuz? Öneriyorsak neden —
o 1 puanın gerekçesi ne? Önermiyorsak 0 olmalı.

### ⚠️ B4. Vize sorusu — "sadece şirket" cevabında KKTC'ye 1 puan
Bugün: *"Hayır, sadece şirket"* → İngiltere 2, **KKTC 1**.

**Soru:** Vize istemeyen biri için KKTC'nin İngiltere'ye göre bir üstünlüğü var mı?
Yoksa 0 olmalı.

### B5. Faaliyet sorusu — kapsanmayan sektörler
*"Ne satıyorsunuz?"* sorusunda dört seçenek var: yazılım, e-ticaret, danışmanlık ve
**"Başka bir alan"**. Sonuncusunun ağırlığı bilerek **sıfır** — çünkü gayrimenkul,
turizm, sağlık, finans gibi alanlar için üç ülkeyi ayıran doğrulanmış bir kuralımız yok.

**Soru:** Bu alanlarda net bir tercih var mı? (Örn. "gayrimenkulde Dubai", "turizmde
KKTC".) Varsa seçenek bölünüp puanlanabilir; yoksa sıfır kalması doğru.

---

## C · Beraberlik kuralı — bugün kural yok

20 kombinasyonda ilk iki ülke **tam eşit puan** alıyor. Bugün kazanan hep Dubai,
ama bunun bir gerekçesi yok: dizide önce yazıldığı için kazanıyor. Sonuç ekranı
bunu artık gizlemiyor ve açıkça "sıralamayı listenin kendi yazım sırası belirledi"
diyor — ama bu bir çözüm değil, dürüst bir itiraf.

**Soru:** Eşitlikte ne olsun?
- (a) Firmanın tercih sırası belirlesin — o sıra nedir?
- (b) Hiçbiri öne çıkmasın, "ikisi de uygun" densin ve ziyaretçi kıyasa gitsin
- (c) Eşitliği bozacak bir ek soru sorulsun

---

## D · Aracın iddiası ne olsun?

Bugünkü sonuç ekranı bilerek **hüküm kurmuyor**: "şu ülke size uygun" demiyor,
"verdiğiniz cevaplara göre şu öne çıkıyor" diyor, ikinci sırayı ve puan farkını
gösteriyor, farkın tek bir cevapla dönüp dönmediğini söylüyor.

**Soru:** Bu doğru ton mu? Firma daha kesin konuşmak istiyor mu, yoksa kısa liste
aracı olarak kalması mı doğru? (Kesin konuşmak istiyorsa ağırlıkların teyidi
daha da kritik hâle gelir — çünkü o zaman araç tavsiye veriyor demektir.)

---

## E · Ağırlıkları tahminden çıkarmanın kestirme yolu

En sağlam kalibrasyon, geçmiş işlerden gelir. Elde şu varsa ağırlıkları
tartışmaya hiç gerek kalmaz:

**Son 20–30 müşteri için:** müşterinin durumu (nerede müşterisi var, ne satıyor,
seyahat edebiliyor muydu, bütçesi, vize istedi mi) ve **sonunda hangi ülkede
kurulduğu**.

Bu liste gelirse testi o listeye göre ayarlarız: ağırlıkları, gerçek kararların
en çoğunu doğru tahmin edecek şekilde çözeriz. O zaman puanlar bizim görüşümüz
değil, firmanın kendi geçmişi olur.

---

## Özet — en az şu üçü lazım

1. **A1** — kapanan işlerin ülke dağılımı
2. **A2** — KKTC gerçekten satılıyor mu
3. **C** — beraberlikte ne olacak

Bunlar gelirse test savunulabilir hâle gelir. B'deki dört madde ince ayar,
E ise "tahmin etmeyi tamamen bırakalım" seçeneği.

Cevaplar geldiğinde değişecek tek dosya `src/lib/fitTest.ts`; her seçeneğin
yanında ağırlığın neden o olduğunu anlatan bir `why` alanı zaten duruyor,
yeni gerekçeler oraya yazılacak.
