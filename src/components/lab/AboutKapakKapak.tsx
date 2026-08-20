import Image from "next/image";
import { ChevronRight, Compass, Target } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { HERO, OPENING } from "@/lib/about";
import { TEAM_PHOTO } from "@/lib/media";

/* ADAY · KAPAK — /hakkimizda giriş şeridi. Biçim: src/app/css/lab-hkapak-a.css · .hka-

   Müşterinin bu turdaki dört düzeltmesinin birebir karşılığı:

   1) GÖRSEL KUTUNUN İÇİNDEN ÇIKTI. Şerit artık bir kart değil. Fotoğraf
      metin kabından (container-o, 1200) DAHA GENİŞ bir kapta duruyor
      (.hka-plate, 1320), yani gövde metninin iki yanından taşıyor — "box
      içinden çıkarma" isteği tam olarak bu: kutu daralttıkça görsel
      büyümüyor, görsel kutunun sınırını aşıyor.
   2) GÖRSELDE HİÇBİR OPAKLIK OYUNU YOK. Maske yok, sönen gradyan yok, yarı
      saydam perde yok, grayscale yok, hover geçişi yok, animasyon yok.
      .hka-img üzerinde `filter` ve `opacity` bildirimi HİÇ YAZILMADI ve
      yazılmamalı. Önceki adaylar (Kare · Zemin) burada eleniyordu.
   3) GÖRSEL ZEMİN DEĞİL. Metnin arkasında değil, metnin ÜSTÜNDE ve kendi
      yerinde duran bir nesne; altındaki hiçbir şey onun üstüne binmiyor,
      hero'nun içine de girmiyor (bir tur önce "hero'da fotoğraf" reddedildi).
   4) GÖVDE METNİ TEK AKIŞ. OPENING.body tek sütunda, tek ölçüde (66ch)
      aşağı iniyor. Sola-sağa dağıtılmış iki sütun bu turda reddedilen şeydi;
      burada ızgara hiç yok, paragraflar arka arkaya.

   SIRA: hero cümlesi → büyük görsel → "Kim olduğumuz" → vizyon ve misyon.

   VİZYON/MİSYON MAVİ: şeridin son bandı --blue-100 zemin. Kutu yok — bu
   şeritte hiçbir şey kutuda değil, o yüzden vizyon ve misyon da kart içine
   girmiyor; bandın kendisi tek şekil. Ölçülen kontrastlar CSS'te.

   METİN UYDURULMADI: ekrandaki her cümle about.ts'ten (HERO.title, HERO.lead,
   OPENING.heading, OPENING.lead, OPENING.body, OPENING.vision, OPENING.mission).
   Vizyon ve misyon firmanın kendi resmî ifadesi, tek harfi değişmedi ve
   altlarına "resmî ifadesi" şerhi YAZILMADI (müşteri o cümleyi sildirdi).
   Fotoğrafın altında künye de yok, aynı sebeple. */

/* İkonlar burada, about.ts'te değil: o dosya React'ten bağımsız tutuluyor
   (gerekçesi about.ts'in başında). Pusula = yön, hedef tahtası = varılacak
   nokta; ikisi de vizyon/misyon ayrımının kendi anlamı, süs değil. */
const AIMS = [
  { Icon: Compass, ...OPENING.vision },
  { Icon: Target, ...OPENING.mission },
];

export default function AboutKapakKapak() {
  return (
    <>
      {/* ================= HERO · yalnız cümle =================
          Zemin PageHero'nun kompakt dalı (.phg + .phg-bg). `.ph` sınıfı
          bilerek basılmıyor: globals.css'teki `.ph { padding }` @import'lardan
          SONRA geldiği için aynı özgüllükteki dolgumuzu yenerdi. Üst dolgu
          yine de .ph ile aynı tutuldu (132 / 156), çünkü .phg glow'u ölçülen
          h1 üst kenarına kalibre (pagehero-grid.css · 2. kural).

          HERO'DA GÖRSEL YOK ve olmayacak: müşteri hero'daki fotoğrafı bir tur
          önce reddetti. Fotoğraf hero'nun ALTINDA, kendi bandında. */}
      <section className="hka-hero phg">
        <div className="phg-bg" aria-hidden="true">
          <div className="phg-grid" />
          <div className="phg-glow" />
        </div>

        <div className="container-o">
          <nav className="ph-crumb" aria-label="Konum">
            <SmartLink href="/">Ana sayfa</SmartLink>
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
            <span>{HERO.crumb}</span>
          </nav>

          <SplitWords
            as="h1"
            text={HERO.title}
            accent={HERO.accent}
            accentColor="var(--blue-500)"
            base={0.08}
            className="hka-h1"
          />

          <FadeUp delay={0.24}>
            <p className="hka-lead">{HERO.lead}</p>
          </FadeUp>
        </div>
      </section>

      {/* ================= KAPAK + TEK AKIŞ =================
          Fotoğraf ve metin AYNI bölümün içinde: fotoğraf "Kim olduğumuz"un
          kapağı, ayrı bir galeri bandı değil. Ama kapları farklı genişlikte,
          adayın bütün fikri o farkta. */}
      <section className="hka-cover">
        {/* Tek FadeUp ve doğrudan .hka-plate üzerinde: araya sarmalayıcı bir
            div girseydi geniş kap ile metin kabı arasında ölçüsü olmayan
            üçüncü bir kutu kalırdı. */}
        <FadeUp y={30} className="hka-plate">
          {/* <figure> DEĞİL düz kap: künye yazılmıyor ve künyesiz bir figure
              erişilebilirlik ağacında adsız bir grup bırakır.
              alt="" — kare DEKORATİF ve hâlâ bir stok yer tutucusu
              (media.ts · SWAP:TEAM_PHOTO); "işte ekibimiz" diye okunmamalı.
              unoptimized: next.config.ts'te remotePatterns yok, sitedeki
              bütün uzak görseller böyle basılıyor. */}
          <div className="hka-shot">
            <Image
              src={TEAM_PHOTO}
              alt=""
              fill
              sizes="(min-width: 1352px) 1256px, (min-width: 1024px) calc(100vw - 64px), calc(100vw - 40px)"
              className="hka-img"
              unoptimized
            />
          </div>
        </FadeUp>

        <div className="container-o hka-read">
          <SplitWords as="h2" text={OPENING.heading} accent={OPENING.accent} className="hka-k" />

          {/* Başlığın altındaki hairline: şeridin tek sürekli hareketi burada
              ve dekoratif (aria-hidden). Kapı ve periyot CSS'te. */}
          <span className="hka-rule" aria-hidden="true">
            <span className="hka-spark" />
          </span>

          <FadeUp delay={0.1}>
            <p className="hka-sub">{OPENING.lead}</p>
          </FadeUp>

          {/* TEK FadeUp, TEK KAP: paragraflar ayrı ayrı yükselseydi yine
              "parça parça" bir metin olurlardı. Müşterinin istediği şey
              gövdenin tek bir akış olması. */}
          <FadeUp delay={0.16}>
            <div className="hka-flow">
              {OPENING.body.map((p) => (
                <p key={p.slice(0, 24)} className="hka-p">
                  {p}
                </p>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ================= VİZYON · MİSYON · MAVİ BANT ================= */}
      <section className="hka-aims">
        <div className="container-o">
          <div className="hka-grid">
            {AIMS.map(({ Icon, t, s }, i) => (
              <FadeUp key={t} delay={i * 0.08}>
                <article className="hka-aim">
                  <span className="hka-mark" aria-hidden="true">
                    <span className="hka-beam" />
                    <Icon size={22} strokeWidth={1.9} />
                  </span>
                  <h3 className="hka-aim-t">{t}</h3>
                  <p className="hka-aim-s">{s}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
