# Ortac tasarım sistemi · DESIGN.md

Tek kaynak. Kararlar Burak'la soru soru alındı (rehber: "Design system kural
rehberi", Adım 0 denetimi `denetim.md`). Her karar tarihli; yeni bir değer
gerekiyorsa önce buraya yazılır, sonra koda girer. Görsel hâli:
`/lab/tasarim-sistemi`.

Durum: **tipografi kararlı, renk öneride; ikisi de canlı denemede
(/ingiltere)**. Boşluk, şekil, bileşen, etkileşim blokları sırada.

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

## Onaylı iş kalemleri (uygulama sonunda)

- Ölü CSS temizliği (denetimde %22, 6.667 bildirim).
- Breakpoint'lerin birleştirilmesi (58 değer).
- Gri tonların ve metin boylarının token'a bağlanması.

## Sırada

3 · Boşluk ve düzen · 4 · Şekil · 5 · Bileşenler · 6 · Etkileşim ·
7 · Uygulama kuralları
