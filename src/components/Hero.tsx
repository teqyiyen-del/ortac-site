"use client";

import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight } from "lucide-react";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import HeroGlobe from "@/components/HeroGlobe";
import HeroPartners from "@/components/home/HeroPartners";
import { gtm } from "@/lib/gtm";

/* §1 — composition is fixed by the brief: centred block, big H1, two lines of
   sub, two buttons, three flags, dotted globe below. Copy is fixed too. */

/* ---------------------------------------------------------------------------
   NEDEN BU İKİ PROP VAR

   Müşteri küreye alternatif sahneleri "çıplak" değil, hero'nun tamamının
   içinde görmek istedi: başlık, alt satır, butonlar, bayraklar hepsi yerinde
   dururken sahne değişsin. /lab/hero-dunya'da hero'nun bir kopyasını çıkarmak
   ise en kötü seçenekti — kopya ilk gün birebir, üçüncü gün yalan olur; müşteri
   o zaman gerçek hero'yu değil, hero'nun taklidini değerlendirmeye başlar.
   Bu yüzden lab sayfası GERÇEK Hero'yu çağırıyor, yalnızca sahneyi değiştiriyor.

   İki prop da isteğe bağlı ve varsayılanları bugünkü davranışı birebir
   koruyor: propsuz `<Hero />` çağrısı (ana sayfa) `scene ?? <HeroGlobe />` ve
   `partners = true` yoluyla değişmeden önceki ağacın aynısını üretiyor. Yani
   ana sayfa için bu dosyada değişen tek şey yok; eklenen şey bir kanca.

   partners neden `scene`'den TÜRETİLMİYOR (yani "sahne verildiyse şeridi atla"
   demiyoruz): ikisi ayrı soruların cevabı. `scene` "dünya nasıl çizilsin"
   sorusuna, `partners` "bu hero gerçek bir sayfanın başında mı duruyor"
   sorusuna bakıyor. Bugün lab sayfasında ikisi tesadüfen aynı yöne bakıyor,
   ama bu bir kural değil: yarın bir ülke sayfası kendi sahnesiyle TAM hero
   basmak isterse, türetilmiş bir kural şeridi sessizce düşürürdü — ve sessizce
   kaybolan bir bölüm, hata olarak fark edilmesi en zor şeydir. Açık bayrak
   çağrı yerinde niyeti de okunur kılıyor: `<Hero scene={...} partners={false} />`.

   Denenip elenen üçüncü yol: HeroPartners'ı Hero'dan çıkarıp page.tsx'e almak.
   Mimari olarak en temizi bu, çünkü şerit aslında hero'nun değil sayfanın
   parçası. İki nedenle yapılmadı — page.tsx bu turda dokunulmaz durumda ve
   şeridi taşımak ana sayfanın bileşen ağacını gerçekten değiştirirdi; oysa
   buradaki işin tek şartı ana sayfanın kıpırdamaması. */
type HeroProps = {
  /* Küre yerine basılacak sahne. Verilmezse canlıdaki HeroGlobe. Bileşen tipi
     değil ReactNode: lab sayfası sahneyi `<HeroGlobeG1 />` diye hazır element
     olarak veriyor, böylece ileride prop alan bir sahne de aynı yere girebilir. */
  scene?: React.ReactNode;
  /* Hero'nun altındaki ortak şeridi. Aynı sayfada üç hero yan yana dururken
     şeridi üç kez basmak sayfayı uzatıyor ve karşılaştırmayı bozuyor. */
  partners?: boolean;
};

export default function Hero({ scene, partners = true }: HeroProps) {
  return (
    <>
      <section className="hero4">
      <div className="container-o hero4-top">
        <SplitWords
          as="h1"
          text="Şirketinizi kurun, sonrasını da biz yürütelim."
          accent="sonrasını da biz yürütelim."
          base={0.12}
          className="hero4-h1"
          style={{ color: "#ffffff" }}
        />

        <FadeUp delay={0.3}>
          <p className="hero4-sub">
            Dubai, İngiltere ve KKTC&apos;de kuruluş, banka, tahsilat ve muhasebe.
            <br />
            Dubai&apos;deki kendi ofisimizden, Türkçe yürütülür.
          </p>
        </FadeUp>

        <FadeUp delay={0.38}>
          <div className="hero4-cta">
            <SmartLink href="/basla" className="btn btn-primary" onClick={() => gtm("hero_cta_click")}>
              Kurulumu Başlat
              <ArrowRight size={15} strokeWidth={2.1} />
            </SmartLink>
            <SmartLink
              href="/iletisim"
              className="btn btn-ghost"
              onClick={() => gtm("cta_meeting_click", { placement: "hero" })}
            >
              Ücretsiz danışmanlık
            </SmartLink>
          </div>
        </FadeUp>
      </div>

      {/* Sahne aynı FadeUp'ın içinde kalıyor: giriş gecikmesi (0.46) başlık,
          alt satır ve butonlardan sonra gelen sıranın son adımı, yani sahnenin
          kim olduğu değişse de hero'nun açılış ritmi değişmiyor. */}
      <FadeUp delay={0.46} className="hero4-globe">
        {scene ?? <HeroGlobe />}
      </FadeUp>

      </section>

      {/* below the fold on purpose: the first screen is the promise, and the
          names we work with are the first thing you meet on the way down */}
      {partners && <HeroPartners />}
    </>
  );
}
