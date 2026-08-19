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

## Son durum · 19.08.2026 · `bde0ac2`

Çalışma ağacı temiz, dal `origin/main` ile eşit.
**Vercel deploy'u ELLE**: push otomatik yayına almıyor, panelden Redeploy gerekiyor.

### Son altı tur

| commit | tur |
|---|---|
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
| `/lab/hakkimizda-giris` | Ocak · Fitil · Yaprak | Hero'dan vizyon-misyonun sonuna kadar olan şerit nasıl kurulsun (Kanat ve Levha ex) |
| `/lab/muhasebe-takvim` | MT13 · MT14 · MT16 · MT15 | MT16 = MT14'ün üç kaydı yan yana koyan türevi; MT10 ve MT11 altta referans |

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
