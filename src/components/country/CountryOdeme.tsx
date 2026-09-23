import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownLeft,
  Check,
  CircleAlert,
  CircleQuestionMark,
  Landmark,
  Package,
  ShoppingBag,
  Store,
  X,
} from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { BrandChip } from "@/components/shared/BrandMark";
import { Flag } from "@/components/shared/CountryPicker";
import KanalIsaret, { hasKanalIsaret } from "@/components/shared/KanalIsaret";
import type { Odeme, OdemeKanal } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ============================================================================
   HANGİ ÖDEME KANALI ÇALIŞIYOR — .cod- · css/country-bilgi.css
   Veri: countryContent.ts · <ülke>.odeme (KKTC ızgara, İngiltere sahne).

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

/* SAHNE · 23.09.2026 (İngiltere). Burak: "tüm ödeme sistemlerinin
   çalıştığını daha güzel lanse edersek iyi olur." Aynı gün dört deneme
   reddedildi, dördü de git'te:
     1. yeşil zeminli logo duvarı: "aynısını bg yeşil yapıp geçmişsin"
     2. kanallar → şirket → Türkiye akışı: "Türkiye'yi dahil etmene gerek yok"
     3-5. /lab/ingiltere'de kayan şerit, yörünge, akış: "en oluru B ama
        isteğim bu değil … normal kutu kutu yazdığımız versiyon bile bundan
        daha çok şey içeriyor"
   Son tarif: "kutuların yanına biraz daha aksiyonlu bir şey … Dubai'de
   para ikonları geliyordu … öyle bir görsel ekleyip altında tüm
   uygulamaları açıklamak … Dubai'deki açıklamalar ne kadarsa."
   Yani /dubai/banka-hesabi'nin ödeme bölümünün dili: üstte sahne (kanal
   işaretleri, bağlar, bağların üstünde şirket hesabına akan paralar),
   altında her kanal için kutu (logo, etiket, tek cümle).

   SAHNE GEOMETRİSİ. İki yerleşim, CSS biri gösteriyor (aynı çizim
   daralınca işaretler 15 px'e iniyordu):
     geniş (≥ 760) 1000×300: dokuz işaret tek sırada, hesap kartı altta ortada
     dar   (< 760)  360×400: 5 + 4 işaret iki sırada, kart altta
   İşaretler ve kart HTML, konumu viewBox koordinatından yüzdeyle (SVG'nin
   en-boy oranı sabit, % = birim / kenar). Bağlar ve paralar SVG'de; para
   <animateMotion> ile bağın kendi yolunu izliyor, yani yolun örneklerini
   ayrıca keyframe'e yazmak gerekmiyor (banka sayfasındaki svbPara0..3'ün
   aksine). prefers-reduced-motion: paralar gizli (SMIL CSS animasyonu
   değil, `animation: none` onu durdurmuyor).

   VARIŞ · 23.09.2026 · Burak: "her para içine girdiğinde o İngiltere
   şirketinizin gelen ödeme kısmı sağa sola kayabilir, Dubai'de öyle
   yapmıştım, o güzeldi." Banka sayfasındaki svbVaris/svbGelen'in aynısı:
   kartın kenarı maviye yanıp sönüyor, "Gelen ödeme" sağdan kayıp oturuyor.
   Bunun için paralar tam ARA saniyede bir varmalı: k. para k × ARA'da
   çıkıyor, YOL saniyede kartta; döngü DONGU = n × ARA, yani her para
   döngünün yalnız ilk YOL/DONGU'sunda yolda (keyPoints 0;1;1). Kartın CSS
   animasyonu ARA periyotlu ve YOL gecikmeli (country-bilgi.css ·
   cosVaris); ikisi de sayfa yüklenince başlıyor. İlk hâlde 0,4 s arayla
   9 para vardı: varış o sıklıkta olunca kart titriyormuş gibi durur. */
const ARA = 1;
const YOL = 3.2;
type Yerlesim = { w: number; h: number; ikon: [number, number][]; kart: [number, number] };
function yerlesim(n: number): { genis: Yerlesim; dar: Yerlesim } {
  const genis: Yerlesim = {
    w: 1000,
    h: 300,
    ikon: Array.from({ length: n }, (_, i) => [n > 1 ? 70 + (i * 860) / (n - 1) : 500, 52]),
    kart: [500, 212],
  };
  const ust = Math.ceil(n / 2);
  const alt = n - ust;
  const sira = (k: number, y: number) =>
    Array.from({ length: k }, (_, i) => [180 + (i - (k - 1) / 2) * 68, y] as [number, number]);
  const dar: Yerlesim = { w: 360, h: 400, ikon: [...sira(ust, 40), ...sira(alt, 110)], kart: [180, 300] };
  return { genis, dar };
}

const AD_RENK: Record<string, string> = {
  "Amazon UK": "#232f3e",
  Etsy: "#f1641e",
  "Shopify Payments": "#5e8e3e",
};

function Isaret({ k }: { k: OdemeKanal }) {
  if (k.brand && hasKanalIsaret(k.brand)) return <KanalIsaret brand={k.brand} size={24} />;
  const I = k.ikon ? IKON[k.ikon] : Landmark;
  return <I size={22} strokeWidth={2.1} style={{ color: AD_RENK[k.ad] }} />;
}

function Cizim({ y, kanallar, sirket, country, sinif }: {
  y: Yerlesim;
  kanallar: OdemeKanal[];
  sirket: string;
  country: Country;
  sinif: string;
}) {
  const [kx, ky] = y.kart;
  const DONGU = kanallar.length * ARA;
  const yol = ([x, iy]: [number, number]) =>
    `M${x} ${iy} C ${x} ${iy + (ky - iy) * 0.6}, ${kx} ${iy + (ky - iy) * 0.35}, ${kx} ${ky}`;
  const pct = (v: number, t: number) => `${(v / t) * 100}%`;
  return (
    <div className={`cos-cizim ${sinif}`} style={{ aspectRatio: `${y.w} / ${y.h}` }}>
      <svg viewBox={`0 0 ${y.w} ${y.h}`} className="cos-svg" focusable="false">
        {y.ikon.map((p, i) => (
          <path key={i} d={yol(p)} className="cos-yol" />
        ))}
        {y.ikon.map((p, i) => (
          <g key={i} className="cos-para" opacity="0">
            <circle r="11" className="cos-para-yuz" />
            <circle r="7.6" className="cos-para-halka" />
            <text y="4" textAnchor="middle" className="cos-para-sim">
              $
            </text>
            <animateMotion
              dur={`${DONGU}s`}
              begin={`${i * ARA}s`}
              repeatCount="indefinite"
              keyPoints="0;1;1"
              keyTimes={`0;${YOL / DONGU};1`}
              calcMode="linear"
              path={yol(p)}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0;0"
              keyTimes={`0;0.03;${(YOL - 0.25) / DONGU};${YOL / DONGU};1`}
              dur={`${DONGU}s`}
              begin={`${i * ARA}s`}
              repeatCount="indefinite"
            />
          </g>
        ))}
      </svg>
      {kanallar.map((k, i) => (
        <span
          key={k.ad}
          className="cos-ikon"
          style={{ left: pct(y.ikon[i][0], y.w), top: pct(y.ikon[i][1], y.h) }}
        >
          <Isaret k={k} />
        </span>
      ))}
      <div
        className="cos-hes"
        style={{ left: pct(kx, y.w), top: pct(ky, y.h), "--cos-ara": `${ARA}s`, "--cos-yol": `${YOL}s` } as CSSProperties}
      >
        <span className="cos-bayrak">
          <Flag country={country} />
        </span>
        <span>
          <b>{sirket}</b>
          <span className="cos-gelen">
            <ArrowDownLeft size={13} strokeWidth={2.4} />
            Gelen ödeme
          </span>
        </span>
      </div>
    </div>
  );
}

function Sahne({ data, country, acik }: { data: Odeme; country: Country; acik: OdemeKanal[] }) {
  const { genis, dar } = yerlesim(acik.length);
  const sirket = data.sirket ?? "Şirketiniz";
  return (
    <>
      <FadeUp delay={0.1}>
        <div className="cos-sahne" aria-hidden="true">
          <Cizim y={genis} kanallar={acik} sirket={sirket} country={country} sinif="cos-g" />
          <Cizim y={dar} kanallar={acik} sirket={sirket} country={country} sinif="cos-d" />
        </div>
      </FadeUp>
      <ul className="cos-kutular">
        {acik.map((k, i) => {
          const I = k.ikon ? IKON[k.ikon] : null;
          return (
            <li key={k.ad}>
              <FadeUp className="cos-f" delay={0.08 + i * 0.03}>
                <div className="cos-k">
                  <span className="cos-k-ust">
                    <span className="cos-k-logo">
                      {k.brand ? (
                        <BrandChip brand={k.brand} optical={19} size={22} renkli />
                      ) : (
                        <span className="cos-k-ad" style={{ color: AD_RENK[k.ad] }}>
                          {I && <I size={18} strokeWidth={2.1} aria-hidden="true" />}
                          {k.ad}
                        </span>
                      )}
                    </span>
                    {k.etiket && (
                      <span className="cos-etiket" data-grup={k.grup}>
                        {k.etiket}
                      </span>
                    )}
                  </span>
                  <p className="cos-not">{k.not}</p>
                </div>
              </FadeUp>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function CountryOdeme({ data, country }: { data: Odeme; country: Country }) {
  if (data.gorunum) {
    const acik = data.kanallar.filter((k) => k.durum === "var");
    return (
      <section className="sec-pad" style={{ background: "var(--white)" }}>
        <div className="container-o">
          <div className="sec-head">
            <SplitWords as="h2" text={data.title} accent={data.accent} className="h2" />
            <FadeUp delay={0.2}>
              <p className="sec-lead">{data.lead}</p>
            </FadeUp>
          </div>
          <Sahne data={data} country={country} acik={acik} />
          {data.not && (
            <FadeUp delay={0.2}>
              <p className="cod-dip">{data.not}</p>
            </FadeUp>
          )}
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
