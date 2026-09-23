# Ortac tasarım sistemi · DESIGN.md

Tek kaynak. Kararlar Burak'la soru soru alındı (rehber: "Design system kural
rehberi", Adım 0 denetimi `denetim.md`). Her karar tarihli; yeni bir değer
gerekiyorsa önce buraya yazılır, sonra koda girer. Görsel hâli:
`/lab/tasarim-sistemi`.

Durum: **bütün bloklar yazıldı; tipografi kararlı, öteki bloklar öneride.
Hepsi /ingiltere'de canlı denemede, adım adım /karsilastir'da.** Burak en
sonda toplu elden geçirecek ("en son gerekirse tasarım sistemini elden
geçiririm").

---

## 1 · Tipografi (23.09.2026)

**Aile.** Tek: Poppins (`--font-sans`). Mono yok; koddaki `--font-mono`
artıkları temizlenecek.

**Kalınlık.** Dört: 400 · 500 · 600 · 700. İlk denemede 700 kaldırılmıştı;
önce/sonra'ya bakınca geri geldi (Burak: "700'ün neden olduğunu hatırladım …
semibold büyük başlıklarda güzel olmamış"). Rakamlar 600'de kaldı ("vergi
kutularındaki rakamlar daha güzel olmuş, öncekinde çok kalındı").

| Kalınlık | Nerede |
|---|---|
| 400 | metin (lead, gövde, küçük, alt yazı) |
| 500 | düğme, çip, etiket, gezinme, vurgulanan kısa metin |
| 600 | h3-h5 (kart başlıkları), rakam |
| 700 | h1, h2 |

**Basamak mantığı.** 12'den 20'ye +2, 20'den 32'ye +4, 32'den 48'e +8, sonra
+16: 12 · 14 · 16 · 18 · 20 · 24 · 28 · 32 · 40 · 48 · 64. Adım iki basamakta
bir ikiye katlanıyor; aynı işi gören iki boy arasındaki fark gözle seçilir
kalıyor (14/15 gibi ikili yok). Hepsi kullanılmak zorunda değil.

**Roller** (bilgisayar / telefon · kalınlık · satır · harf aralığı):

| Rol | Boy | Kal. | Satır | Harf | Nerede |
|---|---|---|---|---|---|
| h1 | 64 / 40 | 700 | 1.04 | −0.03em | her hero başlığı + kapanış CTA'sı |
| h2 | 48 / 32 | 700 | 1.06 | −0.025em | bölüm başlığı |
| h3 | 32 / 24 | 600 | 1.2 | −0.02em | alt bölüm, büyük hüküm cümlesi |
| h4 | 20 / 18 | 600 | 1.3 | −0.01em | büyük kart başlığı, bento başlığı, süreç adımı |
| h5 | 16 | 600 | 1.4 | 0 | küçük kart, satır |
| lead | 18 / 16 | 400 | 1.55 | 0 | başlık altı ilk cümle |
| body | 16 | 400 | 1.6 | 0 | uzun metin, SSS cevabı |
| body-s | 14 | 400 | 1.55 | 0 | kart içi cümle, menü, footer, tablo |
| caption | 12 | 400 | 1.5 | 0 | tarih, sayaç, eksen, yasal satır (okunması istenen not değil) |
| label | 12 | 500 | 1.3 | +0.02em | rozet, çip, tablo köşesi (büyük harf yok) |
| button | 16 | 500 | 1 | 0 | 52 px ana düğme |
| button-s | 14 | 500 | 1 | 0 | küçük düğme, çip, menü düğmesi |
| num-l | 48 / 40 | 600 | 1 | −0.02em | bölümün tek büyük rakamı |
| num-m | 32 / 28 | 600 | 1.05 | −0.02em | kart içi oran, süre, tutar |
| num-s | 24 / 20 | 600 | 1.15 | −0.01em | küçük sonuç kutusu |

**Ekran kademeleri.** Büyük boylar dört kademede (Burak: "monitörle laptop
aynı olmaz, laptopta bir tık küçük"): masaüstü ≥ 1440 · laptop 1024–1439 ·
tablet 720–1023 · telefon < 720.

| Rol | Masaüstü | Laptop | Tablet | Telefon |
|---|---|---|---|---|
| h1 | 64 | 56 | 48 | 40 |
| h2 | 48 | 48 | 40 | 32 |
| h3 | 32 | 32 | 28 | 24 |
| num-l | 48 | 48 | 40 | 40 |
| num-m | 32 | 32 | 28 | 28 |
| num-s | 24 | 24 | 20 | 20 |

**Etkileşimde kalınlık.** Basınca/seçilince kalınlık değişecekse yalnız
600 → 700 (Burak: "basınca bold olması lazım, bunun için basmıyorken
semibold; regular'ı medium'a, medium'u semibold'a çekme"). Tercihen renkle.

**Harf aralığı.** Her yerde sıkı (Burak: "aç demedim, daralt dedim" ve "harf
aralıklarını her yerde kısalım"): h1 −%3, h2 −%2,5, h3 ve rakam −%2, h4 −%1,5,
h5 · lead · gövde · düğme −%1, 14'lük metin −%0,5, 12 ve etiket 0. Tablodaki
harf aralığı sütunu bu satırla geçersiz.

**Okunurluk ve uzunluk.** Okunması istenen metin en az 14; 12 yalnız etiket,
sayaç, eksen, tarih, yasal satır. Okunması istenmeyen metin hiç konmaz.
Bölüm girişi ve kart cümlesi masaüstünde en fazla 2 satır, hero açıklaması en
fazla 3. Kalabalık boyu küçülterek değil cümleyi kısaltarak çözülür.

**İllüstrasyon metni.** Sahnelerin, hero kartlarının, SVG kutuların içindeki
yazı hiyerarşiye girmez, kartın kendi ölçüsüne göre değişir; yalnız aynı
basamaklardan seçer. Kartın/bento'nun kendi başlığı ise h4/h5'tir.

**Token'lar** (`css/ds-deneme.css` · `:root`): `--fs-h1 … --fs-num-s`,
`--fw-regular/medium/semibold`, `--ls-tight/snug/label`.

---

## 2 · Renk (öneri, 23.09.2026 · karar bekliyor)

Canlı deneme: /ingiltere (`css/ds-renk.css`, `[data-ds-renk]`); önce/sonra:
/karsilastir'da 3 ("Tipografi + renk"). Palet: /lab/tasarim-sistemi#renk.

Ölçüm (İngiltere): açık zeminde metin zaten iki renk. Dağınıklık koyu
zeminde (13 beyaz saydamlığı, 6 düz gri) ve 4,5:1'in altında kalan küçük
renkli yazılarda (mavi 3,5 · amber 3,8 · yeşil 3,9 · beyaz .4 3,8).

| Rol | Token | Değer |
|---|---|---|
| zemin | `--bg` · `--bg-soft` · `--bg-dark` · `--bg-dark-2` | #fff · #f5f5f5 · #080808 · #111 |
| metin (açık) | `--text` · `--text-2` · `--text-3` | #080808 · #5c5c5c · #767676 |
| metin (koyu) | `--on-dark` · `--on-dark-2` · `--on-dark-3` | #fff · beyaz .62 · beyaz .5 (ilk öneri .72/.55 "aşırı okunur" bulundu) |
| çizgi | `--line` · `--line-strong` · `--line-dark` · `--line-dark-strong` | #e6e6e6 · #ccc · #262626 · beyaz .2 |
| marka | `--blue` · `--blue-hover` · `--blue-ink` · `--blue-on-dark` · `--blue-100` | #307fe2 · #2468c4 · #1b56a8 · #5c9eeb · #e8f1fd |
| vurgu | `--green-100/600/700` · `--amber-100/600/700` · `--red-100/600` | 100 zemin · 600 grafik ve 24 px üstü · 700 küçük yazı |

Kurallar (öneri): küçük (< 18 px) renkli yazı her rengin 700'ü; #307fe2 yazıda
yalnız büyük başlıkta. Marka logolarının kendi renkleri muaf. Koyu mod yok
(site açık, koyu bölümler var).

**Mavi düğme · karar (23.09.2026):** bugünkü mavide (#307fe2) kalıyor
(Burak: "düğmenin rengi bugünkü mavide kalsın"). Beyaz yazı 4,0:1; marka
düğmesi kontrast kuralının bilinçli istisnası.

## 3 · Boşluk (öneri, 23.09.2026 · karar bekliyor)

Canlı deneme: /ingiltere (`css/ds-bosluk.css`, `[data-ds-bosluk]`); önce/sonra:
/karsilastir (önce = tipografi + renk, sonra = + boşluk).

Ölçüm (İngiltere): aralıkta 12 farklı değer (en sık 14, 12, 10), kart iç
boşluğunda 11. Bölüm aralığı ve başlık → içerik zaten tutarlı (112/72, 48).

**Ölçek (4 px):** 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 112.

| Rol | Değer |
|---|---|
| satır içi | 8 |
| öğe (başlık → açıklama, liste, kart içi) | 12 |
| kartlar arası | 16 |
| blok (bölüm içinde iki blok) | 24 |
| başlık → içerik | 48 / telefon 32 |
| bölüm dikey | 112 · 112 · 80 · 64 (masaüstü · laptop · tablet · telefon) |
| kart iç boşluğu | S 16 · M 24 · L 32 (telefonda 16 · 20 · 24) |

Kapsayıcı 1200 px, kenar 32 / telefonda 20 (bugünkü hâl). Sahne içi boşluklar
kapsam dışı.

## 4 · Şekil (öneri, 23.09.2026)

Canlı deneme: /ingiltere (`css/ds-bilesen.css`, `[data-ds-bilesen]`).

- **Yarıçap** aynen: 8 · 12 · 18 · 28 · hap · %50, yükseklik kuralıyla
  (< 48 → 8/12 · 48-59 → 12 · 60-71 → 12/18 · ≥ 72 → 18 · ≥ 200 veya kap
  genişliği → 18/28; `yaricap-check` zorluyor). Yeni: `--r-xs` 4 (bayrak
  köşesi, çubuk ucu gibi küçük parça). 18 dört tabanlı değil ama kural
  oturmuş ve denetleniyor; değiştirmek görünmeyecek kadar küçük bir fark.
- **Kenarlık** 1px. 2px yalnız seçim, işaret, odak. 1,5 ve 3 yok.
- **Gölge** üç: `--shadow-card` (yüzen kart) · `--shadow-float` (açılır
  pencere, koyu zemin üstü kart) · `--ring` / `--ring-dark` (bayrak, logo
  halkası). Kartlar varsayılan gölgesiz; kenarlık yeter.

## 5 · Bileşenler (öneri)

- **Düğme** iki boy: L 52 px (yatay 24, ikon tarafı 20, 16 medium) · S 40 px
  (yatay 16, 14 medium). Hap. Varyant: dolu (koyu zeminde beyaz, açık
  zeminde marka mavisi) · çizgili (açıkta `--line`, koyuda
  `--line-dark-strong`). Ölçüm: 5 yükseklik (52 · 42 · 41 · 40 · 38) → 2.
- **Form alanı** 48 px, yarıçap 12, 1px `--line`; odak 2px mavi; hata
  `--red-600` kenar + 14 px mesaj altta.
- **Kart** beyaz zemin, 1px `--line`, yarıçap boy kuralıyla, iç boşluk
  S/M/L. Tıklanabilir kartta hover: kenar `--line-strong`, kalkma yok.
- **Menü ve footer** bugünkü hâl (menü 76 px, yazı 14 medium; footer koyu
  zemin, bağlantı 14, yasal satır 12 `--on-dark-3`). Mobil menü tam ekran.
- **İkon** tek set lucide. Üç boy: 16 (14-16 px yazının yanında) · 20
  (varsayılan) · 24 (büyük); çizgi 2. Onay işareti gibi 12 px ve kalın
  çizgili küçük işaretler muaf. Ölçüm: 11 boy, 10 kalınlık → 3 boy, 1 kalınlık.
- **Görsel** oran 16:9 (geniş), 4:3 (kart), 1:1 (profil); yarıçap boy
  kuralıyla; üstüne yazı biniyorsa alttan koyu geçiş, başka katman yok.

## 6 · Etkileşim (öneri)

- **Hover** renk, zemin, kenar. Kalınlık yalnız 600 → 700 (tipografi
  kuralı). Düğmeye basınca 1px aşağı.
- **Odak** her etkileşimli öğede 2px marka mavisi çerçeve, 2px açıklık.
- **Pasif** %45 opaklık, imleç varsayılan.
- **Süre** üç: `--dur-1` 160 ms (renk, zemin, kenar) · `--dur-2` 240 ms
  (açılma, kayma) · `--dur-3` 480 ms (bölüm açılışı, büyük yer değiştirme).
  Ölçüm: 15 farklı süre. Eğri: `--ease-out-soft` varsayılan,
  `--ease-out-quint` açılış, `--ease-inout` yer değiştirme; linear yalnız
  sonsuz döngüde. Sahne döngüleri (para akışı, hero kartı) kendi periyodunda.
- **Kaydırma animasyonu** FadeUp: bir kez, 16 px yukarı + görünürlük,
  `--dur-3`, kardeşler arası 60 ms; hareket azaltma açıkken hareket yok.

## 7 · Uygulama kuralları (öneri)

1. Yeni kodda ham değer yok: yazı boyu, kalınlık, renk, boşluk, yarıçap,
   gölge, süre token'dan. İstisna: sahne/illüstrasyon içi ve marka
   logolarının renkleri.
2. Yeni token gerekiyorsa önce Burak'a sorulur, sonra buraya yazılır.
3. Denetim betikleri: `yaricap-check`, `serit-check`, `css-check` var;
   eklenecek `tasarim-check` (ham renk / ham yazı boyu / ölçek dışı boşluk
   sayar, taban çizgisiyle; yeni ham değer eklenirse uyarır).

## Konsolidasyon (denetim → sistem, değer sayısı)

| Kategori | Bugün | Sistem |
|---|---|---|
| yazı boyu (canlı CSS) | 96 | 11 basamak (12 · 14 · 16 · 18 · 20 · 24 · 28 · 32 · 40 · 48 · 64) |
| kalınlık | 7 | 4 |
| satır yüksekliği | 34 | ~10 (rol başına bir) |
| harf aralığı | 28 | 8 |
| renk | 485 ham + 130 token | ~30 token (marka logoları hariç) |
| koyu zeminde metin tonu | 13 saydamlık + 6 gri | 3 |
| boşluk | 143 | 13 basamak, 7 rol |
| kart iç boşluğu | ~40 birleşim | 3 (S · M · L) |
| yarıçap | 25 | 7 (4 · 8 · 12 · 18 · 28 · hap · %50) |
| kenarlık | 4 | 2 (1 · 2) |
| gölge | 64 | 3 (+ halka) |
| breakpoint | 58 | 3 (720 · 1024 · 1440) |
| süre | 126 | 3 (+ sahne döngüleri) |
| düğme yüksekliği | 5 | 2 |
| ikon boyu / çizgi | 11 / 10 | 3 / 1 |

## Sonraki adım (Burak onaylayınca)

1. Token dosyası: `ds-*.css`'teki `:root` token'ları tek `css/tokens.css`'e,
   deneme öznitelikleri kalkar, kurallar sitenin geneline geçer.
2. Düzeltme listesi: `tasarim-check` her dosyada hangi ham değerin hangi
   token'a döneceğini çıkarır; bileşen bileşen uygulanır (ölü CSS temizliği
   ve breakpoint birleştirmesi aynı turda).
3. /karsilastir ve /lab/tasarim-sistemi karar verilince silinir ya da stil
   rehberi olarak kalır.

## Uygulama günlüğü

- **24.09.2026 · ölü CSS temizlendi** (`scripts/olu-css.mjs`): 6.740 bildirim,
  1.769 kural, 7 @keyframes; globals.css ~34 bin satırdan 13 bine. Güvence:
  `scripts/stil-anlik.mjs` 25 rota × 1440/390 hesaplanmış stil, önce/sonra
  fark yok. Geri dönüş noktası: `git tag ds-oncesi`.
- **24.09.2026 · breakpoint'ler üç kademeye indi** (`scripts/breakpoint.mjs`):
  720 · 1024 · 1440; 294 sorgu. Eşleme: < 820 → 720, 820-1300 → 1024,
  > 1300 → 1440; aralık sorgusu boşa düşerse alt uç bir kademe iner (4 sorgu).
  390, 1280 ve 1440'ta hiçbir sorgunun sonucu değişmiyor (stil-anlik: fark
  yok); değişen yalnız 391-819 ve 1024-1279 aralıkları.

- **24.09.2026 · design system bütün sitede.** Dört katmanın özniteliği
  (`data-ds`, `data-ds-renk`, `data-ds-bosluk`, `data-ds-bilesen`)
  `layout.tsx`'te `<body>`'de. Bir özniteliği silmek o katmanı bütün sitede
  eski hâline döndürür. Kontrast taraması (`scripts/kontrast.mjs`, 24 rota ×
  1440/390) temiz; kalan iki kalem muaf (marka mavisi düğme, pasif düğme).
- **24.09.2026 · yarıçap boy kuralı** bütün rotalarda: yalnız iki ihlal
  kalmıştı (basın plakası, banka şeması; 12 → 18).
- **24.09.2026 · yazı boyu ve kalınlık basamağa** (`scripts/basamak.mjs`):
  792 bildirim. Boy en yakın basamağa; ortadaysa 20'nin altında yukarı
  (okunurluk), üstünde aşağı (taşma). 11,5'in altı (çizim içi), clamp() ve
  svg metni dokunulmadı. Kalınlık 550 → 500, 650 → 600, 800 → 700.
  Kod yorumlarındaki eski px değerleri (ör. "13,5 px") bu turdan önceki
  ölçümlerdir. Denetim: 390/1440'ta taşma yok, hiza taraması temiz.
- **24.09.2026 · koyu zeminde metin üç kademe** (`basamak.mjs --koyu`): 96
  `color` bildirimi, 28 ayrı beyaz saydamlığı → beyaz · .62 · .5, en yakını
  (sınır .56 ve .81). .4'ün altı (pasif, süs) dokunulmadı. Kontrast taraması
  sonrası da temiz.
- **24.09.2026 · harf aralığı** (`basamak.mjs --harf`): 52 bildirim, boya
  göre tablo değeri, YALNIZ SIKILAŞTIRMA (hedeften sıkı olan kaldı). Kendi
  boyu olmayan kural ve .04em üstü bilinçli aralık (IBAN, maskeli numara,
  kod) dokunulmadı.

## Onaylı iş kalemleri (uygulama sonunda)

- ~~Ölü CSS temizliği~~ yapıldı (yukarıda).
- ~~Breakpoint'lerin birleştirilmesi~~ yapıldı.
- ~~Metin boylarının basamağa bağlanması~~ yapıldı (792 bildirim).
- ~~Koyu zeminde metin tonları~~ üç kademeye bağlandı (96 bildirim).
- Açık zemindeki düz griler (#9a9a9a, #a6a6a6 …): bağlamı (zemin) ölçmeden
  toplu değiştirilemez; kontrast taraması temiz, sıradaki turda.


