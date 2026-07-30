"use client";

/* SWAP:PARTNER_LOGOS — text wordmarks until the 5 monochrome SVGs land.
   Seamless infinite loop: two identical halves, each carrying its own trailing
   gap, animated to exactly -50%. (A single flex row with gaps loops with a
   visible jump, because -50% of the track is not the width of one half.) */
const PARTNERS = ["IFZA", "Wio", "Mashreq", "PayPal", "Wam", "Stripe", "TaxDome"];

function Half() {
  return (
    <div className="mq-half">
      {PARTNERS.map((p) => (
        <span key={p} className="mq-item">
          {p}
          <span className="mq-dot" />
        </span>
      ))}
    </div>
  );
}

export default function PartnerMarquee() {
  return (
    <section className="mq-section" aria-label="Resmî ortaklıklar">
      <div className="mq">
        <div className="mq-track" aria-hidden="true">
          <Half />
          <Half />
        </div>
      </div>
      <p className="sr-only">Resmî ortaklıklar: {PARTNERS.join(", ")}.</p>
    </section>
  );
}
