import type { Metadata } from "next";

import AccountingNeeds from "@/components/services/AccountingNeeds";

/* /lab/ihtiyac-duzen — "Bana hangi hizmetler gerekiyor?" bloğunun düzeni.

   18.09.2026 · Burak: "bana hangi hizmetler kısmının ss attığım yerin layoutu
   ve tasarımında beğenmediğim şeyler var, birbirinden ayrışmıyorlar ve baya
   sıkış tıkış gibi sanki bilemedim bi bak ona, ilk başlarda daha iyiydi
   sanki."

   Ölçülen durum: soru akışı ile sonuç listesi TEK kartın iki yarısı; aralarında
   ne boşluk ne çizgi var, yalnız 5 birimlik bir zemin farkı (#fff / #f5f5f5).
   1000 px'te iki sütun yan yana geldiğinde soru tarafına 440 px düşüyor, yani
   "sıkış tıkış" hissinin ikinci kaynağı genişlik.

   ÜÇ ADAY DA CANLI BULUCUNUN KENDİSİ. Sayfa aynı bileşeni üç kez basıyor;
   css/lab-ihtiyac-duzen.css yalnız düzen ve yüzey bildiren satırları eziyor.
   Soru mantığı, seçenekler, hüküm kuralları ve fiyatlar birebir canlıdaki —
   üçünü de gerçekten doldurup kıyaslayabilirsin.

   Bölüm id'si bileşene dışarıdan veriliyor (id prop'u), yoksa üç kopya da
   "ihtiyac" olur ve belgede yinelenen id oluşurdu. */

export const metadata: Metadata = {
  title: "İhtiyaç bulucu düzeni · adaylar | Ortac Global",
  robots: { index: false, follow: false },
};

const ADAYLAR = [
  {
    kod: "d1",
    ad: "D1 · İki ayrı kart",
    not: "En küçük müdahale: tek kart ikiye ayrıldı. Her taraf kendi çerçevesini aldı, aralarına 20 px girdi, dolgu 28-30'dan 34'e çıktı. Renk dili hiç değişmedi.",
  },
  {
    kod: "d2",
    ad: "D2 · Soru tarafı gece",
    not: "Ayrım artık zemin farkı değil, iki ayrı malzeme: soru gece (“size soruyoruz”), liste kâğıt (“size çıkan sonuç”). Sık sorulanlarda bu turda kurulan dille aynı yönde.",
  },
  {
    kod: "d3",
    ad: "D3 · Soru üstte, liste altta",
    not: "Yan yana iki dar sütun yerine iki tam genişlik katı. Soru da liste de bütün genişliği alıyor; seçenekler yan yana iki sütuna açılıyor.",
  },
];

export default function IhtiyacDuzenLab() {
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · ihtiyaç bulucu düzeni</span>
        <h1>Hangi hizmetler bloğunun düzeni</h1>
        <p>
          Bugün soru akışı ile sonuç listesi <b>tek kartın iki yarısı</b>. Aralarında ne boşluk var
          ne çizgi — yalnız 5 birimlik bir zemin farkı. 1000 px&apos;te iki sütun yan yana gelince
          soru tarafına 440 px düşüyor; &quot;sıkış tıkış&quot; hissinin ikinci kaynağı bu.
        </p>
        <p>
          Üç aday da <b>canlı bulucunun kendisi</b>: soru mantığı, seçenekler, hüküm kuralları ve
          fiyatlar birebir aynı. Değişen tek şey iki tarafın nasıl ayrıldığı ve ne kadar nefes
          aldığı — üçünü de doldurup kıyaslayabilirsin.
        </p>
      </div>

      {ADAYLAR.map((a) => (
        <section key={a.kod} className="lid-blok">
          <div className="container-o lid-kunye">
            <p className="lid-etiket">{a.ad}</p>
            <p className="lid-not">{a.not}</p>
          </div>
          <div data-duz={a.kod}>
            <AccountingNeeds id={`ihtiyac-${a.kod}`} />
          </div>
        </section>
      ))}
    </main>
  );
}
