import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_NAME, FACTS, type CountrySlug } from "@/lib/brand";

/* ============================================================================
   LAB · ana sayfa §3 halka turu — ÜÇ ADAYIN ORTAK PARÇALARI

   Üç aday (UlkeHalka · UlkeUcHalka · UlkeHat) yalnızca disklerin arasından
   geçen çizgide ayrılıyor. Başlık, sütun gövdesi ve düz hat burada bir kez
   yazıldı; üçü de bunları çağırıyor.

   NEDEN ORTAK. Kıyasın konusu HAREKET. Her aday kendi satırını yazsaydı üç
   ayrı tasarım karşılaştırılırdı ve "halka bir şey katıyor mu" sorusu
   cevapsız kalırdı. Kopya da ayrı bir risk: bir adayda düzeltilen bir punto
   ötekinde eskir, müşteri farkı hareket sanardı.

   İÇERİK TAMAMEN VERİDEN. Bu dosyada tek bir cümle yazılmadı; dört alanın
   dördü de src/lib/brand.ts'ten okunuyor (COUNTRY_NAME, FACTS.tag,
   FACTS.structure, FACTS.days). Tutar bilerek YOK: canlı bölümün sözleşmesi
   "tutar fiyat bölümünde" ve halka turu o sözleşmeyi değiştirmiyor.

   Üçü de SUNUCU bileşeni — tarayıcıya bu bölümden tek satır JS inmiyor,
   useReducedMotion geçmiyor. Hareketin tamamı CSS ve reduce kapısı
   src/app/css/lab-uk4.css içinde.
   ========================================================================= */

/* SÜTUN SIRASI — AYNALANDI, KARAR VERİLMEDİ.

   Kaynağı src/components/Countries.tsx · ORDER ve orada gerekçesi de yazılı:
   sıra coğrafi değil editoryal, Dubai ortada çünkü firmanın ana ürünü o ve
   üç sütunlu bir dizide göz önce ortaya gidiyor. Canlı ThreeCountries de
   aynı diziyi oradan okuyor.

   NEDEN İMPORT EDİLMİYOR — SUNUCU/İSTEMCİ SINIRI. Countries.tsx bir "use
   client" modülü; sunucu bileşeninden oradaki bir DEĞERİ (bileşen değil,
   dizi) okumaya çalışmak diziyi değil bir istemci referansı vekilini
   döndürüyor ve `ORDER.map is not a function` ile patlıyor. Bileşen import
   etmek serbest, veri import etmek değil.

   İKİ SEÇENEK VARDI: üç adayı da "use client" yapmak (bölüm o zaman
   tarayıcıya JS indirirdi, oysa hareketin tamamı CSS) ya da diziyi burada
   aynalamak. İkincisi seçildi.

   DİKKAT: Countries.tsx'teki ORDER değişirse bu satır da elle değişmeli.
   Aday seçilip canlıya alındığında bu dosya silinecek ve kazanan yeniden
   asıl diziyi okuyacak — o gün ayrışma riski de biter. */
export const SAX_ORDER: CountrySlug[] = ["ingiltere", "dubai", "kktc"];

/* Canlı bölümün başlığı ve lead'inin ilk cümlesi, birebir. Lead'in kalan
   kısmı ("Tek tek bakın ya da temel ölçütlerde yan yana koyun…") alınmadı:
   o cümle görünüm değiştiriciyi anlatıyor ve adaylarda değiştirici yok. */
export function SaxHead() {
  return (
    <div className="sec-head">
      <h2 className="h2" style={{ color: "var(--text-900)" }}>
        Hizmet verdiğimiz ülkeler.
      </h2>
      <p className="sec-lead">Üç ülkede kuruluş, banka ve muhasebe.</p>
    </div>
  );
}

/* Diskin kendisi. Kap sabit pikselde (--sax-disc) çünkü Flag çıplak bir
   <svg viewBox="0 0 60 40">: width/height taşımıyor ve sınırlanmazsa
   300x150'ye açılıyor. Bu depoda iki sayfa tam bu yüzden çökmüştü. */
export function SaxDisc({ c, top }: { c: CountrySlug; top?: number }) {
  return (
    <span className="sax-disc" style={top === undefined ? undefined : { top }}>
      <Flag country={c} />
    </span>
  );
}

/* Sütunun disk altındaki gövdesi: ad, künye kutucuğu, yapı satırı, süre. */
export function SaxBody({ c }: { c: CountrySlug }) {
  return (
    <>
      <p className="sax-name">{COUNTRY_NAME[c]}</p>
      <span className="sax-tag">{FACTS[c].tag}</span>
      <p className="sax-line">{FACTS[c].structure}</p>
      <p className="sax-days">{FACTS[c].days}</p>
    </>
  );
}

/* Tek düz mavi çizgi ve üzerindeki git gel ışığı.

   İKİ ÖĞE: hat (.sax-hat-c) hiç değişmiyor, ışık (.sax-hat-i) onun üstünden
   geçiyor. Çizginin kendisinin sönüp yanması denendi ve bırakıldı — hat
   "bozuluyor" gibi okunuyordu.

   Işık iki background katmanı olarak TEK öğede: iki ayrı öğe olsalardı hale
   ile çekirdek turun ortasında birbirinden kayardı. Ayrıntı lab-uk4.css'te.

   aria-hidden: çizgi bir bilgi taşımıyor, üç ülkeyi ekranda diziyor. */
export function SaxHat() {
  return (
    <div className="sax-hat" aria-hidden="true">
      <span className="sax-hat-c" />
      <span className="sax-hat-i" />
    </div>
  );
}
