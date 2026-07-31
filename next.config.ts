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
};

export default nextConfig;
