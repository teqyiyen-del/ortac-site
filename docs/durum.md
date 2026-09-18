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

## Son durum · 15.09.2026

**MARKETING REVİZESİ: 10 MADDE CANLIDA, 10 MADDE MURAT ORTAÇ'IN ONAYINDA.**
Burak listeden 4-5-7-8-9-11-12-13-14-19'u seçti ("kesinlikle ele alınsın");
kalan 1-2-3-6-10-15-16-17-18-20 açık, Burak Murat Ortaç'a soracak. Ayrıntı
aşağıda "15.09.2026 · MARKETING REVİZESİ UYGULANDI" bölümünde; ilk
değerlendirme onun altında.

**YAYIN KURALI DEĞİŞTİ (13.09):** Burak: "yaptığın her şeyi canlıya atabilirsin …
zaten private link bu … çoğu şeyi önce labda yapıp sonra yayına basıyoruz."
Yani **her tur doğrudan `main`'e push ediliyor**, ayrı dal ya da pull request
açılmıyor. Vercel `main`'i otomatik yayına alıyor; site özel bir adreste ve
kararı henüz verilmemiş işler zaten `/lab` altında (noindex) duruyor, yani
yayın bir onay kapısı değil. Aşağıdaki tur kayıtlarında geçen "karar beklenen
işi push etmeden önce sor" kuralı bu cümleyle KALKTI.

**Araçlar canlıda.** PR #1'in dalı (`araclar-tezgah`) `main`'e ileri sarılarak
katıldı (`fad231e`), GitHub PR'ı birleştirilmiş sayıyor; dal silindi. Canlıya
çıkanlar: menü altı karta indi, altı araç Tezgâh (A2) dilinde, kurumlar vergisi
ülke başına üç adres (`/araclar/kurumlar-vergisi/{dubai,ingiltere,kktc}`), SIC
bulucu (`/araclar/ingiltere-sic-kodu`), İngiltere isim sorgulama
(`/araclar/ingiltere-isim-sorgulama`, deponun ilk sunucu rotası), `/araclar`
dizini, `sitemap.xml` + `robots.txt`. Katılmadan sonra yerelde: tsc 0, eslint 0,
css-check 47 (taban), serit-check 0, on dört adres 200 (eski kök
`/araclar/kurumlar-vergisi` 308).

**Müşteriden bekleniyor: `COMPANIES_HOUSE_API_KEY`** Vercel ortam değişkeni
olarak. Yokken API `{"durum":"anahtar-yok"}` 503 dönüyor (yerelde denendi) ve
araç bunu hata ekranı değil "henüz etkin değil + Companies House'un kendi arama
sayfası" hâli olarak gösteriyor; kırık görünmüyor. Anahtar eklendikten sonraki
ilk dağıtımda kod değişmeden çalışır (anahtar istek anında okunuyor).

**Katılmadan sonra yerel sunucu `/hakkimizda` derlemesinde asılı kaldı**
(işlemci boşta, 15 dakika). Sunucuyu durdurup `.next/cache/webpack`,
`.next/types`, `.next/server` silinip yeniden başlatınca her şey 200 döndü.
Tuzak O ve U'nun birleşimi: çalışan sunucunun altında dal değişince önbellek
bozuluyor.

Yedek dal `yedek-tur-12eylul` hâlâ yerelde duruyor, artık gereksiz.

### Son altı tur

| commit | tur |
|---|---|
| (bu commit) | Hero fiyatı F3 ile canlıda (aşağı oklu), SSS panelinde boşluk ve soru sayacı |
| `ad21953` | Hero fiyat ögesi ve SSS bloğu için iki lab turu (F1-F3 · S1-S3) |
| `aa344f2` | Rapor taban tasarımda kaldı; blok başlıklarına ikon, sıralamaya bayrak eklendi |
| `3fd2b43` | Rapor tasarımına üç aday: /lab/rapor (R1 teklif dili · R2 gece kapak · R3 editoryal) |
| `30cd674` | Araç çıktısı: Ortac markalı tek rapor şablonu ve ilk araç (uygunluk testi) |
| `893c308` | İhtiyaç bulucu I1 ile canlıda |
| `c99a41b` | Geçiş G1 ile canlıda (çıkış kartın içinde), ihtiyaç seçeneklerinde siyah hover, kurumlar vergisi iki araca ayrıldı ve KKTC kalktı |
| `ca64c92` | Geçiş bölümü G2 ile canlıda, alıntının üstüne boşluk, I1 ikonlu ve özetli |
| `13f39b5` | Alıntı bandı A3 ile canlıda ve bir basamak aşağıda; G1 numaralı duraklara ve ikonlu gerekenler listesine kavuştu; ihtiyaç bulucunun sol tarafı için üçüncü lab turu |
| `4cebc24` | İhtiyaç bulucudan ikonlar azaldı; geçiş adayları G3'ün diline taşındı, alıntı bandının zemini için ikinci lab turu |
| `8992946` | Muhasebe: alıntı künyesi geri, ihtiyaç bulucu uygunluk testinin seçenek dilinde, geçiş bölümü için /lab/muhasebe-gecis (G1 · G2 · G3) |
| `f2d1bf0` | Revizenin üçüncü geçişi: künye kutusu cümlesiz, geçiş bölümü zaman çizgisi + kart, ihtiyaç bulucu yan yana ve açılır satırlı |
| `7271c18` | Revizenin ikinci geçişi: geçiş ve ihtiyaç bölümleri sadeleşti, künye bandı tek kompozisyon, reklam sayfası şirket kuruluşuna döndü |
| `5d56830` | Marketing revizesi, seçilen 10 madde: muhasebe hero ve fiyat kutusu, künye kartı, geçiş bölümü, ihtiyaç bulucu, sekiz soruluk SSS, altı alt hizmet sayfası, reklam iniş sayfası |
| `253ed24` | durum.md: marketing revize listesi (20 madde) koddaki hâliyle eşleştirildi |
| `10c1991` | Araçlar canlıya alındı (PR #1 `main`'e katıldı); yayın kuralı: her tur doğrudan `main` |
| `1741fe0` | Satış akışı demosu: önizleme gerçek A4, üst kısım gece sekme çubuğu, sunum modu |
| `d45c16c` | Satış akışı demosu (Dubai): tek pencerede ülke, paket, bilgiler, teklif, ödeme |
| `64d6068` | Muhasebe: takas satırları eşit boyda, karşılık bölümü sayfanın ölçüsünde; satış akışı brifi kayda geçti (canlı) |
| `dcb3a19` | A2 (Tezgâh) dili altı aracın tamamına uygulandı; /araclar dizini açıldı |
| `46059a4` | Araç sayfası düzenine üç yön (/lab/arac-dili): zorunlu gece yan panel reddedildi, A2 seçildi |
| `22b8a03` | Araçlar uygunluk testinin diline geçti; kurumlar vergisi ülke başına ayrı adres (SEO), sitemap ve robots eklendi |
| `48a3c2a` | Araçlar: ülke seçimli kurumlar vergisi, SIC bulucu, İngiltere isim sorgulama; menü altı karta indi |
| `d7fa5f2` | Muhasebe ve hakkımızda canlıya alındı, iki lab turu kapandı |
| `0463dc2` | K1 ve F3 muhasebe sayfasına girdi, takas paneli oranıyla büyüdü, hakkımızda yeni sıra, üç tur kapandı |
| `abfd4be` | Muhasebe kapsamına üç aday, fayda ikinci tur, hakkımızda Levha yerinde ve komple bento, araç listesi değerlendirildi |
| `dd4bcce` | Lab temizliği: on dört tur silindi |
| `1f039f6` | Dört lab turu paralel açıldı: fayda, ülke, hakkımızda yönleri, bölüm başı |
| `7cf80ba` | Muhasebe adayı müşterinin bölüm bölüm brifiyle kuruldu (MD) |
| `1a5ba1f` | Muhasebe adayı yeniden kuruldu: tarama odaklı MC |
| `60f0158` | Tam site denetimi, on hata düzeltildi, iki lab turu açıldı |
| `e2b7238` | Ana sayfa hero başlığı: süreçlerinizi yönetiyoruz |
| `db1c476` | İsim üreteci site dolaşımına açıldı |
| `fea4120` | İsim üreteci aşamalı akışa geçti, alan adı sorgusu eklendi |
| `25f52d6` | Kurumlar vergisi hesaplayıcısına dönem seçimi ve hazır tutarlar |
| `ac511e3` | Kutu kenarındaki şeritler site genelinde kaldırıldı, denetim betiği yazıldı |
| `2844f95` | Yeni araç canlıda: İngiltere'den şirket kurabilir misiniz? |
| `7676d94` | Ölü kod 34→27, yedi yetim dosya silindi |
| `b556ae8` | 404 ve hata sayfaları, yumuşak-404 kapatıldı |
| `587fa37` | Ülke bölümü değişikliği geri alındı, karar müşteride |
| `3879999` | Ana sayfadaki ülke bölümü tek görünüme indi (GERİ ALINDI) |
| `49d349c` | Site metni konuşma dilinden kurumsal dile geçti (88 düzeltme) |
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

## 18.09.2026 · /araclar SADELEŞTİ + KÖŞE YARIÇAPI DENETİMİ

| söz | ne oldu |
|---|---|
| "araçlar çıktısı sizde kalır, bu bir kere güzel başlık değil … SEO açısından hiç hoş değil, başlıkta konu neyse onu yaz" | Başlık **"Kuruluş ve vergi araçları."** oldu; metadata başlığıyla aynı dilde |
| "onun altında bir paragraf açıklama yazmışsın, gereksiz … altta bir sürü yine açıklama var … en altta yine bir yazı var, buna da gerek yok" | Hero'daki altı satırlık gizlilik paragrafı, listenin üstündeki üç satırlık giriş ve en alttaki altı satırlık paragraf **görünür yüzden kalktı**. Silinmediler: ikisi sayfanın dibinde kapalı bir açılırda ("Araçlar hakkında: oranlar, kaynaklar ve gizlilik"), metinler yine defterden türüyor |
| "karar araçlarını ayrı bir yere koyman gerekiyor, o tekstler birbirine girmiş" | Gruplar arasına **64 px ara + kat çizgisi** girdi, grup başlığı 12 px mavi etiketten 18 px siyah başlığa çıktı, başlık altındaki açıklama cümlesi kalktı |
| "bunların hiçbiri ayrışmıyor, ikondur odur budur, biraz süsleyebilirsin" | Her karta **ikon** geldi (eşleme `lib/tools/ikonlar.ts` — menüyle aynı kaynak) ve karttaki üç satırlık "ne yapıyor" metni çıktı; o metin aracın kendi sayfasında zaten duruyor. "Kullanıma hazır" rozeti de kalktı: yedi kartın yedisinde aynıydı, bir şey ayırt etmiyordu |

**Köşe yarıçapı denetlendi** (12 rota tarandı): site 8 / 12 / 16 / 28 + pill
ölçeğini kullanıyor, ölçek dışında iki değer var ve ikisi de gerekçeli —
`.ab-cn-ph` 15px (kartın 16px köşesi eksi 1px kenarlık, fotoğraf şeridi kartın
köşesine otursun diye) ve `.sc-msg` 14px (sohbet balonu, köşeleri asimetrik).
Yani tutarlı.

## 18.09.2026 · ALTI DÜZELTME (harf kırpılması site geneli)

| söz | ne oldu |
|---|---|
| "bazı yazıların ö harfi, ü harfinin noktaları falan kesiliyor, özellikle başlıktakiler" | **Site geneli hata, düzeldi.** SplitWords'ün kelime maskesi (`overflow: hidden`) satır yüksekliği kadar yüksekti: başlıkta satır yüksekliği 1,06 (46 px'te 48,76), Poppins'in doğal içerik alanı ~1,4em (64,4) — glifler kutunun **7,8 px üstüne** taşıyor ve maske kesiyordu. Üste 0,25em pay eklendi, negatif kenar boşluğu geri alıyor, düzen değişmedi |
| "düzenli muhasebenin karşılığı … sağdaki 4 box'ın yüksekliklerini topladığında sol tarafa eşitle" | **Eşit.** Ölçüldü: sol kart 398 px, dört kutunun toplamı 344 px, üstte ve altta 27'şer px pay kalıyordu. Sütun `stretch`, kutular `grid-auto-rows: 1fr` |
| "X muhasebeden ortac ekibine ok çek, uçtan uca bir süreç olduğunu hissedelim" | **Ray uçtan uca.** Eski ray yalnız dört aşamanın arasındaydı; şimdi sol dairenin 6 px sağından sağ dairenin 6 px soluna, ucunda ok. Numaraların zemini opak olduğu için ray onların altından geçiyor |
| "geri ile ileri butonları hep aşağıda dursunlar" | **Sabit.** Sol panel grid'den flex'e geçti; gezinme satırına `margin-top: auto`. Soruya göre seçenek sayısı değişse de yeri değişmiyor |
| "sss boxlarının hepsinin boyutu farklı … eşitlemek istiyorum, hepsi iki satır olsun ama text balance at" | **Eşit ve dengeli.** Kutu iki satırlık yazıyı taşıyacak kadar yüksek, tek satırlık soru ortalanıyor; `text-wrap: balance` ikinci satıra bir-iki kelime düşmesini engelliyor. Ölçüldü: 51-75 px arasıydı, sekizi de 75 px |
| "bağımsız denetimin aşağısında bir yazı daha var … bunlar kimse okumayacak" | **Kalktı.** Kalem notları listenin altındaki hep görünen bloktan çıkıp **kendi kalemlerinin açılırına** girdi. Eski gerekçe "hangi tutarı niteledikleri kaybolmasın" idi; not artık nitelediği tutarın içinde olduğu için o sorun da yok |

**Bir deneme geri alındı ve kaydı burada:** maskenin ALT payını da büyütmek
gerekiyordu (ğ ve ş kuyrukları 2,3 px kırpılıyor), ama alt pay büyüyünce
kelimenin başlangıç noktası da (`initial: y 110%`) büyümek zorunda. 140%'e
çıkarıldı ve `whileInView` HİÇ tetiklenmedi — sitedeki bütün başlıklar görünmez
kaldı (ölçüldü: motion span opacity 0). Geri alındı; üstteki pay o zinciri
etkilemiyor çünkü kelime aşağıdan giriyor. Alt kırpılma duruyor, ayrı bir iş.

## 18.09.2026 · İKİ LAB TURU CANLIYA ALINDI (ihtiyaç bulucu · navbar araçlar)

| söz | ne oldu |
|---|---|
| "s1 iyi ama soldaki cardın hoverında (box kayboluyo) bide final özetinde sıkıntı var. düzeltip siteye taşı" | **D2 + S1 canlıda, iki kusur düzeltilerek.** Soru tarafı gece, sonuç kalemleri kutuda |
| "n2 iyi siteye taşı" | **Canlıda.** Araçlar paneli 4 sütun kart → 2 sütun tek satırlık kart |

**İki kusur da gece yüzeyin sonucuydu.**
*Hover'da kutu kayboluyordu:* taban hover kuralı açık zemine göre yazılmış
(`background: var(--night)`); gece panelde gece üstüne gece gelince kutu
görünmez oluyordu. Gece yüzeyde hover artık AÇIYOR (#1b1b1b zemin, #3d3d3d
kenarlık), koyulaştırmıyor.
*Özet görünmüyordu:* dört cevaptan sonraki özet satırlarının etiketi
`var(--text-900)`, yani gece üstünde siyah üstüne siyah — ekranda yalnız segment
düğmeleri duruyordu. Segmentin kendisi de açık zemin için yazılmıştı (kâğıt
track, gece seçili hap) ve gece panelde beyaz bir blok gibi görünüyordu. Artık
track gece, seçili hap beyaz: açık zemindeki mantığın tersi, aynı okuma. Özet
satırları da kutuya alındı.

**Navbar'da ölçülen iki şey.** Künyeden ülke öneki düşüyor ("Dubai · 375.000
AED'ye kadar %0" → "375.000 AED'ye kadar %0"): başlık zaten ülkeyle başlıyordu,
aynı kelime iki satırda iki kez yazılıyordu ve künyeyi ikinci satıra taşıran
şey buydu. Kayıt defteri değişmedi — orada ülke doğru yerde. İkincisi: iki
sütunda araç ADI hiç kırpılmıyor, künye kırpılıyor; tersi denendi ve uzun bir
satırda adın kendisi kırpılıyordu.

Kalıp yeniden yazılmadı: Kaynaklar panelinin tek satırlık kartı (`data-cols="1"`)
`data-tek` ile sütun sayısından bağımsız hâle geldi. "Tüm araçlar" etekten çıkıp
ızgaranın sekizinci kutusu oldu — aynı bağlantı aynı panelde iki kez sayılmasın.

**ÇİZGİYLE AYRILAN LİSTELER · tarandı, soruldu, altısı kutuya alındı.**
Burak: "çizgiyle ayrılan başka yerler var ve bence box lazım, sende tespit et
ve sor bana." 21 rota tarandı (ölçüt: ≥3 kardeşi 1 px alt/üst kenarlıkla
ayrılan, yan kenarlığı olmayan kaplar), **20 liste** bulundu ve dört öbeğe
ayrıldı. Müşteri **fayda/özellik listelerini** seçti; numaralı süreç
listelerine dokunulmadı ("orada çizgi ayraç değil, akışın kendisi").

Kutuya alınan altı liste:

| liste | nerede | yüzey |
|---|---|---|
| `.svm-fy-list` | /dubai/muhasebe · "Düzenli muhasebenin karşılığı" | beyaz kutu |
| `.sxo-list` | /sektorler/[sektor] · "ne yapıyoruz" | gece kutu |
| `.sxr` | /sektorler/[sektor] · "ne zaman hangi ülke" | gece kutu |
| `.sx-axes` | /sektorler/[sektor] · karar ölçütleri | kapsayıcı kutu kalktı, her satır kendi kutusu |
| `.pt-model-list` | /is-ortakligi · modelin tanımı | beyaz kutu (madde noktası durdu) |
| `.pt-limits-list` | /is-ortakligi · vermediğimiz sözler | gece kutu, üç sütun |

Sorulan ama BU TURDA dönüştürülmeyen üç öbek duruyor: kalem/fiyat listeleri
(3), tıklanabilir-açılır satırlar (2), künye/olgu tabloları (5).

## 18.09.2026 · ÜÇ DÜZELTME + İKİ LAB TURU İKİNCİ GEÇİŞE GİRDİ

| söz | ne oldu |
|---|---|
| "şu beyaz dosya biraz yukarı gidebilir artık alanımız var" | **Canlıda.** Belge 30 → 10 px; rayla arası 14'ten 34 px'e çıktı. Kartın üst dolgusu 34 px olduğu için belgenin tepesine 10 px pay kalıyor, yani bir tur önceki "nerdeyse siyah boxdan çıkacak" şikâyetine düşmüyor |
| "1 ve 4 açıklamalarını da 2 satıra al bari uyumlu olsunlar" | **Canlıda.** Etiketin payı 15ch → 10ch. 15ch'te (~110 px) "Durumu çıkaralım" ve "Düzene geçelim" tek satıra sığıyor, ortadaki ikisi iki satıra çıkıyordu; dört aşama üç ayrı yükseklikteydi. 10ch (~74 px) dördünü de iki satıra indirdi |
| "ağırlığı azalt kral semibold muhtemelen mediuma çek" | **Canlıda.** Aşama etiketleri 600 → 500 |
| "ihtiyaç bulucuda renk veya layoutta sorunum yoktu la sadece sağdaki taraf … ama soru tarafını gece denemişsin o iyi duruyor" | **Tur hedefi düzeldi.** D1-D3 iki tarafın nasıl ayrıldığını soruyordu — yanlış soruymuş. Soru tarafının gece hâli (D2) sabitlendi; `/lab/ihtiyac-duzen` artık **sonuç listesinin tasarımını** soruyor: S1 kutulu kalem · S2 hüküm önde ve sıralı · S3 gece özet şeridi |
| "n2 deki gibi daha minik yapma fikri güzel fakat … yine box içine alman lazım onları. araya çizgi atarak ayırma yani o bize uymuyor" | **N2 yeniden yazıldı.** Fikir aynı (tek satır, sabit yükseklik, ad solda künye sağda) ama ayıran şey alt çizgi değil her satırın kendi kutusu. Sekizinci kutu panelin çıkışı oldu, ızgarada delik kalmadı |

**"Çizgiyle ayırma" bir SİTE KURALI oldu.** Müşteri bunu navbar için söyledi ama
kural oraya özel değil: ihtiyaç bulucunun sonuç listesi de ince çizgiyle
ayrılıyordu ve üç yeni adayın üçünde de kalemler kendi kutusunda. İki yerde
aynı karar verildiği için `docs/tuzaklar.md`'ye de yazıldı.

## 18.09.2026 · YEDİ MADDELİK REVİZE: BEŞİ CANLIDA, İKİSİ LABDA

| söz | ne oldu |
|---|---|
| "hoverda mavi olmasını beğenmedim sss kısmının orda text renk değişmesin siktiret direkt canlıya al sonra sitede sss olan her kısım için" | **Canlıda.** Hover'da artık yalnız zemin değişiyor (beyaz → kırık beyaz), yazı siyah kalıyor. Blok tek dosyada olduğu için değişiklik sitedeki bütün SSS'leri kapsıyor. Bir tur önce bilerek kabul edilen kontrast istisnası da kendiliğinden kapandı (3,66 → 18,80:1) |
| "bide text balance kullan lütfen" | **Canlıda.** `.h2`, `.kcta-t` ve `.sss-panel-q` |
| "sitenin bazı yerlerindeki başlıklarda 3 satıra çıkıyor … max 2 satır olarak fixleyelim" | **Canlıda.** 22 rota dört genişlikte tarandı, üç satıra çıkan **üç** başlık vardı. İkisinin sebebi `.h2`nin 19ch'i değil KABIN 62ch'iydi — başlık kendi payını kullanamıyordu. Kap 74ch, başlık 24ch oldu; `.sec-lead` zaten kendi 52ch'ini taşıdığı için açıklama satırı uzamadı. Tarama yeniden koştu: dört genişlikte de üç satır yok |
| "muhasebe sayfasındaki alıntı yazısını 3 satırda tut" | **Canlıda.** Punto tavanı 36 → 34; 1280 altında sütun daraldığı için künye kutusu o aralıkta 400 → 320 ve boşluk 72 → 40. Altı genişlikte ölçüldü (1024 · 1100 · 1279 · 1280 · 1440 · 1600), hepsinde üç satır |
| "2-3 kelimeden oluşan dikkat çekici öğeleri title formatında yap" (kırmızı/yeşil işaretli ss) | **Canlıda.** Yeşil işaret akordiyon satırındaydı: "Fatura Takibi", "KDV ve Beyan", "Banka ve Denetim" ("ve" Türkçe başlık düzeninde küçük kalır). Kırmızı işaretli kart başlığı dokunulmadı |
| "önceki muhasebeciniz ve ortac ekibi daha belirgin, aşamalar daha küçük … her yeride dikey ortala … önceki muhasebeciniz değil de X Muhasebe" | **Canlıda.** Ölçülen sebep: üç sütun `align-items: center` ile KENDİ içeriğine göre ortalanıyordu, etiketler farklı satır sayısındaydı ve üç düğüm üç ayrı yükseklikte duruyordu (sol daire 118, sağ 134, numaralar 153 px). Ortalama artık raya bağlı: her sütunun ilk satırı 52 px'lik sabit düğüm bandı, ray bandın ortasında. Tipografi ters çevrildi — uçlar 15,5/700 beyaz, aşamalar 13,5/600 gri |
| "bana hangi hizmetler kısmı … birbirinden ayrışmıyorlar ve baya sıkış tıkış" | **Lab: `/lab/ihtiyac-duzen`** · D1 iki ayrı kart · D2 soru tarafı gece · D3 soru üstte liste altta |
| "navbardaki araçları sunuş şeklimiz … çorba gibi bir arada, kimisi 2 satır kimisi 1 satır" | **Lab: `/lab/nav-araclar`** · N1 ülkeye göre üç sütun · N2 düz liste · N3 hizalı kart |

**Navbar turunun ölçüsü** kararı kolaylaştırıyor: iki satıra çıkan üç başlığın
HEPSİNDE ilk kelime ülke adı ("Dubai kurumlar vergisi hesaplayıcı" …).
Dengesizliğin kaynağı araç adları değil, her ada tekrar yazılan ülke — ve yedi
kartın 4x2 ızgarada sekizinci gözü boş bırakması. Üç aday da bu noktadan
başlıyor ve yedi aracı kayıt defterinden okuyor.

**İhtiyaç turunun ölçüsü**: soru akışı ile sonuç listesi tek kartın iki yarısı,
aralarında ne boşluk ne çizgi var — yalnız 5 birimlik bir zemin farkı
(#fff / #f5f5f5). 1000 px'te iki sütun yan yana gelince soru tarafına 440 px
düşüyor; "sıkış tıkış" hissinin ikinci kaynağı bu. Üç aday da canlı bulucunun
kendisi, yalnız düzen ve yüzey eziliyor — üçü de gerçekten doldurulabiliyor.

## 18.09.2026 · SSS RENK KARARI CANLIDA + CEVAP BAŞLIĞINA İKİ SATIR SINIRI

| söz | ne oldu |
|---|---|
| "m1 in mavi hoverı ile m2 nin siyah cevabını birleştir. m1 in mavi hoverı bizim mavi olsun ama koyu mavi değil" | **Birleşim canlıya alındı.** Dört durumlu tek dil: **kapalı** beyaz kutu + ince çizgi, siyah yazı · **hover** kırık beyaz zemin, yazı MARKA MAVİSİ (mavi bir durum değil, davranış işareti) · **seçili** gece kutu, beyaz yazı, mavi ok · **cevap** paneli de gece — seçili satır ile cevap tek yüzey gibi okunuyor, "cevap kısmıyla uyumsuz" kopukluğu buradan kapandı |
| "cevap tarafındaki başlıklar 2 satırdan fazla olmasın yasak olsun kral çok dengesiz gözüküyor" | Sebep genişlik kısıtıydı: başlık 22 px'te `max-width: 24ch` (341 px) ile sarılıyordu, panelin iç genişliği ise 465-567 px. **28ch oldu.** Ölçüldü: sitedeki bütün SSS listelerinde (ana sayfa 6 · muhasebe 8 · ülke 5 · iş ortaklığı 8 · alt sayfalar 3) ve dört genişlikte (1024 · 1280 · 1440 · 1600) 26ch'ten itibaren hiçbir başlık iki satırı aşmıyor; 28ch bir soru payı bırakıyor. **Kural artık denetleniyor** (aşağıda) |

**Yasak makineye yazıldı.** `scripts/sayfa-denetim.mjs` her sayfadaki bütün
soruları panel başlığının kendi punto, harf aralığı ve genişliğinde gizli bir
kapta ölçüyor; iki satırı aşan varsa bulgu basıyor. Tek tek tıklamaya gerek yok
ve yeni bir soru yazıldığında kural sessizce bozulmuyor. Denetimin kendisi
denendi: `max-width` 24ch'e geri alınınca betik tam da müşterinin gösterdiği
soruyu yakaladı (*"Serbest bölge (Free Zone) şirketinde muhasebe gerekir mi?"* ·
3 satır).

**Kontrast, ölçülmüş hâliyle.** beyaz/gece 19,60:1 (seçili satır, panel
başlığı) · #9a9a9a/gece 6,97:1 (cevap metni) · `--blue-500`/gece 8,40:1 (ok,
künye, bağlantı) · `--blue-700`/`--paper` **3,66:1** (hover yazısı).

Son satır bilinçli bir istisna: müşteri marka mavisini açıkça istedi ("bizim
mavi olsun ama koyu mavi değil"). 16px/600 büyük metin sayılmadığı için eşik 4,5
ve bu ton altında kalıyor. Dayanak iki şey: (a) site zaten marka mavisini açık
zeminde küçük metinde kullanıyor (`link-arrow`, `.sss-panel-topic`, footer
bağlantıları — hepsi 3,99:1), yani burada daha sıkı davranmak tutarsızlık
olurdu; (b) hover GEÇİCİ bir durum, imleç çekilince aynı yazı siyaha (19,60:1)
dönüyor — bilgi yalnız o renkte taşınmıyor. Kalıcı durum olan seçili satır
19,60:1.

**Dar ekran.** Panel orada kutu değil, sorunun altına girintili bir metin bloğu
(kenarlığı, yarıçapı ve sağ dolgusu sıfırlanmış). Gece zemini o blokta kutu gibi
davranmıyordu — 390 px'te siyah alan ekranın kenarına dayanıp taşmış gibi
görünüyordu. Gece kararının üç satırı dar ekranda geri alınıyor: zemin saydam,
cevap metni açık zemin grisi, bağlantı marka mavisi. Seçili sorunun kendisi
gece kalıyor, o gerçek bir kutu.

**Lab kapandı.** `/lab/sss-renk`'in ilk bloğu artık canlı kuralların kendisini
gösteriyor (hiçbir renk ezmiyor, canlıda bir şey değişirse orası da değişir).
M1-M4 ve tur öncesi hâl kayıt olarak altta duruyor; üçünün paneli açık zemin
olduğu için renkleri lab CSS'inde açıkça yazıldı — canlı panel tabanı artık
gece, yoksa kayıt okunamaz hâle gelirdi.

## 18.09.2026 · SSS STANDARTLAŞTI, RENK İÇİN YENİ LAB TURU

| söz | ne oldu |
|---|---|
| "standardize edelim, şu an home ve hizmet sayfalarında farklı. hepsinin bg normal beyaz olsun yani hizmet sayfalarındaki gibi. home da kırık beyaz var onu da beyaz yapcaz" | **Ana sayfanın SSS bölümü beyaza döndü** ve iki varyant sınıfı silindi. Eskiden ana sayfada bölüm zemini `--paper` idi; soru kutuları, panel ve hover dolgusu da paper olduğu için üçü aynı renge düşüyordu ve `.sss-onpaper` bu çakışmayı paneli beyaza çekerek örtüyordu. Zemin beyaz olunca çakışma kökten kalktı: kutular ve panel `--paper`, zemin beyaz — ülke ve hizmet sayfalarındaki dilin aynısı. `.sss-flat` da gitti (tek işi panel tabanını 348 → 296 çekmekti, o değer artık taban kuralda). İki bileşen (HomeFaq · CountryFaq) artık birebir aynı bloğu basıyor |
| "sss kısmına layoutu sabit tutarak hoverdaki ve normal görünümdeki renklerini denesene" | **`/lab/sss-renk`** açıldı. Adaylar canlı bloğun KENDİ sınıflarını basıyor (`.sss`, `.sss-q`, `.sss-panel`); `css/lab-sss-renk.css` yalnız renk bildiren satırları eziyor — yani dolgu, ölçü ve ızgara birebir canlıdaki. Üç durum tek karede: ilk satır seçili, ikinci satır hover rengini kalıcı gösteriyor (`data-hover`), kalanlar normal |

**İlk geçişin adayları.** *Bugün* (kıyas): taban kırık beyaz kutu, hover beyaza
çıkıyor ve yazı maviye dönüyor, seçili mavi sis — hover ile seçili neredeyse aynı
görünüyor, turun çıkış noktası bu. **R1 · Gece seçim**: taban aynı, hover bir ton
koyuluyor, seçili satır gece. **R2 · Mavi dolu**: taban beyaz, seçili satır
`--blue-900` dolu. **R3 · Ters kâğıt**: taban çizgisiz, seçili satır beyaz + mavi
kontur.

**İKİNCİ GEÇİŞ · iskelet Burak'tan geldi.** *"taban beyaz, hover kırık beyaz,
seçili siyah düşünüyorum. işin içinde mavi de olması lazım ama nerde bilmiyorum.
hoverda texte mi veririz, seçilide texte mi veririz naparız bilmiyorum. bide cevap
kısmına da mı renk atsak napsak? ya da seçiliyi direkt mavi mi yapsak valla kafam
karıştı da cevap kısmıyla bi uyumsuz hissettiriyor."*

R1-R3 bu iskelette birleştiği için sayfadan kalktı (kaydı git'te). Yerlerine,
iskelet sabitken **mavinin yerini ve cevap panelini** soran dört aday geldi:

| aday | mavi nerede | cevap paneli |
|---|---|---|
| **M1 · Mavi hover'da** | üstüne gelinen satırın yazısında (`--blue-900`), seçili satırın okunda | beyaz + ince çizgi — listeyle aynı malzeme |
| **M2 · Cevap da siyah** | gece panelin içinde: künye etiketi ve ok (`--blue-500`) | **gece** — seçili satırla tek yüzey |
| **M3 · Seçili mavi** | seçili satırın kendisinde (`--blue-900` dolu) | kırık beyaz |
| **M4 · Mavi sadece çizgide** | yalnız hover'ın kenarlığında; hiçbir yazı maviye girmiyor | kırık beyaz |

Kontrast ölçüldü: beyaz/gece 19,60:1 · #9a9a9a/gece 6,97:1 · `--blue-500`/gece
8,40:1 · beyaz/`--blue-900` 7,14:1. Marka mavisi `#307fe2` üstüne beyaz küçük
punto (3,99:1) hiçbir adayda yok; M1'in hover yazısı da bu yüzden `--blue-700`
değil `--blue-900`.

Kontrast ölçüldü: beyaz/gece 19,60:1 · beyaz/`--blue-900` 7,14:1 ·
`--blue-900`/`--blue-100` ~6,3:1. Marka mavisi `#307fe2` üstüne beyaz küçük
punto (3,99:1) hiçbir adayda yok.

## 18.09.2026 · İKİNCİ TUR DÜZELTME: ROZET, HİZA VE BÜYÜK HARF

Burak ekran görüntüsüyle üç şey söyledi, üçü de yapıldı.

| söz | ne yapıldı |
|---|---|
| "beyan verildi yazısı boxdan taşıyor" | Ölçüldü: rozet 90 birim, yazı 11 px Poppins'te 70,5 birim ve x=231'den başlıyor — 301,5'te bitiyor, rozetin sağ kenarı 294. Rozet sağ kenarı sabit tutularak sola açıldı: **184..294 (110 birim)**. Kart kenarı 312'de olduğu için sağa değil sola büyüdü |
| "sağdaki 3 box ortalı değil dikey olarak" | Uyum sahnesinde satır yığını 40..162'de duruyordu, kart 14..166: üstte 26 altta 4 birim boşluk. Yığın **29'dan başlatıldı** (29 · 73 · 117), üstte ve altta 15'er birim kaldı; soldaki kalkan zaten kartın tam ortasındaydı, artık hizalılar. Tarama çizgisinin başlangıcı da 34 → 23 |
| "sitedeki her şeyi neden küçük harf yaptın full? … normal yazı formatında yap, baş harfler büyük" | **Etiketler cümle düzenine geçti.** Versal yasağı duruyor; değişen şey küçük harfle başlayan etiketlerin ilk harfi. On üç dosya: ana sayfa sahneleri (Tescil dosyası · Kurumsal · Dönem · Beyan verildi · Defter · Rapor · Kayıt · Politika dosyası · Dönemsel bildirim · Kimlik kartı), kuruluş sahneleri, ülke şemaları (ProSchema), para akışı sahneleri (MoneyHome · Repatriation), sektör panelleri, takvim ekseni, zincir ekseni, canlı izleyici durumları, araç durum satırları ve form rozetleri (Gönderim kapalı · İsteğe bağlı · Opsiyonel · Şarta bağlı) |
| "aç gitsin" (hakkımızda fotoğrafı) | `priority` geri kondu. Bir tur önce "kare LCP adayı değil" gerekçesiyle kalkmıştı; ölçüm bunu yalanladı — hem 1440×900'de hem 390×844'te tarayıcı o kareyi LCP ögesi işaretliyordu. Denetimdeki tek "bilgi" satırı da böylece kapandı |

**Dokunulmayanlar** (bilerek küçük kalanlar): sayının ardından gelen birimler
("tek seferlik", "kişi başı", "3 kayıt", "12 kod"), cümlenin ortasında duran
parçalar ("üçünü de eşit", "{n} kişi pakete dahil") ve başlıkların vurgulu son
parçası ("Sık sorulan **sorular.**"). Bunlar cümlenin içinde; büyük harf orada
yanlış olurdu.

## 18.09.2026 · HATA AVI · dokuz kusur, biri gözle görünmeyen bir eksik çizim

Burak: *"bug fixlemeni istiyorum. özellikle svg görseller konusunda hatalar bozukluklar
var, onların hepsini ss alıp kontrol sağlayabilirsin. başka sorunlar varsa onlara da
bakıp kontrol edebilirsin."* Bütün site 1440 ve 390 px'te gezildi, sahnelerin ekran
görüntüsü tek tek alındı, ayrıca `prefers-reduced-motion` açık bir tarayıcıyla ikinci
bir tur atıldı.

| ne bozuktu | nerede | ne yapıldı |
|---|---|---|
| **Ok ucu hiç çizilmiyordu** (gözle fark edilmesi en zor olanı: satır vardı, ucundaki ok yoktu) | `/dubai` ve `/lp/dubai-sirket-kurulusu` · isim sahnesi | `SceneName` sabit `id="dv-head"` kullanıyordu; sahne sayfada iki kez basıldığı için `url(#dv-head)` HER ZAMAN ilk (gizli, ölçü) kopyaya bağlanıyordu. Aynı dosyadaki diğer iki sahne gibi `useId()`'ye geçti |
| Tarama çizgisi kartın altından çıkıyordu | ana sayfa · uyum sahnesi | Motion'da SVG `y` öznitelik değil **transform**: rect'in hem `y="34"` özniteliği hem `y: [34,146,34]` ötelemesi vardı, ikisi toplanıp çizgiyi 180'e indiriyordu. Öteleme `[0,128,0]` oldu, mutlak 34 → 162 |
| Çubuklar "beyan verildi" rozetinin altına giriyordu | ana sayfa · muhasebe sahnesi | Ölçüldü (rozet x 204-294 / y 26-50, en yüksek çubuğun tepesi y=36). Dizi oranları korunarak ×0,77 ölçeklendi; tepe artık y=58 |
| Satırların ucu mühür halkasının altında kalıyordu | ana sayfa · kuruluş sahnesi | İlk iki satır 104 → 96 (sağ uç 258 → 250, halka x=255'te başlıyor) |
| Satırın ucu biyometri dairesinin altında kalıyordu | ana sayfa · vize sahnesi | Üçüncü satır 108 → 96 (sağ uç 230 → 218, daire x=224'te başlıyor) |
| **Hidratasyon uyuşmazlığı** (üç ayrı yer) | `/` · üç ülke sayfası | Tuzak A'nın üç yeni örneği: `popVariants` kapalı hâlin GEOMETRİSİNİ `reduce`'a bağlıyordu, `Authority` çizim başlangıcını (`strokeDashoffset`), `CountryDocs` ise bölümün `initial`'ını. Üçünde de değer sabitlendi, `reduce` yalnız SÜREye bağlandı. Görsel sonuç birebir aynı |
| Liste satır sonunda virgül düşüyordu | ülke hero'sunun kartı | "AB pazarı, freelance" / "gayrimenkul SPV" iki ayrı cümle gibi okunuyordu; `twoLines` artık ilk satırı virgülle bitiriyor |

**İkinci geçişte bir tane daha çıktı:** `/dubai/muhasebe` · SSS'in altında İKİ çıkış
alt alta duruyordu — `CountryFaq`'in kendi kapanış bandı ("Sorunuz listede yok mu? ·
Ücretsiz danışmanlık", bileşendeki yorumu *"one exit for the whole block"*) ve hemen
altında sayfanın kendi `AskCta`'sı ("Kendi durumumu sorayım"). İkisi de /basla'ya
gidiyordu. Sebep tarihsel: sayfanın satırı 11.09'da kapanış kartları kalkarken TEK çıkış
olarak eklenmişti, bandı bileşene sonra taşıdık, eski satır yerinde kaldı. Paylaşılan
band kaldı (ülke sayfalarında da o duruyor), sayfanın satırı ve artık sahipsiz kalan
`faq.askLabel` ile `.svm-sss-cta` kuralı silindi.

**Üçüncü geçiş · kendi kendine dönen düğme:** kapanış bloğunun iki düğmesi sabit
("Kurulumu Başlat" → /basla, "İletişime Geç" → /iletisim) ve blok her sayfanın altında
duruyor. İki sayfada düğme ziyaretçiyi bulunduğu sayfaya geri gönderiyordu — en kötüsü
`/basla`, çünkü sayfanın kendi metni "Kurulum akışı henüz açılmadı." diyor ve hemen
altındaki düğme aynı cümleye geri götürüyordu; `/iletisim`'de de "İletişime Geç" zaten o
sayfaydı. Artık `Ft2Cta` bulunduğu adrese giden düğmeyi hiç basmıyor: /basla'da
"İletişime Geç", /iletisim'de "Kurulumu Başlat" kalıyor. Menüdeki "Kurulumu Başlat"
site geneli çıpa olduğu için dokunulmadı.

**Yeni kapı: `node scripts/sayfa-denetim.mjs`.** Bu turdaki hataların hiçbiri kaynağa
bakarak görünmüyordu, o yüzden tarayıcıda ölçen bir denetim betiği yazıldı: konsol
hatası, kırık istek, yatay taşma, kesik metin, viewBox dışına taşan SVG ögesi,
yinelenen id, hedefi olmayan çapa ve aria bağı. `--en 390` dar ekranı, `--reduced`
hidratasyonu tarıyor. Yirmi rotada **0 bulgu** (tek "bilgi" satırı: /hakkimizda'daki
Unsplash karesinin next/image LCP önerisi — `priority` bilerek verilmemişti, karar
duruyor).

Üç yeni tuzak `docs/tuzaklar.md`'ye yazıldı: **V** (Motion'da SVG `x`/`y` transform'dur,
öznitelik istiyorsan `attrX`/`attrY`), **W** (SVG `id`'si belge genelinde; sahne iki kez
basılırsa `url(#…)` ilk kopyaya bağlanır ve ikincisinde öge hiç çizilmez), **Y** (Chrome
pencereyi ~500 px altına indirmiyor; `--window-size=390,844` mobil ÖLÇMEZ, bu turun ilk
mobil taraması bu yüzden yalan söyledi).

Ölçülüp **dokunulmayanlar**: `/dubai` haritasının viewBox dışına taşan deniz/kara
dolgusu (bilerek, `.ys-map` kırpıyor), `.ctry-head`'in 3 px'lik "kesik" görünmesi
(içindeki fotoğraf `scale(1.02)`), `.sr-only` ve fotoğraf kaplarının taşması.
Site içi bağlantı taraması da yapıldı: 62 hedefin hepsi 200.

## 18.09.2026 · HERO FİYATI F3 İLE CANLIDA, SSS PANELİNDE BOŞLUK VE SAYAÇ

| söz | ne oldu |
|---|---|
| "f3 mantıklı olabilir ama aşağı yönlendiren bi oku fln yok. f2 kesinlikle olmaz. f1 de çok göze çarpmıyor" | **F3 canlıya alındı**: fiyat artık `.btn-ghost`, yani hero'nun ikincil düğmesiyle aynı yükseklik ve punto — "**350 USD** /ay'dan · kalemler ↓". Aşağı ok eklendi, #fiyat'a iniyor. Çerçeveli üç satırlık kutu silindi |
| "ana sayfadaki sss biraz daha iyi mantık olarak ama başlıkla açıklama arasında spacing yok o sıkıntı … üstünde iconla birlikte minik başlık yazması da hoş … soru sayısı yazmak da mantıklı, ona sen karar ver" | Ana sayfanın düzeni korundu. **Boşluk düzeldi**: ayraç (`.sss-rule`) bir turda gizlenmişti ve taşıdığı 22 px de gitmişti — ölçüldü, cevabın üstünde 0 px kalmıştı; artık 18 px. **Sayaç eklendi**: künye satırı solda ikonlu etiket, sağda "1 / 6". Ülke ve hizmet sayfalarında etiket "Sık sorulan" (o listelerde konu yok), sayaç aynı. İki bileşen de (HomeFaq · CountryFaq) aynı künye satırını basıyor |

Labdaki S1-S3 ve F1-F2 elendi; iki tur da kayıt olarak duruyor.

## 18.09.2026 · İKİ YENİ LAB TURU: HERO FİYAT ÖGESİ VE SSS TASARIMI

| söz | ne oldu |
|---|---|
| "şu heroda aylık 350 dolar kısmı var ya onu daha sade yapmamız lazım ya çok kaba duruyor, bide solundaki butona göre tipide farklı ya biraz sırıtıyor" | **`/lab/hero-fiyat`**: **F1 · satır** (kutu yok; butonun sağında ayraç + "Aylık 350 USD'den · KDV hariç · kalemler ↓", 13,5 px güven satırı tipografisi), **F2 · güven satırı** (fiyat ayrı nesne değil, hero'nun güven satırlarının başına üçüncü satır olarak giriyor; tutar beyaz ve kalın), **F3 · ikinci düğme** (butonla aynı yükseklik ve tipografi, ghost düğme: "350 USD /ay'dan · kalemler"). Canlı hero bu turda değişmedi |
| "bizim sitedeki ss kısımlarının tipini daha iyi nasıl yaparız … solda başlıklar sağda cevap olması işini beğeniyorum onu koru … tasarım daha iyi olabilir" | **`/lab/sss`**: düzen korundu (solda soru, sağda yapışkan cevap paneli), değişen görsel dil. **S1 · sakin liste** (çerçeve yok, seçili soru kırık beyaz, panel beyaz ve üstünde ince çizgi), **S2 · numaralı** (01… içindekiler; seçili soru gece zemin, panel --paper), **S3 · gece cevap** (sorular beyaz kart, seçili kart mavi çerçeveli, cevap paneli gece). Veri muhasebe sayfasının sekiz sorusu; canlı `CountryFaq` değişmedi |

## 18.09.2026 · MARKA ÇIKTISI BAŞLADI: ŞABLON, İLK ARAÇ VE ÜÇ TASARIM ADAYI

**Fikir 1 (Ortac markalı araç çıktısı) başladı.** Kurulanlar:
`lib/rapor.ts` (rapor modeli: künye · sonuç · liste · tablo · not; tarih,
adres ve tek şerh), `components/rapor/` (belge + yazdırma düğmesi),
`css/rapor.css` (ekranda gizli, yazdırmada tek başına). Her araç yalnız
modeli dolduruyor. İlk araç **uygunluk testi**: sonuç ekranında "Raporu
indir (PDF)"; çıktı ölçüldü — tek sayfa, MediaBox 595×842.

İki hata çıktı ve düzeldi: (1) lab-satis.css'in yazdırma kuralı kapısızdı ve
`.sat-pen` taşımayan HER sayfanın yazdırma çıktısını boşaltıyordu; (2) ata
zinciri sıfırlanmadan belge sayfadan taşıyordu.

**Tasarım turu ve kararı:** "raporun tasarımı çok dosya gibi kokuyor … bana 3
tane tasarım oluştur." **`/lab/rapor`** açıldı (R1 teklif dili · R2 gece kapak
· R3 editoryal). Burak üçünü görünce: **"senin önceki daha iyiymiş, biraz icon
ve ülke bayrağı ile süsleyebilirsin … ama bokunu çıkartma."** Üç aday elendi,
canlı şablon taban hâlinde kaldı ve iki şey eklendi: blok başlığında 14 px
ikon (isteğe bağlı) ve ülke sıralamasında **bayraklı satır** (yeni `sira`
blok tipi; üç satırlık tablo başlık satırıyla form gibi duruyordu). Lab
sayfası kayıt olarak duruyor, tur kapandı.

**Ayrıca aynı gün:** ihtiyaç bulucu labdaki I1 ile canlıya alındı (tek soru
sırayla, sonunda değiştirilebilir özet, seçenekte siyah hover).

## 18.09.2026 · GEÇİŞ G1 İLE CANLIDA, KURUMLAR VERGİSİ İKİ ARACA AYRILDI

| söz | ne oldu |
|---|---|
| "live tarafta g1 daha iyi olacak gibi ama g2 deki gibi devir durumumu sorayım butonunu ya boxun içine alalım ya da yukardaki başlığın sağına alalım" | #gecis **G1'e döndü**: beyaz bölüm, içinde gece kart; hat kartın içinde ve **çıkış da kartın içinde** (gerekenlerin sağında). Gerekçe: sayfada üç gece yüzey arka arkaya çok geliyordu. G2 (tam gece) labda kayıt |
| "bana hangi hizmetler gerekiyorda butonun üstünde gelince siyah olsun" | seçenek kutusunda **hover siyah** (zemin + yazı + ikon diski); seçili hâl mavi kaldı, yani geçici olan koyu, kalıcı olan mavi |
| "kurumlar vergisi aracını ayıralım ve kktc kaldıralım. 2 tane olsun orda direkt ayrı ayrı" | tek kart ikiye ayrıldı: **Dubai kurumlar vergisi hesaplayıcı** ve **İngiltere kurumlar vergisi hesaplayıcı** (adresler değişmedi, yönlendirme gerekmiyor). KKTC rotası kapandı (`catalog.ts · KV_ULKELER`), /araclar/kurumlar-vergisi/kktc artık 404; metni icerik.ts'te "okunmuyor" notuyla duruyor. Menü, footer, dizin ve site haritası defterden beslendiği için kendiliğinden güncellendi |

**Burak'ın açtığı üç yeni konu (henüz kod yok, aşağıda sıraya kondu):** araçlara
"ödeme altyapısı uygunluk aracı", "yıllık uyum takvimi" ve **araç çıktılarının
Ortac markalı PDF/ICS olarak indirilebilmesi**.

## 18.09.2026 · GEÇİŞ BÖLÜMÜ G2 İLE CANLIDA, I1 İKİNCİ HÂLİ

| söz | ne oldu |
|---|---|
| "g1 güzel oldu ama dosya çok yukardan gidiyor nerdeyse siyah boxdan çıkacak. g2 de düzgün duruyor … bence g2 koy sitede de güncelle. ama g1 i de düzelt" | **G2 canlıya alındı**: #gecis artık tam gece bant; hat (önceki muhasebeci → dört numaralı durak → Ortac), üstünde akan belge, altında iki sütun ikonlu gerekenler ve çıkış. Belgenin yüksekliği hattın kendi üst dolgusuna bağlandı (44 px), yani G1'de de taşmıyor. Hat ve liste **tek kaynak**: canlı bileşen `GecisHat` / `GecisGerekenler`'i dışa açıyor, lab G1 onları basıyor |
| "alıntı kısmının yeri güzel olmuş ama üst kısım ile araya spacing koymamışsın" | takas panelinin bölüm dolgusu sıfırdı (komşu beyaz bölümlerle toplanmasın diye). Artık **yalnız altında gece bir bölüm varsa** alt dolgu açılıyor (`:has(+ .svm-alinti)`); ölçüldü: panel ile bandın arası 104 px |
| "tek sorulu mantık iyiymiş … bunlara icon entegre edebiliriz. bide bir şey seçili gelmesin … en son tamamını tamamlayınca bi özet görsün istediklerini değişebilsin … özeti I3 deki gibi görebilir" | **I1 ikinci hâli** (lab): seçeneklerde ikon; hiçbiri seçili gelmiyor (cevaplar boş başlıyor), seçili hâl mavi — siyah yalnız üstüne gelince; dördüncü cevaptan sonra sol taraf **I3'ün ayar satırlarına** dönüyor (özet + tek dokunuşla değiştirme + "baştan başla"); sağdaki liste dört cevap tamamlanana kadar hüküm vermiyor, kalemler "—" ile bekliyor |

Lab: `/lab/muhasebe-gecis` artık Taban (canlı G2) + G1 + G3. Ölçüm: tsc 0,
eslint 0, css-check 47, serit-check 0; üç adres 200.

## 18.09.2026 · ALINTI A3 CANLIDA, G1 SEÇİLDİ, İHTİYAÇ İÇİN ÜÇÜNCÜ LAB TURU

| söz | ne oldu |
|---|---|
| "a3 mantıklı geldi. aşağı alma konusunda denemek lazım emin değilim ama çok aşağı gitmemeli" | **A3 canlıya alındı**: gece zemin duruyor, dikey boşluk 1,6 katına çıktı (clamp 104-168) ve alıntı bir punto büyüdü. Bant **bir basamak aşağı indi**: artılarımızın altından çıkıp kapsam + takas panelinden sonraya, takvimden önceye geldi. Labdaki diyagramın önerdiği yer bir basamak daha aşağıdaydı, "çok aşağı gitmemeli" denildiği için oraya taşınmadı |
| "g1 i beğendim … önceki süreç şeyinde hepsinin üstünde sayı yazıyordu ve üstünde de dosya fln çıkıyordu ya ilk versiyonda onu beğeniyordum onu taşıyalım bu tasarıma" | G1'in durakları yine **numaralı daire**; hattın üstünde **belge** akıyor ve belge durağa vardığı anda o durak doluyor, numarası beyazlıyor (tek döngü, 7.919 ms) |
| "devir için gerekenler kısmı biraz garip olmuş yine icon kullan da sadece biraz daha düzgün yap, öncekinde tüm iconlar aynıydı fln ondan sıkıntıydı" | dosya yaprakları ve kare onay kutuları silindi. Altı kalemin **altısı da ayrı ikon** (numara · beyanname · defter · banka · lisans · denetim), üç sütun; ikon adları veride (switchover.needs) |
| "bana hangi hizmetler gerekiyor kısmında … kalabalık gelen biraz daha sol taraftı, uygunluk testindeki tasarım buraya uymadı galiba. bunun için labda 3 farklı şey denesene" | **`/lab/muhasebe-ihtiyac`** açıldı. Sağ panel üçünde de aynı; denenen sol taraf: **I1** tek soru sırayla (dört büyük seçenek, seçince sıradakine geçiyor), **I2** form değil cümle (boşluklar açılır menü), **I3** ikonsuz ayar satırları (sağda segment düğme) |

Canlı sayfada değişen: alıntı bandının zemini/yeri. Geçiş bölümü ve ihtiyaç
bulucu karar gelene kadar bugünkü hâlinde. Ölçüm: tsc 0, eslint 0,
css-check 47, serit-check 0; dört adres 200.

## 18.09.2026 · İHTİYAÇ BULUCU SADELEŞTİ, İKİ LAB TURU AÇIK

| söz | ne oldu |
|---|---|
| "bana hangi hizmetler gerekiyor kısmı da bu sefer aşırı kalabalık olmuş gibi hissettiriyor gözüm seçemiyor her yerde icon var" | ekranda dört yerde ikon vardı (soru başlığı · seçenek diski · hüküm rozeti · sonuç satırının kalem ikonu); İKİSİ kaldı, ikisi de solda. Sağ panelde hiç ikon yok, hüküm yalnız kelime; boş onay dairesi yalnız seçili kutuda çiziliyor |
| "g1 in aşama aşama gösterme mantığını sevdim. g3 ün de tasarımı çok iyi olmuş onu g1 e uyarlayabilir miyiz? bide gerekiyorsa siyah üstünede alabiliriz … g2 yi silebilirsin" | `/lab/muhasebe-gecis` yenilendi: **G1** hat artık G3'ün dilinde (beyaz bölümde gece panel, duraklar sırayla onaylanıyor), **G2** aynı hattın tam gece hâli, **G3** 17.09'un adayı kıyas için duruyor. Eski "dört ikon" adayı silindi |
| "şu devir için gerekenler kısmı daha farklı olabilir bi kurcala" | üç ayrı biçim: G1'de **dosya yaprakları** (köşesi kıvrık altı kâğıt), G2'de **kare onay kutulu iki sütun liste**, G3'te çip |
| "alıntı kısmı siyah ya … çok küçük bir alan olduğu için siyah biraz fazla sırıtıyor. ya sıralamada biraz aşağı alalım ya da kırık beyaz fln … hepsini deneyelim" | `/lab/muhasebe-alinti` açıldı: **A1** kırık beyaz (--paper, kutu beyaz), **A2** beyaz + üst/alt çizgi (kutu --paper), **A3** aynı gece ama dikey boşluk 1,6 katı ve alıntı bir punto büyük. En altta **sıra diyagramı**: bandı "düzenli muhasebenin karşılığı" ile "muhasebeci değiştirme" arasına almak (zemin kararından bağımsız, tek satırlık iş) |

Canlı sayfada yalnız ihtiyaç bulucu değişti; geçiş bölümü ve alıntı bandı
karar gelene kadar bugünkü hâlinde. Ölçüm: tsc 0, eslint 0, css-check 47,
serit-check 0; üç adres 200.

## 17.09.2026 · MUHASEBE: ALINTI KÜNYESİ, FORM GİBİ İHTİYAÇ BULUCU, GEÇİŞ İÇİN LAB

| söz | ne oldu |
|---|---|
| "alıntının altında murat abinin ismi geçsin yine ilk versiyondaki gibi" | "Murat Ortaç · Managing Partner" künyesi alıntının altına döndü (ilk hâlin işaretlemesi ve ölçüsü). Sağdaki kutu değişmedi |
| "muhasebeni mi değişmek istiyorsun kısmı çok fazla texte boğulmuş … labda alternatif sun" | **`/lab/muhasebe-gecis`** açıldı: en üstte canlıdaki taban, altında üç aday. Üçünde de adım başına yalnız başlık, açıklama cümlesi yok. **G1 · devir hattı** (önceki muhasebeci → dört durak → Ortac, belge hat üstünde akıyor, gerekenler çip) · **G2 · dört ikon** (solda başlık ve çıkış, sağda 2×2 ikon karosu) · **G3 · gece devir dosyası** (dört adımın onay daireleri sırayla doluyor). Canlı bölüm karar gelene kadar olduğu gibi |
| "bana hangi hizmetler gerekiyor kısmı daha okey ama biraz iconlarla fln destekleyebilirsin özellikle soldaki seçenekler kısmını daha form kafasında yap hatta bizim ülke uygunluk testindeki tasarımdan esinlenebilirsin" | sol taraf uygunluk testinin seçenek diline geçti: her soru ikon dairesi + başlık, seçenekler ikon diskli ve onay daireli kutular, seçilince mavi çerçeve + açık mavi zemin. Sağdaki her sonuç satırının başına kalemin ikonu geldi, rozet adın yanına geçti. 520 px altında seçenekler alt alta |

Hareket (lab): iki sürekli döngü, periyotlar asal (7.919 · 9.001 ms), ikisi de
reduce kapısında. Ölçüm: tsc 0, eslint 0, css-check 47, serit-check 0;
/dubai/muhasebe ve /lab/muhasebe-gecis 200; 1440 ve 390 px görüntüyle bakıldı.

## 15.09.2026 · REVİZENİN ÜÇÜNCÜ GEÇİŞİ (muhasebe sayfasında üç bölüm)

| söz | ne oldu |
|---|---|
| künye bandı: "sağda bi box içinde olması gayet hoş hatta, sadece çok kalabalık … çok text text olduğu için okutmuyordu. şimdi yaptığın daha sade ama onda da çok text var" | kutu geri geldi, içinde cümle yok: baş harf · "Defterinizi imzalayan" · ad · "Certified Accountant · Managing Partner" · iki büyük rakam (30 yıl kurumsal geçmiş · 3 ülke kendi ofisimiz). Alıntının altındaki künye satırı, imza cümlesi ve tüzel kişilik satırı ekrandan kalktı (gerekçe ve nerede durdukları accountingDubai.ts · expert). Lisans/vergi ajanı no gelirse kutunun dibinde tek satır |
| #gecis: "bu seferde çok sıradan oldu sarmadı … öncekiyle bunun arasını bul" | ilk hâlin iki sütunu (solda sıra, sağda gri kart) + ikinci hâlin kısa metni. Dört adım bir zaman çizgisinde (numara daireleri tek dikey hatla bağlı), kartta altı kısa madde onay ikonuyla ve soru çıkışı |
| #ihtiyac: "altlı üstlü değil önceki gibi yan yana formatta yap sadece biraz sadeleştir … sadece basınca içeriği gözüksün yeterdi" | ilk hâlin yan yana kartı geri geldi (sol sorular, sağ gri sonuç). Sorular ikinci hâlin kısa seçenekleri. Sonuç satırı kapalı gelir (rozet · ad · tutar · +); açılınca gerekçe cümlesi ve alt sayfa bağlantısı |

Ölçüm: tsc 0, eslint 0, css-check 47, serit-check 0; /dubai/muhasebe 200;
1440 ve 390 px ekran görüntüsüyle bakıldı.

## 15.09.2026 · REVİZENİN İKİNCİ GEÇİŞİ (Burak'ın ilk bakışı)

Burak dört şey söyledi, dördü de aynı gün uygulandı:

| söz | ne oldu |
|---|---|
| "muhasebecinizi değiştirmek mi istiyorsunuz kısmını ve bana hangi hizmetler gerekiyor kısmını daha sadeleştirmen lazım. sayfanın geri kalanına uygun şekilde" | **#gecis:** iki sütun (uzun satırlar + gri liste kartı) → dört kısa adım yan yana (karo ızgarası, çerçevesiz, numaralı), altında "Devir için gerekenler +" açılırı ve AskCta. **#ihtiyac:** iki panelli kart ve altı gerekçe cümlesi → tek soru bandı (dört grup, 9 hap) + altı sonuç kutusu (hüküm + ad, "duruma bağlı"da kısa koşul), kutu alt sayfaya bağlı. Ciro 5 banttan 3'e, durum 3'ten 2'ye, KDV 3'ten 2'ye; fiyatlar ve e-fatura notu ekrandan kalktı. Bölüm 1.163 → 908 px |
| "muhasebenin alt sayfalarını açmışsın … kalsınlar hiç onlara kafa yoramicam şimdi" | dokunulmadı |
| "reklam sayfası işini aslında direkt şirket kuruluş sayfası için denemeyi düşünüyorlar" | `/lp/dubai-muhasebe` silindi, yerine **`/lp/dubai-sirket-kurulusu`**: ülke hero'su → CountryOrtac → CountryProcess → fiyat yapılandırıcısı → SSS → form. Hepsi /dubai'nin kendi bileşenleri. Form genelleşti (`components/LandingLeadForm.tsx`, soru ve seçenekler sayfadan), CSS `lp.css` oldu. noindex, haritada yok |
| (künye bandının ekran görüntüsü) "ss attığım kısmı daha iyi yapabilirsin bence" | ayrı gece kartı kalktı. Tek kompozisyon: solda alıntı + imza satırı (baş harf + ad + "Managing Partner · Certified Accountant"), ortada 1 px dikey çizgi, sağda imza cümlesi, iki büyük rakam (30 yıl kurumsal geçmiş · 3 ülke, her birinde kendi ofisimiz) ve dipte tüzel kişilik. Ad bantta artık bir kez. Lisans ve vergi ajanı satırları yine veri gelince dipte çıkıyor |

Not: iniş sayfasındaki ülke hero'sunun kendi "Hemen Başla" düğmesi /basla'ya
gidiyor (PageHero'nun ülke dalı, dokunulmadı); üst şeritteki düğme forma iniyor.

Ölçüm: tsc 0, eslint 0, css-check 47, serit-check 0; muhasebe, alt sayfa,
yeni iniş sayfası, /dubai 200; silinen /lp/dubai-muhasebe 404.

## 15.09.2026 · MARKETING REVİZESİ UYGULANDI (10 madde)

Burak: "4-5-7-8-9-11-12-13-14-19 konuları kesinlikle ele alınsın … kalan
konuları gündemde tutup açıkta tutalım murat abiye sorucam."

**Mevzuat taraması önce yapıldı** ve metinlerin hepsi ona dayanıyor:
`docs/bae-mevzuat.md` (15.09.2026, yalnız birincil kaynak: tax.gov.ae,
mof.gov.ae, u.ae, dmcc.ae; doğrulanamayanlar ayrı listede). 2024'te yazılmış
bir metnin yanlış söyleyeceği şeyler çıktı ve sitede öyle yazıldı: denetim
kararı MD 84/2025 (82/2023 değil), küçük işletme indirimi 31.12.2029'a
uzatıldı, KDV geç ödeme cezası 14.04.2026'dan beri yıllık %14, kurumlar
vergisi geç kayıt cezasının yedi ay içinde beyanla silinmesi, mainland LLC
için şirketler kanunu md. 27 denetçi şartı, e-fatura 2027 takvimi.

| # | madde | ne yapıldı | nerede |
|---|---|---|---|
| 4 | H1'de "Dubai muhasebe" | h1 "Dubai muhasebe hizmeti."; lisans cümlesi girişin başına geçti | accountingDubai.ts · hero |
| 5 | fiyat ilk ekranda | butonun yanında fiyat kutusu "Aylık başlangıç · KDV hariç / 350 USD'den / Fiyat kalemleri ↓"; tutar afterSetup'tan okunuyor | PageHero `price` propu (yeni, opt-in) · hero.css |
| 7 | "Şirketinizi bugün kuralım" | kapanış bandı sayfa başına başlık + düğme alabiliyor; muhasebede "Dubai şirketinizin muhasebesini birlikte yönetelim." + "Teklif isteyin" | Footer.tsx · `KapanisMetni`, FinalCta `kapanis` |
| 8 | muhasebeci değiştirme | #gecis: dört adım + devir için gerekenler, dayanak Vergi Usul md. 10/14/15 | AccountingSwitch |
| 9 | "Bana hangi hizmetler gerekiyor?" | #ihtiyac: dört soru (bölge · durum · ciro bandı · KDV), altı kalem gerekli / duruma bağlı / gerekmiyor, e-fatura notu, seçimler /basla'ya sorgu olarak gidiyor | AccountingNeeds · lib/muhasebeIhtiyac.ts |
| 11 | Murat Ortaç'ın uzmanlığı | alıntı bandının sağına künye kartı: baş harfler, sıfat, görev, tüzel kişilik, kurumsal geçmiş (hepsi depoda doğrulanmış) | AccountingQuote · accountingDubai.ts · expert |
| 12 | lisansın belgesi | kartta lisans no + otorite + resmî sicil bağlantısı ve FTA vergi ajanı no satırları HAZIR, veri gelince kendiliğinden çıkıyor; boşken basılmıyor | aynı yer |
| 13 | SSS genişlet | ekranda 3 → 8 soru, marketing'in beş sorusu dahil; JSON-LD de sekiz | accountingDubai.ts · faq |
| 14 | alt hizmet sayfaları | altı sayfa, fiyat listesinin altı kalemiyle birebir: defter-tutma, kdv-kaydi, kdv-beyannamesi, kurumlar-vergisi-kaydi, kurumlar-vergisi-beyannamesi, bagimsiz-denetim. Her birinde künye kartı, dayanaklı olgular, süreç, sizden/dahil, bedel, 3 SSS, kardeşler. Dolaşımda ve site haritasında; fiyat satırları ve bulucu bunlara bağlı | app/dubai/muhasebe/[alt] · lib/muhasebeAltHizmet.ts · css/svc-muhasebe-alt.css |
| 19 | reklam için kısa sayfa | ilk hâl `/lp/dubai-muhasebe` idi; ikinci geçişte **`/lp/dubai-sirket-kurulusu`** oldu (yukarıda) | app/lp/dubai-sirket-kurulusu · css/lp.css |

**Murat Ortaç'tan istenecekler (bu turun açtıkları):**
- `SWAP:MURAT_PHOTO` fotoğraf · `SWAP:MURAT_BIO` kısa deneyim cümlesi
- `SWAP:LICENCE_NO` lisans numarası + veren otorite (sicil bağlantısı buna göre seçilecek)
- `SWAP:TAX_AGENT` firma FTA'da kayıtlı vergi ajanıysa TAAN numarası
- alt sayfalardaki ve SSS'teki mevzuat cümlelerinin müşavir okuması (kaynaklı ama "müşavir okudu" onayı yok)
- `SWAP:LEAD_FORM` landing formunun gönderim adresi (madde 1-2-18 ile aynı karar)
- madde 10 gelirse landing'e yorum bölümü girecek (bugün bilerek yok)

**Ölçülenler:** tsc 0, eslint 0, css-check 47 (taban), serit-check 0; 11 adres
200 (muhasebe, 6 alt sayfa, landing, ana sayfa, hakkımızda, site haritası),
listede olmayan alt adres 404. 1440 ve 390 genişlikte ekran görüntüsüyle
bakıldı. Yeni renk çiftleri WCAG formülüyle ölçüldü; ihtiyaç bulucunun
rozetlerinde sitenin --green-600/--amber-600 çifti 3,89 ve 3,79 verdiği için
kullanılmadı (#17703f 5,48 · #8f5500 5,41). O iki çift sitenin başka
rozetlerinde hâlâ duruyor, ayrı iş.

## 15.09.2026 · MARKETING REVİZE LİSTESİ (ilk değerlendirme)

Kaynak: `ORTAÇ GLOBAL GELİŞTİRİLECEKLER - 14.09.2026.xlsx`, 20 madde, çoğu
muhasebe sayfası ve reklam altyapısı. Burak: bir kısmı demo aşamasından ya da
ana domaine taşınınca çözülecek şeyler, "çok kasma, genel incele". Her madde
koddaki bugünkü hâlle karşılaştırıldı; numaralar listedeki sıra.

**A · Bilgi beklemeden yapılabilir**

| # | madde | bugün kodda | aksiyon |
|---|---|---|---|
| 15 | Vercel adresi indexlenmesin | `robots.ts` her şeye açık, noindex yok; site haritası ve 17 sayfanın canonical'ı `ortacglobal.com`'u gösteriyor, orası hâlâ ESKİ site (200) | `.vercel.app` host'unda `X-Robots-Tag: noindex`; domain taşınınca kendiliğinden kalkar |
| 4 | H1'de "Dubai muhasebe" | H1 "Defterinizi kendi lisansımızla tutuyoruz."; "Dubai · Muhasebe" yalnız kırıntıda. Önceki turda müşteri kararıyla bu hâle geldi (accountingDubai.ts · hero notu) | H1 "Dubai muhasebe hizmeti", lisans cümlesi alt mesaj |
| 5 | fiyat ilk ekranda | hero'da fiyat yok, "Fiyatı kalem kalem aşağıda" diyor; sayfa 350 USD'yi afterSetup belgesinden basıyor | hero güven satırına "aylık 350 USD'den"; pricing.ts ile çelişki hâlâ açık |
| 6 | CTA'lar tek dil | hero "Teklif isteyin", takvim "Kendi durumumu sorayım", site geneli "Ücretsiz danışmanlık" | birincil "Muhasebe Teklifi Al", ikincil "WhatsApp'tan Sor" |
| 7 | "Şirketinizi bugün kuralım" | Footer.tsx'te site geneli tek metin | kapanış metni sayfaya göre değişsin |
| 3 | mobilde sabit WhatsApp | yok; numaralar offices.ts'te müşteriden gelmiş (Dubai +971, İngiltere +44) | mobil sabit buton |
| 16 | "yakında" menüler | ana sayfada 34 sönük "bu sayfa yakında yayında" bağlantısı | tek anahtarla gizleme (düzen bozulan yerler tek tek) |
| 8, 13 | muhasebeci değiştirme bölümü · SSS genişlet | yok · SSS ekranda 3 soru | taslak metin yazılır, Murat onayıyla yayına |
| 9, 19 | "Bana hangi hizmetler gerekiyor?" · reklam için kısa landing | yok | lab'de kurulur |

**B · Müşteriden/marketing'den bir şey bekliyor**

| # | madde | eksik |
|---|---|---|
| 1, 2 | iletişim formu çalışsın · muhasebeye kısa teklif formu | formu `SWAP:CONTACT_FORM` bilerek kapalı (uç nokta yok). Gerekli: başvuru nereye düşecek (e-posta adresi ve/veya CRM), e-posta servisi anahtarı. Satış akışının kayıt sorusuyla aynı altyapı |
| 17 | GA4, Google Ads, Meta Pixel, CAPI | ölçüm kodu hiç yok. Kimlikler (GA4 ID, Ads dönüşüm etiketleri, Pixel ID, CAPI token). İngiltere trafiği için çerez onayı gerekiyor |
| 18 | lead CRM'e, kaynağıyla | hangi CRM. UTM/gclid/fbclid formla birlikte saklanır |
| 10 | yorumlar ve vaka örnekleri | gerçek yorumlar/örnekler, uydurulamaz |
| 11, 12 | Murat'ın uzmanlığı · lisansın belgesi | sertifika adı/kurumu, deneyim cümlesi, lisans numarası ya da belge |
| 20 | WhatsApp'tan gelen Audit dosyası | dosyanın kendisi elimizde yok |

**C · Domain taşınınca / zamanla**

| # | madde | not |
|---|---|---|
| 15 (ikinci yarı) | canonical ve yönlendirmeler | eski sitenin adresleri çıkarılıp yeni adreslere 301 haritası |
| 14 | alt hizmetler ayrı sayfa (Bookkeeping, VAT, CT, Audit) | kurumlar vergisinin ülke başına üç adresi bu yolun ilk adımı |

## 13.09.2026 · SATIŞ AKIŞI DEMOSU · `/lab/satis-akisi` (Dubai)

Müşteri: *"önce ülke seçecek … şimdi Dubai üzerinden sadece şu an onu yapalım …
kaç tane vize istiyor, hangi paketi istiyor … bizim normal fiyatlar kısmındaki
gibi düşün … kişisel bilgileri doldurma kısmı gelecek … teklifi görecek. Sonra
onu onaylarlarsa [ödeme] tarafına geçecek."*

**Ne var:** iki giriş (boş açılan "Kurulumu Başlat" · dolu açılan "Hemen başla")
aynı pencereyi açıyor → **01 Ülke** (Dubai açık, İngiltere/KKTC "yakında") →
**02 Paket** (Basic/Gold/Platinium, faaliyet, vize sayacı, banka, muhasebe; sağda
canlı toplam) → **03 Bilgiler** (ad, soyad, e-posta, telefon) → **04 Teklif**
(logolu belge, "PDF olarak kaydet") → **05 Ödeme** (kart · havale + referans kodu)
→ tamam ekranı (sonrası TaxDome).

**Fiyatların kaynağı `lib/pricing.ts · configure()`** — ülke sayfasının fiyat
bölümünün kullandığı fonksiyonun ta kendisi; dosyaya dokunulmadı. Dosyanın kendi
kaydı rakamları SWAP sayıyor, teklifin altındaki "tahminîdir" ibaresi bu yüzden var.

**Uydurulmayan üç şey SWAP olarak ekranda:** teklifin geçerlilik süresi, havale
banka bilgisi, kişi bilgisi alanlarının kesin listesi.

**Hiçbir yere bağlı değil:** Stripe çağrısı yok, sunucu rotası yok, bilgi hiçbir
yere gitmiyor; pencere kapanınca siliniyor.

**Teknik kararlar:**
- Pencere yerleşik `<dialog>` + `showModal()`: odak tuzağı, Esc, üst katman
  tarayıcıdan; kütüphane yok. Gövdede `data-lenis-prevent` (yoksa Lenis tekerleği
  yutuyor).
- Pencere her açılışta yeni `key` ile kuruluyor → başlangıç değerleri
  `useState` başlatıcılarından; sıfırlama effect'le yapılmadı (lint:
  `react-hooks/set-state-in-effect`).
- **PDF:** yazdırma CSS'i yalnız teklifi basıyor. `printToPDF` ile ölçüldü: ilk
  yazımda `visibility:hidden` kullanılmıştı, gizlenenler yer kaplamaya devam
  ettiği için belge A4'ün ~%40 aşağısından başlıyor ve dipnot ikinci sayfaya
  taşıyordu. Şimdi pencerenin ata zinciri dışındaki her şey `display:none` —
  **tek temiz A4 sayfa**. Gerçek akışta PDF sunucuda üretilmeli (aynı dosya
  e-postayla gidecek).
- Ana düğme `--blue-900` (beyazla 7,14:1); sitenin `.btn-solid`'i --blue-700
  ile 3,99:1'de kaldığı için kullanılmadı. Özet paneli kâğıt zeminde, gece değil.
- Sürekli animasyon yok; yalnız durum değişiminde geçiş.

### Demo · ikinci geçiş (13.09.2026)

Müşteri: *"örnek pdf iyi duruyor bunu aynı şekilde aynı ölçüde önizleme gösteriyorsun
ya orda da aynı ölçü olsun … bide aşamalar çok mu bembeyaz oldu şu en üst kısmı
sekme barı gibi siyah mı yapsak? … bilgi girmesem de devam edebileceğim bi geçiş
koy, müşterime de öyle sunabileyim."*

| istek | yapılan |
|---|---|
| önizleme PDF ile aynı ölçüde | teklif ekranda da **gerçek A4** (210 × 297 mm, 14 mm iç kenar) kuruluyor ve yalnız ölçekleniyor (`A4Sayfa` · ResizeObserver); yazdırmada ölçek kalkıyor, `@page` kenarı 0. Önizleme ile PDF **aynı öğe** — yeniden dizilen satır yok. `printToPDF` ile tekrar ölçüldü: **1 sayfa, A4 (595 × 842 pt)**. Sayfa kâğıt zeminli bir "masa" alanında duruyor |
| üst kısım sekme çubuğu gibi siyah | başlık + adım şeridi `--night`; şimdiki adım beyaz sekme, geçilenler yeşil onaylı |
| bilgi girmeden geçiş | **sunum modu** (lab sayfasında anahtar, varsayılan açık): "Devam et" kilitlenmiyor, üstteki adımlar tıklanabilir sekme oluyor, hedef adımın ihtiyacı olan BOŞ değerler örnekle doluyor (Dubai · Gold · Yazılım · Ahmet Yılmaz · ahmet.yilmaz@ornek.com). Sunan kişinin girdiği değerlerin üstüne yazılmıyor |

### Giriş (login) sistemi gerekli mi? · önerilen cevap: ŞİMDİLİK HAYIR

Müşteri: *"bu teklif ödeme kayıtları için falan fistan bizim login sistemi mi
kurmamız lazım? … olmadan da yapabiliriz gibi geliyor."*

**Gerekçe:** ödemeden sonra müşterinin girişi zaten var — **TaxDome'un müşteri
paneli**. Sitede ikinci bir giriş, aynı işi yapan ikinci bir kapı olur ve yanında
parola sıfırlama, hesap güvenliği ve KVKK yükü getirir. Bu akışta kişinin sitede
"geri dönüp baktığı" tek şey kendi teklifi; onun için giriş değil **teklife özel,
imzalı bir bağlantı** yeter (e-postadaki "teklifinizi görüntüleyin" bağlantısı).

**Kayıt nerede tutulur:**

| ne | nerede | not |
|---|---|---|
| kart ödemesi | **Stripe** | ödeme, müşteri, makbuz Stripe panelinde; teklif no ve seçimler ödemenin ek bilgisinde |
| teklif (no, seçimler, kişi, tutar, durum) | **tek bir tablo** | sitede bugün veritabanı yok; akışın gerektirdiği tek yeni altyapı bu |
| havale eşleşmesi | aynı tablo | referans kodu → teklif; önce yarı elle (ekip ekstrede kodu görüp "ödendi" işaretler), otomatik eşleşme banka verisi gerektirir |
| sonrası | **TaxDome** | hesap açılışı, belgeler, süreç |

**Ne zaman giriş gerekir:** müşterinin sitede birden çok teklifini/geçmişini
görmesi, yenileme/abonelik yönetmesi ya da belge yüklemesi istenirse. Bu tarif
edilen işlerin hepsi bugün TaxDome'da.

**Doğrulanmadı, kontrol edilmeli:** Stripe'ın banka havalesi (otomatik eşleşen
sanal hesap) özelliği hesabın kurulduğu ülkeye ve para birimine bağlı. Ortac'ın
Stripe hesabının hangi ülkede açılacağına göre bu özellik varsa "otomatik eşleşme"
hazır gelir; yoksa kendi tablomuz + banka verisi gerekir.

**Önerilen sıra:** (1) demo ✓ → (2) teklif kaydı + sunucuda PDF + e-posta →
(3) Stripe ile kart ödemesi → (4) havale: referans kodu + yarı elle eşleşme →
(5) TaxDome'a devir (önce e-postayla).

---

## 13.09.2026 · SATIŞ AKIŞI BRİFİ (henüz kod yok) + muhasebe'de iki düzeltme

### Muhasebe · iki düzeltme (canlı)

| istek | ölçü | yapılan |
|---|---|---|
| "sizden gelen / size dönen içindekilerin yüksekliğini eşitle" | sol satırlar 34 px, sağdaki iki satırlı etiketler 45 px → paneller ikinci satırdan itibaren hizadan kayıyordu (2799 ↔ 2810) | her satır iki satırlık boy (`min-height: 2.8em`); dokuz satırın dokuzu 45 px, sol ve sağ 2753 / 2810 / 2867'de hizalı |
| "düzenli muhasebenin karşılığı çok büyük oldu, sitenin kalanıyla tutarlı ol" | başlık 22px/600, açıklama 16,5 px (bölüm lead'inin puntosu) | aynı sayfanın "Ne yapıyoruz" satırının ölçüsü: başlık **18px/700**, açıklama **14 px**, ikon 40 |

### Satış akışı · müşterinin sesli brifi (13.09.2026)

**Bu bölüm bir karar kaydı değil bir BRİF.** Kod yazılmadı; mesaj sonda yarıda
kesildi ve müşteri "neler alacağımızı teyit ederiz" dedi. Özet:

**İki giriş, tek arayüz.**
- Her yerdeki **"Kurulumu Başlat"** (navbar sağ üst vb.) → arayüz BOŞ açılır: ülke,
  paket, seçenekler kısaca seçilir. "Çok uzun istemiyorum."
- **Fiyatlar bölümündeki "Hemen başla"** (paket + vize sayısı vb. zaten seçilmiş,
  fiyat görülmüş) → AYNI arayüz, seçimler DOLU gelir; kullanıcı yalnız kontrol edip
  "devam et" der.
- Arayüz **sitenin içinde, sayfanın üstünde açılan bir pencere** (modal). Siteden
  çıkılmıyor.

**Adımlar.**
1. Seçimler (girişe göre boş ya da dolu).
2. Kişi bilgisi — ad, soyad, e-posta ve "birkaç şey" (**hangileri: teyit edilecek**).
3. **Resmî teklif**: sözleşme değil, otomatik hazırlanan tasarımlı bir **PDF** —
   ekranda gösterilir ve **indirilebilir**. İçinde: ad soyad, Ortac logosu, paketin
   içerdikleri, en altta fiyat. Bir onay adımı gibi.
4. "Hemen başla / ilerle" → **ödeme**, iki yol:
   - **Kart** (kredi / banka kartı) → **Stripe**.
   - **Havale** → kullanıcıya bir **referans kodu** verilir, açıklamaya yazar;
     gelen havale **otomatik eşleşen** bir sistemle tanınır.
5. Ödeme sonrası Stripe'ın e-postası gider; **oradan sonrası Murat Ortaç'ın
   ekibinde**: hesap açılır, kişi **TaxDome** paneline alınır; sözleşme, kimlik ve
   kalan belgeler TaxDome üzerinden yürür.

**Bugünkü karşılığı:** 27 canlı CTA `/basla`'ya gidiyor ve `/basla` bir taslak
(noindex). Bu akış o boşluğu dolduracak. Fiyatlar bölümünün yapılandırıcısı
(`PricingConfigurator.tsx`) zaten var.

**Müşteriden gereken / netleşmesi gereken:**
1. Kişi bilgisi alanları (ad, soyad, e-posta dışında neler; şirket adı? telefon?
   pasaport ülkesi?).
2. Stripe hesabı (Ortac adına) ve canlı/test anahtarları — **anahtarlar koda
   yazılmaz, Vercel ortam değişkenine müşteri ekler**.
3. Havale için banka hesabı bilgileri (ülke başına mı, tek hesap mı) ve "otomatik
   eşleşme"nin kaynağı: bankanın API'si / hesap hareketi dökümü / muhasebe yazılımı?
4. Teklif PDF'inin hukuki metni: geçerlilik süresi, KDV, iade/iptal koşulları.
5. Fiyatların kaynağı: teklif `pricing.ts`'ten mi üretilecek (dokunulmaz dosya),
   yoksa ayrı bir teklif tablosu mu? `afterSetup.ts` ile `pricing.ts` arasındaki
   bilinen fiyat çelişkisi (madde 6) teklif üretmeden önce çözülmeli.
6. TaxDome'a aktarım: e-postayla elle mi, yoksa TaxDome API'siyle otomatik mi?
7. Sipariş/teklif kaydı nerede tutulacak (şu an sitede veritabanı yok).

---

## 12.09.2026 · A2 ALTI ARACIN TAMAMINA UYGULANDI (yerel)

Müşteri: *"a2 ile devam et, kalan araçlara da uygula."*

**Zorunlu gece yan panel kalktı.** Yedi araç sayfasının hiçbirinde ikinci panel,
sağda duran gece sütun ya da `.ta-defter` yok (bütünlük denetimi bileşen kullanım
haritasıyla doğruladı).

### Dilin omurgası · yedi sayfada birebir aynı (1440 px'te ölçüldü)

künye 46 px · bayrak diski 42×28 · tezgâh 1120 px, dolgu 28/34/30, köşe 28 ·
kicker 13,5px/500 `--blue-900` · girdi kutusu 62 px, yazı 30px/600 · hazır çip
34 px · **koyu bant 1050 px, değer 40px/600** · sonuç kabı köşe 28 · kural kutusu
ikon diski 36 · h1 58px/700. Kontrast: eşiğin altında **sıfır** öğe. Taşma
390·768·1024·1440'ta **0**. Periyotlar 13007 · 17959 · 21013 — üçü asal, ikişerli asal.

### Zorlama var mı · asıl risk buydu

Beş ajan da doğru davrandı: `Surgu` (sayı ölçeği) yalnız kurumlar vergisinde,
`Bolusum`+`Satirlar` yalnız hesaplayıcılarda; `Hazirlar`ın etiketi işine göre
değişiyor ("Hazır tutarlar" / "Sık aranan iş türleri" / "Aynı sayılan üç yazım").
Üreteç altı parçayı hiç almamış ve her birinin gerekçesini dosya başına yazmış.
KKTC'de girdi, sürgü, çip, döküm — hiçbiri basılmıyor, sayfa 590 px ve dürüst.

**Tek gerçek zorlama yakalandı ve düzeltildi:** SIC'in "Başvuru defteri" tepsisi
ziyaretçi hiçbir şey yapmadan dört boş yuva basıyordu (1440'ta 160, 390'da ~215 px
boş mobilya, arama sonuçlarının üstünde, üstelik kendi animasyonuyla) ve adı tam
olarak müşterinin reddettiği kelimeydi. Blok artık **ilk kod eklenince** açılıyor,
adı "Seçtiğiniz kodlar".

### Bir kural ihlali ve kaynağı

Bütünlük ajanı halkanın periyodunu **18100 ms** ölçtü — `aktarim.css`'in geri
düşüş değeri. Sebep: dalganın şefi `.ta-kart`tı ve A2'den sonra hiçbir araçta
basılmıyor; şefsiz kalınca `--akt-tur` okunamıyor. Aynı sayfadaki kapanış CTA'sı
26000 ms → **OBEB 100**, yani tuzak K. Tezgâh şef yapıldı, periyot 17959 (asal).
**Dersi:** reddedilen bir tasarımın kodu ölü kalırsa yalnız yer kaplamıyor, sessiz
bir hataya da dönüşebiliyor.

### `/araclar` dizini AÇILDI

Bir turdur kapalıydı (B15: iç jargon basıyordu) ve o gerekçe bu tur ortadan kalktı:
sayfa yeniden yazıldı, metni ölçüldü — 3.863 karakterde tek bir `SWAP`, `.tsx`,
`lib/` ya da "planned" yok. Kapalı kalmasının bedeli de ölçülmüştü: yedi araç
sayfasının yedisi de tıklanamayan bir "Bütün araçlar" davetiyle bitiyordu.
Açmadan önce bir yanlış cümle düzeltildi: dizin girişi "hepsi tarayıcınızda
çalışıyor ve girdiğiniz bilgiyi bize göndermiyor" diyordu ve İngiltere isim
sorgulaması yazıldığından beri yanlıştı. Cümle artık defterden türüyor.

### Karar bekleyenler

1. **Koyu bandın sağ yarısı üç araçta boş** (KDV %24, SIC %38-42, İSİM %46 dolu;
   kurumlar vergisi ve üreteç %97). Üç ajan da uydurma gösterge koymaktansa boş
   bırakmayı seçti — doğru karar, ama yan yana "yarım kalmış" okunuyor.
2. **Beş araç sayfasında SSS yok** (yalnız kurumlar vergisinin üçünde var).
3. **Üreteçte künye bayrağı yok** (üç ülkeye birden hizmet ediyor; üç bayrak dipte).
4. **Kural kutusunun başlığı dört ayrı ad taşıyor** — dürüst ama tek tip değil.
5. **KKTC sayfası rakamsız**; oran yayımlama kararı müşteride.
6. **Companies House anahtarı** bekleniyor.

`/lab/arac-dili` kapandı ve silindi; labda tek tur kaldı (`/lab/ulke-ing-kktc`).

---

## 12.09.2026 · ARAÇ DÜZENİ GERİ ÇEVRİLDİ · üç yön (yerel)

Müşteri: *"tüm araçlarda sağ tarafa siyah alan koy onun içinde dönsün her şey gibi
bir şey demedimki sana amk ben. o biraz daha test formatına özgü bir tasarımdı. sen
sadece biraz ona paralel git dedim."*

**Hata neydi:** uygunluk testinin iki panelli kurgusu (solda beyaz çalışma paneli,
sağda gece "defter") altı aracın altısına birden uygulandı. Yanlış olan tasarımın
kendisi değil, TEK BİR FORMATIN HER ARACA ZORLANMASI — defter paneli on bir
soruluk bir testte anlamlı (cevap birikiyor, puan doluyor), tek kutuya sayı yazılan
bir hesaplayıcıda değil. Müşterinin gerçekten istedikleri duruyor: ikon, bayrak,
kontrast, dinamizm, "karman çorman" olmaması.

**`/lab/arac-dili`** · kurumlar vergisi üzerinde üç yön, üçünde de zorunlu gece yan
sütun yok:

| aday | tezi | ölçü |
|---|---|---|
| **A1 · Ölçü** | tek sütun tek akış; gece yüzey akışın dördüncü adımında tek yatay bant | sütun 758 px (testin soru sütunuyla aynı), bant 702×162, sayı 46px/700, yükseklik 1318 px |
| **A2 · Tezgâh** | doğru referans testte değil **sitenin kendi hesaplayıcısında** (`.txm-`, ülke sayfası); o dil araç ölçüsüne büyütüldü | panel dolgusu 20-28 → 28-34, kutu 50 → 62, rakam 22 → 30; kıyas "başka ülke" yerine "aynı kazancın iki dilimi" |
| **A3 · Kart** | sitenin kendi kart dili; hesap bir kartın içinde, sonuç kartın başında | en kısa aday (1343 px) |

A2'nin gerekçesi güçlü: müşteri bu aracı ilk isterken *"bi seçme şeyi olsun fln,
dubai şirket kuruluş sayfasındaki hesaplayıcı gibi fln"* demişti — yani referansı
zaten vermişti ve o referans test değil, sitenin kendi `.txm-` hesaplayıcısıydı.

A2 bir kontrast hatasını da büyütmedi: `.txm-kicker` `--blue-700`'ü 13,5 px'te
kullanıyor (beyazda **3,99:1**, eşiğin altında); adayda kicker `--blue-900`.

Periyotlar ölçüldü: 11317 · 13007 · 18773 — üçü de asal, ikişerli asal.

**Seçim yapılınca kalan beş araca uygulanacak.** Lab turu araç kodunu (ToolShell)
import ettiği için push EDİLEMEZ; araç commit'leriyle birlikte bekliyor.

---

## 12.09.2026 · MUHASEBE VE HAKKIMIZDA CANLIDA, ARAÇLAR YENİ DİLDE

Müşteri: *"muhasebe ve hakkımızda sayfalarını live alabilirsin kral."* ve araçlar
için: *"tasarımlar fena kötü kral biraz icondur, bayraktır, kontrasttır bir şeyler
ekle. mesela ülke uygunluk testimiz bence güzeldi… kurumlar vergisi hesaplayıcıya
tek tuşla girilsin evet ama içerden ülkeye göre ayrılsın ve link değişsin istiyorum.
google a hepsini ayrı ayrı indexlemek istiyorum… bide biraz daha dinamizm ekle."*

### Canlıya alınanlar (push edildi · `d7fa5f2`)

| sayfa | ne oldu |
|---|---|
| `/dubai/muhasebe` | lab kurgusunun (MD · K1 · F3) aynısı; sayfa 1245 → 283 satır, bölümler `components/services/AccountingSections.tsx`'e çıktı, `.lmh-` → `.svm-` |
| `/hakkimizda` | hero → Kim olduğumuz (fotoğrafıyla) → **Neye dayanarak çalışıyoruz** (Levha'nın beş satırı) → kalan; eski dayanak kartları bölümü çıktı |

**Lab'de CSS ile gizlenen şeyler canlıda kaynaktan çıktı** (takvimin 01-02-03
kayıtları, istatistik cümlesi): gizli kalan içerik ekran okuyucuya ve arama
motoruna görünür. FAQPage şeması artık ekrandaki üç soruyla birebir.
`AccountingVisuals.tsx` silindi (yetim, içinde yasaklı `useReducedMotion` vardı).
Lab yorumlarından gelen üç kontrast değeri ölçümle düzeltildi.

**İki lab turu kapandı ve silindi** (`/lab/muhasebe`, `/lab/hakkimizda-levha`).
Lab'de tek tur kaldı: `/lab/ulke-ing-kktc`.

### Araçlar (YEREL, push EDİLMEDİ)

Referans müşterinin beğendiği **uygunluk testi**: iki panelli tek kart — solda
beyaz çalışma paneli (numaralı ikonlu adımlar), sağda gece "defter" paneli
(bayrak, canlı sonuç, halka, çubuk). Altı araç aynı iskelete geçti; ölçüldü:
kart 1120 px · sütun 758+360 · köşe 28 · gece panel `#111` · sonuç 42px/700 ·
ikon diskleri 18/28/36/44 · **71 glifin 71'inde `strokeWidth` 1,9**.

"Karman çorman"ın kaynağı metin yığınıydı: alt notlar açılırlara indi.
"Dinamizm" sonucun kendisinde (sayı değişimi, dolan çubuk, aktarım ışığı
`taIsik` 12457 ms). Üç sürekli periyot ikişerli asal.

**Kurumlar vergisi ülke başına ayrıldı:** `/araclar/kurumlar-vergisi/{dubai,
ingiltere,kktc}` — her biri kendi `title`/`description`/`canonical`/FAQPage'iyle.
Ülke seçimi gerçek `<a>`, adres değişiyor. Menüdeki tek kart doğrudan `/dubai`'ye
(hop yok), `/araclar/kurumlar-vergisi` → 308. **`sitemap.ts` ve `robots.ts`
eklendi** (ikisi de yoktu).

**Bütünlük denetiminin yakaladıkları:** dört araç `<h1>`'i yarım cümleydi (on altı
canlı sayfanın on beşi nokta ile bitiyor) — nokta eklendi ve bir tuzak çıktı:
`PageHero` vurguyu `title.endsWith(accent)` ile buluyor, eşleşmezse mavi kuyruğu
**sessizce basmıyor**. `og:type` ailede ikiye bölünmüştü. Uygunluk testi sekiz
sayfanın tek kanoniksiziydi ve **iki adresten** basılıyor. Künye bayrağı üç araçta
vardı beşinde yoktu, aynı iş iki ayrı sınıfla çözülmüştü.

### Araçlarda karar bekleyenler

1. **Beş araç sayfasında SSS yok** (yalnız kurumlar vergisinin üç sayfasında var).
   "Google'a ayrı ayrı indexlemek" işinin en büyük eksiği; soru-cevap yazılıp
   müşavir onayından geçmeli, uydurulamaz.
2. **SIC'in "bilmeniz gereken üç şey" bloğu** ailenin en kalabalık yüzeyi; öteki
   araçlardaki tek satırlık "Uygulanan kural" kalıbına insin mi?
3. **SIC'teki sayaç** öteki yedi araçta "kaçıncı adım", orada "kaç kod seçildi".
4. **Kurumlar vergisi başlığı versal** ("Dubai Kurumlar Vergisi Hesaplama"), öteki
   yedi araç küçük harf — arama için bilerek mi?
5. **`/araclar` dizini kapalı** olduğu için sekiz sayfa da sönük bir "Bütün
   araçlar" bağlantısıyla bitiyor (B15: dizin iç jargon basıyor).
6. **KKTC sayfası** rakamsız; oran yayımlama kararı müşteride.
7. **Companies House anahtarı** hâlâ bekleniyor (isim sorgulama "henüz etkin
   değil" hâlinde).

---

## 11.09.2026 · SEÇİLENLER SAYFAYA GİRDİ, ÜÇ ARAÇ YAZILDI

### Müşterinin kararları

| konu | karar | sonuç |
|---|---|---|
| kapsam | "k1 yapabiliriz o iyi olmuş" | K1 `/lab/muhasebe`'ye girdi; K2, K3 ve `/lab/muhasebe-kapsam` silindi |
| karşılık | "seçmeli yapı gerek yok, f3 ile devam, %50 %50, yazı küçük" | F3 seçimsiz, **5+7** (metin lehine), başlık 15 → 22 px, açıklama 12,5 → 16,5 px; G1-G3 ve `/lab/muhasebe-fayda` silindi |
| takas | "çok kaba olmuş, sitedeki daha iyiydi, sadece küçüktü" | canlının oranları, ölçek ×1,3 (aşağıda) |
| hakkımızda | "kim olduğumuz görseliyle dursun, neye dayanarak onun altına" | `/lab/hakkimizda-levha` yeni sırada; bento turu silindi (yorum yok) |
| araçlar | "1-2-3'ü yapalım, ss attığım 3'lüyü yapalım, diğerlerini kaldır" | dört araç açık, menü altı karta indi, yedi kalem defterden çıktı |
| muhasebe kalanı | "okey" | dokunulmadı |

### Takas paneli · neden "kaba"ydı

Bir önceki turda yükseklik **satır arasından** gelmişti (8 → 40 px, beş kat) ve liste
`space-between` ile sütuna yayılıyordu; madde puntosu yalnız %11 büyümüş, ikonun glifi
hiç büyümemişti. Boşluk büyüdü, içerik büyümedi. Bu tur canlının oranları aynen,
ölçek ~×1,3: dolgu 18 → 24/26, ikon 26 → 34 (glif 15 → 18), satır arası 8 → 12,
madde 13,5 → 16, ortadaki çizim 96 → 124 px. Yükseklik 1440'ta **154 → 229 px**
(elenen hâl 304).

### F3 · neden tam yarı yarıya değil

6+6'da metin kutusu 492 px kalıyor, iki cümle iki satıra kırılıyor ve liste karttan
55 px uzuyordu. 5+7'de çizim yalnız %5 küçüldü; giden, çizimin yanındaki boş gece
alan (%30 dar). Metin sütunu 450 → 646 px. İstenirse 6+6 tek satırlık değişiklik.

### Hakkımızda · yeni sıra ve bir düzeltme

Sıra: canlı hero ("Ortac Global kimdir?") → canlı "Kim olduğumuz" (fotoğrafıyla) →
Levha'nın dayanak levhası → canlı kalan. Levha'nın kendi hero'su basılmıyor: lead'i
("Anlatmadan önce sayılabilir olanı sayıyoruz") levhanın hero'nun hemen altında
durduğu sıraya aitti. Levha bölümü canlı `<main>`'in dışında basılıyor; iki canlı
bölümün arasına CSS `order` + `display: contents` ile oturuyor (lab'e özgü; canlıya
geçişte bölümler bileşene ayrılacak).

**Ana oturumun yakaladığı tekrar:** "Bunun arkasında üç somut dayanak var…" cümlesi
hem canlı "Kim olduğumuz"un son paragrafında hem Levha'nın lead'inde, **713 px arayla**
iki kez görünüyordu. Levha'nın lead'i kapandı; canlıdaki kalıyor, çünkü artık bir
sonraki bölüme köprü.

### Araçlar

| araç | adres | ne |
|---|---|---|
| Kurumlar vergisi | `/araclar/kurumlar-vergisi` | Dubai · İngiltere · KKTC seçimi. İngiltere GOV.UK 2026 tablosundan (%19 · %25 · 50.000 · 250.000 · 3/200), HMRC'nin CTM03925 örneğini birebir veriyor (2.094 / 20.406). KKTC'de hesap yok, sitenin yayın kararı ekranda |
| BAE KDV | `/araclar/bae-kdv` | aynı kalıba getirildi (hazır tutarlar, numaralı adımlar) |
| İngiltere SIC kodu | `/araclar/ingiltere-sic-kodu` | 731 kod, Türkçe arama (98 eşleme, ONS notlarıyla doğrulandı), veri ayrı parçada (gzip ~10 KB, yalnız bu sayfaya iniyor) |
| İngiltere isim sorgulama | `/araclar/ingiltere-isim-sorgulama` | **deponun ilk sunucu rotası** (`/api/araclar/isim-sorgu`, POST). "Aynı sayılır" kuralı SI 2015/17 Ek 3'ten, 27 örnekle ve kısmen Companies House'un kendi denetleyicisine sorularak test edildi. Anahtar yoksa "henüz etkin değil" + kurumun kendi sayfası |

**Defterden çıkan yedi kalem:** kktc-serbest-liman · free-zone-mainland ·
golden-visa-uygunluk (planned) ve belge-listesi · yukumluluk-takvimi · oturum-sayaci ·
non-resident-uygunluk (yazılmıştı). Dört bileşen silindi (DocChecklist ·
ObligationCalendar · EntryCounter · UkNonResident). Müşteri "şimdilik" dedi: geri
istenirse silen commit `git log --diff-filter=D --oneline -- src/components/tools/UkNonResident.tsx`
ile bulunur, dosya `git show <hash>^:src/components/tools/UkNonResident.tsx` ile döner.

**Menü:** Kurumlar vergisi · BAE KDV · Uygunluk testi · İsim üreteci · İngiltere isim
sorgulama · İngiltere SIC. "Tüm araçlar" hâlâ sönük: `/araclar` dizini kapalı (B15).

**Gizlilik cümlesi araç başına oldu.** ToolShell eskiden her aracın altına "girdiğiniz
hiçbir bilgi bize gelmiyor" basıyordu; isim sorgulamada artık "Nereye gidiyor:"
satırı çıkıyor. İsim URL'de değil gövdede gidiyor, loglanmıyor; üreteçten sorguya
isim `#isim=` ile taşınıyor (# sonrası tarayıcıdan çıkmaz).

**Yolda düzelen iki ölü şey:** Dubai sayfasındaki "Detaylı hesapla" hiç var olmamış
`/araclar/vergi-hesaplayici`'ya gidiyordu, artık defterden okunuyor. `/araclar`'ın
açıklaması kaldırılan üç aracı sayıyordu.

### Müşteriden gerekenler (araçlar)

1. **Push onayı** — dört araç ve yeni menü canlıya çıksın mı?
2. **Companies House API anahtarı** (ücretsiz): developer.company-information.service.gov.uk
   → uygulama oluştur (ortam **live**) → "API key" → Vercel'de `COMPANIES_HOUSE_API_KEY`
   + yeniden dağıtım; yerelde `.env.local`.
3. İngiltere oranlarının müşavir teyidi (gelince `rates.ts`'te `confirmed: true`,
   turuncu kutu kendiliğinden kalkar).
4. KKTC'de sonraki adım `/basla` mı, KKTC ofisi mi.

### Tuzak U kaydedildi

Yerel sunucu bu tur boyunca Poppins'i hiç basmıyordu (font inmemiş, webpack önbelleği
yeniden başlatmada da tutuyordu). Bu turun ilk kareleri ve ajanların tipografi
ölçümlerinin çoğu sistem fontuyla alındı; F3'ün ajanı Poppins'i sayfaya enjekte ederek
ölçtü. Sunucu önbellek temizlenerek yeniden başlatıldı, raporun kareleri Poppins'le.
Ayrıntı `docs/tuzaklar.md` · U.

---

## 10.09.2026 · MUHASEBE, HAKKIMIZDA VE ARAÇ LİSTESİ

Müşterinin mesajı altı parçaydı; hepsi bu turda cevaplandı. Beş iş kolu paralel
yürüdü (her biri kendi dosya ad alanında, `globals.css` @import satırları ve
`turlar.ts` ana oturumda). **İlk açılışta beş ajan ağ hatasıyla düştü**
(ENOTFOUND); yalnız Levha bitmişti. Tur `resumeFromRunId` ile sürdürüldü, düşen
beşi baştan koştu, Levha önbellekten döndü. Ağaç o arada temizdi — düşen
ajanlar tek dosya yazmamıştı.

### Lab bugün (yeniden eskiye)

| rota | adaylar | müşterinin sorusu |
|---|---|---|
| `/lab/muhasebe-kapsam` | **K1** kalem kalem açılır · **K2** iki kademe · **K3** tek sahne | "sade gözüken ama meraklısının tıklayıp daha çok şey görebileceği" |
| `/lab/muhasebe-fayda` | **G1** Ray · **G2** Tek sahne · **G3** Omurga · F3 (başlangıç) | "sağdakilerin her birinde soldaki şey de değişebilir" |
| `/lab/hakkimizda-bento` | tek aday, 10 karo | "komple bentogrid mi yapsak" |
| `/lab/hakkimizda-levha` | **A** girişin tamamı · **B** yalnız açılış | "levha sitede nasıl durur görmem lazım" |
| `/lab/muhasebe` | sayfanın tamamı (MD) | dört düzeltme, aşağıda |
| `/lab/ulke-ing-kktc` | dokunulmadı | müşteri: "sonra gelicem, kafamı karıştırma" |

### /lab/muhasebe · dört düzeltme (ölçülerek)

| istek | yapılan | ölçü |
|---|---|---|
| "alıntıyı sola daya" | gece bant tam genişlik kaldı, içindeki `figure` sola | sol kenar 339,6 → **144,5 px** = kapsam kartlarıyla aynı piksel. Satır 53+48 karakter, 60-75 bandında |
| "sizden gelen size dönen beyaz üstünde iyiydi, büyüt" | gece geri alındı, beyaz + açık mavi | panel 1440'ta 268 → **304 px**. 1040 altında büyüme yok: tek ölçü kümesi 390'da paneli 931'e çıkarıyordu |
| "takvime animasyon ver" | rayın üstünden geçen sürekli ışık, **yeni keyframe yok** (rayın kendi `kmt-run`'ı) | periyot **22,037 s**, asal; `getAnimations()` ile sayfadaki 10 periyotla ikişerli asal |
| "akordiyonla arası çok uzak" | `.lmh-takvim .kmt-frame { margin-top: 18px }` | 48,0 → **18,0 px**; 18 çünkü kapsamdaki açılır da 18 px aşağıda |

**Dokunulmayan iki soru** (canlı bileşen, `AccountingHeroCard.tsx`): hero kartının
ikinci kelimesi "Beyan" mı "KDV" mi, alt cümlesindeki "Kapsamın tamamı aşağıda"
kalsın mı. Ajan tutarsızlık görmedi: lead "Aylık defter, KDV ve yıl sonu beyanı"
diyor, yani "beyan" iki beyanı kapsayan üst terim.

### /lab/muhasebe-kapsam · asıl bulgu

**"4 madde az" şikâyetine kalem UYDURULARAK cevap verilmedi.** Bugünkü dört karo
(Defter · KDV · Rapor · Arşiv) lab'in kendi kısaltmasıydı. Adaylar canlı verinin
`scope.phases` **beş aşamasını** kullanıyor ve bugün ekrana HİÇ basılmayan veriyi
açıyor: aşama ayrıntıları (1.249 karakter), sınırların gerekçeleri (799).

| | bugünkü lab | canlı | K1 | K2 | K3 |
|---|---|---|---|---|---|
| yüzeyde kelime | 31 | 80 | 62 | 70 | 155 |
| toplam kelime | 41 | 382 | 423 | 435 | 423 |

Yani üçü de **canlıdan dolu, canlıdan sakin**. "Yapmadıklarımız" ayrı liste
olmaktan çıktı, her sınır ait olduğu aşamanın içine gerekçesiyle girdi.
"Kurumlar vergisi kaydı" ve "KDV kaydı" sınır değildi (hizmet olarak yapılıyor,
aylık ücrete dahil değil) — ayrı yazıldı. K3 saf CSS (`radio` + `:has`).

**Açık soru:** takas panelinin 9 çipi adayların derinliğinde de geçiyor; aday
kazanırsa aynı 9 kelime iki bölümde görünür.

### /lab/muhasebe-fayda · ikinci tur

Birinci tur F1 ve F2 silindi (müşteri seçmedi), F3 sayfanın altında başlangıç
noktası. **Üç aday da sunucu bileşeni, sıfır JS** — radyo + `:has(:checked)`
kalıbı depoda dört yerde zaten çalışıyordu (ölçüldü). On bir yeni periyot,
site genelindeki 86 sürekli periyotla ikişerli asal.

Ajanın yakaladığı hata: G1'in duruş karesi boştu — gizli sekmede animasyon 0.
karede donunca (tuzak N) bölüm **boş gece panel** olarak duruyordu. Duruş karesi
animasyondan bağımsız hâle getirildi.

**Ana oturumun düzeltmesi:** adayların başlığı canlı verinin lead'ini basıyordu
("Dördü de bir vaat değil…"). O cümle /lab/muhasebe'de "kimsenin yöneltmediği
bir suçlamaya karşı savunma" gerekçesiyle silinmişti; adaylardan da kaldırıldı.

**Açık sorular:** G1'de tıklandıktan sonra ray bir daha kendiliğinden yürümüyor
(saf CSS'in sınırı; istenirse küçük istemci bileşeni). G2 telefonda yatay
kayıyor. G3 bölümün boyunu seçime göre değiştiriyor.

### /lab/hakkimizda-levha · Levha yerinde

**Kopyalama yok:** lab sayfası canlı `AboutPage`'i import edip olduğu gibi
basıyor, Levha'yla yer değiştiren bölümleri CSS'le kapatıyor. Bütün kapatma
kuralları `.lhl` / `.lhl-canli` kapsamında (doğrulandı: canlı `/hakkimizda`
hâlâ 10 bölüm).

**Turun asıl bulgusu: Levha yeni bölüm eklemiyor, var olan bölümü taşıyor.**
Levha'nın levhası canlı 4. bölümün ("Neye dayanarak çalışıyoruz") ta kendisi:
aynı `h2`, dört kartın üçünün cümlesi birebir. Tek başına dururken bu
görünmüyordu.

**Müşterinin asıl sorusu:** A okuması ekip fotoğrafını ve vizyon/misyonu
sayfadan çıkarıyor, B ikisini de tutuyor. Ayrıca Levha üç onaysız iddiayı
(30 yıl · IFZA · Murat Ortaç CA) sayfanın ortasından ilk ekranın altına çıkarıyor.

**Kalıcı yol önerisi** (canlı `page.tsx` yasak olduğu için yapılmadı):
`/hakkimizda` bölümleri `src/components/hakkimizda/` altına ayrı bileşenlere
çıkarılsın, lab sayfası CSS kapıları yerine bileşen listesini değiştirsin.

**Levha'nın kardeşleri silindi.** Sıra · Sahne · Manşet ve `/lab/hakkimizda-yon`
gitti; `AboutYon.tsx` 452 → 157 satır, `lab-habyon.css` 660 → 236 satır.
`.hyn-ed-p` Manşet'ten kaldı, Levha kullanıyor.

### /lab/hakkimizda-bento · önce ölçüm

Dokuz bölüm dokuz karo olmadı: her bölümün karakter, rakam ve doğrulanabilir
olgu sayısı ölçüldü, karo boyu ona göre verildi. 6 sütun × 6 sıra, 10 karo.
**Kimlik** (en büyük, gece) dayanaksız girişi künyeyle birleştiriyor; **30 yıl**
sayfanın tek büyük rakamı. **Tahtaya girmeyen ikisi:** vizyon+misyon (sıfır
olgu) ve temas (kanalların üçü SWAP) — tahtanın altında `--paper` zeminde.
Canlıya göre **%28 kısa** (7.154 → 5.125 px), `<section>` 10 → 3.

**Ana oturumun gördüğü zayıflık:** IFZA karosunda başlıkla alt cümle arasında
büyük boşluk kalıyor (karonun boyunu yanındaki 4 sütunluk ülke karosu
belirliyor). Ya logo büyümeli ya karo kısalmalı.

### ARAÇ LİSTESİ · müşterinin dokuz maddesi

Salt okunur değerlendirme (dosya yazılmadı). Ölçüt müşterinin kendi şikâyeti:
araç **sitenin sayfasını tekrar etmemeli**, ziyaretçiye siteyi okuyarak
öğrenemeyeceği bir şey söylemeli.

| sıra | araç | karar | önkoşul |
|---|---|---|---|
| 0 | **yazılmış altı aracın kilidi** | ÖNCE BU | 8 yazılmış aracın yalnız 2'sine siteden gidiliyor (`STATIC_LIVE`). Müşterinin "8'li" dediği menüdeki kartların 6'sı sönük |
| 1 | Kurumlar vergisi · ülke seçimli | YAP | BAE çalışıyor. İngiltere: marjinal indirim kesri + ilişkili şirket kuralı teyidi. **KKTC: yayın kararı** (site "oran yayımlamıyoruz" diyor) |
| 2 | İngiltere SIC kod bulucu | YAP · bugün yazılabilir | yok. Companies House CSV'si açık, **731 kod** (ana oturumda sayıldı; ajanın raporundaki 477 yanlıştı) |
| 3 | İngiltere şirket ismi sorgulama | YAP | Companies House API anahtarı (ücretsiz) + **deponun ilk sunucu rotası**: `ToolShell`'deki "girdiğiniz hiçbir bilgi bize gelmiyor" cümlesi değişir |
| 4 | Dubai kıdem tazminatı | sonra | müşavir: DIFC kapsamı, istifa indirimi |
| 5 | EORI sorgulama | 3'ün yanında | aynı sunucu rotası; HMRC ucu CORS kapalı |
| 6 | İngiltere maaş + temettü | en son | en pahalı ve en riskli; NI + İskoçya + hukuki "tavsiye değil" çerçevesi |
| — | Dubai şirket ismi sorgulama | **bu biçimde yapma** | programatik kaynak yok (üç uç ölçüldü: 403 / erişilemiyor). Yerine: "Dubai ticari isim kuralları ön kontrolü" |
| — | Marka tescil sorgulama | **yapma** | "bulunamadı" hukuken "tescil edilebilir" değil; Ortac marka vekili değil |
| — | mukellef.co'nun tamamı | **yapma** | sekiz aracın sekizi Türkiye vergisi (KDV, gelir, kira stopajı, kurumlar, geçici, damga, gümrük, gecikme zammı) — ana oturumda sayfa ayrıca çekilip doğrulandı |

**Site "sunucusuz" değil** (ajan düzeltti): `output: "export"` yok, Vercel Next
çalıştırıyor, sadece bugüne kadar hiç `route.ts` yazılmamış. Yani sunucu rotası
bir kısıt değil, alınmamış bir karar — ama gizlilik cümlesi yüzünden müşteriye
sorulacak bir karar.

### Kapılar

`tsc` 0 · `eslint` 0 · `css-check` 47 (taban değişmedi) · `serit-check` 0
(42 dosya) · 13 rota 200, `/olmayan` 404. Bu turda canlı sayfa DEĞİŞMEDİ:
lab/docs dışında dokunulan tek dosya `globals.css` ve farkı yalnız @import
satırları ile yorum.

**Ekran görüntüsü yolu değişti.** Tarayıcı paneli gizliyken (tuzak N) kareler
boş geliyor ve beş ajanın beşi de görüntü alamadı. Ana oturum CDP ile başsız
Chrome sürdü (paket yok, Node'un yerleşik `WebSocket`'i), bölümleri tek tek
kırptı; `FadeUp`'ın satır içi `opacity:0`'ı bir stil kuralıyla ezildi.

---

## 10.09.2026 · LAB TEMİZLİĞİ · on dört tur silindi

Müşteri: *"lab çok fazla doldu kafamı karıştırmaya başladı yeşil duran 50 tane
hakkımızda kısmı oldu kral kullanmadığımızı düşündüklerini full gönder ya zaten
beğensem söylerdim. bide onaylanıp bitenleri kaldırabilirsin mesela cta, kapanış
ve dizin, kapanış cta, muhasebe takvimi, zincir bölümü, hakkımızda sayfasının
tamamı."*

Altısını adıyla saydı ve **"mesela"** dedi. Aynı ölçüt listedeki her kırmızı
noktaya uyuyordu, o yüzden hepsi gitti. Yeşillerden dördü de: üçü hakkımızda
girişinin üst üste reddedilen turları, biri müşterinin hiç yorum yapmadığı
bölüm-açılışı turu.

| grup | turlar |
|---|---|
| kazananı canlıda (10) | `cta` · `cta2` · `footer` · `muhasebe-takvim` · `zincir` · `hero` · `hero-portal` · `otorite` · `hakkimizda-bento` · `hakkimizda-sayfa` |
| elendi (4) | `hakkimizda-giris` · `hakkimizda-serit` · `hakkimizda-acilis` · `bolum-basi` |

**Silinen:** 14 rota · 55 bileşen · 40 CSS dosyası · 40 `@import`.

**Önce canlıya dokunuyor mu diye ölçüldü**, iki ayrı kontrolle:
`components/lab`'ı lab dışından import eden tek dosya yok; silinen 40 CSS'in
bütün sınıf adları lab dışı TSX'lerde arandı. Beş dosyada isabet çıktı ve beşi
de kapsanmış seçiciydi (`.hnb-card.hx-card`, `.hnd-open .ab-open-ph`,
`.haa-nasil .h2`). `.h12` isabeti yorumdaydı: canlı hero kartının kendi ad
alanı `.dhs-`, lab kopyasıyla tek sınıf paylaşmıyor.

**Orphan çıkan iki dosya da gitti:** `ContactI6.tsx` + `lab-i6.css`.
`/lab/iletisim` rotası daha önce silinmişti, ikisi o turdan kalmıştı ve hiçbir
sayfadan bağlı değildi.

`globals.css`'te 121 satırlık on dört ayrı gerekçe bloğu tek KALDIRILDI kaydına
indi (41 satır). O bloklarda **kapanmamış bir yorum** da vardı
(`/lab/muhasebe-takas` kaydı `*/` almadan bir sonraki `/*`ye giriyordu, yani
altındaki `lab-tks4` kaydı da aynı yorumun içinde kalıyordu); temizlikle
düzeldi. Ölçüldü: dosyada 825 `/*` ve 825 `*/`.

**BÖLÜM AÇILIŞ ÖLÇÜMÜ TURLA BİRLİKTE GİTMESİN.** `/lab/bolum-basi` silindi ama
bulgusu turdan bağımsız olarak geçerli ve hâlâ açık bir sorun:
**51 `sec-head`'in 46'sı birebir aynı iskelet, `FadeUp` sayfa genelinde 345
kez basılıyor.** "Yapay zeka hissi" şikâyetinin ölçülen kaynağı bu — bölüm
kartlarının sayısı değil, her bölümün aynı ritimle açılması. Aynı kayıt
`globals.css`'in KALDIRILDI bloğunda da duruyor.

Kapılar: `tsc` 0 · `eslint` 0 · `css-check` 47 (taban değişmedi) ·
`serit-check` 0 (denetlenen dosya 78 → 38).

**KIRMIZI NOKTA ARTIK LİSTEDE YOK** ve bu bir kural değişikliği değil sonuç:
"canlıya alındı" durumundaki her tur bu temizlikte silindi. Bir tur kapandığında
yine kırmızıya döner, ama artık orada uzun süre beklemez — müşterinin şikâyeti
tam olarak biriken kapalı turlardı.

---

## 07.09.2026 · DÖRT LAB TURU PARALEL AÇILDI

Müşteri: *"bide genel geliştireceğin şeyler varsa aklıma henüz yatmayan, açık
kalan karar veremediğimiz özellikle hakkımızda kısmı gibi oraya agent aç
paralelde bir sürü tasarım dene."*

Dört tur aynı anda yürütüldü; her ajanın kendi dosyaları vardı, paylaşılan
üç dosyaya (`globals.css`, `turlar.ts`, `tuzaklar.md`) yalnız ben dokundum.

| tur | ne var |
|---|---|
| `/lab/muhasebe-fayda` | "Düzenli muhasebenin karşılığı" bölümüne üç yön: **F1 Bento** (iki kalem büyük ve çizimli, ikisi küçük ve yalnız yazı), **F2 Sahne** (kalem başına küçük sahne, sitenin kendi `.hx-card` reçetesiyle), **F3 Tek defter** (tek sebep solda büyük, dört sonuç ondan dallanıyor) |
| `/lab/ulke-ing-kktc` | İngiltere ve KKTC ülke sayfası, 11 → 14 bölüm. Dördü de **yazılmış ama hiç basılmayan** veriden kuruldu |
| `/lab/hakkimizda-yon` | Girişe dört yön: **Levha** (sayı önce), **Sıra** (düzyazı gitti, eksen kaldı), **Sahne** (tek büyük kart), **Manşet** (tek sütun, büyük tipografi) |
| `/lab/bolum-basi` | Bölüm açılışına üç alternatif: **Eşik**, **Sessiz**, **Künye**, artı bir `FadeUp` kuralı önerisi |

### İki ölçüm kayda değer

**Ülke sayfaları.** Doğrulandı: `/dubai` 14 başlık bloğu ve 1.861 kelime,
`/ingiltere` 11 ve 917, `/kktc` 11 ve 884. Yani iki ülke Dubai'nin yarısı
kadar. Ama eksik olanın büyük kısmı **veri değil, basılmayan veri**:
`steps[].line` yalnız `aria-label` içindeydi, `included`/`excluded` hiçbir
sayfada basılmıyordu, `tax.note` KKTC'de kenarlıklı BOŞ bir kutuya
düşüyordu. Aday bunların hepsini ekrana çıkardı, tek satır uydurma yok.

**Bölüm açılışı.** Denetimin "yapay zeka hissi" teşhisi doğrulandı ve
sezgiye ters: site "her bölüm 3 kart" tuzağına DÜŞMEMİŞ (çok sütunlu
ızgaraların %56'sı asimetrik). Düştüğü tuzak her bölümün AYNI RİTİMLE
AÇILMASI: 51 `.sec-head`'in 46'sı birebir aynı iskelet, `FadeUp` 345 kez.

Ajanın önerisi kayda geçiyor: **desenler birbirinin yerine geçen adaylar
değil bir repertuvar.** Tek deseni 46 yerde tekrarlamak bugünkü tekdüzeliği
başka kılıkta geri getirir.

### İki tuzak yakalandı

**Tuzak G-2 (yeni).** `<p aria-label="…">` + `aria-hidden` çocuklar yazıldı ve
etiket erişilebilirlik ağacına HİÇ çıkmadı: ARIA adı yazardan almayı
`paragraph` rolünde kabul etmiyor. Kural: bir şeyi gizlemek güvenilir, `aria`
ile göstermek değil. `docs/tuzaklar.md`'ye eklendi.

**Blok yorumu erken kapatan kalıp.** `eslint.config.mjs`'in yorumuna
gitignore kalıbı olduğu gibi yazıldı; kalıp yıldız-eğik çizgiyle bitiyor ve
o dizi yorumu kapatıyor, dosya sözdizimi hatası verdi. Uyarı dosyanın kendi
yorumuna yazıldı.

### Bu turda düzeltilen iki yapılandırma

- `eslint.config.mjs` yalnız `.next-build/**` göz ardı ediyordu; bir lab turu
  `.next-lab` üretince `npx eslint .` 228 sahte hata verdi. Kalıba çevrildi
  (`.next-*` öneki), `.gitignore`'un çoktan yaptığı şeyin aynısı.
- Bir ajan `tsconfig.json`'a `.next-lab/types` için satır eklemişti; **geri
  alındı.** `exclude` zaten `.next-*` taşıyor ve exclude, include'u süzüyor,
  yani satır hiçbir şey yapmıyordu. Üstelik o exclude kuralı hayalet
  hataları önlemek için bilerek konmuş.

---

## 07.09.2026 · TAM SİTE DENETİMİ VE İKİ LAB TURU

Müşteri: *"tüm siteyi aşırı detaylıca tara ve neleri geliştirebiliriz hepsini
tespit et ... hem tasarımcı, hem müşteri, hem markanın sahibi, hem pazarlamacı
vb gibi gözlerden ... özellikle dubai muhasebe kısmı fena ... bide hakkımızda
sayfasının giriş kısımları fln asla aklımıza oturmadı."*

**On ayrı denetim paralel yürütüldü** (muhasebe sayfası, hakkımızda, ana sayfa,
ülke/hizmet sayfaları, kaynaklar, dönüşüm sayfaları, global kabuk, metin ve
ton, SEO/teknik, görsel dil). Hepsi salt okunur; bulgular dosya:satır ile
bağlı.

### ORTAK TEŞHİS · site aynı birkaç olguyu farklı kaplarda tekrar ediyor

Bu tek cümle hem "karışık" hem "boş yapıyor" hem "yapay zeka gibi"
şikâyetlerinin kaynağı. Ölçüldü, ekranda basılan metin üzerinden:

| iddia | site geneli | en yoğun sayfa |
|---|---|---|
| "KKTC, İngiltere ve Dubai" listesi | 24 | /hakkimizda · **7** |
| "tek muhatap" | 20 | (çoğu global kabuk) |
| "IFZA" | 15 | /dubai · 4 |
| "aynı ekip / tek ekip" | 8 | /hakkimizda · 3 |
| "kendi ofisimiz" | 7 | /hakkimizda · **4** |
| "kişiye özel vergi görüşü vermiyoruz" | 4 | /dubai/muhasebe · 2 |
| "yıl sonu beyanı ayrı" | 4 | /dubai/muhasebe · **3** |

**Müşterinin işaret ettiği iki sayfa, tekrarın en yoğun olduğu iki sayfa.**
Tesadüf değil: tekrar, kanıt yokluğunu kapatmıyor, altını çiziyor.

Görsel tarafta aynı hastalığın karşılığı **başlık tekdüzeliği**: 51
`.sec-head` bloğunun **46'sı birebir aynı iskelet** (SplitWords h2 + son
kelimelerde mavi accent + 16,5px tek satır lead) ve `FadeUp` 81 dosyada
**345 kez** çağrılıyor. Site "her bölüm 3 kart" tuzağına düşmemiş (çok
sütunlu ızgaraların %56'sı asimetrik); düştüğü tuzak her bölümün aynı
ritimle AÇILMASI.

---

### LAB TURU 1 · `/lab/muhasebe` — Dubai muhasebe sayfası · ÜÇ TUR

**1. tur (MA · MB) teşhis yanlıştı.** Sıralamayı değiştiren iki aday yapıldı.
Müşteri: *"muhasebe sayfasında sorunum sıralama değilki, karışık ve çok text
olan bi sayfa olmasıydı ... insanlar okumuyor gözüyle tarıyor ve tararken bile
anlaması lazım."* Referansı da verdi: *"dubai şirket kuruluş sayfamızdan
mutluyuz."*

**REFERANS ÖLÇÜLDÜ VE SONUÇ SEZGİYE TERS:**

| | `/dubai` (beğenilen) | `/dubai/muhasebe` | MA (1. tur) | **MD (bugün)** |
|---|---|---|---|---|
| kelime | 1.985 | 1.675 | 2.253 | **992** |
| `<details>` | **1** | 17 | 22 | **5** |
| `<button>` | **73** | 17 | 14 | 7 |
| çizim (`<svg>`) | **160** | 88 | 52 | 50 |
| 140+ karakterlik paragraf | 10 | **19** | 20 | **7** |

**Beğenilen sayfa DAHA ÇOK kelime taşıyor.** Sorun hacim değil PARÇA BOYU:
`/dubai` içeriği çok sayıda küçük, görsel ve tıklanabilir parçaya bölüyor;
muhasebe az sayıda büyük düz yazı bloğu tutuyor ve yarısını akordiyona
saklıyor.

**2. tur (MC)** doğru eksendeydi ama **3. tur (MD)** müşterinin bölüm bölüm
brifiyle kuruldu. Kararlar, birebir:

| karar | müşterinin cümlesi |
|---|---|
| **Fiyat bölümü aynen kalsın** | "muhasebe hizmet bedeli kısmı güzel, burayı aynen koruyalım" |
| **Takas paneli mutlaka kalsın** | "şu sizden gelen size dönen kısmı var ya, orası muhakkak olsun, güzel çünkü baya" |
| **Kısa cevap + süreci yürüten ekip gitsin, birleşip giriş olsun** | "bu ikisinin birleşiminden bizim artılarımızı anlatan türden bir şeyle giriş yapabiliriz, 4 box olarak yan yana, biraz daha az yazı" |
| **Alıntı full genişlikte** | "sonra murat abinin alıntısını koyarız full genişlikte fln" |
| **Kapsamın 5 maddesi fazla** | "sağlı sollu neyi kapsıyor neyi kapsamıyor diye koyabiliriz ... senin labdaki 4 box gibi düşünerek" |
| **Takvim sadeleşsin** | "özellikle direkt girişindeki 1-2-3 kısmı çok göz yoruyor, bide ilk 12 ayda başlığının altındaki açıklama fln" |
| **Karşılık bölümü büyüsün** | "daha fazla alan ayırıp biraz daha göze çarpıcı şekilde yapabilirsin, burası önemli bir kısım bence" |
| **Kapanış kartları gitsin** | "hiç gerek yok valla, fazlalık göz sikiyor" |

**YENİ SIRA:** hero → artılarımız (4 karo) → Murat Ortaç alıntısı (tam genişlik
gece bant) → kapsam (solda 4 karo, sağda yapmadıklarımız) → takas paneli →
takvim (sade) → düzenli muhasebenin karşılığı (büyük) → fiyat (aynen) → SSS.

**Takvimin iki bloğu CSS ile basılmıyor, bileşen değiştirilmedi:**
`AccountingCalendar` canlı sayfada da kullanılıyor ve bu bir aday. Aday
kazanırsa iki blok bileşenden gerçekten çıkarılacak. İçerik silinmiyor,
bloga taşınıyor ("bazı detayların bokunu çıkarmayıp onları ayrıca sonra
bloglarda verebiliriz").

**ÖLÇÜLDÜ:** kelime %41, uzun paragraf %63, açılır blok %71 azaldı.
Telefonda 12,5 ekran → 10,4 ekran.

**DÖRDÜNCÜ TUR · müşterinin bölüm bölüm ikinci geçişi.**

| ne dedi | ne yapıldı |
|---|---|
| "sizden gelen size dönen kısmının bg yi siyah yapabiliriz ve buraya daha büyük bir alan ayırabiliriz yükseklikte olarak" | Bölüm gece zemine alındı, panel 204 → 268 px. **Yükseklik bölüm dolgusundan değil panelin kendisinden**: ilk denemede dolgu 150 px'ti ve panel siyah bir boşlukta küçük bir ada kalıyordu; dolgu 120'ye indi, satır arası 8 → 26, ikon kutusu 26 → 40 px oldu. Bileşene dokunulmadı. |
| "dahil değil diye başlık atıp bir sürü şey listelemek pek güzel durmuyor ... yaptıklarımız kısmını artırıp yapmadıklarımızı akordiyon şekilde alta bırakabiliriz" | Dört kart sayfanın tamamını alıyor (ikon 22 → 28 px kendi kutusunda, başlık 16 → 18, dolgu 22 → 28), sınır listesi tek satırlık bir açılıra indi. **Sınır kaybolmuyor:** kapalıyken bile "6 kalem" başlıkta yazıyor. |
| "biraz daha dinamik yapabiliriz" | Kart üstüne gelince 2 px yükseliyor, ikon kutusu maviye dönüyor. Hareket yalnız `hover: hover` içinde, dokunmatikte hiç doğmuyor ve `reduce` kapısı var. Sürekli dönen animasyon EKLENMEDİ: bu sayfanın periyot havuzu takvim şeridiyle zaten dolu (tuzak K). |
| "ilk 12 ayda diye başlayan cümlenin üstünde de çizgi kalmış onu kaldır" | `.kmt-act2`'nin kendi `border-top`'uydu ve perde 1'i perde 2'den ayırıyordu; perde 1 basılmayınca ayıracak bir şey kalmadı. Çizgi ve dolgusu birlikte kalktı. |
| "muhasebe hizmetinin bedeli kısmını şuan sitede live olanın tasarımıyla koy" | Bir önceki turda satırlar düzleştirilmişti; o karar geri alındı, canlı `.svm-prow` açılır düzeni birebir kullanılıyor. İki fark korundu ve ikisi de düzeltme: `unit` yalnız rozetten farklıysa basılıyor, ve rozet bu sayfaya ait. |

**Bir yanlış teşhis kayda geçiyor:** takas panelinde sağ sütunun altı maddesi
ezilmiş sanıldı ve `flex-basis` düzeltmesi yazıldı. Ölçüm yanlıştı: mevcut
tasarım 1040 px üstünde `.svm-swap-out ul`'u iki sütuna bölüyor
(svc-muhasebe.css:933), yani iki sütun da üç satır ve panel zaten dengeli.
CSS yorumu düzeltildi.

**ÖLÇÜM (bu tur sonunda):** kelime 1.675 → 1.150, 140+ karakterlik paragraf
19 → 11, açılır blok 17 → 12. Açılır blok sayısı bir önceki tura göre arttı
çünkü fiyat tasarımı müşterinin isteğiyle canlıya geri döndü.

**Yol boyunca kapanan bir çelişki:** fiyat satırlarının üçü "İlk yıl
toplamında" rozeti taşıyordu; o rozet `/dubai`'deki örnek hesaba işaret
ediyor, o hesap bu sayfada yok ve bölümün kendi cümlesi "tek bir toplam
yazmıyoruz" diyor. Rozet bu sayfanın sorusuna göre yeniden okundu ("Herkeste
doğuyor" / "Gerekli ise"); veri alanı değişmedi.

### LAB TURU 2 · `/lab/hakkimizda-acilis` — hakkımızda girişi

**Girişin neden oturmadığı ölçülebilir bir şey:** hero + açılış + vizyon/misyon
şeridinin toplam metni **786 karakter** ve içinde **tek bir sayı, tarih, isim
ya da adres yok.**

Üstüne:
- h1 bir SORU ("Ortac Global kimdir?") ve hemen altındaki bölüm başlığı aynı
  soruyu ikinci kez soruyor ("Kim olduğumuz"). Sitedeki öteki on dokuz
  hero'nun hepsi nokta ile biten bir cümle.
- Sayfanın gerçek cevabı, yani dört doğrulanabilir dayanak (kendi muhasebe
  lisansı, IFZA ortaklığı, üç ofis, 30 yıl), **beşinci ekranda**.
- Vizyon ve misyon girişin yükünü taşıyor ve taşıyamıyor: ikisi de ölçülemez
  ("bütün finansal ihtiyaç", "kapsamlı ve yenilikçi çözümler"). **Metinler
  firmanın resmî ifadesi, yeniden yazılamaz** (about.ts'in kendi kuralı), o
  yüzden adaylarda tek harfi değişmedi; değişen tek şey NEREDE durdukları.
- Girişin ortasında ölçülmüş ölü boşluk var: fotoğraf 4/3 sabitken yanındaki
  metin ~200 px kısa kalıyor ve `align-items: center` farkı ortadan ikiye
  bölüyor (deponun kendi kaydı, `AboutSeritKart.tsx:30-33`).

| aday | ne yapıyor |
|---|---|
| **HA1 · Dayanak** | Hero bir iddia. Dört dayanak beşinci ekrandan ikinciye çıkıyor ve 4 sütunlu kart ızgarası yerine asimetrik LİSTEYE dönüyor. Bugün boş olan `BASIS.lead` doluyor: açılış paragrafının ikinci cümlesi kanıtın önüne geçiyor. |
| **HA2 · İnsan** | Sayfadaki tek doğrulanmış insan girişte: fotoğraf, yönetici ortak ve künye tek panelde, eşit yükseklikte (ölü boşluk yok). |
| **bugün** | Karşılaştırma için aynı sayfada, aynı ölçekte basılıyor. |

**ÖLÇÜLDÜ:** bugünkü girişte 0 sayı, 0 isim, 0 unvan. HA1'de 1 sayı (30) +
Murat Ortaç + Certified Accountant. HA2'de aynı ikisi + künyenin dört dolu
satırı.

**KART DUVARI BİLEREK BÜYÜTÜLMEDİ.** /hakkimizda sitedeki tek yığılma noktası:
sayfanın alt yarısında altı ayrı 3'lü ızgara + bir 4'lü arka arkaya duruyor.
Girişe yedinci bir simetrik ızgara koymak sorunu büyütürdü; dayanak listesi
sitenin kendi asimetrik ray diline bağlandı.

**HA2'nin en zayıf noktası:** fotoğraf hâlâ yüzsüz bir yer tutucu
(`SWAP:TEAM_PHOTO`). Aday gerçek çekimle değerlendirilmeli. Künyenin yedi
satırının üçü de boş (`SWAP:FOUNDED` · `SWAP:LICENCE_NO` ·
`SWAP:OFFICE_ADDRESSES`) ve süzülüyorlar; **girişin ihtiyaç duyduğu somut
bilgi tam olarak o üçü.**

---

### DENETİMDEN ÇIKAN VE BU TURDA YAPILMAYANLAR

Hepsi dosya:satır ile doğrulandı. Sıra etkiye göre.

**A · Karar bekleyenler (tasarım/mimari, müşteri onayı gerekiyor)**

| # | konu | ölçüm |
|---|---|---|
| A1 | **`/basla` bir taslak ve sitenin BÜTÜN dönüşüm yolları oraya iniyor.** Nav CTA'sı, footer CTA'sı, hero düğmeleri, uygunluk testi sonucu ve `AskCta`'nın varsayılanı dahil 27 canlı giriş. Sayfada Nav/footer yok, ekranda "Kurulum akışı Faz 1'de inşa edilecek" yazıyor. | 27 giriş |
| A2 | **Ana sayfada `HomeServices` ve `Chain` aynı `CHAIN` dizisinden aynı beş satırı birebir basıyor**, aralarında iki bölüm var. Birleştirilirse sayfa bir bölüm ve ~1.100 px kısalıyor. | 5 satır × 2 |
| A3 | **`/ulke/*` kopya adresler.** `/dubai` ile `/ulke/dubai` aynı içeriği aynı `<title>` ile basıyor ve hiçbirinde canonical yok. 16 çift. | 32 adres |
| A4 | **Yazılmış altı araç sayfası dolaşımda yetim.** `/araclar` dizini de kapalı, yani menüdeki ve footer'daki üç "Tüm araçlar" çıkışı sönük. | 6 sayfa |
| A5 | **Menü + footer + kapanış: 74 bağlantının 39'u sönük (%53).** Footer'ın üç ülke sütununda 15 girdinin 13'ü. | %53 |
| A6 | **Bölüm başlığı tekdüzeliği**: 51 `.sec-head`'in 46'sı birebir aynı iskelet; `FadeUp` 345 kez. En güçlü "yapay zeka" sinyali. | 46/51 |
| A7 | **/hakkimizda kart duvarı**: alt yarıda altı 3'lü + bir 4'lü ızgara arka arkaya. | 7 ızgara |
| A8 | **Blogda 15 kaydın 14'ü yer tutucu**, hepsi iki adrese iniyor; `/gelismeler` 22 kaydın 22'si, `/e-kitaplar` 10 kaydın 10'u yer tutucu. Kaynaklar tarafında gerçeklik oranı %2,1. | 47 kayıtta 1 gerçek |
| A9 | **`/dubai` üzerinde aynı hizmet için iki farklı fiyat**: 7. bölüm "Yıllık muhasebe 2.100 USD", 10. bölüm "350 USD/ay = 4.200". `SWAP:AFTER_PRICING`. | 2 kat fark |
| A10 | **`/ulkeler`de İngiltere ve KKTC fiyatları `pricing.ts` ile uyuşmuyor** (%33 fark). | 2 ülke |

**B · Teknik borç (karar gerektirmiyor, ayrı tur işi)**

| # | konu | ölçüm |
|---|---|---|
| B1 | `sitemap.ts` ve `robots.ts` **hiç yok**; `metadataBase` yok, 14 dosyada `const SITE` elle tekrar. | 2 dosya |
| B2 | **Hiçbir sayfada OG görseli yok** (blog yazıları hariç). Her paylaşım boş kart. | ~34 sayfa |
| B3 | `canonical` eksik ~31 adres, `openGraph` eksik ~34 adres. | |
| B4 | **`FAQPage` şeması yalnız bir sayfada.** Ana sayfa, üç ülke sayfası ve /is-ortakligi'nde içerik hazır, işaretlenmemiş. | 5 sayfa |
| B5 | **GTM hiç yüklenmiyor** (`SWAP:GTM_ID`), yani 35 olay çağrısının tamamı sessizce düşüyor. Huni ölçülmüyor. | 35 olay |
| B6 | **Kontrast**: beyaz metin `--blue-700` üstünde 3,99:1 → `.onv-cta` (her sayfada) ve `.btn-solid`. Ayrıca `--blue-700` küçük metin olarak beyaz üstünde 54 kural, kehribar rozet çifti 10 kural (3,79:1), mavi rozet çifti 7 kural (3,50:1). | 70+ kural |
| B7 | **LCP JS'e bağımlı**: h1 ve navbar sunucudan `opacity:0` geliyor, hidrasyona kadar görünmüyor. | |
| B8 | **Ölü CSS ~9.577 satır (%12)**; `globals.css`'te tanımlı sınıfların %48'i kullanılmıyor. Lab CSS'i (39 `@import`) canlı pakete iniyor. | %12 |
| B9 | **Ölü bağımlılık**: `cobe` ve `framer-motion` (sıfır import; `motion/react` kullanılıyor). | 2 paket |
| B10 | **`animation-direction: alternate`** tuzak K ihlali, 3 canlı yer. 7 `@keyframes` adı iki kez tanımlı. | 10 yer |
| B11 | **Skip-link yok**, `aria-current="page"` hiç yok. | |
| B12 | **İkon çizgi kalınlığı**: kural 1,9 diyor, 302 kullanımın yalnız %13'ü uyuyor; 15 farklı kalınlık dolaşıyor. | %13 |
| B13 | **Boş `<p>` üç yerde ekranda sebepsiz çizgi/boşluk basıyor**: `BlogHub.tsx:590`, `basinda-biz/page.tsx:517` ve `:466`, `CountryTax.tsx:694` (KKTC'de kenarlıklı boş kutu). | 4 yer |
| B14 | **`countryContent.ts`'in %37'si hiçbir sayfada basılmıyor** (`included`, `excluded`, `clarify`, `watchouts`, `steps[].line`). 935 kelime. Müşteri ve mali müşavir yayımlanmayan metni onaylıyor. | 935 kelime |
| B15 | **`/araclar` iç karar defterini ekrana basıyor**: dosya adları, `SWAP:` jetonları ve "müşteri" kelimesi ziyaretçi anlamında değil Murat Ortaç anlamında. Sayfa bugün dolaşıma kapalı; açıldığı gün canlıya çıkar. | 4 cümle |

---

## 07.09.2026 · İSİM ÜRETECİ SİTE DOLAŞIMINA AÇILDI

Müşteri: *"isim üreteci kısmının erişimini aç siteden girebileyim oraya."*

**BULGU: araç canlıdaydı ama SİTEDEN GİDİLEMİYORDU.** Sayfa 200 dönüyor,
menüde kartı da duruyordu — ama sönük ve tıklanamaz (`SmartLink` +
`[data-soon]`). Ölçüldü: menünün Araçlar panelinde tıklanabilir tek şey
"Ülke uygunluk testi"ydi; ismi üreteci dahil yedi girdi sönüktü.

Sebep bir yazılım hatası değil, müşterinin kendi eski kararıydı
(`lib/routes.ts`): *"live olarak sadece uygunluk testi kalsın şimdilik."*

`lib/routes.ts` · `STATIC_LIVE`'a **tek satır** eklendi:
`"/araclar/isim-ureteci"`. Başka hiçbir yere dokunulmadı — menü, kartlar ve
footer bu listeden besleniyor.

**KAPSAM BİLEREK DAR.** `/araclar` dizini ve öteki beş araç (BAE kurumlar
vergisi, BAE KDV, belge listesi, yükümlülük takvimi, oturum sayacı) KAPALI
kaldı. Müşteri onları istemedi ve kendi kararını bizim genişletmemiz doğru
olmaz. Her biri istendiğinde tek satır.

Ölçüldü, açılış sonrası menü: tıklanabilir iki girdi (uygunluk testi + isim
üreteci), kalan altısı ve "Tüm araçlar" hâlâ sönük.

---

## 07.09.2026 · HERO BAŞLIĞI · ikinci tur, yedi aday

Müşteri: *"hiçbirinden emin olamadım başlıkların. en yakını yine a4 gibi ama
emin değilim biraz daha öneriyle gel."*

A4 = **"Şirketinizi kuruyor, işleyişini sürdürüyoruz."** İkinci tur onun
iskeletini koruyup İKİNCİ YARIYI değiştiriyor: fiil (sürdür / üstlen / yönet
/ takip et) ve nesne (işleyiş / süreç / muhasebe / yükümlülük).

Hepsi gerçek `<h1>`'e basılıp ölçüldü (masaüstü 72px/986px kap, telefon 34px):

| # | aday | mas. | tel. |
|---|---|---|---|
| — | (şimdiki) Şirketinizi kuruyor, sonrasındaki süreçleri yürütüyoruz. | 3 | 4 |
| A4 | Şirketinizi kuruyor, işleyişini sürdürüyoruz. | 2 | 3 |
| B1 | Şirketinizi kuruyor, işleyişini üstleniyoruz. | 2 | 3 |
| B2 | Şirketinizi kuruyor, süreçlerini yönetiyoruz. | 2 | 3 |
| B3 | Şirketinizi kuruyor, muhasebesini yürütüyoruz. | 2 | 3 |
| B4 | Şirketinizi kuruyor, yükümlülüklerini takip ediyoruz. | **3** | 3 |
| B5 | Şirketinizi kuruyor, işleyişini biz sürdürüyoruz. | 2 | 3 |
| B6 | Şirketiniz kurulur, işleyişi bizde kalır. | 2 | **2** |
| B7 | Şirketinizi kuruyor, çalışır hâlde tutuyoruz. | 2 | 3 |

B4 masaüstünde 3 satıra taşıyor, yani boy sorununu çözmüyor. Telefonda iki
satıra inen tek aday B6 (edilgen kuruluş).

### KARAR VERİLDİ · B2, bir düzeltmeyle

Müşteri: *"b2 iyi ya ama süreçlerinizi yönetiyoruz şeklinde yapsak olur mu."*

Canlıya alınan başlık:
**"Şirketinizi kuruyor, süreçlerinizi yönetiyoruz."** · vurgu: *süreçlerinizi
yönetiyoruz.*

Sahiplik eki değişti: "süreçlerini" şirkete, "süreçlerinizi" doğrudan okuyana
ait. İkincisi iki nesneyi de aynı kişiye bağlıyor (şirketiniz-i,
süreçleriniz-i) ve cümle paralel okunuyor. Satır sayısı değişmedi.

**BU BİR ÖNCEKİ METİN TURUYLA KISMEN ÇELİŞİYOR VE BİLEREK.** `metin-turu.md`
başlığın ilk hâlini ("Şirketinizi kurup **tüm süreçlerinizi yönetiyoruz**")
iki gerekçeyle değiştirmişti. Şimdi biri geri alındı, biri korundu:

- **"tüm" GERİ GELMEDİ.** İtirazın asıl konusu oydu: mutlakçıydı ve sitenin
  kendi çekinceleriyle çelişiyordu (banka onayı garantisi yok).
- **"yönetiyoruz" geri geldi.** Süreci kimin yürüttüğünü söylüyor, sonucu
  garanti etmiyor.
- Nesne "şirketiniz" değil "süreçleriniz": şirketi yönetmiyoruz, süreçlerini
  yönetiyoruz.

`metin-turu.md`'ye de not düşüldü, o belge artık canlıyı yanlış anlatmıyor.

**Ölçüldü:** masaüstünde 3 → **2** satır, telefonda 4 → **3** satır
(141px → 106px). Vurgunun basıldığı doğrulandı — `SplitWords` eşleşmezse
mavi kuyruğu sessizce hiç basmıyor.

---

## 05.09.2026 · KUTU KENARINDAKİ ŞERİT SİTE GENELİNDE KALKTI

Müşteri, iki ekran görüntüsü ve büyük harflerle: *"şu en solunda salak bi çizgi
var ya onu istemiyorum … BOXLARIN KENARINA FLN BUNU KOMPLE YASAKLIYORUM HİÇBİR
ŞEKİLDE BU SİTEDE GÖRMEYECEM."*

### Asıl bulgu: kural zaten vardı ve tutmadı

Bu yasak **ilk kez konmadı.** `docs/tuzaklar.md` kural 4 şunu yazıyordu:
"Kartlarda renkli ince sol/üst şerit yasak." Kural bir tur önce müşterinin ilk
uyarısıyla yazılmış ve `svc-muhasebe.css`'te uygulanmıştı (o dosyadaki
"KALDIRILDI · SOL KENARDAKİ RENKLİ ŞERİT" bloğu hâlâ duruyor).

Buna rağmen şerit **dört yerde daha yaşamaya devam etti** ve ikisi kural
yazıldıktan SONRA eklendi. Yani sorun kuralın yokluğu değil, kuralı kontrol
eden hiçbir şeyin olmamasıydı.

| yer | ne vardı | ne oldu |
|---|---|---|
| `.tl-out` (araç sonuç kutusu) | `border-left: 3px`, duruma göre yeşil/kehribar | şerit gitti, **çerçevenin tamamı** durum rengini alıyor |
| `.tl-warn` (araç uyarısı) | `border-inline-start: 3px` kehribar | şerit gitti, dört kenar 1 px kehribar |
| `.bp-quote` (blog alıntısı) | `border-left: 2px` mavi | şerit gitti, alıntı kendi zemini olan bir **kutu** oldu |
| `.sss-panel` (telefonda SSS paneli) | `border-left: 2px` mavi | şerit gitti, bağlılığı **girinti** söylüyor |

Hiçbirinde bilgi kaybolmadı; her birinde şeridin taşıdığı ayrım başka bir
taşıyıcıya geçti. Yerine yeni bir renkli vurgu KONMADI, o da aynı yasağın
başka bir kılığı olurdu.

### Artık bir kapısı var

`scripts/serit-check.mjs` yazıldı. Üç şeyi yakalıyor:

1. Kalın (>= 2px) sol/sağ kenarlık — dikey şerit, istisnasız.
2. Kalın üst/alt kenarlık, yalnızca kural aynı zamanda bir kutu kuruyorsa
   (`background` ya da `border-radius` da yazıyorsa).
3. `box-shadow: inset <kalın> 0 0` — şeridin kenarlık kullanmadan yapılan hâli.
   Bir tur önce tam olarak bu kullanılmıştı.

**Betik denendi, uydurulmadı.** Beş sahte kural eklenip çalıştırıldı: üç şerit
yakalandı, iki meşru kullanım (1 px ayraç, kutusuz üst çizgi) geçti. İlk
yazımda gölge deseni `px` birimini zorunlu tuttuğu için `inset 3px 0 0`
kaçıyordu; düzeltildi ve tekrar denendi.

**Ayraç yasak değil.** 1 piksellik çizgiler iki şeyin ARASINDA duruyor (tablo
hücresi, ızgara sütunu, liste öğesi); şerit bir şeyin KENARINA yapışıyor.
Betik ikisini ayırıyor. Bu ayrımdan geçen ve DOKUNULMAYAN yerler: `.uk3-tbl`
ve `.sxk-tbl` hücre ayraçları, `.uk2-panel` panel ayracı, `.uk2-fit2` sütun
ayracı, `.clr-item` liste ayracı, `.dcs-head` sütun başlığı altı.

**MÜŞTERİYE SORULACAK BİR SINIR VAR:** `.svs-step::before` (Dubai muhasebe
sayfası, adım listesi) kutuların DIŞINDA kendi oluğunda inen 2 piksellik bir
zaman çizelgesi rayı. Kutu kenarına yapışmadığı için betik onu yakalamıyor ve
elle de bırakıldı. Müşteri "o da gitsin" derse tek satır.

---

## 05.09.2026 · İSİM ÜRETECİ AŞAMALI AKIŞA GEÇTİ · alan adı sorgusu

Müşteri: *"anahtar kelimeyi yazdığımız an altta bişiler önermesin kral biz
oluştur fln diyelim, bide yine biraz aşama aşama ilerleyelim ya. anahtar
kelime, sektör, üslup, vb. bide üstüne başarabiliyorsak domain sorgulama vb
gibi şeyler ekleyebiliriz."*

**07.09.2026 · CANLIDA.** Bir tur boyunca bilerek push edilmemişti: alan adı
sorgusu sitedeki tek dış istek ve müşterinin görmeden onaylamasını istemedik.
Müşteri "isim üreteci kısmının erişimini aç siteden girebileyim oraya" deyince
`fea4120` + `b4c85be` push edildi. Aracın adresi değişmedi
(`/araclar/isim-ureteci`), menüdeki Araçlar panelinde ve `/araclar` dizininde
zaten duruyordu; canlıya çıkan şey aracın YENİ HÂLİ.

### Üç adım, ve sonuç düğmeye basılınca

Adaylar artık canlı girdilerden değil, düğmeye basıldığı anda dondurulan bir
anlık görüntüden (`uretim`) hesaplanıyor. Girdilerden biri değişirse liste
kayboluyor: sektörü değiştirmiş biri, artık üretilmemiş bir listeye bakıyor
olurdu.

Adımlar sırayla açılıyor ve **sektörün varsayılanı yok** — varsayılan olsaydı
ikinci adım hiç "yapılmamış" olmazdı, yani aşama diye bir şey kalmazdı.
"Henüz belli değil" ayrı bir seçenek.

### Sektör üretimi gerçekten değiştiriyor

Sekiz sektörün her biri iki listeyi birden değiştiriyor: iş sözcükleri ve
kökler. Ölçüldü — aynı kelime, farklı sektör:

| sektör | ilk üç aday |
|---|---|
| Yazılım | Atlas Labs · Atlas Systems · Atlas Technologies |
| Lojistik | Atlas Logistics · Atlas Shipping · Atlas Freight |
| Turizm | Atlas Travel · Atlas Journeys · Atlas Hospitality |

**Finans ve sigorta sektör olarak HİÇ SUNULMUYOR.** O sektörde üretilecek her
makul sözcük tescil otoritelerinin kısıtlı kelime listesine giriyor; araç o
kişiye yalnızca elenecek adaylar verirdi.

### Tur başına aday 9'dan 6'ya indi ve sebebi bir hata

Havuzlar 12 kelime. Turda 9 aday üretilince ikinci tur havuzun başına sarıyor
ve "Başka öneriler" AYNI adları farklı sırada gösteriyordu — ölçüldü, lojistik
+ kurumsalda ikinci turun dokuz adayının altısı birinci turda zaten vardı.
6, 12'yi tam bölüyor: iki tur, on iki ayrı ad, sıfır tekrar (ölçüldü,
kesişim boş). Havuz bitince düğme hiç basılmıyor, yerine ne yapılacağı yazıyor.

### Alan adı sorgusu · RDAP, ve kapsamı ÖLÇÜLDÜ

`lib/tools/alanadi.ts`. DNS sorgusu **kullanılmadı**: tescilli ama sunucuya
bağlanmamış alan adları DNS'te boş görünür, araç "boş" der ve kişi gidip
alamaz. RDAP tescil kaydının kendisini soruyor.

RDAP her uzantıda yok ve **olmayan uzantıda her sorgu 404 dönüyor**, yani
"kayıtsız" ile "veri yok" aynı cevabı veriyor. Bu yüzden her uzantı ikişer
denetimle ölçüldü:

| uzantı | pozitif kontrol | sonuç |
|---|---|---|
| `.com` `.net` `.org` | google.com/net/org → 200 | **kullanılıyor** |
| `.co.uk` | bbc.co.uk → 200 | **kullanılıyor** |
| `.ae` | etisalat.ae → **404** | dışarıda |
| `.io` `.co` `.com.tr` | google.io / google.co / trt.com.tr → **404** | dışarıda |

**`.ae`nin dışarıda kalması canımızı yakıyor** ve bilerek böyle: Dubai
müşterisinin en çok isteyeceği uzantı o, ama sorulsaydı HER ada "boş" derdik.

Üç önlem: sorgu kendiliğinden çalışmıyor (tek adayın düğmesine basılınca),
giden şey ekranda yazılı, bize hiçbir şey gelmiyor. 404 "alabilirsiniz" değil
"boş görünüyor" diye basılıyor.

**Tarayıcıda denendi:** atlassolutions → dört uzantıda da "kayıtlı";
qwzurganroute → dört uzantıda da "boş görünüyor". CORS açık.

### Yol boyunca düzeltilen iki şey

- **Sektör çipleri kelime ortasından kırılıyordu** ("Danışma / nlık ve
  hizmet"). Sebep: `.tl-form` iki sütunlu ve sektör ızgarası kartın %42'sine
  sıkışıyordu. Aşamalı akışta form tek sütuna indi, çip ızgarası kademeli
  oldu (760'ta 3, 1120'de 4 sütun). Dört genişlikte ölçüldü, kırılma yok.
- **Alan adı düğmesi telefonda 29 piksel**di, aracın kendi çipleri 49. Coarse
  işaretçide 44'e çıkarıldı, ölçüldü.

---

## 05.09.2026 · KURUMLAR VERGİSİ HESAPLAYICISI · iki seçim eklendi

Müşteri: *"kurumlar vergisi hesaplama kısmını biraz düzgün yap kral bi seçme
şeyi olsun fln dubai şirket kuruluş sayfasındaki hesaplayıcı gibi fln."*

Referans `CountryPricing` (`.ip-`): tek kutuya yazdırmıyor, seçim yaptırıyor.
Buraya iki seçim girdi ve **ikisi de yeni veri gerektirmiyor** — hesaba giren
her sayının kaynağı hâlâ `rates.ts`:

1. **Dönem.** Aylık seçilince girilen tutar 12 ile çarpılıyor. Çarpım ekranda
   yazıyor ("Aylık 50.000 × 12 = 600.000 AED") ve varsayım da yazıyor: on iki
   ayın eşit olduğu kabul ediliyor.
2. **Hazır tutarlar.** Boş bir kutu "ne yazsam" diye düşündürüp aracı hiç
   kullandırmıyordu. Çipler bir iddia değil, örnek girdi; hiçbiri "tipik"
   demiyor. Aralarında eşiğin kendisi (375.000) bilerek var — tek tıkla
   "eşiğe kadar sıfır" durumunu gösteren sayı o.

**Ölçüldü:** 375.000 yıllık → 0 AED, %0. Aylık 50.000 → 600.000 yıllık →
20.250 AED, efektif %3,38.

**Düzeltilen:** dönem seçimi ile kural kutusu ayrı ızgara hücrelerindeyken
solda 55 piksellik boş bant kalıyordu (sağdaki alan birinci satırı
yükseltiyor). `.tl-stack` sarmalayıcısıyla ikisi tek hücrede.

---

## 05.09.2026 · ANA SAYFA HERO BAŞLIĞI · beş aday, hiçbiri uygulanmadı

Müşteri: *"home sayfasının hero başlığında ne yazacağı üzerinde 5 tane daha
fikir üretelim ya bu tam içime sinemedi bide 3 satır yazıyor fazla gibi."*

Şu anki başlık: **"Şirketinizi kuruyor, sonrasındaki süreçleri yürütüyoruz."**
Ölçüldü: masaüstünde (72px, 986px kap) **3 satır**, telefonda **4 satır**.

| # | aday | masaüstü | telefon |
|---|---|---|---|
| A1 | Şirketiniz üç ülkede, muhatabınız tek. | 2 | **2** |
| A2 | Üç ülkede şirket kuruyor, sonrasını yürütüyoruz. | 2 | 3 |
| A3 | Kuruluştan muhasebeye, tek elden yürütülür. | 2 | 3 |
| A4 | Şirketinizi kuruyor, işleyişini sürdürüyoruz. | 2 | 3 |
| A5 | Kuruluş, banka ve muhasebe aynı ekipte. | 2 | 3 |

Beşi de masaüstünde 3 satırdan 2'ye iniyor; telefonda yalnızca A1 iki satır.
**Hiçbiri uygulanmadı, karar müşteride.**

---

## AÇIK KARARLAR · bu turdan çıkanlar

| konu | soru |
|---|---|
| `.svs-step::before` | Adım listesindeki dikey ray da gitsin mi? Kutu kenarında değil, kendi oluğunda. |
| Hero başlığı | A1-A5'ten biri mi, yoksa yeni tur mu? |
| Araçlar | Müşteri: "ben hala araçları tam beğenmiş değilim, onları ben tekrar bi araştıracağım." Yeni araç YAPILMIYOR, liste bekleniyor. |

---

## 05.09.2026 · YENİ ARAÇ CANLIDA · İngiltere'den şirket kurabilir misiniz?

Müşteri: *"sonra araçları yapalım herhangi bir onay almadan kendimiz
ilerleyebiliriz oluştururuz sonra üzerine konuşuruz en azından base atmış
oluruz."*

**Neden bu araç:** kayıt defteri onu zaten "sıradaki tur için en güçlü aday"
diye işaretlemişti (rakiplerde karşılığı yok).

**Engel aşıldı, uydurma yapılmadı.** Defterdeki gerekçe "gereklilik listesi
depoda yok" diyordu. Ölçüldü: liste ZATEN sitede yayınlı, yalnız dağınık.
Aracın bastığı her satır `countryContent.ts · ingiltere`'deki bir cümleden
geliyor — uzaktan kuruluş, istenen evrak, kayıtlı adres kalemi, yerleşik
olmayan ortakta banka onay oranı, PAYE bordro kaydı, oturum hakkı
doğurmaması, Companies House/HMRC gecikme cezası.

**Araçta TEK BİR SAYI YOK.** Ne oran, ne tutar, ne gün. İngiltere oranı hâlâ
`SWAP:UK_CT_RATE` ile teyitsiz; bu yüzden HESAPLAYICI değil GEREKLİLİK aracı
yazıldı. İki aracı ayıran çizgi tam burası — hesaplayıcı hâlâ sırada bekliyor.

**Yeni CSS yazılmadı.** Araç `.tl-` ad alanının mevcut sınıflarıyla kuruldu.

**Ölçülen davranış** (dört dal, iframe'de tıklanarak):

| durum | sonuç |
|---|---|
| varsayılan | 6 soru · 5 istenen belge · 3 uyarı |
| "adresim var" | kayıtlı adres satırı listeden düşüyor |
| maaş + oturum "evet" | "Direktör maaşı" ve "Oturum ve vize" uyarıları giriyor |
| "İngiltere'de yaşıyorum" | soru sayısı 1'e iniyor, kapsam dışı mesajı |

1440 ve 375'te: tek h1, yatay kaydırma yok, her fieldset'in legend'ı var,
etiketsiz radyo yok.

### MENÜYE KONMADI · karar bekliyor

Menünün Araçlar paneli `nav: true` araçları 4 sütunlu tek ızgaraya diziyor;
bugün orada tam **4x2 = 8 kart** var. Bu araç eklenirse dokuz oluyor ve son
satırda tek başına bir kart kalıyor — üç sütunluk kural da tanımlı değil
(yalnız 1, 2 ve 4).

Menü düzeni bir tur önce sadeleştirilip onaylandı; dokuzuncu kartı tek taraflı
eklemek o düzeni bozardı. Araç dolaşımda kayıp değil: `/araclar` dizininde
"Karar araçları" grubunda ve footer'daki "Tüm araçlar" üzerinden erişiliyor.
**Menüde de istenirse iş iki satır:** `nav: true` + `.onv-grid`'e üç sütunluk
kural.

### KALAN DÖRT ARAÇ HÂLÂ VERİ BEKLİYOR

| araç | eksik olan |
|---|---|
| İngiltere kurumlar vergisi | oran (`SWAP:UK_CT_RATE`) ve marjinal indirim eşiği |
| KKTC Serbest Liman vs LTD | site "KKTC için oran yayımlamıyoruz" diyor; çelişki müşteriyle çözülür |
| Free Zone vs Mainland | `pricing.ts` ↔ `afterSetup.ts` fiyat çelişkisi (`SWAP:AFTER_PRICING`) |
| Golden Visa uygunluk | yatırım tutarı, maaş ve meslek listeleri depoda yok |

---

## 05.09.2026 · ONAY BEKLERKEN · 404, HATA SAYFASI VE ÖLÜ KOD

Müşteri: *"onay bekelemden ilerletebileceğimiz ne var... 2 ve 3'ü yap sonra
araçları yapalım."* Onay gerektirmeyen iki iş yapıldı.

### 1 · 404 ve hata sayfaları · yumuşak-404 kapatıldı

`app/[...yapim]` yakalayıcısı sayfası olmayan her üst düzey adresi yakalıyor,
geliştirici metni basıyor ve **HTTP 200** dönüyordu (`noindex` de yoktu). Yani
arama motoru sonsuz sayıda ölü adresi geçerli sayfa sayabilirdi. Yakalayıcı
kaldırıldı; `not-found.tsx` ve `error.tsx` sitenin kendi diliyle yazıldı.

Ölçüldü: `/olmayan` 200 → **404**. Ayrıntı ve gerekçeler `b556ae8` commit'inde.

### 2 · Ölü kod · 34 → 27 dosya

Toplu silme YAPILMADI. Her dosya için sınama: **adı depoda başka bir yerde
(yorumda ya da belgede) geçiyor mu?**

| durum | sayı | karar |
|---|---|---|
| lab kaydı | 3 | dokunulmadı |
| bir karar kaydında anılıyor | 22 | dokunulmadı |
| hiçbir yerde anılmıyor | 9 | ikisi hariç silindi |

Silinen yedisi eski görsel yardımcılar: `AuroraPanel` · `DubaiSkyline` ·
`FloatCard` · `GhostButton` · `OpsScenes` · `RuleDraw` · `WhyScenes`. Yanlarında
kodda karşılığı kalmayan 33 CSS sınıfı (~420 satır) da gitti.

**Neden 22 dosya duruyor:** `page.tsx` bunları "Bileşen duruyor, akıştan çıktı"
diye yazılı olarak parkta tutuyor (PaymentInfra, Stance, ToolsResources,
PartnerBand, ProofBand) ya da bekleyen bir karara bağlılar (Calculator,
Packages, PricingConfigurator, HeroWizard — dördü de `/basla` kararını
bekliyor). Silmek depo yazılı kararlarıyla çelişirdi.

### KARAR BEKLEYEN İKİ DOSYA

Bu ikisi hiçbir yerde anılmıyor **ama her biri canlı bir müşteri görevi
taşıyor**; silmek görevi sessizce düşürürdü:

- **`components/PartnerMarquee.tsx`** — `SWAP:PARTNER_LOGOS` (beş tek renkli
  ortak SVG'si). Dosyanın kendi başlığı zaten "ÖLÜ DOSYA" diyor. Logolar
  başka bir yerde yaşayan şeride girdiyse dosya da görev de kapanabilir.
- **`components/Repatriation.tsx`** — `SWAP:REPATRIATION_COPY`. Bu bir yardımcı
  değil, hiç bağlanmamış **tam bir bölüm** (kâr transferi anlatımı). Silmek
  yazılmış bir özelliği atmak olur.

---

## 22.08.2026 · ÜLKE BÖLÜMÜ DEĞİŞİKLİĞİ GERİ ALINDI · KARAR BEKLİYOR

Müşteri: *"direkt vercele push edilmiş bu tablo değişikliği. sen bir önceki
versiyona çekebiliyor musun yoksa eski haline geri mi alsak. tam emin olmadığımız
bir revizeymiş çünkü."*

**Kod eski hâline alındı.** `ThreeCountries.tsx` ve `countries.css`, `3879999`
öncesindeki hâllerine döndü: bölüm yine iki görünümlü (Ülke ülke / Yan yana
kıyas), başlık yine "Hizmet verdiğimiz ülkeler."

**SİLİNMEDİ, PARK EDİLDİ.** Değişiklik `3879999` commit'inde duruyor ve geri
getirmek tek satır:

```
git checkout 3879999 -- src/components/home/ThreeCountries.tsx src/app/css/countries.css
```

**İki yarısı ayrılabilir.** Revizyon aslında iki ayrı iş taşıyordu ve müşterinin
tereddüdü büyük ihtimalle ikincisiydi:
1. başlığa "karşılaştırma" eklemek (küçük, tek satır),
2. "ülke ülke" görünümünü tamamen kaldırmak (büyük, 720 satır kod).
İlki tek başına istenirse ikincisine dokunmadan uygulanabilir.

**Metin turunun 88 düzeltmesi ETKİLENMEDİ** — ayrı commit (`49d349c`), geri
alma yalnız iki kaynak dosyayı kapsadı. Doğrulandı: hero, SSS ve iletişim
metinleri yeni hâlleriyle duruyor.

**Vercel notu düzeltildi** (yukarıda): deploy elle değil, otomatik. Bundan
sonra karar bekleyen iş `main`'e push edilmeden önce sorulacak.

---

## 22.08.2026 · ANA SAYFADAKİ ÜLKE BÖLÜMÜ TEK GÖRÜNÜME İNDİ

Müşteri: *"Burada ülkeler yazısının yanına karşılaştırma yazalım ve sadece bu
tabloyu verelim."*

**Başlık:** "Hizmet verdiğimiz ülkeler." → **"Hizmet verdiğimiz ülkeler ve
karşılaştırması."** Giriş cümlesi de iki görünümden söz etmeyi bıraktı.

**Bölüm iki görünümlüydü, biri kaldı.** Üstteki sekme değiştirici (Ülke ülke /
Yan yana kıyas) ve "ülke ülke" görünümünün tamamı (üç diskli yay sahnesi,
açılır ülke panelleri, para grupları) kaldırıldı; yalnız kıyas tablosu kaldı.

**Kaybolan bağlantı yok.** İki görünüm de aynı üç ülke sayfasına bağlanıyordu;
ölçüldü, tablo da aynı hedefleri taşıyor. Ayaktaki /ulkeler çıkışı duruyor.

**#odeme-altyapisi çapası korundu** — ana sayfa SSS'i ve menü oraya bağlanıyor.
Çapayla gelen ziyaretçiye kıyas görünümünü açan `hashchange` dinleyicisi
kalktı: seçilecek görünüm kalmadı, tarayıcının kendi kaydırması yetiyor.

**Sekme kalıbı da kalktı.** Kalan panelde artık `role="tabpanel"` ve `hidden`
yok: tek panel varken sekme kalıbı erişilebilirlik ağacında olmayan bir seçim
vaat ederdi.

### Ne kadar kod gitti

| | önce | sonra |
|---|---|---|
| `ThreeCountries.tsx` | 1131 satır | 411 satır |
| `countries.css` | 1586 satır | ~935 satır |

Silinenler tek tek lint ile doğrulandı: yay geometrisi (`BAND`, `arcY`,
`ARC_ROWS`), `FEATS` / `brief` / `money`, `costWord`, `open` durumu,
`switchView`, `onSegKey`, dört `ref`, giriş varyantları ve on beş kullanılmayan
import. CSS tarafında 28 ölü `.uk3-` sınıfı kalktı; taramada ölü sınıf kalmadı.

### Yol üstünde iki hata yaptım, ikisini de yakaladım

1. **Toplu CSS silmem bir `@media (hover: hover)` bloğunu açık bıraktı.**
   Kural ayrıştırıcım, bir medya bloğunun içindeki TEK kural ölüyse kuralı
   kapanış süslü parantezinin bağlamıyla birlikte yiyordu. Belirti sayfanın
   500 vermesiydi; süslü parantez dengesi sayılarak bulundu (92 açık / 91
   kapalı). Bundan sonrası için: CSS toplu silmeden sonra **her dosyada
   `{` ve `}` sayısı eşit mi** diye bakmak tek satırlık bir sınama ve bu turda
   hatayı doğrudan gösterdi.

2. **Düzeltmeden sonra sayfa hâlâ 500 veriyordu ve bu YANILTICIYDI.** Dosya
   artık geçerliydi; hata dev sunucusunun bayat derlemesinden geliyordu
   (tuzak O'nun bir başka yüzü). `touch` ile yeniden derleme zorlanınca 200'e
   döndü. Yani "düzelttim ama hâlâ bozuk" görüntüsüne inanmadan önce
   derlemeyi tazelemek gerekiyor.

Kapılar: tsc 0 · lint 0 · css-check 47 · sekiz rota 200 · tablo 8 satır ×
4 sütun · yatay taşma 0.

---

## 22.08.2026 · METİN TURU · KONUŞMA DİLİNDEN KURUMSAL DİLE

Müşteri iki ayrı kanaldan aynı şeyi söyledi: *"yazı dili kötü çok samimi komple
değişmesi lazım · mahalle ağzı :)"* ve *"ANA sayfanın girişi fazla esnaf ağzı
oldu... çok konuşma dili yazıyorsunuz biraz daha kurumsal olmalı."*

**TAM RAPOR AYRI BELGEDE: `docs/metin-turu.md`.** Seksen sekiz düzeltmenin her
biri için "önce / sonra / neden" satır satır orada. Burada yalnız özet var.

**Tarama göz kararı değil.** Kaynaklardan yorumlar ayıklanıp ekrana çıkan bütün
Türkçe metinler çıkarıldı (1.626 benzersiz metin · ~13.800 kelime · 120 dosya),
sonra konuşma dili işaretlerine göre tarandı ve adaylar tek tek okundu.

**Yedi kural:** emir kipiyle okura seslenme (buton ve form hariç) · istek kipi
bildirim kipine · "şey" yerine ne kastedildiği · deyim ve mecaz · bölüm başlığı
soru olmaz (SSS soruları kalır) · dolgu sözcükleri · doğrulanamayan iddia.

**Dokunulmayanlar:** SSS soruları, buton/form talimatları, ayırt edici olgusal
iddialar ("defter ve beyan taşerona gitmiyor"), hukuki çekinceler.

### Turun içinden çıkan dört ayrı bulgu

1. **İç jargon ekrandaydı.** /araclar'da "Huninin en tepesi: arama sonuçlarından
   gelen kişi buraya iniyor" yazıyordu. Pazarlama defterinin dili, ziyaretçiye
   söylenecek cümle değil.
2. **"Ücretsiz danışmanlık" dört yerden çıktı.** Üslup değil olgu sorunu:
   ücretsiz olduğu sitenin hiçbir yerinde yazılı değil. Kapanış CTA'sından bir
   önceki turda aynı gerekçeyle çıkmıştı; hero, ülke SSS'i ve hesaplayıcıda
   kalmıştı.
3. **Rakip hakkında doğrulanamaz iddia üç kopyadan da silindi.** "Kategorideki
   firmaların çoğu ilk halkada bitiyor" ana sayfada iki, iş ortaklığında bir
   yerde geçiyordu. Aynı bilgi kendi yükümlülüğümüz olarak yazıldı.
4. **İki kırığı kendim açtım ve kendim yakaladım.** Başlığı değiştirip yanındaki
   `accent` değerini güncellemeyi iki yerde unuttum (`sectors.ts`,
   `/e-kitaplar`). İkisi de HATA VERMEYEN türden: vurgu bulunamayınca sessizce
   vurgusuz basılıyor. Otuz iki başlık/vurgu çiftini tarayan bir sınamayla
   bulundu; sınama artık sıfır uyumsuzluk veriyor ve bir sonraki metin turunda
   ilk çalıştırılacak şey o.

**İki düzeltme bugün ekranda görünmüyor:** `Stance` ve `ToolsResources` önceki
turlarda ana sayfadan çıkarılmış, hiçbir rotadan erişilmiyor (ölü kod
taramasında ikisi de listede). Metinleri yine de düzeltildi ki geri gelirlerse
eski dille dönmesinler.

Kapılar: tsc 0 · lint 0 · css-check 47 · on sekiz rota 200 · 32/32 başlık-vurgu
çifti uyumlu.

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

| rota | ne | soru |
|---|---|---|
| `/lab/muhasebe` | sayfanın tamamı: MD + K1 + F3 | müşteri "kalanı okey" dedi; canlıya alınsın mı |
| `/lab/hakkimizda-levha` | canlı sayfa + Levha'nın dayanak levhası | yeni sıra tamam mı; canlıya geçiş bölümleri bileşene ayırmayı gerektiriyor |
| `/lab/ulke-ing-kktc` | YÖN | müşteri "sonra" dedi; veri bekliyor |

Bu tablonun bir önceki hâli kapanmış turların kaydını da tutuyordu (`cta2`'nin
K3 sahne düzeni, hakkımızda şeridinin dört turu). O turların hepsi 10.09.2026
temizliğinde silindi. **K3'ün D1/D2/D3 değişmezleri kaybolmadı:** canlı kodda
yaşıyorlar (`css/kapanis-cta.css` · `components/CtaSahne.tsx`), tablonun eski
hâli git'te (`dd4bcce` öncesi).

Kapanmış turlar `/lab` indeksinde kırmızı noktayla durur; ama artık orada uzun
süre beklemez (bkz. LAB TEMİZLİĞİ).

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
