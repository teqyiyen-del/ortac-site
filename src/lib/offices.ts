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
 *   ÜÇ OFİSİN DE adresi, telefonu ve e-postası DOLDU (18.08.2026, kaynak
 *   müşterinin kendisi). Açık kalanlar:
 *     SWAP:OFFICE_DUBAI       whatsapp
 *     SWAP:OFFICE_INGILTERE   whatsapp · legal (tüzel kişilik adı)
 *     SWAP:OFFICE_KKTC        whatsapp · city · legal
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
 *  `job` tek cümle ve kanalın varlık sebebini söylüyor — üç kanalı eşit
 *  ağırlıkta yan yana dizmek, seçimi ziyaretçiye ödev olarak vermek olurdu.
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

/** Boş bir kanal. Üç ofiste de aynı, o yüzden tek yerden üretiliyor. */
const empty = (): Record<ChannelKind, ChannelValue> => ({
  phone: { value: "", href: "" },
  whatsapp: { value: "", href: "" },
  email: { value: "", href: "" },
});

/* Record<Country, Office> bilerek: ülke listesine bir ülke eklendiğinde bu
   dosya derlenmez ve eksik ofis derleme zamanında yakalanır. Dizi olsaydı
   sessizce eksik kalırdı. */
const BY_COUNTRY: Record<Country, Office> = {
  /* DUBAI · ADRES, TELEFON VE E-POSTA DOLDU. Kaynak müşterinin kendisi
     (18.08.2026, ülke ülke gönderdi). AÇIK KALAN: whatsapp — verilmedi ve
     telefondan türetilmiyor (numaranın WhatsApp'ta açık olduğu bilinmiyor).

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
      whatsapp: { value: "", href: "" },
      email: { value: "dubai@ortacglobal.com", href: "mailto:dubai@ortacglobal.com" },
    },
  },

  /* İNGİLTERE · ADRES, TELEFON VE E-POSTA DOLDU. Kaynak müşterinin kendisi
     (18.08.2026). AÇIK KALAN: whatsapp ve `legal` (İngiltere'deki tüzel
     kişilik adı verilmedi; about.ts · IDENTITY yalnız Dubai şirketini taşıyor).

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
      whatsapp: { value: "", href: "" },
      email: { value: "uk@ortacaudit.com", href: "mailto:uk@ortacaudit.com" },
    },
  },

  /* SWAP:OFFICE_KKTC — ÜÇ ALAN DOLDU, İKİSİ AÇIK.
     Kaynak: müşterinin kendi canlı sitesi, ortacglobal.com/iletisim.

     DOLU  adres · telefon (iki hat) · e-posta
     AÇIK  city  — kaynak sayfa şehir yazmıyor. Adresin geçtiği sokak bir
                   şehir tahmini yaptırıyor ama tahmin bilgi değil; boş kaldı.
                   Boşken kart yalnızca ülke adını yazıyor, o da doğru.
           legal — KKTC'deki tüzel kişilik adı doğrulanmadı (lib/about.ts ·
                   IDENTITY yalnız Dubai şirketini taşıyor).
           whatsapp — kaynak sayfada WhatsApp diye bir kanal YOK. Aşağıdaki
                   cep numarasından bir wa.me bağlantısı türetmek çok kolaydı
                   ve tam olarak bu yüzden yapılmadı: numaranın WhatsApp'ta
                   açık olduğunu bilmiyoruz, yazan kişi karşılık alamazdı. */
  kktc: {
    country: "kktc",
    label: COUNTRY_LABELS.kktc,
    city: "",
    address: "Şht. Murat İlhan Sokak No:5, 039",
    legal: "",
    at: [33.3823, 35.1856],
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
      /* Kaynak sayfada WhatsApp yok — bkz. yukarıdaki not. */
      whatsapp: { value: "", href: "" },
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

/** Bu ofiste doldurulmuş tek bir bilgi var mı? Sayfa "hepsi boş" durumunu
 *  ayrıca söylüyor; bilgi damla damla geldiğinde o cümle kendiliğinden
 *  düşüyor. */
export function hasAnyInfo(o: Office): boolean {
  return (
    o.address.trim() !== "" ||
    CHANNELS.some((c) => isLiveChannel(o.contact[c.kind]))
  );
}
