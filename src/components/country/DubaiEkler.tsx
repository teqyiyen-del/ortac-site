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
  CalendarClock,
  Car,
  Crown,
  Check,
  Fingerprint,
  Languages,
  PlaneLanding,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import { BOLGE, BOLGELER, VIP, money, type Bolge } from "@/lib/dubaiFiyat";
import "@/app/css/dubai-ek.css";

const BOLGE_ANLATIM: Record<Bolge, { tam: string; kime: string; rozet?: string; maddeler: string[] }> = {
  ifza: {
    tam: "IFZA",
    rozet: "En çok tercih edilen",
    kime: "Danışmanlık, ticaret, teknoloji ve hizmet işlerini tek yapıda toplayanlar için.",
    maddeler: [
      "Esnek faaliyet ve lisans yapısı",
      "Rekabetçi kuruluş maliyeti",
      "Özel otorite yapısı",
      "Dubai Silicon Oasis'te",
    ],
  },
  meydan: {
    tam: "Meydan Free Zone",
    kime: "Fiziksel ofis ihtiyacı sınırlı, işini esnek ve dijital yürüten şirketler için.",
    maddeler: [
      "Dijital ve hızlı kuruluş süreci",
      "Esnek faaliyet ve lisans yapısı",
      "Rekabetçi kuruluş maliyeti",
      "Devlet otorite yapısı",
    ],
  },
  dwtc: {
    tam: "DWTC Free Zone",
    kime: "Dubai'de güçlü bir fiziksel ve kurumsal varlık isteyen işletmeler için.",
    maddeler: [
      "Kurumsal yapı, premium çalışma alanı",
      "Esnek faaliyet ve lisans yapısı",
      "Dubai'nin merkezinde, Downtown",
      "Devlet otorite yapısı",
    ],
  },
};

export function DubaiBolgeler() {
  return (
    <section id="serbest-bolgeler" className="sec-pad" style={{ background: "var(--white)" }}>
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
                  <header className="dbe-bolge-ust">
                    <h3 className="dbe-bolge-ad">{a.tam}</h3>
                    {a.rozet && <span className="dbe-rozet">{a.rozet}</span>}
                  </header>
                  <p className="dbe-bolge-kime">{a.kime}</p>
                  <ul className="dbe-liste">
                    {a.maddeler.map((m) => (
                      <li key={m}>
                        <Check size={14} strokeWidth={2.6} aria-hidden="true" />
                        {m}
                      </li>
                    ))}
                  </ul>
                  <p className="dbe-bolge-fiyat">
                    <b>{money(BOLGE[k].baz)}</b>&apos;den başlayan
                  </p>
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
    <section id="vip" className="sec-pad" style={{ background: "var(--paper)" }}>
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
