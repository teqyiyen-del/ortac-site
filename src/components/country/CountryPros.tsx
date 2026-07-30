import {
  BadgeCheck,
  Check,
  CreditCard,
  IdCard,
  Landmark,
  MapPin,
  MonitorSmartphone,
  Percent,
  TriangleAlert,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import ProSchema from "@/components/country/ProSchema";
import type { Pro } from "@/lib/countryContent";

/* One icon family, one stroke weight. Each advantage gets the glyph of the
   thing it actually is instead of a row of identical ticks. */
const PRO_ICON: Record<string, LucideIcon> = {
  percent: Percent,
  bank: Landmark,
  id: IdCard,
  pin: MapPin,
  remote: MonitorSmartphone,
  wallet: Wallet,
  badge: BadgeCheck,
  card: CreditCard,
  zap: Zap,
};

/* Turkish possessive, written out rather than guessed: the three labels the
   site actually ships (Dubai, Ingiltere, KKTC) all take -nin, and the fallback
   keeps a new label from crashing the heading. */
const POSSESSIVE: Record<string, string> = {
  Dubai: "Dubai'nin",
  İngiltere: "İngiltere'nin",
  KKTC: "KKTC'nin",
};

/* Twelve columns, one featured cell, and rows that always close. The first
   advantage takes 7 columns and two rows; the two beside it take 5 each; what
   is left pairs up 7+5 so the bento never ends with a hole. */
function spansFor(total: number): number[] {
  if (total <= 1) return [12];
  if (total === 2) return [7, 5];

  const out = [7, 5, 5];
  let left = total - 3;
  while (left > 0) {
    if (left === 1) {
      out.push(12);
      left = 0;
    } else if (left === 3) {
      out.push(4, 4, 4);
      left = 0;
    } else {
      out.push(7, 5);
      left -= 2;
    }
  }
  return out;
}

function rankFor(index: number, span: number, total: number) {
  if (index === 0 && total >= 3) return "hero";
  return span >= 7 ? "wide" : "mid";
}

export default function CountryPros({
  name,
  pros,
  watchouts,
}: {
  name: string;
  pros: Pro[];
  watchouts: Pro[];
}) {
  /* the watchouts cell is part of the bento, not a footnote under it: same
     grid, same weight, its own colour so the warning still reads as a warning */
  const hasWatch = watchouts.length > 0;
  const total = pros.length + (hasWatch ? 1 : 0);
  const spans = spansFor(total);
  const watchSpan = hasWatch ? (spans[pros.length] ?? 12) : 12;

  const heading = `${POSSESSIVE[name] ?? `${name}'nin`} avantajları`;

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text={heading}
            accent="avantajları"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Avantajı da, karşılığında kabul ettiğiniz kalemi de aynı yerde
              yazıyoruz.
            </p>
          </FadeUp>
        </div>

        <div className="adv-bento">
          {pros.map((x, i) => {
            const span = spans[i] ?? 12;
            const rank = rankFor(i, span, total);
            const Icon = (x.icon && PRO_ICON[x.icon]) || Check;
            /* A claim that carries a condition keeps that condition visible in
               the card head, not only at the end of the sentence. Read off the
               copy itself (asterisked title, or a line that states the
               condition) rather than off the icon key, so the badge cannot
               drift onto an unconditional advantage that happens to reuse an
               icon. */
            const conditional =
              x.title.includes("*") || /şart/i.test(x.line);
            return (
              <FadeUp
                key={x.title}
                delay={0.12 + i * 0.07}
                y={18}
                className={`adv-cell adv-c${span}${
                  rank === "hero" ? " adv-tall" : ""
                }`}
              >
                <article className="adv-card" data-rank={rank}>
                  <div className="adv-body">
                    <div className="adv-head">
                      <span className="adv-ic" aria-hidden="true">
                        <Icon size={18} strokeWidth={2.1} />
                      </span>
                      {conditional && (
                        <span className="adv-chip">şarta bağlı</span>
                      )}
                    </div>
                    <h3 className="adv-t">{x.title}</h3>
                    <p className="adv-p">{x.line}</p>
                  </div>
                  {/* the drawing restates the claim above it, so it carries no
                      information of its own for a screen reader */}
                  <figure className="adv-fig" aria-hidden="true">
                    <ProSchema kind={x.icon} />
                  </figure>
                </article>
              </FadeUp>
            );
          })}

          {hasWatch && (
            <FadeUp
              delay={0.12 + pros.length * 0.07}
              y={18}
              className={`adv-cell adv-c${watchSpan} adv-cell-watch`}
            >
              <article className="adv-card adv-card-watch" data-rank="watch">
                <div className="adv-watch-h">
                  <span className="adv-watch-ic" aria-hidden="true">
                    <TriangleAlert size={17} strokeWidth={2.1} />
                  </span>
                  <h3 className="adv-t adv-watch-t">Karşılığında</h3>
                  <span className="adv-count">
                    <b>{watchouts.length}</b> kalem
                  </span>
                </div>
                <ul className="adv-watch-list">
                  {watchouts.map((w, i) => (
                    <li key={w.title}>
                      <span className="adv-watch-n" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span>
                        <b>{w.title}.</b> {w.line}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  );
}
