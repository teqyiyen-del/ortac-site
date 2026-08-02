"use client";

import SmartLink from "@/components/shared/SmartLink";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Building2,
  Calculator,
  ChevronRight,
  CreditCard,
  FileBadge,
  IdCard,
  Info,
  Landmark,
  MapPin,
  Receipt,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { DubaiHeroCard } from "@/components/shared/HeroDubaiCards";
import { useLenis } from "@/components/Providers";
import { FACTS, type CountrySlug } from "@/lib/brand";
import { gtm } from "@/lib/gtm";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   The scene — one 560x440 vector per country, drawn not shot.
   Same story everywhere: the licence card up top, the three
   things that hang off it below, the city it happens in behind.

   Dubai artık bunu kullanmıyor: o sayfada denenen yeni kart
   HeroDubaiCards.tsx'te. Sahne İngiltere ve KKTC'de aynen duruyor,
   çünkü yeni kart yalnızca Dubai'de deneniyor — oturursa diğer iki
   ülkeye de geçecek, o zamana kadar burası tek satır değişmiyor.
   ========================================================== */

/* card 104,44 → 456,188 · chips y 232..312 · horizon 352 · ground 440 */
const WIRES = [
  "M280 188 V202 Q280 210 272 210 H120 Q112 210 112 218 V228",
  "M280 188 V228",
  "M280 188 V202 Q280 210 288 210 H440 Q448 210 448 218 V228",
];
const CHIP_X = [36, 204, 372];

/* the middle wire is 40px where the outer two are ~200px, so a shared dur
   would crawl the middle packet. keyPoints parks it at the source instead and
   sends it across at the same speed as the others. */
const PACKET_HOLD = { keyPoints: "0;0;1", keyTimes: "0;0.8;1", calcMode: "linear" as const };

/** splits a comma list into two balanced lines so it never runs past the card */
function twoLines(list: string): [string, string] {
  const parts = list.split(", ");
  if (parts.length < 2) return [list, ""];
  const half = Math.ceil(parts.length / 2);
  return [parts.slice(0, half).join(", "), parts.slice(half).join(", ")];
}

function Lite({ x, y, w, h, d }: { x: number; y: number; w: number; h: number; d: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="1"
      className="phs-lite"
      style={{ animationDelay: `${d}s` }}
    />
  );
}

/* ---- Dubai: the Khalifa cluster, the sail, the low harbour blocks ---- */
const DUBAI_SKY = (
  <>
    <g className="phs-sky-a">
      <rect x="10" y="388" width="30" height="52" rx="2" />
      <rect x="46" y="366" width="22" height="74" rx="2" />
      <path d="M74 440 V360 L92 348 L92 440 Z" />
      <rect x="110" y="382" width="26" height="58" rx="2" />
      <rect x="342" y="368" width="24" height="72" rx="2" />
      <path d="M374 440 V362 L390 352 L390 440 Z" />
      <rect x="466" y="386" width="28" height="54" rx="2" />
      <rect x="502" y="398" width="24" height="42" rx="2" />
    </g>
    <g className="phs-sky-b">
      <rect x="142" y="386" width="34" height="54" rx="2" />
      <path d="M182 440 V376 L196 364 L210 376 V440 Z" />
      <rect x="216" y="394" width="18" height="46" rx="2" />
      <rect x="330" y="386" width="30" height="54" rx="2" />
      <path d="M404 440 V386 L420 374 L436 386 V440 Z" />
      <path d="M486 440 V370 C486 370 498 388 510 408 L510 440 Z" />
      <path d="M486 370 L486 354 L505 386 Z" />
    </g>
    <g className="phs-sky-c">
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
  </>
);

/* ---- İngiltere: the tower, the shard, the wheel ---- */
const UK_SKY = (
  <>
    <g className="phs-sky-a">
      <rect x="14" y="394" width="28" height="46" rx="2" />
      <rect x="48" y="378" width="20" height="62" rx="2" />
      <rect x="92" y="390" width="30" height="50" rx="2" />
      <rect x="404" y="386" width="26" height="54" rx="2" />
      <rect x="438" y="398" width="22" height="42" rx="2" />
      <rect x="504" y="388" width="30" height="52" rx="2" />
    </g>
    <g className="phs-sky-b">
      <path d="M150 440 V378 C150 356 160 342 168 342 C176 342 186 356 186 378 V440 Z" />
      <rect x="196" y="396" width="26" height="44" rx="2" />
      <rect x="264" y="400" width="20" height="40" rx="2" />
      <rect x="348" y="392" width="28" height="48" rx="2" />
    </g>
    <g className="phs-sky-c">
      <rect x="210" y="404" width="22" height="36" rx="2" />
      <rect x="236" y="366" width="26" height="74" rx="2" />
      <path d="M236 366 L249 340 L262 366 Z" />
      <rect x="247.5" y="330" width="3" height="10" rx="1.5" />
      <path d="M290 440 L298 348 L302 338 L306 348 L314 440 Z" />
      <rect x="322" y="402" width="22" height="38" rx="2" />
      <circle cx="466" cy="390" r="30" className="phs-eye" />
      <rect x="464.5" y="390" width="3" height="50" rx="1.5" />
      <circle cx="249" cy="386" r="6" className="phs-lite" />
      <Lite x={297} y={396} w={3} h={6} d={1.2} />
      <Lite x={330} y={414} w={3} h={5} d={2} />
    </g>
  </>
);

/* ---- KKTC: the ridge, the low town, the harbour castle ---- */
const KKTC_SKY = (
  <>
    <g className="phs-sky-a">
      <path d="M0 440 V406 L44 378 L84 400 L126 374 L168 402 L212 382 L258 404 L312 380 L366 404 L418 386 L470 408 L520 390 L560 404 V440 Z" />
    </g>
    <g className="phs-sky-b">
      <path d="M56 440 V412 H96 V440 Z" />
      <path d="M50 412 L76 396 L102 412 Z" />
      <path d="M110 440 V418 H144 V440 Z" />
      <path d="M105 418 L127 404 L149 418 Z" />
      <rect x="158" y="414" width="30" height="26" rx="2" />
      <path d="M398 440 V410 H436 V440 Z" />
      <path d="M392 410 L417 394 L442 410 Z" />
      <rect x="456" y="416" width="28" height="24" rx="2" />
    </g>
    <g className="phs-sky-c">
      <rect x="236" y="384" width="96" height="56" rx="2" />
      <rect x="226" y="366" width="26" height="74" rx="2" />
      <rect x="316" y="360" width="26" height="80" rx="2" />
      {[256, 272, 288, 304].map((x) => (
        <rect key={x} x={x} y="376" width="9" height="8" rx="1.5" />
      ))}
      <path d="M352 440 V430 H404 L396 440 Z" />
      <rect x="376" y="404" width="2.5" height="26" rx="1" />
      <path d="M381 406 L381 428 L400 428 Z" />
      <Lite x={234} y={396} w={3} h={5} d={0.4} />
      <Lite x={324} y={392} w={3} h={5} d={1.5} />
      <Lite x={268} y={406} w={3} h={5} d={2.2} />
    </g>
  </>
);

type SceneSpec = {
  card: { title: string; sub: string; icon: LucideIcon };
  chips: { label: string; icon: LucideIcon }[];
  sky: React.ReactNode;
};

const SCENES: Record<CountrySlug, SceneSpec> = {
  dubai: {
    card: { title: "Serbest bölge lisansı", sub: "Ticari veya teknoloji faaliyeti", icon: FileBadge },
    chips: [
      { label: "Vize dosyası", icon: IdCard },
      { label: "Banka başvurusu", icon: Landmark },
      { label: "Muhasebe", icon: Calculator },
    ],
    sky: DUBAI_SKY,
  },
  ingiltere: {
    card: { title: "Companies House tescili", sub: "Limited şirket kaydı", icon: ScrollText },
    chips: [
      { label: "Kayıtlı adres", icon: Building2 },
      { label: "HMRC kaydı", icon: Receipt },
      { label: "Ödeme kanalı", icon: CreditCard },
    ],
    sky: UK_SKY,
  },
  kktc: {
    card: { title: "Yerel şirket tescili", sub: "Limited · yerel sicil", icon: FileBadge },
    chips: [
      { label: "Ortaklık yapısı", icon: ScrollText },
      { label: "Banka başvurusu", icon: Landmark },
      { label: "Muhasebe", icon: Calculator },
    ],
    sky: KKTC_SKY,
  },
};

function CountryScene({ country, reduced }: { country: CountrySlug; reduced: boolean }) {
  const scene = SCENES[country];
  const who = twoLines(FACTS[country].forWhom);
  const CardIcon = scene.card.icon;
  /* reduced motion collapses the timing, never the markup: the server and the
     first client render must emit the same attributes */
  const t = (v: number) => (reduced ? 0 : v);

  return (
    <svg viewBox="0 0 560 440" className="phs" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="phsClip">
          <rect x="1" y="1" width="558" height="438" rx="28" />
        </clipPath>
        <radialGradient id="phsGlow" cx="50%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#16304e" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </radialGradient>
        <pattern id="phsDots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.2" fill="#1d1d1d" />
        </pattern>
        <marker id="phsHead" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" className="phs-head" />
        </marker>
      </defs>

      <g clipPath="url(#phsClip)">
        <rect width="560" height="440" fill="url(#phsGlow)" />
        <rect width="560" height="440" fill="url(#phsDots)" />

        {/* the city, three depths, always behind the paperwork */}
        {scene.sky}
        <rect x="0" y="352" width="560" height="1" className="phs-hz" />

        {/* what hangs off the licence */}
        {WIRES.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            className="phs-wire"
            markerEnd="url(#phsHead)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: t(0.75), delay: t(0.45 + i * 0.12), ease: EASE }}
          />
        ))}

        {/* the packet ride is SMIL, so .phs-pk is what the reduced-motion
            media query switches off — markup stays identical either way */}
        {WIRES.map((d, i) => (
          <circle key={d} r="3.4" className="phs-pk">
            <animateMotion
              dur="3.4s"
              begin={`${1.2 + i * 0.4}s`}
              repeatCount="indefinite"
              path={d}
              {...(i === 1 ? PACKET_HOLD : {})}
            />
          </circle>
        ))}

        {/* the licence card */}
        <motion.g
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: t(0.7), delay: t(0.15), ease: EASE }}
        >
          <rect x="104" y="44" width="352" height="144" rx="20" className="phs-card" />
          <rect x="128" y="64" width="40" height="40" rx="12" className="phs-badge" />
          <CardIcon
            x={138}
            y={74}
            width={20}
            height={20}
            strokeWidth={1.9}
            className="phs-ic"
            aria-hidden="true"
          />
          <text x="182" y="84" className="phs-t">
            {scene.card.title}
          </text>
          <text x="182" y="104" className="phs-s">
            {scene.card.sub}
          </text>
          <line x1="128" y1="120" x2="432" y2="120" className="phs-rule" />
          {/* deliberately not the price or the duration: the country page prints
              both from pricing.ts one section below, and the two libraries do
              not agree for İngiltere and KKTC. forWhom is unique to this card. */}
          <text x="128" y="139" className="phs-k">
            Kimler için
          </text>
          <text x="128" y="158" className="phs-c">
            {who[0]}
          </text>
          {who[1] && (
            <text x="128" y="175" className="phs-c">
              {who[1]}
            </text>
          )}
        </motion.g>

        {/* the three things that follow it */}
        {scene.chips.map((chip, i) => {
          const x = CHIP_X[i];
          const ChipIcon = chip.icon;
          return (
            <motion.g
              key={chip.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: t(0.6), delay: t(0.75 + i * 0.1), ease: EASE }}
            >
              <rect x={x} y="232" width="152" height="80" rx="18" className="phs-chip" />
              <rect x={x + 18} y="248" width="32" height="32" rx="10" className="phs-badge" />
              <ChipIcon
                x={x + 26}
                y={256}
                width={16}
                height={16}
                strokeWidth={2}
                className="phs-ic"
                aria-hidden="true"
              />
              <text x={x + 18} y="298" className="phs-c">
                {chip.label}
              </text>
            </motion.g>
          );
        })}
      </g>

      <rect x="1" y="1" width="558" height="438" rx="28" className="phs-frame" />
    </svg>
  );
}

/* ============================================================
   PageHero — compact by default, a two column hero when the
   page tells it which country it is about.
   ========================================================== */

export default function PageHero({
  crumb,
  title,
  accent,
  lead,
  country,
  backdrop = "grid",
}: {
  crumb: string;
  title: string;
  accent?: string;
  lead: string;
  /** verildiğinde başlık iki sütunlu hero'ya döner ve ülkeye ait sahne çizilir */
  country?: CountrySlug;
  /**
   * Hero'nun siyah zemini.
   *
   * VARSAYILAN ARTIK "grid". Efekt /dubai'de denendi ve onaylandı ("her
   * sayfanın hero girişinde olsun"), yani PageHero basan her sayfa ızgara +
   * glow zeminiyle açılıyor. Hiçbir çağrının propu geçmesine gerek yok.
   *
   * "plain" kaçış kapısı olarak duruyor: bir sayfada zemin içerikle
   * çakışırsa tek kelimeyle kapatılabilsin. Bugün hiçbir çağrı geçmiyor.
   *
   * Stiller: src/app/css/pagehero-grid.css (.phg-). Kalibrasyon TEK BİR
   * SAYFAYA değil SAYFA TİPİNE bağlı: kompakt hero (country yok) ile split
   * hero (.ph-split) farklı boyda ve split olanın sağında kart/sahne var.
   * İki tipin değerleri o dosyada ayrı bloklarda, gerekçeleriyle duruyor —
   * buradaki iki dönüş yolundan hangisinin .ph-split bastığı oradaki
   * ayrımın tek girdisi.
   */
  backdrop?: "plain" | "grid";
}) {
  const reduced = useReducedMotion() ?? false;
  const lenis = useLenis();

  /* Katman saf CSS: her karede JS yok, sunucuda da aynı biçimde basılıyor
     (rastgelelik yok, hidrasyon farkı yok). Sıra önemli — ızgara altta,
     glow onun üstünde; ikisi de içerikten önce, .phg z-index'iyle arkada. */
  const gridBackdrop = backdrop === "grid";
  const backdropLayer = gridBackdrop ? (
    <div className="phg-bg" aria-hidden="true">
      <div className="phg-grid" />
      <div className="phg-glow" />
    </div>
  ) : null;

  const [head, tail] = accent && title.endsWith(accent)
    ? [title.slice(0, -accent.length), accent]
    : [title, ""];

  const crumbNav = (
    <nav className="ph-crumb" aria-label="Konum">
      <SmartLink href="/">Ana sayfa</SmartLink>
      <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
      <span>{crumb}</span>
    </nav>
  );

  /* default: the compact header every other inner page already uses */
  if (!country) {
    return (
      <section className={gridBackdrop ? "ph phg" : "ph"}>
        {backdropLayer}
        <div className="container-o">
          {crumbNav}
          <h1 className="ph-title">
            {head}
            {tail && <span>{tail}</span>}
          </h1>
          <p className="ph-lead">{lead}</p>
        </div>
      </section>
    );
  }

  /* "Fiyatları Gör" sayfa içi çapa, dış adres değil — SmartLink'e gerek yok.
     Lenis scroll'u devraldığı için (globals.css: html{scroll-behavior:auto})
     tarayıcının kendi atlaması Lenis'in konumuyla çakışıyor. FinalCta'daki
     kalıbın aynısı: hedef gerçekten varsa preventDefault + lenis.scrollTo,
     yoksa hiç karışma, bağlantı normal <a> gibi çalışsın. */
  const onPriceClick = (e: React.MouseEvent) => {
    gtm("cta_pricing_click", { placement: "page_hero", country });
    const target = document.getElementById("fiyat");
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: 1.1 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  /* Güven satırları üçten ikiye indi — sol sütun kalabalık geliyordu.
     Çıkan satır: "Kuruluş, banka, tahsilat ve muhasebe aynı ekipten
     yürütülür." Kaybolmadı, sağdaki kart zaten bunu gösteriyor; aynı iddiayı
     hem yazıp hem çizmek hero'da iki kez okunuyordu.

     Kalan ikisi kartın söyleyemedikleri:
     - MapPin satırı tek gerçek ayrım (kendi ofis, Türkçe yürütme),
     - Info satırı FACTS[country].limit, yani ülkenin dürüst kısıtı. Brief
       her ülkede bir tane istiyor ve Dubai'de zorunlu "vize ve biyometri
       için BAE'ye gelmek gerekiyor" uyarısını taşıyor — kaldırılmaz. */
  const trust: { icon: LucideIcon; line: string }[] = [
    { icon: MapPin, line: "Dubai'deki kendi ofisimizden, Türkçe yürütülür." },
    { icon: Info, line: FACTS[country].limit },
  ];

  /* Yeni kart YALNIZCA Dubai'de. Müşteri onu bu sayfada değerlendiriyor;
     oturursa İngiltere ve KKTC'ye de geçecek. O ana kadar diğer iki ülke
     eski sahneyi kullanmaya devam ediyor, yani bu deneme onların hero'sunda
     hiçbir şeyi değiştirmiyor. */
  const dubai = country === "dubai";

  return (
    <section className={gridBackdrop ? "ph ph-split phg" : "ph ph-split"}>
      {backdropLayer}
      <div className="container-o">
        {crumbNav}

        {/* .phx- kendi ad alanı: globals.css'teki .ph-grid / .ph-sub / .ph-trust
            blokları iki kez yazılmış (ikincisi kazanıyor) ve eski sahnenin
            ölçülerine göre ayarlanmış. Yeni düzen onların üstüne binmesin diye
            hiçbirine bağlanmıyor; yalnızca .ph / .ph-split (zemin + dikey
            boşluk), .ph-crumb, .ph-h1 ve — eski sahne hâlâ kullanıldığı için —
            .ph-art ortak kalıyor. */}
        <div className="phx-grid">
          <div className="phx-copy">
            <SplitWords
              as="h1"
              text={title}
              accent={accent}
              accentColor="var(--blue-500)"
              base={0.1}
              className="ph-h1"
            />

            {/* punto 17 → 15.5: müşteri geri bildirimi, başlığın altındaki
                açıklama başlıkla yarışıyordu. Ölçü satırı da 46ch'ten
                42ch'e indi, üç satırı geçmesin. */}
            <FadeUp delay={0.26}>
              <p className="phx-lead">{lead}</p>
            </FadeUp>

            <FadeUp delay={0.34}>
              <div className="phx-cta">
                <SmartLink
                  href="/basla"
                  className="btn btn-primary"
                  onClick={() => gtm("cta_start_click", { placement: "page_hero", country })}
                >
                  Hemen Başla
                  <ArrowRight size={15} strokeWidth={2.1} />
                </SmartLink>
                {/* eski ikincil buton "Ücretsiz danışmanlık" idi ve /iletisim'e
                    gidiyordu; o adres yayında değil, yani SmartLink butonu
                    sönükleştirip tıklanamaz hale getiriyordu. Hero'nun ikinci
                    çıkışı ölü duruyordu. Şimdi aynı sayfadaki fiyat
                    yapılandırıcısına iniyor. */}
                <a href="#fiyat" className="btn btn-ghost" onClick={onPriceClick}>
                  Fiyatları Gör
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.42}>
              <ul className="phx-trust">
                {trust.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.line}>
                      <Icon size={15} strokeWidth={2} aria-hidden="true" />
                      <span>{item.line}</span>
                    </li>
                  );
                })}
              </ul>
            </FadeUp>
          </div>

          {/* İkisi de telefonda gizli — sarmalayıcıları farklı ama kural aynı
              (.ph-art globals'ta, .phx-col hero.css'te). Hero mobilde
              metinle taşınıyor. */}
          {dubai ? (
            <DubaiHeroCard />
          ) : (
            <div className="ph-art">
              <CountryScene country={country} reduced={reduced} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
