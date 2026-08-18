# Uygunluk testi · Murat abiye sorulacaklar

Bu belge tek bir işaretin karşılığı: `src/lib/fitTest.ts` içindeki **`SWAP:FIT_WEIGHTS`**.

## Neden bu teyide ihtiyaç var

Test, ziyaretçinin cevaplarını puanlayıp bir ülkeyi öne çıkarıyor. Hangi ülkenin
çıkacağını **tamamen o puanlar belirliyor** ve puanları bugün kimse onaylamadı.
Yani test şu an açık, ama söylediği şeyin arkasında firmanın imzası yok.

---

# BU TUR · TEŞHİS · içerik mi Dubai'yi göstermiyor, ölçüm mü göremiyor

Murat abinin sözü birebir: *"bu oranlar bana saçma geldi, bizim çoğu şeyin dubaiye
yönlendirmesi gerekiyor sanki, bi anlayamadım ingiltere neden bu kadar çok çıkıyor?"*

Bu tur **ayar yapılmadı**, `src/lib/fitTest.ts` bir harf değişmedi. Sorulan soru başka:

> Sitenin kendi içeriği gerçekten Dubai'yi mi işaret ediyor, yoksa beklenti mi
> içerikle çelişiyor?

Cevap ölçüldü. Ölçüm yine 124.416 kombinasyonun tamamı üzerinden, artı bu turda
sitenin kendi uygunluk satırları ve dört ayrı olasılık kurgusu.

## Tek cümlelik sonuç

**Site Dubai'yi işaret ediyor, testin ölçü birimi onu göremiyor.** Sitenin üç ülke
sayfasında ülke başına eşit sayıda (dört evet, üç hayır) uygunluk satırı var; bu
21 satır teste tek tek sorulduğunda İngiltere'nin kazancı ile bedeli tam
denkleşiyor (+2,83 / −2,83 = **0,00**), Dubai ise **−3,08** açık veriyor.
Dubai'nin 5,00'lik ret bedelinin 3,50'si, yani **%70'i tek bir sorudan** geliyor:
**`ziyaret`**.

## Bu turda çıkan ana tablo

| ölçüm | Dubai | İngiltere | KKTC |
|---|---|---|---|
| tam tarama · birincilik | %41,7 | **%55,8** | %2,5 |
| beklenen toplam puan | 10,58 | **12,50** | 5,50 |
| teorik tavan | 26 | **29** | 16 |
| **puan alabildiği soru sayısı** | **9 / 11** | **11 / 11** | **9 / 11** |
| sitenin "evet" satırlarından beklenen kazanç | 1,92 | **2,83** | 1,50 |
| sitenin "hayır" satırlarından beklenen bedel | **5,00** | 2,83 | 4,25 |
| **net (kazanç − bedel)** | **−3,08** | **0,00** | **−2,75** |
| tutarlı evrende birincilik (bkz. T5) | **%58,0** | %38,5 | %3,5 |

Son satır teşhisin özeti: taramadan sitenin kendi metinlerine göre imkânsız olan
cevap çiftleri çıkarıldığında dağılım **kendiliğinden Dubai'ye dönüyor**. Ağırlık
değişmeden.

---

## T1 · Soru soru döküm

### Şık şık tablo · 33 satır

Puanın hangi içerik satırından geldiği son sütunda. Her satırın uzun gerekçesi
`fitTest.ts`'te kendi `why` alanında duruyor; buradaki kısaltma o alandan.

| # | soru | şık | D | İ | K | salınım | puanın kaynağı |
|---|---|---|---:|---:|---:|---:|---|
| 1 | musteri | Avrupa ve İngiltere | 1 | **3** | 0 | 3 | İng fitTable (ok) · KKTC fitTable (ok:false) · FACTS.kktc.limit |
| 1 | musteri | Körfez ve Orta Doğu | **3** | 0 | 0 | 3 | Dubai fitTable (ok) |
| 1 | musteri | Türkiye | 0 | 1 | **3** | 3 | KKTC fitTable (ok) · İng payı yazılı kaynaksız |
| 1 | musteri | Karışık | **2** | **2** | 0 | 2 | PAY_MATRIX |
| 2 | is | Yazılım ve dijital hizmet | **2** | **2** | 0 | 2 | PAY_MATRIX · iki fitTable da ok |
| 2 | is | E-ticaret veya fiziksel ürün | **3** | 0 | 1 | 3 | Dubai fitTable (ok) |
| 2 | is | Danışmanlık | 0 | **2** | **2** | 2 | İng fitTable (ok) · KKTC fitTable (ok) |
| 2 | is | Başka bir alan | 0 | 0 | 0 | 0 | bilerek boş |
| 3 | kanal | Kartla | **3** | **3** | **−3** | 6 | PAY_MATRIX (2 hücre ✗) · KKTC watchouts + fitTable + faq |
| 3 | kanal | Havale ve fatura | 0 | 0 | **2** | 2 | KKTC faq |
| 3 | kanal | Henüz netleşmedi | 0 | 0 | 0 | 0 | bilerek boş |
| 4 | platform | Evet | 2 | **3** | 0 | 3 | İng pros · KKTC fitTable (ok:false) + watchouts |
| 4 | platform | Hayır | 0 | 0 | 0 | 0 | bilerek boş |
| 5 | banka | Kurumsal hesap | **3** | 0 | 0 | 3 | PAY_MATRIX (Wio, Mashreq) · Dubai pros · İng clarify |
| 5 | banka | Ödeme kuruluşu | 2 | **3** | 0 | 3 | İng clarify · PAY_MATRIX (Wise, Payoneer) |
| 5 | banka | Yerel banka | 0 | 0 | 0 | 0 | PAY_MATRIX (üçünde de ✓) |
| 6 | ziyaret | Gidebilirim | **3** | 0 | 2 | 3 | Dubai fitTable · KKTC steps |
| 6 | ziyaret | **Her şey uzaktan** | **−3** | **4** | 0 | **7** | İng pros · Dubai fitTable + FACTS.limit + clarify |
| 7 | kazanc | 19.000 ve altı | 0 | 0 | 0 | 0 | hesap (FACTS.from + PRICING) |
| 7 | kazanc | 19.000-33.000 | 0 | **2** | 0 | 2 | hesap |
| 7 | kazanc | 33.000-60.000 | 0 | **2** | **2** | 2 | hesap |
| 7 | kazanc | 60.000 üzeri | **2** | 0 | 0 | 2 | İng fitTable + clarify · Dubai intro + tax |
| 8 | gider | 1.000 ve altı | 0 | 0 | 0 | 0 | hesap (PRICING.annual) |
| 8 | gider | 1.000-3.000 | 0 | **1** | **1** | 1 | hesap |
| 8 | gider | 3.000 üzeri | 0 | 0 | 0 | 0 | hesap |
| 9 | butce | En düşük | 0 | **3** | 2 | 3 | İng pros · Dubai fitTable (ok:false) + watchouts |
| 9 | butce | Orta | 1 | 0 | **2** | 2 | KKTC pros |
| 9 | butce | Esnek | **3** | 0 | 0 | 3 | Dubai watchouts |
| 10 | sure | En kısa sürede | 0 | **3** | 1 | 3 | FACTS.days (3-7 / 5-10 / 7-14) |
| 10 | sure | Belirleyici değil | 0 | 0 | 0 | 0 | bilerek boş |
| 11 | vize | Sadece şirket | 0 | **2** | 1 | 2 | FACTS.ingiltere.limit |
| 11 | vize | Kendim için | **3** | 0 | 1 | 3 | Dubai fitTable · KKTC faq · İng fitTable (ok:false) |
| 11 | vize | Kendim ve ekibim | **4** | 0 | 0 | 4 | Dubai pros + structures · İng FACTS.limit |

### Soru bazında beklenen puan · Dubai nerede kazanıyor, nerede kaybediyor

Cevaplar eşit olasılıklıyken bir sorunun bir ülkeye kazandırdığı ortalama puan.

| soru | perde | Dubai | İngiltere | KKTC | İ − D |
|---|---|---:|---:|---:|---:|
| musteri | İşiniz | 1,50 | 1,50 | 0,75 | 0,00 |
| is | İşiniz | 1,25 | 1,00 | 0,75 | **−0,25** |
| kanal | İşiniz | 1,00 | 1,00 | −0,33 | 0,00 |
| platform | Erişim | 1,00 | 1,50 | 0,00 | +0,50 |
| banka | Erişim | 1,67 | 1,00 | 0,00 | **−0,67** |
| **ziyaret** | Erişim | 0,00 | 2,00 | 1,00 | **+2,00** |
| kazanc | Kazanç | 0,50 | 1,00 | 0,50 | +0,50 |
| gider | Kazanç | 0,00 | 0,33 | 0,33 | +0,33 |
| butce | Kısıtlar | 1,33 | 1,00 | 1,33 | **−0,33** |
| **sure** | Kısıtlar | 0,00 | 1,50 | 0,50 | **+1,50** |
| **vize** | Kısıtlar | 2,33 | 0,67 | 0,67 | **−1,67** |
| **toplam** | | **10,58** | **12,50** | **5,50** | **+1,92** |

**Dubai dört soruda önde** (is, banka, butce, vize · toplam +2,92),
**İngiltere beş soruda önde** (platform, ziyaret, kazanc, gider, sure · toplam
+4,83), ikisinde berabere. Net +1,92.

İKİ RAKAM BURADA ÖNEMLİ:

1. **Dubai'nin üstünlüğü tek soruda toplanmış.** +2,92'lik toplam avantajın
   +1,67'si, yani %57'si yalnız `vize` sorusundan. `vize` kapatıldığında Dubai
   %41,7'den **%32,8'e** düşüyor. Yani Dubai tek bacak üstünde duruyor ve o bacak
   üç şıktan yalnız ikisinde basıyor.
2. **İngiltere'nin üstünlüğü beş soruya yayılmış.** En büyüğü kapatılsa
   (`ziyaret`) İngiltere hâlâ dört soruda önde. Yayılmış avantaj neredeyse her
   kombinasyonda çalışır, toplanmış avantaj yalnız doğru şık seçilince.

Beklenen fark yalnız 1,92 iken birincilik farkının 14,1 puan çıkması bir abartma
değil, bu dağılımın doğal sonucu: İngiltere eksi Dubai farkının ortalaması 1,92,
standart sapması 7,29. Küçük bir ortalama kayması geniş bir dağılımda böyle bir
oran üretiyor (İ > D %56,9 · eşit %4,8 · D > İ %38,3).

### Yapısal bulgu: Dubai iki soruda hiç puan alamıyor

| soru | Dubai tavanı | İngiltere tavanı | KKTC tavanı |
|---|---:|---:|---:|
| **gider** | **0** | 1 | 1 |
| **sure** | **0** | 3 | 1 |
| platform | 2 | 3 | **0** |
| banka | 3 | 3 | **0** |

`gider` ve `sure` sorularında Dubai'nin alabileceği en yüksek puan sıfır. On bir
sorunun ikisi Dubai için sonucu **yalnızca kötüleştirebilen** sorular. İngiltere
için böyle bir soru yok, on birinde de puan alabiliyor. Bu bir puanlama hatası
değil: FACTS.days Dubai'yi en uzun aralıkta (7-14 gün), PRICING Dubai'yi en yüksek
yıllık kalemde (2.100 USD) gösteriyor, yani yazılı kaynak öyle diyor. Ama bir
testin on bir sorusundan ikisinin bir ülke için tek yönlü olması, o iki sorunun
ağırlığını ve gerekliliğini ayrı bir karar hâline getiriyor.

---

## T2 · Dubai'nin gerçek avantajları testte temsil ediliyor mu

Sitenin Dubai için söylediği her şey tarandı (countryContent.dubai · pros,
watchouts, clarify, structures, tax, fitTable, faq · brand.ts FACTS + PAY_MATRIX).
Her avantajın karşısında onu ölçen soru, o şıkkın taramadaki payı (p) ve beklenen
katkısı (p × puan) yazılı.

| Dubai'nin sitede yazılı avantajı | teste bağlı mı | ölçen şık | beklenen katkı |
|---|---|---|---:|
| Oturum ve çalışan vizesi (pros, structures) | **evet** | vize·ekip (D4) + vize·kendim (D3) | **2,33** |
| Banka erişimi · Wio, Mashreq (pros, PAY_MATRIX) | **evet** | banka·kurumsal (D3) | 1,00 |
| Körfez ve Orta Doğu pazarı (fitTable) | **evet** | musteri·korfez (D3) | 0,75 |
| E-ticaret ve lojistik (fitTable, FACTS.forWhom) | **evet** | is·eticaret (D3) | 0,75 |
| **Kurumlar vergisi %0** (pros, tax, intro) | **çok zayıf** | yalnız kazanc·yuksek (D2), 4 şıktan 1'i | **0,50** |
| Global tahsilat · Stripe, PayPal, wamo (pros) | **ayırt etmiyor** | kanal·kart D3 = İ3 | 0,00 fark |
| SaaS ve ajanslar (fitTable) | **ayırt etmiyor** | is·yazilim D2 = İ2 | 0,00 fark |
| **Kişisel gelir vergisi yok** (tax) | **HİÇ SORULMUYOR** | yok | 0,00 |
| **Serbest bölge / mainland yapı seçimi** (structures) | **HİÇ SORULMUYOR** | yok | 0,00 |
| BAE iç pazarına satış, mağaza, depo, ihale (structures) | **HİÇ SORULMUYOR** | yok | 0,00 |
| KDV %5 · üç ülkede üç farklı rejim (tax) | **HİÇ SORULMUYOR** | yok | 0,00 |
| **Danışmanlık** (FACTS.forWhom + structures.fit) | **TERS** | is·danismanlik D0 · İ2 · K2 | **0,00** |

### Dört bulgu

**T2-a · Dubai'nin manşet avantajı testte 0,50 puan ediyor.** Site Dubai'yi
"vergi avantajı ile banka ve vize erişimini aynı anda veren tek seçenek" diye
tanıtıyor (intro), pros'un ilk kartı "Kurumlar vergisi %0*", tax tablosunda iki
ayrı satır bunu anlatıyor. Testte karşılığı **tek bir şıkka iliştirilmiş +2**
(`kazanc·yuksek`, FIT_VERGI_ARTI) ve o şık taramanın dörtte birinde seçiliyor.
Beklenen katkısı 0,50, yani Dubai'nin beklenen toplamının **%4,7'si**.
Karşılaştırma: İngiltere'nin "ziyaret şartı yok" avantajının beklenen katkısı
**2,00**, kendi toplamının %16,0'sı. Sitenin en çok tekrarladığı Dubai avantajı,
İngiltere'nin bir avantajının dörtte biri kadar ağırlık taşıyor.

**T2-b · Testte "vergi avantajı istiyor musunuz?" diye bir soru yok.** İngiltere
sayfası bunu bir profil olarak yazmış ("Vergi avantajı arayan → ok:false, alt:
dubai") ama teste karşılık gelen bir soru yok; ölçüm o satırı ancak `kazanc`
sorusunun en üst bandı üzerinden dolaylı yakalıyor. Sitenin dört ayrı "Dubai'ye
gidin" yönlendirmesinden biri bu.

**T2-c · Dubai'nin tek özel içerik bloğu hiç sorulmuyor.** `structures` alanı
üç ülkeden yalnız Dubai'de dolu (serbest bölge / mainland, vize kotası, iç pazar,
mağaza, depo, ihale). Yani sitenin en Dubai'ye özgü bölümü testte sıfır soruyla
temsil ediliyor. Vize kotası tarafı `vize·ekip` üzerinden dolaylı geçiyor, gerisi
hiç geçmiyor.

**T2-d · Bir satırda site kendi kendiyle çelişiyor, test o çelişkinin İngiltere
tarafını almış.** `FACTS.dubai.forWhom` = "E-ticaret, teknoloji, **danışmanlık**,
oturum isteyen" ve `structures.fit` (serbest bölge) = "E-ticaret, yazılım,
**danışmanlık**, ajans". Yani site iki ayrı yerde Dubai'yi danışmanlık için
sayıyor. Buna karşılık Dubai'nin `fitTable`'ında danışmanlık satırı yok ve testin
`is·danismanlik` şıkkı **Dubai'ye 0, İngiltere'ye 2, KKTC'ye 2** veriyor. Ölçülen
sonucu: bu şık seçildiğinde Dubai birinci olma oranı %30,1'e düşüyor (tarama
ortalaması %41,7). Bu bir puanlama tercihi değil, cevaplanmamış bir içerik
sorusu: **Dubai danışmanlık için uygun mu, değil mi?** İki dosya "evet" diyor,
`fitTable` sessiz, test "hayır" davranıyor.

### Aynı tarama KKTC ve İngiltere için

Dengeli olsun diye aynı tarama üç ülkeye de yapıldı, iki bulgu daha çıktı:

- `is·diger` ("Başka bir alan": gayrimenkul, turizm, sağlık, finans) üç ülkeye de
  0 veriyor. Oysa `FACTS.ingiltere.forWhom` "gayrimenkul SPV" diyor ve KKTC
  fitTable "Gayrimenkul ve turizm → ok:true" diyor. Yani iki ülke için yazılı
  kaynak var ve puan yazılmamış. Bu satır Dubai'ye zarar vermiyor, KKTC'ye veriyor.
- PAY_MATRIX'in sekiz satırında Dubai **8/8** ✓, İngiltere **5/8** ✓, KKTC
  **1/8** ✓ (KKTC'de dört ✗). Matris Dubai'yi açık ara önde gösteriyor; testin
  erişim tarafındaki iki sorusu (`platform` + `banka`) bunu doğru yansıtıyor
  (beklenen D 2,67 · İ 2,50). Yani erişim tarafında bir hata yok, o perdeyi
  bozan şey üçüncü soru.

---

## T3 · Perde ağırlıkları

Dört perdenin beklenen puanı ve salınımı (bir ülkenin o perdede alabileceği en
yüksek ile en düşük puan arası).

| perde | soruları | D beklenen | İ beklenen | K beklenen | İ − D | D salınım | İ salınım | K salınım |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| İşiniz | musteri, is, kanal | 3,75 | 3,50 | 1,17 | **−0,25** | 9 | 8 | 10 |
| **Erişim** | platform, banka, ziyaret | 2,67 | 4,50 | 1,00 | **+1,83** | 11 | 10 | 2 |
| Kazanç | kazanc, gider | 0,50 | 1,33 | 0,83 | +0,83 | 2 | 3 | 3 |
| Kısıtlar | butce, sure, vize | 3,67 | 3,17 | 2,50 | **−0,50** | 7 | 8 | 4 |
| **toplam** | | **10,58** | **12,50** | **5,50** | **+1,92** | 26 | 29 | 16 |

Perdeyi tamamen kapatınca dağılımın nereye gittiği (tam tarama):

| kapatılan perde | Dubai | İngiltere | KKTC |
|---|---:|---:|---:|
| hiçbiri (bugünkü hâl) | %41,7 | %55,8 | %2,5 |
| İşiniz kapalı | %41,0 | %58,0 | %1,0 |
| **Erişim kapalı** | **%49,5** | **%40,7** | %9,7 |
| Kazanç kapalı | %45,7 | %51,9 | %2,4 |
| Kısıtlar kapalı | %39,0 | %57,1 | %3,9 |

**Bir perde ötekileri ezmiyor ama bir SORU eziyor.** Geçen turun teşhisi
"kazanç perdesi" idi ve o teşhis artık geçerli değil: kazanç perdesi tamamen
kapatılsa İngiltere hâlâ %51,9'da. Bugünkü tek gerçek kaldıraç **Erişim**
perdesi, ve perdenin içinde de tek bir soru:

- `platform` + `banka` birlikte: D 2,67 · İ 2,50, yani **Dubai önde**.
- `ziyaret` tek başına: D 0,00 · İ 2,00.
- Perdenin +1,83'ü tamamen ve fazlasıyla `ziyaret`ten geliyor.

Salınım tarafında da aynı şey: testin 38 puanlık toplam salınımının 7'si tek bir
şıkta (`ziyaret·uzaktan`, +4 / −3). İkinci en büyük şık salınımı 6 (`kanal·kart`),
üçüncüsü 4 (`vize·ekip`).

---

## T4 · İngiltere nereden kazanıyor

### En çok puan yazan üç şık ve dayanağı

| sıra | şık | İ | D | K | taramadaki payı | beklenen katkı | dayanak sitede var mı |
|---|---|---:|---:|---:|---:|---:|---|
| 1 | `ziyaret · uzaktan` | **4** | −3 | 0 | **%50,0** | **2,00** | **VAR**, hem de dört kaynakta |
| 2 | `platform · evet` | 3 | 2 | 0 | **%50,0** | 1,50 | VAR (İng pros) |
| 3 | `sure · hizli` | 3 | 0 | 1 | **%50,0** | 1,50 | VAR (FACTS.days) |
| 4 | `kanal · kart` | 3 | 3 | −3 | %33,3 | 1,00 | VAR, ama Dubai ile eşit |
| 5 | `banka · odeme` | 3 | 2 | 0 | %33,3 | 1,00 | VAR (İng clarify) |
| 6 | `butce · dusuk` | 3 | 0 | 2 | %33,3 | 1,00 | VAR (İng pros) |
| 7 | `musteri · avrupa` | 3 | 1 | 0 | %25,0 | 0,75 | VAR (İng fitTable) |

**İngiltere "kötü olmadığı için" kazanmıyor.** Bu turun net bulgusu bu ve
müşterinin hipotezini kısmen çürütüyor: yukarıdaki yedi şıkkın yedisinin de
sitede yazılı bir dayanağı var, hiçbiri boşluktan doğmuyor. Yazılı dayanağı
zayıf tek bir satır bulundu ve o küçük: `musteri·turkiye` şıkkında İngiltere'ye
verilen **+1**. Gerekçesi "İngiltere Ltd Türkiye'den de yürütülebiliyor" ve bu
cümlenin karşılığı sitede yok; İngiltere sayfası Türkiye'den hiç söz etmiyor.
Beklenen katkısı 0,25, yani dağılıma etkisi ihmal edilebilir.

**Ama üç şıkkın üçü de ikişer seçenekli sorularda.** Yukarıdaki listenin ilk üç
sırası (2,00 + 1,50 + 1,50 = **5,00**, İngiltere'nin beklenen toplamının %40'ı)
`ziyaret`, `platform` ve `sure` sorularından geliyor ve bu üç sorunun üçü de
ikişer şıklı, yani taramada her biri **%50** paya sahip. Dubai'nin en güçlü
şıkkı (`vize·ekip`, +4) üç şıklı bir soruda, yani %33,3; ikinci en güçlüsü
(`musteri·korfez`, +3) dört şıklı bir soruda, yani %25,0. Aynı büyüklükteki puan
farklı sıklıkta sayılıyor. Bu, ağırlıkların değil **şık sayısının** ürettiği bir
fark ve T5'te ölçüldü.

### "Olumsuz satırı yoksa test sessizce ödüllendiriyor" · dokuz "hayır" satırının bedeli

Müşterinin bu turdaki en keskin sorusu buydu ve cevabı ölçülebiliyor. Üç ülke
sayfasının her birinde **üçer tane** `ok:false` satırı var, yani site her ülke
için eşit sayıda "hayır" yazmış. Her "hayır"ın teste kaç puanlık bedelle girdiği
(reddedilen ülke ile o şıktaki en iyi rakip arasındaki mesafe × şıkkın taramadaki
payı):

| ülke | sitedeki "hayır" satırı | ölçen şık | payı | mesafe | beklenen bedel |
|---|---|---|---:|---:|---:|
| Dubai | Kuruluş bütçesi dar olan | butce·dusuk | %33,3 | 3 | 1,00 |
| Dubai | **Hiç seyahat edemeyecek olan** | ziyaret·uzaktan | **%50,0** | **7** | **3,50** |
| Dubai | Yalnızca AB'ye fatura kesen | musteri·avrupa | %25,0 | 2 | 0,50 |
| | | | | **Dubai toplam** | **5,00** |
| İngiltere | Vergi avantajı arayan | kazanc·yuksek | %25,0 | 2 | 0,50 |
| İngiltere | Oturum vizesi isteyen (kendim) | vize·kendim | %33,3 | 3 | 1,00 |
| İngiltere | Oturum vizesi isteyen (ekip) | vize·ekip | %33,3 | 4 | 1,33 |
| İngiltere | **Nakit ağırlıklı ticaret** | **hiçbir soru** | 0 | 0 | **0,00** |
| | | | | **İngiltere toplam** | **2,83** |
| KKTC | Stripe ile kart tahsilatı | kanal·kart | %33,3 | 6 | 2,00 |
| KKTC | AB pazarına fatura kesen | musteri·avrupa | %25,0 | 3 | 0,75 |
| KKTC | Global platformda satış | platform·evet | %50,0 | 3 | 1,50 |
| | | | | **KKTC toplam** | **4,25** |

Aynı hesap "evet" satırları için de yapıldı (ülke başına dört satır, mesafe =
kendi puanı eksi o şıktaki en iyi rakip):

| ülke | beklenen kazanç | beklenen bedel | **net** |
|---|---:|---:|---:|
| Dubai | 1,92 | 5,00 | **−3,08** |
| İngiltere | 2,83 | 2,83 | **0,00** |
| KKTC | 1,50 | 4,25 | **−2,75** |

**BULGU.** Site üç ülkeye de eşit sayıda evet ve hayır yazmış (4 + 3). Bu simetrik
içerik teste girdiğinde İngiltere tam denkleşiyor, Dubai ile KKTC üçer puan açık
veriyor. Sebep yazılı içerik değil ölçüm mekaniği:

- İngiltere'nin en büyük "evet"i (`ziyaret·uzaktan`, +4) **iki şıklı** bir soruda,
  yani beklenen katkısı 2,00. Dubai'nin en büyük "evet"i (`musteri·korfez`, +3)
  **dört şıklı** bir soruda, yani 0,75.
- Dubai'nin en ağır "hayır"ı da aynı iki şıklı soruda, yani %50 sıklıkta 7 puan
  mesafeyle işliyor (3,50). İngiltere'nin en ağır "hayır"ı üç şıklı bir soruda
  (1,33).
- İngiltere'nin üç "hayır"ından biri (**nakit ağırlıklı ticaret · banka onay oranı
  yerleşik olmayan ortakta düşük**) teste hiç bağlanmamış. Sitede yazılı, testte
  bedeli sıfır. Bu, müşterinin sorduğu "olumsuz satırı olmayan ülke sessizce
  ödüllendiriliyor mu" sorusunun **evet** çıkan tek örneği ve karşılığı ölçüldü:
  0,50 ile 1,50 arası bir bedel (öteki hayırların bandı) eksik yazılıyor.

### Sitenin kendi yönlendirmeleri teste soruldu

En doğrudan sınav bu. Ülke sayfalarındaki `ok:false` satırlarının çoğunda `alt`
alanı var, yani sayfa ziyaretçiyi hangi ülkeye yolladığını yazıyor. Bu satırların
şartı teste girildi ve testin ne dediğine bakıldı:

| sitenin yönlendirmesi | kaç satır | test aynı ülkeyi söylüyor mu |
|---|---:|---|
| "→ İngiltere'ye bakın" | 4 | **4 / 4** (%100) |
| "→ Dubai'ye bakın" | 4 | **1 / 4** (%25) |

Dört "Dubai'ye bakın" satırının tek tek sonucu:

| sitenin satırı | şart | test ne diyor |
|---|---|---|
| İng: Vergi avantajı arayan → dubai | kazanc=yuksek | **Dubai %54,4** · İng %44,1 ✔ |
| İng: Oturum vizesi isteyen → dubai | vize=kendim | Dubai %47,7 · **İng %49,3** ✘ |
| KKTC: Stripe ile kart tahsilatı → dubai | kanal=kart | Dubai %43,1 · **İng %56,9** ✘ |
| KKTC: Global platformda satış → dubai | platform=evet | Dubai %40,2 · **İng %58,9** ✘ |

**Müşterinin cümlesinin sayısal karşılığı tam olarak bu tablo.** Site dört yerde
"bu profildeyseniz Dubai'ye bakın" diyor; test bunların üçünde İngiltere diyor.
Buna karşılık site dört yerde "İngiltere'ye bakın" diyor ve test dördünde de
İngiltere diyor. İçerik ile ölçüm arasındaki uyumsuzluk tek yönlü.

Son iki satırın sebebi teknik ve basit: `kanal·kart` şıkkı Dubai ile İngiltere'ye
**aynı** puanı veriyor (+3 / +3), `platform·evet` ise İngiltere'ye Dubai'den
fazlasını (+3 / +2). Oysa bu iki satırın kaynağı KKTC sayfası ve KKTC sayfası
ikisinde de **Dubai'ye** yolluyor, İngiltere'ye değil.

KKTC tarafında durum daha sert: sitenin dört "KKTC uygundur" satırının **hiçbirinde**
test KKTC'yi birinci göstermiyor (en iyisi "Türkiye merkezli operasyon" şartında
%8,7). Bu, geçen turun "sorun puanlama değil içerik" teşhisini doğruluyor ve
durum.md'deki 2 numaralı bekleyen kararla aynı yere çıkıyor.

---

## T5 · Taramanın kendi yanlılığı

Bugünkü %41,7 / %55,8 / %2,5 rakamı **bütün şıkları eşit olasılıklı** sayan bir
taramadan çıkıyor. Bu varsayım üç ayrı yerden yanlış ve üçü de ölçüldü.

### T5-a · Şık sayısı taramanın gizli önyargısıdır

Tarama bir şıkkı, bulunduğu sorunun şık sayısına göre ağırlıklandırıyor. Yani bir
şıkkın "gerçek hayatta ne sıklıkta seçileceği" değil, **yanında kaç kardeşi
olduğu** belirliyor.

| soru | şık sayısı | her şıkkın taramadaki payı |
|---|---:|---:|
| platform, ziyaret, sure | 2 | **%50,0** |
| kanal, banka, gider, butce, vize | 3 | %33,3 |
| musteri, is, kazanc | 4 | %25,0 |

İngiltere'nin en güçlü üç şıkkının üçü de %50'lik kutuda, Dubai'nin en güçlü iki
şıkkı %33,3 ve %25'lik kutularda. Bunun bedeli ölçüldü. Ağırlıklara hiç
dokunmadan, yalnız `ziyaret` ve `sure` sorularının şık payını üç şıklı bir sorunun
payına (%33,3 ve %33,3) çekmek:

| kurgu | Dubai | İngiltere | KKTC |
|---|---:|---:|---:|
| bugünkü tarama | %41,7 | %55,8 | %2,5 |
| `ziyaret` üç şıklı olsaydı | %51,8 | %45,1 | %3,1 |
| `sure` üç şıklı olsaydı | %44,0 | %53,3 | %2,6 |
| ikisi birden | **%54,3** | **%42,5** | %3,2 |
| `platform` da eklenirse | %54,7 | %41,4 | %3,9 |

**Tek bir ağırlık değişmeden sıralama dönüyor.** Yani müşterinin şikâyet ettiği
oran, bir sorunun altında kaç düğme olduğuna bakan bir sayımdan çıkıyor.

### T5-b · Tarama, sitenin imkânsız dediği cevap çiftlerini de sayıyor

Testin kendi yardım satırları iki şeyi söylüyor: oturum vizesi yalnız Dubai'den
çıkıyor (`vize` help: "Şirket kurmak İngiltere'de de KKTC'de de oturum hakkı
vermiyor") ve Dubai'de vize için gitmek şart (`ziyaret` help + FACTS.dubai.limit +
Dubai clarify: "bu adım vekâletle yürümüyor"). Buna rağmen tarama, aynı anda
"oturum vizesi istiyorum" ve "hiçbir yere gidemem" diyen kombinasyonları da
sayıyor. Bunlar taramanın **tam üçte biri** (41.472 kombinasyon) ve dağılımın
taşıyıcısı onlar:

| dilim | n | Dubai | İngiltere | KKTC |
|---|---:|---:|---:|---:|
| ham tarama | 124.416 | %41,7 | %55,8 | %2,5 |
| yalnız "vize istiyorum + hiç gidemem" dilimi | 41.472 | %16,4 | **%82,7** | %0,9 |
| o dilim çıkarıldığında kalan | 82.944 | **%54,3** | %42,4 | %3,3 |

Aynı mantıkla iki filtre daha kuruldu ve üçü birlikte uygulandı:

| filtre | n | Dubai | İngiltere | KKTC |
|---|---:|---:|---:|---:|
| 0 · ham tarama | 124.416 | %41,7 | %55,8 | %2,5 |
| 1 · "henüz erken" kombinasyonları çıkarıldı | 93.312 | %41,0 | %56,6 | %2,4 |
| 2 · "vize istiyorum + hiç gidemem" çıkarıldı | 82.944 | %54,3 | %42,4 | %3,3 |
| 3 · "kurumsal banka + hiç gidemem" çıkarıldı | 103.680 | %45,8 | %51,4 | %2,8 |
| **4 · üçü birlikte (tutarlı evren)** | **57.024** | **%58,0** | **%38,5** | **%3,5** |

Filtre 1'in gerekçesi ayrı ve önemli: bugünkü %41,7 / %55,8 / %2,5 rakamı, testin
**hiçbir ülke önermediği** 31.104 kombinasyonu (kazanç en alt bandı, "henüz
erken") da ülke dağılımına sayıyor. Bu kombinasyonlarda ziyaretçiye bir ülke
söylenmiyor, dolayısıyla "test hangi ülkeyi öneriyor" sorusunun cevabında
bulunmamaları gerekir. Tek başına etkisi küçük (%41,7 → %41,0), ama sayının
tanımını düzeltiyor.

Filtre 2'nin bir de ürün tarafı var: bugün "oturum vizesi istiyorum" + "hiç
gidemem" diyen ziyaretçiye test **İngiltere** diyor (%82,7), oysa İngiltere'nin
sonuç ekranındaki kısıt cümlesi "Şirket kurmak oturum hakkı vermiyor". Yani test
ziyaretçinin geldiği sebebi karşılamayan bir ülkeyi birinci gösterip kısıtı alt
satırda söylüyor. "Henüz erken" kapısının kardeşi bir durum ve bugün karşılığı yok.

**Kendi kendini denetleme.** Yalnız Dubai lehine çıkan filtreler seçilmesin diye
ters yönlü beş filtre daha denendi (kazanç en alt bandı + esnek bütçe, kazanç en
alt bandı + geniş gider, kazanç en üst bandı + en düşük bütçe, platform evet +
kanal belirsiz, kurumsal banka + dar gider). Beşinin de etkisi ±1 puanın altında
kaldı (%40,0 ile %42,0 arası) ve hiçbiri sıralamayı değiştirmedi. Yani yukarıdaki
üç filtrenin büyüklüğü bir seçim yanlılığı değil, gerçekten o üç çift büyük.

### T5-c · Duyarlılık: tek bir cevabın gerçek dağılımı sonucu belirliyor

`ziyaret` sorusunda "her şey uzaktan olmalı" cevabının gerçek oranı bilinmiyor.
Tarama %50 varsayıyor. Bu oran değiştikçe sonuç:

| p(uzaktan) | Dubai | İngiltere | KKTC |
|---:|---:|---:|---:|
| %0 | %72,0 | %23,7 | %4,3 |
| %20 | %59,9 | %36,5 | %3,6 |
| %25 | %56,9 | %39,8 | %3,4 |
| **%38,7** | **eşitlik noktası** | | |
| %50 (bugünkü varsayım) | %41,7 | %55,8 | %2,5 |
| %75 | %26,6 | %71,9 | %1,6 |
| %100 | %11,4 | %87,9 | %0,7 |

**Bütün tartışma bu tek sayının etrafında dönüyor.** Gerçek oran %38,7'nin
altındaysa test Dubai'yi öneriyor, üstündeyse İngiltere'yi. Firmanın üç ülkede de
ofisi var ve Dubai kuruluşu yapıyor; Dubai'yi seçen her müşteri tanım gereği
gidebilmiş demektir (vize ve banka imzası vekâletle yürümüyor). Yani gerçek oran
%50 olamaz, ama kaç olduğunu **yalnız firma biliyor**. Bu, bugüne kadar
sorulmamış bir veri sorusu.

`sure` sorusunda aynı duyarlılık daha zayıf ama tek yönlü: p(hızlı) %0'dan %100'e
giderken Dubai %48,7'den %34,7'ye iniyor. Bu soruda Dubai'nin alabileceği en
yüksek puan sıfır olduğu için hangi oran seçilirse seçilsin sonuç Dubai aleyhine.

`kanal` sorusundaki kart oranı yalnız KKTC'yi etkiliyor: p(kart) %33'ten %90'a
çıkarsa KKTC %2,5'ten %0,4'e düşüyor, Dubai ile İngiltere neredeyse hiç oynamıyor.

### T5-d · Gerçekçi profillerle ölçüm

Beş profil kuruldu. Cevaplar uydurulmadı, sitenin kendi cümlelerinden alındı
(fitTable satırları, FACTS.forWhom, pros ve faq); profilin belirlemediği sorular
sabitlenmeyip taranmaya bırakıldı.

| profil | kaynağı | Dubai | İngiltere | KKTC |
|---|---|---:|---:|---:|
| A · Türkiyeli yazılımcı, AB müşterisi, kartla tahsilat, hiç gidemez | İng fitTable satır 1-4 | %0,0 | **%100,0** | %0,0 |
| B · E-ticaret, global platform, kart, oturum istiyor, gidebilir | Dubai fitTable satır 1+3 | **%100,0** | %0,0 | %0,0 |
| C · Körfez'e satan danışman, kendi ve ekip vizesi, gidebilir | Dubai fitTable satır 2 + pros | **%100,0** | %0,0 | %0,0 |
| D · Türkiye merkezli bölgesel ticaret, havale, orta bütçe | KKTC fitTable satır 1-3 | %0,0 | %0,0 | **%100,0** |
| E · FACTS.dubai.forWhom birebir (e-ticaret + oturum isteyen + banka) | FACTS + Dubai pros | **%99,2** | %0,0 | %0,8 |

**Test tutarlı profillerde doğru çalışıyor.** Her profilde sitenin kendi sayfasının
söylediği ülkeyi söylüyor, üstelik ezici çoğunlukla. Yani sorun ne ağırlıkların
yönünde ne testin mantığında: sorun, **tutarsız cevap kümelerini de eşit sayan
tarama** ve o taramanın ürettiği tek sayı.

Bu ölçümün sınırı açıkça yazılıyor: beş profilin **gerçek ziyaretçi içindeki payı
bilinmiyor**, çünkü site bir ziyaretçi dağılımı yayımlamıyor ve elimizde analitik
yok. Profillerin ağırlığı uydurulmadı, o yüzden bu tablodan "gerçek dağılım şu"
diye bir sayı ÇIKARILMADI. Tablonun söylediği tek şey şu: sitenin tarif ettiği
her profilde test doğru ülkeyi söylüyor.

---

## SONUÇ

**Dubai daha az çıkıyor çünkü test, Dubai'nin manşet avantajını (vergi ve oturum)
tek bir soruya sıkıştırıp iki şıkta soruyor; buna karşılık İngiltere'nin
avantajını (ucuz, hızlı, uzaktan) beş ayrı soruya yayıp üçünü de ikişer şıklı,
yani taramada iki kat sık sayılan sorular hâline getirmiş; üstüne tarama,
sitenin kendi metinlerine göre imkânsız olan "oturum istiyorum ama hiç gidemem"
kombinasyonlarını da (taramanın tam üçte biri, İngiltere'nin %82,7 kazandığı
dilim) hesaba katıyor.**

Kısası: **içerik Dubai'yi işaret ediyor, ölçüm onu göremiyor.** Sitenin dört
"Dubai'ye bakın" yönlendirmesinden üçünde test İngiltere diyor; dört "İngiltere'ye
bakın" yönlendirmesinin dördünde de İngiltere diyor. Tutarsız kombinasyonlar
ayıklandığında dağılım hiçbir ağırlığa dokunmadan **%58,0 Dubai / %38,5 İngiltere**
oluyor.

---

## (a) İÇERİK düzeltmesi gerekenler

Her madde bir ölçüme dayanıyor; hiçbirinde ağırlık önerilmiyor, eksik olan içerik
söyleniyor.

**İ1 · Dubai'nin `fitTable`'ında vergi satırı yok.** İngiltere sayfası "Vergi
avantajı arayan → ok:false, alt: dubai" diyor, yani karşı taraf yazılmış; Dubai
sayfasının kendi tablosunda buna karşılık gelen bir `ok:true` satırı yok
(dört satırı: e-ticaret, Körfez, oturum vizesi, SaaS). Ölçülen bedeli: Dubai'nin
manşet avantajı testte 0,50 beklenen puan ediyor, İngiltere'nin "ziyaret yok"
avantajı 2,00. Eksik olan bir ağırlık değil bir **satır**.

**İ2 · Dubai `fitTable`'ında danışmanlık satırı yok, oysa iki dosya Dubai'yi
danışmanlık için sayıyor.** `FACTS.dubai.forWhom` ve `structures.fit` ikisi de
"danışmanlık" diyor. Test bugün bu profilde Dubai'ye 0 veriyor ve Dubai'nin
birincilik oranı %41,7'den %30,1'e düşüyor. Karar: ya `fitTable`'a satır girecek,
ya `forWhom` ile `structures.fit` düzeltilecek. **İkisi aynı anda doğru olamaz.**

**İ3 · "Kişisel gelir vergisi yok" hiçbir soruya bağlı değil.** Dubai `tax`
tablosunda yazılı ve üç ülke arasında gerçek bir ayrım (İngiltere'de PAYE ve kâr
payı rejimi var, KKTC'de gelir vergisi var). Testte karşılığı yok, beklenen katkı
0,00. Bir soru sorulacaksa dayanağı bu satır.

**İ4 · İngiltere'nin "nakit ağırlıklı ticaret" reddi hiçbir soruya bağlı değil.**
Sitedeki dokuz "hayır" satırından teste hiç girmeyen tek satır bu ve etkisi
ölçüldü: İngiltere'nin toplam ret bedeli 2,83, Dubai'ninki 5,00. Bu satırın
karşılığı yazılsaydı bandı 0,50 ile 1,50 arası olurdu (öteki hayırların bandı).

**İ5 · Dubai'nin `structures` bloğu (serbest bölge / mainland, iç pazar, mağaza,
depo, ihale) testte sıfır soruyla temsil ediliyor.** Üç ülkeden yalnız Dubai'de
dolu olan tek içerik bloğu bu, yani sitenin en Dubai'ye özgü bölümü ölçüme hiç
girmiyor.

**İ6 · `is · Başka bir alan` şıkkı üç ülkeye de 0 veriyor** ama site iki ülke için
yazılı kaynak taşıyor: `FACTS.ingiltere.forWhom` "gayrimenkul SPV",
KKTC fitTable "Gayrimenkul ve turizm → ok:true". Bu satır Dubai'ye zarar
vermiyor, KKTC'ye veriyor; durum.md'deki 2 numaralı bekleyen kararın parçası.

**İ7 · KKTC'nin dört "uygundur" satırının hiçbirinde test KKTC'yi birinci
göstermiyor** (en iyisi %8,7). Geçen turun teşhisi aynen geçerli: KKTC'nin
gerçekten kazandığı senaryolar siteye yazılmadıkça test onu öneremez.

## (b) PUANLAMA düzeltmesi gerekenler

Yine ağırlık önerilmiyor; ölçüm yanlışının nerede olduğu söyleniyor.

**P1 · `ziyaret` iki şıklı ve testin en büyük salınımını (7) taşıyor.** Tek bir
şık, testin 38 puanlık toplam salınımının %18'ini tek başına taşıyor ve iki şıklı
olduğu için taramanın yarısında devrede. Ölçülen: `ziyaret` üç şıklı bir sorunun
payına çekilse (ağırlık aynı kalarak) dağılım %51,8 / %45,1 oluyor. Karar
noktası, sorunun kendisi değil şık sayısı ve ağırlığın büyüklüğü.

**P2 · `sure` ve `gider` soruları Dubai için tek yönlü.** Dubai bu iki soruda
tavanı sıfır, yani cevabı ne olursa olsun sonucu ancak kötüleştirebiliyor.
Ölçülen: ikisi birden kapatılsa Dubai %50,4 / İngiltere %46,9. `sure` tek başına
kapatılsa %48,7 / %48,4. Bu, o soruların yanlış olduğu anlamına gelmiyor
(kaynakları FACTS.days ve PRICING), ama "ucuz ve hızlı" ekseninin kaç kez
sorulduğu bir karar: `butce`, `sure`, `gider`, `kazanc` dördü de üç ülkeyi aynı
sırada diziyor. Dördü birden kapatıldığında dağılım %50,7 / %47,3.

**P3 · `kanal·kart` ve `platform·evet` şıkları, kaynak sayfanın yolladığı ülkeyi
göstermiyor.** İkisinin de kaynağı KKTC sayfası ve KKTC sayfası ikisinde de
`alt: dubai` diyor; test ikisinde de İngiltere'yi birinci gösteriyor (%56,9 ve
%58,9). Puanlar sitede yazılı olduğu için "yanlış" değil, ama sitenin
yönlendirmesiyle testin cevabı ayrışıyor. Ölçülen: dört "Dubai'ye bakın"
satırından yalnız biri tutuyor, dört "İngiltere'ye bakın" satırının dördü de
tutuyor.

**P4 · `musteri·avrupa` şıkkı Dubai'ye +1 veriyor, oysa Dubai'nin kendi sayfası
bu profili reddediyor** ("Yalnızca AB'ye fatura kesen → ok:false, alt: ingiltere").
Bu, teyit belgesi · B3'te zaten açık duran soru; bu turda sayısı çıktı: reddedilen
bir profilde artı puan, o satırın ret bedelini 0,50'ye indiriyor.

**P5 · Tarama "henüz erken" kombinasyonlarını ülke dağılımına sayıyor.** 31.104
kombinasyonda test hiçbir ülke önermiyor ama bunlar %41,7 / %55,8 / %2,5
rakamının içinde. Çıkarıldığında %41,0 / %56,6 / %2,4. Küçük bir fark, ama
raporlanan sayının tanımı düzeliyor.

**P6 · "Oturum istiyorum ama hiç gidemem" için sonuç yok.** Bugün bu ziyaretçiye
test %82,7 oranında İngiltere diyor, oysa İngiltere oturum vermiyor ve bunu aynı
ekranda yazıyor. "Henüz erken" kapısının kardeşi bir durum: sitenin kendi
metinlerine göre bu talebi üç ülkeden hiçbiri karşılamıyor. Bu bir ağırlık işi
değil, sonuç ekranında bir kapı işi.

**P7 · Testin tek gerçek bilinmeyeni: `ziyaret` cevabının gerçek dağılımı.**
Eşitlik noktası %38,7. Bu oranın altında test Dubai diyor, üstünde İngiltere.
Firmanın kendi müşteri geçmişi bu sayıyı biliyor, biz bilmiyoruz.
**Murat abiye sorulacak tek sayı bu.**

## Hangisi daha ağır basıyor

**Puanlama tarafı, ama beklenenden farklı bir anlamda.** Ağırlıkların yönü doğru,
büyüklükleri de savunulabilir; yanlış olan **ölçünün kendisi**:

| kalem | Dubai'nin birincilik oranına etkisi |
|---|---:|
| Şık sayısı düzeltmesi (`ziyaret` + `sure` üç şıklı sayılsa) | %41,7 → **%54,3** |
| Tutarsız kombinasyonların ayıklanması | %41,7 → **%58,0** |
| İçerik eksiklerinin tamamı (İ1 + İ3 + İ5, ölçülemez çünkü satır yok) | ölçülemedi |

Sayı verilebilen iki kalem puanlama/ölçüm tarafında ve ikisi de tek başına
sıralamayı çeviriyor. İçerik tarafı ölçülemiyor çünkü ölçülecek satır henüz
yazılmamış: Dubai'nin vergi avantajı, kişisel gelir vergisi ve yapı seçimi sitede
anlatılıyor ama **uygunluk tablosuna girmemiş**, o yüzden testin okuyabileceği bir
kaynağı yok. Bu içerik boşluğu doldurulmadan puanlama düzeltmesi yapılırsa
kaynağı olmayan ağırlık yazmış oluruz, ki bu dosyanın tek değişmez kuralı bunu
yasaklıyor.

**Sıra: önce İ1 ve İ2 (Dubai'nin uygunluk tablosuna vergi ve danışmanlık satırı),
sonra P1 ve P7 (şık sayısı ve gerçek ziyaret oranı), en sonda P6 (oturum kapısı).**
Bu üç adımın ilk ikisi ölçüldüğünde dağılım zaten dönüyor; üçüncüsü dönmüş
dağılımın dürüst kalmasını sağlıyor.

## Bu turun ölçümü nasıl üretildi

Beş betik, hepsi `jiti` ile `src/lib/fitTest.ts` ve `src/lib/countryContent.ts`
üzerinden okudu, kaynağa hiç yazmadı. Üretilenler: 33 şıkkın ülke bazında puanı,
perde ve soru bazında beklenen puan, perde ve soru yalıtımı (tam tarama), şık
koşullu birincilik oranları, sitenin 21 uygunluk satırının şart olarak girilmesi,
dokuz ret satırının beklenen bedeli, ağırlıklı tarama ile duyarlılık eğrileri, ve
tutarlılık filtreleri. Yeniden üretmek için belgenin sonundaki "Ölçümü yeniden
üretmek" bölümü yeterli; bu turda eklenen tek şey, düz saymak yerine şıkkın
olasılığını dışarıdan verebilen ağırlıklı tarama.

---

# GEÇEN TUR · dengenin onarımı

*(Aşağıdaki bölüm bir önceki turun kaydı ve o turun diliyle yazılı: içindeki
"bu tur" ifadeleri o turu, "geçen tur" ifadeleri ondan öncekini gösteriyor.
Bugünkü teşhis yukarıda.)*

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
