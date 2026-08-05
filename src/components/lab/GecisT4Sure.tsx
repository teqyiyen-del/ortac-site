import { FACTS } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ADAY T4 (.gc4-) — TÜR: ZAMANSAL
 *
 * ==========================================================================
 * BU ARALIĞA VERDİĞİ İŞ
 *
 * Sayfanın ekseni burada bir kez değişiyor. Hero "burası neresi" diyor,
 * altındaki bölümler "hangi yapı, ne kadar, nasıl" diyor. Bu aralık ise tek
 * bir başka soruyu cevaplıyor: NE KADAR SÜRER. Ziyaretçinin hero'dan sonra
 * gerçekten merak ettiği ama sayfanın çok aşağısına kadar cevaplanmayan
 * soru bu.
 *
 * Bölüm SÜRECİ ANLATMIYOR — süreç bölümü (CountryProcess) yedi adımı
 * başlıklarıyla ve açıklamalarıyla veriyor ve o bölüm bir ekran değil, beş
 * ekran aşağıda. Burada basılan şey yalnızca ZAMAN EKSENİ: kaç adım, kaçında
 * bekleme var, toplam ne kadar. Aynı veriden iki farklı okuma; kelimeler
 * çakışmıyor.
 *
 * ==========================================================================
 * TEK KELİMESİ UYDURULMADI
 *
 * Toplam süre brand.ts · FACTS[ülke].days. Eksenin iki ucundaki etiketler
 * countryContent.steps'in kendi `timing` değerleri (ilk ve son adım). Adım
 * sayısı ve "karar / bekleme" dağılımı dizinin kendisinden SAYILIYOR, elle
 * yazılmıyor: bir adım eklenirse ekrandaki sayı kendiliğinden değişiyor.
 *
 * AYRIMIN KURALI VERİDEN: countryContent'in kendi notu "İlk üç adımda gün
 * yazmıyoruz çünkü orada bekleme yok: üçü de karar … Bekleme dördüncü
 * adımda, dosya otoriteye gidince başlıyor." Kod bunu rakam arayarak
 * uyguluyor — `timing` içinde rakam yoksa o adım bir karar, varsa bir
 * bekleme. Yani kural veriye gömülü, bileşene değil.
 *
 * TAKVİM VAADİ YOK. Ekranda gün adı, tarih ya da "X gününde" yazmıyor;
 * `timing` alanının kendisi bu yüzden yeniden adlandırılmıştı (bkz.
 * countryContent.ts, Step tipi). "tipik" işareti veriden geldiği gibi
 * basılıyor.
 *
 * ==========================================================================
 * HAREKET
 *
 * Ekranda tek bir şey var → "olabildiğince fazla". Eksende sürekli soldan
 * sağa geçen bir ışık var (9.5 s, sonsuz): eksen bir resim değil, akan bir
 * şey. Bekleme kutucukları ışığın geçişiyle sırayla doluyor; karar
 * kutucukları dolmuyor, çünkü orada beklenen bir şey yok — hareketin kendisi
 * de bir bilgi taşıyor.
 */

/* Kural veriden okunuyor: rakam taşımayan `timing` = bekleme yok.
   ("ilk görüşme" → karar · "tipik 3-5 gün" → bekleme) */
const isWait = (timing: string) => /\d/.test(timing);

export default function GecisT4Sure({ country }: { country: Country; name: string }) {
  const steps = COUNTRY_CONTENT[country].steps;
  if (steps.length === 0) return null;

  const waits = steps.filter((s) => isWait(s.timing)).length;
  const calls = steps.length - waits;
  const first = steps[0];
  const last = steps[steps.length - 1];

  return (
    <section className="gc4">
      <div className="container-o">
        <div className="gc4-in">
          <p className="gc4-kicker">Süre</p>
          <p className="gc4-days">{FACTS[country].days}</p>

          {/* Eksen bir liste değil bir ölçek: her kutucuk bir adım, ama
              adımın ADI burada yazmıyor — o bilgi süreç bölümünün işi. */}
          <div className="gc4-axis" aria-hidden="true">
            {steps.map((s, i) => (
              <span
                key={s.title}
                className="gc4-seg"
                data-wait={isWait(s.timing) || undefined}
                style={{ "--i": i } as React.CSSProperties}
              />
            ))}
          </div>

          <div className="gc4-ends">
            <span className="gc4-end">{first.timing}</span>
            <span className="gc4-end gc4-end-r">{last.timing}</span>
          </div>

          {/* Sayılar diziden sayılıyor; ekranda tek bir elle yazılmış rakam
              yok. Ekran okuyucu ekseni değil bu satırı okuyor. */}
          <p className="gc4-sum">
            {steps.length} adım — {calls} karar, {waits} bekleme.
          </p>
        </div>
      </div>
    </section>
  );
}
