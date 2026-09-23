import type { LucideIcon } from "lucide-react";
import { Check, CircleAlert, CircleQuestionMark, Landmark, Package, ShoppingBag, Store, X } from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { BrandChip } from "@/components/shared/BrandMark";
import type { Odeme, OdemeKanal } from "@/lib/countryContent";

/* ============================================================================
   HANGİ ÖDEME KANALI ÇALIŞIYOR — .cod- · css/country-bilgi.css
   Veri: countryContent.ts · <ülke>.odeme (şimdilik yalnız KKTC).

   23.09.2026 · Talep araştırmasının en sık tekrar eden sorularından ("Stripe
   ya da PayPal açılır mı?"). Burak: "stripe paypal zart zurt yok, onları sorup
   duruyolar." Her kanal bir kutu: logo (elimizde varsa renkli, yoksa ikon ve
   ad), durum rozeti ve bir satır. Durumlar sağlayıcıların KENDİ ülke
   listelerinden (docs/kktc-mevzuat.md · 10); tahmin yok, liste yayımlamayan
   Payoneer "belirsiz".
   BrandChip adı yalnız tam logosu OLMAYAN markada basıyor (Wise: yalnız
   işaret var); lockup'lı markada ad logonun içinde. */

const IKON: Record<NonNullable<OdemeKanal["ikon"]>, LucideIcon> = {
  banka: Landmark,
  magaza: Store,
  kutu: Package,
  sepet: ShoppingBag,
};

const DURUM = {
  var: { Ikon: Check, etiket: "Çalışıyor" },
  yok: { Ikon: X, etiket: "Açılmıyor" },
  belirsiz: { Ikon: CircleQuestionMark, etiket: "Başvuruda netleşiyor" },
  /* 23.09.2026 · İngiltere: açılıyor ama bir şartla (Tide: İngiliz cep
     numarası). Şart kutunun kendi satırında. */
  sartli: { Ikon: CircleAlert, etiket: "Şartla açılıyor" },
} as const;

/* VİTRİN · 23.09.2026 (İngiltere). Burak: "KKTC'de çalışmıyor diye küçük bir
   alan ayırdık; burada tüm ödeme sistemlerinin çalıştığını daha güzel lanse
   edersek iyi olur." Çalışan kanallar büyük logo duvarı: kutu başına büyük
   logo ya da markanın renginde ad, köşede yeşil tik, altında ne işe yaradığı.
   Şartlı ve açılmayanlar duvarın altında tek satır küçük çipler: yok sayılmıyor
   ama sahneyi de çalmıyor. Logosu depoda olmayan markalar (Amazon, Etsy,
   Shopify) markanın kendi renginde yazılı ad; logo uydurulmuyor. */
const AD_RENK: Record<string, string> = {
  "Amazon UK": "#232f3e",
  Etsy: "#f1641e",
  "Shopify Payments": "#5e8e3e",
};

function Vitrin({ data }: { data: Odeme }) {
  const acik = data.kanallar.filter((k) => k.durum === "var");
  const diger = data.kanallar.filter((k) => k.durum !== "var");
  return (
    <>
      <ul className="cod-vit">
        {acik.map((k, i) => {
          const I = k.ikon ? IKON[k.ikon] : null;
          return (
            <li key={k.ad}>
              <FadeUp className="cod-f" delay={0.05 + i * 0.05}>
                <div className="cod-vit-k">
                  <span className="cod-vit-tik" aria-hidden="true">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="cod-vit-logo">
                    {k.brand ? (
                      <BrandChip brand={k.brand} optical={26} size={30} renkli />
                    ) : (
                      <span className="cod-vit-ad" style={{ color: AD_RENK[k.ad] }}>
                        {I && <I size={24} strokeWidth={2} aria-hidden="true" />}
                        {k.ad}
                      </span>
                    )}
                  </span>
                  <p className="cod-vit-not">{k.not}</p>
                </div>
              </FadeUp>
            </li>
          );
        })}
      </ul>
      {diger.length > 0 && (
        <FadeUp delay={0.2}>
          <ul className="cod-diger">
            {diger.map((k) => {
              const D = DURUM[k.durum];
              return (
                <li key={k.ad} data-durum={k.durum}>
                  <D.Ikon size={13} strokeWidth={2.6} aria-hidden="true" />
                  <b>{k.ad}</b>
                  <span>{k.not}</span>
                </li>
              );
            })}
          </ul>
        </FadeUp>
      )}
    </>
  );
}

export default function CountryOdeme({ data }: { data: Odeme }) {
  if (data.gorunum === "vitrin") {
    return (
      <section className="sec-pad cod-vit-sec">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords as="h2" text={data.title} accent={data.accent} className="h2" />
            <FadeUp delay={0.2}>
              <p className="sec-lead">{data.lead}</p>
            </FadeUp>
          </div>
          <Vitrin data={data} />
          <FadeUp delay={0.2}>
            <p className="cod-dip">{data.not}</p>
          </FadeUp>
        </div>
      </section>
    );
  }
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={data.title} accent={data.accent} className="h2" />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{data.lead}</p>
          </FadeUp>
        </div>

        <ul className="cod">
          {data.kanallar.map((k, i) => {
            const D = DURUM[k.durum];
            const I = k.ikon ? IKON[k.ikon] : null;
            return (
              <li key={k.ad}>
                <FadeUp className="cod-f" delay={0.06 + i * 0.04}>
                  <div className="cod-k" data-durum={k.durum}>
                    <span className="cod-logo">
                      {k.brand ? (
                        <BrandChip brand={k.brand} optical={17} renkli />
                      ) : (
                        <span className="cod-ad">
                          {I && <I size={18} strokeWidth={1.9} aria-hidden="true" />}
                          {k.ad}
                        </span>
                      )}
                    </span>
                    <span className="cod-durum">
                      <D.Ikon size={13} strokeWidth={2.6} aria-hidden="true" />
                      {D.etiket}
                    </span>
                    <p className="cod-not">{k.not}</p>
                  </div>
                </FadeUp>
              </li>
            );
          })}
        </ul>

        <FadeUp delay={0.2}>
          <p className="cod-dip">{data.not}</p>
        </FadeUp>
      </div>
    </section>
  );
}
