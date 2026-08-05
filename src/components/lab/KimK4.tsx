import Image from "next/image";

import FadeUp from "@/components/shared/FadeUp";
import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";
import { PHOTO } from "@/lib/media";

import { KIM_ICON, KIM_ICON_FALLBACK } from "./KimShared";

/* ============================================================================
   K4 · BEYAN + ZEMİN  —  "Bu işi kim yürütüyor?" adayı

   FİKİR: K2'nin zemini, K1'in hiyerarşisi.

   K2 doğru bir şey buldu — fotoğraf bölümün komşusu değil zemini; kare
   perdenin altına girince bölüm altı kutudan tek bir bloka iniyor. Yanlış
   olan, o bloğun içinde neyin büyük yazıldığıydı: bandın tek büyük tipografisi
   (28 piksel) ALINTIYA ayrılmıştı. Yani bölüm "kim yürütüyor?" diye soruyor,
   en büyük harflerle Dubai'nin rekabet gücünden söz eden bir cümle cevap
   veriyordu. Alıntı kendi başına doğru bir cümle ama bu sorunun cevabı değil.

   Cevap ortac.facts[0]: KENDİ MUHASEBE LİSANSIMIZ. Bu adayda bandın en büyük
   tipografisi (32 piksele kadar) o maddenin başlığı. Alıntı K1'deki yerine
   dönüyor: aynı bloğun dibinde, saç teli bir çizginin altında, beyanın imzası
   olarak — 13,5 piksel. K2'de alıntı bandın tepesindeydi ve puntosu dört
   maddenin başlığının iki katıydı; burada onların altında kalıyor.

   SIRA VERİDEN GELİYOR, elle yazılmıyor: `const [main, ...rest]`. Veri
   dosyasında maddelerin sırası değişirse asıl cevap da kendiliğinden değişir;
   burada "lisans" diye sabitlenmiş bir dize yok.

   ALINTI METNİ DEĞİŞMEDİ ve figure/blockquote/figcaption yapısı duruyor —
   cümle hâlâ "Murat Ortaç şunu söyledi" diyor, "Murat Ortaç bu işi yürütüyor"
   demiyor. Alıntının küçülmesi onu bir olgu beyanına çevirmiyor, yalnızca
   beyanın altına imza olarak yerleştiriyor.

   KALAN ÜÇ MADDE ikinci planda ama eksiksiz: sağ sütunda saç teli çizgilerle
   ayrılmış üç satır, başlıkları 13,5 piksel. Dördünün de cümlesi
   accountingDubai.ts'ten birebir; hiçbir bilgi düşmedi.

   1024 PİKSEL: K2'nin dört sütunu 1040'ta ikiye düşüyor ve band orada bugünkü
   bölümden uzuyordu. Burada dört sütun hiç yok — düzen 900 pikselin üstünde
   "beyan | üç şart" olarak ikiye bölünüyor ve 1024'te de aynı iki sütun
   duruyor, yani o kırılma noktası ortadan kalktı.

   NEYİ FEDA EDİYOR: K1'in feda ettiğini — kalan üç madde bilinçli olarak
   ikinci plana düşüyor. Ayrıca band hâlâ koyu; sayfada bu ağırlıkta ikinci bir
   yer yok.
   ========================================================================= */

export default function KimK4() {
  const [main, ...rest] = C.ortac.facts;
  const MainIcon = KIM_ICON[main.icon] ?? KIM_ICON_FALLBACK;

  return (
    <FadeUp delay={0.04}>
      <div className="kim4">
        {/* alt boş, canlıdaki gerekçeyle aynı: kare bir olgu taşımıyor.
            unoptimized: next.config.ts'te remotePatterns yok, iyileştirici dış
            alan adını reddeder. */}
        <div className="kim4-bg" aria-hidden="true">
          <Image
            src={PHOTO.accounting}
            alt=""
            fill
            sizes="(min-width: 1240px) 1136px, 100vw"
            unoptimized
          />
          <span className="kim4-scrim" />
        </div>

        <div className="kim4-in">
          {/* ---- beyan ---- */}
          <div className="kim4-lead">
            {/* İkon kutusuz: koyu zeminde ikona ayrı bir kap açmak beyanı
                yeniden bir karta çevirirdi. Ölçüldü — %8 beyaz yıkamalı bir
                kabın içinde --blue-500 en açık perde noktasında 3,2:1'e
                iniyor, kapsız 4,1:1 kalıyor. */}
            <span className="kim4-lead-ic" aria-hidden="true">
              <MainIcon size={26} strokeWidth={1.8} />
            </span>
            <b className="kim4-lead-t">{main.title}</b>
            <p className="kim4-lead-l">{main.line}</p>

            {/* Alıntı beyanın imzası: aynı bloğun içinde, çizginin altında.
                margin-top: auto — sağdaki üç şart sütunu beyandan uzun
                kalırsa artan yükseklik başlıkla cümlenin arasına değil
                imzanın üstüne düşüyor. */}
            <figure className="kim4-sign">
              <blockquote>{C.ortac.quote.text}</blockquote>
              <figcaption>
                <b>{C.ortac.quote.who}</b>
                <span>{C.ortac.quote.role}</span>
              </figcaption>
            </figure>
          </div>

          {/* ---- üç şart ----
              Kutu değil satır: her satırın üstünden bir saç teli geçiyor,
              kendi kenarlığı ve zemini yok. Kutu olmayınca satırların farklı
              boylarda olması görünmüyor; bugünkü 2×2 ızgarada aynı fark kısa
              kutunun altında delik açıyor. */}
          <ul className="kim4-rest">
            {rest.map((f) => {
              const Icon = KIM_ICON[f.icon] ?? KIM_ICON_FALLBACK;
              return (
                <li className="kim4-r" key={f.title}>
                  <span className="kim4-r-ic" aria-hidden="true">
                    <Icon size={16} strokeWidth={2.1} />
                  </span>
                  <b>{f.title}</b>
                  <span className="kim4-r-l">{f.line}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </FadeUp>
  );
}
