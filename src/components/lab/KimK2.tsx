import Image from "next/image";

import FadeUp from "@/components/shared/FadeUp";
import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";
import { PHOTO } from "@/lib/media";

import { KIM_ICON, KIM_ICON_FALLBACK } from "./KimShared";

/* ============================================================================
   K2 · ZEMİN  —  "Bu işi kim yürütüyor?" adayı

   FİKİR: fotoğraf bölümün KOMŞUSU değil ZEMİNİ.

   Bugün sağ sütunda iki ayrı nesne üst üste duruyor: 16/9 bir fotoğraf ve
   altında kenarlıklı bir alıntı kartı. İkisi de aynı yuvarlaklıkta, aynı
   beyaz kapta — yani bölüm sağda kendi içinde ikinci bir ızgara açıyor ve
   toplam altı kutuya çıkıyor. Üstelik fotoğrafın alt metni bilerek boş
   (canlı dosyadaki yorum: "kare bir olgu iddia etmiyor"), yani bölümün en
   büyük tek nesnesi sıfır bilgi taşıyor.

   Bu aday fotoğrafı sınıyor: yerinde kalsın ama bir işi olsun. Kare artık
   bölümün tamamının arkasına geçiyor, üstüne koyu bir perde iniyor ve
   perdenin üstünde önce alıntı, altında dört madde duruyor. Fotoğraf bir
   nesne olmaktan çıkıp doku oluyor; bölüm altı kutudan TEK bir bloka iniyor.

   OKUNURLUK ÖLÇÜLEBİLİR OLSUN DİYE perde sabit: en açık yerinde bile
   rgba(8,8,8,0.80). Fotoğrafın o noktası saf beyaz olsa bile arka plan
   #333333'ten açık olamıyor — yani beyaz metin en kötü ihtimalle 12:1,
   %72 beyaz ikincil metin 7:1 kalıyor. Perde fotoğrafa göre değil, en kötü
   ihtimale göre seçildi; kare müşterinin kendi çekimiyle değişirse (media.ts
   · SWAP:STOCK_PHOTOS) kontrast yine tutuyor.

   METİN: dört maddenin başlığı ve cümlesi accountingDubai.ts'ten birebir,
   alıntı metni değişmedi.

   NEYİ FEDA EDİYOR: bölüm koyu bir banda dönüşüyor ve sayfada bu ağırlıkta
   ikinci bir yer yok — hero'dan sonra en koyu blok bu oluyor. Ayrıca stok
   fotoğrafın kendisi hâlâ stok fotoğraf; perde onu doku yapıyor ama iyi bir
   kare yapmıyor. Fotoğraf tamamen kalksın deniyorsa K1 ve K3 zaten fotoğrafsız.
   ========================================================================= */

export default function KimK2() {
  return (
    <FadeUp delay={0.04}>
      <div className="kim2">
        {/* alt boş, canlıdaki gerekçeyle aynı: kare bir olgu taşımıyor.
            unoptimized: next.config.ts'te remotePatterns yok, iyileştirici dış
            alan adını reddeder. */}
        <div className="kim2-bg" aria-hidden="true">
          <Image
            src={PHOTO.accounting}
            alt=""
            fill
            sizes="(min-width: 1240px) 1136px, 100vw"
            unoptimized
          />
          <span className="kim2-scrim" />
        </div>

        <div className="kim2-in">
          <figure className="kim2-say">
            <blockquote>{C.ortac.quote.text}</blockquote>
            <figcaption>
              <b>{C.ortac.quote.who}</b>
              <span>{C.ortac.quote.role}</span>
            </figcaption>
          </figure>

          {/* Dört madde kutu değil sütun: tek bir saç teli çizgi hepsinin
              üstünden geçiyor, kutuların kendi kenarlığı yok. Kutu olmayınca
              sütunların altı farklı yerde bitebiliyor ve bu görünmüyor —
              bugünkü 2×2 ızgarada aynı fark kutunun içinde delik açıyor. */}
          <ul className="kim2-facts">
            {C.ortac.facts.map((f) => {
              const Icon = KIM_ICON[f.icon] ?? KIM_ICON_FALLBACK;
              return (
                <li className="kim2-f" key={f.title}>
                  <span className="kim2-f-ic" aria-hidden="true">
                    <Icon size={17} strokeWidth={2} />
                  </span>
                  <b>{f.title}</b>
                  <span className="kim2-f-l">{f.line}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </FadeUp>
  );
}
