import type { Faq, CountryContent } from "@/lib/countryContent";

/* ============================================================================
   DUBAİ · VİZE & OTURUM — /dubai/oturum-vize sayfasının metni
   Sayfa: app/dubai/oturum-vize/page.tsx · Biçim: css/svc-vize.css (.svz-)

   22.09.2026 · İLK YAZIM. Burak: "vize ve oturum kısmına geçebiliriz … bu da
   önemli bir kısım … şirket kuruluşunun içine dahil olan bir şey. Ekstra 2-3
   vize çıkarmak isteyince vize başına bir fiyat oluyor ama orada da bir kota
   var, belli bir yerden sonra veremiyorlar, onu özel görüşmek lazım … buraya
   fiyat koyma. Konuyu anlat, derdini anlat, nasıl olduğunu anlat."

   FİYAT YOK. Ne vize başına tutar ne "ayrı ücret" cümlesi. Ek vizenin kişi
   başı planlandığı ve kotanın üstünün görüşmede netleştiği yazıyor, rakam
   değil (lib/pricing.ts · perVisa bu sayfaya girmiyor).

   KAYNAK DÜZENİ — her cümlenin yanında:
     [ONAYLI]  sitede zaten canlı, müşterinin onayladığı cümle
               (countryContent.ts · dubai).
     [RESMÎ]   BAE resmî portalı u.ae · "General provisions for the residence
               visa" (okundu 22.09.2026). Yalnız sayfanın kendi söylediği.
     [MÜŞTERİ] Burak'ın bu turdaki mesajı (kota, ek vize, fiyatın yazılmaması).
     [TEYİT]   genel bilgi, müşterinin okuyup onaylaması gerekiyor.
               SWAP:VIZE_TEYIT. Toplu liste: docs/teyit-listesi.md.

   BİLEREK ALINMAYANLAR: vize başına süre ("10-20 iş günü" services.ts'te
   duruyor ama kesin süre taahhüdü vermiyoruz · STANCE_LIMITS), ortak vizesinin
   serbest bölgeye göre kaç yıllık olduğu, aile vizesi maaş eşiği (u.ae
   sayfasında yok, ikincil kaynaklarda rakam değişiyor), altın vize şartları.
   ========================================================================= */

export type VizeIkon =
  | "randevu"
  | "bir-kez"
  | "ortak"
  | "calisan"
  | "aile"
  | "paket"
  | "plan"
  | "ek"
  | "giris"
  | "saglik"
  | "biyometri"
  | "izin"
  | "kimlik"
  | "sure"
  | "yurtdisi"
  | "bagli"
  | "iptal";

export const VIZE_DUBAI = {
  /* ------------------------------------------------------------------ hero */
  hero: {
    crumb: "Dubai · Vize & Oturum",
    title: "Dubai'de oturum vizesi ve Emirates ID.",
    accent: "oturum vizesi",
    /* [ONAYLI] "Ortak ve çalışan vizesi, Emirates ID ve sağlık kontrolü dahil
       süreç" (dubai · intro kartı) ve "bir kez BAE'de bulunmanız gerekiyor"
       (dubai · steps). */
    /* 23.09.2026 · [MÜŞTERİ] Burak: "tüm Dubai vizesini yönetiyorlar."
       Aile vizesi de Ortac'ta; eskiden "kuruluş paketinin dışında" diye
       ayrı tutuluyordu. */
    lead: "Ortak, çalışan ve aile vizesi: başvuruların ve randevuların tamamını biz yürütüyoruz. Sağlık kontrolü ve biyometri için bir kez BAE'de bulunmanız yeterli.",
    cta: { label: "Kuruluşu başlatın", href: "/basla" },
    trust: [
      /* [TEYİT] randevu takibi Ortac'ta */
      { icon: "randevu" as VizeIkon, line: "Başvuru ve randevular bizden." },
      /* [ONAYLI] dubai · steps */
      { icon: "bir-kez" as VizeIkon, line: "BAE'de bir kez bulunmanız yeterli." },
    ],
  },

  /* ------------------------------------------------------ hero kartı · sahneler */
  scenes: [
    { key: "giris", word: "Giriş", meta: "Giriş izni başvurusunu biz yapıyoruz." },
    { key: "saglik", word: "Sağlık", meta: "Sağlık kontrolü ve biyometri, BAE'de bir kez." },
    { key: "kimlik", word: "Kimlik", meta: "Oturum izni ve Emirates ID tek başvuruda." },
    { key: "oturum", word: "Oturum", meta: "Türüne göre 1-3 yıl geçerli, süre dolmadan yenileniyor." },
  ],
  sceneFoot: "Dört adım, kuruluşun içinde. Ayrıntısı aşağıda.",

  /* ------------------------------------------------------- 1 · VİZE TÜRLERİ
     Üç tür, her birinin kimin için olduğu. 23.09.2026'ya kadar kartın
     etiketi "Sponsor: şirketiniz / siz" idi; Burak: "Sponsor: yazıp ne
     yazmaya çalıştın anlamadım." Sponsorluk hukuki bir ayrıntı, ziyaretçinin
     sorusu "bu vize kimin için". Üçünü de Ortac yürütüyor [MÜŞTERİ]. Aile
     üyesinin oturumunun sponsorunkini aşamaması [RESMÎ]. */
  types: {
    id: "turler",
    heading: "Kimler vize alabiliyor.",
    accent: "vize alabiliyor.",
    lead: "Dubai şirketiniz üç tür oturumun kapısını açıyor ve üçünün de başvurusunu biz yürütüyoruz. Hangisine, kaç kişi için ihtiyacınız olduğunu ilk görüşmede konuşuyoruz.",
    items: [
      {
        icon: "ortak" as VizeIkon,
        title: "Ortak vizesi",
        kim: "Şirket ortakları için",
        line: "Şirketin ortağı olarak aldığınız oturum. Dubai'de yaşamak, banka hesabını yönetmek ve resmî işlemleri kendi adınıza yürütmek için temel belge.",
      },
      {
        icon: "calisan" as VizeIkon,
        title: "Çalışan vizesi",
        kim: "Ekibiniz için",
        line: "Şirketinizin istihdam ettiği kişiler için. Her çalışan vizesi şirketin vize kotasından düşüyor; iş sözleşmesi ve çalışma izniyle birlikte yürüyor.",
      },
      {
        icon: "aile" as VizeIkon,
        title: "Aile vizesi",
        kim: "Eşiniz ve çocuklarınız için",
        line: "Oturumunuz çıktıktan sonra eşiniz ve çocuklarınızın başvurusunu da biz yürütüyoruz. Aile üyesinin oturumu sizinkinden uzun olamıyor.",
      },
    ],
  },

  /* --------------------------------------------------------- 2 · VİZE KOTASI
     Burak'ın asıl derdi: "ekstra vize … vize başına bir fiyat … ama bir kota
     var, belli bir yerden sonra veremiyorlar, özel görüşmeler lazım".
     [ONAYLI] "Vize kotası aldığınız lisans paketine bağlı" ve "sonradan
     değiştirmek yeni kuruluş demek" (dubai · yapı seçimi). Ofis tipinin kotayı
     etkilemesi [TEYİT] (serbest bölgelerin genel uygulaması, SWAP:VIZE_TEYIT).
     Ek vizenin kişi başı planlanması [MÜŞTERİ]; tutar YOK. */
  quota: {
    id: "kota",
    heading: "Vize kotası.",
    accent: "kotası.",
    lead: "Bir şirketin kaç kişiye vize alabileceği sınırsız değil. Kotayı kuruluşta seçilen paket belirliyor; o yüzden vize planı kuruluşla birlikte yapılıyor, sonra değil.",
    points: [
      {
        icon: "paket" as VizeIkon,
        title: "Kotayı paket belirliyor",
        line: "Vize kotası lisans paketine ve ofis tipine bağlı. Paylaşımlı masa küçük bir kota veriyor, fiziki ofis daha geniş.",
      },
      {
        icon: "plan" as VizeIkon,
        title: "Kuruluşta planlanıyor",
        line: "Kaç kişiye vize gerektiğini ilk görüşmede konuşuyor, paketi buna göre seçiyoruz. Sonradan kotayı büyütmek paket ya da ofis değişikliği demek.",
      },
      {
        icon: "ek" as VizeIkon,
        title: "Ek vize kişi başı",
        line: "Paketteki vizelerin üstündeki her kişi ayrıca planlanıyor. Kota sınırına yaklaşıldığında ne yapılabileceğini sizinle birebir netleştiriyoruz.",
      },
    ],
    /* Sahnedeki etiketler. Kutu sayısı gösterim: bir paketin gerçek kotası
       değil (6 dolu/boş + 2 ek), bu yüzden rakam yazılmıyor. */
    scene: { title: "Paketin vize kotası", extra: "Ek vize · görüşmede" },
  },

  /* ----------------------------------------------------------------- süreç
     Bankayla aynı beş kart. SÜRE YOK (STANCE_LIMITS). Sıra genel BAE
     uygulaması [TEYİT]; 18 yaş üstü sağlık kontrolü ve oturum + Emirates ID'nin
     tek başvuruda yürümesi [RESMÎ]; biyometrinin vekâletle yürümemesi
     [ONAYLI]. */
  steps: {
    id: "surec",
    heading: "Başvuru nasıl yürüyor.",
    accent: "nasıl yürüyor.",
    lead: "Adımlara süre yazmıyoruz: randevu ve onay takvimi otoritelerde.",
    exit: { href: "/dubai", label: "Şirket kuruluşu: vize bu sürecin bir adımı" },
    items: [
      { icon: "giris" as VizeIkon, title: "Giriş izni", line: "Giriş izni başvurusunu biz yapıyoruz. BAE dışındaysanız bu izinle giriyorsunuz; içindeyseniz statü değişikliği yapılıyor." },
      { icon: "saglik" as VizeIkon, title: "Sağlık kontrolü", line: "18 yaş üstü herkes için zorunlu. Randevuyu biz alıyoruz; sonuç doğrudan başvuruya bağlanıyor." },
      { icon: "biyometri" as VizeIkon, title: "Biyometri", line: "Emirates ID için parmak izi ve fotoğraf alınıyor. Bu adım vekâletle yürümüyor, BAE'de olmanız gerekiyor." },
      { icon: "izin" as VizeIkon, title: "Oturum izni", line: "Oturum izni ve Emirates ID tek başvuruda, birlikte düzenleniyor." },
      { icon: "kimlik" as VizeIkon, title: "Emirates ID", line: "Kimlik kartınız teslim ediliyor. Banka dahil BAE'deki resmî işlemlerin çoğunda isteniyor." },
    ],
  },

  /* ------------------------------------------------------ 4 · OTURUMU KORUMAK
     Dördü de [RESMÎ] u.ae · General provisions for the residence visa:
     "1, 2 or 3 years on a sponsored visa" · "outside the UAE for more than
     180 days continuously … nullified automatically" · "dependent's residence
     visa will not exceed that of the sponsor" · "grace periods that reach up
     to 6 months (according to resident category)". Ek süre için rakam
     yazılmadı: kategoriye göre değişiyor, "6 aya kadar" en üst sınır. */
  keep: {
    id: "koruma",
    heading: "Oturumu korumak.",
    accent: "korumak.",
    lead: "Oturum bir kez alınıp unutulan bir belge değil. Düşmemesi için bilmeniz gereken dört kural:",
    items: [
      { icon: "sure" as VizeIkon, title: "Süresi var", line: "Oturum türüne göre 1, 2 ya da 3 yıl geçerli; süre dolmadan yenileniyor." },
      { icon: "yurtdisi" as VizeIkon, title: "180 gün kuralı", line: "BAE dışında kesintisiz 180 günden uzun kalırsanız oturum kendiliğinden düşüyor." },
      { icon: "bagli" as VizeIkon, title: "Aile size bağlı", line: "Aile üyelerinin oturumu sizinkinden uzun olamıyor; siz yenilediğinizde onlar da yenileniyor." },
      { icon: "iptal" as VizeIkon, title: "İptalden sonra ek süre", line: "Oturum iptal edildiğinde ya da süresi dolduğunda ülkede kalmak için bir ek süre tanınıyor; uzunluğu oturum türüne göre değişiyor." },
    ],
    source: { label: "Kaynak: BAE resmî portalı u.ae", href: "https://u.ae/en/information-and-services/visa-and-emirates-id/Visa-information/general-provisions-for-the-residence-visa" },
  },

  /* --------------------------------------------------------------- belgeler
     Standart belge bileşeni (CountryDocs). Pasaport satırı [ONAYLI]
     (bankaDubai.ts · docs, aynı kalem). Kalanlar [TEYİT] — SWAP:VIZE_BELGE;
     vize türüne ve serbest bölgeye göre değişiyor. */
  docs: {
    heading: "Başvuru için nelere ihtiyacınız var?",
    accent: "nelere ihtiyacınız var?",
    lead: "Sizde olanı işaretleyin; dosyanın geri kalanını biz hazırlıyoruz.",
    data: {
      groups: [
        {
          title: "Sizden istediklerimiz",
          hint: "Pasaportu kuruluşta zaten verdiniz; vize dosyasında yeniden kullanılıyor.",
          items: [
            "Pasaportun renkli taraması (en az 6 ay geçerli)",
            /* 24.09.2026 · başlık (ayrıntı) biçimine çevrildi; bilgi aynı.
               Eski yazımda bileşen "Beyaz fonlu" ve "Aile vizesi için"
               parçalarını başlık yapıyordu (CountryDocs · splitDoc). */
            "Vesikalık fotoğraf (beyaz fonlu, yeni çekilmiş)",
            "Evlilik ve doğum belgeleri (aile vizesi için, onaylı tercümeleriyle)",
          ],
        },
        {
          title: "Süreç içinde ortaya çıkanlar",
          hint: "Bunları biz hazırlıyor ve takip ediyoruz; sizden yalnızca onay ve randevuya katılım isteniyor.",
          items: [
            "Giriş izni",
            "Sağlık kontrolü raporu",
            "Oturum izni ve Emirates ID başvurusu",
            "Çalışan vizesi için iş sözleşmesi",
          ],
        },
      ],
      note: "Liste vize türüne ve serbest bölgeye göre değişiyor; tam listeyi başvurudan önce paylaşıyoruz.",
    } as CountryContent["docs"],
  },

  /* -------------------------------------------------------------------- SSS
     İkincisi [ONAYLI] (dubai · faq ile aynı olgu). Birincisi [RESMÎ] 180 gün.
     Kalanlar [TEYİT] — SWAP:VIZE_SSS. Ücret sorusu YOK (fiyat bu sayfada
     yazılmıyor). */
  faq: {
    id: "sss",
    heading: "Sık sorulanlar.",
    accent: "sorulanlar.",
    items: [
      {
        q: "Vize için Dubai'de yaşamam gerekiyor mu?",
        a: "Hayır. Ama oturumun düşmemesi için BAE dışında kesintisiz 180 günden uzun kalmamanız gerekiyor.",
      },
      {
        q: "Kaç kez BAE'ye gelmem gerekiyor?",
        a: "Sağlık kontrolü ve biyometri için bir kez BAE'de bulunmanız gerekiyor; bu adımlar vekâletle yürümüyor. Banka imzasını da aynı ziyarette planlıyoruz.",
      },
      {
        q: "Şirketim kaç kişiye vize alabilir?",
        a: "Lisans paketine ve ofis tipine bağlı. Kaç kişiye ihtiyacınız olduğunu kuruluştan önce konuşuyor, paketi buna göre seçiyoruz; kotanın üstündeki durumlar için sizinle birebir planlama yapıyoruz.",
      },
      {
        q: "Ailemi de getirebilir miyim?",
        a: "Evet. Oturumunuz çıktıktan sonra eşiniz ve çocuklarınız için aile vizesi başvurusu yapılabiliyor. Şartlar kişiye göre değiştiği için görüşmede birlikte bakıyoruz.",
      },
      {
        q: "Şirket kurmak altın vize verir mi?",
        a: "Doğrudan vermiyor. Altın vize (uzun süreli oturum) ayrı bir başvuru ve kendi şartları var; durumunuza uyup uymadığını görüşmede konuşuyoruz.",
      },
      {
        q: "Vize garanti mi?",
        a: "Hayır. Kararı BAE makamları veriyor. Biz dosyayı eksiksiz hazırlıyor, randevuları alıyor ve süreci baştan sona takip ediyoruz.",
      },
    ] as Faq[],
  },

  /* --------------------------------------------------------------- kapanış */
  closing: {
    title: "Dubai'deki oturumunuzu birlikte planlayalım.",
    accent: "birlikte planlayalım.",
    cta: { label: "Kuruluşu başlatın", href: "/basla" },
  },
};
