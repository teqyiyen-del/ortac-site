import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import { STANCE_A, STANCE_LIMITS, STANCE_Q } from "@/lib/brand";

/* §8 — the spine of the site. Calm, unornamented, quote-block. The category's
   best-selling lie is "you will not pay tax"; we condition it instead of
   killing it, so the highest-intent visitor goes into the test. */
export default function Stance() {
  return (
    <section id="durus" className="sec-pad st-sec">
      <div className="container-o">
        <FadeUp>
          <p className="st-q">{STANCE_Q}</p>
        </FadeUp>
        <FadeUp delay={0.12}>
          <blockquote className="st-a">{STANCE_A}</blockquote>
        </FadeUp>

        <div className="st-grid">
          {STANCE_LIMITS.map((l, i) => (
            <FadeUp key={l.title} delay={0.24 + i * 0.08}>
              <div className="st-card">
                <h3>{l.title}</h3>
                <p>{l.line}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.5}>
          <Link href="/uygunluk-testi" className="btn btn-primary st-cta">
            Durumunuza uygun mu, 6 soruda bakalım
            <ArrowRight size={15} strokeWidth={2.1} />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
