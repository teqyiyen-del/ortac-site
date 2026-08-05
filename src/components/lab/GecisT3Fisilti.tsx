import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ADAY T3 (.gc3-) — TÜR: DUYUSAL · TAMAMEN GÖRSELSİZ
 *
 * ==========================================================================
 * BU ARALIĞA VERDİĞİ İŞ
 *
 * Hiçbir şey anlatmıyor. İşi bir NEFES: hero'nun gürültüsü bitiyor, sayfa
 * susuyor, sonra konu başlıyor. Müşterinin yönergesinin en uç okuması bu —
 * "tamamen konudan apayrı düşünerek herodan sonra konuya geçmeden önce ne
 * yapabiliriz".
 *
 * Ekranda iki kelime öbeği var ve ikisi de countryContent.tagline'ın kendi
 * parçaları (Dubai: "Serbest bölge · IFZA"). Nokta ayracı ekranda basılmıyor;
 * onun yerini bandın kendisi alıyor — iki öbek bandın iki ucunda duruyor ve
 * aradaki boşluk ayracın işini görüyor.
 *
 * SEÇİMİN SEBEBİ: tagline bu sayfada başka hiçbir yerde geçmiyor (ülke
 * kartlarında geçiyor, ülkenin kendi sayfasında geçmiyor), yani hero'yu ya da
 * altındaki bölümü tekrar etmiyor. Üstelik soldaki öbek Dubai'de tam olarak
 * bir alt bölümün konusu: yapı seçimi. Yani bandın son bıraktığı kelime,
 * sonraki bölümün ilk kelimesi.
 *
 * "Serbest bölge" hiçbir yerde başka bir şeye çevrilmiyor ve büyük harfe de
 * dönüştürülmüyor (text-transform yok) — dize ekranda veri dosyasındaki
 * hâliyle çıkıyor.
 *
 * ==========================================================================
 * GÖRSELSİZ, KELİMENİN TAM ANLAMIYLA
 *
 * Fotoğraf yok, SVG yok, ikon yok, çizgi yok, kenarlık yok, kutu yok. Ekranda
 * yalnızca tipografi, boşluk ve zemin var. Turdaki altı adaydan görsel
 * ögesi SIFIR olan tek aday bu.
 *
 * Bölümün tek "tasarım" hamlesi ZEMİN DEĞİŞİMİ: bant --paper (#f5f5f5) ve
 * kenardan kenara. Bu bilerek bir "yerleştirilmiş parça" DEĞİL — parçanın
 * tersi. Önceki turlarda kart + yarıçap kalıbı deneniyordu ve müşterinin
 * itirazı bölümün gereksiz DURMASIYDI; burada bölüm bir nesne olmaktan
 * çıkıp sayfanın zemininde bir duraklamaya dönüşüyor.
 *
 * ==========================================================================
 * HAREKET
 *
 * Ekranda tek bir şey var → "olabildiğince fazla" tarafındayız, ama bir
 * nefesin fazlası gürültü olur. Hareket TEK ve sürekli: harflerin üzerinden
 * geçen bir ışık (12 s, sonsuz), soldaki öbekten sağdakine doğru. Giriş
 * animasyonu değil, ekranda durduğu sürece süren bir salınım.
 *
 * Işık yalnızca MÜREKKEBİN KOYULUĞUNU değiştiriyor (--text-600 ↔ --text-900);
 * en açık karesinde bile kâğıt zeminde 6.14:1, yani her karede okunur.
 */

export default function GecisT3Fisilti({ country }: { country: Country; name: string }) {
  /* Ayraç ekranda basılmıyor, düzenin kendisi ayırıyor. Üç ülkenin üçünde de
     tagline tek bir "·" taşıyor; taşımasa da bölüm tek öbekle çalışıyor. */
  const parts = COUNTRY_CONTENT[country].tagline
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return null;

  return (
    <section className="gc3" aria-label={COUNTRY_CONTENT[country].tagline}>
      <div className="container-o">
        <div className="gc3-band">
          {parts.map((w, i) => (
            <span key={w} className="gc3-w" style={{ "--i": i } as React.CSSProperties}>
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
