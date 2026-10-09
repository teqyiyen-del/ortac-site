import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  Calculator,
  CalendarClock,
  Clock,
  Coins,
  Compass,
  FileText,
  Globe,
  IdCard,
  Landmark,
  MapPin,
  Percent,
  PiggyBank,
  Receipt,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  TriangleAlert,
  UserRound,
  X,
} from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import Ayrinti from "@/components/shared/Ayrinti";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import VergiGrafik from "@/components/country/VergiGrafik";
import VergiHesap from "@/components/services/VergiHesap";
import Tel from "@/components/mobil/Tel";
import { SITE } from "@/lib/routes";
import type { VergiGorsel, VergiIkon, VergiIsaret, VergiVeri } from "@/lib/vergiDubai";

/* ============================================================================
   VERGİ DANIŞMANLIĞI SAYFASI · ortak gövde (09.10.2026)
   /dubai/vergi · /ingiltere/vergi · /kktc/vergi aynı on durağı basıyor.
   Metin: lib/vergiDubai.ts · vergiIngiltere.ts · vergiKktc.ts (kaynak düzeni
   ve yumuşatılan cümleler oralarda) · Biçim: css/svc-vergi.css (.svr-)

   NEDEN YAZILDI. Burak: "Vergi danışmanlığına geliyorum, bir şey yok. Üç dört
   kart koymuşsun, bitmiş. Banka, şirket kuruluşu, muhasebe çok güzel oldu: SVG
   görseller var, animasyonlar var. Bunları da öyle doldur." Sayfalar o güne
   kadar genel hizmet şablonundan basılıyordu (app/ulke/[slug]/[hizmet]).
   Kalıp banka sayfasınınki (services/BankaSayfa): tek gövde, ülke başına veri.

   DURAKLAR (zemin beyaz ve kırık beyaz sırayla; tam siyah BÖLÜM yok)
     giriş      foto giriş (PageHero · art dalı), tek düğme: İletişime geçin
     çerçeve    oranlar ve eşikler: ülkeye özgü çizim + dört rakam kartı
     kapsam     bu hizmette yaptığımız altı iş + dışında kalanlar
     takvim     yıl halkası (12 ay, işaretli aylar) + dört süre kartı
     türkiye    vergi nerede çıkıyor: sayfanın TEK gece kartı, üç durak
     hatalar    altı hata kartı (+ resmî rakamı olan ülkede ceza merdiveni)
     süreç      dört adım; üstte sırayla dolan çubuk ve sayı
     ilgili     muhasebe, banka, kuruluş sayfalarına bağ
     SSS · kapanış

   ÇİZİMLER (hepsi aria-hidden; iddia başlıkta, cümlede ve kartlarda)
     · çerçeve: Dubai kaydırıcılı eşik çubuğu (VergiHesap), İngiltere oran
       eğrisi (country/VergiGrafik, ülke sayfasındaki bileşen), KKTC ayrım
       şeması (aynı şirket, iki müşteri, iki sonuç).
     · yıl halkası: on iki yay; işaretli ay renkli, etrafında dönen imleç.
     · para yolu: gece kartta üç durak, aralarında yol alan para.
     · ceza merdiveni: gecikme uzadıkça büyüyen dört basamak.
   Çizimlerin içindeki okunacak yazı HTML (en az 12 px etiket, 14 px cümle);
   SVG yalnız biçim çiziyor, çünkü viewBox ile ölçeklenen yazı telefonda
   küçülüyor. Hareketin tamamı CSS'te ve prefers-reduced-motion kapısında;
   ekran dışında shared/EkranDisiDurdur duraklatıyor (bölümler <section>).

   FİYAT YOK, bu hizmet ayrı satılmıyor. */

const IKON: Record<VergiIkon, LucideIcon> = {
  yuzde: Percent,
  terazi: Scale,
  kisi: UserRound,
  dosya: FileText,
  takvim: CalendarClock,
  kalkan: ShieldCheck,
  harita: MapPin,
  ara: Search,
  kasa: PiggyBank,
  sirket: Building2,
  kure: Globe,
  defter: BookOpen,
  banka: Landmark,
  kurulus: Rocket,
  hesap: Calculator,
  saat: Clock,
  para: Coins,
  fatura: Receipt,
  kimlik: IdCard,
  pusula: Compass,
};

const nf = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });

/* ------------------------------------------------------ ÇİZİM · AYRIM (KKTC)
   Aynı şirket, iki müşteri, iki sonuç. Bağ iki ayrı SVG: geniş ekranda
   soldan sağa çatal, telefonda yukarıdan aşağı çatal (kutular alt alta
   değil, yan yana kalıyor; çizim HTML listesine dönmüyor). İkisinde de id
   yok (tuzak W). Uçların yeri CSS ızgarasıyla eşleşiyor: sağda iki kutu
   eşit boyda, merkezleri yüksekliğin dörtte biri ve dörtte üçü. */
function CizimAyrim({ veri: G }: { veri: Extract<VergiGorsel, { tur: "ayrim" }> }) {
  return (
    <div className="svr-ayr">
      <div className="svr-ayr-kay">
        <span className="svr-ic">
          <Building2 size={18} strokeWidth={1.9} />
        </span>
        <b>{G.kaynak.ad}</b>
        <small>{G.kaynak.alt}</small>
      </div>
      <svg className="svr-ayr-bag svr-ayr-bag-yatay" viewBox="0 0 100 200" preserveAspectRatio="none" focusable="false">
        <path className="svr-ayr-yol" data-k="0" d="M0 100 C 55 100, 45 50, 100 50" />
        <path className="svr-ayr-yol" data-k="1" d="M0 100 C 55 100, 45 150, 100 150" />
      </svg>
      <svg className="svr-ayr-bag svr-ayr-bag-dikey" viewBox="0 0 200 48" preserveAspectRatio="none" focusable="false">
        <path className="svr-ayr-yol" data-k="0" d="M100 0 C 100 28, 50 20, 50 48" />
        <path className="svr-ayr-yol" data-k="1" d="M100 0 C 100 28, 150 20, 150 48" />
      </svg>
      <div className="svr-ayr-son">
        {G.yollar.map((y, k) => (
          <div key={y.etiket} className="svr-ayr-k" data-ton={y.ton} data-k={k}>
            <small>{y.etiket}</small>
            <b>{y.deger}</b>
            <p>{y.line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- ÇİZİM · YIL HALKASI
   On iki yay, her biri bir ay (saat 12'den başlayıp saat yönünde). İşaretli
   ayın yayı renkli; rengi lejanttaki işaretle aynı. Ay adları SVG'de çünkü
   konumları açıya bağlı; 14 birim, halka telefonda 0,85 kat çizildiğinde
   ~12 px. Ortadaki iki satır HTML. İmleç yayın üstünde dönüyor (36,7 s;
   sitedeki öteki döngülerle ortak katı yok). Koordinatlar iki haneye
   yuvarlı: sunucu ve tarayıcı aynı dizgeyi basıyor. */
const AY_KISA = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
const AY_TAM = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const HLK = { c: 180, r: 120, et: 158, bosluk: 2.2 };
const kutup = (aci: number, r: number) => {
  const t = (aci * Math.PI) / 180;
  return [(HLK.c + r * Math.cos(t)).toFixed(2), (HLK.c + r * Math.sin(t)).toFixed(2)] as const;
};
function YilHalkasi({ isaretler, ornek }: { isaretler: VergiIsaret[]; ornek: VergiVeri["takvim"]["ornek"] }) {
  const ton = (ay: number) => isaretler.find((i) => i.aylar.includes(ay))?.ton;
  return (
    <div className="svr-hlk">
      <div className="svr-hlk-cizim" aria-hidden="true">
        <svg viewBox="0 0 360 360" className="svr-hlk-svg" focusable="false">
          {AY_KISA.map((ad, m) => {
            const a0 = -90 + m * 30 + HLK.bosluk;
            const a1 = -90 + (m + 1) * 30 - HLK.bosluk;
            const [x0, y0] = kutup(a0, HLK.r);
            const [x1, y1] = kutup(a1, HLK.r);
            const [tx, ty] = kutup(-90 + m * 30 + 15, HLK.et);
            const t = ton(m + 1);
            return (
              <g key={ad}>
                <path className="svr-hlk-yay" data-ton={t} d={`M${x0} ${y0} A${HLK.r} ${HLK.r} 0 0 1 ${x1} ${y1}`} />
                <text className="svr-hlk-ay" data-dolu={t ? "" : undefined} x={tx} y={ty} textAnchor="middle" dominantBaseline="central">
                  {ad}
                </text>
              </g>
            );
          })}
          <g className="svr-hlk-imlec">
            <circle cx={HLK.c} cy={HLK.c - HLK.r} r="7" />
          </g>
        </svg>
        <span className="svr-hlk-orta">
          <small>{ornek.ust}</small>
          <b>{ornek.alt}</b>
        </span>
      </div>
      <ul className="svr-hlk-lej">
        {isaretler.map((i) => (
          <li key={i.ad}>
            <i data-ton={i.ton} aria-hidden="true" />
            <span>
              <b>{i.ad}</b>
              <small>{i.aylar.map((a) => AY_TAM[a - 1]).join(", ")}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------ ÇİZİM · PARA
   Düz vektör disk (banka sayfasındaki paranın kardeşi; 2B, parıltı yok).
   Gece kartta yeşil: renk kuralında yeşil yalnız para. */
function Para() {
  return (
    <svg viewBox="0 0 24 24" className="svr-para-y" focusable="false">
      <circle cx="12" cy="12" r="10.75" className="svr-para-yuz" />
      <circle cx="12" cy="12" r="6.6" className="svr-para-halka" />
    </svg>
  );
}

export default function VergiSayfa({ veri: V }: { veri: VergiVeri }) {
  const H = V.hero;
  const C = V.cerceve;
  const K = V.kapsam;
  const T = V.takvim;
  const Y = V.turkiye;
  const E = V.hatalar;
  const M = E.merdiven;
  const tepe = M ? Math.max(...M.basamaklar.map((b) => b.tutar)) : 1;
  const tutar = (v: number) => (M?.onde ? `${M.birim}${nf.format(v)}` : `${nf.format(v)} ${M?.birim ?? ""}`);

  /* Yapılandırılmış veri: hizmet + SSS (muhasebe sayfasındaki kalıp). */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: V.seo.title.replace(/\s*\|\s*Ortac Global$/, ""),
        serviceType: "Vergi danışmanlığı",
        url: `${SITE}${V.yol}`,
        provider: { "@type": "Organization", name: "Ortac Global", url: SITE },
        areaServed: { "@type": "Place", name: V.ulke },
        description: V.seo.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: V.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Nav />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <PageHero
          crumb={H.crumb}
          title={H.title}
          accent={H.accent}
          lead={H.lead}
          /* `art` yalnız "foto giriş dalı" demek (BankaSayfa'daki not) */
          art={<i hidden />}
          cta={H.cta}
          trust={H.trust.map((t) => {
            const I = IKON[t.icon];
            return { icon: <I size={15} strokeWidth={2} aria-hidden="true" />, line: t.line };
          })}
        />

        {/* ------------------------------------------------ VERGİ ÇERÇEVESİ
            Solda ülkenin çizimi, sağda dört rakam kartı. Rakamın rengi
            anlamından: vergi çıkmayan dilim yeşil, üst oran ve şart amber,
            kalanı mavi. */}
        <section id={C.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={C.heading} accent={C.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">
                  <Tel>{C.lead}</Tel>
                </p>
              </FadeUp>
            </div>

            <div className="svr-cer">
              <FadeUp className="svr-cer-g" delay={0.1}>
                {C.gorsel.tur === "esik" && <VergiHesap veri={C.gorsel} />}
                {C.gorsel.tur === "egri" && (
                  <div className="svr-egri">
                    <VergiGrafik baslik={C.gorsel.baslik} />
                  </div>
                )}
                {C.gorsel.tur === "ayrim" && (
                  <div className="svr-sahne" aria-hidden="true">
                    <CizimAyrim veri={C.gorsel} />
                  </div>
                )}
              </FadeUp>
              <ul className="svr-oran">
                {C.kartlar.map((k, i) => (
                  <li key={k.etiket}>
                    <FadeUp className="svr-oran-k" delay={0.12 + i * 0.05}>
                      <b className="svr-oran-d" data-ton={k.ton}>
                        {k.deger}
                      </b>
                      <div>
                        <span className="svr-oran-e">{k.etiket}</span>
                        <p className="svr-oran-s">{k.line}</p>
                      </div>
                    </FadeUp>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- KAPSAM
            Altı iş kartı; altında "dışında kalanlar" tek kutuda dört madde
            (amber değil nötr: risk değil sınır). */}
        <section id={K.id} className="sec-pad svr-kirik">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={K.heading} accent={K.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">
                  <Tel>{K.lead}</Tel>
                </p>
              </FadeUp>
            </div>

            <ul className="svr-kap">
              {K.items.map((k, i) => {
                const I = IKON[k.icon];
                return (
                  <li key={k.title}>
                    <FadeUp className="svr-kap-k" delay={0.08 + i * 0.04}>
                      <span className="svr-ic" aria-hidden="true">
                        <I size={18} strokeWidth={1.9} />
                      </span>
                      <div>
                        <h3 className="svr-kap-t">{k.title}</h3>
                        <p className="svr-kap-s">{k.line}</p>
                      </div>
                    </FadeUp>
                  </li>
                );
              })}
            </ul>

            <FadeUp delay={0.16}>
              <div className="svr-har">
                <h3 className="svr-har-h">{K.haric.baslik}</h3>
                <ul className="svr-har-l">
                  {K.haric.items.map((h) => (
                    <li key={h}>
                      <X size={14} strokeWidth={2.4} aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* --------------------------------------------------------- TAKVİM
            Solda yıl halkası ve lejantı, sağda dört süre satırı. Ceza varsa
            satırın sağında amber etiket. */}
        <section id={T.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={T.heading} accent={T.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">
                  <Tel>{T.lead}</Tel>
                </p>
              </FadeUp>
            </div>

            <div className="svr-tak">
              <FadeUp className="svr-sahne svr-tak-g" delay={0.1}>
                <YilHalkasi isaretler={T.isaretler} ornek={T.ornek} />
              </FadeUp>
              <ul className="svr-tak-l">
                {T.kalemler.map((k, i) => (
                  <li key={k.ne}>
                    <FadeUp className="svr-tak-k" delay={0.1 + i * 0.05}>
                      <span className="svr-tak-sure">
                        <CalendarClock size={16} strokeWidth={2} aria-hidden="true" />
                        {k.sure}
                      </span>
                      <div className="svr-tak-yazi">
                        <h3 className="svr-tak-ne">{k.ne}</h3>
                        <p className="svr-tak-kural">{k.kural}</p>
                      </div>
                      {k.ceza && <p className="svr-ceza">{k.ceza}</p>}
                    </FadeUp>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------ TÜRKİYE'DE YAŞIYORSANIZ
            Sayfanın tek gece kartı. Üç durak; aralarındaki bağda para yol
            alıyor, iki alternatif arasında ok yerine "ya da". Şartlar açılır
            kutuda (hafıza: sayfaya not düşme). */}
        <section id={Y.id} className="sec-pad svr-kirik">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={Y.heading} accent={Y.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">
                  <Tel>{Y.lead}</Tel>
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.1}>
              <div className="svr-gece">
                <ol className="svr-yol">
                  {Y.duraklar.map((d, i) => {
                    const I = IKON[d.ikon];
                    const son = i === Y.duraklar.length - 1;
                    return (
                      <li key={d.kim} className="svr-yol-li">
                        <div className="svr-yol-d">
                          <span className="svr-yol-bas">
                            <span className="svr-yol-ic" aria-hidden="true">
                              <I size={18} strokeWidth={1.9} />
                            </span>
                            <span>
                              <small>{d.kim}</small>
                              <b>{d.yer}</b>
                            </span>
                          </span>
                          <span className="svr-yol-v" data-ton={d.ton}>
                            {d.vergi}
                          </span>
                          <p className="svr-yol-s">{d.line}</p>
                        </div>
                        {!son &&
                          (Y.ayrim === i ? (
                            <span className="svr-yol-bag svr-yol-yada">ya da</span>
                          ) : (
                            <span className="svr-yol-bag" aria-hidden="true">
                              <i className="svr-yol-hat" />
                              <span className="svr-para">
                                <Para />
                              </span>
                            </span>
                          ))}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </FadeUp>

            <FadeUp delay={0.16}>
              <Ayrinti baslik="Ayrıntılar">
                <ul className="cpy-uyari">
                  {Y.ayrintilar.map((u) => (
                    <li key={u.baslik} className="cpy-u">
                      <TriangleAlert size={16} strokeWidth={2.1} aria-hidden="true" />
                      <div>
                        <b>{u.baslik}</b>
                        <p>{u.line}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Ayrinti>
            </FadeUp>
          </div>
        </section>

        {/* -------------------------------------------- HATALAR VE CEZALAR
            Altı kart; ikon kuyusu amber (risk). Resmî tutarı olan kartta
            ceza etiketi. Altında merdiven: gecikme uzadıkça ceza. */}
        <section id={E.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={E.heading} accent={E.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">
                  <Tel>{E.lead}</Tel>
                </p>
              </FadeUp>
            </div>

            <ul className="svr-hata">
              {E.items.map((h, i) => {
                const I = IKON[h.icon];
                return (
                  <li key={h.title}>
                    <FadeUp className="svr-hata-k" delay={0.08 + i * 0.04}>
                      <span className="svr-hata-ust">
                        <span className="svr-ic" data-ton="amber" aria-hidden="true">
                          <I size={18} strokeWidth={1.9} />
                        </span>
                        {h.ceza && <span className="svr-hata-ceza">{h.ceza}</span>}
                      </span>
                      <h3 className="svr-hata-t">{h.title}</h3>
                      <p className="svr-hata-s">{h.line}</p>
                    </FadeUp>
                  </li>
                );
              })}
            </ul>

            {M && (
              <FadeUp delay={0.14}>
                <div className="svr-mrd">
                  <div className="svr-mrd-yazi">
                    <h3 className="svr-mrd-h">{M.baslik}</h3>
                    <p className="svr-mrd-s">{M.alt}</p>
                  </div>
                  <ol className="svr-mrd-l">
                    {M.basamaklar.map((b, k) => (
                      <li key={b.sure} className="svr-mrd-b" data-k={k}>
                        <b>{tutar(b.tutar)}</b>
                        <i style={{ "--h": (b.tutar / tepe).toFixed(3) } as CSSProperties} aria-hidden="true" />
                        <span>{b.sure}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </FadeUp>
            )}
          </div>
        </section>

        {/* ---------------------------------------------------------- SÜREÇ
            Dört adım yan yana (telefonda alt alta). Her kartın üstünde sayı
            ve çubuk; çubuklar sırayla doluyor (hafıza: liste + sağda kart
            kalıbı yasak, ray: çubuk + sayı). */}
        <section id={V.adimlar.id} className="sec-pad svr-kirik">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={V.adimlar.heading} accent={V.adimlar.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">
                  <Tel>{V.adimlar.lead}</Tel>
                </p>
              </FadeUp>
            </div>
            <ol className="svr-adim">
              {V.adimlar.items.map((a, i) => {
                const I = IKON[a.icon];
                return (
                  <li key={a.title}>
                    <FadeUp className="svr-adim-k" delay={0.1 + i * 0.06}>
                      <span className="svr-adim-ray" aria-hidden="true">
                        <b>{String(i + 1).padStart(2, "0")}</b>
                        <i data-k={i} />
                      </span>
                      <span className="svr-ic" aria-hidden="true">
                        <I size={18} strokeWidth={1.9} />
                      </span>
                      <h3 className="svr-adim-t">{a.title}</h3>
                      <p className="svr-adim-s">{a.line}</p>
                    </FadeUp>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------ İLGİLİ HİZMETLER
            Kartın tamamı bağlantı. SmartLink kapalı adresi sönük basar. */}
        <section id={V.ilgili.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={V.ilgili.heading} accent={V.ilgili.accent} className="h2" />
            </div>
            <ul className="svr-ilg" data-n={V.ilgili.items.length}>
              {V.ilgili.items.map((k, i) => {
                const I = IKON[k.icon];
                return (
                  <li key={k.href}>
                    <FadeUp className="svr-ilg-f" delay={0.08 + i * 0.05}>
                      <SmartLink href={k.href} className="svr-ilg-k">
                        <span className="svr-ilg-ust">
                          <span className="svr-ic" aria-hidden="true">
                            <I size={18} strokeWidth={1.9} />
                          </span>
                          <ArrowUpRight className="svr-ilg-ok" size={18} strokeWidth={2} aria-hidden="true" />
                        </span>
                        <b className="svr-ilg-t">{k.title}</b>
                        <span className="svr-ilg-s">{k.line}</span>
                      </SmartLink>
                    </FadeUp>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id={V.faq.id} className="sec-pad svr-kirik">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={V.faq.heading} accent={V.faq.accent} className="h2" />
            </div>
            <CountryFaq items={V.faq.items} />
          </div>
        </section>

        <FinalCta kapanis={V.closing} />
      </main>
    </>
  );
}
