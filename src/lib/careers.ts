/* ============================================================================
   KARİYER — açık pozisyonların ve başvuru formunun tek defteri.
   Sayfa: src/app/kariyer/page.tsx + src/app/kariyer/CareerSections.tsx
   Biçim: src/app/css/kurumsal.css

   ------------------------------------------------- BU TURDA NE DEĞİŞTİ
   Önceki hâlde `OPENINGS` boştu ve sayfa "şu an açık pozisyonumuz yok"
   diyordu. Site genelinde yer tutucu politikası değişti: sayfalar tasarımın
   dolu hâliyle değerlendirilebilsin diye GERÇEKTEN DOLUYMUŞ GİBİ dolduruluyor,
   ayrımı taşıyan tek şey kayıt başına küçük bir "Örnek" rozeti kalıyor
   (sitedeki yerleşik karşılıkları: .kyn-seed-tag ve .bh-seed).

   Bu yüzden aşağıda dört ilan var ve dördü de `seed: true`.

   ------------------------------------------------------- KORUNAN SINIR
   Yer tutucu ilan UYDURMA TAAHHÜT TAŞIMIYOR. Aşağıdaki dört ilanın hiçbirinde
   şunlar yok ve şema da yazılmalarına izin vermiyor:

     · maaş / ücret aralığı
     · yan hak (sağlık sigortası, uzaktan çalışma hakkı, izin günü)
     · ekip büyüklüğü ("X kişilik bir ekibiz")
     · işe alım süresi ya da adım sayısı taahhüdü
     · ofis olanağı

   Beşi de iş hukuku açısından beklenti yaratır ve hiçbiri doğrulanmadı. Bir
   iş ilanında bunları uydurmak, bir blog yazısında tarih uydurmaktan farklı:
   karşılığı bir BAŞVURU ve bir insanın planı.

   Yazılan her şey firmanın GERÇEKTEN yaptığı işten türedi: hizmet hatları
   src/lib/services.ts'te (şirket kuruluşu, muhasebe ve vergi, banka ve ödeme,
   vize ve oturum, uyum/AML), ofislerin bulunduğu ülkeler src/lib/offices.ts'te.
   Dört ilan bu hatlardan dördünü karşılıyor ve üç ülkeye dağılıyor. Firmanın
   yürütmediği bir iş için pozisyon yazılmadı.

   --------------------------------------------- ŞEMANIN İKİ KİLİDİ (DURUYOR)
   1. `applyHref` ZORUNLU. Başvurunun gideceği gerçek bir yer olmadan ilan
      yazılamıyor. Bugün dördü de aynı sayfadaki forma iniyor (APPLY_ANCHOR);
      bu gerçek bir çapa, JavaScript kapalıyken de çalışıyor.
   2. `duties` ve `requirements` zorunlu dizi. İlanı yazan kişi işi tarif
      etmeye mecbur.

   ------------------------------------------------------ BİLEREK OLMAYANLAR
   Şemada MAAŞ ARALIĞI, YAN HAKLAR, EKİP BÜYÜKLÜĞÜ ve İŞE ALIM ADIMLARI alanı
   yok. Alan açmak, ilanı yazan kişiyi o alanı doldurmaya davet etmek olurdu.
   İhtiyaç doğduğunda doğrulanmış değerle birlikte eklenirler.

   SWAP:CAREER_OPENINGS — gerçek ilan geldiğinde yapılacak tek şey: kaydı
   yazıp `seed` alanını düşürmek. Rozet kendiliğinden kalkıyor.
   ========================================================================= */

import { COUNTRY_NAME, type CountrySlug } from "@/lib/brand";

/** İstihdam tipi. Etiketler ekranda aynen çıkıyor. */
export type OpeningType = "tam-zamanli" | "yari-zamanli" | "sozlesmeli" | "staj";

export const OPENING_TYPE_LABEL: Record<OpeningType, string> = {
  "tam-zamanli": "Tam zamanlı",
  "yari-zamanli": "Yarı zamanlı",
  sozlesmeli: "Sözleşmeli",
  staj: "Staj",
};

/** Nerede çalışılacağı. Ülkeler sitenin tek kaynağından; "uzaktan" ayrı bir
 *  seçenek çünkü bir ofise bağlı olmayan pozisyon ülke adı taşımamalı.
 *
 *  Aşağıdaki dört ilanın hiçbiri "uzaktan" DEĞİL ve bu bilinçli: uzaktan
 *  çalışma bir çalışma biçiminden çok bir YAN HAK ve firmada karşılığı
 *  doğrulanmadı. Seçenek şemada duruyor, bugün kullanılmıyor. */
export type OpeningPlace = CountrySlug | "uzaktan";

export const placeLabel = (p: OpeningPlace): string =>
  p === "uzaktan" ? "Uzaktan" : COUNTRY_NAME[p];

export type Opening = {
  /** adres parçası ve React anahtarı */
  id: string;
  /** pozisyonun adı — "Kıdemli muhasebeci" gibi, sıfat yığını değil */
  title: string;
  /** hangi ekip / hangi iş kolu — services.ts'teki hatların adları */
  team: string;
  place: OpeningPlace;
  type: OpeningType;
  /** iki cümleyi geçmeyen iş tanımı */
  summary: string;
  /** en az bir madde — bkz. dosya başı, ikinci kilit */
  duties: string[];
  requirements: string[];
  /** YYYY-MM-DD */
  postedAt: string;
  /**
   * ZORUNLU — başvurunun gideceği gerçek yer (mailto:, bir sayfa adresi ya da
   * aynı sayfadaki forma inen çapa). Bu alan olmadan ilan yazılamıyor;
   * "başvur" düğmesi hiçbir zaman boşa düşmüyor.
   */
  applyHref: string;
  /**
   * Tasarım için hazırlanmış örnek kayıt mı? Ekranda tek karşılığı var:
   * künye satırındaki küçük "Örnek" rozeti. Gerçek ilan geldiğinde alan
   * yazılmıyor ve rozet kendiliğinden düşüyor.
   */
  seed?: boolean;
};

/** Başvurunun indiği çapa. İlanların `applyHref`i ile sayfadaki bölüm id'si
 *  tek yerden geliyor ki biri değişince öteki sessizce boşa düşmesin. */
export const APPLY_ANCHOR_ID = "basvuru";
export const APPLY_ANCHOR = `#${APPLY_ANCHOR_ID}`;

/** Yer tutucu işareti. Tek yerde duruyor çünkü iki yüzeyde birden basılıyor
 *  (ilan kartı ve formdaki pozisyon kutucuğu) ve ikisinin aynı şeyi söylemesi
 *  gerekiyor. Sitedeki yerleşik dil: amber, tek kelime, rozet boyunda. */
export const SEED_BADGE = "Örnek";

/* SWAP:CAREER_OPENINGS — bkz. dosya başı.
   Diziliş burada değil sortedOpenings()'te: liste tarihe göre sıralanıyor. */
export const OPENINGS: Opening[] = [
  {
    id: "muhasebe-dubai",
    title: "Kıdemli muhasebeci",
    team: "Muhasebe ve vergi",
    place: "dubai",
    type: "tam-zamanli",
    summary:
      "Dubai portföyünün aylık defter kaydını, KDV ve kurumlar vergisi beyanlarını yürütecek bir muhasebeci arıyoruz. İş, kuruluşu tamamlanmış şirketlerin dönemsel yükümlülüklerini süresinde kapatmak.",
    duties: [
      "Aylık defter tutma ve dönem kapanışlarının hazırlanması",
      "KDV beyanlarının hazırlanması ve süresinde verilmesi",
      "Kurumlar vergisi beyanı ve yıllık mali tabloların çıkarılması",
      "Müşteri panelinde belge akışının takibi, eksik evrakın istenmesi",
    ],
    requirements: [
      "Muhasebe, işletme veya maliye lisans mezuniyeti",
      "BAE KDV ve kurumlar vergisi mevzuatında çalışma deneyimi",
      "Türkçe ve İngilizce yazılı yazışma",
      "Muhasebe yazılımlarıyla düzenli çalışma alışkanlığı",
    ],
    postedAt: "2026-07-21",
    applyHref: APPLY_ANCHOR,
    seed: true,
  },
  {
    id: "uyum-ingiltere",
    title: "Uyum ve AML uzmanı",
    team: "Uyum",
    place: "ingiltere",
    type: "tam-zamanli",
    summary:
      "İngiltere'de kurulan şirketlerin AML yükümlülüklerini, gerçek fayda sahibi kayıtlarını ve beyan takvimini yürütecek bir uyum uzmanı arıyoruz.",
    duties: [
      "AML politika ve prosedür dosyalarının hazırlanması ve güncel tutulması",
      "Gerçek fayda sahibi (PSC) kayıtlarının kurulması ve izlenmesi",
      "Müşteri dosyalarında kimlik ve fon kaynağı doğrulaması",
      "Dönemsel bildirim takviminin izlenmesi",
    ],
    requirements: [
      "AML ve KYC süreçlerinde çalışma deneyimi",
      "Companies House işlemlerine aşinalık",
      "Dosya ve kayıt disiplini",
      "İngilizce (yazılı ve sözlü)",
    ],
    postedAt: "2026-07-16",
    applyHref: APPLY_ANCHOR,
    seed: true,
  },
  {
    id: "kurulus-kktc",
    title: "Şirket kuruluş uzmanı",
    team: "Şirket kuruluşu",
    place: "kktc",
    type: "tam-zamanli",
    summary:
      "KKTC'de isim onayından tescile kadar kuruluş dosyasını uçtan uca yürütecek bir uzman arıyoruz. Dosyanın hangi adımda takıldığını bilen kişi bu iş için doğru kişi.",
    duties: [
      "İsim onayı ve ön başvuru dosyasının hazırlanması",
      "Yerel ticaret tescili adımlarının yürütülmesi",
      "Ana sözleşme ve kuruluş evrakının hazırlanıp teslim edilmesi",
      "Resmî kurum yazışmalarının ve evrak eksiklerinin takibi",
    ],
    requirements: [
      "Yerel şirket tescili süreçlerinde deneyim",
      "Resmî kurum yazışmasını tek başına yürütebilmek",
      "Evrak takibinde titizlik",
      "Türkçe ve İngilizce",
    ],
    postedAt: "2026-07-09",
    applyHref: APPLY_ANCHOR,
    seed: true,
  },
  {
    id: "vize-dubai",
    title: "Vize ve oturum işlemleri asistanı",
    team: "Vize ve oturum",
    place: "dubai",
    type: "yari-zamanli",
    summary:
      "Ortak ve çalışan vizesi başvurularında randevu, evrak ve kimlik kartı adımlarını takip edecek bir asistan arıyoruz.",
    duties: [
      "Vize kotası ve giriş izni başvurularının dosyalanması",
      "Sağlık kontrolü ve biyometri randevularının planlanması",
      "Kimlik kartı işlemlerinin adım adım takibi",
      "Başvurunun hangi adımda olduğunun yazılı olarak bildirilmesi",
    ],
    requirements: [
      "BAE vize ve oturum işlemlerine aşinalık",
      "Randevu ve süre takibinde düzen",
      "Resmî portallarda başvuru girme deneyimi",
      "Türkçe ve İngilizce",
    ],
    postedAt: "2026-07-02",
    applyHref: APPLY_ANCHOR,
    seed: true,
  },
];

/** Yeniden eskiye. Liste boşken de çalışıyor. */
export function sortedOpenings(): Opening[] {
  return [...OPENINGS].sort((a, b) => b.postedAt.localeCompare(a.postedAt));
}

/* ------------------------------------------------------------- BOŞ DURUM
   Bugün ekranda GÖRÜNMÜYOR (liste dolu) ama duruyor: ilanlar kaldırıldığında
   sayfanın boş bir <ul> basmaması için. Metin veri dosyasında, sayfada değil —
   aynı kalıp lib/about.ts ve lib/press.ts'te. */
export const CAREERS_EMPTY = {
  title: "Şu an açık pozisyonumuz yok.",
  line: "İlan yayımlamadığımız dönemde bu sayfa boş duruyor; doldurmak için olmayan bir pozisyon yazmıyoruz. Yine de başvurunuzu bırakabilirsiniz: bir pozisyon açıldığında elimizdeki başvurulara ilk biz bakıyoruz.",
};

/* ------------------------------------------------------------ BAŞVURU FORMU
   Formun bütün METNİ burada: onaylanması gereken şey biçim değil, cümleler.

   FORM GÖNDERMİYOR ve sahte bir "başvurunuz alındı" ekranı BİLEREK yazılmadı.
   Aynı durum /iletisim formunda da var, çözümü de aynı: buton `disabled`,
   altında nedeni söyleyen bir satır. Kariyer sayfasında bedeli daha yüksek —
   sahte bir onay, gerçekten başvuran birinin özgeçmişini ve planını sessizce
   çöpe atmak demek.

   SWAP:CAREER_FORM — gönderim ucu bağlandığında değişecek yerler: butonun
   `disabled`ı, onSubmit'in gövdesi ve aşağıdaki `note`. Yerleşimde hiçbir şey
   oynamıyor.
   SWAP:CAREER_UPLOAD — dosya yükleme ucu ayrı bir iş; bağlanana kadar alan da
   devre dışı ve nedeni yazıyor. Çalışmayan bir "CV yükle" düğmesi
   bırakmıyoruz. */
export const APPLICATION_FORM = {
  title: "Başvuru formu",
  lead: "Pozisyonu işaretleyin, size nasıl döneceğimizi bırakın. Açılır menü yok: seçeneklerin hepsi ekranda duruyor.",

  /** Belirli bir ilana değil, genel olarak başvurmak isteyen için. Kutucuk
   *  listesinin sonunda duruyor; değeri hiçbir ilanın id'siyle çakışmıyor. */
  openValue: "acik-basvuru",
  openLabel: "Açık başvuru",
  openMeta: "Belirli bir ilan için değil",

  /** Dosya alanının kapalı olma nedeni — alanın hemen altında. */
  fileNote:
    "Dosya yükleme henüz bağlı değil: yüklenen dosyayı alacak bir uç nokta yok, o yüzden alan devre dışı. Çalışmayan bir yükleme düğmesi bırakmak, dosyasını bıraktığını sanan kişiyi yanıltmak olurdu.",

  /** Butonun yanındaki tek kelimelik durum. */
  lockLabel: "gönderim kapalı",

  /** Formun altındaki tek satır. Sahte onay ekranının yerine geçen şey bu. */
  note: "Form henüz bir yere bağlı değil: gönderim uç noktası eklenene kadar bu buton çalışmıyor ve yazdıklarınız hiçbir yere kaydedilmiyor. Sahte bir “başvurunuz alındı” ekranı bilerek yazılmadı. Başvurunuzun bugün bize ulaştığı tek yol iletişim sayfasındaki kanallar.",
};

/* ------------------------------------------------------------- AÇIK BAŞVURU
   Formun gönderim ucu bağlanana kadar gerçekten çalışan tek yol. Sitede bugün
   BAŞVURUYA AYRILMIŞ bir e-posta adresi yok (SWAP:CAREER_INBOX), o yüzden
   burada bir adres uydurmak yerine ziyaretçi sitenin gerçek kapısına
   gönderiliyor.

   Yazılmayanlar, tek tek ve bilerek: yanıt süresi, "başvurunuz X ay saklanır"
   taahhüdü, işe alım adımları ve bir muhatap adı. Dördünün de firmada bugün
   karşılığı yok; söz vermek, sözü tutacak yapıyı kurmadan önce gelirdi. */
export const OPEN_APPLICATION = {
  title: "Açık başvuru",
  line: "Yukarıdaki ilanların hiçbiri size uymuyorsa formdaki son kutu (“Açık başvuru”) sizin için. Form gönderim ucuna bağlanana kadar başvuruyu iletişim sayfasındaki kanallardan alıyoruz; kariyer için ayrı bir adres yayımlamıyoruz.",
  /* SWAP:CAREER_INBOX — başvuruya ayrılmış e-posta. Dolduğunda bu satır
     doğrudan bir mailto: bağlantısına dönecek; sayfa değişmeyecek. */
  inbox: "",
  cta: { label: "İletişim sayfası", href: "/iletisim" },
};

/** Kariyer kutusu doldu mu? Boşken sayfa iletişim sayfasına yönlendiriyor. */
export const hasCareerInbox = (): boolean => OPEN_APPLICATION.inbox.trim() !== "";
