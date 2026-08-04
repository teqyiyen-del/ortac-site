import Image from "next/image";
import FadeUp from "@/components/shared/FadeUp";
import { COUNTRY_PHOTO } from "@/lib/media";
import { FACTS } from "@/lib/brand";
import type { Country } from "@/lib/store";

/* ADAY C1 (.ci1-) — "VİTRİN CAMI": tam genişlik fotoğraf bandı.
 *
 * FİKİR
 * Bu bölümün argüman söyleme hakkı yok — ülkenin başlık iddiası ekranın
 * yukarısında, hero'nun lead'inde zaten yazılı (countryContent.intro). Aynı
 * iddiayı iki ekran arayla ikinci kez söylemek, bugünkü künye satırlarından
 * daha kötü olurdu: tekrar, kuruluğun üstüne bir de güvensizlik ekler.
 * O yüzden C1 konuşmuyor, GÖSTERİYOR. Bölüm bir kare değil bir BANT: kenardan
 * kenara, tek bakışta yutulan, ziyaretçiyi bir saniye tutup bırakan bir yüzey.
 *
 * NEDEN VİTRİN SAYILIYOR (müşterinin "sırf görsel koycaz" itirazına cevap)
 * Bugünkü hâlde fotoğraf metnin YANINDA duruyor, yani bölüm "bilgi veriyorum"
 * diyor ama iki satır künye veriyor — görsel de o zayıf iddianın süsü gibi
 * kalıyor. Burada bölüm iddiasını baştan bırakıyor: yüzeyin kendisi içerik.
 * Üstünde tek bir künye satırı var (kurulacak yapı) ve o satır levha gibi,
 * yani fotoğrafın altına iliştirilmiş bir açıklama değil.
 *
 * GEÇİŞ
 * Bandın üst kenarı gece zeminden (hero) devralıyor: siyah, karenin içinde
 * eriyor. Yani hero bitmiyor, fotoğrafa dönüşüyor. Alt kenar tersine
 * koyulaşıyor — hem levhanın okunması için hem de aşağıdaki BEYAZ bölümle
 * arasında keskin, kasıtlı bir kesim olsun diye.
 *
 * METİN NEREDEN GELİYOR (yeni tek bir olgu yok)
 *   · ülke adı  → sayfanın kendi başlığındaki ad
 *   · künye     → lib/brand.ts · FACTS[c].structure — sayfanın başka hiçbir
 *                 yerinde basılmıyor (hero'nun vektör sahnesi forWhom basıyor,
 *                 structure değil), yani tekrar değil.
 * Rakam, oran, süre, tutar YOK: buradan kaldırılan dört rakamlı şerit aynı
 * yere kılık değiştirip geri gelmesin diye.
 *
 * FOTOĞRAF
 * lib/media.ts · COUNTRY_PHOTO — sitenin geri kalanıyla aynı havuz, yeni adres
 * yok. alt="" ve dekoratif; künye satırı "firmanın kendi çekimi değil" diyor,
 * yani büyük punto ad bir yer iddiası değil bir levha. KKTC'nin karesi bugün
 * Girne değil bir Akdeniz kıyısı (media.ts'te not düşülü) — künye satırı tam
 * olarak bu yüzden duruyor ve müşterinin kendi çekimi geldiğinde tek satır
 * media.ts'te değişecek, burası değişmeyecek.
 *
 * HAREKET
 * Süregiden animasyon yok, CSS animasyonu yok. Açılış hareketi yalnızca
 * FadeUp — sitenin geri kalanıyla aynı. useReducedMotion kullanılmıyor
 * (bu depoda dört ayrı kalıpta hidrasyon hatası çıkardı), bileşen sunucu
 * bileşeni olarak kalıyor.
 */

export default function CountryIntroC1({ country, name }: { country: Country; name: string }) {
  const facts = FACTS[country];

  return (
    <section className="ci1">
      {/* Bant .container-o'nun DIŞINDA: kenardan kenara. Taşma zinciri —
          .ci1 blok (genişliği yok) → .ci1-band width:100% + overflow:hidden →
          next/image fill kabın dışına çıkamıyor. Negatif marj ve 100vw yok. */}
      <div className="ci1-band">
        <Image
          src={COUNTRY_PHOTO[country]}
          alt=""
          fill
          sizes="100vw"
          className="ci1-img"
          unoptimized
        />
        <span className="ci1-top" aria-hidden="true" />
        <span className="ci1-foot" aria-hidden="true" />

        {/* Levha bandın içinde ama metni .container-o hizasında: sayfanın
            bütün bölümleriyle aynı sol kenardan başlıyor. */}
        <div className="ci1-plate">
          <div className="container-o">
            <FadeUp>
              <p className="ci1-name">{name}</p>
              <p className="ci1-line">{facts.structure}</p>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Künye bandın DIŞINDA, beyazın üstünde: fotoğrafın üstüne binen bir
          uyarı, uyarı olmaktan çıkıp tasarım öğesine dönüşüyordu. */}
      <div className="container-o">
        <p className="ci1-note">Görsel ülkeyi temsil ediyor; firmanın kendi çekimi değil.</p>
      </div>
    </section>
  );
}
