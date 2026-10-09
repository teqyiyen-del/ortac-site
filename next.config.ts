import type { NextConfig } from "next";

/* FRAMER'DAKİ YÖNLENDİRME LİSTESİ (09.10.2026 · Burak panelden ekran görüntüsüyle
   verdi). Çoğu daha eski WordPress sitesinin adresleri: Framer onları kendi
   adreslerine taşıyordu, burada DOĞRUDAN yeni adrese gidiyorlar (iki atlama
   olmasın). Türkçe harfli yazımlar da var ("/hakkımızda", "…-ödeme-…"): Google
   bir dönem onları dizine almış, Search Console'da hâlâ tıklama alıyorlar.
   Her satır hem harfli hem kodlanmış (%C4%B1 …) hâliyle yazılıyor.
   Blog hedefleri yazının ESKİ adresi: yazılar o adresle taşınacak. */
const FRAMER_ESKI: [string, string][] = [
  ["/ekibimiz", "/hakkimizda"],
  ["/home", "/"],
  ["/hakkımızda", "/hakkimizda"],
  ["/basında-biz", "/basinda-biz"],
  ["/ortacglobal/iletisim", "/iletisim"],
  ["/category/kibris", "/kktc"],
  ["/kibris/kurumsal", "/hakkimizda"],
  ["/kibris/hizmetler/denetim", "/kktc/muhasebe"],
  ["/kibris/hizmetler/vergi", "/kktc/vergi"],
  ["/kibris/hizmetler/bankacılık-ve-ödeme-sistemleri", "/kktc/banka-hesabi"],
  ["/dubai/hizmetler/bankacılık-ve-ödeme-sistemleri", "/dubai/banka-hesabi"],
  ["/ingiltere/hizmetler/bankacılık-ve-ödeme-sistemleri", "/ingiltere/banka-hesabi"],
  ["/cyprus/services/oversight", "/kktc/muhasebe"],
  ["/sektorler/information-technology-and-media", "/sektorler/yazilim-ve-teknoloji"],
  ["/sektorler/financial-services", "/sektorler/finans-ve-yatirim"],
  ["/sektorler/consumer-goods-and-retail", "/sektorler/e-ticaret"],
  ["/gelir-vergisi-olmayan-ulkeler", "/blog/gelir-vergisi-olmayan-ulkeler-2025"],
  ["/dubaide-vergi-var-mi", "/blog/gelir-vergisi-olmayan-ulkeler-2025"],
  ["/blog/gelir-vergisi-olmayan-ülkeler-2025", "/blog/gelir-vergisi-olmayan-ulkeler-2025"],
  ["/dubaide-is-fikirleri-en-karli-dubai-is-imkanlari", "/blog/dubai-is-fikirleri-en-karlı-is-imkanlari"],
  ["/dubaide-yasam", "/blog/dubai-yasam-rehberi-maliyetler-is-imkanlari"],
  ["/kibrista-yasam", "/blog/kktc-yasam-rehberi-kibris-is-firsatlari-maliyetler"],
  ["/ingilterede-yasam", "/blog/ingiltere-yasam-rehberi-is-imkanlari-vize-maliyetler"],
  ["/eori-numarasi", "/blog/eori-numarasi-nedir-nasil-alinir"],
  ["/etsy-nedir-etsyde-nasil-satis-yapilir", "/blog/etsy-nedir-nasil-satis-yapilir"],
  /* asgari ücret yazısının adresinden yıl çıktı (lib/blogTemel · ukAsgariUcret) */
  ["/2025-ingiltere-asgari-ucret", "/blog/ingiltere-asgari-ucret"],
  ["/blog/ingiltere-asgari-ucret-2025", "/blog/ingiltere-asgari-ucret"],
];
const framerEski = FRAMER_ESKI.flatMap(([source, hedef]) => {
  const destination = encodeURI(hedef);
  const kodlu = encodeURI(source);
  const satir = [{ source, destination, permanent: true }];
  if (kodlu !== source) satir.push({ source: kodlu, destination, permanent: true });
  return satir;
});

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
  /* GEÇİCİ ADRES ARAMA MOTORUNA KAPALI (09.10.2026 · teslim öncesi SEO turu).
     Site şimdilik ortac-global-site.vercel.app'te; kanonikler ortacglobal.com'u
     gösteriyor ama orada hâlâ eski site var, yani Google geçici adresi ayrı
     bir site gibi dizine alabilirdi. Başlık YALNIZ o host'ta basılıyor: alan
     adı ortacglobal.com'a bağlandığı gün kendiliğinden devre dışı kalır,
     silmeyi hatırlamak gerekmiyor. */
  async headers() {
    return [
      /* 09.10.2026 · denetim: yalnız HSTS vardı. Dördü de davranış
         değiştirmeyen başlıklar; çerçeve kuralı siteyi başka sitenin
         içine gömülmekten koruyor. */
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
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
      /* ESKİ SİTENİN ADRESLERİ (09.10.2026 · Burak'la eşleştirildi; tam döküm
         docs/teslim/eski-site-tasima.md). Eski site ortacglobal.com'da Framer
         üzerinde; alan adı buraya bağlandığı gün eski bağlantılar ve Google'daki
         sonuçlar boşa düşmesin. Yeni adres düzeni KALIYOR ("/dubai/banka-hesabi",
         "/hizmetler/" katmanı yok): Burak "bana da daha mantıklı geldi".
         BLOG YAZILARI BURADA YOK ve bilerek: yazılar eski adresleriyle
         taşınacak; taşınmayanların yönlendirmesi o zaman yazılır.
         /en/... DE YOK: İngilizce sürüm yeni İngilizce adreslerle kurulacak,
         eşleştirme o turda. */
      ...framerEski,
      /* "kıbrıs" yazımı (ı ile): Search Console'da tıklama alıyor */
      { source: "/kıbrıs/:rest*", destination: "/kktc", permanent: true },
      { source: encodeURI("/kıbrıs") + "/:rest*", destination: "/kktc", permanent: true },
      { source: "/kibris", destination: "/kktc", permanent: true },
      { source: "/:ulke(dubai|ingiltere)/hizmetler/sirket-kurma", destination: "/:ulke", permanent: true },
      { source: "/kibris/hizmetler/sirket-kurma", destination: "/kktc", permanent: true },
      { source: "/:ulke(dubai|ingiltere)/hizmetler/muhasebe", destination: "/:ulke/muhasebe", permanent: true },
      { source: "/kibris/hizmetler/muhasebe", destination: "/kktc/muhasebe", permanent: true },
      { source: "/:ulke(dubai|ingiltere)/hizmetler/bankacilik-ve-odeme-sistemleri", destination: "/:ulke/banka-hesabi", permanent: true },
      { source: "/kibris/hizmetler/bankacilik-ve-odeme-sistemleri", destination: "/kktc/banka-hesabi", permanent: true },
      { source: "/dubai/hizmetler/dubai-vize-oturum-izni-ve-yatirimci-kimligi", destination: "/dubai/oturum-vize", permanent: true },
      /* iptal edilen iki Dubai hizmeti: en yakın sayfa */
      { source: "/dubai/hizmetler/:eski(pazar-arastirmasi|hukuki-danismanlik)", destination: "/dubai/kurumsal-danismanlik", permanent: true },
      /* kalıba uymayan her eski hizmet adresi ülke sayfasına */
      { source: "/:ulke(dubai|ingiltere)/hizmetler/:rest*", destination: "/:ulke", permanent: true },
      { source: "/kibris/:rest*", destination: "/kktc", permanent: true },
      { source: "/sektorler/finansal-hizmetler", destination: "/sektorler/finans-ve-yatirim", permanent: true },
      { source: "/sektorler/bilisim-teknoloji-ve-medya", destination: "/sektorler/yazilim-ve-teknoloji", permanent: true },
      { source: "/sektorler/gayrimenkul-ve-insaat", destination: "/sektorler/gayrimenkul", permanent: true },
      { source: "/sektorler/saglik-hizmetleri", destination: "/sektorler/saglik-ve-medikal", permanent: true },
      { source: "/sektorler/tuketici-urunleri-ve-perakende", destination: "/sektorler/e-ticaret", permanent: true },
      { source: "/sektorler", destination: "/sektorler/e-ticaret", permanent: false },
      { source: "/fiyat-teklifi", destination: "/basla", permanent: true },
      /* eski "müşteriler" sayfasının (logo duvarı) karşılığı yok */
      { source: "/musteriler", destination: "/hakkimizda", permanent: true },
      { source: "/kurumsal", destination: "/hakkimizda", permanent: true },
      { source: "/sss", destination: "/#sss", permanent: true },
      /* dönüşüm artık form olayından ölçülüyor; sayfa yok */
      { source: "/tesekkurler", destination: "/", permanent: false },
      /* ESKİ İNGİLİZCE ADRESLER · GEÇİCİ. İngilizce sürüm yeni İngilizce
         adreslerle kurulacak; o güne kadar /en/x Türkçe karşılığına (/x)
         gidiyor, oradan yukarıdaki kurallar devralıyor. Geçici (307): İngilizce
         açıldığında bu iki satır silinir ve kalıcı eşleştirme yazılır. */
      { source: "/en", destination: "/", permanent: false },
      { source: "/en/:rest*", destination: "/:rest*", permanent: false },
      { source: "/privacy-policy", destination: "/kvkk", permanent: true },
      { source: "/legal/:rest*", destination: "/kvkk", permanent: true },
      { source: "/ulke/:slug", destination: "/:slug", permanent: true },
      { source: "/ulke/:slug/:hizmet", destination: "/:slug/:hizmet", permanent: true },
    ];
  },
};

export default nextConfig;
