# Telefon görünümü · görsel denetim (08.10.2026)

Denetlenen hâl: canlı adres + `?mobil=yeni` (canlıya alınacak telefon düzeni).
28 sayfanın tamamı 390 px'te baştan sona çekilip bakıldı; `/`, `/dubai`, `/iletisim`,
`/basla` ayrıca 360 ve 430 px'te. Menü açılıp dört sekmesine bakıldı. Kod değişmedi.

Soru her bölüm için aynıydı: ekrana bakan kişi karman çorman bir şey mi görüyor,
yoksa gördüğünü sırayla algılayabiliyor mu?

**Kısa cevap.** Sayfaların çoğu sırayla okunuyor: başlık, cümle, kart düzeni tutuyor.
Ziyaretçiyi asıl yoran iki şey var. Biri, sitenin birkaç yerde kendi ağzıyla "yarımım"
demesi (çalışmayan formlar, "Örnek" etiketleri, kapalı indirme düğmeleri). Öteki, tek
ülke gösteren "yan yana" tablolar ile kesik adım şeridi. Hiyerarşide en büyük sorun
boy değil renk: tam siyah bölümler ve art arda gelen siyah kartlar.

**Sınırlar.** Çekim başsız Chrome ile ve hareket azaltılmış modda yapıldı; gerçek
telefonda dokunarak denenmedi. Ekran görüntülerinde giriş fotoğrafındaki bir rozetin
üstünü "Telefon denemesi açık" etiketi kapatıyor; o etiket canlıda olmayacağı için
bulgu sayılmadı. Açılır kutuların içi tek tek açılmadı.

---

## Tutan şeyler (dokunma)

- Hiçbir sayfada, üç genişlikte de yana taşma yok. Kesilen düz metin yok, yüklenmeyen
  görsel yok.
- Sayfa başlığı her yerde 32 px (yalnız `/basla` 30), bölüm başlığı 26 px, kart başlığı
  18 px, gövde 14 ile 16 px. Merdiven sayfalar arasında aynı.
- Bölüm boşluğu her bölümde 48 üst, 48 alt. Kart içi boşluklar tutarlı, kenara yapışan
  yazı yok (en dar pay 20 px).
- Menü: dört sekme, iri satırlar, ülke seçici açık. Net.
- Fiyat formunda yapışık tutar şeridi çalışıyor, form ekrandayken görünüyor, özet
  gelince kayboluyor.
- Fotoğraflı sektör kartları, altı yatay hizmet kartı, serbest bölge sekmesi, süreç
  kartı: hepsi tek bakışta okunuyor.

---

## Önce düzeltilecekler

### A · Ziyaretçi bozuk ya da karışık diye algılar

**A1 · `/basla` · adım şeridi kesik.**
Üstteki şeritte "01 Ülke · 02 Kurulum · 03 Bilg" görünüyor, son kelime kenarda
kesiliyor; dördüncü adım ("04 Özet") hiç görünmüyor. Üçüncü adıma gelince etkin adımın
kendisi de kesik kalıyor. 360, 390 ve 430'da aynı. Şerit yana kayıyor (kural: yana
kaydırma yok).
Düzeltme: `.sat-adimlar`'da `overflow-x: auto` kalksın; telefonda etkin olmayan adımda
yalnız numara kalsın ("01 Ülke · 02 · 03 · 04") ya da şerit tek satır yazıya dönsün
("Adım 2 / 4 · Kurulum"). Sınıflar: `.sat-adimlar`, `.sat-adim-b`, `li[data-durum]`.

**A2 · `/ulkeler`, ana sayfa "Yan yana kıyas", `/sektorler/e-ticaret` · tabloda tek ülke.**
Sayfa "üç ülke yan yana" diyor, ekranda yalnız bir ülke var (ülkelerde ve ana sayfada
İngiltere, e-ticarette Dubai). Öteki iki ülke sağda, yana kaydırınca geliyor; nokta,
ok, yarım görünen sütun gibi hiçbir işaret yok. Ziyaretçi tabloyu eksik sanıyor. Ayrıca
ilk görünen ülke İngiltere, sitenin telefon sırası ise Dubai, KKTC, İngiltere.
Düzeltme: tablonun üstüne üç bayraklı sekme (serbest bölgelerdeki `BolgeSekme` kalıbı);
seçilen ülkenin sütunu görünsün, yana kaydırma kapansın, ilk sekme Dubai olsun.
Sınıflar: `.uk3-tblwrap` (scroll-snap), `.uk3-tbl` (748 px), `.sxk-wrap` (752 px).

**A3 · `/iletisim`, `/kariyer`, `/is-ortakligi` · form doldurulduktan sonra "çalışmıyor" diyor.**
İletişimde ziyaretçi ülke, konu, ad, e-posta, mesajı dolduruyor; en altta "Gönder"
soluk ve altında şu yazı var: "Form henüz bir yere bağlı değil: gönderim uç noktası
eklenene kadar bu buton çalışmıyor". Kariyerde aynı cümle, üstüne "Dosya yükleme henüz
bağlı değil". İş ortaklığında "Form henüz açılmadı", alanlar kapalı.
Düzeltme (uç nokta bağlanana kadar): notu formun en üstüne, sade cümleyle al ("Form şu
an kapalı. Bize telefondan ya da WhatsApp'tan yazın."), "uç nokta" gibi teknik kelimeler
çıksın; iletişimde ofis kartları (telefon, WhatsApp, e-posta) formun üstüne gelsin ya da
form telefonda hiç basılmasın. Sınıflar: `.ct-note`, `.krm-note`, `.krm-hint`,
`.pt-form-top`.

**A4 · `/e-kitaplar` · başlık "indirin" diyor, on düğmenin onu da kapalı.**
Her kartta gri "Hazırlanıyor" düğmesi ve "Dosya hazırlandığında bu düğme açılacak"
cümlesi var; on kartın onunda da "Örnek" etiketi.
Düzeltme: teslimde sayfa menüden ve ana sayfadan çıkarılsın; kalacaksa başlık
"Hazırlanan e-kitaplar" olsun, kapalı düğme ve altındaki cümle kalksın, kartta tek
"Yakında" etiketi kalsın.

**A5 · "Örnek" etiketleri ve demo cümlesi.**
`/blog`: "15 yazı · 14 tanesi örnek kayıt · bağlantılar şimdilik demo sayfasına iniyor".
`/gelismeler`: 22 kaydın hepsinde "Örnek". `/kaynaklar`: her satırda. `/kariyer`: dört
ilanın dördünde. Ana sayfa yazı listesi: üç satırda. Ziyaretçi sitenin içinin boş
olduğunu okuyor.
Düzeltme: teslim kararı. Ya örnek kayıtlar gizlenir (yalnız gerçek olan kalır), ya da
etiket ve cümle kalkar. Yer: `src/app/blog/BlogHub.tsx:296`; etiketler `.kyn-seed-tag`,
`.bh-seed`, `.krm-seed`.

**A6 · `/araclar/kurumlar-vergisi/dubai` · sonucun altında "onaydan geçmedi" uyarısı.**
Amber üçgenle "Oran ve eşik mali müşavir onayından henüz geçmedi." yazıyor. Ziyaretçi
az önce gördüğü rakamın onaysız olduğunu okuyor.
Düzeltme: onay alındıysa bayrak kapansın (`KurumlarVergisi.tsx:567`, `BAE_TEYIT`);
alınmadıysa cümle yerine yalnız üstteki "Temsilî gösterim" notu kalsın.

**A7 · `/is-ortakligi` · "Ticari şartlar" kartı boş.**
Dört satırın dördünde değer yerine çizgi var (komisyon oranı, ödeme koşulu, asgari
yönlendirme, white-label bedeli), altında "Bu dört başlık şu an sayfada yayımlanmıyor"
açıklaması.
Düzeltme: kart kalksın; yerine tek cümle ve mevcut "Ortaklık şartlarını sorun" düğmesi.
Sınıf: `.pt-terms-head` ve kartı.

**A8 · `/kktc` · "Hangi ödeme kanalı çalışıyor" · altı kutu hizasız.**
Stripe, PayPal, Payoneer, Shopify Payments, Amazon, Etsy kutuları içindeki yazı kadar
geniş; üç satır üç ayrı genişlikte, sağ taraf boş. Üstteki iki yeşil kart tam genişlik
olduğu için altı dağınık duruyor.
Düzeltme: kutular eşit ikili ızgara: `grid-template-columns: repeat(2, minmax(0, 1fr))`.
Sınıflar: `.cod-f`, `.cod-k[data-durum="yok"]` (`country-bilgi.css`).

### B · Hiyerarşi zayıf

**B1 · Tam siyah bölümler (müşteri kuralı: tam siyah bölüm yok).**
- `/dubai/muhasebe`: alıntı bölümü (`.svm-alinti`, 738 px) ve "Muhasebe hizmetinin
  bedeli" (`#fiyat`, 1.102 px). Sayfanın yüzde 51'i siyah.
- `/hakkimizda`: "Neye dayanarak çalışıyoruz" (1.908 px). Sayfanın yüzde 55'i siyah.
- `/sektorler/e-ticaret`: `#karsilastirma` (1.882 px) ve `#ortac` (1.270 px). Yüzde 52.
- `/is-ortakligi`: "Müşterinize ne götürüyorsunuz" (1.540 px).
Düzeltme: zemin kırık beyaz; koyu anlatım gerekiyorsa içerik 28 px köşeli tek gece
kartına (`.sec-night.gece-kart`), içindeki kartlar beyaza.

**B2 · Her sayfanın sonu 1.310 px tam siyah.**
Kapanış bölümü, bayrak yayı ve footer tek siyah blok (`.ft2`), bir buçuk ekran. Hemen
üstünde SSS'in siyah "Sorunuz listede yok mu?" kartı duruyor: siyah kart, siyah kapanış,
siyah footer art arda. Kısa sayfalarda oran yüksek: `/uygunluk-testi` yüzde 73 (giriş
dahil), `/ulkeler` yüzde 46.
Düzeltme: `.sssa-ask` kartı beyaz zemin, mavi düğme; kapanış (`.kcta`) kırık beyaz zeminde
28 px köşeli gece kart; bayrak yayı telefonda tek yay (yaklaşık 150 px kısalır; görsel
kararı, öneri).

**B3 · Art arda siyah kartlar (kural: iki siyah kart üst üste gelmez).**
- `/dubai`: VIP kartı (803 px), fiyat formu (778), tutar kartı (467): 2.300 px boyunca
  üç siyah kart. Sonra para yolu (926) ve ilk yıl maliyeti (544).
- `/kktc`: fiyat formu, tutar kartı, hemen sonraki bölümde "Asgari sermaye" kartı.
- `/ingiltere`: fiyat formu ve tutar kartı.
- `/dubai/muhasebe`: dört bölüm üst üste siyah kartla açılıyor.
Düzeltme: tutar kartı (`.ip-out`) beyaz zemine, tutar yeşil kalsın; ilk yıl maliyeti
(`.aft-sum`) ile para yolu (`.sec-night`) ikilisinden biri açık zemine.

**B4 · Süreç sahnesindeki yazılar okunmuyor (ana sayfa, üç ülke).**
Ölçülen boylar: "Uygun" 6,6 px (`.dv-pill-t`), "Mert Kayacan" 7,7 (`.pr2-dv-val`), "Ad
Soyad", "Aday şirket adı", "Ön başvuru iletildi" 8 (`.dv-lbl`, `.dv-s`), "Tescil
otoritesi" 8,9 (`.dv-t`), "Başvuru formu" 10 (`.dv-h`). Kural: okunmayacaksa hiç olmasın.
Düzeltme: çizim aynı kalsın; telefonda `.dv-lbl` ve `.dv-s` satırları gizlensin (`.dv-alt`,
`.dv-ust` gibi), kalan iki yazı viewBox kırpılarak en az 12 px'e çıksın.

**B5 · 12 px'te yazılmış cümleler (kural: okunacak yazı en az 14).**
- `/kariyer`: form notu 204 harf (`.krm-note`), alan ipuçları (`.krm-hint`).
- `/sektorler/e-ticaret`: tablo altı iki not 187 ve 134 harf (`.sxk-note`, `.sxk-more`),
  hücre notları (`.sxk-cn`), fotoğraf altı not (`.sxo-note`).
- `/uygunluk-testi`: siyah paneldeki beş satırlık açıklama (`.uyg-sum-note`).
- `/kaynaklar`: dört kartın dipnotu (`.kyn-door-not`).
- `/ulkeler`: satır altı notları (`.uk3-rowh-h`) ve değer notları (`.ctry-fact em`); 150 px
  sütunda üç dört satıra kırılıyor.
- `/ingiltere`, `/ingiltere/muhasebe`: amber ceza notları (`.ctk-ceza`).
- `/is-ortakligi`: beş halkanın cümlesi (`.pt-link > i`).
- Üç ülke sayfası: harita kartındaki adres (`.omap-label`).
- `/iletisim`: alan ipuçları (`.ct-hint`). `/basla`: ülke kartı alt satırı 13 px
  (`.sat-ulke-t > span`).
Düzeltme: hepsi 14 px; sığmayan kısaltılsın ya da "Ayrıntılar" altına girsin.

**B6 · `/hakkimizda` · iki başlık yarışıyor, merdiven dağınık.**
Sayfa başlığı 32, hemen altındaki fotoğraf kartının başlığı 30 (`.ab-kim-t`): göz ikisi
arasında kalıyor. Kapanış başlığı 24 (`.ab-close-t h2`), grup başlığı 20 (`.ab-ku-bas h3`),
kart başlıkları bir yerde 18, bir yerde 16 (`.ab-pcard h3`). Fotoğraf kartı, siyah Vizyon
kartı, mavi Misyon kartı (yedi satır) ve siyah bölüm art arda.
Düzeltme: `.ab-kim-t` 24; `.ab-close-t h2` 26; `.ab-ku-bas h3` ve `.ab-pcard h3` 18;
Misyon cümlesi üç satıra insin.

**B7 · Aynı düzeyde başlık, farklı boy.**
"Kaynakların dört türü" 22 px (`.kyn-switch-h`; blog, e-kitaplar, gelişmeler), öteki
bölüm başlıkları 26. `/araclar`'da grup başlığı 18, altındaki kart başlığı 17
(`.tl-group-h`, `.tl-ix-t`): grup başlığı kartlardan ayrışmıyor. Ana sayfa hizmet kartı
başlığı 17 (`.hx-t`), öteki kart başlıkları 18.
Düzeltme: `.kyn-switch-h` 26; `.tl-group-h b` 22; `.hx-t` 18.

**B8 · Küçük dokunma hedefleri (40 px altı).**
- 13 px: "Tutarlar USD ve KDV hariç · tam şartlar" (`.svm-more > summary`, Dubai muhasebe).
- 22 px: evrak listesindeki onay kutuları (`.ndx-tick`, yedi sayfada 29 kutu);
  "Üçünü yan yana karşılaştırın" (`.ccx-cmp`); footer e-postası.
- 24 px: "Süreci gör", "Tüm yayınlar", "Bütün araçlar" (`.link-arrow`); "Şirket kuruluşu:
  ... bir adımı" bağlantıları (`.svz-cik`).
- 30 px: fiyat formundaki bilgi düğmeleri (`.dfy-i-b`), para yolundaki ülke çipleri
  (`.mh-flag`), USD / AED (`.txm-birim button`), gelişmeler süzgeci (`.kyn-pick-o`).
- 32 px: süreç adım çubukları (`.srp-bar`; Dubai'de yedi adımda 39 px genişlik).
- 34 ile 38 px: hazır tutar çipleri, "Detaylı hesapla", "Ülkeye özel süreci gör", vize
  artı eksi düğmeleri, üstteki "Başlat" (38).
Düzeltme: görünen boy aynı kalsın, dokunma alanı sözde öğeyle 44 px'e açılsın
(`::after { inset: -8px }`); onay kutusunda satırın tamamı dokunulur olsun.

**B9 · Giriş cümleleri uzun (kural: girişte en çok üç satır).**
`/is-ortakligi` altı satır, `/kariyer` beş, `/basinda-biz` beş, `/kaynaklar` dört,
`/gelismeler` dört. Düzeltme: `lib/mobilKisa.ts`'e kısa sürümleri.

**B10 · Yazı yığını.**
- `/kariyer`: dört ilan tam açık, yaklaşık 3.100 px madde listesi.
  Düzeltme: başlık, tek cümle, düğme kalsın; "Ne yapacaksınız" ve "Aradıklarımız" açılır.
- `/basinda-biz`: on kart, paragraflar dört ile altı satır, beş başlık neredeyse aynı.
  Düzeltme: paragraf üç satırda kesilsin (`-webkit-line-clamp: 3`).
- `/dubai/oturum-vize`: kart cümleleri dört beş satır ("Kuruluşta planlanıyor",
  "İptalden sonra ek süre").
- `/sektorler/e-ticaret`: ülke bloklarının girişi beş satır; siyah bölümdeki "Banka ve
  ödeme" kartı altı satır.
- `/kktc/banka-hesabi`: iki bölüm girişi dörder satır.

**B11 · Renk kuralı sapmaları.**
- Kırmızı çerçeve: `/dubai` vergi bölümünde "Kıyas ülkesi: Türkiye" seçicisi (`.txm-sel`)
  ve para yolundaki seçili ülke çipi (`.mh-flag`) kırmızı çerçeveli; hata durumu gibi
  okunuyor. Düzeltme: seçili çerçeve mavi.
- `/gelismeler`: gün rakamı ülkeye göre yeşil, lacivert, kırmızı. Düzeltme: tek renk.
- Yeşil para dışında: ana sayfa "kapatıldı" yazıları ve "Devralındı" kutusu, hakkımızda
  "Resmî iş ortağı" ve "İmzalı" çipleri, fiyat özetindeki tikler, İngiltere vergi
  grafiğindeki yüzde 19. Düzeltme: mavi.
- Aynı bilgi iki renkte: `/kktc`'de kırmızı "Açılmıyor", `/kktc/banka-hesabi`'nda amber
  "Çalışmıyor". "Şirkette kalan" tutarı `/dubai`'de yeşil, kurumlar vergisi aracında mavi.
- `/ingiltere` ödeme satırlarındaki etiketler mavi, amber, yeşil karışık; amber burada şart
  ya da risk anlatmıyor.
- `/kariyer`: başvuru düğmesi siyah; sitenin ana düğmesi mavi.

**B12 · `/basla` · çarşaf küçük, alt şerit kalabalık.**
Sayfa tamamen siyah, beyaz çarşaf ortada duruyor. Altta üç satır var (Geri, WhatsApp
hapı, Devam et): içeriğe 390'da 525 px, 360'ta 421 px kalıyor ve içerik çarşafın içinde
ayrıca kayıyor. İkinci adımda "VIP Vize hizmeti" ve "Yıllık muhasebe" başlıkları ikiye
bölünüyor. Dubai kartında "Serbest bölge · Ticari / Teknoloji" yer varken iki satır.
Sayfa başlığı 30 (öteki sayfalar 32).
Düzeltme: Geri ve Devam et aynı satırda, WhatsApp tek satır bağlantı; çarşaf tam
yükseklik (`.sat-govde`).

**B13 · Banka sayfaları (KKTC, İngiltere) · logosuz kartta sol yan boş.**
Logo için ayrılan yaklaşık 100 px'lik sütunda yalnız 40 px'lik ikon duruyor; yazı sağa
itilmiş, kart yarı boş görünüyor. Düzeltme: logosuz kartta sütun 56 px (`.svb-` kartları).

**B14 · Tekrar.**
- `/ingiltere` ödeme bölümü: aynı sekiz marka önce çizimde, sonra sekiz satırda.
- `/dubai`: "Sorularınız mı var?" çipi üç ayrı bölümün sonunda.
- `/kaynaklar`: giriş cümlesi ile ilk bölümün cümlesi aynı şeyi söylüyor.
- Üç ülkede avantaj bölümünün girişi "Her maddenin kendi çizimi var." tasarımı anlatıyor,
  ziyaretçiye bir şey söylemiyor.
- `/araclar`: iki kartta aynı fotoğraf art arda (SIC kodu bulucu, IFZA kod bulucu).

**B15 · Boşluk ritmi.**
Giriş fotoğrafı ile ilk bölüm başlığı arası 120 px (giriş alt boşluğu 72 + bölüm 48),
öteki bölüm araları 96. Düzeltme: `.dhr` alt boşluğu 48. Ülke sayfalarının ikinci
yarısında sekiz bölüm üst üste beyaz (Dubai'de süreçten "Diğer ülkeler"e kadar); zemin
beyaz, kırık beyaz sırasına dönsün.

**B16 · Logolar.**
Ana sayfa şeridinde Meydan, Emirates NBD ve QuickBooks logoları ötekilerin yarı boyunda;
360'ta son logo dördüncü satırda tek başına. `/dubai/banka-hesabi`'nda "Amazon Payment
Services" logosu okunmuyor. `/hakkimizda`'da Meydan logosu kutunun içinde çok küçük,
üçlü gruplarda son logo tek kalıyor.

**B17 · Küçük hatalar.**
- `/kktc` harita kartı: adres "Şht. Murat İlhan Sokak No:5, 039" diye bitiyor; yarım gibi
  duruyor (öteki iki ülke şehir adıyla başlıyor). Doğrulanmalı.
- Ana sayfa sohbet kutusu: en üstte boş bir balonun alt kenarı görünüyor (üç genişlikte).
- Kurumlar vergisi aracı: sürgünün üstünde etiketsiz tek çentik.
- `/kvkk`: listelerde madde işareti yok, girintili paragraf gibi duruyor.
- Köşe: `/kktc` "Asgari sermaye" kartı 18 (`.cse-tutar`), `/hakkimizda` künye kutusu 18
  (`.abn-box`); aynı roldeki siyah paneller 28.
- Başlık yazımı: araç sayfasında "Sık sorulan sorular.", öteki sayfalarda "Sık sorulanlar.".
- `/dubai/vergi`: "Dubai için diğer hizmetler" başlığının altında "Üçünü yan yana
  karşılaştırın" bağlantısı (ülke kıyasına gidiyor, başlıkla uyuşmuyor).
- `/iletisim`: "Hangi konuda?" sekiz tam genişlik satır, yaklaşık 560 px. İkili ızgara olur.
- Menü: "Panel girişi" soluk gri; çalışıyorsa normal renkte, çalışmıyorsa hiç olmasın.
- `/basla`: İngiltere "Yakında bu akışta" diye kapalı; İngiltere sayfasından gelen
  ziyaretçi burada seçemiyor (teslim kararı).

---

## Sayfa sayfa

Her satır bir bölüm. "Net" = tek bakışta sırası anlaşılıyor.

### `/` Ana sayfa
- Giriş: net. Başlık baskın, iki düğme, iki durum kartı ilk ekrana sığıyor.
- Logo şeridi: üç logo çok küçük (B16).
- Hizmet verdiğimiz ülkeler: liste net. "Yan yana kıyas" sekmesi tek ülke gösteriyor (A2).
- Uzmanlık alanlarımız: net. Altı yatay kart, başlık ve tek cümle.
- Neden Ortac Global: net; beyaz, siyah, beyaz, siyah sırası tutuyor. Sohbet kutusunda
  kesik balon kenarı (B17), yeşil "kapatıldı" (B11).
- Sektörler: net.
- Şirket döngüsü: net. Eksen yazıları 12 px (etiket, kabul).
- Kuruluşta nasıl çalışıyoruz: kart net, sahnenin yazıları okunmuyor (B4).
- Yazılar: öne çıkan kart net; üç satırda "Örnek" (A5); öne çıkan kartın cümlesi 16,
  öteki kart cümleleri 14.
- Sık sorulanlar: net. Siyah kart + siyah kapanış + siyah footer art arda (B2).

### `/dubai`
- Giriş: net. Fiyat yeşil, iki düğme, fotoğraf.
- Önce yapıyı seçiyoruz: net.
- Üç serbest bölge: net (sekme çalışıyor).
- Avantajlar: net; giriş cümlesi boş söz (B14).
- Kendi ofisimizden: net.
- VIP vize: net ama ardından iki siyah kart daha geliyor (B3).
- Kurulumunuzu seçin: form net, yapışık tutar çalışıyor; bilgi düğmeleri 30 px (B8);
  360'ta ek hizmet başlıkları ikiye bölünüyor.
- Süreç: kart net, sahne yazıları okunmuyor (B4), adım çubukları 32 px (B8).
- Nelere ihtiyacınız var: net; onay kutuları 22 px (B8).
- Vergi çerçevesi: net; kırmızı çerçeveli seçici (B11).
- Kazancınızı Türkiye'ye: tek siyah kart, içi net; kırmızı çerçeveli çip (B11).
- Kuruluş sonrası yükümlülükler: üç ayrı kart üç ayrı görünüşte (siyah, beyaz, gri); ilk
  kart baskın, ötekiler okunuyor. Açılır kartın cümlesi dört satır.
- Kimin işine yarar: net.
- Sık sorulanlar, Diğer ülkeler, kapanış: net; son 1.700 px ağırlıkla siyah (B2).

### `/kktc`
- Giriş, avantajlar, ofis: net. Harita adresi yarım gibi (B17).
- Vergi çerçevesi: net; değerler bir kartta mavi, bir kartta siyah.
- Vergi nerede çıkıyor: net (üç kart, oklar).
- Ödeme kanalı: üst iki kart net, alttaki altı kutu hizasız (A8).
- Kuruluş kalem kalem: iki siyah kart üst üste (B3); "Aktif şirket" ve "Pasif şirket"
  cümleleri ikon ile fiyat arasında üç satıra sıkışıyor.
- Sermaye: siyah kart + üç adım, net; üçüncü siyah kart (B3).
- Süreç, evrak, kimin işine yarar: Dubai ile aynı, net.
- Sık sorulanlar: 12 soru, uzun ama net.

### `/ingiltere`
- Giriş, avantajlar, ofis: net.
- Vergi çerçevesi: grafik ve üç satır net; yüzde 19 yeşil (B11).
- Vergi nerede çıkıyor: net.
- Ödeme kanalı: çizim + sekiz satır aynı markaları iki kez gösteriyor (B14).
- Kurulumunuzu seçin: net; "Yıllık muhasebe" anahtarının dokunma alanı 23 px.
- Süreç, evrak, her yıl ne var, kimin işine yarar, SSS: net.

### `/dubai/muhasebe`
- Giriş: net. Fiyat çipinde "350 USD" ile "/ay'dan" arasında fazla boşluk var.
- Defteri kimin tuttuğu, ne yapıyoruz: net.
- Alıntı: tam siyah bölüm (B1).
- Hangi ayda ne çıkıyor: siyah kart net; eksen yazıları 12 px.
- Düzenli muhasebenin karşılığı: net.
- Muhasebecinizi değiştirmek: siyah kart net.
- Bana hangi hizmetler gerekiyor: net.
- Muhasebe hizmetinin bedeli: tam siyah bölüm (B1); "tam şartlar" bağlantısı 13 px
  yüksekliğinde ve 12 px yazı (B8).
- SSS, kapanış: net. Sayfanın yarısı siyah.

### `/dubai/banka-hesabi`
- Bütün bölümler net. Banka logoları farklı boyda; Amazon Payment Services okunmuyor (B16).

### `/dubai/oturum-vize`
- Düzen net; kart cümleleri uzun (B10). Baştan sona beyaz kart yığını, renk yalnız girişte
  ve kota çiziminde.

### `/dubai/vergi`
- Bütün bölümler net. Sondaki "diğer hizmetler" bağlantısı başlıkla uyuşmuyor (B17).

### `/kktc/muhasebe`, `/ingiltere/muhasebe`
- Bütün bölümler net. Fiyatlar yeşil, takvim kartları okunuyor. İngiltere'de amber ceza
  notları 12 px (B5).

### `/kktc/banka-hesabi`, `/ingiltere/banka-hesabi`
- Düzen net. Logosuz kartlarda sol yan boş (B13). KKTC'de iki giriş cümlesi dörder satır.
  KKTC'de "Çalışmıyor" amber, ülke sayfasında aynı bilgi kırmızı (B11).

### `/hakkimizda`
- Giriş + fotoğraf kartı: iki başlık yarışıyor (B6).
- Vizyon, Misyon: siyah kart ve mavi kart art arda; Misyon yedi satır.
- Neye dayanarak çalışıyoruz: tam siyah bölüm, 1.908 px (B1).
- Birlikte çalıştığımız kurumlar: net; logo boyları dağınık (B16).
- İşi kim yürütüyor, sektörler: net.
- Künye + kapanış yazısı: net; başlık 24 (B6).

### `/iletisim`
- Giriş: net.
- Form: sırası net ama sonunda çalışmadığını söylüyor (A3); konu listesi uzun (B17).
- Üç ofis: net. Telefon, WhatsApp, e-posta kartları iri ve okunuyor.

### `/ulkeler`
- Giriş: net.
- Tablo: tek ülke görünüyor (A2); satır notları 12 px (B5).
- Sayfanın yüzde 46'sı siyah (B2).

### `/sektorler/e-ticaret`
- Giriş, dört ölçüt: net; açılır kart cümleleri üç satır.
- Aynı ölçütler, üç ülke: tam siyah bölüm (B1); tablo tek ülke (A2); altındaki iki not
  12 px (B5).
- Üç ülke bloğu: düzen net; giriş cümleleri beş satır; siyah sahnelerin içi neredeyse boş,
  çizimde mavi ışık halesi var (kural: parıltı yok).
- Ortac ne yapıyor: tam siyah bölüm (B1).
- SSS: net.

### `/blog`
- Giriş, süzgeç, öne çıkan kart, liste: net. Demo cümlesi ve "Örnek" etiketleri (A5).
- Kaynakların dört türü: başlık 22 (B7).

### `/kaynaklar`
- Dört kart net; dipnotlar 12 px (B5); giriş cümlesi iki kez (B14); "Örnek" (A5).

### `/araclar`
- Kartlar net. Grup başlığı kart başlığından ayrışmıyor (B7); aynı fotoğraf iki kez (B14).

### `/araclar/kurumlar-vergisi/dubai`
- Araç net: girdi, sonuç, dağılım sırası okunuyor. Onay uyarısı (A6), çentik (B17),
  "Şirkette kalan" mavi (B11).

### `/uygunluk-testi`
- Soru kartı net. Alttaki siyah "Cevap defteri" panelinde 12 px'lik beş satır açıklama (B5).
  "Önceki" düğmesi 39 px.

### `/basla`
- Adım şeridi kesik (A1). Çarşaf küçük, alt şerit kalabalık (B12).

### `/is-ortakligi`
- Giriş: altı satır (B9).
- İki ortaklık modeli: net.
- Ticari şartlar: boş kart (A7).
- Müşterinize ne götürüyorsunuz: tam siyah bölüm (B1).
- Müşteriniz kuruluşta bırakılmıyor: kartlarda cümle 12 px (B5).
- Kimler ortak olabilir: net.
- Başvuru: form kapalı (A3); alan etiketleri 12 px.
- SSS: net.

### `/kariyer`
- Giriş: beş satır (B9).
- İlanlar: yazı yığını (B10), hepsi "Örnek" (A5), düğme siyah (B11).
- Başvuru formu: çalışmıyor (A3); not 12 px (B5).

### `/basinda-biz`
- Kartlar tek tek net, toplamda yazı yığını ve tekrar eden başlıklar (B10).
- Basından geliyorsanız: net; künye kartının altında boş bir satır.

### `/e-kitaplar`
- Kart düzeni net, içerik kapalı (A4).

### `/gelismeler`
- Zaman çizgisi net: ay başlığı, gün, başlık, cümle. Gün rakamı üç renk (B11), hepsi
  "Örnek" (A5), süzgeç 30 px ve blogdaki haplardan farklı görünüşte.

### `/kvkk`
- Düz metin, net. Liste işaretleri yok (B17). Başlıklar 22 px (uzun metin sayfası, kabul).

### Menü
- Net. "Ülke uygunluk testi" satırında üç bayrak üst üste biniyor (bilerek yapılmış olabilir, yine de karışık duruyor); "Panel girişi" soluk.

---

## Genişlik farkı (360 ve 430)

- Taşma yok, kesilen yazı yok (tek istisna `/basla` adım şeridi, üç genişlikte de kesik).
- 360'ta ek satıra düşen başlıklar: "Hizmet verdiğimiz ülkeler.", "Kuruluşta nasıl
  çalışıyoruz." iki satır; "VIP vize hizmeti: Dubai'de yaklaşık 5 iş günü." üç satır.
- 360'ta ana sayfa logo şeridinin son logosu tek başına dördüncü satırda.
- 360'ta fiyat formunda "VIP Vize hizmeti" ve "Yıllık muhasebe" ikiye bölünüyor; ana
  sayfa sohbet kutusunda "Merve · danışmanınız" iki satır.
- 430'da sorun görülmedi; başlıkların çoğu tek satıra iniyor.

## Denetim dışı ama görüldü

- `/dubai` IFZA kartında "En çok tercih edilen" rozeti duruyor (`docs/tuzaklar.md` kural 3
  bu etiketi kaynaksızsa yasaklıyor).
- `/hakkimizda` fotoğraf kartında yüzün alt yarısı görünüyor (kural: yüzsüz kare).

## Çıktılar

Ekran görüntüleri oturumun geçici klasöründe: `scratchpad/tel-denetim/` (`a`, `b`, `c`, `d`
390 px; `e360`, `f430`; `yakin/` yakın çekimler; `olc-*.json` ölçümler).
