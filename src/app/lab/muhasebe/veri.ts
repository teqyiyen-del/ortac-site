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
 *   · "Düzenli muhasebenin karşılığı" büyüsün ve göze çarpsın — "burası
 *     önemli bir kısım bence."
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
   Sol sütun: dört ikonlu karo. Müşteri bu biçimi bir önceki turda beğendi
   ("senin labdaki girişte 4 tane box var ya ikonlarıyla, ora gibi
   düşünerek yapabilirsin").

   Sağ sütun: yapmadıklarımız. Canlı sayfada bu liste iki bölüm ötede bir
   <details> şeridinin arkasındaydı ve kapalıyken görünen tek cümle
   "Kapsamadığı, kapsadığı kadar önemli." idi — bilgi taşımayan bir vecize.
   İkisi yan yana gelince ziyaretçi sınırı kapsamla aynı anda görüyor.

   İKİ LİSTE DE UYDURULMADI: sağdaki `limits.items`'ın başlıkları, soldaki
   hero kartının kendi dört adı. */
export const KAPSAM = {
  id: "kapsam",
  heading: "Ne yapıyoruz, ne yapmıyoruz.",
  accent: "ne yapmıyoruz.",
  var: [
    { ad: "Defter", line: "Fatura, gider, banka mutabakatı" },
    { ad: "KDV", line: "Üç ayda bir beyanname" },
    { ad: "Rapor", line: "Gelir-gider, bilanço, nakit akış" },
    { ad: "Arşiv", line: "Banka ve denetim dosyası hazır" },
  ],
  yokBaslik: "Aylık ücrete dahil değil",
  yok: [
    "Yıl sonu beyanı",
    "Bağımsız denetim",
    "Bordro",
    "Kurumlar vergisi kaydı",
    "KDV kaydı",
    "Kişiye özel vergi görüşü",
  ],
  /* Dördü fiyat listesinde ayrı satır olarak duruyor; tek satırlık bu not
     onu söylüyor ki sağ sütun bir ret listesi gibi okunmasın. */
  yokNot: "Dördü fiyat listesinde ayrı satır olarak duruyor.",
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

   Dört başlık canlı veriden; cümleler kısaldı çünkü tipografi büyüdü.
   Canlı hâllerinde ortalama 95 karakterdi, burada 45.

   LEAD SİLİNDİ: "Dördü de bir vaat değil, kaydın ay ay tutulmasının doğrudan
   sonucu." Sayfa kimsenin yöneltmediği bir suçlamaya karşı kendini
   savunuyordu. */
export const KARSILIK = {
  id: "fayda",
  heading: "Düzenli muhasebenin karşılığı.",
  accent: "karşılığı.",
  items: [
    { t: "Beyan takvimi kaçmıyor", s: "Hangi ay hangi kalemin doğduğu baştan belli." },
    { t: "Kâr ve zarar yıl kapanmadan görünüyor", s: "Vergi için değil, sizin kararınız için." },
    { t: "Banka ve denetim hazır dosya buluyor", s: "Ay ay tutulunca ayrıca hazırlanmıyor." },
    { t: "%0 oranının dayanağı kaydın kendisi", s: "Nitelikli mükellefiyet otomatik gelmiyor." },
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
