"use client";

/* SWAP:PARTNER_LOGOS — text wordmarks until the 5 monochrome SVGs land.
   Seamless infinite loop: two identical halves, each carrying its own trailing
   gap, animated to exactly -50%. (A single flex row with gaps loops with a
   visible jump, because -50% of the track is not the width of one half.)

   ÖLÜ DOSYA: bu bileşeni hiçbir sayfa import etmiyor; yaşayan şerit
   components/home/HeroPartners.tsx (ve listesi brand.ts · PARTNERS'tan
   geliyor). Yine de tutarlılık için elden geçti — aşağıdaki listede müşteri
   panelinin marka adı duruyordu, müşteri kararıyla çıkarıldı: "iş ortağımız
   vb değil, sadece panel olarak kullanıyoruz, ekstra adını geçirmemize
   gereken bir durum yok." Geri eklemeyin. */
const PARTNERS = ["IFZA", "Wio", "Mashreq", "PayPal", "wamo", "Stripe"];

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
