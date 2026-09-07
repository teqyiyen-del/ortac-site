import { accountingItems, ACC_PRICE_FOOTNOTE, ACCOUNTING_DUBAI } from "@/lib/accountingDubai";

/* /lab/muhasebe · iki adayın ortak metni.
 *
 * CANLI VERİ DOSYASINA DOKUNULMADI. Yeni metin burada duruyor; aday kazanırsa
 * lib/accountingDubai.ts'e taşınacak. Fiyat kalemleri ve dipnot canlı veriden
 * okunuyor (aşağıda yeniden dışa aktarılıyor), yani rakam ikinci kez yazılmadı.
 *
 * ---------------------------------------------------------------- NEDEN TUR
 * Müşteri: "özellikle dubai muhasebe kısmı fena, okey olmayan, karışık ve tam
 * kafamıza oturmayan bir kısım."
 *
 * ÖLÇÜLDÜ, TEŞHİS "ÇOK BÖLÜM" DEĞİL:
 *
 *   1) AYNI HİZMET DÖRT AYRI SÖZLÜKLE anlatılıyor, hem de ilk 1.500 pikselde:
 *      hero kartı  → Defter · Beyan · Rapor · Arşiv
 *      özet künyesi → Defter · KDV · Beyan · Mali tablo
 *      kapsam       → Altyapı · Gelir-gider · KDV ve beyan · Raporlama · Uyum
 *      takas paneli → Dijital defter · Gelir-gider tablosu · Nakit akış · Arşiv
 *      Ziyaretçi 400 pikselde bir aynı şeyin yeni adıyla karşılaşıyor ve tek
 *      bir hizmet modeli kuramıyor.
 *
 *   2) SEKİZ OLGUNUN HER BİRİ 2-4 KEZ tekrarlanıyor. En kötüsü "yıl sonu
 *      beyanı aylığa dahil değil": hero güven satırı + kapsam 03 + sınırlar
 *      listesi + fiyat notu = DÖRT kez, üstelik biri hero'da.
 *
 *   3) SAYFA METNİNİN %48'İ TIKLAMANIN ARKASINDA (17 <details>). En güven
 *      veren içerik olan "kapsam dışı" listesi de orada.
 *
 *   4) FİYAT 7 BÖLÜMÜN 6.'SI. Oysa aramadan gelen kişinin ilk sorusu o ve
 *      kalem kalem yayımlanmış fiyat listesi bu pazarda nadir.
 *
 * BU TURUN İLKESİ: teklifi TEK SÖZLÜKLE, TEK YERDE ve KESİNTİSİZ anlat.
 * Kapsam, sınır ve fiyat aynı omurgada ve arka arkaya. Her olgunun tek evi var.
 */

/* Fiyat tarafı canlı veriden; lab kendi rakamını taşımıyor. */
export { accountingItems, ACC_PRICE_FOOTNOTE };

/* Takvim, takas paneli ve SSS canlı bileşenlerden geliyor; yalnız SSS
   süzülüyor (bkz. SSS_KALAN). */
export const CANLI = ACCOUNTING_DUBAI;

export const HERO = {
  crumb: "Dubai · Muhasebe",
  /* ESKİSİ: "Dubai'de muhasebe hizmeti." — sayfanın ADI, iddiası değil.
     Sitedeki öteki hero'lar bir cümle kuruyor; bu sayfa kurmuyordu. */
  title: "Defterinizi kendi lisansımızla tutuyoruz.",
  accent: "kendi lisansımızla tutuyoruz.",
  /* ESKİSİ: "Kimin yaptığı, neyi kapsadığı, hangi ayda ne yapıldığı ve bedeli."
     Bu bir İÇİNDEKİLER LİSTESİ: yüklemi yok ve sayfanın kendisini tarif
     ediyor. Hemen altındaki "Kısa cevap: kim, ne, ne zaman, ne kadar"
     başlığıyla da birebir aynı şeyi söylüyordu. Yenisi bir vaat kuruyor ve
     sayfanın gerçek farkını (yayımlanmış kalem listesi) öne alıyor. */
  lead: "Aylık defter, KDV ve yıl sonu beyanı. Hangi kalemin sizde doğduğu ve ne tuttuğu bu sayfada tek tek yazılı.",
  cta: { label: "Teklif isteyin", href: "/basla" },
  /* İKİNCİ SATIR DEĞİŞTİ. Eskiden burada bir KISIT vardı ("yıl sonu beyanı
     aylık hizmete dahil değil"). Kısıt doğru ama hero'nun güven satırında
     durması yanlıştı: sayfanın ilk ekranında ziyaretçiye ne ALMADIĞINI
     söylüyordu. Kısıt teklifin içine, kapsamın hemen yanına taşındı; orada
     güç veriyor, burada frenliyordu. */
  trust: [
    { icon: "stamp" as const, line: "Kendi muhasebe lisansımız: defter ve beyan taşerona gitmiyor." },
    { icon: "wallet" as const, line: "Altı kalemin altısı da fiyatıyla birlikte aşağıda yazılı." },
  ],
};

/* --------------------------------------------------------------- TEK SÖZLÜK

   Bu dört ad SAYFANIN TAMAMINDA aynı. Hero kartı, teklif listesi, takas
   paneli ve fiyat satırları artık aynı kelimeleri kullanıyor. Dört adın
   kaynağı canlı verinin kendi kartı (AccountingHeroCard) — yani yeni bir
   sözlük icat edilmedi, var olan dördü tekleştirildi.

   "Beyan" yerine "KDV ve beyan": eski sözlükte KDV bir yerde ayrı bir başlık,
   bir yerde beyanın içindeydi. İkisi aynı işin parçası ve fiyat listesinde de
   iki ayrı satır olarak duruyor; adın ikisini birden söylemesi doğru. */
export const TEKLIF = {
  id: "teklif",
  heading: "Aylık muhasebe ne kapsıyor, ne kapsamıyor, ne tutuyor.",
  accent: "ne kapsamıyor, ne tutuyor.",
  lead: "Üçü aynı yerde duruyor, çünkü üçü tek bir sorunun parçası: bu hizmeti aldığımda elime ne geçiyor.",

  kapsam: [
    {
      ad: "Defter",
      line: "Satış ve alış faturaları, gider kayıtları, banka mutabakatı.",
      /* Mutabakatın NEDEN önemli olduğu eski sayfada bir <details> içindeydi;
         tek cümlelik hâli açıkta duruyor çünkü hizmetin değerini anlatan
         cümle o. */
      not: "Mutabakat döngünün kontrol noktası: defterle hesap tutmuyorsa fark o ay içinde çıkıyor.",
    },
    {
      ad: "KDV ve beyan",
      line: "Üç aylık KDV beyannamesi ve yıllık kurumlar vergisi beyanı.",
      not: "KDV kaydınız yoksa o kalem hiç doğmuyor.",
    },
    {
      ad: "Rapor",
      line: "Gelir-gider tablosu, bilanço ve nakit akış raporu.",
      not: "Aynı defterden çıkıyor. Vergi için değil, kendi kararlarınız için.",
    },
    {
      ad: "Arşiv",
      line: "Banka ve denetim talebinde istenen dosya hazır duruyor.",
      not: "Ay ay tutulduğu için ayrıca hazırlanması gerekmiyor.",
    },
  ],

  /* --------------------------------------------------- SINIRLAR ARTIK AÇIKTA

     Eski sayfada bu liste bir <details> şeridinin arkasındaydı ve kapalıyken
     ekranda duran tek cümle "Kapsamadığı, kapsadığı kadar önemli." idi — yani
     hiçbir bilgi taşımayan bir vecize. Beş kalemin kendisi bu pazarda nadir
     bir dürüstlük ve sayfanın en güçlü satış argümanı; tıklamanın arkasında
     duracak son şey o.

     Cümleler kısaldı: eski hâlleri 2-3 cümlelikti ve aynı bilgiyi fiyat
     notlarında bir kez daha veriyordu. */
  disarida: {
    baslik: "Aylık ücrete dahil olmayanlar",
    line: "Beşi de ayrı kalem. Dördü fiyat listesinde satır olarak duruyor; sonuncusu bir hizmet değil, bir sınır.",
    items: [
      { t: "Yıl sonu beyanı", s: "Mali tablolar ve kurumlar vergisi beyanı yıllık ayrı bir çalışma." },
      { t: "Bağımsız denetim", s: "Bazı serbest bölge otoriteleri ve belirli büyüklükteki şirketler için doğuyor." },
      { t: "Bordro", s: "Çalışan bordrosu ayrı fiyatlanıyor; kaç kişi olduğunu söylerseniz teklifte satır oluyor." },
      { t: "Kurumlar vergisi ve KDV kaydı", s: "Kuruluştan sonraki tek seferlik kayıtlar, ikisi de ayrı satır." },
      { t: "Kişiye özel vergi görüşü", s: "Siteden verilmiyor. Kendi kurgunuzu sorabilirsiniz; cevabı size yazıyoruz." },
    ],
  },

  fiyat: {
    baslik: "Kalem kalem fiyat",
    /* "Toplam yok" cümlesi eski sayfada bir SAVUNMA gibi duruyordu ("Toplam
       yok: koşullu kalemler herkeste doğmuyor."). Aynı olgu, sebebi önce
       söylenerek yazıldığında bir güç ifadesine dönüyor. */
    line: "Herkeste aynı kalemler doğmadığı için tek bir toplam yazmıyoruz. Hangi satırın sizde doğduğunu görüşmede birlikte işaretliyoruz.",
    cta: "Hangi kalemler bende doğuyor?",
  },
};

/* ------------------------------------------------------------------ TAKVİM */
export const TAKVIM = {
  id: "takvim",
  heading: "Hangi ayda ne çıkıyor.",
  accent: "ne çıkıyor.",
  /* ESKİSİ: "Kayıtlar lisansın hemen ardından açılıyor. Sonrası üç ritim."
     "Üç ritim" sayfanın kendi icat ettiği bir terimdi. */
  lead: "Kayıtlar lisansın hemen ardından açılıyor. Sonrasında defter her ay, KDV üç ayda bir, kapanış yılda bir çıkıyor.",
};

/* -------------------------------------------------------------------- EKİP */
export const EKIP = {
  id: "ekip",
  /* ESKİSİ: "Süreci yürüten ekip." — ve altında Dubai'nin küresel ticaretteki
     yeri hakkında bir alıntı vardı. Alıntı MUHASEBEYLE İLGİLİ DEĞİLDİ ve
     firmayı da anlatmıyordu; bu adayda hiç basılmıyor. Yerine bir şey
     konmadı: doğrulanmış, muhasebeye dair bir alıntı gelene kadar boş
     durması, ilgisiz bir alıntı basmaktan iyi. */
  heading: "Defteri kim tutuyor.",
  accent: "kim tutuyor.",
  lead: "Kuruluşu yapan ekip muhasebeyi de yürütüyor. Dosyayı ikinci kez anlatmıyorsunuz.",
};

/* --------------------------------------------------------------------- SSS

   ALTI SORUDAN ÜÇÜ SİLİNDİ ve gerekçesi ölçüm: eski SSS sayfanın en çok
   yüzey metni olan bölümüydü (1.050 karakter) ve üç cevabı yukarıdaki
   metnin neredeyse birebir kopyasıydı.

     faq[0] "muhasebe tutmak zorunlu mu"  ≈ why.points[0] (birebir cümle)
     faq[2] "KDV herkes için gerekli mi"  ≈ why.points[2]
     faq[4] "bağımsız denetim zorunlu mu" ≈ limits.items[1]

   Kalan üçü gerçekten başka bir şey soruyor. */
export const SSS_KALAN = ["Kurumlar vergisi %0 ise neden muhasebe gerekiyor?", "Kurumlar vergisi beyannamesi ne zaman veriliyor?", "Aylık ücret her şirkette aynı mı?"];
