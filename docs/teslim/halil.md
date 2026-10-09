# Halil'e yapılacaklar · 09.10.2026

Kod tarafı hazır; aşağıdakiler hesap, anahtar ve panel işi.

## 1. Formlar e-postaya düşsün
Formlar şu an gönder'e basınca ziyaretçinin e-posta uygulamasını açıyor. Doğrudan kutuya
düşmesi için Vercel > Project > Settings > Environment Variables:

- `RESEND_API_KEY` : resend.com hesabından alınan anahtar
- `FORM_ALICI` : `web@ortacglobal.com` (Burak'ın kararı; virgülle birden fazla yazılabilir)
- `FORM_GONDEREN` : isteğe bağlı, örn. `Ortac Global <form@ortacglobal.com>`. Bunun için
  Resend'de ortacglobal.com alan adı doğrulanmalı (DNS'e iki üç kayıt). Doğrulanmazsa
  iletiler Resend'in deneme adresinden gider.

Başka bir sisteme (Make, Zapier, CRM) aktarılacaksa bunların yerine tek değişken:
`FORM_WEBHOOK_URL`. Kod: `src/app/api/form/route.ts`. Değişken eklendikten sonra yeniden
dağıtım yeter, kod değişmez. Deneme: /iletisim formunu doldurup gönder.

## 2. Companies House anahtarı
İngiltere isim sorgulama aracı anahtar bekliyor. developer.company-information.service.gov.uk
üzerinden ücretsiz anahtar alınır, Vercel'e `COMPANIES_HOUSE_API_KEY` olarak eklenir.
Deneme: /araclar/ingiltere-isim-sorgulama.

## 3. Ölçüm ve dönüşüm
Eski sitedeki kimlikler: Google Tag Manager `GTM-MJVNCM78` (içinde Analytics
`G-PCDK3KV1RH` ve Ads `AW-16506953883`), Meta Pixel `1139306508051124`.
Sitede `gtm()` çağrıları hazır (27 yer) ama GTM yüklü değil. Yapılacak:
- GTM'i siteye ekleme işini Claude yapacak (Burak onayı bekleniyor); Halil'den istenen
  GTM ve Ads panel erişimi.
- Ads dönüşümü eski sitede `/tesekkurler` sayfasının açılmasına bağlıydı. Yeni sitede
  form içeride olduğu için dönüşüm "form gönderildi" olayına bağlanacak; GTM'de
  tetikleyici sayfa görüntülemeden özel olaya çevrilecek.

## 4. Alan adı günü
- DNS'te (Cloudflare) yalnız ana A kaydı ve `www` Vercel'e dönecek.
- Dokunulmayacaklar: Google Workspace e-posta kayıtları (MX, SPF, DKIM), üç Google
  doğrulama kaydı, `pdf.ortacglobal.com`.
- Vercel'de ortacglobal.com ve www eklenecek; biri ötekine yönlenecek.
- Geçici adresteki arama motoru kapatması kendiliğinden kalkar, bir şey yapmak gerekmez.
- Search Console'da yeni site haritası gönderilecek: `/sitemap.xml`.

## 5. Eski site kapanmadan
- Framer panelinden: yönlendirme listesi (eski WordPress adresleri dahil), blog içeriği
  ve görselleri, form alıcı adresi, bülten abone listesi dışa alınacak.
- `pdf.ortacglobal.com` altındaki dört PDF kapatılacak (2025 fiyat dosyaları).

## 6. Gerçek cihaz denemesi
iPhone Safari ve bir Android'de: menü açıkken arka plan kaymıyor mu, fiyat formunda
alttaki tutar şeridi, formda gönder'e basınca açılan e-posta, /basla baştan sona.
