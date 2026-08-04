import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ADAY C2 (.ci2-) — "KAPIDAKİ TABELA": fotoğrafsız, kısa, okura dönük.
 *
 * FİKİR
 * Müşterinin verdiği ilk yön "neden dubai gibi bir şey yazılabilir" idi. Ama
 * ülkeyi SAVUNAN cümle bu bölümde kurulamıyor: o cümle hero'nun lead'inde
 * (countryContent.intro) zaten yazılı ve aynı ekranın iki ucunda iki kez
 * okunurdu. C2 o yüzden soruyu tersine çeviriyor — ülkeyi değil ZİYARETÇİYİ
 * konu ediyor. "Neden burası" sorusunun tekrar etmeyen tek hâli şu: "burası
 * kimin için, siz o kişi misiniz".
 *
 * Bölüm bu yüzden vitrin sayılıyor: künye bir nesneyi tarif eder, tabela
 * okuyana seslenir. Dört satır ikinci tekil şahıs — "…yapıyorsanız" — yani
 * ziyaretçi kendi cümlesini görüyor ve bir saniyede içeri girip girmeyeceğine
 * karar veriyor.
 *
 * NİYE FOTOĞRAF YOK
 * Bilerek. Üç aday arasında gerçek bir seçim çıksın diye biri fotoğrafsız:
 * müşteri "bu boşluk fotoğrafa mı yoksa tek bir doğru cümleye mi değer"
 * sorusunu ancak ikisini yan yana görünce cevaplayabilir. Bunun bir bedeli
 * var ve saklanmıyor: C2 seçilirse ülke sayfasının tek fotoğrafı kalmıyor,
 * fotoğrafın yeri başka bir bölüme taşınmak zorunda.
 *
 * ZEMİN GECE
 * Bölüm hero'nun siyahını sürdürüyor, kendi zemini yok. Sebebi: dört satırlık
 * bir metin bloğu kendi başına bir bölüm kurmaya yetmez — kâğıt veya beyaz bir
 * bantta durursa "ufak bir bölüm" gibi görünür ve bugünkü künyenin hatasını
 * tekrarlar. Siyahın üstünde ise girişin son nefesi gibi okunuyor: hero
 * bitmeden önce sorulan son soru.
 *
 * METİN NEREDEN GELİYOR (yeni tek bir olgu yok)
 *   · dört satır → lib/countryContent.ts · fitTable, yalnızca ok:true
 *                   satırların `you` alanı (üç ülkede de tam dört tane)
 * `profile` (isim tamlaması) değil `you` (ikinci tekil şahıs) seçildi: künye
 * ile tabelanın farkı tam olarak bu. Aynı veri sayfanın çok aşağısında
 * CountryFit'te gerekçeleriyle ve seçilebilir hâlde açılıyor; buradaki
 * önizleme onun yerine geçmiyor, kapanış satırı oraya işaret ediyor.
 * Rakam, oran, süre, tutar YOK.
 *
 * HAREKET
 * Yalnızca SplitWords + FadeUp — sitenin standart açılışı. CSS animasyonu ve
 * useReducedMotion yok; bileşen sunucu bileşeni.
 */

export default function CountryIntroC2({ country, name }: { country: Country; name: string }) {
  const rows = COUNTRY_CONTENT[country].fitTable.filter((row) => row.ok);

  return (
    <section className="ci2">
      <div className="container-o">
        <p className="ci2-over">{name}</p>

        <SplitWords
          as="h2"
          text="Burası size göre mi?"
          accent="size göre mi?"
          accentColor="var(--blue-500)"
          className="h2 ci2-h"
        />

        <FadeUp delay={0.18}>
          <ul className="ci2-list">
            {rows.map((row) => (
              <li key={row.profile} className="ci2-i">
                {row.you}
              </li>
            ))}
          </ul>

          {/* Kapanış bir uyarı değil, sayfanın duruşu: "hayır" cevabı da bu
              sayfada var ve nerede olduğu söyleniyor. */}
          <p className="ci2-foot">
            Bunlardan biri sizseniz cevap evet. Değilseniz onu da yazıyoruz — aşağıda profil
            profil, gerekçesiyle.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
