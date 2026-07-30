"use client";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import AskCta from "@/components/shared/AskCta";
import StepSwitcher, { type Step } from "@/components/shared/StepSwitcher";
import FlowScene from "@/components/shared/FlowScene";

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

        {/* Buradaki kapanış iki ayrı sözü aynı anda veriyordu ve ikisi de
            tutulamıyordu: "mali müşavirimizle" olmayan bir hizmet kurgusunu,
            "15 dakikada" ise STANCE_LIMITS'in açıkça yasakladığı kesin süre
            taahhüdünü anlatıyordu. Kalması gereken kısım uyarının kendisi —
            doğru yolun kişiye göre değiştiği — o yüzden cümle orada kesildi.
            Çıkış da değişti: eski buton SWAP bekleyen "#" adresine gidiyordu,
            yani tıklanınca hiçbir şey olmuyordu. Yerine sitenin tek soru
            çıkışı geldi; koyu zeminde durduğu için tone="solid". */}
        <FadeUp delay={0.4}>
          <div className="rep-foot">
            <p>
              Hangi yolun size uygun olduğu; nerede yaşadığınıza, şirketi nereden
              yönettiğinize ve gelirin tipine göre değişir.
            </p>
            <AskCta tone="solid" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
