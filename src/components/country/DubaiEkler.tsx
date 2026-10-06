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
  CalendarClock,
  Car,
  Crown,
  Fingerprint,
  Landmark,
  Languages,
  Layers,
  MapPin,
  PlaneLanding,
  Stethoscope,
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

const VIP_KAPSAM: { Icon: LucideIcon; t: string }[] = [
  { Icon: PlaneLanding, t: "Havalimanından özel karşılama" },
  { Icon: Car, t: "Süreç boyunca lüks araçla ulaşım" },
  { Icon: Languages, t: "Resmî işlemlerde Türkçe konuşan danışman" },
  { Icon: Stethoscope, t: "Premium sağlık merkezinde sağlık testi" },
  { Icon: Fingerprint, t: "Emirates ID ve biyometri randevuları" },
  { Icon: CalendarClock, t: "Randevular siz gelmeden hazır" },
];

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
              {VIP_KAPSAM.map(({ Icon, t }) => (
                <li key={t}>
                  <span className="dbe-ic">
                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
