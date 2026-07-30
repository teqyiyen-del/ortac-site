"use client";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import GhostButton from "@/components/shared/GhostButton";
import StepSwitcher, { type Step } from "@/components/shared/StepSwitcher";
import FlowScene from "@/components/shared/FlowScene";
import { gtm } from "@/lib/gtm";

/* SWAP:CALENDLY_URL */
const CALENDLY_URL = "#";

/* SWAP:REPATRIATION_COPY — the category's most-asked, least-answered question.
   The diagram carries the mechanics, so the copy stays to one line per route
   and states no rates or legal conclusions. */
const STEPS: Step[] = [
  {
    id: "fatura",
    title: "Fatura ile",
    line: "Türkiye şirketiniz, yurt dışı şirketinize fatura keser.",
    scene: (
      <FlowScene
        from={{ title: "Türkiye şirketiniz", sub: "şahıs veya limited", icon: "tr" }}
        to={{ title: "Yurt dışı şirket", sub: "Dubai · İngiltere · KKTC", icon: "world" }}
        forward="hizmet faturası"
        back="ödeme"
      />
    ),
  },
  {
    id: "kar-payi",
    title: "Kâr payı ile",
    line: "Şirket, dönem kârını ortağına dağıtır.",
    scene: (
      <FlowScene
        from={{ title: "Yurt dışı şirket", sub: "dönem kârı", icon: "world" }}
        to={{ title: "Kişisel hesabınız", sub: "ortak sıfatıyla", icon: "person" }}
        forward="kâr payı (temettü)"
      />
    ),
  },
  {
    id: "maas",
    title: "Maaş ile",
    line: "Şirketten kendinize bordrolu ödeme yaparsınız.",
    scene: (
      <FlowScene
        from={{ title: "Yurt dışı şirket", sub: "işveren", icon: "world" }}
        to={{ title: "Kişisel hesabınız", sub: "çalışan sıfatıyla", icon: "person" }}
        forward="aylık ücret"
      />
    ),
  },
];

export default function Repatriation() {
  return (
    <section id="para-transferi" className="rep-section">
      <div className="container-o">
        <div className="sec-head sec-head-dark">
          <SplitWords
            as="h2"
            text="Kazancınızı Türkiye'ye getirmenin üç yolu."
            accent="üç yolu."
            className="h2"
            style={{ color: "#ffffff" }}
          />
          <FadeUp delay={0.22}>
            <p className="sec-lead sec-lead-dark">
              Fatura, kâr payı ve maaş. Üçünün de akışı aşağıda.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.28}>
          <StepSwitcher steps={STEPS} dark />
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="rep-foot">
            <p>
              Hangi yolun size uygun olduğu; nerede yaşadığınıza, şirketi nereden
              yönettiğinize ve gelirin tipine göre değişir. Mali müşavirimizle 15
              dakikada netleştiriyoruz.
            </p>
            <GhostButton
              deep
              href={CALENDLY_URL}
              onClick={() => gtm("cta_meeting_click", { placement: "repatriation" })}
            >
              Görüşme planlayın
            </GhostButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
