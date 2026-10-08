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
  /* GEÇİCİ ADRES ARAMA MOTORUNA KAPALI (09.10.2026 · teslim öncesi SEO turu).
     Site şimdilik ortac-global-site.vercel.app'te; kanonikler ortacglobal.com'u
     gösteriyor ama orada hâlâ eski site var, yani Google geçici adresi ayrı
     bir site gibi dizine alabilirdi. Başlık YALNIZ o host'ta basılıyor: alan
     adı ortacglobal.com'a bağlandığı gün kendiliğinden devre dışı kalır,
     silmeyi hatırlamak gerekmiyor. */
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ortac-global-site.vercel.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  /* /ulke/... KOPYA ADRESLERİ. Ülke sayfaları /dubai, /ingiltere, /kktc
     adresinde yaşıyor ama bileşen app/ulke/[slug] klasöründen geliyor; o
     klasör kendi adresini de (/ulke/dubai …) 200 ile yayınlıyordu: 19 kopya
     adres, yedisi eski genel şablonla. Kalıcı yönlendirme: tek adres kalıyor. */
  async redirects() {
    return [
      /* PANEL GİRİŞİ. Eski sitenin her sayfasında "Müşteri Paneli" düğmesi
         bu adrese gidiyordu; yeni sitede /panel yoktu, düğme soluk duruyordu
         ve mevcut müşterinin giriş yolu taşınma günü kaybolacaktı. Ürünün adı
         sitede yazılmıyor ("müşteri paneli"); adres yalnız burada. Geçici
         yönlendirme: panel adresi değişirse tek satır. */
      { source: "/panel", destination: "https://ortacaccountingservicesllc.taxdome.com/", permanent: false },
      { source: "/ulke/:slug", destination: "/:slug", permanent: true },
      { source: "/ulke/:slug/:hizmet", destination: "/:slug/:hizmet", permanent: true },
    ];
  },
};

export default nextConfig;
