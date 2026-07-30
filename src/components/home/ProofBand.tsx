import { BadgeCheck, Building2, Languages, ScrollText } from "lucide-react";

/* §2 — thin band, first-scroll trust. No numbers we cannot verify (brief §2). */
const ITEMS = [
  { Icon: BadgeCheck, t: "IFZA resmî iş ortağı" },
  { Icon: Building2, t: "Dubai'de kendi ofisimiz" },
  { Icon: ScrollText, t: "Muhasebe lisansı" },
  { Icon: Languages, t: "Süreç Türkçe yürütülür" },
];

export default function ProofBand() {
  return (
    <section className="pb" aria-label="Güven bilgileri">
      <div className="container-o pb-inner">
        {ITEMS.map(({ Icon, t }) => (
          <span key={t} className="pb-item">
            <Icon size={16} strokeWidth={2} aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
