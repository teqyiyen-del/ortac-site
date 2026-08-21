import Image from "next/image";
import { Compass, Target } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { HERO, OPENING } from "@/lib/about";
import { TEAM_PHOTO } from "@/lib/media";

/* ADAY · SAHNE — /hakkimizda giriş şeridi. Biçim: src/app/css/lab-hserit4-b.css · .hnb-

   FİKİR TEK CÜMLE: bu şerit yeni bir biçim İCAT ETMİYOR, sitenin en
   karakteristik kartını DEVRALIYOR — beyaz kart gövdesi ve içinde gece bir
   panel (globals.css · .hx-card / .hx-stage / .hx-body). Panelde bu kez çizim
   değil ekip karesi duruyor; başlık, tanım cümlesi ve iki paragraf kartın
   beyaz gövdesinde, tek akışta.

   KALIBIN SİTEDEKİ KARŞILIKLARI (üçü de canlı, üçü de aynı ikili):
     ana sayfa · hizmet kartları   components/home/HomeServices.tsx
                                   (.hx-card > .hx-stage + .hx-body) — kaynak
     ülke sayfaları · avantajlar   components/country/CountryPros.tsx (.advx-)
                                   "kalıp müşterinin gösterdiği yerden alındı"
     uygunluk testi                css/fittest.css (.uyg-grid) — aynı ikili,
                                   tek farkı ikisinin YAN YANA durması
   Bu aday üçüncüsünün yerleşimini alıyor: gece panel solda, gövde sağda.
   980'in altında kartın kendi doğal sırasına dönüyor (panel üstte, gövde
   altta) — .hx-card'ın canlıdaki hâli zaten bu.

   ÜÇ TUR NEDEN REDDEDİLDİ, BURADA NE YOK: reddedilen adaylar sitede karşılığı
   olmayan biçimler kurdu. Bu adayda tam genişlik kapak fotoğrafı YOK, ekran
   kenarına yaslanan görsel YOK, mavi levha/bant/taban YOK, iki sütuna bölünmüş
   gövde metni YOK, yeni kart biçimi · yeni yarıçap · yeni gölge YOK. Kartın
   yarıçapı --r-panel, karenin yarıçapı --r-lg, ikisi de sitenin kendi jetonu.

   HERO SİTENİN KENDİ HERO'SU: <PageHero /> propsuz kompakt dalıyla basılıyor,
   yani /hakkimizda'nın bugün canlıda kullandığı bileşenin AYNISI. Reddedilen
   üç aday hero'yu elle yeniden yazmıştı (kendi zemini, kendi h1'i); "sitenin
   kalanına uygun" cevabının ilk maddesi bu bileşeni yeniden yazmamak.

   VİZYON VE MİSYON CANLIDAKİ HÂLİYLE: .ab-vm / .ab-vm-card / .ab-vm-ic
   sınıfları hakkimizda.css'ten aynen kullanılıyor, tek kural ezilmiyor.
   Mavi bu iki kartta zaten var ve sitenin kendi biçiminde: ikon kuyusu
   --blue-100, etiket --blue-900. Mavi bir levha kurmak gerekmiyor.

   EKRANA BASILAN METİN tamamen about.ts'ten, tek kelimesi değişmeden:
   HERO.crumb · HERO.title · HERO.accent · HERO.lead · OPENING.heading ·
   OPENING.accent · OPENING.lead · OPENING.body (iki paragraf) ·
   OPENING.vision · OPENING.mission. Yeni cümle yazılmadı, künye satırı YOK
   (müşteri sildirdi), vizyon/misyonun altında şerh YOK.

   FOTOĞRAFTA HAREKET DE YOK, GEÇİŞ DE YOK, FİLTRE DE YOK: .hnb-img altında ne
   `animation`, ne `transition`, ne `filter`, ne `opacity` bildirimi var —
   yalnız `object-fit`. Kare NET basılıyor; maske, sönen gradyan, yarı saydam
   perde hiçbiri kullanılmadı. Sitenin kendi fotoğraf kalıbı da böyle
   (.ab-open-ph · .ab-cn-ph: yalnız köşe yarıçapı ve overflow:hidden).

   HAREKET TEK TANE, tamamı CSS'te ve reduce kapısının arkasında (tuzak A):
     44,017 s  gece panelin beyaz gövdeye baktığı dikişte kayan mavi ışık
   Asal; brifteki yirmi iki periyodun ve bu lab sayfasındaki öteki beş
   periyodun (24007 · 25999 · 32999 · 35023 · 41011) hepsiyle aralarında asal
   (tuzak K, tek tek hesaplandı). `animation-direction: alternate` YOK. */

const AIMS = [
  { s: OPENING.vision, Icon: Compass },
  { s: OPENING.mission, Icon: Target },
];

export default function AboutSeritSahne() {
  return (
    <>
      {/* ================= 1 · HERO =================
          Propsuz kompakt dal: country ve art verilmeyince PageHero canlı
          /hakkimizda ile birebir aynı bloğu basıyor (.ph · .phg · .ph-crumb ·
          .ph-title · .ph-lead). Buraya tek bir ölçü kuralı bile yazılmadı —
          yazılsaydı pagehero-grid.css'in kalibrasyonu ikiye bölünürdü. */}
      <PageHero crumb={HERO.crumb} title={HERO.title} accent={HERO.accent} lead={HERO.lead} />

      {/* ================= 2 · KİM OLDUĞUMUZ · SAHNE =================
          Bölüm kabuğu sitenin standart kabuğu: .sec-pad > .container-o.
          Yeni bir bölüm zemini, yeni bir genişlik, yeni bir dikey ritim yok. */}
      <section className="sec-pad">
        <div className="container-o">
          {/* TEK FadeUp, TEK KAP. Paragraflar ayrı ayrı yükselseydi "tek akış"
              değil üç blok olurlardı; müşterinin geçen turdan geçerli kalan
              kısıtı da tam bu. Başlığın kendi hareketi SplitWords'ten geliyor,
              o sitenin her h2'sinde aynı. */}
          <FadeUp y={26}>
            {/* .hx-card CANLI SINIF, ezilmiyor; .hnb-card yalnız YERLEŞİM
                ekliyor (tek sütun → iki sütun) ve kartın hover kalkışını
                kapatıyor. Kalkış orada tıklanabilir bir yüzeyin işareti;
                bu şerit bir bağlantı değil, gerekçesi CSS'te. */}
            <article className="hx-card hnb-card">
              <div className="hx-stage hnb-stage">
                {/* <figure> DEĞİL düz kap: künye yazılmıyor ve künyesiz bir
                    <figure> erişilebilirlik ağacında adsız bir grup bırakır.
                    Kare alt="" ile DEKORATİF: sayfanın hiçbir iddiası ona
                    dayanmıyor. unoptimized, çünkü next.config.ts'te
                    remotePatterns tanımlı değil (sitedeki bütün uzak
                    görseller böyle basılıyor). SWAP:TEAM_PHOTO yer tutucusu,
                    gerçek ekip çekimiyle değişecek (media.ts). */}
                <span className="hnb-shot">
                  <Image
                    src={TEAM_PHOTO}
                    alt=""
                    fill
                    sizes="(min-width: 1264px) 480px, (min-width: 980px) 40vw, calc(100vw - 88px)"
                    className="hnb-img"
                    unoptimized
                  />
                </span>

                {/* Dikişteki ışık. Dekoratif, ekran okuyucuya çıkmıyor;
                    reduce kapısı dışında hiç basılmıyor (display:none). */}
                <i className="hnb-glint" aria-hidden="true" />
              </div>

              {/* .hx-body CANLI SINIF; .hnb-say yalnız dolguyu büyütüyor ve
                  metni dikeyde ortalıyor (kart boyunu fotoğraf değil metin
                  belirliyor, gerekçesi CSS'te).

                  Paragraf biçimleri de canlıdan: .ab-open-lead ve .ab-open-p
                  hakkimizda.css'te duruyor ve tam olarak bu iki metnin
                  biçimi. Yeniden yazmak aynı ölçüyü iki dosyada tutmak
                  olurdu. */}
              <div className="hx-body hnb-say">
                <SplitWords
                  as="h2"
                  text={OPENING.heading}
                  accent={OPENING.accent}
                  className="h2"
                  style={{ color: "var(--text-900)" }}
                />
                <p className="ab-open-lead">{OPENING.lead}</p>
                {OPENING.body.map((p) => (
                  <p key={p.slice(0, 24)} className="ab-open-p">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          </FadeUp>

          {/* ---- VİZYON VE MİSYON · CANLIDAKİ İKİ KART ----
              Sınıflar da işaretleme de canlı sayfanın aynısı. Bu blok bilerek
              DEĞİŞTİRİLMEDİ: müşteri sayfanın geri kalanını beğeniyor ve bu
              iki kart onun parçası. Metinler firmanın kendi resmî ifadesi,
              tek harfi değişmez. */}
          <div className="ab-vm">
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
