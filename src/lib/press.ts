/* ============================================================================
   BASINDA BİZ — basın kayıtlarının tek defteri.
   Sayfa: src/app/basinda-biz/page.tsx · Biçim: src/app/css/kurumsal.css

   ------------------------------------------------- BU TURDA NE DEĞİŞTİ
   Önceki hâlde `PRESS` boştu ve gerekçe şuydu: "depoda doğrulanmış tek bir
   basın kaydı yok". Gerekçe doğruydu ama eksikti — kayıtlar DEPODA yoktu,
   firmanın kendisinde vardı. Müşteri yayındaki sitesini kaynak gösterdi
   (ortacglobal.com/basinda-biz) ve aşağıdaki sekiz kayıt oradan alındı.

   Yani bu liste yer tutucuyla DOLDURULMADI; gerçekten dolu. Sitenin bu turdaki
   yer tutucu politikası (sayfalar doluymuş gibi dolsun, ayrımı kayıt başına
   küçük bir "Örnek" rozeti taşısın) bu dosyada UYGULANMIYOR ve sebebi aşağıda.

   -------------------------------------- NEDEN BURAYA YER TUTUCU GİRMİYOR
   /kariyer'e ve bloga yer tutucu kayıt girebiliyor, çünkü oradaki cümlelerin
   sahibi FİRMANIN KENDİSİ — uydurma bir ilan, firmanın kendi ağzından yazılmış
   bir taslaktır ve rozet onu dürüstçe işaretler.

   Basın kaydı öyle değil: her satır ÜÇÜNCÜ BİR TARAFIN ağzından bir iddia.
   "Örnek" rozeti taşısa bile, gerçek ve adı geçen bir yayının (Hürriyet, Dünya)
   yazmadığı bir başlığı o yayına atfetmek olurdu. Rozet bunu güvenli hâle
   getirmiyor; yalnızca daha küçük yazıyor. Liste zaten sekiz gerçek kayıtla
   dolu, yani doldurulacak bir tasarım boşluğu da yok.

   -------------------------------------------------- ŞEMANIN KENDİSİ BİR KİLİT
   `url` ve `publishedAt` zorunlu: kaynaksız ya da tarihsiz kayıt tip
   denetiminden geçmiyor. Aynı kilit /e-kitaplar'da da var (Ebook.file).

   Kilit bu turda İŞE YARADI — aşağıdaki "GİRMEYEN KAYIT" notuna bakın.

   ------------------------------------------------------------ NASIL DOĞRULANDI
   Sekiz adresin sekizi de tek tek çağrıldı ve 200 döndü; ayrıca sekizinin de
   gövdesinde "Murat Ortaç" geçiyor, yani kayıtlar gerçekten firmayı anlatıyor.
   Bu bir kereye mahsus bir kontrol değil: haber adresleri zamanla ölüyor, yeni
   kayıt eklerken aynı iki şeye bakın — adres açılıyor mu, haber firmadan
   bahsediyor mu.

   ------------------------------------------------------------ GİRMEYEN KAYIT
   Yayındaki sitede DOKUZUNCU bir kayıt daha var:

     ekonomigundemi.com.tr · 29 Nis 2024
     "Türkiye – Dubai ikili ticareti 5 yıl içinde 40 milyar dolara çıkacak"
     https://ekonomigundemi.com.tr/turkiye-dubai-ikili-ticareti-5-yil-icinde-40-milyar-dolara-cikacak/180008/

   Bu adres 404 dönüyor ("Sayfa bulunamadı — EkonomiGundemi"); sitenin kendisi
   ayakta, silinen şey haberin kendisi. Kayıt bu yüzden listeye ALINMADI:
   kartın altındaki "Kaynağında okuyun" bağlantısı ölü bir sayfaya inerdi ve
   aynı adres JSON-LD'ye de `NewsArticle` olarak yazılırdı.

   Geri eklemenin tek yolu çalışan bir adres bulmak. Arşiv bağlantısı (Wayback)
   çözüm DEĞİL: bu alan "yayının kendi adresi" diye okunuyor.

   --------------------------------------------------------- BİR DÜZELTME
   r10 kaydında yayındaki site haberin kendisine değil, blogun ANA SAYFASINA
   bağlanıyor (blog.r10.net). Ana sayfa okuyucuyu habere ulaştırmıyor, yani
   şemanın "kaynağına gidilebilsin" kuralını karşılamıyor. Haberin kendi adresi
   bulundu ve doğrulandı; aşağıda o duruyor.

   SWAP:PRESS_ITEMS — yeni kayıt geldiğinde yapılacak tek şey diziye bir satır
   eklemek. Sıralamayı `sortedPress()` yapıyor.

   ------------------------------------------- KAYIT BAŞINA İKİ YENİ YUVA
   Bu turda şemaya iki isteğe bağlı alan girdi, ikisi de bugün BOŞ:
     `shot`  SWAP:PRESS_SHOT        haberin ekran görüntüsü
     `quote` SWAP:PRESS_QUOTE_ITEM  haberde bize ait olan cümle
   Gerekçeleri ve doldurma ölçüleri tanımlarının başında. İkisi de boşken
   kart bozulmuyor: görsel yoksa plaka sütunun tamamını alıyor, alıntı yoksa
   gövde özetten doğrudan bağlantıya geçiyor.
   ========================================================================= */

/** Kaydın türü. Röportaj ile haber aynı şey değil: birinde konuşan biziz. */
export type PressKind = "haber" | "roportaj" | "kose" | "bulten";

export const PRESS_KIND_LABEL: Record<PressKind, string> = {
  haber: "Haber",
  roportaj: "Röportaj",
  kose: "Köşe yazısı",
  bulten: "Bülten",
};

export type PressItem = {
  /** React anahtarı ve JSON-LD kimliği; adres parçası DEĞİL */
  id: string;
  /** yayının adı — ekranda tam olarak böyle çıkıyor */
  outlet: string;
  /** haberin KENDİ başlığı; bizim özetimiz değil */
  title: string;
  /**
   * ZORUNLU — yayının kendi adresi.
   * Bu alan opsiyonel olsaydı defter "şurada da çıkmıştık" tipi, okuyucunun
   * doğrulayamayacağı satırlarla dolardı. Bağlantısı olmayan kayıt yazılamaz.
   */
  url: string;
  /** ZORUNLU — YYYY-MM-DD. Tarihsiz basın kaydı doğrulanamaz. */
  publishedAt: string;
  kind: PressKind;
  lang: "tr" | "en";
  /** en fazla iki cümle: haberin ne dediği. Bizim yorumumuz buraya girmiyor. */
  summary?: string;

  /* ------------------------------------------------------- SWAP:PRESS_SHOT
     Haberin KENDİ sayfasından alınmış ekran görüntüsü. Telif engeli kalktı
     (müşteri: "telif sorunumuz yok neyse koyalım, haberden ss fln olur"),
     ama bugün elimizde tek bir kare YOK ve üretilemez de: uydurulmuş bir
     haber ekranı, uydurulmuş bir basın kaydından farksız olurdu. Alan bu
     yüzden şemada var, sekiz kaydın hiçbirinde dolu değil.

     MÜŞTERİYE VERİLECEK TEK SATIRLIK TARİF
     4:3 dikey oranlı kare, en az 1200 × 900 piksel, JPG ya da PNG; karede
     yayının kendi başlığı (masthead) ve haberin başlığı görünsün, tarayıcı
     çerçevesi ve reklam bandı girmesin.

     Neden 4:3 ve neden üstten hizalı: kart iki sütun ve sol sütun 176 piksel
     (dar ekranda 132). Bir haber sayfasının bilgi taşıyan kısmı üst şeridi —
     kırpma `object-position: top center` ile oradan başlıyor (kural CSS'te,
     kurumsal.css · .krm-item-shot-i). 1200 × 900 istemenin sebebi ölçü:
     telefonda kart tek sütuna düşüyor ve görsel ~660 piksele kadar
     genişleyebiliyor, 2× için 1320 gerekiyor.

     Dosya /public/basin/ altına konuyor ve buraya kök yolu yazılıyor
     ("/basin/hurriyet-2024-04-30.jpg"). Adres alanı DEĞİL: `url` yayının
     kendi adresi, bu ise bizim sunucumuzdaki dosya.

     ALT METNİ ALAN OLARAK YOK ve bu bilinçli: görsel, adı ve başlığı zaten
     yazan bir bağlantının içinde duruyor, yani yeni bilgi taşımıyor —
     erişilebilirlik ağacında doğru karşılığı boş alt. Sitedeki kalıp aynı
     (blog/BlogHub.tsx · RowThumb). */
  shot?: string;

  /* ------------------------------------------------ SWAP:PRESS_QUOTE_ITEM
     Bu haberin İÇİNDE bize ait olan cümle. Sayfanın kendi kuralı ("alıntının
     kaynağı yazılmadan alıntı basılmaz") burada kendiliğinden karşılanıyor:
     kart zaten yayının adını, tarihini ve haberin adresini taşıyor, yani
     kaynak alıntının yanında duruyor. Sayfa düzeyindeki PRESS_QUOTE tam da
     bu yüzden bir turdur boş — orada kaynak elimizde yok.

     Doldurma kuralı: cümle haberde GEÇTİĞİ GİBİ yazılır, düzeltilmez ve
     kısaltılmaz. `who` cümlenin sahibi; ekranda künye satırı olarak basılıyor. */
  quote?: { text: string; who: string };
};

/* SWAP:PRESS_ITEMS — bkz. dosya başı.

   ÖZETLER HABERİN KENDİ SPOT METNİ, bizim yazdığımız tanıtım değil. Nisan
   2024 kayıtlarının birkaçında özet neredeyse aynı; sebebi haberin ajans
   metni olarak birden çok yayında çıkmış olması. Tekrarı "sayfa daha iyi
   görünsün" diye yeniden yazmak, üçüncü tarafın metnini değiştirmek olurdu —
   olduğu gibi duruyor.

   Kayıtların sekizi de `kind: "haber"`. Hiçbiri röportaj değil: konuşan biz
   olsak da yayımlanan şey haber, içinde uzman görüşü olarak alıntılanıyoruz.
   Türü olduğundan yukarı çekmek (röportaj/köşe yazısı yazmak) küçük ama
   gerçek bir abartma olurdu. */
export const PRESS: PressItem[] = [
  {
    id: "capital-2024-11-12",
    outlet: "Capital",
    title: "Türkiye-Dubai ticareti 5 yılda 40 milyar dolara çıkacak",
    url: "https://www.capital.com.tr/haberler/tum-haberler/turkiye-dubai-ticareti-5-yilda-40-milyar-dolara-cikacak",
    publishedAt: "2024-11-12",
    kind: "haber",
    lang: "tr",
    summary:
      "Dubai, yalnızca iş kurma fırsatlarıyla değil, aynı zamanda şirketlerin finansal süreçlerini doğru ve etkin bir şekilde yönetebilmesi için sunduğu modern altyapıyla da dikkat çekiyor.",
  },
  {
    id: "ekonomist-2024-11-11",
    outlet: "Ekonomist",
    title: "Türkiye-Dubai ticareti 5 yılda 40 milyar dolara çıkacak",
    url: "https://www.ekonomist.com.tr/haberler/turkiye-dubai-ticareti-5-yilda-40-milyar-dolara-cikacak-55690",
    publishedAt: "2024-11-11",
    kind: "haber",
    lang: "tr",
    summary:
      "Dubai, yalnızca iş kurma fırsatlarıyla değil, aynı zamanda şirketlerin finansal süreçlerini doğru ve etkin bir şekilde yönetebilmesi için sunduğu modern altyapıyla da dikkat çekiyor.",
  },
  {
    id: "yeniasir-2024-05-01",
    outlet: "Yeni Asır",
    title: "Dubai Serbest Bölgesi’nde Türk şirketi sayısı arttı",
    url: "https://www.yeniasir.com.tr/ekonomi/2024/05/01/dubai-serbest-bolgesinde-turk-sirketi-sayisi-artti",
    publishedAt: "2024-05-01",
    kind: "haber",
    lang: "tr",
    summary:
      "Son yılların en çok doğrudan yabancı yatırım çeken bölgelerinden Dubai, Türk iş insanlarının da dikkatinden kaçmadı. Güncel veriler, Dubai Serbest Ticaret Bölgesi’ndeki Türk şirketlerin sayısının 2023’te yüzde 17 arttığını ortaya koydu.",
  },
  {
    id: "hurriyet-2024-04-30",
    outlet: "Hürriyet",
    title: "Dubai serbest bölgesinde Türk şirket sayısı yüzde 17 arttı",
    url: "https://www.hurriyet.com.tr/ekonomi/dubai-serbest-bolgesinde-turk-sirket-sayisi-yuzde-17-artti-42454019",
    publishedAt: "2024-04-30",
    kind: "haber",
    lang: "tr",
    summary:
      "Dubai Muhtelif Emtia Merkezi (DMCC) tarafından yayımlanan verilere göre, Dubai serbest ticaret bölgesindeki Türk şirketlerin sayısı 2023’te yüzde 17 arttı.",
  },
  {
    id: "posta-2024-04-30",
    outlet: "Posta",
    title: "Dubai serbest bölgesinde 17 Türk şirketi var",
    url: "https://www.posta.com.tr/ekonomi/dubai-serbest-bolgesinde-17-turk-sirketi-var-2714961",
    publishedAt: "2024-04-30",
    kind: "haber",
    lang: "tr",
    summary:
      "Son yılların en çok doğrudan yabancı yatırım çeken bölgelerinden Dubai, Türk iş insanlarının da dikkatinden kaçmadı. Dubai Muhtelif Emtia Merkezi (DMCC) verilerine göre bölgedeki Türk şirketlerin sayısı 2023’te yüzde 17 arttı.",
  },
  {
    id: "bigpara-2024-04-30",
    outlet: "BigPara",
    title: "Dubai serbest bölgesinde Türk şirket sayısı yüzde 17 arttı",
    url: "https://bigpara.hurriyet.com.tr/haberler/ekonomi-haberleri/dubai-serbest-bolgesinde-turk-sirket-sayisi-yuzde-17-artti_ID1480433/",
    publishedAt: "2024-04-30",
    kind: "haber",
    lang: "tr",
    summary:
      "Dubai Muhtelif Emtia Merkezi (DMCC) tarafından yayımlanan verilere göre, Dubai serbest ticaret bölgesindeki Türk şirketlerin sayısı 2023’te yüzde 17 arttı.",
  },
  {
    /* Adres yayındaki sitedekinden FARKLI ve bilerek: orada blogun ana
       sayfasına bağlanıyor, burada haberin kendisine (bkz. dosya başı). */
    id: "r10-2024-04-30",
    outlet: "R10",
    title: "Dubai Serbest Bölgesi’nde Türk Şirketlerin Sayısı Artıyor",
    url: "https://blog.r10.net/haberler/dubai-serbest-bolgesinde-turk-sirketlerin-sayisi-artiyor",
    publishedAt: "2024-04-30",
    kind: "haber",
    lang: "tr",
    summary:
      "Özellikle Türk iş insanları için cazip bir lokasyon olan Dubai, Dubai Muhtelif Emtia Merkezi (DMCC) tarafından yayımlanan son verilere göre, 2023 yılında Türk şirketlerinin sayısında yüzde 17’lik bir artış gösterdi.",
  },
  {
    id: "dunya-2024-04-29",
    outlet: "Dünya",
    title: "Dubai serbest bölgesindeki Türk şirket sayısı 2023’te yüzde 17 arttı",
    url: "https://www.dunya.com/sirketler/dubai-serbest-bolgesindeki-turk-sirket-sayisi-2023te-yuzde-17-artti-haberi-724734",
    publishedAt: "2024-04-29",
    kind: "haber",
    lang: "tr",
    summary:
      "Son yılların en çok doğrudan yabancı yatırım çeken bölgelerinden Dubai, Türk iş insanlarının da dikkatinden kaçmadı. Güncel veriler, Dubai Serbest Ticaret Bölgesi’ndeki Türk şirketlerin sayısının 2023’te yüzde 17 arttığını ortaya koydu.",
  },
];

/** Yeniden eskiye. Liste boşken de çalışıyor; çağıran taraf ayrım yapmıyor. */
export function sortedPress(): PressItem[] {
  return [...PRESS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/* ------------------------------------------------------------- BOŞ DURUM
   Bugün buraya düşülmüyor (liste dolu). Duruyor ki kayıtlar bir gün
   kaldırıldığında sayfa boş bir <ul> basmasın — aynı koruma /kariyer'de de
   var. Metin burada, sayfada değil: bu iki cümle firmanın basın karşısındaki
   duruşunu anlatıyor, yani onaylanması gereken bir METİN. */
export const PRESS_EMPTY = {
  title: "Henüz yayımlanmış bir basın kaydımız yok.",
  line: "Bu sayfa bir arşiv ve bugün boş. Buraya yalnızca yayının kendi adresine bağlanabilen, tarihi belli kayıtlar giriyor; ekran görüntüsü, kaynağı yazılmayan alıntı ya da “bir haber sitesinde çıktı” cümlesi girmiyor. İlk kayıt yayımlandığında bu sayfa kendiliğinden listeye dönüşecek.",
};

/* --------------------------------------------------------- BASIN İLETİŞİMİ
   SWAP:PRESS_CONTACT — basına AYRILMIŞ bir e-posta ya da muhatap yok.

   Liste doldu ama bu alan DOLMADI ve uydurulmadı: basın sayfasındaki
   çalışmayan bir adres, gazetecinin haberi bizsiz yazmasıyla biten bir hata.
   Alan dolana kadar sayfa basını sitenin genel iletişim kanalına yönlendiriyor
   ve fazlasını söylemiyor: yanıt süresi, "7/24 basın hattı" ya da bir sözcü
   adı BİLEREK yazılmıyor — üçünün de karşılığı firmada yok.

   Doldurma kuralı offices.ts'teki ile aynı: `value` ekranda görünen metin,
   `href` tıklanınca gidilecek yer; ikisi birden dolmadan kanal canlanmıyor. */
export const PRESS_CONTACT: { value: string; href: string } = {
  value: "",
  href: "",
};

export const hasPressContact = (): boolean =>
  PRESS_CONTACT.value.trim() !== "" && PRESS_CONTACT.href.trim() !== "";

/* ============================================================== BASIN ALINTISI
   Kullanan: src/app/basinda-biz/page.tsx · liste bölümü
   Biçim: src/app/css/kurumsal.css · .krm-quote

   ------------------------------------------------------------------ NEDEN VAR
   Müşteri alıntı kalıbını beğendi ("hani şu alıntı koyma işi var ya, murat
   abiden alıntı koyduk mesela. o olayı daha çok kullanabiliriz, o hoşuna gitti
   murat abinin") ve site taranıp bu kalıbın gerçekten işe yaradığı yerler
   arandı. Ölçüt: alıntı bir iddiayı İNSAN AĞZINDAN doğrulasın, süs olmasın.

   Bu sayfa listenin başına geçti ve sebebi tek: sitede iddiası doğrudan "adı
   olan bir kişi basında uzman olarak konuşuyor" olan TEK sayfa burası
   (hero: "Dubai ekonomisini anlatan haberlerde uzman görüşümüzle yer
   alıyoruz") — ve o kişinin ağzından tek bir cümle sayfanın hiçbir yerinde
   geçmiyor. Sekiz kartın sekizi de yayının adını, tarihini ve başlığını
   veriyor; konuşanı vermiyor. Alıntı burada süs değil, sayfanın kendi
   iddiasının kanıtı.

   -------------------------------------------------- BUGÜN BOŞ, VE BU KASITLI
   SWAP:PRESS_QUOTE — cümlenin kendisi.
   SWAP:PRESS_QUOTE_SOURCE — cümlenin çıktığı yayın ve tarihi.

   Depodaki iki doğrulanmış Murat Ortaç cümlesi (about.ts · QUOTE ve
   accountingDubai.ts · ortac.quote) BURAYA KOPYALANAMADI ve gerekçe bu
   sayfanın kendi kuralı: hero "her kaydın yanında yayının adı, tarihi ve
   haberin kendi adresi duruyor; alıntıyı buradan değil, kaynağından okuyun"
   diyor. İki cümlenin de hangi yayında, hangi tarihte söylendiği elimizde
   YOK (about.ts · SWAP:QUOTE_SOURCE bir turdur boş). Kaynağı yazılmayan bir
   alıntıyı, kaynaksız alıntıyı açıkça reddeden sayfaya koymak sayfanın kendi
   kuralını ilk satırında bozardı.

   İKİSİ BİRDEN DOLMADAN BLOK BASILMIYOR (hasPressQuote). Aynı kilit
   PRESS_CONTACT'ta ve about.ts'in SWAP satırlarında da var: yarım dolu bir
   alan, boş alandan daha kötü.

   ------------------------------------------- KİLİDİN AÇILDIĞI YER BURASI DEĞİL
   Bu alan bir turdur boş ve sebebi hep aynı: elimizdeki iki doğrulanmış
   cümlenin hangi yayında söylendiğini bilmiyoruz. Bu turda kilidi olmayan
   bir yuva açıldı — PressItem.quote (SWAP:PRESS_QUOTE_ITEM). Orada kaynak
   sorusu hiç doğmuyor, çünkü alıntı kaydın kendi kartında duruyor ve kart
   zaten yayının adını, tarihini ve adresini taşıyor.

   Yani sıralama şu: kart içi alıntı ilk dolan olacak. O dolduğunda buradaki
   sayfa düzeyi bant gereksizleşebilir — sekiz kartın içinde konuşan biri
   varken listenin üstünde bir kez daha konuşmak tekrar olur. Karar o gün
   verilecek; bugün ikisi de boş ve ikisi de ekranda yok. */
export const PRESS_QUOTE: { text: string; who: string; role: string; source: string } = {
  text: "",
  /* İki alan DOLU çünkü ikisi de doğrulanmış ve site genelinde aynı:
     künye satırı about.ts · QUOTE ile birebir aynı iki değeri basıyor. */
  who: "Murat Ortaç",
  role: "Managing Partner",
  source: "",
};

/** Cümle VE kaynağı birlikte gelmeden alıntı bandı sayfaya hiç girmiyor. */
export const hasPressQuote = (): boolean =>
  PRESS_QUOTE.text.trim() !== "" && PRESS_QUOTE.source.trim() !== "";
