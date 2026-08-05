import FadeUp from "@/components/shared/FadeUp";
import { FACTS } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ADAY O1 (.co1-) — "DOSYA": beyaza konmuş tek kart, solda künye rayı,
 * sağda ülkenin öne çıkanları numaralı bir kütük olarak.
 *
 * ==========================================================================
 * MÜŞTERİNİN YENİ YÖNÜ — BÖLÜME İLK KEZ GERÇEK BİR İŞ VERİLİYOR
 *
 * "ben ülke giriş kısmı asla hoşuma gitmiyor gereksiz bir kısım gibi
 * hissettiriyor herodan farksız. direkt o kısımda böyle dubainin en öne çıkan
 * avantajlarını fln mı vererek girsek. dubaiye genel bakış gibi düşün."
 *
 * Dört turdur bu aralık kuru duruyordu ve sebebi tasarım değildi: bölümün
 * söyleyecek sözü yoktu. C4 sayfanın sırasını, C5 kurulan yapının adını,
 * C6 ülkenin üç ülke içindeki yerini anlatmayı denedi — üçü de bölüme bir iş
 * UYDURMAK zorunda kaldı. Müşterinin yönü düğümü çözüyor: bölüm ülkenin
 * avantajlarını versin. Bu, aralığın ilk gerçek işi.
 *
 * ==========================================================================
 * ÇELİŞKİ VE ÇÖZÜMÜ — AVANTAJLAR SAYFADA ZATEN VARDI
 *
 * `pros` bugün bir bölüm aşağıda CountryPros bento'sunda basılıyor. Aynı
 * listeyi iki kez basmak bölümü yine "gereksiz" yapardı, bu sefer başka bir
 * sebeple. O yüzden O1 avantajları BÖLÜŞMÜYOR, DEVRALIYOR: `title` ve `line`
 * burada tam hâliyle duruyor, aşağıdaki bento kalkıyor.
 *
 * Kalkan bento'nun bıraktığı boşluk boş kalmıyor. `countryContent.watchouts`
 * bu depoda ŞU AN HİÇBİR YERDE BASILMIYOR (CountryPros yorumu: "Kalemler
 * silinmedi … bu ızgaradan çıktı"; countryContent yorumu: "aynı kalemler
 * kendi başlarına bir bölüm olarak geri gelecek"). Aşağıdaki slot o bölüm
 * oluyor. Yani sayfa tek satır bilgi kaybetmiyor, tersine kullanılmayan bir
 * içerik geri geliyor. Ayrıntı raporda.
 *
 * ==========================================================================
 * O1 NE YAPIYOR — HEPSİ EŞİT AĞIRLIKTA
 *
 * Dört avantaj aynı puntoda, aynı satır yapısında, aralarında saç teli
 * çizgiyle. Hiçbiri öne çıkmıyor; öne çıkan şey LİSTENİN KENDİSİ. Numaralar
 * sıra değil dizin: veri sırası kasıtlı (en güçlü başta) ama numara bir
 * "1. sırada" iddiası taşımıyor, satırı bulunur kılıyor. Bu yüzden <ol>
 * kullanıldı — sıra semantik olarak zaten listede, numara görsel bir tutamak.
 *
 * Sol ray hero'da geçmeyen tek olguyu taşımaya devam ediyor: kurulan yapı
 * (FACTS.structure). C5'in tek gerçek kazancı buydu, çöpe atılmadı.
 *
 * ŞARTA BAĞLI ROZETİ metinden okunuyor, ikon anahtarından değil — kural
 * CountryPros'tan birebir alındı, çünkü aynı veri iki bileşende farklı
 * işaretlenirse Dubai'nin yıldızı bir yerde düşer. Dubai pros[0] "Kurumlar
 * vergisi %0*" ve yıldızın şerhi `line`ın içinde; ikisi hiç ayrılmıyor.
 *
 * Hareket yalnızca FadeUp. useReducedMotion yok (bu depoda beş ayrı kalıpta
 * hidrasyon hatası çıkardı); süregiden animasyon da yok.
 */

/* CountryPros ile AYNI kural. Kopya değil zorunluluk: rozet iki bileşende
   farklı hesaplanırsa aynı avantaj bir yerde şartlı, bir yerde şartsız
   görünür. Tek kaynak yoksa en azından tek kural. */
const isConditional = (title: string, line: string) =>
  title.includes("*") || /şart/i.test(line);

export default function CountryIntroO1({ country, name }: { country: Country; name: string }) {
  const pros = COUNTRY_CONTENT[country].pros;
  const facts = FACTS[country];

  return (
    <section className="co1">
      <div className="container-o">
        <div className="co1-card">
          {/* --------------------------------------------------- sol ray */}
          <div className="co1-rail">
            <FadeUp y={16}>
              <p className="co1-kicker">Genel bakış</p>
              <h2 className="co1-h">{name}&apos;de öne çıkanlar.</h2>
            </FadeUp>

            <FadeUp delay={0.1} y={16}>
              {/* Hero'da geçmeyen tek olgu. Etiket + değer çifti DEĞİL tek
                  pul: müşterinin reddettiği şey künye kalıbıydı. */}
              <p className="co1-chip">{facts.structure}</p>
              <p className="co1-note">
                Bunlar ülkenin kendi sağladıkları; şarta bağlı olan işaretli.
              </p>
            </FadeUp>
          </div>

          {/* ------------------------------------------------ sağ · kütük */}
          <ol className="co1-list">
            {pros.map((p, i) => (
              <li className="co1-row" key={p.title}>
                <FadeUp delay={0.14 + i * 0.06} y={14} className="co1-rowin">
                  <span className="co1-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="co1-txt">
                    <h3 className="co1-t">
                      {p.title}
                      {isConditional(p.title, p.line) && (
                        <span className="co1-flag">şarta bağlı</span>
                      )}
                    </h3>
                    <p className="co1-p">{p.line}</p>
                  </div>
                </FadeUp>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
