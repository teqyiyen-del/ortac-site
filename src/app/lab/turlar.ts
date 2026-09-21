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
  {
    href: "/lab/hakkimizda-levha",
    t: "Neye dayanarak · bento",
    n: "N1 · N2 · N3",
    l: "Dördüncü geçiş: ana sayfanın karo grameri, gerçek içerikli sahneler",
    durum: "suruyor",
  },
  {
    href: "/lab/nav-ulke-karti",
    t: "Navbar ülke kartı",
    n: "D1 · D2 · D3",
    l: "Koyu kart bir künye tahtası; üçü de etiket/değer düzenini kaldırarak çözüyor",
    durum: "suruyor",
  },
  {
    href: "/lab/yapi-olcu",
    t: "Yapı seçimi · ölçü",
    n: "B1 · B2 · B3",
    l: "Harita ne kadar büyük olabilir — kart sütunu onu ne kadar taşır",
    durum: "suruyor",
  },
  {
    href: "/lab/rapor-araclar",
    t: "Araç raporları · PDF",
    n: "Yedi aracın belgesi",
    l: "Kâğıt gerçek ölçüde (210 mm) önizleniyor; sayılar araçların kendi hesabından, uydurma girdi yok",
    durum: "suruyor",
  },
  {
    href: "/lab/ihtiyac-duzen",
    t: "İhtiyaç bulucu · düzen",
    n: "D2 + S1 canlıda",
    l: "Soru tarafı gece, sonuç kalemleri kutuda; hover'da kaybolan kutu ve görünmeyen özet düzeltildi",
    durum: "canli",
  },
  {
    href: "/lab/nav-araclar",
    t: "Navbar · araçlar paneli",
    n: "N2 canlıda",
    l: "İki sütun, tek satırlık kart; ad tam, künye sığmazsa üç noktaya iniyor. Sekizinci kutu panelin çıkışı",
    durum: "canli",
  },
  {
    href: "/lab/sss-renk",
    t: "Sık sorulanlar · renk",
    n: "M1 + M2 birleşti · canlıda",
    l: "Beyaz taban, kırık beyaz hover + marka mavisi yazı, siyah seçili satır ve siyah cevap paneli; ilk blok canlı kuralların kendisi",
    durum: "canli",
  },
  {
    href: "/lab/sss",
    t: "Sık sorulanlar · tasarım",
    n: "S1 · S2 · S3 elendi",
    l: "Ana sayfanın mantığı korundu; canlıda düzeltilen şey soru-cevap boşluğu ve künye satırına eklenen sayaç",
    durum: "canli",
  },
  {
    href: "/lab/hero-fiyat",
    t: "Muhasebe hero · fiyat ögesi",
    n: "F3 seçildi",
    l: "Çerçeveli kutu \"kaba\" bulundu; butonla aynı ölçüdeki ikinci düğme (F3) aşağı okla canlıya alındı",
    durum: "canli",
  },
  {
    href: "/lab/rapor",
    t: "Araç çıktısı · rapor tasarımı",
    n: "R1 · R2 · R3 elendi",
    l: "Üç aday da beğenilmedi, taban hâli kaldı: \"senin önceki daha iyiymiş, biraz icon ve bayrakla süsle\"",
    durum: "canli",
  },
  {
    href: "/lab/muhasebe-ihtiyac",
    t: "Muhasebe · hangi hizmetler gerekiyor",
    n: "I1 · I2 · I3",
    l: "Sol panel \"kalabalık\" bulundu: tek soru sırayla, cümle içinde seçim, ikonsuz ayar satırları",
    durum: "suruyor",
  },
  {
    href: "/lab/muhasebe-alinti",
    t: "Muhasebe · alıntı bandının zemini",
    n: "A1 · A2 · A3",
    l: "Gece bant \"küçük alanda sırıtıyor\": kırık beyaz, beyaz + çizgi ve geniş gece denendi; sayfada aşağı alma önerisi de sonda",
    durum: "suruyor",
  },
  {
    href: "/lab/muhasebe-gecis",
    t: "Muhasebe · muhasebecinizi değiştirmek",
    n: "G1 · G2 · G3",
    l: "Canlıdaki bölüm \"texte boğulmuş\" bulundu; üç aday yükü görsele veriyor: gece kartta devir hattı, tam gece hat, devir dosyası",
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
