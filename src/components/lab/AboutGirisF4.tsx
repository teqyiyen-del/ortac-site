import Image from "next/image";
import { Compass, Target } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { TEAM_PHOTO } from "@/lib/media";
import { HERO, OPENING } from "@/lib/about";

/* ADAY D · FİTİL — şeridin tamamı TEK NESNE · beyan gece kata iniyor ·
   vizyondan misyona ışık geçiyor.

   Müşterinin iki cümlesine birden cevap veriyor: "herodan vizyon misyon
   kısmının sonuna kadar olan yeri çok daha dikkat çekici ve etkileyici bir
   şeye dönüştürmek lazım" ve "vizyon misyon kısımları çok sönük kalmış".

   ELENEN LEVHA'NIN SAĞ KALAN YARISI. Aday A (Levha) fotoğrafın hero'da
   kalması varsayımıyla kurulmuştu ve o varsayım iptal oldu; ama levhanın
   KENDİSİ (beyaz kat + gece kat, tek gövde) o itirazdan bağımsızdı. Burada
   levhanın üst katına fotoğraf giriyor, yani aday sıfırdan değil elenenin
   ayakta kalan yarısından türedi.

   FİTİL. Gece kattaki iki beyan artık iki ayrı kutu değil, tek bir cümlenin
   iki ucu ve aralarında bir tel var. Aktarım kalıbı (css/aktarim.css) bu teli
   sırayla yakıyor: vizyon → tel → misyon. Hareket bir süs değil, bölümün
   söylediği şeyin kendisi — hedef ile onu yürüten iş arasındaki bağ.

   Metnin tamamı about.ts'ten. Yeni cümle yok. */
export default function AboutGirisF4() {
  return (
    <>
      {/* Hero canlıdaki geri alınmış hâliyle aynı: kompakt, fotoğrafsız.
          `art` verilmiyor, `country` verilmiyor. */}
      <PageHero crumb={HERO.crumb} title={HERO.title} accent={HERO.accent} lead={HERO.lead} />

      <section className="sec-pad">
        <div className="container-o">
          <div className="hg4-plate">
            <div className="hg4-top">
              <FadeUp className="hg4-figw" y={20}>
                <figure className="hg4-fig">
                  {/* alt="" ve DEKORATİF, künye <figure>'ın parçası —
                      canlı dosyadaki kalıbın aynısı. */}
                  <span className="hg4-ph">
                    <Image
                      src={TEAM_PHOTO}
                      alt=""
                      fill
                      sizes="(min-width: 981px) 44vw, 100vw"
                      className="hg4-img"
                      unoptimized
                    />
                  </span>
                  <figcaption className="hg4-cap">{HERO.photoNote}</figcaption>
                </figure>
              </FadeUp>

              <div className="hg4-body">
                <SplitWords
                  as="h2"
                  text={OPENING.heading}
                  accent={OPENING.accent}
                  className="h2"
                  style={{ color: "var(--text-900)" }}
                />
                <FadeUp delay={0.18}>
                  <p className="hg4-lead">{OPENING.lead}</p>
                </FadeUp>
                {OPENING.body.map((p, i) => (
                  <FadeUp key={p.slice(0, 24)} delay={0.26 + i * 0.08}>
                    <p className="hg4-p">{p}</p>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* GECE KAT. Levhanın içinde, bölümün zemininde DEĞİL: sayfanın
                zemin ritmi "iki bölüm arka arkaya aynı zemine gelmez" diyor ve
                bir alt bölüm (üç ülke) zaten gece. Beyaz kartın içinde gece
                panel sitenin kendi kalıbı (globals · .hx-card + .hx-stage).

                Üç ızgara sütunu: beyan | tel | beyan. Tel gerçek bir sütun,
                sözde öge değil — aktarımın orta durağı olması için DOM'da
                bulunması gerekiyor ve kalıp yeni öge eklemiyor, var olanı
                yakıyor. aria-hidden: ekran okuyucuda karşılığı yok.

                `akt` sınıfı yalnız fareyle duraklatma için (.akt:hover turu
                durduruyor) — mekanizma aktarim.css'te, buradan bir keyframe
                yazılmıyor, yalnızca değer veriliyor. */}
            <div className="hg4-stage akt">
              <FadeUp className="hg4-say" delay={0.12}>
                <span className="hg4-ic hg4-d0 akt-durak" aria-hidden="true">
                  <Compass size={20} strokeWidth={1.9} />
                </span>
                <h3 className="hg4-k">{OPENING.vision.t}</h3>
                <p className="hg4-s">{OPENING.vision.s}</p>
              </FadeUp>

              <span className="hg4-tel hg4-d1 akt-durak" aria-hidden="true" />

              <FadeUp className="hg4-say" delay={0.2}>
                <span className="hg4-ic hg4-d2 akt-durak" aria-hidden="true">
                  <Target size={20} strokeWidth={1.9} />
                </span>
                <h3 className="hg4-k">{OPENING.mission.t}</h3>
                <p className="hg4-s">{OPENING.mission.s}</p>
              </FadeUp>
            </div>
          </div>

          <FadeUp delay={0.3}>
            <p className="hg4-note">{OPENING.statementNote}</p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
