import Image from "next/image";
import { Compass, Target } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { TEAM_PHOTO } from "@/lib/media";
import { HERO, OPENING } from "@/lib/about";

/* ADAY A · LEVHA — hero + TEK blok · fotoğraf yalnız hero'da ·
   vizyon ve misyon iki kart değil, tek beyan.

   Cevap verdiği şikâyet "her şey iç içe girmiş": bugün şeritte hero'nun
   altında dört ayrı metin bloğu (başlık · iki paragraf · iki kart · künye)
   aynı beyaz zeminde 38-48 piksellik boşluklarla üst üste duruyor. Bu aday
   dördü birden tek bir levhanın iki katına alıyor; ayrım boşlukta değil
   zeminde (beyaz kat / gece kat).

   Metnin tamamı about.ts'ten. Yeni cümle yok. */
export default function AboutGirisL1() {
  return (
    <>
      <PageHero
        crumb={HERO.crumb}
        title={HERO.title}
        accent={HERO.accent}
        lead={HERO.lead}
        art={
          /* Hero canlıdaki hâlinden bir piksel değişmiyor: bu adayın tezi
             hero'nun DOĞRU olduğu, sorunun altında olduğu. */
          <FadeUp className="hgf-w" y={20}>
            <figure className="hgf-fig">
              <span className="hgf-ph">
                <Image
                  src={TEAM_PHOTO}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="hgf-img"
                  priority
                  unoptimized
                />
              </span>
            </figure>
          </FadeUp>
        }
      />

      <section className="sec-pad">
        <div className="container-o">
          <div className="hg1-plate">
            <div className="hg1-top">
              <div className="hg1-head">
                <SplitWords
                  as="h2"
                  text={OPENING.heading}
                  accent={OPENING.accent}
                  className="h2"
                  style={{ color: "var(--text-900)" }}
                />
                <FadeUp delay={0.18}>
                  <p className="hg1-lead">{OPENING.lead}</p>
                </FadeUp>
              </div>

              <div className="hg1-body">
                {OPENING.body.map((p, i) => (
                  <FadeUp key={p.slice(0, 24)} delay={0.26 + i * 0.08}>
                    <p className="hg1-p">{p}</p>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Gece kat. İki beyan yan yana, aralarında tek tel — kart kabuğu
                yok, çünkü kabuğun kendisi (1px #e6e6e6, beyaz üstünde 1,16:1)
                "sönük" şikâyetinin ölçülebilir yarısıydı. */}
            <div className="hg1-stage">
              {[
                { s: OPENING.vision, Icon: Compass },
                { s: OPENING.mission, Icon: Target },
              ].map(({ s, Icon }, i) => (
                <FadeUp key={s.t} className="hg1-say" delay={0.14 + i * 0.08}>
                  <h3 className="hg1-k">
                    <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                    {s.t}
                  </h3>
                  <p className="hg1-s">{s.s}</p>
                </FadeUp>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
