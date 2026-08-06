import FadeUp from "@/components/shared/FadeUp";
import { Flag } from "@/components/shared/CountryPicker";
import { CHAIN } from "@/lib/brand";
import { FOR_WHOM, SUMMARY, WHERE } from "@/lib/about";
import { SECTOR_ICON } from "@/components/lab/aboutBentoIcons";

/* ============================================================================
   LAB · ADAY 6 · "MÜHÜR"
   Biçim: src/app/css/lab-hb6.css (ad alanı .hb6-)

   ------------------------------------------------------------------- FİKİR
   Izgarayı tamamen bırakıyor. Bento dört karo değil TEK BİR NESNE: firmanın
   yaptığı işin bir amblemi. Dış halkada altı sektör işareti, iç halkada
   zincirin beş halkası, çekirdekte üç bayrak; iki halka birbirinin tersine,
   çok yavaş dönüyor. Ambleme soldan bir enerji geliyor, mühür yanıyor,
   sağdan çıkıyor.

   Bu adayın tezi şu: müşteri "bento anlatmasın, tasarım olsun" diyorsa en
   dürüst cevap bentoyu bir bilgi ızgarası olmaktan çıkarıp bir İŞARETE
   çevirmek. Kart yoksa karta doldurulacak metin de yok.

   ----------------------------------------------------- SIFIR GÖRÜNÜR METİN
   Bloğun ekranda TEK BİR KARAKTERİ YOK. Rakam da yok: üç sayı (3 · 5 · 6)
   nesnelerin kendi sayısı olarak duruyor, yazıyla tekrarlanmıyor. Sayfanın
   aşağısındaki bölümlerle tekrar ihtimali böylece sıfır.

   ------------------------------------------ NEDEN BU KADAR ÇOK HAREKET VAR
   Müşterinin kuralı iki yönlü: "ekranda çok svg kısım varsa hepsinde olsun
   ama minimal... tek ya da 2 tane gözüküyorsa olabildiğince fazla." Bu
   adayda ekranda TEK bir sahne var, o yüzden kuralın ikinci yarısı geçerli:
   hareket bol. On sekiz sonsuz animasyon, dört ayrı mekanik, hiçbir an duruş
   yok. Diğer iki aday kuralın birinci yarısında.

   ---------------------------------------------------------- NEYİ FEDA EDİYOR
   Bento olmayı. Eşit olmayan hücre, ton karşıtlığı ve "her karonun kendi
   mekaniği" ölçütü burada karşılanamıyor çünkü karo yok. İkinci bedel:
   bölüm gece ve hakkımızda sayfasında hemen ardından gelen "Üç ülkede
   çalışıyoruz" bölümü de gece; bu aday seçilirse ikisinden birinin zemini
   değişmeli.

   -------------------------------------------------------------- ERİŞİM
   Görünür metin olmadığı için sahne bir GÖRSEL olarak duyuruluyor:
   role="img" ve aria-label. Etiketin kelimeleri uydurulmuyor, about.ts ·
   SUMMARY'den ve dizi uzunluklarından geliyor. İçerideki hiçbir işaret ayrıca
   okunmuyor; role="img" alt ağacı kapatıyor ve bu tam olarak istenen şey.
   ========================================================================= */

export default function AboutBentoMuhur() {
  const AD = Object.fromEntries(SUMMARY.map((s) => [s.k, s.label]));

  /* Ekran okuyucunun duyduğu tek satır. Sayılar dizilerin uzunluğu, kelimeler
     about.ts'ten; bu dosyada yazılmış tek bir olgu iddiası yok. */
  const etiket = [
    `${WHERE.countries.length} ${AD.where}`,
    `${CHAIN.length} ${AD.chain}`,
    `${FOR_WHOM.sectors.length} ${AD.sectors}`,
  ].join(" · ");

  /* Açı diziden: altı işaret 60 derece, beş halka 72 derece arayla. Elle
     yazılmış açı yok — bir sektör eklendiğinde çember kendiliğinden yeniden
     bölünüyor. */
  const aci = (i: number, n: number) => `${(i * 360) / n}deg`;

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <FadeUp y={18} delay={0.06}>
          {/* `akt` KABIN üstünde: aktarim kalıbı turu kabın hover'ında
              duraklatıyor. Değişkenler lab-hb6.css'te. */}
          <div className="hb6 akt" role="img" aria-label={etiket}>
            {/* Enerjinin geldiği ve gittiği eksen. Amblemin iki yanında
                duruyor, altından geçmiyor: mühür ışığı alıp veren şey. */}
            <span className="hb6-hat hb6-hat-sol akt-durak" />
            <span className="hb6-hat hb6-hat-sag akt-durak" />

            <div className="hb6-muhur">
              <span className="hb6-rim akt-durak" />
              <span className="hb6-cizik" />
              <span className="hb6-nabiz" />

              {/* ---- dış halka · altı sektör ----
                  Glifler sayfanın sektör bölümündekilerle AYNI. Adları yok:
                  altı sektörün adı da cümlesi de sayfanın 6. bölümünde. */}
              <div className="hb6-halka hb6-halka-dis">
                {FOR_WHOM.sectors.map((s, i) => {
                  const Icon = SECTOR_ICON[s.slug];
                  return (
                    <span
                      key={s.slug}
                      className="hb6-yor"
                      style={
                        { "--hb6-a": aci(i, FOR_WHOM.sectors.length) } as React.CSSProperties
                      }
                    >
                      {/* Üç katman ŞART: yörünge döndürür, sabit katman
                          işareti dik tutar, işaretin kendisi halkanın
                          dönüşünü geri alır. transform tek bir özellik
                          olduğu için üçü aynı ögede toplanamıyor. */}
                      <span className="hb6-sabit">
                        <span className="hb6-mim">
                          {Icon ? <Icon size={18} strokeWidth={1.7} /> : null}
                        </span>
                      </span>
                    </span>
                  );
                })}
              </div>

              {/* ---- iç halka · zincirin beş halkası ---- */}
              <div className="hb6-halka hb6-halka-ic">
                {CHAIN.map((s, i) => (
                  <span
                    key={s.key}
                    className="hb6-yor hb6-yor-ic"
                    style={{ "--hb6-a": aci(i, CHAIN.length) } as React.CSSProperties}
                  >
                    <span className="hb6-sabit">
                      <span className="hb6-dugum" />
                    </span>
                  </span>
                ))}
              </div>

              {/* ---- çekirdek · üç bayrak ----
                  BAYRAK TUZAĞI: `Flag` width/height taşımayan çıplak bir
                  <svg viewBox="0 0 60 40"> döndürüyor; kabı ölçülmezse
                  300 × 150'ye açılıyor ve bu sayfa bir kez tam bu yüzden
                  çöktü. .hb6-bayrak sabit piksel (lab-hb6.css). */}
              <div className="hb6-cekirdek akt-durak">
                {WHERE.countries.map((c) => (
                  <span key={c.slug} className="hb6-bayrak akt-durak">
                    <Flag country={c.slug} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
