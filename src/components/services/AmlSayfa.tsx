import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowDown,
  ArrowRight,
  Ban,
  Banknote,
  BellRing,
  BookOpen,
  Building2,
  CalendarClock,
  Check,
  ChevronDown,
  Compass,
  FileCheck,
  FileText,
  Fingerprint,
  Gavel,
  Handshake,
  IdCard,
  Landmark,
  ListChecks,
  Lock,
  Mail,
  Minus,
  Scale,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import Tel from "@/components/mobil/Tel";
import { SITE } from "@/lib/routes";
import type { AmlIkon, AmlVeri } from "@/lib/amlDubai";

/* ============================================================================
   AML VE MEVZUAT UYUMU SAYFASI · ortak gövde (09.10.2026)
   /dubai/aml-uyum, /ingiltere/aml-uyum ve /kktc/aml-uyum aynı on bölümü
   kendi verisiyle basıyor. Metin: lib/amlDubai.ts (tip de orada) ·
   lib/amlIngiltere.ts · lib/amlKktc.ts. Biçim: css/svc-aml.css (.sam-).

   Burak: "AML ve mevzuat da çok kısa, hiçbir şey yok. Üç dört kart koymuşsun,
   bitmiş. Banka, şirket kuruluşu, muhasebe çok güzel oldu: SVG görseller var,
   animasyonlar var. Az detaylandır, güzelliği yap, üşenme."
   Önceki hâl genel hizmet şablonuydu (app/ulke/[slug]/[hizmet]); yalnız
   Dubai'nin içeriği vardı. Banka sayfasının kalıbı örnek alındı (ortak gövde
   + ülke başına veri dosyası), ad alanı ayrı: bir sayfanın turu ötekini
   bozmasın (svc-vize.css başındaki gerekçe).

   BÖLÜMLER (zemin beyaz ve kırık beyaz sırayla; tek koyu şey "uyulmazsa"
   bölümündeki büyük gece kart):
     giriş        PageHero · foto giriş (kırıntıdaki "AML" fotoğrafı seçiyor)
     kimler       KARAR ŞEMASI: kök → "her şirket" kolu ve "yalnız belirli
                  faaliyetler" kolu. Sayfanın en değerli bilgisi bu ayrım.
     kapsam       üstlendiklerimiz · kapsam dışında
     yükümlülük   açılır kartlar (<details>, JS yok): ne · ne zaman · biz
     zincir       GERÇEK FAYDALANICI ZİNCİRİ çizimi + üç madde
     tarama       TARAMA AKIŞI: beş durak, her birinde küçük çizim
     takvim       UYUM DÖNGÜSÜ halkası + maddeler
     sonuç        büyük gece kart, dört sonuç (tutar yok)
     ilgili       banka · muhasebe · kurumsal danışmanlık · kuruluş
     SSS · kapanış

   HAREKET tamamen CSS'te ve prefers-reduced-motion: no-preference kapısında
   (tuzak A: reduce değeri render ağacında okunmuyor). Ekran dışında
   kendiliğinden duruyor (shared/EkranDisiDurdur · [data-ekran-disi]).
   Çizimler aria-hidden: iddia başlıkta, cümlede ve listelerde.
   SVG'lerde defs/id yok (tuzak W).
   ========================================================================= */

const IKON: Record<AmlIkon, LucideIcon> = {
  kalkan: ShieldCheck,
  parmak: Fingerprint,
  dosya: FileCheck,
  banka: Landmark,
  ara: Search,
  liste: ListChecks,
  zil: BellRing,
  terazi: Scale,
  takvim: CalendarClock,
  kisi: UserRound,
  kisiler: Users,
  bina: Building2,
  nakit: Banknote,
  kimlik: IdCard,
  posta: Mail,
  defter: BookOpen,
  ceza: Gavel,
  dur: Ban,
  kilit: Lock,
  sil: Trash2,
  hesap: Wallet,
  el: Handshake,
  pusula: Compass,
  arsiv: Archive,
};

/* ------------------------------------------------------------ KARAR ŞEMASI
   Kök kutu, altında ikiye ayrılan çatal, altında iki kol. Çatal geniş
   ekranda eğri (viewBox 1000×72, enine esniyor; çizgi kalınlığı
   non-scaling-stroke ile sabit), telefonda kollar alt alta olduğu için kısa
   bir dikme. İkisi de basılıyor, hangisinin görüneceğini CSS seçiyor.
   Sol kol mavi (her şirket), sağ kol amber (şart: yalnız belirli faaliyet;
   renk kuralı css/advx-renk.css). Renk ÇERÇEVENİN TAMAMINDA, kenar şeridi
   değil (tuzaklar · kural 4). */
function KararSemasi({ K }: { K: AmlVeri["kim"] }) {
  return (
    <div className="sam-agac">
      <div className="sam-agac-kok">
        <span className="sam-ic" aria-hidden="true">
          <Building2 size={18} strokeWidth={1.9} />
        </span>
        <b>{K.kok}</b>
      </div>
      <svg className="sam-agac-cat" viewBox="0 0 1000 72" preserveAspectRatio="none" focusable="false" aria-hidden="true">
        <path className="sam-agac-yol" d="M500 0 V20 C500 52 250 24 250 72" />
        <path className="sam-agac-yol" data-ton="amber" d="M500 0 V20 C500 52 750 24 750 72" />
      </svg>
      <svg className="sam-agac-dik" viewBox="0 0 24 36" focusable="false" aria-hidden="true">
        <path className="sam-agac-yol" d="M12 0 V36" />
      </svg>
      <div className="sam-agac-kollar">
        <FadeUp className="sam-fu" delay={0.1}>
          <div className="sam-kol">
          <span className="sam-et" data-kim="herkes">{K.herkes.etiket}</span>
          <h3 className="sam-kol-t">{K.herkes.baslik}</h3>
          <ul className="sam-kol-l">
            {K.herkes.maddeler.map((m) => (
              <li key={m}>
                <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>
          </div>
        </FadeUp>
        {/* data-ton iç kutuda: FadeUp yalnız className geçiriyor */}
        <FadeUp className="sam-fu" delay={0.18}>
          <div className="sam-kol" data-ton="amber">
          <span className="sam-et" data-kim="belirli">{K.belirli.etiket}</span>
          <h3 className="sam-kol-t">{K.belirli.soru}</h3>
          <ul className="sam-cip-l">
            {K.belirli.faaliyetler.map((f) => (
              <li key={f} className="sam-cip">{f}</li>
            ))}
          </ul>
          <p className="sam-kol-kopru">
            <ArrowDown size={15} strokeWidth={2.2} aria-hidden="true" />
            {K.belirli.kopru}
          </p>
          <ul className="sam-kol-l">
            {K.belirli.maddeler.map((m) => (
              <li key={m}>
                <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>
          </div>
        </FadeUp>
      </div>
      <p className="sam-agac-not">{K.not}</p>
    </div>
  );
}

/* ------------------------------------------------ GERÇEK FAYDALANICI ZİNCİRİ
   viewBox 360×330. Üstte iki gerçek kişi, solda araya giren şirket, altta
   "şirketiniz" (tek dolu mavi kutu: konu o). Bağlar aşağıdan yukarı akıyor:
   kayıt şirketten başlayıp gerçek kişiye kadar İZLİYOR. Kişi kartlarının
   köşesindeki onay sırayla beliriyor (önce doğrudan ortak, sonra zincirin
   ucundaki). Pay etiketleri GÖSTERİM, veriden.
   Yazı 15 birim: sahne telefonda ~0,86 ölçekle basılıyor, 15 × 0,86 ≈ 13 px
   (etiket alt sınırı 12). Lucide ikonları SVG'nin içinde x/y/width ile
   (home/ServiceScenes kalıbı). */
function ZincirSahne({ S }: { S: AmlVeri["zincir"]["sahne"] }) {
  return (
    <figure className="sam-zin">
      <svg viewBox="0 0 360 330" focusable="false" aria-hidden="true">
        {/* bağlar: A → ara · ara → şirket · B → şirket */}
        <path className="sam-zin-yol" d="M90 134 V74" />
        <path className="sam-zin-yol" d="M150 256 C150 232 90 244 90 220 V194" />
        <path className="sam-zin-yol" d="M210 256 C210 232 270 244 270 220 V74" />

        {/* gerçek kişiler */}
        <rect x="20" y="14" width="140" height="60" rx="12" className="sam-zin-kisi" />
        <UserRound x={34} y={32} width={24} height={24} strokeWidth={1.9} className="sam-zin-ik" />
        <text x="68" y="49" className="sam-zin-t">{S.kisiA}</text>
        <rect x="200" y="14" width="140" height="60" rx="12" className="sam-zin-kisi" />
        <UserRound x={214} y={32} width={24} height={24} strokeWidth={1.9} className="sam-zin-ik" />
        <text x="248" y="49" className="sam-zin-t">{S.kisiB}</text>

        {/* araya giren şirket */}
        <rect x="20" y="134" width="140" height="60" rx="12" className="sam-zin-ara" />
        <Building2 x={34} y={152} width={24} height={24} strokeWidth={1.9} className="sam-zin-ik-s" />
        <text x="68" y="169" className="sam-zin-t sam-zin-t-s">{S.ara}</text>

        {/* şirketiniz */}
        <rect x="100" y="256" width="160" height="60" rx="12" className="sam-zin-sirket" />
        <Building2 x={116} y={274} width={24} height={24} strokeWidth={1.9} className="sam-zin-ik-b" />
        <text x="150" y="291" className="sam-zin-t sam-zin-t-b">{S.sirket}</text>

        {/* pay etiketleri */}
        <g>
          <rect x="62" y="92" width="56" height="24" rx="12" className="sam-zin-pay" />
          <text x="90" y="109" textAnchor="middle" className="sam-zin-pt">{S.payA}</text>
        </g>
        <g>
          <rect x="62" y="202" width="56" height="24" rx="12" className="sam-zin-pay" />
          <text x="90" y="219" textAnchor="middle" className="sam-zin-pt">{S.payAra}</text>
        </g>
        <g>
          <rect x="242" y="140" width="56" height="24" rx="12" className="sam-zin-pay" />
          <text x="270" y="157" textAnchor="middle" className="sam-zin-pt">{S.payB}</text>
        </g>

        {/* onaylar: kişi kartlarının sağ üst köşesi */}
        <g className="sam-zin-tik" data-i="1">
          <circle cx="160" cy="14" r="11" />
          <path d="M155 14.5 L158.6 18 L165.2 10.6" />
        </g>
        <g className="sam-zin-tik" data-i="0">
          <circle cx="340" cy="14" r="11" />
          <path d="M335 14.5 L338.6 18 L345.2 10.6" />
        </g>
      </svg>
      <figcaption className="sam-zin-alt">{S.alt}</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------- TARAMA ÇİZİMLERİ
   Beş durağın küçük çizimleri, viewBox 96×64. Sıra sabit: müşteri · kimlik ·
   yaptırım listesi · risk puanı · kayıt. Her birinde tek küçük hareket var
   (hareket politikası: çok çizim varsa hepsi minimal): kimlikte tarama
   çizgisi, listede sırayla işaretlenen satırlar, risk göstergesinde ibre.
   Risk göstergesinin son dilimi amber (risk). */
function TaramaCizim({ i }: { i: number }) {
  return (
    <svg className="sam-tc" viewBox="0 0 96 64" focusable="false" aria-hidden="true">
      {i === 0 && (
        <>
          <rect x="28" y="6" width="40" height="52" rx="9" className="sam-tc-kutu" />
          <circle cx="48" cy="26" r="8" className="sam-tc-dolu" />
          <path d="M34 50 C34 38 62 38 62 50" className="sam-tc-cizgi" />
        </>
      )}
      {i === 1 && (
        <>
          <rect x="12" y="10" width="72" height="44" rx="8" className="sam-tc-kutu" />
          <rect x="20" y="19" width="20" height="26" rx="5" className="sam-tc-dolu" />
          <path d="M48 23 H76 M48 32 H70 M48 41 H74" className="sam-tc-satir" />
          <rect x="12" y="12" width="72" height="3" rx="1.5" className="sam-tc-tara" />
        </>
      )}
      {i === 2 && (
        <>
          <rect x="18" y="5" width="50" height="54" rx="8" className="sam-tc-kutu" />
          <path d="M34 18 H58 M34 32 H58 M34 46 H50" className="sam-tc-satir" />
          <path d="M24.5 18 l2.4 2.4 l4 -4.6" className="sam-tc-tik" data-i="0" />
          <path d="M24.5 32 l2.4 2.4 l4 -4.6" className="sam-tc-tik" data-i="1" />
          <path d="M24.5 46 l2.4 2.4 l4 -4.6" className="sam-tc-tik" data-i="2" />
          <circle cx="68" cy="44" r="10" className="sam-tc-mercek" />
          <path d="M75.5 51.5 L83 59" className="sam-tc-cizgi" />
        </>
      )}
      {i === 3 && (
        <>
          <path d="M20 50 A28 28 0 0 1 34 25.75" className="sam-tc-yay" data-d="0" />
          <path d="M34 25.75 A28 28 0 0 1 62 25.75" className="sam-tc-yay" data-d="1" />
          <path d="M62 25.75 A28 28 0 0 1 76 50" className="sam-tc-yay" data-d="2" />
          <path d="M48 50 V27" className="sam-tc-ibre" />
          <circle cx="48" cy="50" r="4.5" className="sam-tc-dolu" />
        </>
      )}
      {i === 4 && (
        <>
          <path d="M14 16 a5 5 0 0 1 5 -5 h18 l7 7 h33 a5 5 0 0 1 5 5 v28 a5 5 0 0 1 -5 5 h-58 a5 5 0 0 1 -5 -5 z" className="sam-tc-kutu" />
          <circle cx="48" cy="38" r="10" className="sam-tc-dolu" />
          <path d="M43.4 38.4 L46.8 41.6 L53 34.6" className="sam-tc-beyaz" />
        </>
      )}
    </svg>
  );
}

/* --------------------------------------------------------- UYUM DÖNGÜSÜ
   Halka, madde sayısı kadar dilime bölünüyor; her dilim yanındaki listenin
   aynı numaralı maddesi. Dilimler AY DEĞİL: yükümlülüklerin çoğu takvim
   gününe değil olaya bağlı (kuruluş, değişiklik), halkayı aylara bölmek
   olmayan bir tarih iddia ederdi. Dilim = pathLength 100 üstünde kesik çizgi
   (defs ve id yok). Dışta dönen nokta: döngü sürüyor. Amber dilim şart
   ("değişiklik olursa"). */
function Dongu({ T }: { T: AmlVeri["takvim"] }) {
  const n = T.items.length;
  const dilim = 100 / n;
  return (
    <svg className="sam-don" viewBox="0 0 240 240" focusable="false" aria-hidden="true">
      {T.items.map((it, i) => {
        /* dilimin orta açısı (saat 12'den, saat yönünde) → numaranın yeri */
        const aci = ((i + 0.5) / n) * Math.PI * 2 - Math.PI / 2;
        return (
          <g key={it.title}>
            <circle
              cx="120"
              cy="120"
              r="78"
              pathLength={100}
              className="sam-don-dilim"
              data-ton={it.ton}
              strokeDasharray={`${dilim - 2.4} ${100 - dilim + 2.4}`}
              strokeDashoffset={-(i * dilim + 1.2)}
              transform="rotate(-90 120 120)"
            />
            <text
              x={Number((120 + Math.cos(aci) * 78).toFixed(2))}
              y={Number((120 + Math.sin(aci) * 78 + 5.5).toFixed(2))}
              textAnchor="middle"
              className="sam-don-no"
              data-ton={it.ton}
            >
              {i + 1}
            </text>
          </g>
        );
      })}
      <g className="sam-don-el">
        <circle cx="120" cy="14" r="6" />
      </g>
      <CalendarClock x={104} y={88} width={32} height={32} strokeWidth={1.7} className="sam-don-ik" />
      <text x="120" y="146" textAnchor="middle" className="sam-don-orta">{T.orta}</text>
    </svg>
  );
}

function Bas({ B }: { B: { heading: string; accent: string; lead: string } }) {
  return (
    <div className="sec-head">
      <SplitWords as="h2" text={B.heading} accent={B.accent} className="h2" />
      <FadeUp delay={0.2}>
        <p className="sec-lead"><Tel>{B.lead}</Tel></p>
      </FadeUp>
    </div>
  );
}

export default function AmlSayfa({ veri: A }: { veri: AmlVeri }) {
  const H = A.hero;
  const PAGE_URL = `${SITE}${A.yol}`;
  /* Yapısal veri: muhasebe sayfasının üçlüsü (kırıntı · hizmet · SSS). */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: A.ulke, item: `${SITE}/${A.yol.split("/")[1]}` },
          { "@type": "ListItem", position: 3, name: "AML ve mevzuat uyumu", item: PAGE_URL },
        ],
      },
      {
        "@type": "Service",
        name: A.seo.title.replace(/\s*\|\s*Ortac Global$/, ""),
        serviceType: "AML ve mevzuat uyumu",
        url: PAGE_URL,
        provider: { "@type": "Organization", name: "Ortac Global", url: SITE },
        areaServed: { "@type": "Place", name: A.ulke },
        description: A.seo.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: A.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main>
        <PageHero
          crumb={H.crumb}
          title={H.title}
          accent={H.accent}
          lead={H.lead}
          rozetler={H.rozetler}
          cta={H.cta}
        />

        {/* ------------------------------------------------ KİMLER İÇİN ZORUNLU */}
        <section id={A.kim.id} className="sec-pad sam-sec">
          <div className="container-o">
            <Bas B={A.kim} />
            <KararSemasi K={A.kim} />
          </div>
        </section>

        {/* ------------------------------------------------- NE YAPIYORUZ
            İki kart: üstlendiklerimiz (mavi onay) · kapsam dışında (amber
            eksi; "şart ve önemli not" amber). */}
        <section id={A.kapsam.id} className="sec-pad sam-sec sam-kirik">
          <div className="container-o">
            <Bas B={A.kapsam} />
            <div className="sam-kap">
              <FadeUp className="sam-kap-k" delay={0.1}>
                <h3 className="sam-kap-t">
                  <span className="sam-ic" aria-hidden="true">
                    <ShieldCheck size={18} strokeWidth={1.9} />
                  </span>
                  {A.kapsam.var.title}
                </h3>
                <ul className="sam-kap-l">
                  {A.kapsam.var.items.map((m) => (
                    <li key={m}>
                      <span className="sam-kap-i" aria-hidden="true">
                        <Check size={14} strokeWidth={2.6} />
                      </span>
                      {m}
                    </li>
                  ))}
                </ul>
              </FadeUp>
              <FadeUp className="sam-kap-k" delay={0.18}>
                <h3 className="sam-kap-t">
                  <span className="sam-ic" data-ton="amber" aria-hidden="true">
                    <FileText size={18} strokeWidth={1.9} />
                  </span>
                  {A.kapsam.yok.title}
                </h3>
                <ul className="sam-kap-l">
                  {A.kapsam.yok.items.map((m) => (
                    <li key={m}>
                      <span className="sam-kap-i" data-ton="amber" aria-hidden="true">
                        <Minus size={14} strokeWidth={2.6} />
                      </span>
                      {m}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ------------------------------------------- YÜKÜMLÜLÜKLER TEK TEK
            Açılır kart = yerel <details>: JS yok, klavye ve ekran okuyucu
            hazır. Kapalıyken ad, tek cümle ve "kimin için" etiketi; açılınca
            üç cevap. */}
        <section id={A.yukum.id} className="sec-pad sam-sec">
          <div className="container-o">
            <Bas B={A.yukum} />
            <ul className="sam-yk-l">
              {A.yukum.items.map((y, i) => {
                const I = IKON[y.icon];
                return (
                  <li key={y.title}>
                    <FadeUp delay={0.06 + i * 0.04}>
                      <details className="sam-yk" data-kim={y.kim}>
                        <summary className="sam-yk-bas">
                          <span className="sam-ic" data-ton={y.kim === "belirli" ? "amber" : y.kim === "kalkti" ? "gri" : undefined} aria-hidden="true">
                            <I size={18} strokeWidth={1.9} />
                          </span>
                          <span className="sam-yk-ad">
                            <b>{y.title}</b>
                            <span>{y.line}</span>
                          </span>
                          <span className="sam-et" data-kim={y.kim}>{y.etiket}</span>
                          <ChevronDown className="sam-yk-ok" size={18} strokeWidth={2} aria-hidden="true" />
                        </summary>
                        <dl className="sam-yk-ic">
                          <div>
                            <dt>{A.yukum.sorular.ne}</dt>
                            <dd>{y.ne}</dd>
                          </div>
                          <div>
                            <dt>{A.yukum.sorular.zaman}</dt>
                            <dd>{y.zaman}</dd>
                          </div>
                          <div>
                            <dt>{A.yukum.sorular.biz}</dt>
                            <dd>{y.biz}</dd>
                          </div>
                        </dl>
                      </details>
                    </FadeUp>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------- GERÇEK FAYDALANICI
            Solda zincir çizimi, sağda üç madde (banka ve vize sayfalarının
            sahne + satır düzeni). */}
        <section id={A.zincir.id} className="sec-pad sam-sec sam-kirik">
          <div className="container-o">
            <Bas B={A.zincir} />
            <div className="sam-bol">
              <FadeUp className="sam-sahne" delay={0.1}>
                <ZincirSahne S={A.zincir.sahne} />
              </FadeUp>
              <ul className="sam-mad">
                {A.zincir.points.map((p, i) => {
                  const I = IKON[p.icon];
                  return (
                    <li key={p.title}>
                      <FadeUp className="sam-mad-s" delay={0.12 + i * 0.05}>
                        <span className="sam-ic" aria-hidden="true">
                          <I size={18} strokeWidth={1.9} />
                        </span>
                        <div>
                          <b className="sam-mad-t">{p.title}</b>
                          <p className="sam-mad-p">{p.line}</p>
                        </div>
                      </FadeUp>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- TARAMA AKIŞI
            Beş durak: geniş ekranda yan yana, telefonda alt alta (yana
            kaydırma yok). Duraklar sırayla yanıyor (svc-aml.css · samDurak). */}
        <section id={A.tarama.id} className="sec-pad sam-sec">
          <div className="container-o">
            <Bas B={A.tarama} />
            <ol className="sam-tar">
              {A.tarama.duraklar.slice(0, 5).map((d, i) => (
                <li key={d.title}>
                  <FadeUp className="sam-fu" delay={0.08 + i * 0.06}>
                    <div className="sam-tar-k" data-i={i}>
                    <span className="sam-tar-c">
                      <TaramaCizim i={i} />
                    </span>
                    <span className="sam-tar-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="sam-tar-t">{d.title}</h3>
                    <p className="sam-tar-s">{d.line}</p>
                    </div>
                  </FadeUp>
                </li>
              ))}
            </ol>
            <SmartLink href={A.tarama.exit.href} className="sam-cik">
              {A.tarama.exit.label}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </SmartLink>
          </div>
        </section>

        {/* ---------------------------------------------------- UYUM DÖNGÜSÜ */}
        <section id={A.takvim.id} className="sec-pad sam-sec sam-kirik">
          <div className="container-o">
            <Bas B={A.takvim} />
            <div className="sam-bol" data-yon="ayna">
              <FadeUp className="sam-sahne" delay={0.1}>
                <Dongu T={A.takvim} />
              </FadeUp>
              <ol className="sam-mad">
                {A.takvim.items.map((t, i) => (
                  <li key={t.title}>
                    <FadeUp className="sam-mad-s" delay={0.12 + i * 0.05}>
                      <span className="sam-no" data-ton={t.ton} aria-hidden="true">
                        {i + 1}
                      </span>
                      <div>
                        <span className="sam-zaman" data-ton={t.ton}>{t.zaman}</span>
                        <b className="sam-mad-t">{t.title}</b>
                        <p className="sam-mad-p">{t.line}</p>
                      </div>
                    </FadeUp>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ UYULMAZSA NE OLUR
            Sayfanın tek koyu yüzeyi: büyük gece kart (tam siyah bölüm yok;
            başlık kartın dışında, açık zeminde). Risk: ikonlar amber. */}
        <section id={A.sonuc.id} className="sec-pad sam-sec">
          <div className="container-o">
            <Bas B={A.sonuc} />
            <div className="sam-gece">
              <ul className="sam-gece-l">
                {A.sonuc.items.map((s, i) => {
                  const I = IKON[s.icon];
                  return (
                    <li key={s.title}>
                      <FadeUp className="sam-gece-k" delay={0.08 + i * 0.05}>
                        <span className="sam-gece-ic" aria-hidden="true">
                          <I size={18} strokeWidth={1.9} />
                        </span>
                        <b>{s.title}</b>
                        <p>{s.line}</p>
                      </FadeUp>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- İLGİLİ HİZMETLER
            SmartLink: adres yayında değilse kart sönük ve tıklanmaz çıkıyor
            (lib/routes.ts karar veriyor). */}
        <section id={A.ilgili.id} className="sec-pad sam-sec sam-kirik">
          <div className="container-o">
            <Bas B={A.ilgili} />
            <ul className="sam-ilg">
              {A.ilgili.items.map((k, i) => {
                const I = IKON[k.icon];
                return (
                  <li key={k.href}>
                    <FadeUp className="sam-ilg-s" delay={0.08 + i * 0.05}>
                      <SmartLink href={k.href} className="sam-ilg-k">
                        <span className="sam-ic" aria-hidden="true">
                          <I size={18} strokeWidth={1.9} />
                        </span>
                        <b>{k.title}</b>
                        <span className="sam-ilg-p">{k.line}</span>
                        <ArrowRight className="sam-ilg-ok" size={18} strokeWidth={2} aria-hidden="true" />
                      </SmartLink>
                    </FadeUp>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id={A.faq.id} className="sec-pad sam-sec">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={A.faq.heading} accent={A.faq.accent} className="h2" />
            </div>
            <CountryFaq items={A.faq.items} />
          </div>
        </section>

        <FinalCta kapanis={A.closing} />
      </main>
    </>
  );
}
