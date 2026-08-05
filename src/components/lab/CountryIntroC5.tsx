import Image from "next/image";
import FadeUp from "@/components/shared/FadeUp";
import { COUNTRY_PHOTO } from "@/lib/media";
import { FACTS } from "@/lib/brand";
import type { Country } from "@/lib/store";

/* ADAY C5 (.ci5-) — "EŞİK": beyazın üstüne KONMUŞ tek kart, sağında fotoğraf.
 *
 * MÜŞTERİNİN İKİNCİ YÖNÜ, BİREBİR
 * "genel bakış kısmı verip solda bir kaç şey gösterip sağda görsel
 * bırakabiliriz" ve "yine radius fln olur buraya koyulmuş bir part gibi".
 * C5 tam olarak bu: sayfaya yerleştirilmiş, köşeleri yuvarlatılmış tek bir
 * kart. Fotoğraf kartın İÇİNDE ve kartın yarıçapıyla kesiliyor — bölümün
 * zemini değil, kartın bir parçası.
 *
 * CANLI SÜRÜMDEN VE C1'DEN FARKI (üçünün geometrisi üç ayrı şey)
 *   canlı  · fotoğraf bölümün zemini, kenardan kenara, üstünde gece perde,
 *            ızgara ve glow → ekranda ikinci bir hero.
 *   C1     · fotoğraf kenardan kenara bir BANT, metin kendi kapsayıcısında.
 *   C5     · fotoğraf kabın içinde, kap container-o'nun içinde, zemin BEYAZ.
 * Yani bu aday "aynı fikrin üçüncü tonu" değil: hero'nun dilinden (gece +
 * ızgara + glow) tamamen çıkıyor, sayfanın kendi beyaz dilinde konuşuyor.
 *
 * BÖLÜMÜN KENDİNE AİT İŞİ — "KURULAN ŞEYİN ADI"
 * Kartta üç şey var ve üçü de hero'da geçmiyor:
 *   1. Ülkenin adı, levha büyüklüğünde ama hero'nun başlığından küçük.
 *   2. Kurulan yapı (lib/brand.ts · FACTS.structure) tek bir pul olarak.
 *      Bu, ülke sayfasında BAŞKA HİÇBİR YERDE basılmayan tek olgu — hero
 *      "neden burası" diyor, bu satır "burada elinizde ne oluyor" diyor.
 *      Etiket + değer çifti olarak DEĞİL tek pul olarak duruyor, çünkü
 *      müşterinin reddettiği şey tam olarak künye kalıbıydı ("Kurulan yapı:
 *      … / Kimin için: …" iki satırlık tanım listesi).
 *   3. Sayfanın ne yapacağını söyleyen tek cümle. İddia değil, sözleşme.
 * Bugünkü bölümün ikinci künye satırı (fitTable önizlemesi) BİLEREK yok:
 * o veri sayfanın çok aşağısında CountryFit'te kendi bölümüyle açılıyor ve
 * girişte ikinci bir liste açılınca bölüm yine "özet"e dönüyordu.
 *
 * FOTOĞRAF — ÜSTÜNDE HİÇBİR METİN YOK, VE BU BİR ÖLÇÜM KARARI
 * Canlı sürümde metin fotoğrafın üstünde duruyor; okunabilirlik bir perdenin
 * alfasına bağlı ve kare değişirse ölçüm baştan yapılmak zorunda. Burada
 * metin ile kare YAN YANA: bütün metin beyaz zeminin üstünde, yani kontrast
 * fotoğraftan tamamen bağımsız. Bu soyut bir güvence değil — üç karenin
 * üçüncüsü (KKTC) neredeyse tamamen açık tonlu bir kıyı karesi; canlı
 * kalıpta en zorlayan kare o, burada hiç sorun çıkarmıyor.
 *
 * Kaynak lib/media.ts · COUNTRY_PHOTO; buraya yeni bir adres yazılmadı.
 * Kareler açılıp bakıldı: Dubai — Burj Khalifa ve Şeyh Zayed kavşağı, alacakaranlık;
 * İngiltere — Tower Bridge, arkada City; KKTC — gün doğumunda bir kıyı
 * (media.ts'te "stand-in for Girne" notu duruyor, Girne'nin kendisi değil).
 * Üçü de dekor: alt="" ve künye satırı fotoğrafın temsilî olduğunu yazıyor.
 * unoptimized, çünkü next.config.ts'te images.remotePatterns tanımlı değil —
 * depodaki bütün uzak görseller böyle basılıyor.
 *
 * HAREKET
 * Yalnızca FadeUp. Başlıkta SplitWords kullanılmadı: tek kelimelik bir levha
 * kelime kelime açılamıyor, ayrıca noktanın rengi ayrı bir öge. CSS'te
 * süregiden animasyon yok, useReducedMotion yok; sunucu bileşeni.
 */

export default function CountryIntroC5({ country, name }: { country: Country; name: string }) {
  const facts = FACTS[country];

  return (
    <section className="ci5">
      <div className="container-o">
        <figure className="ci5-fig">
          <div className="ci5-card">
            <div className="ci5-copy">
              <FadeUp y={18}>
                <h2 className="ci5-h">
                  {name}
                  <span className="ci5-dot">.</span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.12} y={18}>
                {/* Sayfanın hiçbir yerinde basılmayan tek olgu. Pul, künye
                    değil: etiketi yok, tek satır, tek kutu. */}
                <p className="ci5-chip">{facts.structure}</p>

                <p className="ci5-line">
                  Aşağısı tek bir işi yapıyor: {name}&apos;de şirket kurmayı baştan sona yazmak.
                </p>
              </FadeUp>
            </div>

            {/* Kare kartın içinde; kesme kartın overflow'unda, negatif marj
                veya 100vw yok (ikisi de bu depoda yatay kaydırma üretti). */}
            <div className="ci5-media" aria-hidden="true">
              <Image
                src={COUNTRY_PHOTO[country]}
                alt=""
                fill
                sizes="(min-width: 900px) 46vw, 92vw"
                className="ci5-img"
                unoptimized
              />
            </div>
          </div>

          {/* Künye kartın DIŞINDA, beyazın üstünde: fotoğrafın üstüne binen
              bir uyarı, uyarı olmaktan çıkıp tasarım öğesine dönüşüyor. */}
          <figcaption className="ci5-cap">
            Görsel ülkeyi temsil ediyor; firmanın kendi çekimi değil.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
