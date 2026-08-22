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

## Son durum · 22.08.2026 · `ecdcebf`

Çalışma ağacı temiz, dal `origin/main` ile eşit.
**Vercel deploy'u ELLE**: push otomatik yayına almıyor, panelden Redeploy gerekiyor.

### Son altı tur

| commit | tur |
|---|---|
| `ecdcebf` | Gökyüzü zemini bütün sayfalara yayıldı, deneme kapandı |
| `afa7696` | Sol sütun dibe yığılmaktan kurtuldu, blok ortalandı |
| `36e3cc4` | Hero kartı kırıntıdan metnin sonuna hizalandı, ad kutusu tek satıra indi |
| `85d9561` | Footer CTA ile birleşti, yıldız kuruluş sayfasında, navbar kapanıyor |
| `d3ccb77` | Versal temizliği canlıda, hero gökyüzü ve footer zemini denemede |
| `e7a33f5` | Kapanış CTA'sı canlıya alındı (K3 · Ufuk) |
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

## 22.08.2026 · GÖKYÜZÜ ZEMİNİ BÜTÜN SAYFALARA YAYILDI · DENEME KAPANDI

Müşteri: *"şu herolarda yıldızlı muhabbeti tüm sayfalara taşıyabilirsin okeyiz
biz ona."*

`PageHero`nun `backdrop` varsayılanı `"grid"` → `"yildiz"`. Bileşeni çağıran
**on dokuz sayfanın hepsi** gökyüzü zeminiyle açılıyor. `/ulke/[slug]`'daki
açık `backdrop="yildiz"` de kaldırıldı: varsayılanı tekrar etmek "burada bir
istisna var" diye okunuyordu. Ana sayfa hero'su zaten yıldızdaydı, yani site
artık tek dilde.

**Izgara silinmedi**, kaçış kapısı: `backdrop="grid"` tek kelimeyle geri
getiriyor. `pagehero-grid.css` de silinemez — dosyanın büyük kısmı ızgaraya
ait değil: `.phg` kabındaki bütün değişkenler, `.phg-bg` maskesi ve
`.phg-glow` yıldız kipinde de kullanılıyor.

### Kalibrasyon TİPE bağlandı, çünkü tek takım sayı iki tipi birden tutmuyordu

Yıldız konumları bir tur önce **split hero** üzerinde (818 px) ölçülmüştü.
Kompakt hero çok daha kısa ve maskenin tam güçlü bandı orada eziliyor:

| | hero | eski bant | boy |
|---|---|---|---|
| split · /dubai 1440 | 818 | 180-442 | 262 |
| kompakt · /hakkimizda 1440 | 416 | 120-176 | **56** |
| kompakt · /hakkimizda 1024 | 402 | 120-162 | **42** |

Bandın üst ucu masaüstünde `%22` değil `--phg-soft` = nav 76 + 44 = **120px**;
alt ucu da `100% - --phg-fade` (2,5 hücre = 240px). Kısa hero'da ikisi birden
bağlayıcı oluyor. Split için seçilen %25 ve %44 orada 104 ve 183 piksele denk
geliyordu: **biri bandın üstünde, öteki altında** — iki kayan yıldız da sönük
bölgede geçecekti.

**İki düzeltme:**

1. **Yıldız kipinde `--phg-fade` 240 → 120px.** 2,5 hücre olmasının sebebi
   ızgaraydı ("yarım hücre sırası görünmesin"); yıldız kipinde hücre yok.
   Alt uç artık hiçbir sayfada bağlayıcı değil, bant her yerde `[soft, %54]`.
   Izgara kipi kendi 2,5 hücresiyle aynen duruyor.
2. **TİP A / TİP B ayrımı** (pagehero-grid.css'in zaten kullandığı ayrım).
   - **TİP B · split** — değerler bir önceki turdan, tek rakam oynatılmadı.
     İkisi de sol yarıda, çünkü sağ sütunu kart kaplıyor.
   - **TİP A · kompakt** (varsayılan, on beş sayfa) — sağda hiçbir şey yok,
     **biri soldan biri sağdan** geçiyor. Yol kısa ve sığ: split'in 21°'si
     bu bantta 139 px düşüyor ve bandı tek başına aşıyor.

**Yüzdeler en KISA hero'ya göre seçildi.** Sitenin en kısası /hakkimizda,
700-768px'te 350 piksele iniyor. Önce %32/%40 yazıldı, orada üst pay 5 piksele
düşüyordu — pozitif ama bir yazı tipi yedeğinin eksiye çevirebileceği kadar
ince. **%34/%42** ile aynı noktada pay 12'ye çıkıyor.

**Ölçüm · on dört sayfa/genişlik kombinasyonu, en küçük pay 12 px, hepsi ✓.**
Onaltı rotada ızgara 0, yıldız katmanı 4, kayan yıldız 4 doğrulandı.

---

## 21.08.2026 · SOL SÜTUN DİBE YIĞILMAKTAN KURTULDU

Müşteri, başlık + giriş + düğme bloğunu daire içine alıp iki yeri yeşille
işaretledi (kırıntı satırı ve güven satırları): *"kırmızıyla işaretlediğim
kısım iki yeşille işaretlediğim kısmın tam ortasında dursun bence. şuan her
şey full altta hizzalı ya biraz yoğun duruyor."*

**Teşhis:** bir önceki tur ALT hizayı kurmuştu ve bu, sol sütunun dört
parçasını birden dibe yığmıştı. Kırıntıdan başlığa 138 px boşluk, altta hiç
yok.

**Çözüm** — sütun kartla aynı bandı kaplıyor (146-724), içindeki iki yük
ayrılıyor: güven satırları dibe çıpalı (kartın künye satırının karşılığı),
başlık + giriş + düğme bloğu kalan yerin tam ortasında.

**İki `margin-top: auto`, daha fazlası değil.** Serbest alan iki otomatik pay
arasında eşit bölünüyor: yarısı başlığın üstüne, yarısı güven satırlarının
üstüne. Sonuç ikisini birden veriyor — güven bloğu dibe oturuyor ÇÜNKÜ altında
pay kalmıyor, üstteki blok da ortalanıyor.

`justify-content: center` denendi ve elendi: esnek kutu kuralına göre bir ögede
otomatik pay varsa `justify-content` hiç uygulanmıyor, yani "ortala + sonuncuyu
dibe it" yazınca sonuncu dibe gidiyor ama kalan üçü tepeye yapışıyordu.

Seçiciler konuma değil varlığa bakıyor (`:first-child` / `:last-child` +
`:has(.phx-trust)`): `:nth-child(3)` yazmak dört çocuğu şart koşardı ve
PageHero'nun `art` dalında `cta` ile `trust` opsiyonel.

**Ölçüm** (giriş animasyonları iptal edilerek, duruş hâli):

| | 1440 | 1024 | 1440 muhasebe |
|---|---|---|---|
| kart üstü ↔ kırıntı | 0 | 0 | 0 |
| kart altı ↔ güven satırı altı | 0 | 0 | 0 |
| blok ortası ↔ bölge ortası | 0 | 0 | 0 |

1440'ta blok 225-545, güven 654-724, kart 146-724. Kırıntı altındaki boşluk
138 → 59 px. 900 px'te (tek sütun) ve /ingiltere · /kktc'de hiçbiri devrede
değil (ölçüldü: hizalama `center`, sütun `block`).

### Girişte kartı bozan bir çakışma yakalandı

`hkcIn` giriş karesi `transform: translateY(16px)` yazıyordu ve kart bir önceki
turda `transform: scale(0.919)` almıştı. Animasyon normal bildirimi ezdiği için
`from` karesi ölçeksiz başlıyor, tarayıcı 700 ms boyunca matris çözümlemesiyle
scale(1)'den scale(0,919)'a geçiyordu. **Ölçüldü:** animasyonun 0. karesinde
kart 629 px yüksekliğinde ve 162-791 arasındaydı — yani tam boyda belirip
sonra küçülüyordu, bu turda kurulan hizanın kendisi girişte bozuluyordu.

Bağımsız `translate` özelliğine geçildi (`translate: 0 16px`). Tarayıcı önce
`translate` sonra `transform` uyguluyor, yani ikisi ayrı kanallarda ve ölçek
animasyonun hiç bilmediği bir şey. Doğrulandı: 0. karede kart artık
`matrix(0.919)` ve 578 px.

**Not · tuzak N'in yeni bir yüzü:** tarayıcı paneli gizliyken CSS animasyonları
ilerlemiyor, yani `getBoundingClientRect` giriş animasyonunun 0. karesini
döndürüyor. Bu turda üç ölçüm bu yüzden yanlış okundu. Doğru yöntem: ölçmeden
önce animasyonu iptal eden bir `<style>` enjekte etmek. `getAnimations()`
üzerinden `finished` beklemek İŞE YARAMAZ — sonsuz döngüler hiç çözülmüyor,
çağrı 30 s'de zaman aşımına uğradı.

---

## 21.08.2026 · HERO KARTININ HİZASI VE AD KUTUSUNDAKİ BOŞLUK

Müşteri ekran görüntüsü üstüne çizerek iki şey gösterdi. İkisi de canlıda.

### 1 · Kart üstte kırıntıya, altta metnin sonuna oturdu

*"kart üstteki yere kadar çıksın ama alt kısmıda yazıların altında bitsin.
kartın ratiosunu bozmadan scale ederek küçültmen gerekecek bozma yani orasını
burasını."*

**Ölçülen sorun** (1440 · /dubai · önce): kırıntı 146, ızgara başı 192, sol
sütun 304-724, **kart 208-852** — üstte 62 px geç başlıyor, altta 128 px
taşıyordu.

**Üç parçalı çözüm** (`css/hero.css` · yeni HİZA bloğu, 1024 kapısının içinde):

1. **Üste çıkma** `margin-top: -46px`. 46 bir ölçüm değil, iki CSS değerinin
   toplamı: kırıntı satırı 20 + `.phx-grid` üst payı 26.
2. **Altta buluşma** `align-items: end`. Elle hizalamak **imkânsızdı** ve sebebi
   döngüseldi: ızgara `center` hizalıyordu ve satır yüksekliğini kartın kendisi
   belirliyordu, yani kart kısaldıkça metin de yukarı kayıp hedef kaçıyordu.
   Denklemin tek sabit noktası "satır = metin yüksekliği" çıkıyor, o da kartı
   %72'ye indiriyordu (sahne 380 → 239, neredeyse boş bir kutu). `end` döngüyü
   kesti: iki sütun da satırın altına yaslanınca hiza **her genişlikte hiçbir
   sayı yazmadan** tutuyor.
3. **Küçülme** `transform: scale(0.919)`. Müşterinin şartı gereği sahne,
   punto, dolgu tek tek kısılmadı; kartın tamamı tek katsayıyla küçüldü,
   içindeki her oran aynı kaldı.

`:has(> .hkc)` ile kapılandı: /ingiltere ve /kktc kart değil `.ph-art` sahnesi
basıyor, onlar ellenmedi (ölçüldü: hizalama hâlâ `center`, hero 719 px).

**0,919 neden o sayı:** metin sütunu yerinden oynamasın diye. Kart küçüldü,
yazılar bir piksel bile kımıldamadı.

**Ölçüm · dört genişlikte de fark SIFIR:**

| | 1440 | 1280 | 1024 | 1440 muhasebe |
|---|---|---|---|---|
| kart üstü ↔ kırıntı | 0 | 0 | 0 | 0 |
| kart altı ↔ metin altı | 0 | 0 | 0 | 0 |

Kart 644 → 578, hero 930 → 818: kartın altındaki boşluk da kapandı.
900 px'te (tek sütun) hiçbiri devrede değil, kart metnin altında duruyor.

**Bir kısıt yakalandı ve görünmeden telafi edildi.** `transform: scale`
dokunma hedefini de küçültüyor: 44 × 0,919 = 40,4 px, yani kart standardının
"pazarlık konusu değil" dediği eşiğin altı. `.hkc-step` 44 → 48 yapıldı,
48 × 0,919 = 44,1 px. Ekranda hiçbir şey değişmiyor, görünen çubuk zaten 5 px.
Açıklama puntosu 13 → 11,95 px oldu; sitenin en küçük puntosu 10,5 px (rozet),
yani mevcut aralığın içinde.

### 2 · Ad kutusundaki boşluk kapandı · açıklamalar tek satır

*"bu arada boşluk neden var kapat onu. muhasebe sayfasında iki satır açıklama
olan bi yer vardı ve sende kartı standardize ediyon diye böyle olmuştu sanırım
ama tek satır yaparsın açıklamaları böyle yapma."*

**Teşhis doğruydu.** `.hkc-say` 86 px'ti ve bu ölçü en dar bantta iki satıra
sarabilen en uzun açıklamaya göre alınmıştı — o açıklama muhasebe kartındaydı
(78 karakter, 540 px). Kuruluş kartının beş açıklamasının hepsi zaten tek
satır (en uzunu 352,5 px), yani /dubai'de kutunun bir satırlık yüksekliği her
zaman boştu.

**Kutuyu değil metni değiştirdik.** Muhasebe kartının üç açıklaması kısaltıldı
(1024 bandı · metin kutusu 403 px · güvenli sınır 380 px):

| | önce | sonra |
|---|---|---|
| Defter | 446,8 | 362,5 |
| Beyan | 540,0 | 347,2 |
| Arşiv | 421,2 | 342,1 |

`.hkc-say` 86 → 67 (ad 31,5 + boşluk 10 + bir satır 18,85 = 60,35, kalan
6,65 px pay eski kutunun payıyla aynı). Açıklama ile şerit arası ~35 px'ten
15 px'e indi.

Kaynak **ortak**: `lib/accountingDubai.ts · scope.phases[].line` hem kartta
hem sayfanın kapsam bölümünde basılıyor, yani sayfa metni de kısaldı.
Kısaltılan bilgi kaybolmadı, hepsi aynı fazın `detail` metninde duruyor.
Kaynağa "tek satır" kuralı gerekçesiyle yazıldı: yeni faz yazan cümleyi 60
karakterin altında tutar, kartı büyütmek çözüm değil.

---

## 21.08.2026 · FOOTER BİRLEŞTİ, YILDIZ KURULUŞ SAYFASINA GEÇTİ, NAVBAR DÜZELDİ

Dört iş, dördü de canlıda. Üçü müşterinin bir önceki turda açtığı denemelerin
kapanışı, biri bildirilmiş bir arıza.

### 1 · Kapanış CTA'sı ile site dizini TEK GECE BLOK oldu · FB2 canlıda

Müşteri: *"footer için fb2 live al ama yörüngesine bi küçültme yani zoom out
yapabilirsin."* /lab/footer turu kapandı, FB1 elendi.

Blok her sayfanın altında (`Footer` ana sayfada, `FinalCta` alt sayfalarda),
yani değişen şey her yerde görünüyor.

**Kart diye bir şey kalmadı.** `.kcta` (kutunun üstündeki beyaz pay) ve
`.kcta-kart` (kartın kendisi) silindi; yerlerine üst kat `.ft2-kat` geçti.
Ad alanı bilerek `.kcta-` değil `.ft2-`: bu artık CTA'nın değil KAPANIŞ
BLOĞUNUN yapısı, dizin de aynı bloğun içinde. Sahne, gökyüzü, rozet, başlık
ve düğme `.kcta-` olarak kaldı — onlar hâlâ yalnız CTA'nın parçası.

**Zemin `.ft2`de değişti**, `globals.css`te: aynı seçici hem orada hem
`kapanis-cta.css`te olsaydı, gövde @import'tan sonra okunduğu için oradaki
kaybederdi. Bloğun geri kalanı `kapanis-cta.css`te ve her kural en az iki
sınıf taşıyor (`.ft2-alt .ft2-col a` = 0,2,1 → globals'ın 0,1,1'ini geçer).

**Ayrımı renk değil YAPI veriyor:** üst katın gökyüzü var alt katın yok,
aralarında sahnenin üç yayı duruyor (kat değişimi bir ufuk), alt katın
tepesinde 1 px çizgi. İkinci gece kademesi (#111111) bilerek kullanılmadı.

**Görünmez olacak on yedi bağlantı ölçümle yakalandı.** Yayında olmayan
girdileri `SmartLink` `<a>` değil `<span data-soon>` basıyor ve globals'ın
kuralı `.ft2-col a` olduğu için o span'ler renklerini gövdeden miras
alıyordu (`--text-900` #080808). Beyaz zeminde kazara çalışıyordu; gece
zeminde siyah üstüne siyah demekti. Seçiciye `[data-soon]` eklendi ve
`--soon-dim` 0,52 → 0,7 çıktı (3,39:1 → 5,43:1, eşik 4,5).

**ZOOM OUT ÖLÇÜLDÜ.** Yarıçap `max(345px, 82vw)`, bant yüksekliği
`max(200px, 23vw)`. Sagitta/genişlik oranı 0,136 → 0,170, yani eğim %25
arttı. Yayın bloğun YANINDAN çıkması şartı (sagitta < 0,8·H) beş genişlikte
ölçüldü ve hepsinde sağlandı, en dar pay ×1,08:

| genişlik | R3 | H | sagitta | sınır | pay |
|---|---|---|---|---|---|
| 1440 | 1180,8 | 331,2 | 244,9 | 265,0 | ×1,08 |
| 1280 | 1049,6 | 294,4 | 217,7 | 235,5 | ×1,08 |
| 1024 |  839,7 | 235,5 | 174,2 | 188,4 | ×1,08 |
|  768 |  629,8 | 200,0 | 130,6 | 160,0 | ×1,22 |
|  375 |  345,0 | 200,0 |  55,4 | 160,0 | ×2,89 |

Yatay taşma yok. Altı disk ve altı uçak yerinde. Görünen yarı açı 37,6°,
süpürme ±45°, yani başa dönüş kadrajın 7,4° dışında kalıyor.

**Disk ölçüsü bilerek küçültülmedi:** müşteri yörüngeyi küçültmek istedi,
bayrakları değil; 28-38 px zaten okunurluğun alt sınırı.

### 2 · CTA'ya ikinci düğme · "İletişime Geç"

Müşteri: *"kurulumu başlat tuşunun yanına iletişime geç tuşu da koyalım
dümenden."* K3 turunda kaldırılan ikinci düğme geri geldi.

Kaldırılırken not edilen tek kayıp `cta_meeting_click` olayının **"footer" ve
"final" placement'ları** idi, yani her sayfanın altındaki ölçüm noktası. Aynı
olay adı ve aynı hedefle (`/iletisim`) geri konunca o nokta da geri geldi.

**Metin değişti:** eski hâli "Ücretsiz danışmanlık" idi. Ücretsiz olduğu
sitede hiçbir yerde doğrulanmıyor ve firma adına bir taahhüt; müşterinin
yazdığı ad düz ve doğru. `/iletisim` yayında (`lib/routes.ts`), yani düğme
sönük değil gerçek bağlantı.

### 3 · Yıldız zemini ŞİRKET KURULUŞU sayfasına geçti · hâlâ DENEME

Müşteri: *"arkayı yıldızlama işi hoşuma gitti beğendim ben. bide şirket
kuruluş sayfasına yapsana bakalım orda nasıl duracak."*

**Şirket kuruluşunun ayrı sayfası yok** — ülke sayfasının kendisi o hizmetin
sayfası (`lib/services.ts` · `FORMATION_SLUG`). Yani tek satır üç sayfayı
birden kapsıyor: **/dubai · /ingiltere · /kktc**.

**GERİ ALMA TEK SATIR:** `app/ulke/[slug]/page.tsx` içindeki
`backdrop="yildiz"` satırını sil, varsayılan `"grid"` geri gelir.

`PageHero`nun zaten bir `backdrop` propu vardı (`"plain" | "grid"`), üçüncü
değer olarak `"yildiz"` eklendi — yeni bir kapı icat edilmedi. Izgara
`display: none` ile değil HİÇ BASILMAYARAK kapanıyor, yani `phgDrift`in
60 s'lik periyodu listeye hiç girmiyor. **Glow iki kipte de açık:**
müşterinin itirazı ızgarayaydı, ışığa değil.

Konumlar yüzde, piksel değil — çünkü `.phg-bg`in maskesi de yüzdeyle tanımlı
ve "tam güçte görünen bant" hero boyundan bağımsız hep %22-54.

**Kayan yıldızların ikisi de sol yarıda ve sebebi ölçüm:** split hero'nun sağ
sütununu Dubai kartı kaplıyor (1440'ta x 730-1281 · y 208-852) ve kart
maskenin görünür bandının tamamını örtüyor. Sağa konan bir yıldız hiç
görünmezdi. İki yol da ölçülüp bandın içinde ve kartın solunda doğrulandı.

Üç yeni periyot: **44.017 · 33.013 · 118.033** ms, üçü de asal ve sitedeki
hiçbir periyotla ortak böleni yok. Birleşik görünürlük %4,60, ortalama olay
sıklığı 25,8 saniyede bir (CTA'nın ölçüsü ~%5).

### 4 · NAVBAR İMLEÇ ÇIKINCA KAPANMIYORDU · arıza bulundu

Müşteri: *"navbardan mousu çıkardığında navbar kapansın btw hover ile
çalışıyor açılıyor ya mouse out oluncada kapasın amk kapanmıyor."*

**Sebep `pointerleave` değildi** — o kural yerindeydi. Kapanmayı yiyen şey
içindeki odak korumasıydı:

```
if (root.contains(document.activeElement)) return;
```

Koruma klavye kullanıcısı için yazılmıştı ve orada haklı. Ama
`document.activeElement` FARE TIKLAMASIYLA da doluyor: bir başlığa ya da
Hizmetler panelindeki bir ülke sekmesine tıklandığı anda odak header'ın
içinde kalıyor ve o noktadan sonra panel bir daha hiç kapanmıyordu. Ülke
sekmesi yolu günlük kullanımda kaçınılmaz.

**İki düzeltme:**
1. Koruma `:focus-visible`e bağlandı — fare odağı artık paneli rehin almıyor.
2. **Geometri bekçisi:** panel açıkken `pointermove` dinleniyor, imlecin
   koordinatı header ∪ panel dikdörtgeninin dışındaysa 160 ms sonra kapanıyor
   (içeri dönen imleç iptal ediyor). Enter/leave defterine hiç bakmıyor.
   Gerekçe: panel açıkken altındaki ögeler değişiyor (`AnimatePresence`
   `key={open}`) ve imlecin altındaki düğüm silinince tarayıcıların
   enter/leave defteri güvenilmez oluyor.

**ÖLÇÜLDÜ** (1440 · aynı köken iframe): fare basışından sonra
`contains` = true ama `:focus-visible` = false → eski kural kapatmıyor, yeni
kural kapatıyor. Panel 60 ms'de hâlâ açık, 510 ms'de kapalı. Hem tetikleyici
düğmede hem panel içindeki bağlantıda odak varken tekrarlandı, ikisi de
kapandı. Dışarı çıkıp geri dönen imleç bekleyen kapanmayı iptal etti.

**DOĞRULANAMAYAN TARAF:** klavye dalı. Sentetik olaylar untrusted ve Chrome
girdi kipini onlardan okumuyor; bu ortamda üretilen hiçbir odakta
`:focus-visible` true olmadı. Dayanak ölçüm değil: depo zaten
`:focus-visible`e bağlı (92 kural, sitedeki bütün odak halkaları). Bozulursa
yön güvenli — koruma düşerse panel kapanır, açık kalmaz.

### 5 · Araçlar panelindeki iki küme adı silindi

Müşteri: *"araçlar sekmesindeki yönlendirmeleride kaldır katagorize etmemize
gerek yok bakan anlayacak. 'hesaplayıcılar' 'karar araçları'."*

Geçen tur bu iki satır versalden çıkarılıp korunmuştu; gerekçesi "silinseler
sekiz kart tek ve ayrımsız bir yığın olurdu" idi. Müşterinin cevabı tam olarak
o sonucu istediği. O yüzden yalnız yazılar değil **ayrımın kendisi** kalktı:
iki ızgara tek ızgarada birleşti (4x2, sekiz kart), aksi hâlde adı olmayan
ama duran bir boşluk kalırdı. Sıra korundu — önce dört hesaplayıcı.

`.onv-h` artık hiçbir yerde kullanılmıyor; ölü kural `nav.css`ten silindi.

**AÇIK KALAN:** `/araclar` SAYFASINDAKİ üç grup başlığı (`Hesaplayıcılar` ·
`Karar araçları` · `Kuruluş sonrası`, `lib/tools/catalog.ts`) DURUYOR.
Müşteri "sekme" dedi, yani navbar; sayfadakiler sekiz aracın gerçek dizin
başlıkları. İstenirse tek turluk iş.

---

## 21.08.2026 · VERSAL TEMİZLİĞİ, HERO GÖKYÜZÜ DENEMESİ, FOOTER ZEMİN TURU

Müşterinin üç ayrı isteği bir turda toplandı. İkisi denemede, biri canlıda.

### 1 · Versal (CAPS LOCK) temizliği · CANLIDA

Müşteri: *"sitede caps lockla yazan bazı gereksiz yazılar var onları kaldır
özellikle navbarda çok var: önce ülke, dubai için yürüttüğümüz hizmetler,
araçlar kısmındaki caps lock yazılar, Okumalık ve indirilebilir kaynaklar,
bize ulaşın, kurumsal. fln fistan ya insanlar mal değil onları yazmamıza
gerçekten gerek yok kelime kalabalığı amk. bide o capslock işi çok fazla ai
hissettiriyor."*

İki ayrı iş olduğu için ikiye ayrıldı ve her satır üç kovadan birine kondu:

| kova | ne yapıldı | sayı |
|---|---|---|
| **A · yazı gereksiz** | etiket tamamen silindi, ad `aria-label`'a taşındı | **8** |
| **B · yazı gerekli ama versal gereksiz** | `text-transform: uppercase` kaldırıldı, metin kaldı | **36 kural** |
| **C · veri etiketi, versal işlevsel** | dokunulmadı, gerekçe yorum olarak yazıldı | 4 |

**A kovası · navbarda beşi.** `Nav.tsx` içindeki beş `.onv-h` / `.onv-axis-tag`
üstyazısı silindi ("ÖNCE ÜLKE", "DUBAİ İÇİN YÜRÜTTÜĞÜMÜZ HİZMETLER", "OKUMALIK
VE İNDİRİLEBİLİR KAYNAKLAR", "BİZE ULAŞIN", "KURUMSAL"). Panel adları
**kaybolmadı**: sarmalayan `role="group"` / `role="tablist"` düğümlerine
`aria-label` olarak geçti, yani ekran okuyucu için hiçbir şey eksilmedi, sadece
göze görünmüyor. `.onv-h` sayısı 7 → 2.

**C kovası · neden bunlar kaldı.** Dördü de etiket/değer tahtası: dar bir
sütunda 10px etiket ile 12px değer yan yana duruyor ve ikisini ayıran şey punto
değil biçim. Versali kaldırınca iki satır aynı şeye benziyor.

- `nav.css` · `.onv-facts dt` — menü künye kartı (YAPI · TİPİK SÜRE · KİMLER İÇİN)
- `muhasebe-takvim.css` · `.kmt-fig-k` — vergi çerçevesi alan adı
- `kaynaklar.css` · `.kyn-up-mm` — ay kısaltması (TEM · HAZ), kısaltma zaten versal
- `kaynaklar.css` · `.kyn-up-kv dt` — /gelismeler künyesi

**Sınırda kalan bir satır:** `.kyn-up-kv dt` içindeki "KİMİ İLGİLENDİRİYOR" kısa
bir alan adı değil, cümle parçası. Künye kuralı gereği bırakıldı; müşteri
"orası da düşsün" derse tek satırlık iş.

**Kendi kararım olan bir silme:** Kaynaklar panelindeki "Öne çıkanlar"
müşterinin listesinde yoktu, ben sildim. Geri istenirse geri gelir ama o zaman
panelin iki sütunu yeniden 24px kaymış başlar.

### 2 · Ana sayfa hero zemini · IZGARA yerine GÖKYÜZÜ · DENEME

Müşteri: *"normalde gridli bir tasarım dili kullanıyorduk ya heroda... sence onu
bu cta daki gibi yıldıza mı çevirsek ya daha iyi durur hem. grid çok teknoloji
şirketi gibi kalabilir."* Sonra: *"tamam mesela ana sayfa heroda bi yap bakalım
nasıl duruyor ona göre karar veririz geri alması kolay olsun dediğin gibi."*

Yalnız **ana sayfa** hero'su, diğer sayfaların hero'ları elleniyor değil.

**GERİ ALMA TEK KELİME.** `src/components/Hero.tsx` içinde:

```
data-zemin="yildiz"   → gökyüzü açık, ızgara kapalı   (BUGÜNKÜ DENEME)
data-zemin="izgara"   → ızgara açık, gökyüzü kapalı   (ESKİ HÂL)
```

`"yildiz"` DIŞINDAKİ her değer eski hâli veriyor (`:not([data-zemin="yildiz"])`),
yani yazım hatası bile güvenli tarafa düşüyor. İki kip `display:none` ile
ayrılıyor, `opacity` ile değil: kapalı olan kip **sıfır animasyon** çalıştırıyor.

**Periyot kontrolü (tuzak K).** Hero'da süreklidi 5 animasyon vardı; ızgaranın
60000'i kapanınca yerine üç yeni periyot girdi (+47051, +30509, +112067, üçü de
asal). Toplam 7 sürekli animasyon, ortak katı yok, yani sahne kendini
tekrarlamıyor.

### 3 · Kapanış CTA'sı ile footer arasındaki sınır · /lab/footer · KARAR BEKLİYOR

Müşteri: *"footerı siyah yapma fikrine ne dersin? şuan cta ile ayrışmıyor
sectionlar, cta yı da full genişliğe alınca bi garip oluyor bu sefer footer
geriplana düşüyor dikkat çekicilik olarak. ya da ikisinide birleştirip siyah fln
yapmak lzm bilmiyorum denesene bunları bi fikir olarak."*

İki aday `/lab/footer` altında:

| aday | ne | not |
|---|---|---|
| **FB1** | ayrı ama ikisi de gece | dizin gece yüzeye geçiyor, CTA kartı kimliğini koruyor, sınır okunur kalıyor |
| **FB2** | birleşik tek gece blok | CTA üst kat, dizin alt kat; kart kenarı yok, katları gökyüzü ve ince çizgi ayırıyor |

**İkisi de canlı bileşenleri KOPYALAMIYOR, import ediyor** (`Ft2Cta` ·
`CtaSahne` · `Ft2Directory`). Yani labda görülen metin ve bağlantılar canlının
birebir aynısı, değişen yalnız zemin ve sınır; canlı taraf düzelince lab da
kendiliğinden düzeliyor. Dizin çıkışları sayıldı: **30 ↔ 30, kayıp yok.**

---

## 21.08.2026 · KAPANIŞ CTA'SI CANLIYA ALINDI (K3 · Ufuk)

Müşteri turu kapattı: **"cta yı artık live alabilirsin kral."** `/lab/cta2`'nin
kazananı K3 (Ufuk) her sayfanın altına taşındı. Blok iki yerden çağrılıyor
(`Footer` ve `FinalCta`), yani değişen şey bütün sayfalarda görünüyor.

**Dosyalar.** `src/components/CtaSahne.tsx` (yeni · sahne ve takımyıldız
tablosu) · `src/components/Footer.tsx` · `Ft2Cta` (kart, metin, düğme) ·
`src/app/css/kapanis-cta.css` (baştan yazıldı). Lab dosyaları
(`components/lab/CtaDekUfuk.tsx` · `css/lab-ctadek-3.css` · `/lab/cta2` rotası ·
K1 ve K2) **kayıt olarak duruyor, silinmedi**.

### Önek kararı · yeni önek AÇILMADI, `.kcta-` korundu

Lab öneki `.kd3-` canlıya alınamazdı: `lab-ctadek-3.css` hâlâ `globals.css`'in
`@import` bloğunda ve canlı dosyadan **sonra** okunuyor (satır 104 ↔ 236), yani
aynı adlar labdaki bir düzenlemenin canlıyı sessizce değiştirmesi demekti.
MT16 taşınırken `.kmt-` tam bu yüzden açılmıştı. **Ama burada üçüncü bir önek
yeni bir şey adlandırmıyordu**: `.kcta-` zaten "kapanış CTA'sı" demek ve blok
aynı blok; yeni önek `.kcta-`yı bütünüyle ölü bırakır ve bir sonraki tura
"hangisi gerçek" sorusu bırakırdı. Sınıflar, değişkenler **ve keyframe adları**
`.kcta-` önekli; keyframe adları global olduğu için onlar da çevrildi
(`kd3-tur-disk` → `kcta-tur-disk` …). Canlıda `kd3` geçen tek yer yorumlar.

### Ekrandan kalkan üç şey · tek tek

| ne | metin / hedef / olay |
|---|---|
| paragraf (`.kcta-l`) | "Dubai, İngiltere ve KKTC'de kuruluş, banka, tahsilat ve muhasebe." + "Tek ekip, tek muhatap, baştan sona Türkçe." İkinci cümlenin ilk yarısı **rozete taşındı**. |
| ikinci düğme (`.kcta-btns`) | "Ücretsiz danışmanlık" → `/iletisim` · `gtm("cta_meeting_click", { placement })` |
| başlık | "Kurulumunuzu bugün başlatalım." → **"Şirketinizi bugün kuralım."** (müşteri bu turda değiştirdi) |

**Kaybolan çıkış yok, ama her sayfadaki bir çıkış eksildi.** `/iletisim` menüden
(her sayfada) ve hemen alttaki dizinin "Kurumsal" sütunundan hâlâ bir tık
uzakta. `cta_meeting_click` olayı da sitede yaşıyor: Hero, Packages, HomeFaq ve
CountryFaq onu kendi `placement`'larıyla çağırıyor. **Kaybolan tam olarak şu:
olayın `footer` ve `final` placement'ları**, yani her sayfanın altındaki ölçüm
noktası. Geri istenirse ilgili CSS kuralları dosyada duruyor, tek gereken
Footer.tsx'te düğümleri geri basmak.

`gtm("cta_start_click", { placement })` **duruyor**, `placement` prop'u da
duruyor (`Footer.tsx` · `Ft2Cta` içindeki tek düğme).

### Periyot bütçesi · CTA artık her sayfada

Altı sürekli periyot bütün sayfalara yayıldı. Labdan **iki sayı değişti**:
K3'ün yıldız katmanları 43003 ve 77999 kullanıyordu, ikisi de sitenin periyot
envanterinde kayıtlıydı (eşitlik = kesin senkron), yerlerine **40361** ve
**74959** geldi. Taşıyıcı periyotları değişmedi, yani müşterinin beğendiği hız
aynen duruyor (ω 1,450 ↔ 0,930 °/sn).

| katman | periyot | envanterdeki en yakın komşu |
|---|---|---|
| yay1 takımyıldızı | 34483 | 32429 · %6,33 |
| yay3 takımyıldızı | 96769 | 77999 · %24,06 |
| yıldız katmanı a | **40361** | 42000 · %4,06 |
| yıldız katmanı b | **74959** | 77999 · %4,06 |
| kayan yıldız 1 | 24251 | 23000 · %5,44 |
| kayan yıldız 2 | 131129 | 77999 · %68,12 |

Altısı da asal, kendi aralarında en küçük uzaklık %17,0. Dokuz canlı rotada
`getAnimations()` ile tarandı, **%4'ün altında tek çakışma yok**: `/` (60 sürekli
animasyon, 23 ayrı periyot) · `/hakkimizda` · `/iletisim` · `/ulkeler` ·
`/dubai/muhasebe` (13711 · 16993 dahil) · `/kaynaklar` · `/is-ortakligi` ·
`/araclar/uygunluk-testi` · `/sektorler/yazilim-ve-teknoloji`.

**Labla çakışma diye bir sorun yok, ölçüldü:** `/lab/cta2` footer'ı hiç
basmıyor (hiçbir `/lab/*` sayfası basmıyor, `/lab/cta` hariç), yani K3'ün lab
kopyası ile canlı kopya aynı ekrana hiç düşmüyor.

### Ölçüm · canlı sayfada tekrarlandı

Dört genişlikte (1440 · 1024 · 768 · 375), sabit genişlikli aynı-kaynak iframe
içinde (tuzak L), animasyonlar duraklatılıp `currentTime` sürülerek 6.000 örnek
× 97 ms = **582 saniyelik tur** boyunca:

| kontrol | sonuç |
|---|---|
| disk-disk binmesi | **0 kare** (dört genişlikte de) |
| turun en küçük disk-disk mesafesi | 3,85 / 3,66 / 3,29 / 3,22 disk çapı |
| aynı ülkenin iki diski, en küçük mesafe | 3,85 / 3,66 / 3,29 / 3,29 disk çapı |
| yay içi "peş peşe aynı tür" | **0** |
| aynı türden iki taşıyıcı, en küçük mesafe | 3,85 / 3,66 / 3,29 / 3,09 çap |
| z sırası | uçak 1 · disk 2 (dört genişlikte); DOM'da altı uçak, sonra altı disk |
| ters yön | `direction` bildiriminin hepsi `normal`, **0 ters** |
| bayrak kabı (tuzak H) | 37,4×37,4 (1440) · 28×28 (öteki üç); svg kapla birebir, şişme yok |
| yatay taşma (tuzak D) | dört genişlikte de `scrollX` = 0, sayfa dibinde de 0 |
| başlık satır sayısı | dört genişlikte de **2** (eski başlık 375'te üçe kırılıyordu) |
| duruş hâli (hareket kapalı) | on iki taşıyıcının on ikisi görünür, kartın ve sahne bandının içinde |

Kapılar: `tsc` 0 · `lint` 0 · `css-check` **48** (taban değişmedi, listede tek
bir `.kcta-` sınıfı yok).

### Ölü kod kararı · eski kutunun kuralları

Altı sınıfın CSS kuralları **silinmedi**, `kapanis-cta.css`'in sonunda "ÖLÜ KOD"
başlığı altında duruyor: `.kcta-bg` · `.kcta-grid` · `.kcta-glow` ·
`.kcta-seam` · `.kcta-l` · `.kcta-btns`. Hiçbir bileşen basmıyor, `css-check`
onları görmüyor (o araç kullanılan ama tanımı olmayan sınıfı arar, tersini
değil). İki not:

- `.kcta-grid` ve `.kcta-glow` `ft2Drift 42s` ve `ft2Breathe 20s`'i kullanıyor
  ve bu iki kural hareket kapısının **dışında** (eski kalıp, `reduce` dalında
  ayrıca `animation: none` var). Kural ölü olduğu için ekranda hiçbir şey
  çalışmıyor; ama "kapı dışında `animation` var mı" diye tarayan bir sonraki
  denetim bu dosyada iki satır bulacak, sebebi burada yazılı.
- `ft2Drift` / `ft2Breathe` keyframe tanımları `globals.css`'te **kalıyor**:
  `/lab/cta`'nın üç adayı da onları kullanıyor.

**Soru bir sonraki bakım turuna:** bu altı kural silinsin mi? Silinirse
"ikinci düğme geri gelsin" isteği CSS'i yeniden yazmayı gerektirir; bugün
yalnızca Footer.tsx'e iki düğüm eklemek yetiyor.

### Hâlâ açık

Müşteri "tam oldu kalsın" demedi; blok **şimdilik bu hâlde**. Ekran görüntüsü
alınamadı (tarayıcı paneli `visibilityState: "hidden"`, tuzak N: boş kare
dönüyor); bütün doğrulama sayısal ölçümle yapıldı. Sahnenin gerçek görüntüsünü
müşteri onaylamadan tur kapanmış sayılmaz.

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


## 20.08.2026 · TEMİZLİK TURU VE DÖRT İŞ

### Ekrandaki 24 "not" kaldırıldı
Müşteri siteyi kendi müşterisine gösteriyor ve "her yerin final histe olmasını"
istedi. Gösterdiği üç örneğin kalıbı çıkarıldı (ziyaretçinin sormadığı soruya cevap
veren, aracın nasıl yapıldığını anlatan, sayfanın kendisi hakkında konuşan cümle) ve
sitede 24 yerde daha bulunup silindi. **Silinmeyenler:** gerçek şerhler ve taahhüt
sınırları (18 kayıt) — "Otomatik muafiyet yok", "nihai teklif ... netleşir", "Kişiye
özel vergi görüşü vermiyoruz", formun çalışmadığını söyleyen cümleler.

### Hakkımızda · iki bölüm canlıya taşındı
Defter'in **kurumlar** ızgarası (`.abk-`) ve Cephe'nin **künye kutusu** (`.abn-`)
canlıya alındı; lab önekleri taşınmadı. Sayfanın geri kalanı olduğu gibi duruyor.

### İletişim · formu atlama çıkışı
Formun üstünde artık gerçek bir sayfa içi bağlantı var: **"Üç ofisin iletişim
bilgileri"** → `#ct-ofis`. Hedef id ofis bölümünün başlığında, `scroll-margin-top`
verildi.

### Sınırdaki 24 not · MÜŞTERİ KARAR VERDİ (20.08.2026)

| konu | karar |
|---|---|
| `/basla` geliştirici taslağı | **şimdilik dursun**, sonraki tura kaldı |
| Siteyi yarım gösteren itiraflar ("şimdilik demo sayfasına iniyor", "Dosya hazırlandığında bu düğme açılacak", demo blog yazısı) | **dursunlar**; "tamamladığında kaldırırız" |
| `/araclar`daki iç veri cümleleri | **elleme**, o sayfa dolaşıma kapalı |
| Kullanım talimatları ("tıklayın", "basın", "dokunun") | **yalnız açılır bloklarda kalsın** |
| `/kaynaklar`daki "ne DEĞİL" satırları | **editoryal duruş, kalsın** |

Talimat kuralı uygulandı ve ayrım ölçülerek yapıldı: ana sayfa tablosunun
"Sütun başlığına basın…" dipnotu ve `/ulkeler` spotundaki "Sütun seçin…" KALKTI
(sütun başlığı bir şey açmıyor, seçiyor). Yay görünümündeki "Ülkeye tıklayın:
… yerinde açılır" ve muhasebedeki "Başlığa dokunun, o aşamada ne olduğu açılsın"
KALDI, çünkü ikisinde de tıklama gerçekten bir bloğu açıyor. Tablo dipnotundaki
şerh ("Tutarlar temsilîdir, süreler tipik aralıktır…") aynen duruyor.


## MÜŞTERİDEN BEKLENENLER

Bunlar kod işi değil, **karar ya da veri** işi. Hiçbiri uydurulmuyor.

### 0A · `/basla` EKRANDA GELİŞTİRİCİ TASLAĞI · ACİL
Sitenin ana eylem çağrısı `/basla` ve bugün ekranda şunu basıyor:

> Başla · yapım aşamasında · Kurulum akışı Faz 1'de inşa edilecek. ·
> Seçimlerin başarıyla taşındı: · Parametre yok: anasayfadaki karttan gel.

Bu bir "not" değil, geliştirici çıktısı. Adrese **13 yerden** bağlanılıyor: menüdeki
"Kurulumu Başlat" düğmesi (her sayfada), hero, footer, SSS, iletişim. Yani siteyi
gezen biri en çok bu düğmeye basacak. Karar gerekiyor: sayfa dolaşımdan çıkarılsın
mı (SmartLink onu sönük gösterir), yoksa yerine tek ekranlık gerçek bir sayfa mı
yazılsın?

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
| `/lab/cta2` | ~~K1 · K2 · K3~~ | **KAPANDI 21.08.2026** · K3 (Ufuk) canlıda, her sayfanın altında. Aşağıdaki iki başlık artık kayıt. |

**K3'ün sahne düzeni.** Müşteri: "aynı anda iki uçak birbirine doğru gitmesin, aynı
anda iki ülke de birbirine doğru gitmesin... şuan ortada bi karmaşa var." Ölçüldü ve
haklıydı: üç yayın üçünde de ters yönde disk çifti vardı, yay 3'te ayrıca ters yönde
iki uçak. Üç değişmez kuruldu:

| | kural | nasıl |
|---|---|---|
| D1 | uçak diskin arkasında | `z-index` 1/2 **ve** dizi sırası (UUUUDDDDDD); ikisi birden, biri silinse öteki tutuyor |
| D2 | iki uçak birbirine gitmesin | `yon` alanı tipten, `data-yon` JSX'ten, `reverse` CSS'ten SİLİNDİ — sola gitmek ifade edilemiyor |
| D3 | iki disk birbirine gitmesin | aynı |

Hiyerarşi: diskler içten dışa yavaşlıyor (1,470 → 0,866 °/sn), dört uçak tek hız
kuşağında (1,799-1,914 °/sn) ve **her uçak her diskten hızlı**. Okunur tek olay:
uçak kendi yayındaki diski arkadan yakalıyor, altından geçiyor, önüne çıkıyor.
Ölçüldü: 12 kesişme olayında 96 örnek noktanın 96'sında disk önde.

**Aday kimlikleri sayıya döndü.** Müşteri: "bide bunlara niye sayı vermedinde isim
koydun aq normalde her şeye sayı koyuyodun labda." Haklıydı: `MT13` · `H12` · `P1` ·
`Z8` deponun kuralı ve isimli olanların hepsi son turlardan çıkmıştı. `MT13 · "Önce
kuruluş"` kalıbına dönüldü — kimlik sayı, tanımlayıcı kelime `kind` alanında.
| `/lab/hakkimizda-serit` | **Kart · Sahne · Bölüm** | DÖRDÜNCÜ TUR. Yeni biçim icat etmek yasaklandı; üçü de sayfanın mevcut sınıflarını devralıyor |

**Dört turun asıl dersi.** Üç tur üst üste reddedildi ve sebep tasarımın kendisi
değil, deponun en temel kuralının çiğnenmesiydi: *"Yeni bir dil icat etme; sitenin
kendi dilini kullan."* Adaylar sitede karşılığı olmayan biçimler uyduruyordu (tam
genişlik kapak fotoğrafı, ekran kenarına yaslanan görsel, mavi levha). Müşteri:
"BUNLAR NE BİZİM ORTACLA NE ALAKASI VAR SİTENİN KALANINA UYGUN BİR ŞEY ÇÖZ."

Dördüncü turda yeni biçim yasaklandı ve ajanlardan "sitede zaten var olan hangi
sınıfları kullandım" listesi istendi. Ekranda doğrulandı: `hx-card` ×4 ·
`hx-stage` ×4 · `ab-vm-card` ×8 · `ab-open-ph` ×2 · `sec-head` ×4 · `sec-lead` ×4.

**Bu iki turun üç adayı kendi doğrulamasını YAPAMADI.** Fan-out sırasında makine
uykuya geçti ve altı ajandan üçü hata aldı (`cta:Kure` ve `cta:Yorunge` ECONNRESET,
`serit:Sahne` "bilgisayar yanıt ortasında uykuya geçti"). Dosyaları tamdı, raporları
yoktu. Onların yapması gereken ölçümler ELLE yapıldı ve hepsi geçti:

| kontrol | sonuç |
|---|---|
| `tsc` · `lint` · `css-check` | 0 · 0 · 48 (taban değişmedi) |
| tuzak H · Flag kabı | dokuz bayrağın hepsi sabit px + `overflow:hidden`, şişme yok |
| tuzak A · hareket kapısı | altı CSS dosyasında da kapı dışında tek `animation` yok; hiçbir TSX `useReducedMotion` okumuyor |
| tuzak K · `alternate` | altısında da sıfır gerçek bildirim (yalnız yorumlarda geçiyor) |
| tuzak B · çıplak `1fr` | altısında da sıfır |
| periyot katsızlığı | `/lab/cta2` dokuz periyot, hepsi ikişerli asal; şeritte tek çakışma sitenin ESKİ `26000↔60000` çifti |
| yatay taşma | beş ölçümde 0 (1440 · 768 · 375) |

Tamamlayabilen üçü (Ufuk · Kare · Zemin) kendi ölçümlerini raporladı; Zemin'in
perde kontrastı tahmin değil ölçüm (en kötü 3,66, büyük metin eşiği 3).
| `/lab/hakkimizda-giris` | Ocak · Fitil · Yaprak | Eski ve dar kapsamlı; `/lab/hakkimizda-serit` onun yerini alıyor, seçim oradan yapılırsa bu tur kapanır |

`/lab/hakkimizda-sayfa` KAPANDI: müşteri sayfanın tamamını değil iki bölümünü aldı
(Defter'in kurumları, Cephe'nin künyesi).

`/lab/muhasebe-takvim` KAPANDI: MT16 canlıya alındı.

`/lab/cta2` KAPANDI: K3 (Ufuk) canlıya alındı, ayrıntı yukarıdaki 21.08.2026
başlığında. Rota, K1 ve K2 kayıt olarak duruyor.

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
