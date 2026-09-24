/* ============================================================================
   LAB TURLARININ TEK KAYNAĞI

   NEDEN AYRI BİR DOSYA: liste daha önce iki yerde ayrı ayrı yazılıydı
   (page.tsx'teki kart listesi ve layout.tsx'teki yapışkan şerit) ve İKİ TUR
   ÜST ÜSTE BAYATLADI. Bağımsız denetim ikisini de yakaladı: bir turda yeni
   açılan iki rota (/lab/dubai-fiyat ve /lab/hakkimizda-akis) hiçbir yerden
   bağlı değildi, ertesi turda da /lab/anket aynı şekilde görünmezdi ve şerit
   hâlâ elenmiş bir adayı ("yeni: P4") yeni diye gösteriyordu. İki kopya
   olduğu sürece bu hata tekrarlar; artık tek kopya var.

   ---------------------------------------------------------------- SIRA KURALI
   Müşteri: "labda yeni bir şey yaptığında şurda en sol üste koy yeni gelmiş
   olsun." Yani liste YENİDEN ESKİYE doğru sıralı ve yeni tur DİZİNİN BAŞINA
   eklenir, sonuna değil. Şerit soldan sağa aktığı için dizinin ilk elemanı
   ekranın sol üstünde çıkıyor.

   ---------------------------------------------------------------- DURUM NOKTASI
   Müşteri: "canlıya alınmış olanların yanına kırmızı nokta, devam ediyor
   olanlarada yeşil nokta ekle."

     durum: "canli"    → KIRMIZI. Turun kazananı canlı sayfaya taşındı; tur
                         kapandı, sayfa yalnızca kayıt olarak duruyor.
     durum: "suruyor"  → YEŞİL. Karar bekleyen adaylar var.
     durum: "yok"      → nokta yok. Yalnızca /lab/kapali için: o bir tur değil,
                         dolaşıma kapatılmış sayfalara açılan arka kapı.

   Renk ATAMASI müşterinin tarifi; sezgiye ters olduğu için burada yazılı
   (yaygın kullanımda yeşil "bitti" demektir). Nokta tek başına bilgi
   taşımıyor: durum kelimesi bağlantının erişilebilir adına da giriyor, çünkü
   renk körü bir ziyaretçi ve ekran okuyucu için nokta hiçbir şey söylemez.
   ========================================================================== */

export type LabDurum = "canli" | "suruyor" | "yok";

export type LabTur = {
  href: string;
  /** kart başlığı ve şerit etiketi */
  t: string;
  /** kısa künye: hangi adaylar var ya da hangisi canlıda */
  n: string;
  /** yalnızca indeks kartında görünen tek satırlık açıklama */
  l: string;
  durum: LabDurum;
};

/** Durum kelimesinin erişilebilir addaki karşılığı. */
export const LAB_DURUM_AD: Record<LabDurum, string> = {
  canli: "canlıya alındı",
  suruyor: "sürüyor",
  yok: "",
};

/** Noktanın rengi. Zemin gece (#080808); ikisi de grafik eşiğini (3:1) geçiyor:
 *  --red-300 #ff9a9a → 8,74:1 · --green-300 #63d69d → 9,71:1.
 *  Palette'in --red-600/--green-600'ü koyu zeminde 3:1'in altında kalıyordu,
 *  o yüzden 300 kademeleri seçildi. */
export const LAB_DURUM_RENK: Record<LabDurum, string> = {
  canli: "var(--red-300)",
  suruyor: "var(--green-300)",
  yok: "transparent",
};

/* YENİDEN ESKİYE. Yeni tur EN ÜSTE eklenir.

   ------------------------------------------------- BÜYÜK TEMİZLİK 10.09.2026
   Müşteri: "lab çok fazla doldu kafamı karıştırmaya başladı yeşil duran 50
   tane hakkımızda kısmı oldu kral kullanmadığımızı düşündüklerini full gönder
   ya zaten beğensem söylerdim. bide onaylanıp bitenleri kaldırabilirsin."

   ON DÖRT TUR silindi (rota + bileşen + CSS + globals @import). Liste ve
   gerekçe css/globals.css'in başındaki KALDIRILDI bloğunda; kısaca:

     kazananı canlıda   cta · cta2 · footer · muhasebe-takvim · zincir · hero ·
                        hero-portal · otorite · hakkimizda-bento ·
                        hakkimizda-sayfa
     elendi             hakkimizda-giris · hakkimizda-serit ·
                        hakkimizda-acilis · bolum-basi

   KIRMIZI NOKTA ARTIK LİSTEDE YOK ve bu bir kural değişikliği değil sonuç:
   "canlıya alındı" durumundaki her tur bu temizlikte silindi. Bir tur
   kapandığında yine kırmızıya döner, ama artık orada uzun süre beklemez —
   müşterinin şikâyeti tam olarak biriken kapalı turlardı.

   12 Eylül'de /lab/arac-dili de kapandı: araç sayfası düzenine üç yön denendi,
   müşteri A2'yi (Tezgâh) seçti ve altı aracın tamamına uygulandı.

   Aynı gün iki tur daha kapandı ve silindi: /lab/muhasebe (MD · K1 · F3) ve
   /lab/hakkimizda-levha. İkisinin de kazananı canlıda — müşteri "muhasebe ve
   hakkımızda sayfalarını live alabilirsin kral" dedi. Geriye tek karar bekleyen
   tur kaldı (/lab/ulke-ing-kktc) ve müşteri onun için "sonra gelicem" dedi.

   15 Ağustos'ta üç tur daha silinmişti (anket · yapı · hero-dunya); onların
   gerekçesi de git'te.

   ------------------------------------------------- İKİNCİ TEMİZLİK 21.09.2026
   Müşteri: "labda kararını verdiğimiz şeyleri kaldıralım ya yine çorba olmuş
   … niye yeşil yanıyor bazıları anlamadım. Satış akışı duracak, ülke sayfası
   duracak, gerisini zaten live almadık mı?"

   Aldık. YEŞİL YANMALARININ SEBEBİ KAYIT HATASIYDI, tasarım değil: altı turun
   (nav-ulke-karti · yapi-olcu · rapor-araclar · muhasebe-ihtiyac ·
   muhasebe-alinti · muhasebe-gecis) kazananı canlıya taşınmış ama buradaki
   `durum` alanı "suruyor"da unutulmuştu. Renk kuralı yukarıda: yeşil = karar
   bekliyor. Yani ekran "karar bekliyor" diyordu, oysa karar çoktan verilmişti.

   ON ÜÇ TUR silindi (rota + aday bileşeni + CSS + globals @import):
     hakkimizda-levha (N2 aynı gün canlıya) · nav-ulke-karti · yapi-olcu ·
     rapor-araclar · rapor · ihtiyac-duzen · nav-araclar · sss · sss-renk ·
     hero-fiyat · muhasebe-ihtiyac · muhasebe-alinti · muhasebe-gecis

   KALANLAR: satış akışı demosu ve İngiltere/KKTC ülke sayfası (ikisi de
   gerçekten karar bekliyor) ve /lab/kapali (tur değil, arka kapı).
   components/lab/anketIkon.tsx de DURUYOR: adı lab ama canlı kod kullanıyor
   (lib/countryContent.ts · lib/fitTest.ts).

   DERS: bir turun kazananı canlıya taşındığı commit'te bu dosyadaki `durum`
   da "canli"ye dönmeli ya da tur doğrudan silinmeli. İkisinden biri
   yapılmazsa şerit yalan söylüyor.

   22.09.2026 · /lab/hakkimizda-kim (K1 · K2 · K3) açıldığı günün ertesinde
   kapandı ve dersin gereği yapıldı: K1 müşterinin tarifiyle (başlıksız afiş +
   K2'nin gece/mavi vizyon-misyon karoları) canlıya taşındığı commit'te tur
   silindi. */

export const LAB_TURLARI: LabTur[] = [
  {
    href: "/lab/renk",
    t: "Bento rengi",
    n: "R0 · R1 · R2",
    l: "Dubai avantaj kartları üç kademede: bugün, ölçülü renk (canlıda), belirgin renk",
    durum: "suruyor",
  },
  {
    href: "/lab/sss",
    t: "SSS",
    n: "S1 · S2 · S3",
    l: "Siyah cevap paneli yerine üç açık aday: açılır kutular, açık kartlar, konu sekmeleri",
    durum: "suruyor",
  },
  {
    href: "/lab/surec",
    t: "Süreç",
    n: "P2 · P3",
    l: "İkinci tur: P1 elendi; rayda yalnız çubuk ve sayı, büyük numara yok, metin zıplamıyor",
    durum: "suruyor",
  },
  {
    href: "/lab/tasarim-sistemi",
    t: "Tasarım sistemi",
    n: "tipografi · renk · boşluk · şekil · bileşen · etkileşim",
    l: "Design system: altı blok, bugünkü ölçümle; canlı denemesi /ingiltere, adım adım önce/sonra /karsilastir",
    durum: "suruyor",
  },
  {
    href: "/lab/banka-renk",
    t: "Dubai banka · renkli hâl",
    n: "yedek",
    l: "Marka renginde logolar ve kuyular, ödeme sahnesinde altın paralar; SVG'lere renk katarken referans",
    durum: "suruyor",
  },
  {
    href: "/lab/banka-ilk",
    t: "Dubai banka · ilk hâl",
    n: "yedek",
    l: "Banka sayfasının ilk geçişi: logo karoları, gece ödeme bölümü, süreç kartları",
    durum: "suruyor",
  },
  {
    href: "/lab/satis-akisi",
    t: "Satış akışı · demo",
    n: "Dubai",
    l: "Kurulumu başlat ve fiyatlardan hemen başla tek pencereyi açıyor: ülke, paket, bilgiler, teklif, ödeme",
    durum: "suruyor",
  },
  /* 11.09.2026 · ÜÇ TUR KAPANDI, İKİSİ KALDI.
     /lab/muhasebe-kapsam → K1 seçildi ("o iyi olmuş"), /lab/muhasebe'ye girdi.
     /lab/muhasebe-fayda  → F3 düzeltilerek seçildi ("seçmeli yapı gerek yok,
                            %50 %50, yazı büyüsün"), /lab/muhasebe'ye girdi.
     /lab/hakkimizda-bento → müşteri Levha'nın bölümlerini seçti, bentoya yorum
                            yapmadı. Üçü de kazananlarıyla birlikte silindi;
                            kazananlar artık kendi sayfalarının içinde. */
  {
    href: "/lab/ulke-ing-kktc",
    t: "İngiltere ve KKTC · ülke sayfası",
    n: "YÖN · dört bölüm",
    l: "Dubai'de olup burada olmayan bölümler yazılmış veriden kuruldu; yapı seçimi ve kuruluş sonrası tutarları müşteride",
    durum: "suruyor",
  },
  {
    href: "/lab/kapali",
    t: "Dolaşıma kapalı sayfalar",
    n: "arka kapı",
    l: "Kapatılan sayfalara buradan gidilir; bu bir tur değil",
    durum: "yok",
  },
];



/** Bağlantının erişilebilir adı. Nokta aria-hidden olduğu için durum kelimesi
 *  buradan geliyor; renk tek bilgi kaynağı olamaz. */
export function labAd(tur: LabTur) {
  const d = LAB_DURUM_AD[tur.durum];
  return d ? `${tur.t} · ${tur.n} · ${d}` : `${tur.t} · ${tur.n}`;
}
