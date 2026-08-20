import Image from "next/image";
import { ChevronRight } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { HERO, OPENING } from "@/lib/about";
import { TEAM_PHOTO } from "@/lib/media";

/* ADAY · KARE — İkili'den türedi. Biçim: src/app/css/lab-hikili-a.css · .hia-

   İKİLİ'NİN FİKRİ AYNEN DURUYOR: solda firma bugün ne yapıyor (şimdiki zaman),
   sağda ne hedefliyor (mastar). Fark görsel değil dilsel; panel hâlâ tek nesne
   ve hâlâ gece hero'nun üstüne biniyor, yani cevap sorunun içinden çıkıyor.

   BU TÜREVİN EKLEDİĞİ TEK ŞEY GÖRSEL: kare, SOL sütunun içinde ve metnin
   parçası. Panelin sol kenarına yaslanıyor, geniş ekranda metin çevresinden
   akıyor. SAĞ sütunda kare yok: gelecek zamanın fotoğrafı olmaz, oranın
   görseli tipografinin kendisi (vizyon büyük punto, misyon gövde puntosu).
   Asimetri fikrin kendisi: bugünün kanıtı var, yarının sözü var.

   İKİLİ'DEN DÜŞEN TEK ŞEY DİKİŞ (.hzb-seam). Orada panelin ortasındaki ışıklı
   çizgi kompozisyonun tek olayıydı; burada ağırlık sola, karenin olduğu tarafa
   kaydı ve tam ortadan geçen simetrik bir çizgi o dengeyi geri düzleştirirdi.
   İki sesin sınırını zeminler zaten söylüyor (beyaz kâğıt / gece panel).

   ------------------------------------------- EKRANA BASILMAYAN İKİ ALAN
   OPENING.heading ("Kim olduğumuz") ve OPENING.lead ("Üç ülkede çalışan tek
   bir ekip.") basılmıyor; ikisi de about.ts'te yerinde duruyor. Gerekçe İkili
   ile aynı DEĞİL — o adayın yazdığı gerekçe (lead'in not tonu) bayat, çünkü
   lead o günden sonra tek cümleye indi. Bugünkü gerekçe sayım:
   · heading: hero'nun h1'i zaten "Ortac Global kimdir?"; sorunun cevabını
     artık iki sütun başlığı veriyor, araya üçüncü bir ilan girmiyor.
   · lead: taşıdığı tek olgu ("üç ülkede çalışan tek bir ekip") bu şeritte
     ZATEN İKİ KEZ geçiyor — HERO.lead'de ülke adlarıyla ("KKTC, İngiltere ve
     Dubai") ve OPENING.body[0]'da cümle içinde ("aynı ekiple ve Türkçe").
     Üçüncüsü bilgi eklemez, aynı cümleyi üçüncü kez söylerdi. */

/* İkili'nin ekran metinleri, kelimesi kelimesine aynı: aday değişti, fikir
   değişmedi. Aday seçilirse about.ts'e taşınırlar. */
const HINGE = "Sorunun cevabı iki parça: bugün yaptığımız iş, bundan sonrası için hedefimiz.";

const SESLER = {
  simdi: { when: "Bugün", head: "Ne yapıyoruz", accent: "yapıyoruz" },
  sonra: { when: "Bundan sonra", head: "Neyi hedefliyoruz", accent: "hedefliyoruz" },
} as const;

/* `buyuk` bir biçim kararı: vizyon display puntosunda, misyon gövde
   puntosunda. Gerekçe CSS'te (.hia-aim-s / .hia-aim-lead). Metinlerin tek
   harfi değişmedi ve değişmez — firmanın kendi resmî ifadesi. */
const AIMS = [
  { aim: OPENING.vision, buyuk: true },
  { aim: OPENING.mission, buyuk: false },
];

export default function AboutIkiliKare() {
  return (
    <>
      {/* ================= HERO =================
          İkili'nin hero'su, birebir: zemin PageHero'nun kompakt dalı
          (.phg + .phg-bg), .ph sınıfı bilerek basılmıyor (globals.css'teki
          `.ph { padding }` @import'lardan sonra geldiği için aynı
          özgüllükteki dolguyu yenerdi), üst dolgu .ph ile aynı tutuldu
          (132 / 156) çünkü .phg glow kalibrasyonu h1'in üst kenarına bağlı.

          HERO'DA FOTOĞRAF YOK: müşteri hakkımızda hero'sunda görseli
          reddetti ("kim olduğumuz kısmına geri çekelim"). Kare o yüzden
          aşağıda, sol sütunun içinde. */}
      <section className="hia-hero phg">
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
            className="hia-h1"
          />

          <FadeUp delay={0.24}>
            <p className="hia-lead">{HERO.lead}</p>
          </FadeUp>
          <FadeUp delay={0.32}>
            <p className="hia-hinge">{HINGE}</p>
          </FadeUp>
        </div>
      </section>

      {/* ================= İKİLİ PANEL ================= */}
      <div className="hia-wrap">
        <div className="container-o">
          {/* Tek FadeUp: panel tek nesne, iki yarısı ayrı ayrı yükselseydi
              yeniden iki blok olurdu. */}
          <FadeUp y={26}>
            <div className="hia-pair">
              {/* ---- SOL SES · şimdiki zaman + kare ---- */}
              <div className="hia-col hia-now">
                <p className="hia-when">{SESLER.simdi.when}</p>
                <SplitWords
                  as="h2"
                  text={SESLER.simdi.head}
                  accent={SESLER.simdi.accent}
                  className="hia-k"
                />

                {/* KARE VE PARAGRAFLAR TEK FadeUp'TA, tek blok içinde.
                    İkisi birden teknik ve fikirsel: (1) kare `float` ile
                    basılıyor ve float ancak KENDİ blok kabındaki satırları
                    kısaltır — paragraflar ayrı motion.div'lerde olsaydı
                    metin karenin çevresinden akmazdı; (2) bu adayın iddiası
                    karenin metnin parçası olması, ayrı yükselseler yine iki
                    ayrı nesne olurlardı. */}
                <FadeUp delay={0.14}>
                  <div className="hia-body">
                    {/* <figure> DEĞİL düz kap: künye yazılmıyor (müşteri
                        "Fotoğraf temsilî…" satırını sildirdi), künyesiz bir
                        figure erişilebilirlik ağacında adsız bir grup
                        bırakırdı. Kare alt="" ile dekoratif.
                        unoptimized: next.config.ts'te remotePatterns yok,
                        sitedeki bütün uzak görseller böyle basılıyor. */}
                    <span className="hia-kare">
                      <Image
                        src={TEAM_PHOTO}
                        alt=""
                        fill
                        sizes="(min-width: 1200px) 208px, (min-width: 980px) 46vw, 92vw"
                        className="hia-img"
                        unoptimized
                      />
                    </span>

                    {OPENING.body.map((p) => (
                      <p key={p.slice(0, 24)} className="hia-p">
                        {p}
                      </p>
                    ))}
                  </div>
                </FadeUp>
              </div>

              {/* ---- SAĞ SES · hedef, görseli tipografi ----
                  İkili'deki pusula/hedef ikonları BU ADAYDA YOK. Sol sütunda
                  gerçek bir kare varken sağda iki küçük ikon "biz de görsel
                  koyduk" diye okunurdu; bu sütunun tezi görselin tipografinin
                  kendisi olması. */}
              <div className="hia-col hia-next">
                <p className="hia-when hia-when-d">{SESLER.sonra.when}</p>
                <SplitWords
                  as="h2"
                  text={SESLER.sonra.head}
                  accent={SESLER.sonra.accent}
                  accentColor="var(--blue-500)"
                  className="hia-k hia-k-d"
                />

                <div className="hia-aims">
                  {AIMS.map(({ aim, buyuk }, i) => (
                    <FadeUp key={aim.t} delay={0.16 + i * 0.08}>
                      <article className="hia-aim">
                        {/* Kenar rayı: kitap sayfasının kenar çizgisi.
                            İçindeki ışık aşağı iniyor ve dibe VARMADAN
                            sönüyor — İkili'nin "hedef bir yön, varılmış bir
                            yer değil" hareketi, burada dikey. Dekoratif. */}
                        <span className="hia-rule" aria-hidden="true">
                          <span className="hia-glide" />
                        </span>
                        <h3 className="hia-aim-t">{aim.t}</h3>
                        <p className={buyuk ? "hia-aim-s hia-aim-lead" : "hia-aim-s"}>
                          {aim.s}
                        </p>
                      </article>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </>
  );
}
