import { ArrowUpRight, FileCheck, Landmark, Lock, LockOpen } from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import type { Sermaye } from "@/lib/countryContent";

/* ============================================================================
   SERMAYE BLOKE KALIYOR MU — .cse- · css/country-bilgi.css
   Veri: countryContent.ts · <ülke>.sermaye (şimdilik yalnız KKTC).

   23.09.2026 · Burak: "sermaye konusunu da ele alabiliriz, bloke mi kalıyor
   geri mi alınıyor … resmi kaynakta 50 ise onu kullan." Solda gece kutuda
   tutarın kendisi ve üç olgu (en az ortak, iki harç); sağda paranın dört
   durağı: yatırılıyor → bloke → tescil → serbest. Kilit kapalıdan açığa
   dönüyor; son durak mavi, cevap o ("para şirketinizde kalıyor"). */

const IKON = [Landmark, Lock, FileCheck, LockOpen];

export default function CountrySermaye({ data }: { data: Sermaye }) {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={data.title} accent={data.accent} className="h2" />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{data.lead}</p>
          </FadeUp>
        </div>

        <div className="cse">
          <FadeUp className="cse-f" delay={0.1}>
            <div className="cse-tutar">
              <span className="cse-tutar-e">Asgari sermaye</span>
              <b>{data.tutar}</b>
              <p>{data.tutarNot}</p>
              <dl className="cse-olgu">
                {data.olgular.map((o) => (
                  <div key={o.etiket}>
                    <dt>{o.etiket}</dt>
                    <dd>{o.deger}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeUp>

          <ol className="cse-yol">
            {data.adimlar.map((a, i) => {
              const I = IKON[i] ?? Landmark;
              const son = i === data.adimlar.length - 1;
              return (
                <li key={a.baslik}>
                  <FadeUp className="cse-f" delay={0.12 + i * 0.07}>
                    <div className="cse-a" data-son={son ? "" : undefined}>
                      <span className="cse-ic" aria-hidden="true">
                        <I size={18} strokeWidth={2} />
                      </span>
                      <div>
                        <b>{a.baslik}</b>
                        <p>{a.line}</p>
                      </div>
                    </div>
                  </FadeUp>
                </li>
              );
            })}
          </ol>
        </div>

        <FadeUp delay={0.2}>
          <a className="cse-kaynak" href={data.kaynak.href} target="_blank" rel="noopener noreferrer">
            {data.kaynak.label}
            <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
