import { accountingItems, ACC_PRICE_FOOTNOTE, ACCOUNTING_DUBAI } from "@/lib/accountingDubai";

/* /lab/muhasebe · "TARAYARAK ANLAŞILIR" ADAYI
 *
 * ---------------------------------------------------------------- BRİF DÜZELDİ
 * İlk tur teşhisi YANLIŞTI. Sıralamayı değiştiren iki aday yapılmıştı; müşteri
 * onları görüp şunu söyledi:
 *
 *   "muhasebe sayfasında sorunum sıralama değilki, karışık ve çok text olan
 *    bi sayfa olmasıydı. bu konuları anlatmak istiyoruz ama bi şekilde sade ve
 *    anlaşılırda olsun istiyorum, insanlar okumuyor gözüyle tarıyor ve tararken
 *    bile anlaması lazım. kimse siteye girip bu kadar uzun yazı okumaz."
 *
 * Ve referansı da verdi: "dubai şirket kuruluş sayfamızdan mutluyuz."
 *
 * ------------------------------------------------------- REFERANS ÖLÇÜLDÜ
 * Beğenilen sayfa ile beğenilmeyeni yan yana saydık ve sonuç sezgiye ters:
 *
 *                        /dubai (beğenilen)   /dubai/muhasebe
 *   kelime                     1.985               1.675   ← DAHA AZ
 *   <details> (tıklama arkası)     1                  17
 *   <button>  (yapılacak şey)     73                  17
 *   <svg>     (çizim)            160                  88
 *   140+ karakterlik paragraf     10                  19
 *   bölüm başlığı (h2)            13                   8
 *
 * Yani sorun KELİME SAYISI DEĞİL. /dubai daha çok kelime taşıyor ama içeriği
 * çok sayıda KÜÇÜK, GÖRSEL ve TIKLANABİLİR parçaya bölüyor. Muhasebe sayfası
 * ise az sayıda BÜYÜK düz yazı bloğu ve yarısını akordiyona saklıyor.
 *
 * İlk tur adayı bu ölçüde daha da kötüydü (2.253 kelime, 22 <details>), çünkü
 * yanlış soruyu cevaplıyordu.
 *
 * ------------------------------------------------------------- BU TURUN KURALI
 * Her blok TEK BAKIŞTA anlaşılmalı. Uygulaması üç sert kısıt:
 *
 *   1) Kapsam kalemleri: bir kelime ad + en fazla altı kelime açıklama.
 *      Üçüncü satır ("neden önemli") tamamen silindi.
 *   2) Dahil/hariç listesi: kalem başına en fazla dört kelime, cümle YOK.
 *      Gerekçe cümleleri fiyat satırının kendi açılır bloğunda zaten var.
 *   3) Hiçbir bölüm lead'i iki satırı geçmiyor.
 *
 * Rakamlar ve kalem adları canlı veriden okunuyor; lab kendi rakamını
 * taşımıyor ve canlı veri dosyasına dokunulmadı.
 */

export { accountingItems, ACC_PRICE_FOOTNOTE };
export const CANLI = ACCOUNTING_DUBAI;

export const HERO = {
  crumb: "Dubai · Muhasebe",
  /* ESKİSİ: "Dubai'de muhasebe hizmeti." — sayfanın ADI, iddiası değil. */
  title: "Defterinizi kendi lisansımızla tutuyoruz.",
  accent: "kendi lisansımızla tutuyoruz.",
  /* ESKİSİ 65 karakterlik bir İÇİNDEKİLER LİSTESİydi ("Kimin yaptığı, neyi
     kapsadığı, hangi ayda ne yapıldığı ve bedeli"): yüklemi yoktu ve sayfanın
     kendisini tarif ediyordu. Yenisi tek satır ve bir vaat kuruyor. */
  lead: "Aylık defter, KDV ve yıl sonu beyanı. Fiyatı kalem kalem aşağıda.",
  cta: { label: "Teklif isteyin", href: "/basla" },
  trust: [
    { icon: "stamp" as const, line: "Defter ve beyan taşerona gitmiyor." },
    { icon: "wallet" as const, line: "Altı kalemin altısı da fiyatıyla yazılı." },
  ],
};

/* --------------------------------------------------------------- NE ALIYORSUNUZ
   Dört karo, dört kelime, dört kısa satır. Canlı sayfada bu içerik beş
   aşamalı bir akordiyon (kapalıyken yalnız başlıklar, açıkken 5 paragraf) ve
   ayrıca bir takas panelinde tekrar ediyor.

   ADLAR HERO KARTININ ADLARIYLA AYNI ve bu bir düzeltme: canlı sayfa aynı
   hizmeti ilk 1.500 pikselde dört ayrı sözlükle anlatıyor. */
export const NE = {
  id: "kapsam",
  heading: "Aylık muhasebede ne yapıyoruz.",
  accent: "ne yapıyoruz.",
  items: [
    { ad: "Defter", line: "Fatura, gider, banka mutabakatı" },
    { ad: "KDV", line: "Üç ayda bir beyanname" },
    { ad: "Rapor", line: "Gelir-gider, bilanço, nakit akış" },
    { ad: "Arşiv", line: "Banka ve denetim dosyası hazır" },
  ],
};

/* ------------------------------------------------------------- DAHİL / DEĞİL
   İki sütun, işaretli kısa kalemler. CÜMLE YOK.

   Sol sütun uydurulmadı: afterSetup.ts'teki "Aylık Muhasebe Hizmeti"
   kaleminin kendi `scope` listesi. Sağ sütun da limits.items'ın başlıkları.
   Yani iki liste de zaten yayımlanmış veriden, yalnızca gerekçe cümleleri
   düştü — o cümleler fiyat satırının açılır bloğunda duruyor. */
export const AYRIM = {
  id: "ayrim",
  heading: "Aylık ücrete dahil olan ve olmayan.",
  accent: "olan ve olmayan.",
  lead: "Sağdakiler ayrı kalem. Dördü fiyat listesinde satır olarak duruyor.",
  var: [
    "Gelir ve gider kayıtları",
    "Satış ve alış faturaları",
    "Banka mutabakatları",
    "Finansal raporlama",
    "Vergisel kontroller",
    "Düzenli mali danışmanlık",
  ],
  yok: [
    "Yıl sonu beyanı",
    "Bağımsız denetim",
    "Bordro",
    "Kurumlar vergisi kaydı",
    "KDV kaydı",
    "Kişiye özel vergi görüşü",
  ],
};

export const FIYAT = {
  id: "fiyat",
  heading: "Kalem kalem fiyat.",
  accent: "fiyat.",
  /* Canlı sayfadaki hâli bir SAVUNMAydı ("Toplam yok: koşullu kalemler
     herkeste doğmuyor."). Sebep önce söylenince aynı olgu bir güç ifadesi. */
  lead: "Herkeste aynı kalemler doğmuyor, o yüzden tek bir toplam yazmıyoruz.",
  cta: "Hangi kalemler bende doğuyor?",
};

export const TAKVIM = {
  id: "takvim",
  heading: "Hangi ayda ne çıkıyor.",
  accent: "ne çıkıyor.",
  /* ESKİSİ: "Kayıtlar lisansın hemen ardından açılıyor. Sonrası üç ritim."
     "Üç ritim" sayfanın kendi icat ettiği bir terimdi. */
  lead: "Defter her ay, KDV üç ayda bir, kapanış yılda bir.",
};

export const EKIP = {
  id: "ekip",
  /* ESKİSİ "Süreci yürüten ekip." ve altında Dubai'nin küresel ticaretteki
     yeri hakkında bir alıntı vardı: muhasebeyle de firmayla da ilgisi yoktu.
     Bu adayda hiç basılmıyor. */
  heading: "Defteri kim tutuyor.",
  accent: "kim tutuyor.",
};

/* SSS altıdan üçe indi: üç cevap sayfanın kendi metninin neredeyse birebir
   kopyasıydı (kayıt zorunluluğu, KDV herkese doğmuyor, bağımsız denetim). */
export const SSS_KALAN = [
  "Kurumlar vergisi %0 ise neden muhasebe gerekiyor?",
  "Kurumlar vergisi beyannamesi ne zaman veriliyor?",
  "Aylık ücret her şirkette aynı mı?",
];
