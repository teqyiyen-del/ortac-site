import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* ÜÇ OFİS — adres ve iletişim bilgilerinin tek kaynağı.
 *
 * ---------------------------------------------------------------------------
 * NEDEN AYRI BİR DOSYA
 *
 * Firmanın üç ülkede AYRI adresi ve AYRI iletişim bilgisi var. Bu, iletişim
 * sayfasının omurgasını değiştiren bir bilgi: "bir telefon + bir e-posta"
 * varsayımıyla yazılmış her şey yanlış. Ama elimizdeki değerler henüz
 * doğrulanmadı ve uydurulmuyor — uydurulmuş bir telefon numarası, arayan ilk
 * kişide biten bir yalandır.
 *
 * Bu yüzden burada YAPI kuruldu, DEĞER bırakıldı. Her ofisin adresi, telefonu,
 * WhatsApp hattı ve e-postası boş string. Sayfa bu boşluğu gizlemiyor: değeri
 * olmayan kart tıklanamıyor ve yerinde "eklenecek" yazan bir yuva duruyor.
 * Bilgi geldiğinde dokunulacak tek yer bu dosya; ContactI6.tsx'te ve
 * lab-i6.css'te tek satır oynamıyor.
 *
 * ---------------------------------------------------------------------------
 * YER TUTUCULAR
 *
 *   ÜÇ OFİSİN DE adresi, telefonu, WhatsApp'ı ve e-postası DOLU. Adres,
 *   telefon ve e-posta 18.08.2026'da müşteriden geldi. Açık kalanlar:
 *     SWAP:OFFICE_INGILTERE   legal (tüzel kişilik adı)
 *     SWAP:OFFICE_KKTC        city · legal
 *
 *   WHATSAPP TÜRETİLMEDİ, MÜŞTERİ SÖYLEDİ (19.08.2026): "whatsapp
 *   bilgilerinede telefonda yazanların aynısı eklenecek." Bu dosya bir tur
 *   önce tam tersini yazıyordu — numaranın WhatsApp'ta açık olduğunu
 *   bilmediğimiz için boş bırakılmıştı. Karar müşteriye ait, o yüzden
 *   değişti; kaynağı burada yazılı kalıyor ki bir sonraki tur "kim türetti"
 *   diye geri almasın. Doğrulanmayan tek şey hâlâ aynı: numaraların
 *   WhatsApp'ta gerçekten açık olduğu teyit edilmedi.
 *   Üçünün de KOORDİNATI hâlâ ülke/şehir merkezi, ofisin kendi noktası değil;
 *   adresten koordinat türetmek uydurmak olurdu.
 *
 * Doldurma kuralı: `value` ekranda görünen metin, `href` tıklanınca gidilecek
 * yer. İKİSİ BİRDEN dolmadan kart canlanmıyor — yarım doldurulmuş bir kanal
 * (görünen numara, çalışmayan bağlantı) hiç doldurulmamış olandan kötüdür.
 *
 * ---------------------------------------------------------------------------
 * KKTC NEREDEN GELDİ, DİĞER İKİSİ NEDEN HÂLÂ BOŞ
 *
 * Müşteri kendi canlı sitesini kaynak gösterdi (ortacglobal.com/iletisim). O
 * sayfada AÇIKÇA YAZAN tek ofis KKTC: bir adres, bir e-posta ve iki telefon.
 * Üçü de buraya birebir geçirildi.
 *
 * Dubai ve İngiltere aynı sayfada "ofisimiz var" diye geçiyor ama TEK BİR
 * iletişim bilgisi vermiyor. O yüzden ikisinin SWAP işareti duruyor: "ofis
 * var" ile "ofisin telefonu şu" arasındaki fark, tam olarak bu dosyanın
 * korumaya çalıştığı fark.
 *
 * Kaynak sayfada bir müşteri paneli adresi de var; ALINMADI. Ürünün adı
 * siteden tamamen kaldırıldı (docs/tuzaklar.md · kural 7).
 *
 * ---------------------------------------------------------------------------
 * BİLEREK OLMAYAN İKİ ŞEY
 *
 * · Ülke başına ÇALIŞMA SAATİ / canlı saat YOK. Geçen turda kaldırıldı ve geri
 *   gelmiyor: üç ayrı saat kadranı, üç ayrı masada oturan üç ekip ima ediyor.
 *   Ofis adresi ayrı bir şey — o var; saat kadranı yok.
 * · Hizmet ya da ofis başına MUHATAP/kişi adı YOK. Firmada "bu iş şu kişiye
 *   düşer" diye bir yapı yok; göstermek yanlış bilgi olurdu.
 */

/** Kanalın türü. Adres burada değil: adres bir kanal değil, ofisin kendisi. */
export type ChannelKind = "phone" | "whatsapp" | "email";

export type ChannelValue = {
  /** ekranda görünen metin — doğrulanana kadar boş */
  value: string;
  /** tel: · https://wa.me/… · mailto: — value ile birlikte doluyor */
  href: string;
  /* AYNI KANALIN İKİNCİ HATTI. KKTC'de iki telefon var ve ikisi de gerçek;
     birini seçip ötekini atmak, arayanın ulaşabileceği bir hattı gizlemek
     olurdu. Dördüncü bir kanal TÜRÜ açmadık: "Telefon 2" diye bir kanal yok,
     telefonun iki numarası var — kart tek, içindeki numara iki.
     Kartın kendisi bu durumda bağlantı OLMUYOR (iki hedefli tek bağlantı
     yazılamaz); iki numaranın her biri kendi bağlantısı oluyor. */
  alt?: { value: string; href: string };
};

/** Kanalın gerçekten aranabilir hatları. Tek yerde toplandı çünkü hem kart
 *  hem JSON-LD aynı listeye bakıyor ve ikisinin ayrışması sessiz bir yalan
 *  üretirdi (ekranda iki numara, yapısal veride bir numara). */
export function linksOf(v: ChannelValue): readonly { value: string; href: string }[] {
  if (!isLiveChannel(v)) return [];
  const out = [{ value: v.value, href: v.href }];
  if (v.alt && v.alt.value.trim() !== "" && v.alt.href.trim() !== "") out.push(v.alt);
  return out;
}

export type Office = {
  country: Country;
  /** ülkenin sitedeki adı; tek kaynak COUNTRY_LABELS */
  label: string;

  /* SWAP — ofisin bulunduğu şehir. Dubai dışında doğrulanmadı. Boşken sayfa
     şehir adı yazmıyor, yalnızca ülke adı yazıyor. */
  city: string;

  /* SWAP — açık posta adresi, tek parça metin. Boşken kartta yuva duruyor. */
  address: string;

  /** Doğrulanmış tüzel kişilik adı; yoksa boş (bkz. lib/about.ts · IDENTITY) */
  legal: string;

  /* Haritadaki işaretin oturduğu nokta, [lng, lat].
     Bu bir OFİS KONUMU DEĞİL, ülke işareti. Sitede zaten kullanılan üç
     koordinatın aynısı (components/SvgGlobe.tsx · MARKS): Dubai, Londra ve
     Lefkoşa'nın kamuya açık şehir koordinatları.

     KKTC'NİN ADRESİ GELDİ AMA İŞARET YERİNDE KALDI. Eski not "`city` ve
     `address` dolunca işaret ofisin kendi noktasına çekilir" diyordu; bu not
     eksikti, çünkü işareti taşıyan şey adres metni değil KOORDİNAT. Elimizde
     KKTC ofisinin enlem/boylamı yok ve bir sokak adını haritada bir noktaya
     çevirmek (geocoding) tahmin üretmektir: yanlış sokağa düşen bir işaret,
     ülke düzeyinde duran doğru bir işaretten kötüdür. İşaret ancak ofisin
     kendi koordinatı doğrulandığında taşınır. */
  at: readonly [number, number];

  /** bu ofisin yer tutucu anahtarı; ekranda değil, data-swap niteliğinde */
  swap: string;

  contact: Record<ChannelKind, ChannelValue>;
};

/** Kanalın ne işe yaradığı ülkeye göre değişmiyor; yalnızca değeri değişiyor.
 *
 *  `job` CANLI SAYFADA ARTIK BASILMIYOR (19.08.2026). Müşterinin sözü:
 *  "altlarına not düşmene gerek yok iletişim yöntemlerinin." Kanal kartında
 *  ikon, etiket ve numara zaten kanalın ne olduğunu söylüyor; üçüncü bir
 *  cümle kartı 243,6 pikselden uzatıyordu ve okunmuyordu.
 *
 *  ALAN NEDEN SİLİNMEDİ: tek tüketicisi kalan src/components/lab/ContactI6.tsx
 *  bir karar kaydı ve hiçbir rotadan ulaşılamıyor (node scripts/olu-kod.mjs),
 *  ama TypeScript onu yine de derliyor — alan silinirse `tsc --noEmit` kapısı
 *  kırılır. Ölü lab dosyalarının silinmesi docs/durum.md'de ayrı bir karar.
 *  Yeniden ekranа basılmak istenirse gerekçesi buradan okunur; kendiliğinden
 *  geri gelmesin diye bu not duruyor.
 *
 *  Hiçbirinde yanıt SÜRESİ yazmıyor: öyle bir taahhüdümüz yok. */
export const CHANNELS: readonly { kind: ChannelKind; label: string; job: string }[] = [
  {
    kind: "phone",
    /* "Mesai içinde doğrudan hat, arada karşılama masası yok" cümlesi SİLİNDİ.
       KKTC hatlarından biri 444'lü bir servis numarası; o cümle artık kendi
       kartındaki numarayla çelişiyordu. Doğrulanmamış bir hizmet vaadini
       silmek, onu kurtarmaya çalışmaktan ucuz. */
    label: "Telefon",
    job: "Anlatması yazmaktan kısa olan her şey: tek soru, kısa teyit, randevu.",
  },
  {
    kind: "whatsapp",
    label: "WhatsApp",
    job: "Tek soruluk işler: belge fotoğrafı, kısa teyit, “bu evrak yeterli mi”.",
  },
  {
    kind: "email",
    label: "E-posta",
    job: "Ek belge, sözleşme, resmî yazışma: iz bırakması gereken her şey.",
  },
];

/* KALDIRILDI · empty()
   Üç ofisin de kanalları bu turda dolduğu için boş kayıt üreten yardımcıya
   ihtiyaç kalmadı. Yeni bir ofis eklenirse boş alanlar elle yazılır; ölü bir
   fabrika fonksiyonu tutmak, bir sonraki turda yanlışlıkla "boş bırak"
   davranışını geri getirmenin en kolay yolu olurdu. */

/* Record<Country, Office> bilerek: ülke listesine bir ülke eklendiğinde bu
   dosya derlenmez ve eksik ofis derleme zamanında yakalanır. Dizi olsaydı
   sessizce eksik kalırdı. */
const BY_COUNTRY: Record<Country, Office> = {
  /* DUBAI · DÖRT ALAN DA DOLU, AÇIK KALAN YOK. Adres, telefon ve e-posta
     müşteriden geldi (18.08.2026, ülke ülke gönderdi); WhatsApp 19.08.2026'da
     müşterinin "telefonda yazanların aynısı" talimatıyla dolduruldu.

     ADRES KISALTILDI. Müşterinin gönderdiği harita kartı tam satırı
     "Saaha Offices B - 304 Souk Al Bahar Bridge - Burj Khalifa - Downtown
     Dubai - Dubai - Birleşik Arap Emirlikleri" diye yazıyor; sonundaki üç
     parça (semt, şehir, ülke) kartın kendi bağlamında zaten var — ülke adı
     ofis düğmesinde, şehir `city` alanında. Tekrar yazmak adres satırını iki
     katına çıkarıp okunurluğu düşürürdü.

     KOORDİNAT DEĞİŞMEDİ ve bu bilinçli: [55.2708, 25.2048] Dubai'nin genel
     merkezi, ofisin kendi noktası değil. Adres metninden koordinat türetmek
     (geocode) uydurmak olurdu; gerçek enlem/boylam müşteriden gelmeli. */
  dubai: {
    country: "dubai",
    label: COUNTRY_LABELS.dubai,
    city: "Dubai",
    address: "Saaha Offices B - 304 Souk Al Bahar Bridge",
    legal: "Ortac Accounting Services LLC",
    at: [55.2708, 25.2048],
    swap: "OFFICE_DUBAI",
    contact: {
      /* Görünen metin müşterinin yazdığı gruplama, href E.164. BAE cep
         numaraları ülke kodundan sonra dokuz hane; "5628 66 466" dokuz hane,
         yani biçim tutuyor. */
      phone: { value: "+971 5628 66 466", href: "tel:+971562866466" },
      /* Görünen metin telefonla AYNI, hedef farklı: wa.me ülke kodlu ve
         boşluksuz, + işareti olmadan. Aynı numaranın iki kanalda görünmesi
         tekrar değil — arayan ile yazan aynı hattı kullanıyor. */
      whatsapp: { value: "+971 5628 66 466", href: "https://wa.me/971562866466" },
      email: { value: "dubai@ortacglobal.com", href: "mailto:dubai@ortacglobal.com" },
    },
  },

  /* İNGİLTERE · İLETİŞİM DÖRTLÜSÜ TAM. Adres, telefon ve e-posta müşteriden
     (18.08.2026); WhatsApp 19.08.2026 talimatıyla telefonun aynısı.
     AÇIK KALAN: `legal` (İngiltere'deki tüzel kişilik adı verilmedi;
     about.ts · IDENTITY yalnız Dubai şirketini taşıyor).

     E-POSTA ALAN ADI FARKLI VE BİLEREK BÖYLE YAZILDI: uk@ortacaudit.com,
     ötekilerin ortacglobal.com'u değil. Müşterinin verdiği değer bu; yazım
     hatası mı yoksa ayrı bir tüzel kişiliğin kendi alan adı mı, teyit
     edilmedi. Değiştirilmedi çünkü "düzeltmek" burada uydurmak olurdu:
     yanlış bir adrese yazan kişi hiç karşılık alamaz.

     KOORDİNAT DEĞİŞMEDİ: [-0.1278, 51.5074] Londra'nın merkezi, ofisin
     noktası değil. Adresten koordinat türetilmedi. */
  ingiltere: {
    country: "ingiltere",
    label: COUNTRY_LABELS.ingiltere,
    city: "Londra",
    address: "85 Great Portland St, London W1W 7LT",
    legal: "",
    at: [-0.1278, 51.5074],
    swap: "OFFICE_INGILTERE",
    contact: {
      phone: { value: "+44 750 800 90 36", href: "tel:+447508009036" },
      whatsapp: { value: "+44 750 800 90 36", href: "https://wa.me/447508009036" },
      email: { value: "uk@ortacaudit.com", href: "mailto:uk@ortacaudit.com" },
    },
  },

  /* SWAP:OFFICE_KKTC — DÖRT ALAN DOLDU, İKİSİ AÇIK.
     Kaynak: müşterinin kendi canlı sitesi, ortacglobal.com/iletisim.

     DOLU  adres · telefon (iki hat) · e-posta · whatsapp
     AÇIK  city  — kaynak sayfa şehir yazmıyor. Adresin geçtiği sokak bir
                   şehir tahmini yaptırıyor ama tahmin bilgi değil; boş kaldı.
                   Boşken kart yalnızca ülke adını yazıyor, o da doğru.
                   Google Haritalar bağlantısı da bu boşluktan etkileniyor
                   (bkz. mapsHref); şehir gelirse arama tek noktaya oturur.
           legal — KKTC'deki tüzel kişilik adı doğrulanmadı (lib/about.ts ·
                   IDENTITY yalnız Dubai şirketini taşıyor).

     WHATSAPP NEDEN BOŞTU, NEDEN ARTIK DOLU: kaynak sayfada WhatsApp diye bir
     kanal yoktu ve cep numarasından bir wa.me bağlantısı TÜRETMEK bilerek
     yapılmamıştı — numaranın WhatsApp'ta açık olduğunu bilmiyoruz, yazan kişi
     karşılık alamazdı. Müşteri bu kararı 19.08.2026'da açıkça geçersiz kıldı:
     "whatsapp bilgilerinede telefonda yazanların aynısı eklenecek." Yani
     değer türetilmedi, TALİMAT EDİLDİ; doğrulanmamış olması durumu
     değişmedi, sorumluluğu değişti. */
  kktc: {
    country: "kktc",
    label: COUNTRY_LABELS.kktc,
    city: "",
    address: "Şht. Murat İlhan Sokak No:5, 039",
    legal: "",
    /* KUZEY LEFKOŞA, güney Lefkoşa DEĞİL. Eski değer [33.3823, 35.1856]
       kamuya açık "Nicosia" koordinatıydı ve Yeşil Hat'ın hemen üstüne,
       kimi kaynakta altına düşüyor. Bu ofis KKTC'de, o yüzden nokta da
       KKTC'nin başkentinde olmalı.
       EKRANDA FARK YARATMIYOR ve bu bilinerek yapıldı: iki nokta arası
       0,012 derece, seçili ölçekte 0,46 piksel. Düzeltme görüntü için değil
       VERİ DOĞRULUĞU için — aynı koordinat yarın başka bir yerde de
       kullanılabilir. Müşterinin gördüğü hata koordinat değil dolgu
       çokgeniydi (bkz. ContactSections.tsx · SHAPE_D).
       Hâlâ OFİSİN kendi noktası değil, şehir merkezi: adresten koordinat
       türetmek (geocoding) tahmin üretir. */
    at: [33.3642, 35.1975],
    swap: "OFFICE_KKTC",
    contact: {
      /* İKİ TELEFON, TEK KART.
         Görünen metin kaynaktaki boşluklu yazımı koruyor (okunurluk); href ise
         E.164: boşluksuz, ülke kodlu, uluslararası. Ayrımın sebebi somut —
         "+90 548 841 66 66" yazan bir tel: bağlantısını bazı istemciler
         boşlukta kesiyor, "+905488416666" her yerde aynı numarayı çeviriyor.
         Yurt dışından arayan biri için ülke kodu şart, o yüzden yerel yazım
         (0548 …) hiçbirinde kullanılmadı.
         Sıra kaynak sayfadaki sıra. */
      phone: {
        value: "+90 548 841 66 66",
        href: "tel:+905488416666",
        alt: { value: "+90 392 444 46 78", href: "tel:+903924444678" },
      },
      /* TEK HAT, `alt` YOK ve bu bilinçli. Telefon kartında iki numara var
         ama ikincisi (+90 392 444 46 78) 444'lü bir servis numarası: WhatsApp
         hesabı SMS/sesli doğrulamadan geçen bir hatta açılıyor, 444'lü
         numaralar bunu karşılamıyor. İkisini de yazmak, açılmayan bir sohbete
         giden ikinci bir bağlantı bırakırdı. */
      whatsapp: { value: "+90 548 841 66 66", href: "https://wa.me/905488416666" },
      email: { value: "cyprus@ortacglobal.com", href: "mailto:cyprus@ortacglobal.com" },
    },
  },
};

/* Sıra batıdan doğuya değil, sitenin her yerinde kullanılan sıra: Dubai önce,
   çünkü tek elden geçirilmiş ülke sayfası ve doğrulanmış ofis o. */
export const OFFICE_ORDER: readonly Country[] = ["dubai", "ingiltere", "kktc"];

export const OFFICES: readonly Office[] = OFFICE_ORDER.map((c) => BY_COUNTRY[c]);

export function officeFor(country: Country): Office {
  return BY_COUNTRY[country];
}

/** Kanal canlı mı? Metin ve bağlantı BİRLİKTE dolu olmadan canlı sayılmıyor. */
export function isLiveChannel(v: ChannelValue): boolean {
  return v.value.trim() !== "" && v.href.trim() !== "";
}

/* Haritanın Google Haritalar'a açılan bağlantısı.
   Müşterinin sözü (19.08.2026): "haritanın üstüne tıklayıncada hangi
   ülkedeysek onun google mapsi açılsın bari."

   KOORDİNAT ÜRETİLMİYOR ve bu isteğin kendisiyle uyumlu. Bağlantı bir ARAMA
   bağlantısı, bir /@enlem,boylam bağlantısı değil: elimizde ofislerin
   enlem/boylamı yok (`at` üçünde de ülke/şehir merkezi) ve adres metninden
   koordinat türetmek tam olarak bu dosyanın kaçındığı şey. Arama, sorguyu
   Google'ın kendi çözümüne bırakıyor; yanlış sokağa oturmuş bir koordinat,
   çözülemeyen bir aramadan kötüdür.

   SORGU İKİ DOĞRULANMIŞ ALANDAN KURULUYOR: adres, ve şehir varsa şehir,
   yoksa ülke adı. KKTC'nin `city` alanı boş (kaynak sayfa şehir yazmıyor),
   orada ülke adı giriyor — uydurma değil, elimizdeki en dar doğru kapsam.
   Dubai'de şehir ile ülke adı aynı olduğu için tekrar da çıkmıyor.
   İngiltere adresi zaten "London" ve posta kodunu taşıyor; "Londra" ikinci
   kez girse de W1W 7LT sonucu tek noktaya kilitliyor.

   api=1 Google'ın belgelenmiş ve sürümlenmiş URL sözleşmesi: anahtar
   istemiyor, karo indirmiyor, sayfa yüklenirken hiçbir dış istek yapmıyor —
   ziyaretçi tıklayana kadar hiçbir şey olmuyor. */
export function mapsHref(o: Office): string {
  const query = [o.address, o.city.trim() !== "" ? o.city : o.label]
    .filter((s) => s.trim() !== "")
    .join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Bu ofiste doldurulmuş tek bir bilgi var mı? Sayfa "hepsi boş" durumunu
 *  ayrıca söylüyor; bilgi damla damla geldiğinde o cümle kendiliğinden
 *  düşüyor. */
export function hasAnyInfo(o: Office): boolean {
  return (
    o.address.trim() !== "" ||
    CHANNELS.some((c) => isLiveChannel(o.contact[c.kind]))
  );
}
