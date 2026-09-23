# Tasarım denetimi · Adım 0 (23.09.2026)

Rehber: Burak'ın gönderdiği "Design system kural rehberi" (Downloads). Bu dosya
yalnız **bugünkü durumu** yazıyor; karar yok. Kararlar `DESIGN.md`'ye, soru soru
yazılacak. Kodda hiçbir değişiklik yapılmadı.

## Nasıl ölçüldü

İki kaynak, birbirini doğrulamak için:

1. **Kod** (`node scripts/tasarim-denetim.mjs`): globals.css + 48 CSS dosyası,
   30.115 bildirim; TSX'teki 769 satır içi stil. Lab dosyaları (1.622
   bildirim) ayrı tutuldu. Seçicideki sınıf hiçbir TS/TSX dosyasında geçmiyorsa
   bildirim **ölü** sayıldı (dinamik `x-${…}` önekleri canlı kabul edildi).
2. **Ekran** (tarayıcı, hesaplanmış stil): 12 canlı sayfa, 1440 ve 375 px.
   Her görünür metin öğesinin boyut/kalınlık/satır yüksekliği/harf aralığı/rengi,
   her kart benzeri kutunun padding ve yarıçapı, her bölümün dikey boşluğu, her
   düğmenin ölçüsü. Kod sayımı ölü kuralları da görür; ekran ölçümü yalnız
   ziyaretçinin gördüğünü.

## Genel tablo

| | Durum |
|---|---|
| CSS bildirimi | 30.115 · canlı 20.914 · **ölü 6.667 (%22)** · lab 1.622 |
| Ölü bildirimin yeri | globals.css 5.446 · araclar 579 · hakkimizda 299 · kaynaklar 273 |
| Tailwind | pratikte yok (Calculator.tsx'te 7 sınıf) |
| Font ailesi | tek: Poppins (`--font-sans`); `--font-mono` artığı 3 yerde |

## Role göre tutarsızlık (en kötüden iyiye)

| Rol | Farklı değer | Ayrıntı |
|---|---|---|
| **Breakpoint** | **58** | min 1024 ×189, min 900 ×92, max 639.5 ×85, max 719.5 ×70, min 980 ×65, min 1040 ×55, max 1023.5, 699.5, 560, 800, 760, 860, 1200, 768, 960, 720, 899, 1000, 640, 700, 620 … |
| **Animasyon süresi** | **126** | 200ms ×84, 160 ×66, 180 ×52, 220 ×46, 150 ×36, 240, 260, 460, 300, 170, 340, 320 … (+ sahne döngüleri 5.3s, 7.1s, 9s …) |
| **Renk (ham değer)** | **485 ham** / 130 token | renk kullanımlarının %35'i token değil ham hex/rgba |
| · soluk gri metin | ~10 | #9a9a9a, #9d9d9d, #a6a6a6, #b9b9b9, #8a8a8a, #8c8c8c, #9c9c9c, #8b8e95, #7c7f85 (ekranda ölçüldü) |
| · koyu zemin üstü beyaz | 11 | alfa .42 .45 .5 .58 .62 .7 .72 .76 .86 .88 .9 |
| **Kart iç boşluğu** | ~40 | 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 px ve asimetrik birleşimleri |
| **Boşluk (padding/margin/gap)** | 143 | 1–13 px'in hepsi kullanılıyor; tek sayılar yaygın (7 ×84, 9 ×105, 11 ×56, 13 ×45) |
| **Gövde/küçük metin boyutu** | 15 (10.5–17 arası) | ekranda: 13.5 ×688, 16 ×438, 13 ×328, 12.5 ×280, 14.5 ×264, 14 ×174, 15 ×126, 15.5 ×124, 11.5 ×124, 12 ×77, 16.5 ×70, 17 ×56, 11 ×50, 10.5 ×30 |
| **Kart başlığı (h3)** | 8 | 15.5, 16, 16.5, 17, 18, 19, 20, 22 px; kalınlık 600 ya da 650 |
| **Gölge** | 64 | token yalnız 39 kullanımda (`--shadow-card` ×30, `--shadow-float` ×9) |
| **Satır yüksekliği** | 34 | 1.6 ×81, 1.5 ×78, 1.3, 1.4, 1.55, 1.2, 1.35, 1.45, 1, 1.25, 1.65, 1.62 … |
| **Harf aralığı** | 28 | -0.01em ×54, -0.02em ×53, -0.015em, 0.01em, -0.012em, -0.018em, -0.022em … |
| **Metin genişliği (ch)** | 30+ | 62ch ×21, 68ch ×12, 74ch, 46ch, 58ch, 78ch, 52ch … |
| **Font kalınlığı** | 7 | 600 ×386, 700 ×149, 500 ×127, 400, **650 ×23, 550, 800** |
| **Düğme** | 2 boy · küçük sapmalar | ana 52 px hap; birincil yatay boşluk 28, hayalet 26; kalınlık 600 ve 500 karışık; küçük 42 px |
| **Kenarlık kalınlığı** | 4 | 1px ×492, 2px ×62, 1.5px ×8, 3px ×5 |
| **Yarıçap** | 25 (çoğu token) | token ×536; ham 1–5, 10, 11, 14 px küçük parçalarda |

## İyi durumda olanlar

- **Bölüm başlığı (h2):** 68 yerde 46 px / telefonda 30 px, 700. Sapan 6 yer:
  kapanış CTA 60, süreç 44, sektör 38, "Markamız hakkında" 34, iki 22'lik.
- **Sayfa başlığı (h1):** 11 sayfada 58 / 34 px. Ana sayfa hero'su 66.6.
- **Giriş cümlesi (sec-lead):** 59 yerde 16.5 px. Sapan: 17 (hero lead), 15.5.
- **Bölüm dikey boşluğu:** 82 bölümde 112 px (telefonda 72); hero'lar kendi
  değerinde.
- **Kapsayıcı:** her sayfada 1200 px + 32/20 px kenar.
- **Yarıçap:** yükseklik kuralı (8/12/18/28) ve `yaricap-check` sayesinde
  büyük ölçüde oturmuş.
- **Easing:** üç token (`--ease-out-soft`, `--ease-out-quint`, `--ease-inout`)
  + linear; ham cubic-bezier 7 yerde.

## Birbirine çok yakın değerler (birleştirme adayı)

- Boyut: 12.5 / 13 / 13.5 · 14 / 14.5 / 15 / 15.5 · 16 / 16.5 / 17 · 11 / 11.5 / 12
- Kalınlık: 600 / 650 · 500 / 550
- Gri: #9a9a9a / #9c9c9c / #9d9d9d · #8a8a8a / #8c8c8c · #a6a6a6 / #b9b9b9
- Beyaz alfa: .7 / .72 · .86 / .88 / .9 · .42 / .45 · .58 / .62
- Satır yüksekliği: 1.5 / 1.55 · 1.6 / 1.62 / 1.65 · 1.3 / 1.35
- Harf aralığı: -0.01 / -0.012 · -0.015 / -0.018 · -0.02 / -0.022 / -0.024
- Breakpoint: 1000 / 1024 / 1040 · 700 / 720 / 760 / 768 · 860 / 880 / 900 · 960 / 980
- Süre: 150 / 160 / 170 / 180 · 200 / 220 / 240 / 260 · 300 / 320 / 340

## Ham veri

`scripts/tasarim-denetim.mjs` tekrar çalıştırılabilir; ekran ölçümü tarayıcıda
yapıldı (her canlı sayfa, iki genişlik).
