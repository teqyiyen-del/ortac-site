import type { LucideIcon } from "lucide-react";
import { Check, CircleQuestionMark, Landmark, Package, ShoppingBag, Store, X } from "lucide-react";

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
} as const;

export default function CountryOdeme({ data }: { data: Odeme }) {
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
