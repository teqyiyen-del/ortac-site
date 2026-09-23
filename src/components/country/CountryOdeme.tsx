import type { LucideIcon } from "lucide-react";
import { Check, CircleAlert, CircleQuestionMark, Landmark, Package, ShoppingBag, Store, X } from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { BrandChip } from "@/components/shared/BrandMark";
import { Flag } from "@/components/shared/CountryPicker";
import type { Odeme, OdemeKanal } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ============================================================================
   HANGİ ÖDEME KANALI ÇALIŞIYOR — .cod- · css/country-bilgi.css
   Veri: countryContent.ts · <ülke>.odeme (KKTC ızgara, İngiltere akış).

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

/* AKIŞ · 23.09.2026 (İngiltere). Burak: "tüm ödeme sistemlerinin çalıştığını
   daha güzel lanse edersek iyi olur." İlk deneme yeşil zeminli logo duvarıydı
   ve reddedildi: "aynısını bg yeşil yapıp geçmişsin … baya karıştırmışsın."
   Kutu ızgarası ne kadar büyütülse de "liste"; mesaj ise "para her kanaldan
   gelip şirketinize, oradan size ulaşıyor". O yüzden paranın yolu çiziliyor:
     [Kartla tahsilat · Pazaryeri]  ⟶  [İngiltere Ltd + hesap]  ⟶  [Türkiye]
   Gece paneli (sitenin tutar kutularıyla aynı dil), logolar beyaz karolarda
   (logo rengi yalnız logoda: banka sayfası kuralı), merkez kart marka mavisi.
   Kanal başına açıklama satırı YOK: "hangisi çalışıyor" sorusunun cevabı tik;
   şartlar data'da duruyor ama basılmıyor. Şartlı/açılmayanlar dipnotta tek
   cümle. Logosu depoda olmayan markalar markanın renginde yazılı ad. */
const AD_RENK: Record<string, string> = {
  "Amazon UK": "#232f3e",
  Etsy: "#f1641e",
  "Shopify Payments": "#5e8e3e",
};

const GRUP = {
  tahsilat: "Kartla tahsilat",
  pazaryeri: "Pazaryerinde satış",
} as const;

function Karo({ k }: { k: OdemeKanal }) {
  const I = k.ikon ? IKON[k.ikon] : null;
  return (
    <span className="cod-karo" title={k.not}>
      {k.brand ? (
        <BrandChip brand={k.brand} optical={20} size={24} renkli />
      ) : (
        <span className="cod-karo-ad" style={{ color: AD_RENK[k.ad] }}>
          {I && <I size={17} strokeWidth={2.2} aria-hidden="true" />}
          {k.ad}
        </span>
      )}
      <span className="cod-karo-tik" aria-label="çalışıyor">
        <Check size={10} strokeWidth={3.4} aria-hidden="true" />
      </span>
    </span>
  );
}

/* Türkiye bayrağı: CountryPicker · Flag yalnız hizmet ülkelerini çiziyor. */
function TrBayrak() {
  return (
    <svg viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#e30a17" />
      <circle cx="22" cy="20" r="10" fill="#ffffff" />
      <circle cx="24.6" cy="20" r="8" fill="#e30a17" />
      <path
        d="M33.5 20 L42.3 16.9 L36.9 24.5 L36.9 15.5 L42.3 23.1 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/* Bağlantı hatları. Masaüstünde sütunlar arasında SVG: soldaki iki küme
   (satır yükseklikleri eşit, merkezleri %25 ve %75) ortadaki karta (%50)
   bağlanıyor. viewBox esniyor (preserveAspectRatio none), çizgi kalınlığı
   non-scaling-stroke ile sabit; akan kesikler .cod-hat-akan. Dar ekranda SVG
   gizli, yerine dikey kesikli hat (CSS). */
function Hat({ cift }: { cift?: boolean }) {
  const d = cift
    ? ["M0 50 C 50 50, 50 100, 100 100", "M0 150 C 50 150, 50 100, 100 100"]
    : ["M0 100 H 100"];
  return (
    <div className="cod-hat" aria-hidden="true">
      <svg viewBox="0 0 100 200" preserveAspectRatio="none">
        {d.map((p) => (
          <g key={p}>
            <path d={p} className="cod-hat-iz" vectorEffect="non-scaling-stroke" />
            <path d={p} className="cod-hat-akan" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function Akis({ data, country }: { data: Odeme; country: Country }) {
  const grup = (g: keyof typeof GRUP) =>
    data.kanallar.filter((k) => k.durum === "var" && k.grup === g);
  const hesap = data.kanallar.filter((k) => k.durum === "var" && k.grup === "hesap");
  return (
    <FadeUp delay={0.1}>
      <div className="cod-akis">
        <div className="cod-akis-gir">
          {(Object.keys(GRUP) as (keyof typeof GRUP)[]).map((g) => (
            <div key={g} className="cod-kume">
              <span className="cod-kume-e">{GRUP[g]}</span>
              <ul className="cod-karolar">
                {grup(g).map((k) => (
                  <li key={k.ad}>
                    <Karo k={k} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Hat cift />

        <div className="cod-ltd">
          <span className="cod-bayrak">
            <Flag country={country} />
          </span>
          <span className="cod-ltd-e">Şirketiniz</span>
          <b className="cod-ltd-ad">{data.sirket}</b>
          {hesap.length > 0 && (
            <div className="cod-ltd-hesap">
              <span className="cod-ltd-he">Şirket hesabı</span>
              {hesap.map((k) => (
                <Karo key={k.ad} k={k} />
              ))}
            </div>
          )}
        </div>

        <Hat />

        <div className="cod-tr">
          <span className="cod-bayrak">
            <TrBayrak />
          </span>
          <b className="cod-tr-ad">Türkiye&apos;deki hesabınız</b>
          <span className="cod-tr-e">Kâr payı olarak</span>
        </div>
      </div>
    </FadeUp>
  );
}

export default function CountryOdeme({ data, country }: { data: Odeme; country: Country }) {
  if (data.gorunum === "akis") {
    return (
      <section className="sec-pad" style={{ background: "var(--white)" }}>
        <div className="container-o">
          <div className="sec-head">
            <SplitWords as="h2" text={data.title} accent={data.accent} className="h2" />
            <FadeUp delay={0.2}>
              <p className="sec-lead">{data.lead}</p>
            </FadeUp>
          </div>
          <Akis data={data} country={country} />
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
