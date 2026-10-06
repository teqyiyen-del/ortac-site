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
  CalendarCheck,
  CarFront,
  Fingerprint,
  Crown,
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
import { BrandChip } from "@/components/shared/BrandMark";
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

/* Bölge kartının üstü · LOGO (07.10.2026, üçüncü tur). Çizimler bir tur
   yaşadı; Burak: "çizimler hoşuma gitmedi, geri kalanıyla uyumlu bir çizim
   dili değil. Bence logoları kullanabiliriz." IFZA ve Meydan'ın logosu
   müşteriden gelen dosyalar (lib/brands.ts). DWTC'nin logosu elimizde YOK
   (SWAP:BRAND_ASSET); gelene kadar adı yazıyla duruyor, logo uydurulmuyor. */
function BolgeLogo({ k }: { k: Bolge }) {
  if (k === "dwtc")
    return (
      <span className="dbe-logo-yazi">
        DWTC
        <small>Dubai World Trade Centre</small>
      </span>
    );
  return <BrandChip brand={k} withName={false} optical={k === "ifza" ? 30 : 46} renkli />;
}

export function DubaiBolgeler() {
  /* zemin beyaz (07.10.2026): bir tur kâğıttı; Burak: "bazılarını kırık
     beyaz yapıyorsun, gerek yok; çok parça parça gidiyormuş gibi." */
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
                  <div className="dbe-bolge-fig">
                    <BolgeLogo k={k} />
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

/* VIP KAPSAMI. İkon → çizim → yine ikon (07.10.2026). Çizimli hâl bir tur
   yaşadı; Burak: "araba çok kötü, karşılama da kötü … bu kadar büyük
   göstermemize de gerek yok bu maddeleri; yine ikon olabilir, daha küçük
   ve sade." Altı madde aynı (teklif PDF'i · VIP Vize Hizmeti); küçük amber
   ikon karosu ve tek satır, iki sütun. */
const VIP_KAPSAM: { Icon: LucideIcon; t: string }[] = [
  { Icon: PlaneLanding, t: "Havalimanından özel karşılama" },
  { Icon: CarFront, t: "Süreç boyunca lüks araçla ulaşım" },
  { Icon: Languages, t: "Resmî işlemlerde Türkçe konuşan danışman" },
  { Icon: Stethoscope, t: "Premium sağlık merkezinde sağlık testi" },
  { Icon: Fingerprint, t: "Emirates ID ve biyometri randevuları" },
  { Icon: CalendarCheck, t: "Randevular siz gelmeden hazır" },
];

/* VIP DÜZEN ADAYLARI · /lab/dubai-vip (07.10.2026). Burak: "böyle daha okey
   olmuş ama öncekindeki soldaki havayı da seviyordum … bunun için labda bir
   şeyler denesene, üç tane farklı yön de, içimizde kalmasın."
     tek    canlıdaki: tek gece kart, solda süre, sağda maddeler
     iki    önceki hava: solda gece kart (süre + fiyat), sağda beyaz kartta
            altı madde düz satır; kutular boş kalmıyor, iki kart aynı boy
     rakam  büyük rakam: "5" ile "10-12" tipografik kıyas, altında maddeler
     gun    gün gün: 12 noktalık iki sıra (standart, VIP), altında maddeler
   Seçilen varsayılan olur, ötekiler silinir. */
export type VipDuzen = "tek" | "iki" | "rakam" | "gun";

function VipMaddeler() {
  return (
    <ul className="dbe-kapsam">
      {VIP_KAPSAM.map(({ Icon, t }) => (
        <li key={t}>
          <span className="dbe-ic">
            <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}
function VipAlt() {
  return (
    <div className="dbe-vip-alt">
      <span className="dbe-vip-fiyat">
        <b>{money(VIP)}</b> tek seferlik
      </span>
      <SmartLink href="#fiyat" className="btn btn-primary">
        Fiyata ekleyin
        <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
      </SmartLink>
    </div>
  );
}
function VipRozet() {
  return (
    <span className="dbe-vip-rozet">
      <Crown size={15} strokeWidth={2} aria-hidden="true" />
      VIP
    </span>
  );
}
function VipCubuklar() {
  return (
    <>
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
    </>
  );
}

export function DubaiVip({ duzen = "tek" }: { duzen?: VipDuzen }) {
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

        {duzen === "iki" && (
          <FadeUp>
            <div className="dbe-v2">
              <div className="dbe-v2-sol">
                <VipRozet />
                <VipCubuklar />
                <VipAlt />
              </div>
              <div className="dbe-v2-sag">
                <span className="dbe-v2-k">VIP&apos;te neler var</span>
                <VipMaddeler />
              </div>
            </div>
          </FadeUp>
        )}
        {duzen === "rakam" && (
          <FadeUp>
            <div className="dbe-vip dbe-v3">
              <div className="dbe-v3-ust">
                <VipRozet />
                <div className="dbe-v3-kiyas">
                  <p data-tip="vip">
                    <b>5</b>
                    <span>iş günü · VIP</span>
                  </p>
                  <p data-tip="standart">
                    <b>10-12</b>
                    <span>iş günü · standart</span>
                  </p>
                </div>
              </div>
              <div className="dbe-vip-sag">
                <VipMaddeler />
              </div>
              <VipAlt />
            </div>
          </FadeUp>
        )}
        {duzen === "gun" && (
          <FadeUp>
            <div className="dbe-vip">
              <div className="dbe-v4-ust">
                <VipRozet />
                <span className="dbe-sure-k">Dubai&apos;de geçireceğiniz iş günleri</span>
                {(["standart", "vip"] as const).map((tip) => (
                  <div key={tip} className="dbe-v4-sira" data-tip={tip}>
                    <span className="dbe-cubuk-ad">{tip === "vip" ? "VIP" : "Standart"}</span>
                    <span className="dbe-v4-gunler" aria-hidden="true">
                      {Array.from({ length: 12 }, (_, g) => (
                        <i key={g} data-dolu={g < (tip === "vip" ? 5 : 12) || undefined} />
                      ))}
                    </span>
                    <b>{tip === "vip" ? "yaklaşık 5" : "yaklaşık 10-12"}</b>
                  </div>
                ))}
              </div>
              <div className="dbe-vip-sag">
                <VipMaddeler />
              </div>
              <VipAlt />
            </div>
          </FadeUp>
        )}
        {duzen === "tek" && (
          <>
        {/* 07.10.2026 · TEK KART. İki sütunlu hâlde sağdaki altı kutu sol
            kartın boyuna gerilip boş kalıyordu (Burak: "box'un içi çok boş
            duruyor, dikey olarak çok boşluk var … VIP kısmına biraz kafa
            yor"). Süre kıyası, altı madde ve fiyat artık aynı gece kartın
            içinde: solda süre ve fiyat, sağda maddeler kutusuz, amber
            ikonlu satırlar hâlinde. */}
        <FadeUp>
          <div className="dbe-vip">
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
            </div>

            <div className="dbe-vip-sag">
              <span className="dbe-sure-k">VIP&apos;te neler var</span>
              <ul className="dbe-kapsam">
                {VIP_KAPSAM.map(({ Icon, t }) => (
                  <li key={t}>
                    <span className="dbe-ic">
                      <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
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
          </>
        )}
      </div>
    </section>
  );
}
