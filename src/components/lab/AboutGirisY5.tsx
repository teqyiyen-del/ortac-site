import Image from "next/image";
import { Compass, Target } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { TEAM_PHOTO } from "@/lib/media";
import { HERO, OPENING } from "@/lib/about";

/* ADAY E · YAPRAK — dört malzeme arka arkaya · fotoğraf GENİŞ ŞERİT ·
   vizyon ve misyon sayfanın kendi MAVİ KÂĞIDINDA.

   Fitil'in (Aday D) tersi tez: şerit tek nesneye inmiyor, tam tersine her
   adımı ayrı bir MALZEME oluyor. Bugün şerit üç adımın üçünde de aynı beyaz
   kâğıtta akıyor ve müşterinin "sönük" dediği şeyin yarısı bu — göz üç ayrı
   şey değil tek bir uzun sayfa görüyor. Sıra şöyle oluyor:

     gece (hero) → fotoğraf şeridi → beyaz kâğıt (metin) → mavi kâğıt (beyan)

   MAVİ KÂĞIT UYDURULMADI. Sayfanın 3. bölümü (Murat Ortaç alıntısı) zaten bu
   kâğıtta duruyor ve oraya konma sebebi birebir aynı: "sayfanın tek insan
   sesi gri bir zeminde kayboluyordu" (hakkimizda.css · 3 · ALINTI). Vizyon ve
   misyon da firmanın kendi sesi, bizim yazdığımız pazarlama cümlesi değil —
   OPENING.statementNote bunu zaten söylüyor. Aynı iddia, aynı malzeme.

   PUNTO ALINTIDAN BİR KADEME KÜÇÜK ve bu bilerek: alıntı sayfanın en yüksek
   sesi olarak kalmalı, beyan onun altında ikinci ses. Ölçüler CSS'te.

   ŞERİT NEDEN GENİŞ: kare bugün bölümün yarısında, yani hero'nun altındaki
   ilk büyük leke tam genişliğin yarısı kadar. 16/5 şerit sayfanın kendi
   ölçüsü — ülke kartlarındaki fotoğraf şeritleri (.ab-cn-ph) aynı oranda.
   Yeni bir görsel dil değil, var olanın büyütülmüş hâli.

   Metnin tamamı about.ts'ten. Yeni cümle yok. */
export default function AboutGirisY5() {
  return (
    <>
      <PageHero crumb={HERO.crumb} title={HERO.title} accent={HERO.accent} lead={HERO.lead} />

      <section className="hg5-sec">
        <div className="container-o">
          {/* Bölüm görselle açılıyor — müşterinin ilk kuralı ("bir kısım olsun
              ve görselle açılsın") burada en geniş hâliyle karşılanıyor:
              başlıktan bile önce, tam genişlikte. */}
          <FadeUp className="hg5-figw" y={20}>
            <figure className="hg5-fig">
              <span className="hg5-ph">
                <Image
                  src={TEAM_PHOTO}
                  alt=""
                  fill
                  sizes="(min-width: 981px) 92vw, 100vw"
                  className="hg5-img"
                  unoptimized
                />
              </span>
              <figcaption className="hg5-cap">{HERO.photoNote}</figcaption>
            </figure>
          </FadeUp>

          <div className="hg5-open">
            <div className="hg5-head">
              <SplitWords
                as="h2"
                text={OPENING.heading}
                accent={OPENING.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.18}>
                <p className="hg5-lead">{OPENING.lead}</p>
              </FadeUp>
            </div>

            <div className="hg5-body">
              {OPENING.body.map((p, i) => (
                <FadeUp key={p.slice(0, 24)} delay={0.26 + i * 0.08}>
                  <p className="hg5-p">{p}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAVİ KÂĞIT. Bölümün İÇİNDE değil, kendi bandında ve tam genişlikte:
          kâğıdın kenardan kenara gitmesi onu bir kart değil bir YÜZEY yapıyor,
          alıntı bandında da böyle. */}
      <div className="hg5-paper">
        <div className="container-o">
          {/* FadeUp'ın <div>'i ızgara hücresi oluyor; ayrı bir sarmalayıcı
              eklenmiyor — dolgu ve iki beyanı ayıran tel doğrudan o hücreye
              yazılı (.hg5-say > * + *). */}
          <div className="hg5-say">
            {[
              { s: OPENING.vision, Icon: Compass },
              { s: OPENING.mission, Icon: Target },
            ].map(({ s, Icon }, i) => (
              <FadeUp key={s.t} delay={0.1 + i * 0.08}>
                <h3 className="hg5-k">
                  <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                  {s.t}
                </h3>
                <p className="hg5-s">{s.s}</p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.28}>
            <p className="hg5-note">{OPENING.statementNote}</p>
          </FadeUp>
        </div>
      </div>
    </>
  );
}
