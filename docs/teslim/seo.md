# SEO denetimi · teslim öncesi

Tarih: 08.10.2026. Bakılan adres: https://ortac-global-site.vercel.app (geçici). Kalıcı adres: ortacglobal.com (orada şu an eski site duruyor).

**Kısa cevap:** Sayfaların kendisi sağlam (hepsi açılıyor, başlıklar tekil, kırık bağlantı yok). Yanlış olan şeyler sayfa içinde değil, çevresinde: geçici adres Google'a açık, en önemli 14 sayfada "asıl adres" etiketi yok, aynı içerik ikinci bir adresten de açılıyor, örnek kayıtlarla dolu birkaç sayfa dizine açık, sekme simgesi hâlâ Vercel'in üçgeni. Aşağıdaki on madde küçük işler; hiçbiri tasarıma dokunmuyor.

## Nasıl bakıldı

- Site haritasındaki 54 adresin hepsi tek tek çekildi. Ayrıca 107 adres daha denendi: iç sayfalar (/lab, /teyit, /lp), örnek blog yazıları, olmayan adresler, büyük harfli ve eğik çizgili yazımlar, /ulke altındaki eski adresler.
- Her sayfada bakılanlar: durum kodu, başlık, açıklama, asıl adres etiketi (canonical), dizin etiketi (robots), paylaşım etiketleri (og), h1 sayısı, başlık sırası, dil, yapılandırılmış veri (JSON-LD), görsel alt metinleri, sayfadaki bağlantılar.
- Eski sitenin (ortacglobal.com) site haritası da okundu, taşınma listesi oradan çıktı.
- Kod değişmedi, derleme alınmadı. İstekler en çok üçer üçer atıldı.

## Hemen düzeltilecekler

1. **Geçici adres Google'a açık.**
   - Ne yanlış: vercel.app adresinde "dizine alma" diyen hiçbir şey yok, robots.txt her şeye izin veriyor. 39 sayfa asıl adres olarak ortacglobal.com'u gösteriyor ama o adreslerin çoğu eski sitede şu an 404 (denendi: /kktc, /araclar, /dubai/muhasebe), yani Google bu işareti yok sayabilir.
   - Dosya: `next.config.ts:3` (ayar nesnesi; şu an `headers` yok).
   - Düzeltme: `headers()` ekleyip yalnız `ortac-global-site.vercel.app` hostunda `X-Robots-Tag: noindex, nofollow` bas (`has: [{ type: "host", ... }]`); ortacglobal.com'da kendiliğinden devre dışı kalır, taşınma günü bir şey çevirmek gerekmez.
   - Not: adresin şu an dizine girip girmediği bu oturumda doğrulanamadı. Google'da `site:ortac-global-site.vercel.app` yazıp elle bakın.

2. **En önemli 14 sayfada asıl adres etiketi (canonical) yok.**
   - Ne yanlış: `/`, `/dubai`, `/ingiltere`, `/kktc`, `/ulkeler`, `/dubai/banka-hesabi`, `/dubai/oturum-vize`, `/dubai/vergi`, `/dubai/kurumsal-danismanlik`, `/dubai/aml-uyum`, `/ingiltere/banka-hesabi`, `/ingiltere/vergi`, `/kktc/banka-hesabi`, `/kktc/vergi`. Bu yüzden `/index`, `/?utm_source=...` ve `/dubai?x=1` aynı içerikle 200 dönüyor ve ayrı sayfa sayılabilir.
   - Dosyalar: `src/app/page.tsx` (metadata hiç yok), `src/app/ulke/[slug]/page.tsx:39`, `src/app/ulke/[slug]/[hizmet]/page.tsx:35`, `src/app/dubai/banka-hesabi/page.tsx:43`, `src/app/dubai/oturum-vize/page.tsx:61`, `src/app/ingiltere/banka-hesabi/page.tsx:9`, `src/app/kktc/banka-hesabi/page.tsx:16`, `src/app/ulkeler/page.tsx:11`.
   - Düzeltme: öteki 39 sayfadaki kalıbın aynısı, `alternates: { canonical: ... }` ekle; ülke şablonunda `${SITE}/${slug}`, hizmet şablonunda `${SITE}/${slug}/${hizmet}`, ana sayfada `${SITE}/`.

3. **Aynı içerik `/ulke/...` adresinden de açılıyor (19 adres).**
   - Ne yanlış: `/ulke/dubai`, `/ulke/ingiltere`, `/ulke/kktc` ve 16 hizmet adresi 200 dönüyor, dizine açık, asıl adres etiketi yok. Yedisi yeni sayfanın yerine ESKİ genel şablonu gösteriyor: `/ulke/dubai/muhasebe`, `/ulke/dubai/banka-hesabi`, `/ulke/dubai/oturum-vize`, `/ulke/ingiltere/muhasebe`, `/ulke/ingiltere/banka-hesabi`, `/ulke/kktc/muhasebe`, `/ulke/kktc/banka-hesabi`.
   - Dosya: `next.config.ts:3` (şu an `redirects` yok).
   - Düzeltme: `redirects()` ekle, `/ulke/:slug` → `/:slug` ve `/ulke/:slug/:hizmet` → `/:slug/:hizmet`, kalıcı. `/dubai` sayfası bileşeni dosyadan içe aktardığı için bozulmaz.

4. **Kapalı sayılan dört hizmet sayfası dizine açık.**
   - Ne yanlış: `/ingiltere/kurumsal-danismanlik`, `/ingiltere/aml-uyum`, `/kktc/kurumsal-danismanlik`, `/kktc/aml-uyum`. Dolaşım defterinde ve haritada yoklar ama 200 dönüyorlar ve "dizine alma" etiketi taşımıyorlar.
   - Dosya: `src/app/ulke/[slug]/[hizmet]/page.tsx:35`.
   - Düzeltme: `generateMetadata` içinde adres `isLive()` değilse `robots: { index: false, follow: true }` döndür.

5. **Yalnız "Örnek" kayıt gösteren sayfalar dizine açık ve haritada.**
   - `/gelismeler`: 22 kaydın 22'si örnek (tarihli mevzuat başlıkları). `src/app/gelismeler/page.tsx:74`.
   - `/e-kitaplar`: gerçek dosya yok, kartların hepsi örnek. `src/app/e-kitaplar/page.tsx:53`.
   - `/kariyer`: ilanlar örnek, açıklama ise "açık pozisyonlar" diyor. `src/app/kariyer/page.tsx:83`.
   - `/blog/kategori/kurulus-sonrasi`, `/sektor-notlari`, `/ulke-rehberi`, `/yapi-ve-ulke-secimi`: yayınlanmış yazı sayısı 0. `src/app/blog/kategori/[kategori]/page.tsx:67`.
   - Düzeltme: gerçek kayıt gelene kadar bu sayfalara `robots: { index: false, follow: true }` (kategoride koşul `publishedOfCategory(category).length === 0`) ve aynı adresleri `src/app/sitemap.ts:43` içindeki `HARITA_DISI` listesine ekle.
   - Not: sitemap.ts'teki "gelişmeler ve e-kitaplar bugün boş" yorumu eskimiş; sayfalar örnek kayıtla dolu.

6. **`/kvkk` haritada ama "dizine alma" etiketli.**
   - Ne yanlış: arama motoruna iki çelişen işaret gidiyor.
   - Dosya: `src/app/sitemap.ts:43`.
   - Düzeltme: `HARITA_DISI` listesine `["/kvkk", "noindex"]` satırı.

7. **Sekme simgesi Vercel'in varsayılan üçgeni.**
   - Ne yanlış: `favicon.ico` proje ilk kurulduğundaki dosya (siyah daire, beyaz üçgen); tarayıcı sekmesinde ve Google sonucunda bu çıkar.
   - Dosya: `src/app/favicon.ico`.
   - Düzeltme: Ortac işaretiyle değiştir, yanına `src/app/apple-icon.png` (180x180) koy.

8. **Paylaşım görseli ve paylaşım etiketleri eksik.**
   - Ne yanlış: 54 sayfanın 26'sında og etiketi hiç yok (ana sayfa, üç ülke sayfası, blog dizini dahil); görsel yalnız tek sayfada var (blog yazısı). WhatsApp ya da LinkedIn'de paylaşılan bağlantı görselsiz, bazısı başlıksız çıkar. Depoda paylaşım görseli dosyası da yok.
   - Dosya: `src/app/layout.tsx:19`.
   - Düzeltme: 1200x630 bir görsel hazırla; layout'a `metadataBase` ve varsayılan `openGraph` (siteName, locale `tr_TR`, type `website`, images) ekle. Kendi `openGraph`'ını yazan 28 sayfaya da aynı `images` satırı eklenmeli, çünkü alt sayfanın `openGraph`'ı üsttekini tümden eziyor.

9. **Kuruluş adresinin yönlendirmesi geçici (307).**
   - Ne yanlış: `/dubai/sirket-kurulusu` ve `/ingiltere/sirket-kurulusu` ülke sayfasına 307 ile gidiyor; koddaki yorum "kalıcı" diyor.
   - Dosya: `src/app/ulke/[slug]/[hizmet]/page.tsx:81`.
   - Düzeltme: `redirect` yerine `permanentRedirect` (308).

10. **Muhasebe sayfalarında hizmet adı olarak sayfa başlığı basılıyor.**
    - Ne yanlış: `/ingiltere/muhasebe` ve `/kktc/muhasebe` sayfalarının yapılandırılmış verisinde hizmetin adı "... | Ortac Global" diye bitiyor.
    - Dosya: `src/components/services/MuhasebeSayfa.tsx:59`.
    - Düzeltme: `C.seo.title` yerine kısa bir hizmet adı ver (Dubai sayfasında böyle: `src/app/dubai/muhasebe/page.tsx:181`).

## Alan adı taşınırken yapılacaklar

- **Eski adresler yönlendirilmeli.** Eski sitede 69 Türkçe ve 69 İngilizce (`/en/...`) adres var. Yenide birebir aynı kalan yalnız 8'i: `/`, `/dubai`, `/ingiltere`, `/hakkimizda`, `/iletisim`, `/blog`, `/basinda-biz`, `/sektorler/e-ticaret`. Kalan 130 adres yönlendirme yazılmazsa 404 olur.
- **Önerilen yönlendirmeler** (`next.config.ts` içinde, kalıcı):
  - `/kibris` → `/kktc`
  - `/kibris/hizmetler/sirket-kurma` → `/kktc`
  - `/kibris/hizmetler/muhasebe` → `/kktc/muhasebe`
  - `/kibris/hizmetler/bankacilik-ve-odeme-sistemleri` → `/kktc/banka-hesabi`
  - `/dubai/hizmetler/sirket-kurma` → `/dubai`
  - `/dubai/hizmetler/muhasebe` → `/dubai/muhasebe`
  - `/dubai/hizmetler/dubai-vize-oturum-izni-ve-yatirimci-kimligi` → `/dubai/oturum-vize`
  - `/dubai/hizmetler/bankacilik-ve-odeme-sistemleri` → `/dubai/banka-hesabi`
  - `/dubai/hizmetler/pazar-arastirmasi` ve `/dubai/hizmetler/hukuki-danismanlik` → `/dubai/kurumsal-danismanlik` (öneri, karar sizde)
  - `/ingiltere/hizmetler/sirket-kurma` → `/ingiltere`
  - `/ingiltere/hizmetler/bankacilik-ve-odeme-sistemleri` → `/ingiltere/banka-hesabi`
  - `/sektorler/finansal-hizmetler` → `/sektorler/finans-ve-yatirim`
  - `/sektorler/bilisim-teknoloji-ve-medya` → `/sektorler/yazilim-ve-teknoloji`
  - `/sektorler/gayrimenkul-ve-insaat` → `/sektorler/gayrimenkul`
  - `/sektorler/saglik-hizmetleri` → `/sektorler/saglik-ve-medikal`
  - `/sektorler/tuketici-urunleri-ve-perakende` → `/sektorler/e-ticaret` (öneri)
  - `/musteriler` → `/hakkimizda` (öneri)
  - `/legal/privacy-policy` → `/kvkk`; `/legal/terms-conditions` için karar gerekli
  - `/en` ve `/en/...` → Türkçe karşılığı (yeni sitede İngilizce yok)
- **41 eski blog yazısı.** Yeni sitede gerçek yazı sayısı 1. İki yol var: yazıları aynı `/blog/<adres>` ile taşımak (en temizi, birikmiş değer korunur) ya da her birini ilgili ülke ya da hizmet sayfasına yönlendirmek. Eski site kapanmadan içerikleri dışa aktarın.
- **Alan adı ayarı.** ortacglobal.com ve www birlikte eklenmeli, www çıplak ada yönlenmeli (asıl adres etiketleri çıplak adı yazıyor, eski site de böyle çalışıyor). Kalıcı barındırma Vercel olmayacaksa http → https, www ve sondaki eğik çizgi yönlendirmesi sunucuda ayrıca kurulmalı.
- **vercel.app adresi.** Taşınınca ya ortacglobal.com'a yönlendirin ya da 1. maddedeki başlığı bırakın; ikisi de yeterli.
- **Search Console.** Alan adını doğrulayın, yeni `/sitemap.xml` dosyasını gönderin (eski sitenin `sitemap_tr.xml` ve `sitemap_en-GB.xml` dosyaları kalkacak), ilk hafta "bulunamadı" raporunu izleyin.
- **Ölçüm kodu.** `src/app/layout.tsx:52` hâlâ `SWAP:GTM_ID`. Takılmadan geçilirse taşınma öncesi ve sonrası kıyaslanamaz.
- **Blog yazısının tarihi yer tutucu.** `src/lib/blog.ts:549` (`SWAP:BLOG_DATES`); bu tarih yapılandırılmış veride yayın tarihi olarak da basılıyor. Gerçek tarih gelsin.
- **`/kvkk`.** Hukukçu onayı gelince "dizine alma" etiketi kalkar ve footer'a bağlantısı eklenir; şu an hiçbir sayfadan bağlantı almıyor.
- **Geçiş günü kontrol.** Bu denetim ortacglobal.com'a karşı yeniden çalıştırılmalı: haritadaki her adres 200 mü, asıl adres etiketi kendini mi gösteriyor, robots.txt doğru alan adını mı yazıyor.

## Taşındıktan sonraki tura kalabilir

- **Menü bağlantıları sayfanın HTML'inde yok.** Üst menüde yalnız iki bağlantı duruyor (`/` ve `/basla`), paneller açılınca çiziliyor. Arama motoru sayfaları footer'daki 26 bağlantıdan ve gövdeden buluyor. `/basinda-biz` ve `/kariyer` hiçbir sayfadan bağlantı almıyor; sektör sayfaları yalnız 2, araç sayfaları yalnız 1 sayfadan alıyor. Dosya: `src/components/NavIstemci.tsx`. Bu listedeki en önemli madde.
- **Başlıklar uzun.** 54 başlığın 24'ü 60 karakteri geçiyor (en uzunu 88, ana sayfa 79); Google keser. Açıklamaların 15'i 160'ı geçiyor (en uzunu 199).
- **Başlık ayıracı karışık.** Uzun tire, iki nokta, orta nokta ve dik çizgi birlikte kullanılıyor. Kural meta başlıkta uzun tireye izin veriyor ama ana sayfa başlığından 03.10'da kaldırılmıştı; tek ayıraca inmek iyi olur.
- **Ana sayfa h1'i iki kez okunuyor.** Gizli tam metin ile görünen animasyonlu kopya aynı h1'in içinde; ayrıca cümlede hizmet ya da ülke adı geçmiyor. Dosyalar: `src/components/shared/SplitWords.tsx:47` ve `:88`, `src/components/home/HeroAkis.tsx:146`.
- **Ülke sayfalarında sayfaya özel yapılandırılmış veri yok.** `/dubai`, `/ingiltere`, `/kktc` ve genel hizmet şablonu yalnız layout'taki genel düğümü taşıyor; sayfada SSS bölümü var ama veri olarak basılmıyor.
- **Genel kurum düğümü zayıf.** Logo, sosyal hesaplar ve kimlik (`@id`) yok; `/hakkimizda` ve `/iletisim` sayfalarındaki ayrıntılı kurum düğümüyle bağlı değil. Site düğümü (WebSite) hiç yok. Dosya: `src/app/layout.tsx:30`.
- **Genel hizmet şablonunun açıklaması.** "Fiyat kalemleri" diyor ama bu sayfalar fiyatsız; üç ülkenin vergi, danışmanlık ve uyum sayfaları yalnız ülke adı değişen aynı cümleyi kullanıyor. Dosya: `src/app/ulke/[slug]/[hizmet]/page.tsx:42`.
- **Görsel alt metinleri boş.** 102 görselin 99'unda alt metin boş bırakılmış. Süs fotoğrafı için doğru; blog kapağı ve hakkımızda fotoğraflarına kısa açıklama yazılabilir.
- **Ana sayfa giriş fotoğrafı sonradan yükleniyor.** Bilinçli karar (`src/components/home/HeroAkis.tsx:123`); taşınınca gerçek kullanıcı ölçümüyle bir kez doğrulanmalı.
- **Fotoğraflar Unsplash adresinden geliyor.** Görsel aramasında değer ortacglobal.com'a yazılmaz; blog paylaşım görseli de dış adres.
- **Ülke sayfalarının HTML'i ağır.** `/dubai` 417 KB, `/ingiltere` 356 KB, `/kktc` 307 KB.
- **Uygulama simgesi ve manifest yok.** Telefonda ana ekrana eklenince simge çıkmaz.
- **Alt düzey 404.** `/dubai/olmayan` gibi adreslerde durum kodu doğru (404) ama görünen 404 içeriği tarayıcıda çiziliyor.
- **Kök adres 16 dosyada elle yazılı.** `const SITE` tekrar ediyor; `src/lib/routes.ts:27`'deki tek sabite bağlanmalı.
- **`/blog` ve `/kaynaklar`.** 15 yazının 14'ü örnek kart. Dizin sayfaları açık kalabilir; gerçek yazı geldikçe düzelir.

## Yolunda olanlar

- Haritadaki 54 adresin 54'ü 200 dönüyor; haritada yönlendirme ya da 404 yok.
- Her sayfada tam bir h1 var, başlık sırası düzgün, dil `tr`, Türkçe karakterlerde bozulma yok.
- Aynı başlığı ya da açıklamayı paylaşan iki sayfa yok.
- Asıl adres etiketi olan 39 sayfanın hepsi doğru adresi gösteriyor.
- `/lab/*`, `/teyit/*`, `/lp/*`, `/basla` hem "dizine alma" etiketli hem harita dışında.
- 14 örnek blog yazısı "dizine alma" etiketli, harita dışında ve yazı verisi (Article) basmıyor.
- 404 gerçekten 404 dönüyor (`/olmayan-sayfa` ve alt düzey adresler) ve dizine kapalı.
- Sondaki eğik çizgi tek adrese yönleniyor (308), büyük harfli yazım 404, http https'e gidiyor.
- Sayfalardaki 72 iç bağlantının hepsi açılıyor, sayfa içi çapaların hepsinin karşılığı var; 20 dış bağlantının (basın haberleri dahil) denenen hepsi açılıyor.
- Yapılandırılmış veri her sayfada geçerli; kırıntı sırası doğru, SSS kayıtlarında boş cevap yok; basın kayıtları gerçek.
- Eski adres yönlendirmeleri kalıcı: `/rehberler`, `/blog/rehberler`, `/araclar/kurumlar-vergisi` (308).
- Görseller `next/image` ile, 24 sayfada giriş görseli önden yükleniyor; `public/` toplam 88 KB, 500 KB üstü dosya yok.
