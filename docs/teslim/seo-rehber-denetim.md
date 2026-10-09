# SEO rehberine göre denetim

Tarih: 09.10.2026. Bakılan adres: https://ortac-global-site.vercel.app (canlı, geçici adres). Rehber: `/Users/burak/PİKTRAM SİTE/ana-site/araclar/seo/EVRENSEL-REHBER.md` (bölüm 1-15). Önceki tur: `docs/teslim/seo.md` (08.10.2026).

Bu tur yalnız okuma ve ölçümdür. Kaynak dosya değişmedi, commit atılmadı, derleme alınmadı.

## Kısa cevap

Önceki turun on maddesi yerinde: kanonikler tam, geçici adres dizine kapalı, kopya adresler yönleniyor, başlıklar ve açıklamalar tekil, 404 gerçekten 404. Blog yazıları rehberin şablonuna büyük ölçüde uyuyor (özet kutusu, soru başlıkları, tablo, SSS, kaynak, iç bağlantı).

Rehbere göre eksik kalanlar üç kümede toplanıyor:

1. Yapılı veri yarım. On bir sayfada ekranda SSS var ama veri olarak basılmıyor; kurum kaydı üç ayrı yerde üç ayrı biçimde; site kaydı (WebSite) hiç yok; yazar sayfası yok.
2. Her sayfa aynı 527 KB'lık tek stil dosyasını ve aynı 25 betiği indiriyor. Sayfaya özel stiller ortak dosyanın içinde.
3. Küçük ama site geneli kusurlar: "içeriğe geç" bağlantısı yok, bölüm başlıkları ham metinde iki kez ve bitişik okunuyor, beş sayfanın paylaşım başlığı ana sayfanınki, güvenlik başlıkları eksik.

## Nasıl bakıldı

- Site haritasındaki 60 adres ve harita dışı 6 adres (/basla, /kvkk, /gelismeler, /e-kitaplar, /kariyer, /blog/kategori/kurulus-sonrasi) canlıdan çekildi, toplam 66 sayfa. Komut: `curl -s https://ortac-global-site.vercel.app/sitemap.xml` ile adres listesi, ardından her adres için Node `fetch` ile ham HTML (betik oturumun geçici klasöründe, depoya yazılmadı).
- Ham HTML'den çıkarılanlar: durum kodu, başlık ve açıklama uzunluğu, kanonik, robots, og etiketleri, h1 sayısı, başlık ağacı, JSON-LD türleri, SSS soru sayısı, görsel öznitelikleri, `<main>` sayısı, iç bağlantılar, betik ve stil dosyaları.
- Boyutlar: `curl -s -o /dev/null -w '%{size_download}' URL` (ham) ve aynı komut `-H 'Accept-Encoding: br'` ile (sıkıştırılmış).
- Başlıklar: `curl -sI URL`.
- Depo tarafı: `grep`, `wc -l`, `wc -c`, `find public -size +200k`.
- Tarayıcı açılmadı. Lighthouse, gerçek LCP/CLS ölçümü, Rich Results Test, Search Console YOK. Aşağıda "ölçüldü" denen her rakam yukarıdaki komutlardan geliyor; tarayıcı ölçümü gerektiren konular ayrıca "ölçülmedi" diye işaretli.

## Ölçümler

Sekiz sayfa, canlı. Sıra: HTML ham / sıkıştırılmış, betik dosya sayısı ve toplamı ham / sıkıştırılmış, stil dosya sayısı ve toplamı ham / sıkıştırılmış.

- `/`: HTML 304 KB / 49 KB. JS 25 dosya, 925 KB / 311 KB. CSS 4 dosya, 556 KB / 109 KB.
- `/dubai`: HTML 435 KB / 57 KB. JS 32 dosya, 1.051 KB / 353 KB. CSS 5 dosya, 569 KB / 112 KB.
- `/ingiltere`: HTML 369 KB / 46 KB. JS 32 dosya, 1.051 KB / 353 KB. CSS 5 dosya, 569 KB / 112 KB.
- `/kktc`: HTML 321 KB / 44 KB. JS 32 dosya, 1.051 KB / 353 KB. CSS 5 dosya, 569 KB / 112 KB.
- `/dubai/muhasebe`: HTML 208 KB / 28 KB. JS 28 dosya, 1.019 KB / 342 KB. CSS 4 dosya, 557 KB / 110 KB.
- `/blog`: HTML 134 KB / 17 KB. JS 28 dosya, 952 KB / 322 KB. CSS 4 dosya, 557 KB / 110 KB.
- `/blog/kktc-vergi-avantajlari`: HTML 137 KB / 25 KB. JS 29 dosya, 954 KB / 323 KB. CSS 3 dosya, 553 KB / 108 KB.
- `/iletisim`: HTML 100 KB / 24 KB. JS 27 dosya, 990 KB / 336 KB. CSS 4 dosya, 557 KB / 110 KB.

Ek ölçümler:

- En büyük stil dosyası tek başına 527.316 bayt (`/_next/static/css/9f84574384e61b69.css`) ve 66 sayfanın hepsinde yükleniyor.
- 25 betik dosyası 66 sayfanın hepsinde ortak. En büyükleri: `1255-...js` 174 KB, `4bd1b696-...js` 173 KB (React), `3727-...js` 131 KB (içinde `MotionConfig` geçiyor, yani hareket kitaplığı), `polyfills` 113 KB (yalnız eski tarayıcıya iner).
- Yazı tipi: 8 `woff2` önden yükleniyor, toplam 53.616 bayt. `display: swap` açık (`src/app/layout.tsx:18`).
- İlk bayt süresi tek ölçümde 0,21-0,27 sn (`curl -w '%{time_starttransfer}'`). Tek ölçüm, karar için yetmez.
- Üçüncü taraf betik yok. Dış kaynak yalnız `images.unsplash.com` (fotoğraflar).
- `find public -size +200k`: sonuç yok. `public/` toplam 492 KB; en büyük dosya `og.png` 34 KB.
- Yanıt başlıkları (`curl -sI .../dubai`): yalnız `strict-transport-security` var. `x-content-type-options`, `referrer-policy`, `permissions-policy`, `content-security-policy` yok.
- Bot erişimi: `curl -A GPTBot|ClaudeBot|PerplexityBot|Googlebot .../dubai` dördü de 200.
- `/llms.txt`, `/llms-full.txt`, `/feed.xml`, `/rss.xml`, `/manifest.webmanifest`: beşi de 404.

---

## A. Güvenle hemen uygulanabilir

Etkiye göre sıralı. Hiçbiri görünen tasarımı ya da metni değiştirmiyor.

### A1. On bir sayfada ekrandaki SSS veri olarak basılmıyor

- Nerede: `/` (6 soru, `src/components/home/HomeFaq.tsx`), `/dubai`, `/ingiltere`, `/kktc` (beşer soru, `src/app/ulke/[slug]/page.tsx:354`), üç banka sayfası (`src/components/services/BankaSayfa.tsx:437`), `/dubai/oturum-vize` (`src/app/dubai/oturum-vize/page.tsx:302`), üç kurumsal danışmanlık sayfası (sekizer soru; `src/app/dubai/kurumsal-danismanlik/page.tsx` ve iki eşi).
- Ne eksik: bu sayfaların JSON-LD'sinde `FAQPage` yok (ölçüldü: türler yalnız `Organization, Service`). Cevaplar ham HTML'de duruyor, yani veri olarak basmak için engel yok. Rehber bölüm 3 ve 10.5-10.6.
- Düzeltme: `src/components/services/VergiSayfa.tsx:245` ve `MuhasebeSayfa.tsx:68`'deki kalıbın aynısı. Ekrana giden soru dizisi (`c.faq`, `B.faq.items`, `V.faq.items`) aynı dosyada `FAQPage.mainEntity`'ye de verilir. Cevabında bağlantı ya da JSX olan sorularda (ana sayfada "Dubai süreci" bağlantısı var) veri için düz metin alanı kullanılır.
- Risk: düşük. Etki: yüksek.

### A2. Kurum kaydı dağınık, site kaydı yok

- Nerede: `src/app/layout.tsx:47-67`, `src/app/hakkimizda/page.tsx:607`, `src/app/iletisim/page.tsx:144`.
- Ne eksik: her sayfaya basılan kurum düğümü dört alandan ibaret (ad, adres, kuruluş yılı). `@id`, logo, sosyal hesaplar yok. Hakkımızda ve iletişimdeki ayrıntılı düğüm `@id: .../#organization` taşıyor ama layout'taki taşımıyor, yani aynı sayfada iki ayrı kurum görünüyor. `WebSite` düğümü hiçbir sayfada yok. Öteki dosyalardaki `provider` ve `publisher` de kimliksiz kopyalar (13 yerde). Rehber bölüm 3: Organization tek `@id`, logo, sameAs; WebSite her sayfada.
- Düzeltme: layout'taki düğüme `"@id": `${SITE}/#organization``, `logo: `${SITE}/ortac-logo.png`` (dosya var: `public/ortac-logo.png`, 1509x315), `sameAs` olarak `src/components/Footer.tsx:438-442`'deki beş hesap, `alternateName` ve `legalName` (hakkımızdaki değerler). Yanına `{ "@type": "WebSite", "@id": `${SITE}/#website`, name: "Ortac Global", alternateName: "Ortac International Accounting", url: SITE, inLanguage: "tr-TR", publisher: { "@id": ... } }`. Hakkımızda ve iletişim kendi alanlarını aynı `@id` ile eklemeye devam eder. `provider` ve `publisher` satırları `{ "@id": `${SITE}/#organization` }` olur. Kurucu (`founder`) YAZILMAZ: sitede doğrulanmış unvan "yönetici ortak", kurucu bilgisi teyitli değil.
- Ayrıca: layout'taki genel `Service` düğümü (`layout.tsx:56-65`) kendi `Service`'ini basan 21 sayfada ikinci hizmet olarak görünüyor. Yalnız ana sayfaya taşınması (`src/app/page.tsx`) yeterli.
- Risk: düşük. Etki: yüksek.

### A3. Beş sayfanın paylaşım başlığı ana sayfanınki

- Nerede: `/blog` (`src/app/blog/page.tsx:65-70`), `/kaynaklar` (`src/app/kaynaklar/page.tsx:27`), `/ingiltere/muhasebe` ve `/kktc/muhasebe` (`src/components/services/MuhasebeSayfa.tsx` üzerinden künye), blog kategori sayfaları (`src/app/blog/kategori/[kategori]/page.tsx:67`). Aynı durum `/gelismeler`, `/e-kitaplar`, `/kvkk`, `/basla` için de geçerli ama onlar dizin dışı.
- Ne eksik: bu sayfalar `openGraph` yazmıyor, layout'taki varsayılanı devralıyor. Ölçüldü: `og:title` = "Ortac Global | Muhasebe, Vergi ve Kurumsal Danışmanlık", `og:url` yok. WhatsApp ya da LinkedIn'de blog bağlantısı ana sayfa başlığıyla çıkar.
- Düzeltme: bu dosyalarda elle yazılan künyeyi `sayfaKunye({ title, description, yol })` çağrısına çevir (`src/lib/seo.ts`). Öteki 50 sayfa zaten böyle.
- Risk: düşük. Etki: orta.

### A4. Ülke, banka, vize, danışmanlık ve araç sayfalarında kırıntı ve hizmet verisi yok

- Nerede: `/dubai`, `/ingiltere`, `/kktc` (`src/app/ulke/[slug]/page.tsx`); üç banka sayfası; üç kurumsal danışmanlık sayfası; `/dubai/oturum-vize`; üç vergi sayfası (yalnız kırıntı eksik, `src/components/services/VergiSayfa.tsx:234`); `/araclar` ve yedi araç sayfası; `/ulkeler`; `/uygunluk-testi`.
- Ne eksik: `BreadcrumbList` yok; ilk on sayfada sayfaya özel `Service` de yok. Rehber bölüm 3: ana sayfa dışında kırıntı, hizmet işletmesinde Service.
- Düzeltme: `src/app/dubai/muhasebe/page.tsx:160-200` kalıbı (kırıntı + Service + SSS tek `@graph`). Tekrar olmasın diye `src/lib/seo.ts` içine `kirinti(yollar)` ve `hizmetDugumu({ ad, tur, yol, ulke, aciklama })` yardımcıları yazılıp buralardan çağrılır.
- Risk: düşük. Etki: orta.

### A5. Blog dizininde yazar "kurum" diye işaretli

- Nerede: `src/app/blog/page.tsx:113`.
- Ne eksik: `author: { "@type": "Organization", name: p.author }` ve `p.author` "Murat Ortaç". Kişi adı kurum türüyle basılıyor (ölçüldü: `/blog` JSON-LD'si). Yazı sayfası doğru yapıyor (`src/app/blog/[slug]/page.tsx:471-474`).
- Düzeltme: aynı koşulu buraya taşı: yazar "Ortac Global" ise Organization, değilse Person.
- Risk: düşük. Etki: orta.

### A6. Yazı verisinde güncelleme tarihi, yayıncı logosu ve yazar adresi yok

- Nerede: `src/app/blog/[slug]/page.tsx:460-480`.
- Ne eksik: `dateModified` hiçbir yazıda basılmıyor (hiçbir kayıtta `updatedAt` yok), `publisher.logo` yok, `author.url` yok, `image` 900 piksellik Unsplash adresi. Rehber bölüm 3: author Person + url, datePublished, dateModified.
- Düzeltme: `dateModified: post.updatedAt ?? post.publishedAt`; `publisher: { "@id": .../#organization }` (A2 ile logo gelir); yazar sayfası açılana kadar `author.url: `${SITE}/hakkimizda``; `image` adresinde `w=1200`. `og:image` de aynı adresten geliyor (ölçüldü: `w=900`), o da 1200 olur.
- Risk: düşük. Etki: orta.

### A7. Fotoğraf sunucusuna ön bağlantı yok

- Nerede: `src/app/layout.tsx` (`<head>` tarafı).
- Ne eksik: 36 sayfada en az bir görsel önden yükleniyor ama `images.unsplash.com` için `preconnect` yok (ölçüldü: ham HTML'de `rel="preconnect"` sıfır). Tarayıcı fotoğrafı istemeden önce ayrı alan adına bağlantı kurmak zorunda. Rehber bölüm 6.
- Düzeltme: layout'ta `<link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />` (Next 15'te `ReactDOM.preconnect("https://images.unsplash.com")` da olur).
- Risk: düşük. Etki: orta (gerçek kazanç ölçülmedi).

### A8. Bölüm başlıkları ham metinde iki kez ve bitişik

- Nerede: `src/components/shared/SplitWords.tsx:88`. Site genelinde bu bileşenle basılan bütün h2'ler ve ana sayfa h1'i.
- Ne eksik: başlığın içinde önce gizli tam metin (`sr-only`), hemen ardından boşluksuz olarak animasyonlu kopya geliyor. Ham metin "Hizmet verdiğimiz ülkeler.Hizmet verdiğimiz ülkeler." diye okunuyor (ölçüldü: ana sayfada 9 başlık, `/dubai`'de 11 başlık). Rehber bölüm 1 ve 9b: arama motoru bağlantı başlığını h1'den alabiliyor, bitişik metin sonuçta öyle görünür.
- Düzeltme (güvenli adım): `<span className="sr-only">{text}</span>` satırından sonra `{" "}`. Gizli öge mutlak konumlu olduğu için boşluk yerleşimi oynatmaz. Tekrarı tümden kaldırmak ayrı iş, B bölümünde.
- Risk: düşük. Etki: orta.

### A9. "İçeriğe geç" bağlantısı yok, `<main>` kimliksiz

- Nerede: 66 sayfanın hepsi (ölçüldü: `href="#main"` ya da benzeri yok; `<main>` etiketi öznitelik taşımıyor). Depoda 36 dosyada `<main>` var.
- Ne eksik: rehber bölüm 8.
- Düzeltme: `src/app/layout.tsx`'te `<body>`'nin ilk çocuğu olarak `<a href="#main" className="sr-only focus:not-sr-only ...">İçeriğe geç</a>` ve 36 dosyada `<main id="main">`. Bağlantı `<body>`'nin doğrudan çocuğu olsun; yatay kaydırmalı bir kabın içine konursa tuzaklar C'deki taşma olur.
- Risk: düşük. Etki: düşük-orta.

### A10. Banka sayfasında üç logo ölçüsüz ve önden yükleniyor

- Nerede: `src/components/services/BankaSayfa.tsx:244`.
- Ne eksik: `<img className="svb-s-dosya" src=... alt=...>` genişlik, yükseklik ve `loading` taşımıyor. Ölçüldü: `/dubai/banka-hesabi` dört görseli önden yüklüyor, üçü bu logolar (`/brands/fab.svg`, `aps.svg`, `network.svg`, toplam 56 KB). Rehber bölüm 6: her görselde ölçü, ekran altı görsel tembel.
- Düzeltme: `width`, `height`, `loading="lazy"`, `decoding="async"` ekle. Aynı dosyada blog yazar fotoğrafı da önden yükleniyor: `src/app/blog/[slug]/page.tsx:686`'ya `loading="lazy"`.
- Risk: düşük. Etki: düşük-orta.

### A11. Güvenlik başlıkları

- Nerede: `next.config.ts` · `headers()`.
- Ne eksik: yalnız HSTS var (Vercel'in kendisi basıyor). Rehber bölüm 7.
- Düzeltme: `source: "/:path*"` için host koşulsuz ikinci bir kayıt: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `Content-Security-Policy: frame-ancestors 'self'`. Tam CSP ayrı iş, yazılmasın.
- Risk: düşük (lab'daki önce/sonra sayfaları aynı kaynaktan iframe kullanıyor, `'self'` bunu kesmez). Etki: düşük.

### A12. Araç sayfalarında başlık sırası atlıyor

- Nerede: `src/components/tools/ToolShell.tsx:610` (`<h3 className="ta-derin-t">`). Altı sayfa: `/araclar/bae-kdv`, `/ingiltere-isim-sorgulama`, `/ingiltere-sic-kodu`, `/isim-ureteci`, `/kurumlar-vergisi/dubai`, `/kurumlar-vergisi/ingiltere`.
- Ne eksik: h1'den doğrudan h3'e iniliyor, arada h2 yok (ölçüldü). Rehber bölüm 1.
- Düzeltme: etiketi `h2` yap, sınıf aynı kalsın. Önce `ta-derin-t` için etikete bağlı bir CSS kuralı var mı bak.
- Risk: düşük. Etki: düşük.

### A13. Site haritasında yazıların tarihi yok

- Nerede: `src/app/sitemap.ts:96`.
- Ne eksik: `lastModified` hiçbir adreste yok. Dosyadaki gerekçe ("gerçek değişim tarihi depoda yok") sayfalar için doğru ama blog yazılarında tarih var (`publishedAt`, `updatedAt`). Rehber bölüm 2.
- Düzeltme: yalnız `/blog/<slug>` adreslerinde `lastModified: yazi.updatedAt ?? yazi.publishedAt`. Öteki adresler aynen kalır.
- Risk: düşük. Etki: düşük.

### A14. Süs sahnelerindeki metin alıntıya açık

- Nerede: çizim sahneleri (`src/components/scenes/SetupScenes.tsx`, `src/components/shared/HeroDubaiCards.tsx`, `LiveChat.tsx`, `LiveTracker.tsx`, `HeroSceneCard.tsx`).
- Ne eksik: `data-nosnippet` hiçbir sayfada yok (ölçüldü: 0). `/dubai` ham HTML'inde 87 SVG yazısı var: "Velocity Trading", "Ön başvuru iletildi", "Uygun", "Aday şirket adı" gibi örnek arayüz metinleri. `aria-hidden` arama özetini engellemez. Rehber bölüm 4.
- Düzeltme: sahne köklerine (çoğunda zaten `data-yaricap="serbest"` duran kap) `data-nosnippet` özniteliği.
- Risk: düşük. Etki: düşük-orta.

### A15. RSS akışı ve llms.txt yok

- Nerede: `/feed.xml`, `/llms.txt` 404.
- Ne eksik: rehber bölüm 4 (RSS `<head>`'de dursun, sayfada görünen bağlantı olmasın; llms.txt derlemede otomatik, üstünde zaman harcama).
- Düzeltme: `src/app/feed.xml/route.ts` (yayınlanmış yazılardan), `src/app/llms.txt/route.ts` (`LIVE_ROUTES` + başlıklar), layout künyesine `alternates.types: { "application/rss+xml": "/feed.xml" }`.
- Risk: düşük. Etki: düşük.

### A16. Kullanılmayan bağımlılıklar

- Nerede: `package.json`.
- Ne eksik: `cobe` hiçbir yerde içe aktarılmıyor; `framer-motion` doğrudan içe aktarılmıyor (kod `motion/react` kullanıyor, 31 dosya; `motion` paketi onu zaten getiriyor); `d3-geo`, `topojson-client`, `world-atlas` ve iki `@types` paketi `src` ve `scripts` altında geçmiyor. Komut: `grep -rlE "from ['\"]PAKET" src scripts`.
- Düzeltme: beşini kaldır, ardından `npx tsc --noEmit`. Sayfa paketine girmedikleri için ziyaretçi hızına etkisi yok; kurulum ve bakım yükü.
- Risk: düşük. Etki: düşük.

### A17. Küçükler

- `/index` 200 dönüyor (kanonik `/`'yi gösteriyor, sorun büyük değil). `next.config.ts` yönlendirmelerine `{ source: "/index", destination: "/", permanent: true }`.
- Hizmet ve sektör sayfalarında `og:type` "article": `src/app/dubai/muhasebe/page.tsx:149`, `src/app/dubai/muhasebe/[alt]/page.tsx:75`, `src/app/sektorler/[sektor]/page.tsx:206`. "website" olmalı.
- `public/` dosyaları önbelleksiz (`curl -sI .../og.png`: `max-age=0, must-revalidate`). `next.config.ts` `headers()` içinde `/brands/:path*` ve `/murat-ortac.jpg` için `Cache-Control: public, max-age=2592000`.
- 404 sayfasının başlığı öteki sayfalardan farklı ayıraçla yazılı (`src/app/not-found.tsx:53`).

---

## B. Karar ya da tasarım gerektirir

Etkiye göre sıralı.

### B1. Tek stil dosyası 527 KB ve her sayfada

- Nerede: `src/app/globals.css` (kendisi 252 KB, 54 `@import`).
- Ne eksik: yalnız bir sayfanın kullandığı stiller ortak dosyada. Kaynak boyutları (`wc -c`): `svc-muhasebe.css` 148 KB, `hakkimizda.css` 91 KB, `sektor.css` 89 KB, `araclar.css` 67 KB, `fittest.css` 58 KB, `countries.css` 56 KB, `kaynaklar.css` 44 KB, `kurumsal.css` 43 KB, `blog.css` 40 KB, `blog-hub.css` 36 KB, `iletisim.css` 35 KB. Stil dosyası ilk boyamayı bekletir; ana sayfa sıkıştırılmış 109 KB stil indiriyor.
- Düzeltme: sayfaya özel dosyalar `globals.css`'ten çıkıp ilgili rotanın `page.tsx` ya da `layout.tsx` dosyasından içe aktarılır (lab böyle yapıyor: `src/app/lab/layout.tsx:8`).
- Risk: yüksek. Kuralların sırası değişir; `globals.css` gövdesi `@import` bloğundan sonra okunuyor ve design system katmanları (`ds-*.css`) sıraya dayanıyor. Tuzaklar P'deki olay da aynı dosyada yaşandı. Sayfa sayfa, ekran karşılaştırmasıyla yapılmalı.
- Etki: yüksek. Gerçek kazanç ölçülmedi (tarayıcı ölçümü gerekir).

### B2. Her sayfada 25 ortak betik, 310-350 KB sıkıştırılmış

- Nerede: en büyük istemci bileşenleri (`wc -l`): `src/components/NavIstemci.tsx` 1.793, `src/app/iletisim/ContactSections.tsx` 1.572, `src/components/FitTest.tsx` 1.259, `src/components/tools/ToolShell.tsx` 1.184, `src/components/lab/SatisAkisi.tsx` 1.164, `src/components/home/ThreeCountries.tsx` 1.132, `src/components/scenes/SetupScenes.tsx` 981, `src/components/Footer.tsx` 471. 195 `.tsx` dosyasının 82'si `"use client"`.
- Ne eksik: menü ve footer her sayfada istemci bileşeni; hareket kitaplığı (131 KB ham, 45 KB sıkıştırılmış) her sayfada. Dinamik içe aktarma yalnız dört yerde (Lenis, SIC verisi, IFZA verisi, başlat penceresi).
- Seçenekler: footer'ı sunucu bileşenine çevirip yalnız açılır kısmı istemcide bırakmak; menü panellerini ilk açılışta `import()` ile getirmek; ekran altındaki ağır sahneleri (`SetupScenes`, `ThreeCountries`, `FitTest`) `next/dynamic` ile ayırmak; hareketi CSS'e taşımaya devam etmek (33abc0f ve 066de40 commitlerindeki yön).
- Risk: orta-yüksek (hidratasyon, tuzaklar A). Etki: yüksek. Hangi betiğin gerçekten kullanılmadığı ölçülmedi; bunun için tarayıcıda kapsam (coverage) ölçümü gerekir.

### B3. Yazar sayfası yok

- Nerede: yok. Yazar kartı yazının içinde (`src/app/blog/[slug]/page.tsx:682-700`).
- Ne eksik: rehber bölüm 3 ve 5.5: yazar sayfası (`ProfilePage` + `Person`, aynı `@id`, LinkedIn, uzmanlık alanları), yazıdaki `author.url` oraya. Sekiz yazının sekizi Murat Ortaç imzalı ve bağlanacak sayfa yok.
- Karar: ayrı bir `/yazar/murat-ortac` sayfası mı, yoksa `/hakkimizda`'da çapalı bir bölüm mü. Kişi bilgileri (unvan, LinkedIn, uzmanlık) Murat Bey'den teyitli gelmeli.
- Risk: düşük. Etki: yüksek (güven sinyali).

### B4. Yazıların tarihi: hepsi aynı gün, güncelleme tarihi yok

- Nerede: `src/lib/blogYazilar/*.ts` (`publishedAt: "2026-10-09"`, sekiz yazıda; `updatedAt` hiçbirinde yok).
- Ne eksik: yazılar eski siteden aynı adresle taşındı ama ilk yayın tarihleri bırakıldı. Arama motoru için sekiz yazı aynı gün doğmuş görünüyor; "güncellendi" satırı da ekrana çıkmıyor. Rehber bölüm 5.5, 5.7 ve 13: güncelleme tarihi görünür olsun, yazı "şu tarih itibarıyla" desin.
- Karar: eski sitedeki ilk yayın tarihleri bulunabiliyorsa `publishedAt` o tarih, `updatedAt` 2026-10-09 olmalı. Bulunamıyorsa bugünkü hâl kalır; tarih uydurulmaz.
- Risk: düşük. Etki: orta.

### B5. Başlıklar ve açıklamalar uzun, ayıraç ve harf düzeni karışık

- Ne eksik: 60 sayfanın 30'unda başlık 60 karakteri geçiyor (ölçüldü). En uzunlar: `/araclar/ingiltere-isim-sorgulama` 88, `/` 79, `/ingiltere/aml-uyum` 79, `/kktc/aml-uyum` 79, `/ulkeler` 78, `/araclar/ingiltere-sic-kodu` 77, `/ingiltere/muhasebe` 75, `/dubai/muhasebe` 74, `/kaynaklar` 74. Açıklamaların 20'si 160 karakteri geçiyor; en uzunlar `/sektorler/finans-ve-yatirim` 199, `/blog` 198, `/sektorler/yazilim-ve-teknoloji` 193. Ayıraç dört çeşit (uzun tire, iki nokta, orta nokta, dik çizgi); harf düzeni bazı sayfalarda her kelime büyük, bazılarında cümle düzeni. Rehber bölüm 9b, 11 ve 14.
- Kaynaklar: `src/app/layout.tsx:26`, `src/app/page.tsx:19`, `src/app/ulke/[slug]/page.tsx:48`, `src/app/ulkeler/page.tsx:13`, `src/app/kaynaklar/page.tsx:27`, `src/lib/sectors.ts:380` ve beş eşi, `src/lib/tools/catalog.ts` (araç başlıkları), hizmet içerik dosyaları (`src/lib/accounting*.ts`, `aml*.ts`).
- Öneri: tek ayıraç (iki nokta + dik çizgi), başlık düzeni, 60 karakteri geçen yerde " | Ortac Global" eki düşer. Rehber başlığı Search Console sorgularına bakarak yazmayı söylüyor; alan adı taşınmadan o veri yeni adresler için yok, eski sitenin sorgu listesi kullanılabilir.
- Risk: düşük (yalnız metin). Etki: orta. Metin kararı Burak'ta.

### B6. Hizmet ve ülke sayfalarından bloga bağlantı yok

- Ne eksik: yazılar hizmet sayfalarına bağlanıyor (yazı başına 11-24 iç bağlantı) ama ters yön yok. Ölçüldü: `/dubai`, `/ingiltere`, `/kktc` ve beş Dubai hizmet sayfasının ham HTML'inde `/blog/...` bağlantısı sıfır. Yazılar yalnız ana sayfa, blog dizini ve birbirlerinden bağlantı alıyor (yazı başına 5-11 sayfa). Rehber bölüm 5.8 ve 8b: iki yönlü, bağlam içi.
- Öneri: ülke ve hizmet sayfalarının sonuna, o ülkenin yazılarından iki üç kart ya da SSS cevaplarının içine metin bağlantısı. Yeni bölüm eklemek akışa dokunmak demek; karar Burak'ta.
- Risk: düşük-orta. Etki: orta.

### B7. Hiç bağlantı almayan sayfalar

- Ne eksik: `/basinda-biz` site haritasında ama 66 sayfanın hiçbirinden bağlantı almıyor (ölçüldü: 0). `/kariyer` ve `/kvkk` de 0 (ikisi dizin dışı). `/araclar/bae-kdv` ve `/araclar/isim-ureteci` yalnız 1 sayfadan, sektör sayfalarının dördü 3 sayfadan bağlantı alıyor. Rehber bölüm 1: yetim sayfa olmasın.
- Öneri: `/basinda-biz` footer dizinine ya da `/hakkimizda`'ya; sektör sayfaları ilgili hizmet sayfalarından. `/kvkk` hukukçu onayı gelince footer'a (rehber bölüm 8: alt bilgide KVKK bağlantısı; formlar şu an kişisel veri topluyor).
- Risk: düşük. Etki: orta.

### B8. Başlıktaki çift metni tümden kaldırmak

- Nerede: `src/components/shared/SplitWords.tsx`.
- Ne eksik: A8'deki boşluk bitişikliği giderir, tekrarı gidermez; ham metinde başlık yine iki kez durur. Ayrıca animasyonlu kopya sunucudan `opacity: 0` ile geliyor: betik çalışmazsa başlık ekranda görünmez (ham HTML'de `style="...opacity:0;transform:translateY(110%)"`).
- Seçenekler: gizli kopyayı kaldırıp kelime aralarındaki gerçek boşluklara güvenmek (ekran okuyucu kelime kelime okuyabilir, denenmeli); ya da görünmezliği yalnız betik yüklendikten sonra vermek.
- Risk: orta (erişilebilirlik ağacı, tuzaklar G ve AA). Etki: orta.

### B9. Hakkımızda sayfasında künye soruları yok

- Nerede: `src/app/hakkimizda/page.tsx`.
- Ne eksik: künye bilgileri sayfada var (ticari isim, üç tüzel kişilik, kuruluş yılı 1996, 700'den fazla şirket) ama tanım listesi olarak; soru başlığı ve `FAQPage` yok. Rehber bölüm 4: yapay zeka marka sorusunda en çok bu sayfaya bakar; "Ortac Global nedir, ne zaman kuruldu, nerede, ne yapar" soruları özneli ve rakamlı cevaplarla dursun.
- Öneri: mevcut künyeyle aynı olgulardan 5-6 soru, SSS akordeonu (`src/components/shared/SssAkordeon.tsx`) ve `FAQPage`. Yeni bölüm, tasarım kararı.
- Risk: düşük. Etki: orta.

### B10. Hizmet sayfalarında "kısaca" bloğu yok

- Ne eksik: ölçüldü: beş Dubai hizmet sayfasında ve üç ülke sayfasında "kısaca" geçmiyor. Giriş cümlesi var ("Defterinizi kendi lisansımızla tutuyoruz...") ama rehberin istediği dörtlü (kim için, ne teslim edilir, ne kadar sürer, kaç para) tek yerde toplu değil. Rehber bölüm 4 ve 8e.
- Not: hafızadaki kurallar bölümü yazı yığınına çevirmemeyi söylüyor; aynı bilgi mevcut SSS'e iki soru olarak da eklenebilir (rehber buna izin veriyor).
- Risk: düşük. Etki: orta.

### B11. Eski örnek yazı şablona uymuyor

- Nerede: `/blog/dubaide-sirket-kurmanin-maliyet-kalemleri` (`src/lib/blog.ts:569`).
- Ne eksik: ölçüldü: özet kutusu yok, sekiz başlığın hiçbiri soru değil, SSS yok, dış kaynak 0, iç bağlantı 3, tablo 0. Öteki sekiz yazıda bunların hepsi var.
- Öneri: ya şablona göre yeniden yazılır ya da dizin dışına alınır.
- Risk: düşük. Etki: düşük-orta.

### B12. İki yazı adresi

- `/blog/gelir-vergisi-olmayan-ulkeler-2025`: adreste 2025, başlıkta 2026. Rehber bölüm 2: adreste yıl kullanma.
- `/blog/dubai-is-fikirleri-en-karlı-is-imkanlari`: adreste Türkçe "ı" harfi; paylaşıldığında `%C4%B1` olarak görünür.
- İkisi de eski sitenin adresi ve bilerek korundu (`src/lib/blogYazilar/dubaiIsFikirleri.ts:5`: "Google'daki sıra korunsun"). Değiştirilirse eski adresten 301 şart. Öneri: taşınmadan sonraki ilk ay dokunmamak, sıralar oturunca yılsız ve ASCII adrese 301 ile geçmek.
- Risk: orta. Etki: düşük.

### B13. Ülke sayfalarının HTML'i ağır

- Ölçüldü: `/dubai` 435 KB ham (57 KB sıkıştırılmış), içinde 251 satır içi SVG ve 144 KB RSC verisi; `/ingiltere` 369 KB, `/kktc` 321 KB. Önceki turda da yazılmıştı. Çözüm B2 ile aynı yerden geçiyor (ağır sahneleri ayırmak).
- Risk: orta. Etki: orta.

### B14. Taşınma günü ve sonrası (başkasının işi ya da bekleyen)

- Ölçüm kodu hâlâ yok (`src/app/layout.tsx:69`, `SWAP:GTM_ID`). Rehber bölüm 8c: görünürlük değil dönüşüm ölçülür; yapay zekadan gelen ziyaret ayrıca izlenir.
- Search Console ve Bing Webmaster'a site haritası; Google için URL denetimiyle dizin isteği; IndexNow (Bing, ChatGPT araması için). Rehber bölüm 10 ve 11.
- Google İşletme Profili ve gerçek müşteri yorumu. Rehber bölüm 15.
- Paylaşım görseli adresi `https://ortacglobal.com/og.png`; alan adı bağlanana kadar o adreste dosya yok, geçici adresten yapılan paylaşımlar görselsiz çıkar. Taşınınca kendiliğinden düzelir.
- Formda "Bizi nereden duydunuz?" alanı yok (rehber bölüm 8d). Form alanı eklemek tasarım kararı.

---

## Rehbere göre yolunda olanlar

- Asıl içerik ham HTML'de; SSS cevapları kapalıyken de HTML'de duruyor (`/` ve `/dubai`'de cevap metni `curl` çıktısında arandı, bulundu).
- 66 sayfanın hepsinde tek `<main>`, tek h1; aynı h1'i, başlığı ya da açıklamayı paylaşan iki sayfa yok.
- Haritadaki 60 adresin 60'ı 200; hepsinde kanonik kendini gösteriyor. Harita dışı örnek sayfalar `noindex, follow`.
- robots.txt her bota açık, yasak yol yok; dört bot kullanıcı ajanıyla 200 alındı.
- Yönlendirmeler tek atlama ve kalıcı: `/dubai/` 308, `/ulke/dubai` 308, `/kibris/hizmetler/muhasebe` 308, `/dubai/sirket-kurulusu` 308. `/DUBAI` 404.
- Sekiz taşınan blog yazısı: özet kutusu, 7-11 soru başlığı, 1-5 tablo, SSS + tek `FAQPage`, 2-12 dış kaynak, 11-24 iç bağlantı, yazar kartı, tarih. En uzun bölüm 294 kelime; 375 sınırını aşan bölüm yok.
- 21 sayfada (hizmet ve sektör) `Service` + `FAQPage` basılıyor ve soru sayısı ekrandakiyle aynı diziden geliyor.
- Görseller: `find public -size +200k` boş; fotoğraflar `next/image` + srcset; ham `<img>` yedi yerde ve A10'daki dışında hepsi ölçülü. Boş alt metinli görseller süs fotoğrafı.
- Yazı tipi `next/font` ile kendi alan adından, `display: swap`, 8 dosya 54 KB.
- Üçüncü taraf betik yok.
- Form alanları etiketli (66 sayfada etiketsiz tek alan iletişim formundaki gizli tuzak alanı, o da `aria-hidden`); adsız düğme ve adsız bağlantı bulunmadı; `lang="tr"`.
- Ana sayfa giriş fotoğrafının tembel yüklenmesi bilinçli karar ve gerekçesi ölçümle yazılı (`src/components/home/HeroAkis.tsx:123`). Tekrar tartışılmasın.

## Bakılmayan ve ölçülmeyenler

- Gerçek LCP, CLS, INP ve kullanılmayan CSS/JS oranı (tarayıcı ölçümü gerekir).
- Rich Results Test ve Schema Validator (dış araç).
- Kelime hacmi, sıralama, tıklama oranı (Search Console verisi yok).
- Dış bağlantıların durumu bu turda yeniden denenmedi (önceki turda denendi).
- `/lab`, `/teyit`, `/lp` sayfaları kapsam dışı; dizin dışı oldukları önceki turda doğrulandı.
