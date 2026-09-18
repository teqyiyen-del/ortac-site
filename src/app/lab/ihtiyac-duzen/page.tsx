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

/* İKİNCİ GEÇİŞ. Soru tarafı D2'de kaldı (Burak: "soru tarafını gece denemişsin
   ya o bi hoşuma gitmedi değil ya iyi duruyor"); açık kalan tek konu SONUÇ
   LİSTESİNİN tasarımı. Üç adayın da solu aynı gece panel, sağı farklı. */
const ADAYLAR = [
  {
    kod: "s1",
    ad: "S1 · Kutulu kalem",
    not: "En küçük müdahale: ince çizgiyle ayrılan satırlar kendi kutusuna girdi (navbarda da aynı kararı verdik: çizgiyle ayırmak bu siteye uymuyor). Düzen aynı — ad solda, hüküm ortada, tutar sağda.",
  },
  {
    kod: "s2",
    ad: "S2 · Hüküm önde, sıralı",
    not: "Hüküm satırın başına geçti: göz önce “gerekli mi” sorusunun cevabını görüyor. Kalemler ayrıca hükme göre sıralanıyor (gerekli → duruma bağlı → gerekmiyor); sıralama görsel, DOM sırası veri sırası olarak duruyor.",
  },
  {
    kod: "s3",
    ad: "S3 · Özet şeridi",
    not: "Üstteki tek satırlık özet (“4 kalem gerekli · 2 duruma bağlı”) gri bir cümle olmaktan çıkıp panelin gece başlığına dönüşüyor; rakamlar büyük. Liste S1'deki gibi kutulu.",
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
          <b>İkinci geçiş.</b> İlk turda iki tarafın nasıl ayrıldığı soruluyordu; Burak hedefi
          düzeltti — sorun renk ya da yerleşim değil, <b>sağdaki sonuç listesinin tasarımı</b>.
          Soru tarafının gece hâli (D2) beğenildi ve üç adayda da sabit.
        </p>
        <p>
          Üçünde de ortak bir karar var: <b>çizgi değil kutu</b>. Bugünkü liste satırları ince
          çizgiyle ayrılıyor; aynı turda navbar için bu açıkça reddedildi, kural burada da geçerli.
        </p>
        <p>
          Üç aday da <b>canlı bulucunun kendisi</b>: soru mantığı, seçenekler, hüküm kuralları ve
          fiyatlar birebir aynı — üçünü de doldurup kıyaslayabilirsin.
        </p>
      </div>

      {ADAYLAR.map((a) => (
        <section key={a.kod} className="lid-blok">
          <div className="container-o lid-kunye">
            <p className="lid-etiket">{a.ad}</p>
            <p className="lid-not">{a.not}</p>
          </div>
          <div data-duz="d2" data-sonuc={a.kod}>
            <AccountingNeeds id={`ihtiyac-${a.kod}`} />
          </div>
        </section>
      ))}
    </main>
  );
}
