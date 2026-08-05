import FadeUp from "@/components/shared/FadeUp";
import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";

import { KIM_ICON, KIM_ICON_FALLBACK } from "./KimShared";

/* ============================================================================
   K1 · ANA BEYAN  —  "Bu işi kim yürütüyor?" adayı

   FİKİR: dört kutu eşit değil. Biri asıl cevap, üçü şart.

   Bugünkü bölümde dört kutunun dördü de aynı ikon boyunu, aynı 13,5 piksel
   başlığı, aynı 12,5 piksel gövdeyi, aynı kenarlığı ve aynı zemini
   kullanıyor. Dördü aynı sesle bağırınca giriş noktası kalmıyor: göz soldan
   sağa dört kez aynı şeyi okuyor ve hiçbirini birinci sıraya koyamıyor.

   Burada ilk madde (ortac.facts[0] — kendi muhasebe lisansı) tek başına koyu
   bir panele çıkıyor ve başlığı 22 piksele büyüyor; kalan üçü sağda ince
   satırlar hâlinde duruyor. Sıra veriden geliyor, elle yazılmıyor: veri
   dosyasında maddelerin sırası değişirse asıl cevap da kendiliğinden değişir.

   ALINTI PANELİN İÇİNE GİRDİ. Bugün alıntı sağ sütunda, fotoğrafın altında,
   kendi kenarlıklı kutusunda duruyor — yani bölümün altıncı ayrı nesnesi.
   Burada koyu panelin dibine, saç teli bir çizginin altına iniyor:
   `margin-top: auto` ile en alta yapışıyor, yani sağ sütun ne kadar uzarsa
   alıntı o kadar aşağı iniyor. Bugün ölü boşluk olan yer alıntının nefes
   payına dönüşüyor.

   METİN: dört maddenin başlığı da cümlesi de accountingDubai.ts'ten birebir
   geliyor, alıntının metnine dokunulmadı. figure/blockquote/figcaption yapısı
   korundu — cümle hâlâ "Murat Ortaç şunu söyledi" diyor, "Murat Ortaç bu işi
   yürütüyor" demiyor.

   NEYİ FEDA EDİYOR: kalan üç madde bilinçli olarak ikinci plana düşüyor.
   Müşteri dördünün de eşit ağırlıkta görünmesini istiyorsa bu aday yanlış.
   Ayrıca koyu panel bölümün rengini değiştiriyor: sayfada bu bölüm artık açık
   gri bir zeminde duran koyu bir blok.
   ========================================================================= */

export default function KimK1() {
  const [main, ...rest] = C.ortac.facts;
  const MainIcon = KIM_ICON[main.icon] ?? KIM_ICON_FALLBACK;

  return (
    <div className="kim1">
      <FadeUp className="kim1-cell" delay={0.04}>
        <div className="kim1-main">
          <span className="kim1-main-ic" aria-hidden="true">
            <MainIcon size={20} strokeWidth={2} />
          </span>
          <b className="kim1-main-t">{main.title}</b>
          <p className="kim1-main-l">{main.line}</p>

          {/* Alıntı beyanın imzası: aynı panelin içinde, en altta. */}
          <figure className="kim1-sign">
            <blockquote>{C.ortac.quote.text}</blockquote>
            <figcaption>
              <b>{C.ortac.quote.who}</b>
              <span>{C.ortac.quote.role}</span>
            </figcaption>
          </figure>
        </div>
      </FadeUp>

      {/* Üç şart. align-content: space-between (CSS) — artan yükseklik
          kutuların İÇİNE ölü boşluk olarak değil, aralarına ritim olarak
          dağılıyor. Bugünkü 2×2 ızgarada aynı fazlalık kısa kutunun altında
          görünür bir delik bırakıyor. */}
      <FadeUp className="kim1-cell" delay={0.1}>
        <ul className="kim1-rest">
          {rest.map((f) => {
            const Icon = KIM_ICON[f.icon] ?? KIM_ICON_FALLBACK;
            return (
              <li className="kim1-row" key={f.title}>
                <span className="kim1-row-ic" aria-hidden="true">
                  <Icon size={16} strokeWidth={2.1} />
                </span>
                <b>{f.title}</b>
                <span className="kim1-row-l">{f.line}</span>
              </li>
            );
          })}
        </ul>
      </FadeUp>
    </div>
  );
}
