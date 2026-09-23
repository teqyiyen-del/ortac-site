import { CalendarClock } from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import type { Takvim } from "@/lib/countryContent";

/* ============================================================================
   KURULUŞTAN SONRA HER YIL — .ctk- · css/country-bilgi.css
   Veri: countryContent.ts · <ülke>.takvim (şimdilik İngiltere).

   23.09.2026 · İngiltere talep araştırmasının boşluğu: rakip sayfaların
   hiçbiri 2026 harçlarını ve iki katına çıkan beyanname cezasını yazmıyor.
   Dubai'nin kuruluş sonrası bölümü (CountryAfter) her kalemde fiyat
   taşıyor; burada fiyat yok, SÜRE ve CEZA var. Her kalem bir kart: büyük
   süre ("9 ay"), dosyanın adı, kuralın tek cümlesi, varsa ceza şeridi. */

export default function CountryTakvim({ data }: { data: Takvim }) {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={data.title} accent={data.accent} className="h2" />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{data.lead}</p>
          </FadeUp>
        </div>

        <ul className="ctk">
          {data.kalemler.map((k, i) => (
            <li key={k.ne}>
              <FadeUp className="ctk-f" delay={0.08 + i * 0.06}>
                <div className="ctk-k">
                  <span className="ctk-sure">
                    <CalendarClock size={16} strokeWidth={2} aria-hidden="true" />
                    {k.sure}
                  </span>
                  <b className="ctk-ne">{k.ne}</b>
                  <p className="ctk-kural">{k.kural}</p>
                  {k.ceza && <p className="ctk-ceza">{k.ceza}</p>}
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>

        {/* Kaynak linki 23.09.2026'da sayfadan kalktı ("her yere not
            düşüyorsun"); data.kaynak ve docs'taki mevzuat notu duruyor. */}
      </div>
    </section>
  );
}
