import { BadgeCheck, Check, ScrollText, Users } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import OfficeMap from "@/components/shared/OfficeMap";
import type { Country } from "@/lib/store";

/* Ortac × ülke — BASE.
 *
 * Bu bölüm "Ofisimiz burada" iddiasının yeni evi. O madde önce ülke
 * avantajları bento'sunda duruyordu ve orada yanlış şeyi söylüyordu:
 * Dubai'nin avantajı değil, Ortac'ın Dubai'deki avantajı. İkisi aynı ızgarada
 * durunca ziyaretçi hangisinin ülkeye hangisinin firmaya ait olduğunu
 * ayıramıyordu.
 *
 * Şimdilik iskelet: yalnızca gerçekten yerinde olduğumuz ülkede çıkıyor,
 * içerik de doğrulanabilir üç satırla sınırlı. Bölümün tam hâli (ekip, ofis
 * görselleri, lisans belgeleri, yerel süreç anlatımı) ayrıca kurulacak —
 * PRESENCE tablosuna satır eklemek yeni ülkeyi açmaya yetiyor.
 */

type Presence = {
  title: string;
  accent: string;
  lead: string;
  facts: { Icon: typeof Check; t: string; s: string }[];
  /** yalnızca çizili ofis haritası olan ülkede */
  map?: boolean;
};

/* SWAP:PRESENCE — satırlar müşteri onayına tabi. Bir ülkede fiziki varlık
   yoksa buraya satır YAZILMAZ; bölüm o ülkede hiç çıkmaz.
 *
 * BAŞLIK KALIBI — yeni ülke eklerken buna uyun: "<Ülke>'de işinizi kendi
 * ofisimizden yürütüyoruz." Kalıp iddia değil, yapılan işin tarifi; üç ülkede
 * de aynı cümleyle kurulur (Dubai'de / İngiltere'de / KKTC'de).
 *
 * Neden değişti: eski başlık "…'de yerinde olan taraf biziz." idi. Müşterinin
 * teşhisi: "o çok garip kaçıyor. daha basic tutup neden bizle dubai de şirket
 * kurması gerektiğini hissettiren bir başlık olmalı." Sorun konuda değil
 * ifadedeydi — "yerinde olan taraf" bir üstünlük ilanı; ziyaretçiye ne
 * yaptığımızı değil, kime karşı üstün olduğumuzu söylüyordu.
 *
 * Eski lead "Bu bölüm Dubai'nin değil, Ortac'ın avantajı." diye başlıyordu;
 * o cümle bölümün kendi hakkında konuşmasıydı ve ülke/firma karışmasın diye
 * konmuştu. Artık gerek yok: başlık birinci tekil çoğul kuruyor
 * ("yürütüyoruz"), yani avantajın sahibi cümlenin kendisinde belli. */
const PRESENCE: Partial<Record<Country, Presence>> = {
  dubai: {
    title: "Dubai'de işinizi kendi ofisimizden yürütüyoruz.",
    accent: "kendi ofisimizden yürütüyoruz.",
    lead: "Süreci uzaktan bir aracıya devretmiyoruz; evrak, otorite ve banka trafiği aynı ekipten geçiyor. Kuruluş bittiğinde de muhatabınız değişmiyor.",
    map: true,
    facts: [
      {
        Icon: BadgeCheck,
        t: "IFZA resmî iş ortağı",
        s: "Serbest bölge başvurusu aracı üzerinden değil, doğrudan yürüyor.",
      },
      {
        Icon: ScrollText,
        t: "Kendi muhasebe lisansımız",
        s: "Defter ve beyan taşerona gitmiyor; kuruluş sonrası da aynı ekipte.",
      },
      {
        Icon: Users,
        t: "Türkçe tek muhatap",
        s: "İsimli bir danışman, mesai içinde doğrudan erişim.",
      },
    ],
  },
};

export default function CountryOrtac({ country }: { country: Country }) {
  const p = PRESENCE[country];
  if (!p) return null;

  return (
    <section className="sec-pad" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text={p.title}
            accent={p.accent}
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{p.lead}</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.25} y={18}>
          <div className="cor" data-map={p.map || undefined}>
            <ul className="cor-list">
              {p.facts.map(({ Icon, t, s }) => (
                <li key={t}>
                  <span className="cor-ic" aria-hidden="true">
                    <Icon size={17} strokeWidth={2.1} />
                  </span>
                  <span className="cor-txt">
                    <b>{t}</b>
                    {s}
                  </span>
                </li>
              ))}
            </ul>

            {p.map && (
              <div className="cor-map">
                <OfficeMap />
              </div>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
