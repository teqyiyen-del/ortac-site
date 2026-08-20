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

   15 Ağustos'ta üç tur kapandı ve silindi (rota, bileşen, CSS, @import):
     /lab/anket       uygunluk testi tasarımı — MELEZ canlıya alındı ve müşteri
                      turu kapattı: "o artık onaylı, sadece içeriksel
                      değişiklikler olur gerekirse." Önceki canlı sürümün yedeği
                      de bu turla gitti; git'te 0abb849'da duruyor.
     /lab/yapi        serbest bölge / mainland — Y5 canlıda, "gerek kalmadı".
     /lab/hero-dunya  küreye alternatifler — hero portala geçti, tur anlamsızlaştı. */
export const LAB_TURLARI: LabTur[] = [
  {
    href: "/lab/cta2",
    t: "Kapanış CTA · üslup turu",
    n: "Yörünge · Eşik · Akış",
    l: "Müşteri bu bölümde üslup değişikliğine izin verdi: metin az, hareket çok",
    durum: "suruyor",
  },
  {
    href: "/lab/hakkimizda-serit",
    t: "Hakkımızda · giriş şeridi",
    n: "Nefes · İkili · Sahne",
    l: "Hero + kim olduğumuz + vizyon/misyon üçlüsü; sayfanın geri kalanı canlıda kalıyor",
    durum: "suruyor",
  },
  {
    href: "/lab/hakkimizda-sayfa",
    t: "Hakkımızda · sayfanın tamamı",
    n: "canlıda: Defter'in kurumları + Cephe'nin künyesi",
    l: "Müşteri sayfanın tamamını değil iki bölümünü aldı; kalan üçlü /lab/hakkimizda-serit'e taşındı",
    durum: "canli",
  },
  {
    href: "/lab/hakkimizda-giris",
    t: "Hakkımızda · giriş şeridi",
    n: "Ocak · Fitil · Yaprak",
    l: "Fotoğraf hero'dan geri çekildi, üçü de o varsayımla yeniden kuruldu · Kanat ve Levha ex",
    durum: "suruyor",
  },
  {
    href: "/lab/cta",
    t: "CTA · kutu mu tam genişlik mi",
    n: "canlıda: Kutu",
    l: "A seçildi ve footer'ın üstüne taşındı · Şerit ve Kapak kayıtta",
    durum: "canli",
  },
  {
    href: "/lab/hero-portal",
    t: "Hero · portal fikri",
    n: "canlıda: P1",
    l: "P1'in kapısı + önceki sahnenin soluk yan duvarı canlıda · P2/P3/P4/P5 silindi",
    durum: "canli",
  },
  {
    href: "/lab/hakkimizda-bento",
    t: "Hakkımızda · bento",
    n: "canlıda: Künye",
    l: "Aday 7 seçildi ve /hakkimizda'ya taşındı · Sütun ve Levha kayıtta · altı eski aday ex",
    durum: "canli",
  },
  {
    href: "/lab/muhasebe-takvim",
    t: "Muhasebe takvimi",
    n: "canlıda: MT16",
    l: "MT16 seçildi ve /dubai/muhasebe'ye taşındı · MT13 · MT14 · MT15 kayıtta · MT10 ve MT11 referans",
    durum: "canli",
  },
  {
    href: "/lab/zincir",
    t: "Zincir bölümü",
    n: "canlıda: Z8",
    l: "Z7 ex olarak altta duruyor",
    durum: "canli",
  },
  {
    href: "/lab/hero",
    t: "Dubai hero kartı",
    n: "canlıda: H12",
    l: "H10 dikey akış hâlâ seçenek · H2/H6/H8/H9 ex",
    durum: "canli",
  },
  {
    href: "/lab/otorite",
    t: "Neden Ortac · geniş karo",
    n: "canlıda: A1",
    l: "Belge ve Sessiz kayıtta",
    durum: "canli",
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
