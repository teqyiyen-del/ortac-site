/* Görsel yükleyici · next.config.ts → images.loaderFile (25.09.2026 ·
   optimizasyon turu).

   Sitedeki fotoğrafların hepsi Unsplash'ten geliyor ve <Image>'ların hepsi
   `unoptimized` işaretliydi: tarayıcı adreste yazan genişliği (900-1800 px)
   kartın gerçek boyuna bakmadan indiriyordu; menüdeki 280 piksellik ülke
   kartı 1400 piksellik kare çekiyordu. Unsplash istenen genişliği kendisi
   üretiyor (imgix), yani Next'in kendi optimizasyon sunucusuna gerek yok:
   bu yükleyici srcset'teki her genişlik için adresin `w` ve `q`
   parametrelerini yeniden yazıyor, tarayıcı `sizes`e ve ekranın piksel
   yoğunluğuna göre en uygununu seçiyor. `auto=format` WebP/AVIF veriyor.

   Kalite 65: fotoğrafların çoğu koyu karartmanın ya da yazının altında;
   70 ile farkı gözle ayırt edilmiyor, dosya ~%15 küçülüyor. 1080 piksel ve
   üstünde 58: o genişliği çoğunlukla 3x ekranlı telefon tam genişlik görsel
   için istiyor (390 × 3); piksel o kadar yoğunken fark görünmüyor, eskisi
   900 px sabit iniyordu ve telefonda görsel yükü artmasın.

   Unsplash dışındaki bir adres (ör. basın sayfasındaki dış görseller)
   dokunulmadan döner; o görseller `unoptimized` kalmalı. */
export default function gorselYukleyici({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const u = new URL(src);
  u.searchParams.set("w", String(width));
  u.searchParams.set("q", String(quality ?? (width >= 1080 ? 58 : 65)));
  u.searchParams.set("auto", "format");
  return u.toString();
}
