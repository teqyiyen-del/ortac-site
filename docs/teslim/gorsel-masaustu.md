# Masaüstü ve tablet görünümü · görsel denetim (08.10.2026)

Denetlenen hâl: canlı adres (`ortac-global-site.vercel.app`). 28 sayfanın tamamı
1440 px'te baştan sona kaydırılıp çekildi ve bakıldı. `/`, `/dubai`, `/ingiltere`,
`/iletisim`, `/basla` ayrıca 1280, 1920 ve 820 px'te çekildi. Üst menünün dört paneli
ve tabletteki açılır menü açılıp bakıldı. Kod değişmedi.

Soru her bölüm için aynıydı: ekrana bakan kişi karman çorman bir şey mi görüyor,
yoksa gördüğünü sırayla algılayabiliyor mu?

**Kısa cevap.** Düzen tutuyor. Ülke sayfaları, hizmet sayfaları ve ana sayfa bölüm
bölüm okunuyor: bir başlık, bir cümle, altında tek bir iş. Bölüm başlığı her yerde aynı
boyda, kartlar eşit, boşluklar aynı. Ziyaretçiyi asıl rahatsız edecek şey düzen değil,
sitenin birkaç yerde "yarımım" demesi: soluk düğme, kapalı form, "Örnek" etiketi,
indirilemeyen e-kitap. Hiyerarşide üç gerçek zayıflık var: tablette sayfa başlığı bölüm
başlığından büyük değil, altı yerde tam siyah bölüm duruyor, birkaç bölümde giriş
cümlesi dört satır.

**Sınırlar.** Çekim başsız Chrome ile yapıldı. 1440 hareket açıkken, öteki genişlikler
hareket azaltılmış modda çekildi. Açılır kutuların içi tek tek açılmadı, üstüne gelince
değişen hâllere (menü dışında) bakılmadı. İkincil sayfalar küçültülmüş karelerden
okundu; oradaki punto ve satır sayıları gözle değil ölçümle yazıldı. Deponun
`scripts/ekran.mjs` betiği ana sayfada 950 ile 2850 px arasını boş bastı (içerik yalnız
ekrandayken çiziliyor); bu yüzden sayfayı gerçekten kaydırıp pencereyi çeken bir kopya
kullanıldı. Boşluk ziyaretçinin gördüğü bir şey değil, bulgu sayılmadı.

Kanıt klasörü: oturumun scratchpad'i altında `masa-denetim/` (`g1440`, `g1280`,
`g1920`, `g820` kareler; `olcum-*.json` punto ölçümü; `menu/` panel çekimleri).

---

## Tutan şeyler (dokunma)

- Dört genişlikte de yana taşma yok. Kesilen metin yok, yüklenmeyen görsel yok.
- Bölüm başlığı ülke, hizmet ve ana sayfada her yerde 48 px. Kart başlığı 20, adım
  başlığı 18, soru satırı 16, gövde 14 ile 16. Kart başlığı her yerde gövdeden belirgin
  büyük.
- Bölüm boşluğu bölümlerin dörtte üçünde aynı: üstte 112, altta 112 (ölçülen 161
  bölümün 120'si; kalanlar giriş ve sayfa başları). Ritim tutarlı.
- Aynı satırdaki kartların boyları eşit; 24 px'ten büyük boy farkı hiçbir ızgarada
  çıkmadı.
- 1280'de düzen 1440 ile aynı, yalnız başlık bir basamak küçük. Sıkışma yok.
- Üst menü: dört panel de kutulu, başlık solda açıklama sağda, net. Tablette açılır
  menü dört sekmeli, iri satırlı, net.
- Fotoğraflı sektör kartları, yapı seçimi, VIP kartı, fiyat kutuları, süreç adımı,
  "kimin işine yarar" kartı: tek bakışta okunuyor.

---

## Önce düzeltilecekler

### A · Ziyaretçi bozuk ya da karışık diye algılar

**A1 · Ana sayfa · sektörlerin altındaki "Mevcut şirketinizi Ortac'a taşıyın" bandı · bütün genişlikler.**
Mavi "Şirketimi taşı" düğmesi soluk (yarı saydam) ve tıklanmıyor; kapalı bir sayfaya
bağlı olduğu için kendini kapatıyor. Ziyaretçi bozuk düğme görüyor.
Düzeltme: hedefi `/iletisim` yap ya da bandı kaldır. Yer: `.pf2-move .btn-primary`
(`src/components/home/Profiles.tsx`, hedef `/sirket-tasima`). Bu öneri `durum.md`'de
de onay bekliyor.

**A2 · `/iletisim` · form · bütün genişlikler.**
"Gönder" düğmesi gri, yanında "Gönderim kapalı" yazıyor, altında "Form henüz bir yere
bağlı değil" notu var. Sayfanın ilk işi olan form çalışmıyor görünüyor.
Düzeltme: formu bağla. Bağlanana kadar formu gizle, telefon, WhatsApp ve e-posta
kartlarını (şu an sayfanın altında) en üste al. Yer: `.ct-lock`, `.ct-note`.

**A3 · `/e-kitaplar` · liste · bütün genişlikler.**
Sayfa başlığı "E-kitapları indirin" diyor; on kitabın onu da "Örnek" etiketli, on
düğmenin onu da "Hazırlanıyor" yazıyor ve kapalı. Her satırda aynı 12 px not tekrar
ediyor ("Dosya hazırlandığında bu düğme açılacak").
Düzeltme: dosyalar gelene kadar sayfayı menüden ve footer'dan çıkar. Kalacaksa başlığı
"hazırlanıyor"a çek, notu listenin üstünde tek satır yap. Yer: `.kyn-dl-off`,
`.kyn-dl-note`.

**A4 · `/kariyer` · ilanlar ve form · bütün genişlikler.**
Dört ilanın dördü de "Örnek" etiketli. Altındaki başvuru formunda gönderim kapalı,
özgeçmiş yükleme kapalı. Ziyaretçi sahte ilan ve çalışmayan form görüyor.
Düzeltme: gerçek ilan yoksa ilan listesini ve formu kaldır; "Açık başvuru" bölümü ile
iletişim bağlantısı kalsın. Yer: `.krm-seed`, `.krm-lock`, `.krm-job`.

**A5 · `/is-ortakligi` · "Ticari şartlar" kutusu ve başvuru formu · bütün genişlikler.**
Kutuda dört satır var (komisyon oranı, asgari yönlendirme şartı, ödeme koşulu,
white-label bedeli), dördünün de değeri boş çizgi; altında "Bu dört başlık şu an
sayfada yayımlanmıyor" yazıyor. Aşağıdaki formun üstünde "Form henüz açılmadı" rozeti,
düğmesi gri.
Düzeltme: kutuyu kaldır, yerine tek cümle ve "Ortaklık şartlarını sorun" düğmesi
kalsın. Formu kaldır ya da bağla. Yer: `.pt-form-badge` ve "Ticari şartlar" kutusu.

**A6 · `/blog`, `/gelismeler`, `/kaynaklar`, ana sayfa "Yazılar" bölümü · bütün genişlikler.**
Blogda 15 yazının 14'ü "Örnek" etiketli; listenin üstünde yazıların örnek kayıt
olduğunu ve bağlantıların demo sayfasına indiğini söyleyen satır var. `/gelismeler`de
22 kaydın hepsi "Örnek". Ana sayfadaki beş satırın beşi de "Örnek".
Not: müşteri 20.08.2026'da "dursunlar, tamamlayınca kaldırırız" demişti. Teslimden önce
bir kez daha sorulmalı.
Düzeltme: ya etiketleri ve itiraf satırını kaldır, ya bu üç sayfayı menüden çıkar ve
ana sayfadaki bölümü gizle. Yer: `.bh-seed`, `.kyn-seed-tag`, `.bh-switch-n`.

**A7 · `/basla` · ülke seçimi · bütün genişlikler.**
Üç ülke kartından İngiltere gri ve "Yakında bu akışta" yazıyor. Sitenin ana düğmesi
("Kurulumu Başlat") buraya geliyor.
Düzeltme: İngiltere kartını `/ingiltere`deki fiyat bölümüne bağla ya da kartı gizle.

**A8 · Ana sayfa · "Neden Ortac Global?" · 820 px (tablet).**
Dört karo üç sütuna sıkışıyor. Sohbet karosunda "Çevrimiçi" yazısı panelin sağ
kenarından 13 px dışarı taşıyor, "Merve · danışmanınız" iki satıra kırılıyor. "Şeffaf
süreç" satırları iki üç satıra bölünüyor ("Lisans dosyası kurumda" üç satır). "30 yıllık
kurumsal geçmiş" karosunda harita kutusunun üst yarısı boş.
Düzeltme: 1023 px altında `.bn` iki sütun olsun; uzun gece karo (`.bn-tile-tall`)
tam genişlikte alta insin.

**A9 · `/dubai` · "Dubai'de vergi çerçevesi" ve "Kazancınızı Türkiye'ye nasıl getirirsiniz?" · bütün genişlikler.**
"Kıyas ülkesi" kutusunda seçili "Türkiye" kırmızı çerçeveli; altındaki seçili "Türkiye"
çipi de kırmızı çerçeveli. Kırmızı çerçeve form hatası gibi okunuyor.
Düzeltme: seçili çerçeve sitenin her yerindeki gibi mavi olsun; kırmızı yalnız bayrakta
kalsın. Yer: `.txm-sel-i`, `.mh-flag`.

**A10 · Footer ve menü · her sayfa.**
Footer'da "Sponsor Licence", "Şirket Adresi", "Serbest Bölge" ve "Panel girişi" soluk
duruyor ve tıklanmıyor (kapalı sayfalara bağlı). Tablet menüsünde "Panel girişi" de
öyle.
Düzeltme: açılmamış sayfaların bağlantısını footer'dan ve menüden çıkar.

### B · Hiyerarşi zayıf

**B1 · Bütün sayfalar · sayfa başlığı · 820 px.**
Sayfa başlığı bölüm başlığından büyük değil: ana sayfada 39 px, ülke ve hizmet
sayfalarında 41, iç sayfalarda 36; bölüm başlığı ise 40. `/iletisim`de sayfa başlığı
bölüm başlığından küçük kalıyor.
Düzeltme: 720 ile 1023 arasında sayfa başlığı 48 olsun (tasarım sistemindeki `--fs-h1`
zaten bunu söylüyor). Yer: `.hak-h1` (`hero-akis.css:90`), `.dhr-h1`
(`dubai-hero.css:52`), `.ph-title` (`globals.css:2795`); üçü de pencere genişliğine
bağlı ölçüyle yazılmış, alt sınırı düşük. Aynı ölçü `.lhz-h1`de de var
(`lab-hizmet-hero.css:43`).

**B2 · Tam siyah bölümler · 1440 ve altı.**
Kural (07.10.2026): bölüm zemini beyaz ve kırık beyaz sırayla, siyah yalnız büyük
kartta. Hâlâ tam siyah duran yerler:
- `/dubai/muhasebe`: alıntı bandı (`.svm-alinti`, 561 px) ve "Muhasebe hizmetinin
  bedeli" (`.sec-night`, 986 px). Sayfada ayrıca dört gece kart var; sayfa çok siyah.
- `/hakkimizda`: "Neye dayanarak çalışıyoruz" (`.ab-dy-sec`, 1198 px); siyah zeminde
  siyah karolar, karolar birbirinden zor ayrılıyor.
- `/sektorler/e-ticaret`: "Aynı ölçütler, üç ülkede üç ayrı cevap" (1518 px) ve
  "Ortac ne yapıyor?" (1010 px).
- `/is-ortakligi`: "Müşterinize ne götürüyorsunuz" (940 px).
- `/basla`: sayfanın tamamı.
Düzeltme: içeriği `.sec-night.gece-kart` kalıbına al (başlık açık zeminde, içerik
büyük gece kartta); ülke sayfalarının fiyat bölümünde yapılanın aynısı.

**B3 · `/araclar` · "Hesaplayıcılar" ve "Karar araçları" · bütün genişlikler.**
Grup başlığı kart başlığından küçük ve ince: grup 16 px ince, kart başlığı 17 px kalın.
Göz gruplara değil doğrudan kartlara gidiyor.
Düzeltme: `.tl-group-h` 24 px kalın; `.tl-ix-t` 16 ya da 18 (17 basamakta yok).

**B4 · `/gelismeler` · akış · bütün genişlikler.**
Satırın en baskın öğesi gün rakamı: 28 px, kalın ve ülkeye göre renkli (Dubai yeşil,
KKTC kırmızı, İngiltere lacivert). Göz başlığa değil rakama gidiyor. Yeşil para rengi
olduğu hâlde burada ülke rengi olmuş.
Düzeltme: rakam 20 px ve siyah, ülke adı nötr gri, ülkeyi bayrak söylesin.
Yer: `.kyn-up-dd`, `.kyn-up-ctry`.

**B5 · Giriş cümleleri uzun · 1440.**
Kural: giriş cümlesi en fazla 3 satır, bölüm cümlesi en fazla 2.
- Dört satırlık giriş: `/dubai`, `/kktc` (`.dhr-lead`), `/is-ortakligi` (`.ph-lead`).
- Dört satırlık bölüm cümlesi: `/dubai` "Kuruluş sonrasında sizi bekleyen
  yükümlülükler", `/dubai/banka-hesabi` "Kurumsal banka hesabı", `/kariyer`
  "Açık başvuru".
- Üç satırlık bölüm cümlesi on beş yerde: ana sayfa "Uzmanlık alanlarımız", `/dubai`
  ofis, `/kktc` (üç bölüm), `/dubai/banka-hesabi`, `/dubai/oturum-vize` (iki),
  `/kktc/banka-hesabi` (iki), `/hakkimizda` kurumlar, `/sektorler/e-ticaret` (üç),
  `/is-ortakligi`.
Düzeltme: punto aynı kalsın, cümle kısalsın.

**B6 · `/dubai/oturum-vize` · "Kimler vize alabiliyor" ve "Oturumu korumak" · 1440.**
İlkinde üç kartın üçü de dört satır yazı; ikincisinde dört kart üçer dörder satır.
Yan yana yedi küçük paragraf yazı yığını gibi duruyor.
Düzeltme: kart cümlesi iki satır. Yer: `.svz-tur-s`.

**B7 · Okunacak yazı 14 px'in altında · bütün genişlikler.**
- `/uygunluk-testi` sağ panel: 10,5 px, dört satır not (`.uyg-sum-note`).
- `/ingiltere` ve `/ingiltere/muhasebe`: ceza tutarları 12 px (`.ctk-ceza`). Bölümün en
  önemli bilgisi en küçük puntoda.
- Süreç bölümünün altındaki not 12 px (`.srp-note`; ana sayfa ve üç ülke sayfası).
- `/kaynaklar` kart altı notları (`.kyn-door-not`), `/sektorler/e-ticaret` tablo
  notları (`.sxk-note`, `.sxk-more`, `.sxk-cn`), harita kartındaki adres
  (`.omap-label`), form notları (`.ct-note`, `.krm-note`): hepsi 12 px cümle.
Düzeltme: okunacaksa 14, okunmayacaksa kaldır.

**B8 · `/hakkimizda` · "Birlikte çalıştığımız kurumlar" ve kapanış · 1440.**
Beş karo üç satıra diziliyor, üçüncü satırda "Binance Pay" tek başına, sağında ekranın
üçte ikisi boş. Sayfanın sonundaki "Markamız hakkında daha fazla bilgi için bize
ulaşın" bloğunda başlık 34 px, düğme küçük ve en sağda; hemen altında büyük footer
çağrısı geldiği için iki kapanış üst üste.
Düzeltme: Binance'i "Ödeme altyapısı" karosuna al (`.ab-ku`); `.ab-kapanis` bölümünü
kaldır.

**B9 · `/sektorler/e-ticaret` · üç ülke bölümü ve siyah tablo · 1440.**
Her ülke bölümünün sağındaki gece kart soyut bir çizim (üst üste karolar, devre, halka)
ve ortasında mavi ışık halesi var; içerik taşımıyor, kurala da aykırı (ışık yok, çizimde
gerçek içerik). Siyah tabloda hücre yazısı 12 px, altında iki not paragrafı açık basılı.
Düzeltme: `.sxc-art` içine gerçek içerik (o ülkede açık olan kanalların logoları) ya da
fotoğraf; ışık halesi kalksın. Notlar açılır kutuya.

**B10 · `/basinda-biz` · kayıt listesi · 1440.**
Sekiz kart aynı kalıpta alt alta; beşinin başlığı neredeyse aynı cümle. Yazı kartın sol
yarısında bitiyor (kart 1136 px, yazı 598 px), sağ yarı boş.
Düzeltme: iki sütunlu ızgara, yayın adı (ya da logosu) büyüsün. Yer: `.krm-feed`,
`.krm-item`.

**B11 · Zemin ritmi · 1440.**
Kural beyaz ile kırık beyazın sırayla gelmesi. `/dubai`de "süreç"ten sayfa sonuna
sekiz bölüm, `/kktc` ve `/ingiltere`de altı bölüm art arda beyaz. Hizmet sayfalarının
çoğunda (banka, vize, muhasebe) bütün bölümler beyaz. Bölümleri yalnız boşluk ayırıyor
(iki bölüm arası 224 px); okunuyor ama sayfa uzadıkça nerede olduğunuz belli olmuyor.
Düzeltme: her ikinci bölüme `--paper` zemin.

**B12 · 1920 px · bütün sayfalar.**
İçerik 1136 px'te kalıyor, iki yanda 392'şer px boş. Giriş fotoğrafı dışında her şey
ekranın ortasında dar bir sütun; başlık ve kartlar büyük ekranda küçük duruyor.
`/basla`de ekranın büyük kısmı boş siyah.
Düzeltme: 1680 px ve üstünde `--container` 1320 ile 1360 arası.

**B13 · Hizmet sayfaları · adım listeleri · 1440.**
"Başvuru nasıl yürüyor", "Hesap nasıl açılıyor", "Nasıl ilerliyor" satırlarında başlık
sütunu dar; "Tescil ve bankanın kararı", "Faaliyetinize bakıyoruz" gibi başlıklar iki
satıra kırılıyor, oysa satırın sağ yarısı boş.
Düzeltme: başlık sütununu genişlet. Yer: `.svb-adim-t`, `.svz-adim-t`.

**B14 · Renk kuralı · birkaç yer.**
- Ana sayfa "Devralınan dosyalar": tikler, "kapatıldı" ve "Devralındı" yeşil
  (`.bn-fix b`, `.bn-node-ok`). Kural onay için mavi diyor, yeşil yalnız para.
- `/dubai` kıyas çubuğunda Türkiye kırmızı; kırmızının sitede bir anlamı yok.
- `/ingiltere` ödeme kartlarında etiketler mavi, amber ve yeşil karışık
  (`.cos-etiket`); etiketin rengi bir şey söylemiyor.
- `/kariyer`de "Bu pozisyona başvurun" düğmeleri siyah (`.krm-apply`); sitenin ana
  düğmesi mavi.

**B15 · Sayfa başlığı üç ayrı boyda ve basamak dışında · 1440.**
Ana sayfa 69, ülke ve hizmet sayfaları 68, iç sayfalar 58, `/basla` 48. Tasarım sistemi
64 diyor. İki kademe (büyük giriş, iç sayfa başı) kalabilir ama basamağa otursun (64 ve
56). Basamak dışı öteki boylar: 46 ve 34 (`/hakkimizda`), 38 (`/sektorler` ülke
başlığı), 31, 30, 29, 22, 17.

**B16 · `/dubai` · "yükümlülükler" bölümünün sonu · 1440.**
Dört satırlık şart paragrafı açık basılı ("Tutarlar USD ve aksi belirtilmedikçe KDV
hariç…", `.aft-foot`). `/dubai/oturum-vize`de "Kaynak: BAE resmî portalı" satırı da
açıkta.
Düzeltme: ikisi de açılır "Ayrıntılar"a.

**B17 · Ana sayfa · "Hizmet verdiğimiz ülkeler" · 1440.**
Başlık 48 px, asıl içerik (üç ülke) küçük: bayrak 40 px, ad 20, iki madde 14. Altta
solda gri ipucu cümlesi, en sağda düğme; ikisi iki uçta dağınık duruyor. Bölümün alt
yarısı boş hissettiriyor.
Düzeltme: bayrak ve ülke adı bir basamak büyüsün; ipucu ile düğme yan yana gelsin.

**B18 · Küçük tutarsızlıklar.**
- Muhasebe fiyat bölümü Dubai'de tam siyah, KKTC'de kırık beyazda beyaz kart.
- Araç sayfasında "Sık sorulan sorular.", öteki her yerde "Sık sorulanlar."
- `/hakkimizda` bölüm başlıklarında nokta yok, öteki sayfalarda var.
- `/kaynaklar`da "Örnek" etiketi üç kartta amber, e-kitap kartında siyah hap.
- `/araclar`da iki kart aynı fotoğrafı kullanıyor (SIC kodu bulucu, IFZA kodu bulucu).
- İngiltere girişinde fiyat yok; Dubai ve KKTC girişinde yeşil fiyat var.
- `/ingiltere` ödeme kartları 3 + 3 + 2 diziliyor, son satırda bir hücre boş; `/araclar`
  "Karar araçları" 3 + 2.
- `/iletisim` 820 px'te üç kanal kartı 2 + 1 diziliyor, e-posta tek başına (`.ct-chs`).
- `/dubai` serbest bölge kartında "En çok tercih edilen" rozeti (`.dbe-rozet`):
  görsel sorun değil, ama `tuzaklar.md` bu etiketi teyitsiz yasaklıyor; teyidi var mı
  bakılmalı.

---

## Sayfa sayfa

Her satır bir bölüm. "Net": göz tek bir yere gidiyor, sıra anlaşılıyor.

### `/` ana sayfa
- Giriş: net. Göz dört satırlık başlığa gidiyor, sağdaki üç durum kartı ikinci sırada.
- Logo şeridi: net.
- Hizmet verdiğimiz ülkeler: okunuyor ama içerik başlığın yanında küçük (B17).
- Uzmanlık alanlarımız: net. Altı kart eşit; giriş cümlesi üç satır.
- Neden Ortac Global?: 1440'ta okunuyor ama kalabalık, dört karonun dördü ayrı bir
  sahne ve baskın olan yok; 820'de bozuk (A8); onay yeşili (B14).
- Hizmet verdiğimiz sektörler: net. Altındaki taşıma bandında soluk düğme (A1).
- Bir şirketin bütün döngüsü: net.
- Kuruluşta nasıl çalışıyoruz: net. Alt not 12 px (B7).
- Yazılar, gelişmeler ve e-kitaplar: düzen net; beş satırın beşi "Örnek" (A6).
- Sık sorulanlar: net.
- Kapanış ve footer: net; soluk bağlantılar (A10).

### `/dubai`
- Giriş: net; cümle dört satır (B5).
- Önce yapıyı seçiyoruz: net.
- Üç serbest bölge: net; rozet notu (B18).
- Avantajlar: net.
- Kendi ofisimizden yürütüyoruz: net; cümle üç satır.
- VIP vize: net.
- Kurulumunuzu seçin: net.
- Süreç, adım adım: net; alt not 12 px.
- Nelere ihtiyacınız var: net.
- Vergi çerçevesi: düzen net; kırmızı çerçeve (A9).
- Kazancınızı Türkiye'ye nasıl getirirsiniz: net; seçili çip kırmızı (A9).
- Kuruluş sonrası yükümlülükler: kartlar net; giriş dört satır, sonda dört satır
  dipnot (B5, B16).
- Kimin işine yarar: net.
- Sık sorulanlar: net.
- Diğer ülkelere bakın: net.
- Zemin: son sekiz bölüm art arda beyaz (B11).

### `/kktc`
- Giriş: net; cümle dört satır (B5).
- Avantajlar: net.
- Kendi ofisimizden yürütüyoruz: net.
- Vergi çerçevesi: net.
- Vergi nerede çıkıyor: net; cümle üç satır.
- Hangi ödeme kanalı çalışıyor: net; sekiz kartın altısı "Açılmıyor".
- Kuruluş, kalem kalem: net.
- Sermaye bloke kalıyor mu: net.
- Süreç: net. Nelere ihtiyacınız var: net. Kimin işine yarar: net.
- Sık sorulanlar: net ama on iki soru, uzun.
- Diğer ülkelere bakın: net.

### `/ingiltere`
- Giriş: net; fiyat yok (B18).
- Avantajlar: net. Kendi ofisimizden: net.
- Vergi çerçevesi: net (eğri grafiği baskın).
- Vergi nerede çıkıyor: net.
- Hangi ödeme kanalı çalışıyor: şema net; altındaki sekiz kart 3 + 3 + 2, etiket
  renkleri karışık (B14, B18).
- Kurulumunuzu seçin: net. Süreç: net. Nelere ihtiyacınız var: net.
- Kuruluştan sonra her yıl ne var: net; ceza tutarları 12 px (B7).
- Kimin işine yarar: net. Sık sorulanlar: net. Diğer ülkelere bakın: net.

### `/dubai/muhasebe`
- Giriş: net. Defteri kimin tuttuğu: net. Ne yapıyoruz, ne yapmıyoruz: net.
- Alıntı bandı: tam siyah (B2).
- Hangi ayda ne çıkıyor: net. Düzenli muhasebenin karşılığı: net.
- Muhasebecinizi değiştirmek: net. Bana hangi hizmetler gerekiyor: net.
- Muhasebe hizmetinin bedeli: tam siyah bölüm (B2).
- Sık sorulanlar: net.

### `/dubai/banka-hesabi`
- Giriş: başlık dört satır ve 68 px, ağır ama net.
- Kurumsal banka hesabı: net; cümle dört satır (B5).
- Ödeme ve tahsilat kanalları: net; cümle üç satır.
- Başvuru nasıl yürüyor: net; başlık sütunu dar (B13).
- Nelere ihtiyacınız var: net. Sık sorulanlar: net.
- Zemin: altı bölümün altısı beyaz (B11).

### `/dubai/oturum-vize`
- Giriş: net.
- Kimler vize alabiliyor: yazı yığını (B6).
- Vize kotası: net; cümle üç satır.
- Başvuru nasıl yürüyor: net; başlık sütunu dar (B13).
- Oturumu korumak: yazı yığını; kaynak satırı açıkta (B6, B16).
- Nelere ihtiyacınız var: net. Sık sorulanlar: net.

### `/dubai/vergi`
- Giriş: net. Vergide neye bakıyoruz: net. Bilmeniz gereken dört kural: net.
- Nasıl ilerliyor: net; başlık sütunu dar (B13).
- Sık sorulanlar: net. Dubai için diğer hizmetler: net.

### `/kktc/muhasebe`
- Giriş, defteri kimin tuttuğu, ne yapıyoruz, yıl içinde ne zaman ne çıkıyor,
  düzenli muhasebenin karşılığı, ücret, sık sorulanlar: hepsi net.

### `/kktc/banka-hesabi`
- Giriş: net. Kurumsal banka hesabı: net; cümle üç satır.
- Ödeme ve tahsilat kanalları: net. Hesap nasıl açılıyor: net; başlık sütunu dar (B13).
- Nelere ihtiyacınız var: net. Sık sorulanlar: net.

### `/ingiltere/muhasebe`
- Giriş, defteri kimin tuttuğu, ne yapıyoruz: net.
- Hangi dosya ne zaman veriliyor: net; ceza tutarları 12 px (B7).
- Düzenli muhasebenin karşılığı: net. Sık sorulanlar: net.

### `/ingiltere/banka-hesabi`
- Giriş: başlık dört satır, ağır ama net.
- Kurumsal banka hesabı, ödeme kanalları: net.
- Hesap nasıl açılıyor: net; başlık sütunu dar (B13).
- Nelere ihtiyacınız var: net. Sık sorulanlar: net.

### `/hakkimizda`
- Sayfa başı: net.
- Afiş, vizyon ve misyon: net.
- Neye dayanarak çalışıyoruz: tam siyah, karolar zeminden zor ayrılıyor (B2).
- Birlikte çalıştığımız kurumlar: son karo tek başına (B8).
- İşi kim yürütüyor: net. Hangi sektörlerde çalışıyoruz: net. Künye: net.
- Kapanış: zayıf ve footer çağrısıyla üst üste (B8).

### `/iletisim`
- Sayfa başı: net.
- Form: düzen net, gönderim kapalı (A2).
- Üç ülkede de kendi ofisimiz var: net; 820'de kanal kartları 2 + 1 (B18).

### `/ulkeler`
- Sayfa başı: net.
- Karşılaştırma tablosu: yoğun ama düzenli; Dubai sütunu vurgulu, göz oraya gidiyor.
  Satır altı açıklamalar 12 px.

### `/sektorler/e-ticaret`
- Sayfa başı: net. Dört ölçüt: net.
- Aynı ölçütler, üç ülkede üç ayrı cevap: tam siyah, tablo yoğun ve küçük puntolu
  (B2, B9).
- Dubai, İngiltere, KKTC bölümleri: sol taraf net; sağdaki sahne boş duruyor (B9).
  Bölüm başlığı burada 38 px.
- Ortac ne yapıyor: tam siyah; satır açıklamaları üç satır (B2).
- Sık sorulanlar: net.

### `/blog`
- Sayfa başı: net.
- Liste: düzen net (öne çıkan yazı büyük, satırlar küçük); "Örnek" ve itiraf satırı
  (A6). Satırlar ince çizgiyle ayrılmış; sitenin geri kalanı kutu kullanıyor.
- Kaynakların dört türü: net.

### `/kaynaklar`
- Sayfa başı: net; cümle üç satır.
- Dört tür, dört ayrı yer: net; "Örnek" etiketi iki kılıkta, kart altı notlar 12 px
  (B7, B18).

### `/araclar`
- Sayfa başı: net.
- Hesaplayıcılar ve karar araçları: grup başlığı kart başlığından küçük (B3); iki
  kartta aynı fotoğraf (B18).

### `/araclar/kurumlar-vergisi/dubai`
- Sayfa başı: net.
- Araç kutusu: çok öğe var ama sıra belli (girdi, sonuç, döküm, kural).
- Sık sorulan sorular: net; başlık öteki sayfalardan farklı (B18).

### `/uygunluk-testi`
- Sayfa başı: net.
- Test kutusu: net; sağ paneldeki not 10,5 px (B7).

### `/basla`
- Tek ekran: sihirbaz net, soru başlığı baskın. Sayfa tamamen siyah (B2); İngiltere
  kartı kapalı (A7).

### `/is-ortakligi`
- Sayfa başı: cümle dört satır (B5).
- İki ortaklık modeli: iki kart net; altındaki "Ticari şartlar" kutusu boş (A5).
- Müşterinize ne götürüyorsunuz: tam siyah (B2).
- Müşteriniz kuruluşta bırakılmıyor: net. Kimler ortak olabilir: net.
- Ortaklık başvurusu: form kapalı (A5).
- Ortaklıkta sık sorulanlar: net.

### `/kariyer`
- Sayfa başı: net.
- İlanlar: dört kart, hepsi "Örnek"; kartlar yazı ağırlıklı, düğmeler siyah (A4, B14).
- Başvuru formu: kapalı (A4).
- Açık başvuru: cümle dört satır (B5).

### `/basinda-biz`
- Sayfa başı: net.
- Kayıtlar: tekdüze, sağ yarı boş (B10).
- Basından geliyorsanız: net.

### `/e-kitaplar`
- Sayfa başı: net.
- Liste: on kitabın onu kapalı (A3).
- Kaynakların dört türü: net.

### `/gelismeler`
- Sayfa başı: net.
- Akış: gün rakamı baskın ve renkli (B4); 22 kaydın hepsi "Örnek" (A6).
- Kaynakların dört türü: net.

### `/kvkk`
- Sayfa başı: net. Metin: net; düz yazı, başlıklar 22 px, sütun sola yaslı.

---

## Genişlik karşılaştırması

- **1280 (küçük laptop).** Düzen 1440 ile aynı. Sayfa başlığı 61 ile 64 px, bölüm
  başlığı 48. Kırılma, sıkışma, taşma yok.
- **1440.** Ana ölçü; yukarıdaki bulguların çoğu burada.
- **1920 (büyük ekran).** Taşma yok ama içerik dar kalıyor (B12).
- **820 (tablet dik).** Düzen genel olarak tutuyor: kartlar iki sütuna iniyor, giriş
  fotoğrafı yazının altına geçiyor, fiyat kutuları alt alta. Üç sorun: ana sayfadaki
  bento sıkışıyor (A8), sayfa başlığı bölüm başlığıyla aynı boyda (B1), `/iletisim`
  kanal kartları 2 + 1 (B18).

## Üst menü

- Hizmetler: ülke sekmesi, fotoğraflı kart, yedi satır. Net.
- Araçlar: sekiz satır iki sütun, sağda bayrak. Net.
- Kaynaklar: solda dört satır, sağda iki kart; sağ sütun kısa kaldığı için altında
  küçük bir boşluk var. Net.
- Kurumsal: dört satır ve gece iletişim kartı. Net.
- Tablet açılır menü: net; "Panel girişi" soluk (A10).

Hiçbir bölüm "bitti" sayılmamalı; bu liste şimdiki hâlin dökümü.
