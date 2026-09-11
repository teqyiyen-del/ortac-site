import { accountingItems, ACC_PRICE_FOOTNOTE, ACCOUNTING_DUBAI } from "@/lib/accountingDubai";

/* /lab/muhasebe · MÜŞTERİNİN BÖLÜM BÖLÜM BRİFİYLE KURULDU
 *
 * ------------------------------------------------------------ ÖNCEKİ İKİ TUR
 * 1. tur: sıralamayı değiştiren iki aday (MA · MB). Teşhis yanlıştı.
 * 2. tur: "tarama" adayı (MC). Doğru eksendi ama müşteri bölüm bölüm gezip
 *         neyin kalacağını, neyin gideceğini ve yeni sıranın ne olduğunu
 *         tek tek söyledi. Bu tur onun brifi.
 *
 * ------------------------------------------------------- MÜŞTERİNİN KARARLARI
 * KALSIN (canlıdan, dokunulmadan):
 *   · Fiyat bölümü — "muhasebe hizmet bedeli kısmı güzel, burayı aynen
 *     koruyalım."
 *   · Sizden gelen / size dönen paneli — "orası muhakkak olsun, güzel çünkü
 *     baya." (components/services/AccountingHandover.tsx, aynen kullanılıyor)
 *
 * GİTSİN:
 *   · "Kısa cevap: kim, ne, ne zaman, ne kadar" künyesi
 *   · "Süreci yürüten ekip" bölümü
 *     (ikisi BİRLEŞİP giriş oluyor, aşağıda ARTI)
 *   · "Muhasebe tek başına durmuyor" dört kartı ve "Nasıl başlanıyor?" üç
 *     adımı — "hiç gerek yok valla, fazlalık göz sikiyor." Ölçüldü: o dört
 *     kartın üçü zaten sönük ve tıklanamıyordu.
 *   · Takvimin girişindeki 01-02-03 bloğu ve "ilk 12 ay" başlığının altındaki
 *     istatistik cümlesi — "çok göz yoruyor." İkisi de bloga taşınacak
 *     malzeme.
 *
 * DEĞİŞSİN:
 *   · Kapsamın beş maddesi fazla → solda yaptıklarımız, sağda
 *     yapmadıklarımız. Sol sütun ikonlu karolar (müşteri "senin labdaki
 *     girişteki 4 box gibi düşün" dedi).
 *     11.09.2026 · YERİNE K1 GELDİ: beş aşama, her biri kendi açılırı, sınır
 *     ait olduğu aşamanın içinde. Aşağıda KAPSAM.
 *   · "Düzenli muhasebenin karşılığı" büyüsün ve göze çarpsın — "burası
 *     önemli bir kısım bence."
 *     11.09.2026 · YERİNE F3 GELDİ: tek defter sahnesi + dört satır,
 *     seçimsiz, metin sütunu sahneden geniş. Aşağıda KARSILIK.
 *
 * YENİ SIRA (müşterinin tarif ettiği):
 *   hero → artılarımız (4 box) → Murat Ortaç alıntısı (full genişlik) →
 *   kapsam (yapıyoruz / yapmıyoruz + takas paneli) → takvim (sade) →
 *   düzenli muhasebenin karşılığı (büyük) → fiyat (aynen) → SSS
 *
 * Rakamlar ve kalem adları canlı veriden; lab kendi rakamını taşımıyor ve
 * canlı veri dosyasına dokunulmadı.
 */

export { accountingItems, ACC_PRICE_FOOTNOTE };
export const CANLI = ACCOUNTING_DUBAI;

export const HERO = {
  crumb: "Dubai · Muhasebe",
  title: "Defterinizi kendi lisansımızla tutuyoruz.",
  accent: "kendi lisansımızla tutuyoruz.",
  lead: "Aylık defter, KDV ve yıl sonu beyanı. Fiyatı kalem kalem aşağıda.",
  cta: { label: "Teklif isteyin", href: "/basla" },
  trust: [
    { icon: "stamp" as const, line: "Defter ve beyan taşerona gitmiyor." },
    { icon: "wallet" as const, line: "Altı kalemin altısı da fiyatıyla yazılı." },
  ],
};

/* ------------------------------------------------------------------ 1 · ARTI
   "Kısa cevap" künyesi ile "Süreci yürüten ekip" bölümünün BİRLEŞİMİ.
   Müşteri: "önce bu ikisinin birleşiminden bizim artılarımızı anlatan türden
   bir şeyle giriş yapabiliriz, bunları 4 box olarak yan yana da koyabilirsin
   ve biraz daha az yazı yaz bence."

   Dört başlık canlı verinin kendi `ortac.facts`'i; DEĞİŞEN TEK ŞEY CÜMLE BOYU.
   Kaynak cümleler 70-110 karakterdi ve iki yan cümle taşıyordu; buradakiler
   35-50 karakter ve tek iddia. Karo formatının kısıtı bu: yan yana dört kutu,
   göz her birinde bir saniye duruyor.

   LEAD YOK ve bilerek: dört başlık zaten bölümün ne olduğunu söylüyor,
   üstüne bir giriş cümlesi "az yazı" brifiyle çelişirdi. */
export const ARTI = {
  id: "arti",
  heading: "Defteri kimin tuttuğu fark ediyor.",
  accent: "fark ediyor.",
  items: [
    { t: "Kendi muhasebe lisansımız", s: "Defter ve beyan taşerona gitmiyor." },
    { t: "Kuruluş sonrası aynı ekip", s: "Şirketi kuran ekip defteri de tutuyor." },
    { t: "Panel üzerinden takip", s: "Belgeler tek panelde, e-posta zincirinde değil." },
    { t: "Dubai'de kendi ofisimiz", s: "Otorite ve banka trafiği yerinden, Türkçe." },
  ],
};

/* --------------------------------------------------------------- 3 · KAPSAM
   11.09.2026 · K1 SEÇİLDİ ("ne yapıyoruz kısmını k1 yapabiliriz o iyi olmuş").
   Bölümün gövdesi artık canlı verinin beş aşaması (components/lab/
   MuhasebeBloklar.tsx · KALEMLER); burada yalnız bölümün kendi metni kaldı.

   SİLİNEN ÜÇ ALAN ve neden: `var` (dört karo: Defter · KDV · Rapor · Arşiv),
   `yok` (altı çıplak başlık) ve `yokNot`. Dört karo lab'in kendi
   kısaltmasıydı ve K1 onun yerine canlı verinin `scope.phases`'ini basıyor;
   altı başlığın dördü `limits.items`'ın gerekçeli hâliyle ait olduğu
   aşamanın içine girdi, kalan ikisi (kurumlar vergisi kaydı, KDV kaydı) sınır
   değil hizmet olduğu için birinci aşamada `yokBaslik` etiketiyle duruyor.
   Hiçbir alanın ikinci bir okuyucusu kalmadı (import grafiğiyle bakıldı:
   veri.ts'i okuyan yalnız MuhasebeBloklar.tsx ve page.tsx). */
export const KAPSAM = {
  id: "kapsam",
  heading: "Ne yapıyoruz, ne yapmıyoruz.",
  accent: "ne yapmıyoruz.",
  /* Birinci aşamanın sınır etiketi. "Neyi kapsamıyor?" (limits.title) DEĞİL,
     çünkü altındaki iki kalem kapsam dışı değil: yapılıyor, aylık ücrete
     dahil değil. İki etiket aynı şeyi söylemiyor. */
  yokBaslik: "Aylık ücrete dahil değil",
};

/* --------------------------------------------------------------- 4 · TAKVİM
   Müşteri: "orayı çok daha sadeleştirmek lazım, özellikle direkt girişindeki
   1-2-3 kısmı çok göz yoruyor, bide ilk 12 ayda başlığının altındaki açıklama
   fln."

   İkisi de bu adayda BASILMIYOR (nasıl, css/lab-muhasebe.css'te yazılı).
   Geriye takvimin kendisi kalıyor: on iki aylık şerit, üç satır, tek bakış. */
export const TAKVIM = {
  id: "takvim",
  heading: "Hangi ayda ne çıkıyor.",
  accent: "ne çıkıyor.",
  lead: "Defter her ay, KDV üç ayda bir, kapanış yılda bir.",
};

/* --------------------------------------------------------------- 5 · KARŞILIK
   Müşteri: "düzenli muhasebenin karşılığı kısmına daha fazla alan ayırıp
   biraz daha göze çarpıcı şekilde yapabilirsin, burası önemli bir kısım
   bence."

   LEAD SİLİNDİ: "Dördü de bir vaat değil, kaydın ay ay tutulmasının doğrudan
   sonucu." Sayfa kimsenin yöneltmediği bir suçlamaya karşı kendini
   savunuyordu. Bölüm F3 olunca da dönmedi.

   11.09.2026 · BÖLÜM F3 OLDU ve metnin İKİ KOPYASI vardı: bu dizi ve
   /lab/muhasebe-fayda'nın FaydaTur2.tsx · KISA dizisi (o tur silindi).
   Başlıklar birinde hariç aynıydı, cümlelerin dördü farklıydı. TEK KOPYA
   BURASI; alan alan karar:

     t · BU DİZİNİN BAŞLIKLARI kaldı. Tek fark üçüncü satırdı: canlı veri
         (accountingDubai.ts · gains) "Banka ve denetim TALEBİ hazır dosya
         buluyor" diyor. "Talebi" düştü çünkü talep kavramı cümlenin kendisinde
         ("İstenen belgeler") zaten geçiyor; başlıkta ikinci kez söylemek
         satırı 36'dan 43 karaktere uzatıyordu. Ölçüldü (22 px Poppins):
         "talebi"yle 485 px, dört başlığın geri kalanının en uzunu 435 px —
         yani tek başına 50 piksel öne çıkan satır oydu.
     s · KISA'NIN CÜMLELERİ geldi. Bu dizinin cümleleri kısaltılırken (canlı
         ortalama 95 → 45 karakter) mekanizmanın yarısı gitmişti:
           · 2 "Vergi için değil, sizin kararınız için." yüklemsiz bir parça;
             NEYİN kararınız için olduğunu söylemiyor. KISA'da "Aynı defterden
             çıkıyor" — F3'ün sahnesinin çizdiği cümle tam olarak bu.
           · 3 "Ay ay tutulunca ayrıca hazırlanmıyor." neyin hazırlanmadığını
             söylemiyor; KISA'da "İstenen belgeler hep aynı".
           · 4 "Nitelikli mükellefiyet otomatik gelmiyor." satırı bir UYARIDA
             bitiriyordu; karşılığın kendisi ("şartı kayıtlar gösteriyor")
             düşmüştü. Bölümün adı karşılık, satır uyarıda bitmemeli.
         KISA'nın cümleleri de canlı `gains.items[].line`'ın kısaltması:
         atılan kısım ya sayfanın takvimine yönlendirme ("yukarıdaki şerit
         onu gösteriyor") ya örnekleme ("gelir-gider tablosu, bilanço…"), YENİ
         İDDİA YOK. 45-68 karakter; 16,5 px Poppins'te doğal genişlikleri
         380 · 440 · 522 · 516 px ve F3'ün yeni metin kutusu 1440'ta 590 px,
         yani dördü de tek satır — ölçü css/lab-muhasebe.css · KARŞILIK. */
export const KARSILIK = {
  id: "fayda",
  heading: "Düzenli muhasebenin karşılığı.",
  accent: "karşılığı.",
  items: [
    { t: "Beyan takvimi kaçmıyor", s: "Hangi ay hangi kalemin doğduğu baştan belli." },
    {
      t: "Kâr ve zarar yıl kapanmadan görünüyor",
      s: "Aynı defterden çıkıyor: vergi için değil, kararlarınız için.",
    },
    {
      t: "Banka ve denetim hazır dosya buluyor",
      s: "İstenen belgeler hep aynı; ay ay tutulunca ayrıca hazırlanmıyor.",
    },
    {
      t: "%0 oranının dayanağı kaydın kendisi",
      s: "Nitelikli mükellefiyet otomatik gelmiyor; şartı kayıtlar gösteriyor.",
    },
  ],
};

export const FIYAT = {
  id: "fiyat",
  heading: "Muhasebe hizmetinin bedeli.",
  accent: "bedeli.",
  lead: "Herkeste aynı kalemler doğmuyor, o yüzden tek bir toplam yazmıyoruz.",
  cta: "Hangi kalemler bende doğuyor?",
};

/* SSS altıdan üçe indi: üç cevap sayfanın kendi metninin neredeyse birebir
   kopyasıydı (kayıt zorunluluğu, KDV herkese doğmuyor, bağımsız denetim). */
export const SSS_KALAN = [
  "Kurumlar vergisi %0 ise neden muhasebe gerekiyor?",
  "Kurumlar vergisi beyannamesi ne zaman veriliyor?",
  "Aylık ücret her şirkette aynı mı?",
];
