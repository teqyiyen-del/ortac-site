import type { Country } from "@/lib/store";
import type { BrandKey } from "@/lib/brands";

/* SWAP:COUNTRY_CONTENT — every claim on a country page lives here so the client
   and the accountant can review one file. Rules kept from the brief:
   no tax rates beyond the ones already published in the comparison table, and
   every downside is stated plainly rather than softened. */

/* `brands`: kartın çiziminde basılacak marka işaretleri. Metin "Stripe ve
   PayPal" diyorsa çizimde de o iki plaka çıksın diye — iddia ile görsel aynı
   yerden besleniyor. Yalnızca `bank` ve `card` çizimleri okuyor; ötekiler
   marka basmıyor. Anahtarlar lib/brands.ts'teki kayıt defterinden. */
export type Pro = { title: string; line: string; icon?: string; brands?: BrandKey[] };
export type Faq = { q: string; a: string };
/* `timing` eskiden `day` idi ve "Gün 1", "Gün 3-5" gibi değerler taşıyordu.
   Sorun isimde değil iddiadaydı: "Gün 3-5" sürecin kaçıncı gününde olacağınızı
   söylüyor, yani takvim vaadi veriyordu. Firma kesin süre taahhüdü vermiyor —
   otoritenin ve bankanın işlem hızı bizde değil. Alan artık o adımın TİPİK
   süresini taşıyor ve her değer "tipik" diye işaretli; bekleme olmayan karar
   adımlarında ise gün yerine ne zaman olduğu ("ilk görüşme") yazıyor.
   `line` uzun olabilir: süreç bölümünde kapalı duruyor, adıma basılınca açılıyor. */
/* 22.09.2026 · `who: "banka"` EKLENDİ. İlk kullanıcı /dubai/banka-hesabi: hesap
   kararı ne bizde ne otoritede, BANKADA ("Hesap kararı tamamen bankaya ait").
   "otorite" demek bankayı bir devlet kurumu gibi okuturdu. Bileşen `who`ya
   göre renk vermiyor, yalnız etiket basıyor (WHO_LABEL); öteki sayfalar
   değişmiyor. */
/* `short` · 25.09.2026: süreç bölümünde ekranda basılan iki satırlık hâl
   (Burak: "açıklama çok uzun … çok büyük"; iki satır kuralı). `line`ın
   kısaltması, yeni olgu değil; `line` tam hâliyle erişilebilir adda kalıyor.
   Yoksa `line` basılıyor (zaten kısa olan adımlar). */
export type Step = {
  title: string;
  timing: string;
  who: "siz" | "ortac" | "otorite" | "banka";
  line: string;
  short?: string;
};
export type Route = { title: string; line: string; note: string };
/* `profile` is the chip label; `you` is the same thing said to the visitor's
   face, because a verdict assembled from a noun phrase reads like a template.
   When the answer is "hayır" the row says where to look instead — the site
   sending you away is the whole stance, so it has to be in the data. */
/* 19.09.2026 · ÇİPE İKON GELDİ. Burak: "dubai kimin işine yarar kısmı var ya
   işte oradan seçiyoruz, e-ticaret, körfez, orta doğu satış falan filan. onun
   yanına da bir de ikon koysana ya. çok şey kaldılar, biraz garip kaldılar."

   ANAHTAR BURADA, GLİF BİLEŞENDE. Bu dosya saf veri ve sunucuda da okunuyor;
   lucide bir bileşen kitaplığı, buraya giremez. Aynı sorunun sitede çözülmüş
   hâli var: lib/fitTest.ts anahtarı veri dosyasında tutuyor, eşlemeyi
   components/FitTest.tsx'te. Aynı kalıp.

   fitTest.ts'teki FitIcon birliği YENİDEN KULLANILMADI: o birlik uygunluk
   testinin soru ve şık anahtarları ve orada "yeni anahtar eklenirse
   anketIkon.tsx derleme hatası verir" diye yazılı; ülke sayfasının profilleri
   o birliği kirletmemeli. */
export type FitProfilIkon =
  | "magaza"
  | "kure"
  | "kimlik"
  | "kod"
  | "cuzdan"
  | "ucak"
  | "fis"
  | "harita"
  | "kalem"
  | "yuzde"
  | "kart"
  | "bina"
  | "saat"
  | "kutu";

export type FitRow = {
  profile: string;
  you: string;
  ok: boolean;
  why: string;
  /** Çipteki glifin anahtarı; eşleme components/CountryFit.tsx'te. */
  ikon: FitProfilIkon;
  alt?: Country;
  /** 23.09.2026 · üçüncü hâl: uygun ama bir şartla. Doluysa karar "şartla
      uygun", şart ayrı kutuda (CountryFit). ok: true ile birlikte kullanılır. */
  sart?: string;
};

/** the structural choice a country forces before anything else is priced */
export type Structure = {
  name: string;
  line: string;
  /** "bunu yapıyorsanız burası" — the selection logic, not a feature list */
  fit: string[];
  watch: string;
};
export type DocGroup = { title: string; hint: string; items: string[] };
/** value stays a string: some countries publish a figure, KKTC deliberately does not */
export type TaxRow = {
  label: string;
  value: string;
  note?: string;
  /** değer sıfır/yok gibi ülkenin asıl avantajıysa kart mavi rakamla basılıyor */
  vurgu?: boolean;
};
/** vergi bölümünün üstündeki iki yollu şema: aynı şirket, iki müşteri, iki
    sonuç (CountryTax · .txm-yol). Yalnız vergisi satışın yönüne bağlı olan
    ülkede (KKTC Serbest Liman). */
/** kurumlar vergisi kâra göre kademeliyse yatay şerit (CountryTax ·
    .txm-bant). 23.09.2026, ilk kullanıcı İngiltere. */
export type TaxBant = {
  baslik: string;
  dilimler: { aralik: string; oran: string; not: string; ton: "dusuk" | "gecis" | "ust" }[];
};
export type TaxSplit = {
  from: string;
  out: { label: string; value: string; line: string };
  inn: { label: string; value: string; line: string };
};
export type Clarify = { title: string; line: string };

/* 23.09.2026 · KKTC için dört yeni bölümün verisi (Burak: "insanların
   aklındaki tüm sorulara cevap olmak istiyorum"). Talep: docs/kktc-talep-
   arastirmasi.md; olgular: docs/kktc-mevzuat.md · 9-11. Hepsi opsiyonel;
   şablon veri olmayan ülkede bölümü basmıyor. */
export type ParaYolu = {
  title: string;
  accent: string;
  lead: string;
  duraklar: {
    kim: string;
    baslik: string;
    vergi: string;
    not: string;
    ton: "sifir" | "beyan" | "notr";
    /** yoksa sıraya göre küre · şirket · kişi */
    ikon?: "kure" | "sirket" | "kasa" | "kisi";
  }[];
  /** bu duraktan sonraki bağ ok değil "ya da": iki durak birbirinin
      alternatifi (İngiltere: kâr şirkette kalır YA DA kâr payı alınır). */
  ayrim?: number;
  uyarilar: { baslik: string; line: string }[];
  /** 23.09.2026 · £100 kâr üzerinden şerit örnek (İngiltere): iki katmanı
      rakamla gösteriyor. Parçaların toplamı 100. */
  ornek?: {
    baslik: string;
    parcalar: { etiket: string; deger: number; ton: "vergi" | "istisna" | "beyan" }[];
    not: string;
  };
  /** 23.09.2026'dan beri sayfada basılmıyor (Ayrinti notu); kayıt için. */
  bilgi?: string;
  kaynaklar: { label: string; href: string }[];
};
export type OdemeKanal = {
  ad: string;
  brand?: BrandKey;
  ikon?: "banka" | "magaza" | "kutu" | "sepet";
  durum: "var" | "yok" | "belirsiz" | "sartli";
  not: string;
  /** Sahne görünümünde etiketin rengi: kartla tahsilat, pazaryeri, hesap,
      kripto. */
  grup?: "tahsilat" | "pazaryeri" | "hesap" | "kripto";
  /** Sahne görünümünde kutunun köşesindeki kısa etiket ("Kartla satış"). */
  etiket?: string;
};
export type Takvim = {
  title: string;
  accent: string;
  lead: string;
  kalemler: { ne: string; sure: string; kural: string; ceza: string }[];
  kaynak: { label: string; href: string };
};
export type Odeme = {
  title: string;
  accent: string;
  lead: string;
  kanallar: OdemeKanal[];
  not: string;
  /** "sahne": kanalların hepsi çalışıyorsa (İngiltere) üstte paraların
      şirket hesabına aktığı sahne, altında kanal kutuları (Dubai banka
      sayfasının dili). Yoksa durum rozetli kutu ızgarası (KKTC). `sirket`
      sahnedeki hesap kartının adı. */
  gorunum?: "sahne";
  sirket?: string;
};
export type Sermaye = {
  title: string;
  accent: string;
  lead: string;
  tutar: string;
  tutarNot: string;
  adimlar: { baslik: string; line: string }[];
  olgular: { etiket: string; deger: string }[];
  kaynak: { label: string; href: string };
};

export type CountryContent = {
  tagline: string;
  intro: string;
  pros: Pro[];
  watchouts: Pro[];
  /** brief §2 — every country carries a warning that must appear on its page */
  clarify: { title: string; lead: string; items: Clarify[] };
  /** only where the country actually forces a structural choice */
  structures?: { title: string; lead: string; options: Structure[]; rule: string };
  docs: { groups: DocGroup[]; note: string };
  tax: { rows: TaxRow[]; note: string; split?: TaxSplit; bant?: TaxBant };
  fitTable: FitRow[];
  steps: Step[];
  included: string[];
  excluded: string[];
  routes: Route[];
  faq: Faq[];
  paraYolu?: ParaYolu;
  odeme?: Odeme;
  sermaye?: Sermaye;
  takvim?: Takvim;
};

export const COUNTRY_CONTENT: Record<Country, CountryContent> = {
  dubai: {
    tagline: "Serbest bölge · IFZA",
    intro:
      "Dubai, vergi avantajı ile banka ve vize erişimini aynı anda veren tek seçenek. Karşılığında kuruluş maliyeti üçünün en yükseği ve süreç için bir kez yerinde bulunmanız gerekiyor.",
    pros: [
      {
        title: "Kurumlar vergisi %0*",
        icon: "percent",
        line: "Serbest bölge şartlarını sağlayan gelirde %0. Yıldız önemli: şart ihlalinde standart oran uygulanır.",
      },
      {
        /* BAŞLIK BU TURDA DEĞİŞTİ. Eskisi "Banka tarafı gerçekten açılıyor"du
           ve müşteri reddetti: "gerçekten açılıyor tarzı ifadeler... özellikle
           şu kartta avantaj olarak böyle yazmak doğru değil, daha düz mantıkta
           yaz." Sorun tek kelimede: "gerçekten" bir olguyu değil, "başka yerde
           açılmıyor" imasını taşıyor; avantaj kartı böylece savunma
           pozisyonuna düşüyor. Yeni başlık iddia değil OLGU söylüyor: hangi iki
           bankada kurumsal hesap açılıyor. BİLGİ KAYBI YOK, tersine iki ad alt
           satırdan başlığa çıktı ve çizimdeki iki plakayla (brands) aynı şeyi
           söylüyor. Markasız "Kurumsal banka hesabı" elendi: düz ama somut
           değil, kartın taşıdığı tek doğrulanabilir bilgiyi de kaybediyordu. */
        title: "Wio ve Mashreq NeoBiz'de kurumsal hesap",
        icon: "bank",
        brands: ["wio", "mashreq"],
        /* Alt satır başlıkla aynı cümleyi tekrar etmesin diye yeniden yazıldı;
           YENİ BİLGİ YOK. İki olgu da sitede zaten yazılı: dosyanın bankanın
           istediği formatta hazırlandığı (steps · "GSM hattı ve banka hesabı")
           ve kararın bankada olduğu (faq · "Banka hesabı garanti mi?" ·
           brand.ts · STANCE_LIMITS). "şart" kelimesi bilerek geçmiyor:
           CountryIntro'daki isConditional() o kelimeyi görünce karta
           "şarta bağlı" rozeti basıyor ve rozet buraya ait değil. */
        line: "Başvuru dosyasını bankanın istediği formatta biz hazırlıyoruz; hesap kararını banka veriyor.",
      },
      {
        title: "Global tahsilat kanalları açık",
        icon: "card",
        brands: ["stripe", "paypal", "wise"],
        line: "Stripe, PayPal ve wamo ile kartla tahsilat kurulabiliyor; Wise ve Payoneer hesapları BAE şirketiyle çalışıyor.",
      },
      {
        /* "Oturum vizesi alabiliyorsunuz" idi. -abiliyorsunuz kalıbı bir
           olgu bildirmiyor, bir şüpheye cevap veriyor ("acaba alınabiliyor
           mu?") ve kartı savunmaya sokuyor. Düz karşılığı uydurulmadı:
           sectors.ts · VISA_LINE.yes zaten bu cümleyi kullanıyor, yani aynı
           olgu sitede tek ifadeyle anılıyor.
           DİKKAT: bu başlık aynı zamanda ANA SAYFA hero tabelasının Dubai
           satırı (home/HeroPortal · home/HeroScene · HOOK_ICON "id"), yani
           değişiklik canlı ana sayfaya da düşüyor. */
        title: "Şirket üzerinden oturum vizesi",
        icon: "id",
        line: "Ortak ve çalışan vizesi, Emirates ID ve sağlık kontrolü dahil süreç.",
      },
      /* "Ofisimiz burada" buradan çıktı: bu Dubai'nin avantajı değil, Ortac'ın
         Dubai'deki avantajı. Ülkenin kendi avantajlarıyla aynı ızgarada durunca
         iki farklı iddia tek liste gibi okunuyordu. Kendi bölümüne taşındı —
         CountryOrtac. */
    ],
    /* GERİ GELDİ. Bu kalemler bir tur avantaj bento'sundan çıkarılmış ve
       "kendi başlarına bir bölüm olarak geri gelecek" diye not düşülmüştü;
       o bölüm artık var: CountryCost ("Karşılığında"). Avantajlar yukarıya,
       giriş bloğuna taşındığı için burası boşalmıştı ve boşluk bununla doldu.

       Ülke başına sayı EŞİT DEĞİL — Dubai 2, İngiltere 1, KKTC 3. Bölüm satır
       listesi olarak kuruldu ki tek maddede de delik açmasın. Dizi boşalırsa
       CountryCost null dönüyor. */
    watchouts: [
      {
        title: "En yüksek kuruluş maliyeti",
        line: "Lisans ve yenileme kalemleri İngiltere'nin birkaç katı. İkinci yıl yenilemesini baştan planlayın.",
      },
      {
        title: "Yıllık yenileme zorunlu",
        line: "Lisans süresi dolmadan yenilenmezse ceza işler ve banka hesabı riske girer.",
      },
    ],
    clarify: {
      title: "Dubai'de sık karıştırılan üç başlık.",
      lead: "Bunları baştan yazıyoruz ki süreç ortasında sürpriz olmasın.",
      items: [
        {
          title: "Vize için BAE'ye gelmeniz gerekiyor",
          line: "Tescil uzaktan tamamlanabiliyor. Vize, biyometri ve sağlık kontrolü için fiziken BAE'de bulunmanız gerekiyor; bu adım vekâletle yürümüyor.",
        },
        {
          title: "Serbest bölge tek başına %0 demek değil",
          line: "Serbest bölge şirketi olmak otomatik muafiyet vermiyor. %0 oranı, şartları sağlayan nitelikli serbest bölge mükellefinin nitelikli gelirinde geçerli. Şart ihlalinde standart oran uygulanıyor.",
        },
        {
          title: "Şirket kurmak vergi avantajı üretmiyor",
          line: "Avantaj gerçek faaliyete, yönetimin nerede yürüdüğüne, mukimliğinize, gelir türünüze ve ilgili ülke kurallarına bağlı. Bunu değerlendirmeden kurulum yapmıyoruz.",
        },
      ],
    },
    structures: {
      /* Başlık eskiden "Önce yapıyı seçiyoruz: serbest bölge mi, mainland mi?"
         idi. Müşteri kısalttı: "zaten altta konuyu veriyoruz, 30 kez serbest
         bölge mainland yazmamıza gerek yok." İki seçeneğin adı hemen altta,
         kartların başlığında duruyor. */
      title: "Önce yapıyı seçiyoruz:",
      lead: "Fiyat, vize kotası ve kime satabileceğiniz bu seçime bağlı. Sonradan değiştirmek yeni kuruluş demek.",
      rule: "Kararı satış yaptığınız taraf veriyor: müşteriniz BAE dışındaysa serbest bölge, BAE içindeyse mainland.",
      options: [
        {
          name: "Serbest bölge",
          line: "Bölge otoritesine bağlı lisans. Kuruluşların büyük çoğunluğu burada.",
          fit: [
            "Müşteriniz Türkiye, AB veya BAE dışında",
            "E-ticaret, yazılım, danışmanlık, ajans",
            "Uzaktan çalışan küçük ekip",
            "Kuruluş maliyetini düşük tutmak istiyorsunuz",
          ],
          watch:
            "BAE iç pazarına doğrudan satış için ek düzenleme gerekiyor. Vize kotası aldığınız lisans paketine bağlı.",
        },
        {
          name: "Mainland",
          line: "Ekonomi departmanına bağlı lisans. BAE iç pazarında serbest çalışır.",
          fit: [
            "BAE içindeki şirketlere veya tüketiciye satıyorsunuz",
            "Fiziki mağaza, depo veya şube açacaksınız",
            "Kamu ve kurumsal ihalelere gireceksiniz",
            "Geniş vize kotasına ihtiyacınız var",
          ],
          watch:
            "Ofis şartı ve toplam maliyet serbest bölgenin üzerinde. Faaliyet koduna göre ek onay istenebiliyor.",
        },
      ],
    },
    docs: {
      groups: [
        {
          title: "Sizden istediklerimiz",
          hint: "Hepsi dijital; ıslak imza aşamasına kadar evrak göndermenize gerek yok.",
          items: [
            "Pasaportun renkli taraması (en az 6 ay geçerli)",
            "Beyaz fonlu vesikalık fotoğraf",
            "Adres beyanı: son 3 aya ait fatura veya ikametgâh",
            "Faaliyet konusu ve hedef müşteri tarifi",
            "Üç şirket adı alternatifi, tercih sırasıyla",
          ],
        },
        {
          title: "Süreç içinde ortaya çıkanlar",
          hint: "Bunları biz hazırlıyoruz; sizden yalnızca onay ve imza isteniyor.",
          items: [
            "İsim onayı ve ön başvuru dosyası",
            "Kuruluş sözleşmesi ve pay yapısı",
            "Ticaret lisansı başvurusu",
            "Vize için sağlık kontrolü ve biyometri (BAE'de)",
            "Emirates ID başvurusu",
          ],
        },
      ],
      note: "Faaliyet koduna ve seçtiğiniz otoriteye göre ek belge istenebiliyor. Tercüme veya tasdik gerekiyorsa listeyi teklifte ayrıca yazıyoruz.",
    },
    tax: {
      rows: [
        {
          label: "Kurumlar vergisi",
          value: "375.000 AED'ye kadar %0, üzeri %9",
          note: "Vergiye tabi kazanç üzerinden.",
        },
        {
          label: "Serbest bölge şirketi",
          value: "Otomatik muafiyet yok",
          note: "Şartları sağlayan nitelikli serbest bölge mükellefinin nitelikli gelirinde %0.",
        },
        {
          label: "Kurumlar vergisi beyanı",
          value: "Vergi döneminin bitiminden itibaren 9 ay içinde",
        },
        {
          label: "KDV",
          value: "%5",
          note: "Yıllık vergiye tabi tedarik 375.000 AED eşiğini aşarsa kayıt zorunlu.",
        },
        {
          label: "Kişisel gelir vergisi",
          value: "Yok",
          note: "BAE'de maaş ve kâr payı üzerinden kişisel gelir vergisi alınmıyor.",
        },
      ],
      /* Cümlenin sonu "kurgunuzu mali müşavirimizle birlikte netleştiriyoruz"du.
         Firmanın öyle bir hizmet kurgusu yok, yani ziyaretçiyi olmayan bir
         randevuya yolluyordu. Bağlayıcılık uyarısı ("kişiye özel vergi görüşü
         vermiyoruz") duruyor — kalkan şey uyarı değil, yönlendirme. Sorusu olan
         için çıkış, bölümün altındaki AskCta. */
      note: "Bu tablo genel çerçeve. Sizin durumunuz faaliyetinize, yönetimin nerede yürüdüğüne, mukimliğinize ve gelir türünüze göre değişir. Kişiye özel vergi görüşü vermiyoruz.",
    },
    fitTable: [
      { profile: "E-ticaret ve dijital ürün", you: "Online satış yapıyorsanız", ok: true, why: "Kartla tahsilat ve lojistik tarafı sorunsuz kurulur.", ikon: "magaza", },
      { profile: "Körfez ve Orta Doğu'ya satış", you: "Körfez'e satıyorsanız", ok: true, why: "Yerel şirket, yerel müşteride güven ve ödeme kolaylığı.", ikon: "kure", },
      { profile: "Oturum vizesi isteyen", you: "Oturum vizesi istiyorsanız", ok: true, why: "Ortak vizesi ve Emirates ID süreç içinde alınır.", ikon: "kimlik", },
      { profile: "SaaS ve ajanslar", you: "SaaS veya ajans işletiyorsanız", ok: true, why: "Stripe, PayPal ve Wise bağlantısı kurulabiliyor.", ikon: "kod", },
      { profile: "Kuruluş bütçesi dar olan", you: "Bütçeniz darsa", ok: false, why: "Üç ülkenin en yüksek kuruluş ve yenileme maliyeti burada.", ikon: "cuzdan", alt: "ingiltere" },
      { profile: "Hiç seyahat edemeyecek olan", you: "Hiç seyahat edemeyecekseniz", ok: false, why: "Banka imzası ve vize için bir kez gelmek şart.", ikon: "ucak", alt: "ingiltere" },
      { profile: "Yalnızca AB'ye fatura kesen", you: "Yalnızca AB'ye fatura kesiyorsanız", ok: false, why: "İngiltere Ltd bu profilde daha az sürtünme yaratır.", ikon: "fis", alt: "ingiltere" },
    ],
    /* SWAP:DUBAI_STEPS — yedi adım, müşterinin eski sitesindeki akışın aynısı.
       Buradaki liste önce üç ülkede de birebir aynı beş satırdı (evrak → isim →
       tescil → banka → teslim). Genel bir kuruluş şablonuydu, yani Dubai'ye dair
       hiçbir şey söylemiyordu: yalnızca burada olan adımlar — mainland/serbest
       bölge seçimi, medical fitness, Emirates ID — hiç görünmüyordu, oysa
       ziyaretçinin Dubai'yi ötekilerden ayıran sorusu tam olarak onlar.
       Başlıklar ve sıra eski siteden; dil, `who` dağılımı ve süre kalıbı bu
       sitenin kuralına uyduruldu.

       Süreler tipik aralık, müşteri teyidiyle güncellenecek. İlk üç adımda gün
       yazmıyoruz çünkü orada bekleme yok: üçü de karar, üçü de aynı görüşmede
       kapanıyor. Bekleme dördüncü adımda, dosya otoriteye gidince başlıyor. */
    steps: [
      {
        title: "Şirket isminin belirlenmesi",
        timing: "ilk görüşme",
        who: "siz",
        line: "Üç ad adayını tercih sırasıyla veriyorsunuz. Ad, BAE'nin isimlendirme kurallarına uymak ve daha önce alınmamış olmak zorunda; uygunluk kontrolünü ve rezervasyonu biz yapıyoruz.",
        short: "Üç ad adayını sırayla veriyorsunuz; uygunluk kontrolünü ve rezervasyonu biz yapıyoruz.",
      },
      {
        title: "Faaliyet ve lisans türünün belirlenmesi",
        timing: "ilk görüşme",
        who: "ortac",
        line: "Ne sattığınızı anlatıyorsunuz; faaliyet kodunu ve ona karşılık gelen ticari lisans sınıfını biz eşleştiriyoruz. Doğru faaliyet seçimi hem ruhsat sürecini hem sonraki vergi ve regülasyon işlerini belirliyor, sonradan değiştirmek ek işlem demek.",
        short: "Ne sattığınızı anlatıyorsunuz; faaliyet kodunu ve lisans sınıfını biz eşleştiriyoruz.",
      },
      {
        title: "Kuruluş tipinin seçilmesi",
        timing: "ilk görüşme",
        who: "siz",
        line: "Serbest bölge, mainland veya offshore. Kararı satış yaptığınız taraf veriyor: müşteriniz BAE dışındaysa serbest bölge, BAE içindeyse mainland. Vize kotası ve toplam maliyet de bu seçime bağlı; sonradan değiştirmek yeni kuruluş demek.",
        short: "Serbest bölge, mainland veya offshore. Kararı satış yaptığınız taraf veriyor.",
      },
      {
        title: "Kuruluş işlemleri ve tescil",
        timing: "tipik 3-5 gün",
        who: "ortac",
        line: "Ana sözleşme, kuruluş başvurusu ve ekleri hazırlanıp ilgili otoriteye teslim ediliyor. Sizden bu aşamada yalnızca onay ve imza isteniyor; tescil tamamlandığında şirket resmî olarak kurulmuş oluyor.",
        short: "Başvuru otoriteye teslim ediliyor; sizden yalnızca onay ve imza isteniyor.",
      },
      {
        title: "Ticari lisansın alınması",
        timing: "tipik 2-4 gün",
        who: "otorite",
        line: "Lisans, seçilen faaliyet sınıfına göre otorite tarafından düzenleniyor ve şirketin yasal olarak faaliyete başlamasını sağlıyor. Düzenleme takvimi otoritede; faaliyet koduna göre ek onay istendiğinde bu adım uzayabiliyor.",
        short: "Lisansı otorite düzenliyor; ek onay istenirse bu adım uzayabiliyor.",
      },
      {
        title: "Medical fitness ve Emirates ID",
        timing: "tipik 2-4 gün",
        who: "siz",
        line: "Oturum ve çalışma izni için sağlık kontrolü ve biyometri yapılıyor, ardından Emirates ID başvurusu açılıyor. Bu kimlik BAE'deki resmî işlemlerin çoğunda isteniyor. Adım vekâletle yürümüyor: bir kez BAE'de bulunmanız gerekiyor.",
        short: "Sağlık kontrolü ve biyometri için bir kez BAE'de bulunmanız gerekiyor.",
      },
      {
        title: "GSM hattı ve banka hesabı",
        timing: "tipik 1-2 hafta",
        who: "ortac",
        line: "Kurumsal telefon hattı açılıyor, banka dosyası bankanın istediği formatta hazırlanıp başvuru yapılıyor. Hesap kararı tamamen bankaya ait; reddedilirse ikinci bankaya yeniden başvuruyoruz.",
        short: "Hat açılıyor, banka dosyası hazırlanıp başvuruluyor; hesap kararı bankanın.",
      },
    ],
    included: [
      "Serbest bölge ticaret lisansı",
      "Şirket tescili ve kuruluş sözleşmesi",
      "İsim onayı ve ön başvuru",
      "Evrak takibi ve panel erişimi",
      "Türkçe tek muhatap",
    ],
    excluded: [
      "Yıllık lisans yenilemesi (ikinci yıl)",
      "Fiziki ofis kirası",
      "Uçuş ve konaklama",
      "Aile vizesi",
    ],
    routes: [
      {
        title: "Fatura ile",
        line: "{hedefteki} şirketiniz Dubai şirketine hizmet faturası keser.",
        note: "Transfer fiyatlandırması kurgusu ve hizmet sözleşmesi gerekir.",
      },
      {
        title: "Kâr payı ile",
        line: "Dubai şirketi dönem kârını ortağına dağıtır.",
        note: "{hedef}–BAE çifte vergilendirme anlaşması kapsamında değerlendirilir.",
      },
      {
        title: "Maaş ile",
        line: "Şirketten kendinize bordrolu ödeme yaparsınız.",
        note: "Mukimlik durumunuz sonucu doğrudan değiştirir.",
      },
    ],
    faq: [
      {
        q: "Dubai'ye gitmeden şirket kurulur mu?",
        a: "Tescil kısmı uzaktan tamamlanabiliyor; ancak banka imzası ve vize işlemleri için bir kez gelmeniz gerekiyor. Sadece şirket isteyip banka istemiyorsanız durumu görüşmede netleştiriyoruz.",
      },
      {
        q: "Banka hesabı garanti mi?",
        a: "Hayır. Hiçbir aracı bankanın kararını garanti edemez. Biz dosyayı bankanın istediği formatta hazırlıyor ve süreci takip ediyoruz; reddedilirse ikinci bankaya yeniden başvuruyoruz.",
      },
      {
        q: "İkinci yıl ne ödeyeceğim?",
        a: "Lisans yenilemesi ve varsa vize yenilemesi. Rakamı kuruluş teklifinde ayrı satır olarak yazıyoruz ki sürpriz olmasın.",
      },
      {
        q: "Muhasebe zorunlu mu?",
        a: "Defter tutma ve beyan yükümlülüğü var. Muhasebeyi bizden almasanız da bir yerden almanız gerekiyor.",
      },
      {
        q: "Türkiye'de mukimsem ne olur?",
        a: "Türkiye'de mukimseniz dünya genelindeki geliriniz Türkiye'de beyana tabi olabilir. Kurgunun en kritik başlığı bu: BAE tarafını Türkiye tarafından ayrı düşünürseniz sonuç yanlış çıkar. İkisini birlikte değerlendirmeden kurulum yapmıyoruz; kişiye özel vergi görüşü de vermiyoruz.",
      },
    ],
  },

  /* ==========================================================================
     İNGİLTERE · 23.09.2026 · İKİNCİ YAZIM, RESMÎ KAYNAKLI
     Burak: "ingiltere şirket kuruluş sayfasına geçelim. sen yine
     araştırmalarını yap ama eskiden elimizde olan 2 pdf'i de atıyorum."
     Olgular docs/ingiltere-mevzuat.md (gov.uk, Companies House, HMRC,
     legislation.gov.uk; 23.09.2026). Müşterinin sunumu docs/ingiltere-
     sunum.md [MÜŞTERİ]; eskimiş iddiaları KULLANILMADI: "%19" tek başına
     (ana oran %25), "£85.000" (şimdi £90.000), "500 milyon tüketici" (AB,
     Brexit öncesi), "London Stock Exchange" (Ltd halka arz edemez), "3 gün"
     (önce zorunlu kimlik doğrulama var).
     Rakiplerde olmayan dört şey bu sayfada: kuruluştan önce kimlik
     doğrulama, 2026 harçları, iki katına çıkan beyan cezaları, Türkiye'den
     yönetilen şirketin iş merkezi riski.
     KKTC'deki gibi: vergi akışı (paraYolu), ödeme kanalları (odeme), yıllık
     takvim (takvim, yeni). Fiyat paneline dokunulmadı (üç paket turu).
     ========================================================================= */
  ingiltere: {
    tagline: "Limited · Companies House",
    intro:
      /* 23.09.2026 · 5 satırdan 2'ye (Burak: "gereksiz uzun … boyutu
         kalabilir"). Vergi ve takvim kendi bölümlerinde. */
      "Stripe, PayPal, Amazon ve Etsy İngiltere şirketiyle çalışıyor; kuruluş baştan sona uzaktan.",
    pros: [
      {
        /* [RESMÎ] sağlayıcı sayfaları, docs/ingiltere-mevzuat.md · 7. */
        title: "Ödeme altyapısı açık",
        icon: "card",
        brands: ["stripe", "paypal", "wise"],
        line: "Stripe, PayPal, Wise, Amazon ve Etsy İngiltere şirketiyle çalışıyor. Stripe için İngiltere'de bir banka hesabı yeterli.",
      },
      {
        /* [RESMÎ] direktörün İngiltere'de yaşaması gerekmiyor; kimlik
           doğrulama yurt dışından yetkili aracıyla. */
        title: "Uzaktan kuruluş",
        icon: "remote",
        line: "Direktörün İngiltere'de yaşaması gerekmiyor. Kimlik doğrulama dahil her adım uzaktan tamamlanıyor.",
      },
      {
        /* [RESMÎ] "usually registered within 24 hours". */
        title: "Tescil genellikle 24 saatte",
        icon: "zap",
        line: "Kimlik doğrulama tamamlandıktan sonra Companies House başvuruyu genellikle bir gün içinde tescil ediyor.",
      },
      {
        /* [MÜŞTERİ] sunum: İngiliz hukukuna dayalı şeffaf yapı, itibar. */
        title: "Tanınan bir şirket yapısı",
        icon: "badge",
        line: "İngiliz Ltd'si müşteri, tedarikçi ve platformlarda tanıdık; sicil kamuya açık ve şeffaf.",
      },
    ],
    watchouts: [
      {
        title: "Beyan takvimi sıkı",
        line: "Companies House ve HMRC dosyaları gecikirse ceza otomatik işliyor; 2026'dan beri beyanname cezası iki katı.",
      },
    ],
    clarify: {
      title: "İngiltere'de sık karıştırılan üç başlık.",
      lead: "En sık gelen üç yanlış beklenti, sırasıyla.",
      items: [
        {
          title: "Şirket kurmak oturum hakkı vermiyor",
          line: "Ltd sahibi veya direktörü olmak vize ya da oturum hakkı doğurmuyor. Resmî yol ayrı bir vize başvurusu (Innovator Founder).",
        },
        {
          title: "Vergi avantajı için gelen yanlış adreste",
          line: "Ltd'nin kârı İngiltere'de %19-25 kurumlar vergisine tabi. Burası ödeme altyapısı ve tanınırlık için seçilir, vergi için değil.",
        },
        {
          title: "Tescil kolay, banka değil",
          line: "Geleneksel bankalar İngiltere'de yaşamayan direktöre kolay hesap açmıyor; pratikte Wise ya da Tide gibi dijital hesapla başlanıyor.",
        },
      ],
    },
    docs: {
      groups: [
        {
          /* [MÜŞTERİ] sunum: kimlik/pasaport, sicil kaydı, ikametgâh.
             [RESMÎ] kayıtlı e-posta zorunlu (4 Mart 2024). */
          title: "Sizden istediklerimiz",
          hint: "Tamamı dijital; hiçbir aşamada evrak göndermeniz ya da gitmeniz gerekmiyor.",
          items: [
            "Pasaport ya da kimlik taraması",
            "Adli sicil kaydı",
            "İkametgâh belgesi",
            "Şirket adı ve iki alternatifi",
            "Faaliyet konusu, pay dağılımı ve direktör bilgileri",
          ],
        },
        {
          /* [RESMÎ] kimlik doğrulama, tescil, UTR; [MÜŞTERİ] teslim edilen
             belgeler (sunum 4. adım). */
          title: "Süreç içinde ortaya çıkanlar",
          hint: "Companies House ve HMRC tarafını biz yürütüyoruz.",
          items: [
            "Companies House kimlik doğrulaması",
            "Kuruluş belgesi (Certificate of Incorporation)",
            "Ana sözleşme ve hisse belgesi",
            "Londra kayıtlı ofis adresi",
            "Şirket vergi numarası (UTR)",
          ],
        },
      ],
      note: "Direktör ya da ortak sayısı arttıkça kimlik doğrulama ve belge listesi her kişi için tekrarlanıyor.",
    },
    tax: {
      /* [RESMÎ] gov.uk/corporation-tax-rates · vat-registration. */
      bant: {
        baslik: "Kurumlar vergisi kâra göre değişiyor",
        dilimler: [
          { aralik: "£50.000'e kadar", oran: "%19", not: "Küçük kâr oranı", ton: "dusuk" },
          { aralik: "£50.000 – £250.000", oran: "%19 → %25", not: "Kademeli geçiş (marjinal indirim)", ton: "gecis" },
          { aralik: "£250.000 üstü", oran: "%25", not: "Ana oran", ton: "ust" },
        ],
      },
      rows: [
        /* %19 bantta zaten var; kart onu tekrar ediyordu (ilk ölçüm). */
        { label: "Türkiye ile anlaşma", value: "1988", note: "Çifte vergilendirmeyi önleme anlaşması." },
        { label: "KDV eşiği", value: "£90.000", note: "Yıllık ciro eşiği; altında isteğe bağlı kayıt mümkün." },
        { label: "Kuruluş harcı", value: "£100", note: "Companies House online kuruluş, 1 Şubat 2026'dan beri." },
        { label: "Yıllık bildirim", value: "£50", note: "Her yıl verilen şirket bilgisi bildirimi." },
      ],
      note: "Oranlar ve harçlar gov.uk'tan (23.09.2026). Size uygulanacak çerçeveyi yazılı teklifte satır satır yazıyoruz.",
    },
    /* PROFİLLER · [RESMÎ] docs/ingiltere-mevzuat.md; sart = şartla uygun. */
    fitTable: [
      { profile: "Stripe ile kart tahsilatı", you: "Kartla tahsilat yapacaksanız", ok: true, sart: "Stripe İngiltere şirketi ve İngiltere'de bir banka hesabı istiyor; hesap açılışını kuruluşla birlikte planlıyoruz.", why: "Stripe, PayPal ve Shopify Payments İngiltere şirketiyle çalışıyor.", ikon: "kart", },
      { profile: "Amazon ve Etsy satıcısı", you: "Amazon UK ya da Etsy'de satacaksanız", ok: true, why: "İkisi de İngiltere şirketini satıcı olarak kabul ediyor.", ikon: "magaza", },
      { profile: "Yazılım ve danışmanlık", you: "Yazılım ya da danışmanlık satıyorsanız", ok: true, why: "Fatura, sözleşme ve tahsilat tarafı en oturmuş pazar.", ikon: "kod", },
      { profile: "Türkiye'de yaşayıp yöneten", you: "Türkiye'de yaşayıp şirketi buradan yönetecekseniz", ok: true, sart: "Kâr payını Türkiye'de beyan ediyorsunuz; şirket fiilen Türkiye'den yönetilirse Türkiye'de vergilenme riski doğuyor. Ayrıntı yukarıdaki vergi bölümünde.", why: "Kuruluş ve yönetim uzaktan yürüyor.", ikon: "harita", },
      { profile: "Vergi avantajı arayan", you: "Vergi avantajı arıyorsanız", ok: false, why: "Kâr üzerinden %19-25 kurumlar vergisi var.", ikon: "yuzde", alt: "dubai" },
      { profile: "Oturum vizesi isteyen", you: "Oturum vizesi istiyorsanız", ok: false, why: "Şirket kurmak oturum hakkı vermiyor.", ikon: "kimlik", alt: "dubai" },
    ],
    /* ADIMLAR · [MÜŞTERİ] sunumun beş adımı + [RESMÎ] zorunlu kimlik
       doğrulama (18.11.2025'ten beri, başvurudan ÖNCE). Süreler resmî:
       tescil "genellikle 24 saat", UTR ~14 gün. SetupScenes · KIND_BY_TITLE. */
    steps: [
      {
        title: "Şirket isminin belirlenmesi",
        timing: "ilk görüşme",
        who: "siz",
        line: "Şirket adı ve iki alternatifi belirleniyor, Companies House kurallarına uygunluğu kontrol ediliyor.",
      },
      {
        title: "Kimlik doğrulama",
        timing: "başvurudan önce",
        who: "siz",
        line: "18 Kasım 2025'ten beri her direktör ve ortağın kimliği Companies House için doğrulanıyor; yurt dışından yetkili aracıyla yapılıyor. Bu kod olmadan başvuru verilemiyor.",
        short: "Her direktör ve ortağın kimliği Companies House için doğrulanıyor; kod olmadan başvuru verilemiyor.",
      },
      {
        title: "Companies House başvurusu",
        timing: "doğrulamadan sonra",
        who: "ortac",
        line: "Evraklar hazırlanıp başvuru veriliyor; faaliyet kodu, pay dağılımı, kayıtlı ofis ve kayıtlı e-posta bu dosyada tanımlanıyor.",
        short: "Başvuru veriliyor; faaliyet kodu, pay dağılımı ve kayıtlı ofis bu dosyada tanımlanıyor.",
      },
      {
        title: "Tescil onayı",
        timing: "genellikle 24 saat",
        who: "otorite",
        line: "Companies House şirketi tescil ediyor; kuruluş belgesi, ana sözleşme ve hisse belgesi e-postayla size iletiliyor.",
        short: "Companies House şirketi tescil ediyor; kuruluş belgeleri e-postayla size iletiliyor.",
      },
      {
        title: "UTR ve vergi kaydı",
        timing: "yaklaşık 14 gün",
        who: "ortac",
        line: "Şirketin vergi numarası (UTR) HMRC'den postayla Londra adresine geliyor; kurumlar vergisi kaydı faaliyete başladıktan sonra üç ay içinde yapılıyor.",
        short: "Vergi numarası (UTR) HMRC'den postayla geliyor; kurumlar vergisi kaydı ardından yapılıyor.",
      },
    ],
    included: [
      "Companies House tescili",
      "Londra kayıtlı ofis adresi (1 yıl)",
      "Kuruluş belgeleri ve pay yapısı",
      "UTR ve HMRC vergi kaydı",
      "Evrak takibi ve panel erişimi",
    ],
    excluded: [
      "Geleneksel banka hesabı garantisi",
      "Yıllık adres yenilemesi",
      "KDV kaydı (eşik aşılırsa ayrıca)",
      "Bağımsız denetim",
    ],
    /* MoneyHome İngiltere'de basılmıyor: aynı soru ("Türkiye'de ne olur")
       vergi akışı bölümünde, kanun maddeleriyle (KKTC ile aynı karar). */
    routes: [],
    /* 23.09.2026 · YENİDEN. Burak: "İngiltere'de vergi ödeyip Türkiye'ye
       parayı atarsan bir de orada bir tur mu vergi ödüyorum, anlamadım."
       Önceki metin YANLIŞ YÖNLENDİRİYORDU: "İngiltere'de ödenen vergi
       Türkiye'deki vergiden düşülüyor" dedik; GVK md. 123'teki mahsup kişinin
       KENDİ geliri üzerinden ödediği yabancı vergi için, şirketin ödediği
       kurumlar vergisi gerçek kişi ortağın kâr payı vergisinden düşülmüyor
       (teyit listesi · 4 · 9, mali müşavire). Doğru anlatım iki katman:
         1) kâr İngiltere'de şirket seviyesinde vergileniyor (%19-25)
         2) şirkette kaldıkça Türkiye'de ek vergi yok: vergi yükü %10'un
            üstünde, KVK 7 dağıtılmayan kâr kuralı işlemiyor [RESMÎ]
         3) kâr payı alınınca Türkiye'de beyan; şartla yarısı istisna
            (GVK 22/4) [RESMÎ]
       Örnek şerit £100 üzerinden (gösterim, oran %19 dilimi). */
    paraYolu: {
      title: "Türkiye'de yaşıyorsanız vergi nerede çıkıyor?",
      accent: "vergi nerede çıkıyor?",
      lead: "Kâr önce İngiltere'de vergileniyor. Türkiye'de vergi, kâr payı olarak size geçtiğinde çıkıyor.",
      duraklar: [
        { kim: "Şirketiniz", baslik: "İngiltere'de", vergi: "%19–25", not: "Kâr önce burada vergileniyor. Kâr £50.000'e kadarsa %19.", ton: "beyan", ikon: "sirket" },
        { ikon: "kasa", kim: "Kâr şirkette kalırsa", baslik: "Türkiye'de", vergi: "Ek vergi yok", not: "Dağıtılmayan kâr Türkiye'de vergilenmiyor.", ton: "sifir" },
        { ikon: "kisi", kim: "Kâr payı alırsanız", baslik: "Türkiye'de", vergi: "Beyan", not: "Yıllık beyannamede; şartlar tutarsa yarısı istisna.", ton: "notr" },
      ],
      ayrim: 1,
      ornek: {
        baslik: "£100 kâr, hepsi kâr payı olarak size geçerse",
        parcalar: [
          { etiket: "İngiltere kurumlar vergisi", deger: 19, ton: "vergi" },
          { etiket: "Türkiye'de istisna (yarısı)", deger: 40.5, ton: "istisna" },
          { etiket: "Türkiye'de beyana giren", deger: 40.5, ton: "beyan" },
        ],
        not: "Beyana giren kısım gelir vergisi dilimine göre vergileniyor. İstisna için şirketin en az yarısına sahip olmak ve kâr payını beyanname tarihine kadar Türkiye'ye getirmek gerekiyor.",
      },
      uyarilar: [
        { baslik: "Şirket Türkiye'den yönetilirse", line: "İşlerin fiilen Türkiye'de yönetildiği bir şirket Türkiye'de de mükellef sayılabiliyor; iki ülke çatışmada karşılıklı anlaşmayla karar veriyor." },
        { baslik: "Maaş da bir seçenek", line: "Direktör olarak kendinize maaş ödeyecekseniz İngiltere'de bordro (PAYE) kaydı gerekiyor." },
      ],
      bilgi: "Türkiye ile İngiltere arasında 1988'den beri çifte vergilendirmeyi önleme anlaşması uygulanıyor. Kişiye özel vergi görüşü vermiyoruz; durumunuzu görüşmede konuşuyoruz.",
      kaynaklar: [
        { label: "Gelir Vergisi Kanunu md. 22, 75, 86", href: "https://www.mevzuat.gov.tr/MevzuatMetin/1.4.193.pdf" },
        { label: "Kurumlar Vergisi Kanunu md. 7", href: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5520.pdf" },
      ],
    },
    odeme: {
      title: "Hangi ödeme kanalı çalışıyor?",
      accent: "ödeme kanalı çalışıyor?",
      /* 23.09.2026 · SAHNE. Burak: "tüm ödeme sistemlerinin çalıştığını daha
         güzel lanse edersek iyi olur." Dört deneme reddedildi (yeşil logo
         duvarı, akış, yörünge, kayan şerit; ayrıntı CountryOdeme'de). Son
         tarif: "Dubai'de para ikonları geliyordu … öyle bir görsel ekleyip
         altında tüm uygulamaları açıklamak … Dubai'deki açıklamalar ne
         kadarsa." */
      gorunum: "sahne",
      sirket: "İngiltere şirketiniz",
      lead: "İngiltere'nin asıl gücü bu. Kartla tahsilat, pazaryeri, hesap ve kripto: global ödeme altyapısının hepsi İngiltere şirketiyle açılıyor.",
      /* Açıklamalar Dubai banka sayfasındaki kanal satırları kadar: ne işe
         yaradığı, tek cümle. Şartlar (Stripe için İngiliz banka hesabı,
         Shopify için GBP hesabı vb.) docs/ingiltere-mevzuat.md · 7'de. */
      kanallar: [
        { ad: "Stripe", brand: "stripe" as BrandKey, grup: "tahsilat", etiket: "Kartla satış", durum: "var", not: "Sitenizde ve uygulamanızda kartla tahsilat." },
        { ad: "PayPal", brand: "paypal" as BrandKey, grup: "tahsilat", etiket: "Online ödeme", durum: "var", not: "PayPal hesabıyla ödeyen müşteriden tahsilat." },
        { ad: "Shopify Payments", ikon: "sepet", grup: "tahsilat", etiket: "E-ticaret", durum: "var", not: "Shopify mağazanızda kartla ödeme." },
        { ad: "Amazon UK", ikon: "kutu", grup: "pazaryeri", etiket: "Pazaryeri", durum: "var", not: "Amazon'un İngiltere pazaryerinde satıcı hesabı." },
        { ad: "Etsy", ikon: "magaza", grup: "pazaryeri", etiket: "Pazaryeri", durum: "var", not: "Etsy mağazası ve Etsy Payments ile tahsilat." },
        { ad: "Wise", brand: "wise" as BrandKey, grup: "hesap", etiket: "Hesap", durum: "var", not: "Çok para birimli işletme hesabı ve yurt dışı transfer." },
        /* [MÜŞTERİ] 23.09.2026 · Burak: "Payoneer'i falan da ekleyebilirsin
           … bunların hepsi çalışıyor de, Binance'i falan da koy, oldu
           bitti." Üçü resmî kaynakla teyitli değil (teyit listesi · 4 · 11):
           Payoneer koşul yayımlamıyor, Revolut Business arama özetinde
           İngiltere/AEA ikameti istiyor, Binance 2023'ten beri İngiltere'de
           yeni kullanıcı kaydını kısıtlamıştı. */
        { ad: "Payoneer", brand: "payoneer" as BrandKey, grup: "hesap", etiket: "Yurt dışı müşteri", durum: "var", not: "Pazaryerlerinden ve yurt dışındaki müşteriden ödeme alma." },
        { ad: "Revolut Business", brand: "revolut" as BrandKey, grup: "hesap", etiket: "Hesap", durum: "var", not: "Dijital işletme hesabı ve şirket kartları." },
        { ad: "Binance", brand: "binance" as BrandKey, grup: "kripto", etiket: "Kripto ödeme", durum: "var", not: "Binance Pay ile müşteriden kripto ödeme alma." },
      ],
      /* Dipnot 23.09.2026'da kalktı (Burak: "hepsi çalışıyor de"); Tide ve
         HSBC şartları docs/ingiltere-mevzuat.md · 7'de. */
      not: "",
    },
    /* YILLIK TAKVİM · [RESMÎ] gov.uk annual accounts, company tax returns,
       pay corporation tax, confirmation statement. Rakiplerde yok: 1 Nisan
       2026'dan beri iki katına çıkan beyanname cezası. */
    takvim: {
      title: "Kuruluştan sonra her yıl ne var?",
      accent: "her yıl ne var?",
      lead: "İngiltere'de takvim sıkı ve cezalar otomatik. Dört dosyanın dördünü de biz takip ediyoruz; siz yalnız tarihleri bilin.",
      kalemler: [
        /* ceza boş: bildirim için resmî ceza tutarı bu turda okunmadı. */
        { ne: "Yıllık bildirim", sure: "Her yıl", kural: "Şirket bilgilerinin Companies House'a teyidi; harcı £50.", ceza: "" },
        { ne: "Yıllık hesaplar", sure: "9 ay", kural: "Mali yıl sonundan itibaren; ilk hesaplar kuruluştan 21 ay içinde.", ceza: "£150'den £1.500'e; iki yıl üst üste iki katı." },
        { ne: "Vergi beyannamesi", sure: "12 ay", kural: "Kurumlar vergisi beyannamesi (CT600), dönem sonundan itibaren.", ceza: "1 günde £200, 3 ayda +£200 (2026'dan beri)." },
        { ne: "Vergi ödemesi", sure: "9 ay 1 gün", kural: "Dönem sonundan itibaren; beyannameden önce ödeniyor.", ceza: "" },
      ],
      kaynak: { label: "Kaynak: gov.uk · Companies House ve HMRC", href: "https://www.gov.uk/prepare-file-annual-accounts-for-limited-company" },
    },
    faq: [
      {
        q: "İngiltere'de yaşamak zorunda mıyım?",
        a: "Hayır. Direktörün İngiltere'de yaşaması gerekmiyor. Şirketin İngiltere'de bir kayıtlı ofis adresi olması yeterli; o adresi biz sağlıyoruz.",
      },
      {
        q: "Şirket ne kadar sürede kuruluyor?",
        a: "Önce direktör ve ortakların kimliği Companies House için doğrulanıyor; ardından tescil genellikle 24 saat içinde çıkıyor. Vergi numarası (UTR) yaklaşık 14 gün içinde postayla geliyor.",
      },
      {
        q: "Banka hesabı açabilecek miyim?",
        a: "Geleneksel bankalar İngiltere'de yaşamayan direktöre kolay hesap açmıyor; HSBC küçük işletme hesabı için İngiltere vergi mukimliği istiyor. Pratikte Wise ya da Tide gibi dijital hesapla başlanıyor.",
      },
      {
        q: "Stripe için İngiltere mi, başka bir ülke mi?",
        a: "Stripe İngiltere şirketiyle çalışıyor; şartı İngiltere'de bir banka hesabı ve PO Box olmayan bir adres. Türkiye'de yaşayan biri için İngiltere bu yüzden en sık seçilen yol.",
      },
      {
        q: "Vergiyi nerede öderim?",
        a: "Şirket kârı İngiltere'de %19-25 kurumlar vergisine tabi. Kâr şirkette kaldıkça Türkiye'de ek vergi yok; kâr payı olarak size geçtiğinde Türkiye'de beyan ediyorsunuz, şartlarla yarısı istisna. Kişiye özel vergi görüşü vermiyoruz.",
      },
      {
        q: "KDV kaydı yaptırmalı mıyım?",
        a: "Yıllık ciro £90.000'i aşarsa zorunlu; altında isteğe bağlı. Müşteri profiliniz gerektiriyorsa gönüllü kayıt öneriyoruz.",
      },
      {
        q: "Şirket bana vize verir mi?",
        a: "Hayır. Ltd sahibi ya da direktörü olmak oturum hakkı doğurmuyor. İngiltere'de iş kurmanın resmî vize yolu ayrı bir başvuru (Innovator Founder).",
      },
      {
        q: "Muhasebeyi kim yapıyor?",
        a: "Yıllık hesaplar, vergi beyannamesi ve varsa KDV beyanlarını biz hazırlıyoruz. Sage ve Xero ile çalışıyoruz.",
      },
    ],
  },

  /* ==========================================================================
     KKTC · 22.09.2026 · ÜÇÜNCÜ YAZIM · SERBEST LİMAN ODAĞI
     Burak (ikinci yazımı görüp): "tamamen serbest liman şirketi odağındayız,
     o yüzden vergisiz şirket kuruyoz … uiş kuruyor muyuz emin değilim, sadece
     limited ve serbest liman var olabilir, hatta sadece serbest liman … şirket
     kuruluş süreci … attığım görsellerde var." Kaynak artık MÜŞTERİNİN KENDİ
     SUNUMU (22.09.2026'da gönderdiği beş slayt: avantajlar, işleyiş, süreç,
     muhasebe, fiyat) [MÜŞTERİ]; resmî kaynak (docs/kktc-mevzuat.md) onu
     doğrulamak ve çelişkiyi yakalamak için. Çelişkiler teyit listesinde:
       · Sunum "25.000€ sermaye bloke"; Serbest Liman'ın resmî sayfası
         yabancı ortaklı şirkette asgari SERMAYEYİ 50.000 EUR yazıyor (bloke
         edilen yabancı payı: örnekte 25.000). 23.09.2026 önce 50.000'e
         çekildi (Burak: "resmi kaynakta 50 ise onu kullan"), aynı gün
         25.000'e döndü: Burak firmadan "bloke 25k, 50 değil" diye öğrendi.
         RKMMD'nin 2024 prosedürü de yabancı ortaklı limitedde 25.000 EUR
         diyor; hangi ortaklık yapısında geçerli olduğu teyit listesinde.
       · Sunum "1-2 hafta içinde aktif" diyor, süreç slaytındaki adımların
         toplamı ~30 iş günü. Sitede adım süreleri var, toplam iddia YOK.
     Yapı seçimi bölümü KALKTI (Burak: "çok yazı dolu … yapı seçme kısmını
     hiç kullanamıyor olabiliriz"): tek yapı, Serbest Liman.
     "Kazancınızı Türkiye'ye nasıl getirirsiniz" bölümü KKTC'de yok
     (routes boş; şablon boş listede bölümü basmıyor).
     Fiyat paneline dokunulmadı: fiyatlar üç pakete geçecek (durum.md).
     ========================================================================= */
  kktc: {
    tagline: "Serbest Liman şirketi",
    intro:
      "KKTC Serbest Liman şirketi, KKTC dışındaki müşteriye yaptığınız işte kurumlar ve gelir vergisi ödemiyor. Türkiye'ye yakın, aynı saat diliminde ve KKTC'ye gelmeden kurulabiliyor.",
    pros: [
      {
        /* [MÜŞTERİ] sunum "%0 Kurumlar Vergisi ve %0 Gelir Vergisi";
           [RESMÎ] sliman.gov.ct.tr: bölgedeki faaliyet kazancı muaf, KKTC iç
           piyasası muafiyet dışında. Yıldız Dubai'deki gibi: şart var. */
        title: "Kurumlar ve gelir vergisi %0*",
        icon: "percent",
        line: "KKTC dışındaki müşteriye yapılan işte kurumlar ve gelir vergisi yok, KDV mükellefi değil. Yıldız önemli: KKTC içine satışta muafiyet uygulanmıyor.",
      },
      {
        /* [MÜŞTERİ] "Türkiye ile aynı saat diliminde". Çizim gerçek harita
           (ProSchema · FigYakin). */
        title: "Türkiye'ye yakın",
        icon: "yakin",
        line: "Aynı dil, aynı saat dilimi; gerektiğinde bir günlük yol.",
      },
      {
        /* [MÜŞTERİ] "KKTC'ye gelmeden şirket kurma ve online yönetim";
           süreç slaytı: "imzalı belgeler bize kargolanır". */
        title: "KKTC'ye gelmeden kuruluş",
        icon: "remote",
        line: "İmzalı belgeleri kargoyla gönderiyorsunuz; başvuru, onay ve tescil sizin yerinize yürüyor. Şirket uzaktan yönetiliyor.",
      },
      {
        /* [MÜŞTERİ] "Türkiye hukuk sistemiyle uyumlu" · "Yurtdışına ve
           Türkiye'ye kolay para transferi"; [RESMÎ] 38/1997: döviz ve transfer
           serbest. */
        title: "Tanıdık düzen, serbest transfer",
        icon: "badge",
        line: "Hukuk ve ticari pratik Türkiye'ye yakın; yurt dışına ve Türkiye'ye para transferi serbest.",
      },
    ],
    watchouts: [
      {
        title: "Tahsilat kanalları sınırlı",
        line: "Stripe, PayPal ve Wise'ın ülke listelerinde KKTC yok. Ana kısıt bu.",
      },
      {
        title: "KKTC içine satış vergili",
        line: "Serbest Liman şirketi KKTC iç piyasasına sattığında gümrük ve KDV tam ödeniyor.",
      },
      {
        title: "Uluslararası tanınırlık dar",
        line: "Bazı yurt dışı platformlar KKTC şirketini kabul etmiyor.",
      },
    ],
    clarify: {
      title: "KKTC'de sık karıştırılan dört başlık.",
      lead: "Bu dördü baştan netleşmezse yanlış ülkeye kurulum yapılıyor.",
      items: [
        {
          title: "AB üyesi değil",
          line: "KKTC Avrupa Birliği üyesi değil. AB içinde tescilli şirket gerektiren pazar yeri, platform veya müşteri sözleşmeleri için kullanılamıyor.",
        },
        {
          title: "Güney Kıbrıs ile aynı ülke değil",
          line: "Kıbrıs Cumhuriyeti ayrı bir ülke, ayrı bir hukuk ve vergi düzeni. İnternette okuduğunuz \"Kıbrıs şirketi\" içeriklerinin çoğu güneyi anlatıyor; ikisi birbirinin yerine geçmiyor.",
        },
        {
          title: "Vergi muafiyeti yurt dışı işte",
          line: "Muafiyet KKTC dışındaki müşteriye yapılan iş için. KKTC içine satışta gümrük ve KDV ödeniyor.",
        },
        {
          title: "Şirket kurmak oturum vermiyor",
          line: "KKTC'de oturup şirketi yönetecekseniz Çalışma Bakanlığı'ndan ayrıca iş kurma izni almanız gerekiyor.",
        },
      ],
    },
    docs: {
      groups: [
        {
          /* [MÜŞTERİ] sunum slayt 3 · "Şirket Kuruluşu İçin Gerekli Belgeler",
             birebir sıra. */
          title: "Sizden istediklerimiz",
          hint: "Çoğunu e-Devlet'ten birkaç dakikada alıyorsunuz; imzalı nüshaları kargoyla gönderiyorsunuz.",
          items: [
            "Pasaport veya kimlik kartınızın kopyası",
            "e-Devlet'ten alınmış ikamet belgesi",
            "e-Devlet'ten alınmış adli sicil belgesi",
            "Sermaye bloke banka yazısı (yabancı ortakların payı kadar)",
            "Adres kira sözleşmesi",
          ],
        },
        {
          /* [MÜŞTERİ] süreç slaytı: "şirket kuruluş belgeleri hazırlanır",
             Serbest Liman başvurusu, Bakanlar Kurulu onayı, tescil. */
          title: "Süreç içinde ortaya çıkanlar",
          hint: "Bunları biz hazırlıyoruz; sizden yalnızca onay ve imza isteniyor.",
          items: [
            "İsim uygunluk kontrolü",
            "Şirket kuruluş belgeleri",
            "Serbest Liman başvurusu ve onayı",
            "Bakanlar Kurulu onayı",
            "Tescil ve şirket adresi",
          ],
        },
      ],
      note: "Adres, muhasebe ofisiyle yapılan sözleşmeyle de karşılanabiliyor; o durumda Serbest Liman'ın belirlediği KKTC vatandaşı temsilci atanıyor.",
    },
    tax: {
      /* [MÜŞTERİ] sunum slayt 3 · Vergi yükümlülüğü; [RESMÎ] sliman vergi
         sayfası. Değerler kısa: vergi bölümü bunları büyük rakam olarak
         basıyor (CountryTax · kart düzeni). */
      rows: [
        { label: "Kurumlar vergisi", value: "%0", note: "KKTC dışındaki müşteriye yapılan işte.", vurgu: true },
        { label: "Gelir vergisi", value: "%0", note: "Aynı şartla: faaliyet KKTC dışına.", vurgu: true },
        { label: "KDV", value: "Yok", note: "Serbest Liman şirketi KDV mükellefi değil.", vurgu: true },
        { label: "Kâr transferi", value: "Serbest", note: "Yurt dışına ve Türkiye'ye transfer serbest." },
      ],
      /* Muafiyetin şartı bir cümle olarak değil şema olarak: aynı şirket,
         iki müşteri, iki sonuç. [RESMÎ] sliman vergi sayfası. */
      split: {
        from: "Serbest Liman şirketiniz",
        out: { label: "KKTC dışındaki müşteri", value: "%0", line: "Kurumlar ve gelir vergisi yok, KDV yok." },
        inn: { label: "KKTC içindeki müşteri", value: "Gümrük + KDV", line: "İç piyasaya giden işte muafiyet uygulanmıyor." },
      },
      note: "Muafiyet Serbest Liman ve Bölge Yasası'ndan. Size uygulanacak çerçeveyi yazılı teklifte satır satır yazıyoruz.",
    },
    /* 23.09.2026 · GÜÇLENDİRİLDİ (Burak: "6. kısmı ekleyelim daha güçlü
       olsun"). Profiller talep araştırmasındaki gerçek sorulardan (docs/kktc-
       talep-arastirmasi.md): yazılımcı/freelancer, e-ticaret, Türkiye'den
       yöneten. Üçüncü hâl "şartla uygun" (sart). Olgular docs/kktc-mevzuat.md
       · 9-11: Amazon, Etsy, Stripe, PayPal, Shopify listelerinde KKTC yok
       [RESMÎ]; kâr payı ve yönetim yeri kuralı GVK 75/86, KVK 3/7 [RESMÎ]. */
    fitTable: [
      { profile: "Transit ticaret ve ihracat", you: "Malınız bölgeden yurt dışına gidiyorsa", ok: true, why: "Serbest Liman'ın asıl işi bu: bölgedeki kazanç vergiden ve gümrükten muaf.", ikon: "kutu", },
      { profile: "Yazılımcı ve freelancer", you: "Yurt dışındaki müşterilere hizmet veriyorsanız", ok: true, sart: "Müşteriniz banka havalesiyle ödüyorsa. Stripe ve PayPal KKTC'de açılmıyor; kartla tahsilat gerekiyorsa uygun değil.", why: "KKTC dışındaki işte kurumlar ve gelir vergisi yok, KDV yok.", ikon: "kod", },
      { profile: "Türkiye'de yaşayıp yöneten", you: "Türkiye'de yaşayıp şirketi buradan yönetecekseniz", ok: true, sart: "Kâr payını Türkiye'de beyan ediyorsunuz; şirket fiilen Türkiye'den yönetilirse Türkiye'de vergilenme riski doğuyor. Ayrıntı yukarıdaki \"Türkiye'de yaşıyorsanız\" bölümünde.", why: "Şirket tarafında vergi yok; yükümlülük sizin tarafınızda.", ikon: "harita", },
      { profile: "Düşük işletme maliyeti", you: "İşletme maliyetini düşük tutmak istiyorsanız", ok: true, why: "Ofis kiralamadan, muhasebe ofisiyle adres sözleşmesiyle çalışılabiliyor.", ikon: "cuzdan", },
      { profile: "Amazon ve Etsy satıcısı", you: "Amazon ya da Etsy'de satacaksanız", ok: false, why: "İkisinin de satıcı ülke listesinde KKTC yok.", ikon: "magaza", alt: "ingiltere" },
      { profile: "Stripe ile kart tahsilatı", you: "Kart tahsilatını Stripe ile yapacaksanız", ok: false, why: "Stripe'ın ülke listesinde KKTC yok. Ana kısıt bu.", ikon: "kart", alt: "dubai" },
      { profile: "KKTC içine satış", you: "KKTC içindeki müşteriye satacaksanız", ok: false, why: "Serbest Liman şirketi iç piyasada gümrük ve KDV ödüyor; muafiyetin anlamı kalmıyor.", ikon: "bina", },
    ],
    /* ADIMLAR · [MÜŞTERİ] sunum slayt 4 · "Şirket Kuruluş Süreci", beş adım,
       süreleri sunumdan. Sunumda 4. ve 5. adımın ikisi de "Serbest Liman
       Onayı" başlıklı; 5.'nin metni Bakanlar Kurulu onayını anlatıyor, başlık
       ona göre düzeltildi. Başlıklar SetupScenes · KIND_BY_TITLE'da. */
    steps: [
      {
        title: "Şirket isminin belirlenmesi",
        timing: "tipik 3 iş günü",
        who: "siz",
        line: "Şirket adı için 2-3 alternatif belirleniyor, isim uygunluğu kontrol ediliyor.",
      },
      {
        title: "Belgelerin hazırlanması",
        timing: "tipik 3 iş günü",
        who: "ortac",
        line: "İstenen belgeleri bize gönderiyorsunuz; şirket kuruluş belgeleri hazırlanıyor.",
      },
      {
        title: "Başvuru",
        timing: "belgeler gelince",
        who: "siz",
        line: "İmzalı belgeleri bize kargoluyorsunuz; başvuru Serbest Liman'a yapılıyor.",
      },
      {
        title: "Serbest Liman onayı",
        timing: "tipik 10 iş günü",
        who: "otorite",
        line: "Serbest Liman yönetimi başvuruyu değerlendirip onaylıyor; şirket tescili için Bakanlar Kurulu'na iletiliyor.",
        short: "Serbest Liman başvuruyu onaylıyor; tescil için Bakanlar Kurulu'na iletiliyor.",
      },
      {
        title: "Bakanlar Kurulu onayı ve tescil",
        timing: "tipik 14 iş günü",
        who: "otorite",
        line: "Onayın ardından şirket adresi belirleniyor ve tescil tamamlanıyor. Tescilde sermayenin yabancı ortaklara düşen payı bir KKTC bankasında bloke gösteriliyor.",
        short: "Tescil tamamlanıyor; sermayenin yabancı payı bir KKTC bankasında bloke gösteriliyor.",
      },
    ],
    included: [
      "İsim uygunluk kontrolü",
      "Şirket kuruluş belgelerinin hazırlanması",
      "Serbest Liman başvurusu ve takibi",
      "Tescil ve bloke hesap",
      "Evrak takibi ve panel erişimi",
    ],
    excluded: [
      "Stripe ve benzeri global tahsilat",
      "Yıllık faaliyet harcı",
      "Adres sözleşmesi",
      "İş kurma izni",
    ],
    /* "Kazancınızı Türkiye'ye nasıl getirirsiniz" KKTC'de basılmıyor
       (Burak: "bunda gerek yok"). Şablon boş listede bölümü atlıyor. */
    routes: [],
    /* TÜRKİYE'DE YAŞIYORSANIZ · [RESMÎ] docs/kktc-mevzuat.md · 9. Dubai'deki
       "Kazancınızı Türkiye'ye nasıl getirirsiniz" (MoneyHome · fatura / kâr
       payı / maaş) DEĞİL: o parayı çekmenin yollarını anlatıyor, bu verginin
       NEREDE doğduğunu. Kişiye özel vergi görüşü yok, genel kural ve madde.
       En büyük boşluk buydu (talep araştırması · 1. soru). */
    paraYolu: {
      title: "Türkiye'de yaşıyorsanız vergi nerede çıkıyor?",
      accent: "vergi nerede çıkıyor?",
      /* 23.09.2026 · ÇERÇEVE DEĞİŞTİ. Burak: "vergi ödeyecek olsa niye kktc
         şirket kursun". Haklı olduğu yer: kâr şirkette kalıp işe harcandıkça
         Türkiye'de vergi doğmuyor; aktif gelirde (hizmet, ticaret) dağıtılmayan
         kâr kuralı işlemiyor (GVK 75/2 + KVK 7'nin %25 pasif gelir şartı).
         Bölümün ana mesajı artık bu. Beyan yalnız kâr kişiye geçtiğinde.
         "Şirket kartıyla kişisel harcama vergisiz" iddiası YAZILMADI:
         kanunda karşılığı yok; mali müşavire soru olarak teyit listesinde. */
      lead: "Kâr şirkette kalıp şirketin işine harcandıkça ne KKTC'de ne Türkiye'de vergi doğuyor. Vergi, kâr size kişisel gelir olarak geçtiğinde çıkıyor.",
      duraklar: [
        { kim: "Müşteriniz", baslik: "KKTC dışında", vergi: "Fatura", not: "Faturayı şirketiniz kesiyor, ödeme şirket hesabına geliyor.", ton: "notr" },
        { kim: "Şirketiniz", baslik: "KKTC Serbest Liman", vergi: "%0", not: "Kurumlar ve gelir vergisi yok, KDV yok. Kâr şirkette kaldıkça ve işe harcandıkça vergi yok.", ton: "sifir" },
        { kim: "Siz", baslik: "Türkiye'de", vergi: "Beyan", not: "Yalnız kâr size kâr payı olarak geçerse beyan ediliyor. Şirketin en az yarısı sizinse ve parayı Türkiye'ye getirirseniz yarısı istisna.", ton: "beyan" },
      ],
      uyarilar: [
        { baslik: "Yalnız pasif gelirde", line: "Gelirin ağırlığı faiz, kira ya da lisans gibi pasif gelirse, dağıtılmayan kâr da ortağın geliri sayılabiliyor. Hizmet ve ticaret gelirinde bu kural işlemiyor." },
        { baslik: "Şirket Türkiye'den yönetilirse", line: "İşlerin fiilen Türkiye'de toplanıp yönetildiği bir şirket Türkiye'de kurumlar vergisi mükellefi sayılabiliyor." },
      ],
      bilgi: "Türkiye ile KKTC arasında 1989'dan beri çifte vergilendirmeyi önleme anlaşması uygulanıyor. Kişiye özel vergi görüşü vermiyoruz; durumunuzu görüşmede konuşuyoruz.",
      kaynaklar: [
        { label: "Gelir Vergisi Kanunu md. 22, 75, 86", href: "https://www.mevzuat.gov.tr/MevzuatMetin/1.4.193.pdf" },
        { label: "Kurumlar Vergisi Kanunu md. 3, 7", href: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5520.pdf" },
      ],
    },
    /* ÖDEME KANALLARI · [RESMÎ] sağlayıcıların kendi ülke listeleri,
       23.09.2026'da okundu (docs/kktc-mevzuat.md · 10). Payoneer liste
       yayımlamıyor: "belirsiz". En çok sorulan sorulardan (Stripe, PayPal). */
    odeme: {
      title: "Hangi ödeme kanalı çalışıyor?",
      accent: "ödeme kanalı çalışıyor?",
      lead: "Global ödeme sağlayıcılarının çoğu KKTC şirketini desteklemiyor. Bunu kuruluştan önce bilmeniz gerekiyor; işiniz kartla tahsilata dayanıyorsa KKTC doğru yer değil.",
      kanallar: [
        { ad: "KKTC bankası", ikon: "banka", durum: "var", not: "Kurumsal hesap, TL ve döviz. Yurt dışından gelen para Türkiye'deki aracı banka üzerinden geliyor." },
        { ad: "Stripe", brand: "stripe" as BrandKey, durum: "yok", not: "Ülke listesinde KKTC yok." },
        { ad: "PayPal", brand: "paypal" as BrandKey, durum: "yok", not: "Ülke listesinde KKTC yok." },
        { ad: "Wise", brand: "wise" as BrandKey, durum: "yok", not: "Desteklenen ülkeler arasında KKTC yok." },
        { ad: "Payoneer", brand: "payoneer" as BrandKey, durum: "belirsiz", not: "Ülke listesi yayımlamıyor; başvuruda netleşiyor." },
        { ad: "Shopify Payments", ikon: "sepet", durum: "yok", not: "Desteklenen ülkeler arasında KKTC yok." },
        { ad: "Amazon", ikon: "kutu", durum: "yok", not: "Satıcı kaydı ülke listesinde KKTC yok." },
        { ad: "Etsy", ikon: "magaza", durum: "yok", not: "Satıcı ülke listesinde KKTC yok." },
      ],
      not: "Listelerde geçen \"Cyprus\" güneydeki Kıbrıs Cumhuriyeti; KKTC şirketi onun yerine geçmiyor.",
    },
    /* SERMAYE · [MÜŞTERİ] 25.000 € (23.09.2026, Burak firmadan öğrendi:
       "bloke miktarı 25k imiş, 50 değil"). Önceki tur resmî sliman
       sayfasındaki 50.000 €'yu kullanmıştı; RKMMD 2024 prosedürü 25.000
       EUR diyor (docs/kktc-mevzuat.md · 1). Tutarın hangi ortaklık
       yapısında geçerli olduğu teyit listesinde; o yüzden bloke adımında
       ortaklık yapısına göre rakam verilmiyor. */
    sermaye: {
      title: "Sermaye bloke kalıyor mu, geri alınıyor mu?",
      accent: "geri alınıyor mu?",
      lead: "Sermaye şirketinizin parası; kimseye ödenmiyor. Yalnız tescile kadar bankada bloke görünüyor, sonra şirket hesabında serbest kalıyor.",
      tutar: "25.000 €",
      tutarNot: "Bankada bloke edilen sermaye. Karşılığı TL de olabiliyor.",
      adimlar: [
        { baslik: "Yatırılıyor", line: "Sermaye bir KKTC bankasındaki şirket hesabına yatırılıyor." },
        { baslik: "Bloke görünüyor", line: "Banka, yatırılan sermaye için bloke yazısı veriyor." },
        { baslik: "Tescil", line: "Bloke yazısı tescil dosyasına giriyor, şirket tescil ediliyor." },
        { baslik: "Serbest", line: "Mukayyitlik onaylı belgeyle bankaya başvuruluyor, bloke kalkıyor; para şirket hesabında kullanılabiliyor." },
      ],
      olgular: [
        { etiket: "En az ortak", deger: "2" },
        { etiket: "Başvuru harcı", deger: "200 USD" },
        { etiket: "Tescil harcı", deger: "2.500 USD" },
      ],
      kaynak: { label: "Kaynak: KKTC Serbest Liman ve Bölge Müdürlüğü", href: "https://sliman.gov.ct.tr/SLBM-%C5%9E%C4%B0RKET-HAK/%C5%9E%C4%B0RKET-M%C3%9CRACATI-VE-TESC%C4%B0L%C4%B0" },
    },
    faq: [
      {
        /* [MÜŞTERİ] + [RESMÎ] sliman vergi sayfası. */
        q: "Gerçekten hiç vergi ödemiyor muyum?",
        a: "KKTC dışındaki müşteriye yaptığınız işte kurumlar ve gelir vergisi yok, şirket KDV mükellefi değil. KKTC içine satış yaparsanız gümrük ve KDV ödeniyor. Yıllık faaliyet harcı ise vergi değil, sabit bir bedel.",
      },
      {
        /* [MÜŞTERİ] "KKTC'ye gelmeden şirket kurma". */
        q: "KKTC'ye gitmem gerekiyor mu?",
        a: "Hayır. İmzalı belgeleri kargoyla gönderiyorsunuz; başvuru, onay ve tescil sizin yerinize yürüyor.",
      },
      {
        /* [MÜŞTERİ] sunum slayt 3 · Ofis kullanımı ve personel durumu. */
        q: "Ofis kiralamam ve personel çalıştırmam gerekiyor mu?",
        a: "Gerekmiyor. Muhasebe ofisiyle adres sözleşmesi yapılırsa Serbest Liman'ın belirlediği KKTC vatandaşı temsilci atanıyor ve ek personel gerekmiyor. Kendi ofisinizi kiralarsanız en az bir KKTC vatandaşı çalıştırmanız gerekiyor.",
      },
      {
        /* [RESMÎ] sliman.gov.ct.tr şirket müracaatı; RKMMD SSS 7. */
        q: "Sermaye geri alınıyor mu, bloke kalıyor mu?",
        a: "Sermaye şirketinizin parası. Yabancı ortakların payı kadar tutar tescile kadar bir KKTC bankasında bloke görünüyor; tescilden sonra Mukayyitlik onaylı belgeyle bloke kalkıyor ve para şirket hesabında kullanılabiliyor.",
      },
      {
        /* [RESMÎ] stripe.com/global: listede Cyprus (güney) var, KKTC yok. */
        q: "Stripe kullanabilir miyim?",
        a: "Hayır. Stripe'ın ülke listesinde KKTC yok; PayPal ve Wise'ta da yok. Kartla tahsilat ana ihtiyacınızsa Dubai veya İngiltere'ye bakmak gerekiyor; bunu baştan söylüyoruz.",
      },
      {
        /* [RESMÎ] 63/2006 md. 11-13. */
        q: "Oturum alabilir miyim?",
        a: "Şirket kurmak tek başına oturum vermiyor. KKTC'de oturup şirketi yönetecekseniz Çalışma Bakanlığı'ndan iş kurma izni almanız gerekiyor.",
      },
      {
        /* [RESMÎ] sliman.gov.ct.tr: en az 2, en çok 50 hissedar. */
        q: "Tek başıma kurabilir miyim?",
        a: "Hayır. Serbest Liman şirketi en az iki ortakla kuruluyor; ortakların ve direktörlerin uyruğu kısıtlı değil.",
      },
      {
        /* [RESMÎ] GVK md. 75, 86, 22/4 · Türkiye–KKTC anlaşması. */
        q: "Kâr payı alırsam Türkiye'de vergi öder miyim?",
        a: "Türkiye'de yaşıyorsanız kâr payını yıllık beyannamenizle beyan ediyorsunuz. Şirketin en az yarısı sizinse ve parayı beyanname tarihine kadar Türkiye'ye getirirseniz kâr payının yarısı istisna. Kişiye özel vergi görüşü vermiyoruz; durumunuzu görüşmede konuşuyoruz.",
      },
      {
        /* [RESMÎ] KKTC Posta Dairesi: dünya bağlantısı T.C. Posta üzerinden.
           Platformların adresi nasıl gördüğü [TEYİT]; ifade bu yüzden
           "görebiliyor". */
        q: "\"Mersin 10, Turkey\" adresi sorun çıkarır mı?",
        a: "KKTC'nin uluslararası posta bağlantısı Türkiye üzerinden kurulduğu için adreslerde \"Mersin 10, Turkey\" yazılıyor. Bazı yurt dışı platformlar bu adresi Türkiye olarak görebiliyor; hangi platformu kullanacağınızı kuruluştan önce konuşuyoruz.",
      },
      {
        /* [RESMÎ] Serbest Liman ve Bölge Yasası 26/1983; beyan GVK. */
        q: "Bu yasal mı, paravan şirket sayılır mı?",
        a: "Muafiyet Serbest Liman ve Bölge Yasası'ndan geliyor, yasal. Şartı KKTC dışına yönelik gerçek faaliyet ve düzgün tutulan kayıtlar; kazancın Türkiye tarafındaki beyanı ise sizin yükümlülüğünüz.",
      },
      {
        /* [RESMÎ] Fasıl 113 md. 203, 261-263; RKMMD. */
        q: "Şirket nasıl kapatılır?",
        a: "Gönüllü tasfiyeyle. Önce tüm bilanço ve yıllık raporların Vergi Dairesi'ne ve Mukayyitliğe verilmiş olması gerekiyor; tasfiye kararı Resmî Gazete'de ilan ediliyor.",
      },
    ],
  },
};

export const WHO_LABEL: Record<Step["who"], string> = {
  siz: "Sizde",
  ortac: "Ortac'ta",
  otorite: "Otoritede",
  banka: "Bankada",
};
