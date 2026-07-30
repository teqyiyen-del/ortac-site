"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  BadgeCheck,
  FileBadge,
  IdCard,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { CHAIN, COUNTRY_SERVICES } from "@/lib/brand";

/* ============================================================================
   DUBAI HERO KARTI — üç aday, hepsi geçici.

   GEÇİCİ DOSYA. Müşteri /hero-lab sayfasında üçünü yan yana görüp birini
   seçecek. Seçim yapıldığında:
     1. dosyanın sonundaki DubaiHeroCard kazananı gösterecek şekilde
        değiştirilir (tek satır),
     2. kaybeden iki bileşen silinir,
     3. src/app/hero-lab/ dizini silinir,
     4. hero.css'teki .phda- / .phdb- / .phdc- ve .phlab- bloklarından
        yalnızca kazananınki kalır.
   Bu adımlar hero-lab/page.tsx'in başında da yazılı; iki yerde durması
   kasıtlı, çünkü hangisi önce açılırsa açılsın not görünsün.

   ORTAK KISITLAR (üçü de uyar)
   - Kart KOYU. Zemin --night-2 / --night-3 ailesi, opak hex. Neredeyse siyah
     yüzeyde alfa üç farklı tonu aynı griye çeviriyor.
   - Beyaz yalnızca aksan: kartın bir-iki parçası, kontrast için. Kartın
     kendisi asla beyaz değil.
   - Metin az: toplam 6-8 kısa satır. Açıklama cümlesi yok, etiket var.
   - Somut. Ziyaretçi üç saniyede bir bilgi edinmeli; süs diyagram değil.
   - STANCE_LIMITS: kesin gün sayısı yok, fiyat yok, banka onayı vaadi yok.
     Üç kartta da bankanın geçtiği yerde kararın bankada olduğu yazılı.

   Döngülerin tamamı CSS'te (hero.css). motion yalnızca girişi yapıyor;
   prefers-reduced-motion sonsuz döngüyü CSS tarafında kapatıyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Dubai silueti — eski CountryScene'in şehir katmanları. Kart koyu olduğu için
   siluet artık kartın arkasında değil, kartla aynı ailede: panel zemini,
   kartın altından yalnızca çatı hattı görünüyor. */
function Lite({ x, y, w, h, d }: { x: number; y: number; w: number; h: number; d: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="1"
      className="phx-lite"
      style={{ animationDelay: `${d}s` }}
    />
  );
}

/* preserveAspectRatio="xMidYMax slice": siluet viewBox'ın alt şeridinde
   (y 330..440) duruyor, kırpma üstten olmalı ki çatı hattı hep görünsün. */
function DubaiBackdrop() {
  return (
    <svg
      className="phx-bg"
      viewBox="0 0 560 440"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="phxGlow" cx="52%" cy="26%" r="74%">
          <stop offset="0%" stopColor="#14293f" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <pattern id="phxDots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.2" fill="#1b1b1b" />
        </pattern>
      </defs>
      <rect width="560" height="440" fill="url(#phxGlow)" />
      <rect width="560" height="440" fill="url(#phxDots)" />

      <g className="phx-sky-a">
        <rect x="10" y="388" width="30" height="52" rx="2" />
        <rect x="46" y="366" width="22" height="74" rx="2" />
        <path d="M74 440 V360 L92 348 L92 440 Z" />
        <rect x="110" y="382" width="26" height="58" rx="2" />
        <rect x="342" y="368" width="24" height="72" rx="2" />
        <path d="M374 440 V362 L390 352 L390 440 Z" />
        <rect x="466" y="386" width="28" height="54" rx="2" />
        <rect x="502" y="398" width="24" height="42" rx="2" />
      </g>
      <g className="phx-sky-b">
        <rect x="142" y="386" width="34" height="54" rx="2" />
        <path d="M182 440 V376 L196 364 L210 376 V440 Z" />
        <rect x="216" y="394" width="18" height="46" rx="2" />
        <rect x="330" y="386" width="30" height="54" rx="2" />
        <path d="M404 440 V386 L420 374 L436 386 V440 Z" />
        <path d="M486 440 V370 C486 370 498 388 510 408 L510 440 Z" />
        <path d="M486 370 L486 354 L505 386 Z" />
      </g>
      <g className="phx-sky-c">
        <path d="M200 440 V394 L214 386 L214 440 Z" />
        <rect x="232" y="402" width="26" height="38" rx="2" />
        <path d="M264 440 V384 L280 384 L280 440 Z" />
        <path d="M280 440 V354 L292 354 L292 440 Z" />
        <path d="M292 440 V372 L306 372 L306 440 Z" />
        <path d="M306 440 V396 L320 396 L320 440 Z" />
        <path d="M280 354 L286 336 L292 354 Z" />
        <rect x="284.5" y="330" width="3" height="8" rx="1.5" />
        <rect x="326" y="398" width="22" height="42" rx="2" />
        <Lite x={270} y={404} w={3} h={6} d={0} />
        <Lite x={284} y={378} w={3} h={6} d={0.7} />
        <Lite x={297} y={398} w={3} h={6} d={1.4} />
        <Lite x={240} y={416} w={3} h={5} d={2.1} />
        <Lite x={334} y={412} w={3} h={5} d={1} />
        <Lite x={496} y={418} w={3} h={5} d={1.8} />
      </g>
      <rect x="0" y="352" width="560" height="1" className="phx-hz" />
    </svg>
  );
}

/** panel + siluet + kart — üç varyant da bunun içine giriyor.
 *  reduced'ı prop olarak almıyor, kendisi okuyor: varyantlar böylece
 *  props'suz bileşen oluyor ve /hero-lab (sunucu bileşeni) onları doğrudan
 *  render edebiliyor. Sonsuz döngüler zaten CSS'te, burada kısalan yalnızca
 *  giriş; işaretleme iki durumda da aynı çıkıyor. */
function HeroPanel({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion() ?? false;
  const t = (v: number) => (reduced ? 0 : v);
  return (
    <div className="phx-col">
      <DubaiBackdrop />
      <motion.div
        className="phd-wrap"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: t(0.7), delay: t(0.2), ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ============================================================================
   VARYANT A — "Elinizde ne kalıyor"
   Süreci değil sonucu anlatıyor: kurulum üç somut çıktı üretiyor. Üç koyu
   kutu sırayla beyaza dönüyor, yani beyaz o anda öne çıkan tek çıktı.
   Her çıktının altındaki mikro satır o çıktının şartını söylüyor — sıraladığımız
   üç şeyin üçü de aynı garantide değil ve bunu kartın kendisi yazıyor.
   ========================================================================= */

const A_ITEMS: { icon: LucideIcon; label: string; meta: string }[] = [
  { icon: FileBadge, label: "Ticaret lisansı", meta: "IFZA serbest bölge" },
  /* biyometri şartı FACTS.dubai.limit ile aynı cümle — hero'nun sol
     sütununda da yazıyor, burada da: iki yerde de aynı kısıt */
  { icon: IdCard, label: "Emirates ID", meta: "Biyometri BAE'de" },
  /* "Onay bankanın": STANCE_LIMITS'in birinci maddesi. Kutu çıktıyı
     gösteriyor ama garantiyi vermiyor. */
  { icon: Landmark, label: "Kurumsal hesap", meta: "Onay bankanın" },
];

export function HeroCardA() {
  return (
    <HeroPanel>
      <div className="phd phda">
        <span className="phd-k">Kurulumun üç çıktısı</span>
        <div className="phda-row">
          {A_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="phda-t" style={{ "--i": i } as React.CSSProperties}>
                <span className="phda-ico">
                  <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <b>{item.label}</b>
                <i>{item.meta}</i>
              </div>
            );
          })}
        </div>
      </div>
    </HeroPanel>
  );
}

/* ============================================================================
   VARYANT B — "Lisans bir halka"
   Eski sahnenin beğenilen iskeleti (üstte lisans düğümü, altta üç beyaz kutu),
   ama artık bir şey söylüyor: her kutuda o halkanın somut karşılığı yazılı.
   Teller sırayla maviye boyanıyor, kutu da o anda kalkıyor — hangi halkanın
   sırası geldiği tek bakışta okunuyor.
   ========================================================================= */

/* üç dal, viewBox 0 0 300 40 · orta düğüm x=150, kutular x=50/150/250.
   pathLength="1" sayesinde stroke-dashoffset üç telde de aynı ölçekte
   çalışıyor — teller farklı uzunlukta olduğu halde aynı hızda doluyorlar. */
const B_WIRES = [
  "M150 0 V12 Q150 19 143 19 H57 Q50 19 50 26 V40",
  "M150 0 V40",
  "M150 0 V12 Q150 19 157 19 H243 Q250 19 250 26 V40",
];

/* Etiketler CHAIN'den (lib/brand.ts). Alt satırdaki karşılıklar burada yazılı,
   çünkü COUNTRY_SERVICES.meta bu üçünde fiyat birimi tutuyor ("aylık",
   "kişi başı") — o da işin ne olduğu hakkında hiçbir şey söylemiyor.
   Bankanınki tek istisna, orada meta gerçekten kurum adı. */
const B_FACT: Record<string, string> = {
  banka: COUNTRY_SERVICES.dubai.find((s) => s.key === "banka-hesabi")?.meta ?? "Wio · Mashreq",
  muhasebe: "Kurumlar + KDV",
  oturum: "Emirates ID",
};
const B_KEYS = ["banka", "muhasebe", "oturum"] as const;

export function HeroCardB() {
  const byKey = Object.fromEntries(CHAIN.map((c) => [c.key, c]));

  return (
    <HeroPanel>
      <div className="phd phdb">
        {/* IFZA rozetinin metni PARTNERS'ta (lib/brand.ts) "resmî iş ortağı"
            olarak tanımlı; burada yalnızca kısaltması duruyor */}
        <div className="phdb-node">
          <span className="phdb-node-ic">
            <FileBadge size={18} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <b>Serbest bölge ticaret lisansı</b>
          <span className="phdb-chip">
            <BadgeCheck size={12} strokeWidth={2.2} aria-hidden="true" />
            IFZA
          </span>
        </div>

        <svg
          className="phdb-wires"
          viewBox="0 0 300 40"
          aria-hidden="true"
          focusable="false"
        >
          {B_WIRES.map((d) => (
            <path key={d} d={d} pathLength="1" className="phdb-w" />
          ))}
          {B_WIRES.map((d, i) => (
            <path
              key={`f${d}`}
              d={d}
              pathLength="1"
              className="phdb-wf"
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </svg>

        <div className="phdb-row">
          {B_KEYS.map((key, i) => (
            <div key={key} className="phdb-b" style={{ "--i": i } as React.CSSProperties}>
              <b>{byKey[key]?.label}</b>
              <i>{B_FACT[key]}</i>
            </div>
          ))}
        </div>
      </div>
    </HeroPanel>
  );
}

/* ============================================================================
   VARYANT C — "Sıra"
   Yatay bir ray ve üstünde ilerleyen tek beyaz işaretçi. Anlattığı şey işlem
   sırası: Dubai'de isim onayı lisanstan, lisans tescilden, tescil de banka
   başvurusundan önce gelir — ziyaretçinin en sık yanlış bildiği şey bu.
   Ray ikiye bölünmüş: soldaki üç adım kuruluşun kendisi, sağdaki ikisi
   kuruluş bittikten sonra başlayan ayrı iş. Gün sayısı yok, yalnızca sıra.
   ========================================================================= */

const C_PHASES = ["İsim onayı", "Lisans", "Tescil", "Banka başvurusu", "Emirates ID"];
/* ayrım üçüncü ile dördüncü adımın arasında: %50 ile %75'in ortası */
const C_SPLIT = 62.5;

export function HeroCardC() {
  return (
    <HeroPanel>
      <div className="phd phdc">
        <div className="phdc-axis" aria-hidden="true">
          <span>Kuruluş</span>
          <span>Kuruluştan sonra</span>
        </div>

        <div className="phdc-rail">
          <span className="phdc-line" aria-hidden="true" />
          <span
            className="phdc-split"
            style={{ left: `${C_SPLIT}%` }}
            aria-hidden="true"
          />
          <span className="phdc-mark" aria-hidden="true" />
          {C_PHASES.map((label, i) => (
            <span
              key={label}
              className="phdc-tick"
              style={
                {
                  "--i": i,
                  left: `${(i / (C_PHASES.length - 1)) * 100}%`,
                } as React.CSSProperties
              }
            >
              <b aria-hidden="true" />
              <em>{label}</em>
            </span>
          ))}
        </div>
      </div>
    </HeroPanel>
  );
}

/* PageHero'nun Dubai hero'sunda gösterdiği varyant.
   SEÇİM BURADA: müşteri karar verince bu satır kazananı gösterecek şekilde
   değiştirilir, sonra kalan iki bileşen silinir. Şimdilik B — müşterinin
   "önceki kötü değildi" dediği düzenin doğrudan devamı olduğu için en düşük
   riskli varsayılan o. */
export const DubaiHeroCard = HeroCardB;
