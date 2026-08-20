import Image from "next/image";
import { ChevronRight, Compass, Target } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { HERO, OPENING } from "@/lib/about";
import { TEAM_PHOTO } from "@/lib/media";

/* ADAY · YASLI — /hakkimizda giriş şeridi. Biçim: src/app/css/lab-hkapak-b.css

   ------------------------------------------------------------------ NEDEN
   Bu şerit üç tur üst üste reddedildi ve müşterinin son mesajı üç somut
   yasak + bir istek taşıyordu: görsel büyük ve yuvarlak köşeli olacak,
   opaklıkla geçişli OLMAYACAK, arka plan OLMAYACAK, "kim olduğumuz" metni
   ikiye bölünüp bir kısmı sola bir kısmı sağa dağıtılMAYACAK; vizyon ve
   misyona mavi girecek. Aday bu dördünü aynı anda çözmek için tek bir fikre
   bağlandı: HER ŞEY BİR KENARA YASLI.

     · fotoğraf sağ kenara yaslı  — sağ kenarı düz, öteki üç köşesi yuvarlak
     · mavi levha sol kenara yaslı — sol kenarı düz, sağ köşeleri yuvarlak
     · metin ikisinin de yanında TEK SÜTUN

   Kutu yok: çerçeve, gölge, kart zemini, künye satırı yok. Müşterinin
   "görseli box içinden çıkarsan" cümlesinin karşılığı bu — kare bir kabın
   içinde durmuyor, kabın kendisi olmuş durumda.

   ---------------------------------------------------- ÜÇ YASAK, ÜÇ KARŞILIK
   1) OPAKLIK YOK. Fotoğrafın üstünde maske, sönen gradyan, yarı saydam perde
      ya da giriş fade'i YOK — kare ilk karede net. Öteki adaylarda duran
      grayscale(.22) filtresi de kaldırıldı. Tek hareketi 41 saniyelik %2,4'lük
      bir `transform: scale`, yani netliğe dokunmuyor. FadeUp bilerek yalnız
      metinleri sarıyor: fotoğrafı sarsaydı sayfa açılırken kare bir opaklık
      geçişiyle gelirdi ve müşterinin reddettiği şey tam olarak buydu.
   2) ARKA PLAN DEĞİL. Kare kendi ızgara hücresinde duran bir nesne; üstünde
      tek bir metin yok. Gece hero'nun son şeridine 96px giriyor ama bu bir
      zemin değil, bir yaslanma — kare hero'nun ÖNÜNDE.
   3) METİN BÖLÜNMÜYOR. "Kim olduğumuz" başlığı, tanıtım cümlesi ve iki
      paragraf tek kolonda alt alta akıyor. İki sütuna bölünmüş gövde metni bu
      turun reddedilme sebebiydi ve tekrarlanmadı.

   ---------------------------------------------------------- VİZYON / MİSYON
   İkisi bugün düz gece zeminde duruyor; burada mavi bir YÜZEYE taşındı ve
   yüzey fotoğrafın TERSİ kenara yaslandı. Zemin --blue-900 (#1b56a8), beyaz
   metinle 7,14:1. --blue-700 zemin olarak kullanılmadı: beyazla 3,99:1 ve
   küçük punto eşiğinin altında (ölçüm tablosu CSS dosyasının başında).
   İki metnin tek harfi değişmedi; firmanın kendi resmî ifadesi.

   ------------------------------------------------- HERO'DA FOTOĞRAF YOK
   Kare hero'ya değil, hemen altındaki bölüme ait: "hero da fotoğraf" daha
   önce denendi ve reddedildi. Hero yalnız soruyu soruyor, kare cevabın
   yanında duruyor. Ekrana künye de basılmıyor — "Fotoğraf temsilî…" cümlesi
   müşteri isteğiyle siteden silindi, geri getirilmedi.

   -------------------------------------------------------- BASILMAYAN ALAN
   about.ts'ten okunan her alan ekranda: HERO.crumb/title/accent/lead,
   OPENING.heading/accent/lead/body, OPENING.vision, OPENING.mission.
   Yeni cümle uydurulmadı; ekrana giren tek metin bu dosyada değil about.ts'te. */

const AIMS = [
  { s: OPENING.vision, Icon: Compass, buyuk: true },
  { s: OPENING.mission, Icon: Target, buyuk: false },
];

export default function AboutKapakYasli() {
  return (
    <>
      {/* ================= 1 · HERO =================
          Zemin PageHero'nun kompakt dalı (.phg + .phg-bg). `.ph` sınıfı
          bilerek basılmıyor: globals.css'teki `.ph { padding }` @import'lardan
          sonra geldiği için aynı özgüllükteki dolguyu yenerdi. Üst dolgu yine
          de .ph ile aynı tutuldu (132 / 156), çünkü .phg glow kalibrasyonu
          ölçülen h1 üst kenarına bağlı. */}
      <section className="hkb-hero phg">
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
            className="hkb-h1"
          />

          <FadeUp delay={0.24}>
            <p className="hkb-lead">{HERO.lead}</p>
          </FadeUp>
        </div>
      </section>

      {/* ================= 2 · KİM OLDUĞUMUZ =================
          Izgara üç sütun: sayfanın kenar boşluğu · metin · fotoğraf. Fotoğraf
          hücresi ekranın sağ kenarında bitiyor, yani kare kabın dışına değil
          KABIN KENDİSİNE taşıyor — negatif yatay margin yok, yatay taşma da
          yok (gerekçe ve ölçüm CSS dosyasının başında).

          FOTOĞRAF DOM'DA ÖNCE: telefonda tek sütuna düşünce kare hero'nun
          hemen altında, metnin üstünde olsun diye. Masaüstünde iki hücrenin
          de sütunu ve satırı açıkça yazılı, yani DOM sırası yerleşimi
          değiştirmiyor. Kare alt="" ile dekoratif; ekran okuyucuda sıra
          bozulmuyor. */}
      <section className="hkb-open">
        <div className="hkb-open-in">
          {/* <figure> DEĞİL düz kap: künye yazılmıyor ve künyesiz bir figure
              erişilebilirlik ağacında adsız bir grup bırakırdı.
              unoptimized: next.config.ts'te remotePatterns yok, sitedeki
              bütün uzak görseller böyle basılıyor. */}
          <div className="hkb-shot">
            <Image
              src={TEAM_PHOTO}
              alt=""
              fill
              sizes="(min-width: 1600px) 800px, (min-width: 900px) 55vw, 96vw"
              className="hkb-img"
              unoptimized
            />
          </div>

          {/* TEK AKIŞ: başlık, tanıtım cümlesi, iki paragraf. Hiçbiri öteki
              sütuna geçmiyor. */}
          <div className="hkb-copy">
            <SplitWords
              as="h2"
              text={OPENING.heading}
              accent={OPENING.accent}
              className="hkb-h2"
            />

            <FadeUp delay={0.1}>
              <p className="hkb-sub">{OPENING.lead}</p>
            </FadeUp>

            {/* İki paragraf TEK FadeUp'ta: ayrı ayrı yükselselerdi metin iki
                bloğa ayrılmış gibi okunurdu, oysa iddia tek akış olması. */}
            <FadeUp delay={0.18}>
              <div className="hkb-body">
                {OPENING.body.map((p) => (
                  <p key={p.slice(0, 24)} className="hkb-p">
                    {p}
                  </p>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ================= 3 · VİZYON VE MİSYON =================
          Izgara iki sütun: levha · sayfanın sağ kenar boşluğu. İkinci sütun
          bilerek boş, levhanın nerede biteceğini o söylüyor. Levha sol
          kenarda düz, sağ köşeleri yuvarlak — fotoğrafın aynadaki hâli. */}
      <section className="hkb-vm">
        <div className="hkb-vm-in">
          <div className="hkb-panel">
            <span className="hkb-wash" aria-hidden="true" />

            <div className="hkb-vm-list">
              {AIMS.map(({ s, Icon, buyuk }, i) => (
                <FadeUp key={s.t} delay={0.1 + i * 0.1}>
                  <article className={buyuk ? "hkb-vm-item hkb-vm-lead" : "hkb-vm-item"}>
                    <div className="hkb-vm-head">
                      <span className="hkb-ic" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                      <h3 className="hkb-vm-t">{s.t}</h3>
                    </div>
                    <p className="hkb-vm-s">{s.s}</p>
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
