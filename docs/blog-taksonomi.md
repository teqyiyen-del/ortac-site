# Blog taksonomisi — çok kategori olunca ne yapacağız?

Müşterinin sorusu, birebir:

> "bide çok katagori olduğunda tam olarka nasıl bir yol izleyeceğiz? üst
> katagoriler ile böleriz sanırım bide ek olarak alt katagorileri olur kendi
> içlerinde, onları yukardan filtreleme yapmayız sadece blogun içinde
> başlığının yanında fln yazar."

**Kısa cevap: öneri doğru, ve büyük kısmı bugün ZATEN kurulu.** Eksik olan tek
şey adı: sitede "alt kategori" diye bir alan yok ama işini yapan bir alan var
(`topic`). Bu belge (1) bugünün sayılarını, (2) önerinin nerede tuttuğunu ve
nerede kırıldığını, (3) hangi eşikte ne yapılacağını yazıyor.

Kaynak: `src/lib/blog.ts`. Ölçümler yerel sunucuda, sabit genişlikli aynı
kaynaklı iframe içinde alındı (`resize_window` gerçek yerleşimi değiştirmiyor).

---

## 1 · Bugünkü durum, sayarak

15 kayıt, 5 kapalı kategori, kayıt başına **tek** kategori.

| Kategori | Kayıt | Yayınlanmış | Örnek (yer tutucu) | Payı |
|---|---|---|---|---|
| Ülke rehberi | 6 | 0 | 6 | %40,0 |
| Yapı ve ülke seçimi | 3 | 0 | 3 | %20,0 |
| Kuruluş sonrası | 3 | 0 | 3 | %20,0 |
| Maliyet ve vergi | 2 | 1 | 1 | %13,3 |
| Sektör notları | 1 | 0 | 1 | %6,7 |
| **Toplam** | **15** | **1** | **14** | |

Dağılım dengesiz ve dengesizliği bilinçli: ülke rehberi bir tur önce ayrı bir
bölümdü, tek başına listenin %40'ı. En küçük kategoride tek kayıt var.

### Sitede bugün DÖRT sınıflandırma ekseni var

| Alan | Kapalı mı | Kayıt başına | Değer sayısı | Süzülüyor mu | Adresi var mı | Ekranda mı |
|---|---|---|---|---|---|---|
| `category` | evet (5) | 1, zorunlu | 5 | **evet** | **evet** (`/blog/kategori/<slug>`) | çip + rozet |
| `topic` | hayır (serbest metin) | 1, zorunlu | 11 | hayır | hayır | satırda ve künyede |
| `tags` | hayır | ort. **2,07** | 14 | hayır | hayır | **hiç** (yalnız JSON-LD `keywords`) |
| `country` | evet (3) | 0 veya 1 | 3 | ülke sayfalarında | ülkenin kendi sayfası | künyede değil, ülke sayfasında |

**Müşterinin tarif ettiği "alt kategori" = `topic`.** Bugün tam olarak
istediği yerde basılıyor: satırın üst şeridinde kategori rozetinin yanında ve
yazının künyesinde. Süzgeç çubuğuna girmiyor, adresi yok, hiçbir sayacı
belirlemiyor.

### `topic`, kategorilerin altında temiz bir ağaç oluşturuyor

11 değerin hiçbiri iki kategoriye birden düşmüyor. Yani hiyerarşi zaten var,
sadece kod bunu bir hiyerarşi olarak bilmiyor:

| Üst kategori | Bugünkü alt ibareler | Adet |
|---|---|---|
| Ülke rehberi | Ülkede ne yapılabilir (3) · Kimin için uygun (2) · İlk yıl (1) | 3 |
| Yapı ve ülke seçimi | Yapı seçimi (2) · Ülke seçimi (1) | 2 |
| Kuruluş sonrası | Kuruluş sonrası (1) · Banka ve ödeme (1) · Muhasebe (1) | 3 |
| Maliyet ve vergi | Maliyet ve bütçe (1) · Vergi çerçevesi (1) | 2 |
| Sektör notları | Sektör notları (1) | 1 |

İki kusur görünüyor ve ikisi de bir dakikalık iş, mekanizma değil:

* `Kuruluş sonrası` ve `Sektör notları` alt ibareleri üst kategorinin adını
  tekrar ediyor. Satırda "Kuruluş sonrası · Kuruluş sonrası" çıkıyor.
* Alt ibare başına ortalama **1,36 kayıt** düşüyor. 11 alt ibareden 7'sinde
  tek kayıt var. Bu, aşağıdaki adres kararının dayanağı.

---

## 2 · Öneri doğru mu? Faset ve etiket ayrımı

Müşterinin ayrımı kütüphane biliminin **faset** (süzülebilir eksen) ve
**etiket** (yalnız gösterilen) ayrımının ta kendisi. Bir eksenin faset
olabilmesi için üç şart var, üçü de bugün sağlanıyor:

| Şart | Neden | `category` bugün |
|---|---|---|
| Kapalı küme | Serbest metin "Muhasebe" / "muhasebe" ile iki ayrı sekme üretir, sayaçlar sessizce yanlışa döner | ✔ 5 değerlik birleşim tipi |
| Her kayıtta dolu | Değeri olmayan kayıt hiçbir süzgeçte görünmez, listeden düşer | ✔ zorunlu alan |
| Küçük ve ekrana sığar | Süzgeç şeridinin boyu değer sayısıyla doğrusal büyüyor (aşağıda ölçüldü) | ✔ 5 değer, 320px'te 5 satır |

Etikette bu şartların hiçbiri gerekmiyor, çünkü etiket bir söz vermiyor:
"tıklarsan bu kadar kayıt göreceksin" demiyor, sadece "bu yazı şununla ilgili"
diyor. `topic` bu yüzden serbest metin kalabiliyor.

**Öneri nerede kırılıyor:** tek bir yerde, ve o yer isimlendirme.

Müşteri "alt kategori" diyor ve "kendi içlerinde" diye ekliyor, yani bir AĞAÇ
tarif ediyor. Ağaç, etiketin taşımadığı bir şey vaat eder: gezinilebilirlik.
Ziyaretçi bir ağaç dalı gördüğünde ona tıklanabileceğini varsayar. Bu sitede
kategori rozeti zaten rozet biçiminde ve tıklanabilir şeyler de rozet biçiminde
(mavi = "git/tıkla" dili). Yani alt kategori rozet gibi basılırsa ölü tıklama
üretir.

Bugünkü çözüm bunu zaten bilerek çözmüş: `topic` rozet DEĞİL, küçük punto
büyük harf bir metin (`.bh-cat`), kategori rozetinden (`.bh-kind`) görsel
olarak ayrı. Ayrım korunmalı. Alt kategori bir gün adres kazanırsa biçimi de
o gün rozete döner, önce değil.

---

## 3 · Nerede kırılır, sayıyla

### 3.1 · Süzgeç şeridi: her yeni üst kategori 320px'te tam +44px

320px genişlikte kabın iç genişliği 268px ve tek satıra yalnızca "Tümü" + bir
kategori sığıyor. Dolayısıyla ölçüm doğrusal çıkıyor (çipe ikon eklendikten
sonraki hâl):

| Üst kategori | Durak | Şerit satırı | Şerit yüksekliği | Şerit + sayım cümlesi |
|---|---|---|---|---|
| **5 (bugün)** | 6 | 5 | 228px | **296,7px** |
| 6 | 7 | 6 | 272px | 340,7px |
| **7** | 8 | 7 | **316px** | 384,7px |
| **8** | 9 | 8 | 360px | **428,7px** |
| 9 | 10 | 9 | 404px | 472,7px |
| 10 | 11 | 10 | 448px | 516,7px |
| **11** | 12 | 11 | 492px | **560,7px** |
| 13 | 14 | 13 | 580px | 648,7px |
| 15 | 16 | 15 | 668px | 736,7px |

Karşılaştırma noktaları (aynı genişlikte ölçüldü):

* bir arşiv satırı = **290,3px**
* öne çıkan kart = **531,1px**
* en küçük gerçekçi telefon ekranı (iPhone SE) = **568px**
* şeridin belgedeki başlangıç noktası = 645px, yani şerit zaten katlamanın altında

Buradan **üç somut eşik** çıkıyor:

1. **7 üst kategoride şerit (316px) bir yazı satırından (290,3px) uzun olur.**
   Süzgeç, süzdüğü içerikten fazla yer kaplamaya başlar. İlk gerçek kırılma bu.
2. **8 üst kategoride kontrol bloğu (428,7px) 568px'lik ekranın %75'ini yer.**
   Ziyaretçi bir tek yazı görmeden neredeyse bir ekran çip görür.
3. **11 üst kategoride kontrol bloğu (560,7px) bir tam ekrana eşitlenir.**
   Bu noktadan sonra sarma listesi savunulamaz; şeridin biçimi değişmek
   zorunda (yatay kaydırma + iki uçta gradyan maskesi, ya da "daha fazla"
   katlaması).

Masaüstü tarafı sınırlayıcı değil: 1440px'te bugünkü altı durak tek satır, tek
satır eşiği ~1.102px. Kısıt telefonda.

### 3.2 · Süzülmüş liste ne zaman kendi başına uzar

| | 320px | 1440px |
|---|---|---|
| Bir arşiv satırı | 241,4 – 341,1px (ort. **288px**) | 119,5 – 143,1px (ort. **130px**) |
| Öne çıkan kart | 505,1 – 531,1px | 255,8 – 265,6px |
| `/blog/kategori/ulke-rehberi` (6 kayıt) belge boyu | **6.430px** = 11,3 ekran | 4.026px |
| `/blog` (15 kayıt) belge boyu | **8.561px** = 15,1 ekran | 4.735px |
| `/blog` yalnızca liste bloğu (14 satır) | **4.266,1px** = 7,5 ekran | 1.889,1px |

**Bugün bir kategoride en fazla 6 yazı gösteriliyor** (Ülke rehberi: 1 öne
çıkan kart + 5 satır = 1.398,6px liste bloğu, 2,5 telefon ekranı). Bu rahat.

Eşik hesabı: telefonda saf liste bloğu 5 ekranı (2.840px) geçtiğinde ziyaretçi
başa dönmeden listenin sonunu hatırlayamaz.

* 2.840 ÷ 288 ≈ **10 satır**, yani **bir kategoride 11 yazı**.
* Bugünkü %40'lık ülke rehberi payı sürerse bu, **toplam ~27 yazı** demek.
* Masaüstünde aynı eşik 33 satıra denk geliyor, yani kısıt yine telefon.

`/blog` kökü bu eşiği bugün zaten aşmış durumda (14 satır = 7,5 ekran), ama
kökün cevabı var: süzgeç. **Kategori sayfasının altında hiçbir şey yok** ve
kırılma orada yaşanır.

### 3.3 · Satırda kaç alt ibare gösterilebilir

Satırın üst şeridi (`.bh-row-k`) sarma yapan bir flex satırı. On dört satırın
toplam yüksekliği, satır başına gösterilen alt ibare sayısına göre:

| Genişlik | 1 alt ibare | 2 alt ibare | 3 alt ibare |
|---|---|---|---|
| 320px | 657,8px | **960,5px** (+302,7) | 1.010,9px (+353,1) |
| 430px | 445,8px | **648,2px** (+202,4) | 723,8px (+278,0) |
| 768px | 294,0px (hepsi tek satır) | **622,9px** (+328,9, 14 satırın 13'ü ikiye çıkıyor) | 648,2px |
| 1440px | 294,0px | 294,0px (**+0**) | 294,0px (+0) |

İkinci alt ibare 1440px dışında her genişlikte listeyi %45 ilâ %112 uzatıyor ve
768px'te tek başına bütün satırları ikiye katlıyor. **Satırda tek alt ibare
sınırı buradan geliyor.**

---

## 4 · Bir yazı iki üst kategoriye girerse ne olur?

Tek kategori kuralı bilinçliydi ve gerekçeleri `lib/blog.ts` dosya başında
yazılı. Üçü de hâlâ geçerli, sayıyla:

1. **Sayaçlar toplamı kayıt sayısını aşar.** Bugün 6+3+3+2+1 = 15 ve sayfanın
   üstünde de "15 yazı" yazıyor. Çoklu kategoride bu iki sayı ayrışır. Bu depoda
   bir tur önce `/kaynaklar` şeridinde tam olarak bu yaşandı (şerit 15 derken
   sayfa 9 kart gösteriyordu).
2. **Öne çıkan kart ikilenir.** Her liste en yenisini büyük kartla basıyor; aynı
   kayıt iki listenin başında birden durur. Bugün bile bu yüzden `/blog`
   HTML'inde dört kayıt iki kez basılıyor (5.978 bayt, belgenin %2,9'u) ve
   BlogHub slotları kayda göre birleştirmek zorunda kalıyor. Çoklu kategori bu
   karmaşıklığı listeye de taşır.
3. **Üçüncü bir çok değerli eksen zaten var:** `tags` (kayıt başına ort. 2,07,
   14 benzersiz değer) ve `country`.

**Karar: üst kategori TEK kalır.** Bir yazı gerçekten iki üst kategoriye
giriyorsa bu, kategorilerin yanlış çizildiğinin işaretidir, kaydın iki değere
ihtiyacı olduğunun değil. 5 kategori ve 15 kayıtla doğru hamle birincil olanı
seçmek.

**Alt kategori ÇOKLU olabilir** ve bu bir tutarsızlık değil, tam olarak faset
ile etiket arasındaki farkın kendisi: alt kategori hiçbir sayacı, hiçbir öne
çıkan kartı, hiçbir adresi belirlemediği için çoklu olması hiçbir şeyi
bozmuyor. Tek kısıt görsel ve yukarıda ölçüldü: **satırda en fazla bir tane
göster, gerisi yazının künyesinde.**

---

## 5 · Adres mimarisi

Bugünkü şema:

```
/blog                        · hepsi (istemci tarafı süzgeç, hash ile)
/blog/kategori/<kategori>    · beş adres, beşi de gerçek sayfa
/blog/<slug>                 · yazının kendisi, kategorisinden bağımsız
/blog/rehberler, /rehberler  · 308 → /blog/kategori/ulke-rehberi
```

### Alt kategorinin adresi olmalı mı? Bugün HAYIR, ve sebebi bir sayı

Adres verilecek olsa şema şu olurdu ve bugünküyle çakışmadan yaşardı:
`app/blog/kategori/[kategori]/[alt]/page.tsx`. Yani mesele teknik değil.

Mesele şu: **11 alt ibareye adres verilseydi sayfa başına ortalama 1,36 yazı
düşerdi ve 11'inin 7'sinde tek yazı olurdu.** Tek kayıtlık bir liste sayfası
arama motoru için ince içerik: taranır, değerlendirilir, indekslenmez ya da
indekslenip kategori sayfasıyla yarışır. Yani kazanç değil, kayıp.

**Adres olmayınca ne kaybediyoruz:** uzun kuyruk arama sorguları için ayrı bir
iniş sayfası. "dubai banka hesabı açma" gibi bir sorgu bugün ya yazının
kendisine (`/blog/<slug>`) ya kategori sayfasına iniyor. Yazının kendisi zaten
daha iyi bir iniş sayfası, çünkü cevabı içeriyor. Alt kategori sayfası ancak o
başlıkta **birden fazla** yazı olduğunda yazının kendisinden daha iyi bir cevap
olur.

**Adres eşiği:** bir alt kategoriye adres, ancak şu üçü birden sağlandığında
verilir:

* o alt kategoride **en az 5 yayınlanmış** yazı (yer tutucular sayılmaz),
* üst kategorisinde **en az 3** alt kategori var (yoksa alt kategori üstün
  kopyası olur, iki adres aynı listeyi basar),
* alt kategori **kapalı bir listeye** çevrilmiş, yani serbest metin değil.

Bugün üç şart da sağlanmıyor: en kalabalık alt ibarede 3 kayıt var ve o üçü de
yer tutucu; yayınlanmış toplam yazı sayısı 1.

---

## 6 · Bugün ne yapılmalı, ne yapılmamalı

### Yapıldı

* **Beş kategoriye ikon.** Süzgeç çipinde ve karışık listedeki kategori
  rozetinde. Hangi glifin neden seçildiği `app/blog/BlogHub.tsx` içindeki
  `CATEGORY_ICON` karar kaydında; ölçümler `app/css/blog-hub.css` içinde.

### Yapılmadı ve BİLEREK yapılmadı

**Alt kategori mekanizması 15 kayıt için erken.** Gerekçe tek bir sayı:
şu an 11 alt ibareye karşılık **1,36 kayıt** düşüyor ve yayınlanmış yazı sayısı
**1**. Alt kategori bir GRUPLAMA aracı; gruplanacak bir şey olmadan kurulan
gruplama, kendi bakım maliyetinden başka bir şey üretmez. Ayrıca müşterinin
istediği davranış (alt ibare yalnızca yazının içinde, başlığının yanında)
bugün `topic` alanıyla ZATEN çalışıyor; yeni bir alan açmak aynı işi iki alanla
yapmak olurdu ve bu depoda "aynı bilgi iki yerde" her seferinde çelişkiyle
sonuçlandı.

Ayrıca **`topic` bugün kapalı listeye çevrilmedi.** Çevrilseydi 11 değerlik bir
birleşim tipi doğardı ve her yeni yazı ya listedeki bir değere sıkışmak ya da
listeyi büyütmek zorunda kalırdı. Serbest metin, alan yalnızca gösterildiği
sürece bedava; süzülmeye başladığı gün kapatılır.

### Tetikleyiciler: şu eşiği geçince şunu yap

| # | Eşik | Yapılacak |
|---|---|---|
| T1 | Yayınlanmış yazı **20**'yi geçince | `topic` değerleri sayılıp normalize edilir (bugünkü 11 değerden kaçının gerçekten ayrı bir başlık olduğu görülür). Kod değişmez, yalnız veri temizlenir. |
| T2 | Bir alt ibarede **5 yayınlanmış** yazı birikince VE üst kategorisinde **3+** alt ibare olunca | `topic` kapalı listeye çevrilir (`BlogSubcategory`), `/blog/kategori/<üst>/<alt>` rotası açılır, alt ibare rozet biçimine geçer. |
| T3 | Bir kategoride **11 yazı**'yı geçince (telefonda 5 ekranlık saf liste) | Kategori sayfasına sayfalama ya da o sayfa içinde ikinci bir süzgeç (alt kategori) gelir. İkisinden biri yeter, ikisi birden gerekmez. |
| T4 | Üst kategori **7**'yi geçince (şerit 316px, bir yazı satırından uzun) | Şerit sarma listesi olmaktan çıkar: 320px'te yatay kaydırma + iki uçta gradyan maskesi. Kaydırılabilir olduğunu gösteren bir işaret şart. |
| T5 | Üst kategori **11**'i geçince (şerit 560,7px, bir tam telefon ekranı) | Sarma listesi savunulamaz. Ya kategori sayısı azaltılır (birleştirme) ya da şerit bir "kategoriler" sayfasına dönüşür. |
| T6 | Toplam yayınlanmış yazı **50**'yi geçince | Blog içi arama. Bugün gereksiz: 15 kaydın 14'ü yer tutucu ve tamamı tek ekranda süzülebiliyor. |

Eşiklerin hepsi `/blog` sayfasında yeniden ölçülebilir; hiçbiri tahmin değil.

---

## 7 · Özet, tek paragraf

Müşterinin önerisi doğru ve büyük kısmı kurulu: üst kategori faset (kapalı,
tek, süzülür, adresi var), alt kategori etiket (serbest, yalnız gösterilir) ve
bu ikincisi bugün `topic` adıyla çalışıyor, istenen yerde de basılıyor. Bu
turda alt kategori için yeni bir mekanizma kurulmadı, çünkü 11 alt ibareye
1,36 kayıt düşüyor ve yayınlanmış yazı sayısı 1. Kurulacağı an belli ve sayıyla
yazılı (yukarıdaki T2). Üst kategori sayısı ise 7'yi geçtiğinde 320px'te şerit
bir yazı satırından uzun olur, 11'i geçtiğinde bir tam telefon ekranını doldurur;
şeridin biçimi o eşiklerde değişmek zorunda.
