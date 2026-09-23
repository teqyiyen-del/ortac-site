# Ortac tasarım sistemi · DESIGN.md

Tek kaynak. Kararlar Burak'la soru soru alındı (rehber: "Design system kural
rehberi", Adım 0 denetimi `denetim.md`). Her karar tarihli; yeni bir değer
gerekiyorsa önce buraya yazılır, sonra koda girer. Görsel hâli:
`/lab/tasarim-sistemi`.

Durum: **tipografi kararlı, canlı denemede (/ingiltere)**. Renk, boşluk, şekil,
bileşen, etkileşim blokları sırada.

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

h1, h2, h3 ve rakamlar akışkan (clamp): üst ucu 1200 px'te.

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

## Onaylı iş kalemleri (uygulama sonunda)

- Ölü CSS temizliği (denetimde %22, 6.667 bildirim).
- Breakpoint'lerin birleştirilmesi (58 değer).
- Gri tonların ve metin boylarının token'a bağlanması.

## Sırada

2 · Renk · 3 · Boşluk ve düzen · 4 · Şekil · 5 · Bileşenler · 6 · Etkileşim ·
7 · Uygulama kuralları
