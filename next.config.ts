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
  /* İZLEYİCİ ANAHTARI DERLEME ANINDA SABİTLENİYOR (09.10.2026). layout.tsx
     `process.env.IZLEME_ACIK === "1"` iken <Izleyici/> basıyor. Durağan
     sayfalar bunu derlemede, istek anında çizilen sayfalar (/basla) çalışma
     anında okuyordu; değişken yalnız derlemede verilince /basla izlenmiyordu
     (62 sayfalık denemede eksik kalan tek sayfa). Buradan geçince değer koda
     gömülüyor ve iki tür sayfa aynı cevabı veriyor. Depo yolu (IZLEME_DB) ve
     tuz (IZLEME_TUZ) çalışma anında okunmaya devam ediyor. */
  env: { IZLEME_ACIK: process.env.IZLEME_ACIK ?? "" },
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
