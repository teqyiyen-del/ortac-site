import { Check, TriangleAlert } from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import type { CountryContent } from "@/lib/countryContent";

/* ============================================================================
   YAPI SEÇİMİ · KART DÜZENİ — Dubai dışındaki ülkeler (şimdilik KKTC)
   Biçim: css/country-yapi.css (.cyk-)

   22.09.2026 · Dubai'nin yapı bölümü (CountryStructures) iki seçenekli ve
   BAE'ye özel bir harita çiziyor: kıyı, serbest bölge parselleri, "BAE
   dışına/içine satıyorsanız" etiketleri bileşenin içine yazılı. KKTC'de üç
   yapı var (limited · Serbest Liman · UİŞ) ve ayrım "nereye satıyorsunuz"
   ile kuruluyor ama haritayla değil: üç kart, her birinde ne olduğu, kime
   uyduğu ve dikkat edilecek şey. Karar cümlesi (data.rule) kartların üstünde.

   İDDİA SINIRI: ekrandaki her cümle countryContent.structures'tan; burada
   üretilen tek metin iki liste başlığı ("Kime uyuyor" · "Dikkat"). */

export default function CountryStructureCards({
  data,
}: {
  data: NonNullable<CountryContent["structures"]>;
}) {
  return (
    <section className="sec-pad">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={data.title} className="h2" />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{data.lead}</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.24}>
          <p className="cyk-kural">{data.rule}</p>
        </FadeUp>

        <ul className="cyk">
          {data.options.map((o, i) => (
            <li key={o.name}>
              <FadeUp className="cyk-k" delay={0.12 + i * 0.06}>
                <span className="cyk-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="cyk-t">{o.name}</h3>
                <p className="cyk-s">{o.line}</p>

                <p className="cyk-bas">Kime uyuyor</p>
                <ul className="cyk-fit">
                  {o.fit.map((f) => (
                    <li key={f}>
                      <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="cyk-dikkat">
                  <TriangleAlert size={15} strokeWidth={2.2} aria-hidden="true" />
                  <p>{o.watch}</p>
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
