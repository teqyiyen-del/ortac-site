import {
  CalendarClock, MapPin, Percent, Receipt, UserRound, type LucideIcon,
} from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import {
  ACC_TAX_ICON, ACC_TAX_NOTE, ACC_TAX_ROWS, ACCOUNTING_DUBAI as C,
  accountingItems, frequencyLabel, yearLanes,
  type AccTaxIcon, type YearLane,
} from "@/lib/accountingDubai";
import { INCLUSION_LABEL } from "@/lib/afterSetup";

const TAX_ICON: Record<AccTaxIcon, LucideIcon> = {
  percent: Percent, pin: MapPin, clock: CalendarClock,
  receipt: Receipt, person: UserRound,
};

const AXIS = "lisanstan sonra kaçıncı ay";
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

/* Yardımcıların hepsi veriden türüyor; elle yazılmış rakam yok.
   (Lab karşılıkları: CalMTShared4 · mtwFreq/mtwAlt/mtwConditional,
    CalMTShared5 · mtyFacts/mtySplitText/mtyPeakText/mtyPeakX/mtyBusyText.) */
function facts(lanes: YearLane[]) {
  const load = MONTHS.map((m) => lanes.filter((l) => l.months.includes(m)).length);
  const busy = load.filter((n) => n > 0).length;
  const total = load.reduce((a, n) => a + n, 0);
  const say = new Map<number, number>();
  for (const n of load) if (n > 0) say.set(n, (say.get(n) ?? 0) + 1);
  const split = [...say.entries()].sort((a, b) => a[0] - b[0])
    .map(([kalem, ay]) => ({ ay, kalem }));
  const peak = Math.max(...load, 0);
  const peakMonths = load.map((n, i) => (n === peak ? i + 1 : 0)).filter(Boolean);
  return { load, busy, total, split, peak, peakMonths };
}
const splitText = (f: ReturnType<typeof facts>) =>
  f.split.map((s) => `${s.ay} ayda ${s.kalem} kalem`).join(" · ");
const peakText = (f: ReturnType<typeof facts>) =>
  `en yoğunu ${f.peakMonths.join(". ve ")}. ay`;
const peakX = (f: ReturnType<typeof facts>) =>
  `${(((f.peakMonths.at(-1) ?? MONTHS.length) - 0.5) / MONTHS.length) * 100}%`;
/* Cevap cümlesi VERİDEN: 12'ye eşitse "hepsinde", değilse gerçek sayı.
   MT16'da bu cümle "İş çıkmayan ay yok." diye ELLE yazılıydı ve o hâlde
   bir kalemin ayları değişince sessizce yanlış kalıyordu. */
const busyText = (f: ReturnType<typeof facts>) =>
  f.busy >= MONTHS.length ? "on iki ayın hepsinde" : `on iki ayın ${f.busy} ayında`;
const CONDITIONAL = new Set(
  accountingItems().filter((i) => i.inclusion === "gerekli-ise").map((i) => i.id),
);
const laneAlt = (lanes: YearLane[]) =>
  `Lisanstan sonraki on iki ay. ${lanes.map((l) =>
    l.months.length >= MONTHS.length
      ? `${l.label}: on iki ayın hepsi`
      : `${l.label}: ${l.months.join(", ")}. aylar`).join(". ")}.`;

export default function AccountingCalendar() {
  const lanes = yearLanes();
  const f = facts(lanes);

  return (
    <>
      <FadeUp delay={0.06} className="kmt-body">
        <div className="kmt-card">
          {/* PERDE 1 — kuruluşta bir kez. Üç kayıt yan yana (MT16'nın tek farkı). */}
          <h3 id={C.why.id} className="kmt-act">{C.why.title}</h3>
          <ol className="kmt-recs">
            {C.why.points.map((p, i) => (
              <li key={p.title}>
                <details className="kmt-rec">
                  <summary>
                    <span className="kmt-rec-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <b className="kmt-rec-t">{p.title}</b>
                    <span className="kmt-rec-i" aria-hidden="true" />
                  </summary>
                  <div className="kmt-rec-b">
                    <p>{p.line}</p>
                    {p.more && <p>{p.more}</p>}
                  </div>
                </details>
              </li>
            ))}
          </ol>

          {/* PERDE 2 — sonra her yıl. 12/12 RAKAM ÇİFTİ YOK: müşteri
              "başlık ve açıklama kalsın" dedi. Cevabı artık tek başına
              alttaki cümle taşıyor ve o cümle veriden kuruluyor. */}
          <div className="kmt-act2">
            <div className="kmt-hd">
              <h3 className="kmt-q">{C.calendar.stripTitle}</h3>
              <p className="kmt-al">
                İş {busyText(f)} çıkıyor. Toplam <b>{f.total} iş</b>:{" "}
                {splitText(f)}; {peakText(f)}.
              </p>
            </div>

            <div className="kmt-rail" data-peak=""
              style={{ "--kmt-dur": "16.993s", "--pk": peakX(f) } as React.CSSProperties}>
              {/* Çizim aria-hidden; cümle ayrı bir düğüm (tuzak G). */}
              <p className="sr-only">{laneAlt(lanes)}</p>

              <div className="kmt-axis" aria-hidden="true">
                <span className="kmt-axis-n">{AXIS}</span>
                <span className="kmt-axis-l">
                  <i style={{ "--x": "0%" } as React.CSSProperties}>Lisans</i>
                  <i style={{ "--x": "50%" } as React.CSSProperties}>6. ay</i>
                  <i style={{ "--x": "100%" } as React.CSSProperties}>12. ay</i>
                </span>
              </div>

              <ol className="kmt-rows">
                {lanes.map((l) => (
                  <li key={l.id}>
                    <div className="kmt-key-row">
                      <span className="kmt-key">
                        <b>{l.label}</b>
                        <span>{frequencyLabel(l.months.length)}</span>
                        {CONDITIONAL.has(l.id) && (
                          <em className="kmt-tag" data-tone="night">
                            {INCLUSION_LABEL["gerekli-ise"].short.toLocaleLowerCase("tr-TR")}
                          </em>
                        )}
                      </span>
                      <span className="kmt-track" aria-hidden="true">
                        {l.months.length >= MONTHS.length ? (
                          <span className="kmt-bar"
                            style={{ "--n": l.months.length } as React.CSSProperties} />
                        ) : (
                          l.months.map((m) => (
                            <span key={m} className="kmt-dot" style={{
                              "--x": `${((m - 0.5) / MONTHS.length) * 100}%`,
                            } as React.CSSProperties} />
                          ))
                        )}
                      </span>
                      <span className="kmt-count">
                        {l.months.length}<span>&nbsp;kez</span>
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Kapıya girmeyen şerh: iki iddia yüzeyde kalıyor. */}
        <p className="kmt-note">{C.calendar.caption}</p>
      </FadeUp>

      {/* VERGİ ÇERÇEVESİ — kapı DEĞİL, açık künye tahtası + ikon karesi. */}
      <FadeUp delay={0.14}>
        <div className="kmt-frame">
          <h3 id={C.taxFrame.id} className="kmt-frame-h">{C.taxFrame.title}</h3>
          <ul className="kmt-figs">
            {ACC_TAX_ROWS.map((r) => {
              const Icon = TAX_ICON[ACC_TAX_ICON[r.label] ?? "pin"];
              return (
                <li className="kmt-fig" key={r.label}>
                  <span className="kmt-fig-ic" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.9} />
                  </span>
                  <p className="kmt-fig-k">{r.label}</p>
                  <p className="kmt-fig-v">{r.value}</p>
                  {r.note && <p className="kmt-fig-n">{r.note}</p>}
                </li>
              );
            })}
          </ul>
          <div className="kmt-frame-cta">
            <p>{ACC_TAX_NOTE}</p>
            <AskCta label="Kendi durumumu sorayım" />
          </div>
        </div>
      </FadeUp>
    </>
  );
}