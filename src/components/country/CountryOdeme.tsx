import type { CSSProperties } from "react";
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

/* ÇİZİMLER · 23.09.2026 (İngiltere). Burak: "tüm ödeme sistemlerinin
   çalıştığını daha güzel lanse edersek iyi olur." Deneme sırası:
     1. yeşil zeminli logo duvarı: "aynısını bg yeşil yapıp geçmişsin"
     2. kanallar → İngiltere Ltd → Türkiye akışı: "Türkiye'yi dahil etmene
        gerek yok … Payoneer'i, Binance'i de koy … hepsi çalışıyor de …
        üç varyasyon dene"
   Şimdi üç görünüm, üçü de YALNIZ çalışan kanalları basıyor ve kanal başına
   açıklama satırı yok (cevap tik; şartlar data'da):
     akis     üç küme → şirket kartı (hatlarda akan kesik)
     yorunge  şirket ortada, logolar çevresinde bir halkada; hatlar merkeze
     serit    iki sıra kayan logo şeridi, üstünde büyük "hepsi açık"
   Üçü /lab/ingiltere'de yan yana; canlıda data.gorunum hangisiyse o.
   Ortak dil: gece paneli, logolar beyaz karoda (logo rengi yalnız logoda:
   banka sayfası kuralı), köşede yeşil tik, merkez marka mavisi. Logosu
   depoda olmayan markalar markanın renginde yazılı ad; logo uydurulmuyor. */
const AD_RENK: Record<string, string> = {
  "Amazon UK": "#232f3e",
  Etsy: "#f1641e",
  "Shopify Payments": "#5e8e3e",
};

const GRUP = {
  tahsilat: "Kartla tahsilat",
  pazaryeri: "Pazaryerinde satış",
  hesap: "Hesap, transfer ve kripto",
} as const;
type GrupKey = keyof typeof GRUP;

function Karo({ k, buyuk }: { k: OdemeKanal; buyuk?: boolean }) {
  const I = k.ikon ? IKON[k.ikon] : null;
  return (
    <span className="cod-karo" data-boy={buyuk ? "b" : undefined}>
      {k.brand ? (
        <BrandChip brand={k.brand} optical={buyuk ? 26 : 20} size={buyuk ? 30 : 24} renkli />
      ) : (
        <span className="cod-karo-ad" style={{ color: AD_RENK[k.ad] }}>
          {I && <I size={buyuk ? 21 : 17} strokeWidth={2.2} aria-hidden="true" />}
          {k.ad}
        </span>
      )}
      <span className="cod-karo-tik" aria-hidden="true">
        <Check size={buyuk ? 12 : 10} strokeWidth={3.4} />
      </span>
    </span>
  );
}

function Merkez({ data, country, n }: { data: Odeme; country: Country; n: number }) {
  return (
    <div className="cod-ltd">
      <span className="cod-bayrak">
        <Flag country={country} />
      </span>
      <span className="cod-ltd-e">Şirketiniz</span>
      <b className="cod-ltd-ad">{data.sirket}</b>
      <span className="cod-ltd-say">
        <Check size={15} strokeWidth={3} aria-hidden="true" />
        {n} kanalın hepsi açık
      </span>
    </div>
  );
}

/* AKIŞ. Masaüstünde kümeler ile kart arasında SVG: küme satırları eşit
   yükseklikte, merkezleri (2i+1)/2n; hepsi kartın ortasına (%50) bağlanıyor.
   viewBox esniyor (preserveAspectRatio none), kalınlık non-scaling-stroke;
   dar ekranda SVG gizli, yerine dikey kesikli hat. */
function Akis({ data, country, acik }: { data: Odeme; country: Country; acik: OdemeKanal[] }) {
  const gruplar = (Object.keys(GRUP) as GrupKey[])
    .map((g) => ({ g, k: acik.filter((k) => k.grup === g) }))
    .filter((x) => x.k.length > 0);
  const n = gruplar.length;
  return (
    <div className="cod-akis">
      <div className="cod-akis-gir" style={{ gridTemplateRows: `repeat(${n}, 1fr)` }}>
        {gruplar.map(({ g, k }) => (
          <div key={g} className="cod-kume">
            <span className="cod-kume-e">{GRUP[g]}</span>
            <ul className="cod-karolar">
              {k.map((x) => (
                <li key={x.ad}>
                  <Karo k={x} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="cod-hat" aria-hidden="true">
        <svg viewBox="0 0 100 200" preserveAspectRatio="none">
          {gruplar.map((_, i) => {
            const y = ((2 * i + 1) / (2 * n)) * 200;
            const d = `M0 ${y} C 55 ${y}, 45 100, 100 100`;
            return (
              <g key={i}>
                <path d={d} className="cod-hat-iz" vectorEffect="non-scaling-stroke" />
                <path d={d} className="cod-hat-akan" vectorEffect="non-scaling-stroke" />
              </g>
            );
          })}
        </svg>
      </div>
      <Merkez data={data} country={country} n={acik.length} />
    </div>
  );
}

/* YÖRÜNGE. Kare sahne; logolar yarıçapı %39 olan bir halkada eşit aralıkla,
   saat 12'den başlayarak. Hatlar logodan merkeze (viewBox 100×100, sahne
   kare olduğu için bozulmuyor), kesikler merkeze doğru akıyor. 640 altında
   halka 9 logoyu taşımıyor (komşu aralığı ~90 px, karo ~110 px): sahne
   merkez kart + altında sarmalanan karolara dönüyor. */
function Yorunge({ data, country, acik }: { data: Odeme; country: Country; acik: OdemeKanal[] }) {
  const R = 39;
  const nokta = acik.map((_, i) => {
    const a = (i / acik.length) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
  });
  return (
    <div className="cod-yor">
      <div className="cod-yor-sahne">
        <svg className="cod-yor-hat" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r={R} className="cod-yor-halka" />
          {nokta.map((p, i) => (
            <g key={i}>
              <path d={`M${p.x.toFixed(2)} ${p.y.toFixed(2)} L50 50`} className="cod-hat-iz" />
              <path d={`M${p.x.toFixed(2)} ${p.y.toFixed(2)} L50 50`} className="cod-hat-akan" />
            </g>
          ))}
        </svg>
        <div className="cod-yor-orta">
          <Merkez data={data} country={country} n={acik.length} />
        </div>
        <ul className="cod-yor-karolar">
          {acik.map((k, i) => (
            <li
              key={k.ad}
              style={{ left: `${nokta[i].x}%`, top: `${nokta[i].y}%` } as CSSProperties}
            >
              <Karo k={k} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ŞERİT. Üstte büyük "hepsi açık" satırı, altında iki sıra karo zıt yönde
   kayıyor. Sonsuz kayma için her sıra dört kez basılıyor (beş karoluk bir
   kopya ~850 px, panel 1136 px: iki kopya boşluk bırakırdı), kopyalar
   aria-hidden, iz −50% (tam iki kopya + iki aralık) kaydırılıyor. prefers-reduced-motion: kayma yok,
   karolar sarmalanıyor, kopya gizli. */
function Serit({ data, country, acik }: { data: Odeme; country: Country; acik: OdemeKanal[] }) {
  const yari = Math.ceil(acik.length / 2);
  const siralar = [acik.slice(0, yari), acik.slice(yari)];
  return (
    <div className="cod-ser">
      <div className="cod-ser-bas">
        <span className="cod-ser-tik" aria-hidden="true">
          <Check size={30} strokeWidth={3} />
        </span>
        <div>
          <b className="cod-ser-say">{acik.length} ödeme kanalı, hepsi açık.</b>
          <span className="cod-ser-alt">
            <span className="cod-bayrak cod-bayrak-k">
              <Flag country={country} />
            </span>
            {data.sirket} ile
          </span>
        </div>
      </div>
      {siralar.map((sira, si) => (
        <div key={si} className="cod-ser-sira" data-yon={si % 2 ? "ters" : undefined}>
          <ul className="cod-ser-iz">
            {[0, 1, 2, 3].map((kopya) =>
              sira.map((k) => (
                <li key={`${kopya}-${k.ad}`} aria-hidden={kopya ? true : undefined} data-kopya={kopya ? "" : undefined}>
                  <Karo k={k} buyuk />
                </li>
              )),
            )}
          </ul>
        </div>
      ))}
    </div>
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
          <FadeUp delay={0.1}>
            {data.gorunum === "akis" && <Akis data={data} country={country} acik={acik} />}
            {data.gorunum === "yorunge" && <Yorunge data={data} country={country} acik={acik} />}
            {data.gorunum === "serit" && <Serit data={data} country={country} acik={acik} />}
          </FadeUp>
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
