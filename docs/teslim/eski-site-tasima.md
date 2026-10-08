# Eski siteden yeni siteye taşınacaklar

Tarama tarihi: 08.10.2026. Eski site: https://ortacglobal.com (Framer üzerinde, ana sayfanın son değişikliği 12.08.2026). Yeni site: bu depo, geçici adres https://ortac-global-site.vercel.app.

Nasıl bakıldı: eski sitenin site haritası, robots dosyası, 74 Türkçe sayfanın tamamı, 17 İngilizce sayfa, sitenin kendi arama dizini, yayındaki GTM kabı ve alan adının açık DNS kayıtları okundu. Yeni sitede `src/lib/routes.ts`, `src/app/sitemap.ts`, `src/lib/offices.ts`, `src/lib/brand.ts`, `src/app/kvkk`, `src/app/layout.tsx` ve canlı site haritası okundu. Bu tarama depoda kod değiştirmedi.

Not: tarama sürerken depoda ayrı bir "teslim öncesi SEO turu" çalışıyordu (commit edilmemiş değişiklikler). Aşağıdaki "yeni site" bilgileri 08.10.2026 akşamı canlıda olan hâle göre. O turun ele aldığı maddeler yanlarında "süren turda" diye işaretli.

## Sayılar

- Eski sitede 148 canlı adres var: 74 Türkçe, 74 İngilizce (`/en/` altında aynı sayfalar).
- Site haritasında 138 adres yazıyor (69 + 69). Haritada olmayan 5 sayfa daha açık: `/fiyat-teklifi`, `/kariyer`, `/privacy-policy`, `/ingiltere/hizmetler/muhasebe`, `/tesekkurler`.
- 74 Türkçe adresin dağılımı: 1 ana sayfa, 3 ülke sayfası, 12 hizmet sayfası, 6 sektör sayfası, 41 blog yazısı, 11 diğer sayfa.
- Blog: 41 yazı, hepsi 2025 tarihli (19.05.2025 ile 22.10.2025 arası). 36'sı dört günde yayımlanmış (19-22 Mayıs 2025).
- Basın: 9 kayıt. Kariyer: 1 açık ilan. İndirilebilir dosya: 4 PDF.
- Yeni sitenin canlı haritasında 54 adres var.
- 74 eski Türkçe adres yeni sitede tek tek denendi: 9'u açılıyor, 65'i "sayfa bulunamadı" veriyor. İngilizce 74 adresin hiçbirinin karşılığı yok.

## Kesin taşınacaklar

### 1. Başvuru yolları (en önemli eksik)

Eski sitede çalışan dört başvuru yolu var. Yeni sitede çalışan form yok: iletişim formu, `/basla` akışı, kariyer formu ve iş ortaklığı formu bilerek kapalı, hiçbir bilgi bir yere gitmiyor. Yeni site bu hâliyle alan adına taşınırsa siteden başvuru gelmez, yalnız telefon, WhatsApp ve e-posta bağlantıları çalışır.

- İletişim formu (`/iletisim`): ad, e-posta, telefon, konu, mesaj. Framer'ın kendi formu. Başvurunun hangi adrese düştüğü sayfadan görülemiyor.
- Fiyat teklifi formu (`/fiyat-teklifi`): Youform ile gömülü, form kimliği `5e9vogc9`. Sitedeki bütün "Fiyat Teklifi Al" düğmeleri buraya gidiyor.
- İkinci Youform formu: `l4agoug2`. Yalnız `/dubai/hizmetler/sirket-kurma` sayfasındaki "Hemen Başla" düğmesinde.
- Görüşme randevusu: `https://calendly.com/ortacglobal/15dk` (15 dakikalık görüşme). "Görüşme Planlayın" düğmesi hemen her sayfada.
- Bülten aboneliği: 22 sayfanın altında e-posta kutusu var (ana sayfa, ülke, hizmet, sektör ve müşteriler sayfaları). Framer formu. Abone listesinin nerede tutulduğu görülemedi.

Yapılacak: yeni sitede en az iletişim formu ile `/basla` akışı bir alıcıya bağlanmalı. Youform ve Calendly hesapları siteden bağımsız, kapanmaz. İstenirse yeni sitede aynı bağlantılar kullanılabilir.

### 2. Teşekkür sayfası

- Eski sitede `/tesekkurler` sayfası var ("Formunuz ulaştı").
- Google Ads dönüşümü bu sayfaya bağlı: adreste "tesekkurler" geçince dönüşüm sayılıyor.
- Yeni sitede bu sayfa yok. Açılmazsa reklam paneli taşımadan sonra sıfır dönüşüm gösterir.
- Yapılacak: yeni sitede form gönderilince `/tesekkurler` adresine gidilsin. Ya da GTM'deki tetikleyici yeni sitenin olayına çevrilsin.

### 3. Müşteri paneli bağlantısı

- Eski sitede her sayfanın sağ üstünde "Müşteri Paneli" düğmesi var. Adresi: `https://ortacaccountingservicesllc.taxdome.com/`
- Yeni sitede "Panel girişi" yazıyor ama `/panel` adresi yok, bağlantı sönük.
- Mevcut müşteriler panele siteden giriyorsa taşıma günü giriş yolu kaybolur.
- Yapılacak: `/panel` bu adrese yönlensin. Ürün adı sitede yazılmadan, yalnız bağlantı olarak.

### 4. Blog yazıları (41 yazı)

- Eski sitedeki 41 yazının hiçbiri yeni sitede yok. Yeni blogda 1 gerçek yazı ve 14 yer tutucu var.
- Arama trafiğini büyük olasılıkla bu yazılar taşıyor. Hangilerinin trafik aldığı Search Console'dan bakılmalı.
- Öneri: yazılar aynı adresle taşınsın (`/blog/aynı-ad`). O zaman yönlendirme gerekmez.
- Dikkat: yazılarda yeni sitenin kurallarıyla çelişen cümleler var ("vergisiz şirket", "%0 kurumlar vergisi", Wise ve Revolut, kesin süreler, "vergi cenneti"). Olduğu gibi kopyalanmamalı, gözden geçirilmeli.
- Yazıların görselleri Framer'ın sunucusunda duruyor. Framer sitesi silinirse görseller de gidebilir. Taşımadan önce indirilmeli.
- Framer panelinden blog içeriği toplu dışa aktarılabilir. En kolay yol bu.
- Teslime yetişmezse: her yazı aşağıdaki haritadaki en yakın sayfaya yönlensin.
- Eski blog kategorileri: Dubai, İngiltere, KKTC ve dört konu (Şirket Kuruluşu, Muhasebe ve Vergi, Finans ve Bankacılık, Oturum İzni ve Yatırımcı Vizesi). Yeni blogda beş farklı kategori var.

### 5. Sosyal medya hesapları

Eski sitenin altında beş hesap var. Yeni sitenin altında hiç sosyal medya bağlantısı yok.

- https://www.instagram.com/ortacglobal/
- https://www.facebook.com/ortacglobal/
- https://www.linkedin.com/company/ortacglobal
- https://www.youtube.com/@OrtacGlobal
- https://www.tiktok.com/@ortacglobal

### 6. Kariyer

- Eski sitede başvuru adresi: `career@ortacglobal.com`. Yeni sitede kariyer e-postası boş.
- Eski sitede 1 gerçek ilan var: Muhasebeci, Muhasebe bölümü, KKTC, ofisten, maaş "tecrübeye göre".
- Yeni sitede 4 ilan var ve dördü de "Örnek" rozetli. Gerçek ilan taşınmalı, örnekler teslimde kalkmalı ya da onaylanmalı.

### 7. İndirilebilir dosyalar (4 PDF)

Eski sitenin altında "Kaynaklar" başlığıyla dört PDF bağlantısı var. Dosyalar ayrı bir sunucuda (`pdf.ortacglobal.com`), eski site kapansa da açık kalır.

| Dosya | Boyut | Son değişiklik |
|---|---|---|
| `pdf.ortacglobal.com/dubai-sirket-kurulus-fiyat.pdf` | 1,6 MB | 07.08.2025 |
| `pdf.ortacglobal.com/ingiltere-sirket-kurulus-fiyat.pdf` | 0,9 MB | 07.08.2025 |
| `pdf.ortacglobal.com/kibris-sirket-kurulus-fiyat.pdf` | 0,5 MB | 07.08.2025 |
| `pdf.ortacglobal.com/ortac-bilgilendirme.pdf` | 5,9 MB | 13.08.2025 |

- Yeni sitede PDF bağlantısı yok, `/e-kitaplar` sayfası boş.
- Karar gerekiyor: bu dosyalar yeni siteye konacak mı, güncellenecek mi, kaldırılacak mı. Üçü fiyat dosyası ve bir yıldan eski. Yeni sitedeki fiyatlarla aynı olmayabilir. Dosyaların içi açılmadı.

### 8. İngilizce adresler

- Eski sitenin 74 sayfasının İngilizce sürümü var (`/en/...`), Google'a da bildirilmiş.
- Çeviri otomatik görünüyor (örnek başlıklar: "In the media we.", "we Who are we?").
- Yeni sitede İngilizce yok.
- Yapılacak: en azından bütün `/en/...` adresleri Türkçe karşılığına yönlensin. İngilizce sürüm istenip istenmediği ayrı karar.

### 9. Paylaşım görseli

- Eski sitede her sayfanın paylaşım görseli var (WhatsApp, LinkedIn önizlemesi).
- Yeni sitede canlıda yalnız blog yazılarında var. Öteki sayfalar paylaşılınca görselsiz çıkar.
- Süren turda: varsayılan paylaşım etiketleri eklenmiş. Görsel dosyası (`app/opengraph-image.tsx`) tarama anında henüz yoktu.

### Zaten taşınmış, yeniden iş yok

- Üç ofisin adresi, telefonu ve e-postası (`src/lib/offices.ts`).
- Basın kayıtları: 9 kaydın 8'i yeni sitede. Dokuzuncunun (ekonomigundemi.com.tr) bağlantısı ölü, bilerek alınmamış.
- İş ortağı logoları: eski sitede 11 logo akıyor (PayPal, Wio, Mashreq, IFZA, wamo, Stripe, Payoneer, Emirates NBD, Binance, Xero, Meydan). Hepsi yeni sitenin ortak listesinde var.
- Sıkça sorulan sorular: yeni sitenin kendi soruları var.

## Çelişen bilgiler

| Konu | Eski site | Yeni site | Not |
|---|---|---|---|
| KKTC cep telefonu | İletişim sayfasında +90 548 841 66 66. Sayfaların gizli kimlik bilgisinde +90 548 844 66 66 | +90 548 841 66 66 (telefon ve WhatsApp) | Eski sitenin kendi içinde iki numara var. Hangisi doğru, teyit edilmeli |
| Deneyim yılı | Muhasebe sayfalarında "17 yıllık", şirket kurma sayfalarında "27 yıllık" | "1996'dan beri", "30 yıllık" | Eski site kendi içinde de tutarsız. Yeni sitedeki esas |
| Müşteri sayısı | "1.200+ mutlu müşteri" | Sayı yok | Doğrulanırsa kullanılabilir. Doğrulanmadan taşınmamalı |
| Dubai kuruluş fiyatı | Üç paket: 4.765, 5.750 ve 6.250 dolar | Paket yok, "5.120 dolardan başlayan" | Yeni site teklif belgesine göre. Eski fiyat PDF'i hâlâ açık |
| Dubai kuruluş süresi | "Ortalama 7 gün", "10 iş günü", "4-5 iş günü", "8-12 iş günü" | 5-6 gün | Yeni site teyitli |
| KKTC kuruluş süresi | "10 günde şirket ve banka hesabı" | 30-40 iş günü | Yeni site teklif belgesine göre |
| İngiltere kuruluş süresi | "24 saatte tescil", "48 saatte şirket ve banka" | 3-7 gün | |
| Vergi söylemi | "%0 kurumlar vergisi", "vergisiz şirket", KKTC için "%0-1" | "Şirket kurmak otomatik vergi avantajı vermez" | Eski metinler yeni sitenin duruşuyla çelişiyor |
| KKTC maliyeti | "Düşük maliyetli" | Üç ülkenin en pahalısı (9.920 avro) | |
| Ödeme sistemleri | Wise ve Revolut bağlantısı. KKTC için PayPal ve Stripe | Wise yok. KKTC'de PayPal, Stripe, Payoneer "desteklenmiyor" | |
| KKTC adı ve adresi | Adreslerde "kibris" (`/kibris`) | "kktc" (`/kktc`) | Yönlendirme şart |
| KKTC ofis adresi | Şht. Murat İlhan Sokak No:5, 039 | İletişimde aynısı. KVKK sayfasında "No:5, Kumsal, KKTC" | Yeni sitede iki yazım var. "039" ne, belli değil |
| Dubai ofis adresi | Saaha Offices B - 304 Souk Al Bahar Bridge | İletişimde aynısı. KVKK sayfasında "Al Saaha Offices Block B No 304" | Yeni sitede iki yazım var |
| Şirket unvanı | Yalnız "ORTAC Global". Harita aramasında "Ortac International Accounting" | Dubai: Ortac Accounting Services LLC. İngiltere: Ortac International Accounting & Tax Services Ltd. KKTC: boş | Eski sitede sicil ya da vergi numarası yok |
| İngiltere e-postası | uk@ortacaudit.com | Aynı | Çelişki yok ama alan adı farklı. Teyit listesinde açık soru |
| Dubai hizmetleri | 6 hizmet. "Pazar Araştırması" ve "Hukuki Danışmanlık" var | Bu ikisi iptal. Vergi, Kurumsal Danışmanlık, AML Uyum eklendi | |
| Sektörler | 6 sektör. "Tüketici Ürünleri ve Perakende" var | 6 sektör. Perakende yok, "Danışmanlık" var | Dört sektörün adresi de değişmiş |
| Kariyer | 1 gerçek ilan (Muhasebeci, KKTC) | 4 örnek ilan | |
| Gizlilik metni | İngilizce "Privacy Policy", 27.10.2025. KVKK ve çerez metni yok | Türkçe KVKK taslağı, hukukçu onayı bekliyor | İkisinde de başvuru adresi info@ortacglobal.com |
| Marka yazımı | "ORTAC", "© 2025 ORTAC" | "Ortac Global", "© 2026" | |

## Yönlendirme haritası (eski adres → yeni adres)

Genel kurallar:

- `www.ortacglobal.com` ve `http://` bugün `https://ortacglobal.com` adresine yönleniyor. Aynı kalmalı.
- Sonu eğik çizgili adresler (`/dubai/`) çizgisiz hâle yönleniyor. Aynı kalmalı.
- Bütün `/en/...` adresleri: aşağıdaki tabloda Türkçe adresin gittiği yere.
- Hedeflerin hepsi yeni sitede açık, tek tek denendi. Tek istisna `/panel` (henüz yok).
- Yeni sitede bu haritadan henüz tek satır yazılı değil. Süren turda `next.config.ts` dosyasına yönlendirme bloğu açılmış (şimdilik yalnız `/ulke/...` kopyaları için). Bu harita aynı yere eklenebilir.

### Sayfalar

| Eski adres | Yeni adres | Not |
|---|---|---|
| `/` | `/` | aynı |
| `/dubai` | `/dubai` | aynı |
| `/ingiltere` | `/ingiltere` | aynı |
| `/kibris` | `/kktc` | |
| `/hakkimizda` | `/hakkimizda` | aynı |
| `/iletisim` | `/iletisim` | aynı |
| `/blog` | `/blog` | aynı |
| `/basinda-biz` | `/basinda-biz` | aynı |
| `/kariyer` | `/kariyer` | aynı |
| `/musteriler` | `/hakkimizda` | karşılığı yok |
| `/fiyat-teklifi` | `/basla` | |
| `/tesekkurler` | `/tesekkurler` | yeni sitede açılmalı |
| `/privacy-policy` | `/kvkk` | |
| `/legal/privacy-policy` | `/kvkk` | |
| `/legal/terms-conditions` | `/kvkk` | karşılığı yok |
| `/dubai/hizmetler/sirket-kurma` | `/dubai` | |
| `/dubai/hizmetler/muhasebe` | `/dubai/muhasebe` | |
| `/dubai/hizmetler/dubai-vize-oturum-izni-ve-yatirimci-kimligi` | `/dubai/oturum-vize` | |
| `/dubai/hizmetler/bankacilik-ve-odeme-sistemleri` | `/dubai/banka-hesabi` | |
| `/dubai/hizmetler/pazar-arastirmasi` | `/dubai/kurumsal-danismanlik` | hizmet iptal, en yakın sayfa |
| `/dubai/hizmetler/hukuki-danismanlik` | `/dubai/kurumsal-danismanlik` | hizmet iptal, en yakın sayfa |
| `/ingiltere/hizmetler/sirket-kurma` | `/ingiltere` | |
| `/ingiltere/hizmetler/muhasebe` | `/ingiltere/muhasebe` | |
| `/ingiltere/hizmetler/bankacilik-ve-odeme-sistemleri` | `/ingiltere/banka-hesabi` | |
| `/kibris/hizmetler/sirket-kurma` | `/kktc` | |
| `/kibris/hizmetler/muhasebe` | `/kktc/muhasebe` | |
| `/kibris/hizmetler/bankacilik-ve-odeme-sistemleri` | `/kktc/banka-hesabi` | |
| `/sektorler/e-ticaret` | `/sektorler/e-ticaret` | aynı |
| `/sektorler/finansal-hizmetler` | `/sektorler/finans-ve-yatirim` | |
| `/sektorler/bilisim-teknoloji-ve-medya` | `/sektorler/yazilim-ve-teknoloji` | |
| `/sektorler/gayrimenkul-ve-insaat` | `/sektorler/gayrimenkul` | |
| `/sektorler/saglik-hizmetleri` | `/sektorler/saglik-ve-medikal` | |
| `/sektorler/tuketici-urunleri-ve-perakende` | `/sektorler/e-ticaret` | karşılığı yok, en yakın sayfa |

### Blog yazıları

En iyisi yazıyı aynı adresle taşımak. Son sütun, yazı taşınmazsa gideceği en yakın sayfa. Eski adreslerin hepsi `/blog/` ile başlıyor.

| Tarih | Başlık | Eski adres (`/blog/...`) | Taşınmazsa hedef |
|---|---|---|---|
| 22.10.2025 | 2026'ya Hazırlık, Bugün Başlar | `kktc-dubai-ingiltere-yeni-finansal-donem` | `/blog` |
| 30.09.2025 | BAE Vize Sisteminde Yeni Dönem: 4 Yeni Ziyaret Vizesi ve İkamet Düzenlemeleri | `bae-vize-sisteminde-yeni-donem` | `/dubai/oturum-vize` |
| 27.08.2025 | Dubai'de İş Kurma Avantajları ve Şirket Seçenekleri | `dubaide-is-kurma-avantajlari-ve-sirket-secenekleri` | `/dubai` |
| 04.07.2025 | Dubai'de Gezilecek Yerler Rehberi: 2025 Güncel Lokasyon ve Aktiviteler | `dubai-gezilecek-yerler-2025` | `/blog` |
| 05.06.2025 | 2025 İngiltere'de Asgari Ücret Ne Kadar? | `ingiltere-asgari-ucret-2025` | `/blog/kategori/ulke-rehberi` |
| 22.05.2025 | KKTC'de Yaşam Rehberi: Kıbrıs'ta Maliyetler, İş Fırsatları ve Sosyal Hayat | `kktc-yasam-rehberi-kibris-is-firsatlari-maliyetler` | `/blog/kategori/ulke-rehberi` |
| 22.05.2025 | İngiltere'de Yaşam Rehberi: Maliyetler, İş İmkanları ve Vize Süreçleri | `ingiltere-yasam-rehberi-is-imkanlari-vize-maliyetler` | `/blog/kategori/ulke-rehberi` |
| 22.05.2025 | Dubai'de Yaşam Rehberi: Maliyetler, İş İmkanları ve Günlük Hayat | `dubai-yasam-rehberi-maliyetler-is-imkanlari` | `/blog/kategori/ulke-rehberi` |
| 22.05.2025 | Dubai'de İş Fikirleri: En Kârlı Dubai İş İmkanları | `dubai-is-fikirleri-en-karlı-is-imkanlari` | `/dubai` |
| 22.05.2025 | 2025'te Gelir Vergisi Olmayan Ülkeler | `gelir-vergisi-olmayan-ulkeler-2025` | `/ulkeler` |
| 22.05.2025 | Etsy Nedir? Nasıl Satış Yapılır? | `etsy-nedir-nasil-satis-yapilir` | `/sektorler/e-ticaret` |
| 22.05.2025 | EORI Numarası Nedir, Nasıl Alınır? | `eori-numarasi-nedir-nasil-alinir` | `/sektorler/e-ticaret` |
| 21.05.2025 | KKTC'de Vergi Avantajları: Oranlar, Teşvikler ve Finansal Kazançlar | `kktc-vergi-avantajlari` | `/kktc/vergi` |
| 21.05.2025 | KKTC'de Şirket Türleri: Kapsamlı Rehber ve Avantajlar | `kktc-sirket-turleri` | `/kktc` |
| 21.05.2025 | KKTC'de Şirket Kurma Rehberi | `kktc-sirket-kurma-rehberi` | `/kktc` |
| 21.05.2025 | KKTC'de Muhasebe ve Vergi Uygulamaları | `kktc-muhasebe-vergi-uygulamalari` | `/kktc/muhasebe` |
| 21.05.2025 | KKTC'de Bankacılık ve Ödeme Sistemleri Altyapısı | `kktc-bankacilik-odeme-sistemleri` | `/kktc/banka-hesabi` |
| 21.05.2025 | KKTC'de Banka Hesabı Açılışı ve Finansal Yönetim | `kktc-banka-hesabi-acilisi-finansal-yonetim` | `/kktc/banka-hesabi` |
| 21.05.2025 | İngiltere'de Ödeme Sistemleri Altyapıları | `ingiltere-odeme-sistemleri-altyapilari` | `/ingiltere/banka-hesabi` |
| 21.05.2025 | İngiltere'de İşletme Banka Hesabı Açma | `ingiltere-isletme-banka-hesabi-acma` | `/ingiltere/banka-hesabi` |
| 21.05.2025 | İngiltere'de Corporation Tax 2025/26 | `ingiltere-corporation-tax-rehberi-2025-26` | `/ingiltere/vergi` |
| 21.05.2025 | İngiltere'de Bordro ve Otomatik Katılım Süreçleri | `ingiltere-bordro-ve-otomatik-katilim-2025` | `/ingiltere/muhasebe` |
| 20.05.2025 | İngiltere Vergi Sistemi 2025 | `ingiltere-vergi-sistemi-2025-guncel-rehber` | `/ingiltere/vergi` |
| 20.05.2025 | İngiltere'de Şirket Türleri Rehberi | `ingiltere-sirket-turleri-hangisi-size-uygun` | `/ingiltere` |
| 20.05.2025 | İngiltere'de Şirket Kurulumu: Kapsamlı Rehber | `ingiltere-sirket-kurulumu-rehberi-avantajlar-surec-belgeler` | `/ingiltere` |
| 20.05.2025 | İngiltere'de Muhasebe: Yasal Yükümlülükler ve Dijital Dönüşüm | `ingiltere-muhasebe-rehberi-yasal-surecler-dijital-donusum` | `/ingiltere/muhasebe` |
| 20.05.2025 | İngiltere'de Making Tax Digital (MTD) 2025/26 | `ingiltere-making-tax-digital-rehberi-2025-26` | `/ingiltere/vergi` |
| 20.05.2025 | İngiltere'de Banka Hesabı Açılışı ve Ödeme Sistemleri Entegrasyonu | `ingiltere-banka-hesabi-ve-odeme-sistemleri` | `/ingiltere/banka-hesabi` |
| 20.05.2025 | Dubai'de Vergisiz Şirket Kurulumu | `dubaide-vergisiz-sirket-kurulusu` | `/dubai/vergi` |
| 20.05.2025 | Dubai Yatırımcı Vizesi Rehberi | `dubai-yatirimci-vizesi-sartlar-surec-avantajlar` | `/dubai/oturum-vize` |
| 20.05.2025 | Dubai'de Şirket Muhasebesi: Yasal Yükümlülükler | `dubai-sirket-muhasebe-kaydi-ve-yasal-yukumlulukler` | `/dubai/muhasebe` |
| 20.05.2025 | Dubai'de Şirket Kuruluşu Rehberi: Belgeler ve Süreç | `dubai-sirket-kurulusu-belgeler-ve-surec` | `/dubai` |
| 20.05.2025 | Dubai'de Serbest Bölgeler Rehberi | `dubai-serbest-bolgeler-rehberi` | `/dubai` |
| 20.05.2025 | Dubai'de Oturum İzni ve Yatırımcı Vizesi Rehberi | `dubai-oturum-izni-yatirimci-vizesi` | `/dubai/oturum-vize` |
| 20.05.2025 | Dubai'de Oturum İzni Seçenekleri ve Başvuru Süreçleri | `dubai-oturum-izni-secenekleri-ve-basvuru-surecleri` | `/dubai/oturum-vize` |
| 20.05.2025 | Dubai'de Stripe, PayPal, Payoneer ve Binance Pay ile Ödeme Almak | `dubai-odeme-sistemleri-stripe-paypal-payoneer-binancepay` | `/dubai/banka-hesabi` |
| 20.05.2025 | Dubai'de Vergi Yönetimi ve Planlaması Rehberi | `dubai-de-vergi-yonetimi-ve-planlamasi-rehberi-beyanlar-kdv-raporlari-ve-yasal-surecler` | `/dubai/vergi` |
| 20.05.2025 | Dubai'de Banka Hesabı Açmak | `dubai-banka-hesabi-acilisi-surec-belgeler-ve-bankalar` | `/dubai/banka-hesabi` |
| 19.05.2025 | Dubai'de Şirket Kurmak: Vergisiz Kazanca Adım Atın | `dubai-sirket-kurmak` | `/dubai` |
| 19.05.2025 | Dubai'de Muhasebe Rehberi | `dubai-muhasebe-sistemi` | `/dubai/muhasebe` |
| 19.05.2025 | Dubai'de Bankacılık ve Ödeme Sistemleri | `dubai-bankacilik-odeme-sistemleri` | `/dubai/banka-hesabi` |

Not: `dubai-is-fikirleri-en-karlı-is-imkanlari` adresinde Türkçe "ı" harfi var. Yönlendirme yazılırken hem harfli hem kodlanmış hâli (`%C4%B1`) denenmeli.

### Eski sitenin kendi yönlendirmeleri

Eski sitede daha da eski sitenin (WordPress) adreslerini bugünkü adreslere taşıyan yönlendirmeler tanımlı. Tam liste yalnız Framer panelinde. Denemeyle bulunanlar:

| Eski adres | Bugün gittiği yer | Yeni hedef |
|---|---|---|
| `/sss` | `/` | `/#sss` |
| `/kurumsal` | `/hakkimizda` | `/hakkimizda` |
| `/sektorler` | `/sektorler/bilisim-teknoloji-ve-medya` | `/sektorler/yazilim-ve-teknoloji` |
| `/dubaide-is-fikirleri-en-karli-dubai-is-imkanlari` | ilgili blog yazısı | yazının yeni adresi |
| `/gelir-vergisi-olmayan-ulkeler` | ilgili blog yazısı | yazının yeni adresi |

Yapılacak: Framer kapatılmadan önce paneldeki yönlendirme listesinin tamamı alınmalı. Yoksa eski bağlantılar ölür.

## Taşınacak teknik ayarlar

### İzleme kodları

Yeni sitede bugün hiçbir izleme kodu yüklenmiyor. Kodda olay çağrıları hazır ama GTM kabı bağlı değil.

| Ne | Kimlik | Eski sitede nerede |
|---|---|---|
| Google Tag Manager | `GTM-MJVNCM78` | her sayfada |
| Google Analytics 4 | `G-PCDK3KV1RH` | GTM kabının içinde |
| Google Ads | `AW-16506953883` | GTM kabının içinde |
| Google Ads dönüşümü | etiket `b6dFCI3imoQbEJvBkL89` | GTM içinde, adreste "tesekkurler" geçince çalışıyor |
| Meta (Facebook) Pixel | `1139306508051124` | GTM'de değil, sayfaya elle eklenmiş. Yalnız sayfa görüntüleme gönderiyor |
| Yandex doğrulama | `c225b1d673bc1125` | her sayfanın görünmeyen üst kısmında, etiket olarak |

- GTM kabı yeni siteye aynı kimlikle eklenirse Analytics ve Ads kendiliğinden gelir.
- Meta Pixel ayrıca eklenmeli ya da GTM'e taşınmalı.
- Yandex doğrulama etiketi eski siteyle birlikte kaybolur. Yandex kullanılıyorsa yeni siteye eklenmeli.
- Hotjar, Clarity, LinkedIn, TikTok izleme kodu yok. Canlı destek ya da sohbet eklentisi yok. Sabit WhatsApp düğmesi yok.
- Çerez onay kutusu eski sitede de yeni sitede de yok. İzleme kodları açılacaksa, özellikle İngiltere ziyaretçisi için, onay kutusu gerekir.

### Arama motoru

- Alan adının DNS kayıtlarında üç ayrı Google doğrulama kaydı var. Search Console doğrulaması büyük olasılıkla bunlardan biri. Kayıtlar silinmezse mülk taşımadan etkilenmez. Mülkün kimde olduğu görülemedi.
- Taşıma günü yeni site haritası Search Console'a gönderilmeli. Eski haritada 138 adres vardı, yenisinde canlıda 54.
- Yeni sitede `/kvkk` sayfası aramaya kapalı ama canlı site haritasında yazıyor. Süren turda haritadan çıkarılmış. Aynı turda `/kariyer`, `/gelismeler` ve `/e-kitaplar` da "yalnız örnek kayıt" diye haritadan çıkıyor, yani harita 54'ün altına inecek.
- Geçici `vercel.app` adresi: süren turda aramaya kapatılmış (henüz canlıda değil). Taşımadan sonra asıl adrese yönlenmesi ayrı iş, yoksa aynı site iki adreste açık kalır.
- Eski sitede her sayfada arama motoruna dönük firma kimlik bilgisi var: ad, dört telefon, üç e-posta, üç adres, üç sosyal hesap. Yeni sitede site genelinde yalnız ad, site adresi ve kuruluş yılı var. Telefon ve e-postalar yalnız iletişim sayfasında. Sosyal hesaplar hiçbir yerde yok.
- Eski kimlik bilgisindeki logo adresi (`/assets/logo-512.png`) açılmıyor. Kopyalanmamalı.
- Reklamların indiği adresler (Google Ads, Meta) eski adresleri gösteriyor olabilir. Taşıma günü reklam panellerinde hedef adresler güncellenmeli.

### Alan adı kayıtları (DNS)

Alan adı Cloudflare üzerinde. Taşımada yalnız iki kayıt değişmeli:

- Ana alan adının A kayıtları (bugün Framer: 31.43.160.6 ve 31.43.161.6).
- `www` kaydı (bugün `sites.framer.app`).

Dokunulmayacaklar:

- E-posta kayıtları: beş MX kaydı (Google Workspace) ve `v=spf1 include:_spf.google.com ~all` kaydı. Silinirse `@ortacglobal.com` e-postaları durur.
- Üç Google doğrulama kaydı (Search Console).
- `pdf.ortacglobal.com` (45.84.206.70). Dört PDF burada.
- `old.ortacglobal.com` (aynı sunucu). Bugün açılmıyor ama kayıt duruyor.

Bilgi: `uk@ortacaudit.com` ayrı bir alan adında, bu taşımadan etkilenmez. Alan adında DMARC kaydı yok. Taşıma işi değil, e-posta güvenliği için ayrıca bakılabilir.

### Framer kapatılmadan önce

- Form başvuruları ve bülten abone listesi dışa aktarılsın.
- Yönlendirme listesi alınsın.
- Blog içeriği ve görselleri dışa aktarılsın.
- Yönlendirmeler yeni sitede denenmeden Framer aboneliği iptal edilmesin.

## Taşınmasına gerek olmayanlar

- `/legal/privacy-policy` ve `/legal/terms-conditions`: şablondan kalma, doldurulmamış metin. İçinde "[Merchant Name]" yazıyor, sayfa başlığı "Evolve Template". Yalnız yönlendirme yeter.
- `/privacy-policy`: genel, İngilizce bir gizlilik metni. Şirket unvanı ve adres yok. Yeni sitenin KVKK metni bunun yerini alıyor.
- `/musteriler`: sayfada müşteri yorumu yok. Yalnız "1.200+ mutlu müşteri" başlığı ve bir stok fotoğraf var. Taşınacak içerik yok.
- Hizmet ve ülke sayfalarının metinleri: doğrulanmamış süre ve oranlarla dolu. Yeni sayfalar teklif belgelerinden ve teyit cevaplarından yazıldı.
- "Pazar Araştırması" ve "Hukuki Danışmanlık" sayfaları: iki hizmet iptal.
- "Tüketici Ürünleri ve Perakende" sektör sayfası: yeni sitede karşılığı yok.
- Hakkımızda metni (vizyon, misyon): genel cümleler. Yeni sayfa daha dolu.
- Ana sayfadaki 7 soruluk SSS.
- Sayfa başlıkları ve açıklamaları: kopyalanmamalı, hatalı olanlar var. Basın sayfası blogun başlığını taşıyor. Üç ülkenin "şirket kurma" sayfası aynı Dubai açıklamasını kullanıyor.
- İngilizce metinler: otomatik çeviri, kalitesi düşük.
- Stok fotoğraflar ve Google Haritalar gömmeleri.
- "Dubai'de Gezilecek Yerler" yazısı: konu dışı. Taşınmasa da olur, karar müşterinin.
- Basındaki dokuzuncu kayıt: haberin bağlantısı ölü.
- `old.ortacglobal.com`: açılmıyor. Eski sitede iki blog yazısı hâlâ oraya bağlantı veriyor.

Eski sitede hiç olmayanlar (yani taşınacak bir şey yok): müşteri yorumu, referans müşteri logosu, sertifika ya da üyelik rozeti, ekip ve kurucu bilgisi, sicil ve vergi numarası, lisans numarası, KVKK metni, çerez politikası, kullanım şartları (gerçek metin), WhatsApp bağlantısı.

## Göremediklerim

- Framer paneli: iletişim formunun ve bültenin hangi adrese düştüğü, abone sayısı, yönlendirme listesinin tamamı.
- Search Console ve Analytics verisi: hangi sayfa ne kadar trafik alıyor, hangi adrese dışarıdan bağlantı var. Yönlendirme önceliği buna göre belirlenmeli.
- Dört PDF'in içi. Dosyalar indirilmedi, yalnız boyut ve tarihlerine bakıldı.
- Youform ve Calendly hesaplarının ayarları: bildirim kime gidiyor.
- Meta Pixel'in panelde tanımlı başka olayı var mı.
- Reklamların (Google Ads, Meta) hangi adreslere indiği.
- Müşteri panelinin içi.
- Sosyal medya hesaplarının içeriği ve güncelliği. Yalnız bağlantılar kaydedildi.
- Telefon numaralarının WhatsApp'ta açık olup olmadığı.
- İngilizce 74 sayfanın 17'si açıldı. Kalanı site haritasından sayıldı.
- Site haritasında ve arama dizininde olmayan, hiçbir yerden bağlantı almayan gizli sayfa varsa bulunamaz.
- Başka alt alan adı: yaygın 30 ad denendi, yalnız `pdf` ve `old` bulundu. Liste tam olmayabilir.
- Çerez kutusu: Türkiye'den bakıldı, yoktu. Framer ülkeye göre gösterebiliyor, başka ülkeden denenmedi.
