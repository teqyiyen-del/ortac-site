import { ArrowRight, Check, Minus } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { INCLUSION_LABEL, RHYTHM_LABEL } from "@/lib/afterSetup";
import { accountingItems, ACC_PRICE_FOOTNOTE } from "@/lib/accountingDubai";
import { TEKLIF } from "@/app/lab/muhasebe/veri";

/* TEKLİF · bu turun asıl icadı.
 *
 * Kapsam, sınır ve fiyat BUGÜN sayfanın 3., 3c. ve 6. bölümünde duruyor;
 * aralarında ~2.500 piksel var ve her biri hizmeti başka bir sözlükle
 * adlandırıyor. Ziyaretçi "ne alıyorum" sorusunun cevabını üç parça hâlinde
 * topluyor. Burada üçü tek omurgada ve arka arkaya.
 *
 * ÜÇ KARAR:
 *
 * 1) SINIRLAR AÇIKTA. Eski sayfada beş kalem bir <details> arkasındaydı ve
 *    kapalıyken görünen tek cümle "Kapsamadığı, kapsadığı kadar önemli."
 *    idi — bilgi taşımayan bir vecize. Kalemlerin kendisi bu pazarda nadir
 *    bir dürüstlük; tıklamanın arkasında duracak son şey o.
 *
 * 2) FİYAT BÖLÜMÜN İÇİNDE VE GECE ZEMİNDE. Ayrı bir bölüm değil, teklifin
 *    son cümlesi. Gece bant, kapsamın beyaz zemininden sonra "işte rakam"
 *    diyen tek görsel vurgu; sitenin kendi gece/beyaz ritmini kullanıyor,
 *    yeni bir dil icat etmiyor.
 *
 * 3) BÖLÜMÜN SONUNDA KAPI VAR. Ölçüldü: canlı sayfada #fayda ve #fiyat
 *    bölümlerinin tamamında TEK BİR <a> yok. En yüksek niyetli an kapısız.
 *
 * FİYAT SATIRLARINDA BİR DÜZELTME: canlı sayfa RHYTHM_LABEL ve price.unit'i
 * yan yana basıyor, yani "Tek seferlik / tek seferlik", "Aylık / aylık" —
 * altı satırın beşinde aynı kelime iki kez. Burada `unit` yalnızca rozetten
 * FARKLIYSA basılıyor.
 */

/* Canlı sayfanın biçimlendiricisiyle birebir aynı (page.tsx:465). Lab kendi
   biçimini icat etmiyor: karşılaştırılan şey sıra ve yerleşim, tutar değil. */
const nf = new Intl.NumberFormat("tr-TR");
function priceText(p: { usd: number; plusVat: boolean; qualifier?: string }) {
  return `${p.qualifier ? `${p.qualifier} ` : ""}${nf.format(p.usd)} USD${p.plusVat ? " + KDV" : ""}`;
}

/* İKİ ADAYIN TEK FARKI BU PROP.
   Aday MA "kapsam-once": önce ne aldığını gör, sonra rakamı.
   Aday MB "fiyat-once" : önce rakamı gör, sonra ne aldığını.
   Karar edilecek soru tek: aramadan gelen kişi hangi sırada ikna oluyor?
   İki ayrı bileşen yazmak yerine tek bileşen + tek prop, çünkü aday
   kazandığında silinecek olan şey kod değil, seçilmeyen sıra. */
export default function MuhasebeTeklif({
  sira = "kapsam-once",
}: {
  sira?: "kapsam-once" | "fiyat-once";
}) {
  const items = accountingItems();
  const fiyatOnce = sira === "fiyat-once";

  const omurga = (
    <div className="lmh-omurga" key="omurga">
      {/* ------------------------------------------------------ DAHİL */}
      <FadeUp>
        <div className="lmh-kol">
          <h3 className="lmh-kol-b">
            <Check size={17} strokeWidth={2.2} aria-hidden="true" />
            Aylık ücrete dahil
          </h3>
          <ul className="lmh-var">
            {TEKLIF.kapsam.map((k) => (
              <li key={k.ad}>
                <b>{k.ad}</b>
                <span>{k.line}</span>
                <em>{k.not}</em>
              </li>
            ))}
          </ul>
        </div>
      </FadeUp>

      {/* ------------------------------------------------------- HARİÇ */}
      <FadeUp delay={0.1}>
        <div className="lmh-kol" data-yok="">
          <h3 className="lmh-kol-b">
            <Minus size={17} strokeWidth={2.2} aria-hidden="true" />
            {TEKLIF.disarida.baslik}
          </h3>
          <p className="lmh-kol-l">{TEKLIF.disarida.line}</p>
          <ul className="lmh-yok">
            {TEKLIF.disarida.items.map((k) => (
              <li key={k.t}>
                <b>{k.t}</b>
                <span>{k.s}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeUp>
    </div>
  );

  /* --------------------------------------------------------------- FİYAT */
  const fiyat = (
    <FadeUp delay={0.16} key="fiyat">
      <div className="lmh-fiyat">
        <h3 className="lmh-fiyat-b">{TEKLIF.fiyat.baslik}</h3>
        <p className="lmh-fiyat-l">{TEKLIF.fiyat.line}</p>

        <div className="svm-plist">
          {items.map((it) => (
            <details
              key={it.id}
              className="svm-more svm-more-dark svm-prow"
              data-inc={it.inclusion}
            >
              <summary>
                <span className="svm-prow-t">
                  <b>{it.title}</b>
                  <span className="svm-prow-tags">
                    <em className="svm-badge">
                      {INCLUSION_LABEL[it.inclusion].short}
                    </em>
                    <em className="svm-rhythm">{RHYTHM_LABEL[it.rhythm]}</em>
                  </span>
                </span>
                <span className="svm-prow-v data">
                  {priceText(it.price)}
                  {/* Yalnız rozetten farklıysa; bkz. dosya başı. */}
                  {it.price.unit !==
                    RHYTHM_LABEL[it.rhythm].toLocaleLowerCase("tr-TR") && (
                    <i>{it.price.unit}</i>
                  )}
                </span>
                <span className="svm-more-x" aria-hidden="true" />
              </summary>

              <div className="svm-prow-d">
                {it.en && <p className="svm-prow-en">{it.en}</p>}
                {it.line && <p>{it.line}</p>}
                {it.scope && it.scope.length > 0 && (
                  <ul>
                    {it.scope.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          ))}
        </div>

        <div className="lmh-fiyat-alt">
          <details className="svm-more svm-more-dark">
            <summary>
              Tutarlar USD ve KDV hariç · tam şartlar
              <span className="svm-more-x" aria-hidden="true" />
            </summary>
            <p>{ACC_PRICE_FOOTNOTE}</p>
          </details>

          {/* Bölümün kapısı. Canlı sayfada bu anda hiçbir bağlantı yok. */}
          <SmartLink href="/basla" className="btn btn-primary">
            {TEKLIF.fiyat.cta}
            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
          </SmartLink>
        </div>
      </div>
    </FadeUp>
  );

  return (
    <section id={TEKLIF.id} className="sec-pad lmh-teklif">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text={TEKLIF.heading}
            accent={TEKLIF.accent}
            className="h2"
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{TEKLIF.lead}</p>
          </FadeUp>
        </div>

        {fiyatOnce ? [fiyat, omurga] : [omurga, fiyat]}
      </div>
    </section>
  );
}
