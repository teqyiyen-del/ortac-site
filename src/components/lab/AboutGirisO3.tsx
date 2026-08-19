import Image from "next/image";
import { Compass, Target } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { TEAM_PHOTO } from "@/lib/media";
import { HERO, OPENING } from "@/lib/about";

/* ADAY C · OCAK — fotoğraf hero'dan İNİYOR · hero kompakt başlık bloğuna
   dönüyor · vizyon ve misyon karenin yanında, bir beyan olarak.

   Cevap verdiği şikâyet "aşağısı çok garip kalmış": geçen tur kare yukarı
   çıkınca hero kazandı, altı kaybetti. Bu aday kareyi geldiği yere geri
   veriyor ama bölümü bu sefer karenin ETRAFINA kuruyor — müşterinin asıl
   cümlesi zaten "bir kısım olsun ve görselle açılsın" idi, hero'ya çıkarmak
   o cümlenin geçen turdaki okumasıydı.

   HERO'DA `art` PROPU YOK: PageHero'nun üçüncü dalı devreye giriyor ve hero
   sitedeki diğer iç sayfaların kompakt başlık bloğuna dönüyor. Yani bu
   adayın bedeli açık ve müşteri onu ekranda görecek: hero ayrışmasını
   kaybediyor, şeridin ağırlık merkezi aşağı iniyor.

   METİN FOTOĞRAFIN ÜSTÜNE GELMİYOR. Kare ile beyan aynı panelde ama iki
   ayrı sütunda; sol sütun OPAK gece. Canlı dosyadaki gerekçe hâlâ geçerli:
   stok kare müşterinin kendi çekimiyle değişecek, karenin bir köşesinde
   bugün ölçülen kontrast yarın geçersiz olurdu.

   Metnin tamamı about.ts'ten. Yeni cümle yok. */
export default function AboutGirisO3() {
  return (
    <>
      <PageHero crumb={HERO.crumb} title={HERO.title} accent={HERO.accent} lead={HERO.lead} />

      <section className="sec-pad">
        <div className="container-o">
          <div className="hg3-open">
            <div className="hg3-head">
              <SplitWords
                as="h2"
                text={OPENING.heading}
                accent={OPENING.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.18}>
                <p className="hg3-lead">{OPENING.lead}</p>
              </FadeUp>
            </div>

            <div className="hg3-body">
              {OPENING.body.map((p, i) => (
                <FadeUp key={p.slice(0, 24)} delay={0.26 + i * 0.08}>
                  <p className="hg3-p">{p}</p>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* OCAK. Tek panel: solda beyan, sağda kare. FadeUp panelin
              TAMAMINI sarıyor, iki yarısını ayrı ayrı değil — bu adayın
              tezi ikisinin tek nesne olması. */}
          <FadeUp y={20}>
            <div className="hg3-hearth">
              <div className="hg3-say">
                {[
                  { s: OPENING.vision, Icon: Compass },
                  { s: OPENING.mission, Icon: Target },
                ].map(({ s, Icon }) => (
                  <div key={s.t}>
                    <h3 className="hg3-k">
                      <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                      {s.t}
                    </h3>
                    <p className="hg3-s">{s.s}</p>
                  </div>
                ))}
              </div>

              {/* <figure> + <figcaption>: künye karenin PARÇASI ve karenin
                  peşinden aşağı indi. Canlı dosyanın kuralı — künye
                  fotoğrafın nerede olduğunu takip eder, ikisi ayrı düşerse
                  ekranda künyesiz bir stok kare kalır.

                  priority YOK: bu adayda kare artık ekranın en üstünde
                  değil, katlamanın altında. LCP adayı hero'nun başlığı. */}
              <figure className="hg3-fig">
                <span className="hg3-ph">
                  <Image
                    src={TEAM_PHOTO}
                    alt=""
                    fill
                    sizes="(min-width: 981px) 54vw, 100vw"
                    className="hg3-img"
                    unoptimized
                  />
                </span>
              </figure>
            </div>
          </FadeUp>

        </div>
      </section>
    </>
  );
}
