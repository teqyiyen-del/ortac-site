"use client";

import { useId, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import AskCta from "@/components/shared/AskCta";
import FlowScene from "@/components/shared/FlowScene";
import StepSwitcher, { type Step as SwitchStep } from "@/components/shared/StepSwitcher";
import { Flag as SiteFlag } from "@/components/shared/CountryPicker";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ============================================================================
   Bu bölüm ülke sayfasının içinde satır arası duruyordu; buraya çıkma sebebi
   tek başına bir mekanik kazanması: artık "parayı nereye getiriyorsunuz"
   sorusunun cevabı da seçiliyor. Sayfanın ülkesi (prop `country`/`name`)
   şirketin KURULDUĞU yer; aşağıdaki seçici paranın GİTTİĞİ yeri belirliyor.
   İkisi ayrı eksen, o yüzden ayrı veri kümeleri.
   ========================================================================= */

/* Bayraklar burada elle çiziliyor. Paylaşılan `Flag` (shared/CountryPicker)
   yalnızca kuruluş yaptığımız üç ülkeyi tanıyor ve o liste bu listeden bağımsız
   büyüyecek — birini ötekine bağlamak ilk yeni ülkede kırılırdı. Hepsi aynı
   60×40 kutuda, tek bir ağ isteği olmadan; 20px'lik diskte de büyütünce de
   aynı netlikte kalsınlar diye vektör. */
const FLAG_BOX = {
  viewBox: "0 0 60 40",
  preserveAspectRatio: "xMidYMid slice",
  "aria-hidden": true,
} as const;

function FlagTr() {
  return (
    <svg {...FLAG_BOX}>
      <rect width="60" height="40" fill="#e30a17" />
      <circle cx="25" cy="20" r="8.4" fill="#ffffff" />
      <circle cx="28.6" cy="20" r="6.7" fill="#e30a17" />
      <path
        d="M38.6 15.4 L39.9 19.1 L43.8 19.1 L40.7 21.4 L41.8 25.1 L38.6 22.8 L35.4 25.1 L36.5 21.4 L33.4 19.1 L37.3 19.1 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

function FlagDe() {
  return (
    <svg {...FLAG_BOX}>
      <rect width="60" height="13.34" fill="#000000" />
      <rect y="13.33" width="60" height="13.34" fill="#dd0000" />
      <rect y="26.66" width="60" height="13.34" fill="#ffce00" />
    </svg>
  );
}

function FlagNl() {
  return (
    <svg {...FLAG_BOX}>
      <rect width="60" height="13.34" fill="#ae1c28" />
      <rect y="13.33" width="60" height="13.34" fill="#ffffff" />
      <rect y="26.66" width="60" height="13.34" fill="#21468b" />
    </svg>
  );
}

/* 13 şerit = 40/13, kanton ilk 7 şeridi kaplıyor. Yıldızlar 22px'lik diskte
   zaten tek tek okunmuyor; beş köşeli yıldız çizmek yerine 5×4 nokta ızgarası
   koyuldu — küçükte aynı dokuyu, büyükte daha temiz bir kenarı veriyor. */
const US_STRIPE = 40 / 13;
const US_STARS = [0, 1, 2, 3].flatMap((row) =>
  [0, 1, 2, 3, 4].map((col) => ({ x: 3 + col * 4.5, y: 2.7 + row * 5.4 })),
);

function FlagUs() {
  return (
    <svg {...FLAG_BOX}>
      <rect width="60" height="40" fill="#ffffff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={i * US_STRIPE} width="60" height={US_STRIPE} fill="#b31942" />
      ))}
      <rect width="24" height={7 * US_STRIPE} fill="#0a3161" />
      {US_STARS.map((s) => (
        <circle key={`${s.x}-${s.y}`} cx={s.x} cy={s.y} r="1.05" fill="#ffffff" />
      ))}
    </svg>
  );
}

/* Akçaağaç yaprağı bayrağın kendi geometrisinden: yaprak 0–78.5 yüksekliğinde
   ve x=50 ekseninde simetrik çiziliyor, sonra beyaz kareye (x 15–45) tek bir
   transform ile oturtuluyor. Ölçek değişecekse dokunulacak tek yer o transform. */
const CA_LEAF =
  "M 49.9 0 L 44.3 10.4 C 43.7 11.5 42.6 11.4 41.4 10.8 L 37.4 8.7 L 40.4 24.6 " +
  "C 41 27.5 39 24.6 38 23.4 L 30.9 15.4 C 30.1 14.5 29.5 14.9 29.3 16.1 L 27.9 22.1 " +
  "L 22 20.9 C 20.7 20.6 20.1 21 20.6 22.3 L 22.9 29.4 L 17.1 32.5 C 16.4 32.9 16.3 33.6 17.2 34.4 " +
  "L 30.5 45.7 C 31.6 46.6 31.9 47.6 31.4 49.1 L 29.6 55 L 47.4 52.7 C 48.5 52.6 49.1 53.2 49 54.4 " +
  "L 48.1 78.5 L 51.8 78.5 L 50.9 54.4 C 50.8 53.2 51.4 52.6 52.5 52.7 L 70.3 55 L 68.5 49.1 " +
  "C 68 47.6 68.3 46.6 69.4 45.7 L 82.7 34.4 C 83.6 33.6 83.5 32.9 82.8 32.5 L 77 29.4 L 79.3 22.3 " +
  "C 79.8 21 79.2 20.6 77.9 20.9 L 72 22.1 L 70.6 16.1 C 70.4 14.9 69.8 14.5 69 15.4 L 61.9 23.4 " +
  "C 60.9 24.6 58.9 27.5 59.5 24.6 L 62.5 8.7 L 58.5 10.8 C 57.3 11.4 56.2 11.5 55.6 10.4 Z";

function FlagCa() {
  return (
    <svg {...FLAG_BOX}>
      <rect width="60" height="40" fill="#ffffff" />
      <rect width="15" height="40" fill="#d80621" />
      <rect x="45" width="15" height="40" fill="#d80621" />
      <g transform="translate(13.45 7) scale(0.331)">
        <path d={CA_LEAF} fill="#d80621" />
      </g>
    </svg>
  );
}

/* İngiltere'nin bayrağı zaten çizili — aynı Union Jack'i ikinci kez çizmenin
   tek sonucu iki kopyanın zamanla birbirinden ayrılması olurdu. */
function FlagGb() {
  return <SiteFlag country="ingiltere" />;
}

export type DestinationKey = "turkiye" | "almanya" | "hollanda" | "ingiltere" | "abd" | "kanada";

type Destination = {
  key: DestinationKey;
  /** seçicide görünen ad */
  name: string;
  /** başlıktaki hâli — Türkçe ek tahmin edilmiyor, elle yazılıyor */
  dative: string;
  /** "Türkiye'deki şirketiniz" — yol metinlerindeki {hedefteki} bunu alıyor */
  locative: string;
  /** başlıkta ülke adının rengi; gece zemininde (#080808) okunacak ton */
  ink: string;
  /** akış sahnesindeki yerel şirketin alt satırı */
  entity: string;
  Flag: () => React.ReactElement;
};

/* ---------------------------------------------------------------- ülke tablosu
   Yeni ülke eklemek = bu diziye bir satır. Bileşende hiçbir yerde ülke adı,
   eki veya rengi ikinci kez geçmiyor.

   RENK SEÇİMİ. Zemin var(--night) #080808 ve başlık .h2 700 ağırlıkta, en
   küçük hâlinde 30px — yani WCAG'in "büyük metin" eşiği geçerli, aranan oran
   3:1. Bayrağın kendi rengi bu eşiği geçiyorsa aynen alındı; geçmiyorsa
   bayrağın okunan ikinci rengine geçildi. Hesaplanan oranlar satır satır
   yazılı ki ileride ton değiştiren biri neyi bozduğunu görsün.

   SONRAKİ TUR. Müşteri "bazılarında ufak tefek değişiklik olur o ülkenin para
   getirme şartlarına göre" dedi. O farklar ülke başına birer alan olarak BURAYA
   gelecek (ör. yola özel not, dördüncü bir yol, gizlenecek yol). Sahne kurgusu
   aşağıda tabloyu okuduğu için tasarım tek kalır, yalnızca içerik ayrışır. */
const DESTINATIONS: Destination[] = [
  {
    key: "turkiye",
    name: "Türkiye",
    dative: "Türkiye'ye",
    locative: "Türkiye'deki",
    ink: "#e30a17", // bayrak kırmızısı, olduğu gibi — 4.1:1
    entity: "şahıs veya limited",
    Flag: FlagTr,
  },
  {
    key: "almanya",
    name: "Almanya",
    dative: "Almanya'ya",
    locative: "Almanya'daki",
    // siyah gece zemininde görünmüyor, bayrak kırmızısı #dd0000 3:1'in altında;
    // altın hem bayrağın kendi rengi hem de 13.4:1 ile bölümün en okunaklı tonu
    ink: "#ffce00",
    entity: "şahıs veya limited",
    Flag: FlagDe,
  },
  {
    key: "hollanda",
    name: "Hollanda",
    dative: "Hollanda'ya",
    locative: "Hollanda'daki",
    // bayrak kırmızısı #ae1c28 gecede 2.9:1 — eşiğin altında. Oranje ülkenin
    // bayrak dışındaki resmî rengi ve 7.2:1 veriyor; kırmızıyı yapay biçimde
    // parlatmaktansa Hollanda'nın gerçekten kendi rengi olan tonu kullanıyoruz
    ink: "#f4791f",
    entity: "şahıs veya limited",
    Flag: FlagNl,
  },
  {
    key: "ingiltere",
    name: "İngiltere",
    dative: "İngiltere'ye",
    locative: "İngiltere'deki",
    // Union Jack'in lacivertı #012169 gecede tamamen kayboluyor; bayrak
    // kırmızısı #c8102e 3.4:1 ile eşiği geçiyor, olduğu gibi alındı
    ink: "#c8102e",
    entity: "şahıs veya limited",
    Flag: FlagGb,
  },
  {
    key: "abd",
    name: "ABD",
    dative: "ABD'ye",
    locative: "ABD'deki",
    // Old Glory Red #b31942 gecede 2.99:1 ile eşiği kıl payı kaçırıyor,
    // lacivert #0a3161 hiç okunmuyor. Kırmızı en az miktarda açıldı: 3.8:1
    ink: "#cf2450",
    entity: "şahıs veya LLC",
    Flag: FlagUs,
  },
  {
    key: "kanada",
    name: "Kanada",
    dative: "Kanada'ya",
    locative: "Kanada'daki",
    ink: "#d80621", // bayrak kırmızısı, olduğu gibi — 3.8:1
    entity: "şahıs veya limited",
    Flag: FlagCa,
  },
];

export default function MoneyHome({ country, name }: { country: Country; name: string }) {
  const reduced = useReducedMotion();
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /* varsayılan Türkiye: dizinin ilk satırı, ayrıca bir yerde sabitlenmiyor */
  const [active, setActive] = useState(0);

  const dest = DESTINATIONS[active];
  const c = COUNTRY_CONTENT[country];

  /* uzaktaki şirket sayfanın ülkesi — seçici bunu değiştirmiyor, şirket zaten
     orada kurulu. Değişen taraf paranın indiği uç. */
  const abroad = { title: `${name} şirketi`, sub: c.tagline, icon: "world" as const };

  /* Yolların başlıkları ve notları COUNTRY_CONTENT'ten geliyor; onlar kuruluş
     ülkesine bağlı (ör. "Türkiye–BAE çifte vergilendirme anlaşması"), hedef
     ülkeye değil, o yüzden seçimden etkilenmiyorlar. Seçimle değişen tek şey
     birinci sahnedeki yerel şirket düğümü.

     2. ve 3. sahnedeki "Kişisel hesabınız" düğümü bilerek ülkesiz: hesabın
     hangi ülkede olduğunu başlık zaten söylüyor ve FlowScene'in kutusu sabit
     genişlikte (178px) — "İngiltere'deki hesabınız" oraya sığmıyor, SVG metni
     de sarmıyor. */
  /* Yol metinlerinde hedef ülke gömülü geçiyordu ("Türkiye–BAE çifte
     vergilendirme anlaşması…"). Seçici gelince bu cümle Almanya seçiliyken de
     Türkiye demeye devam ediyordu — tasarım değil, olgu hatası. Metinler artık
     countryContent'te {hedef} / {hedefteki} taşıyor, ülke adı tek yerden
     basılıyor. Ek tahmin edilmiyor: bulunma hâli DESTINATIONS'ta elle yazılı. */
  const fill = (s: string) =>
    s.replaceAll("{hedefteki}", dest.locative).replaceAll("{hedef}", dest.name);

  const routeSteps: SwitchStep[] = [
    {
      id: "fatura",
      title: c.routes[0].title,
      line: fill(c.routes[0].note),
      scene: (
        <FlowScene
          from={{ title: `${dest.name} şirketiniz`, sub: dest.entity, icon: "tr" }}
          to={abroad}
          forward="hizmet faturası"
          back="ödeme"
        />
      ),
    },
    {
      id: "kar-payi",
      title: c.routes[1].title,
      line: fill(c.routes[1].note),
      scene: (
        <FlowScene
          from={{ ...abroad, sub: "dönem kârı" }}
          to={{ title: "Kişisel hesabınız", sub: "ortak sıfatıyla", icon: "person" }}
          forward="kâr payı (temettü)"
        />
      ),
    },
    {
      id: "maas",
      title: c.routes[2].title,
      line: fill(c.routes[2].note),
      scene: (
        <FlowScene
          from={{ ...abroad, sub: "işveren" }}
          to={{ title: "Kişisel hesabınız", sub: "çalışan sıfatıyla", icon: "person" }}
          forward="aylık ücret"
        />
      ),
    },
  ];

  const labelId = `${uid}-lb`;
  const tabId = (i: number) => `${uid}-tab-${i}`;

  /* roving tabindex: altı bayrak tek bir tab durağı, aralarında oklarla
     geziliyor — bir tablist'ten beklenen davranış (StepSwitcher'daki ile aynı) */
  function move(next: number) {
    const i = (next + DESTINATIONS.length) % DESTINATIONS.length;
    setActive(i);
    tabRefs.current[i]?.focus();
  }

  function onListKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const k = e.key;
    if (k === "ArrowRight" || k === "ArrowDown") move(active + 1);
    else if (k === "ArrowLeft" || k === "ArrowUp") move(active - 1);
    else if (k === "Home") move(0);
    else if (k === "End") move(DESTINATIONS.length - 1);
    else return;
    e.preventDefault();
  }

  return (
    <section
      id="para-transferi"
      className="sec-pad sec-night"
      /* seçilen ülkenin rengi tek bir değişkenle aşağı iniyor; CSS'te ülke adı
         geçmiyor, yeni ülke stil dosyasına dokunmuyor */
      style={{ "--mh-ink": dest.ink } as React.CSSProperties}
    >
      <div className="container-o">
        <FadeUp className="mh-pick">
          <span className="mh-pick-lb" id={labelId}>
            Parayı nereye getiriyorsunuz?
          </span>
          <div
            className="mh-flags"
            role="tablist"
            aria-labelledby={labelId}
            onKeyDown={onListKeyDown}
          >
            {DESTINATIONS.map((d, i) => (
              <button
                key={d.key}
                type="button"
                role="tab"
                id={tabId(i)}
                aria-selected={i === active}
                tabIndex={i === active ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                className="mh-flag"
                data-on={i === active}
                /* seçili hâlde çerçeve ülkenin rengini alıyor — başlıktaki
                   vurguyla seçicinin aynı şeyi söylemesi için */
                style={{ "--mh-ink": d.ink } as React.CSSProperties}
                onClick={() => setActive(i)}
              >
                <span className="mh-flag-disc" aria-hidden="true">
                  <d.Flag />
                </span>
                <span>{d.name}</span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* aria-live: seçim başlığı değiştiriyor ama odak seçicide kalıyor.
            SplitWords görünmez tam metni de bastığı için ekran okuyucu yeni
            başlığı bir bütün cümle olarak duyuyor. */}
        <div className="sec-head sec-head-dark" aria-live="polite">
          {/* key ile yeniden kuruluyor: kelimeler sitenin kendi açılış
              hareketiyle tekrar geliyor, swap "tıklandı" hissi veriyor.
              Hareketi kapatmış ziyaretçide key sabit — metin sessizce
              değişiyor, aynı hareket tekrar tekrar oynamıyor. */}
          <SplitWords
            key={reduced ? "static" : dest.key}
            as="h2"
            text={`Kazancınızı ${dest.dative} nasıl getirirsiniz?`}
            /* Vurgu artık "nasıl getirirsiniz?" değil ülkenin kendisi: bölümün
               konusu hangi ülke olduğu. Başlıkta tek vurgu bırakıldı, ikincisi
               eklenseydi aynı satırda üç renk olacaktı. */
            accent={dest.dative}
            accentColor={dest.ink}
            className="h2"
            style={{ color: "#ffffff" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead sec-lead-dark">
              Üç yol var. Hangisinin size uyduğu mukimliğinize ve gelir tipinize bağlı.
            </p>
          </FadeUp>
        </div>

        <StepSwitcher steps={routeSteps} dark />

        {/* "Mali müşavirimizle durumunuza göre netleştiriyoruz" cümlesi
            ziyaretçiye olmayan bir randevuyu vaat ediyordu; kalan uyarı ise
            doğru ve kalması gerekiyor: bu başlıkta herkese uyan tek cevap yok.
            Uyarıyı bir çıkışsız cümle olarak bırakmak yerine soru butonuyla
            eşleştirdim — ziyaretçi "peki ben ne yapacağım" sorusuyla baş başa
            kalmıyor. Zemin sec-night olduğu için tone="solid".
            Sarmalayıcı .rt-foot sınıfını taşıyor: üst boşluk ve 62ch genişlik
            oradan geliyor, yeni CSS yazmaya gerek kalmadı. */}
        <div
          className="rt-foot"
          style={{ display: "grid", justifyItems: "start", gap: 14 }}
        >
          <p>Bu başlıkta herkese uyan tek bir cevap yok.</p>
          <AskCta tone="solid" />
        </div>
      </div>
    </section>
  );
}
