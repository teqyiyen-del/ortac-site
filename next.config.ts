import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Build çıktısının yeri dışarıdan verilebiliyor.
     Sebebi pratik: `next build` ile `next dev` aynı .next klasörünü paylaşınca
     build, çalışan dev sunucusunun derlenmiş parçalarını siliyor ve sunucu
     "Cannot find module ./vendor-chunks/..." diye çöküyor. Geliştirme sürerken
     üretim derlemesi almak gerektiğinde:
         NEXT_DIST_DIR=.next-build npm run build
     Değişken verilmezse davranış aynen eskisi gibi. */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  /* Fotoğraflar Unsplash'ten; genişliği ve kaliteyi Unsplash üretiyor
     (src/lib/gorselYukleyici.ts). En büyük genişlik 1920: 1136 piksellik tam
     genişlik görsel retina ekranda 2272 isterdi, 3840'a çıkmasın. */
  images: {
    loader: "custom",
    loaderFile: "./src/lib/gorselYukleyici.ts",
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
  },
};

export default nextConfig;
