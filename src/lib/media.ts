/* SWAP:STOCK_PHOTOS — example stock photography (Unsplash). Replace each URL
   with the client's own shoot; every consumer reads from this map only. */
const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const PHOTO = {
  formation: U("1497366216548-37526070297c"),
  bank: U("1454165804606-c3d57bc86b40"),
  accounting: U("1450101499163-c8848c66ca85"),
  visa: U("1544620347-c4fd4a3d5957"),
  dubai: U("1512453979798-5ea266f8880c"),
} as const;

/* one per blog topic — the card media on the resources grid

   AÇIKLAMALAR GÖZLE DOĞRULANDI (bu tur): aşağıdaki her adres açılıp bakıldı ve
   yorumlar karenin GERÇEKTE ne gösterdiğine göre düzeltildi. Sebebi bu dosyanın
   başında zaten yazıyor — bir Unsplash kimliğinin arkasındaki fotoğraf
   değişebiliyor ve 200 dönmesi içeriğin doğru olduğunu göstermiyor. */
export const POST_PHOTO = {
  dubaiCost: U("1512453979798-5ea266f8880c", 900), // gün batımında Dubai silueti, ortada Burj Khalifa
  /* ESKİ KİMLİK 404 VERİYORDU (1529180184525-78f99adb5f4a): fotoğraf
     Unsplash'ten kalkmış, adres artık boş bir HTML dönüyor. Bu turda liste
     satırlarına küçük görsel eklendi ve kırık kare orada boş bir kutu olarak
     görünecekti. Yerine depoda ZATEN duran ve gözle doğrulanmış İngiltere
     karesi konuldu — yeni bir Unsplash kimliği eklemek yeni bir doğrulama
     borcu demekti. Alan adı korundu: tek tüketicisi ukOnce yer tutucusu. */
  ukTax: U("1533929736458-ca588d08c8be", 900), // Tower Bridge, arkada City of London
  kktc: U("1507525428034-b723cf961d3e", 900), // gün batımında kumsal ve turkuaz deniz; Akdeniz DEĞİL, temsilî
  corpTax: U("1554224155-6726b3ff858f", 900), // masada vergi formları, hesap makinesi ve kalem
  bank: U("1601597111158-2fceff292cdc", 900), // ATM tuş takımında şifre giren el; banka salonu değil
  visa: U("1544620347-c4fd4a3d5957", 900), // KULLANILMIYOR — kare kaymıştı (bkz. TEAM_PHOTO notu)
} as const;

/**
 * Aynı fotoğrafın KÜÇÜK hâli. Liste satırındaki minik görsel için.
 *
 * Neden gerekli: kapak adresleri 900–1400 piksel genişlikte üretiliyor ve
 * `unoptimized` olduğu için tarayıcı onları olduğu gibi indiriyor. Blog
 * listesinde on altı satır var; her biri 900 piksellik bir kare indirseydi
 * sayfa yalnızca minik görseller yüzünden birkaç megabayt ağırlaşırdı.
 *
 * Kapak adresi tek kaynak olarak kalıyor: burada yalnızca `w` parametresi
 * yeniden yazılıyor, yani yazının görseli değiştiğinde satırdaki de değişiyor.
 * Adreste `w` yoksa dize aynen dönüyor, yani yerel bir dosya yolu da güvenli.
 */
export const photoThumb = (url: string, w = 240) => url.replace(/([?&]w=)\d+/, `$1${w}`);

/* one photo per country — used behind the calculator result and on country cards

   ⚠ ÜÇÜ DE POST_PHOTO'DA BİRER EŞİYLE DURUYOR — aynı Unsplash dosyası, yalnız
   genişlik farklı:
     COUNTRY_PHOTO.dubai     = POST_PHOTO.dubaiCost
     COUNTRY_PHOTO.ingiltere = POST_PHOTO.ukTax
     COUNTRY_PHOTO.kktc      = POST_PHOTO.kktc
   Bu tesadüf değil, ülke karesi hem ülke sayfasında hem o ülkenin yazısında
   kullanılsın diye böyle kurulmuştu. Blog ile rehber TEK listede aktığı sürece
   sorun da değildi. Bu tur iki listeyi ayırdı (bkz. app/blog/BlogHub.tsx) ve
   eşleşmenin bir tanesi görünür bir arızaya dönüştü: iki listenin de EN YENİ
   kaydı Dubai'ye ait, yani iki sayfa aynı kapak fotoğrafıyla açılıyordu.
   Çözüm aşağıda, GUIDE_PHOTO'da. */
export const COUNTRY_PHOTO: Record<"dubai" | "ingiltere" | "kktc", string> = {
  dubai: U("1512453979798-5ea266f8880c"),
  ingiltere: U("1533929736458-ca588d08c8be"), // Tower Bridge · London
  kktc: U("1507525428034-b723cf961d3e"), // Mediterranean coast — stand-in for Girne
};

/* ------------------------------------------------------- rehber kapakları

   Ülke rehberlerinin kapağı kural olarak COUNTRY_PHOTO'dan geliyor: ülke
   karesi rehberin hangi ülkeye ait olduğunu tek bakışta söylüyor ve bu
   korunuyor. Buradaki kayıt o kuralın TEK istisnası.

   NEDEN İSTİSNA: /blog artık yalnız blog yazılarını, /blog/rehberler yalnız
   rehberleri listeliyor. İki listenin en yeni kaydı da Dubai'ye ait, yani iki
   sayfa üst üste aynı fotoğrafla açılıyordu — müşterinin "aynı sayfa gibi
   anlaşılmasın" dediği şeyin ta kendisi. Bir tur önce bu, rehber görsellerini
   DAİREYE sokarak çözülmüştü; müşteri o ayrımı reddetti ("hepsininki
   dikdörtgen olabilir"), dolayısıyla ayrım biçimden fotoğrafın kendisine
   döndü.

   KARE GÖZLE DOĞRULANDI (bu tur): açıldı, bakıldı. Modern bir ofis katı —
   boş açık plan zemin, solda alçak ahşap raf ve oturma, sağda camlı bölmeli
   koridor ve mutfak nişi. İnsan ve marka yok.

   EŞLEME UYDURMA DEĞİL: bu kare sitede zaten "şirket kuruluşu" hizmetinin
   görseli (PHOTO.formation · components/Services.tsx) ve rehberin sorusu tam
   olarak o: Dubai'de hangi işler kurulabilir. Yeni bir Unsplash kimliği
   eklenmedi, çünkü her yeni kimlik yeni bir doğrulama borcu demek (bkz. bu
   dosyadaki 404 ve kayan kare notları). Genişlik 900: bütün yazı kapakları
   gibi (POST_PHOTO). */
export const GUIDE_PHOTO = {
  dubaiIsler: U("1497366216548-37526070297c", 900),
} as const;

/* ------------------------------------------------------------- ekip fotoğrafı

   /hakkimizda sayfasının açılışındaki tek büyük görsel.

   SWAP:TEAM_PHOTO — MÜŞTERİNİN KENDİ ÇEKİMİYLE DEĞİŞECEK. Müşteri "bi ekip
   fotosu bulur koyarsın, biz onu gerçeğiyle değiştiririz" dedi; bu satır o
   güne kadar duran yer tutucu. Gerçek çekim geldiğinde yalnızca aşağıdaki
   adres değişiyor, sayfaya dokunmak gerekmiyor.

   KARE BİLEREK YÜZSÜZ: bir masanın etrafında not tutan eller, yüzler kadraj
   dışında ya da odak dışında. Sebebi dürüstlük — tanınabilir yüzler taşıyan
   bir stok kare, "işte ekibimiz" diye okunurdu. Sayfa bu görseli alt="" ile,
   dekoratif olarak basıyor ve altında temsilî olduğunu söyleyen bir künye
   satırı duruyor (about.ts · OPENING.photoNote). Üçü birlikte olmak zorunda.

   ⚠ Bir Unsplash kimliğinin ARKASINDAKİ FOTOĞRAF DEĞİŞEBİLİYOR: bu depoda
   POST_PHOTO.visa'da yaşandı (yorumda "pasaport ve biniş kartı" yazıyordu,
   kare gece çekilmiş bir otobüse dönmüştü). Adresin 200 dönmesi içeriğin
   doğru olduğunu göstermiyor — yayına almadan önce göz kontrolü şart. */
export const TEAM_PHOTO = U("1517048676732-d65bc937f952", 1600);

/* ----------------------------------------------------------- sektör sayfaları

   /sektorler/[sektor] iki fotoğraf basıyor: hero'nun hemen altındaki geniş
   şerit ve "Ortac ne yapıyor" bölümünün yanındaki kare. İkisi de DEKOR —
   alt="" ile basılıyorlar ve hiçbir iddia taşımıyorlar ("bizim ofisimiz"
   demiyorlar).

   Anahtar sektör slug'ı. Sayfa dinamik bir segment ve kaydı olmayan sektörün
   de çalışması gerekiyor; o yüzden `sectorPhoto()` her zaman bir şey dönüyor.
   Yedek kareler zaten bu dosyada duran, sektörden bağımsız ofis fotoğrafları.

   SWAP:STOCK_PHOTOS — kimliklerin hepsi Unsplash yer tutucusu. Müşterinin
   kendi çekimi geldiğinde yalnızca aşağıdaki satırlar değişiyor. */
export type SectorPhotoSet = { band: string; work: string };

export const SECTOR_PHOTO: Record<string, SectorPhotoSet> = {
  "yazilim-ve-teknoloji": {
    band: U("1519389950473-47ba0277781c", 1800),
    work: U("1498050108023-c5249f4df085", 1100),
  },
};

/* Sektörden bağımsız yedek: ikisi de sitenin başka yerlerinde zaten kullanılan
   kareler, yani yeni bir doğrulama borcu getirmiyorlar. */
const SECTOR_PHOTO_ANY: SectorPhotoSet = {
  band: U("1497366216548-37526070297c", 1800),
  work: U("1450101499163-c8848c66ca85", 1100),
};

export const sectorPhoto = (slug: string): SectorPhotoSet =>
  SECTOR_PHOTO[slug] ?? SECTOR_PHOTO_ANY;
