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
   gerekçesi de git'te. */

export const LAB_TURLARI: LabTur[] = [
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
