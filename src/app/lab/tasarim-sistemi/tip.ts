/* ============================================================================
   TİPOGRAFİ ÖNERİSİ · /lab/tasarim-sistemi — veri
   23.09.2026 · design system, soru 1-7. Denetim: docs/design-system/denetim.md.

   Burak'ın çerçevesi: tek aile Poppins, mono yok; büyük ve kalın başlıklarda
   harf aralığı eksi (~%2), açıklamalarda sıfır; basamaklar "10, 11, 12, 13,
   14, 15, 16, 20, 24, 32, 36, 40, 48, 64 …" gibi yuvarlak adımlar; vitrin
   (ana sayfa hero'su) ile kapanış CTA'sı 64'te birleşsin; SVG kartlarının
   içindeki başlıklar ayrı değerlendirilsin, hiyerarşiye sokulmasın.

   "simdi" alanı ekranda ÖLÇÜLEN değerler (12 canlı sayfa, 1440 px; parantez
   içi: kullanım sayısı × sayfa sayısı). "nerede" gerçek bileşenler. Öneri
   bir sonraki mesajla karara dönüşecek; bu sayfa karar değil.
   ========================================================================== */

export type TipSatir = {
  ad: string;
  d: number;
  m: number;
  fw: 400 | 600 | 700;
  lh: number;
  ls: string;
  ornek: string;
  simdi: string;
  nerede: string;
  not?: string;
};

export const TIP_GRUPLAR: { baslik: string; aciklama: string; satirlar: TipSatir[] }[] = [
  {
    baslik: "Başlıklar",
    aciklama: "Sayfada bir tane H1, bölüm başına bir H2. H3 bir bölümün içindeki alt başlık.",
    satirlar: [
      {
        ad: "h1 · vitrin",
        d: 64,
        m: 36,
        fw: 700,
        lh: 1.05,
        ls: "-0.02em",
        ornek: "Şirketinizi bugün kuralım.",
        simdi: "66,6 ana sayfa hero'su (1×1) · 58 sayfa hero başlıkları (11×11) · 60 kapanış CTA'sı (12×12)",
        nerede: "Her sayfanın hero başlığı ve sayfa sonundaki kapanış CTA'sı",
        not: "58 ile 64 arasındaki fark gözle zor seçiliyor (telefonda 34 / 36). Önerim tek H1: ana sayfa dahil bütün hero'lar 64 / 36. Kapanış CTA'sı sayfanın öbür ucu, aynı boyda.",
      },
      {
        ad: "h2 · bölüm",
        d: 48,
        m: 32,
        fw: 700,
        lh: 1.08,
        ls: "-0.02em",
        ornek: "Hangi ödeme kanalı çalışıyor?",
        simdi: "46 bölüm başlıkları (68×10) · 44 ana sayfa süreç (1×1) · 46 hakkımızda \"Kim\" (1×1)",
        nerede: "Her bölümün başlığı (sec-head). Siyah kapanış CTA'sı hariç.",
      },
      {
        ad: "h3 · alt bölüm",
        d: 32,
        m: 24,
        fw: 700,
        lh: 1.15,
        ls: "-0.015em",
        ornek: "Dubai'de serbest bölge",
        simdi: "38 sektör sayfası ülke başlıkları (3×1) · 34 hakkımızda kapanışı (1×1) · 31 blog öne çıkan yazı, maliyet özeti · 29 otorite başlığı · 28 maliyet kalemi",
        nerede: "Bir bölümün içinde bölüm gibi davranan blok: sektör sayfasında ülke ülke, maliyet listesinde kalem",
        not: "38 ve 34'ü 48'e çekmek fazla büyük olurdu (senin itirazın); bunlar alt bölüm, 32'de buluşuyor.",
      },
    ],
  },
  {
    baslik: "Kart başlıkları",
    aciklama: "Kutunun, satırın, adımın adı. Bugün 8 boyut (15,5–22); ikiye iniyor.",
    satirlar: [
      {
        ad: "title/20",
        d: 20,
        m: 20,
        fw: 600,
        lh: 1.25,
        ls: "-0.01em",
        ornek: "Kurumlar vergisi %0*",
        simdi: "22 SSS açık soru, ülke kıyası (17) · 20 ülke adı, dayanak kartları, vize türleri (34) · 19 neden-Ortac kartları (23) · 18 avantaj kartları, fiyat kademesi (38)",
        nerede: "Büyük kartın başlığı: avantajlar, vize türleri, SSS paneli, ülke kartları",
      },
      {
        ad: "title/16",
        d: 16,
        m: 16,
        fw: 600,
        lh: 1.3,
        ls: "0",
        ornek: "Banka hesabı açılışı",
        simdi: "17 süreç adımı, kanal satırı, SSS çağrısı (50) · 16,5 · 16 kalın (12) · 15,5 kart başlığı, logo satırı (≈40)",
        nerede: "Küçük kartın ve listedeki satırın adı: süreç adımları, belge satırı, kanal satırı",
      },
    ],
  },
  {
    baslik: "Metin",
    aciklama: "Bugün 10,5 ile 17 arasında 15 boyut. Beşe iniyor.",
    satirlar: [
      {
        ad: "lead",
        d: 18,
        m: 16,
        fw: 400,
        lh: 1.6,
        ls: "0",
        ornek: "İngiltere'nin asıl gücü bu. Kartla tahsilat, pazaryeri, hesap ve kripto: hepsi İngiltere şirketiyle açılıyor.",
        simdi: "16,5 bölüm giriş cümlesi (59×11) · 17 hero cümlesi (8×8) · 15,5 · 17,5",
        nerede: "Başlığın altındaki ilk cümle (sec-lead, hero lead)",
        not: "18 senin listende yok. 16 seçilirse giriş cümlesi gövde metniyle aynı boya düşüyor, 20 ise iki satırlık bir cümle için fazla. Karar senin: 18 mi 16 mı?",
      },
      {
        ad: "body/16",
        d: 16,
        m: 16,
        fw: 400,
        lh: 1.6,
        ls: "0",
        ornek: "Direktörün İngiltere'de yaşaması gerekmiyor. Şirketin İngiltere'de bir kayıtlı ofis adresi olması yeterli.",
        simdi: "16 SSS cevapları, listeler · 15,5 · 15",
        nerede: "Uzun okunan metin: SSS cevabı, açıklama paragrafı",
      },
      {
        ad: "body/14",
        d: 14,
        m: 14,
        fw: 400,
        lh: 1.55,
        ls: "0",
        ornek: "Sitenizde ve uygulamanızda kartla tahsilat.",
        simdi: "14,5 kart metinleri, menü (243) · 14 (156)",
        nerede: "Kartın içindeki tek cümle, menü öğeleri",
      },
      {
        ad: "small/13",
        d: 13,
        m: 13,
        fw: 400,
        lh: 1.5,
        ls: "0",
        ornek: "Tutarlar tipik aralıktır; kurum kararları ilgili kuruluşlara aittir.",
        simdi: "13,5 footer bağlantıları, tablo satırları (584) · 13 (270) · 12,5 notlar, rozetler (216)",
        nerede: "Dipnot, tablo hücresi, footer bağlantısı",
      },
      {
        ad: "caption/12",
        d: 12,
        m: 12,
        fw: 400,
        lh: 1.45,
        ls: "0",
        ornek: "Güncelleme: 23 Eylül 2026",
        simdi: "12 (55) · 11,5 dil düğmesi, küçük rozetler (80)",
        nerede: "Tarih, yasal satır, grafik ekseni",
      },
      {
        ad: "label/11",
        d: 11,
        m: 11,
        fw: 600,
        lh: 1.3,
        ls: "0.02em",
        ornek: "Hassas · Örnek · Kartla satış",
        simdi: "11 (11) · 10,5 (5) · 9,5 (2)",
        nerede: "Rozet, çip, tablo köşesi. Büyük harf yok (soru 7).",
      },
    ],
  },
  {
    baslik: "Düğme",
    aciklama: "Bugün 15,5 ve 14,5; kalınlık 600 ile 500 karışık.",
    satirlar: [
      {
        ad: "button",
        d: 15,
        m: 15,
        fw: 600,
        lh: 1,
        ls: "0",
        ornek: "Kurulumu Başlat",
        simdi: "15,5 ana düğmeler (49×12), yarısı 600 yarısı 500",
        nerede: "52 px ana düğmeler",
      },
      {
        ad: "button-s",
        d: 14,
        m: 14,
        fw: 600,
        lh: 1,
        ls: "0",
        ornek: "Sayfayı aç",
        simdi: "14,5 küçük düğme ve çipler (≈90) · 14 (≈40)",
        nerede: "42 px küçük düğmeler, çipler, menü düğmesi",
      },
    ],
  },
  {
    baslik: "Rakam",
    aciklama: "Tutar, oran, süre. Kalın ve sıkı; metinden ayrı ölçek.",
    satirlar: [
      {
        ad: "number/48",
        d: 48,
        m: 36,
        fw: 700,
        lh: 1,
        ls: "-0.02em",
        ornek: "25.000 €",
        simdi: "64 KKTC sermaye tutarı · 60 maliyet sayfası çapası · 56 · 54 fiyat toplamı",
        nerede: "Bir bölümün tek büyük rakamı",
      },
      {
        ad: "number/32",
        d: 32,
        m: 28,
        fw: 700,
        lh: 1.05,
        ls: "-0.02em",
        ornek: "%19–25",
        simdi: "40 vergi durakları (6) · 36 · 30 (19) · 28 süre, oran (8)",
        nerede: "Kartın içindeki rakam: oran, süre, tutar",
      },
      {
        ad: "number/24",
        d: 24,
        m: 22,
        fw: 700,
        lh: 1.1,
        ls: "-0.01em",
        ornek: "£28.050",
        simdi: "24 (4) · 22 (birkaç)",
        nerede: "Küçük kutudaki sonuç: hesap sonucu, tablo değeri",
      },
    ],
  },
];

/* İllüstrasyon metni: sahnelerin içi (aria-hidden). Hiyerarşiye girmiyor
   (Burak: "SVG kartlarının içindeki başlıklara H2 demek doğru olmaz"), ama
   aynı basamaklardan seçiyor. Ölçülen: 30 sahne kelimesi · 13 · 12,5 · 12 ·
   11,5 · 11 · 10,5 · 10 · 9,5. */
export const SAHNE_BASAMAK = [32, 16, 14, 13, 12, 11, 10];
