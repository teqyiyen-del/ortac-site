import Image from "next/image";
import { COUNTRY_PHOTO } from "@/lib/media";
import { FACTS } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ADAY C3 (.ci3-) — "DİKİŞ": bölüm değil, geçiş.
 *
 * FİKİR
 * Müşterinin ikinci yönü şuydu: "sırf görsel koycaz diye böyle bir kısma hiç
 * girmeyebiliriz." C3 o cümleyi sonuna kadar götürmeden hemen önce duruyor —
 * bölümü SİLMİYOR, bölüm olmaktan çıkarıyor. Geriye kalan şey bir yüzey değil
 * bir dikiş: gece zeminden beyaz karar bölümüne geçerken ekranın gördüğü ince
 * bir yarık, altında tek satırlık bir levha ve nereye gidildiğini söyleyen bir
 * işaret. Ziyaretçi burada okumuyor, geçiyor.
 *
 * NEDEN AYRI BİR FİKİR (C1'in kısa hâli değil)
 * C1 bir OLAY: bandın kendisi içerik, ziyaretçi bir saniye duruyor. C3 bir
 * NOKTALAMA: hiçbir şey iddia etmiyor, hiçbir şey göstermeye çalışmıyor,
 * yalnızca iki bölümün birbirine çarpmasını engelliyor ve sayfanın ilk kararını
 * adıyla duyuruyor ("Sırada: yapı seçimi"). Bugünkü hâlin sorunu boşluğu
 * doldurmaya çalışıp elinde iki satır künyeyle kalmasıydı; C3 boşluğu
 * doldurmayı reddediyor.
 *
 * BEDELİ AÇIK: burada fotoğraf var ama VİTRİN yok. Müşteri bu bölümü vitrin
 * gibi kullanmak istiyorsa C3 istediği şey değil — C3, "hiç olmasın"a evet
 * demeden önce bakılacak son durak.
 *
 * METİN NEREDEN GELİYOR (yeni tek bir olgu yok)
 *   · levha   → ülkenin adı + lib/brand.ts · FACTS[c].structure (sayfanın
 *                başka hiçbir yerinde basılmıyor)
 *   · işaret  → sayfanın kendi akışı: Dubai'de bir sonraki bölüm yapı seçimi
 *                (countryContent.structures dolu), diğer iki ülkede avantajlar.
 *                Yani veriden türüyor, elle yazılmış bir sıra değil.
 * Rakam, oran, süre, tutar YOK.
 *
 * FOTOĞRAF
 * lib/media.ts · COUNTRY_PHOTO, alt="" ve dekoratif. Yarık kasten alçak:
 * fotoğraf burada bir manzara değil bir DOKU — üstünde metin taşımıyor, o
 * yüzden "bizim ofisimiz" okuması kurulamıyor; künye satırı yine de duruyor.
 *
 * HAREKET
 * Hiç yok — FadeUp bile yok. Bir dikişin belirmesi gerekmiyor; belirirse
 * dikiş olmaktan çıkıp bölüm olur. CSS animasyonu ve useReducedMotion yok;
 * bileşen sunucu bileşeni.
 */

export default function CountryIntroC3({ country, name }: { country: Country; name: string }) {
  const facts = FACTS[country];
  /* Sayfanın akışından türüyor: structures dolu olan tek ülke Dubai ve orada
     giriş bölümünün altındaki bölüm CountryStructures. Diğer ikisinde o bölüm
     hiç basılmıyor, sıradaki CountryPros. */
  const next = COUNTRY_CONTENT[country].structures ? "yapı seçimi" : "ülkenin avantajları";

  return (
    <section className="ci3">
      {/* Taşma zinciri C1'dekiyle aynı: .ci3 blok → .ci3-slit width:100% +
          overflow:hidden → next/image fill kabın dışına çıkamıyor. */}
      <div className="ci3-slit">
        <Image
          src={COUNTRY_PHOTO[country]}
          alt=""
          fill
          sizes="100vw"
          className="ci3-img"
          unoptimized
        />
        {/* Üst kenar gece zeminden devralıyor: hero yarığa akıyor, çarpmıyor. */}
        <span className="ci3-fade" aria-hidden="true" />
      </div>

      <div className="container-o">
        <div className="ci3-row">
          <p className="ci3-name">
            {name}
            <span className="ci3-tag">{facts.structure}</span>
          </p>
          <p className="ci3-next">Sırada: {next}</p>
        </div>
        <p className="ci3-note">Görsel ülkeyi temsil ediyor; firmanın kendi çekimi değil.</p>
      </div>
    </section>
  );
}
