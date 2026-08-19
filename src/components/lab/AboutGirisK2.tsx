import Image from "next/image";
import { Compass, Target } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { PHOTO, TEAM_PHOTO } from "@/lib/media";
import { HERO, OPENING } from "@/lib/about";

/* ADAY B · KANAT — hero + İKİ blok · İKİ AYRI KARE · vizyon ve misyon
   iki kart olarak kalıyor.

   Cevap verdiği şikâyet "görselsiz kalmış": bugün hero'nun altındaki 725
   piksellik bölümde toplam 648 px² grafik var (iki adet 18px lucide ikonu),
   yani bir üstündeki hero karesinin (551x367) üç yüzde biri kadar bile değil.
   Bu aday vizyon/misyon hizasına İKİNCİ bir kare indiriyor.

   KARE NEDEN İKİNCİ, KOPYA DEĞİL: geçen turun taşıma gerekçesi ("aynı kare
   iki ekran arayla iki kez basılsaydı sayfanın en büyük iki lekesi aynı
   fotoğraf olurdu") duruyor. Buradaki kare PHOTO.formation — depoda ZATEN
   duran ve gözle doğrulanmış açık plan ofis karesi (media.ts · GUIDE_PHOTO
   notunda tarifi var: boş ofis katı, insan ve marka yok). Yeni bir Unsplash
   kimliği eklenmedi, çünkü her yeni kimlik yeni bir doğrulama borcu demek.

   Metnin tamamı about.ts'ten. Yeni cümle yok. */
export default function AboutGirisK2() {
  return (
    <>
      <PageHero
        crumb={HERO.crumb}
        title={HERO.title}
        accent={HERO.accent}
        lead={HERO.lead}
        art={
          <FadeUp className="hgf-w" y={20}>
            <figure className="hgf-fig">
              <span className="hgf-ph">
                <Image
                  src={TEAM_PHOTO}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="hgf-img"
                  unoptimized
                />
              </span>
            </figure>
          </FadeUp>
        }
      />

      <section className="sec-pad">
        <div className="container-o">
          {/* 1. blok — başlık | iki paragraf. Canlıdaki ızgaranın aynısı:
              bu adayın iddiası metin tarafının doğru olduğu, eksiğin
              vizyon/misyon hizasında olduğu. */}
          <div className="hg2-open">
            <div className="hg2-head">
              <SplitWords
                as="h2"
                text={OPENING.heading}
                accent={OPENING.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.18}>
                <p className="hg2-lead">{OPENING.lead}</p>
              </FadeUp>
            </div>

            <div className="hg2-body">
              {OPENING.body.map((p, i) => (
                <FadeUp key={p.slice(0, 24)} delay={0.26 + i * 0.08}>
                  <p className="hg2-p">{p}</p>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* 2. blok — kare | iki kart. Gri panel iki bloğu birbirinden
              ayırıyor: "iç içe" şikâyetinin karşılığı burada boşluk değil
              ZEMİN farkı (48 pikselden 72'ye çıkan ara tek başına yetmezdi,
              bugün de 48 ve yetmiyor). */}
          <div className="hg2-band">
            <FadeUp className="hg2-phw" y={16}>
              {/* alt="" ve DEKORATİF: kare bir iddia taşımıyor, "işte
                  ofisimiz" demiyor. Aynı kare sitede zaten şirket kuruluşu
                  hizmetinin görseli (components/Services.tsx). */}
              <span className="hg2-ph">
                <Image
                  src={PHOTO.formation}
                  alt=""
                  fill
                  sizes="(min-width: 981px) 38vw, 100vw"
                  className="hg2-img"
                  unoptimized
                />
              </span>
            </FadeUp>

            <div className="hg2-cards">
              {[
                { s: OPENING.vision, Icon: Compass },
                { s: OPENING.mission, Icon: Target },
              ].map(({ s, Icon }, i) => (
                <FadeUp key={s.t} delay={0.1 + i * 0.08}>
                  <article className="hg2-card">
                    <span className="hg2-ic" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.9} />
                    </span>
                    <h3>{s.t}</h3>
                    <p>{s.s}</p>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
