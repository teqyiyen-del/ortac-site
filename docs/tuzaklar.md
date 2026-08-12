# Bu depoda gerçekten patlamış tuzaklar

Bu dosya bir ajan brifinin parçasıdır. Ortac sitesinde iş yapmadan önce oku;
aşağıdaki maddelerin **her biri** bu depoda en az bir kez gerçek bir hataya yol açtı.

Neden ayrı dosya: bu liste her ajan brifine kopyalanıyordu ve tur başına birkaç bin
kelime tekrar ediyordu. Artık brif "önce `docs/tuzaklar.md` oku" diyor.

---

## Değişmez kurallar

1. `src/lib/pricing.ts` dosyasına dokunma. Fiyatlar ayrıca teyit edilecek.
2. Canlı sayfa silme. En fazla site içi bağlantıyı kes.
3. **Uydurma firma bilgisi yasak**: kuruluş yılı, çalışan sayısı, lisans numarası,
   adres, telefon, müşteri sayısı, ödül, "en çok tercih edilen" etiketi. Gerekiyorsa
   `SWAP:` diye işaretle ve boş bırak, gerekçesini yorumda yaz.
4. Kartlarda renkli ince sol/üst şerit yasak.
5. Paragraf ve başlık metinlerinde uzun tire yasak. Kod yorumlarında ve meta title
   ayıracında serbest.
6. Ülkeler için "bölge" deme, "ülke" de. Ama **"serbest bölge" hukuki terimdir** ve
   asla değişmez.
7. TaxDome adı ve logosu hiçbir yerde geçmez. İşlevi (müşteri paneli) jenerik anlatılabilir.
8. Firmanın **üç ülkede de** kendi ofisi var. "Dubai'deki ofisimizden" gibi tekil ifade yazma.
9. `<select>` açılır kutu yasak. Görünür çip + gizli native radio kalıbı kullanılır.
10. Formlar sahte başarı vermez. Gönderim düğmesi gerekçesi yazılı biçimde devre dışıdır.

## Hareket politikası

"Sadece yükleniş animasyonu değil, ekranda olduğu süre boyunca bir şeyler yapmalı."
Ekranda çok SVG varsa hepsinde animasyon olsun ama minimal, üstüne gelince dinamikleşsin.
Sayfada tek/iki sahne varsa olabildiğince zengin olabilir.

Paylaşılan kalıp: `src/app/css/aktarim.css` (`.akt-` / `.akt-durak`) "bir şeyi oradan
oraya taşıma" hissi için hazır. Sözleşmesi dosyanın başındaki yorumda. Uygunsa kullan.

## Görsel dil

Yeni bir dil icat etme; sitenin kendi dilini kullan. Bir tasarım tek başına güzel olup
"diğerleriyle uyumsuz" diye geri alındı, bu somut bir vaka.

- Beyaz kart gövdesi + içinde **gece** çizim paneli: `globals.css` `.hx-card` / `.hx-stage`
- `lucide-react`, `strokeWidth 1.9`
- Yuvarlak bayrak diski (sabit px kap, `overflow: hidden`)
- Tek marka mavisi `--blue-700 #307fe2`; koyu kademeler `--blue-800` / `--blue-900`

---

## Teknik tuzaklar

**A · `useReducedMotion` hidratasyonu.** `reduced` değeri render ağacında **okunamaz**.
Beş ayrı kırık kalıp yaşandı: `if (reduce) return null` · `{!reduce && …}` · `initial`
içinde koşullu değer · `initial={{x: reduce ? a : b}}` · `{x && !reduce ? … : null}`.
Doğru kalıp `src/components/shared/HeroDubaiCards.tsx`: `reduced` yalnız `useEffect`
içinde okunur. **En iyisi** hareketi tamamen CSS'e alıp
`@media (prefers-reduced-motion: no-preference)` kapısına koymak; o zaman JS'e gerek kalmaz.

**B · Çıplak `1fr`.** Izgarada `1fr` = `minmax(auto, 1fr)` ve auto minimum mobilde taşma
üretir. Her zaman `minmax(0, 1fr)`. Bu depoda dört ayrı mobil taşmanın sebebi buydu.
(`grid-template-rows: 0fr → 1fr` açılma hilesi meşrudur, o ayrı.)

**C · `overflow-x: auto` olan kap `position: relative` olmalı.** Yoksa mutlak konumlu
torunlar, özellikle Tailwind'in `.sr-only`'si, dışarı kaçıp belgeyi uzatıyor. İki kez oldu.

**D · `scrollWidth` yalan söyler.** `body { overflow-x: clip }` yüzünden. Taşmayı ölçmek
için gerçekten `window.scrollTo(9999, 0)` yapıp `scrollX` oku.

**E · `document.styleSheets` dev'de kırpılmış CSSOM döndürür.** Kural taraması yapacaksan
ham `cssText`'i ağ üzerinden çek.

**F · `animation` kısayolu + ayrı `animation-delay` CSSOM'da boş serileşir.** Kısayol
taraması bu kuralları kaçırır.

**G · Görsel olarak gizli `<span>` erişilebilirlik ağacına çıkmayabilir.** Üç kez oldu;
`aria-label` çözdü. Rolsüz `<span aria-current="page">` adsız `generic` olur ve `current`
hiç yayımlanmaz. Radio girdilerinin `aria-label`'ı yoksa ağaçta "on" diye okunur.

**H · `Flag` bileşeni.** `shared/CountryPicker`'ın `Flag`'i çıplak
`<svg viewBox="0 0 60 40">` basar, `width`/`height` taşımaz, yani **300×150'ye şişer**.
İki sayfayı bozdu. Kabı sabit px + `overflow: hidden` olmalı.

**I · `container-type: size` kesin yükseklik ister.** `flex-basis: auto` ile yükseklik
belirsiz olur ve `100cqh` sıfıra çözülür.

**J · Birimsiz CSS değişkeni.** SVG `stroke-width` için doğru ama `border: 1.5 solid`
geçersizdir ve kenarlık 0px hesaplanır.

**K · Periyot katsızlığı.** Sitedeki 86+ sürekli animasyon periyodu birbiriyle aralarında
asal olmalı, yoksa senkronlanıp nabız gibi atıyorlar. Değişkenle verilen periyotlar naif
taramada görünmez. Birden fazla tur açıkken liste hareketli hedeftir: seçtikten **sonra**
tarayıcıda `getAnimations()` ile bir kez daha doğrula. `animation-direction: alternate`
kullanma, gerçek periyodu yazılanın iki katı yapar ve tarayıcı yanlış sayıyı okur.

**L · `resize_window` gerçek yerleşim görünümünü değiştirmiyor.** Ölçümü sabit genişlikli
aynı-kaynak iframe içinde yap.

**M · Catch-all her rotaya 200 döndürür.** `src/app/[...yapim]` yüzünden durum kodu ölü
bağlantıyı yakalamaz; `<title>` ile doğrula.

**N · Tarayıcı paneli `visibilityState: "hidden"` olabilir.** O hâlde CSS geçişleri,
animasyonlar ve `requestAnimationFrame` donuk, ekran görüntüsü boş kare döner. Zamana bağlı
ölçümde geçişleri kapatıp bitiş durumunu zorla; yerleşim ve renk ölçümleri etkilenmiyor.

**O · Dosya silince dev sunucusu eski modülü önbellekte tutabilir** ve sayfa 500 döner,
oysa kaynak temizdir. Önce `tsc`'ye bak; temizse önbellek sorunudur, dosyaları geri koyma.

**P · Blok silerken çapa aralığı.** İki çapa arasını kesen bir düzenleme, arada duran
başka bir bloğu da sessizce yutabilir. `globals.css`'te tam bu oldu: bir lab turunun
`@import` satırları farkında olmadan silindi, rota çalışmaya devam etti ama stilsiz basıldı
ve `css-check` yakalamadı (o araç sınıfı dosyada arar, dosyanın import edilip edilmediğine
bakmaz). Silmeden önce aralıkta ne olduğuna bak.

---

## Bilinen kontrast tuzağı

Beyaz metin marka mavisi `#307fe2` üstünde **3,99:1**. Normal punto eşiği 4,5, yani düşer.
Büyük metin (24px+ ya da 18,66px+/700) ve grafik için 3:1'i geçer. Beyazdan açık renk
olmadığı için marka mavisinde küçük puntoyu okunur yapmanın yolu yoktur; çözüm maviyi
koyulaştırmaktır (`--blue-900 #1b56a8`, beyazla 7,14:1). Bu tuzağa şimdiye kadar en az
dört bileşen düştü.

`11,5px/600` **büyük metin sayılmaz**, eşiği 4,5'tir.

---

## Doğrulama · iki kademe

Site şu anda tasarım tabanı atma aşamasında ve bir bölüm birkaç tur içinde tamamen
değişebiliyor. Bu yüzden doğrulama derinliği işin durumuna göre değişir.

**Onaylanmış canlı işler (özellikle ana sayfa) · tam ölçüm serbest:**
dört genişlikte taşma, kontrast tablosu, erişilebilirlik ağacı, `getAnimations()`.

**Deneme aşamasındaki her şey (lab, yeni bölümler) · kısa doğrulama yeter:**
`npx tsc --noEmit` · `npm run lint` · `node scripts/css-check.mjs` (tabanı artırma) ·
rota 200 + `<title>`. Ölçüm tablosu çıkarma.

Ucuz korumalar her iki kademede de yazılır çünkü maliyetleri sıfır: `minmax(0, 1fr)`,
`overflow-x:auto` kabında `position: relative`, reduce kapısı, `Flag` kabının sabit ölçüsü.
Ölçmeyi bırakıyoruz, doğru yazmayı değil.

`npm run build` **çalıştırma**. Dev sunucusu `http://localhost:3000` ayakta, yeni sunucu başlatma.

---

## Hiçbir tasarım işi kendiliğinden bitmiş sayılmaz

Müşteri "tam oldu kalsın" demeden bir bölüm tamamlanmış değildir. Raporlarda "bitti"
yerine "şimdilik bu hâlde" yaz ve neyin hâlâ açık olduğunu söyle.
