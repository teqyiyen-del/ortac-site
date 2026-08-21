import Image from "next/image";
import { Compass, Target } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { HERO, OPENING } from "@/lib/about";
import { TEAM_PHOTO } from "@/lib/media";

/* ADAY · KART — /hakkimizda giriş şeridi. Biçim: src/app/css/lab-hserit4-a.css · .hna-

   ÜÇ TUR REDDEDİLDİ ÇÜNKÜ ÜÇÜ DE YENİ BİÇİM UYDURDU: tam genişlik kapak,
   ekran kenarına yaslı görsel, mavi levha, iki sütuna bölünmüş gövde. Sitenin
   hiçbir yerinde bunlar yok. Bu aday hiçbir yeni biçim getirmiyor; sayfanın
   kendi parçalarını yeniden diziyor.

   NEREDEN DEVRALINDI (hepsi bugün canlıda, tek satırı icat edilmedi):
     hero        <PageHero> kompakt dalı — /hakkimizda'nın bugün bastığı hero
     bölüm       sec-pad > container-o > sec-head (SplitWords h2 + sec-lead)
     kart        .ab-bcard / .ab-vm-card ölçüleri: 1px var(--border),
                 var(--r-lg), beyaz zemin, 38px --blue-100 ikon kuyusu
     fotoğraf    .ab-open-ph / .ab-cn-ph kalıbı: yuvarlak köşe, overflow
                 hidden, NET basılıyor — kartın içinde, kart olarak

   BENİM KATKIM YALNIZ YERLEŞİM. Şerit tek bir kart ızgarasına indi ve
   ızgaranın oranı işi yapıyor: fotoğraf kartı solda 7 sütun ve İKİ SATIR
   boyunda, sağında vizyon ile misyon kartları alt alta 5'er sütun. Yani
   fotoğrafın yüksekliğini kendi oranı değil YANINDAKİ İKİ KARTIN METNİ
   belirliyor; üç kart aynı hizada başlayıp aynı hizada bitiyor.

   Canlı hâlde bu bölüm iki ayrı ızgaraydı (fotoğraf | metin, altında iki kart)
   ve ikisi birbirini hiç görmüyordu: fotoğraf 4/3 sabitken yanındaki metin
   ondan ~200 piksel kısa kalıyor, `align-items: center` o farkı ortadan ikiye
   bölüyordu. Tek ızgarada o boşluk hiç doğmuyor.

   GÖVDE METNİ TEK AKIŞ ve ızgaranın dışında: başlığın hemen altında, tek
   sütun, tek ölçü (62ch). Sola sağa dağıtılmış iki sütun bu turda da yasak.
   Metnin kart içine alınması DENENDİ VE ELENDİ: OPENING.body 330 karakter,
   yarım sütunluk bir kartta 6 satır tutuyor ve kartın kalan 200 pikseli boş
   kalıyordu. Kart, içini dolduramadığı anda kutu olur.

   FOTOĞRAFTA HİÇBİR OYUN YOK: .hna-img altında `filter`, `opacity`, `mask`,
   gradyan perde ve `transition` bildirimi HİÇ YAZILMADI ve yazılmamalı
   (müşterinin geçen turdan geçerli kalan kısıtı). Kare alt="" ile DEKORATİF
   ve altına künye YAZILMIYOR — müşteri o cümleyi sildirdi (about.ts · HERO).

   METİN UYDURULMADI: ekrandaki her cümle about.ts'ten (HERO.title, HERO.accent,
   HERO.lead, OPENING.heading, OPENING.accent, OPENING.lead, OPENING.body,
   OPENING.vision, OPENING.mission). Vizyon ve misyon firmanın kendi resmî
   ifadesi; tek harfi değişmedi. */

/* İkonlar burada, about.ts'te değil: o dosya React'ten bağımsız tutuluyor
   (gerekçesi about.ts'in başında). Pusula ve hedef tahtası canlı sayfanın
   kendi seçimi (page.tsx · .ab-vm) — burada da aynısı, çünkü bu iki kart
   canlının devamı, yenisi değil. */
const AIMS = [
  { Icon: Compass, ...OPENING.vision },
  { Icon: Target, ...OPENING.mission },
];

export default function AboutSeritKart() {
  return (
    <>
      {/* ================= HERO · sayfanın kendi hero'su =================
          Yeni bir hero YAZILMADI. Reddedilen üç aday da kendi gece bandını
          kuruyordu (kendi dolgusu, kendi başlık ölçüsü); bu aday canlı
          sayfanın çağrısını birebir tekrarlıyor: country ve art verilmeyince
          PageHero kompakt başlık bloğunu basıyor (bileşenin kendi belgesi).
          Şeridin değişen yeri hero değil, altındaki bölüm. */}
      <PageHero crumb={HERO.crumb} title={HERO.title} accent={HERO.accent} lead={HERO.lead} />

      {/* ================= KİM OLDUĞUMUZ + VİZYON/MİSYON =================
          Bir bölüm, bir ızgara. Canlıda burası iki bölüm parçasıydı
          (.ab-open + .ab-vm) ve aralarında --space-head kadar boşluk vardı;
          vizyon ile misyon "aşağıda kalan iki kart" gibi duruyordu. Aynı
          ızgaraya girince fotoğrafla eş değere çıkıyorlar. */}
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
            <FadeUp delay={0.18}>
              <p className="sec-lead">{OPENING.lead}</p>
            </FadeUp>
          </div>

          {/* TEK FadeUp, TEK KAP: paragraflar ayrı ayrı yükselseydi gövde yine
              "parça parça" bir metin olurdu. İstenen şey tek akış. */}
          <FadeUp className="hna-flow" delay={0.26}>
            {OPENING.body.map((p) => (
              <p key={p.slice(0, 24)} className="hna-p">
                {p}
              </p>
            ))}
          </FadeUp>

          <div className="hna-grid">
            {/* FadeUp'ın <div>'i ızgara hücresi (canlıdaki .ab-open-figw ve
                .ab-cn ile aynı kalıp); kart onu height:100% ile dolduruyor.
                <figure> DEĞİL düz kap: künye yazılmıyor ve künyesiz bir figure
                erişilebilirlik ağacında adsız bir grup bırakır.

                unoptimized: next.config.ts'te remotePatterns tanımlı değil,
                sitedeki bütün uzak görseller böyle basılıyor. */}
            <FadeUp className="hna-shot-w" y={22}>
              <div className="hna-shot">
                <Image
                  src={TEAM_PHOTO}
                  alt=""
                  fill
                  sizes="(min-width: 1264px) 656px, (min-width: 980px) 58vw, calc(100vw - 40px)"
                  className="hna-img"
                  unoptimized
                />
              </div>
            </FadeUp>

            {AIMS.map(({ Icon, t, s }, i) => (
              <FadeUp key={t} className="hna-aim-w" delay={0.12 + i * 0.08}>
                <article className="hna-aim">
                  <span className="hna-ic" aria-hidden="true">
                    <span className="hna-beam" />
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  <h3 className="hna-aim-t">{t}</h3>
                  <p className="hna-aim-s">{s}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
