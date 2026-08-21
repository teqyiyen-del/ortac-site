import Image from "next/image";
import { Compass, Target } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { HERO, OPENING } from "@/lib/about";
import { TEAM_PHOTO } from "@/lib/media";

/* ADAY · BÖLÜM — /hakkimizda giriş şeridi. Biçim: src/app/css/lab-hserit4-d.css · .hnd-

   FİKİR: şerit tek bir blok değil, sayfanın KENDİ bölüm ritmi. Üç bölüm art
   arda geliyor ve zemin sırası sayfanın kendi sırası:

     gece  (hero · .ph, background var(--night) — sitedeki on dört sayfanın
            girişi bu zeminde)
     beyaz ("Kim olduğumuz" · sec-pad)
     kâğıt (vizyon/misyon · sec-pad + var(--paper))

   Ardından canlı sayfa gece bölümüyle (#nerede) devam ediyor, yani şeridin
   çıkışı da sayfanın kendi çiftlerinden biri: kâğıt → gece, aynısı sayfanın
   altında kurumlar → nasıl çalışıyoruz olarak zaten geçiyor.

   NEDEN BU KADAR MUHAFAZAKÂR: üç tur üst üste reddedilen adaylar sitede
   karşılığı olmayan biçimler getirdi (tam genişlik kapak, kenara yaslı görsel,
   mavi levha, iki sütuna bölünmüş gövde metni). Müşteri sayfanın geri kalanını
   beğeniyor. Bu aday o yüzden hiçbir yeni biçim icat etmiyor: kullandığı her
   görünüş jetonu ve kart dili sayfada zaten duruyor.

   NE DEVRALINDI (yeni yazılmayan, sitede zaten var olan sınıflar)
     .ph · .ph-title · .ph-lead · .ph-crumb  PageHero'nun kompakt dalı, canlı
                                             /hakkimizda ile birebir aynı çağrı
     .sec-pad · .container-o · .sec-head · .sec-lead · .h2   bölüm kabuğu
     .ab-open · .ab-open-figw · .ab-open-body                açılış ızgarası
     .ab-open-ph · .ab-open-img                              fotoğraf kalıbı
     .ab-open-p                                              gövde paragrafı
     .ab-vm-card · .ab-vm-ic · .ab-vm                        vizyon/misyon kartı

   YENİ CSS YALNIZ ÜÇ KURAL ve üçü de yerleşim: ızgaranın başlıkla arasındaki
   pay, akışın ilk paragrafındaki pay, ve kendi bölümüne çıkan vizyon/misyon
   ızgarasının üst payının sıfırlanması. Renk, kenarlık, yarıçap, gölge ve ikon
   karesi için TEK BİR yeni bildirim yok.

   İKİ KISIT (geçen turdan geçerli)
     · "Kim olduğumuz" metni TEK AKIŞ: iki paragraf tek FadeUp'ın içinde, tek
       sütunda, aynı hizada. Sola sağa dağıtılmış tek kelime yok.
     · Görselde opaklık oyunu yok: maske yok, sönen gradyan yok, yarı saydam
       perde yok. Kare `.ab-open-ph` / `.ab-open-img` ile basılıyor, yani
       sitenin kendi fotoğraf kalıbı — köşe yarıçapı, overflow:hidden ve
       sayfanın her fotoğrafında duran hafif doygunluk düşüşü. Yeni bir
       katman eklenmedi.

   ÜÇÜNCÜ BÖLÜMÜN `.sec-head`İ BİLEREK YOK. Yön "her bölümün kendi sec-head'i
   olsun" diyordu ama vizyon/misyon bölümüne yazılacak bir h2 metni about.ts'te
   YOK ve uydurmak yasak. İki kartın kendi başlıkları ("Vizyon" · "Misyon")
   zaten o işi yapıyor; sayfada başlıksız bölüm de var (.ab-quote-sec,
   .ab-colo-sec). Metin geldiği gün buraya bir `.sec-head` eklenir.

   HAREKET: YENİ SÜREKLİ PERİYOT EKLENMEDİ. Şerit zaten sürekli hareket
   taşıyor ve hepsi sitenin kendi hareketi — PageHero'nun ızgara zemini
   (pagehero-grid.css · phgDrift 60 s, phgBreathe 26 s, ikisi de reduce
   kapısının arkasında), SplitWords'ün kelime açılışı ve FadeUp'lar. Bu adaya
   özel bir @keyframes yazılmadı, yani listeye yeni bir periyot da girmiyor ve
   asal katsızlık tablosu değişmiyor.

   EKRANA BASILAN METİN: HERO.crumb · HERO.title · HERO.accent · HERO.lead ·
   OPENING.heading · OPENING.accent · OPENING.lead · OPENING.body (iki
   paragraf) · OPENING.vision · OPENING.mission. Tek cümle uydurulmadı.
   Fotoğrafın altında künye YOK, vizyon/misyonun altında "resmî ifadesi" şerhi
   YOK — ikisini de müşteri sildirdi. Vizyon ve misyon firmanın kendi resmî
   ifadesi, tek harfi değişmedi. */

/* Sıra ekrandaki sırayla aynı: önce vizyon, sonra misyon. Canlı sayfadaki
   eşleme de bu (page.tsx · 1. bölüm) ve ikon seçimi oradan alındı. */
const AIMS = [
  { s: OPENING.vision, Icon: Compass },
  { s: OPENING.mission, Icon: Target },
];

export default function AboutSeritBolum() {
  return (
    <>
      {/* ================= 1 · HERO · KENDİ BÖLÜMÜ =================
          Sitenin kendi hero'su, hiç değiştirilmeden. PageHero'nun üç dalı var
          ve `country` da `art` da verilmediği için KOMPAKT dal basılıyor:
          kırıntı + h1 + tek cümle, tek sütun, sağ hücre hiç açılmıyor.
          Canlı /hakkimizda bugün birebir bu çağrıyı yapıyor.

          Yeniden yazılmadı çünkü yazılacak bir şey yok: reddedilen üç aday
          hero'yu kendi eliyle kurup (dar kule, kapak fotoğrafı, yaslı levha)
          tam da "sitenin diline uymuyor" itirazını topladı. Buradaki hero
          sitenin on dört sayfasıyla aynı hero. */}
      <PageHero crumb={HERO.crumb} title={HERO.title} accent={HERO.accent} lead={HERO.lead} />

      {/* ================= 2 · KİM OLDUĞUMUZ · BEYAZ BÖLÜM =================
          CANLIDAN TEK FARK BURADA: başlık ızgaranın içinden çıkıp kendi
          `.sec-head`ine taşındı. Bugün sayfadaki dokuz bölümün sekizi
          "sec-head → ızgara" diye kuruluyor; açılış tek istisnaydı ve başlığı
          sağ sütunun içinde, paragrafların üstünde taşıyordu. Yani bu bölüm
          yeni bir şey yapmıyor, sayfanın kendi kalıbına giriyor.

          Kazanç ölçülebilir bir şey: başlık artık kabın tam genişliğinde
          (.sec-head, 62ch → 1440'ta 623 px) ve fotoğrafın yanındaki sütun
          yalnız gövde metni taşıyor — okunur bant daralmıyor, başlık da yarım
          sütuna sıkışmıyor. Şerit de kısalıyor: 1440'ta üç bölüm toplam
          1.535 px, aynı ekranda Yaslı 1.667 · Kule 1.886 · Kapak 2.160. */}
      <section className="sec-pad">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text={OPENING.heading}
              accent={OPENING.accent}
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">{OPENING.lead}</p>
            </FadeUp>
          </div>

          {/* Izgaranın kendisi canlı sayfanın açılış ızgarası (.ab-open):
              iki eşit sütun, 44px aralık, dikeyde ortalı; 979,5'in altında tek
              sütun + 26px ve fotoğraf 4/3'ten 16/9'a geçiyor. Hepsi
              hakkimizda.css'te yazılı, buraya kopyalanmadı — kopyalansaydı iki
              yerde iki farklı ızgara tutmuş olurduk.

              FOTOĞRAF IZGARADA İLK: 980'in altında kaynak sırası ekran sırası
              oluyor ve bölüm dar ekranda da görselle açılıyor. `order` ile
              çevirmek ekran okuyucudaki sırayı gözün gördüğü sıradan
              ayırırdı. */}
          <div className="ab-open hnd-open">
            <FadeUp className="ab-open-figw" y={20}>
              {/* <figure> DEĞİL düz kap: künye yazılmıyor (müşteri "Fotoğraf
                  temsilî…" satırını sildirdi) ve künyesiz bir <figure>
                  erişilebilirlik ağacında adsız bir grup bırakır.

                  alt="" ile DEKORATİF: media.ts'teki adres bir yer tutucu
                  (SWAP:TEAM_PHOTO) ve sayfanın hiçbir iddiası bu kareye
                  dayanmıyor. unoptimized, çünkü next.config.ts'te
                  remotePatterns tanımlı değil; sitedeki bütün uzak görseller
                  böyle basılıyor. `sizes` canlı çağrının aynısı — ızgara da
                  aynı ızgara. */}
              <span className="ab-open-ph">
                <Image
                  src={TEAM_PHOTO}
                  alt=""
                  fill
                  sizes="(min-width: 980px) 48vw, 100vw"
                  className="ab-open-img"
                  unoptimized
                />
              </span>
            </FadeUp>

            <div className="ab-open-body">
              {/* TEK FadeUp, TEK KAP. Canlıda iki paragraf ayrı ayrı yükseliyor;
                  burada tek akış kısıtı yüzünden ikisi birlikte giriyor —
                  ayrı ayrı yükselselerdi "bir akış" değil iki blok olurlardı. */}
              <FadeUp delay={0.12}>
                <div className="hnd-flow">
                  {OPENING.body.map((p) => (
                    <p key={p.slice(0, 24)} className="ab-open-p">
                      {p}
                    </p>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3 · VİZYON VE MİSYON · KÂĞIT BÖLÜM =================
          Canlıda bu iki kart "Kim olduğumuz" bölümünün içinde, paragrafların
          altında duruyor ve bölüm orada iki ayrı işi birden yapıyor: firmanın
          ne yaptığını anlatmak ve resmî beyanını basmak. Burada ikinci iş kendi
          bölümüne çıkıyor.

          ZEMİN --paper ve bu keyfî değil: iki beyaz bölüm arka arkaya gelince
          ayrıldıkları görünmüyor. Sayfa aynı sorunu aynı çözümle bir kez daha
          yaşıyor (dayanaklar beyaz → kurumlar kâğıt) ve şeridin ardından gelen
          canlı bölüm zaten gece (#nerede), yani sıra gece → beyaz → kâğıt →
          gece oluyor: sayfanın kendi sırası.

          Kartlar canlı sayfanın kendi vizyon/misyon kartları (.ab-vm-card):
          beyaz kâğıt, --border teli, var(--r-lg), --blue-100 kuyuda
          --blue-700 ikon, başlık --blue-900. Başlık rengi ölçülmüş bir karar:
          12,5px/700 WCAG'ın büyük metin tanımına girmiyor, --blue-700 beyaz
          üstünde 3,99:1 verip düşerdi; --blue-900 aynı yerde 7,14:1. */}
      <section className="sec-pad" style={{ background: "var(--paper)" }}>
        <div className="container-o">
          <div className="ab-vm hnd-vm">
            {AIMS.map(({ s, Icon }, i) => (
              <FadeUp key={s.t} delay={0.12 + i * 0.08}>
                <article className="ab-vm-card">
                  <span className="ab-vm-ic" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  <h3>{s.t}</h3>
                  <p>{s.s}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
