/* DUBAİ · ÜÇ SERBEST BÖLGE + VIP VİZE HİZMETİ (06.10.2026).
   Burak: "Dubai sayfasına VIP hizmetimizi daha detaylı anlatan bir şeyler
   ekleyebiliriz + bu üç serbest bölgeyi de anlatmamız lazım bir yerinde."

   KAYNAK. Müşterinin kendi teklif belgesi (ORTAC Accounting Services LLC,
   Dubai Free Zone teklifi, 06.10.2026 tarihli PDF): "Hangi Dubai Free Zone?",
   "VIP Vize Hizmeti" ve "Packages" bölümleri. Buradaki her madde o belgeden;
   belgede olmayan hiçbir özellik eklenmedi. Uzun paragraflar kısaltıldı
   (sayfada açıklama en fazla iki satır, maddeler kutuda).

   VIP'TE SÜRE. Belge: standart süreçte Dubai'de gereken işlemler yaklaşık
   10-12 iş günü, VIP'te yaklaşık 5 iş günü; "süreler tahmini, garanti
   değil". Sayfaya dipnot düşülmüyor (kural), o yüzden iki rakam da
   "yaklaşık" diye yazılı.

   Ad alanı .dbe- (css/dubai-ek.css). Sunucu bileşeni, hareket yok. */

import {
  ArrowRight,
  Building2,
  Crown,
  Landmark,
  Layers,
  MapPin,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import { BOLGELER, VIP, money, type Bolge } from "@/lib/dubaiFiyat";
import "@/app/css/dubai-ek.css";

/* 06.10.2026 (ikinci tur) · Burak: "orası biraz kalabalık … tasarımı güzel
   değil. Her birinde tik atmışsın, onlara ikon gelebilir. Burada fiyat
   yazmaya gerek yok. Bir SVG görsel bir şeyler ekleyebilirsin."
   Kart: üstte bölgenin çizimi (koyu pencere), ad, tek cümle, ÜÇ madde
   (dörtten indi) ve her maddenin kendi ikonu. Fiyat kalktı; fiyat tek
   yerde, panelde. Çizimler bölgenin gerçek bir özelliğinden: IFZA Dubai
   Silicon Oasis'te (teknoloji kampüsü), Meydan dijital kuruluş (ekran ve
   onay), DWTC şehir merkezindeki kule. */
type Madde = { Icon: LucideIcon; t: string };
const BOLGE_ANLATIM: Record<Bolge, { tam: string; kime: string; rozet?: string; maddeler: Madde[] }> = {
  ifza: {
    tam: "IFZA",
    rozet: "En çok tercih edilen",
    kime: "Danışmanlık, ticaret, teknoloji ve hizmet işlerini tek yapıda toplayanlar için.",
    maddeler: [
      { Icon: Layers, t: "Esnek faaliyet ve lisans yapısı" },
      { Icon: Wallet, t: "Rekabetçi kuruluş maliyeti" },
      { Icon: MapPin, t: "Dubai Silicon Oasis'te" },
    ],
  },
  meydan: {
    tam: "Meydan Free Zone",
    kime: "Fiziksel ofis ihtiyacı sınırlı, işini esnek ve dijital yürüten şirketler için.",
    maddeler: [
      { Icon: Zap, t: "Dijital ve hızlı kuruluş süreci" },
      { Icon: Layers, t: "Esnek faaliyet ve lisans yapısı" },
      { Icon: Landmark, t: "Devlet otorite yapısı" },
    ],
  },
  dwtc: {
    tam: "DWTC Free Zone",
    kime: "Dubai'de güçlü bir fiziksel ve kurumsal varlık isteyen işletmeler için.",
    maddeler: [
      { Icon: Building2, t: "Kurumsal yapı, premium çalışma alanı" },
      { Icon: MapPin, t: "Dubai'nin merkezinde, Downtown" },
      { Icon: Landmark, t: "Devlet otorite yapısı" },
    ],
  },
};

/* Bölge çizimleri · 320 × 150, koyu pencere. Renk: mavi ağırlık, tek amber
   ya da yeşil nokta yok (para ve şart yok burada). Süs; ekran okuyucudan
   gizli. */
function BolgeCizim({ k }: { k: Bolge }) {
  const zemin = <line x1="0" y1="128" x2="320" y2="128" stroke="#2a2a2a" strokeWidth="1.5" />;
  if (k === "ifza")
    return (
      <svg viewBox="0 0 320 150" className="dbe-svg" aria-hidden="true">
        {zemin}
        {/* teknoloji kampüsü: alçak, geniş bloklar */}
        <rect x="34" y="84" width="62" height="44" rx="4" fill="#12233f" stroke="#2f5fa8" strokeWidth="1.5" />
        <rect x="106" y="58" width="74" height="70" rx="4" fill="#163056" stroke="#5a9eef" strokeWidth="1.5" />
        <rect x="190" y="74" width="54" height="54" rx="4" fill="#12233f" stroke="#2f5fa8" strokeWidth="1.5" />
        <rect x="254" y="96" width="36" height="32" rx="4" fill="#12233f" stroke="#2f5fa8" strokeWidth="1.5" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect key={`${r}-${c}`} x={116 + c * 15} y={68 + r * 16} width="9" height="8" rx="1.5" fill="#7fb0ff" opacity={(r + c) % 3 === 0 ? 1 : 0.35} />
          )),
        )}
        {/* çip: Silicon Oasis */}
        <rect x="46" y="96" width="38" height="22" rx="3" fill="none" stroke="#7fb0ff" strokeWidth="1.5" />
        {[52, 62, 72].map((x) => (
          <g key={x} stroke="#7fb0ff" strokeWidth="1.5">
            <line x1={x} y1="92" x2={x} y2="96" />
            <line x1={x} y1="118" x2={x} y2="122" />
          </g>
        ))}
        <circle cx="65" cy="107" r="4" fill="#5a9eef" />
      </svg>
    );
  if (k === "meydan")
    return (
      <svg viewBox="0 0 320 150" className="dbe-svg" aria-hidden="true">
        {zemin}
        {/* dijital kuruluş: ekranda başvuru, üç satır ve onay */}
        <rect x="92" y="30" width="136" height="84" rx="8" fill="#12233f" stroke="#5a9eef" strokeWidth="1.5" />
        <line x1="92" y1="46" x2="228" y2="46" stroke="#2f5fa8" strokeWidth="1.5" />
        <circle cx="103" cy="38" r="2.5" fill="#7fb0ff" />
        <circle cx="112" cy="38" r="2.5" fill="#2f5fa8" />
        {[58, 74, 90].map((y, i) => (
          <g key={y}>
            <rect x="106" y={y} width={[70, 54, 62][i]} height="7" rx="3.5" fill="#2f5fa8" />
            <circle cx="206" cy={y + 3.5} r="7" fill="#5a9eef" />
            <path d={`M202.5 ${y + 3.5}l2.4 2.4 4.6-4.8`} fill="none" stroke="#0b1626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
        <rect x="140" y="114" width="40" height="8" fill="#163056" />
        <rect x="120" y="122" width="80" height="6" rx="3" fill="#2f5fa8" />
      </svg>
    );
  return (
    <svg viewBox="0 0 320 150" className="dbe-svg" aria-hidden="true">
      {zemin}
      {/* şehir merkezi: ortada kule, iki yanında alçak yapılar */}
      <rect x="62" y="86" width="40" height="42" rx="3" fill="#12233f" stroke="#2f5fa8" strokeWidth="1.5" />
      <rect x="108" y="66" width="32" height="62" rx="3" fill="#12233f" stroke="#2f5fa8" strokeWidth="1.5" />
      <rect x="146" y="20" width="40" height="108" rx="3" fill="#163056" stroke="#5a9eef" strokeWidth="1.5" />
      <rect x="192" y="74" width="34" height="54" rx="3" fill="#12233f" stroke="#2f5fa8" strokeWidth="1.5" />
      <rect x="232" y="94" width="30" height="34" rx="3" fill="#12233f" stroke="#2f5fa8" strokeWidth="1.5" />
      {Array.from({ length: 9 }, (_, r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={153 + c * 10} y={28 + r * 11} width="6" height="6" rx="1" fill="#7fb0ff" opacity={(r * 2 + c) % 4 === 0 ? 1 : 0.35} />
        )),
      )}
      <line x1="166" y1="20" x2="166" y2="8" stroke="#5a9eef" strokeWidth="1.5" />
    </svg>
  );
}

export function DubaiBolgeler() {
  /* zemin kâğıt: sayfanın üstünde art arda dört beyaz bölüm vardı */
  return (
    <section id="serbest-bolgeler" className="sec-pad" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Üç serbest bölge, hangisi size uygun?"
            accent="hangisi size uygun?"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Üçünün de sözleşmeli iş ortağıyız. Hangisinin uygun olduğuna işinize bakarak birlikte karar veriyoruz.
            </p>
          </FadeUp>
        </div>

        <div className="dbe-bolgeler">
          {BOLGELER.map((k, i) => {
            const a = BOLGE_ANLATIM[k];
            return (
              <FadeUp key={k} delay={0.08 * i}>
                <article className="dbe-bolge">
                  <div className="dbe-bolge-fig">
                    <BolgeCizim k={k} />
                    {a.rozet && <span className="dbe-rozet">{a.rozet}</span>}
                  </div>
                  <div className="dbe-bolge-ic">
                    <h3 className="dbe-bolge-ad">{a.tam}</h3>
                    <p className="dbe-bolge-kime">{a.kime}</p>
                    <ul className="dbe-liste">
                      {a.maddeler.map(({ Icon, t }) => (
                        <li key={t}>
                          <span className="dbe-liste-ic">
                            <Icon size={16} strokeWidth={2} aria-hidden="true" />
                          </span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* VIP KAPSAMI · ÇİZİMLİ (07.10.2026). Burak: "sağdaki avantajları bir tık
   daha göze batırabiliriz; sadece ikonla değil, biraz çizim girebilir işin
   içine, alan da var." Altı madde aynı (teklif PDF'i · VIP Vize Hizmeti);
   her birinin ikon karosu yerine küçük bir çizimi var. Palet VIP'in
   amberi: koyu çizgi #2a1f0c, amber #e0a43c, açık dolgu #fbe9c4. */
type VipKey = "karsilama" | "arac" | "danisman" | "saglik" | "kimlik" | "randevu";
const VIP_KAPSAM: { k: VipKey; t: string }[] = [
  { k: "karsilama", t: "Havalimanından özel karşılama" },
  { k: "arac", t: "Süreç boyunca lüks araçla ulaşım" },
  { k: "danisman", t: "Resmî işlemlerde Türkçe konuşan danışman" },
  { k: "saglik", t: "Premium sağlık merkezinde sağlık testi" },
  { k: "kimlik", t: "Emirates ID ve biyometri randevuları" },
  { k: "randevu", t: "Randevular siz gelmeden hazır" },
];

function VipCizim({ k }: { k: VipKey }) {
  const K = "#2a1f0c";
  const A = "#e0a43c";
  const D = "#fbe9c4";
  const cizgi = { fill: "none", stroke: K, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  const govde = (() => {
    switch (k) {
      case "karsilama":
        return (
          <>
            {/* iniş yayı ve uçak */}
            <path d="M14 22c26 2 46 14 62 34" {...cizgi} stroke={A} strokeDasharray="3 6" />
            <path d="M70 46l14 12-18-2z" fill={K} />
            {/* karşılayan kişi ve elindeki tabela */}
            <circle cx="116" cy="34" r="7" fill={D} stroke={K} strokeWidth="2" />
            <path d="M104 72c0-12 5-20 12-20s12 8 12 20" {...cizgi} fill={D} />
            <rect x="128" y="38" width="30" height="18" rx="3" fill={A} stroke={K} strokeWidth="2" />
            <line x1="134" y1="47" x2="152" y2="47" stroke={K} strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="72" x2="164" y2="72" stroke={K} strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case "arac":
        return (
          <>
            <path d="M24 58h132v-8c0-5-4-9-10-10l-18-3-14-14c-2-2-5-3-8-3H74c-4 0-8 2-10 5L54 38l-22 5c-5 1-8 5-8 9z" {...cizgi} fill={D} />
            <path d="M68 38l8-11h26l12 11z" fill="#ffffff" stroke={K} strokeWidth="2" strokeLinejoin="round" />
            <circle cx="58" cy="60" r="10" fill={K} />
            <circle cx="58" cy="60" r="4" fill={A} />
            <circle cx="126" cy="60" r="10" fill={K} />
            <circle cx="126" cy="60" r="4" fill={A} />
            <line x1="12" y1="72" x2="168" y2="72" stroke={K} strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case "danisman":
        return (
          <>
            <path d="M22 18h64a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H50l-14 12V54h-14a8 8 0 0 1-8-8V26a8 8 0 0 1 8-8z" {...cizgi} fill={D} />
            <text x="54" y="43" textAnchor="middle" fontSize="17" fontWeight="700" fill={K} fontFamily="inherit">
              TR
            </text>
            <path d="M104 34h52a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8h-8v10l-12-10h-32a8 8 0 0 1-8-8V42a8 8 0 0 1 8-8z" {...cizgi} fill={A} />
            <line x1="110" y1="46" x2="150" y2="46" stroke={K} strokeWidth="2" strokeLinecap="round" />
            <line x1="110" y1="55" x2="138" y2="55" stroke={K} strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case "saglik":
        return (
          <>
            <rect x="24" y="16" width="132" height="54" rx="10" {...cizgi} fill={D} />
            {/* nabız çizgisi */}
            <path d="M34 46h26l8-16 12 30 10-22 6 8h30" {...cizgi} stroke={A} strokeWidth="3" />
            {/* artı */}
            <circle cx="140" cy="30" r="10" fill={K} />
            <path d="M140 25v10M135 30h10" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
          </>
        );
      case "kimlik":
        return (
          <>
            <rect x="20" y="16" width="140" height="56" rx="10" {...cizgi} fill={D} />
            <circle cx="50" cy="38" r="9" fill="#ffffff" stroke={K} strokeWidth="2" />
            <path d="M36 62c0-8 6-13 14-13s14 5 14 13" {...cizgi} />
            <line x1="78" y1="32" x2="112" y2="32" stroke={K} strokeWidth="2" strokeLinecap="round" />
            <line x1="78" y1="44" x2="104" y2="44" stroke={K} strokeWidth="2" strokeLinecap="round" />
            {/* parmak izi */}
            <path d="M126 56c0-10 3-20 10-20s10 10 10 20" {...cizgi} stroke={A} strokeWidth="2.4" />
            <path d="M131 58c0-8 1-15 5-15s5 7 5 15" {...cizgi} stroke={A} strokeWidth="2.4" />
            <path d="M121 52c0-12 5-22 15-22s15 10 15 22" {...cizgi} stroke={A} strokeWidth="2.4" />
          </>
        );
      default:
        return (
          <>
            <rect x="34" y="18" width="112" height="56" rx="10" {...cizgi} fill={D} />
            <path d="M34 34h112" {...cizgi} />
            <line x1="58" y1="12" x2="58" y2="24" stroke={K} strokeWidth="3" strokeLinecap="round" />
            <line x1="122" y1="12" x2="122" y2="24" stroke={K} strokeWidth="3" strokeLinecap="round" />
            {[0, 1, 2].map((c) => (
              <g key={c}>
                <circle cx={60 + c * 30} cy="54" r="9" fill={c < 2 ? A : "#ffffff"} stroke={K} strokeWidth="2" />
                {c < 2 && <path d={`M${55.5 + c * 30} 54l3 3 6-6.5`} {...cizgi} />}
              </g>
            ))}
          </>
        );
    }
  })();
  return (
    <svg viewBox="0 0 180 88" className="dbe-vsvg" aria-hidden="true">
      {govde}
    </svg>
  );
}

export function DubaiVip() {
  return (
    <section id="vip" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="VIP vize hizmeti: Dubai'de yaklaşık 5 iş günü."
            accent="Dubai'de yaklaşık 5 iş günü."
            accentColor="var(--amber-600)"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Vize ve Emirates ID için Dubai&apos;de bulunmanız gerekiyor. VIP&apos;te randevular önceden kurulur, kalış
              süreniz kısalır.
            </p>
          </FadeUp>
        </div>

        <div className="dbe-vip">
          <FadeUp>
            <div className="dbe-sure">
              <span className="dbe-vip-rozet">
                <Crown size={15} strokeWidth={2} aria-hidden="true" />
                VIP
              </span>
              <span className="dbe-sure-k">Dubai&apos;de geçireceğiniz süre</span>
              <div className="dbe-cubuk" data-tip="standart">
                <span className="dbe-cubuk-ad">Standart</span>
                <span className="dbe-cubuk-ray">
                  <i />
                </span>
                <b>yaklaşık 10-12 iş günü</b>
              </div>
              <div className="dbe-cubuk" data-tip="vip">
                <span className="dbe-cubuk-ad">VIP</span>
                <span className="dbe-cubuk-ray">
                  <i />
                </span>
                <b>yaklaşık 5 iş günü</b>
              </div>
              <div className="dbe-vip-alt">
                <span className="dbe-vip-fiyat">
                  <b>{money(VIP)}</b> tek seferlik
                </span>
                <SmartLink href="#fiyat" className="btn btn-primary">
                  Fiyata ekleyin
                  <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                </SmartLink>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <ul className="dbe-kapsam">
              {VIP_KAPSAM.map(({ k, t }) => (
                <li key={k}>
                  <span className="dbe-vfig">
                    <VipCizim k={k} />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
