"use client";

import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight } from "lucide-react";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import HeroPortal from "@/components/home/HeroPortal";
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

   İki prop da isteğe bağlı; propsuz `<Hero />` çağrısı (ana sayfa) varsayılan
   sahneyi ve ortak şeridi basıyor, lab sayfası ise yalnızca sahneyi
   değiştiriyor.

   BU TURDA DEĞİŞEN VARSAYILAN SAHNE
   `scene ?? <HeroScene />` idi, `scene ?? <HeroPortal />` oldu. Müşterinin
   kararı birebir şuydu: "p5 i live alsana hero için." Yani /lab/hero-portal
   turunun P5 adayı ("Serbest Geçit" — içinden geçilen koridor) canlıya alındı
   (src/components/home/HeroPortal.tsx — sahnenin fikri ve lab kopyasından
   farkları o dosyanın başında). Bir önceki tur küreyi HeroScene ile
   ("Eşik", üç kapılı sokak cephesi) değiştirmişti.

   HeroScene SİLİNMEDİ ve ölü de değil: /lab/hero-portal'ın taban kartı artık
   onu AÇIKÇA basıyor (`<Hero scene={<HeroScene />} …>`), yani "canlıdan önce
   ne vardı" o sayfada görünmeye devam ediyor. Kural gereği çağrılmayan bileşen
   silinirdi; bu tur onu silmek yerine çağıran yerini görünür kıldı, çünkü lab
   sayfasının işi tam olarak adayları yan yana göstermek.

   `scene` propu KALDIRILMADI, çünkü karar geçici: "sonra diğer seçenekleri de
   sunarız". /lab/hero-dunya altı adayı ve /lab/hero-portal'ın altı kartı hâlâ
   `<Hero scene={<X />} partners={false} />` ile basıyor ve basmaya devam
   etmeli. HeroGlobe da silinmedi (src/components/HeroGlobe.tsx duruyor, artık
   hiçbir yerden çağrılmıyor): geri dönülmek istenirse tek satırlık bir import
   meselesi.

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
  /* Varsayılan sahnenin yerine basılacak sahne. Bileşen tipi değil ReactNode:
     lab sayfası sahneyi `<HeroGlobeG1 />` diye hazır element olarak veriyor,
     böylece ileride prop alan bir sahne de aynı yere girebilir. */
  scene?: React.ReactNode;
  /* Hero'nun altındaki ortak şeridi. Aynı sayfada üç hero yan yana dururken
     şeridi üç kez basmak sayfayı uzatıyor ve karşılaştırmayı bozuyor. */
  partners?: boolean;
};

export default function Hero({ scene, partners = true }: HeroProps) {
  /* .hgt-hero YALNIZCA VARSAYILAN SAHNE BASILIRKEN VAR.
     Portal sahnesinin çizgileri sahne kutusundan taşıp hero'nun metnine kadar
     çıkıyor, yani iki şey hero seviyesinde ayarlanmak zorunda: metnin yığın
     sırası (yoksa çizgiler yazının üstüne boyanır) ve ızgaranın opaklığı
     (yoksa kemerler ızgaranın içinde kaybolur). İkisi de css/hero-portal.css ·
     BÖLÜM 1'de ve ikisi de bu sınıfa bağlı.

     Sınıf `scene`'den TÜRETİLİYOR ve bu, dosyanın başındaki "partners neden
     scene'den türetilmiyor" notuyla çelişmiyor: partners "bu hero gerçek bir
     sayfanın başında mı" sorusunun cevabıydı, burada sorulan soru ise
     doğrudan "ekranda hangi sahne var". Cevabı zaten `scene`'in kendisi
     veriyor; ayrı bir prop aynı bilgiyi ikinci kez sormak ve iki yerin
     ayrışmasına izin vermek olurdu. Bir gün başka bir sahne de taşan çizgi
     isterse doğru çözüm bu satırı çoğaltmak değil, kuralı sahnenin kendi kök
     sınıfına (.hgt) bağlamaktır. */
  const cls = "hero4 hsc-hero" + (scene ? "" : " hgt-hero");

  return (
    <>
      <section className={cls}>
      {/* IZGARA + GLOW ZEMİNİ
          Müşteri: "heronun arkaplana da o grid glow şeyinden koysana ya."
          Kastettiği şey sitede iki yerde duruyor: footer'daki kapanış CTA'sı
          (.ft2-cta-grid/.ft2-cta-glow, orijinali) ve bu turda alt sayfa
          hero'ları için kalibre edilip beğenilen .phg- sürümü. Buradaki üçüncü
          kalibrasyon; hangi sayıların neden ayrıldığı hero-scene.css'te.

          Sınıf .hsc-hero bölümün üstünde: değişkenler ve yığın sırası kendi ad
          alanımızda kalsın, globals.css'teki .hero4 kuralına dokunmayalım.

          Zemin ana sayfaya değil HERO'nun kendisine bağlı, yani /lab/hero-dunya
          da onu görüyor. Kasıtlı: o sayfanın tek iddiası "çerçeve taklit değil,
          canlı hero'nun kendisi" — canlıda hero'nun zemini değiştiyse adaylar
          da o zeminin üstünde değerlendirilmeli. Izgara zaten sahnenin
          başladığı yerin üstünde sıfırlanıyor, yani hiçbir adayın sahnesine
          girmiyor. */}
      <div className="hsc-bg" aria-hidden="true">
        <div className="hsc-bg-grid" />
        <div className="hsc-bg-glow" />
      </div>

      <div className="container-o hero4-top">
        <SplitWords
          as="h1"
          text="Şirketinizi kurup tüm süreçlerinizi yönetiyoruz."
          accent="tüm süreçlerinizi yönetiyoruz."
          base={0.12}
          className="hero4-h1"
          style={{ color: "#ffffff" }}
        />

        <FadeUp delay={0.3}>
          <p className="hero4-sub">
            Dubai, İngiltere ve KKTC&apos;de kuruluş, banka, tahsilat ve muhasebe.
            <br />
            {/* Eskiden "Dubai'deki kendi ofisimizden" yazıyordu. İki sebeple
                değişti: (1) olgu yanlıştı — üç ülkede de kendi ofisimiz var,
                (2) ana sayfa nötr alan, bir ülkeyi öne çıkarmıyor. Aynı kural
                CTA'ya da uygulandı (Footer.tsx · FT2_POINTS). */}
            Üç ülkede de kendi ofisimizden, Türkçe yürütülür.
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
        {scene ?? <HeroPortal />}
      </FadeUp>

      </section>

      {/* below the fold on purpose: the first screen is the promise, and the
          names we work with are the first thing you meet on the way down */}
      {partners && <HeroPartners />}
    </>
  );
}
